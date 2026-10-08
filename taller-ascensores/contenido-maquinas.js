/* Taller de Ascensores - contenido: máquina, control y limitador.
   Fichas: maquina, polea_traccion, freno, encoder, polea_desvio, tablero_control, interruptor_principal, rescate, limitador. */

ASC.def("maquina", {
  "nombre": "Máquina de tracción",
  "alias": ["máquina", "motor", "grupo tractor", "motorreductor"],
  "ingles": "traction machine",
  "resumen": "El motor que mueve el ascensor: hace girar la polea que arrastra los cables o cintas.",
  "queHace": "Hace girar la polea de tracción, que arrastra los cables o cintas de los que cuelgan la cabina y el contrapeso. El variador del tablero le marca la velocidad, por eso arranca y frena suave. Hay dos familias: la de reductor, donde el motor mueve una caja de engranajes con aceite y esa caja mueve la polea, y la gearless, sin engranajes, con un motor de imanes permanentes que gira lento y lleva la polea directo en su eje.",
  "dondeVa": "Casi siempre arriba, por encima del recorrido de la cabina. Si el edificio tiene cuarto de máquinas en la azotea, está ahí, sobre una base de acero. Si no lo tiene, va dentro del hueco, en la parte más alta.",
  "porTipo": {
    "mr": "En el cuarto de máquinas, atornillada a una bancada de perfiles de acero; la del modelo es de reductor sinfín-corona y tiene un volante que usa el personal de rescate para moverla a mano.",
    "mrl": "Arriba del hueco, fijada a las guías, compacta y sin reductor; no la vas a ver desde ningún pasillo."
  },
  "pista": "Está arriba de todo y pone en movimiento los cables o cintas.",
  "comoReconocer": [
    "Con reductor: un motor cilíndrico acostado, unido a una caja de fierro fundido, con una polea grande a un costado. Todo el conjunto mide alrededor de un metro de largo.",
    "Suele estar pintada de verde, gris o azul, con una placa de datos remachada y una mirilla o tapón para el nivel de aceite.",
    "Gearless de MRL: un bloque chato y compacto, a veces del tamaño de una maleta, con la polea pegada al motor.",
    "Cerca vas a ver el freno, el encoder en la punta del eje y los cables gruesos de fuerza que llegan del tablero.",
    "En el cuarto de máquinas la ves apenas entras. En un MRL solo la ve el técnico, desde el techo de la cabina."
  ],
  "fallas": [
    {
      "sintoma": "Zumbido fuerte, vibración o golpeteo que se siente en la cabina durante el viaje.",
      "causa": "Rodamientos gastados o, en las de reductor, juego entre el sinfín y la corona.",
      "revisar": "De dónde sale el ruido y si cambia con la velocidad; en las de reductor, el nivel y el color del aceite."
    },
    {
      "sintoma": "Mancha de aceite en la bancada o goteo debajo de la máquina.",
      "causa": "Retenes o empaquetaduras vencidas en la caja reductora.",
      "revisar": "El nivel en la mirilla y que el aceite no haya llegado a la polea ni al freno."
    },
    {
      "sintoma": "El ascensor se para solo en horas de mucho uso y vuelve a funcionar después de un rato.",
      "causa": "El motor se recalienta y su protección térmica lo saca de servicio.",
      "revisar": "Ventilación del cuarto o del hueco, que el ventilador del motor gire y cuántos viajes por hora está haciendo el equipo."
    },
    {
      "sintoma": "Arranca con un tirón, tiembla o no logra mover la cabina, y el tablero marca falla.",
      "causa": "Problema entre el variador y el motor: un borne flojo, el encoder o un ajuste perdido.",
      "revisar": "El código de falla en el tablero; el resto lo revisa el técnico con el equipo sin energía."
    }
  ],
  "seguridad": "Tiene partes que giran y trabaja con corriente trifásica. La interviene solo personal técnico capacitado, con el interruptor principal cortado y con candado.",
  "marcas": {
    "otis": "En el Gen2 es gearless, sellada, de imanes permanentes y montada sobre aisladores de goma; en la versión sin cuarto de máquinas va arriba del hueco, apoyada en las guías. En el Arise, que es de cables y con cuarto de máquinas, se llama PureMotion.",
    "schindler": "En el 3300 es la FMB130: gearless, dentro del hueco, fijada a la guía y con freno Leroy-Somer. Para modernizaciones, Schindler Perú publica además las máquinas PSG y SGB 142.",
    "movilift": "Vende por tecnología, sin nombres de modelo: con reductor, o gearless de imanes permanentes para ascensores sin cuarto de máquinas. Su placa BR200 tiene una entrada TMS para el termistor del motor y marca error cuando la máquina se recalienta."
  },
  "dato": "Otis dice que la máquina gearless del Gen2 es hasta 80 % más pequeña que una con engranajes; por eso cabe dentro del hueco."
});

ASC.def("polea_traccion", {
  "nombre": "Polea de tracción",
  "alias": ["polea motriz", "polea tractora", "polea de arrastre"],
  "ingles": "traction sheave",
  "resumen": "Rueda con canales que gira con la máquina y arrastra los cables o cintas por fricción.",
  "queHace": "Los cables pasan por encima sin ir amarrados, apoyados en los canales. El peso de la cabina de un lado y el del contrapeso del otro los aprieta contra el metal, y ese agarre es lo que mueve el ascensor cuando la polea gira. Si los canales se gastan o se llenan de grasa, los cables patinan.",
  "dondeVa": "En el eje de salida de la máquina, casi siempre arriba. Los cables o cintas suben desde la cabina, le dan media vuelta y bajan hacia el contrapeso.",
  "porTipo": {
    "mr": "Rueda grande de fierro fundido al costado del reductor, con un canal para cada uno de los cuatro cables redondos.",
    "mrl": "Mucho más chica, casi un rodillo de acero pegado al motor, por donde pasan las tres cintas planas."
  },
  "pista": "Los cables se apoyan en sus canales y ella los arrastra.",
  "comoReconocer": [
    "En máquinas de cables: rueda de fierro fundido del tamaño de un aro de bicicleta o más grande, con varios canales parejos en el borde.",
    "Los canales brillan, pulidos por el roce del cable. El resto suele estar pintado del color de la máquina.",
    "En máquinas de cintas: un cilindro de acero de menos de un palmo de diámetro, que casi se confunde con el motor.",
    "Lleva una guarda de plancha o unos topes muy cerca de los cables para que no se salgan del canal.",
    "En muchos equipos los cables tienen marcas de pintura que indican cuándo la cabina está a nivel de un piso."
  ],
  "fallas": [
    {
      "sintoma": "La cabina se pasa del piso o queda desnivelada, sobre todo cuando va cargada.",
      "causa": "Los cables patinan porque los canales están gastados o tienen exceso de grasa.",
      "revisar": "El perfil de los canales y si algún cable se hunde más que los otros."
    },
    {
      "sintoma": "Polvillo metálico o rojizo debajo de la polea, sobre la máquina o en el piso.",
      "causa": "Desgaste de los canales y de los cables, que se van comiendo entre sí.",
      "revisar": "Cables y canales al mismo tiempo: hilos rotos, diámetro del cable y forma del canal. Suelen cambiarse juntos."
    },
    {
      "sintoma": "Vibración o zumbido que aumenta con la velocidad.",
      "causa": "Canales gastados de forma dispareja o cables con distinta tensión.",
      "revisar": "La tensión de cada cable en los amarres y la profundidad de cada canal."
    },
    {
      "sintoma": "En equipos de cintas, chirrido o una cinta que se corre hacia un lado.",
      "causa": "Cinta desalineada, sucia o con el recubrimiento dañado.",
      "revisar": "Alineación de la cinta sobre la polea y estado del recubrimiento. Las cintas trabajan secas, sin aceite ni grasa."
    }
  ],
  "seguridad": "Entre el cable y la polea hay un punto de atrapamiento: jala una mano o una manga en un instante. Nadie se acerca con el ascensor energizado; la revisa personal técnico.",
  "marcas": {
    "otis": "En el Gen2 la polea es lisa, sin canales, y mide unos 80 mm de diámetro, contra más de 600 mm en una máquina de cables. Polea chica y cintas planas: así reconoces un Gen2.",
    "schindler": "Con las cintas STM la polea del 3300 baja a unos 85 mm de diámetro. El plan de revisión del fabricante incluye la polea y sus retenedores."
  },
  "dato": "La tracción depende del contrapeso: sin ese peso del otro lado, los cables resbalarían sobre la polea."
});

ASC.def("freno", {
  "nombre": "Freno de la máquina",
  "alias": ["freno electromecánico", "freno electromagnético", "freno de zapatas"],
  "ingles": "machine brake",
  "resumen": "Sujeta la máquina cuando el ascensor está detenido o se queda sin energía.",
  "queHace": "Trabaja al revés de lo que uno espera: unos resortes lo mantienen apretado todo el tiempo y una bobina eléctrica lo abre solo mientras el ascensor viaja. Si se corta la luz o se abre cualquier seguridad, la bobina se queda sin corriente y los resortes cierran de golpe. En los equipos con variador, el motor detiene la cabina y el freno entra después, para sujetarla en el piso.",
  "dondeVa": "Pegado a la máquina, sobre el eje del motor. En las de reductor está entre el motor y la caja de engranajes; en las gearless va a un costado o en la parte trasera del motor.",
  "porTipo": {
    "mr": "Un tambor entre el motor y el reductor, abrazado por dos zapatas con resortes, con la bobina encima y una palanca roja de apertura manual.",
    "mrl": "Integrado a la máquina gearless, con dos mitades independientes y un microinterruptor en cada una que le avisa al tablero si abrió."
  },
  "pista": "Cierra con resortes, abre con electricidad y suena \"clac\" al arrancar.",
  "comoReconocer": [
    "Dos zapatas curvas con forro oscuro que abrazan un tambor liso y brillante. En máquinas nuevas, un disco apretado entre dos placas.",
    "Resortes gruesos a la vista con tuercas de regulación, y un cilindro o caja con dos cables: la bobina.",
    "Una palanca pintada de rojo o amarillo. En los MRL no hay palanca a la vista: el mando llega hasta el tablero.",
    "Se oye. Un \"clac\" seco cuando el ascensor arranca y otro cuando se detiene.",
    "El tambor o disco tiene que verse seco y limpio. Aceite ahí es mala señal."
  ],
  "fallas": [
    {
      "sintoma": "Golpe fuerte o \"clac\" metálico al arrancar y al parar, más ruidoso que antes.",
      "causa": "Demasiado juego entre zapata y tambor, por forro gastado o mala regulación.",
      "revisar": "La separación entre zapata y tambor y el espesor del forro."
    },
    {
      "sintoma": "Olor a quemado, la máquina calienta y el motor suena forzado.",
      "causa": "El freno no abre del todo y roza durante el viaje: bobina débil, tensión baja o mecanismo trabado.",
      "revisar": "Que las dos zapatas se separen parejo al arrancar y la tensión que le llega a la bobina."
    },
    {
      "sintoma": "La cabina se desliza o queda desnivelada cuando entra o sale gente en el piso.",
      "causa": "Forros gastados, cristalizados o contaminados con aceite del reductor.",
      "revisar": "El estado de los forros y si hay fuga de aceite cerca del tambor. El ascensor queda fuera de servicio hasta corregirlo."
    },
    {
      "sintoma": "El ascensor no arranca y el tablero marca falla de freno.",
      "causa": "El microinterruptor que confirma la apertura no cambió o está desajustado.",
      "revisar": "Ajuste y cableado de los micros de freno, y si el freno abre de verdad."
    }
  ],
  "seguridad": "Es una parte de seguridad. Abrirlo a mano deja la cabina libre y se puede mover sola hacia el lado más pesado, por eso solo lo hace personal de rescate capacitado, con el procedimiento del fabricante.",
  "marcas": {
    "schindler": "El freno de la FMB130 del 3300 es Leroy-Somer: nuevo tiene entre 0.3 y 0.4 mm de entrehierro (la luz entre el imán y su placa), y si entra una galga de 0.65 mm el ascensor sale de servicio. No se repara, se cambia completo.",
    "movilift": "En máquinas gearless, la placa BR200 vigila los micros de las dos zapatas por las entradas BR1 y BR2. Si alguno no cambia cuando debe, marca una falla bloqueante de movimiento incontrolado y el ascensor queda parado hasta que el técnico lo rearme."
  },
  "dato": "La norma EN 81-20 pide que el freno tenga dos mitades independientes: si una falla, la otra sola tiene que poder detener la cabina."
});

ASC.def("encoder", {
  "nombre": "Encoder",
  "alias": ["codificador", "generador de pulsos", "tacogenerador"],
  "ingles": "encoder",
  "resumen": "Sensor en el eje del motor que le dice al variador cuánto y qué tan rápido gira.",
  "queHace": "Gira junto con el motor y le manda al variador miles de pulsos por vuelta. Con eso el variador sabe la velocidad real y el sentido de giro, y corrige al instante para que el viaje sea parejo y la cabina pare a nivel. En las máquinas gearless además indica la posición exacta del rotor, y sin ese dato el motor de imanes no puede arrancar.",
  "dondeVa": "En la punta trasera del eje del motor, del lado opuesto a la polea. De ahí sale un cable delgado y con malla que va hasta el variador, dentro del tablero.",
  "porTipo": {
    "mr": "En la cola del motor, a veces bajo la tapa del ventilador; las máquinas antiguas de dos velocidades no lo tienen.",
    "mrl": "Metido en la parte trasera de la máquina gearless, casi siempre bajo una tapa, y la máquina no funciona sin él."
  },
  "pista": "Pequeño, en la punta del eje, cuenta las vueltas del motor.",
  "comoReconocer": [
    "Cilindro chico, del tamaño de una lata de atún o menos, negro o gris metálico.",
    "Está en el centro de la parte trasera del motor, sujeto con una platina delgada o un brazo que evita que gire.",
    "Le sale un solo cable delgado, muy distinto de los cables gruesos de fuerza del motor.",
    "Muchas veces queda tapado por la rejilla del ventilador o por una tapa de plástico."
  ],
  "fallas": [
    {
      "sintoma": "El ascensor arranca, avanza unos centímetros con un tirón y se para; el tablero marca falla de variador.",
      "causa": "El variador no recibe los pulsos: cable cortado, conector flojo o encoder dañado.",
      "revisar": "El conector y todo el recorrido del cable, buscando dobleces o aplastamientos, y el código de falla del variador."
    },
    {
      "sintoma": "Vibración o temblor en la cabina, más notorio a baja velocidad o al llegar al piso.",
      "causa": "Acople flojo entre el encoder y el eje, o ruido eléctrico en la señal.",
      "revisar": "La fijación del encoder, que la malla del cable esté a tierra y que el cable no corra junto a los de fuerza."
    },
    {
      "sintoma": "Después de cambiar el motor o el encoder, la máquina gearless zumba y no arranca.",
      "causa": "El variador perdió la referencia de posición del rotor.",
      "revisar": "Que el técnico repita el ajuste de ángulo que pide el variador antes de poner el equipo en servicio."
    }
  ],
  "marcas": {
    "schindler": "La máquina del 3300 trabaja en lazo cerrado, y el plan de revisión del fabricante incluye el encoder junto con la fijación y el ventilador de la máquina.",
    "movilift": "La placa BR200 puede llevar la posición de la cabina con un encoder, a través de la tarjeta BR-ENC, en lugar de contar solo imanes."
  },
  "dato": "A esto se le llama lazo cerrado: el variador manda, el encoder le cuenta lo que pasó de verdad y el variador corrige."
});

ASC.def("polea_desvio", {
  "nombre": "Polea de desvío",
  "alias": ["polea deflectora", "polea desviadora", "polea loca"],
  "ingles": "deflector sheave",
  "resumen": "Polea libre que aparta los cables para que bajen justo sobre el contrapeso.",
  "queHace": "Gira libre, sin motor ni freno, arrastrada por los mismos cables. De la polea de tracción un ramal cae al centro de la cabina, y el otro tiene que caer al centro del contrapeso, que está más atrás. Cuando esa distancia es mayor que el diámetro de la polea de tracción, esta segunda polea lleva los cables hasta allá.",
  "dondeVa": "Debajo de la máquina, a la altura de la losa del cuarto de máquinas o colgada justo debajo, del lado del contrapeso. Va fija a la misma bancada de acero que sostiene la máquina.",
  "porTipo": {
    "mr": "Bajo la losa del cuarto de máquinas, hacia el fondo del hueco, llevando los cuatro cables hasta el contrapeso."
  },
  "pista": "Gira sin motor y lleva los cables hacia el contrapeso.",
  "comoReconocer": [
    "Rueda con canales parecida a la de tracción, un poco más chica y con el mismo número de canales.",
    "No tiene nada pegado: ni motor, ni freno, ni cables eléctricos. Solo un eje con rodamientos y, a veces, una grasera.",
    "Está más abajo que la máquina. Desde el cuarto se ve por la abertura de la losa por donde pasan los cables.",
    "Lleva una guarda de plancha para que los cables no se salgan y nadie meta la mano."
  ],
  "fallas": [
    {
      "sintoma": "Zumbido, ronquido o chillido que viene de arriba y sigue el ritmo del viaje.",
      "causa": "Rodamientos secos o gastados.",
      "revisar": "El juego del eje y el engrase de los rodamientos, si tienen grasera."
    },
    {
      "sintoma": "Los cables se gastan más de un lado o rozan la guarda.",
      "causa": "Polea desalineada respecto a la polea de tracción.",
      "revisar": "La alineación entre las dos poleas y la fijación de los soportes a la bancada."
    },
    {
      "sintoma": "Vibración en la cabina y polvillo metálico debajo de la polea.",
      "causa": "Canales gastados de forma dispareja.",
      "revisar": "La profundidad de los canales, comparando uno con otro, y la tensión de los cables."
    }
  ],
  "seguridad": "Tiene un punto de atrapamiento entre cable y polea, por eso va con guarda. La revisa personal técnico con el equipo detenido y bloqueado.",
  "dato": "Cada polea que un cable tiene que doblar lo fatiga un poco más, por eso se ponen solo las necesarias."
});

ASC.def("tablero_control", {
  "nombre": "Tablero de control",
  "alias": ["tablero", "control", "maniobra", "cuadro de maniobra"],
  "ingles": "controller",
  "resumen": "Gabinete que recibe las llamadas, vigila las seguridades y manda al motor y a las puertas.",
  "queHace": "Adentro hay dos cosas principales. La maniobra es la tarjeta electrónica que decide: anota las llamadas, sabe en qué piso está la cabina y revisa que toda la serie de seguridades esté cerrada antes de mover nada. El variador es la caja que le da fuerza al motor y regula su velocidad para que arranque y pare suave. Casi todos tienen una pantalla o unas luces donde el técnico lee el estado y los códigos de falla.",
  "dondeVa": "Depende del tipo de ascensor, pero siempre con llave y fuera del alcance del público. En los de tracción fíjate en la azotea o en el último piso; en los hidráulicos está abajo, junto a la central.",
  "porTipo": {
    "mr": "En el cuarto de máquinas, un gabinete metálico grande contra la pared, cerca de la máquina y del interruptor principal.",
    "mrl": "En el marco de la puerta del último piso, un gabinete alto y angosto con cerradura; parte del equipo queda dentro del hueco.",
    "hid": "Junto a la central hidráulica, en su cuarto de planta baja; en vez de variador suele llevar contactores para la bomba y salidas para las válvulas."
  },
  "pista": "Recibe las llamadas y decide a dónde va la cabina.",
  "comoReconocer": [
    "Gabinete de plancha pintada, gris o crema, con puerta y cerradura. En un cuarto de máquinas puede ser del tamaño de un ropero chico.",
    "En los MRL es una columna angosta pegada a la puerta del ascensor del último piso, casi de piso a techo, con tapa y llave.",
    "Adentro: una tarjeta con pantalla y botones, hileras de borneras con cables numerados, contactores y el variador, que es una caja con disipador y ventilador.",
    "Suele tener pegados el diagrama eléctrico y las instrucciones de rescate.",
    "Se oye. Los contactores hacen \"clac\" cada vez que el ascensor arranca, y el ventilador del variador sopla."
  ],
  "fallas": [
    {
      "sintoma": "Ascensor parado, no responde llamadas y hay un código en la pantalla del tablero.",
      "causa": "Una seguridad abierta (puerta mal cerrada, stop pulsado, final de carrera) o una falla que quedó memorizada.",
      "revisar": "El código y los indicadores de la serie de seguridades: dicen en qué tramo está el corte."
    },
    {
      "sintoma": "Se para en horas de calor o de mucho tráfico y vuelve solo.",
      "causa": "Sobretemperatura del variador o del gabinete: ventilador malogrado, filtros con polvo o cuarto sin ventilación.",
      "revisar": "Ventiladores, limpieza y temperatura del ambiente."
    },
    {
      "sintoma": "Después de un corte o un bajón de luz queda bloqueado.",
      "causa": "Falta una fase, saltó la protección de fases o se quemó un fusible o una tarjeta por sobretensión.",
      "revisar": "Tensión de las tres fases en la entrada, fusibles y relé de fases."
    },
    {
      "sintoma": "Fallas que van y vienen sin un patrón claro.",
      "causa": "Bornes flojos, contactores con contactos gastados, o humedad y polvo en las tarjetas.",
      "revisar": "Ajuste de borneras, estado de los contactores y limpieza del gabinete, siempre con el equipo sin energía."
    }
  ],
  "seguridad": "Adentro hay tensión peligrosa y el variador guarda carga varios minutos después de cortar la energía, así que solo lo abre personal técnico. Puentear una seguridad para que el ascensor \"camine\" es causa de accidentes graves.",
  "marcas": {
    "otis": "En el Gen2 sin cuarto de máquinas es un armario de unos 2.1 m de alto y entre 33 y 40 cm de ancho, sobrepuesto al marco de la puerta del último piso; nunca va empotrado. El cuadro se llama MCS 220 y el variador regenerativo, ReGen drive.",
    "schindler": "En el 3000 y el 3300 va en el marco de la puerta del último piso; en el 3300, del lado donde cierra la puerta. El control del 3300 se llama Bionic y su pantalla muestra piso, sentido, velocidad y cuatro indicadores de la cadena de seguridad.",
    "movilift": "Sus tableros llevan placas de la familia BR. La BR200 se reconoce por una pantalla con cuatro teclas (UP, DOWN, ESC y OK), un LED rojo marcado ERR y un selector de tres posiciones: MAN, NORM y PROG."
  },
  "dato": "Un variador regenerativo devuelve a la red del edificio la energía que el ascensor genera al frenar: Otis lo llama ReGen drive y Schindler, PF1."
});

ASC.def("interruptor_principal", {
  "nombre": "Interruptor principal",
  "alias": ["llave general", "interruptor de fuerza", "llave de cuchilla", "seccionador"],
  "ingles": "main switch",
  "resumen": "La llave que corta toda la fuerza eléctrica del ascensor de una sola vez.",
  "queHace": "Deja sin energía a la máquina, al variador y al tablero con un solo movimiento. Se puede trabar en posición apagado con un candado, para que nadie lo vuelva a conectar mientras un técnico trabaja. Ojo: la luz de la cabina, la alarma y los tomacorrientes van por un circuito aparte, con su propia llave, y siguen con energía.",
  "dondeVa": "Cerca de la entrada del lugar donde está el tablero, a la mano apenas llegas. Antes de él, en el tablero general del edificio, hay otra llave que alimenta la línea del ascensor.",
  "porTipo": {
    "mr": "En la pared del cuarto de máquinas, al lado de la puerta de entrada y a la altura de la mano.",
    "mrl": "Dentro del gabinete del marco de la puerta del último piso, o en una caja junto a él.",
    "hid": "En el cuarto de la central hidráulica, cerca de la puerta y al lado del tablero."
  },
  "pista": "Con un solo giro deja sin fuerza a todo el ascensor.",
  "comoReconocer": [
    "Caja metálica o de plástico con una manija giratoria, muchas veces roja sobre fondo amarillo, con las posiciones 0 y 1 u OFF y ON.",
    "En instalaciones antiguas es una llave de cuchilla con palanca al costado. En otras, un interruptor termomagnético grande dentro de una caja.",
    "La manija tiene un agujero para poner candado en posición apagado.",
    "Le entran y le salen cables gruesos, y debe tener un rótulo que diga a qué ascensor corresponde.",
    "Al lado suele haber una llave más chica: la de la luz de cabina."
  ],
  "fallas": [
    {
      "sintoma": "Ascensor totalmente apagado: sin pantalla, sin llamadas y con el tablero sin luces.",
      "causa": "Interruptor abierto o saltado, o no llega energía desde el tablero general del edificio.",
      "revisar": "La posición de la manija y si llega tensión a la entrada. Si saltó, hay que saber por qué antes de volver a conectarlo."
    },
    {
      "sintoma": "Salta seguido, sobre todo en el arranque.",
      "causa": "Sobrecarga o cortocircuito hacia el lado del ascensor, o un interruptor fatigado o mal dimensionado.",
      "revisar": "La corriente que consume el equipo y el estado del cableado hacia el motor. Lo mide un electricista."
    },
    {
      "sintoma": "Caja caliente, olor a plástico quemado o bornes ennegrecidos.",
      "causa": "Bornes flojos o contactos internos gastados.",
      "revisar": "Ajuste de los bornes y estado de los contactos, con la línea cortada desde el tablero general."
    }
  ],
  "seguridad": "Aunque esté apagado, los bornes de entrada siguen con tensión y la luz de cabina va por otro circuito. El candado lo pone y lo quita la misma persona que está trabajando.",
  "dato": "Si hay dos ascensores en el mismo cuarto, cada uno tiene su propio interruptor y la norma pide que esté rotulado para no cortar el equivocado."
});

ASC.def("rescate", {
  "nombre": "Rescate automático",
  "alias": ["ARD", "rescatador", "UPS de rescate", "evacuación automática"],
  "ingles": "automatic rescue device",
  "resumen": "Baterías que, si se va la luz, llevan la cabina al piso más cercano y abren las puertas.",
  "queHace": "Cuando detecta que falta la energía, espera unos segundos y alimenta el tablero y el variador con sus baterías. Mueve la cabina despacio hacia el lado que menos esfuerzo pide, la deja a nivel del piso más cercano, abre las puertas y ahí se queda hasta que vuelve la luz. Solo trabaja si todas las seguridades están cerradas: si el ascensor se detuvo por una falla, no lo va a mover.",
  "dondeVa": "Al lado del tablero de control o dentro de él. Tiene que estar cerca porque le presta su energía al tablero y al variador cuando falta la red.",
  "porTipo": {
    "mr": "Gabinete aparte en el cuarto de máquinas, junto al tablero, con las baterías adentro.",
    "mrl": "Dentro del gabinete del último piso o en una caja pegada a él, porque no hay más espacio.",
    "hid": "Módulo chico con batería junto al tablero de la central: abre la válvula de bajada, la cabina desciende por su propio peso hasta un piso y abre puertas."
  },
  "pista": "Entra a trabajar cuando se va la luz y hay gente adentro.",
  "comoReconocer": [
    "Caja metálica del tamaño de una CPU de computadora o un poco más grande, pegada al tablero, con rejillas de ventilación.",
    "Adentro lleva baterías selladas como las de un UPS o de una alarma, normalmente varias en fila.",
    "Tiene luces o un indicador de estado: red presente, baterías cargando, falla.",
    "En muchos equipos nuevos no hay caja aparte y las baterías van dentro del tablero.",
    "Las baterías suelen tener escrita la fecha de instalación. Pídele al técnico que te la muestre."
  ],
  "fallas": [
    {
      "sintoma": "Se va la luz y la cabina queda entre pisos con gente adentro.",
      "causa": "Baterías agotadas o viejas, que es lo más común, o el equipo está desconectado.",
      "revisar": "La fecha y la tensión de las baterías y la luz de estado del equipo."
    },
    {
      "sintoma": "El rescate arranca pero la cabina se queda a medio camino o no abre puertas.",
      "causa": "Baterías con poca capacidad: aguantan en reposo y se caen apenas les piden corriente.",
      "revisar": "Una prueba de rescate con corte de energía, hecha por el técnico de mantenimiento."
    },
    {
      "sintoma": "Baterías hinchadas, con sulfato en los bornes u olor ácido.",
      "causa": "Baterías vencidas o un cargador que las sobrecarga.",
      "revisar": "La tensión de carga y la antigüedad. Se cambia el juego completo."
    },
    {
      "sintoma": "Pitido o luz de alarma en la caja del rescate con el ascensor funcionando normal.",
      "causa": "El equipo detectó batería baja o una falla del cargador.",
      "revisar": "El indicador de estado y el fusible de baterías."
    }
  ],
  "seguridad": "No reemplaza al rescate hecho por personas capacitadas. Si quedas atrapado, toca la alarma y espera adentro: nunca fuerces las puertas ni intentes salir entre pisos.",
  "marcas": {
    "otis": "El Gen2 trae rescate automático a batería que lleva la cabina al piso más cercano. En los catálogos figura como ARO, y como EAR en el Gen2 Home.",
    "schindler": "En el 3300 la evacuación se manda desde el armario de la puerta del último piso, con baterías propias y sin abrir el freno a mano; la hace personal capacitado. Un LED azul avisa cuando la cabina llegó a zona de puertas.",
    "movilift": "Usa el ARD15, que hace arrancar el variador con baterías de 24 V, y el n_UPS, que mantiene encendido el tablero unos dos minutos. Después del rescate el ascensor queda con puertas abiertas y sin aceptar llamadas hasta que vuelve la red."
  },
  "dato": "Las baterías se vencen aunque nunca se usen, y un rescate que nadie prueba suele fallar justo el día del apagón."
});

ASC.def("limitador", {
  "nombre": "Limitador de velocidad",
  "alias": ["gobernador", "regulador de velocidad", "governor"],
  "ingles": "overspeed governor",
  "resumen": "Polea que vigila la velocidad de la cabina y, si se embala, dispara el paracaídas.",
  "queHace": "Un cable delgado amarrado a la cabina lo hace girar a la misma velocidad que ella. Si la cabina baja más rápido de lo permitido, unas pesas o un péndulo se abren por la fuerza centrífuga y accionan un contacto eléctrico que corta la máquina. Si la velocidad sigue subiendo, el limitador se traba y frena su cable. Ese tirón jala la palanca del paracaídas, que acuña la cabina contra las guías.",
  "dondeVa": "Arriba. Su cable baja hasta la polea tensora del foso y vuelve a subir, formando un lazo cerrado a todo lo alto del hueco.",
  "porTipo": {
    "mr": "En el piso del cuarto de máquinas, cerca de la máquina, con su cable bajando por un agujero de la losa.",
    "mrl": "En la parte alta del hueco, fijado a una guía o al muro, con un mando que el técnico acciona desde el tablero para probarlo y rearmarlo.",
    "hid": "Arriba del hueco, igual que en el MRL; lo lleva porque en el tiro indirecto del modelo la cabina cuelga de cables."
  },
  "pista": "Gira con un cable delgado y se traba si la cabina se embala.",
  "comoReconocer": [
    "Polea de unos 20 a 30 cm de diámetro montada en un soporte de fierro, con un cable mucho más delgado que los de tracción.",
    "En el centro o al costado tiene pesas, un péndulo o un balancín con resorte: esa es la parte centrífuga.",
    "Lleva un interruptor pequeño con su cable eléctrico y una placa con la velocidad de disparo.",
    "Tiene un precinto en el ajuste. Si está roto, alguien lo tocó.",
    "En el cuarto de máquinas lo ves a simple vista, sobre el piso. En los MRL queda escondido arriba del hueco."
  ],
  "fallas": [
    {
      "sintoma": "El ascensor queda bloqueado, no vuelve solo y el tablero marca seguridad abierta.",
      "causa": "Saltó el contacto de sobrevelocidad del limitador por un tirón, una prueba o un golpe.",
      "revisar": "Por qué disparó antes de rearmar: velocidad del equipo, estado del cable y del propio limitador."
    },
    {
      "sintoma": "La cabina se acuña en las guías sin haber ido rápido.",
      "causa": "Limitador sucio o trabado, o cable del limitador flojo que da tirones.",
      "revisar": "Que la polea gire libre, la tensión del cable y la polea tensora del foso."
    },
    {
      "sintoma": "Ruido de roce o chillido rítmico arriba durante todo el viaje.",
      "causa": "Rodamiento del limitador gastado o canal de la polea gastado.",
      "revisar": "El juego del eje y el desgaste del canal. El cable no debe patinar en él."
    },
    {
      "sintoma": "En la prueba periódica no dispara a la velocidad que dice su placa.",
      "causa": "Mecanismo endurecido por óxido, pintura o suciedad, o resorte fuera de ajuste.",
      "revisar": "Limpieza y calibración a cargo del técnico. Si no queda bien, se reemplaza y se vuelve a precintar."
    }
  ],
  "seguridad": "Es un componente de seguridad calibrado y precintado de fábrica. No se regula ni se pinta por cuenta propia: lo prueba y lo rearma solo personal técnico capacitado.",
  "marcas": {
    "otis": "En las listas de mantenimiento de los Otis con cuarto de máquinas en Lima figura como \"gobernador\" y se revisa junto con frenos y poleas. El Gen360, que no está en el catálogo peruano, cambia las seguridades mecánicas por un sistema electrónico.",
    "schindler": "En el 3300 es el SA GBP 201, de péndulo y leva: detecta la sobrevelocidad en los dos sentidos y acuña solo en bajada. Su contacto se llama KBV, y ni el limitador ni su cable se lubrican."
  },
  "dato": "La norma EN 81-20 fija el disparo a partir del 115 % de la velocidad nominal, para que no salte con cualquier variación."
});
