(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const currentYear = document.querySelector('[data-current-year]');

  const addHomepageRefinements = () => {
    if (!document.querySelector('#homepage-refinement-styles')) {
      const style = document.createElement('style');
      style.id = 'homepage-refinement-styles';
      style.textContent = `
        .hero-copy { max-width: 720px; }

        .hero h1 {
          max-width: 760px;
          font-size: clamp(3.1rem, 4.25vw, 4.25rem);
          line-height: .98;
          letter-spacing: -.045em;
          white-space: nowrap;
        }

        .hero-affiliation {
          display: grid;
          gap: 2px;
          margin-top: 28px;
          padding-left: 18px;
          border-left: 2px solid var(--accent-2);
        }

        .hero-detail-label {
          display: block;
          margin-bottom: 4px;
          color: var(--accent-2);
          font-size: .7rem;
          font-weight: 850;
          letter-spacing: .15em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .hero-affiliation strong {
          color: var(--text);
          font-size: 1.08rem;
          font-weight: 780;
          line-height: 1.35;
        }

        .hero-affiliation span:not(.hero-detail-label) {
          color: var(--muted);
          font-size: .98rem;
          line-height: 1.48;
        }

        .hero-bio {
          max-width: 690px;
          margin-top: 22px;
          color: var(--muted);
          font-size: clamp(1rem, 1.45vw, 1.12rem);
          line-height: 1.7;
        }

        .hero-bio p {
          margin: 0;
        }

        .hero-email {
          display: grid;
          max-width: 510px;
          margin-top: 22px;
          padding: 13px 16px;
          align-items: center;
          gap: 13px;
          grid-template-columns: 38px minmax(0, 1fr);
          border: 1px solid color-mix(in srgb, var(--accent) 38%, var(--border));
          border-radius: 14px;
          background: color-mix(in srgb, var(--surface) 90%, var(--accent) 10%);
          color: var(--text);
          box-shadow: 0 10px 28px color-mix(in srgb, var(--accent) 10%, transparent);
          text-decoration: none;
          transition: transform .18s, border-color .18s, box-shadow .18s;
        }

        .hero-email:hover {
          border-color: var(--accent);
          color: var(--text);
          box-shadow: 0 14px 34px color-mix(in srgb, var(--accent) 17%, transparent);
          transform: translateY(-2px);
        }

        .hero-email-icon {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 50%;
          background: var(--soft);
          color: var(--accent);
          font-family: var(--serif);
          font-size: 1.08rem;
          font-weight: 700;
        }

        .hero-email-copy {
          display: grid;
          min-width: 0;
          gap: 1px;
        }

        .hero-email-label {
          color: var(--muted);
          font-size: .68rem;
          font-weight: 800;
          letter-spacing: .12em;
          line-height: 1.3;
          text-transform: uppercase;
        }

        .hero-email-address {
          overflow-wrap: anywhere;
          color: var(--text);
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.35;
        }

        .hero-actions {
          margin-top: 26px;
        }

        .profile-links {
          margin-top: 24px;
        }

        @media (max-width: 980px) {
          .hero h1 { white-space: normal; }
        }

        @media (max-width: 720px) {
          .hero h1 {
            font-size: clamp(3rem, 15vw, 4.4rem);
            line-height: .94;
          }

          .hero-affiliation { margin-top: 24px; }
          .hero-email { max-width: 100%; }
        }
      `;
      document.head.appendChild(style);
    }

    const heroCopy = document.querySelector('.hero-copy');
    if (!heroCopy || heroCopy.dataset.refined === 'true') return;

    const currentRole = heroCopy.querySelector('.hero-role');
    if (currentRole) {
      const affiliation = document.createElement('div');
      affiliation.className = 'hero-affiliation';
      affiliation.setAttribute('aria-label', 'Academic affiliation');
      affiliation.innerHTML = `
        <span class="hero-detail-label">Affiliation</span>
        <strong>Postdoctoral Associate</strong>
        <span>Department of Electrical and Computer Engineering</span>
        <span>University of Rochester</span>
      `;
      currentRole.replaceWith(affiliation);
    }

    const currentBio = heroCopy.querySelector('.hero-lede');
    if (currentBio) {
      const bio = document.createElement('div');
      bio.className = 'hero-bio';
      bio.innerHTML = `
        <span class="hero-detail-label">Bio</span>
        <p>I am a theoretical and computational physicist working at the intersection of non-equilibrium statistical mechanics, plasma physics, electron-device theory, and physics-inspired computing. I develop reduced dynamical models from microscopic physics using GLE–FDT theory, analytical methods, and particle-in-cell simulation.</p>
      `;
      currentBio.replaceWith(bio);
    }

    const actions = heroCopy.querySelector('.hero-actions');
    if (actions && !heroCopy.querySelector('.hero-email')) {
      const email = document.createElement('a');
      email.className = 'hero-email';
      email.href = 'mailto:snaropan@ur.rochester.edu';
      email.setAttribute('aria-label', 'Email N. R. Sree Harsha at snaropan@ur.rochester.edu');
      email.innerHTML = `
        <span class="hero-email-icon" aria-hidden="true">@</span>
        <span class="hero-email-copy">
          <span class="hero-email-label">Academic email</span>
          <span class="hero-email-address">snaropan@ur.rochester.edu</span>
        </span>
      `;
      actions.before(email);
    }

    heroCopy.dataset.refined = 'true';
  };

  addHomepageRefinements();

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0c151b' : '#173f5f');
    if (themeButton) themeButton.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  };

  setTheme(root.dataset.theme || 'light');
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const closeNav = () => {
    if (!nav || !navToggle) return;
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('nav-open');
  };

  navToggle?.addEventListener('click', () => {
    if (!nav) return;
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    nav.classList.toggle('is-open', !isOpen);
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    document.body.classList.toggle('nav-open', !isOpen);
  });

  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeNav(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeNav(); });
  if (currentYear) currentYear.textContent = String(new Date().getFullYear());

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }
})();
