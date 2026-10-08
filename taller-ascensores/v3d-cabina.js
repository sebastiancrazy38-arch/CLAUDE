/* Taller de Ascensores — videos 3D: cabina, techo de cabina y lo que la acompaña en el hueco.
   Mismo formato que v3d-maquina.js. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;

  // ---------- baranda del techo de cabina (plegable, con su contacto) ----------
  S.baranda_techo = {
    que: 'Es la reja amarilla que va sobre el techo de la cabina.',
    sirve: 'Evita que el técnico se caiga al vacío del hueco cuando trabaja arriba de la cabina.',
    falla: 'Si tiene tornillos flojos se mueve y suena; si queda levantada o su contacto falla, el ascensor no vuelve a servicio normal.',
    arreglo: 'Se ajustan los tornillos, se revisa la traba y el contacto, y se cambian los tramos doblados.'
  };
  V3.escena('baranda', ['baranda_techo'], {
    fov: 36,
    construir: function (K) {
      var M = K.M, T = K.T, s = {};
      // hueco: pared del fondo y pared del costado (transparente para ver el vacío)
      K.add(K.caja(3.2, 4.6, 0.06, M.muro || K.mat(0xc3c8cc), 0.2, 2.0, -1.0));
      var vidrio = K.mat(0xc3c8cc, { transparent: true, opacity: 0.18, depthWrite: false });
      K.add(K.caja(0.06, 4.6, 2.4, vidrio, 1.18, 2.0, 0.2));
      s.marcas = new T.Group(); K.add(s.marcas);
      for (var i = 0; i < 7; i++) { s.marcas.add(K.caja(0.06, 0.08, 0.26, M.aceroOsc, 1.12, i * 0.9, -0.6)); s.marcas.add(K.caja(0.05, 0.9, 0.06, M.acero, -0.95, i * 0.9, -0.94)); }
      // cabina
      K.add(K.caja(1.3, 2.0, 1.4, M.inox || K.mat(0xd6dbdf), 0, 1.0, 0));
      K.add(K.caja(1.36, 0.05, 1.46, M.aceroOsc, 0, 2.025, 0));
      K.add(K.caja(0.32, 0.16, 0.3, M.amarillo, -0.35, 2.13, -0.45));   // botonera de inspección
      K.add(K.esfera(0.035, M.rojo, -0.35, 2.23, -0.42));
      // baranda fija del fondo
      [-0.62, 0, 0.62].forEach(function (x) { K.add(K.caja(0.04, 1.1, 0.04, M.amarillo, x, 2.6, -0.68)); });
      K.add(K.caja(1.28, 0.04, 0.04, M.amarillo, 0, 3.15, -0.68)); K.add(K.caja(1.28, 0.04, 0.04, M.amarillo, 0, 2.6, -0.68)); K.add(K.caja(1.28, 0.1, 0.02, M.amarillo, 0, 2.1, -0.68));
      // baranda plegable del lado del vacío: gira sobre una bisagra en el borde
      s.bar = new T.Group(); s.bar.position.set(0.63, 2.06, 0); K.add(s.bar);
      [-0.6, 0].forEach(function (z) { s.bar.add(K.caja(0.04, 1.1, 0.04, M.amarillo, 0, 0.55, z)); });
      s.bar.add(K.caja(0.04, 0.04, 1.2, M.amarillo, 0, 1.1, -0.02), K.caja(0.04, 0.04, 1.2, M.amarillo, 0, 0.55, -0.02), K.caja(0.02, 0.1, 1.24, M.amarillo, 0, 0.05, 0));
      // el poste de la punta es el tramo que se dobla con un golpe: gira desde su base
      s.tramo = K.grupo([K.caja(0.04, 1.1, 0.04, M.amarillo, 0, 0.55, 0), K.caja(0.04, 0.04, 0.3, M.amarillo, 0, 1.1, -0.13)], 0, 0, 0.6); s.bar.add(s.tramo);
      [-0.6, 0.6].forEach(function (z) { K.add(K.cil(0.025, 0.08, M.hierro, 0.63, 2.06, z, 'z')); });
      // contacto que vigila la baranda
      s.contacto = K.add(K.caja(0.08, 0.07, 0.06, M.negro, 0.56, 2.09, 0.66));
      s.verde = K.matB(0x3ccf7f); s.rojo = K.matB(0xff3b30); s.amar = K.matB(0xffc62b);
      s.led = K.add(K.esfera(0.018, s.verde, 0.56, 2.14, 0.66));
      // técnico
      s.tec = K.add(K.persona(1.7, 0x2e5f90, true)); s.tec.position.set(-0.3, 2.05, 0.3); s.tec.rotation.y = Math.PI / 2;
      return s;
    },
    funciona: {
      dur: 20,
      subt: [[0, 'La baranda es la reja amarilla del techo de la cabina. Protege al técnico cuando trabaja arriba.'],
        [4, 'En muchos ascensores es plegable: el técnico la levanta apenas sube al techo.'],
        [8, 'Si se acerca al borde, la baranda lo detiene y no cae al vacío del hueco.'],
        [12, 'Un contacto avisa al tablero que la baranda está arriba: el ascensor solo se mueve despacio, en modo inspección.'],
        [16, 'Al terminar, la baja y la traba. Recién ahí el ascensor vuelve a funcionar normal.']],
      cam: [[0, [3.6, 4.6, 4.2], [0.2, 2.6, 0]], [4, [3.4, 3.9, 3.5], [0.4, 2.7, 0.1]], [8, [1.6, 4.0, 4.4], [0.3, 2.8, 0.1]], [12, [3.6, 3.4, 2.4], [0.5, 2.5, 0.4]], [16, [3.4, 4.2, 3.6], [0.3, 2.6, 0]], [20, [3.6, 4.6, 4.2], [0.2, 2.6, 0]]],
      anim: function (t, s, K) {
        var plegada = K.kf(t, [[0, 1], [4.6, 1], [7, 0], [16.4, 0], [18.6, 1]]);
        s.bar.rotation.set(0, 0, plegada * Math.PI / 2 * 0.98);
        s.tramo.rotation.x = 0;
        var x = K.kf(t, [[0, -0.3], [8, -0.3], [9.6, 0.36], [11.4, 0.36], [12.4, -0.2]]);
        s.tec.position.x = x; if (K.entre(t, 8, 9.6) || K.entre(t, 11.4, 12.4)) s.tec.caminar(t); else s.tec.caminar(0, 0);
        if (K.entre(t, 9.6, 11.4)) { s.tec.brazoD.rotation.x = -1.3; s.tec.brazoI.rotation.x = -1.3; }
        var arriba = plegada < 0.1, insp = K.entre(t, 12, 16);
        s.led.material = arriba ? s.amar : s.verde;
        s.marcas.position.y = -((insp ? (t - 12) * 0.25 : 0) % 0.9);
        K.marcar(s.bar, K.entre(t, 4, 8) || K.entre(t, 16, 18.6) ? 'foco' : null);
        K.marcar(s.contacto, K.entre(t, 12, 16) ? 'foco' : null);
        if (t < 4) K.rotulo('Baranda plegable', [0.63, 2.15, -0.3]);
        if (K.entre(t, 8, 12)) K.rotulo('Vacío del hueco', [0.92, 1.6, 0.4]);
        if (K.entre(t, 12, 16)) K.rotulo('Contacto', [0.56, 2.12, 0.66]);
        K.tabla([['BARANDA', arriba ? 'ARRIBA' : plegada > 0.9 ? 'PLEGADA' : 'MOVIENDO', arriba ? 'ac' : 'ok'], ['ASCENSOR', arriba ? 'SOLO INSPECCIÓN' : 'NORMAL', arriba ? 'ac' : 'ok']]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: tornillos flojos. La baranda se mueve y suena cuando la cabina viaja.'],
        [5, 'Falla 2: quedó levantada o su contacto se desajustó. El ascensor no vuelve al servicio normal.'],
        [10.5, 'Falla 3: un golpe dobló un tramo. Ya no protege bien y puede chocar con algo del hueco.'],
        [14.5, 'Arreglo: ajustar los tornillos, revisar la traba y el contacto, y cambiar los tramos doblados.']],
      cam: [[0, [3.3, 3.9, 3.4], [0.4, 2.7, 0.1]], [5, [2.6, 2.8, 2.2], [0.55, 2.25, 0.6]], [10.5, [3.3, 3.8, 3.2], [0.5, 2.8, 0.3]], [14.5, [3.6, 4.4, 3.9], [0.3, 2.6, 0]]],
      anim: function (t, s, K) {
        s.tec.position.x = -0.3; s.tec.caminar(0, 0);
        var vib = t < 5 ? Math.sin(t * 34) * 0.045 : 0;
        s.bar.rotation.set(vib, 0, vib * 0.5);
        s.marcas.position.y = -((t < 5 ? t * 0.9 : 0) % 0.9);
        s.tramo.rotation.x = K.kf(t, [[10.5, 0], [11.3, 0.5], [14.5, 0.5], [15.3, 0]]);
        s.led.material = K.entre(t, 5, 10.5) ? (K.parpadeo(t, 2) ? s.rojo : s.amar) : s.verde;
        if (t < 5) { K.marcar(s.bar, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Tornillos flojos', [0.63, 2.1, 0.6]); K.tabla([['BARANDA', 'SE MUEVE', 'mal'], ['RUIDO', 'GOLPETEO', 'mal']]); }
        else if (t < 10.5) { K.marcar(s.bar, null); K.marcar(s.contacto, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Contacto desajustado', [0.56, 2.12, 0.66]); K.aviso('No vuelve a servicio normal'); }
        else if (t < 14.5) { K.marcar(s.contacto, null); K.marcar(s.tramo, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo('Tramo doblado', [0.63, 2.9, 0.6]); }
        else { K.marcar([s.tramo, s.contacto], null); K.marcar(s.bar, 'foco'); K.aviso('Baranda firme', false); }
      }
    }
  });
})();
