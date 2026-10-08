/* Taller de Ascensores — videos 3D: máquina y tracción (máquina, polea, cables, contrapeso, encoder,
   polea de desvío, amarres, monitor de fajas, cables del motor, poleas bajo cabina, cadena de compensación).
   Mismo formato que v3d-maquina.js: construir(K) arma las piezas una vez; funciona/falla.anim(t, s, K, id)
   las mueve como función pura del tiempo; la cámara sale de claves [t, [posición], [a dónde mira]]. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI, TAU = PI * 2;

  // ---------- textos sencillos de cada pieza ----------
  S.maquina = {
    que: 'Es el motor grande del ascensor. Va arriba de todo y tiene pegada una rueda por donde pasan los cables.',
    sirve: 'Hace girar esa rueda. Al girar, jala los cables y la cabina sube o baja.',
    falla: 'Si trabaja mucho o le falta aire, se calienta y se apaga sola. Si zumba o tiembla, tiene un rodamiento gastado.',
    arreglo: 'Se ventila el cuarto, se limpia el ventilador y se cambian los rodamientos gastados. Siempre con la energía cortada.'
  };
  S.polea_traccion = {
    que: 'Es la rueda con canales que va pegada al motor. Los cables se apoyan en sus canales.',
    sirve: 'Al girar, arrastra los cables por roce, sin amarrarlos, y así mueve la cabina y el contrapeso.',
    falla: 'Con los canales gastados o con grasa, los cables patinan: la rueda gira, pero la cabina no para bien en el piso.',
    arreglo: 'Se cambian la polea y los cables juntos. Lo hace el técnico con el ascensor detenido y asegurado.'
  };
  S.cables_traccion = {
    que: 'Son varios cables de acero, uno al lado del otro. En ascensores nuevos pueden ser cintas planas negras.',
    sirve: 'De ellos cuelga la cabina. Pasan por la polea de la máquina y bajan hasta el contrapeso.',
    falla: 'Con los años se rompen hilos de acero que salen como púas, o un cable queda más flojo que los otros.',
    arreglo: 'Se igualan con las tuercas de los amarres. Si tienen muchos hilos rotos, se cambian todos juntos.'
  };
  S.contrapeso = {
    que: 'Es un marco de acero lleno de pesas que cuelga del otro lado de los cables.',
    sirve: 'Equilibra la cabina: cuando ella sube, él baja. Así el motor hace mucho menos fuerza.',
    falla: 'Si las pesas se sueltan, golpean al viajar. Si los cables se estiran, baja tanto que casi toca su tope del foso.',
    arreglo: 'Se aseguran las pesas con su traba y se acortan los cables si se estiraron. Lo hace el técnico.'
  };
  S.polea_desvio = {
    que: 'Es una rueda con canales, sin motor, que va debajo de la máquina.',
    sirve: 'Gira sola, arrastrada por los cables, y los lleva hacia el contrapeso, que está más al costado.',
    falla: 'Si su rodamiento está seco o gastado, chilla o zumba. Si quedó chueca, los cables rozan y se gastan.',
    arreglo: 'Se engrasa o se cambia el rodamiento y se alinea con la polea de la máquina, con el equipo detenido.'
  };

  // ---------- utilidades de tiempo (copias de las del motor, para usarlas en la cámara) ----------
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ph(t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = cl((t - a) / (b - a)); return x * x * (3 - 2 * x); }
  function mix(a, b, k) { return a + (b - a) * k; }
  function kf(t, a) {
    if (t <= a[0][0]) return a[0][1];
    for (var i = 1; i < a.length; i++) if (t <= a[i][0]) return mix(a[i - 1][1], a[i][1], ph(t, a[i - 1][0], a[i][0]));
    return a[a.length - 1][1];
  }
  function kfv(t, a, out) {
    var i = 1, k = 0, p = a[0][1], q = a[0][1];
    if (t > a[0][0]) { for (; i < a.length; i++) if (t <= a[i][0]) break; if (i >= a.length) { p = q = a[a.length - 1][1]; } else { p = a[i - 1][1]; q = a[i][1]; k = ph(t, a[i - 1][0], a[i][0]); } }
    return out.set(mix(p[0], q[0], k), mix(p[1], q[1], k), mix(p[2], q[2], k));
  }
  function entre(t, a, b) { return t >= a && t < b; }
  // planos de cámara: [[t, pos, mira, pos2?, mira2?, tránsito?], ...] → claves. Cada plano se mantiene (o se desliza
  // despacio hasta pos2/mira2) hasta el siguiente; el cambio de plano dura «tránsito» segundos (0.9 por defecto).
  function planos(lista, dur) {
    var k = [];
    lista.forEach(function (p, i) {
      var tr = i ? (p[5] || 0.9) : 0, fin = i < lista.length - 1 ? lista[i + 1][0] : (dur || p[0] + 6);
      k.push([p[0] + tr, p[1], p[2]]); k.push([fin, p[3] || p[1], p[4] || p[2]]);
    });
    return k;
  }
  // cámara elegida según la pieza que se está viendo (s.cams = [claves cap. 1, claves cap. 2])
  function camaraPieza(s, c, t, dur, pos, mira) {
    var k = s.cams[c];
    kfv(t, k.map(function (x) { return [x[0], x[1]]; }), pos);
    kfv(t, k.map(function (x) { return [x[0], x[2]]; }), mira);
    if (s.seguir) { var dy = s.seguir(c, t); pos.y += dy; mira.y += dy; }
  }

  // marca robusta: borra las marcas anteriores de todo el grupo antes de pintar (así se puede saltar en el tiempo)
  function marca(K, obj, modo) {
    if (!obj) return;
    if (Array.isArray(obj)) { obj.forEach(function (o) { marca(K, o, modo); }); return; }
    obj.traverse(function (o) { delete o.userData._marca; });
    K.marcar(obj, modo);
  }

  // ---------- caminos de cables: tramos rectos y arcos en el plano XY ----------
  function camino(segs) {
    var tot = 0;
    segs.forEach(function (g) { g.L = g.l ? Math.hypot(g.l[2] - g.l[0], g.l[3] - g.l[1]) : Math.abs(g.a1 - g.a0) * g.r; g.s0 = tot; tot += g.L; });
    return { segs: segs, L: tot };
  }
  // punto del camino a la distancia s: q = [x, y, tx, ty, índice del tramo, avance 0..1 dentro del tramo]
  function enCamino(cm, s, q) {
    var segs = cm.segs, g = segs[segs.length - 1], gi = segs.length - 1;
    if (s <= 0) { g = segs[0]; gi = 0; } else for (var i = 0; i < segs.length; i++) if (s <= segs[i].s0 + segs[i].L) { g = segs[i]; gi = i; break; }
    var u = g.L > 0 ? (s - g.s0) / g.L : 0;
    if (g.l) { var dx = g.l[2] - g.l[0], dy = g.l[3] - g.l[1], n = Math.hypot(dx, dy) || 1; q[0] = g.l[0] + dx * u; q[1] = g.l[1] + dy * u; q[2] = dx / n; q[3] = dy / n; }
    else { var a = g.a0 + (g.a1 - g.a0) * u, sg = g.a1 > g.a0 ? 1 : -1; q[0] = g.c[0] + Math.cos(a) * g.r; q[1] = g.c[1] + Math.sin(a) * g.r; q[2] = -Math.sin(a) * sg; q[3] = Math.cos(a) * sg; }
    q[4] = gi; q[5] = u; return q;
  }
  // ángulo de la recta tangente común a dos poleas que el cable abraza en el mismo sentido (horario)
  function angTan(c1, r1, c2, r2) {
    var dx = c2[0] - c1[0], dy = c2[1] - c1[1], d = Math.hypot(dx, dy);
    return Math.atan2(dy, dx) + Math.acos((r1 - r2) / d);
  }

  // ---------- piezas reutilizables ----------
  // polea con canales (eje z); .rueda es lo que gira (rotation.z); lleva una raya blanca para ver el giro
  function poleaCanales(K, r, ancho, n, m, borde) {
    var T = K.T, g = new T.Group(), rueda = new T.Group(); g.add(rueda);
    rueda.add(K.cil(r - 0.006, ancho, m, 0, 0, 0, 'z', 40));
    var paso = ancho / n, esp = Math.min(0.012, paso * 0.3);
    g.anillos = [];
    for (var i = 0; i <= n; i++) { var an = K.cil(r + 0.011, esp, m, 0, 0, -ancho / 2 + i * paso, 'z', 40); rueda.add(an); g.anillos.push(an); }
    rueda.add(K.cil(r * 0.84, 0.008, borde, 0, 0, ancho / 2 + 0.004, 'z', 32));
    rueda.add(K.caja(r * 0.74, r * 0.14, 0.014, K.M.blanco, r * 0.46, 0, ancho / 2 + 0.01));
    g.cubo = K.cil(r * 0.2, ancho + 0.05, borde, 0, 0, 0, 'z', 20); rueda.add(g.cubo);
    g.rueda = rueda; return g;
  }
  // ondas de sonido (anillos que crecen y se apagan)
  function ondas(K, color) {
    var T = K.T, g = new T.Group(), mats = [];
    for (var i = 0; i < 3; i++) { var m = K.matB(color || 0xff3b30, { transparent: true, opacity: 0.8, depthWrite: false }); mats.push(m); g.add(new T.Mesh(new T.TorusGeometry(1, 0.03, 6, 40), m)); }
    g.visible = false;
    g.poner = function (t, pos, on, escala, rotY) {
      g.visible = !!on; if (!on) return;
      g.position.set(pos[0], pos[1], pos[2]); g.rotation.y = rotY || 0;
      g.children.forEach(function (c, i) { var k = (t * 1.3 + i / 3) % 1; c.scale.setScalar((0.25 + k) * (escala || 0.12)); mats[i].opacity = 0.9 * (1 - k); });
    };
    return g;
  }
  // polvillo que cae
  function polvo(K, n, color) {
    var g = new K.T.Group(), m = K.mat(color || 0x9a4a22, { roughness: 1, metalness: 0 });
    for (var i = 0; i < n; i++) g.add(K.caja(0.012, 0.012, 0.012, m));
    g.visible = false;
    g.caer = function (t, pos, on, alto, ancho) {
      g.visible = !!on; if (!on) return; g.position.set(pos[0], pos[1], pos[2]);
      g.children.forEach(function (c, i) {
        var k = (t * 0.55 + K.ruido(i)) % 1;
        c.position.set((K.ruido(i * 3.3) - 0.5) * (ancho || 0.25), -k * (alto || 0.8), (K.ruido(i * 5.1) - 0.5) * 0.2);
        c.rotation.set(k * 5, i, k * 3);
      });
    };
    return g;
  }
  // hilos rotos que salen del cable como púas (grupo centrado en el cable, eje Y)
  function puas(K, m) {
    var T = K.T, g = new T.Group();
    for (var i = 0; i < 10; i++) {
      var piv = new T.Group(); piv.position.y = (i - 4.5) * 0.018; piv.rotation.y = i * 2.4;
      var p = K.cil(0.0022, 0.036, m, 0.02, 0.008, 0, null, 5); p.rotation.z = -PI / 2 + 0.45; piv.add(p); g.add(piv);
    }
    return g;
  }
  // «lupa»: un círculo oscuro con borde amarillo que muestra algo agrandado; mira a la cámara con .mirar(pos)
  function lupa(K, r) {
    var T = K.T, g = new T.Group();
    g.add(new T.Mesh(new T.CircleGeometry(r, 40), K.matB(0x1b262f)));
    g.add(K.toro(r, r * 0.045, K.M.amarillo, 0, 0, 0.002));
    g.dentro = new T.Group(); g.dentro.position.z = r * 0.35; g.add(g.dentro);
    g.linea = K.cable(0.0035, K.matB(0xf2b705));
    return g;
  }
  // pedazo de cable de acero agrandado: 6 torones trenzados alrededor de un alma (eje x)
  function cableGrande(K, largo, r) {
    var T = K.T, g = new T.Group(), mHilo = K.mat(0xb3bcc4, { metalness: 0.6, roughness: 0.35 });
    g.add(K.cil(r * 0.5, largo, K.M.hierro, 0, 0, 0, 'x', 12));
    for (var i = 0; i < 6; i++) {
      var pts = []; for (var j = 0; j <= 32; j++) { var u = j / 32, a = i * PI / 3 + u * TAU * 1.3; pts.push([-largo / 2 + largo * u, Math.cos(a) * r, Math.sin(a) * r]); }
      g.add(K.tubo(pts, r * 0.52, mHilo));
    }
    g.puas = new T.Group(); g.add(g.puas);
    for (i = 0; i < 6; i++) {
      var pv = new T.Group(); pv.position.x = -largo * 0.3 + i * largo * 0.12; pv.rotation.x = i * 1.9;
      var p = K.cil(r * 0.09, r * 1.6, K.matB(0xff3b30), 0, r * 1.5, 0, null, 5); p.rotation.z = 0.5 - (i % 2); pv.add(p); g.puas.add(pv);
    }
    return g;
  }

  // cinta plana entre dos puntos (ancho en z) con .pon(a, b)
  var EJE_Y = null;
  function cintaRecta(K, ancho, grosor, m) {
    var T = K.T; EJE_Y = EJE_Y || new T.Vector3(0, 1, 0);
    var o = new T.Mesh(new T.BoxGeometry(grosor, 1, ancho), m), d = new T.Vector3();
    o.pon = function (a, b) {
      d.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]); var L = Math.max(1e-4, d.length());
      o.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); o.scale.set(1, L, 1); o.quaternion.setFromUnitVectors(EJE_Y, d.divideScalar(L));
      return o;
    };
    return o;
  }
  // tramo curvo de cinta alrededor de una polea (eje z): de a0 a a1 (radianes, desde +x antihorario)
  function cintaArco(K, r, ancho, a0, a1, m) {
    var T = K.T, ini = Math.min(a0, a1), largo = Math.abs(a1 - a0);
    // en CylinderGeometry el ángulo theta parte de +z; girada al eje z, theta = 0 queda abajo (-y)
    var geo = new T.CylinderGeometry(r, r, ancho, 28, 1, true, ini + PI / 2, largo);
    var o = new T.Mesh(geo, m); o.rotation.x = PI / 2;
    return o;
  }

  // =====================================================================================
  // 1) Tracción con cuarto de máquinas: polea, cables, contrapeso y polea de desvío
  // =====================================================================================
  var TR = { R1: 0.3, C1: [0.3, 6.2], r2: 0.2, C2: [0.65, 5.5], CA: 2.48, CWH: 1.6, SUMA: 3.7, ZS: [-0.075, -0.025, 0.025, 0.075], P1: 0.3, P2: 2.6, XCW: 0.85, NSUB: 6, MARCAS: 12 };
  function caminoTraccion(yc, ycw, hund) {
    var R = TR.R1 - (hund || 0), c1 = TR.C1, c2 = TR.C2, a = angTan(c1, R, c2, TR.r2);
    var p1 = [c1[0] + R * Math.cos(a), c1[1] + R * Math.sin(a)], p2 = [c2[0] + TR.r2 * Math.cos(a), c2[1] + TR.r2 * Math.sin(a)];
    return camino([
      { l: [c1[0] - R, yc + TR.CA, c1[0] - R, c1[1]] },
      { c: c1, r: R, a0: PI, a1: a },
      { l: [p1[0], p1[1], p2[0], p2[1]] },
      { c: c2, r: TR.r2, a0: a, a1: 0 },
      { l: [c2[0] + TR.r2, c2[1], c2[0] + TR.r2, ycw + TR.CWH] }
    ]);
  }
  function armarTraccion(K, s) {
    var M = K.M, T = K.T, i;
    s.mCable = K.mat(0x4b525a, { metalness: 0.55, roughness: 0.4 });
    s.mPintura = K.matB(0xf4f1e6);
    // foso, muro del fondo y pisos
    K.add(K.caja(3.2, 0.06, 2.2, M.losa || M.piso, 0.15, -0.03, -0.05));
    K.add(K.caja(3.2, 7.0, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0.15, 3.5, -0.95));
    [[TR.P1, 'PISO 1'], [TR.P2, 'PISO 2']].forEach(function (p) {
      K.add(K.caja(0.36, 0.035, 0.3, M.amarillo, -0.82, p[0] - 0.018, 0.5));
      var c = K.cartel(p[1], 0.4, 0.12, '#1b262f', '#f2b705'); c.position.set(-0.82, p[0] + 0.09, 0.66); K.add(c);
    });
    // cabina con su bastidor y los resortes de los amarres
    s.cab = K.add(new T.Group());
    s.cab.add(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.1, 0));
    s.cab.add(K.caja(0.44, 2.0, 0.02, M.panel, -0.225, 1.02, 0.71), K.caja(0.44, 2.0, 0.02, M.panel, 0.225, 1.02, 0.71));
    [-1, 1].forEach(function (l) { s.cab.add(K.caja(0.06, 2.62, 0.12, M.aceroOsc, l * 0.64, 1.19, 0)); });
    s.cab.add(K.caja(1.34, 0.12, 0.16, M.aceroOsc, 0, 2.36, 0), K.caja(1.34, 0.1, 0.16, M.aceroOsc, 0, -0.05, 0));
    s.cab.add(K.caja(1.24, 0.03, 0.08, M.hierro, 0, -0.015, 0.72));
    s.resCab = TR.ZS.map(function (z) { var r = K.resorte(0.015, 0.06, 4, 0.004, M.cobre); r.position.set(0, 2.42, z); s.cab.add(r); return r; });
    // contrapeso: marco, pesas y su traba
    s.cw = K.add(new T.Group());
    [-1, 1].forEach(function (l) { s.cw.add(K.caja(0.16, 1.52, 0.05, M.aceroOsc, 0, 0.76, l * 0.42)); });
    s.cw.add(K.caja(0.17, 0.08, 0.9, M.aceroOsc, 0, 1.5, 0), K.caja(0.17, 0.08, 0.9, M.aceroOsc, 0, 0.02, 0));
    s.pesas = [];
    for (i = 0; i < 9; i++) { var p = K.caja(0.13, 0.13, 0.78, i % 2 ? M.pesa : M.pesa2, 0, 0.13 + i * 0.145, 0); s.cw.add(p); s.pesas.push(p); }
    s.traba = K.caja(0.15, 0.035, 0.8, M.hierro, 0, 1.4, 0); s.cw.add(s.traba);
    s.resCw = TR.ZS.map(function (z) { var r = K.resorte(0.015, 0.06, 4, 0.004, M.cobre); r.position.set(0, 1.54, z); s.cw.add(r); return r; });
    [-1, 1].forEach(function (l) { var g = K.riel(5.15, M.acero); g.position.set(TR.XCW, 0, l * 0.5); if (l > 0) g.rotation.y = PI; K.add(g); });
    // amortiguadores del foso
    [-0.3, 0.3].forEach(function (x) { K.add(K.cil(0.07, 0.12, M.pu, x, 0.06, 0)); });
    K.add(K.cil(0.09, 0.04, M.hierro, TR.XCW, 0.02, 0)); s.amortCw = K.add(K.cil(0.06, 0.33, M.pu, TR.XCW, 0.2, 0));
    // cuarto de máquinas: losa (transparente para ver todo), máquina, polea de tracción y polea de desvío
    K.add(K.caja(2.6, 0.1, 1.9, K.mat(0x9aa1a7, { transparent: true, opacity: 0.32, depthWrite: false, roughness: 1 }), 0.25, 5.85, -0.05));
    K.add(K.caja(0.9, 0.12, 0.5, M.hierro, 0.3, 5.96, -0.42));
    s.mMaq = K.mat(0x2f6e58, { roughness: 0.5, metalness: 0.25 });
    s.motor = K.add(K.cil(0.3, 0.32, s.mMaq, 0.3, 6.2, -0.32, 'z', 36));
    K.add(K.cil(0.17, 0.12, M.aceroOsc, 0.3, 6.2, -0.54, 'z', 24));
    s.polea = K.add(poleaCanales(K, TR.R1, 0.2, 4, M.acero, M.hierro)); s.polea.position.set(TR.C1[0], TR.C1[1], 0);
    s.desvio = K.add(poleaCanales(K, TR.r2, 0.2, 4, M.acero, M.hierro)); s.desvio.position.set(TR.C2[0], TR.C2[1], 0);
    s.soporteD = [K.add(K.caja(0.06, 0.42, 0.03, M.aceroOsc, TR.C2[0], 5.62, -0.14))];
    // cables: tramo de cabina (en pedacitos, por si se afloja), arcos en las poleas, tramo inclinado y tramo del contrapeso
    s.cables = new T.Group(); K.add(s.cables);
    var a = angTan(TR.C1, TR.R1, TR.C2, TR.r2);
    s.cuerdas = TR.ZS.map(function (z) {
      var c = { z: z, sub: [], g: new T.Group() };
      for (var j = 0; j < TR.NSUB; j++) { var cb = K.cable(0.008, s.mCable); c.g.add(cb); c.sub.push(cb); }
      c.arco1 = K.toro(TR.R1, 0.008, s.mCable, TR.C1[0], TR.C1[1], z, PI - a); c.arco1.rotation.z = a; c.g.add(c.arco1);
      c.arco2 = K.toro(TR.r2, 0.008, s.mCable, TR.C2[0], TR.C2[1], z, a); c.g.add(c.arco2);
      c.l2 = K.cable(0.008, s.mCable); c.l3 = K.cable(0.008, s.mCable); c.g.add(c.l2, c.l3);
      c.marcas = []; for (j = 0; j < TR.MARCAS; j++) { var mk = K.cable(0.0115, s.mPintura); c.marcas.push(mk); K.add(mk); }
      s.cables.add(c.g); return c;
    });
    // extras para las fallas y explicaciones
    s.puas = K.add(puas(K, K.matB(0xff3b30)));
    s.polvo = K.add(polvo(K, 16));
    s.ondas = K.add(ondas(K));
    s.chispas = K.add(K.chispas(14)); s.chispas.visible = false;
    s.flechas = [K.add(K.flecha(0xf2b705, 0.014)), K.add(K.flecha(0xf2b705, 0.014))];
    s.regla = K.add(K.caja(0.02, 1, 0.02, K.matB(0xff3b30)));
    s.lupa = K.add(lupa(K, 0.17)); s.cableG = cableGrande(K, 0.3, 0.03); s.lupa.dentro.add(s.cableG); K.add(s.lupa.linea);
    s.lupa.visible = s.lupa.linea.visible = false;
    s.q = [0, 0, 0, 0, 0, 0];
    s.marcables = [s.cab, s.cw, s.cables, s.polea, s.desvio, s.amortCw];
    return s;
  }
  // pone toda la tracción. o: yc (piso de cabina), ycw (base del contrapeso), u (avance de la polea),
  // hund (canal gastado), flojo [cable, cuánto], puas (s del cable 2), pesasSueltas, vib, tiltD, giroD
  function tracPone(s, K, o) {
    var cm = caminoTraccion(o.yc, o.ycw, o.hund || 0), q = s.q, R = TR.R1 - (o.hund || 0);
    marca(K, s.marcables, null);
    s.lupa.visible = s.lupa.linea.visible = false;
    var vib = o.vib ? Math.sin(o.t * 47) * o.vib : 0;
    s.cab.position.set(vib, o.yc, 0); s.cw.position.set(TR.XCW, o.ycw, 0);
    s.polea.rueda.rotation.z = -(o.u || 0) / TR.R1;
    s.desvio.rueda.rotation.z = o.giroD != null ? o.giroD : -(o.uc != null ? o.uc : o.u || 0) / TR.r2;
    s.desvio.rotation.y = o.tiltD || 0;
    var L1 = cm.segs[0].L, y0 = cm.segs[0].l[1], x0 = cm.segs[0].l[0];
    s.cuerdas.forEach(function (c, k) {
      var bow = o.flojo && o.flojo[0] === k ? o.flojo[1] : 0;
      for (var j = 0; j < TR.NSUB; j++) {
        var u0 = j / TR.NSUB, u1 = (j + 1) / TR.NSUB;
        c.sub[j].pon([x0 + vib * (1 - u0) + bow * Math.sin(PI * u0), y0 + L1 * u0, c.z], [x0 + vib * (1 - u1) + bow * Math.sin(PI * u1), y0 + L1 * u1, c.z]);
      }
      var f = R / TR.R1; c.arco1.scale.set(f, f, 1);
      var s2 = cm.segs[2].l, s4 = cm.segs[4].l;
      c.l2.pon([s2[0], s2[1], c.z], [s2[2], s2[3], c.z]); c.l3.pon([s4[0], s4[1], c.z], [s4[2], s4[3], c.z]);
      // marcas de pintura: puntos fijos del cable (se mueven con él)
      c.marcas.forEach(function (mk, i) {
        var sm = 0.22 + i * 0.42 + (o.corre || 0);
        enCamino(cm, sm, q);
        var x = q[0], y = q[1];
        if (q[4] === 0) x += bow * Math.sin(PI * q[5]) + vib * (1 - q[5]);
        mk.visible = sm < cm.L - 0.05;
        mk.pon([x - q[2] * 0.02, y - q[3] * 0.02, c.z], [x + q[2] * 0.02, y + q[3] * 0.02, c.z]);
      });
      s.resCab[k].scale.y = bow > 0.001 ? 1.6 : o.resCab ? o.resCab[k] : 1;
    });
    s.pesas.forEach(function (p, i) { p.position.y = 0.13 + i * 0.145 + (o.pesasSueltas ? Math.abs(Math.sin(o.t * 19 + i * 1.7)) * 0.022 * o.pesasSueltas : 0); p.rotation.x = o.pesasSueltas ? Math.sin(o.t * 23 + i) * 0.03 * o.pesasSueltas : 0; });
    if (o.puas != null) { enCamino(cm, o.puas, q); s.puas.visible = true; s.puas.position.set(q[0], q[1], TR.ZS[2]); } else s.puas.visible = false;
    return cm;
  }
  // muestra la lupa en «pos», mirando a la cámara del plano actual, con una línea hasta el punto «a»
  var CAMV = null;
  function ponerLupa(s, K, c, t, pos, a, on) {
    s.lupa.visible = s.lupa.linea.visible = !!on; if (!on) return;
    CAMV = CAMV || [new K.T.Vector3(), new K.T.Vector3()];
    camaraPieza(s, c, t, 0, CAMV[0], CAMV[1]);
    s.lupa.position.set(pos[0], pos[1], pos[2]); s.lupa.lookAt(CAMV[0]);
    var n = CAMV[0].clone().sub(s.lupa.position).normalize(), v = new K.T.Vector3(a[0] - pos[0], a[1] - pos[1], a[2] - pos[2]);
    v.addScaledVector(n, -v.dot(n)).normalize().multiplyScalar(0.17);
    s.lupa.linea.pon([pos[0] + v.x, pos[1] + v.y, pos[2] + v.z], a);
  }
  // guiones por pieza: subtítulos, cámaras y lo que se resalta
  var GTR = {
    polea_traccion: {
      f: [[0, 'Esta es la polea de tracción: una rueda con canales, pegada al motor de la máquina.'],
        [4.5, 'Los cables no van amarrados a ella: se apoyan en los canales, uno en cada canal.'],
        [8.5, 'Cuando la polea gira, arrastra los cables por roce: la cabina sube y el contrapeso baja.'],
        [13, 'El peso de la cabina y del contrapeso aprieta los cables contra la polea. Así agarran.']],
      g: [[0, 'Falla: los canales de la polea se gastaron. Los cables se hunden y ya no agarran bien.'],
        [4.5, 'La polea gira, pero los cables patinan. Debajo cae polvillo de metal.'],
        [9, 'La cabina no sigue a la polea: se pasa y no para a nivel del piso.'],
        [13.5, 'Arreglo: el técnico cambia la polea y los cables juntos, con el ascensor detenido y asegurado.']],
      cams: [
        planos([[0, [-0.55, 6.85, 1.75], [0.3, 6.1, -0.1], [-0.4, 6.8, 1.6]],
          [4.5, [-0.38, 6.42, 0.85], [0.08, 6.2, 0]],
          [8.5, [2.6, 4.4, 6.0], [0.2, 3.2, 0], [2.9, 4.3, 6.2]],
          [13, [-0.35, 6.55, 2.5], [0.4, 5.75, 0], null, null, 1.1]], 17),
        planos([[0, [-0.38, 6.42, 0.85], [0.08, 6.2, 0]],
          [4.5, [-0.5, 6.45, 1.9], [0.3, 5.9, 0]],
          [9, [-1.25, 0.8, 2.45], [-0.45, 0.36, 0.4], null, null, 1.2],
          [13.5, [-0.55, 6.85, 1.75], [0.3, 6.1, -0.1], null, null, 1.2]], 18)
      ],
      mov: [[0, 0.3], [1, 0.3], [8.2, 1.3], [12.5, 2.6], [17, 2.6]],
      a0: function (t, s, K) {
        var yc = kf(t, GTR.polea_traccion.mov);
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: yc - TR.P1 });
        K.marcar(s.polea.rueda, t < 8.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.cables, entre(t, 4.5, 8.5) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Polea de tracción', [0.55, 6.02, 0.1]); K.rotulo('Motor', [0.12, 6.42, -0.35], 'izq'); }
        else if (t < 8.5) K.rotulo('Un cable en cada canal', [0.0, 6.0, 0.08], 'izq');
        else if (t < 13) { K.rotulo('Cabina sube', [-0.3, yc + 1.6, 0.7], 'izq'); K.rotulo('Contrapeso baja', [TR.XCW, TR.SUMA - yc + 0.9, 0.45]); }
        var fl = t >= 13;
        s.flechas.forEach(function (f) { f.visible = fl; });
        if (fl) { s.flechas[0].apuntar([-0.09, 5.95, 0.1], [-0.09, 5.62, 0.1]); s.flechas[1].apuntar([0.95, 5.3, 0.1], [0.95, 4.97, 0.1]); K.rotulo('Peso de la cabina', [-0.09, 5.65, 0.1], 'izq'); K.rotulo('Peso del contrapeso', [0.95, 5.0, 0.1]); }
        s.polvo.visible = false; s.ondas.visible = false; s.chispas.visible = false; s.regla.visible = false;
        var sube = yc < 2.59 && t > 1;
        K.tabla([['POLEA', sube ? 'GIRA' : 'QUIETA', sube ? 'ac' : ''], ['CABINA', sube ? 'SUBE' : 'QUIETA', sube ? 'ac' : ''], ['CONTRAPESO', sube ? 'BAJA' : 'QUIETO', sube ? 'ac' : '']]);
      },
      a1: function (t, s, K) {
        var hund = t < 13.5 ? 0.009 * ph(t, 0.5, 3) : 0;
        var uB = K.integ(function (x) { return kf(x, [[4.5, 0], [5.2, 0.8], [8.4, 0.8], [9, 0]]); }, Math.min(t, 9));
        var yc, uP;
        if (t < 9) { yc = TR.P1 + 0.05 * ph(t, 4.5, 9); uP = uB; }
        else if (t < 13.5) { yc = kf(t, [[9, 0.35], [11.5, 0.18]]); uP = uB + kf(t, [[9, 0], [10.2, 0.04]]); }
        else { yc = kf(t, [[13.5, 0.18], [15.5, TR.P1]]); uP = yc - TR.P1; }
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: uP, uc: yc - TR.P1, hund: hund });
        var mal = t < 13.5;
        K.marcar(s.polea.rueda, mal ? null : 'foco');
        if (mal) K.marcar(s.polea.anillos, t > 0.6 ? 'mal' : null);
        K.marcar(s.cables, null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.ondas.visible = false; s.chispas.visible = false;
        s.polvo.caer(t, [0.3, 5.86, 0], entre(t, 5, 13.5), 0.75, 0.5);
        s.regla.visible = entre(t, 10.5, 13.5);
        if (s.regla.visible) { s.regla.position.set(-0.64, (yc + TR.P1) / 2, 0.74); s.regla.scale.y = Math.max(0.01, Math.abs(TR.P1 - yc)); }
        if (t < 4.5) K.rotulo('Canales gastados', [0.05, 6.32, 0.1], 'izq');
        else if (t < 9) { K.aviso('Los cables patinan'); K.tabla([['POLEA', 'GIRA', 'ac'], ['CABLES', 'PATINAN', 'mal'], ['CABINA', 'CASI QUIETA', 'mal']]); K.rotulo('Polvillo', [0.3, 5.55, 0.1]); }
        else if (t < 13.5) { K.rotulo('Se pasó del piso', [-0.64, Math.min(yc, TR.P1), 0.74], 'izq'); if (t > 10.5) K.aviso('No para a nivel'); K.tabla([['CABINA', t < 11 ? 'BAJANDO' : 'DESNIVELADA', 'mal'], ['DESNIVEL', Math.round(Math.abs(TR.P1 - yc) * 100) + ' cm', 'mal']]); }
        else { K.aviso('Polea y cables nuevos', false); K.rotulo('Polea nueva', [0.3, 6.52, 0.1]); }
      }
    },
    cables_traccion: {
      f: [[0, 'Estos son los cables de acero. De ellos cuelga la cabina.'],
        [4, 'Son varios, uno al lado del otro, y cada uno es mucho más fuerte de lo que necesita.'],
        [8.5, 'Suben desde la cabina, pasan por la polea de la máquina y bajan hasta el contrapeso.'],
        [13, 'Las marcas blancas de pintura muestran cómo corren los cables sobre la polea.']],
      g: [[0, 'Falla 1: con los años se rompen hilos del cable. Salen como púas.'],
        [4.5, 'Con muchos hilos rotos el cable está débil y hay que cambiarlo.'],
        [9, 'Falla 2: un cable queda más flojo. Los otros cargan de más y la cabina vibra.'],
        [13.5, 'Arreglo: igualar los cables con las tuercas de los amarres. Si hay muchos hilos rotos, cambiar todos juntos.']],
      cams: [
        planos([[0, [-1.2, 3.75, 1.7], [0, 3.4, 0]],
          [4, [0.75, 4.15, 0.75], [-0.05, 4.05, 0.05]],
          [8.5, [2.4, 4.6, 5.6], [0.3, 4.2, 0], [2.5, 4.9, 5.4]],
          [13, [-0.3, 6.5, 2.0], [0.35, 5.9, 0]]], 17),
        planos([[0, [0.75, 4.25, 0.75], [-0.05, 4.13, 0.05], [0.8, 4.22, 0.7]],
          [9, [-0.9, 4.5, 2.7], [0.1, 4.25, 0]],
          [13.5, [-1.3, 4.7, 3.0], [0.1, 4.3, 0]]], 18)
      ],
      mov: [[0, 0.6], [1, 0.6], [8, 1.0], [13, 2.0], [17, 2.2]],
      a0: function (t, s, K) {
        var yc = kf(t, GTR.cables_traccion.mov);
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: yc - TR.P1 });
        K.marcar(s.cables, t < 8.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.polea.rueda, null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.ondas.visible = false; s.chispas.visible = false; s.regla.visible = false;
        if (t < 4) K.rotulo('Cables de acero', [0.0, 3.5, 0.08], 'izq');
        else if (t < 8.5) { K.rotulo('4 cables', [0.0, 4.32, 0.08]); K.rotulo('De cerca: hilos trenzados', [-0.22, 3.86, 0.3]); }
        else if (t < 13) { K.rotulo('A la cabina', [0, yc + 2.9, 0.08], 'izq'); K.rotulo('Al contrapeso', [TR.XCW + 0.2, TR.SUMA - yc + 2.2, 0.08]); }
        else K.rotulo('Marca de pintura', marcaVisible(s, 5.4, 6.0), 'izq');
        ponerLupa(s, K, 0, t, [-0.22, 4.05, 0.3], [0, 4.05, TR.ZS[3]], entre(t, 4.4, 8.5));
        s.cableG.rotation.x = t * 0.6; s.cableG.puas.visible = false;
      },
      a1: function (t, s, K) {
        var yc = 1.25, flojo = t >= 9 && t < 13.5 ? 0.09 * ph(t, 9, 10) : 0;
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: yc - TR.P1, puas: t < 9 ? 0.4 : null, flojo: flojo ? [1, flojo] : null, vib: flojo ? 0.004 : 0 });
        var c2 = s.cuerdas[2].g, c1 = s.cuerdas[1].g;
        K.marcar(c2, t < 9 && K.parpadeo(t, 1) ? 'mal' : null);
        K.marcar(c1, flojo && K.parpadeo(t, 0.8) ? 'mal' : null);
        K.marcar(s.cables, null); K.marcar(s.polea.rueda, null);
        if (t >= 13.5) K.marcar(s.cables, 'foco');
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.ondas.visible = false; s.chispas.visible = false; s.regla.visible = false;
        ponerLupa(s, K, 1, t, [-0.22, 4.15, 0.32], [0, yc + TR.CA + 0.4, TR.ZS[2]], t < 9);
        s.cableG.rotation.x = t * 0.5; s.cableG.puas.visible = true;
        if (t < 9) { K.rotulo('Hilos rotos', [0.03, yc + TR.CA + 0.4, TR.ZS[2]]); if (t > 4.5) K.aviso('Cable débil'); }
        else if (t < 13.5) { K.rotulo('Cable flojo', [0.05, yc + TR.CA + 0.95, TR.ZS[1]]); K.aviso('La cabina vibra'); K.tabla([['CABLE 2', 'FLOJO', 'mal'], ['CABLES 1, 3, 4', 'CARGAN DE MÁS', 'mal']]); }
        else { K.aviso('Cables parejos', false); K.tabla([['CABLES', 'TODOS IGUALES', 'ok']]); }
      }
    },
    contrapeso: {
      f: [[0, 'Este es el contrapeso: un marco de acero lleno de pesas.'],
        [4, 'Cuelga del otro lado de los cables. Cuando la cabina sube, el contrapeso baja.'],
        [8.5, 'Pesa como la cabina vacía más la mitad de la carga. Así el motor solo mueve la diferencia.'],
        [13, 'Corre por sus propias guías. Abajo, en el foso, tiene su amortiguador.']],
      g: [[0, 'Falla 1: las pesas se soltaron dentro del marco.'],
        [4, 'Al viajar golpean el marco: se escucha un traqueteo cuando se cruza con la cabina.'],
        [8.5, 'Falla 2: los cables se estiraron. Con la cabina arriba, el contrapeso casi toca su amortiguador.'],
        [13.5, 'Arreglo: asegurar las pesas con su traba y acortar los cables. Con el equipo detenido.']],
      cams: [
        planos([[0, [2.7, 4.7, 2.6], [0.85, 4.15, 0]],
          [4, [3.4, 4.6, 6.6], [0.3, 3.6, 0], [3.5, 4.4, 6.4]],
          [8.5, [2.8, 3.4, 4.8], [0.4, 3.0, 0]],
          [13, [2.5, 1.6, 2.7], [0.85, 0.95, 0]]], 17),
        planos([[0, [2.5, 4.3, 2.3], [0.85, 3.9, 0]],
          [4, [2.6, 3.0, 3.2], [0.5, 2.6, 0]],
          [8.5, [2.1, 1.0, 2.0], [0.85, 0.6, 0]],
          [13.5, [3.0, 2.0, 3.9], [0.85, 1.45, 0]]], 18)
      ],
      mov: [[0, 0.3], [4, 0.3], [8.5, 2.6], [9.3, 2.6], [11.5, 2.0], [13, 2.0], [16, 2.45], [17, 2.45]],
      a0: function (t, s, K) {
        var yc = kf(t, GTR.contrapeso.mov), ycw = TR.SUMA - yc;
        tracPone(s, K, { t: t, yc: yc, ycw: ycw, u: yc - TR.P1 });
        K.marcar(s.cw, t < 4 || t >= 13 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.cables, null); K.marcar(s.polea.rueda, null); K.marcar(s.amortCw, t >= 13 && K.parpadeo(t, 1) ? 'foco' : null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.ondas.visible = false; s.chispas.visible = false; s.regla.visible = false;
        if (t < 4) { K.rotulo('Contrapeso', [TR.XCW, ycw + 1.2, 0.45]); K.rotulo('Pesas', [TR.XCW, ycw + 0.5, 0.4]); }
        else if (t < 8.5) { K.rotulo('Cabina', [-0.3, yc + 1.4, 0.7], 'izq'); K.rotulo('Contrapeso', [TR.XCW, ycw + 0.9, 0.45]); }
        else if (t < 13) { var mv = Math.abs(yc - kf(t - 0.1, GTR.contrapeso.mov)) > 0.001; K.tabla([['CABINA + ½ CARGA', '≈ CONTRAPESO', 'ok'], ['MOTOR', 'MUEVE LA DIFERENCIA', 'ac'], ['CABINA', mv ? 'BAJA' : 'QUIETA', mv ? 'ac' : '']]); K.rotulo('Contrapeso', [TR.XCW, ycw + 0.9, 0.45]); }
        else { K.rotulo('Guía', [TR.XCW, 1.35, 0.5]); K.rotulo('Amortiguador', [TR.XCW, 0.3, 0.05]); }
      },
      a1: function (t, s, K) {
        var yc, est = 0;
        if (t < 8.5) yc = kf(t, [[0, 0.5], [0.8, 0.5], [7.6, 2.3], [8.5, 2.3]]);
        else { yc = kf(t, [[8.5, 1.6], [11, TR.P2], [18, TR.P2]]); est = t < 13.5 ? 0.5 : kf(t, [[13.5, 0.5], [15.5, 0]]); }
        var ycw = TR.SUMA - yc - est, sueltas = t < 8.5 ? 1 : 0;
        tracPone(s, K, { t: t, yc: yc, ycw: ycw, u: yc - TR.P1, pesasSueltas: sueltas });
        K.marcar(s.pesas, sueltas && K.parpadeo(t, 2) ? 'mal' : null);
        K.marcar(s.traba, sueltas ? 'mal' : t >= 13.5 ? 'foco' : null);
        K.marcar(s.cables, entre(t, 8.5, 13.5) && K.parpadeo(t, 2) ? 'mal' : null);
        K.marcar(s.polea.rueda, null); K.marcar(s.amortCw, entre(t, 8.5, 13.5) ? 'mal' : null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.chispas.visible = false;
        s.ondas.poner(t, [TR.XCW + 0.1, ycw + 0.75, 0.45], entre(t, 3.5, 8.5), 0.18);
        var hueco = ycw - 0.365;
        s.regla.visible = entre(t, 9.5, 13.5);
        if (s.regla.visible) { s.regla.position.set(TR.XCW + 0.12, 0.365 + hueco / 2, 0.12); s.regla.scale.y = Math.max(0.01, hueco); }
        if (t < 8.5) { K.rotulo('Pesas sueltas', [TR.XCW, ycw + 0.7, 0.42]); K.rotulo('Traba floja', [TR.XCW, ycw + 1.4, 0.42], 'izq'); if (t > 4) K.aviso('Traqueteo'); }
        else if (t < 13.5) { K.rotulo('Casi toca', [TR.XCW + 0.12, 0.4 + hueco / 2, 0.12]); K.tabla([['CABINA', 'ÚLTIMO PISO', ''], ['ESPACIO ABAJO', Math.round(hueco * 100) + ' cm', t > 10 ? 'mal' : 'ac']]); if (t > 10.5) K.aviso('Cables estirados'); }
        else { K.aviso('Pesas trabadas y cables a su medida', false); K.tabla([['ESPACIO ABAJO', Math.round(hueco * 100) + ' cm', 'ok']]); }
      }
    },
    polea_desvio: {
      f: [[0, 'Esta es la polea de desvío. Va debajo de la máquina y no tiene motor.'],
        [4.5, 'Gira sola, arrastrada por los mismos cables.'],
        [8.5, 'Lleva los cables hacia el contrapeso, que está más al costado que la polea de la máquina.'],
        [13, 'Así la cabina y el contrapeso viajan cada uno por su lado, sin chocar.']],
      g: [[0, 'Falla 1: el rodamiento de la polea está seco o gastado.'],
        [4.5, 'Se escucha un chillido o un zumbido arriba, que sigue el ritmo del viaje.'],
        [9, 'Falla 2: la polea quedó chueca. Los cables rozan su borde y se gastan rápido.'],
        [13.5, 'Arreglo: engrasar o cambiar el rodamiento y alinear la polea. Siempre con el equipo detenido.']],
      cams: [
        planos([[0, [-0.2, 5.0, 1.6], [0.6, 5.5, 0]],
          [4.5, [0.2, 5.25, 1.0], [0.62, 5.5, 0]],
          [8.5, [-0.3, 5.0, 2.8], [0.5, 5.0, 0]],
          [13, [2.6, 4.2, 5.8], [0.3, 3.2, 0]]], 17),
        planos([[0, [0.1, 5.3, 1.1], [0.62, 5.5, 0], [0.25, 5.2, 1.3]],
          [9, [1.3, 5.9, 1.0], [0.66, 5.5, 0]],
          [13.5, [0.2, 5.25, 1.2], [0.62, 5.5, 0]]], 18)
      ],
      mov: [[0, 0.3], [1, 0.3], [8.5, 1.5], [12.5, 2.4], [17, 2.6]],
      a0: function (t, s, K) {
        var yc = kf(t, GTR.polea_desvio.mov);
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: yc - TR.P1 });
        K.marcar(s.desvio.rueda, t < 8.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.cables, null); K.marcar(s.polea.rueda, null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.ondas.visible = false; s.chispas.visible = false; s.regla.visible = false;
        if (t < 4.5) { K.rotulo('Polea de desvío', [TR.C2[0], TR.C2[1] - 0.12, 0.1]); K.rotulo('Polea de la máquina', [0.3, 6.45, 0.1], 'izq'); }
        else if (t < 8.5) { K.rotulo('Gira sola', [TR.C2[0], TR.C2[1] - 0.12, 0.1]); K.tabla([['MOTOR', 'NO TIENE', ''], ['GIRA CON', 'LOS CABLES', 'ac']]); }
        else if (t < 13) { s.flechas[0].visible = true; s.flechas[0].apuntar([0.62, 5.0, 0.12], [TR.XCW + 0.02, 5.0, 0.12]); K.rotulo('Hacia el contrapeso', [0.88, 4.9, 0.12]); }
        else { K.rotulo('Cabina', [-0.3, yc + 1.4, 0.7], 'izq'); K.rotulo('Contrapeso', [TR.XCW, TR.SUMA - yc + 0.9, 0.45]); }
      },
      a1: function (t, s, K) {
        var VIAJE = [[0, 0.5], [1, 0.5], [7.5, 1.8], [9, 1.8], [15.5, 0.5], [18, 0.5]], yc = kf(t, VIAJE);
        var tilt = t >= 9 && t < 13.5 ? 0.12 * ph(t, 9, 10) : 0;
        tracPone(s, K, { t: t, yc: yc, ycw: TR.SUMA - yc, u: yc - TR.P1, tiltD: tilt });
        var malR = t < 9, malT = tilt > 0;
        K.marcar(s.desvio.rueda, malT ? (K.parpadeo(t, 1.2) ? 'mal' : null) : t >= 13.5 ? 'foco' : null);
        if (malR) K.marcar(s.desvio.cubo, 'mal');
        K.marcar(s.cables, null); K.marcar(s.polea.rueda, null);
        s.flechas.forEach(function (f) { f.visible = false; }); s.polvo.visible = false; s.regla.visible = false;
        var moviendo = Math.abs(kf(t + 0.05, VIAJE) - yc) > 0.0005;
        s.ondas.poner(t, [TR.C2[0], TR.C2[1], 0.16], malR && moviendo, 0.2);
        s.chispas.emitir(t, [TR.C2[0] + TR.r2 * 0.9, TR.C2[1] + 0.06, 0.1], malT && moviendo, 0.12);
        if (t < 9) { K.rotulo('Rodamiento seco', [TR.C2[0], TR.C2[1], 0.12]); if (t > 4.5) K.aviso('Chillido arriba'); }
        else if (t < 13.5) { K.rotulo('Polea chueca', [TR.C2[0], TR.C2[1] - 0.15, 0.1]); K.aviso('Los cables rozan'); }
        else K.aviso('Polea alineada y engrasada', false);
      }
    }
  };
  function marcaVisible(s, ymin, ymax) {
    var mk = null; s.cuerdas[3].marcas.forEach(function (m) { if (!mk && m.visible && m.position.y > ymin && m.position.y < ymax && m.position.x < 0.2) mk = m; });
    return mk || [0, 5.4, 0.08];
  }
  V3.escena('maq-traccion', ['polea_traccion', 'cables_traccion', 'contrapeso', 'polea_desvio'], {
    fov: 36,
    construir: function (K, id) {
      var s = armarTraccion(K, { K: K });
      s.G = GTR[id] || GTR.polea_traccion; s.cams = s.G.cams;
      return s;
    },
    camara: camaraPieza,
    funciona: { dur: 17, subt: function (id) { return (GTR[id] || GTR.polea_traccion).f; }, anim: function (t, s, K) { s.G.a0(t, s, K); } },
    falla: { dur: 18, subt: function (id) { return (GTR[id] || GTR.polea_traccion).g; }, anim: function (t, s, K) { s.G.a1(t, s, K); } }
  });

  // =====================================================================================
  // 2) Máquina sin engranajes (con corte para ver por dentro) y máquina antigua con reductor
  // =====================================================================================
  S.encoder = {
    que: 'Es una ruedita con ranuras en la punta del eje del motor, con una cajita y un cable delgado.',
    sirve: 'Cuenta las vueltas del motor y le avisa al variador (la caja que da fuerza al motor) qué tan rápido gira.',
    falla: 'Si se afloja o su cable falla, el motor da tirones y el ascensor se para con «error de encoder».',
    arreglo: 'Se ajusta el encoder a su eje y se revisan su conector y su cable, con el ascensor detenido.'
  };
  S.cables_motor = {
    que: 'Son los cables que van del tablero al motor: uno grueso de fuerza y otros delgados de señal.',
    sirve: 'El grueso lleva la corriente que hace girar el motor. Los delgados llevan avisos del encoder y del freno.',
    falla: 'Si el forro se pela contra un filo o un borne se afloja, el variador se apaga y marca falla.',
    arreglo: 'Se corta la energía, se espera unos minutos, se cambia el tramo dañado y se ajustan los bornes.'
  };
  var Y0 = 0.6, RP = 0.26, XP = -0.5, CXS = [-0.0675, -0.0225, 0.0225, 0.0675];
  // máquina gearless con el eje a lo largo de x, centro del eje en (0, Y0, 0). o.corte: carcasa abierta;
  // o.sinEncoder: no pone el encoder tapado (la escena del encoder arma el suyo)
  function armarGearless(K, o) {
    o = o || {};
    var M = K.M, T = K.T, g = new T.Group(), m = { g: g }, corte = o.corte !== false, k;
    m.mCarcasa = K.mat(0x2f6e58, { roughness: 0.5, metalness: 0.25, side: T.DoubleSide });
    [-1, 1].forEach(function (l) { g.add(K.caja(1.0, 0.12, 0.1, M.hierro, 0.1, 0.06, l * 0.24)); });
    g.add(K.caja(0.5, 0.16, 0.5, m.mCarcasa, 0, 0.2, 0));
    var geo = corte ? new T.CylinderGeometry(0.34, 0.34, 0.36, 40, 1, false, PI / 2, 1.5 * PI) : new T.CylinderGeometry(0.34, 0.34, 0.36, 40);
    m.carcasa = new T.Mesh(geo, m.mCarcasa); m.carcasa.rotation.z = PI / 2; m.carcasa.position.set(0, Y0, 0); g.add(m.carcasa);
    if (corte) {
      var anillo = new T.Mesh(new T.CylinderGeometry(0.31, 0.31, 0.34, 40, 1, true, PI / 2, 1.5 * PI), K.mat(0x3a4047, { side: T.DoubleSide, roughness: 0.7 }));
      anillo.rotation.z = PI / 2; anillo.position.set(0, Y0, 0); g.add(anillo);
    }
    // bobinas del estator (quietas): cada una con su material para poder encenderla
    m.bobinas = [];
    for (k = 0; k < 12; k++) {
      var th = k * PI / 6; if (corte && th > 0.01 && th < PI / 2 - 0.01) continue;
      var mb = K.mat(0xb9743a, { metalness: 0.45, roughness: 0.4 });
      var b = K.caja(0.3, 0.05, 0.075, mb, 0, Y0 + 0.27 * Math.sin(th), 0.27 * Math.cos(th)); b.rotation.x = PI / 2 - th;
      b.th = th; g.add(b); m.bobinas.push(b);
    }
    // rotor con imanes (gira con rotation.x), eje, tambor del freno
    m.rotor = new T.Group(); m.rotor.position.set(0, Y0, 0); g.add(m.rotor);
    m.rotor.add(K.cil(0.2, 0.3, M.hierro, 0, 0, 0, 'x', 32));
    var mN = K.mat(0xd03a2c, { roughness: 0.45 }), mS = K.mat(0x2e5f90, { roughness: 0.45 });
    m.imanes = [];
    for (k = 0; k < 12; k++) {
      var ti = k * PI / 6 + PI / 12, im = K.caja(0.28, 0.026, 0.085, k % 2 ? mS : mN, 0, 0.212 * Math.sin(ti), 0.212 * Math.cos(ti)); im.rotation.x = PI / 2 - ti;
      m.rotor.add(im); m.imanes.push(im);
    }
    var xf = o.sinEncoder ? 0.25 : 0.42;
    m.rotor.add(K.cil(0.045, xf + 0.62, M.acero, (xf - 0.62) / 2, 0, 0, 'x', 16));
    m.rodamiento = K.cil(0.09, 0.045, M.gris, 0.205, Y0, 0, 'x', 24); g.add(m.rodamiento);
    m.tambor = K.cil(0.2, 0.07, M.aceroOsc, -0.27, 0, 0, 'x', 32); m.rotor.add(m.tambor);
    m.rotor.add(K.caja(0.072, 0.05, 0.02, M.blanco, -0.27, 0.12, 0.2));
    m.freno = K.caja(0.12, 0.1, 0.32, M.gris, -0.27, Y0 + 0.25, 0); g.add(m.freno);
    // polea de tracción en el eje (gira con el rotor)
    m.polea = poleaCanales(K, RP, 0.18, 4, M.acero, M.hierro); m.polea.rotation.y = -PI / 2; m.polea.position.set(XP, Y0, 0); g.add(m.polea);
    if (!o.sinEncoder) { m.encoder = K.cil(0.05, 0.06, M.negro, 0.46, Y0, 0, 'x', 20); g.add(m.encoder); }
    // cables que bajan por adelante (a la cabina) y por atrás (al contrapeso)
    m.mCable = K.mat(0x4b525a, { metalness: 0.55, roughness: 0.4 }); m.mPint = K.matB(0xf4f1e6);
    m.cables = new T.Group(); g.add(m.cables); m.marcas = [];
    CXS.forEach(function (dx) {
      var x = XP + dx;
      m.cables.add(K.cil(0.008, 1.2, m.mCable, x, Y0 - 0.6, RP, null, 10), K.cil(0.008, 1.2, m.mCable, x, Y0 - 0.6, -RP, null, 10));
      var arco = K.toro(RP, 0.008, m.mCable, x, Y0, 0, PI); arco.rotation.y = PI / 2; m.cables.add(arco);
      for (var i = 0; i < 8; i++) { var mk = K.cil(0.0115, 0.04, m.mPint, x, 0, 0, null, 10); g.add(mk); m.marcas.push({ o: mk, x: x, s0: i * 0.4 }); }
    });
    return m;
  }
  // gira la máquina: a = ángulo del eje (rotation.x); mueve las marcas de pintura de los cables
  function gearlessGira(m, a) {
    m.rotor.rotation.x = a; m.polea.rueda.rotation.z = -a;
    var u = -a * RP, L = 1.2 + PI * RP + 1.2;
    m.marcas.forEach(function (k) {
      var s = (((k.s0 + u) % L) + L) % L, o = k.o;
      if (s < 1.2) { o.position.set(k.x, Y0 - 1.2 + s, RP); o.rotation.x = 0; }
      else if (s < 1.2 + PI * RP) { var f = PI - (s - 1.2) / RP; o.position.set(k.x, Y0 + RP * Math.sin(f), -RP * Math.cos(f)); o.rotation.x = f - PI / 2; }
      else { o.position.set(k.x, Y0 - (s - 1.2 - PI * RP), -RP); o.rotation.x = 0; }
      o.visible = o.position.y > 0.02;
    });
  }
  // enciende las bobinas como un campo que da vueltas delante de los imanes; calor 0..1 las pone rojas
  function bobinasPone(m, a, fuerza, calor) {
    m.bobinas.forEach(function (b) {
      var d = Math.cos(b.th - (-a + 0.5)), e = Math.max(0, d); e = e * e * e;
      var mt = b.userData._m0 || b.material;
      mt.emissive.setHex(calor > 0.02 ? 0xff2a10 : 0xffb020);
      mt.emissiveIntensity = Math.max(calor * 0.9, e * fuerza * 0.85);
    });
  }
  // máquina antigua: motor + caja de engranajes (sinfín y corona en aceite) + polea + volante
  function armarReductor(K) {
    var M = K.M, T = K.T, g = new T.Group(), r = { g: g }, mCaja = K.mat(0x3f6f8f, { roughness: 0.5, metalness: 0.25 });
    g.add(K.caja(1.2, 0.1, 0.5, M.hierro, 0.1, 0.05, 0));
    // caja abierta por delante para ver los engranajes
    g.add(K.caja(0.5, 0.5, 0.03, mCaja, 0, 0.4, -0.2), K.caja(0.03, 0.5, 0.4, mCaja, -0.25, 0.4, 0), K.caja(0.03, 0.5, 0.4, mCaja, 0.25, 0.4, 0));
    g.add(K.caja(0.5, 0.03, 0.4, mCaja, 0, 0.66, 0), K.caja(0.5, 0.03, 0.4, mCaja, 0, 0.14, 0));
    g.add(K.caja(0.47, 0.1, 0.37, K.mat(0xc99228, { transparent: true, opacity: 0.55, roughness: 0.2 }), 0, 0.205, 0));
    // corona (eje z) y sinfín (eje x) encima
    r.corona = new T.Group(); r.corona.position.set(0, 0.36, 0); g.add(r.corona);
    r.corona.add(K.cil(0.15, 0.06, M.cobre, 0, 0, 0, 'z', 32), K.cil(0.03, 0.62, M.acero, 0, 0, -0.15, 'z', 12));
    for (var i = 0; i < 18; i++) { var d = K.caja(0.025, 0.03, 0.06, M.cobre, 0, 0, 0), a = i * TAU / 18; d.position.set(Math.cos(a) * 0.162, Math.sin(a) * 0.162, 0); d.rotation.z = a; r.corona.add(d); }
    r.corona.add(K.caja(0.12, 0.02, 0.064, M.blanco, 0.07, 0, 0));
    r.sinfin = new T.Group(); r.sinfin.position.set(0, 0.555, 0); g.add(r.sinfin);
    var h = K.resorte(0.035, 0.26, 5, 0.012, M.acero); h.rotation.z = -PI / 2; h.position.x = -0.13; r.sinfin.add(h);
    r.sinfin.add(K.cil(0.024, 0.9, M.acero, 0.3, 0, 0, 'x', 12));
    // motor que mueve el sinfín y el volante de rescate
    r.motor = K.cil(0.17, 0.42, mCaja, 0.5, 0.555, 0, 'x', 28); g.add(r.motor);
    g.add(K.caja(0.36, 0.38, 0.3, mCaja, 0.5, 0.25, 0));
    r.volante = new T.Group(); r.volante.position.set(0.78, 0.555, 0); g.add(r.volante);
    var tv = K.toro(0.12, 0.012, M.amarillo, 0, 0, 0); tv.rotation.y = PI / 2; r.volante.add(tv);
    r.volante.add(K.caja(0.01, 0.24, 0.02, M.amarillo, 0, 0, 0), K.caja(0.01, 0.02, 0.24, M.amarillo, 0, 0, 0));
    // polea grande detrás de la caja, en el eje de la corona
    r.polea = poleaCanales(K, 0.3, 0.14, 4, M.acero, M.hierro); r.polea.position.set(0, 0.36, -0.4); r.polea.rotation.y = PI; g.add(r.polea);
    [-0.3, 0.3].forEach(function (x) { g.add(K.cil(0.008, 0.9, M.hierro, x, -0.05, -0.4, null, 8)); });
    return r;
  }
  V3.escena('maq-motor', ['maquina'], {
    fov: 36,
    construir: function (K) {
      var M = K.M, s = { K: K };
      K.add(K.caja(1.4, 0.08, 3.0, M.losa || M.piso, -1.32, -0.04, 0), K.caja(3.6, 0.08, 3.0, M.losa || M.piso, 1.42, -0.04, 0));
      K.add(K.caja(0.24, 0.08, 1.14, M.losa || M.piso, XP, -0.04, 0.93), K.caja(0.24, 0.08, 1.14, M.losa || M.piso, XP, -0.04, -0.93));
      K.add(K.caja(5.0, 3.0, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0.6, 1.46, -1.5));
      s.m = armarGearless(K, { corte: true }); K.add(s.m.g);
      s.r = armarReductor(K); s.r.g.position.set(2.75, 0, 0.1); K.add(s.r.g);
      s.ondas = K.add(ondas(K)); s.calor = K.add(ondas(K, 0xff7a2a));
      s.cams = [
        planos([[0, [-1.55, 1.45, 2.15], [-0.15, 0.5, 0], [-1.45, 1.4, 2.0]],
          [4.5, [0.42, 1.3, 1.2], [0.0, 0.62, 0]],
          [9, [-1.2, 1.35, 2.3], [-0.15, 0.5, 0]],
          [13.5, [2.25, 1.45, 2.1], [2.85, 0.42, 0], null, null, 1.2]], 18),
        planos([[0, [-0.6, 1.45, 2.1], [0.0, 0.55, 0], [-0.4, 1.4, 2.0]],
          [9, [1.15, 1.05, 1.5], [0.12, 0.58, 0]],
          [13.5, [-1.4, 1.5, 2.3], [-0.1, 0.5, 0]]], 18)
      ];
      return s;
    },
    camara: camaraPieza,
    funciona: {
      dur: 18,
      subt: [[0, 'La máquina es el motor del ascensor. Hace girar la polea, y la polea mueve los cables.'],
        [4.5, 'Por dentro, los imanes del centro giran, jalados por bobinas que se encienden en ronda.'],
        [9, 'El tablero le da más o menos fuerza: por eso arranca suave, viaja y frena suave.'],
        [13.5, 'Las máquinas antiguas tienen engranajes en aceite: el motor gira rápido y la polea, lento.']],
      anim: function (t, s, K) {
        var V = [[0, 0], [1, 1.1], [9, 1.1], [9.4, 0], [10, 0], [11, 2.4], [12, 2.4], [13, 0], [13.5, 0], [14.2, 1], [18, 1]];
        var a = -K.integ(function (x) { return kf(x, V); }, t), v = kf(t, V);
        gearlessGira(s.m, a); bobinasPone(s.m, a, Math.min(1, 0.3 + v * 0.5), 0);
        s.m.mCarcasa.emissiveIntensity = 0; s.m.g.position.set(0, 0, 0);
        var ar = K.integ(function (x) { return x < 13.5 ? 0 : kf(x, [[13.5, 0], [14.2, 1], [18, 1]]); }, t);
        s.r.sinfin.rotation.x = -ar * 7; s.r.volante.rotation.x = -ar * 7; s.r.corona.rotation.z = ar * 0.4; s.r.polea.rueda.rotation.z = -ar * 0.4;
        s.ondas.visible = false; s.calor.visible = false;
        marca(K, [s.m.polea, s.m.imanes, s.r.sinfin, s.r.corona], null);
        if (t < 4.5) { K.marcar(s.m.polea, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Polea', [XP - 0.1, Y0 + 0.27, 0]); K.rotulo('Motor', [0.05, Y0 + 0.35, -0.2]); K.rotulo('Cables', [XP + 0.07, 0.15, RP]); }
        else if (t < 9) { K.rotulo('Imanes (giran)', [0.0, Y0 + 0.13, 0.17]); K.rotulo('Bobinas (quietas)', [0.0, Y0 + 0.23, -0.14], 'izq'); }
        else if (t < 13.5) {
          var est = v < 0.05 ? ['PARADA', ''] : t < 11 ? ['ARRANCA SUAVE', 'ac'] : t < 12 ? ['VIAJA', 'ok'] : ['FRENA SUAVE', 'ac'];
          K.tabla([['VELOCIDAD', est[0], est[1]], ['FUERZA', Math.round(Math.min(1, v / 2.4) * 100) + ' %', '']]);
          K.rotulo('Polea', [XP - 0.1, Y0 + 0.27, 0]);
        } else { K.marcar([s.r.sinfin, s.r.corona], 'foco'); K.rotulo('Motor (rápido)', [3.25, 0.75, 0.1]); K.rotulo('Engranajes', [2.75, 0.5, 0.15], 'izq'); K.rotulo('Polea (lenta)', [2.48, 0.62, -0.4], 'izq'); }
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: muchos viajes seguidos o un cuarto sin aire hacen que el motor se caliente.'],
        [4.5, 'Su protección lo apaga para que no se queme. El ascensor se para hasta que enfríe.'],
        [9, 'Falla 2: un rodamiento gastado hace zumbar y temblar la máquina.'],
        [13.5, 'Arreglo: ventilar el cuarto, limpiar el ventilador y cambiar el rodamiento gastado. Con la energía cortada.']],
      anim: function (t, s, K) {
        var calor = t < 9 ? ph(t, 0.3, 5.2) * (1 - ph(t, 7.5, 9)) : 0;
        var V = [[0, 1.4], [5, 1.4], [5.6, 0], [9, 0], [9.6, 1.6], [13.5, 1.6], [14.2, 1.1], [18, 1.1]];
        var a = -K.integ(function (x) { return kf(x, V); }, t), v = kf(t, V);
        gearlessGira(s.m, a); bobinasPone(s.m, a, v > 0.05 ? 0.8 : 0, calor);
        s.m.mCarcasa.emissive.setHex(0xff2a10); s.m.mCarcasa.emissiveIntensity = calor * 0.75;
        var tiembla = entre(t, 9, 13.5);
        s.m.g.position.set(tiembla ? Math.sin(t * 61) * 0.006 : 0, tiembla ? Math.cos(t * 53) * 0.005 : 0, 0);
        s.ondas.poner(t, [0.24, Y0, 0], tiembla, 0.22, PI / 2);
        s.calor.poner(t * 0.7, [0, Y0 + 0.36, 0.05], calor > 0.4 && t < 9, 0.25);
        s.calor.rotation.x = -PI / 2;
        s.r.sinfin.rotation.x = 0;
        marca(K, [s.m.polea, s.m.imanes, s.r.sinfin, s.r.corona, s.m.rodamiento], null);
        if (tiembla) K.marcar(s.m.rodamiento, 'mal');
        if (t < 9) {
          var temp = Math.round(55 + calor * 70);
          K.tabla([['TEMPERATURA', temp + ' °C', temp > 105 ? 'mal' : temp > 80 ? 'ac' : 'ok'], ['PROTECCIÓN', t > 5 && t < 8.5 ? 'APAGÓ EL MOTOR' : 'VIGILANDO', t > 5 && t < 8.5 ? 'mal' : 'ok']]);
          if (t > 5) K.aviso('Motor recalentado: se apagó');
          K.rotulo('Motor caliente', [0.1, Y0 + 0.33, -0.15]);
        } else if (t < 13.5) { K.rotulo('Rodamiento gastado', [0.23, Y0 + 0.08, 0.04]); K.aviso('Zumbido y vibración'); }
        else { K.aviso('Máquina fresca y suave', false); K.tabla([['TEMPERATURA', '55 °C', 'ok'], ['RODAMIENTO', 'NUEVO', 'ok']]); K.marcar(s.m.polea, 'foco'); }
      }
    }
  });

  // =====================================================================================
  // 3) Encoder: ruedita con ranuras, luz, sensor y los avisos que viajan al variador
  // =====================================================================================
  var XE = 0.27, RE = 0.07, NRAN = 16;
  function armarVariador(K, x, y, z) {
    var M = K.M, v = {}, g = new K.T.Group(); g.position.set(x, y, z); v.g = g;
    g.add(K.caja(0.42, 0.62, 0.22, K.mat(0x30353a, { roughness: 0.6 }), 0, 0.31, 0));
    for (var i = 0; i < 6; i++) g.add(K.caja(0.36, 0.012, 0.05, M.aceroOsc, 0, 0.08 + i * 0.03, 0.12));
    v.pantalla = K.cartel('OK', 0.26, 0.09, '#0d1a12', '#4cd68f'); v.pantalla.position.set(0, 0.5, 0.111); g.add(v.pantalla);
    v.rotulo = K.cartel('VARIADOR', 0.3, 0.06, '#30353a', '#cdd3d8'); v.rotulo.position.set(0, 0.395, 0.111); g.add(v.rotulo);
    v.escribir = function (txt, malo) { if (v._t === txt) return; v._t = txt; v.pantalla.escribir(txt, malo ? '#2a0d0d' : '#0d1a12', malo ? '#ff6b5e' : '#4cd68f'); };
    return v;
  }
  // puntitos que viajan por un tubo (curva) mientras «u» avanza
  function pulsos(K, n, color, r) {
    var g = new K.T.Group(), m = K.matB(color);
    for (var i = 0; i < n; i++) g.add(K.esfera(r || 0.009, m));
    g.visible = false;
    g.correr = function (curva, u, on, hueco) {
      g.visible = !!on; if (!on) return;
      g.children.forEach(function (c, i) {
        var k = (((u + i / n) % 1) + 1) % 1; c.visible = !(hueco && hueco(i, k));
        c.position.copy(curva.getPointAt(k));
      });
    };
    return g;
  }
  V3.escena('maq-encoder', ['encoder'], {
    fov: 34,
    construir: function (K) {
      var M = K.M, T = K.T, s = { K: K };
      K.add(K.caja(4.0, 0.08, 3.0, M.losa || M.piso, 0.3, -0.04, 0));
      K.add(K.caja(4.0, 2.6, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0.3, 1.26, -1.2));
      s.m = armarGearless(K, { corte: false, sinEncoder: true }); K.add(s.m.g);
      // encoder abierto: tapa transparente, disco con ranuras, horquilla con luz y sensor
      s.disco = new T.Group(); s.disco.position.set(XE, Y0, 0); K.add(s.disco);
      s.disco.add(K.cil(RE, 0.006, K.mat(0x22262b, { roughness: 0.5 }), 0, 0, 0, 'x', 40));
      var mR = K.matB(0xe9edf0);
      for (var i = 0; i < NRAN; i++) { var a = i * TAU / NRAN, rr = K.caja(0.0075, 0.012, 0.007, mR, 0, Math.sin(a) * RE * 0.84, Math.cos(a) * RE * 0.84); rr.rotation.x = -a; s.disco.add(rr); }
      s.disco.add(K.cil(0.012, 0.03, M.acero, 0, 0, 0, 'x', 12));
      K.add(K.cil(0.095, 0.12, K.mat(0xcdd3d8, { transparent: true, opacity: 0.22, depthWrite: false }), XE + 0.005, Y0, 0, 'x', 32));
      // horquilla arriba del disco: luz por fuera, sensor por dentro
      s.horq = K.add(K.grupo([K.caja(0.012, 0.035, 0.03, M.negro, 0.016, 0, 0), K.caja(0.012, 0.035, 0.03, M.negro, -0.016, 0, 0), K.caja(0.044, 0.012, 0.03, M.negro, 0, 0.022, 0)], XE, Y0 + RE * 0.84, 0));
      s.luz = K.add(K.esfera(0.006, K.matB(0xff5a3c), XE + 0.024, Y0 + RE * 0.84, 0));
      s.mRayo = K.matB(0xff3b30, { transparent: true, opacity: 0.9 });
      s.rayoA = K.add(K.cable(0.004, s.mRayo)); s.rayoB = K.add(K.cable(0.004, s.mRayo));
      s.ledV = K.matB(0x3ccf7f); s.ledO = K.matB(0x24302a);
      s.led = K.add(K.esfera(0.007, s.ledV, XE, Y0 + RE * 0.84 + 0.034, 0));
      // cable delgado hasta el variador
      s.var = armarVariador(K, 1.25, 0, -0.35); K.add(s.var.g);
      s.curva = new T.CatmullRomCurve3([[XE, Y0 + RE + 0.03, 0], [XE + 0.07, Y0 + 0.1, 0.02], [XE + 0.16, 0.45, 0.06], [0.75, 0.06, 0.08], [1.1, 0.05, -0.12], [1.25, 0.2, -0.22]].map(function (p) { return new T.Vector3(p[0], p[1], p[2]); }));
      s.cableE = K.add(new T.Mesh(new T.TubeGeometry(s.curva, 60, 0.006, 8, false), K.mat(0x8e979f, { roughness: 0.6 })));
      s.conector = K.add(K.caja(0.04, 0.03, 0.03, M.negro, 1.25, 0.2, -0.22));
      s.pulsos = K.add(pulsos(K, 12, 0x3ccf7f, 0.011));
      s.cams = [
        planos([[0, [0.95, 0.95, 0.95], [0.24, 0.6, 0]],
          [4, [0.5, 0.72, 0.27], [0.26, 0.65, 0]],
          [8, [1.0, 1.2, 1.4], [0.8, 0.35, -0.1]],
          [12, [0.1, 1.35, 2.3], [0.4, 0.5, -0.1]]], 16),
        planos([[0, [0.54, 0.74, 0.31], [0.26, 0.63, 0]],
          [4.5, [-0.2, 1.3, 2.1], [0.3, 0.5, 0]],
          [9, [1.75, 0.75, 0.95], [1.25, 0.35, -0.2]],
          [13.5, [0.95, 0.95, 0.95], [0.24, 0.6, 0]]], 18)
      ];
      return s;
    },
    camara: camaraPieza,
    funciona: {
      dur: 16,
      subt: [[0, 'El encoder es una ruedita con ranuras, en la punta del eje del motor.'],
        [4, 'Gira con el motor. Una lucecita pasa por las ranuras y un sensor cuenta los destellos.'],
        [8, 'Cada destello viaja por un cable delgado hasta el variador, la caja que da fuerza al motor.'],
        [12, 'Así el variador sabe qué tan rápido gira el motor y lo corrige: el viaje sale suave.']],
      anim: function (t, s, K) {
        var V = [[0, 0.5], [3.5, 0.5], [4.5, 0.18], [7.6, 0.18], [8.4, 0.9], [18, 0.9]];
        var a = -K.integ(function (x) { return kf(x, V); }, t);
        encPone(s, K, a, 0, true);
        s.var.escribir('OK'); s.pulsos.correr(s.curva, -a * 0.35, t > 7.8, null);
        marca(K, [s.disco, s.cableE, s.var.g, s.conector], null);
        if (t < 4) { K.marcar(s.disco, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Encoder', [XE, Y0 - RE, 0.02]); K.rotulo('Motor', [0.1, Y0 + 0.3, 0.2], 'izq'); }
        else if (t < 8) { K.rotulo('Luz', [XE + 0.024, Y0 + RE * 0.84, 0]); K.rotulo('Ranuras', [XE, Y0 - RE * 0.6, 0.04]); K.tabla([['SENSOR', s.ve ? 'VE LUZ' : 'OSCURO', s.ve ? 'ok' : '']]); }
        else if (t < 12) { K.marcar(s.cableE, 'foco'); K.rotulo('Cable del encoder', [0.7, 0.46, 0.05], 'izq'); K.rotulo('Variador', [1.25, 0.66, -0.35]); }
        else K.tabla([['ENCODER', 'CUENTA BIEN', 'ok'], ['VARIADOR', 'SABE LA VELOCIDAD', 'ok'], ['VIAJE', 'SUAVE', 'ok']]);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: el encoder se aflojó en su eje. Su ruedita baila y se pierden destellos.'],
        [4.5, 'El variador se confunde: el motor da tirones y el ascensor se para con «error de encoder».'],
        [9, 'Falla 2: el conector del cable se soltó o el cable se peló. Tampoco llegan los avisos.'],
        [13.5, 'Arreglo: ajustar el encoder a su eje y revisar el conector y el cable, con el ascensor detenido.']],
      anim: function (t, s, K) {
        var tir = entre(t, 4.5, 9) ? Math.pow(Math.max(0, Math.sin(t * 5)), 6) * 2.2 : 0;
        var V = function (x) { return x < 4.5 ? 0.35 : x < 7.5 ? Math.pow(Math.max(0, Math.sin(x * 5)), 6) * 2.2 : x < 13.5 ? 0 : 0.7; };
        var a = -K.integ(V, t), flojo = t < 9 ? 1 : 0, suelto = entre(t, 9, 13.5) ? ph(t, 9, 9.8) : 0;
        encPone(s, K, a, flojo, true);
        s.m.g.position.x = tir > 0.3 ? Math.sin(t * 70) * 0.004 : 0;
        s.conector.position.set(1.25 - suelto * 0.0, 0.2 + suelto * 0.05, -0.22 + suelto * 0.07);
        s.pulsos.correr(s.curva, -a * 0.35, t < 9 || t >= 13.5, function (i, k) { return flojo && K.ruido(i + Math.floor(t * 3)) > 0.5; });
        var err = (t > 6.5 && t < 13.5);
        s.var.escribir(err ? 'ERROR' : 'OK', err);
        marca(K, [s.disco, s.cableE, s.var.g, s.conector], null);
        if (t < 4.5) { K.marcar(s.disco, K.parpadeo(t, 1.5) ? 'mal' : null); K.rotulo('Encoder flojo', [XE, Y0 - RE, 0.02]); K.tabla([['DESTELLOS', 'SE PIERDEN', 'mal']]); }
        else if (t < 9) { K.marcar(s.disco, 'mal'); K.tabla([['MOTOR', t < 7.5 ? 'DA TIRONES' : 'PARADO', 'mal'], ['VARIADOR', err ? 'ERROR DE ENCODER' : 'CONFUNDIDO', 'mal']]); if (err) K.aviso('Error de encoder'); }
        else if (t < 13.5) { K.marcar(s.conector, K.parpadeo(t, 1.5) ? 'mal' : null); K.rotulo('Conector suelto', [1.25, 0.25, -0.15]); K.aviso('No llegan los avisos'); }
        else { K.marcar(s.disco, 'foco'); K.aviso('Encoder firme y cable bien conectado', false); }
      }
    }
  });
  // gira el disco del encoder (ángulo a), con bamboleo si está flojo; prende el rayo cuando pasa una ranura
  function encPone(s, K, a, flojo, gira) {
    gearlessGira(s.m, a); bobinasPone(s.m, a, 0, 0);
    s.disco.rotation.set(a, flojo ? Math.sin(a * 3) * 0.12 : 0, flojo ? Math.cos(a * 3) * 0.12 : 0);
    s.disco.position.y = Y0 + (flojo ? Math.sin(a * 2) * 0.006 : 0);
    // ¿hay una ranura frente a la horquilla (arriba, theta = 90°)?
    var f = (((PI / 2 + a) / (TAU / NRAN)) % 1 + 1) % 1, ve = (f < 0.28 || f > 0.72) && !(flojo && Math.abs(Math.sin(a * 3)) > 0.5);
    s.ve = ve;
    var y = Y0 + RE * 0.84;
    s.rayoA.pon([XE + 0.022, y, 0], [XE + 0.004, y, 0]);
    s.rayoB.visible = ve; s.rayoB.pon([XE + 0.004, y, 0], [XE - 0.018, y, 0]);
    s.led.material = ve ? s.ledV : s.ledO;
  }

  // =====================================================================================
  // 4) Cables del motor: el grueso de fuerza y los delgados del encoder y del freno
  // =====================================================================================
  function curva(K, pts) { return new K.T.CatmullRomCurve3(pts.map(function (p) { return new K.T.Vector3(p[0], p[1], p[2]); })); }
  V3.escena('maq-cables-motor', ['cables_motor'], {
    fov: 36,
    construir: function (K) {
      var M = K.M, T = K.T, s = { K: K };
      K.add(K.caja(5.0, 0.08, 3.0, M.losa || M.piso, 0, -0.04, 0));
      K.add(K.caja(5.0, 2.6, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0, 1.26, -1.0));
      s.m = armarGearless(K, { corte: false }); s.m.g.position.set(0.7, 0, 0); K.add(s.m.g);
      // tablero abierto con el variador adentro
      var mGab = K.mat(0x7d8a95, { roughness: 0.6, metalness: 0.2 });
      K.add(K.caja(0.72, 1.6, 0.04, mGab, -1.4, 0.8, -0.93), K.caja(0.04, 1.6, 0.4, mGab, -1.76, 0.8, -0.75), K.caja(0.04, 1.6, 0.4, mGab, -1.04, 0.8, -0.75), K.caja(0.72, 0.04, 0.4, mGab, -1.4, 1.6, -0.75), K.caja(0.72, 0.04, 0.4, mGab, -1.4, 0.02, -0.75));
      var gp = K.grupo([K.caja(0.72, 1.6, 0.03, mGab, -0.36, 0, 0)], -1.04, 0.8, -0.55); gp.rotation.y = -1.75; K.add(gp);
      s.var = armarVariador(K, -1.4, 0.75, -0.8); K.add(s.var.g);
      // caja de bornes al frente del motor, con tapa que se abre hacia abajo
      s.caja = K.add(K.caja(0.2, 0.16, 0.08, s.m.mCarcasa, 0.7, 0.52, 0.38));
      s.tapa = K.add(K.grupo([K.caja(0.21, 0.17, 0.012, M.aceroOsc, 0, 0.085, 0)], 0.7, 0.435, 0.426));
      s.bornes = [-0.055, 0, 0.055].map(function (dx) { return K.add(K.cil(0.016, 0.03, M.cobre, 0.7 + dx, 0.53, 0.43, 'z', 6)); });
      // filo de metal (un ángulo de fierro) por donde pasa el cable grueso
      s.filo = K.add(K.grupo([K.caja(0.05, 0.005, 0.5, M.aceroOsc, 0, 0.05, 0), K.caja(0.005, 0.05, 0.5, M.aceroOsc, 0.0225, 0.025, 0)], -0.2, 0, 0.3));
      // recorridos: el grueso por adelante, los delgados por atrás (separados)
      s.cF = curva(K, [[-1.25, 0.75, -0.72], [-1.15, 0.1, -0.6], [-0.9, 0.04, 0.2], [-0.2, 0.072, 0.32], [0.3, 0.04, 0.48], [0.6, 0.04, 0.5], [0.7, 0.2, 0.47], [0.7, 0.42, 0.41]]);
      s.cE = curva(K, [[-1.5, 0.75, -0.72], [-1.5, 0.06, -0.62], [-0.6, 0.03, -0.52], [0.9, 0.03, -0.52], [1.25, 0.05, -0.3], [1.25, Y0, 0], [1.21, Y0, 0]]);
      s.cB = curva(K, [[-1.3, 0.75, -0.72], [-1.3, 0.05, -0.65], [-0.6, 0.06, -0.6], [0.43, 0.06, -0.6], [0.43, Y0 + 0.25, -0.3], [0.43, Y0 + 0.25, -0.16]]);
      s.mF = K.mat(0xd9622b, { roughness: 0.55 });
      s.tF = K.add(new T.Mesh(new T.TubeGeometry(s.cF, 90, 0.02, 10, false), s.mF));
      s.tE = K.add(new T.Mesh(new T.TubeGeometry(s.cE, 80, 0.007, 8, false), K.mat(0x8e979f)));
      s.tB = K.add(new T.Mesh(new T.TubeGeometry(s.cB, 80, 0.007, 8, false), K.mat(0x2e5f90)));
      s.cobre = K.add(K.cil(0.0225, 0.09, K.mat(0xd98a3a, { metalness: 0.7, roughness: 0.25, emissive: 0x4a2000 }), -0.2, 0.074, 0.32, 'x', 12)); s.cobre.rotation.set(0, -0.42, PI / 2);
      s.pF = K.add(pulsos(K, 14, 0xffc62b, 0.024)); s.pE = K.add(pulsos(K, 12, 0x3ccf7f, 0.011)); s.pB = K.add(pulsos(K, 10, 0x5aa8ff, 0.011));
      s.chispas = K.add(K.chispas(16)); s.chispas.visible = false; s.humo = K.add(ondas(K, 0xff7a2a));
      s.cams = [
        planos([[0, [0.1, 1.75, 2.9], [-0.25, 0.5, -0.1]],
          [4, [-0.6, 0.85, 1.75], [-0.1, 0.2, 0.25], [0.2, 0.9, 1.7]],
          [8, [2.0, 1.2, 1.3], [0.95, 0.5, -0.2]],
          [12, [-0.3, 2.9, 2.2], [-0.2, 0.15, -0.1]]], 16),
        planos([[0, [0.1, 0.42, 0.95], [-0.2, 0.08, 0.32]],
          [4.5, [-0.4, 1.6, 2.7], [-0.4, 0.4, -0.1]],
          [9, [1.0, 0.75, 1.25], [0.7, 0.5, 0.4]],
          [13.5, [0.1, 1.75, 2.9], [-0.25, 0.5, -0.1]]], 18)
      ];
      return s;
    },
    camara: camaraPieza,
    funciona: {
      dur: 16,
      subt: [[0, 'Del tablero al motor van varios cables, y cada uno tiene su trabajo.'],
        [4, 'El cable grueso lleva la fuerza: la corriente que hace girar el motor.'],
        [8, 'Los delgados llevan avisos: uno cuenta las vueltas (el encoder) y otro abre el freno.'],
        [12, 'El grueso y los delgados van por caminos separados, para no meterse ruido entre ellos.']],
      anim: function (t, s, K) {
        var a = -t * 0.9;
        gearlessGira(s.m, a); bobinasPone(s.m, a, 0, 0);
        s.pF.correr(s.cF, t * 0.18, true); s.pE.correr(s.cE, -t * 0.22, t >= 8); s.pB.correr(s.cB, t * 0.2, t >= 8);
        s.var.escribir('OK'); s.cobre.visible = false; s.chispas.visible = false; s.humo.visible = false;
        s.tapa.rotation.x = 0;
        marca(K, [s.tF, s.tE, s.tB, s.bornes, s.caja], null);
        if (t < 4) { K.rotulo('Tablero', [-1.4, 1.3, -0.6]); K.rotulo('Motor', [0.7, Y0 + 0.3, 0.3]); K.rotulo('Caja de bornes', [0.78, 0.52, 0.43]); }
        else if (t < 8) { K.marcar(s.tF, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Cable de fuerza', [-0.5, 0.06, 0.28], 'izq'); }
        else if (t < 12) { K.rotulo('Encoder', [1.25, Y0 + 0.02, 0], 'izq'); K.rotulo('Freno', [0.43, Y0 + 0.27, -0.18]); K.marcar([s.tE, s.tB], K.parpadeo(t, 1) ? 'foco' : null); }
        else { K.rotulo('Fuerza', [-0.5, 0.06, 0.28]); K.rotulo('Avisos', [-0.6, 0.05, -0.56], 'izq'); }
        K.tabla([['FUERZA', 'AL MOTOR', 'ac'], ['ENCODER', t >= 8 ? 'CUENTA' : '—', t >= 8 ? 'ok' : ''], ['FRENO', t >= 8 ? 'ABIERTO' : '—', t >= 8 ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: el forro del cable grueso se peló contra un filo de metal.'],
        [4.5, 'El cobre toca el metal: el variador se apaga, marca «fuga a tierra» y el motor se para.'],
        [9, 'Falla 2: un borne flojo en la caja del motor calienta con cada arranque y se quema.'],
        [13.5, 'Arreglo: cortar la energía y esperar unos minutos (el variador guarda carga). Cambiar el cable y ajustar bornes.']],
      anim: function (t, s, K) {
        var para = entre(t, 5, 9), a = -K.integ(function (x) { return x < 5 ? 0.9 : x < 9 ? kf(x, [[5, 0.9], [5.6, 0]]) : x < 13.5 ? 0.9 : 0.6; }, t);
        gearlessGira(s.m, a); bobinasPone(s.m, a, 0, 0);
        var falla1 = t < 9, falla2 = entre(t, 9, 13.5);
        s.cobre.visible = falla1;
        s.chispas.emitir(t, [-0.2, 0.08, 0.32], falla1 && (t % 1.6) < 1.0, 0.12);
        s.pF.correr(s.cF, t * 0.18, !para); s.pE.correr(s.cE, -t * 0.22, !para); s.pB.correr(s.cB, t * 0.2, !para);
        s.tapa.rotation.x = t >= 9 ? PI * 0.62 * ph(t, 9, 9.8) : 0;
        s.humo.poner(t, [0.7, 0.53, 0.46], falla2, 0.07);
        s.var.escribir(t > 5 && t < 9 ? 'FUGA' : falla2 && t > 11.5 ? 'FALLA' : 'OK', (t > 5 && t < 9) || (falla2 && t > 11.5));
        marca(K, [s.tF, s.tE, s.tB, s.bornes, s.caja], null);
        if (falla1) { K.marcar(s.tF, K.parpadeo(t, 1.5) ? 'mal' : null); K.rotulo('Forro pelado: se ve el cobre', [-0.2, 0.1, 0.32]); if (t > 4.5) { K.aviso('Fuga a tierra: motor parado'); K.rotulo('Variador', [-1.4, 1.3, -0.69], 'izq'); } }
        else if (falla2) { K.marcar(s.bornes[1], 'mal'); K.rotulo('Borne flojo', [0.7, 0.55, 0.45]); K.tabla([['BORNE', 'CALIENTE', 'mal']]); if (t > 11.5) K.aviso('Borne quemado'); }
        else { K.aviso('Cable nuevo y bornes ajustados', false); K.marcar(s.tF, 'foco'); }
      }
    }
  });

  // =====================================================================================
  // 5) Amarres: cuña, varilla, resorte, tuercas y pasador encima de la cabina
  // =====================================================================================
  S.amarres = {
    que: 'Son las puntas donde se sujeta cada cable: una pieza con cuña, una varilla, un resorte y tuercas.',
    sirve: 'Sujetan el cable a la cabina o al contrapeso. El resorte aguanta los tirones y la tuerca iguala la fuerza.',
    falla: 'Si los resortes quedan a distinta altura, un cable carga de más, la cabina vibra y la polea se gasta.',
    arreglo: 'Con la tuerca se igualan todos los resortes y se ponen contratuerca y pasador. Con la cabina asegurada.'
  };
  var XA = [-0.165, -0.055, 0.055, 0.165], LR = 0.13;
  function armarAmarres(K) {
    var M = K.M, T = K.T, s = { K: K };
    K.add(K.caja(1.4, 0.05, 1.3, M.inox, 0, -0.52, 0));
    K.add(K.caja(1.3, 0.14, 0.16, M.aceroOsc, 0, -0.42, 0));
    [-1, 1].forEach(function (l) { K.add(K.caja(0.05, 0.37, 0.1, M.aceroOsc, l * 0.3, -0.19, 0)); });
    s.placa = K.add(K.caja(0.66, 0.025, 0.16, M.aceroOsc, 0, 0, 0));
    K.add(K.caja(3.2, 3.4, 0.05, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0, 0.4, -0.75));
    s.marcas = K.add(new T.Group());
    for (var i = 0; i < 10; i++) s.marcas.add(K.caja(0.16, 0.03, 0.03, M.aceroOsc, 0.82, -1.5 + i * 0.4, -0.71), K.caja(0.04, 0.4, 0.05, M.acero, 0.82, -1.5 + i * 0.4, -0.67));
    var vidrio = K.mat(0x9fb0bf, { transparent: true, opacity: 0.38, depthWrite: false, metalness: 0.3, roughness: 0.3 });
    s.mCable = K.mat(0x4b525a, { metalness: 0.55, roughness: 0.4 });
    s.t = XA.map(function (x) {
      var a = { x: x, mov: new T.Group() }; K.add(a.mov); a.mov.position.x = x;
      a.tuercas = [K.cil(0.018, 0.016, M.acero, 0, 0, 0, null, 6), K.cil(0.018, 0.014, M.acero, 0, -0.018, 0, null, 6)];
      a.mov.add(a.tuercas[0], a.tuercas[1]);
      a.arandela = K.cil(0.03, 0.006, M.acero, 0, 0.012, 0, null, 20); a.mov.add(a.arandela);
      a.pasador = K.toro(0.009, 0.0022, M.cobre, 0, -0.036, 0); a.pasador.rotation.y = PI / 2; a.mov.add(a.pasador);
      a.varilla = K.cil(0.008, 0.34, M.acero, 0, 0.12, 0, null, 10); a.mov.add(a.varilla);
      // terminal de cuña: cuerpo transparente, cuña oscura y el cable que la abraza
      a.cuerpo = new T.Mesh(new T.CylinderGeometry(0.017, 0.03, 0.13, 20), vidrio); a.cuerpo.position.y = 0.355; a.mov.add(a.cuerpo);
      a.ojo = K.toro(0.014, 0.005, M.aceroOsc, 0, 0.29, 0); a.mov.add(a.ojo);
      a.cuna = K.cono(0.015, 0.075, M.hierro, 0, 0.36, 0); a.mov.add(a.cuna);
      var lazo = K.toro(0.019, 0.0065, s.mCable, 0, 0.33, 0, PI); lazo.rotation.z = PI; a.cuna.userData.lazo = lazo; a.mov.add(lazo);
      a.mov.add(K.cil(0.0065, 0.09, s.mCable, -0.012, 0.37, 0, null, 8), K.cil(0.0065, 0.2, s.mCable, 0.012, 0.42, 0, null, 8));
      a.mov.add(K.caja(0.04, 0.014, 0.022, M.aceroOsc, 0, 0.5, 0));
      a.resorte = K.add(K.resorte(0.024, 1, 6, 0.0045, M.cobre)); a.resorte.position.x = x;
      a.cable = []; for (var j = 0; j < 5; j++) a.cable.push(K.add(K.cable(0.0065, s.mCable)));
      return a;
    });
    // llave para ajustar la tuerca
    s.llave = new T.Group(); K.add(s.llave);
    var boca = K.toro(0.026, 0.006, M.rojo, 0, 0, 0, PI * 1.45); boca.rotation.x = PI / 2; boca.rotation.z = PI * 0.28; s.llave.add(boca);
    s.llave.add(K.caja(0.022, 0.012, 0.2, M.rojo, 0, 0, 0.125));
    s.linea = K.add(K.caja(0.46, 0.004, 0.004, K.matB(0xf2b705), 0, 0, 0.04));
    s.flecha = K.add(K.flecha(0xf2b705, 0.008));
    s.ondas = K.add(ondas(K));
    return s;
  }
  // pone los amarres: L = largo de cada resorte, bajaT = cuánto bajó cada tuerca floja, sin = pasadores que faltan, bow = cable flojo
  function amarresPone(s, K, o) {
    var vib = o.vib ? Math.sin(o.t * 50) * o.vib : 0;
    s.marcas.position.y = -((o.viaje || 0) % 0.4);
    s.t.forEach(function (a, k) {
      var L = o.L[k], yb = -0.0125 - L, yn = yb - 0.015 - (o.bajaT ? o.bajaT[k] : 0) + vib;
      a.mov.position.y = yn + (o.bajaT ? o.bajaT[k] : 0);
      a.tuercas[0].position.y = -(o.bajaT ? o.bajaT[k] : 0); a.tuercas[1].position.y = -0.018 - (o.bajaT ? o.bajaT[k] : 0) * 1.4;
      a.tuercas[0].rotation.y = (o.giroT && o.giroT[k]) || 0; a.tuercas[1].rotation.y = a.tuercas[0].rotation.y;
      a.pasador.visible = !(o.sin && o.sin[k]);
      a.cuna.position.y = 0.36 - (o.cunaBaja || 0); a.cuna.userData.lazo.position.y = 0.33 - (o.cunaBaja || 0);
      a.resorte.position.y = yb + vib; a.resorte.scale.y = L;
      var top = a.mov.position.y + 0.42, bow = o.bow && o.bow[0] === k ? o.bow[1] : 0;
      for (var j = 0; j < 5; j++) {
        var u0 = j / 5, u1 = (j + 1) / 5;
        a.cable[j].pon([a.x + 0.012 + bow * Math.sin(PI * u0), top + (1.4 - top) * u0, 0], [a.x + 0.012 + bow * Math.sin(PI * u1), top + (1.4 - top) * u1, 0]);
      }
    });
  }
  V3.escena('maq-amarres', ['amarres'], {
    fov: 34,
    construir: function (K) {
      var s = armarAmarres(K);
      s.cams = [
        planos([[0, [0.55, 0.42, 0.95], [0, 0.03, 0]],
          [4, [0.14, 0.28, 0.4], [-0.05, 0.2, 0]],
          [8.5, [0.32, -0.02, 0.62], [0, -0.1, 0]],
          [13, [0.25, 0.02, 0.62], [0.06, -0.12, 0]]], 17),
        planos([[0, [0.45, 0.3, 0.85], [0, -0.02, 0]],
          [4.5, [0.75, 0.45, 1.15], [0, 0.05, 0]],
          [9, [0.12, -0.08, 0.42], [-0.055, -0.17, 0]],
          [13.5, [0.5, 0.22, 0.85], [0, -0.03, 0]]], 18)
      ];
      return s;
    },
    camara: camaraPieza,
    funciona: {
      dur: 17,
      subt: [[0, 'Encima de la cabina terminan los cables. Cada cable tiene su amarre.'],
        [4, 'El cable entra en una pieza con cuña: mientras más jala, más se aprieta.'],
        [8.5, 'Abajo hay un resorte y dos tuercas. Cuando la cabina arranca, el resorte aguanta el tirón.'],
        [13, 'Con la tuerca se iguala la fuerza: todos los resortes deben quedar a la misma altura.']],
      anim: function (t, s, K) {
        var tiron = entre(t, 9.5, 12.5) ? Math.exp(-(t - 9.5) * 1.6) * Math.sin((t - 9.5) * 12) * 0.018 : 0;
        var ajuste = ph(t, 13.8, 16), L = [LR, LR, LR + 0.025 * (1 - ajuste), LR].map(function (l) { return l - tiron - (entre(t, 9.5, 17) ? 0.008 : 0); });
        var viaje = K.integ(function (x) { return x < 9.5 ? 0 : kf(x, [[9.5, 0], [10.5, 0.6], [17, 0.6]]); }, t);
        amarresPone(s, K, { t: t, L: L, viaje: viaje, cunaBaja: 0.008 * ph(t, 4.5, 6.5), giroT: [0, 0, (t > 13.8 ? ajuste * 9 : 0), 0] });
        marca(K, [s.t.map(function (a) { return a.resorte; }), s.t.map(function (a) { return a.cuna; }), s.t.map(function (a) { return a.tuercas; })], null);
        var enLlave = entre(t, 13.3, 16.6);
        s.llave.visible = enLlave;
        if (enLlave) { var a2 = s.t[2]; s.llave.position.set(a2.x, a2.mov.position.y, 0); s.llave.rotation.y = -0.5 + ((ajuste * 9) % 1.2); }
        s.linea.visible = t >= 13; s.linea.position.y = -0.0125 - LR + 0.008 - 0.012;
        s.flecha.visible = entre(t, 4, 8.5);
        if (s.flecha.visible) { var y1 = s.t[1].mov.position.y + 0.43; s.flecha.apuntar([XA[1] - 0.035, y1, 0.02], [XA[1] - 0.035, y1 + 0.1, 0.02]); }
        s.ondas.visible = false;
        if (t < 4) { K.rotulo('Cable', [XA[0] + 0.012, 0.75, 0], 'izq'); K.rotulo('Amarre', [XA[3], 0.1, 0]); }
        else if (t < 8.5) { K.marcar(s.t[1].cuna, 'foco'); K.rotulo('Cuña', [XA[1], s.t[1].mov.position.y + 0.36, 0.02], 'izq'); K.rotulo('El cable jala', [XA[1] - 0.035, s.t[1].mov.position.y + 0.53, 0.02], 'izq'); }
        else if (t < 13) { K.marcar(s.t.map(function (a) { return a.resorte; }), tiron !== 0 ? 'foco' : null); K.rotulo('Resorte', [XA[0], -0.08, 0.03], 'izq'); K.rotulo('Tuercas', [XA[3], s.t[3].mov.position.y, 0.02]); K.tabla([['CABINA', viaje > 0.01 ? 'ARRANCÓ' : 'QUIETA', viaje > 0.01 ? 'ac' : ''], ['RESORTES', tiron !== 0 ? 'AGUANTAN EL TIRÓN' : 'CARGADOS', tiron !== 0 ? 'ac' : 'ok']]); }
        else { K.marcar(s.t[2].tuercas, 'foco'); K.rotulo(ajuste < 1 ? 'Se ajusta la tuerca' : 'Todos iguales', [XA[2], s.t[2].mov.position.y - 0.02, 0.03]); }
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: los resortes quedaron disparejos. Uno está aplastado y otro casi suelto.'],
        [4.5, 'Un cable carga de más y otro casi nada: la cabina vibra y la polea se gasta dispareja.'],
        [9, 'Falla 2: una tuerca se aflojó y le falta el pasador. Al arrancar suena un «clac».'],
        [13.5, 'Arreglo: igualar los resortes con las tuercas y poner contratuerca y pasador. Con la cabina asegurada.']],
      anim: function (t, s, K) {
        var f1 = t < 9, f2 = entre(t, 9, 13.5), L, baja = [0, 0, 0, 0], sin = [false, false, false, false], vib = 0, bow = null, viaje = 0;
        if (f1) { L = [0.082, LR, 0.178, LR]; bow = [2, 0.03]; if (t > 4.5) { vib = 0.003; viaje = (t - 4.5) * 0.6; } }
        else if (f2) {
          var clac = (t > 10.5 && t < 10.8) || (t > 12.3 && t < 12.6);
          baja[1] = 0.025 * ph(t, 9.3, 10.4); L = [LR, LR + baja[1] * 0.8, LR, LR]; sin[1] = true; vib = clac ? 0.006 : 0;
        } else L = [LR, LR, LR, LR];
        amarresPone(s, K, { t: t, L: L, bajaT: baja, sin: sin, vib: vib, bow: bow, viaje: viaje, giroT: [0, f2 ? -baja[1] * 120 : 0, 0, 0] });
        marca(K, [s.t.map(function (a) { return a.resorte; }), s.t.map(function (a) { return a.cuna; }), s.t.map(function (a) { return a.tuercas; })], null);
        s.llave.visible = false; s.flecha.visible = false; s.linea.visible = !f2; s.linea.position.y = -0.0125 - LR - 0.004;
        s.ondas.poner(t, [XA[1], s.t[1].mov.position.y - 0.02, 0.05], f2 && ((t > 10.5 && t < 11.4) || (t > 12.3 && t < 13.2)), 0.07);
        if (f1) {
          K.marcar([s.t[0].resorte, s.t[2].resorte], K.parpadeo(t, 1) ? 'mal' : null);
          K.rotulo('Aplastado', [XA[0], -0.06, 0.03], 'izq'); K.rotulo('Casi suelto', [XA[2] + 0.02, -0.1, 0.03]);
          if (t > 4.5) { K.aviso('La cabina vibra'); K.tabla([['CABLE 1', 'CARGA DE MÁS', 'mal'], ['CABLE 3', 'FLOJO', 'mal']]); }
        } else if (f2) {
          K.marcar(s.t[1].tuercas, K.parpadeo(t, 1.5) ? 'mal' : null);
          K.rotulo('Tuerca floja', [XA[1] - 0.02, s.t[1].mov.position.y - 0.03, 0.02], 'izq'); K.rotulo('Falta pasador', [XA[1], s.t[1].mov.position.y - 0.065, 0.01]);
          if ((t > 10.5 && t < 11.4) || (t > 12.3 && t < 13.2)) K.aviso('¡Clac!');
        } else { K.marcar(s.t.map(function (a) { return a.resorte; }), 'foco'); K.aviso('Resortes parejos, con pasador', false); }
      }
    }
  });

  // =====================================================================================
  // 6) Cintas planas 2:1 (sin cuarto de máquinas): poleas bajo la cabina y monitor de fajas
  // =====================================================================================
  S.poleas_cabina = {
    que: 'Son dos ruedas debajo del piso de la cabina, por donde pasan las cintas planas.',
    sirve: 'La cabina se sienta sobre las cintas como en un columpio. Así la máquina carga la mitad del peso.',
    falla: 'Si su rodamiento se gasta, zumba debajo del piso. Si la cinta se corre de lado, chirría y bota polvillo.',
    arreglo: 'Se cambia el rodamiento y se alinean la polea y la cinta, con la cabina asegurada.'
  };
  S.monitor_fajas = {
    que: 'Es una cajita con luces, arriba del hueco, conectada a las puntas de las cintas planas.',
    sirve: 'Revisa todo el tiempo los hilos de acero que van escondidos dentro de las cintas.',
    falla: 'Si un hilo se corta por dentro o una cinta se afloja, saca al ascensor de servicio.',
    arreglo: 'Se revisan y se cambian todas las cintas juntas. El monitor nunca se anula para seguir trabajando.'
  };
  var F = { YH: 4.8, RC: 0.07, XC: 0.62, RS: 0.05, XS: 0.74, YS: 4.85, RW: 0.08, XW: 0.87, SUMA: 5.0, ZB: [-0.045, 0, 0.045], ANCHO: 0.03, GR: 0.004 };
  function caminoFajas(yc, dz) {
    var yp = yc - 0.12, ycp = F.SUMA - yc, rc = F.RC + F.GR / 2, rs = F.RS + F.GR / 2, rw = F.RW + F.GR / 2;
    return camino([
      { l: [-F.XC - rc, F.YH, -F.XC - rc, yp] },
      { c: [-F.XC, yp], r: rc, a0: PI, a1: 1.5 * PI },
      { l: [-F.XC, yp - rc, F.XC, yp - rc] },
      { c: [F.XC, yp], r: rc, a0: 1.5 * PI, a1: TAU },
      { l: [F.XC + rc, yp, F.XC + rc, F.YS] },
      { c: [F.XS, F.YS], r: rs, a0: PI, a1: 0 },
      { l: [F.XS + rs, F.YS, F.XS + rs, ycp] },
      { c: [F.XW, ycp], r: rw, a0: PI, a1: TAU },
      { l: [F.XW + rw, ycp, F.XW + rw, F.YH] }
    ]);
  }
  function armarFajas(K) {
    var M = K.M, T = K.T, s = { K: K }, i;
    K.add(K.caja(3.0, 0.06, 2.0, M.losa || M.piso, 0.1, -0.03, -0.05));
    K.add(K.caja(3.0, 5.6, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0.1, 2.8, -0.95));
    // cabina transparente (para ver las cintas detrás); no tiene cables arriba: cuelga de las cintas de abajo
    s.cab = K.add(new T.Group());
    var mVid = K.mat(0xc9d2da, { transparent: true, opacity: 0.38, depthWrite: false, metalness: 0.3, roughness: 0.35 });
    s.cab.add(K.caja(1.2, 2.2, 1.4, mVid, 0, 1.1, 0));
    [[-0.6, 0.7], [0.6, 0.7], [-0.6, -0.7], [0.6, -0.7]].forEach(function (p) { s.cab.add(K.caja(0.03, 2.2, 0.03, M.aceroOsc, p[0], 1.1, p[1])); });
    s.cab.add(K.caja(1.22, 0.03, 1.42, M.aceroOsc, 0, 2.2, 0));
    s.cab.add(K.caja(1.36, 0.08, 0.3, M.aceroOsc, 0, -0.05, 0));
    s.poleas = [-1, 1].map(function (l) {
      var p = poleaCanales(K, F.RC, 0.15, 3, M.acero, M.hierro); p.position.set(l * F.XC, -0.12, 0); s.cab.add(p);
      [-1, 1].forEach(function (zz) { s.cab.add(K.caja(0.05, 0.12, 0.012, M.aceroOsc, l * F.XC, -0.07, zz * 0.095)); });
      p.flancos = [K.cil(F.RC + 0.02, 0.006, M.aceroOsc, 0, 0, 0.077, 'z', 30), K.cil(F.RC + 0.02, 0.006, M.aceroOsc, 0, 0, -0.077, 'z', 30)];
      p.add(p.flancos[0], p.flancos[1]);
      return p;
    });
    // máquina arriba a la derecha (polea chiquita) y su base
    K.add(K.caja(0.36, 0.3, 0.3, K.mat(0x2f6e58, { roughness: 0.5, metalness: 0.25 }), F.XS, F.YS, -0.27));
    K.add(K.caja(0.5, 0.06, 0.6, M.hierro, F.XS, F.YS - 0.2, -0.2));
    s.polea = poleaCanales(K, F.RS, 0.15, 3, M.acero, M.hierro); s.polea.position.set(F.XS, F.YS, 0); K.add(s.polea);
    // contrapeso con su polea arriba
    s.cw = K.add(new T.Group());
    s.cw.add(K.caja(0.16, 1.3, 0.7, M.pesa, 0, -0.8, 0));
    for (i = 0; i < 6; i++) s.cw.add(K.caja(0.17, 0.012, 0.71, M.pesa2, 0, -1.4 + i * 0.2, 0));
    [-1, 1].forEach(function (zz) { s.cw.add(K.caja(0.2, 0.3, 0.02, M.aceroOsc, 0, -0.1, zz * 0.1)); });
    s.poleaCw = poleaCanales(K, F.RW, 0.15, 3, M.acero, M.hierro); s.cw.add(s.poleaCw);
    // amarres fijos arriba: a la izquierda con el monitor; a la derecha, otro amarre
    [-F.XC - F.RC, F.XW + F.RW].forEach(function (x) { K.add(K.caja(0.16, 0.06, 1.0, M.hierro, x, 5.0, -0.45)); });
    s.amarre = F.ZB.map(function (z) {
      var a = { z: z };
      a.grapa = K.add(K.caja(0.05, 0.11, 0.036, M.aceroOsc, -F.XC - F.RC, F.YH + 0.055, z));
      a.varilla = K.add(K.cil(0.005, 0.32, M.acero, -F.XC - F.RC, 5.0, z, null, 8));
      a.resorte = K.add(K.resorte(0.014, 1, 5, 0.0035, M.cobre)); a.resorte.position.set(-F.XC - F.RC, 5.03, z);
      a.tuerca = K.add(K.cil(0.012, 0.012, M.acero, -F.XC - F.RC, 5.12, z, null, 6));
      a.cola = K.add(cintaRecta(K, F.ANCHO, F.GR, M.cinta)); a.cola.pon([-F.XC - F.RC - 0.026, F.YH + 0.09, z], [-F.XC - F.RC - 0.17, F.YH + 0.05, z]);
      a.clip = K.add(K.caja(0.03, 0.022, 0.04, K.mat(0xd03a2c), -F.XC - F.RC - 0.14, F.YH + 0.058, z)); a.clip.rotation.z = 0.27;
      return a;
    });
    [-F.XC - F.RC + 0.0, F.XW + F.RW].forEach(function () {});
    F.ZB.forEach(function (z) { K.add(K.caja(0.05, 0.11, 0.036, M.aceroOsc, F.XW + F.RW, F.YH + 0.055, z)); });
    // monitor y su cable a cada clip
    s.monitor = K.add(K.caja(0.16, 0.11, 0.05, K.mat(0x30353a), -1.02, 5.0, 0.0));
    s.mLedV = K.matB(0x3ccf7f); s.mLedR = K.matB(0xff3b30); s.mLedO = K.matB(0x2a3036);
    s.ledM = [K.add(K.esfera(0.011, s.mLedV, -1.06, 5.02, 0.028)), K.add(K.esfera(0.011, s.mLedO, -1.02, 5.02, 0.028)), K.add(K.esfera(0.011, s.mLedO, -0.98, 5.02, 0.028))];
    s.cartelM = K.cartel('MONITOR', 0.14, 0.03, '#30353a', '#cdd3d8'); s.cartelM.position.set(-1.02, 4.97, 0.027); K.add(s.cartelM);
    s.alambres = F.ZB.map(function (z) { return K.add(K.tubo([[-0.96, 4.95, 0.01], [-0.9, 4.9, z * 0.6], [-F.XC - F.RC - 0.14, F.YH + 0.07, z]], 0.003, K.mat(0xd9622b))); });
    // interruptor de cinta floja: barra sobre las tuercas y su micro
    s.barra = K.add(K.caja(0.02, 0.008, 0.15, M.amarillo, -F.XC - F.RC, 5.135, 0));
    s.micro = K.add(K.caja(0.04, 0.035, 0.03, M.negro, -F.XC - F.RC, 5.15, 0.1));
    s.ledS = K.add(K.esfera(0.008, s.mLedV, -F.XC - F.RC, 5.175, 0.1));
    // cintas
    s.cintas = new T.Group(); K.add(s.cintas);
    var nSeg = 9;
    s.tiras = F.ZB.map(function (z) {
      var tr = { z: z, rectas: [], arcos: [] };
      for (var j = 0; j < 5; j++) { var c = cintaRecta(K, F.ANCHO, F.GR, M.cinta); s.cintas.add(c); tr.rectas.push(c); }
      tr.arcos = [cintaArco(K, F.RC + F.GR / 2, F.ANCHO, PI, 1.5 * PI, M.cinta), cintaArco(K, F.RC + F.GR / 2, F.ANCHO, 1.5 * PI, TAU, M.cinta), cintaArco(K, F.RS + F.GR / 2, F.ANCHO, 0, PI, M.cinta), cintaArco(K, F.RW + F.GR / 2, F.ANCHO, PI, TAU, M.cinta)];
      tr.arcos.forEach(function (a) { s.cintas.add(a); a.position.z = z; });
      return tr;
    });
    s.mPint = K.matB(0xf4f1e6);
    s.marcas = []; for (i = 0; i < 18; i++) s.marcas.push(K.add(cintaRecta(K, 0.135, 0.007, s.mPint)));
    // lupa con los hilos de acero de adentro y la corrientita
    s.lupa = K.add(lupa(K, 0.17)); K.add(s.lupa.linea);
    var tira = new T.Group(); s.lupa.dentro.add(tira); s.tira = tira;
    tira.add(K.caja(0.27, 0.09, 0.012, K.mat(0x30353a, { transparent: true, opacity: 0.45, depthWrite: false }), 0, 0, 0));
    s.hilos = []; s.corr = [];
    var mHilo = K.mat(0xb3bcc4, { metalness: 0.6, roughness: 0.35 }), mCorr = K.matB(0xffc62b);
    for (i = 0; i < 6; i++) {
      var y = -0.0375 + i * 0.015, h1 = K.cil(0.0035, 0.27, mHilo, 0, y, 0, 'x', 8);
      tira.add(h1); s.hilos.push(h1);
      for (var q = 0; q < 2; q++) { var e = K.esfera(0.006, mCorr, 0, y, 0.004); tira.add(e); s.corr.push({ o: e, h: i, k: q }); }
    }
    s.corte = K.caja(0.012, 0.012, 0.012, K.matB(0xff3b30), 0.02, -0.0375 + 2 * 0.015, 0.003); tira.add(s.corte);
    s.ondas = K.add(ondas(K)); s.polvo = K.add(polvo(K, 12, 0x3a3a3a)); s.chispas = K.add(K.chispas(12)); s.chispas.visible = false;
    s.q = [0, 0, 0, 0, 0, 0];
    s.marcables = [s.cab, s.cw, s.cintas, s.polea, s.monitor, s.barra, s.micro, s.marcas];
    return s;
  }
  // o: yc, dz (cinta corrida), flojo (cinta floja: índice), hiloRoto, vibra
  function fajasPone(s, K, o) {
    marca(K, s.marcables, null);
    s.lupa.visible = s.lupa.linea.visible = false;
    var yc = o.yc, cm = caminoFajas(yc), q = s.q, ycp = F.SUMA - yc, u = yc - 0.6;
    var sh = o.vibra ? Math.sin(o.t * 57) * o.vibra : 0;
    s.cab.position.set(0, yc, 0); s.cw.position.set(F.XW, ycp, 0);
    s.poleas.forEach(function (p, i) { p.rueda.rotation.z = u / F.RC; p.position.y = -0.12 + (i === 1 ? sh : 0); });
    s.polea.rueda.rotation.z = -2 * u / F.RS; s.poleaCw.rueda.rotation.z = u / F.RW;
    s.tiras.forEach(function (tr, k) {
      var z = tr.z + (o.dz || 0) * (k === 2 ? 1 : 1), sg = cm.segs, flojo = o.flojo === k ? 0.05 : 0;
      var r0 = sg[0].l, r2 = sg[2].l, r4 = sg[4].l, r6 = sg[6].l, r8 = sg[8].l;
      tr.rectas[0].pon([r0[0] + flojo * 0.0, r0[1], z], [r0[2], r0[3], z]);
      tr.rectas[1].pon([r2[0], r2[1], z], [r2[2], r2[3], z]);
      tr.rectas[2].pon([r4[0], r4[1], z], [r4[2], r4[3], z]);
      tr.rectas[3].pon([r6[0], r6[1], z], [r6[2], r6[3], z]);
      tr.rectas[4].pon([r8[0], r8[1], z], [r8[2], r8[3], z]);
      tr.arcos[0].position.set(-F.XC, yc - 0.12, z); tr.arcos[1].position.set(F.XC, yc - 0.12 + sh, z);
      tr.arcos[2].position.set(F.XS, F.YS, z); tr.arcos[3].position.set(F.XW, ycp, z);
    });
    s.marcas.forEach(function (mk, i) {
      var sm = 0.3 + i * 0.62; enCamino(cm, sm, q); mk.visible = sm < cm.L - 0.05;
      mk.pon([q[0] - q[2] * 0.012, q[1] - q[3] * 0.012, (o.dz || 0)], [q[0] + q[2] * 0.012, q[1] + q[3] * 0.012, (o.dz || 0)]);
    });
    // amarre izquierdo: si una cinta está floja, su resorte se estira y su tuerca sube y levanta la barra
    var sube = 0;
    s.amarre.forEach(function (a, k) {
      var fl = o.flojo === k ? 0.035 : 0; sube = Math.max(sube, fl);
      a.resorte.scale.y = 0.075 + fl; a.tuerca.position.y = 5.03 + 0.075 + fl + 0.006;
      a.grapa.position.y = F.YH + 0.055 + fl; a.varilla.position.y = 5.0 + fl;
    });
    s.barra.position.y = 5.118 + sube; s.barra.rotation.x = sube ? 0.2 : 0;
    s.ledS.material = sube ? s.mLedR : s.mLedV; s.ledS.position.y = 5.175;
    var malo = o.hiloRoto || sube;
    s.ledM[0].material = malo ? s.mLedO : s.mLedV; s.ledM[2].material = malo ? (K.parpadeo(o.t, 2) ? s.mLedR : s.mLedO) : s.mLedO;
    s.ledM[1].material = K.parpadeo(o.t, 1.5) ? s.mLedV : s.mLedO;
    // corrientita por los hilos de la lupa
    s.corte.visible = !!o.hiloRoto; s.hilos[2].material = o.hiloRoto ? s.corte.material : s.hilos[0].material;
    s.corr.forEach(function (c) {
      var x = ((o.t * 0.18 + c.k * 0.5 + c.h * 0.13) % 1) * 0.27 - 0.135;
      c.o.position.x = x; c.o.visible = !(o.hiloRoto && c.h === 2 && x > 0.02);
    });
    s.ondas.visible = false; s.polvo.visible = false; s.chispas.visible = false;
    return cm;
  }
  // ponerLupa también sirve aquí (usa s.lupa y la cámara del plano)
  var GF = {
    poleas_cabina: {
      f: [[0, 'Debajo de la cabina van dos poleas. Las cintas pasan por debajo, como un columpio.'],
        [4, 'Las cintas bajan de un amarre fijo arriba, pasan bajo la cabina y suben a la máquina.'],
        [8.5, 'Cuando la máquina jala, las poleas giran y la cabina sube.'],
        [13, 'Si la cabina sube un metro, pasan dos metros de cinta. Así la máquina carga la mitad.']],
      g: [[0, 'Falla 1: el rodamiento de una polea se gastó. Zumba debajo del piso al viajar.'],
        [4.5, 'El zumbido sube con la velocidad y se siente en los pies.'],
        [9, 'Falla 2: la cinta se corrió de lado y roza el borde. Chirría y bota polvillo.'],
        [13.5, 'Arreglo: cambiar el rodamiento y alinear la polea y la cinta. Con la cabina asegurada.']],
      mov: [[0, 0.6], [8.5, 0.6], [12.5, 1.6], [13.5, 1.6], [16.5, 2.0], [17, 2.0]],
      mov2: [[0, 0.7], [0.6, 0.7], [8.5, 1.5], [9, 1.5], [13.2, 1.0], [18, 1.0]],
      cams: [
        planos([[0, [1.15, 0.18, 1.35], [0.0, 0.45, 0]],
          [4, [3.1, 3.0, 7.4], [0.1, 2.65, 0], [3.4, 3.0, 7.2]],
          [8.5, [1.3, 0.2, 1.6], [0.0, 0.5, 0]],
          [13, [3.1, 3.0, 7.4], [0.1, 2.75, 0]]], 17),
        planos([[0, [1.1, 0.25, 0.75], [0.55, 0.58, 0]],
          [9, [-1.0, 0.3, 0.75], [-0.6, 0.6, 0]],
          [13.5, [1.5, 0.15, 1.9], [0.0, 0.5, 0]]], 18)
      ],
      seguir: function (c, t) {
        if (c) return kf(t, GF.poleas_cabina.mov2) - 0.7;
        return t < 13.9 ? (kf(t, GF.poleas_cabina.mov) - 0.6) * (1 - ph(t, 13, 13.9)) : 0;
      },
      a0: function (t, s, K) {
        var yc = kf(t, GF.poleas_cabina.mov);
        fajasPone(s, K, { t: t, yc: yc });
        if (t < 4) { K.marcar(s.poleas, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Poleas bajo la cabina', [F.XC, yc - 0.12, 0.08]); K.rotulo('Cintas', [0, yc - 0.19, 0.05], 'izq'); }
        else if (t < 8.5) { K.marcar(s.cintas, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Amarre fijo', [-F.XC - F.RC, F.YH + 0.05, 0], 'izq'); K.rotulo('Máquina', [F.XS, F.YS + 0.12, -0.2]); K.rotulo('Cabina', [-0.3, yc + 1.4, 0.7], 'izq'); }
        else if (t < 13) { K.marcar(s.poleas, 'foco'); K.rotulo('Gira', [F.XC, yc - 0.12, 0.08]); K.tabla([['MÁQUINA', 'JALA', 'ac'], ['POLEAS', 'GIRAN', 'ac'], ['CABINA', yc < 1.59 ? 'SUBE' : 'QUIETA', yc < 1.59 ? 'ac' : '']]); }
        else { var d = Math.max(0, yc - 1.6); K.tabla([['CABINA SUBE', Math.round(d * 100) + ' cm', 'ac'], ['CINTA EN LA MÁQUINA', Math.round(d * 200) + ' cm', 'ac'], ['FUERZA DE LA MÁQUINA', 'LA MITAD', 'ok']]); K.rotulo('Máquina', [F.XS, F.YS + 0.12, -0.2]); K.rotulo('Cintas', [-F.XC - F.RC, 3.9, 0], 'izq'); }
      },
      a1: function (t, s, K) {
        var yc = kf(t, GF.poleas_cabina.mov2), mueve = Math.abs(kf(t + 0.05, GF.poleas_cabina.mov2) - yc) > 0.0005;
        var f1 = t < 9, f2 = entre(t, 9, 13.5), dz = f2 ? 0.022 * ph(t, 9, 10) : 0;
        fajasPone(s, K, { t: t, yc: yc, vibra: f1 && mueve ? 0.003 : 0, dz: dz });
        s.ondas.poner(t, [F.XC, yc - 0.12, 0.1], f1 && mueve, 0.16);
        s.chispas.emitir(t, [-F.XC, yc - 0.2, 0.075], f2 && mueve, 0.1);
        s.polvo.caer(t, [-F.XC, yc - 0.22, 0.07], f2 && t > 10, 0.5, 0.15);
        if (f1) { K.marcar(s.poleas[1].cubo, 'mal'); K.rotulo('Rodamiento gastado', [F.XC, yc - 0.12, 0.08]); if (t > 4.5) { K.aviso('Zumbido bajo el piso'); K.tabla([['VELOCIDAD', mueve ? 'VIAJANDO' : 'PARADA', ''], ['RUIDO', mueve ? 'ALTO' : '—', mueve ? 'mal' : '']]); } }
        else if (f2) { K.marcar(s.cintas, K.parpadeo(t, 1.2) ? 'mal' : null); K.rotulo('Cinta corrida', [-F.XC, yc - 0.2, 0.08], 'izq'); K.aviso('Chirrido y polvillo'); }
        else { K.marcar(s.poleas, 'foco'); K.aviso('Polea alineada, rodamiento nuevo', false); }
      }
    },
    monitor_fajas: {
      f: [[0, 'En los ascensores de cintas, arriba, donde terminan las cintas, va una cajita: el monitor.'],
        [4.5, 'Las cintas llevan hilos de acero escondidos. El monitor les pasa una corrientita y la mide.'],
        [9, 'Así sabe si los hilos de adentro están sanos, aunque por fuera no se vea nada.'],
        [13, 'Al lado, un interruptor vigila que ninguna cinta quede floja.']],
      g: [[0, 'Falla 1: un hilo de acero se cortó por dentro. Por fuera, la cinta se ve normal.'],
        [4.5, 'El monitor lo nota y saca al ascensor de servicio hasta que se cambien las cintas.'],
        [9, 'Falla 2: una cinta quedó floja. Su interruptor salta y el ascensor no se mueve.'],
        [13.5, 'Arreglo: revisar y cambiar todas las cintas juntas. El monitor nunca se anula.']],
      mov: [[0, 0.8], [1, 0.8], [8, 1.6], [9, 1.6], [16, 0.9], [17, 0.9]],
      cams: [
        planos([[0, [-0.25, 5.15, 1.05], [-0.85, 4.95, 0]],
          [4.5, [-0.35, 4.75, 1.2], [-0.95, 4.6, 0.1]],
          [9, [0.05, 4.75, 1.75], [-0.8, 4.65, 0]],
          [13, [-0.45, 5.3, 0.6], [-0.69, 5.1, 0.02]]], 17),
        planos([[0, [-0.35, 4.75, 1.2], [-0.95, 4.6, 0.1]],
          [4.5, [-0.25, 5.1, 1.05], [-0.9, 4.95, 0]],
          [9, [-0.45, 5.3, 0.6], [-0.69, 5.1, 0.02]],
          [13.5, [0.4, 4.9, 2.0], [-0.7, 4.7, 0]]], 18)
      ],
      a0: function (t, s, K) {
        var yc = kf(t, GF.monitor_fajas.mov);
        fajasPone(s, K, { t: t, yc: yc });
        ponerLupa(s, K, 0, t, [-1.0, 4.55, 0.25], [-F.XC - F.RC, 4.55, 0.05], entre(t, 4.8, 13));
        if (t < 4.5) { K.marcar(s.monitor, K.parpadeo(t, 1) ? 'foco' : null); K.rotulo('Monitor', [-1.02, 5.06, 0.03], 'izq'); K.rotulo('Puntas de las cintas', [-F.XC - F.RC - 0.14, F.YH + 0.058, 0.05]); }
        else if (t < 13) { K.rotulo('Hilos de acero', [-1.0, 4.4, 0.25], 'izq'); K.tabla([['MONITOR', 'MIDIENDO', 'ac'], ['HILOS', 'SANOS', 'ok']]); }
        else { K.marcar([s.barra, s.micro], 'foco'); K.rotulo('Interruptor de cinta floja', [-F.XC - F.RC, 5.16, 0.1]); K.tabla([['CINTAS', 'TENSAS', 'ok'], ['INTERRUPTOR', 'CERRADO', 'ok']]); }
      },
      a1: function (t, s, K) {
        var f1 = t < 9, f2 = entre(t, 9, 13.5), yc = f1 ? kf(t, [[0, 0.9], [4.5, 1.3]]) : f2 ? 1.3 : kf(t, [[13.5, 1.3], [17, 0.8]]);
        fajasPone(s, K, { t: t, yc: yc, hiloRoto: f1, flojo: f2 && t > 9.6 ? 1 : null });
        ponerLupa(s, K, 1, t, [-1.0, 4.55, 0.25], [-F.XC - F.RC, 4.55, 0.05], t < 4.9);
        if (f1) { if (t < 4.9) K.rotulo('Hilo cortado', [-1.0, 4.4, 0.25], 'izq'); if (t > 4.5) { K.marcar(s.monitor, 'mal'); K.aviso('Fuera de servicio: revisar cintas'); K.tabla([['MONITOR', 'ALARMA', 'mal'], ['ASCENSOR', 'DETENIDO', 'mal']]); } }
        else if (f2) { K.marcar([s.barra, s.micro], K.parpadeo(t, 1.2) ? 'mal' : null); K.rotulo('Cinta floja', [-F.XC - F.RC, 5.12, 0.0], 'izq'); if (t > 9.6) { K.aviso('El ascensor no se mueve'); K.tabla([['INTERRUPTOR', 'ABIERTO', 'mal']]); } }
        else { K.aviso('Cintas nuevas, monitor en verde', false); K.marcar(s.cintas, 'foco'); }
      }
    }
  };
  V3.escena('maq-fajas', ['poleas_cabina', 'monitor_fajas'], {
    fov: 36,
    construir: function (K, id) {
      var s = armarFajas(K);
      s.G = GF[id] || GF.poleas_cabina; s.cams = s.G.cams; s.seguir = s.G.seguir || null;
      return s;
    },
    camara: camaraPieza,
    funciona: { dur: 17, subt: function (id) { return (GF[id] || GF.poleas_cabina).f; }, anim: function (t, s, K) { s.G.a0(t, s, K); } },
    falla: { dur: 18, subt: function (id) { return (GF[id] || GF.poleas_cabina).g; }, anim: function (t, s, K) { s.G.a1(t, s, K); } }
  });

  // =====================================================================================
  // 7) Cadena de compensación: cuelga en U entre la cabina y el contrapeso
  // =====================================================================================
  S.cadena_compensacion = {
    que: 'Es una cadena forrada en negro que cuelga en forma de U debajo de la cabina y del contrapeso.',
    sirve: 'Compensa el peso de los cables: así el motor siente casi el mismo peso en cualquier piso.',
    falla: 'Si el forro se rompe, suena como fierro. Si cuelga muy larga, se arrastra por el piso del foso.',
    arreglo: 'Se cambia el forro roto, se acorta la cadena desde su amarre y se revisa su guía en el foso.'
  };
  var CD = { XA: 0.32, XB: 0.85, R: 0.265, YU: 0.55, SUMA: 4.2, PASO: 0.05, N: 74 };
  function caminoCadena(yc, ycw, extra) {
    var cx = (CD.XA + CD.XB) / 2, cy = CD.YU - (extra || 0);
    return camino([
      { l: [CD.XA, yc - 0.1, CD.XA, cy] },
      { c: [cx, cy], r: CD.R, a0: PI, a1: TAU },
      { l: [CD.XB, cy, CD.XB, ycw] }
    ]);
  }
  V3.escena('maq-cadena', ['cadena_compensacion'], {
    fov: 36,
    construir: function (K) {
      var M = K.M, T = K.T, s = { K: K }, i;
      K.add(K.caja(3.2, 0.06, 2.2, M.losa || M.piso, 0.15, -0.03, -0.05));
      s.muro = K.add(K.caja(3.2, 5.6, 0.06, K.mat(0xa7b0b8, { roughness: 0.95, metalness: 0 }), 0.15, 2.8, -0.95));
      s.cab = K.add(new T.Group());
      s.cab.add(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.1, 0));
      s.cab.add(K.caja(0.44, 2.0, 0.02, M.panel, -0.225, 1.02, 0.71), K.caja(0.44, 2.0, 0.02, M.panel, 0.225, 1.02, 0.71));
      [-1, 1].forEach(function (l) { s.cab.add(K.caja(0.06, 2.62, 0.12, M.aceroOsc, l * 0.64, 1.19, 0)); });
      s.cab.add(K.caja(1.34, 0.12, 0.16, M.aceroOsc, 0, 2.36, 0), K.caja(1.34, 0.1, 0.16, M.aceroOsc, 0, -0.05, 0));
      s.cab.add(K.caja(0.08, 0.06, 0.08, M.hierro, CD.XA, -0.13, 0));
      for (i = 0; i < 4; i++) s.cab.add(K.cil(0.008, 2.6, M.hierro, 0, 3.75, -0.075 + i * 0.05, null, 8));
      s.cw = K.add(new T.Group());
      [-1, 1].forEach(function (l) { s.cw.add(K.caja(0.16, 1.52, 0.05, M.aceroOsc, 0, 0.76, l * 0.42)); });
      s.cw.add(K.caja(0.17, 0.08, 0.9, M.aceroOsc, 0, 1.5, 0), K.caja(0.17, 0.08, 0.9, M.aceroOsc, 0, 0.02, 0));
      for (i = 0; i < 9; i++) s.cw.add(K.caja(0.13, 0.13, 0.78, i % 2 ? M.pesa : M.pesa2, 0, 0.13 + i * 0.145, 0));
      s.cw.add(K.caja(0.08, 0.06, 0.08, M.hierro, 0, -0.03, 0));
      for (i = 0; i < 4; i++) s.cw.add(K.cil(0.008, 3.0, M.hierro, 0, 3.0, -0.075 + i * 0.05, null, 8));
      [-1, 1].forEach(function (l) { var g = K.riel(5.6, M.acero); g.position.set(CD.XB, 0, l * 0.5); if (l > 0) g.rotation.y = PI; K.add(g); });
      [-0.3, 0.3].forEach(function (x) { K.add(K.cil(0.07, 0.12, M.pu, x, 0.06, -0.38)); });
      K.add(K.cil(0.06, 0.33, M.pu, CD.XB, 0.2, -0.3));
      // eslabones forrados (gruesos y negros) y pelados (delgados, de fierro); comparten geometría
      s.geoG = new T.TorusGeometry(0.02, 0.0115, 8, 14); s.geoF = new T.TorusGeometry(0.02, 0.0055, 6, 14);
      var mG = K.mat(0x16181b, { roughness: 0.7, metalness: 0 }), mF = K.mat(0x9aa3ab, { metalness: 0.6, roughness: 0.35 });
      s.mG = mG; s.mF = mF; s.links = [];
      for (i = 0; i < CD.N; i++) { var l = new T.Mesh(s.geoG, mG); l.scale.set(1.5, 1, 1); K.add(l); s.links.push(l); }
      K.add(new T.Mesh(s.geoF, mF)).visible = false;
      s.cadena = s.links;
      s.mtx = new T.Matrix4(); s.vx = new T.Vector3(); s.vy = new T.Vector3(); s.vz = new T.Vector3();
      s.ondas = K.add(ondas(K)); s.polvo = K.add(polvo(K, 12, 0x7a6a58)); s.q = [0, 0, 0, 0, 0, 0];
      s.cams = [
        planos([[0, [-0.9, 1.5, 2.6], [0.45, 0.8, 0]],
          [4.5, [-0.3, 0.75, 1.7], [0.58, 0.4, 0]],
          [9, [3.3, 2.9, 6.6], [0.25, 2.3, 0], null, null, 1.2],
          [13, [3.3, 2.9, 6.6], [0.25, 2.3, 0], [3.5, 2.8, 6.8]]], 17),
        planos([[0, [-0.3, 0.55, 1.6], [0.58, 0.2, 0]],
          [9, [-0.6, 1.3, 2.0], [0.5, 0.9, 0]],
          [13.5, [-0.9, 1.5, 2.6], [0.45, 0.8, 0]]], 18)
      ];
      return s;
    },
    camara: camaraPieza,
    funciona: {
      dur: 17,
      subt: [[0, 'Debajo de la cabina cuelga una cadena forrada. Baja al foso, hace una U y sube al contrapeso.'],
        [4.5, 'Cuando la cabina sube, la cadena se mueve con ella y la U rueda en el foso.'],
        [9, 'En un edificio alto los cables pesan mucho. La cadena pone ese peso del otro lado.'],
        [13, 'Así el motor siente casi el mismo peso en cualquier piso.']],
      anim: function (t, s, K) {
        var yc = kf(t, [[0, 1.0], [4.5, 1.0], [8.5, 2.2], [9.5, 2.2], [12.5, 1.0], [13.5, 1.0], [16.5, 2.8], [17, 2.8]]);
        cadenaPone(s, K, { t: t, yc: yc });
        marca(K, [s.links], null);
        s.ondas.visible = false; s.polvo.visible = false;
        if (t < 4.5) { if (K.parpadeo(t, 1)) K.marcar(s.links, 'foco'); K.rotulo('Cadena', [CD.XA, (yc - 0.1 + CD.YU) / 2, 0.03], 'izq'); K.rotulo('Contrapeso', [CD.XB, CD.SUMA - yc + 0.8, 0.45]); K.rotulo('Cabina', [-0.3, yc + 0.6, 0.7], 'izq'); }
        else if (t < 9) K.rotulo('La U rueda', [(CD.XA + CD.XB) / 2, CD.YU - CD.R, 0.03]);
        var abajo = yc < 1.9;
        if (t >= 9) {
          K.tabla([['CABINA', abajo ? 'ABAJO' : 'ARRIBA', ''], ['PESO DE CABLES', abajo ? 'LADO CABINA' : 'LADO CONTRAPESO', 'ac'], ['PESO DE CADENA', abajo ? 'LADO CONTRAPESO' : 'LADO CABINA', 'ok']]);
          K.rotulo('Cables', abajo ? [0, Math.min(3.95, yc + 2.9), 0.08] : [CD.XB, Math.min(3.95, CD.SUMA - yc + 2.0), 0.08], abajo ? 'izq' : 'der');
          K.rotulo('Cadena', abajo ? [CD.XB, (CD.SUMA - yc + CD.YU) / 2, 0.03] : [CD.XA, (yc + CD.YU) / 2, 0.03], abajo ? 'der' : 'izq');
        }
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: la cadena quedó muy larga y se arrastra por el piso del foso.'],
        [4.5, 'Se escucha un ruido de arrastre y el forro se gasta.'],
        [9, 'Falla 2: el forro se rompió. La cadena suena como fierro y se balancea contra el muro.'],
        [13.5, 'Arreglo: acortar la cadena desde su amarre, cambiar el forro roto y ver que cuelgue libre.']],
      anim: function (t, s, K) {
        var yc = kf(t, [[0, 1.0], [1, 1.0], [8, 2.0], [9, 2.0], [13, 1.4], [18, 1.4]]), mueve = Math.abs(kf(t + 0.05, [[0, 1.0], [1, 1.0], [8, 2.0], [9, 2.0], [13, 1.4], [18, 1.4]]) - yc) > 0.0005;
        var f1 = t < 9, f2 = entre(t, 9, 13.5);
        cadenaPone(s, K, { t: t, yc: yc, extra: f1 ? 0.42 * ph(t, 0, 1.2) : 0, rotos: f2, balanceo: f2 ? 0.07 : 0 });
        marca(K, [s.links], null);
        s.polvo.caer(t, [(CD.XA + CD.XB) / 2, 0.06, 0.1], f1 && mueve, 0.04, 0.5);
        s.polvo.children.forEach(function (c) { c.position.y = -c.position.y * 2; });
        s.ondas.poner(t, [(CD.XA + CD.XB) / 2, f1 ? 0.1 : 1.0, 0.15], (f1 && mueve && t > 4.5) || (f2 && mueve), 0.2);
        if (f1) { K.marcar(s.enPiso, K.parpadeo(t, 1.2) ? 'mal' : null); K.rotulo('Toca el piso', [(CD.XA + CD.XB) / 2, 0.05, 0.03]); if (t > 4.5) K.aviso('Ruido de arrastre'); }
        else if (f2) { K.rotulo('Forro roto', [CD.XA, 1.0, 0.05], 'izq'); K.aviso('Suena como fierro'); }
        else { K.marcar(s.links, 'foco'); K.aviso('Cadena a su medida, forro nuevo', false); }
      }
    }
  });
  // pone cabina, contrapeso y cada eslabón en su camino (extra = cuánto más larga está la cadena)
  function cadenaPone(s, K, o) {
    var yc = o.yc, ycw = CD.SUMA - yc, cm = caminoCadena(yc, ycw, o.extra || 0), q = s.q;
    s.enPiso = [];
    s.cab.position.set(0, yc, 0); s.cw.position.set(CD.XB, ycw, 0);
    s.links.forEach(function (l, i) {
      var sm = i * CD.PASO + 0.02; enCamino(cm, Math.min(sm, cm.L), q);
      var x = q[0], y = q[1], tx = q[2], ty = q[3];
      if (y < 0.03) { y = 0.03; s.enPiso.push(l); if (q[4] === 1) { tx = Math.sign(tx || 1); ty = 0; } }
      var f = Math.sin(PI * Math.min(1, sm / cm.L));
      var z = o.balanceo ? Math.sin(o.t * 3.1) * o.balanceo * f : 0;
      l.position.set(x, y, z); l.visible = sm <= cm.L;
      s.vx.set(tx, ty, 0).normalize();
      if (i % 2) s.vz.set(0, 0, 1); else s.vz.set(-s.vx.y, s.vx.x, 0);
      s.vy.crossVectors(s.vz, s.vx); s.mtx.makeBasis(s.vx, s.vy, s.vz); l.quaternion.setFromRotationMatrix(s.mtx);
      var roto = o.rotos && (i % 9 === 3 || i % 9 === 4) && i > 6 && i < 40;
      l.material = roto ? s.mF : s.mG; l.geometry = roto ? s.geoF : s.geoG; l.userData._m0 = l.material; delete l.userData._marca;
    });
  }
})();
