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

  coreScript.addEventListener('load', simplifyEmailCopy, { once: true });
  coreScript.addEventListener('error', () => {
    console.error('The site script could not be loaded.');
  }, { once: true });

  document.body.appendChild(coreScript);
})();
