/* Taller de Ascensores: fichas de las partes del hueco (guías, contrapeso, cables, cableado y sensores).
   Cada bloque llama a ASC.def(id, {...}) con el id del catálogo de core.js. */

ASC.def("guias_cabina", {
  "nombre": "Guías de cabina",
  "alias": ["rieles", "rieles de cabina", "perfiles T"],
  "ingles": "car guide rails",
  "resumen": "Dos rieles de acero en forma de T que llevan la cabina derecha de abajo hasta arriba.",
  "queHace": "Hacen de carril. La cabina sube y baja agarrada a ellas con las rozaderas, sin balancearse ni girar. En el viaje normal el peso lo cargan los cables o el pistón, y las guías solo dirigen. Su trabajo pesado llega en una emergencia: el paracaídas frena la cabina mordiendo la guía con sus cuñas.",
  "dondeVa": "Dentro del hueco, de arriba abajo, desde el piso del foso hasta casi el techo. Van sujetas al muro con soportes cada cierto tramo.",
  "porTipo": {
    "mr": "Una a cada costado de la cabina, que queda centrada entre las dos; el contrapeso corre al fondo en sus propias guías.",
    "mrl": "Una a cada costado de la cabina, y arriba cargan además la máquina, que va fijada a ellas.",
    "hid": "Las dos van del mismo lado, contra un solo muro, porque el bastidor tipo mochila lleva la cabina en voladizo."
  },
  "pista": "Dos rieles en T, del foso al techo, por donde corre la cabina.",
  "comoReconocer": [
    "Perfil de acero en forma de T: la base va contra el soporte y la parte que sobresale, la hoja, apunta hacia la cabina.",
    "La hoja tiene el grosor de un dedo o menos y se ve lisa y brillante por el roce; el resto es gris o está pintado.",
    "Vienen en tramos unidos con platinas atornilladas por detrás.",
    "Son más gruesas que las del contrapeso.",
    "Se ven desde el techo de la cabina o desde el foso. En un ascensor panorámico de vidrio las ves sin problema, a los lados."
  ],
  "fallas": [
    { "sintoma": "La cabina vibra o se sacude de lado a lado siempre en el mismo tramo.", "causa": "Guía desalineada o fuera de plomo en ese tramo.", "revisar": "La alineación de la guía y si hay soportes flojos cerca." },
    { "sintoma": "Golpe seco, un \"toc\", cada vez que pasa por el mismo punto.", "causa": "Empalme con escalón: un tramo quedó más salido que el otro.", "revisar": "La junta entre los dos tramos y el apriete de la platina." },
    { "sintoma": "Chirrido o roce metálico durante el viaje.", "causa": "Guía seca, sucia u oxidada, o rozaderas gastadas.", "revisar": "La superficie de la guía, las aceiteras y el desgaste de las rozaderas." },
    { "sintoma": "Rayas o mordidas en la guía después de que actuó el paracaídas.", "causa": "Las cuñas marcaron el acero al frenar.", "revisar": "La zona marcada, que el técnico debe dejar lisa antes de volver al servicio." }
  ],
  "seguridad": "Del estado de la guía depende que el paracaídas agarre bien. De cerca solo se ve desde el techo de cabina o el foso, y ahí entra únicamente personal técnico capacitado.",
  "marcas": {
    "otis": "En el Gen2 sin cuarto de máquinas la máquina va en la parte alta del hueco apoyada sobre las guías, así que su peso baja por ellas hasta el foso.",
    "schindler": "En el 3300 la máquina va dentro del hueco fijada a la guía. El manual pide guías sin óxido ni suciedad y apenas aceitadas, para que el paracaídas trabaje bien."
  },
  "dato": "Los tramos de guía se fabrican normalmente de 5 metros, así que un edificio de diez pisos tiene varios empalmes en cada guía."
});

ASC.def("fijaciones", {
  "nombre": "Fijaciones y empalmes de guía",
  "alias": ["brackets", "soportes de guía", "grapas", "eclisas"],
  "ingles": "rail brackets and fishplates",
  "resumen": "Soportes que sujetan la guía al muro y platinas que unen un tramo de guía con el siguiente.",
  "queHace": "El soporte, que en obra llaman bracket, es un ángulo de acero anclado al muro o a una viga. La guía se aprieta contra él con grapas, sin soldarla, para que pueda acomodarse unos milímetros cuando el edificio se asienta. La platina de empalme va por detrás de la guía, justo donde se juntan dos tramos, y los deja alineados como si fueran una sola pieza.",
  "dondeVa": "En el hueco, repartidos a lo alto de cada guía. Hay un soporte cada metro y medio más o menos, y un empalme cada vez que termina un tramo.",
  "porTipo": {
    "mr": "Hay soportes para las guías de cabina en los muros laterales y otros para las del contrapeso en el muro del fondo.",
    "mrl": "Del lado del contrapeso suele haber soportes combinados, que agarran a la vez la guía de cabina y las del contrapeso.",
    "hid": "Todos van en un solo muro, el del lado del pistón, que por eso tiene que ser firme."
  },
  "pista": "Ángulos de acero en el muro y platinas que unen tramo con tramo.",
  "comoReconocer": [
    "Soporte: escuadra o ángulo de acero, galvanizado o pintado, fijado al muro con pernos de anclaje.",
    "Grapas: dos piezas chicas de acero con su perno, una a cada lado de la base de la guía, que la aprietan contra el soporte.",
    "Platina de empalme: plancha gruesa y rectangular detrás de la guía, normalmente con ocho pernos, cuatro por tramo.",
    "Los soportes se repiten a lo alto de todo el hueco, como los peldaños de una escalera.",
    "Se ven desde el techo de la cabina o desde el foso, mirando hacia el muro. Son zonas solo para el técnico."
  ],
  "fallas": [
    { "sintoma": "Golpe o \"toc\" cada vez que la cabina pasa por el mismo punto.", "causa": "Empalme con escalón o platina floja.", "revisar": "El apriete de los pernos de la platina y que la junta esté al ras." },
    { "sintoma": "Vibración o balanceo de la cabina en un tramo.", "causa": "Soporte flojo, anclaje suelto en el muro o grapa corrida.", "revisar": "Los pernos de anclaje y las grapas de los soportes de esa zona." },
    { "sintoma": "Después de un sismo fuerte el viaje se siente áspero o aparecen roces nuevos.", "causa": "Los soportes se movieron y la guía perdió el plomo.", "revisar": "La alineación de las guías en todo el recorrido, antes de volver a usar el ascensor." },
    { "sintoma": "Soportes con óxido y manchas de humedad.", "causa": "Agua que se filtra al hueco.", "revisar": "Por dónde entra el agua y cómo están los anclajes." }
  ],
  "seguridad": "Si un soporte se suelta, la guía se desalinea y el paracaídas puede no agarrar bien. Después de un sismo fuerte, lo prudente es que personal técnico capacitado revise las guías antes de poner el ascensor en servicio.",
  "dato": "La grapa aprieta la guía pero la deja deslizar unos milímetros: así el edificio se asienta sin torcer el riel."
});

ASC.def("guias_contrapeso", {
  "nombre": "Guías de contrapeso",
  "alias": ["rieles de contrapeso", "guías secundarias"],
  "ingles": "counterweight guide rails",
  "resumen": "Dos rieles más delgados por donde sube y baja el contrapeso sin balancearse.",
  "queHace": "Llevan derecho al contrapeso mientras hace el viaje contrario al de la cabina: cuando ella sube, él baja. Evitan que se balancee y golpee el muro o la cabina al cruzarse. Como el contrapeso normalmente no lleva paracaídas, estas guías pueden ser más livianas que las de cabina.",
  "dondeVa": "En el hueco, de piso a techo, pegadas a un muro. Hay una a cada lado del contrapeso y quedan mucho más juntas entre sí que las de cabina.",
  "porTipo": {
    "mr": "Van en el muro del fondo, detrás de la cabina.",
    "mrl": "Van en un muro lateral, al costado de la cabina y cerca de una de sus guías."
  },
  "pista": "Dos rieles delgados y juntos, pegados al muro, para la carga que equilibra.",
  "comoReconocer": [
    "Tienen la misma forma de T que las de cabina, pero son más chicas y delgadas.",
    "En equipos económicos pueden ser de chapa doblada, huecas por dentro, en vez de acero macizo.",
    "Están mucho más juntas entre sí que las de cabina, con el contrapeso en medio.",
    "Fíjate en qué muro están: eso te dice si el contrapeso va al fondo o al costado.",
    "Se ven desde el techo de la cabina o desde el foso, zonas donde solo entra el técnico."
  ],
  "fallas": [
    { "sintoma": "Golpeteo o traqueteo cuando la cabina pasa por la mitad del recorrido.", "causa": "El contrapeso baila por rozaderas gastadas o por guías desalineadas.", "revisar": "El juego de las rozaderas del contrapeso y los soportes de sus guías." },
    { "sintoma": "Chirrido que viene del muro donde corre el contrapeso.", "causa": "Guías secas o sucias.", "revisar": "Las aceiteras del contrapeso y la superficie de la guía." },
    { "sintoma": "Golpe seco y lejano siempre a la misma altura del viaje.", "causa": "Empalme abierto o con escalón.", "revisar": "Las platinas de empalme de ese tramo." }
  ],
  "seguridad": "Si debajo del foso hay un ambiente donde entra gente, como un sótano o un estacionamiento, el contrapeso lleva paracaídas y sus guías tienen que ser macizas y más robustas."
});

ASC.def("contrapeso", {
  "nombre": "Contrapeso",
  "alias": ["pesas", "bastidor de contrapeso", "arcata de contrapeso"],
  "ingles": "counterweight",
  "resumen": "Marco de acero lleno de pesas que equilibra la cabina para que la máquina trabaje menos.",
  "queHace": "Cuelga del otro extremo de los cables y hace el viaje contrario: cuando la cabina sube, él baja. Pesa lo mismo que la cabina vacía y, encima, cerca de la mitad de la carga que ella puede llevar, así el motor solo mueve la diferencia. Su peso también mantiene los cables apretados contra la polea, y de ahí sale el agarre para mover la cabina.",
  "dondeVa": "Dentro del hueco, pegado a un muro, corriendo por sus propias guías. Cuando la cabina está en el primer piso, el contrapeso está arriba; cuando la cabina está en el último, baja hasta cerca del foso.",
  "porTipo": {
    "mr": "Va al fondo del hueco, detrás de la cabina, colgado directo de los cables que bajan de la polea de desvío.",
    "mrl": "Va a un costado, es más angosto y alto, y arriba lleva una polea por donde pasan las cintas, por la suspensión 2:1."
  },
  "pista": "Baja cuando la cabina sube. Marco con bloques apilados.",
  "comoReconocer": [
    "Marco rectangular de acero, alto y angosto, relleno de bloques apilados uno sobre otro.",
    "Los bloques son de fierro fundido o de concreto, grises u oscuros, del ancho del marco, como ladrillos largos.",
    "Lleva cuatro rozaderas, una en cada esquina, que abrazan sus guías.",
    "En el foso, justo debajo, tiene su propio amortiguador y una malla o pantalla que lo separa de quien trabaja ahí.",
    "En un ascensor panorámico lo ves pasar a mitad del viaje, en sentido contrario a la cabina."
  ],
  "fallas": [
    { "sintoma": "Golpeteo o traqueteo a mitad del recorrido, cuando se cruza con la cabina.", "causa": "Pesas sueltas dentro del marco o rozaderas con juego.", "revisar": "La pieza que sujeta las pesas por arriba y el desgaste de las rozaderas." },
    { "sintoma": "Con la cabina en el último piso, el contrapeso queda casi tocando su amortiguador.", "causa": "Los cables se estiraron con el uso y el contrapeso quedó más bajo.", "revisar": "La distancia entre el contrapeso y su amortiguador con la cabina arriba." },
    { "sintoma": "La cabina resbala, se pasa de piso o el motor se esfuerza más en un sentido.", "causa": "Contrapeso mal balanceado, por ejemplo después de cambiar los acabados de la cabina.", "revisar": "El balance entre cabina y contrapeso, que lo mide el técnico." }
  ],
  "seguridad": "Es una masa de cientos de kilos que se mueve casi sin hacer ruido. Dentro del hueco es de lo más peligroso que hay, por eso en el foso va protegido con una pantalla y cerca solo trabaja personal técnico capacitado.",
  "marcas": {
    "otis": "En el Gen2, si debajo del foso hay un espacio donde entra gente, el contrapeso debe llevar su propio paracaídas o apoyarse en un pilar que llegue a suelo firme. En el Arise puede ir al fondo o a un costado.",
    "schindler": "En el 3300 el paracaídas en el contrapeso es opcional, y el manual menciona poleas en el contrapeso para la suspensión 2:1."
  },
  "dato": "Con la cabina vacía el contrapeso pesa más, así que subir vacío le cuesta menos al motor que bajar vacío."
});

ASC.def("cables_traccion", {
  "nombre": "Cables o cintas de tracción",
  "alias": ["cables de suspensión", "cables de acero", "fajas", "correas planas"],
  "ingles": "suspension ropes or belts",
  "resumen": "Cables de acero o cintas planas que sostienen la cabina y la mueven al pasar por la polea.",
  "queHace": "De ellos cuelga la cabina. En un ascensor de tracción pasan por encima de la polea de la máquina y siguen hasta el contrapeso: la polea gira, los arrastra por rozamiento y la cabina sube o baja. Siempre son varios en paralelo y cada uno aguanta por sí solo mucho más que la carga que le toca. En el hidráulico solo transmiten el empuje del pistón al bastidor.",
  "dondeVa": "En el hueco, de arriba abajo. Salen de la cabina, suben hasta la máquina o la polea del pistón y bajan otra vez.",
  "porTipo": {
    "mr": "Cables redondos de acero, cuatro en el modelo, en suspensión 1:1: salen del bastidor, suben a la polea de tracción, pasan por la polea de desvío y bajan al contrapeso.",
    "mrl": "Cintas planas, tres en el modelo, en suspensión 2:1: salen de un punto fijo arriba, pasan por las poleas bajo la cabina, suben a la máquina, bajan a la polea del contrapeso y terminan en otro punto fijo arriba.",
    "hid": "Dos cables redondos en el modelo: salen de un anclaje fijo, suben a la polea de la cabeza del pistón y bajan a amarrarse al bastidor."
  },
  "pista": "De acero, van de la cabina a la polea. De ellos cuelga todo.",
  "comoReconocer": [
    "Cables: redondos, de acero trenzado, grises y algo grasosos, del grosor de un dedo o menos, varios en fila con la misma separación.",
    "Cintas: planas, negras o gris oscuro, de unos tres centímetros de ancho, forradas en plástico con hilos de acero por dentro.",
    "Con cables la polea es grande y con canales; con cintas es chica y casi lisa.",
    "Con cuarto de máquinas los ves pasar por la polea y perderse por los agujeros de la losa.",
    "Sin cuarto de máquinas quedan dentro del hueco, pegados a un costado, y solo los ve el técnico desde el techo de la cabina."
  ],
  "fallas": [
    { "sintoma": "Hilos de acero rotos que sobresalen del cable, como púas.", "causa": "Fatiga por los años y por tanto doblarse en las poleas.", "revisar": "Cuántos hilos rotos hay por tramo y el diámetro del cable; si pasa el límite se cambia el juego completo." },
    { "sintoma": "Polvo rojizo sobre los cables o las cintas.", "causa": "Óxido por dentro: cable seco o hilos de la cinta corroídos.", "revisar": "En cables, la lubricación y el diámetro; en cintas es señal de que toca cambiarlas." },
    { "sintoma": "La cabina resbala al arrancar con carga o se pasa del piso.", "causa": "Cables o canales de la polea gastados que ya no agarran, o grasa de más.", "revisar": "El desgaste de los canales de la polea y el estado de los cables." },
    { "sintoma": "Vibración en la cabina y cables que se ven unos tensos y otros flojos.", "causa": "Tensión dispareja entre cables.", "revisar": "El ajuste de los amarres para que todos carguen parejo." }
  ],
  "seguridad": "Son la suspensión de la cabina y se cambian siempre en juego completo, nunca uno solo. Evaluarlos y reemplazarlos es trabajo de personal técnico capacitado.",
  "marcas": {
    "otis": "El Gen2 usa cintas planas de acero recubiertas de poliuretano, que no se lubrican, y un sistema llamado Pulse (en el Perú le dicen RBI) vigila los hilos de acero por dentro las 24 horas. El Arise usa cables redondos de acero.",
    "schindler": "Las cintas se llaman STM: en el 3300 miden 30 mm de ancho, tienen perfil en V y 12 cordones de acero. No llevan aceite, se limpian solo con paño seco o agua y se cambian todas juntas a los 3 millones de viajes o a los 15 años."
  },
  "dato": "Si alguna vez fallaran todos, la cabina no cae libre: el paracaídas la clava contra las guías."
});

ASC.def("amarres", {
  "nombre": "Amarres de cable",
  "alias": ["amarracables", "terminales de cable", "tirantes", "terminales de cuña"],
  "ingles": "rope terminations",
  "resumen": "Las piezas donde termina cada cable y se sujeta al bastidor, al contrapeso o a un punto fijo.",
  "queHace": "Cada cable termina en una pieza que lo atrapa, casi siempre con una cuña: mientras más jala el cable, más se aprieta. De esa pieza sale una varilla roscada con resorte y tuercas. Con la tuerca el técnico empareja la tensión de todos los cables, y el resorte absorbe los tirones.",
  "dondeVa": "En las dos puntas de cada cable o cinta. Dónde quedan esas puntas depende del tipo de suspensión.",
  "porTipo": {
    "mr": "En 1:1 hay un grupo sobre el cabezal del bastidor de cabina y otro sobre el contrapeso, y los dos viajan con ellos.",
    "mrl": "En 2:1 las dos puntas de cada cinta quedan arriba del hueco, en puntos fijos cerca de la máquina, y no viajan con la cabina.",
    "hid": "Una punta va a un anclaje fijo junto al pistón y la otra al bastidor tipo mochila, que sí viaja."
  },
  "pista": "Varillas con resorte y tuerca, en fila: ahí termina cada cable.",
  "comoReconocer": [
    "Una fila de varillas roscadas, una por cable, cada una con su resorte, sus tuercas y un pasador en la punta.",
    "En el extremo de cada varilla está el terminal: una pieza de acero en forma de pera donde el cable entra, rodea una cuña y vuelve a salir.",
    "La punta sobrante del cable queda sujeta al costado con una grapa chica.",
    "En las cintas el terminal es una caja plana con una cuña ancha, y cerca puede haber un contacto eléctrico que avisa si una cinta se afloja.",
    "En 1:1 están sobre el cabezal de la cabina; en 2:1, en lo alto del hueco. En los dos casos solo los ve el técnico."
  ],
  "fallas": [
    { "sintoma": "Resortes con distinta altura: unos aplastados y otros sueltos.", "causa": "Los cables no cargan parejo porque se estiraron distinto.", "revisar": "La tensión de cada cable y el ajuste de las tuercas." },
    { "sintoma": "Vibración o zumbido en la cabina y desgaste disparejo en la polea.", "causa": "Tensión dispareja que viene de los amarres.", "revisar": "Que todos los resortes estén comprimidos por igual." },
    { "sintoma": "El ascensor se detiene y el tablero marca la cadena de seguridad abierta.", "causa": "Actuó el contacto de cable o cinta floja, en los equipos que lo tienen.", "revisar": "Qué cable o cinta perdió tensión y por qué." },
    { "sintoma": "Ruido metálico, un \"clac\", al arrancar o al parar.", "causa": "Tuerca o contratuerca floja, o falta un pasador.", "revisar": "Tuercas, contratuercas y pasadores de cada varilla." }
  ],
  "seguridad": "De estos puntos cuelga todo el ascensor. Los ajusta y los revisa solo personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 hay un interruptor de cinta floja que abre la cadena de seguridad si una STM pierde tensión, y los puntos de fijación de las cintas están en el plan de revisión del fabricante."
  },
  "dato": "En 2:1 el cable termina en un punto fijo y la cabina cuelga de poleas, por eso la máquina carga solo la mitad del peso."
});

ASC.def("cadena_compensacion", {
  "nombre": "Cadena de compensación",
  "alias": ["cadena compensadora", "cadena de balance", "compensación"],
  "ingles": "compensation chain",
  "resumen": "Cadena forrada que cuelga entre cabina y contrapeso para compensar el peso de los cables.",
  "queHace": "En un edificio alto los cables de tracción pesan bastante. Con la cabina abajo, casi todo ese peso queda del lado de la cabina; con la cabina arriba, pasa al lado del contrapeso. La cadena cuelga por debajo y hace lo contrario: lo que los cables cargan de un lado, ella lo carga del otro. Así la máquina siente casi el mismo peso en cualquier piso.",
  "dondeVa": "Cuelga de debajo de la cabina, baja hasta el foso, hace una U y sube hasta la parte baja del contrapeso.",
  "porTipo": {
    "mr": "Aparece en equipos con cuarto de máquinas de recorrido largo; en edificios bajos muchas veces no hace falta."
  },
  "pista": "Cuelga en U bajo la cabina y sube hasta el contrapeso.",
  "comoReconocer": [
    "Cadena de eslabones de acero forrada en plástico o goma, casi siempre negra, gruesa como una manguera.",
    "El forro está para que no suene: una cadena pelada tintinea.",
    "Hace un lazo en U en el foso, a poca altura del piso y sin tocarlo.",
    "En el foso suele pasar por una guía, con rodillos o un aro, que evita que se balancee.",
    "Solo se ve desde el foso, donde entra únicamente el técnico. Desde el cuarto de máquinas no se ve."
  ],
  "fallas": [
    { "sintoma": "Tintineo o golpeteo metálico que sube desde el foso durante el viaje.", "causa": "Forro roto, o cadena que se balancea y pega contra el muro o la cabina.", "revisar": "El estado del forro y la guía de la cadena en el foso." },
    { "sintoma": "Ruido de arrastre cuando la cabina llega a los pisos extremos.", "causa": "El lazo quedó muy largo y roza el piso del foso, a veces porque los cables de tracción se estiraron.", "revisar": "La altura del lazo sobre el piso del foso." },
    { "sintoma": "Tirón o golpe al arrancar o al frenar.", "causa": "Cadena torcida, enredada o enganchada en algo del foso.", "revisar": "Que cuelgue libre y sin torsión, y sus dos puntos de amarre." }
  ],
  "seguridad": "Va en el foso y se mueve con el ascensor. La revisa solo personal técnico capacitado.",
  "marcas": {
    "otis": "La lista de mantenimiento mensual que SUNAT exige para sus Otis de cables con cuarto de máquinas incluye la cadena de compensación.",
    "schindler": "En los Schindler con cuarto de máquinas de SUNAT, la cadena de compensación figura entre los puntos de la revisión mensual."
  },
  "dato": "En edificios muy altos o rápidos se usan cables de compensación con una polea tensora en el foso, en vez de cadena."
});

ASC.def("cable_limitador", {
  "nombre": "Cable del limitador",
  "alias": ["cable del gobernador", "cable del regulador", "cable del paracaídas"],
  "ingles": "governor rope",
  "resumen": "Cable delgado en lazo cerrado que une el limitador con el paracaídas de la cabina.",
  "queHace": "Va amarrado a la palanca del paracaídas, así que se mueve junto con la cabina y hace girar el limitador a su misma velocidad. Si la cabina baja demasiado rápido, el limitador se traba y frena el cable. La cabina sigue bajando, el cable ya no, y esa diferencia jala la palanca que mete las cuñas contra las guías.",
  "dondeVa": "Recorre todo el hueco por un costado de la cabina: sube al limitador, da la vuelta, baja hasta la polea tensora en el foso y regresa. Los dos ramales quedan uno junto al otro.",
  "porTipo": {
    "mr": "El lazo sube hasta el cuarto de máquinas y atraviesa la losa por dos agujeros para llegar al limitador.",
    "mrl": "Todo el lazo queda dentro del hueco, porque el limitador va arriba, cerca de la máquina.",
    "hid": "Trabaja igual que en los de tracción: el limitador va arriba del hueco y el cable jala el paracaídas del bastidor tipo mochila."
  },
  "pista": "Lazo delgado de acero que corre junto a la cabina y jala las cuñas.",
  "comoReconocer": [
    "Un solo cable de acero, bastante más delgado que los de tracción: de 6 a 8 mm, más o menos como un lápiz.",
    "Forma un lazo. Vas a ver dos ramales paralelos, y cuando la cabina se mueve uno sube y el otro baja.",
    "Uno de los ramales está sujeto a una palanca en el bastidor de la cabina.",
    "Arriba pasa por la polea del limitador y abajo por una polea con pesa que lo mantiene tenso.",
    "Con cuarto de máquinas lo ves salir de la losa y dar la vuelta en el limitador; el resto queda en el hueco, a la vista solo del técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor se detiene y no arranca; el técnico encuentra abierto el contacto de la polea tensora.", "causa": "El cable se estiró y la pesa bajó hasta tocar su contacto.", "revisar": "La altura de la pesa tensora en el foso y el largo del cable." },
    { "sintoma": "Roce o silbido parejo durante todo el viaje.", "causa": "El cable roza un soporte, el borde de la losa o una polea desalineada.", "revisar": "Por dónde pasa el cable y si las poleas están alineadas." },
    { "sintoma": "Hilos rotos o cable adelgazado.", "causa": "Desgaste por los años o por una polea con el canal gastado.", "revisar": "El cable en todo su largo y el canal de la polea del limitador." },
    { "sintoma": "La cabina se clava entre pisos sin haber ido rápido.", "causa": "El cable se enganchó o el limitador se trabó por suciedad.", "revisar": "El limitador y el recorrido del cable; el paracaídas lo libera únicamente el técnico." }
  ],
  "seguridad": "Es parte del sistema que detiene la cabina si cae o se embala. No se toca ni se engrasa por cuenta propia: lo manipula solo personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 es un cable de acero de 6 mm que trabaja con el limitador SA GBP 201, y el manual indica que ni el limitador ni su cable se lubrican."
  },
  "dato": "Este cable no carga la cabina: solo necesita la tensión justa para hacer girar el limitador sin patinar y para jalar la palanca."
});

ASC.def("cable_viajero", {
  "nombre": "Cable viajero",
  "alias": ["cable de maniobra", "cable plano", "cable colgante"],
  "ingles": "travelling cable",
  "resumen": "Cable eléctrico plano y flexible que lleva corriente y señales entre el tablero y la cabina.",
  "queHace": "Es el cordón umbilical de la cabina. Por él pasan la luz, la alimentación del operador de puertas, las llamadas de la botonera, la alarma, el intercomunicador y parte de la cadena de seguridad. Está hecho para doblarse miles de veces: cuelga en U y la curva sube y baja a medida que la cabina se mueve.",
  "dondeVa": "Cuelga dentro del hueco. Una punta está fija en una caja en el muro, a media altura del recorrido, y la otra debajo de la cabina. De la caja sigue un cableado fijo hasta el tablero.",
  "porTipo": {
    "mr": "Desde la caja del hueco, el cableado fijo sube hasta el tablero del cuarto de máquinas.",
    "mrl": "Desde la caja del hueco, el cableado fijo sube hasta el tablero que está en el marco de la puerta del último piso.",
    "hid": "Desde la caja del hueco, el cableado fijo va hasta el tablero que está junto a la central, en el cuarto aparte."
  },
  "pista": "Cordón plano eléctrico que cuelga en U bajo la cabina, desde el muro.",
  "comoReconocer": [
    "Cable plano, como una cinta ancha de varios centímetros, casi siempre negro o gris.",
    "Suelen ser dos o más, colgados uno al lado del otro.",
    "Cuelga en U debajo de la cabina; con la cabina en el primer piso, la curva queda cerca del foso.",
    "No lo confundas con la cadena de compensación: el cable viajero es plano, liviano y nace en una caja del muro; la cadena es redonda, pesada y sube al contrapeso.",
    "En un ascensor panorámico lo ves colgando bajo la cabina. En los demás solo se ve desde el foso o el techo de cabina, zonas del técnico."
  ],
  "fallas": [
    { "sintoma": "Fallas que van y vienen: la luz de cabina parpadea, un botón deja de responder o el ascensor se para en cualquier punto y luego arranca solo.", "causa": "Un hilo interno partido de tanto doblarse, que hace contacto a ratos.", "revisar": "La continuidad de los hilos, sobre todo en la zona de la curva; suele haber hilos de reserva." },
    { "sintoma": "El tablero marca error de comunicación con la cabina.", "causa": "Hilo de datos cortado, borne flojo o malla mal conectada a tierra.", "revisar": "Las conexiones en la caja del hueco y en la caja del techo de cabina." },
    { "sintoma": "Roce o golpeteo suave en el hueco y forro raspado.", "causa": "El cable se balancea y pega contra el muro, un soporte o la cabina.", "revisar": "Cómo cuelga la U y si el cable está torcido o mal sujeto." },
    { "sintoma": "Forro tieso, cuarteado o con hilos a la vista.", "causa": "El plástico envejeció.", "revisar": "Todo el largo del cable; si está cuarteado se cambia." }
  ],
  "seguridad": "Lleva tensión eléctrica y circuitos de seguridad. Revisarlo o cambiarlo es trabajo de personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 el control Bionic tiene placas en el armario de la puerta del último piso y otra en la unidad de cabina (CCU), sobre el techo. Se comunican por bus CAN, y esa señal llega a la cabina por el cable viajero.",
    "movilift": "En tableros con placa BR200 hay errores propios de comunicación CAN con la placa de cabina. El manual manda revisar el cable de datos y que su malla esté a tierra por un solo lado."
  },
  "dato": "Se fija a media altura del hueco para que el cable mida más o menos la mitad del recorrido en vez del recorrido entero."
});

ASC.def("finales_carrera", {
  "nombre": "Finales de carrera",
  "alias": ["límites", "sobrerrecorrido", "fines de carrera", "interruptores de límite"],
  "ingles": "final limit switches",
  "resumen": "Interruptores en los extremos del hueco que paran el ascensor si la cabina se pasa de la última parada.",
  "queHace": "Vigilan que la cabina no siga de largo, ni hacia arriba ni hacia abajo. Si se pasa unos centímetros del nivel del piso más alto o del más bajo, una leva montada en la cabina empuja la palanca del interruptor. Eso abre la cadena de seguridad y el ascensor se detiene antes de que la cabina o el contrapeso lleguen a los amortiguadores. Un poco antes suele haber otros interruptores, los de cambio de velocidad, que obligan a frenar al acercarse al extremo.",
  "dondeVa": "En el hueco, fijados a la guía o al muro: uno un poco más arriba del nivel del último piso y otro un poco más abajo del nivel del primero. La leva que los acciona va en el bastidor de la cabina.",
  "porTipo": {
    "mr": "Uno arriba y otro abajo, sujetos a la guía de cabina, con el cableado subiendo hasta el tablero del cuarto de máquinas.",
    "mrl": "Uno arriba y otro abajo; el de arriba queda cerca de la máquina y del tablero del último piso.",
    "hid": "El obligatorio es el de arriba, que actúa antes de que el pistón llegue al tope de su carrera."
  },
  "pista": "Interruptores con ruedita, arriba y abajo. Paran la cabina si se pasa.",
  "comoReconocer": [
    "Caja chica de plástico o metal, del tamaño de una cajetilla o un poco más, con una palanca que termina en una ruedita.",
    "Va atornillada a la guía o a un soporte en el muro, con un cable eléctrico que sale por abajo o por un costado.",
    "Cerca de cada extremo suele haber dos o tres seguidos: primero los de cambio de velocidad y al último el final.",
    "En la cabina está la leva: una platina larga de metal con las puntas en rampa, que empuja las rueditas al pasar.",
    "Los de arriba se ven desde el techo de la cabina y los de abajo desde el foso, zonas solo para el técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor queda parado en el piso más alto o en el más bajo, con la cabina pasada del nivel, y no responde a ninguna llamada.", "causa": "La cabina se pasó y accionó el final de carrera.", "revisar": "Por qué se pasó: freno, sensores de posición o cambio de velocidad. Lo regresa a servicio el técnico." },
    { "sintoma": "Se detiene al llegar a un piso extremo sin haberse pasado del nivel.", "causa": "Interruptor o leva movidos de sitio, que se tocan antes de tiempo.", "revisar": "La posición del interruptor respecto al nivel de piso y la fijación de la leva." },
    { "sintoma": "Paradas que van y vienen cerca de los extremos.", "causa": "Ruedita gastada o trabada, palanca doblada o contacto sucio.", "revisar": "Que la palanca regrese sola a su sitio y el estado del contacto." },
    { "sintoma": "Llega al último piso con un frenazo brusco.", "causa": "Falla el interruptor de cambio de velocidad y la cabina llega rápida al extremo.", "revisar": "Los interruptores de desaceleración que están antes del final." }
  ],
  "seguridad": "Es un dispositivo de seguridad y forma parte de la cadena de seguridades. No se puentea ni se cambia de sitio: si actuó, hay una causa, y la busca personal técnico capacitado.",
  "marcas": {
    "schindler": "En el 3300 el final de carrera figura como KNE en los códigos de falla. Los imanes KSE son otra cosa: marcan los extremos del recorrido para el sensor de posición de la cabina.",
    "movilift": "En tableros con placa BR200 el final de carrera entra por el borne EXC. Si se abre, la pantalla muestra FINAL DE CARRERA y el ascensor queda bloqueado hasta que el técnico lo rearme a mano."
  },
  "dato": "Después de un final de carrera el ascensor no vuelve solo: un técnico tiene que ir, ver por qué se pasó y recién entonces rearmarlo."
});

ASC.def("posicionamiento", {
  "nombre": "Sensores de posición",
  "alias": ["inductores y pantallas", "banderas", "sensores de nivelación", "imanes y sensores magnéticos", "lápices"],
  "ingles": "position and leveling sensors",
  "resumen": "Sensor en la cabina y marcas en cada piso que le dicen al tablero dónde está el ascensor.",
  "queHace": "En cada piso hay una marca fija en el hueco: una pantalla de metal o un imán. La cabina lleva un sensor que pasa por esa marca y avisa al tablero. Con eso el tablero cuenta los pisos, sabe cuándo empezar a frenar y dónde detenerse para quedar al ras. También define la zona de puertas, que es el tramo corto donde está permitido abrir.",
  "dondeVa": "Las marcas van en el hueco, una por piso, sujetas a la guía o a un soporte propio. El sensor va en la cabina, casi siempre sobre el techo, a un costado.",
  "porTipo": {
    "mr": "En equipos antiguos son inductores y pantallas; en los modernizados se suma el encoder del motor, que va contando el recorrido.",
    "mrl": "Usa pantallas o imanes por piso y además el encoder de la máquina, que mide el recorrido con mucha precisión.",
    "hid": "Además de ubicar la cabina sirve para renivelar: si baja unos milímetros estando parada, el tablero la sube otra vez al ras."
  },
  "pista": "Una U en el techo de la cabina que lee una placa por piso.",
  "comoReconocer": [
    "Pantalla o bandera: una platina delgada de metal, de uno o dos palmos de largo, parada en vertical, una en cada piso.",
    "Sensor en U u horquilla: una cajita, casi siempre negra, con una ranura por donde pasa la pantalla sin tocarla.",
    "Si el sistema es magnético: imanes chicos y oscuros pegados a la guía o a una regla, y en la cabina unos sensores que pasan muy cerca.",
    "Lápices: así les dicen en campo a los sensores magnéticos con forma de cilindro delgado, como un lápiz. Van en fila sobre un soporte en el techo de cabina y pasan a milímetros de unos imanes pegados en la guía o en una regleta.",
    "En sistemas más nuevos hay una cinta delgada tendida de arriba abajo en todo el hueco y un lector en la cabina que corre a lo largo de ella.",
    "Se ven desde el techo de la cabina, zona del técnico. Lo que tú notas es el resultado: si la cabina queda al ras del piso o con escalón."
  ],
  "fallas": [
    { "sintoma": "La cabina para con escalón, más arriba o más abajo, siempre en el mismo piso.", "causa": "La pantalla o el imán de ese piso se movió o se dobló.", "revisar": "La posición y la fijación de la marca de ese piso." },
    { "sintoma": "Para desnivelada en todos los pisos.", "causa": "El sensor de la cabina está corrido o flojo, o la nivelación quedó mal ajustada en el tablero.", "revisar": "La fijación del sensor en la cabina y su distancia a las marcas." },
    { "sintoma": "El ascensor pierde la cuenta: marca un piso equivocado o hace un viaje lento hasta un extremo para ubicarse.", "causa": "Una marca que no se leyó por suciedad, un imán caído o un sensor que falla.", "revisar": "La limpieza de pantallas y sensores, y si falta algún imán." },
    { "sintoma": "La cabina llegó al piso y la puerta no abre.", "causa": "El tablero no recibe la señal de zona de puertas.", "revisar": "El sensor de zona de puertas y su marca en ese piso." }
  ],
  "seguridad": "La señal de zona de puertas decide dónde se puede abrir, así que estos sensores no se mueven ni se tapan. Ajustarlos es trabajo de personal técnico capacitado.",
  "marcas": {
    "otis": "En la lista de mantenimiento mensual que SUNAT exige para sus Otis, los inductores se revisan desde el techo de cabina, junto con el operador de puertas y las guías.",
    "schindler": "En el 3300 la cabina lleva fotocélulas PHS que leen una bandera por piso, más imanes KS y KSE. Después de una falla hace un viaje de sincronización, y el manual pide limpiar las banderas sucias.",
    "movilift": "La placa BR200 usa sensores magnéticos tipo reed e imanes en el hueco: IF e ICV para contar y marcar la zona de puertas, RS y RD para corregir en los pisos extremos. Como opción ofrece Limax, una cinta magnética que da la posición exacta sin tener que buscar referencia."
  },
  "dato": "Ese viaje lento hasta el primer o el último piso después de un corte de luz es normal: el ascensor está buscando su referencia."
});
