/* Taller de Ascensores — videos 3D: la cabina y lo que lleva (pesacargas, botonera de inspección del techo,
   faldón, luz de emergencia y alarma). Mismo formato que v3d-maquina.js: construir(K) arma las piezas una vez;
   funciona/falla.anim(t, s, K) las mueve como función pura del tiempo; cam = [t, [posición], [a dónde mira]]. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  // ---------- textos sencillos de cada pieza ----------
  S.cabina = {
    que: 'Es la caja donde viajas: piso, paredes, techo y puerta, con luces, espejo, pasamanos y botonera.',
    sirve: 'Lleva a las personas protegidas de un piso a otro. Va dentro de un marco de acero, sobre tacos de goma.',
    falla: 'Con los años se aflojan tornillos y un panel zumba al viajar; también parpadean las luces o se levanta el piso.',
    arreglo: 'Con el ascensor parado: ajustar los tornillos, cambiar la fuente (cajita que da corriente) de la luz y pegar el piso.'
  };
  S.pesacargas = {
    que: 'Son sensores de peso debajo del piso de la cabina, unidos a una cajita que cuenta los kilos.',
    sirve: 'Si entra más gente de la permitida, suena un zumbador y la puerta no cierra hasta que alguien baje.',
    falla: 'Si se descalibra (se desajusta), marca «lleno» con dos personas y el ascensor no sale; o no avisa aunque vaya repleto.',
    arreglo: 'El técnico lo pone en cero con la cabina vacía y lo prueba con pesas de peso conocido.'
  };
  S.caja_inspeccion = {
    que: 'Es una caja amarilla en el techo de la cabina, con botón rojo de parada, una llave y botones de subir y bajar.',
    sirve: 'Con ella el técnico mueve la cabina despacito desde el techo, y solo mientras aprieta los botones.',
    falla: 'Si la llave se traba en «inspección» o queda apretado el botón rojo, el ascensor no atiende a nadie.',
    arreglo: 'Se cambia la llave o el botón malogrado. Al terminar: llave en «normal» y botón rojo suelto.'
  };
  S.faldon = {
    que: 'Es una plancha de metal lisa que cuelga debajo de la puerta de la cabina, como una falda.',
    sirve: 'Si la cabina para más arriba del piso, tapa el hueco de abajo: nadie mete el pie ni cae al vacío.',
    falla: 'Si un golpe la dobla o se le suelta un perno, choca con el borde de cada piso y suena al pasar.',
    arreglo: 'Con el ascensor parado y asegurado, se endereza o se cambia la plancha y se ajustan sus pernos.'
  };
  S.emergencia = {
    que: 'Es una luz chica y un botón de alarma con sirena, que funcionan con su propia batería.',
    sirve: 'Si se va la luz, la cabina no queda a oscuras y quien esté encerrado puede pedir ayuda.',
    falla: 'Si la batería está gastada, en un apagón la cabina queda totalmente oscura y la alarma no suena.',
    arreglo: 'El técnico prueba la batería en cada mantenimiento y la cambia cuando ya no carga.'
  };

  // ---------- utilidades ----------
  function mats(K) {
    return {
      verde: K.matB(0x3ccf7f), rojo: K.matB(0xff3b30), amar: K.matB(0xffc62b), luz: K.matB(0xfff6dc), luzE: K.matB(0xfff0c4),
      apag: K.mat(0x9aa2a9, { roughness: 0.35, metalness: 0.2 }), oscuro: K.mat(0x30363c, { roughness: 0.6 }),
      hueco: K.mat(0x5a6168, { roughness: 1, metalness: 0 })
    };
  }
  // ondas de sonido: anillos que salen de un punto. eje 'x' (en una pared que mira a +x) o 'y' (anillos horizontales)
  function ondas(K, n, color) {
    var g = new K.T.Group(), an = [];
    for (var i = 0; i < n; i++) { var r = K.toro(1, 0.06, K.matB(color || 0xffc62b, { transparent: true, opacity: 0.8, depthWrite: false }), 0, 0, 0); g.add(r); an.push(r); }
    K.add(g);
    g.poner = function (t, pos, on, tam, eje) {
      g.visible = !!on; if (!on) return;
      g.position.set(pos[0], pos[1], pos[2]); g.rotation.set(eje === 'y' ? PI / 2 : 0, eje === 'x' ? PI / 2 : 0, 0);
      an.forEach(function (r, i) { var k = (t * 1.4 + i / n) % 1; r.scale.setScalar((tam || 0.15) * (0.25 + k)); r.material.opacity = 0.9 * (1 - k); });
    };
    return g;
  }
  // persona un poco más delgada (para que entren varias en la cabina)
  function gente(K, alto, color, casco) { var p = K.add(K.persona(alto, color, casco)); p.scale.x = 0.78; return p; }
  // gira un brazo para que la mano vaya hacia un punto del mundo; k = 0 brazo colgando, 1 brazo estirado
  function apuntar(K, p, brazo, hacia, k) {
    brazo.scale.y = 1;
    if (!(k > 0)) { brazo.rotation.set(0, 0, 0); return; }
    p.updateMatrixWorld(true);
    var v = K.v(hacia[0], hacia[1], hacia[2]), hombro = brazo.getWorldPosition(K.v()), largo = brazo.children[0].geometry.parameters.height * p.scale.y;
    var d = v.distanceTo(hombro);
    p.worldToLocal(v); v.sub(brazo.position).normalize();
    var g = Math.asin(K.cl(v.x * 0.5 + 0.5) * 2 - 1), a = Math.atan2(-v.z, -v.y);
    brazo.rotation.set(a * k, 0, g * k);
    brazo.scale.y = K.mix(1, Math.max(0.5, Math.min(1.2, (d - 0.02) / largo)), k);
  }
  function quieto(p) { p.caminar(0, 0); p.brazoI.rotation.set(0, 0, 0); p.brazoD.rotation.set(0, 0, 0); p.brazoI.scale.y = p.brazoD.scale.y = 1; }
  function enMundo(K, o) { o.updateWorldMatrix(true, false); var v = K.v(); v.setFromMatrixPosition(o.matrixWorld); return [v.x, v.y, v.z]; }
  function escribe(s, cartel, clave, txt, color) { var k = txt + '|' + (color || ''); if (s[clave] !== k) { cartel.escribir(txt, null, color); s[clave] = k; } }

  // ---------- la cabina: piso arriba en y = 0, puerta hacia +z, techo en y = 2.24 ----------
  // op.der: 'vidrio' (pared derecha transparente, para ver adentro) o panel normal
  function armarCabina(K, s, op) {
    op = op || {};
    var M = K.M, T = K.T, c = {}, g = K.add(new T.Group()); c.g = g;
    var vinil = K.mat(0x9a8a76, { roughness: 0.92, metalness: 0 }), junta = K.mat(0x4e463e, { roughness: 1, metalness: 0 });
    var espejo = K.mat(0xbfd2de, { metalness: 0.15, roughness: 0.08 });
    // piso: plataforma de acero, baldosas y la pisadera (el umbral de la puerta)
    c.piso = K.add(new T.Group(), g);
    c.piso.add(K.caja(1.28, 0.1, 1.38, M.aceroOsc, 0, -0.05, 0), K.caja(1.2, 0.006, 1.3, junta, 0, 0.003, 0));
    c.baldosas = [];
    for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) {
      // cada baldosa gira desde su borde de atrás (para la falla del piso levantado)
      var b = K.grupo([K.caja(0.39, 0.008, 0.423, vinil, 0, 0.004, 0.2117)], -0.4 + i * 0.4, 0.006, -0.4333 + j * 0.4333 - 0.2117);
      c.piso.add(b); c.baldosas.push(b);
    }
    c.pisadera = K.caja(0.76, 0.03, 0.09, M.acero, 0, -0.003, 0.735); c.piso.add(c.pisadera);
    // pared del fondo con espejo y pasamanos
    c.fondo = K.add(K.grupo([K.caja(1.24, 2.2, 0.04, M.panel, 0, 1.1, -0.67), K.caja(0.8, 0.9, 0.01, espejo, 0, 1.45, -0.645)]), g);
    c.espejo = c.fondo.children[1];
    c.pasamanos = K.grupo([K.cil(0.018, 1.0, M.cromo, 0, 0.92, -0.585, 'x', 12), K.cil(0.01, 0.06, M.cromo, -0.45, 0.92, -0.62, 'z', 8), K.cil(0.01, 0.06, M.cromo, 0.45, 0.92, -0.62, 'z', 8)]);
    c.fondo.add(c.pasamanos);
    // pared izquierda: tres paneles atornillados, pasamanos y la botonera
    c.izq = K.add(new T.Group(), g); c.paneles = []; c.tornillos = [];
    [-0.4333, 0, 0.4333].forEach(function (z) {
      var p = K.grupo([K.caja(0.04, 2.2, 0.425, M.panel, 0, 0, 0)], -0.62, 1.1, z);
      [[-0.55, -0.17], [-0.55, 0.17], [0.55, -0.17], [0.55, 0.17]].forEach(function (q) { var tn = K.cil(0.015, 0.012, M.aceroOsc, 0.024, q[0], q[1], 'x', 10); p.add(tn); c.tornillos.push(tn); });
      c.izq.add(p); c.paneles.push(p);
    });
    c.izq.add(K.caja(0.041, 2.2, 0.008, M.aceroOsc, -0.62, 1.1, -0.2167), K.caja(0.041, 2.2, 0.008, M.aceroOsc, -0.62, 1.1, 0.2167));
    c.izq.add(K.cil(0.018, 0.5, M.cromo, -0.555, 0.92, -0.3, 'z', 12));
    c.cop = K.add(K.grupo([K.caja(0.012, 0.7, 0.2, M.inox, 0, 0, 0)], -0.594, 1.2, 0.3), c.izq);
    c.pantalla = K.cartel('1', 0.1, 0.06, '#10161b', '#ff5a3c'); c.pantalla.rotation.y = PI / 2; c.pantalla.position.set(0.0075, 0.27, 0); c.cop.add(c.pantalla);
    c.rejilla = K.caja(0.004, 0.05, 0.11, M.negro, 0.008, 0.18, 0); c.cop.add(c.rejilla);
    c.botones = [];
    for (var n = 0; n < 4; n++) { var bt = K.cil(0.016, 0.01, M.acero, 0.009, 0.09 - n * 0.07, 0, 'x', 16); c.cop.add(bt); c.botones.push(bt); }
    c.alarma = K.cil(0.022, 0.012, M.amarillo, 0.01, -0.24, 0, 'x', 16); c.cop.add(c.alarma);
    // pared derecha: de vidrio (para mirar adentro) o un panel
    var der = [];
    if (op.der === 'vidrio') {
      var vidrio = K.mat(0xcfd8de, { transparent: true, opacity: 0.12, depthWrite: false, roughness: 0.2 });
      der.push(K.caja(0.01, 2.2, 1.3, vidrio, 0, 1.1, 0), K.caja(0.03, 0.03, 1.36, M.aceroOsc, 0, 2.2, 0), K.caja(0.03, 0.03, 1.36, M.aceroOsc, 0, 0.015, 0),
        K.caja(0.03, 2.2, 0.03, M.aceroOsc, 0, 1.1, -0.665), K.caja(0.03, 2.2, 0.03, M.aceroOsc, 0, 1.1, 0.64));
    } else der.push(K.caja(0.04, 2.2, 1.3, M.panel, 0, 1.1, 0));
    c.der = K.add(K.grupo(der, 0.62, 0, 0), g);
    // frente con la puerta de dos hojas (abertura de 0.7 m)
    c.frente = K.add(K.grupo([K.caja(0.29, 2.2, 0.04, M.panel, -0.495, 1.1, 0.67), K.caja(0.29, 2.2, 0.04, M.panel, 0.495, 1.1, 0.67), K.caja(0.7, 0.2, 0.04, M.panel, 0, 2.1, 0.67)]), g);
    c.hojas = [-1, 1].map(function (l) { return K.add(K.caja(0.36, 2.0, 0.025, M.inox, l * 0.18, 1.012, 0.705), c.frente); });
    c.puerta = function (a) { c.hojas[0].position.x = -(0.18 + 0.35 * a); c.hojas[1].position.x = 0.18 + 0.35 * a; };
    // techo con sus dos luces y, encima, el operador de puertas
    c.techo = K.add(K.grupo([K.caja(1.28, 0.04, 1.42, M.gris, 0, 2.22, 0), K.caja(1.0, 0.16, 0.18, M.aceroOsc, 0, 2.32, 0.56)]), g);
    c.leds = [-0.3, 0.3].map(function (z) { return K.add(K.caja(0.8, 0.012, 0.3, s.luz, 0, 2.194, z), c.techo); });
    c.puerta(0);
    return c;
  }
  // marco de acero (bastidor) con sus tacos de goma; postes = true agrega los largueros y el cabezal de arriba
  function armarMarco(K, padre, postes) {
    var M = K.M, b = K.add(new K.T.Group(), padre); b.piezas = []; b.der = [];
    function pon(o, d) { b.add(o); b.piezas.push(o); if (d) b.der.push(o); return o; }
    pon(K.caja(0.1, 0.05, 1.3, M.hierro, -0.45, -0.175, 0)); pon(K.caja(0.1, 0.05, 1.3, M.hierro, 0.45, -0.175, 0));
    pon(K.caja(1.56, 0.12, 0.16, M.hierro, 0, -0.26, 0));
    if (postes) {
      pon(K.caja(0.08, 3.02, 0.12, M.hierro, -0.72, 1.19, 0)); pon(K.caja(0.08, 3.02, 0.12, M.hierro, 0.72, 1.19, 0), true);
      pon(K.caja(1.56, 0.12, 0.16, M.hierro, 0, 2.64, 0));
      [-1, 1].forEach(function (l) { var z1 = K.caja(0.07, 0.12, 0.1, M.negro, l * 0.79, 2.6, 0), z2 = K.caja(0.07, 0.12, 0.1, M.negro, l * 0.79, -0.26, 0); b.add(z1, z2); if (l > 0) b.der.push(z1, z2); });
    }
    b.tacos = [[-0.45, -0.5], [0.45, -0.5], [-0.45, 0.5], [0.45, 0.5]].map(function (p) { return K.add(K.cil(0.06, 0.05, M.goma, p[0], -0.125, p[1], null, 16), b); });
    return b;
  }
  // guías en T a los costados ([izquierda, derecha])
  function rieles(K, y0, largo, z) {
    var g = K.add(new K.T.Group());
    [-1, 1].forEach(function (l) { var r = K.riel(largo, K.M.acero); r.position.set(l * 0.86, y0, z || 0); r.rotation.y = -l * PI / 2; g.add(r); });
    return g;
  }
  // grapas de las guías y rayas en la pared del fondo: se corren cuando la cabina viaja
  function marcasHueco(K, n, zMuro, y0, z) {
    var g = K.add(new K.T.Group()), M = K.M; g.der = [];
    for (var i = 0; i < n; i++) {
      var y = y0 + i * 0.9, d = K.caja(0.14, 0.05, 0.06, M.aceroOsc, 0.94, y, z || 0);
      g.add(K.caja(0.14, 0.05, 0.06, M.aceroOsc, -0.94, y, z || 0), d, K.caja(0.5, 0.04, 0.02, M.aceroOsc, 0, y + 0.45, zMuro + 0.035)); g.der.push(d);
    }
    return g;
  }

  // =====================================================================================
  // 1) La cabina: se arma como una caja, va en su marco, tiene luces y botonera, y lleva a la gente
  // =====================================================================================
  function cabinaBase(s, K) {
    var c = s.c;
    [c.piso, c.fondo, c.izq, c.der, c.techo, c.frente].forEach(function (o) { o.position.set(0, 0, 0); o.visible = true; });
    c.g.position.set(0, 0, 0); c.puerta(0);
    s.b.visible = true; ladoDer(s, true);
    s.hall.visible = true;
    c.leds.forEach(function (l) { l.material = s.luz; });
    c.botones.forEach(function (b) { b.material = K.M.acero; });
    c.paneles.forEach(function (p) { p.position.x = -0.62; p.rotation.set(0, 0, 0); });
    c.tornillos.forEach(function (tn) { tn.position.x = 0.024; });
    c.baldosas.forEach(function (b) { b.rotation.set(0, 0, 0); });
    s.marcas.position.y = 0; s.pers.visible = false; quieto(s.pers);
    s.zumb.poner(0, [0, 0, 0], false);
  }
  // muestra u oculta lo que está al lado derecho de la cabina (larguero, guía y grapas), para mirar por el vidrio
  function ladoDer(s, ver) { s.rieles.children[1].visible = ver; s.b.der.forEach(function (o) { o.visible = ver; }); s.marcas.der.forEach(function (o) { o.visible = ver; }); }
  V3.escena('cabina', ['cabina'], {
    fov: 36, poster: 11,
    construir: function (K) {
      var M = K.M, s = mats(K);
      K.add(K.caja(3.6, 8, 0.05, M.muro, 0, 1.2, -1.05));
      s.marcas = marcasHueco(K, 11, -1.05, -2.7);
      s.rieles = rieles(K, -3, 9);
      s.c = armarCabina(K, s, { der: 'vidrio' });
      s.b = armarMarco(K, s.c.g, true);
      // piso del pasillo frente a la cabina, con su pisadera
      s.hall = K.add(K.grupo([K.caja(3.6, 0.3, 2.4, M.hall, 0, -0.15, 2.0), K.caja(0.76, 0.03, 0.08, M.acero, 0, -0.003, 0.84)]));
      s.pers = gente(K, 1.68, 0xb5735a);
      s.zumb = ondas(K, 3, 0xff6a50);
      return s;
    },
    funciona: {
      dur: 19,
      subt: [[0, 'La cabina es la caja donde viajas. Se arma con piso, paredes, techo y puerta.'],
        [4.5, 'Va dentro de un marco de acero, apoyada en tacos de goma que le quitan la vibración.'],
        [9.2, 'Adentro tiene luces, espejo, pasamanos y la botonera para marcar el piso.'],
        [13.4, 'Entras, marcas tu piso, la puerta se cierra y la cabina te lleva.']],
      cam: [[0, [3.5, 3.0, 4.5], [0, 1.15, 0]], [4.3, [3.5, 2.85, 4.6], [0, 1.15, 0]], [6.0, [3.4, 2.5, 4.4], [0, 1.15, 0]],
        [7.4, [1.0, -0.06, -0.97], [0.3, -0.13, -0.5]], [9.0, [0.98, -0.06, -0.96], [0.3, -0.13, -0.5]],
        [10.4, [1.95, 1.55, 0.95], [-0.3, 1.55, -0.15]], [13.0, [1.9, 1.55, 0.92], [-0.3, 1.5, -0.15]], [14.6, [2.3, 1.9, 4.6], [0, 1.25, 0.2]], [19, [2.4, 2.1, 4.8], [0, 1.5, 0.2]]],
      anim: function (t, s, K) {
        var c = s.c; cabinaBase(s, K);
        // se arma la caja: cada parte llega a su sitio
        [[c.piso, 'y', 0, 0], [c.fondo, 'z', -1.3, 0.6], [c.izq, 'x', -1.3, 1.1], [c.der, 'x', 1.3, 1.5], [c.techo, 'y', 1.3, 1.9], [c.frente, 'z', 1.3, 2.3]].forEach(function (p) {
          p[0].position[p[1]] = p[2] * (1 - K.ph(t, p[3], p[3] + 0.9)); p[0].visible = t >= p[3];
        });
        s.b.visible = t >= 4.5; ladoDer(s, t < 9.4);
        c.leds.forEach(function (l) { l.material = t >= 9.8 ? s.luz : s.apag; });
        c.puerta(K.kf(t, [[0, 0], [9.4, 0], [10.4, 1], [16.0, 1], [17.0, 0]]));
        var cy = K.kf(t, [[17.2, 0], [19.4, 0.75]]);
        c.g.position.y = cy;
        // la persona entra, marca el piso 2 y se voltea hacia la puerta
        var p = s.pers; p.visible = t >= 13.2;
        if (p.visible) {
          p.position.set(K.kf(t, [[13.2, 0.05], [14.7, 0.05], [15.2, -0.14]]), cy, K.kf(t, [[13.2, 2.7], [14.7, 0.4], [15.2, 0.02]]));
          p.rotation.y = K.kf(t, [[13.2, PI], [14.9, PI], [15.3, 1.5 * PI], [16.4, 1.5 * PI], [16.9, 2 * PI]]);
          if (t < 15.2) p.caminar(t, 1);
          apuntar(K, p, p.brazoD, enMundo(K, c.botones[1]), K.ph(t, 15.3, 15.7) * (1 - K.ph(t, 16.0, 16.4)));
        }
        c.botones[1].material = t >= 15.7 ? s.amar : K.M.acero;
        escribe(s, c.pantalla, 'pt', cy > 0.5 ? '2' : '1');
        // marcas de color y rótulos
        K.marcar(c.piso.children.slice(1, 11), t < 1.6 && K.parpadeo(t, 1.2) ? 'foco' : null);
        K.marcar(s.b.piezas, K.entre(t, 4.5, 7.0) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.b.tacos, K.entre(t, 7.0, 9.4) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(c.pasamanos, K.entre(t, 11.8, 13.4) ? 'foco' : null);
        K.marcar(c.cop.children[0], K.entre(t, 11.8, 13.4) ? 'foco' : null);
        K.marcar([c.paneles[1].children[0], c.tornillos[7]], null);
        if (t < 4.5) {
          if (t < 2.0) K.rotulo('Piso', [0.3, 0.02, 0.4]);
          if (t >= 1.2) K.rotulo('Paredes', [-0.62 + c.izq.position.x, 1.7, 0.1], 'izq');
          if (t >= 2.2) K.rotulo('Techo', [0.25, 2.26 + c.techo.position.y, -0.3]);
          if (t >= 2.8) K.rotulo('Puerta', [0.1, 1.3, 0.72 + c.frente.position.z]);
        } else if (t < 7.0) K.rotulo('Marco de acero (bastidor)', [0.72, 2.2, 0.06]);
        else if (t < 9.4) { K.rotulo('Taco de goma', [0.45, -0.125, -0.5], 'izq'); K.rotulo('Marco', [0.6, -0.26, -0.08]); }
        else if (K.entre(t, 10.2, 11.8)) { K.rotulo('Luces', [0.25, 2.19, -0.3]); K.rotulo('Espejo', [0.2, 1.75, -0.645]); }
        else if (K.entre(t, 11.8, 13.2)) { K.rotulo('Pasamanos', [0.2, 0.92, -0.585]); K.rotulo('Botonera', [-0.59, 1.3, 0.3], 'izq'); }
        if (t >= 13.2) K.tabla([['PISO MARCADO', t >= 15.7 ? '2' : '—', t >= 15.7 ? 'ac' : ''], ['PUERTA', t < 16.0 ? 'ABIERTA' : t < 17.0 ? 'CERRANDO' : 'CERRADA', ''], ['CABINA', cy > 0.01 ? 'SUBIENDO' : 'QUIETA', cy > 0.01 ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 19.5,
      subt: [[0, 'Falla 1: se aflojan los tornillos. Un panel vibra y zumba cuando la cabina viaja.'],
        [5, 'Falla 2: una luz parpadea y se apaga. Casi siempre es su fuente de corriente.'],
        [9.5, 'Falla 3: el piso se despega y se levanta una esquina. La gente se puede tropezar.'],
        [14, 'Arreglo, con el ascensor parado: ajustar los tornillos, cambiar la fuente de la luz y pegar el piso.']],
      cam: [[0, [1.25, 1.42, 0.42], [-0.55, 1.3, 0.02]], [4.4, [1.18, 1.4, 0.4], [-0.55, 1.3, 0.02]], [5.6, [1.6, 1.15, 0.55], [-0.1, 2.0, -0.05]], [9.0, [1.55, 1.13, 0.52], [-0.1, 2.0, -0.05]],
        [10.2, [1.4, 1.0, 0.82], [-0.1, 0.05, 0.3]], [13.6, [1.36, 0.98, 0.8], [-0.1, 0.05, 0.3]], [15.0, [2.5, 1.55, 1.15], [-0.15, 1.05, -0.05]], [18.5, [2.6, 1.6, 1.2], [-0.15, 1.05, -0.05]]],
      anim: function (t, s, K) {
        var c = s.c; cabinaBase(s, K);
        s.hall.visible = false;   // la cabina va viajando entre pisos
        ladoDer(s, false);   // para mirar por el vidrio
        var viaje = K.integ(function (x) { return 0.9 * (1 - K.ph(x, 13.6, 14.4)); }, t);
        s.marcas.position.y = -(viaje % 0.9);
        escribe(s, c.pantalla, 'pt', String(1 + Math.floor(viaje / 2.8)));
        var arreglo = K.ph(t, 14.6, 15.6);
        // falla 1: panel flojo que vibra y un tornillo salido
        var vib = t < 5 ? 1 : 0, pan = c.paneles[1];
        pan.position.x = -0.62 + vib * Math.sin(t * 60) * 0.005; pan.rotation.y = vib * Math.sin(t * 47) * 0.03;
        var flojo = c.tornillos[7]; flojo.position.x = 0.024 + 0.03 * (1 - arreglo);
        s.zumb.poner(t, [-0.58, 1.15, -0.03], vib > 0, 0.2, 'x');
        // falla 2: una luz parpadea y luego queda apagada
        c.leds[1].material = t < 5 || t >= 14.8 ? s.luz : t < 9.5 ? (K.ruido(Math.floor(t * 8)) < 0.5 ? s.apag : s.luz) : s.apag;
        // falla 3: una baldosa de la entrada se levanta
        var lev = K.ph(t, 9.8, 10.6) * (1 - K.ph(t, 15.0, 15.8));
        c.baldosas[5].rotation.set(-0.26 * lev, 0, 0.1 * lev);
        // marcas de color
        var mal = K.parpadeo(t, 2) ? 'mal' : null, ok = K.entre(t, 14.6, 17.2) ? 'foco' : null;
        K.marcar(s.b.piezas, null); K.marcar(s.b.tacos, null); K.marcar(c.pasamanos, null); K.marcar(c.cop.children[0], null); K.marcar(c.piso.children.slice(1, 11), null);
        K.marcar([c.paneles[1].children[0], flojo], t < 5 ? mal : t < 14 ? null : ok);
        K.marcar(c.baldosas[5], K.entre(t, 9.5, 14) ? mal : t < 14 ? null : ok);
        if (t < 5) {
          K.rotulo('Panel flojo', [-0.6, 1.45, 0.05]); K.rotulo('Tornillo suelto', enMundo(K, flojo), 'izq');
          K.tabla([['CABINA', 'VIAJANDO', ''], ['PANEL', 'VIBRA Y ZUMBA', 'mal']]);
        } else if (t < 9.5) {
          K.rotulo('Luz que parpadea', [0.1, 2.19, 0.3]);
          K.tabla([['CABINA', 'VIAJANDO', ''], ['LUZ DEL TECHO', 'PARPADEA', 'mal']]);
        } else if (t < 14) {
          K.rotulo('Piso levantado', [0.1, 0.07, 0.62]);
          K.tabla([['LUZ DEL TECHO', 'APAGADA', 'mal'], ['PISO', 'ESQUINA LEVANTADA', 'mal']]);
        } else {
          K.tabla([['TORNILLOS', arreglo > 0.5 ? 'AJUSTADOS' : 'FLOJOS', arreglo > 0.5 ? 'ok' : 'mal'], ['LUCES', t >= 14.8 ? 'FIRMES' : 'APAGADA', t >= 14.8 ? 'ok' : 'mal'], ['PISO', lev < 0.5 ? 'PEGADO' : 'LEVANTADO', lev < 0.5 ? 'ok' : 'mal']]);
          if (t > 15.8) K.aviso('Cabina firme y bien iluminada', false);
        }
      }
    }
  });

  // =====================================================================================
  // 2) Pesacargas: sensores bajo el piso que se aprietan con el peso
  // =====================================================================================
  var PESOS = [72, 80, 65, 78, 70, 68, 85], MAXKG = 450;
  var PUESTOS = [[-0.36, -0.4], [0.36, -0.4], [0, -0.42], [-0.36, 0.06], [0.36, 0.06], [0, 0.04], [0.05, 0.42]];
  var ENTRA = [4.4, 5.3, 6.2, 8.4, 9.0, 9.6, 10.6], SALE = 14.2;
  var ROPA = [0x7f95a8, 0xb5735a, 0x6c8f6a, 0x9a7fb0, 0xc49a4a, 0x5f7f9f, 0xd06a5a];
  // persona que entra desde el pasillo en t0, se para en su puesto mirando a la puerta y (si hay t1) sale en t1.
  // Devuelve cuánto de su peso está sobre el piso de la cabina (0..1)
  function moverPersona(K, p, t, t0, puesto, t1) {
    var x, z, rot, anda;
    if (t1 != null && t >= t1) {
      x = K.kf(t, [[t1, puesto[0]], [t1 + 0.5, 0.05]]); z = K.kf(t, [[t1, puesto[1]], [t1 + 0.5, 0.6], [t1 + 1.9, 2.9]]);
      rot = 0; anda = t < t1 + 1.9;
    } else {
      x = K.kf(t, [[t0, 0.05], [t0 + 1.5, 0.05], [t0 + 2.0, puesto[0]]]); z = K.kf(t, [[t0, 2.9], [t0 + 1.5, 0.6], [t0 + 2.0, puesto[1]]]);
      rot = PI + PI * K.ph(t, t0 + 1.9, t0 + 2.4); anda = K.entre(t, t0, t0 + 2.0);
    }
    p.visible = t >= t0 && !(t1 != null && t > t1 + 1.9);
    p.position.set(x, 0, z); p.rotation.y = rot;
    quieto(p); if (anda) p.caminar(t, 1);
    var d = K.ph(t, t0 + 1.3, t0 + 1.6);
    if (t1 != null) d *= 1 - K.ph(t, t1 + 0.4, t1 + 0.7);
    return d;
  }
  // aprieta los sensores según el peso y baja la cabina un poquito (exagerado para que se vea)
  function pesar(s, w) {
    var sy = 1 - 0.6 * Math.min(1.1, w / 520), baja = 0.07 * (1 - sy);
    s.celdas.forEach(function (g) { g.scale.y = sy; }); s.c.g.position.y = -baja;
    return baja;
  }
  function mostrarKg(s, kg, color) { escribe(s, s.disp, 'kg', Math.round(kg) + ' kg', color); }

  V3.escena('pesacargas', ['pesacargas'], {
    fov: 36, poster: 7.5,
    construir: function (K) {
      var M = K.M, s = mats(K);
      K.add(K.caja(3.4, 6, 0.05, M.muro, 0, 1.0, -1.05));
      s.c = armarCabina(K, s, { der: 'vidrio' });
      // vigas del marco bajo el piso, y sobre ellas los cuatro sensores de peso
      K.add(K.caja(0.1, 0.06, 1.3, M.hierro, -0.42, -0.21, 0)); K.add(K.caja(0.1, 0.06, 1.3, M.hierro, 0.42, -0.21, 0));
      K.add(K.caja(1.1, 0.1, 0.14, M.hierro, 0, -0.29, 0));
      var celda = K.mat(0x2f7fd0, { roughness: 0.5 });
      s.celdas = [[-0.42, -0.5], [0.42, -0.5], [-0.42, 0.5], [0.42, 0.5]].map(function (p) {
        K.add(K.caja(0.12, 0.012, 0.1, M.acero, p[0], -0.176, p[1]));
        return K.add(K.grupo([K.caja(0.08, 0.07, 0.07, celda, 0, 0.035, 0), K.caja(0.084, 0.01, 0.074, M.acero, 0, 0.065, 0)], p[0], -0.17, p[1]));
      });
      // caja que cuenta los kilos, en el marco, con su pantalla y el botón de cero
      K.add(K.caja(0.36, 0.03, 0.04, M.hierro, 0.62, -0.2, -0.6));
      s.caja = K.add(K.grupo([K.caja(0.06, 0.17, 0.24, M.gris, 0, 0, 0)], 0.82, -0.12, -0.6)); s.caja.rotation.y = -0.6;
      s.disp = K.cartel('0 kg', 0.2, 0.08, '#10161b', '#3ccf7f'); s.disp.rotation.y = PI / 2; s.disp.position.set(0.031, 0.03, 0); s.caja.add(s.disp);
      s.cero = K.cil(0.016, 0.014, M.rojo, 0.034, -0.05, 0.06, 'x', 14); s.caja.add(s.cero);
      K.add(K.tubo([[0.46, -0.14, -0.5], [0.58, -0.17, -0.52], [0.7, -0.17, -0.58], [0.78, -0.15, -0.6]], 0.007, M.negro));
      s.hall = K.add(K.grupo([K.caja(3.4, 0.3, 2.4, M.hall, 0, -0.15, 2.0), K.caja(0.7, 0.03, 0.08, M.acero, 0, -0.003, 0.84)]));
      s.gente = ROPA.map(function (col, i) { return gente(K, i === 6 ? 1.74 : 1.6 + K.ruido(i) * 0.1, col); });
      s.pesas = []; for (var i = 0; i < 8; i++) s.pesas.push(K.add(K.grupo([K.caja(0.26, 0.07, 0.16, M.pesa, 0, 0.035, 0), K.caja(0.1, 0.02, 0.02, M.hierro, 0, 0.08, 0)])));
      s.zumb = ondas(K, 3, 0xff6a50);
      s.flechas = [0.5, -0.5].map(function (z) { var f = K.add(K.flecha(0x3ccf7f, 0.012)); f.z = z; return f; });
      return s;
    },
    funciona: {
      dur: 19,
      subt: [[0, 'Debajo del piso de la cabina hay sensores de peso. Funcionan como una balanza.'],
        [4.2, 'Cuando entra gente, el piso baja un poquito y los sensores se aprietan. Una cajita cuenta los kilos.'],
        [9.2, 'Esta cabina lleva máximo 6 personas. Si entra una más, suena el zumbador y la puerta no cierra.'],
        [14.2, 'Cuando esa persona sale, el peso baja, se apaga el aviso y la puerta cierra.']],
      cam: [[0, [1.6, -0.1, 0.65], [0.55, -0.1, -0.05]], [4.0, [1.6, -0.11, 0.65], [0.55, -0.06, -0.05]], [8.4, [1.6, -0.11, 0.65], [0.55, -0.06, -0.05]],
        [9.8, [2.4, 1.7, 3.7], [0, 0.85, 0.25]], [19, [2.6, 1.8, 4.0], [0, 0.85, 0.25]]],
      anim: function (t, s, K) {
        var w = 0, n = 0, dentro = [];
        s.gente.forEach(function (p, i) { var d = moverPersona(K, p, t, ENTRA[i], PUESTOS[i], i === 6 ? SALE : null); dentro.push(d); w += PESOS[i] * d; if (d > 0.5) n++; });
        var baja = pesar(s, w);
        s.gente.forEach(function (p, i) { p.position.y = -baja * dentro[i]; });
        s.pesas.forEach(function (o) { o.visible = false; });
        s.flechas.forEach(function (f) { f.visible = K.entre(t, 4.6, 9.2); f.apuntar([0.7, 0.2 - baja, f.z], [0.7, 0.03 - baja, f.z]); });
        var sobre = w > MAXKG;
        mostrarKg(s, w, sobre ? '#ff3b30' : w > MAXKG * 0.85 ? '#ffc62b' : '#3ccf7f');
        s.cero.position.x = 0.034;
        var pu = K.kf(t, [[0, 1], [16.6, 1], [17.6, 0]]);
        s.c.puerta(pu);
        s.zumb.poner(t, [-0.57, 1.45, 0.3], sobre, 0.28, 'x');
        K.marcar(s.celdas, t < 4.2 ? (K.parpadeo(t, 1) ? 'foco' : null) : t < 9.2 ? 'foco' : null);
        K.marcar(s.caja.children[0], K.entre(t, 4.2, 9.2) ? 'foco' : null);
        if (t < 4.2) { K.rotulo('Sensor de peso', [0.42, -0.135, 0.5]); K.rotulo('Sensor de peso', [0.42, -0.135, -0.5], 'izq'); }
        else if (t < 9.2) { K.rotulo('Sensor', [0.42, -0.135, 0.5], 'der'); K.rotulo('Caja que cuenta los kilos', [0.86, -0.035, -0.62]); }
        else if (sobre) K.rotulo('Zumbador', [-0.58, 1.45, 0.3], 'izq');
        if (t >= 4.2) K.tabla([['PESO', Math.round(w) + ' kg de ' + MAXKG, sobre ? 'mal' : 'ok'], ['PERSONAS', n + ' de 6', n > 6 ? 'mal' : ''],
          ['PUERTA', sobre ? 'NO CIERRA' : pu > 0.99 ? 'ABIERTA' : pu > 0.01 ? 'CERRANDO' : 'CERRADA', sobre ? 'mal' : '']]);
        if (sobre) K.aviso('¡Sobrecarga! Que baje una persona');
        else if (t > 16.4) K.aviso('Peso correcto: puede viajar', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: el pesacargas está descalibrado (desajustado). Con solo 2 personas marca lleno.'],
        [5, 'Suena el zumbador y la puerta no cierra. La gente cree que el ascensor está malogrado.'],
        [9.5, 'Arreglo: con la cabina vacía, el técnico aprieta el botón de cero.'],
        [14.2, 'Luego pone pesas de peso conocido y revisa que marque lo mismo. Así queda calibrado.']],
      cam: [[0, [1.75, 0.3, 0.5], [0.55, -0.02, -0.35]], [4.0, [1.72, 0.3, 0.48], [0.55, -0.02, -0.35]], [5.4, [2.3, 1.7, 3.6], [0, 0.85, 0.25]], [9.0, [2.2, 1.6, 3.4], [0, 0.85, 0.25]],
        [10.4, [1.7, 0.25, 0.45], [0.6, -0.1, -0.4]], [14.0, [1.68, 0.25, 0.44], [0.6, -0.1, -0.4]], [15.2, [1.85, 0.75, 0.75], [0.35, 0.0, -0.2]], [19, [1.9, 0.78, 0.8], [0.35, 0.0, -0.2]]],
      anim: function (t, s, K) {
        var w = 0, n = 0, dentro = [];
        s.gente.forEach(function (p, i) {
          if (i > 1) { p.visible = false; dentro.push(0); return; }
          var d = moverPersona(K, p, t, i ? -0.6 : -1.2, i ? [0.25, -0.2] : [-0.25, -0.2], i ? 8.9 : 8.4); dentro.push(d); w += PESOS[i] * d; if (d > 0.5) n++;
        });
        // pesas de 25 kg que el técnico pone para probar
        var pz = 0;
        s.pesas.forEach(function (o, i) {
          var ti = 14.6 + i * 0.45;
          o.visible = t >= ti - 0.4; pz += 25 * K.ph(t, ti - 0.1, ti);
          o.position.set(0.25, 0.014 + Math.floor(i / 2) * 0.09 + 0.6 * (1 - K.ph(t, ti - 0.4, ti)), i % 2 ? -0.05 : -0.28);
        });
        w += pz;
        var baja = pesar(s, w);
        s.flechas.forEach(function (f) { f.visible = false; });
        s.gente.forEach(function (p, i) { if (i < 2) p.position.y = -baja * dentro[i]; });
        s.pesas.forEach(function (o) { o.position.y -= baja; });
        var error = 330 * (1 - K.ph(t, 12.2, 12.5)), marca = w + error, sobre = marca > MAXKG;
        mostrarKg(s, marca, sobre ? '#ff3b30' : error > 1 ? '#ffc62b' : '#3ccf7f');
        var aprieta = K.ph(t, 11.8, 12.0) * (1 - K.ph(t, 12.5, 12.7));
        s.cero.position.x = 0.034 - 0.009 * aprieta;
        s.c.puerta(1);
        s.zumb.poner(t, [-0.57, 1.45, 0.3], sobre, 0.28, 'x');
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.celdas, null);
        K.marcar(s.caja.children[0], t < 12.3 ? (t < 5 || t >= 9.5 ? mal : null) : t < 17.5 ? 'foco' : null);
        if (t < 5) K.rotulo('Marca de más', [0.82, -0.035, -0.6]);
        else if (t < 9.5) { if (n) K.rotulo('Solo 2 personas', [0, 1.75, -0.2]); if (sobre) K.rotulo('Zumbador', [-0.58, 1.45, 0.3], 'izq'); }
        else if (t < 14.2) { K.rotulo(error > 1 ? 'Vacía, pero marca kilos' : 'Puesto en cero', [0.82, -0.035, -0.6]); if (K.entre(t, 11.0, 13)) K.rotulo('Botón de cero', enMundo(K, s.cero), 'izq'); }
        else K.rotulo('Pesas de 25 kg', [0.25, 0.3, -0.05]);
        K.tabla([['PERSONAS', n ? n + '' : 'NADIE', ''], ['PESO REAL', Math.round(w) + ' kg', ''], ['MARCA', Math.round(marca) + ' kg', sobre ? 'mal' : error > 1 ? 'mal' : 'ok']]);
        if (sobre) K.aviso('¡Sobrecarga! con solo 2 personas');
        else if (t > 17.8) K.aviso('Calibrado: marca bien', false);
      }
    }
  });

  // =====================================================================================
  // 3) Botonera de inspección en el techo de la cabina (el techo está en y = 0)
  // =====================================================================================
  var PB = -2.24;   // nivel del piso de la cabina (y del pasillo) en esta escena
  function inspBase(s, K, cap) {
    s.llave.position.y = 0.05; s.llave.rotation.y = 0.7;
    s.hongo.position.y = 0.05; s.bSub.position.y = s.bCom.position.y = s.bBaj.position.y = 0.055;
    s.marcas.position.y = 0; s.flecha.visible = false;
    s.tec.visible = true; quieto(s.tec);
    s.pasillo.visible = cap === 1; s.vec.visible = false; quieto(s.vec);
    s.bLlamar.material = K.M.acero;
  }
  V3.escena('inspeccion', ['caja_inspeccion'], {
    fov: 36, poster: 3,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      var cab = K.add(new T.Group()); cab.position.y = PB;
      s.c = armarCabina(K, s, {}); cab.add(s.c.g); armarMarco(K, s.c.g, true);
      K.add(K.caja(3.4, 9, 0.05, M.muro, 0, 0.3, -1.0));
      s.marcas = marcasHueco(K, 12, -1.0, -4.6); rieles(K, -5, 10);
      [-0.05, 0, 0.05].forEach(function (x) { K.add(K.cil(0.006, 4.6, M.hierro, x, 0.46 + 2.3, 0, null, 8)); });
      // baranda del fondo del techo
      [-0.6, 0, 0.6].forEach(function (x) { K.add(K.caja(0.04, 1.1, 0.04, M.amarillo, x, 0.55, -0.64)); });
      K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, 1.1, -0.64)); K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, 0.55, -0.64)); K.add(K.caja(1.24, 0.1, 0.02, M.amarillo, 0, 0.05, -0.64));
      // la caja de inspección sobre un poste, con los mandos arriba
      K.add(K.caja(0.04, 0.86, 0.04, M.hierro, 0.3, 0.43, 0.4));
      s.caja = K.add(new T.Group()); s.caja.position.set(0.3, 0.91, 0.4);
      s.cuerpo = K.caja(0.36, 0.1, 0.18, M.amarillo, 0, 0, 0); s.caja.add(s.cuerpo);
      s.caja.add(K.cil(0.036, 0.008, M.negro, -0.12, 0.052, -0.01, null, 20));
      s.hongo = K.grupo([K.cil(0.012, 0.03, M.hierro, 0, 0.015, 0, null, 10), K.cil(0.034, 0.016, M.rojo, 0, 0.034, 0, null, 24),
        K.en(new T.Mesh(new T.SphereGeometry(0.034, 20, 8, 0, PI * 2, 0, PI / 2), M.rojo), 0, 0.042, 0)], -0.12, 0.05, -0.01);
      s.hongo.children[2].scale.y = 0.45; s.caja.add(s.hongo);
      s.llave = K.grupo([K.cil(0.026, 0.012, M.negro, 0, 0.006, 0, null, 18), K.caja(0.012, 0.022, 0.048, M.negro, 0, 0.022, 0), K.caja(0.008, 0.023, 0.012, M.blanco, 0, 0.023, -0.019)], -0.035, 0.05, -0.01);
      s.caja.add(s.llave);
      s.bSub = K.cil(0.018, 0.016, M.negro, 0.045, 0.055, -0.01, null, 18); s.bCom = K.cil(0.018, 0.016, M.azul, 0.095, 0.055, -0.01, null, 18); s.bBaj = K.cil(0.018, 0.016, M.negro, 0.145, 0.055, -0.01, null, 18);
      s.caja.add(s.bSub, s.bCom, s.bBaj);
      [['STOP', -0.12, 0.064], ['NORMAL', -0.085, 0.05], ['INSP.', 0.015, 0.05], ['SUBE', 0.045, 0.044], ['COMÚN', 0.095, 0.05], ['BAJA', 0.145, 0.044]].forEach(function (e, i) {
        var o = K.cartel(e[0], e[2], 0.017, '#f2b705', '#1e2125'); o.rotation.x = -PI / 2; o.position.set(e[1], 0.0505, i === 1 || i === 2 ? -0.07 : 0.055); s.caja.add(o);
      });
      s.flecha = K.add(K.flecha(0x3ccf7f, 0.03));
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true)); s.tec.position.set(0.2, 0, 0.18);
      // el pasillo del piso donde está la cabina (solo para la falla): puerta de piso cerrada, botón de llamada y pantalla
      s.pasillo = K.add(new T.Group());
      s.pasillo.add(K.caja(3.4, 0.3, 2.4, M.hall, 0, PB - 0.15, 2.05));
      s.pasillo.add(K.caja(1.2, 2.14, 0.1, M.muro, -0.95, PB + 1.07, 0.85), K.caja(1.2, 2.14, 0.1, M.muro, 0.95, PB + 1.07, 0.85), K.caja(0.7, 0.14, 0.1, M.muro, 0, PB + 2.07, 0.85));
      s.pasillo.add(K.caja(0.355, 2.0, 0.03, M.aceroOsc, -0.18, PB + 1.0, 0.86), K.caja(0.355, 2.0, 0.03, M.aceroOsc, 0.18, PB + 1.0, 0.86));
      s.pasillo.add(K.caja(0.07, 0.14, 0.02, M.inox, 0.55, PB + 1.1, 0.91));
      s.bLlamar = K.cil(0.018, 0.012, M.acero, 0.55, PB + 1.1, 0.925, 'z', 16); s.pasillo.add(s.bLlamar);
      s.pantPiso = K.cartel('INSP', 0.3, 0.1, '#10161b', '#ff5a3c'); s.pantPiso.position.set(0, PB + 2.07, 0.905); s.pasillo.add(s.pantPiso);
      s.vec = gente(K, 1.6, 0x9a7fb0); s.vec.position.set(0.3, PB, 1.4); s.vec.rotation.y = PI;
      return s;
    },
    funciona: {
      dur: 18.5,
      subt: [[0, 'En el techo de la cabina hay una caja amarilla. Con ella el técnico maneja el ascensor.'],
        [4.4, 'Primero gira la llave a «inspección». Desde ahí el ascensor ya no atiende a los pasajeros.'],
        [9.2, 'Aprieta «subir» junto con «común»: la cabina sube despacito. Si suelta, se para.'],
        [14, 'Si hay peligro, aprieta el botón rojo de parada y todo se detiene.']],
      cam: [[0, [0.86, 1.42, 1.1], [0.29, 0.97, 0.38]], [4.2, [0.82, 1.4, 1.06], [0.29, 0.97, 0.38]], [8.8, [0.82, 1.4, 1.06], [0.29, 0.97, 0.38]],
        [10.0, [2.3, 1.85, 2.8], [0.1, 0.6, 0]], [13.6, [2.2, 1.8, 2.7], [0.1, 0.62, 0]], [14.8, [0.95, 1.5, 1.25], [0.27, 0.98, 0.36]], [18.5, [1.0, 1.52, 1.3], [0.27, 0.98, 0.36]]],
      anim: function (t, s, K) {
        inspBase(s, K, 0);
        var insp = K.ph(t, 5.4, 6.0), pide = K.entre(t, 9.6, 12.8), stop = t >= 15.0;
        s.llave.rotation.y = K.mix(0.7, -0.7, insp);
        if (pide) s.bSub.position.y = s.bCom.position.y = 0.047;
        if (stop) s.hongo.position.y = 0.034;
        var sube = K.integ(function (x) { return 0.35 * (K.ph(x, 9.7, 10.1) - K.ph(x, 12.8, 13.0)); }, t);
        s.marcas.position.y = -(sube % 0.9);
        var mueve = K.entre(t, 9.8, 12.9);
        s.flecha.visible = mueve; s.flecha.apuntar([0.92, 0.0, 0.45], [0.92, 0.6, 0.45]);
        // el técnico: mano izquierda a la llave, a «subir» y al stop; mano derecha a «común»
        var tec = s.tec;
        apuntar(K, tec, tec.brazoI, t < 9 ? enMundo(K, s.llave) : t < 14 ? enMundo(K, s.bSub) : enMundo(K, s.hongo),
          Math.max(K.ph(t, 4.8, 5.3) * (1 - K.ph(t, 6.3, 6.8)), K.ph(t, 9.1, 9.6) * (1 - K.ph(t, 12.8, 13.3)), K.ph(t, 14.4, 14.9) * (1 - K.ph(t, 16.0, 16.5))));
        apuntar(K, tec, tec.brazoD, enMundo(K, s.bCom), K.ph(t, 9.1, 9.6) * (1 - K.ph(t, 12.8, 13.3)));
        K.marcar(s.cuerpo, t < 2.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.llave, K.entre(t, 4.4, 9.2) ? 'foco' : null);
        K.marcar([s.bSub, s.bCom], pide ? 'foco' : null); K.marcar(s.bBaj, null);
        K.marcar(s.hongo, null);
        if (t < 4.4) { K.rotulo('Botón rojo de parada', enMundo(K, s.hongo), 'izq'); K.rotulo('Llave', [0.265, 1.0, 0.33]); K.rotulo('Subir · común · bajar', enMundo(K, s.bBaj)); }
        else if (t < 9.2) K.rotulo(insp > 0.5 ? 'Llave en «inspección»' : 'Llave en «normal»', enMundo(K, s.llave));
        else if (t < 14) { if (t < 12.8) K.rotulo('Subir + común', enMundo(K, s.bCom)); if (mueve) K.rotulo('Sube despacio', [0.92, 0.4, 0.45]); }
        else K.rotulo('Parada (stop)', enMundo(K, s.hongo), 'izq');
        K.tabla([['MODO', insp > 0.5 ? 'INSPECCIÓN' : 'NORMAL', insp > 0.5 ? 'ac' : 'ok'], ['PASAJEROS', insp > 0.5 ? 'NO SE ATIENDEN' : 'SE ATIENDEN', ''],
          ['CABINA', stop ? 'DETENIDA' : mueve ? 'SUBE DESPACIO' : 'QUIETA', stop ? 'mal' : mueve ? 'ok' : '']]);
        if (stop) K.aviso('Parada: nada se mueve', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: la llave se trabó en «inspección». El técnico no la puede volver a «normal».'],
        [5, 'Así el ascensor no atiende a nadie: la gente llama y la cabina no viene.'],
        [10, 'Lo mismo pasa si el técnico se olvida el botón rojo de parada apretado.'],
        [14.2, 'Arreglo: cambiar la llave malograda. Al terminar: llave en «normal» y botón rojo suelto.']],
      cam: [[0, [0.86, 1.42, 1.1], [0.29, 0.97, 0.38]], [4.4, [0.84, 1.4, 1.08], [0.29, 0.97, 0.38]], [6.0, [2.2, -0.6, 3.8], [0.15, -0.95, 0.85]], [9.4, [2.15, -0.62, 3.75], [0.15, -0.95, 0.85]],
        [10.8, [0.86, 1.42, 1.1], [0.29, 0.97, 0.38]], [13.8, [0.84, 1.4, 1.08], [0.29, 0.97, 0.38]], [15.0, [1.25, 1.75, 1.75], [0.25, 1.0, 0.3]], [19, [1.3, 1.78, 1.8], [0.25, 1.0, 0.3]]],
      anim: function (t, s, K) {
        inspBase(s, K, 1);
        // la llave trabada: el técnico la quiere girar y no se mueve; en el arreglo se cambia por otra y queda en «normal»
        var intenta = K.entre(t, 1.4, 4.2) ? Math.abs(Math.sin((t - 1.4) * 9)) * 0.1 : 0;
        var gira = K.ph(t, 16.0, 16.6);
        s.llave.rotation.y = -0.7 + intenta + 1.4 * gira;
        s.llave.position.y = 0.05 + 0.14 * (K.ph(t, 14.6, 15.1) - K.ph(t, 15.2, 15.7));
        // el botón de parada quedó apretado desde que el técnico se fue; en el arreglo se suelta
        var stop = K.entre(t, 5, 17.0);
        s.hongo.position.y = stop ? 0.034 : 0.05;
        var tec = s.tec; tec.visible = t < 5 || t >= 14.2;
        apuntar(K, tec, tec.brazoI, t < 16.7 ? enMundo(K, s.llave) : enMundo(K, s.hongo),
          Math.max(K.ph(t, 0.8, 1.3) * (1 - K.ph(t, 4.2, 4.7)), K.ph(t, 14.4, 14.8) * (1 - K.ph(t, 18.0, 18.5))));
        // en el pasillo: llaman y no viene
        var v = s.vec; v.visible = K.entre(t, 5, 10);
        var llama = Math.max(K.ph(t, 6.0, 6.4) * (1 - K.ph(t, 6.9, 7.3)), K.ph(t, 8.0, 8.4) * (1 - K.ph(t, 8.9, 9.3)));
        apuntar(K, v, v.brazoI, [0.55, PB + 1.1, 0.93], llama);
        escribe(s, s.pantPiso, 'pp', 'INSP', K.parpadeo(t, 1) ? '#ff5a3c' : '#8a2a1e');
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.cuerpo, null); K.marcar([s.bSub, s.bCom, s.bBaj], null);
        K.marcar(s.llave, t < 14.2 ? (t < 10 ? mal : null) : t < 15.2 ? mal : 'foco');
        K.marcar(s.hongo, K.entre(t, 10, 14.2) ? mal : K.entre(t, 16.7, 18.5) ? 'foco' : null);
        if (t < 5) {
          K.rotulo('Llave trabada en «inspección»', enMundo(K, s.llave));
          K.tabla([['LLAVE', 'TRABADA', 'mal'], ['MODO', 'INSPECCIÓN', 'mal']]);
        } else if (t < 10) {
          if (llama > 0.5) K.rotulo('Llama al ascensor', [0.55, PB + 1.1, 0.93], 'izq');
          K.rotulo('Pantalla: «INSP»', [0.08, PB + 2.07, 0.91]);
          K.tabla([['LLAMADAS', 'NO SE ATIENDEN', 'mal'], ['CABINA', 'NO VIENE', 'mal']]);
          if (t > 6.6) K.aviso('El ascensor no atiende a nadie');
        } else if (t < 14.2) {
          K.rotulo('Parada apretada', enMundo(K, s.hongo), 'izq');
          K.tabla([['PARADA', 'APRETADA', 'mal'], ['PASAJEROS', 'NO SE ATIENDEN', 'mal']]);
        } else {
          K.rotulo(t < 15.2 ? 'Llave malograda' : 'Llave nueva', enMundo(K, s.llave));
          K.tabla([['LLAVE', gira > 0.5 ? 'NORMAL' : t < 15.2 ? 'MALOGRADA' : 'NUEVA', gira > 0.5 ? 'ok' : t < 15.2 ? 'mal' : 'ac'], ['PARADA', stop ? 'APRETADA' : 'SUELTA', stop ? 'mal' : 'ok']]);
          if (t > 17.2) K.aviso('Vuelve a servicio normal', false);
        }
      }
    }
  });

  // =====================================================================================
  // 4) Faldón: la plancha bajo la puerta de la cabina que tapa el hueco
  // =====================================================================================
  var ZC = -0.81;   // centro de la cabina: su pisadera queda a 3 cm de la del piso
  // pone el rectángulo rojo del hueco abierto entre el piso del pasillo y la cabina
  function hueco(s, cy, k) {
    var h = Math.max(0.01, cy - 0.03), on = k > 0.01;
    s.hoyo.visible = on; s.mH.opacity = 0.32 * k; s.hoyo.scale.y = h; s.hoyo.position.y = 0.012 + h / 2;
    s.bordes.forEach(function (b, i) {
      b.visible = on;
      if (i < 2) { b.position.set(0, i ? 0.012 + h : 0.012, -0.012); } else { b.position.set(i === 2 ? -0.35 : 0.35, 0.012 + h / 2, -0.012); b.scale.y = h; }
    });
  }
  V3.escena('faldon', ['faldon'], {
    fov: 36, poster: 11,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K), osc = s.hueco;
      // piso del pasillo con su pisadera; debajo, la pared del frente del hueco
      K.add(K.caja(2.6, 0.25, 2.4, M.hall, 0, -0.125, 1.2));
      K.add(K.caja(0.76, 0.03, 0.1, M.acero, 0, -0.003, 0.05));
      K.add(K.caja(2.6, 2.4, 0.2, osc, 0, -1.45, 0.1));
      // marco de la puerta del piso y pared izquierda (la derecha está cortada para ver mejor)
      K.add(K.caja(0.04, 2.1, 0.14, M.inox, -0.37, 1.05, 0.07)); K.add(K.caja(0.78, 0.06, 0.14, M.inox, 0, 2.1, 0.07));
      K.add(K.caja(0.9, 2.4, 0.12, M.muro, -0.84, 1.2, 0.06)); K.add(K.caja(0.78, 0.3, 0.12, M.muro, 0, 2.28, 0.06));
      // hueco oscuro: fondo, costado izquierdo y piso del foso
      K.add(K.caja(2.6, 6, 0.05, osc, 0, 0.4, -1.75)); K.add(K.caja(0.05, 6, 1.75, osc, -1.0, 0.4, -0.875)); K.add(K.caja(2.0, 0.05, 1.75, osc, 0, -2.6, -0.875));
      rieles(K, -2.6, 6.4, ZC);
      // la cabina con su marco
      s.c = armarCabina(K, s, {}); s.c.g.position.z = ZC; armarMarco(K, s.c.g, true);
      // el faldón: plancha de arriba, parte de abajo (la que se dobla) y el borde doblado hacia adentro
      s.mF = K.mat(0x8d98a1, { metalness: 0.5, roughness: 0.4 });
      s.fal = new T.Group(); s.fal.position.set(0, -0.018, 0.774); s.c.g.add(s.fal);
      var arriba = K.caja(0.76, 0.6, 0.012, s.mF, 0, -0.3, 0); s.fal.add(arriba);
      s.bajo = new T.Group(); s.bajo.position.y = -0.6; s.fal.add(s.bajo);
      var abajo = K.caja(0.76, 0.15, 0.012, s.mF, 0, -0.075, 0); s.bajo.add(abajo);
      var chaflan = K.caja(0.76, 0.1, 0.012, s.mF, 0, -0.185, -0.035); chaflan.rotation.x = PI / 4; s.bajo.add(chaflan);
      s.placas = [arriba, abajo, chaflan];
      s.fal.add(K.caja(0.76, 0.03, 0.03, M.aceroOsc, 0, -0.015, -0.02));
      s.pernos = [-0.28, 0, 0.28].map(function (x) { var p = K.cil(0.013, 0.016, M.hierro, x, -0.06, 0.01, 'z', 10); s.fal.add(p); return p; });
      // el hueco que queda sin faldón: relleno rojo y borde
      s.mH = K.matB(0xff3b30, { transparent: true, opacity: 0.3, depthWrite: false, side: T.DoubleSide });
      s.hoyo = K.add(K.plano(0.7, 1, s.mH, 0, 0.2, -0.012));
      s.bordes = [K.caja(0.72, 0.014, 0.01, s.rojo), K.caja(0.72, 0.014, 0.01, s.rojo), K.caja(0.014, 1, 0.01, s.rojo), K.caja(0.014, 1, 0.01, s.rojo)].map(function (o) { return K.add(o); });
      s.flecha = K.add(K.flecha(0xff3b30, 0.022));
      s.chispas = K.add(K.chispas(18));
      s.golpe = ondas(K, 3, 0xff6a50);
      s.pie = gente(K, 1.66, 0x6c8f6a);
      s.pas = gente(K, 1.6, 0x9a7fb0);
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El faldón es una plancha lisa que cuelga debajo de la puerta de la cabina, como una falda.'],
        [4.5, 'Sin faldón: si la cabina para más arriba del piso, abajo queda un hueco hacia el vacío.'],
        [9, 'El faldón tapa ese hueco como una pared lisa: nadie mete el pie ni se cae.'],
        [13.5, 'Así, en un rescate, la gente baja de la cabina sin peligro.']],
      cam: [[0, [1.1, 0.5, 2.2], [0, 0.5, -0.1]], [4.4, [1.1, 0.5, 2.15], [0, 0.45, -0.1]], [6.4, [1.8, 0.75, 1.3], [0.05, 0.25, 0.0]], [13.0, [1.75, 0.75, 1.25], [0.05, 0.25, 0.0]],
        [14.6, [1.7, 1.35, 3.6], [0, 0.85, 0]], [18, [1.75, 1.4, 3.7], [0, 0.85, 0]]],
      anim: function (t, s, K) {
        var cy = K.kf(t, [[0, 0.9], [4.6, 0.9], [6.0, 0.4]]);
        s.c.g.position.y = cy; s.c.puerta(K.kf(t, [[0, 0], [6.1, 0], [7.0, 1]]));
        // sin faldón (se recoge), y después vuelve a bajar y tapa el hueco
        var k = K.cl(1 - K.ph(t, 4.5, 5.2) + K.ph(t, 9.0, 10.2));
        s.fal.visible = k > 0.02; s.fal.scale.y = Math.max(0.02, k);
        s.bajo.rotation.x = 0; s.pernos.forEach(function (p) { p.position.z = 0.01; });
        var h = K.ph(t, 6.0, 6.6) * (1 - K.ph(t, 9.4, 10.2));
        hueco(s, cy, h);
        s.flecha.visible = h > 0.3 && t < 9; s.flecha.apuntar([0.12, 0.32, 0.55], [0.12, 0.1, -0.25]);
        s.chispas.emitir(t, [0, 0, 0], false); s.golpe.poner(t, [0, 0, 0], false);
        // persona en el pasillo: acerca el pie al borde (sin faldón entra al hueco; con faldón choca con la plancha)
        var p = s.pie; quieto(p); p.visible = K.entre(t, 6.4, 18);
        var pz = K.kf(t, [[6.4, 1.7], [7.6, 0.42], [7.9, 0.42], [8.5, 0.32], [9.0, 0.32], [9.6, 0.42], [10.6, 0.42], [11.0, 0.32], [12.4, 0.32], [12.8, 0.45]]);
        var px = K.kf(t, [[12.8, 0.12], [13.5, 0.85]]);
        p.position.set(px, 0, pz); p.rotation.y = K.kf(t, [[12.8, PI], [13.2, 1.5 * PI]]);
        if (K.entre(t, 6.4, 7.6) || K.entre(t, 12.8, 13.5)) p.caminar(t, 1);
        var pie1 = K.ph(t, 7.9, 8.5) * (1 - K.ph(t, 9.0, 9.6)), pie2 = K.ph(t, 11.0, 11.6) * (1 - K.ph(t, 12.1, 12.6));
        p.piernaD.rotation.x = -0.62 * pie1 - 0.44 * pie2;
        // la persona de la cabina baja al pasillo
        var q = s.pas; quieto(q); q.visible = t >= 6.0;
        var qz = K.kf(t, [[13.6, ZC + 0.1], [15.6, 0.75]]);
        q.position.set(-0.12, cy * (1 - K.ph(qz, -0.08, 0.22)), qz); q.rotation.y = 0;
        if (K.entre(t, 13.6, 15.6)) q.caminar(t, 1);
        // marcas de color y textos
        K.marcar(s.placas, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : K.entre(t, 10.2, 13.5) ? 'foco' : null);
        K.marcar(s.pernos, null);
        K.marcar(p.piernaD, pie1 > 0.5 ? 'mal' : null);
        if (t < 4.5) { K.rotulo('Faldón', [0.38, cy - 0.3, ZC + 0.78]); K.rotulo('Pisadera de la cabina', [-0.3, cy, ZC + 0.78], 'izq'); }
        else if (K.entre(t, 6.6, 9.4)) K.rotulo(pie1 > 0.5 ? 'El pie entra al hueco' : 'Hueco hacia el vacío', [0.36, cy * 0.5, 0.0]);
        else if (K.entre(t, 10.2, 13.5)) K.rotulo(pie2 > 0.5 ? 'El pie choca con el faldón' : 'Faldón', [0.38, cy * 0.4, -0.03]);
        K.tabla([['CABINA', cy > 0.05 ? (cy > 0.6 ? 'PARADA ALTA' : 'MÁS ARRIBA DEL PISO') : 'A NIVEL', cy > 0.05 ? 'ac' : 'ok'], ['FALDÓN', k < 0.5 ? 'NO HAY' : 'TAPA EL HUECO', k < 0.5 ? 'mal' : 'ok']]);
        if (h > 0.5 && t < 9.4) K.aviso(pie1 > 0.5 ? '¡Peligro! El pie se va al vacío' : 'Peligro: hueco abierto');
        else if (K.entre(t, 10.4, 13.5)) K.aviso('Hueco tapado', false);
        else if (t > 15.4) K.aviso('Bajó sin peligro', false);
      }
    },
    falla: {
      dur: 17,
      subt: [[0, 'Falla: un golpe dobló el faldón o se soltó un perno. La parte de abajo queda torcida.'],
        [5, 'Al pasar por cada piso, la plancha torcida choca con el borde: se oye un golpe o un raspón.'],
        [10.5, 'Arreglo: con el ascensor parado y asegurado, enderezar o cambiar la plancha y ajustar sus pernos.']],
      cam: [[0, [1.4, 0.62, 1.15], [0.1, 0.55, -0.05]], [4.6, [1.35, 0.55, 1.1], [0.1, 0.45, -0.05]], [5.8, [1.3, 0.38, 1.05], [0.05, 0.12, -0.05]], [10.3, [1.3, 0.38, 1.05], [0.05, 0.12, -0.05]],
        [11.3, [1.4, 0.62, 1.15], [0.1, 0.5, -0.05]], [17, [1.5, 0.66, 1.25], [0.1, 0.5, -0.05]]],
      anim: function (t, s, K) {
        var cy = K.kf(t, [[0, 0.95], [5.4, 0.95], [6.4, 0.78], [7.6, 0.45], [8.3, 0.25], [8.8, 0.25], [9.6, 0.55], [10.4, 0.95]]);
        s.c.puerta(0);
        s.fal.visible = true; s.fal.scale.y = 1; hueco(s, cy, 0); s.flecha.visible = false;
        s.pie.visible = false; s.pas.visible = false;
        // doblado hacia el pasillo: el quiebre sale ~3 cm más allá del borde del piso y choca al bajar
        var beta = 0.42 * (1 - K.ph(t, 11.4, 12.4));
        var rodY = cy - 0.018 - 0.6 - 0.15 * Math.cos(beta);
        var baja = K.entre(t, 5.4, 10.4), toca = baja && rodY < 0.012 && rodY > -2.4;
        s.bajo.rotation.x = -(toca ? Math.min(beta, 0.2) : beta);
        var golpe = baja && rodY < 0.02 && rodY > -0.12;
        s.c.g.position.set(golpe ? Math.sin(t * 90) * 0.006 : 0, cy, ZC);
        s.chispas.emitir(t, [0.12, 0.012, 0.01], golpe || (toca && rodY > -0.6 && K.parpadeo(t, 4)), 0.14);
        s.golpe.poner(t, [0.15, 0.03, 0.03], golpe || (toca && rodY > -0.3), 0.2);
        var suelto = 1 - K.ph(t, 11.8, 12.6);
        s.pernos.forEach(function (p, i) { p.position.z = i === 2 ? 0.01 + 0.03 * suelto : 0.01; });
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.placas, t < 10.5 ? (golpe ? 'mal' : t < 5 ? mal : null) : K.entre(t, 11.4, 15) ? 'foco' : null);
        K.marcar(s.pernos[2], t < 5 ? mal : K.entre(t, 11.8, 15) ? 'foco' : null);
        K.marcar([s.pernos[0], s.pernos[1]], null);
        var rodilla = enMundo(K, s.bajo);
        if (t < 5) { K.rotulo('Faldón doblado', [0.38, rodilla[1] - 0.08, rodilla[2] + 0.04]); K.rotulo('Perno flojo', enMundo(K, s.pernos[2]), 'izq'); }
        else if (t < 10.5) { if (rodY < 0.3) K.rotulo('Borde del piso', [0.3, 0.012, 0.03]); }
        else if (t > 11.4) K.rotulo(beta < 0.05 ? 'Faldón derecho' : 'Enderezando…', [0.38, rodilla[1] - 0.06, rodilla[2]]);
        K.tabla([['FALDÓN', beta > 0.05 ? 'DOBLADO' : 'DERECHO', beta > 0.05 ? 'mal' : 'ok'], ['PERNO', suelto > 0.5 ? 'FLOJO' : 'AJUSTADO', suelto > 0.5 ? 'mal' : 'ok']]);
        if (golpe || (toca && rodY > -0.6)) K.aviso('¡Golpe y raspón al pasar por el piso!');
        else if (t > 12.8) K.aviso('Faldón derecho y firme', false);
      }
    }
  });

  // =====================================================================================
  // 5) Luz de emergencia y alarma (batería y sirena sobre el techo de la cabina)
  // =====================================================================================
  var RT = 2.24, REP = RT + 0.9;   // techo de la cabina y repisa donde van la batería y la sirena
  function bateria(K, s) {
    var M = K.M, g = K.add(new K.T.Group());
    var cuerpo = K.caja(0.3, 0.14, 0.16, M.negro, 0, 0.07, 0); g.add(cuerpo);
    g.add(K.caja(0.302, 0.025, 0.162, M.verde, 0, 0.125, 0), K.cil(0.013, 0.02, M.rojo, -0.1, 0.15, 0.03, null, 10), K.cil(0.013, 0.02, M.negro, 0.1, 0.15, 0.03, null, 10));
    var barras = [0, 1, 2].map(function (i) { var b = K.caja(0.05, 0.03, 0.004, s.verde, -0.08 + i * 0.06, 0.065, 0.082); g.add(b); return b; });
    var led = K.esfera(0.011, s.verde, 0.11, 0.065, 0.082); g.add(led);
    return { g: g, cuerpo: cuerpo, barras: barras, led: led };
  }
  function cargaBateria(s, b, nivel, ledMat) { b.barras.forEach(function (o, i) { o.material = i < nivel ? (nivel === 1 ? s.rojo : s.verde) : s.oscuro; }); b.led.material = ledMat; }
  // luces de la cabina: normales, apagón (todo oscuro) y luz de emergencia
  function luzCabina(s, corte, emerg) {
    var f = corte ? 0.1 : 1;
    s.luces.forEach(function (l) { l[0].intensity = l[1] * f; });
    s.c.leds.forEach(function (l) { l.material = corte ? s.apag : s.luz; });
    s.lamp.material = emerg > 0.5 ? s.luzE : s.apag;
    s.pl.intensity = 0.9 * emerg;
    s.ledCarga.material = corte ? s.oscuro : s.verde;
  }
  // puntitos de corriente que van de la batería a la luz
  function pulsos(s, t, on) { s.pulsos.forEach(function (p, i) { p.visible = on; if (on) p.position.copy(s.camino.getPoint((t * 0.5 + i / s.pulsos.length) % 1)); }); }

  V3.escena('emergencia', ['emergencia'], {
    fov: 36, poster: 7.5,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      s.luces = []; K.sc.children.forEach(function (o) { if (o.isLight) s.luces.push([o, o.intensity]); });
      K.add(K.caja(3.4, 7, 0.05, M.muro, 0, 1.5, -1.05)); K.add(K.caja(0.05, 7, 2.1, M.muro, -1.0, 1.5, 0));
      s.c = armarCabina(K, s, { der: 'vidrio' });
      // la luz de emergencia, en el techo entre las dos luces normales, con su lucecita de carga
      s.lamp = K.add(K.caja(0.24, 0.024, 0.09, s.apag, 0, 2.187, 0), s.c.techo);
      s.ledCarga = K.add(K.esfera(0.009, s.verde, 0.14, 2.19, 0), s.c.techo);
      s.pl = new T.PointLight(0xffe2a8, 0, 2.3, 2); s.pl.position.set(0, 2.05, 0.05); K.add(s.pl);
      // baranda del fondo del techo y una repisa con la batería y la sirena
      [-0.6, 0, 0.6].forEach(function (x) { K.add(K.caja(0.04, 1.1, 0.04, M.amarillo, x, RT + 0.55, -0.64)); });
      K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, RT + 1.1, -0.64)); K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, RT + 0.55, -0.64));
      K.add(K.caja(1.1, 0.02, 0.22, M.hierro, 0, REP - 0.01, -0.53));
      s.bat = bateria(K, s); s.batN = bateria(K, s);
      s.sirena = K.add(K.grupo([K.cil(0.05, 0.04, M.hierro, 0, 0.02, 0), K.cil(0.075, 0.07, M.rojo, 0, 0.075, 0, null, 24), K.esfera(0.022, M.cromo, 0, 0.12, 0)], 0.3, REP, -0.5));
      var pts = [[-0.12, REP + 0.15, -0.5], [-0.04, REP + 0.08, -0.6], [-0.04, RT + 0.5, -0.61], [-0.03, RT + 0.03, -0.52], [0, RT + 0.02, -0.2], [0, RT + 0.01, 0]];
      K.add(K.tubo(pts, 0.008, M.negro));
      K.add(K.tubo([[-0.12, REP + 0.15, -0.46], [0.05, REP + 0.12, -0.44], [0.25, REP + 0.05, -0.47]], 0.007, M.negro));
      s.camino = new T.CatmullRomCurve3(pts.map(function (p) { return K.v(p[0], p[1], p[2]); }));
      s.pulsos = []; for (var i = 0; i < 5; i++) s.pulsos.push(K.add(K.esfera(0.02, s.amar)));
      s.pers = gente(K, 1.65, 0x6a7f94); s.pers.position.set(-0.14, 0, -0.3); s.pers.rotation.y = -PI / 2;
      s.campana = ondas(K, 3, 0xffc62b);
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true)); s.tec.position.set(-0.36, RT, -0.06); s.tec.rotation.y = PI;
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'Dentro de la cabina hay una luz chica de emergencia y un botón de alarma amarillo.'],
        [4.4, 'Si se va la luz, todo queda oscuro… y enseguida se prende sola la luz de emergencia.'],
        [9, 'Esa luz funciona con su propia batería, que está encima de la cabina.'],
        [13.5, 'Si alguien se queda encerrado, aprieta la alarma: suena la sirena y lo vienen a rescatar.']],
      cam: [[0, [1.9, 1.72, 0.85], [-0.3, 1.66, 0.0]], [4.2, [1.85, 1.7, 0.82], [-0.3, 1.66, 0.0]], [8.6, [1.85, 1.7, 0.82], [-0.3, 1.66, 0.0]],
        [10.0, [1.45, 3.9, 1.75], [-0.05, 2.85, -0.3]], [13.0, [1.4, 3.85, 1.7], [-0.05, 2.85, -0.3]], [14.4, [3.6, 2.9, 2.2], [-0.15, 2.2, -0.15]], [18, [3.7, 2.95, 2.3], [-0.15, 2.2, -0.15]]],
      anim: function (t, s, K) {
        var corte = t >= 5.0, emerg = K.ph(t, 6.0, 6.3);
        luzCabina(s, corte, emerg);
        s.bat.g.visible = true; s.bat.g.position.set(-0.25, REP, -0.5); s.batN.g.visible = false; s.tec.visible = false;
        cargaBateria(s, s.bat, 3, corte ? (K.parpadeo(t, 1) ? s.amar : s.oscuro) : s.verde);
        pulsos(s, t, emerg > 0.5 && K.entre(t, 8.8, 13.6));
        var p = s.pers; quieto(p);
        var aprieta = K.ph(t, 13.8, 14.3) * (1 - K.ph(t, 16.2, 16.7));
        apuntar(K, p, p.brazoD, enMundo(K, s.c.alarma), aprieta);
        s.c.alarma.position.x = aprieta > 0.9 ? 0.005 : 0.01;
        var suena = t >= 14.3;
        s.campana.poner(t, [0.3, REP + 0.16, -0.5], suena, 0.32, 'y');
        K.marcar(s.bat.cuerpo, K.entre(t, 9.6, 13.5) ? 'foco' : null);
        K.marcar(s.sirena, suena ? 'foco' : null);
        K.marcar(s.c.alarma, t < 4.4 || K.entre(t, 13.5, 16.7) ? 'foco' : null);
        if (t < 4.4) { K.rotulo('Luz de emergencia', [0, 2.18, 0]); K.rotulo('Botón de alarma', enMundo(K, s.c.alarma), 'izq'); }
        else if (t < 9) { if (t > 6.2) K.rotulo('Luz de emergencia', [0, 2.18, 0]); }
        else if (t < 13.5) { K.rotulo('Batería', [-0.25, REP + 0.16, -0.5], 'izq'); K.rotulo('Cable a la luz', [-0.03, RT + 0.35, -0.6]); }
        else { K.rotulo('Botón de alarma', enMundo(K, s.c.alarma), 'izq'); if (suena) K.rotulo('Sirena', [0.3, REP + 0.15, -0.5]); }
        K.tabla([['LUZ NORMAL', corte ? 'APAGADA' : 'PRENDIDA', corte ? 'mal' : 'ok'], ['LUZ EMERGENCIA', emerg > 0.5 ? 'PRENDIDA' : 'APAGADA', emerg > 0.5 ? 'ok' : ''],
          ['ALARMA', suena ? 'SONANDO' : 'LISTA', suena ? 'ac' : '']]);
        if (corte && t < 6.2) K.aviso('Se fue la luz');
        else if (suena && t > 15) K.aviso('Suena la alarma: vienen a ayudar', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: la batería de emergencia está gastada. Estas baterías duran pocos años.'],
        [4.5, 'Se va la luz: la cabina queda totalmente oscura y la alarma no suena.'],
        [10.2, 'Arreglo: el técnico cambia la batería gastada por una nueva.'],
        [14.4, 'En cada mantenimiento la prueba: corta la luz y revisa que prenda y que suene.']],
      cam: [[0, [1.45, 3.9, 1.75], [-0.1, 2.9, -0.35]], [4.2, [1.4, 3.88, 1.7], [-0.1, 2.9, -0.35]], [5.4, [1.9, 1.72, 0.85], [-0.3, 1.66, 0.0]], [9.8, [1.85, 1.7, 0.82], [-0.3, 1.66, 0.0]],
        [11.0, [1.95, 3.8, 0.5], [-0.3, 3.0, -0.35]], [14.0, [1.92, 3.8, 0.48], [-0.3, 3.0, -0.35]], [15.2, [3.6, 2.9, 2.2], [-0.15, 2.2, -0.15]], [18.5, [3.7, 2.95, 2.3], [-0.15, 2.2, -0.15]]],
      anim: function (t, s, K) {
        var corte = K.entre(t, 5.0, 10.2) || t >= 15.2, nueva = t >= 12.0;
        var emerg = nueva ? K.ph(t, 15.7, 16.0) : 0;
        luzCabina(s, corte, emerg);
        if (!nueva && corte) s.lamp.material = K.parpadeo(t, 2) ? s.rojo : s.apag;   // la luz de emergencia no prende
        // cambio de batería: la vieja se saca y se deja a un lado, la nueva se baja a la repisa
        var saca = K.ph(t, 10.8, 11.9), pone = K.ph(t, 12.2, 13.2);
        s.bat.g.visible = true;
        s.bat.g.position.set(K.mix(-0.25, -0.52, saca), REP + 0.25 * Math.sin(saca * PI) - (REP - RT) * K.ph(t, 11.4, 11.9), -0.5 + 0.06 * saca);
        s.batN.g.visible = nueva; s.batN.g.position.set(-0.25, REP + 1.2 * (1 - pone), -0.5);
        cargaBateria(s, s.bat, 1, K.parpadeo(t, 2) ? s.rojo : s.oscuro);
        cargaBateria(s, s.batN, 3, corte ? s.amar : s.verde);
        pulsos(s, t, nueva && emerg > 0.5);
        var tec = s.tec; quieto(tec); tec.visible = K.entre(t, 10.2, 14.6);
        var mano = t < 12.1 ? enMundo(K, s.bat.cuerpo) : enMundo(K, s.batN.cuerpo);
        var k = Math.max(K.ph(t, 10.4, 10.8) * (1 - K.ph(t, 11.8, 12.1)), K.ph(t, 12.1, 12.4) * (1 - K.ph(t, 13.3, 13.7)));
        apuntar(K, tec, tec.brazoD, mano, k); apuntar(K, tec, tec.brazoI, mano, k);
        // la persona aprieta la alarma: sin batería no suena; con la nueva, sí
        var p = s.pers; quieto(p);
        var aprieta = Math.max(K.ph(t, 6.8, 7.2) * (1 - K.ph(t, 8.8, 9.2)), K.ph(t, 16.0, 16.4) * (1 - K.ph(t, 17.6, 18.0)));
        apuntar(K, p, p.brazoD, enMundo(K, s.c.alarma), aprieta);
        s.c.alarma.position.x = aprieta > 0.9 ? 0.005 : 0.01;
        var suena = nueva && t >= 16.4;
        s.campana.poner(t, [0.3, REP + 0.16, -0.5], suena, 0.32, 'y');
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.bat.cuerpo, t < 5 || K.entre(t, 10.2, 14.4) ? mal : null);
        K.marcar(s.batN.cuerpo, K.entre(t, 12.2, 14.4) ? 'foco' : null);
        K.marcar(s.sirena, suena ? 'foco' : null);
        K.marcar(s.c.alarma, K.entre(t, 7.0, 10.2) ? mal : null);
        if (t < 4.5) K.rotulo('Batería gastada', [-0.25, REP + 0.16, -0.5], 'izq');
        else if (t < 10.2) { if (t > 5.4) K.rotulo('La luz de emergencia no prende', [0, 2.18, 0]); if (t > 7.2) K.rotulo('La alarma no suena', enMundo(K, s.c.alarma), 'izq'); }
        else if (t < 14.4) { K.rotulo('Batería gastada', enMundo(K, s.bat.cuerpo), 'izq'); if (t > 12.6) K.rotulo('Batería nueva', [-0.25, REP + 0.16 + 1.2 * (1 - pone), -0.5]); }
        else { if (suena) K.rotulo('Sirena', [0.3, REP + 0.15, -0.5]); if (aprieta > 0.5) K.rotulo('Botón de alarma', enMundo(K, s.c.alarma), 'izq'); }
        K.tabla([['BATERÍA', nueva ? 'NUEVA' : 'GASTADA', nueva ? 'ok' : 'mal'], ['LUZ EMERGENCIA', emerg > 0.5 ? 'PRENDIDA' : corte && !nueva ? 'NO PRENDE' : 'APAGADA', emerg > 0.5 ? 'ok' : corte && !nueva ? 'mal' : ''],
          ['ALARMA', suena ? 'SUENA' : corte && !nueva && t > 7.2 ? 'NO SUENA' : 'LISTA', suena ? 'ok' : corte && !nueva && t > 7.2 ? 'mal' : '']]);
        if (K.entre(t, 5.0, 10.2)) K.aviso('A oscuras y sin alarma');
        else if (corte && t < 15.7) K.aviso('Prueba: se corta la luz', false);
        else if (suena) K.aviso('Batería nueva: todo funciona', false);
      }
    }
  });
})();
