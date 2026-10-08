/* Taller de Ascensores — detección de fallas.
   Cuatro caminos: escribir el código que muestra el equipo, responder preguntas, pegar el texto del registro de
   fallas, o conectar la laptop por USB al puerto serie del equipo (Web Serial, solo lectura).
   Los códigos vienen de ASC.codigos y los equipos de ASC.equiposFalla (contenido-codigos.js). */
(() => {
  'use strict';
  const ASC = window.ASC;
  const raiz = document.getElementById('deteccion');
  if (!raiz || !ASC) return;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sinTilde = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const nomPieza = id => (ASC.partes[id] && ASC.partes[id].nombre) || (ASC.cat[id] && ASC.cat[id].n) || id;
  const enlace = (u, t) => (u && /^https?:\/\//.test(u)) ? `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>` : '';
  const codigos = () => ASC.codigos || [];
  const equipos = () => ASC.equiposFalla || [];
  const equipo = id => equipos().find(e => e.id === id);
  const reducido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  const D = { modo: 'codigo', marca: 'todas', eq: 'todos', q: '', nodo: ASC.diagnostico ? ASC.diagnostico.inicio : null, camino: [], texto: '' };

  // ---------- comparar códigos: «Err 30», «ERR30», «E30» y «30» son el mismo número ----------
  const PREF = /^(ERR|ER|E|F|FL|A|AL|ALM|ALARM|FAULT|FALLA|EV|EVT|EVENT|CODE|COD|C|N|NO)(?=\d)/;
  function claves(c) {
    const k = sinTilde(c).toUpperCase().replace(/[\s\-_.:#/]/g, '');
    const num = k.replace(PREF, '').replace(/^0+(?=\d)/, '');
    return { k, num };
  }
  function coincide(cod, q) {
    const a = claves(cod.codigo), b = claves(q);
    if (!b.k) return 0;
    if (a.k === b.k) return 3;
    if (/^\d+[A-Z]?$/.test(b.num) && a.num === b.num) return 2;
    return 0;
  }
  function buscarCodigo(q, filtro) {
    const qq = String(q || '').trim(); if (!qq) return [];
    const texto = sinTilde(qq), r = [];
    codigos().forEach(c => { if (filtro && !filtro(c)) return; const p = coincide(c, qq); if (p) r.push({ c, p }); });
    // si no es un código conocido, se busca como palabra (encoder, puerta, freno…)
    if (!r.length && texto.length > 2) codigos().forEach(c => {
      if (filtro && !filtro(c)) return;
      const t = sinTilde([c.nombre, c.simple, (c.causas || []).join(' ')].join(' '));
      if (texto.split(/\s+/).every(w => t.indexOf(w) >= 0)) r.push({ c, p: 1 });
    });
    return r.sort((x, y) => y.p - x.p).map(x => x.c);
  }
  function filtroActual() {
    return c => { const e = equipo(c.equipo); if (D.eq !== 'todos') return c.equipo === D.eq; if (D.marca !== 'todas') return !!e && sinTilde(e.marca) === D.marca; return true; };
  }

  // ---------- tarjetas ----------
  function botonesPieza(id) {
    if (!id || !ASC.cat[id]) return '';
    return `<button type="button" class="btn sec chico" data-video="${id}">Video: ${esc(nomPieza(id))}</button><button type="button" class="btn sec chico" data-abrir="${id}">Ver en el 3D</button><button type="button" class="btn oro chico" data-simular="${id}">Simular falla</button>`;
  }
  function htmlCodigo(c) {
    const e = equipo(c.equipo) || {};
    return `<article class="cod">
      <header><span class="cod-num">${esc(c.codigo)}</span><div><p class="cod-eq">${esc([e.marca, e.nombre].filter(Boolean).join(' · ') || c.equipo)}</p><h3>${esc(c.nombre)}</h3></div></header>
      <p class="cod-simple">${esc(c.simple)}</p>
      <div class="cod-cols">
        ${c.causas && c.causas.length ? `<section><h4>Por qué pasa</h4><ul>${c.causas.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>` : ''}
        ${c.arreglo && c.arreglo.length ? `<section><h4>Cómo arreglarlo</h4><ol>${c.arreglo.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>` : ''}
      </div>
      ${c.peligro ? `<p class="cod-peligro"><b>Cuidado:</b> ${esc(c.peligro)}</p>` : ''}
      <div class="acciones">${botonesPieza(c.pieza)}${enlace(c.fuente, 'Fuente')}</div>
    </article>`;
  }
  function htmlEquipo(e) {
    if (!e) return '';
    const cx = e.conexion || {};
    return `<div class="eq-info">
      <h3>${esc(e.marca)} · ${esc(e.nombre)}</h3>
      ${e.dondeVer ? `<p><b>Dónde ver el código:</b> ${esc(e.dondeVer)}</p>` : ''}
      ${e.historial ? `<p><b>Historial de fallas:</b> ${esc(e.historial)}</p>` : ''}
      <p><b>Con la laptop:</b> ${cx.posible ? `sí. ${esc([cx.puerto, cx.protocolo, cx.ajustes].filter(Boolean).join(' · '))}${cx.software ? ' · Programa: ' + esc(cx.software) : ''}` : esc(cx.notas || 'no se encontró una forma pública de leerlo; usa el código de la pantalla.')}</p>
      <p class="fuentes">${(e.fuentes || []).slice(0, 4).map((u, i) => enlace(u, 'Fuente ' + (i + 1))).join(' ')}</p>
    </div>`;
  }
  function htmlResultado(r) {
    return `<article class="cod diag">
      <header><span class="cod-num">✓</span><div><p class="cod-eq">Lo más probable</p><h3>${esc(r.titulo)}</h3></div></header>
      <p class="cod-simple">${esc(r.explica)}</p>
      <section><h4>Qué revisar, en orden</h4><ol>${r.pasos.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>
      ${r.peligro ? `<p class="cod-peligro"><b>Cuidado:</b> ${esc(r.peligro)}</p>` : ''}
      ${r.piezas && r.piezas.length ? `<section><h4>Piezas para revisar</h4><div class="chips">${r.piezas.filter(p => ASC.cat[p]).map(p => `<button type="button" data-video="${p}">▶ ${esc(nomPieza(p))}</button>`).join('')}</div></section>` : ''}
      <div class="acciones">${r.piezas && r.piezas[0] ? botonesPieza(r.piezas[0]) : ''}</div>
    </article>`;
  }

  // ---------- modos ----------
  const MODOS = [['codigo', 'Escribir el código'], ['preguntas', 'Responder preguntas'], ['texto', 'Pegar texto'], ['laptop', 'Conectar la laptop']];
  function pintar() {
    $('#det-modo').innerHTML = MODOS.map(m => `<button type="button" data-dmodo="${m[0]}" aria-pressed="${D.modo === m[0]}">${m[1]}</button>`).join('');
    const C = $('#det-cuerpo');
    if (D.modo === 'codigo') C.innerHTML = htmlModoCodigo();
    else if (D.modo === 'preguntas') C.innerHTML = htmlPreguntas();
    else if (D.modo === 'texto') C.innerHTML = htmlTexto();
    else C.innerHTML = htmlLaptop();
    if (D.modo === 'codigo') resultadosCodigo();
    if (D.modo === 'texto') resultadosTexto();
    if (D.modo === 'laptop') pintarConexion();
  }
  function marcas() { const m = new Map(); equipos().forEach(e => { if (codigos().some(c => c.equipo === e.id)) m.set(sinTilde(e.marca), e.marca); }); return Array.from(m.entries()); }
  function selectorEquipos() {
    const lista = equipos().filter(e => (D.marca === 'todas' || sinTilde(e.marca) === D.marca) && codigos().some(c => c.equipo === e.id));
    return `<label class="det-campo"><span>Equipo</span><select id="det-eq"><option value="todos">Todos${D.marca !== 'todas' ? ' los de esta marca' : ''}</option>${lista.map(e => `<option value="${esc(e.id)}" ${D.eq === e.id ? 'selected' : ''}>${esc(e.marca)} · ${esc(e.nombre)}</option>`).join('')}</select></label>`;
  }
  function htmlModoCodigo() {
    const n = codigos().length;
    return `<p class="entrada">Escribe el código que aparece en la pantalla del tablero, del variador o de la herramienta de servicio (por ejemplo <b>Err30</b>, <b>E35</b>, <b>0012</b>). También puedes escribir una palabra: <b>encoder</b>, <b>puerta</b>, <b>freno</b>.</p>
      <div class="chips" id="det-marcas"><button type="button" data-dmarca="todas" aria-pressed="${D.marca === 'todas'}">Todas las marcas</button>${marcas().map(m => `<button type="button" data-dmarca="${esc(m[0])}" aria-pressed="${D.marca === m[0]}">${esc(m[1])}</button>`).join('')}</div>
      <div class="det-fila">${selectorEquipos()}<label class="det-campo grande"><span>Código o palabra</span><input type="search" id="det-q" value="${esc(D.q)}" placeholder="Err30, E35, 0012, encoder…" autocomplete="off" spellcheck="false"></label></div>
      <p class="marcador" id="det-cuenta">${n ? n + ' códigos en la base' : 'La base de códigos todavía no está cargada.'}</p>
      <div id="det-eqinfo"></div><div class="cods" id="det-res"></div>`;
  }
  function resultadosCodigo() {
    const R = $('#det-res'); if (!R) return;
    $('#det-eqinfo').innerHTML = D.eq !== 'todos' ? htmlEquipo(equipo(D.eq)) : '';
    if (!D.q.trim()) {
      const lista = D.eq !== 'todos' ? codigos().filter(c => c.equipo === D.eq).slice(0, 12) : [];
      R.innerHTML = lista.length ? `<p class="entrada">Algunos códigos de este equipo:</p>` + lista.map(htmlCodigo).join('') : '';
      return;
    }
    const r = buscarCodigo(D.q, filtroActual());
    $('#det-cuenta').textContent = r.length ? (r.length === 1 ? '1 resultado' : r.length + ' resultados') : 'Sin resultados';
    R.innerHTML = r.length ? r.slice(0, 30).map(htmlCodigo).join('') + (r.length > 30 ? `<p class="entrada">Hay ${r.length - 30} más: elige la marca o el equipo para afinar.</p>` : '')
      : `<div class="aviso"><b>No encontré ese código.</b><p>Revisa que esté bien escrito, elige la marca y el equipo, o usa «Responder preguntas»: te guía por síntomas y sirve para cualquier marca.</p></div>`;
  }

  function htmlPreguntas() {
    const G = ASC.diagnostico; if (!G) return '<p class="entrada">No hay preguntas cargadas.</p>';
    const n = G.nodos[D.nodo] || G.nodos[G.inicio];
    const atras = D.camino.length ? `<div class="acciones"><button type="button" class="btn sec chico" data-datras>← Atrás</button><button type="button" class="btn sec chico" data-dreinicio>Empezar de nuevo</button></div>` : '';
    if (n.r) return `${atras}${htmlResultado(n.r)}`;
    return `${atras}<p class="det-pregunta">${esc(n.p)}</p><div class="det-ops">${n.o.map(o => `<button type="button" data-dop="${esc(o[1])}">${esc(o[0])}</button>`).join('')}</div>
      <p class="nota-rep">Las preguntas sirven para cualquier marca. Si el equipo muestra un código, búscalo además en «Escribir el código».</p>`;
  }

  // ---------- pegar texto: busca todos los códigos que aparezcan ----------
  function fichas(texto) {
    // fuera fechas y horas (12/03, 10:41, 2024-05-01) para que no parezcan códigos
    const t = String(texto || '').replace(/\b\d{1,4}[\/:.-]\d{1,2}(?:[\/:.-]\d{1,4})?\b/g, ' '), set = new Set();
    (t.match(/\b[A-Za-z]{0,5}[\s\-:#]?\d{1,4}[A-Za-z]?\b/g) || []).forEach(x => set.add(x.replace(/\s+/g, '')));
    (t.match(/\b[A-Z]{2,6}\d?\b/g) || []).forEach(x => set.add(x));
    return Array.from(set);
  }
  function htmlTexto() {
    return `<p class="entrada">Pega aquí lo que copiaste del historial de fallas (de la herramienta de servicio, del programa del variador o escrito a mano). La app busca cada código y te dice qué significa.</p>
      <div class="det-fila">${selectorEquipos()}</div>
      <textarea id="det-texto" rows="6" placeholder="Ej.: 12/03 10:41 Err30 · 12/03 10:44 Err41 · E35">${esc(D.texto)}</textarea>
      <p class="marcador" id="det-tcuenta"></p><div class="cods" id="det-tres"></div>`;
  }
  function resultadosTexto() {
    const R = $('#det-tres'); if (!R) return;
    const vistos = new Set(), res = [];
    fichas(D.texto).forEach(f => buscarCodigo(f, filtroActual()).filter(c => coincide(c, f) >= 2).forEach(c => { const k = c.equipo + '|' + c.codigo; if (!vistos.has(k)) { vistos.add(k); res.push(c); } }));
    $('#det-tcuenta').textContent = D.texto.trim() ? (res.length ? res.length + ' códigos reconocidos' : 'No reconocí ningún código. Elige el equipo para afinar la búsqueda.') : '';
    R.innerHTML = res.slice(0, 40).map(htmlCodigo).join('');
  }

  // ---------- conectar la laptop (Web Serial, solo lectura) ----------
  const CX = { port: null, lector: null, escritor: null, vivo: false, demo: null, log: [], ultimo: null, estado: 'desconectado', error: '' };
  function perfiles() { return ASC.perfilesSerie || []; }
  function perfil() { return perfiles().find(p => p.id === (CX.perfil || 'texto')) || perfiles()[0]; }
  function permitido() {
    if (!('serial' in navigator)) return 'nosoporta';
    try { if (document.featurePolicy && document.featurePolicy.allowsFeature && !document.featurePolicy.allowsFeature('serial')) return 'bloqueado'; } catch (e) { /* sin policy */ }
    return 'ok';
  }
  function htmlLaptop() {
    const p = perfil() || {}, ps = permitido();
    const aviso = ps === 'nosoporta' ? `<div class="aviso mal"><b>Este navegador no tiene puerto USB-serie.</b><p>Usa Google Chrome o Microsoft Edge en una laptop con Windows, Mac o Linux. En el celular no funciona.</p></div>`
      : ps === 'bloqueado' ? `<div class="aviso mal"><b>Desde esta vista el navegador no deja usar el USB.</b><p>Abre la app en una pestaña propia de Chrome o Edge: <a href="${esc(location.href)}" target="_blank" rel="noopener">abrir en otra pestaña</a>. Si tampoco funciona, descarga la carpeta de la app y abre <b>index.html</b> en Chrome. Mientras tanto puedes probar con «Probar sin equipo».</p></div>` : '';
    return `<div class="det-laptop">
      <div class="det-pasos">
        <h3>Qué necesitas</h3>
        <ol>
          <li>Una laptop con <b>Chrome o Edge</b>.</li>
          <li>Un <b>adaptador USB a RS-485</b> (o USB a RS-232, según el equipo). Cuesta poco y se consigue en tiendas de electrónica.</li>
          <li>Conectar el adaptador al puerto de comunicación del variador o del control: <b>A con A (D+), B con B (D−) y tierra con tierra</b>. Mira el perfil del equipo abajo.</li>
          <li>Elegir el equipo, pulsar <b>Conectar</b> y escoger el puerto del adaptador.</li>
        </ol>
        <p class="nota-rep">La app solo <b>lee</b>: nunca escribe ni cambia nada en el ascensor. Otis, Schindler y KONE usan protocolos cerrados con su propia herramienta: en esos equipos escribe el código que muestra su pantalla.</p>
      </div>
      ${aviso}
      <div class="det-fila">
        <label class="det-campo grande"><span>Equipo o modo</span><select id="cx-perfil">${perfiles().map(x => `<option value="${esc(x.id)}" ${x.id === p.id ? 'selected' : ''}>${esc(x.nombre)}</option>`).join('')}</select></label>
        <label class="det-campo"><span>Velocidad</span><select id="cx-baud">${[2400, 4800, 9600, 19200, 38400, 57600, 115200].map(b => `<option ${b === (CX.baud || p.baud) ? 'selected' : ''}>${b}</option>`).join('')}</select></label>
        <label class="det-campo"><span>Paridad</span><select id="cx-par">${[['none', 'Ninguna'], ['even', 'Par'], ['odd', 'Impar']].map(o => `<option value="${o[0]}" ${o[0] === (CX.par || p.paridad) ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></label>
        ${p.modo === 'modbus' ? `<label class="det-campo"><span>Esclavo</span><input id="cx-esc" type="number" min="1" max="247" value="${CX.esc || p.esclavo || 1}"></label>
        <label class="det-campo"><span>Registro de la falla (hex)</span><input id="cx-reg" value="${esc(CX.reg || p.registro || '0x0000')}" spellcheck="false"></label>` : ''}
        <label class="det-campo grande"><span>Explicar los códigos con</span><select id="cx-eq"><option value="todos">Todas las marcas</option>${equipos().filter(e => codigos().some(c => c.equipo === e.id)).map(e => `<option value="${esc(e.id)}" ${(CX.eq || p.equipo) === e.id ? 'selected' : ''}>${esc(e.marca)} · ${esc(e.nombre)}</option>`).join('')}</select></label>
      </div>
      ${p.nota ? `<p class="nota-rep">${esc(p.nota)}${p.fuente ? ' ' + enlace(p.fuente, 'Fuente') : ''}</p>` : ''}
      <div class="acciones">
        <button type="button" class="btn oro" data-cx="conectar">Conectar</button>
        <button type="button" class="btn sec" data-cx="desconectar">Desconectar</button>
        <button type="button" class="btn sec" data-cx="demo">Probar sin equipo</button>
      </div>
      <div class="det-pantalla" id="cx-pantalla" aria-live="polite"></div>
      <pre class="det-log" id="cx-log"></pre>
    </div>`;
  }
  function leerAjustes() {
    const v = id => { const e = $('#' + id); return e ? e.value : null; };
    CX.perfil = v('cx-perfil') || CX.perfil; CX.baud = Number(v('cx-baud')) || CX.baud; CX.par = v('cx-par') || CX.par;
    if ($('#cx-esc')) CX.esc = Number(v('cx-esc')) || 1;
    if ($('#cx-reg')) CX.reg = v('cx-reg');
    CX.eq = v('cx-eq') || CX.eq;
  }
  function pintarConexion() {
    const P = $('#cx-pantalla'); if (!P) return;
    const est = { desconectado: 'Sin conectar', conectando: 'Conectando…', conectado: CX.demo ? 'Modo demostración (datos de ejemplo)' : 'Conectado', error: 'Error' }[CX.estado];
    let h = `<p class="det-estado ${CX.estado}">${esc(est)}${CX.error ? ' · ' + esc(CX.error) : ''}</p>`;
    if (CX.ultimo) {
      const u = CX.ultimo;
      h += `<div class="det-lectura"><span>Falla actual</span><b>${esc(u.texto)}</b></div>`;
      if (u.codigos && u.codigos.length) h += u.codigos.slice(0, 3).map(htmlCodigo).join('');
      else if (u.valor) h += `<div class="aviso"><b>Código ${esc(u.texto)} sin explicación en la base.</b><p>Elige el equipo correcto en «Explicar los códigos con», o búscalo en el manual del equipo.</p></div>`;
      else h += `<div class="aviso ok"><b>El equipo no reporta falla.</b></div>`;
    }
    P.innerHTML = h;
    const L = $('#cx-log'); if (L) { L.textContent = CX.log.slice(-60).join('\n'); L.scrollTop = L.scrollHeight; L.hidden = !CX.log.length; }
  }
  function anotar(s) { CX.log.push(s); if (CX.log.length > 400) CX.log.splice(0, 100); }
  function explicar(valorTexto) {
    const filtro = CX.eq && CX.eq !== 'todos' ? (c => c.equipo === CX.eq) : null;
    return buscarCodigo(valorTexto, filtro).filter(c => coincide(c, valorTexto) >= 2);
  }

  // CRC de Modbus RTU
  function crc16(bytes) { let c = 0xFFFF; for (const b of bytes) { c ^= b; for (let i = 0; i < 8; i++) c = (c & 1) ? (c >>> 1) ^ 0xA001 : c >>> 1; } return c; }
  function pedido(esclavo, reg, cant) { const b = [esclavo, 0x03, (reg >> 8) & 255, reg & 255, (cant >> 8) & 255, cant & 255]; const c = crc16(b); b.push(c & 255, c >> 8); return new Uint8Array(b); }
  // una sola lectura continua del puerto llena CX.buf; así no se pierden bytes entre pedidos
  async function bomba() {
    CX.buf = [];
    while (CX.vivo) {
      try { const { value, done } = await CX.lector.read(); if (done) break; if (value) for (const b of value) CX.buf.push(b); if (CX.buf.length > 4096) CX.buf.splice(0, 2048); }
      catch (e) { anotar('Error de lectura: ' + e.message); break; }
    }
  }
  async function leerBytes(n, ms) {
    const fin = performance.now() + ms;
    while (performance.now() < fin) {
      if (CX.buf.length >= n) break;
      if (CX.buf.length >= 5 && (CX.buf[1] & 0x80)) break;   // respuesta de excepción
      await new Promise(res => setTimeout(res, 15));
    }
    return CX.buf.splice(0, Math.max(n, CX.buf.length));
  }
  async function cicloModbus() {
    const p = perfil(), esclavo = CX.esc || p.esclavo || 1, reg = parseInt(CX.reg || p.registro || '0', 16) || parseInt(CX.reg || '0', 10) || 0;
    CX.escritor = CX.port.writable.getWriter(); CX.lector = CX.port.readable.getReader(); bomba();
    anotar(`Leyendo registro 0x${reg.toString(16).toUpperCase().padStart(4, '0')} del esclavo ${esclavo} cada segundo (función 03, solo lectura).`);
    while (CX.vivo) {
      try {
        CX.buf.length = 0;
        await CX.escritor.write(pedido(esclavo, reg, 1));
        const r = await leerBytes(7, 600);
        if (r.length < 5) { anotar('Sin respuesta: revisa cables A/B, velocidad, paridad y número de esclavo.'); }
        else if (r[1] & 0x80) { anotar('El equipo respondió con error Modbus ' + r[2] + ': el registro no existe o no se puede leer.'); }
        else {
          const ok = crc16(r.slice(0, r.length - 2)) === (r[r.length - 2] | (r[r.length - 1] << 8));
          const val = (r[3] << 8) | r[4];
          anotar(`Respuesta ${ok ? '' : '(CRC malo) '}: ${val} (0x${val.toString(16).toUpperCase()})`);
          if (ok) mostrarValor(val, p);
        }
      } catch (e) { anotar('Error: ' + e.message); }
      pintarConexion();
      await new Promise(res => setTimeout(res, 1000));
    }
  }
  function mostrarValor(val, p) {
    const texto = val ? (p.formato ? p.formato.replace('{n}', String(val)).replace('{n2}', String(val).padStart(2, '0')) : String(val)) : '0';
    CX.ultimo = { valor: val, texto, codigos: val ? explicar(texto) : [] };
  }
  async function cicloTexto() {
    const dec = new TextDecoder(); let resto = '';
    CX.lector = CX.port.readable.getReader();
    anotar('Escuchando el puerto. Todo lo que mande el equipo aparece abajo.');
    while (CX.vivo) {
      try {
        const { value, done } = await CX.lector.read(); if (done) break;
        resto += dec.decode(value, { stream: true });
        const lineas = resto.split(/\r?\n/); resto = lineas.pop();
        lineas.forEach(l => {
          anotar(l);
          fichas(l).forEach(f => { const cs = explicar(f); if (cs.length) CX.ultimo = { valor: 1, texto: f, codigos: cs }; });
        });
        pintarConexion();
      } catch (e) { anotar('Error: ' + e.message); break; }
    }
  }
  async function conectar() {
    leerAjustes(); detenerDemo();
    const ps = permitido();
    if (ps !== 'ok') { CX.estado = 'error'; CX.error = ps === 'nosoporta' ? 'este navegador no tiene USB-serie' : 'el navegador bloquea el USB en esta vista'; pintarConexion(); return; }
    const p = perfil();
    try {
      CX.estado = 'conectando'; CX.error = ''; pintarConexion();
      CX.port = await navigator.serial.requestPort();
      await CX.port.open({ baudRate: CX.baud || p.baud || 9600, parity: CX.par || p.paridad || 'none', dataBits: p.bits || 8, stopBits: p.parada || 1 });
      CX.vivo = true; CX.estado = 'conectado'; CX.ultimo = null; pintarConexion();
      if (p.modo === 'modbus') cicloModbus(); else cicloTexto();
    } catch (e) {
      CX.estado = e && e.name === 'NotFoundError' ? 'desconectado' : 'error';
      CX.error = e && e.name === 'NotFoundError' ? '' : (e && e.name === 'SecurityError' ? 'el navegador bloquea el USB en esta vista' : (e && e.message) || 'no se pudo abrir el puerto');
      pintarConexion();
    }
  }
  async function desconectar() {
    detenerDemo(); CX.vivo = false;
    try { if (CX.lector) { await CX.lector.cancel(); CX.lector.releaseLock(); } } catch (e) { /* ya estaba cerrado */ }
    try { if (CX.escritor) CX.escritor.releaseLock(); } catch (e) { /* nada */ }
    try { if (CX.port) await CX.port.close(); } catch (e) { /* nada */ }
    CX.port = CX.lector = CX.escritor = null; CX.estado = 'desconectado'; CX.error = ''; pintarConexion();
  }
  // demostración: valores de ejemplo de la base, para ver cómo se usa sin equipo
  function iniciarDemo() {
    leerAjustes(); detenerDemo();
    const lista = codigos().filter(c => !CX.eq || CX.eq === 'todos' || c.equipo === CX.eq);
    if (!lista.length) { CX.estado = 'error'; CX.error = 'no hay códigos cargados para este equipo'; pintarConexion(); return; }
    let i = 0; CX.estado = 'conectado'; CX.log = ['MODO DEMOSTRACIÓN: estos datos son de ejemplo, no vienen de un ascensor.'];
    CX.demo = setInterval(() => {
      const c = lista[(i * 7) % lista.length], cero = i % 3 === 0; i++;
      anotar(cero ? 'Respuesta: 0 (sin falla)' : `Respuesta: ${c.codigo}`);
      CX.ultimo = cero ? { valor: 0, texto: '0', codigos: [] } : { valor: 1, texto: c.codigo, codigos: [c] };
      if (!$('#cx-pantalla')) { detenerDemo(); return; }
      pintarConexion();
    }, 2200);
    pintarConexion();
  }
  function detenerDemo() { if (CX.demo) { clearInterval(CX.demo); CX.demo = null; } }

  // ---------- eventos ----------
  raiz.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const d = b.dataset;
    if (d.dmodo) { D.modo = d.dmodo; if (D.modo !== 'laptop') detenerDemo(); pintar(); }
    else if (d.dmarca) { D.marca = d.dmarca; D.eq = 'todos'; pintar(); }
    else if (d.dop) {
      if (d.dop === '#codigo') { D.modo = 'codigo'; pintar(); const q = $('#det-q'); if (q) q.focus(); return; }
      D.camino.push(D.nodo); D.nodo = d.dop; pintar(); raiz.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    }
    else if (d.datras !== undefined) { D.nodo = D.camino.pop() || ASC.diagnostico.inicio; pintar(); }
    else if (d.dreinicio !== undefined) { D.camino = []; D.nodo = ASC.diagnostico.inicio; pintar(); }
    else if (d.cx === 'conectar') conectar();
    else if (d.cx === 'desconectar') desconectar();
    else if (d.cx === 'demo') iniciarDemo();
  });
  raiz.addEventListener('input', e => {
    if (e.target.id === 'det-q') { D.q = e.target.value; resultadosCodigo(); }
    else if (e.target.id === 'det-texto') { D.texto = e.target.value; resultadosTexto(); }
  });
  raiz.addEventListener('change', e => {
    if (e.target.id === 'det-eq') { D.eq = e.target.value; if (D.modo === 'codigo') resultadosCodigo(); else resultadosTexto(); }
    else if (e.target.id === 'cx-perfil') { leerAjustes(); const p = perfil(); CX.baud = p.baud; CX.par = p.paridad; CX.esc = p.esclavo; CX.reg = p.registro; CX.eq = p.equipo || CX.eq; pintar(); }
    else if (e.target.id && e.target.id.indexOf('cx-') === 0) leerAjustes();
  });
  if ('serial' in navigator && navigator.serial.addEventListener) navigator.serial.addEventListener('disconnect', () => { if (CX.port) desconectar(); });

  raiz.hidden = false;
  pintar();
  ASC.deteccion = { buscar: buscarCodigo, fichas, crc16, pedido };   // para pruebas
})();
