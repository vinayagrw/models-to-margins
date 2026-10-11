/* Sitrep Spine — phase-timeline nav + scroll-spy for the after-action-review
   deep-dive template. Builds the phase index from the article's h2 nodes,
   indexes exhibits under the chapter they sit in, marks the active phase as
   the reader scrolls, and relays the site theme into embedded exhibit
   iframes. No-ops if the template is absent. Cloned from spine-atlas.js. */
(() => {
  const article = document.querySelector('.dd-sitrep');
  if (!article) return;

  const spine = article.querySelector('.sr-spine-index');
  const heads = Array.from(article.querySelectorAll('.sr-body h2'));
  if (!spine || heads.length === 0) return;

  /* Exhibits are indexed under the chapter they sit in, so the spine is a map
     of the report rather than six links. A frame opts in with data-fig="short
     label"; one without it is simply not indexed. Assignment is by document
     order, which is also the order the reader meets them. */
  const items = Array.from(
    article.querySelectorAll('.sr-body h2, .sr-body .visual-frame[data-fig]')
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
    group.className = 'sr-phase-group';

    const link = document.createElement('a');
    link.className = 'sr-phase';
    link.href = `#${h2.id}`;
    /* The phase mark is static typographic text, never a running clock. */
    link.innerHTML =
      `<span class="sr-phase-node" aria-hidden="true"></span>` +
      `<span class="sr-phase-no">Phase ${no}</span>` +
      `<span class="sr-phase-label">${label}</span>`;
    group.appendChild(link);

    const start = items.indexOf(h2);
    for (let j = start + 1; j < items.length && items[j].tagName !== 'H2'; j++) {
      const frame = items[j];
      if (!frame.id) frame.id = `figure-${++figNo}`;
      const fl = document.createElement('a');
      fl.className = 'sr-phase-fig';
      fl.href = `#${frame.id}`;
      fl.textContent = frame.dataset.fig;
      group.appendChild(fl);
    }

    spine.appendChild(group);
    groups.push(group);
  });

  const links = Array.from(spine.querySelectorAll('.sr-phase'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => {
      a.classList.toggle('is-active', j === i);
      a.classList.toggle('is-visited', j < i);
      if (j === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    // If focus is on an exhibit link inside the group we are about to
    // collapse, move it to that group's phase link first — display:none on a
    // focused element silently drops focus to <body> otherwise.
    groups.forEach((g, j) => {
      if (j !== i && g.classList.contains('is-open') && g.contains(document.activeElement)) {
        links[j].focus();
      }
    });
    groups.forEach((g, j) => g.classList.toggle('is-open', j === i));
    // Bring the active phase into view by scrolling the spine itself, never
    // Element.scrollIntoView (it drags the sticky page around). The spine runs
    // horizontally on narrow screens and vertically on wide ones, so measure
    // which axis actually overflows rather than assuming.
    if (i !== lastActive && links[i]) {
      const rr = spine.getBoundingClientRect();
      const lr = links[i].getBoundingClientRect();
      if (spine.scrollWidth > spine.clientWidth + 4) {
        spine.scrollLeft += (lr.left - rr.left) - (rr.width - lr.width) / 2;
      } else if (spine.scrollHeight > spine.clientHeight + 4) {
        spine.scrollTop += (lr.top - rr.top) - (rr.height - lr.height) / 2;
      }
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
  // exhibit so the visuals match the page.
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

  requestAnimationFrame(() => article.classList.add('sr-loaded'));
})();
