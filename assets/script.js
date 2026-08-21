(() => {
  const currentScriptUrl = document.currentScript?.src || new URL('assets/script.js', window.location.href).href;
  const coreScript = document.createElement('script');
  coreScript.src = new URL('script-core.js', currentScriptUrl).href;
  coreScript.async = false;
  coreScript.dataset.siteCore = 'true';

  const ORCID_URL = 'https://orcid.org/0000-0003-2882-8996';
  const BOOK_URL = 'https://doi.org/10.1088/978-0-7503-1266-0';
  const NSF_URL = 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2606713';

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

      .hero-name-context .identity-line { display: block !important; }
      .hero-name-context .identity-line + .identity-line { margin-top: 1px; }

      .hero-name-context .formal-name,
      .hero-name-context .published-name,
      .hero-name-context .orcid-line {
        color: var(--muted) !important;
        font-weight: 560 !important;
      }

      .formal-name-label,
      .published-name-label,
      .orcid-label {
        color: var(--accent-2);
        font-weight: 760;
      }

      .hero-name-context .orcid-line a {
        color: inherit;
        text-decoration-line: underline;
        text-decoration-style: dotted;
        text-decoration-color: color-mix(in srgb, var(--accent-2) 50%, transparent);
        text-underline-offset: .18em;
      }

      .hero-name-context .orcid-line a:hover,
      .hero-name-context .orcid-line a:focus-visible { color: var(--accent-2); }

      .identity-ribbon-affiliation .identity-alias,
      .contact-detail-block .name-note { display: none !important; }

      .footer-preferred-name {
        color: var(--muted);
        font-family: var(--serif);
        font-size: .9rem;
        font-style: italic;
      }

      /* Copyable email addresses: visibly selectable, click to copy, never open a mail app. */
      .copy-email {
        cursor: copy !important;
        text-decoration-line: underline;
        text-decoration-style: dotted;
        text-underline-offset: .18em;
        user-select: text;
      }

      .copy-email::after {
        content: '  ⧉';
        font-size: .78em;
        opacity: .62;
        text-decoration: none;
      }

      .copy-email:hover,
      .copy-email:focus-visible { color: var(--accent-2); }

      .copy-toast {
        position: fixed;
        right: 20px;
        bottom: 20px;
        z-index: 9999;
        max-width: calc(100vw - 40px);
        padding: 10px 14px;
        border: 1px solid var(--border);
        border-radius: 999px;
        background: var(--surface);
        color: var(--text);
        box-shadow: var(--shadow);
        font-size: .82rem;
        opacity: 0;
        transform: translateY(8px);
        pointer-events: none;
        transition: opacity .18s ease, transform .18s ease;
      }

      .copy-toast.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Linked research-record tiles. */
      .stat-link {
        position: relative;
        display: block;
        color: inherit !important;
        text-decoration: none !important;
        cursor: pointer;
        transition: transform .18s ease, border-color .18s ease, box-shadow .18s ease;
      }

      .stat-link:hover,
      .stat-link:focus-visible {
        transform: translateY(-2px);
        border-color: color-mix(in srgb, var(--accent-2) 45%, var(--border));
        box-shadow: var(--shadow);
      }

      .stat-link::after {
        content: '↗';
        position: absolute;
        top: 11px;
        right: 14px;
        color: var(--accent-2);
        font-size: .8rem;
        opacity: .72;
      }

      .inline-award-link {
        color: inherit;
        text-decoration-color: color-mix(in srgb, var(--accent-2) 55%, transparent);
        text-underline-offset: .18em;
      }

      .inline-award-link:hover,
      .inline-award-link:focus-visible { color: var(--accent-2); }

      /* Hero: a three-stage scientific idea flow. */
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

      .hero-concept-card svg { display: block; width: 100%; height: auto; }

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

      .hero-concept-card .trajectory-ghost {
        fill: none;
        stroke: color-mix(in srgb, var(--accent) 24%, transparent);
        stroke-width: 13;
        stroke-linecap: round;
      }

      .hero-concept-card .trajectory {
        fill: none;
        stroke: var(--accent);
        stroke-width: 4.75;
        stroke-linecap: round;
      }

      .hero-concept-card .tagged-particle {
        fill: var(--surface);
        stroke: var(--accent);
        stroke-width: 3.5;
      }

      .hero-concept-card .bath-dot {
        fill: color-mix(in srgb, var(--accent-2) 24%, var(--surface));
        stroke: color-mix(in srgb, var(--accent-2) 62%, var(--border));
        stroke-width: 1.25;
      }

      .hero-concept-card .flow {
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        opacity: .45;
      }

      .hero-concept-card .stage-number {
        fill: var(--accent-2);
        font-family: var(--sans);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .13em;
      }

      .hero-concept-card .stage-title {
        fill: var(--text);
        font-family: var(--sans);
        font-size: 16px;
        font-weight: 760;
      }

      .hero-concept-card .stage-note {
        fill: var(--muted);
        font-family: var(--sans);
        font-size: 11px;
      }

      .hero-concept-card .formula {
        fill: var(--muted);
        font-family: var(--serif);
        font-size: 13px;
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
        .copy-toast { right: 12px; bottom: 12px; max-width: calc(100vw - 24px); }
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
    });
  };

  const copyText = async (text) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) {
      // Fall through to the legacy selection-based copy method.
    }

    const helper = document.createElement('textarea');
    helper.value = text;
    helper.setAttribute('readonly', '');
    helper.style.position = 'fixed';
    helper.style.opacity = '0';
    document.body.appendChild(helper);
    helper.select();
    let copied = false;
    try { copied = document.execCommand('copy'); } catch (_) { copied = false; }
    helper.remove();
    return copied;
  };

  let toastTimer;
  const showCopyToast = (message) => {
    let toast = document.querySelector('#copy-email-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copy-email-toast';
      toast.className = 'copy-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
  };

  const makeEmailsCopyable = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      if (link.dataset.copyReady === 'true') return;

      const href = link.getAttribute('href') || '';
      const email = decodeURIComponent(href.slice(7).split('?')[0]).trim();
      if (!email) return;

      link.dataset.copyReady = 'true';
      link.dataset.copyEmail = email;
      link.classList.add('copy-email');
      link.removeAttribute('href');
      link.setAttribute('role', 'button');
      link.setAttribute('tabindex', '0');
      link.setAttribute('title', `Copy ${email}`);
      link.setAttribute('aria-label', `Copy email address ${email}`);

      if (/^email(?: with cc)?$/i.test(link.textContent.trim())) link.textContent = email;

      const activate = async (event) => {
        event.preventDefault();
        const copied = await copyText(email);
        showCopyToast(copied ? `Copied ${email}` : `Could not copy ${email}`);
      };

      link.addEventListener('click', activate);
      link.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') activate(event);
      });
    });
  };

  const linkifyResearchRecord = () => {
    const targets = {
      '23': [ORCID_URL, 'View N. R. Sree Harsha on ORCID'],
      '1': [BOOK_URL, 'View The Foundations of Electric Circuit Theory'],
      'NSF': [NSF_URL, 'View NSF Award PHY-2606713']
    };

    document.querySelectorAll('.stat-grid .stat').forEach((stat) => {
      if (stat.matches('a')) return;
      const key = stat.querySelector('strong')?.textContent.trim();
      const target = targets[key];
      if (!target) return;

      const link = document.createElement('a');
      link.className = `${stat.className} stat-link`;
      link.href = target[0];
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', target[1]);
      link.innerHTML = stat.innerHTML;
      stat.replaceWith(link);
    });

    document.querySelectorAll('h2, h3, span').forEach((element) => {
      if (element.closest('a')) return;
      if (element.textContent.trim() !== 'NSF Award PHY-2606713') return;
      const link = document.createElement('a');
      link.className = 'inline-award-link';
      link.href = NSF_URL;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = element.textContent.trim();
      link.setAttribute('aria-label', 'View NSF Award PHY-2606713');
      element.replaceChildren(link);
    });
  };

  const simplifyIdentity = () => {
    const publicationName = 'N. R. Sree Harsha';
    const displayName = `${publicationName}, PhD`;
    const formalName = 'Sree Harsha Naropanth Ramamurthy';
    const orcid = '0000-0003-2882-8996';

    document.querySelectorAll('.brand-name').forEach((brand) => { brand.textContent = publicationName; });
    document.querySelectorAll('.brand').forEach((brand) => { brand.setAttribute('aria-label', `${publicationName}, home`); });

    const heroName = document.querySelector('.hero-copy h1');
    if (heroName) heroName.textContent = displayName;

    const oldContext = document.querySelector('.hero-name-context');
    if (oldContext) {
      oldContext.innerHTML = `
        <span class="identity-line formal-name"><span class="formal-name-label">Formal name:</span> ${formalName}</span>
        <span class="identity-line published-name"><span class="published-name-label">Published as:</span> ${publicationName}</span>
        <span class="identity-line orcid-line"><span class="orcid-label">ORCID:</span> <a href="${ORCID_URL}" target="_blank" rel="me noopener">${orcid}</a></span>
      `;
      oldContext.setAttribute('aria-label', `Formal name: ${formalName}. Published as: ${publicationName}. ORCID: ${orcid}.`);
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
    visual.setAttribute('aria-label', 'A conceptual scientific graphic showing microscopic fluctuations becoming a memory kernel and then effective coarse-grained dynamics');

    visual.innerHTML = `
      <figure class="hero-concept-card">
        <svg viewBox="0 0 720 430" role="img" aria-labelledby="heroGraphicTitle heroGraphicDesc">
          <title id="heroGraphicTitle">From microscopic fluctuations to effective dynamics</title>
          <desc id="heroGraphicDesc">Three stages show microscopic fluctuations, a memory kernel, and the resulting coarse-grained motion.</desc>

          <defs>
            <marker id="flowArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor"></path>
            </marker>
          </defs>

          <path class="faint-line" d="M40 337 H670"></path>

          <text class="stage-number" x="54" y="62">01</text>
          <text class="stage-title" x="54" y="88">Microscopic fluctuations</text>
          <text class="stage-note" x="54" y="110">equilibrium bath</text>

          <g aria-hidden="true">
            <circle class="bath-dot" cx="68" cy="174" r="6"></circle>
            <circle class="bath-dot" cx="93" cy="139" r="5"></circle>
            <circle class="bath-dot" cx="121" cy="185" r="7"></circle>
            <circle class="bath-dot" cx="152" cy="147" r="5"></circle>
            <circle class="bath-dot" cx="176" cy="195" r="6"></circle>
            <circle class="bath-dot" cx="101" cy="224" r="5"></circle>
            <circle class="bath-dot" cx="153" cy="236" r="5"></circle>
            <path class="noise" d="M62 212 C75 172, 86 248, 99 193 S123 239, 136 190 S161 233, 176 201 S197 222, 215 209"></path>
          </g>
          <text class="formula" x="54" y="303">⟨R(t)R(0)⟩</text>

          <path class="flow" d="M224 210 H256" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path>

          <text class="stage-number" x="278" y="62">02</text>
          <text class="stage-title" x="278" y="88">Memory kernel</text>
          <text class="stage-note" x="278" y="110">retained history</text>

          <path class="memory" d="M286 166 C310 175, 316 216, 330 243 S363 270, 384 239 S417 188, 439 215"></path>
          <text class="formula" x="354" y="303">K(t)</text>

          <path class="flow" d="M448 210 H478" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path>

          <text class="stage-number" x="488" y="62">03</text>
          <text class="stage-title" x="488" y="88">Effective dynamics</text>
          <text class="stage-note" x="488" y="110">coarse-grained motion</text>

          <g aria-hidden="true">
            <path class="trajectory-ghost" d="M492 231 C518 170, 547 173, 568 220 S600 279, 624 205"></path>
            <path class="trajectory" d="M492 231 C518 170, 547 173, 568 220 S600 279, 624 205"></path>
            <circle class="tagged-particle" cx="492" cy="231" r="9"></circle>
            <circle class="tagged-particle" cx="568" cy="220" r="9"></circle>
            <circle class="tagged-particle" cx="624" cy="205" r="9"></circle>
          </g>

          <text class="formula" x="488" y="303">reduced description</text>
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
    linkifyResearchRecord();
    makeEmailsCopyable();
  };

  coreScript.addEventListener('load', refineSite, { once: true });
  coreScript.addEventListener('error', () => { console.error('The site script could not be loaded.'); }, { once: true });
  document.body.appendChild(coreScript);
})();
