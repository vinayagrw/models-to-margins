/* Waybill Spine — scroll-spy + load orchestration for the custody-chain
   deep-dive template. Builds the sticky chain index from the article's h2
   nodes, marks the active leg as the reader scrolls, and relays the site theme
   into embedded exhibit iframes. No-ops if the waybill DOM is absent.

   Structurally this is the house spine script (see spine-ledger.js). The two
   deliberate differences: the heading regex accepts "Leg" alongside the usual
   Chapter/Scene, because this template numbers custody handoffs rather than
   chapters, and the scan line is a named constant rather than three separate
   hardcoded copies. */
(() => {
  const article = document.querySelector('.dd-waybill');
  if (!article) return;

  const index = article.querySelector('.wb-spine-index');
  const heads = Array.from(article.querySelectorAll('.wb-body h2'));
  if (!index || heads.length === 0) return;

  /* Where down the viewport a heading counts as "the one being read". Shared by
     both drivers below so they can never disagree about the active entry. */
  const SCAN_LINE = 0.28;

  heads.forEach((h2, i) => {
    if (!h2.id) h2.id = `leg-node-${i + 1}`;
    const raw = h2.textContent.trim();
    const m = raw.match(/^(?:Leg|Chapter|Scene)\s+(\d+)\s*[—–-]\s*(.+)$/i);
    const no = (m ? m[1] : String(i + 1)).padStart(2, '0');
    let label = m ? m[2] : raw;
    label = label.replace(/\s*\(.*$/, '').trim();

    const link = document.createElement('a');
    link.className = 'wb-index-link';
    link.href = `#${h2.id}`;
    link.innerHTML =
      `<span class="wb-index-no">${no}</span><span class="wb-index-label">${label}</span>`;
    index.appendChild(link);
  });

  const links = Array.from(index.querySelectorAll('.wb-index-link'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => {
      a.classList.toggle('is-active', j === i);
      /* Everything above the active leg is stamped as travelled, which is what
         makes the rail read as a chain rather than a list of links. */
      a.classList.toggle('is-done', j < i);
      if (j === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    // Mobile horizontal strip: center the active chip by scrolling the strip
    // itself, never Element.scrollIntoView (it drags the sticky page around).
    if (i !== lastActive && links[i] && index.scrollWidth > index.clientWidth + 4) {
      const link = links[i];
      const left = link.offsetLeft - (index.clientWidth - link.offsetWidth) / 2;
      index.scrollLeft = Math.max(0, left);
    }
    lastActive = i;
  };

  const currentIndex = () => {
    let active = 0;
    const line = window.innerHeight * SCAN_LINE;
    heads.forEach((h2, i) => {
      if (h2.getBoundingClientRect().top <= line) active = i;
    });
    return active;
  };

  const observer = new IntersectionObserver(() => setActive(currentIndex()), {
    rootMargin: '-26% 0px -68% 0px',
    threshold: [0, 1]
  });
  heads.forEach((h2) => observer.observe(h2));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(currentIndex());
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  setActive(0);

  // ----------------------------------------------------------------------
  // Theme relay — push the site's light/dark choice into every embedded
  // exhibit so the visuals match the page (bond paper vs night desk).
  // ----------------------------------------------------------------------
  const frames = Array.from(article.querySelectorAll('.visual-frame iframe'));
  const currentTheme = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const pushTheme = (theme) => {
    frames.forEach((f) => {
      try {
        f.contentWindow.postMessage({ type: 'm2m:theme', theme }, '*');
      } catch {
        /* same-origin in practice; ignore otherwise */
      }
    });
  };
  frames.forEach((f) => f.addEventListener('load', () => pushTheme(currentTheme())));
  window.addEventListener('m2m:themechange', (e) =>
    pushTheme((e.detail && e.detail.theme) || currentTheme())
  );
  pushTheme(currentTheme());

  requestAnimationFrame(() => article.classList.add('wb-loaded'));
})();
