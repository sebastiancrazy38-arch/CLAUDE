/* Taller de Ascensores — videos explicativos: «cómo funciona» y «cómo falla» cada pieza.
   No son archivos de video: cada escena se dibuja en un canvas 2D con los colores de la página,
   con subtítulos sincronizados y, si se pide, narración con la voz del navegador.
   Escenas propias para las piezas clave; el resto usa escenas tipo (serie, guiado, puerta, mapa)
   con los textos de su ficha. */
(function () {
  'use strict';
  var ASC = window.ASC;
  var W = 640, H = 360, PI = Math.PI, TAU = PI * 2;
  var g = null, P = {};   // contexto y paleta del cuadro que se está dibujando
  var V = ASC.video = { escenas: {}, de: {} };

  // ---------- utilidades de tiempo ----------
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ph(t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = cl((t - a) / (b - a)); return x * x * (3 - 2 * x); }
  function mix(a, b, k) { return a + (b - a) * k; }
  function kf(t, a) {   // claves [[t, v], ...] con paso suave entre una y otra
    if (t <= a[0][0]) return a[0][1];
    for (var i = 1; i < a.length; i++) if (t <= a[i][0]) return mix(a[i - 1][1], a[i][1], ph(t, a[i - 1][0], a[i][0]));
    return a[a.length - 1][1];
  }
  function integ(fn, t) { var s = 0, dt = 0.04; for (var x = 0; x < t; x += dt) { var d = Math.min(dt, t - x); s += fn(x + d / 2) * d; } return s; }
  function entre(t, a, b) { return t >= a && t < b; }
  function late(t, f) { return 0.5 + 0.5 * Math.sin(t * TAU * (f || 1.5)); }
  function ruido(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }

  // ---------- paleta: sale de las variables CSS de la página ----------
  function paleta(el) {
    var cs = getComputedStyle(el), v = function (n, d) { return (cs.getPropertyValue(n) || '').trim() || d; };
    var bg = v('--bg', '#e7eaec'), osc = luz(bg) < 0.4;
    P = {
      a: v('--escena-a', '#dde3e7'), b: v('--escena-b', '#c3ccd3'), tinta: v('--tinta', '#15202a'), tinta2: v('--tinta2', '#4c5a67'),
      linea: v('--linea', '#c6ced5'), acento: v('--acento', '#f2b705'), mal: v('--mal', '#bd3329'), ok: v('--ok', '#1a7a4b'), azul: v('--azul', '#0c5aa3'),
      placa: v('--placa', '#1b262f'), placaT: v('--placa-tinta', '#eef2f5'), sup: v('--sup', '#f4f6f7'), sup2: v('--sup2', '#ffffff'),
      ft: v('--f-titulo', 'sans-serif'), fd: v('--f-dato', 'monospace'), osc: osc,
      muro: osc ? '#26323c' : '#cfd5da', muro2: osc ? '#1d2830' : '#b9c1c8', interior: osc ? '#0d1318' : '#9aa4ad',
      acero: osc ? '#8d98a3' : '#9ea9b3', aceroOsc: osc ? '#56626d' : '#5f6a75', hierro: osc ? '#2f363d' : '#3b424a', inox: osc ? '#a9b3bc' : '#d3d9de',
      cobre: '#c27a3a', goma: '#25292e', aceite: '#c99228', pcb: osc ? '#1f5b43' : '#2d7656', rayo: '#ff3b30', rojo: '#e5483b', verde: '#3ccf7f',
      fase: ['#f2b705', '#3b8fe0', '#e5483b'], txtPlaca: '#9fb0bf'
    };
  }
  function luz(c) {
    var m = /^#?([0-9a-f]{6})$/i.exec(c); if (!m) return 1;
    var n = parseInt(m[1], 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  }

  // ---------- dibujo ----------
  function camino(x, y, w, h, r) {
    r = Math.max(0, Math.min(r || 0, Math.abs(w) / 2, Math.abs(h) / 2));
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  function rr(x, y, w, h, r, f, s, lw) { camino(x, y, w, h, r); if (f) { g.fillStyle = f; g.fill(); } if (s) { g.strokeStyle = s; g.lineWidth = lw || 2; g.stroke(); } }
  function ln(p, s, lw, dash, off) {
    g.beginPath(); g.moveTo(p[0], p[1]); for (var i = 2; i < p.length; i += 2) g.lineTo(p[i], p[i + 1]);
    g.strokeStyle = s; g.lineWidth = lw || 2; g.lineCap = 'round'; g.lineJoin = 'round';
    if (dash) { g.setLineDash(dash); g.lineDashOffset = off || 0; }
    g.stroke(); if (dash) g.setLineDash([]);
  }
  function cr(x, y, r, f, s, lw) { g.beginPath(); g.arc(x, y, Math.max(0.1, r), 0, TAU); if (f) { g.fillStyle = f; g.fill(); } if (s) { g.strokeStyle = s; g.lineWidth = lw || 2; g.stroke(); } }
  function arco(x, y, r, a0, a1, s, lw, dash, off) { g.beginPath(); g.arc(x, y, r, a0, a1); g.strokeStyle = s; g.lineWidth = lw || 2; if (dash) { g.setLineDash(dash); g.lineDashOffset = off || 0; } g.stroke(); if (dash) g.setLineDash([]); }
  function tx(s, x, y, o) {
    o = o || {};
    g.font = (o.w || 600) + ' ' + (o.t || 18) + 'px ' + (o.m ? P.fd : P.ft);
    g.fillStyle = o.c || P.tinta; g.textAlign = o.al || 'left'; g.textBaseline = o.bl || 'middle';
    g.fillText(s, x, y);
  }
  function placa(s, x, y, o) {   // texto sobre placa oscura; al = 'left' | 'center' | 'right'
    o = o || {};
    g.font = '600 ' + (o.t || 17) + 'px ' + P.ft;
    var w = g.measureText(s).width + 14, h = (o.t || 17) + 9, bx = o.al === 'right' ? x - w : o.al === 'center' ? x - w / 2 : x;
    bx = Math.max(4, Math.min(W - w - 4, bx));   // que la placa no se salga del cuadro
    rr(bx, y - h / 2, w, h, 2, o.f || P.placa);
    if (o.borde) rr(bx, y - h / 2, 4, h, 0, o.borde);
    tx(s, bx + 7 + (o.borde ? 2 : 0), y + 1, { c: o.c || P.placaT, t: o.t || 17 });
    return w;
  }
  function rotulo(s, x, y, lx, ly) {   // línea amarilla de la pieza a su nombre, como en el taller 3D
    ln([x, y, lx, ly], P.acento, 2); cr(x, y, 3.5, P.acento);
    placa(s, lx, ly, { al: lx >= x ? 'left' : 'right' });
  }
  function flecha(x1, y1, x2, y2, c, lw) {
    var a = Math.atan2(y2 - y1, x2 - x1), L = 10 + (lw || 3);
    ln([x1, y1, x2 - Math.cos(a) * L * 0.6, y2 - Math.sin(a) * L * 0.6], c, lw || 3);
    g.beginPath(); g.moveTo(x2, y2); g.lineTo(x2 - L * Math.cos(a - 0.45), y2 - L * Math.sin(a - 0.45)); g.lineTo(x2 - L * Math.cos(a + 0.45), y2 - L * Math.sin(a + 0.45)); g.closePath();
    g.fillStyle = c; g.fill();
  }
  function resorte(x1, y1, x2, y2, n, amp, c, lw) {
    var dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, p = [x1, y1];
    for (var i = 1; i < n * 2; i++) { var k = i / (n * 2), s = i % 2 ? amp : -amp; p.push(x1 + dx * k + nx * s, y1 + dy * k + ny * s); }
    p.push(x2, y2); ln(p, c || P.aceroOsc, lw || 2.5);
  }
  function polea(x, y, r, ang, cuerpo, borde) {
    cr(x, y, r, cuerpo || P.acero, borde || P.hierro, 2.5);
    for (var i = 0; i < 4; i++) { var a = ang + i * PI / 2; ln([x + Math.cos(a) * r * 0.22, y + Math.sin(a) * r * 0.22, x + Math.cos(a) * r * 0.82, y + Math.sin(a) * r * 0.82], borde || P.hierro, 2.5); }
    cr(x, y, Math.max(2, r * 0.18), borde || P.hierro);
  }
  function led(x, y, on, c, r) { r = r || 6; if (on) { g.globalAlpha = 0.28; cr(x, y, r * 2.1, c); g.globalAlpha = 1; } cr(x, y, r, on ? c : P.aceroOsc, P.hierro, 1.5); }
  function cruz(x, y, s, c) { ln([x - s, y - s, x + s, y + s], c || P.rayo, 4); ln([x + s, y - s, x - s, y + s], c || P.rayo, 4); }
  function chispas(x, y, t, n, r) {
    for (var i = 0; i < (n || 8); i++) {
      var a = ruido(i + Math.floor(t * 14) * 13) * TAU, l = (r || 16) * (0.4 + ruido(i * 7 + Math.floor(t * 14)) * 0.8);
      ln([x, y, x + Math.cos(a) * l, y + Math.sin(a) * l], i % 2 ? P.acento : '#ff8a3d', 2);
    }
  }
  function persona(x, piso, alto, c, alfa) {
    g.globalAlpha = alfa == null ? 1 : alfa; c = c || P.tinta2;
    var cab = alto * 0.12;
    cr(x, piso - alto + cab, cab, c);
    rr(x - alto * 0.15, piso - alto + cab * 2.2, alto * 0.3, alto * 0.48, alto * 0.08, c);
    rr(x - alto * 0.12, piso - alto * 0.32, alto * 0.1, alto * 0.32, 3, c); rr(x + alto * 0.02, piso - alto * 0.32, alto * 0.1, alto * 0.32, 3, c);
    g.globalAlpha = 1;
  }
  function tabla(x, y, w, filas) {   // panel de estado tipo display del tablero
    var h = 12 + filas.length * 24;
    rr(x, y, w, h, 3, P.placa);
    filas.forEach(function (f, i) {
      var yy = y + 18 + i * 24, col = f[2] === 'mal' ? '#ff6b5e' : f[2] === 'ok' ? '#4cd68f' : f[2] === 'ac' ? '#ffc62b' : P.placaT;
      tx(f[0], x + 9, yy, { c: P.txtPlaca, t: 12, m: 1, w: 500 });
      tx(f[1], x + w - 9, yy, { c: col, t: 13, m: 1, w: 500, al: 'right' });
    });
    return h;
  }
  function ondas(x, y, t, c, dir) {
    for (var i = 0; i < 3; i++) { var k = (t * 1.6 + i / 3) % 1; g.globalAlpha = 1 - k; arco(x, y, 8 + k * 22, (dir || 0) - 0.7, (dir || 0) + 0.7, c || P.tinta2, 2.5); }
    g.globalAlpha = 1;
  }
  function foco(x, y, r, t) { var k = (t * 0.9) % 1; g.globalAlpha = 0.85 * (1 - k); cr(x, y, r * (0.85 + 0.5 * k), null, P.acento, 3); g.globalAlpha = 1; }
  function alerta(x, y, r, t) { g.globalAlpha = 0.35 + 0.45 * late(t, 2); cr(x, y, r, null, P.rayo, 4); g.globalAlpha = 1; }
  function mancha(x, y, r, a) { g.globalAlpha = a == null ? 0.85 : a; cr(x, y, r, '#6b4a22'); cr(x + r * 0.5, y - r * 0.3, r * 0.6, '#7d5a2c'); g.globalAlpha = 1; }
  function termometro(x, y, k) {
    rr(x - 6, y - 50, 12, 50, 6, P.sup2, P.tinta2, 2); cr(x, y + 4, 10, k > 0.7 ? P.rayo : P.acento, P.tinta2, 2);
    rr(x - 3, y - 46 + 46 * (1 - k), 6, 46 * k + 4, 3, k > 0.7 ? P.rayo : P.acento);
  }
  function fondo() {
    var gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, P.a); gr.addColorStop(1, P.b);
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
  }
  function estado(s, x, y, malo) { placa(s, x, y, { al: 'center', borde: malo ? P.rayo : P.verde, t: 15 }); }

  /* =================================================================
     ESCENAS PROPIAS. Cada capítulo: { dur, subt: [[t, texto]], dib(t, k) }.
     k.foco = id de la pieza que se está viendo (para marcarla).
     ================================================================= */
  function esc(id, d) { V.escenas[id] = d; }

  // ---------- cortina luminosa ----------
  function dibCortina(t, a, persona_, sucio, limpio, estadoP) {
    var c = 320, xeL = c - 140 * a, xeR = c + 140 * a, y0 = 40, y1 = 330;
    rr(180, y0, 280, y1 - y0, 0, P.interior);
    rr(xeL - 140, y0, 140, y1 - y0, 0, P.inox, P.aceroOsc, 1.5); rr(xeR, y0, 140, y1 - y0, 0, P.inox, P.aceroOsc, 1.5);
    rr(xeL - 7, y0 + 10, 7, y1 - y0 - 20, 2, P.goma); rr(xeR, y0 + 10, 7, y1 - y0 - 20, 2, P.goma);
    var pp = persona_, cortados = 0;
    if (pp && pp.al > 0.02) persona(pp.x, y1, 214, P.tinta2, pp.al);
    for (var i = 0; i < 14; i++) {
      var y = 60 + i * 19, fin = xeR, roto = false;
      if (pp && pp.al > 0.5 && y > y1 - 214 && pp.x + 26 > xeL && pp.x - 26 < xeR) { fin = Math.max(xeL, pp.x - 26); roto = true; }
      if (sucio && i === 4 && !limpio) roto = true;
      if (roto) cortados++;
      if (xeR - xeL < 4) continue;
      g.globalAlpha = 0.85; ln([xeL, y, fin, y], P.rayo, 2); g.globalAlpha = 0.25; ln([xeL, y, fin, y], P.rayo, 6); g.globalAlpha = 1;
      if (roto && fin < xeR) { g.globalAlpha = 0.25; ln([fin, y, xeR, y], P.rayo, 1, [3, 5]); g.globalAlpha = 1; }
    }
    if (sucio) { mancha(xeR + 4, 136, 9, limpio ? 1 - limpio : 0.9); if (!limpio || limpio < 1) cruz(xeR + 18, 136, 6); }
    for (i = 0; i < 6; i++) led(xeR + 3.5, 66 + i * 50, true, cortados ? P.rayo : P.verde, 2.5);
    g.globalAlpha = 0.55; rr(0, 0, 180, H, 0, P.muro); rr(460, 0, 180, H, 0, P.muro); g.globalAlpha = 1;
    rr(170, y0 - 14, 300, 14, 0, P.aceroOsc); rr(170, y1, 300, 8, 0, P.acero);
    tabla(12, 48, 156, [['RAYOS', cortados ? cortados + ' CORTADO' + (cortados > 1 ? 'S' : '') : '14/14', cortados ? 'mal' : 'ok'], ['PUERTA', estadoP[0], estadoP[1] || '']]);
    return { xeL: xeL, xeR: xeR, cortados: cortados };
  }
  esc('cortina', {
    funciona: {
      dur: 18,
      subt: [[0, 'La cortina luminosa son dos regletas en los cantos de la puerta de cabina: una emite rayos infrarrojos (TX) y la otra los recibe (RX).'],
        [3, 'Mientras la puerta cierra, el receptor revisa muchas veces por segundo que le lleguen todos los rayos.'],
        [5.8, 'Si algo corta aunque sea un rayo, la cortina avisa al operador y la puerta reabre sin tocar a la persona.'],
        [8.5, 'Cuando todos los rayos vuelven, la puerta espera unos segundos con la vía libre…'],
        [11.5, '…y vuelve a cerrar. Con la puerta de cabina cerrada se cierra su contacto y el ascensor ya puede viajar.']],
      dib: function (t) {
        var a = kf(t, [[0, 1], [3, 1], [6, 0.55], [7.3, 1], [11.5, 1], [15, 0], [18, 0]]);
        var pp = { x: kf(t, [[4.5, 600], [6.6, 330], [8.4, 330], [10.2, 250]]), al: t < 4.5 ? 0 : kf(t, [[9.6, 1], [10.4, 0]]) };
        var st = t < 3 ? ['ABIERTA', 'ok'] : t < 6 ? ['CERRANDO', 'ac'] : t < 7.3 ? ['REABRE', 'mal'] : t < 11.5 ? ['ESPERA', 'ac'] : t < 15 ? ['CERRANDO', 'ac'] : ['CERRADA', 'ok'];
        var r = dibCortina(t, a, pp, false, 0, st);
        if (t < 3) { rotulo('Emisor TX', r.xeL - 4, 100, 200, 130); rotulo('Receptor RX', r.xeR + 4, 100, 470, 130); }
        if (entre(t, 6, 7.4)) flecha(r.xeL - 30, 250, r.xeL - 80, 250, P.acento, 4), flecha(r.xeR + 30, 250, r.xeR + 80, 250, P.acento, 4);
        if (entre(t, 8.5, 11.5)) placa(Math.ceil(11.5 - t) + ' s', 320, 20, { al: 'center' });
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Falla típica: polvo, grasa o un golpe en una regleta. Un rayo queda cortado todo el tiempo, aunque no haya nadie.'],
        [3, 'La cortina cree que hay alguien: la puerta cierra, reabre, cierra, reabre… y el ascensor no sale del piso.'],
        [11.6, 'Muchos tableros, después de varios intentos, cierran despacio y con zumbido (nudging). Otros dejan la puerta abierta y el ascensor fuera de servicio.'],
        [16, 'Se revisa: limpiar las lentes, mirar los LED de cada regleta, el cable que sube por la puerta (se pela de tanto doblarse) y su conector en la caja del techo.']],
      dib: function (t) {
        var a = kf(t, [[0, 1], [3, 1], [5, 0.6], [6.2, 1], [7.4, 1], [9.2, 0.6], [10.4, 1], [11.6, 1], [16, 0], [20, 0]]);
        var limpio = ph(t, 16.6, 17.8);
        var st = t < 3 ? ['ABIERTA', ''] : t < 11.6 ? (a < 0.99 && (entre(t, 3, 5) || entre(t, 7.4, 9.2)) ? ['CERRANDO', 'ac'] : ['REABRE', 'mal']) : t < 16 ? ['FORZADO', 'mal'] : ['CERRADA', 'ok'];
        var r = dibCortina(t, a, null, true, limpio, st);
        if (t < 3) rotulo('Regleta sucia', r.xeR + 10, 136, 470, 100);
        if (entre(t, 11.6, 16)) { ondas(r.xeL + 40, 200, t, P.rayo, 0); ondas(r.xeR - 40, 200, t, P.rayo, PI); placa('Cierre forzado con zumbido', 320, 20, { al: 'center', f: P.mal }); }
        if (entre(t, 16, 18.2)) { var yy = 136 + Math.sin(t * 9) * 10; rr(r.xeR + 8, yy - 14, 26, 28, 4, P.azul); }
      }
    }
  });

  // ---------- freno y sus microswitches ----------
  function dibFreno(o) {
    var cx = 220, cy = 190, R = 62, dL = o.dL, dR = o.dR;
    rr(96, 300, 248, 16, 2, P.hierro);
    cr(cx, cy, R, P.acero, P.hierro, 3);
    for (var i = 0; i < 6; i++) { var a = o.ang + i * PI / 3; ln([cx + Math.cos(a) * 14, cy + Math.sin(a) * 14, cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8)], P.aceroOsc, 3); }
    cr(cx, cy, 14, P.hierro);
    var forro = o.gastado ? 4 : 9;
    [[-1, dL], [1, dR]].forEach(function (q) {
      var s = q[0], d = q[1], ax = cx + s * (R + 22) + s * d;
      arco(cx + s * d, cy, R + 2 + forro / 2, s < 0 ? PI - 0.7 : -0.7, s < 0 ? PI + 0.7 : 0.7, '#6d5a43', forro);
      if (o.gastado) { g.globalAlpha = 0.6; cr(cx + s * (R + 6 + d), cy + 18, 6, P.aceite); g.globalAlpha = 1; }
      rr(ax - 8, 70, 16, 232, 3, P.aceroOsc, P.hierro, 1.5);
      ln([ax, cy - 30, cx + s * (R + 8 + d), cy - 30], P.aceroOsc, 6); ln([ax, cy + 30, cx + s * (R + 8 + d), cy + 30], P.aceroOsc, 6);
      rr(cx + s * 150 - 8, 74, 16, 32, 2, P.hierro);
      resorte(cx + s * 150, 90, ax - s * 8, 90, 6, 7, P.cobre, 3);
      ln([cx + s * 40, 60, ax, 76], P.hierro, 4);
    });
    rr(cx - 40, 40, 80, 38, 4, o.bobina ? P.acento : P.aceroOsc, P.hierro, 2);
    if (o.bobina) { g.globalAlpha = 0.3; rr(cx - 50, 30, 100, 58, 8, P.acento); g.globalAlpha = 1; }
    tx('BOBINA', cx, 59, { al: 'center', t: 14, c: o.bobina ? '#1c1600' : P.placaT });
    // microswitches: el izquierdo puede estar desajustado (más lejos de su brazo)
    [[-1, dL, o.microL, o.desajL], [1, dR, o.microR, false]].forEach(function (q) {
      var s = q[0], ax = cx + s * (R + 22) + s * q[1], mx = cx + s * (R + 22) + s * (q[3] ? 44 : 34), my = 150;
      rr(mx - (s < 0 ? 26 : 0), my - 12, 26, 24, 3, P.goma, P.hierro, 1.5);
      var punta = s < 0 ? Math.max(mx + 2, ax - 8) : Math.min(mx - 2, ax + 8);
      ln([mx, my, punta, my + (q[2] ? -9 : 0)], P.acero, 3);
      led(mx + s * -13, my - 22, true, q[2] ? P.acento : P.verde, 4);
    });
  }
  function filasFreno(o) {
    return [['BOBINA', o.bobina ? 'ENERGIZADA' : 'SIN TENSIÓN', o.bobina ? 'ac' : ''], ['MICRO IZQ.', o.microL ? 'ABIERTO' : 'CERRADO', o.microL ? 'ac' : 'ok'],
      ['MICRO DER.', o.microR ? 'ABIERTO' : 'CERRADO', o.microR ? 'ac' : 'ok'], ['MOTOR', o.motor, o.motorE || ''], ['TABLERO', o.tab, o.tabE || 'ok']];
  }
  esc('freno', {
    funciona: {
      dur: 17,
      subt: [[0, 'Sin corriente, los resortes aprietan las zapatas contra el tambor: el freno de un ascensor está cerrado siempre que no se le da energía.'],
        [3, 'Para viajar, el tablero energiza la bobina: el electroimán vence a los resortes y separa las dos zapatas.'],
        [5, 'Cada zapata mueve la palanca de su microswitch. El tablero espera que los dos confirmen que el freno abrió antes de darle fuerza al motor.'],
        [10.5, 'Al llegar al piso, el motor detiene la cabina y se corta la bobina: los resortes cierran el freno y los micros vuelven a su posición.'],
        [14, 'Si un micro no cambia cuando debe, el tablero bloquea el ascensor. Estos micros no van en la serie: el tablero los lee aparte.']],
      dib: function (t, k) {
        var d = kf(t, [[0, 0], [3, 0], [4, 10], [10.6, 10], [11.6, 0]]), on = entre(t, 3, 11);
        var w = kf(t, [[0, 0], [5, 0], [6, 3], [9.4, 3], [10.5, 0]]);
        var o = { dL: d, dR: d, bobina: on, microL: d > 5, microR: d > 5, ang: integ(function (x) { return kf(x, [[0, 0], [5, 0], [6, 3], [9.4, 3], [10.5, 0]]); }, t),
          motor: w > 0.05 ? 'GIRANDO' : 'PARADO', motorE: w > 0.05 ? 'ac' : '', tab: t < 3 ? 'EN ESPERA' : t < 5 ? 'ESPERA MICROS' : t < 10.5 ? 'VIAJE OK' : 'PARADA OK' };
        dibFreno(o); tabla(400, 40, 226, filasFreno(o));
        if (t < 3) { rotulo('Zapata', 140, 190, 30, 250); rotulo('Resorte', 110, 90, 30, 30); }
        if (entre(t, 5, 8)) { foco(108, 150, 18, t); foco(332, 150, 18, t); }
        if (k.foco === 'micro_freno' && t >= 8) { foco(108, 150, 18, t); foco(332, 150, 18, t); }
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Falla 1: micro desajustado. La zapata abre bien, pero su palanca ya no alcanza a mover el microswitch.'],
        [3.6, 'El tablero no recibe la confirmación: corta, marca error de freno y deja el ascensor fuera de servicio, aunque el freno esté bien.'],
        [9, 'Falla 2: forros gastados o con aceite. El freno cierra pero patina: la cabina no queda quieta o se pasa del piso.'],
        [16, 'Se revisa: desgaste de los forros, recorrido de la bobina, ajuste de cada micro y que no haya aceite en el tambor. El freno lo ajusta solo el técnico, con la cabina vacía y asegurada.']],
      dib: function (t) {
        var o;
        if (t < 9) {
          var d = kf(t, [[0, 0], [2.5, 0], [3.5, 10], [6, 10], [7, 0]]), err = t > 4.2;
          o = { dL: d, dR: d, bobina: entre(t, 2.5, 6), microL: false, microR: d > 5, desajL: true, ang: 0, motor: err ? 'NO ARRANCA' : 'PARADO', motorE: err ? 'mal' : '', tab: err ? 'ERROR FRENO' : 'ESPERA MICROS', tabE: err ? 'mal' : 'ac' };
          dibFreno(o); tabla(400, 40, 226, filasFreno(o));
          alerta(96, 150, 24, t); if (t < 3.6) rotulo('No llega', 70, 140, 30, 60);
        } else {
          var w = kf(t, [[9, 3], [10, 3], [14, 0.2], [15, 0]]);
          o = { dL: 0, dR: 0, bobina: false, microL: false, microR: false, gastado: true, ang: integ(function (x) { return x < 9 ? 0 : kf(x, [[9, 3], [10, 3], [14, 0.2], [15, 0]]); }, t),
            motor: 'SIN FUERZA', tab: w > 0.3 ? 'FRENO PATINA' : 'PASADA DE PISO', tabE: 'mal' };
          dibFreno(o); tabla(400, 40, 226, filasFreno(o));
          if (w > 0.3) flecha(220 + 70, 120, 220 + 90, 160, P.rayo, 4);
          // la cabina se pasa del nivel
          var off = kf(t, [[9, 0], [14, 26]]);
          rr(430, 190, 190, 140, 3, P.sup2, P.linea, 1.5); ln([440, 280, 610, 280], P.tinta2, 2, [6, 4]); tx('nivel del piso', 440, 204, { t: 13, c: P.tinta2 });
          rr(490, 210 + off, 70, 70, 3, P.inox, P.aceroOsc, 2);
          if (off > 6) { tx('+' + Math.round(off / 6.5) + ' cm', 572, 290, { t: 16, c: P.rayo, w: 700 }); }
        }
      }
    }
  });

  // ---------- tracción: polea, cables y contrapeso ----------
  function dibTraccion(o) {
    var px = 250, py = 70, R = 46, cab = o.cab, cp = 360 - cab;
    rr(140, 10, 180, 345, 0, null, P.linea, 2);
    [216, 336].forEach(function (y, i) { ln([120, y, 140, y], P.tinta2, 3); tx('P' + (2 - i), 112, y, { al: 'right', t: 15, c: P.tinta2 }); });
    rr(160, 46, 44, 48, 4, P.aceroOsc, P.hierro, 2); tx('M', 182, 71, { al: 'center', c: P.placaT, t: 16 });
    polea(px, py, R, o.ang, P.acero, P.hierro);
    var xs = o.tres ? [-6, 0, 6] : [0];
    xs.forEach(function (dx, i) {
      var flojo = o.tres && i === 1 ? o.flojo || 0 : 0, lx = 204 + dx, rx = 296 + dx;
      if (flojo) { g.beginPath(); g.moveTo(lx, py); g.quadraticCurveTo(lx - flojo, (py + cab) / 2, lx, cab); g.strokeStyle = P.hierro; g.lineWidth = 3; g.stroke(); }
      else ln([lx, py, lx, cab], P.hierro, 3, [9, 7], o.offC);
      ln([rx, py, rx, cp], P.hierro, 3, [9, 7], o.offP);
    });
    arco(px, py, R + 1, PI, TAU, P.hierro, 3, [9, 7], o.offA);
    rr(150, cab, 108, 96, 3, P.inox, P.aceroOsc, 2); rr(170, cab + 16, 68, 70, 2, P.interior);
    rr(282, cp, 28, 70, 2, P.aceroOsc, P.hierro, 2); for (var i = 1; i < 6; i++) ln([284, cp + i * 11.5, 308, cp + i * 11.5], P.hierro, 1.5);
    if (o.tres) { [-6, 0, 6].forEach(function (dx, i) { resorte(204 + dx, cab - 14, 204 + dx, cab, 3, 3, P.cobre, 2); }); }
    return { cab: cab, cp: cp };
  }
  function insetCanal(x, y, prof, cuerda) {
    g.save(); camino(x - 90, y - 70, 180, 140, 6); g.clip();
    rr(x - 90, y - 70, 180, 140, 0, P.sup2);
    g.beginPath(); g.moveTo(x - 90, y + 70); g.lineTo(x - 90, y - 30); g.lineTo(x - 30, y - 30); g.lineTo(x - 22, y - 30 + 10 + prof * 0.4);
    g.arc(x, y - 30 + 22 + prof, 22, PI, 0, true); g.lineTo(x + 30, y - 30); g.lineTo(x + 90, y - 30); g.lineTo(x + 90, y + 70); g.closePath();
    g.fillStyle = P.acero; g.fill(); g.strokeStyle = P.hierro; g.lineWidth = 2; g.stroke();
    if (cuerda) { var ry = y - 7 + prof; cr(x, ry, 19, P.hierro); for (var i = 0; i < 6; i++) { var a = i * PI / 3; cr(x + Math.cos(a) * 9, ry + Math.sin(a) * 9, 6, P.aceroOsc, P.hierro, 1); } cr(x, ry, 5, P.aceroOsc); }
    g.restore(); rr(x - 90, y - 70, 180, 140, 6, null, P.tinta2, 2);
  }
  function cableCerca(x, y, t, rotos) {
    rr(x - 110, y - 70, 220, 140, 6, P.sup2, P.tinta2, 2);
    rr(x - 100, y - 16, 200, 32, 14, P.aceroOsc, P.hierro, 2);
    for (var i = -10; i < 12; i++) ln([x + i * 10 - 8, y + 14, x + i * 10 + 8, y - 14], P.hierro, 2);
    if (rotos) for (i = 0; i < 4; i++) { var xx = x - 50 + i * 30; ln([xx, y - 14, xx + 8, y - 30 - ruido(i) * 8], P.rayo, 2.5); ln([xx + 4, y + 14, xx - 4, y + 28 + ruido(i + 3) * 8], P.rayo, 2.5); }
    tx(rotos ? 'hilos rotos' : 'cable sano', x, y + 50, { al: 'center', t: 16, c: rotos ? P.rayo : P.tinta2 });
  }
  esc('traccion', {
    funciona: {
      dur: 16,
      subt: [[0, 'La máquina no enrolla los cables como un winche: los cables abrazan la polea y se mueven por adherencia, como una faja en su polea.'],
        [4, 'Cuando la polea gira, arrastra a los cables: la cabina sube de un lado y el contrapeso baja del otro.'],
        [8.5, 'El contrapeso pesa lo que la cabina más cerca de la mitad de la carga. Así el motor solo mueve la diferencia.'],
        [12, 'Todo depende del roce entre cable y canal: por eso los cables y la polea se gastan juntos.']],
      dib: function (t, k) {
        var cab = kf(t, [[0, 240], [4, 240], [8.5, 120], [12, 120], [15.5, 240]]);
        var r = dibTraccion({ cab: cab, ang: (240 - cab) / 46, offC: cab, offP: -cab, offA: cab });
        insetCanal(520, 110, 0, true); tx('Canal de la polea', 520, 196, { al: 'center', t: 16, c: P.tinta2 });
        if (t > 8.5) { rr(430, 236, 190, 104, 4, P.sup2, P.linea, 1.5); tx('Cabina + ½ carga', 525, 262, { al: 'center', t: 18 }); tx('≈', 525, 288, { al: 'center', t: 24, c: P.acento }); tx('Contrapeso', 525, 316, { al: 'center', t: 18 }); }
        if (t < 4) { rotulo('Polea de tracción', 250, 70, 330, 30); rotulo('Contrapeso', 296, r.cp + 30, 340, r.cp + 40); }
        var f = { polea_traccion: [250, 70, 54], contrapeso: [296, r.cp + 35, 42], amarres: [204, cab - 6, 18], cables_traccion: [204, (70 + cab) / 2, 24], maquina: [182, 70, 34] }[k.foco];
        if (f && t >= 4) foco(f[0], f[1], f[2], t);
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Los cables se gastan: hilos rotos, menos diámetro, óxido. El técnico los mide con calibrador y cuenta los hilos rotos en cada tramo.'],
        [6, 'Con el canal gastado el cable se hunde y patina: la polea gira pero la cabina no la sigue. No para a nivel y el tablero da error de posición.'],
        [12, 'Si los cables no tienen la misma tensión, uno trabaja más y gasta su canal más rápido. Se igualan con las tuercas de los amarres.'],
        [17, 'Cables y polea se cambian juntos: un cable nuevo en un canal gastado dura muy poco.']],
      dib: function (t) {
        if (t < 6) { dibTraccion({ cab: 240, ang: 0, offC: 240, offP: -240, offA: 240 }); cableCerca(520, 140, t, t > 1.5); return; }
        if (t < 12) {
          var cab = kf(t, [[6, 240], [11.5, 205]]), ang = integ(function (x) { return x < 6 ? 0 : kf(x, [[6, 0], [7, 4], [11, 4], [11.6, 0]]); }, t);
          dibTraccion({ cab: cab, ang: ang, offC: cab, offP: -cab, offA: cab });
          insetCanal(520, 110, 20, true); tx('canal gastado', 520, 196, { al: 'center', t: 16, c: P.rayo });
          if (t > 7) { placa('PATINA', 250, 140, { al: 'center', f: P.mal }); }
          if (t > 10) { ln([150, 216, 258, 216], P.rayo, 2, [5, 4]); tx('−4 cm', 266, 214, { t: 16, c: P.rayo, w: 700 }); }
          return;
        }
        dibTraccion({ cab: 200, ang: 0, offC: 200, offP: -200, offA: 200, tres: true, flojo: kf(t, [[12, 0], [13, 14]]) });
        if (t < 17) rotulo('Cable flojo', 196, 135, 40, 135);
        rr(430, 70, 190, 100, 4, P.sup2, P.linea, 1.5); tx('Resortes de amarre', 525, 92, { al: 'center', t: 16, c: P.tinta2 });
        [470, 525, 580].forEach(function (x, i) { resorte(x, 110, x, i === 1 ? 152 : 140, 5, 7, i === 1 ? P.rayo : P.cobre, 3); });
      }
    }
  });

  // ---------- motor (máquina) ----------
  function dibMotor(t, o) {
    var cx = 330, cy = 180;
    rr(16, 96, 160, 168, 6, P.placa); tx('VARIADOR', 96, 116, { al: 'center', c: P.placaT, t: 16 });
    for (var f = 0; f < 3; f++) {
      var p = [];
      for (var x = 0; x <= 130; x += 4) p.push(30 + x, 186 + Math.sin(x / 130 * TAU * 2 - o.fase - f * TAU / 3) * 34 * o.amp);
      ln(p, P.fase[f], 2.5);
    }
    for (f = 0; f < 3; f++) ln([176, 160 + f * 20, 216, 160 + f * 20], P.fase[f], 3);
    cr(cx, cy, 112, P.aceroOsc, P.hierro, 3); cr(cx, cy, 76, P.interior);
    for (var i = 0; i < 6; i++) {
      var a = i * PI / 3, b = Math.max(0, Math.cos(a - o.campo)), c = o.calor > 0.5 ? P.rojo : P.fase[i % 3];
      g.globalAlpha = 0.35 + 0.65 * b * o.amp;
      g.save(); g.translate(cx + Math.cos(a) * 92, cy + Math.sin(a) * 92); g.rotate(a); rr(-12, -16, 24, 32, 4, c, P.hierro, 1.5); g.restore();
      g.globalAlpha = 1;
    }
    for (i = 0; i < 4; i++) {
      var a0 = o.rotor + i * PI / 2;
      g.beginPath(); g.arc(cx, cy, 66, a0 + 0.1, a0 + PI / 2 - 0.1); g.arc(cx, cy, 44, a0 + PI / 2 - 0.1, a0 + 0.1, true); g.closePath();
      g.fillStyle = i % 2 ? P.azul : P.rojo; g.fill();
      tx(i % 2 ? 'S' : 'N', cx + Math.cos(a0 + PI / 4) * 55, cy + Math.sin(a0 + PI / 4) * 55, { al: 'center', c: '#fff', t: 15 });
    }
    cr(cx, cy, 40, P.acero, P.hierro, 2); cr(cx, cy, 10, P.hierro);
    // encoder
    var ex = 540, ey = 100;
    cr(ex, ey, 40, P.sup2, P.hierro, 2);
    for (i = 0; i < 16; i++) { var aa = o.rotor * 1 + i * TAU / 16; rr(ex + Math.cos(aa) * 30 - 3, ey + Math.sin(aa) * 30 - 3, 6, 6, 1, P.hierro); }
    tx('ENCODER', ex, 154, { al: 'center', t: 14, c: P.tinta2 });
    rr(460, 170, 170, 46, 3, P.placa);
    var ps = [], vel = o.vel;
    for (var xx = 0; xx <= 160; xx += 2) {
      var fase_ = (xx * (0.08 + vel * 0.12) + o.rotor * 6) % 2, alto = fase_ < 1;
      if (o.malEnc && ruido(Math.floor(xx / 12) + Math.floor(t * 4)) > 0.7) alto = ruido(xx + Math.floor(t * 20)) > 0.5;
      ps.push(465 + xx, alto ? 180 : 206);
    }
    ln(ps, o.malEnc ? '#ff6b5e' : '#4cd68f', 2);
  }
  esc('motor', {
    funciona: {
      dur: 16,
      subt: [[0, 'El variador toma la corriente de la red y la convierte en tres fases con la frecuencia y el voltaje que necesita el motor.'],
        [4, 'En el estator, esas fases forman un campo magnético que gira. Los imanes del rotor lo siguen y el eje gira con ellos.'],
        [8, 'Más frecuencia, más velocidad: así el ascensor arranca suave, acelera, viaja y frena suave al llegar.'],
        [12, 'El encoder cuenta las vueltas del eje y le dice al variador la velocidad y la posición exactas, cientos de veces por segundo.']],
      dib: function (t) {
        var vf = function (x) { return kf(x, [[0, 0.15], [4, 0.15], [6, 3], [10.5, 3], [12.5, 0.15]]); }, rot = integ(vf, t), vel = vf(t) / 3;
        dibMotor(t, { fase: rot * 2, amp: Math.min(1, 0.25 + vel), campo: rot + 0.35, rotor: rot, vel: vel, calor: 0 });
        rr(460, 236, 170, 110, 4, P.sup2, P.linea, 1.5); tx('VELOCIDAD', 470, 252, { t: 13, m: 1, c: P.tinta2, w: 500 });
        ln([476, 330, 506, 330, 530, 270, 584, 270, 608, 330, 620, 330], P.tinta2, 2, [4, 4]);
        var u = cl((t - 4) / 9), px = 476 + u * 144, py = 330 - 60 * Math.min(1, vel);
        cr(px, py, 6, P.acento, P.hierro, 2);
        if (t < 4) { rotulo('Estator (bobinas)', 330, 88, 230, 30); rotulo('Rotor con imanes', 330, 150, 420, 30); }
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Si el encoder falla, se ensucia o se suelta, el variador pierde la cuenta: el motor vibra, hace ruido y el variador corta por error de encoder o por sobrecorriente.'],
        [7, 'Muchos arranques seguidos o un cuarto sin ventilación calientan el bobinado. Su sensor de temperatura para el ascensor hasta que el motor enfríe.'],
        [14, 'Rodamientos gastados: un zumbido que sube con la velocidad. Se escucha con estetoscopio de mecánico y se mide la vibración antes de que se trabe.']],
      dib: function (t) {
        if (t < 7) {
          var j = t > 1.5 ? Math.sin(t * 40) * 0.08 : 0, rot = integ(function (x) { return x < 4.5 ? 2 : 0.1; }, t) + j;
          dibMotor(t, { fase: rot * 2, amp: 0.8, campo: rot + 0.35, rotor: rot, vel: t < 4.5 ? 0.6 : 0, malEnc: t > 1.5, calor: 0 });
          tabla(460, 236, 170, [['ENCODER', t > 1.5 ? 'PULSOS MAL' : 'OK', t > 1.5 ? 'mal' : 'ok'], ['VARIADOR', t > 4.5 ? 'ERROR' : 'EN MARCHA', t > 4.5 ? 'mal' : 'ac'], ['MOTOR', t > 4.5 ? 'PARADO' : 'VIBRA', 'mal']]);
          if (t > 1.5) alerta(540, 100, 48, t);
        } else if (t < 14) {
          var c = ph(t, 7, 11), rot2 = integ(function (x) { return x < 7 ? 0 : x < 11.5 ? 2 : 0.05; }, t);
          dibMotor(t, { fase: rot2 * 2, amp: 0.8, campo: rot2 + 0.35, rotor: rot2, vel: t < 11.5 ? 0.6 : 0, calor: c });
          termometro(330, 335, 0.3 + 0.7 * c);
          tabla(460, 236, 170, [['TEMP. MOTOR', Math.round(60 + 70 * c) + ' °C', c > 0.7 ? 'mal' : 'ac'], ['SENSOR PTC', c > 0.85 ? 'DISPARÓ' : 'OK', c > 0.85 ? 'mal' : 'ok']]);
        } else {
          var rot3 = integ(function (x) { return x < 14 ? 0 : 2.4; }, t);
          g.save(); g.translate(Math.sin(t * 50) * 1.5, Math.cos(t * 43) * 1.5);
          dibMotor(t, { fase: rot3 * 2, amp: 0.9, campo: rot3 + 0.35, rotor: rot3, vel: 0.8, calor: 0 }); g.restore();
          ondas(330, 180, t, P.rayo, 0); ondas(330, 180, t, P.rayo, PI);
          rotulo('Rodamiento', 330, 180, 420, 310);
        }
      }
    }
  });

  // ---------- encoder ----------
  esc('encoder', {
    funciona: {
      dur: 14,
      subt: [[0, 'El encoder va en la punta del eje del motor: un disco con ranuras gira entre una luz y un sensor.'],
        [4, 'Cada ranura que pasa es un pulso. Hay dos canales, A y B, corridos un cuarto de ranura.'],
        [8, 'Contando pulsos el control sabe cuánto giró el motor; mirando qué canal llega primero sabe si sube o baja.'],
        [11, 'Con eso el variador regula la velocidad y el control calcula dónde está la cabina entre piso y piso.']],
      dib: function (t) { dibEncoder(t, false); }
    },
    falla: {
      dur: 16,
      subt: [[0, 'Disco sucio, sensor dañado o acople flojo: se pierden pulsos y la cuenta no cuadra.'],
        [5, 'Cable sin malla a tierra o junto a los cables de fuerza: el ruido eléctrico mete pulsos falsos.'],
        [10, 'El ascensor vibra, no nivela o el variador corta con error de encoder. Antes de cambiarlo se revisan el acople, el conector y la malla del cable.']],
      dib: function (t) { dibEncoder(t, true); }
    }
  });
  function dibEncoder(t, mal) {
    var cx = 180, cy = 190, R = 120, ang = integ(function (x) { return mal && x > 10 ? 0.2 : 1.1; }, t);
    cr(cx, cy, R, P.sup2, P.hierro, 3);
    for (var i = 0; i < 24; i++) { var a = ang + i * TAU / 24; g.save(); g.translate(cx + Math.cos(a) * (R - 18), cy + Math.sin(a) * (R - 18)); g.rotate(a); rr(-9, -5, 18, 10, 2, P.hierro); g.restore(); }
    if (mal && t < 5) { mancha(cx + 60, cy - 70, 16, 0.85); }
    cr(cx, cy, 20, P.acero, P.hierro, 2);
    var luzA = ((ang / (TAU / 24)) % 1 + 1) % 1 < 0.5, luzB = (((ang / (TAU / 24)) + 0.25) % 1 + 1) % 1 < 0.5;
    rr(cx - 12, 30, 24, 26, 3, P.goma); led(cx, 44, true, P.acento, 5);
    g.globalAlpha = luzA ? 0.8 : 0.1; ln([cx, 56, cx, 82], P.acento, 6); g.globalAlpha = 1;
    tx('LUZ', cx + 20, 44, { t: 14, c: P.tinta2 });
    // osciloscopio
    rr(340, 40, 286, 230, 5, P.placa);
    tx('A', 352, 100, { c: '#4cd68f', t: 16 }); tx('B', 352, 170, { c: '#66aef3', t: 16 });
    var pa = [], pb = [];
    for (var x = 0; x <= 250; x += 2) {
      var s = (x * 0.05 + ang * 3.8) % 2, alta = s < 1, altb = ((s + 0.5) % 2) < 1;
      if (mal && t < 5 && ruido(Math.floor(x / 20) + Math.floor(t * 3)) > 0.72) { alta = false; altb = false; }
      var spike = mal && t >= 5 && t < 10 && ruido(x + Math.floor(t * 30)) > 0.93 ? -14 : 0;
      pa.push(366 + x, (alta ? 82 : 112) + spike); pb.push(366 + x, (altb ? 152 : 182) - spike);
    }
    ln(pa, '#4cd68f', 2); ln(pb, '#66aef3', 2);
    var cuenta = Math.floor(ang * 24 / TAU * 4) + (mal ? Math.floor(ruido(Math.floor(t)) * 9) : 0);
    tx('PULSOS ' + cuenta, 366, 222, { c: P.placaT, t: 15, m: 1, w: 500 });
    tx(mal && t > 10 ? 'ERROR ENCODER' : 'SENTIDO: SUBE', 366, 248, { c: mal && t > 10 ? '#ff6b5e' : '#ffc62b', t: 15, m: 1, w: 500 });
  }

  // ---------- puertas: cabezal, sincronismo, pesa, roldanas, guiadores ----------
  var POS_PUERTA = {
    cable_sincronismo: function (o) { return [320, 60, 30]; }, cabezal_piso: function () { return [320, 96, 40]; }, roldanas_puerta: function (o) { return [o.xR + 30, 96, 14]; },
    pesa_cierre: function (o) { return [24, o.pesa + 25, 30]; }, guiadores_puerta: function (o) { return [o.xR + 20, 330, 14]; }, pisadera: function () { return [320, 334, 40]; },
    puerta_piso: function (o) { return [o.xR + 70, 220, 60]; }, puerta_cabina: function (o) { return [o.xR + 70, 220, 60]; }, cerradura: function () { return [320, 100, 18]; },
    patin: function (o) { return [o.xR + 12, 160, 20]; }, contacto_puerta_cabina: function () { return [320, 100, 18]; }
  };
  function dibPuerta(t, o) {
    var aL = o.aL == null ? o.a : o.aL, xL = 180 - 140 * aL, xR = 320 + 140 * o.a;
    o.xR = xR; o.xL = xL;
    rr(180, 104, 280, 226, 0, P.interior);
    // hojas con sus carros y ruedas
    [[xL, aL], [xR, o.a]].forEach(function (q, i) {
      var x = q[0], malo = o.malo === 'puerta_piso' || o.malo === 'puerta_cabina';
      rr(x, 110, 140, 220, 0, P.inox, malo && o.parpadeo ? P.rayo : P.aceroOsc, malo && o.parpadeo ? 3 : 1.5);
      rr(x + 8, 88, 124, 22, 2, P.aceroOsc, P.hierro, 1.5);
      var rol = o.malo === 'roldanas_puerta';
      cr(x + 30, 96, 8, rol && i === 1 ? P.rayo : P.goma, P.hierro, 1.5); cr(x + 110, 96, 8, rol && i === 1 ? P.rayo : P.goma, P.hierro, 1.5);
      var gui = o.malo === 'guiadores_puerta' && i === 1;
      rr(x + 16, 326, 14, 10, 1, gui ? P.rayo : P.goma); rr(x + 110, 326, 14, 10, 1, P.goma);
    });
    rr(40, 102, 560, 6, 1, o.malo === 'cabezal_piso' ? P.rayo : P.acero, P.hierro, 1);
    // lazo del cable de sincronismo
    var sinc = o.malo === 'cable_sincronismo' ? P.rayo : P.hierro;
    cr(48, 68, 9, P.goma, P.hierro, 1.5); cr(592, 68, 9, P.goma, P.hierro, 1.5);
    if (o.roto) { ln([48, 59, 240, 59, 236, 84], sinc, 2.5); ln([592, 59, 400, 59, 404, 82], sinc, 2.5); }
    else if (o.flojo) { g.beginPath(); g.moveTo(48, 59); g.quadraticCurveTo(320, 59 + o.flojo * 2, 592, 59); g.strokeStyle = sinc; g.lineWidth = 2.5; g.stroke(); }
    else ln([48, 59, 592, 59], sinc, 2.5, [12, 6], 140 * aL);
    ln([48, 77, 592, 77], sinc, 2.5, [12, 6], -140 * o.a);
    arco(48, 68, 9, PI / 2, PI * 1.5, sinc, 2.5); arco(592, 68, 9, -PI / 2, PI / 2, sinc, 2.5);
    if (!o.roto) { var yc = o.flojo ? 59 + o.flojo * 2 * (1 - Math.pow((xL + 100 - 320) / 272, 2)) * 0.5 : 59; ln([xL + 100, 88, xL + 100, yc], P.hierro, 3); rr(xL + 94, yc - 4, 12, 8, 1, P.cobre); }
    ln([xR + 40, 88, xR + 40, 77], P.hierro, 3); rr(xR + 34, 73, 12, 8, 1, P.cobre);
    // pesa de cierre: cordón desde el carro derecho
    var pesa = 250 - 110 * o.a; o.pesa = pesa;
    ln([xR + 130, 96, xR + 130, 86, 24, 86, 24, pesa], P.tinta2, 1.5, [4, 3]);
    cr(24, 86, 6, P.goma); rr(16, pesa, 16, 50, 3, o.malo === 'pesa_cierre' ? P.rayo : P.hierro);
    // contacto de la hoja (en el centro)
    var junta = Math.abs(xL + 140 - xR) < 4 && o.a < 0.03;
    rr(310, 92, 20, 12, 2, P.goma); led(320, 86, true, junta ? P.verde : P.rayo, 4);
    // pisadera y muros (semitransparentes para ver las hojas abiertas)
    rr(120, 330, 400, 8, 1, o.malo === 'pisadera' ? P.rayo : P.acero);
    g.globalAlpha = 0.5; rr(0, 104, 180, 256, 0, P.muro); rr(460, 104, 180, 256, 0, P.muro); g.globalAlpha = 1;
    if (o.arrastre) flecha(xR + 70, 220, xR + 70 + (o.arrastre > 0 ? 50 : -50), 220, P.acento, 5);
    if (o.foco && POS_PUERTA[o.foco]) { var f = POS_PUERTA[o.foco](o); foco(f[0], f[1], f[2], t); }
    if (o.malo && o.parpadeo && POS_PUERTA[o.malo]) { var m = POS_PUERTA[o.malo](o); alerta(m[0], m[1], m[2], t); }
    return { junta: junta };
  }
  esc('sincronismo', {
    funciona: {
      dur: 17,
      subt: [[0, 'El cable de sincronismo es un lazo cerrado que da la vuelta entre dos poleítas, en los extremos del cabezal de la puerta.'],
        [3, 'La hoja derecha va amarrada al tramo de abajo y la izquierda al de arriba. Cuando la cabina arrastra una hoja, el lazo mueve la otra en sentido contrario.'],
        [9, 'Al cerrar pasa lo mismo al revés. La pesa de cierre tira de todo el conjunto para que la puerta de piso se cierre sola.'],
        [13.5, 'Por eso la puerta de cabina solo tiene que enganchar una hoja de la puerta de piso: el cable se encarga de la otra.']],
      dib: function (t, k) {
        var a = kf(t, [[0, 0], [3, 0], [7, 1], [10, 1], [14, 0]]);
        dibPuerta(t, { a: a, arrastre: entre(t, 3, 7) ? 1 : 0, foco: t > 1 && t < 3 ? 'cable_sincronismo' : t > 9 && t < 13 ? 'pesa_cierre' : k.foco !== 'cable_sincronismo' ? k.foco : null });
        if (t < 3) { rotulo('Cable de sincronismo', 140, 59, 150, 26); rotulo('Poleíta', 592, 68, 520, 26); }
        if (entre(t, 9, 13)) rotulo('Pesa de cierre', 24, 200, 60, 250);
      }
    },
    falla: {
      dur: 21,
      subt: [[0, 'Cable estirado o flojo: la hoja que va amarrada a él llega tarde y no alcanza a juntarse al centro.'],
        [4.5, 'Queda una rendija, el contacto de esa hoja no cierra y el ascensor no sale del piso: «se abrió la serie de puertas».'],
        [8, 'Si el cable se rompe, una hoja queda suelta: no sigue a la otra y se puede abrir con la mano. Con la puerta de piso así, el ascensor se saca de servicio.'],
        [15, 'Se revisa: la tensión del cable (una poleíta tiene tensor), los amarres a los carros, que las poleítas giren libres y que las hojas lleguen juntas al centro.']],
      dib: function (t) {
        var a, aL, r;
        if (t < 8) {
          a = kf(t, [[0, 0], [1, 0], [4, 1], [5, 1], [8, 0]]); aL = kf(t, [[0, 0], [1.6, 0], [4.6, 0.85], [5.4, 0.85], [8, 0.14]]);
          r = dibPuerta(t, { a: a, aL: Math.max(aL, t > 7 ? 0.14 : 0), flojo: kf(t, [[0, 0], [1, 16]]), malo: 'cable_sincronismo', parpadeo: t > 5.5 });
          if (t > 6.5) estado('SERIE DE PUERTAS ABIERTA', 320, 20, true);
        } else if (t < 15) {
          a = kf(t, [[8, 0], [9, 0], [11.5, 1], [12.5, 1], [15, 0]]); aL = kf(t, [[8, 0.14], [13, 0.14], [14.5, 0.5]]);
          dibPuerta(t, { a: a, aL: aL, roto: true, malo: 'cable_sincronismo', parpadeo: true });
          placa('HOJA SUELTA', 110, 200, { al: 'center', f: P.mal });
          if (t > 13) { var hx = 180 - 140 * aL + 60; rr(hx - 18, 190, 36, 22, 8, P.azul); flecha(hx - 20, 200, hx - 60, 200, P.azul, 4); }
        } else {
          dibPuerta(t, { a: 0, foco: 'cable_sincronismo' }); estado('SERIE DE PUERTAS OK', 320, 20, false);
        }
      }
    }
  });

  // ---------- operador de puertas ----------
  esc('operador', {
    funciona: {
      dur: 18,
      subt: [[0, 'El operador es el motor de la puerta de cabina: un motor con su tarjeta, una correa dentada y los carros de donde cuelgan las hojas.'],
        [2.5, 'La tarjeta sigue una curva: arranca suave, corre, frena y llega despacio al tope, sin golpes.'],
        [8, 'Al cerrar vigila la fuerza y la cortina: si algo se cruza o frena la hoja, reabre de inmediato.'],
        [14, 'La puerta de cabina arrastra a la de piso con el patín, así que un operador mal ajustado se nota en todas las puertas del edificio.']],
      dib: function (t) {
        var A = [[0, 0], [2.5, 0], [6, 1], [8, 1], [10.8, 0.3], [11, 0.3], [12.4, 1], [14, 1], [17.5, 0]];
        dibOperador(t, A, { obst: entre(t, 9.6, 12.6) });
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Correa floja o gastada: salta dientes, las hojas se descuadran y golpean al abrir o al cerrar.'],
        [7, 'Si la tarjeta pierde las posiciones (por un corte de luz, un cambio de tarjeta o un encoder malo), la puerta hace un viaje lento de aprendizaje para encontrar sus topes.'],
        [13, 'Otros síntomas: puerta que no abre del todo, que cierra con mucha fuerza o que se queda zumbando. Se revisan correa, carros, topes y parámetros antes de cambiar la tarjeta.']],
      dib: function (t) {
        if (t < 7) dibOperador(t, [[0, 0], [1, 0], [3.2, 1], [4.2, 1], [6.5, 0]], { floja: true });
        else if (t < 13) dibOperador(t, [[7, 0], [8, 0], [10.5, 1], [11, 1], [12.8, 0]], { aprende: true });
        else dibOperador(t, [[13, 0], [20, 0]], { foco: true });
      }
    }
  });
  function dibOperador(t, A, o) {
    var a = kf(t, A), sacude = o.floja && a > 0.05 && a < 0.95 ? Math.sin(t * 30) * 0.03 : 0, aL = o.floja ? Math.max(0, a - 0.12 * Math.sin(a * PI)) : a;
    var xL = 180 - 140 * (aL + sacude), xR = 320 + 140 * a;
    rr(180, 100, 280, 182, 0, P.interior);
    [xL, xR].forEach(function (x) { rr(x, 96, 140, 186, 0, P.inox, P.aceroOsc, 1.5); rr(x + 8, 82, 124, 16, 2, P.aceroOsc); });
    rr(40, 40, 560, 36, 4, P.hierro);
    rr(50, 28, 44, 58, 6, P.aceroOsc, P.hierro, 2); tx('M', 72, 57, { al: 'center', c: P.placaT, t: 16 });
    var off = -140 * a * 1.0;
    polea(112, 58, 14, -a * 10, P.acero, P.hierro); polea(560, 58, 12, -a * 11.6, P.acero, P.hierro);
    var floja = o.floja ? 8 : 0;
    ln([112, 44, 560, 44], P.goma, 5, [5, 4], off); g.beginPath(); g.moveTo(112, 72); g.quadraticCurveTo(336, 72 + floja * 2, 560, 72); g.strokeStyle = P.goma; g.lineWidth = 5; g.setLineDash([5, 4]); g.lineDashOffset = -off; g.stroke(); g.setLineDash([]);
    ln([xL + 100, 82, xL + 100, 46], P.cobre, 4); ln([xR + 40, 82, xR + 40, 70], P.cobre, 4);
    rr(470, 46, 74, 24, 3, P.pcb); led(530, 58, true, o.aprende ? P.acento : P.verde, 4); tx('TARJETA', 478, 58, { t: 12, c: '#dff', m: 1, w: 500 });
    rr(120, 282, 400, 8, 1, P.acero);
    g.globalAlpha = 0.5; rr(0, 96, 180, 194, 0, P.muro); rr(460, 96, 180, 194, 0, P.muro); g.globalAlpha = 1;
    if (o.obst) { rr(300, 246, 40, 36, 4, P.azul); tx('obstáculo', 320, 236, { al: 'center', t: 14, c: P.azul }); }
    // curva de velocidad de la hoja
    rr(40, 298, 270, 56, 4, P.sup2, P.linea, 1.5); tx('VELOCIDAD DE LA HOJA', 48, 308, { t: 11, m: 1, c: P.tinta2, w: 500 });
    var p = [], t0 = Math.max(A[0][0], t - 8);
    for (var s = t0; s <= t; s += 0.08) { var v = (kf(s + 0.04, A) - kf(s - 0.04, A)) / 0.08; p.push(48 + (s - t0) / 8 * 250, 330 - v * 30); }
    if (p.length > 3) ln(p, P.azul, 2.5);
    ln([48, 330, 300, 330], P.linea, 1);
    var fil = o.floja ? [['CORREA', 'SALTA DIENTES', 'mal'], ['HOJAS', 'DESCUADRADAS', 'mal']] : o.aprende ? [['TARJETA', 'APRENDIZAJE', 'ac'], ['VELOCIDAD', 'LENTA', 'ac']] : o.obst ? [['FUERZA', 'ALTA', 'mal'], ['ORDEN', 'REABRIR', 'mal']] : [['ORDEN', a > 0.02 && a < 0.98 ? 'MOVIENDO' : a >= 0.98 ? 'ABIERTA' : 'CERRADA', 'ok'], ['FUERZA', 'NORMAL', 'ok']];
    tabla(330, 298, 270, fil);
    if (o.floja) { alerta(336, 76, 26, t); }
    if (o.foco) { foco(72, 57, 30, t); foco(336, 58, 40, t); foco(507, 58, 30, t); }
  }

  // ---------- paracaídas ----------
  function dibParacaidas(t, o) {
    var rx = 320;
    rr(rx - 7, 0, 14, H, 0, P.acero, P.hierro, 1.5);
    if (o.grasa) for (var i = 0; i < 8; i++) { g.globalAlpha = 0.6; rr(rx - 6, ((i * 50 - o.recorrido) % 400 + 400) % 400 - 20, 12, 22, 4, P.aceite); g.globalAlpha = 1; }
    for (i = 0; i < 5; i++) { var y = ((i * 90 - o.recorrido) % 450 + 450) % 450 - 45; rr(rx + 7, y, 26, 12, 1, P.aceroOsc); }
    rr(170, 18, 300, 132, 3, P.inox, P.aceroOsc, 2); tx('CABINA', 320, 84, { al: 'center', t: 18, c: P.tinta2 });
    rr(150, 150, 340, 24, 2, P.aceroOsc, P.hierro, 2);
    var w = o.cunas, gap = 6 * (1 - w), sube = 18 * w;
    [[-1], [1]].forEach(function (q) {
      var s = q[0];
      g.beginPath(); g.moveTo(rx + s * 9, 176); g.lineTo(rx + s * 44, 176); g.lineTo(rx + s * 44, 240); g.lineTo(rx + s * 9, 240); g.lineTo(rx + s * 22, 176); g.closePath();
      g.fillStyle = P.hierro; g.fill();
      g.beginPath(); g.moveTo(rx + s * (8 + gap), 200 - sube); g.lineTo(rx + s * (8 + gap), 232 - sube); g.lineTo(rx + s * (18 + gap), 232 - sube); g.lineTo(rx + s * (13 + gap), 200 - sube); g.closePath();
      g.fillStyle = o.oxido ? '#9a5b2b' : P.acero; g.fill(); g.strokeStyle = P.hierro; g.lineWidth = 1.5; g.stroke();
    });
    if (o.chispas) { chispas(rx - 10, 220 - sube, t, 7, 18); chispas(rx + 10, 220 - sube, t + 0.3, 7, 18); }
    var lev = o.palanca;
    ln([300, 236 - sube, 250, 244], P.hierro, 5); ln([250, 244, 204, 236 - 22 * lev], P.hierro, 5); cr(250, 244, 5, P.acento);
    ln([204, 0, 204, H], P.tinta2, 2.5, [8, 6], o.offCable); cr(204, 236 - 22 * lev, 5, P.hierro);
    rr(222, 186, 26, 22, 3, P.goma); ln([235, 208, 240, 230 - 14 * lev], P.acero, 3); led(235, 180, true, o.contacto ? P.rayo : P.verde, 4);
    // velocímetro
    var gx = 560, gy = 120, v = o.v;
    arco(gx, gy, 56, PI * 0.8, PI * 2.2, P.linea, 10);
    arco(gx, gy, 56, PI * 0.8 + (1.15 / 1.5) * PI * 1.4, PI * 2.2, P.rayo, 10);
    var an = PI * 0.8 + Math.min(1, v / 1.5) * PI * 1.4;
    ln([gx, gy, gx + Math.cos(an) * 48, gy + Math.sin(an) * 48], P.tinta, 3); cr(gx, gy, 5, P.tinta);
    tx(v.toFixed(2) + ' m/s', gx, gy + 54, { al: 'center', t: 18, m: 1, w: 500 }); tx('velocidad', gx, gy + 74, { al: 'center', t: 13, c: P.tinta2 });
  }
  esc('paracaidas', {
    funciona: {
      dur: 18,
      subt: [[0, 'El paracaídas va debajo de la cabina, abrazando cada guía. Adentro hay cuñas que en marcha normal no tocan la guía.'],
        [3.5, 'Si la cabina baja demasiado rápido, el limitador traba su cable. La cabina sigue bajando y el cable, que quedó quieto, jala la palanca hacia arriba.'],
        [7.6, 'La palanca sube las cuñas, que se meten entre la caja y la guía y la muerden: la cabina frena en una distancia corta y se queda clavada.'],
        [11.5, 'Al mismo tiempo el microswitch del paracaídas abre la serie de seguridades, para que el motor no intente mover la cabina.'],
        [15, 'Para soltarlo, el técnico sube la cabina con la máquina y rearma el limitador y el contacto. Después revisa las cuñas y la guía.']],
      dib: function (t, k) {
        var vf = function (x) { return kf(x, [[0, 1], [4, 1], [7, 1.22], [8, 1.22], [9.4, 0]]); }, v = vf(t), rec = integ(vf, t) * 120;
        var trabado = t > 7, cab = rec, cable = trabado ? integ(vf, 7) * 120 : rec;
        dibParacaidas(t, { v: v, recorrido: rec, cunas: ph(t, 7.4, 8.4), palanca: ph(t, 7, 7.8), chispas: entre(t, 8, 9.4), contacto: t > 8, offCable: -(cab - cable) });
        if (t < 3.5) { rotulo('Cuñas', 330, 215, 420, 260); rotulo('Cable del limitador', 204, 120, 40, 60); }
        if (entre(t, 7, 9)) placa('LIMITADOR TRABADO', 104, 300, { al: 'center', f: P.mal });
        if (k.foco === 'contacto_paracaidas' && t > 10) foco(235, 196, 20, t);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Guía con exceso de grasa o cuñas oxidadas y sucias: las cuñas resbalan y la cabina necesita mucha más distancia para frenar.'],
        [7, 'Actuación en falso: un limitador sucio o un tirón del cable hace saltar el paracaídas sin sobrevelocidad. La cabina queda clavada, con gente adentro.'],
        [13, 'Se revisa en el mantenimiento: cuñas limpias y libres, sus resortes, que la palanca se mueva sin trabarse y el contacto. Y se prueba en la inspección anual.']],
      dib: function (t) {
        var vf, v, rec, tr;
        if (t < 7) {
          vf = function (x) { return kf(x, [[0, 1], [1.5, 1], [3, 1.22], [3.2, 1.22], [6.4, 0]]); }; tr = 3.2;
          v = vf(t); rec = integ(vf, t) * 120;
          dibParacaidas(t, { v: v, recorrido: rec, cunas: ph(t, 3.4, 4.2), palanca: ph(t, 3.2, 3.8), chispas: entre(t, 4, 6.4), contacto: t > 4, offCable: -(rec - integ(vf, Math.min(t, tr)) * 120), grasa: true, oxido: true });
          rr(450, 230, 176, 100, 4, P.sup2, P.linea, 1.5); tx('DISTANCIA DE FRENADO', 460, 246, { t: 12, m: 1, c: P.tinta2, w: 500 });
          rr(460, 266, 46, 14, 2, P.ok); tx('normal', 512, 273, { t: 14, c: P.tinta2 });
          rr(460, 296, 46 + 110 * ph(t, 4, 6.4), 14, 2, P.rayo); tx('con grasa', 460 + 52 + 110 * ph(t, 4, 6.4), 303, { t: 14, c: P.rayo });
        } else {
          vf = function (x) { return x < 7 ? 1 : kf(x, [[7, 1], [9, 1], [10.2, 0]]); };
          v = vf(t); rec = integ(vf, t) * 120;
          dibParacaidas(t, { v: v, recorrido: rec, cunas: ph(t, 9.2, 9.9), palanca: ph(t, 9, 9.5), chispas: entre(t, 9.6, 10.2), contacto: t > 9.6, offCable: -(rec - integ(vf, Math.min(t, 9)) * 120) });
          if (entre(t, 8.6, 9.4)) placa('TIRÓN DEL CABLE', 104, 300, { al: 'center', f: P.mal });
          if (t > 10) placa('Sin sobrevelocidad: actuación en falso', 320, 330, { al: 'center', f: P.mal });
        }
      }
    }
  });

  // ---------- limitador de velocidad, su cable y la polea tensora ----------
  function dibLimitador(t, o) {
    var cx = 200, cy = 160, R = 104;
    cr(cx, cy, R + 8, P.aceroOsc, P.hierro, 3); cr(cx, cy, R - 6, P.acero, P.hierro, 2);
    var ab = o.abre, ang = o.ang;
    [0, PI].forEach(function (s) {
      var a = ang + s, piv = [cx + Math.cos(a + 1.2) * 26, cy + Math.sin(a + 1.2) * 26], rt = 46 + 40 * ab;
      var tip = [cx + Math.cos(a) * rt, cy + Math.sin(a) * rt];
      ln([piv[0], piv[1], tip[0], tip[1]], P.hierro, 7); cr(tip[0], tip[1], 13, o.sucio ? '#7d5a2c' : P.aceroOsc, P.hierro, 2); cr(piv[0], piv[1], 4, P.acento);
    });
    var t1 = [cx + Math.cos(ang) * (46 + 40 * ab), cy + Math.sin(ang) * (46 + 40 * ab)], t2 = [cx + Math.cos(ang + PI) * (46 + 40 * ab), cy + Math.sin(ang + PI) * (46 + 40 * ab)];
    resorte(t1[0], t1[1], t2[0], t2[1], 8, 5, P.cobre, 2);
    cr(cx, cy, 10, P.hierro);
    // contacto eléctrico arriba a la derecha y trinquete arriba a la izquierda
    rr(300, 34, 36, 26, 3, P.goma); led(318, 24, true, o.contacto ? P.rayo : P.verde, 5); ln([300, 54, 282, 66 - (o.contacto ? 10 : 0)], P.acero, 3);
    g.save(); g.translate(96, 58); g.rotate(o.traba ? 0.5 : 0); rr(-6, -4, 40, 10, 3, o.traba ? P.rayo : P.hierro); g.restore(); cr(96, 58, 5, P.acento);
    // lazo a la derecha
    var lx = 470, rx2 = 506, top = 40, bot = 296 + (o.baja || 0);
    polea(488, top, 18, o.ang, P.acero, P.hierro); polea(488, bot, 18, o.ang, P.acero, P.hierro);
    ln([lx, top, lx, bot], P.tinta2, 2.5, [8, 6], -o.offCable); ln([rx2, top, rx2, bot], P.tinta2, 2.5, [8, 6], o.offCable);
    rr(478, bot + 18, 20, 26, 2, P.hierro); ln([488, bot + 10, 488, bot + 18], P.hierro, 2);
    rr(526, 300, 26, 20, 3, P.goma); led(539, 292, true, o.tensora ? P.rayo : P.verde, 4); tx('contacto', 556, 312, { t: 12, c: P.tinta2 });
    var cab = o.cab;
    rr(516, cab, 64, 50, 3, P.inox, P.aceroOsc, 2); ln([506, cab + 40, 516, cab + 40], P.hierro, 4); cr(506, cab + 40, 4, P.acento);
    if (o.paraca) chispas(516, cab + 48, t, 6, 12);
    tabla(16, 290, 230, [['VELOCIDAD', o.v.toFixed(2) + ' m/s', o.v > 1.12 ? 'mal' : 'ok'], ['LIMITADOR', o.estado, o.estadoE || 'ok']]);
  }
  esc('limitador', {
    funciona: {
      dur: 19,
      subt: [[0, 'El cable del limitador es un lazo: arriba la polea del limitador, abajo la polea tensora con su pesa. La cabina lo arrastra con la palanca del paracaídas.'],
        [4, 'Así la polea del limitador gira siempre a la velocidad de la cabina.'],
        [7.5, 'Adentro, unos contrapesos giratorios se abren con la fuerza centrífuga: cuanto más rápido gira, más se abren.'],
        [10.5, 'Con una sobrevelocidad chica tocan primero el contacto eléctrico: se corta la maniobra y cae el freno.'],
        [13, 'Si la cabina sigue acelerando, un trinquete traba la polea: el cable se detiene y jala el paracaídas, que frena la cabina contra las guías.']],
      dib: function (t, k) {
        var vf = function (x) { return kf(x, [[0, 0], [1, 1], [8, 1], [11, 1.18], [13, 1.3], [13.4, 1.3], [14.4, 0]]); }, v = vf(t);
        var traba = t > 13.2, angF = function (x) { return x > 13.2 ? 0 : vf(x) * 2.2; }, ang = integ(angF, t);
        var rec = integ(vf, t) * 13, cab = 50 + rec;
        dibLimitador(t, { v: v, ang: ang, abre: cl((Math.min(v, 1.3) - 0.85) / 0.45), contacto: v > 1.15 || t > 13, traba: traba, cab: cab, offCable: traba ? integ(vf, 13.2) * 13 : rec, paraca: entre(t, 13.4, 14.4),
          estado: traba ? 'TRABADO' : v > 1.15 ? 'CONTACTO ABIERTO' : 'OK', estadoE: traba || v > 1.15 ? 'mal' : 'ok' });
        if (t < 4) { rotulo('Polea del limitador', 488, 40, 560, 100); rotulo('Polea tensora', 488, 296, 560, 250); }
        if (entre(t, 7.5, 10.5)) rotulo('Contrapesos', 200, 110, 40, 30);
        var f = { cable_limitador: [470, 170, 24], polea_tensora: [488, 300, 30] }[k.foco];
        if (f && t > 4) foco(f[0], f[1], f[2], t);
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Con los años el cable se estira: la polea tensora baja con su pesa hasta abrir su contacto, y el ascensor se para.'],
        [6, 'Si la garganta de la polea está gastada o el cable tiene grasa, al trabarse la polea el cable patina y no alcanza a jalar el paracaídas a tiempo.'],
        [13, 'Contrapesos sucios o resortes vencidos: el limitador dispara a velocidad normal (actuación en falso) o tarda en disparar.'],
        [17, 'Por eso el limitador viene ajustado y sellado de fábrica, se prueba en la inspección y su cable se mide y se cambia cuando está fuera de medida.']],
      dib: function (t) {
        if (t < 6) {
          var baja = kf(t, [[0, 0], [4.5, 18]]), abre = t > 4.5;
          dibLimitador(t, { v: abre ? 0 : 1, ang: integ(function (x) { return x > 4.5 ? 0 : 2.2; }, t), abre: 0.33, contacto: false, cab: 110 + integ(function (x) { return x > 4.5 ? 0 : 1; }, t) * 13, offCable: integ(function (x) { return x > 4.5 ? 0 : 1; }, t) * 13, baja: baja, tensora: abre, estado: abre ? 'TENSORA ABIERTA' : 'OK', estadoE: abre ? 'mal' : 'ok' });
          if (abre) alerta(488, 316, 30, t);
        } else if (t < 13) {
          var vf = function (x) { return x < 6 ? 1 : kf(x, [[6, 1], [8, 1.3], [12, 1.3], [12.6, 0]]); }, tr = 8.6;
          var rec = integ(vf, t) * 13;
          dibLimitador(t, { v: vf(t), ang: integ(function (x) { return x > tr ? 0 : vf(x) * 2.2; }, t), abre: cl((Math.min(vf(t), 1.3) - 0.85) / 0.45), contacto: t > 7.5, traba: t > tr, cab: 40 + (rec - integ(vf, 6) * 13), offCable: rec, estado: t > tr ? 'TRABADO · PATINA' : 'OK', estadoE: t > tr ? 'mal' : 'ok' });
          if (t > tr) { placa('EL CABLE PATINA', 200, 290 - 20, { al: 'center', f: P.mal }); alerta(470, 60, 26, t); }
        } else {
          var tf = t > 15;
          dibLimitador(t, { v: tf ? 0 : 1, ang: integ(function (x) { return x > 15 ? 0 : 2.2; }, t), abre: tf ? 0.75 : 0.33 + ph(t, 13, 15) * 0.4, sucio: true, contacto: tf, traba: tf, cab: 120, offCable: integ(function (x) { return x > 15 ? 0 : 1; }, t) * 13, estado: tf ? 'DISPARÓ A 1 m/s' : 'OK', estadoE: tf ? 'mal' : 'ok' });
        }
      }
    }
  });

  // ---------- cerradura de puerta de piso y patín ----------
  function dibCerradura(t, o) {
    var s = o.s, base = Math.max(0, s - 14);
    rr(0, 250, 640, 110, 0, P.muro2);
    rr(150 + base, 250, 300, 110, 0, P.inox, P.aceroOsc, 1.5);
    rr(196 + base, 60, 248, 186, 4, P.aceroOsc, P.hierro, 2);
    // traba fija (en el marco, no se mueve con la hoja)
    rr(214, 116, 34, 40, 3, P.hierro);
    var th = o.th, px = 392 + base, py = 108;
    g.save(); g.translate(px, py); g.rotate(-th);
    rr(-150, -8, 156, 16, 4, P.acero, P.hierro, 2);
    g.beginPath(); g.moveTo(-150, -8); g.lineTo(-166, -8); g.lineTo(-166, 30); g.lineTo(-150, 30); g.lineTo(-150, 16); g.lineTo(-156, 16); g.lineTo(-156, 8); g.lineTo(-150, 8); g.closePath();
    g.fillStyle = P.acero; g.fill(); g.strokeStyle = P.hierro; g.lineWidth = 2; g.stroke();
    rr(-96, 8, 26, 10, 2, o.quemado ? '#2a2a2a' : P.cobre);
    g.restore(); cr(px, py, 6, P.acento);
    rr(266 + base, 132, 40, 26, 2, P.goma); ln([272 + base, 132, 272 + base, 124], P.cobre, 3); ln([300 + base, 132, 300 + base, 124], P.cobre, 3);
    if (o.quemado && o.chispa) chispas(286 + base, 128, t, 6, 12);
    // ruedas de la cerradura: una fija, otra que mueve el gancho
    var rm = Math.min(14, s);
    ln([368 + base + rm, 212, 392 + base, 120], P.hierro, 4);
    cr(330 + base, 212, 15, P.goma, P.hierro, 2); cr(368 + base + rm, 212, 15, P.goma, P.hierro, 2);
    // patín de la puerta de cabina
    var pv = o.pv, ps = s + (o.desv || 0);
    rr(306 + ps, 150 + pv, 8, 120, 2, P.azul); rr(394 + ps, 150 + pv, 8, 120, 2, P.azul);
    rr(306 + ps, 150 + pv, 96, 8, 2, P.azul);
    if (o.golpe) { chispas(360 + (o.desv || 0), 196, t, 8, 18); }
    if (o.siete) { ln([214, 160, 248, 160], P.acento, 2); tx('≥ 7 mm', 232, 176, { al: 'center', t: 15, c: P.tinta, w: 700 }); }
  }
  esc('cerradura', {
    funciona: {
      dur: 18,
      subt: [[0, 'Cada puerta de piso tiene una cerradura: un gancho que la traba y un contacto eléctrico que confirma que está trabada.'],
        [2, 'Cuando la cabina llega al piso, el patín de la puerta de cabina baja y queda justo entre las dos ruedas de la cerradura.'],
        [6, 'Al abrir, el patín empuja una rueda: el gancho se levanta, el contacto se abre y la puerta de piso se va junto con la de cabina.'],
        [12, 'Al cerrar, el gancho cae en su traba y el contacto se cierra. Solo con todos los contactos de puertas cerrados el ascensor se puede mover.']],
      dib: function (t, k) {
        var s = kf(t, [[0, 0], [6, 0], [7.2, 14], [10, 110], [12, 110], [14.5, 14], [15.4, 0]]);
        var th = cl(Math.min(s, 14) / 14) * 0.28, cerrado = th < 0.05;
        dibCerradura(t, { s: s, th: th, pv: kf(t, [[0, -170], [2, -170], [5, 0]]) });
        tabla(466, 20, 160, [['GANCHO', cerrado ? 'TRABADO' : 'LIBRE', cerrado ? 'ok' : 'ac'], ['CONTACTO', cerrado ? 'CERRADO' : 'ABIERTO', cerrado ? 'ok' : 'ac'], ['SERIE', cerrado ? 'OK' : 'ABIERTA', cerrado ? 'ok' : 'mal']]);
        if (t < 2) { rotulo('Gancho', 260, 104, 80, 40); rotulo('Contacto', 286, 145, 80, 200); }
        if (entre(t, 2, 6)) rotulo('Patín', 354, 220, 520, 230);
        if (k.foco === 'patin' && t > 6) foco(354 + s, 200, 50, t);
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Contacto quemado, sucio o desajustado: el gancho traba, pero el contacto no cierra bien. El ascensor no arranca, o se para entre pisos cuando la puerta vibra.'],
        [7, 'Patín o ruedas desalineados: el patín golpea la rueda al llegar, o no la alcanza y la puerta de ese piso no abre.'],
        [13, 'Se revisa: que el gancho muerda al menos 7 mm antes de que cierre el contacto, el puente del contacto, las ruedas de goma y la alineación patín-ruedas piso por piso. Un contacto de puerta nunca se puentea para hacer andar el ascensor.']],
      dib: function (t) {
        if (t < 7) {
          var vib = ruido(Math.floor(t * 6)) > 0.6, th = vib ? 0.02 : 0;
          dibCerradura(t, { s: 0, th: th, pv: 0, quemado: true, chispa: vib });
          tabla(466, 20, 160, [['GANCHO', 'TRABADO', 'ok'], ['CONTACTO', vib ? 'ABIERTO' : 'CERRADO', vib ? 'mal' : 'ok'], ['SERIE', 'ABRE Y CIERRA', 'mal']]);
          alerta(286, 140, 30, t);
        } else if (t < 13) {
          var pv = kf(t, [[7, -170], [9.5, -30]]);
          dibCerradura(t, { s: 0, th: 0, pv: pv, desv: 30, golpe: entre(t, 9.4, 10.2) });
          tabla(466, 20, 160, [['PATÍN', 'DESALINEADO', 'mal'], ['PUERTA', t > 10 ? 'NO ABRE' : '—', t > 10 ? 'mal' : '']]);
        } else {
          dibCerradura(t, { s: 0, th: 0, pv: 0, siete: true });
          tabla(466, 20, 160, [['GANCHO', 'TRABADO', 'ok'], ['CONTACTO', 'CERRADO', 'ok'], ['SERIE', 'OK', 'ok']]);
        }
      }
    }
  });

  // ---------- amortiguadores ----------
  function dibFoso(t, o) {
    rr(120, 0, 400, 340, 0, null, P.linea, 2);
    ln([60, 150, 120, 150], P.tinta2, 3); tx('P1', 52, 150, { al: 'right', t: 15, c: P.tinta2 }); tx('nivel', 52, 168, { al: 'right', t: 13, c: P.tinta2 });
    rr(120, 340, 400, 20, 0, P.muro2);
    var cb = o.cb, comp = Math.max(0, cb - 232);
    var bx = 220, top = 232 + comp, malo = o.malo;
    rr(bx - 26, 330, 52, 10, 2, P.hierro);
    if (o.tipo === 'pu') { rr(bx - 20, top, 40, 330 - top, 6, malo ? '#a8742a' : P.acento, P.hierro, 2); if (malo) { ln([bx - 10, top + 20, bx, top + 40, bx - 6, top + 60], P.hierro, 2); } }
    else resorte(bx, 330, bx, top, 8, 16, malo ? '#8b5a2b' : P.cobre, 4);
    resorte(430, 330, 430, 270, 6, 12, P.cobre, 4);
    rr(410, 120, 40, 110, 2, P.aceroOsc, P.hierro, 2);
    rr(150, cb - 140, 150, 140, 3, P.inox, P.aceroOsc, 2); rr(150, cb - 8, 150, 8, 0, P.aceroOsc);
    if (o.golpe) chispas(bx, top, t, 8, 20);
  }
  esc('amortiguador', {
    funciona: {
      dur: 14,
      subt: [[0, 'Los amortiguadores están en el foso, bajo la cabina y bajo el contrapeso. En un viaje normal la cabina nunca los toca.'],
        [5, 'Solo trabajan si algo falla y la cabina se pasa del último nivel: el amortiguador recibe el golpe y frena la cabina de forma controlada.'],
        [10, 'Los de resorte o de poliuretano son para velocidades bajas; los de aceite, para velocidades más altas, y llevan un contacto que vigila que el vástago regrese.']],
      dib: function (t) {
        var cb = kf(t, [[0, 40], [3, 150], [6.5, 150], [8.6, 238], [9.3, 262], [10.4, 248]]);
        dibFoso(t, { cb: cb, tipo: 'resorte' });
        if (t < 5) { rotulo('Amortiguador de cabina', 220, 280, 300, 300); rotulo('Del contrapeso', 430, 300, 560, 260); }
        if (t > 8.5) placa('SE PASÓ DEL NIVEL', 225, 20, { al: 'center', f: P.mal });
      }
    },
    falla: {
      dur: 14,
      subt: [[0, 'El poliuretano se endurece y se agrieta con los años, el resorte se oxida y al amortiguador de aceite le baja el nivel.'],
        [5, 'Un amortiguador malo no se nota en el uso diario. Se nota el día que la cabina se pasa: el golpe llega casi entero al bastidor y a los pasajeros.'],
        [10, 'Se revisa: grietas y dureza del poliuretano, el nivel de aceite y que el vástago suba solo y cierre su contacto.']],
      dib: function (t) {
        var cb = kf(t, [[0, 150], [5, 150], [6.6, 238], [6.8, 246], [7.4, 240]]);
        g.save(); if (entre(t, 6.6, 7.6)) g.translate(Math.sin(t * 60) * 4, 0);
        dibFoso(t, { cb: cb, tipo: 'pu', malo: true, golpe: entre(t, 6.6, 7.2) }); g.restore();
        alerta(220, 280, 40, t);
      }
    }
  });

  // ---------- finales de carrera ----------
  function dibFinales(t, o) {
    rr(160, 0, 320, 360, 0, null, P.linea, 2); rr(160, 0, 320, 14, 0, P.muro2);
    ln([110, 110, 160, 110], P.tinta2, 3); tx('último piso', 104, 110, { al: 'right', t: 14, c: P.tinta2 });
    var ct = o.ct;
    rr(200, ct, 150, 150, 3, P.inox, P.aceroOsc, 2);
    g.beginPath(); g.moveTo(356, ct + 20); g.lineTo(366, ct + 34); g.lineTo(366, ct + 94); g.lineTo(356, ct + 108); g.closePath(); g.fillStyle = P.aceroOsc; g.fill();
    [[60, 'Final de carrera', o.finMalo], [96, 'Parada en extremo', false]].forEach(function (q) {
      var y = q[0], toca = ct + 30 < y + 10 && ct + 100 > y - 10 && !q[2];
      rr(420, y - 14, 36, 28, 3, P.goma); ln([420, y, 380 + (toca ? 8 : 0), y - (toca ? 10 : 0)], P.acero, 3); cr(380 + (toca ? 8 : 0), y - (toca ? 10 : 0), 8, q[2] ? P.rayo : P.goma, P.hierro, 1.5);
      led(438, y - 22, true, toca ? P.rayo : P.verde, 4);
      tx(q[1], 470, y, { t: 15, c: P.tinta2 });
    });
  }
  esc('finales', {
    funciona: {
      dur: 14,
      subt: [[0, 'Cerca de cada extremo del recorrido hay interruptores con una ruedita, y en la cabina una leva (rampa) que los empuja al pasar.'],
        [4, 'En un viaje normal la cabina para en el último piso antes de tocar el final de carrera.'],
        [8, 'Si la cabina se pasa por una falla, la leva empuja el final de carrera: se abre la serie, se corta el motor y cae el freno antes de que la cabina choque.']],
      dib: function (t) {
        var ct = kf(t, [[0, 220], [4, 110 - 40], [7, 110 - 40], [9.5, 20], [10, 22]]);
        dibFinales(t, { ct: ct });
        if (t > 9.5) { estado('SERIE ABIERTA: PARADA', 320, 340, true); }
      }
    },
    falla: {
      dur: 14,
      subt: [[0, 'Rueda rota, leva corrida o tornillos flojos: el final no actúa y la cabina puede llegar al amortiguador o al techo del hueco.'],
        [5, 'Final desajustado hacia adentro: actúa antes de tiempo, la cabina se bloquea al llegar al último piso y el ascensor queda fuera de servicio.'],
        [10, 'Se revisa que la leva pase centrada sobre la rueda, que el brazo vuelva solo y que el contacto abra bien.']],
      dib: function (t) {
        var ct = kf(t, [[0, 200], [3, 4], [5, 4]]);
        dibFinales(t, { ct: ct, finMalo: t < 10 });
        if (entre(t, 3, 10)) { alerta(380, 60, 22, t); placa('NO ACTUÓ', 320, 340, { al: 'center', f: P.mal }); }
      }
    }
  });

  // ---------- sensores de posición ----------
  function dibPosicion(t, o) {
    rr(170, 0, 240, 360, 0, null, P.linea, 2);
    var pisos = [300, 190, 80];
    pisos.forEach(function (y, i) {
      ln([130, y, 170, y], P.tinta2, 3); tx('P' + (i + 1), 122, y, { al: 'right', t: 15, c: P.tinta2 });
      var yy = y - 24 + (o.corrida && i === 1 ? 10 : 0);
      rr(380, yy - 24, 12, 40, 2, o.corrida && i === 1 ? P.rayo : P.aceroOsc);
    });
    var cb = o.cb;
    rr(200, cb - 110, 150, 110, 3, P.inox, P.aceroOsc, 2);
    var sy = cb - 44;
    rr(372, sy - 12, 28, 6, 1, P.goma); rr(372, sy + 6, 28, 6, 1, P.goma); rr(398, sy - 12, 6, 24, 1, P.goma); ln([350, sy, 372, sy], P.hierro, 3);
    var en = false; pisos.forEach(function (y, i) { var yy = y - 24 + (o.corrida && i === 1 ? 10 : 0); if (sy > yy - 26 && sy < yy + 18) en = true; });
    led(386, sy, true, en ? P.acento : P.aceroOsc, 3);
    rr(470, 30, 120, 86, 4, P.placa); tx(o.display, 530, 76, { al: 'center', c: '#ff5a3c', t: 50, m: 1, w: 500 });
    tabla(440, 140, 190, [['ZONA DE PISO', en ? 'SÍ' : 'NO', en ? 'ac' : ''], ['NIVEL', o.nivel, o.nivelE || 'ok']]);
  }
  esc('posicion', {
    funciona: {
      dur: 15,
      subt: [[0, 'En cada piso hay una marca fija en el hueco (pantalla, bandera o imán) y la cabina lleva un sensor que la lee al pasar.'],
        [5, 'Con esas lecturas el tablero sabe en qué piso está, cuándo bajar la velocidad y en qué punto exacto parar a nivel.'],
        [10, 'En los equipos modernos se suma el encoder o una cinta magnética: el sensor de piso confirma y corrige la posición.']],
      dib: function (t) {
        var cb = kf(t, [[0, 300], [2, 300], [6, 190], [8, 190], [12, 80], [15, 80]]);
        var piso = cb > 245 ? '1' : cb > 135 ? '2' : '3';
        dibPosicion(t, { cb: cb, display: piso, nivel: Math.abs(cb - 300) < 1 || Math.abs(cb - 190) < 1 || Math.abs(cb - 80) < 1 ? 'A NIVEL' : 'VIAJANDO' });
        if (t < 5) rotulo('Pantalla o imán', 386, 266, 470, 230);
      }
    },
    falla: {
      dur: 15,
      subt: [[0, 'Pantalla o imán corrido, o sensor sucio: la cabina para desnivelada y queda un escalón con el piso.'],
        [5, 'Si el tablero pierde la cuenta de pisos, lleva la cabina vacía a un extremo para volver a contar (viaje de corrección) o queda fuera de servicio.'],
        [10, 'Se revisa la alineación de cada pantalla con la cabina a nivel, la distancia al sensor y su conector.']],
      dib: function (t) {
        if (t < 5) {
          var cb = kf(t, [[0, 300], [3, 200]]);
          dibPosicion(t, { cb: cb, display: '2', corrida: true, nivel: t > 3 ? 'ESCALÓN' : 'VIAJANDO', nivelE: t > 3 ? 'mal' : '' });
          if (t > 3) { ln([200, 190, 350, 190], P.rayo, 2, [5, 4]); tx('escalón', 210, 206, { t: 15, c: P.rayo, w: 700 }); }
        } else {
          var cb2 = kf(t, [[5, 200], [6, 200], [9.5, 300], [15, 300]]);
          dibPosicion(t, { cb: cb2, display: t < 9.5 ? '?' : '1', nivel: t < 9.5 ? 'CORRECCIÓN' : 'A NIVEL', nivelE: t < 9.5 ? 'ac' : 'ok' });
        }
      }
    }
  });

  // ---------- pesacargas ----------
  function dibPesacargas(t, n, mide) {
    rr(110, 30, 290, 300, 4, P.interior, P.aceroOsc, 3);
    for (var i = 0; i < n; i++) persona(142 + (i % 5) * 54 + (i > 4 ? 26 : 0), 318 - (i > 4 ? 0 : 6), i > 4 ? 172 : 184, i > 4 ? P.tinta2 : P.aceroOsc, 1);
    rr(110, 318, 290, 12, 0, P.aceroOsc); [140, 255, 370].forEach(function (x) { rr(x - 12, 330, 24, 10, 2, P.cobre); });
    var carga = mide == null ? n * 75 / 630 : mide, col = carga > 1 ? P.rayo : carga > 0.8 ? P.acento : P.ok;
    rr(460, 50, 50, 270, 4, P.sup2, P.linea, 2);
    rr(464, 316 - 262 * Math.min(1.15, carga) / 1.15, 42, 262 * Math.min(1.15, carga) / 1.15, 3, col);
    [[0.8, 'COMPLETO'], [1, 'SOBRECARGA']].forEach(function (q) { var y = 316 - 262 * q[0] / 1.15; ln([456, y, 516, y], P.tinta, 2, [4, 3]); tx(q[1], 522, y, { t: 14, c: P.tinta2 }); });
    tx(Math.round(carga * 630) + ' kg', 485, 36, { al: 'center', t: 16, m: 1, w: 500 });
    if (carga > 1) { estado('SOBRECARGA', 255, 18, true); ondas(380, 60, t, P.rayo, 0); }
  }
  esc('pesacargas', {
    funciona: {
      dur: 16,
      subt: [[0, 'El pesacargas mide el peso de la cabina con sensores bajo el piso, en los cables o en el bastidor.'],
        [4, 'Cerca del 80 % de la carga, muchos tableros dejan de atender llamadas de pasillo: la cabina va llena.'],
        [9.5, 'Si se pasa de la carga nominal, suena el zumbador, se enciende el aviso de sobrecarga y la puerta no cierra hasta que alguien baje.']],
      dib: function (t) { var n = t < 10 ? Math.min(8, Math.floor(t / 1.1)) : t < 13.5 ? 9 : 8; dibPesacargas(t, n); }
    },
    falla: {
      dur: 15,
      subt: [[0, 'Sensor descalibrado o con el cable dañado: marca sobrecarga con poca gente y el ascensor no sale.'],
        [5, 'Al revés, si mide de menos, deja viajar la cabina sobrecargada: el freno y la tracción trabajan al límite.'],
        [10, 'Se calibra con pesas conocidas: cabina vacía (cero) y una carga de referencia, siguiendo el manual del pesacargas.']],
      dib: function (t) {
        if (t < 5) dibPesacargas(t, 3, kf(t, [[0, 0.36], [2, 1.05]]));
        else if (t < 10) dibPesacargas(t, 10, 0.6);
        else dibPesacargas(t, 0, kf(t, [[10, 0], [13, 0.5]]));
        if (t >= 10) { rr(200, 250, 110, 66, 4, P.aceroOsc, P.hierro, 2); tx('pesas', 255, 284, { al: 'center', c: P.placaT, t: 16 }); }
      }
    }
  });

  // ---------- tablero y tarjetas (electrónica) ----------
  function paquete(pts, k, c) {   // un punto que recorre una línea quebrada; k de 0 a 1
    var L = 0, seg = [];
    for (var i = 2; i < pts.length; i += 2) { var l = Math.hypot(pts[i] - pts[i - 2], pts[i + 1] - pts[i - 1]); seg.push(l); L += l; }
    var d = cl(k) * L;
    for (i = 0; i < seg.length; i++) { if (d <= seg[i]) { var f = d / (seg[i] || 1); cr(mix(pts[i * 2], pts[i * 2 + 2], f), mix(pts[i * 2 + 1], pts[i * 2 + 3], f), 6, c || P.acento, P.hierro, 1.5); return; } d -= seg[i]; }
  }
  function dibTablero(t, o) {
    rr(14, 20, 220, 320, 6, P.placa);
    tx('TABLERO', 124, 36, { al: 'center', c: P.placaT, t: 16 });
    rr(26, 50, 92, 46, 3, o.fuente ? '#55363a' : '#34424e'); tx('FUENTE', 72, 64, { al: 'center', c: P.placaT, t: 13 }); tx(o.v24 || '24 V', 72, 84, { al: 'center', c: o.fuente ? '#ff6b5e' : '#4cd68f', t: 14, m: 1, w: 500 });
    if (o.fuente) { cr(108, 60, 7, '#2b4c8a'); g.globalAlpha = 0.9; cr(108, 56, 6, '#b8c6d9'); g.globalAlpha = 1; }
    rr(26, 106, 196, 110, 3, P.pcb); rr(90, 136, 60, 50, 3, P.hierro); tx('CPU', 120, 161, { al: 'center', c: P.placaT, t: 15 });
    for (var i = 0; i < 4; i++) led(40 + i * 14, 120, o.apagado ? false : (i === 0 ? true : late(t + i, 1.3) > 0.5), i === 3 && o.errorLed ? P.rayo : P.verde, 3.5);
    rr(26, 226, 92, 100, 3, '#3a4651'); tx('RELÉS Y', 72, 256, { al: 'center', c: P.placaT, t: 13 }); tx('CONTACTORES', 72, 274, { al: 'center', c: P.placaT, t: 13 });
    led(72, 302, o.contactor, P.acento, 6);
    rr(128, 226, 94, 100, 3, '#3a4651'); tx('VARIADOR', 175, 266, { al: 'center', c: P.placaT, t: 13 });
    // bus
    var bus = P.azul;
    ln([222, 160, 300, 160], bus, 3); ln([300, 46, 300, 330], bus, 3); ln([300, 330, 556, 330, 556, 226], bus, 3);
    rr(292, 36, 16, 10, 1, P.cobre); tx('120 Ω', 312, 40, { t: 12, c: P.tinta2, m: 1, w: 500 });
    if (o.corte) cruz(300, 238, 9);
    var pisos = [[3, 46], [2, 146], [1, 246]];
    pisos.forEach(function (q, i) {
      var y = q[1], dir = o.dirs ? o.dirs[i] : q[0], mudo = o.mudo === q[0], foco_ = o.focoPiso;
      ln([300, y + 24, 330, y + 24], bus, 3);
      rr(330, y, 120, 48, 4, P.pcb, foco_ ? P.acento : null, 2);
      tx('PISO ' + q[0], 340, y + 16, { c: '#e6fff2', t: 14 }); tx('dir ' + dir, 340, y + 34, { c: o.dirs && o.dirs[0] === o.dirs[1] && i < 2 ? '#ff6b5e' : '#bde', t: 12, m: 1, w: 500 });
      led(430, y + 24, o.llamada === q[0], P.acento, 6);
      if (mudo) { placa('SIN COMUNICACIÓN', 390, y + 64, { al: 'center', f: P.mal, t: 13 }); }
    });
    rr(486, 140, 140, 86, 4, P.pcb, o.focoCabina ? P.acento : null, 2); tx('TARJETA DE', 556, 166, { al: 'center', c: '#e6fff2', t: 13 }); tx('CABINA', 556, 184, { al: 'center', c: '#e6fff2', t: 13 });
    led(556, 208, !o.apagado, P.verde, 4);
    if (o.apagado) { g.globalAlpha = 0.45; rr(0, 0, W, H, 0, '#000'); g.globalAlpha = 1; }
  }
  esc('tablero', {
    funciona: {
      dur: 18,
      subt: [[0, 'El tablero es el cerebro: una fuente de 24 V, la tarjeta principal (CPU), los relés y contactores, y el enlace con el variador.'],
        [4, 'Las botoneras de piso y de cabina tienen su propia tarjeta. Hablan con la CPU por un bus serie (CAN o RS-485) de pocos cables.'],
        [9, 'Al registrar una llamada, la CPU revisa la serie de seguridades, cierra los contactores y le ordena al variador mover la cabina.'],
        [13, 'Cada tarjeta tiene una dirección (su piso), y el bus lleva una resistencia de 120 Ω en cada punta para que los mensajes no reboten.']],
      dib: function (t, k) {
        var llam = entre(t, 6.2, 14.5) ? 2 : 0;
        dibTablero(t, { llamada: llam, contactor: entre(t, 9.5, 14.5), focoPiso: k.foco === 'botonera_piso' || entre(t, 4, 6), focoCabina: k.foco === 'caja_techo' || k.foco === 'botonera_cabina' });
        if (entre(t, 4.5, 5.8)) paquete([430, 170, 300, 170, 300, 160, 222, 160], ph(t, 4.5, 5.8));
        if (entre(t, 5.8, 6.4)) paquete([222, 160, 300, 160, 300, 170, 430, 170], ph(t, 5.8, 6.4), P.verde);
        if (entre(t, 9, 9.6)) paquete([120, 216, 72, 280], ph(t, 9, 9.6));
        for (var i = 0; i < 3; i++) { var kk = ((t * 0.35 + i / 3) % 1); paquete([222, 160, 300, 160, 300, 330, 556, 330, 556, 226], kk, P.azul); }
        if (t < 4) { rotulo('Tarjeta principal', 120, 140, 260, 20); }
      }
    },
    falla: {
      dur: 22,
      subt: [[0, 'Fuente de 24 V débil (condensadores hinchados o secos): las tarjetas se reinician solas, los botones fallan y aparecen errores sin lógica.'],
        [6, 'Bus cortado, un conector suelto o sin su resistencia final: las tarjetas de más allá del corte quedan sin comunicación y sus botones no responden.'],
        [12, 'Dos tarjetas con la misma dirección: al llamar en un piso se registra otro. Pasa mucho después de cambiar una tarjeta de piso sin configurarla.'],
        [17, 'Antes de cambiar una tarjeta: medir la fuente, revisar fusibles, conectores, humedad y la dirección. Muchas «tarjetas malogradas» no lo están.']],
      dib: function (t) {
        if (t < 6) { var cae = ph(t, 1, 3), off = t > 3 && ruido(Math.floor(t * 5)) > 0.5; dibTablero(t, { fuente: true, v24: (24 - 7 * cae).toFixed(0) + ' V', apagado: off, errorLed: true }); }
        else if (t < 12) { dibTablero(t, { corte: true, mudo: 1, errorLed: true }); var kk = ph(t, 7, 8.5); if (t < 8.6) paquete([222, 160, 300, 160, 300, 238], kk / 0.9, P.azul); }
        else if (t < 17) { dibTablero(t, { dirs: ['2', '2', '1'], llamada: t > 13.5 ? 2 : 0 }); if (entre(t, 12.5, 13.5)) { rr(410, 56, 26, 18, 6, P.azul); tx('pulsa', 448, 66, { t: 13, c: P.azul }); } if (t > 13.5) placa('Llamó el 3 y se registró el 2', 390, 120, { al: 'center', f: P.mal, t: 14 }); }
        else dibTablero(t, {});
      }
    }
  });

  // ---------- variador ----------
  function dibVariador(t, o) {
    var bloques = [[16, 'RED', 72], [104, 'RECTIFICADOR', 104], [226, 'BUS DC', 110], [354, 'INVERSOR', 110], [482, 'MOTOR', 140]];
    bloques.forEach(function (b) { rr(b[0], 120, b[2], 100, 4, P.placa); tx(b[1], b[0] + b[2] / 2, 136, { al: 'center', c: P.placaT, t: 12 }); });
    for (var f = 0; f < 3; f++) { var p = []; for (var x = 0; x <= 52; x += 3) p.push(26 + x, 186 + Math.sin(x / 52 * TAU + t * 4 - f * 2.1) * 14); ln(p, P.fase[f], 2); }
    for (var i = 0; i < 3; i++) { g.beginPath(); var dx = 124 + i * 24, dy = 186; g.moveTo(dx - 7, dy - 9); g.lineTo(dx + 7, dy - 9); g.lineTo(dx, dy + 5); g.closePath(); g.fillStyle = P.placaT; g.fill(); ln([dx - 8, dy + 6, dx + 8, dy + 6], P.placaT, 2); }
    for (i = 0; i < 3; i++) { var ccx = 248 + i * 30; ln([ccx, 158, ccx, 204], P.placaT, 1); rr(ccx - 10, 170, 20, 6, 0, o.secos && i === 1 ? '#b98a3a' : P.placaT); rr(ccx - 10, 184, 20, 6, 0, o.secos && i === 1 ? '#b98a3a' : P.placaT); }
    tx(o.vbus + ' V', 281, 210, { al: 'center', c: o.vbusE ? '#ff6b5e' : '#4cd68f', t: 14, m: 1, w: 500 });
    for (i = 0; i < 6; i++) { var sx = 368 + (i % 3) * 30, sy = (i < 3 ? 160 : 196), on = o.igbt && ((Math.floor(t * 8) + i) % 3 === 0); rr(sx, sy - 8, 20, 16, 2, o.corto && i === 4 ? P.rayo : on ? P.acento : '#4a5a68'); }
    cr(552, 180, 30, P.aceroOsc, P.placaT, 2); tx('M', 552, 181, { al: 'center', c: P.placaT, t: 18 });
    // flujo de energía
    var dir = o.frena ? -1 : 1;
    for (i = 0; i < 6; i++) { var k = ((t * 0.5 * dir + i / 6) % 1 + 1) % 1; if (o.flujo) cr(30 + k * 520, 100, 4, o.frena ? P.azul : P.acento); }
    flecha(o.frena ? 560 : 40, 86, o.frena ? 470 : 130, 86, o.frena ? P.azul : P.acento, 3);
    tx(o.frena ? 'el motor genera' : 'energía hacia el motor', o.frena ? 470 : 140, 76, { al: o.frena ? 'right' : 'left', t: 14, c: P.tinta2 });
    // resistencia de frenado
    rr(232, 256, 100, 70, 4, P.sup2, P.linea, 1.5); tx('RESISTENCIA DE FRENADO', 282, 342, { al: 'center', t: 12, m: 1, c: P.tinta2, w: 500 });
    ln([281, 220, 281, 262], P.tinta2, 2); resorte(246, 292, 318, 292, 6, 10, o.resis ? P.rayo : P.aceroOsc, 3);
    if (o.resis) { g.globalAlpha = 0.3 * late(t, 2); rr(236, 270, 92, 44, 8, P.rayo); g.globalAlpha = 1; }
    if (o.resAbierta) cruz(282, 292, 10);
  }
  esc('variador', {
    funciona: {
      dur: 18,
      subt: [[0, 'Adentro del variador hay tres etapas. El rectificador pasa la corriente alterna de la red a continua…'],
        [4, '…los condensadores del bus DC la guardan y la alisan (con red de 380 V el bus queda cerca de 540 V; con red de 220 V, cerca de 310 V)…'],
        [8.5, '…y el inversor, con transistores IGBT que conmutan miles de veces por segundo, arma las tres fases para el motor.'],
        [12.5, 'Al bajar con carga o subir vacío, el motor genera: esa energía vuelve al bus y se quema en la resistencia de frenado, o un variador regenerativo la devuelve a la red.']],
      dib: function (t) {
        var frena = t > 12.5, vb = frena ? Math.round(540 + 120 * late(t, 1)) : 540;
        dibVariador(t, { vbus: vb, igbt: t > 8.5, flujo: true, frena: frena, resis: frena });
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Condensadores secos o hinchados: el bus DC se vuelve inestable y el variador corta por bajo o sobre voltaje.'],
        [5, 'Resistencia de frenado abierta o su transistor quemado: al frenar, el voltaje del bus sube sin control y salta el error de sobrevoltaje.'],
        [10, 'Un IGBT en corto hace saltar los fusibles o la protección apenas arranca. Nunca se mide adentro sin esperar que se descarguen los condensadores.'],
        [15, 'Ventilador parado o disipador sucio: sobretemperatura en las horas de más tráfico. Es lo primero que se revisa en el mantenimiento.']],
      dib: function (t) {
        if (t < 5) dibVariador(t, { vbus: Math.round(540 + Math.sin(t * 17) * 70), vbusE: true, igbt: true, flujo: true, secos: true });
        else if (t < 10) dibVariador(t, { vbus: Math.round(kf(t, [[5, 560], [8, 820]])), vbusE: t > 7, igbt: true, flujo: true, frena: true, resAbierta: true });
        else if (t < 15) { dibVariador(t, { vbus: t > 11 ? 0 : 540, vbusE: t > 11, igbt: false, corto: true }); if (t > 11) placa('FUSIBLES ABIERTOS', 320, 40, { al: 'center', f: P.mal }); }
        else { dibVariador(t, { vbus: 540, igbt: true, flujo: true }); termometro(600, 300, 0.4 + 0.6 * ph(t, 15, 18)); }
      }
    }
  });

  // ---------- rescate automático ----------
  function dibRescate(t, o) {
    rr(250, 0, 220, 360, 0, null, P.linea, 2);
    [300, 180, 60].forEach(function (y, i) { ln([470, y, 520, y], P.tinta2, 3); tx('P' + (i + 1), 528, y, { t: 15, c: P.tinta2 }); });
    var cb = o.cb;
    rr(290, cb - 110, 140, 110, 3, P.inox, P.aceroOsc, 2);
    var ap = o.ap || 0;
    rr(360 - 36 * ap - 34, cb - 100, 34, 100, 0, P.aceroOsc); rr(360 + 36 * ap, cb - 100, 34, 100, 0, P.aceroOsc);
    persona(330, cb, 70, P.tinta2, 1);
    if (o.oscuro) { g.globalAlpha = 0.45; rr(290, cb - 110, 140, 110, 0, '#000'); g.globalAlpha = 1; }
    rr(40, 30, 110, 60, 4, P.placa); tx('RED', 95, 50, { al: 'center', c: P.placaT, t: 15 }); tx(o.red ? '220 V' : '0 V', 95, 72, { al: 'center', c: o.red ? '#4cd68f' : '#ff6b5e', t: 15, m: 1, w: 500 });
    if (!o.red) cruz(170, 60, 10);
    ln([150, 60, 250, 60], o.red ? P.acento : P.linea, 3);
    rr(40, 220, 130, 100, 6, P.placa); tx('RESCATE', 105, 238, { al: 'center', c: P.placaT, t: 14 });
    var carga = o.bat == null ? 1 : o.bat;
    rr(66, 256, 70, 36, 3, null, P.placaT, 2); rr(136, 266, 6, 16, 1, P.placaT); rr(70, 260, 62 * carga, 28, 2, carga < 0.2 ? P.rayo : P.verde);
    tx(Math.round(carga * 100) + ' %', 105, 306, { al: 'center', c: P.placaT, t: 13, m: 1, w: 500 });
    if (o.activo) { ln([170, 270, 250, 270], P.acento, 3, [8, 5], -t * 30); }
  }
  esc('rescate', {
    funciona: {
      dur: 16,
      subt: [[0, 'Si se va la luz con el ascensor en viaje, el freno cae y la cabina queda entre dos pisos.'],
        [4, 'El equipo de rescate automático detecta el corte, separa el ascensor de la red y lo alimenta con sus baterías.'],
        [8, 'La cabina va despacio hasta el piso más cercano, en el sentido que le cueste menos al motor, y abre las puertas para que la gente salga.'],
        [13, 'En los hidráulicos es más simple: la placa abre la válvula de bajada y la cabina baja sola al piso de abajo.']],
      dib: function (t) {
        var cb = kf(t, [[0, 290], [2.5, 236], [8, 236], [11.5, 180]]);
        dibRescate(t, { cb: cb, red: t < 2.5, oscuro: entre(t, 2.5, 6), activo: t > 5, bat: t > 5 ? 1 - ph(t, 5, 13) * 0.2 : 1, ap: ph(t, 11.8, 13) });
        if (entre(t, 2.5, 5)) placa('CORTE DE LUZ', 360, 20, { al: 'center', f: P.mal });
      }
    },
    falla: {
      dur: 14,
      subt: [[0, 'Baterías agotadas o que ya no cargan: llega el corte, el rescate no tiene energía y la gente queda atrapada hasta que llega el técnico.'],
        [5, 'Las baterías de plomo duran pocos años, y el calor del cuarto de máquinas las acorta.'],
        [9, 'El rescate se prueba en el mantenimiento cortando la energía de verdad, y se anota la fecha en que se cambiaron las baterías.']],
      dib: function (t) { dibRescate(t, { cb: 236, red: false, oscuro: true, activo: false, bat: 0.08 }); if (t > 1) placa('SIN ENERGÍA PARA RESCATAR', 360, 20, { al: 'center', f: P.mal }); }
    }
  });

  // ---------- hidráulico ----------
  function dibHidraulico(t, o) {
    rr(20, 250, 190, 96, 4, P.aceroOsc, P.hierro, 2);
    g.globalAlpha = 0.85; rr(24, 270 + (o.nivelBaja || 0), 182, 72 - (o.nivelBaja || 0), 2, P.aceite); g.globalAlpha = 1;
    tx('TANQUE', 160, 330, { al: 'center', c: P.placaT, t: 13 });
    cr(70, 304, 20, P.hierro, P.acero, 2); polea(70, 304, 14, o.bomba ? t * 12 : 0, P.aceroOsc, P.acero); tx('BOMBA', 70, 334, { al: 'center', c: P.placaT, t: 12 });
    rr(100, 220, 100, 30, 3, P.hierro); tx('VÁLVULAS', 150, 236, { al: 'center', c: P.placaT, t: 12 }); led(186, 228, true, o.valvula ? P.acento : P.aceroOsc, 4);
    cr(118, 206, 11, P.sup2, P.hierro, 2); ln([118, 206, 118 + Math.cos(-PI / 2 + o.presion * 2) * 8, 206 + Math.sin(-PI / 2 + o.presion * 2) * 8], P.rayo, 2);
    ln([200, 236, 260, 236, 260, 340, 360, 340], P.goma, 8);
    if (o.revienta) { chispas(300, 340, t, 0); for (var i = 0; i < 8; i++) { var k = ((t * 1.4 + i / 8) % 1); cr(300 + i * 3 - 10, 336 - k * 60, 3, P.aceite); } }
    var rod = o.rod;
    rr(352, 150, 40, 194, 3, P.aceroOsc, P.hierro, 2);
    rr(364, rod, 16, 152 - rod, 2, P.inox, P.acero, 1);
    rr(352, 330, 40, 16, 2, o.rotura ? P.rayo : P.hierro); tx('válvula paracaídas', 400, 352, { t: 12, c: P.tinta2 });
    if (o.gota) for (i = 0; i < 3; i++) { var kk = ((t * 0.8 + i / 3) % 1); cr(392, 152 + kk * 40, 3, P.aceite); }
    var R = 22;
    polea(372, rod, R, -(150 - rod) / R * 2, P.acero, P.hierro);
    ln([350, 346, 350, rod], P.hierro, 2.5); ln([394, rod, 394, o.cab + 10], P.hierro, 2.5);
    rr(394, o.cab, 26, 120, 2, P.aceroOsc, P.hierro, 1.5); rr(420, o.cab, 150, 120, 3, P.inox, P.aceroOsc, 2);
    [[300 - 0, 'P1'], [180, 'P2'], [60, 'P3']].forEach(function (q) { ln([580, q[0], 620, q[0]], P.tinta2, 3); tx(q[1], 600, q[0] - 12, { al: 'center', t: 14, c: P.tinta2 }); });
    if (o.flujo) { var pts = o.flujo > 0 ? [70, 290, 150, 236, 260, 236, 260, 340, 372, 340] : [372, 340, 260, 340, 260, 236, 150, 236, 120, 290]; for (i = 0; i < 4; i++) paquete(pts, ((t * 0.6 + i / 4) % 1), o.flujo > 0 ? P.acento : P.azul); }
  }
  esc('hidraulico', {
    funciona: {
      dur: 18,
      subt: [[0, 'En el hidráulico no hay contrapeso ni máquina arriba: una bomba empuja aceite a un pistón que levanta la cabina.'],
        [3, 'Para subir, el motor y la bomba mandan aceite a presión al cilindro. Con el pistón al costado y poleas 2:1, la cabina sube el doble de lo que sale el vástago.'],
        [11, 'Para bajar no se usa el motor: el bloque abre una válvula y el peso de la cabina devuelve el aceite al tanque, a velocidad controlada.'],
        [15.5, 'En la entrada del cilindro va la válvula paracaídas: si la manguera revienta, cierra el paso y la cabina no cae.']],
      dib: function (t, k) {
        var sube = kf(t, [[0, 0], [3, 0], [9, 60], [11, 60], [15.5, 0]]);
        dibHidraulico(t, { rod: 150 - sube, cab: 180 - sube * 2, bomba: entre(t, 3, 9), valvula: entre(t, 11, 15.5), flujo: entre(t, 3, 9) ? 1 : entre(t, 11, 15.5) ? -1 : 0, presion: entre(t, 3, 9) ? 1 : 0.4 });
        var f = { central_hidraulica: [115, 290, 70], bloque_valvulas: [150, 230, 40], piston: [372, 250, 50], polea_piston: [372, 150 - sube, 30], manguera: [300, 340, 30], valvula_rotura: [372, 338, 26], recoge_aceite: [372, 160, 26] }[k.foco];
        if (f && t > 1) foco(f[0], f[1], f[2], t);
      }
    },
    falla: {
      dur: 20,
      subt: [[0, 'Sellos del pistón gastados: el aceite pasa y la cabina «se va de piso» despacio. El tablero la renivela, pero cada vez más seguido.'],
        [7, 'Si una manguera revienta, la válvula paracaídas cierra de golpe: la cabina se detiene y no cae. Queda fuera de servicio hasta reparar.'],
        [13, 'Aceite muy caliente (mucho tráfico) o muy frío: la cabina va lenta, no nivela, o el sensor de temperatura del aceite la saca de servicio.']],
      dib: function (t) {
        if (t < 7) {
          var baja = kf(t, [[0, 0], [4, 5], [4.6, 5], [5.4, 0], [7, 2]]);
          dibHidraulico(t, { rod: 90 + baja / 2, cab: 60 + baja, gota: true, bomba: entre(t, 4.6, 5.4), flujo: entre(t, 4.6, 5.4) ? 1 : 0, presion: 0.5 });
          if (baja > 2) { ln([420, 60, 570, 60], P.rayo, 2, [5, 4]); tx('se va de piso', 430, 46, { t: 15, c: P.rayo, w: 700 }); }
        } else if (t < 13) {
          var cae = kf(t, [[7, 0], [8, 0], [8.3, 6]]);
          dibHidraulico(t, { rod: 120 + cae / 2, cab: 120 + cae, revienta: t > 8, rotura: t > 8.3, presion: 0, nivelBaja: ph(t, 8, 12) * 10 });
          if (t > 8.5) placa('VÁLVULA PARACAÍDAS CERRADA', 470, 20, { al: 'center', f: P.mal });
        } else {
          dibHidraulico(t, { rod: 120, cab: 120, presion: 0.4 }); termometro(240, 320, 0.4 + 0.5 * ph(t, 13, 17));
        }
      }
    }
  });

  // ---------- botoneras y tarjeta de piso ----------
  function dibBus(t, o) {
    rr(30, 50, 110, 260, 6, P.inox, P.aceroOsc, 2);
    rr(48, 70, 74, 40, 3, P.placa); tx(o.display || '2', 85, 91, { al: 'center', c: '#ff5a3c', t: 26, m: 1, w: 500 });
    [[150, '▲'], [215, '▼']].forEach(function (q, i) {
      var on = i === 0 && o.luz;
      cr(85, q[0], 22, P.sup2, P.aceroOsc, 3); if (on) { g.globalAlpha = 0.35; cr(85, q[0], 30, P.acento); g.globalAlpha = 1; }
      cr(85, q[0], 16, on ? P.acento : P.inox); tx(q[1], 85, q[0] + 1, { al: 'center', t: 16, c: P.tinta2 });
    });
    if (o.dedo) { rr(98, 132, 44, 26, 12, P.azul); }
    rr(200, 70, 220, 210, 6, P.pcb);
    rr(270, 120, 70, 54, 3, P.hierro); tx('MCU', 305, 147, { al: 'center', c: P.placaT, t: 14 });
    rr(220, 210, 100, 34, 3, '#c8372e'); for (var i = 0; i < 4; i++) { var on = o.dip ? o.dip[i] : [0, 0, 1, 0][i]; rr(228 + i * 23, 216, 14, 22, 2, P.sup2); rr(230 + i * 23, on ? 218 : 228, 10, 8, 1, P.hierro); }
    tx('DIRECCIÓN', 270, 258, { al: 'center', c: '#e6fff2', t: 12, m: 1, w: 500 });
    led(358, 96, !o.sinV, P.verde, 4); tx('24 V', 370, 96, { c: '#e6fff2', t: 12, m: 1, w: 500 });
    var cab = ['+24 V', '0 V', 'CAN H', 'CAN L'], col = ['#e5483b', '#25292e', '#3b8fe0', '#f2b705'];
    cab.forEach(function (c, i) { var y = 196 + i * 18; rr(410, y - 6, 16, 12, 2, P.goma); ln([426, y, 480, y], col[i], 4); tx(c, 432, y - 8, { t: 10, c: P.tinta2, m: 1, w: 500 }); });
    if (o.corte) cruz(456, 232, 9);
    rr(480, 150, 140, 120, 6, P.placa); tx('TABLERO', 550, 210, { al: 'center', c: P.placaT, t: 16 });
    ln([140, 150, 200, 150], P.tinta2, 2);
  }
  esc('bus', {
    funciona: {
      dur: 16,
      subt: [[0, 'Detrás de cada botonera de piso hay una tarjeta: lee los botones, prende sus luces y conversa con el tablero por el bus.'],
        [4, 'Al pulsar, la tarjeta manda un mensaje con su dirección: «llamada de subida en el piso 2».'],
        [8, 'El tablero registra la llamada y le contesta: recién ahí se enciende la luz del botón.'],
        [11.5, 'La dirección se pone con microinterruptores (DIP), puentes o desde el tablero. Cada piso tiene la suya; si se repite, el tablero se confunde.']],
      dib: function (t) {
        dibBus(t, { dedo: entre(t, 4, 5), luz: t > 8.6 });
        if (entre(t, 4.4, 6)) paquete([140, 150, 270, 147, 340, 147, 420, 232, 480, 232, 550, 210], ph(t, 4.4, 7.6));
        if (entre(t, 6, 8)) paquete([140, 150, 270, 147, 340, 147, 420, 232, 480, 232, 550, 210], ph(t, 4.4, 7.6));
        if (entre(t, 7.8, 8.6)) paquete([550, 210, 480, 214, 420, 214, 305, 147, 85, 150], ph(t, 7.8, 8.6), P.verde);
        if (t > 11.5) { foco(270, 227, 56, t); tx('0010 = piso 2', 270, 296, { al: 'center', t: 16, m: 1, w: 500 }); }
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Pulsador pegado: la llamada queda registrada siempre y la cabina vuelve a ese piso una y otra vez.'],
        [5, 'Tarjeta sin alimentación o bus cortado: ese piso no responde y su indicador queda apagado. Lo primero es medir los 24 V en el conector.'],
        [10, 'Luz del botón quemada: la llamada funciona pero no se ve. No siempre es la tarjeta: a veces es solo el LED o el pulsador.'],
        [14, 'Al cambiarla: misma referencia, misma dirección que la vieja (foto de los DIP antes de sacarla) y probar el piso desde la cabina y desde el pasillo.']],
      dib: function (t) {
        if (t < 5) { dibBus(t, { luz: true }); alerta(85, 150, 28, t); placa('LLAMADA PERMANENTE', 320, 26, { al: 'center', f: P.mal }); }
        else if (t < 10) { dibBus(t, { sinV: true, corte: true, display: ' ' }); placa('PISO SIN RESPUESTA', 320, 26, { al: 'center', f: P.mal }); }
        else if (t < 14) { dibBus(t, { luz: false, dedo: entre(t, 10.5, 11.3) }); alerta(85, 150, 28, t); }
        else { dibBus(t, { luz: true }); foco(270, 227, 56, t); }
      }
    }
  });

  /* =================================================================
     ESCENAS TIPO, con los textos de la ficha de cada pieza
     ================================================================= */
  function frases(s) { return (String(s || '').match(/[^.!?]+[.!?]+["»)]?(\s|$)|[^.!?]+$/g) || []).map(function (x) { return x.trim(); }).filter(Boolean); }
  function juntar(lista, max) {   // une frases cortas para que cada subtítulo tenga cuerpo
    var r = [];
    lista.forEach(function (f) { if (r.length && (r[r.length - 1].length + f.length < 150) && r[r.length - 1].length < 70) r[r.length - 1] += ' ' + f; else r.push(f); });
    return r.slice(0, max);
  }
  function tiempos(textos) {
    var t = 0, s = textos.map(function (x) { var d = Math.max(3.6, Math.min(9, x.split(/\s+/).length * 0.34)); var r = [t, x]; t += d; return r; });
    return { subt: s, dur: t + 0.8 };
  }
  function textosFunciona(id, extra) {
    var c = ASC.partes[id] || {}, k = ASC.cat[id] || {};
    var l = [c.resumen || k.m].concat(juntar(frases(c.queHace), 3));
    if (extra) l.push(extra);
    return l.filter(Boolean);
  }
  function textosFalla(id, extra) {
    var c = ASC.partes[id] || {}, l = [];
    (c.fallas || []).slice(0, 3).forEach(function (f) { l.push('«' + f.sintoma.replace(/\.$/, '') + '». ' + (f.causa || '')); });
    if (extra) l.push(extra);
    var f0 = (c.fallas || [])[0];
    if (f0 && f0.revisar) l.push('Se revisa: ' + f0.revisar.charAt(0).toLowerCase() + f0.revisar.slice(1));
    if (!l.length) l.push('Esta pieza casi no falla sola; se revisa en cada mantenimiento junto con las piezas que la rodean.');
    return l;
  }
  function fabrica(nombre, dib, extraF, extraM) {
    return function (id) {
      var tf = tiempos(textosFunciona(id, extraF && extraF(id))), tm = tiempos(textosFalla(id, extraM && extraM(id)));
      return {
        funciona: { dur: tf.dur, subt: tf.subt, dib: function (t, k) { dib(t, k, false, tf); } },
        falla: { dur: tm.dur, subt: tm.subt, dib: function (t, k) { dib(t, k, true, tm); } }
      };
    };
  }
  V.fabricas = {};

  // ---------- serie de seguridades ----------
  var SERIE = [['stop_foso', 'Stop foso'], ['polea_tensora', 'Tensora'], ['finales_carrera', 'Finales'], ['limitador', 'Limitador'], ['contacto_paracaidas', 'Paracaídas'], ['caja_inspeccion', 'Stop techo'], ['contacto_puerta_cabina', 'Puerta cabina'], ['cerradura', 'Puertas piso']];
  function dibSerie(t, k, malo, tt) {
    var lista = SERIE.slice(), id = k.foco;
    if (!lista.some(function (s) { return s[0] === id; })) lista[3] = [id, (ASC.partes[id] && ASC.partes[id].nombre || id).split(' ').slice(0, 2).join(' ')];
    var n = lista.length, x0 = 70, paso = 520 / n, y = 120;
    var tAbre = malo ? 2 : tt.dur * 0.55, abierto = malo ? (t > tAbre && (t < tAbre + 3 ? ruido(Math.floor(t * 3)) > 0.35 : true)) : entre(t, tAbre, tAbre + 3.5);
    rr(16, y - 26, 50, 52, 4, P.placa); tx('110 V', 41, y, { al: 'center', c: P.placaT, t: 12, m: 1, w: 500 });
    ln([66, y, x0, y], P.tinta2, 3);
    var corte = null;
    lista.forEach(function (s, i) {
      var xa = x0 + i * paso, xb = xa + paso, mia = s[0] === id, abre = mia && abierto;
      ln([xa, y, xa + paso * 0.28, y], P.tinta2, 3); ln([xa + paso * 0.72, y, xb, y], P.tinta2, 3);
      cr(xa + paso * 0.28, y, 4, P.tinta2); cr(xa + paso * 0.72, y, 4, P.tinta2);
      var ang = abre ? -0.6 : 0;
      ln([xa + paso * 0.28, y, xa + paso * 0.28 + Math.cos(ang) * paso * 0.46, y + Math.sin(ang) * paso * 0.46], mia ? (malo || abre ? P.rayo : P.acento) : P.tinta, 3.5);
      g.save(); g.translate(xa + paso / 2, y + 30); g.rotate(-0.5); tx(s[1], 0, 0, { al: 'right', t: 14, c: mia ? P.tinta : P.tinta2, w: mia ? 700 : 600 }); g.restore();
      if (mia) { (malo ? alerta : foco)(xa + paso / 2, y, 26, t); }
      if (abre && corte == null) corte = xa + paso * 0.5;
    });
    var xf = x0 + n * paso;
    ln([xf, y, 600, y, 600, 200], P.tinta2, 3);
    var cerrado = corte == null;
    rr(560, 200, 70, 60, 4, P.placa); tx('K', 595, 222, { al: 'center', c: P.placaT, t: 15 }); led(595, 244, cerrado, P.acento, 5);
    tx('contactores', 595, 274, { al: 'center', t: 13, c: P.tinta2 });
    if (cerrado) for (var i = 0; i < 8; i++) paquete([66, y, 600, y, 600, 200], ((t * 0.25 + i / 8) % 1), P.acento);
    else for (i = 0; i < 4; i++) { var kk = ((t * 0.25 + i / 4) % 1), xx = 66 + kk * (corte - 66); cr(xx, y, 5, P.acento, P.hierro, 1.5); }
    // mini cabina: se mueve solo con la serie cerrada
    var mov = cerrado && !malo ? Math.sin(t * 0.9) * 40 : 0;
    rr(380, 300 - 40 + mov * 0.3 - 20, 70, 50, 3, P.inox, P.aceroOsc, 2); tx(cerrado ? (malo ? 'PARADO' : 'EN MARCHA') : 'PARADO', 415, 340, { al: 'center', t: 14, c: cerrado && !malo ? P.ok : P.rayo, w: 700 });
    if (malo && t > tt.dur * 0.45) {
      var pi = Math.min(lista.length, Math.floor((t - tt.dur * 0.45) / 0.9));
      var px = x0 + Math.min(pi, n) * paso, hayV = corte == null || px < corte;
      rr(80, 220, 150, 90, 6, '#e8c33a', P.hierro, 2); rr(92, 232, 126, 34, 3, '#c9d6c4'); tx(hayV ? '110 V' : '0 V', 155, 250, { al: 'center', t: 20, m: 1, w: 500, c: '#15202a' });
      ln([150, 310, px, y + 6], P.rayo, 2.5); cr(px, y + 6, 4, P.rayo);
      tx('mides punto por punto', 155, 296, { al: 'center', t: 13, c: '#15202a' });
    }
  }
  V.fabricas.serie = fabrica('serie', dibSerie, function (id) {
    var s = (ASC.seguridades || []).filter(function (x) { return x.parte === id; })[0];
    return s ? s.abre : 'Va en la serie de seguridades: si se abre, el ascensor se detiene y no arranca.';
  }, function () { return 'Para encontrar un contacto abierto, el técnico mide voltaje punto por punto a lo largo de la serie: donde el voltaje desaparece, ahí está.'; });

  // ---------- guías, rozaderas, rodaderas y aceiteras ----------
  function dibGuiado(t, k, malo, tt) {
    var id = k.foco, rec = malo ? t * 40 : Math.sin(t * 0.7) * 160, x = 320;
    var wob = malo && (id === 'rozaderas' || id === 'rodaderas' || id === 'aceiteras' || id === 'guias_cabina' || id === 'fijaciones') ? Math.sin(t * 9) * 5 : 0;
    rr(x - 9, 0, 18, H, 0, id === 'guias_cabina' || id === 'guias_contrapeso' ? (malo ? '#a3714a' : P.acero) : P.acero, P.hierro, 1.5);
    rr(x + 9, 0, 20, H, 0, P.aceroOsc);
    for (var i = 0; i < 4; i++) {
      var y = ((i * 120 - rec) % 480 + 480) % 480 - 60, mia = id === 'fijaciones';
      rr(x + 29, y, 70, 18, 2, mia ? (malo ? P.rayo : P.acento) : P.hierro); rr(x + 99, y - 12, 14, 42, 2, P.muro2);
      if (mia && malo && i === 1) cruz(x + 64, y + 9, 8);
    }
    g.save(); g.translate(wob, 0);
    rr(80, 110, 216, 30, 3, id === 'bastidor' ? (malo ? P.rayo : P.acento) : P.aceroOsc, P.hierro, 2); rr(80, 140, 30, 200, 2, P.aceroOsc, P.hierro, 2);
    tx(ASC.cat[id] && ASC.cat[id].t.indexOf('mr') >= 0 && id === 'guias_contrapeso' ? 'CONTRAPESO' : 'BASTIDOR', 188, 126, { al: 'center', c: P.placaT, t: 14 });
    if (id === 'rodaderas') {
      [[-1, 0], [1, 0], [0, 1]].forEach(function (q, i) { var cx = x + q[0] * 22 - (q[2] ? 0 : 0), cy = 150 + i * 4; polea(q[0] ? x + q[0] * 24 : x, q[0] ? 150 : 176, 13, rec / 13 * (q[0] || 1), malo && i === 0 ? '#7c4e2a' : P.goma, P.hierro); });
    } else {
      var desg = malo && (id === 'rozaderas') ? 6 : 0;
      rr(x - 30, 136, 22 - desg, 44, 2, id === 'rozaderas' ? (malo ? P.rayo : P.acento) : P.goma); rr(x + 8 + desg, 136, 22 - desg, 44, 2, id === 'rozaderas' ? (malo ? P.rayo : P.acento) : P.goma);
      rr(x - 34, 128, 68, 10, 2, P.hierro);
    }
    var acM = id === 'aceiteras';
    rr(x - 16, 88, 32, 36, 4, acM ? (malo ? P.rayo : P.acento) : P.cobre, P.hierro, 1.5);
    g.globalAlpha = 0.85; rr(x - 13, 92 + (acM && malo ? 24 : 6), 26, acM && malo ? 6 : 24, 2, P.aceite); g.globalAlpha = 1;
    if (!(acM && malo)) for (i = 0; i < 2; i++) { var kk = ((t * 0.8 + i / 2) % 1); cr(x, 126 + kk * 30, 3, P.aceite); }
    g.restore();
    if (malo) ondas(x - 40, 160, t, P.rayo, PI);
    var f = { guias_cabina: [x, 250], guias_contrapeso: [x, 250], fijaciones: [x + 64, ((120 - rec) % 480 + 480) % 480 - 51], rozaderas: [x, 158], rodaderas: [x, 160], aceiteras: [x, 106], bastidor: [188, 125] }[id];
    if (f) (malo ? alerta : foco)(f[0] + wob, f[1], 34, t);
    if (!malo && t < 3.5 && f) rotulo(nombreCorto(id), f[0] + wob, f[1], 480, 60);
  }
  V.fabricas.guiado = fabrica('guiado', dibGuiado);

  // ---------- puertas (piezas sin escena propia) ----------
  function dibPuertaTipo(t, k, malo, tt) {
    var c = 6.5, n = Math.floor(t / c), u = t - n * c, a = malo ? kf(u, [[0, 0], [1, 0], [3, 0.9], [3.6, 0.9], [5.4, 0.12], [6.5, 0.12]]) : kf(u, [[0, 0], [1, 0], [3, 1], [3.8, 1], [5.8, 0]]);
    if (malo) a += Math.sin(t * 25) * 0.008;
    dibPuerta(t, { a: Math.max(0, a), malo: malo ? k.foco : null, parpadeo: malo, foco: malo ? null : k.foco });
    if (!malo && t < 3.5 && POS_PUERTA[k.foco]) { var f = POS_PUERTA[k.foco]({ xR: 320, pesa: 250 }); rotulo(nombreCorto(k.foco), f[0], f[1], f[0] > 320 ? 520 : 120, 30); }
    if (malo && t > 3) estado('LA PUERTA NO CIERRA BIEN', 320, 20, true);
  }
  V.fabricas.puerta = fabrica('puerta', dibPuertaTipo);

  // ---------- mapa del ascensor: dónde está la pieza y qué pasa si falla ----------
  var MAPA = {
    maquinas: function (o) { return [300, 30]; }, hueco: function (o) { return [320, 190]; }, cabina: function (o) { return [280, o.cy - 50]; },
    puertas: function (o) { return [338, o.cy - 50]; }, foso: function (o) { return [300, 334]; }, hidraulico: function (o) { return [180, 320]; },
    interruptor_principal: function () { return [500, 70]; }, tablero_control: function () { return [500, 40]; }, rescate: function () { return [560, 40]; },
    emergencia: function (o) { return [280, o.cy - 104]; }, caja_techo: function (o) { return [250, o.cy - 104]; }, caja_inspeccion: function (o) { return [300, o.cy - 104]; },
    baranda_techo: function (o) { return [236, o.cy - 112]; }, faldon: function (o) { return [336, o.cy + 14]; }, pesacargas: function (o) { return [280, o.cy - 2]; },
    botonera_cabina: function (o) { return [306, o.cy - 50]; }, cabina: function (o) { return [280, o.cy - 50]; }, poleas_cabina: function (o) { return [280, o.cy + 6]; },
    cadena_compensacion: function (o) { return [280, o.cy + 60]; }, cable_viajero: function (o) { return [230, (o.cy + 190) / 2 + 20]; },
    cableado_hueco: function () { return [430, 190]; }, iluminacion_hueco: function () { return [430, 110]; }, gancho_izaje: function () { return [320, 10]; },
    pantalla_contrapeso: function () { return [404, 320]; }, cables_motor: function () { return [330, 40]; }, monitor_fajas: function () { return [380, 20]; },
    polea_desvio: function () { return [372, 46]; }, stop_foso: function () { return [436, 326]; }, botonera_piso: function () { return [462, 220]; },
    amarres: function () { return [400, 26]; }, contrapeso: function (o) { return [396, 310 - (o.cy - 120)]; }, cable_flojo: function () { return [210, 330]; }
  };
  function dibMapa(t, k, malo, tt) {
    var id = k.foco, para = malo && t > 1.8, cy = para ? 220 : kf(t % 12, [[0, 300], [2, 300], [5, 190], [7, 190], [10, 300]]);
    if (malo && !para) cy = 300 - ph(t, 0, 1.8) * 80;
    rr(200, 0, 240, 360, 0, null, P.linea, 2); rr(200, 340, 240, 20, 0, P.muro2);
    [300, 190, 80].forEach(function (y, i) { ln([440, y, 480, y], P.tinta2, 3); tx('P' + (i + 1), 488, y, { t: 14, c: P.tinta2 }); rr(455, y - 70, 14, 24, 2, P.inox, P.aceroOsc, 1); });
    rr(260, 14, 70, 30, 3, P.aceroOsc); polea(350, 30, 14, -cy / 14, P.acero, P.hierro);
    rr(480, 22, 46, 70, 3, P.placa); rr(536, 22, 46, 40, 3, P.placa);
    ln([346, 30, 346, cy - 110], P.hierro, 2.5); ln([364, 30, 364, 310 - (cy - 120) - 70], P.hierro, 2.5);
    rr(384, 310 - (cy - 120) - 70, 26, 70, 2, P.aceroOsc);
    ln([220, 40, 220, 330], P.tinta2, 1.5, [6, 4]);
    g.beginPath(); g.moveTo(240, cy); g.quadraticCurveTo(232, (cy + 190) / 2 + 60, 240, 190); g.strokeStyle = P.hierro; g.lineWidth = 2; g.stroke();
    rr(230, cy - 110, 110, 110, 3, P.inox, P.aceroOsc, 2); rr(326, cy - 100, 10, 100, 0, P.aceroOsc);
    var f = (MAPA[id] || MAPA[(ASC.cat[id] || {}).z] || MAPA.hueco)({ cy: cy });
    if (malo) { alerta(f[0], f[1], 26, t); cr(f[0], f[1], 7, P.rayo); if (para) { placa('ASCENSOR DETENIDO', 320, 322, { al: 'center', f: P.mal }); } }
    else { foco(f[0], f[1], 26, t); cr(f[0], f[1], 6, P.acento); }
    if (t < 4 || malo) rotulo(nombreCorto(id), f[0], f[1], f[0] > 320 ? 560 : 90, 120);
  }
  V.fabricas.mapa = fabrica('mapa', dibMapa);

  function nombreCorto(id) { var n = (ASC.partes[id] && ASC.partes[id].nombre) || (ASC.cat[id] && ASC.cat[id].n) || id; return n.length > 26 ? n.slice(0, 25) + '…' : n; }

  // ---------- qué escena usa cada pieza ----------
  V.de = {
    cortina_luminosa: 'cortina', freno: 'freno', micro_freno: 'freno',
    cables_traccion: 'traccion', polea_traccion: 'traccion', contrapeso: 'traccion', amarres: 'traccion',
    maquina: 'motor', encoder: 'encoder', cable_sincronismo: 'sincronismo', operador_puertas: 'operador',
    paracaidas: 'paracaidas', limitador: 'limitador', cable_limitador: 'limitador', polea_tensora: 'limitador',
    cerradura: 'cerradura', patin: 'cerradura', amortiguadores: 'amortiguador', finales_carrera: 'finales', posicionamiento: 'posicion',
    pesacargas: 'pesacargas', tablero_control: 'tablero', caja_techo: 'tablero', variador: 'variador', rescate: 'rescate',
    central_hidraulica: 'hidraulico', bloque_valvulas: 'hidraulico', piston: 'hidraulico', polea_piston: 'hidraulico', manguera: 'hidraulico', valvula_rotura: 'hidraulico', recoge_aceite: 'hidraulico',
    botonera_piso: 'bus', botonera_cabina: 'bus',
    contacto_paracaidas: '*serie', contacto_puerta_cabina: '*serie', cable_flojo: '*serie', stop_foso: '*serie', caja_inspeccion: '*serie',
    guias_cabina: '*guiado', guias_contrapeso: '*guiado', fijaciones: '*guiado', rozaderas: '*guiado', rodaderas: '*guiado', aceiteras: '*guiado', bastidor: '*guiado',
    cabezal_piso: '*puerta', roldanas_puerta: '*puerta', pesa_cierre: '*puerta', guiadores_puerta: '*puerta', pisadera: '*puerta', puerta_piso: '*puerta', puerta_cabina: '*puerta'
  };
  V.para = function (id) {
    if (!id || !ASC.cat[id]) return null;
    var e = V.de[id] || '*mapa', d;
    if (e.charAt(0) === '*') d = V.fabricas[e.slice(1)](id); else d = V.escenas[e];
    if (!d) return null;
    return { id: id, titulo: (ASC.partes[id] && ASC.partes[id].nombre) || ASC.cat[id].n, caps: [Object.assign({ nombre: 'Cómo funciona' }, d.funciona), Object.assign({ nombre: 'Cómo falla' }, d.falla)] };
  };

  /* =================================================================
     REPRODUCTOR
     ================================================================= */
  var reducido = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var voces = null;
  function vozEs() {
    if (!window.speechSynthesis) return null;
    voces = voces && voces.length ? voces : speechSynthesis.getVoices();
    var pref = ['es-PE', 'es-419', 'es-US', 'es-MX', 'es-CO', 'es-AR', 'es-CL', 'es-ES'];
    for (var i = 0; i < pref.length; i++) { var v = voces.filter(function (x) { return x.lang && x.lang.replace('_', '-').toLowerCase() === pref[i].toLowerCase(); })[0]; if (v) return v; }
    return voces.filter(function (x) { return /^es/i.test(x.lang || ''); })[0] || null;
  }
  if (window.speechSynthesis && speechSynthesis.addEventListener) speechSynthesis.addEventListener('voiceschanged', function () { voces = speechSynthesis.getVoices(); });
  function mmss(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  var vivo = null;   // un solo reproductor sonando a la vez

  V.montar = function (caja, id, op) {
    op = op || {};
    // video en 3D cuando hay WebGL; si no, la animación 2D
    var m3 = op.dim !== 2 && ASC.v3d && ASC.v3d.motor ? ASC.v3d.motor(id, op) : null;
    var info = m3 ? { titulo: ASC.v3d.nombre(id), caps: m3.caps } : V.para(id); if (!info) return null;
    var caps = info.caps, off = [0, caps[0].dur], total = caps[0].dur + caps[1].dur;
    caja.innerHTML = '<div class="video" tabindex="-1">' +
      '<div class="video-pantalla' + (m3 ? ' v3' : '') + '" role="img" aria-label="Video: cómo funciona y cómo falla ' + escH(info.titulo) + '">' + (m3 ? '' : '<canvas></canvas>') +
      '<button type="button" class="video-grande" aria-label="Reproducir el video">▶</button></div>' +
      '<p class="video-subt" aria-live="polite"></p>' +
      '<div class="video-ctl"><button type="button" class="video-btn" data-v="play" aria-label="Reproducir">▶</button>' +
      '<input type="range" min="0" max="1000" value="0" step="1" aria-label="Avance del video">' +
      '<span class="video-t">0:00 / ' + mmss(total) + '</span>' +
      (window.speechSynthesis ? '<button type="button" class="video-btn voz" data-v="voz" aria-pressed="false" title="Narrar con la voz del navegador">Voz</button>' : '') + '</div>' +
      '<div class="video-caps" role="group" aria-label="Capítulos"><button type="button" data-cap="0" aria-pressed="true">1 · Cómo funciona</button><button type="button" data-cap="1" aria-pressed="false">2 · Cómo falla</button></div></div>';
    var raiz = caja.firstChild, pantalla = raiz.querySelector('.video-pantalla'), cv = raiz.querySelector('canvas'), ctx = cv ? cv.getContext('2d') : null, sub = raiz.querySelector('.video-subt');
    var es3D = !!m3;
    if (m3) m3.montar(pantalla);
    var bPlay = raiz.querySelector('[data-v="play"]'), bVoz = raiz.querySelector('[data-v="voz"]'), rango = raiz.querySelector('input'), tiempo = raiz.querySelector('.video-t'), grande = raiz.querySelector('.video-grande');
    var S = { t: op.cap === 1 ? off[1] : 0, play: false, voz: false, ult: -1, raf: 0, prev: 0, hablando: false, vivo: true };
    var k = { foco: id };

    function capEn(t) { return t < off[1] ? 0 : 1; }
    function subIdx(c, lt) { var s = caps[c].subt, i = 0; for (var j = 0; j < s.length; j++) if (lt >= s[j][0]) i = j; return i; }
    // pasivo: redibujo por tamaño o tema; en 3D no le quita el lienzo a otro video
    function dibujar(pasivo) {
      if (!raiz.isConnected) { parar(true); return; }
      var c = capEn(S.t), lt = S.t - off[c];
      if (es3D) { if (m3 && (!pasivo || m3.esDueno())) m3.dibujar(c, lt); }
      else {
        var w = cv.clientWidth || 480, dpr = Math.min(2, window.devicePixelRatio || 1), cw = Math.round(w * dpr), ch = Math.round(w * 9 / 16 * dpr);
        if (cv.width !== cw || cv.height !== ch) { cv.width = cw; cv.height = ch; }
        g = ctx; paleta(raiz);
        g.setTransform(cw / W, 0, 0, ch / H, 0, 0);
        fondo();
        try { caps[c].dib(lt, k); } catch (e) { /* un cuadro que no se pudo dibujar no detiene el video */ if (window.console) console.warn(e); }
      }
      var i = subIdx(c, lt), clave = c * 100 + i;
      if (clave !== S.ult) { S.ult = clave; sub.textContent = caps[c].subt[i][1]; if (S.voz && S.play) hablar(caps[c].subt[i][1]); }
      rango.value = String(Math.round(S.t / total * 1000));
      tiempo.textContent = mmss(S.t) + ' / ' + mmss(total);
      raiz.querySelectorAll('[data-cap]').forEach(function (b) { b.setAttribute('aria-pressed', String(Number(b.dataset.cap) === c)); });
    }
    function hablar(txt) {
      if (!window.speechSynthesis) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(txt), v = vozEs();
      u.lang = v ? v.lang : 'es-PE'; if (v) u.voice = v; u.rate = 1.02;
      // si el navegador nunca avisa que terminó, la imagen no se queda esperando para siempre
      S.hablando = true; S.limiteVoz = performance.now() + 2500 + txt.split(/\s+/).length * 600;
      u.onend = u.onerror = function () { S.hablando = false; };
      speechSynthesis.speak(u);
    }
    function sigCorte(t) {   // próximo cambio de subtítulo (o fin de capítulo) después de t
      var c = capEn(t), s = caps[c].subt, lt = t - off[c];
      for (var j = 0; j < s.length; j++) if (s[j][0] > lt + 1e-6) return off[c] + s[j][0];
      return off[c] + caps[c].dur;
    }
    function tick(now) {
      if (!S.play) return;
      var dt = Math.min(0.1, (now - (S.prev || now)) / 1000); S.prev = now;
      var nt = S.t + dt;
      if (S.hablando && now > S.limiteVoz) S.hablando = false;
      if (S.voz && S.hablando) { var corte = sigCorte(S.t); if (nt >= corte) nt = corte - 0.001; }   // la imagen espera a la voz
      S.t = nt;
      if (S.t >= total) { S.t = total; dibujar(); pausa(); S.t = 0; S.ult = -1; grande.hidden = false; grande.textContent = '↻'; grande.setAttribute('aria-label', 'Ver otra vez'); return; }
      dibujar();
      S.raf = requestAnimationFrame(tick);
    }
    function play() {
      if (vivo && vivo !== ctl) vivo.pausa();
      vivo = ctl; S.play = true; S.prev = 0; S.ult = -1; grande.hidden = true;
      bPlay.textContent = '❚❚'; bPlay.setAttribute('aria-label', 'Pausa');
      S.raf = requestAnimationFrame(tick);
    }
    function pausa() {
      S.play = false; cancelAnimationFrame(S.raf);
      bPlay.textContent = '▶'; bPlay.setAttribute('aria-label', 'Reproducir');
      if (window.speechSynthesis && vivo === ctl) speechSynthesis.cancel();
      S.hablando = false;
    }
    function parar(sinDibujo) { pausa(); S.vivo = false; if (vivo === ctl) vivo = null; var x = m3; m3 = null; if (x) x.destruir(); }
    // ir: salta a un segundo del video y lo dibuja (también lo usan las pruebas)
    var ctl = { pausa: pausa, parar: parar, play: play, ir: function (t) { S.t = Math.max(0, Math.min(total, t)); S.ult = -1; dibujar(); }, total: total, off: off, tipo: m3 ? '3d' : '2d' };
    if (m3) m3.alSoltar = function () { if (!raiz.isConnected) { parar(true); return; } if (S.play) pausa(); grande.hidden = false; };

    grande.addEventListener('click', play);
    bPlay.addEventListener('click', function () { if (S.play) pausa(); else play(); });
    if (bVoz) bVoz.addEventListener('click', function () {
      S.voz = !S.voz; bVoz.setAttribute('aria-pressed', String(S.voz));
      if (S.voz && S.play) { var c = capEn(S.t); hablar(caps[c].subt[subIdx(c, S.t - off[c])][1]); } else if (!S.voz && window.speechSynthesis) { speechSynthesis.cancel(); S.hablando = false; }
    });
    rango.addEventListener('input', function () { S.t = Number(rango.value) / 1000 * total; S.ult = -1; if (window.speechSynthesis && S.voz) speechSynthesis.cancel(); S.hablando = false; dibujar(); });
    raiz.querySelector('.video-caps').addEventListener('click', function (e) {
      var b = e.target.closest('[data-cap]'); if (!b) return;
      S.t = off[Number(b.dataset.cap)]; S.ult = -1; S.hablando = false; if (window.speechSynthesis && S.voz) speechSynthesis.cancel();
      dibujar(); if (!S.play) play();
    });
    raiz.addEventListener('keydown', function (e) { if (e.key === ' ' && e.target === raiz) { e.preventDefault(); if (S.play) pausa(); else play(); } });
    if (window.matchMedia) { var mq = window.matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', function () { if (!S.play && raiz.isConnected) dibujar(true); }); }
    if (window.ResizeObserver) new ResizeObserver(function () { if (!S.play && raiz.isConnected) dibujar(true); }).observe(pantalla);
    // primer cuadro: el que explica mejor la pieza
    S.t = op.cap === 1 ? off[1] + 0.5 : 0.5; dibujar(); S.t = op.cap === 1 ? off[1] : 0; S.ult = -1;
    if (op.auto && !reducido) play();
    return ctl;
  };
  function escH(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  V.tiene = function (id) { return !!(id && ASC.cat[id]); };
  // un cuadro suelto, para miniaturas y pruebas
  V.cuadro = function (cv, id, cap, t, el) {
    var info = V.para(id); if (!info) return false;
    g = cv.getContext('2d'); paleta(el || cv);
    g.setTransform(cv.width / W, 0, 0, cv.height / H, 0, 0); fondo();
    info.caps[cap || 0].dib(t || 0, { foco: id });
    return true;
  };
  V.detener = function () { if (vivo) vivo.pausa(); };
})();
