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
        font-size: clamp(3.15rem, 5vw, 5.15rem) !important;
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

      .identity-ribbon-affiliation .identity-alias {
        display: none !important;
      }

      .hero-visual {
        align-self: center;
      }

      .hero-image-frame {
        position: relative;
        margin: 0;
        overflow: hidden;
        border: 1px solid color-mix(in srgb, var(--accent-2) 34%, var(--border));
        border-radius: 28px;
        background: #07131c;
        box-shadow: 0 28px 80px rgba(0, 0, 0, .28), 0 0 0 1px rgba(255, 255, 255, .025) inset;
        isolation: isolate;
      }

      .hero-image-frame::after {
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(145deg, rgba(255,255,255,.06), transparent 28%, transparent 72%, rgba(13,38,52,.22));
        content: '';
        pointer-events: none;
      }

      .hero-image-frame img {
        display: block;
        width: 100%;
        height: auto;
        aspect-ratio: 740 / 515;
        object-fit: cover;
      }

      .hero-image-note {
        display: flex;
        position: absolute;
        z-index: 2;
        right: 22px;
        bottom: 20px;
        align-items: center;
        gap: 7px;
        padding: 8px 11px;
        border: 1px solid rgba(255,255,255,.18);
        border-radius: 999px;
        background: rgba(4,14,22,.60);
        color: rgba(255,255,255,.82);
        font-size: .69rem;
        font-weight: 720;
        letter-spacing: .07em;
        text-transform: uppercase;
        backdrop-filter: blur(10px);
      }

      .hero-image-note::before {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #78c6cc;
        box-shadow: 0 0 12px #78c6cc;
        content: '';
      }

      .contact-detail-block .name-note {
        display: none !important;
      }

      .footer-preferred-name {
        color: var(--muted);
        font-family: var(--serif);
        font-size: .9rem;
        font-style: italic;
      }

      @media (max-width: 720px) {
        .hero h1 {
          font-size: clamp(2.8rem, 13vw, 4rem) !important;
        }

        .hero-image-note {
          right: 14px;
          bottom: 13px;
          font-size: .61rem;
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

  const replaceHeroImage = () => {
    const visual = document.querySelector('.hero-visual');
    if (!visual) return;

    visual.setAttribute('aria-label', 'Scientific illustration connecting microscopic fluctuations, memory, spacetime, nature, and emergent order');
    visual.removeAttribute('aria-hidden');
    visual.innerHTML = `
      <figure class="hero-image-frame">
        <img
          src="assets/harsha-hero-science.webp"
          width="740"
          height="515"
          alt="A spiral galaxy above mountains and a lake, overlaid with curved scientific trajectories and a memory-kernel waveform"
          loading="eager"
          decoding="async">
        <figcaption class="hero-image-note">Physics · memory · emergence</figcaption>
      </figure>
    `;
  };

  const refineSite = () => {
    addElegantOverrides();
    simplifyEmailCopy();
    simplifyIdentity();
    replaceHeroImage();
  };

  coreScript.addEventListener('load', refineSite, { once: true });
  coreScript.addEventListener('error', () => {
    console.error('The site script could not be loaded.');
  }, { once: true });

  document.body.appendChild(coreScript);
})();
