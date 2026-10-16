importScripts('common.js');

function updateBadge(active) {
  chrome.action.setBadgeBackgroundColor({ color: '#16a34a' });
  chrome.action.setBadgeText({ text: active ? 'ON' : '' });
}

chrome.storage.local.get(DEFAULTS).then((s) => updateBadge(s.active));

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.active) updateBadge(changes.active.newValue);
});

// Al instalar o actualizar, Chrome no carga content.js en las pestañas que ya
// estaban abiertas: lo hacemos nosotros.
chrome.runtime.onInstalled.addListener(async () => {
  for (const tab of await chrome.tabs.query({})) ensureInjected(tab.id);
});

// Si está activo y cambias de pestaña, también debe moverse en la nueva.
chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const { active } = await chrome.storage.local.get(DEFAULTS);
  if (active) ensureInjected(tabId);
});

// Atajo de teclado Alt+Shift+M.
async function onShortcut(command, tab) {
  if (command !== 'toggle-mover') return;
  const { active } = await chrome.storage.local.get(DEFAULTS);
  if (!active && tab) await ensureInjected(tab.id);
  await chrome.storage.local.set({ active: !active });
}
chrome.commands.onCommand.addListener(onShortcut);
