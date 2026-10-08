/* Taller de Ascensores: guía de campo y tabla de síntomas.
   Material educativo. No es un manual de mantenimiento. */

ASC.guia = [
  {
    "lugar": "En el hall, frente a la puerta",
    "intro": "Desde aquí ves la puerta de piso, el botón de llamada y el umbral. Con eso ya sabes bastante de cómo está el ascensor, y no necesitas tocar nada más que el botón.",
    "puntos": [
      { "parte": "puerta_piso", "mira": "Son dos hojas de metal, de acero inoxidable o pintadas, que se abren desde el centro o se corren hacia un lado. Fíjate si cierran parejas y sin rendija: una hoja caída, abollada o que roza abajo te avisa que esa puerta se va a trabar." },
      { "parte": "botonera_piso", "mira": "La placa con el botón está al costado de la puerta, a la altura de la mano, y el indicador de piso va encima del marco. Presiona una vez: si el botón no prende o al indicador le faltan pedazos de número, la falla suele estar en esta misma placa." },
      { "parte": "pisadera", "mira": "Es el umbral de aluminio con una ranura a lo largo, por donde corre la parte de abajo de las hojas. Mira la ranura cuando la puerta abra: piedritas, chapitas o tierra ahí adentro son la causa más común de que la puerta no cierre." },
      { "parte": "posicionamiento", "mira": "Cuando la cabina llegue, mira juntas las dos pisaderas, la del piso y la de la cabina. Deben quedar al ras; si queda un escalón que se nota al pisar, los sensores de posición necesitan ajuste." },
      { "parte": "cabezal_piso", "mira": "No lo ves porque queda escondido encima de la puerta, del lado del hueco, pero lo escuchas. Si al abrir suena a ruedas que raspan o traquetean, los carros de los que cuelgan las hojas están gastados o sucios." },
      { "parte": "cerradura", "mira": "En la parte alta de una hoja o del marco vas a ver un agujerito con forma de triángulo: es la entrada de la llave del técnico. Detrás está el enclavamiento que impide abrir la puerta si la cabina no está; es una seguridad y solo la manipula personal técnico capacitado." }
    ]
  },
  {
    "lugar": "Dentro de la cabina",
    "intro": "Entra y date una vuelta mirando paredes, techo, piso y el panel de botones. Casi todo lo que el usuario nota en el día a día pasa aquí.",
    "puntos": [
      { "parte": "cabina", "mira": "Mira los paneles de las paredes, el piso, el pasamanos y el techo con sus luces. Paneles sueltos que suenan al viajar, un piso que se hunde al pisar o luces que parpadean te hablan de un mantenimiento flojo." },
      { "parte": "botonera_cabina", "mira": "Es el panel vertical al lado de la puerta, con un botón por piso, los de abrir y cerrar, la campana de alarma y una pantallita arriba. Fíjate si cada botón prende al presionarlo y si la pantalla marca el piso donde realmente estás." },
      { "parte": "puerta_cabina", "mira": "Son las hojas que viajan contigo; al llegar a un piso, ellas arrastran a las de afuera. Míralas cerrar: deben moverse suave, bajar la velocidad antes de juntarse y quedar firmes, sin bailar." },
      { "parte": "cortina_luminosa", "mira": "En los cantos de la puerta de cabina hay dos regletas delgadas, oscuras o rojizas, de arriba abajo. Entre ellas cruzan rayos que no se ven: si alguien pasa mientras la puerta cierra, debe volver a abrir sin llegar a tocarlo." },
      { "parte": "operador_puertas", "mira": "Está sobre el techo, justo encima de la puerta, así que desde adentro solo lo escuchas: un zumbido corto de motor cada vez que abre o cierra. Si suena forzado o la puerta se mueve a tirones, el operador o su correa piden revisión." },
      { "parte": "pesacargas", "mira": "Busca la placa que dice cuántas personas y cuántos kilos carga. El sensor está bajo el piso y no se ve; lo que sí ves es el aviso de sobrecarga en la pantalla, con un pitido, cuando entra demasiado peso y la puerta se queda abierta." },
      { "parte": "emergencia", "mira": "En el techo hay una luminaria chica que debe quedarse prendida si se va la luz, y en la botonera está el botón de alarma con la rejilla del intercomunicador. Pregúntale al conserje si la alarma suena y quién contesta del otro lado." }
    ]
  },
  {
    "lugar": "En el último piso y la azotea",
    "intro": "Sube al último piso y, si te dejan pasar, a la azotea; al cuarto de máquinas entra solo acompañado del técnico o del encargado, y sin tocar nada. Aquí vas a saber qué tipo de ascensor tienes: con cuarto de máquinas, sin cuarto de máquinas o hidráulico.",
    "puntos": [
      { "parte": "maquina", "mira": "Si en la azotea hay un cuartito de ladrillo justo encima del hueco, con puerta metálica y candado, el ascensor tiene cuarto de máquinas y ahí adentro está el motor. Si no hay nada y el edificio tiene varios pisos, la máquina va dentro del hueco, arriba, y desde afuera no se ve." },
      { "parte": "central_hidraulica", "mira": "Si arriba no encuentras nada y el edificio es bajo, busca en el primer piso o en el sótano un cuartito pegado al ascensor. Un tanque metálico con olor a aceite y una manguera gruesa que se mete hacia el hueco te dicen que es hidráulico." },
      { "parte": "tablero_control", "mira": "En los que no tienen cuarto de máquinas está en el último piso: un panel angosto y alto, con cerradura, metido en el marco de la puerta del ascensor o justo al lado. En los otros es un gabinete metálico dentro del cuarto de máquinas o junto a la central; adentro hay corriente y lo abre solo el técnico." },
      { "parte": "interruptor_principal", "mira": "Es una caja con una manija grande, en la pared del cuarto de máquinas cerca de la puerta, o dentro del tablero en los que no tienen cuarto. Corta la fuerza del ascensor, pero no la luz de la cabina, y se puede asegurar con candado; lo maniobra el técnico o el personal autorizado del edificio." },
      { "parte": "rescate", "mira": "Al lado del tablero puede haber otro gabinete más chico, con baterías adentro. Si el ascensor lo tiene, cuando se va la luz la cabina avanza sola y despacio hasta el piso más cercano y abre la puerta." },
      { "parte": "limitador", "mira": "En el cuarto de máquinas es una rueda del tamaño de un plato, con un cable delgado que baja por un agujero de la losa. Vigila la velocidad de la cabina y, si se pasa, dispara el paracaídas; es una seguridad y solo la toca personal técnico capacitado." },
      { "parte": "freno", "mira": "Pegado a la máquina vas a ver un tambor o un disco con una palanca pintada de rojo. Esa palanca abre el freno a mano y se usa solo en un rescate, por personal técnico capacitado; nunca la muevas." }
    ]
  },
  {
    "lugar": "Sobre el techo de cabina y dentro del hueco (solo personal técnico)",
    "intro": "Aquí solo entra personal técnico capacitado, con el ascensor en modo de inspección. Sirve conocerlo para entender qué hay del otro lado de las paredes de la cabina.",
    "puntos": [
      { "parte": "caja_inspeccion", "mira": "Es una caja amarilla sobre el techo de la cabina, con un botón rojo grande de parada, una perilla selectora y dos pulsadores para subir y bajar. Con ella el técnico mueve la cabina despacio mientras trabaja encima." },
      { "parte": "operador_puertas", "mira": "Va al frente del techo, sobre la puerta: un motor chico, una correa dentada negra y un riel del que cuelgan las hojas. Es lo que más se ajusta en un mantenimiento, porque la mayoría de fallas del día a día son de puertas." },
      { "parte": "guias_cabina", "mira": "Son dos rieles de acero con forma de T que suben pegados a las paredes del hueco, de abajo hasta arriba. Deben verse rectos, con una capa fina de aceite y sin óxido ni rayas profundas." },
      { "parte": "rozaderas", "mira": "En cada esquina del bastidor hay una zapata que abraza la guía, con un forro de plástico por dentro. Cuando ese forro se gasta, la cabina baila de lado a lado y empieza a sonar." },
      { "parte": "cables_traccion", "mira": "Son cables de acero redondos, del grosor de un dedo, o cintas planas y forradas en los equipos más nuevos. Sostienen la cabina, y el técnico les busca hilos rotos, óxido rojizo o tensión dispareja entre uno y otro." },
      { "parte": "contrapeso", "mira": "Es un marco de acero lleno de bloques apilados que corre al costado o al fondo del hueco, en sentido contrario a la cabina. Se cruza con ella a mitad del recorrido, y es una de las razones por las que nadie sin capacitación debe estar ahí; los hidráulicos no lo llevan." },
      { "parte": "posicionamiento", "mira": "En cada piso hay una plaquita metálica fija en el hueco, y sobre la cabina un sensor con forma de U que la lee al pasar. Así sabe el tablero dónde está la cabina y dónde parar para quedar al ras." }
    ]
  },
  {
    "lugar": "En el foso (solo personal técnico)",
    "intro": "El foso es la parte del hueco que queda debajo del piso más bajo. Solo baja personal técnico capacitado, con el ascensor detenido y asegurado.",
    "puntos": [
      { "parte": "stop_foso", "mira": "Cerca de la puerta del piso más bajo, por el lado de adentro, hay una caja con un botón rojo tipo hongo y una escalera amarilla pegada a la pared. El botón deja el ascensor parado mientras el técnico está abajo." },
      { "parte": "amortiguadores", "mira": "Están en el piso del foso, justo bajo la cabina y bajo el contrapeso: resortes gruesos de acero o tacos de poliuretano que parecen un cilindro de goma dura. Sirven para el caso de que la cabina o el contrapeso se pasen de su recorrido hacia abajo, y se cambian cuando están rajados o deformados." },
      { "parte": "polea_tensora", "mira": "Es una polea con una pesa colgada, a un costado del foso, que mantiene estirado el cable delgado del limitador. Si la pesa baja demasiado, un contacto detiene el ascensor: es señal de que ese cable se estiró." },
      { "parte": "paracaidas", "mira": "Mirando la cabina desde abajo, a cada lado del bastidor hay un bloque de acero pegado a la guía, con cuñas adentro. Si la cabina baja más rápido de lo debido, las cuñas muerden la guía y la dejan clavada; es la seguridad principal y solo la prueba el técnico." },
      { "parte": "faldon", "mira": "Es una plancha de metal que cuelga bajo el umbral de la cabina, del ancho de la puerta. Tapa el vacío hacia el hueco cuando la cabina queda detenida un poco más arriba del piso." },
      { "parte": "cadena_compensacion", "mira": "En edificios altos con cuarto de máquinas cuelga una cadena forrada que baja de la cabina, da la vuelta en el foso y sube al contrapeso. Si golpea contra algo al viajar, desde la cabina se escucha como un cascabeleo." },
      { "parte": "piston", "mira": "En los hidráulicos el cilindro se apoya aquí y sube pegado a un costado del hueco, con un vástago cromado y brillante. Abajo, en la entrada de aceite, lleva la válvula paracaídas; aceite chorreado en el foso es señal de sellos gastados." }
    ]
  }
];

ASC.sintomas = [
  {
    "sintoma": "La puerta abre y cierra varias veces sin que nadie pase",
    "partes": ["cortina_luminosa", "pisadera", "operador_puertas"],
    "explica": "Lo primero es la cortina luminosa: una regleta sucia, golpeada o chueca cree que hay alguien y manda reabrir. Después se mira si hay algo en la ranura de la pisadera y, al final, el ajuste del operador."
  },
  {
    "sintoma": "La puerta no termina de cerrar o se queda a medias",
    "partes": ["pisadera", "cabezal_piso", "operador_puertas"],
    "explica": "Casi siempre hay una piedrita o basura en la ranura de la pisadera de ese piso. Si la ranura está limpia, el técnico revisa las ruedas y el riel del cabezal, y luego la fuerza con la que empuja el operador."
  },
  {
    "sintoma": "La puerta se cierra aunque alguien esté pasando",
    "partes": ["cortina_luminosa", "operador_puertas"],
    "explica": "La cortina luminosa no está viendo a la persona, por rayos apagados o regletas dañadas. Es un tema de seguridad: avisa al técnico, que además comprueba que el operador retroceda cuando la puerta encuentra un obstáculo."
  },
  {
    "sintoma": "La puerta chirría, traquetea o da un golpe al abrir o cerrar",
    "partes": ["cabezal_piso", "pisadera", "operador_puertas"],
    "explica": "Si suena en un solo piso, el problema está en el cabezal o en la pisadera de ese piso: ruedas gastadas, riel sucio o una hoja rozando abajo. Si suena en todos, se revisa el operador y su correa, que viajan con la cabina."
  },
  {
    "sintoma": "La cabina llega al piso pero la puerta no abre",
    "partes": ["operador_puertas", "patin", "cerradura"],
    "explica": "Primero se revisa el operador, que es el único motor de puertas que hay. Si el operador se mueve y la puerta de piso no lo sigue, el patín no está enganchando las ruedas de la cerradura."
  },
  {
    "sintoma": "Una puerta de piso queda entreabierta cuando la cabina no está",
    "partes": ["cabezal_piso", "cerradura"],
    "explica": "La puerta de piso debe cerrarse sola, por la pesa de cierre del cabezal, y quedar trabada por la cerradura. Si no lo hace hay riesgo de caída al hueco: no te acerques, pide que dejen el ascensor fuera de servicio y que llamen al técnico."
  },
  {
    "sintoma": "Se detiene con escalón, más arriba o más abajo del piso",
    "partes": ["posicionamiento", "encoder", "freno"],
    "explica": "Se empieza por los sensores de posición y la plaquita del piso, sobre todo si pasa siempre en el mismo. Si pasa en todos, se revisa el encoder y el desgaste del freno; en un hidráulico se mira el bloque de válvulas."
  },
  {
    "sintoma": "Se queda detenido entre dos pisos",
    "partes": ["cerradura", "tablero_control", "rescate"],
    "explica": "Lo más común es que el contacto de alguna cerradura se abra en pleno viaje y el tablero corte por seguridad; si fue un corte de luz, el rescate automático debió llevar la cabina a un piso. Quien está adentro toca la alarma y espera al técnico o a los bomberos, sin forzar las puertas."
  },
  {
    "sintoma": "No viene cuando lo llamas desde un piso, pero sí desde los demás",
    "partes": ["botonera_piso", "tablero_control"],
    "explica": "El botón de ese piso está gastado o se le soltó un cable, y la llamada no llega. Si el botón prende y el ascensor igual no viene, el técnico revisa en el tablero si la llamada se está registrando."
  },
  {
    "sintoma": "No responde desde ningún piso",
    "partes": ["interruptor_principal", "cerradura", "tablero_control"],
    "explica": "Si los indicadores están apagados, lo primero es saber si llega corriente al interruptor principal. Si hay luz y el ascensor no se mueve, suele haber una puerta de piso mal cerrada en algún nivel o una falla guardada en el tablero, que lee el técnico."
  },
  {
    "sintoma": "Un botón de la cabina no marca o no se queda prendido",
    "partes": ["botonera_cabina", "cable_viajero"],
    "explica": "Lo normal es un pulsador gastado, sobre todo el del primer piso, que es el que más se usa. Si fallan varios botones a la vez, el técnico sospecha del cable viajero, que lleva todas las señales de la cabina al tablero."
  },
  {
    "sintoma": "La luz de la cabina parpadea o está apagada",
    "partes": ["cabina", "cable_viajero", "emergencia"],
    "explica": "Casi siempre es un foco o una luminaria del techo de la cabina que ya cumplió su tiempo. Si se apaga toda la cabina, se revisa la alimentación que llega por el cable viajero, y en ese momento la luz de emergencia debería prenderse sola."
  },
  {
    "sintoma": "Olor a quemado en la cabina, el hall o el cuarto de máquinas",
    "partes": ["freno", "maquina", "tablero_control"],
    "explica": "Puede ser el freno rozando porque no abre del todo, el motor recalentado o un componente quemado en el tablero; en un hidráulico, el aceite de la central recalentado. No se sigue usando: se deja fuera de servicio y se llama al técnico de inmediato."
  },
  {
    "sintoma": "La cabina vibra o tiembla durante el viaje",
    "partes": ["rozaderas", "guias_cabina", "fijaciones"],
    "explica": "Primero se miran las rozaderas, que con el forro gastado dejan a la cabina con juego contra la guía. Luego las guías y sus empalmes: un empalme con escalón se siente como un salto siempre a la misma altura."
  },
  {
    "sintoma": "Chirrido o raspado mientras la cabina se mueve",
    "partes": ["guias_cabina", "rozaderas", "patin"],
    "explica": "Guías secas o rozaderas gastadas dan un chirrido largo durante todo el viaje. Un golpecito o un raspón corto cada vez que pasas por un piso es el patín rozando las ruedas de una cerradura."
  },
  {
    "sintoma": "Zumbido o ronquido fuerte que viene de arriba",
    "partes": ["maquina", "polea_traccion", "freno"],
    "explica": "El ruido viene de la máquina: rodamientos gastados o, en las que tienen reductor, falta de aceite. Si suena a roce metálico parejo, se revisa también la polea de tracción y que el freno abra completo."
  },
  {
    "sintoma": "Arranca o frena con un jalón",
    "partes": ["freno", "encoder", "tablero_control"],
    "explica": "Se revisa primero que el freno abra y cierre a tiempo, luego el encoder y los ajustes del variador en el tablero. En un hidráulico el jalón viene del bloque de válvulas, que regula cómo entra y sale el aceite."
  },
  {
    "sintoma": "Marca sobrecarga y no cierra la puerta con poca gente adentro",
    "partes": ["pesacargas", "cabina"],
    "explica": "El pesacargas está descalibrado o su sensor falló, y cree que la cabina está llena. También se revisa si a la cabina le agregaron peso sin avisar, como un piso nuevo más pesado o espejos."
  },
  {
    "sintoma": "En un hidráulico, la cabina baja sola cuando está parada",
    "partes": ["bloque_valvulas", "piston", "manguera"],
    "explica": "El aceite está regresando al tanque o se está saliendo. Se empieza por las válvulas del bloque, que deben cerrar sin dejar pasar nada, y se sigue con los sellos del pistón y las uniones de la manguera buscando aceite chorreado."
  },
  {
    "sintoma": "En un hidráulico, no sube con carga o sube muy lento",
    "partes": ["central_hidraulica", "bloque_valvulas", "manguera"],
    "explica": "Primero se mira el nivel y el estado del aceite en la central, y si la bomba da presión. Después el bloque de válvulas, donde una válvula mal regulada deja escapar la presión, y por último las fugas en la manguera."
  }
];
