/* Gantry Dock Index — scroll-spy + load orchestration for the "gantry"
   deep-dive template. Builds the sticky dock-door index from the article's h2
   nodes, indexes figures under their chapter, marks the active dock as the
   reader scrolls, drives the fill gauge from read progress, and relays the
   site theme into embedded figure iframes. No-ops if absent. */
(() => {
  const article = document.querySelector('.dd-gantry');
  if (!article) return;

  const spine = article.querySelector('.gy-spine-index');
  const heads = Array.from(article.querySelectorAll('.gy-body h2'));
  if (!spine || heads.length === 0) return;

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------- Gauge shell -- */
  /* The bar is decorative; the mono "LOAD nn%" label is the accessible value,
     and it is never the only position cue — the active dock plate also
     carries aria-current="true". */
  const gauge = document.createElement('div');
  gauge.className = 'gy-gauge';
  const gaugeLabel = document.createElement('span');
  gaugeLabel.className = 'gy-gauge-label';
  gaugeLabel.textContent = 'Load 0%';
  const gaugeTrack = document.createElement('div');
  gaugeTrack.className = 'gy-gauge-track';
  gaugeTrack.setAttribute('aria-hidden', 'true');
  const gaugeFill = document.createElement('span');
  gaugeFill.className = 'gy-gauge-fill';
  if (reduceMotion) gaugeFill.style.transition = 'none';
  gaugeTrack.appendChild(gaugeFill);
  gauge.appendChild(gaugeLabel);
  gauge.appendChild(gaugeTrack);
  spine.appendChild(gauge);

  const list = document.createElement('div');
  list.className = 'gy-dock-list';
  spine.appendChild(list);

  /* ------------------------------------------------------------- Indexing -- */
  /* Figures are indexed under the chapter they sit in, so the rail is a map of
     the page rather than six links. A frame opts in with data-fig="short
     label"; one without it is simply not indexed. Assignment is by document
     order, which is also the order the reader meets them. */
  const items = Array.from(
    article.querySelectorAll('.gy-body h2, .gy-body .visual-frame[data-fig]')
  );
  const groups = [];
  let figNo = 0;

  heads.forEach((h2, i) => {
    if (!h2.id) h2.id = `chapter-node-${i + 1}`;
    const raw = h2.textContent.trim();
    const m = raw.match(/^(?:Chapter|Scene)\s+(\d+)\s*[—–-]\s*(.+)$/i);
    const no = (m ? m[1] : String(i + 1)).padStart(2, '0');
    let label = m ? m[2] : raw;
    label = label.replace(/\s*\(.*$/, '').trim();

    const group = document.createElement('div');
    group.className = 'gy-dock-group';

    const link = document.createElement('a');
    link.className = 'gy-dock';
    link.href = `#${h2.id}`;
    // The visible title truncates (and disappears entirely on the mobile chip
    // rail), so the full chapter title lives in the accessible name.
    link.setAttribute('aria-label', `Dock ${no} — ${label}`);
    link.innerHTML =
      `<span class="gy-dock-no">D-${no}</span>` +
      `<span class="gy-dock-title"></span>`;
    link.querySelector('.gy-dock-title').textContent = label;
    group.appendChild(link);

    const start = items.indexOf(h2);
    for (let j = start + 1; j < items.length && items[j].tagName !== 'H2'; j++) {
      const frame = items[j];
      if (!frame.id) frame.id = `figure-${++figNo}`;
      const fl = document.createElement('a');
      fl.className = 'gy-dock-fig';
      fl.href = `#${frame.id}`;
      fl.textContent = frame.dataset.fig;
      group.appendChild(fl);
    }

    list.appendChild(group);
    groups.push(group);
  });

  const links = Array.from(list.querySelectorAll('.gy-dock'));

  /* ---------------------------------------------------------- Scroll spy --- */
  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => {
      a.classList.toggle('is-active', j === i);
      if (j === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    // If focus is on a figure link inside the group we are about to collapse,
    // move it to that group's dock link first — display:none on a focused
    // element silently drops focus to <body> otherwise.
    groups.forEach((g, j) => {
      if (j !== i && g.classList.contains('is-open') && g.contains(document.activeElement)) {
        links[j].focus();
      }
    });
    groups.forEach((g, j) => g.classList.toggle('is-open', j === i));
    // Bring the active plate into view by scrolling the list itself, never
    // Element.scrollIntoView (it drags the sticky page around). The list runs
    // horizontally on narrow screens and vertically on wide ones, so measure
    // which axis actually overflows rather than assuming.
    if (i !== lastActive && links[i]) {
      const rr = list.getBoundingClientRect();
      const lr = links[i].getBoundingClientRect();
      if (list.scrollWidth > list.clientWidth + 4) {
        list.scrollLeft += (lr.left - rr.left) - (rr.width - lr.width) / 2;
      } else if (list.scrollHeight > list.clientHeight + 4) {
        list.scrollTop += (lr.top - rr.top) - (rr.height - lr.height) / 2;
      }
    }
    lastActive = i;
  };

  /* Read progress: how far the article body has passed the viewport bottom. */
  let lastPct = -1;
  const setGauge = () => {
    const body = article.querySelector('.gy-body') || article;
    const rect = body.getBoundingClientRect();
    const span = rect.height - window.innerHeight;
    const pct =
      span <= 0
        ? (rect.bottom <= window.innerHeight ? 100 : 0)
        : Math.min(100, Math.max(0, Math.round((-rect.top / span) * 100)));
    if (pct === lastPct) return;
    lastPct = pct;
    gaugeFill.style.width = `${pct}%`;
    gaugeLabel.textContent = `Load ${pct}%`;
  };

  const currentIndex = () => {
    let active = 0;
    const line = window.innerHeight * 0.28;
    heads.forEach((h2, i) => {
      if (h2.getBoundingClientRect().top <= line) active = i;
    });
    return active;
  };

  const observer = new IntersectionObserver(
    () => {
      setActive(currentIndex());
      setGauge();
    },
    { rootMargin: '-26% 0px -68% 0px', threshold: [0, 1] }
  );
  heads.forEach((h2) => observer.observe(h2));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(currentIndex());
      setGauge();
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  setActive(0);
  setGauge();

  // ----------------------------------------------------------------------
  // Theme relay — push the site's light/dark choice into every embedded
  // figure so the visuals match the page.
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

  requestAnimationFrame(() => article.classList.add('gy-loaded'));
})();
