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

      .hero-name-context span {
        display: inline !important;
      }

      .hero-name-context span::before {
        display: none !important;
      }

      .hero-name-context .formal-name {
        color: var(--muted) !important;
        font-weight: 560 !important;
      }

      .formal-name-label {
        color: var(--accent-2);
        font-weight: 760;
      }

      .identity-ribbon-affiliation .identity-alias,
      .contact-detail-block .name-note {
        display: none !important;
      }

      .footer-preferred-name {
        color: var(--muted);
        font-family: var(--serif);
        font-size: .9rem;
        font-style: italic;
      }

      /* Homepage research graphic: one idea, three stages. */
      .hero-visual {
        align-self: center;
      }

      .hero-concept-card {
        position: relative;
        margin: 0;
        overflow: hidden;
        border: 1px solid var(--border);
        border-radius: 28px;
        background:
          radial-gradient(circle at 18% 18%, color-mix(in srgb, var(--accent-2) 12%, transparent), transparent 30%),
          linear-gradient(145deg, var(--surface), var(--surface-2));
        box-shadow: var(--shadow);
      }

      .hero-concept-card::before {
        position: absolute;
        inset: 18px;
        border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
        border-radius: 20px;
        content: '';
        pointer-events: none;
      }

      .hero-concept-card svg {
        display: block;
        width: 100%;
        height: auto;
      }

      .hero-concept-card .guide {
        fill: none;
        stroke: var(--border);
        stroke-width: 1.4;
      }

      .hero-concept-card .flow {
        fill: none;
        stroke: var(--accent-2);
        stroke-width: 2.2;
        stroke-linecap: round;
        opacity: .7;
      }

      .hero-concept-card .bath-dot {
        fill: color-mix(in srgb, var(--accent-2) 22%, var(--surface));
        stroke: color-mix(in srgb, var(--accent-2) 68%, var(--border));
        stroke-width: 1.5;
      }

      .hero-concept-card .tagged-particle {
        fill: var(--surface);
        stroke: var(--accent);
        stroke-width: 4;
      }

      .hero-concept-card .kernel-axis {
        fill: none;
        stroke: var(--border);
        stroke-width: 1.5;
      }

      .hero-concept-card .kernel {
        fill: none;
        stroke: var(--accent-2);
        stroke-width: 4.5;
        stroke-linecap: round;
      }

      .hero-concept-card .trajectory {
        fill: none;
        stroke: var(--accent);
        stroke-width: 5;
        stroke-linecap: round;
      }

      .hero-concept-card .trajectory-ghost {
        fill: none;
        stroke: color-mix(in srgb, var(--accent) 25%, transparent);
        stroke-width: 12;
        stroke-linecap: round;
      }

      .hero-concept-card .stage-number {
        fill: var(--accent-2);
        font-family: var(--serif);
        font-size: 15px;
        font-style: italic;
        font-weight: 600;
      }

      .hero-concept-card .stage-title {
        fill: var(--text);
        font-family: var(--sans);
        font-size: 18px;
        font-weight: 760;
      }

      .hero-concept-card .stage-note {
        fill: var(--muted);
        font-family: var(--sans);
        font-size: 13px;
        font-weight: 540;
      }

      .hero-concept-card .formula {
        fill: var(--muted);
        font-family: var(--serif);
        font-size: 16px;
        font-style: italic;
      }

      .hero-concept-card .chip rect {
        fill: var(--surface);
        stroke: var(--border);
        stroke-width: 1.2;
      }

      .hero-concept-card .chip text {
        fill: var(--accent);
        font-family: var(--sans);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .08em;
      }

      .hero-concept-card figcaption {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        padding: 0 28px 24px;
        color: var(--muted);
        font-size: .78rem;
        line-height: 1.5;
      }

      .hero-concept-card figcaption strong {
        color: var(--text);
        font-weight: 720;
      }

      @media (max-width: 720px) {
        .hero h1 {
          font-size: clamp(2.65rem, 12vw, 3.65rem) !important;
        }

        .hero-concept-card figcaption {
          display: block;
          padding-inline: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const simplifyEmailCopy = () => {
    const ribbon = document.querySelector('.identity-ribbon');
    if (ribbon) {
      ribbon.setAttribute('aria-label', 'Academic affiliation, postal address, email, and CC address');
    }

    document.querySelectorAll('.identity-ribbon-contact .ribbon-kicker').forEach((label) => {
      label.textContent = 'Email';
    });

    document.querySelectorAll('.identity-ribbon-contact span:not(.ribbon-kicker)').forEach(replaceCcLine);

    document.querySelectorAll('.priority-card-editorial .priority-card-label').forEach((label) => {
      label.textContent = 'Email';
    });

    document.querySelectorAll('.contact-detail-block').forEach((block) => {
      const heading = block.querySelector('strong');
      if (heading && /editors|correspondence/i.test(heading.textContent)) {
        heading.textContent = 'Email';
      }
      block.querySelectorAll('span').forEach(replaceCcLine);
      const button = block.querySelector('.button[href^="mailto:snaropan@ur.rochester.edu"]');
      if (button) button.textContent = 'Email with CC';
    });

    document.querySelectorAll('a[href^="mailto:snaropan@ur.rochester.edu"]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      link.setAttribute(
        'href',
        href.replace('Professional%20or%20editorial%20correspondence', 'Website%20contact')
      );
    });
  };

  const simplifyIdentity = () => {
    const publicationName = 'N. R. Sree Harsha';
    const formalName = 'Sree Harsha Naropanth Ramamurthy';

    document.querySelectorAll('.brand-name').forEach((brand) => {
      brand.textContent = publicationName;
    });

    document.querySelectorAll('.brand').forEach((brand) => {
      brand.setAttribute('aria-label', `${publicationName}, home`);
    });

    const heroName = document.querySelector('.hero-copy h1');
    if (heroName) {
      heroName.textContent = publicationName;
    }

    const oldContext = document.querySelector('.hero-name-context');
    if (oldContext) {
      oldContext.innerHTML = `<span class="formal-name"><span class="formal-name-label">Formal name:</span> ${formalName}</span>`;
      oldContext.setAttribute('aria-label', `Formal name: ${formalName}`);
    }

    const ribbonStrong = document.querySelector('.identity-ribbon-affiliation strong');
    if (ribbonStrong) {
      ribbonStrong.textContent = 'Postdoctoral Research Associate';
    }

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
    visual.setAttribute(
      'aria-label',
      'Conceptual diagram showing microscopic fluctuations producing a memory kernel and an effective coarse-grained trajectory'
    );

    visual.innerHTML = `
      <figure class="hero-concept-card">
        <svg viewBox="0 0 680 430" role="img" aria-labelledby="gleGraphicTitle gleGraphicDesc">
          <title id="gleGraphicTitle">From microscopic fluctuations to effective dynamics</title>
          <desc id="gleGraphicDesc">Three-stage Generalized Langevin Equation concept: fluctuating microscopic degrees of freedom, a decaying memory kernel, and the resulting effective trajectory.</desc>
          <defs>
            <marker id="flowArrow" markerWidth="9" markerHeight="9" refX="7" refY="3.5" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L7,3.5 L0,7" fill="none" stroke="currentColor" stroke-width="1.4"></path>
            </marker>
          </defs>

          <text class="stage-number" x="52" y="62">01</text>
          <text class="stage-title" x="52" y="88">Fluctuations</text>
          <text class="stage-note" x="52" y="110">microscopic bath</text>

          <g aria-hidden="true">
            <circle class="bath-dot" cx="72" cy="170" r="8"></circle>
            <circle class="bath-dot" cx="116" cy="150" r="6"></circle>
            <circle class="bath-dot" cx="145" cy="186" r="7"></circle>
            <circle class="bath-dot" cx="92" cy="222" r="6"></circle>
            <circle class="bath-dot" cx="154" cy="236" r="8"></circle>
            <circle class="bath-dot" cx="54" cy="252" r="5"></circle>
            <circle class="bath-dot" cx="129" cy="276" r="5"></circle>
            <circle class="bath-dot" cx="179" cy="153" r="5"></circle>
            <circle class="tagged-particle" cx="112" cy="211" r="18"></circle>
            <path class="guide" d="M72 170L112 211L145 186M92 222L112 211L154 236M116 150L112 211M112 211L129 276"></path>
          </g>
          <text class="formula" x="52" y="325">many fast degrees of freedom</text>

          <path class="flow" d="M207 210 H254" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path>

          <text class="stage-number" x="276" y="62">02</text>
          <text class="stage-title" x="276" y="88">Memory</text>
          <text class="stage-note" x="276" y="110">history-dependent response</text>

          <g aria-hidden="true">
            <path class="kernel-axis" d="M280 260 H426M288 143 V274"></path>
            <path class="kernel" d="M292 157 C307 163, 312 189, 322 215 S344 249, 360 227 S381 191, 397 210 S414 233, 424 226"></path>
          </g>
          <text class="formula" x="294" y="303">K(t)</text>

          <path class="flow" d="M448 210 H493" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path>

          <text class="stage-number" x="514" y="62">03</text>
          <text class="stage-title" x="514" y="88">Effective dynamics</text>
          <text class="stage-note" x="514" y="110">coarse-grained motion</text>

          <g aria-hidden="true">
            <path class="trajectory-ghost" d="M518 231 C544 170, 573 173, 594 220 S626 279, 650 205"></path>
            <path class="trajectory" d="M518 231 C544 170, 573 173, 594 220 S626 279, 650 205"></path>
            <circle class="tagged-particle" cx="518" cy="231" r="9"></circle>
            <circle class="tagged-particle" cx="594" cy="220" r="9"></circle>
            <circle class="tagged-particle" cx="650" cy="205" r="9"></circle>
          </g>
          <text class="formula" x="514" y="303">reduced description</text>

          <g class="chip" transform="translate(278 354)">
            <rect width="62" height="34" rx="17"></rect>
            <text x="31" y="22" text-anchor="middle">GLE</text>
          </g>
          <g class="chip" transform="translate(350 354)">
            <rect width="62" height="34" rx="17"></rect>
            <text x="31" y="22" text-anchor="middle">FDT</text>
          </g>
        </svg>
        <figcaption>
          <strong>Microscopic fluctuations → memory → effective dynamics</strong>
          <span>The organizing idea behind much of my current work.</span>
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
  coreScript.addEventListener('error', () => {
    console.error('The site script could not be loaded.');
  }, { once: true });

  document.body.appendChild(coreScript);
})();
