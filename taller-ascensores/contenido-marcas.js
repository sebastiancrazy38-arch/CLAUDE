/* Taller de Ascensores: marcas, tipos y normas.
   Solo datos verificados o con confianza alta/media. Lo que no se pudo confirmar va en "nota". */

ASC.marcas = [
  {
    "id": "otis",
    "nombre": "Otis",
    "enPeru": "Otis llega al Perú a través de Ascensores S.A. (ascensores.pe), con sede en Av. Vía de Evitamiento 1784, Ate, que en su web se presenta como distribuidor exclusivo de la marca. El diario Gestión ubica el inicio de esa representación en 1987 y la empresa habla de 70 años de Otis en el país. Otis no tiene página propia para el Perú, así que el catálogo local es el de ascensores.pe.",
    "comoReconocer": [
      "Empieza por lo fácil: busca el nombre Otis en la botonera de cabina, en la placa de capacidad o en la pisadera. Un sticker de servicio de Ascensores S.A. también es buena pista.",
      "Si el edificio no tiene caseta de máquinas en la azotea y el ascensor es Otis, lo más probable es que sea un Gen2 MRL, el único que el catálogo peruano presenta sin cuarto de máquinas.",
      "El sello de la familia Gen2 son las cintas planas de acero forradas en poliuretano, que reemplazan a los cables redondos. Van dentro del hueco, así que solo las ves si un técnico tiene el equipo abierto.",
      "Si la cabina cuelga de cables redondos de acero y arriba hay un cuarto de máquinas pequeño, piensa en un Arise.",
      "En equipos con cintas vas a oír hablar de Pulse, el sistema que las vigila las 24 horas. La web peruana lo llama RBI."
    ],
    "modelos": [
      {
        "nombre": "Gen2 MRL",
        "tipo": "mrl",
        "estado": "En catálogo en el Perú",
        "para": "Edificios de vivienda, oficinas y comercios de baja y mediana altura que no quieren perder espacio en una caseta de máquinas.",
        "datos": [
          ["Capacidad", "450 a 1600 kg, según el distribuidor peruano"],
          ["Velocidad", "Hasta 1,75 m/s sin cuarto de máquinas según Otis; la web peruana anuncia hasta 3,5 m/s (mira la nota)"],
          ["Recorrido", "La web peruana declara hasta 150 m y 50 paradas; el tope propio de la versión sin cuarto no está confirmado"],
          ["Tracción", "Cintas planas de acero recubiertas de poliuretano, que no se lubrican, y máquina sin engranajes de imanes permanentes"],
          ["Máquina", "Dentro del hueco. No hay cuarto de máquinas"],
          ["Tablero", "Sin confirmar para el Perú. Catálogos de Otis de otros países lo ponen en un gabinete angosto junto a la puerta del último piso"]
        ],
        "reconocer": [
          "Mira la azotea desde la calle: sobre el ascensor no hay caseta de máquinas.",
          "En el último piso, fíjate si junto a la puerta del ascensor hay un gabinete metálico alto y angosto. Un folleto de Otis para Suiza da un controlador de unos 2,10 m de alto por 40 cm de ancho; que vaya en ese lugar en los equipos del Perú no está verificado.",
          "Si alguna vez ves al técnico trabajando, vas a notar cintas planas, parecidas a correas, donde un ascensor tradicional tiene cables redondos. Míralo desde lejos: el hueco abierto es zona del técnico.",
          "Las cintas no se lubrican, así que no vas a ver los cables brillosos de grasa de un ascensor antiguo."
        ],
        "nota": "La web peruana le da al GEN2 MRL hasta 3,5 m/s, 150 m y 50 paradas. Otis Argentina publica 1,75 m/s como máximo sin cuarto de máquinas, y los 150 m y 50 paradas como tope de toda la familia Gen2 Comfort. Tampoco están confirmados la polea de tracción de unos 80 mm que cita un catálogo ni el punto exacto del hueco donde va la máquina.",
        "fuente": "https://ascensores.pe/transporte-vertical/ascensores/gen-2-mrl"
      },
      {
        "nombre": "Gen2 MR",
        "tipo": "mr",
        "estado": "En catálogo en el Perú",
        "para": "Edificios de mediana y gran altura donde sí hay espacio para un cuarto de máquinas pequeño.",
        "datos": [
          ["Capacidad", "450 a 1600 kg, según el distribuidor peruano"],
          ["Velocidad", "1,0 a 2,5 m/s, según el distribuidor peruano"],
          ["Recorrido", "Hasta 140 m y 50 paradas, según el distribuidor peruano"],
          ["Tracción", "Cintas planas de acero recubiertas de poliuretano y máquina sin engranajes de imanes permanentes"],
          ["Máquina", "En un cuarto de máquinas compacto encima del hueco, que no ocupa más que la planta del hueco"],
          ["Tablero", "Las fuentes no lo detallan; lo normal es que vaya en el cuarto de máquinas"]
        ],
        "reconocer": [
          "En la azotea hay una caseta pequeña justo encima del ascensor, que no ocupa más planta que el hueco.",
          "Adentro la máquina es chica para lo que mueve: no tiene caja de engranajes y trabaja con cintas planas.",
          "La puerta de ese cuarto debe estar cerrada con llave. Ahí entra solo personal autorizado.",
          "Si el edificio es más alto de lo que cubre un equipo sin cuarto y el ascensor es Otis de cintas, apunta a este modelo."
        ],
        "nota": "El folleto global de Otis da cifras más bajas para el Gen2 con cuarto de máquinas (630 a 1600 kg, 125 m y 36 paradas), y Otis Argentina publica hasta 3 m/s con cuarto compacto. Las fichas cambian según el país.",
        "fuente": "https://ascensores.pe/transporte-vertical/ascensores/gen-2-mr"
      },
      {
        "nombre": "Arise",
        "tipo": "mr",
        "estado": "En catálogo en el Perú",
        "para": "Oficinas, condominios y edificios comerciales, solo o en grupos de hasta 8 cabinas.",
        "datos": [
          ["Capacidad", "450 a 1600 kg según el folleto de Otis; 550 a 1600 kg en la web peruana"],
          ["Velocidad", "1,0 a 2,5 m/s"],
          ["Recorrido", "Hasta 130 m y 36 paradas"],
          ["Tracción", "Cables de acero, según el distribuidor peruano, con máquina de imanes permanentes PureMotion"],
          ["Máquina", "En un cuarto de máquinas pequeño encima del hueco"],
          ["Tablero", "Las fuentes no lo detallan; lo normal es que vaya en el cuarto de máquinas"]
        ],
        "reconocer": [
          "Tiene cuarto de máquinas en la azotea, pero pequeño: Otis lo llama mini cuarto de máquinas.",
          "La cabina cuelga de cables redondos de acero. Esa es la diferencia con los Gen2, que usan cintas planas.",
          "En edificios con varios ascensores en fila puede trabajar en grupo, hasta 8 cabinas coordinadas."
        ],
        "nota": "Las cifras cambian por región: Otis Kazajistán publica 140 m y 40 paradas. El dato de los cables de acero viene de la web del distribuidor peruano; el folleto consultado no lo dice de forma expresa.",
        "fuente": "https://otis.com/documents/d/otis-2/otis-arise-brochure"
      },
      {
        "nombre": "SkyRise",
        "tipo": "otro",
        "estado": "En catálogo en el Perú",
        "para": "Torres de gran altura, en versiones de una cabina, doble cabina y super doble cabina.",
        "datos": [
          ["Capacidad", "900 a 5000 kg, según la web peruana"],
          ["Velocidad", "Hasta 12,5 m/s con cabina simple, 12 m/s con doble cabina y 10 m/s con super doble"],
          ["Recorrido", "Hasta 600 m con cabina simple; la web peruana habla de hasta 140 paradas"],
          ["Tracción", "Máquina de imanes permanentes SkyMotion; las fuentes no indican de qué cuelga la cabina"],
          ["Máquina", "En cuarto de máquinas, sin más detalle en las fuentes"],
          ["Tablero", "Sin detalle en las fuentes; el control se llama E2"]
        ],
        "reconocer": [
          "Lo vas a identificar por el edificio antes que por el ascensor: es un equipo para torres mucho más altas que un multifamiliar.",
          "Suele ir con gestión de destinos Compass 360: marcas tu piso en una pantalla del lobby y el sistema te dice qué cabina tomar.",
          "Puede tener doble cabina, dos cabinas una encima de la otra que atienden dos pisos a la vez."
        ],
        "nota": "Está en el catálogo de ascensores.pe, pero no encontramos ningún SkyRise instalado y documentado en el Perú.",
        "fuente": "https://ascensores.pe/transporte-vertical/ascensores/skyrise"
      },
      {
        "nombre": "FOVF",
        "tipo": "otro",
        "estado": "En catálogo en el Perú",
        "para": "Montacargas para fábricas y almacenes, hecho para carga pesada y carga con ruedas.",
        "datos": [
          ["Capacidad", "630 a 6000 kg según Otis; la web peruana indica hasta 5000 kg"],
          ["Velocidad", "0,25 a 1,0 m/s, según la carga"],
          ["Recorrido", "Hasta 50 m y 16 paradas, según la web peruana"],
          ["Tracción", "Máquina de tracción de servicio pesado con control VVVF por microprocesador"],
          ["Máquina", "Las fuentes no indican dónde va"],
          ["Tablero", "Las fuentes no indican dónde va"]
        ],
        "reconocer": [
          "Cabina grande, de trabajo, con piso antideslizante de patrón de diamante.",
          "Umbrales de hierro fundido en las puertas, hechos para que pasen carretillas y cargas con ruedas.",
          "Puertas de carga con mirilla de vidrio y borde de seguridad.",
          "Va despacio a propósito: como mucho 1 m/s."
        ],
        "nota": "La web peruana dice que la máquina es con engranajes. Otis no lo indica en su página, así que ese dato queda sin confirmar.",
        "fuente": "https://www.otis.com/es/ar/products-services/products/fovf"
      }
    ],
    "componentes": [
      ["ReGen drive", "El variador regenerativo de Otis: devuelve a la red del edificio la energía que genera el ascensor."],
      ["Pulse", "Sistema que vigila las 24 horas los cordones de acero que van dentro de las cintas del Gen2; la web peruana lo llama RBI."],
      ["PureMotion", "La máquina de imanes permanentes del Arise."],
      ["SkyMotion", "La máquina de imanes permanentes del SkyRise."],
      ["Compass 360", "Gestión de destinos: marcas tu piso en el lobby, antes de subir, y el sistema te asigna una cabina."],
      ["REM", "Monitoreo remoto clásico de Otis, que vigila el equipo a toda hora y permite hablar con un pasajero atrapado; depende de la disponibilidad en cada país."],
      ["Otis ONE", "Plataforma que conecta el ascensor a la nube, con la pantalla de cabina eView y la app de llamada eCall; no está confirmado que funcione en el Perú."],
      ["Glide", "Operador de puertas electrónico de lazo cerrado, sin varillajes, que mide todo el tiempo la velocidad y la posición de la puerta."],
      ["Rescate automático (ARO)", "Equipo a batería que lleva la cabina al piso más cercano cuando se va la luz."],
      ["DO2000 y AT120", "Operadores de puerta de Otis que aparecen en catálogos de repuestos; no está confirmado en qué modelos vendidos en el Perú vienen."]
    ],
    "fuentes": [
      ["Ascensores S.A., distribuidor de Otis en el Perú", "https://www.ascensores.pe/"],
      ["Catálogo de ascensores de Ascensores S.A.", "https://ascensores.pe/transporte-vertical/ascensores"],
      ["Gestión: Otis y la vivienda en Lima Moderna", "https://gestion.pe/economia/empresas/proyectos-de-vivienda-en-lima-moderna-el-driver-de-crecimiento-de-otis-ascensores-centros-comerciales-retail-escaleras-electricas-noticia/"],
      ["Otis Argentina: Gen2 Comfort", "https://www.otis.com/es/ar/products-services/products/gen2-comfort"],
      ["Folleto Gen2 de Otis", "https://otis.com/documents/d/otis-2/gen2-brochure"],
      ["Folleto Otis Arise", "https://otis.com/documents/d/otis-2/otis-arise-brochure"],
      ["Otis SkyRise", "https://www.otis.com/fr/ma/products-services/products/skyrise"],
      ["Otis Argentina: FOVF", "https://www.otis.com/es/ar/products-services/products/fovf"]
    ]
  },
  {
    "id": "schindler",
    "nombre": "Schindler",
    "enPeru": "Schindler tiene página propia para el país, schindler.pe, donde publica su catálogo y sus servicios de mantenimiento y modernización. Según el diario Gestión (2024) lleva 72 años en el Perú, o sea desde alrededor de 1952. La razón social y la dirección de su oficina en Lima no se pudieron verificar de forma independiente.",
    "comoReconocer": [
      "Busca el nombre Schindler en la botonera de cabina, en la placa de capacidad o en la pisadera.",
      "En los edificios sin caseta de máquinas, sube al último piso: el Schindler 3000 lleva el controlador integrado en el marco de la puerta del ascensor.",
      "Si la botonera es de acero inoxidable y el indicador de piso es una matriz de puntos LED rojos, coincide con la Linea 100 que Schindler publica en el Perú.",
      "En el lobby de edificios grandes, una pantalla táctil donde marcas tu piso antes de entrar a la cabina puede ser un terminal Schindler PORT. Otis tiene algo parecido, Compass 360.",
      "Los modelos 3000, 5000 y 6000 usan STM en lugar de cables de acero. Va dentro del hueco y solo se ve con el equipo abierto por un técnico."
    ],
    "modelos": [
      {
        "nombre": "Schindler 3000",
        "tipo": "mrl",
        "estado": "En catálogo en el Perú",
        "para": "Vivienda, oficinas pequeñas y hoteles.",
        "datos": [
          ["Capacidad", "480 a 1125 kg"],
          ["Velocidad", "1,0 a 1,75 m/s"],
          ["Recorrido", "Hasta 75 m y 28 paradas"],
          ["Tracción", "STM (Suspension Traction Media), las cintas que Schindler usa en vez de cables; motor y polea 70% más pequeños según la marca"],
          ["Máquina", "Dentro del hueco. No hay cuarto de máquinas"],
          ["Tablero", "Integrado en el marco de la puerta del último piso"]
        ],
        "reconocer": [
          "Sin caseta de máquinas en la azotea.",
          "En el último piso, mira el marco de la puerta del ascensor: ahí va el controlador, en un panel angosto. Es zona del técnico y no se abre.",
          "Puertas telescópicas: las dos hojas corren hacia el mismo lado.",
          "Botoneras de las líneas Linea 100, Linea 500 o Primea 500."
        ],
        "nota": "La página de Schindler habla de Suspension Traction Media y no usa la expresión cintas planas. Aquí las llamamos cintas para que se entienda.",
        "fuente": "https://www.schindler.pe/es/ascensores/pasajero/schindler-3000.html"
      },
      {
        "nombre": "Schindler 5000",
        "tipo": "mrl",
        "estado": "En catálogo en el Perú",
        "para": "Vivienda de gama alta y edificios comerciales de mediana altura.",
        "datos": [
          ["Capacidad", "600 a 1350 kg"],
          ["Velocidad", "1,0 a 2,5 m/s"],
          ["Recorrido", "Hasta 80 m y 30 paradas"],
          ["Tracción", "STM con máquina sin engranajes"],
          ["Máquina", "Dentro del hueco. No hay cuarto de máquinas"],
          ["Tablero", "La página dice que el equipo de control va dentro del hueco; no precisa el lugar exacto"]
        ],
        "reconocer": [
          "Sin caseta de máquinas en la azotea, igual que el 3000.",
          "Puertas telescópicas o de apertura central, de 80 cm a 1,20 m de ancho y hasta 2,40 m de alto.",
          "Puede trabajar con terminales PORT en el lobby.",
          "Botoneras Primea 500, Primea 600 o Linea 100."
        ],
        "fuente": "https://www.schindler.pe/es/ascensores/pasajero/schindler-5000.html"
      },
      {
        "nombre": "Schindler 6000",
        "tipo": "mrl",
        "estado": "En catálogo en el Perú",
        "para": "Edificios comerciales con mucho tráfico, vivienda de gama alta y edificios de uso mixto.",
        "datos": [
          ["Capacidad", "Hasta 2600 kg"],
          ["Velocidad", "Hasta 3,0 m/s"],
          ["Recorrido", "Hasta 150 m y 50 paradas (80 accesos)"],
          ["Tracción", "STM con máquina sin engranajes de imanes permanentes"],
          ["Máquina", "Depende de la configuración; no se pudo verificar (mira la nota)"],
          ["Tablero", "La página no lo especifica"]
        ],
        "reconocer": [
          "Puertas grandes: Schindler las ofrece de 80 cm a 1,80 m de ancho y hasta 3 m de alto.",
          "Cabina alta, de hasta 3,20 m.",
          "Trabaja en grupos de hasta 8 cabinas, o más si el edificio usa terminales PORT."
        ],
        "nota": "Las cifras salen de un resumen de la página de schindler.pe, que no se pudo leer completa. La investigación recoge que se ofrece con cuarto de máquinas, con minicuarto o sin cuarto, pero eso no se verificó. Aquí lo agrupamos con los sin cuarto de máquinas porque comparte plataforma con el 3000 y el 5000.",
        "fuente": "https://www.schindler.pe/es/ascensores/pasajero/schindler-6000.html"
      },
      {
        "nombre": "Schindler 7000",
        "tipo": "otro",
        "estado": "En catálogo en el Perú",
        "para": "Torres de oficinas, hoteles y edificios de uso mixto de gran altura.",
        "datos": [
          ["Capacidad", "800 a 2000 kg con una cabina; 2 x 1250 a 2000 kg con doble cabina"],
          ["Velocidad", "Hasta 10 m/s, según la aplicación"],
          ["Recorrido", "Hasta 500 m, según la aplicación"],
          ["Tracción", "Tracción regenerativa con regulación de frecuencia; la página no dice si usa cables o cintas"],
          ["Máquina", "En cuarto de máquinas"],
          ["Tablero", "La página no lo especifica"]
        ],
        "reconocer": [
          "Es un equipo de torre. En un multifamiliar común no lo vas a encontrar.",
          "Puede ser de doble cabina, dos cabinas apiladas que paran en dos pisos a la vez.",
          "Normalmente se llama desde terminales PORT en el lobby."
        ],
        "nota": "Está en el catálogo de schindler.pe. No encontramos una lista de edificios peruanos que lo tengan.",
        "fuente": "https://www.schindler.pe/es/ascensores/pasajero/schindler-7000.html"
      },
      {
        "nombre": "Schindler 2600",
        "tipo": "otro",
        "estado": "En catálogo en el Perú",
        "para": "Carga en almacenes, centros comerciales, industria y hospitales.",
        "datos": [
          ["Capacidad", "1000 a 4000 kg"],
          ["Velocidad", "0,8 a 1,6 m/s"],
          ["Recorrido", "Hasta 60 m y 21 paradas"],
          ["Tracción", "Máquina de imanes permanentes sin reductor, con variador de frecuencia"],
          ["Máquina", "La página peruana no indica dónde va"],
          ["Tablero", "La página peruana no indica dónde va"]
        ],
        "reconocer": [
          "Puertas muy anchas, de 80 cm hasta 2,50 m, que pueden abrir todo el ancho de la cabina.",
          "Protecciones contra golpes dentro de la cabina.",
          "Puede tener puerta en un solo lado o en dos."
        ],
        "fuente": "https://www.schindler.pe/es/ascensores/carga-especial/schindler-2600.html"
      },
      {
        "nombre": "Schindler 3300",
        "tipo": "mrl",
        "estado": "Generación anterior, todavía instalado",
        "para": "Edificios de vivienda y comercio de baja y mediana altura; en el catálogo peruano su lugar lo ocupa hoy el 3000.",
        "datos": [
          ["Capacidad", "625 a 1000 kg (8 a 13 pasajeros), según el anuncio publicado en el Perú en 2020"],
          ["Velocidad", "1,5 a 2,5 m/s según ese anuncio; el catálogo europeo da 1,0 y 1,6 m/s"],
          ["Recorrido", "Hasta 105 m y 35 paradas según el anuncio peruano; 60 m y 20 paradas en el catálogo europeo"],
          ["Tracción", "Máquina sin engranajes con variador de frecuencia (VVVF)"],
          ["Máquina", "Sin confirmar (mira la nota)"],
          ["Tablero", "Sin confirmar (mira la nota)"]
        ],
        "reconocer": [
          "Si el edificio ya tiene sus años, no tiene caseta de máquinas y el ascensor es Schindler, puede ser un 3300 y no un 3000.",
          "En documentos de mantenimiento puede figurar como 3300 o 3300LA. Ese código aparece en un informe de SUNAT sobre sus ascensores Schindler.",
          "Por fuera se parece mucho al 3000. Para distinguirlos, lo más seguro es el nombre del modelo en la documentación del equipo."
        ],
        "nota": "Un manual del propietario alojado en un sitio de terceros ubica la máquina (FMB130) dentro del hueco, fijada a la guía, y el armario de control en la jamba de la puerta del último piso. También nombra el control Bionic, el operador de puertas Varidor 15, cintas STM de 30 mm y una cortina óptica de 8 o 16 haces. Nada de eso se pudo verificar de forma independiente. Que el 3000 lo reemplazó en el Perú es una deducción: la dirección antigua del 3300 en schindler.pe ahora lleva a la página del 3000.",
        "fuente": "https://constructivo.com/novedad/ascensores-schindler-schindler-3300-1608323701"
      }
    ],
    "componentes": [
      ["STM", "Suspension Traction Media: el medio de tracción que reemplaza a los cables de acero y que, según Schindler, permite motor y polea 70% más pequeños."],
      ["Schindler PORT", "Sistema de gestión de tráfico del edificio: marcas tu piso en un terminal antes de subir y te asigna una cabina."],
      ["Schindler Ahead", "Monitoreo remoto que recoge estadísticas y datos de rendimiento del ascensor, con el tablero ActionBoard."],
      ["Linea 100", "Botonera de acero inoxidable con indicador de matriz de puntos LED rojos."],
      ["Linea 300, Linea 500, Primea 500 y Primea 600", "Las otras líneas de botoneras que Schindler publica en el Perú."],
      ["SC 1.0, BX y EM 2.0", "Maniobras (controles) que Schindler Perú ofrece para modernizar ascensores existentes; BX y EM 2.0 también sirven para hidráulicos."],
      ["FMB 130, PSG y SGB 142", "Máquinas de tracción que Schindler Perú lista en su página de componentes para modernización."],
      ["VCP y VAP", "Variadores de frecuencia regenerativos de la línea de modernización; VCB y VAB son las versiones con resistencia."],
      ["MM430", "Operador de puertas de la línea de modernización."],
      ["ReStore, ReNew y RePlace", "Paquetes de modernización, desde cambiar maniobra, variador y botoneras hasta poner un ascensor nuevo en el hueco existente."]
    ],
    "fuentes": [
      ["Schindler Perú: ascensores", "https://www.schindler.pe/es/ascensores.html"],
      ["Schindler 3000", "https://www.schindler.pe/es/ascensores/pasajero/schindler-3000.html"],
      ["Schindler 5000", "https://www.schindler.pe/es/ascensores/pasajero/schindler-5000.html"],
      ["Schindler 6000", "https://www.schindler.pe/es/ascensores/pasajero/schindler-6000.html"],
      ["Schindler 7000", "https://www.schindler.pe/es/ascensores/pasajero/schindler-7000.html"],
      ["Schindler 2600", "https://www.schindler.pe/es/ascensores/carga-especial/schindler-2600.html"],
      ["Schindler PORT", "https://www.schindler.pe/es/innovaciones/schindler-port.html"],
      ["Schindler Perú: maniobras de modernización", "https://www.schindler.pe/es/ascensores/modernizacion/componentes/maniobras.html"],
      ["Schindler Perú: normativa", "https://www.schindler.pe/es/sobre-nosotros/normativa.html"],
      ["Gestión: planes de modernización de Schindler", "https://gestion.pe/economia/empresas/los-planes-de-schindler-en-modernizacion-de-ascensores-de-su-actual-cartera-en-peru-ascensores-edificios-escaleras-electricas-construccion-centros-comerciales-noticia/"],
      ["Constructivo: Schindler 3300 en el Perú", "https://constructivo.com/novedad/ascensores-schindler-schindler-3300-1608323701"]
    ]
  },
  {
    "id": "movilift",
    "nombre": "MoviLift",
    "enPeru": "En el Perú no existe una marca de ascensores que se escriba \"Mobilift\". Lo más cercano es MoviLift Italian Elevators, un fabricante italiano de Castellammare di Stabia (Nápoles) cuya electrónica de tablero llega al Perú para modernizaciones; STS Elevadores, en San Martín de Porres, se declara su proveedor. También existe Movelift Elevadores, una empresa limeña de servicio multimarca que no fabrica ascensores.",
    "comoReconocer": [
      "No busques un modelo con nombre propio: MoviLift vende por líneas (Passenger Lift, Hospital Lift, DIVAS, Car Lift, High Rise Lift y Zero Energy), sin nombres como Gen2 o 3000.",
      "Lo más probable es que la marca esté dentro del tablero de control, en una placa electrónica de la familia BR (BR50, BR100, BR200 o BR400). Eso lo ve el técnico cuando abre el tablero. Tú no lo abras.",
      "Como llega sobre todo para modernizaciones, un ascensor con tablero MoviLift puede tener cabina, puertas y máquina de otra marca.",
      "Sus botoneras de catálogo son de acero inoxidable con pulsadores redondos de 32 mm con braille: la Makalu va sobrepuesta a la pared y la Flat Europa va empotrada.",
      "Ojo con los parecidos. Un sticker de Movelift Elevadores te dice quién da el servicio, y Movilift también es una marca de polipastos industriales de Movitécnica que no tiene nada que ver con ascensores."
    ],
    "modelos": [
      {
        "nombre": "Pasajeros hidráulico",
        "tipo": "hid",
        "estado": "No confirmado en el Perú",
        "para": "Edificios bajos, de pocas paradas.",
        "datos": [
          ["Capacidad", "Sin cifra confirmada"],
          ["Velocidad", "Sin cifra confirmada (mira la nota)"],
          ["Recorrido", "Sin cifra confirmada (mira la nota)"],
          ["Tracción", "Pistón movido por aceite a presión desde una central hidráulica"],
          ["Máquina", "Central hidráulica aparte del hueco; el fabricante no precisa dónde"],
          ["Tablero", "No publicado; lo usual es que vaya junto a la central"]
        ],
        "reconocer": [
          "Como todo hidráulico, no tiene contrapeso ni caseta en la azotea.",
          "La central es un tanque de aceite con motor y bomba, normalmente en un cuartito o armario cerca de la planta baja.",
          "Al subir se oye el motor de la bomba. Al bajar el motor no trabaja.",
          "Según la investigación, la central de MoviLift trae bomba manual, pulsador de descenso de emergencia, electroválvulas y llave de bola. Son mandos de rescate y los usa solo personal técnico capacitado."
        ],
        "nota": "La investigación tomó de la ficha Passenger Lift del fabricante 0,6 m/s, hasta 23 m de recorrido y 8 paradas. La verificación independiente no encontró esas cifras ni el desglose por tecnología en las páginas que pudo leer, así que tómalas como dato de catálogo sin confirmar. Tampoco hay ascensores MoviLift completos documentados en el Perú.",
        "fuente": "https://www.movilift.com/elevators/passenger-lift/"
      },
      {
        "nombre": "Pasajeros gearless sin cuarto de máquinas",
        "tipo": "mrl",
        "estado": "No confirmado en el Perú",
        "para": "Edificios donde se quiere ahorrar el cuarto de máquinas.",
        "datos": [
          ["Capacidad", "Sin cifra confirmada"],
          ["Velocidad", "Sin cifra confirmada (mira la nota)"],
          ["Recorrido", "Sin cifra confirmada (mira la nota)"],
          ["Tracción", "Motor sin engranajes de imanes permanentes; el fabricante no dice si usa cables o cintas"],
          ["Máquina", "El fabricante solo dice que no necesita cuarto de máquinas"],
          ["Tablero", "No publicado para el ascensor; la placa BR400 se describe como delgada, apta para un tablero en el marco de la puerta de piso"]
        ],
        "reconocer": [
          "Sin caseta de máquinas en la azotea, como cualquier ascensor de este tipo.",
          "El fabricante describe su placa BR400 como delgada, pensada para tableros que van en el marco de la puerta de piso. Si el tablero está ahí, adentro debería haber una placa BR.",
          "No sabemos si cuelga de cables o de cintas, porque MoviLift no lo publica. Eso solo lo puede confirmar el técnico."
        ],
        "nota": "La investigación recogió del catálogo 2,5 m/s, hasta 90 m y 32 paradas para la versión gearless. La verificación independiente no encontró esas cifras, así que quedan como dato de catálogo sin confirmar.",
        "fuente": "https://www.movilift.com/elevators/passenger-lift/"
      },
      {
        "nombre": "Pasajeros con reductor",
        "tipo": "mr",
        "estado": "No confirmado en el Perú",
        "para": "Edificios de pasajeros de mediana altura.",
        "datos": [
          ["Capacidad", "Sin cifra confirmada (mira la nota)"],
          ["Velocidad", "Sin cifra confirmada (mira la nota)"],
          ["Recorrido", "Sin cifra confirmada (mira la nota)"],
          ["Tracción", "Motor con caja reductora; el fabricante no dice si usa cables o cintas"],
          ["Máquina", "No publicado. Una máquina con reductor suele ir en un cuarto de máquinas"],
          ["Tablero", "No publicado"]
        ],
        "reconocer": [
          "Si hay cuarto de máquinas, una máquina con reductor se distingue por la caja de engranajes que va entre el motor y la polea.",
          "Esa caja lleva aceite, cosa que una máquina gearless no tiene.",
          "El tablero llevaría una placa de la familia BR. Lo confirma el técnico con el tablero abierto."
        ],
        "nota": "Según la investigación, el catálogo le da 2,5 m/s, 2500 kg, 90 m y 32 paradas, pero la verificación independiente no pudo confirmarlo. El fabricante tampoco dice si va con o sin cuarto de máquinas. Aquí lo ponemos con cuarto porque es lo habitual en máquinas con reductor.",
        "fuente": "https://www.movilift.com/elevators/passenger-lift/"
      },
      {
        "nombre": "DIVAS Home Platform Lift",
        "tipo": "otro",
        "estado": "No confirmado en el Perú",
        "para": "Viviendas y accesibilidad: es un home lift, una plataforma para pocas personas y pocos pisos.",
        "datos": [
          ["Capacidad", "Sin cifra confirmada (mira la nota)"],
          ["Velocidad", "Sin cifra confirmada (mira la nota)"],
          ["Recorrido", "Sin cifra confirmada"],
          ["Tracción", "Según la investigación hay variantes hidráulica, con reductor y gearless; no verificado"],
          ["Máquina", "No publicado"],
          ["Tablero", "No publicado; la placa BR50 es la que MoviLift indica para home lift"]
        ],
        "reconocer": [
          "Cabina chica, para una casa o un edificio de poco tránsito.",
          "Es más lento que un ascensor de edificio y pide mucho menos foso, según el catálogo.",
          "Si lleva electrónica MoviLift, la placa del tablero sería la BR50."
        ],
        "nota": "El DIVAS sí aparece como producto en la web del fabricante. Las cifras que recogió la investigación (250 a 400 kg, 0,15 m/s y foso mínimo de 180 mm) no se pudieron verificar en las páginas leídas.",
        "fuente": "https://www.movilift.com/elevators/divas-home-platform-lift/"
      }
    ],
    "componentes": [
      ["BR50", "Placa madre que el fabricante indica como ideal para home lift."],
      ["BR100", "Placa madre de conexión serial."],
      ["BR200", "Placa madre de conexión paralela, pensada para modernizaciones; hay registro de una importada al Perú desde Italia en 2023."],
      ["BR400", "La placa madre más completa de la familia."],
      ["DOORINA", "Placa universal para el operador de puertas."],
      ["Kilo System", "Pesacargas para ascensores y montaplatos."],
      ["Cortina luminosa multi-haz", "Barrera de rayos para la puerta de cabina, declarada conforme a EN 81-20/50; la ficha del fabricante le da 194 haces."],
      ["Makalu y Flat Europa", "Botoneras de acero inoxidable: la Makalu va sobrepuesta y la Flat Europa empotrada."],
      ["ARD15", "Equipo de rescate a baterías para cuando se corta la energía."],
      ["BR NEXT", "Módulo Bluetooth para la placa BR400 que deja al técnico ver errores y parámetros desde el celular."]
    ],
    "fuentes": [
      ["MoviLift Italian Elevators", "https://www.movilift.com/"],
      ["MoviLift: ascensores", "https://www.movilift.com/elevators"],
      ["MoviLift: electrónica", "https://www.movilift.com/electronics"],
      ["STS Elevadores (Lima)", "https://stselevadores.com/"],
      ["Movelift Elevadores (Lima)", "https://moveliftelevadores.com.pe/"],
      ["Registro de importación de una placa BR200", "https://www.trademo.com/companies/ascensores-v-m-sociedad-anonima-cerrada/40409757"]
    ]
  }
];

ASC.tipos = {
  "mrl": {
    "nombre": "Sin cuarto de máquinas",
    "sigla": "MRL",
    "resumen": "Un ascensor de tracción con toda la maquinaria metida dentro del hueco, sin caseta en la azotea.",
    "comoFunciona": "La máquina es un motor compacto sin engranajes que va dentro del hueco, normalmente en la parte alta, y hace girar una polea. Por esa polea pasan las cintas o los cables: de un lado cuelga la cabina y del otro el contrapeso, que equilibra el peso para que el motor trabaje menos. Un variador de frecuencia maneja el arranque y la frenada. El tablero de control queda fuera del hueco o en su borde; en el Schindler 3000, por ejemplo, va integrado en el marco de la puerta del último piso.",
    "comoReconocer": [
      "Mira la azotea: sobre el ascensor no hay caseta de máquinas.",
      "En el último piso busca un panel o gabinete angosto junto a la puerta del ascensor, o integrado en su marco. Es el tablero y lo abre solo el técnico.",
      "Si preguntas por el cuarto de máquinas, el conserje te va a decir que no hay.",
      "Si ves el equipo abierto durante un mantenimiento, en un Otis Gen2 o un Schindler 3000 la cabina cuelga de cintas planas y no de cables redondos. Mira desde lejos."
    ],
    "ventajas": [
      "No ocupa azotea ni obliga a construir un cuarto aparte.",
      "La máquina sin engranajes no lleva caja con aceite.",
      "Otis y Schindler lo ofrecen con variador regenerativo, que devuelve energía a la red del edificio."
    ],
    "limites": [
      "Tiene tope de altura y velocidad. El Schindler 3000, por ejemplo, llega a 75 m y 1,75 m/s.",
      "La máquina está dentro del hueco, así que casi todo el mantenimiento se hace desde ahí o desde el tablero. Es trabajo de personal técnico capacitado.",
      "El tablero queda en un pasillo de uso común y debe estar siempre cerrado con llave."
    ],
    "enPeru": "Es lo que Otis (Gen2 MRL) y Schindler (3000 y 5000) ofrecen hoy en sus catálogos peruanos para vivienda y oficinas. No hay una cifra pública confiable de cuántos hay instalados.",
    "ejemplos": "Otis Gen2 MRL. Schindler 3000 y 5000, y el 3300 de la generación anterior. MoviLift gearless sin cuarto de máquinas (no confirmado en el Perú)."
  },
  "mr": {
    "nombre": "Con cuarto de máquinas",
    "sigla": "MR",
    "resumen": "El ascensor de tracción clásico: la máquina y el tablero van en un cuarto propio, casi siempre encima del hueco.",
    "comoFunciona": "En el cuarto de máquinas hay un motor que hace girar una polea, directo o a través de una caja reductora. Los cables pasan por esa polea y bajan al hueco: de un extremo cuelga la cabina y del otro el contrapeso. La cabina se mueve por el roce entre los cables y la polea, y el freno de la máquina la sujeta cuando está parada. En el mismo cuarto suelen estar el tablero de control y el limitador de velocidad.",
    "comoReconocer": [
      "En la azotea hay una caseta encima del ascensor, con puerta cerrada y cartel de peligro.",
      "Desde el último piso a veces se oye la máquina arrancar y el golpe seco del freno o de los contactores.",
      "Si el técnico tiene la puerta del cuarto abierta, vas a ver la máquina sobre su base, la polea con los cables y un gabinete con el tablero. Mira desde afuera: ahí entra solo personal autorizado.",
      "La cabina cuelga de varios cables redondos de acero. En los equipos antiguos están engrasados."
    ],
    "ventajas": [
      "La máquina y el tablero están a la mano del técnico, en un cuarto con espacio para trabajar.",
      "Es la solución para más altura y más velocidad: los equipos de torre, como el Otis SkyRise y el Schindler 7000, llevan cuarto de máquinas.",
      "Se puede modernizar por partes. Schindler, por ejemplo, ofrece cambiar maniobra, variador y botoneras conservando máquina, cabina y guías."
    ],
    "limites": [
      "Ocupa espacio en la azotea y obliga a construir y ventilar un cuarto.",
      "Las máquinas con reductor llevan aceite y los cables de acero se lubrican, así que hay más cosas que revisar.",
      "El cuarto debe tener el acceso restringido. Una puerta sin llave es un riesgo serio."
    ],
    "enPeru": "La norma EM.070 pide que el cuarto vaya de preferencia encima del pozo y con acceso solo a personal autorizado (texto de 2006). Sigue en catálogo para edificios altos y es lo que tienen equipos de edificios públicos, como varios ascensores Schindler de SUNAT.",
    "ejemplos": "Otis Gen2 MR y Arise. De gran altura, Otis SkyRise y Schindler 7000. MoviLift con reductor (no confirmado en el Perú)."
  },
  "hid": {
    "nombre": "Hidráulico",
    "sigla": "HID",
    "resumen": "Un ascensor que sube empujado por un pistón con aceite a presión, sin contrapeso.",
    "comoFunciona": "Una bomba eléctrica manda aceite a presión desde un tanque hasta un cilindro, y el pistón que sale del cilindro empuja la cabina hacia arriba. Para bajar no hace falta motor: se abre una válvula y el peso de la cabina devuelve el aceite al tanque. El tanque, el motor, la bomba y las válvulas forman la central hidráulica, que va en un cuarto o armario aparte, por lo general en la planta baja. Una manguera o tubería de alta presión une la central con el cilindro.",
    "comoReconocer": [
      "Edificio bajo, de pocos pisos, sin caseta en la azotea.",
      "Cerca del ascensor, en la planta baja o el sótano, hay un cuartito o armario con la central: un tanque metálico de aceite. Puede oler a aceite.",
      "Al subir se oye el zumbido del motor de la bomba. Al bajar el motor está apagado.",
      "Va despacio y al llegar al piso a veces corrige un poquito para quedar a nivel."
    ],
    "ventajas": [
      "No necesita cuarto de máquinas arriba ni contrapeso, y la central puede ir separada del hueco.",
      "El peso se apoya abajo, en el foso, y no en la parte alta del edificio.",
      "Si se va la luz, la cabina puede bajar sin motor, por su propio peso. Esa maniobra de rescate la hace solo personal técnico capacitado."
    ],
    "limites": [
      "Sirve para pocos pisos y es lento.",
      "Como no hay contrapeso, el motor empuja todo el peso de la cabina cada vez que sube.",
      "Trabaja con bastante aceite a presión: hay que vigilar fugas, mangueras y temperatura, y eso lo revisa el técnico."
    ],
    "enPeru": "Ni Otis ni Schindler listan hidráulicos en sus catálogos peruanos actuales. Schindler Perú sí ofrece maniobras de modernización (BX y EM 2.0) que sirven para hidráulicos que ya existen.",
    "ejemplos": "Otis y Schindler no lo ofrecen hoy en el Perú. MoviLift hidráulico de pasajeros (no confirmado en el Perú)."
  }
};

ASC.normas = [
  {
    "titulo": "La norma vigente: EM.070",
    "texto": "Los ascensores se regulan en la Norma Técnica EM.070 \"Transporte mecánico\" del Reglamento Nacional de Edificaciones. La versión vigente se aprobó con la Resolución Ministerial N° 084-2019-VIVIENDA, publicada en El Peruano el 12 de marzo de 2019, y reemplaza al texto de 2006.",
    "fuente": "https://cdn.www.gob.pe/uploads/document/file/2366715/68%20EM.070%20TRANSPORTE%20MEC%C3%81NICO%20-%20RM%20N%C2%B0%20084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Ojo con las cifras de abajo",
    "texto": "El único texto completo que se pudo leer es el de 2006. Lo que sigue viene de ahí y hay que contrastarlo con el PDF de 2019 antes de darlo por vigente, porque artículos y medidas pueden haber cambiado.",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Foso",
    "texto": "En el fondo del pozo debe haber un foso protegido de filtraciones de agua, y ahí van los amortiguadores. Para cabinas de hasta 8 personas el texto de 2006 pide al menos 1,30 m de profundidad a 1 m/s, 1,70 m a 1,5 m/s y 1,80 m a 2 m/s.",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Sobrerrecorrido",
    "texto": "Es la distancia vertical entre la última parada y el techo del pozo. Para cabinas de hasta 8 personas el texto de 2006 pide al menos 4,00 m a 1 m/s, 4,60 m a 1,5 m/s y 5,00 m a 2 m/s.",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Cuarto de máquinas",
    "texto": "Va en un ambiente especial, de preferencia encima del pozo, ventilado, con temperatura entre 5 y 40 °C y al menos 2,00 m de altura. Solo entra personal autorizado y la puerta lleva el cartel \"PELIGRO. Acceso solo a personal autorizado\" (texto de 2006).",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Puertas",
    "texto": "En ascensores de pasajeros las puertas de piso y de cabina deben ser automáticas, y la de piso mide como mínimo 0,80 m por 2,00 m. No pueden abrirse con el ascensor en marcha, el ascensor no funciona con una puerta abierta y la cabina debe reabrir de inmediato si la puerta encuentra un obstáculo al cerrar (texto de 2006).",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Cabina: alarma y placa de carga",
    "texto": "La cabina lleva un botón de alarma que suena en un lugar transitado del edificio, puerta de socorro en el techo, que usan los rescatistas y no es una salida para el pasajero, y ventilación. También una placa visible y duradera con la carga útil y el número de pasajeros, calculado a 75 kg por persona (texto de 2006).",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  },
  {
    "titulo": "Mantenimiento y certificado anual",
    "texto": "El texto de 2006 (art. 10) pide que el mantenimiento lo haga una empresa dedicada a instalar y mantener ascensores, con repuestos genuinos o equivalentes certificados, y que cada año se demuestre con un certificado de inspección ante la autoridad local. Schindler Perú afirma en su web que el mantenimiento es obligatorio una vez al mes, pero no cita la norma que lo respalda.",
    "fuente": "https://cdn-web.construccion.org/normas/rne2012/rne2006/files/titulo3/04_EM/2019_EM070_RM-084-2019-VIVIENDA.pdf"
  }
];
