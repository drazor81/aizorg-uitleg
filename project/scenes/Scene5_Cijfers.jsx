// Scene 5 — DE CIJFERS · 46–54s
// 7 routes · 36 modules · 0 licentiekosten · 0 reclame
// Cijfers stuiteren binnen, speels.

function Scene5_Cijfers() {
  return (
    <Sprite start={32} end={37}>
      {({ localTime: lt }) => {
        const bgOp = Math.min(1, lt / 0.4);

        const titleT = Math.max(0, Math.min(1, (lt - 0.15) / 0.4));
        const titleOp = titleT * (lt > 4.4 ? Math.max(0, 1 - (lt - 4.4) / 0.5) : 1);
        const titleY = (1 - Easing.easeOutCubic(titleT)) * 30;

        const items = [
          { num: '7',  label: 'leerroutes',     sub: 'Van basis tot AI Act',           color: '#0077B6', startT: 0.6 },
          { num: '36', label: 'korte modules',  sub: 'In je eigen tempo',              color: '#00B4D8', startT: 0.9 },
          { num: '€0', label: 'licentiekosten', sub: 'Geen verdienmodel',              color: '#22C55E', startT: 1.2 },
          { num: '0',  label: 'reclame',        sub: 'Initiatief Practoraat Z&T',      color: '#FF6B35', startT: 1.5 },
        ];

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
                fontSize: 28, color: '#0077B6', fontWeight: 700,
                letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: 16,
              }}>Voor jou als werkgever</div>
              <div style={{
                fontSize: 88, fontWeight: 800, color: '#1B263B',
                letterSpacing: '-0.03em', lineHeight: 1.05,
              }}>De cijfers<br/>op een rij.</div>
            </div>

            {/* Stats */}
            <div style={{
              position: 'absolute', left: 80, right: 80, top: 720,
              display: 'flex', flexDirection: 'column', gap: 20,
            }}>
              {items.map((it, i) => {
                const t = Math.max(0, Math.min(1, (lt - it.startT) / 0.4));
                const opEnd = lt > 4.4 ? Math.max(0, 1 - (lt - 4.4) / 0.5) : 1;
                const op = t * opEnd;
                const scale = 0.5 + Easing.easeOutBack(t) * 0.5;
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 32,
                    padding: '20px 8px',
                    borderBottom: i < items.length - 1 ? '1px solid #E0E0E0' : 'none',
                    opacity: op,
                  }}>
                    <div style={{
                      fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                      fontSize: 130, fontWeight: 800,
                      color: it.color, letterSpacing: '-0.04em', lineHeight: 1,
                      minWidth: 220,
                      transform: `scale(${scale})`,
                      transformOrigin: 'left center',
                    }}>{it.num}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                        fontSize: 36, fontWeight: 700,
                        color: '#1B263B', letterSpacing: '-0.015em',
                        lineHeight: 1.15,
                      }}>{it.label}</div>
                      <div style={{
                        fontFamily: 'Inter, system-ui',
                        fontSize: 22, color: '#6B7280', marginTop: 4,
                      }}>{it.sub}</div>
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
