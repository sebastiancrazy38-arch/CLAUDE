/* Taller de Ascensores. Contenido nuevo (b): variador y cables del motor, cableado e iluminación del hueco,
   caja y baranda del techo de cabina, pantalla del contrapeso, monitor de fajas, gancho de izaje y recolector de aceite. */

ASC.def("variador", {
  "nombre": "Variador de frecuencia",
  "alias": ["variador", "inversor", "drive", "VVVF"],
  "ingles": "variable frequency drive (inverter)",
  "resumen": "Caja electrónica que alimenta al motor y le regula la velocidad para que arranque y pare suave.",
  "queHace": "Toma la corriente del edificio, que llega siempre igual, y se la entrega al motor con la fuerza y la frecuencia que hacen falta en cada instante. Así la cabina arranca despacio, acelera, viaja pareja y frena hasta quedar a ras del piso, sin sacudones. El tablero le dice a dónde ir y el encoder le cuenta cómo está girando el motor. Cuando la cabina frena, o cuando baja llena, el motor genera energía: un variador común la quema en una resistencia y uno regenerativo la devuelve a la red del edificio.",
  "dondeVa": "Siempre cerca del motor o del tablero, y bajo llave. Puede estar dentro del mismo gabinete del tablero o en una caja aparte, unida a él por cables.",
  "porTipo": {
    "mr": "En el cuarto de máquinas, dentro del tablero o colgado en la pared a su lado, con el cable grueso que va hasta el motor.",
    "mrl": "Arriba del hueco, cerca de la máquina, o dentro del armario angosto del último piso, según la marca."
  },
  "pista": "Le da fuerza al motor y decide qué tan rápido gira.",
  "comoReconocer": [
    "Caja rectangular de metal o plástico duro. Según la potencia, va del tamaño de una caja de zapatos al de una maleta de mano.",
    "Por atrás o por un costado tiene el disipador, una fila de aletas de aluminio, con uno o dos ventiladores que se oyen soplar.",
    "Al frente lleva una pantallita con teclas o unas luces de estado, y la etiqueta con la marca y los kilowatts.",
    "Le entran tres cables gruesos de la red y le salen tres hacia el motor. Aparte le llega un cable delgado con malla, el del encoder.",
    "Si no es regenerativo, cerca vas a ver su resistencia de frenado: una caja con rejilla que se pone caliente."
  ],
  "fallas": [
    { "sintoma": "El ascensor se para en las horas de más uso o de más calor y vuelve solo al rato", "causa": "Sobretemperatura: ventilador parado, aletas del disipador tapadas de polvo o ambiente sin ventilación", "revisar": "Que el ventilador gire, la limpieza de las aletas y la temperatura del cuarto o del hueco" },
    { "sintoma": "Arranca, da un tirón y se detiene con un código de falla en el variador", "causa": "Sobrecorriente: freno que no abre del todo, borne flojo en el cable del motor o señal del encoder perdida", "revisar": "El código que quedó guardado, la apertura del freno y las conexiones hacia el motor y el encoder" },
    { "sintoma": "Después de un bajón o un corte de luz queda fuera de servicio", "causa": "Tensión baja o falta de una fase en la entrada; a veces el pico dañó el propio variador", "revisar": "La tensión de las tres fases y los fusibles de entrada" },
    { "sintoma": "Se para justo al frenar, sobre todo bajando con la cabina llena", "causa": "La energía que devuelve el motor no tiene a dónde ir: resistencia de frenado abierta o mal conectada", "revisar": "La resistencia, sus cables y el código de sobretensión" }
  ],
  "seguridad": "Trabaja con tensión peligrosa y guarda carga varios minutos después de cortar la energía. Lo abre y lo programa solo personal técnico capacitado.",
  "marcas": {
    "otis": "Su variador regenerativo se llama ReGen drive: devuelve a la red del edificio la energía que genera el ascensor, y Otis le atribuye hasta 75 % de ahorro frente a un equipo con engranajes y sin regeneración. Un catálogo español antiguo del Gen2 nombra el variador OVF-20.",
    "schindler": "En el 3300 se llama ACVF, y la versión regenerativa, PF1, que según el catálogo baja el consumo hasta 30 %. El plan de revisión del fabricante pide mirar su fijación, su ventilador y sus conexiones.",
    "movilift": "No fabrica variador propio: arma sus tableros con variadores de otros fabricantes. Un distribuidor italiano vende tableros MoviLift en versión VVVF con variador Fuji."
  },
  "dato": "Si en una ficha lees VVVF, quiere decir voltaje y frecuencia variables: es otra forma de decir que el ascensor lleva variador."
});

ASC.def("cables_motor", {
  "nombre": "Cables del motor",
  "alias": ["cable de fuerza", "cable de potencia", "cableado de máquina"],
  "ingles": "motor power cable, encoder cable and brake cable",
  "resumen": "Cable grueso que lleva la fuerza del variador al motor, y cables delgados del encoder y del freno.",
  "queHace": "Son el lazo entre el variador y la máquina. Por el cable grueso va la corriente que hace girar el motor. Por los delgados viaja la información: el del encoder le cuenta al variador cómo gira el eje, el del freno lleva la corriente que lo abre y trae la señal de sus microswitches, y otro más trae la temperatura del motor. Basta que uno solo falle para que el ascensor se pare.",
  "dondeVa": "Salen del variador y entran a la máquina por la caja de bornes del motor, una cajita con tapa atornillada en su costado. El de fuerza y los de señal van por caminos separados, para que el primero no ensucie la señal de los otros.",
  "porTipo": {
    "mr": "Cruzan el cuarto de máquinas dentro de tubos o canaletas, por el piso o la pared, desde el tablero hasta la máquina.",
    "mrl": "Van por la parte alta del hueco, sujetos con grapas o dentro de canaleta, hasta la máquina que está sobre las guías."
  },
  "pista": "Unen el variador con la máquina: uno grueso de fuerza y varios delgados.",
  "comoReconocer": [
    "El de fuerza es el más grueso que llega a la máquina, como un dedo o más, casi siempre negro, gris o naranja.",
    "Debajo del forro lleva una malla metálica que se conecta a tierra.",
    "Entra al motor por un prensaestopa, una tuerca de metal o plástico que aprieta el cable contra la caja de bornes.",
    "El del encoder es delgado, con malla, y termina en un conector de muchos pines en la punta del eje del motor.",
    "El del freno es otro cable delgado que va a las bobinas y a los microswitches del freno."
  ],
  "fallas": [
    { "sintoma": "Se para al arrancar y el variador marca falta de fase o fuga a tierra", "causa": "Borne flojo en el motor o en el variador, o forro del cable pelado contra un filo de metal", "revisar": "El ajuste de los bornes y el forro en todo el recorrido, sobre todo donde el cable dobla o cruza un borde" },
    { "sintoma": "Tirones o fallas de encoder que aparecen y desaparecen", "causa": "Cable del encoder amarrado junto al de fuerza, malla sin conectar o conector flojo", "revisar": "Que el cable de señal vaya separado del de fuerza, la malla y el ajuste del conector" },
    { "sintoma": "El freno no abre, o el tablero marca falla de freno con el freno en buen estado", "causa": "Cable de la bobina o de los microswitches cortado, suelto o mordido", "revisar": "Los bornes y el recorrido del cable del freno" },
    { "sintoma": "Olor a quemado o un borne oscurecido en la caja del motor", "causa": "Conexión floja que calienta con cada arranque", "revisar": "Los bornes de fuerza y el estado de los terminales" }
  ],
  "seguridad": "El cable de fuerza puede tener tensión peligrosa incluso un rato después de cortar la energía, porque el variador guarda carga. Sus conexiones las toca solo personal técnico capacitado.",
  "marcas": {
    "schindler": "En la lista de errores del 3300 el variador avisa cuando no detecta corriente en una fase hacia el motor (error 1511) o cuando hay fuga a tierra (error 1503). En los dos casos el manual manda revisar los cables de fuerza que van al motor.",
    "movilift": "En la placa BR200 hay entradas rotuladas TMS, para el termistor del motor, y BR1 y BR2, para los micros del freno. Ahí llegan los cables delgados que vienen de la máquina."
  },
  "dato": "El cable de fuerza de un motor con variador lleva malla para no meter ruido eléctrico en los cables de señal que pasan cerca."
});

ASC.def("cableado_hueco", {
  "nombre": "Cableado del hueco",
  "alias": ["instalación fija", "cableado de pasadizo", "cableado del ducto", "canaleta del hueco"],
  "ingles": "hoistway wiring",
  "resumen": "Canaleta vertical con una caja por piso que conecta cerraduras, botoneras y sensores con el tablero.",
  "queHace": "Es todo el cableado que se queda quieto. Recoge en cada piso el contacto de la cerradura de la puerta, la botonera de llamada y el indicador, y los lleva al tablero. Por él pasa la serie de seguridades: un circuito que recorre una por una las puertas de piso, los finales de carrera, el stop del foso y el contacto de la polea tensora, y que deja al ascensor quieto si cualquiera de ellos se abre. La cabina va aparte, por el cable viajero.",
  "dondeVa": "Sube pegado a una pared del hueco, casi siempre del lado de las puertas, desde el foso hasta el tablero. En cada piso tiene una caja de la que salen ramales cortos hacia la cerradura y la botonera.",
  "porTipo": {
    "mr": "Sube hasta el cuarto de máquinas y entra al tablero por un pase en la losa; en equipos antiguos es un mazo grueso, con un hilo por cada botón.",
    "mrl": "Termina en el armario del último piso; suele venir de fábrica con conectores enchufables y un cable de comunicación en lugar de un hilo por botón.",
    "hid": "Va hacia el tablero que está junto a la central, en la planta baja, así que el tramo más cargado de cables queda en los pisos de abajo."
  },
  "pista": "La columna vertebral de cables fijos que une cada piso con el tablero.",
  "comoReconocer": [
    "Canaleta de plástico gris o de plancha, de pocos centímetros de ancho, que sube recta de piso a techo del hueco.",
    "A la altura de cada puerta hay una caja de conexiones con tapa, del tamaño de un libro.",
    "De cada caja salen cables delgados hacia el cabezal de la puerta, donde está la cerradura, y hacia la botonera del pasillo.",
    "Los cables llevan números o etiquetas en las puntas, los mismos que aparecen en el plano del tablero.",
    "Desde el pasillo no se ve nada: todo queda del lado del hueco, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor no arranca y el tablero marca puerta de piso abierta, aunque todas se ven cerradas", "causa": "Contacto de una cerradura desajustado o empalme flojo en la caja de ese piso", "revisar": "El código del tablero, que en muchos equipos señala el piso; después, el contacto y la caja de ese piso" },
    { "sintoma": "Una botonera de piso no llama o su luz no prende", "causa": "Conector suelto o cable cortado en el ramal de ese piso", "revisar": "El conector de la botonera y la bornera de su caja" },
    { "sintoma": "Fallas que van y vienen, peores en los meses húmedos o después de una filtración", "causa": "Humedad y sulfato en borneras y cajas, sobre todo en el foso y los pisos bajos", "revisar": "Si hay cajas sin tapa, bornes verdosos o agua que escurre por la pared" },
    { "sintoma": "Varios pisos pierden comunicación a la vez", "causa": "Cable de comunicación dañado o su malla mal puesta a tierra", "revisar": "La continuidad del cable entre cajas y la puesta a tierra" }
  ],
  "seguridad": "Por aquí pasa la serie de seguridades. Un puente o un empalme mal hecho puede dejar al ascensor moviéndose con una puerta abierta, así que lo interviene solo personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 las botoneras e indicadores de piso cuelgan de un cable de comunicación, y cada botonera se registra desde la cabina cuando se instala. En la pantalla del armario, el indicador IRTS abierto avisa que hay al menos una puerta de piso abierta.",
    "movilift": "La placa BR200 es de conexión paralela, con un cable por cada llamada, y está pensada para modernizaciones. Si la cerradura de un piso no cierra después de cuatro intentos, marca un error con el número de ese piso: ERR 05 es el piso 5."
  },
  "dato": "En un tablero antiguo cada botón tiene su propio hilo; en uno moderno todos los pisos comparten un par de hilos de comunicación."
});

ASC.def("iluminacion_hueco", {
  "nombre": "Iluminación del hueco",
  "alias": ["luz de pasadizo", "luz del ducto", "alumbrado del hueco"],
  "ingles": "hoistway lighting",
  "resumen": "Luminarias fijas a lo alto del hueco para que el técnico vea dónde pisa y qué toca.",
  "queHace": "Alumbra el hueco cuando hay que revisarlo. El hueco es un tubo cerrado y sin ventanas: sin esta luz, el técnico trabajaría a ciegas sobre el techo de la cabina o en el foso. Se prende y se apaga desde dos sitios, cerca del tablero y en el foso. Tiene un circuito propio, separado de la fuerza del ascensor.",
  "dondeVa": "Repartida por una pared del hueco, de abajo arriba, con una luminaria en el foso y otra en la parte más alta. Sus interruptores están junto al tablero y en el foso, cerca de la puerta del piso más bajo.",
  "porTipo": {
    "mr": "El interruptor de arriba está en el cuarto de máquinas, que tiene su propia luz aparte.",
    "mrl": "La parte alta del hueco necesita buena luz porque ahí están la máquina y el limitador; el interruptor de arriba suele ir en el armario del último piso.",
    "hid": "Lo que más importa es alumbrar bien el foso y el costado del pistón, que es donde se busca el aceite."
  },
  "pista": "Sin ellas, el técnico trabajaría a oscuras entre las cuatro paredes del pozo.",
  "comoReconocer": [
    "Luminarias herméticas tipo tortuga o tubos LED con tapa, atornilladas a la pared cada pocos metros.",
    "Un tubo o un cable sube de una a otra, aparte de la canaleta de señales.",
    "En el foso, junto al stop, hay un interruptor de luz común y corriente. Hay otro igual cerca del tablero.",
    "Cuando está prendida se nota desde el pasillo: una raya de luz por las rendijas de la puerta del ascensor.",
    "En el tablero tiene su propia llave térmica, rotulada como luz de hueco o de pozo."
  ],
  "fallas": [
    { "sintoma": "Tramos del hueco a oscuras", "causa": "Focos o tubos quemados, o luminarias flojas por la vibración", "revisar": "Cada luminaria, de abajo arriba, y sus conexiones" },
    { "sintoma": "No prende ninguna", "causa": "Saltó su llave térmica o falló uno de los dos interruptores", "revisar": "La llave del circuito de luz de hueco en el tablero y los dos interruptores" },
    { "sintoma": "La llave salta al prender, o la luz del foso parpadea", "causa": "Humedad dentro de una luminaria o de una caja, casi siempre en el foso", "revisar": "Si hay agua en el foso y si las luminarias de abajo tienen la tapa bien cerrada" }
  ],
  "seguridad": "Un hueco mal iluminado es una condición insegura para quien trabaja adentro: se reporta y se arregla antes de cualquier otro trabajo. Al hueco, al foso y al techo de cabina solo entra personal técnico capacitado.",
  "marcas": {
    "schindler": "El manual del 3300 pide que el hueco y sus accesos estén bien iluminados en todo momento, pone la luz del hueco en la lista de revisión periódica y trata una luminaria malograda como condición insegura que se debe reportar. La luz frente al armario de control del último piso la pone el edificio."
  },
  "dato": "Aunque bajen el interruptor principal del ascensor, esta luz sigue funcionando, porque tiene su propia llave."
});

ASC.def("caja_techo", {
  "nombre": "Caja de conexiones de cabina",
  "alias": ["caja de techo", "caja de paso de cabina", "bornera de cabina", "unidad de cabina"],
  "ingles": "car top junction box",
  "resumen": "Caja sobre el techo de cabina donde se enchufa todo lo eléctrico de la cabina al cable viajero.",
  "queHace": "Es el punto de reunión de los cables de la cabina. Ahí llega el cable viajero que viene del tablero, y de ahí salen los cables hacia el operador de puertas, la cortina luminosa, la botonera de cabina, los sensores de posición, el pesacargas, la luz y la alarma. En los equipos modernos trae adentro una tarjeta electrónica que junta todas esas señales y las manda al tablero por un cable de comunicación de pocos hilos.",
  "dondeVa": "Sobre el techo de la cabina, atornillada al techo o al cabezal del bastidor, cerca de la botonera de inspección y del operador de puertas.",
  "porTipo": {
    "mr": "En equipos antiguos es una caja grande llena de borneras, con un hilo por cada botón y cada señal.",
    "mrl": "Caja compacta con tarjeta electrónica y conectores enchufables, que habla con el armario del último piso por un cable de comunicación.",
    "hid": "Por fuera es igual a la de un ascensor de tracción; lo que cambia es que el tablero al que le habla está abajo, junto a la central."
  },
  "pista": "Donde el cable que cuelga de la cabina reparte sus hilos.",
  "comoReconocer": [
    "Caja gris de plástico o de plancha, del tamaño de una caja de zapatos o algo más, con tapa atornillada o a presión.",
    "Le entran muchos cables por abajo y por los costados, cada uno con su prensaestopa o su conector.",
    "Uno de ellos es el cable viajero, plano y ancho, que sube desde debajo de la cabina por un costado.",
    "Adentro hay hileras de borneras numeradas, o una tarjeta con conectores enchufables y luces LED.",
    "Está al lado de la botonera de inspección, y a veces las dos vienen en un mismo cuerpo. Se ve solo desde el techo de cabina, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "Varias cosas de la cabina fallan a la vez: botonera muerta, puerta que no responde, sin lectura de piso", "causa": "La caja perdió alimentación o comunicación con el tablero: conector del cable viajero flojo, fusible o tarjeta", "revisar": "Las luces LED de la tarjeta y los conectores del cable viajero" },
    { "sintoma": "Fallas que aparecen con el movimiento y se van solas", "causa": "Borne mal ajustado o conector que se afloja con la vibración", "revisar": "El ajuste de las borneras y que cada conector esté metido hasta el fondo" },
    { "sintoma": "Fallas después de una limpieza, una filtración o una obra en el edificio", "causa": "Agua o polvo de cemento dentro de la caja, casi siempre porque quedó sin tapa", "revisar": "La tapa, los pases de cable y si hay humedad o sulfato adentro" },
    { "sintoma": "El tablero marca error de comunicación con la cabina", "causa": "Cable de comunicación dañado o tarjeta de cabina malograda", "revisar": "El código de error, el cable y la alimentación de la tarjeta" }
  ],
  "seguridad": "Por esta caja pasan contactos de la serie de seguridades, como el de la puerta de cabina y el del paracaídas. Está en el techo de cabina, donde solo trabaja personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 se llama unidad de cabina (CCU) y lleva la placa SDIC7x, que habla por bus CAN con el armario del último piso. A esa placa llegan las fotocélulas de piso PHS y la señal del pesacargas.",
    "movilift": "En sus tableros con comunicación serial, la tarjeta que va sobre la cabina se llama COP: recoge llamadas, sensores, fotocélula, sobrecarga y mandos del operador de puertas, y se une a la placa BR200 por un cable CAN de cuatro hilos. Mide 145 por 85 mm."
  },
  "dato": "Cuando falla una sola cosa de la cabina, el problema suele estar en esa pieza; cuando fallan varias a la vez, el técnico mira primero esta caja y el cable viajero."
});

ASC.def("baranda_techo", {
  "nombre": "Baranda de techo de cabina",
  "alias": ["barandilla", "balaustrada", "baranda de seguridad"],
  "ingles": "car top balustrade (guard rail)",
  "resumen": "Baranda sobre el techo de la cabina que evita que el técnico caiga al vacío del hueco.",
  "queHace": "El techo de la cabina es la plataforma desde donde el técnico revisa el hueco. Si entre el borde del techo y la pared queda un espacio por donde cabe una persona, la baranda cierra ese lado. Tiene un pasamanos arriba, una barra a media altura y un zócalo abajo, que impide que una herramienta ruede y caiga.",
  "dondeVa": "En el borde del techo de la cabina, solo en los lados donde hay vacío. Del lado de la puerta no lleva, porque ahí la pared del hueco queda pegada.",
  "porTipo": {
    "mr": "Con el contrapeso al fondo, la más común va atrás; si la cabina queda lejos de las paredes laterales, también a los costados.",
    "mrl": "Va del lado por donde pasa el contrapeso; en huecos con poca altura arriba es plegable y se levanta solo para trabajar.",
    "hid": "No hay contrapeso, así que depende solo de cuánto vacío deja la cabina hacia cada pared."
  },
  "pista": "Protege de una caída a quien trabaja parado sobre la cabina.",
  "comoReconocer": [
    "Tubos o perfiles de acero pintados de amarillo, o galvanizados, atornillados al borde del techo.",
    "Llega más o menos a la cintura de una persona parada sobre la cabina.",
    "Abajo lleva un zócalo de plancha de unos diez centímetros de alto.",
    "Suele tener un letrero que advierte el peligro de asomarse o apoyarse hacia afuera.",
    "Las plegables tienen bisagras o tramos telescópicos, un seguro y un contacto eléctrico con su cable."
  ],
  "fallas": [
    { "sintoma": "Vibra o suena a lata durante el viaje", "causa": "Pernos flojos o un tramo plegable sin su seguro", "revisar": "El ajuste de los pernos y los seguros" },
    { "sintoma": "El ascensor no vuelve a servicio normal después de un mantenimiento", "causa": "Baranda plegable que quedó levantada, o su contacto desajustado", "revisar": "La posición de la baranda y el contacto que la vigila" },
    { "sintoma": "Baranda doblada o con un tramo suelto", "causa": "Golpe con una carga o contra algo en la parte alta del hueco", "revisar": "Que siga firme y que no roce nada en todo el recorrido" }
  ],
  "seguridad": "Es una protección contra caídas: se mantiene completa y firme, y nadie debe sentarse en ella ni colgarle cargas. Al techo de cabina solo sube personal técnico capacitado.",
  "marcas": {
    "otis": "El Gen360, que no figura en el catálogo peruano, está pensado para hacer el mantenimiento desde dentro de la cabina, sin subir al techo.",
    "schindler": "En el 3300 con poca altura sobre la cabina la baranda es plegable. Un contacto vigila que esté recogida y forma parte de la cadena de seguridad: el equipo no vuelve a marcha normal con la baranda levantada."
  },
  "dato": "Si el techo queda pegado a las paredes por todos sus lados, puede no llevar baranda: no hay por dónde caer."
});

ASC.def("pantalla_contrapeso", {
  "nombre": "Pantalla del contrapeso",
  "alias": ["malla del contrapeso", "protector de contrapeso", "guarda del contrapeso"],
  "ingles": "counterweight screen (counterweight guard)",
  "resumen": "Malla o plancha en el foso que separa al técnico del sitio por donde baja el contrapeso.",
  "queHace": "Cuando la cabina sube, el contrapeso baja, y con la cabina en el último piso el contrapeso llega casi hasta el fondo del foso. Pesa tanto como la cabina más cerca de la mitad de la carga que ella puede llevar, y se mueve casi sin ruido. La pantalla marca y cierra su carril para que quien trabaja en el foso no quede debajo ni meta un brazo en su camino.",
  "dondeVa": "En el foso, delante de las guías del contrapeso. Empieza cerca del piso y sube hasta pasar la altura de una persona.",
  "porTipo": {
    "mr": "Al fondo del foso, porque el contrapeso corre por detrás de la cabina.",
    "mrl": "A un costado del foso, del lado por donde pasa el contrapeso."
  },
  "pista": "Reja en el fondo del pozo que cierra el carril de las pesas.",
  "comoReconocer": [
    "Plancha perforada o malla de acero, rígida, pintada de amarillo o galvanizada.",
    "Tan ancha como el contrapeso o un poco más, y más alta que una persona.",
    "Va atornillada a las guías del contrapeso o a soportes en la pared, con el amortiguador del contrapeso justo detrás.",
    "La malla deja ver hacia adentro, para mirar el contrapeso y su amortiguador sin acercarse.",
    "Se ve solo desde el foso, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "Roce o golpe metálico abajo cuando la cabina llega a los pisos altos", "causa": "Pantalla floja o doblada que toca el contrapeso al pasar", "revisar": "Las fijaciones y la separación entre la pantalla y el contrapeso" },
    { "sintoma": "La pantalla está apoyada en la pared o no está", "causa": "La retiraron para un trabajo y no la volvieron a poner", "revisar": "Es una condición insegura: se reporta para que la repongan antes del siguiente trabajo en el foso" },
    { "sintoma": "Óxido y pintura levantada en la parte baja", "causa": "Humedad o agua empozada en el foso", "revisar": "De dónde viene el agua y cuánto avanzó el óxido en los soportes" }
  ],
  "seguridad": "Separa al técnico de una masa que baja sin avisar, por eso tiene que estar siempre puesta y firme. El foso es zona exclusiva de personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 el técnico comprueba, con la cabina en el último piso, que entre el contrapeso y su amortiguador queden de 40 a 80 mm. Ese punto queda justo detrás de la pantalla."
  },
  "dato": "Con los años las fajas y los cables se estiran y el contrapeso baja cada vez un poco más; por eso se vigila cuánto le falta para tocar su amortiguador."
});

ASC.def("monitor_fajas", {
  "nombre": "Monitor de fajas",
  "alias": ["monitor de cintas", "RBI", "supervisor de fajas", "detector de faja floja"],
  "ingles": "belt monitoring device",
  "resumen": "Caja electrónica que vigila los cordones de acero dentro de las fajas y avisa si pierden resistencia.",
  "queHace": "Las fajas llevan por dentro cordones de acero tapados por poliuretano, así que el desgaste no se ve desde afuera. El monitor hace pasar una corriente muy pequeña por esos cordones y mide cuánto les cuesta dejarla pasar: si un cordón se gasta o se corta, la medida cambia y el equipo avisa o saca el ascensor de servicio. A su lado va el contacto de faja floja, un microswitch con una palanca que se dispara si una faja pierde tensión y abre la serie de seguridades.",
  "dondeVa": "Arriba del hueco, en el amarre fijo donde terminan las fajas. La caja se conecta a la punta sobrante de cada faja con unos conectores que muerden la cinta.",
  "porTipo": {
    "mrl": "Solo existe en ascensores de fajas planas: va junto a los amarres de arriba, cerca de la máquina, con un cable que lo une al tablero."
  },
  "pista": "Mide con electricidad la salud del acero escondido en las cintas.",
  "comoReconocer": [
    "Caja chica de plástico o metal, como un libro de bolsillo, con luces indicadoras.",
    "De ella salen cables cortos hasta unos conectores apretados en la punta de cada faja, después del amarre.",
    "Otro cable, más largo, la une con el tablero.",
    "Al lado hay una palanca basculante con un microswitch: es el contacto de faja floja.",
    "Está en la parte alta del hueco y se ve solo desde el techo de cabina, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor queda fuera de servicio con aviso de fajas y no acepta rearme", "causa": "El monitor midió pérdida de resistencia: cordones gastados o rotos por dentro", "revisar": "El técnico recorre las fajas a todo lo largo buscando polvo rojizo, grietas o cordones a la vista, y programa el cambio del juego completo" },
    { "sintoma": "Aviso del monitor con las fajas en buen estado", "causa": "Conector flojo o sucio en la punta de una faja, o cable de comunicación dañado", "revisar": "Los conectores sobre las fajas y el cable entre el monitor y el tablero" },
    { "sintoma": "No se mueve ni en inspección y el tablero marca serie de seguridades abierta", "causa": "Actuó el contacto de faja floja: una faja perdió tensión o la palanca quedó desajustada", "revisar": "Que todas las fajas tengan una tensión parecida y la posición de la palanca" },
    { "sintoma": "El tablero avisa que las fajas se acercan al fin de su vida", "causa": "El contador de viajes o los años de uso llegaron al límite de aviso", "revisar": "La fecha de instalación de las fajas y el contador, para programar el cambio" }
  ],
  "seguridad": "Es un dispositivo de seguridad: si avisa, las fajas se revisan y se cambian, y nunca se anula para seguir en servicio. Lo atiende solo personal técnico capacitado.",
  "marcas": {
    "otis": "Se llama Pulse y vigila las 24 horas los hilos de acero de las cintas del Gen2; si encuentra una anomalía, avisa a los técnicos. La web del distribuidor peruano lo llama sistema RBI, sigla en inglés de inspección basada en resistencia.",
    "schindler": "El dispositivo se llama STM-MD; si el equipo lo mantiene una empresa distinta de Schindler, el manual le da dos caminos: conseguirlo o cambiar todas las fajas a los 3 millones de viajes o a los 15 años. El contacto de faja floja abre la cadena de seguridad y la cabina no se mueve ni en inspección."
  },
  "dato": "Un criterio norteamericano para fajas recubiertas dice que, si el monitor detecta poca resistencia, la cabina para en el siguiente piso y no vuelve a servicio hasta cambiar las fajas."
});

ASC.def("gancho_izaje", {
  "nombre": "Gancho de izaje",
  "alias": ["gancho de montaje", "viga de izaje", "cáncamo", "monorriel"],
  "ingles": "lifting hook (hoisting beam)",
  "resumen": "Gancho o viga de acero en lo más alto, para izar la máquina y otras piezas pesadas.",
  "queHace": "Trabaja solo en el montaje y en las reparaciones grandes; durante el viaje normal no hace nada. De él se cuelga un tecle para subir la máquina, las guías, el pistón o el bastidor, que nadie puede levantar a pulso. Se queda puesto para siempre, porque el día que haya que cambiar la máquina se vuelve a usar.",
  "dondeVa": "En el techo del hueco o del cuarto de máquinas, empotrado en la losa o en una viga, encima de donde va la máquina.",
  "porTipo": {
    "mr": "En el techo del cuarto de máquinas, sobre la máquina; a veces es una viga carril por donde corre el tecle.",
    "mrl": "En la losa que tapa el hueco, encima de la máquina que va sobre las guías.",
    "hid": "En lo alto del hueco, del lado del pistón: de ahí se cuelga el cilindro para pararlo durante el montaje."
  },
  "pista": "Punto fuerte en el techo del que se cuelga el tecle.",
  "comoReconocer": [
    "Gancho o argolla de acero grueso, como un dedo pulgar o más, que sale del concreto del techo.",
    "En otros edificios es una viga de acero en doble T atravesada de pared a pared.",
    "Tiene su carga máxima en kilos, pintada o en una plaquita.",
    "Suele estar pintado de amarillo o rojo para que resalte.",
    "En un cuarto de máquinas lo ves mirando al techo; en un MRL queda dentro del hueco, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "No se lee cuánta carga aguanta", "causa": "Pintaron encima o nunca lo marcaron", "revisar": "Los planos del ascensor o de la obra; sin ese dato no se usa" },
    { "sintoma": "Óxido en el gancho, o concreto fisurado o manchado a su alrededor", "causa": "Filtración de agua desde la azotea o un esfuerzo mayor al previsto", "revisar": "Lo evalúa un especialista antes de volver a colgar algo" },
    { "sintoma": "Para cambiar la máquina hubo que armar soportes provisionales", "causa": "El gancho no existe o quedó lejos del eje de la máquina", "revisar": "Los planos de montaje, que indican dónde debía ir y para cuánta carga" }
  ],
  "seguridad": "Se usa solo para izar cargas, nunca personas, y nunca con más peso del que tiene marcado. Los izajes los hace personal capacitado, con equipo certificado.",
  "marcas": {
    "otis": "La ficha del Gen2 Comfort pide que, cuando la altura sobre el último piso pasa de la indicada en la tabla (4200 o 5000 mm, según la versión), el cliente construya vigas a esa altura para fijar los ganchos del montaje."
  },
  "dato": "En el Perú, al aparejo de cadena que se cuelga de este gancho le dicen tecle."
});

ASC.def("recoge_aceite", {
  "nombre": "Recolector de aceite",
  "alias": ["anillo recolector", "colector de goteo", "recuperador de aceite", "bandeja de goteo"],
  "ingles": "oil collector ring (drip ring)",
  "resumen": "Aro en la boca del cilindro que junta el aceite que escurre del vástago y lo lleva a un recipiente.",
  "queHace": "Cada vez que el vástago sale del cilindro arrastra una película muy fina de aceite, y una parte escurre por la cabeza del cilindro. Este aro la junta antes de que chorree por fuera y la manda por una manguerita a un recipiente en el foso. También sirve de medidor: si el recipiente tarda meses en juntar un poco, los sellos están bien; si se llena rápido, están gastados.",
  "dondeVa": "En la punta de arriba del cilindro, alrededor del vástago, justo donde el tubo cromado sale del cuerpo pintado. La manguerita baja pegada al cilindro hasta el foso.",
  "porTipo": {
    "hid": "Solo existe en los hidráulicos; con pistón lateral el aro queda más o menos a media altura del recorrido, y el recipiente abajo, junto a la base del cilindro."
  },
  "pista": "Junta las gotas que resbalan por el tubo cromado.",
  "comoReconocer": [
    "Aro o collar de metal o plástico, con forma de canaleta, que rodea el vástago cromado en la cabeza del cilindro.",
    "De un costado le sale una manguerita delgada, casi siempre transparente, sujeta al cilindro con cintillos.",
    "La manguerita termina en una botella, galonera o balde con tapa en el piso del foso.",
    "El aceite que junta es amarillento cuando está limpio y oscuro cuando ya trae suciedad.",
    "El recipiente se ve desde el foso y el aro desde el techo de cabina, zonas del técnico."
  ],
  "fallas": [
    { "sintoma": "El recipiente se llena en pocas semanas", "causa": "Sellos de la cabeza del cilindro gastados o vástago rayado", "revisar": "El vástago, que debe verse liso y brillante, y el estado de los sellos" },
    { "sintoma": "Aceite chorreado por fuera del cilindro y charco en el foso", "causa": "Manguerita tapada, doblada o suelta, o recipiente rebalsado", "revisar": "Que la manguerita esté libre y bien metida, y el nivel del recipiente" },
    { "sintoma": "La cabina se asienta sola unos milímetros y renivela seguido", "causa": "El aceite se escapa: por los sellos, y se ve aquí, o por una válvula que no cierra, y aquí no se ve", "revisar": "Si el aro y el recipiente tienen aceite fresco; si están secos, se mira el bloque de válvulas" },
    { "sintoma": "El nivel del tanque baja con los meses", "causa": "Aceite que se fue al recipiente y no se repuso en la central", "revisar": "El nivel de la central y cuánto hay en el recipiente" }
  ],
  "seguridad": "El aceite en el piso del foso es riesgo de resbalón y de incendio, y contamina: el aceite usado se entrega como residuo, nunca al desagüe. El foso es zona de personal técnico capacitado.",
  "marcas": {
    "movilift": "En tableros con placa BR200, seis renivelaciones seguidas dan Err 67 o 68. Es la pista eléctrica de lo mismo que muestra este recipiente: el aceite se está yendo por una fuga o por una válvula que no cierra."
  },
  "dato": "Un vástago apenas brillante de aceite es normal: esa película es la que lubrica los sellos."
});
