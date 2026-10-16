// Mueve un cursor virtual de lado a lado y dispara eventos mousemove reales
// sobre los elementos de la página.
(() => {
  // Si ya había una copia de este script en la página (por ejemplo, de antes
  // de actualizar la extensión), la apagamos para que no haya dos flechas.
  window.__mouseMoverStop?.();

  const DEFAULTS = { active: false, speed: 400, distance: 80, showCursor: true };
  let settings = { ...DEFAULTS };
  let dead = false;
  let x = 0;
  let dir = 1;
  let lastTime = 0;
  let rafId = null;
  let heartbeat = null;
  let cursorEl = null;

  function createCursor() {
    if (cursorEl) return;
    cursorEl = document.createElement('div');
    cursorEl.innerHTML =
      '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M3 2l7 19 2.5-7.5L20 11z" fill="#ef4444" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
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

  function move(dt) {
    const { min, max } = bounds();
    x += dir * settings.speed * dt;
    if (x >= max) { x = max; dir = -1; }
    if (x <= min) { x = min; dir = 1; }

    const y = window.innerHeight / 2;
    if (cursorEl) cursorEl.style.transform = `translate(${x}px, ${y}px)`;
    dispatchMove(x, y);
  }

  // Tras actualizar o desinstalar la extensión, esta copia queda huérfana.
  function extensionAlive() {
    try {
      return Boolean(chrome.runtime?.id);
    } catch {
      return false;
    }
  }

  function step(time) {
    if (!extensionAlive()) return shutdown();
    move(lastTime ? (time - lastTime) / 1000 : 0);
    lastTime = time;
    rafId = requestAnimationFrame(step);
  }

  function start() {
    if (rafId) return;
    x = bounds().min;
    dir = 1;
    lastTime = 0;
    rafId = requestAnimationFrame(step);
    // Con la pestaña en segundo plano o la ventana minimizada Chrome pausa la
    // animación; seguimos enviando un movimiento por segundo para que la
    // página note actividad.
    heartbeat = setInterval(() => {
      if (!extensionAlive()) return shutdown();
      if (performance.now() - lastTime > 1000) move(0.1);
    }, 1000);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
    clearInterval(heartbeat);
    rafId = null;
    heartbeat = null;
    removeCursor();
  }

  function apply() {
    if (dead) return;
    if (!settings.active) return stop();
    if (settings.showCursor) createCursor(); else removeCursor();
    start();
  }

  function onStorageChange(changes, area) {
    if (area !== 'local') return;
    for (const [key, { newValue }] of Object.entries(changes)) settings[key] = newValue;
    apply();
  }

  function onMessage(msg, _sender, sendResponse) {
    if (msg === 'mouse-mover:ping') sendResponse(true);
  }

  function shutdown() {
    dead = true;
    stop();
    try {
      chrome.storage.onChanged.removeListener(onStorageChange);
      chrome.runtime.onMessage.removeListener(onMessage);
    } catch {
      // La extensión ya no existe; no hay nada que quitar.
    }
    if (window.__mouseMoverStop === shutdown) delete window.__mouseMoverStop;
  }

  window.__mouseMoverStop = shutdown;
  chrome.storage.onChanged.addListener(onStorageChange);
  chrome.runtime.onMessage.addListener(onMessage);
  chrome.storage.local.get(DEFAULTS, (s) => {
    settings = s;
    apply();
  });
})();
