/* Reports content height to the host page so the .visual-frame hugs it. */
(() => {
  if (document.documentElement.dataset.embedded !== 'true') return;
  const post = () => window.parent.postMessage(
    { type: 'm2m:frame-size', height: document.body.scrollHeight }, '*');
  window.m2mPost = post;
  if ('ResizeObserver' in window) new ResizeObserver(post).observe(document.body);
  window.addEventListener('load', post);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(post);
  setTimeout(post, 60);
})();
