/* Taller de Ascensores — videos 3D: máquina, freno y tracción.
   Cada escena: construir(K) arma las piezas una vez; funciona/falla.anim(t, s, K) las mueve en cada cuadro;
   cam = claves de cámara [t, [posición], [a dónde mira]]; subt = subtítulos sencillos. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;

  // ---------- freno y sus microswitches ----------
  S.freno = {
    que: 'Es el freno del motor: dos zapatas que aprietan una rueda de metal, como el freno de una bicicleta.',
    sirve: 'Mantiene la cabina quieta cuando para en un piso y cuando se va la luz.',
    falla: 'Si las zapatas se gastan o tienen aceite, el freno patina y la cabina se pasa del piso.',
    arreglo: 'El técnico cambia las zapatas y ajusta el freno, siempre con la cabina vacía y asegurada.'
  };
  S.micro_freno = {
    que: 'Son dos interruptores pequeños pegados al freno.',
    sirve: 'Le avisan al tablero si el freno de verdad se abrió y se cerró.',
    falla: 'Si un micro se mueve de su sitio, el tablero cree que el freno no abrió y muestra «error de freno».',
    arreglo: 'Se ajusta la posición del micro hasta que cambie bien al abrir y al cerrar el freno.'
  };
  V3.escena('freno', ['freno', 'micro_freno'], {
    fov: 32,
    construir: function (K) {
      var M = K.M, T = K.T, s = {};
      K.add(K.caja(1.4, 0.06, 0.62, M.hierro, 0, -0.03, 0));
      K.add(K.cil(0.28, 0.44, M.aceroOsc, 0, 0.42, -0.38, 'z', 40));
      K.add(K.cil(0.045, 0.8, M.acero, 0, 0.42, -0.1, 'z', 16));
      s.tambor = K.add(K.polea(0.22, 0.14, M.acero, M.hierro)); s.tambor.position.set(0, 0.42, 0.06);
      s.forro = K.mat(0x6d5a43, { roughness: 0.9, metalness: 0 });
      s.forroMal = K.mat(0x3a2a18, { roughness: 0.3, metalness: 0.2 });
      s.verde = K.matB(0x3ccf7f); s.amar = K.matB(0xffc62b); s.rojo = K.matB(0xff3b30);
      s.brazos = [-1, 1].map(function (lado) {
        var piv = new T.Group(); piv.position.set(lado * 0.36, 0.06, 0.06); K.add(piv);
        piv.add(K.caja(0.05, 0.66, 0.1, M.aceroOsc, 0, 0.33, 0));
        piv.add(K.caja(0.08, 0.05, 0.07, M.aceroOsc, -lado * 0.05, 0.36, 0));
        var pad = K.caja(0.022, 0.24, 0.13, s.forro, -lado * 0.124, 0.36, 0);
        var zap = K.grupo([K.caja(0.03, 0.26, 0.12, M.hierro, -lado * 0.1, 0.36, 0), pad]);
        piv.add(zap);
        K.add(K.caja(0.05, 0.16, 0.14, M.hierro, lado * 0.66, 0.66, 0.06));
        var res = K.resorte(0.035, 1, 7, 0.008, M.cobre); res.rotation.z = lado * Math.PI / 2; res.position.set(lado * 0.64, 0.66, 0.06); K.add(res);
        var varilla = K.add(K.cable(0.01, M.hierro));
        var micro = K.add(K.caja(0.08, 0.06, 0.06, M.negro, lado * 0.53, 0.3, 0.14));
        var palanca = K.add(K.cable(0.006, M.acero));
        var led = K.add(K.esfera(0.014, s.verde, lado * 0.53, 0.345, 0.14));
        return { lado: lado, piv: piv, pad: pad, res: res, varilla: varilla, micro: micro, palanca: palanca, led: led };
      });
      s.bobina = K.add(K.caja(0.26, 0.14, 0.16, M.gris, 0, 0.8, 0.06));
      return s;
    },
    // posición de un punto del brazo (altura h sobre el pivote) con el brazo abierto un ángulo a
    funciona: {
      dur: 18,
      subt: [[0, 'El freno es como el de una bicicleta: dos zapatas aprietan una rueda de metal (el tambor) para que el motor no gire.'],
        [4.5, 'Sin corriente, los resortes aprietan las zapatas. Por eso, si se va la luz, el ascensor queda frenado.'],
        [8.5, 'Para viajar, el tablero manda corriente a la bobina: se vuelve imán, separa las zapatas y el tambor gira.'],
        [13, 'Dos interruptores pequeños, los micros, avisan al tablero que el freno abrió de verdad.']],
      cam: [[0, [1.75, 1.17, 2.24], [0, 0.4, 0]], [4.5, [1.21, 0.97, 1.59], [0.3, 0.55, 0.05]], [8.5, [0.21, 1.11, 1.87], [0, 0.55, 0.05]], [12.5, [-1.03, 0.71, 1.43], [-0.4, 0.33, 0.1]], [17.5, [1.61, 1.09, 2.1], [0, 0.42, 0]]],
      anim: function (t, s, K) {
        var a = K.kf(t, [[0, 0], [8.6, 0], [9.4, 0.09], [15.6, 0.09], [16.4, 0]]), on = K.entre(t, 8.5, 15.6);
        var giro = K.integ(function (x) { return K.kf(x, [[0, 0], [9.6, 0], [10.4, 4], [14.6, 4], [15.5, 0]]); }, t);
        frenoPone(s, K, { aL: a, aR: a, bobina: on, giro: giro });
        K.tabla([['BOBINA', on ? 'CON CORRIENTE' : 'SIN CORRIENTE', on ? 'ac' : ''], ['MICROS', a > 0.05 ? 'FRENO ABIERTO' : 'FRENO CERRADO', a > 0.05 ? 'ac' : 'ok'], ['MOTOR', giro > 0 && K.entre(t, 9.6, 15.5) ? 'GIRA' : 'QUIETO', '']]);
        if (t < 8.5) { K.rotulo('Tambor', [0, 0.66, 0.06]); K.rotulo('Zapata', [-0.24, 0.5, 0.1], 'izq'); K.rotulo('Resorte', [0.52, 0.7, 0.06]); }
        if (K.entre(t, 8.5, 13)) K.rotulo('Bobina (imán)', [0, 0.88, 0.06]);
        if (t >= 13) { K.rotulo('Micro', [-0.53, 0.3, 0.14], 'izq'); K.marcar([s.brazos[0].micro, s.brazos[1].micro], K.parpadeo(t, 1) ? 'foco' : null); }
        else K.marcar([s.brazos[0].micro, s.brazos[1].micro], null);
        K.marcar(s.bobina, on ? 'foco' : null);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: un micro se movió de su sitio. El freno abre, pero el micro no se entera.'],
        [4.5, 'El tablero cree que el freno sigue cerrado: no deja arrancar y muestra «error de freno».'],
        [9, 'Falla 2: las zapatas están gastadas o con aceite. El freno aprieta pero patina, y la cabina se pasa del piso.'],
        [14.5, 'Arreglo: ajustar el micro y cambiar las zapatas gastadas. Siempre con la cabina vacía y asegurada.']],
      cam: [[0, [-1.09, 0.74, 1.5], [-0.42, 0.32, 0.1]], [8.5, [-0.96, 0.77, 1.57], [-0.4, 0.34, 0.1]], [9.5, [1.05, 0.88, 1.38], [0, 0.42, 0.05]], [14, [1.19, 0.95, 1.45], [0, 0.42, 0.05]], [18.5, [1.68, 1.16, 2.17], [0, 0.42, 0]]],
      anim: function (t, s, K) {
        if (t < 9) {
          var a = K.kf(t, [[0, 0], [2.4, 0], [3.2, 0.09], [6.4, 0.09], [7.2, 0]]), on = K.entre(t, 2.4, 6.4);
          frenoPone(s, K, { aL: a, aR: a, bobina: on, giro: 0, desajL: true });
          K.marcar(s.brazos[0].micro, K.parpadeo(t, 2) ? 'mal' : null); K.marcar(s.brazos[1].micro, null);
          K.marcar(s.bobina, on ? 'foco' : null);
          K.rotulo('No llega', [-0.6, 0.3, 0.14], 'izq');
          K.tabla([['BOBINA', on ? 'CON CORRIENTE' : 'SIN CORRIENTE', on ? 'ac' : ''], ['MICRO IZQ.', 'NO CAMBIA', 'mal'], ['MICRO DER.', a > 0.05 ? 'ABRIÓ' : 'CERRADO', a > 0.05 ? 'ac' : 'ok']]);
          if (t > 4.5) K.aviso('Error de freno');
        } else {
          var gira = K.integ(function (x) { return x < 9 ? 0 : K.kf(x, [[9, 3.5], [10, 3.5], [13.5, 0.15], [14.3, 0]]); }, t);
          frenoPone(s, K, { aL: 0, aR: 0, bobina: false, giro: gira, gastado: t < 14.5 });
          K.marcar(s.bobina, null); K.marcar([s.brazos[0].micro, s.brazos[1].micro], null);
          K.marcar([s.brazos[0].pad, s.brazos[1].pad], t < 14.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : 'foco');
          K.rotulo(t < 14.5 ? 'Zapata gastada' : 'Zapata nueva', [-0.24, 0.5, 0.1], 'izq');
          if (K.entre(t, 9.5, 14.5)) K.aviso('El freno patina');
        }
      }
    }
  });
  // pone brazos, resortes, varillas y micros del freno según la apertura de cada lado
  function frenoPone(s, K, o) {
    s.tambor.rotation.z = -(o.giro || 0);
    s.brazos.forEach(function (b) {
      var a = b.lado < 0 ? o.aL : o.aR, rz = -b.lado * a;
      b.piv.rotation.z = rz;
      var top = [b.piv.position.x - Math.sin(rz) * 0.62, 0.06 + Math.cos(rz) * 0.62];
      var post = b.lado * 0.62;
      b.res.position.set(post, 0.66, 0.06); b.res.scale.y = Math.abs(top[0] - post);
      b.varilla.pon([b.lado * 0.13, 0.8, 0.06], [top[0], 0.68, 0.06]);
      b.pad.material = o.gastado ? s.forroMal : s.forro; b.pad.scale.x = o.gastado ? 0.45 : 1;
      var lejos = b.lado < 0 && o.desajL, mx = b.lado * (lejos ? 0.61 : 0.53);
      b.micro.position.x = mx; b.led.position.x = mx;
      var brazoX = b.piv.position.x - Math.sin(rz) * 0.24 + b.lado * 0.026;
      var punta = lejos ? b.lado * 0.55 : brazoX + b.lado * 0.003;
      var empuja = !lejos && a > 0.05;
      b.palanca.pon([mx - b.lado * 0.04, 0.3, 0.14], [punta, empuja ? 0.27 : 0.31, 0.14]);
      b.led.material = empuja ? s.amar : s.verde;
    });
  }
})();
