const DEFAULTS = { active: false, speed: 400, distance: 80, showCursor: true };

const $ = (id) => document.getElementById(id);

function render(s) {
  $('speed').value = s.speed;
  $('speedVal').textContent = s.speed;
  $('distance').value = s.distance;
  $('distanceVal').textContent = s.distance;
  $('showCursor').checked = s.showCursor;
  $('toggle').textContent = s.active ? 'Detener' : 'Iniciar';
  $('toggle').classList.toggle('on', s.active);
}

chrome.storage.local.get(DEFAULTS, (s) => {
  render(s);

  $('speed').addEventListener('input', (e) => {
    s.speed = Number(e.target.value);
    render(s);
    chrome.storage.local.set({ speed: s.speed });
  });

  $('distance').addEventListener('input', (e) => {
    s.distance = Number(e.target.value);
    render(s);
    chrome.storage.local.set({ distance: s.distance });
  });

  $('showCursor').addEventListener('change', (e) => {
    s.showCursor = e.target.checked;
    chrome.storage.local.set({ showCursor: s.showCursor });
  });

  $('toggle').addEventListener('click', () => {
    s.active = !s.active;
    render(s);
    chrome.storage.local.set({ active: s.active });
  });
});
