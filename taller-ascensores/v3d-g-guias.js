/* Taller de Ascensores — videos 3D: guías, zapatas, bastidor y lo fijo del hueco
   (soportes, luz del hueco, gancho de izaje y pantalla del contrapeso).
   Mismo formato que v3d-maquina.js. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  // ---------- textos sencillos ----------
  S.bastidor = {
    que: 'Es el esqueleto de acero de la cabina: dos columnas a los lados, una viga arriba y otra abajo.',
    sirve: 'Carga la cabina, se amarra a los cables y lleva las zapatas y el paracaídas que corren por las guías.',
    falla: 'Si sus tacos de goma se vencen o tiene pernos flojos, la cabina vibra, suena a lata o queda inclinada.',
    arreglo: 'Con la cabina vacía y asegurada, el técnico cambia los tacos, ajusta los pernos y nivela la plataforma.'
  };
  S.rozaderas = {
    que: 'Son piezas en forma de U, con un forro de plástico duro, que abrazan la guía en las esquinas del bastidor.',
    sirve: 'Mantienen la cabina derecha en su carril para que no se balancee ni roce las paredes del hueco.',
    falla: 'Cuando el forro se gasta, la cabina se bambolea y da golpecitos; si llega al metal, chirría y raya la guía.',
    arreglo: 'Con el ascensor detenido, se cambian los forros gastados y se revisa que la guía tenga su aceite.'
  };
  S.rodaderas = {
    que: 'Son juegos de tres ruedas con resorte que abrazan la guía: una por el frente y dos por los costados.',
    sirve: 'Llevan la cabina derecha rodando en vez de resbalar; así el viaje es más suave y callado.',
    falla: 'Si una rueda se aplana o se malogra su rulemán, suena tac-tac o zumba más fuerte mientras más rápido va.',
    arreglo: 'Con el ascensor detenido, se cambia la rueda dañada, se regulan los resortes y la guía se deja seca y limpia.'
  };
  S.aceiteras = {
    que: 'Es un vasito con aceite y una mecha de fieltro, montado encima de la zapata y pegado a la guía.',
    sirve: 'Deja la guía apenas mojada con aceite para que las zapatas resbalen sin chillar ni gastarse.',
    falla: 'Si se queda vacía o la mecha se seca, la guía chirría; si está rajada, el aceite chorrea al foso.',
    arreglo: 'El técnico la rellena con el aceite indicado, cambia la mecha si está dura y limpia lo que se chorreó.'
  };
  S.guias_cabina = {
    que: 'Son dos rieles de acero en forma de T, uno a cada lado de la cabina, desde el foso hasta arriba.',
    sirve: 'Son el carril de la cabina: la llevan derecha al subir y bajar. En una emergencia, el paracaídas las muerde.',
    falla: 'Si una unión queda salida, la cabina da un golpe siempre en el mismo punto; si están secas, chirrían.',
    arreglo: 'Con el ascensor detenido, el técnico alinea la unión, ajusta los pernos y deja la guía limpia.'
  };
  S.guias_contrapeso = {
    que: 'Son dos rieles en T más delgados y más juntos, pegados al muro, por donde corre el contrapeso.',
    sirve: 'Llevan derecho al contrapeso para que no se balancee ni golpee el muro o la cabina al cruzarse.',
    falla: 'Con zapatas gastadas o guías torcidas, el contrapeso baila y traquetea; si están secas, chirrían.',
    arreglo: 'Con el ascensor detenido, se cambian las zapatas, se alinean y ajustan las guías y se revisa su aceitera.'
  };
  S.fijaciones = {
    que: 'Son los soportes de acero que sujetan la guía al muro y las platinas que unen un tramo de guía con otro.',
    sirve: 'Mantienen la guía firme y derecha en todo el hueco, con un soporte más o menos cada metro y medio.',
    falla: 'Un soporte flojo hace vibrar la cabina en un tramo; una unión mal hecha da un golpe siempre en el mismo sitio.',
    arreglo: 'Con el ascensor detenido, se ajustan los pernos y se deja la unión pareja. Después de un sismo, se revisa todo.'
  };
  S.iluminacion_hueco = {
    que: 'Son lámparas fijas en una pared del hueco, desde el foso hasta arriba, con su propio interruptor.',
    sirve: 'Alumbran el hueco para que el técnico vea dónde pisa y qué toca cuando trabaja adentro.',
    falla: 'Una lámpara quemada deja un tramo a oscuras; si entra agua en el foso, salta su llave y se apaga todo.',
    arreglo: 'Con su llave bajada, se cambia la lámpara, se seca y cierra bien su tapa y se prueban los interruptores.'
  };
  S.gancho_izaje = {
    que: 'Es un gancho de acero muy fuerte en el techo, encima de la máquina, pintado de amarillo.',
    sirve: 'De él se cuelga un tecle (aparejo de cadena) para subir o bajar la máquina y otras piezas pesadas.',
    falla: 'Si no se lee cuánto aguanta, tiene óxido o el techo alrededor está rajado, no se debe usar.',
    arreglo: 'Lo revisa un especialista y se marca su carga. Nunca se cuelga más peso del escrito, ni personas.'
  };
  S.pantalla_contrapeso = {
    que: 'Es una reja amarilla en el foso, delante del camino por donde baja el contrapeso.',
    sirve: 'Separa al técnico del contrapeso, que baja casi hasta el piso del foso sin hacer ruido.',
    falla: 'Si la sacaron y no la pusieron, el camino queda abierto; si está floja, el contrapeso la roza y suena.',
    arreglo: 'Se repone y se ajustan sus pernos, separada del contrapeso. Siempre debe estar puesta antes de entrar al foso.'
  };

  // ---------- piezas comunes ----------
  // zapata en U para una guía cuya hoja apunta hacia +x local (la punta de la hoja en x = 0);
  // para el lado contrario se voltea con scale.x = -1. Devuelve { g, forros, forroPunta }.
  function zapataU(K, forro, alto) {
    var M = K.M, h = alto || 0.13, g = new K.T.Group();
    g.add(K.caja(0.035, h, 0.1, M.hierro, 0.03, 0, 0));
    g.add(K.caja(0.05, h, 0.012, M.hierro, -0.012, 0, 0.016), K.caja(0.05, h, 0.012, M.hierro, -0.012, 0, -0.016));
    var f1 = K.caja(0.046, h * 0.92, 0.006, forro, -0.012, 0, 0.0105), f2 = K.caja(0.046, h * 0.92, 0.006, forro, -0.012, 0, -0.0105);
    var fp = K.caja(0.006, h * 0.92, 0.03, forro, 0.004, 0, 0);
    g.add(f1, f2, fp);
    return { g: g, forros: [f1, f2, fp] };
  }
  // la iluminación general de la escena (para oscurecer el hueco)
  function lucesDe(K) {
    var L = [];
    K.sc.children.forEach(function (o) { if (o.isLight) L.push({ l: o, i: o.intensity }); });
    return L;
  }
  function atenuar(L, k) { L.forEach(function (x) { x.l.intensity = x.i * k; }); }
  // cámara distinta según la pieza que se está viendo: tabla[id] = [claves de «funciona», claves de «falla»]
  function camaraPorPieza(tabla) {
    return function (s, cap, t, dur, pos, mira) {
      var c = (tabla[s.id] || tabla._)[cap], K = s.K;
      K.kfv(t, c.map(function (k) { return [k[0], k[1]]; }), pos); K.kfv(t, c.map(function (k) { return [k[0], k[2]]; }), mira);
    };
  }
  // SUBE / BAJA / PARADA según cómo cambia una altura con el tiempo
  function rumbo(K, claves, t) { var d = K.kf(t + 0.05, claves) - K.kf(t - 0.05, claves); return d > 0.004 ? 'SUBE' : d < -0.004 ? 'BAJA' : 'PARADA'; }
  function rapidez(K, claves, t) { return Math.abs(K.kf(t + 0.05, claves) - K.kf(t - 0.05, claves)) * 10; }

  // ---------- hueco con las guías de cabina y las del contrapeso ----------
  var JY = 4.0, CPX = 0.4, CPZ = -1.1, CP0 = 4.7;   // unión de la guía izquierda, guías y altura del contrapeso
  // soporte de una guía de cabina contra el muro lateral (dir -1 izquierda, +1 derecha)
  function soporteLat(K, dir, y) {
    var M = K.M, x0 = dir * 0.76, g = new K.T.Group();
    g.add(K.caja(0.024, 0.1, 0.13, M.aceroOsc, x0 + dir * 0.058, y, 0));
    g.add(K.caja(0.17, 0.08, 0.1, M.aceroOsc, dir * 0.915, y, 0));
    g.add(K.caja(0.012, 0.16, 0.18, M.aceroOsc, dir * 0.994, y, 0));
    g.add(K.cil(0.012, 0.02, M.acero, dir * 0.985, y + 0.055, 0.06, 'x', 8), K.cil(0.012, 0.02, M.acero, dir * 0.985, y - 0.055, -0.06, 'x', 8));
    g.add(K.caja(0.014, 0.05, 0.03, M.hierro, x0 + dir * 0.027, y, 0.05), K.caja(0.014, 0.05, 0.03, M.hierro, x0 + dir * 0.027, y, -0.05));
    return K.add(g);
  }
  function armarHueco(K, id) {
    var M = K.M, T = K.T, s = { id: id, K: K };
    var vidrio = K.mat(0xc3c8cc, { transparent: true, opacity: 0.1, depthWrite: false }), muro = K.mat(0x5a6269, { roughness: 0.95, metalness: 0 });
    K.add(K.caja(2.12, 10.4, 0.06, muro, 0, 4.7, -1.45));
    K.add(K.caja(0.06, 10.4, 2.5, muro, -1.03, 4.7, -0.2));
    K.add(K.caja(0.06, 10.4, 2.5, vidrio, 1.03, 4.7, -0.2));
    K.add(K.caja(2.12, 0.08, 2.5, K.mat(0x4a5056, { roughness: 0.95, metalness: 0 }), 0, -0.54, -0.2));
    // guías de cabina: la izquierda en dos tramos, unidos en JY con una platina atornillada
    s.oxido = K.mat(0x8a4b22, { roughness: 1, metalness: 0, transparent: true, opacity: 0 });
    s.abajo = K.add(K.riel(JY + 0.5)); s.abajo.position.set(-0.76, -0.5, 0); s.abajo.rotation.y = PI / 2;
    s.arriba = K.add(K.riel(9.6 - JY)); s.arriba.position.set(-0.76, JY, 0); s.arriba.rotation.y = PI / 2;
    s.oxM = K.caja(0.019, 3.2, 0.068, s.oxido, 0, 1.6, 0.001); s.arriba.add(s.oxM);
    s.der = K.add(K.riel(10)); s.der.position.set(0.76, -0.5, 0); s.der.rotation.y = -PI / 2;
    s.guiasCab = [s.abajo, s.arriba, s.der];
    s.platina = K.add(K.caja(0.014, 0.4, 0.1, M.hierro, -0.813, JY, 0));
    s.marcaUnion = K.add(K.caja(0.13, 0.12, 0.13, K.matB(0xff3b30, { transparent: true, opacity: 0.35, depthWrite: false }), -0.75, JY, 0));
    s.pernos = [];
    [-0.15, -0.07, 0.07, 0.15].forEach(function (dy) { [-0.03, 0.03].forEach(function (z) { s.pernos.push(K.add(K.cil(0.007, 0.012, M.acero, -0.789, JY + dy, z, 'x', 8))); }); });
    s.soportes = [];
    [0.3, 1.8, 3.3, 4.8, 6.3, 7.8].forEach(function (y) { s.soportes.push(soporteLat(K, -1, y), soporteLat(K, 1, y)); });
    // guías del contrapeso: más delgadas y juntas, en el muro del fondo
    s.oxidoCp = K.mat(0x8a4b22, { roughness: 1, metalness: 0, transparent: true, opacity: 0 });
    s.guiasCp = [-1, 1].map(function (d) {
      var r = K.add(K.riel(10)); r.scale.set(0.7, 1, 0.7); r.position.set(d * CPX, -0.5, CPZ); r.rotation.y = -d * PI / 2;
      [0.3, 1.8, 3.3, 4.8, 6.3, 7.8].forEach(function (y) { K.add(K.caja(0.02, 0.08, 0.34, M.aceroOsc, d * (CPX + 0.045), y, -1.25)); });
      return r;
    });
    s.oxCpM = K.caja(0.019, 6, 0.068, s.oxidoCp, 0, 4, 0.001); s.guiasCp[1].add(s.oxCpM);
    // contrapeso con sus zapatas y aceiteras
    s.cp = K.add(new T.Group());
    s.cp.add(K.caja(0.05, 1.6, 0.12, M.aceroOsc, -0.33, 0.8, 0), K.caja(0.05, 1.6, 0.12, M.aceroOsc, 0.33, 0.8, 0));
    s.cp.add(K.caja(0.66, 0.1, 0.12, M.aceroOsc, 0, 1.55, 0), K.caja(0.66, 0.1, 0.12, M.aceroOsc, 0, 0.05, 0), K.caja(0.12, 0.06, 0.08, M.hierro, 0, 1.63, 0));
    for (var i = 0; i < 12; i++) s.cp.add(K.caja(0.6, 0.1, 0.1, i % 2 ? M.pesa2 : M.pesa, 0, 0.16 + i * 0.105, 0));
    s.forro = K.mat(0xf2f0e6, { roughness: 0.7, metalness: 0 });
    s.zapCp = [];
    [[-1, 1.52], [1, 1.52], [-1, 0.08], [1, 0.08]].forEach(function (q) {
      var z = zapataU(K, s.forro, 0.09); z.g.scale.set(q[0] * 0.7, 1, 0.7); z.g.position.set(q[0] * 0.3755, q[1], 0); s.cp.add(z.g); s.zapCp.push(z.g);
      if (q[1] > 1) s.cp.add(K.cil(0.02, 0.045, M.cobre, q[0] * 0.372, 1.62, 0, null, 12), K.caja(0.012, 0.03, 0.01, M.blanco, q[0] * 0.38, 1.585, 0));
    });
    // cabina con su bastidor, zapatas y paracaídas
    var c = s.car = K.add(new T.Group());
    s.bastidor = K.add(K.grupo([K.caja(0.08, 3.13, 0.14, M.aceroOsc, -0.64, 1.315, 0), K.caja(0.08, 3.13, 0.14, M.aceroOsc, 0.64, 1.315, 0),
      K.caja(1.36, 0.16, 0.16, M.aceroOsc, 0, 2.62, 0), K.caja(1.36, 0.14, 0.16, M.aceroOsc, 0, -0.19, 0)]), c);
    K.add(K.caja(1.16, 0.1, 1.26, M.aceroOsc, 0, -0.05, 0), c);
    K.add(K.caja(1.1, 2.2, 1.2, M.panel || M.inox, 0, 1.1, 0), c);
    K.add(K.caja(0.8, 2.0, 0.02, M.inox, 0, 1.0, 0.61), c);
    K.add(K.caja(0.2, 0.08, 0.1, M.hierro, 0, 2.74, 0), c);
    s.zap = [];
    [[-1, 2.8], [1, 2.8], [-1, -0.19], [1, -0.19]].forEach(function (q) {
      var z = zapataU(K, s.forro); z.g.position.set(q[0] * 0.725, q[1], 0); if (q[0] > 0) z.g.scale.x = -1; K.add(z.g, c); s.zap.push(z.g);
    });
    s.paracaidas = [-1, 1].map(function (d) {
      return K.add(K.grupo([K.caja(0.04, 0.17, 0.11, M.hierro, d * 0.69, 0.08, 0), K.caja(0.07, 0.17, 0.02, M.hierro, d * 0.74, 0.08, 0.022), K.caja(0.07, 0.17, 0.02, M.hierro, d * 0.74, 0.08, -0.022),
        K.caja(0.05, 0.04, 0.04, M.amarillo, d * 0.69, 0.18, 0.05)]), c);
    });
    s.cables = [0, 1, 2, 3].map(function () { return K.add(K.cable(0.006, M.hierro)); });
    s.cablesCp = [0, 1, 2, 3].map(function () { return K.add(K.cable(0.006, M.hierro)); });
    s.chispas = K.add(K.chispas(16)); s.chispas2 = K.add(K.chispas(16));
    return s;
  }
  function huecoPone(s, K, o) {
    var y = o.y, cy = CP0 - y, cx = o.cpX || 0;
    s.car.position.set(o.carX || 0, y, 0); s.car.rotation.z = -(o.incl || 0);
    s.cp.position.set(cx, cy, CPZ); s.cp.rotation.z = o.cpRz || 0;
    s.arriba.position.x = -0.76 + (o.paso || 0); s.marcaUnion.visible = !!o.marcaUnion;
    s.oxido.opacity = o.ox || 0; s.oxM.visible = (o.ox || 0) > 0.01;
    s.oxidoCp.opacity = o.oxCp || 0; s.oxCpM.visible = (o.oxCp || 0) > 0.01;
    s.cables.forEach(function (c, i) { var x = -0.045 + i * 0.03; c.pon([x, y + 2.78, 0], [x, 9.9, 0]); });
    s.cablesCp.forEach(function (c, i) { var x = -0.045 + i * 0.03; c.pon([x + cx, cy + 1.66, CPZ], [x, 9.9, CPZ]); });
    if (!o.chis) s.chispas.emitir(0, [0, 0, 0], false);
    if (!o.chis2) s.chispas2.emitir(0, [0, 0, 0], false);
  }
  var CAB_F = [[0, 0], [1, 0], [4.5, 1.6], [9, 2.6], [12.5, 0.6], [18, 0.6]];
  var CP_F = [[0, 0], [3, 0], [12, 2.6], [14, 2.6], [18, 1.8]];
  var CAB_X = [[0, 0.2], [2.5, 0.2], [8.5, 2.2], [9.5, 2.2], [13.5, 1.5], [15, 1.5], [18, 0.5]];
  var CP_X = [[0, 0.6], [1, 0.6], [8, 2.2], [9.5, 2.2], [13.5, 1.0], [15, 1.0], [18, 1.6]];
  V3.escena('guias-hueco', ['guias_cabina', 'guias_contrapeso'], {
    fov: 36,
    poster: 3,
    construir: function (K, id) { return armarHueco(K, id); },
    camara: camaraPorPieza({
      guias_cabina: [
        [[0, [-0.42, 9.95, 0.5], [-0.76, 9.45, 0]], [1.8, [-0.42, 9.95, 0.5], [-0.76, 9.45, 0]], [4, [1.6, 5.6, 3.8], [-0.3, 3.6, -0.2]], [5.2, [-0.5, 4.95, 0.62], [-0.73, 4.48, 0]], [9, [-0.5, 5.85, 0.62], [-0.73, 5.4, 0]],
          [10.5, [2.4, 4.6, 5.0], [-0.2, 2.8, -0.3]], [12.5, [2.4, 3.8, 5.0], [-0.2, 2.2, -0.3]], [14.2, [-0.5, 1.1, 1.3], [-0.72, 0.6, 0]], [18, [-0.46, 1.15, 1.4], [-0.72, 0.6, 0]]],
        [[0, [-0.55, 4.45, 0.9], [-0.74, 4.02, 0]], [8.5, [-0.55, 4.45, 0.9], [-0.74, 4.02, 0]], [9.8, [-0.5, 5.45, 0.75], [-0.74, 5.02, 0]], [13.5, [-0.5, 4.75, 0.75], [-0.74, 4.32, 0]],
          [15, [-0.3, 4.5, 1.7], [-0.7, 3.9, 0]], [18, [-0.3, 4.2, 1.7], [-0.7, 3.6, 0]]]
      ],
      guias_contrapeso: [
        [[0, [0.6, 7.6, 2.4], [0, 5.0, -1.2]], [4, [0.8, 7.0, 2.6], [0, 4.6, -1.1]], [8, [2.6, 5.2, 1.6], [0, 3.8, -0.8]], [12, [2.6, 4.6, 1.6], [0, 3.4, -0.8]],
          [13.6, [0.95, 4.0, -0.45], [0.37, 3.62, -1.1]], [18, [0.95, 4.8, -0.45], [0.37, 4.42, -1.1]]],
        [[0, [2.4, 4.9, 1.0], [0, 4.0, -1.0]], [9, [2.4, 4.4, 1.0], [0, 3.5, -1.0]], [10, [0.95, 4.4, -0.45], [0.37, 4.05, -1.1]], [13.5, [0.95, 5.5, -0.45], [0.37, 5.2, -1.1]],
          [15, [2.4, 5.6, 1.2], [0, 4.4, -1.1]], [18, [2.4, 5.4, 1.2], [0, 4.2, -1.1]]]
      ]
    }),
    funciona: {
      dur: 18,
      subt: function (id) {
        return id === 'guias_contrapeso'
          ? [[0, 'El contrapeso también tiene sus guías: dos rieles más delgados y más juntos, pegados al muro del fondo.'],
            [4.5, 'Cuando la cabina sube, el contrapeso baja. Sus guías lo llevan derecho, sin balancearse.'],
            [9, 'Así no golpea el muro ni choca con la cabina cuando se cruzan a mitad del viaje.'],
            [13.5, 'El contrapeso las abraza con sus propias zapatas, más chicas, con una aceitera encima.']]
          : [[0, 'Las guías son dos rieles de acero en forma de T, uno a cada lado de la cabina, del foso hasta arriba.'],
            [4.5, 'La cabina va agarrada a ellas con sus zapatas: así sube y baja derecha, sin balancearse.'],
            [9, 'El peso lo cargan los cables. Las guías solo la dirigen, como los rieles de un tren puestos de pie.'],
            [13.5, 'En una emergencia, el paracaídas muerde la guía y frena la cabina. Por eso debe estar limpia y derecha.']];
      },
      anim: function (t, s, K, id) {
        var cp = id === 'guias_contrapeso', claves = cp ? CP_F : CAB_F, y = K.kf(t, claves), cy = CP0 - y;
        huecoPone(s, K, { y: y });
        var mov = rumbo(K, claves, t);
        if (!cp) {
          K.marcar(s.guiasCab, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.zap, K.entre(t, 4.5, 9) ? 'foco' : null);
          K.marcar(s.paracaidas, t >= 13.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.cables, K.entre(t, 9, 13.5) ? 'foco' : null);
          if (t < 2.6) K.rotulo('Forma de T', [-0.76, 9.5, 0.03]);
          else if (t < 4.5) { K.rotulo('Guía de cabina', [-0.74, 4.2, 0], 'izq'); K.rotulo('Guía de cabina', [0.74, 4.2, 0]); K.rotulo('Soporte', [-0.9, 3.34, 0.05], 'izq'); }
          else if (t < 9) { K.rotulo('Zapata', [-0.69, y + 2.8, 0.05]); K.rotulo('Guía', [-0.74, y + 3.1, 0], 'izq'); }
          else if (t < 13.5) K.rotulo('Cables: cargan el peso', [0.03, y + 3.1, 0]);
          else K.rotulo('Paracaídas', [-0.7, y + 0.12, 0.06]);
          K.tabla([['CABINA', mov, mov === 'PARADA' ? '' : 'ac'], ['GUÍAS', 'LIMPIAS Y DERECHAS', 'ok']]);
        } else {
          K.marcar(s.guiasCp, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.cp, K.entre(t, 4.5, 9) ? 'foco' : null);
          K.marcar(s.zapCp, t >= 13.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          if (t < 4.5) { K.rotulo('Guías del contrapeso', [CPX - 0.02, 4.4, CPZ]); K.rotulo('Guía de cabina', [-0.74, 4.4, 0], 'izq'); }
          else if (t < 9) { K.rotulo('Contrapeso', [0, cy + 1.2, CPZ + 0.06], 'izq'); K.rotulo('Cabina', [0.3, y + 2.65, 0.1]); }
          else if (t < 13.5) K.rotulo('Se cruzan sin tocarse', [0, cy + 0.8, CPZ + 0.06], 'izq');
          else { K.rotulo('Zapata', [0.37, cy + 1.52, CPZ]); K.rotulo('Aceitera', [0.372, cy + 1.66, CPZ], 'izq'); }
          K.tabla([['CABINA', mov, mov === 'PARADA' ? '' : 'ac'], ['CONTRAPESO', mov === 'SUBE' ? 'BAJA' : mov === 'BAJA' ? 'SUBE' : 'PARADO', mov === 'PARADA' ? '' : 'ac']]);
        }
      }
    },
    falla: {
      dur: 18,
      subt: function (id) {
        return id === 'guias_contrapeso'
          ? [[0, 'Falla 1: las zapatas del contrapeso están gastadas o su guía está torcida.'],
            [4.5, 'El contrapeso baila entre sus guías y golpea: se oye un traqueteo a mitad del viaje.'],
            [9.5, 'Falla 2: la guía está seca o sucia. Se oye un chirrido que viene del muro del fondo.'],
            [13.5, 'Arreglo: con el ascensor detenido, cambiar las zapatas, alinear y ajustar la guía y revisar su aceitera.']]
          : [[0, 'Falla 1: en una unión, un tramo de guía quedó más salido que el otro, como un escalón.'],
            [4.5, 'Cuando la zapata pasa por ahí, choca: se oye un «toc» y la cabina se sacude, siempre en el mismo punto.'],
            [9.5, 'Falla 2: la guía está seca u oxidada. La zapata raspa y el viaje chirría todo el camino.'],
            [13.5, 'Arreglo: con el ascensor detenido, el técnico empareja la unión, ajusta los pernos y limpia la guía.']];
      },
      anim: function (t, s, K, id) {
        if (id === 'guias_contrapeso') { fallaCp(t, s, K); return; }
        var y = K.kf(t, CAB_X), arreglo = K.ph(t, 13.6, 14.6);
        var paso = 0.025 * (1 - arreglo), zs = y + 2.8, d = zs - JY;
        var cruzo = K.ph(d, -0.04, 0.04), osc = d > 0 && t < 13.5 ? 0.012 * Math.exp(-d / 0.25) * Math.sin(d * 60) : 0;
        var ox = K.ph(t, 9, 10) * (1 - arreglo), mueve = rumbo(K, CAB_X, t) !== 'PARADA';
        var toc = t < 13.5 && d > -0.03 && d < 0.12, raspa = K.entre(t, 9.6, 13.5) && mueve;
        huecoPone(s, K, { y: y, paso: paso, incl: paso * cruzo / 2.8 + osc, carX: osc * 0.6, ox: ox, chis: toc || raspa, marcaUnion: t < 9.5 && K.parpadeo(t, 1.5) });
        if (toc) s.chispas.emitir(t, [-0.725 + paso, JY, 0.03], true, 0.12);
        else if (raspa) s.chispas.emitir(t, [-0.725, zs - 0.06, 0.03], true, 0.07);
        K.marcar([s.platina].concat(s.pernos), t < 9.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.zap[0], toc ? 'mal' : null);
        K.marcar(s.guiasCab, t >= 14.6 ? 'foco' : null);
        if (t < 9.5) { K.rotulo('Unión con escalón', [-0.74, JY, 0.02], 'izq'); if (d > -0.03 && d < 0.45) K.aviso('¡TOC! Golpe en la unión'); }
        else if (t < 13.5) { K.rotulo('Guía seca y oxidada', [-0.74, zs + 0.25, 0.01], 'izq'); if (raspa) K.aviso('Chirrido en todo el viaje'); }
        else if (t > 14.6) { K.rotulo('Unión pareja', [-0.74, JY, 0.02], 'izq'); K.aviso('Pasa suave, sin golpe', false); }
        K.tabla([['UNIÓN', paso > 0.002 ? 'CON ESCALÓN' : 'PAREJA', paso > 0.002 ? 'mal' : 'ok'], ['GUÍA', ox > 0.3 ? 'SECA Y OXIDADA' : 'LIMPIA', ox > 0.3 ? 'mal' : 'ok']]);
      }
    }
  });
  function fallaCp(t, s, K) {
    var y = K.kf(t, CP_X), cy = CP0 - y, v = rapidez(K, CP_X, t), arreglo = K.ph(t, 13.6, 14.6);
    var baile = t < 9.5 ? K.cl(v * 3) : 0, sw = Math.sin(t * 11);
    var cpX = 0.014 * sw * baile, golpe = baile > 0.3 && Math.abs(sw) > 0.8;
    var oxCp = K.ph(t, 9.3, 10.2) * (1 - arreglo), raspa = K.entre(t, 9.6, 13.5) && v > 0.05;
    huecoPone(s, K, { y: y, cpX: cpX, cpRz: 0.01 * Math.sin(t * 8.3 + 1) * baile, oxCp: oxCp, chis: golpe || raspa });
    if (golpe) s.chispas.emitir(t, [(sw > 0 ? 1 : -1) * 0.3755 + cpX, cy + 1.52, CPZ + 0.02], true, 0.1);
    else if (raspa) s.chispas.emitir(t, [0.3755, cy + 1.48, CPZ + 0.02], true, 0.07);
    K.marcar(s.zapCp, t < 9.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 14.6 ? 'foco' : null);
    K.marcar(s.guiasCp, t > 14.6 ? 'foco' : null);
    if (t < 9.5) { K.rotulo('Zapatas gastadas', [-0.3755 + cpX, cy + 1.52, CPZ], 'izq'); if (golpe || baile > 0.3) K.aviso('Traqueteo del contrapeso'); }
    else if (t < 13.5) { K.rotulo('Guía seca', [0.39, cy + 1.9, CPZ], 'izq'); if (raspa) K.aviso('Chirrido en el muro del fondo'); }
    else if (t > 14.6) { K.rotulo('Zapatas nuevas', [0.3755, cy + 1.52, CPZ]); K.aviso('Corre derecho y callado', false); }
    K.tabla([['CONTRAPESO', baile > 0.3 ? 'BAILA' : 'DERECHO', baile > 0.3 ? 'mal' : 'ok'], ['GUÍA', oxCp > 0.3 ? 'SECA' : 'BIEN', oxCp > 0.3 ? 'mal' : 'ok']]);
  }

  // ---------- soportes y unión de la guía, de cerca contra el muro ----------
  var JF = 1.15;   // altura de la unión entre los dos tramos
  function soporteFrente(K, y) {
    var M = K.M, T = K.T, g = new T.Group(), o = { g: g, y: y };
    g.position.y = y;
    g.add(K.caja(0.26, 0.17, 0.012, M.aceroOsc, 0, 0, -0.254));
    g.add(K.caja(0.012, 0.1, 0.19, M.aceroOsc, 0.075, 0, -0.152), K.caja(0.012, 0.1, 0.19, M.aceroOsc, -0.075, 0, -0.152));
    g.add(K.caja(0.2, 0.12, 0.012, M.aceroOsc, 0, 0, -0.052));
    o.anclas = [-1, 1].map(function (d) {
      var a = K.grupo([K.cil(0.016, 0.014, M.acero, 0, 0, 0, 'z', 6), K.cil(0.007, 0.06, M.acero, 0, 0, -0.03, 'z', 8)], d * 0.105, d * 0.04, -0.24);
      g.add(a); return a;
    });
    o.grapas = [-1, 1].map(function (d) {
      var c = K.grupo([K.caja(0.034, 0.05, 0.014, M.hierro, 0, 0, 0), K.cil(0.009, 0.012, M.acero, d * 0.006, 0, 0.012, 'z', 6)], d * 0.058, 0, -0.027);
      c.d = d; g.add(c); return c;
    });
    K.add(g);
    return o;
  }
  function armarFijaciones(K, id) {
    var M = K.M, T = K.T, s = { id: id, K: K };
    s.raiz = K.add(new T.Group());
    var R = function (o) { s.raiz.add(o); return o; };
    R(K.caja(4.4, 4.6, 0.06, K.mat(0x5a6269, { roughness: 0.95, metalness: 0 }), 0, 1.6, -0.29));
    R(K.caja(4.4, 0.06, 2.4, K.mat(0x4a5056, { roughness: 0.95, metalness: 0 }), 0, -0.33, 0.9));
    s.abajo = R(K.riel(JF + 0.3)); s.abajo.position.set(0, -0.3, 0);
    s.arriba = R(K.riel(3.0 - JF)); s.arriba.position.set(0, JF, 0);
    s.platina = R(K.caja(0.11, 0.36, 0.012, M.hierro, 0, JF, -0.052));
    s.pernos = [];
    [-0.14, -0.06, 0.06, 0.14].forEach(function (dy) { [-1, 1].forEach(function (d) { var p = R(K.cil(0.011, 0.012, M.acero, d * 0.032, JF + dy, -0.028, 'z', 6)); p.dy = dy; p.x0 = d * 0.032; s.pernos.push(p); }); });
    s.sop = [0.4, 1.9].map(function (y) { var o = soporteFrente(K, y); s.raiz.add(o.g); return o; });
    // zapata de la cabina con un trozo de la columna del bastidor
    var z = zapataU(K, K.mat(0xf2f0e6, { roughness: 0.7, metalness: 0 }));
    z.g.rotation.y = -PI / 2; z.g.position.set(0, 0, 0.035);
    s.carro = R(K.grupo([z.g, K.caja(0.1, 0.1, 0.02, M.aceroOsc, 0, 0, 0.093)]));
    s.marcaUnion = R(K.caja(0.13, 0.12, 0.1, K.matB(0xff3b30, { transparent: true, opacity: 0.35, depthWrite: false }), 0, JF, 0));
    s.zapata = z.g;
    s.flechas = [R(K.flecha(0xf2b705, 0.005)), R(K.flecha(0xf2b705, 0.005))];
    s.chispas = R(K.chispas(16));
    return s;
  }
  // o: ancla (0 puesto … 1 afuera), flojo (pernos del soporte de arriba sueltos), grapa (0 apretada … 1 suelta),
  // hueco (separación de los tramos), plat (0 en su sitio … 1 afuera), pern (0 sin pernos … 1 puestos), paso, vib, ys, desliz
  function fijPone(s, K, o) {
    var des = o.desliz || 0, paso = o.paso || 0, vib = o.vib || 0, hueco = o.hueco || 0;
    s.sop.forEach(function (sp, i) {
      var a = Math.max(o.ancla || 0, i === 1 ? (o.flojo || 0) : 0);
      sp.anclas.forEach(function (an) { an.position.z = -0.24 + 0.04 * a; an.rotation.z = a * 2; });
      sp.grapas.forEach(function (c) { var g = o.grapa || 0; c.position.set(c.d * (0.058 + 0.014 * g), 0, -0.027 + 0.016 * g); c.children[1].rotation.y = (1 - g) * 5; });
      sp.g.position.set(i === 1 ? vib : 0, sp.y + des, 0);
    });
    s.abajo.position.set(0, -0.3 + des, 0);
    s.arriba.position.set(paso, JF + hueco + des, 0); s.arriba.rotation.z = -vib / 0.75;
    s.platina.position.set((o.plat || 0) * 0.35, JF + des, -0.052);
    var pr = o.pern == null ? 1 : o.pern;
    s.pernos.forEach(function (p) {
      var arriba = p.dy > 0;
      p.position.set(p.x0 + (arriba ? paso : 0), JF + p.dy + des + (arriba ? hueco : 0), -0.028);
      p.scale.setScalar(Math.max(0.001, pr)); p.rotation.y = pr * 6; p.visible = pr > 0.01;
    });
    var ys = o.ys, d = ys - JF;
    var x = paso * K.ph(d, -0.03, 0.03) + (o.osc || 0) + (ys > JF ? vib * (ys - JF) / 0.75 : 0);
    s.carro.position.set(x, ys, 0);
    s.flechas.forEach(function (f) { f.visible = !!o.flechas; });
    if (o.flechas) { s.flechas[0].apuntar([0.16, 0.44, 0.02], [0.16, 0.56, 0.02]); s.flechas[1].apuntar([0.16, 0.36, 0.02], [0.16, 0.24, 0.02]); }
    s.marcaUnion.visible = !!o.marcaUnion; s.marcaUnion.position.x = paso * 0.5;
    if (!o.chis) s.chispas.emitir(0, [0, 0, 0], false);
  }
  V3.escena('fijaciones-guia', ['fijaciones'], {
    fov: 36,
    poster: 2.5,
    construir: function (K, id) { return armarFijaciones(K, id); },
    funciona: {
      dur: 18,
      subt: [[0, 'La guía va sujeta al muro con soportes: ángulos de acero anclados con pernos, más o menos cada metro y medio.'],
        [4.5, 'No se suelda: unas grapas la aprietan contra el soporte. Así puede acomodarse un poquito si el edificio se asienta.'],
        [9, 'Donde termina un tramo de guía, una platina atornillada por detrás lo une con el siguiente, bien parejo.'],
        [13.5, 'Con todo firme y parejo, la zapata de la cabina pasa suave, sin golpes.']],
      cam: [[0, [1.0, 1.35, 2.6], [0, 1.15, -0.12]], [3.8, [0.9, 1.3, 2.4], [0, 1.15, -0.12]], [5, [0.36, 0.66, 0.5], [0, 0.4, -0.06]], [8.6, [0.33, 0.64, 0.52], [0, 0.4, -0.06]],
        [9.8, [0.5, 1.42, 0.3], [0, 1.15, -0.05]], [13, [0.48, 1.4, 0.32], [0, 1.15, -0.05]], [14.2, [0.6, 1.5, 1.1], [0, 1.2, 0]], [18, [0.6, 1.2, 1.1], [0, 0.9, 0]]],
      anim: function (t, s, K) {
        var ancla = 1 - K.ph(t, 0.8, 3.4), grapa = 1 - K.ph(t, 5, 6.8);
        var hueco = K.kf(t, [[0, 0], [9, 0], [9.5, 0.14], [9.7, 0.14], [10.5, 0]]);
        var plat = K.kf(t, [[0, 0], [9, 0], [9.5, 1], [10.5, 1], [11.6, 0]]);
        var pern = K.kf(t, [[0, 1], [9, 1], [9.4, 0], [11.6, 0], [12.8, 1]]);
        var des = K.entre(t, 7, 9) ? Math.sin((t - 7) * PI) * 0.012 : 0;
        var ys = K.kf(t, [[0, 3.3], [13.6, 3.3], [17.6, -0.15]]);
        fijPone(s, K, { ancla: ancla, grapa: grapa, hueco: hueco, plat: plat, pern: pern, desliz: des, ys: ys, flechas: K.entre(t, 7, 9) });
        K.marcar(s.sop.map(function (o) { return o.g; }), t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.sop[0].grapas, K.entre(t, 4.5, 9) ? 'foco' : null);
        K.marcar([s.platina].concat(s.pernos), K.entre(t, 9.5, 13.5) ? 'foco' : null);
        K.marcar(s.zapata, t > 13.5 ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Soporte', [0.13, 1.9, -0.15]); K.rotulo('Soporte', [0.13, 0.4, -0.15]); K.rotulo('Muro', [-0.5, 2.3, -0.26], 'izq'); }
        else if (t < 7) { K.rotulo('Grapa', [0.075, 0.4, -0.02]); K.rotulo('Guía', [0, 0.75, 0.03], 'izq'); }
        else if (t < 9) K.rotulo('Se acomoda un poquito', [0.17, 0.4, 0.02]);
        else if (t < 13.5) { K.rotulo('Platina de unión', [0.055, JF - 0.12, -0.05]); K.rotulo('Pernos', [-0.032, JF + 0.14, -0.02], 'izq'); }
        else K.rotulo('Zapata', [0, ys, 0.06]);
        K.tabla([['SOPORTES', ancla > 0.05 ? 'ANCLANDO' : 'FIRMES', ancla > 0.05 ? 'ac' : 'ok'], ['UNIÓN', pern < 0.99 ? 'ARMANDO' : 'PAREJA', pern < 0.99 ? 'ac' : 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: los pernos de un soporte se aflojaron. Cuando pasa la cabina, la guía se mueve y la cabina vibra.'],
        [5, 'Falla 2: en la unión, un tramo quedó salido. La zapata choca ahí: «toc», siempre a la misma altura.'],
        [10, 'Después de un sismo fuerte, los soportes se pueden mover: se revisan todas las guías antes de usar el ascensor.'],
        [14.5, 'Arreglo: con el ascensor detenido, ajustar los pernos de los soportes y de la platina, y dejar la unión pareja.']],
      cam: [[0, [0.55, 2.15, 0.85], [0, 1.85, -0.08]], [4.6, [0.55, 2.12, 0.85], [0, 1.83, -0.08]], [5.6, [0.42, 1.3, 0.6], [0, 1.12, -0.03]], [9.6, [0.42, 1.28, 0.6], [0, 1.1, -0.03]],
        [10.8, [1.1, 1.5, 2.6], [0, 1.2, -0.12]], [14.2, [1.05, 1.5, 2.5], [0, 1.2, -0.12]], [15.4, [0.8, 1.6, 1.9], [0, 1.4, -0.1]], [19, [0.85, 1.65, 2.0], [0, 1.45, -0.1]]],
      anim: function (t, s, K) {
        var ys = K.kf(t, [[0, 2.9], [0.8, 2.9], [4.6, 1.5], [5.4, 1.5], [8.2, 0.55], [15.6, 0.55], [18.6, 2.6]]);
        var flojo = 1 - K.ph(t, 15, 16), cerca = Math.exp(-Math.pow((ys - 1.9) / 0.35, 2));
        var vib = t < 5 ? 0.02 * Math.sin(t * 26) * cerca : 0;
        var paso = 0.022 * K.ph(t, 4.8, 5.4) * (1 - K.ph(t, 15.3, 16.3)), d = ys - JF;
        var osc = K.entre(t, 5, 10) && d < 0 ? 0.012 * Math.exp(d / 0.15) * Math.sin(d * 90) : 0;
        var toc = K.entre(t, 5, 10) && Math.abs(d) < 0.07;
        var sismo = K.ph(t, 10.2, 10.8) * (1 - K.ph(t, 12.6, 13.4));
        s.raiz.position.set(0.025 * Math.sin(t * 31) * sismo, 0, 0.012 * Math.sin(t * 23) * sismo);
        fijPone(s, K, { flojo: flojo, paso: paso, vib: vib, osc: osc, ys: ys, chis: toc, marcaUnion: K.entre(t, 5, 10) && K.parpadeo(t, 1.5) });
        if (toc) s.chispas.emitir(t, [paso * 0.5, JF, 0.04], true, 0.1);
        K.marcar(s.sop[1].g, t < 5 ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 16 ? 'foco' : null);
        K.marcar([s.platina].concat(s.pernos), K.entre(t, 5, 10) ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 16 ? 'foco' : null);
        K.marcar(s.zapata, toc ? 'mal' : null);
        if (t < 5) { K.rotulo('Soporte flojo', [0.13, 1.9, -0.15]); K.rotulo('Pernos sueltos', [-0.105, 1.86, -0.22], 'izq'); if (cerca > 0.3) K.aviso('La cabina vibra en este tramo'); }
        else if (t < 10) { K.rotulo('Unión con escalón', [0.01, JF, 0.035], 'izq'); if (d < 0.05 && d > -0.35) K.aviso('¡TOC! Golpe en la unión'); }
        else if (t < 14.5) { if (sismo > 0.05) K.aviso('Sismo fuerte'); else if (t > 13) K.aviso('Revisar todo antes de usar'); }
        else if (t > 16) { K.rotulo('Pernos ajustados', [0.13, 1.9, -0.15]); K.rotulo('Unión pareja', [0.01, JF, 0.035], 'izq'); K.aviso('Guía firme y pareja', false); }
        K.tabla([['SOPORTE', flojo > 0.05 ? 'FLOJO' : 'FIRME', flojo > 0.05 ? 'mal' : 'ok'], ['UNIÓN', paso > 0.002 ? 'CON ESCALÓN' : 'PAREJA', paso > 0.002 ? 'mal' : 'ok']]);
      }
    }
  });

  // ---------- bastidor de cabina ----------
  function armarBastidor(K, id) {
    var M = K.M, T = K.T, s = { id: id, K: K };
    K.add(K.caja(4, 6, 0.06, K.mat(0x5a6269, { roughness: 0.95, metalness: 0 }), 0, 2.4, -1.0));
    K.add(K.caja(4, 0.2, 1.6, K.mat(0x8d9399, { roughness: 0.9, metalness: 0 }), 0, -0.1, 1.46));   // piso del edificio
    K.add(K.caja(1.0, 0.022, 0.1, M.acero, 0, 0.001, 0.71));                                          // pisadera del piso
    s.guias = [-1, 1].map(function (d) { var r = K.add(K.riel(6.5)); r.position.set(d * 0.76, -0.8, 0); r.rotation.y = -d * PI / 2; return r; });
    var c = s.car = K.add(new T.Group());
    // esqueleto: columnas, viga de arriba (dos perfiles) y viga de abajo
    s.bas = K.add(K.grupo([K.caja(0.08, 3.13, 0.14, M.aceroOsc, -0.64, 1.315, 0), K.caja(0.08, 3.13, 0.14, M.aceroOsc, 0.64, 1.315, 0),
      K.caja(1.36, 0.16, 0.05, M.aceroOsc, 0, 2.62, 0.055), K.caja(1.36, 0.16, 0.05, M.aceroOsc, 0, 2.62, -0.055), K.caja(1.36, 0.14, 0.16, M.aceroOsc, 0, -0.19, 0)]), c);
    s.amarre = K.add(K.caja(0.22, 0.08, 0.16, M.hierro, 0, 2.74, 0), c);
    s.tensores = [[-1, 1], [1, 1], [-1, -1], [1, -1]].map(function (q) { return K.add(K.cable(0.01, M.acero), c).pon([q[0] * 0.64, 0.9, 0], [q[0] * 0.55, -0.03, q[1] * 0.58]); });
    // tacos de goma entre la viga de abajo y la plataforma
    s.tacoMat = K.mat(0x25282c, { roughness: 0.95, metalness: 0 });
    s.tacos = [-0.48, -0.2, 0.2, 0.48].map(function (x) { return K.add(K.cil(0.045, 0.05, s.tacoMat, x, -0.095, 0, null, 16), c); });
    // plataforma + caja de la cabina (liviana); va apoyada sobre los tacos
    s.cabina = K.add(new T.Group(), c);
    s.panel = K.mat(0xdfe3e6, { metalness: 0.3, roughness: 0.4, transparent: true, opacity: 1 });
    s.puertaM = K.mat(0xc9d0d5, { metalness: 0.45, roughness: 0.3, transparent: true, opacity: 1 });
    s.cabina.add(K.caja(1.16, 0.08, 1.26, M.aceroOsc, 0, -0.03, 0), K.caja(1.1, 0.012, 1.2, M.piso, 0, 0.016, 0), K.caja(0.9, 0.02, 0.06, M.acero, 0, 0.001, 0.62));
    s.cabina.add(K.caja(1.1, 2.2, 0.03, s.panel, 0, 1.12, -0.585), K.caja(0.03, 2.2, 1.2, s.panel, -0.535, 1.12, 0), K.caja(0.03, 2.2, 1.2, s.panel, 0.535, 1.12, 0),
      K.caja(1.1, 0.04, 1.2, s.panel, 0, 2.24, 0), K.caja(0.8, 2.0, 0.02, s.puertaM, 0, 1.02, 0.6), K.caja(0.15, 2.2, 0.02, s.panel, -0.475, 1.12, 0.6), K.caja(0.15, 2.2, 0.02, s.panel, 0.475, 1.12, 0.6));
    // zapatas en las esquinas y paracaídas abajo
    s.forro = K.mat(0xf2f0e6, { roughness: 0.7, metalness: 0 });
    s.zap = [[-1, 2.8], [1, 2.8], [-1, -0.19], [1, -0.19]].map(function (q) {
      var z = zapataU(K, s.forro); z.g.position.set(q[0] * 0.725, q[1], 0); if (q[0] > 0) z.g.scale.x = -1; K.add(z.g, c); return z.g;
    });
    s.paracaidas = [-1, 1].map(function (d) {
      return K.add(K.grupo([K.caja(0.04, 0.17, 0.11, M.hierro, d * 0.69, 0.08, 0), K.caja(0.07, 0.17, 0.02, M.hierro, d * 0.74, 0.08, 0.022), K.caja(0.07, 0.17, 0.02, M.hierro, d * 0.74, 0.08, -0.022),
        K.caja(0.05, 0.04, 0.04, M.amarillo, d * 0.69, 0.18, 0.05)]), c);
    });
    s.cables = [0, 1, 2, 3].map(function () { return K.add(K.cable(0.006, M.hierro)); });
    s.flecha = K.add(K.flecha(0xf2b705, 0.012));
    return s;
  }
  function bastidorPone(s, K, o) {
    var y = o.y || 0;
    s.car.position.set(0, y, 0);
    s.cabina.position.set(o.cx || 0, o.cy || 0, 0); s.cabina.rotation.set(o.crx || 0, 0, o.crz || 0);
    s.panel.opacity = o.op == null ? 1 : o.op; s.puertaM.opacity = s.panel.opacity;
    s.panel.depthWrite = s.panel.opacity > 0.95; s.puertaM.depthWrite = s.panel.depthWrite;
    s.tacos.forEach(function (tc) { tc.scale.y = o.taco || 1; tc.position.y = -0.12 + 0.025 * (o.taco || 1); });
    s.cables.forEach(function (cb, i) { var x = -0.045 + i * 0.03; cb.pon([x, y + 2.78, 0], [x, 6.4, 0]); });
    s.flecha.visible = !!o.flecha;
    if (o.flecha) s.flecha.apuntar([0.18, y + 3.0, 0], [0.18, y + 3.55, 0]);
  }
  var BAS_Y = [[0, 0], [9.3, 0], [13, 1.2], [18, 1.2]];
  V3.escena('bastidor-cab', ['bastidor'], {
    fov: 36,
    poster: 2,
    construir: function (K, id) { return armarBastidor(K, id); },
    funciona: {
      dur: 18,
      subt: [[0, 'El bastidor es el esqueleto de acero de la cabina: dos columnas a los lados, una viga arriba y otra abajo.'],
        [4.5, 'La cabina que ves por dentro es una caja liviana. Va apoyada en el bastidor, encima de unos tacos de goma.'],
        [9, 'Los cables se amarran a la viga de arriba: ellos cargan el bastidor, y el bastidor carga la cabina.'],
        [13.5, 'En sus cuatro esquinas lleva las zapatas que corren por las guías, y abajo, el paracaídas.']],
      cam: [[0, [2.5, 1.7, 4.3], [0, 1.25, 0]], [4, [2.4, 1.6, 4.1], [0, 1.2, 0]], [5.4, [1.7, 0.75, 2.5], [0, 0.35, 0]], [8.6, [1.6, 0.7, 2.4], [0, 0.3, 0]],
        [9.8, [2.6, 2.5, 4.4], [0, 2.0, 0]], [13, [2.6, 3.3, 4.4], [0, 2.7, 0]], [14.4, [1.5, 1.75, 1.6], [0.66, 1.3, 0]], [18, [1.55, 1.8, 1.75], [0.66, 1.3, 0]]],
      anim: function (t, s, K) {
        var y = K.kf(t, BAS_Y), op = K.kf(t, [[0, 1], [4.6, 1], [5.4, 0.22], [8.6, 0.22], [9.4, 1]]);
        var alza = K.kf(t, [[0, 0], [5.6, 0], [6.4, 0.09], [7.6, 0.09], [8.4, 0]]);
        bastidorPone(s, K, { y: y, op: op, cy: alza, flecha: K.entre(t, 9.3, 13) });
        K.marcar(s.bas, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.tacos, K.entre(t, 5.6, 9) ? 'foco' : null);
        K.marcar([s.amarre].concat(s.cables), K.entre(t, 9, 13.5) ? 'foco' : null);
        K.marcar(s.zap.concat(s.paracaidas), t >= 13.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        if (t < 4.5) { K.rotulo('Viga de arriba', [0.35, 2.62, 0.08]); K.rotulo('Columna', [0.64, 1.7, 0.07]); K.rotulo('Viga de abajo', [0.35, -0.19, 0.08]); }
        else if (t < 9) { K.rotulo('Caja de la cabina', [-0.3, 1.5, 0.6], 'izq'); if (t > 5.6) K.rotulo('Tacos de goma', [0.48, -0.08, 0.04]); }
        else if (t < 13.5) { K.rotulo('Amarre de los cables', [0.11, y + 2.74, 0.08]); K.rotulo('Cables', [0.04, y + 3.4, 0], 'izq'); }
        else { K.rotulo('Zapata', [0.725, y + 2.8, 0.05]); K.rotulo('Zapata', [0.725, y - 0.19, 0.05]); K.rotulo('Paracaídas', [0.72, y + 0.1, 0.06], 'izq'); }
        var mov = rumbo(K, BAS_Y, t);
        K.tabla([['CABINA', mov, mov === 'PARADA' ? '' : 'ac'], ['PESO', 'LO CARGAN LOS CABLES', '']]);
      }
    },
    falla: {
      dur: 16,
      subt: [[0, 'Falla 1: los tacos de goma se vencieron o hay pernos flojos. La cabina vibra y suena a lata al arrancar y frenar.'],
        [5, 'Falla 2: el bastidor se descuadró. La cabina queda inclinada y su piso no empata con el piso del edificio.'],
        [10.5, 'Arreglo: con la cabina vacía y asegurada, el técnico cambia los tacos, ajusta los pernos y nivela la plataforma.']],
      cam: [[0, [1.7, 1.1, 2.9], [0, 0.6, 0]], [4.6, [1.7, 1.3, 2.9], [0, 0.8, 0]], [5.6, [0.75, 0.45, 2.0], [0, 0.05, 0.6]], [10.2, [0.7, 0.45, 2.0], [0, 0.05, 0.6]],
        [11.4, [1.9, 1.2, 3.4], [0, 0.7, 0]], [16, [2.0, 1.3, 3.6], [0, 0.8, 0]]],
      anim: function (t, s, K) {
        var y = K.kf(t, [[0, 0], [1, 0], [2.4, 0.45], [3.2, 0.45], [4.4, 0]]), v = Math.abs(K.kf(t + 0.05, [[0, 0], [1, 0], [2.4, 0.45], [3.2, 0.45], [4.4, 0]]) - K.kf(t - 0.05, [[0, 0], [1, 0], [2.4, 0.45], [3.2, 0.45], [4.4, 0]])) * 10;
        var arr = K.ph(t, 11, 12.5), vib = t < 5 ? Math.min(1, v * 2.5 + 0.15) : 0;
        var incl = t >= 5 ? 0.03 * K.ph(t, 5.2, 6.4) * (1 - arr) : 0;
        var taco = t < 11.5 ? 0.45 : K.mix(0.45, 1, arr);
        bastidorPone(s, K, { y: y, cy: vib * 0.007 * Math.sin(t * 47) - (1 - taco) * 0.05, cx: vib * 0.006 * Math.sin(t * 39), crx: vib * 0.006 * Math.sin(t * 31), crz: incl, taco: taco });
        K.marcar(s.tacos, t < 11 ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 12.5 ? 'foco' : null);
        K.marcar(s.bas, K.entre(t, 5, 10.5) ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 12.5 ? 'foco' : null);
        if (t < 5) { K.rotulo('Tacos vencidos', [0.48, y - 0.1, 0.05]); if (vib > 0.3) K.aviso('Vibra y suena a lata'); }
        else if (t < 10.5) { K.rotulo('Queda más bajo', [0.45, -0.012, 0.64]); K.rotulo('Piso del edificio', [-0.45, 0.0, 0.75], 'izq'); if (t > 6.4) K.aviso('El piso no empata'); }
        else if (t > 12.5) K.aviso('Cabina firme y nivelada', false);
        K.tabla([['TACOS', t < 11.5 ? 'VENCIDOS' : 'NUEVOS', t < 11.5 ? 'mal' : 'ok'], ['NIVEL', incl > 0.003 ? 'INCLINADA' : 'PAREJA', incl > 0.003 ? 'mal' : 'ok']]);
      }
    }
  });

  // ---------- zapata deslizante (rozadera) y su aceitera, de cerca sobre la guía ----------
  function armarZapata(K, id) {
    var M = K.M, T = K.T, s = { id: id, K: K };
    K.add(K.caja(3, 4.8, 0.06, K.mat(0x5a6269, { roughness: 0.95, metalness: 0 }), 0, 1.2, -0.3));
    K.add(K.caja(3, 0.06, 2, K.mat(0x4a5056, { roughness: 0.95, metalness: 0 }), 0, -0.63, 0.7));
    s.riel = K.add(K.riel(3.8)); s.riel.position.set(0, -0.6, 0);
    [0.4, 1.9].forEach(function (y) {
      K.add(K.caja(0.2, 0.12, 0.012, M.aceroOsc, 0, y, -0.052)); K.add(K.caja(0.012, 0.1, 0.24, M.aceroOsc, 0.075, y, -0.17)); K.add(K.caja(0.012, 0.1, 0.24, M.aceroOsc, -0.075, y, -0.17));
      K.add(K.caja(0.26, 0.17, 0.012, M.aceroOsc, 0, y, -0.264));
    });
    // película de aceite, guía seca y rayas sobre la hoja de la guía
    s.filmM = K.mat(0x9c6f12, { transparent: true, opacity: 0.35, roughness: 0.08, metalness: 0.4, depthWrite: false });
    s.film = K.add(K.caja(0.0192, 3.8, 0.072, s.filmM, 0, 1.3, 0.001));
    s.secoM = K.mat(0x7a6650, { transparent: true, opacity: 0, roughness: 1, metalness: 0, depthWrite: false });
    s.seco = K.add(K.caja(0.0198, 3.8, 0.0725, s.secoM, 0, 1.3, 0.001));
    var raya = K.mat(0x2a2522, { roughness: 1, metalness: 0 });
    s.rayas = [0.02, -0.012, 0.004].map(function (z) { return K.add(K.caja(0.0204, 1, 0.0025, raya, 0, 0, z)); });
    // bandeja del foso con su aceite, y el charco cuando gotea de más
    s.aceiteM = K.mat(0xc99228, { roughness: 0.15, metalness: 0.1, transparent: true, opacity: 0.9 });
    K.add(K.caja(0.22, 0.008, 0.22, M.hierro, 0, -0.596, 0.02));
    [[0, 0.13], [0, -0.09]].forEach(function (q) { K.add(K.caja(0.22, 0.04, 0.006, M.hierro, 0, -0.58, q[1])); });
    [-0.11, 0.11].forEach(function (x) { K.add(K.caja(0.006, 0.04, 0.22, M.hierro, x, -0.58, 0.02)); });
    s.bandeja = K.add(K.caja(0.21, 0.01, 0.21, s.aceiteM, 0, -0.588, 0.02));
    s.charco = K.add(K.cil(0.22, 0.004, s.aceiteM, 0.24, -0.598, 0.3, null, 32));
    // zapata con un trozo de la columna del bastidor, y la aceitera al costado
    s.forroM = K.mat(0xf0e2a8, { roughness: 0.7, metalness: 0 });
    var z = zapataU(K, s.forroM); z.g.rotation.y = -PI / 2; z.g.position.set(0, 0, 0.035);
    s.zapata = z.g; s.forros = z.forros;
    s.carro = K.add(K.grupo([z.g, K.caja(0.12, 0.4, 0.07, M.aceroOsc, 0, -0.27, 0.12)]));
    s.vasoM = K.mat(0xd8e4ea, { transparent: true, opacity: 0.35, roughness: 0.1, metalness: 0, depthWrite: false });
    s.fieltro = K.mat(0xf4f1e8, { roughness: 1, metalness: 0 }); s.fieltroSeco = K.mat(0x4a4338, { roughness: 1, metalness: 0 });
    s.mecha = [K.caja(0.05, 0.022, 0.012, s.fieltro, 0.036, 0.095, 0.02), K.caja(0.006, 0.045, 0.03, s.fieltro, 0.011, 0.09, 0.02), K.caja(0.006, 0.045, 0.03, s.fieltro, -0.011, 0.09, 0.02),
      K.caja(0.03, 0.045, 0.008, s.fieltro, 0, 0.09, 0.039)];
    s.aceite = K.cil(0.03, 0.07, s.aceiteM, 0.065, 0.11, 0.07, null, 20);
    s.vaso = K.grupo([K.cil(0.035, 0.08, s.vasoM, 0.065, 0.11, 0.07, null, 20), K.cil(0.038, 0.01, M.hierro, 0.065, 0.155, 0.07, null, 20), K.cil(0.012, 0.012, M.rojo, 0.065, 0.165, 0.07, null, 12),
      K.caja(0.05, 0.012, 0.05, M.hierro, 0.065, 0.066, 0.07), K.caja(0.012, 0.03, 0.04, M.hierro, 0.03, 0.06, 0.07)]);
    s.raja = K.caja(0.003, 0.05, 0.004, M.negro, 0.098, 0.1, 0.085);
    s.aceitera = K.grupo([s.vaso, s.aceite, s.raja].concat(s.mecha));
    s.carro.add(s.aceitera);
    s.gotas = [0, 1, 2].map(function () { return K.add(K.gota(s.aceiteM)); });
    s.chispas = K.add(K.chispas(16));
    s.flechas = [K.add(K.flecha(0xf2b705, 0.004)), K.add(K.flecha(0xf2b705, 0.004))];
    return s;
  }
  // o: ys (altura de la zapata), x (juego de costado), desgaste (1 forro nuevo … 0 sin forro), nivel (aceite en el vaso 0…1),
  // film (brillo del aceite en la guía), seco, rayas [desde, hasta], mechaSeca, raja, charco (0…1), bandeja (0…1)
  function zapataPone(s, K, o) {
    var k = o.desgaste == null ? 1 : o.desgaste;
    s.carro.position.set(o.x || 0, o.ys, 0);
    s.forros.forEach(function (f, i) {
      f.visible = k > 0.02;
      if (i < 2) { f.scale.z = Math.max(0.05, k); f.position.z = (i ? -1 : 1) * (0.0135 - 0.003 * k); }
      else { f.scale.x = Math.max(0.05, k); f.position.x = 0.007 - 0.003 * k; }
    });
    var n = o.nivel == null ? 0.8 : o.nivel;
    s.aceite.visible = n > 0.02; s.aceite.scale.y = Math.max(0.02, n); s.aceite.position.y = 0.075 + 0.035 * n;
    s.filmM.opacity = o.film == null ? 0.35 : o.film; s.film.visible = s.filmM.opacity > 0.01;
    s.secoM.opacity = o.seco || 0; s.seco.visible = (o.seco || 0) > 0.01;
    var r = o.rayas;
    s.rayas.forEach(function (m) { m.visible = !!r && Math.abs(r[1] - r[0]) > 0.01; if (m.visible) { m.scale.y = Math.abs(r[1] - r[0]); m.position.y = (r[0] + r[1]) / 2; } });
    s.mecha.forEach(function (m) { m.material = o.mechaSeca ? s.fieltroSeco : s.fieltro; m.userData._m0 = m.material; m.userData._marca = null; });
    s.raja.visible = !!o.raja;
    var ch = o.charco || 0; s.charco.visible = ch > 0.01; s.charco.scale.set(Math.max(0.01, ch), 1, Math.max(0.01, ch));
    var b = o.bandeja == null ? 0.4 : o.bandeja; s.bandeja.scale.y = Math.max(0.05, b); s.bandeja.position.y = -0.593 + 0.005 * b;
    s.gotas.forEach(function (g) { g.visible = false; });
    s.flechas.forEach(function (f) { f.visible = false; });
    if (!o.chis) s.chispas.emitir(0, [0, 0, 0], false);
  }
  // gotas que bajan en bucle de y0 a y1 (pegadas a la hoja de la guía)
  function gotear(s, t, y0, y1, x, z, n, vel) {
    for (var i = 0; i < (n || 3); i++) {
      var k = (t * (vel || 0.8) + i / (n || 3)) % 1, g = s.gotas[i];
      g.visible = true; g.position.set(x, y0 + (y1 - y0) * k * k, z);
    }
  }
  var ZAP_CAM = {
    rozaderas: [
      [[0, [0.85, 1.65, 1.25], [0, 1.15, 0]], [4, [0.8, 1.6, 1.2], [0, 1.15, 0]], [5.2, [-0.13, 1.5, 0.24], [0, 1.22, 0.01]], [8.8, [-0.13, 1.5, 0.24], [0, 1.22, 0.01]],
        [9.8, [0.55, 1.55, 0.75], [0, 1.3, 0]], [13, [0.55, 2.2, 0.75], [0, 1.95, 0]], [14.2, [0.32, 2.2, 0.36], [0.03, 2.05, 0.04]], [18, [0.32, 2.12, 0.36], [0.03, 1.97, 0.04]]],
      [[0, [-0.13, 1.5, 0.24], [0, 1.22, 0.01]], [4.2, [-0.13, 1.5, 0.24], [0, 1.22, 0.01]], [5.2, [0.5, 1.15, 0.65], [0, 0.95, 0]], [9.4, [0.5, 0.65, 0.65], [0, 0.45, 0]],
        [10.4, [0.42, 0.75, 0.55], [0, 0.6, 0.01]], [13.8, [0.42, 1.45, 0.55], [0, 1.3, 0.01]], [14.8, [-0.13, 1.68, 0.24], [0, 1.42, 0.01]], [19, [-0.13, 1.68, 0.24], [0, 1.42, 0.01]]]
    ],
    aceiteras: [
      [[0, [0.3, 1.45, 0.34], [0.03, 1.3, 0.05]], [4.2, [0.3, 1.43, 0.34], [0.03, 1.3, 0.05]], [5.2, [0.2, 1.38, 0.24], [0.02, 1.29, 0.03]], [8.6, [0.2, 1.38, 0.24], [0.02, 1.29, 0.03]],
        [9.8, [0.6, 1.6, 0.8], [0, 1.4, 0]], [13, [0.6, 2.5, 0.8], [0, 2.3, 0]], [14.2, [0.38, -0.3, 0.55], [0, -0.52, 0.02]], [18, [0.36, -0.32, 0.5], [0, -0.53, 0.02]]],
      [[0, [0.3, 1.45, 0.34], [0.03, 1.3, 0.05]], [4.2, [0.3, 1.43, 0.34], [0.03, 1.3, 0.05]], [5.2, [0.5, 1.3, 0.6], [0, 1.1, 0]], [9.4, [0.5, 0.75, 0.6], [0, 0.55, 0]],
        [10.4, [0.6, -0.25, 0.85], [0.08, -0.55, 0.12]], [13.8, [0.6, -0.25, 0.85], [0.08, -0.55, 0.12]], [14.8, [0.3, 0.75, 0.34], [0.03, 0.6, 0.05]], [19, [0.3, 0.75, 0.34], [0.03, 0.6, 0.05]]]
    ]
  };
  var ROZ_F = [[0, 1.2], [9.2, 1.2], [13, 2.0], [18, 1.92]], ROZ_X = [[0, 1.2], [4.8, 1.2], [9.2, 0.45], [10.2, 0.45], [13.8, 1.4], [19, 1.4]];
  var ACE_F = [[0, 1.2], [9.2, 1.2], [13, 2.3], [18, 2.3]], ACE_X = [[0, 1.2], [4.8, 1.2], [9.2, 0.5], [19, 0.5]];
  V3.escena('zapata-aceitera', ['rozaderas', 'aceiteras'], {
    fov: 36,
    poster: 6,
    construir: function (K, id) { return armarZapata(K, id); },
    camara: camaraPorPieza(ZAP_CAM),
    funciona: {
      dur: 18,
      subt: function (id) {
        return id === 'aceiteras'
          ? [[0, 'La aceitera es un vasito con aceite que va junto a la zapata, pegado a la guía.'],
            [4.5, 'De ella sale una mecha de fieltro, como la de un mechero, que toca la guía y la moja.'],
            [9, 'Cuando la cabina viaja, la mecha reparte una capa finita de aceite de arriba abajo. Funciona sola, sin luz.'],
            [13.5, 'Lo que sobra baja por la guía y cae en una bandeja, en el foso.']]
          : [[0, 'Las zapatas, o rozaderas, son piezas en forma de U que abrazan la guía. Van en las cuatro esquinas del bastidor.'],
            [4.5, 'Por dentro tienen un forro de plástico duro que resbala sobre la guía, como un patín.'],
            [9, 'Mientras la cabina viaja, la zapata la mantiene en su carril: no se balancea ni roza las paredes.'],
            [13.5, 'Al lado lleva una aceitera que deja la guía apenas mojada, para que resbale sin chillar.']];
      },
      anim: function (t, s, K, id) {
        var ace = id === 'aceiteras', ys = K.kf(t, ace ? ACE_F : ROZ_F);
        zapataPone(s, K, { ys: ys, nivel: ace ? K.kf(t, [[0, 0.85], [18, 0.72]]) : 0.8, film: ace ? K.kf(t, [[0, 0.12], [9, 0.12], [12.5, 0.4]]) : 0.3 });
        if (!ace) {
          K.marcar(s.zapata, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.forros, K.entre(t, 4.5, 9) ? 'foco' : null);
          K.marcar(s.aceitera, t > 13.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          if (t < 4.5) { K.rotulo('Zapata (rozadera)', [0, ys + 0.05, 0.08]); K.rotulo('Guía', [0, ys + 0.45, 0.03], 'izq'); K.rotulo('Columna del bastidor', [0, ys - 0.3, 0.16], 'izq'); }
          else if (t < 9) { K.rotulo('Forro de plástico', [-0.012, ys + 0.06, 0.02], 'izq'); K.rotulo('Guía', [0, ys + 0.06, -0.03]); }
          else if (t < 13.5) {
            K.rotulo('Zapata', [0, ys, 0.08]);
            s.flechas.forEach(function (f, i) { var d = i ? 1 : -1; f.visible = true; f.apuntar([d * 0.12, ys, 0.04], [d * 0.035, ys, 0.04]); });
            K.rotulo('No la deja bambolear', [0.12, ys + 0.02, 0.04]);
          } else K.rotulo('Aceitera', [0.065, ys + 0.13, 0.07]);
          var mov = rumbo(K, ROZ_F, t);
          K.tabla([['CABINA', mov, mov === 'PARADA' ? '' : 'ac'], ['FORRO', 'BUENO', 'ok']]);
        } else {
          K.marcar(s.vaso, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.mecha, K.entre(t, 4.5, 9) ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          if (t < 4.5) { K.rotulo('Aceitera', [0.1, ys + 0.14, 0.07]); K.rotulo('Aceite', [0.065, ys + 0.1, 0.105], 'izq'); }
          else if (t < 9) { K.rotulo('Mecha de fieltro', [-0.011, ys + 0.09, 0.03], 'izq'); gotear(s, t, ys + 0.085, ys + 0.03, 0.009, 0.03, 2, 0.6); }
          else if (t < 13.5) K.rotulo('Guía mojada, con brillo', [0, ys - 0.25, 0.035], 'izq');
          else { K.rotulo('Bandeja', [0.11, -0.57, 0.12]); gotear(s, t, -0.1, -0.585, 0.009, 0.03, 3, 0.7); }
          K.tabla([['ACEITE', 'LLENO', 'ok'], ['GUÍA', 'APENAS MOJADA', 'ok']]);
        }
      }
    },
    falla: {
      dur: 19,
      subt: function (id) {
        return id === 'aceiteras'
          ? [[0, 'Falla 1: la aceitera se quedó vacía, o la mecha se secó y se puso dura.'],
            [4.5, 'La guía queda seca y la zapata raspa: se oye un chirrido en todo el viaje.'],
            [9.5, 'Falla 2: si está rajada o la llenaron de más, el aceite chorrea por la guía y ensucia el foso.'],
            [14, 'Arreglo: el técnico la rellena con el aceite indicado, cambia la mecha si está dura y limpia lo chorreado.']]
          : [[0, 'Falla 1: el forro de plástico se gastó. Queda espacio entre la zapata y la guía.'],
            [4.5, 'La cabina se bambolea y da golpecitos de costado durante el viaje.'],
            [9.5, 'Falla 2: si el forro se gasta hasta el metal, el fierro raspa la guía: chirrido y rayas.'],
            [14, 'Arreglo: con el ascensor detenido y asegurado, cambiar los forros y revisar que la guía tenga su aceite.']];
      },
      anim: function (t, s, K, id) {
        if (id === 'aceiteras') { fallaAceitera(t, s, K); return; }
        var ys = K.kf(t, ROZ_X), v = rapidez(K, ROZ_X, t), nuevo = K.ph(t, 14.4, 15.4);
        var des = t < 9.5 ? 0.25 : t < 14 ? 0 : K.mix(0, 1, nuevo);
        var hol = 0.003 * (1 - des) + 0.0005, sw = Math.sin(t * 13);
        var x = K.entre(t, 4.5, 14) && v > 0.03 ? hol * sw : 0, golpe = K.entre(t, 4.5, 9.5) && v > 0.03 && Math.abs(sw) > 0.85;
        var raspa = K.entre(t, 10.2, 14) && v > 0.03;
        zapataPone(s, K, { ys: ys, x: x, desgaste: des, film: t < 9.5 ? 0.3 : t < 14 ? 0 : 0.3 * nuevo, seco: K.entre(t, 9.5, 14) ? 0.6 : 0.6 * (1 - nuevo), rayas: t >= 10.2 ? [0.45 - 0.065, ys - 0.065] : null, chis: golpe || raspa });
        if (golpe) s.chispas.emitir(t, [(sw > 0 ? 1 : -1) * 0.008, ys, 0.02], true, 0.06);
        else if (raspa) s.chispas.emitir(t, [0.01, ys - 0.065, 0.02], true, 0.07);
        K.marcar(s.forros, t < 9.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15.4 ? 'foco' : null);
        K.marcar(s.zapata, K.entre(t, 9.5, 14) ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        if (t < 4.5) K.rotulo('Forro gastado: queda espacio', [-0.012, ys + 0.06, 0.02], 'izq');
        else if (t < 9.5) { K.rotulo('Zapata', [0, ys, 0.08]); if (v > 0.03) K.aviso('Golpecitos de costado'); }
        else if (t < 14) { K.rotulo('Rayas en la guía', [0, Math.max(0.5, ys - 0.3), 0.035], 'izq'); if (raspa) K.aviso('Chirrido: fierro contra fierro'); }
        else if (t > 15.4) { K.rotulo('Forro nuevo', [-0.012, ys + 0.06, 0.02], 'izq'); K.aviso('Zapata ajustada a la guía', false); }
        var est = t < 9.5 ? ['GASTADO', 'mal'] : t < 14 ? ['SIN FORRO', 'mal'] : nuevo > 0.99 ? ['NUEVO', 'ok'] : ['CAMBIANDO', 'ac'];
        K.tabla([['FORRO', est[0], est[1]], ['JUEGO', t < 14 ? (t < 9.5 ? '5 mm' : 'FIERRO CON FIERRO') : 'SIN JUEGO', t < 14 ? 'mal' : 'ok']]);
      }
    }
  });
  function fallaAceitera(t, s, K) {
    var ys = K.kf(t, ACE_X), v = rapidez(K, ACE_X, t), lleno = K.ph(t, 14.4, 15.8);
    var raspa = K.entre(t, 4.8, 9.5) && v > 0.03, gotea = K.entre(t, 9.5, 14.4);
    var nivel = t < 9.5 ? 0 : t < 14 ? 0.95 : K.mix(0, 0.85, lleno);
    zapataPone(s, K, { ys: ys, nivel: nivel, mechaSeca: t < 14.4, film: t < 4.5 ? 0.1 : t < 9.5 ? 0 : t < 14 ? 0.55 : 0.3, seco: K.entre(t, 4.5, 9.5) ? 0.6 : 0, raja: gotea,
      charco: K.kf(t, [[9.5, 0], [13.8, 1], [15.5, 1], [16.6, 0]]), bandeja: K.kf(t, [[9.5, 0.4], [12, 1]]), chis: raspa });
    if (raspa) s.chispas.emitir(t, [0.01, ys - 0.065, 0.02], true, 0.07);
    if (gotea) gotear(s, t, -0.05, -0.585, 0.009, 0.03, 3, 1.1);
    K.marcar(s.vaso, t < 4.5 || gotea ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15.8 ? 'foco' : null);
    K.marcar(s.mecha, t < 4.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
    if (t < 4.5) { K.rotulo('Vacía', [0.1, ys + 0.14, 0.07]); K.rotulo('Mecha seca y dura', [-0.011, ys + 0.09, 0.03], 'izq'); }
    else if (t < 9.5) { K.rotulo('Guía seca', [0, ys - 0.25, 0.035], 'izq'); if (raspa) K.aviso('Chirrido en todo el viaje'); }
    else if (t < 14) { K.rotulo('Aceite en el foso', [0.24, -0.59, 0.3]); K.rotulo('Bandeja rebalsada', [-0.11, -0.57, 0.02], 'izq'); if (t > 11) K.aviso('Aceite chorreado en el foso'); }
    else if (t > 15.8) { K.rotulo('Aceitera llena', [0.1, ys + 0.14, 0.07]); K.rotulo('Mecha nueva', [-0.011, ys + 0.09, 0.03], 'izq'); K.aviso('Guía apenas mojada', false); }
    K.tabla([['ACEITE', nivel < 0.05 ? 'VACÍA' : gotea ? 'SE CHORREA' : 'LLENA', nivel < 0.05 || gotea ? 'mal' : 'ok'], ['GUÍA', t < 9.5 ? 'SECA' : t < 14 ? 'CHORREADA' : 'APENAS MOJADA', t < 14 ? 'mal' : 'ok']]);
  }
})();
