/* Taller de Ascensores — escena, modos (explorar, armar, reto) y manual. */
(() => {
  'use strict';
  const ASC = window.ASC, T = window.THREE;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nomG = id => (ASC.partes[id] && ASC.partes[id].nombre) || (ASC.cat[id] && ASC.cat[id].n) || id;
  // en el taller cada pieza se llama como en el equipo elegido (fajas STM, limitador GBP 201...)
  const nom = id => { const e = ASC.equipos[S.tipo]; return (e && e.nombres && e.nombres[id]) || nomG(id); };
  const reducido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const MD = ASC.medidas || { FH: 2.8, NP: 3, REC: 5.6, FOSO: 1.4, TECHO: 9.3 };
  const CLAVE = 'taller-ascensores-v2';
  const DE_PISO = { puerta_piso: 1, cabezal_piso: 1, cerradura: 1, pisadera: 1, botonera_piso: 1, roldanas_puerta: 1, cable_sincronismo: 1, pesa_cierre: 1, guiadores_puerta: 1 };
  // en el armado esencial, estas piezas aparecen solas junto con su compañera
  const COMPA = { guias_contrapeso: 'guias_cabina', polea_tensora: 'limitador', pisadera: 'puerta_piso', botonera_piso: 'puerta_piso', interruptor_principal: 'tablero_control', stop_foso: 'amortiguadores', polea_desvio: 'maquina',
    iluminacion_hueco: 'guias_cabina', gancho_izaje: 'guias_cabina' };
  const ZONAS = ['maquinas', 'hidraulico', 'hueco', 'cabina', 'puertas', 'foso'];
  const DE_TIPO = { mrl: 'otis', mr: 'clasico', hid: 'movilift' };   // equipo que representa a cada arquitectura
  const B = () => ASC.base(S.tipo), EQ = () => ASC.equipos[S.tipo];

  const S = { tipo: 'otis', modo: 'explorar', sel: null, hover: null, pick: null, piso: 0, nivel: 'esencial', siluetas: true, rayos: true,
    rueda: 19, arm: {}, ficha: false, filtro: '', fz: 'todas', reto: null, moviendo: false, msg: null, zona: 'todo', marca: 0 };

  function leer() {
    try {
      const d = JSON.parse(localStorage.getItem(CLAVE) || 'null');
      if (d) ['tipo', 'nivel', 'siluetas', 'arm', 'rueda'].forEach(k => { if (d[k] != null) S[k] = d[k]; });
    } catch (e) { /* sin almacenamiento: se sigue igual */ }
    if (ASC.equipoIds.indexOf(S.tipo) < 0) S.tipo = DE_TIPO[S.tipo] || 'otis';
    if (S.nivel !== 'completo') S.nivel = 'esencial';
    if (!S.arm || typeof S.arm !== 'object') S.arm = {};
    S.rueda = Math.max(5, Math.min(60, Number(S.rueda) || 19));
  }
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify({ tipo: S.tipo, nivel: S.nivel, siluetas: S.siluetas, arm: S.arm, rueda: S.rueda })); } catch (e) { /* nada */ } }

  // ---------- reglas del armado ----------
  const delTipo = () => ASC.delTipo(S.tipo);
  const enTipo = id => !!ASC.cat[id] && ASC.cat[id].t.indexOf(B()) >= 0;
  const arm = () => { const k = S.tipo + ':' + S.nivel; const a = S.arm[k] || (S.arm[k] = {}); a.puestas = a.puestas || {}; a.int = a.int || {}; a.fallos = a.fallos || 0; a.limpias = a.limpias || 0; return a; };
  const esMeta = id => S.nivel === 'completo' || !!ASC.cat[id].e;
  const deps = id => { const d = (ASC.cat[id].dep || []).filter(enTipo); if (!esMeta(id) && COMPA[id] && enTipo(COMPA[id])) d.push(COMPA[id]); return d; };
  const puesta = id => esMeta(id) ? !!arm().puestas[id] : deps(id).every(puesta);
  const disponible = id => deps(id).every(puesta);
  const metas = () => delTipo().filter(c => esMeta(c.id)).map(c => c.id);
  // primera pieza de la bandeja que falta poner para desbloquear a id
  const faltaMeta = id => { for (const d of deps(id)) { if (puesta(d)) continue; if (esMeta(d)) return d; const m = faltaMeta(d); if (m) return m; } return null; };
  const armado = () => metas().every(puesta);
  const visible = id => S.modo !== 'armar' || puesta(id);

  // ---------- escena ----------
  let renderer, scene, camera, controls, modelo = null, ok3D = false, sucio = true, mini = null, miniat = {}, ultimoP = 0;
  const tweens = [], escena = $('#escena'), lienzo = $('#lienzo'), puntos = $('#puntos');
  const hSel = new Map(), hHov = new Map();
  let MAT_F = null, ray = null, rotulo = null, hot = {}, tMarcha = 0, enc = null;
  const LIBRE = 0.6;   // hasta esta fracción de la vista completa la cámara puede mirar a cualquier parte del ascensor

  function iniciar3D() {
    if (!T || !T.OrbitControls || !ASC.construir) return false;
    try { renderer = new T.WebGLRenderer({ canvas: lienzo, antialias: true, alpha: true }); } catch (e) { return false; }
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.setClearColor(0x000000, 0);
    scene = new T.Scene();
    scene.add(new T.HemisphereLight(0xffffff, 0x8d949b, 0.9));
    const d1 = new T.DirectionalLight(0xffffff, 0.75); d1.position.set(6, 14, 9); scene.add(d1);
    const d2 = new T.DirectionalLight(0xffffff, 0.35); d2.position.set(-7, 6, -5); scene.add(d2);
    camera = new T.PerspectiveCamera(32, 1, 0.05, 120);
    camera.position.set(12, 8, 16);
    controls = new T.OrbitControls(camera, lienzo);
    controls.enableDamping = true; controls.dampingFactor = 0.12; controls.minDistance = 0.3; controls.maxDistance = 45; controls.zoomSpeed = 1.4;   // zoomSpeed queda para el pellizco en pantalla táctil
    controls.addEventListener('change', () => { sucio = true; });
    controls.addEventListener('start', () => { $('#pista-uso').hidden = true; });
    MAT_F = new T.MeshBasicMaterial({ color: 0xf2b705, transparent: true, opacity: 0.2, depthWrite: false });
    ray = new T.Raycaster();
    rotulo = document.createElement('div'); rotulo.className = 'rotulo'; rotulo.hidden = true; puntos.appendChild(rotulo);
    try { iniMini(); } catch (e) { mini = null; }
    medir();
    if (window.ResizeObserver) new ResizeObserver(medir).observe(escena); else window.addEventListener('resize', medir);
    return true;
  }
  function medir() {
    if (!renderer) return;
    const w = escena.clientWidth, h = escena.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); sucio = true;
    limitar();
  }
  // una sola animación viva por canal (cámara, puertas, cabina): la nueva reemplaza a la anterior
  function cancelar(canal) { for (let i = tweens.length - 1; i >= 0; i--) if (tweens[i].canal === canal) tweens.splice(i, 1); }
  function tw(dur, fn, fin, canal) {
    if (canal) cancelar(canal);
    if (reducido) dur = 0;
    if (!dur) { fn(1); sucio = true; if (fin) fin(); return; }
    tweens.push({ t0: performance.now(), dur, fn, fin, canal });
  }
  function paso(now) {
    for (let i = tweens.length - 1; i >= 0; i--) {
      const t = tweens[i], k = Math.min(1, (now - t.t0) / t.dur);
      t.fn(k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2); sucio = true;
      if (k >= 1) { tweens.splice(tweens.indexOf(t), 1); if (t.fin) t.fin(); }
    }
  }
  function bucle(now) {
    requestAnimationFrame(bucle);
    if (!ok3D) return;
    paso(now);
    if (controls.update()) sucio = true;
    if (modelo && centrar()) sucio = true;
    if (sucio) { sucio = false; renderer.render(scene, camera); sobreponer(); }
    if (mini && mini.visible) { if (!reducido && !mini.arr) mini.piv.rotation.y += 0.007; mini.r.render(mini.sc, mini.cam); }
  }

  function realce(m, st) {
    const mapa = st === 'sel' ? hSel : hHov;
    let c = mapa.get(m);
    if (!c) {
      c = m.clone();
      const col = st === 'sel' ? 0xf2b705 : 0x6fb6ff;
      if (c.emissive) { c.emissive.setHex(col); c.emissiveIntensity = st === 'sel' ? 0.6 : 0.32; }
      else if (c.color && !c.map) c.color.lerp(new T.Color(col), 0.5);
      mapa.set(m, c);
    }
    return c;
  }
  // visibilidad y material de cada parte según el modo
  function aplicar() {
    if (!modelo) return;
    Object.keys(modelo.partes).forEach(id => {
      const p = modelo.partes[id];
      let st = 'normal';
      if (!visible(id)) st = (S.siluetas && esMeta(id) && disponible(id)) ? 'fantasma' : 'oculta';
      else if (id === S.sel) st = 'sel';
      else if (id === S.hover) st = 'hover';
      if (p.st === st) return;
      p.st = st;
      const vis = st !== 'oculta';
      p.miembros.forEach(m => { m.visible = vis; });
      if (vis) p.mallas.forEach(o => { o.material = st === 'normal' ? o._m0 : st === 'fantasma' ? MAT_F : realce(o._m0, st); });
    });
    verRayos();
    sucio = true;
  }
  function verRayos() {
    if (!modelo) return;
    modelo.rayos.visible = S.rayos && !!modelo.rayos.userData.abierto && visible('cortina_luminosa');
    sucio = true;
  }

  // ---------- cámara ----------
  const dirDe = (az, pol) => { const a = az * Math.PI / 180, p = pol * Math.PI / 180; return new T.Vector3(Math.sin(p) * Math.sin(a), Math.cos(p), Math.sin(p) * Math.cos(a)); };
  function mirar(c, dist, dir, dur) {
    const p0 = camera.position.clone(), t0 = controls.target.clone(), p1 = c.clone().addScaledVector(dir, dist);
    tw(dur == null ? 650 : dur, k => { camera.position.lerpVectors(p0, p1, k); controls.target.lerpVectors(t0, c, k); camera.lookAt(controls.target); }, null, 'camara');
  }
  // centro y distancia con los que el ascensor entero entra en la escena
  function encuadre() {
    const t = B(), L = modelo.limites, sx = modelo.espejo ? -1 : 1;
    const H = L.ymax - L.ymin, W = t === 'hid' ? 4.6 : t === 'mr' ? 3.4 : 2.9, f = Math.tan(camera.fov * Math.PI / 360);
    // margen abajo para la botonera; mientras se arma está oculta y en pantallas angostas el margen va arriba, por los botones de zona
    const armando = S.modo === 'armar' && !armado(), angosto = camera.aspect < 0.8;
    const holgura = angosto ? 1.3 : armando ? 1.1 : 1.2, sube = armando ? (angosto ? 0.06 : 0) : -0.05;
    return { c: new T.Vector3(sx * (t === 'hid' ? 0.9 : t === 'mr' ? -0.2 : 0.1), (L.ymax + L.ymin) / 2 + H * sube, t === 'hid' ? -0.5 : 0.2),
      dist: Math.max((H / 2 * holgura) / f, (W / 2 * 1.1) / (f * camera.aspect)) };
  }
  // tope de alejamiento: apenas más lejos que la vista del ascensor completo
  function limitar() { if (ok3D && modelo) { enc = encuadre(); controls.maxDistance = enc.dist * 1.1; } }
  // El punto al que mira la cámara no sale del volumen del ascensor. Cuanto más lejos está la cámara, más se
  // encoge ese volumen hacia el centro: en el tope de alejamiento solo queda el centro, se llegue ahí con la
  // rueda, con pellizco o arrastrando.
  function centrar() {
    const b = B(), L = modelo.limites, t = controls.target;
    let x0 = -1.3, x1 = 1.3, y0 = L.ymin, y1 = L.ymax, z0 = -1.3, z1 = 2.1;
    if (b === 'hid') { x1 = 3.0; z0 = -2.5; } else if (b === 'mr') x0 = -1.8;
    if (modelo.espejo) { const a = x0; x0 = -x1; x1 = -a; }
    if (enc && !tweens.some(w => w.canal === 'camara')) {
      const d0 = LIBRE * enc.dist, u = Math.max(0, Math.min(1, (camera.position.distanceTo(t) - d0) / (controls.maxDistance - d0))), c = enc.c;
      x0 += (c.x - x0) * u; x1 += (c.x - x1) * u; y0 += (c.y - y0) * u; y1 += (c.y - y1) * u; z0 += (c.z - z0) * u; z1 += (c.z - z1) * u;
    }
    const x = Math.max(x0, Math.min(x1, t.x)), y = Math.max(y0, Math.min(y1, t.y)), z = Math.max(z0, Math.min(z1, t.z));
    if (x === t.x && y === t.y && z === t.z) return false;
    camera.position.x += x - t.x; camera.position.y += y - t.y; camera.position.z += z - t.z;
    t.set(x, y, z);
    return true;
  }
  // distancia para que quepa una esfera de ese radio, sin entrar en el tramo donde centrar() ya tira hacia el centro
  function distPara(radio) {
    const f = camera.fov * Math.PI / 360, h = Math.min(f, Math.atan(Math.tan(f) * camera.aspect)), d = radio / Math.sin(h);
    return enc ? Math.min(d, (LIBRE - 0.02) * enc.dist) : d;
  }
  function vista(z, dur) {
    if (!ok3D || !modelo) return;
    S.zona = z;
    // en un equipo espejado (Schindler) la cámara y los centros se reflejan para mirar por el lado abierto
    const t = B(), cx = modelo.cx, sx = modelo.espejo ? -1 : 1, az = a => modelo.espejo ? 360 - a : a;
    if (z === 'todo') {
      const q = encuadre();
      limitar();
      mirar(q.c, q.dist, dirDe(az(42), 80), dur);
    } else {
      const Z = {
        arriba: t === 'mr' ? { c: [-0.3, MD.TECHO + 1.2, 0], r: 2.0, az: 30, pol: 66 } : { c: [t === 'mrl' ? 0.15 : 0.3, 8.5, 0], r: 1.45, az: t === 'mrl' ? 60 : 70, pol: 72 },
        cabina: { c: [cx, modelo.estado.cy + 1.15, 0.1], r: 2.1, az: 55, pol: 76 },
        puertas: { c: [cx, MD.FH * (S.piso === MD.NP - 1 ? 0 : MD.NP - 1) + 1.4, 0.85], r: 1.5, az: 205, pol: 80 },
        foso: { c: [0, -0.7, 0], r: 1.5, az: 50, pol: 62 },
        central: { c: [2.1, 0.75, -1.75], r: 1.25, az: 35, pol: 64 }
      }[z];
      if (!Z) return;
      mirar(new T.Vector3(z === 'cabina' || z === 'puertas' ? Z.c[0] : sx * Z.c[0], Z.c[1], Z.c[2]), distPara(Z.r), dirDe(az(Z.az), Z.pol), dur);
    }
    $$('#zonas button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.zona === z)));
  }
  const VISTA = {
    puerta_piso: [22, 82], botonera_piso: [18, 82], cabezal_piso: [202, 78], cerradura: [206, 80], pisadera: [200, 58],
    puerta_cabina: [180, 82], cortina_luminosa: [178, 82], patin: [104, 78], operador_puertas: [150, 54], botonera_cabina: [200, 84],
    emergencia: [205, 104], pesacargas: [30, 116], faldon: [24, 100], caja_inspeccion: [72, 48], cabina: [200, 78],
    tablero_control: { mrl: [22, 84], mr: [82, 70], hid: [16, 72] }, interruptor_principal: { mrl: [22, 80], mr: [84, 72], hid: [16, 74] },
    rescate: { mrl: [200, 78], mr: [82, 66], hid: [16, 72] }, central_hidraulica: [30, 66], bloque_valvulas: [30, 60], stop_foso: [215, 70],
    roldanas_puerta: [202, 78], cable_sincronismo: [202, 76], pesa_cierre: [200, 80], guiadores_puerta: [200, 62], contacto_puerta_cabina: [150, 56],
    posicionamiento: { mrl: [250, 68], mr: [250, 68], hid: [128, 64] }, aceiteras: { mrl: [250, 60], mr: [200, 70], hid: [128, 60] },
    caja_techo: [72, 48], baranda_techo: [72, 52], variador: { mrl: [25, 76], mr: [15, 70] }, cableado_hueco: [110, 80], iluminacion_hueco: [80, 80]
  };
  function anclaMundo(id, v) {
    modelo.posAncla(id, v);
    if (DE_PISO[id] && S.piso === MD.NP - 1 && S.modo !== 'armar') v.y -= (MD.NP - 1) * MD.FH;
    return v;
  }
  function enfocar(id) {
    if (!ok3D || !modelo.partes[id]) return;
    const p = modelo.partes[id], c = anclaMundo(id, new T.Vector3());
    let vi = VISTA[id]; if (vi && !Array.isArray(vi)) vi = vi[B()];
    const dir = vi ? dirDe(modelo.espejo ? 360 - vi[0] : vi[0], vi[1]) : camera.position.clone().sub(controls.target).normalize();
    mirar(c, distPara(Math.min(3.2, Math.max(0.55, p.radio * 1.9))), dir);
    S.zona = null; $$('#zonas button').forEach(b => b.setAttribute('aria-pressed', 'false'));
  }

  // ---------- movimiento ----------
  function setPuertas(abrir, fin) {
    const a0 = modelo.estado.ap, a1 = abrir ? 1 : 0;
    cancelar('puertas');
    if (a0 === a1) { if (fin) fin(); return; }
    tw(900 * Math.abs(a1 - a0), k => { modelo.puertas(a0 + (a1 - a0) * k, S.piso); verRayos(); }, () => { pintarBotonera(); if (fin) fin(); }, 'puertas');
  }
  function irAPiso(n, fin) {
    if (!ok3D || S.moviendo) return;
    if (n === S.piso) { setPuertas(true, fin); return; }
    S.moviendo = true; pintarBotonera();
    setPuertas(false, () => {
      const y0 = modelo.estado.cy, y1 = n * MD.FH;
      tw(1500 * Math.abs(n - S.piso), k => {
        const y = y0 + (y1 - y0) * k; modelo.actualizar(y);
        const p = Math.round(y / MD.FH);
        if (p !== ultimoP) { ultimoP = p; ASC.pintarDisplay(String(p + 1)); $('#visor7').textContent = String(p + 1); }
      }, () => { S.piso = n; modelo.puertas(0, n); S.moviendo = false; pintarBotonera(); setPuertas(true, fin); }, 'cabina');
    });
  }

  // ---------- piezas en miniatura y visor de la ficha ----------
  function iniMini() {
    const c = document.createElement('canvas');
    const r = new T.WebGLRenderer({ canvas: c, antialias: true, alpha: true, preserveDrawingBuffer: true });
    r.outputEncoding = T.sRGBEncoding; r.setClearColor(0x000000, 0);
    const sc = new T.Scene();
    sc.add(new T.HemisphereLight(0xffffff, 0x8d949b, 0.95));
    const d = new T.DirectionalLight(0xffffff, 0.8); d.position.set(3, 5, 4); sc.add(d);
    const cam = new T.PerspectiveCamera(28, 1, 0.01, 60), piv = new T.Group(); sc.add(piv);
    mini = { c, r, sc, cam, piv, visible: false, arr: false };
    let px = 0, py = 0;
    c.addEventListener('pointerdown', e => { mini.arr = true; px = e.clientX; py = e.clientY; try { c.setPointerCapture(e.pointerId); } catch (x) { /* nada */ } });
    c.addEventListener('pointermove', e => { if (!mini.arr) return; piv.rotation.y += (e.clientX - px) * 0.012; piv.rotation.x = Math.max(-0.9, Math.min(0.9, piv.rotation.x + (e.clientY - py) * 0.008)); px = e.clientX; py = e.clientY; });
    const soltar = () => { mini.arr = false; };
    c.addEventListener('pointerup', soltar); c.addEventListener('pointercancel', soltar);
  }
  function miniPoner(id) {
    const p = modelo && modelo.partes[id];
    if (!mini || !p) return false;
    while (mini.piv.children.length) mini.piv.remove(mini.piv.children[0]);
    mini.piv.rotation.set(0, 0, 0); mini.piv.updateMatrixWorld(true);
    const o = p.muestra; o.visible = true; mini.piv.add(o); o.updateMatrixWorld(true);
    const b = new T.Box3().setFromObject(o), c = b.getCenter(new T.Vector3()), rad = Math.max(0.04, b.getSize(new T.Vector3()).length() / 2);
    o.position.sub(c);
    mini.cam.position.set(0, rad * 0.9, rad / Math.sin(14 * Math.PI / 180) * 1.02); mini.cam.lookAt(0, 0, 0);
    mini.cam.near = rad * 0.05; mini.cam.far = rad * 20; mini.cam.updateProjectionMatrix();
    mini.piv.rotation.y = -0.7;
    return true;
  }
  function miniaturas() {
    miniat = {};
    if (!mini || !modelo) return;
    mini.r.setPixelRatio(1); mini.r.setSize(168, 168, false); mini.cam.aspect = 1;
    Object.keys(modelo.partes).forEach(id => {
      try { if (miniPoner(id)) { mini.r.render(mini.sc, mini.cam); miniat[id] = mini.c.toDataURL('image/png'); } } catch (e) { /* sin miniatura */ }
    });
    while (mini.piv.children.length) mini.piv.remove(mini.piv.children[0]);
  }
  const img = id => miniat[id] ? `<img src="${miniat[id]}" alt="" width="84" height="84">` : '<span class="sinimg"></span>';
  function montarVisor() {
    const caja = $('#visor');
    if (!caja || !mini || !miniPoner(S.sel)) { if (caja) caja.hidden = true; return; }
    caja.insertBefore(mini.c, caja.firstChild);
    const w = caja.clientWidth || 320, h = caja.clientHeight || 210;
    mini.r.setPixelRatio(Math.min(2, window.devicePixelRatio || 1)); mini.r.setSize(w, h, false);
    mini.cam.aspect = w / h; mini.cam.updateProjectionMatrix();
    mini.visible = true;
  }

  // ---------- puntos de montaje y rótulo ----------
  function pintarPuntos() {
    Object.keys(hot).forEach(id => hot[id].remove());
    hot = {};
    if (!ok3D || S.modo !== 'armar' || S.ficha) { sucio = true; return; }
    // el punto de la pieza elegida va al final para quedar encima si dos coinciden
    metas().filter(id => !puesta(id) && disponible(id)).sort((a, b) => (a === S.pick) - (b === S.pick)).forEach(id => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'punto'; b.dataset.punto = id; b.setAttribute('aria-label', 'Punto de montaje');
      if (S.pick === id && (arm().int[id] || 0) >= 2) b.classList.add('guia');
      puntos.appendChild(b); hot[id] = b;
    });
    sucio = true;
  }
  const v3 = T ? new T.Vector3() : null;
  function sobreponer() {
    const w = escena.clientWidth, h = escena.clientHeight;
    Object.keys(hot).forEach(id => {
      modelo.posAncla(id, v3).project(camera);
      const b = hot[id], fuera = v3.z > 1 || Math.abs(v3.x) > 1.05 || Math.abs(v3.y) > 1.05;
      b.hidden = fuera;
      if (!fuera) { b.style.left = ((v3.x * 0.5 + 0.5) * w) + 'px'; b.style.top = ((-v3.y * 0.5 + 0.5) * h) + 'px'; }
    });
    const id = S.modo === 'reto' ? (S.reto && S.reto.resp && S.reto.q[S.reto.i].t !== 'falla' ? S.reto.q[S.reto.i].id : null) : (S.hover || S.sel);
    if (id && modelo.partes[id] && visible(id)) {
      anclaMundo(id, v3).project(camera);
      if (v3.z < 1 && Math.abs(v3.x) < 1 && Math.abs(v3.y) < 1) {
        rotulo.hidden = false; rotulo.textContent = nom(id);
        rotulo.style.left = ((v3.x * 0.5 + 0.5) * w) + 'px'; rotulo.style.top = ((-v3.y * 0.5 + 0.5) * h) + 'px';
        return;
      }
    }
    rotulo.hidden = true;
  }

  // ---------- tocar el modelo ----------
  function parteEn(ev) {
    const r = lienzo.getBoundingClientRect();
    ray.setFromCamera(new T.Vector2(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1), camera);
    const hits = ray.intersectObject(modelo.raiz, true);
    for (const h of hits) {
      if (h.object.material === ASC.mat.rayo) continue;
      let vis = true, id = null;
      for (let a = h.object; a; a = a.parent) { if (!a.visible) { vis = false; break; } if (!id && a.userData.parte) id = a.userData.parte; }
      if (!vis) continue;
      if (id && modelo.partes[id].st === 'fantasma') continue;
      return id;   // un muro o una losa (sin id) tapa lo que hay detrás
    }
    return null;
  }
  function tocar(id) {
    if (S.modo === 'reto') { const R = S.reto; if (R && !R.fin && !R.resp && R.q[R.i].t === 'ubica' && id) responder(id); return; }
    if (!id) return;
    if (S.modo === 'explorar') seleccionar(id);
    else { S.sel = id; S.msg = { k: 'info', id }; aplicar(); pintarPanel(); }
  }
  function seleccionar(id, sinFoco) {
    S.sel = id; S.ficha = true; S.hover = null;
    aplicar(); pintarPanel(); pintarPuntos();
    if (!sinFoco) enfocar(id);
    if (ok3D && id === 'cortina_luminosa' && S.modo !== 'armar' && !S.moviendo) setPuertas(true);
  }
  // abre una parte desde el manual: cambia de tipo si hace falta
  function abrirParte(id) {
    if (!ASC.cat[id]) return;
    if (!enTipo(id)) cambiarTipo(DE_TIPO[ASC.cat[id].t[0]]);
    if (S.modo !== 'explorar') cambiarModo('explorar');
    seleccionar(id);
    $('#taller').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
  }

  // ---------- cambios de tipo y de modo ----------
  function cambiarTipo(t, primera) {
    S.tipo = t; S.sel = S.hover = S.pick = null; S.ficha = false; S.piso = 0; S.reto = null; S.msg = null; S.moviendo = false; ultimoP = 0;
    if (S.fz !== 'todas' && !delTipo().some(c => c.z === S.fz)) S.fz = 'todas';
    tweens.length = 0; clearTimeout(tMarcha);
    if (ok3D) {
      if (modelo) { scene.remove(modelo.raiz); modelo.raiz.traverse(o => { if (o.geometry && !o.geometry.userData.fija) o.geometry.dispose(); }); }
      modelo = ASC.construir(ASC.base(t), t); scene.add(modelo.raiz);
      ASC.pintarDisplay('1'); $('#visor7').textContent = '1';
      miniaturas();
      vista('todo', primera ? 0 : 500);
    }
    $$('#seg-tipo button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tipo === t)));
    pintarZonas(); pintarPlaca(); aplicar(); pintarPanel(); pintarPuntos(); pintarBotonera(); guardar();
  }
  function cambiarModo(m) {
    S.modo = m; S.sel = S.hover = S.pick = null; S.ficha = false; S.msg = null; S.reto = null;
    clearTimeout(tMarcha);
    $$('#seg-modo button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.modo === m)));
    if (ok3D && m === 'armar') { tweens.length = 0; S.moviendo = false; S.piso = 0; modelo.actualizar(0); modelo.puertas(0, 0); ASC.pintarDisplay('1'); $('#visor7').textContent = '1'; ultimoP = 0; }
    aplicar(); pintarPanel(); pintarPuntos(); pintarBotonera();
    if (ok3D) vista('todo');
  }

  // ---------- controles sobre la escena ----------
  function pintarZonas() {
    const arr = [['todo', 'Todo'], ['arriba', B() === 'mr' ? 'Cuarto de máquinas' : 'Arriba del hueco'], ['cabina', 'Cabina'], ['puertas', 'Puertas'], ['foso', 'Foso']];
    if (B() === 'hid') arr.push(['central', 'Central hidráulica']);
    $('#zonas').innerHTML = arr.map(z => `<button type="button" data-zona="${z[0]}" aria-pressed="${S.zona === z[0]}">${z[1]}</button>`).join('');
  }
  function pintarPlaca() {
    const d = EQ().placa;
    $('#placa').innerHTML = `<b>Ascensor de práctica</b>${esc(d[0])} · ${esc(d[1])} · 630 kg · 8 personas · 3 paradas · ${esc(d[2])}`;
  }
  function pintarBotonera() {
    const armando = S.modo === 'armar' && !armado();
    const bloque = !ok3D || S.moviendo || armando;
    $('#botonera').hidden = !ok3D || armando;   // mientras se arma no hay nada que mover y taparía puntos de montaje
    $$('#botonera button.p').forEach(b => { b.disabled = bloque; b.setAttribute('aria-pressed', String(Number(b.dataset.piso) === S.piso)); });
    const bp = $('#b-puerta'), ab = !!(modelo && modelo.estado.ap > 0.5);
    bp.disabled = bloque; bp.textContent = ab ? 'Cerrar puertas' : 'Abrir puertas'; bp.setAttribute('aria-pressed', String(ab));
    $('#b-rayos').setAttribute('aria-pressed', String(S.rayos));
  }

  // ---------- panel: explorar ----------
  function htmlExplorar() {
    const zs = ZONAS.filter(z => delTipo().some(c => c.z === z));
    return `<div>
      <h2>Todas las partes</h2>
      <p class="entrada">Toca una pieza en el modelo o en la lista y te cuento qué es, dónde va, cómo reconocerla y qué le puede fallar.</p>
      <div class="buscar"><input type="search" id="buscar" placeholder="Busca: cortina, gobernador, cuñas…" aria-label="Buscar una parte" value="${esc(S.filtro)}"></div>
      <div class="chips" id="fz"><button type="button" data-fz="todas" aria-pressed="${S.fz === 'todas'}">Todas</button>${zs.map(z => `<button type="button" data-fz="${z}" aria-pressed="${S.fz === z}">${esc(ASC.zonas[z])}</button>`).join('')}</div>
      <div id="lista"></div></div>`;
  }
  const sinTilde = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  function pintarLista() {
    const L = $('#lista'); if (!L) return;
    const f = sinTilde(S.filtro.trim());
    const pasa = c => {
      if (S.fz !== 'todas' && c.z !== S.fz) return false;
      if (!f) return true;
      const p = ASC.partes[c.id] || {};
      return sinTilde([c.n, p.nombre, (p.alias || []).join(' '), p.ingles, p.resumen].join(' ')).indexOf(f) >= 0;
    };
    let h = '';
    ZONAS.forEach(z => {
      const it = delTipo().filter(c => c.z === z && pasa(c));
      if (!it.length) return;
      h += `<p class="zona-t">${esc(ASC.zonas[z])} · ${it.length}</p><div class="piezas">` + it.map(c => {
        const p = ASC.partes[c.id] || {};
        return `<button type="button" class="pieza" data-id="${c.id}">${img(c.id)}<span><b>${esc(nom(c.id))}</b><small>${esc((p.alias || []).slice(0, 2).join(', '))}</small></span></button>`;
      }).join('') + '</div>';
    });
    L.innerHTML = h || '<p class="entrada">Ninguna parte coincide con esa búsqueda en este tipo de ascensor.</p>';
  }

  // ---------- panel: ficha ----------
  function htmlFicha(id) {
    const c = ASC.partes[id] || {}, k = ASC.cat[id];
    const lista = a => (a && a.length) ? '<ul>' + a.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : '';
    const aqui = c.porTipo && c.porTipo[B()], e = EQ();
    const propia = e.marca && c.marcas && c.marcas[e.marca];   // lo que se sabe de esta pieza en la marca del equipo elegido
    const mar = c.marcas ? [['otis', 'Otis'], ['schindler', 'Schindler'], ['movilift', 'MoviLift']].filter(m => c.marcas[m[0]] && m[0] !== e.marca) : [];
    const volver = S.modo === 'armar' ? 'Volver al armado' : S.modo === 'reto' ? 'Volver al reto' : 'Todas las partes';
    return `<div class="ficha">
      <button type="button" class="btn sec chico volver" data-accion="volver">← ${volver}</button>
      <header><p class="zona-t" style="margin:0">${esc(ASC.zonas[k.z])}</p><h3>${esc(nom(id))}</h3>
        ${(c.alias && c.alias.length) || c.ingles ? `<p class="alias">${c.alias && c.alias.length ? 'También le dicen: ' + esc(c.alias.join(', ')) : ''}${c.alias && c.alias.length && c.ingles ? ' · ' : ''}${c.ingles ? 'En inglés: <span lang="en">' + esc(c.ingles) + '</span>' : ''}</p>` : ''}</header>
      <div class="visor" id="visor"><span>Arrastra para girar la pieza</span></div>
      ${c.resumen ? `<p class="resumen">${esc(c.resumen)}</p>` : `<p class="resumen">${esc(k.m)}</p>`}
      ${propia ? `<section class="aqui"><h4>En el ${esc(e.nombre)}</h4><p>${esc(propia)}</p></section>` : ''}
      ${c.queHace ? `<section><h4>Qué hace</h4><p>${esc(c.queHace)}</p></section>` : ''}
      ${c.dondeVa || aqui ? `<section><h4>Dónde va</h4>${c.dondeVa ? `<p>${esc(c.dondeVa)}</p>` : ''}${aqui ? `<p class="aqui"><b>En este ascensor:</b> ${esc(aqui)}</p>` : ''}</section>` : ''}
      ${c.comoReconocer && c.comoReconocer.length ? `<section><h4>Cómo reconocerla</h4>${lista(c.comoReconocer)}</section>` : ''}
      ${c.fallas && c.fallas.length ? `<section><h4>Qué puede fallar</h4><ul class="fallas">${c.fallas.map(f => `<li><b>${esc(f.sintoma)}</b>${f.causa ? `<span><em>Causa</em> ${esc(f.causa)}</span>` : ''}${f.revisar ? `<span><em>Se revisa</em> ${esc(f.revisar)}</span>` : ''}</li>`).join('')}</ul></section>` : ''}
      ${c.seguridad ? `<section class="segur"><h4>Seguridad</h4><p>${esc(c.seguridad)}</p></section>` : ''}
      ${mar.length ? `<section><h4>${propia ? 'En las otras marcas' : 'En cada marca'}</h4><dl class="xmarca">${mar.map(m => `<dt>${m[1]}</dt><dd>${esc(c.marcas[m[0]])}</dd>`).join('')}</dl></section>` : ''}
      ${c.dato ? `<p class="dato">${esc(c.dato)}</p>` : ''}
      <div class="acciones">${ok3D ? '<button type="button" class="btn sec chico" data-accion="ubicar">Verla en el modelo</button>' : ''}</div>
    </div>`;
  }

  // ---------- panel: armar ----------
  function htmlArmar() {
    const ms = metas(), hechas = ms.filter(puesta).length, a = arm(), fin = hechas === ms.length;
    const nE = delTipo().filter(c => c.e).length, nC = delTipo().length;
    let msg;
    const m = S.msg;
    if (fin) msg = `<div class="aviso ok"><b>Ascensor armado.</b><p>${a.limpias} de ${ms.length} piezas a la primera, ${a.fallos} ${a.fallos === 1 ? 'fallo' : 'fallos'}. Ya puedes moverlo con la botonera.</p>
      <div class="acciones" style="margin-top:8px">${ok3D ? '<button type="button" class="btn oro chico" data-accion="marcha">Ponerlo en marcha</button>' : ''}${S.nivel === 'esencial' ? '<button type="button" class="btn sec chico" data-nivel="completo">Probar el armado completo</button>' : ''}</div></div>`;
    else if (m && m.k === 'bien') msg = `<div class="aviso ok"><b>Bien: ${esc(nom(m.id))}</b><p>${esc((ASC.partes[m.id] || {}).resumen || ASC.cat[m.id].m)}</p><div class="acciones" style="margin-top:6px"><button type="button" class="btn sec chico" data-id="${m.id}">Ver la ficha</button></div></div>`;
    else if (m && m.k === 'mal') msg = `<div class="aviso mal"><b>Ahí no va: ${esc(nom(m.id))}.</b><p>Pista: ${esc(pista(m.id))}</p>${(a.int[m.id] || 0) >= 2 ? '<p>El punto con el aro doble es el correcto.</p>' : ''}</div>`;
    else if (m && m.k === 'info') msg = `<div class="aviso"><b>${esc(nom(m.id))}</b><p>${esc((ASC.partes[m.id] || {}).resumen || ASC.cat[m.id].m)}</p><div class="acciones" style="margin-top:6px"><button type="button" class="btn sec chico" data-id="${m.id}">Ver la ficha</button></div></div>`;
    else if (S.pick) msg = `<div class="aviso"><b>${esc(nom(S.pick))}</b><p>${esc((ASC.partes[S.pick] || {}).resumen || ASC.cat[S.pick].m)}</p><p>Ahora toca en el modelo el punto amarillo donde va.</p></div>`;
    else msg = `<div class="aviso"><b>${hechas ? 'Elige la siguiente pieza.' : 'El hueco está vacío.'}</b><p>${ok3D ? 'Toma una pieza de la mesa y después toca en el modelo el punto amarillo donde va. Si fallas, te doy una pista.' : 'Sin 3D no se puede armar aquí, pero puedes abrir la ficha de cada pieza.'}</p></div>`;
    const cartas = ms.map(id => {
      const ok = puesta(id), disp = disponible(id), falta = deps(id).filter(d => !puesta(d));
      if (ok) return `<button type="button" class="carta hecha" data-id="${id}">${img(id)}<b>${esc(nom(id))}</b></button>`;
      return `<button type="button" class="carta" data-pick="${id}" aria-pressed="${S.pick === id}" ${disp ? '' : 'disabled'}>${img(id)}<b>${esc(nom(id))}</b>${disp ? '' : `<small>Antes: ${esc(nom(faltaMeta(id) || falta[0]))}</small>`}</button>`;
    }).join('');
    return `<div>
      <h2>Arma el ascensor</h2>
      <div class="avance"><span>${hechas}/${ms.length}</span><div class="via"><i style="width:${Math.round(100 * hechas / ms.length)}%"></i></div><span>${a.fallos} ${a.fallos === 1 ? 'fallo' : 'fallos'}</span></div>
      <div class="ajustes">
        <div class="seg" role="group" aria-label="Nivel"><button type="button" data-nivel="esencial" aria-pressed="${S.nivel === 'esencial'}">Esencial · ${nE}</button><button type="button" data-nivel="completo" aria-pressed="${S.nivel === 'completo'}">Completo · ${nC}</button></div>
        <label><input type="checkbox" id="chk-sil" ${S.siluetas ? 'checked' : ''}> Siluetas de ayuda</label>
        <button type="button" class="btn sec chico" data-accion="reiniciar">Empezar de cero</button>
      </div>
      ${msg}
      <div class="bandeja">${cartas}</div></div>`;
  }
  const pista = id => (ASC.partes[id] && ASC.partes[id].pista) || ASC.cat[id].m;
  function elegir(id) { S.pick = S.pick === id ? null : id; S.msg = null; S.sel = null; aplicar(); pintarPanel(); pintarPuntos(); }
  function intentar(slot) {
    const id = S.pick, a = arm();
    if (!id) { S.msg = null; pintarPanel(); const c = $('.bandeja .carta:not(.hecha):not(:disabled)'); if (c) c.focus(); return; }
    if (slot === id) {
      a.puestas[id] = true; if (!a.int[id]) a.limpias++;
      S.pick = null; S.sel = id; S.msg = { k: 'bien', id };
      guardar(); aplicar(); pintarPanel(); pintarPuntos(); pintarBotonera();
      setTimeout(() => { if (S.sel === id && S.modo === 'armar' && !S.ficha) { S.sel = null; aplicar(); } }, 1600);
    } else {
      a.fallos++; a.int[id] = (a.int[id] || 0) + 1; S.msg = { k: 'mal', id };
      guardar(); pintarPanel(); pintarPuntos();
      const b = hot[slot]; if (b) { b.classList.add('mal'); setTimeout(() => b.classList.remove('mal'), 450); }
    }
  }
  function reiniciar() { S.arm[S.tipo + ':' + S.nivel] = {}; S.pick = S.sel = null; S.msg = null; guardar(); cambiarModo('armar'); }

  // ---------- panel: reto ----------
  const baraja = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  function nuevoReto() {
    const ids = delTipo().map(c => c.id), q = [];
    // para nombrar una pieza conviene confundir con vecinas; para una falla, con piezas de otra zona, que no comparten síntomas
    const otros = (id, fuera, lejos) => baraja(ids.filter(x => x !== id && (fuera || []).indexOf(x) < 0)).sort((x, y) => { const d = (ASC.cat[y].z === ASC.cat[id].z) - (ASC.cat[x].z === ASC.cat[id].z); return lejos ? -d : d; }).slice(0, 5);
    const ops = (id, fuera, lejos) => baraja([id].concat(baraja(otros(id, fuera, lejos)).slice(0, 3)));
    const b = baraja(ids);
    if (ok3D) { b.slice(0, 4).forEach(id => q.push({ t: 'ubica', id })); b.slice(4, 7).forEach(id => q.push({ t: 'nombra', id, ops: ops(id) })); }
    const fs = [];
    (ASC.sintomas || []).forEach(s => { if (s.partes && s.partes.length && enTipo(s.partes[0])) fs.push({ t: 'falla', id: s.partes[0], texto: s.sintoma, fuera: s.partes }); });
    // las fichas repiten síntomas parecidos entre piezas vecinas: solo se usan si falta la tabla de síntomas
    if (fs.length < 3) ids.forEach(id => { const p = ASC.partes[id]; if (p && p.fallas && p.fallas[0]) fs.push({ t: 'falla', id, texto: p.fallas[0].sintoma, fuera: [id] }); });
    baraja(fs).slice(0, ok3D ? 3 : 8).forEach(f => { f.ops = ops(f.id, f.fuera, true); q.push(f); });
    S.reto = { q: baraja(q), i: 0, ok: 0, resp: null, mal: [] };
    prepararPregunta();
  }
  function prepararPregunta() {
    const R = S.reto, p = R.q[R.i];
    S.sel = null; S.hover = null;
    if (p && p.t === 'nombra') { S.sel = p.id; enfocar(p.id); }
    else if (p && ok3D) vista('todo');
    aplicar(); pintarPanel();
  }
  function responder(id) {
    const R = S.reto, p = R.q[R.i];
    if (R.resp) return;
    R.resp = { id, ok: id === p.id };
    if (R.resp.ok) R.ok++; else R.mal.push(p.id);
    if (p.t !== 'nombra' && ok3D && enTipo(p.id)) { S.sel = p.id; enfocar(p.id); }
    aplicar(); pintarPanel();
  }
  function htmlReto() {
    const R = S.reto;
    if (!R) return `<div><h2>Reto</h2><p class="entrada">Diez preguntas sobre este ascensor: ubicar una pieza en el modelo, decir cómo se llama la que está resaltada y elegir qué revisarías ante una falla.</p>
      <div class="acciones"><button type="button" class="btn oro" data-accion="reto">Empezar</button></div></div>`;
    if (R.fin) {
      const u = Array.from(new Set(R.mal));
      return `<div><h2>Resultado</h2><p class="pregunta">${R.ok} de ${R.q.length} correctas</p>
        ${u.length ? `<p class="entrada">Repasa estas fichas:</p><div class="piezas">${u.map(id => `<button type="button" class="pieza" data-id="${id}">${img(id)}<span><b>${esc(nom(id))}</b><small>${esc(ASC.zonas[ASC.cat[id].z])}</small></span></button>`).join('')}</div>` : '<p class="entrada">Ninguna falla. Prueba con otro tipo de ascensor.</p>'}
        <div class="acciones"><button type="button" class="btn oro" data-accion="reto">Otra ronda</button></div></div>`;
    }
    const p = R.q[R.i], r = R.resp;
    let cuerpo;
    if (p.t === 'ubica') cuerpo = `<p class="pregunta">Toca en el modelo: ${esc(nom(p.id))}</p><p class="entrada">Gira y acerca todo lo que necesites. Los botones de zona te llevan más rápido.</p>`;
    else {
      const t = p.t === 'nombra' ? '¿Cómo se llama la pieza resaltada en amarillo?' : `«${esc(p.texto)}» ¿Qué se revisa primero?`;
      cuerpo = `<p class="pregunta">${t}</p><div class="opciones">${p.ops.map(o => `<button type="button" data-op="${o}" ${r ? 'disabled' : ''} class="${r ? (o === p.id ? 'bien' : o === r.id ? 'err' : '') : ''}">${esc(nom(o))}</button>`).join('')}</div>`;
    }
    const fb = r ? `<div class="aviso ${r.ok ? 'ok' : 'mal'}"><b>${r.ok ? 'Correcto.' : 'No. La respuesta era: ' + esc(nom(p.id)) + '.'}</b><p>${esc((ASC.partes[p.id] || {}).resumen || ASC.cat[p.id].m)}</p>
      <div class="acciones" style="margin-top:8px"><button type="button" class="btn oro chico" data-accion="sig">${R.i + 1 < R.q.length ? 'Siguiente' : 'Ver resultado'}</button><button type="button" class="btn sec chico" data-id="${p.id}">Ver la ficha</button></div></div>` : '';
    return `<div><h2>Reto</h2><p class="marcador">Pregunta ${R.i + 1} de ${R.q.length} · ${R.ok} correctas</p>${cuerpo}${fb}</div>`;
  }

  function pintarPanel() {
    const P = $('#panel');
    if (mini) { mini.visible = false; if (mini.c.parentNode) mini.c.parentNode.removeChild(mini.c); }
    if (S.ficha && S.sel) { P.innerHTML = htmlFicha(S.sel); P.scrollTop = 0; montarVisor(); return; }
    P.innerHTML = S.modo === 'explorar' ? htmlExplorar() : S.modo === 'armar' ? htmlArmar() : htmlReto();
    if (S.modo === 'explorar') pintarLista();
  }

  // ---------- manual ----------
  function pintarManual() {
    const tipos = ASC.tipoIds.filter(t => ASC.tipos[t]);
    if (tipos.length) {
      $('#tipos').hidden = false;
      const ul = a => (a && a.length) ? '<ul>' + a.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : '';
      $('#lista-tipos').innerHTML = tipos.map(t => { const d = ASC.tipos[t]; return `<article class="tipo">
        <h3>${esc(d.nombre || ASC.tipoNombre[t])}${d.sigla ? `<small>${esc(d.sigla)}</small>` : ''}</h3>
        <p>${esc(d.resumen)}</p>${d.comoFunciona ? `<p>${esc(d.comoFunciona)}</p>` : ''}
        ${d.comoReconocer ? `<h4>Cómo reconocerlo</h4>${ul(d.comoReconocer)}` : ''}
        <div class="dos">${d.ventajas ? `<div><h4>A favor</h4>${ul(d.ventajas)}</div>` : ''}${d.limites ? `<div><h4>Límites</h4>${ul(d.limites)}</div>` : ''}</div>
        ${d.enPeru ? `<p><b>En el Perú:</b> ${esc(d.enPeru)}</p>` : ''}${d.ejemplos ? `<p><b>Ejemplos:</b> ${esc(d.ejemplos)}</p>` : ''}
        <button type="button" class="btn sec chico" data-ir-tipo="${DE_TIPO[t]}">Verlo en el taller</button></article>`; }).join('');
    }
    if (ASC.marcas && ASC.marcas.length) {
      $('#marcas').hidden = false;
      $('#seg-marca').innerHTML = ASC.marcas.map((m, i) => `<button type="button" data-marca="${i}" aria-pressed="${i === S.marca}">${esc(m.nombre)}</button>`).join('');
      pintarMarca();
    }
    const guia = (ASC.guia || []).filter(g => g.puntos && g.puntos.length);
    if (guia.length) {
      $('#guia').hidden = false;
      $('#lista-guia').innerHTML = guia.map(g => `<li><h3>${esc(g.lugar)}</h3><p>${esc(g.intro)}</p><ul>${g.puntos.filter(p => ASC.cat[p.parte]).map(p => `<li><button type="button" class="enlace-p" data-abrir="${p.parte}">${esc(nomG(p.parte))}</button><span>${esc(p.mira)}</span></li>`).join('')}</ul></li>`).join('');
    }
    if (ASC.seguridades && ASC.seguridades.length) {
      $('#seguridades').hidden = false;
      $('#lista-seg').innerHTML = ASC.seguridades.map(s => `<li><div><b>${esc(s.nombre)}</b><p>${esc(s.donde || '')} ${esc(s.abre || '')}</p></div>${ASC.cat[s.parte] ? `<button type="button" class="enlace-p chico" data-abrir="${s.parte}">${esc(nomG(s.parte))}</button>` : ''}</li>`).join('');
    }
    if (ASC.jerga && ASC.jerga.length) {
      $('#jerga').hidden = false;
      $('#lista-jerga').innerHTML = ASC.jerga.map(j => `<div><dt>${esc(j.dicen)}</dt><dd>${esc(j.es)}${ASC.cat[j.parte] ? ` <button type="button" class="enlace-p chico" data-abrir="${j.parte}">Ver pieza</button>` : ''}</dd></div>`).join('');
    }
    if (ASC.sintomas && ASC.sintomas.length) { $('#fallas').hidden = false; pintarSintomas(''); }
    if (ASC.normas && ASC.normas.length) {
      $('#normas').hidden = false;
      $('#lista-normas').innerHTML = ASC.normas.map(n => `<div><b>${esc(n.titulo)}</b>${esc(n.texto)}${enlace(n.fuente, ' Fuente')}</div>`).join('');
    }
  }
  const enlace = (u, t) => (u && /^https?:\/\//.test(u)) ? ` <a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : '';
  function pintarMarca() {
    const m = ASC.marcas[S.marca]; if (!m) return;
    const ul = a => (a && a.length) ? '<ul>' + a.map(x => `<li>${esc(x)}</li>`).join('') + '</ul>' : '';
    const mods = (m.modelos || []).map(x => `<article class="modelo">
      <h3>${esc(x.nombre)}</h3><span class="estado ${/cat[aá]logo/i.test(x.estado || '') ? 'si' : ''}">${esc(x.estado || '')}</span>
      ${x.para ? `<p>${esc(x.para)}</p>` : ''}
      ${x.datos && x.datos.length ? `<dl class="datos">${x.datos.map(d => `<dt>${esc(d[0])}</dt><dd>${esc(d[1])}</dd>`).join('')}</dl>` : ''}
      ${x.reconocer && x.reconocer.length ? `<h4>Cómo reconocerlo</h4>${ul(x.reconocer)}` : ''}
      ${x.nota ? `<p class="nota">${esc(x.nota)}</p>` : ''}
      <div class="pie">${ASC.tipoIds.indexOf(x.tipo) >= 0 ? `<button type="button" class="btn sec chico" data-ir-tipo="${x.tipo === 'mrl' && m.id === 'schindler' ? 'schindler' : DE_TIPO[x.tipo]}">Armar uno así</button>` : ''}${enlace(x.fuente, 'Fuente')}</div></article>`).join('');
    const gl = (ASC.glosario || {})[m.id] || [];
    $('#marca-cuerpo').innerHTML = `
      <div class="bloque"><p style="font-size:16px">${esc(m.enPeru || '')}</p>${m.comoReconocer && m.comoReconocer.length ? `<h4>Cómo reconocer un ${esc(m.nombre)}</h4>${ul(m.comoReconocer)}` : ''}</div>
      <div class="modelos">${mods}</div>
      ${m.componentes && m.componentes.length ? `<div class="bloque" style="max-width:none"><h4>Nombres propios que vas a oír</h4><dl class="compo">${m.componentes.map(c => `<div><dt>${esc(c[0])}</dt><dd>${esc(c[1])}</dd></div>`).join('')}</dl></div>` : ''}
      ${gl.length ? `<div class="bloque" style="max-width:none"><h4>Siglas y rótulos que vas a ver en un ${esc(m.nombre)}</h4><dl class="compo">${gl.map(g => `<div><dt>${esc(g.sigla)}</dt><dd>${esc(g.que)}${g.donde ? ' ' + esc(g.donde) : ''}${g.parte && ASC.cat[g.parte] ? ` <button type="button" class="enlace-p chico" data-abrir="${g.parte}">Ver pieza</button>` : ''}</dd></div>`).join('')}</dl></div>` : ''}
      ${m.fuentes && m.fuentes.length ? `<div class="fuentes">Fuentes: ${m.fuentes.map(f => enlace(f[1], f[0])).join(' ·')}</div>` : ''}`;
  }
  function pintarSintomas(f) {
    f = sinTilde(f.trim());
    const filas = ASC.sintomas.filter(s => !f || sinTilde(s.sintoma + ' ' + (s.explica || '') + ' ' + (s.partes || []).map(nomG).join(' ')).indexOf(f) >= 0);
    $('#lista-sintomas').innerHTML = filas.map(s => `<div><div><b>${esc(s.sintoma)}</b><p>${esc(s.explica || '')}</p></div><div class="chips">${(s.partes || []).filter(p => ASC.cat[p]).map(p => `<button type="button" data-abrir="${p}">${esc(nomG(p))}</button>`).join('')}</div></div>`).join('') || '<p class="entrada" style="padding:10px 0">Ningún síntoma coincide.</p>';
  }

  // ---------- eventos ----------
  function enlazar() {
    $('#seg-tipo').innerHTML = ASC.equipoIds.map(t => `<button type="button" data-tipo="${t}" aria-pressed="${t === S.tipo}">${esc(ASC.equipos[t].nombre)}</button>`).join('');
    $('#seg-tipo').addEventListener('click', e => { const b = e.target.closest('button[data-tipo]'); if (b && b.dataset.tipo !== S.tipo) cambiarTipo(b.dataset.tipo); });
    $('#seg-modo').addEventListener('click', e => { const b = e.target.closest('button[data-modo]'); if (b && b.dataset.modo !== S.modo) cambiarModo(b.dataset.modo); });
    $$('#seg-modo button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.modo === S.modo)));
    $('#zonas').addEventListener('click', e => { const b = e.target.closest('button[data-zona]'); if (b) vista(b.dataset.zona); });
    $('#botonera').addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b || b.disabled || !ok3D) return;
      if (b.dataset.piso != null) irAPiso(Number(b.dataset.piso));
      else if (b.id === 'b-puerta') { if (!S.moviendo) setPuertas(modelo.estado.ap < 0.5); }
      else if (b.id === 'b-rayos') { S.rayos = !S.rayos; verRayos(); pintarBotonera(); }
    });
    puntos.addEventListener('click', e => {
      const b = e.target.closest('.punto'); if (!b) return;
      let id = b.dataset.punto;
      const mio = S.pick && hot[S.pick];
      // si otro punto tapa al correcto, un toque cerca de su centro vale igual
      if (mio && id !== S.pick && !mio.hidden) { const r = mio.getBoundingClientRect(); if (Math.hypot(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2) < 18) id = S.pick; }
      intentar(id);
    });

    const P = $('#panel');
    P.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      const d = b.dataset;
      if (d.id) seleccionar(d.id);
      else if (d.pick) elegir(d.pick);
      else if (d.fz) { S.fz = d.fz; $$('#fz button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.fz === S.fz))); pintarLista(); }
      else if (d.nivel) { S.nivel = d.nivel; guardar(); cambiarModo('armar'); }
      else if (d.op) responder(d.op);
      else if (d.accion === 'volver') { S.ficha = false; if (S.modo !== 'reto') S.sel = null; aplicar(); pintarPanel(); pintarPuntos(); }
      else if (d.accion === 'ubicar') { enfocar(S.sel); if (window.matchMedia('(max-width: 900px)').matches) escena.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' }); }
      else if (d.accion === 'reiniciar') reiniciar();
      else if (d.accion === 'marcha') { vista('todo'); irAPiso(MD.NP - 1, () => { tMarcha = setTimeout(() => irAPiso(0), 1200); }); }
      else if (d.accion === 'reto') nuevoReto();
      else if (d.accion === 'sig') { const R = S.reto; R.resp = null; R.i++; if (R.i >= R.q.length) { R.fin = true; S.sel = null; aplicar(); pintarPanel(); } else prepararPregunta(); }
    });
    P.addEventListener('input', e => { if (e.target.id === 'buscar') { S.filtro = e.target.value; pintarLista(); } });
    P.addEventListener('change', e => { if (e.target.id === 'chk-sil') { S.siluetas = e.target.checked; guardar(); aplicar(); } });

    document.addEventListener('click', e => {
      const a = e.target.closest('[data-abrir]'); if (a) { abrirParte(a.dataset.abrir); return; }
      const t = e.target.closest('[data-ir-tipo]');
      if (t) { if (t.dataset.irTipo !== S.tipo) cambiarTipo(t.dataset.irTipo); $('#taller').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' }); return; }
      const m = e.target.closest('[data-marca]');
      if (m) { S.marca = Number(m.dataset.marca); $$('#seg-marca button').forEach(x => x.setAttribute('aria-pressed', String(Number(x.dataset.marca) === S.marca))); pintarMarca(); }
    });
    const bs = $('#buscar-sintoma'); if (bs) bs.addEventListener('input', () => pintarSintomas(bs.value));

    if (!ok3D) return;
    const sens = $('#sens');
    if (sens) {
      const pintaSens = () => { sens.value = S.rueda; $('#sens-v').textContent = S.rueda + ' %'; };
      pintaSens();
      sens.addEventListener('input', () => { S.rueda = Number(sens.value); pintaSens(); guardar(); });
    }
    // Rueda: cada muesca acerca o aleja el porcentaje elegido (19 % de fábrica). Acercar va hacia el cursor; alejar vuelve al centro.
    // Se captura en el contenedor para que OrbitControls no aplique además su paso corto.
    escena.addEventListener('wheel', e => {
      e.preventDefault(); e.stopPropagation();
      if (!modelo) return;
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 33; else if (e.deltaMode === 2) dy *= 300;
      if (e.ctrlKey && Math.abs(dy) < 50) dy *= 4;   // el pellizco del trackpad llega como rueda con ctrl y pasos chicos
      const dist = camera.position.distanceTo(controls.target);
      // S.rueda = cuánto se acerca la cámara con una muesca (100 de giro), en porcentaje
      const k = -Math.log(1 - S.rueda / 100) / 100;
      const nueva = Math.max(controls.minDistance, Math.min(controls.maxDistance, dist * Math.exp(Math.max(-1.2, Math.min(1.2, dy * k)))));
      const s = nueva / dist;
      if (Math.abs(s - 1) < 1e-4) return;
      cancelar('camara');
      if (s > 1) {
        // alejar: el punto de mira vuelve hacia el centro del ascensor y llega justo cuando se alcanza el tope
        const resto = controls.maxDistance - dist, f = resto > 1e-3 ? Math.min(1, (nueva - dist) / resto) : 1;
        const dir = camera.position.clone().sub(controls.target).normalize();
        controls.target.lerp(encuadre().c, f);
        camera.position.copy(controls.target).addScaledVector(dir, nueva);
      } else {
        // acercar: hacia lo que está bajo el cursor
        const r = lienzo.getBoundingClientRect();
        ray.setFromCamera(new T.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), camera);
        let P = controls.target.clone();
        for (const h of ray.intersectObject(modelo.raiz, true)) {
          let vis = h.object.material !== ASC.mat.rayo && h.object.material !== ASC.mat.toque;
          for (let a = h.object; a && vis; a = a.parent) if (!a.visible) vis = false;
          if (vis) { P = h.point; break; }
        }
        camera.position.sub(P).multiplyScalar(s).add(P);
        controls.target.sub(P).multiplyScalar(s).add(P);
      }
      S.zona = null; $$('#zonas button').forEach(b => b.setAttribute('aria-pressed', 'false'));
      $('#pista-uso').hidden = true;
      sucio = true;
    }, { passive: false, capture: true });
    let abajo = null;
    lienzo.addEventListener('pointerdown', e => { abajo = { x: e.clientX, y: e.clientY, t: performance.now() }; });
    lienzo.addEventListener('pointerup', e => {
      if (!abajo) return;
      const quieto = Math.hypot(e.clientX - abajo.x, e.clientY - abajo.y) < 7 && performance.now() - abajo.t < 700;
      abajo = null;
      if (quieto) tocar(parteEn(e));
    });
    let pend = null;
    lienzo.addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse' || e.buttons) return;
      pend = e;
      requestAnimationFrame(() => {
        if (!pend) return;
        const id = parteEn(pend); pend = null;
        if (id !== S.hover) { S.hover = id; lienzo.style.cursor = id ? 'pointer' : 'grab'; aplicar(); }
      });
    });
    lienzo.addEventListener('pointerleave', () => { if (S.hover) { S.hover = null; aplicar(); } });
  }

  // ---------- arranque ----------
  leer();
  ok3D = iniciar3D();
  if (!ok3D) {
    const d = document.createElement('div'); d.className = 'sin3d';
    d.textContent = 'Este navegador no pudo iniciar el modelo 3D. Las fichas de cada parte y el manual funcionan igual.';
    escena.appendChild(d); lienzo.hidden = true; $('#botonera').hidden = true; $('#pista-uso').hidden = true; $('#placa').hidden = true;
  }
  enlazar();
  pintarManual();
  cambiarTipo(S.tipo, true);
  requestAnimationFrame(bucle);
})();
