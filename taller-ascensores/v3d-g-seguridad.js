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
  // prisma con un costado recto (en x = 0) y el otro inclinado: grosor «abajo» en la base y «arriba» en la punta.
  // lado = 1 crece hacia +x, lado = -1 hacia -x. Alto en Y (centrado), fondo en Z (centrado).
  function prisma(T, lado, alto, abajo, arriba, fondo) {
    var sh = new T.Shape();
    sh.moveTo(0, -alto / 2); sh.lineTo(lado * abajo, -alto / 2); sh.lineTo(lado * arriba, alto / 2); sh.lineTo(0, alto / 2); sh.lineTo(0, -alto / 2);
    var g = new T.ExtrudeGeometry(sh, { depth: fondo, bevelEnabled: false });
    g.translate(0, 0, -fondo / 2);
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
    s.canal = K.toro(RL + 0.001, 0.009, M.aceroOsc, 0, 0, 0); s.rot.add(s.canal);
    for (var i = 0; i < 16; i++) {   // dientes del trinquete, en la parte de atrás del borde
      var a = i / 16 * TAU, d = K.caja(0.016, 0.012, 0.014, M.hierro, Math.cos(a) * (RL + 0.006), Math.sin(a) * (RL + 0.006), -0.017);
      d.rotation.z = a + 0.5; s.rot.add(d);
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
    // el interruptor va delante de la polea, arriba: su ruedita queda donde llegan las pesas cuando se abren mucho
    s.sw = micro(K, s, 0.05); s.sw.g.position.set(0, GY + 0.225, 0.012); K.add(s.sw.g);
    K.add(K.caja(0.035, 0.5, 0.03, M.azul, 0.24, GY - 0.03, -0.03)); K.add(K.caja(0.27, 0.03, 0.03, M.azul, 0.12, GY + 0.255, -0.03));
    K.add(K.caja(0.03, 0.03, 0.06, M.azul, 0.0, GY + 0.255, 0.0));
    s.gancho = new T.Group(); s.gancho.position.set(-0.22, GY + 0.13, 0.0); K.add(s.gancho);
    s.mGancho = K.mat(0xe07b22, { roughness: 0.5 });
    s.gancho.add(K.caja(0.09, 0.02, 0.03, s.mGancho, 0.045, 0, -0.012)); s.gancho.add(K.caja(0.018, 0.035, 0.03, s.mGancho, 0.085, -0.016, -0.012));
    s.gancho.add(K.cil(0.012, 0.05, M.hierro, 0, 0, 0, 'z', 10));
    K.add(K.caja(0.035, 0.42, 0.03, M.azul, -0.24, GY - 0.08, -0.03));
    // precinto (sello) del ajuste
    K.add(K.esfera(0.01, M.rojo, -0.04, 0.86, -0.035));
    // cable: dos ramales rectos y el arco de arriba; marcas que corren con el cable
    s.mCable = K.mat(0x8c939a, { metalness: 0.6, roughness: 0.35 });
    s.ramI = K.add(K.cable(0.006, s.mCable)); s.ramD = K.add(K.cable(0.006, s.mCable));
    s.arco = K.add(K.toro(RL + 0.012, 0.006, s.mCable, 0, GY, 0, PI));
    s.mMarca = K.mat(0xf2b705, { roughness: 0.5 });
    s.marcas = []; for (var j = 0; j < 9; j++) s.marcas.push(K.add(K.cil(0.011, 0.03, s.mMarca, 0, 0, 0, null, 10)));
    s.flecha = K.add(K.flecha(0xff3b30, 0.012));
    s.chis = K.add(K.chispas(16));
    return s;
  }
  // pone el limitador: ang = giro de la polea, cab = cuánto avanzó el cable (m), abre 0..1, sw = interruptor, traba = gancho
  function limPone(s, K, o) {
    var R = RL + 0.012, abajo = 0.25, LR = GY - abajo, LA = PI * R, LT = 2 * LR + LA;
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
    s.sw.brazo.rotation.z = o.sw ? 0.6 : 0;
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
      cam: [[0, [0.55, 1.15, 1.15], [0, 0.98, 0]], [4.5, [0.3, 1.1, 0.88], [0, 1.02, 0]], [8.5, [0.38, 1.22, 0.9], [0.02, 1.08, 0]], [12.4, [-0.32, 1.12, 0.98], [-0.03, 0.97, 0]], [16, [0.38, 0.98, 1.25], [0.05, 0.82, 0]], [19, [0.55, 1.15, 1.15], [0, 0.96, 0]]],
      anim: function (t, s, K) {
        var tl = 12.7, v = t < tl ? limVel(t) : 0;
        var cab = K.integ(function (x) { return x < tl ? limVel(x) * 0.5 : 0; }, t);
        var abre = t >= tl ? 1 : K.cl((v - 0.95) / 0.35), sw = abre > 0.62, traba = t >= 12.5;
        limPone(s, K, { ang: cab / ((RL + 0.012)), cab: cab, abre: abre, sw: sw, traba: traba });
        s.flecha.visible = t > tl; if (t > tl) s.flecha.apuntar([(RL + 0.012) + 0.05, 0.35, 0.02], [(RL + 0.012) + 0.05, 0.6, 0.02]);
        s.chis.emitir(t, [-0.1, GY + 0.13, 0.02], K.entre(t, 12.5, 13.3), 0.08);
        K.marcar(s.pesas.map(function (p) { return p.pesa; }), K.entre(t, 4.5, 8.5) ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.sw.cuerpo, K.entre(t, 8.5, 12.4) ? 'foco' : null); K.marcar(s.canal, null); K.marcar(s.pesas.map(function (p) { return p.mugre; }), null);
        K.marcar(s.gancho, t > 12.4 ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Polea', [0, GY - 0.16, 0.03]); K.rotulo('Cable a la cabina', [(RL + 0.012), 0.5, 0], 'der'); }
        if (K.entre(t, 4.5, 8.5)) K.rotulo('Pesas', s.pesas[0].pesa);
        if (K.entre(t, 8.5, 12.4)) K.rotulo('Interruptor', [0.03, GY + 0.25, 0.04]);
        if (t > 12.4) { K.rotulo('Gancho (traba)', [-0.2, GY + 0.14, 0.0], 'izq'); if (t > tl) K.rotulo('Jala el paracaídas', [(RL + 0.012) + 0.05, 0.45, 0.02], 'der'); }
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
      cam: [[0, [0.3, 1.35, 0.62], [0, 1.08, 0]], [4, [0.42, 1.25, 0.88], [0, 1.04, 0]], [9, [0.5, 1.12, 0.8], [0.02, 1.0, 0]], [14.5, [0.6, 1.2, 1.0], [0, 0.97, 0]], [19.5, [0.6, 1.2, 1.05], [0, 0.96, 0]]],
      anim: function (t, s, K) {
        var cab, ang, abre, sw, traba, sucia = false, vt;
        if (t < 9) {
          var vf = function (x) { return kf(x, [[0, 1], [4, 1], [5, 1.3], [5.6, 1.3], [8.4, 0.25], [8.9, 0]]); }, tl = 5.6;
          cab = K.integ(function (x) { return vf(x) * 0.5; }, t);
          ang = K.integ(function (x) { return x < tl ? vf(x) * 0.5 : 0; }, t) / ((RL + 0.012));
          abre = t >= tl ? 1 : K.cl((vf(t) - 0.95) / 0.35); sw = abre > 0.62; traba = t >= 5.4;
          vt = t >= tl ? (vf(t) > 0.05 ? ['EL CABLE PATINA', 'mal'] : ['DETENIDA', 'mal']) : vf(t) > 1.1 ? ['MUY ALTA', 'mal'] : ['NORMAL', 'ok'];
          K.marcar(s.canal, K.parpadeo(t, 2) ? 'mal' : null);
          s.chis.emitir(t, [0, GY + RL, 0.02], K.entre(t, tl, 8.6), 0.1);
          K.rotulo(t < 4 ? 'Canaleta gastada' : 'Aquí patina', [0, GY + (RL + 0.012), 0]);
          if (K.entre(t, tl, 8.6)) K.aviso('El cable patina');
        } else if (t < 14.5) {
          var tf = 11.2;
          cab = K.integ(function (x) { return x < tf ? 0.5 : 0; }, t);
          ang = cab / ((RL + 0.012)); abre = t >= tf ? 1 : 0.15 + 0.85 * K.ph(t, 10.4, 11.1); sw = abre > 0.62; traba = t >= 11; sucia = true;
          vt = t >= tf ? ['DETENIDA', 'mal'] : ['NORMAL', 'ok'];
          K.marcar(s.canal, null);
          K.marcar(s.pesas.map(function (p) { return p.mugre; }), K.parpadeo(t, 2) ? 'mal' : null);
          s.chis.emitir(t, [0, 0, 0], false);
          K.rotulo('Pesas sucias', s.pesas[1].pesa, 'izq');
          if (t > tf) K.aviso('Se disparó sin motivo');
        } else {
          cab = (t - 14.5) * 0.5; ang = cab / ((RL + 0.012)); abre = 0.15; sw = false; traba = false;
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

  // =====================================================================================
  // 2) El lazo del cable del limitador: limitador arriba, polea tensora con pesa abajo, cabina en medio
  // =====================================================================================
  var LG = [-1.05, 5.0], LZ = 0.2, LR = 0.15, PIV = [-0.78, 0.5], BRP = 0.27, Y0 = 1.85;
  function armarLazo(K) {
    var M = K.M, T = K.T, s = mats(K);
    s.mPiso = K.mat(0x7f878e, { roughness: 0.95, metalness: 0 }); s.mMuro = K.mat(0xa9b1b8, { roughness: 0.95, metalness: 0 });
    K.add(K.caja(3.4, 0.1, 2.3, s.mPiso, -0.3, -0.05, -0.1));
    K.add(K.caja(3.4, 5.6, 0.06, s.mMuro, -0.3, 2.75, -1.25));
    s.charco = K.add(K.caja(1.4, 0.05, 1.0, K.mat(0x4f8fc0, { transparent: true, opacity: 0.55, roughness: 0.1 }), -1.0, 0.02, 0.1));
    [-1, 1].forEach(function (l) { var r = K.add(K.riel(5.3, M.acero)); r.position.set(l * 0.75, 0, 0); r.rotation.y = -l * PI / 2; });
    // cabina con su armazón, bloques del paracaídas y palanca
    s.cab = K.add(new T.Group());
    var C = function (o) { s.cab.add(o); return o; };
    C(K.caja(1.5, 0.1, 0.16, M.aceroOsc, 0, 0.05, 0)); C(K.caja(1.5, 0.1, 0.16, M.aceroOsc, 0, 2.6, 0));
    [-1, 1].forEach(function (l) { C(K.caja(0.07, 2.6, 0.1, M.aceroOsc, l * 0.66, 1.3, 0.1)); C(K.caja(0.1, 0.14, 0.14, M.hierro, l * 0.69, 0.0, 0)); });
    C(K.caja(1.2, 2.2, 1.4, M.inox, 0, 1.23, 0));
    C(K.cil(0.012, 1.32, M.hierro, 0, -0.03, 0.1, 'x', 10));
    s.palanca = new T.Group(); s.palanca.position.set(-0.66, -0.03, LZ); C(s.palanca);
    s.palanca.add(K.caja(0.27, 0.05, 0.05, K.mat(0x2f6fb0, { roughness: 0.5 }), -0.12, 0, 0)); s.palanca.add(K.caja(0.07, 0.09, 0.07, M.hierro, -0.24, 0, 0));
    s.palanca.add(K.cil(0.02, 0.06, M.hierro, 0, 0, 0, 'z', 12));
    s.chisI = K.add(K.chispas(12)); s.chisD = K.add(K.chispas(12));
    // limitador arriba, en su viga
    K.add(K.caja(0.12, 0.06, 1.45, M.azul, LG[0], LG[1] - 0.22, -0.5));
    K.add(K.caja(0.06, 0.2, 0.04, M.azul, LG[0], LG[1] - 0.1, LZ - 0.05));
    s.gov = K.add(new T.Group()); s.gov.position.set(LG[0], LG[1], LZ);
    s.gov.add(K.polea(LR, 0.045, M.acero, M.hierro));
    s.gov.add(K.cil(0.03, 0.03, M.aceroOsc, 0.07, 0, 0.04, 'z', 14), K.cil(0.03, 0.03, M.aceroOsc, -0.07, 0, 0.04, 'z', 14));
    s.govSw = K.add(K.caja(0.07, 0.09, 0.05, M.negro, LG[0] + 0.24, LG[1] + 0.06, LZ));
    // polea tensora con su brazo, su pesa y su interruptor
    K.add(K.caja(0.06, 0.06, 0.08, M.aceroOsc, (PIV[0] - 0.79) / 2, PIV[1], LZ - 0.06));
    s.brazo = K.add(new T.Group()); s.brazo.position.set(PIV[0], PIV[1], LZ - 0.06);
    s.brazo.add(K.caja(0.54, 0.04, 0.03, M.aceroOsc, -0.25, 0, 0));
    s.brazo.add(K.cil(0.018, 0.08, M.hierro, 0, 0, 0, 'z', 10));
    s.tens = new T.Group(); s.tens.position.set(-BRP, 0, 0.06); s.brazo.add(s.tens);
    s.tens.add(K.polea(LR, 0.045, M.acero, M.hierro));
    s.pesa = K.grupo([K.caja(0.16, 0.22, 0.12, M.pesa, 0, -0.14, 0), K.caja(0.03, 0.04, 0.03, M.hierro, 0, -0.01, 0)], -0.5, 0, 0.02); s.brazo.add(s.pesa);
    s.oxido = K.grupo([K.caja(0.165, 0.225, 0.125, K.mat(0x8a4b22, { roughness: 1 }), 0, -0.14, 0)], -0.5, 0, 0.02); s.brazo.add(s.oxido);
    s.sw = micro(K, s, 0.05); s.sw.g.rotation.z = PI; s.sw.led.position.set(-0.02, -0.05, 0.02);
    s.sw.g.position.set(PIV[0] - 0.5, 0.08, LZ - 0.04); K.add(s.sw.g);
    // el cable: dos ramales (el libre en dos tramos para que pueda bailar), dos arcos y marcas que corren con él
    s.mCable = K.mat(0x7d858d, { metalness: 0.6, roughness: 0.35 });
    s.ramA = K.add(K.cable(0.009, s.mCable)); s.ramB1 = K.add(K.cable(0.009, s.mCable)); s.ramB2 = K.add(K.cable(0.009, s.mCable));
    s.arcoG = K.add(K.toro(LR + 0.008, 0.009, s.mCable, LG[0], LG[1], LZ, PI));
    s.arcoT = K.add(K.toro(LR + 0.008, 0.009, s.mCable, 0, 0, LZ, PI)); s.arcoT.rotation.z = PI;
    s.cuerda = [s.ramA, s.ramB1, s.ramB2, s.arcoG, s.arcoT];
    s.mMarca = K.mat(0xf2b705, { roughness: 0.5 });
    s.marcas = []; for (var i = 0; i < 26; i++) s.marcas.push(K.add(K.cil(0.017, 0.06, s.mMarca, 0, 0, 0, null, 10)));
    // tramo pelado (hilos rotos) que viaja con el cable
    s.pelado = K.add(new T.Group());
    s.pelado.add(K.cil(0.016, 0.12, M.rojo, 0, 0, 0, null, 10));
    for (var j = 0; j < 7; j++) { var h = K.caja(0.004, 0.05, 0.004, M.acero, 0, -0.05 + j * 0.016, 0); h.rotation.z = (j % 2 ? 1 : -1) * 0.9; h.position.x = (j % 2 ? 1 : -1) * 0.018; s.pelado.add(h); }
    return s;
  }
  // punto del lazo a la distancia u (desde arriba del ramal de la cabina, bajando); q = [x, y, ángulo]
  function lazoPunto(u, P, L, bow, t, q) {
    var r = LR + 0.008, ax = LG[0] + LR + 0.008, bx = LG[0] - LR - 0.008, la = LG[1] - P[1], arc = PI * r;
    u = ((u % L) + L) % L;
    if (u < la) { var k = u / la; q[0] = ax + (P[0] + r - ax) * k; q[1] = LG[1] - u; q[2] = 0; }
    else if (u < la + arc) { var th = -(u - la) / r; q[0] = P[0] + Math.cos(th) * r; q[1] = P[1] + Math.sin(th) * r; q[2] = th; }
    else if (u < 2 * la + arc) { var v = u - la - arc, k2 = v / la; q[0] = P[0] - r + (bx - P[0] + r) * k2 + bow * (k2 < 0.3 ? k2 / 0.3 : (1 - k2) / 0.7); q[1] = P[1] + v; q[2] = 0; }
    else { var th2 = PI - (u - 2 * la - arc) / r; q[0] = LG[0] + Math.cos(th2) * r; q[1] = LG[1] + Math.sin(th2) * r; q[2] = th2; }
    return q;
  }
  // o: yc (altura de la cabina), dc (lo que corrió el cable), a (caída del brazo, rad), lev (palanca 0..1), sw, bow, pel, charco, oxido, chis
  function lazoPone(s, K, t, o) {
    var r = LR + 0.008, P = [PIV[0] - BRP * Math.cos(o.a), PIV[1] - BRP * Math.sin(o.a)];
    var la = LG[1] - P[1], L = 2 * la + 2 * PI * r, q = [0, 0, 0];
    s.cab.position.y = o.yc;
    s.palanca.rotation.z = -0.5 * (o.lev || 0);
    s.gov.rotation.z = -o.dc / LR;
    s.brazo.rotation.z = o.a; s.tens.rotation.z = -o.dc / LR - o.a; s.pesa.rotation.z = -o.a; s.oxido.rotation.z = -o.a;
    s.ramA.pon([LG[0] + r, LG[1], LZ], [P[0] + r, P[1], LZ]);
    var bm = P[1] + (LG[1] - P[1]) * 0.3, bx = P[0] - r + (LG[0] - P[0]) * 0.3 + (o.bow || 0);
    s.ramB1.pon([P[0] - r, P[1], LZ], [bx, bm, LZ]); s.ramB2.pon([bx, bm, LZ], [LG[0] - r, LG[1], LZ]);
    s.arcoT.position.set(P[0], P[1], LZ);
    var paso = L / s.marcas.length;
    s.marcas.forEach(function (m, i) {
      lazoPunto(i * paso + o.dc, P, L, o.bow || 0, t, q);
      m.position.set(q[0], q[1], LZ); m.rotation.set(0, 0, q[2]);
    });
    s.pelado.visible = o.pel != null;
    if (o.pel != null) { lazoPunto(o.pel + o.dc, P, L, 0, t, q); s.pelado.position.set(q[0], q[1], LZ); s.pelado.rotation.set(0, 0, q[2]); }
    s.sw.brazo.rotation.z = o.sw ? -0.6 : 0; s.sw.led.material = o.sw ? s.rojo : s.verde;
    s.charco.visible = !!o.charco; s.oxido.visible = !!o.oxido;
    var yb = o.yc - 0.02;
    s.chisI.emitir(t, [-0.69, yb, 0.08], !!o.chis, 0.12); s.chisD.emitir(t, [0.69, yb, 0.08], !!o.chis, 0.12);
    return P;
  }
  // viaje de la cabina: sube y baja; devuelve la altura
  function viaje(t, t0) { var u = ((t - (t0 || 0)) % 9 + 9) % 9; return kf(u, [[0, Y0], [0.6, Y0], [4, 1.0], [4.6, 1.0], [8.4, Y0], [9, Y0]]); }
  // capítulo «funciona» del lazo: viaja, se embala y el limitador frena el cable
  function lazoFunciona(t, s, K) {
    var yc, dc, lev = 0, chis = false, tl = 13, yL = Y0 - 0.6, v0 = 2 * 0.6 / 3.5;
    if (t < 9.5) { yc = kf(t, [[0, Y0], [1, Y0], [4.2, 1.0], [5, 1.0], [8.5, Y0]]); dc = Y0 - yc; }
    else if (t < tl) { var u = (t - 9.5) / 3.5; yc = Y0 - 0.6 * u * u; dc = Y0 - yc; }
    else { var w = Math.min(1, t - tl); yc = yL - v0 * (w - w * w / 2); dc = Y0 - yL; lev = K.cl((yL - yc) / 0.12); chis = t - tl < 1; }
    var tabla = t < 9.5 ? [['CABINA', Math.abs(yc - kf(t + 0.1, [[0, Y0], [1, Y0], [4.2, 1.0], [5, 1.0], [8.5, Y0]])) > 0.004 ? 'VIAJA' : 'QUIETA', ''], ['LIMITADOR', Math.abs(yc - kf(t + 0.1, [[0, Y0], [1, Y0], [4.2, 1.0], [5, 1.0], [8.5, Y0]])) > 0.004 ? 'GIRA' : 'QUIETO', '']]
      : t < tl ? [['CABINA', t > 11.5 ? 'MUY RÁPIDO' : 'BAJA', t > 11.5 ? 'mal' : 'ac'], ['LIMITADOR', 'GIRA', '']]
      : [['CABINA', t > tl + 1 ? 'CLAVADA EN LOS RIELES' : 'FRENANDO', 'mal'], ['LIMITADOR', 'CABLE FRENADO', 'mal']];
    return { yc: yc, dc: dc, a: 0, lev: lev, chis: chis, tabla: tabla };
  }
  // capítulo «falla» del lazo: el cable se estira y la pesa baja hasta su interruptor
  function lazoEstira(t, t0, t1) {
    var a = kf(t, [[t0, 0], [t1, 0.24]]), tsw = t0 + (t1 - t0) * 0.725, sw = t >= tsw;
    var tt = sw ? Math.min(t, tsw) : t, yc = viaje(tt, 0.4);
    return { a: a, sw: sw, yc: yc, dc: Y0 - yc, anio: Math.max(1, Math.min(12, Math.round(1 + (t - t0) / (t1 - t0) * 11))) };
  }
  function cuerdaMarca(s, K, modo) { K.marcar(s.cuerda, modo); K.marcar(s.marcas, null); }

  V3.escena('lazo-cable', ['cable_limitador'], {
    fov: 34,
    poster: 6,
    construir: function (K) { return armarLazo(K); },
    funciona: {
      dur: 19.5,
      subt: [[0, 'El cable del limitador es un lazo: arriba da la vuelta en el limitador y abajo en una polea con pesa.'],
        [4.5, 'Va amarrado a una palanca de la cabina. Cuando la cabina viaja, el cable corre con ella.'],
        [9, 'Por eso la polea del limitador gira igual de rápido que la cabina.'],
        [13, 'Si la cabina se embala, el limitador frena el cable. La cabina sigue bajando y el cable jala la palanca del paracaídas.']],
      cam: [[0, [2.2, 2.9, 9.6], [-0.45, 2.45, 0]], [3.8, [2.2, 2.9, 9.4], [-0.45, 2.45, 0]], [5.2, [-0.15, 1.95, 2.9], [-0.85, 1.4, 0.2]], [8.6, [-0.15, 1.95, 2.9], [-0.85, 1.42, 0.2]], [10, [0.0, 5.35, 1.9], [-1.05, 4.9, 0.2]], [12.6, [0.0, 5.3, 1.9], [-1.05, 4.9, 0.2]], [13.6, [-0.2, 1.85, 2.5], [-0.85, 1.3, 0.2]], [19.5, [-0.05, 1.95, 2.8], [-0.8, 1.32, 0.2]]],
      anim: function (t, s, K) {
        var o = lazoFunciona(t, s, K);
        lazoPone(s, K, t, o);
        cuerdaMarca(s, K, t < 4.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.palanca, K.entre(t, 4.5, 9) || t > 13 ? 'foco' : null);
        K.marcar(s.gov, K.entre(t, 9, 13) ? 'foco' : null); K.marcar(s.oxido, null);
        if (t < 4.5) { K.rotulo('Limitador', [LG[0], LG[1] + 0.2, LZ], 'izq'); K.rotulo('Cable del limitador', [LG[0] + LR, 3.4, LZ], 'izq'); K.rotulo('Polea con pesa', [PIV[0] - 0.3, 0.5, LZ], 'izq'); }
        if (K.entre(t, 4.5, 9)) K.rotulo('Palanca amarrada al cable', [-0.9, o.yc - 0.03, LZ], 'izq');
        if (K.entre(t, 9, 13)) K.rotulo('Gira con la cabina', [LG[0], LG[1] + 0.17, LZ]);
        if (t > 13) K.rotulo('El cable jala la palanca', [-0.9, o.yc - 0.03 + 0.1 * o.lev, LZ], 'izq');
        K.tabla(o.tabla);
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: con los años el cable se estira, como un elástico viejo.'],
        [4, 'La pesa de abajo baja poco a poco hasta apretar su interruptor. El ascensor se para y no arranca.'],
        [9.5, 'Falla 2: hilos rotos. El cable se pela con el roce y se puede cortar.'],
        [14, 'Arreglo: con el ascensor detenido, el técnico acorta el cable y la pesa vuelve a su altura. Si tiene hilos rotos, lo cambia.']],
      cam: [[0, [2.2, 2.9, 9.6], [-0.45, 2.45, 0]], [3.6, [0.3, 1.15, 2.4], [-1.05, 0.42, 0.2]], [9, [0.3, 1.15, 2.4], [-1.05, 0.42, 0.2]], [10.2, [-0.2, 3.4, 2.2], [-1.05, 3.0, 0.2]], [13.6, [-0.2, 3.4, 2.2], [-1.05, 3.0, 0.2]], [14.8, [1.4, 2.6, 7.4], [-0.5, 2.3, 0]], [19, [1.5, 2.6, 7.6], [-0.5, 2.3, 0]]],
      anim: function (t, s, K) {
        var o, pel = null, fix = 0;
        if (t < 9.5) { var e = lazoEstira(t, 0, 7.5); o = { yc: e.yc, dc: e.dc, a: e.a, sw: e.sw }; K.tabla([['TIEMPO', 'AÑO ' + e.anio, ''], ['PESA', e.sw ? 'APRIETA EL INTERRUPTOR' : 'BAJANDO', e.sw ? 'mal' : 'ac'], ['ASCENSOR', e.sw ? 'DETENIDO' : 'FUNCIONA', e.sw ? 'mal' : 'ok']]); if (e.sw) K.aviso('Ascensor detenido'); }
        else if (t < 14) { var yc = viaje(t, 9.5); o = { yc: yc, dc: Y0 - yc, a: 0.06 }; pel = 1.6; K.tabla([['CABLE', 'HILOS ROTOS', 'mal']]); }
        else {
          fix = K.ph(t, 14.5, 16.5); var y2 = t < 16.5 ? Y0 : viaje(t, 16.5);
          o = { yc: y2, dc: Y0 - y2, a: 0.24 * (1 - fix), sw: fix < 0.17 };
          K.tabla([['CABLE', fix > 0.99 ? 'A LA MEDIDA' : 'ACORTANDO', fix > 0.99 ? 'ok' : 'ac'], ['ASCENSOR', fix > 0.99 ? 'FUNCIONA' : 'DETENIDO', fix > 0.99 ? 'ok' : 'mal']]);
          if (fix > 0.99) K.aviso('Cable tenso y sano', false);
        }
        o.pel = pel;
        lazoPone(s, K, t, o);
        K.marcar(s.pelado, K.parpadeo(t, 2) ? 'mal' : null);
        K.marcar(s.pesa, t < 9.5 ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.sw.cuerpo, t < 9.5 && o.sw ? 'mal' : null);
        cuerdaMarca(s, K, t > 16.5 ? 'foco' : null); K.marcar(s.palanca, null); K.marcar(s.gov, null);
        if (t < 9.5) K.rotulo(o.sw ? 'Aprieta el interruptor' : 'La pesa baja', [PIV[0] - 0.5, PIV[1] - 0.2 - 0.5 * o.a, LZ], 'izq');
        else if (t < 14) K.rotulo('Hilos rotos', s.pelado, 'izq');
      }
    }
  });

  V3.escena('lazo-tensora', ['polea_tensora'], {
    fov: 34,
    poster: 6,
    construir: function (K) { return armarLazo(K); },
    funciona: {
      dur: 18.5,
      subt: [[0, 'La polea tensora está en el fondo del hueco (el foso). Es una rueda con una pesa colgando.'],
        [4.5, 'Por ella da la vuelta el cable del limitador. Cuando la cabina viaja, la rueda gira.'],
        [8.5, 'La pesa jala el cable hacia abajo y lo mantiene estirado, para que no patine arriba en el limitador.'],
        [13, 'Debajo de la pesa hay un interruptor. Si la pesa baja demasiado, lo aprieta y el ascensor se detiene.']],
      cam: [[0, [2.2, 2.9, 9.6], [-0.45, 2.45, 0]], [3.6, [2.2, 2.3, 7.0], [-0.6, 1.6, 0]], [5.2, [0.2, 1.05, 2.1], [-1.05, 0.45, 0.2]], [8.5, [0.2, 1.0, 2.1], [-1.05, 0.45, 0.2]], [10, [-2.4, 1.2, 1.9], [-1.1, 0.45, 0.2]], [12.8, [-2.4, 1.2, 1.9], [-1.1, 0.45, 0.2]], [14, [-0.5, 0.75, 1.35], [-1.25, 0.25, 0.15]], [18.5, [-0.4, 0.8, 1.5], [-1.2, 0.28, 0.15]]],
      anim: function (t, s, K) {
        var yc = t < 13 ? viaje(t, 0.4) : viaje(13, 0.4), a = K.kf(t, [[14.5, 0], [16, 0.24]]), sw = a > 0.2;
        lazoPone(s, K, t, { yc: yc, dc: Y0 - yc, a: a, sw: sw });
        cuerdaMarca(s, K, K.entre(t, 8.5, 13) ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.tens, t < 8.5 ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.pesa, K.entre(t, 8.5, 13) ? 'foco' : null); K.marcar(s.oxido, null);
        K.marcar(s.sw.cuerpo, t > 13 ? 'foco' : null); K.marcar([s.palanca, s.gov, s.pelado], null);
        if (t < 4.5) K.rotulo('Polea tensora', [PIV[0] - BRP, PIV[1] + 0.18, LZ], 'izq');
        if (K.entre(t, 4.5, 8.5)) K.rotulo('Gira con el cable', [PIV[0] - BRP, PIV[1] + 0.17, LZ]);
        if (K.entre(t, 8.5, 13)) { K.rotulo('Pesa', [PIV[0] - 0.5, PIV[1] - 0.14, LZ + 0.08]); K.rotulo('Cable estirado', [LG[0] - LR, 1.5, LZ], 'izq'); }
        if (t > 13) K.rotulo('Interruptor', [PIV[0] - 0.5, 0.06, LZ], 'izq');
        K.tabla([['POLEA', t < 13 ? 'GIRA' : 'QUIETA', ''], ['PESA', sw ? 'MUY ABAJO' : 'COLGANDO BIEN', sw ? 'mal' : 'ok'], ['ASCENSOR', sw ? 'DETENIDO' : t < 13 ? 'FUNCIONA' : 'QUIETO', sw ? 'mal' : 'ok']]);
        if (sw) K.aviso('Ascensor detenido');
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: el cable del limitador se estiró con los años. La pesa baja poco a poco.'],
        [4.5, 'Hasta que aprieta su interruptor: el ascensor se detiene y queda bloqueado.'],
        [9.5, 'Falla 2: agua y óxido en el foso. La pesa se traba, el cable queda flojo y baila.'],
        [14, 'Arreglo: acortar el cable, secar el foso y dejar que la pesa cuelgue libre, sin tocar nada.']],
      cam: [[0, [0.3, 1.1, 2.2], [-1.05, 0.42, 0.2]], [4.5, [-0.4, 0.8, 1.6], [-1.2, 0.28, 0.15]], [9.3, [-0.4, 0.8, 1.6], [-1.2, 0.28, 0.15]], [10.2, [0.2, 1.6, 3.3], [-1.05, 1.15, 0.2]], [13.6, [0.2, 1.6, 3.3], [-1.05, 1.15, 0.2]], [14.6, [0.3, 1.1, 2.3], [-1.05, 0.42, 0.2]], [19, [0.3, 1.1, 2.3], [-1.05, 0.42, 0.2]]],
      anim: function (t, s, K) {
        var o, bow = 0, charco = false, oxido = false;
        if (t < 9.5) {
          var e = lazoEstira(t, 0, 7.5); o = { yc: e.yc, dc: e.dc, a: e.a, sw: e.sw };
          K.tabla([['TIEMPO', 'AÑO ' + e.anio, ''], ['PESA', e.sw ? 'APRIETA EL INTERRUPTOR' : 'BAJANDO', e.sw ? 'mal' : 'ac'], ['ASCENSOR', e.sw ? 'DETENIDO' : 'FUNCIONA', e.sw ? 'mal' : 'ok']]);
          if (e.sw) K.aviso('Ascensor detenido');
          K.rotulo(e.sw ? 'Interruptor apretado' : 'La pesa baja', e.sw ? [PIV[0] - 0.5, 0.06, LZ] : [PIV[0] - 0.5, PIV[1] - 0.2 - 0.5 * e.a, LZ + 0.08], 'izq');
        } else if (t < 14) {
          var yc = viaje(t, 9.5); o = { yc: yc, dc: Y0 - yc, a: 0 };
          charco = true; oxido = true; bow = Math.sin(t * 9) * 0.16 * K.ph(t, 9.8, 10.6);
          K.tabla([['PESA', 'TRABADA', 'mal'], ['CABLE', 'FLOJO: BAILA', 'mal']]);
          K.rotulo('Pesa trabada', [PIV[0] - 0.5, PIV[1] - 0.12, LZ + 0.08], 'izq'); K.rotulo('Cable flojo', [LG[0] - LR - 0.02 + bow, 1.85, LZ], 'izq');
        } else {
          var fix = K.ph(t, 14.4, 16), y2 = t < 16 ? Y0 : viaje(t, 16);
          o = { yc: y2, dc: Y0 - y2, a: 0 };
          K.tabla([['PESA', 'COLGANDO LIBRE', 'ok'], ['FOSO', fix > 0.99 ? 'SECO' : 'SECANDO', fix > 0.99 ? 'ok' : 'ac']]);
          charco = fix < 0.99; s.charco.scale.set(1 - fix * 0.95, 1, 1 - fix * 0.95);
          if (fix > 0.99) K.aviso('Pesa libre y cable tenso', false);
        }
        if (t < 14) s.charco.scale.set(1, 1, 1);
        o.bow = bow; o.charco = charco; o.oxido = oxido;
        lazoPone(s, K, t, o);
        K.marcar(s.pesa, t < 9.5 && !o.sw ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.oxido, K.entre(t, 9.5, 14) ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        K.marcar(s.sw.cuerpo, t < 9.5 && o.sw ? (K.parpadeo(t, 2) ? 'mal' : null) : null);
        cuerdaMarca(s, K, K.entre(t, 9.5, 14) ? 'mal' : t > 16 ? 'foco' : null);
        K.marcar([s.tens, s.palanca, s.gov, s.pelado], null);
      }
    }
  });

  // =====================================================================================
  // 3) Paracaídas (vista de cerca, desde debajo de la cabina): bloque, cuñas, palanca, cable e interruptor
  //    La cabina queda quieta en la imagen y el riel con sus grapas corre hacia arriba (así se ve que baja).
  // =====================================================================================
  var BL = 0.008, GAP0 = 0.01, PEND = 0.16, CZ = 0.0175, PV = [-0.12, -0.16], BRZ = 0.42, SWX = 0.2, SWZ = -0.031, GRIP = 0.2, THM = 0.4;
  function armarCuna(K) {
    var M = K.M, T = K.T, s = mats(K);
    s.mMuro = K.mat(0xa9b1b8, { roughness: 0.95, metalness: 0 });
    // lo que está fijo en el hueco y corre hacia arriba: riel, grapas y juntas del muro
    s.mundo = K.add(new T.Group());
    var riel = K.riel(6, M.acero); riel.position.y = -3; s.mundo.add(riel);
    s.mundo.add(K.caja(2.6, 6, 0.04, s.mMuro, 0.2, 0, -0.34));
    for (var i = -5; i <= 5; i++) {
      s.mundo.add(K.caja(0.15, 0.05, 0.025, M.hierro, 0, i * 0.7, -0.06));
      s.mundo.add(K.caja(0.05, 0.05, 0.27, M.aceroOsc, 0, i * 0.7, -0.2));
      s.mundo.add(K.caja(2.6, 0.012, 0.01, M.aceroOsc, 0.2, i * 0.7 + 0.35, -0.318));
    }
    s.mGrasa = K.mat(0x4a3112, { roughness: 0.15, metalness: 0.3 });
    s.grasaRiel = K.grupo([K.caja(0.003, 6, 0.06, s.mGrasa, -BL - 0.0015, 0, 0.004), K.caja(0.003, 6, 0.06, s.mGrasa, BL + 0.0015, 0, 0.004)]);
    s.mundo.add(s.grasaRiel);
    // cabina: piso y travesaño de abajo (arriba en la imagen)
    K.add(K.caja(1.4, 0.04, 1.4, M.inox, 0.1, 0.31, 0.82));
    K.add(K.caja(0.14, 0.12, 1.3, M.aceroOsc, 0, 0.23, 0.68));
    // bloque del paracaídas: dos mejillas con la cara de adentro inclinada, tapa y un frente transparente
    s.mBloque = K.mat(0x46505a, { metalness: 0.4, roughness: 0.5 });
    [-1, 1].forEach(function (l) { var m = new T.Mesh(prisma(T, -l, 0.24, 0.024, 0.0624, 0.09), s.mBloque); m.position.set(l * 0.078, 0.02, 0.02); K.add(m); });
    K.add(K.caja(0.17, 0.025, 0.09, s.mBloque, 0, 0.152, 0.02));
    K.add(K.caja(0.17, 0.006, 0.006, M.aceroOsc, 0, 0.137, 0.067)); K.add(K.caja(0.17, 0.006, 0.006, M.aceroOsc, 0, -0.097, 0.067));
    // cuñas (con estrías en la cara que muerde) y su grasa
    s.mCuna = K.mat(0xf0c02a, { metalness: 0.3, roughness: 0.4 });
    s.cunas = [-1, 1].map(function (l) {
      var g = new T.Group(); K.add(g);
      g.add(new T.Mesh(prisma(T, l, 0.1, 0.028, 0.012, 0.035), s.mCuna));
      for (var j = 0; j < 6; j++) g.add(K.caja(0.0025, 0.004, 0.035, M.hierro, l * 0.0008, -0.04 + j * 0.016, 0));
      var gr = K.add(K.caja(0.004, 0.1, 0.036, s.mGrasa, 0, 0, CZ));
      return { g: g, l: l, grasa: gr };
    });
    s.chis = [K.add(K.chispas(10)), K.add(K.chispas(10))]; s.chis[0].scale.setScalar(0.45); s.chis[1].scale.setScalar(0.45);
    // palanca: gira en un eje (la barra que va al otro riel); varillas que suben las cuñas
    K.add(K.caja(0.05, 0.02, 0.03, s.mBloque, -0.1, -0.105, CZ)); K.add(K.caja(0.02, 0.06, 0.03, s.mBloque, -0.12, -0.13, CZ));
    K.add(K.cil(0.012, 1.2, M.hierro, PV[0], PV[1], 0.62, 'z', 12));
    s.palanca = K.add(new T.Group()); s.palanca.position.set(PV[0], PV[1], CZ);
    s.palanca.add(K.caja(BRZ + 0.02, 0.03, 0.03, K.mat(0x2f6fb0, { roughness: 0.5 }), BRZ / 2, 0, 0));
    s.palanca.add(K.cil(0.02, 0.05, M.hierro, 0, 0, 0, 'z', 12));
    s.varillas = [K.add(K.cable(0.004, M.acero)), K.add(K.cable(0.004, M.acero))];
    s.eslabon = K.add(K.cable(0.005, M.hierro));
    // cable del limitador con su grapa y marcas
    s.mCable = K.mat(0x7d858d, { metalness: 0.6, roughness: 0.35 });
    K.add(K.cable(0.005, s.mCable).pon([PV[0] + BRZ, -1.6, CZ], [PV[0] + BRZ, 1.6, CZ]));
    s.grapa = K.add(K.caja(0.03, 0.05, 0.03, M.hierro, PV[0] + BRZ, PV[1], CZ));
    s.mMarca = K.mat(0xf2b705, { roughness: 0.5 });
    s.marcas = []; for (var k = 0; k < 13; k++) s.marcas.push(K.add(K.cil(0.009, 0.03, s.mMarca, PV[0] + BRZ, 0, CZ, null, 10)));
    // interruptor del paracaídas con su botón de rearme
    s.sw = micro(K, s, 0.05); K.add(s.sw.g);
    K.add(K.caja(0.02, 0.3, 0.02, M.aceroOsc, SWX, 0.14, SWZ));
    s.rearme = K.add(K.cil(0.01, 0.014, M.azul, SWX - 0.022, 0, SWZ, null, 12));
    return s;
  }
  // o: D (lo que bajó la cabina), rel (cuánto subió el cable respecto de la cabina), raya (largo de la marca), mala,
  //    grasa, sw (interruptor abierto), dy (interruptor corrido), rearme (0..1), chis, vib
  function cunaPone(s, K, t, o) {
    var k = K.cl(o.rel / 0.21), th = THM * k + (o.vib || 0), u = 0.065 * k, xin = Math.max(BL, BL + GAP0 - PEND * u);
    s.mundo.position.y = ((o.D % 0.7) + 0.7) % 0.7;
    s.palanca.rotation.z = th;
    s.cunas.forEach(function (c, i) {
      c.g.position.set(c.l * xin, u, CZ);
      c.grasa.position.set(c.l * (xin + 0.0005), u, CZ); c.grasa.visible = !!o.grasa;
      var d = (c.l * 0.03 - PV[0]);
      s.varillas[i].pon([PV[0] + Math.cos(th) * d, PV[1] + Math.sin(th) * d + 0.015, CZ], [c.l * (xin + 0.014), u - 0.05, CZ]);
      s.chis[i].emitir(t + i * 0.37, [c.l * (BL + 0.004), u - 0.03, 0.036], !!o.chis, 0.2);
    });
    s.grasaRiel.visible = !!o.grasa;
    var tip = [PV[0] + Math.cos(th) * BRZ, PV[1] + Math.sin(th) * BRZ], gy = PV[1] + Math.sin(THM * k) * BRZ;
    s.grapa.position.y = gy; s.eslabon.pon([tip[0], tip[1], CZ], [PV[0] + BRZ, gy, CZ]);
    s.marcas.forEach(function (m, i) { m.position.y = -1.5 + (((i * 0.25 + (o.cable != null ? o.cable : 0)) % 3.25) + 3.25) % 3.25; m.visible = m.position.y < 1.5; });
    // interruptor: su ruedita se apoya en la palanca
    var dy = o.dy || 0, armY = PV[1] + Math.sin(th) * (SWX - PV[0]) + 0.015;
    s.sw.g.position.set(SWX, -0.047 + dy, SWZ);
    var empuja = Math.max(0, armY + 0.018 - (-0.127 + dy));
    s.sw.brazo.rotation.z = o.sw ? Math.max(0.6, Math.min(1.2, empuja * 14)) : Math.min(0.25, empuja * 14);
    s.sw.led.material = o.sw ? s.rojo : s.verde;
    s.rearme.position.y = -0.047 + dy + 0.052 - 0.007 * (o.rearme || 0);
  }
  // velocidad de la cabina (m/s, a escala del video) en «cómo funciona»: se embala, cámara lenta y frena
  function cunaVel(x) { return kf(x, [[0, 0.5], [4, 0.5], [6, 0.8], [6.4, 0.12], [8.2, 0.12], [10.5, 0]]); }
  function cunaFunciona(t, K) {
    var D = K.integ(cunaVel, t), D0 = K.integ(cunaVel, Math.min(t, 6.5)), rel = Math.max(0, D - D0), v = cunaVel(t);
    return { D: D, rel: rel, cable: rel, sw: rel > 0.05, chis: rel > GRIP && v > 0.01, v: v, lenta: K.entre(t, 6.4, 10.5) };
  }
  function cunaTabla(K, o, extra) {
    var vel = o.v < 0.005 ? (o.rel > GRIP ? ['CLAVADA', 'mal'] : ['QUIETA', '']) : o.rel > GRIP ? ['FRENANDO', 'mal'] : o.v > 0.6 && o.rel === 0 ? ['MUY RÁPIDO', 'mal'] : ['NORMAL', 'ok'];
    var f = [['CABINA', vel[0], vel[1]], ['CUÑAS', o.rel > GRIP ? 'MUERDEN EL RIEL' : o.rel > 0 ? 'SUBEN' : 'SUELTAS', o.rel > GRIP ? 'mal' : o.rel > 0 ? 'ac' : 'ok'],
      ['MOTOR', o.sw ? 'SIN CORRIENTE' : 'CON CORRIENTE', o.sw ? 'mal' : 'ok']];
    if (extra) f[2] = extra;
    K.tabla(f);
  }

  V3.escena('paracaidas', ['paracaidas'], {
    fov: 34,
    poster: 9,
    construir: function (K) { return armarCuna(K); },
    funciona: {
      dur: 20,
      subt: [[0, 'El paracaídas va debajo de la cabina, abrazando el riel. Adentro tiene dos cuñas que no tocan el riel.'],
        [4.5, 'Si la cabina baja demasiado rápido, el limitador frena su cable. El cable jala esta palanca hacia arriba.'],
        [8.5, 'La palanca sube las cuñas: se meten entre el bloque y el riel y lo muerden con fuerza.'],
        [12.5, 'La cabina se queda clavada en el riel, aunque no haya luz. Y un interruptor apaga el motor.'],
        [16.5, 'Solo el técnico la suelta: sube la cabina con la máquina y revisa el limitador, las cuñas y el riel.']],
      cam: [[0, [0.42, 0.06, 0.72], [0.05, -0.02, 0.0]], [4.2, [0.42, 0.04, 0.72], [0.06, -0.03, 0.0]], [5.6, [0.62, 0.0, 0.62], [0.13, -0.08, 0.0]], [8.2, [0.62, 0.0, 0.62], [0.13, -0.06, 0.0]], [9.4, [0.07, 0.05, 0.36], [0, 0.02, 0.02]], [12.3, [0.07, 0.05, 0.36], [0, 0.04, 0.02]], [13.5, [0.45, -0.02, 0.5], [0.12, -0.05, 0.0]], [16.3, [0.45, -0.02, 0.5], [0.12, -0.05, 0.0]], [20, [0.42, 0.06, 0.75], [0.05, -0.02, 0.0]]],
      anim: function (t, s, K) {
        var o = cunaFunciona(t, K);
        cunaPone(s, K, t, o);
        K.marcar(s.cunas.map(function (c) { return c.g; }), (t < 4.5 || K.entre(t, 8.5, 12.5)) ? (K.parpadeo(t, 1) ? 'foco' : null) : null);
        K.marcar(s.palanca, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        K.marcar(s.sw.cuerpo, K.entre(t, 12.5, 16.5) ? 'foco' : null);
        if (t < 4.5) { K.rotulo('Cuñas', [0.03, 0.04, CZ + 0.02], 'der'); K.rotulo('Riel', [0, 0.3, 0.03], 'izq'); K.rotulo('Cable del limitador', [PV[0] + BRZ, 0.1, CZ], 'izq'); }
        if (K.entre(t, 4.5, 8.5)) K.rotulo('Palanca', [0.12, PV[1] + 0.06, CZ], 'der');
        if (K.entre(t, 8.5, 12.5)) K.rotulo(o.rel > GRIP ? 'Muerden el riel' : 'Suben', [0.03, 0.08, CZ + 0.02], 'der');
        if (K.entre(t, 12.5, 16.5)) K.rotulo('Interruptor', [SWX, 0.0, -0.02], 'der');
        cunaTabla(K, o, o.lenta && t < 12.5 ? ['VIDEO', 'EN CÁMARA LENTA', 'ac'] : null);
        if (t > 10.6) K.aviso('Cabina clavada en el riel');
      }
    },
    falla: {
      dur: 19,
      subt: [[0, 'Falla 1: las cuñas y el riel tienen grasa y suciedad.'],
        [3.5, 'Cuando las cuñas suben, resbalan sobre el riel: la cabina tarda mucho en frenar y deja una marca larga.'],
        [10, 'Falla 2: si el limitador está sucio, las cuñas muerden sin motivo y la cabina se clava entre pisos.'],
        [14.5, 'Arreglo: limpiar las cuñas y los rieles, revisar la palanca y probar. Una cabina clavada solo la suelta el técnico.']],
      cam: [[0, [0.08, 0.04, 0.36], [0, 0.0, 0.02]], [3.4, [0.08, 0.04, 0.36], [0, 0.0, 0.02]], [4.6, [0.3, 0.02, 0.55], [0.02, 0.0, 0.0]], [9.6, [0.3, 0.02, 0.55], [0.02, 0.0, 0.0]], [10.6, [0.45, 0.04, 0.7], [0.08, -0.02, 0.0]], [14.3, [0.45, 0.04, 0.7], [0.08, -0.02, 0.0]], [15.3, [0.12, 0.05, 0.42], [0, 0.0, 0.02]], [19, [0.3, 0.06, 0.6], [0.04, -0.01, 0.0]]],
      anim: function (t, s, K) {
        var o, vf;
        if (t < 10) {
          vf = function (x) { return kf(x, [[0, 0.5], [3.5, 0.5], [4.5, 0.8], [5.4, 0.8], [9.6, 0]]); };
          var D = K.integ(vf, t), rel = Math.max(0, D - K.integ(vf, Math.min(t, 4.6)));
          o = { D: D, rel: rel, cable: rel, grasa: true, sw: rel > 0.05, chis: rel > GRIP && vf(t) > 0.01, v: vf(t) };
          var dist = Math.max(0, rel - GRIP);
          cunaTabla(K, o, ['FRENADO', o.rel > GRIP ? dist.toFixed(1) + ' m (lo normal: 0.3 m)' : '—', o.rel > GRIP ? 'mal' : '']);
          K.marcar(s.cunas.map(function (c) { return c.grasa; }), K.parpadeo(t, 2) ? 'mal' : null);
          if (t < 3.5) K.rotulo('Grasa y suciedad', [0.03, 0.02, CZ + 0.02], 'der');
          else if (rel > GRIP) { K.rotulo('Resbalan sobre la grasa', [0.02, 0.05, CZ + 0.02], 'der'); K.aviso('Frena tarde'); }
        } else if (t < 14.5) {
          vf = function (x) { return x < 10 ? 0.5 : kf(x, [[10, 0.5], [11, 0.5], [12, 0]]); };
          var D2 = K.integ(vf, t), r2 = Math.max(0, D2 - K.integ(vf, Math.min(t, 11)));
          o = { D: D2, rel: r2 * 1.6, cable: r2 * 1.6, sw: r2 > 0.03, chis: r2 * 1.6 > GRIP && vf(t) > 0.01, v: vf(t) };
          cunaTabla(K, o);
          K.marcar(s.cunas.map(function (c) { return c.grasa; }), null);
          if (t > 12) K.aviso('Clavada sin motivo, con gente adentro');
        } else {
          var lim = K.ph(t, 15, 17);
          o = { D: 0, rel: 0, cable: 0, grasa: false, sw: false, v: 0 };
          K.tabla([['CUÑAS', lim > 0.99 ? 'LIMPIAS' : 'LIMPIANDO', lim > 0.99 ? 'ok' : 'ac'], ['RIEL', lim > 0.99 ? 'LIMPIO' : 'LIMPIANDO', lim > 0.99 ? 'ok' : 'ac']]);
          if (lim > 0.99) K.aviso('Listo para la prueba', false);
          K.marcar(s.cunas.map(function (c) { return c.grasa; }), null);
        }
        cunaPone(s, K, t, o);
        K.marcar(s.cunas.map(function (c) { return c.g; }), t > 14.5 ? 'foco' : null);
        K.marcar([s.palanca, s.sw.cuerpo], null);
      }
    }
  });

  V3.escena('contacto-paracaidas', ['contacto_paracaidas'], {
    fov: 34,
    poster: 9,
    construir: function (K) { return armarCuna(K); },
    funciona: {
      dur: 19,
      subt: [[0, 'Junto a la palanca del paracaídas hay un interruptor pequeño, con una ruedita apoyada en la palanca.'],
        [4.5, 'Si la cabina se embala, el cable del limitador jala la palanca hacia arriba y las cuñas muerden el riel.'],
        [8.5, 'La palanca empuja la ruedita y el interruptor se abre: el motor se queda sin corriente al instante.'],
        [12.5, 'Así la máquina no sigue jalando una cabina clavada. El interruptor queda trabado hasta que el técnico lo rearma.']],
      cam: [[0, [0.5, 0.0, 0.5], [0.15, -0.08, 0.0]], [4.2, [0.5, 0.0, 0.5], [0.15, -0.08, 0.0]], [5.6, [0.55, 0.05, 0.75], [0.08, -0.06, 0.0]], [8.2, [0.55, 0.05, 0.75], [0.08, -0.06, 0.0]], [9.4, [0.48, -0.03, 0.42], [0.18, -0.08, -0.01]], [12.3, [0.48, -0.03, 0.42], [0.18, -0.08, -0.01]], [13.5, [0.55, 0.0, 0.55], [0.15, -0.07, 0.0]], [19, [0.55, 0.0, 0.6], [0.14, -0.06, 0.0]]],
      anim: function (t, s, K) {
        var o = cunaFunciona(t, K);
        cunaPone(s, K, t, o);
        K.marcar(s.sw.cuerpo, t < 4.5 || t > 8.5 ? (K.parpadeo(t, 1) && t < 4.5 ? 'foco' : t >= 8.5 ? 'foco' : null) : null);
        K.marcar(s.palanca, K.entre(t, 4.5, 8.5) ? 'foco' : null);
        K.marcar(s.cunas.map(function (c) { return c.g; }), null);
        if (t < 4.5) { K.rotulo('Interruptor', [SWX, 0.0, -0.02], 'der'); K.rotulo('Ruedita', [SWX, -0.127, 0.02], 'der'); K.rotulo('Palanca', [0.05, PV[1], CZ], 'izq'); }
        if (K.entre(t, 4.5, 8.5)) K.rotulo('El cable jala', [PV[0] + BRZ, PV[1] + 0.1, CZ], 'der');
        if (t > 8.5) K.rotulo(o.sw ? 'Abierto: motor apagado' : 'Interruptor', [SWX, 0.0, -0.02], 'der');
        if (t > 12.5) K.rotulo('Botón de rearme', s.rearme, 'izq');
        cunaTabla(K, o, null);
      }
    },
    falla: {
      dur: 18.5,
      subt: [[0, 'Falla 1: después de una prueba, la palanca regresó a su sitio, pero nadie rearmó el interruptor.'],
        [4.5, 'Las cuñas están sueltas, pero el ascensor no arranca: el tablero ve el interruptor abierto.'],
        [9, 'Falla 2: el interruptor quedó muy pegado a la palanca. Con la vibración se abre y el ascensor se para de golpe.'],
        [14, 'Arreglo: el técnico lo rearma, lo separa un poquito de la palanca y aprieta sus cables. Nunca se puentea.']],
      cam: [[0, [0.5, 0.0, 0.5], [0.13, -0.08, 0.0]], [4.5, [0.42, -0.04, 0.4], [0.18, -0.09, 0.0]], [9, [0.42, -0.04, 0.4], [0.18, -0.09, 0.0]], [10, [0.5, 0.05, 0.6], [0.12, -0.05, 0.0]], [13.8, [0.5, 0.05, 0.6], [0.12, -0.05, 0.0]], [14.8, [0.36, -0.03, 0.34], [0.2, -0.08, -0.01]], [18.5, [0.45, 0.0, 0.5], [0.15, -0.07, 0.0]]],
      anim: function (t, s, K) {
        var o;
        if (t < 9) {
          o = { D: 0, rel: 0, cable: 0, sw: true, v: 0 };
          K.marcar(s.sw.cuerpo, K.parpadeo(t, 2) ? 'mal' : null);
          K.tabla([['CUÑAS', 'SUELTAS', 'ok'], ['INTERRUPTOR', 'SIN REARMAR', 'mal'], ['ASCENSOR', 'NO ARRANCA', 'mal']]);
          K.rotulo(t < 4.5 ? 'Quedó abierto' : 'Sin rearmar', [SWX, 0.0, -0.02], 'der');
          if (t > 4.5) K.aviso('El ascensor no arranca');
        } else if (t < 14) {
          var corte = K.ruido(Math.floor(t * 3)) > 0.62, D = (t - 9) * 0.5;
          o = { D: D, rel: 0, cable: 0, sw: corte, v: corte ? 0 : 0.5, dy: -0.008, vib: Math.sin(t * 47) * 0.01 };
          K.marcar(s.sw.cuerpo, corte ? 'mal' : null);
          K.tabla([['INTERRUPTOR', 'MUY PEGADO', 'mal'], ['VIAJE', corte ? 'SE PARA DE GOLPE' : 'NORMAL', corte ? 'mal' : 'ok']]);
          K.rotulo('Muy pegado', [SWX, -0.12, 0.02], 'der');
          if (corte) K.aviso('Parada de golpe');
        } else {
          var r = K.ph(t, 14.6, 15.2) * (1 - K.ph(t, 15.4, 15.9)), ok = t > 15.4;
          o = { D: t > 16 ? (t - 16) * 0.5 : 0, rel: 0, cable: 0, sw: !ok, v: t > 16 ? 0.5 : 0, dy: -0.008 * (1 - K.ph(t, 16, 17)), rearme: r };
          K.marcar(s.sw.cuerpo, ok ? 'foco' : null);
          K.tabla([['INTERRUPTOR', ok ? 'REARMADO' : 'SIN REARMAR', ok ? 'ok' : 'mal'], ['ASCENSOR', t > 16 ? 'FUNCIONA' : 'DETENIDO', t > 16 ? 'ok' : 'mal']]);
          if (t < 15.4) K.rotulo('Botón de rearme', s.rearme, 'izq');
          if (t > 16) K.aviso('Funciona normal', false);
        }
        cunaPone(s, K, t, o);
        K.marcar([s.palanca], null); K.marcar(s.cunas.map(function (c) { return c.g; }), null);
      }
    }
  });

  /*@@FOSO@@*/
})();
