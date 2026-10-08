/* Taller de Ascensores. Contenido: piezas nuevas (aceiteras, rodaderas, herrajes de puerta y microswitches)
   y la lista de la serie de seguridades. Cada bloque llama a ASC.def(id, {...}) con el id del catálogo de core.js. */

ASC.def("aceiteras", {
  "nombre": "Aceiteras",
  "alias": ["lubricadores de guía", "engrasadores de guía", "aceiteras de mecha", "vasos de aceite"],
  "ingles": "guide rail lubricators (oilers)",
  "resumen": "Vasitos con mecha de fieltro que mantienen la guía mojada con una película fina de aceite.",
  "queHace": "Mantienen la guía apenas aceitada para que las rozaderas deslicen sin chillar ni gastarse antes de tiempo. Cada una es un depósito chico con una mecha de fieltro que toca la guía: el aceite sube por la mecha y la cabina, al viajar, lo reparte de arriba abajo. Trabajan solas, sin bomba ni electricidad. Van solo donde hay rozaderas deslizantes, porque las rodaderas de ruedas necesitan la guía seca.",
  "dondeVa": "Encima de las rozaderas de arriba, una por guía, tanto en el bastidor de cabina como en lo alto del contrapeso. El aceite que sobra baja por la guía y cae en unas bandejas o tarritos al pie de cada guía, en el foso.",
  "porTipo": {
    "mr": "En el modelo la cabina lleva rodaderas, que van en seco, así que vas a ver aceiteras solo sobre las rozaderas del contrapeso.",
    "mrl": "Dos sobre la cabina y dos sobre el contrapeso que corre al costado; su aceite es para las guías y no debe llegar a las fajas.",
    "hid": "Solo dos, sobre las rozaderas de arriba del bastidor mochila, porque no hay contrapeso."
  },
  "pista": "Vasitos con mecha de fieltro que dejan el riel apenas mojado.",
  "comoReconocer": [
    "Vasito o cajita de metal o de plástico, del tamaño de una taza chica; algunas son transparentes y dejan ver el nivel.",
    "Por abajo o por un costado le sale una mecha de fieltro, blanca cuando es nueva y negruzca con el uso, que toca la hoja de la guía.",
    "Va atornillada justo encima de la rozadera, con una tapita por donde el técnico repone el aceite.",
    "Fíjate en la guía: debajo de una aceitera que trabaja se ve con brillo húmedo; si está seca y opaca, el depósito está vacío.",
    "Se ven desde el techo de cabina, zona solo del técnico. En el foso están las bandejas donde cae el aceite sobrante."
  ],
  "fallas": [
    { "sintoma": "Chirrido o roce seco que acompaña todo el viaje", "causa": "Aceitera vacía, o mecha endurecida que ya no moja la guía", "revisar": "El nivel del depósito y si la mecha está húmeda y tocando la guía" },
    { "sintoma": "Guía chorreada, aceite sobre el techo de cabina o charco en el foso", "causa": "Aceitera rajada, mal cerrada o llenada de más", "revisar": "Si el depósito tiene fugas y cómo están las bandejas del foso" },
    { "sintoma": "Guía cubierta por una pasta negra y pegajosa", "causa": "Aceite viejo mezclado con polvo, o un aceite que no corresponde", "revisar": "La limpieza de la guía y qué aceite indica el fabricante" },
    { "sintoma": "Una guía se ve mojada y la otra seca", "causa": "Una de las mechas se gastó o quedó separada de la guía", "revisar": "El contacto de cada mecha con su guía" }
  ],
  "seguridad": "El tipo y la cantidad de aceite cambian la forma en que frena el paracaídas, por eso el aceite lo elige y lo repone el técnico. Nadie más debe echar aceite ni grasa a las guías.",
  "marcas": {
    "otis": "Otis indica que las cintas y la máquina del Gen2 no se lubrican.",
    "schindler": "El manual del 3300 las llama lubricadores: pide revisar que no goteen, que el fieltro esté húmedo y que la guía tenga una película de aceite. Su plan de revisión incluye la lubricación de las zapatas de cabina y de contrapeso."
  },
  "dato": "Aceiteras y rodaderas no van juntas: una rueda de goma sobre una guía aceitada patina y se malogra."
});

ASC.def("rodaderas", {
  "nombre": "Rodaderas",
  "alias": ["rolos", "rolos guía", "guías de rodillos", "rodillos guía"],
  "ingles": "roller guide shoes",
  "resumen": "Juegos de tres ruedas con resorte que abrazan la guía y llevan la cabina rodando, sin rozar.",
  "queHace": "Hacen el mismo trabajo que las rozaderas, mantener la cabina en su carril, pero rodando en vez de deslizar. Cada juego tiene tres ruedas con banda de goma o poliuretano: una apoya en el canto de la guía y las otras dos en sus caras. Un resorte empuja cada rueda contra la guía y absorbe los golpecitos de los empalmes, por eso el viaje sale más suave y callado. Trabajan con la guía seca, sin aceiteras.",
  "dondeVa": "En las cuatro esquinas del bastidor de cabina, dos arriba y dos abajo, en el mismo sitio donde otros equipos llevan rozaderas. En ascensores rápidos el contrapeso lleva las suyas, más chicas.",
  "porTipo": {
    "mr": "En el modelo clásico la cabina lleva cuatro juegos, uno por esquina del bastidor; las vas a encontrar sobre todo en edificios altos y ascensores rápidos."
  },
  "pista": "Tres ruedas con resorte que abrazan el riel en cada esquina del marco.",
  "comoReconocer": [
    "Tres ruedas por juego, de unos 8 a 15 cm de diámetro, con banda de goma o poliuretano negra, gris o rojiza.",
    "Cada rueda va en un brazo con bisagra, empujada por un resorte con tuerca de regulación, todo sobre una base de fierro.",
    "Una rueda apunta al canto de la guía y las otras dos la aprietan por los costados, como una pinza.",
    "La guía se ve limpia y seca, sin película de aceite y sin aceiteras encima.",
    "Se ven desde el techo de cabina y desde el foso, zonas solo del técnico. Con la cabina en marcha suenan como un rumor parejo."
  ],
  "fallas": [
    { "sintoma": "Golpeteo rítmico, tac-tac-tac, que se acelera con la velocidad", "causa": "Rueda con un plano: la goma se aplastó en un punto, casi siempre por estar mucho tiempo parada", "revisar": "La banda de cada rueda en toda su vuelta" },
    { "sintoma": "Zumbido o ronquido que crece con la velocidad", "causa": "Rodamiento de una rueda gastado o seco", "revisar": "El giro libre de cada rueda y si alguna tiene juego en su eje" },
    { "sintoma": "La cabina se bambolea de lado o da golpes al pasar por los empalmes", "causa": "Resortes flojos o desregulados, o una rueda que ya no toca la guía", "revisar": "Que las tres ruedas de cada juego apoyen parejo y la presión de los resortes" },
    { "sintoma": "Ruedas con la goma despegada, cuarteada o hinchada", "causa": "Goma vieja, o guía con aceite o grasa que ataca la banda", "revisar": "El estado de las bandas y que la guía esté seca y limpia" }
  ],
  "seguridad": "Entre la rueda y la guía hay un punto de atrapamiento cuando la cabina se mueve. Regular los resortes o cambiar ruedas es trabajo de personal técnico capacitado.",
  "marcas": {
    "schindler": "El manual del 3100 y 3300 describe solo zapatas deslizantes, con forro de plástico y lubricador de fieltro; rodaderas no menciona."
  },
  "dato": "Si el ascensor pasa semanas parado, las ruedas pueden quedar con un plano y sonar tac-tac al volver a usarlo."
});

ASC.def("roldanas_puerta", {
  "nombre": "Roldanas de puerta",
  "alias": ["rolos de puerta", "ruedas de colgador", "rodillos de puerta", "contrarruedas"],
  "ingles": "door hanger rollers and upthrust rollers",
  "resumen": "Ruedas de las que cuelga cada hoja de puerta y que corren sobre el riel del cabezal.",
  "queHace": "Cargan todo el peso de la hoja y la hacen correr por el riel casi sin esfuerzo. Cada hoja cuelga de un carro con dos ruedas que van por encima del riel. Por debajo del riel van otras más chicas, las contrarruedas, que casi no lo tocan: están para que la hoja no se levante ni se descarrile si alguien la empuja o la golpea. De su estado depende que la puerta abra suave y callada.",
  "dondeVa": "En los carros de cada hoja, dentro del cabezal. Las llevan todas las puertas de piso y también la puerta de cabina, que corre por el riel del operador.",
  "porTipo": {
    "mr": "Dos ruedas y dos contrarruedas por hoja en cada piso y en la cabina; en puertas antiguas son más grandes y pesadas.",
    "mrl": "Dos ruedas y dos contrarruedas por hoja, de plástico duro con rodamiento sellado, en cada piso y en la cabina.",
    "hid": "Iguales si la puerta es automática; una puerta batiente manual no lleva roldanas, solo bisagras."
  },
  "pista": "Ruedas de las que cuelgan las hojas y que corren sobre un riel.",
  "comoReconocer": [
    "Ruedas de plástico duro o nylon, blancas, negras o amarillentas, de unos 5 a 7 cm, con un rodamiento al centro.",
    "Tienen la llanta acanalada o curva para calzar sobre el riel, y van de a dos en cada carro.",
    "Las contrarruedas son bastante más chicas y van debajo del riel. Se regulan con un perno excéntrico, y por eso en campo les dicen excéntricas.",
    "Entre la contrarrueda y el riel queda una luz mínima, apenas el grosor de un papel.",
    "Las de piso se ven solo desde el hueco y las de cabina desde el techo de cabina. Desde el pasillo lo que te llega es el ruido."
  ],
  "fallas": [
    { "sintoma": "Tac-tac-tac al abrir y cerrar, como rueda cuadrada", "causa": "Rueda con un plano, con la banda picada o con el rodamiento malogrado", "revisar": "En qué piso suena: si es en uno solo, las ruedas de esa puerta; si suena en todos, las de la puerta de cabina" },
    { "sintoma": "La puerta se mueve a tirones o no termina de cerrar", "causa": "Riel sucio o ruedas duras de girar", "revisar": "La limpieza del riel y el giro libre de cada rueda" },
    { "sintoma": "La hoja baila, golpetea o se levanta de abajo cuando la empujan", "causa": "Contrarruedas gastadas o con demasiada luz contra el riel", "revisar": "La separación de las contrarruedas y si la hoja cuelga a plomo" },
    { "sintoma": "Chillido agudo cuando la puerta se mueve", "causa": "Contrarrueda apretada contra el riel o rodamiento seco", "revisar": "Que las contrarruedas giren libres y no vayan frenadas contra el riel" }
  ],
  "seguridad": "Las contrarruedas son las que impiden que una hoja se salga del riel con un golpe. Regularlas o cambiarlas se hace desde el hueco y es trabajo de personal técnico capacitado.",
  "marcas": {
    "schindler": "El manual del 3300 pide limpiar los rieles y dejarlos secos, sin aceitarlos, y revisar ruedas y contrarruedas cada 12 meses. Si el traqueteo es fuerte manda cambiar la rueda; si la hoja corre dispareja, revisar la contrarrueda."
  },
  "dato": "El riel de la puerta va seco: el aceite junta polvo y forma una pasta que frena las ruedas."
});

ASC.def("cable_sincronismo", {
  "nombre": "Cable de sincronismo",
  "alias": ["cable de sincronización", "cable sincronizador", "cable de arrastre de hojas"],
  "ingles": "door synchronization cable (relating cable)",
  "resumen": "Cable delgado que une las dos hojas para que abran y cierren a la vez.",
  "queHace": "Hace que las dos hojas se muevan a la vez y en sentidos contrarios. El patín de la cabina o la correa del operador mueve una sola hoja; el cable da la vuelta por una poleíta en cada extremo del cabezal y arrastra a la otra. En puertas de apertura lateral hace un trabajo parecido: obliga a la hoja lenta a avanzar la mitad que la rápida. Como las hojas quedan amarradas entre sí, la cerradura que traba una sujeta también a la otra.",
  "dondeVa": "Dentro del cabezal, tendido en horizontal de un extremo al otro, pegado al riel. Hay uno en cada puerta de piso y otro en la puerta de cabina, junto a la correa del operador.",
  "porTipo": {
    "mr": "Uno en cada puerta de piso y otro en la de cabina, igual en todos los pisos.",
    "mrl": "Uno en cada puerta de piso; en la cabina, algunos operadores prenden las dos hojas a los dos ramales de la correa dentada y no llevan cable.",
    "hid": "Igual si la puerta es automática; las puertas batientes manuales no lo llevan."
  },
  "pista": "Lazo fino con dos poleítas: una hoja arrastra a la otra.",
  "comoReconocer": [
    "Cable de acero trenzado muy fino, de unos 2 o 3 mm, a veces forrado en plástico.",
    "Forma un lazo cerrado y aplastado: un ramal va sujeto al carro de una hoja y el otro ramal al carro de la otra.",
    "En cada extremo del cabezal da la vuelta por una poleíta de plástico del tamaño de una moneda grande.",
    "En una de sus puntas tiene un tensor: un perno con tuerca o un resorte chico.",
    "Solo se ve desde el hueco o desde el techo de cabina. Desde el pasillo lo delata una hoja que llega tarde."
  ],
  "fallas": [
    { "sintoma": "Una hoja abre o cierra y la otra se queda o llega atrasada", "causa": "Cable roto, salido de su polea o suelto de su grapa", "revisar": "Si el cable sigue en sus dos poleítas y sujeto a los dos carros" },
    { "sintoma": "Al cerrar, las hojas no se juntan al centro y queda una rendija o un escalón", "causa": "Cable flojo o estirado, o grapa corrida", "revisar": "La tensión del cable y el punto donde agarra cada hoja" },
    { "sintoma": "Raspado fino o chirrido arriba de la puerta", "causa": "Poleíta trabada o gastada, o cable deshilachado que roza", "revisar": "El giro de las dos poleítas y si el cable tiene hilos sueltos" },
    { "sintoma": "El ascensor no sale de un piso aunque la puerta se ve cerrada", "causa": "La hoja arrastrada no llegó a su tope y su contacto no cerró", "revisar": "Qué puerta abre la serie de seguridades y el estado del cable en ese piso" }
  ],
  "seguridad": "Si el cable se rompe, una hoja puede quedar suelta aunque la otra esté trabada; por eso la hoja arrastrada suele tener su propio contacto en la serie de seguridades. Si ves una hoja de piso que se corre con la mano, no la toques y avisa para que dejen el ascensor fuera de servicio.",
  "marcas": {
    "schindler": "En el manual del 3300 figura en la puerta de cabina, con sus dos poleas, y se revisa a la vista cada 12 meses. Para alinear las hojas, el técnico afloja el perno que sujeta el cable y lo vuelve a fijar."
  },
  "dato": "Este cable no carga peso, solo jala de costado, y por eso puede ser tan delgado."
});

ASC.def("pesa_cierre", {
  "nombre": "Pesa de cierre",
  "alias": ["contrapeso de puerta", "pesa de puerta", "cierrapuertas", "resorte de cierre"],
  "ingles": "landing door closing weight (door closer)",
  "resumen": "Pesa colgada de un cordón que cierra sola la puerta de piso cuando la cabina se va.",
  "queHace": "La puerta de piso no tiene motor: la abre y la cierra la puerta de cabina. Si la cabina se va y la puerta de piso quedó abierta o a medio cerrar, esta pesa la jala hasta el final para que el gancho de la cerradura caiga. El cordón sale de la pesa, pasa por una poleíta en el cabezal y se amarra a una hoja: al abrir la puerta la pesa sube, y al soltarla baja y la cierra. Otros fabricantes usan un resorte que hace lo mismo.",
  "dondeVa": "Al costado de cada puerta de piso, del lado del hueco. Baja pegada al marco o al canto de una hoja, dentro de un tubo o canaleta que la guía y evita que caiga al hueco si se rompe el cordón.",
  "porTipo": {
    "mr": "Una por cada puerta de piso; en puertas antiguas es común ver un resorte en lugar de la pesa.",
    "mrl": "Una por cada puerta de piso, pesa o resorte según el fabricante de la puerta.",
    "hid": "Igual en puertas automáticas; si la puerta es batiente manual, la cierra un brazo con resorte como el de una puerta de oficina."
  },
  "pista": "Cuelga de un cordón junto a la puerta y la cierra sin motor.",
  "comoReconocer": [
    "Barra o bloque alargado de fierro, gris o negro, más o menos del largo de un antebrazo.",
    "Cuelga de un cordón o cable muy fino que sube hasta una poleíta en el cabezal.",
    "Corre dentro de un tubo o canaleta de chapa pegada a la hoja o al marco.",
    "Si en vez de pesa hay resorte, vas a ver un espiral estirado a lo largo del cabezal o un carrete redondo parecido a una wincha.",
    "Solo se ve desde el hueco, zona del técnico. Su efecto sí lo conoces: sin ella la puerta de piso se quedaría donde la dejen."
  ],
  "fallas": [
    { "sintoma": "La puerta de un piso no termina de cerrar y queda una rendija", "causa": "Pesa trabada en su tubo, cordón salido de la polea o resorte vencido", "revisar": "Que la pesa suba y baje libre y que el cordón esté en su poleíta" },
    { "sintoma": "Golpe o campaneo metálico al abrir o cerrar la puerta de un piso", "causa": "La pesa golpea su tubo o la hoja porque perdió su guía o su tope de goma", "revisar": "La fijación del tubo y cómo cuelga la pesa" },
    { "sintoma": "El ascensor queda parado y en un piso la puerta de afuera está entreabierta", "causa": "Cordón roto: la pesa quedó en el fondo de su tubo y ya nada jala la hoja", "revisar": "El cordón y su amarre en ese piso. Mientras tanto nadie debe acercarse a esa puerta" }
  ],
  "seguridad": "Es parte de la protección contra caídas al hueco: asegura que la puerta de piso no quede abierta sin la cabina delante. Si ves una puerta de piso entreabierta, no te acerques ni la empujes; avisa para que dejen el ascensor fuera de servicio y venga el técnico.",
  "marcas": {
    "schindler": "El manual del 3300 pide comprobar cada 12 meses que la puerta de piso se vuelva a cerrar sola. El operador Varidor 15 mide en su ajuste automático la fuerza del resorte de cierre y marca error si sale de rango."
  },
  "dato": "Una pesa jala igual en todo el recorrido; un resorte jala más fuerte cuanto más estirado está."
});

ASC.def("guiadores_puerta", {
  "nombre": "Guiadores de hoja",
  "alias": ["deslizaderas de puerta", "tacos guía", "zapatas de hoja", "patines inferiores"],
  "ingles": "door gibs (door guide shoes)",
  "resumen": "Tacos de plástico bajo cada hoja que corren dentro de la ranura de la pisadera.",
  "queHace": "Mantienen el pie de la hoja en su carril. La hoja cuelga de arriba, y sin estos tacos se balancearía como una cortina y cedería hacia el hueco al menor empujón. Van atornillados al borde inferior de la hoja y entran en la ranura de la pisadera sin tocar el fondo. El peso lo cargan las roldanas de arriba; los guiadores solo guían.",
  "dondeVa": "Debajo de cada hoja, dos por hoja, uno cerca de cada extremo. Los llevan las puertas de piso y también la de cabina, cada una en la ranura de su propia pisadera.",
  "porTipo": {
    "mr": "Dos por hoja en todas las puertas de piso y en la de cabina.",
    "mrl": "Igual; en puertas nuevas el taco trae un alma o gancho de metal que sujeta la hoja aunque el plástico se rompa o se queme.",
    "hid": "Igual en puertas automáticas; las batientes manuales no llevan."
  },
  "pista": "Tacos de plástico bajo la hoja que corren por la ranura del umbral.",
  "comoReconocer": [
    "Taco de nylon o plástico duro, negro, blanco o azul, más chico que una caja de fósforos.",
    "Va sujeto con uno o dos tornillos a una platina en el borde de abajo de la hoja.",
    "Lo que entra en la ranura de la pisadera es una lengüeta; el resto queda escondido bajo la hoja.",
    "Es de lo poco que puedes ver sin entrar al hueco: con la puerta abierta, fíjate en la ranura de la pisadera y en el pie de la hoja.",
    "No lo confundas con el patín de arrastre, que va arriba en la hoja de cabina y sirve para abrir la cerradura de piso."
  ],
  "fallas": [
    { "sintoma": "La hoja baila o golpetea abajo cuando la puerta se mueve", "causa": "Guiadores gastados: quedó mucho juego dentro de la ranura", "revisar": "La holgura de la hoja a la altura de la pisadera" },
    { "sintoma": "La puerta se frena, raspa o no termina de cerrar", "causa": "Ranura de la pisadera con tierra, piedritas, un tornillo o chicle", "revisar": "La limpieza de la ranura en ese piso antes de pensar en otra cosa" },
    { "sintoma": "El pie de la hoja se sale hacia el pasillo o hacia el hueco", "causa": "Guiador roto o caído, casi siempre por el golpe de una carretilla o un coche de carga", "revisar": "Si los dos guiadores de esa hoja siguen en su sitio. Mientras tanto el ascensor queda fuera de servicio" },
    { "sintoma": "Chirrido abajo al abrir y cerrar", "causa": "Hoja colgada muy baja que roza la pisadera, o guiador deformado que aprieta en la ranura", "revisar": "La luz entre la hoja y la pisadera y cómo entra el guiador" }
  ],
  "seguridad": "Son los que impiden que una hoja ceda hacia el hueco si alguien se apoya o la golpea. Una hoja con el pie suelto es peligro de caída: no la empujes y avisa de inmediato.",
  "marcas": {
    "schindler": "El manual del 3300 da medidas claras: si entre el guiador y el perfil de la pisadera entra una galga de más de 1 mm, el guiador se cambia, y la hoja debe quedar a unos 5 mm de la pisadera. Las ranuras se limpian con aspiradora."
  },
  "dato": "Una moneda o un tornillo en la ranura de la pisadera basta para que la puerta no cierre y el ascensor se quede en ese piso."
});

ASC.def("contacto_puerta_cabina", {
  "nombre": "Microswitch de puerta de cabina",
  "alias": ["contacto de puerta de cabina", "contacto de puerta cerrada", "micro de puerta", "serie de cabina"],
  "ingles": "car door contact (gate switch)",
  "resumen": "Contacto que confirma que la puerta de cabina cerró; sin esa señal el ascensor no parte.",
  "queHace": "Le avisa al tablero que la puerta de cabina está cerrada del todo. Tiene dos mitades: una cajita fija con dos bornes en el cabezal del operador y un puente de metal que viaja en el carro de la hoja. Cuando la hoja llega a su tope, el puente entra en la cajita, une los dos bornes y completa la serie de seguridades. Si la puerta se abre unos milímetros en pleno viaje, el puente sale, la serie se corta y la cabina se detiene.",
  "dondeVa": "Sobre el techo de cabina, al frente, en el cabezal del operador de puertas, cerca del punto donde las hojas se juntan al cerrar. Su cable va a la caja de conexiones de cabina y de ahí al tablero por el cable viajero.",
  "porTipo": {
    "mr": "En el cabezal del operador; en equipos antiguos es un interruptor con ruedita que la hoja empuja al cerrar.",
    "mrl": "En el cabezal del operador; algunos equipos tienen además una traba mecánica en la puerta de cabina con su propio contacto.",
    "hid": "Igual que en los de tracción; para renivelar con la puerta abierta el tablero usa un módulo de seguridad aparte que vigila ese movimiento corto."
  },
  "pista": "Puente de metal que entra en una cajita cuando las hojas de adentro cierran.",
  "comoReconocer": [
    "Cajita de plástico negra o transparente, del tamaño de una caja de fósforos, con dos agujeros al frente y dos cables.",
    "En el carro de la hoja hay una horquilla de metal con dos puntas: el puente que entra en esos agujeros.",
    "Los dos quedan enfrentados y solo se tocan cuando la puerta termina de cerrar.",
    "Está en el cabezal del operador, sobre el techo de cabina, a la vista solo del técnico.",
    "Desde adentro lo notas así: la puerta cerró, pasan unos segundos y la cabina no sale, o la puerta abre y vuelve a cerrar."
  ],
  "fallas": [
    { "sintoma": "La puerta cierra, la cabina no parte y la puerta vuelve a abrir y cerrar", "causa": "El puente no entra bien en el contacto: quedó corrido o flojo, o la hoja no llega a su tope", "revisar": "Si la puerta cierra completa y la posición del puente frente a la cajita" },
    { "sintoma": "Paradas bruscas en pleno viaje, con un tirón, y luego sigue", "causa": "Contacto sucio o con poca entrada, que se abre con la vibración", "revisar": "La limpieza del puente y cuánto entra en el contacto" },
    { "sintoma": "La falla de puerta se repite en cualquier piso, sin preferencia", "causa": "El problema viaja con la cabina: es su contacto y no las cerraduras de piso", "revisar": "Primero el contacto de la puerta de cabina; si fallara en un solo piso, la cerradura de ese piso" },
    { "sintoma": "El tablero marca que la serie no se abrió cuando la puerta abrió", "causa": "Contacto pegado o cableado dañado", "revisar": "El contacto y su cableado; el ascensor queda bloqueado hasta que el técnico lo corrija" }
  ],
  "seguridad": "Es un contacto de la serie de seguridades: impide que la cabina viaje con la puerta abierta. Nunca se puentea ni se traba, y solo lo ajusta personal técnico capacitado.",
  "marcas": {
    "otis": "El catálogo español del Gen2 menciona un dispositivo que impide abrir la puerta de cabina entre plantas.",
    "schindler": "En el 3300 se llama KTC y el manual pide revisarlo y limpiarlo cada 12 meses. En la pantalla del control Bionic, el último indicador de la cadena (ISK) queda abierto cuando la puerta de cabina no cerró.",
    "movilift": "La placa BR200 toma la cadena en varios puntos: ALT1 es la serie de cabina y CS, al final, vigila el cierre de puertas. Si CS sigue cerrado mientras la puerta abre, marca error."
  },
  "dato": "El puente tiene que entrar un tramo mínimo antes de dar señal, para que la puerta esté cerrada de verdad y no solo arrimada."
});

ASC.def("micro_freno", {
  "nombre": "Microswitches del freno",
  "alias": ["micros de freno", "contactos de freno", "sensores de freno", "supervisión de freno"],
  "ingles": "brake monitoring switches",
  "resumen": "Dos interruptores chicos en el freno que le dicen al tablero si abrió y si cerró.",
  "queHace": "El tablero manda abrir el freno, pero necesita saber si abrió de verdad. Cada mitad del freno tiene un microswitch que cambia de estado cuando esa mitad se separa y regresa cuando aprieta. El tablero compara: si mandó abrir y un micro no cambió, o si el ascensor está parado y un micro dice que sigue abierto, bloquea el equipo. Así se descubre un freno que roza durante el viaje o una mitad que ya no sujeta.",
  "dondeVa": "Atornillados al cuerpo del freno, uno por cada mitad o zapata, con la punta apoyada en la pieza que se mueve. De cada uno sale un cable delgado que va al tablero junto con los cables del motor.",
  "porTipo": {
    "mr": "En frenos de tambor van junto a cada zapata o a su palanca; muchas máquinas antiguas no los tienen y se agregan al modernizar el tablero.",
    "mrl": "Vienen de fábrica en la máquina gearless, uno por cada mitad del freno, y el tablero los revisa en cada arranque y en cada parada."
  },
  "pista": "Dos interruptores diminutos que avisan si las zapatas soltaron o apretaron.",
  "comoReconocer": [
    "Cajita de plástico negra o gris, del tamaño de un borrador chico, con un botoncito, una palanquita o una ruedita.",
    "Hay dos, uno en cada mitad del freno, cada uno con un tornillo de regulación al lado.",
    "De cada uno sale un cable delgado de dos o tres hilos.",
    "En frenos nuevos puede ser un sensor sin contacto: un cilindro roscado con un LED en la cola.",
    "Con cuarto de máquinas los ves sobre el freno, al lado del motor. En un equipo sin cuarto de máquinas están arriba del hueco y solo los ve el técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor no arranca y el tablero marca falla de freno", "causa": "Un micro no cambió al abrir: está desajustado o sucio, o el freno no abre completo", "revisar": "Si las dos mitades del freno abren de verdad, y recién después el ajuste del micro" },
    { "sintoma": "Se bloquea a ratos, sobre todo con la máquina caliente", "causa": "Micro regulado al límite, que deja de marcar cuando el freno se dilata o el forro se gasta", "revisar": "La separación del freno y la posición del micro" },
    { "sintoma": "Queda bloqueado y no vuelve aunque se apague y se prenda", "causa": "El tablero guardó una falla de freno que solo se borra con el rearme del técnico", "revisar": "El historial de fallas; el técnico busca la causa antes de rearmar" },
    { "sintoma": "Falla de freno que va y viene sin que el freno tenga nada", "causa": "Cable del micro partido, borne flojo o conector sulfatado", "revisar": "El cableado entre el freno y el tablero" }
  ],
  "seguridad": "Vigilan una parte de seguridad y nunca se anulan. Si el tablero bloquea por falla de freno, el ascensor queda fuera de servicio hasta que personal técnico capacitado encuentre la causa.",
  "marcas": {
    "schindler": "En el 3300 los contactos se llaman KB y KB1. Ante una falla de freno el manual manda revisar si están sucios y su cableado; si falla el micro se corrige su posición, pero el freno no se repara, se cambia completo.",
    "movilift": "En la placa BR200 entran por los bornes BR1 y BR2, y durante la marcha los dos deben estar activos. Si uno no cambia, la placa da una falla bloqueante que no se borra ni reiniciando la tarjeta."
  },
  "dato": "A diferencia de una cerradura, estos micros van fuera de la serie de seguridades: el tablero los lee aparte y decide si bloquea."
});

ASC.def("contacto_paracaidas", {
  "nombre": "Microswitch del paracaídas",
  "alias": ["contacto de cuñas", "contacto del paracaídas", "micro de acuñamiento"],
  "ingles": "safety gear switch",
  "resumen": "Interruptor junto a la palanca del paracaídas que corta la maniobra cuando las cuñas actúan.",
  "queHace": "Cuando el cable del limitador jala la palanca y las cuñas muerden la guía, la misma palanca empuja este microswitch. El contacto abre la serie de seguridades y el motor se queda sin corriente, para que la máquina no siga jalando una cabina que ya está clavada. En muchos equipos queda trabado en posición abierta: aunque la palanca regrese, el ascensor sigue parado hasta que el técnico lo rearma.",
  "dondeVa": "En el bastidor de cabina, al lado de la palanca o de la barra que une los dos bloques del paracaídas. Según el equipo queda debajo de la cabina o arriba, en el cabezal superior.",
  "porTipo": {
    "mr": "Junto a la palanca del paracaídas, en el bastidor; su señal sube al tablero del cuarto de máquinas por el cable viajero.",
    "mrl": "Junto a la palanca, cerca de las poleas bajo cabina; su cable pasa por la caja de conexiones del techo.",
    "hid": "En el bastidor mochila, del lado de las guías, junto a la palanca que une los dos bloques."
  },
  "pista": "Interruptor que la palanca de las cuñas empuja cuando la cabina se clava.",
  "comoReconocer": [
    "Interruptor de caja plástica o metálica, del tamaño de una caja de fósforos, con un vástago o una ruedita.",
    "Está a milímetros de la palanca del paracaídas o de una leva montada en la barra de unión.",
    "Muchos tienen un botón o una palanquita de rearme: una vez accionado, se queda así.",
    "De él sale un cable delgado que va a la caja de conexiones de la cabina.",
    "Solo se ve desde el techo de cabina o desde el foso, zonas del técnico."
  ],
  "fallas": [
    { "sintoma": "Cabina clavada entre pisos y tablero con la serie de seguridades abierta", "causa": "El paracaídas actuó y accionó su contacto, que es lo que debe pasar", "revisar": "El técnico busca primero por qué actuó: limitador, su cable y las marcas en la guía" },
    { "sintoma": "El ascensor no arranca después de una prueba o una revisión, sin que las cuñas estén mordiendo", "causa": "El contacto quedó accionado y no fue rearmado", "revisar": "La posición de la palanca y del contacto; lo rearma el técnico" },
    { "sintoma": "Paradas repentinas en pleno viaje sin que la cabina se clave", "causa": "Contacto muy pegado a la palanca, que se abre con la vibración, o borne flojo", "revisar": "La separación entre la palanca y el contacto y el ajuste de sus bornes" }
  ],
  "seguridad": "Forma parte del sistema del paracaídas y de la serie de seguridades. No se puentea ni se rearma por cuenta propia: si actuó, hay una causa, y la busca personal técnico capacitado.",
  "marcas": {
    "otis": "En el Gen360, que no figura en el catálogo peruano, Otis reemplaza las seguridades mecánicas por un sistema electrónico.",
    "schindler": "En el 3300 el contacto se llama KF. Si el paracaídas actúa, el control registra la cadena abierta en el tramo de cabina (indicador ISK) y el ascensor queda bloqueado hasta el reset del técnico.",
    "movilift": "La placa BR200 agrupa los contactos que viajan con la cabina en la entrada ALT1; si esa serie se abre, lo muestra en pantalla."
  },
  "dato": "La norma EN 81-20 pide que este contacto abra antes o en el mismo momento en que las cuñas muerden, nunca después."
});

ASC.def("cable_flojo", {
  "nombre": "Contacto de cable flojo",
  "alias": ["micro de cable flojo", "contacto de aflojamiento de cables", "seguridad de cable flojo"],
  "ingles": "slack rope switch",
  "resumen": "Microswitch en el amarre de los cables que para el ascensor si uno pierde tensión.",
  "queHace": "En el hidráulico de tiro indirecto la cabina cuelga de cables que pasan por la polea del pistón, y cada cable termina en una varilla con resorte. Mientras el cable carga, su resorte está comprimido; si se afloja o se rompe, el resorte se estira y la varilla empuja una platina que acciona este microswitch. El contacto abre la serie de seguridades y el ascensor se detiene. Así la cabina no sigue trabajando colgada de un solo cable, ni un cable suelto se sale de la polea.",
  "dondeVa": "En el amarre fijo de los cables, abajo, junto a la base del pistón. En otros equipos va en el amarre que viaja con el bastidor de cabina.",
  "porTipo": {
    "hid": "Va en el anclaje fijo de los dos cables, junto al pistón, y una sola platina vigila los dos resortes a la vez."
  },
  "pista": "Interruptor junto a los resortes del anclaje: salta si uno se estira.",
  "comoReconocer": [
    "Microswitch de caja plástica con palanquita o ruedita, parecido a los de las puertas, montado sobre el amarre de los cables.",
    "Debajo o al lado de los resortes de las varillas hay una platina o varilla atravesada que los toca a todos.",
    "Si un resorte se estira más que el otro, empuja esa platina y la platina acciona el contacto.",
    "De él sale un cable eléctrico delgado que va por la canaleta del hueco hasta el tablero.",
    "Está dentro del hueco, junto al pistón; solo lo ve el técnico."
  ],
  "fallas": [
    { "sintoma": "El ascensor se queda parado y el tablero marca la serie de seguridades abierta", "causa": "Un cable se estiró más que el otro y su resorte accionó el contacto", "revisar": "La altura de los resortes del amarre: deben verse parejos" },
    { "sintoma": "Se para después de que la cabina quedó trabada o apoyada abajo", "causa": "El pistón siguió bajando sin la cabina, los cables se quedaron sin carga y el contacto actuó", "revisar": "Por qué la cabina se quedó: paracaídas, guías, amortiguador o una fuga de aceite" },
    { "sintoma": "Paradas que van y vienen, sobre todo al arrancar o al frenar", "causa": "Contacto regulado muy justo, que se abre con el rebote de los resortes", "revisar": "La separación entre la platina y el microswitch y el ajuste de sus bornes" }
  ],
  "seguridad": "Si este contacto actuó es porque un cable dejó de cargar, y eso se revisa antes de mover la cabina. No se puentea ni se regula por cuenta propia: es trabajo de personal técnico capacitado.",
  "marcas": {
    "schindler": "El 3300, que es de fajas, tiene su equivalente: una palanca basculante que acciona un interruptor de cinta floja. Cuando actúa, la cadena de seguridad se abre y la cabina no se mueve ni con el mando de inspección.",
    "movilift": "MoviLift publica la suspensión solo de su montacoches: la versión hidráulica es 2:1, es decir de tiro indirecto con cables, el tipo de equipo donde va este contacto."
  },
  "dato": "Cuando la cabina cuelga de solo dos cables, la norma pide un contacto que pare el ascensor si uno se estira más que el otro."
});

/* Serie de seguridades: los contactos que, puestos en serie, dejan o no dejan mover el ascensor.
   Orden de recorrido: foso, hueco y parte alta, cabina, puertas y, al final, la supervisión del freno. */
ASC.seguridades = [
  { "nombre": "Stop de foso", "parte": "stop_foso", "donde": "Seta roja en la pared del hueco, a la mano desde la puerta del piso más bajo.", "abre": "Se abre cuando la presionan y queda trabada: el ascensor no se mueve por ningún motivo hasta que el técnico la suelta." },
  { "nombre": "Contacto de la polea tensora", "parte": "polea_tensora", "donde": "En el foso, junto a la polea con pesa que mantiene tirante el cable del limitador.", "abre": "Se abre si el cable del limitador se estira o se rompe y la pesa baja; el ascensor se detiene y no vuelve a arrancar." },
  { "nombre": "Contacto del amortiguador de aceite", "parte": "amortiguadores", "donde": "En el foso, en el cuerpo del amortiguador hidráulico; los de resorte y los de poliuretano no lo llevan.", "abre": "Se abre si el vástago quedó hundido y no regresó arriba; el ascensor no arranca hasta que el amortiguador vuelve a su posición." },
  { "nombre": "Final de carrera inferior", "parte": "finales_carrera", "donde": "En la guía o en el muro, un poco más abajo del nivel del piso más bajo.", "abre": "Se abre si la cabina se pasa hacia abajo y su leva empuja la ruedita; el ascensor queda bloqueado hasta que el técnico lo revise." },
  { "nombre": "Final de carrera superior", "parte": "finales_carrera", "donde": "En la guía o en el muro, un poco más arriba del nivel del último piso.", "abre": "Se abre si la cabina se pasa hacia arriba, antes de que el contrapeso llegue a su amortiguador o el pistón a su tope; el ascensor queda bloqueado." },
  { "nombre": "Contacto del limitador de velocidad", "parte": "limitador", "donde": "En el propio limitador, en el cuarto de máquinas o en lo alto del hueco.", "abre": "Se abre cuando la cabina pasa de la velocidad permitida, antes o al mismo tiempo que el limitador traba su cable; corta el motor y queda accionado hasta el rearme." },
  { "nombre": "Contacto de faja floja", "parte": "monitor_fajas", "donde": "En el amarre fijo de las fajas, arriba del hueco, al lado del monitor de fajas.", "abre": "Se abre si una faja pierde tensión; la cabina se detiene y no vuelve a arrancar." },
  { "nombre": "Contacto de cable flojo", "parte": "cable_flojo", "donde": "En el anclaje fijo de los cables del hidráulico, junto a la base del pistón.", "abre": "Se abre si un cable se afloja o se estira más que el otro; el ascensor se detiene." },
  { "nombre": "Stop de techo de cabina", "parte": "caja_inspeccion", "donde": "Seta roja de la botonera de inspección, sobre el techo de cabina, cerca del borde de la puerta.", "abre": "Se abre cuando el técnico la presiona para trabajar arriba; mientras está trabada la cabina no se mueve." },
  { "nombre": "Microswitch del paracaídas", "parte": "contacto_paracaidas", "donde": "En el bastidor de cabina, junto a la palanca del paracaídas.", "abre": "Se abre cuando las cuñas actúan; corta el motor y el ascensor sigue parado hasta que el técnico lo rearma." },
  { "nombre": "Contacto de la cerradura de piso", "parte": "cerradura", "donde": "En la cerradura de cada puerta de piso, dentro del cabezal, del lado del hueco; hay uno por piso y todos van en serie.", "abre": "Se abre apenas el gancho se levanta: con una sola puerta de piso sin trabar la cabina no arranca, y si se abre en pleno viaje se detiene." },
  { "nombre": "Contacto de la hoja sin cerradura", "parte": "cabezal_piso", "donde": "En el cabezal de cada puerta de piso, del lado de la hoja que es arrastrada por el cable de sincronismo.", "abre": "Se abre si esa hoja no llegó a cerrar, por ejemplo con el cable de sincronismo roto; el ascensor no sale de ese piso." },
  { "nombre": "Microswitch de puerta de cabina", "parte": "contacto_puerta_cabina", "donde": "En el cabezal del operador, sobre el techo de cabina, con su puente en el carro de la hoja.", "abre": "Se abre apenas la puerta de cabina empieza a abrir: la cabina no parte con la puerta abierta y se detiene si se abre en pleno viaje." },
  { "nombre": "Microswitches del freno (supervisión)", "parte": "micro_freno", "donde": "En el freno de la máquina, uno por cada mitad.", "abre": "Van fuera de la serie: el tablero los lee aparte y, si el freno no abre o no cierra cuando debe, bloquea el ascensor." }
];
