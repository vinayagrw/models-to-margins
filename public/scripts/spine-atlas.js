/* Atlas Rail — scroll-spy + load orchestration for the Systems-Atlas
   deep-dive template. Builds the sticky horizontal chapter rail from the
   article's h2 nodes, marks the active chapter as the reader scrolls, and
   relays the site theme into embedded figure iframes. No-ops if absent. */
(() => {
  const article = document.querySelector('.dd-atlas');
  if (!article) return;

  const rail = article.querySelector('.at-rail-track');
  const heads = Array.from(article.querySelectorAll('.at-body h2'));
  if (!rail || heads.length === 0) return;

  /* Figures are indexed under the chapter they sit in, so the rail is a map of
     the page rather than five links. A frame opts in with data-fig="short
     label"; one without it is simply not indexed. Assignment is by document
     order, which is also the order the reader meets them. */
  const items = Array.from(article.querySelectorAll('.at-body h2, .at-body .visual-frame[data-fig]'));
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
    group.className = 'at-rail-group';

    const link = document.createElement('a');
    link.className = 'at-rail-link';
    link.href = `#${h2.id}`;
    link.innerHTML =
      `<span class="at-rail-no">${no}</span><span class="at-rail-label">${label}</span>`;
    group.appendChild(link);

    const start = items.indexOf(h2);
    for (let j = start + 1; j < items.length && items[j].tagName !== 'H2'; j++) {
      const frame = items[j];
      if (!frame.id) frame.id = `figure-${++figNo}`;
      const fl = document.createElement('a');
      fl.className = 'at-rail-fig';
      fl.href = `#${frame.id}`;
      fl.textContent = frame.dataset.fig;
      group.appendChild(fl);
    }

    rail.appendChild(group);
    groups.push(group);
  });

  // Single source of truth for the "active chapter" scan line: a fraction of
  // viewport height from the top. Both the scroll-position fallback and the
  // IntersectionObserver rootMargin derive from this one value so the two
  // detection paths can never drift apart.
  const RAIL_ACTIVE_LINE = 0.28;

  const links = Array.from(rail.querySelectorAll('.at-rail-link'));

  let lastActive = -1;
  const setActive = (i) => {
    heads.forEach((h2, j) => h2.classList.toggle('is-current', j === i));
    links.forEach((a, j) => {
      a.classList.toggle('is-active', j === i);
      if (j === i) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    // If focus is on a figure link inside the group we are about to collapse,
    // move it to that group's chapter link first — display:none on a
    // focused element silently drops focus to <body> otherwise.
    groups.forEach((g, j) => {
      if (j !== i && g.classList.contains('is-open') && g.contains(document.activeElement)) {
        links[j].focus();
      }
    });
    groups.forEach((g, j) => g.classList.toggle('is-open', j === i));
    // Bring the active chip into view by scrolling the rail itself, never
    // Element.scrollIntoView (it drags the sticky page around). The rail runs
    // horizontally on narrow screens and vertically on wide ones, so measure
    // which axis actually overflows rather than assuming.
    if (i !== lastActive && links[i]) {
      const rr = rail.getBoundingClientRect();
      const lr = links[i].getBoundingClientRect();
      if (rail.scrollWidth > rail.clientWidth + 4) {
        rail.scrollLeft += (lr.left - rr.left) - (rr.width - lr.width) / 2;
      } else if (rail.scrollHeight > rail.clientHeight + 4) {
        rail.scrollTop += (lr.top - rr.top) - (rr.height - lr.height) / 2;
      }
    }
    lastActive = i;
  };

  const observer = new IntersectionObserver(
    () => {
      let active = 0;
      const line = window.innerHeight * RAIL_ACTIVE_LINE;
      heads.forEach((h2, i) => {
        if (h2.getBoundingClientRect().top <= line) active = i;
      });
      setActive(active);
    },
    { rootMargin: `-${RAIL_ACTIVE_LINE * 100 - 2}% 0px -68% 0px`, threshold: [0, 1] }
  );
  heads.forEach((h2) => observer.observe(h2));

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      let active = 0;
      const line = window.innerHeight * RAIL_ACTIVE_LINE;
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

  // ----------------------------------------------------------------------
  // Viewport-aware glossaries — details[data-open-wide] is authored CLOSED so
  // the no-JS and reader-mode state is closed everywhere, operable and true.
  // Opening is done here by setting .open, never by forcing display in CSS:
  // that would leave the announced state contradicting the visual one.
  // Listen for click on the summary, never the toggle event — toggle fires
  // asynchronously, so a suppress flag set around `d.open = …` is already
  // false when it lands and every programmatic open reads as a user choice.
  // ----------------------------------------------------------------------
  const wide = window.matchMedia('(min-width: 761px)');
  article.querySelectorAll('details[data-open-wide]').forEach((d) => {
    const sync = () => {
      if (!d.dataset.userToggled) d.open = wide.matches;
    };
    d.querySelector('summary')?.addEventListener('click', () => {
      d.dataset.userToggled = '1';
    });
    sync();
    wide.addEventListener('change', sync);
  });

  // ----------------------------------------------------------------------
  // Plain-words glossary. Terms are authored as <span class="at-term"
  // data-def="..."> so the page still reads correctly with no JS. Here each
  // becomes a button carrying a real .at-pop element: the definition lives in
  // the DOM and is linked with aria-describedby, so it is announced rather
  // than hidden in CSS content. Hover and focus are handled in CSS; click is
  // handled here because a tap does not reliably produce :focus-visible.
  // ----------------------------------------------------------------------
  let termSeq = 0;
  const terms = [];
  article.querySelectorAll('span.at-term[data-def]').forEach((span) => {
    const def = span.dataset.def;
    if (!def) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'at-term';
    btn.setAttribute('aria-expanded', 'false');
    while (span.firstChild) btn.appendChild(span.firstChild);
    const pop = document.createElement('span');
    pop.className = 'at-pop';
    pop.setAttribute('role', 'tooltip');
    pop.id = 'at-def-' + (++termSeq);
    pop.textContent = def;
    btn.appendChild(pop);
    btn.setAttribute('aria-describedby', pop.id);
    span.replaceWith(btn);
    terms.push(btn);
  });

  const closeTerms = (except) => {
    terms.forEach((b) => {
      if (b === except) return;
      b.classList.remove('is-open');
      b.setAttribute('aria-expanded', 'false');
    });
  };

  // A popover is left-aligned to its term, which runs off the column when the
  // term sits near the right edge. Measure against the prose column and flip
  // to right-aligned rather than letting it overflow.
  const placeTerm = (btn) => {
    btn.classList.remove('at-term--end');
    const pop = btn.querySelector('.at-pop');
    if (!pop) return;
    const limit = (btn.closest('.article-body') || article).getBoundingClientRect().right;
    if (pop.getBoundingClientRect().right > limit - 4) btn.classList.add('at-term--end');
  };

  terms.forEach((btn) => {
    btn.addEventListener('mouseenter', () => placeTerm(btn));
    btn.addEventListener('focus', () => placeTerm(btn));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !btn.classList.contains('is-open');
      closeTerms(btn);
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      if (open) placeTerm(btn);
    });
  });

  if (terms.length) {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.at-term')) closeTerms(null);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeTerms(null);
    });
  }

  requestAnimationFrame(() => article.classList.add('at-loaded'));
})();
