/* Harness Engineering — shared theme + embed bootstrap.
   Loaded synchronously in <head> across all 8 visuals to prevent FOUC.
   Reads ?theme= and ?embed= from URL, falls back to localStorage, then to OS preference.
   Sets data-theme and data-embedded on <html>. */
(() => {
  const params = new URLSearchParams(window.location.search);
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'm2m-theme';

  const normalize = (value) => (value === 'dark' || value === 'light' ? value : null);
  const getStored = () => {
    try { return normalize(window.localStorage.getItem(storageKey)); }
    catch { return null; }
  };
  const getSystem = () => (media.matches ? 'dark' : 'light');
  const getPreferred = () =>
    normalize(params.get('theme')) ?? getStored() ?? getSystem();

  const apply = (theme) => {
    const next = normalize(theme) ?? getPreferred();
    root.dataset.theme = next;
    root.style.colorScheme = next;
  };

  root.dataset.embedded = params.get('embed') === '1' ? 'true' : 'false';
  apply(getPreferred());

  const sync = (event) => {
    if (!getStored()) apply(event.matches ? 'dark' : 'light');
  };
  if (typeof media.addEventListener === 'function') media.addEventListener('change', sync);
  else if (typeof media.addListener === 'function') media.addListener(sync);
})();
