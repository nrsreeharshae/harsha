(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  const currentYear = document.querySelector('[data-current-year]');

  const formalName = 'Sree Harsha Naropanth Ramamurthy';
  const publicationName = 'N. R. S. Harsha';
  const preferredName = 'Harsha';
  const editorialMailto = 'mailto:snaropan@ur.rochester.edu?cc=nrsreeharshae%40gmail.com&subject=Professional%20or%20editorial%20correspondence';
  const nsfUrl = 'https://www.nsf.gov/awardsearch/show-award?AWD_ID=2606713';

  const addRefinementStyles = () => {
    if (document.querySelector('#homepage-refinement-styles')) return;

    const style = document.createElement('style');
    style.id = 'homepage-refinement-styles';
    style.textContent = `
      .identity-ribbon {
        border-bottom: 1px solid var(--border);
        background: color-mix(in srgb, var(--surface) 93%, var(--accent) 7%);
      }

      .identity-ribbon-inner {
        display: grid;
        gap: 28px;
        padding: 15px 0 16px;
        align-items: center;
        grid-template-columns: minmax(0, 1.55fr) minmax(300px, .75fr);
      }

      .identity-ribbon-affiliation,
      .identity-ribbon-contact {
        display: grid;
        gap: 2px;
      }

      .ribbon-kicker,
      .hero-detail-label,
      .priority-card-label {
        color: var(--accent-2);
        font-size: .67rem;
        font-weight: 850;
        letter-spacing: .145em;
        line-height: 1.35;
        text-transform: uppercase;
      }

      .identity-ribbon-affiliation strong {
        color: var(--text);
        font-size: .98rem;
        font-weight: 820;
        line-height: 1.38;
      }

      .identity-ribbon-affiliation span:not(.ribbon-kicker),
      .identity-ribbon-contact span:not(.ribbon-kicker) {
        color: var(--muted);
        font-size: .82rem;
        line-height: 1.45;
      }

      .identity-ribbon-affiliation .identity-alias {
        margin: 2px 0 3px;
        color: var(--text);
        font-weight: 680;
      }

      .identity-ribbon-contact {
        padding-left: 24px;
        border-left: 1px solid var(--border);
      }

      .identity-ribbon-contact > a {
        width: fit-content;
        color: var(--text);
        font-size: .93rem;
        font-weight: 820;
        line-height: 1.4;
        text-decoration: none;
      }

      .identity-ribbon-contact > a:hover,
      .identity-ribbon-contact span a:hover {
        color: var(--accent);
      }

      .identity-ribbon-contact span a {
        color: var(--accent);
        font-weight: 750;
        text-decoration: none;
      }

      .hero-copy { max-width: 730px; }

      .hero h1 {
        display: flex;
        max-width: 780px;
        margin-top: 2px;
        align-items: baseline;
        flex-wrap: wrap;
        gap: 10px 16px;
        font-size: clamp(3.05rem, 4.2vw, 4.35rem);
        line-height: .98;
        letter-spacing: -.045em;
      }

      .degree-suffix {
        color: var(--accent-2);
        font-family: var(--sans);
        font-size: .24em;
        font-weight: 820;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .hero-name-context {
        display: flex;
        max-width: 690px;
        margin: 17px 0 0;
        flex-wrap: wrap;
        gap: 6px 11px;
        color: var(--muted);
        font-size: .83rem;
        font-weight: 620;
        line-height: 1.5;
      }

      .hero-name-context span {
        display: inline-flex;
        align-items: center;
      }

      .hero-name-context span + span::before {
        margin-right: 11px;
        color: var(--border);
        content: '•';
      }

      .hero-name-context .formal-name {
        color: var(--text);
        font-weight: 760;
      }

      .hero-name-context .preferred-name {
        color: var(--accent-2);
        font-weight: 780;
      }

      .hero-affiliation {
        display: grid;
        gap: 2px;
        margin-top: 25px;
        padding-left: 18px;
        border-left: 2px solid var(--accent-2);
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
        max-width: 700px;
        margin-top: 23px;
        color: var(--muted);
        font-size: clamp(1rem, 1.42vw, 1.1rem);
        line-height: 1.7;
      }

      .hero-bio p { margin: 0; }
      .hero-bio p + p { margin-top: 12px; }
      .hero-open-note { color: var(--text); font-weight: 630; }

      .hero-priority-grid {
        display: grid;
        max-width: 700px;
        gap: 12px;
        margin-top: 23px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .priority-card {
        display: grid;
        min-height: 122px;
        padding: 17px 18px;
        align-content: start;
        gap: 4px;
        border: 1px solid var(--border);
        border-radius: 16px;
        background: color-mix(in srgb, var(--surface) 92%, var(--accent) 8%);
        color: var(--text);
        box-shadow: 0 10px 30px color-mix(in srgb, var(--accent) 9%, transparent);
        text-decoration: none;
        transition: transform .18s, border-color .18s, box-shadow .18s;
      }

      .priority-card:hover {
        border-color: var(--accent);
        color: var(--text);
        box-shadow: 0 15px 36px color-mix(in srgb, var(--accent) 15%, transparent);
        transform: translateY(-2px);
      }

      .priority-card strong {
        margin-top: 3px;
        overflow-wrap: anywhere;
        font-size: .98rem;
        font-weight: 820;
        line-height: 1.35;
      }

      .priority-card span:not(.priority-card-label) {
        color: var(--muted);
        font-size: .78rem;
        line-height: 1.45;
      }

      .priority-card-editorial {
        border-color: color-mix(in srgb, var(--accent) 42%, var(--border));
      }

      .priority-card-grant {
        background: linear-gradient(145deg, color-mix(in srgb, var(--accent) 18%, var(--surface)), var(--surface));
      }

      .hero-actions { margin-top: 25px; }
      .profile-links { margin-top: 23px; }

      .interests-section {
        position: relative;
        overflow: hidden;
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        background:
          radial-gradient(circle at 88% 10%, color-mix(in srgb, var(--accent-2) 15%, transparent), transparent 30%),
          var(--surface);
      }

      .interests-layout {
        display: grid;
        gap: clamp(42px, 7vw, 90px);
        align-items: start;
        grid-template-columns: minmax(270px, .78fr) minmax(0, 1.22fr);
      }

      .interests-intro h2 {
        max-width: 520px;
        margin: 0;
        font-family: var(--serif);
        font-size: clamp(2.35rem, 4.6vw, 4.2rem);
        font-weight: 500;
        letter-spacing: -.045em;
        line-height: 1.02;
      }

      .interests-intro > p:last-child {
        max-width: 560px;
        margin: 22px 0 0;
        color: var(--muted);
        font-size: 1.08rem;
        line-height: 1.75;
      }

      .interest-grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .interest-card {
        min-height: 190px;
        padding: 25px 26px;
        border: 1px solid var(--border);
        border-radius: 18px;
        background: var(--bg);
        box-shadow: var(--shadow-soft);
      }

      .interest-card-wide { grid-column: 1 / -1; }

      .interest-card-current {
        background: linear-gradient(145deg, color-mix(in srgb, var(--accent-2) 13%, var(--surface)), var(--surface));
      }

      .interest-card .interest-icon {
        display: inline-grid;
        min-width: 39px;
        height: 39px;
        margin-bottom: 28px;
        padding: 0 11px;
        place-items: center;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--accent-2);
        font-family: var(--serif);
        font-size: .85rem;
        font-style: italic;
        font-weight: 650;
      }

      .interest-card h3 {
        margin: 0;
        font-family: var(--serif);
        font-size: clamp(1.35rem, 2.3vw, 1.8rem);
        font-weight: 600;
        letter-spacing: -.025em;
        line-height: 1.2;
      }

      .interest-card p {
        margin: 10px 0 0;
        color: var(--muted);
        line-height: 1.65;
      }

      .interest-card em { color: var(--text); }

      .nsf-spotlight-link {
        display: inline-flex;
        position: relative;
        z-index: 2;
        margin-top: 25px;
        align-items: center;
        gap: 8px;
        padding: 10px 14px;
        border: 1px solid rgba(255,255,255,.28);
        border-radius: 999px;
        color: #f5fbfc;
        font-size: .8rem;
        font-weight: 820;
        letter-spacing: .02em;
        text-decoration: none;
      }

      .nsf-spotlight-link:hover {
        border-color: rgba(255,255,255,.58);
        color: #fff;
        transform: translateY(-1px);
      }

      .contact-card-expanded {
        align-items: start;
        grid-template-columns: minmax(0, 1fr) minmax(330px, .76fr);
      }

      .contact-details { display: grid; gap: 18px; }

      .contact-detail-block {
        display: grid;
        gap: 3px;
        padding: 17px 18px;
        border: 1px solid var(--border);
        border-radius: 14px;
        background: var(--bg);
      }

      .contact-detail-block strong { color: var(--text); font-size: .92rem; }

      .contact-detail-block span,
      .contact-detail-block address {
        color: var(--muted);
        font-size: .86rem;
        font-style: normal;
        line-height: 1.55;
      }

      .contact-detail-block .name-note {
        margin-top: 5px;
        color: var(--text);
        font-weight: 650;
      }

      .contact-detail-block a:not(.button) {
        color: var(--accent);
        font-weight: 760;
        text-decoration: none;
      }

      .contact-detail-block .button { width: 100%; margin-top: 7px; }

      @media (max-width: 1080px) {
        .identity-ribbon-inner { grid-template-columns: 1fr; gap: 12px; }
        .identity-ribbon-contact {
          padding-top: 12px;
          padding-left: 0;
          border-top: 1px solid var(--border);
          border-left: 0;
        }
      }

      @media (max-width: 980px) {
        .hero-priority-grid,
        .interests-layout,
        .contact-card-expanded { grid-template-columns: 1fr; }
      }

      @media (max-width: 720px) {
        .identity-ribbon-inner { padding: 13px 0 14px; }

        .identity-ribbon-affiliation span:not(.ribbon-kicker),
        .identity-ribbon-contact span:not(.ribbon-kicker) { font-size: .78rem; }

        .hero h1 {
          display: block;
          font-size: clamp(2.9rem, 14vw, 4rem);
          line-height: .96;
        }

        .degree-suffix {
          display: block;
          margin-top: 8px;
          font-size: .19em;
        }

        .hero-name-context {
          display: grid;
          gap: 3px;
        }

        .hero-name-context span + span::before { display: none; }
        .hero-affiliation { margin-top: 24px; }

        .hero-priority-grid,
        .interest-grid { grid-template-columns: 1fr; }

        .interest-card-wide { grid-column: auto; }
      }
    `;
    document.head.appendChild(style);
  };

  const applySiteIdentity = () => {
    document.querySelectorAll('.brand-name').forEach((brand) => {
      brand.textContent = preferredName;
    });

    document.querySelectorAll('.brand').forEach((brand) => {
      brand.setAttribute('aria-label', `${preferredName}, home`);
    });

    const authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) authorMeta.setAttribute('content', formalName);

    const isHomepage = Boolean(document.querySelector('.hero-copy'));
    if (isHomepage) document.title = `${preferredName} | ${formalName}`;
  };

  const addIdentityRibbon = () => {
    if (document.querySelector('.identity-ribbon')) return;
    const header = document.querySelector('.site-header');
    if (!header) return;

    header.insertAdjacentHTML('afterend', `
      <aside class="identity-ribbon" aria-label="Academic affiliation, postal address, and editorial correspondence">
        <div class="container identity-ribbon-inner">
          <div class="identity-ribbon-affiliation">
            <span class="ribbon-kicker">Affiliation &amp; postal address</span>
            <strong>${formalName}, PhD · Postdoctoral Research Associate</strong>
            <span class="identity-alias">Published as ${publicationName} · Please call me ${preferredName}.</span>
            <span>Department of Electrical and Computer Engineering · University of Rochester</span>
            <span>405 Computer Studies Building · 120 Trustee Rd · Rochester, NY 14620</span>
          </div>
          <div class="identity-ribbon-contact">
            <span class="ribbon-kicker">Editorial correspondence</span>
            <a href="${editorialMailto}">snaropan@ur.rochester.edu</a>
            <span>Please CC <a href="mailto:nrsreeharshae@gmail.com">nrsreeharshae@gmail.com</a></span>
          </div>
        </div>
      </aside>
    `);
  };

  const refineNavigation = () => {
    if (!nav || nav.querySelector('a[href$="#interests"]')) return;
    const researchLink = Array.from(nav.querySelectorAll('a')).find((link) => link.textContent.trim() === 'Research');
    if (!researchLink) return;

    const interestsLink = document.createElement('a');
    const isHomepage = Boolean(document.querySelector('.hero-copy'));
    interestsLink.href = isHomepage ? '#interests' : 'index.html#interests';
    interestsLink.textContent = 'Interests';
    researchLink.before(interestsLink);
  };

  const refineHomepageHero = () => {
    const heroCopy = document.querySelector('.hero-copy');
    if (!heroCopy || heroCopy.dataset.refined === 'true') return;

    const name = heroCopy.querySelector('h1');
    if (name) {
      name.innerHTML = `${preferredName} <span class="degree-suffix">PhD</span>`;

      const context = document.createElement('div');
      context.className = 'hero-name-context';
      context.setAttribute('aria-label', 'Formal, publication, and preferred names');
      context.innerHTML = `
        <span class="formal-name">Formal name: ${formalName}</span>
        <span>Published as ${publicationName}</span>
        <span class="preferred-name">Please call me ${preferredName}—I prefer simplicity and clarity.</span>
      `;
      name.after(context);
    }

    const currentRole = heroCopy.querySelector('.hero-role');
    if (currentRole) {
      const affiliation = document.createElement('div');
      affiliation.className = 'hero-affiliation';
      affiliation.setAttribute('aria-label', 'Academic affiliation');
      affiliation.innerHTML = `
        <span class="hero-detail-label">Affiliation</span>
        <strong>Postdoctoral Research Associate</strong>
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
        <p>I am a theoretical and computational physicist working at the intersection of non-equilibrium statistical mechanics, plasma physics, electron-device theory, and physics-inspired computing. I use GLE–FDT theory, analytical methods, and particle-in-cell simulation to build reduced dynamical models from microscopic physics.</p>
        <p class="hero-open-note">I am genuinely open to discussing almost anything—and to collaborating wherever there is a meaningful question to explore.</p>
      `;
      currentBio.replaceWith(bio);
    }

    const actions = heroCopy.querySelector('.hero-actions');
    if (actions && !heroCopy.querySelector('.hero-priority-grid')) {
      const priorityGrid = document.createElement('div');
      priorityGrid.className = 'hero-priority-grid';
      priorityGrid.innerHTML = `
        <a class="priority-card priority-card-editorial" href="${editorialMailto}">
          <span class="priority-card-label">Editors &amp; professional correspondence</span>
          <strong>snaropan@ur.rochester.edu</strong>
          <span>CC: nrsreeharshae@gmail.com</span>
        </a>
        <a class="priority-card priority-card-grant" href="${nsfUrl}" target="_blank" rel="noopener">
          <span class="priority-card-label">NSF-funded research</span>
          <strong>NSF Award PHY-2606713 ↗</strong>
          <span>Co-Principal Investigator · 2026–2029</span>
        </a>
      `;
      actions.before(priorityGrid);
    }

    const cvButton = actions?.querySelector('.button-secondary');
    if (cvButton) {
      cvButton.href = 'cv.html';
      cvButton.removeAttribute('target');
      cvButton.removeAttribute('rel');
      cvButton.textContent = 'View CV';
    }

    heroCopy.dataset.refined = 'true';
  };

  const addInterestsSection = () => {
    if (document.querySelector('#interests')) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;

    hero.insertAdjacentHTML('afterend', `
      <section class="section interests-section" id="interests">
        <div class="container interests-layout">
          <div class="interests-intro reveal">
            <p class="eyebrow">Beyond my research</p>
            <h2>Broad curiosity, open conversation</h2>
            <p>My scientific work is only one part of what interests me. I enjoy conversations that cross fields and eras—from history and painting to food, the natural world, and the deepest ideas in physics. Unexpected connections are often where the most interesting questions begin.</p>
          </div>

          <div class="interest-grid">
            <article class="interest-card interest-card-current reveal">
              <span class="interest-icon">Reading</span>
              <h3>Natural history</h3>
              <p>I am currently reading <em>Natural History</em>, the Smithsonian/DK edition, and enjoying its panoramic view of life, geology, ecosystems, and Earth's diversity.</p>
            </article>

            <article class="interest-card reveal">
              <span class="interest-icon">Culture</span>
              <h3>History, art &amp; painting</h3>
              <p>I am drawn to how societies remember themselves, how visual form carries meaning, and how paintings reveal both a historical moment and an individual way of seeing.</p>
            </article>

            <article class="interest-card reveal">
              <span class="interest-icon">Life</span>
              <h3>Food &amp; the natural world</h3>
              <p>I enjoy food as culture, craft, and shared experience, and I am continually curious about plants, animals, landscapes, weather, and the ordinary natural life around us.</p>
            </article>

            <article class="interest-card reveal">
              <span class="interest-icon">Physics</span>
              <h3>Ideas I return to</h3>
              <p>I am especially drawn to Ilya Prigogine's ideas about irreversibility and self-organization, Einstein's general relativity, and Leonard Susskind's lectures for their clarity and physical intuition.</p>
            </article>

            <article class="interest-card interest-card-wide reveal">
              <span class="interest-icon">Invitation</span>
              <h3>Conversation need not begin inside my field</h3>
              <p>I welcome serious, playful, and exploratory conversations across disciplines. I am also open to unconventional collaborations when different perspectives can illuminate a worthwhile problem.</p>
            </article>
          </div>
        </div>
      </section>
    `);
  };

  const highlightNsfAward = () => {
    const fundedCard = Array.from(document.querySelectorAll('.spotlight')).find((card) =>
      card.textContent.includes('Bridging Kinetic and Fluid Scales')
    );
    if (!fundedCard || fundedCard.dataset.nsfLinked === 'true') return;

    fundedCard.classList.add('nsf-spotlight');
    const meta = fundedCard.querySelector('.spotlight-meta');
    const link = document.createElement('a');
    link.className = 'nsf-spotlight-link';
    link.href = nsfUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.innerHTML = 'View NSF Award PHY-2606713 <span aria-hidden="true">↗</span>';
    meta?.before(link);

    const awardSpan = Array.from(fundedCard.querySelectorAll('.spotlight-meta span')).find((span) =>
      span.textContent.includes('PHY-2606713')
    );
    if (awardSpan) awardSpan.textContent = 'NSF Award PHY-2606713';

    fundedCard.dataset.nsfLinked = 'true';
  };

  const expandContactSection = () => {
    const contactCard = document.querySelector('.contact-card');
    if (!contactCard || contactCard.dataset.expanded === 'true') return;

    contactCard.classList.add('contact-card-expanded');
    contactCard.innerHTML = `
      <div>
        <p class="eyebrow">Contact &amp; collaboration</p>
        <h2>Open to ideas from anywhere</h2>
        <p>I welcome conversations about my research, but they do not need to begin there. History, art and painting, food, the natural world, foundational physics, and unexpected interdisciplinary questions are all welcome. I am open to collaborating wherever there is a serious and interesting problem to explore.</p>
      </div>
      <div class="contact-details">
        <div class="contact-detail-block">
          <strong>Academic address</strong>
          <address>
            ${formalName}, PhD<br>
            Postdoctoral Research Associate<br>
            Department of Electrical and Computer Engineering<br>
            University of Rochester<br>
            405 Computer Studies Building<br>
            120 Trustee Rd, Rochester, NY 14620
          </address>
          <span class="name-note">Published as ${publicationName} · Preferred name: ${preferredName}</span>
        </div>
        <div class="contact-detail-block">
          <strong>Editors and professional correspondence</strong>
          <a href="mailto:snaropan@ur.rochester.edu">snaropan@ur.rochester.edu</a>
          <span>Please CC <a href="mailto:nrsreeharshae@gmail.com">nrsreeharshae@gmail.com</a></span>
          <a class="button button-primary" href="${editorialMailto}">Compose email with CC</a>
        </div>
      </div>
    `;

    contactCard.dataset.expanded = 'true';
  };

  addRefinementStyles();
  applySiteIdentity();
  addIdentityRibbon();
  refineNavigation();
  refineHomepageHero();
  addInterestsSection();
  highlightNsfAward();
  expandContactSection();

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