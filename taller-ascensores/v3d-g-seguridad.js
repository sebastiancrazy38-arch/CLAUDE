/* Taller de Ascensores — videos 3D: seguridades (limitador, su cable y su polea tensora, paracaídas y su
   contacto, amortiguadores, finales de carrera, stop de foso y contacto de cable flojo).
   Mismo formato que v3d-maquina.js: construir(K) arma las piezas una vez; funciona/falla.anim(t, s, K) las
   mueve como función pura del tiempo; cam = claves [t, [posición], [a dónde mira]]; subt = subtítulos sencillos. */
(function () {
  'use strict';
  var V3 = window.ASC && window.ASC.v3d; if (!V3) return;
  var S = window.ASC.simple;
  var PI = Math.PI, TAU = PI * 2;

  // ---------- textos sencillos de cada pieza ----------
  S.limitador = {
    que: 'Es una polea con dos pesas que gira arriba del hueco, movida por un cable delgado que baja hasta la cabina.',
    sirve: 'Vigila la velocidad. Si la cabina baja demasiado rápido, corta el motor y frena el cable para clavarla.',
    falla: 'Si está sucio se dispara sin motivo y la cabina se clava; si su canaleta está gastada, el cable patina.',
    arreglo: 'El técnico lo limpia y lo prueba. Viene sellado de fábrica: no se regula ni se engrasa a mano.'
  };
  S.cable_limitador = {
    que: 'Es un cable de acero delgado, como un lápiz, que forma un lazo de arriba a abajo del hueco.',
    sirve: 'Une la cabina con el limitador. Si el limitador lo frena, el cable jala la palanca del paracaídas.',
    falla: 'Con los años se estira: la pesa del fondo baja, aprieta su interruptor y el ascensor se para.',
    arreglo: 'El técnico acorta el cable para que la pesa vuelva a su altura. Si tiene hilos rotos, lo cambia.'
  };
  S.polea_tensora = {
    que: 'Es una rueda con una pesa colgando, en el fondo del hueco. Por ella da la vuelta el cable del limitador.',
    sirve: 'La pesa mantiene el cable estirado, para que no patine arriba y el limitador mida bien la velocidad.',
    falla: 'Si el cable se estira, la pesa baja hasta apretar su interruptor y el ascensor queda detenido.',
    arreglo: 'El técnico acorta el cable y revisa que la pesa cuelgue libre, sin tocar el piso ni el agua.'
  };
  S.paracaidas = {
    que: 'Son dos bloques de acero debajo de la cabina, uno en cada riel, con cuñas adentro (piezas de metal en punta).',
    sirve: 'Si la cabina baja demasiado rápido, las cuñas suben, muerden el riel y la cabina se queda clavada.',
    falla: 'Si las cuñas o los rieles tienen grasa o suciedad, resbalan y la cabina tarda mucho en frenar.',
    arreglo: 'Se limpian las cuñas y los rieles y se prueba. Una cabina clavada solo la suelta el técnico.'
  };
  S.contacto_paracaidas = {
    que: 'Es un interruptor pequeño pegado a la palanca del paracaídas, en el armazón de la cabina.',
    sirve: 'Cuando las cuñas se activan, la palanca lo empuja y corta la corriente del motor al instante.',
    falla: 'Si después de una prueba nadie lo rearma, o vibra por estar muy pegado, el ascensor no arranca o se para.',
    arreglo: 'El técnico lo rearma, ajusta su distancia a la palanca y aprieta sus cables. Nunca se puentea.'
  };
  S.amortiguadores = {
    que: 'Son topes en el fondo del hueco: un resorte grueso, un cilindro de goma dura o un pistón con aceite.',
    sirve: 'Si la cabina o el contrapeso se pasan del último piso, el tope recibe el golpe y los frena suave.',
    falla: 'La goma dura se agrieta con los años y el de aceite puede quedarse hundido. Así ya no amortiguan.',
    arreglo: 'Se cambia la goma agrietada o el resorte oxidado; al de aceite se le revisa el nivel y su contacto.'
  };
  S.finales_carrera = {
    que: 'Son interruptores con una ruedita, arriba y abajo del hueco. En la cabina va una rampa de metal (la leva).',
    sirve: 'Si la cabina se pasa del último piso, la rampa empuja la ruedita y el ascensor se detiene.',
    falla: 'Si la ruedita se rompe, no actúa; si el interruptor se corre, para la cabina antes de llegar al piso.',
    arreglo: 'Con el ascensor detenido, se cambia la ruedita y se pone el interruptor en su sitio. Nunca se puentea.'
  };
  S.stop_foso = {
    que: 'Es un botón rojo en forma de hongo, junto a la escalera del foso, entrando por el piso más bajo.',
    sirve: 'El técnico lo aprieta antes de bajar al foso: así el ascensor no se puede mover y no lo aplasta.',
    falla: 'Si alguien lo deja apretado, el ascensor queda parado; si le entra agua, hace paradas sin motivo.',
    arreglo: 'Al salir del foso se gira el botón para soltarlo. Si le entró agua, se seca y se cambia el contacto.'
  };
  S.cable_flojo = {
    que: 'Es un interruptor junto a los resortes donde se amarran los cables, abajo, al lado del pistón.',
    sirve: 'Si un cable se afloja o se estira más que el otro, su resorte empuja una platina y el ascensor se para.',
    falla: 'Si un cable se estira, los resortes quedan disparejos: el ascensor se para y no vuelve a arrancar.',
    arreglo: 'El técnico busca la causa e iguala los cables con sus tuercas, hasta que los resortes queden parejos.'
  };

  // ---------- utilidades de tiempo (copias de las del motor, para usarlas fuera de anim) ----------
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ph(t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = cl((t - a) / (b - a)); return x * x * (3 - 2 * x); }
  function kf(t, a) {
    if (t <= a[0][0]) return a[0][1];
    for (var i = 1; i < a.length; i++) if (t <= a[i][0]) return a[i - 1][1] + (a[i][1] - a[i - 1][1]) * ph(t, a[i - 1][0], a[i][0]);
    return a[a.length - 1][1];
  }
  // cuña: prisma con la cara de adentro recta y la de afuera inclinada (más gruesa arriba). Eje alto = Y, grosor = Z, ancho = X.
  function cunaGeo(T, ancho, alto, abajo, arriba) {
    var sh = new T.Shape();
    sh.moveTo(0, -alto / 2); sh.lineTo(abajo, -alto / 2); sh.lineTo(arriba, alto / 2); sh.lineTo(0, alto / 2); sh.lineTo(0, -alto / 2);
    var g = new T.ExtrudeGeometry(sh, { depth: ancho, bevelEnabled: false });
    g.translate(0, 0, -ancho / 2); g.rotateY(-PI / 2);   // el grosor queda en +Z, el ancho en X
    return g;
  }
  // un interruptor con palanca y ruedita (los micros de seguridad); devuelve {g, brazo, led}
  function micro(K, mats, largo) {
    var M = K.M, T = K.T, g = new T.Group(), cuerpo = new T.Group(); g.add(cuerpo);
    cuerpo.add(K.caja(0.07, 0.09, 0.05, M.negro, 0, 0, 0));
    cuerpo.add(K.caja(0.072, 0.02, 0.052, M.amarillo, 0, 0.035, 0));
    var brazo = new T.Group(); brazo.position.set(0, -0.03, 0.03); cuerpo.add(brazo);
    brazo.add(K.caja(0.012, largo || 0.08, 0.008, M.acero, 0, -(largo || 0.08) / 2, 0));
    brazo.add(K.cil(0.018, 0.014, M.goma, 0, -(largo || 0.08), 0.004, 'z', 16));
    var led = K.esfera(0.011, mats.verde, 0.02, 0.05, 0.02); g.add(led);
    return { g: g, cuerpo: cuerpo, brazo: brazo, led: led };
  }
  function mats(K) { return { verde: K.matB(0x3ccf7f), rojo: K.matB(0xff3b30), amar: K.matB(0xffc62b) }; }

  // =====================================================================================
  // 1) Limitador de velocidad (vista de cerca): polea, pesas que se abren, interruptor y gancho
  // =====================================================================================
  var RL = 0.15, GY = 1.0;   // radio de la polea y altura de su eje
  function armarLimitador(K) {
    var M = K.M, T = K.T, s = mats(K);
    // losa del cuarto de máquinas con los agujeros del cable
    K.add(K.caja(1.1, 0.08, 0.7, M.losa || M.gris, 0, 0.66, 0));
    K.add(K.caja(0.06, 0.081, 0.06, M.negro, -RL, 0.66, 0)); K.add(K.caja(0.06, 0.081, 0.06, M.negro, RL, 0.66, 0));
    // soporte: base, dos patas y el eje
    K.add(K.caja(0.5, 0.03, 0.22, M.azul, 0, 0.715, -0.02));
    K.add(K.caja(0.05, 0.31, 0.04, M.azul, 0, 0.86, -0.06));
    K.add(K.caja(0.42, 0.04, 0.04, M.azul, 0, 0.73, -0.06));
    K.add(K.cil(0.016, 0.16, M.acero, 0, GY, -0.02, 'z', 12));
    // polea que gira, con su canaleta, dientes del trinquete y las pesas
    s.rot = new T.Group(); s.rot.position.set(0, GY, 0); K.add(s.rot);
    s.rot.add(K.polea(RL, 0.045, M.acero, M.hierro));
    s.canal = K.toro(RL * 0.93, 0.007, M.aceroOsc, 0, 0, 0); s.rot.add(s.canal);
    for (var i = 0; i < 12; i++) {
      var a = i / 12 * TAU, d = K.caja(0.03, 0.022, 0.02, M.hierro, Math.cos(a) * (RL + 0.012), Math.sin(a) * (RL + 0.012), -0.02);
      d.rotation.z = a; s.rot.add(d);
    }
    s.mPesa = K.mat(0x5c6772, { metalness: 0.4, roughness: 0.45 }); s.mSucia = K.mat(0x7a5428, { roughness: 0.95 });
    s.pesas = [0, PI].map(function (fase) {
      var brazo = K.cable(0.007, M.hierro); s.rot.add(brazo);
      var pesa = K.cil(0.03, 0.03, s.mPesa, 0, 0, 0.045, 'z', 20); s.rot.add(pesa);
      var mugre = K.cil(0.033, 0.034, s.mSucia, 0, 0, 0.046, 'z', 9); s.rot.add(mugre);
      var piv = K.cil(0.008, 0.02, M.amarillo, 0, 0, 0.04, 'z', 10); s.rot.add(piv);
      return { fase: fase, brazo: brazo, pesa: pesa, piv: piv, mugre: mugre };
    });
    s.res = K.cable(0.004, M.cobre); s.rot.add(s.res);
    s.rot.add(K.cil(0.022, 0.03, M.hierro, 0, 0, 0.035, 'z', 16));
    // interruptor de sobrevelocidad (arriba a la derecha) y gancho que traba la polea (arriba a la izquierda)
    s.sw = micro(K, s, 0.06); s.sw.g.position.set(0.17, 1.2, 0.03); K.add(s.sw.g);
    K.add(K.caja(0.04, 0.24, 0.03, M.azul, 0.17, 1.03, -0.03));
    s.gancho = new T.Group(); s.gancho.position.set(-0.2, 1.2, 0.0); K.add(s.gancho);
    s.gancho.add(K.caja(0.11, 0.022, 0.03, M.rojo, 0.05, 0, 0)); s.gancho.add(K.caja(0.02, 0.04, 0.03, M.rojo, 0.1, -0.02, 0));
    s.gancho.add(K.cil(0.012, 0.05, M.hierro, 0, 0, 0, 'z', 10));
    K.add(K.caja(0.04, 0.24, 0.03, M.azul, -0.2, 1.08, -0.03));
    // precinto (sello) del ajuste
    K.add(K.esfera(0.01, M.rojo, -0.04, 0.86, -0.035));
    // cable: dos ramales rectos y el arco de arriba; marcas que corren con el cable
    s.mCable = K.mat(0x8c939a, { metalness: 0.6, roughness: 0.35 });
    s.ramI = K.add(K.cable(0.006, s.mCable)); s.ramD = K.add(K.cable(0.006, s.mCable));
    s.arco = K.add(K.toro(RL * 0.93, 0.006, s.mCable, 0, GY, 0, PI));
    s.mMarca = K.mat(0xf2b705, { roughness: 0.5 });
    s.marcas = []; for (var j = 0; j < 9; j++) s.marcas.push(K.add(K.cil(0.011, 0.03, s.mMarca, 0, 0, 0, null, 10)));
    s.flecha = K.add(K.flecha(0xff3b30, 0.012));
    s.chis = K.add(K.chispas(16));
    return s;
  }
  // pone el limitador: ang = giro de la polea, cab = cuánto avanzó el cable (m), abre 0..1, sw = interruptor, traba = gancho
  function limPone(s, K, o) {
    var R = RL * 0.93, abajo = 0.25, LR = GY - abajo, LA = PI * R, LT = 2 * LR + LA;
    s.rot.rotation.z = -o.ang;
    s.pesas.forEach(function (p) {
      var a = p.fase + 0.15, pv = [Math.cos(a + 1.3) * 0.04, Math.sin(a + 1.3) * 0.04], rt = 0.06 + 0.05 * o.abre;
      var tip = [Math.cos(a) * rt, Math.sin(a) * rt];
      p.piv.position.set(pv[0], pv[1], 0.04);
      p.brazo.pon([pv[0], pv[1], 0.04], [tip[0], tip[1], 0.04]);
      p.pesa.position.set(tip[0], tip[1], 0.045);
      p.mugre.position.set(tip[0], tip[1], 0.046); p.mugre.visible = !!o.sucia;
    });
    s.res.pon([s.pesas[0].pesa.position.x, s.pesas[0].pesa.position.y, 0.06], [s.pesas[1].pesa.position.x, s.pesas[1].pesa.position.y, 0.06]);
    s.sw.brazo.rotation.z = o.sw ? 0.55 : 0;
    s.sw.led.material = o.sw ? s.rojo : s.verde;
    s.gancho.rotation.z = o.traba ? -0.42 : 0;
    s.ramI.pon([-R, abajo, 0], [-R, GY, 0]); s.ramD.pon([R, GY, 0], [R, abajo, 0]);
    // marcas: el cable sube por la izquierda, pasa por arriba y baja por la derecha
    var paso = LT / s.marcas.length, off = ((o.cab % paso) + paso) % paso;
    s.marcas.forEach(function (m, i) {
      var u = i * paso + off;
      if (u < LR) { m.position.set(-R, abajo + u, 0); m.rotation.set(0, 0, 0); }
      else if (u < LR + LA) { var b = PI - (u - LR) / R; m.position.set(Math.cos(b) * R, GY + Math.sin(b) * R, 0); m.rotation.set(0, 0, b); }
      else { m.position.set(R, GY - (u - LR - LA), 0); m.rotation.set(0, 0, 0); }
      m.visible = m.position.y > abajo + 0.02;
    });
  }
  function limVel(t) { return kf(t, [[0, 1], [4.5, 1], [8.5, 1.16], [10.5, 1.18], [12.4, 1.32], [12.7, 1.32]]); }
  V3.escena('limitador', ['limitador'], {
    fov: 34,
    poster: 6,
    construir: function (K) { return armarLimitador(K); },
    funciona: {
      dur: 19,
      subt: [[0, 'El limitador es una polea con dos pesas. Un cable delgado la une a la cabina, así que gira a su misma velocidad.'],
        [4.5, 'Las pesas giran con la polea. Mientras más rápido gira, más se abren hacia afuera.'],
        [8.5, 'Si la cabina va muy rápido, una pesa golpea el interruptor: se corta la corriente y frena el motor.'],
        [12.4, 'Si aun así se sigue embalando, un gancho traba la polea. El cable se detiene y jala el paracaídas de la cabina.']],
      cam: [[0, [0.62, 1.22, 1.05], [0, 0.98, 0]], [4.5, [0.32, 1.12, 0.78], [0.02, 1.0, 0]], [8.5, [0.5, 1.28, 0.62], [0.1, 1.08, 0]], [12.4, [-0.35, 1.25, 0.75], [-0.05, 1.04, 0]], [16, [0.25, 1.05, 1.05], [0.05, 0.9, 0]], [19, [0.55, 1.2, 1.05], [0, 0.96, 0]]],
      anim: function (t, s, K) {
        var tl = 12.7, v = t < tl ? limVel(t) : 0;
        var cab = K.integ(function (x) { return x < tl ? limVel(x) * 0.5 : 0; }, t);
        var abre = t >= tl ? 1 : K.cl((v - 0.95) / 0.35), sw = abre > 0.62, traba = t >= 12.5;
        limPone(s, K, { ang: cab / (RL * 0.93), cab: cab, abre: abre, sw: sw, traba: traba });
        s.flecha.visible = t > tl; if (t > tl) s.flecha.apuntar([RL * 0.93 + 0.05, 0.35, 0.02], [RL * 0.93 + 0.05, 0.6, 0.02]);
        s.chis.emitir(t, [-0.1, GY + 0.13, 0.02], K.entre(t, 12.5, 13.3), 0.08);
        K.marcar(s.pesas.map(function (p) { return p.pesa; }), K.entre(t, 4.5, 8.5) ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.sw.cuerpo, K.entre(t, 8.5, 12.4) ? 'foco' : null); K.marcar(s.canal, null); K.marcar(s.pesas.map(function (p) { return p.mugre; }), null);
        K.marcar(s.gancho, t > 12.4 ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Polea', [0, GY - 0.16, 0.03]); K.rotulo('Cable a la cabina', [RL * 0.93, 0.5, 0], 'der'); }
        if (K.entre(t, 4.5, 8.5)) K.rotulo('Pesas', s.pesas[0].pesa);
        if (K.entre(t, 8.5, 12.4)) K.rotulo('Interruptor', [0.17, 1.24, 0.03]);
        if (t > 12.4) { K.rotulo('Gancho (traba)', [-0.2, 1.21, 0.0], 'izq'); if (t > tl) K.rotulo('Jala el paracaídas', [RL * 0.93 + 0.05, 0.45, 0.02], 'der'); }
        var vt = t >= tl ? ['DETENIDA', 'mal'] : v > 1.25 ? ['MUY ALTA', 'mal'] : v > 1.08 ? ['ALTA', 'ac'] : ['NORMAL', 'ok'];
        K.tabla([['VELOCIDAD', vt[0], vt[1]], ['INTERRUPTOR', sw ? 'ABIERTO: MOTOR SIN CORRIENTE' : 'CERRADO', sw ? 'mal' : 'ok'], ['POLEA', traba ? 'TRABADA' : 'GIRA', traba ? 'mal' : '']]);
      }
    },
    falla: {
      dur: 19.5,
      subt: [[0, 'Falla 1: la canaleta de la polea, por donde pasa el cable, se gastó con los años.'],
        [4, 'Cuando el gancho traba la polea, el cable resbala y sigue de largo: no jala el paracaídas a tiempo.'],
        [9, 'Falla 2: pesas sucias u oxidadas. El limitador se dispara a velocidad normal y la cabina se clava sin motivo.'],
        [14.5, 'Arreglo: el técnico lo limpia y lo prueba, y cambia la polea y el cable gastados. Viene sellado: no se regula a mano.']],
      cam: [[0, [0.3, 1.35, 0.62], [0, 1.08, 0]], [4, [0.42, 1.3, 0.7], [0, 1.06, 0]], [9, [0.5, 1.12, 0.8], [0.02, 1.0, 0]], [14.5, [0.6, 1.2, 1.0], [0, 0.97, 0]], [19.5, [0.6, 1.2, 1.05], [0, 0.96, 0]]],
      anim: function (t, s, K) {
        var cab, ang, abre, sw, traba, sucia = false, vt;
        if (t < 9) {
          var vf = function (x) { return kf(x, [[0, 1], [4, 1], [5, 1.3], [5.6, 1.3], [8.4, 0.25], [8.9, 0]]); }, tl = 5.6;
          cab = K.integ(function (x) { return vf(x) * 0.5; }, t);
          ang = K.integ(function (x) { return x < tl ? vf(x) * 0.5 : 0; }, t) / (RL * 0.93);
          abre = t >= tl ? 1 : K.cl((vf(t) - 0.95) / 0.35); sw = abre > 0.62; traba = t >= 5.4;
          vt = t >= tl ? (vf(t) > 0.05 ? ['EL CABLE PATINA', 'mal'] : ['DETENIDA', 'mal']) : vf(t) > 1.1 ? ['MUY ALTA', 'mal'] : ['NORMAL', 'ok'];
          K.marcar(s.canal, K.parpadeo(t, 2) ? 'mal' : null);
          s.chis.emitir(t, [0, GY + RL, 0.02], K.entre(t, tl, 8.6), 0.1);
          K.rotulo(t < 4 ? 'Canaleta gastada' : 'Aquí patina', [0, GY + RL * 0.93, 0]);
          if (K.entre(t, tl, 8.6)) K.aviso('El cable patina');
        } else if (t < 14.5) {
          var tf = 11.2;
          cab = K.integ(function (x) { return x < tf ? 0.5 : 0; }, t);
          ang = cab / (RL * 0.93); abre = t >= tf ? 1 : 0.15 + 0.85 * K.ph(t, 10.4, 11.1); sw = abre > 0.62; traba = t >= 11; sucia = true;
          vt = t >= tf ? ['DETENIDA', 'mal'] : ['NORMAL', 'ok'];
          K.marcar(s.canal, null);
          K.marcar(s.pesas.map(function (p) { return p.mugre; }), K.parpadeo(t, 2) ? 'mal' : null);
          s.chis.emitir(t, [0, 0, 0], false);
          K.rotulo('Pesas sucias', s.pesas[1].pesa, 'izq');
          if (t > tf) K.aviso('Se disparó sin motivo');
        } else {
          cab = (t - 14.5) * 0.5; ang = cab / (RL * 0.93); abre = 0.15; sw = false; traba = false;
          vt = ['NORMAL', 'ok'];
          K.marcar(s.canal, 'foco');
          s.chis.emitir(t, [0, 0, 0], false);
          K.aviso('Limitador limpio y probado', false);
        }
        limPone(s, K, { ang: ang, cab: cab, abre: abre, sw: sw, traba: traba, sucia: sucia });
        s.flecha.visible = false;
        K.marcar(s.gancho, null); K.marcar(s.sw.cuerpo, null); K.marcar(s.pesas.map(function (p) { return p.pesa; }), null);
        if (t < 9 || t >= 14.5) K.marcar(s.pesas.map(function (p) { return p.mugre; }), null);
        K.tabla([['VELOCIDAD', vt[0], vt[1]], ['INTERRUPTOR', sw ? 'ABIERTO' : 'CERRADO', sw ? 'mal' : 'ok'], ['POLEA', traba ? 'TRABADA' : 'GIRA', traba ? 'mal' : '']]);
      }
    }
  });

  /*@@LAZO@@*/
})();
