// Types the post onto the paper once it has settled: the title, then the
// body. Click, tap, scroll or press a key to show the rest at once.
(() => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const title = typewriter(document.querySelector(".post h1"), { speed: 70, delay: 650 });
  const body = typewriter(document.querySelector(".post article"), { speed: 32, delay: 250, after: title.done });
  const events = ["pointerdown", "keydown", "wheel", "touchmove"];

  function skip() {
    title.finish();
    body.finish();
    for (const type of events) removeEventListener(type, skip);
  }

  for (const type of events) addEventListener(type, skip, { passive: true });
})();
