/* Taller de Ascensores — modelo 3D paramétrico (three.js r128). Metros, Y hacia arriba, puertas hacia +Z. */
(function () {
  'use strict';
  var T = window.THREE, ASC = window.ASC;
  if (!T) return;
  var PI = Math.PI;
  function V(x, y, z) { return new T.Vector3(x, y, z); }

  // ---------- medidas ----------
  var FH = 2.8, NP = 3, REC = FH * (NP - 1), FOSO = 1.4, TECHO = REC + 3.7;
  var HX = 0.95, HZ = 0.95;            // media anchura y medio fondo del hueco
  var CW = 1.2, CD = 1.42, ZC = 0.09;  // cabina (exterior) y su centro en z
  var PASO = 0.8, PALTO = 2.0;         // paso libre de puerta
  var CP0 = -0.65;                     // base del contrapeso con la cabina en el último piso
  var ZB = -0.23;                      // plano de las cintas en el MRL
  ASC.medidas = { FH: FH, NP: NP, REC: REC, FOSO: FOSO, TECHO: TECHO };

  // ---------- materiales ----------
  function mat(c, o) { return new T.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.62, metalness: 0.12 }, o || {})); }
  var lienzo = document.createElement('canvas'); lienzo.width = 128; lienzo.height = 64;
  var texDisplay = new T.CanvasTexture(lienzo);
  ASC.pintarDisplay = function (txt) {
    var g = lienzo.getContext('2d');
    g.fillStyle = '#0b141b'; g.fillRect(0, 0, 128, 64);
    g.fillStyle = '#ff5a3c'; g.font = 'bold 46px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillText(txt, 64, 34);
    texDisplay.needsUpdate = true;
  };
  ASC.pintarDisplay('1');
  var M = ASC.mat = {
    muro: mat(0xc3c8cc, { roughness: 0.95, metalness: 0 }),
    muroB: mat(0xc3c8cc, { roughness: 0.95, metalness: 0, side: T.BackSide }),
    losa: mat(0x9aa1a7, { roughness: 0.95, metalness: 0 }),
    hall: mat(0xe2dfd6, { roughness: 0.9, metalness: 0 }),
    persona: mat(0x7f95a8, { roughness: 0.9, metalness: 0 }),
    acero: mat(0xb7bfc6, { metalness: 0.4, roughness: 0.42 }),
    aceroOsc: mat(0x59636d, { metalness: 0.35, roughness: 0.5 }),
    hierro: mat(0x3a4047, { roughness: 0.75 }),
    inox: mat(0xd6dbdf, { metalness: 0.45, roughness: 0.3 }),
    panel: mat(0xdfe3e6, { metalness: 0.3, roughness: 0.4 }),
    piso: mat(0x6f6a63, { roughness: 0.9 }),
    azul: mat(0x2e5f90),
    verde: mat(0x2e7a5c),
    amarillo: mat(0xf2b705, { roughness: 0.55 }),
    rojo: mat(0xd03a2c, { roughness: 0.5 }),
    negro: mat(0x1e2125, { roughness: 0.8 }),
    goma: mat(0x25282c, { roughness: 0.95, metalness: 0 }),
    cinta: mat(0x30353a, { roughness: 0.8, metalness: 0, side: T.DoubleSide }),
    cobre: mat(0xb9743a, { metalness: 0.5, roughness: 0.4 }),
    gris: mat(0x8e979f),
    grisClaro: mat(0xcdd3d8),
    blanco: mat(0xf2f3f4, { roughness: 0.5 }),
    pesa: mat(0x6b7279, { roughness: 0.9 }),
    pesa2: mat(0x596067, { roughness: 0.9 }),
    cromo: mat(0xe8ecef, { metalness: 0.7, roughness: 0.18 }),
    pu: mat(0xe2a93b, { roughness: 0.85, metalness: 0 }),
    malla: mat(0xf2b705, { roughness: 0.9, metalness: 0, transparent: true, opacity: 0.32, side: T.DoubleSide, depthWrite: false }),
    luz: new T.MeshBasicMaterial({ color: 0xfff6dc }),
    led: new T.MeshBasicMaterial({ color: 0xff4a32 }),
    ledV: new T.MeshBasicMaterial({ color: 0x38d07a }),
    display: new T.MeshBasicMaterial({ map: texDisplay }),
    rayo: new T.MeshBasicMaterial({ color: 0xff3b30, transparent: true, opacity: 0.8 }),
    toque: new T.MeshBasicMaterial({ visible: false })
  };

  // ---------- piezas básicas ----------
  function caja(w, h, d, m, x, y, z) { var o = new T.Mesh(new T.BoxGeometry(w, h, d), m); o.position.set(x || 0, y || 0, z || 0); return o; }
  function cil(r, l, m, x, y, z, eje, seg) {
    var o = new T.Mesh(new T.CylinderGeometry(r, r, l, seg || 18), m);
    if (eje === 'x') o.rotation.z = PI / 2; else if (eje === 'z') o.rotation.x = PI / 2;
    o.position.set(x || 0, y || 0, z || 0); return o;
  }
  function esfera(r, m, x, y, z) { var o = new T.Mesh(new T.SphereGeometry(r, 16, 12), m); o.position.set(x, y, z); return o; }
  function grp(arr, x, y, z) { var g = new T.Group(); arr.forEach(function (h) { if (h) g.add(h); }); g.position.set(x || 0, y || 0, z || 0); return g; }
  function en(o, x, y, z) { o.position.set(x, y, z); return o; }
  var EJE_Y = V(0, 1, 0), EJE_X = V(1, 0, 0);
  function entre(a, b, r, m, seg) {
    var d = b.clone().sub(a), l = d.length();
    var o = new T.Mesh(new T.CylinderGeometry(r, r, l, seg || 8), m);
    o.position.copy(a).addScaledVector(d, 0.5);
    o.quaternion.setFromUnitVectors(EJE_Y, d.normalize());
    return o;
  }
  function viga(a, b, w, h, m) {
    var d = b.clone().sub(a), l = d.length();
    var o = new T.Mesh(new T.BoxGeometry(l, h, w), m);
    o.position.copy(a).addScaledVector(d, 0.5);
    o.quaternion.setFromUnitVectors(EJE_X, d.normalize());
    return o;
  }
  function plano(w, h, m, x, y, z, ry) { var o = new T.Mesh(new T.PlaneGeometry(w, h), m); o.position.set(x, y, z); if (ry) o.rotation.y = ry; return o; }
  function polea(r, ancho, eje, m) {
    var g = new T.Group();
    g.add(cil(r, ancho, m || M.aceroOsc, 0, 0, 0, 'y', 28));
    g.add(cil(r + 0.012, 0.012, M.hierro, 0, ancho / 2, 0, 'y', 28), cil(r + 0.012, 0.012, M.hierro, 0, -ancho / 2, 0, 'y', 28));
    g.add(cil(Math.max(0.018, r * 0.28), ancho + 0.05, M.acero, 0, 0, 0, 'y', 14));
    if (eje === 'x') g.rotation.z = PI / 2; else if (eje === 'z') g.rotation.x = PI / 2;
    return g;
  }
  // perfil T: respaldo en x=0, alma hacia +x, base en y=0
  function riel(L, grande) {
    var a = grande ? 0.09 : 0.07, e = grande ? 0.062 : 0.045, t = grande ? 0.016 : 0.01;
    return grp([caja(0.012, L, a, M.acero, 0.006, L / 2, 0), caja(e, L, t, M.acero, 0.012 + e / 2, L / 2, 0)]);
  }
  // tramo vertical de largo variable
  function tramo(geo, m, x, z, toque) {
    var o = new T.Mesh(geo, m); o.position.set(x, 0, z);
    if (toque) o.add(new T.Mesh(new T.BoxGeometry(toque, 1, toque), M.toque));
    o.pon = function (y0, y1) { var l = Math.max(0.001, y1 - y0); o.scale.y = l; o.position.y = (y0 + y1) / 2; };
    return o;
  }
  var G = {
    cable: new T.CylinderGeometry(0.007, 0.007, 1, 6),
    cableFino: new T.CylinderGeometry(0.005, 0.005, 1, 6),
    cinta: new T.BoxGeometry(0.005, 1, 0.03),
    plano: new T.BoxGeometry(0.06, 1, 0.008),
    cadena: new T.CylinderGeometry(0.018, 0.018, 1, 8),
    vastago: new T.CylinderGeometry(0.045, 0.045, 1, 20)
  };
  Object.keys(G).forEach(function (k) { G[k].userData.fija = true; });   // compartidas entre modelos: no se liberan
  // arcos hechos de tramos cortos
  function arcoYZ(g, x, cz, cy, R, a0, a1, n, r, m) {
    for (var i = 0; i < n; i++) {
      var p = a0 + (a1 - a0) * i / n, q = a0 + (a1 - a0) * (i + 1) / n;
      g.add(entre(V(x, cy + R * Math.sin(p), cz + R * Math.cos(p)), V(x, cy + R * Math.sin(q), cz + R * Math.cos(q)), r, m, 6));
    }
  }
  function arcoXYcinta(g, z, cxx, cy, R, a0, a1, n) {
    for (var i = 0; i < n; i++) {
      var p = a0 + (a1 - a0) * i / n, q = a0 + (a1 - a0) * (i + 1) / n;
      var ax = cxx + R * Math.cos(p), ay = cy + R * Math.sin(p), bx = cxx + R * Math.cos(q), by = cy + R * Math.sin(q);
      var l = Math.hypot(bx - ax, by - ay) + 0.004;
      var o = caja(l, 0.005, 0.03, M.cinta, (ax + bx) / 2, (ay + by) / 2, z);
      o.rotation.z = Math.atan2(by - ay, bx - ax);
      g.add(o);
    }
  }
  function resorte(r, y0, y1, n, m) {
    var g = new T.Group();
    for (var i = 0; i < n; i++) {
      var o = new T.Mesh(new T.TorusGeometry(r, 0.011, 6, 18), m);
      o.rotation.x = PI / 2; o.position.y = y0 + (y1 - y0) * (i + 0.5) / n; g.add(o);
    }
    return g;
  }
  function boton(r, m, x, y, z, eje) { return cil(r, 0.012, m, x, y, z, eje || 'z', 14); }

  // ================= construcción =================
  // tipo: arquitectura (mrl, mr, hid) · eq: equipo de marca (otis, schindler, movilift, clasico), que cambia piezas, colores y lado
  ASC.construir = function (tipo, eq) {
    var E = (ASC.equipos && ASC.equipos[eq]) || {}, sch = eq === 'schindler', mov = eq === 'movilift', espejo = !!E.espejo;
    var MC = eq === 'otis' ? M.hierro : sch ? M.grisClaro : M.azul;   // color del cuerpo de la máquina
    var cx = tipo === 'mr' ? 0 : tipo === 'mrl' ? -0.13 : -0.12;
    var raiz = new T.Group(), ent = new T.Group(), cab = new T.Group(), cp = new T.Group();
    cab.position.set(cx, 0, ZC);
    raiz.add(ent, cab, cp);
    var partes = {}, dyn = [];
    function reg(id, obj, padre) {
      (padre || raiz).add(obj);
      obj.userData.parte = id;
      var p = partes[id] || (partes[id] = { id: id, miembros: [] });
      p.miembros.push(obj);
      return obj;
    }
    function ancla(id, padre, p) { partes[id].ancla = { padre: padre, p: p }; }
    function principal(id, obj) { partes[id].principal = obj; }
    var yF = TECHO + 0.2;   // piso del cuarto de máquinas (solo mr)

    // ---------- entorno: muros que solo se ven desde dentro ----------
    var alto = TECHO + FOSO, yMed = (TECHO - FOSO) / 2;
    ent.add(plano(2 * HX, alto, M.muro, 0, yMed, -HZ, 0));
    ent.add(plano(2 * HZ, alto, M.muro, -HX, yMed, 0, PI / 2));
    ent.add(plano(2 * HZ, alto, M.muro, HX, yMed, 0, -PI / 2));
    var sh = new T.Shape();
    sh.moveTo(-HX, -FOSO); sh.lineTo(HX, -FOSO); sh.lineTo(HX, TECHO); sh.lineTo(-HX, TECHO); sh.lineTo(-HX, -FOSO);
    for (var f = 0; f < NP; f++) {
      var hu = new T.Path(), x0 = cx - PASO / 2 - 0.05, x1 = cx + PASO / 2 + 0.05, y0 = f * FH, y1 = f * FH + PALTO + 0.05;
      hu.moveTo(x0, y0); hu.lineTo(x1, y0); hu.lineTo(x1, y1); hu.lineTo(x0, y1); hu.lineTo(x0, y0);
      sh.holes.push(hu);
    }
    ent.add(en(new T.Mesh(new T.ShapeGeometry(sh), M.muroB), 0, 0, HZ));
    ent.add(caja(2 * HX + 0.3, 0.15, 2 * HZ + 0.3, M.losa, 0, -FOSO - 0.075, 0));
    if (tipo === 'mr') {
      ent.add(caja(2.9, 0.2, 2.3, M.losa, -0.3, TECHO + 0.1, 0));
      ent.add(plano(2.9, 2.3, M.muro, -0.3, yF + 1.15, -1.15, 0));
      ent.add(plano(2.3, 2.3, M.muro, -1.75, yF + 1.15, 0, PI / 2));
      ent.add(plano(2.3, 2.3, M.muro, 1.15, yF + 1.15, 0, -PI / 2));
      ent.add(plano(2.9, 2.3, M.muro, -0.3, yF + 1.15, 1.15, PI));
      ent.add(caja(0.22, 0.205, 0.16, M.negro, 0, TECHO + 0.1, ZC), caja(0.22, 0.205, 0.3, M.negro, 0, TECHO + 0.1, -0.72));
    } else {
      ent.add(caja(2.2, 0.15, 2.2, M.losa, 0, TECHO + 0.075, 0));
    }
    if (tipo === 'hid') {   // cuarto de la central, separado del hueco
      ent.add(caja(1.8, 0.12, 1.6, M.losa, 2.1, -0.06, -1.7));
      ent.add(plano(1.7, 2.3, M.muro, 2.1, 1.15, -2.45, 0));
      ent.add(plano(1.5, 2.3, M.muro, 1.25, 1.15, -1.7, PI / 2));
      ent.add(plano(1.5, 2.3, M.muro, 2.95, 1.15, -1.7, -PI / 2));
      ent.add(plano(1.7, 2.3, M.muro, 2.1, 1.15, -0.95, PI));
    }
    for (f = 0; f < NP; f++) {
      ent.add(caja(2 * HX + 0.5, 0.16, 1.1, M.losa, 0, f * FH - 0.08, HZ + 0.55));
      ent.add(caja(0.44, 2.45, 0.07, M.hall, cx - 0.72, f * FH + 1.225, HZ + 0.035));
      ent.add(caja(1.44, 0.35, 0.07, M.hall, cx - 0.22, f * FH + 2.275, HZ + 0.035));
    }
    ent.add(grp([caja(0.26, 0.82, 0.16, M.persona, 0, 0.41, 0), caja(0.38, 0.62, 0.2, M.persona, 0, 1.13, 0), esfera(0.11, M.persona, 0, 1.57, 0)], cx + 0.86, 0, HZ + 0.62));

    // ---------- guías ----------
    var topeG = tipo === 'mrl' ? 8.45 : TECHO - 0.3, Y0 = -FOSO + 0.03, LR = topeG - Y0;
    var rc = tipo === 'hid'
      ? [{ x: 0.685, z: ZC - 0.42, r: PI }, { x: 0.685, z: ZC + 0.42, r: PI }]
      : [{ x: cx - 0.795, z: ZC, r: 0 }, { x: cx + 0.795, z: ZC, r: PI }];
    rc.forEach(function (g) { var r = riel(LR, true); r.position.set(g.x, Y0, g.z); r.rotation.y = g.r; reg('guias_cabina', r); });
    ancla('guias_cabina', raiz, V(rc[0].x + (rc[0].r ? -0.03 : 0.03), 3.6, rc[0].z));

    var rcp = tipo === 'mr' ? [{ x: -0.6, z: -0.82, r: 0 }, { x: 0.6, z: -0.82, r: PI }]
      : tipo === 'mrl' ? [{ x: 0.79, z: ZB - 0.47, r: -PI / 2 }, { x: 0.79, z: ZB + 0.47, r: PI / 2 }] : [];
    rcp.forEach(function (g) { var r = riel(LR, false); r.position.set(g.x, Y0, g.z); r.rotation.y = g.r; reg('guias_contrapeso', r); });
    if (rcp.length) ancla('guias_contrapeso', raiz, V(rcp[1].x, 2.6, rcp[1].z));

    // ---------- fijaciones y empalmes ----------
    var ysop = [-0.7, 0.8, 2.3, 3.8, 5.3, 6.8, 8.2];
    function sop(a, b, y, id) {
      var g = grp([viga(V(a[0], y, a[1]), V(b[0], y, b[1]), 0.09, 0.05, M.aceroOsc),
        caja(0.05, 0.08, 0.05, M.hierro, a[0], y, a[1]), cil(0.012, 0.03, M.acero, b[0], y + 0.05, b[1], 'y', 8)]);
      return reg('fijaciones', g);
    }
    var medio = null;
    ysop.forEach(function (y, k) {
      var s;
      if (tipo === 'hid') { s = sop([0.69, ZC - 0.42], [HX, ZC - 0.42], y); sop([0.69, ZC + 0.42], [HX, ZC + 0.42], y); }
      else if (tipo === 'mr') {
        s = sop([cx - 0.8, ZC], [-HX, ZC], y); sop([cx + 0.8, ZC], [HX, ZC], y);
        sop([-0.61, -0.82], [-0.61, -HZ], y); sop([0.61, -0.82], [0.61, -HZ], y);
      } else {
        sop([cx - 0.8, ZC], [-HX, ZC], y);
        s = sop([0.69, ZC], [0.69, 0.3], y); sop([0.69, 0.3], [HX, 0.3], y);
        sop([0.81, ZB - 0.475], [HX, ZB - 0.475], y);
        reg('fijaciones', caja(0.07, 0.05, 0.05, M.aceroOsc, 0.79, y, 0.265));
      }
      if (k === 3) medio = s;
    });
    rc.forEach(function (g) {
      var d = g.r ? 1 : -1;
      reg('fijaciones', grp([caja(0.014, 0.32, 0.09, M.aceroOsc, 0, 0, 0),
        cil(0.009, 0.02, M.acero, 0, 0.1, 0.028, 'x', 8), cil(0.009, 0.02, M.acero, 0, 0.1, -0.028, 'x', 8),
        cil(0.009, 0.02, M.acero, 0, -0.1, 0.028, 'x', 8), cil(0.009, 0.02, M.acero, 0, -0.1, -0.028, 'x', 8)], g.x + d * 0.008, 4.55, g.z));
    });
    principal('fijaciones', medio);

    // ---------- amortiguadores ----------
    function amort(h, pu) {
      var g = grp([caja(0.24, 0.02, 0.24, M.aceroOsc, 0, 0.01, 0), caja(0.12, h * 0.5, 0.12, M.amarillo, 0, h * 0.25 + 0.02, 0)]);
      if (pu) g.add(cil(0.075, h * 0.5 - 0.04, M.pu, 0, h * 0.75, 0, 'y', 20), cil(0.08, 0.012, M.pu, 0, h * 0.68, 0, 'y', 20), cil(0.08, 0.012, M.pu, 0, h * 0.84, 0, 'y', 20));
      else { g.add(resorte(0.065, h * 0.52, h - 0.03, 7, M.aceroOsc)); g.add(cil(0.08, 0.02, M.aceroOsc, 0, h - 0.01, 0, 'y', 16)); }
      return g;
    }
    var esPU = tipo !== 'mr', am;
    if (tipo === 'mr') { am = reg('amortiguadores', en(amort(0.75, false), cx - 0.25, -FOSO, ZC)); reg('amortiguadores', en(amort(0.75, false), cx + 0.25, -FOSO, ZC)); reg('amortiguadores', en(amort(0.5, false), 0, -FOSO, -0.82)); }
    else if (tipo === 'mrl') { am = reg('amortiguadores', en(amort(0.75, true), cx, -FOSO, ZC)); reg('amortiguadores', en(amort(0.5, true), 0.79, -FOSO, ZB)); }
    else { am = reg('amortiguadores', en(amort(0.75, esPU), cx - 0.2, -FOSO, ZC)); reg('amortiguadores', en(amort(0.75, esPU), cx + 0.25, -FOSO, ZC)); }

    // ---------- contrapeso ----------
    function hacerCP(ancho, grosor, altoC) {
      var g = new T.Group(), i;
      g.add(caja(0.06, altoC, grosor, M.aceroOsc, -ancho / 2 + 0.03, altoC / 2, 0), caja(0.06, altoC, grosor, M.aceroOsc, ancho / 2 - 0.03, altoC / 2, 0));
      g.add(caja(ancho, 0.12, grosor, M.aceroOsc, 0, 0.06, 0), caja(ancho, 0.12, grosor, M.aceroOsc, 0, altoC - 0.06, 0));
      var n = Math.floor((altoC - 0.24 - 0.4) / 0.12);
      for (i = 0; i < n; i++) g.add(caja(ancho - 0.14, 0.108, grosor - 0.03, i % 2 ? M.pesa : M.pesa2, 0, 0.18 + i * 0.12, 0));
      [[-1, 0.06], [1, 0.06], [-1, altoC - 0.06], [1, altoC - 0.06]].forEach(function (q) { g.add(caja(0.05, 0.11, grosor * 0.7, M.hierro, q[0] * (ancho / 2 + 0.02), q[1], 0)); });
      return g;
    }
    var altoCP = 0;
    if (tipo === 'mr') { altoCP = 2.5; cp.position.set(0, 0, -0.82); reg('contrapeso', hacerCP(1.06, 0.16, altoCP), cp); }
    if (tipo === 'mrl') {
      altoCP = 2.4; cp.position.set(0.79, 0, ZB); cp.rotation.y = PI / 2;
      var gcp = hacerCP(0.82, 0.14, altoCP);
      gcp.add(en(polea(0.1, 0.18, 'x'), 0, altoCP + 0.16, -0.04));
      gcp.add(caja(0.012, 0.3, 0.07, M.aceroOsc, 0.11, altoCP + 0.12, -0.04), caja(0.012, 0.3, 0.07, M.aceroOsc, -0.11, altoCP + 0.12, -0.04));
      reg('contrapeso', gcp, cp);
    }
    if (altoCP) ancla('contrapeso', cp, V(0, altoCP * 0.55, 0));

    // ---------- máquina ----------
    var yS = yF + 0.62, zS = ZC - 0.3, RS = 0.3;        // polea de tracción (mr)
    var yD = TECHO - 0.32, zD = -0.6, RD = 0.22;        // polea de desvío (mr)
    var yM = 8.72, xM = 0.59, RM = 0.06;                // polea de tracción (mrl)
    if (tipo === 'mr') {
      var gm = new T.Group(), xr = -0.34, yw = yS - 0.2;
      gm.add(caja(1.9, 0.16, 0.1, M.aceroOsc, -0.45, yF + 0.13, 0.24), caja(1.9, 0.16, 0.1, M.aceroOsc, -0.45, yF + 0.13, -0.45));
      [[-1.3, 0.24], [0.4, 0.24], [-1.3, -0.45], [0.4, -0.45]].forEach(function (q) { gm.add(caja(0.16, 0.05, 0.16, M.goma, q[0], yF + 0.025, q[1])); });
      gm.add(caja(1.0, 0.04, 1.75, M.aceroOsc, -0.25, yF + 0.23, 0.2));
      gm.add(caja(0.36, 0.5, 0.42, M.azul, xr, yS - 0.04, zS), cil(0.26, 0.3, M.azul, xr, yS, zS, 'x', 28));
      gm.add(cil(0.075, 0.6, M.azul, xr, yw, zS + 0.02, 'z', 16));
      gm.add(cil(0.04, 0.62, M.acero, -0.02, yS, zS, 'x', 14));
      gm.add(caja(0.09, 0.42, 0.22, M.azul, 0.2, yS - 0.19, zS), caja(0.2, 0.04, 0.3, M.azul, 0.2, yF + 0.27, zS));
      gm.add(cil(0.16, 0.5, M.azul, xr, yw, zS + 0.74, 'z', 24));
      for (var k = 0; k < 5; k++) gm.add(cil(0.172, 0.018, M.azul, xr, yw, zS + 0.56 + k * 0.08, 'z', 24));
      gm.add(caja(0.13, 0.08, 0.16, M.gris, xr, yw + 0.19, zS + 0.72), caja(0.3, 0.06, 0.42, M.azul, xr, yw - 0.18, zS + 0.74));
      gm.add(cil(0.15, 0.07, M.negro, xr, yw, zS + 1.02, 'z', 24));
      gm.add(cil(0.14, 0.025, M.amarillo, xr, yw, zS - 0.32, 'z', 24), cil(0.02, 0.1, M.acero, xr, yw, zS - 0.27, 'z', 10));
      gm.add(cil(0.022, 0.03, M.cobre, xr - 0.19, yS - 0.2, zS + 0.1, 'x', 10));
      reg('maquina', gm);
      ancla('maquina', raiz, V(xr, yS + 0.05, zS + 0.4));
      reg('polea_traccion', en(polea(RS, 0.14, 'x', M.aceroOsc), 0, yS, zS));
      var gf = grp([cil(0.11, 0.1, M.aceroOsc, 0, 0, 0, 'z', 24), caja(0.03, 0.27, 0.08, M.hierro, -0.135, 0, 0), caja(0.03, 0.27, 0.08, M.hierro, 0.135, 0, 0),
        cil(0.012, 0.4, M.acero, 0, 0.17, 0, 'x', 8), cil(0.024, 0.07, M.rojo, -0.2, 0.17, 0, 'x', 10), cil(0.024, 0.07, M.rojo, 0.2, 0.17, 0, 'x', 10),
        caja(0.12, 0.1, 0.1, M.negro, 0, 0.26, 0), caja(0.02, 0.24, 0.02, M.rojo, 0.19, 0.3, 0)], xr, yw, zS + 0.38);
      gf.children[7].rotation.z = -0.5;
      reg('freno', gf);
      reg('encoder', grp([cil(0.04, 0.05, M.negro, 0, 0, 0, 'z', 14), cil(0.012, 0.04, M.acero, 0, 0, -0.04, 'z', 8), entre(V(0, 0.04, 0), V(0, 0.2, -0.2), 0.006, M.negro)], xr, yw, zS + 1.09));
      reg('polea_desvio', grp([polea(RD, 0.14, 'x'), caja(0.02, 0.5, 0.1, M.aceroOsc, 0.11, 0.12, 0), caja(0.02, 0.5, 0.1, M.aceroOsc, -0.11, 0.12, 0), caja(0.3, 0.03, 0.14, M.aceroOsc, 0, 0.3, 0)], 0, yD, zD));
    }
    if (tipo === 'mrl') {
      var mm = new T.Group();
      mm.add(caja(0.42, 0.08, 0.4, M.aceroOsc, 0.7, 8.49, -0.55), caja(0.42, 0.08, 0.5, M.aceroOsc, 0.7, 8.49, 0.12));
      mm.add(caja(0.3, 0.08, 0.4, M.goma, xM, 8.57, ZB + 0.36), caja(0.18, 0.3, 0.06, MC, xM, yM - 0.06, ZB - 0.14), caja(0.2, 0.05, 0.1, M.goma, xM, 8.555, ZB - 0.14));
      mm.add(cil(0.14, 0.48, MC, xM, yM, ZB + 0.36, 'z', 26));
      for (k = 0; k < 4; k++) mm.add(cil(0.152, 0.02, MC, xM, yM, ZB + 0.2 + k * 0.1, 'z', 26));
      if (sch) mm.add(cil(0.146, 0.05, M.rojo, xM, yM, ZB + 0.15, 'z', 26));
      mm.add(caja(0.12, 0.07, 0.16, M.gris, xM, yM + 0.17, ZB + 0.34));
      reg('maquina', mm);
      ancla('maquina', raiz, V(xM, yM, ZB + 0.36));
      reg('polea_traccion', grp([cil(RM, 0.2, M.acero, 0, 0, 0, 'z', 20), cil(RM + 0.012, 0.01, M.hierro, 0, 0, 0.1, 'z', 20), cil(RM + 0.012, 0.01, M.hierro, 0, 0, -0.1, 'z', 20)], xM, yM, ZB));
      reg('freno', grp([cil(0.15, 0.09, M.hierro, 0, 0, 0, 'z', 26), caja(0.1, 0.08, 0.07, M.negro, 0.12, 0.1, 0.01), caja(0.1, 0.08, 0.07, M.negro, -0.12, 0.1, 0.01),
        caja(0.02, 0.2, 0.02, M.rojo, 0, 0.22, 0.02)], xM, yM, ZB + 0.65));
      reg('encoder', grp([cil(0.035, 0.05, M.negro, 0, 0, 0, 'z', 14), entre(V(0, 0.03, 0), V(0.1, 0.16, -0.1), 0.006, M.negro)], xM, yM, ZB + 0.72));
      reg('micro_freno', grp([caja(0.04, 0.045, 0.03, M.amarillo, 0.13, -0.09, 0), caja(0.04, 0.045, 0.03, M.amarillo, -0.13, -0.09, 0),
        caja(0.012, 0.03, 0.012, M.negro, 0.13, -0.05, 0), caja(0.012, 0.03, 0.012, M.negro, -0.13, -0.05, 0)], xM, yM, ZB + 0.66));
    }
    if (tipo === 'mr') {
      reg('micro_freno', grp([caja(0.04, 0.05, 0.035, M.amarillo, -0.17, 0.08, 0), caja(0.04, 0.05, 0.035, M.amarillo, 0.17, 0.08, 0),
        caja(0.012, 0.012, 0.03, M.negro, -0.15, 0.08, 0), caja(0.012, 0.012, 0.03, M.negro, 0.15, 0.08, 0)], -0.34, yS - 0.2, zS + 0.38));
    }

    // ---------- bastidor, cabina y lo que viaja con ella ----------
    var SLX = 0.65;
    var bas = new T.Group();
    if (tipo === 'hid') {
      [-0.42, 0.42].forEach(function (z) {
        bas.add(caja(0.08, 3.1, 0.1, M.aceroOsc, 0.66, 1.2, z));
        bas.add(caja(1.3, 0.12, 0.08, M.aceroOsc, 0.05, -0.17, z));
        var esc = caja(0.3, 0.012, 0.09, M.aceroOsc, 0.52, -0.02, z > 0 ? z + 0.045 : z - 0.045); bas.add(esc);
      });
      bas.add(caja(0.08, 0.12, 0.94, M.aceroOsc, 0.66, 2.62, 0), caja(0.08, 0.14, 0.94, M.aceroOsc, 0.66, -0.19, 0), caja(0.08, 0.1, 0.94, M.aceroOsc, 0.66, 1.2, 0));
      bas.add(caja(0.08, 0.1, 0.94, M.aceroOsc, -0.55, -0.17, 0));
    } else {
      bas.add(caja(0.08, 2.95, 0.14, M.aceroOsc, -SLX, 1.2, 0), caja(0.08, 2.95, 0.14, M.aceroOsc, SLX, 1.2, 0));
      bas.add(caja(1.46, 0.16, 0.05, M.aceroOsc, 0, 2.6, 0.07), caja(1.46, 0.16, 0.05, M.aceroOsc, 0, 2.6, -0.07));
      bas.add(caja(1.46, 0.14, 0.14, M.aceroOsc, 0, -0.19, 0));
      [[-1, 1], [1, 1], [-1, -1], [1, -1]].forEach(function (q) { bas.add(entre(V(q[0] * SLX, 0.9, 0), V(q[0] * 0.52, -0.11, q[1] * 0.6), 0.012, M.acero)); });
    }
    reg('bastidor', bas, cab);
    ancla('bastidor', cab, tipo === 'hid' ? V(0.66, 1.3, 0) : V(SLX, 1.5, 0));

    var gc = new T.Group(), HI = 2.2;
    gc.add(caja(CW, 0.1, CD, M.aceroOsc, 0, -0.05, 0), caja(CW - 0.04, 0.012, CD - 0.04, M.piso, 0, 0.006, 0));
    gc.add(plano(CD, HI, M.panel, -CW / 2 + 0.005, HI / 2, 0, PI / 2), plano(CD, HI, M.panel, CW / 2 - 0.005, HI / 2, 0, -PI / 2), plano(CW, HI, M.panel, 0, HI / 2, -CD / 2 + 0.005, 0));
    gc.add(caja(0.2, HI, 0.02, M.inox, -0.5, HI / 2, CD / 2 - 0.01), caja(0.2, HI, 0.02, M.inox, 0.5, HI / 2, CD / 2 - 0.01), caja(PASO, HI - PALTO, 0.02, M.inox, 0, PALTO + (HI - PALTO) / 2, CD / 2 - 0.01));
    gc.add(caja(CW, 0.04, CD, M.gris, 0, HI + 0.02, 0));
    [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(function (q) { gc.add(caja(0.03, HI, 0.03, M.aceroOsc, q[0] * (CW / 2 - 0.015), HI / 2, q[1] * (CD / 2 - 0.015))); });
    gc.add(cil(0.016, 0.8, M.cromo, 0, 0.9, -CD / 2 + 0.07, 'x', 10), caja(0.6, 0.02, 0.6, M.luz, 0, HI - 0.012, -0.05));
    gc.add(caja(0.5, 0.9, 0.006, M.grisClaro, 0, 1.45, -CD / 2 + 0.012));
    reg('cabina', gc, cab);
    ancla('cabina', cab, V(0, 1.1, 0));

    // rozaderas
    var pr = tipo === 'hid' ? [[0.73, 2.72, -0.42], [0.73, 2.72, 0.42], [0.73, -0.32, -0.42], [0.73, -0.32, 0.42]]
      : [[-0.72, 2.75, 0, 1], [0.72, 2.75, 0], [-0.72, -0.3, 0, 1], [0.72, -0.3, 0]];
    var idRoz = tipo === 'mr' ? 'rodaderas' : 'rozaderas';
    function aceitera() { return grp([cil(0.028, 0.05, M.cobre, 0, 0, 0, 'y', 12), cil(0.03, 0.008, M.hierro, 0, 0.028, 0, 'y', 12), cil(0.006, 0.03, M.blanco, 0, -0.035, 0, 'y', 6)]); }
    pr.forEach(function (q, i) {
      var d = q[3] ? 1 : -1, z;   // hacia dónde mira la base
      if (tipo === 'mr') {
        // rodadera: una rueda contra el canto de la guía y dos contra sus caras, con resortes
        z = grp([caja(0.02, 0.24, 0.18, M.hierro, d * 0.09, 0.02, 0), cil(0.04, 0.026, M.goma, d * 0.04, -0.04, 0, 'z', 16), cil(0.012, 0.05, M.acero, d * 0.04, -0.04, 0, 'z', 8),
          cil(0.04, 0.026, M.goma, -d * 0.03, 0.07, 0.049, 'x', 16), cil(0.04, 0.026, M.goma, -d * 0.03, 0.07, -0.049, 'x', 16),
          caja(0.1, 0.02, 0.02, M.hierro, d * 0.03, 0.07, 0.09), caja(0.1, 0.02, 0.02, M.hierro, d * 0.03, 0.07, -0.09),
          cil(0.012, 0.05, M.rojo, d * 0.06, 0.07, 0.09, 'x', 8), cil(0.012, 0.05, M.rojo, d * 0.06, 0.07, -0.09, 'x', 8)], q[0], q[1], q[2]);
      } else {
        z = grp([caja(0.03, 0.13, 0.11, M.hierro, d * 0.035, 0, 0), caja(0.055, 0.11, 0.028, M.hierro, 0, 0, 0.03), caja(0.055, 0.11, 0.028, M.hierro, 0, 0, -0.03),
          caja(0.05, 0.1, 0.008, M.blanco, 0, 0, 0.012), caja(0.05, 0.1, 0.008, M.blanco, 0, 0, -0.012)], q[0], q[1], q[2]);
        if (q[1] > 2) reg('aceiteras', en(aceitera(), q[0], q[1] + 0.1, q[2]), cab);
      }
      reg(idRoz, z, cab);
      if (i === 1) principal(idRoz, z);
    });
    // el contrapeso también lleva aceiteras sobre sus rozaderas de arriba
    if (altoCP) {
      var xo = (tipo === 'mr' ? 1.06 : 0.82) / 2 + 0.02;
      reg('aceiteras', en(aceitera(), -xo, altoCP + 0.04, 0), cp); reg('aceiteras', en(aceitera(), xo, altoCP + 0.04, 0), cp);
    }

    // paracaídas
    var gov = tipo === 'mr' ? { x: 0.82, z: -0.17 } : tipo === 'mrl' ? { x: -0.86, z: 0.52 } : { x: 0.84, z: -0.51 };
    var gzc = gov.z - 0.12;                    // centro de las poleas del limitador
    var lado = tipo === 'mrl' ? -1 : 1;        // lado donde está el cable del limitador
    var gpc = new T.Group();
    var bq = tipo === 'hid' ? [[0.73, -0.46, -0.42], [0.73, -0.46, 0.42]] : [[-0.72, -0.44, 0], [0.72, -0.44, 0]];
    bq.forEach(function (q) {
      gpc.add(caja(0.14, 0.18, 0.15, M.hierro, q[0], q[1], q[2]), caja(0.03, 0.12, 0.03, M.amarillo, q[0], q[1], q[2] + 0.035), caja(0.03, 0.12, 0.03, M.amarillo, q[0], q[1], q[2] - 0.035));
    });
    var pv = V(gov.x - cx, -0.2, gov.z - ZC);
    if (tipo === 'hid') { gpc.add(cil(0.012, 0.9, M.acero, 0.73, -0.36, 0, 'z', 8)); gpc.add(entre(V(0.73, -0.36, -0.44), pv, 0.012, M.acero)); }
    else { gpc.add(cil(0.012, 1.46, M.acero, 0, -0.36, 0.1, 'x', 8)); gpc.add(entre(V(lado * 0.72, -0.36, 0.1), pv, 0.012, M.acero)); }
    gpc.add(caja(0.05, 0.07, 0.05, M.rojo, pv.x, pv.y, pv.z));
    reg('paracaidas', gpc, cab);
    reg('contacto_paracaidas', grp([caja(0.05, 0.06, 0.04, M.negro, 0, 0, 0), caja(0.02, 0.02, 0.02, M.amarillo, lado * 0.035, 0.01, 0), entre(V(0, 0.03, 0), V(-lado * 0.05, 0.14, 0), 0.005, M.negro)], pv.x - lado * 0.1, pv.y + 0.02, pv.z), cab);
    ancla('paracaidas', cab, V(bq[bq.length - 1][0], bq[0][1], bq[bq.length - 1][2]));

    // poleas bajo cabina (mrl)
    var xP1 = -0.6, xP2 = 0.59, yP = -0.32, zP = ZB - ZC, RP = 0.07;
    if (tipo === 'mrl') {
      reg('poleas_cabina', grp([en(polea(RP, 0.18, 'z'), xP1, yP, zP), en(polea(RP, 0.18, 'z'), xP2, yP, zP),
        caja(1.36, 0.05, 0.03, M.aceroOsc, 0, -0.2, zP + 0.11), caja(1.36, 0.05, 0.03, M.aceroOsc, 0, -0.2, zP - 0.11),
        caja(0.03, 0.2, 0.03, M.aceroOsc, xP1, -0.26, zP + 0.11), caja(0.03, 0.2, 0.03, M.aceroOsc, xP1, -0.26, zP - 0.11),
        caja(0.03, 0.2, 0.03, M.aceroOsc, xP2, -0.26, zP + 0.11), caja(0.03, 0.2, 0.03, M.aceroOsc, xP2, -0.26, zP - 0.11)]), cab);
      ancla('poleas_cabina', cab, V(xP2, yP, zP));
    }

    // ---------- cables o cintas de tracción y amarres ----------
    var ofs, i, yTop = 8.95, gcab = new T.Group(), gfix = new T.Group();
    reg('cables_traccion', gfix); reg('cables_traccion', gcab, cab);
    if (tipo === 'mr') {
      ofs = [-0.045, -0.015, 0.015, 0.045];
      var dz = zD - zS, dy = yD - yS, base = Math.atan2(dy, dz), aT = base - Math.acos((RS - RD) / Math.hypot(dz, dy));
      if (aT < 0) aT += 2 * PI;
      ofs.forEach(function (x) {
        arcoYZ(gfix, x, zS, yS, RS + 0.004, 0, aT, 12, 0.007, M.hierro);
        gfix.add(entre(V(x, yS + RS * Math.sin(aT), zS + RS * Math.cos(aT)), V(x, yD + RD * Math.sin(aT), zD + RD * Math.cos(aT)), 0.007, M.hierro, 6));
        arcoYZ(gfix, x, zD, yD, RD + 0.004, aT, PI, 3, 0.007, M.hierro);
        var a = tramo(G.cable, M.hierro, x, ZC, 0.05), b = tramo(G.cable, M.hierro, x, zD - RD, 0.05);
        gfix.add(a, b);
        dyn.push(function (cy, wy) { a.pon(cy + 2.86, yS); b.pon(wy + altoCP + 0.18, yD); });
      });
      ancla('cables_traccion', raiz, V(0, 8.75, ZC));
      // amarres 1:1 sobre bastidor y contrapeso
      var am1 = new T.Group(), am2 = new T.Group();
      am1.add(caja(0.22, 0.025, 0.12, M.hierro, 0, 2.7, 0)); am2.add(caja(0.22, 0.025, 0.12, M.hierro, 0, altoCP + 0.01, 0));
      ofs.forEach(function (x) {
        am1.add(cil(0.009, 0.3, M.acero, x, 2.74, 0), cil(0.02, 0.09, M.rojo, x, 2.63, 0, 'y', 10), cil(0.016, 0.02, M.acero, x, 2.575, 0, 'y', 6));
        am2.add(cil(0.009, 0.3, M.acero, x, altoCP + 0.06, 0), cil(0.02, 0.09, M.rojo, x, altoCP - 0.16, 0, 'y', 10));
      });
      reg('amarres', am1, cab); reg('amarres', am2, cp);
    }
    if (tipo === 'mrl') {
      ofs = [-0.06, 0, 0.06];
      var xL = cx + xP1 - RP, xU = cx + xP2 + RP, xDn = xM + RM, xCW = 0.75, RC = 0.1, garc = new T.Group();
      raiz.add(garc); garc.userData.parte = 'cables_traccion'; partes.cables_traccion.miembros.push(garc);
      ofs.forEach(function (o) {
        var z = ZB + o;
        arcoXYcinta(gcab, zP + o, xP1, yP, RP + 0.003, PI, 1.5 * PI, 5);
        arcoXYcinta(gcab, zP + o, xP2, yP, RP + 0.003, 1.5 * PI, 2 * PI, 5);
        gcab.add(caja(xP2 - xP1, 0.005, 0.03, M.cinta, (xP1 + xP2) / 2, yP - RP - 0.003, zP + o));
        arcoXYcinta(gfix, z, xM, yM, RM + 0.003, PI, 0, 8);
        arcoXYcinta(garc, z, xCW, 0, RC + 0.003, PI, 2 * PI, 8);
        var a = tramo(G.cinta, M.cinta, xL, z), b = tramo(G.cinta, M.cinta, xU, z), c = tramo(G.cinta, M.cinta, xDn, z), d = tramo(G.cinta, M.cinta, xCW + RC, z);
        gfix.add(a, b, c, d);
        dyn.push(function (cy, wy) { var yc = wy + altoCP + 0.16; a.pon(cy + yP, yTop); b.pon(cy + yP, yM); c.pon(yc, yM); d.pon(yc, yTop); });
      });
      dyn.push(function (cy, wy) { garc.position.y = wy + altoCP + 0.16; });
      gfix.add(en(new T.Mesh(new T.BoxGeometry(0.12, 1.2, 0.2), M.toque), xL, 7.9, ZB));
      ancla('cables_traccion', raiz, V(xL, 8.3, ZB));
      // amarres 2:1: puntos fijos arriba
      [xL, xCW + RC].forEach(function (x, j) {
        var g = grp([caja(0.1, 0.03, 0.24, M.hierro, 0, 0, 0), caja(0.06, 0.2, 0.26, M.aceroOsc, j ? 0.05 : -0.05, 0.02, 0)], x, yTop, ZB);
        ofs.forEach(function (o) { g.add(cil(0.008, 0.2, M.acero, 0, 0.08, o), cil(0.018, 0.08, M.rojo, 0, 0.07, o, 'y', 10), caja(0.03, 0.05, 0.036, M.hierro, 0, -0.035, o)); });
        reg('amarres', g);
      });
      // monitor de fajas en el muro, con un hilo a la punta de cada faja, y el contacto de faja floja junto al amarre
      var gmf = grp([caja(0.035, 0.18, 0.14, M.negro, 0, 0, 0), caja(0.004, 0.06, 0.08, M.grisClaro, 0.02, 0.03, 0), boton(0.006, M.ledV, 0.02, -0.04, 0.03, 'x'), boton(0.006, M.led, 0.02, -0.04, -0.03, 'x')], -HX + 0.03, yTop + 0.02, ZB + 0.3);
      ofs.forEach(function (o) { gmf.add(entre(V(0.01, -0.05, -0.07), V(xL + HX - 0.03, 0.17, o - 0.3), 0.004, M.rojo)); });
      gmf.add(caja(0.04, 0.05, 0.035, M.amarillo, xL + HX + 0.04, -0.06, -0.3));
      reg('monitor_fajas', gmf);
    }
    var gp = null, yPis = function (cy) { return 2.85 + cy / 2; }, RH = 0.16, xH = 0.8;
    if (tipo === 'hid') {
      ofs = [-0.02, 0.02];
      gp = new T.Group(); gp.position.set(xH, 0, ZC); raiz.add(gp);
      var garh = new T.Group(); gp.add(garh); garh.userData.parte = 'cables_traccion'; partes.cables_traccion.miembros.push(garh);
      ofs.forEach(function (o) {
        arcoYZ(garh, o, 0, 0, RH + 0.004, 0, PI, 10, 0.007, M.hierro);
        var a = tramo(G.cable, M.hierro, xH + o, ZC - RH), b = tramo(G.cable, M.hierro, xH + o, ZC + RH);
        gfix.add(a, b);
        dyn.push(function (cy) { var y = yPis(cy); a.pon(-1.0, y); b.pon(cy - 0.19, y); });
      });
      gfix.add(en(new T.Mesh(new T.BoxGeometry(0.12, 1.6, 0.12), M.toque), xH, 1.2, ZC - RH));
      ancla('cables_traccion', raiz, V(xH, 1.2, ZC - RH));
      reg('amarres', grp([caja(0.14, 0.03, 0.12, M.hierro, 0, 0, 0), caja(0.05, 0.3, 0.1, M.aceroOsc, 0.06, -0.14, 0),
        cil(0.009, 0.24, M.acero, -0.02, -0.08, 0), cil(0.009, 0.24, M.acero, 0.02, -0.08, 0), cil(0.018, 0.08, M.rojo, -0.02, -0.1, 0, 'y', 10), cil(0.018, 0.08, M.rojo, 0.02, -0.1, 0, 'y', 10)], xH, -1.0, ZC - RH));
      reg('amarres', grp([caja(0.3, 0.05, 0.1, M.aceroOsc, -0.11, 0, 0), caja(0.12, 0.03, 0.12, M.hierro, 0, 0.03, 0),
        cil(0.018, 0.08, M.rojo, -0.02, -0.06, 0, 'y', 10), cil(0.018, 0.08, M.rojo, 0.02, -0.06, 0, 'y', 10)], xH - cx, -0.2, RH), cab);
      reg('cable_flojo', grp([caja(0.05, 0.06, 0.04, M.negro, 0, 0, 0), caja(0.05, 0.012, 0.012, M.amarillo, 0.045, 0.02, 0), entre(V(0, -0.03, 0), V(-0.03, -0.2, 0.05), 0.005, M.negro)], xH - 0.1, -0.93, ZC - RH));
    }

    // cadena de compensación (mr)
    if (tipo === 'mr') {
      var gch = new T.Group(), zc1 = -0.5, zc2 = -0.82, rch = (zc1 - zc2) / 2, yL = -FOSO + 0.35 + rch;
      arcoYZ(gch, 0, (zc1 + zc2) / 2, yL, rch, PI, 2 * PI, 8, 0.018, M.negro);
      var c1 = tramo(G.cadena, M.negro, 0, zc1, 0.1), c2 = tramo(G.cadena, M.negro, 0, zc2, 0.1);
      gch.add(c1, c2);
      dyn.push(function (cy, wy) { c1.pon(yL, cy - 0.28); c2.pon(yL, wy); });
      gch.add(caja(0.1, 0.04, 0.3, M.aceroOsc, 0, yL - rch - 0.12, (zc1 + zc2) / 2), cil(0.03, 0.16, M.goma, 0, yL - rch - 0.07, (zc1 + zc2) / 2 + 0.1, 'x', 10), cil(0.03, 0.16, M.goma, 0, yL - rch - 0.07, (zc1 + zc2) / 2 - 0.1, 'x', 10));
      var xch = 0.3;   // a un lado del amortiguador del contrapeso
      gch.position.x = xch;
      reg('cadena_compensacion', gch);
      reg('cadena_compensacion', caja(0.08, 0.05, 0.3, M.aceroOsc, xch, -0.29, zc1 - ZC + 0.13), cab);
      ancla('cadena_compensacion', raiz, V(xch, yL - rch, (zc1 + zc2) / 2));
    }

    // ---------- limitador, tensora y su cable ----------
    var gy = tipo === 'mr' ? yF + 0.21 : TECHO - 0.45, yT = -FOSO + 0.45;
    var glim = grp([caja(0.18, 0.02, 0.38, M.aceroOsc, 0, -0.2, 0), caja(0.012, 0.36, 0.3, M.gris, 0.045, -0.03, 0), caja(0.012, 0.36, 0.3, M.gris, -0.045, -0.03, 0),
      polea(0.12, 0.03, 'x', M.aceroOsc), caja(0.02, 0.05, 0.03, M.rojo, 0.03, 0.06, 0.05), caja(0.02, 0.05, 0.03, M.rojo, 0.03, -0.06, -0.05),
      caja(0.06, 0.08, 0.05, M.negro, 0.09, 0.1, 0.1), caja(0.05, 0.03, 0.002, M.amarillo, 0.052, -0.14, 0)], gov.x, gy, gzc);
    if (tipo !== 'mr') glim.add(viga(V(0, -0.2, 0), V(tipo === 'mrl' ? -0.09 : 0.11, -0.2, 0), 0.3, 0.03, M.aceroOsc), caja(0.02, 0.3, 0.3, M.aceroOsc, tipo === 'mrl' ? -0.08 : 0.1, -0.06, 0));
    reg('limitador', glim);
    reg('polea_tensora', grp([polea(0.12, 0.03, 'x', M.aceroOsc), caja(0.03, 0.03, 0.46, M.aceroOsc, 0.05, 0, 0.12), caja(0.04, 0.5, 0.04, M.aceroOsc, 0.05, -0.2, 0.35),
      caja(0.1, 0.22, 0.12, M.hierro, 0, -0.26, 0), caja(0.012, 0.16, 0.012, M.acero, 0, -0.12, 0), caja(0.05, 0.07, 0.04, M.negro, 0.06, 0.1, 0.2)], gov.x, yT, gzc));
    var gcl = new T.Group();
    [gov.z, gov.z - 0.24].forEach(function (z) { var t = tramo(G.cableFino, M.hierro, gov.x, z, 0.09); t.pon(yT, gy); gcl.add(t); });
    reg('cable_limitador', gcl);
    ancla('cable_limitador', raiz, V(gov.x, 4.2, gov.z));

    // ---------- puertas ----------
    var hojasCab = [new T.Group(), new T.Group()], hojasPiso = [], zPC = CD / 2 + 0.035, zPP = HZ - 0.035;
    cab.add(hojasCab[0], hojasCab[1]);
    for (f = 0; f < NP; f++) { var ha = new T.Group(), hb = new T.Group(); ha.position.y = hb.position.y = f * FH; raiz.add(ha, hb); hojasPiso.push([ha, hb]); }
    function hoja() { return grp([caja(0.405, PALTO, 0.025, M.inox, 0, PALTO / 2 + 0.004, 0), caja(0.006, PALTO, 0.027, M.grisClaro, 0, PALTO / 2 + 0.004, 0)]); }
    // roldanas (rolos) que ruedan sobre el riel y contrarruedas que van por debajo
    function roldanas(z) {
      return grp([cil(0.028, 0.02, M.blanco, -0.11, PALTO + 0.12, z, 'z', 14), cil(0.028, 0.02, M.blanco, 0.11, PALTO + 0.12, z, 'z', 14),
        cil(0.01, 0.024, M.hierro, -0.11, PALTO + 0.12, z, 'z', 8), cil(0.01, 0.024, M.hierro, 0.11, PALTO + 0.12, z, 'z', 8),
        cil(0.013, 0.016, M.acero, -0.11, PALTO + 0.056, z, 'z', 10), cil(0.013, 0.016, M.acero, 0.11, PALTO + 0.056, z, 'z', 10)]);
    }
    function guiadores() {
      return grp([caja(0.04, 0.022, 0.01, M.negro, -0.13, -0.01, 0), caja(0.04, 0.022, 0.01, M.negro, 0.13, -0.01, 0),
        caja(0.05, 0.03, 0.004, M.acero, -0.13, 0.016, 0.014), caja(0.05, 0.03, 0.004, M.acero, 0.13, 0.016, 0.014),
        new T.Mesh(new T.BoxGeometry(0.36, 0.07, 0.05), M.toque)]);
    }
    for (f = 0; f < NP; f++) {
      var yy = f * FH;
      var marco = grp([caja(0.1, PALTO + 0.1, 0.12, M.inox, cx - PASO / 2 - 0.05, yy + (PALTO + 0.1) / 2, HZ + 0.02), caja(0.1, PALTO + 0.1, 0.12, M.inox, cx + PASO / 2 + 0.05, yy + (PALTO + 0.1) / 2, HZ + 0.02),
        caja(PASO + 0.2, 0.1, 0.12, M.inox, cx, yy + PALTO + 0.05, HZ + 0.02)]);
      reg('puerta_piso', marco);
      if (f === NP - 1) principal('puerta_piso', marco);
      [0, 1].forEach(function (s) {
        reg('puerta_piso', en(hoja(), 0, 0, zPP), hojasPiso[f][s]);
        // carro del que cuelga la hoja, sus roldanas y los guiadores de abajo
        reg('cabezal_piso', caja(0.34, 0.1, 0.008, M.aceroOsc, 0, PALTO + 0.05, zPP - 0.02), hojasPiso[f][s]);
        var ro = reg('roldanas_puerta', en(roldanas(-0.035), 0, 0, zPP), hojasPiso[f][s]);
        var gu = reg('guiadores_puerta', en(guiadores(), 0, 0, zPP), hojasPiso[f][s]);
        if (f === NP - 1 && s === 1) { principal('roldanas_puerta', ro); principal('guiadores_puerta', gu); }
      });
      var cabz = grp([caja(1.66, 0.22, 0.012, M.aceroOsc, 0, PALTO + 0.17, -0.006), caja(1.6, 0.03, 0.03, M.acero, 0, PALTO + 0.085, -0.05)], cx, yy, HZ - 0.012);
      reg('cabezal_piso', cabz);
      if (f === NP - 1) principal('cabezal_piso', cabz);
      var sinc = grp([cil(0.03, 0.02, M.negro, -0.78, PALTO + 0.2, -0.04, 'z', 12), cil(0.03, 0.02, M.negro, 0.78, PALTO + 0.2, -0.04, 'z', 12),
        caja(1.56, 0.005, 0.005, M.hierro, 0, PALTO + 0.23, -0.04), caja(1.56, 0.005, 0.005, M.hierro, 0, PALTO + 0.17, -0.04),
        caja(0.03, 0.03, 0.02, M.rojo, -0.3, PALTO + 0.23, -0.04), caja(0.03, 0.03, 0.02, M.rojo, 0.3, PALTO + 0.17, -0.04),
        en(new T.Mesh(new T.BoxGeometry(1.62, 0.1, 0.05), M.toque), 0, PALTO + 0.2, -0.04)], cx, yy, HZ - 0.012);
      reg('cable_sincronismo', sinc);
      var pes = grp([cil(0.024, 0.22, M.hierro, 0, -0.11, 0, 'y', 10), caja(0.005, 0.46, 0.005, M.hierro, 0, 0.23, 0), cil(0.014, 0.012, M.negro, 0, 0.46, 0, 'z', 10),
        en(new T.Mesh(new T.BoxGeometry(0.08, 0.7, 0.06), M.toque), 0, 0.12, 0)], cx - 0.79, yy + PALTO - 0.26, HZ - 0.062);
      reg('pesa_cierre', pes);
      if (f === NP - 1) { principal('cable_sincronismo', sinc); principal('pesa_cierre', pes); }
      var cer = grp([caja(0.1, 0.075, 0.04, M.negro, -0.08, PALTO + 0.03, -0.045), caja(0.05, 0.02, 0.02, M.amarillo, -0.005, PALTO + 0.045, -0.045),
        cil(0.018, 0.035, M.goma, -0.095, PALTO - 0.07, -0.05, 'z', 12), cil(0.018, 0.035, M.goma, -0.065, PALTO - 0.07, -0.05, 'z', 12),
        caja(0.06, 0.1, 0.008, M.aceroOsc, -0.08, PALTO - 0.04, -0.03)], 0, 0, zPP);
      reg('cerradura', cer, hojasPiso[f][1]);
      if (f === NP - 1) principal('cerradura', cer);
      reg('cerradura', grp([caja(0.05, 0.05, 0.04, M.negro, 0, 0, 0), caja(0.03, 0.012, 0.012, M.cobre, -0.03, 0, 0)], cx + 0.05, yy + PALTO + 0.045, HZ - 0.08));
      reg('cerradura', cil(0.012, 0.012, M.negro, cx + 0.28, yy + PALTO + 0.05, HZ + 0.082, 'z', 3));
      var pis = grp([caja(PASO + 0.14, 0.025, 0.07, M.acero, 0, -0.0125, 0), caja(PASO + 0.14, 0.003, 0.012, M.negro, 0, 0.001, 0)], cx, yy, zPP);
      reg('pisadera', pis);
      if (f === NP - 1) principal('pisadera', pis);
      var bot = grp([caja(0.09, 0.22, 0.016, M.inox, 0, 0, 0), boton(0.018, M.grisClaro, 0, 0.04, 0.012), boton(0.018, M.grisClaro, 0, -0.04, 0.012), boton(0.006, M.ledV, 0, 0.085, 0.01)], cx - 0.72, yy + 1.1, HZ + 0.078);
      reg('botonera_piso', bot);
      if (f === NP - 1) principal('botonera_piso', bot);
      reg('botonera_piso', grp([caja(0.24, 0.085, 0.02, M.negro, 0, 0, 0), en(new T.Mesh(new T.PlaneGeometry(0.11, 0.055), M.display), 0, 0, 0.011)], cx, yy + PALTO + 0.27, HZ + 0.08));
    }
    reg('pisadera', grp([caja(PASO + 0.14, 0.025, 0.07, M.acero, 0, -0.0125, 0), caja(PASO + 0.14, 0.003, 0.012, M.negro, 0, 0.001, 0)], 0, 0, zPC), cab);

    [0, 1].forEach(function (s) {
      var h = reg('puerta_cabina', en(hoja(), 0, 0, zPC), hojasCab[s]);
      if (s === 1) principal('puerta_cabina', h);
      reg('puerta_cabina', caja(0.34, 0.1, 0.008, M.aceroOsc, 0, PALTO + 0.05, zPC + 0.02), hojasCab[s]);
      reg('roldanas_puerta', en(roldanas(0.035), 0, 0, zPC), hojasCab[s]);
      reg('guiadores_puerta', en(guiadores(), 0, 0, zPC), hojasCab[s]);
      var d = s ? -1 : 1;   // canto que mira al centro
      var cl = grp([caja(0.022, 1.9, 0.036, M.negro, 0, 1.0, 0), caja(0.006, 1.82, 0.022, M.rojo, d * 0.012, 1.0, 0), new T.Mesh(new T.BoxGeometry(0.09, 1.9, 0.09), M.toque)], d * 0.19, 0.02, zPC + 0.034);
      cl.children[2].position.y = 1.0;
      reg('cortina_luminosa', cl, hojasCab[s]);
      if (s === 1) principal('cortina_luminosa', cl);
    });
    var rayos = new T.Group();
    for (k = 0; k < 14; k++) rayos.add(caja(1, 0.004, 0.004, M.rayo, 0, 0.12 + k * 0.135, 0));
    rayos.position.set(0, 0.02, zPC + 0.03); rayos.visible = false; cab.add(rayos);
    reg('patin', grp([caja(0.012, 0.46, 0.045, M.acero, -0.115, 0, 0), caja(0.012, 0.46, 0.045, M.acero, -0.045, 0, 0), caja(0.11, 0.3, 0.006, M.aceroOsc, -0.08, 0, -0.022),
      caja(0.03, 0.03, 0.03, M.hierro, -0.08, 0.12, -0.01), caja(0.03, 0.03, 0.03, M.hierro, -0.08, -0.12, -0.01)], 0, 1.86, zPC + 0.045), hojasCab[1]);
    // operador sobre el techo de la cabina
    reg('operador_puertas', grp([caja(1.5, 0.22, 0.012, M.aceroOsc, 0, 0.15, -0.03), caja(1.45, 0.03, 0.03, M.acero, 0, 0.07, 0.035),
      cil(0.055, 0.14, M.negro, -0.56, 0.2, -0.06, 'z', 16), cil(0.03, 0.03, M.acero, -0.56, 0.2, 0.01, 'z', 12), cil(0.03, 0.03, M.acero, 0.6, 0.2, 0.01, 'z', 12),
      caja(1.16, 0.006, 0.014, M.goma, 0.02, 0.23, 0.01), caja(1.16, 0.006, 0.014, M.goma, 0.02, 0.17, 0.01),
      caja(0.24, 0.13, 0.09, M.gris, 0.42, 0.33, -0.1), boton(0.008, M.ledV, 0.36, 0.33, -0.05), caja(1.5, 0.02, 0.2, M.aceroOsc, 0, 0.27, -0.12)], 0, PALTO, CD / 2 + 0.04), cab);
    ancla('operador_puertas', cab, V(0, PALTO + 0.2, CD / 2 + 0.06));
    reg('contacto_puerta_cabina', grp([caja(0.055, 0.045, 0.03, M.negro, 0, 0, 0), caja(0.02, 0.014, 0.014, M.cobre, -0.04, 0, 0), caja(0.03, 0.02, 0.02, M.amarillo, -0.06, -0.035, 0),
      entre(V(0.02, 0.02, 0), V(0.14, 0.1, -0.02), 0.005, M.negro)], 0.07, PALTO + 0.2, CD / 2 + 0.035), cab);

    // ---------- lo que va en la cabina ----------
    var gbc = grp([caja(0.16, 1.1, 0.02, M.inox, 0, 0, 0), grp([caja(0.11, 0.07, 0.004, M.negro, 0, 0, 0), en(new T.Mesh(new T.PlaneGeometry(0.09, 0.05), M.display), 0, 0, -0.003)], 0, 0.42, -0.012)], 0.5, 1.35, CD / 2 - 0.03);
    gbc.children[1].children[1].rotation.y = PI;
    [0.22, 0.12, 0.02].forEach(function (y) { gbc.add(boton(0.016, M.grisClaro, 0, y, -0.014)); });
    gbc.add(boton(0.014, M.grisClaro, -0.035, -0.12, -0.014), boton(0.014, M.grisClaro, 0.035, -0.12, -0.014), boton(0.018, M.amarillo, 0, -0.24, -0.014), boton(0.012, M.negro, 0, -0.36, -0.014), caja(0.09, 0.035, 0.003, M.grisClaro, 0, -0.47, -0.011));
    reg('botonera_cabina', gbc, cab);
    reg('pesacargas', grp([caja(0.14, 0.035, 0.14, M.negro, 0, 0, 0), caja(0.1, 0.07, 0.16, M.gris, 0.32, -0.03, 0), entre(V(0.07, 0, 0), V(0.27, -0.02, 0), 0.006, M.negro), boton(0.006, M.ledV, 0.32, -0.03, 0.082)], 0, -0.12, 0.42), cab);
    var gci = grp([caja(0.2, 0.1, 0.28, M.amarillo, 0, 0, 0), cil(0.024, 0.035, M.rojo, 0, 0.065, 0.08, 'y', 14), cil(0.014, 0.02, M.negro, -0.05, 0.058, -0.02, 'y', 10), cil(0.014, 0.02, M.negro, 0.05, 0.058, -0.02, 'y', 10),
      cil(0.016, 0.03, M.negro, 0, 0.062, -0.09, 'y', 8), caja(0.06, 0.05, 0.02, M.blanco, 0, 0, -0.15)], 0.33, HI + 0.09, 0.2);
    reg('caja_inspeccion', gci, cab);
    reg('faldon', grp([caja(0.9, 0.72, 0.012, M.acero, 0, -0.36, 0), en(caja(0.9, 0.14, 0.012, M.acero), 0, -0.77, -0.035)], 0, -0.1, CD / 2 + 0.03), cab);
    partes.faldon.miembros[0].children[1].rotation.x = -0.55;
    reg('emergencia', grp([caja(0.22, 0.025, 0.09, M.luz, 0, -0.07, 0), caja(0.2, 0.1, 0.13, M.gris, 0, 0.09, 0), cil(0.05, 0.05, M.rojo, 0.2, 0.07, 0, 'y', 14), boton(0.006, M.led, 0.06, 0.09, 0.067)], -0.3, HI, -0.42), cab);
    reg('caja_techo', grp([caja(0.32, 0.12, 0.22, M.gris, 0, 0, 0), caja(0.3, 0.006, 0.2, M.grisClaro, 0, 0.063, 0), cil(0.012, 0.03, M.negro, -0.1, 0, 0.125, 'z', 8), cil(0.012, 0.03, M.negro, 0, 0, 0.125, 'z', 8),
      cil(0.012, 0.03, M.negro, 0.1, 0, 0.125, 'z', 8), boton(0.006, M.ledV, 0.12, 0.068, 0.06, 'y')], -0.33, HI + 0.1, 0.25), cab);
    var gba = new T.Group(), yb0 = HI + 0.04, hb = 0.6, xb = CW / 2 - 0.03, zb = -CD / 2 + 0.03;
    [[-xb, zb], [xb, zb], [-xb, -0.2], [xb, -0.2], [0, zb]].forEach(function (q) { gba.add(caja(0.03, hb, 0.03, M.amarillo, q[0], yb0 + hb / 2, q[1])); });
    [hb, hb * 0.5].forEach(function (h) {
      gba.add(caja(2 * xb, 0.03, 0.03, M.amarillo, 0, yb0 + h, zb), caja(0.03, 0.03, -0.2 - zb, M.amarillo, -xb, yb0 + h, (zb - 0.2) / 2), caja(0.03, 0.03, -0.2 - zb, M.amarillo, xb, yb0 + h, (zb - 0.2) / 2));
    });
    gba.add(caja(2 * xb, 0.08, 0.006, M.amarillo, 0, yb0 + 0.04, zb));
    reg('baranda_techo', gba, cab);

    // ---------- tablero, interruptor y rescate ----------
    function gabinete(w, h, d, m) {
      return grp([caja(w, h, d, m, 0, 0, 0), caja(w - 0.04, h - 0.06, 0.006, M.grisClaro, 0, 0, d / 2 + 0.002), caja(0.015, 0.09, 0.02, M.negro, w / 2 - 0.05, 0, d / 2 + 0.012),
        boton(0.008, M.ledV, -w / 2 + 0.06, h / 2 - 0.08, d / 2 + 0.006), boton(0.008, M.led, -w / 2 + 0.1, h / 2 - 0.08, d / 2 + 0.006)]);
    }
    function interruptor() { return grp([caja(0.22, 0.34, 0.1, M.gris, 0, 0, 0), caja(0.05, 0.14, 0.03, M.rojo, 0, 0.02, 0.062), caja(0.12, 0.12, 0.004, M.amarillo, 0, 0.02, 0.052)]); }
    var tb, it, rs;
    if (tipo === 'mr') {
      tb = gabinete(0.7, 1.7, 0.3, M.gris); tb.rotation.y = PI / 2; tb.position.set(-1.58, yF + 0.87, -0.35);
      it = interruptor(); it.rotation.y = PI / 2; it.position.set(-1.69, yF + 1.4, 0.72);
      rs = gabinete(0.4, 0.6, 0.28, M.aceroOsc); rs.rotation.y = PI / 2; rs.position.set(-1.6, yF + 0.32, 0.25);
    } else if (tipo === 'mrl') {
      var yu = (NP - 1) * FH;
      // Otis: gabinete ancho sobrepuesto al marco; Schindler: armario angosto metido en la jamba
      tb = gabinete(sch ? 0.22 : 0.38, 2.1, sch ? 0.13 : 0.18, M.inox); tb.position.set(cx + PASO / 2 + (sch ? 0.21 : 0.29), yu + 1.05, HZ + 0.02);
      it = interruptor(); it.scale.set(0.8, 0.8, 0.8); it.position.set(cx + PASO / 2 + 0.27, yu + 2.3, HZ + 0.03);
      rs = gabinete(0.3, 0.34, 0.16, M.aceroOsc); rs.rotation.y = PI; rs.position.set(HX - 0.16, yu + 2.3, HZ - 0.09);   // pegado al muro derecho, fuera del paso de la cabina
    } else {
      tb = gabinete(0.6, 1.2, 0.25, M.gris); tb.position.set(1.7, 1.15, -2.3);
      it = interruptor(); it.position.set(2.72, 1.4, -2.39);
      rs = gabinete(0.3, 0.34, 0.2, M.aceroOsc); rs.position.set(2.25, 0.95, -2.33);
    }
    reg('tablero_control', tb); reg('interruptor_principal', it); reg('rescate', rs);

    // ---------- variador y cables del motor ----------
    function tubo(pts, r, m) { return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), 36, r, 7, false), m); }
    function variadorCaja(w, h, d) {
      var g = grp([caja(w, h, d, sch ? M.grisClaro : M.gris, 0, 0, 0), caja(w * 0.55, h * 0.2, 0.006, M.negro, 0, h * 0.26, d / 2 + 0.003),
        boton(0.008, M.ledV, -w * 0.18, h * 0.26, d / 2 + 0.008), cil(Math.min(w, h) * 0.17, 0.012, M.hierro, 0, -h * 0.18, d / 2 + 0.006, 'z', 14)]);
      for (var j = 0; j < 5; j++) g.add(caja(0.03, 0.012, d * 0.8, M.aceroOsc, w / 2 + 0.015, -h * 0.36 + j * h * 0.18, 0));
      if (sch) g.add(caja(w * 0.3, 0.03, 0.004, M.rojo, -w * 0.25, -h * 0.4, d / 2 + 0.003));
      return g;
    }
    if (tipo === 'mrl') {
      reg('variador', en(variadorCaja(0.34, 0.5, 0.16), 0.2, 8.72, -HZ + 0.085));
      reg('cables_motor', grp([tubo([V(0.3, 8.97, -0.86), V(0.4, 9.12, -0.5), V(0.5, 9.08, 0), V(xM, yM + 0.21, ZB + 0.34)], 0.018, M.negro),
        tubo([V(0.22, 8.97, -0.86), V(0.32, 9.2, -0.3), V(0.52, 9.14, 0.38), V(xM, yM + 0.04, ZB + 0.72)], 0.008, M.gris)]));
      ancla('cables_motor', raiz, V(0.45, 9.1, -0.25));
    }
    if (tipo === 'mr') {
      reg('variador', en(variadorCaja(0.5, 0.7, 0.25), -0.75, yF + 1.0, -1.02));
      reg('cables_motor', grp([tubo([V(-0.8, yF + 0.65, -0.96), V(-0.9, yF + 0.32, -0.6), V(-0.9, yF + 0.32, 0.4), V(-0.62, yF + 0.5, 0.52), V(-0.42, yS, zS + 0.72)], 0.02, M.negro),
        tubo([V(-0.68, yF + 0.65, -0.96), V(-0.98, yF + 0.36, -0.3), V(-0.98, yF + 0.36, 0.72), V(-0.62, yF + 0.46, 0.9), V(-0.34, yS - 0.16, zS + 1.09)], 0.008, M.gris)]));
      ancla('cables_motor', raiz, V(-0.9, yF + 0.32, 0));
    }

    // ---------- instalación fija del hueco: canaleta, luces y gancho ----------
    var xw = -HX + 0.03, zcan = 0.75, gcw = new T.Group(), ycan0 = 0.4, ycan1 = TECHO - 0.5;
    gcw.add(caja(0.05, ycan1 - ycan0, 0.07, M.gris, xw, (ycan0 + ycan1) / 2, zcan));
    for (f = 0; f < NP; f++) {
      var yb = f * FH + 2.32;
      gcw.add(caja(0.07, 0.15, 0.15, M.grisClaro, xw + 0.012, yb, zcan));
      gcw.add(viga(V(xw + 0.03, yb, zcan + 0.07), V(Math.max(cx - 0.83, -HX + 0.08), yb, HZ - 0.03), 0.02, 0.02, M.gris));
    }
    reg('cableado_hueco', gcw);
    ancla('cableado_hueco', raiz, V(xw, 4.2, zcan));
    [1.5, 4.3, 7.1].forEach(function (y, j) {
      var lu = reg('iluminacion_hueco', grp([caja(0.025, 0.1, 0.36, M.gris, 0, 0, 0), caja(0.045, 0.06, 0.3, M.luz, 0.03, 0, 0)], xw, y, -0.45));
      if (j === 1) principal('iluminacion_hueco', lu);
    });
    var gan = grp([caja(0.22, 0.02, 0.22, M.amarillo, 0, -0.01, 0), cil(0.014, 0.1, M.amarillo, 0, -0.07, 0, 'y', 8), new T.Mesh(new T.TorusGeometry(0.06, 0.014, 8, 18, PI * 1.5), M.amarillo), caja(0.14, 0.05, 0.004, M.blanco, 0.14, -0.045, 0)]);
    gan.children[2].position.y = -0.18; gan.children[2].rotation.z = PI * 0.75;
    if (tipo === 'mr') {
      reg('gancho_izaje', caja(2.9, 0.12, 0.1, M.amarillo, -0.3, yF + 2.24, zS));
      reg('gancho_izaje', en(gan, 0, yF + 2.18, zS));
      principal('gancho_izaje', gan);
    } else reg('gancho_izaje', en(gan, tipo === 'hid' ? cx : cx * 0.5, TECHO, 0.3));

    // pantalla que separa el contrapeso en el foso
    if (tipo === 'mr') reg('pantalla_contrapeso', grp([caja(1.24, 1.9, 0.004, M.malla, 0, 0, 0), caja(0.03, 1.9, 0.03, M.amarillo, -0.62, 0, 0), caja(0.03, 1.9, 0.03, M.amarillo, 0.62, 0, 0), caja(1.24, 0.03, 0.03, M.amarillo, 0, 0.95, 0)], 0, 0.15, -0.7));
    if (tipo === 'mrl') reg('pantalla_contrapeso', grp([caja(0.004, 1.9, 0.96, M.malla, 0, 0, 0), caja(0.03, 1.9, 0.03, M.amarillo, 0, 0, -0.48), caja(0.03, 1.9, 0.03, M.amarillo, 0, 0, 0.48), caja(0.03, 0.03, 0.96, M.amarillo, 0, 0.95, 0)], 0.705, -0.2, ZB));

    // ---------- cable viajero ----------
    var tx = tipo === 'mr' ? -0.78 : tipo === 'mrl' ? -0.2 : -0.3, yW = 3.8, rv = 0.1, zv1 = -0.9, zv2 = -0.7;
    var gv = new T.Group(), v1 = tramo(G.plano, M.negro, tx, zv1, 0.1), v2 = tramo(G.plano, M.negro, tx, zv2, 0.1);
    var lazo = new T.Mesh(new T.CylinderGeometry(rv, rv, 0.06, 14, 1, true, PI, PI), new T.MeshStandardMaterial({ color: 0x1e2125, roughness: 0.8, side: T.DoubleSide }));
    lazo.rotation.z = PI / 2; lazo.position.set(tx, 0, (zv1 + zv2) / 2);
    gv.add(v1, v2, lazo, caja(0.14, 0.18, 0.05, M.gris, tx, yW + 0.09, -0.925));
    dyn.push(function (cy) { var yc = (yW + cy - 0.25 - 5.6) / 2; lazo.position.y = yc; v1.pon(yc, yW); v2.pon(yc, cy - 0.25); });
    reg('cable_viajero', gv);
    reg('cable_viajero', grp([caja(0.12, 0.08, 0.1, M.gris, 0, 0, 0), caja(0.06, 0.03, 0.14, M.aceroOsc, 0, 0.05, 0.08)], tx - cx, -0.2, zv2 - ZC), cab);
    ancla('cable_viajero', raiz, V(tx, 3.2, zv1));

    // ---------- finales de carrera y sensores de posición ----------
    var fin = tipo === 'mr' ? { x: cx - 0.7, z: ZC - 0.25 } : tipo === 'mrl' ? { x: cx + 0.7, z: ZC + 0.25 } : { x: 0.62, z: ZC + 0.66 };
    var dF = fin.x < cx ? -1 : 1, railX = tipo === 'hid' ? 0.69 : cx + dF * 0.8;
    function finCarrera() { return grp([caja(0.06, 0.09, 0.05, M.negro, 0, 0, 0), entre(V(-dF * 0.03, 0, 0), V(-dF * 0.085, -0.035, 0), 0.006, M.acero), cil(0.016, 0.014, M.rojo, -dF * 0.09, -0.04, 0, 'z', 10)]); }
    var gfc = new T.Group(), yfs = [REC + 2.83, REC + 2.97, -0.56, -0.7];
    yfs.forEach(function (y) { gfc.add(en(finCarrera(), fin.x + dF * 0.04, y, fin.z)); });
    gfc.add(caja(0.025, 0.45, 0.025, M.aceroOsc, fin.x + dF * 0.085, REC + 2.9, fin.z), caja(0.025, 0.45, 0.025, M.aceroOsc, fin.x + dF * 0.085, -0.63, fin.z));
    var zr = tipo === 'hid' ? ZC + 0.42 : ZC;
    [REC + 2.9, -0.63].forEach(function (y) { gfc.add(viga(V(fin.x + dF * 0.085, y, fin.z), V(railX, y, zr), 0.03, 0.025, M.aceroOsc)); });
    reg('finales_carrera', gfc);
    var lx = fin.x - cx - dF * 0.06;
    reg('finales_carrera', grp([caja(0.02, 0.55, 0.05, M.acero, 0, 2.48, 0), caja(0.02, 0.5, 0.05, M.acero, 0, -0.26, 0)], lx, 0, fin.z - ZC), cab);
    ancla('finales_carrera', raiz, V(fin.x + dF * 0.04, REC + 2.9, fin.z));

    var pos = tipo === 'mr' ? { lx: -0.63, lz: 0.22 } : tipo === 'mrl' ? { lx: -0.63, lz: -0.5 } : { lx: 0.62, lz: 0.27 };
    var dP = pos.lx < 0 ? -1 : 1, gps = new T.Group();
    var lapY = [0.11, 0.035, -0.04, -0.115];
    for (f = 0; f < NP; f++) {
      if (mov) {   // MoviLift: regleta con imanes que leen los lápices
        gps.add(caja(0.006, 0.34, 0.05, M.acero, cx + pos.lx + 0.031, f * FH + 2.5, ZC + pos.lz));
        lapY.forEach(function (dyy, j) { gps.add(caja(0.012, 0.05, 0.022, j % 2 ? M.rojo : M.negro, cx + pos.lx + 0.022, f * FH + 2.5 + dyy, ZC + pos.lz)); });
      } else gps.add(caja(0.004, 0.26, 0.07, M.acero, cx + pos.lx, f * FH + 2.5, ZC + pos.lz));
      gps.add(viga(V(cx + pos.lx, f * FH + 2.64, ZC + pos.lz), V(cx + pos.lx + dP * 0.14, f * FH + 2.64, ZC + pos.lz), 0.03, 0.02, M.aceroOsc));
    }
    // Schindler: además de las banderas, imanes rojos cerca de los extremos del recorrido
    if (sch) [-0.3, 0.25, REC + 2.2, REC + 2.75].forEach(function (y) { gps.add(caja(0.014, 0.12, 0.03, M.rojo, cx + pos.lx + dP * 0.1, y, ZC + pos.lz)); });
    reg('posicionamiento', gps);
    var sen;
    if (mov) {
      sen = grp([caja(0.02, 0.32, 0.05, M.aceroOsc, -0.05, 0, 0), viga(V(-0.05, -0.12, 0), V(-0.14, -0.26, 0), 0.02, 0.02, M.aceroOsc)], pos.lx, 2.5, pos.lz);
      lapY.forEach(function (dyy) { sen.add(cil(0.008, 0.075, M.negro, -0.03, dyy, 0, 'x', 10), cil(0.009, 0.012, M.rojo, 0.004, dyy, 0, 'x', 10), cil(0.012, 0.008, M.acero, -0.062, dyy, 0, 'x', 6)); });
    } else sen = grp([caja(0.012, 0.1, 0.07, M.negro, -0.014, 0, 0), caja(0.012, 0.1, 0.07, M.negro, 0.014, 0, 0), caja(0.04, 0.1, 0.012, M.negro, 0, 0, -0.04), boton(0.005, M.led, 0.022, 0.03, 0.02, 'x'),
      viga(V(0, 0, -0.045), V(-dP * 0.08, -0.2, -0.045), 0.02, 0.02, M.aceroOsc)], pos.lx, 2.5, pos.lz);
    reg('posicionamiento', sen, cab);
    principal('posicionamiento', sen);

    // ---------- foso ----------
    var ladoEsc = tipo === 'hid' ? -1 : 1, ges = new T.Group();
    ges.add(caja(0.1, 0.15, 0.06, M.amarillo, cx + 0.62, -0.28, HZ - 0.035), cil(0.026, 0.03, M.rojo, cx + 0.62, -0.26, HZ - 0.08, 'z', 14));
    ges.add(caja(0.03, 1.6, 0.03, M.amarillo, ladoEsc * (HX - 0.05), -0.6, 0.48), caja(0.03, 1.6, 0.03, M.amarillo, ladoEsc * (HX - 0.05), -0.6, 0.82));
    for (k = 0; k < 6; k++) ges.add(cil(0.012, 0.34, M.amarillo, ladoEsc * (HX - 0.05), -1.25 + k * 0.27, 0.65, 'z', 8));
    reg('stop_foso', ges);
    ancla('stop_foso', raiz, V(cx + 0.62, -0.28, HZ - 0.05));

    // ---------- equipo hidráulico ----------
    var vast = null;
    if (tipo === 'hid') {
      var cxr = 2.25, czr = -1.85;
      reg('central_hidraulica', grp([caja(0.95, 0.6, 0.55, M.azul, 0, 0.4, 0), caja(0.99, 0.03, 0.59, M.aceroOsc, 0, 0.715, 0),
        caja(0.06, 0.1, 0.06, M.aceroOsc, -0.4, 0.05, 0.2), caja(0.06, 0.1, 0.06, M.aceroOsc, 0.4, 0.05, 0.2), caja(0.06, 0.1, 0.06, M.aceroOsc, -0.4, 0.05, -0.2), caja(0.06, 0.1, 0.06, M.aceroOsc, 0.4, 0.05, -0.2),
        cil(0.04, 0.05, M.amarillo, 0.33, 0.755, 0.15, 'y', 12), caja(0.02, 0.3, 0.012, M.blanco, 0.3, 0.4, 0.281), caja(0.16, 0.1, 0.1, M.gris, 0.25, 0.78, -0.15), caja(0.2, 0.06, 0.004, M.amarillo, -0.2, 0.55, 0.278)], cxr, 0, czr));
      var gbv = grp([caja(0.24, 0.2, 0.2, M.verde, 0, 0, 0), cil(0.028, 0.09, M.negro, -0.07, 0.14, -0.04, 'y', 10), cil(0.028, 0.09, M.negro, 0, 0.14, -0.04, 'y', 10), cil(0.028, 0.09, M.negro, 0.07, 0.14, -0.04, 'y', 10),
        cil(0.04, 0.02, M.blanco, -0.06, 0.03, 0.11, 'z', 16), cil(0.042, 0.012, M.negro, -0.06, 0.03, 0.105, 'z', 16), boton(0.02, M.rojo, 0.07, 0.03, 0.105),
        caja(0.03, 0.03, 0.26, M.rojo, 0.15, 0.12, 0.05), cil(0.03, 0.14, M.aceroOsc, -0.19, -0.03, 0, 'x', 12), caja(0.02, 0.02, 0.14, M.rojo, -0.2, 0.02, 0.05)], cxr - 0.2, 0.83, czr + 0.05);
      gbv.children[7].rotation.x = -0.6;
      reg('bloque_valvulas', gbv);
      var yCil = 2.6, gpi = grp([caja(0.3, 0.06, 0.3, M.aceroOsc, 0, -FOSO + 0.03, 0), caja(0.16, 0.14, 0.16, M.aceroOsc, 0, -FOSO + 0.13, 0),
        cil(0.07, yCil + FOSO - 0.2, M.gris, 0, (yCil - FOSO + 0.2) / 2, 0, 'y', 22), cil(0.088, 0.1, M.aceroOsc, 0, yCil, 0, 'y', 22)], xH, 0, ZC);
      reg('piston', gpi);
      reg('recoge_aceite', grp([cil(0.1, 0.035, M.amarillo, 0, yCil - 0.08, 0, 'y', 22), entre(V(0.09, yCil - 0.09, 0.03), V(0.1, -FOSO + 0.24, 0.1), 0.006, M.blanco),
        cil(0.05, 0.14, M.gris, 0.1, -FOSO + 0.13, 0.1, 'y', 14), cil(0.053, 0.012, M.aceroOsc, 0.1, -FOSO + 0.2, 0.1, 'y', 14)], xH, 0, ZC));
      ancla('recoge_aceite', raiz, V(xH, yCil - 0.08, ZC));
      vast = tramo(G.vastago, M.cromo, xH, ZC);
      reg('piston', vast);
      dyn.push(function (cy) { vast.pon(yCil, yPis(cy) - 0.15); gp.position.y = yPis(cy); });
      ancla('piston', raiz, V(xH, 1.0, ZC));
      var gpp = grp([polea(RH, 0.09, 'x'), caja(0.012, 0.42, 0.1, M.aceroOsc, 0.06, -0.06, 0), caja(0.012, 0.42, 0.1, M.aceroOsc, -0.06, -0.06, 0), caja(0.14, 0.04, 0.12, M.aceroOsc, 0, -0.25, 0),
        viga(V(-0.06, -0.2, -0.42), V(-0.06, -0.2, 0.42), 0.03, 0.04, M.aceroOsc), caja(0.05, 0.1, 0.05, M.hierro, -0.09, -0.2, -0.42), caja(0.05, 0.1, 0.05, M.hierro, -0.09, -0.2, 0.42)]);
      reg('polea_piston', gpp, gp);
      reg('valvula_rotura', grp([caja(0.1, 0.1, 0.12, M.rojo, 0, 0, 0), cil(0.03, 0.06, M.aceroOsc, 0, 0, 0.085, 'z', 10), cil(0.012, 0.05, M.acero, 0.03, 0.07, 0, 'y', 8)], xH, -FOSO + 0.36, ZC - 0.13));
      var curva = new T.CatmullRomCurve3([V(cxr - 0.42, 0.8, czr + 0.05), V(cxr - 0.62, 0.45, czr + 0.2), V(1.5, 0.08, -1.25), V(1.1, -0.45, -0.85), V(0.93, -0.98, -0.45), V(xH, -FOSO + 0.36, ZC - 0.26)]);
      var man = grp([new T.Mesh(new T.TubeGeometry(curva, 40, 0.024, 8, false), M.negro), cil(0.032, 0.06, M.acero, xH, -FOSO + 0.36, ZC - 0.24, 'z', 10)]);
      reg('manguera', man);
      ancla('manguera', raiz, V(1.3, -0.15, -1.05));
    }

    // ---------- espejo: contrapeso, máquina y tablero pasan al otro lado ----------
    if (espejo) {
      raiz.scale.x = -1;
      raiz.traverse(function (o) { if (o.isMesh && o.material === M.display) o.scale.x = -o.scale.x; });   // para que los números no salgan al revés
    }

    // ---------- anclas y muestras por defecto ----------
    raiz.updateMatrixWorld(true);
    var caja3 = new T.Box3();
    Object.keys(partes).forEach(function (id) {
      var p = partes[id];
      if (!p.principal) p.principal = p.miembros[0];
      caja3.setFromObject(p.principal);
      p.radio = Math.max(0.12, caja3.getSize(V(0, 0, 0)).length() / 2);
      if (!p.ancla) { var c = caja3.getCenter(V(0, 0, 0)), pa = p.principal.parent; p.ancla = { padre: pa, p: pa.worldToLocal(c) }; }
      p.muestra = muestra(id, tipo) || p.principal.clone(true);
      p.mallas = [];
      p.miembros.forEach(function (m) { m.traverse(function (o) { if (o.isMesh && o.material !== M.toque) { o._m0 = o.material; p.mallas.push(o); } }); });
    });

    var estado = { cy: 0, ap: 0, piso: 0 };
    function actualizar(cy) {
      estado.cy = cy;
      var wy = CP0 + (REC - cy);
      cab.position.y = cy; cp.position.y = wy;
      for (var j = 0; j < dyn.length; j++) dyn[j](cy, wy);
    }
    // apI: apertura de la hoja izquierda cuando no acompaña a la derecha (simulación de falla); si no se da, van juntas
    function puertas(ap, piso, apI) {
      estado.ap = ap; estado.piso = piso;
      var d = 0.2 + 0.4 * ap, dI = apI == null ? d : 0.2 + 0.4 * apI;
      hojasCab[0].position.x = -dI; hojasCab[1].position.x = d;
      for (var j = 0; j < NP; j++) { var a = j === piso ? d : 0.2, aI = j === piso ? dI : 0.2; hojasPiso[j][0].position.x = cx - aI; hojasPiso[j][1].position.x = cx + a; }
      rayos.scale.x = Math.max(0.001, d + dI - 0.42); rayos.position.x = (d - dI) / 2;
      rayos.userData.abierto = Math.max(ap, apI || 0) > 0.04;
    }
    actualizar(0); puertas(0, 0);

    return {
      tipo: tipo, eq: eq, espejo: espejo, raiz: raiz, partes: partes, cab: cab, rayos: rayos, estado: estado, cx: espejo ? -cx : cx,
      actualizar: actualizar, puertas: puertas,
      posAncla: function (id, v) { var a = partes[id].ancla; a.padre.updateWorldMatrix(true, false); return v.copy(a.p).applyMatrix4(a.padre.matrixWorld); },
      limites: tipo === 'mr' ? { ymin: -FOSO, ymax: yF + 2.3 } : { ymin: -FOSO, ymax: TECHO + 0.15 }
    };
  };

  // piezas largas: para la ficha se muestra un tramo representativo
  function muestra(id, tipo) {
    var g, i;
    if (id === 'guias_cabina' || id === 'guias_contrapeso') {
      g = grp([riel(0.9, id === 'guias_cabina')]);
      g.add(caja(0.2, 0.05, 0.09, M.aceroOsc, -0.1, 0.25, 0), caja(0.014, 0.3, 0.09, M.aceroOsc, -0.008, 0.62, 0));
      [0.52, 0.72].forEach(function (y) { g.add(cil(0.009, 0.02, M.acero, -0.016, y, 0.028, 'x', 8), cil(0.009, 0.02, M.acero, -0.016, y, -0.028, 'x', 8)); });
      return g;
    }
    if (id === 'cables_traccion') {
      g = new T.Group();
      if (tipo === 'mrl') {
        g.add(cil(0.06, 0.2, M.acero, 0, 0, 0, 'z', 20));
        [-0.06, 0, 0.06].forEach(function (z) {
          arcoXYcinta(g, z, 0, 0, 0.063, PI, 0, 8);
          g.add(caja(0.005, 0.5, 0.03, M.cinta, -0.063, -0.25, z), caja(0.005, 0.5, 0.03, M.cinta, 0.063, -0.25, z));
          for (i = 0; i < 6; i++) g.add(caja(0.003, 0.004, 0.003, M.cromo, -0.063, -0.501, z - 0.011 + i * 0.0045));
        });
      } else {
        g.add(polea(0.3, 0.14, 'x'));
        [-0.045, -0.015, 0.015, 0.045].forEach(function (x) {
          arcoYZ(g, x, 0, 0, 0.304, 0, PI, 14, 0.007, M.hierro);
          g.add(cil(0.007, 0.5, M.hierro, x, -0.25, 0.304, 'y', 6), cil(0.007, 0.5, M.hierro, x, -0.25, -0.304, 'y', 6));
        });
      }
      return g;
    }
    if (id === 'cableado_hueco') return grp([caja(0.05, 0.9, 0.07, M.gris, 0, 0.45, 0), caja(0.07, 0.15, 0.15, M.grisClaro, 0.012, 0.6, 0), caja(0.3, 0.02, 0.02, M.gris, 0.17, 0.6, 0.07)]);
    if (id === 'cortina_luminosa') {
      g = new T.Group();
      [-0.4, 0.4].forEach(function (x) { g.add(caja(0.014, 1.9, 0.03, M.negro, x, 0.95, 0), caja(0.004, 1.8, 0.004, M.rojo, x + (x < 0 ? 0.008 : -0.008), 0.95, 0)); });
      for (i = 0; i < 14; i++) g.add(caja(0.78, 0.004, 0.004, M.rayo, 0, 0.1 + i * 0.135, 0));
      return g;
    }
    if (id === 'cable_limitador') {
      g = grp([polea(0.12, 0.03, 'x')]);
      arcoYZ(g, 0, 0, 0, 0.123, 0, PI, 12, 0.005, M.hierro);
      g.add(cil(0.005, 0.5, M.hierro, 0, -0.25, 0.123, 'y', 6), cil(0.005, 0.5, M.hierro, 0, -0.25, -0.123, 'y', 6), caja(0.05, 0.07, 0.05, M.rojo, 0, -0.3, 0.123));
      return g;
    }
    if (id === 'cable_viajero') {
      g = new T.Group();
      var l = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.06, 14, 1, true, PI, PI), new T.MeshStandardMaterial({ color: 0x1e2125, roughness: 0.8, side: T.DoubleSide }));
      l.rotation.z = PI / 2;
      g.add(l, caja(0.06, 0.6, 0.008, M.negro, 0, 0.3, 0.1), caja(0.06, 0.4, 0.008, M.negro, 0, 0.2, -0.1), caja(0.14, 0.18, 0.05, M.gris, 0, 0.66, 0.11), caja(0.12, 0.08, 0.1, M.gris, 0, 0.43, -0.1));
      return g;
    }
    if (id === 'cadena_compensacion') {
      g = new T.Group();
      arcoYZ(g, 0, 0, 0, 0.16, PI, 2 * PI, 8, 0.018, M.negro);
      g.add(cil(0.018, 0.6, M.negro, 0, 0.3, 0.16, 'y', 8), cil(0.018, 0.6, M.negro, 0, 0.3, -0.16, 'y', 8), caja(0.1, 0.04, 0.3, M.aceroOsc, 0, -0.28, 0), cil(0.03, 0.16, M.goma, 0, -0.23, 0.1, 'x', 10), cil(0.03, 0.16, M.goma, 0, -0.23, -0.1, 'x', 10));
      return g;
    }
    return null;
  }
})();
