// Scene 4 — HOE JE TEAM LEERT · 24-32s
// Vervangt "drie dingen" met concrete leervorm + doelgroep.

function Scene4_WatJeLeert() {
  return (
    <Sprite start={24} end={32}>
      {({ localTime: lt }) => {
        const bgOp = Math.min(1, lt / 0.4);

        const titleT = Math.max(0, Math.min(1, (lt - 0.2) / 0.5));
        const titleOp = titleT * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
        const titleY = (1 - Easing.easeOutCubic(titleT)) * 30;

        const items = [
          {
            label: 'Korte modules',
            sub: '15 minuten per onderwerp · in je eigen tempo',
            color: '#0077B6',
            bg: '#E3F2FD',
            startT: 0.9,
            icon: 'clock',
          },
          {
            label: 'Praktijkopdrachten',
            sub: 'Direct toepassen op de werkvloer',
            color: '#7C3AED',
            bg: '#F8F4FF',
            startT: 1.6,
            icon: 'check',
          },
          {
            label: 'Voor MBO 2–4',
            sub: 'Geschreven voor zorgmedewerkers, in begrijpelijke taal',
            color: '#FF6B35',
            bg: '#FFF0EB',
            startT: 2.3,
            icon: 'people',
          },
        ];

        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: '#F8F9FA',
            opacity: bgOp,
            overflow: 'hidden',
          }}>
            {/* Decorative bg blob */}
            <div style={{
              position: 'absolute',
              right: -200, top: -200,
              width: 700, height: 700,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,119,182,0.06) 0%, rgba(0,119,182,0) 70%)',
            }}/>
            <div style={{
              position: 'absolute',
              left: -200, bottom: -100,
              width: 600, height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.06) 0%, rgba(255,107,53,0) 70%)',
            }}/>

            {/* Vertical timeline rail behind cards */}
            <div style={{
              position: 'absolute',
              left: 134, top: 780, bottom: 200,
              width: 3,
              background: 'linear-gradient(180deg, #0077B6 0%, #7C3AED 50%, #FF6B35 100%)',
              opacity: titleOp * 0.35,
            }}/>

            {/* Title */}
            <div style={{
              position: 'absolute',
              left: 80, right: 80, top: 180,
              textAlign: 'left',
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              opacity: titleOp,
              transform: `translateY(${titleY}px)`,
            }}>
              <div style={{
                fontSize: 28, color: '#0077B6', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Zo leert je team</div>
              <div style={{
                fontSize: 88, fontWeight: 800, color: '#1B263B',
                letterSpacing: '-0.03em', lineHeight: 1.05,
              }}>Geen cursus.<br/>Maar microleren.</div>
            </div>

            {/* Cards */}
            <div style={{
              position: 'absolute',
              left: 80, right: 80, top: 720, bottom: 140,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              {items.map((p, i) => {
                const t = Math.max(0, Math.min(1, (lt - p.startT) / 0.45));
                const op = t * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
                const scale = 0.9 + Easing.easeOutBack(t) * 0.1;
                const x = (1 - Easing.easeOutCubic(t)) * -60;
                return (
                  <div key={i} style={{
                    background: '#fff',
                    border: `1px solid #E0E0E0`,
                    borderLeft: `6px solid ${p.color}`,
                    borderRadius: '0 16px 16px 0',
                    padding: '32px 32px',
                    display: 'flex', alignItems: 'center', gap: 28,
                    opacity: op,
                    transform: `translateX(${x}px) scale(${scale})`,
                    transformOrigin: 'left center',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{
                      width: 96, height: 96, borderRadius: 20,
                      background: p.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Scene4_Icon kind={p.icon} color={p.color} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                        fontSize: 38, fontWeight: 800,
                        color: '#1B263B', letterSpacing: '-0.015em',
                        marginBottom: 6,
                      }}>{p.label}</div>
                      <div style={{
                        fontFamily: 'Inter, system-ui',
                        fontSize: 22, color: '#6B7280', lineHeight: 1.4,
                      }}>{p.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function Scene4_BottomStrip({ lt, titleOp }) {
  const t = Math.max(0, Math.min(1, (lt - 3.4) / 0.5));
  const op = t * (lt > 7.4 ? Math.max(0, 1 - (lt - 7.4) / 0.5) : 1);
  const y = (1 - Easing.easeOutCubic(t)) * 20;
  return (
    <div style={{
      position: 'absolute',
      left: 80, right: 80, bottom: 130,
      opacity: op,
      transform: `translateY(${y}px)`,
      display: 'flex', alignItems: 'center', gap: 24,
      padding: '24px 28px',
      background: '#1B263B',
      borderRadius: 18,
      fontFamily: 'Inter, system-ui',
    }}>
      <div style={{
        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
        fontSize: 64, fontWeight: 800, color: '#00B4D8',
        letterSpacing: '-0.03em', lineHeight: 1,
      }}>36</div>
      <div style={{
        flex: 1, color: '#fff',
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em' }}>modules in 7 leerroutes</div>
        <div style={{ fontSize: 20, color: '#9CA3AF', marginTop: 4 }}>Van basis-AI tot de AI Act</div>
      </div>
    </div>
  );
}

function Scene4_Icon({ kind, color }) {
  const sw = 4;
  if (kind === 'clock') {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="20" stroke={color} strokeWidth={sw}/>
        <path d="M26 14 V26 L34 30" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'check') {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <rect x="6" y="6" width="40" height="40" rx="6" stroke={color} strokeWidth={sw}/>
        <path d="M16 26 L23 33 L37 19" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'people') {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="19" cy="18" r="6" stroke={color} strokeWidth={sw}/>
        <circle cx="35" cy="20" r="5" stroke={color} strokeWidth={sw}/>
        <path d="M8 42 C8 34, 14 30, 19 30 C24 30, 30 34, 30 42" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
        <path d="M30 42 C30 36, 34 33, 38 33 C42 33, 46 36, 46 42" stroke={color} strokeWidth={sw} strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
}
