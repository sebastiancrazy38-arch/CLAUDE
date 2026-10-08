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
    que: 'Es la caja donde viajan las personas: piso, paredes, techo, puerta, luces, pasamanos y botonera.',
    sirve: 'Lleva a la gente protegida de un piso a otro. Va sentada en un marco de acero, sobre tacos de goma.',
    falla: 'Con el tiempo se aflojan tornillos y los paneles zumban; también parpadean las luces o se levanta el piso.',
    arreglo: 'Con el ascensor detenido, se ajustan los tornillos, se cambia la fuente de la luz y se pega bien el piso.'
  };
  S.pesacargas = {
    que: 'Son sensores de peso debajo del piso de la cabina, unidos a una cajita que cuenta los kilos.',
    sirve: 'Si entra más gente de la permitida, suena un zumbador y la puerta no cierra hasta que alguien baje.',
    falla: 'Si se descalibra, marca «sobrecarga» con solo dos personas y el ascensor no sale; o no avisa aunque vaya lleno.',
    arreglo: 'El técnico lo calibra: lo pone en cero con la cabina vacía y lo prueba con pesas de peso conocido.'
  };
  S.caja_inspeccion = {
    que: 'Es una caja amarilla en el techo de la cabina, con un botón rojo de parada, una llave y botones de subir y bajar.',
    sirve: 'Con ella el técnico maneja el ascensor desde el techo, despacio y solo mientras aprieta los botones.',
    falla: 'Si queda en «inspección» o con el botón rojo apretado, el ascensor no atiende a nadie y parece malogrado.',
    arreglo: 'Al terminar, llave en «normal» y botón rojo suelto. Si un cable está flojo, se ajusta con la corriente cortada.'
  };
  S.faldon = {
    que: 'Es una plancha de metal lisa que cuelga debajo de la entrada de la cabina, como una falda.',
    sirve: 'Si la cabina para más arriba del piso, tapa el hueco de abajo para que nadie meta el pie ni caiga al vacío.',
    falla: 'Si un golpe la dobla o se le suelta un perno, choca con el borde de cada piso y se oye un golpe al pasar.',
    arreglo: 'Con el ascensor detenido, se endereza o se cambia la plancha y se ajustan todos sus pernos.'
  };
  S.emergencia = {
    que: 'Es una luz pequeña y un botón de alarma con campana, que trabajan con su propia batería.',
    sirve: 'Si se va la luz, la cabina no queda a oscuras y la persona encerrada puede pedir ayuda.',
    falla: 'Si la batería está gastada, en un apagón la cabina queda totalmente oscura y la alarma no suena.',
    arreglo: 'El técnico prueba la batería en cada mantenimiento y la cambia cuando ya no carga.'
  };

  // ---------- utilidades ----------
  function mats(K) {
    return { verde: K.matB(0x3ccf7f), rojo: K.matB(0xff3b30), amar: K.matB(0xffc62b), luz: K.matB(0xfff6dc), luzE: K.matB(0xffe7a8),
      apag: K.mat(0x9aa2a9, { roughness: 0.35, metalness: 0.2 }), oscuro: K.mat(0x3a4148, { roughness: 0.6 }) };
  }
  // ondas de sonido: anillos que salen de un punto. eje 'x' (en una pared), 'y' (horizontales) o 'z'
  function ondas(K, n, color) {
    var g = new K.T.Group(), an = [];
    for (var i = 0; i < n; i++) { var m = K.matB(color || 0xffc62b, { transparent: true, opacity: 0.8, depthWrite: false }); var r = K.toro(1, 0.07, m, 0, 0, 0); g.add(r); an.push(r); }
    K.add(g);
    g.poner = function (t, pos, on, tam, eje) {
      g.visible = !!on; if (!on) return;
      g.position.set(pos[0], pos[1], pos[2]); g.rotation.set(eje === 'y' ? PI / 2 : 0, eje === 'x' ? PI / 2 : 0, 0);
      an.forEach(function (r, i) { var k = (t * 1.5 + i / n) % 1; r.scale.setScalar((tam || 0.15) * (0.25 + k)); r.material.opacity = 0.9 * (1 - k); });
    };
    return g;
  }
  // persona un poco más delgada (para que entren varias en la cabina)
  function gente(K, alto, color, casco) { var p = K.add(K.persona(alto, color, casco)); p.scale.x = 0.78; return p; }
  // gira un brazo para que la mano vaya hacia un punto del mundo; k = 0 brazo colgando, 1 brazo estirado
  function apuntar(K, p, brazo, hacia, k) {
    p.updateMatrixWorld(true);
    var v = K.v(hacia[0], hacia[1], hacia[2]); p.worldToLocal(v); v.sub(brazo.position).normalize();
    var g = Math.asin(K.cl(v.x * 0.5 + 0.5) * 2 - 1), a = Math.atan2(-v.z, -v.y);
    brazo.rotation.set(a * k, 0, g * k);
  }
  function quieto(p) { p.caminar(0, 0); p.brazoI.rotation.set(0, 0, 0); p.brazoD.rotation.set(0, 0, 0); }
  function enMundo(o) { o.updateWorldMatrix(true, false); var v = new THREE.Vector3(); v.setFromMatrixPosition(o.matrixWorld); return [v.x, v.y, v.z]; }

  // ---------- la cabina (piso arriba en y = 0, puerta hacia +z, pared derecha de vidrio para ver adentro) ----------
  function armarCabina(K, s) {
    var M = K.M, T = K.T, c = {}, g = K.add(new T.Group()); c.g = g;
    var vidrio = K.mat(0xcfd8de, { transparent: true, opacity: 0.13, depthWrite: false, roughness: 0.2 });
    var espejo = K.mat(0xaebdc8, { metalness: 0.85, roughness: 0.12 });
    var vinil = K.mat(0x8c7d6c, { roughness: 0.92, metalness: 0 }), vinil2 = K.mat(0x857767, { roughness: 0.92, metalness: 0 });
    // piso: plataforma de acero, acabado, una baldosa (para la falla) y la pisadera de la puerta
    c.plataforma = K.add(K.grupo([K.caja(1.28, 0.1, 1.38, M.aceroOsc, 0, -0.05, 0), K.caja(1.2, 0.012, 1.3, vinil, 0, 0.006, 0), K.caja(0.76, 0.024, 0.1, M.acero, 0, 0, 0.72)]), g);
    c.baldosa = K.add(K.grupo([K.caja(0.4, 0.01, 0.4, vinil2, 0, 0.005, 0.2)], -0.4, 0.012, 0.25), g);
    // pared del fondo con espejo y pasamanos
    c.fondo = K.add(K.grupo([K.caja(1.24, 2.2, 0.04, M.panel, 0, 1.1, -0.67), K.caja(0.84, 0.95, 0.01, espejo, 0, 1.5, -0.645)]), g);
    c.pasamanos = K.grupo([K.cil(0.018, 1.0, M.cromo, 0, 0.92, -0.585, 'x', 12), K.cil(0.009, 0.07, M.cromo, -0.45, 0.92, -0.62, 'z', 8), K.cil(0.009, 0.07, M.cromo, 0.45, 0.92, -0.62, 'z', 8)]);
    c.fondo.add(c.pasamanos);
    // pared izquierda: tres paneles atornillados, pasamanos y la botonera
    c.izq = K.add(new T.Group(), g); c.paneles = []; c.panelMalla = []; c.tornillos = [];
    [-0.4333, 0, 0.4333].forEach(function (z) {
      var malla = K.caja(0.04, 2.2, 0.425, M.panel, 0, 0, 0), p = K.grupo([malla], -0.62, 1.1, z);
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(function (q) { var tn = K.cil(0.012, 0.012, M.aceroOsc, 0.024, q[0] * 1.03, q[1] * 0.17, 'x', 10); p.add(tn); c.tornillos.push(tn); });
      c.izq.add(p); c.paneles.push(p); c.panelMalla.push(malla);
    });
    c.izq.add(K.caja(0.041, 2.2, 0.008, M.aceroOsc, -0.62, 1.1, -0.2167), K.caja(0.041, 2.2, 0.008, M.aceroOsc, -0.62, 1.1, 0.2167));
    c.izq.add(K.cil(0.018, 0.56, M.cromo, -0.555, 0.92, -0.32, 'z', 12));
    c.cop = K.add(K.grupo([K.caja(0.012, 0.74, 0.2, M.inox, 0, 0, 0)], -0.594, 1.25, 0.42), c.izq);
    c.pantalla = K.cartel('1', 0.1, 0.06, '#10161b', '#ff5a3c'); c.pantalla.rotation.y = PI / 2; c.pantalla.position.set(0.007, 0.29, 0); c.cop.add(c.pantalla);
    c.rejilla = K.caja(0.004, 0.05, 0.1, M.negro, 0.007, 0.2, 0); c.cop.add(c.rejilla);
    c.botones = [];
    for (var i = 0; i < 4; i++) { var b = K.cil(0.016, 0.01, M.acero, 0.009, 0.1 - i * 0.075, 0, 'x', 16); c.cop.add(b); c.botones.push(b); }
    c.alarma = K.cil(0.022, 0.012, M.amarillo, 0.009, -0.24, 0, 'x', 16); c.cop.add(c.alarma);
    // pared derecha de vidrio (para ver adentro), con su marco
    c.der = K.add(K.grupo([K.caja(0.01, 2.2, 1.3, vidrio, 0, 1.1, 0), K.caja(0.03, 0.03, 1.34, M.aceroOsc, 0, 2.2, 0), K.caja(0.03, 0.03, 1.34, M.aceroOsc, 0, 0.015, 0), K.caja(0.03, 2.2, 0.03, M.aceroOsc, 0, 1.1, -0.67)], 0.62, 0, 0), g);
    // frente con la puerta de dos hojas
    c.frente = K.add(K.grupo([K.caja(0.29, 2.2, 0.04, M.panel, -0.495, 1.1, 0.67), K.caja(0.29, 2.2, 0.04, M.panel, 0.495, 1.1, 0.67), K.caja(0.7, 0.2, 0.04, M.panel, 0, 2.1, 0.67)]), g);
    c.hojas = [-1, 1].map(function (l) { return K.add(K.caja(0.36, 2.0, 0.03, M.inox, l * 0.18, 1.01, 0.725), c.frente); });
    c.puerta = function (a) { c.hojas[0].position.x = -(0.18 + 0.35 * a); c.hojas[1].position.x = 0.18 + 0.35 * a; };
    // techo con sus luces y el operador de puertas encima
    c.techo = K.add(K.grupo([K.caja(1.3, 0.05, 1.4, M.aceroOsc, 0, 2.225, 0), K.caja(1.0, 0.16, 0.16, M.gris, 0, 2.33, 0.56)]), g);
    c.leds = [-0.3, 0.3].map(function (z) { return K.add(K.caja(0.7, 0.012, 0.36, s.apag, 0, 2.192, z), c.techo); });
    c.puerta(0);
    return c;
  }
  // marco de acero (bastidor) con sus tacos de goma bajo el piso
  function armarBastidor(K, padre) {
    var M = K.M, b = K.add(new K.T.Group(), padre); b.piezas = [];
    [K.caja(0.08, 3.0, 0.12, M.hierro, -0.71, 1.17, 0), K.caja(0.08, 3.0, 0.12, M.hierro, 0.71, 1.17, 0), K.caja(1.52, 0.12, 0.16, M.hierro, 0, 2.6, 0),
      K.caja(1.52, 0.12, 0.16, M.hierro, 0, -0.27, 0), K.caja(0.1, 0.06, 1.34, M.hierro, -0.5, -0.18, 0), K.caja(0.1, 0.06, 1.34, M.hierro, 0.5, -0.18, 0)].forEach(function (o) { b.add(o); b.piezas.push(o); });
    [-1, 1].forEach(function (l) { b.add(K.caja(0.07, 0.12, 0.1, M.negro, l * 0.78, 2.5, 0), K.caja(0.07, 0.12, 0.1, M.negro, l * 0.78, -0.2, 0)); });
    b.tacos = [[-0.5, -0.52], [0.5, -0.52], [-0.5, 0.52], [0.5, 0.52]].map(function (p) { return K.add(K.cil(0.045, 0.05, M.goma, p[0], -0.125, p[1], null, 16), b); });
    return b;
  }
  // guías en T a los costados y marcas del hueco que se mueven cuando la cabina viaja
  function rieles(K, y0, largo, z) {
    var g = K.add(new K.T.Group());
    [-1, 1].forEach(function (l) { var r = K.riel(largo, K.M.acero); r.position.set(l * 0.86, y0, z || 0); r.rotation.y = -l * PI / 2; g.add(r); });
    return g;
  }
  function marcasHueco(K, n, zMuro) {
    var g = K.add(new K.T.Group());
    for (var i = 0; i < n; i++) { var y = -2.7 + i * 0.9; g.add(K.caja(0.14, 0.05, 0.06, K.M.aceroOsc, -0.93, y, 0), K.caja(0.14, 0.05, 0.06, K.M.aceroOsc, 0.93, y, 0), K.caja(0.36, 0.04, 0.02, K.M.aceroOsc, 0, y + 0.45, zMuro + 0.035)); }
    return g;
  }

  // =====================================================================================
  // 1) La cabina: se arma como una caja, va en su marco, luces y botonera, y lleva a la gente
  // =====================================================================================
  V3.escena('cabina', ['cabina'], {
    fov: 36, poster: 11,
    construir: function (K) {
      var M = K.M, s = mats(K);
      K.add(K.caja(3.4, 7, 0.05, M.muro, 0, 1.2, -1.05));
      s.marcas = marcasHueco(K, 10, -1.05);
      s.rieles = rieles(K, -3, 9);
      s.c = armarCabina(K, s);
      s.b = armarBastidor(K, null);
      s.hall = K.add(K.caja(3.4, 0.3, 2.6, M.hall, 0, -0.15, 2.08));
      s.pers = gente(K, 1.68, 0xb5735a);
      s.zumb = ondas(K, 3, 0xff6a50);
      s.ultimo = '';
      return s;
    },
    funciona: {
      dur: 19,
      subt: [[0, 'La cabina es la caja donde viajan las personas. Se arma como una caja: piso, paredes, techo y puerta.'],
        [4.5, 'Va sentada dentro de un marco de acero, sobre tacos de goma que le quitan la vibración.'],
        [8.5, 'Por dentro tiene luces en el techo, pasamanos, espejo y la botonera para marcar el piso.'],
        [13, 'La persona entra, marca su piso, la puerta se cierra y la cabina la lleva protegida.']],
      cam: [[0, [3.1, 2.6, 3.4], [0, 1.0, 0]], [4.0, [2.9, 2.4, 3.2], [0, 1.1, 0]], [5.6, [2.7, 1.6, 2.7], [0.1, 0.8, 0]], [7.0, [1.75, 0.16, 0.95], [0.45, -0.12, 0]],
        [8.4, [1.7, 0.18, 0.9], [0.45, -0.12, 0]], [9.8, [1.9, 1.5, 1.9], [-0.25, 1.3, -0.1]], [12.6, [1.85, 1.45, 1.85], [-0.2, 1.25, 0]], [14, [2.3, 1.55, 2.7], [-0.1, 1.0, 0.3]], [19, [2.5, 1.6, 2.9], [0, 1.0, 0.2]]],
      anim: function (t, s, K) {
        var c = s.c;
        // se arma la caja: cada parte llega a su sitio
        var k = [K.ph(t, 0.4, 1.6), K.ph(t, 1.0, 2.2), K.ph(t, 1.6, 2.8), K.ph(t, 2.2, 3.4), K.ph(t, 2.8, 4.0)];
        c.fondo.position.z = -0.9 * (1 - k[0]); c.izq.position.x = -0.9 * (1 - k[1]); c.der.position.x = 0.9 * (1 - k[2]);
        c.frente.position.z = 0.9 * (1 - k[3]); c.techo.position.y = 0.9 * (1 - k[4]);
        var listo = t >= 4.2;
        s.b.visible = listo; s.rieles.visible = listo; s.marcas.visible = listo;
        // viaje: la cabina sube (el hueco y el piso del pasillo bajan)
        var sub = K.integ(function (x) { return K.ph(x, 17.2, 18.2); }, t);
        s.marcas.position.y = -(sub % 0.9); s.hall.position.y = -0.15 - sub; s.hall.visible = listo;
        // luces y puerta
        var luces = t >= 8.8;
        c.leds.forEach(function (l) { l.material = luces ? s.luz : s.apag; });
        c.puerta(K.kf(t, [[0, 0], [11.6, 0], [12.6, 1], [16.1, 1], [17.1, 0]]));
        // la persona entra, marca el piso 2 y se voltea hacia la puerta
        var p = s.pers; p.visible = t >= 12.6;
        p.position.set(K.kf(t, [[12.6, 0], [13.6, 0], [14.3, -0.12]]), 0, K.kf(t, [[12.6, 2.7], [13.6, 0.85], [14.3, 0.22]]));
        p.rotation.y = K.kf(t, [[14.2, PI], [14.7, 1.5 * PI], [16.0, 1.5 * PI], [16.5, 2 * PI]]);
        if (K.entre(t, 12.6, 14.3)) p.caminar(t, 1); else quieto(p);
        var marca = K.ph(t, 14.7, 15.1) * (1 - K.ph(t, 15.5, 15.9));
        if (marca > 0) apuntar(K, p, p.brazoD, enMundo(c.botones[1]), marca);
        c.botones.forEach(function (b, i) { b.material = i === 1 && t >= 15.2 && t < 18.6 ? s.amar : K.M.acero; });
        var piso = sub > 1.2 ? '2' : '1';
        if (s.ultimo !== piso) { c.pantalla.escribir(piso); s.ultimo = piso; }
        // marcas de color
        K.marcar(s.b.piezas, K.entre(t, 4.5, 6.6) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.b.tacos, K.entre(t, 6.6, 8.6) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(c.pasamanos, K.entre(t, 10.2, 13) ? 'foco' : null);
        K.marcar(c.panelMalla, null); K.marcar(c.baldosa, null);
        s.zumb.poner(t, [0, 0, 0], false);
        if (t < 4.5) { K.rotulo('Techo', [0.3, 2.3 + c.techo.position.y, -0.2]); K.rotulo('Pared', [-0.62 + c.izq.position.x, 1.6, -0.4], 'izq'); K.rotulo('Piso', [0.3, 0.02, 0.4]); }
        else if (t < 6.6) K.rotulo('Marco de acero (bastidor)', [0.71, 1.6, 0.06]);
        else if (t < 8.6) { K.rotulo('Taco de goma', [0.5, -0.125, 0.55]); K.rotulo('Taco de goma', [0.5, -0.125, -0.49], 'izq'); }
        else if (t < 13) { K.rotulo('Luces', [0.1, 2.19, 0.3]); K.rotulo('Pasamanos', [-0.2, 0.92, -0.585], 'izq'); K.rotulo('Botonera', [-0.59, 1.35, 0.42], 'izq'); }
        else K.tabla([['PISO MARCADO', t >= 15.2 ? '2' : '—', t >= 15.2 ? 'ac' : ''], ['PUERTA', t < 16.1 ? 'ABIERTA' : t < 17.1 ? 'CERRANDO' : 'CERRADA', ''], ['CABINA', sub > 0.02 ? 'SUBIENDO' : 'QUIETA', sub > 0.02 ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: con el tiempo se aflojan los tornillos. Un panel vibra y zumba cuando la cabina viaja.'],
        [5, 'Falla 2: una luz del techo parpadea o se apaga. Casi siempre es su fuente, la cajita que le da corriente.'],
        [9.5, 'Falla 3: el piso se despega y una esquina se levanta. Suena hueco y la gente se puede tropezar.'],
        [14, 'Arreglo: con el ascensor detenido, ajustar los tornillos, cambiar la fuente de la luz y volver a pegar el piso.']],
      cam: [[0, [1.9, 1.5, 1.9], [-0.45, 1.15, -0.05]], [4.4, [1.8, 1.45, 1.75], [-0.45, 1.15, 0]], [5.6, [1.25, 1.35, 0.9], [-0.05, 2.05, -0.05]], [9.2, [1.2, 1.3, 0.85], [-0.05, 2.05, 0]],
        [10.4, [1.35, 1.05, 0.62], [-0.38, 0.05, 0.42]], [13.6, [1.3, 1.0, 0.6], [-0.38, 0.05, 0.42]], [15, [2.3, 1.6, 2.5], [-0.1, 1.0, 0]], [19, [2.4, 1.7, 2.6], [0, 1.0, 0]]],
      anim: function (t, s, K) {
        var c = s.c;
        c.fondo.position.set(0, 0, 0); c.izq.position.set(0, 0, 0); c.der.position.set(0, 0, 0); c.frente.position.set(0, 0, 0); c.techo.position.set(0, 0, 0);
        s.b.visible = true; s.rieles.visible = true; s.marcas.visible = true; s.hall.visible = false; s.pers.visible = false;
        c.puerta(0);
        if (s.ultimo !== '1') { c.pantalla.escribir('1'); s.ultimo = '1'; }
        c.botones.forEach(function (b) { b.material = K.M.acero; });
        var sub = K.integ(function (x) { return 1 - K.ph(x, 4.4, 5.2); }, t);
        s.marcas.position.y = -(sub % 0.9);
        // falla 1: panel flojo que vibra
        var vib = t < 5 ? 1 : 0, p = c.paneles[1];
        p.position.x = -0.62 + vib * Math.sin(t * 55) * 0.006; p.rotation.y = vib * Math.sin(t * 47) * 0.02;
        var flojo = c.tornillos[5], suelto = t < 14.6 ? 1 : 1 - K.ph(t, 14.6, 15.4);
        flojo.position.x = 0.024 + 0.022 * suelto; flojo.rotation.x = suelto * t * 3;
        s.zumb.poner(t, [-0.58, 1.3, 0], vib > 0, 0.22, 'x');
        // falla 2: una luz parpadea
        var parpadea = K.entre(t, 5, 14.4) && K.ruido(Math.floor(t * 9)) < 0.55;
        c.leds[0].material = s.luz; c.leds[1].material = parpadea ? s.apag : s.luz;
        // falla 3: una baldosa se levanta
        c.baldosa.rotation.x = -0.14 * K.ph(t, 9.7, 10.5) * (1 - K.ph(t, 15.6, 16.4));
        // marcas de color
        K.marcar(s.b.piezas, null); K.marcar(s.b.tacos, null); K.marcar(c.pasamanos, null);
        var mal = K.parpadeo(t, 2) ? 'mal' : null, arreglo = K.entre(t, 14.6, 17.4) ? 'foco' : null;
        K.marcar(c.panelMalla[1], t < 5 ? mal : arreglo);
        K.marcar(flojo, t < 5 ? mal : arreglo);
        K.marcar(c.baldosa, K.entre(t, 9.5, 14) ? mal : arreglo);
        if (t < 5) { K.rotulo('Panel flojo', [-0.6, 1.5, 0]); K.rotulo('Tornillo suelto', enMundo(flojo), 'izq'); K.tabla([['PANEL', 'VIBRA', 'mal'], ['RUIDO', 'ZUMBIDO', 'mal']]); }
        else if (t < 9.5) { K.rotulo('Luz que parpadea', [0, 2.19, 0.3]); K.tabla([['LUZ DEL TECHO', 'PARPADEA', 'mal']]); }
        else if (t < 14) { K.rotulo('Piso levantado', [-0.4, 0.06, 0.62], 'izq'); K.tabla([['PISO', 'ESQUINA LEVANTADA', 'mal']]); }
        else { K.tabla([['TORNILLOS', 'AJUSTADOS', 'ok'], ['LUCES', 'FIRMES', 'ok'], ['PISO', 'PEGADO', 'ok']]); if (t > 15.5) K.aviso('Cabina firme y bien iluminada', false); }
      }
    }
  });

  // =====================================================================================
  // 2) Pesacargas: sensores bajo el piso que se aprietan con el peso
  // =====================================================================================
  var PESOS = [72, 80, 65, 78, 70, 65, 85], MAXKG = 450;
  var PUESTOS = [[-0.4, -0.42], [0.4, -0.42], [0, -0.42], [-0.4, 0.02], [0.4, 0.02], [0, 0.02], [0, 0.42]];
  var ENTRA = [4.3, 4.9, 5.5, 6.1, 6.7, 7.3, 9.4];
  var ROPA = [0x7f95a8, 0xb5735a, 0x6c8f6a, 0x9a7fb0, 0xc49a4a, 0x5f7f9f, 0xd06a5a];
  // persona que entra a la cabina en t0 (y sale en t1, si hay); devuelve cuánto está adentro (0..1)
  function moverPersona(K, p, t, t0, puesto, t1) {
    var x, z, rot, anda;
    if (t1 != null && t >= t1) {
      x = K.kf(t, [[t1, puesto[0]], [t1 + 0.6, 0], [t1 + 1.6, 0]]); z = K.kf(t, [[t1, puesto[1]], [t1 + 0.6, 0.85], [t1 + 1.6, 2.9]]);
      rot = 0; anda = t < t1 + 1.6;
    } else {
      x = K.kf(t, [[t0, 0], [t0 + 0.9, 0], [t0 + 1.5, puesto[0]]]); z = K.kf(t, [[t0, 2.9], [t0 + 0.9, 0.85], [t0 + 1.5, puesto[1]]]);
      rot = PI * (1 - K.ph(t, t0 + 1.35, t0 + 1.9)); anda = K.entre(t, t0, t0 + 1.5);
    }
    p.visible = t >= t0 && !(t1 != null && t > t1 + 1.7);
    p.position.set(x, 0, z); p.rotation.y = rot;
    if (anda) p.caminar(t, 1); else quieto(p);
    return K.ph(t, t0 + 0.75, t0 + 1.05) * (t1 == null ? 1 : 1 - K.ph(t, t1 + 0.35, t1 + 0.7));
  }
  // aprieta los sensores según el peso real y baja la cabina un poquito
  function pesar(s, w) {
    var sy = 1 - 0.45 * Math.min(1.2, w / 515), baja = 0.05 * (1 - sy);
    s.sens.forEach(function (g) { g.scale.y = sy; }); s.c.g.position.y = -baja;
    return baja;
  }
  function mostrarKg(s, kg, color) { var txt = Math.round(kg) + ' kg'; if (s.ultimo !== txt + color) { s.disp.escribir(txt, null, color); s.ultimo = txt + color; } }

  V3.escena('pesacargas', ['pesacargas'], {
    fov: 36, poster: 8.5,
    construir: function (K) {
      var M = K.M, s = mats(K);
      s.c = armarCabina(K, s);
      s.b = armarBastidor(K, null);
      s.b.tacos.forEach(function (o) { o.visible = false; });
      // sensores de peso entre el piso y el marco
      s.sens = [[-0.5, -0.52], [0.5, -0.52], [-0.5, 0.52], [0.5, 0.52]].map(function (p) {
        return K.add(K.grupo([K.caja(0.11, 0.05, 0.09, M.acero, 0, 0.025, 0), K.caja(0.112, 0.014, 0.092, M.azul, 0, 0.03, 0)], p[0], -0.15, p[1]), s.b);
      });
      // cable hasta la caja del pesacargas, que va en el marco
      K.add(K.tubo([[0.56, -0.12, 0.52], [0.7, -0.1, 0.4], [0.77, 0.3, 0.16], [0.8, 1.17, 0.1]], 0.008, M.negro), s.b);
      s.caja = K.add(K.grupo([K.caja(0.2, 0.24, 0.06, M.gris, 0, 0, 0)], 0.8, 1.3, 0.1), s.b);
      s.disp = K.cartel('0 kg', 0.17, 0.07, '#10161b', '#3ccf7f'); s.disp.position.set(0, 0.045, 0.031); s.caja.add(s.disp);
      s.boton = K.cil(0.016, 0.012, M.rojo, 0, -0.07, 0.033, 'z', 14); s.caja.add(s.boton);
      s.hall = K.add(K.caja(3.2, 0.3, 2.6, M.hall, 0, -0.15, 2.08));
      s.gente = ROPA.map(function (col, i) { return gente(K, i === 6 ? 1.72 : 1.6 + K.ruido(i) * 0.1, col); });
      s.pesas = []; for (var i = 0; i < 8; i++) s.pesas.push(K.add(K.grupo([K.caja(0.3, 0.075, 0.16, M.pesa, 0, 0, 0), K.caja(0.12, 0.02, 0.02, M.hierro, 0, 0.045, 0)])));
      s.zumb = ondas(K, 3, 0xff6a50);
      s.ultimo = '';
      return s;
    },
    funciona: {
      dur: 20,
      subt: [[0, 'Debajo del piso de la cabina hay sensores de peso. Funcionan como una balanza.'],
        [4, 'Cuando entra gente, el piso baja un poquito y los sensores lo sienten. Una cajita cuenta los kilos.'],
        [9, 'Esta cabina lleva máximo 6 personas. Si entra una más, suena el zumbador y la puerta no cierra.'],
        [14, 'Cuando esa persona sale, el peso baja, se apaga el aviso y la puerta cierra para viajar.']],
      cam: [[0, [1.75, 0.14, 0.78], [0.45, -0.1, 0]], [3.4, [1.62, 0.2, 0.68], [0.45, -0.08, 0]], [5.0, [2.5, 1.7, 2.9], [0.05, 0.75, 0.25]],
        [9.5, [2.3, 1.6, 2.7], [0.05, 0.85, 0.3]], [13.5, [2.0, 1.5, 2.5], [0, 0.9, 0.35]], [16, [2.5, 1.6, 2.9], [0.1, 0.8, 0.3]], [20, [2.6, 1.7, 3.0], [0.1, 0.8, 0.3]]],
      anim: function (t, s, K) {
        var w = 0, n = 0, dentro = [];
        s.gente.forEach(function (p, i) { var d = moverPersona(K, p, t, ENTRA[i], PUESTOS[i], i === 6 ? 14.4 : null); dentro.push(d); w += PESOS[i] * d; if (d > 0.5) n++; });
        var baja = pesar(s, w);
        s.gente.forEach(function (p, i) { p.position.y = -baja * dentro[i]; });
        s.pesas.forEach(function (o) { o.visible = false; });
        var sobre = w > MAXKG;
        mostrarKg(s, w, sobre ? '#ff3b30' : w > MAXKG * 0.85 ? '#ffc62b' : '#3ccf7f');
        s.boton.position.z = 0.033;
        s.c.puerta(K.kf(t, [[0, 1], [16.4, 1], [17.8, 0]]));
        s.zumb.poner(t, [-0.57, 1.45, 0.42], sobre, 0.2, 'x');
        K.marcar(s.sens, t < 4 ? (K.parpadeo(t, 1) ? 'foco' : null) : sobre ? (K.parpadeo(t, 2) ? 'mal' : null) : K.entre(t, 4, 9) ? 'foco' : null);
        if (t < 4) { K.rotulo('Sensor de peso', [0.5, -0.12, 0.56]); K.rotulo('Sensor de peso', [0.5, -0.12, -0.48], 'izq'); }
        else if (t < 9) K.rotulo('Caja que cuenta los kilos', [0.8, 1.3, 0.13]);
        else if (sobre) K.rotulo('Zumbador', [-0.58, 1.45, 0.42]);
        if (t >= 4) K.tabla([['PESO', Math.round(w) + ' kg de ' + MAXKG, sobre ? 'mal' : 'ok'], ['PERSONAS', n + ' de 6', n > 6 ? 'mal' : ''], ['PUERTA', sobre ? 'NO CIERRA' : t < 16.4 ? 'ABIERTA' : t < 17.8 ? 'CERRANDO' : 'CERRADA', sobre ? 'mal' : '']]);
        if (sobre) K.aviso('¡Sobrecarga! Que baje una persona');
        else if (t > 16.2) K.aviso('Peso correcto: puede viajar', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: el pesacargas está descalibrado. Con solo dos personas marca que la cabina está llena.'],
        [5, 'Suena el zumbador y la puerta no cierra. El ascensor no sale y la gente cree que está malogrado.'],
        [10, 'Arreglo: el técnico vacía la cabina y, como sigue marcando kilos, lo pone en cero.'],
        [14, 'Luego pone pesas de peso conocido y revisa que marque lo mismo. Así queda bien calibrado.']],
      cam: [[0, [2.4, 1.6, 2.8], [0.05, 0.8, 0.25]], [4.6, [2.2, 1.5, 2.6], [0.1, 0.9, 0.25]], [6.2, [1.32, 1.45, 1.0], [0.78, 1.28, 0.1]], [9.6, [1.3, 1.42, 0.98], [0.78, 1.28, 0.1]],
        [11, [1.9, 1.5, 2.2], [0.45, 1.0, 0.1]], [12, [1.3, 1.42, 0.98], [0.78, 1.26, 0.1]], [14, [1.3, 1.42, 0.98], [0.78, 1.26, 0.1]], [15.4, [2.2, 1.5, 2.5], [0.05, 0.55, 0]], [19, [2.3, 1.6, 2.6], [0.05, 0.6, 0]]],
      anim: function (t, s, K) {
        var w = 0, n = 0, dentro = [0, 0];
        s.gente.forEach(function (p, i) { if (i > 1) { p.visible = false; return; } var d = moverPersona(K, p, t, i ? 0.8 : 0.2, i ? [0.25, -0.15] : [-0.25, -0.15], i ? 10.1 : 9.6); dentro[i] = d; w += PESOS[i] * d; if (d > 0.5) n++; });
        // pesas de 25 kg que el técnico pone para probar
        var pz = 0;
        s.pesas.forEach(function (o, i) {
          var ti = 14.3 + i * 0.42, lado = i % 2 ? 0.2 : -0.2, nivel = Math.floor(i / 2);
          o.visible = t >= ti - 0.4; pz += 25 * K.ph(t, ti - 0.1, ti);
          o.position.set(lado, 0.05 + nivel * 0.077 + 0.6 * (1 - K.ph(t, ti - 0.4, ti)), -0.3);
        });
        w += pz;
        var baja = pesar(s, w);
        s.gente.forEach(function (p, i) { if (i < 2) p.position.y = -baja * dentro[i]; });
        s.pesas.forEach(function (o) { o.position.y -= baja; });
        var error = 380 * (1 - K.ph(t, 12.4, 12.8)), marca = w + error, sobre = marca > MAXKG;
        mostrarKg(s, marca, sobre ? '#ff3b30' : error > 1 ? '#ffc62b' : '#3ccf7f');
        s.boton.position.z = 0.033 - 0.007 * (K.ph(t, 12.0, 12.2) - K.ph(t, 12.7, 12.9));
        s.c.puerta(1);
        s.zumb.poner(t, [-0.57, 1.45, 0.42], sobre, 0.2, 'x');
        K.marcar(s.sens, t < 12.4 ? (K.parpadeo(t, 2) ? 'mal' : null) : t < 14 ? 'foco' : null);
        if (t < 5) K.rotulo('Sensor descalibrado', [0.5, -0.12, 0.56]);
        else if (t < 10) K.rotulo('Marca de más', [0.8, 1.34, 0.13], 'izq');
        else if (t < 14) K.rotulo(t < 12.4 ? 'Vacía y marca kilos' : 'Puesto en cero', [0.8, 1.34, 0.13], 'izq');
        else K.rotulo('Pesas de 25 kg', [-0.2, 0.3, -0.22], 'izq');
        if (K.entre(t, 11.4, 13)) K.rotulo('Botón de cero', [0.8, 1.23, 0.135]);
        K.tabla([['PERSONAS', n ? n + '' : 'NADIE', ''], ['MARCA', Math.round(marca) + ' kg', sobre ? 'mal' : error > 1 ? 'ac' : 'ok'], ['PESO REAL', Math.round(w) + ' kg', '']]);
        if (sobre) K.aviso('¡Sobrecarga con 2 personas!');
        else if (t > 17.6) K.aviso('Calibrado: marca bien', false);
      }
    }
  });

  // =====================================================================================
  // 3) Botonera de inspección en el techo de la cabina
  // =====================================================================================
  var CX = 0.35, CY = 0.97, CZ = 0.02;   // bisagra de la tapa de la caja (atrás, arriba)
  V3.escena('inspeccion', ['caja_inspeccion'], {
    fov: 36, poster: 3,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      // la cabina con su techo en y = 0
      var abajo = K.add(new T.Group()); abajo.position.y = -2.25;
      s.c = armarCabina(K, s); abajo.add(s.c.g); armarBastidor(K, abajo);
      K.add(K.caja(3.4, 9, 0.05, M.muro, 0, 1, -1.0));
      s.marcas = marcasHueco(K, 11, -1.0); rieles(K, -4, 10);
      [-0.05, 0, 0.05].forEach(function (x) { K.add(K.cil(0.006, 4.6, M.hierro, x, 0.41 + 2.3, 0, null, 8)); });
      // baranda del techo
      [-0.6, 0, 0.6].forEach(function (x) { K.add(K.caja(0.04, 1.1, 0.04, M.amarillo, x, 0.55, -0.64)); });
      K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, 1.1, -0.64)); K.add(K.caja(1.24, 0.04, 0.04, M.amarillo, 0, 0.55, -0.64)); K.add(K.caja(1.24, 0.1, 0.02, M.amarillo, 0, 0.05, -0.64));
      // soporte y caja: base hueca + tapa con los mandos
      K.add(K.caja(0.04, 0.5, 0.04, M.hierro, CX, 0.66, 0.08));
      var amar2 = K.mat(0xf2b705, { roughness: 0.5 });
      s.cascara = [K.caja(0.4, 0.01, 0.2, amar2, CX, 0.915, CZ + 0.1), K.caja(0.4, 0.05, 0.01, amar2, CX, 0.945, CZ + 0.195), K.caja(0.4, 0.05, 0.01, amar2, CX, 0.945, CZ + 0.005),
        K.caja(0.01, 0.05, 0.2, amar2, CX - 0.195, 0.945, CZ + 0.1), K.caja(0.01, 0.05, 0.2, amar2, CX + 0.195, 0.945, CZ + 0.1)];
      s.cascara.forEach(function (o) { K.add(o); });
      // bornes adentro y un cable flojo
      for (var i = 0; i < 6; i++) K.add(K.caja(0.024, 0.03, 0.04, i % 2 ? M.gris : M.verde, CX - 0.12 + i * 0.045, 0.935, CZ + 0.11));
      [0, 1, 3, 4].forEach(function (i) { K.add(K.tubo([[CX - 0.12 + i * 0.045, 0.952, CZ + 0.11], [CX - 0.12 + i * 0.045, 0.96, CZ + 0.15], [CX - 0.1 + i * 0.03, 0.93, CZ + 0.19]], 0.004, i % 2 ? M.negro : M.azul)); });
      s.borne = [CX - 0.12 + 2 * 0.045, 0.952, CZ + 0.11];
      s.cable = K.add(K.cable(0.0045, M.cobre)); s.chispas = K.add(K.chispas(14));
      s.tapa = K.add(new T.Group()); s.tapa.position.set(CX, CY, CZ);
      s.tapaMalla = K.caja(0.4, 0.04, 0.2, amar2, 0, 0.02, 0.1); s.tapa.add(s.tapaMalla); s.cascara.push(s.tapaMalla);
      // seta roja de parada
      s.tapa.add(K.cil(0.04, 0.01, M.negro, -0.13, 0.045, 0.08, null, 20));
      s.hongo = K.grupo([K.cil(0.012, 0.03, M.hierro, 0, 0.015, 0, null, 10), K.cil(0.036, 0.018, M.rojo, 0, 0.034, 0, null, 24),
        K.en(new T.Mesh(new T.SphereGeometry(0.036, 20, 8, 0, PI * 2, 0, PI / 2), M.rojo), 0, 0.043, 0)], -0.13, 0.045, 0.08);
      s.hongo.children[2].scale.y = 0.45; s.tapa.add(s.hongo);
      // llave normal / inspección
      s.perilla = K.grupo([K.cil(0.026, 0.012, M.negro, 0, 0, 0, null, 18), K.caja(0.014, 0.018, 0.05, M.negro, 0, 0.014, 0), K.caja(0.01, 0.019, 0.012, M.blanco, 0, 0.015, -0.02)], -0.03, 0.046, 0.08);
      s.tapa.add(s.perilla);
      // pulsadores subir, común y bajar
      s.bSub = K.cil(0.019, 0.016, M.negro, 0.05, 0.048, 0.08, null, 18); s.bCom = K.cil(0.019, 0.016, M.azul, 0.11, 0.048, 0.08, null, 18); s.bBaj = K.cil(0.019, 0.016, M.negro, 0.17, 0.048, 0.08, null, 18);
      s.tapa.add(s.bSub, s.bCom, s.bBaj);
      [['STOP', -0.13, 0.165, 0.06], ['NORMAL', -0.062, 0.035, 0.05], ['INSP.', 0.004, 0.035, 0.04], ['SUBIR', 0.05, 0.155, 0.05], ['COMÚN', 0.11, 0.155, 0.05], ['BAJAR', 0.17, 0.155, 0.05]].forEach(function (e) {
        var o = K.cartel(e[0], e[3], 0.016, '#f2b705', '#1e2125'); o.rotation.x = -PI / 2; o.position.set(e[1], 0.0405, e[2]); s.tapa.add(o);
      });
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true)); s.tec.position.set(0.3, 0, -0.33);
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'Esta caja amarilla va en el techo de la cabina. Con ella el técnico maneja el ascensor desde arriba.'],
        [4.5, 'Primero gira la llave a «inspección». Desde ese momento el ascensor ya no atiende a los pasajeros.'],
        [8.5, 'Para moverse aprieta «subir» junto con «común». La cabina sube despacio y se para apenas suelta.'],
        [13.5, 'Si hay peligro, aprieta el botón rojo de parada (stop). Todo se detiene al instante.']],
      cam: [[0, [0.66, 1.32, 0.78], [0.36, 0.98, 0.12]], [4.5, [0.58, 1.26, 0.7], [0.33, 0.99, 0.12]], [8.2, [0.6, 1.28, 0.72], [0.36, 0.99, 0.12]],
        [9.6, [2.2, 1.7, 2.3], [0.1, 0.65, -0.1]], [13, [2.1, 1.65, 2.2], [0.1, 0.7, -0.1]], [14.4, [0.72, 1.36, 0.88], [0.32, 0.98, 0.12]], [18, [0.76, 1.4, 0.95], [0.32, 0.97, 0.12]]],
      anim: function (t, s, K) {
        var insp = K.ph(t, 5.4, 6.0), pide = K.entre(t, 9.2, 12.4) || K.entre(t, 14.0, 15.4), stop = t >= 15.2;
        s.perilla.rotation.y = K.mix(0.6, -0.6, insp);
        s.bSub.position.y = s.bCom.position.y = pide ? 0.041 : 0.048; s.bBaj.position.y = 0.048;
        s.hongo.position.y = 0.045 - (stop ? 0.016 : 0);
        s.tapa.rotation.x = 0;
        var sube = K.integ(function (x) { return 0.3 * (K.ph(x, 9.3, 9.7) - K.ph(x, 12.4, 12.7)) + 0.3 * (K.ph(x, 14.1, 14.5) - K.ph(x, 15.2, 15.25)); }, t);
        s.marcas.position.y = -(sube % 0.9);
        var v = (K.entre(t, 9.3, 12.6) || K.entre(t, 14.1, 15.2));
        // el técnico: mano izquierda a la llave y al stop, mano derecha a los botones
        var tec = s.tec; tec.visible = true; quieto(tec);
        var kI = Math.max(K.ph(t, 4.8, 5.3) * (1 - K.ph(t, 6.3, 6.8)), K.ph(t, 14.6, 15.1) * (1 - K.ph(t, 16.2, 16.7)));
        apuntar(K, tec, tec.brazoI, t < 10 ? enMundo(s.perilla) : enMundo(s.hongo), kI);
        apuntar(K, tec, tec.brazoD, enMundo(s.bCom), Math.max(K.ph(t, 8.8, 9.2) * (1 - K.ph(t, 12.4, 12.8)), K.ph(t, 13.6, 14.0) * (1 - K.ph(t, 15.4, 15.8))));
        s.cable.pon(s.borne, [s.borne[0], 0.97, CZ + 0.17]); s.chispas.emitir(t, s.borne, false);
        // marcas de color
        K.marcar(s.cascara, t < 2.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.perilla, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        K.marcar([s.bSub, s.bCom], pide ? 'foco' : null); K.marcar(s.bBaj, null);
        K.marcar(s.hongo, t >= 13.5 && (stop || K.parpadeo(t, 1.5)) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Botón de parada (stop)', enMundo(s.hongo), 'izq'); K.rotulo('Llave normal / inspección', enMundo(s.perilla)); K.rotulo('Subir · común · bajar', enMundo(s.bBaj)); }
        else if (t < 8.5) K.rotulo(insp > 0.5 ? 'Llave en inspección' : 'Llave en normal', enMundo(s.perilla));
        else if (t < 13.5) { if (t < 9.6) K.rotulo('Subir + común', enMundo(s.bCom)); }
        else K.rotulo('Stop', enMundo(s.hongo), 'izq');
        K.tabla([['MODO', insp > 0.5 ? 'INSPECCIÓN' : 'NORMAL', insp > 0.5 ? 'ac' : 'ok'], ['PASAJEROS', insp > 0.5 ? 'NO SE ATIENDEN' : 'SE ATIENDEN', ''],
          ['CABINA', stop ? 'DETENIDA' : v ? 'SUBE DESPACIO' : 'QUIETA', stop ? 'ac' : v ? 'ok' : '']]);
        if (stop) K.aviso('Stop: nada se mueve', false);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla 1: un cable flojo dentro de la caja. Con la vibración del viaje se suelta un instante…'],
        [4.5, '…y el ascensor se para solo, de golpe. Luego vuelve a andar, y otra vez se para.'],
        [9, 'Falla 2: el técnico se fue y dejó la llave en «inspección» y el botón rojo apretado. El ascensor no atiende a nadie.'],
        [13.5, 'Arreglo: llave en «normal», botón rojo suelto y, con la corriente cortada, ajustar los cables flojos.']],
      cam: [[0, [0.6, 1.36, 0.6], [0.34, 0.94, 0.13]], [4.2, [0.64, 1.38, 0.64], [0.34, 0.94, 0.13]], [5.4, [2.1, 1.6, 2.2], [0.1, 0.65, -0.1]], [8.6, [2.1, 1.6, 2.2], [0.1, 0.65, -0.1]],
        [10, [0.66, 1.32, 0.78], [0.34, 0.98, 0.12]], [13.4, [0.66, 1.32, 0.78], [0.34, 0.98, 0.12]], [14.6, [0.85, 1.42, 1.0], [0.3, 0.95, 0.05]], [18, [0.9, 1.45, 1.05], [0.3, 0.95, 0.05]]],
      anim: function (t, s, K) {
        var golpes = [2.2, 5.6, 7.8], para = 0;
        golpes.forEach(function (e) { para += K.ph(t, e, e + 0.05) - K.ph(t, e + 0.9, e + 1.3); });
        var anda = K.integ(function (x) { var p = 0; golpes.forEach(function (e) { p += K.ph(x, e, e + 0.05) - K.ph(x, e + 0.9, e + 1.3); }); return x < 9 ? 0.9 * (1 - p) * K.ph(x, 0, 0.5) : 0; }, t);
        s.marcas.position.y = -(anda % 0.9);
        var viaja = t < 9 && para < 0.5;
        // tapa abierta mientras se ve el cable flojo
        s.tapa.rotation.x = -1.25 * (1 - K.ph(t, 8.6, 9.2));
        var chispa = false; golpes.forEach(function (e) { if (K.entre(t, e - 0.15, e + 0.25)) chispa = true; });
        var flojo = t < 9 ? 1 : 0, sacude = viaja ? Math.sin(t * 40) * 0.005 : 0;
        s.cable.pon(s.borne, [s.borne[0] + sacude + (chispa ? 0.012 : 0.006) * flojo, 0.965 + (chispa ? 0.012 : 0.004) * flojo, CZ + 0.17]);
        s.chispas.emitir(t, [s.borne[0] + 0.006, s.borne[1] + 0.012, s.borne[2] + 0.02], chispa, 0.06);
        // llave y stop: en falla 2 quedaron mal; en el arreglo se dejan bien
        var insp = t < 9 ? 0 : 1 - K.ph(t, 14.2, 14.9), stop = K.entre(t, 9, 15.6);
        s.perilla.rotation.y = K.mix(0.6, -0.6, insp);
        s.hongo.position.y = 0.045 - (stop ? 0.016 : 0) + 0.006 * (K.ph(t, 15.3, 15.5) - K.ph(t, 15.6, 15.9));
        s.bSub.position.y = s.bCom.position.y = s.bBaj.position.y = 0.048;
        var tec = s.tec; tec.visible = t >= 13.5; quieto(tec);
        apuntar(K, tec, tec.brazoI, t < 15 ? enMundo(s.perilla) : enMundo(s.hongo), K.ph(t, 13.7, 14.1) * (1 - K.ph(t, 16.0, 16.5)));
        // marcas de color
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.cascara, null); K.marcar([s.bSub, s.bCom, s.bBaj], null);
        K.marcar(s.cable, t < 9 ? mal : null);
        K.marcar(s.perilla, K.entre(t, 9, 13.5) ? mal : K.entre(t, 13.5, 17) ? 'foco' : null);
        K.marcar(s.hongo, K.entre(t, 9, 13.5) ? mal : K.entre(t, 15, 17) ? 'foco' : null);
        if (t < 9) {
          if (t < 4.5) K.rotulo('Cable flojo', s.borne);
          K.tabla([['CABLE', 'FLOJO', 'mal'], ['CABINA', viaja ? 'VIAJA' : 'SE PARÓ SOLA', viaja ? '' : 'mal']]);
          if (!viaja && t > 1) K.aviso('Se paró sin motivo');
        } else if (t < 13.5) {
          K.rotulo('Llave en inspección', enMundo(s.perilla)); K.rotulo('Stop apretado', enMundo(s.hongo), 'izq');
          K.tabla([['LLAVE', 'INSPECCIÓN', 'mal'], ['STOP', 'APRETADO', 'mal'], ['PASAJEROS', 'NO SE ATIENDEN', 'mal']]);
          K.aviso('Ascensor fuera de servicio');
        } else {
          K.tabla([['LLAVE', insp > 0.5 ? 'INSPECCIÓN' : 'NORMAL', insp > 0.5 ? 'ac' : 'ok'], ['STOP', stop ? 'APRETADO' : 'SUELTO', stop ? 'ac' : 'ok'], ['CABLES', 'AJUSTADOS', 'ok']]);
          if (t > 16) K.aviso('Listo para servicio normal', false);
        }
      }
    }
  });

  // =====================================================================================
  // 4) Faldón: la plancha bajo la entrada de la cabina que tapa el hueco
  // =====================================================================================
  var ZC = -0.78;   // la cabina va metida en el hueco; su pisadera queda a 2 cm de la del piso
  V3.escena('faldon', ['faldon'], {
    fov: 36, poster: 11,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      // piso del pasillo (cortado para ver el hueco), su pisadera y el muro debajo
      K.add(K.caja(2.0, 0.25, 2.05, M.hall, 0, -0.125, 1.035));
      K.add(K.caja(0.9, 0.03, 0.15, M.acero, 0, -0.011, 0.085));
      K.add(K.caja(2.0, 2.3, 0.15, M.muro, 0, -1.4, 0.085));
      // marco de la puerta del piso y un poco de pared del pasillo
      K.add(K.caja(0.08, 2.1, 0.12, M.acero, -0.44, 1.05, 0.1)); K.add(K.caja(0.08, 2.1, 0.12, M.acero, 0.44, 1.05, 0.1)); K.add(K.caja(0.96, 0.1, 0.12, M.acero, 0, 2.15, 0.1));
      K.add(K.caja(0.52, 2.4, 0.08, M.muro, -0.74, 1.2, 0.12)); K.add(K.caja(0.52, 2.4, 0.08, M.muro, 0.74, 1.2, 0.12));
      // hueco: pared del fondo, pared izquierda y el piso del foso
      K.add(K.caja(2.0, 5.4, 0.05, M.muro, 0, 0.1, -1.7)); K.add(K.caja(0.05, 5.4, 1.72, M.muro, -1.0, 0.1, -0.84)); K.add(K.caja(2.0, 0.05, 1.72, M.losa || M.gris, 0, -2.55, -0.84));
      rieles(K, -2.6, 5.6, ZC);
      // la cabina con su marco
      s.c = armarCabina(K, s); s.c.g.position.z = ZC; armarBastidor(K, s.c.g);
      // el faldón: plancha de arriba fija, parte de abajo (que se puede doblar) y el chaflán doblado hacia adentro
      s.mF = K.mat(0xa9b3bb, { metalness: 0.45, roughness: 0.45, transparent: true });
      s.fal = new T.Group(); s.fal.position.set(0, -0.015, 0.77); s.c.g.add(s.fal);
      var arriba = K.caja(0.8, 0.48, 0.01, s.mF, 0, -0.24, 0); s.fal.add(arriba);
      s.bajo = new T.Group(); s.bajo.position.y = -0.48; s.fal.add(s.bajo);
      var abajo = K.caja(0.8, 0.2, 0.01, s.mF, 0, -0.1, 0); s.bajo.add(abajo);
      var chaflan = K.caja(0.8, 0.1, 0.01, s.mF, 0, -0.235, -0.035); chaflan.rotation.x = PI / 4; s.bajo.add(chaflan);
      s.placas = [arriba, abajo, chaflan];
      s.fal.add(K.caja(0.8, 0.03, 0.04, M.aceroOsc, 0, -0.02, -0.025));
      s.pernos = [-0.3, 0, 0.3].map(function (x) { var p = K.cil(0.012, 0.03, M.hierro, x, -0.06, -0.012, 'z', 10); s.fal.add(p); return p; });
      // el hueco que quedaría sin faldón y la flecha de caída
      s.mH = K.matB(0xff3b30, { transparent: true, opacity: 0.35, depthWrite: false, side: T.DoubleSide });
      s.hueco = K.add(K.caja(0.72, 1, 0.004, s.mH, 0, 0.25, 0.0));
      s.flecha = K.add(K.flecha(0xff3b30, 0.025));
      s.chispas = K.add(K.chispas(16));
      s.pers = gente(K, 1.62, 0x9a7fb0);
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El faldón es una plancha lisa que cuelga debajo de la entrada de la cabina, como una falda.'],
        [4.5, 'Imagina la cabina sin faldón, parada más arriba del piso: abajo de la entrada queda un hueco hacia el vacío.'],
        [9, 'El faldón tapa ese hueco como una pared lisa. Así nadie mete el pie ni se cae al hueco.'],
        [13.5, 'Por eso es clave en los rescates: la gente baja de una cabina parada alta sin peligro.']],
      cam: [[0, [2.5, 0.5, -0.65], [0, -0.25, -0.2]], [3.6, [2.3, 0.45, -0.6], [0, -0.2, -0.2]], [5.2, [1.0, 0.5, 2.1], [0, 0.2, -0.1]], [10.5, [0.8, 0.45, 1.9], [0, 0.15, -0.1]],
        [12.2, [2.4, 0.6, -0.5], [0, 0.0, -0.2]], [13.8, [2.4, 0.6, -0.5], [0, 0.0, -0.2]], [15.2, [1.7, 1.1, 2.3], [0, 0.6, -0.1]], [18, [1.8, 1.2, 2.4], [0, 0.5, -0.1]]],
      anim: function (t, s, K) {
        var cy = K.kf(t, [[0, 0], [4.6, 0], [6.2, 0.5]]);
        s.c.g.position.y = cy; s.c.puerta(K.kf(t, [[0, 0], [6.3, 0], [7.3, 1]]));
        // sin faldón (4.5–9) y luego aparece
        var sin = K.entre(t, 4.5, 9);
        s.fal.visible = !sin; s.mF.opacity = t < 9 ? 1 : K.ph(t, 9, 10); s.bajo.rotation.x = 0;
        s.pernos.forEach(function (p) { p.position.z = -0.012; });
        var h = K.ph(t, 6.2, 6.8) - K.ph(t, 9.6, 10.4);
        s.mH.opacity = 0.4 * h; s.hueco.visible = h > 0.01; s.hueco.scale.y = Math.max(0.01, cy); s.hueco.position.y = cy / 2;
        s.flecha.visible = h > 0.01; s.flecha.apuntar([0, cy * 0.6, -0.12], [0, cy * 0.6 - 0.25 - 1.1 * h, -0.12]);
        s.chispas.emitir(t, [0, 0, 0], false);
        // la persona espera adentro y en el rescate baja al pasillo
        var p = s.pers;
        p.position.set(0.12, K.kf(t, [[14.5, cy], [15.3, 0]]), K.kf(t, [[13.6, -0.4], [14.5, -0.12], [15.3, 0.35], [16.4, 0.75]]));
        p.rotation.y = 0;
        if (K.entre(t, 13.6, 16.4)) p.caminar(t, 1); else quieto(p);
        // marcas de color (la opacidad se pone antes de marcar)
        K.marcar(s.placas, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : K.entre(t, 10.2, 13.5) ? 'foco' : null);
        K.marcar(s.pernos, null);
        if (t < 4.5) K.rotulo('Faldón', enMundo(s.bajo));
        else if (sin && h > 0.3) K.rotulo('Hueco hacia el vacío', [0.36, cy * 0.5, 0.0]);
        else if (t >= 9 && t < 13.5) K.rotulo('Faldón', [0.36, cy * 0.4, 0.0]);
        K.tabla([['CABINA', cy > 0.05 ? 'MÁS ARRIBA DEL PISO' : 'A NIVEL', cy > 0.05 ? 'ac' : 'ok'], ['FALDÓN', sin ? 'NO HAY' : 'TAPA EL HUECO', sin ? 'mal' : 'ok']]);
        if (sin && h > 0.3) K.aviso('Peligro: hueco abierto');
        else if (K.entre(t, 10.3, 13.5)) K.aviso('Hueco tapado', false);
        else if (t > 15.4) K.aviso('Rescate seguro', false);
      }
    },
    falla: {
      dur: 17,
      subt: [[0, 'Falla: un golpe dobló el faldón o se le soltó un perno. La parte de abajo queda torcida hacia afuera.'],
        [5, 'Cuando la cabina pasa por cada piso, la plancha torcida choca con el borde del piso: se oye un golpe o un raspón.'],
        [10.5, 'Arreglo: con el ascensor detenido, enderezar o cambiar la plancha y ajustar todos sus pernos.']],
      cam: [[0, [2.3, 0.85, -0.6], [0, 0.35, -0.15]], [4.6, [2.2, 0.6, -0.5], [0, 0.05, -0.1]], [9.6, [2.2, 0.5, -0.45], [0, -0.02, -0.1]],
        [11.2, [2.3, 0.85, -0.6], [0, 0.35, -0.15]], [17, [2.4, 0.9, -0.65], [0, 0.35, -0.15]]],
      anim: function (t, s, K) {
        var cy = K.kf(t, [[0, 0.95], [5.4, 0.95], [9.8, -1.0], [10.6, -1.0], [12.2, 0.95]]);
        s.c.g.position.y = cy; s.c.puerta(0);
        s.fal.visible = true; s.mF.opacity = 1; s.hueco.visible = false; s.flecha.visible = false;
        // doblado hacia el piso; al pasar por la pisadera la plancha choca y raspa
        var beta = 0.4 * (1 - K.ph(t, 12.6, 13.6)), junta = cy - 0.015 - 0.48 - 0.2 * Math.cos(beta);
        var baja = K.entre(t, 5.4, 9.8), roza = baja && junta < 0.01 && junta > -0.9;
        s.bajo.rotation.x = -(roza ? Math.min(beta, 0.1) : beta);
        var golpe = baja && junta < 0.03 && junta > -0.16;
        s.chispas.emitir(t, [0.15, 0.004, 0.012], golpe || (roza && K.parpadeo(t, 4)), 0.1);
        var suelto = 1 - K.ph(t, 13.0, 13.8);
        s.pernos.forEach(function (p, i) { p.position.z = i === 2 ? -0.012 - 0.025 * suelto : -0.012; p.rotation.z = i === 2 ? suelto * t * 2 : 0; });
        s.pers.visible = false;
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.placas, t < 10.5 ? (golpe ? 'mal' : t < 5 ? mal : null) : K.entre(t, 12.6, 15.5) ? 'foco' : null);
        K.marcar(s.pernos[2], t < 5 ? mal : K.entre(t, 13, 15.5) ? 'foco' : null);
        K.marcar([s.pernos[0], s.pernos[1]], null);
        if (t < 5) { K.rotulo('Faldón doblado', enMundo(s.bajo)); K.rotulo('Perno flojo', enMundo(s.pernos[2]), 'izq'); }
        else if (t < 10.5) K.rotulo('Borde del piso', [0, 0.0, 0.03]);
        else if (t > 12.6) K.rotulo('Faldón derecho', enMundo(s.bajo));
        K.tabla([['FALDÓN', beta > 0.05 ? 'DOBLADO' : 'DERECHO', beta > 0.05 ? 'mal' : 'ok'], ['PERNO', suelto > 0.5 ? 'FLOJO' : 'AJUSTADO', suelto > 0.5 ? 'mal' : 'ok']]);
        if (golpe || roza) K.aviso('Golpe y raspón al pasar por el piso');
        else if (t > 14) K.aviso('Faldón derecho y firme', false);
      }
    }
  });

  // =====================================================================================
  // 5) Luz de emergencia y alarma (con su batería en el techo)
  // =====================================================================================
  function bateria(K, s) {
    var M = K.M, g = K.add(new K.T.Group());
    var cuerpo = K.caja(0.3, 0.14, 0.18, M.negro, 0, 0.07, 0); g.add(cuerpo);
    g.add(K.caja(0.302, 0.03, 0.182, M.verde, 0, 0.1, 0), K.cil(0.012, 0.02, M.rojo, -0.11, 0.15, 0.05, null, 10), K.cil(0.012, 0.02, M.negro, 0.11, 0.15, 0.05, null, 10));
    var barras = [0, 1, 2].map(function (i) { var b = K.caja(0.045, 0.012, 0.03, s.verde, -0.06 + i * 0.055, 0.146, -0.04); g.add(b); return b; });
    var led = K.esfera(0.013, s.verde, 0.11, 0.15, -0.04); g.add(led);
    return { g: g, cuerpo: cuerpo, barras: barras, led: led };
  }
  function cargaBateria(s, b, nivel, ledMat) { b.barras.forEach(function (o, i) { o.material = i < nivel ? (nivel === 1 ? s.rojo : s.verde) : s.oscuro; }); b.led.material = ledMat; }

  V3.escena('emergencia', ['emergencia'], {
    fov: 36, poster: 2.5,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      s.c = armarCabina(K, s); armarBastidor(K, null);
      s.lumE = K.add(K.caja(0.22, 0.03, 0.08, s.apag, 0, 2.185, 0.56), s.c.g);
      s.pl = new T.PointLight(0xffe2a8, 0, 3.2, 1.2); s.pl.position.set(0, 1.95, 0.45); K.add(s.pl);
      s.bat = bateria(K, s); s.bat.g.position.set(-0.3, 2.25, -0.3);
      s.batN = bateria(K, s);
      K.add(K.tubo([[-0.15, 2.27, -0.3], [0.05, 2.262, -0.38], [0.28, 2.27, -0.3]], 0.008, M.negro));
      s.sirena = K.add(K.grupo([K.cil(0.05, 0.05, M.hierro, 0, 0.025, 0), K.cil(0.075, 0.06, M.rojo, 0, 0.08, 0, null, 24), K.esfera(0.022, M.cromo, 0, 0.115, 0)], 0.35, 2.25, -0.3));
      s.luces = []; K.sc.children.forEach(function (o) { if (o.isLight && o !== s.pl) s.luces.push([o, o.intensity]); });
      s.pers = gente(K, 1.65, 0x6a7f94); s.pers.position.set(-0.12, 0, 0.28); s.pers.rotation.y = -PI / 2;
      s.campana = ondas(K, 3, 0xffc62b); s.voz = ondas(K, 3, 0x3ccf7f);
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true)); s.tec.position.set(0.05, 2.25, 0.25); s.tec.rotation.y = PI;
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'Sobre el techo de la cabina hay una batería y una sirena. Adentro, una luz pequeña y el botón de alarma.'],
        [4.5, 'Si se corta la luz, la cabina queda a oscuras… y en un segundo se prende sola la luz de emergencia.'],
        [9, 'Si alguien queda encerrado, aprieta el botón amarillo de la campana: arriba suena la sirena.'],
        [13.5, 'Por el parlante puede hablar con el portero o con la central, y esperar tranquilo a que lo rescaten.']],
      cam: [[0, [1.6, 3.5, 1.7], [0, 2.3, -0.25]], [3.6, [1.5, 3.3, 1.6], [0, 2.3, -0.25]], [5.2, [1.95, 1.5, 1.35], [-0.2, 1.3, 0.1]], [9.2, [1.7, 1.45, 1.25], [-0.3, 1.2, 0.25]],
        [11, [2.4, 2.7, 2.3], [-0.05, 1.7, -0.1]], [13.4, [2.4, 2.7, 2.3], [-0.05, 1.7, -0.1]], [15, [1.45, 1.5, 1.25], [-0.45, 1.3, 0.35]], [18, [1.55, 1.5, 1.35], [-0.4, 1.3, 0.3]]],
      anim: function (t, s, K) {
        var corte = t >= 5.6, emerg = K.ph(t, 6.5, 6.8);
        emergencia(s, K, corte, emerg);
        s.bat.g.visible = true; s.bat.g.position.set(-0.3, 2.25, -0.3); s.batN.g.visible = false; s.tec.visible = false;
        cargaBateria(s, s.bat, 3, corte ? (K.parpadeo(t, 1) ? s.amar : s.oscuro) : s.verde);
        // la persona aprieta la alarma
        var p = s.pers; quieto(p);
        var aprieta = K.ph(t, 9.6, 10.1) * (1 - K.ph(t, 11.2, 11.7));
        apuntar(K, p, p.brazoD, enMundo(s.c.alarma), aprieta);
        s.c.alarma.position.x = aprieta > 0.95 ? 0.004 : 0.009;
        var suena = K.entre(t, 10.2, 13.6);
        s.campana.poner(t, [0.35, 2.4, -0.3], suena, 0.3, 'y');
        s.voz.poner(t, [-0.58, 1.45, 0.42], t >= 13.8, 0.18, 'x');
        K.marcar(s.bat.cuerpo, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.sirena, (t < 4.5 && !K.parpadeo(t, 1)) || suena ? 'foco' : null);
        K.marcar(s.c.alarma, K.entre(t, 9, 13.5) ? 'foco' : null);
        K.marcar(s.c.rejilla, t >= 13.5 ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Batería', [-0.3, 2.4, -0.3], 'izq'); K.rotulo('Sirena', [0.35, 2.38, -0.3]); }
        else if (t < 9) { if (t > 6.6) K.rotulo('Luz de emergencia', [0, 2.17, 0.56]); }
        else if (t < 13.5) { K.rotulo('Botón de alarma', enMundo(s.c.alarma), 'izq'); if (t > 10.5) K.rotulo('Sirena', [0.35, 2.38, -0.3]); }
        else K.rotulo('Parlante', enMundo(s.c.rejilla), 'izq');
        K.tabla([['LUZ NORMAL', corte ? 'APAGADA' : 'PRENDIDA', corte ? 'mal' : 'ok'], ['LUZ EMERGENCIA', emerg > 0.5 ? 'PRENDIDA' : 'APAGADA', emerg > 0.5 ? 'ok' : ''],
          ['ALARMA', t >= 13.8 ? 'ATENDIDA' : suena ? 'SONANDO' : 'LISTA', t >= 13.8 ? 'ok' : suena ? 'ac' : '']]);
        if (corte && t < 6.6) K.aviso('Corte de luz');
        else if (t >= 13.8) K.aviso('Ayuda en camino', false);
      }
    },
    falla: {
      dur: 18,
      subt: [[0, 'Falla: la batería de emergencia está gastada. Estas baterías duran pocos años.'],
        [4.5, 'Se va la luz y la cabina queda totalmente a oscuras. La persona aprieta la alarma… y no suena nada.'],
        [10.5, 'Arreglo: el técnico prueba la batería en cada mantenimiento y la cambia si ya no carga. Ahora sí funciona.']],
      cam: [[0, [1.5, 3.3, 1.6], [-0.1, 2.3, -0.25]], [4.4, [1.5, 3.3, 1.6], [-0.1, 2.3, -0.25]], [5.6, [1.95, 1.5, 1.35], [-0.2, 1.3, 0.1]], [10.2, [1.8, 1.45, 1.3], [-0.3, 1.2, 0.25]],
        [11.4, [1.5, 3.4, 1.7], [-0.1, 2.3, -0.2]], [13.6, [1.5, 3.4, 1.7], [-0.1, 2.3, -0.2]], [14.8, [2.5, 2.7, 2.4], [-0.05, 1.7, -0.1]], [18, [2.5, 2.7, 2.4], [-0.05, 1.7, -0.1]]],
      anim: function (t, s, K) {
        var corte = K.entre(t, 5.2, 10.6) || t >= 14.3, nueva = t >= 12.3;
        var emerg = nueva ? K.ph(t, 14.8, 15.1) : 0;
        emergencia(s, K, corte, emerg);
        // cambio de batería: la vieja sale, la nueva entra
        s.bat.g.visible = t < 12.4; s.bat.g.position.set(-0.3 - 0.4 * K.ph(t, 11.3, 12.3), 2.25 + 0.6 * K.ph(t, 11.3, 12.3), -0.3);
        s.batN.g.visible = t >= 12.3; s.batN.g.position.set(-0.3, 2.25 + 0.6 * (1 - K.ph(t, 12.4, 13.4)), -0.3);
        cargaBateria(s, s.bat, 1, K.parpadeo(t, 2) ? s.rojo : s.oscuro);
        cargaBateria(s, s.batN, 3, corte ? s.amar : s.verde);
        s.tec.visible = K.entre(t, 10.6, 14.2); quieto(s.tec);
        apuntar(K, s.tec, s.tec.brazoD, [-0.3, 2.45, -0.3], K.ph(t, 10.8, 11.2) * (1 - K.ph(t, 13.4, 13.9)));
        apuntar(K, s.tec, s.tec.brazoI, [-0.3, 2.45, -0.3], K.ph(t, 10.8, 11.2) * (1 - K.ph(t, 13.4, 13.9)));
        // la persona aprieta la alarma: sin batería no suena; con la nueva, sí
        var p = s.pers; quieto(p);
        var aprieta = Math.max(K.ph(t, 6.6, 7.0) * (1 - K.ph(t, 8.6, 9.0)), K.ph(t, 15.4, 15.8) * (1 - K.ph(t, 16.8, 17.2)));
        apuntar(K, p, p.brazoD, enMundo(s.c.alarma), aprieta);
        s.c.alarma.position.x = aprieta > 0.95 ? 0.004 : 0.009;
        var suena = nueva && t >= 15.8;
        s.campana.poner(t, [0.35, 2.4, -0.3], suena, 0.3, 'y'); s.voz.poner(t, [0, 0, 0], false);
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        K.marcar(s.bat.cuerpo, t < 12.4 ? mal : null);
        K.marcar(s.batN.cuerpo, K.entre(t, 12.4, 14.3) ? 'foco' : null);
        K.marcar(s.sirena, suena ? 'foco' : null); K.marcar(s.c.rejilla, null);
        K.marcar(s.c.alarma, K.entre(t, 6.4, 10.5) ? mal : null);
        if (t < 4.5) K.rotulo('Batería gastada', [-0.3, 2.4, -0.3], 'izq');
        else if (t < 10.5) { if (t > 6.4) K.rotulo('La alarma no suena', enMundo(s.c.alarma), 'izq'); }
        else if (t < 14.3) K.rotulo(nueva ? 'Batería nueva' : 'Batería gastada', nueva ? [-0.3, 2.4, -0.3] : enMundo(s.bat.cuerpo), 'izq');
        else { if (emerg > 0.5) K.rotulo('Luz de emergencia', [0, 2.17, 0.56]); if (suena) K.rotulo('Sirena', [0.35, 2.38, -0.3]); }
        K.tabla([['BATERÍA', nueva ? 'NUEVA' : 'GASTADA', nueva ? 'ok' : 'mal'], ['LUZ EMERGENCIA', emerg > 0.5 ? 'PRENDIDA' : corte ? 'NO PRENDE' : 'APAGADA', emerg > 0.5 ? 'ok' : corte ? 'mal' : ''],
          ['ALARMA', suena ? 'SUENA' : corte && !nueva ? 'NO SUENA' : 'LISTA', suena ? 'ok' : corte && !nueva ? 'mal' : '']]);
        if (K.entre(t, 5.2, 10.6)) K.aviso('A oscuras y sin alarma');
        else if (t > 15.8) K.aviso('Batería nueva: todo funciona', false);
      }
    }
  });
  // luces de la cabina: normales, apagón (todo oscuro) y luz de emergencia
  function emergencia(s, K, corte, emerg) {
    var f = corte ? 0.16 : 1;
    s.luces.forEach(function (l) { l[0].intensity = l[1] * f; });
    s.c.leds.forEach(function (l) { l.material = corte ? s.apag : s.luz; });
    s.lumE.material = emerg > 0.5 ? s.luzE : s.apag;
    s.pl.intensity = 1.7 * emerg;
  }
})();
