/* Taller de Ascensores — motor de los videos en 3D.
   Cada pieza tiene una escena 3D que se mueve sola (cómo funciona y cómo falla), con subtítulos sencillos.
   Las escenas se registran con ASC.v3d.escena(clave, [piezas], def) en los archivos v3d-*.js.
   Si una pieza no tiene escena propia, se usa el ascensor completo con la cámara yendo a la pieza.
   El reproductor (botones, subtítulos, voz) vive en animaciones.js; aquí solo se arma y dibuja la escena. */
(function () {
  'use strict';
  var ASC = window.ASC, T = window.THREE;
  if (!T || !ASC) return;
  var PI = Math.PI, TAU = PI * 2;
  var V3 = ASC.v3d = { escenas: {}, de: {} };
  ASC.simple = ASC.simple || {};

  // registra una escena para una o varias piezas
  V3.escena = function (clave, piezas, def) { V3.escenas[clave] = def; (piezas || []).forEach(function (id) { V3.de[id] = clave; }); };

  // ---------- utilidades de tiempo (iguales a las del reproductor 2D) ----------
  function cl(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ph(t, a, b) { if (b <= a) return t >= b ? 1 : 0; var x = cl((t - a) / (b - a)); return x * x * (3 - 2 * x); }
  function mix(a, b, k) { return a + (b - a) * k; }
  function kf(t, a) {
    if (t <= a[0][0]) return a[0][1];
    for (var i = 1; i < a.length; i++) if (t <= a[i][0]) return mix(a[i - 1][1], a[i][1], ph(t, a[i - 1][0], a[i][0]));
    return a[a.length - 1][1];
  }
  function kfv(t, a, out) {   // claves con vectores [[t, [x,y,z]], ...]
    var i = 1, k = 0, p = a[0][1], q = a[0][1];
    if (t > a[0][0]) { for (; i < a.length; i++) if (t <= a[i][0]) break; if (i >= a.length) { p = q = a[a.length - 1][1]; } else { p = a[i - 1][1]; q = a[i][1]; k = ph(t, a[i - 1][0], a[i][0]); } }
    return (out || new T.Vector3()).set(mix(p[0], q[0], k), mix(p[1], q[1], k), mix(p[2], q[2], k));
  }
  function integ(fn, t) { var s = 0, dt = 0.04; for (var x = 0; x < t; x += dt) { var d = Math.min(dt, t - x); s += fn(x + d / 2) * d; } return s; }
  function ruido(i) { var x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function entre(t, a, b) { return t >= a && t < b; }

  // ---------- caja de herramientas para armar escenas ----------
  function kit(sc) {
    var K = { T: T, M: ASC.mat || {}, sc: sc, mats: [], PI: PI, TAU: TAU };
    K.cl = cl; K.ph = ph; K.mix = mix; K.kf = kf; K.kfv = kfv; K.integ = integ; K.ruido = ruido; K.entre = entre;
    K.late = function (t, f) { return 0.5 + 0.5 * Math.sin(t * TAU * (f || 1.5)); };
    K.parpadeo = function (t, f) { return Math.sin(t * TAU * (f || 2)) > 0; };
    K.v = function (x, y, z) { return new T.Vector3(x || 0, y || 0, z || 0); };
    K.mat = function (c, o) { var m = new T.MeshStandardMaterial(Object.assign({ color: c, roughness: 0.6, metalness: 0.15 }, o || {})); K.mats.push(m); return m; };
    K.matB = function (c, o) { var m = new T.MeshBasicMaterial(Object.assign({ color: c }, o || {})); K.mats.push(m); return m; };
    K.add = function (o, padre) { (padre || sc).add(o); return o; };
    K.en = function (o, x, y, z) { o.position.set(x || 0, y || 0, z || 0); return o; };
    K.grupo = function (arr, x, y, z) { var g = new T.Group(); (arr || []).forEach(function (h) { if (h) g.add(h); }); g.position.set(x || 0, y || 0, z || 0); return g; };
    K.caja = function (w, h, d, m, x, y, z) { return K.en(new T.Mesh(new T.BoxGeometry(w, h, d), m || K.M.acero), x, y, z); };
    K.cil = function (r, l, m, x, y, z, eje, seg) {
      var o = new T.Mesh(new T.CylinderGeometry(r, r, l, seg || 24), m || K.M.acero);
      if (eje === 'x') o.rotation.z = PI / 2; else if (eje === 'z') o.rotation.x = PI / 2;
      return K.en(o, x, y, z);
    };
    K.cono = function (r, l, m, x, y, z) { return K.en(new T.Mesh(new T.ConeGeometry(r, l, 20), m || K.M.acero), x, y, z); };
    K.esfera = function (r, m, x, y, z) { return K.en(new T.Mesh(new T.SphereGeometry(r, 20, 14), m || K.M.acero), x, y, z); };
    K.toro = function (R, r, m, x, y, z, arco) { return K.en(new T.Mesh(new T.TorusGeometry(R, r, 10, 48, arco || TAU), m || K.M.hierro), x, y, z); };
    K.plano = function (w, h, m, x, y, z) { return K.en(new T.Mesh(new T.PlaneGeometry(w, h), m), x, y, z); };
    // polea con garganta y rayos; gira con .rotation.z (eje del disco = z)
    K.polea = function (r, ancho, m, borde) {
      var g = new T.Group(); m = m || K.M.acero; borde = borde || K.M.hierro;
      g.add(K.cil(r, ancho, m, 0, 0, 0, 'z', 40));
      g.add(K.toro(r * 0.96, ancho * 0.22, borde, 0, 0, ancho * 0.28)); g.add(K.toro(r * 0.96, ancho * 0.22, borde, 0, 0, -ancho * 0.28));
      for (var i = 0; i < 4; i++) { var b = K.caja(r * 1.5, r * 0.1, ancho * 1.08, borde, 0, 0, 0); b.rotation.z = i * PI / 4; g.add(b); }
      g.add(K.cil(r * 0.18, ancho * 1.3, borde, 0, 0, 0, 'z', 16));
      return g;
    };
    // resorte a lo largo de +Y, de 0 a alto; para comprimirlo usa .scale.y
    K.resorte = function (r, alto, vueltas, grosor, m) {
      var pts = [], n = Math.max(8, Math.round(vueltas * 14));
      for (var i = 0; i <= n; i++) { var a = i / n * vueltas * TAU; pts.push(new T.Vector3(Math.cos(a) * r, i / n * alto, Math.sin(a) * r)); }
      return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts), n * 2, grosor || r * 0.12, 6, false), m || K.M.cobre);
    };
    K.tubo = function (pts, r, m) { return new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(pts.map(function (p) { return Array.isArray(p) ? new T.Vector3(p[0], p[1], p[2]) : p; })), 48, r, 8, false), m || K.M.negro); };
    // cilindro entre dos puntos que se puede mover cada cuadro con .pon(a, b)
    var Y = new T.Vector3(0, 1, 0);
    K.cable = function (r, m) {
      var o = new T.Mesh(new T.CylinderGeometry(r, r, 1, 10), m || K.M.hierro);
      o.pon = function (a, b) {
        a = Array.isArray(a) ? K.v(a[0], a[1], a[2]) : a; b = Array.isArray(b) ? K.v(b[0], b[1], b[2]) : b;
        var d = b.clone().sub(a), L = Math.max(1e-4, d.length());
        o.position.copy(a).addScaledVector(d, 0.5); o.scale.set(1, L, 1); o.quaternion.setFromUnitVectors(Y, d.divideScalar(L));
        return o;
      };
      return o;
    };
    K.rayo = function (color) { var m = K.matB(color || 0xff3b30, { transparent: true, opacity: 0.85 }); var o = K.cable(0.004, m); return o; };
    // guía en T a lo largo de +Y
    K.riel = function (largo, m) {
      m = m || K.M.acero; var g = new T.Group();
      g.add(K.caja(0.016, largo, 0.07, m, 0, largo / 2, 0)); g.add(K.caja(0.09, largo, 0.012, m, 0, largo / 2, -0.04));
      return g;
    };
    // persona sencilla; casco = true para el técnico
    K.persona = function (alto, color, casco) {
      // brazos y piernas giran desde el hombro y la cadera (.rotation.x hacia adelante o atrás); mira hacia +z
      var s = (alto || 1.7) / 1.7, c = K.mat(color || 0x7f95a8, { roughness: 0.85, metalness: 0 }), g = new T.Group();
      var pi = K.grupo([K.cil(0.07 * s, 0.8 * s, c, 0, -0.4 * s, 0)], -0.08 * s, 0.8 * s, 0), pd = K.grupo([K.cil(0.07 * s, 0.8 * s, c, 0, -0.4 * s, 0)], 0.08 * s, 0.8 * s, 0);
      g.add(pi, pd); g.piernaI = pi; g.piernaD = pd;
      g.add(K.caja(0.36 * s, 0.62 * s, 0.2 * s, c, 0, 1.12 * s, 0));
      var bi = K.grupo([K.cil(0.055 * s, 0.6 * s, c, 0, -0.3 * s, 0)], -0.24 * s, 1.42 * s, 0), bd = K.grupo([K.cil(0.055 * s, 0.6 * s, c, 0, -0.3 * s, 0)], 0.24 * s, 1.42 * s, 0);
      g.add(bi, bd); g.brazoI = bi; g.brazoD = bd;
      g.caminar = function (t, fuerza) { var a = Math.sin(t * 7) * 0.45 * (fuerza == null ? 1 : fuerza); pi.rotation.x = a; pd.rotation.x = -a; bi.rotation.x = -a * 0.7; bd.rotation.x = a * 0.7; };
      g.add(K.esfera(0.12 * s, c, 0, 1.56 * s, 0));
      if (casco) g.add(K.en(new T.Mesh(new T.SphereGeometry(0.135 * s, 20, 10, 0, TAU, 0, PI / 2), K.M.amarillo), 0, 1.6 * s, 0));
      return g;
    };
    // flecha a lo largo de +Y (largo 1); .apuntar(desde, hacia)
    K.flecha = function (color, grosor) {
      var m = K.matB(color || 0xf2b705), g = new T.Group(), r = grosor || 0.02;
      var cuerpo = K.cil(r, 1, m, 0, 0.5, 0, null, 10), punta = K.cono(r * 2.6, r * 7, m, 0, 1, 0);
      g.add(cuerpo, punta);
      g.apuntar = function (a, b) {
        a = Array.isArray(a) ? K.v(a[0], a[1], a[2]) : a; b = Array.isArray(b) ? K.v(b[0], b[1], b[2]) : b;
        var d = b.clone().sub(a), L = Math.max(1e-4, d.length());
        g.position.copy(a); g.quaternion.setFromUnitVectors(Y, d.divideScalar(L));
        cuerpo.scale.y = Math.max(0.01, L - r * 7); cuerpo.position.y = cuerpo.scale.y / 2; punta.position.y = L - r * 3.5;
        return g;
      };
      return g;
    };
    // chispas: un grupo de cubitos que saltan desde un punto mientras on = true
    K.chispas = function (n) {
      var g = new T.Group(), m1 = K.matB(0xffc62b), m2 = K.matB(0xff7a2a);
      for (var i = 0; i < (n || 14); i++) g.add(new T.Mesh(new T.BoxGeometry(0.008, 0.008, 0.03), i % 2 ? m1 : m2));
      g.emitir = function (t, pos, on, escala) {
        g.visible = !!on; if (!on) return;
        var e = escala || 0.12; g.position.set(pos[0], pos[1], pos[2]);
        g.children.forEach(function (c, i) {
          var k = ((t * 3 + ruido(i)) % 1), a = ruido(i * 3.1) * TAU, b = ruido(i * 7.7) * PI;
          c.position.set(Math.cos(a) * Math.sin(b) * k * e, Math.cos(b) * k * e - k * k * e * 0.6, Math.sin(a) * Math.sin(b) * k * e);
          c.lookAt(0, 0, 0); c.visible = k < 0.9;
        });
      };
      return g;
    };
    // gota de aceite que cae en bucle
    K.gota = function (m) { var o = K.esfera(0.012, m || K.mat(0xc99228, { roughness: 0.2, metalness: 0.1 })); o.scale.y = 1.4; return o; };
    // texto pintado en un cartel 3D (para rótulos fijos sobre objetos, como «P1»)
    K.cartel = function (texto, ancho, alto, fondo, tinta) {
      var cv = document.createElement('canvas'); cv.width = 256; cv.height = Math.round(256 * (alto / ancho));
      var tex = new T.CanvasTexture(cv), m = K.matB(0xffffff, { map: tex, transparent: true });
      var o = new T.Mesh(new T.PlaneGeometry(ancho, alto), m);
      o.escribir = function (s, f, c) {
        var g = cv.getContext('2d'); g.clearRect(0, 0, cv.width, cv.height);
        g.fillStyle = f || fondo || '#1b262f'; g.fillRect(0, 0, cv.width, cv.height);
        g.fillStyle = c || tinta || '#ff5a3c'; g.font = '600 ' + Math.round(cv.height * 0.62) + 'px monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
        g.fillText(s, cv.width / 2, cv.height / 2 + 2); tex.needsUpdate = true; return o;
      };
      o.escribir(texto);
      return o;
    };
    K.piso = function (r, color) { var o = new T.Mesh(new T.CircleGeometry(r || 2, 48), K.mat(color || 0xb9c1c8, { roughness: 0.95, metalness: 0 })); o.rotation.x = -PI / 2; return o; };

    // ---------- marcas de color: 'foco' amarillo, 'mal' rojo, null normal ----------
    var copias = new Map();
    K.marcar = function (obj, modo) {
      if (!obj) return;
      if (Array.isArray(obj)) { obj.forEach(function (o) { K.marcar(o, modo); }); return; }
      if (obj.userData._marca === (modo || null)) return;
      obj.userData._marca = modo || null;
      obj.traverse(function (o) {
        if (!o.isMesh) return;
        if (!o.userData._m0) o.userData._m0 = o.material;
        var m0 = o.userData._m0;
        if (!modo) { o.material = m0; return; }
        var clave = modo + ':' + m0.uuid, c = copias.get(clave);
        if (!c) {
          c = m0.clone(); K.mats.push(c);
          var col = modo === 'mal' ? 0xff2a14 : 0xf2b705;
          if (c.emissive) { c.emissive.setHex(col); c.emissiveIntensity = modo === 'mal' ? 0.9 : 0.55; } else if (c.color) c.color.lerp(new T.Color(col), 0.6);
          copias.set(clave, c);
        }
        o.material = c;
      });
    };

    // ---------- lo que se pinta encima, cuadro por cuadro ----------
    K._rot = []; K._tabla = null; K._aviso = null;
    K.rotulo = function (texto, donde, lado) { K._rot.push({ t: texto, d: donde, lado: lado }); };
    K.tabla = function (filas) { K._tabla = filas; };
    K.aviso = function (texto, malo) { K._aviso = { t: texto, malo: malo !== false }; };
    return K;
  }

  // ---------- reproductor 3D compartido: un solo renderer, el canvas pasa de un video a otro ----------
  var R = null, vivos = [];
  function renderer() {
    if (R) return R.ok ? R : null;
    R = { ok: false };
    try {
      var cv = document.createElement('canvas');
      var r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true });
      r.outputEncoding = T.sRGBEncoding; r.setClearColor(0x000000, 0);
      R = { ok: true, r: r, cv: cv, dueno: null };
      cv.className = 'v3-lienzo';
    } catch (e) { R.ok = false; return null; }
    return R;
  }
  V3.disponible = function () { return !!renderer(); };

  function luces(sc) {
    sc.add(new T.HemisphereLight(0xffffff, 0x8d949b, 0.95));
    var d1 = new T.DirectionalLight(0xffffff, 0.8); d1.position.set(4, 8, 6); sc.add(d1);
    var d2 = new T.DirectionalLight(0xffffff, 0.35); d2.position.set(-5, 3, -4); sc.add(d2);
  }

  // textos sencillos de la pieza: los de ASC.simple, o los de la ficha como respaldo
  function frasesSimples(id) {
    var s = ASC.simple[id], c = ASC.partes[id] || {}, k = ASC.cat[id] || {};
    var f0 = (c.fallas || [])[0] || {};
    return {
      funciona: s ? [s.que, s.sirve].filter(Boolean) : [c.resumen || k.m],
      falla: s ? [s.falla, s.arreglo].filter(Boolean) : [f0.sintoma ? f0.sintoma + '. ' + (f0.causa || '') : 'Si esta pieza falla, el ascensor puede detenerse.', f0.revisar ? 'Se revisa: ' + f0.revisar : 'El técnico la revisa en el mantenimiento.']
    };
  }
  function tiempos(textos, min) {
    var t = 0, s = textos.map(function (x) { var d = Math.max(4, Math.min(8, x.split(/\s+/).length * 0.36)); var r = [t, x]; t += d; return r; });
    return { subt: s, dur: Math.max(min || 0, t + 0.6) };
  }
  V3.tiempos = tiempos; V3.frasesSimples = frasesSimples;

  // equipo de práctica donde existe la pieza (para la escena del ascensor completo)
  function equipoDe(id, pref) {
    var c = ASC.cat[id]; if (!c) return 'otis';
    if (pref && ASC.equipos[pref] && c.t.indexOf(ASC.base(pref)) >= 0) return pref;
    return c.t.indexOf('mrl') >= 0 ? 'otis' : c.t.indexOf('mr') >= 0 ? 'clasico' : 'movilift';
  }

  // ---------- escena general: el ascensor completo, la cámara va a la pieza ----------
  V3.escena('ascensor', [], {
    generico: true,
    construir: function (K, foco, op) {
      var eq = equipoDe(foco, op && op.equipo), base = ASC.base(eq), m = ASC.construir(base, eq);
      K.add(m.raiz); K.ignorar = m;   // sus geometrías y materiales son compartidos: no se liberan
      // sin muros ni pasillo, para ver la pieza desde afuera del hueco
      var M = ASC.mat; m.raiz.traverse(function (o) { if (o.isMesh && (o.material === M.muro || o.material === M.muroB || o.material === M.hall || o.material === M.persona)) o.visible = false; });
      var p = m.partes[foco], ancla = K.v();
      if (p) m.posAncla(foco, ancla);
      var L = m.limites, alto = L.ymax - L.ymin, centro = K.v(m.cx, (L.ymax + L.ymin) / 2, 0);
      var radio = p ? Math.min(2.6, Math.max(0.5, p.radio * 1.7)) : 2;
      var dir = K.v(0.62, 0.32, 0.72).normalize(); if (m.espejo) dir.x = -dir.x;
      return { m: m, p: p, ancla: ancla, centro: centro, alto: alto, radio: radio, dir: dir, cabina: !!(p && p.ancla && p.ancla.padre === m.cab) };
    },
    caps: function (foco) { var f = frasesSimples(foco); return [tiempos(f.funciona, 12), tiempos(f.falla, 12)]; },
    camara: function (s, cap, t, dur, pos, mira) {
      var lejos = s.centro.clone().addScaledVector(s.dir, s.alto * 1.25), cerca = s.ancla.clone().addScaledVector(s.dir, s.radio * 3.4 + 1.1);
      if (s.cabina) s.m.posAncla(s.p.id, s.ancla);
      var k = ph(t, 0.4, 3.6);
      pos.copy(lejos).lerp(cerca, k); mira.copy(s.centro).lerp(s.ancla, k);
      // un giro lento alrededor de la pieza para que se vea en 3D
      var giro = Math.sin(t * 0.35) * 0.35, v = pos.clone().sub(mira); v.applyAxisAngle(new T.Vector3(0, 1, 0), giro * ph(t, 3, 6)); pos.copy(mira).add(v);
    },
    funciona: {
      anim: function (t, s, K) {
        var M = ASC.medidas, cy = kf(t % 16, [[0, 0], [5, 0], [8, M.FH], [11, M.FH], [14, 0]]);
        s.m.actualizar(cy); s.m.puertas(kf(t % 16, [[0, 0.9], [4, 0.9], [5, 0], [11, 0], [12, 0.9], [14, 0.9], [15, 0]]), Math.round(cy / M.FH));
        if (s.p) { K.marcar(s.p.miembros, K.parpadeo(t, 0.8) ? 'foco' : null); K.rotulo(nombre(s.p.id), s.ancla); }
      }
    },
    falla: {
      anim: function (t, s, K) {
        var M = ASC.medidas, cy = kf(t, [[0, 0], [1.5, 0], [3, M.FH * 0.45]]);
        s.m.actualizar(cy); s.m.puertas(0, 0);
        if (s.p) { K.marcar(s.p.miembros, K.parpadeo(t, 2) ? 'mal' : null); K.rotulo(nombre(s.p.id), s.ancla); }
        if (t > 3) K.aviso('Ascensor detenido');
      }
    }
  });
  function nombre(id) { return (ASC.partes[id] && ASC.partes[id].nombre) || (ASC.cat[id] && ASC.cat[id].n) || id; }
  V3.nombre = nombre;

  // ---------- instancia de una escena (su propia escena three, cámara y estado) ----------
  function instancia(id, op) {
    var clave = V3.de[id] || 'ascensor', def = V3.escenas[clave] || V3.escenas.ascensor;
    var sc = new T.Scene(); luces(sc);
    var K = kit(sc), s;
    try { s = def.construir(K, id, op || {}) || {}; }
    catch (e) { if (window.console) console.warn('escena 3D ' + clave, e); def = V3.escenas.ascensor; sc = new T.Scene(); luces(sc); K = kit(sc); s = def.construir(K, id, op || {}); clave = 'ascensor'; }
    var caps;
    if (def.caps) caps = def.caps(id, s);
    else {
      caps = ['funciona', 'falla'].map(function (n) {
        var c = def[n] || {}, subt = typeof c.subt === 'function' ? c.subt(id) : c.subt;
        if (!subt || !subt.length) { var tt = tiempos(frasesSimples(id)[n], c.dur || 10); return { subt: tt.subt, dur: Math.max(c.dur || 0, tt.dur) }; }
        return { subt: subt, dur: c.dur || (subt[subt.length - 1][0] + 6) };
      });
    }
    var cam = new T.PerspectiveCamera(def.fov || 34, 16 / 9, 0.01, 200);
    return { id: id, clave: clave, def: def, sc: sc, K: K, s: s, cam: cam, caps: caps };
  }
  function liberar(I) {
    if (!I) return;
    var fijas = I.K.ignorar ? I.K.ignorar.raiz : null;
    I.sc.traverse(function (o) {
      if (o.geometry && !o.geometry.userData.fija) {
        var dentro = false; if (fijas) for (var a = o; a; a = a.parent) if (a === fijas) { dentro = true; break; }
        if (!dentro) o.geometry.dispose();
      }
    });
    I.K.mats.forEach(function (m) { if (m.map) m.map.dispose(); m.dispose(); });
  }

  var tmpP = new T.Vector3(), tmpM = new T.Vector3(), tmpV = new T.Vector3();
  // pone la cámara y anima la escena en el tiempo lt del capítulo c
  function cuadro(I, c, lt, orb) {
    var def = I.def, nom = c ? 'falla' : 'funciona', ch = def[nom] || {};
    var K = I.K; K._rot = []; K._tabla = null; K._aviso = null;
    if (ch.anim) ch.anim(lt, I.s, K, I.id);
    if (def.camara) def.camara(I.s, c, lt, I.caps[c].dur, tmpP, tmpM);
    else if (ch.cam) { kfv(lt, ch.cam.map(function (k) { return [k[0], k[1]]; }), tmpP); kfv(lt, ch.cam.map(function (k) { return [k[0], k[2]]; }), tmpM); }
    else { tmpP.set(1.2, 0.9, 1.6); tmpM.set(0, 0.3, 0); }
    if (orb && (orb.yaw || orb.pitch)) {   // giro que hace el usuario arrastrando
      tmpV.copy(tmpP).sub(tmpM);
      tmpV.applyAxisAngle(new T.Vector3(0, 1, 0), orb.yaw);
      var eje = new T.Vector3().crossVectors(tmpV, new T.Vector3(0, 1, 0)).normalize();
      if (eje.lengthSq() > 0.5) { var p0 = tmpV.clone().applyAxisAngle(eje, orb.pitch); if (Math.abs(p0.clone().normalize().y) < 0.97) tmpV.copy(p0); }
      tmpP.copy(tmpM).add(tmpV);
    }
    I.cam.position.copy(tmpP); I.cam.lookAt(tmpM);
  }

  // dibuja rótulos, tabla y aviso sobre el video (HTML, para que se lean bien)
  function capaHTML(capa, I, w, h) {
    var K = I.K, html = '', v = new T.Vector3();
    K._rot.forEach(function (r) {
      var d = r.d;
      if (Array.isArray(d)) v.set(d[0], d[1], d[2]);
      else if (d && d.isVector3) v.copy(d);
      else if (d && d.isObject3D) { d.updateWorldMatrix(true, false); v.setFromMatrixPosition(d.matrixWorld); }
      else return;
      v.project(I.cam);
      if (v.z > 1 || Math.abs(v.x) > 1.02 || Math.abs(v.y) > 1.02) return;
      var x = (v.x * 0.5 + 0.5) * w, y = (-v.y * 0.5 + 0.5) * h, izq = r.lado === 'izq' || (r.lado !== 'der' && x > w * 0.72);
      if (izq && x < w * 0.3) izq = false; else if (!izq && x > w * 0.8) izq = true;   // que no se corte en el borde
      html += '<span class="v3-rot' + (izq ? ' izq' : '') + '" style="left:' + x.toFixed(1) + 'px;top:' + y.toFixed(1) + 'px">' + esc(r.t) + '</span>';
    });
    if (K._tabla) html += '<div class="v3-tabla">' + K._tabla.map(function (f) { return '<div><span>' + esc(f[0]) + '</span><b class="' + (f[2] || '') + '">' + esc(f[1]) + '</b></div>'; }).join('') + '</div>';
    if (K._aviso) html += '<p class="v3-aviso' + (K._aviso.malo ? ' mal' : ' ok') + '">' + esc(K._aviso.t) + '</p>';
    if (capa._html !== html) { capa._html = html; capa.innerHTML = html; }
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* Motor que usa el reproductor: { caps, montar(pantalla), dibujar(c, lt), reclamar(), soltar(), destruir() } */
  V3.motor = function (id, op) {
    if (!ASC.cat[id] || !renderer()) return null;
    var I = null, pantalla = null, ranura = null, capa = null, poster = null, orb = { yaw: 0, pitch: 0 }, ultimo = null;
    function asegurar() { if (!I) I = instancia(id, op); return I; }
    var tmp = asegurar();
    var m = {
      tipo: '3d',
      caps: tmp.caps.map(function (c, i) { return { nombre: i ? 'Cómo falla' : 'Cómo funciona', dur: c.dur, subt: c.subt }; }),
      montar: function (p) {
        pantalla = p;
        p.insertAdjacentHTML('afterbegin', '<div class="v3-ranura"></div><img class="v3-poster" alt=""><div class="v3-capa" aria-hidden="true"></div><span class="v3-girar">Arrastra para girar</span>');
        ranura = p.querySelector('.v3-ranura'); capa = p.querySelector('.v3-capa'); poster = p.querySelector('.v3-poster'); poster.hidden = true;
        // arrastrar para girar la cámara
        var arr = null;
        p.addEventListener('pointerdown', function (e) { if (e.target.closest('button')) return; arr = { x: e.clientX, y: e.clientY, yaw: orb.yaw, pitch: orb.pitch }; try { p.setPointerCapture(e.pointerId); } catch (x) { /* nada */ } });
        p.addEventListener('pointermove', function (e) { if (!arr) return; orb.yaw = arr.yaw - (e.clientX - arr.x) * 0.008; orb.pitch = Math.max(-0.9, Math.min(0.9, arr.pitch - (e.clientY - arr.y) * 0.006)); if (m.redibujar) m.redibujar(); });
        var soltar = function () { arr = null; };
        p.addEventListener('pointerup', soltar); p.addEventListener('pointercancel', soltar);
        p.addEventListener('dblclick', function () { orb.yaw = 0; orb.pitch = 0; if (m.redibujar) m.redibujar(); });
      },
      reclamar: function () {
        var Rr = renderer(); if (!Rr || m.muerto) return false;
        vivos.slice().forEach(function (x) { if (x !== m && !x.conectada()) x.destruir(); });   // videos que ya no están en la página
        if (Rr.dueno && Rr.dueno !== m) Rr.dueno.soltar();
        Rr.dueno = m; ranura.appendChild(Rr.cv); poster.hidden = true;
        return true;
      },
      soltar: function () {
        var Rr = renderer();
        if (Rr && Rr.dueno === m) {
          try { poster.src = Rr.cv.toDataURL('image/png'); poster.hidden = false; } catch (e) { /* sin foto */ }
          Rr.dueno = null;
        }
        if (m.alSoltar) m.alSoltar();
      },
      conectada: function () { return !!(pantalla && pantalla.isConnected); },
      esDueno: function () { var Rr = renderer(); return !!(Rr && Rr.dueno === m); },
      dibujar: function (c, lt) {
        var Rr = renderer(); if (!Rr || m.muerto) return;
        if (Rr.dueno !== m) { if (!m.reclamar()) return; }
        asegurar();
        var w = ranura.clientWidth || 480, h = Math.round(w * 9 / 16), dpr = Math.min(2, window.devicePixelRatio || 1);
        if (Rr.cv.width !== Math.round(w * dpr) || Rr.cv.height !== Math.round(h * dpr)) { Rr.r.setPixelRatio(dpr); Rr.r.setSize(w, h, false); }
        I.cam.aspect = w / h; I.cam.updateProjectionMatrix();
        try { cuadro(I, c, lt, orb); } catch (e) { if (window.console) console.warn(e); }
        Rr.r.render(I.sc, I.cam);
        capaHTML(capa, I, w, h);
        ultimo = [c, lt];
      },
      destruir: function () {
        if (m.muerto) return; m.muerto = true;
        var i = vivos.indexOf(m); if (i >= 0) vivos.splice(i, 1);
        var Rr = renderer(); if (Rr && Rr.dueno === m) Rr.dueno = null;
        liberar(I); I = null;
      }
    };
    vivos.push(m);
    m.redibujar = function () { if (ultimo && m.esDueno()) m.dibujar(ultimo[0], ultimo[1]); };
    return m;
  };

  // ---------- miniaturas para las tarjetas de repuestos (otro renderer chico, con caché) ----------
  var RM = null, fotos = {}, cola = [], ocupado = false;
  V3.miniatura = function (id, cb, op) {
    if (fotos[id]) { cb(fotos[id]); return; }
    cola.push({ id: id, cb: cb, op: op });
    if (!ocupado) siguiente();
  };
  function siguiente() {
    var j = cola.shift(); if (!j) { ocupado = false; return; }
    ocupado = true;
    setTimeout(function () {
      try {
        if (!RM) { var cv = document.createElement('canvas'); RM = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, preserveDrawingBuffer: true }); RM.outputEncoding = T.sRGBEncoding; RM.setClearColor(0, 0); RM.setSize(320, 180, false); }
        if (!fotos[j.id]) {
          var I = instancia(j.id, j.op); I.cam.aspect = 16 / 9; I.cam.updateProjectionMatrix();
          var tp = I.def.poster != null ? I.def.poster : Math.min(5, I.caps[0].dur * 0.4);
          cuadro(I, 0, tp, null); RM.render(I.sc, I.cam);
          fotos[j.id] = RM.domElement.toDataURL('image/png'); liberar(I);
        }
        j.cb(fotos[j.id]);
      } catch (e) { j.cb(null); }
      siguiente();
    }, 30);
  }
  V3.tiene = function (id) { return !!V3.de[id]; };
})();
