/* Boardroom Agenda — order-of-business nav + scroll-spy + theme relay for the
   "boardroom" deep-dive template. Builds the agenda index from the article's
   h2 nodes, indexes exhibit frames under their chapter, marks the active item
   as the reader scrolls, and relays the site theme into embedded figure
   iframes. No-ops if the template is not on the page. */
(() => {
  const article = document.querySelector('.dd-boardroom');
  if (!article) return;

  const index = article.querySelector('.br-spine-index');
  const heads = Array.from(article.querySelectorAll('.br-body h2'));
  if (!index || heads.length === 0) return;

  /* Figures are indexed under the chapter they sit in, so the agenda is a map
     of the filing rather than six links. A frame opts in with data-fig="short
     label"; one without it is simply not indexed. Assignment is by document
     order, which is also the order the reader meets them. */
  const items = Array.from(
    article.querySelectorAll('.br-body h2, .br-body .visual-frame[data-fig]')
  );

  /* Real <ol> so the item numbers are semantic, not decorative. */
  const list = document.createElement('ol');
  list.className = 'br-agenda';
  let figNo = 0;

  const links = [];

  heads.forEach((h2, i) => {
    if (!h2.id) h2.id = `chapter-node-${i + 1}`;
    const raw = h2.textContent.trim();
    const m = raw.match(/^(?:Chapter|Scene)\s+(\d+)\s*[—–-]\s*(.+)$/i);
    const no = (m ? m[1] : String(i + 1)).padStart(2, '0');
    let label = m ? m[2] : raw;
    label = label.replace(/\s*\(.*$/, '').trim();

    const li = document.createElement('li');
    li.className = 'br-agenda-item';

    const link = document.createElement('a');
    link.className = 'br-agenda-link';
    link.href = `#${h2.id}`;
    link.innerHTML =
      `<span class="br-agenda-no">Item ${no}</span>` +
      `<span class="br-agenda-leader" aria-hidden="true"></span>` +
      `<span class="br-agenda-label">${label}</span>`;
    li.appendChild(link);

    /* Exhibits belonging to this chapter get stable ids for deep links. */
    const start = items.indexOf(h2);
    for (let j = start + 1; j < items.length && items[j].tagName !== 'H2'; j++) {
      const frame = items[j];
      if (!frame.id) frame.id = `figure-${++figNo}`;
      const fl = document.createElement('a');
      fl.className = 'br-agenda-fig';
      fl.href = `#${frame.id}`;
      fl.textContent = frame.dataset.fig;
      li.appendChild(fl);
    }

    list.appendChild(li);
    links.push(link);
  });

  index.appendChild(list);

  const listItems = Array.from(list.querySelectorAll('.br-agenda-item'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => {
      a.classList.toggle('is-active', j === i);
      if (j === i) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    // If focus sits on an exhibit link inside the group we are about to
    // collapse, move it to that group's chapter link first — display:none on a
    // focused element silently drops focus to <body> otherwise.
    listItems.forEach((g, j) => {
      if (j !== i && g.classList.contains('is-open') && g.contains(document.activeElement)) {
        links[j].focus();
      }
    });
    listItems.forEach((g, j) => g.classList.toggle('is-open', j === i));
    // Bring the active row into view by scrolling the index itself, never
    // Element.scrollIntoView (it drags the sticky page around). The rail runs
    // vertically on wide screens and horizontally on narrow ones, so measure
    // which axis actually overflows rather than assuming.
    if (i !== lastActive && links[i]) {
      const rr = index.getBoundingClientRect();
      const lr = links[i].getBoundingClientRect();
      if (index.scrollWidth > index.clientWidth + 4) {
        index.scrollLeft += (lr.left - rr.left) - (rr.width - lr.width) / 2;
      } else if (index.scrollHeight > index.clientHeight + 4) {
        index.scrollTop += (lr.top - rr.top) - (rr.height - lr.height) / 2;
      }
    }
    lastActive = i;
  };

  const pick = () => {
    let active = 0;
    const line = window.innerHeight * 0.28;
    heads.forEach((h2, i) => {
      if (h2.getBoundingClientRect().top <= line) active = i;
    });
    return active;
  };

  const observer = new IntersectionObserver(() => setActive(pick()), {
    rootMargin: '-26% 0px -68% 0px',
    threshold: [0, 1],
  });
  heads.forEach((h2) => observer.observe(h2));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(pick());
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  setActive(0);

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

  requestAnimationFrame(() => article.classList.add('br-loaded'));
})();
