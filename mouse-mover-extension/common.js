// Código compartido por background.js y popup.js.
const DEFAULTS = { active: false, speed: 400, distance: 80, showCursor: true };

// Se asegura de que la pestaña tenga content.js, aunque estuviera abierta
// antes de instalar la extensión. Devuelve false si Chrome no permite
// extensiones en esa página (chrome://, pestaña nueva, Chrome Web Store...).
async function ensureInjected(tabId) {
  try {
    if (await chrome.tabs.sendMessage(tabId, 'mouse-mover:ping')) return true;
  } catch {
    // La pestaña todavía no tiene el script: lo inyectamos abajo.
  }
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ['content.js'] });
    return true;
  } catch {
    return false;
  }
}
