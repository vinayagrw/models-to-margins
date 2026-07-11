/* Console Spine — scroll-spy + load orchestration for the Control Room
   deep-dive template. Builds the sticky scene index from the article's h2
   nodes, lights the active entry as the reader scrolls, and relays the site
   theme into embedded instrument iframes. No-ops if the console DOM is absent. */
(() => {
  const article = document.querySelector('.dd-console');
  if (!article) return;

  const index = article.querySelector('.cr-spine-index');
  const heads = Array.from(article.querySelectorAll('.cr-body h2'));
  if (!index || heads.length === 0) return;

  heads.forEach((h2, i) => {
    if (!h2.id) h2.id = `scene-node-${i + 1}`;
    const raw = h2.textContent.trim();
    const m = raw.match(/^Scene\s+(\d+)\s*[—–-]\s*(.+)$/i);
    const no = (m ? m[1] : String(i + 1)).padStart(2, '0');
    let label = m ? m[2] : raw;
    label = label.replace(/\s*\(.*$/, '').trim();

    const link = document.createElement('a');
    link.className = 'cr-index-link';
    link.href = `#${h2.id}`;
    link.innerHTML =
      `<span class="cr-index-no">${no}</span><span class="cr-index-label">${label}</span>`;
    index.appendChild(link);
  });

  const links = Array.from(index.querySelectorAll('.cr-index-link'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => a.classList.toggle('is-active', j === i));
    // Mobile horizontal strip: center the active chip by scrolling the strip
    // itself, never Element.scrollIntoView (it drags the sticky page around).
    if (i !== lastActive && links[i] && index.scrollWidth > index.clientWidth + 4) {
      const link = links[i];
      const left = link.offsetLeft - (index.clientWidth - link.offsetWidth) / 2;
      index.scrollLeft = Math.max(0, left);
    }
    lastActive = i;
  };

  const observer = new IntersectionObserver(
    () => {
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
  // instrument so the visuals match the page (daylight shift vs control room).
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

  requestAnimationFrame(() => article.classList.add('cr-loaded'));
})();
