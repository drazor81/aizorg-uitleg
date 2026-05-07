// Scene 3 — DE OPLOSSING · 22–34s
// AI Zorg Academy fade in — gratis platform op de telefoon.
// Lichte, optimistische sfeer. Phone met homepage. Speels: cards "ploppen" omhoog.

function Scene3_Oplossing() {
  return (
    <Sprite start={16} end={24}>
      {({ localTime: lt }) => {
        const bgOp = Math.min(1, lt / 0.5);

        // Title
        const titleT = Math.max(0, Math.min(1, (lt - 0.2) / 0.5));
        const titleOp = titleT * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
        const titleY = (1 - Easing.easeOutCubic(titleT)) * 30;

        // Phone
        const phoneT = Math.max(0, Math.min(1, (lt - 0.7) / 0.6));
        const phoneOp = phoneT * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
        const phoneScale = 0.85 + Easing.easeOutBack(phoneT) * 0.15;
        const phoneY = (1 - Easing.easeOutCubic(phoneT)) * 60;

        // Sub-caption
        const capT = Math.max(0, Math.min(1, (lt - 4.0) / 0.5));
        const capOp = capT * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
        const capY = (1 - Easing.easeOutCubic(capT)) * 20;

        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #E3F2FD 0%, #F0F7FF 60%, #F8F9FA 100%)',
            opacity: bgOp,
          }}>
            {/* Title */}
            <div style={{
              position: 'absolute', left: 0, right: 0, top: 90,
              textAlign: 'center',
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
              padding: '0 80px',
            }}>
              <div style={{
                fontSize: 26, color: '#0077B6', fontWeight: 700,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                marginBottom: 8,
              }}>Daarom is er…</div>
              <div style={{
                fontSize: 76, fontWeight: 800, color: '#1B263B',
                letterSpacing: '-0.03em', lineHeight: 1.05,
              }}>AI Zorg Academy.</div>
            </div>

            {/* Phone — 480×960, centered higher in frame */}
            <div style={{
              position: 'absolute',
              left: '50%', top: 360,
              width: 480, height: 960,
              transform: `translateX(-50%) translateY(${phoneY}px) scale(${phoneScale})`,
              transformOrigin: 'center top',
              opacity: phoneOp,
              background: '#1B263B',
              borderRadius: 56,
              padding: 12,
              boxShadow: '0 30px 80px rgba(0,119,182,0.3)',
            }}>
              <div style={{
                width: '100%', height: '100%',
                background: '#fff',
                borderRadius: 44,
                overflow: 'hidden',
                position: 'relative',
              }}>
                {/* Status bar */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 44,
                  display: 'flex', justifyContent: 'space-between',
                  padding: '12px 32px',
                  fontSize: 18, fontWeight: 600, color: '#1B263B',
                  fontFamily: 'Inter, system-ui',
                }}>
                  <span>09:14</span>
                </div>
                <div style={{
                  position: 'absolute', top: 12, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 150, height: 28, background: '#000', borderRadius: 16,
                }}/>

                {/* Title */}
                <div style={{
                  position: 'absolute', top: 60, left: 0, right: 0,
                  padding: '14px 24px',
                }}>
                  <div style={{
                    fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                    fontSize: 30, fontWeight: 800,
                    color: '#1B263B', letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                  }}>AI Zorg Academy</div>
                  <div style={{
                    fontFamily: 'Inter, system-ui',
                    fontSize: 16, color: '#6B7280',
                    marginTop: 6, lineHeight: 1.35,
                  }}>7 leerroutes · in je eigen tempo</div>
                </div>

                {/* Cards — pop in staggered */}
                <Scene3_RouteCards lt={lt} />
              </div>
            </div>

            {/* Caption pills */}
            <div style={{
              position: 'absolute',
              left: 0, right: 0, bottom: 90,
              textAlign: 'center',
              opacity: capOp,
              transform: `translateY(${capY}px)`,
            }}>
              <div style={{
                display: 'inline-flex', gap: 14, flexWrap: 'wrap',
                justifyContent: 'center', padding: '0 60px',
              }}>
                {[
                  { t: 'Gratis', c: '#22C55E' },
                  { t: 'Online', c: '#0077B6' },
                  { t: 'MBO niveau 2–4', c: '#FF6B35' },
                ].map((p, i) => (
                  <div key={i} style={{
                    padding: '12px 22px',
                    background: '#fff',
                    border: `2px solid ${p.c}`,
                    color: p.c,
                    borderRadius: 28,
                    fontSize: 22, fontWeight: 700,
                    fontFamily: 'Inter, system-ui',
                    whiteSpace: 'nowrap',
                  }}>{p.t}</div>
                ))}
              </div>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function Scene3_RouteCards({ lt }) {
  const cards = [
    { num: '01', title: 'Basis AI', color: '#0077B6' },
    { num: '02', title: 'Prompt Engineering', color: '#7C3AED' },
    { num: '03', title: 'AI & Ethiek', color: '#22C55E' },
    { num: '04', title: 'In de praktijk', color: '#FF6B35' },
    { num: '05', title: 'AI Tools', color: '#00B4D8' },
    { num: '06', title: 'De AI Act', color: '#3949AB' },
    { num: '07', title: 'Verdieping', color: '#F57F17' },
  ];
  return (
    <div style={{
      position: 'absolute', top: 180, bottom: 32, left: 24, right: 24,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      {cards.map((c, i) => {
        const startT = 1.4 + i * 0.14;
        const t = Math.max(0, Math.min(1, (lt - startT) / 0.4));
        const op = t;
        const scale = 0.92 + Easing.easeOutBack(t) * 0.08;
        const y = (1 - Easing.easeOutCubic(t)) * 22;
        return (
          <div key={i} style={{
            background: '#fff',
            borderLeft: `4px solid ${c.color}`,
            borderRadius: '0 10px 10px 0',
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: op,
            transform: `translateY(${y}px) scale(${scale})`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              fontSize: 18, fontWeight: 800,
              color: c.color, minWidth: 38,
            }}>{c.num}</div>
            <div style={{
              fontFamily: 'Inter, system-ui',
              fontSize: 19, fontWeight: 700, color: '#1B263B',
              whiteSpace: 'nowrap',
            }}>{c.title}</div>
          </div>
        );
      })}
    </div>
  );
}
