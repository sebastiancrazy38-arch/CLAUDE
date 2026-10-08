/* Taller de Ascensores — videos 3D: puertas de cabina y de piso.
   Mismo formato que v3d-maquina.js. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;

  // ---------- cortina luminosa ----------
  S.cortina_luminosa = {
    que: 'Son dos reglas en el borde de la puerta de la cabina que se pasan rayos de luz invisibles.',
    sirve: 'Si alguien cruza la puerta mientras se cierra, la puerta se vuelve a abrir sin golpearlo.',
    falla: 'Si una regla está sucia o golpeada, la puerta se abre y se cierra sin parar y el ascensor no sale del piso.',
    arreglo: 'Se limpian las reglas con un paño seco, se enderezan y se revisa que su cable no esté pelado.'
  };
  V3.escena('cortina', ['cortina_luminosa'], {
    fov: 36,
    construir: function (K) {
      var M = K.M, T = K.T, s = {};
      K.add(K.piso(3, 0xcfd5da)).position.set(0, 0, 0.6);
      // cabina vista desde el pasillo: paredes, piso y marco de la puerta
      K.add(K.caja(1.5, 2.3, 0.04, M.panel || M.inox, 0, 1.15, -1.3));
      K.add(K.caja(0.04, 2.3, 1.3, M.panel || M.inox, -0.75, 1.15, -0.65)); K.add(K.caja(0.04, 2.3, 1.3, M.panel || M.inox, 0.75, 1.15, -0.65));
      K.add(K.caja(1.5, 0.04, 1.3, M.piso || M.aceroOsc, 0, 0.02, -0.65));
      K.add(K.caja(0.35, 2.3, 0.05, M.inox, -0.58, 1.15, 0)); K.add(K.caja(0.35, 2.3, 0.05, M.inox, 0.58, 1.15, 0));
      K.add(K.caja(1.5, 0.3, 0.05, M.inox, 0, 2.15, 0));
      K.add(K.caja(1.0, 0.025, 0.12, M.acero, 0, 0.012, 0.05));
      K.add(K.caja(0.12, 0.4, 0.02, M.inox, -0.58, 1.15, 0.03));
      // hojas con sus reglas
      s.hojas = [-1, 1].map(function (lado) {
        var g = new T.Group(); K.add(g);
        g.add(K.caja(0.41, 2.0, 0.03, M.inox, lado * 0.205, 1.0, 0.06));
        var regla = K.caja(0.022, 1.9, 0.04, M.negro, lado * 0.011, 1.0, 0.07); g.add(regla);
        for (var i = 0; i < 8; i++) g.add(K.caja(0.006, 0.02, 0.005, lado < 0 ? K.matB(0xff5a3c) : K.matB(0x3ccf7f), lado * 0.012, 0.15 + i * 0.24, 0.092));
        return { g: g, lado: lado, regla: regla };
      });
      s.rayos = []; for (var i = 0; i < 14; i++) s.rayos.push(K.add(K.rayo(0xff3b30)));
      s.mancha = K.add(K.esfera(0.025, K.mat(0x5a3d1c, { roughness: 1 }), 0, 0.56, 0.09)); s.mancha.scale.z = 0.3;
      s.trapo = K.add(K.caja(0.12, 0.1, 0.03, K.mat(0x2e78c8), 0, 0.56, 0.14));
      s.pers = K.add(K.persona(1.65, 0x6a7f94));
      return s;
    },
    funciona: {
      dur: 15,
      subt: [[0, 'La cortina de luz son dos reglas en el borde de la puerta. Una lanza rayos de luz invisibles y la otra los recibe.'],
        [3, 'Mientras la puerta se cierra, revisa todo el tiempo que lleguen todos los rayos.'],
        [5.6, 'Si una persona corta un rayo, la puerta se abre de nuevo sin tocarla.'],
        [9, 'Cuando ya no hay nadie, espera un momento y vuelve a cerrar.']],
      cam: [[0, [1.5, 1.7, 2.6], [0, 1.0, 0]], [3, [1.0, 1.35, 2.1], [0, 1.0, 0]], [6.5, [2.3, 1.5, 1.2], [0, 1.0, 0]], [9.5, [1.3, 1.4, 2.2], [0, 1.0, 0]], [15, [1.5, 1.7, 2.6], [0, 1.0, 0]]],
      anim: function (t, s, K) {
        var a = K.kf(t, [[0, 1], [3, 1], [5.4, 0.45], [6.6, 1], [10, 1], [13, 0]]);
        var pz = K.kf(t, [[0, 1.6], [3.4, 1.6], [6.4, 0.05], [8.6, -0.8]]), vis = t > 3.4 && t < 8.8;
        s.pers.visible = vis; s.pers.position.set(0.05, 0, pz); s.pers.rotation.y = Math.PI; s.pers.caminar(t, vis && K.entre(t, 3.4, 8.6) ? 1 : 0);
        var r = cortinaPone(s, K, a, vis ? { x: 0.05, z: pz } : null, false, 0);
        s.mancha.visible = false; s.trapo.visible = false;
        K.marcar([s.hojas[0].regla, s.hojas[1].regla], t < 3 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        if (t < 3) { K.rotulo('Regla que lanza la luz', [-0.4 * a, 1.6, 0.08], 'izq'); K.rotulo('Regla que recibe', [0.4 * a, 1.3, 0.08], 'der'); }
        var est = t < 3 ? ['ABIERTA', 'ok'] : r.cortados ? ['SE ABRE OTRA VEZ', 'mal'] : a > 0.99 ? ['ESPERA', 'ac'] : a < 0.01 ? ['CERRADA', 'ok'] : ['CERRANDO', 'ac'];
        K.tabla([['RAYOS', r.cortados ? r.cortados + ' cortados' : '14 de 14', r.cortados ? 'mal' : 'ok'], ['PUERTA', est[0], est[1]]]);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla: la regla está sucia o golpeada. Un rayo queda cortado aunque no haya nadie.'],
        [4, 'La puerta cierra, se abre, cierra, se abre… y el ascensor no sale del piso.'],
        [12, 'Arreglo: limpiar las reglas con un paño seco, revisar que estén derechas y que su cable no esté pelado.']],
      cam: [[0, [0.9, 1.0, 1.4], [0.15, 0.7, 0]], [4, [1.5, 1.6, 2.5], [0, 1.0, 0]], [12, [0.8, 0.9, 1.2], [0.2, 0.65, 0.05]], [19, [1.3, 1.4, 2.2], [0, 1.0, 0]]],
      anim: function (t, s, K) {
        var a = K.kf(t, [[0, 1], [4, 1], [5.6, 0.62], [6.6, 1], [7.4, 1], [9, 0.62], [10, 1], [12, 1]]);
        if (t > 15.5) a = K.kf(t, [[15.5, 1], [18.5, 0]]);
        var limpio = K.ph(t, 13.2, 14.6);
        s.pers.visible = false;
        var r = cortinaPone(s, K, a, null, true, limpio);
        s.mancha.visible = limpio < 1; s.mancha.position.x = 0.4 * a - 0.006; s.mancha.scale.setScalar(1 - limpio * 0.9); s.mancha.scale.z = 0.3;
        s.trapo.visible = K.entre(t, 12.4, 14.8); s.trapo.position.set(0.4 * a + 0.04, 0.56 + Math.sin(t * 9) * 0.07, 0.14);
        K.marcar(s.hojas[1].regla, limpio < 1 && K.parpadeo(t, 2) ? 'mal' : null);
        if (limpio < 1) K.rotulo('Regla sucia', [0.4 * a, 0.56, 0.09], 'der');
        K.tabla([['RAYOS', r.cortados ? '1 cortado' : '14 de 14', r.cortados ? 'mal' : 'ok'], ['PUERTA', a > 0.99 ? (r.cortados ? 'NO CIERRA' : 'ESPERA') : a < 0.01 ? 'CERRADA' : 'CERRANDO', r.cortados ? 'mal' : 'ok']]);
        if (K.entre(t, 4, 12)) K.aviso('El ascensor no sale del piso');
      }
    }
  });
  // abre las hojas (a = 0 cerrada, 1 abierta) y tiende los rayos; devuelve cuántos están cortados
  function cortinaPone(s, K, a, persona, sucia, limpio) {
    var xL = -0.4 * a, xR = 0.4 * a, cortados = 0;
    s.hojas[0].g.position.x = xL; s.hojas[1].g.position.x = xR;
    s.rayos.forEach(function (r, i) {
      var y = 0.12 + i * 0.135, fin = xR, corte = false;
      if (persona && Math.abs(persona.z - 0.07) < 0.22 && y < 1.62 && persona.x - 0.2 < xR && persona.x + 0.2 > xL) { fin = Math.max(xL, persona.x - 0.2); corte = true; }
      if (sucia && i === 3 && limpio < 1) corte = true;
      if (corte) cortados++;
      r.visible = a > 0.04;
      r.pon([xL, y, 0.08], [Math.max(fin, xL + 0.001), y, 0.08]);
    });
    return { cortados: cortados };
  }
})();
