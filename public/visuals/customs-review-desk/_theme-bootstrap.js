/* Customs Entry Agent — shared theme + embed bootstrap.
   Loaded synchronously in <head> across all visuals to prevent FOUC.
   Reads ?theme= and ?embed= from URL, falls back to localStorage, then to dark
   (the site default). Sets data-theme and data-embedded on <html>. */
(() => {
  const params = new URLSearchParams(window.location.search);
  const root = document.documentElement;
  const storageKey = 'm2m-theme';

  const normalize = (value) => (value === 'dark' || value === 'light' ? value : null);
  const getStored = () => {
    try { return normalize(window.localStorage.getItem(storageKey)); }
    catch { return null; }
  };
  const getPreferred = () =>
    normalize(params.get('theme')) ?? getStored() ?? 'dark';

  const apply = (theme) => {
    const next = normalize(theme) ?? getPreferred();
    root.dataset.theme = next;
    root.style.colorScheme = next;
  };

  root.dataset.embedded = params.get('embed') === '1' ? 'true' : 'false';
  apply(getPreferred());

  // Live theme control from the embedding page (overrides ?theme= once embedded).
  // The parent posts { type: 'm2m:theme', theme } whenever the site toggle flips.
  window.addEventListener('message', (event) => {
    const data = event.data;
    if (data && data.type === 'm2m:theme' && normalize(data.theme)) apply(data.theme);
  });
})();
