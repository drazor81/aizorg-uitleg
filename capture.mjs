// capture.mjs
// Renders AI Zorg Academy - Uitleg.html frame-by-frame using Playwright,
// then encodes to MP4 with ffmpeg.
//
// Usage: node capture.mjs
// Requires: playwright (global), ffmpeg (in PATH)

import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { spawn, execSync } from 'child_process';
import { mkdirSync, existsSync, rmSync, readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FPS = 30;
const DURATION = 44;          // seconds
const TOTAL_FRAMES = Math.round(DURATION * FPS);
const WIDTH = 1080;
const HEIGHT = 1920;
const FRAMES_DIR = '/tmp/aiza_frames';
const OUTPUT = path.join(__dirname, 'AI Zorg Academy - Uitleg.mp4');
const AUDIO_SRC = path.join(__dirname, 'project/assets/Innovate_and_Inspire.mp3');
const AUDIO_OFFSET = 5;       // seconds into the mp3 to start
const AUDIO_VOLUME = 0.275;
const AUDIO_FADE_IN = 1.2;    // seconds
const AUDIO_FADE_OUT_START = DURATION - 1.5;

// ── Prepare frames directory ──────────────────────────────────────────────────
if (existsSync(FRAMES_DIR)) rmSync(FRAMES_DIR, { recursive: true });
mkdirSync(FRAMES_DIR, { recursive: true });

// ── Start local HTTP server ───────────────────────────────────────────────────
// Kill any stale process on our port first
try { execSync('fuser -k 8766/tcp 2>/dev/null'); } catch {}
await new Promise(r => setTimeout(r, 300));

const server = spawn('python3', ['-m', 'http.server', '8766', '--directory', __dirname], {
  stdio: ['ignore', 'pipe', 'pipe'],
});
server.stderr.on('data', () => {}); // suppress logs
await new Promise(r => setTimeout(r, 800));
console.log('HTTP server started on :8766');

// ── Launch Playwright ─────────────────────────────────────────────────────────
const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'],
});

const page = await browser.newPage();
// Viewport: 1080 wide, 1920 canvas + 44 playback bar = 1964
await page.setViewportSize({ width: WIDTH, height: HEIGHT + 44 });

console.log('Loading page (Babel compile may take a few seconds)...');
await page.goto('http://localhost:8766/AI%20Zorg%20Academy%20-%20Uitleg.html', {
  waitUntil: 'load',
  timeout: 60000,
});

// Wait for Babel to finish and React to mount Stage (Babel can take 10-20s on large scripts)
await page.waitForFunction(() => window.__stage_ready === true, { timeout: 90000 });
console.log('Stage ready. Pausing and starting capture...');

// Pause playback
await page.evaluate(() => window.__stage_pause());
// Let the initial frame settle
await new Promise(r => setTimeout(r, 300));

// ── Frame capture loop ────────────────────────────────────────────────────────
const startMs = Date.now();

for (let i = 0; i < TOTAL_FRAMES; i++) {
  const t = i / FPS;

  // Seek to this frame's time
  await page.evaluate((t) => window.__stage_seek(t), t);

  // Wait two animation frames so React finishes its render pass
  await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));

  // Screenshot just the canvas area (top 1920px)
  const framePath = path.join(FRAMES_DIR, `frame_${String(i).padStart(6, '0')}.jpg`);
  await page.screenshot({
    path: framePath,
    type: 'jpeg',
    quality: 95,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
  });

  if (i % FPS === 0) {
    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
    const pct = Math.round((i / TOTAL_FRAMES) * 100);
    process.stdout.write(`\r  Frame ${i}/${TOTAL_FRAMES} (${pct}%) — ${Math.round(t)}/${DURATION}s — ${elapsed}s elapsed   `);
  }
}

const captureMs = Date.now() - startMs;
console.log(`\nCapture done in ${(captureMs / 1000).toFixed(1)}s. Encoding...`);

await browser.close();
server.kill();

// ── FFmpeg encode ─────────────────────────────────────────────────────────────
// Video: frames → H.264, audio: mp3 with offset + fade in/out + volume
const audioFilter = [
  `afade=t=in:st=0:d=${AUDIO_FADE_IN}`,
  `afade=t=out:st=${AUDIO_FADE_OUT_START}:d=1.5`,
  `volume=${AUDIO_VOLUME}`,
].join(',');

const ffmpegArgs = [
  '-y',
  // Video input: frame sequence
  '-framerate', String(FPS),
  '-i', path.join(FRAMES_DIR, 'frame_%06d.jpg'),
  // Audio input: mp3, skip intro
  '-ss', String(AUDIO_OFFSET),
  '-i', AUDIO_SRC,
  // Video codec
  '-c:v', 'libx264',
  '-pix_fmt', 'yuv420p',
  '-crf', '18',
  '-preset', 'fast',
  // Audio codec + filter
  '-c:a', 'aac',
  '-b:a', '192k',
  '-af', audioFilter,
  // Stop at video length
  '-shortest',
  OUTPUT,
];

await new Promise((resolve, reject) => {
  const ff = spawn('ffmpeg', ffmpegArgs, { stdio: 'inherit' });
  ff.on('close', (code) => code === 0 ? resolve() : reject(new Error(`ffmpeg exited ${code}`)));
  ff.on('error', reject);
});

// ── Cleanup ───────────────────────────────────────────────────────────────────
rmSync(FRAMES_DIR, { recursive: true });

const totalMs = Date.now() - startMs;
console.log(`\nDone in ${(totalMs / 1000).toFixed(1)}s total.`);
console.log(`Output: ${OUTPUT}`);
