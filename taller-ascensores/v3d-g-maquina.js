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
    s.chispas = K.add(K.chispas(14));
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
        [13.5, 'Arreglo: asegurar las pesas con su traba y acortar los cables. Lo hace el técnico, con todo asegurado.']],
      cams: [
        planos([[0, [2.7, 4.7, 2.6], [0.85, 4.15, 0]],
          [4, [3.4, 4.6, 6.6], [0.3, 3.6, 0], [3.5, 4.4, 6.4]],
          [8.5, [2.8, 3.4, 4.8], [0.4, 3.0, 0]],
          [13, [2.5, 1.6, 2.7], [0.85, 0.95, 0]]], 17),
        planos([[0, [2.5, 4.3, 2.3], [0.85, 3.9, 0]],
          [4, [2.6, 3.0, 3.2], [0.5, 2.6, 0]],
          [8.5, [2.1, 1.0, 2.0], [0.85, 0.6, 0]],
          [13.5, [2.6, 1.7, 3.2], [0.85, 1.15, 0]]], 18)
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
        [13.5, 'Arreglo: engrasar o cambiar el rodamiento y alinear la polea con la de la máquina. Con el equipo detenido.']],
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
})();
