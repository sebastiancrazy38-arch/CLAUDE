/* Taller de Ascensores. Contenido: bastidor, cabina y sus accesorios, y equipo de foso. */

ASC.def("bastidor", {
  "nombre": "Bastidor de cabina",
  "alias": ["arcata", "chasis de cabina", "estribo"],
  "ingles": "car frame (sling)",
  "resumen": "Marco de acero que carga la cabina y la une a las guías y a los cables.",
  "queHace": "Es el esqueleto que sostiene todo. La cabina que conoces por dentro es una caja liviana apoyada sobre este marco, y es el marco el que cuelga de los cables o cintas. En él se atornillan las rozaderas, el paracaídas y los amarres o poleas. Entre el marco y la plataforma van unos tacos de goma que cortan la vibración.",
  "dondeVa": "Rodea la cabina por fuera: dos largueros verticales a los lados, un cabezal arriba y otro abajo. Queda dentro del hueco, así que desde el pasillo no lo ves.",
  "porTipo": {
    "mr": "Marco cerrado alrededor de la cabina, con los cables amarrados al cabezal de arriba, justo al centro.",
    "mrl": "Marco cerrado con dos poleas colgadas del cabezal de abajo, por donde pasan las cintas que lo sostienen.",
    "hid": "Es tipo mochila: una L de acero pegada a las dos guías del mismo lado, con la cabina en voladizo y los cables amarrados del lado de las guías."
  },
  "pista": "El esqueleto de acero que abraza la cabina y corre por las guías.",
  "comoReconocer": [
    "Perfiles de acero gruesos, en U o en C, pintados de negro, gris o del color de la marca.",
    "Dos largueros verticales un poco más altos que la cabina, unidos arriba y abajo por cabezales.",
    "En las cuatro esquinas lleva las rozaderas y abajo, pegado a las guías, el paracaídas.",
    "En el hidráulico tipo mochila todo el fierro queda de un solo lado, junto a las guías y el pistón.",
    "Se ve desde el techo de cabina o desde el foso, zonas donde solo entra el técnico."
  ],
  "fallas": [
    { "sintoma": "La cabina vibra o suena a lata cuando arranca o frena", "causa": "Tacos de goma entre la plataforma y el bastidor vencidos, o pernos flojos", "revisar": "El estado de los tacos de aislamiento y el ajuste de los pernos del marco" },
    { "sintoma": "La cabina queda inclinada y su pisadera no empata pareja con la del piso", "causa": "Bastidor descuadrado o tensores de la plataforma desajustados; pasa más en los tipo mochila, por la carga en voladizo", "revisar": "El nivel de la plataforma y el juego de las rozaderas de arriba y de abajo" },
    { "sintoma": "Crujidos cuando entra o sale gente", "causa": "Uniones del bastidor con juego o plataforma que roza contra el marco", "revisar": "Los apoyos de la plataforma y las uniones atornilladas" }
  ],
  "seguridad": "Es pieza estructural: de ella cuelga toda la cabina. Cualquier ajuste o reparación la hace personal técnico capacitado.",
  "marcas": {
    "otis": "En los Gen2 Switch y Flex+, variantes que no figuran en el catálogo peruano, hay dos formas: cintas que pasan por debajo de la cabina, o bastidor en voladizo (cantilever), parecido al tipo mochila."
  },
  "dato": "En campo vas a oír que le dicen arcata, palabra que viene de los manuales italianos."
});

ASC.def("rozaderas", {
  "nombre": "Rozaderas",
  "alias": ["zapatas guía", "guiadores", "deslizaderas", "rodaderas"],
  "ingles": "guide shoes",
  "resumen": "Cuatro zapatas en las esquinas del bastidor que abrazan la guía y mantienen la cabina derecha.",
  "queHace": "Hacen que la cabina suba y baje pegada a las guías, sin balancearse ni rozar las paredes. Cada una tiene una pieza en U forrada con un inserto de plástico duro (nylon o poliuretano) que desliza sobre la guía. El peso lo cargan los cables; las rozaderas solo mantienen la cabina en su carril. En ascensores rápidos se cambian por rodaderas: juegos de tres ruedas con resorte que ruedan sobre la guía.",
  "dondeVa": "Dos arriba y dos abajo, en las esquinas del bastidor, una en cada punta de larguero. El contrapeso lleva las suyas, más chicas.",
  "porTipo": {
    "mr": "Deslizantes con aceitera encima en los equipos comunes; en edificios altos y rápidos vas a encontrar las de ruedas.",
    "mrl": "Casi siempre deslizantes con inserto de plástico, dos arriba y dos abajo del bastidor.",
    "hid": "En el bastidor mochila trabajan más forzadas porque la cabina va en voladizo, y por eso se gastan antes."
  },
  "pista": "Cuatro piezas en U que abrazan el riel en las esquinas del marco.",
  "comoReconocer": [
    "Bloque de fierro del tamaño de un puño o un poco más, con una ranura en U donde entra la guía.",
    "Dentro de la ranura, un inserto de plástico blanco, amarillo, verde o negro.",
    "Muchas llevan encima una aceitera: un vasito con mecha de fieltro que moja la guía.",
    "Las de ruedas tienen tres rueditas de goma o poliuretano por cada guía.",
    "Están en el techo de cabina y debajo de ella, a la vista solo del técnico."
  ],
  "fallas": [
    { "sintoma": "La cabina se bambolea o da golpecitos de costado durante el viaje", "causa": "Insertos gastados: quedó mucho juego entre la zapata y la guía", "revisar": "La holgura de cada rozadera contra la guía y el espesor del inserto" },
    { "sintoma": "Chirrido o roce seco que acompaña todo el recorrido", "causa": "Guía sin aceite, aceitera vacía o inserto gastado hasta el metal", "revisar": "El nivel de las aceiteras, la mecha y si la guía se ve seca o rayada" },
    { "sintoma": "Golpe seco siempre a la misma altura del hueco", "causa": "Empalme de guía desalineado que la zapata siente al pasar", "revisar": "Los empalmes y fijaciones de la guía en ese punto" },
    { "sintoma": "Con ruedas: zumbido o traqueteo que crece con la velocidad", "causa": "Rueda ovalada, con la goma picada o con el rodamiento malo", "revisar": "La banda de rodadura y el giro libre de cada rueda" }
  ],
  "seguridad": "El tipo y la cantidad de aceite en la guía cambian la forma en que frena el paracaídas. Por eso la lubricación la decide el técnico.",
  "marcas": {
    "schindler": "En el plan de revisión del 3300 las zapatas son punto fijo, y el manual pide guías limpias de óxido y apenas aceitadas (aceite HLP68)."
  },
  "dato": "Las de ruedas trabajan con la guía seca; las deslizantes necesitan una película fina de aceite."
});

ASC.def("paracaidas", {
  "nombre": "Paracaídas",
  "alias": ["cuñas", "bloque paracaídas", "freno de seguridad"],
  "ingles": "safety gear",
  "resumen": "Freno mecánico bajo la cabina que la clava a las guías si baja demasiado rápido.",
  "queHace": "Es lo que impide que la cabina caiga. Si la cabina pasa de la velocidad permitida, el limitador traba su cable, el cable jala una palanca y esa palanca mete unas cuñas o rodillos entre el bloque y la guía. Mientras más quiere bajar la cabina, más aprieta. Funciona sin electricidad, y al mismo tiempo un contacto corta la maniobra.",
  "dondeVa": "Debajo del bastidor, un bloque por cada guía, unidos por una barra para que los dos muerdan a la vez. En algunos equipos va arriba, en el cabezal superior.",
  "porTipo": {
    "mr": "Bajo el cabezal inferior del bastidor; en equipos lentos y antiguos suele ser instantáneo, en los más rápidos progresivo.",
    "mrl": "Progresivo, bajo el bastidor y cerca de las poleas de las cintas; algunos modelos también frenan en subida.",
    "hid": "Bajo el bastidor mochila, con los dos bloques del mismo lado; hace falta porque la cabina cuelga de cables y un cable se puede romper."
  },
  "pista": "Dos bloques con mordazas que clavan la cabina a los rieles si cae.",
  "comoReconocer": [
    "Dos bloques macizos de acero, del tamaño de un ladrillo, uno abrazando cada guía.",
    "Dentro del bloque, cuñas o rodillos con estrías a milímetros de la guía, sin tocarla.",
    "Una barra horizontal une los dos bloques y termina en una palanca.",
    "A esa palanca llega amarrado el cable delgado del limitador.",
    "Cerca tiene un contacto eléctrico y una placa con sus datos; se ve solo desde el foso o el techo de cabina."
  ],
  "fallas": [
    { "sintoma": "La cabina queda clavada entre pisos y no se mueve ni para arriba ni para abajo", "causa": "El paracaídas actuó, por exceso de velocidad real o por un limitador o cable del limitador en mal estado", "revisar": "El técnico mira primero el limitador, su cable y las marcas que quedaron en la guía antes de liberar la cabina" },
    { "sintoma": "Roce metálico o chillido en un tramo del recorrido", "causa": "Cuña o rodillo demasiado cerca de la guía, o varillaje desajustado", "revisar": "La separación entre las cuñas y la guía a ambos lados" },
    { "sintoma": "El ascensor no arranca y el tablero marca cadena de seguridades abierta", "causa": "Contacto del paracaídas accionado o desajustado, aunque las cuñas no hayan mordido", "revisar": "La posición de la palanca y su contacto eléctrico" },
    { "sintoma": "En la prueba periódica un lado muerde antes que el otro", "causa": "Barra de unión con juego, cuñas con desgaste desigual o guía sucia", "revisar": "El varillaje, la limpieza de la guía y el estado de las cuñas" }
  ],
  "seguridad": "Es el componente de seguridad más importante de la cabina. Viene regulado y precintado de fábrica, y solo lo prueba, ajusta o libera personal técnico capacitado.",
  "marcas": {
    "otis": "Si debajo del foso hay un espacio donde entra gente, Otis pide que el contrapeso del Gen2 lleve su propio paracaídas, o un pilar bajo el foso hasta suelo firme.",
    "schindler": "En el 3300 es el SA GED, progresivo, que frena en bajada y también en subida. El manual pide guías sin óxido ni suciedad y apenas aceitadas."
  },
  "dato": "El instantáneo frena de golpe y solo se usa en ascensores lentos; el progresivo frena deslizando, más suave."
});

ASC.def("cabina", {
  "nombre": "Cabina",
  "alias": ["carro", "coche"],
  "ingles": "car",
  "resumen": "La caja donde viajas: plataforma, paneles, techo, luz y pasamanos, montada sobre el bastidor.",
  "queHace": "Te lleva encerrado y protegido de un piso a otro. Es una caja de planchas metálicas atornilladas: el piso (plataforma), tres paredes de paneles, el techo y el frente con la puerta. Todo su peso descansa en el bastidor a través de tacos de goma. El techo además le sirve al técnico de plataforma de trabajo, por eso es firme y en muchos equipos lleva baranda.",
  "dondeVa": "Dentro del bastidor, apoyada sobre el cabezal inferior. Es la única parte del ascensor que conoces por dentro.",
  "porTipo": {
    "mr": "Centrada en el hueco, con el contrapeso pasando por detrás de la pared del fondo.",
    "mrl": "Igual por dentro; por fuera lleva las poleas debajo del piso y el contrapeso le pasa por un costado.",
    "hid": "Va en voladizo sobre el bastidor mochila, con las guías y el pistón a un solo lado y sin contrapeso."
  },
  "pista": "La caja con paredes, techo y luz donde entran los pasajeros.",
  "comoReconocer": [
    "Por dentro: paneles de acero inoxidable, fórmica o pintura, espejo, pasamanos y piso de vinílico, granito o porcelanato.",
    "Fíjate en la placa cerca de la botonera: dice la carga máxima en kilos y el número de personas.",
    "El techo falso con luces LED tapa el techo real, que es una plancha de acero.",
    "Por fuera es plancha gris sin acabado, con refuerzos doblados y cables amarrados.",
    "Arriba lleva el operador de puertas, la caja de inspección y a veces un ventilador."
  ],
  "fallas": [
    { "sintoma": "Los paneles zumban o vibran durante el viaje", "causa": "Tornillos flojos entre paneles, o espejo y pasamanos sueltos", "revisar": "El ajuste de las uniones de los paneles y de los accesorios atornillados" },
    { "sintoma": "La luz parpadea o se apaga una parte del techo", "causa": "Luminaria LED o su fuente al final de su vida, o falso contacto en el cableado", "revisar": "La fuente de las luces y sus bornes en la caja del techo" },
    { "sintoma": "El piso suena hueco, se hunde o está levantado en un punto", "causa": "Acabado despegado o base de la plataforma dañada por humedad", "revisar": "El pegado del piso y el estado de la plancha o madera de base" },
    { "sintoma": "Ventilador ruidoso o que ya no bota aire", "causa": "Rodamiento gastado o rejilla tapada de polvo", "revisar": "El giro del ventilador y la limpieza de las rejillas" }
  ],
  "seguridad": "Respeta la carga de la placa. El techo de la cabina es zona de trabajo del técnico y nadie más debe subir ahí.",
  "marcas": {
    "schindler": "En el 3300 hay sobre el techo una caja llamada unidad de cabina (CCU), con la placa que enlaza la cabina con el tablero.",
    "movilift": "Para el home lift DIVAS el fabricante pide un espacio mínimo de 90 x 90 cm, suficiente para dos personas."
  },
  "dato": "Si cambias el piso por uno más pesado, por ejemplo granito, hay que volver a ajustar el contrapeso y el pesacargas."
});

ASC.def("poleas_cabina", {
  "nombre": "Poleas bajo cabina",
  "alias": ["poleas de suspensión", "poleas de reenvío", "poleas de cabina"],
  "ingles": "car sheaves (underslung)",
  "resumen": "Dos poleas bajo el piso de la cabina por donde pasan las cintas que la sostienen.",
  "queHace": "En la suspensión 2:1 la cabina va sentada sobre las cintas, como en un columpio. Las cintas bajan desde un amarre fijo arriba, pasan por debajo de la cabina apoyadas en estas dos poleas y vuelven a subir hacia la máquina. Así la máquina carga la mitad del peso y puede ser más chica. A cambio, las cintas recorren el doble de lo que sube la cabina.",
  "dondeVa": "Debajo de la plataforma, colgadas del cabezal inferior del bastidor, una hacia cada lado. Van tapadas con una guarda de chapa.",
  "porTipo": {
    "mrl": "Son propias de este tipo: en el modelo, tres cintas planas cruzan bajo el piso apoyadas en las dos poleas."
  },
  "pista": "Dos ruedas bajo el piso por donde cruzan las cintas de lado a lado.",
  "comoReconocer": [
    "Con cintas planas parecen rodillos anchos de poco diámetro; con cables redondos son ruedas acanaladas bastante más grandes.",
    "Giran sobre rodamientos sellados dentro de un soporte de acero atornillado al bastidor.",
    "Llevan una guarda de chapa para que la cinta no se salga y nada se meta.",
    "Las cintas entran por un lado, cruzan por debajo del piso y salen por el otro.",
    "Solo se ven desde el foso, que es zona del técnico."
  ],
  "fallas": [
    { "sintoma": "Zumbido o ronquido debajo del piso que sube con la velocidad", "causa": "Rodamiento de una polea gastado", "revisar": "El giro libre y el ruido de cada polea, y si hay juego en el eje" },
    { "sintoma": "Chirrido y polvillo oscuro o rojizo bajo la cabina", "causa": "Cinta que corre de costado y roza la guarda o el borde de la polea", "revisar": "La alineación de las poleas y los bordes de las cintas" },
    { "sintoma": "Vibración que se siente en los pies durante el viaje", "causa": "Polea con desgaste desigual, suciedad pegada o tensión distinta entre cintas", "revisar": "La superficie de las poleas y que todas las cintas tengan la misma tensión" }
  ],
  "seguridad": "Entre la cinta y la polea hay un punto de atrapamiento. Por eso llevan guarda y solo las revisa personal técnico.",
  "marcas": {
    "otis": "En los Gen2 Switch y Flex+, de suspensión 2:1 y que no figuran en el catálogo peruano, las cintas pasan por debajo de la cabina; Otis lo llama suspensión inferior (underslung en inglés).",
    "schindler": "El manual del 3100 y 3300 habla de poleas bajo la cabina y en el contrapeso, y admite suspensión 2:1 o 1:1 según el equipo. Sus cintas STM tienen perfil en V."
  },
  "dato": "Con 2:1, por cada metro que sube la cabina pasan dos metros de cinta por la polea de la máquina."
});

ASC.def("botonera_cabina", {
  "nombre": "Botonera de cabina",
  "alias": ["COP", "panel de mando", "pulsadores de cabina"],
  "ingles": "car operating panel (COP)",
  "resumen": "Panel dentro de la cabina donde marcas tu piso, abres o cierras la puerta y pides ayuda.",
  "queHace": "Recibe tus órdenes y las manda al tablero de control por el cable viajero. Cada botón tiene un microinterruptor y una luz que se queda prendida hasta que el ascensor atiende la llamada. Arriba, una pantalla muestra el piso y la flecha de sentido. Detrás del panel suelen ir el parlante y el micrófono del intercomunicador, y el zumbador de sobrecarga.",
  "dondeVa": "En la pared lateral o en el frente de la cabina, al lado de la puerta, a la altura de la mano. En cabinas grandes puede haber dos.",
  "porTipo": {
    "mr": "Igual que en los otros tipos; en equipos antiguos vas a ver botones grandes con foco y una llave de servicio.",
    "mrl": "Suele ser un panel delgado de piso a techo, con pantalla y botones de bajo relieve o táctiles.",
    "hid": "Igual por fuera; como son edificios bajos, tiene pocos botones de piso."
  },
  "pista": "El panel donde eliges a qué piso quieres ir.",
  "comoReconocer": [
    "Placa vertical de acero inoxidable o vidrio, de unos 20 cm de ancho, a veces de piso a techo.",
    "Botones numerados con relieve y braille que se iluminan al presionarlos.",
    "Botones de abrir y cerrar puerta con flechas, y uno de alarma amarillo con una campana.",
    "Pantalla arriba con el número de piso y la flecha.",
    "Rejilla de puntitos del parlante y, a veces, cerraduras para llaves de servicio."
  ],
  "fallas": [
    { "sintoma": "Un botón no marca o no se queda prendido", "causa": "Microinterruptor o LED del pulsador gastado por el uso", "revisar": "Ese pulsador y su conector por detrás del panel" },
    { "sintoma": "Un piso se marca solo, o la puerta no termina de cerrar", "causa": "Botón atascado, hundido o con líquido adentro; pasa mucho con el de abrir puerta", "revisar": "Que todos los botones regresen solos y ninguno esté pegado" },
    { "sintoma": "No responde ningún botón, o la pantalla está apagada o con símbolos raros", "causa": "Falla de comunicación o de alimentación entre la botonera y el tablero", "revisar": "El conector de la botonera, el cable viajero y la fuente" },
    { "sintoma": "El botón de alarma no suena", "causa": "Batería de emergencia agotada, o sirena o pulsador malogrado", "revisar": "La batería y la sirena que están sobre el techo de cabina" }
  ],
  "marcas": {
    "otis": "En el Gen2 Comfort la pantalla se llama MPD (multipantalla digital) o posicional LCD o LED; en el Arise la botonera de cabina es la COP16.",
    "schindler": "Líneas actuales: Linea 100, 300 y 500, Primea 500 y 600. La Linea 100 es de acero inoxidable con indicador de puntos LED rojos; en el 3300 puede ser de cristal táctil o de acero con pulsadores.",
    "movilift": "De acero inoxidable con pulsadores redondos \"Roma\" de 32 mm con braille: la Makalu va sobrepuesta y la Flat Europa empotrada. La placa BR200 avisa cuando el botón de abrir puertas se queda atascado."
  },
  "dato": "En edificios con control de destino marcas tu piso en el hall, y dentro de la cabina casi no hay botones."
});

ASC.def("pesacargas", {
  "nombre": "Pesacargas",
  "alias": ["limitador de carga", "celda de carga", "sensor de sobrecarga", "balanza"],
  "ingles": "load weighing device",
  "resumen": "Sensor que mide cuánto peso lleva la cabina y no la deja salir si está sobrecargada.",
  "queHace": "Mide el peso de los pasajeros y se lo informa al tablero. Si pasas la carga máxima, la puerta se queda abierta, suena un zumbador y se prende el aviso de sobrecarga hasta que alguien baja. Cuando la cabina va casi llena, el ascensor deja de parar en las llamadas de los pisos. En equipos con variador también le dice al motor cuánta fuerza poner antes de soltar el freno, y por eso el arranque sale suave.",
  "dondeVa": "Hay tres lugares típicos: bajo la plataforma de la cabina, en el bastidor o en los amarres de los cables. Su caja electrónica va en el techo de cabina o cerca del tablero.",
  "porTipo": {
    "mr": "Suele ir en los amarres de los cables sobre el bastidor, o entre la plataforma y el bastidor.",
    "mrl": "En el modelo va bajo el piso; en muchos equipos de cintas está arriba, en el amarre fijo de las cintas.",
    "hid": "Bajo la plataforma, o reemplazado por un sensor de presión de aceite en la central."
  },
  "pista": "El sensor que cuenta kilos y avisa cuando sobra gente.",
  "comoReconocer": [
    "Celdas de carga: pastillas o bloquecitos de acero con un cable delgado, entre la plataforma y el bastidor.",
    "En los cables: una pinza metálica que abraza todos los cables juntos cerca del amarre.",
    "Una cajita gris con pantalla de números y botoncitos de calibración.",
    "Desde la cabina lo delatan el letrero de sobrecarga en la pantalla y el zumbador."
  ],
  "fallas": [
    { "sintoma": "Marca sobrecarga con la cabina vacía o con dos personas", "causa": "Sensor descalibrado, o piso nuevo más pesado sin recalibrar", "revisar": "La lectura en vacío en la caja electrónica y el ajuste de cero" },
    { "sintoma": "No avisa aunque la cabina va repleta", "causa": "Sensor dañado, cable cortado o equipo anulado", "revisar": "La señal del sensor y su conexión al tablero" },
    { "sintoma": "Tirón hacia abajo o hacia arriba al arrancar", "causa": "El variador recibe un peso equivocado y calcula mal la fuerza de arranque", "revisar": "La calibración con cabina vacía y con una carga conocida" },
    { "sintoma": "Con la cabina a medio llenar ya no para en los pisos intermedios", "causa": "Umbral de carga completa mal ajustado", "revisar": "Los umbrales de carga completa y de sobrecarga" }
  ],
  "seguridad": "La sobrecarga afecta la tracción y el frenado. Un pesacargas anulado es una falla de seguridad que debe corregir el técnico.",
  "marcas": {
    "schindler": "En el 3300 se llama CLC, la celda de carga de cabina.",
    "movilift": "Su pesacargas se llama Kilo System: mide con sensores bajo la cabina, en los cables o en el bastidor y muestra el peso en vivo. En la placa BR200 las entradas van rotuladas 74 (sobrecarga) y CC (carga completa)."
  },
  "dato": "La norma EN 81-20 considera sobrecarga cuando se pasa la carga nominal en 10 %, con un mínimo de 75 kg."
});

ASC.def("caja_inspeccion", {
  "nombre": "Botonera de inspección",
  "alias": ["caja de inspección", "botonera de revisión", "mando de techo de cabina"],
  "ingles": "car top inspection station",
  "resumen": "Caja de mandos en el techo de cabina con la que el técnico mueve el ascensor despacio.",
  "queHace": "Le da al técnico el control del ascensor mientras trabaja sobre la cabina. Con el selector en inspección, el ascensor deja de atender llamadas y las puertas ya no se mueven solas. Desde ahí la cabina solo avanza a velocidad lenta y mientras se mantiene apretado el pulsador de subir o de bajar; en los equipos nuevos hay que apretar además un tercer botón común. La seta roja de stop corta todo movimiento.",
  "dondeVa": "Sobre el techo de la cabina, cerca del borde de la puerta, para que el stop quede a la mano. En equipos nuevos hay otra parecida en el foso.",
  "porTipo": {
    "mr": "En el techo de cabina; el tablero del cuarto de máquinas tiene aparte su propio mando para mover la cabina en una emergencia.",
    "mrl": "En el techo de cabina, y es la que más se usa: desde ahí el técnico llega a la máquina, que está arriba del hueco.",
    "hid": "En el techo de cabina, igual que en los de tracción."
  },
  "pista": "Caja amarilla con seta roja desde donde el técnico maneja en lento.",
  "comoReconocer": [
    "Caja de plástico amarilla o gris, del tamaño de una caja de zapatos chica.",
    "Botón rojo tipo hongo (seta) que se queda trabado al presionarlo.",
    "Selector giratorio de dos posiciones: normal e inspección.",
    "Pulsadores de subir y bajar con flechas, y en los nuevos un tercero que se aprieta junto con ellos.",
    "Suele traer un tomacorriente y el interruptor de la luz del hueco; solo la ve el técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor no atiende llamadas y la pantalla marca inspección o fuera de servicio", "causa": "Selector dejado en inspección o stop presionado después de un mantenimiento", "revisar": "El técnico verifica la posición del selector y de la seta de stop" },
    { "sintoma": "En inspección la cabina no se mueve en un sentido", "causa": "Pulsador con el contacto gastado, o un límite de recorrido accionado", "revisar": "Los contactos de los pulsadores y los límites de recorrido" },
    { "sintoma": "El ascensor se para de la nada y luego vuelve a funcionar solo", "causa": "Contacto del stop o del selector flojo, que abre la cadena de seguridades con la vibración", "revisar": "Los bornes y contactos dentro de la caja" }
  ],
  "seguridad": "Solo la usa personal técnico capacitado. La seta de stop es parte de la cadena de seguridades y nunca se anula.",
  "marcas": {
    "otis": "El Gen360, que no figura en el catálogo peruano, se mantiene desde dentro de la cabina, sin subir al techo.",
    "schindler": "En el 3300 con huida o foso reducidos hay además en el techo la palanca del dispositivo TSD21, que saca dos pernos bajo la cabina contra topes en las guías.",
    "movilift": "La placa BR200 tiene en el tablero su propio selector de tres posiciones (MAN, NORM, PROG). En equipos de foso o huida reducidos, al salir de inspección marca acceso al hueco y pide rearme manual."
  },
  "dato": "Mientras esa caja está en inspección, el ascensor ignora las llamadas de los pasajeros y el mando de emergencia del tablero."
});

ASC.def("faldon", {
  "nombre": "Faldón",
  "alias": ["guardapiés", "delantal", "faldón de cabina"],
  "ingles": "toe guard (car apron)",
  "resumen": "Plancha vertical bajo la pisadera de cabina que tapa el vacío si la cabina queda desnivelada.",
  "queHace": "Si la cabina se detiene más arriba que el piso y la puerta se abre, queda una abertura hacia el hueco justo debajo de la cabina. El faldón tapa esa abertura como una pared lisa. Sirve sobre todo en los rescates, cuando sacan pasajeros con la cabina entre pisos. El borde de abajo va doblado hacia adentro para no engancharse con las pisaderas al bajar.",
  "dondeVa": "Colgado bajo la pisadera de la cabina, a todo el ancho de la puerta. Mide unos 75 cm de alto en un ascensor normal.",
  "porTipo": {
    "mr": "Fijo, de unos 75 cm, bajo la pisadera de cabina.",
    "mrl": "Fijo si el foso tiene la profundidad normal; con foso reducido se usa uno retráctil o telescópico.",
    "hid": "Igual que en los demás; en hidráulicos de foso muy bajo es común el retráctil."
  },
  "pista": "Plancha lisa que cuelga bajo el umbral de la cabina.",
  "comoReconocer": [
    "Plancha de acero lisa, gris o galvanizada, del ancho de la puerta.",
    "Cuelga recta hacia abajo desde la pisadera de cabina, como una falda.",
    "El borde inferior está doblado en chaflán hacia el fondo.",
    "Solo lo ves si la cabina queda parada más arriba del piso con la puerta abierta.",
    "Los retráctiles tienen bisagras o tramos que se deslizan, y un contacto eléctrico."
  ],
  "fallas": [
    { "sintoma": "Golpe o raspón metálico al pasar por un piso", "causa": "Faldón doblado o suelto que roza la pisadera del piso", "revisar": "Que esté recto, a plomo y con todos sus pernos" },
    { "sintoma": "Vibra o suena a lata durante el viaje", "causa": "Fijaciones flojas o refuerzos sueltos", "revisar": "El ajuste de los pernos y los refuerzos de atrás" },
    { "sintoma": "Ascensor con faldón retráctil que no arranca", "causa": "El faldón no quedó en su posición o su contacto está desajustado", "revisar": "La posición del faldón y el contacto que la confirma" }
  ],
  "seguridad": "Si la cabina queda entre pisos, no intentes salir por tu cuenta. El espacio bajo la cabina da al hueco y el rescate lo hace personal capacitado.",
  "dato": "Existe por los accidentes en rescates: personas que salían de una cabina parada alta y caían al hueco por debajo."
});

ASC.def("emergencia", {
  "nombre": "Luz de emergencia y alarma",
  "alias": ["alumbrado de emergencia", "timbre de alarma", "intercomunicador", "telealarma"],
  "ingles": "emergency lighting and alarm device",
  "resumen": "Luz a batería, sirena e intercomunicador para que no quedes a oscuras ni incomunicado si falla la energía.",
  "queHace": "Si se corta la luz, una batería enciende sola una luminaria pequeña dentro de la cabina, suficiente para ver la botonera. El botón de alarma hace sonar una sirena y abre comunicación de voz con la portería, el cuarto de máquinas o una central de atención. Todo esto trabaja con su propia batería, aunque el ascensor esté sin energía.",
  "dondeVa": "La luminaria va en el techo de la cabina o dentro de la botonera. La batería y la sirena están arriba, sobre el techo de cabina, y el otro extremo del intercomunicador en la portería o junto al tablero.",
  "porTipo": {
    "mr": "Intercomunicador entre cabina, cuarto de máquinas y portería; la sirena va sobre la cabina.",
    "mrl": "El intercomunicador llega al tablero del último piso, porque desde ahí el técnico hace el rescate.",
    "hid": "Igual que en los demás; el otro extremo del intercomunicador está junto a la central hidráulica."
  },
  "pista": "Lo que alumbra y pide ayuda cuando hay un apagón.",
  "comoReconocer": [
    "Dentro de la cabina: una luz chica aparte de las principales, a veces con un LED verde de carga.",
    "Botón amarillo con una campana en la botonera, y una rejilla de parlante con micrófono.",
    "Sobre el techo de cabina: una sirena o timbre y una caja con batería recargable.",
    "En equipos nuevos, dibujitos que se iluminan: el amarillo dice alarma enviada, el verde alarma atendida."
  ],
  "fallas": [
    { "sintoma": "Se va la luz y la cabina queda totalmente a oscuras", "causa": "Batería de emergencia agotada o luminaria quemada", "revisar": "La batería y su cargador; duran pocos años" },
    { "sintoma": "El botón de alarma no suena", "causa": "Batería descargada, sirena dañada o pulsador malo", "revisar": "La sirena y su alimentación a batería" },
    { "sintoma": "La alarma suena pero nadie contesta, o se oye con mucho ruido", "causa": "Línea telefónica o chip sin servicio, o parlante y micrófono dañados", "revisar": "La línea del intercomunicador y una llamada de prueba" },
    { "sintoma": "La sirena suena sola o a ratos", "causa": "Botón de alarma pegado o cableado con falso contacto", "revisar": "El pulsador de alarma y sus conexiones" }
  ],
  "seguridad": "Si te quedas encerrado, presiona la alarma varios segundos y espera. Dentro de la cabina estás seguro; no fuerces las puertas ni intentes salir.",
  "marcas": {
    "otis": "El monitoreo remoto REM permite hablar con el pasajero atrapado y abre solo la llamada de servicio; Otis aclara que depende de la disponibilidad en cada país.",
    "schindler": "En el 3300 la telealarma se llama ETMA: junta alarma y telemonitoreo, y tiene versión GSM."
  },
  "dato": "La norma EN 81-20 pide que la luz de emergencia aguante al menos una hora encendida."
});

ASC.def("amortiguadores", {
  "nombre": "Amortiguadores",
  "alias": ["topes", "paragolpes", "buffers", "resortes de foso"],
  "ingles": "buffers",
  "resumen": "Topes en el piso del foso que frenan la cabina o el contrapeso si se pasan de largo.",
  "queHace": "Son el último recurso al final del recorrido. Si la cabina baja más allá del piso más bajo, se apoya en su amortiguador y este absorbe el golpe. El del contrapeso hace lo mismo cuando la cabina se pasa hacia arriba. Hay tres tipos: de resorte, de poliuretano (un cilindro de espuma dura) y de aceite, que es un pistón que se hunde despacio y se usa en ascensores rápidos.",
  "dondeVa": "En el piso del foso, sobre un pedestal, justo debajo del bastidor de la cabina y debajo del contrapeso. En operación normal nada los toca.",
  "porTipo": {
    "mr": "De resorte en el modelo, uno bajo la cabina y otro bajo el contrapeso al fondo; en equipos rápidos son de aceite.",
    "mrl": "De poliuretano, bajo la cabina y bajo el contrapeso que va al costado.",
    "hid": "Solo bajo la cabina, del lado del bastidor mochila, porque no hay contrapeso."
  },
  "pista": "Los topes del fondo que reciben a la cabina si baja de más.",
  "comoReconocer": [
    "De resorte: espiral de acero gruesa, de unos 20 a 40 cm de alto, parada sobre una base.",
    "De poliuretano: cilindro amarillo, naranja o negro, parecido a un rollo de espuma dura.",
    "De aceite: tubo metálico vertical con un vástago arriba, visor de nivel y un contacto eléctrico.",
    "Van sobre un pedestal de fierro o de concreto en el piso del foso.",
    "Solo se ven desde el foso, zona del técnico."
  ],
  "fallas": [
    { "sintoma": "Golpe seco abajo al llegar al piso más bajo", "causa": "La cabina se pasa de nivel y toca el amortiguador, por mala nivelación o freno gastado", "revisar": "La nivelación en el piso más bajo y la distancia libre entre cabina y amortiguador" },
    { "sintoma": "Golpe o parada brusca al llegar al último piso de arriba", "causa": "Los cables se estiraron y el contrapeso ya toca su amortiguador", "revisar": "La distancia libre entre el contrapeso y su amortiguador" },
    { "sintoma": "Poliuretano agrietado o desmigajado, o resorte oxidado y ladeado", "causa": "Años de uso, humedad o agua en el foso", "revisar": "El estado del bloque o del resorte, su fijación y si hay filtraciones" },
    { "sintoma": "Con amortiguador de aceite, el ascensor no arranca después de una prueba o un golpe", "causa": "El vástago no regresó arriba o falta aceite, y su contacto abre la cadena de seguridades", "revisar": "El nivel de aceite, el retorno del vástago y el contacto" }
  ],
  "seguridad": "Están en el foso, donde solo entra personal técnico. Si un amortiguador recibió un golpe fuerte, se revisa antes de volver a poner el ascensor en servicio.",
  "dato": "El espacio entre el contrapeso y su amortiguador se va achicando conforme los cables se estiran con los años."
});

ASC.def("polea_tensora", {
  "nombre": "Polea tensora del limitador",
  "alias": ["tensora del gobernador", "pesa tensora", "polea de foso"],
  "ingles": "governor tension sheave",
  "resumen": "Polea con pesa en el foso que mantiene tirante el cable del limitador.",
  "queHace": "El cable del limitador es un lazo cerrado: sube hasta el limitador y baja hasta esta polea. La pesa cuelga del cable y lo mantiene tenso para que no patine arriba y el limitador lea bien la velocidad de la cabina. Si el cable se estira demasiado o se rompe, la pesa baja y acciona un contacto que detiene el ascensor.",
  "dondeVa": "En el foso, pegada a una de las guías de cabina, en la misma vertical del limitador que está arriba. Queda a poca altura del piso.",
  "porTipo": {
    "mr": "En el foso, en la vertical del limitador que está en el cuarto de máquinas.",
    "mrl": "En el foso, en la vertical del limitador que va arriba del hueco, cerca de la máquina.",
    "hid": "En el foso, del lado de las guías y el pistón; el limitador suele ir arriba del hueco."
  },
  "pista": "Rueda con pesa en el fondo que estira un cable delgado.",
  "comoReconocer": [
    "Polea de fierro de unos 20 a 30 cm de diámetro, con una sola ranura.",
    "Va en un brazo con bisagra fijado a la guía, o corre vertical dentro de un marco.",
    "Le cuelga una pesa: un bloque de fierro fundido o un paquete de platinas.",
    "Por su ranura pasa un cable delgado, de 6 a 8 mm, que sube por todo el hueco.",
    "Al lado tiene un contacto eléctrico con palanca o rodillo; solo se ve desde el foso."
  ],
  "fallas": [
    { "sintoma": "El ascensor se queda parado y el tablero marca cadena de seguridades abierta", "causa": "El cable del limitador se estiró, la pesa bajó y accionó su contacto", "revisar": "La altura de la pesa respecto al piso del foso y la posición del contacto" },
    { "sintoma": "Chirrido o golpeteo que viene del fondo del hueco", "causa": "Rodamiento de la polea seco o gastado, o brazo con juego", "revisar": "El giro de la polea y la bisagra del brazo" },
    { "sintoma": "El cable del limitador baila o golpea contra la cabina o las guías", "causa": "Poca tensión: pesa apoyada en el piso o trabada", "revisar": "Que la pesa cuelgue libre y no toque el piso ni agua acumulada" },
    { "sintoma": "Polea y pesa oxidadas o duras de mover", "causa": "Agua o humedad acumulada en el foso", "revisar": "Si hay filtraciones en el foso y el estado de la polea" }
  ],
  "seguridad": "Forma parte del sistema del paracaídas. No se le agrega ni se le quita peso, y su contacto solo lo ajusta personal técnico.",
  "marcas": {
    "otis": "En la lista mensual que SUNAT exige para sus ascensores Otis, la polea tensora se revisa en el foso junto con los amortiguadores y las cuñas.",
    "schindler": "En el 3300 su contacto se llama KSSBV y el cable del limitador es de acero de 6 mm. El manual indica que ni el limitador ni su cable se lubrican."
  },
  "dato": "Cuando la pesa está casi tocando el piso, el cable ya se estiró y el técnico tiene que acortarlo."
});

ASC.def("stop_foso", {
  "nombre": "Stop y escalera de foso",
  "alias": ["parada de foso", "seta de foso", "botón de emergencia del foso", "escalera de gato"],
  "ingles": "pit stop switch and pit ladder",
  "resumen": "Botón rojo que bloquea el ascensor y escalera fija para que el técnico baje al foso.",
  "queHace": "El stop es una seta roja que abre la cadena de seguridades: mientras está presionada, el ascensor no se mueve por ningún motivo. Protege al técnico que trabaja debajo de la cabina. La escalera le da una forma segura de bajar y subir. En el mismo sitio suelen estar el interruptor de la luz del hueco y un tomacorriente, y los equipos nuevos traen también una botonera de inspección de foso.",
  "dondeVa": "El stop va en la pared del hueco, a poca altura sobre el nivel del piso más bajo y a la mano desde la puerta. La escalera va fija a la pared, al lado de esa misma puerta.",
  "porTipo": {
    "mr": "Junto a la puerta del piso más bajo; con fosos hondos hay un segundo stop abajo, en el piso del foso.",
    "mrl": "Igual; en fosos reducidos la escalera es corta o plegable y lleva un contacto que avisa si no está guardada.",
    "hid": "Igual que en los de tracción; en el foso están además la base del pistón y su válvula paracaídas."
  },
  "pista": "Seta roja y peldaños amarillos junto a la puerta más baja.",
  "comoReconocer": [
    "Cajita amarilla o gris con un botón rojo tipo hongo que queda trabado al presionarlo.",
    "Muchos llevan la palabra STOP. Solo lo suelta el técnico, cuando ya salió del foso.",
    "Escalera de fierro pintada de amarillo, pegada a la pared del hueco.",
    "Cerca hay un interruptor de luz y un tomacorriente.",
    "Todo queda detrás de la puerta del piso más bajo; no se ve desde el pasillo."
  ],
  "fallas": [
    { "sintoma": "Ascensor parado después de una limpieza de foso o de un mantenimiento", "causa": "La seta de stop quedó presionada", "revisar": "El técnico verifica la posición del stop del foso antes de buscar otra falla" },
    { "sintoma": "Paradas repentinas, sobre todo en meses húmedos", "causa": "Agua o humedad en el foso que sulfata el contacto del stop", "revisar": "Si hay agua en el foso y el estado de los bornes dentro de la cajita" },
    { "sintoma": "Con escalera plegable o retráctil, el ascensor no arranca", "causa": "La escalera no quedó guardada en su sitio o su contacto está desajustado", "revisar": "La posición de la escalera y su contacto" },
    { "sintoma": "Escalera floja u oxidada", "causa": "Anclajes sueltos o corrosión por agua en el foso", "revisar": "Los pernos de anclaje y el estado de los peldaños" }
  ],
  "seguridad": "El foso es zona de aplastamiento. Solo entra personal técnico capacitado; nadie más debe bajar, ni siquiera a recoger llaves o un celular.",
  "marcas": {
    "movilift": "La placa BR200 registra el acceso al foso como una falla que solo se borra con rearme manual. En equipos de foso reducido, el procedimiento del técnico incluye pulsar STOP y colocar puntales de seguridad antes de trabajar."
  },
  "dato": "Si se te cae algo al foso, avisa a la administración: el técnico lo recupera en su siguiente visita."
});
