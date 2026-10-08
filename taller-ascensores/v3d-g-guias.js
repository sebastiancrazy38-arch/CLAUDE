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
    var vidrio = K.mat(0xc3c8cc, { transparent: true, opacity: 0.14, depthWrite: false });
    K.add(K.caja(2.12, 10.4, 0.06, M.muro, 0, 4.7, -1.45));
    K.add(K.caja(0.06, 10.4, 2.5, M.muro, -1.03, 4.7, -0.2));
    K.add(K.caja(0.06, 10.4, 2.5, vidrio, 1.03, 4.7, -0.2));
    K.add(K.caja(2.12, 0.08, 2.5, M.losa || M.gris, 0, -0.54, -0.2));
    // guías de cabina: la izquierda en dos tramos, unidos en JY con una platina atornillada
    s.oxido = K.mat(0x8a4b22, { roughness: 1, metalness: 0, transparent: true, opacity: 0 });
    s.abajo = K.add(K.riel(JY + 0.5)); s.abajo.position.set(-0.76, -0.5, 0); s.abajo.rotation.y = PI / 2;
    s.arriba = K.add(K.riel(9.6 - JY)); s.arriba.position.set(-0.76, JY, 0); s.arriba.rotation.y = PI / 2;
    s.oxM = K.caja(0.019, 3.2, 0.068, s.oxido, 0, 1.6, 0.001); s.arriba.add(s.oxM);
    s.der = K.add(K.riel(10)); s.der.position.set(0.76, -0.5, 0); s.der.rotation.y = -PI / 2;
    s.guiasCab = [s.abajo, s.arriba, s.der];
    s.platina = K.add(K.caja(0.014, 0.4, 0.1, M.hierro, -0.813, JY, 0));
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
    s.bastidor = K.add(K.grupo([K.caja(0.08, 2.95, 0.14, M.aceroOsc, -0.64, 1.225, 0), K.caja(0.08, 2.95, 0.14, M.aceroOsc, 0.64, 1.225, 0),
      K.caja(1.36, 0.16, 0.16, M.aceroOsc, 0, 2.62, 0), K.caja(1.36, 0.14, 0.16, M.aceroOsc, 0, -0.19, 0)]), c);
    K.add(K.caja(1.16, 0.1, 1.26, M.aceroOsc, 0, -0.05, 0), c);
    K.add(K.caja(1.1, 2.2, 1.2, M.panel || M.inox, 0, 1.1, 0), c);
    K.add(K.caja(0.8, 2.0, 0.02, M.inox, 0, 1.0, 0.61), c);
    K.add(K.caja(0.2, 0.08, 0.1, M.hierro, 0, 2.74, 0), c);
    s.zap = [];
    [[-1, 2.62], [1, 2.62], [-1, -0.19], [1, -0.19]].forEach(function (q) {
      var z = zapataU(K, s.forro); z.g.position.set(q[0] * 0.725, q[1], 0); if (q[0] > 0) z.g.scale.x = -1; K.add(z.g, c); s.zap.push(z.g);
    });
    s.paracaidas = [-1, 1].map(function (d) {
      return K.add(K.grupo([K.caja(0.04, 0.17, 0.11, M.gris, d * 0.69, 0.08, 0), K.caja(0.07, 0.17, 0.02, M.gris, d * 0.74, 0.08, 0.022), K.caja(0.07, 0.17, 0.02, M.gris, d * 0.74, 0.08, -0.022),
        K.caja(0.05, 0.04, 0.04, M.amarillo, d * 0.69, 0.18, 0.05)]), c);
    });
    s.cables = [0, 1, 2, 3].map(function () { return K.add(K.cable(0.006, M.hierro)); });
    s.cablesCp = [0, 1, 2, 3].map(function () { return K.add(K.cable(0.006, M.hierro)); });
    s.chispas = K.add(K.chispas(16)); s.chispas2 = K.add(K.chispas(16));
    return s;
  }
  function huecoPone(s, K, o) {
    var y = o.y, cy = CP0 - y, cx = o.cpX || 0;
    s.car.position.set(o.carX || 0, y, 0); s.car.rotation.x = o.incl || 0;
    s.cp.position.set(cx, cy, CPZ); s.cp.rotation.z = o.cpRz || 0;
    s.arriba.position.z = o.paso || 0;
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
        [[0, [2.6, 4.2, 5.4], [-0.2, 2.6, -0.3]], [3.2, [2.3, 4.1, 4.9], [-0.3, 2.9, -0.2]], [5, [-0.4, 4.7, 1.05], [-0.74, 4.4, 0]], [9, [-0.4, 5.35, 1.05], [-0.74, 5.05, 0]],
          [10.5, [2.4, 4.4, 4.6], [-0.2, 2.6, -0.3]], [12.5, [2.4, 3.6, 4.6], [-0.2, 2.0, -0.3]], [14.2, [-0.25, 0.3, 1.25], [-0.72, 0.6, 0]], [18, [-0.2, 0.35, 1.4], [-0.72, 0.6, 0]]],
        [[0, [-0.42, 4.35, 1.05], [-0.76, 4.02, 0]], [8.5, [-0.42, 4.35, 1.05], [-0.76, 4.02, 0]], [9.8, [-0.42, 5.2, 1.0], [-0.76, 4.92, 0]], [13.5, [-0.42, 4.55, 1.0], [-0.76, 4.3, 0]],
          [15, [-0.3, 4.4, 1.7], [-0.7, 3.9, 0]], [18, [-0.3, 4.1, 1.7], [-0.7, 3.6, 0]]]
      ],
      guias_contrapeso: [
        [[0, [1.9, 6.6, 2.4], [0, 4.4, -1.1]], [4, [1.9, 6.0, 2.6], [0, 4.0, -1.0]], [9, [2.4, 4.6, 2.2], [0, 3.4, -0.9]], [12, [2.4, 4.3, 2.2], [0, 3.0, -0.9]],
          [13.6, [0.95, 4.0, -0.45], [0.37, 3.62, -1.1]], [18, [0.95, 4.8, -0.45], [0.37, 4.42, -1.1]]],
        [[0, [1.6, 6.2, 1.2], [0, 3.9, -1.1]], [9, [1.6, 5.4, 1.2], [0, 3.3, -1.1]], [10, [0.95, 4.4, -0.45], [0.37, 4.05, -1.1]], [13.5, [0.95, 5.5, -0.45], [0.37, 5.2, -1.1]],
          [15, [1.7, 6.2, 1.6], [0, 4.4, -1.1]], [18, [1.7, 5.8, 1.6], [0, 4.0, -1.1]]]
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
          if (t < 4.5) { K.rotulo('Guía de cabina', [-0.74, 3.6, 0], 'izq'); K.rotulo('Guía de cabina', [0.74, 3.6, 0]); K.rotulo('Soporte', [-0.9, 1.84, 0.05], 'izq'); }
          else if (t < 9) { K.rotulo('Zapata', [-0.69, y + 2.62, 0.05]); K.rotulo('Guía', [-0.74, y + 2.95, 0], 'izq'); }
          else if (t < 13.5) K.rotulo('Cables: cargan el peso', [0, y + 3.5, 0]);
          else K.rotulo('Paracaídas', [-0.7, y + 0.12, 0.06]);
          K.tabla([['CABINA', mov, mov === 'PARADA' ? '' : 'ac'], ['GUÍAS', 'LIMPIAS Y DERECHAS', 'ok']]);
        } else {
          K.marcar(s.guiasCp, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          K.marcar(s.cp, K.entre(t, 4.5, 9) ? 'foco' : null);
          K.marcar(s.zapCp, t >= 13.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
          if (t < 4.5) { K.rotulo('Guías del contrapeso', [CPX - 0.02, 2.6, CPZ]); K.rotulo('Guía de cabina', [0.74, 3.2, 0]); }
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
        var paso = 0.02 * (1 - arreglo), zs = y + 2.62, d = zs - JY;
        var cruzo = K.ph(d, -0.04, 0.04), osc = d > 0 && t < 13.5 ? 0.012 * Math.exp(-d / 0.25) * Math.sin(d * 60) : 0;
        var ox = K.ph(t, 9, 10) * (1 - arreglo), mueve = rumbo(K, CAB_X, t) !== 'PARADA';
        var toc = t < 13.5 && d > -0.03 && d < 0.12, raspa = K.entre(t, 9.6, 13.5) && mueve;
        huecoPone(s, K, { y: y, paso: paso, incl: paso * cruzo / 2.8 + osc, carX: osc * 0.6, ox: ox, chis: toc || raspa });
        if (toc) s.chispas.emitir(t, [-0.725, JY, 0.03], true, 0.12);
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
})();
