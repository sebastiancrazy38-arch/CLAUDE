/* Taller de Ascensores: fichas de puertas y equipo hidraulico (15 partes). */

ASC.def("puerta_piso", {
  "nombre": "Puerta de piso",
  "alias": ["puerta de pasillo", "puerta de hall", "puerta exterior"],
  "ingles": "landing door",
  "resumen": "La puerta que ves desde el pasillo en cada piso; tapa el hueco cuando la cabina no está.",
  "queHace": "Cierra el hueco para que nadie pueda caer ni meter la mano mientras la cabina está en otro piso. Motor propio no lleva: la abre y la cierra la puerta de cabina, que la engancha al llegar. Cuando la cabina se va, se cierra sola con una pesa o un resorte y queda trabada con su cerradura.",
  "dondeVa": "Hay una en cada piso, en el muro del frente del hueco. Desde el pasillo ves el marco y las hojas; todo el mecanismo queda escondido del lado del hueco.",
  "porTipo": {
    "mr": "Igual en todos los pisos; en el modelo son dos hojas que se abren desde el centro.",
    "mrl": "Igual, salvo la del último piso, que en el modelo lleva el tablero de control metido en el marco.",
    "hid": "La misma puerta; en edificios bajos y antiguos todavía vas a ver puertas batientes manuales, que se jalan como la de un cuarto."
  },
  "pista": "Tapa el hueco en cada piso y se abre solo cuando llega la cabina.",
  "comoReconocer": [
    "Marco de acero inoxidable o pintado, de unos 2 metros de alto y 80 o 90 cm de paso, empotrado en el muro del pasillo.",
    "Dos hojas de plancha que se juntan al centro, o dos que corren hacia el mismo lado (telescópicas).",
    "Las hojas cuelgan de arriba; abajo solo van guiadas por la ranura de la pisadera.",
    "Por fuera no tiene manija; arriba, en el marco o en la hoja, hay un agujerito triangular para la llave del técnico.",
    "En ascensores antiguos puede ser batiente, con bisagras, manija y una ventanita de vidrio."
  ],
  "fallas": [
    { "sintoma": "La puerta de un piso cierra, rebota y vuelve a abrir varias veces.", "causa": "Basura en la ranura de la pisadera o una hoja golpeada que roza con el marco.", "revisar": "Que la ranura de abajo esté limpia y que la hoja no tenga abolladuras ni marcas de roce." },
    { "sintoma": "El ascensor se queda parado siempre en el mismo piso, con la puerta a medio cerrar.", "causa": "La hoja no llega al final, la cerradura no engancha y el control no deja salir a la cabina.", "revisar": "Si pasa solo en ese piso. El técnico revisa la puerta y la cerradura de ese nivel." },
    { "sintoma": "La hoja se mueve o suena cuando la empujas con la mano desde el pasillo.", "causa": "Guiadores de abajo gastados o salidos de la ranura, muchas veces por golpes de carritos o mudanzas.", "revisar": "El juego de la hoja en la parte baja. Si baila bastante, avisa a mantenimiento antes de seguir usando el ascensor." },
    { "sintoma": "Rayones parejos en la hoja o chirrido al abrir.", "causa": "Hoja descuadrada que roza contra el marco o contra la otra hoja.", "revisar": "La separación entre hojas y marco: debe verse pareja de arriba a abajo." }
  ],
  "seguridad": "Una puerta de piso que se abre sin la cabina detrás es la falla más peligrosa de un ascensor. Si ves una abierta o que cede al empujarla, no te asomes: bloquea el paso y llama al técnico.",
  "marcas": {
    "otis": "En el Gen2 Comfort para Latinoamérica las puertas se llaman Slim y Prima, y vienen en apertura lateral o central.",
    "schindler": "En sus catálogos el tipo de puerta figura como T2 (telescópica, dos hojas hacia el mismo lado) o C2 (apertura central). Schindler señala al sistema de puertas como lo que más paradas y visitas de mantenimiento causa.",
    "movilift": "MoviLift ofrece sus ascensores con puertas automáticas o batientes, así que en un equipo de esta marca puedes encontrar cualquiera de las dos."
  },
  "dato": "Entre las hojas y el marco la norma europea admite como máximo 6 mm de luz, para que no entre un dedo."
});

ASC.def("cabezal_piso", {
  "nombre": "Cabezal de puerta de piso",
  "alias": ["mecanismo de puerta de piso", "colgador", "riel de puerta"],
  "ingles": "landing door hanger",
  "resumen": "El mecanismo escondido sobre cada puerta de piso, del que cuelgan y por donde corren las hojas.",
  "queHace": "Sostiene las hojas, que cuelgan de unos carros con ruedas y corren por un riel. Un cable delgado o una correa une las dos hojas para que se muevan juntas: si una avanza, la otra hace lo mismo hacia el otro lado. Una pesa colgada o un resorte las jala para que se cierren solas cuando la cabina las suelta.",
  "dondeVa": "Encima de cada puerta de piso, por el lado del hueco. Desde el pasillo no se ve porque queda detrás del dintel del marco.",
  "porTipo": {
    "mr": "Uno por piso, todos iguales.",
    "mrl": "Uno por piso; en el último, el tablero de control baja por el marco justo al costado.",
    "hid": "Uno por piso; si la puerta es batiente manual este mecanismo no existe y solo hay bisagras y cerradura."
  },
  "pista": "Riel con carros de ruedas, escondido encima de la puerta, del lado del hueco.",
  "comoReconocer": [
    "Plancha de acero doblada, casi el doble de ancha que el paso de la puerta y de unos 20 a 30 cm de alto.",
    "Un riel horizontal y dos carros con ruedas de plástico duro de unos 5 a 7 cm.",
    "Debajo del riel, unas ruedas más chicas (contrarruedas) que evitan que la hoja se levante y se salga.",
    "Un cable de acero delgado que une los dos carros pasando por poleítas en los extremos, y una pesa alargada que baja por un tubo.",
    "Solo se ve desde el hueco: lo revisa el técnico desde el techo de la cabina."
  ],
  "fallas": [
    { "sintoma": "La puerta de un piso suena a tac-tac-tac, como rueda cuadrada, al abrir y cerrar.", "causa": "Ruedas de los carros gastadas, con un plano o con el rodamiento malogrado.", "revisar": "Si el ruido es solo en ese piso. El técnico mira el estado de las ruedas y del riel." },
    { "sintoma": "La puerta de piso no termina de cerrarse sola y queda una rendija.", "causa": "Riel sucio, pesa de cierre trabada o resorte vencido.", "revisar": "Limpieza del riel y que la pesa suba y baje libre." },
    { "sintoma": "Una hoja se mueve y la otra se queda o llega tarde.", "causa": "Cable de sincronismo flojo, deshilachado o salido de su polea.", "revisar": "Tensión y estado del cable entre los dos carros." },
    { "sintoma": "La hoja cuelga torcida y roza abajo contra la pisadera.", "causa": "Carros desregulados o contrarruedas flojas.", "revisar": "Altura de la hoja respecto a la pisadera y ajuste de los carros." }
  ],
  "seguridad": "Está dentro del hueco. Su limpieza y regulación se hacen desde el techo de la cabina y son trabajo de personal técnico capacitado.",
  "marcas": {
    "schindler": "El manual del 3300 lista la suciedad en hojas y rieles entre las causas de que la puerta no cierre o no abra a tiempo."
  },
  "dato": "La pesa de cierre está ahí por norma: una puerta de piso debe cerrarse sola si por cualquier motivo queda abierta sin la cabina delante."
});

ASC.def("cerradura", {
  "nombre": "Cerradura de puerta de piso",
  "alias": ["enclavamiento", "chapa", "cerrojo", "gancho"],
  "ingles": "landing door interlock",
  "resumen": "Traba la puerta de piso y avisa al control que cerró; sin esa señal el ascensor no se mueve.",
  "queHace": "Un gancho de acero cae y traba la hoja cuando la puerta termina de cerrar. Recién cuando el gancho entró bien, un contacto eléctrico se cierra y completa la serie de seguridades; si falta el contacto de una sola puerta, la cabina no arranca. Para abrir, el patín de la cabina empuja las dos ruedas de la cerradura, el gancho se levanta y la hoja queda libre para moverse.",
  "dondeVa": "En el cabezal de cada puerta de piso, por el lado del hueco, montada sobre el carro de una de las hojas. Desde el pasillo solo ves el agujero triangular de la llave de emergencia, en la parte alta del marco o de la hoja.",
  "porTipo": {
    "mr": "Una por puerta; su contacto llega al tablero del cuarto de máquinas dentro de la serie de puertas.",
    "mrl": "Una por puerta; la serie de puertas termina en el tablero del marco del último piso.",
    "hid": "Una por puerta; si la puerta es batiente, la cerradura va al costado del marco y la destraba una leva de la cabina."
  },
  "pista": "Gancho con dos ruedas y un contacto eléctrico, sobre cada puerta de piso.",
  "comoReconocer": [
    "Caja o platina del tamaño de una mano, montada en el carro de una de las hojas.",
    "Un gancho de acero que encaja en un tope fijo.",
    "Dos ruedas de goma o plástico, una al lado de la otra, que sobresalen hacia el hueco.",
    "Un contacto eléctrico con sus cables, casi siempre con tapa transparente o negra.",
    "Desde el pasillo lo único visible es el agujero triangular de la llave."
  ],
  "fallas": [
    { "sintoma": "El ascensor no sale de un piso, o se detiene de golpe entre pisos y luego sigue.", "causa": "Contacto de la cerradura sucio, gastado o desregulado, que corta la serie de seguridades por un instante.", "revisar": "En qué piso pasa. El técnico mira en el tablero qué puerta abre la serie y revisa ese contacto." },
    { "sintoma": "La puerta de un piso no abre aunque la cabina ya llegó.", "causa": "El patín no agarra bien las ruedas de la cerradura, por desregulación o por ruedas gastadas.", "revisar": "Alineación entre el patín y las ruedas en ese piso." },
    { "sintoma": "Golpe seco o traqueteo cuando la cabina pasa por un piso sin parar.", "causa": "Las ruedas de la cerradura rozan el patín porque quedaron fuera de posición.", "revisar": "La separación entre ruedas y patín: la cabina debe pasar libre." },
    { "sintoma": "La puerta de piso se puede correr a mano desde el pasillo sin que esté la cabina.", "causa": "El gancho no traba: cerradura rota, floja o mal regulada.", "revisar": "Nada por tu cuenta. Bloquea el paso, pide que dejen el ascensor fuera de servicio y llama al técnico." }
  ],
  "seguridad": "Es una de las seguridades más importantes del ascensor: nunca se puentea ni se traba. La llave triangular es solo para personal técnico capacitado y para rescates.",
  "marcas": {
    "schindler": "En el 3300, la pantalla del control Bionic tiene un indicador llamado IRTS: si aparece abierto, hay por lo menos una puerta de piso abierta (contacto KTS).",
    "movilift": "La placa BR200 vigila los cerrojos en la entrada CS. Si tras 4 intentos de cierre la serie no se completa, marca un error con el número del piso (por ejemplo ERR 05 para el piso 5)."
  },
  "dato": "La norma europea pide que el gancho entre por lo menos 7 mm antes de que el contacto dé la señal de puerta cerrada."
});

ASC.def("pisadera", {
  "nombre": "Pisaderas",
  "alias": ["umbral", "solera", "sill"],
  "ingles": "door sill",
  "resumen": "Los umbrales de aluminio con ranura por donde pisas al entrar y que guían las hojas por abajo.",
  "queHace": "Hacen dos trabajos. Aguantan el peso de la gente, los coches de bebé y los carritos que entran y salen. Y su ranura guía por abajo a las hojas, que llevan unas piezas de plástico (guiadores) metidas ahí para no bambolearse.",
  "dondeVa": "Hay una al pie de cada puerta de piso y otra en el borde de la cabina. Cuando el ascensor para bien, las dos quedan al mismo nivel, separadas por una rendija de unos 3 cm por donde se ve el hueco.",
  "porTipo": {
    "mr": "En equipos antiguos sin variador es donde más se nota el escalón entre la pisadera de cabina y la del piso.",
    "mrl": "Con variador y máquina sin reductor la cabina suele parar a ras, con pocos milímetros de diferencia.",
    "hid": "Fíjate si la cabina queda un poco baja y luego sube sola a ras: el hidráulico renivela cuando el aceite se enfría o hay una fuga pequeña."
  },
  "pista": "Perfil de aluminio con ranura en el suelo: uno por piso, otro en cabina.",
  "comoReconocer": [
    "Perfil de aluminio gris con estrías antideslizantes, del ancho de la puerta y de unos 6 a 9 cm de fondo.",
    "Una ranura a lo largo (dos si las hojas son telescópicas) de más o menos 1 cm de ancho.",
    "Entre la de cabina y la de piso, una rendija de unos 3 cm por donde se cae de todo: llaves, monedas, tarjetas.",
    "En montacargas es de fierro fundido o de acero, más gruesa y oscura.",
    "La ves desde el pasillo y desde la cabina con solo mirar al suelo cuando las puertas abren."
  ],
  "fallas": [
    { "sintoma": "La puerta no cierra y reabre una y otra vez.", "causa": "Ranura tapada con piedritas, tornillos, chicle o tierra.", "revisar": "Mira la ranura con una linterna. Si ves algo atascado, avisa a mantenimiento." },
    { "sintoma": "Queda un escalón entre la cabina y el piso y la gente se tropieza.", "causa": "Mala nivelación: sensores de piso desajustados, freno gastado o, en hidráulicos, pérdida de aceite.", "revisar": "Si pasa en todos los pisos o en uno solo, y si cambia con la cabina llena." },
    { "sintoma": "La hoja baila o suena a lata en la parte de abajo.", "causa": "Guiadores de plástico gastados o rotos dentro de la ranura.", "revisar": "El juego de la hoja abajo, con la puerta cerrada." },
    { "sintoma": "Pisadera hundida, floja o con el borde doblado.", "causa": "Golpes de carritos, transpaletas o mudanzas, o fijaciones sueltas.", "revisar": "Que no se mueva al pisarla y que siga a ras del piso terminado." }
  ],
  "seguridad": "Si se te cae algo por la rendija, no intentes sacarlo: va a parar al foso y lo recupera el técnico.",
  "marcas": {
    "otis": "El montacargas FOVF de Otis lleva umbrales de hierro fundido para aguantar carga rodante."
  },
  "dato": "La norma europea permite como máximo 35 mm de separación horizontal entre la pisadera de cabina y la de piso."
});

ASC.def("puerta_cabina", {
  "nombre": "Puerta de cabina",
  "alias": ["puerta interior", "puerta de carro", "hojas de cabina"],
  "ingles": "car door",
  "resumen": "Las hojas que viajan con la cabina; cierran el frente y arrastran a la puerta de cada piso.",
  "queHace": "Cierra la cabina durante el viaje para que nadie toque la pared del hueco que pasa por delante. La mueve el operador que está sobre el techo y, con su patín, engancha y abre la puerta del piso donde para. Tiene su propio contacto eléctrico: si no está bien cerrada, el ascensor no arranca.",
  "dondeVa": "En el frente de la cabina, viajando con ella. La ves desde adentro, y desde el pasillo aparece detrás de la puerta de piso cuando las dos abren juntas.",
  "porTipo": {
    "mr": "Dos hojas de apertura central en el modelo, colgadas del operador sobre el techo de la cabina.",
    "mrl": "Igual; en cabinas angostas es común la telescópica, con las dos hojas corriendo hacia el mismo lado.",
    "hid": "Igual; en equipos antiguos puede ser plegable tipo bus o una reja tijera manual."
  },
  "pista": "Dos hojas que viajan con los pasajeros y se abren al llegar.",
  "comoReconocer": [
    "Hojas de plancha de acero inoxidable o pintado, de unos 2 metros de alto, a veces con vidrio.",
    "En el canto donde se juntan llevan un jebe y las regletas de la cortina luminosa.",
    "Cuelgan del riel del operador, arriba, y abajo corren por la pisadera de cabina.",
    "Por el lado del hueco una hoja lleva el patín de arrastre, que desde adentro no se ve.",
    "Se distingue de la de piso porque se mueve contigo: es la que tienes al frente cuando vas adentro."
  ],
  "fallas": [
    { "sintoma": "Cierra, se detiene a medio camino y vuelve a abrir.", "causa": "Algo roza o hay suciedad en la pisadera de cabina, y el operador siente el esfuerzo como un obstáculo.", "revisar": "La ranura de la pisadera de cabina y que las hojas no rocen entre sí." },
    { "sintoma": "Las puertas cierran completas pero la cabina no arranca.", "causa": "Contacto de puerta de cabina sucio o desregulado.", "revisar": "El técnico verifica en el tablero si la serie de puertas quedó abierta." },
    { "sintoma": "Golpe fuerte al terminar de cerrar o de abrir.", "causa": "Velocidad o frenado del operador mal ajustados, o topes de jebe gastados.", "revisar": "Si el golpe se repite en todos los pisos, el problema viaja con la cabina." },
    { "sintoma": "Las hojas vibran o suenan durante el viaje.", "causa": "Guiadores de abajo gastados u hojas con juego.", "revisar": "El juego de las hojas en la parte baja con la puerta cerrada." }
  ],
  "seguridad": "Si te quedas adentro entre dos pisos, no intentes abrirla a la fuerza: del otro lado está la pared del hueco o el vacío. Toca la alarma y espera el rescate.",
  "marcas": {
    "otis": "El catálogo del Gen2 menciona un dispositivo que impide abrir las puertas de cabina cuando el ascensor está entre plantas.",
    "schindler": "Cuando la puerta no cierra o no abre a tiempo, el control Bionic del 3300 lo registra como error 0301 o 0302."
  },
  "dato": "Si entras a una cabina sin puerta, donde ves pasar el muro, estás en un ascensor muy antiguo: las normas actuales exigen puerta de cabina."
});

ASC.def("operador_puertas", {
  "nombre": "Operador de puertas",
  "alias": ["operador", "motor de puertas", "mecanismo de puertas"],
  "ingles": "door operator",
  "resumen": "El motor con su mecanismo, sobre la cabina, que abre y cierra las puertas en cada parada.",
  "queHace": "Un motor pequeño mueve una correa dentada que jala los carros de los que cuelgan las hojas de cabina. Su caja electrónica controla la velocidad: arranca suave, acelera y frena antes del tope. También mide la fuerza de cierre y, si la puerta choca con algo, la reabre. Como la puerta de cabina arrastra a la de piso, este único motor mueve las dos.",
  "dondeVa": "Sobre el techo de la cabina, al frente, justo encima de la puerta. Desde adentro no se ve; lo escuchas zumbar sobre tu cabeza cuando las puertas se mueven.",
  "porTipo": {
    "mr": "Mismo lugar; en equipos antiguos vas a ver operadores con motor, poleas, brazos y bielas en vez de correa dentada.",
    "mrl": "Mismo lugar; casi siempre es moderno, con electrónica propia y correa dentada.",
    "hid": "Mismo lugar; si la puerta de cabina es tipo bus, el operador es más chico y mueve las hojas plegables con brazos."
  },
  "pista": "Motor, correa dentada y caja electrónica al frente del techo de la cabina.",
  "comoReconocer": [
    "Viga o plancha horizontal tan ancha como el frente de la cabina, con un riel por donde corren los carros de las hojas.",
    "Un motor del tamaño de una lata de leche, o más chico, en un extremo.",
    "Una correa dentada negra, larga y angosta, que va de lado a lado entre dos poleas.",
    "Una caja electrónica con luces LED y a veces botoncitos o una pantallita para ajustarlo.",
    "Solo lo ve el técnico desde el techo de la cabina; tú lo reconoces por el zumbido al abrir y cerrar."
  ],
  "fallas": [
    { "sintoma": "Las puertas abren o cierran lentas, a tirones o con chirrido.", "causa": "Correa floja o gastada, riel sucio o ruedas de los carros malogradas.", "revisar": "Tensión de la correa y limpieza del riel del operador." },
    { "sintoma": "Las puertas no abren al llegar, en ningún piso.", "causa": "Operador sin alimentación, fusible quemado, tarjeta en falla o correa rota.", "revisar": "Si se oye al motor intentar. El técnico mira las luces y el código de la caja electrónica." },
    { "sintoma": "La puerta cierra con golpe o rebota al final.", "causa": "Recorrido, velocidad o fuerza mal programados; a veces pasa después de un corte de luz, cuando el operador pierde su ajuste.", "revisar": "Que el técnico repita el ajuste de recorrido del operador." },
    { "sintoma": "La puerta falla solo en un piso y en los demás trabaja bien.", "causa": "El problema está en la puerta de ese piso: cerradura, riel o pisadera.", "revisar": "Compara pisos: lo que falla en todos apunta a la cabina, lo que falla en uno apunta a ese piso." }
  ],
  "seguridad": "Está en el techo de la cabina, una zona a la que solo sube personal técnico capacitado.",
  "marcas": {
    "otis": "En el Gen2 Comfort latinoamericano los operadores se llaman DO2000 y AT120. El Glide es su operador de lazo cerrado, sin varillajes, que mide todo el tiempo la velocidad y la posición de la puerta.",
    "schindler": "En el 3300 es el Varidor 15: motor con electrónica integrada, correa dentada y un tecladito propio. Los contactos KET-S y KET-O sucios o desajustados están entre las causas típicas de error, y para modernizar Schindler Perú ofrece el operador MM430.",
    "movilift": "DOORINA es su tarjeta universal para operadores: maneja motores de 12 a 48 V de corriente continua, va sobre el techo de cabina y está pensada para modernizaciones. MoviLift no publica la marca del mecanismo."
  },
  "dato": "La norma europea limita la fuerza con que la puerta puede cerrar a 150 newtons, más o menos el empujón de 15 kilos."
});

ASC.def("patin", {
  "nombre": "Patín de arrastre",
  "alias": ["patín retráctil", "leva", "embrague de puertas", "clutch"],
  "ingles": "door clutch",
  "resumen": "Pletinas de la puerta de cabina que atrapan las ruedas de la cerradura y arrastran la puerta de piso.",
  "queHace": "Es el enganche entre las dos puertas. Mientras la cabina viaja, las pletinas pasan sin tocar las ruedas de las cerraduras. Al parar en un piso, el operador las mueve y atrapan las dos ruedas: ese apretón levanta el gancho de la cerradura y deja la hoja de piso agarrada para moverse junto con la de cabina. Según la marca, las pletinas se cierran sobre las ruedas o se abren entre ellas.",
  "dondeVa": "En la hoja de la puerta de cabina o en su carro, por el lado que mira al hueco. Queda a la altura de las ruedas de las cerraduras de piso, con pocos milímetros de separación.",
  "porTipo": {
    "mr": "Uno solo en la cabina, que sirve a las cerraduras de todos los pisos.",
    "mrl": "Igual: uno en la cabina; en puertas telescópicas va en la hoja que más recorre.",
    "hid": "Igual; con puertas de piso batientes lo reemplaza una leva retráctil que solo destraba la cerradura."
  },
  "pista": "Dos pletinas verticales en la hoja de cabina, mirando hacia el hueco.",
  "comoReconocer": [
    "Dos pletinas de acero paralelas y verticales, de unos 30 a 50 cm de largo, con las puntas dobladas en rampa.",
    "Van unidas por bielitas que las abren y cierran como un paralelogramo.",
    "Sobresalen de la hoja de cabina hacia el hueco, cerca de la parte alta.",
    "Brillan en la cara donde rozan las ruedas de las cerraduras.",
    "Desde el pasillo, con las puertas abiertas, a veces se alcanza a ver su canto entre la hoja de cabina y la de piso."
  ],
  "fallas": [
    { "sintoma": "La puerta de cabina abre pero la de piso se queda cerrada o abre a medias.", "causa": "El patín no agarra las ruedas: está desregulado, flojo o con una bielita rota.", "revisar": "Si pasa en todos los pisos apunta al patín; si es en uno solo, a las ruedas de esa cerradura." },
    { "sintoma": "Golpeteo metálico cuando la cabina pasa frente a las puertas de piso.", "causa": "El patín roza las ruedas de las cerraduras por falta de separación o porque la cabina tiene juego en las guías.", "revisar": "La holgura entre patín y ruedas, y el estado de las rozaderas de la cabina." },
    { "sintoma": "El ascensor se para en pleno viaje y vuelve a arrancar.", "causa": "El patín toca una rueda al pasar, mueve el gancho y abre la serie de seguridades por un instante.", "revisar": "En qué piso ocurre el corte. El técnico alinea esa cerradura con el patín." },
    { "sintoma": "La puerta de piso queda entreabierta cuando la cabina se va.", "causa": "El patín suelta tarde o no termina de cerrar la hoja de piso.", "revisar": "El ajuste de cierre del patín y la pesa de cierre de esa puerta." }
  ],
  "seguridad": "Trabaja pegado a las cerraduras, que son una seguridad. Su regulación es de milímetros y la hace personal técnico capacitado.",
  "marcas": {
    "schindler": "El manual del 3300 lista el elemento de arrastre roto entre las causas de que la puerta no abra o no cierre a tiempo."
  },
  "dato": "Por esta pieza la puerta de piso solo abre donde está la cabina: sin patín delante, nada empuja las ruedas de la cerradura."
});

ASC.def("cortina_luminosa", {
  "nombre": "Cortina luminosa",
  "alias": ["barrera infrarroja", "cortina de luz", "fotocélula", "sensor de puertas"],
  "ingles": "light curtain",
  "resumen": "Dos regletas en el borde de la puerta de cabina que reabren la puerta si algo cruza.",
  "queHace": "Una regleta emite rayos infrarrojos, que no se ven, y la otra los recibe. Los rayos cruzan la entrada a distintas alturas, desde casi el suelo hasta más de metro y medio. Si una persona, un coche de bebé o una bolsa corta alguno mientras la puerta cierra, el operador reabre de inmediato, sin llegar a tocarte.",
  "dondeVa": "En los cantos de las hojas de la puerta de cabina, una a cada lado de la entrada, a todo lo alto. En puertas telescópicas una va en la hoja y la otra en el marco fijo de la cabina.",
  "porTipo": {
    "mr": "Igual; en ascensores antiguos en su lugar hay una sola fotocélula a la altura de la rodilla o una banda mecánica que reabre al tocarla.",
    "mrl": "Viene de fábrica en casi todos; va en los cantos de las hojas de cabina.",
    "hid": "Igual que en los otros; en hidráulicos antiguos con puerta tipo bus suele haber solo una fotocélula."
  },
  "pista": "Regletas delgadas a todo lo alto del canto de las hojas de cabina.",
  "comoReconocer": [
    "Dos regletas negras o rojo oscuro, delgadas como un dedo y de casi 2 metros de alto.",
    "Cara lisa de plástico ahumado; a veces se ve una lucecita roja o verde en un extremo.",
    "De cada regleta sale un cable que sube hacia el techo de la cabina.",
    "Las ves desde el pasillo o desde adentro con la puerta abierta: mira el canto de las hojas.",
    "Prueba simple: cruza una carpeta por la entrada mientras cierra y la puerta debe reabrir sin tocarla."
  ],
  "fallas": [
    { "sintoma": "La puerta se queda abierta y no cierra, a veces con un pitido continuo.", "causa": "Regleta sucia, tapada con un sticker o una cinta, o desalineada por un golpe.", "revisar": "Que las dos caras estén limpias y sin nada pegado; se limpian con un paño seco." },
    { "sintoma": "La puerta cierra, reabre sola y repite varias veces sin que pase nadie.", "causa": "Cable de la regleta dañado por el vaivén de la hoja, o sol directo sobre el receptor.", "revisar": "El cable en la parte alta de la hoja y si la falla aparece a ciertas horas." },
    { "sintoma": "La puerta cierra aunque haya alguien en la entrada.", "causa": "Cortina anulada, desconectada o con rayos muertos.", "revisar": "No uses el ascensor así. Avisa a mantenimiento para que la repongan." },
    { "sintoma": "Después de varios intentos la puerta cierra despacio y pitando aunque algo estorbe.", "causa": "Es el cierre forzado, una función normal cuando la cortina lleva mucho rato interrumpida.", "revisar": "Qué está cortando los rayos: una caja, un trapeador o suciedad en la regleta." }
  ],
  "seguridad": "Es la protección contra el golpe de la puerta. Nunca se anula ni se tapa para que la puerta cierre más rápido.",
  "marcas": {
    "otis": "En el Gen2 es una pantalla de rayos infrarrojos con emisores y detectores en la entrada. El catálogo la lista como cortina de infrarrojos y da como alternativa una célula fotoeléctrica.",
    "schindler": "En el 3300 se llama cortina óptica: 8 haces de serie y 16 como opción. El control registra el error 0341 cuando la fotocélula queda tapada, por ejemplo con un sticker, y el 0304 tras 50 intentos de cierre abortados por un obstáculo.",
    "movilift": "Su cortina tiene 194 haces, cubre desde 23 mm hasta 1823 mm de altura y sus barras miden 9 por 30 mm de frente, con zumbador incorporado. En la placa BR200 el error 63 indica fotocélula o cortina siempre abierta en piso."
  },
  "dato": "Los rayos son infrarrojos, como los de un control remoto: tú no los ves, pero la cámara de algunos celulares los capta como puntitos."
});

ASC.def("botonera_piso", {
  "nombre": "Botonera de piso",
  "alias": ["botonera de hall", "botonera de pasillo", "llamador", "pulsador de llamada"],
  "ingles": "hall call station",
  "resumen": "La placa con el botón para llamar al ascensor, al lado de la puerta de cada piso.",
  "queHace": "Cuando aprietas el botón, manda la llamada al tablero de control y el botón se queda prendido hasta que llega la cabina. Puede tener un solo botón o dos, uno para subir y otro para bajar. El indicador muestra en qué piso está la cabina y hacia dónde va, y en algunos edificios la placa lleva además una llave para bomberos o para dejar el ascensor fuera de servicio.",
  "dondeVa": "En el muro del pasillo, al costado de la puerta de piso, a la altura de la mano. El indicador de posición va encima de la puerta o en la misma placa.",
  "porTipo": {
    "mr": "Una por piso; en edificios antiguos trae un solo botón y un foquito que avisa que el ascensor está ocupado.",
    "mrl": "Una por piso; en el último no la confundas con el tablero, que es la tapa alta y angosta con cerradura en el marco de la puerta.",
    "hid": "Una por piso; como son pocos pisos, casi siempre es de un solo botón."
  },
  "pista": "Plaquita con botón junto a cada puerta; la tocas antes de entrar.",
  "comoReconocer": [
    "Placa de acero inoxidable de unos 8 a 10 cm de ancho por 20 a 30 de alto, empotrada o sobrepuesta en el muro.",
    "Uno o dos botones redondos o cuadrados con aro de luz, a veces con braille.",
    "Encima de la puerta o en la misma placa, una pantallita con el número de piso y flechas.",
    "Puede traer una cerradura pequeña de llave para bomberos o servicio.",
    "Donde hay varios ascensores juntos, una sola botonera llama a todos."
  ],
  "fallas": [
    { "sintoma": "Aprietas, el botón no prende y el ascensor no llega.", "causa": "Pulsador gastado, cable suelto o tarjeta de piso malograda.", "revisar": "Si falla solo en ese piso: prueba llamar desde otro." },
    { "sintoma": "El botón prende pero la cabina nunca viene a ese piso.", "causa": "La llamada no llega al control por una falla de comunicación, o el ascensor está en servicio especial (mudanza, bomberos, inspección).", "revisar": "Si responde a llamadas de otros pisos y si alguien dejó girada una llave de servicio." },
    { "sintoma": "El botón queda prendido siempre, o el ascensor llega solo a ese piso sin que nadie llame.", "causa": "Pulsador pegado o hundido por suciedad o golpes.", "revisar": "Que el botón regrese al soltarlo y no esté trabado." },
    { "sintoma": "El indicador muestra un piso equivocado, rayas o está apagado.", "causa": "Pantalla quemada, o cabina que perdió la cuenta de pisos.", "revisar": "Si el indicador de cabina marca lo mismo: si los dos están mal, el problema es de posición." }
  ],
  "marcas": {
    "otis": "En el Arise la botonera de piso se llama HBP16. Donde hay Compass 360 marcas tu piso en un teclado táctil del hall y el sistema te dice qué cabina tomar.",
    "schindler": "Schindler llama LOP a la botonera de piso y LIP al indicador. La Linea 100 es de acero inoxidable con indicador de puntos LED rojos, y con PORT marcas tu piso en un terminal táctil del vestíbulo antes de entrar.",
    "movilift": "Sus botoneras son de acero inoxidable con pulsadores redondos Roma de 32 mm con braille. La Makalu va sobrepuesta al muro (23 mm de fondo) y la Flat Europa va empotrada."
  },
  "dato": "En el formato de reporte de fallas que usa SUNAT para sus ascensores Otis, botonera malograda e indicador quemado tienen casilla propia."
});

ASC.def("central_hidraulica", {
  "nombre": "Central hidráulica",
  "alias": ["unidad hidráulica", "grupo hidráulico", "tanque", "bomba"],
  "ingles": "hydraulic power unit",
  "resumen": "El tanque de aceite con motor y bomba que empuja el aceite hacia el pistón para subir la cabina.",
  "queHace": "Para subir, el motor hace girar la bomba y esta manda aceite a presión por la manguera hasta el pistón. Para bajar el motor ni se prende: una válvula se abre y el peso de la cabina devuelve el aceite al tanque. Por eso el hidráulico solo gasta electricidad de subida, y por eso suena fuerte al subir y casi nada al bajar.",
  "dondeVa": "En un cuarto pequeño o un armario metálico, casi siempre en el piso más bajo y cerca del hueco, aunque puede estar a varios metros. A su lado está el tablero de control.",
  "porTipo": {
    "hid": "Solo existe en el hidráulico, donde hace el papel de la máquina; en el modelo va en un cuarto aparte en la planta baja."
  },
  "pista": "Tanque de aceite con motor y bomba adentro, en un cuarto aparte.",
  "comoReconocer": [
    "Caja metálica rectangular, gris o azul, del tamaño de una lavadora o más grande, con tapa arriba.",
    "Encima lleva el bloque de válvulas con su manómetro, y de ahí sale la manguera negra gruesa.",
    "El motor y la bomba no se ven: van sumergidos dentro del aceite.",
    "A un costado, una mirilla o una varilla para ver el nivel de aceite.",
    "El cuarto huele a aceite y se siente tibio cuando el ascensor ha trabajado bastante."
  ],
  "fallas": [
    { "sintoma": "El ascensor sube lento, con zumbido fuerte, o no llega al último piso.", "causa": "Poco aceite en el tanque, bomba gastada o filtro tapado.", "revisar": "El nivel de aceite y si hay manchas en el piso del cuarto o del foso." },
    { "sintoma": "Se detiene después de muchos viajes seguidos y vuelve a funcionar al rato.", "causa": "Aceite o motor recalentados: la protección térmica corta para cuidar el equipo.", "revisar": "La ventilación del cuarto y cuántos viajes por hora se le está pidiendo." },
    { "sintoma": "El motor arranca y suena, pero la cabina no sube.", "causa": "Falta una fase, el motor gira al revés después de un trabajo eléctrico en el edificio, o la llave de paso quedó cerrada.", "revisar": "Que el técnico verifique las tres fases y la posición de la llave de paso." },
    { "sintoma": "El viaje cambia con la temperatura: brusco en frío, flojo y con mala parada en caliente.", "causa": "El aceite cambia de espesor con la temperatura, y más si ya está viejo.", "revisar": "La antigüedad del aceite y la regulación de las válvulas." }
  ],
  "seguridad": "El aceite trabaja caliente y a presión alta. La central no se abre ni se regula sin formación: eso lo hace personal técnico capacitado.",
  "marcas": {
    "movilift": "En el hidráulico MoviLift la placa BR200 vigila la temperatura del aceite con una sonda cableada a la entrada marcada 60, y si se pasa da el error 75. Configurado como hidráulico, el equipo vuelve solo al piso 0 a los 14 minutos sin abrir puertas."
  },
  "dato": "El motor va sumergido en el aceite a propósito: el mismo aceite lo enfría y apaga buena parte del ruido."
});

ASC.def("bloque_valvulas", {
  "nombre": "Bloque de válvulas",
  "alias": ["grupo de válvulas", "válvula de control", "electroválvulas"],
  "ingles": "control valve block",
  "resumen": "El bloque sobre el tanque que decide cuánto aceite pasa y hacia dónde: subir, bajar o frenar suave.",
  "queHace": "Recibe el aceite de la bomba y lo reparte. Sus electroválvulas (bobinas que abren o cierran el paso cuando el tablero les da corriente) hacen que la cabina arranque suave, viaje, baje la velocidad y pare a nivel. Una válvula antirretorno retiene el aceite en el pistón para que la cabina no se baje sola, y una válvula de alivio descarga al tanque si la presión sube demasiado. Trae además lo necesario para un rescate: el pulsador de bajada manual y la bomba de mano.",
  "dondeVa": "Atornillado encima del tanque de la central, en el cuarto de la planta baja. De él sale la manguera hacia el pistón.",
  "porTipo": {
    "hid": "Solo en el hidráulico, sobre la central; es lo primero que ves al entrar al cuarto."
  },
  "pista": "Pieza maciza con bobinas, manómetro y llave de paso, encima del tanque.",
  "comoReconocer": [
    "Bloque macizo de aluminio o fierro fundido, más o menos del tamaño de una caja de zapatos.",
    "Dos a cuatro bobinas cilíndricas o cuadradas con cable: son las electroválvulas.",
    "Un manómetro redondo, como un reloj, que marca la presión.",
    "Una llave de paso con palanca, un botón o palanquita roja de bajada manual y la palanca larga de la bomba de mano.",
    "Tornillos de regulación con contratuerca, a veces marcados con números o letras."
  ],
  "fallas": [
    { "sintoma": "La cabina amanece más abajo del piso o renivela a cada rato con un zumbido corto.", "causa": "Válvula de bajada o antirretorno que no sella, por suciedad o desgaste.", "revisar": "Cuánto baja la cabina en reposo. El técnico revisa los asientos de las válvulas." },
    { "sintoma": "Arranca o para con un golpe.", "causa": "Regulación de aceleración y frenado corrida, o aceite fuera de temperatura.", "revisar": "Si el golpe cambia entre la mañana y la tarde: de ahí sale si es regulación o aceite." },
    { "sintoma": "Sube bien pero no baja.", "causa": "Bobina de bajada quemada o sin corriente.", "revisar": "Que el técnico mida si llega tensión a la bobina de bajada." },
    { "sintoma": "Se pasa del piso o para antes de llegar.", "causa": "La válvula no cambia a velocidad lenta a tiempo.", "revisar": "La bobina de velocidad lenta y su regulación." }
  ],
  "seguridad": "El pulsador de bajada manual y la bomba de mano son para rescates y los opera personal capacitado. Los tornillos de regulación tampoco se tocan: un ajuste malo cambia cómo frena la cabina.",
  "marcas": {
    "movilift": "La central MoviLift lista electroválvulas, llave de bola, pulsador de descenso de emergencia y bomba manual, con una válvula electrónica opcional para arranque y parada suaves. La placa BR200 prueba cada 24 horas las dos válvulas de bajada en serie y marca error 67 o 68 si la cabina renivela 6 veces seguidas."
  },
  "dato": "La bajada manual funciona sin electricidad: el peso de la cabina alcanza para empujar el aceite de vuelta al tanque."
});

ASC.def("piston", {
  "nombre": "Pistón",
  "alias": ["cilindro", "gato hidráulico", "émbolo", "vástago"],
  "ingles": "hydraulic jack",
  "resumen": "El cilindro vertical cuyo vástago sale empujado por el aceite y levanta la cabina.",
  "queHace": "Cuando la central le manda aceite a presión, el vástago sale hacia arriba; cuando el aceite regresa al tanque, el vástago baja por el peso de la cabina. En el modelo es de tiro indirecto 2:1: el vástago empuja una polea y la cabina sube el doble de lo que sale el pistón. Por eso un pistón de la mitad del recorrido alcanza para todo el edificio.",
  "dondeVa": "Dentro del hueco, parado en el foso sobre una base, a un costado de la cabina y del mismo lado que las guías. La parte fija, el cilindro, se sujeta al muro o a las guías con abrazaderas.",
  "porTipo": {
    "hid": "Solo en el hidráulico; en el modelo va al costado, junto a las guías y al bastidor tipo mochila."
  },
  "pista": "Tubo vertical apoyado en el foso del que sale una barra cromada.",
  "comoReconocer": [
    "Tubo de acero pintado (negro, gris o azul) de unos 10 a 20 cm de diámetro, de pie en el foso.",
    "De su punta sale el vástago: una barra lisa, cromada y brillante, siempre con una película fina de aceite.",
    "En la boca del cilindro, un cabezal con los sellos y un anillo recolector con una manguerita que lleva el aceite sobrante a un balde o botella.",
    "Abajo, cerca de la base, la entrada de aceite con la válvula paracaídas y la manguera.",
    "Solo lo ve el técnico, desde el foso o desde el techo de la cabina."
  ],
  "fallas": [
    { "sintoma": "Aceite chorreado por el cilindro, o el balde recolector se llena rápido.", "causa": "Sellos del cabezal gastados.", "revisar": "Cuánto aceite junta el recolector entre una visita de mantenimiento y la siguiente." },
    { "sintoma": "La cabina se baja sola de a pocos estando parada.", "causa": "Fuga por los sellos, por la manguera o por una válvula que no cierra.", "revisar": "Si hay aceite a la vista en el foso. Si está seco, el problema suele estar en el bloque de válvulas." },
    { "sintoma": "Sube a saltitos o con temblor, sobre todo al arrancar.", "causa": "Aire en el aceite, vástago rayado o sellos resecos.", "revisar": "Que el técnico purgue el aire y revise el vástago con luz de costado." },
    { "sintoma": "Rayas a lo largo del vástago o manchas de óxido.", "causa": "Suciedad que cae al sello, golpes o humedad en el hueco.", "revisar": "El estado del cromado: un vástago rayado se come los sellos nuevos en poco tiempo." }
  ],
  "seguridad": "Está en el foso y trabaja con aceite a presión. Su revisión y la purga de aire son tarea de personal técnico capacitado.",
  "dato": "En hidráulicos antiguos de tiro directo el pistón va enterrado en un pozo bajo el foso, tan hondo como el recorrido."
});

ASC.def("polea_piston", {
  "nombre": "Polea de cabeza de pistón",
  "alias": ["polea del pistón", "cabezal del pistón", "polea de reenvío"],
  "ingles": "jack head sheave",
  "resumen": "La polea montada en la punta del vástago por donde pasan los cables que levantan la cabina.",
  "queHace": "Los cables salen de un amarre fijo, suben, pasan por encima de esta polea y bajan hasta el bastidor de la cabina. Cuando el vástago sube un metro, la polea sube un metro y la cabina sube dos: eso es el tiro 2:1. El cabezal que la sostiene suele ir guiado para que la punta del pistón no se ladee.",
  "dondeVa": "En la punta del vástago del pistón, dentro del hueco y al costado de la cabina. Sube y baja con el pistón, siempre a la mitad de la velocidad de la cabina.",
  "porTipo": {
    "hid": "Solo en el hidráulico de tiro indirecto, como el del modelo; en los de tiro directo no existe porque el pistón empuja la cabina sin cables."
  },
  "pista": "Rueda acanalada en la punta del vástago; los cables le pasan por encima.",
  "comoReconocer": [
    "Rueda de fierro fundido o de plástico técnico con canales, de unos 30 a 50 cm de diámetro.",
    "Va en un cabezal de acero en U atornillado a la punta del vástago cromado.",
    "Los cables de acero suben por un lado, la abrazan por arriba y bajan por el otro.",
    "En muchos equipos el cabezal lleva rozaderas a los costados que lo guían.",
    "Tiene una guarda o pasador para que los cables no se salgan si se aflojan."
  ],
  "fallas": [
    { "sintoma": "Ronquido o zumbido del lado del pistón, que acompaña a la cabina al subir y bajar.", "causa": "Rodamiento de la polea gastado o sin grasa.", "revisar": "Que el técnico la escuche girar y mire si hay juego en el eje." },
    { "sintoma": "Canales lisos y brillantes, o cables más gastados de un lado.", "causa": "Canales desgastados o cables con tensión despareja.", "revisar": "El perfil de los canales y la tensión de cada cable en los amarres." },
    { "sintoma": "Chirrido o roce al subir y bajar.", "causa": "Rozaderas del cabezal gastadas o guías secas.", "revisar": "El desgaste de las rozaderas del cabezal y la lubricación de las guías." },
    { "sintoma": "El ascensor se detiene y no arranca después de un golpe o un frenazo.", "causa": "Actuó el contacto de cable flojo porque los cables perdieron tensión.", "revisar": "Que el técnico confirme que los cables siguen en sus canales antes de reponer el servicio." }
  ],
  "seguridad": "Si un cable se sale de la polea, la cabina pierde su apoyo normal. Por eso lleva guarda y contacto de cable flojo, y por eso la revisa solo personal técnico capacitado.",
  "marcas": {
    "movilift": "MoviLift declara suspensión 2:1 en su montacoches hidráulico: tiro indirecto con cables y polea, como en el modelo."
  },
  "dato": "En 2:1 el pistón recorre la mitad pero empuja el doble de peso: lo que ganas en recorrido lo pagas en fuerza."
});

ASC.def("valvula_rotura", {
  "nombre": "Válvula paracaídas",
  "alias": ["válvula de rotura", "válvula antirrotura", "válvula de seguridad del pistón"],
  "ingles": "rupture valve",
  "resumen": "Válvula al pie del cilindro que se cierra sola si la manguera revienta, para que la cabina no caiga.",
  "queHace": "En marcha normal deja pasar el aceite en los dos sentidos sin estorbar. Si la manguera o la tubería se rompe, el aceite quiere salir del cilindro mucho más rápido de lo normal; ese chorro empuja una pieza interna contra su resorte y la válvula se cierra. El aceite queda atrapado en el cilindro y la cabina se detiene. Trabaja sola, sin electricidad.",
  "dondeVa": "Atornillada directamente en la entrada de aceite del cilindro, abajo, en el foso. Va pegada al cilindro a propósito: así protege contra una rotura en cualquier punto de la manguera.",
  "porTipo": {
    "hid": "Solo en el hidráulico; en el modelo va al pie del pistón, entre el cilindro y la manguera."
  },
  "pista": "Pieza chica entre la manguera y el pie del cilindro; actúa sola.",
  "comoReconocer": [
    "Bloque metálico pequeño, como un puño, pegado al pie del cilindro.",
    "De un lado entra al cilindro y del otro recibe la manguera.",
    "Tiene un tornillo de regulación con contratuerca y casi siempre un precinto o una gota de pintura.",
    "Lleva una plaquita con marca, modelo y caudal.",
    "Solo se ve desde el foso y es fácil pasarla por alto: parece un simple codo o una unión grande."
  ],
  "fallas": [
    { "sintoma": "La cabina se clava en plena bajada y ya no baja; para subir sí responde.", "causa": "La válvula se cerró porque la bajada fue demasiado rápida: regulación corrida, mucha carga o aceite muy caliente.", "revisar": "Que el técnico revise la velocidad de bajada antes de volver a dar servicio." },
    { "sintoma": "Se dispara seguido, siempre al bajar con la cabina llena.", "causa": "Válvula regulada muy justa para ese equipo, o velocidad de bajada alta.", "revisar": "Que el técnico compare la velocidad de bajada real con la de placa." },
    { "sintoma": "Aceite alrededor del pie del cilindro.", "causa": "Fuga en la unión de la válvula con el cilindro o con la manguera.", "revisar": "El estado de las uniones y los sellos. Lo hace el técnico con el equipo sin presión." },
    { "sintoma": "En la prueba periódica la válvula no cierra.", "causa": "Válvula trabada por suciedad o mal regulada.", "revisar": "Es motivo para dejar el ascensor fuera de servicio hasta corregirla." }
  ],
  "seguridad": "Es una seguridad de vida y viene regulada y precintada. Nunca se desregula para que el ascensor deje de trabarse; su prueba y ajuste son solo para personal técnico capacitado.",
  "dato": "El hidráulico de tiro indirecto tiene dos protecciones contra la caída: esta válvula, por si falla el aceite, y las cuñas del paracaídas, por si fallan los cables."
});

ASC.def("manguera", {
  "nombre": "Manguera hidráulica",
  "alias": ["manguera de alta presión", "flexible", "tubería de aceite"],
  "ingles": "hydraulic hose",
  "resumen": "El conducto de alta presión que lleva el aceite de la central al pistón y de regreso.",
  "queHace": "Es el único camino del aceite entre el cuarto de la central y el cilindro. Por ahí sube el aceite a presión cuando la cabina sube y por ahí mismo regresa cuando baja. Puede ser manguera flexible de jebe con malla de acero, tubo rígido de acero o una mezcla: tubo en los tramos largos y manguera en los extremos para absorber la vibración.",
  "dondeVa": "Sale del bloque de válvulas, cruza el muro o va por un canal en el piso y entra al foso hasta la válvula paracaídas, al pie del cilindro.",
  "porTipo": {
    "hid": "Solo en el hidráulico; mientras más lejos esté el cuarto de la central, más larga es."
  },
  "pista": "Une el cuarto de la central con el pie del cilindro, llena de aceite.",
  "comoReconocer": [
    "Manguera negra y gruesa, de unos 3 a 6 cm de diámetro por fuera, dura al tacto.",
    "En cada punta, un terminal metálico prensado con una tuerca grande.",
    "A lo largo lleva impresos la marca, la presión de trabajo y la fecha de fabricación.",
    "Si es tubo rígido, es de acero pintado, con uniones roscadas o de brida.",
    "La ves salir del bloque de válvulas en el cuarto de la central; el otro extremo está en el foso."
  ],
  "fallas": [
    { "sintoma": "Manchas o gotas de aceite en el piso del cuarto o en el foso.", "causa": "Terminal flojo o sello de la unión gastado.", "revisar": "Las dos puntas de la manguera: ahí aparece casi siempre la fuga." },
    { "sintoma": "La cubierta de jebe se ve cuarteada, con ampollas o con la malla de acero a la vista.", "causa": "Manguera vieja, rozada contra un filo o doblada más de la cuenta.", "revisar": "La fecha impresa y todo el recorrido. Una manguera así se cambia, no se parcha." },
    { "sintoma": "Golpe o vibración en el muro cuando el ascensor arranca.", "causa": "Manguera o tubo sin abrazaderas, que salta con el golpe de presión.", "revisar": "Que esté sujeta y que no roce contra bordes de concreto o fierro." },
    { "sintoma": "El nivel del tanque baja sin que se vea aceite en el cuarto.", "causa": "Fuga en un tramo escondido, bajo el piso o dentro del muro.", "revisar": "El tramo enterrado o empotrado y el fondo del foso." }
  ],
  "seguridad": "Lleva aceite a presión alta: un chorro fino puede atravesar la piel, y el aceite en el piso resbala. Si ves una fuga, no la toques ni la tapes con la mano; avisa al técnico.",
  "dato": "La fecha de fabricación va impresa porque el jebe envejece aunque no se vea dañado; por eso los fabricantes piden cambiar la manguera cada cierto número de años."
});
