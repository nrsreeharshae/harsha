(() => {
  const currentScriptUrl = document.currentScript?.src || new URL('assets/script.js', window.location.href).href;
  const coreScript = document.createElement('script');
  coreScript.src = new URL('script-core.js', currentScriptUrl).href;
  coreScript.async = false;
  coreScript.dataset.siteCore = 'true';

  const replaceCcLine = (element) => {
    if (!element || !element.textContent.trim().startsWith('Please CC')) return;
    element.innerHTML = 'CC: <a href="mailto:nrsreeharshae@gmail.com">nrsreeharshae@gmail.com</a>';
  };

  const addElegantOverrides = () => {
    if (document.querySelector('#elegant-identity-overrides')) return;
    const style = document.createElement('style');
    style.id = 'elegant-identity-overrides';
    style.textContent = `
      .brand-name {
        font-family: var(--serif);
        font-size: 1.05rem;
        font-weight: 600;
        letter-spacing: -.015em;
      }

      .hero h1 {
        display: block !important;
        max-width: 760px;
        margin-top: 3px;
        font-size: clamp(2.95rem, 4.1vw, 4.3rem) !important;
        font-weight: 500;
        line-height: .96 !important;
        letter-spacing: -.052em !important;
      }

      .hero-name-context {
        display: block !important;
        max-width: 680px;
        margin: 15px 0 0 !important;
        color: var(--muted);
        font-size: .86rem;
        font-weight: 540;
        line-height: 1.55;
      }

      .hero-name-context span { display: inline !important; }
      .hero-name-context span::before { display: none !important; }
      .hero-name-context .formal-name { color: var(--muted) !important; font-weight: 560 !important; }
      .formal-name-label { color: var(--accent-2); font-weight: 760; }

      .identity-ribbon-affiliation .identity-alias,
      .contact-detail-block .name-note { display: none !important; }

      .footer-preferred-name {
        color: var(--muted);
        font-family: var(--serif);
        font-size: .9rem;
        font-style: italic;
      }

      /* Hero: one continuous idea, not an infographic. */
      .hero-visual { align-self: center; }

      .hero-concept-card {
        position: relative;
        margin: 0;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 28px;
        background:
          radial-gradient(circle at 24% 35%, color-mix(in srgb, var(--accent-2) 10%, transparent), transparent 34%),
          linear-gradient(145deg, var(--surface), var(--surface-2));
        box-shadow: var(--shadow);
      }

      .hero-concept-card svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .hero-concept-card .faint-line {
        fill: none;
        stroke: var(--border);
        stroke-width: 1.25;
      }

      .hero-concept-card .noise {
        fill: none;
        stroke: var(--accent-2);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: .55;
      }

      .hero-concept-card .memory {
        fill: none;
        stroke: var(--accent-2);
        stroke-width: 4.25;
        stroke-linecap: round;
      }

      .hero-concept-card .motion-ghost {
        fill: none;
        stroke: color-mix(in srgb, var(--accent) 24%, transparent);
        stroke-width: 13;
        stroke-linecap: round;
      }

      .hero-concept-card .motion {
        fill: none;
        stroke: var(--accent);
        stroke-width: 4.75;
        stroke-linecap: round;
      }

      .hero-concept-card .particle {
        fill: var(--surface);
        stroke: var(--accent);
        stroke-width: 3.5;
      }

      .hero-concept-card .bath-dot {
        fill: color-mix(in srgb, var(--accent-2) 24%, var(--surface));
        stroke: color-mix(in srgb, var(--accent-2) 62%, var(--border));
        stroke-width: 1.25;
      }

      .hero-concept-card .symbol {
        fill: var(--muted);
        font-family: var(--serif);
        font-size: 16px;
        font-style: italic;
      }

      .hero-concept-card figcaption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        padding: 0 28px 24px;
        color: var(--muted);
        font-size: .78rem;
        line-height: 1.5;
      }

      .hero-concept-card figcaption strong {
        color: var(--text);
        font-weight: 700;
      }

      @media (max-width: 720px) {
        .hero h1 { font-size: clamp(2.65rem, 12vw, 3.65rem) !important; }
        .hero-concept-card figcaption { display: block; padding-inline: 20px; }
      }
    `;
    document.head.appendChild(style);
  };

  const simplifyEmailCopy = () => {
    const ribbon = document.querySelector('.identity-ribbon');
    if (ribbon) ribbon.setAttribute('aria-label', 'Academic affiliation, postal address, email, and CC address');

    document.querySelectorAll('.identity-ribbon-contact .ribbon-kicker').forEach((label) => { label.textContent = 'Email'; });
    document.querySelectorAll('.identity-ribbon-contact span:not(.ribbon-kicker)').forEach(replaceCcLine);
    document.querySelectorAll('.priority-card-editorial .priority-card-label').forEach((label) => { label.textContent = 'Email'; });

    document.querySelectorAll('.contact-detail-block').forEach((block) => {
      const heading = block.querySelector('strong');
      if (heading && /editors|correspondence/i.test(heading.textContent)) heading.textContent = 'Email';
      block.querySelectorAll('span').forEach(replaceCcLine);
      const button = block.querySelector('.button[href^="mailto:snaropan@ur.rochester.edu"]');
      if (button) button.textContent = 'Email with CC';
    });

    document.querySelectorAll('a[href^="mailto:snaropan@ur.rochester.edu"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href) link.setAttribute('href', href.replace('Professional%20or%20editorial%20correspondence', 'Website%20contact'));
    });
  };

  const simplifyIdentity = () => {
    const publicationName = 'N. R. Sree Harsha';
    const formalName = 'Sree Harsha Naropanth Ramamurthy';

    document.querySelectorAll('.brand-name').forEach((brand) => { brand.textContent = publicationName; });
    document.querySelectorAll('.brand').forEach((brand) => { brand.setAttribute('aria-label', `${publicationName}, home`); });

    const heroName = document.querySelector('.hero-copy h1');
    if (heroName) heroName.textContent = publicationName;

    const oldContext = document.querySelector('.hero-name-context');
    if (oldContext) {
      oldContext.innerHTML = `<span class="formal-name"><span class="formal-name-label">Formal name:</span> ${formalName}</span>`;
      oldContext.setAttribute('aria-label', `Formal name: ${formalName}`);
    }

    const ribbonStrong = document.querySelector('.identity-ribbon-affiliation strong');
    if (ribbonStrong) ribbonStrong.textContent = 'Postdoctoral Research Associate';

    document.querySelectorAll('.identity-ribbon-affiliation .identity-alias').forEach((alias) => alias.remove());

    const address = document.querySelector('.contact-detail-block address');
    if (address) {
      address.innerHTML = `
        ${publicationName}, PhD<br>
        Postdoctoral Research Associate<br>
        Department of Electrical and Computer Engineering<br>
        University of Rochester<br>
        405 Computer Studies Building<br>
        120 Trustee Rd, Rochester, NY 14620
      `;
    }

    document.querySelectorAll('.contact-detail-block .name-note').forEach((note) => note.remove());

    const footer = document.querySelector('.footer-inner');
    if (footer) {
      const middle = footer.querySelector('p:nth-of-type(2)');
      if (middle) {
        middle.className = 'footer-preferred-name';
        middle.textContent = 'Please call me Harsha — I prefer simplicity and clarity.';
      }
    }

    const authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) authorMeta.setAttribute('content', formalName);
    document.title = `${publicationName} | Theoretical & Computational Physicist`;
  };

  const simplifyHeroGraphic = () => {
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;

    visual.removeAttribute('aria-hidden');
    visual.setAttribute('aria-label', 'A conceptual scientific graphic showing microscopic fluctuations becoming memory and then smooth effective motion');

    visual.innerHTML = `
      <figure class="hero-concept-card">
        <svg viewBox="0 0 680 390" role="img" aria-labelledby="heroGraphicTitle heroGraphicDesc">
          <title id="heroGraphicTitle">From fluctuation to effective motion</title>
          <desc id="heroGraphicDesc">Microscopic fluctuations on the left feed into a decaying memory response and finally into a smooth coarse-grained trajectory.</desc>

          <path class="faint-line" d="M42 278 H638"></path>

          <g aria-hidden="true">
            <circle class="bath-dot" cx="58" cy="153" r="6"></circle>
            <circle class="bath-dot" cx="83" cy="118" r="5"></circle>
            <circle class="bath-dot" cx="111" cy="164" r="7"></circle>
            <circle class="bath-dot" cx="142" cy="126" r="5"></circle>
            <circle class="bath-dot" cx="166" cy="174" r="6"></circle>
            <circle class="bath-dot" cx="91" cy="203" r="5"></circle>
            <circle class="bath-dot" cx="143" cy="215" r="5"></circle>
            <path class="noise" d="M52 191 C65 151, 76 227, 89 172 S113 218, 126 169 S151 212, 166 180 S187 201, 205 188"></path>
          </g>

          <path class="memory" d="M226 151 C248 159, 255 202, 270 230 S304 260, 326 227 S360 173, 383 204 S416 245, 438 225"></path>
          <text class="symbol" x="323" y="300" text-anchor="middle">K(t)</text>

          <path class="motion-ghost" d="M466 229 C493 178, 524 174, 546 215 S585 267, 625 196"></path>
          <path class="motion" d="M466 229 C493 178, 524 174, 546 215 S585 267, 625 196"></path>
          <circle class="particle" cx="466" cy="229" r="8"></circle>
          <circle class="particle" cx="625" cy="196" r="8"></circle>
        </svg>
        <figcaption>
          <strong>Fluctuation → memory → motion</strong>
          <span>One recurring idea across my current work.</span>
        </figcaption>
      </figure>
    `;
  };

  const refineSite = () => {
    addElegantOverrides();
    simplifyEmailCopy();
    simplifyIdentity();
    simplifyHeroGraphic();
  };

  coreScript.addEventListener('load', refineSite, { once: true });
  coreScript.addEventListener('error', () => { console.error('The site script could not be loaded.'); }, { once: true });
  document.body.appendChild(coreScript);
})();
