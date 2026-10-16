const $ = (id) => document.getElementById(id);

function render(s, tabOk) {
  $('speed').value = s.speed;
  $('speedVal').textContent = s.speed;
  $('distance').value = s.distance;
  $('distanceVal').textContent = s.distance;
  $('showCursor').checked = s.showCursor;
  $('toggle').textContent = s.active ? 'Detener' : 'Iniciar';
  $('toggle').classList.toggle('on', s.active);

  const status = $('status');
  if (!tabOk) {
    status.className = 'warn';
    status.textContent =
      '⚠️ Chrome no permite extensiones en esta página (chrome://, pestaña nueva, ' +
      'Chrome Web Store…). Abre una página web normal, por ejemplo google.com, ' +
      'y vuelve a pulsar el icono.';
  } else if (s.active) {
    status.className = 'ok';
    status.textContent = '✅ Moviéndose: mira la flecha roja en la página.';
  } else {
    status.className = '';
    status.textContent = 'Listo. Pulsa Iniciar.';
  }
}

(async () => {
  const s = await chrome.storage.local.get(DEFAULTS);
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const tabOk = tab ? await ensureInjected(tab.id) : false;
  render(s, tabOk);

  $('speed').addEventListener('input', (e) => {
    s.speed = Number(e.target.value);
    render(s, tabOk);
    chrome.storage.local.set({ speed: s.speed });
  });

  $('distance').addEventListener('input', (e) => {
    s.distance = Number(e.target.value);
    render(s, tabOk);
    chrome.storage.local.set({ distance: s.distance });
  });

  $('showCursor').addEventListener('change', (e) => {
    s.showCursor = e.target.checked;
    chrome.storage.local.set({ showCursor: s.showCursor });
  });

  $('toggle').addEventListener('click', () => {
    s.active = !s.active;
    render(s, tabOk);
    chrome.storage.local.set({ active: s.active });
  });
})();
