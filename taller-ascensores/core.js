/* Taller de Ascensores — núcleo: espacio de nombres, equipos por marca y catálogo de partes.
   Los archivos contenido-*.js solo llaman a ASC.def(id, {...}) y rellenan ASC.marcas, ASC.tipos, etc. */
window.ASC = {
  partes: {},
  def: function (id, datos) { this.partes[id] = Object.assign(this.partes[id] || {}, datos); },
  tipos: {},        // textos por tipo de ascensor (mrl, mr, hid)
  marcas: [],       // Otis, Schindler, MoviLift
  guia: [],         // recorrido de campo
  sintomas: [],     // síntoma -> partes a revisar
  seguridades: [],  // microswitches de la serie de seguridades
  glosario: {},     // siglas y nombres propios por marca
  normas: [],
  fuentes: []
};

ASC.tipoIds = ['mrl', 'mr', 'hid'];
ASC.tipoNombre = {
  mrl: 'Sin cuarto de máquinas',
  mr: 'Con cuarto de máquinas',
  hid: 'Hidráulico'
};

/* Un ascensor de práctica por marca. base = arquitectura; espejo = el contrapeso y el tablero van al otro lado.
   nombres = cómo se llama cada pieza en ese equipo (lo demás usa el nombre general). */
ASC.equipoIds = ['otis', 'schindler', 'movilift', 'clasico'];
ASC.equipos = {
  otis: {
    base: 'mrl', marca: 'otis', nombre: 'Otis Gen2', espejo: false,
    placa: ['Otis Gen2 · sin cuarto de máquinas', 'fajas planas de acero y poliuretano · suspensión 2:1', '1,0 m/s'],
    nombres: {
      cables_traccion: 'Fajas de tracción', maquina: 'Máquina gearless', polea_traccion: 'Polea lisa de tracción',
      tablero_control: 'Controlador del último piso', variador: 'Variador ReGen', monitor_fajas: 'Monitor de fajas Pulse',
      posicionamiento: 'Sensores de nivelación y pantallas', poleas_cabina: 'Poleas bajo cabina', amarres: 'Amarres de fajas'
    }
  },
  schindler: {
    base: 'mrl', marca: 'schindler', nombre: 'Schindler 3300', espejo: true,
    placa: ['Schindler 3300 · sin cuarto de máquinas', 'fajas STM · suspensión 2:1', '1,0 m/s'],
    nombres: {
      cables_traccion: 'Fajas STM', maquina: 'Máquina FMB130', tablero_control: 'Armario de control Bionic', variador: 'Variador ACVF',
      monitor_fajas: 'Monitor de fajas STM', posicionamiento: 'Fotocélulas PHS, banderas e imanes', limitador: 'Limitador GBP 201',
      paracaidas: 'Paracaídas GED', operador_puertas: 'Operador Varidor 15', caja_techo: 'Unidad de cabina CCU',
      pesacargas: 'Pesacargas CLC', emergencia: 'Luz de emergencia y telealarma ETMA', amarres: 'Amarres de fajas'
    }
  },
  movilift: {
    base: 'hid', marca: 'movilift', nombre: 'MoviLift hidráulico', espejo: false,
    placa: ['MoviLift · hidráulico de tiro indirecto', 'pistón lateral · suspensión 2:1 · tablero con placa BR200', '0,6 m/s'],
    nombres: {
      tablero_control: 'Tablero con placa BR200', posicionamiento: 'Lápices magnéticos e imanes', pesacargas: 'Pesacargas Kilo System',
      rescate: 'Rescate a baterías', cortina_luminosa: 'Cortina luminosa multi-haz'
    }
  },
  clasico: {
    base: 'mr', marca: null, nombre: 'Clásico con cuarto de máquinas', espejo: false,
    placa: ['Clásico de cables · con cuarto de máquinas', 'máquina con reductor · suspensión 1:1', '1,0 m/s'],
    nombres: { posicionamiento: 'Inductores y pantallas', rodaderas: 'Rodaderas (rolos guía)' }
  }
};
ASC.base = function (t) { return (ASC.equipos[t] && ASC.equipos[t].base) || t; };

ASC.zonas = {
  maquinas: 'Máquina y control',
  hueco: 'Hueco',
  cabina: 'Cabina',
  puertas: 'Puertas',
  foso: 'Foso',
  hidraulico: 'Equipo hidráulico'
};

/* Catálogo. Orden = orden sugerido de armado.
   n: nombre corto por defecto · z: zona · t: tipos donde existe · dep: partes que deben estar puestas antes
   e: 1 si entra en el armado esencial · m: qué muestra el modelo 3D (nota interna para quien redacta) */
ASC.catalogo = [
  { id: 'guias_cabina', n: 'Guías de cabina', z: 'hueco', t: ['mrl', 'mr', 'hid'], e: 1, m: 'dos perfiles T de acero de piso a techo del hueco; en el hidráulico las dos van del mismo lado' },
  { id: 'fijaciones', n: 'Fijaciones y empalmes de guía', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['guias_cabina'], m: 'soportes (brackets) que unen la guía al muro cada 1.5 m aprox. y las platinas de empalme entre tramos' },
  { id: 'guias_contrapeso', n: 'Guías de contrapeso', z: 'hueco', t: ['mrl', 'mr'], m: 'dos perfiles T más pequeños por donde corre el contrapeso' },
  { id: 'iluminacion_hueco', n: 'Iluminación del hueco', z: 'hueco', t: ['mrl', 'mr', 'hid'], m: 'luminarias repartidas a lo alto del hueco, con su interruptor' },
  { id: 'gancho_izaje', n: 'Gancho de izaje', z: 'hueco', t: ['mrl', 'mr', 'hid'], m: 'gancho o viga en lo más alto, marcado con su carga, que sirve para izar la máquina y las piezas pesadas' },
  { id: 'amortiguadores', n: 'Amortiguadores', z: 'foso', t: ['mrl', 'mr', 'hid'], e: 1, m: 'en el piso del foso, bajo la cabina y bajo el contrapeso; de resorte en el modelo con cuarto de máquinas, de poliuretano en el MRL' },
  { id: 'contrapeso', n: 'Contrapeso', z: 'hueco', t: ['mrl', 'mr'], dep: ['guias_contrapeso'], e: 1, m: 'bastidor de acero relleno de pesas apiladas; al fondo en el modelo con cuarto de máquinas, al costado en el MRL (con polea encima por la suspensión 2:1)' },
  { id: 'pantalla_contrapeso', n: 'Pantalla del contrapeso', z: 'foso', t: ['mrl', 'mr'], dep: ['guias_contrapeso'], m: 'malla o plancha en el foso que separa el recorrido del contrapeso del lugar donde trabaja el técnico' },

  { id: 'maquina', n: 'Máquina de tracción', z: 'maquinas', t: ['mrl', 'mr'], e: 1, m: 'con cuarto de máquinas: motor + reductor sinfín-corona sobre bancada, con volante manual; MRL: máquina gearless compacta de imanes permanentes arriba del hueco, fijada a las guías' },
  { id: 'polea_traccion', n: 'Polea de tracción', z: 'maquinas', t: ['mrl', 'mr'], dep: ['maquina'], m: 'rueda acanalada en el eje de la máquina por donde pasan los cables o cintas' },
  { id: 'freno', n: 'Freno de la máquina', z: 'maquinas', t: ['mrl', 'mr'], dep: ['maquina'], m: 'tambor o disco con zapatas, resortes, bobina y palanca roja de apertura manual' },
  { id: 'micro_freno', n: 'Microswitches del freno', z: 'maquinas', t: ['mrl', 'mr'], dep: ['freno'], m: 'dos microswitches pequeños montados en el freno que le confirman al tablero que abrió y que cerró' },
  { id: 'encoder', n: 'Encoder', z: 'maquinas', t: ['mrl', 'mr'], dep: ['maquina'], m: 'sensor pequeño en la punta del eje del motor con su cable' },
  { id: 'polea_desvio', n: 'Polea de desvío', z: 'maquinas', t: ['mr'], m: 'polea loca bajo la losa del cuarto de máquinas que lleva los cables hacia el contrapeso' },

  { id: 'central_hidraulica', n: 'Central hidráulica', z: 'hidraulico', t: ['hid'], e: 1, m: 'tanque de aceite con motor y bomba sumergidos, en un cuarto aparte en planta baja' },
  { id: 'bloque_valvulas', n: 'Bloque de válvulas', z: 'hidraulico', t: ['hid'], dep: ['central_hidraulica'], m: 'sobre el tanque: bloque con electroválvulas, manómetro, llave de paso, pulsador de bajada manual y bomba de mano' },
  { id: 'piston', n: 'Pistón', z: 'hidraulico', t: ['hid'], e: 1, m: 'cilindro vertical al costado de la cabina, apoyado en el foso, con el vástago cromado que sale por arriba' },
  { id: 'polea_piston', n: 'Polea de cabeza de pistón', z: 'hidraulico', t: ['hid'], dep: ['piston'], m: 'polea montada en la punta del vástago; los cables pasan por encima (tiro indirecto 2:1)' },
  { id: 'valvula_rotura', n: 'Válvula paracaídas', z: 'hidraulico', t: ['hid'], dep: ['piston'], m: 'válvula de rotura atornillada en la entrada de aceite del cilindro, abajo' },
  { id: 'manguera', n: 'Manguera hidráulica', z: 'hidraulico', t: ['hid'], dep: ['central_hidraulica', 'piston'], m: 'manguera o tubería de alta presión entre el bloque de válvulas y el cilindro' },
  { id: 'recoge_aceite', n: 'Recolector de aceite', z: 'hidraulico', t: ['hid'], dep: ['piston'], m: 'aro en la boca del cilindro que junta el aceite que escurre por el vástago, con una manguerita hasta un recipiente en el foso' },

  { id: 'bastidor', n: 'Bastidor de cabina', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['guias_cabina'], e: 1, m: 'marco de acero que carga la cabina: largueros, cabezal superior e inferior; en el hidráulico es tipo mochila (en L, a un solo lado)' },
  { id: 'rozaderas', n: 'Rozaderas', z: 'cabina', t: ['mrl', 'hid'], dep: ['bastidor'], m: 'cuatro zapatas deslizantes en las esquinas del bastidor que abrazan la guía' },
  { id: 'rodaderas', n: 'Rodaderas', z: 'cabina', t: ['mr'], dep: ['bastidor'], m: 'guías de rodillos (rolos): tres ruedas con resorte por cada guía, en las cuatro esquinas del bastidor, en lugar de rozaderas deslizantes' },
  { id: 'aceiteras', n: 'Aceiteras', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['rozaderas', 'contrapeso'], m: 'vasitos con mecha de fieltro encima de las rozaderas de arriba (de la cabina y del contrapeso) que van mojando la guía con aceite' },
  { id: 'paracaidas', n: 'Paracaídas', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['bastidor'], e: 1, m: 'dos bloques con cuñas bajo el bastidor, uno por guía, unidos por una barra y una palanca que va al cable del limitador' },
  { id: 'contacto_paracaidas', n: 'Microswitch del paracaídas', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['paracaidas'], m: 'microswitch junto a la palanca del paracaídas que corta la maniobra cuando las cuñas actúan' },
  { id: 'cabina', n: 'Cabina', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['bastidor'], e: 1, m: 'plataforma, paneles, techo, pasamanos e iluminación' },
  { id: 'poleas_cabina', n: 'Poleas bajo cabina', z: 'cabina', t: ['mrl'], dep: ['bastidor'], m: 'dos poleas debajo del piso de la cabina por donde pasan las cintas (suspensión 2:1)' },
  { id: 'cables_traccion', n: 'Cables o cintas de tracción', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['maquina', 'piston', 'polea_piston', 'bastidor', 'contrapeso', 'poleas_cabina'], e: 1, m: 'con cuarto de máquinas: 4 cables de acero redondos 1:1; MRL: 3 cintas planas (fajas) 2:1 que pasan bajo la cabina; hidráulico: 2 cables que suben del anclaje a la polea del pistón y bajan al bastidor' },
  { id: 'amarres', n: 'Amarres de cable', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['cables_traccion'], m: 'terminales de los cables con varilla roscada, resorte y tuerca; en 1:1 van sobre el bastidor y el contrapeso, en 2:1 arriba en puntos fijos' },
  { id: 'monitor_fajas', n: 'Monitor de fajas', z: 'hueco', t: ['mrl'], dep: ['amarres'], m: 'caja electrónica conectada a los extremos de las fajas, en el amarre fijo de arriba, que vigila sus cordones de acero; al lado, el contacto de faja floja' },
  { id: 'cable_flojo', n: 'Contacto de cable flojo', z: 'hidraulico', t: ['hid'], dep: ['amarres'], m: 'microswitch en el amarre fijo de los cables, junto al pistón, que para el ascensor si un cable pierde tensión' },
  { id: 'cadena_compensacion', n: 'Cadena de compensación', z: 'hueco', t: ['mr'], dep: ['cabina', 'contrapeso'], m: 'cadena forrada que cuelga de debajo de la cabina, hace un lazo en el foso y sube al contrapeso' },

  { id: 'limitador', n: 'Limitador de velocidad', z: 'maquinas', t: ['mrl', 'mr', 'hid'], e: 1, m: 'polea pequeña con contrapesos centrífugos y un contacto eléctrico; en el cuarto de máquinas o arriba del hueco' },
  { id: 'polea_tensora', n: 'Polea tensora del limitador', z: 'foso', t: ['mrl', 'mr', 'hid'], m: 'polea con pesa en el foso que mantiene tenso el cable del limitador, con su contacto' },
  { id: 'cable_limitador', n: 'Cable del limitador', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['limitador', 'polea_tensora'], m: 'cable delgado en lazo cerrado entre el limitador y la polea tensora, amarrado a la palanca del paracaídas' },

  { id: 'puerta_piso', n: 'Puerta de piso', z: 'puertas', t: ['mrl', 'mr', 'hid'], e: 1, m: 'marco y dos hojas de apertura central en cada piso' },
  { id: 'cabezal_piso', n: 'Cabezal de puerta de piso', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['puerta_piso'], m: 'del lado del hueco, encima de la puerta: plancha con el riel y los carros de los que cuelgan las hojas' },
  { id: 'roldanas_puerta', n: 'Roldanas de puerta', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabezal_piso'], m: 'las ruedas (rolos) de los carros que corren sobre el riel, en puertas de piso y de cabina, y las contrarruedas chicas que van por debajo del riel' },
  { id: 'cable_sincronismo', n: 'Cable de sincronismo', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabezal_piso'], m: 'cable de acero delgado con una poleíta en cada extremo del cabezal, que une las dos hojas para que se muevan a la vez y en sentidos contrarios' },
  { id: 'pesa_cierre', n: 'Pesa de cierre', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabezal_piso'], m: 'pesa alargada colgada de un cordón al costado de cada puerta de piso (en otras marcas, un resorte) que la cierra sola cuando la cabina se va' },
  { id: 'cerradura', n: 'Cerradura de puerta de piso', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabezal_piso'], e: 1, m: 'enclavamiento con gancho, contacto eléctrico y dos ruedas que empuja el patín de la cabina; por el lado del hall, el agujero de la llave triangular' },
  { id: 'pisadera', n: 'Pisaderas', z: 'puertas', t: ['mrl', 'mr', 'hid'], m: 'umbrales de aluminio ranurados, uno en cada piso y otro en la cabina' },
  { id: 'guiadores_puerta', n: 'Guiadores de hoja', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['puerta_piso', 'pisadera'], m: 'piezas de plástico atornilladas bajo cada hoja que corren dentro de la ranura de la pisadera' },
  { id: 'puerta_cabina', n: 'Puerta de cabina', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'dos hojas que viajan con la cabina' },
  { id: 'operador_puertas', n: 'Operador de puertas', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], e: 1, m: 'sobre el techo de la cabina, al frente: motor, correa dentada, riel y caja electrónica' },
  { id: 'contacto_puerta_cabina', n: 'Microswitch de puerta de cabina', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['operador_puertas'], m: 'contacto en el cabezal del operador, con su puente en el carro de la hoja, que confirma que la puerta de cabina cerró' },
  { id: 'patin', n: 'Patín de arrastre', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['puerta_cabina'], m: 'dos pletinas verticales en la hoja de cabina, hacia el hueco, que atrapan las ruedas de la cerradura de piso' },
  { id: 'cortina_luminosa', n: 'Cortina luminosa', z: 'puertas', t: ['mrl', 'mr', 'hid'], dep: ['puerta_cabina'], e: 1, m: 'dos regletas delgadas a todo lo alto en los cantos de las hojas de cabina; entre ellas cruzan rayos infrarrojos' },
  { id: 'botonera_piso', n: 'Botonera de piso', z: 'puertas', t: ['mrl', 'mr', 'hid'], m: 'placa con el botón de llamada al lado de la puerta y el indicador encima' },

  { id: 'botonera_cabina', n: 'Botonera de cabina', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], e: 1, m: 'panel vertical dentro de la cabina con botones de piso, abrir/cerrar, alarma y pantalla' },
  { id: 'pesacargas', n: 'Pesacargas', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'sensor bajo el piso de la cabina con su caja electrónica' },
  { id: 'caja_inspeccion', n: 'Botonera de inspección', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'caja amarilla en el techo de cabina con seta roja de stop, selector normal/inspección y pulsadores subir/bajar' },
  { id: 'faldon', n: 'Faldón', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'plancha vertical bajo la pisadera de cabina con el borde inferior doblado' },
  { id: 'emergencia', n: 'Luz de emergencia y alarma', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'luminaria de emergencia en el techo, batería y sirena sobre la cabina, intercomunicador' },
  { id: 'caja_techo', n: 'Caja de conexiones de cabina', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'caja gris sobre el techo de cabina donde se juntan el cable viajero, el operador, la cortina, los sensores y la botonera' },
  { id: 'baranda_techo', n: 'Baranda de techo de cabina', z: 'cabina', t: ['mrl', 'mr', 'hid'], dep: ['cabina'], m: 'baranda amarilla en el borde del techo de cabina, del lado donde hay vacío, que protege al técnico' },

  { id: 'tablero_control', n: 'Tablero de control', z: 'maquinas', t: ['mrl', 'mr', 'hid'], e: 1, m: 'gabinete con la maniobra; en el cuarto de máquinas, o en el marco de la puerta del último piso en el MRL, o junto a la central en el hidráulico' },
  { id: 'variador', n: 'Variador de frecuencia', z: 'maquinas', t: ['mrl', 'mr'], dep: ['tablero_control'], m: 'caja con disipador y ventilador que le da fuerza al motor y regula su velocidad: en el MRL va arriba del hueco, cerca de la máquina; en el clásico, en el cuarto de máquinas junto al tablero' },
  { id: 'cables_motor', n: 'Cables del motor', z: 'maquinas', t: ['mrl', 'mr'], dep: ['maquina', 'variador'], m: 'cable grueso de fuerza entre el variador y el motor, y los cables delgados del encoder y del freno' },
  { id: 'interruptor_principal', n: 'Interruptor principal', z: 'maquinas', t: ['mrl', 'mr', 'hid'], m: 'caja con manija de corte general, bloqueable con candado' },
  { id: 'rescate', n: 'Rescate automático', z: 'maquinas', t: ['mrl', 'mr', 'hid'], dep: ['tablero_control'], m: 'gabinete de baterías junto al tablero que lleva la cabina al piso más cercano si se va la luz' },
  { id: 'cable_viajero', n: 'Cable viajero', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['cabina', 'tablero_control'], m: 'cable plano que cuelga en U desde una caja a media altura del hueco hasta debajo de la cabina' },
  { id: 'cableado_hueco', n: 'Cableado del hueco', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['tablero_control'], m: 'canaleta vertical a lo largo del hueco con una caja de conexiones por piso; lleva la serie de puertas, las botoneras y las señales hasta el tablero' },
  { id: 'finales_carrera', n: 'Finales de carrera', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['guias_cabina'], m: 'interruptores con palanca de rueda cerca de los extremos del recorrido y la leva que los acciona en la cabina' },
  { id: 'posicionamiento', n: 'Sensores de posición', z: 'hueco', t: ['mrl', 'mr', 'hid'], dep: ['guias_cabina', 'cabina'], m: 'marcas en cada piso y un lector en la cabina: pantallas metálicas con sensor en U (Otis y clásico), banderas con fotocélula e imanes de extremo (Schindler), o imanes con sensores magnéticos tipo lápiz (MoviLift)' },
  { id: 'stop_foso', n: 'Stop y escalera de foso', z: 'foso', t: ['mrl', 'mr', 'hid'], m: 'caja con seta roja cerca de la puerta del piso más bajo y escalera amarilla para bajar al foso' }
];

ASC.cat = {};
ASC.catalogo.forEach(function (c) { ASC.cat[c.id] = c; });
// acepta un tipo (mrl, mr, hid) o un equipo (otis, schindler, movilift, clasico)
ASC.delTipo = function (t) {
  var b = ASC.base(t);
  return ASC.catalogo.filter(function (c) { return c.t.indexOf(b) >= 0; });
};
