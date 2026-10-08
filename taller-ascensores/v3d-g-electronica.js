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
})();
