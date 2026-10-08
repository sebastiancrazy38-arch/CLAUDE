/* Taller de Ascensores — videos 3D: la puerta de piso y lo que la mueve (cabezal, roldanas, cable de sincronismo,
   pesa de cierre, guiadores y pisadera). Mismo formato que v3d-maquina.js.
   Medidas en metros: el pasillo queda hacia +Z, el hueco hacia -Z y el piso del pasillo en y = 0.
   Todas las escenas comparten la misma puerta (armar) y la misma función que la pone en posición (pone). */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  // ---------- textos sencillos de cada pieza ----------
  S.puerta_piso = {
    que: 'Es la puerta que ves en el pasillo de cada piso: dos hojas de metal que se abren desde el centro.',
    sirve: 'Tapa el hueco del ascensor para que nadie se caiga cuando la cabina está en otro piso.',
    falla: 'Si un golpe la daña, no cierra bien y el ascensor se queda; o cede al empujarla, y eso es muy peligroso.',
    arreglo: 'Se deja el ascensor fuera de servicio; el técnico cambia los tacos guía rotos, endereza la hoja y prueba que trabe.'
  };
  S.cabezal_piso = {
    que: 'Es el mecanismo escondido arriba de la puerta de piso, del lado del hueco: riel, carros con ruedas, cable y pesa.',
    sirve: 'Sostiene las hojas colgadas, hace que se muevan juntas y las cierra solas cuando la cabina se va.',
    falla: 'Si el riel se ensucia con grasa y polvo, la puerta corre a tirones y no termina de cerrar.',
    arreglo: 'Se limpia el riel y se deja seco, sin aceite, y se ajustan los carros para que las hojas cuelguen derechas.'
  };
  S.roldanas_puerta = {
    que: 'Son ruedas de plástico duro de las que cuelga cada hoja; debajo del riel van otras más chicas, las contrarruedas.',
    sirve: 'Hacen correr la hoja suave y sin ruido sobre el riel; las contrarruedas no la dejan salirse.',
    falla: 'Si una rueda se gasta y queda plana de un lado, la hoja salta y suena tac-tac al abrir y cerrar.',
    arreglo: 'Se cambia la rueda dañada y se regula la contrarrueda casi pegada al riel, con el ascensor detenido.'
  };
  S.cable_sincronismo = {
    que: 'Es un cable de acero delgado, cerrado como un lazo, que da la vuelta en dos poleítas encima de la puerta.',
    sirve: 'Une las dos hojas: cuando la cabina mueve una, el cable jala la otra y las dos abren a la vez.',
    falla: 'Si el cable se afloja o se rompe, una hoja llega tarde o se queda, y el ascensor no sale del piso.',
    arreglo: 'Se tensa o se cambia el cable, se ajustan sus grapas y se prueba que las hojas se junten al centro.'
  };
  S.pesa_cierre = {
    que: 'Es una barra de fierro que cuelga de un cordón, dentro de un tubo, al costado de la puerta de piso.',
    sirve: 'Cierra sola la puerta de piso cuando la cabina la suelta, para que el hueco nunca quede abierto.',
    falla: 'Si el cordón se rompe, la pesa cae al fondo y la puerta puede quedar entreabierta: el ascensor se para.',
    arreglo: 'Con el ascensor fuera de servicio, se cambia el cordón y se prueba que la puerta cierre sola.'
  };
  S.guiadores_puerta = {
    que: 'Son tacos de plástico atornillados debajo de cada hoja, metidos en la ranura de la pisadera.',
    sirve: 'Guían la hoja por abajo, como un tren en su riel, para que no se balancee hacia el hueco.',
    falla: 'Gastados, la hoja baila y golpetea; si un golpe los rompe, la hoja cede hacia el hueco y es peligroso.',
    arreglo: 'Se deja el ascensor fuera de servicio y se cambian los tacos, revisando que la hoja corra derecha.'
  };
  S.pisadera = {
    que: 'Es el umbral de aluminio con una ranura que pisas al entrar; hay una en cada piso y otra en la cabina.',
    sirve: 'Aguanta el peso de la gente y su ranura guía las hojas de la puerta por abajo.',
    falla: 'Una piedrita o un tornillo en la ranura traba la puerta: no cierra, se vuelve a abrir y el ascensor no sale.',
    arreglo: 'Con el ascensor detenido, se limpia la ranura con brocha o aspiradora y se prueba la puerta.'
  };

  // ---------- medidas de la puerta ----------
  var HW = 0.42, CORRE = 0.40;                 // ancho de cada hoja y cuánto corre al abrir
  var ZH = -0.06, YP = 2.01;                   // plano de las hojas (y del riel) y borde de arriba de las hojas
  var YR = 2.17, RR = 0.03, ZP = -0.035;       // riel, radio de las roldanas y plano de las placas de los carros
  var ZC = -0.105, XP = 0.87, YCS = 2.36, RP = 0.03;    // cable de sincronismo y sus dos poleítas
  var XW = -1.0, YW = 2.40, RW = 0.025, W0 = 1.62;     // pesa de cierre: tubo, poleíta y altura con la puerta cerrada
  var LR = 2 * XP, LA = PI * RP, LAZO = 2 * LR + 2 * LA;

  // tiende una línea quebrada con los tramos de cable que haya (los que sobran se esconden)
  function linea(segs, pts) { segs.forEach(function (c, i) { c.visible = i < pts.length - 1; if (c.visible) c.pon(pts[i], pts[i + 1]); }); }
  // tramo de cable colgando entre x0 y x1 (comba = cuánto baja al medio)
  function comba(x0, x1, y, g) {
    var p = [], n = 8, k = Math.min(1, Math.abs(x1 - x0) / 0.9);
    for (var i = 0; i <= n; i++) { var u = i / n; p.push([x0 + (x1 - x0) * u, y - g * k * 4 * u * (1 - u), ZC]); }
    return p;
  }
  // punto del lazo del cable a una distancia u desde la punta de arriba a la izquierda
  function enLazo(u) {
    u = ((u % LAZO) + LAZO) % LAZO;
    if (u < LR) return [-XP + u, YCS + RP, ZC]; u -= LR;
    if (u < LA) { var a = PI / 2 - u / RP; return [XP + RP * Math.cos(a), YCS + RP * Math.sin(a), ZC]; } u -= LA;
    if (u < LR) return [XP - u, YCS - RP, ZC]; u -= LR;
    var b = -PI / 2 - u / RP; return [-XP + RP * Math.cos(b), YCS + RP * Math.sin(b), ZC];
  }
  // escalera suave: la puerta avanza a tirones (se queda, salta, se queda...)
  function tirones(a, n) { var q = a * n, f = Math.floor(q); return (f + Math.pow(Math.min(1, Math.max(0, (q - f - 0.5) / 0.5)), 0.6)) / n; }
  function estado(a, da) { return a > 0.98 ? ['ABIERTA', 'ac'] : a < 0.01 ? ['CERRADA', 'ok'] : da > 0 ? ['ABRIENDO', 'ac'] : da < 0 ? ['CERRANDO', 'ac'] : ['A MEDIAS', 'mal']; }

  // ---------- la puerta de piso completa ----------
  // op.vista: 'hueco' (cámara dentro del hueco) o 'pasillo'; op.cabina: cabina detrás; op.patin: patín de la cabina;
  // op.pesa: pesa de cierre; op.cuentas: marcas que corren con el cable; op.pasta: riel sucio; op.corte: pisadera cortada en esa x
  function armar(K, op) {
    var M = K.M, T = K.T, s = { op: op };
    var hueco = op.vista === 'hueco';
    var lin = function (h) { return new T.Color(h).convertSRGBToLinear(); };   // colores tal como se ven en pantalla
    var m = s.m = {
      muro: K.mat(lin(hueco ? 0x8a9299 : 0xbcae94), { roughness: 0.95, metalness: 0 }),
      cabezal: K.mat(lin(0x4f5961), { metalness: 0.35, roughness: 0.5 }),
      carro: K.mat(lin(0xa3aeb8), { metalness: 0.3, roughness: 0.45 }),
      rendija: K.matB(0xff3b30, { transparent: true, opacity: 0.75 }),
      alu: K.mat(0xb7bec5, { metalness: 0.55, roughness: 0.35 }),
      nylon: K.mat(0xf3f0e8, { roughness: 0.45, metalness: 0 }),
      cable: K.mat(0xe6ebef, { metalness: 0.6, roughness: 0.25 }),
      cordon: K.mat(lin(0x17a398), { roughness: 0.6, metalness: 0 }),
      taco: K.mat(lin(0x1f6fd1), { roughness: 0.5, metalness: 0 }),
      fondo: K.mat(lin(0x23282d), { roughness: 0.9, metalness: 0 }),
      pesa: K.mat(0x4b5259, { roughness: 0.6, metalness: 0.35 }),
      oscuro: K.mat(0x22272c, { roughness: 1, metalness: 0 }),
      pasta: K.mat(0x15110d, { roughness: 1, metalness: 0 }),
      hall: K.mat(lin(0x7a7064), { roughness: 0.9, metalness: 0 })
    };
    if (hueco) { var l = new T.DirectionalLight(0xffffff, 0.6); l.position.set(-1.5, 4.5, -5); K.add(l); }
    // muro del frente con el vano (cara del hueco en z = 0, cara del pasillo en z = 0.16)
    K.add(K.caja(1.3, 3.45, 0.16, m.muro, -1.05, 1.225, 0.08)); K.add(K.caja(1.3, 3.45, 0.16, m.muro, 1.05, 1.225, 0.08));
    K.add(K.caja(0.8, 0.91, 0.16, m.muro, 0, 2.495, 0.08)); K.add(K.caja(0.8, 0.5, 0.16, m.hall, 0, -0.25, 0.08));
    // marco de acero del lado del pasillo
    K.add(K.caja(0.07, 2.1, 0.03, M.inox, -0.435, 1.05, 0.175)); K.add(K.caja(0.07, 2.1, 0.03, M.inox, 0.435, 1.05, 0.175));
    K.add(K.caja(0.94, 0.07, 0.03, M.inox, 0, 2.075, 0.175));
    K.add(K.caja(0.012, 2.04, 0.16, M.inox, -0.396, 1.02, 0.08)); K.add(K.caja(0.012, 2.04, 0.16, M.inox, 0.396, 1.02, 0.08));

    // pisadera de piso: dos labios de aluminio y la ranura entre ellos (bajo las hojas).
    // op.corte: la pisadera termina cortada en esa x, con la cara del corte pintada, para ver la ranura por dentro
    var x1 = op.corte || 0.86, lp = x1 + 0.86, cxp = (x1 - 0.86) / 2;
    s.pisadera = [K.add(K.caja(lp, 0.008, 0.10, m.fondo, cxp, -0.022, -0.05))];
    s.labioA = K.add(K.caja(lp, 0.018, 0.032, m.alu, cxp, -0.009, -0.084));
    s.labioB = K.add(K.caja(lp, 0.018, 0.052, m.alu, cxp, -0.009, -0.026));
    s.pisadera.push(s.labioA, s.labioB);
    [-0.042, -0.026, -0.010].forEach(function (z) { s.pisadera.push(K.add(K.caja(lp, 0.002, 0.004, M.aceroOsc, cxp, 0.0005, z))); });
    K.add(K.caja(lp, 0.1, 0.006, m.fondo, cxp, -0.076, -0.097));
    if (op.corte) {
      var tapa = K.mat(lin(0xf08a24), { roughness: 0.6, metalness: 0 });
      s.corte = [K.add(K.caja(0.002, 0.018, 0.032, tapa, x1 + 0.001, -0.009, -0.084)), K.add(K.caja(0.002, 0.018, 0.052, tapa, x1 + 0.001, -0.009, -0.026)),
        K.add(K.caja(0.002, 0.008, 0.1, tapa, x1 + 0.001, -0.022, -0.05))];
    }

    // cabezal: plancha en el muro y el riel, sujeto solo en sus puntas
    s.placa = K.add(K.caja(2.1, 0.42, 0.012, m.cabezal, 0, 2.25, -0.006));
    s.riel = K.add(K.caja(1.84, 0.03, 0.03, M.acero, 0, YR, ZH));
    K.add(K.caja(0.03, 0.03, 0.05, M.aceroOsc, -0.905, YR, -0.035)); K.add(K.caja(0.03, 0.03, 0.05, M.aceroOsc, 0.905, YR, -0.035));

    // hojas: cada una cuelga de un carro con dos roldanas arriba del riel y dos contrarruedas abajo
    s.hojas = [-1, 1].map(function (lado) {
      var h = { lado: lado }, g = h.g = new T.Group(); K.add(g);
      var piv = h.piv = new T.Group(); piv.position.set(0, YP, ZH); g.add(piv);   // la hoja cuelga de aquí y puede balancearse
      h.panel = K.caja(HW, 2.0, 0.025, M.inox, 0, -1.0, 0); piv.add(h.panel);
      piv.add(K.caja(0.01, 2.0, 0.027, M.goma, -lado * (HW / 2 - 0.005), -1.0, 0));
      h.guias = [-0.15, 0.15].map(function (x) {
        var lengua = K.caja(0.05, 0.024, 0.01, m.taco, x, -2.008, 0), placa = K.caja(0.06, 0.03, 0.004, M.hierro, x, -1.985, -0.0145);
        piv.add(lengua, placa); return { lengua: lengua, placa: placa, x: x };
      });
      h.carro = K.caja(0.36, 0.32, 0.008, m.carro, 0, 2.14, ZP); g.add(h.carro);
      g.add(K.caja(0.3, 0.03, 0.04, M.aceroOsc, 0, 2.0, -0.05));
      h.ruedas = [-0.11, 0.11].map(function (x) {
        var w = new T.Group(); w.position.set(x, YR + 0.015 + RR, ZH); g.add(w);
        w.add(K.cil(RR, 0.02, m.nylon, 0, 0, 0, 'z', 28), K.cil(0.011, 0.024, M.hierro, 0, 0, 0, 'z', 12));
        w.add(K.caja(0.005, RR * 1.6, 0.003, M.aceroOsc, 0, 0, -0.0105), K.caja(RR * 1.6, 0.005, 0.003, M.aceroOsc, 0, 0, -0.0105));
        g.add(K.cil(0.006, 0.03, M.hierro, x, YR + 0.015 + RR, -0.0475, 'z', 8));
        return w;
      });
      h.contra = [-0.11, 0.11].map(function (x) {
        var c = K.grupo([K.cil(0.013, 0.016, M.acero, 0, 0, 0, 'z', 16), K.cil(0.005, 0.03, M.hierro, 0, 0, 0.0125, 'z', 8)], x, YR - 0.015 - 0.013 - 0.003, ZH);
        g.add(c); return c;
      });
      // brazo y grapa que amarran el carro al cable: la izquierda al tramo de arriba, la derecha al de abajo
      var yc = lado < 0 ? YCS + RP : YCS - RP, xa = lado < 0 ? 0.1 : -0.1;
      g.add(K.caja(0.02, yc - 2.29, 0.006, M.aceroOsc, xa, (yc + 2.29) / 2, ZP), K.caja(0.02, 0.012, 0.07, M.aceroOsc, xa, yc, -0.07));
      h.grapa = K.caja(0.03, 0.02, 0.018, M.cobre, xa, yc, ZC); g.add(h.grapa);
      if (lado > 0) {
        // ruedas de la cerradura que agarra el patín de la cabina, y el amarre del cordón de la pesa
        g.add(K.caja(0.12, 0.1, 0.006, M.aceroOsc, -0.1, 1.95, -0.0755));
        h.rodCer = [-0.13, -0.07].map(function (x) { var r = K.cil(0.016, 0.03, M.goma, x, 1.93, -0.093, 'z', 14); g.add(r); return r; });
        g.add(K.caja(0.07, 0.05, 0.03, M.negro, 0.07, 1.96, -0.09));
        if (op.pesa) g.add(K.caja(0.012, 0.14, 0.006, M.aceroOsc, -0.16, 2.36, ZP), K.caja(0.012, 0.012, 0.03, M.aceroOsc, -0.16, YW + RW, -0.05));
      }
      h.todo = [h.panel, h.carro];
      return h;
    });

    // cable de sincronismo: lazo cerrado entre dos poleítas
    var segs = function (n) { var a = []; for (var i = 0; i < n; i++) a.push(K.add(K.cable(0.0035, m.cable))); return a; };
    s.cabT = segs(16); s.cabB = segs(2); s.cabX = segs(5);
    s.arcos = [-1, 1].map(function (lado) { var t = K.add(K.toro(RP, 0.0035, m.cable, lado * XP, YCS, ZC, PI)); t.rotation.z = lado < 0 ? PI / 2 : -PI / 2; return t; });
    s.poleas = [-1, 1].map(function (lado) {
      K.add(K.cil(0.007, 0.1, M.hierro, lado * XP, YCS, -0.056, 'z', 8));
      var p = K.add(K.polea(RP * 0.92, 0.014, m.nylon, M.hierro)); p.position.set(lado * XP, YCS, ZC); return p;
    });
    // tensor del cable: perno con tuerca junto a la poleíta derecha
    s.tensor = [K.add(K.cil(0.005, 0.1, M.acero, XP + 0.05, YCS, -0.056, 'x', 8)), K.add(K.cil(0.011, 0.014, M.hierro, XP + 0.075, YCS, -0.056, 'x', 6)),
      K.add(K.caja(0.012, 0.05, 0.05, M.aceroOsc, XP + 0.1, YCS, -0.035))];
    s.cable = s.cabT.concat(s.cabB, s.cabX, s.arcos);
    if (op.cuentas) { s.cuentas = []; for (var i = 0; i < 12; i++) s.cuentas.push(K.add(K.esfera(0.0065, M.negro))); }

    // pesa de cierre: tubo abierto hacia el hueco, pesa, cordón y poleíta
    if (op.pesa) {
      K.add(K.caja(0.07, 0.97, 0.004, M.aceroOsc, XW, 1.835, -0.028));
      K.add(K.caja(0.004, 0.97, 0.05, M.aceroOsc, XW - 0.035, 1.835, -0.053)); K.add(K.caja(0.004, 0.97, 0.05, M.aceroOsc, XW + 0.035, 1.835, -0.053));
      K.add(K.cil(0.022, 0.02, M.goma, XW, 1.36, ZH));
      s.pesa = K.add(K.grupo([K.cil(0.024, 0.26, m.pesa, 0, 0, 0, null, 16), K.cil(0.006, 0.02, M.hierro, 0, 0.14, 0, null, 8)], XW, W0, ZH));
      K.add(K.cil(0.006, 0.05, M.hierro, XW + RW, YW, -0.036, 'z', 8));
      s.polW = K.add(K.polea(RW, 0.012, M.negro, M.hierro)); s.polW.position.set(XW + RW, YW, ZH);
      var arco = K.add(K.toro(RW, 0.003, m.cordon, XW + RW, YW, ZH, PI / 2)); arco.rotation.z = PI / 2;
      s.cordV = K.add(K.cable(0.003, m.cordon)); s.cordH = K.add(K.cable(0.003, m.cordon)); s.cordS = K.add(K.cable(0.003, m.cordon));
      s.cordon = [s.cordV, s.cordH, s.cordS, arco];
    }

    // pasta de grasa y polvo sobre el riel
    if (op.pasta) { s.pasta = [-0.62, -0.38, -0.12, 0.1, 0.33, 0.55, 0.74].map(function (x, i) { return K.add(K.caja(0.06 + K.ruido(i) * 0.05, 0.01, 0.036, m.pasta, x, YR + 0.018, ZH)); }); }

    // puerta de la cabina (sólida si se ve la cabina; transparente si solo interesa su patín) y el patín
    if (op.cabina || op.patin) {
      s.cabHojas = [-1, 1].map(function () { var g = new T.Group(); K.add(g); if (op.cabina) g.add(K.caja(HW, 2.0, 0.02, M.inox, 0, 1.01, -0.185)); return g; });
      if (op.patin) {
        var pm = K.mat(lin(0x3b4148), { metalness: 0.4, roughness: 0.5 });
        s.patin = K.grupo([K.caja(0.012, 0.44, 0.03, pm, -0.052, 0, 0), K.caja(0.012, 0.44, 0.03, pm, 0.052, 0, 0),
          K.caja(0.12, 0.02, 0.03, pm, 0, 0.21, -0.02), K.caja(0.12, 0.02, 0.03, pm, 0, -0.21, -0.02),
          K.caja(0.03, 0.02, 0.09, pm, 0, 0.21, -0.075), K.caja(0.03, 0.02, 0.09, pm, 0, -0.21, -0.075)], -0.1, 1.93, -0.093);
        s.cabHojas[1].add(s.patin);
      }
    }
    if (op.cabina) {
      var c = s.car = new T.Group(); K.add(c);
      c.add(K.caja(1.6, 0.05, 1.3, M.piso, 0, -0.025, -0.86), K.caja(1.6, 2.3, 0.03, M.panel, 0, 1.15, -1.5));
      c.add(K.caja(0.03, 2.3, 1.3, M.panel, -0.8, 1.15, -0.86), K.caja(0.03, 2.3, 1.3, M.panel, 0.8, 1.15, -0.86));
      c.add(K.caja(1.6, 0.04, 1.3, M.panel, 0, 2.32, -0.86), K.caja(0.7, 0.01, 0.5, M.luz, 0, 2.295, -0.9));
      c.add(K.caja(0.4, 2.3, 0.03, M.inox, -0.6, 1.15, -0.215), K.caja(0.4, 2.3, 0.03, M.inox, 0.6, 1.15, -0.215), K.caja(0.8, 0.28, 0.03, M.inox, 0, 2.16, -0.215));
      c.add(K.caja(1.5, 0.04, 0.04, M.cromo, 0, 0.95, -1.46));
      s.pisCab = [K.caja(1.0, 0.025, 0.08, m.alu, 0, -0.0125, -0.17), K.caja(1.0, 0.003, 0.012, M.negro, 0, 0.0005, -0.185)];
      c.add(K.caja(1.0, 0.7, 0.006, m.fondo, 0, -0.375, -0.133));   // guardapiés bajo la pisadera de la cabina
      s.pisCab.forEach(function (o) { c.add(o); });
    }
    if (!hueco) {
      // pasillo, fondo oscuro del hueco, botonera e indicador del piso
      K.add(K.caja(3.4, 0.04, 2.4, m.hall, 0, -0.02, 1.36));
      K.add(K.caja(1.95, 6, 0.05, m.oscuro, 0, -0.05, -1.75));
      K.add(K.caja(0.05, 6, 1.75, m.oscuro, -0.95, -0.05, -0.88)); K.add(K.caja(0.05, 6, 1.75, m.oscuro, 0.95, -0.05, -0.88));
      K.add(K.caja(0.09, 0.2, 0.014, M.inox, -1.2, 1.1, 0.167));
      K.add(K.cil(0.02, 0.012, M.grisClaro, -1.2, 1.1, 0.176, 'z', 18));
      s.botonLuz = K.add(K.cil(0.021, 0.013, s.amarB = K.matB(0xffc62b), -1.2, 1.1, 0.177, 'z', 18));
      s.indicador = K.add(K.cartel('3', 0.16, 0.08, '#1b262f', '#ff5a3c')); s.indicador.position.set(0, 2.28, 0.163); s.pisoTxt = '3';
    }
    // franja roja que marca la rendija cuando las hojas no se juntan
    s.rendija = K.add(K.caja(1, 1.98, 0.006, m.rendija, 0, 1.01, ZH)); s.rendija.visible = false;
    // todo lo que se puede pintar: cada cuadro se despinta y se vuelve a pintar lo que toca
    s.marcables = [s.placa, s.riel].concat(s.pisadera, s.cable, s.poleas, s.tensor, s.pasta || [], s.pisCab || []);
    s.hojas.forEach(function (h) { s.marcables.push(h.panel, h.carro); s.marcables = s.marcables.concat(h.ruedas, h.contra, h.guias.map(function (g) { return g.lengua; })); });
    if (s.pesa) s.marcables = s.marcables.concat([s.pesa], s.cordon);
    if (s.patin) s.marcables.push(s.patin);
    return s;
  }

  // pone la puerta en el segundo pedido. o.a: apertura de la hoja derecha (0 cerrada, 1 abierta); o.aL: la izquierda;
  // o.aC: puerta de cabina; o.cy: altura de la cabina; o.yR/o.yL: saltos de la hoja; o.swR/o.swL: hoja que se va
  // hacia el hueco por abajo; o.tzR: hoja torcida; o.cable: 'ok' | 'flojo' | 'roto'; o.comba; o.cordonRoto; o.wy
  function pone(s, K, o) {
    var aR = o.a || 0, aL = o.aL == null ? aR : o.aL, aC = o.aC == null ? aR : o.aC, cy = o.cy || 0;
    var dR = CORRE * aR, dL = CORRE * aL, hL = s.hojas[0], hR = s.hojas[1];
    hL.g.position.set(-HW / 2 - dL, o.yL || 0, 0); hR.g.position.set(HW / 2 + dR, o.yR || 0, 0);
    hL.piv.rotation.set(o.swL || 0, 0, 0); hR.piv.rotation.set(o.swR || 0, 0, o.tzR || 0);
    hL.ruedas.forEach(function (w) { w.rotation.z = dL / RR; });
    hR.ruedas.forEach(function (w) { w.rotation.z = -dR / RR; });
    // cable de sincronismo
    var cab = o.cable || 'ok', xl = hL.g.position.x + 0.1, yT = YCS + RP, yB = YCS - RP;
    s.poleas.forEach(function (p) { p.rotation.z = dR / RP; });
    linea(s.cabB, [[-XP, yB, ZC], [XP, yB, ZC]]);
    if (cab === 'flojo') { linea(s.cabT, comba(-XP, xl, yT, o.comba || 0).concat(comba(xl, XP, yT, o.comba || 0).slice(1))); linea(s.cabX, []); }
    else if (cab === 'roto') {
      linea(s.cabT, [[-XP, yT, ZC], [xl, yT, ZC], [xl + 0.05, yT - 0.015, ZC], [xl + 0.08, yT - 0.07, ZC], [xl + 0.09, yT - 0.15, ZC]]);
      linea(s.cabX, [[XP, yT, ZC], [XP - 0.12, yT - 0.006, ZC], [XP - 0.2, yT - 0.04, ZC], [XP - 0.24, yT - 0.11, ZC], [XP - 0.25, yT - 0.19, ZC]]);
    } else { linea(s.cabT, [[-XP, yT, ZC], [XP, yT, ZC]]); linea(s.cabX, []); }
    if (o.rendija) { var ancho = dR + dL; s.rendija.visible = ancho > 0.012 && ancho < 0.12; s.rendija.scale.x = Math.max(0.001, ancho - 0.006); s.rendija.position.x = (dR - dL) / 2; }
    else s.rendija.visible = false;
    if (s.cuentas) s.cuentas.forEach(function (b, i) { var v = enLazo(i * LAZO / s.cuentas.length - dR); b.position.set(v[0], v[1], v[2]); b.visible = cab === 'ok' && !o.sinCuentas; });
    // pesa de cierre (el cordón va amarrado al carro derecho: al abrir, la pesa sube)
    if (s.pesa) {
      var wy = o.wy != null ? o.wy : W0 + dR, xa = hR.g.position.x - 0.16, yTop = wy + 0.13;
      s.pesa.position.y = wy; s.polW.rotation.z = -dR / RW;
      s.cordH.pon([XW + RW, YW + RW, ZH], [xa, YW + RW + (o.yR || 0), ZH]);
      if (o.cordonRoto) { s.cordV.pon([XW, YW, ZH], [XW + 0.006, YW - 0.12, ZH]); s.cordS.visible = true; s.cordS.pon([XW, yTop, ZH], [XW + 0.012, yTop + 0.06, ZH]); }
      else { s.cordV.pon([XW, yTop, ZH], [XW, YW, ZH]); s.cordS.visible = false; }
    }
    // puerta de cabina, patín y cabina
    if (s.cabHojas) {
      var vis = Math.abs(cy) < 2.9;
      s.cabHojas[0].position.set(-HW / 2 - CORRE * aC, cy, 0); s.cabHojas[1].position.set(HW / 2 + CORRE * aC, cy, 0);
      s.cabHojas.forEach(function (g) { g.visible = vis; });
      if (s.car) { s.car.position.y = cy; s.car.visible = vis; }
    }
  }
  // número del piso en el indicador del pasillo (solo se vuelve a pintar si cambia)
  function piso(s, txt) { if (s.indicador && s.pisoTxt !== txt) { s.pisoTxt = txt; s.indicador.escribir(txt); } }
  function hojaX(s, i) { return s.hojas[i].g.position.x; }

  // =====================================================================================
  // 1) PUERTA DE PISO — vista desde el pasillo
  // =====================================================================================
  V3.escena('puerta-piso', ['puerta_piso'], {
    fov: 34, poster: 6.5,
    construir: function (K) {
      var M = K.M, s = armar(K, { vista: 'pasillo', cabina: true });
      s.pers = K.add(K.persona(1.68, 0x6a7f94));
      s.carro = K.add(K.grupo([K.caja(0.5, 0.32, 0.7, K.mat(0x3d6f9e), 0, 0.27, 0), K.caja(0.46, 0.04, 0.66, M.aceroOsc, 0, 0.09, 0),
        K.cil(0.04, 0.03, M.goma, -0.2, 0.04, 0.26, 'x'), K.cil(0.04, 0.03, M.goma, 0.2, 0.04, 0.26, 'x'), K.cil(0.04, 0.03, M.goma, -0.2, 0.04, -0.26, 'x'), K.cil(0.04, 0.03, M.goma, 0.2, 0.04, -0.26, 'x'),
        K.caja(0.5, 0.03, 0.03, M.aceroOsc, 0, 0.75, 0.36), K.caja(0.03, 0.34, 0.03, M.aceroOsc, -0.23, 0.58, 0.36), K.caja(0.03, 0.34, 0.03, M.aceroOsc, 0.23, 0.58, 0.36)]));
      s.abollon = K.caja(0.12, 0.09, 0.004, K.mat(0x8c939a, { roughness: 0.7 }), -0.08, -1.82, 0.0135); s.hojas[1].piv.add(s.abollon); s.marcables.push(s.abollon);
      s.flecha = K.add(K.flecha(0xf2b705, 0.016));
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'Esta es la puerta de piso, la que ves en el pasillo. Tapa el hueco cuando la cabina no está.'],
        [4.5, 'No tiene motor. Cuando llega la cabina, su puerta la engancha y las dos se abren juntas.'],
        [9.5, 'La persona entra, las dos puertas se cierran juntas y recién ahí la cabina se va.'],
        [14, 'Sin la cabina detrás, la puerta queda cerrada y trabada: desde el pasillo no se abre.']],
      cam: [[0, [1.5, 1.6, 3.7], [0, 1.1, 0]], [4.5, [1.0, 1.5, 3.4], [0.05, 1.0, -0.3]], [9.5, [1.9, 1.7, 2.8], [0, 1.0, -0.35]], [13.6, [2.3, 1.6, 2.5], [0, 1.0, 0]], [18, [2.4, 1.6, 2.6], [0, 1.05, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var cy = K.kf(t, [[0, -3.2], [1.6, -3.2], [4.6, 0], [14.6, 0], [16.8, 3.2]]);
        var fa = function (x) { return K.kf(x, [[0, 0], [5, 0], [7.5, 1], [12.3, 1], [14.3, 0]]); }, a = fa(t);
        pone(s, K, { a: a, cy: cy });
        piso(s, cy < -1.6 ? '2' : cy > 1.6 ? '4' : '3');
        s.botonLuz.visible = K.entre(t, 1.3, 5);
        // la persona llama, espera, entra y se va con la cabina
        var px = K.kf(t, [[9.4, -0.96], [10.6, 0]]), pz = K.kf(t, [[9.9, 0.8], [12.1, -0.75]]);
        s.pers.position.set(px, pz < -0.2 ? cy : 0, pz); s.pers.rotation.y = PI; s.pers.visible = cy < 1.2;
        s.pers.caminar(t, K.entre(t, 9.6, 12.1) ? 1 : 0);
        s.pers.brazoD.rotation.x = -K.kf(t, [[0.8, 0], [1.2, 1.25], [1.8, 1.25], [2.2, 0]]);
        s.carro.visible = false; s.abollon.visible = false;
        K.marcar([s.hojas[0].panel, s.hojas[1].panel], t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : t >= 14 ? 'foco' : null);
        s.flecha.visible = t > 14.6;
        if (s.flecha.visible) { var e = K.kf(t, [[14.6, 0], [15.4, 1], [16.2, 0], [17, 1]]); s.flecha.apuntar([0.25, 1.1, 1.0 - 0.08 * e], [0.25, 1.1, 0.2]); }
        if (t < 4.5) K.rotulo('Puerta de piso', [0.2, 1.45, 0.17]);
        if (K.entre(t, 5.2, 9.5)) { K.rotulo('Cabina', [0, 1.55, -0.9]); K.rotulo('Puerta de piso', [0.42, 1.0, 0.17], 'der'); }
        var st = estado(a, fa(t + 0.05) - fa(t - 0.05));
        if (t >= 14.3) st = ['CERRADA Y TRABADA', 'ok'];
        K.tabla([['CABINA', cy < -0.02 ? 'LLEGANDO' : cy > 0.02 ? 'SE FUE' : 'EN EL PISO', cy > 0.02 ? '' : 'ok'], ['PUERTA', st[0], st[1]]]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: una carretilla golpea la puerta abajo y rompe los tacos que la guían.'],
        [4.5, 'Ahora la hoja cede si alguien la empuja: se abre un hueco abajo. ¡Peligro de caída!'],
        [9.5, 'Falla 2: la hoja quedó doblada y roza. La puerta no termina de cerrar y el ascensor no sale.'],
        [14.5, 'Arreglo: no la empujes y avisa. El técnico deja el ascensor fuera de servicio, cambia los tacos y endereza la hoja.']],
      cam: [[0, [2.4, 1.6, 3.8], [0.1, 0.6, 0.4]], [4.3, [2.2, 1.4, 3.4], [0.1, 0.6, 0.3]], [5.3, [-0.75, 0.55, 1.5], [0.2, 0.2, -0.1]], [9.2, [-0.75, 0.55, 1.5], [0.2, 0.2, -0.1]], [10, [1.0, 1.5, 3.0], [0, 1.0, -0.1]], [14.5, [1.1, 1.5, 3.2], [0, 1.05, 0]], [19, [1.3, 1.55, 3.4], [0, 1.1, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var cy = -3.2, a = 0, swR = 0, dentro = t < 14.5;
        s.flecha.visible = false; s.abollon.visible = false; s.botonLuz.visible = false;
        if (t < 9.5) {
          // la carretilla llega, golpea y se va
          var cz = K.kf(t, [[0, 2.2], [0.4, 2.2], [2.1, 0.31], [2.5, 0.45], [3.6, 0.9], [5, 2.8]]);
          s.carro.visible = t < 5; s.carro.position.set(0.14, 0, cz);
          s.pers.visible = t < 5; s.pers.position.set(0.14, 0, cz + 0.72); s.pers.rotation.y = PI; s.pers.caminar(t, K.entre(t, 0.4, 2.1) || K.entre(t, 2.5, 5) ? 1 : 0);
          s.pers.brazoD.rotation.x = s.pers.brazoI.rotation.x = -1.0;
          swR = t < 2.1 ? 0 : K.kf(t, [[2.1, 0], [2.25, 0.08], [2.7, 0.025], [5, 0.025], [6.3, 0.13], [8.3, 0.13], [9.3, 0.025]]);
          K.marcar(s.hojas[1].panel, t > 2.1 && K.parpadeo(t, 2) ? 'mal' : null);
          K.marcar(s.hojas[1].guias.map(function (g) { return g.lengua; }), t > 2.1 ? 'mal' : null);
          if (K.entre(t, 2.1, 4.5)) K.rotulo('Tacos rotos', [0.2, 0.02, -0.06]);
          if (t > 5.2) {
            var e = K.kf(t, [[5.2, 0], [6.3, 1], [8.3, 1], [9.3, 0]]);
            s.flecha.visible = true; s.flecha.apuntar([0.36, 0.5, 0.38], [0.22, 0.3, 0.02 - 0.25 * e]);
            if (K.entre(t, 6, 9)) { K.aviso('¡Peligro de caída al hueco!'); K.rotulo('Hueco abierto', [0.25, 0.03, -0.15]); }
          }
          K.tabla([['TACOS GUÍA', t > 2.1 ? 'ROTOS' : 'BIEN', t > 2.1 ? 'mal' : 'ok'], ['HOJA', swR > 0.05 ? 'CEDE HACIA EL HUECO' : t > 2.1 ? 'SUELTA ABAJO' : 'FIRME', t > 2.1 ? 'mal' : 'ok']]);
        } else {
          s.carro.visible = false; s.pers.visible = false;
          K.marcar(s.hojas[1].guias.map(function (g) { return g.lengua; }), null);
          cy = 0;
          if (dentro) {
            a = K.kf(t, [[9.5, 1], [10.2, 1], [11.5, 0.07], [12.1, 0.07], [12.9, 1], [13.3, 1], [14.5, 0.07]]);
            s.abollon.visible = true; K.marcar(s.abollon, K.parpadeo(t, 2) ? 'mal' : null);
            K.marcar(s.hojas[1].panel, a < 0.1 && K.parpadeo(t, 3) ? 'mal' : null);
            K.rotulo('Hoja doblada', [0.13 + CORRE * a, 0.2, 0.0]);
            if (t > 11.3) K.aviso('El ascensor no sale del piso');
            K.tabla([['PUERTA', a < 0.1 ? 'NO CIERRA' : 'REABRE', 'mal'], ['ASCENSOR', 'DETENIDO', 'mal']]);
          } else {
            a = K.kf(t, [[14.5, 1], [15.2, 1], [17, 0]]);
            K.marcar([s.hojas[0].panel, s.hojas[1].panel], t > 17 ? 'foco' : null);
            if (t > 17) K.aviso('Puerta firme y bien cerrada', false);
            K.tabla([['TACOS GUÍA', 'NUEVOS', 'ok'], ['PUERTA', a < 0.01 ? 'CERRADA Y TRABADA' : 'CERRANDO', 'ok']]);
          }
        }
        pone(s, K, { a: a, cy: cy, swR: swR, rendija: t > 9.5 && t < 14.5 });
        piso(s, cy < -1.6 ? '2' : '3');
      }
    }
  });

  // =====================================================================================
  // 2) CABEZAL — el mecanismo de arriba, visto desde el hueco
  // =====================================================================================
  V3.escena('cabezal-piso', ['cabezal_piso'], {
    fov: 34, poster: 6.5,
    construir: function (K) {
      var s = armar(K, { vista: 'hueco', patin: true, pesa: true, pasta: true });
      s.trapo = K.add(K.caja(0.07, 0.05, 0.05, K.mat(0x2e78c8, { roughness: 0.9 })));
      s.chispas = K.add(K.chispas(16));
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'Esto hay encima de cada puerta de piso, visto desde dentro del hueco: es el cabezal.'],
        [4.5, 'Cada hoja cuelga de un carro con ruedas. Las ruedas corren sobre un riel, como un tren.'],
        [9, 'Un cable une las dos hojas: la cabina empuja una y el cable mueve la otra.'],
        [13.5, 'Al cerrar, la pesa del costado baja y jala la puerta para que quede bien cerrada.']],
      cam: [[0, [0.7, 2.45, -2.75], [0, 1.95, 0]], [4.5, [0.95, 2.35, -1.05], [0.45, 2.12, -0.06]], [8.6, [0.95, 2.35, -1.05], [0.6, 2.12, -0.06]], [9.6, [0.1, 2.5, -2.2], [0, 2.15, 0]], [13.4, [-0.2, 2.45, -2.3], [-0.2, 2.05, 0]], [18, [-0.4, 2.35, -2.5], [-0.3, 1.95, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var cy = K.kf(t, [[0, -1.8], [1, -1.8], [3.9, 0]]);
        var fa = function (x) { return K.kf(x, [[0, 0], [4.8, 0], [8.2, 1], [13.8, 1], [17, 0]]); }, a = fa(t);
        pone(s, K, { a: a, cy: cy });
        s.pasta.forEach(function (p) { p.visible = false; }); s.trapo.visible = false; s.chispas.emitir(t, [0, 0, 0], false);
        var hR = s.hojas[1], hL = s.hojas[0];
        K.marcar(s.placa, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar([hR.carro, hL.carro, s.riel].concat(hR.ruedas, hL.ruedas), K.entre(t, 4.5, 9) ? 'foco' : null);
        K.marcar(s.cable, K.entre(t, 9, 13.5) ? 'foco' : null);
        K.marcar(s.pesa, t >= 13.5 ? 'foco' : null);
        var xr = hojaX(s, 1);
        if (t < 4.5) { K.rotulo('Cabezal', [0.62, 2.43, -0.012]); if (t > 2.6) K.rotulo('Patín de la cabina', [xr - 0.15, 1.8, -0.1], 'izq'); }
        else if (t < 9) { K.rotulo('Riel', [xr + 0.32, YR, ZH]); K.rotulo('Rueda', [xr + 0.11, YR + 0.05, ZH], 'izq'); K.rotulo('Carro', [xr - 0.05, 2.06, ZP]); }
        else if (t < 13.5) { K.rotulo('Cable', [0.05, YCS + RP, ZC]); K.rotulo('Poleíta', [XP, YCS, ZC]); }
        else { K.rotulo('Pesa de cierre', [XW, s.pesa.position.y, ZH], 'izq'); K.rotulo('Cordón', [-0.45, YW + RW, ZH]); }
        var st = estado(a, fa(t + 0.05) - fa(t - 0.05));
        K.tabla([['PUERTA', st[0], st[1]], ['PESA', a > 0.02 ? (fa(t + 0.05) > fa(t - 0.05) ? 'SUBE' : fa(t + 0.05) < fa(t - 0.05) ? 'BAJA, CIERRA' : 'ARRIBA') : 'ABAJO', '']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: el riel se llenó de grasa y polvo. Las ruedas se traban y la puerta corre a tirones.'],
        [5, 'Al final no termina de cerrar: queda una rendija y el ascensor no sale del piso.'],
        [9.5, 'Falla 2: un carro se aflojó. La hoja cuelga torcida y raspa abajo contra la pisadera.'],
        [14.5, 'Arreglo: limpiar el riel y dejarlo seco, sin aceite, y ajustar el carro para que la hoja cuelgue derecha.']],
      cam: [[0, [0.75, 2.45, -1.25], [0.3, 2.12, -0.06]], [4.6, [0.6, 2.4, -1.4], [0.2, 2.1, -0.06]], [5.6, [0.25, 1.95, -2.1], [0, 1.55, 0]], [9.2, [0.25, 1.95, -2.1], [0, 1.5, 0]], [10.2, [1.3, 1.25, -4.2], [0.35, 1.15, 0]], [14.2, [1.3, 1.25, -4.2], [0.35, 1.15, 0]], [15.2, [0.3, 2.45, -1.7], [0, 2.1, 0]], [19, [0.4, 2.4, -2.2], [0, 2.0, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a, tz = 0, limpio = K.ph(t, 14.8, 17.6), xt = -0.9 + 1.8 * limpio, hR = s.hojas[1];
        if (t < 9.5) { a = tirones(K.kf(t, [[0, 0], [0.6, 0], [4.2, 1], [4.8, 1], [8.6, 0]]), 7); if (t > 4.8) a = Math.max(0.07, a); }
        else if (t < 14.5) { a = K.kf(t, [[9.5, 0], [10.4, 0], [12.2, 0.8], [12.6, 0.8], [14.4, 0]]); tz = K.kf(t, [[9.5, 0], [10.2, 0.06]]); }
        else a = K.kf(t, [[14.5, 0], [17.6, 0], [18.4, 0.5], [19, 0.5]]);
        pone(s, K, { a: a, cy: -3.2, tzR: tz, rendija: t > 7.9 && t < 9.5 });
        s.pasta.forEach(function (p) { p.visible = t < 14.5 || p.position.x > xt; });
        K.marcar(s.pasta, t < 14.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        s.trapo.visible = K.entre(t, 14.6, 17.8); s.trapo.position.set(xt, YR + 0.04 + Math.sin(t * 20) * 0.006, ZH - 0.01);
        var moviendo = t > 9.5 && t < 14.5 && Math.abs(a - K.kf(t - 0.05, [[9.5, 0], [10.4, 0], [12.2, 0.8], [12.6, 0.8], [14.4, 0]])) > 0.002;
        var esquina = [hojaX(s, 1) - HW / 2 + 2.0 * tz, 0.0, ZH];
        s.chispas.emitir(t, esquina, moviendo, 0.1);
        K.marcar(hR.panel, t > 9.5 && t < 14.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.riel, t >= 15 ? 'foco' : null);
        if (t < 5) { K.rotulo('Grasa y polvo', [0.1, YR + 0.02, ZH]); K.tabla([['RIEL', 'SUCIO', 'mal'], ['PUERTA', 'A TIRONES', 'mal']]); }
        else if (t < 9.5) {
          if (t > 8) { K.rotulo('Rendija', [0, 1.4, ZH - 0.02]); K.aviso('El ascensor no sale del piso'); }
          K.tabla([['RIEL', 'SUCIO', 'mal'], ['PUERTA', t > 8.6 ? 'NO CIERRA' : 'CERRANDO A TIRONES', 'mal']]);
        } else if (t < 14.5) { K.rotulo('Raspa aquí', esquina, 'izq'); K.rotulo('Carro flojo', [hojaX(s, 1), 2.25, ZP]); K.tabla([['HOJA', 'TORCIDA', 'mal'], ['RUIDO', moviendo ? 'RASPADO' : '—', moviendo ? 'mal' : '']]); }
        else { if (t < 17.8) K.rotulo('Trapo seco', [xt, YR + 0.05, ZH]); else K.aviso('La puerta corre suave', false); K.tabla([['RIEL', limpio > 0.99 ? 'LIMPIO Y SECO' : 'LIMPIANDO', 'ok'], ['HOJA', 'DERECHA', 'ok']]); }
      }
    }
  });

  // =====================================================================================
  // 3) CABLE DE SINCRONISMO — una hoja arrastra a la otra
  // =====================================================================================
  V3.escena('sincronismo', ['cable_sincronismo'], {
    fov: 34, poster: 10,
    construir: function (K) {
      var s = armar(K, { vista: 'hueco', patin: true, cuentas: true });
      s.flechas = [K.add(K.flecha(0xf2b705, 0.018)), K.add(K.flecha(0xf2b705, 0.018))];
      return s;
    },
    funciona: {
      dur: 17,
      subt: [[0, 'El cable de sincronismo es un lazo de cable delgado que da la vuelta en dos poleítas.'],
        [4.5, 'La cabina engancha una sola hoja con su patín y la empuja.'],
        [8.5, 'El cable corre y jala la otra hoja hacia el otro lado: las dos abren a la vez.'],
        [13, 'Al cerrar pasa igual: las dos hojas se juntan justo al centro.']],
      cam: [[0, [0.15, 2.5, -1.95], [0, 2.3, 0]], [4.5, [0.95, 2.2, -1.25], [0.45, 2.0, -0.06]], [8.4, [0.95, 2.2, -1.3], [0.55, 2.0, -0.06]], [9.4, [0, 2.4, -2.25], [0, 2.05, 0]], [13, [0, 2.2, -2.45], [0, 1.75, 0]], [17, [0, 2.3, -2.3], [0, 1.95, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var cy = K.kf(t, [[0, -1.8], [1.5, -1.8], [4.3, 0]]);
        var fa = function (x) { return K.kf(x, [[0, 0], [5, 0], [8, 0.45], [9, 0.45], [11.6, 1], [13.4, 1], [16.4, 0]]); }, a = fa(t), da = fa(t + 0.05) - fa(t - 0.05);
        pone(s, K, { a: a, cy: cy });
        var xl = hojaX(s, 0), xr = hojaX(s, 1), mueve = Math.abs(da) > 0.001;
        K.marcar(s.cable, t < 4.5 || K.entre(t, 8.5, 13) ? (t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : 'foco') : null);
        K.marcar(s.hojas[1].panel, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        K.marcar(s.hojas[0].panel, K.entre(t, 8.5, 13) ? 'foco' : null);
        K.marcar(s.patin, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        s.flechas[0].visible = s.flechas[1].visible = t > 4.5 && mueve;
        var sg = da > 0 ? 1 : -1;
        s.flechas[1].apuntar([xr, 1.45, ZH - 0.05], [xr + sg * 0.2, 1.45, ZH - 0.05]);
        s.flechas[0].apuntar([xl, 1.45, ZH - 0.05], [xl - sg * 0.2, 1.45, ZH - 0.05]);
        if (t < 4.5) { K.rotulo('Cable (lazo)', [0.3, YCS + RP, ZC]); K.rotulo('Poleíta', [XP, YCS, ZC]); K.rotulo('Poleíta', [-XP, YCS, ZC], 'izq'); }
        else if (t < 8.5) { if (t > 3.8) K.rotulo('Patín de la cabina', [xr - 0.15, 1.78, -0.1], 'izq'); K.rotulo('Grapa', [xr - 0.1, YCS - RP, ZC]); }
        else if (t < 13) { K.rotulo('El cable la jala', [xl, 1.7, ZH - 0.02]); K.rotulo('Grapa', [xl + 0.1, YCS + RP, ZC]); }
        else K.rotulo('Se juntan al centro', [0, 1.3, ZH - 0.02]);
        var st = estado(a, da);
        K.tabla([['HOJA DEL PATÍN', st[0], st[1]], ['LA OTRA HOJA', st[0], st[1]]]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: el cable está flojo. La hoja que jala el cable se mueve tarde y no llega bien.'],
        [5, 'Al cerrar queda una rendija al centro. Su contacto no cierra y el ascensor no sale del piso.'],
        [10, 'Falla 2: el cable se rompió. Esa hoja queda suelta: ya no sigue a la otra.'],
        [14.5, 'Arreglo: tensar el cable con su tensor o cambiarlo, y ajustar las grapas hasta que las hojas se junten al centro.']],
      cam: [[0, [-0.1, 2.4, -2.0], [-0.1, 2.15, 0]], [4.6, [-0.1, 2.35, -2.0], [-0.1, 2.1, 0]], [5.6, [0.1, 1.95, -2.1], [0, 1.6, 0]], [9.6, [0.1, 1.95, -2.1], [0, 1.6, 0]], [10.4, [0.15, 2.35, -2.1], [0.05, 2.1, 0]], [14.4, [0.15, 2.35, -2.1], [0.05, 2.1, 0]], [15.2, [1.15, 2.45, -0.85], [0.8, 2.33, -0.08]], [17.2, [1.15, 2.45, -0.85], [0.8, 2.33, -0.08]], [19, [0.2, 2.35, -2.1], [0, 2.1, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a, aL, o = { cy: 0 };
        if (t < 10) {
          a = K.kf(t, [[0, 0], [1, 0], [3.6, 1], [4.6, 1], [7.6, 0]]);
          aL = K.kf(t, [[0, 0], [1.9, 0], [4.4, 0.82], [5.2, 0.82], [8.2, 0.08]]);
          o.cable = 'flojo'; o.comba = K.kf(t, [[0, 0.03], [1, 0.07], [3.6, 0.1], [7.6, 0.06]]);
        } else if (t < 14.5) {
          a = K.kf(t, [[10, 0], [11, 0], [13, 1], [14.5, 1]]); aL = 0.08; o.cable = 'roto';
        } else { a = aL = K.kf(t, [[14.5, 0], [17.2, 0], [18.2, 0.5], [19, 0.5]]); o.cable = 'ok'; }
        o.a = a; o.aL = aL; o.sinCuentas = t < 14.5; o.rendija = t > 7.8 && t < 10;
        pone(s, K, o);
        s.flechas[0].visible = s.flechas[1].visible = false;
        var malo = t < 14.5;
        K.marcar(s.cable, malo ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15 ? 'foco' : null);
        K.marcar(s.hojas[0].panel, malo && t > 7 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.tensor, K.entre(t, 15, 17.4) ? 'foco' : null);
        var xl = hojaX(s, 0);
        if (t < 5) { K.rotulo('Cable flojo', [0.35, YCS + RP - 0.05, ZC]); K.tabla([['CABLE', 'FLOJO', 'mal'], ['LA OTRA HOJA', 'LLEGA TARDE', 'mal']]); }
        else if (t < 10) {
          if (t > 7.8) { K.rotulo('Rendija', [-0.016, 1.4, ZH - 0.02]); K.aviso('El ascensor no sale del piso'); }
          K.tabla([['CABLE', 'FLOJO', 'mal'], ['HOJAS', t > 7.8 ? 'NO SE JUNTAN' : 'DESPAREJAS', 'mal']]);
        } else if (t < 14.5) {
          K.rotulo('Cable roto', [xl + 0.18, YCS + RP - 0.06, ZC]); K.rotulo('Hoja suelta', [xl, 1.75, ZH - 0.02], 'izq');
          if (t > 11.5) K.aviso('¡Hoja suelta! No acercarse');
          K.tabla([['CABLE', 'ROTO', 'mal'], ['LA OTRA HOJA', 'NO SE MUEVE', 'mal']]);
        } else {
          if (t < 17.4) K.rotulo('Tensor', [XP + 0.075, YCS, -0.06]); else K.aviso('Las dos hojas juntas', false);
          K.tabla([['CABLE', 'TENSO', 'ok'], ['HOJAS', 'JUNTAS', 'ok']]);
        }
      }
    }
  });

  // =====================================================================================
  // 4) ROLDANAS — ruedas que corren sobre el riel y contrarruedas
  // =====================================================================================
  V3.escena('roldanas', ['roldanas_puerta'], {
    fov: 34, poster: 6,
    construir: function (K) {
      var s = armar(K, { vista: 'hueco' });
      var w = s.hojas[1].ruedas[1];
      s.plano = K.caja(0.026, 0.006, 0.022, s.rojo, 0, RR - 0.002, 0); w.add(s.plano);   // lado plano de la rueda (arriba al empezar)
      s.tac = K.add(K.cartel('TAC', 0.08, 0.035, '#d8321f', '#ffffff'));
      s.flecha = K.add(K.flecha(0xf2b705, 0.006));
      return s;
    },
    funciona: {
      dur: 17.5,
      subt: [[0, 'Cada hoja cuelga de dos ruedas de plástico duro: las roldanas.'],
        [4, 'Al abrir la puerta, las ruedas giran sobre el riel y la hoja corre suave y sin ruido.'],
        [8.5, 'Debajo del riel van ruedas más chicas: las contrarruedas.'],
        [12.5, 'Si alguien empuja la hoja hacia arriba, la contrarrueda topa el riel y la hoja no se sale.']],
      cam: [[0, [0.45, 2.32, -0.62], [0.21, 2.15, -0.06]], [4.2, [0.6, 2.32, -0.66], [0.38, 2.15, -0.06]], [8, [0.85, 2.3, -0.66], [0.61, 2.15, -0.06]], [9, [0.95, 2.06, -0.62], [0.64, 2.1, -0.06]], [17.5, [0.9, 2.08, -0.62], [0.62, 2.1, -0.06]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a = K.kf(t, [[0, 0], [4.5, 0], [7.8, 1]]), lift = K.kf(t, [[13, 0], [13.6, 0.003], [15.6, 0.003], [16.2, 0]]);
        pone(s, K, { a: a, yR: lift });
        s.plano.visible = false; s.tac.visible = false;
        var hR = s.hojas[1], xr = hojaX(s, 1);
        K.marcar(hR.ruedas, t < 8.5 ? (t < 4 ? (K.parpadeo(t, 1) ? 'foco' : null) : 'foco') : null);
        K.marcar(hR.contra, t >= 8.5 ? (lift > 0.002 ? 'foco' : K.parpadeo(t, 1) ? 'foco' : null) : null);
        s.flecha.visible = K.entre(t, 12.6, 16.2);
        if (s.flecha.visible) s.flecha.apuntar([xr, 1.9 + lift, ZH - 0.05], [xr, 2.0 + lift, ZH - 0.05]);
        if (t < 8.5) { K.rotulo('Roldana', [xr - 0.11, YR + 0.045, ZH], 'der'); K.rotulo('Roldana', [xr + 0.11, YR + 0.045, ZH], 'izq'); K.rotulo('Riel', [xr + 0.29, YR, ZH], 'izq'); }
        else { K.rotulo('Contrarrueda', [xr + 0.11, YR - 0.03, ZH], 'izq'); K.rotulo('Riel', [xr - 0.28, YR, ZH], 'der'); if (lift > 0.002) K.rotulo('Topa el riel', [xr - 0.11, YR - 0.016, ZH], 'der'); }
        K.tabla([['RUEDAS', a > 0.01 && a < 0.99 ? 'GIRAN' : 'QUIETAS', a > 0.01 && a < 0.99 ? 'ac' : ''], ['HOJA', lift > 0.002 ? 'NO SE SALE' : 'COLGADA', 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: una rueda está gastada y quedó plana de un lado.'],
        [4, 'En cada vuelta el lado plano golpea el riel: la hoja salta y suena tac, tac.'],
        [9, 'Falla 2: la contrarrueda está gastada o floja. Si empujan la hoja, se levanta y se puede salir del riel.'],
        [14.5, 'Arreglo: cambiar la rueda dañada y regular la contrarrueda casi pegada al riel.']],
      cam: [[0, [0.52, 2.3, -0.5], [0.33, 2.2, -0.06]], [3.6, [0.55, 2.3, -0.52], [0.36, 2.2, -0.06]], [4.6, [0.72, 2.3, -0.75], [0.42, 2.15, -0.06]], [8.6, [0.6, 2.3, -0.75], [0.3, 2.15, -0.06]], [9.4, [0.45, 2.16, -0.75], [0.23, 2.15, -0.06]], [14.2, [0.45, 2.16, -0.75], [0.23, 2.15, -0.06]], [15, [0.75, 2.3, -0.78], [0.45, 2.15, -0.06]], [19, [0.75, 2.3, -0.78], [0.45, 2.15, -0.06]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a, yR = 0, hR = s.hojas[1], c0 = hR.contra[0], c1 = hR.contra[1];
        if (t < 9) a = K.kf(t, [[0, 0], [0.8, 0], [4.6, 1], [5, 1], [8.8, 0]]);
        else if (t < 14.5) a = 0;
        else a = K.kf(t, [[14.5, 0], [15.4, 0], [18, 1]]);
        // lado plano: cuando apunta hacia abajo la hoja cae un poco y suena
        var dR = CORRE * a, ang = PI / 2 - dR / RR, c = Math.cos(ang + PI / 2), golpe = t < 9 ? Math.pow(Math.max(0, c), 10) : 0;
        yR = -0.007 * golpe;
        var gasta = K.entre(t, 9, 14.5), lift = gasta ? K.kf(t, [[10.5, 0], [11.5, 0.045], [13.3, 0.045], [14.1, 0]]) : 0;
        pone(s, K, { a: a, yR: yR + lift });
        var esc = gasta ? 0.55 : 1;
        [c0, c1].forEach(function (c) { c.scale.set(esc, esc, 1); c.position.y = YR - 0.015 - 0.013 * esc - (gasta ? 0.03 : 0.003); });
        s.plano.visible = t < 9;
        var xr = hojaX(s, 1);
        s.tac.visible = t < 9 && golpe > 0.35; s.tac.position.set(xr + 0.11, YR + 0.11, ZH - 0.04); s.tac.rotation.y = PI;
        s.flecha.visible = gasta && t > 10.3 && t < 14.1;
        if (s.flecha.visible) s.flecha.apuntar([xr, 1.89 + lift, ZH - 0.05], [xr, 2.0 + lift, ZH - 0.05]);
        K.marcar(hR.ruedas[1], t < 9 ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15 ? 'foco' : null);
        K.marcar([c0, c1], gasta ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15 ? 'foco' : null);
        K.marcar(hR.ruedas[0], t > 15 ? 'foco' : null);
        if (t < 9) { K.rotulo('Lado plano', [xr + 0.11, YR + 0.05, ZH], 'izq'); if (t > 4) K.aviso('Suena tac, tac, tac'); K.tabla([['RUEDA', 'GASTADA', 'mal'], ['HOJA', golpe > 0.35 ? 'SALTA' : 'CORRE', golpe > 0.35 ? 'mal' : '']]); }
        else if (t < 14.5) {
          K.rotulo('Contrarrueda gastada', [xr - 0.11, YR - 0.05 + lift, ZH], 'der');
          if (lift > 0.02) { K.aviso('¡La hoja se puede salir del riel!'); K.rotulo('Rueda fuera del riel', [xr + 0.11, YR + 0.05 + lift, ZH], 'izq'); }
          K.tabla([['CONTRARRUEDA', 'GASTADA', 'mal'], ['HOJA', lift > 0.02 ? 'SE LEVANTA' : 'COLGADA', lift > 0.02 ? 'mal' : '']]);
        } else { K.rotulo('Rueda nueva', [xr + 0.11, YR + 0.05, ZH], 'izq'); K.rotulo('Contrarrueda regulada', [xr - 0.11, YR - 0.03, ZH], 'der'); if (t > 16) K.aviso('Corre suave y sin ruido', false); K.tabla([['RUEDAS', 'NUEVAS', 'ok'], ['HOJA', 'SUAVE', 'ok']]); }
      }
    }
  });

  // =====================================================================================
  // 5) PESA DE CIERRE — cierra sola la puerta de piso
  // =====================================================================================
  V3.escena('pesa-cierre', ['pesa_cierre'], {
    fov: 34, poster: 7,
    construir: function (K) {
      var s = armar(K, { vista: 'hueco', patin: true, pesa: true });
      s.flechas = [K.add(K.flecha(0xf2b705, 0.018)), K.add(K.flecha(0xf2b705, 0.018))];
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'La pesa de cierre es una barra de fierro que cuelga de un cordón, dentro de un tubo.'],
        [4, 'El cordón pasa por una poleíta y va amarrado al carro de una hoja. Al abrir la puerta, la pesa sube.'],
        [9, 'Al cerrar, la pesa baja y jala la puerta hasta que queda bien cerrada.'],
        [13.5, 'Prueba del técnico: abre la puerta con su llave y la suelta. La pesa la cierra sola.']],
      cam: [[0, [-0.5, 2.0, -1.3], [-0.9, 1.78, -0.05]], [3.8, [-0.45, 2.05, -1.3], [-0.8, 1.88, -0.05]], [5, [0.05, 2.3, -2.1], [-0.25, 2.0, 0]], [13, [0.05, 2.3, -2.1], [-0.25, 1.95, 0]], [14, [-0.05, 2.1, -2.35], [-0.25, 1.8, 0]], [18, [-0.05, 2.1, -2.35], [-0.25, 1.8, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var cy = K.kf(t, [[0, 0], [12.6, 0], [13.6, -1.8]]);
        var fa = function (x) { return K.kf(x, [[0, 0], [4.6, 0], [8, 1], [9.3, 1], [12.5, 0], [14.6, 0], [15.6, 0.6], [16, 0.6], [17.6, 0]]); }, a = fa(t), da = fa(t + 0.05) - fa(t - 0.05);
        pone(s, K, { a: a, aC: t < 13 ? a : 0, cy: cy });
        var wy = s.pesa.position.y, xr = hojaX(s, 1);
        K.marcar(s.pesa, t < 4 ? (K.parpadeo(t, 1) ? 'foco' : null) : 'foco');
        K.marcar(s.cordon, K.entre(t, 4, 9) ? 'foco' : null);
        // flechas: la pesa sube o baja, y la mano que abre en la prueba
        s.flechas[0].visible = Math.abs(da) > 0.001 && t > 4;
        if (s.flechas[0].visible) s.flechas[0].apuntar([XW - 0.08, wy, ZH], [XW - 0.08, wy + (da > 0 ? 0.18 : -0.18), ZH]);
        s.flechas[1].visible = K.entre(t, 14.6, 15.6);
        if (s.flechas[1].visible) s.flechas[1].apuntar([xr - 0.15, 1.2, ZH - 0.05], [xr + 0.1, 1.2, ZH - 0.05]);
        if (t < 4) { K.rotulo('Pesa', [XW, wy, ZH], 'izq'); K.rotulo('Tubo', [XW - 0.035, 2.05, -0.05], 'izq'); }
        else if (t < 9) { K.rotulo('Cordón', [-0.45, YW + RW, ZH]); K.rotulo('Poleíta', [XW + RW, YW, ZH], 'izq'); K.rotulo('Pesa', [XW, wy, ZH], 'izq'); }
        else if (t < 13.5) K.rotulo(da < 0 ? 'La pesa baja y cierra' : 'Pesa', [XW, wy, ZH], 'izq');
        else { if (K.entre(t, 14.6, 15.6)) K.rotulo('El técnico abre', [xr - 0.1, 1.2, ZH - 0.05], 'izq'); if (t > 16) K.rotulo('La suelta: cierra sola', [XW, wy, ZH], 'izq'); }
        var st = estado(a, da);
        K.tabla([['PUERTA', st[0], st[1]], ['PESA', da > 0.001 ? 'SUBE' : da < -0.001 ? 'BAJA' : a > 0.5 ? 'ARRIBA' : 'ABAJO', da < -0.001 ? 'ac' : ''], ['CABINA', cy < -0.02 ? 'SE FUE' : 'EN EL PISO', '']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: el cordón se gastó y se rompe. La pesa cae al fondo de su tubo.'],
        [4.5, 'Ahora nada jala la puerta. Cuando la cabina la suelta, se queda entreabierta.'],
        [9.5, 'Con la puerta de piso abierta, el ascensor se para. Nadie debe acercarse a esa puerta.'],
        [14.5, 'Arreglo: con el ascensor fuera de servicio, cambiar el cordón y probar que la puerta cierre sola.']],
      cam: [[0, [-0.55, 2.0, -1.3], [-0.9, 1.8, -0.05]], [4.2, [-0.5, 1.95, -1.35], [-0.85, 1.75, -0.05]], [5.2, [0.0, 2.05, -2.3], [-0.2, 1.75, 0]], [9.3, [0.0, 2.05, -2.3], [-0.2, 1.75, 0]], [10.3, [0.15, 1.6, -2.9], [-0.15, 1.3, 0]], [14.3, [0.15, 1.6, -2.9], [-0.15, 1.3, 0]], [15.2, [-0.2, 2.15, -2.0], [-0.4, 1.85, 0]], [19, [-0.2, 2.15, -2.0], [-0.4, 1.85, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a, cy = 0, aC, o = {};
        var roto = t > 1.5 && t < 14.5, wFondo = 1.5;
        if (t < 14.5) {
          a = K.kf(t, [[0, 1], [4.6, 1], [7.4, 0.13]]);
          aC = K.kf(t, [[0, 1], [4.6, 1], [7.4, 0.13], [7.9, 0.13], [8.6, 0]]);
          cy = K.kf(t, [[0, 0], [8.4, 0], [9.6, -1.8]]);
          o.cordonRoto = roto;
          if (roto) { var k = Math.min(1, Math.pow((t - 1.5) / 0.55, 2)); o.wy = W0 + CORRE - (W0 + CORRE - wFondo) * k; }
        } else { a = aC = K.kf(t, [[14.5, 0.13], [15.4, 0.13], [17, 0]]); cy = -1.8; }
        o.a = a; o.aC = aC; o.cy = cy; o.rendija = t > 7.4 && t < 14.5;
        pone(s, K, o);
        s.flechas[0].visible = s.flechas[1].visible = false;
        var wy = s.pesa.position.y;
        K.marcar(s.cordon, roto ? (K.parpadeo(t, 2) ? 'mal' : null) : t > 15 ? 'foco' : null);
        K.marcar(s.pesa, roto ? 'mal' : t > 15 ? 'foco' : null);
        K.marcar([s.hojas[0].panel, s.hojas[1].panel], t > 8 && t < 14.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        if (t > 15.4 && t < 17) { s.flechas[0].visible = true; s.flechas[0].apuntar([XW - 0.08, wy, ZH], [XW - 0.08, wy - 0.16, ZH]); }
        if (t < 4.5) { K.rotulo(t > 1.5 ? 'Cordón roto' : 'Cordón gastado', [XW, YW - 0.08, ZH], 'izq'); if (t > 2) K.rotulo('Pesa en el fondo', [XW, wy, ZH], 'izq'); }
        else if (t < 9.5) { K.rotulo('Pesa en el fondo', [XW, wy, ZH], 'izq'); if (t > 7.5) K.rotulo('Queda abierta', [0, 1.25, ZH - 0.02]); }
        else if (t < 14.5) { K.rotulo('Queda abierta', [0, 1.1, ZH - 0.02]); K.aviso('¡Puerta abierta! No acercarse'); }
        else { K.rotulo('Cordón nuevo', [XW, YW - 0.12, ZH], 'izq'); if (t > 17) K.aviso('Cierra sola otra vez', false); }
        K.tabla([['CORDÓN', roto ? 'ROTO' : t >= 14.5 ? 'NUEVO' : 'GASTADO', roto ? 'mal' : t >= 14.5 ? 'ok' : 'ac'], ['PUERTA', a < 0.01 ? 'CERRADA' : t >= 14.5 ? 'CIERRA SOLA' : t > 7.4 ? 'ENTREABIERTA' : 'ABIERTA', a < 0.01 || t >= 14.5 ? 'ok' : t > 7.4 ? 'mal' : ''], ['ASCENSOR', t > 9.5 && t < 14.5 ? 'PARADO' : t >= 14.5 ? 'EN PRUEBA' : 'EN EL PISO', t > 9.5 && t < 14.5 ? 'mal' : '']]);
      }
    }
  });

  // =====================================================================================
  // 6) GUIADORES — tacos bajo la hoja, dentro de la ranura de la pisadera (con la pisadera cortada para ver adentro)
  // =====================================================================================
  var XG = 0.36;    // taco de afuera de la hoja derecha, con la puerta cerrada
  V3.escena('guiadores', ['guiadores_puerta'], {
    fov: 34, poster: 2,
    construir: function (K) {
      var s = armar(K, { vista: 'hueco', corte: 0.47 });
      s.flecha = K.add(K.flecha(0xf2b705, 0.004));
      s.flecha2 = K.add(K.flecha(0xff3b30, 0.016));
      s.trozos = [K.add(K.caja(0.02, 0.01, 0.012, s.m.taco, 0.4, 0.005, -0.086)), K.add(K.caja(0.016, 0.008, 0.01, s.m.taco, 0.44, 0.004, -0.09))];
      s.trozos[1].rotation.y = 0.7; s.marcables = s.marcables.concat(s.trozos, s.corte);
      s.hojas[1].guias.forEach(function (g) { s.marcables.push(g.placa); });
      return s;
    },
    funciona: {
      dur: 17,
      subt: [[0, 'Debajo de cada hoja van dos tacos de plástico: los guiadores.'],
        [4, 'Van metidos en la ranura del piso. Aquí la cortamos para ver: el taco corre adentro, como un tren en su riel.'],
        [9, 'Si alguien empuja la hoja desde el pasillo, el taco topa con la ranura y la hoja no se va al hueco.'],
        [13.5, 'La hoja cuelga de arriba; abajo, los guiadores solo la mantienen en su carril.']],
      cam: [[0, [0.85, 0.5, -0.8], [0.22, 0.03, -0.06]], [3.8, [0.85, 0.5, -0.8], [0.25, 0.03, -0.06]], [5.6, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]], [13.2, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]], [14.6, [2.0, 1.3, -3.6], [0.25, 1.1, 0]], [17, [2.0, 1.3, -3.6], [0.25, 1.1, 0]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var fa = function (x) { return K.kf(x, [[0, 0], [5.8, 0], [7.1, 0.18], [7.6, 0.18], [8.9, 0], [14, 0], [15.4, 0.6], [17, 0.6]]); }, a = fa(t);
        var emp = K.kf(t, [[9.8, 0], [10.6, 1], [12.6, 1], [13.2, 0]]);
        pone(s, K, { a: a, swR: 0.0015 * emp });
        s.trozos.forEach(function (o) { o.visible = false; });
        var hR = s.hojas[1], xr = hojaX(s, 1), xg = xr + 0.15, piezas = [];
        hR.guias.forEach(function (g) { piezas.push(g.lengua, g.placa); });
        K.marcar(piezas, t < 4 ? (K.parpadeo(t, 1) ? 'foco' : null) : 'foco');
        K.marcar(s.corte, K.entre(t, 4, 9) ? 'foco' : null);
        K.marcar(s.labioA, emp > 0.5 ? 'foco' : null);
        s.flecha2.visible = false;
        s.flecha.visible = emp > 0.05;
        if (s.flecha.visible) s.flecha.apuntar([xg, 0.045, 0.0], [xg, 0.045, -0.046]);
        if (t < 4) { K.rotulo('Guiador', [xr - 0.15, 0.0, ZH - 0.015], 'izq'); K.rotulo('Guiador', [xg, 0.0, ZH - 0.015]); }
        else if (t < 9) { if (t > 5) { K.rotulo('Ranura', [0.47, -0.012, -0.06], 'izq'); K.rotulo('Taco', [xg, -0.004, -0.06]); K.rotulo('Hoja', [xg, 0.06, -0.06]); } }
        else if (t < 13.5) { K.rotulo('Empujan desde el pasillo', [xg, 0.045, -0.01], 'izq'); if (emp > 0.5) K.rotulo('El taco topa: no pasa', [xg, -0.004, -0.068]); }
        else { K.rotulo('Cuelga del carro', [xr, 2.15, ZP]); K.rotulo('Guiadores', [xr + 0.15, 0.0, ZH]); }
        K.tabla([['TACOS', 'BIEN', 'ok'], ['HOJA', emp > 0.5 ? 'NO SE MUEVE' : a > 0.01 && a < 0.99 && Math.abs(fa(t + 0.05) - fa(t - 0.05)) > 0.001 ? 'CORRE' : 'FIRME', 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: el taco está gastado y quedó delgado. La hoja baila abajo y golpetea al moverse.'],
        [5.5, 'Falla 2: un golpe de carretilla rompió los tacos. El pie de la hoja queda suelto.'],
        [10, 'Si alguien la empuja, la hoja cede hacia el hueco. ¡Es peligro de caída!'],
        [14.5, 'Arreglo: ascensor fuera de servicio, cambiar los tacos y revisar que la hoja corra derecha.']],
      cam: [[0, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]], [9.6, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]], [10.6, [2.1, 1.0, -1.25], [0.25, 0.55, -0.12]], [14.2, [2.1, 1.0, -1.25], [0.25, 0.55, -0.12]], [15, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]], [19, [0.68, 0.075, -0.075], [XG, 0.0, -0.06]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a = 0, sw = 0, hR = s.hojas[1], fase = t < 5.5 ? 0 : t < 14.5 ? 1 : 2, emp = 0;
        if (fase === 0) {
          var fa = function (x) { return K.kf(x, [[0, 0], [0.6, 0], [1.9, 0.18], [2.4, 0.18], [3.7, 0], [4.2, 0], [4.9, 0.1], [5.4, 0]]); };
          a = fa(t); var mv = Math.abs(fa(t + 0.05) - fa(t - 0.05)) > 0.0005;
          sw = mv ? 0.0026 * Math.sin(t * 16) : 0.0026 * Math.sin(t * 16) * 0.3;
        } else if (fase === 1) {
          emp = K.kf(t, [[10.2, 0], [11.6, 1], [13.4, 1], [14.3, 0]]);
          sw = 0.003 + 0.082 * emp;
        } else a = K.kf(t, [[14.5, 0], [15.6, 0], [16.9, 0.18], [17.4, 0.18], [18.7, 0]]);
        pone(s, K, { a: a, swR: sw });
        hR.guias.forEach(function (g) { g.lengua.scale.z = fase === 0 ? 0.35 : 1; g.lengua.visible = fase !== 1; });
        s.trozos.forEach(function (o) { o.visible = fase === 1; });
        var xr = hojaX(s, 1), xg = xr + 0.15, leng = hR.guias.map(function (g) { return g.lengua; });
        K.marcar(leng, fase === 0 ? (K.parpadeo(t, 2) ? 'mal' : null) : fase === 2 ? 'foco' : null);
        K.marcar(hR.panel, fase === 1 && t > 10.6 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.trozos, fase === 1 ? 'mal' : null);
        s.flecha.visible = false;
        s.flecha2.visible = emp > 0.05;
        if (s.flecha2.visible) s.flecha2.apuntar([xr, 0.3, ZH - 0.04], [xr, 0.3, ZH - 0.06 - 0.25 * emp]);
        if (fase === 0) { K.rotulo('Taco gastado', [xg, -0.004, -0.06]); K.rotulo('Mucho juego', [xg, 0.004, -0.07], 'izq'); if (t > 1.5) K.aviso('La hoja golpetea abajo'); K.tabla([['TACOS', 'GASTADOS', 'mal'], ['HOJA', 'BAILA ABAJO', 'mal']]); }
        else if (fase === 1) {
          if (t < 10) { K.rotulo('Taco roto', [0.42, 0.006, -0.088]); K.rotulo('Ranura vacía', [xg, -0.006, -0.06], 'izq'); }
          else { K.rotulo('Se va hacia el hueco', [xr, 0.05, ZH - 0.17], 'der'); if (t > 11) K.aviso('¡Peligro de caída al hueco!'); }
          K.tabla([['TACOS', 'ROTOS', 'mal'], ['HOJA', emp > 0.3 ? 'CEDE' : 'SUELTA ABAJO', 'mal']]);
        } else { K.rotulo('Taco nuevo', [xg, -0.004, -0.06]); if (t > 16) K.aviso('Corre derecha en su ranura', false); K.tabla([['TACOS', 'NUEVOS', 'ok'], ['HOJA', 'FIRME', 'ok']]); }
      }
    }
  });

  // =====================================================================================
  // 7) PISADERA — el umbral con ranura, en el piso y en la cabina
  // =====================================================================================
  V3.escena('pisadera', ['pisadera'], {
    fov: 34, poster: 8,
    construir: function (K) {
      var M = K.M, s = armar(K, { vista: 'pasillo', cabina: true });
      s.moneda = K.add(K.cil(0.015, 0.003, K.mat(0xd9b04a, { metalness: 0.7, roughness: 0.3 }), 0, 0, 0, null, 18)); s.marcables.push(s.moneda);
      s.piedra = K.add(new K.T.Mesh(new K.T.DodecahedronGeometry(0.011), K.mat(0x7b746a, { roughness: 1, metalness: 0 }))); s.marcables.push(s.piedra);
      s.brocha = K.add(K.grupo([K.caja(0.05, 0.02, 0.025, K.mat(0x8a5a2b), 0, 0.02, 0), K.caja(0.045, 0.012, 0.02, M.negro, 0, 0.004, 0), K.cil(0.006, 0.16, K.mat(0x8a5a2b), 0, 0.1, 0.03, null, 8)]));
      s.brocha.children[2].rotation.x = 0.6;
      s.pers = K.add(K.persona(1.68, 0x6a7f94));
      s.flechas = [K.add(K.flecha(0xf2b705, 0.008)), K.add(K.flecha(0xf2b705, 0.008))];
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'La pisadera es el umbral de aluminio que pisas al entrar. Hay una en el piso y otra en la cabina.'],
        [4.5, 'Tiene una ranura: por ahí corren los tacos que guían las hojas de la puerta por abajo.'],
        [9, 'Cuando la cabina para bien, las dos quedan al mismo nivel, con una rendija de unos 3 cm.'],
        [13.5, 'Si algo se te cae por esa rendija, no lo saques: cae al fondo del hueco y lo recupera el técnico.']],
      cam: [[0, [0.3, 0.75, 0.95], [0, 0.0, -0.12]], [4.5, [0.25, 0.48, 0.6], [0.05, 0.0, -0.07]], [8.6, [0.25, 0.48, 0.6], [0.05, 0.0, -0.07]], [9.4, [0.32, 0.5, 0.55], [0.05, -0.01, -0.12]], [13.4, [0.32, 0.5, 0.55], [0.05, -0.01, -0.12]], [14.2, [0.34, 0.4, 0.42], [0.1, -0.04, -0.09]], [18, [0.34, 0.4, 0.42], [0.1, -0.06, -0.1]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var fa = function (x) { return K.kf(x, [[0, 1], [4.6, 1], [6.6, 0.3], [7.6, 0.3], [9, 1]]); }, a = fa(t);
        pone(s, K, { a: a, cy: 0 });
        s.piedra.visible = false; s.brocha.visible = false; s.pers.visible = false;
        var zm = K.kf(t, [[14.4, -0.02], [15.3, -0.115]]), ym = t < 15.3 ? 0.002 : 0.002 - 1.4 * Math.pow(t - 15.3, 2);
        s.moneda.visible = t > 13.6 && ym > -1.5; s.moneda.position.set(0.12, ym, zm); s.moneda.rotation.set(t > 15.3 ? (t - 15.3) * 7 : 0, 0, 0); K.marcar(s.moneda, 'foco');
        K.marcar(s.pisadera.concat(s.pisCab), t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar([s.labioA, s.labioB], K.entre(t, 4.5, 9) ? 'foco' : null);
        var mide = K.entre(t, 9.3, 13.5);
        s.flechas.forEach(function (f) { f.visible = mide; });
        if (mide) { s.flechas[0].apuntar([0.2, 0.012, 0.06], [0.2, 0.012, -0.098]); s.flechas[1].apuntar([0.2, 0.012, -0.29], [0.2, 0.012, -0.132]); }
        if (t < 4.5) { K.rotulo('Pisadera del piso', [0.25, 0.0, -0.03]); K.rotulo('Pisadera de la cabina', [-0.25, 0.0, -0.17], 'izq'); }
        else if (t < 9) K.rotulo('Ranura', [-0.1, -0.005, -0.06], 'izq');
        else if (t < 13.5) { K.rotulo('Rendija de 3 cm', [0.24, 0.0, -0.115]); K.rotulo('Mismo nivel', [-0.2, 0.0, -0.13], 'izq'); }
        else if (s.moneda.visible) K.rotulo(t < 15.3 ? 'Moneda' : 'Cae al fondo del hueco', s.moneda.position.clone(), 'izq');
        K.tabla([['CABINA', 'A NIVEL', 'ok'], ['PUERTA', estado(a, fa(t + 0.05) - fa(t - 0.05))[0], 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: una piedrita cayó en la ranura. La puerta choca con ella y no puede cerrar.'],
        [5, 'Se vuelve a abrir y lo intenta otra vez. El ascensor no sale del piso.'],
        [9.5, 'Falla 2: la cabina paró más abajo que el piso. Queda un escalón y la gente se tropieza.'],
        [14, 'Arreglo: limpiar la ranura con brocha o aspiradora. Si queda escalón, el técnico regula la parada.']],
      cam: [[0, [0.38, 0.45, 0.55], [0.15, 0.0, -0.06]], [4.6, [0.38, 0.45, 0.55], [0.15, 0.0, -0.06]], [5.6, [0.5, 1.15, 1.9], [0.05, 0.55, -0.1]], [9.2, [0.5, 1.15, 1.9], [0.05, 0.55, -0.1]], [10, [0.45, 0.3, 0.45], [0, -0.03, -0.15]], [11.2, [0.45, 0.3, 0.45], [0, -0.03, -0.15]], [12, [1.7, 1.3, 2.9], [0, 0.8, -0.1]], [13.8, [1.7, 1.3, 2.9], [0, 0.8, -0.1]], [14.6, [0.38, 0.45, 0.55], [0.15, 0.0, -0.06]], [19, [0.38, 0.45, 0.55], [0.15, 0.0, -0.06]]],
      anim: function (t, s, K) {
        K.marcar(s.marcables, null);
        var a, cy = 0, xs = 0.2, tope = (xs + 0.009 - 0.06 + 0.025) / CORRE;
        s.flechas.forEach(function (f) { f.visible = false; });
        s.moneda.visible = false; s.pers.visible = false; s.brocha.visible = false;
        var hayPiedra = true, xb = K.kf(t, [[14.4, -0.3], [16.4, 0.32]]);
        if (t < 9.5) a = K.kf(t, [[0, 1], [0.8, 1], [2.6, tope], [3.1, tope], [4.4, 1], [5.4, 1], [7.2, tope], [7.7, tope], [9, 1]]);
        else if (t < 14) { a = 1; cy = K.kf(t, [[9.5, 0], [10.3, -0.05]]); }
        else { a = K.kf(t, [[14, 1], [16.6, 1], [18.4, 0]]); hayPiedra = xb < xs; }
        pone(s, K, { a: a, cy: cy });
        s.piedra.visible = t < 9.5 || (t >= 14 && hayPiedra); s.piedra.position.set(xs, 0.002, ZH);
        if (t >= 14) { s.brocha.visible = t < 16.6; s.brocha.position.set(xb, 0.004, ZH); s.piedra.position.x = Math.max(xs, xb + 0.03); }
        var golpe = t < 9.5 && Math.abs(a - tope) < 0.01;
        K.marcar(s.piedra, t < 9.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.hojas[1].guias[0].lengua, golpe ? 'mal' : null);
        K.marcar(s.pisCab, K.entre(t, 9.5, 14) ? (K.parpadeo(t, 2) ? 'mal' : null) : t >= 14 ? null : null);
        K.marcar(s.labioB, t > 16.6 ? 'foco' : null);
        // persona que se tropieza con el escalón
        if (K.entre(t, 11.2, 14)) {
          var pz = K.kf(t, [[11.2, 1.3], [12.7, 0.08]]), cae = K.kf(t, [[12.6, 0], [13.0, 0.35], [13.7, 0.35], [14, 0.15]]);
          s.pers.visible = true; s.pers.position.set(-0.05, 0, pz); s.pers.rotation.set(-cae, PI, 0); s.pers.caminar(t, t < 12.7 ? 1 : 0);
          if (cae > 0.2) K.aviso('¡Cuidado con el escalón!');
        }
        if (t < 9.5) {
          K.rotulo('Piedrita', [xs, 0.004, ZH]);
          if (t > 5.5) K.aviso('El ascensor no sale del piso');
          K.tabla([['RANURA', 'TAPADA', 'mal'], ['PUERTA', golpe ? 'CHOCA' : a > 0.98 ? 'REABRE' : 'CERRANDO', golpe ? 'mal' : 'ac']]);
        } else if (t < 14) { K.rotulo('Escalón de 5 cm', [-0.15, -0.03, -0.13], 'izq'); K.tabla([['CABINA', '5 cm ABAJO', 'mal'], ['PASAR', 'TROPIEZO', 'mal']]); }
        else { if (t < 16.6) K.rotulo('Brocha', [xb, 0.03, ZH]); else K.aviso('La puerta cierra bien', false); K.tabla([['RANURA', 'LIMPIA', 'ok'], ['CABINA', 'A NIVEL', 'ok']]); }
      }
    }
  });
})();
