(() => {
  const scriptUrl = document.currentScript?.src || new URL('assets/script.js', window.location.href).href;
  const core = document.createElement('script');
  core.src = new URL('script-core.js', scriptUrl).href;
  core.async = false;

  const SCHOLAR_URL = 'https://scholar.google.com/citations?user=cXQjdbMAAAAJ&hl=en';
  const ORCID_URL = 'https://orcid.org/0000-0003-2882-8996';
  const BOOK_URL = 'https://doi.org/10.1088/978-0-7503-1266-0';
  const NSF_URL = 'https://www.nsf.gov/awardsearch/showAward?AWD_ID=2606713';
  const SITE_YEAR = '2026';

  const addOverrides = () => {
    if (document.querySelector('#site-final-overrides')) return;
    const style = document.createElement('style');
    style.id = 'site-final-overrides';
    style.textContent = `
      .brand-name{font-family:var(--serif);font-size:1.02rem;font-weight:600;letter-spacing:-.015em}

      /* Compact academic identity. */
      .hero h1{display:block!important;max-width:700px;margin-top:3px;font-size:clamp(2.5rem,3.05vw,3.35rem)!important;font-weight:500;line-height:1!important;letter-spacing:-.042em!important}
      .page-hero{padding-top:clamp(58px,7vw,88px)!important;padding-bottom:clamp(54px,7vw,84px)!important}
      .page-hero h1{font-size:clamp(2.35rem,4vw,3.55rem)!important;line-height:1!important}
      .hero-name-context{display:block!important;max-width:680px;margin:14px 0 0!important;color:var(--muted);font-size:.84rem;font-weight:540;line-height:1.55}
      .hero-name-context span::before,.hero-name-context .identity-line::before{content:none!important;display:none!important}
      .hero-name-context .identity-line{display:block!important;margin:0!important;padding:0!important}
      .hero-name-context .identity-line+.identity-line{margin-top:1px!important}
      .hero-name-context .formal-name,.hero-name-context .published-name,.hero-name-context .orcid-line{color:var(--muted)!important;font-weight:560!important}
      .formal-name-label,.published-name-label,.orcid-label{color:var(--accent-2);font-weight:760}
      .hero-name-context .orcid-line a{color:inherit;text-decoration-line:underline;text-decoration-style:dotted;text-decoration-color:color-mix(in srgb,var(--accent-2) 50%,transparent);text-underline-offset:.18em}
      .hero-name-context .orcid-line a:hover,.hero-name-context .orcid-line a:focus-visible{color:var(--accent-2)}
      .identity-ribbon-affiliation .identity-alias,.contact-detail-block .name-note{display:none!important}
      .footer-preferred-name{color:var(--muted);font-family:var(--serif);font-size:.88rem;font-style:italic}

      /* Email address remains normal selectable text; the icon is the copy action. */
      .email-copy-group{display:inline-flex;align-items:center;gap:.34rem;max-width:100%;vertical-align:middle}
      .email-address{cursor:text;user-select:all;-webkit-user-select:all;color:inherit;overflow-wrap:anywhere}
      .copy-email-button{display:inline-grid;place-items:center;width:1.55rem;height:1.55rem;flex:0 0 auto;margin:0;padding:0;border:1px solid var(--border);border-radius:6px;background:transparent;color:var(--muted);cursor:pointer;transition:.16s}
      .copy-email-button:hover,.copy-email-button:focus-visible{color:var(--accent-2);border-color:color-mix(in srgb,var(--accent-2) 45%,var(--border));background:color-mix(in srgb,var(--accent-2) 7%,transparent)}
      .copy-email-button svg{width:13px;height:13px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
      .hero-actions .email-copy-group,.contact-actions .email-copy-group{min-height:46px;padding:9px 14px;border:1px solid var(--border);border-radius:999px;background:var(--surface)}
      .copy-toast{position:fixed;right:20px;bottom:20px;z-index:9999;max-width:calc(100vw - 40px);padding:9px 13px;border:1px solid var(--border);border-radius:999px;background:var(--surface);color:var(--text);box-shadow:var(--shadow);font-size:.8rem;opacity:0;transform:translateY(8px);pointer-events:none;transition:opacity .18s,transform .18s}
      .copy-toast.is-visible{opacity:1;transform:translateY(0)}

      /* Linked metric tiles. */
      .stat-link{position:relative;display:flex;color:inherit!important;text-decoration:none!important;cursor:pointer;transition:.18s}
      .stat-link:hover,.stat-link:focus-visible{transform:translateY(-2px);border-color:color-mix(in srgb,var(--accent-2) 45%,var(--border));box-shadow:var(--shadow-soft)}
      .stat-link::after{content:'↗';position:absolute;top:11px;right:14px;color:var(--accent-2);font-size:.76rem;opacity:.7}
      .inline-award-link,.inline-orcid-link{color:inherit;text-decoration-color:color-mix(in srgb,var(--accent-2) 55%,transparent);text-underline-offset:.18em}
      .inline-award-link:hover,.inline-award-link:focus-visible,.inline-orcid-link:hover,.inline-orcid-link:focus-visible{color:var(--accent-2)}

      /* Publications should read like a compact bibliography. */
      .publication-section+.publication-section{margin-top:54px!important}
      .publication-section>h2{font-size:clamp(1.45rem,2.2vw,1.9rem)!important;margin-bottom:18px!important}
      .publication{padding-top:20px!important;padding-bottom:20px!important}
      .publication h3{font-size:clamp(1.03rem,1.55vw,1.28rem)!important;line-height:1.3!important;letter-spacing:-.012em!important}
      .publication p{font-size:.87rem!important}.publication .venue{margin-top:5px!important}.publication>div:last-child>a{font-size:.82rem}
      .publication-status{display:inline-flex;margin-left:6px;padding:2px 7px;border:1px solid var(--border);border-radius:999px;color:var(--accent-2);font-size:.69rem;font-style:normal;font-weight:760;line-height:1.35}

      /* Compact teaching section. */
      .teaching-section{border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:var(--surface-2)}
      .teaching-layout{display:grid;gap:clamp(34px,6vw,74px);grid-template-columns:minmax(230px,.72fr) minmax(0,1.28fr)}
      .teaching-section h2{margin:0;font-family:var(--serif);font-size:clamp(2rem,3.5vw,3rem);font-weight:500;letter-spacing:-.035em;line-height:1.05}
      .teaching-content{display:grid;gap:21px}.teaching-list{display:grid;gap:10px}
      .teaching-item{display:grid;gap:2px;padding-bottom:10px;border-bottom:1px solid var(--border)}
      .teaching-item strong{font-size:.94rem}.teaching-item span{color:var(--muted);font-size:.84rem}
      .teaching-prepared,.teaching-philosophy{margin:0;color:var(--muted);font-size:.94rem;line-height:1.65}
      .teaching-prepared strong,.teaching-philosophy strong{color:var(--text)}

      /* Current hero concept graphic. */
      .hero-visual{align-self:center}.hero-concept-card{position:relative;margin:0;overflow:hidden;border:1px solid var(--border);border-radius:28px;background:radial-gradient(circle at 24% 35%,color-mix(in srgb,var(--accent-2) 10%,transparent),transparent 34%),linear-gradient(145deg,var(--surface),var(--surface-2));box-shadow:var(--shadow)}
      .hero-concept-card svg{display:block;width:100%;height:auto}.hero-concept-card .faint-line{fill:none;stroke:var(--border);stroke-width:1.25}.hero-concept-card .noise{fill:none;stroke:var(--accent-2);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;opacity:.55}.hero-concept-card .memory{fill:none;stroke:var(--accent-2);stroke-width:4.25;stroke-linecap:round}.hero-concept-card .trajectory-ghost{fill:none;stroke:color-mix(in srgb,var(--accent) 24%,transparent);stroke-width:13;stroke-linecap:round}.hero-concept-card .trajectory{fill:none;stroke:var(--accent);stroke-width:4.75;stroke-linecap:round}.hero-concept-card .tagged-particle{fill:var(--surface);stroke:var(--accent);stroke-width:3.5}.hero-concept-card .bath-dot{fill:color-mix(in srgb,var(--accent-2) 24%,var(--surface));stroke:color-mix(in srgb,var(--accent-2) 62%,var(--border));stroke-width:1.25}.hero-concept-card .flow{fill:none;stroke:currentColor;stroke-width:2;opacity:.45}.hero-concept-card .stage-number{fill:var(--accent-2);font-family:var(--sans);font-size:11px;font-weight:800;letter-spacing:.13em}.hero-concept-card .stage-title{fill:var(--text);font-family:var(--sans);font-size:16px;font-weight:760}.hero-concept-card .stage-note{fill:var(--muted);font-family:var(--sans);font-size:11px}.hero-concept-card .formula{fill:var(--muted);font-family:var(--serif);font-size:13px;font-style:italic}.hero-concept-card figcaption{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:0 28px 24px;color:var(--muted);font-size:.78rem;line-height:1.5}.hero-concept-card figcaption strong{color:var(--text);font-weight:700}

      /* Tighten the homepage opening so the hero follows the affiliation strip without a large dead zone. */
      .hero{padding-top:clamp(34px,4.2vw,58px)!important;padding-bottom:48px!important}
      .hero-grid{align-items:start!important;gap:clamp(34px,5vw,70px)!important}
      .hero-copy{padding-top:0!important}
      .hero .eyebrow{margin-bottom:10px!important}
      .hero-name-context{margin-top:11px!important}
      .hero-affiliation{margin-top:18px!important}
      .hero-bio{margin-top:17px!important}
      .hero-priority-grid{margin-top:18px!important}
      .hero-actions{margin-top:20px!important}
      .profile-links{margin-top:18px!important}
      .hero-visual{align-self:start!important;margin-top:12px!important}
      .stat-grid{margin-top:48px!important}

      @media(max-width:760px){.hero{padding-top:30px!important}.hero h1{font-size:clamp(2.25rem,10vw,3rem)!important}.hero-visual{margin-top:8px!important}.hero-concept-card figcaption{display:block;padding-inline:20px}.copy-toast{right:12px;bottom:12px;max-width:calc(100vw - 24px)}.teaching-layout{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  };

  const simplifyIdentity = () => {
    const displayName = 'N. R. Sree Harsha';
    const alternatePublicationName = 'N. R. S. Harsha';
    const formalName = 'Sree Harsha Naropanth Ramamurthy';
    const orcid = '0000-0003-2882-8996';

    document.querySelectorAll('.brand-name').forEach((node) => { node.textContent = displayName; });
    document.querySelectorAll('.brand').forEach((node) => { node.setAttribute('aria-label', `${displayName}, home`); });

    const heroName = document.querySelector('.hero-copy h1');
    if (heroName) heroName.textContent = `${displayName}, PhD`;

    const heroOpenNote = document.querySelector('.hero-open-note');
    if (heroOpenNote) heroOpenNote.textContent = 'I am always happy to discuss new ideas and to collaborate when there is an interesting question worth exploring.';

    const context = document.querySelector('.hero-name-context');
    if (context) {
      context.innerHTML = `
        <div class="identity-line formal-name"><span class="formal-name-label">Formal name:</span> ${formalName}</div>
        <div class="identity-line published-name"><span class="published-name-label">Also published as</span> ${alternatePublicationName}</div>
        <div class="identity-line orcid-line"><span class="orcid-label">ORCID:</span> <a href="${ORCID_URL}" target="_blank" rel="noopener">${orcid}</a></div>`;
      context.setAttribute('aria-label', `Formal name: ${formalName}. Also published as ${alternatePublicationName}. ORCID: ${orcid}.`);
    }

    const ribbonRole = document.querySelector('.identity-ribbon-affiliation strong');
    if (ribbonRole) ribbonRole.textContent = 'Postdoctoral Research Associate';
    document.querySelectorAll('.identity-ribbon-affiliation .identity-alias').forEach((node) => node.remove());

    const address = document.querySelector('.contact-detail-block address');
    if (address) address.innerHTML = `${displayName}, PhD<br>Postdoctoral Research Associate<br>Department of Electrical and Computer Engineering<br>University of Rochester<br>405 Computer Studies Building<br>120 Trustee Rd, Rochester, NY 14620`;
    document.querySelectorAll('.contact-detail-block .name-note').forEach((node) => node.remove());

    const footer = document.querySelector('.footer-inner');
    const middle = footer?.querySelector('p:nth-of-type(2)');
    if (middle) { middle.className = 'footer-preferred-name'; middle.textContent = 'Please call me Harsha — I prefer simplicity and clarity.'; }

    const authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) authorMeta.setAttribute('content', formalName);
    if (heroName) document.title = `${displayName} | Theoretical & Computational Physicist`;
  };

  const simplifyEmailLabels = () => {
    const ribbon = document.querySelector('.identity-ribbon');
    if (ribbon) ribbon.setAttribute('aria-label', 'Academic affiliation, postal address, email, and CC address');
    document.querySelectorAll('.identity-ribbon-contact .ribbon-kicker,.priority-card-editorial .priority-card-label').forEach((node) => { node.textContent = 'Email'; });
    document.querySelectorAll('.contact-detail-block').forEach((block) => {
      const heading = block.querySelector('strong');
      if (heading && /editors|correspondence/i.test(heading.textContent)) heading.textContent = 'Email';
    });
  };

  const copyText = async (text) => {
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return true; } } catch (_) {}
    const helper = document.createElement('textarea');
    helper.value = text; helper.setAttribute('readonly',''); helper.style.position='fixed'; helper.style.opacity='0'; document.body.appendChild(helper); helper.select();
    let copied=false; try { copied=document.execCommand('copy'); } catch (_) {} helper.remove(); return copied;
  };

  let toastTimer;
  const showToast = (text) => {
    let toast=document.querySelector('#copy-email-toast');
    if(!toast){toast=document.createElement('div');toast.id='copy-email-toast';toast.className='copy-toast';toast.setAttribute('role','status');toast.setAttribute('aria-live','polite');document.body.appendChild(toast)}
    toast.textContent=text;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),1800);
  };

  const makeEmailsSelectable = () => {
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const href=link.getAttribute('href')||'';
      const email=decodeURIComponent(href.slice(7).split('?')[0]).trim();
      if(!email)return;
      const group=document.createElement('span');group.className='email-copy-group';
      const address=document.createElement('span');address.className='email-address';address.textContent=email;address.title='Select email address';
      const button=document.createElement('button');button.type='button';button.className='copy-email-button';button.title=`Copy ${email}`;button.setAttribute('aria-label',`Copy email address ${email}`);button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>';
      button.addEventListener('click',async()=>showToast((await copyText(email))?`Copied ${email}`:`Could not copy ${email}`));
      group.append(address,button);link.replaceWith(group);
    });
  };

  const linkifyResearchRecord = () => {
    const targets={
      '23':[SCHOLAR_URL,'View journal record on Google Scholar'],
      '1':[BOOK_URL,'View The Foundations of Electric Circuit Theory'],
      'NSF':[NSF_URL,'View NSF Award PHY-2606713'],
      '15':[ORCID_URL,'View peer-review record on ORCID']
    };
    document.querySelectorAll('.stat-grid .stat').forEach((stat)=>{
      const key=stat.querySelector('strong')?.textContent.trim();const target=targets[key];if(!target)return;
      if(key==='NSF'){stat.querySelector('strong').textContent='Co-PI';stat.querySelector('span').textContent='NSF · PHY-2606713'}
      const a=document.createElement('a');a.className=`${stat.className} stat-link`;a.href=target[0];a.target='_blank';a.rel='noopener';a.setAttribute('aria-label',target[1]);a.innerHTML=stat.innerHTML;stat.replaceWith(a);
    });
    document.querySelectorAll('h2,h3,span').forEach((node)=>{
      if(node.closest('a')||node.textContent.trim()!=='NSF Award PHY-2606713')return;
      const a=document.createElement('a');a.className='inline-award-link';a.href=NSF_URL;a.target='_blank';a.rel='noopener';a.textContent=node.textContent.trim();node.replaceChildren(a);
    });
    document.querySelectorAll('h2,h3,p,strong,span').forEach((node)=>{
      if(node.closest('a')||!/^Referee for 15 international journals:?$/i.test(node.textContent.trim()))return;
      const a=document.createElement('a');a.className='inline-orcid-link';a.href=ORCID_URL;a.target='_blank';a.rel='noopener';a.textContent=node.textContent.trim();node.replaceChildren(a);
    });
  };

  const fixFooterYear = () => document.querySelectorAll('[data-current-year]').forEach((node)=>{node.textContent=SITE_YEAR});

  const addNarrativeBridge = () => {
    const prose=document.querySelector('#about .prose');if(!prose||prose.querySelector('.research-bridge'))return;
    const p=document.createElement('p');p.className='research-bridge';p.textContent='My earlier work on space-charge-limited transport sought geometry-independent structure and reduced descriptions in electron-device dynamics; the GLE–FDT program extends that same approach to systems with memory and fluctuations, replacing microscopic kinetic detail with controlled coarse-grained dynamics.';prose.appendChild(p);
  };

  const addTeachingSection = () => {
    if(document.querySelector('.teaching-section'))return;
    const experience=document.querySelector('#experience');const section=experience?.closest('section');if(!section)return;
    section.insertAdjacentHTML('afterend',`
      <section class="section teaching-section" id="teaching">
        <div class="container teaching-layout">
          <div><p class="eyebrow">Teaching</p><h2>Clear mathematics, physical intuition, and computation</h2></div>
          <div class="teaching-content">
            <div class="teaching-list">
              <div class="teaching-item"><strong>Instructor of Record · MA 158 Precalculus</strong><span>Purdue University · Fall 2020 · sole instructor for 40–50 first-year students</span></div>
              <div class="teaching-item"><strong>Teaching Assistant · MA 163 Calculus I</strong><span>Purdue University · Fall 2019</span></div>
              <div class="teaching-item"><strong>Invited Guest Lecturer · NUCL 200</strong><span>Purdue University · January 2023</span></div>
            </div>
            <p class="teaching-prepared"><strong>Prepared to teach:</strong> electron and device physics, plasma physics, computational physics and numerical methods, and non-equilibrium/statistical mechanics.</p>
            <p class="teaching-philosophy"><strong>Teaching approach:</strong> I start from a physical question, build the minimum mathematics needed to answer it, and then use computation or limiting cases to test the result. I want students to leave a course able to reconstruct an argument rather than merely recall its final equation.</p>
          </div>
        </div>
      </section>`);
  };

  const reconcilePublications = () => {
    const sections=[...document.querySelectorAll('.publication-section')];
    const journal=sections.find((s)=>/Refereed journal articles/i.test(s.querySelector('h2')?.textContent||''));
    if(journal&&![...journal.querySelectorAll('h3')].some((h)=>h.textContent.includes('Response to Comment on'))){
      const sharp=[...journal.querySelectorAll('.publication')].find((a)=>a.querySelector('h3')?.textContent.includes('Analytic solutions for space-charge-limited current density from a sharp tip'));
      const html=`
        <article class="publication" data-publication-type="journal"><div class="publication-year">2021</div><div><h3>Response to Comment on “A coordinate system invariant formulation for space-charge limited current in vacuum” [APL 119, 206101 (2021)]</h3><p>A. M. Darr, <strong>N. R. S. Harsha</strong>, and A. L. Garner</p><p class="venue">Applied Physics Letters 119, 206102</p><a href="https://doi.org/10.1063/5.0068355" target="_blank" rel="noopener">DOI ↗</a></div></article>
        <article class="publication" data-publication-type="journal"><div class="publication-year">2021</div><div><h3>Response to “Comment on ‘A coordinate system invariant formulation for space-charge limited current in vacuum’” [Applied Physics Letters 118, 266101 (2021)]</h3><p>A. M. Darr, <strong>N. R. S. Harsha</strong>, and A. L. Garner</p><p class="venue">Applied Physics Letters 118, 266102</p><a href="https://doi.org/10.1063/5.0057754" target="_blank" rel="noopener">DOI ↗</a></div></article>`;
      if(sharp)sharp.insertAdjacentHTML('beforebegin',html);else journal.querySelector('.publication-list')?.insertAdjacentHTML('beforeend',html);
    }
    if(journal){const n=journal.querySelectorAll('.publication[data-publication-type="journal"]').length;journal.querySelector('h2').textContent=`Refereed journal articles (${n})`}

    const status=new Map([
      ['A Generalized Landau–Khalatnikov Model for Ferroelectric Switching','In preparation'],
      ['Non-Markovian Space-Charge-Limited Transport: Steady-State Scaling and Device Admittance','In preparation'],
      ['Noise-Fidelity-Constrained Passive Approximation of Constant-Phase Elements','In preparation']
    ]);
    document.querySelectorAll('.publication[data-publication-type="preprint"]').forEach((article)=>{
      const title=article.querySelector('h3')?.textContent.trim();const venue=article.querySelector('.venue');if(!title||!venue)return;
      if(status.has(title))venue.innerHTML=`<span class="publication-status">${status.get(title)}</span>`;
      else if(title.includes('Nonlinear dynamical friction'))venue.innerHTML='arXiv:2602.04545 <span class="publication-status">Preprint</span>';
    });
    const manuscript=sections.find((s)=>/Preprint and current manuscripts/i.test(s.querySelector('h2')?.textContent||''));if(manuscript)manuscript.querySelector('h2').textContent='Preprint and manuscripts';
    const filter=document.querySelector('[data-publication-filter="preprint"]');if(filter)filter.textContent='Preprints & manuscripts';
  };

  const enablePublicationFilters = () => {
    const buttons=[...document.querySelectorAll('[data-publication-filter]')];if(!buttons.length)return;
    const publications=[...document.querySelectorAll('.publication[data-publication-type]')];
    buttons.forEach((button)=>button.addEventListener('click',()=>{
      const filter=button.dataset.publicationFilter;
      buttons.forEach((b)=>b.setAttribute('aria-pressed',String(b===button)));
      publications.forEach((article)=>{article.dataset.hidden=String(filter!=='all'&&article.dataset.publicationType!==filter)});
      document.querySelectorAll('.publication-section').forEach((section)=>{
        const items=[...section.querySelectorAll('.publication[data-publication-type]')];
        if(items.length)section.dataset.empty=String(items.every((item)=>item.dataset.hidden==='true'));
      });
    }));
  };

  const simplifyHeroGraphic = () => {
    const visual=document.querySelector('.hero-visual');if(!visual)return;
    visual.removeAttribute('aria-hidden');visual.setAttribute('aria-label','A conceptual scientific graphic showing microscopic fluctuations becoming a memory kernel and then effective coarse-grained dynamics');
    visual.innerHTML=`<figure class="hero-concept-card"><svg viewBox="0 0 720 430" role="img" aria-labelledby="heroGraphicTitle heroGraphicDesc"><title id="heroGraphicTitle">From microscopic fluctuations to effective dynamics</title><desc id="heroGraphicDesc">Three stages show microscopic fluctuations, a memory kernel, and the resulting coarse-grained motion.</desc><defs><marker id="flowArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"></path></marker></defs><path class="faint-line" d="M40 337 H670"></path><text class="stage-number" x="54" y="62">01</text><text class="stage-title" x="54" y="88">Microscopic fluctuations</text><text class="stage-note" x="54" y="110">equilibrium bath</text><g aria-hidden="true"><circle class="bath-dot" cx="68" cy="174" r="6"></circle><circle class="bath-dot" cx="93" cy="139" r="5"></circle><circle class="bath-dot" cx="121" cy="185" r="7"></circle><circle class="bath-dot" cx="152" cy="147" r="5"></circle><circle class="bath-dot" cx="176" cy="195" r="6"></circle><circle class="bath-dot" cx="101" cy="224" r="5"></circle><circle class="bath-dot" cx="153" cy="236" r="5"></circle><path class="noise" d="M62 212 C75 172,86 248,99 193 S123 239,136 190 S161 233,176 201 S197 222,215 209"></path></g><text class="formula" x="54" y="303">⟨R(t)R(0)⟩</text><path class="flow" d="M224 210 H256" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path><text class="stage-number" x="278" y="62">02</text><text class="stage-title" x="278" y="88">Memory kernel</text><text class="stage-note" x="278" y="110">retained history</text><path class="memory" d="M286 166 C310 175,316 216,330 243 S363 270,384 239 S417 188,439 215"></path><text class="formula" x="354" y="303">K(t)</text><path class="flow" d="M448 210 H478" marker-end="url(#flowArrow)" style="color:var(--accent-2)"></path><text class="stage-number" x="488" y="62">03</text><text class="stage-title" x="488" y="88">Effective dynamics</text><text class="stage-note" x="488" y="110">coarse-grained motion</text><g aria-hidden="true"><path class="trajectory-ghost" d="M492 231 C518 170,547 173,568 220 S600 279,624 205"></path><path class="trajectory" d="M492 231 C518 170,547 173,568 220 S600 279,624 205"></path><circle class="tagged-particle" cx="492" cy="231" r="9"></circle><circle class="tagged-particle" cx="568" cy="220" r="9"></circle><circle class="tagged-particle" cx="624" cy="205" r="9"></circle></g><text class="formula" x="488" y="303">reduced description</text></svg><figcaption><strong>Fluctuation → memory → motion</strong><span>One recurring idea across my current work.</span></figcaption></figure>`;
  };

  const refine = () => {
    addOverrides();
    simplifyIdentity();
    simplifyEmailLabels();
    fixFooterYear();
    addNarrativeBridge();
    addTeachingSection();
    reconcilePublications();
    enablePublicationFilters();
    simplifyHeroGraphic();
    linkifyResearchRecord();
    makeEmailsSelectable();
  };

  core.addEventListener('load',refine,{once:true});
  core.addEventListener('error',()=>console.error('The site script could not be loaded.'),{once:true});
  document.body.appendChild(core);
})();