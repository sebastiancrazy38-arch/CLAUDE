/* Taller de Ascensores — videos 3D: hidráulico (central, bloque de válvulas, pistón, polea del pistón,
   válvula paracaídas, manguera y recolector de aceite). Mismo formato que v3d-maquina.js.
   Todas las escenas usan el mismo modelo: la central en su cuarto (a nivel del primer piso), la manguera
   que baja al foso y el pistón lateral con su polea (tiro 2:1): la cabina sube el doble que la barra. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  S.central_hidraulica = {
    que: 'Es un tanque de aceite, como una caja grande, con el motor y la bomba metidos dentro del aceite.',
    sirve: 'Empuja aceite con fuerza hacia el pistón para subir la cabina. Para bajar, solo abre una válvula y el peso hace el resto.',
    falla: 'Si le falta aceite o se calienta mucho, la cabina sube lenta, no llega arriba o se apaga después de muchos viajes.',
    arreglo: 'Con la luz cortada y el equipo bloqueado, el técnico repone aceite, busca la fuga y mejora la ventilación del cuarto.'
  };
  S.bloque_valvulas = {
    que: 'Es un bloque de metal encima del tanque, con bobinas, un reloj de presión, un botón rojo y una palanca.',
    sirve: 'Decide por dónde pasa el aceite: la cabina arranca suave, frena justo en el piso y no se baja sola.',
    falla: 'Si una válvula no cierra, la cabina se baja sola y el motor la vuelve a subir a cada rato. Con una bobina quemada, no baja.',
    arreglo: 'Con la luz cortada y sin presión, el técnico limpia o cambia la válvula o la bobina. Las regulaciones no se tocan.'
  };
  S.piston = {
    que: 'Es un tubo grueso parado en el foso, del que sale una barra lisa y brillante.',
    sirve: 'Cuando le entra aceite a presión, la barra sale y empuja hacia arriba para subir la cabina.',
    falla: 'Con los sellos gastados, el aceite chorrea por el tubo y la cabina se baja sola de a poquito.',
    arreglo: 'Con el ascensor detenido y bloqueado, el técnico cambia los sellos y pule o cambia la barra si está rayada.'
  };
  S.polea_piston = {
    que: 'Es una rueda con canales en la punta de la barra del pistón; por encima le pasan los cables.',
    sirve: 'Hace que la cabina suba el doble de lo que sube la barra: la barra sube un metro y la cabina, dos.',
    falla: 'Si su rodamiento se gasta, ronca y vibra; si sus canales se gastan, los cables duran mucho menos.',
    arreglo: 'Con el ascensor asegurado, el técnico engrasa o cambia el rodamiento y revisa los canales y cada cable.'
  };
  S.valvula_rotura = {
    que: 'Es una válvula chica, como un puño, pegada al pie del pistón, justo donde entra la manguera.',
    sirve: 'Si la manguera revienta, se cierra sola de golpe: el aceite queda encerrado y la cabina no se cae.',
    falla: 'Puede cerrarse sin motivo y trabar la cabina, o quedar sucia y no cerrar cuando hace falta.',
    arreglo: 'El técnico revisa la velocidad de bajada y limpia o cambia la válvula. Nunca se desregula ni se anula.'
  };
  S.manguera = {
    que: 'Es un tubo negro, grueso y duro, con puntas de metal, que va de la central hasta el pistón.',
    sirve: 'Lleva el aceite con fuerza hacia el pistón para subir, y lo trae de vuelta al tanque para bajar.',
    falla: 'Con una unión floja gotea y mancha el piso; si está vieja o rozada, se cuartea y puede reventar.',
    arreglo: 'Con la luz cortada y sin presión, el técnico ajusta la unión o cambia la manguera entera. Nunca se parcha.'
  };
  S.recoge_aceite = {
    que: 'Es un aro amarillo en la boca del pistón, con una manguerita que baja a una botella en el foso.',
    sirve: 'Junta el aceite que escurre de la barra para que no chorree, y muestra si los sellos están bien.',
    falla: 'Si la botella se llena en pocas semanas, los sellos están gastados; si se tapa o rebalsa, el foso se ensucia.',
    arreglo: 'Con el ascensor bloqueado, el técnico vacía la botella, destapa la manguerita y cambia los sellos. El aceite usado no va al desagüe.'
  };

  // ---------- medidas del modelo (metros) ----------
  var R0 = 0.35;             // cuánto sobresale la barra con la cabina en la parada de abajo
  var YC = 1.83;             // boca del cilindro (donde sale la barra)
  var PR = 0.2;              // radio de la polea del pistón
  var P0 = 1.1;              // piso de la cabina abajo (= piso del cuarto de la central)
  var KF = 2.2;              // cuánto avanzan las bolitas de aceite por cada metro que se mueve la barra
  var UB = 0.74;             // punto de la manguera que revienta (0 = central, 1 = pistón)
  var XT = -2.35, ZT = 0.1;  // tanque de la central
  function frac(x) { return x - Math.floor(x); }
  function pisoCab(r) { return P0 + 2 * (r - R0); }   // tiro 2:1: la cabina se mueve el doble que la barra
  function vel(K, a, t) { return (K.kf(t + 0.05, a) - K.kf(t - 0.05, a)) / 0.1; }
  function mov(K, a, t) { var r = K.kf(t, a), v = vel(K, a, t); return { r: r, fase: KF * r, flujo: v > 0.004 ? 1 : v < -0.004 ? -1 : 0 }; }
  function pulso(K, t, a, b) { return K.ph(t, a, a + 0.5) * (1 - K.ph(t, b - 0.5, b)); }
  function cm(d) { return Math.round(Math.max(0, d) * 100) + ' cm'; }

  // ---------- el modelo completo (una sola vez por escena) ----------
  function armar(K, id) {
    var M = K.M, T = K.T, s = { id: id }, i;
    function V(a) { return new T.Vector3(a[0], a[1], a[2]); }
    s.mAceite = K.mat(0xd99a2a, { transparent: true, opacity: 0.5, roughness: 0.2, depthWrite: false });
    s.cFrio = new T.Color(0xd99a2a); s.cCalor = new T.Color(0xe2401f);
    s.mOleo = K.mat(0x9a6516, { roughness: 0.12, metalness: 0.3 });
    s.mFlujo = K.matB(0xffb43c); s.mChorro = K.matB(0xf0a52f);
    s.mVidrio = K.mat(0x9fb4c8, { transparent: true, opacity: 0.16, depthWrite: false });
    s.mPint = K.mat(0x34495e, { roughness: 0.55, metalness: 0.3 });
    s.mPlast = K.mat(0xeef3f6, { transparent: true, opacity: 0.45, depthWrite: false });
    s.mValv = K.mat(0xd03a2c, { transparent: true, opacity: 0.38, depthWrite: false });
    s.mLuz = K.matB(0xffd23c);
    s.mOnda = [K.matB(0xff7a2a, { transparent: true, opacity: 0.6, depthWrite: false }), K.matB(0xff7a2a, { transparent: true, opacity: 0.6, depthWrite: false })];

    // foso abajo, cuarto de la central a nivel del primer piso, muro del fondo
    K.add(K.caja(3.0, 0.1, 2.3, M.piso, 0.5, -0.05, 0.12));
    K.add(K.caja(2.8, 1.12, 2.3, M.losa, -2.4, 0.5, 0.12));
    K.add(K.caja(2.8, 0.04, 2.3, M.piso, -2.4, 1.08, 0.12));
    K.add(K.caja(5.8, 5.6, 0.06, M.muro, -0.9, 2.7, -1.0));

    // ---- central: tanque con el frente transparente para ver adentro
    s.tanque = K.add(K.grupo([
      K.caja(0.9, 0.62, 0.02, M.azul, 0, 0.31, -0.29), K.caja(0.02, 0.62, 0.6, M.azul, -0.44, 0.31, 0), K.caja(0.02, 0.62, 0.6, M.azul, 0.44, 0.31, 0),
      K.caja(0.9, 0.02, 0.6, M.azul, 0, 0.01, 0), K.caja(0.9, 0.62, 0.01, s.mVidrio, 0, 0.31, 0.295),
      K.caja(0.9, 0.03, 0.03, M.azul, 0, 0.605, 0.29), K.caja(0.9, 0.03, 0.03, M.azul, 0, 0.015, 0.29),
      K.caja(0.94, 0.03, 0.64, M.aceroOsc, 0, 0.635, 0)
    ], XT, 1.1, ZT));
    s.aceite = K.add(K.caja(0.86, 0.5, 0.56, s.mAceite, XT, 1.37, ZT));
    // motor (con aletas) y bomba, sumergidos; el acople con la marca amarilla es lo que se ve girar
    var mot = [K.cil(0.12, 0.3, M.gris, -0.14, 0, 0, 'x'), K.cil(0.1, 0.02, M.aceroOsc, -0.3, 0, 0, 'x')];
    for (i = 0; i < 8; i++) { var a = i / 8 * PI * 2; mot.push(K.caja(0.26, 0.018, 0.018, M.aceroOsc, -0.14, Math.cos(a) * 0.122, Math.sin(a) * 0.122)); }
    mot.push(K.cil(0.075, 0.14, M.verde, 0.15, 0, 0, 'x'), K.cil(0.04, 0.08, M.gris, 0.15, -0.11, 0));
    s.motorG = K.add(K.grupo(mot, XT, 1.3, ZT));
    s.eje = K.add(K.grupo([K.cil(0.08, 0.04, M.hierro, 0, 0, 0, 'x'), K.caja(0.045, 0.17, 0.03, M.amarillo, 0, 0, 0)], XT + 0.05, 1.3, ZT));
    K.add(K.cil(0.018, 0.36, M.acero, XT + 0.18, 1.56, ZT));          // de la bomba al bloque
    K.add(K.cil(0.016, 0.28, M.acero, XT + 0.04, 1.61, ZT + 0.1));     // retorno al tanque

    // ---- bloque de válvulas encima del tanque
    var xB = -2.18, yB = 1.85;
    s.bloque = K.add(K.caja(0.4, 0.2, 0.22, M.acero, xB, yB, ZT));
    s.bobs = []; s.luzB = [];
    [-2.28, -2.12].forEach(function (x) {
      s.bobs.push(K.add(K.grupo([K.cil(0.042, 0.11, M.negro, 0, 0, 0), K.cil(0.046, 0.02, M.aceroOsc, 0, -0.045, 0), K.cil(0.01, 0.04, M.acero, 0, 0.07, 0)], x, 2.005, ZT)));
      var l = K.toro(0.05, 0.008, s.mLuz, x, 2.03, ZT); l.rotation.x = PI / 2; s.luzB.push(K.add(l));
    });
    K.add(K.cil(0.009, 0.08, M.acero, -2.03, 1.99, 0.18));
    s.mano = K.add(K.grupo([K.cil(0.058, 0.03, M.hierro, 0, 0, 0, 'z'), K.cil(0.05, 0.032, M.blanco, 0, 0, 0.002, 'z')], -2.03, 2.08, 0.19));
    var zona = K.toro(0.04, 0.005, M.rojo, -2.03, 2.08, 0.21, 0.88); zona.rotation.z = -0.63; K.add(zona);
    s.aguja = K.add(K.grupo([K.caja(0.006, 0.042, 0.004, M.negro, 0, 0.018, 0)], -2.03, 2.08, 0.212));
    K.add(K.caja(0.07, 0.07, 0.004, M.amarillo, -2.3, 1.83, 0.212));
    s.boton = K.add(K.cil(0.02, 0.03, M.rojo, -2.3, 1.83, 0.226, 'z'));
    K.add(K.cil(0.022, 0.1, M.aceroOsc, -2.33, 2.0, 0.03));
    s.palanca = K.add(K.grupo([K.caja(0.42, 0.022, 0.022, M.hierro, -0.21, 0, 0), K.cil(0.016, 0.1, M.goma, -0.4, 0, 0, 'x')], -2.33, 2.06, 0.03));
    K.add(K.cil(0.03, 0.045, M.cobre, -1.955, yB, ZT, 'x'));               // llave de paso
    K.add(K.caja(0.012, 0.012, 0.1, M.rojo, -1.955, yB + 0.035, ZT + 0.04));
    K.add(K.cil(0.033, 0.04, M.acero, -1.915, yB, ZT, 'x'));

    // ---- manguera: del bloque, por el piso del cuarto, baja al foso y llega al pie del pistón
    s.cMan = new T.CatmullRomCurve3([[-1.9, 1.85, 0.1], [-1.78, 1.8, 0.2], [-1.68, 1.5, 0.36], [-1.58, 1.15, 0.45], [-1.32, 1.125, 0.5], [-1.1, 1.125, 0.52], [-1.0, 1.115, 0.52],
      [-0.972, 1.0, 0.52], [-0.972, 0.4, 0.52], [-0.88, 0.06, 0.54], [-0.6, 0.03, 0.57], [-0.3, 0.03, 0.58], [-0.08, 0.08, 0.52], [0, 0.22, 0.42], [0, 0.32, 0.3]].map(V));
    s.manguera = K.add(new T.Mesh(new T.TubeGeometry(s.cMan, 180, 0.024, 8, false), M.goma));
    var tp = []; for (i = 0; i <= 8; i++) tp.push(s.cMan.getPointAt(UB - 0.035 + i * 0.07 / 8));
    s.tramo = K.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(tp), 16, 0.0262, 8, false), M.goma));
    s.pRev = s.cMan.getPointAt(UB);
    s.grietas = K.add(new T.Group());
    for (i = 0; i < 6; i++) { var pg = s.cMan.getPointAt(UB - 0.025 + i * 0.01), gq = K.caja(0.024, 0.006, 0.006, M.negro, pg.x, pg.y + 0.025, pg.z + (i % 2 ? 0.008 : -0.008)); gq.rotation.y = i * 0.9; s.grietas.add(gq); }
    s.tuerca = K.add(K.cil(0.034, 0.05, M.acero, 0, 0.32, 0.275, 'z'));
    s.abraz = [0.28, 0.5, 0.88].map(function (u) {
      var p = s.cMan.getPointAt(u), d = s.cMan.getTangentAt(u), o = K.toro(0.031, 0.008, M.acero, p.x, p.y, p.z);
      o.quaternion.setFromUnitVectors(new T.Vector3(0, 0, 1), d); return K.add(o);
    });

    // ---- pistón lateral: base, cilindro pintado, cabeza con el aro recolector y barra cromada
    K.add(K.caja(0.36, 0.06, 0.36, M.hierro, 0, 0.03, 0));
    s.cil = K.add(K.cil(0.1, 1.74, s.mPint, 0, 0.93, 0));
    s.cabeza = K.add(K.cil(0.115, 0.06, M.hierro, 0, 1.8, 0));
    s.anillo = K.add(K.grupo([K.cil(0.15, 0.05, M.amarillo, 0, 0, 0), K.cil(0.013, 0.05, M.amarillo, 0.12, -0.01, 0.07, 'x')], 0, 1.775, 0));
    s.vast = K.add(K.cil(0.055, 1.7, M.cromo, 0, YC + R0 - 0.85, 0));
    s.rayas = new T.Group(); s.vast.add(s.rayas);
    for (i = 0; i < 4; i++) { var an = -PI * 0.75 + (i - 1.5) * 0.25; s.rayas.add(K.caja(0.005, 0.42, 0.005, M.hierro, Math.cos(an) * 0.056, 0.55 + (i % 2) * 0.06, -Math.sin(an) * 0.056)); }
    // cabezal con la polea (gira con .rotation.z); los cables la abrazan por arriba
    s.cabezal = K.add(new T.Group());
    s.cabezal.add(K.caja(0.16, 0.03, 0.15, M.hierro, 0, 0.015, 0), K.caja(0.12, 0.3, 0.012, M.aceroOsc, 0, 0.16, 0.055), K.caja(0.12, 0.3, 0.012, M.aceroOsc, 0, 0.16, -0.055), K.cil(0.02, 0.14, M.acero, 0, 0.16, 0, 'z'));
    s.polea = K.polea(PR, 0.07, M.acero, M.hierro); s.polea.position.set(0, 0.16, 0); s.cabezal.add(s.polea);
    [-0.018, 0.018].forEach(function (z) { s.cabezal.add(K.toro(PR + 0.004, 0.006, M.hierro, 0, 0.16, z, PI)); });
    s.ondas = [0, 1].map(function (j) { var w = K.toro(0.24, 0.006, s.mOnda[j], 0, 0.16, 0.07); s.cabezal.add(w); return w; });
    // cables: de un amarre fijo, por encima de la polea, hasta la cabina
    s.amarre = K.add(K.grupo([K.caja(0.18, 0.05, 0.14, M.hierro, 0, 0, 0), K.cil(0.012, 0.09, M.amarillo, -0.03, 0.05, -0.018), K.cil(0.012, 0.09, M.amarillo, -0.03, 0.05, 0.018)], -0.17, 0.45, 0));
    s.cuerdas = []; s.cuerdaObjs = []; s.cuerdasD = [];
    [-1, 1].forEach(function (lado) {
      [-0.018, 0.018].forEach(function (z) {
        var c = { lado: lado, z: z, o: K.add(K.cable(0.006, M.hierro)) };
        s.cuerdaObjs.push(c.o);
        if (lado > 0) { c.o2 = K.add(K.cable(0.006, M.hierro)); s.cuerdaObjs.push(c.o2); s.cuerdasD.push(c.o, c.o2); }
        s.cuerdas.push(c);
      });
    });

    // ---- cabina con su bastidor lateral (tipo mochila); y = piso de la cabina
    s.cabina = K.add(new T.Group());
    s.cabina.add(K.caja(0.08, 2.55, 0.1, M.aceroOsc, 0.33, 1.05, 0), K.caja(1.32, 0.1, 0.16, M.aceroOsc, 0.97, -0.07, 0), K.caja(1.32, 0.1, 0.16, M.aceroOsc, 0.97, 2.27, 0));
    s.cabina.add(K.caja(1.2, 2.2, 1.3, M.inox, 1.0, 1.1, 0), K.caja(0.8, 2.0, 0.02, M.panel, 1.0, 1.02, 0.66), K.caja(1.2, 0.03, 0.06, M.acero, 1.0, -0.015, 0.69));
    s.cabina.add(K.caja(0.2, 0.06, 0.1, M.hierro, 0.24, -0.1, 0));
    s.contacto = K.caja(0.05, 0.04, 0.05, M.negro, 0.2, -0.155, 0.06); s.cabina.add(s.contacto);
    K.add(K.en(K.riel(5.4), 0.33, 0, -0.13));
    // piso de una parada (umbral amarillo y pasillo) para ver si la cabina queda a nivel
    s.nivel = K.add(K.grupo([K.caja(1.2, 0.04, 0.12, M.amarillo, 1.0, -0.02, 0.79), K.caja(0.06, 2.1, 0.08, M.gris, 0.37, 1.05, 0.82), K.caja(0.06, 2.1, 0.08, M.gris, 1.63, 1.05, 0.82), K.caja(1.32, 0.08, 0.08, M.gris, 1.0, 2.14, 0.82)], 0, 0, 0));

    // ---- recolector: manguerita transparente hasta una botella en el foso
    s.botella = K.add(K.grupo([K.cil(0.06, 0.26, s.mPlast, 0, 0.13, 0), K.cil(0.025, 0.03, M.azul, 0, 0.275, 0)], 0.33, 0, 0.24));
    s.botAceite = K.add(K.cil(0.054, 0.24, s.mOleo, 0.33, 0.13, 0.24));
    s.cTubo = new T.CatmullRomCurve3([[0.12, 1.765, 0.07], [0.13, 1.62, 0.1], [0.135, 1.0, 0.11], [0.14, 0.55, 0.13], [0.24, 0.36, 0.2], [0.33, 0.31, 0.24], [0.33, 0.27, 0.24]].map(V));
    s.tubo = K.add(new T.Mesh(new T.TubeGeometry(s.cTubo, 60, 0.007, 6, false), s.mPlast));
    s.pTubo = []; for (i = 0; i < 6; i++) s.pTubo.push(K.add(K.esfera(0.011, s.mOleo)));

    // ---- válvula paracaídas (cuerpo transparente: se ve el tapón y su resorte)
    s.valvula = K.add(K.grupo([K.caja(0.1, 0.12, 0.15, s.mValv, 0, 0, 0), K.cil(0.012, 0.05, M.acero, 0.025, 0.08, 0), K.esfera(0.012, M.amarillo, 0.025, 0.105, 0)], 0, 0.32, 0.175));
    K.add(K.toro(0.03, 0.006, M.hierro, 0, 0.32, 0.234));
    s.tapon = K.add(K.cil(0.034, 0.02, M.aceroOsc, 0, 0.32, 0.155, 'z'));
    s.resorte = K.resorte(0.022, 0.07, 4, 0.004, M.cobre); s.resorte.rotation.x = -PI / 2; s.resorte.position.set(0, 0.32, 0.232); K.add(s.resorte);

    // ---- aceite que se ve: gotas, chorro, charco, chorreado y bolitas que viajan por la manguera
    s.gotas = []; for (i = 0; i < 10; i++) s.gotas.push(K.add(K.gota(s.mOleo)));
    s.chorro = K.add(new T.Group()); for (i = 0; i < 30; i++) s.chorro.add(K.esfera(0.012, s.mChorro));
    s.charco = K.add(K.cil(1, 0.004, s.mOleo, 0, 0.003, 0, null, 32));
    s.chorreo = K.add(K.caja(0.035, 1, 0.006, s.mOleo, -0.073, 1, 0.073)); s.chorreo.rotation.y = -PI / 4;
    s.pm = []; for (i = 0; i < 26; i++) s.pm.push(K.add(K.esfera(0.03, s.mFlujo)));
    s.cSub = new T.CatmullRomCurve3([[-2.2, 1.17, 0.1], [-2.2, 1.28, 0.1], [-2.17, 1.4, 0.1], [-2.17, 1.72, 0.1], [-2.12, 1.84, 0.1], [-1.92, 1.85, 0.1]].map(V));
    s.cBaj = new T.CatmullRomCurve3([[-1.92, 1.85, 0.1], [-2.2, 1.85, 0.14], [-2.31, 1.78, 0.2], [-2.31, 1.45, 0.2]].map(V));
    s.pt = []; for (i = 0; i < 8; i++) s.pt.push(K.add(K.esfera(0.022, s.mFlujo)));
    s.fl1 = K.add(K.flecha(0xf2b705, 0.012)); s.fl2 = K.add(K.flecha(0xf2b705, 0.012));
    s.tec = K.add(K.persona(1.7, 0x2e5f90, true));

    s.marc = [s.tanque, s.motorG, s.eje, s.bloque, s.bobs[0], s.bobs[1], s.mano, s.boton, s.palanca, s.manguera, s.tramo, s.tuerca, s.cil, s.cabeza, s.vast,
      s.polea, s.valvula, s.anillo, s.tubo, s.botella, s.contacto, s.amarre].concat(s.abraz, s.cuerdaObjs);
    return s;
  }

  // pone todo el modelo en su lugar para este cuadro (y apaga lo pasajero)
  function estado(s, K, o) {
    var r = o.r == null ? R0 : o.r, cf = o.cf == null ? pisoCab(r) : o.cf, Pc = YC + r + 0.16, fl = o.flojo || 0, i;
    K.marcar(s.marc, null);
    s.vast.position.y = YC + r - 0.85;
    s.cabezal.position.y = YC + r;
    s.polea.rotation.set(o.bamboleo || 0, 0, (r - R0) / PR);
    s.cabina.position.y = cf;
    s.cuerdas.forEach(function (c) {
      if (c.lado < 0) { c.o.pon([-PR, Pc, c.z], [-PR, 0.5, c.z]); return; }
      var a = [PR, Pc, c.z], b = [PR, cf - 0.07, c.z];
      c.o2.visible = fl > 0.002;
      if (c.o2.visible) { var m = [PR - fl * 0.3, (Pc + cf - 0.07) / 2, c.z - fl]; c.o.pon(a, m); c.o2.pon(m, b); } else c.o.pon(a, b);
    });
    s.eje.rotation.x = o.motor || 0;
    var nv = o.nivel == null ? 1 : o.nivel; s.aceite.scale.y = nv; s.aceite.position.y = 1.12 + 0.25 * nv;
    s.mAceite.color.copy(s.cFrio).lerp(s.cCalor, o.calor || 0);
    s.aguja.rotation.z = K.mix(2.2, -2.2, K.cl(o.aguja == null ? 0.45 : o.aguja));
    for (i = 0; i < 2; i++) s.luzB[i].visible = !!(o.bob && o.bob[i]);
    s.boton.position.z = o.boton ? 0.213 : 0.226;
    s.palanca.rotation.z = o.palanca == null ? -0.15 : o.palanca;
    s.tapon.position.z = K.mix(0.155, 0.218, K.cl(o.tapon || 0)); s.resorte.scale.y = Math.max(0.05, (0.222 - s.tapon.position.z) / 0.07);
    // bolitas de aceite: por la manguera y por dentro del tanque (subida por la bomba, bajada por el retorno)
    var f = o.fase || 0, sen = o.flujo || 0, tr = o.tramo || [0, 1], n = s.pm.length;
    s.pm.forEach(function (p, j) { var u = frac(j / n + f); p.visible = sen !== 0 && u >= tr[0] && u <= tr[1]; if (p.visible) s.cMan.getPointAt(u, p.position); });
    s.pt.forEach(function (p, j) { p.visible = sen !== 0 && !o.tramo; if (p.visible) (sen > 0 ? s.cSub : s.cBaj).getPointAt(frac(j / s.pt.length + (sen > 0 ? f : -f) * 4), p.position); });
    s.gotas.forEach(function (g) { g.visible = false; });
    s.pTubo.forEach(function (g) { g.visible = false; });
    s.ondas.forEach(function (w) { w.visible = false; });
    s.chorro.visible = s.charco.visible = s.chorreo.visible = s.rayas.visible = s.grietas.visible = false;
    s.fl1.visible = s.fl2.visible = s.tec.visible = false;
    s.nivel.visible = o.nivelPiso != null; if (s.nivel.visible) s.nivel.position.y = o.nivelPiso;
    var lv = Math.max(0.02, o.botella == null ? 0.15 : o.botella); s.botAceite.scale.y = lv; s.botAceite.position.y = 0.01 + 0.12 * lv;
  }
  // gotas i0..i0+n-1 que caen desde p hasta la altura y1, en bucle
  function goteo(s, K, t, i0, n, p, y1, rit) {
    for (var i = 0; i < n; i++) {
      var g = s.gotas[i0 + i], k = frac(t * rit + i / n + K.ruido(i0 + i) * 0.2);
      g.visible = true; g.position.set(p[0] + (K.ruido(i0 + i + 5) - 0.5) * 0.02, p[1] - (p[1] - y1) * k * k, p[2] + (K.ruido(i0 + i + 9) - 0.5) * 0.02);
    }
  }
  function tuboGotas(s, t, rit, n) { for (var i = 0; i < n; i++) { var g = s.pTubo[i]; g.visible = true; s.cTubo.getPointAt(frac(t * rit + i / n), g.position); } }
  // chorro de aceite a presión que sale de una manguera rota
  function chorro(s, K, t, p, on, fuerza) {
    var g = s.chorro; g.visible = !!on; if (!on) return;
    g.position.copy(p);
    g.children.forEach(function (c, i) {
      var k = frac(t * 1.6 + K.ruido(i)), a = (K.ruido(i * 3.1) - 0.5) * 1.4, b = 0.7 + K.ruido(i * 7.7) * 0.7, L = 0.85 * fuerza;
      c.position.set(Math.sin(a) * Math.cos(b) * k * L, Math.max(0.01 - p.y, Math.sin(b) * k * L * 1.4 - k * k * L * 1.1), Math.cos(a) * Math.cos(b) * k * L);
      c.visible = k < 0.95;
    });
  }
  function charco(s, x, z, r) { s.charco.visible = r > 0.01; s.charco.position.set(x, 0.003, z); s.charco.scale.set(Math.max(r, 0.01), 1, Math.max(r, 0.01)); }
  function chorreo(s, L) { s.chorreo.visible = L > 0.01; s.chorreo.scale.y = Math.max(L, 0.01); s.chorreo.position.y = 1.76 - L / 2; }
  function ondas(s, t) { s.ondas.forEach(function (w, i) { var k = frac(t * 1.3 + i * 0.5); w.visible = true; w.scale.set(1 + k * 1.3, 1 + k * 1.3, 1); s.mOnda[i].opacity = 0.75 * (1 - k); }); }
  // flechas que comparan lo que sube la barra y lo que sube la cabina (el doble)
  function flechas(s, r, rb) {
    var d = r - rb; if (d < 0.06) return d;
    s.fl1.visible = s.fl2.visible = true;
    s.fl1.apuntar([-0.4, YC + rb, 0.12], [-0.4, YC + r, 0.12]); s.fl2.apuntar([1.75, pisoCab(rb), 0.72], [1.75, pisoCab(r), 0.72]);
    return d;
  }
  function tecnico(s, x, y, z, giro, t) {
    s.tec.visible = true; s.tec.position.set(x, y, z); s.tec.rotation.y = giro; s.tec.caminar(0, 0);
    s.tec.brazoD.rotation.x = -1.0 - 0.25 * Math.sin(t * 3); s.tec.brazoI.rotation.x = -0.7;
  }
  var CENTRAL = [[-1.55, 2.25, 2.05], [-2.25, 1.5, 0.1]], LEJOS = [[0.0, 3.4, 5.9], [-0.6, 2.5, 0]];
  var TEC_FOSO = [-0.75, 0, -0.65, 0.86];

  // ===== 1. central hidráulica: tanque, motor y bomba =====
  var A1 = [[0, R0], [5, R0], [12.5, R0 + 0.7], [14, R0 + 0.7], [19, R0]];
  var A1F = [[0, R0], [0.8, R0], [5.5, R0 + 0.2], [6.5, R0 + 0.55], [7.5, R0 + 0.2], [8.5, R0 + 0.55], [9.5, R0 + 0.3]];
  V3.escena('hid_central', ['central_hidraulica'], {
    fov: 34, poster: 7, construir: armar,
    funciona: {
      dur: 19,
      subt: [[0, 'La central es un tanque de aceite. Adentro, metidos en el aceite, van el motor y la bomba.'],
        [4.5, 'Para subir, el motor gira y la bomba empuja el aceite hacia la manguera.'],
        [9, 'El aceite llega al pistón: la barra sale y la cabina sube.'],
        [13.5, 'Para bajar, el motor ni se prende: se abre una válvula y el peso de la cabina devuelve el aceite.']],
      cam: [[0, CENTRAL[0], CENTRAL[1]], [4.5, [-1.45, 2.2, 1.85], [-2.2, 1.55, 0.1]], [8.6, [-1.35, 2.2, 1.95], [-2.05, 1.55, 0.15]], [10.4, LEJOS[0], LEJOS[1]], [13.2, LEJOS[0], LEJOS[1]], [15, [-1.55, 2.2, 1.95], [-2.25, 1.55, 0.1]], [19, CENTRAL[0], CENTRAL[1]]],
      anim: function (t, s, K) {
        var on = function (x) { return pulso(K, x, 4.6, 12.8); }, m = mov(K, A1, t), mo = on(t), baja = m.flujo < 0;
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, motor: K.integ(on, t) * 10, bob: [mo > 0.5, baja], aguja: 0.45 + 0.3 * mo - (baja ? 0.12 : 0) });
        if (t < 4.5) { K.marcar(s.tanque, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Tanque de aceite', [XT - 0.3, 1.62, 0.4]); K.rotulo('Motor y bomba', [XT - 0.1, 1.3, 0.2]); }
        else if (t < 9) { K.marcar([s.motorG, s.eje], 'foco'); K.rotulo('Motor', [XT - 0.14, 1.42, 0.2]); K.rotulo('Bomba', [XT + 0.15, 1.3, 0.2]); K.rotulo('A la manguera', s.cMan.getPointAt(0.1)); }
        else if (t < 13.5) { K.marcar([s.manguera, s.vast], 'foco'); K.rotulo('Central', [XT, 1.8, 0.4]); K.rotulo('Pistón', [0, YC + m.r - 0.2, 0.06]); K.rotulo('Cabina', [1.0, pisoCab(m.r) + 1.0, 0.66]); }
        else { K.marcar(s.bobs[1], 'foco'); K.rotulo('Válvula de bajada', s.bobs[1]); K.rotulo('Vuelve al tanque', [-2.31, 1.5, 0.2]); }
        K.tabla([['MOTOR', mo > 0.5 ? 'GIRANDO' : 'APAGADO', mo > 0.5 ? 'ac' : ''], ['CABINA', m.flujo > 0 ? 'SUBE' : baja ? 'BAJA' : 'QUIETA', m.flujo ? 'ac' : 'ok']]);
      }
    },
    falla: {
      dur: 17,
      subt: [[0, 'Falla 1: falta aceite. La bomba zumba fuerte y la cabina sube lento o no llega arriba.'],
        [5.5, 'Falla 2: muchos viajes seguidos calientan el aceite. Una protección apaga el motor para que se enfríe.'],
        [11.5, 'Arreglo: con la luz cortada y el equipo bloqueado, el técnico repone aceite, busca la fuga y ventila el cuarto.']],
      cam: [[0, [-1.55, 2.2, 1.95], [-2.25, 1.45, 0.1]], [5.5, [-1.45, 2.3, 2.1], [-2.25, 1.55, 0.1]], [11.5, [-1.15, 2.5, 2.8], [-2.4, 1.55, 0.25]], [17, [-1.2, 2.5, 2.85], [-2.4, 1.55, 0.25]]],
      anim: function (t, s, K) {
        var on = function (x) { return x < 5.5 ? pulso(K, x, 0.8, 5.7) : x < 9.6 && vel(K, A1F, x) > 0.02 ? 1 : 0; };
        var m = mov(K, A1F, t), mo = on(t), calor = K.ph(t, 5.5, 9.6) * (1 - K.ph(t, 11.5, 13.5)), temp = Math.round(40 + 34 * calor);
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, motor: K.integ(on, t) * 10, nivel: t < 5.5 ? 0.36 : 1, calor: calor, bob: [mo > 0.5, m.flujo < 0],
          aguja: t < 5.5 ? 0.3 + 0.07 * Math.sin(t * 31) : 0.45 + 0.3 * mo });
        if (t < 5.5) {
          K.marcar(s.tanque, K.parpadeo(t, 2) ? 'mal' : null); K.marcar(s.mano, 'mal');
          K.rotulo('Poco aceite', [XT - 0.25, 1.32, 0.4]); K.rotulo('La bomba zumba', [XT + 0.15, 1.3, 0.2]);
          K.tabla([['NIVEL DE ACEITE', 'BAJO', 'mal'], ['CABINA', 'SUBE LENTO', 'mal']]);
        } else if (t < 11.5) {
          var apagado = t > 9.8;
          K.tabla([['VIAJES', 'MUCHOS SEGUIDOS', 'ac'], ['ACEITE', temp + ' °C', temp > 62 ? 'mal' : 'ac']]);
          K.rotulo(apagado ? 'Aceite muy caliente' : 'Aceite calentándose', [XT - 0.2, 1.5, 0.4]);
          if (apagado) { K.marcar(s.tanque, K.parpadeo(t, 2) ? 'mal' : null); K.aviso('Se apagó para enfriarse'); }
        } else {
          K.marcar(s.tanque, 'foco'); tecnico(s, XT - 0.68, 1.1, -0.15, PI / 2, t);
          K.aviso('Luz cortada y equipo bloqueado', false);
          K.tabla([['NIVEL DE ACEITE', 'CORRECTO', 'ok'], ['ACEITE', temp + ' °C', 'ok']]);
        }
      }
    }
  });

  // ===== 2. bloque de válvulas =====
  var A2 = [[0, R0], [4, R0], [8.5, R0 + 0.45], [13, R0 + 0.45], [17, R0 + 0.15], [17.5, R0 + 0.15], [21, R0 + 0.3]];
  V3.escena('hid_valvulas', ['bloque_valvulas'], {
    fov: 34, poster: 6, construir: armar,
    funciona: {
      dur: 21,
      subt: [[0, 'El bloque de válvulas va encima del tanque. Decide por dónde pasa el aceite.'],
        [4, 'Sus bobinas abren y cierran el paso: la cabina arranca suave y frena justo en el piso.'],
        [8.5, 'El reloj marca la presión. Una válvula guarda el aceite en el pistón y la cabina no se baja sola.'],
        [13, 'Si se va la luz, el botón rojo deja volver el aceite y la cabina baja despacio hasta un piso.'],
        [17, 'Con la palanca de la bomba de mano se puede subir la cabina un poco. Solo la usa el técnico.']],
      cam: [[0, [-1.6, 2.45, 1.3], [-2.17, 1.92, 0.1]], [4, [-1.72, 2.4, 1.1], [-2.17, 1.95, 0.1]], [8.5, [-1.82, 2.25, 0.92], [-2.07, 2.03, 0.12]], [13, [-1.95, 2.05, 1.05], [-2.25, 1.86, 0.15]], [17, [-1.95, 2.5, 1.25], [-2.45, 1.97, 0.05]], [21, [-1.9, 2.55, 1.3], [-2.42, 1.97, 0.05]]],
      anim: function (t, s, K) {
        var on = function (x) { return pulso(K, x, 4.1, 8.6); }, m = mov(K, A2, t), mo = on(t), boton = K.entre(t, 13, 17), mano = K.entre(t, 17.5, 21);
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, motor: K.integ(on, t) * 10, bob: [mo > 0.5, false], boton: boton,
          aguja: 0.45 + 0.3 * mo - (boton ? 0.1 : 0) + (mano ? 0.1 * K.late(t, 0.9) : 0),
          palanca: mano ? -0.15 - 0.4 * (0.5 - 0.5 * Math.cos((t - 17.5) * PI * 1.8)) : -0.15 });
        if (t < 4) { K.marcar(s.bloque, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Bloque de válvulas', [-2.18, 1.88, 0.21]); }
        else if (t < 8.5) { K.marcar(s.bobs[0], 'foco'); K.rotulo('Bobina: abre el paso', s.bobs[0]); K.rotulo('Aceite a la manguera', s.cMan.getPointAt(0.06)); }
        else if (t < 13) { K.marcar(s.mano, 'foco'); K.rotulo('Reloj de presión', s.mano); }
        else if (t < 17) { K.marcar(s.boton, 'foco'); K.rotulo('Botón de bajada manual', [-2.3, 1.83, 0.24]); K.rotulo('Vuelve al tanque', [-2.31, 1.6, 0.2]); }
        else { K.marcar(s.palanca, 'foco'); K.rotulo('Bomba de mano', [-2.6, 2.06, 0.03]); }
        if (t >= 13) K.tabla([['LUZ', 'CORTADA', 'mal'], ['CABINA', t < 17 ? 'BAJA DESPACIO' : 'SUBE CON LA MANO', 'ac']]);
        else K.tabla([['MOTOR', mo > 0.5 ? 'GIRANDO' : 'APAGADO', mo > 0.5 ? 'ac' : ''], ['CABINA', m.flujo > 0 ? 'SUBE' : 'QUIETA', m.flujo ? 'ac' : 'ok']]);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: una válvula sucia no cierra bien. El aceite se regresa al tanque de a poquito.'],
        [5, 'La cabina se va bajando del piso y el motor arranca solo, a cada rato, para volver a subirla.'],
        [10, 'Falla 2: bobina quemada. La cabina sube bien, pero ya no baja.'],
        [13.5, 'Arreglo: con la luz cortada y sin presión, el técnico limpia o cambia la válvula o la bobina.']],
      cam: [[0, [-1.65, 2.3, 1.25], [-2.17, 1.85, 0.12]], [4.4, [-1.65, 2.3, 1.25], [-2.17, 1.85, 0.12]], [5.6, [1.95, 2.25, 2.4], [1.0, 2.0, 0.7]], [9.4, [1.95, 2.25, 2.4], [1.0, 2.0, 0.7]],
        [10.6, [-1.75, 2.3, 1.0], [-2.12, 1.98, 0.1]], [13.5, [-1.75, 2.3, 1.0], [-2.12, 1.98, 0.1]], [18, [-1.0, 2.55, 2.5], [-2.25, 1.6, 0.15]]],
      anim: function (t, s, K) {
        var RB = R0 + 0.45;
        function ciclo(x) { return frac((x - 5) / 2.5 + 0.72); }
        function renivela(x) { return (x >= 5 && x < 10 && ciclo(x) >= 0.72) || K.entre(x, 10, 10.7); }
        var sp = function (x) { return renivela(x) ? 0.9 : x < 10 ? -0.16 : 0; }, r = RB;
        if (t < 5) r = RB - 0.04 * K.ph(t, 0.3, 5);
        else if (t < 10) { var k = ciclo(t); r = RB - 0.04 * (k < 0.72 ? k / 0.72 : 1 - K.ph(k, 0.72, 1)); }
        else r = RB - 0.04 * (1 - K.ph(t, 10, 10.7));
        var mo = renivela(t), v = sp(t), dn = Math.round((RB - r) * 200);
        estado(s, K, { r: r, fase: K.integ(sp, t), flujo: v > 0 ? 1 : v < 0 ? -1 : 0, motor: K.integ(function (x) { return renivela(x) ? 1 : 0; }, t) * 10, bob: [mo, false],
          aguja: 0.45 + (mo ? 0.25 : 0), nivelPiso: pisoCab(RB) });
        if (t < 5) {
          K.marcar(s.bloque, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Válvula que no cierra', [-2.18, 1.88, 0.21]); K.rotulo('Se regresa al tanque', [-2.31, 1.6, 0.2]);
          K.tabla([['CABINA', 'SE BAJA SOLA', 'mal'], ['DESNIVEL', dn + ' cm', dn > 0 ? 'mal' : 'ok']]);
        } else if (t < 10) {
          K.rotulo('Cabina', [1.35, pisoCab(r) + 0.3, 0.66]); K.rotulo('Piso', [0.55, pisoCab(RB), 0.84]);
          K.tabla([['DESNIVEL', dn + ' cm', dn > 0 ? 'mal' : 'ok'], ['MOTOR', mo ? 'ARRANCA SOLO' : 'QUIETO', mo ? 'mal' : '']]);
        } else if (t < 13.5) {
          K.marcar(s.bobs[1], K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Bobina de bajada quemada', s.bobs[1]);
          K.tabla([['BAJAR', 'NO RESPONDE', 'mal'], ['BOBINA', 'QUEMADA', 'mal']]); K.aviso('La cabina no baja');
        } else {
          K.marcar(s.bloque, 'foco'); tecnico(s, XT - 0.68, 1.1, -0.15, PI / 2, t);
          K.aviso('Luz cortada y sin presión', false); K.tabla([['VÁLVULA', 'LIMPIA', 'ok'], ['BOBINA', 'NUEVA', 'ok']]);
        }
      }
    }
  });

  // ===== 3. pistón =====
  var A3 = [[0, R0], [4, R0], [8.5, R0 + 0.4], [12.5, R0 + 0.4], [16.5, R0 + 0.7], [17.5, R0 + 0.7]];
  V3.escena('hid_piston', ['piston'], {
    fov: 34, poster: 7, construir: armar,
    funciona: {
      dur: 17.5,
      subt: [[0, 'El pistón es un tubo parado en el foso. De adentro sale una barra lisa y brillante.'],
        [4, 'Cuando entra aceite a presión por abajo, la barra sale hacia arriba con mucha fuerza.'],
        [8.5, 'Arriba lleva una polea. Los cables van de un amarre fijo, pasan por la polea y bajan a la cabina.'],
        [12.5, 'Por eso la cabina sube el doble de lo que sube la barra.']],
      cam: [[0, [-1.4, 1.6, 2.3], [0.05, 1.2, 0.1]], [4, [-1.8, 1.5, 3.0], [0.05, 1.2, 0.1]], [8.5, [-1.9, 2.3, 4.6], [0.3, 1.75, 0.1]], [12.5, [-1.2, 2.4, 5.6], [0.55, 2.1, 0.1]], [17.5, [-1.2, 2.4, 5.6], [0.55, 2.1, 0.1]]],
      anim: function (t, s, K) {
        var m = mov(K, A3, t), Pc = YC + m.r + 0.16;
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo });
        if (t < 4) { K.marcar([s.cil, s.vast], K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Cilindro', [-0.1, 0.9, 0.1]); K.rotulo('Barra (vástago)', [0, YC + m.r - 0.12, 0.06]); }
        else if (t < 8.5) { K.marcar(s.vast, 'foco'); K.rotulo('Entra aceite', [0, 0.32, 0.25]); K.rotulo('La barra sale', [0, YC + m.r - 0.1, 0.06]); }
        else if (t < 12.5) { K.marcar(s.polea, 'foco'); K.marcar(s.cuerdaObjs, 'foco'); K.rotulo('Polea', [0, Pc + 0.2, 0]); K.rotulo('Amarre fijo', [-0.2, 0.5, 0.07]); K.rotulo('Va a la cabina', [PR, pisoCab(m.r) - 0.07, 0.05]); }
        else {
          var d = flechas(s, m.r, R0 + 0.4);
          if (d > 0.06) { K.rotulo('Barra', [-0.4, YC + m.r - d / 2, 0.12]); K.rotulo('Cabina: el doble', [1.75, pisoCab(m.r) - d, 0.72]); }
          K.tabla([['LA BARRA SUBIÓ', cm(d), 'ac'], ['LA CABINA SUBIÓ', cm(2 * d), 'ac']]);
        }
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: sellos gastados en la boca del pistón. El aceite se escapa y chorrea por el tubo.'],
        [5, 'La cabina se baja sola de a poquito y el motor tiene que volver a subirla.'],
        [10, 'Falla 2: barra rayada. Raspa los sellos y la cabina sube a saltitos, temblando.'],
        [14, 'Arreglo: con el ascensor detenido y bloqueado, el técnico cambia los sellos y pule o cambia la barra.']],
      cam: [[0, [-0.85, 1.95, 1.5], [0, 1.58, 0.05]], [4.4, [-0.9, 1.8, 1.8], [0, 1.15, 0.05]], [5.6, [1.95, 2.15, 2.4], [1.0, 1.9, 0.7]], [9.4, [1.95, 2.15, 2.4], [1.0, 1.9, 0.7]],
        [10.6, [-0.9, 2.4, 1.9], [0, 2.05, 0.05]], [14, [-0.9, 2.4, 1.9], [0, 2.05, 0.05]], [19, [-1.7, 1.9, 3.2], [0, 1.2, 0.1]]],
      anim: function (t, s, K) {
        var RB = R0 + 0.4, r, sube = K.entre(t, 8.6, 9.4) || K.entre(t, 10.4, 13.6);
        if (t < 10) r = RB - 0.035 * K.ph(t, 5, 8.3) + 0.035 * K.ph(t, 8.6, 9.4);
        else r = K.kf(t, [[10, RB], [10.4, RB], [13.6, RB + 0.25]]) + (K.entre(t, 10.4, 13.6) ? 0.007 * Math.sin(t * 30) : 0);
        estado(s, K, { r: r, fase: KF * r, flujo: sube ? 1 : K.entre(t, 5, 8.3) ? -1 : 0, tramo: K.entre(t, 5, 8.3) ? [0.97, 1] : null, nivelPiso: K.entre(t, 4.5, 10) ? pisoCab(RB) : null });
        if (t < 14) { charco(s, 0, 0, K.mix(0.22, 0.45, K.ph(t, 0, 9))); chorreo(s, K.mix(0.05, 1.2, K.ph(t, 0, 5))); goteo(s, K, t, 0, 4, [-0.078, 1.75, 0.078], 0.01, 0.8); }
        if (t < 5) { K.marcar(s.cabeza, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Sellos gastados', [0, 1.81, 0.12]); K.rotulo('Aceite chorreado', [-0.075, 1.1, 0.075]); K.tabla([['SELLOS', 'GASTADOS', 'mal'], ['ACEITE', 'SE ESCAPA', 'mal']]); }
        else if (t < 10) {
          var dn = Math.round((RB - r) * 200), mo = K.entre(t, 8.6, 9.4);
          K.rotulo('Cabina', [1.35, pisoCab(r) + 0.3, 0.66]); K.rotulo('Piso', [0.55, pisoCab(RB), 0.84]);
          K.tabla([['CABINA', dn > 0 ? 'SE BAJA SOLA' : 'A NIVEL', dn > 0 ? 'mal' : 'ok'], ['DESNIVEL', dn + ' cm', dn > 0 ? 'mal' : 'ok'], ['MOTOR', mo ? 'LA VUELVE A SUBIR' : 'QUIETO', mo ? 'ac' : '']]);
        } else if (t < 14) { s.rayas.visible = true; K.marcar(s.vast, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Barra rayada', [0, YC + r - 0.25, 0.06]); K.tabla([['BARRA', 'RAYADA', 'mal'], ['CABINA', 'SUBE A SALTITOS', 'mal']]); }
        else { K.marcar([s.cabeza, s.vast], 'foco'); tecnico(s, TEC_FOSO[0], TEC_FOSO[1], TEC_FOSO[2], TEC_FOSO[3], t); K.aviso('Ascensor detenido y bloqueado', false); K.tabla([['SELLOS', 'NUEVOS', 'ok'], ['BARRA', 'LISA', 'ok']]); }
      }
    }
  });

  // ===== 4. polea de la cabeza del pistón =====
  var A4 = [[0, R0 + 0.2], [3.5, R0 + 0.2], [8, R0 + 0.55], [9, R0 + 0.55], [12.5, R0 + 0.25], [13.5, R0 + 0.25], [17.5, R0 + 0.6]];
  var A4F = [[0, R0 + 0.3], [2.5, R0 + 0.55], [5, R0 + 0.3], [7.5, R0 + 0.55], [9.5, R0 + 0.45]];
  var POLEA = [[-0.85, 3.0, 1.75], [0.05, 2.62, 0]];
  V3.escena('hid_polea', ['polea_piston'], {
    fov: 34, poster: 2, construir: armar,
    funciona: {
      dur: 17.5,
      subt: [[0, 'En la punta de la barra del pistón va una polea: una rueda con canales para los cables.'],
        [4, 'Los cables salen de un amarre fijo, suben, pasan por encima de la polea y bajan a la cabina.'],
        [8.5, 'Cuando la barra sube o baja, la polea va con ella y gira con los cables.'],
        [13, 'La polea sube un metro y la cabina sube dos: la cabina va al doble de rápido.']],
      cam: [[0, [-0.8, 3.0, 1.7], [0.05, 2.55, 0]], [3.5, [-0.9, 3.0, 1.8], [0.05, 2.6, 0]], [5.3, [-1.9, 2.4, 4.8], [0.3, 1.8, 0.1]], [8.5, [-1.9, 2.4, 4.8], [0.3, 1.8, 0.1]],
        [10, POLEA[0], POLEA[1]], [13, POLEA[0], POLEA[1]], [14.5, [-1.2, 2.5, 5.6], [0.55, 2.1, 0.1]], [17.5, [-1.2, 2.5, 5.6], [0.55, 2.1, 0.1]]],
      anim: function (t, s, K) {
        var m = mov(K, A4, t), Pc = YC + m.r + 0.16;
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo });
        if (t < 4) { K.marcar(s.polea, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Polea', [0, Pc + 0.2, 0]); K.rotulo('Barra del pistón', [0, YC + m.r - 0.15, 0.06]); }
        else if (t < 8.5) { K.marcar(s.cuerdaObjs, 'foco'); K.rotulo('Amarre fijo', [-0.2, 0.5, 0.07]); K.rotulo('Polea', [0, Pc + 0.2, 0]); K.rotulo('A la cabina', [PR, pisoCab(m.r) - 0.07, 0.05]); }
        else if (t < 13) {
          K.marcar(s.polea, 'foco'); K.rotulo(m.flujo > 0 ? 'Sube y gira' : m.flujo < 0 ? 'Baja y gira' : 'Polea', [0, Pc + 0.2, 0]);
          K.tabla([['BARRA', m.flujo > 0 ? 'SUBE' : m.flujo < 0 ? 'BAJA' : 'QUIETA', 'ac'], ['POLEA', m.flujo ? 'GIRA' : 'QUIETA', 'ac']]);
        } else {
          var d = flechas(s, m.r, R0 + 0.25);
          if (d > 0.06) { K.rotulo('Polea', [-0.4, YC + m.r - d / 2, 0.12]); K.rotulo('Cabina: el doble', [1.75, pisoCab(m.r) - d, 0.72]); }
          K.tabla([['LA POLEA SUBIÓ', cm(d), 'ac'], ['LA CABINA SUBIÓ', cm(2 * d), 'ac']]);
        }
      }
    },
    falla: {
      dur: 18.5,
      subt: [[0, 'Falla 1: rodamiento gastado. La polea ronca y vibra cuando la cabina sube y baja.'],
        [5, 'Falla 2: canales gastados. Los cables se comen de un lado y duran mucho menos.'],
        [9.5, 'Si los cables se aflojan, un contacto detiene el ascensor para que no se salgan de la polea.'],
        [14, 'Arreglo: con el ascensor asegurado, el técnico engrasa o cambia el rodamiento y revisa cada cable.']],
      cam: [[0, [-0.85, 3.0, 1.6], [0.05, 2.6, 0]], [5, [-0.85, 3.1, 1.55], [0.05, 2.72, 0]], [9.5, [-1.3, 2.55, 2.6], [0.2, 2.2, 0.05]], [14, [-1.3, 2.55, 2.6], [0.2, 2.2, 0.05]], [18.5, [-0.9, 3.0, 1.8], [0.05, 2.6, 0]]],
      anim: function (t, s, K) {
        var RB = R0 + 0.45, m = mov(K, A4F, t), r = m.r, cf = null, fl = 0, sen = m.flujo;
        if (t >= 9.5) { var b = K.ph(t, 10, 11.2) * (1 - K.ph(t, 14, 15)); r = RB - 0.08 * b; cf = pisoCab(RB); fl = 0.23 * Math.sqrt(b); sen = K.entre(t, 10, 11.2) ? -1 : K.entre(t, 14, 15) ? 1 : 0; }
        estado(s, K, { r: r, cf: cf, flojo: fl, fase: KF * r, flujo: sen, bamboleo: t < 5 ? 0.05 * Math.sin(t * 26) : 0 });
        if (t < 5) { K.marcar(s.polea, K.parpadeo(t, 2) ? 'mal' : null); ondas(s, t); K.rotulo('Rodamiento gastado', [0, YC + r + 0.16, 0.06]); K.tabla([['POLEA', 'RONCA Y VIBRA', 'mal']]); }
        else if (t < 9.5) { K.marcar(s.polea, 'mal'); K.marcar(s.cuerdaObjs, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Canales gastados', [PR * 0.7, YC + r + 0.3, 0.04]); K.tabla([['CANALES', 'GASTADOS', 'mal'], ['CABLES', 'SE GASTAN RÁPIDO', 'mal']]); }
        else if (t < 14) {
          K.rotulo('Contacto de cable flojo', [0.2, pisoCab(RB) - 0.16, 0.08]);
          if (t > 10.6) { K.marcar(s.contacto, K.parpadeo(t, 2) ? 'mal' : null); K.marcar(s.cuerdasD, 'mal'); K.rotulo('Cables flojos', [PR - fl * 0.3, (YC + r + 0.16 + pisoCab(RB)) / 2, -fl]); K.aviso('Cables flojos: ascensor detenido'); }
        } else { K.marcar(s.polea, 'foco'); K.aviso('Ascensor asegurado', false); K.tabla([['RODAMIENTO', 'ENGRASADO', 'ok'], ['CABLES', 'EN SU CANAL', 'ok']]); }
      }
    }
  });

  // ===== 5. válvula paracaídas =====
  var A5 = [[0, R0 + 0.3], [4.2, R0 + 0.3], [6.2, R0 + 0.42], [6.6, R0 + 0.42], [8.6, R0 + 0.3]];
  var A5F = [[0, R0 + 0.55], [0.6, R0 + 0.55], [3.0, R0 + 0.38], [5.5, R0 + 0.38], [6.2, R0 + 0.38], [9.8, R0 + 0.02]];
  var VALV = [0.05, 0.36, 0.25];
  V3.escena('hid_rotura', ['valvula_rotura'], {
    fov: 34, poster: 10, construir: armar,
    funciona: {
      dur: 17.5,
      subt: [[0, 'La válvula paracaídas va pegada al pie del pistón, justo donde entra la manguera.'],
        [4, 'Cuando el ascensor sube o baja normal, deja pasar el aceite sin estorbar.'],
        [8.5, 'Si la manguera revienta, el aceite escapa muy rápido. Ese tirón cierra la válvula de golpe.'],
        [13, 'El aceite queda encerrado en el pistón y la cabina se queda quieta. Funciona sola, sin luz.']],
      cam: [[0, [-0.5, 0.62, 0.95], [0, 0.3, 0.18]], [4, [-0.55, 0.65, 1.05], [-0.05, 0.3, 0.2]], [8.5, [-0.8, 0.95, 1.8], [-0.25, 0.25, 0.38]], [12, [-0.8, 0.95, 1.8], [-0.25, 0.25, 0.38]], [13.5, [-0.35, 0.7, 0.9], [0, 0.3, 0.18]], [17.5, [-0.45, 0.68, 0.95], [0, 0.3, 0.18]]],
      anim: function (t, s, K) {
        var m = mov(K, A5, t), tap = K.ph(t, 9.05, 9.3), o = { r: m.r, fase: m.fase, flujo: m.flujo, tapon: tap };
        if (t >= 9) { o.r = R0 + 0.3 - 0.035 * K.ph(t, 9, 9.3); o.flujo = t < 9.3 ? -1 : 0; o.fase = -3.5 * (t - 9); o.tramo = [UB, 1]; }
        estado(s, K, o);
        if (t >= 9) { chorro(s, K, t, s.pRev, t < 11.8, 1 - 0.75 * K.ph(t, 9.6, 11.8)); charco(s, s.pRev.x, s.pRev.z + 0.08, K.mix(0.05, 0.38, K.ph(t, 9, 13))); }
        if (t < 4) { K.marcar(s.valvula, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Válvula paracaídas', VALV); K.rotulo('Manguera', s.cMan.getPointAt(0.95)); K.rotulo('Pistón', [-0.08, 0.7, 0.08]); }
        else if (t < 8.5) {
          K.rotulo(m.flujo > 0 ? 'Aceite entra al pistón' : m.flujo < 0 ? 'Aceite sale del pistón' : 'Válvula abierta', VALV);
          K.tabla([['VÁLVULA', 'ABIERTA', 'ok'], ['CABINA', m.flujo > 0 ? 'SUBE' : m.flujo < 0 ? 'BAJA' : 'QUIETA', 'ok']]);
        } else {
          if (t > 9) { K.marcar(s.tramo, 'mal'); K.rotulo('¡Revienta!', s.pRev); }
          if (t > 9.3) { K.marcar(s.valvula, 'foco'); K.rotulo('Se cierra sola', VALV); if (t < 13) K.aviso('La cabina se detuvo', false); }
          if (t >= 13) K.rotulo('Aceite encerrado', [-0.08, 0.75, 0.08]);
          K.tabla([['MANGUERA', t > 9 ? 'REVENTADA' : 'BIEN', t > 9 ? 'mal' : 'ok'], ['VÁLVULA', tap > 0.9 ? 'CERRADA' : 'ABIERTA', tap > 0.9 ? 'ok' : ''], ['CABINA', t < 9 ? 'QUIETA' : t < 9.3 ? 'CAE' : 'DETENIDA', t < 9 || t > 9.3 ? 'ok' : 'mal']]);
        }
      }
    },
    falla: {
      dur: 16,
      subt: [[0, 'Falla 1: se cierra sola al bajar muy rápido, con mucha carga o con el aceite caliente. La cabina se traba.'],
        [5.5, 'Falla 2: sucia o trabada, en la prueba no se cierra. Es peligroso: el ascensor queda fuera de servicio.'],
        [11, 'Arreglo: el técnico revisa la velocidad de bajada y limpia o cambia la válvula. Nunca se desregula.']],
      cam: [[0, [-0.6, 0.75, 1.15], [-0.05, 0.3, 0.2]], [5.5, [-0.7, 0.85, 1.35], [-0.05, 0.32, 0.22]], [11, [-0.6, 0.85, 1.35], [-0.05, 0.32, 0.2]], [16, [-0.65, 0.9, 1.5], [-0.05, 0.35, 0.22]]],
      anim: function (t, s, K) {
        var m = mov(K, A5F, t), tap = t < 5.5 ? K.ph(t, 2.85, 3.05) : t < 11 ? 0.12 * K.late(t, 3) * K.ph(t, 6.2, 6.5) : 0;
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, tapon: tap });
        if (t < 5.5) {
          if (t < 2.9) K.tabla([['CARGA', 'LLENA', 'ac'], ['ACEITE', 'CALIENTE', 'mal'], ['BAJADA', 'MUY RÁPIDA', 'mal']]);
          else { K.marcar(s.valvula, K.parpadeo(t, 2) ? 'mal' : null); K.aviso('Cabina trabada: no baja'); K.rotulo('Se cerró sin rotura', VALV); }
        } else if (t < 11) {
          K.marcar(s.valvula, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Trabada: no se cierra', VALV);
          K.tabla([['PRUEBA', 'BAJADA RÁPIDA', 'ac'], ['VÁLVULA', 'NO SE CIERRA', 'mal']]);
          if (t > 7) K.aviso('Peligro: fuera de servicio');
        } else {
          K.marcar(s.valvula, 'foco'); tecnico(s, TEC_FOSO[0], TEC_FOSO[1], TEC_FOSO[2], TEC_FOSO[3], t);
          K.aviso('Fuera de servicio hasta corregirla', false); K.tabla([['VÁLVULA', 'LIMPIA Y PROBADA', 'ok'], ['PRECINTO', 'PUESTO', 'ok']]);
        }
      }
    }
  });

  // ===== 6. manguera =====
  var A6 = [[0, R0 + 0.2], [4, R0 + 0.2], [8.3, R0 + 0.5], [8.7, R0 + 0.5], [12.5, R0 + 0.2]];
  V3.escena('hid_manguera', ['manguera'], {
    fov: 34, poster: 6, construir: armar,
    funciona: {
      dur: 17,
      subt: [[0, 'La manguera es el tubo negro y grueso que une la central con el pistón.'],
        [4, 'Para subir, la bomba manda el aceite por la manguera, con mucha presión, hasta el pistón.'],
        [8.5, 'Para bajar, el mismo aceite regresa por la misma manguera hasta el tanque.'],
        [12.5, 'Va bien sujeta con abrazaderas, sin dobleces y sin rozar con filos.']],
      cam: [[0, [-0.8, 2.05, 3.7], [-0.95, 1.0, 0.35]], [4, [-0.65, 2.1, 3.75], [-0.95, 1.0, 0.35]], [8.5, [-1.3, 1.95, 3.6], [-0.95, 0.95, 0.35]], [12.5, [-0.45, 1.15, 2.2], [-0.6, 0.35, 0.45]], [17, [-0.4, 1.1, 2.15], [-0.6, 0.35, 0.45]]],
      anim: function (t, s, K) {
        var on = function (x) { return pulso(K, x, 4.1, 8.4); }, m = mov(K, A6, t), mo = on(t);
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, motor: K.integ(on, t) * 10, bob: [mo > 0.5, m.flujo < 0], aguja: 0.45 + 0.3 * mo });
        if (t < 4) { K.marcar(s.manguera, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Central', [XT + 0.2, 1.75, 0.4]); K.rotulo('Manguera', s.cMan.getPointAt(0.45)); K.rotulo('Pistón', [0.08, 1.2, 0.1]); }
        else if (t < 8.5) K.rotulo('Aceite hacia el pistón', s.cMan.getPointAt(0.62));
        else if (t < 12.5) K.rotulo('Aceite de vuelta al tanque', s.cMan.getPointAt(0.35));
        else { K.marcar(s.abraz, 'foco'); K.rotulo('Abrazadera', s.abraz[1]); K.rotulo('Abrazadera', s.abraz[2]); }
        if (t >= 4 && t < 12.5) K.tabla([['ACEITE', m.flujo > 0 ? 'VA AL PISTÓN' : m.flujo < 0 ? 'VUELVE AL TANQUE' : 'QUIETO', 'ac'], ['CABINA', m.flujo > 0 ? 'SUBE' : m.flujo < 0 ? 'BAJA' : 'QUIETA', 'ok']]);
      }
    },
    falla: {
      dur: 19.5,
      subt: [[0, 'Falla 1: unión floja. Gotea aceite por la punta de la manguera y se forma una mancha en el piso.'],
        [5, 'Falla 2: manguera vieja, cuarteada o rozada. Con la presión puede reventar.'],
        [10.5, 'Si revienta, la válvula del pistón se cierra y la cabina se detiene. No toques el chorro: aléjate y avisa.'],
        [15, 'Arreglo: con la luz cortada y sin presión, el técnico cambia la manguera entera. Nunca se parcha.']],
      cam: [[0, [-0.45, 0.62, 1.2], [-0.02, 0.22, 0.35]], [4.6, [-0.5, 0.65, 1.3], [-0.05, 0.2, 0.38]], [5.6, [-0.9, 0.9, 1.9], [-0.4, 0.15, 0.5]], [10.5, [-0.9, 0.95, 1.95], [-0.3, 0.2, 0.42]], [15, [-0.7, 1.7, 3.1], [-0.75, 0.6, 0.4]], [19.5, [-0.7, 1.7, 3.1], [-0.75, 0.6, 0.4]]],
      anim: function (t, s, K) {
        var tap = K.ph(t, 8.65, 8.9) * (1 - K.ph(t, 15, 15.5)), o = { r: t < 8.6 ? R0 + 0.3 : R0 + 0.3 - 0.03 * K.ph(t, 8.6, 8.9), tapon: tap };
        if (K.entre(t, 8.6, 8.9)) { o.flujo = -1; o.fase = -3.5 * (t - 8.6); o.tramo = [UB, 1]; }
        estado(s, K, o);
        if (t < 5) {
          goteo(s, K, t, 0, 3, [0, 0.29, 0.3], 0.01, 0.9); charco(s, 0, 0.36, K.mix(0.04, 0.2, K.ph(t, 0, 4.5)));
          K.marcar(s.tuerca, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Unión floja', s.tuerca); K.rotulo('Mancha de aceite', [0.12, 0.0, 0.42]);
        } else if (t < 15) {
          s.grietas.visible = true;
          if (t < 8.6) { K.marcar(s.tramo, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Cuarteada y rozada', s.pRev); K.tabla([['MANGUERA', 'VIEJA', 'mal'], ['PRESIÓN', 'ALTA', 'ac']]); }
          else {
            K.marcar(s.tramo, 'mal'); chorro(s, K, t, s.pRev, t < 12.5, 1 - 0.7 * K.ph(t, 9.5, 12.5)); charco(s, s.pRev.x, s.pRev.z + 0.1, K.mix(0.05, 0.4, K.ph(t, 8.6, 12)));
            K.rotulo('¡Revienta!', s.pRev);
            if (t > 8.9) { K.marcar(s.valvula, 'foco'); K.rotulo('Válvula paracaídas: cerrada', VALV); }
            if (t >= 10.5) K.aviso('No toques el chorro: aléjate y avisa');
            K.tabla([['VÁLVULA DEL PISTÓN', t > 8.9 ? 'CERRADA' : 'ABIERTA', t > 8.9 ? 'ok' : ''], ['CABINA', t > 8.9 ? 'DETENIDA' : 'CAE', t > 8.9 ? 'ok' : 'mal']]);
          }
        } else {
          K.marcar(s.manguera, 'foco'); tecnico(s, -1.5, 1.1, 0.95, PI / 2, t);
          K.aviso('Luz cortada y sin presión', false); K.tabla([['MANGUERA', 'NUEVA', 'ok'], ['UNIONES', 'AJUSTADAS', 'ok']]);
        }
      }
    }
  });

  // ===== 7. recolector de aceite =====
  var A7 = [[0, R0 + 0.35], [3.8, R0 + 0.35], [6.2, R0 + 0.6], [6.6, R0 + 0.6], [9.0, R0 + 0.3]];
  var FOSO = [[-1.2, 1.6, 3.05], [0.12, 1.0, 0.15]];
  V3.escena('hid_recolector', ['recoge_aceite'], {
    fov: 34, poster: 7, construir: armar,
    funciona: {
      dur: 17,
      subt: [[0, 'El recolector es un aro amarillo en la boca del pistón, alrededor de la barra brillante.'],
        [4, 'Cuando la barra sale, saca una capa finita de aceite. Al volver, ese aceite escurre hacia el aro.'],
        [8.5, 'El aro lo junta y lo manda por una manguerita hasta una botella en el foso.'],
        [13, 'Si la botella tarda meses en llenarse, los sellos están bien.']],
      cam: [[0, [-0.5, 2.15, 0.85], [0.02, 1.82, 0.05]], [4, [-0.55, 2.3, 0.95], [0.02, 1.98, 0.05]], [8.5, [-0.95, 1.45, 2.0], [0.15, 0.95, 0.15]], [13, [-0.6, 0.7, 1.3], [0.25, 0.25, 0.2]], [17, [-0.65, 0.75, 1.35], [0.25, 0.28, 0.2]]],
      anim: function (t, s, K) {
        var m = mov(K, A7, t);
        estado(s, K, { r: m.r, fase: m.fase, flujo: m.flujo, botella: 0.12 + 0.05 * K.ph(t, 9, 13) });
        if (t > 6.2 && t < 13) goteo(s, K, t, 0, 3, [-0.042, YC + 0.22, 0.042], YC - 0.02, 0.45);
        if (t > 8.5 && t < 14) tuboGotas(s, t, 0.3, 5);
        if (t < 4) { K.marcar(s.anillo, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo('Recolector (aro)', [-0.1, 1.79, 0.12]); K.rotulo('Barra', [0, YC + m.r - 0.1, 0.06]); }
        else if (t < 8.5) { K.marcar(s.anillo, 'foco'); K.rotulo('Barra con aceite', [0, YC + Math.min(0.3, m.r - 0.05), 0.06]); if (t > 6.2) K.rotulo('Escurre al aro', [-0.042, YC + 0.06, 0.042]); }
        else if (t < 13) { K.marcar([s.tubo, s.botella], 'foco'); K.rotulo('Manguerita', s.cTubo.getPointAt(0.5)); K.rotulo('Botella', [0.33, 0.28, 0.24]); }
        else { K.marcar(s.botella, 'foco'); K.rotulo('Casi vacía: sellos bien', [0.33, 0.2, 0.24]); K.tabla([['BOTELLA', 'CASI VACÍA', 'ok'], ['SELLOS', 'BIEN', 'ok']]); }
      }
    },
    falla: {
      dur: 16,
      subt: [[0, 'Falla 1: la botella se llena en pocas semanas. Los sellos de la boca del pistón están gastados.'],
        [5.5, 'Falla 2: la manguerita se tapa o la botella rebalsa. El aceite chorrea y ensucia el foso.'],
        [11, 'Arreglo: con el ascensor bloqueado, el técnico vacía la botella, destapa la manguerita y cambia los sellos.']],
      cam: [[0, FOSO[0], FOSO[1]], [5.5, [-1.25, 1.55, 3.0], [0.1, 0.95, 0.15]], [11, [-1.1, 1.4, 2.7], [0.1, 0.85, 0.15]], [16, [-1.1, 1.4, 2.7], [0.1, 0.85, 0.15]]],
      anim: function (t, s, K) {
        var r = t < 11 ? R0 + 0.35 + 0.22 * (0.5 - 0.5 * Math.cos(t * 1.3)) : R0 + 0.35, v = t < 11 ? Math.sin(t * 1.3) : 0;
        estado(s, K, { r: r, fase: KF * r, flujo: Math.abs(v) > 0.05 ? (v > 0 ? 1 : -1) : 0, botella: t < 5.5 ? K.mix(0.2, 0.95, K.ph(t, 0, 5.3)) : t < 11 ? 1 : 0.02 });
        if (t < 11) goteo(s, K, t, 0, 4, [-0.042, YC + 0.2, 0.042], YC - 0.02, 0.9);
        if (t < 5.5) {
          tuboGotas(s, t, 0.7, 6); K.marcar(s.cabeza, K.parpadeo(t, 2) ? 'mal' : null); K.marcar(s.botella, 'mal');
          K.rotulo('Sellos gastados', [0, 1.82, 0.12]); K.rotulo('Se llena rápido', [0.33, 0.28, 0.24]);
          K.tabla([['BOTELLA', 'LLENA EN 2 SEMANAS', 'mal'], ['SELLOS', 'GASTADOS', 'mal']]);
        } else if (t < 11) {
          K.marcar(s.tubo, K.parpadeo(t, 2) ? 'mal' : null); K.marcar(s.botella, 'mal');
          goteo(s, K, t, 4, 4, [-0.108, 1.75, 0.108], 0.01, 0.8); chorreo(s, K.mix(0.1, 1.5, K.ph(t, 5.5, 9))); charco(s, 0, 0, K.mix(0.22, 0.48, K.ph(t, 5.5, 10.5)));
          K.rotulo('Manguerita tapada', s.cTubo.getPointAt(0.45)); K.rotulo('Rebalsa y chorrea', [-0.1, 1.3, 0.1]);
          K.tabla([['MANGUERITA', 'TAPADA', 'mal'], ['FOSO', 'CON ACEITE', 'mal']]);
        } else {
          K.marcar([s.tubo, s.anillo], 'foco'); tecnico(s, TEC_FOSO[0], TEC_FOSO[1], TEC_FOSO[2], TEC_FOSO[3], t);
          K.aviso('Ascensor bloqueado', false); K.rotulo('Aceite usado: no va al desagüe', [0.33, 0.28, 0.24], 'izq');
          K.tabla([['BOTELLA', 'VACÍA', 'ok'], ['MANGUERITA', 'LIBRE', 'ok']]);
        }
      }
    }
  });
})();
