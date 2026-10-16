// Mueve un cursor virtual de lado a lado y dispara eventos mousemove reales
// sobre los elementos de la página.
(() => {
  if (window.__mouseMoverLoaded) return;
  window.__mouseMoverLoaded = true;

  const DEFAULTS = { active: false, speed: 400, distance: 80, showCursor: true };
  let settings = { ...DEFAULTS };
  let x = 0;
  let dir = 1;
  let lastTime = 0;
  let rafId = null;
  let cursorEl = null;

  function createCursor() {
    if (cursorEl) return;
    cursorEl = document.createElement('div');
    cursorEl.innerHTML =
      '<svg width="22" height="22" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="#ef4444" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    Object.assign(cursorEl.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '2147483647',
      pointerEvents: 'none',
      transition: 'none',
      filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.5))'
    });
    document.documentElement.appendChild(cursorEl);
  }

  function removeCursor() {
    cursorEl?.remove();
    cursorEl = null;
  }

  function bounds() {
    const w = window.innerWidth;
    const span = (w * settings.distance) / 100;
    const min = (w - span) / 2;
    return { min, max: min + span };
  }

  function dispatchMove(px, py) {
    const target = document.elementFromPoint(px, py) || document.body;
    const init = { bubbles: true, cancelable: true, clientX: px, clientY: py, view: window };
    target.dispatchEvent(new PointerEvent('pointermove', init));
    target.dispatchEvent(new MouseEvent('mousemove', init));
  }

  function step(time) {
    const dt = lastTime ? (time - lastTime) / 1000 : 0;
    lastTime = time;

    const { min, max } = bounds();
    x += dir * settings.speed * dt;
    if (x >= max) { x = max; dir = -1; }
    if (x <= min) { x = min; dir = 1; }

    const y = window.innerHeight / 2;
    if (cursorEl) cursorEl.style.transform = `translate(${x}px, ${y}px)`;
    dispatchMove(x, y);

    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId) return;
    x = bounds().min;
    dir = 1;
    lastTime = 0;
    if (settings.showCursor) createCursor();
    rafId = requestAnimationFrame(step);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    removeCursor();
  }

  function apply() {
    if (!settings.active) return stop();
    if (settings.showCursor) createCursor(); else removeCursor();
    start();
  }

  chrome.storage.local.get(DEFAULTS, (s) => {
    settings = s;
    apply();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local') return;
    for (const [key, { newValue }] of Object.entries(changes)) settings[key] = newValue;
    apply();
  });

  // Atajo rápido: Alt+Shift+M para iniciar/detener.
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.code === 'KeyM') {
      chrome.storage.local.set({ active: !settings.active });
    }
  });
})();
