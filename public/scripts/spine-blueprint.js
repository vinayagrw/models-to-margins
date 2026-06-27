/* Blueprint Spine — scroll-spy + load orchestration.
   Builds the sticky scene index from the article's h2 nodes, then lights up
   the active node/index entry as the reader scrolls. No-ops gracefully if the
   blueprint DOM is absent. Real anchor links keep navigation keyboard-friendly. */
(() => {
  const article = document.querySelector('.dd-blueprint');
  if (!article) return;

  const index = article.querySelector('.bp-spine-index');
  const heads = Array.from(article.querySelectorAll('.bp-body h2'));
  if (!index || heads.length === 0) return;

  // Build the index from each scene heading.
  heads.forEach((h2, i) => {
    if (!h2.id) h2.id = `scene-node-${i + 1}`;
    const raw = h2.textContent.trim();
    // "Scene 3 — Four families (no single tool…)" → no="03", label="Four families"
    const m = raw.match(/^Scene\s+(\d+)\s*[—–-]\s*(.+)$/i);
    const no = (m ? m[1] : String(i + 1)).padStart(2, '0');
    let label = m ? m[2] : raw;
    label = label.replace(/\s*\(.*$/, '').trim();

    const link = document.createElement('a');
    link.className = 'bp-index-link';
    link.href = `#${h2.id}`;
    link.innerHTML =
      `<span class="bp-index-no">${no}</span><span class="bp-index-label">${label}</span>`;
    index.appendChild(link);
  });

  const links = Array.from(index.querySelectorAll('.bp-index-link'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => a.classList.toggle('is-active', j === i));
    // On the mobile horizontal strip, keep the active chip centered —
    // scroll only the strip itself (NOT via Element.scrollIntoView, which
    // would drag the whole sticky-positioned page back to the top).
    if (i !== lastActive && links[i] && index.scrollWidth > index.clientWidth + 4) {
      const link = links[i];
      const left = link.offsetLeft - (index.clientWidth - link.offsetWidth) / 2;
      index.scrollLeft = Math.max(0, left);
    }
    lastActive = i;
  };

  // Track which heading is closest to the top reading line.
  const ratios = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
      // Active = the last heading whose top has crossed the reading line.
      let active = 0;
      const line = window.innerHeight * 0.28;
      heads.forEach((h2, i) => {
        if (h2.getBoundingClientRect().top <= line) active = i;
      });
      setActive(active);
    },
    { rootMargin: '-26% 0px -68% 0px', threshold: [0, 1] }
  );
  heads.forEach((h2) => observer.observe(h2));

  // Initial state + recompute on scroll for precision.
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      let active = 0;
      const line = window.innerHeight * 0.28;
      heads.forEach((h2, i) => {
        if (h2.getBoundingClientRect().top <= line) active = i;
      });
      setActive(active);
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  setActive(0);

  // ----------------------------------------------------------------------
  // Theme relay — push the site's light/dark choice into every embedded
  // instrument so the visuals match the page (paper vs cyanotype).
  // ----------------------------------------------------------------------
  const frames = Array.from(article.querySelectorAll('.visual-frame iframe'));
  const currentTheme = () =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
  const pushTheme = (theme) => {
    frames.forEach((f) => {
      try {
        f.contentWindow.postMessage({ type: 'm2m:theme', theme }, '*');
      } catch {
        /* cross-origin guard — same-origin in practice, ignore otherwise */
      }
    });
  };
  // Sync each frame once it has loaded, on every site toggle, and once now.
  frames.forEach((f) => f.addEventListener('load', () => pushTheme(currentTheme())));
  window.addEventListener('m2m:themechange', (e) =>
    pushTheme((e.detail && e.detail.theme) || currentTheme())
  );
  pushTheme(currentTheme());

  // One-shot load reveal.
  requestAnimationFrame(() => article.classList.add('bp-loaded'));
})();
