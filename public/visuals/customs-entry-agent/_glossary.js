/* Customs Entry Agent — shared plain-words glossary for every figure.
   ---------------------------------------------------------------------------
   Each figure is read standalone inside an iframe, so it cannot rely on the
   prose above it or on the vocabulary-board figure to explain its words. This
   module reads the words a figure actually uses and appends a definitions
   strip naming only those.

   Why a strip at the foot rather than a tooltip on each word: the 22 figures
   are bespoke, with tight bespoke CSS and several that re-render themselves
   from JS. Wrapping words in place would mean inserting elements into layouts
   whose selectors were written without them, in files that rebuild their own
   innerHTML. Appending one element after everything else cannot collide with
   any of that, and the frame autosize contract absorbs the height change.

   Acronyms are matched case-sensitively and on word boundaries. Without that,
   ACE matches "replace" and CROSS matches "across", and every figure would
   claim to use words it does not contain. */
(() => {
  const DEFS = [
    ['HTS code', 'Harmonized Tariff Schedule code. The ten-digit number that decides how much tax an import pays.'],
    ['CBP', 'US Customs and Border Protection. The agency that runs the border and collects the import tax.'],
    ['ACE', 'Automated Commercial Environment. The government portal the paperwork is filed into.'],
    ['ABI', 'Automated Broker Interface. The electronic format the paperwork is sent in.'],
    ['PGA', 'Partner government agency. Another department, such as food safety or agriculture, that also has to clear the goods.'],
    ['CROSS', 'The government archive of past classification decisions. Cases reach it because someone asked, so they skew towards the hard ones.'],
    ['SKU', 'Stock keeping unit. One distinct product, as the business counts it.'],
    ['ISF', 'Importer Security Filing. A list of facts about the cargo, due before the ship sails rather than when it arrives.'],
    ['entry summary', 'The form that tells the government what the goods are and what tax is owed on them.'],
    ['importer of record', 'The party legally answerable for the entry. Liability stays here whatever software was used.'],
    ['customs broker', 'A person licensed by the government to prepare and file entries on someone else&rsquo;s behalf.'],
    ['liquidation', 'The point where the government finalises what was owed on an entry. Before it, the amount can still move.'],
    ['protest', 'The formal way to challenge a government decision on an entry after it is final.'],
    ['prior disclosure', 'Telling the government about your own mistake before they find it, which cuts the penalty sharply.'],
    ['bond', 'A financial guarantee an importer must post, so the government can still collect if the duty goes unpaid.'],
    ['reasonable care', 'The legal standard. The government judges how you reached the answer, not only whether it was right.'],
    ['anti-dumping', 'Extra duties charged when goods are sold into a country below the price they fetch at home.'],
    ['USMCA', 'The trade agreement between the United States, Mexico and Canada. Qualifying goods usually pay less, or nothing.'],
    ['CAFTA-DR', 'The trade agreement covering Central America and the Dominican Republic.'],
    ['Section 1592', 'The US customs penalty law. It charges a multiple of the tax you underpaid, not just the shortfall.'],
    ['Section 301', 'A law letting the president act against another country&rsquo;s unfair trade practices. The usual vehicle for targeted tariffs.'],
    ['Section 338', 'A 1930 law letting the president add duties on a country&rsquo;s goods without waiting for an investigation.'],
    ['Section 122', 'A law letting the president impose a temporary across-the-board duty to address a trade deficit. It expires by statute.'],
    ['de minimis', 'The value below which a shipment can enter without the full entry paperwork.'],
    ['straight-through', 'Filed with no human touching it at any point.'],
    ['Tier 0', 'A line the system has seen before, answered from the stored record with no model call at all.'],
    ['Tier 1', 'A line close to one seen before, answered by a narrow deduction from it.'],
    ['Tier 2', 'A genuinely new line, given full reasoning and always a human reviewer.'],
    ['calibrated', 'A confidence score that means what it says. If it claims 90%, it is right about 90% of the time.'],
    ['materiality', 'How much money the decision actually moves. A small error on a large shipment matters more than the reverse.'],
    ['logprob', 'The model&rsquo;s own internal number for how likely each word it chose was. Sometimes a usable proxy for certainty.'],
    ['AUROC', 'A score from 0.5 to 1 for how well a confidence number separates right answers from wrong ones. 0.5 is a coin toss.'],
    ['ECE', 'Expected calibration error. How far a stated confidence sits from the real hit rate.'],
    ['gradient boosting', 'A standard, well understood way of blending many weak signals into one stronger score. Not itself a language model.'],
    ['verbalised', 'The model saying in words how sure it is, rather than the number being read out of its internals.'],
    ['shadow mode', 'Running the system alongside the people doing the work, comparing answers, but never letting it act.'],
    ['top-1', 'Counting only the system&rsquo;s single best answer as correct, with no credit for a close second guess.'],
    ['idempotency', 'A tag on a message so that sending it twice has the same effect as sending it once.'],
    ['Object Lock', 'A storage setting that makes a stored file impossible to change or delete for a set period, including by an administrator.'],
    ['AS2', 'An old but still standard format trading partners use to exchange documents directly.'],
    ['EDI', 'Electronic Data Interchange. The long-established fixed-format way trading partners exchange documents.'],
  ];

  const ACRONYM = /^[A-Z0-9 .-]+$/;

  let shown = '';

  const build = () => {
    const host = document.querySelector('.shell') || document.body;
    if (!host) return;

    // Read only what a reader can see. Script and style text is not copy, and
    // matching inside it would claim words the figure never shows.
    const clone = host.cloneNode(true);
    clone.querySelectorAll('script, style, svg').forEach((n) => n.remove());
    const text = clone.textContent || '';

    const found = DEFS.filter(([term]) => {
      const plain = term.replace(/&rsquo;/g, '’');
      // Copy is inconsistent about hyphen versus space in compound terms
      // (both "Object Lock" and "Object-Lock" appear), so match either.
      const body = plain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/[\s-]+/g, '[\\s-]+');
      const re = new RegExp('\\b' + body + '\\b', ACRONYM.test(plain) ? '' : 'i');
      return re.test(text);
    });
    if (!found.length) return;

    // Several figures build copy from JS, some of it only after a click, so the
    // set of words on screen can grow after load. Rebuild when it does, and do
    // nothing when it has not, so an open strip is not snapped shut.
    const key = found.map(([t]) => t).join('|');
    if (key === shown) return;
    shown = key;
    const prev = host.querySelector(':scope > .g-words');
    const wasOpen = prev ? prev.open : false;
    if (prev) prev.remove();

    const d = document.createElement('details');
    d.open = wasOpen;
    d.className = 'g-words';
    const chips = found.map(([t]) => '<i>' + t + '</i>').join('');
    d.innerHTML =
      '<summary><b>Words used here</b>' + chips + '</summary>' +
      '<dl>' + found.map(([t, def]) =>
        '<div><dt>' + t + '</dt><dd>' + def + '</dd></div>').join('') + '</dl>';
    // Every figure observes document.body with a ResizeObserver and posts the
    // new scrollHeight, so opening the strip re-sizes the frame on its own.
    host.appendChild(d);
  };

  let pending = 0;
  const refresh = () => {
    clearTimeout(pending);
    pending = setTimeout(build, 260);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
  window.addEventListener('load', refresh);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.g-words')) refresh();
  }, true);
})();
