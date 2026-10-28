// Types the text inside an element out a character at a time, with a blinking
// caret. Untyped text stays laid out but invisible, so nothing reflows as it
// types. Typing starts once `after` resolves, plus `delay` ms. Returns
// { done, finish }: done resolves when typing ends, finish() shows
// everything at once.
window.typewriter = (root, { speed = 40, delay = 0, after = Promise.resolve() } = {}) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.data.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT),
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  const parts = nodes.map((node) => {
    const typed = document.createTextNode("");
    const rest = document.createElement("span");
    rest.className = "tw-rest";
    rest.textContent = node.data;
    node.replaceWith(typed, rest);
    return { typed, rest, full: node.data };
  });

  const caret = document.createElement("span");
  caret.className = "tw-caret";
  let stopped = false;

  function finish() {
    stopped = true;
    for (const p of parts) {
      p.typed.data = p.full;
      p.rest.textContent = "";
    }
    caret.remove();
  }

  const done = (async () => {
    await after;
    await sleep(delay);
    for (const p of parts) {
      if (stopped) return;
      p.rest.before(caret);
      for (let i = 0; i < p.full.length; i++) {
        if (stopped) return;
        p.typed.data = p.full.slice(0, i + 1);
        p.rest.textContent = p.full.slice(i + 1);
        // A beat after punctuation, a touch quicker across spaces.
        const ch = p.full[i];
        await sleep(/[.,!?;:]/.test(ch) ? speed * 5 : ch === " " ? speed * 0.6 : speed);
      }
    }
    caret.remove();
  })();

  return { done, finish };
};
