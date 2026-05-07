// Scene 2 — HET RISICO · 10–22s
// Vraagstelling: wat doen ze ermee? "BSN 1234..." getypt → rode flag.
// Speels-luchtig: tekst die letterlijk doorstreept wordt, niet doodserieus.

function Scene2_Risico() {
  return (
    <Sprite start={7} end={16}>
      {({ localTime: lt }) => {
        // Background fade in
        const bgOp = Math.min(1, lt / 0.4);

        // Title
        const titleT = Math.max(0, Math.min(1, (lt - 0.2) / 0.5));
        const titleOp = titleT * (lt > 8.4 ? Math.max(0, 1 - (lt - 8.4) / 0.5) : 1);
        const titleY = (1 - Easing.easeOutCubic(titleT)) * 30;

        // Document card
        const cardT = Math.max(0, Math.min(1, (lt - 0.8) / 0.5));
        const cardOp = cardT * (lt > 8.4 ? Math.max(0, 1 - (lt - 8.4) / 0.5) : 1);
        const cardScale = 0.9 + Easing.easeOutBack(cardT) * 0.1;

        // Typed text inside the document
        const fullText = 'Schrijf rapportage over Mw. J. de Vries, geboren 12-04-1942, BSN 1234.56.789, opname diabetes type 2, medicatie metformine 500mg.';
        const tStart = 1.5, tEnd = 5.0;
        const typeT = Math.max(0, Math.min(1, (lt - tStart) / (tEnd - tStart)));
        const charCount = Math.floor(fullText.length * typeT);
        const text = fullText.slice(0, charCount);
        const showCursor = lt > tStart && lt < tEnd && Math.floor(lt * 2) % 2 === 0;

        // Red flag stamp at end
        const flagStart = 5.2;
        const flagT = Math.max(0, Math.min(1, (lt - flagStart) / 0.4));
        const flagOp = flagT * (lt > 8.4 ? Math.max(0, 1 - (lt - 8.4) / 0.5) : 1);
        const flagScale = 0.5 + Easing.easeOutBack(flagT) * 0.5;
        const flagRot = (1 - flagT) * -8 + (-3);

        // Caption underneath
        const capStart = 5.9;
        const capT = Math.max(0, Math.min(1, (lt - capStart) / 0.4));
        const capOp = capT * (lt > 8.4 ? Math.max(0, 1 - (lt - 8.4) / 0.5) : 1);
        const capY = (1 - Easing.easeOutCubic(capT)) * 16;

        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: '#F8F9FA',
            opacity: bgOp,
          }}>
            {/* Title */}
            <div style={{
              position: 'absolute',
              left: 80, right: 80, top: 200,
              textAlign: 'left',
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
            }}>
              <div style={{
                fontSize: 32, color: '#0077B6', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Maar zonder uitleg…</div>
              <div style={{
                fontSize: 84, fontWeight: 800, color: '#1B263B',
                letterSpacing: '-0.03em', lineHeight: 1.05,
              }}>…belandt dit<br/>in een gratis tool.</div>
            </div>

            {/* Document card */}
            <div style={{
              position: 'absolute',
              left: 80, right: 80, top: 720,
              opacity: cardOp,
              transform: `scale(${cardScale})`,
              transformOrigin: 'center top',
            }}>
              <div style={{
                background: '#fff',
                border: '1px solid #E0E0E0',
                borderRadius: 16,
                padding: '36px 36px',
                fontFamily: 'Courier New, monospace',
                fontSize: 30, lineHeight: 1.55,
                color: '#1B263B',
                position: 'relative',
                minHeight: 380,
                boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  fontFamily: 'Inter, system-ui',
                  fontSize: 18, color: '#9CA3AF',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  fontWeight: 700, marginBottom: 16,
                }}>chatgpt · prompt</div>
                <Scene2_HighlightedText text={text} />
                {showCursor ? <span style={{ color: '#FF6B35', fontWeight: 700 }}>|</span> : null}
              </div>

              {/* Stamp */}
              <div style={{
                position: 'absolute',
                top: -40, right: -20,
                opacity: flagOp,
                transform: `rotate(${flagRot}deg) scale(${flagScale})`,
                transformOrigin: 'center center',
              }}>
                <div style={{
                  background: '#FF6B35',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: 12,
                  fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                  fontSize: 32, fontWeight: 800,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  boxShadow: '0 8px 24px rgba(255,107,53,0.4)',
                  border: '3px solid #fff',
                  whiteSpace: 'nowrap',
                }}>⚠ Privacy lek</div>
              </div>
            </div>

            {/* Caption */}
            <div style={{
              position: 'absolute',
              left: 80, right: 80, bottom: 200,
              textAlign: 'center',
              fontFamily: 'Inter, system-ui',
              opacity: capOp,
              transform: `translateY(${capY}px)`,
            }}>
              <div style={{
                fontSize: 32, color: '#374151', fontWeight: 500,
                lineHeight: 1.45,
              }}>Patiëntdata in een gratis AI-tool.<br/>
                <span style={{ color: '#1B263B', fontWeight: 700 }}>Dat wil je niet.</span>
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Helper: highlight BSN/name fragments in red
function Scene2_HighlightedText({ text }) {
  // Highlight specific PII patterns
  const sensitive = [
    'Mw. J. de Vries',
    '12-04-1942',
    'BSN 1234.56.789',
  ];
  let parts = [{ t: text, hl: false }];
  for (const s of sensitive) {
    const next = [];
    for (const p of parts) {
      if (p.hl) { next.push(p); continue; }
      const idx = p.t.indexOf(s);
      if (idx === -1) { next.push(p); continue; }
      if (idx > 0) next.push({ t: p.t.slice(0, idx), hl: false });
      next.push({ t: s, hl: true });
      if (idx + s.length < p.t.length) next.push({ t: p.t.slice(idx + s.length), hl: false });
    }
    parts = next;
  }
  return (
    <span>
      {parts.map((p, i) => p.hl ? (
        <span key={i} style={{
          background: '#FFE0E0',
          padding: '2px 8px',
          borderRadius: 4,
          color: '#B91C1C',
          fontWeight: 700,
        }}>{p.t}</span>
      ) : (
        <span key={i}>{p.t}</span>
      ))}
    </span>
  );
}
