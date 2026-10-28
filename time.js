// Sets <body data-time> to dawn, day, sunset or night from the visitor's
// local clock, rechecking every minute. Shared by the home page and posts.
//
// Add ?time=night (or dawn / day / sunset) to preview a scene; the preview
// carries over to other pages in the same tab until ?time=auto.
(() => {
  let override = new URLSearchParams(location.search).get("time");
  try {
    if (override === "auto") sessionStorage.removeItem("time");
    else if (override) sessionStorage.setItem("time", override);
    else override = sessionStorage.getItem("time");
  } catch {}
  if (override === "auto") override = null;

  function timeOfDay(hour) {
    if (hour >= 5 && hour < 8) return "dawn";
    if (hour >= 8 && hour < 17) return "day";
    if (hour >= 17 && hour < 20) return "sunset";
    return "night";
  }

  function update() {
    document.body.dataset.time = override || timeOfDay(new Date().getHours());
  }

  update();
  setInterval(update, 60 * 1000);
})();
