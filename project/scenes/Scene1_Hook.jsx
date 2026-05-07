// Scene 1 — HOOK · 0–10s
// "Je team gebruikt al AI." Phone screen met ChatGPT-tabblad open.
// Speels: phone scaled in met gentle bounce, prompt typt zichzelf.

function Scene1_Hook() {
  return (
    <Sprite start={0} end={7}>
      {({ localTime: lt }) => {
        // Phone entry
        const enterT = Math.min(1, lt / 0.9);
        const phoneScale = 0.8 + Easing.easeOutBack(enterT) * 0.2;
        const phoneOp = enterT;
        const phoneRot = (1 - enterT) * -3;

        // Background hue: very subtle warmth
        const bgOp = Math.min(1, lt / 0.5);

        // Title appears after phone settles
        const titleT = Math.max(0, Math.min(1, (lt - 2.8) / 0.5));
        const titleOp = titleT * (lt > 6.4 ? Math.max(0, 1 - (lt - 6.4) / 0.5) : 1);
        const titleY = (1 - Easing.easeOutCubic(titleT)) * 30;

        // Subtitle
        const subT = Math.max(0, Math.min(1, (lt - 3.5) / 0.5));
        const subOp = subT * (lt > 6.4 ? Math.max(0, 1 - (lt - 6.4) / 0.5) : 1);
        const subY = (1 - Easing.easeOutCubic(subT)) * 20;

        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, #FFF6F2 0%, #F8F9FA 60%)`,
            opacity: bgOp,
          }}>
            {/* Soft bg blob */}
            <div style={{
              position: 'absolute',
              left: '50%', top: 480,
              width: 900, height: 900,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.10) 0%, rgba(255,107,53,0) 70%)',
              filter: 'blur(20px)',
            }}/>

            {/* Phone */}
            <div style={{
              position: 'absolute',
              left: '50%', top: 700,
              width: 540, height: 1080,
              transform: `translate(-50%, -50%) scale(${phoneScale}) rotate(${phoneRot}deg)`,
              opacity: phoneOp,
              background: '#1B263B',
              borderRadius: 64,
              padding: 14,
              boxShadow: '0 30px 80px rgba(27,38,59,0.25), 0 0 0 2px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                width: '100%', height: '100%',
                background: '#fff',
                borderRadius: 52,
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Status bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 56,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '0 44px',
                  fontSize: 22, fontWeight: 600, color: '#1B263B',
                  fontFamily: 'Inter, system-ui',
                }}>
                  <span>09:14</span>
                  <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ fontSize: 16 }}>•••</span>
                  </span>
                </div>
                {/* Notch */}
                <div style={{
                  position: 'absolute', top: 18, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 200, height: 36,
                  background: '#000', borderRadius: 20,
                }}/>

                {/* App "ChatGPT" header */}
                <div style={{
                  position: 'absolute', top: 80, left: 0, right: 0,
                  padding: '20px 32px 0',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontSize: 22, fontWeight: 600, color: '#1B263B',
                    fontFamily: 'Inter, system-ui',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: '#10A37F',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 20,
                    }}>AI</div>
                    <span>ChatGPT</span>
                  </div>
                </div>

                {/* Typed prompt — bubble */}
                <Scene1_TypedPrompt lt={lt} />

                {/* Reply spinner */}
                <Scene1_Reply lt={lt} />
              </div>
            </div>

            {/* Title overlay below phone */}
            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 280,
              textAlign: 'center',
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
            }}>
              <div style={{
                fontSize: 88, fontWeight: 800, color: '#1B263B',
                letterSpacing: '-0.03em', lineHeight: 1.05,
                padding: '0 80px',
              }}>Je team gebruikt<br/>al AI.</div>
            </div>

            <div style={{
              position: 'absolute', left: 0, right: 0, bottom: 180,
              textAlign: 'center',
              fontFamily: 'Inter, system-ui',
              opacity: subOp,
              transform: `translateY(${subY}px)`,
            }}>
              <div style={{
                fontSize: 28, color: '#6B7280', fontWeight: 500,
                letterSpacing: '-0.005em',
              }}>Of je het nu weet of niet.</div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Sub: typing prompt
function Scene1_TypedPrompt({ lt }) {
  const fullText = 'Schrijf een rapportage over Mw. de Vries...';
  // start typing at 1.4s, complete at 3.8s
  const tStart = 0.9, tEnd = 2.6;
  const typeT = Math.max(0, Math.min(1, (lt - tStart) / (tEnd - tStart)));
  const charCount = Math.floor(fullText.length * typeT);
  const text = fullText.slice(0, charCount);
  const showCursor = lt > tStart && lt < tEnd && Math.floor(lt * 2) % 2 === 0;
  const bubbleOp = lt > tStart - 0.2 ? 1 : 0;

  return (
    <div style={{
      position: 'absolute', top: 200, left: 32, right: 32,
      opacity: bubbleOp,
    }}>
      <div style={{
        background: '#F0F4F8',
        borderRadius: 24,
        padding: '20px 24px',
        fontSize: 22, lineHeight: 1.4,
        color: '#1B263B',
        fontFamily: 'Inter, system-ui',
        marginLeft: 80,
        minHeight: 60,
      }}>
        {text}{showCursor ? <span style={{ color: '#FF6B35', fontWeight: 600 }}>|</span> : null}
      </div>
    </div>
  );
}

// Sub: reply (just shows AI is responding)
function Scene1_Reply({ lt }) {
  const start = 2.9;
  if (lt < start) return null;
  const op = Math.min(1, (lt - start) / 0.4);
  const dotPhase = Math.floor((lt - start) * 2.5) % 3;

  return (
    <div style={{
      position: 'absolute', top: 360, left: 32, right: 32,
      opacity: op,
    }}>
      <div style={{
        display: 'flex', gap: 8, alignItems: 'center',
        padding: '20px 28px',
        background: '#fff',
        border: '1px solid #E0E0E0',
        borderRadius: 24,
        marginRight: 80,
        width: 'fit-content',
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: '50%',
            background: i <= dotPhase ? '#9CA3AF' : '#E0E0E0',
            transition: 'none',
          }}/>
        ))}
      </div>
    </div>
  );
}
