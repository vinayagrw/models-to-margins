/* Opt-in iframe auto-sizing for .visual-frame embeds.
   A visual that wants to be sized to its content posts
   { type: 'm2m:frame-size', height: <px> } to its parent. This listener
   matches the posting iframe by its content window and sets the enclosing
   .visual-frame height, overriding the static --vf-h / --vf-h-m. Visuals
   that never post the message keep their authored heights untouched. */
(() => {
  const frames = Array.from(document.querySelectorAll('.visual-frame'));
  if (!frames.length) return;

  function apply(source, height) {
    if (!height || height < 80) return;
    for (const frame of frames) {
      const iframe = frame.querySelector('iframe');
      if (iframe && iframe.contentWindow === source) {
        // The frame's own chrome (head strip padding + borders) sits outside
        // the iframe, so the frame must be content height plus that delta.
        const delta = frame.getBoundingClientRect().height - iframe.getBoundingClientRect().height;
        frame.style.height = Math.ceil(height + Math.max(0, delta)) + 'px';
        return;
      }
    }
  }

  window.addEventListener('message', (e) => {
    const d = e.data;
    if (d && typeof d === 'object' && d.type === 'm2m:frame-size') {
      apply(e.source, Number(d.height));
    }
  });
})();
