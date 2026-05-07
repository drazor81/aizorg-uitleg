// Scene 6 — CTA · 54–60s
// Logo + url + "Stuur je team door."

function Scene6_CTA() {
  return (
    <Sprite start={37} end={44}>
      {({ localTime: lt }) => {
        const bgOp = Math.min(1, lt / 0.5);

        // Logo
        const logoT = Math.max(0, Math.min(1, (lt - 0.1) / 0.5));
        const logoOp = logoT;
        const logoScale = 0.85 + Easing.easeOutBack(logoT) * 0.15;
        const logoY = (1 - Easing.easeOutCubic(logoT)) * 20;

        // CTA line
        const ctaT = Math.max(0, Math.min(1, (lt - 0.8) / 0.4));
        const ctaOp = ctaT;
        const ctaY = (1 - Easing.easeOutCubic(ctaT)) * 16;

        // URL
        const urlT = Math.max(0, Math.min(1, (lt - 1.4) / 0.4));
        const urlOp = urlT;
        const urlY = (1 - Easing.easeOutCubic(urlT)) * 16;

        // Underline grow
        const underT = Math.max(0, Math.min(1, (lt - 1.9) / 0.5));
        const underW = Easing.easeOutCubic(underT);

        return (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)',
            opacity: bgOp,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Logo: simple medical cross + "AI Zorg Academy" wordmark */}
            <div style={{
              opacity: logoOp,
              transform: `scale(${logoScale}) translateY(${logoY}px)`,
              display: 'flex', alignItems: 'center', gap: 28,
              marginBottom: 60,
            }}>
              <Scene6_Logo />
              <div style={{
                fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
                fontWeight: 800,
                fontSize: 88,
                color: '#1B263B',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
              }}>
                <div>AI Zorg</div>
                <div style={{ fontWeight: 600 }}>Academy</div>
              </div>
            </div>

            {/* CTA */}
            <div style={{
              opacity: ctaOp,
              transform: `translateY(${ctaY}px)`,
              fontFamily: 'Plus Jakarta Sans, Inter, sans-serif',
              fontSize: 56, fontWeight: 700,
              color: '#1B263B',
              letterSpacing: '-0.02em',
              marginBottom: 60,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}>Stuur je team door.</div>

            {/* URL with growing underline */}
            <div style={{
              opacity: urlOp,
              transform: `translateY(${urlY}px)`,
              position: 'relative',
              fontFamily: 'Inter, system-ui',
              fontSize: 56, fontWeight: 800,
              color: '#0077B6',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}>
              aizorgacademy.nl
              <div style={{
                position: 'absolute',
                left: 0, right: 0, bottom: -12,
                height: 6,
                background: '#FF6B35',
                borderRadius: 3,
                transform: `scaleX(${underW})`,
                transformOrigin: 'left center',
              }}/>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// Simple medical cross logo (SVG, brand colors)
function Scene6_Logo() {
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <rect x="0" y="0" width="180" height="180" rx="32" fill="#1B263B"/>
      <rect x="70" y="30" width="40" height="120" rx="6" fill="#fff"/>
      <rect x="30" y="70" width="120" height="40" rx="6" fill="#fff"/>
      {/* circuit dots */}
      <circle cx="50" cy="90" r="4" fill="#00B4D8"/>
      <circle cx="130" cy="90" r="4" fill="#00B4D8"/>
      <circle cx="90" cy="50" r="4" fill="#00B4D8"/>
      <circle cx="90" cy="130" r="4" fill="#00B4D8"/>
    </svg>
  );
}
