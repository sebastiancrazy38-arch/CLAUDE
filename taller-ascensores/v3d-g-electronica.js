/* Taller de Ascensores — videos 3D: electrónica y cables (tablero, variador, botoneras, caja del techo,
   interruptor principal, rescate automático, cable viajero, cableado del hueco y sensores de posición).
   Mismo formato que v3d-maquina.js: construir(K) arma las piezas una vez; funciona/falla.anim(t, s, K, id)
   las mueve como función pura del tiempo; cam = [t, [posición], [a dónde mira]]; subt = subtítulos sencillos.
   Las señales y la corriente se ven como cuentas de luz que corren por los cables. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI;

  // ---------- textos sencillos de cada pieza ----------
  S.tablero_control = {
    que: 'Es un gabinete de metal con llave. Adentro hay tarjetas con lucecitas, interruptores grandes y la caja que mueve el motor.',
    sirve: 'Es el cerebro del ascensor: recibe las llamadas, revisa que todo esté seguro y manda mover la cabina.',
    falla: 'Si su fuente (la cajita que da corriente) se debilita, las luces parpadean, se reinicia y el ascensor se para.',
    arreglo: 'El técnico lee el código de la pantalla, mide la fuente y cambia la pieza malograda con la energía cortada.'
  };
  S.variador = {
    que: 'Es una caja electrónica con aletas de metal y un ventilador, unida al motor por un cable grueso.',
    sirve: 'Le da la fuerza al motor y regula su velocidad, para que la cabina arranque y frene suave.',
    falla: 'Si el ventilador se para o las aletas se llenan de polvo, se calienta y el ascensor se para en horas de calor.',
    arreglo: 'Con la energía cortada, se limpian las aletas y se cambia el ventilador. Solo lo abre un técnico.'
  };
  S.botonera_piso = {
    que: 'Es la placa con el botón para llamar al ascensor, al lado de la puerta de cada piso.',
    sirve: 'Al apretarla manda tu llamada al tablero, y el botón se queda prendido hasta que llega la cabina.',
    falla: 'Si su tarjeta o su botón se malogra, aprietas y no se prende: el ascensor no viene a ese piso.',
    arreglo: 'Se prueba llamar desde otro piso; luego se revisa el conector y se cambia el botón o la tarjeta de ese piso.'
  };
  S.botonera_cabina = {
    que: 'Es el panel dentro de la cabina con los números de los pisos, abrir y cerrar puerta, y la alarma.',
    sirve: 'Ahí marcas a qué piso vas. El botón se prende y la pantalla de arriba te dice el piso.',
    falla: 'Un botón gastado no se prende, o el de abrir puerta se queda hundido y la puerta no termina de cerrar.',
    arreglo: 'Con el ascensor detenido, se cambia el pulsador malogrado y se revisa su conector por detrás del panel.'
  };
  S.caja_techo = {
    que: 'Es una caja gris sobre el techo de la cabina. Ahí llega el cable viajero y se conectan los cables de la cabina.',
    sirve: 'Reparte la corriente a la puerta, la botonera, la luz y los sensores, y junta sus avisos para el tablero.',
    falla: 'Si un conector se afloja o le entra agua, fallan varias cosas de la cabina a la vez.',
    arreglo: 'Con el ascensor detenido, se ajustan conectores y bornes, se seca la caja y se le pone bien su tapa.'
  };
  S.interruptor_principal = {
    que: 'Es la llave general del ascensor: una caja con manija roja, al lado de la puerta del cuarto del tablero.',
    sirve: 'Con un giro corta la corriente del motor y del tablero. Se traba con candado para trabajar seguro.',
    falla: 'Si un borne (tornillo donde entra el cable) queda flojo, se calienta, huele a quemado y la llave salta.',
    arreglo: 'Con la luz cortada desde el tablero del edificio, el electricista ajusta o cambia los bornes quemados.'
  };
  S.rescate = {
    que: 'Es una caja con baterías, al lado del tablero, que se prende sola cuando se va la luz.',
    sirve: 'Si la cabina queda entre pisos por un apagón, la lleva despacio al piso más cercano y abre las puertas.',
    falla: 'Si las baterías están viejas no tienen fuerza: la cabina no llega al piso y la gente queda atrapada.',
    arreglo: 'El técnico prueba el rescate cortando la luz y cambia todas las baterías juntas cuando ya no cargan.'
  };
  S.cable_viajero = {
    que: 'Es un cable plano y ancho que cuelga en forma de U, entre la pared del hueco y la parte de abajo de la cabina.',
    sirve: 'Lleva la luz, los botones y las señales de seguridad entre la cabina y el tablero mientras la cabina viaja.',
    falla: 'De tanto doblarse, un hilo de adentro se parte: la luz parpadea o el ascensor se para y luego sigue.',
    arreglo: 'El técnico mide los hilos y pasa la señal a un hilo de reserva; si el forro está cuarteado, cambia el cable.'
  };
  S.cableado_hueco = {
    que: 'Es una canaleta con cables que sube por la pared del hueco, con una caja de conexiones en cada piso.',
    sirve: 'Une cada piso con el tablero: las botoneras, los indicadores y las cerraduras de las puertas.',
    falla: 'Si un borne se afloja o se moja en una caja, el tablero cree que hay una puerta abierta y no arranca.',
    arreglo: 'Con el ascensor detenido, se limpian y ajustan los bornes de esa caja y se le pone bien su tapa.'
  };
  S.posicionamiento = {
    que: 'Es un sensor en forma de U sobre la cabina y una placa de metal (o un imán) fija en cada piso del hueco.',
    sirve: 'Cuando la placa pasa por el sensor, el tablero sabe en qué piso está la cabina y dónde parar al ras.',
    falla: 'Si la placa de un piso se mueve, la cabina para más arriba o más abajo y queda un escalón.',
    arreglo: 'Con el ascensor detenido, se vuelve a poner la placa en su sitio y se ajusta bien.'
  };

  // ---------- utilidades ----------
  function mats(K) {
    return {
      verde: K.matB(0x3ccf7f), rojo: K.matB(0xff3b30), amar: K.matB(0xffc62b), azul: K.matB(0x4aa3ff), luz: K.matB(0xfff6dc), naranja: K.matB(0xff8a2a),
      apag: K.mat(0x59626b, { roughness: 0.5, metalness: 0.1 }), pcb: K.mat(0x1f6b45, { roughness: 0.6, metalness: 0.1 }),
      chip: K.mat(0x23272b, { roughness: 0.5 }), blancoP: K.mat(0xeceae4, { roughness: 0.6, metalness: 0 })
    };
  }
  function enMundo(K, o) { o.updateWorldMatrix(true, false); var v = K.v(); v.setFromMatrixPosition(o.matrixWorld); return [v.x, v.y, v.z]; }
  // escribe en un cartel solo cuando cambia el texto (pintar el lienzo cada cuadro es caro)
  function escribe(s, cartel, clave, txt, tinta, fondo) { var k = txt + '|' + (tinta || '') + '|' + (fondo || ''); if (s[clave] !== k) { cartel.escribir(txt, fondo, tinta); s[clave] = k; } }
  // camino por varios puntos: .en(k) da el punto a la fracción k (0 a 1) del largo
  function camino(pts) {
    var seg = [], L = 0;
    for (var i = 1; i < pts.length; i++) { var a = pts[i - 1], b = pts[i], d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]); seg.push([L, d, a, b]); L += d; }
    var fr = [0]; seg.forEach(function (g) { fr.push(L > 0 ? (g[0] + g[1]) / L : 0); });
    return {
      L: L, pts: pts, fr: fr,
      en: function (k) {
        var x = Math.max(0, Math.min(1, k)) * L;
        for (var i = 0; i < seg.length; i++) {
          var g = seg[i];
          if (x <= g[0] + g[1] || i === seg.length - 1) { var u = g[1] > 0 ? Math.max(0, Math.min(1, (x - g[0]) / g[1])) : 0; return [g[2][0] + (g[3][0] - g[2][0]) * u, g[2][1] + (g[3][1] - g[2][1]) * u, g[2][2] + (g[3][2] - g[2][2]) * u]; }
        }
        return pts[pts.length - 1];
      }
    };
  }
  // cuentas de luz que corren por un camino: .correr = flujo continuo; .viaje = un aviso que va una vez (k de 0 a 1)
  function cuentas(K, n, color, r) {
    var g = K.add(new K.T.Group()), m = K.matB(color);
    for (var i = 0; i < n; i++) g.add(K.esfera(r || 0.01, m));
    g.correr = function (c, t, vel, on, kMax) {
      g.visible = !!on; if (!on) return;
      g.children.forEach(function (b, i) { var k = ((t * vel / c.L) + i / n) % 1, p = c.en(k); b.position.set(p[0], p[1], p[2]); b.scale.setScalar(1); b.visible = kMax == null || k <= kMax; });
    };
    g.viaje = function (c, k, on) {
      g.visible = !!on; if (!on) return;
      g.children.forEach(function (b, i) {
        var kk = k - i * 0.03 / Math.max(0.3, c.L); b.visible = kk >= 0 && kk <= 1;
        var p = c.en(kk); b.position.set(p[0], p[1], p[2]); b.scale.setScalar(i ? Math.max(0.3, 1 - i / n) : 1.6);
      });
    };
    return g;
  }
  // mano con el índice estirado: la punta del dedo está en el origen y apunta a -z (gírala para otras paredes)
  function mano(K) {
    var piel = K.mat(0xd8a47f, { roughness: 0.8, metalness: 0 }), manga = K.mat(0x2e5f90, { roughness: 0.85, metalness: 0 });
    var g = K.add(new K.T.Group());
    g.add(K.cil(0.009, 0.07, piel, 0, 0, 0.035, 'z', 10), K.esfera(0.009, piel, 0, 0, 0));
    g.add(K.caja(0.075, 0.08, 0.035, piel, -0.02, -0.03, 0.1), K.caja(0.05, 0.03, 0.04, piel, -0.03, -0.045, 0.066));
    g.add(K.cil(0.034, 0.32, manga, -0.02, -0.03, 0.27, 'z', 12));
    return g;
  }
  // humo o vapor: bolitas que suben y se desvanecen
  function humo(K, n, color) {
    var g = K.add(new K.T.Group()), ms = [];
    for (var i = 0; i < n; i++) { var m = K.mat(color || 0x8a8f95, { transparent: true, opacity: 0.5, depthWrite: false, roughness: 1 }); ms.push(m); g.add(K.esfera(1, m)); }
    g.poner = function (t, pos, on, alto, tam) {
      g.visible = !!on; if (!on) return;
      g.position.set(pos[0], pos[1], pos[2]);
      g.children.forEach(function (b, i) {
        var k = (t * 0.6 + i / n) % 1;
        b.position.set(Math.sin(i * 2.1 + t) * 0.03, k * (alto || 0.3), Math.cos(i * 1.7) * 0.02);
        b.scale.setScalar((tam || 0.03) * (0.5 + k)); ms[i].opacity = 0.55 * (1 - k);
      });
    };
    return g;
  }
  // cartel con lienzo propio para dibujar (curva de velocidad, barras de carga)
  function pizarra(K, ancho, alto) {
    var cv = document.createElement('canvas'); cv.width = 320; cv.height = Math.round(320 * alto / ancho);
    var tex = new K.T.CanvasTexture(cv), o = new K.T.Mesh(new K.T.PlaneGeometry(ancho, alto), K.matB(0xffffff, { map: tex }));
    o.cv = cv; o.g = cv.getContext('2d'); o.tex = tex;
    return o;
  }
  // contactor: cuerpo gris con un carro al frente que se hunde al cerrar
  function contactor(K, s, x, y, z, nombre) {
    var g = K.add(new K.T.Group()); g.position.set(x, y, z);
    g.add(K.caja(0.07, 0.1, 0.08, K.mat(0x8f969c, { roughness: 0.5 }), 0, 0, 0));
    g.add(K.caja(0.07, 0.02, 0.06, K.M.negro, 0, 0.055, -0.005), K.caja(0.07, 0.02, 0.06, K.M.negro, 0, -0.055, -0.005));
    [-0.022, 0, 0.022].forEach(function (dx) { g.add(K.cil(0.006, 0.006, K.M.acero, dx, 0.067, 0.01, null, 8), K.cil(0.006, 0.006, K.M.acero, dx, -0.067, 0.01, null, 8)); });
    var ind = K.caja(0.022, 0.022, 0.004, K.M.negro, 0, 0, 0.008);
    var carro = K.grupo([K.caja(0.04, 0.04, 0.014, s.blancoP, 0, 0, 0), ind], 0, 0.005, 0.05);
    g.add(carro); g.carro = carro;
    var et = K.cartel(nombre, 0.04, 0.016, '#e8e8e8', '#1e2125'); et.position.set(0, -0.032, 0.0405); g.add(et);
    g.cerrar = function (k) { carro.position.z = 0.05 - 0.018 * k; ind.material = k > 0.5 ? s.naranja : K.M.negro; };
    return g;
  }
  // claves de cámara con vectores (igual que el motor) y cámara distinta según la pieza que se está viendo
  function kfv(K, t, a, out) {
    var i = 1, k = 0, p = a[0][1], q = a[0][1];
    if (t > a[0][0]) { for (; i < a.length; i++) if (t <= a[i][0]) break; if (i >= a.length) { p = q = a[a.length - 1][1]; } else { p = a[i - 1][1]; q = a[i][1]; k = K.ph(t, a[i - 1][0], a[i][0]); } }
    return out.set(p[0] + (q[0] - p[0]) * k, p[1] + (q[1] - p[1]) * k, p[2] + (q[2] - p[2]) * k);
  }
  function camaraDe(mapa) {
    return function (s, c, t, dur, pos, mira) {
      var k = (mapa[s.id] || mapa._)[c];
      kfv(s.K, t, k.map(function (x) { return [x[0], x[1]]; }), pos); kfv(s.K, t, k.map(function (x) { return [x[0], x[2]]; }), mira);
    };
  }
  // ondas de un «clac»: anillos que salen de un punto mirando a +z
  function ondas(K, n, color) {
    var g = K.add(new K.T.Group()), ms = [];
    for (var i = 0; i < n; i++) { var m = K.matB(color || 0xffc62b, { transparent: true, opacity: 0.8, depthWrite: false }); ms.push(m); g.add(K.toro(1, 0.05, m, 0, 0, 0)); }
    g.poner = function (t, pos, on, tam) {
      g.visible = !!on; if (!on) return;
      g.position.set(pos[0], pos[1], pos[2]);
      g.children.forEach(function (r, i) { var k = (t * 1.6 + i / n) % 1; r.scale.setScalar((tam || 0.05) * (0.3 + k)); ms[i].opacity = 0.9 * (1 - k); });
    };
    return g;
  }

  // =====================================================================================
  // 1) Tablero de control: se abre la puerta, llega una llamada, revisa seguridades y cierran los contactores
  // =====================================================================================
  // gabinete de 0.8 × 1.4 m apoyado en la pared (z = -0.22); su frente queda en z = 0.1
  var TB = { led: [0.0, 0.05, 0.1, 0.15, 0.2], cont: [-0.24, -0.15, -0.06] };
  function tableroBase(s, K) {
    s.msg.visible = false; s.fuerza.visible = false; s.fuerza2.visible = false; s.clac.visible = false;
    s.ledSeg.forEach(function (l) { l.material = s.apag; });
    s.cs.forEach(function (c) { c.cerrar(0); });
    s.fuente.position.set(-0.22, 1.33, -0.15); s.fuente.visible = true;
    s.multi.visible = false; s.puntas.forEach(function (p) { p.visible = false; });
    K.marcar([s.fuente, s.tarjeta, s.var, s.cs[0], s.cs[1], s.cs[2]], null);
  }
  V3.escena('ele-tablero', ['tablero_control'], {
    fov: 34, poster: 6.8,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      K.add(K.piso(2.6, 0xb9c1c8));
      K.add(K.caja(3.2, 2.6, 0.06, M.muro, 0, 1.3, -0.26));
      var gab = K.mat(0xcfcab9, { roughness: 0.7, metalness: 0.2 });
      K.add(K.caja(0.8, 1.4, 0.02, gab, 0, 0.8, -0.21));
      K.add(K.caja(0.02, 1.4, 0.32, gab, -0.39, 0.8, -0.06)); K.add(K.caja(0.02, 1.4, 0.32, gab, 0.39, 0.8, -0.06));
      K.add(K.caja(0.8, 0.02, 0.32, gab, 0, 1.49, -0.06)); K.add(K.caja(0.8, 0.02, 0.32, gab, 0, 0.11, -0.06));
      K.add(K.caja(0.74, 0.1, 0.26, M.hierro, 0, 0.05, -0.06));
      K.add(K.caja(0.72, 1.32, 0.008, K.mat(0xe4e6e8, { roughness: 0.6 }), 0, 0.8, -0.196));
      // puerta con bisagra a la izquierda
      s.puerta = K.add(new T.Group()); s.puerta.position.set(-0.4, 0.8, 0.1);
      s.puerta.add(K.caja(0.8, 1.4, 0.02, gab, 0.4, 0, 0.01), K.caja(0.025, 0.12, 0.03, M.negro, 0.74, 0, 0.035), K.cil(0.012, 0.01, M.acero, 0.74, 0.1, 0.022, 'z', 12));
      var pel = K.cartel('PELIGRO', 0.2, 0.06, '#f2b705', '#1e2125'); pel.position.set(0.4, 0.32, 0.021); s.puerta.add(pel);
      // canaletas grises
      [1.115, 0.86, 0.28].forEach(function (y) { K.add(K.caja(0.66, 0.04, 0.05, M.gris, 0, y, -0.17)); });
      K.add(K.caja(0.04, 0.82, 0.05, M.gris, -0.33, 0.69, -0.17));
      // fuente de 24 V
      s.fuente = K.add(K.grupo([K.caja(0.15, 0.12, 0.08, M.acero, 0, 0, 0)], -0.22, 1.33, -0.15));
      for (var i = 0; i < 5; i++) s.fuente.add(K.caja(0.1, 0.006, 0.002, M.negro, 0.0, 0.04 - i * 0.014, 0.041));
      var e24 = K.cartel('24 V', 0.05, 0.022, '#1e2125', '#ffc62b'); e24.position.set(-0.045, -0.04, 0.0415); s.fuente.add(e24);
      s.ledF = K.esfera(0.007, s.verde, 0.055, -0.04, 0.041); s.fuente.add(s.ledF);
      s.bornesF = [K.cil(0.007, 0.01, M.acero, 0.02, -0.04, 0.042, 'z', 10), K.cil(0.007, 0.01, M.acero, 0.036, -0.04, 0.042, 'z', 10)];
      s.bornesF.forEach(function (b) { s.fuente.add(b); });
      // tarjeta principal con pantalla y luces
      s.tarjeta = K.add(K.grupo([K.caja(0.34, 0.26, 0.012, s.pcb, 0, 0, 0)], 0.12, 1.28, -0.185));
      s.pant = K.cartel('OK P1', 0.16, 0.05, '#0d1418', '#3ccf7f'); s.pant.position.set(-0.06, 0.07, 0.008); s.tarjeta.add(s.pant);
      [[0.09, 0.07, 0.07, 0.05], [0.09, -0.02, 0.05, 0.05], [-0.1, -0.02, 0.06, 0.035]].forEach(function (c) { s.tarjeta.add(K.caja(c[2], c[3], 0.008, s.chip, c[0], c[1], 0.01)); });
      for (var j = 0; j < 5; j++) s.tarjeta.add(K.caja(0.04, 0.018, 0.016, s.blancoP, -0.13 + j * 0.065, -0.115, 0.012));
      s.ledVida = K.esfera(0.007, s.verde, 0.03, 0.07, 0.01); s.tarjeta.add(s.ledVida);
      s.ledLl = K.esfera(0.007, s.apag, 0.03, 0.04, 0.01); s.tarjeta.add(s.ledLl);
      s.ledSeg = TB.led.map(function (x) { var l = K.esfera(0.009, s.apag, x - 0.12 - 0.04, -0.072, 0.012); s.tarjeta.add(l); return l; });
      // contactores en su riel
      K.add(K.caja(0.36, 0.035, 0.012, M.acero, -0.15, 0.98, -0.186));
      s.cs = TB.cont.map(function (x, i) { return contactor(K, s, x, 0.98, -0.14, 'K' + (i + 1)); });
      // variador chico abajo a la derecha, con su ventilador
      s.var = K.add(K.grupo([K.caja(0.2, 0.3, 0.13, K.mat(0x3b4148, { roughness: 0.5 }), 0, 0, 0)], 0.17, 0.6, -0.125));
      for (var f = 0; f < 6; f++) s.var.add(K.caja(0.006, 0.28, 0.04, M.acero, -0.085 + f * 0.034, 0, -0.08));
      s.var.add(K.caja(0.12, 0.12, 0.006, M.negro, 0, -0.07, 0.066));
      s.aspa = K.grupo([], 0, -0.07, 0.072); s.var.add(s.aspa);
      for (var a = 0; a < 5; a++) { var bl = K.caja(0.05, 0.016, 0.003, M.gris, 0.026, 0, 0); var p = K.grupo([bl]); p.rotation.z = a * 2 * PI / 5; s.aspa.add(p); }
      s.aspa.add(K.cil(0.012, 0.008, M.hierro, 0, 0, 0.002, 'z', 12));
      var pv = K.cartel('50 Hz', 0.08, 0.028, '#0d1418', '#4aa3ff'); pv.position.set(0, 0.08, 0.066); s.var.add(pv); s.pantVar = pv;
      // borneras con cables que salen por abajo
      var colores = [0x2e5f90, 0xd03a2c, 0x1e2125, 0xf2b705, 0x2e7a5c, 0xb9743a];
      for (var b = 0; b < 12; b++) {
        var x = -0.28 + b * 0.022;
        K.add(K.caja(0.018, 0.045, 0.04, b % 4 === 3 ? M.amarillo : K.mat(0x8a96a3, { roughness: 0.6 }), x, 0.36, -0.17));
        K.add(K.cil(0.003, 0.24, K.mat(colores[b % 6]), x, 0.215, -0.16, null, 6));
      }
      // caminos de las señales y de la fuerza
      s.cLlamada = camino([[-0.24, 0.04, -0.12], [-0.24, 0.36, -0.13], [-0.33, 0.4, -0.13], [-0.33, 1.115, -0.13], [0.02, 1.115, -0.13], [0.02, 1.165, -0.17]]);
      s.cFuerza = camino([[-0.24, 0.92, -0.1], [-0.24, 0.86, -0.13], [0.17, 0.86, -0.13], [0.17, 0.76, -0.1]]);
      s.cFuerza2 = camino([[0.17, 0.45, -0.1], [0.17, 0.3, -0.13], [0.3, 0.28, -0.13], [0.3, 0.02, -0.12]]);
      s.msg = cuentas(K, 6, 0x4aa3ff, 0.016);
      s.fuerza = cuentas(K, 8, 0xff8a2a, 0.009); s.fuerza2 = cuentas(K, 8, 0xff8a2a, 0.009);
      s.clac = ondas(K, 3, 0xffc62b);
      // multímetro para el arreglo
      s.multi = K.add(K.grupo([K.caja(0.085, 0.15, 0.03, K.mat(0xf2b705, { roughness: 0.6 }), 0, 0, 0), K.cil(0.022, 0.01, M.negro, 0, -0.035, 0.016, 'z', 16)], -0.27, 1.1, 0.13));
      s.pantMul = K.cartel('17.2 V', 0.07, 0.03, '#c9d6c4', '#1e2125'); s.pantMul.position.set(0, 0.04, 0.016); s.multi.add(s.pantMul);
      s.puntas = [K.add(K.cable(0.003, s.rojo)), K.add(K.cable(0.003, K.matB(0x111111)))];
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El tablero es el cerebro del ascensor. Es un gabinete con llave y adentro están sus tarjetas.'],
        [4, 'La tarjeta principal recibe las llamadas de los botones y sabe en qué piso está la cabina.'],
        [8.5, 'Antes de mover nada, revisa que todas las puertas y seguridades estén cerradas: sus luces se ponen verdes.'],
        [12.5, 'Recién ahí los contactores, unos interruptores grandes, se cierran con un «clac» y el variador mueve el motor.']],
      cam: [[0, [1.3, 1.25, 2.7], [0, 0.85, -0.05]], [3.2, [0.9, 1.2, 2.1], [0, 0.88, -0.1]], [4.6, [0.75, 0.98, 1.95], [-0.08, 0.76, -0.15]],
        [6.6, [0.42, 1.32, 1.0], [0.02, 1.2, -0.17]], [8.4, [0.38, 1.36, 0.88], [0.04, 1.23, -0.17]], [12.2, [0.38, 1.36, 0.9], [0.04, 1.22, -0.17]],
        [13.6, [0.6, 1.0, 1.5], [-0.03, 0.82, -0.14]], [18, [0.75, 0.95, 1.85], [0.0, 0.72, -0.13]]],
      anim: function (t, s, K) {
        tableroBase(s, K);
        s.puerta.rotation.y = -1.95 * K.ph(t, 0.8, 3.0);
        s.ledVida.material = K.parpadeo(t, 1) ? s.verde : s.apag;
        // la llamada sube desde las borneras hasta la tarjeta
        var kl = K.cl((t - 4.6) / 2.0), llamada = t >= 6.6;
        s.msg.viaje(s.cLlamada, kl, K.entre(t, 4.6, 6.7));
        s.ledLl.material = llamada ? s.amar : s.apag;
        // seguridades: se prenden una por una
        var nSeg = 0; s.ledSeg.forEach(function (l, i) { if (t > 9.0 + i * 0.5) { l.material = s.verde; nSeg++; } });
        var segOk = nSeg === 5;
        // contactores y fuerza al motor
        var k1 = K.ph(t, 12.8, 12.9), k2 = K.ph(t, 13.1, 13.2), mueve = t > 13.3;
        s.cs[0].cerrar(k1); s.cs[1].cerrar(k2);
        s.clac.poner(t, [-0.195, 0.98, -0.08], K.entre(t, 12.8, 14.2), 0.07);
        s.fuerza.correr(s.cFuerza, t, 0.25, mueve); s.fuerza2.correr(s.cFuerza2, t, 0.25, mueve);
        s.aspa.rotation.z = -K.integ(function (x) { return x > 13.3 ? 14 : 0; }, t);
        escribe(s, s.pant, 'tp', t < 6.6 ? 'OK P1' : t < 12.5 ? 'LLAMA 3' : 'SUBE 3', t < 6.6 ? '#3ccf7f' : '#ffc62b');
        escribe(s, s.pantVar, 'tv', mueve ? '50 Hz' : '0 Hz', '#4aa3ff');
        K.marcar(s.tarjeta, K.entre(t, 6.6, 8.5) && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar([s.cs[0], s.cs[1]], K.entre(t, 12.8, 15) ? 'foco' : null);
        K.marcar(s.var, K.entre(t, 15, 18) ? 'foco' : null);
        if (t < 3.2) K.rotulo('Tablero de control', [0.3, 1.25, 0.12]);
        else if (t < 4.6) { K.rotulo('Tarjeta principal', [0.2, 1.4, -0.18]); K.rotulo('Fuente 24 V', [-0.25, 1.39, -0.12], 'izq'); K.rotulo('Contactores', [-0.15, 1.03, -0.1]); }
        else if (t < 8.5) { if (t < 6.6) K.rotulo('Llamada de un botón', s.msg.children[0], 'izq'); else K.rotulo('Llamada anotada', [0.03, 1.32, -0.17], 'izq'); }
        else if (t < 12.5) K.rotulo('Luces de seguridad', s.ledSeg[2]);
        else { K.rotulo(t < 14.2 ? '¡Clac!' : 'Contactores cerrados', [-0.195, 1.03, -0.1], 'izq'); if (t > 14.6) { K.rotulo('Variador', [0.25, 0.72, -0.06]); K.rotulo('Al motor', [0.3, 0.1, -0.12]); } }
        K.tabla([['LLAMADA', llamada ? 'PISO 3' : 'NINGUNA', llamada ? 'ac' : ''], ['SEGURIDADES', segOk ? 'TODO CERRADO' : t > 8.8 ? 'REVISANDO' : '…', segOk ? 'ok' : 'ac'], ['MOTOR', mueve ? 'EN MARCHA' : 'QUIETO', mueve ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: la fuente de 24 voltios está débil. Las luces de la tarjeta parpadean y la pantalla se apaga.'],
        [4.5, 'El tablero se reinicia a cada rato: no toma llamadas y muestra errores que no tienen sentido.'],
        [9, 'Falla 2: un contactor se quedó pegado. El tablero lo nota y bloquea el ascensor por seguridad.'],
        [14, 'Arreglo: medir la fuente con el multímetro y, con la energía cortada, cambiar la fuente o el contactor malogrado.']],
      cam: [[0, [0.15, 1.38, 0.95], [-0.02, 1.27, -0.17]], [8.6, [0.15, 1.38, 0.95], [-0.02, 1.27, -0.17]], [9.6, [0.12, 1.12, 0.62], [-0.12, 0.99, -0.14]],
        [13.6, [0.12, 1.12, 0.62], [-0.12, 0.99, -0.14]], [14.8, [0.1, 1.2, 1.15], [-0.12, 1.12, -0.12]], [19, [0.14, 1.2, 1.2], [-0.12, 1.1, -0.12]]],
      anim: function (t, s, K) {
        tableroBase(s, K);
        s.puerta.rotation.y = -1.95;
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        if (t < 9) {
          // fuente débil: todo parpadea y la tarjeta se reinicia
          var r = K.ruido(Math.floor(t * 7)), ciclo = t % 3;
          var on = r > 0.35;
          s.ledF.material = on ? s.verde : s.apag; s.ledVida.material = on && K.parpadeo(t, 3) ? s.verde : s.apag;
          s.ledSeg.forEach(function (l, i) { l.material = on && K.ruido(i + Math.floor(t * 5)) > 0.4 ? s.amar : s.apag; });
          s.ledLl.material = s.apag;
          var txt = ciclo < 1.4 ? 'ERR 31' : ciclo < 2.1 ? '' : 'INI...';
          escribe(s, s.pant, 'tp', on ? txt : '', ciclo < 1.4 ? '#ff5a3c' : '#ffc62b');
          escribe(s, s.pantVar, 'tv', '0 Hz', '#4aa3ff');
          K.marcar(s.fuente, mal);
          K.rotulo('Fuente débil', [-0.25, 1.39, -0.12], 'izq');
          if (t > 4.5) K.rotulo('Se reinicia', [0.0, 1.38, -0.17]);
          K.tabla([['FUENTE', '17 V (debe dar 24)', 'mal'], ['TARJETA', ciclo < 2.1 ? 'ERROR' : 'REINICIANDO', 'mal'], ['LLAMADAS', 'NO LAS TOMA', 'mal']]);
          if (t > 5) K.aviso('Errores sin sentido');
        } else if (t < 14) {
          // contactor pegado: K1 abre y K2 se queda cerrado
          s.ledF.material = s.verde; s.ledVida.material = K.parpadeo(t, 1) ? s.verde : s.apag;
          s.ledSeg.forEach(function (l) { l.material = s.verde; });
          s.cs[0].cerrar(1 - K.ph(t, 10.0, 10.1)); s.cs[1].cerrar(1); s.cs[2].cerrar(0);
          escribe(s, s.pant, 'tp', t < 10.2 ? 'PARA' : 'ERR K2', t < 10.2 ? '#ffc62b' : '#ff5a3c');
          escribe(s, s.pantVar, 'tv', '0 Hz', '#4aa3ff');
          K.marcar(s.cs[1], t > 10.2 ? mal : null);
          K.rotulo(t < 10.2 ? 'La cabina llegó: abren' : 'K2 no abre: pegado', [-0.15, 1.03, -0.1], 'izq');
          K.tabla([['K1', t < 10.1 ? 'CERRADO' : 'ABIERTO', 'ok'], ['K2', 'SIGUE CERRADO', t > 10.2 ? 'mal' : ''], ['ASCENSOR', t > 10.2 ? 'BLOQUEADO' : 'PARANDO', t > 10.2 ? 'mal' : '']]);
          if (t > 10.6) K.aviso('Contactor pegado: ascensor bloqueado');
        } else {
          // arreglo: medir la fuente, cambiarla y cambiar el contactor
          var cambio = t >= 16.2;
          s.ledF.material = cambio ? s.verde : (K.ruido(Math.floor(t * 7)) > 0.35 ? s.verde : s.apag);
          s.ledVida.material = K.parpadeo(t, 1) ? s.verde : s.apag;
          s.ledSeg.forEach(function (l) { l.material = cambio ? s.verde : s.apag; });
          var sale = K.ph(t, 15.3, 15.8) - K.ph(t, 16.0, 16.5);
          s.fuente.position.z = -0.15 + 0.25 * sale;
          s.cs[1].cerrar(0);
          s.multi.visible = true; s.puntas.forEach(function (p) { p.visible = sale < 0.05; });
          var fz = s.fuente.position.z;
          s.puntas[0].pon([-0.25, 1.03, 0.14], [-0.184, 1.29, fz + 0.045]); s.puntas[1].pon([-0.29, 1.03, 0.14], [-0.2, 1.29, fz + 0.045]);
          escribe(s, s.pantMul, 'tm', cambio ? '24.0 V' : '17.2 V', cambio ? '#1e6b3a' : '#b0281c', '#c9d6c4');
          escribe(s, s.pant, 'tp', cambio ? 'OK P1' : '', '#3ccf7f');
          escribe(s, s.pantVar, 'tv', '0 Hz', '#4aa3ff');
          K.marcar(s.fuente, cambio ? 'foco' : mal);
          K.marcar(s.cs[1], cambio ? 'foco' : null);
          K.rotulo('Multímetro', [-0.3, 1.04, 0.15], 'izq');
          K.rotulo(cambio ? 'Fuente nueva' : 'Fuente vieja', [-0.15, 1.4, fz], 'der');
          if (cambio) K.rotulo('Contactor nuevo', [-0.15, 1.03, -0.1]);
          K.tabla([['FUENTE', cambio ? '24 V' : '17 V', cambio ? 'ok' : 'mal'], ['ENERGÍA', K.entre(t, 15.2, 16.6) ? 'CORTADA' : 'CON TENSIÓN', K.entre(t, 15.2, 16.6) ? 'ac' : '']]);
          if (t > 17) K.aviso('Tablero normal otra vez', false);
        }
      }
    }
  });

  // =====================================================================================
  // 2) Variador: le da fuerza al motor, arranca y frena suave; el ventilador y las aletas lo enfrían
  // =====================================================================================
  // velocidad de la cabina (0 a 1) en un viaje que empieza en a: sube suave, va pareja y frena suave
  function viaje(t, a) { return K0.ph(t, a, a + 2.4) * (1 - K0.ph(t, a + 5.4, a + 7.8)); }
  var K0 = { ph: function (t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = Math.max(0, Math.min(1, (t - a) / (b - a))); return x * x * (3 - 2 * x); } };
  function curva(s, K, t, vel, desde, hasta, color) {
    var p = s.curva, g = p.g, w = p.cv.width, h = p.cv.height, clave = Math.round(t * 15) + color;
    if (s.curvaK === clave) return; s.curvaK = clave;
    g.fillStyle = '#10181e'; g.fillRect(0, 0, w, h);
    g.strokeStyle = '#33414c'; g.lineWidth = 2; g.beginPath(); g.moveTo(24, 12); g.lineTo(24, h - 22); g.lineTo(w - 10, h - 22); g.stroke();
    g.fillStyle = '#9fb0bd'; g.font = '600 18px sans-serif'; g.fillText('velocidad', 32, 26); g.fillText('tiempo', w - 76, h - 4);
    function xy(x) { return [24 + (x - desde) / (hasta - desde) * (w - 40), h - 24 - vel(x) * (h - 56)]; }
    g.strokeStyle = '#2a3640'; g.lineWidth = 3; g.beginPath();
    for (var i = 0; i <= 60; i++) { var x = desde + (hasta - desde) * i / 60, q = xy(x); if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }
    g.stroke();
    var fin = Math.max(desde, Math.min(hasta, t));
    g.strokeStyle = color; g.lineWidth = 5; g.beginPath();
    for (var j = 0; j <= 60; j++) { var x2 = desde + (fin - desde) * j / 60, q2 = xy(x2); if (j) g.lineTo(q2[0], q2[1]); else g.moveTo(q2[0], q2[1]); }
    g.stroke();
    var d = xy(fin); g.fillStyle = color; g.beginPath(); g.arc(d[0], d[1], 8, 0, PI * 2); g.fill();
    p.tex.needsUpdate = true;
  }
  function variadorBase(s, K) {
    s.polvo.visible = false; s.calor.visible = false; s.aire.forEach(function (f) { f.visible = false; });
    s.aletaM.color.setHex(0xaab3bb); s.aletaM.emissive.setHex(0x000000);
    s.aspas.visible = true; s.aspasN.visible = false;
    K.marcar([s.aspas, s.aspasN, s.aletas, s.caja], null);
  }
  V3.escena('ele-variador', ['variador'], {
    fov: 34, poster: 7,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      K.add(K.piso(2.6, 0xb9c1c8));
      K.add(K.caja(3.2, 2.4, 0.05, M.muro, 0, 1.2, -0.36));
      // el variador colgado en la pared
      s.caja = K.add(K.grupo([K.caja(0.3, 0.5, 0.16, K.mat(0x3b4148, { roughness: 0.5 }), 0, 0, 0)], -0.5, 1.1, -0.2));
      s.caja.add(K.caja(0.3, 0.5, 0.04, M.hierro, 0, 0, -0.1));
      s.pant = K.cartel('0 Hz', 0.13, 0.05, '#0d1418', '#4aa3ff'); s.pant.position.set(0, 0.16, 0.081); s.caja.add(s.pant);
      [-0.05, 0, 0.05].forEach(function (x) { s.caja.add(K.cil(0.012, 0.008, M.gris, x, 0.09, 0.082, 'z', 12)); });
      s.led = K.esfera(0.008, s.verde, 0.11, 0.2, 0.082); s.caja.add(s.led);
      var et = K.cartel('VARIADOR', 0.16, 0.035, '#e6e8ea', '#1e2125'); et.position.set(0, 0.035, 0.081); s.caja.add(et);
      // ventilador al frente, abajo
      s.caja.add(K.caja(0.15, 0.15, 0.01, M.negro, 0, -0.13, 0.083), K.toro(0.065, 0.004, M.gris, 0, -0.13, 0.09));
      s.aspas = K.grupo([], 0, -0.13, 0.092); s.caja.add(s.aspas);
      for (var a = 0; a < 5; a++) { var p = K.grupo([K.caja(0.058, 0.022, 0.004, M.gris, 0.032, 0, 0)]); p.rotation.z = a * 2 * PI / 5; p.children[0].rotation.x = 0.4; s.aspas.add(p); }
      s.aspas.add(K.cil(0.016, 0.01, M.hierro, 0, 0, 0.003, 'z', 14));
      s.aspasN = K.grupo([], 0, -0.13, 0.092); s.caja.add(s.aspasN);
      for (var a2 = 0; a2 < 5; a2++) { var p2 = K.grupo([K.caja(0.058, 0.022, 0.004, K.mat(0x2e5f90), 0.032, 0, 0)]); p2.rotation.z = a2 * 2 * PI / 5; p2.children[0].rotation.x = 0.4; s.aspasN.add(p2); }
      s.aspasN.add(K.cil(0.016, 0.01, M.hierro, 0, 0, 0.003, 'z', 14));
      // aletas del disipador a la derecha
      s.aletaM = K.mat(0xaab3bb, { metalness: 0.5, roughness: 0.35 });
      s.aletas = K.grupo([], -0.315, 1.1, -0.2); K.add(s.aletas);
      s.aletas.add(K.caja(0.02, 0.48, 0.16, s.aletaM, -0.06, 0, 0));
      for (var f = 0; f < 8; f++) s.aletas.add(K.caja(0.08, 0.48, 0.006, s.aletaM, 0, 0, -0.07 + f * 0.02));
      // polvo pegado en las aletas (solo en la falla)
      s.polvo = K.add(new T.Group()); var gp = K.mat(0x6e6250, { roughness: 1, metalness: 0 });
      for (var d = 0; d < 30; d++) {
        var fr = d % 3 === 0, pz = fr ? -0.128 : -0.27 + K.ruido(d * 5.7) * 0.14, px = fr ? -0.315 + (K.ruido(d * 2.3) - 0.5) * 0.07 : -0.272;
        s.polvo.add(K.caja(fr ? 0.03 : 0.012, 0.018 + K.ruido(d) * 0.02, fr ? 0.012 : 0.03, gp, px, 0.89 + K.ruido(d * 3.1) * 0.42, pz));
      }
      // cables: entrada de la red por arriba y salida al motor por abajo
      var negro = K.mat(0x1b1d20, { roughness: 0.7 });
      K.add(K.tubo([[-0.55, 1.35, -0.2], [-0.55, 1.6, -0.22], [-0.55, 2.3, -0.3]], 0.016, negro));
      K.add(K.tubo([[-0.45, 0.85, -0.2], [-0.45, 0.45, -0.24], [-0.3, 0.06, -0.24], [0.15, 0.04, -0.2], [0.3, 0.1, -0.1], [0.3, 0.22, -0.02]], 0.018, K.mat(0xd9772b, { roughness: 0.6 })));
      s.cRed = camino([[-0.55, 2.3, -0.3], [-0.55, 1.6, -0.22], [-0.55, 1.36, -0.2]].map(function (q) { return [q[0], q[1], q[2] + 0.025]; }));
      s.cMotor = camino([[-0.45, 0.85, -0.18], [-0.45, 0.45, -0.22], [-0.3, 0.07, -0.22], [0.15, 0.06, -0.18], [0.3, 0.12, -0.08], [0.3, 0.24, 0.0]]);
      s.red = cuentas(K, 6, 0xffc62b, 0.012); s.fuerza = cuentas(K, 9, 0xff8a2a, 0.013);
      // el motor (máquina) con su polea
      K.add(K.caja(0.5, 0.06, 0.5, M.hierro, 0.45, 0.03, 0.0));
      K.add(K.cil(0.24, 0.36, M.aceroOsc, 0.45, 0.32, -0.1, 'z', 36));
      K.add(K.caja(0.12, 0.1, 0.1, M.hierro, 0.3, 0.27, 0.02));
      s.polea = K.add(K.polea(0.2, 0.1, M.acero, M.hierro)); s.polea.position.set(0.45, 0.32, 0.14);
      [-0.03, 0, 0.03].forEach(function (z) { K.add(K.cil(0.006, 1.7, M.hierro, 0.26, 1.17, 0.14 + z, null, 6)); K.add(K.cil(0.006, 1.7, M.hierro, 0.64, 1.17, 0.14 + z, null, 6)); });
      // curva de velocidad en la pared
      s.curva = K.add(pizarra(K, 0.5, 0.28)); s.curva.position.set(-0.04, 1.62, -0.33);
      // aire caliente que sale por arriba de las aletas
      s.aire = [0, 1, 2].map(function () { return K.add(K.flecha(0xff8a2a, 0.008)); });
      s.calor = humo(K, 8, 0xff7a3a);
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El variador es la caja que le da fuerza al motor. Toma la luz del edificio y se la entrega a la medida.'],
        [4.5, 'Arranca despacito, acelera, viaja parejo y frena suave. Así la cabina no da tirones.'],
        [9.5, 'Al trabajar se calienta. Sus aletas de metal y su ventilador le sacan el calor.'],
        [13.8, 'El tablero le dice a dónde ir; el variador pone la fuerza justa en cada momento.']],
      cam: [[0, [0.55, 1.3, 2.75], [-0.08, 0.92, -0.12]], [4.5, [0.8, 1.25, 2.75], [0.0, 0.9, -0.12]], [9.3, [0.8, 1.25, 2.7], [0.0, 0.9, -0.12]],
        [10.6, [0.25, 1.3, 1.0], [-0.42, 1.05, -0.2]], [13.6, [0.2, 1.3, 0.95], [-0.42, 1.05, -0.2]], [18, [0.65, 1.3, 2.8], [-0.02, 0.9, -0.12]]],
      anim: function (t, s, K) {
        variadorBase(s, K);
        var vel = function (x) { return viaje(x, 4.8) + viaje(x, 13.0) * 0.999; };
        var v = vel(t), giro = K.integ(function (x) { return vel(x) * 3; }, t);
        s.polea.rotation.z = -giro;
        s.red.correr(s.cRed, t, 0.35, true);
        s.fuerza.correr(s.cMotor, t, 0.2 + v * 0.9, v > 0.02);
        s.aspas.rotation.z = -t * 16;
        curva(s, K, t, vel, 4, 18, '#3ccf7f');
        escribe(s, s.pant, 'tp', Math.round(v * 50) + ' Hz', '#4aa3ff');
        var ventila = t > 9.5;
        s.aire.forEach(function (f, i) { f.visible = ventila; var k = (t * 0.8 + i / 3) % 1; f.apuntar([-0.335 + (i - 1) * 0.02, 1.36 + k * 0.12, -0.2 + (i - 1) * 0.05], [-0.335 + (i - 1) * 0.02, 1.48 + k * 0.12, -0.2 + (i - 1) * 0.05]); });
        K.marcar(s.caja.children[0], t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar([s.aletas, s.aspas], K.entre(t, 9.5, 13.8) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Variador', [-0.5, 1.38, -0.12]); K.rotulo('Luz del edificio', [-0.55, 1.9, -0.25], 'izq'); K.rotulo('Cable al motor', s.cMotor.en(0.55)); }
        else if (t < 9.5) { K.rotulo('Velocidad', [0.2, 1.74, -0.33]); K.rotulo('Motor', [0.5, 0.58, -0.05]); }
        else if (t < 13.8) { K.rotulo('Aletas', [-0.27, 1.25, -0.13]); K.rotulo('Ventilador', [-0.5, 0.97, -0.1], 'izq'); K.rotulo('Aire caliente', [-0.33, 1.5, -0.2]); }
        else { K.rotulo('Variador', [-0.5, 1.38, -0.12]); K.rotulo('Motor', [0.5, 0.58, -0.05]); }
        K.tabla([['VELOCIDAD', (v * 1.0).toFixed(1) + ' m/s', v > 0.02 ? 'ok' : ''], ['ARRANQUE', v > 0.02 && v < 0.98 ? 'SUAVE' : v >= 0.98 ? 'PAREJO' : 'QUIETO', v > 0.02 ? 'ac' : ''], ['VENTILADOR', 'GIRA', 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: el ventilador se paró y las aletas se llenaron de polvo. El calor ya no sale.'],
        [4.5, 'El variador se calienta cada vez más. Para cuidarse, se apaga y el ascensor se queda parado.'],
        [9.5, 'Cuando se enfría vuelve a andar solo. Por eso falla en las horas de calor o de mucho uso.'],
        [14, 'Arreglo: con la energía cortada, limpiar las aletas con aire seco y cambiar el ventilador malogrado.']],
      cam: [[0, [0.25, 1.25, 0.95], [-0.42, 1.03, -0.2]], [4.4, [0.3, 1.25, 1.05], [-0.42, 1.03, -0.2]], [6.0, [0.7, 1.15, 2.6], [-0.05, 0.98, -0.12]],
        [13.6, [0.75, 1.15, 2.6], [-0.05, 0.98, -0.12]], [15, [0.25, 1.25, 0.95], [-0.42, 1.03, -0.2]], [19, [0.3, 1.25, 1.0], [-0.42, 1.03, -0.2]]],
      anim: function (t, s, K) {
        variadorBase(s, K);
        // temperatura: sube sin ventilador, corta a los 90 °C, baja y vuelve; con el arreglo queda en 45 °C
        var temp = K.kf(t, [[0, 48], [4.5, 62], [8, 90], [12.5, 70], [14, 74], [17, 45]]);
        var corta = K.entre(t, 8, 12.5), arreglo = t >= 16.2;
        // al cortar, la cabina se para de golpe: sin rampa (es la falla)
        var vel2 = function (x) { return x < 8 ? 1 : x < 12.5 ? 0 : x < 14.2 ? K.ph(x, 12.6, 13.6) : x < 16.4 ? 1 - K.ph(x, 14.2, 15.0) : K.ph(x, 16.6, 17.8); };
        var v = vel2(t), giro = K.integ(function (x) { return vel2(x) * 3; }, t);
        s.polea.rotation.z = -giro;
        s.red.correr(s.cRed, t, 0.35, !K.entre(t, 15.2, 16.4));
        s.fuerza.correr(s.cMotor, t, 0.2 + v * 0.9, v > 0.02);
        // ventilador: se frena y se para; en el arreglo lo cambian por uno nuevo (azul)
        var aspaGiro = K.integ(function (x) { return x < 0.3 ? 16 : x < 2.5 ? 16 * (1 - K.ph(x, 0.3, 2.5)) : 0; }, t);
        s.aspas.rotation.z = -aspaGiro;
        s.aspas.visible = !arreglo; s.aspasN.visible = arreglo; s.aspasN.rotation.z = -t * 16;
        // polvo y aletas calientes
        var limpio = K.ph(t, 15.2, 16.0);
        s.polvo.visible = limpio < 1; s.polvo.children.forEach(function (o, i) { o.scale.setScalar(1 - limpio); });
        var k = K.cl((temp - 50) / 40);
        s.aletaM.color.setRGB(0.67 + 0.33 * k, 0.70 - 0.35 * k, 0.73 - 0.5 * k);
        s.aletaM.emissive.setRGB(0.5 * k, 0.08 * k, 0);
        s.calor.poner(t, [-0.32, 1.36, -0.2], temp > 65 && !arreglo, 0.3, 0.035);
        if (arreglo) s.aire.forEach(function (f, i) { f.visible = true; var q = (t * 0.8 + i / 3) % 1; f.apuntar([-0.335 + (i - 1) * 0.02, 1.36 + q * 0.12, -0.2 + (i - 1) * 0.05], [-0.335 + (i - 1) * 0.02, 1.48 + q * 0.12, -0.2 + (i - 1) * 0.05]); });
        escribe(s, s.pant, 'tp', corta ? 'CALOR' : Math.round(v * 50) + ' Hz', corta ? '#ff5a3c' : '#4aa3ff');
        curva(s, K, t, function (x) { return K.cl(vel2(x)); }, 0, 19, corta ? '#ff5a3c' : '#3ccf7f');
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        if (t < 4.5) { K.marcar(s.aspas, mal); K.rotulo('Ventilador parado', [-0.5, 0.97, -0.1], 'izq'); K.rotulo('Polvo en las aletas', [-0.29, 1.2, -0.12]); }
        else if (t < 14) { K.marcar(s.caja.children[0], corta ? mal : null); if (corta) K.rotulo('Se apagó por calor', [-0.5, 1.38, -0.12]); else K.rotulo('Muy caliente', [-0.3, 1.36, -0.15]); if (t > 12.6) K.rotulo('Vuelve solo', [0.5, 0.58, -0.05]); }
        else { K.marcar([s.aspasN, s.aletas], arreglo ? 'foco' : null); K.rotulo(arreglo ? 'Ventilador nuevo' : 'Limpiando aletas', arreglo ? [-0.5, 0.97, -0.1] : [-0.29, 1.2, -0.12], 'izq'); }
        K.tabla([['TEMPERATURA', Math.round(temp) + ' °C', temp > 75 ? 'mal' : temp > 60 ? 'ac' : 'ok'], ['VENTILADOR', arreglo ? 'NUEVO, GIRA' : 'PARADO', arreglo ? 'ok' : 'mal'], ['ASCENSOR', corta ? 'PARADO' : K.entre(t, 15.2, 16.4) ? 'SIN ENERGÍA' : v > 0.02 ? 'VIAJA' : 'QUIETO', corta ? 'mal' : '']]);
        if (corta) K.aviso('Variador muy caliente: se apagó');
        if (t > 17) K.aviso('Temperatura normal', false);
      }
    }
  });
  // =====================================================================================
  // 3) Botonera de piso y cableado del hueco: la pared del pasillo es semitransparente para ver los cables
  //    Pisos 1, 2 y 3 en y = 0, 2.8 y 5.6; pasillo hacia +z; hueco hacia -z; tablero en el marco del piso 3
  // =====================================================================================
  var FH = 2.8, YP = [0, 2.8, 5.6];
  var XB = 0.65, YB = 1.1, XD = 0.9, YC = 1.55, XT = 1.12, ZV = -0.068;
  function puertaPiso(s, f, a) { s.hojas[f][0].position.x = -(0.2 + 0.4 * a); s.hojas[f][1].position.x = 0.2 + 0.4 * a; }
  function cabinaHueco(s, cy, a) { s.cab.position.y = cy; s.hojasC[0].position.x = -(0.2 + 0.4 * a); s.hojasC[1].position.x = 0.2 + 0.4 * a; }
  function indicadores(s, cy, txt) { var n = String(Math.round(cy / FH) + 1); s.ind.forEach(function (c, f) { escribe(s, c, 'ind' + f, txt || n, '#ff5a3c'); }); }
  // la mano se acerca y aprieta el botón del piso f en el segundo t0; devuelve true mientras está apretado
  function presiones(s, K, t, lista, hundido) {
    var r = -1;
    lista.forEach(function (q) {
      var f = q[0], t0 = q[1], k = K.ph(t, t0 - 0.6, t0) * (1 - K.ph(t, t0 + 0.4, t0 + 1.0));
      if (k <= 0.001) return;
      s.mano.visible = true; s.mano.position.set(XB + 0.004, YP[f] + YB - 0.004, 0.073 + 0.32 * (1 - k));
      if (K.entre(t, t0 - 0.03, t0 + 0.42)) { s.boton[f].position.z = 0.06; r = f; }
    });
    if (hundido != null) s.boton[hundido].position.z = 0.058;
    return r;
  }
  function llamadaBase(s, K) {
    s.msg.visible = false; s.cad.visible = false; s.ram1.visible = false; s.ram2.visible = false; s.mano.visible = false;
    YP.forEach(function (y0, f) {
      s.aro[f].material = s.apag; s.boton[f].position.z = 0.066; s.ledT[f].material = s.verde; puertaPiso(s, f, 0); s.tapa[f].rotation.y = 0;
    });
    s.placa.position.z = 0.056; s.boton[0].visible = true; s.botonN.visible = false;
    s.sulf.visible = false; s.gotas.forEach(function (g) { g.visible = false; });
    s.ledTab.material = s.verde;
    K.marcar([s.canaleta, s.cajas[0], s.cajas[1], s.cajas[2], s.placa, s.tarj[0], s.tarj[1], s.tarj[2], s.cerr[0], s.cerr[1], s.cerr[2], s.ramas, s.bornes[1], s.tab, s.botonN, s.boton[0]], null);
  }
  V3.escena('ele-llamada', ['botonera_piso', 'cableado_hueco'], {
    fov: 36, poster: 2.6,
    construir: function (K, id) {
      var M = K.M, T = K.T, s = mats(K); s.id = id; s.K = K;
      var muro = K.mat(0xc3c8cc, { roughness: 0.95, metalness: 0, transparent: true, opacity: 0.42, depthWrite: false });
      K.add(K.caja(3.8, 9.6, 0.05, K.mat(0x80878e, { roughness: 1, metalness: 0 }), 0, 3.6, -1.8));
      var cajaM = K.mat(0x9aa3ab, { roughness: 0.6 }), gabM = K.mat(0xcfcab9, { roughness: 0.7, metalness: 0.2 });
      s.hojas = []; s.boton = []; s.aro = []; s.tarj = []; s.ledT = []; s.ind = []; s.cajas = []; s.tapa = []; s.cerr = []; s.bornes = [];
      s.ramas = new T.Group(); K.add(s.ramas);
      var cobre = K.mat(0x2e5f90, { roughness: 0.6 });
      YP.forEach(function (y0, f) {
        // pared del pasillo (semitransparente), piso del pasillo y marco de la puerta
        K.add(K.caja(1.3, FH, 0.1, muro, -1.05, y0 + FH / 2 - 0.2, 0)); K.add(K.caja(1.3, FH, 0.1, muro, 1.05, y0 + FH / 2 - 0.2, 0));
        K.add(K.caja(0.8, 0.6, 0.1, muro, 0, y0 + 2.3, 0));
        K.add(K.caja(3.4, 0.2, 1.0, M.hall, 0, y0 - 0.1, 0.55));
        K.add(K.caja(0.05, 2.05, 0.03, M.inox, -0.425, y0 + 1.025, 0.06), K.caja(0.05, 2.05, 0.03, M.inox, 0.425, y0 + 1.025, 0.06), K.caja(0.9, 0.05, 0.03, M.inox, 0, y0 + 2.05, 0.06));
        var piso = K.cartel('PISO ' + (f + 1), 0.22, 0.06, '#e2dfd6', '#59636d'); piso.position.set(-0.75, y0 + 1.6, 0.052); K.add(piso);
        // hojas de la puerta de piso (del lado del hueco)
        s.hojas.push([-1, 1].map(function (l) { return K.add(K.caja(0.4, 2.0, 0.025, M.aceroOsc, l * 0.2, y0 + 1.0, -0.08)); }));
        // cerradura en el cabezal
        s.cerr.push(K.add(K.caja(0.09, 0.07, 0.05, M.negro, 0.3, y0 + 2.1, -0.11)));
        // botonera: placa, botón con aro de luz y su tarjeta detrás de la pared
        var placa = K.add(K.grupo([K.caja(0.09, 0.2, 0.012, M.inox, 0, 0, 0)], XB, y0 + YB, 0.056)); if (!f) s.placa = placa;
        var bt = K.cil(0.02, 0.012, M.acero, XB, y0 + YB, 0.066, 'z', 20); K.add(bt); s.boton.push(bt);
        var aro = K.toro(0.025, 0.004, s.apag, XB, y0 + YB, 0.064); K.add(aro); s.aro.push(aro);
        s.tarj.push(K.add(K.caja(0.08, 0.1, 0.01, s.pcb, XB, y0 + YB, -0.065)));
        var lt = K.add(K.esfera(0.007, s.verde, XB + 0.025, y0 + YB + 0.03, -0.072)); s.ledT.push(lt);
        // indicador de piso sobre la puerta
        K.add(K.caja(0.26, 0.13, 0.02, M.negro, 0, y0 + 2.33, 0.058));
        var ind = K.cartel('3', 0.2, 0.1, '#10161b', '#ff5a3c'); ind.position.set(0, y0 + 2.33, 0.069); K.add(ind); s.ind.push(ind);
        // caja de conexiones del piso (tapa hacia el hueco) con sus bornes
        s.cajas.push(K.add(K.caja(0.16, 0.22, 0.07, cajaM, XD, y0 + YC, -0.12)));
        var br = K.add(new T.Group()); s.bornes.push(br);
        for (var i = 0; i < 5; i++) br.add(K.caja(0.02, 0.06, 0.02, i === 2 ? M.amarillo : K.mat(0x8a96a3), XD - 0.05 + i * 0.025, y0 + YC, -0.165));
        var tapa = K.add(K.grupo([K.caja(0.16, 0.22, 0.008, cajaM, 0.08, 0, 0)], XD - 0.08, y0 + YC, -0.18)); s.tapa.push(tapa);
        // ramales: a la botonera y a la cerradura
        s.ramas.add(K.tubo([[XD - 0.04, y0 + YC - 0.1, -0.1], [0.78, y0 + 1.3, -0.085], [XB + 0.03, y0 + YB + 0.02, -0.075]], 0.006, cobre));
        s.ramas.add(K.tubo([[XD - 0.03, y0 + YC + 0.11, -0.145], [XD - 0.03, y0 + 2.1, -0.145], [0.36, y0 + 2.12, -0.13]], 0.006, cobre));
      });
      // canaleta vertical que sube hasta el tablero
      s.canaleta = K.add(K.grupo([K.caja(0.07, 7.8, 0.05, M.gris, XD, 3.6, -0.11), K.caja(0.2, 0.06, 0.05, M.gris, 1.0, 7.48, -0.07)]));
      // tablero en el marco del último piso
      s.tab = K.add(K.grupo([K.caja(0.36, 2.0, 0.16, gabM, 0, 0, 0)], XT, YP[2] + 1.0, 0.13));
      s.pantT = K.cartel('LISTO', 0.28, 0.08, '#0d1418', '#3ccf7f'); s.pantT.position.set(0, 0.55, 0.081); s.tab.add(s.pantT);
      s.ledTab = K.esfera(0.01, s.verde, 0.12, 0.66, 0.081); s.tab.add(s.ledTab);
      var et = K.cartel('TABLERO', 0.24, 0.06, '#e8e4d6', '#59636d'); et.position.set(0, 0.8, 0.081); s.tab.add(et);
      s.tab.add(K.caja(0.025, 0.1, 0.02, M.negro, -0.14, 0.2, 0.09));
      // botón nuevo (arreglo) y sulfato en la caja del piso 2
      s.botonN = K.add(K.cil(0.02, 0.012, M.blanco, XB, YB, 0.066, 'z', 20));
      s.sulf = K.add(new T.Group()); var sm = K.mat(0x7fc8a9, { roughness: 1, metalness: 0 });
      for (var q = 0; q < 7; q++) s.sulf.add(K.esfera(0.008 + K.ruido(q) * 0.006, sm, XD - 0.005 + (K.ruido(q * 3) - 0.5) * 0.04, YP[1] + YC + (K.ruido(q * 7) - 0.5) * 0.06, -0.178));
      s.gotas = [0, 1, 2].map(function () { return K.add(K.gota(K.mat(0x5aa9e6, { roughness: 0.1, metalness: 0.1 }))); });
      // la cabina en el hueco
      s.cab = K.add(new T.Group()); s.cab.position.set(0, 0, -0.85);
      s.cab.add(K.caja(1.2, 0.08, 1.4, M.aceroOsc, 0, -0.04, 0), K.caja(1.2, 2.2, 0.04, M.panel, 0, 1.1, -0.68), K.caja(0.04, 2.2, 1.4, M.panel, -0.58, 1.1, 0), K.caja(0.04, 2.2, 1.4, M.panel, 0.58, 1.1, 0));
      s.cab.add(K.caja(1.2, 0.06, 1.4, M.gris, 0, 2.23, 0), K.caja(0.2, 2.2, 0.04, M.panel, -0.5, 1.1, 0.68), K.caja(0.2, 2.2, 0.04, M.panel, 0.5, 1.1, 0.68), K.caja(0.8, 0.2, 0.04, M.panel, 0, 2.1, 0.68));
      s.cab.add(K.caja(0.7, 0.01, 0.6, s.luz, 0, 2.195, 0));
      s.hojasC = [-1, 1].map(function (l) { return K.add(K.caja(0.4, 2.0, 0.025, M.inox, l * 0.2, 1.0, 0.72), s.cab); });
      // la mano que llama y las señales
      s.mano = mano(K);
      s.cLlam = YP.map(function (y0) { return camino([[XB, y0 + YB, -0.075], [0.78, y0 + 1.3, -0.085], [XD - 0.04, y0 + YC - 0.1, ZV], [XD - 0.01, y0 + YC + 0.1, ZV], [XD - 0.01, 7.45, ZV], [1.0, 7.45, -0.04], [XT - 0.06, 7.25, 0.1]]); });
      var pc = [[XT - 0.1, 7.3, 0.1], [1.0, 7.46, -0.04], [XD - 0.01, 7.46, ZV]];
      s.kCaja = []; s.kCerr = [];
      [2, 1, 0].forEach(function (f) {
        var y0 = YP[f];
        pc.push([XD - 0.01, y0 + 2.12, ZV], [0.33, y0 + 2.12, -0.13]); s.kCerr[f] = pc.length - 1;
        pc.push([0.33, y0 + 2.06, -0.13], [XD - 0.01, y0 + 2.06, ZV], [XD - 0.01, y0 + YC, -0.19]); s.kCaja[f] = pc.length - 1;
        pc.push([XD - 0.01, y0 + YC - 0.12, ZV]);
      });
      pc.push([XD - 0.01, -0.3, ZV]);
      s.cCad = camino(pc);
      s.kCerr = s.kCerr.map(function (i) { return s.cCad.fr[i]; }); s.kCaja = s.kCaja.map(function (i) { return s.cCad.fr[i]; });
      s.cRam1 = camino([[XB + 0.03, YP[1] + YB + 0.02, -0.075], [0.78, YP[1] + 1.3, -0.085], [XD - 0.04, YP[1] + YC - 0.1, -0.1]]);
      s.cRam2 = camino([[0.36, YP[1] + 2.12, -0.13], [XD - 0.03, YP[1] + 2.1, -0.145], [XD - 0.03, YP[1] + YC + 0.11, -0.145]]);
      s.msg = cuentas(K, 8, 0x4aa3ff, 0.03); s.cad = cuentas(K, 46, 0x3ccf7f, 0.02);
      s.ram1 = cuentas(K, 4, 0x4aa3ff, 0.014); s.ram2 = cuentas(K, 4, 0x3ccf7f, 0.014);
      return s;
    },
    camara: camaraDe({
      botonera_piso: [
        [[0, [1.35, 1.45, 1.35], [0.5, 1.15, 0.0]], [3.6, [1.3, 1.42, 1.3], [0.5, 1.15, 0.0]], [4.4, [1.9, 2.1, 2.6], [0.75, 1.75, -0.1]], [7.8, [2.2, 7.0, 2.9], [0.9, 6.95, -0.05]],
          [8.8, [2.7, 6.6, 4.8], [0.35, 6.4, -0.4]], [9.0, [2.7, 6.6, 4.8], [0.35, 6.4, -0.4]], [12.6, [2.7, 1.6, 4.8], [0.3, 1.1, -0.4]], [13.6, [1.5, 1.5, 2.7], [0.2, 1.1, -0.2]], [18, [1.6, 1.55, 2.9], [0.15, 1.1, -0.2]]],
        [[0, [1.35, 1.45, 1.35], [0.5, 1.12, 0.0]], [4.2, [1.35, 1.45, 1.35], [0.5, 1.12, 0.0]], [5.2, [1.7, 4.6, 2.3], [0.6, 4.1, -0.05]], [8.4, [1.7, 4.6, 2.3], [0.6, 4.1, -0.05]],
          [9.6, [1.7, 1.6, 2.7], [0.3, 1.1, -0.1]], [13.6, [1.7, 1.6, 2.7], [0.3, 1.1, -0.1]], [14.6, [1.3, 1.42, 1.3], [0.55, 1.12, 0.0]], [19, [1.35, 1.45, 1.45], [0.5, 1.12, 0.0]]]
      ],
      cableado_hueco: [
        [[0, [3.4, 4.6, 6.2], [0.5, 3.7, -0.2]], [3.6, [3.2, 4.4, 5.8], [0.55, 3.7, -0.2]], [4.6, [1.75, 4.45, 1.55], [0.66, 4.05, -0.1]], [8.2, [1.7, 4.4, 1.5], [0.66, 4.05, -0.1]],
          [9.2, [2.6, 7.0, 4.4], [0.5, 6.6, -0.2]], [12.6, [2.6, 2.6, 4.4], [0.5, 2.4, -0.2]], [13.6, [2.2, 4.6, 3.3], [0.4, 4.0, -0.15]], [18, [2.3, 4.6, 3.5], [0.4, 4.0, -0.15]]],
        [[0, [1.5, 4.7, -0.95], [0.88, 4.3, -0.15]], [4.2, [1.5, 4.7, -0.95], [0.88, 4.3, -0.15]], [5.2, [3.1, 5.1, 5.8], [0.5, 4.7, -0.2]], [9.2, [3.1, 5.1, 5.8], [0.5, 4.7, -0.2]],
          [10.2, [2.1, 7.4, 2.5], [0.95, 7.0, 0.1]], [13.6, [2.1, 7.4, 2.5], [0.95, 7.0, 0.1]], [14.6, [1.5, 4.7, -0.95], [0.88, 4.3, -0.15]], [19, [1.55, 4.75, -1.0], [0.88, 4.3, -0.15]]]
      ]
    }),
    funciona: {
      dur: 18,
      subt: function (id) {
        return id === 'cableado_hueco'
          ? [[0, 'Por una pared del hueco sube una canaleta llena de cables. En cada piso tiene una caja de conexiones.'],
            [4, 'De cada caja salen cables cortos: uno va a la botonera del pasillo y otro a la cerradura de la puerta.'],
            [8.5, 'Por ahí pasa la cadena de seguridad: un circuito que atraviesa todas las cerraduras, una por una.'],
            [13, 'Si una sola puerta se abre, la cadena se corta y el ascensor se queda quieto.']]
          : [[0, 'La botonera de piso es la placa con el botón, al lado de la puerta. La aprietas para llamar al ascensor.'],
            [4, 'Detrás tiene una tarjeta chiquita que manda el aviso por los cables del hueco hasta el tablero.'],
            [8.5, 'El tablero anota la llamada y manda la cabina. El botón se queda prendido mientras esperas.'],
            [13, 'Cuando la cabina llega, el botón se apaga y las puertas se abren.']];
      },
      anim: function (t, s, K, id) {
        llamadaBase(s, K);
        if (id === 'cableado_hueco') {
          cabinaHueco(s, 0, 0); indicadores(s, 0);
          escribe(s, s.pantT, 'pt', 'LISTO', '#3ccf7f');
          var abre = K.ph(t, 13.6, 14.6), corte = t > 14.0;
          puertaPiso(s, 1, 0.16 * abre);
          s.ram1.correr(s.cRam1, t, 0.25, K.entre(t, 4.6, 8.6)); s.ram2.correr(s.cRam2, t, 0.25, K.entre(t, 4.6, 8.6));
          s.cad.correr(s.cCad, t, 0.6, t > 8.6, corte ? s.kCerr[1] : null);
          s.ledTab.material = corte ? (K.parpadeo(t, 2) ? s.rojo : s.apag) : s.verde;
          if (corte) escribe(s, s.pantT, 'pt', 'PUERTA', '#ff5a3c');
          var foco = K.parpadeo(t, 1) ? 'foco' : null;
          K.marcar(s.canaleta, t < 4 ? foco : null); K.marcar([s.cajas[0], s.cajas[1], s.cajas[2]], t < 4 ? foco : null);
          K.marcar(s.ramas, K.entre(t, 4, 8.5) ? 'foco' : null);
          K.marcar(s.cerr[1], corte ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
          if (t < 4) { K.rotulo('Canaleta', [XD, 3.4, -0.1]); K.rotulo('Caja de piso', [XD + 0.06, YP[1] + YC, -0.1]); K.rotulo('Caja de piso', [XD + 0.06, YP[2] + YC, -0.1]); }
          else if (t < 8.5) { K.rotulo('A la botonera', [0.76, YP[1] + 1.28, -0.08], 'izq'); K.rotulo('A la cerradura', [0.55, YP[1] + 2.12, -0.13], 'izq'); K.rotulo('Caja del piso 2', [XD + 0.06, YP[1] + YC - 0.05, -0.1]); }
          else if (t < 13) { K.rotulo('Cadena de seguridad', s.cad.children[(Math.floor(t * 2) % 40)], 'izq'); K.rotulo('Cerradura', [0.3, s.cab.position.y + YP[Math.max(0, Math.min(2, Math.round((t < 10.9 ? 2 : t < 11.8 ? 1 : 0))))] + 2.1, -0.11]); }
          else { K.rotulo(corte ? 'Puerta abierta: cadena cortada' : 'Cerradura', [0.3, YP[1] + 2.1, -0.11]); }
          K.tabla([['CADENA', t < 8.5 ? '…' : corte ? 'CORTADA' : 'CERRADA', t < 8.5 ? '' : corte ? 'mal' : 'ok'], ['PUERTAS', corte ? 'PISO 2 ABIERTA' : 'TODAS CERRADAS', corte ? 'mal' : 'ok'], ['ASCENSOR', corte ? 'NO SE MUEVE' : 'LISTO', corte ? 'mal' : 'ok']]);
          if (t > 14.6) K.aviso('Cadena cortada: el ascensor no se mueve');
          return;
        }
        // botonera de piso: llamada desde el piso 1, la cabina baja del piso 3
        var ap = presiones(s, K, t, [[0, 1.7]]);
        var prendido = K.entre(t, 1.75, 13.0);
        s.aro[0].material = prendido ? s.amar : s.apag;
        var kl = K.ph(t, 4.4, 7.8);
        s.msg.viaje(s.cLlam[0], kl, K.entre(t, 4.3, 7.9));
        var cy = K.kf(t, [[0, YP[2]], [9.0, YP[2]], [12.6, 0]]), a = K.ph(t, 13.4, 14.8);
        cabinaHueco(s, cy, a); puertaPiso(s, 0, a); indicadores(s, cy);
        escribe(s, s.pantT, 'pt', t < 7.8 ? 'LISTO' : t < 12.6 ? 'LLAMA P1' : 'LLEGÓ P1', t < 7.8 ? '#3ccf7f' : '#ffc62b');
        s.ledTab.material = K.entre(t, 7.6, 8.4) ? s.amar : s.verde;
        K.marcar(s.placa, t < 4 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.tarj[0], K.entre(t, 4, 5.8) ? 'foco' : null);
        K.marcar(s.tab, K.entre(t, 7.6, 8.6) ? 'foco' : null);
        if (t < 4) { K.rotulo('Botonera de piso', [XB + 0.05, YB + 0.1, 0.06]); if (prendido) K.rotulo('Se prende', [XB - 0.02, YB - 0.02, 0.07], 'izq'); }
        else if (t < 8.5) { if (t < 5.8) K.rotulo('Tarjeta del botón', [XB, YB - 0.05, -0.065], 'izq'); if (K.entre(t, 4.3, 7.8)) K.rotulo('Aviso al tablero', s.msg.children[0], 'izq'); else if (t >= 7.8) K.rotulo('Tablero', [XT, YP[2] + 1.55, 0.21], 'izq'); }
        else if (t < 13) K.rotulo('Cabina', [0, cy + 1.2, -0.13], 'izq');
        else K.rotulo(a > 0.5 ? 'Llegó: botón apagado' : 'Botón apagado', [XB, YB + 0.03, 0.07]);
        K.tabla([['BOTÓN', prendido ? 'PRENDIDO' : 'APAGADO', prendido ? 'ac' : ''], ['LLAMADA', t < 7.8 ? (t > 1.75 ? 'VIAJANDO' : '—') : t < 12.6 ? 'ANOTADA' : 'ATENDIDA', t > 1.75 ? 'ok' : ''], ['CABINA', 'PISO ' + (Math.round(cy / FH) + 1), '']]);
      }
    },
    falla: {
      dur: 19,
      subt: function (id) {
        return id === 'cableado_hueco'
          ? [[0, 'Falla: en la caja del piso 2 entró agua. Los bornes, donde se ajustan los cables, se sulfatan y se aflojan.'],
            [4.5, 'La cadena de seguridad se corta en esa caja. El tablero cree que hay una puerta abierta y no arranca.'],
            [9.5, 'Todas las puertas se ven cerradas, por eso confunde. La pantalla del tablero suele decir en qué piso está el corte.'],
            [14, 'Arreglo: con el ascensor detenido, secar, limpiar y ajustar los bornes de esa caja, y ponerle bien su tapa.']]
          : [[0, 'Falla 1: la tarjeta del botón de este piso se malogró. Aprietas y no pasa nada: ni luz ni ascensor.'],
            [4.5, 'Desde otro piso sí funciona. Así sabes que el problema está solo en esa botonera.'],
            [9, 'Falla 2: el botón se queda hundido por un golpe o por suciedad. El ascensor viene solo a ese piso, una y otra vez.'],
            [14, 'Arreglo: con el ascensor detenido, revisar el conector y cambiar el botón o la tarjeta de ese piso.']];
      },
      anim: function (t, s, K, id) {
        llamadaBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        if (id === 'cableado_hueco') {
          cabinaHueco(s, 0, 0); indicadores(s, 0);
          var arreglo = t >= 14, limpio = K.ph(t, 15.0, 16.0), cerrada = K.ph(t, 16.8, 17.6);
          s.tapa[1].rotation.y = 1.7 * (1 - cerrada);
          s.sulf.visible = limpio < 1; s.sulf.scale.setScalar(1 - limpio * 0.99);
          s.gotas.forEach(function (g, i) {
            var k = (t * 0.7 + i / 3) % 1; g.visible = t < 14;
            g.position.set(XD - 0.03 + i * 0.03, YP[1] + 2.45 - k * 0.8, -0.165);
          });
          var corte = !(arreglo && limpio >= 1);
          s.cad.correr(s.cCad, t, 0.6, true, corte ? s.kCaja[1] : null);
          s.ledTab.material = corte ? (K.parpadeo(t, 2) ? s.rojo : s.apag) : s.verde;
          escribe(s, s.pantT, 'pt', corte ? (t < 9.5 ? 'PUERTA' : 'ERR P2') : 'LISTO', corte ? '#ff5a3c' : '#3ccf7f');
          K.marcar(s.bornes[1], corte && t < 9.5 ? mal : arreglo ? 'foco' : null);
          K.marcar(s.cajas[1], K.entre(t, 4.5, 9.5) ? mal : null);
          K.marcar(s.tab, K.entre(t, 9.5, 14) ? mal : null);
          if (t < 4.5) { K.rotulo('Agua', [XD, YP[1] + 2.2, -0.165], 'izq'); K.rotulo('Bornes sulfatados', [XD + 0.02, YP[1] + YC - 0.03, -0.18]); }
          else if (t < 9.5) { K.rotulo('Corte aquí', [XD, YP[1] + YC, -0.12]); K.rotulo('Puertas cerradas', [0.0, YP[2] + 1.0, -0.08], 'izq'); }
          else if (t < 14) K.rotulo('Pantalla: piso 2', [XT, YP[2] + 1.55, 0.21], 'izq');
          else K.rotulo(limpio < 1 ? 'Limpiando y ajustando' : cerrada > 0.5 ? 'Tapa puesta' : 'Bornes limpios', [XD + 0.02, YP[1] + YC - 0.03, -0.18]);
          K.tabla([['CAJA PISO 2', arreglo && limpio >= 1 ? 'SECA Y AJUSTADA' : 'MOJADA', arreglo && limpio >= 1 ? 'ok' : 'mal'], ['CADENA', corte ? 'CORTADA' : 'CERRADA', corte ? 'mal' : 'ok'], ['PUERTAS', 'TODAS CERRADAS', 'ok']]);
          if (K.entre(t, 5, 14)) K.aviso('El tablero cree que hay una puerta abierta');
          if (t > 17.6) K.aviso('Cadena cerrada: ascensor listo', false);
          return;
        }
        // botonera de piso
        var cy = 0, a = 0, llam = -1, aroOn = [false, false, false];
        if (t < 4.5) {
          presiones(s, K, t, [[0, 1.2], [0, 2.9]]);
          s.ledT[0].material = s.apag;
          K.marcar(s.tarj[0], mal); K.marcar(s.placa, null);
          K.rotulo('Tarjeta malograda', [XB, YB - 0.05, -0.065], 'izq'); K.rotulo('No se prende', [XB, YB + 0.03, 0.07]);
          K.tabla([['BOTÓN PISO 1', 'NO PRENDE', 'mal'], ['LLAMADA', 'NO LLEGA', 'mal']]);
          if (t > 3.2) K.aviso('El ascensor no viene');
          cy = YP[2];
        } else if (t < 9) {
          s.ledT[0].material = s.apag;
          presiones(s, K, t, [[1, 5.6]]);
          aroOn[1] = t > 5.65;
          s.msg.viaje(s.cLlam[1], K.ph(t, 5.8, 7.6), K.entre(t, 5.7, 7.7));
          cy = YP[2];
          if (t > 7.6) K.rotulo('Llamada anotada', [XT, YP[2] + 1.55, 0.21], 'izq');
          K.rotulo(aroOn[1] ? 'En el piso 2 sí funciona' : 'Botón del piso 2', [XB + 0.03, YP[1] + YB + 0.05, 0.07]);
          K.tabla([['BOTÓN PISO 1', 'NO PRENDE', 'mal'], ['BOTÓN PISO 2', aroOn[1] ? 'PRENDIDO' : 'APAGADO', aroOn[1] ? 'ok' : '']]);
          escribe(s, s.pantT, 'pt', t > 7.6 ? 'LLAMA P2' : 'LISTO', t > 7.6 ? '#ffc62b' : '#3ccf7f');
        } else if (t < 14) {
          // botón hundido: la cabina viene sola al piso 1, abre y cierra una y otra vez
          s.boton[0].position.z = 0.057; aroOn[0] = true;
          a = K.kf(t, [[9, 0], [9.6, 1], [10.8, 1], [11.4, 0], [11.8, 0], [12.4, 1], [13.4, 1], [14, 0]]);
          cy = 0;
          K.marcar(s.boton[0], mal);
          K.rotulo('Botón hundido', [XB, YB, 0.07]);
          K.tabla([['BOTÓN PISO 1', 'HUNDIDO', 'mal'], ['CABINA', 'VIENE SOLA', 'mal']]);
          if (t > 10) K.aviso('Viene solo a este piso, una y otra vez');
        } else {
          // arreglo: se saca la placa y se cambia el botón por uno nuevo
          var saca = K.ph(t, 14.4, 15.0) * (1 - K.ph(t, 16.0, 16.6)), nuevo = t >= 15.6;
          s.placa.position.z = 0.056 + 0.12 * saca;
          s.boton[0].visible = !nuevo; s.boton[0].position.z = 0.057 + 0.12 * saca;
          s.botonN.visible = nuevo; s.botonN.position.z = 0.066 + 0.12 * saca;
          s.ledT[0].material = nuevo ? s.verde : s.apag;
          presiones(s, K, t, [[0, 17.4]]);
          if (nuevo && t > 17.4) aroOn[0] = true;
          if (t > 17.4) s.botonN.position.z = t < 17.82 ? 0.06 : 0.066;
          cy = YP[2];
          K.marcar([s.botonN, s.tarj[0]], nuevo ? 'foco' : null);
          K.rotulo(nuevo ? 'Botón y tarjeta nuevos' : 'Se saca la placa', [XB + 0.03, YB + 0.08, 0.07 + 0.12 * saca]);
          K.tabla([['BOTÓN PISO 1', nuevo ? 'NUEVO' : 'MALOGRADO', nuevo ? 'ok' : 'mal'], ['ASCENSOR', K.entre(t, 14.2, 16.8) ? 'DETENIDO' : 'EN SERVICIO', K.entre(t, 14.2, 16.8) ? 'ac' : 'ok']]);
          if (t > 17.6) K.aviso('Botón nuevo: ya llama', false);
        }
        aroOn.forEach(function (on, f) { s.aro[f].material = on ? s.amar : s.apag; });
        if (t >= 14 && t > 17.4) s.aro[0].material = s.amar;
        cabinaHueco(s, cy, a); puertaPiso(s, 0, t >= 9 && t < 14 ? a : 0); indicadores(s, cy);
        if (t < 4.5) escribe(s, s.pantT, 'pt', 'LISTO', '#3ccf7f');
        if (t >= 9) escribe(s, s.pantT, 'pt', t < 14 ? 'LLAMA P1' : 'LISTO', t < 14 ? '#ffc62b' : '#3ccf7f');
      }
    }
  });
  // =====================================================================================
  // 4) Botonera de cabina: vista desde adentro. La pared del frente (con la puerta) está en z = 0
  //    y la cabina queda hacia +z. La placa de la botonera va a la derecha de la puerta.
  // =====================================================================================
  // botones: 0-3 pisos 1 a 4, 4 abrir, 5 cerrar, 6 alarma (posición relativa a la placa)
  var BC = { x: 0.5, y: 1.2, z: 0.025, bt: [[0.03, -0.04], [0.03, 0.05], [0.03, 0.14], [0.03, 0.23], [0.03, -0.14], [0.03, -0.23], [0.0, -0.34]] };
  function bcPos(i) { return [BC.x + BC.bt[i][0], BC.y + BC.bt[i][1], BC.z]; }
  function pulsador(K, s, padre, x, y, mBoton, r) {
    var g = K.grupo([], x, y, 0.006); padre.add(g);
    g.boton = K.cil(r || 0.016, 0.012, mBoton || K.M.acero, 0, 0, 0.006, 'z', 20); g.add(g.boton);
    g.aro = K.toro((r || 0.016) + 0.004, 0.0035, s.apag, 0, 0, 0.004); g.add(g.aro);
    g.hundir = function (k) { g.boton.position.z = 0.006 - 0.005 * k; };
    g.luz = function (on, m) { g.aro.material = on ? (m || s.amar) : s.apag; };
    return g;
  }
  // la mano aprieta el botón i en el segundo t0 (lista de [i, t0])
  function bcAprieta(s, K, t, lista) {
    lista.forEach(function (q) {
      var p = bcPos(q[0]), t0 = q[1], k = K.ph(t, t0 - 0.6, t0) * (1 - K.ph(t, t0 + 0.4, t0 + 1.0));
      if (k <= 0.001) return;
      s.mano.visible = true; s.mano.position.set(p[0] + 0.004, p[1] - 0.004, p[2] + 0.045 + 0.3 * (1 - k));
      if (K.entre(t, t0 - 0.03, t0 + 0.42)) s.bt[q[0]].hundir(1);
    });
  }
  function bcPuerta(s, a) { s.hojasB[0].position.x = -0.35 - 0.4 * a; s.hojasB[1].position.x = 0.05 + 0.4 * a; }
  function bcBase(s, K) {
    s.mano.visible = false; s.son.visible = false;
    s.bt.forEach(function (b) { b.hundir(0); b.luz(false); });
    s.placa.position.set(BC.x, BC.y, BC.z); s.placa.rotation.y = 0;
    K.marcar([s.placa, s.bt[0], s.bt[1], s.bt[2], s.bt[3], s.bt[4], s.bt[5], s.bt[6], s.conect], null);
  }
  V3.escena('ele-botonera-cabina', ['botonera_cabina'], {
    fov: 36, poster: 6,
    construir: function (K) {
      var M = K.M, s = mats(K);
      // cabina: pared del frente con el vano de la puerta (x de -0.55 a 0.25), costados, piso y techo
      K.add(K.caja(0.2, 2.2, 0.02, M.panel, -0.65, 1.1, 0)); K.add(K.caja(0.5, 2.2, 0.02, M.panel, 0.5, 1.1, 0));
      K.add(K.caja(0.8, 0.2, 0.02, M.panel, -0.15, 2.1, 0));
      K.add(K.caja(0.02, 2.2, 1.6, M.panel, -0.75, 1.1, 0.8)); K.add(K.caja(0.02, 2.2, 1.6, M.panel, 0.75, 1.1, 0.8));
      K.add(K.caja(1.5, 0.04, 1.6, M.piso, 0, -0.02, 0.8)); K.add(K.caja(1.5, 0.04, 1.6, M.grisClaro, 0, 2.22, 0.8));
      K.add(K.caja(0.8, 0.012, 0.6, s.luz, 0, 2.195, 0.75));
      K.add(K.caja(0.04, 0.04, 1.2, M.inox, -0.72, 0.95, 0.85));
      K.add(K.caja(0.8, 0.02, 0.06, M.acero, -0.15, 0.01, -0.02));
      // hojas de la puerta de cabina (abren al centro, se esconden detrás de las paredes)
      s.hojasB = [-0.35, 0.05].map(function (x) { return K.add(K.caja(0.4, 2.0, 0.025, M.inox, x, 1.0, -0.035)); });
      // pasillo del piso, visto por la puerta
      K.add(K.caja(2.2, 0.05, 1.2, M.hall, -0.15, -0.025, -0.65)); K.add(K.caja(2.4, 2.6, 0.05, M.muro, -0.15, 1.3, -1.2));
      s.hall = K.cartel('PISO 1', 0.42, 0.12, '#e2dfd6', '#59636d'); s.hall.position.set(-0.15, 1.65, -1.17); K.add(s.hall);
      // tarjeta y conectores detrás de la placa (se ven cuando se saca la placa)
      s.conect = K.add(K.grupo([K.caja(0.12, 0.42, 0.006, s.pcb, 0, 0, 0)], BC.x, BC.y, 0.013));
      for (var c = 0; c < 6; c++) s.conect.add(K.caja(0.035, 0.022, 0.012, s.blancoP, -0.02, 0.18 - c * 0.075, 0.008));
      [0x2e5f90, 0xd03a2c, 0x1e2125].forEach(function (col, i) { s.conect.add(K.caja(0.004, 0.42, 0.004, K.mat(col), 0.035 + i * 0.008, 0, 0.006)); });
      // la placa con sus botones y la pantalla
      s.placa = K.add(K.grupo([K.caja(0.2, 1.0, 0.012, M.inox, 0, 0, 0)], BC.x, BC.y, BC.z));
      s.pant = K.cartel('1', 0.15, 0.08, '#10161b', '#ff5a3c'); s.pant.position.set(0, 0.38, 0.0065); s.placa.add(s.pant);
      s.bt = BC.bt.map(function (b, i) { return pulsador(K, s, s.placa, b[0], b[1], i === 6 ? M.amarillo : M.acero, i === 6 ? 0.022 : 0.016); });
      ['1', '2', '3', '4', '<|>', '>|<'].forEach(function (txt, i) {
        var e = K.cartel(txt, 0.045, 0.026, '#d6dbdf', '#1e2125'); e.position.set(-0.04, BC.bt[i][1], 0.0065); s.placa.add(e);
      });
      var al = K.cartel('ALARMA', 0.1, 0.026, '#d6dbdf', '#b0281c'); al.position.set(0, -0.395, 0.0065); s.placa.add(al);
      for (var p = 0; p < 12; p++) s.placa.add(K.cil(0.003, 0.002, M.negro, -0.03 + (p % 4) * 0.02, -0.44 - Math.floor(p / 4) * 0.016, 0.007, 'z', 6));
      s.mano = mano(K); s.son = ondas(K, 3, 0xffc62b);
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'La botonera de cabina es el panel de adentro: los números de los pisos, abrir y cerrar puerta, y la alarma.'],
        [4.5, 'Aprietas tu piso: el botón se prende y la orden viaja al tablero.'],
        [8.5, 'La puerta se cierra y la pantalla de arriba va contando los pisos mientras subes.'],
        [13, 'Al llegar, el botón se apaga y se abre la puerta. El botón amarillo es la alarma, para pedir ayuda.']],
      cam: [[0, [-0.25, 1.55, 1.95], [0.15, 1.2, 0]], [3.8, [-0.2, 1.5, 1.85], [0.2, 1.22, 0]], [4.8, [0.22, 1.38, 0.72], [0.5, 1.3, 0.02]], [8.4, [0.22, 1.38, 0.72], [0.5, 1.3, 0.02]],
        [9.4, [-0.1, 1.45, 1.65], [0.12, 1.3, 0]], [13.2, [-0.1, 1.45, 1.65], [0.12, 1.3, 0]], [15.2, [0.24, 1.1, 0.72], [0.5, 1.0, 0.02]], [18, [0.24, 1.12, 0.74], [0.5, 1.02, 0.02]]],
      anim: function (t, s, K) {
        bcBase(s, K);
        bcAprieta(s, K, t, [[2, 5.2], [5, 8.9], [6, 16.3]]);
        var a = K.kf(t, [[0, 1], [9.0, 1], [10.4, 0], [13.6, 0], [15.0, 1]]), viaja = K.entre(t, 10.6, 13.4);
        var piso = t < 11.6 ? 1 : t < 12.6 ? 2 : 3, on3 = K.entre(t, 5.25, 13.4);
        bcPuerta(s, a);
        s.bt[2].luz(on3); s.bt[5].luz(K.entre(t, 8.9, 9.4)); s.bt[6].luz(K.entre(t, 16.3, 18), s.rojo);
        s.son.poner(t, bcPos(K.entre(t, 5.2, 6.4) ? 2 : 6), K.entre(t, 5.2, 6.4) || t > 16.3, 0.05);
        escribe(s, s.pant, 'p', (viaja ? '▲ ' : '') + piso, '#ff5a3c');
        escribe(s, s.hall, 'h', 'PISO ' + (t > 12 ? 3 : 1), '#59636d', '#e2dfd6');
        K.marcar(s.placa, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.bt[2], K.entre(t, 5.2, 8.5) ? 'foco' : null);
        K.marcar(s.bt[6], t > 15.4 ? 'foco' : null);
        var pp = BC.y + 0.38;
        if (t < 4.5) { K.rotulo('Botonera de cabina', [BC.x + 0.1, BC.y + 0.1, 0.04]); K.rotulo('Pantalla', [BC.x + 0.07, pp, 0.04]); K.rotulo('Puerta', [-0.15, 1.2, -0.03], 'izq'); }
        else if (t < 8.5) K.rotulo(on3 ? 'Se prende: piso 3 anotado' : 'Botón del piso 3', bcPos(2));
        else if (t < 13) { if (t < 10.4) K.rotulo('Cerrar puerta', bcPos(5)); K.rotulo('Pantalla: piso ' + piso, [BC.x + 0.07, pp, 0.04]); }
        else if (t < 15.4) K.rotulo('Llegó: botón apagado', bcPos(2));
        else K.rotulo('Alarma: pide ayuda', bcPos(6));
        K.tabla([['BOTÓN 3', on3 ? 'PRENDIDO' : 'APAGADO', on3 ? 'ac' : ''], ['PUERTA', a > 0.98 ? 'ABIERTA' : a < 0.02 ? 'CERRADA' : 'MOVIENDO', ''], ['CABINA', viaja ? 'SUBE: PISO ' + piso : 'PISO ' + piso, viaja ? 'ok' : '']]);
        if (t > 16.4) K.aviso('Alarma sonando: piden ayuda');
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: un botón gastado. Lo aprietas y no se prende: la cabina no va a ese piso.'],
        [4.5, 'Falla 2: el botón de abrir se quedó hundido. La puerta empieza a cerrar y se vuelve a abrir.'],
        [9.5, 'Con el ascensor detenido, se saca la placa: detrás están los botones y sus conectores.'],
        [14, 'Arreglo: cambiar el botón malogrado, revisar su conector y probar que cada botón se prenda y regrese solo.']],
      cam: [[0, [0.22, 1.36, 0.72], [0.5, 1.28, 0.02]], [4.2, [0.22, 1.36, 0.72], [0.5, 1.28, 0.02]], [5.2, [-0.12, 1.42, 1.65], [0.1, 1.15, 0]], [9.2, [-0.12, 1.42, 1.65], [0.1, 1.15, 0]],
        [10.4, [0.0, 1.3, 0.9], [0.5, 1.18, 0.06]], [14, [0.0, 1.3, 0.9], [0.5, 1.18, 0.06]], [15.2, [0.22, 1.34, 0.75], [0.5, 1.25, 0.02]], [19, [0.22, 1.34, 0.76], [0.5, 1.25, 0.02]]],
      anim: function (t, s, K) {
        bcBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null, a = 1;
        escribe(s, s.hall, 'h', 'PISO 1', '#59636d', '#e2dfd6'); escribe(s, s.pant, 'p', '1', '#ff5a3c');
        if (t < 4.5) {
          bcAprieta(s, K, t, [[1, 1.2], [1, 2.9]]);
          K.marcar(s.bt[1], mal);
          K.rotulo('Botón 2: no se prende', bcPos(1));
          K.tabla([['BOTÓN 2', 'NO MARCA', 'mal'], ['CABINA', 'NO SE MUEVE', 'mal']]);
        } else if (t < 9.5) {
          s.bt[4].hundir(1); s.bt[4].luz(true);
          a = K.kf(t, [[4.5, 1], [5.3, 1], [6.4, 0.4], [6.9, 1], [7.6, 1], [8.7, 0.4], [9.2, 1]]);
          K.marcar(s.bt[4], mal);
          K.rotulo('Abrir: se quedó hundido', bcPos(4));
          K.tabla([['BOTÓN ABRIR', 'HUNDIDO', 'mal'], ['PUERTA', 'CIERRA Y REABRE', 'mal']]);
          if (t > 5.5) K.aviso('La puerta no termina de cerrar');
        } else {
          var saca = K.ph(t, 9.8, 10.8) * (1 - K.ph(t, 15.2, 16.2)), nuevo = t > 14.6;
          s.placa.position.z = BC.z + 0.17 * saca; s.placa.position.x = BC.x + 0.06 * saca; s.placa.rotation.y = 0.35 * saca;
          if (!nuevo) { s.bt[4].hundir(1); K.marcar([s.bt[1], s.bt[4]], mal); }
          else { K.marcar([s.bt[1], s.bt[4]], t < 17 ? 'foco' : null); bcAprieta(s, K, t, [[1, 17.2]]); s.bt[1].luz(t > 17.25); }
          K.marcar(s.conect, saca > 0.5 && t < 14.6 ? 'foco' : null);
          if (saca > 0.5) K.rotulo(nuevo ? 'Botones nuevos' : 'Conectores', nuevo ? [BC.x + 0.1, BC.y - 0.05, 0.2] : [BC.x - 0.02, BC.y + 0.1, 0.03], 'izq');
          if (t > 16.4) K.rotulo('Ya se prende', bcPos(1));
          var det = K.entre(t, 9.5, 16.4);
          K.tabla([['ASCENSOR', det ? 'DETENIDO' : 'EN SERVICIO', det ? 'ac' : 'ok'], ['BOTONES', nuevo ? 'NUEVOS' : 'MALOGRADOS', nuevo ? 'ok' : 'mal']]);
          if (t > 17.4) K.aviso('Botones nuevos: todo normal', false);
        }
        bcPuerta(s, a);
      }
    }
  });

  // ---------- cinta plana (cable viajero): tramos de caja que siguen una lista de puntos ----------
  // el ancho va en z (cinta que se dobla en el plano x-y) o en x si yz = true (se dobla en el plano y-z)
  function cinta(K, n, ancho, grosor, m, yz) {
    var g = K.add(new K.T.Group()), geo = yz ? new K.T.BoxGeometry(ancho, 1, grosor) : new K.T.BoxGeometry(grosor, 1, ancho), Yv = K.v(0, 1, 0), d = K.v();
    g.seg = [];
    for (var i = 0; i < n; i++) { var b = new K.T.Mesh(geo, m); g.add(b); g.seg.push(b); }
    g.poner = function (pts) {
      g.seg.forEach(function (b, i) {
        var a = pts[Math.min(i, pts.length - 2)], c = pts[Math.min(i + 1, pts.length - 1)];
        d.set(c[0] - a[0], c[1] - a[1], c[2] - a[2]); var L = Math.max(1e-4, d.length());
        b.position.set((a[0] + c[0]) / 2, (a[1] + c[1]) / 2, (a[2] + c[2]) / 2); b.scale.y = L * 1.06; b.quaternion.setFromUnitVectors(Yv, d.divideScalar(L));
      });
    };
    return g;
  }
  function puntosDe(c, n) { var r = []; for (var i = 0; i <= n; i++) r.push(c.en(i / n)); return r; }

  // =====================================================================================
  // 5) Caja de conexiones del techo de cabina: llega el cable viajero y reparte a la puerta, el ventilador,
  //    el sensor de piso y la botonera de inspección. Techo de la cabina en y = 2.24.
  // =====================================================================================
  var CT = { x: 0.22, y: 2.3, z: -0.3 };
  function ctBase(s, K) {
    s.tapa.visible = true; s.tapa.rotation.x = 0; s.tapaS.visible = false;
    s.sulf.visible = false; s.gotas.forEach(function (g) { g.visible = false; });
    s.fx.forEach(function (f) { f.visible = false; }); s.chis.visible = false;
    s.plug.position.x = 0.4; s.ledS.material = s.apag; s.leds.forEach(function (l) { l.material = s.apag; });
    s.perilla.rotation.y = 0; s.marcas.position.y = 0;
    K.marcar([s.caja, s.plug, s.viaj, s.oper, s.vent, s.sens, s.insp, s.bornes], null);
  }
  V3.escena('ele-caja-techo', ['caja_techo'], {
    fov: 36, poster: 7,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      // pared del hueco con marcas que corren cuando la cabina se mueve
      K.add(K.caja(3.4, 4.6, 0.06, M.muro, 0.2, 1.6, -1.0));
      s.marcas = K.add(new T.Group());
      for (var i = 0; i < 8; i++) s.marcas.add(K.caja(0.5, 0.05, 0.03, M.aceroOsc, -0.6, -0.4 + i * 0.7, -0.96));
      // cabina y techo
      K.add(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.1, 0)); K.add(K.caja(1.26, 0.04, 1.46, M.aceroOsc, 0, 2.22, 0));
      // operador de puertas con su polea al frente
      s.oper = K.add(K.grupo([K.caja(1.0, 0.12, 0.16, M.hierro, 0, 0, 0), K.cil(0.05, 0.14, M.aceroOsc, -0.38, 0.03, 0.04, 'x')], 0, 2.3, 0.6));
      s.poleaO = K.polea(0.05, 0.03, M.acero, M.hierro); s.poleaO.position.set(0.42, 0, 0.1); s.oper.add(s.poleaO);
      // ventilador del techo
      s.vent = K.add(K.grupo([K.cil(0.12, 0.05, M.gris, 0, 0, 0, null, 24)], -0.3, 2.27, 0.12));
      s.aspV = K.grupo([], 0, 0.035, 0); s.vent.add(s.aspV);
      for (var a = 0; a < 4; a++) { var bl = K.caja(0.1, 0.006, 0.035, M.negro, 0.055, 0, 0); var pa = K.grupo([bl]); pa.rotation.y = a * PI / 2; s.aspV.add(pa); }
      // botonera de inspección (amarilla) con selector y botón de parada
      s.insp = K.add(K.grupo([K.caja(0.22, 0.12, 0.16, M.amarillo, 0, 0, 0), K.cil(0.025, 0.03, M.rojo, -0.06, 0.075, 0)], -0.38, 2.3, -0.42));
      s.perilla = K.grupo([K.cil(0.022, 0.02, M.negro, 0, 0, 0, null, 14), K.caja(0.05, 0.016, 0.012, M.negro, 0, 0.015, 0)], 0.05, 0.07, 0); s.insp.add(s.perilla);
      // sensor de piso en el costado
      s.sens = K.add(K.grupo([K.caja(0.06, 0.08, 0.1, M.negro, 0, 0, 0)], -0.57, 2.3, 0.0));
      s.ledS = K.esfera(0.01, s.apag, 0, 0.045, 0.03); s.sens.add(s.ledS);
      // la caja: fondo y paredes (hueca para ver adentro), bornes y tarjeta
      var cajaM = K.mat(0x9aa3ab, { roughness: 0.6 });
      s.caja = K.add(K.grupo([K.caja(0.32, 0.01, 0.24, cajaM, 0, -0.055, 0), K.caja(0.32, 0.12, 0.01, cajaM, 0, 0, -0.115), K.caja(0.32, 0.12, 0.01, cajaM, 0, 0, 0.115),
        K.caja(0.01, 0.12, 0.24, cajaM, -0.155, 0, 0), K.caja(0.01, 0.12, 0.24, cajaM, 0.155, 0, 0)], CT.x, CT.y, CT.z));
      s.bornes = K.grupo([], 0, -0.03, -0.06); s.caja.add(s.bornes);
      for (var b = 0; b < 9; b++) s.bornes.add(K.caja(0.022, 0.04, 0.035, b % 3 === 2 ? M.amarillo : K.mat(0x8a96a3), -0.11 + b * 0.027, 0, 0));
      s.caja.add(K.caja(0.2, 0.006, 0.08, s.pcb, -0.02, -0.045, 0.05));
      s.leds = [0, 1, 2].map(function (j) { var l = K.esfera(0.007, s.apag, -0.08 + j * 0.03, -0.038, 0.07); s.caja.add(l); return l; });
      s.tapa = K.grupo([K.caja(0.33, 0.012, 0.25, cajaM, 0, 0, 0.125)], 0, 0.066, -0.125); s.caja.add(s.tapa);
      s.tapaS = K.add(K.caja(0.33, 0.012, 0.25, cajaM, 0.3, 2.25, 0.15)); s.tapaS.rotation.y = 0.5;
      // sulfato y agua (falla)
      s.sulf = K.add(new T.Group()); var sm = K.mat(0x7fc8a9, { roughness: 1, metalness: 0 });
      for (var q = 0; q < 9; q++) s.sulf.add(K.esfera(0.009 + K.ruido(q) * 0.006, sm, CT.x - 0.11 + q * 0.027, CT.y - 0.005, CT.z - 0.045));
      s.gotas = [0, 1, 2].map(function () { return K.add(K.gota(K.mat(0x5aa9e6, { roughness: 0.1, metalness: 0.1 }))); });
      // cable viajero: sube por el costado de la cabina y entra a la caja con su conector
      var neg = K.mat(0x2b2f34, { roughness: 0.8 });
      s.cViaj = camino([[0.665, -0.6, -0.3], [0.665, 2.18, -0.3], [0.6, 2.28, -0.3], [0.43, 2.28, -0.3]]);
      s.viaj = cinta(K, 20, 0.07, 0.012, neg); s.viaj.poner(puntosDe(s.cViaj, 20));
      s.plug = K.add(K.caja(0.05, 0.05, 0.08, M.negro, 0.4, 2.29, -0.3));
      // ramales que salen de la caja
      var ram = [[[0.22, 2.27, -0.18], [0.24, 2.26, 0.2], [0.3, 2.3, 0.52]], [[0.1, 2.27, -0.2], [-0.15, 2.26, 0.0], [-0.22, 2.28, 0.07]],
        [[0.06, 2.27, -0.35], [-0.12, 2.27, -0.42], [-0.27, 2.29, -0.42]], [[0.06, 2.27, -0.26], [-0.3, 2.26, -0.1], [-0.54, 2.3, 0]]];
      var colR = [0x2e5f90, 0xd03a2c, 0x2e7a5c, 0xb9743a];
      s.cRam = ram.map(function (p, i) { K.add(K.tubo(p, 0.008, K.mat(colR[i]))); return camino(p.map(function (q) { return [q[0], q[1] + 0.012, q[2]]; })); });
      s.fx = s.cRam.map(function () { return cuentas(K, 4, 0xff8a2a, 0.011); });
      s.fv = cuentas(K, 7, 0xff8a2a, 0.012); s.sv = cuentas(K, 7, 0x4aa3ff, 0.012);
      s.fx.push(s.fv, s.sv);
      s.cViajB = camino([[0.43, 2.3, -0.3], [0.6, 2.3, -0.3], [0.68, 2.18, -0.3], [0.68, 0.3, -0.3]]);
      s.chis = K.add(K.chispas(12));
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'La caja de conexiones va sobre el techo de la cabina. Ahí llega el cable viajero, el cable plano que viene del tablero.'],
        [4.5, 'Adentro tiene bornes y una tarjeta. De ahí sale la corriente a la puerta, al ventilador y al sensor de piso.'],
        [9, 'Y al revés: los avisos de la cabina se juntan aquí y bajan por el cable viajero hasta el tablero.'],
        [13.5, 'Al lado está la botonera de inspección: el técnico la pasa a inspección y mueve la cabina despacito.']],
      cam: [[0, [1.9, 3.3, 1.9], [0.15, 2.0, -0.2]], [4.0, [1.8, 3.2, 1.8], [0.15, 2.1, -0.2]], [5.2, [0.85, 2.95, 0.45], [0.18, 2.3, -0.25]], [8.6, [0.85, 2.95, 0.45], [0.18, 2.3, -0.25]],
        [9.8, [1.6, 3.1, 1.2], [0.2, 2.0, -0.2]], [13.2, [1.6, 3.1, 1.2], [0.2, 2.0, -0.2]], [14.4, [0.35, 2.95, 0.6], [-0.38, 2.32, -0.42]], [18, [0.4, 3.0, 0.7], [-0.38, 2.3, -0.42]]],
      anim: function (t, s, K) {
        ctBase(s, K);
        s.tapa.rotation.x = -1.9 * K.ph(t, 4.4, 5.4);
        var on = t > 5.6, vuelta = K.entre(t, 9, 13.5);
        s.fv.correr(s.cViaj, t, 0.5, true);
        s.fx.slice(0, 4).forEach(function (f, i) { f.correr(s.cRam[i], t, 0.25, on && !vuelta); });
        s.sv.correr(s.cViajB, t, 0.5, vuelta);
        s.poleaO.rotation.z = -K.integ(function (x) { return x > 5.8 ? 6 : 0; }, t);
        s.aspV.rotation.y = K.integ(function (x) { return x > 5.8 ? 14 : 0; }, t);
        s.ledS.material = on && K.parpadeo(t, 0.7) ? s.verde : s.apag;
        s.leds.forEach(function (l, i) { l.material = on ? (i === 2 && vuelta ? (K.parpadeo(t, 3) ? s.azul : s.apag) : s.verde) : s.apag; });
        var insp = t > 14.6;
        s.perilla.rotation.y = -1.2 * K.ph(t, 14.4, 14.8);
        s.marcas.position.y = -((t > 15 ? (t - 15) * 0.18 : 0) % 0.7);
        var pulso = K.parpadeo(t, 1) ? 'foco' : null;
        K.marcar(s.caja, t < 4.5 ? pulso : null); K.marcar(s.viaj, t < 4.5 ? pulso : vuelta ? 'foco' : null);
        K.marcar(s.bornes, K.entre(t, 5.4, 9) ? 'foco' : null); K.marcar(s.insp, t > 13.5 ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Caja de conexiones', [CT.x, CT.y + 0.08, CT.z]); K.rotulo('Cable viajero', [0.665, 1.3, -0.3]); }
        else if (t < 9) { K.rotulo('Bornes', [CT.x - 0.1, CT.y - 0.02, CT.z - 0.06], 'izq'); if (on) { K.rotulo('A la puerta', [0.3, 2.38, 0.55]); K.rotulo('Ventilador', [-0.3, 2.34, 0.12], 'izq'); K.rotulo('Sensor de piso', [-0.57, 2.36, 0], 'izq'); } }
        else if (t < 13.5) { K.rotulo('Avisos al tablero', s.sv.children[0]); K.rotulo('Caja de conexiones', [CT.x, CT.y + 0.08, CT.z], 'izq'); }
        else { K.rotulo('Botonera de inspección', [-0.38, 2.37, -0.42]); if (insp) K.rotulo('Selector en inspección', [-0.33, 2.38, -0.42], 'izq'); }
        K.tabla([['CABLE VIAJERO', 'CONECTADO', 'ok'], ['PUERTA Y SENSORES', on ? 'CON CORRIENTE' : '…', on ? 'ok' : ''], ['MODO', insp ? 'INSPECCIÓN (LENTO)' : 'NORMAL', insp ? 'ac' : 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: la caja quedó sin tapa y le cayó agua de una filtración. Los bornes se mojan y se sulfatan.'],
        [4.5, 'Fallan varias cosas a la vez: la puerta no responde, el ventilador se para y se pierde la lectura del piso.'],
        [9.5, 'Falla 2: el conector del cable viajero quedó flojo. Con la vibración del viaje se suelta a ratos.'],
        [14, 'Arreglo: con el ascensor detenido y la energía cortada, secar y ajustar bornes y conectores, y poner bien la tapa.']],
      cam: [[0, [0.85, 2.95, 0.45], [0.2, 2.3, -0.28]], [4.2, [0.85, 2.95, 0.45], [0.2, 2.3, -0.28]], [5.4, [1.7, 3.2, 1.6], [0.1, 2.15, -0.1]], [9.2, [1.7, 3.2, 1.6], [0.1, 2.15, -0.1]],
        [10.4, [0.9, 2.75, 0.3], [0.38, 2.29, -0.3]], [13.8, [0.9, 2.75, 0.3], [0.38, 2.29, -0.3]], [14.8, [0.95, 3.0, 0.55], [0.25, 2.28, -0.25]], [19, [1.0, 3.05, 0.6], [0.25, 2.28, -0.25]]],
      anim: function (t, s, K) {
        ctBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null, arreglo = t >= 14, listo = t > 17.8;
        var tapada = K.ph(t, 16.8, 17.6);
        s.tapa.visible = tapada > 0; s.tapa.rotation.x = -1.9 * (1 - tapada); s.tapaS.visible = tapada <= 0;
        var limpio = K.ph(t, 15.0, 16.0);
        s.sulf.visible = limpio < 1; s.sulf.scale.setScalar(K.ph(t, 0, 4) * (1 - limpio * 0.99) + 0.001);
        s.gotas.forEach(function (g, i) { var k = (t * 0.8 + i / 3) % 1; g.visible = t < 14; g.position.set(CT.x - 0.06 + i * 0.05, 3.2 - k * 0.92, CT.z - 0.03); });
        var suelto = K.entre(t, 9.5, 16.2), corta = suelto && K.ruido(Math.floor(t * 4)) > 0.5;
        s.plug.position.x = suelto ? 0.4 + 0.03 * K.ph((t * 4) % 1, 0, 0.3) * (corta ? 1 : 0.3) : 0.4;
        s.chis.emitir(t, [0.38, 2.31, -0.3], suelto && corta && t < 14, 0.08);
        // con agua o con el conector suelto, la cabina se queda sin varias cosas
        var vivo = t < 4.5 ? true : t < 9.5 ? false : t < 14 ? !corta : listo;
        s.fv.correr(s.cViaj, t, 0.5, vivo || t < 9.5);
        s.fx.slice(0, 4).forEach(function (f, i) { f.correr(s.cRam[i], t, 0.25, vivo); });
        s.poleaO.rotation.z = -K.integ(function (x) { return (x < 4.5 || (x > 17.8)) ? 6 : 0; }, t);
        s.aspV.rotation.y = K.integ(function (x) { return x < 4.8 ? 14 * (1 - K.ph(x, 4.5, 4.8)) : x > 17.8 ? 14 : 0; }, t);
        s.ledS.material = vivo && K.parpadeo(t, 0.7) ? s.verde : s.apag;
        s.leds.forEach(function (l, i) { l.material = vivo ? s.verde : (i === 0 && !arreglo ? (K.parpadeo(t, 3) ? s.rojo : s.apag) : s.apag); });
        if (t < 4.5) { K.marcar(s.bornes, mal); K.rotulo('Agua', [CT.x, 2.9, CT.z], 'izq'); K.rotulo('Bornes sulfatados', [CT.x + 0.1, CT.y, CT.z - 0.06]); K.rotulo('Sin tapa', [0.3, 2.27, 0.15]); }
        else if (t < 9.5) { K.marcar([s.oper, s.vent, s.sens], mal); K.marcar(s.caja, mal); K.rotulo('Puerta', [0.0, 2.38, 0.6]); K.rotulo('Ventilador', [-0.3, 2.34, 0.12], 'izq'); K.rotulo('Sensor de piso', [-0.57, 2.36, 0], 'izq'); }
        else if (t < 14) { K.marcar(s.plug, mal); K.rotulo('Conector flojo', [0.4, 2.33, -0.3]); }
        else { K.marcar([s.bornes, s.plug], limpio > 0.5 ? 'foco' : null); K.rotulo(limpio < 1 ? 'Secar y limpiar' : t < 16.6 ? 'Conector ajustado' : 'Tapa puesta', [CT.x, CT.y + 0.06, CT.z]); }
        K.tabla([['CAJA', arreglo ? (listo ? 'SECA Y TAPADA' : 'EN ARREGLO') : t < 9.5 ? 'MOJADA' : 'CONECTOR FLOJO', listo ? 'ok' : arreglo ? 'ac' : 'mal'],
          ['PUERTA, VENTILADOR, SENSOR', vivo ? 'FUNCIONAN' : 'NO RESPONDEN', vivo ? 'ok' : 'mal'], ['ENERGÍA', K.entre(t, 14.4, 17.8) ? 'CORTADA' : 'CON TENSIÓN', K.entre(t, 14.4, 17.8) ? 'ac' : '']]);
        if (K.entre(t, 5, 9.5)) K.aviso('Fallan varias cosas a la vez');
        if (K.entre(t, 14.4, 17.8)) K.aviso('Ascensor detenido y energía cortada', false);
        if (t > 18) K.aviso('Cabina normal otra vez', false);
      }
    }
  });

  // =====================================================================================
  // 6) Interruptor principal: llave general con manija roja, candado y tarjeta (bloqueo antes de trabajar)
  //    Pared del cuarto en z = -0.3; tablero del edificio a la izquierda, tablero del ascensor y motor a la derecha.
  // =====================================================================================
  var IP = { hub: [-0.55, 1.53, -0.12] };
  function ipBase(s, K) {
    s.cand.visible = false; s.tarj.visible = false; s.humo.visible = false;
    s.tapa.rotation.y = 0; s.manija.rotation.z = 0; s.palanca.rotation.z = 0;
    s.bIn.forEach(function (b) { b.material = s.cobreM; });
    s.tec.visible = true; s.tec.caminar(0, 0); s.tec.brazoD.rotation.x = 0; s.tec.brazoI.rotation.x = 0;
    K.marcar([s.tapa, s.polea, s.bIn[1], s.tabE, s.cand], null);
  }
  // pone el candado y la tarjeta colgando de la punta de la manija (manija en 0)
  function ipCandado(s, K, t, k) {
    s.cand.visible = k > 0; s.tarj.visible = k > 0.95;
    var p0 = [-0.36, 1.4, 0.15], p1 = [-0.625, 1.49, -0.085];
    s.cand.position.set(K.mix(p0[0], p1[0], k), K.mix(p0[1], p1[1], k), K.mix(p0[2], p1[2], k));
    s.tarj.rotation.z = Math.sin(t * 2.2) * 0.12;
  }
  V3.escena('ele-interruptor', ['interruptor_principal'], {
    fov: 36, poster: 15,
    construir: function (K) {
      var M = K.M, s = mats(K);
      K.add(K.piso(3.2, 0xb9c1c8)); K.add(K.caja(4.2, 2.8, 0.06, M.muro, 0, 1.4, -0.33));
      s.cobreM = K.mat(0xc98a4a, { metalness: 0.6, roughness: 0.35 }); s.quem = K.mat(0x231a14, { roughness: 1, metalness: 0 });
      // tablero del edificio (gris) con su palanca
      s.tabE = K.add(K.grupo([K.caja(0.2, 0.28, 0.1, M.grisClaro, 0, 0, 0)], -1.05, 1.5, -0.25));
      s.palanca = K.grupo([K.caja(0.025, 0.07, 0.02, M.negro, 0, 0.03, 0)], 0, 0, 0.055); s.tabE.add(s.palanca);
      var et = K.cartel('EDIFICIO', 0.16, 0.04, '#cdd3d8', '#1e2125'); et.position.set(0, 0.1, 0.051); s.tabE.add(et);
      // caja del interruptor: cuerpo gris, bornes adentro y tapa amarilla con bisagra a la izquierda
      K.add(K.caja(0.26, 0.36, 0.13, M.gris, -0.55, 1.5, -0.22));
      s.bIn = [-0.6, -0.55, -0.5].map(function (x) { return K.add(K.caja(0.035, 0.05, 0.04, s.cobreM, x, 1.6, -0.16)); });
      [-0.6, -0.55, -0.5].forEach(function (x) { K.add(K.caja(0.035, 0.05, 0.04, s.cobreM, x, 1.4, -0.16)); });
      s.tapa = K.add(K.grupo([K.caja(0.26, 0.36, 0.012, M.amarillo, 0.13, 0, 0)], -0.68, 1.5, -0.149));
      s.manija = K.grupo([K.cil(0.035, 0.03, M.rojo, 0, 0, 0, 'z', 20), K.caja(0.035, 0.15, 0.025, M.rojo, 0, 0, 0.018)], 0.13, 0.03, 0.02); s.tapa.add(s.manija);
      var e1 = K.cartel('1', 0.03, 0.03, '#f2b705', '#1e2125'); e1.position.set(0.13, 0.145, 0.007); s.tapa.add(e1);
      var e0 = K.cartel('0', 0.03, 0.03, '#f2b705', '#1e2125'); e0.position.set(0.235, 0.03, 0.007); s.tapa.add(e0);
      // candado (con arco) y tarjeta de aviso
      s.cand = K.add(K.grupo([K.caja(0.04, 0.045, 0.02, K.mat(0x2e5f90), 0, -0.02, 0), K.toro(0.014, 0.003, M.acero, 0, 0.002, 0, PI)]));
      s.tarj = K.grupo([K.cil(0.002, 0.06, M.negro, 0, -0.07, 0, null, 6), K.caja(0.17, 0.1, 0.004, M.blanco, 0, -0.15, 0)], 0, -0.03, 0.012); s.cand.add(s.tarj);
      var nt = K.cartel('NO OPERAR', 0.15, 0.04, '#f2f3f4', '#b0281c'); nt.position.set(0, -0.15, 0.003); s.tarj.add(nt);
      // tablero del ascensor y motor con su polea
      s.tab = K.add(K.caja(0.6, 1.5, 0.3, K.mat(0xcfcab9, { roughness: 0.7, metalness: 0.2 }), 0.45, 0.95, -0.15));
      s.ledT = K.add(K.esfera(0.014, s.verde, 0.62, 1.5, 0.005));
      var tt = K.cartel('TABLERO', 0.24, 0.06, '#e8e4d6', '#59636d'); tt.position.set(0.45, 1.36, 0.002); K.add(tt);
      K.add(K.caja(0.5, 0.5, 0.3, M.hierro, 1.3, 0.25, -0.12)); K.add(K.cil(0.2, 0.3, M.aceroOsc, 1.3, 0.75, -0.08, 'z', 30));
      s.polea = K.add(K.polea(0.18, 0.08, M.acero, M.hierro)); s.polea.position.set(1.3, 0.75, 0.12);
      [-0.025, 0, 0.025].forEach(function (z) { K.add(K.cil(0.005, 0.75, M.hierro, 1.12, 0.375, 0.12 + z, null, 6)); K.add(K.cil(0.005, 0.75, M.hierro, 1.48, 0.375, 0.12 + z, null, 6)); });
      // cables y corriente: red del edificio → tablero del edificio → interruptor → tablero → motor
      var neg = K.mat(0x1b1d20, { roughness: 0.7 });
      var pR = [[-1.05, 2.8, -0.27], [-1.05, 1.64, -0.27]], pI = [[-1.05, 1.64, -0.27], [-1.05, 1.86, -0.26], [-0.55, 1.86, -0.26], [-0.55, 1.68, -0.22]];
      var pO = [[-0.55, 1.32, -0.22], [-0.55, 1.2, -0.27], [0.15, 1.2, -0.27]], pM = [[0.75, 0.35, -0.15], [0.95, 0.05, -0.15], [1.05, 0.3, -0.15]];
      [pR, pI, pO, pM].forEach(function (p) { K.add(K.tubo(p, 0.012, neg)); });
      function fr(p) { return camino(p.map(function (q) { return [q[0], q[1], q[2] + 0.016]; })); }
      s.cR = fr(pR); s.cI = fr(pI); s.cO = fr(pO); s.cM = fr(pM);
      s.fR = cuentas(K, 5, 0xffc62b, 0.011); s.fI = cuentas(K, 7, 0xffc62b, 0.011); s.fO = cuentas(K, 7, 0xff8a2a, 0.011); s.fM = cuentas(K, 5, 0xff8a2a, 0.011);
      s.humo = humo(K, 8, 0x55585c);
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true));
      return s;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El interruptor principal es la llave general del ascensor. Está al lado de la puerta del cuarto del tablero.'],
        [4, 'Con la manija en 1, la corriente pasa al tablero y al motor, y el ascensor trabaja.'],
        [8.5, 'Antes de trabajar, el técnico la gira a 0: el tablero y el motor se quedan sin corriente.'],
        [13, 'Luego pone su candado y una tarjeta. Nadie puede volver a prenderla mientras él trabaja.']],
      cam: [[0, [0.9, 1.75, 3.3], [-0.1, 1.05, -0.2]], [4, [1.1, 1.7, 3.2], [0.0, 1.0, -0.2]], [8.6, [0.7, 1.8, 1.3], [-0.55, 1.4, -0.2]],
        [11.6, [0.7, 1.8, 1.3], [-0.55, 1.4, -0.2]], [12.8, [0.25, 1.7, 0.95], [-0.58, 1.45, -0.15]], [18, [0.28, 1.7, 1.0], [-0.58, 1.45, -0.15]]],
      anim: function (t, s, K) {
        ipBase(s, K);
        var gira = K.ph(t, 9.5, 10.1), on = gira < 0.5;
        s.manija.rotation.z = -PI / 2 * gira;
        // el técnico entra caminando, se voltea hacia la llave, la gira y pone el candado
        var x = K.kf(t, [[0, -2.2], [5, -2.2], [8, -0.33], [14.8, -0.33], [16.4, -1.25]]);
        s.tec.position.set(x, 0, 0.45); s.tec.rotation.y = K.kf(t, [[0, PI / 2], [8, PI / 2], [8.6, PI], [14.8, PI], [15.2, -PI / 2], [16.4, -PI / 2], [16.9, -PI * 0.85]]);
        if (K.entre(t, 5, 8) || K.entre(t, 15.1, 16.4)) s.tec.caminar(t);
        s.tec.brazoD.rotation.x = -1.75 * (K.ph(t, 8.8, 9.4) * (1 - K.ph(t, 10.4, 11)) + K.ph(t, 12.8, 13.4) * (1 - K.ph(t, 14.2, 14.8)));
        var kc = K.ph(t, 13.2, 14.0);
        if (t > 12.8) ipCandado(s, K, t, kc);
        if (K.entre(t, 12.8, 13.2)) { s.cand.visible = true; s.cand.position.set(-0.36, 1.4, 0.15); }
        s.fR.correr(s.cR, t, 0.3, true); s.fI.correr(s.cI, t, 0.3, true);
        s.fO.correr(s.cO, t, 0.3, on); s.fM.correr(s.cM, t, 0.3, on);
        s.polea.rotation.z = -K.integ(function (q) { return q < 9.8 && K.entre(q % 6, 0.5, 4.5) ? 2.5 : 0; }, t);
        s.ledT.material = on ? s.verde : s.apag;
        K.marcar(s.manija, t < 4 && K.parpadeo(t, 1) ? 'foco' : K.entre(t, 9.3, 11) ? 'foco' : null);
        K.marcar(s.cand, K.entre(t, 14, 16) ? 'foco' : null);
        if (t < 4) { K.rotulo('Interruptor principal', [-0.45, 1.68, -0.14]); K.rotulo('Manija', IP.hub, 'izq'); }
        else if (t < 8.5) { K.rotulo('Al tablero', s.cO.en(0.7)); K.rotulo('Al motor', [1.3, 1.0, 0.15]); K.rotulo('Llave en 1', IP.hub, 'izq'); }
        else if (t < 13) { K.rotulo(on ? 'Llave en 1' : 'Llave en 0: sin corriente', IP.hub, 'izq'); if (!on) K.rotulo('La entrada sigue con corriente', [-0.55, 1.86, -0.24], 'der'); }
        else { if (kc > 0.9) { K.rotulo('Candado', [-0.6, 1.47, -0.08], 'izq'); K.rotulo('Tarjeta: NO OPERAR', [-0.6, 1.32, -0.07]); } }
        K.tabla([['LLAVE', on ? '1 (PRENDIDA)' : '0 (APAGADA)', on ? 'ok' : 'ac'], ['MOTOR Y TABLERO', on ? 'CON CORRIENTE' : 'SIN CORRIENTE', on ? '' : 'ok'], ['CANDADO', kc > 0.9 ? 'PUESTO' : 'NO', kc > 0.9 ? 'ok' : '']]);
        if (t > 14.6) K.aviso('Llave bloqueada: se puede trabajar seguro', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Peligro: este técnico trabaja en la máquina sin apagar la llave y sin candado.'],
        [4, 'Alguien llama al ascensor y la máquina arranca de golpe. Le puede atrapar la mano.'],
        [8.5, 'Falla 2: un borne flojo se calienta. La caja huele a quemado, se pone negra y la llave salta.'],
        [13.5, 'Arreglo: con la luz del edificio cortada, se ajustan o cambian los bornes. Y siempre: llave en 0, candado y tarjeta.']],
      cam: [[0, [0.6, 1.8, 3.2], [0.2, 0.9, -0.2]], [8.2, [0.7, 1.8, 3.2], [0.25, 0.9, -0.2]], [9.2, [-0.25, 1.65, 0.95], [-0.62, 1.5, -0.2]],
        [13.4, [-0.25, 1.65, 0.95], [-0.62, 1.5, -0.2]], [14.4, [-0.45, 1.7, 1.25], [-0.75, 1.5, -0.2]], [19, [-0.42, 1.68, 1.2], [-0.72, 1.5, -0.2]]],
      anim: function (t, s, K) {
        ipBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        // 1) trabajando sin bloquear: la máquina arranca sola
        var arranca = t > 5, salta = K.ph(t, 11.5, 11.65), cortaE = K.ph(t, 14.0, 14.4);
        var on = t < 11.5 && t >= 0;
        s.manija.rotation.z = t < 13.5 ? -PI / 2 * salta : -PI / 2;
        s.tec.visible = t < 8.5;
        var atras = K.ph(t, 5.1, 5.5);
        s.tec.position.set(1.3, 0, 0.62 + 0.35 * atras); s.tec.rotation.y = PI;
        s.tec.brazoD.rotation.x = -0.75 + 1.05 * atras; s.tec.brazoI.rotation.x = -0.75 + 1.05 * atras;
        s.polea.rotation.z = -K.integ(function (q) { return q > 5 && q < 11.5 ? 3 : 0; }, t);
        s.ledT.material = on ? s.verde : s.apag;
        // 2) borne flojo que se quema; 3) arreglo con la luz del edificio cortada
        var caliente = K.entre(t, 8.5, 14), abierta = K.ph(t, 14.6, 15.3) * (1 - K.ph(t, 16.6, 17.3)), nuevo = t > 15.9;
        s.bIn[1].material = t > 8.8 && !nuevo ? s.quem : s.cobreM;
        s.tapa.rotation.y = -1.9 * abierta;
        s.palanca.rotation.z = PI * 0.85 * cortaE;
        s.humo.poner(t, [-0.5, 1.7, -0.12], caliente, 0.35, 0.04);
        s.fR.correr(s.cR, t, 0.3, true); s.fI.correr(s.cI, t, 0.3, cortaE < 0.5);
        s.fO.correr(s.cO, t, 0.3, on); s.fM.correr(s.cM, t, 0.3, on && arranca);
        if (t > 17.4) ipCandado(s, K, t, K.ph(t, 17.4, 18.0));
        if (t < 8.5) {
          K.marcar(s.manija, mal); K.rotulo('Llave en 1, sin candado', IP.hub, 'izq');
          if (arranca) { K.marcar(s.polea, mal); K.rotulo('¡Arrancó!', [1.3, 1.0, 0.15]); K.aviso('Peligro: la máquina arrancó sola'); }
          K.tabla([['LLAVE', '1 (PRENDIDA)', 'mal'], ['CANDADO', 'NO', 'mal'], ['MÁQUINA', arranca ? 'GIRANDO' : 'QUIETA', arranca ? 'mal' : '']]);
        } else if (t < 13.5) {
          K.marcar(s.tapa, mal); K.rotulo(t < 11.5 ? 'Huele a quemado' : 'La llave saltó a 0', [-0.5, 1.72, -0.14], 'izq');
          K.tabla([['BORNE', 'FLOJO Y CALIENTE', 'mal'], ['LLAVE', t < 11.5 ? '1' : 'SALTÓ A 0', 'mal']]);
          if (t > 11.6) K.aviso('Ascensor sin corriente');
        } else {
          K.marcar(s.tabE, cortaE > 0.5 && t < 15 ? 'foco' : null);
          K.marcar(s.bIn[1], abierta > 0.5 ? (nuevo ? 'foco' : mal) : null);
          if (t < 14.8) K.rotulo('Luz del edificio: cortada', [-1.05, 1.6, -0.2], 'izq');
          else if (abierta > 0.5) K.rotulo(nuevo ? 'Borne nuevo y ajustado' : 'Borne quemado', [-0.55, 1.6, -0.14]);
          if (t > 18) K.rotulo('Candado y tarjeta', [-0.6, 1.47, -0.08], 'izq');
          K.tabla([['LUZ DEL EDIFICIO', cortaE > 0.5 ? 'CORTADA' : 'CON TENSIÓN', cortaE > 0.5 ? 'ac' : ''], ['BORNE', nuevo ? 'NUEVO' : 'QUEMADO', nuevo ? 'ok' : 'mal'], ['CANDADO', t > 18 ? 'PUESTO' : 'NO', t > 18 ? 'ok' : '']]);
          if (t > 18) K.aviso('Llave en 0, con candado y tarjeta', false);
        }
      }
    }
  });

  // =====================================================================================
  // 7) Rescate automático: apagón, la caja de baterías se prende, la cabina baja despacio al piso 1 y abre.
  //    Pisos 1 y 2 en y = 0 y 2.8; tablero y caja de rescate junto a la puerta del piso 2 (lado del pasillo).
  // =====================================================================================
  var RS = { y: [0, 2.8], top: 4.4, xp: 0.6 };
  function rsCab(s, cy, a) {
    s.cabR.position.y = cy;
    s.hojasR[0].position.x = -(0.2 + 0.4 * a); s.hojasR[1].position.x = 0.2 + 0.4 * a;
    s.hojasP[0].position.x = -(0.2 + 0.4 * a); s.hojasP[1].position.x = 0.2 + 0.4 * a;
    s.cwR.position.y = 3.3 - cy;
    s.sogas[0].pon([RS.xp - 0.2, RS.top, -0.2], [RS.xp - 0.2, cy + 2.3, -0.2]);
    s.sogas[1].pon([RS.xp + 0.2, RS.top, -0.2], [RS.xp + 0.2, 3.3 - cy + 0.45, -0.2]);
    s.polR.rotation.z = cy / 0.2;
  }
  function rsBase(s, K, luz) {
    s.luces.forEach(function (l) { l[0].intensity = l[1] * (0.42 + 0.58 * luz); });
    s.lamp.forEach(function (l) { l.material = luz > 0.5 ? s.luz : s.apag; });
    s.luzCab.material = luz > 0.5 ? s.luz : s.apag;
    s.bat.forEach(function (b) { b.scale.set(1, 1, 1); });
    s.gente.visible = false; s.gente.caminar(0, 0);
    s.fRed.visible = false; s.fBat.visible = false; s.fMot.visible = false;
    K.marcar([s.cajaR, s.bat[0], s.bat[1], s.bat[2], s.bat[3], s.cabR, s.tabR], null);
  }
  function rsCarga(s, n, color) { s.barras.forEach(function (b, i) { b.material = i < n ? color : s.apag; }); }
  V3.escena('ele-rescate', ['rescate'], {
    fov: 38, poster: 11,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K);
      s.luces = []; K.sc.traverse(function (o) { if (o.isLight) s.luces.push([o, o.intensity]); });
      var muro = K.mat(0xc3c8cc, { roughness: 0.95, metalness: 0, transparent: true, opacity: 0.28, depthWrite: false });
      K.add(K.caja(3.6, 5.2, 0.05, K.mat(0x80878e, { roughness: 1, metalness: 0 }), 0.2, 2.2, -1.5));
      s.lamp = []; s.hojasP = [];
      RS.y.forEach(function (y0, f) {
        K.add(K.caja(1.3, 2.8, 0.1, muro, -1.05, y0 + 1.2, 0)); K.add(K.caja(1.3, 2.8, 0.1, muro, 1.05, y0 + 1.2, 0)); K.add(K.caja(0.8, 0.6, 0.1, muro, 0, y0 + 2.3, 0));
        K.add(K.caja(3.4, 0.2, 0.6, M.hall, 0, y0 - 0.1, 0.35));
        K.add(K.caja(0.05, 2.05, 0.03, M.inox, -0.425, y0 + 1.025, 0.06), K.caja(0.05, 2.05, 0.03, M.inox, 0.425, y0 + 1.025, 0.06), K.caja(0.9, 0.05, 0.03, M.inox, 0, y0 + 2.05, 0.06));
        var hp = [-1, 1].map(function (l) { return K.add(K.caja(0.4, 2.0, 0.025, M.aceroOsc, l * 0.2, y0 + 1.0, -0.08)); });
        if (!f) s.hojasP = hp;
        s.lamp.push(K.add(K.caja(0.5, 0.03, 0.18, s.luz, -0.9, y0 + 2.55, 0.6)));
        var pc = K.cartel('PISO ' + (f + 1), 0.22, 0.06, '#e2dfd6', '#59636d'); pc.position.set(-0.75, y0 + 1.6, 0.052); K.add(pc);
      });
      // cabina con sus puertas, contrapeso, máquina arriba y cables
      s.cabR = K.add(new T.Group()); s.cabR.position.set(0, 0, -0.85);
      s.cabR.add(K.caja(1.2, 0.08, 1.4, M.aceroOsc, 0, -0.04, 0), K.caja(1.2, 2.2, 0.04, M.panel, 0, 1.1, -0.68), K.caja(0.04, 2.2, 1.4, M.panel, -0.58, 1.1, 0), K.caja(0.04, 2.2, 1.4, M.panel, 0.58, 1.1, 0));
      s.cabR.add(K.caja(1.2, 0.06, 1.4, M.gris, 0, 2.23, 0), K.caja(0.2, 2.2, 0.04, M.panel, -0.5, 1.1, 0.68), K.caja(0.2, 2.2, 0.04, M.panel, 0.5, 1.1, 0.68), K.caja(0.8, 0.2, 0.04, M.panel, 0, 2.1, 0.68));
      s.luzCab = K.caja(0.7, 0.01, 0.6, s.luz, 0, 2.195, 0); s.cabR.add(s.luzCab);
      s.hojasR = [-1, 1].map(function (l) { return K.add(K.caja(0.4, 2.0, 0.025, M.inox, l * 0.2, 1.0, 0.72), s.cabR); });
      s.gente = K.persona(1.62, 0xb5651d); s.gente.position.set(-0.1, 0, 0.1); s.cabR.add(s.gente);
      s.cwR = K.add(K.grupo([K.caja(0.14, 0.9, 0.42, M.pesa, 0, 0, 0)], RS.xp + 0.2, 3.3, -0.2));
      s.cwR.children[0].position.y = 0;
      s.polR = K.add(K.polea(0.2, 0.1, M.acero, M.hierro)); s.polR.position.set(RS.xp, RS.top, -0.2);
      K.add(K.cil(0.18, 0.3, M.aceroOsc, RS.xp, RS.top, -0.45, 'z', 30));
      s.sogas = [K.add(K.cable(0.008, M.hierro)), K.add(K.cable(0.008, M.hierro))];
      // tablero y caja de rescate en el pasillo del piso 2
      var gabM = K.mat(0xcfcab9, { roughness: 0.7, metalness: 0.2 });
      s.tabR = K.add(K.grupo([K.caja(0.36, 1.6, 0.16, gabM, 0, 0, 0)], 1.12, 3.6, 0.13));
      s.ledTR = K.esfera(0.012, s.verde, 0.12, 0.6, 0.082); s.tabR.add(s.ledTR);
      s.pantR = K.cartel('LISTO', 0.28, 0.08, '#0d1418', '#3ccf7f'); s.pantR.position.set(0, 0.45, 0.081); s.tabR.add(s.pantR);
      var et = K.cartel('TABLERO', 0.24, 0.06, '#e8e4d6', '#59636d'); et.position.set(0, 0.7, 0.081); s.tabR.add(et);
      s.cajaR = K.add(K.grupo([K.caja(0.36, 0.62, 0.18, K.mat(0x6d7680, { roughness: 0.6 }), 0, 0, 0)], 1.56, 3.32, 0.14));
      var er = K.cartel('RESCATE', 0.26, 0.06, '#e8e8e8', '#1e2125'); er.position.set(0, 0.25, 0.091); s.cajaR.add(er);
      s.bat = [0, 1, 2, 3].map(function (i) {
        var b = K.grupo([K.caja(0.07, 0.14, 0.05, K.mat(0x23272b, { roughness: 0.5 }), 0, 0, 0), K.cil(0.008, 0.012, M.rojo, -0.018, 0.075, 0, null, 8), K.cil(0.008, 0.012, M.negro, 0.018, 0.075, 0, null, 8)], -0.12 + i * 0.08, -0.08, 0.115);
        s.cajaR.add(b); return b;
      });
      s.barras = [0, 1, 2, 3].map(function (i) { var b = K.caja(0.05, 0.022, 0.006, s.apag, -0.09 + i * 0.06, 0.13, 0.092); s.cajaR.add(b); return b; });
      s.ledR = K.esfera(0.013, s.apag, 0.14, 0.19, 0.092); s.cajaR.add(s.ledR);
      // caminos: red → tablero; baterías → tablero; tablero → máquina
      var neg = K.mat(0x1b1d20, { roughness: 0.7 });
      var pRed = [[1.12, 5.0, 0.13], [1.12, 4.42, 0.13]], pBat = [[1.5, 3.64, 0.22], [1.5, 3.8, 0.22], [1.3, 3.8, 0.22]], pMot = [[1.12, 4.42, 0.08], [1.12, 4.6, 0.0], [0.95, 4.6, -0.3], [0.75, 4.42, -0.45]];
      [pRed, pBat, pMot].forEach(function (p) { K.add(K.tubo(p, 0.01, neg)); });
      s.cRedR = camino(pRed); s.cBat = camino(pBat.map(function (q) { return [q[0], q[1], q[2] + 0.014]; })); s.cMot = camino(pMot.map(function (q) { return [q[0], q[1] + 0.014, q[2]]; }));
      s.fRed = cuentas(K, 5, 0xffc62b, 0.014); s.fBat = cuentas(K, 5, 0x3ccf7f, 0.014); s.fMot = cuentas(K, 6, 0xff8a2a, 0.014);
      return s;
    },
    funciona: {
      dur: 19,
      subt: [[0, 'El rescate automático es una caja con baterías, al lado del tablero. Mientras hay luz, se mantiene cargada.'],
        [4.5, 'Se va la luz: la cabina se queda entre dos pisos, a oscuras y con gente adentro.'],
        [8.5, 'A los pocos segundos, las baterías se prenden solas y le dan fuerza al tablero y al motor.'],
        [12.5, 'La cabina baja despacio hasta el piso más cercano y abre las puertas. La gente sale tranquila.']],
      cam: [[0, [2.3, 4.1, 2.4], [1.3, 3.45, 0.1]], [3.6, [2.4, 4.0, 2.6], [1.3, 3.4, 0.1]], [4.8, [3.6, 2.1, 5.0], [0.3, 1.9, -0.3]], [8.2, [3.6, 2.1, 5.0], [0.3, 1.9, -0.3]],
        [9.2, [2.2, 3.95, 2.3], [1.32, 3.45, 0.1]], [10.6, [2.2, 3.95, 2.3], [1.32, 3.45, 0.1]], [12.0, [3.4, 1.8, 4.6], [0.2, 1.5, -0.3]], [14.0, [1.9, 1.7, 3.6], [0.0, 1.0, 0.0]], [19, [2.0, 1.7, 3.8], [0.0, 1.0, 0.1]]],
      anim: function (t, s, K) {
        var apagon = t > 4.6, resc = t > 8.6;
        rsBase(s, K, apagon ? 0 : 1);
        var cy = K.kf(t, [[0, 0.3], [4.6, 1.3], [10.4, 1.3], [13.2, 0]]), a = K.ph(t, 13.4, 14.6);
        rsCab(s, cy, a);
        s.luzCab.material = !apagon ? s.luz : resc ? s.amar : s.apag;
        s.gente.visible = a > 0.05; var sale = K.ph(t, 14.6, 17.5);
        s.gente.position.z = 0.1 + 1.3 * sale; if (K.entre(t, 14.6, 17.5)) s.gente.caminar(t);
        s.fRed.correr(s.cRedR, t, 0.3, !apagon); s.fBat.correr(s.cBat, t, 0.25, resc); s.fMot.correr(s.cMot, t, 0.3, K.entre(t, 10.2, 13.2));
        s.ledTR.material = !apagon ? s.verde : resc ? s.amar : s.apag;
        s.ledR.material = !apagon ? s.verde : resc ? (K.parpadeo(t, 1.5) ? s.amar : s.apag) : s.apag;
        rsCarga(s, t > 13.2 ? 3 : 4, s.verde);
        escribe(s, s.pantR, 'p', !apagon ? 'LISTO' : !resc ? '' : t < 13.2 ? 'RESCATE' : 'PISO 1', '#ffc62b');
        K.marcar(s.cajaR, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.bat, K.entre(t, 8.6, 10.6) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Rescate automático', [1.56, 3.66, 0.2]); K.rotulo('Baterías', [1.56, 3.24, 0.24], 'izq'); K.rotulo('Tablero', [1.12, 4.2, 0.2], 'izq'); }
        else if (t < 8.5) K.rotulo('Cabina entre pisos', [0.6, cy + 1.6, -0.2]);
        else if (t < 11) K.rotulo('Baterías encendidas', [1.56, 3.24, 0.24], 'izq');
        else if (t < 13.4) K.rotulo('Baja despacio', [0.6, cy + 1.3, -0.2]);
        else K.rotulo('Piso 1: puertas abiertas', [0.4, 1.9, 0.0]);
        K.tabla([['LUZ DEL EDIFICIO', apagon ? 'APAGÓN' : 'NORMAL', apagon ? 'mal' : 'ok'], ['RESCATE', !apagon ? 'CARGANDO' : resc ? 'TRABAJANDO' : 'ESPERANDO', resc ? 'ac' : ''], ['CABINA', t < 13.2 ? (apagon && !K.entre(t, 10.2, 13.2) ? 'ENTRE PISOS' : 'MOVIENDO') : 'EN PISO 1', t >= 13.2 ? 'ok' : '']]);
        if (K.entre(t, 4.7, 8.6)) K.aviso('Se fue la luz');
        if (t > 14.6) K.aviso('Rescate listo: gente afuera', false);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: las baterías están viejas. Se ven hinchadas y casi no guardan carga.'],
        [4.5, 'Se va la luz. El rescate intenta mover la cabina, pero no tiene fuerza y se queda a medio camino.'],
        [9.5, 'La gente queda atrapada entre pisos y a oscuras, hasta que llega un técnico a sacarla.'],
        [14, 'Arreglo: probar el rescate cortando la luz cada cierto tiempo y cambiar todas las baterías juntas cuando ya no cargan.']],
      cam: [[0, [2.05, 3.7, 1.55], [1.5, 3.3, 0.1]], [4.2, [2.05, 3.7, 1.6], [1.5, 3.3, 0.1]], [5.4, [3.6, 2.1, 5.0], [0.3, 1.9, -0.3]], [9.2, [3.6, 2.1, 5.0], [0.3, 1.9, -0.3]],
        [10.2, [2.9, 1.9, 3.9], [0.2, 1.7, -0.4]], [13.6, [2.9, 1.9, 3.9], [0.2, 1.7, -0.4]], [14.8, [2.05, 3.7, 1.6], [1.5, 3.3, 0.1]], [19, [2.1, 3.7, 1.7], [1.5, 3.3, 0.1]]],
      anim: function (t, s, K) {
        var arreglo = t >= 14, apagon = K.entre(t, 4.6, 14), resc = K.entre(t, 6.6, 14), mal = K.parpadeo(t, 2) ? 'mal' : null;
        rsBase(s, K, apagon ? 0 : 1);
        var nuevo = t > 15.6, hincha = nuevo ? 1 : 1.18;
        s.bat.forEach(function (b, i) { b.scale.set(hincha, 1, hincha + (nuevo ? 0 : 0.08 * (i % 2))); });
        var cy = K.kf(t, [[0, 1.3], [7.2, 1.3], [8.6, 0.95]]);
        rsCab(s, cy, 0);
        s.luzCab.material = !apagon ? s.luz : s.apag;
        s.fRed.correr(s.cRedR, t, 0.3, !apagon); s.fBat.correr(s.cBat, t, 0.12, K.entre(t, 6.6, 8.8)); s.fMot.correr(s.cMot, t, 0.15, K.entre(t, 7.2, 8.6));
        s.ledTR.material = !apagon ? s.verde : K.entre(t, 6.6, 8.8) ? s.amar : s.apag;
        s.ledR.material = nuevo ? s.verde : K.parpadeo(t, 2) ? s.rojo : s.apag;
        if (nuevo) rsCarga(s, Math.min(4, 1 + Math.floor((t - 15.6) * 2)), s.verde); else rsCarga(s, t > 8.6 && t < 14 ? 0 : 1, s.rojo);
        escribe(s, s.pantR, 'p', !apagon ? (nuevo && t > 17 ? 'PRUEBA OK' : 'LISTO') : t > 8.6 ? 'BATERÍA' : 'RESCATE', !apagon ? '#3ccf7f' : '#ff5a3c');
        if (t < 4.5) { K.marcar(s.bat, mal); K.rotulo('Baterías hinchadas', [1.56, 3.2, 0.26], 'izq'); K.rotulo('Carga muy baja', [1.5, 3.45, 0.24]); }
        else if (t < 9.5) { K.marcar(s.bat, t > 8.6 ? mal : null); K.rotulo(t < 8.6 ? 'Intenta bajar…' : 'Se quedó sin fuerza', [0.6, cy + 1.6, -0.2]); }
        else if (!arreglo) { K.marcar(s.cabR, mal); K.rotulo('Gente atrapada entre pisos', [0.5, cy + 1.3, -0.2]); }
        else { K.marcar(s.bat, nuevo ? 'foco' : null); K.rotulo(nuevo ? 'Juego de baterías nuevo' : 'Se cambian todas', [1.56, 3.2, 0.26], 'izq'); }
        K.tabla([['BATERÍAS', nuevo ? 'NUEVAS' : 'VIEJAS', nuevo ? 'ok' : 'mal'], ['CARGA', nuevo ? 'LLENA' : t > 8.6 && t < 14 ? 'AGOTADA' : 'MUY BAJA', nuevo ? 'ok' : 'mal'], ['CABINA', t < 14 && t > 8.6 ? 'ATRAPADA' : 'ENTRE PISOS', 'mal']].slice(0, t >= 14 ? 2 : 3));
        if (K.entre(t, 9.6, 14)) K.aviso('Gente atrapada: no llegó al piso');
        if (t > 17) K.aviso('Prueba de rescate: OK', false);
      }
    }
  });

  // =====================================================================================
  // 8) Cable viajero: cinta plana que cuelga en U entre una caja del muro (fija) y la parte de abajo de la
  //    cabina. La U está en el plano x = 0.8 (costado derecho de la cabina); la curva recorre la mitad que la cabina.
  // =====================================================================================
  var CV = { x: 0.8, ym: 3.4, zw: -0.88, zc: -0.2, L: 6.15 };
  CV.r = (CV.zc - CV.zw) / 2;
  // puntos de la U para una cabina con el piso en cy; devuelve también la altura de la curva
  function cvPuntos(cy, dx) {
    var ya = cy - 0.12, yb = (CV.ym + ya - CV.L + PI * CV.r) / 2, x = CV.x + (dx || 0), pts = [], zm = (CV.zw + CV.zc) / 2, i;
    for (i = 0; i <= 8; i++) pts.push([x, CV.ym - 0.1 - (CV.ym - 0.1 - yb) * i / 8, CV.zw]);
    for (i = 1; i <= 16; i++) { var a = PI * i / 16; pts.push([x, yb - Math.sin(a) * CV.r, zm - Math.cos(a) * CV.r]); }
    for (i = 1; i <= 8; i++) pts.push([x, yb + (ya - yb) * i / 8, CV.zc]);
    return { pts: pts, yb: yb - CV.r, ya: ya };
  }
  function cvBase(s, K) {
    s.lupa.visible = false; s.lupaL.visible = false; s.chisV.visible = false; s.grietas.visible = false;
    s.fl.forEach(function (f) { f.visible = false; });
    s.hilos.forEach(function (h, i) { h.material = h.userData.m0 || h.material; });
    s.focoC.material = s.luz;
    K.marcar([s.cajaH, s.cv, s.hilos[2], s.hilos[3], s.hilos[5]], null);
    K.marcar(s.cv.seg, null);
  }
  function cvCabina(s, K, cy) {
    s.cabV.position.y = cy; s.cwV.position.y = 6.2 - cy;
    var u = cvPuntos(cy); s.cv.poner(u.pts); s.yb = u.yb; s.ya = u.ya; s.u = u;
    s.yRef = (u.yb + Math.max(u.ya, CV.ym)) / 2; s.yLoop = u.yb;
    return u;
  }
  V3.escena('ele-cable-viajero', ['cable_viajero'], {
    fov: 38, poster: 4,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K); s.K = K;
      // cámara: claves relativas a la altura de la U (cap. 1) o al fondo de la curva (cap. 2)
      s.camW = [[0, [4.8, 1.6, 4.8], [0.3, 0.2, -0.4]], [4.5, [4.0, 1.3, 3.9], [0.5, 0.3, -0.4]], [8.5, [4.9, 1.5, 4.8], [0.3, 0.3, -0.4]], [12.8, [4.9, 1.5, 4.8], [0.3, 0.3, -0.4]],
        [13.8, [3.1, 0.1, 2.9], [0.7, -1.2, -0.5]], [18, [3.2, 0.1, 3.0], [0.7, -1.2, -0.5]]];
      s.camF = [[0, [2.4, 1.0, 2.6], [1.1, 0.45, 0.0]], [4.2, [2.4, 1.0, 2.6], [1.1, 0.45, 0.0]], [5.2, [4.4, 2.6, 4.6], [0.3, 1.9, -0.4]], [9.2, [4.4, 2.6, 4.6], [0.3, 1.9, -0.4]],
        [10.2, [2.3, 0.6, 2.4], [0.8, 0.15, -0.5]], [13.6, [2.3, 0.6, 2.4], [0.8, 0.15, -0.5]], [14.6, [2.4, 1.0, 2.6], [1.1, 0.45, 0.0]], [19, [2.5, 1.0, 2.7], [1.1, 0.45, 0.0]]];
      K.add(K.caja(2.2, 9.6, 0.06, M.muro, 0.1, 3.6, -1.05));
      K.add(K.caja(2.2, 0.06, 2.4, M.losa, 0.1, -1.23, 0));
      var r1 = K.riel(9.0, M.acero); r1.position.set(-0.68, -1.2, 0); r1.rotation.y = PI / 2; K.add(r1);
      [0, 2.8, 5.6].forEach(function (y0, f) {
        K.add(K.caja(2.2, 0.12, 0.6, M.hall, 0.1, y0 - 0.06, 1.05));
        var c = K.cartel('PISO ' + (f + 1), 0.3, 0.08, '#e2dfd6', '#59636d'); c.position.set(0.95, y0 + 0.3, 0.76); K.add(c);
      });
      // cabina (cerrada), con su soporte para el cable abajo y una lámpara en el techo
      var cajaM = K.mat(0x9aa3ab, { roughness: 0.6 });
      s.cabV = K.add(new T.Group());
      s.cabV.add(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.1, 0), K.caja(1.26, 0.08, 1.46, M.aceroOsc, 0, -0.04, 0), K.caja(1.26, 0.05, 1.46, M.aceroOsc, 0, 2.225, 0));
      s.cabV.add(K.caja(0.8, 2.0, 0.02, M.aceroOsc, 0, 1.0, 0.71));
      s.cabV.add(K.caja(0.28, 0.06, 0.08, M.hierro, 0.66, -0.08, CV.zc), K.caja(0.12, 0.08, 0.1, M.negro, CV.x, -0.1, CV.zc));
      s.cabV.add(K.caja(0.08, 0.1, 0.08, cajaM, CV.x - 0.1, 1.6, CV.zc), K.cil(0.02, 1.7, M.negro, 0.65, 0.8, CV.zc, null, 8));
      s.focoC = K.caja(0.18, 0.06, 0.08, s.luz, 0.3, 2.28, 0.55); s.cabV.add(s.focoC);
      s.cwV = K.add(K.grupo([K.caja(0.7, 1.0, 0.14, M.pesa, 0, 0, 0)], -0.2, 6.2, -0.92));
      s.cwV.position.x = -0.25;
      // caja del hueco donde se fija el cable y canaleta que sube al tablero
      s.cajaH = K.add(K.caja(0.22, 0.26, 0.12, cajaM, CV.x, CV.ym, -0.96));
      K.add(K.caja(0.06, 4.9, 0.04, M.gris, CV.x, CV.ym + 2.58, -1.0));
      var et = K.cartel('AL TABLERO', 0.3, 0.06, '#e2dfd6', '#59636d'); et.position.set(CV.x - 0.25, 7.6, -1.01); K.add(et);
      // la cinta
      s.cv = cinta(K, 32, 0.08, 0.016, K.mat(0x2b2f34, { roughness: 0.8 }), true);
      // cuentas: luz (amarillo), botones (azul) y seguridades (verde)
      s.fl = [cuentas(K, 8, 0xffc62b, 0.024), cuentas(K, 8, 0x4aa3ff, 0.024), cuentas(K, 8, 0x3ccf7f, 0.024)];
      // lupa: un tramo del cable abierto, con sus hilos por dentro
      s.lupa = K.add(new T.Group());
      s.lupa.add(K.caja(0.66, 0.16, 0.05, K.mat(0x2b2f34, { transparent: true, opacity: 0.25, depthWrite: false }), 0, 0, 0));
      [[0, 0.09], [0, -0.09]].forEach(function (q) { s.lupa.add(K.caja(0.7, 0.012, 0.012, M.amarillo, q[0], q[1], 0)); });
      [-0.35, 0.35].forEach(function (x) { s.lupa.add(K.caja(0.012, 0.19, 0.012, M.amarillo, x, 0, 0)); });
      s.hilos = [];
      [0xd03a2c, 0x2e5f90, 0xf2b705, 0xf2b705, 0x2e7a5c, 0x8e979f].forEach(function (col, i) {
        var y = 0.06 - i * 0.024, m = K.mat(col, { roughness: 0.5 });
        if (i === 2 || i === 3) { var h = K.cil(0.008, 0.29, m, i === 2 ? -0.17 : 0.17, 0.012, 0, 'x', 10); h.userData.m0 = m; s.lupa.add(h); s.hilos.push(h); }
        else { var h2 = K.cil(0.008, 0.62, m, 0, y, 0, 'x', 10); h2.userData.m0 = m; s.lupa.add(h2); s.hilos.push(h2); }
      });
      s.hilos[2].position.y = s.hilos[3].position.y = 0.06 - 2 * 0.024;
      s.verdeH = K.mat(0x3ccf7f, { emissive: 0x1e6b3a, roughness: 0.4 });
      s.lupaL = K.add(K.cable(0.004, K.matB(0xf2b705)));
      s.chisV = K.add(K.chispas(12));
      // grietas del forro en la curva
      s.grietas = K.add(new T.Group());
      for (var g = 0; g < 7; g++) s.grietas.add(K.caja(0.09, 0.006, 0.03, K.matB(0xff3b30), 0, 0, 0));
      return s;
    },
    camara: function (s, c, t, dur, pos, mira) {
      var k = c ? s.camF : s.camW;
      kfv(s.K, t, k.map(function (x) { return [x[0], x[1]]; }), pos); kfv(s.K, t, k.map(function (x) { return [x[0], x[2]]; }), mira);
      var ref = c ? s.yLoop : s.yRef; pos.y += ref; mira.y += ref;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'El cable viajero es un cable plano que une la cabina con el tablero. Cuelga en forma de U.'],
        [4.5, 'Una punta está fija en una caja del muro, a media altura. La otra va debajo de la cabina.'],
        [8.5, 'Cuando la cabina sube o baja, la curva de la U la sigue, pero recorre solo la mitad.'],
        [13, 'Por adentro lleva la luz de la cabina, los botones y las señales de seguridad.']],
      anim: function (t, s, K) {
        cvBase(s, K);
        var cy = K.kf(t, [[0, 0], [1.2, 0], [5.6, 5.6], [8.4, 5.6], [11.2, 2.8], [12.6, 2.8], [15.4, 0]]);
        var u = cvCabina(s, K, cy);
        if (t > 12.6) [-0.03, 0, 0.03].forEach(function (dx, i) { var p = cvPuntos(cy, dx).pts, c = camino(i === 1 ? p.slice().reverse() : p); s.fl[i].correr(c, t + i * 0.3, 0.5, true); });
        K.marcar(s.cv, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.cajaH, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        var fondo = [CV.x, u.yb + 0.02, (CV.zw + CV.zc) / 2];
        if (t < 4.5) K.rotulo('Cable viajero', [CV.x, (u.yb + CV.ym) / 2, CV.zw]);
        else if (t < 8.5) { K.rotulo('Punta fija en el muro', [CV.x, CV.ym, -0.9]); K.rotulo('Punta en la cabina', [CV.x, u.ya, CV.zc], 'izq'); }
        else if (t < 13) { K.rotulo('Curva de la U', fondo); K.rotulo('Cabina', [0.6, cy + 1.2, 0.3], 'izq'); }
        else { K.rotulo('Luz', s.fl[0].children[0]); K.rotulo('Botones', s.fl[1].children[3], 'izq'); K.rotulo('Seguridades', s.fl[2].children[6]); }
        K.tabla([['CABINA', 'PISO ' + (Math.round(cy / 2.8) + 1) + (K.entre(cy % 2.8, 0.05, 2.75) ? ' →' : ''), ''], ['ALTURA DE LA CABINA', cy.toFixed(1) + ' m', 'ac'], ['ALTURA DE LA CURVA', u.yb.toFixed(1) + ' m', 'ac']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: de tanto doblarse en la curva, un hilo de adentro se parte. Por fuera casi no se nota.'],
        [4.5, 'El hilo hace contacto a ratos: la luz de la cabina parpadea y el ascensor se para y luego sigue.'],
        [9.5, 'Con los años el forro se pone tieso y se cuartea, sobre todo en la curva, donde más se dobla.'],
        [14, 'Arreglo: con el ascensor detenido, el técnico mide los hilos y pasa la señal a un hilo de reserva. Si el forro está cuarteado, cambia el cable.']],
      anim: function (t, s, K) {
        cvBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null;
        var cy = K.kf(t, [[0, 0], [0.6, 0], [4.2, 2.8], [5.2, 2.8], [6.4, 1.9], [6.45, 1.9], [7.4, 1.9], [9.0, 0], [19, 0]]);
        var u = cvCabina(s, K, cy), fondo = [CV.x, u.yb, (CV.zw + CV.zc) / 2];
        var contacto = !(K.entre(t, 6.4, 7.4) || (t < 14 && K.ruido(Math.floor(t * 5)) > 0.7));
        var reserva = t > 15.6;
        // lupa al lado de la curva, unida con una línea
        var vLupa = t < 9.5 || t >= 14;
        s.lupa.visible = vLupa; s.lupaL.visible = vLupa;
        s.lupa.position.set(CV.x + 0.75, u.yb + 0.7, 0.45); s.lupa.rotation.y = 0.5; s.lupa.scale.setScalar(1.5);
        s.lupaL.pon([CV.x + 0.3, u.yb + 0.62, 0.2], [CV.x, u.yb + 0.03, (CV.zw + CV.zc) / 2]);
        var gx = s.lupa.position;
        s.hilos[2].position.x = -0.17 + (contacto && !reserva ? 0.012 : 0); s.hilos[3].position.x = 0.17 - (contacto && !reserva ? 0.012 : 0);
        s.chisV.emitir(t, [gx.x, gx.y + 0.012, gx.z], vLupa && !reserva && K.entre(t % 1, 0.1, 0.4) && t < 14, 0.07);
        if (reserva) { s.hilos[5].material = s.verdeH; s.hilos[2].material = s.apag; s.hilos[3].material = s.apag; }
        s.focoC.material = contacto || reserva ? s.luz : s.apag;
        // grietas en la curva
        s.grietas.visible = t >= 9.5 && t < 14;
        s.grietas.children.forEach(function (g, i) { var p = u.pts[10 + i * 2]; g.position.set(p[0] + 0.01, p[1], p[2]); g.rotation.x = -(PI * (i * 2 + 2) / 16) + PI / 2; });
        if (t < 4.5) { K.marcar([s.hilos[2], s.hilos[3]], mal); K.rotulo('Hilo partido', [gx.x, gx.y + 0.1, gx.z]); K.rotulo('Curva: donde más se dobla', fondo, 'izq'); }
        else if (t < 9.5) { K.marcar([s.hilos[2], s.hilos[3]], contacto ? null : 'mal'); K.rotulo(contacto ? 'Hace contacto' : 'Se abre: se para', [gx.x, gx.y + 0.1, gx.z]); K.rotulo('Luz', [0.3, cy + 2.32, 0.55], 'izq'); if (K.entre(t, 6.4, 7.4)) K.aviso('El ascensor se paró solo'); }
        else if (t < 14) { K.marcar(s.cv.seg.slice(9, 26), mal); K.rotulo('Forro cuarteado', fondo); }
        else { K.marcar(s.hilos[5], reserva ? 'foco' : null); K.marcar([s.hilos[2], s.hilos[3]], reserva ? null : mal); K.rotulo(reserva ? 'Hilo de reserva' : 'Medir los hilos', [gx.x, gx.y - 0.06, gx.z], 'izq'); }
        K.tabla([['HILO', reserva ? 'CAMBIADO A RESERVA' : contacto ? 'PARTIDO (A RATOS)' : 'ABIERTO', reserva ? 'ok' : 'mal'], ['LUZ DE CABINA', contacto || reserva ? 'PRENDIDA' : 'APAGADA', contacto || reserva ? '' : 'mal'],
          ['ASCENSOR', t >= 14 ? (t < 17.5 ? 'DETENIDO' : 'EN SERVICIO') : K.entre(t, 6.4, 7.4) ? 'SE PARÓ' : 'VIAJA', t >= 14 ? (t < 17.5 ? 'ac' : 'ok') : K.entre(t, 6.4, 7.4) ? 'mal' : '']]);
        if (t > 17.5) K.aviso('Señal por el hilo de reserva', false);
      }
    }
  });

  // =====================================================================================
  // 9) Sensores de posición: un sensor en U sobre la cabina y una placa de metal por piso junto a la guía.
  //    Pisos en y = 0, 2.8 y 5.6; el centro del sensor queda 2.46 m sobre el piso de la cabina.
  // =====================================================================================
  var PS = { y: [0, 2.8, 5.6], h: 2.46, xv: -0.78 };
  function psBase(s, K) {
    s.placas.forEach(function (p, f) { p.position.y = PS.y[f] + PS.h; });
    s.gente.visible = false; s.gente.caminar(0, 0); s.gente.rotation.x = 0;
    K.marcar([s.sensor, s.placas[0], s.placas[1], s.placas[2], s.escalon], null);
    s.escalon.visible = false;
  }
  // la cabina en cy: luz del sensor cuando tiene una placa adentro y cuenta de pisos
  function psCabina(s, K, cy, cuenta) {
    s.cabP.position.y = cy;
    var ys = cy + PS.h, dentro = false;
    s.placas.forEach(function (p) { if (Math.abs(p.position.y - ys) < 0.17) dentro = true; });
    s.ledP.material = dentro ? s.verde : s.apag;
    escribe(s, s.pantP, 'p', String(cuenta), '#ff5a3c');
    s.ys = ys;
    return dentro;
  }
  V3.escena('ele-posicion', ['posicionamiento'], {
    fov: 36, poster: 2,
    construir: function (K) {
      var M = K.M, T = K.T, s = mats(K); s.K = K;
      // cámara: en el cap. 1 sigue al sensor (claves relativas a su altura); en el cap. 2 es fija
      s.camW = [[0, [0.2, 0.3, 0.85], [-0.72, -0.02, 0]], [3.8, [0.18, 0.28, 0.8], [-0.72, -0.02, 0]], [5.0, [-0.78, 0.5, 1.9], [-0.62, -0.25, 0]], [12.4, [-0.78, 0.5, 1.9], [-0.62, -0.25, 0]],
        [13.8, [1.3, -1.7, 2.5], [0.1, -2.46, 0.75]], [18, [1.35, -1.7, 2.6], [0.1, -2.46, 0.75]]];
      s.camF = [[0, [0.25, 5.55, 1.3], [-0.78, 5.22, 0]], [4.2, [0.25, 5.55, 1.3], [-0.78, 5.22, 0]], [5.2, [0.6, 3.6, 4.4], [-0.3, 3.0, 0]], [7.8, [0.6, 3.6, 4.4], [-0.3, 3.0, 0]], [8.8, [2.0, 3.25, 1.6], [0.2, 2.8, 0.75]],
        [9.6, [2.0, 3.25, 1.6], [0.2, 2.8, 0.75]], [13.6, [2.05, 3.3, 1.75], [0.15, 2.85, 0.75]], [14.6, [0.25, 5.55, 1.3], [-0.78, 5.2, 0]], [16.8, [0.25, 5.55, 1.3], [-0.78, 5.2, 0]],
        [17.6, [2.0, 3.25, 1.6], [0.2, 2.8, 0.75]], [19, [2.05, 3.25, 1.7], [0.2, 2.8, 0.75]]];
      K.add(K.caja(2.4, 9.6, 0.06, M.muro, 0.0, 3.6, -1.0));
      K.add(K.caja(0.07, 9.6, 0.016, M.acero, -0.95, 3.6, 0)); K.add(K.caja(0.016, 9.6, 0.09, M.acero, -0.99, 3.6, 0));
      s.placas = PS.y.map(function (y0, f) {
        K.add(K.caja(1.7, 0.14, 0.6, M.hall, 0.4, y0 - 0.07, 1.06));
        K.add(K.caja(0.9, 0.025, 0.04, M.amarillo, 0.0, y0 - 0.0125, 0.77));
        var c = K.cartel('PISO ' + (f + 1), 0.3, 0.08, '#e2dfd6', '#59636d'); c.position.set(0.85, y0 + 0.35, 0.76); K.add(c);
        K.add(K.caja(0.1, 0.04, 0.04, M.hierro, -0.9, y0 + PS.h, 0));
        return K.add(K.grupo([K.caja(0.16, 0.26, 0.006, M.cromo, 0, 0, 0), K.cil(0.012, 0.02, M.hierro, -0.05, 0.08, 0, 'z', 10), K.cil(0.012, 0.02, M.hierro, -0.05, -0.08, 0, 'z', 10)], PS.xv, y0 + PS.h, 0));
      });
      // cabina con el sensor en U sobre el techo, al costado de la guía
      s.cabP = K.add(new T.Group());
      s.cabP.add(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.1, 0), K.caja(1.26, 0.08, 1.46, M.aceroOsc, 0, -0.04, 0), K.caja(1.26, 0.05, 1.46, M.aceroOsc, 0, 2.225, 0));
      s.cabP.add(K.caja(0.8, 2.0, 0.02, M.aceroOsc, 0, 1.0, 0.71), K.caja(0.9, 0.025, 0.04, M.amarillo, 0, -0.0125, 0.72));
      s.pantP = K.cartel('1', 0.16, 0.1, '#10161b', '#ff5a3c'); s.pantP.position.set(0, 2.12, 0.72); s.cabP.add(s.pantP);
      s.sensor = K.grupo([K.caja(0.1, 0.05, 0.14, M.hierro, 0.04, -0.17, 0), K.caja(0.03, 0.16, 0.03, M.hierro, 0.04, -0.08, 0),
        K.caja(0.04, 0.09, 0.11, M.negro, 0, 0, 0), K.caja(0.13, 0.09, 0.016, M.negro, -0.07, 0, 0.04), K.caja(0.13, 0.09, 0.016, M.negro, -0.07, 0, -0.04)], -0.62, PS.h, 0);
      s.cabP.add(s.sensor);
      s.ledP = K.esfera(0.014, s.apag, -0.62, PS.h + 0.055, 0); s.cabP.add(s.ledP);
      s.ondas = ondas(K, 3, 0x3ccf7f);
      // escalón marcado (falla) y una persona en el pasillo
      s.escalon = K.add(K.caja(0.9, 0.12, 0.012, K.matB(0xff3b30, { transparent: true, opacity: 0.7 }), 0, 0, 0.752));
      s.gente = K.add(K.persona(1.6, 0x7f95a8));
      return s;
    },
    camara: function (s, c, t, dur, pos, mira) {
      var k = c ? s.camF : s.camW, ref = c ? 0 : s.ys;
      kfv(s.K, t, k.map(function (x) { return [x[0], x[1]]; }), pos); kfv(s.K, t, k.map(function (x) { return [x[0], x[2]]; }), mira);
      pos.y += ref; mira.y += ref;
    },
    funciona: {
      dur: 18,
      subt: [[0, 'En cada piso del hueco hay una placa de metal fija. Arriba de la cabina va un sensor en forma de U.'],
        [4.5, 'Cuando la cabina viaja, la placa pasa por la ranura del sensor sin tocarlo, y se prende su luz.'],
        [8.5, 'Cada placa que pasa es un piso más: así el tablero sabe dónde está la cabina.'],
        [13, 'Al llegar, frena hasta que la placa queda al centro del sensor. La cabina para al ras del piso.']],
      anim: function (t, s, K) {
        psBase(s, K);
        var cy = 5.6 * K.ph(t, 4.2, 13.8), cuenta = cy < 2.8 - 0.17 ? 1 : cy < 5.6 - 0.17 ? 2 : 3;
        var dentro = psCabina(s, K, cy, cuenta);
        s.ondas.poner(t, [-0.62, cy + PS.h + 0.06, 0.07], dentro && K.entre(t, 4.2, 13.8), 0.05);
        K.marcar(s.sensor, t < 4.5 && K.parpadeo(t, 1) ? 'foco' : null);
        K.marcar(s.placas, t < 4.5 ? null : dentro ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Sensor en U', [-0.62, cy + PS.h + 0.06, 0], 'izq'); K.rotulo('Placa del piso 1', [PS.xv, PS.h - 0.1, 0]); }
        else if (t < 13) { K.rotulo(dentro ? 'Pasa una placa: luz' : 'Sensor', [-0.62, cy + PS.h + 0.06, 0], 'izq'); K.rotulo('Pantalla: ' + cuenta, [0, cy + 2.12, 0.73]); }
        else { K.rotulo('Al ras del piso', [0.3, cy, 0.76]); }
        K.tabla([['SENSOR', dentro ? 'VE UNA PLACA' : 'LIBRE', dentro ? 'ok' : ''], ['PISO CONTADO', String(cuenta), 'ac'], ['CABINA', t < 4.2 ? 'QUIETA EN PISO 1' : t < 13.8 ? 'SUBIENDO' : 'AL RAS EN PISO 3', t >= 13.8 ? 'ok' : '']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: la placa del piso 2 se aflojó y se resbaló unos centímetros hacia abajo.'],
        [4.5, 'La cabina para donde está la placa, no donde está el piso: queda un escalón.'],
        [9.5, 'Es peligroso: la gente se tropieza al entrar o salir. Siempre pasa en ese mismo piso.'],
        [14, 'Arreglo: con el ascensor detenido, el técnico pone la placa en su sitio, la ajusta bien y prueba que pare al ras.']],
      anim: function (t, s, K) {
        psBase(s, K);
        var mal = K.parpadeo(t, 2) ? 'mal' : null, baja = 0.12 * K.ph(t, 1.2, 2.6) * (1 - K.ph(t, 15.2, 16.4));
        s.placas[1].position.y = PS.y[1] + PS.h - baja;
        var cy = K.kf(t, [[0, 0], [5.0, 0], [8.6, PS.y[1] - 0.12], [17.0, PS.y[1] - 0.12], [17.8, PS.y[1]]]);
        psCabina(s, K, cy, cy > 2.6 ? 2 : 1);
        var paso = (PS.y[1] - cy);
        s.escalon.visible = paso > 0.02 && t > 8.6; s.escalon.position.y = cy + paso / 2; s.escalon.scale.y = Math.max(0.01, paso / 0.12);
        // la persona camina hacia la cabina y se tropieza con el escalón
        if (K.entre(t, 9.5, 14)) {
          s.gente.visible = true; s.gente.rotation.y = PI;
          var z = K.kf(t, [[9.5, 1.3], [11.2, 0.92]]); s.gente.position.set(-0.22, PS.y[1], z);
          if (t < 11.2) s.gente.caminar(t);
          var tropieza = K.ph(t, 11.2, 11.6) * (1 - K.ph(t, 12.6, 13.2));
          s.gente.rotation.x = -0.32 * tropieza; s.gente.brazoD.rotation.x = -1.2 * tropieza; s.gente.brazoI.rotation.x = -1.2 * tropieza;
        }
        if (t < 4.5) { K.marcar(s.placas[1], mal); K.rotulo('Placa floja: se resbaló', [PS.xv, PS.y[1] + PS.h - baja + 0.14, 0]); K.tabla([['PLACA PISO 2', baja > 0.06 ? '12 cm MÁS ABAJO' : 'SE AFLOJA', 'mal']]); }
        else if (t < 9.5) {
          K.marcar(s.placas[1], mal);
          if (t > 8.6) { K.marcar(s.escalon, mal); K.rotulo('Escalón de 12 cm', [0.3, cy + paso / 2, 0.77]); K.aviso('Paró desnivelada'); }
          K.tabla([['PLACA PISO 2', 'CORRIDA', 'mal'], ['CABINA', t > 8.6 ? '12 cm ABAJO' : 'SUBIENDO', t > 8.6 ? 'mal' : '']]);
        } else if (t < 14) {
          K.marcar(s.escalon, mal); K.rotulo('Escalón', [0.3, cy + paso / 2, 0.77]);
          if (t > 11.2) K.aviso('¡Se tropieza!');
          K.tabla([['ESCALÓN', '12 cm', 'mal'], ['PISO', 'SIEMPRE EL 2', 'mal']]);
        } else {
          var lista = t > 16.4;
          K.marcar(s.placas[1], lista ? 'foco' : mal);
          if (t < 17) K.rotulo(lista ? 'Placa en su sitio y ajustada' : 'Se sube la placa', [PS.xv, PS.y[1] + PS.h + 0.14, 0]);
          else K.rotulo(paso < 0.01 ? 'Al ras: sin escalón' : 'Nivela…', [0.3, cy, 0.77]);
          K.tabla([['ASCENSOR', t < 17 ? 'DETENIDO' : 'PRUEBA', 'ac'], ['PLACA PISO 2', lista ? 'EN SU SITIO' : 'CORRIDA', lista ? 'ok' : 'mal'], ['ESCALÓN', paso < 0.01 ? 'NO HAY' : (paso * 100).toFixed(0) + ' cm', paso < 0.01 ? 'ok' : 'mal']]);
          if (t > 17.9) K.aviso('Para al ras otra vez', false);
        }
      }
    }
  });
})();
