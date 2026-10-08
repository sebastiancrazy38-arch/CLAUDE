/* Taller de Ascensores — videos 3D: puertas de cabina (operador, hojas, contacto de puerta de cabina,
   patín de arrastre y cerradura de la puerta de piso). Mismo formato que v3d-maquina.js:
   construir(K) arma las piezas una vez; funciona/falla.anim(t, s, K) las mueve como función pura del tiempo;
   cam = claves de cámara [t, [posición], [a dónde mira]]; subt = subtítulos sencillos. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  // ---------- textos sencillos de cada pieza ----------
  S.operador_puertas = {
    que: 'Es el motor de las puertas. Va encima de la cabina, arriba de la puerta, con una correa negra con dientes.',
    sirve: 'Abre y cierra la puerta de la cabina en cada piso: arranca suave, va rápido y frena antes de llegar.',
    falla: 'Si la correa está floja o gastada, salta de dientes: la puerta abre a tirones, lenta o se queda a medias.',
    arreglo: 'Con el ascensor detenido, el técnico estira o cambia la correa y limpia el riel de los carritos.'
  };
  S.puerta_cabina = {
    que: 'Son las dos hojas de metal que viajan con la cabina. Son las que tienes al frente cuando vas adentro.',
    sirve: 'Cierran la cabina en el viaje para que nadie toque la pared del hueco, y jalan la puerta del piso.',
    falla: 'Si cae una piedrita o un tornillo en la ranura del piso, la puerta no cierra del todo y vuelve a abrir.',
    arreglo: 'Con el ascensor detenido, se limpia la ranura con aspiradora o brocha y se revisa que las hojas no rocen.'
  };
  S.contacto_puerta_cabina = {
    que: 'Es una cajita con dos puntas arriba de la puerta de la cabina, y un puente de metal que va en la hoja.',
    sirve: 'Al cerrar, el puente entra en la cajita y avisa que la puerta cerró. Recién ahí el ascensor viaja.',
    falla: 'Si el puente se dobla o el contacto está sucio, la puerta cierra pero el ascensor no sale o se para de golpe.',
    arreglo: 'Con el ascensor detenido, se endereza el puente, se limpia el contacto y se prueba. Nunca se puentea.'
  };
  S.cerradura = {
    que: 'Es un gancho de metal con dos ruedas de goma y un contacto eléctrico, arriba de cada puerta de piso.',
    sirve: 'Traba la puerta del piso y avisa al tablero que está cerrada. Sin esa señal el ascensor no se mueve.',
    falla: 'Si el contacto está sucio o quemado, el ascensor no sale de ese piso o se para de golpe entre pisos.',
    arreglo: 'Con el ascensor detenido y sin corriente, se limpia o cambia el contacto y se revisa el gancho. Nunca se puentea.'
  };
  S.patin = {
    que: 'Son dos planchas de metal paradas, pegadas a la puerta de la cabina, del lado del hueco.',
    sirve: 'Al llegar a un piso empujan las ruedas de la cerradura: sueltan el gancho y jalan la puerta del piso.',
    falla: 'Si se corre de su sitio, golpea las ruedas al pasar: el ascensor se para de golpe o la puerta no abre.',
    arreglo: 'Con el ascensor detenido, el técnico lo centra entre las ruedas, con unos milímetros de aire a cada lado.'
  };

  // ---------- utilidades de tiempo (copias de las del motor, para usarlas fuera de anim) ----------
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ph(t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = cl((t - a) / (b - a)); return x * x * (3 - 2 * x); }
  function kf(t, a) {
    if (t <= a[0][0]) return a[0][1];
    for (var i = 1; i < a.length; i++) if (t <= a[i][0]) return a[i - 1][1] + (a[i][1] - a[i - 1][1]) * ph(t, a[i - 1][0], a[i][0]);
    return a[a.length - 1][1];
  }
  function vel(f, t) { return (f(t + 0.05) - f(t - 0.05)) / 0.1; }
  // mueve de «desde» a «hasta» en n tirones (cada tirón avanza rápido y luego se queda quieto)
  function tirones(t, t0, t1, desde, hasta, n) {
    if (t <= t0) return desde; if (t >= t1) return hasta;
    var x = (t - t0) / (t1 - t0) * n, k = Math.floor(x);
    return desde + (hasta - desde) * (k + ph(x - k, 0, 0.35)) / n;
  }
  function estadoPuerta(a, v) {
    if (Math.abs(v) > 0.004) return v > 0 ? ['ABRIENDO', 'ac'] : ['CERRANDO', 'ac'];
    return a > 0.4 ? ['ABIERTA', ''] : a < 0.004 ? ['CERRADA', 'ok'] : ['A MEDIAS', 'mal'];
  }
  function ritmo(t, tramos) {
    for (var i = 0; i < tramos.length; i++) {
      var a = tramos[i][0], b = tramos[i][1];
      if (t >= a && t <= b) { var u = (t - a) / (b - a); return u < 0.28 ? 'ARRANCA SUAVE' : u < 0.72 ? 'RÁPIDA' : 'FRENA SUAVE'; }
    }
    return 'QUIETA';
  }

  // =====================================================================================
  // 1) Frente de la cabina visto desde el hueco: operador (motor, correa, carritos), hojas y contacto
  // =====================================================================================
  var X = 0.86, YP = 2.36, RP = 0.045, ZC = 0.14, L1 = 2 * X, ARC = PI * RP, LAZO = 2 * L1 + 2 * ARC, NSEG = 120, ABRE = 0.42;
  // punto de la correa a la distancia s del lazo (va en sentido horario visto de frente); sag = cuánto cuelga el tramo de abajo
  function lazo(s, sag, q) {
    s = ((s % LAZO) + LAZO) % LAZO;
    var x, y, a;
    if (s < L1) { x = -X + s; y = YP + RP; a = 0; }
    else if (s < L1 + ARC) { var f = PI / 2 - (s - L1) / RP; x = X + RP * Math.cos(f); y = YP + RP * Math.sin(f); a = f - PI / 2; }
    else if (s < 2 * L1 + ARC) {
      var u = (s - L1 - ARC) / L1;
      x = X - L1 * u; y = YP - RP - sag * Math.sin(PI * u); a = Math.atan2(-sag * PI * Math.cos(PI * u), -L1);
    } else { var g = -PI / 2 - (s - 2 * L1 - ARC) / RP; x = -X + RP * Math.cos(g); y = YP + RP * Math.sin(g); a = g - PI / 2; }
    q[0] = x; q[1] = y; q[2] = a; return q;
  }
  function polea(K) {
    var M = K.M, g = new K.T.Group();
    g.add(K.cil(0.031, 0.03, M.acero, 0, 0, 0, 'z', 24));
    g.add(K.cil(0.054, 0.004, M.aceroOsc, 0, 0, 0.017, 'z', 28), K.cil(0.054, 0.004, M.aceroOsc, 0, 0, -0.017, 'z', 28));
    g.add(K.caja(0.046, 0.012, 0.004, M.blanco, 0.024, 0, 0.0205));   // raya blanca para ver el giro
    g.add(K.cil(0.01, 0.046, M.hierro, 0, 0, 0, 'z', 10));
    return g;
  }

  function armarCabina(K) {
    var M = K.M, T = K.T, s = {};
    s.raiz = K.add(new T.Group());
    function R(o) { s.raiz.add(o); return o; }
    s.verdeB = K.matB(0x3ccf7f); s.rojoB = K.matB(0xff3b30);
    var mCarro = K.mat(0x8995a2, { metalness: 0.35, roughness: 0.45 }), mAg = M.hierro;
    var mHoja = K.mat(0xa3aeb8, { metalness: 0.5, roughness: 0.32 });
    // cabina: frente con su vano, costados, fondo, piso y techo
    R(K.caja(0.45, 2.24, 0.03, M.inox, -0.625, 1.12, -0.03)); R(K.caja(0.45, 2.24, 0.03, M.inox, 0.625, 1.12, -0.03));
    R(K.caja(0.8, 0.24, 0.03, M.inox, 0, 2.12, -0.03));
    R(K.caja(0.03, 2.24, 1.4, M.panel, -0.835, 1.12, -0.745)); R(K.caja(0.03, 2.24, 1.4, M.panel, 0.835, 1.12, -0.745));
    R(K.caja(1.7, 2.24, 0.03, M.panel, 0, 1.12, -1.445));
    R(K.caja(1.7, 0.06, 1.44, M.piso, 0, -0.03, -0.73));
    R(K.caja(1.72, 0.04, 1.445, M.aceroOsc, 0, 2.26, -0.7375));
    // pisadera de la cabina con su ranura
    R(K.caja(1.7, 0.03, 0.09, M.acero, 0, -0.015, 0.04)); R(K.caja(1.7, 0.003, 0.014, M.negro, 0, 0.0005, 0.03));
    // operador: placa, riel, motor, poleas y caja electrónica
    R(K.caja(1.94, 0.46, 0.01, M.aceroOsc, 0, 2.25, -0.009));
    R(K.caja(1.85, 0.025, 0.03, M.acero, 0, 2.15, 0.011));
    s.motor = R(K.grupo([
      K.caja(0.16, 0.16, 0.01, M.hierro, 0, 0, 0.001),
      K.cil(0.065, 0.1, M.azul, 0, 0, 0.056, 'z', 28),
      K.toro(0.066, 0.005, M.hierro, 0, 0, 0.03), K.toro(0.066, 0.005, M.hierro, 0, 0, 0.06), K.toro(0.066, 0.005, M.hierro, 0, 0, 0.09),
      K.caja(0.05, 0.035, 0.05, M.negro, 0, 0.08, 0.05),
      K.cil(0.008, 0.05, M.acero, 0, 0, 0.12, 'z', 10)
    ], -X, YP, 0));
    s.poleaM = R(polea(K)); s.poleaM.position.set(-X, YP, ZC);
    s.poleaR = R(polea(K)); s.poleaR.position.set(X, YP, ZC);
    R(K.caja(0.07, 0.09, 0.02, M.hierro, X, YP, 0.006)); R(K.cil(0.008, 0.14, M.acero, X, YP, 0.075, 'z', 10));
    s.cajaOp = R(K.caja(0.3, 0.13, 0.12, M.gris, 0.5, 2.545, -0.02));
    R(K.caja(0.1, 0.05, 0.004, M.negro, 0.56, 2.55, 0.041)); R(K.esfera(0.011, s.verdeB, 0.42, 2.56, 0.042));
    // correa dentada: tramos cortos (cinta) y dientes por dentro; se mueven por el lazo
    var gomaC = K.mat(0x202428, { roughness: 0.8, metalness: 0 }), seg = LAZO / NSEG;
    s.cinta = R(new T.InstancedMesh(new T.BoxGeometry(seg * 1.15, 0.009, 0.026), gomaC, NSEG));
    s.dientes = R(new T.InstancedMesh(new T.BoxGeometry(seg * 0.5, 0.009, 0.026), gomaC, NSEG));
    s.cinta.position.z = s.dientes.position.z = ZC; s.cinta.frustumCulled = s.dientes.frustumCulled = false;
    s.marcaC = R(K.caja(0.026, 0.007, 0.028, M.blanco, 0, 0, ZC));
    s.dummy = new T.Object3D();
    // hojas con su carrito (placa, ruedas, agarre a la correa) y guías de abajo (en los bordes de cada hoja)
    s.carros = []; s.guias = [];
    s.hojas = [-1, 1].map(function (lado) {
      var g = R(new T.Group()), cx = lado * 0.21, c = new T.Group(); g.add(c); s.carros.push(c);
      g.hoja = K.add(K.caja(0.42, 1.98, 0.025, mHoja, cx, 1.01, 0.03), g);
      g.add(K.caja(0.006, 1.98, 0.027, M.grisClaro, cx - lado * 0.207, 1.01, 0.03));
      c.add(K.caja(0.36, 0.14, 0.008, mCarro, cx, 2.07, 0.03));
      [-0.12, 0.12].forEach(function (rx) {
        c.add(K.cil(0.028, 0.02, M.blanco, cx + rx, 2.19, 0.011, 'z', 18));
        c.add(K.caja(0.014, 0.075, 0.008, mCarro, cx + rx, 2.165, 0.03));
        c.add(K.cil(0.007, 0.03, M.hierro, cx + rx, 2.19, 0.022, 'z', 8));
      });
      [-0.19, 0.19].forEach(function (gx) { s.guias.push(K.add(K.caja(0.04, 0.034, 0.012, M.negro, cx + gx, 0.005, 0.03), g)); });
      if (lado > 0) {   // carrito derecho: agarrado al tramo de arriba de la correa
        c.add(K.caja(0.024, 0.31, 0.01, mAg, cx - 0.1, 2.275, 0.039));
        c.add(K.caja(0.024, 0.014, 0.1, mAg, cx - 0.1, 2.437, 0.089));
        c.add(K.caja(0.04, 0.045, 0.045, mAg, cx - 0.1, 2.42, ZC));
      } else {          // carrito izquierdo: agarrado al tramo de abajo; lleva también el puente del contacto
        c.add(K.caja(0.024, 0.22, 0.01, mAg, cx + 0.1, 2.23, 0.039));
        s.agarreI = new T.Group(); c.add(s.agarreI);
        s.agarreI.add(K.caja(0.024, 0.014, 0.1, mAg, cx + 0.1, 2.333, 0.089), K.caja(0.04, 0.045, 0.045, mAg, cx + 0.1, 2.318, ZC));
        g.add(K.caja(0.014, 0.15, 0.012, mAg, cx + 0.165, 2.19, 0.04));
        s.puente = new T.Group(); s.puente.position.set(cx + 0.172, 2.25, 0.04); g.add(s.puente);
        s.puente.add(K.caja(0.012, 0.03, 0.012, M.cobre, 0.004, 0, 0), K.caja(0.055, 0.005, 0.01, M.cobre, 0.0275, 0.008, 0), K.caja(0.055, 0.005, 0.01, M.cobre, 0.0275, -0.008, 0));
      }
      return g;
    });
    // contacto de puerta de cabina: cajita fija en el centro, con su luz y su cable
    s.contacto = R(K.grupo([K.caja(0.07, 0.04, 0.03, M.negro, 0, 0, 0), K.caja(0.004, 0.006, 0.012, M.cobre, -0.034, 0.008, 0), K.caja(0.004, 0.006, 0.012, M.cobre, -0.034, -0.008, 0)], 0.03, 2.25, 0.04));
    R(K.caja(0.05, 0.02, 0.035, M.hierro, 0.03, 2.262, 0.0075));
    s.ledC = R(K.esfera(0.009, s.verdeB, 0.03, 2.276, 0.04));
    R(K.tubo([[0.064, 2.243, 0.035], [0.08, 2.245, 0.022], [0.088, 2.25, 0.0]], 0.0045, M.negro));
    var tierra = K.mat(0x6b4a26, { roughness: 1 });   // mugre en la entrada del contacto
    s.mugre = R(K.grupo([K.esfera(0.007, tierra, -0.036, 0.004, 0.008), K.esfera(0.006, tierra, -0.036, -0.01, -0.006), K.esfera(0.005, tierra, -0.035, 0.012, -0.008)], 0.03, 2.25, 0.04));
    s.mugre.children.forEach(function (o) { o.scale.x = 0.35; });
    // pasajero, flechas de velocidad, piedrita en la ranura, aspiradora y chispas
    s.pers = R(K.persona(1.62, 0x6a7f94)); s.pers.position.set(0.15, 0, -0.95);
    s.fl = [R(K.flecha(0xf2b705, 0.016)), R(K.flecha(0xf2b705, 0.016))];
    s.piedra = R(K.esfera(0.016, K.mat(0x8a7a62, { roughness: 1 }), -0.044, 0.01, 0.03));
    s.aspira = R(K.grupo([K.cil(0.016, 0.6, M.gris, 0, 0.33, 0, null, 14), K.cil(0.026, 0.05, M.negro, 0, 0.025, 0, null, 14)], -0.044, 0.6, 0.03));
    s.chispas = R(K.chispas(14)); s.chispas.scale.setScalar(0.5);
    return s;
  }

  // pone todo según la apertura a (0 cerrada, 0.42 abierta). o.m = giro del motor (en metros de correa), o.sag = correa floja
  function ponerCabina(s, K, o) {
    var a = o.a, m = o.m == null ? a : o.m, sag = o.sag || 0, q = [0, 0, 0], d = s.dummy, seg = LAZO / NSEG;
    // sin marcas de colores: cada capítulo pone las suyas (así no quedan pegadas al cambiar de capítulo)
    K.marcar([s.hojas[0].hoja, s.hojas[1].hoja, s.motor, s.poleaM, s.cinta, s.dientes, s.cajaOp, s.contacto, s.puente, s.piedra].concat(s.carros, s.guias), null);
    s.hojas[0].position.x = -a; s.hojas[1].position.x = a;
    for (var i = 0; i < NSEG; i++) {
      lazo(i * seg + a, sag, q);
      d.position.set(q[0], q[1], 0); d.rotation.set(0, 0, q[2]); d.updateMatrix(); s.cinta.setMatrixAt(i, d.matrix);
      d.position.set(q[0] + Math.sin(q[2]) * 0.009, q[1] - Math.cos(q[2]) * 0.009, 0); d.updateMatrix(); s.dientes.setMatrixAt(i, d.matrix);
    }
    s.cinta.instanceMatrix.needsUpdate = true; s.dientes.instanceMatrix.needsUpdate = true;
    lazo(0.3 + a, sag, q); s.marcaC.position.set(q[0] - Math.sin(q[2]) * 0.007, q[1] + Math.cos(q[2]) * 0.007, ZC); s.marcaC.rotation.z = q[2];
    lazo(L1 + ARC + X + 0.11 + a, sag, q); s.agarreI.position.y = q[1] - (YP - RP);
    s.poleaM.rotation.z = -m / RP; s.poleaR.rotation.z = -a / RP;
    s.puente.rotation.z = o.doblado ? -0.25 : 0; s.puente.position.y = o.doblado ? 2.22 : 2.25;
    var cerrado = !o.doblado && a < 0.01 && !o.corta;
    s.ledC.material = cerrado ? s.verdeB : s.rojoB;
    s.mugre.visible = !!o.mugre;
    s.raiz.position.y = o.sacude || 0;
    s.pers.visible = !!o.pers;
    s.piedra.visible = !!o.piedra; s.aspira.visible = false; s.chispas.visible = false;
    s.fl[0].visible = s.fl[1].visible = false;
    return cerrado;
  }
  // flechas amarillas sobre las hojas: largas cuando van rápido, cortas cuando van suave
  function flechas(s, a, v) {
    if (Math.abs(v) < 0.012) return;
    var L = 0.1 + Math.abs(v) * 1.7, sg = v > 0 ? 1 : -1;
    s.fl.forEach(function (f, i) {
      var lado = i ? 1 : -1, x0 = lado * (0.21 + a), dir = lado * sg;
      f.visible = true; f.apuntar([x0 - dir * L / 2, 1.3, 0.1], [x0 + dir * L / 2, 1.3, 0.1]);
    });
  }
  function carroX(lado, a) { return lado * (0.21 + a); }
  var W_CAB = [[1.9, 2.5, 4.9], [0, 1.3, 0]];   // vista general de la cabina

  // ---------- operador de puertas ----------
  function aOpF(t) { return kf(t, [[0, 0], [4.8, 0], [8.3, ABRE], [9.3, ABRE], [12.3, 0], [12.9, 0], [15.9, ABRE], [18, ABRE]]); }
  function mOpX(t) { return kf(t, [[0, 0], [1.5, 0], [6.5, ABRE], [7.5, ABRE], [11, 0], [12.6, 0], [15.6, ABRE]]); }
  function aOpX(t) {
    if (t < 7) return tirones(t, 1.5, 6.5, 0, 0.2, 7);
    if (t < 12) return tirones(t, 7.5, 11, 0.2, 0, 6);
    return kf(t, [[12.6, 0], [15.6, ABRE]]);
  }
  V3.escena('operador-puertas', ['operador_puertas'], {
    fov: 34, poster: 6.6,
    construir: function (K) { return armarCabina(K); },
    funciona: {
      dur: 18,
      subt: [[0, 'El operador es el motor de las puertas. Va encima de la cabina, justo arriba de la puerta.'],
        [4.5, 'El motor gira y mueve una correa negra con dientes, parecida a la del motor de un carro.'],
        [8.5, 'La correa jala dos carritos con ruedas que corren por un riel. De cada carrito cuelga una hoja.'],
        [12.5, 'Arranca suave, va más rápido y frena antes de llegar. Así la puerta no da golpes.']],
      cam: [[0, [1.6, 3.2, 4.3], [0, 1.6, 0]], [4.5, [-0.3, 2.62, 0.95], [-0.72, 2.33, 0.06]], [8.5, [0.35, 2.75, 1.85], [-0.05, 2.2, 0.05]], [12.5, W_CAB[0], W_CAB[1]], [18, [1.7, 2.4, 4.6], [0, 1.3, 0]]],
      anim: function (t, s, K) {
        var a = aOpF(t), v = vel(aOpF, t), e = estadoPuerta(a, v), gira = Math.abs(v) > 0.003;
        ponerCabina(s, K, { a: a });
        if (t > 12.3) flechas(s, a, v);
        K.marcar([s.motor, s.poleaM], K.entre(t, 4.5, 8.5) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.carros, K.entre(t, 8.5, 12.5) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.cajaOp, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Operador (motor de puertas)', [-0.25, 2.48, 0.0]); K.rotulo('Puerta de la cabina', [0.25, 1.3, 0.05]); }
        else if (t < 8.5) { K.rotulo('Motor', [-X, 2.44, 0.06], 'izq'); K.rotulo('Correa con dientes', [-0.45, 2.41, ZC]); }
        else if (t < 12.5) { K.rotulo('Carrito', [carroX(1, a), 2.07, 0.035]); K.rotulo('Carrito', [carroX(-1, a), 2.07, 0.035], 'izq'); K.rotulo('Riel', [0, 2.15, 0.03], 'izq'); }
        else if (Math.abs(v) > 0.012) K.rotulo(ritmo(t, [[12.9, 15.9]]) === 'RÁPIDA' ? 'Rápido' : 'Suave', [0.21 + a, 1.38, 0.1]);
        K.tabla([['MOTOR', gira ? 'GIRA' : 'QUIETO', gira ? 'ac' : ''], ['PUERTA', e[0], e[1]], ['VELOCIDAD', ritmo(t, [[4.8, 8.3], [9.3, 12.3], [12.9, 15.9]]), gira ? 'ac' : '']]);
      }
    },
    falla: {
      dur: 17,
      subt: [[0, 'Falla: la correa está floja o gastada. Mira cómo cuelga hacia abajo.'],
        [4, 'El motor gira, pero la correa salta de dientes: la puerta abre a tirones o se queda a medias.'],
        [8.5, 'Se oye un golpeteo. Si la correa se rompe, la puerta ya no abre en ningún piso.'],
        [12, 'Arreglo: con el ascensor detenido, el técnico estira la correa o la cambia, y limpia el riel.']],
      cam: [[0, [0.25, 2.75, 1.7], [-0.2, 2.25, 0.05]], [4, [-0.25, 2.6, 0.95], [-0.68, 2.3, 0.06]], [8.5, [0.35, 2.75, 1.85], [-0.1, 2.2, 0.05]], [12, [0.9, 2.65, 2.9], [0, 1.9, 0]], [17, [1.2, 2.6, 3.5], [0, 1.75, 0]]],
      anim: function (t, s, K) {
        var a = aOpX(t), m = mOpX(t), mala = t < 11.6, gira = Math.abs(vel(mOpX, t)) > 0.003;
        var sag = 0.07 * (1 - ph(t, 11.4, 12.6)) * (1 + (gira && mala ? 0.25 * Math.sin(t * 11) : 0));
        ponerCabina(s, K, { a: a, m: m, sag: sag });
        var salta = mala && gira;
        K.marcar([s.cinta, s.dientes], mala ? (K.parpadeo(t, 2) ? 'mal' : null) : (t < 13 ? 'foco' : null));
        if (t < 4) K.rotulo('Correa floja', [0, 2.315 - sag, ZC]);
        else if (mala) K.rotulo('Salta de dientes', [-X + 0.04, YP - 0.06, ZC], 'der');
        if (salta) K.aviso('La correa salta de dientes');
        if (t > 13) K.aviso('Correa estirada: abre suave', false);
        var e = estadoPuerta(a, vel(aOpX, t));
        K.tabla([['MOTOR', gira ? 'GIRA' : 'QUIETO', gira ? 'ac' : ''], ['CORREA', mala ? 'FLOJA' : 'BIEN ESTIRADA', mala ? 'mal' : 'ok'], ['PUERTA', salta ? 'A TIRONES' : e[0], salta || (mala && a > 0.01) ? 'mal' : e[1]]]);
      }
    }
  });

  // ---------- puerta de cabina (las hojas) ----------
  function aPcF(t) { return kf(t, [[0, ABRE], [1.2, ABRE], [3.8, 0], [4.6, 0], [7.6, ABRE], [8.6, ABRE], [11.6, 0], [12.4, 0], [14.8, ABRE], [15.8, ABRE], [18.4, 0]]); }
  function aPcX(t) { return kf(t, [[0, ABRE], [1, ABRE], [3.2, 0.06], [3.7, 0.06], [5.4, ABRE], [6, ABRE], [8.2, 0.06], [8.7, 0.06], [10.3, ABRE], [13.3, ABRE], [16, 0]]); }
  V3.escena('puerta-cabina', ['puerta_cabina'], {
    fov: 34, poster: 0.6,
    construir: function (K) { return armarCabina(K); },
    funciona: {
      dur: 19.5,
      subt: [[0, 'La puerta de la cabina son las dos hojas que viajan contigo dentro del ascensor.'],
        [4.2, 'Arriba, cada hoja cuelga de un carrito con ruedas que corre por un riel.'],
        [8.2, 'Abajo, unas guías corren por la ranura del piso, para que la hoja no se mueva de su sitio.'],
        [12.2, 'El operador, el motor de arriba, las abre y las cierra en cada parada.'],
        [15.8, 'Cerradas, cuidan a la gente: nadie toca la pared del hueco mientras la cabina viaja.']],
      cam: [[0, W_CAB[0], W_CAB[1]], [3.6, [1.8, 2.4, 4.6], [0, 1.3, 0]], [4.6, [0.95, 2.38, 1.05], [0.32, 2.12, 0.03]], [7.6, [0.9, 2.36, 1.0], [0.36, 2.12, 0.03]], [8.8, [0.62, 0.3, 0.72], [0.28, 0.02, 0.03]], [11.8, [0.6, 0.3, 0.7], [0.26, 0.02, 0.03]], [13, [1.0, 2.75, 2.6], [-0.1, 2.0, 0]], [15.8, [1.0, 2.75, 2.6], [-0.1, 2.0, 0]], [19.5, W_CAB[0], W_CAB[1]]],
      anim: function (t, s, K) {
        var a = aPcF(t), v = vel(aPcF, t), e = estadoPuerta(a, v), cerr = ponerCabina(s, K, { a: a, pers: true });
        K.marcar([s.hojas[0].hoja, s.hojas[1].hoja], (t < 4.2 || t > 15.8) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.carros, K.entre(t, 4.2, 8.2) && K.parpadeo(t, 1.2) ? 'foco' : null);
        K.marcar(s.guias, K.entre(t, 8.2, 12.2) && K.parpadeo(t, 1.2) ? 'foco' : null);
        K.marcar([s.motor, s.poleaM, s.cinta, s.dientes], K.entre(t, 12.2, 15.8) && K.parpadeo(t, 1) ? 'foco' : null);
        if (t < 4.2) { K.rotulo('Hoja izquierda', [-0.21 - a, 1.4, 0.045], 'izq'); K.rotulo('Hoja derecha', [0.21 + a, 1.4, 0.045]); }
        else if (t < 8.2) { K.rotulo('Carrito con ruedas', [carroX(1, a) + 0.12, 2.19, 0.02]); K.rotulo('Riel', [carroX(1, a) + 0.3, 2.15, 0.03]); }
        else if (t < 12.2) K.rotulo('Guía en la ranura', [carroX(1, a) - 0.19, 0.005, 0.04]);
        else if (t < 15.8) K.rotulo('Operador', [-0.5, 2.41, ZC]);
        K.tabla([['PUERTA', e[0], e[1]], ['ASCENSOR', cerr ? 'PUEDE VIAJAR' : 'NO SE MUEVE', cerr ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 17,
      subt: [[0, 'Falla: cayó una piedrita o un tornillo en la ranura del piso de la puerta.'],
        [4.5, 'La hoja choca con eso, no termina de cerrar y vuelve a abrir. El ascensor no sale del piso.'],
        [10.5, 'Arreglo: con el ascensor detenido, limpiar la ranura con aspiradora o brocha. Ahora la puerta cierra completa.']],
      cam: [[0, [0.14, 0.3, 0.42], [-0.04, 0.01, 0.03]], [4, [0.14, 0.3, 0.42], [-0.04, 0.01, 0.03]], [5.2, [0.9, 1.25, 2.6], [-0.05, 0.8, 0]], [10.2, [0.9, 1.25, 2.6], [-0.05, 0.8, 0]], [11.4, [0.16, 0.36, 0.5], [-0.04, 0.05, 0.03]], [14, [0.16, 0.36, 0.5], [-0.04, 0.05, 0.03]], [17, [1.0, 1.4, 2.9], [0, 0.95, 0]]],
      anim: function (t, s, K) {
        var a = aPcX(t), v = vel(aPcX, t), quita = ph(t, 12.0, 12.5), hay = t < 12.5;
        var cerr = ponerCabina(s, K, { a: a, piedra: hay });
        s.piedra.position.y = 0.01 + quita * 0.03;
        s.aspira.visible = K.entre(t, 10.8, 13.4);
        s.aspira.position.y = kf(t, [[10.8, 0.7], [11.8, 0.045], [12.5, 0.045], [13.4, 0.7]]);
        var choca = hay && a < 0.07 && Math.abs(v) < 0.02 && t < 10.5;
        s.chispas.emitir(t, [-0.06, 0.02, 0.03], choca, 0.1);
        K.marcar(s.piedra, hay && K.parpadeo(t, 2) ? 'mal' : null);
        K.marcar(s.guias[1], choca ? 'mal' : null);
        if (hay) K.rotulo('Piedrita en la ranura', [-0.044, 0.03, 0.03], 'izq');
        if (K.entre(t, 4.5, 10.5)) K.aviso('La puerta no cierra');
        if (t > 15.9) K.aviso('Puerta cerrada', false);
        var e = estadoPuerta(a, v);
        K.tabla([['PUERTA', choca ? 'CHOCA ABAJO' : e[0], choca ? 'mal' : e[1]], ['ASCENSOR', cerr ? 'PUEDE VIAJAR' : 'NO SALE', cerr ? 'ok' : (t < 10.5 ? 'mal' : '')]]);
      }
    }
  });

  // ---------- contacto de puerta de cabina ----------
  function aCoF(t) { return kf(t, [[0, 0], [4.2, 0], [6.2, 0.25], [8.6, 0.25], [11.4, 0], [14.2, 0], [14.8, 0.035], [16.3, 0.035], [17, 0]]); }
  function aCoX(t) { return kf(t, [[0, 0.25], [0.8, 0.25], [3.4, 0], [5.4, 0], [6.6, 0.12], [7.1, 0.12], [8.4, 0], [18, 0]]); }
  var C_CON = [[0.24, 2.38, 0.62], [-0.03, 2.24, 0.04]];
  V3.escena('contacto-cabina', ['contacto_puerta_cabina'], {
    fov: 34, poster: 5.4,
    construir: function (K) { return armarCabina(K); },
    funciona: {
      dur: 17,
      subt: [[0, 'Este contacto le avisa al tablero que la puerta de la cabina está bien cerrada.'],
        [4.2, 'Tiene dos partes: una cajita fija arriba de la puerta y un puente de metal que viaja en la hoja.'],
        [8.5, 'Al cerrar, el puente entra en la cajita y une sus dos puntas: se prende la luz verde.'],
        [12.5, 'Solo así el ascensor puede viajar. Si la puerta se abre un poquito, se detiene.']],
      cam: [[0, [0.75, 2.6, 1.9], [0, 2.1, 0.03]], [4.2, C_CON[0], C_CON[1]], [12.4, C_CON[0], C_CON[1]], [14, [0.4, 2.45, 0.95], [0, 2.2, 0.03]], [17, [0.5, 2.5, 1.2], [0, 2.18, 0.03]]],
      anim: function (t, s, K) {
        var a = aCoF(t), v = vel(aCoF, t), e = estadoPuerta(a, v), cerr = ponerCabina(s, K, { a: a });
        var pX = -0.01 - a;
        K.marcar(s.contacto, t < 8.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.puente, K.entre(t, 4.2, 8.5) && !K.parpadeo(t, 1) ? 'foco' : null);
        if (t < 4.2) K.rotulo('Contacto de puerta de cabina', [0.06, 2.26, 0.05]);
        else if (t < 12.5) { K.rotulo('Cajita fija', [0.06, 2.24, 0.05]); K.rotulo('Puente (va en la hoja)', [pX - 0.02, 2.24, 0.045], 'izq'); }
        else K.rotulo(cerr ? 'Luz verde: cerrada' : 'Luz roja: abierta', [0.03, 2.28, 0.04]);
        if (K.entre(t, 14.6, 16.4)) K.aviso('Se abrió: se detiene');
        K.tabla([['PUERTA', e[0], e[1]], ['CONTACTO', cerr ? 'CERRADO' : 'ABIERTO', cerr ? 'ok' : 'mal'], ['ASCENSOR', cerr ? 'PUEDE VIAJAR' : 'NO SE MUEVE', cerr ? 'ok' : 'mal']]);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: el puente se dobló o se corrió. La puerta cierra, pero el puente no entra en la cajita.'],
        [4.5, 'Sin esa señal el ascensor no sale: la puerta vuelve a abrir y cerrar, una y otra vez.'],
        [8.6, 'Falla 2: el contacto está sucio. Con la vibración se abre un instante y la cabina se para de golpe.'],
        [13.5, 'Arreglo: con el ascensor detenido, enderezar el puente, limpiar el contacto y probar. Nunca se puentea.']],
      cam: [[0, [0.3, 2.42, 0.72], [-0.03, 2.23, 0.04]], [8.4, [0.3, 2.42, 0.72], [-0.03, 2.23, 0.04]], [9.4, [0.2, 2.34, 0.55], [-0.01, 2.245, 0.04]], [13.5, C_CON[0], C_CON[1]], [18, [0.45, 2.5, 1.1], [0, 2.2, 0.03]]],
      anim: function (t, s, K) {
        var doblado = t < 8.6, sucio = K.entre(t, 8.6, 13.5);
        var a = aCoX(t), corta = sucio && K.ruido(Math.floor(t * 5)) > 0.55;
        var cerr = ponerCabina(s, K, { a: a, doblado: doblado, corta: corta, mugre: sucio, sacude: corta ? Math.sin(t * 90) * 0.003 : 0 });
        s.chispas.emitir(t, [-0.005, 2.25, 0.04], corta, 0.1);
        K.marcar(s.puente, doblado ? (K.parpadeo(t, 2) ? 'mal' : null) : (t > 13.5 && K.parpadeo(t, 1) ? 'foco' : null));
        K.marcar(s.contacto, sucio ? (K.parpadeo(t, 2) ? 'mal' : null) : (t > 13.5 && !K.parpadeo(t, 1) ? 'foco' : null));
        if (doblado) K.rotulo('Puente doblado', [-0.02 - a, 2.212, 0.045], 'izq');
        else if (sucio) K.rotulo('Contacto sucio', [0.06, 2.25, 0.05]);
        if (doblado && a < 0.01) K.aviso('Cerró, pero no hay señal');
        if (corta) K.aviso('Parada de golpe');
        if (t > 14.5) K.aviso('Puerta cerrada y confirmada', false);
        K.tabla([['PUERTA', a < 0.004 ? 'CERRADA' : 'MOVIENDO', a < 0.004 ? 'ok' : 'ac'], ['CONTACTO', cerr ? 'CERRADO' : 'ABIERTO', cerr ? 'ok' : 'mal'],
          ['CABINA', sucio ? (corta ? 'SE PARA DE GOLPE' : 'VIAJANDO') : (cerr ? 'PUEDE VIAJAR' : 'NO SALE'), (sucio && !corta) || (!sucio && cerr) ? 'ok' : 'mal']]);
      }
    }
  });

  // =====================================================================================
  // 2) Puerta de piso vista desde el hueco: cerradura (gancho, traba, contacto, dos ruedas) y el patín de la cabina
  // =====================================================================================
  // apertura de la puerta de cabina d → giro del gancho y avance de la puerta de piso (el patín empuja primero la rueda móvil)
  function arrastre(d) { return { th: 0.2 * cl((d - 0.011) / 0.026), L: Math.max(0, d - 0.037) }; }
  // caja sólo con sus aristas (para dibujar la puerta de cabina «de vidrio» y ver lo que hay detrás)
  function contorno(K, w, h, d, color, x, y, z) {
    var T = K.T, m = new T.LineBasicMaterial({ color: color }); K.mats.push(m);
    var o = new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(w, h, d)), m); o.position.set(x, y, z); return o;
  }

  function armarPiso(K) {
    var M = K.M, T = K.T, s = {};
    s.verdeB = K.matB(0x3ccf7f); s.rojoB = K.matB(0xff3b30);
    var mMuro = K.mat(0x8f969c, { roughness: 0.95, metalness: 0 });
    var mHoja = K.mat(0x748290, { metalness: 0.3, roughness: 0.5 }), mCarro = K.mat(0xb3bdc6, { metalness: 0.3, roughness: 0.45 });
    // pared del hueco con el vano de la puerta, y el pasillo del otro lado
    K.add(K.caja(0.8, 4.6, 0.1, mMuro, -0.82, 0.7, -0.08)); K.add(K.caja(0.8, 4.6, 0.1, mMuro, 0.82, 0.7, -0.08));
    K.add(K.caja(0.84, 1.0, 0.1, mMuro, 0, 2.5, -0.08)); K.add(K.caja(0.84, 1.6, 0.1, mMuro, 0, -0.8, -0.08));
    K.add(K.caja(1.4, 2.4, 0.02, M.hall, 0, 1.1, -1.2)); K.add(K.caja(1.4, 0.02, 1.07, M.hall, 0, -0.01, -0.665));
    K.add(K.caja(0.96, 0.03, 0.09, M.acero, 0, -0.015, 0.045));
    // cabezal fijo de la puerta de piso y su riel
    K.add(K.caja(1.9, 0.4, 0.008, M.aceroOsc, 0, 2.22, -0.026));
    K.add(K.caja(1.85, 0.025, 0.035, M.acero, 0, 2.2, -0.0075));
    // hojas de piso con su carrito
    s.pHojas = [-1, 1].map(function (lado) {
      var g = K.add(new T.Group()), cx = lado * 0.21;
      g.add(K.caja(0.42, 1.99, 0.025, mHoja, cx, 1.005, 0));
      g.add(K.caja(0.36, 0.22, 0.008, mCarro, cx, 2.05, 0.017));
      [-0.12, 0.12].forEach(function (rx) {
        g.add(K.cil(0.025, 0.016, M.blanco, cx + rx, 2.2375, -0.005, 'z', 18));
        g.add(K.caja(0.012, 0.09, 0.008, mCarro, cx + rx, 2.2, 0.017));
        g.add(K.cil(0.006, 0.024, M.hierro, cx + rx, 2.2375, 0.008, 'z', 8));
      });
      return g;
    });
    // cerradura, montada en el carrito de la hoja derecha. Las ruedas salen hacia la cabina (z 0.068–0.1)
    var gh = s.pHojas[1], mG = M.hierro;
    K.add(K.cil(0.011, 0.05, M.hierro, 0.06, 2.10, 0.045, 'z', 12), gh);
    K.add(K.cil(0.007, 0.055, M.hierro, 0.13, 1.97, 0.0475, 'z', 8), gh);
    s.ruedaFija = K.add(K.cil(0.018, 0.032, M.goma, 0.13, 1.97, 0.084, 'z', 22), gh);
    K.add(K.cil(0.007, 0.004, M.acero, 0.13, 1.97, 0.1, 'z', 10), gh);
    s.gancho = K.add(new T.Group(), gh); s.gancho.position.set(0.06, 2.10, 0);
    K.add(K.caja(0.29, 0.016, 0.012, mG, 0.125, 0, 0.065), s.gancho);          // brazo
    K.add(K.caja(0.02, 0.055, 0.012, mG, 0.175, -0.0275, 0.065), s.gancho);    // diente que entra en la traba
    K.add(K.caja(0.016, 0.13, 0.01, mG, 0, -0.065, 0.057), s.gancho);          // palanca de la rueda móvil
    K.add(K.cil(0.007, 0.03, M.hierro, 0, -0.13, 0.065, 'z', 8), s.gancho);
    s.ruedaMovil = K.add(K.cil(0.018, 0.032, M.goma, 0, -0.13, 0.084, 'z', 22), s.gancho);
    K.add(K.cil(0.007, 0.004, M.acero, 0, -0.13, 0.1, 'z', 10), s.gancho);
    K.add(K.caja(0.006, 0.02, 0.012, M.cobre, 0.258, -0.016, 0.065), s.gancho);
    s.puenteOk = K.add(K.caja(0.046, 0.008, 0.016, M.cobre, 0.257, -0.026, 0.065), s.gancho);
    s.puenteQ = K.add(K.caja(0.046, 0.008, 0.016, K.mat(0x1d1a17, { roughness: 1 }), 0.257, -0.026, 0.065), s.gancho);
    // parte fija (en el cabezal): traba donde entra el diente, caja del contacto con dos bornes, soporte y cable
    s.traba = K.add(K.caja(0.035, 0.035, 0.02, M.hierro, 0.2645, 2.0525, 0.065));
    s.cajaC = K.add(K.grupo([K.caja(0.055, 0.035, 0.025, M.negro, 0.3175, 2.0375, 0.065),
      K.caja(0.005, 0.015, 0.008, M.cobre, 0.30, 2.0625, 0.065), K.caja(0.005, 0.015, 0.008, M.cobre, 0.335, 2.0625, 0.065)]));
    K.add(K.caja(0.1, 0.008, 0.01, M.hierro, 0.3, 2.019, 0.08));
    K.add(K.caja(0.012, 0.29, 0.012, M.hierro, 0.35, 2.165, 0.081));
    K.add(K.caja(0.012, 0.02, 0.103, M.hierro, 0.35, 2.30, 0.0295));
    K.add(K.tubo([[0.343, 2.03, 0.092], [0.357, 2.15, 0.093], [0.356, 2.28, 0.092]], 0.004, M.negro));
    s.led = K.add(K.esfera(0.008, s.verdeB, 0.3175, 2.0375, 0.08));
    // cabina: hojas de vidrio (solo sus aristas), pisadera y el patín en la hoja derecha
    s.car = K.add(new T.Group());
    var vidrio = K.mat(0x9db4c8, { transparent: true, opacity: 0.07, depthWrite: false });
    s.cHojas = [-1, 1].map(function (lado) {
      var g = K.add(new T.Group(), s.car), cx = lado * 0.21;
      g.add(K.caja(0.42, 1.99, 0.02, vidrio, cx, 1.005, 0.155), contorno(K, 0.42, 1.99, 0.02, 0x3f78b5, cx, 1.005, 0.155));
      g.add(contorno(K, 0.36, 0.14, 0.008, 0x3f78b5, cx, 2.07, 0.17));
      return g;
    });
    K.add(K.caja(0.96, 0.03, 0.09, M.acero, 0, -0.015, 0.17), s.car);
    var mp = K.mat(0x2f6fbf, { metalness: 0.35, roughness: 0.4 });
    s.patin = K.add(new T.Group(), s.cHojas[1]);
    [[0.025, -1], [0.165, 1]].forEach(function (b) {
      s.patin.add(K.caja(0.012, 0.235, 0.036, mp, b[0], 1.8875, 0.09));
      var r = K.caja(0.012, 0.04, 0.036, mp, b[0] + b[1] * 0.007, 1.756, 0.09); r.rotation.z = b[1] * 0.4; s.patin.add(r);
    });
    // unión de las dos planchas arriba y por detrás de las ruedas (así las ruedas quedan libres entre ellas)
    s.patin.add(K.caja(0.152, 0.018, 0.02, mp, 0.095, 2.004, 0.116), K.caja(0.04, 0.018, 0.03, mp, 0.095, 2.004, 0.135));
    s.chispas = K.add(K.chispas(14)); s.chispas.scale.setScalar(0.5);
    s.fl = K.add(K.flecha(0xf2b705, 0.006));
    return s;
  }
  // o: yc (altura de la cabina, 0 = a nivel), d (apertura puerta de cabina), L (apertura puerta de piso), th (giro del gancho),
  //    dx (patín corrido), quemado, corta (contacto que no hace), chispa: [x,y,z]
  function ponerPiso(s, K, o, t) {
    var L = o.L || 0, th = o.th || 0;
    K.marcar([s.gancho, s.patin, s.cajaC, s.ruedaMovil], null);
    s.car.position.y = o.yc || 0;
    s.cHojas[0].position.x = -(o.d || 0); s.cHojas[1].position.x = o.d || 0;
    s.patin.position.x = o.dx || 0;
    s.pHojas[0].position.x = -L; s.pHojas[1].position.x = L;
    s.gancho.rotation.z = th;
    s.puenteOk.visible = !o.quemado; s.puenteQ.visible = !!o.quemado;
    var contacto = th < 0.012 && L < 0.003 && !o.corta, trabado = th < 0.1 && L < 0.003;
    s.led.material = contacto ? s.verdeB : s.rojoB;
    s.chispas.emitir(t, o.chispa || [0, 0, 0], !!o.chispa, 0.12);
    s.fl.visible = false;
    return { contacto: contacto, trabado: trabado };
  }
  function tablaPiso(K, e) {
    K.tabla([['GANCHO', e.trabado ? 'TRABADO' : 'SUELTO', e.trabado ? 'ok' : 'ac'], ['CONTACTO', e.contacto ? 'CERRADO' : 'ABIERTO', e.contacto ? 'ok' : 'mal'],
      ['ASCENSOR', e.contacto ? 'PUEDE VIAJAR' : 'NO SE MUEVE', e.contacto ? 'ok' : 'mal']]);
  }
  // dónde está cada cosa (para los rótulos)
  function pGancho(L, th) { return [0.06 + L + 0.2 * Math.cos(th), 2.10 + 0.2 * Math.sin(th) + 0.012, 0.07]; }
  function pRuedas(L) { return [0.095 + L, 1.945, 0.105]; }
  var P_CON = [0.33, 2.03, 0.08];

  // ---------- cerradura de la puerta de piso ----------
  // la cabina llega bajando (yc), abre (d), espera y cierra
  function dCer(t) { return kf(t, [[0, 0], [8, 0], [9.6, 0.037], [12.2, 0.44], [14, 0.44], [16.2, 0.037], [17.6, 0]]); }
  function ycCer(t) { return kf(t, [[0, 2.6], [3.6, 2.6], [7.4, 0]]); }
  var C_CERCA = [0.4, 2.14, 0.8], M_CERCA = [0.19, 2.03, 0.06], C_SIGUE = [0.95, 2.15, 1.55], M_SIGUE = [0.42, 1.92, 0.05];
  V3.escena('cerradura', ['cerradura'], {
    fov: 34, poster: 9.4,
    construir: function (K) { return armarPiso(K); },
    funciona: {
      dur: 19.5,
      subt: [[0, 'Cada puerta de piso tiene arriba una cerradura: un gancho que la traba y un contacto eléctrico.'],
        [4, 'Llega la cabina. Su patín, dos planchas de metal, baja y queda a los lados de las dos ruedas.'],
        [8, 'Al abrir, el patín empuja una rueda: el gancho sube y el contacto se abre.'],
        [11.8, 'Ya suelta, la puerta del piso se abre junto con la de la cabina.'],
        [15.6, 'Al cerrar, el gancho cae en su traba y el contacto se cierra. Recién ahí el ascensor puede viajar.']],
      cam: [[0, [0.5, 2.2, 1.05], [0.19, 2.03, 0.06]], [3.8, [0.48, 2.18, 1.05], [0.19, 2.02, 0.06]], [5.2, [0.62, 2.35, 1.45], [0.15, 2.05, 0.06]], [7.8, C_CERCA, M_CERCA], [9.8, C_CERCA, M_CERCA], [12, C_SIGUE, M_SIGUE], [14.2, C_SIGUE, M_SIGUE], [16.6, C_CERCA, M_CERCA], [19.5, [0.45, 2.16, 0.9], [0.19, 2.03, 0.06]]],
      anim: function (t, s, K) {
        var d = dCer(t), r = arrastre(d), yc = ycCer(t), e = ponerPiso(s, K, { yc: yc, d: d, L: r.L, th: r.th }, t);
        var foco = K.parpadeo(t, 1);
        K.marcar(s.gancho, (t < 4 || K.entre(t, 8, 11.8)) && foco ? 'foco' : null);
        K.marcar(s.patin, K.entre(t, 4, 8) && foco ? 'foco' : null);
        K.marcar(s.cajaC, t > 15.6 && foco ? 'foco' : null);
        if (t < 4) { K.rotulo('Gancho', pGancho(0, 0)); K.rotulo('Contacto', P_CON); K.rotulo('Ruedas de goma', pRuedas(0), 'izq'); }
        else if (t < 8) { K.rotulo('Patín de la cabina', [0.025, yc + 1.83, 0.1], 'izq'); K.rotulo('Ruedas', pRuedas(0)); }
        else if (t < 11.8) { K.rotulo(r.th > 0.15 ? 'El gancho subió' : 'Gancho', pGancho(r.L, r.th)); if (r.L < 0.1) K.rotulo('Contacto', P_CON); K.rotulo('Patín', [0.025 + d, 1.83, 0.1], 'izq'); }
        else if (t < 15.6) { K.rotulo('Puerta del piso', [0.3 + r.L, 1.78, 0.02]); K.rotulo('Patín', [0.025 + d, 1.83, 0.1], 'izq'); }
        else { K.rotulo(e.trabado ? 'Gancho trabado' : 'Gancho', pGancho(r.L, r.th)); if (r.L < 0.1) K.rotulo(e.contacto ? 'Contacto cerrado' : 'Contacto', P_CON); }
        tablaPiso(K, e);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: el contacto está sucio o quemado. El gancho baja, pero la corriente no pasa bien.'],
        [4.5, 'El ascensor no sale de ese piso, o se para de golpe entre pisos cuando la puerta vibra.'],
        [8.5, 'Falla 2: el gancho está duro o sucio y no baja. La puerta queda sin trabar y el ascensor no se mueve.'],
        [13.5, 'Arreglo: con el ascensor detenido y sin corriente, limpiar o cambiar el contacto y dejar el gancho libre. Nunca se puentea.']],
      cam: [[0, [0.46, 2.11, 0.55], [0.29, 2.045, 0.06]], [8.2, [0.46, 2.11, 0.55], [0.29, 2.045, 0.06]], [9.4, C_CERCA, M_CERCA], [13.5, C_CERCA, M_CERCA], [19, [0.46, 2.16, 0.92], [0.2, 2.03, 0.06]]],
      anim: function (t, s, K) {
        var e;
        if (t < 8.5) {
          var corta = K.ruido(Math.floor(t * 6)) > 0.5;
          e = ponerPiso(s, K, { quemado: true, corta: corta, chispa: corta ? [0.3175, 2.072, 0.075] : null }, t);
          K.marcar(s.cajaC, K.parpadeo(t, 1.5) ? 'mal' : null); K.marcar(s.gancho, null);
          K.rotulo('Contacto quemado', P_CON);
          if (t > 4.5) K.aviso('El ascensor se para');
          K.tabla([['GANCHO', 'TRABADO', 'ok'], ['CONTACTO', corta ? 'ABIERTO' : 'CERRADO', corta ? 'mal' : 'ok'], ['ASCENSOR', 'SE CORTA', 'mal']]);
        } else {
          var d = kf(t, [[8.5, 0.44], [10.8, 0.037], [11.6, 0]]), r = arrastre(d), arreglo = ph(t, 14.2, 15);
          var th = Math.max(r.th, 0.2 * (1 - arreglo));
          e = ponerPiso(s, K, { d: d, L: r.L, th: th, quemado: t < 14.2 }, t);
          K.marcar(s.cajaC, t > 14.2 && K.parpadeo(t, 1) ? 'foco' : null);
          K.marcar(s.gancho, t < 13.5 ? (d < 0.04 && K.parpadeo(t, 2) ? 'mal' : null) : (K.parpadeo(t, 1) ? 'foco' : null));
          if (t < 13.5) { K.rotulo(d < 0.04 ? 'El gancho no baja' : 'Gancho', pGancho(r.L, th)); if (d < 0.04) K.aviso('Puerta sin trabar'); }
          else K.rotulo(e.trabado ? 'Gancho trabado' : 'Gancho libre', pGancho(r.L, th));
          if (t > 15.2) K.aviso('Trabada: puede viajar', false);
          tablaPiso(K, e);
        }
      }
    }
  });

  // ---------- patín de arrastre ----------
  function ycPat(t) { return kf(t, [[0, 0.7], [7.2, 0]]); }
  V3.escena('patin', ['patin'], {
    fov: 34, poster: 9.2,
    construir: function (K) { return armarPiso(K); },
    funciona: {
      dur: 19.5,
      subt: [[0, 'El patín son dos planchas de metal pegadas a la puerta de la cabina. Viaja con ella.'],
        [4, 'Al llegar a un piso, el patín baja y queda entre las dos ruedas de la cerradura, sin tocarlas.'],
        [8, 'Al abrir, el patín empuja una rueda y suelta el gancho de la cerradura.'],
        [11.8, 'Luego jala la puerta del piso, que se abre junto con la de la cabina.'],
        [15.6, 'Al cerrar la deja trabada. Por eso la puerta de un piso solo abre donde está la cabina.']],
      cam: [[0, [0.5, 2.62, 1.3], [0.1, 2.42, 0.08]], [4, [0.2, 2.25, 1.05], [0.1, 2.06, 0.08]], [6.4, [0.18, 2.12, 0.95], [0.1, 1.98, 0.08]], [7.8, C_CERCA, M_CERCA], [9.8, C_CERCA, M_CERCA], [12, C_SIGUE, M_SIGUE], [14.2, C_SIGUE, M_SIGUE], [16.6, C_CERCA, M_CERCA], [19.5, [0.45, 2.12, 0.92], [0.17, 1.98, 0.06]]],
      anim: function (t, s, K) {
        var d = dCer(t), r = arrastre(d), yc = ycPat(t), e = ponerPiso(s, K, { yc: yc, d: d, L: r.L, th: r.th }, t);
        K.marcar(s.patin, t < 11.8 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.ruedaMovil, K.entre(t, 8, 10) && !K.parpadeo(t, 1) ? 'foco' : null);
        if (t < 4) { K.rotulo('Patín', [0.025, yc + 1.95, 0.1], 'izq'); K.rotulo('Puerta de la cabina', [-0.25, yc + 2.2, 0.16], 'izq'); }
        else if (t < 8) { K.rotulo('Patín', [0.025, yc + 1.85, 0.1], 'izq'); K.rotulo('Ruedas de la cerradura', pRuedas(0)); }
        else if (t < 11.8) { K.rotulo('Patín', [0.025 + d, 1.83, 0.1], 'izq'); K.rotulo(r.th > 0.15 ? 'Gancho suelto' : 'Gancho', pGancho(r.L, r.th)); }
        else { K.rotulo('Patín', [0.025 + d, 1.83, 0.1], 'izq'); if (t > 15.6) K.rotulo(e.trabado ? 'Gancho trabado' : 'Gancho', pGancho(r.L, r.th)); else K.rotulo('Puerta del piso', [0.3 + r.L, 1.78, 0.02]); }
        tablaPiso(K, e);
      }
    },
    falla: {
      dur: 16,
      subt: [[0, 'Falla: el patín se corrió de su sitio. Ya no pasa por el centro de las dos ruedas.'],
        [4.5, 'Al pasar, golpea una rueda: mueve el gancho, se abre el contacto y el ascensor se para de golpe.'],
        [9.5, 'Arreglo: con el ascensor detenido, el técnico centra el patín y deja unos milímetros de aire a cada lado.']],
      cam: [[0, [0.55, 2.75, 1.2], [0.1, 2.5, 0.08]], [3.4, [0.42, 2.06, 0.72], [0.08, 1.98, 0.08]], [9.5, [0.42, 2.06, 0.72], [0.08, 1.98, 0.08]], [13, [0.46, 2.1, 0.84], [0.14, 1.98, 0.07]], [16, [0.5, 2.14, 0.95], [0.17, 2.0, 0.06]]],
      anim: function (t, s, K) {
        var dx = 0.023 * (1 - ph(t, 10, 11.4));
        // la cabina baja sin parar en este piso; el patín corrido choca con la rueda y la cabina se frena de golpe
        var yc = t < 12 ? 0.9 - 0.7 * Math.min(1, t / 3.6) + (t > 3.6 ? Math.sin((t - 3.6) * 40) * 0.004 * Math.exp(-(t - 3.6) * 5) : 0) : kf(t, [[12, 0.2], [13.6, 0]]);
        var th = 0.092 * cl((dx - 0.011) / 0.012) * cl((0.225 - yc) / 0.02);
        var golpe = K.entre(t, 3.3, 4.3);
        var e = ponerPiso(s, K, { yc: yc, d: 0, L: 0, th: th, dx: dx, chispa: golpe ? [0.05, 1.99, 0.095] : null }, t);
        var mal = t < 10;
        K.marcar(s.patin, mal ? (K.parpadeo(t, 2) ? 'mal' : null) : (t < 12 ? 'foco' : null));
        K.marcar(s.ruedaMovil, K.entre(t, 3.3, 10) && K.parpadeo(t, 2) ? 'mal' : null);
        if (K.entre(t, 9.8, 11.6)) { s.fl.visible = true; s.fl.apuntar([0.14 + dx, yc + 1.86, 0.11], [0.03 + dx, yc + 1.86, 0.11]); }
        if (t < 4.5) K.rotulo('Patín corrido', [0.048, yc + 1.85, 0.1], 'izq');
        else if (t < 10) { K.rotulo('Golpea la rueda', pRuedas(0), 'izq'); K.rotulo('Contacto abierto', P_CON); }
        else K.rotulo('Patín centrado', [0.025 + dx, yc + 1.85, 0.1], 'izq');
        if (K.entre(t, 3.8, 10)) K.aviso('Parada de golpe');
        if (t > 13.6) K.aviso('Pasa sin tocar las ruedas', false);
        tablaPiso(K, e);
      }
    }
  });
})();
