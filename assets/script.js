(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const currentYear = document.querySelector('[data-current-year]');

  document.querySelectorAll('a[href="assets/Harsha_CV.pdf"]').forEach((link) => {
    link.setAttribute('href', 'cv.html');
    link.removeAttribute('target');
    link.removeAttribute('rel');
    if (link.textContent?.trim() === 'Download CV') link.textContent = 'View CV';
  });

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

  const filterButtons = document.querySelectorAll('[data-publication-filter]');
  const publications = document.querySelectorAll('[data-publication-type]');
  const publicationSections = document.querySelectorAll('.publication-section');

  const applyFilter = (filter) => {
    filterButtons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.publicationFilter === filter));
    });
    publications.forEach((publication) => {
      const matches = filter === 'all' || publication.dataset.publicationType === filter;
      publication.dataset.hidden = String(!matches);
    });
    publicationSections.forEach((section) => {
      const visibleItems = section.querySelectorAll('[data-publication-type]:not([data-hidden="true"])');
      section.dataset.empty = String(visibleItems.length === 0);
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => applyFilter(button.dataset.publicationFilter || 'all'));
  });
})();
