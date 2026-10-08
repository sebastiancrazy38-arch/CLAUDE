/* Taller de Ascensores: electrónica para el técnico. Arquitectura del control, fallas comunes con qué medir,
   cambio de tarjetas y herramientas. Los valores de voltaje son típicos: el plano eléctrico del equipo manda.
   No hay aquí procedimientos para anular seguridades. */

ASC.electronica = {
  bloques: [
    { n: 'Acometida e interruptor principal', p: 'interruptor_principal', d: 'Llega la red (en el Perú, 220 V o 380 V trifásico según el edificio). Pasa por el interruptor principal bloqueable y, en los tableros modernos, por un relé de control de fases que no deja arrancar si falta una fase o están invertidas.' },
    { n: 'Transformador y fuentes', p: 'tablero_control', d: 'Bajan el voltaje para la maniobra: la serie de seguridades (según el equipo 48 V, 110 V o 230 V, en continua o alterna) y la fuente de 24 V de las tarjetas.' },
    { n: 'Tarjeta principal (CPU)', p: 'tablero_control', d: 'Decide todo: lee la serie, las llamadas y los sensores; manda a los contactores y al variador. Guarda la configuración del edificio (paradas, tiempos, accesos).' },
    { n: 'Serie de seguridades', p: 'cerradura', d: 'Todos los contactos de seguridad uno tras otro. La CPU mira el voltaje en varios puntos de la serie para saber qué tramo se abrió (stop de foso, cabina, puertas de cabina, puertas de piso).' },
    { n: 'Contactores y freno', p: 'freno', d: 'Por hardware, si la serie se abre caen los contactores del motor y del freno aunque la CPU quiera lo contrario. La CPU vigila además que hayan caído.' },
    { n: 'Variador', p: 'variador', d: 'Recibe órdenes de la CPU (marcha, sentido, velocidad) y la lectura del encoder; mueve el motor con una curva suave.' },
    { n: 'Bus a cabina y pisos', p: 'botonera_piso', d: 'Las tarjetas de piso y la de cabina hablan con la CPU por un bus serie de pocos hilos (CAN o RS-485), con una resistencia de 120 Ω en cada extremo. En equipos antiguos cada botón tiene su cable (paralelo).' },
    { n: 'Cable viajero y cabina', p: 'cable_viajero', d: 'Lleva a la cabina la alimentación, el bus, la serie de cabina, la cortina, el operador y la alarma.' }
  ],

  fallas: [
    { s: 'El ascensor no hace nada y el tablero está apagado', c: 'Sin red, interruptor abajo, relé de fases abierto o fusible del transformador.', m: 'Voltaje en la acometida (las tres fases y entre fases), salida del transformador y fusibles. El relé de fases tiene un LED que indica falta o inversión.', p: 'interruptor_principal' },
    { s: 'Se reinicia solo o marca errores sin lógica', c: 'Fuente de 24 V débil: condensadores secos o hinchados.', m: 'Los 24 V con el ascensor andando (con carga, no en vacío). Si bajan de unos 22 V o tienen rizado, la fuente está mal.', p: 'tablero_control' },
    { s: '«Se abrió la serie»: no arranca o se para entre pisos', c: 'Un contacto de seguridad abierto: puerta, stop, limitador, tensora, paracaídas, finales.', m: 'Voltaje de la serie punto por punto, desde el inicio, con el plano. Donde desaparece el voltaje, el último contacto antes es el abierto. Los puntos de prueba del tablero acortan la búsqueda.', p: 'cerradura' },
    { s: 'Un piso no responde a los botones', c: 'Tarjeta de piso sin alimentación, bus cortado, dirección repetida o tarjeta dañada.', m: 'Los 24 V en el conector de la tarjeta, la continuidad del bus y la dirección. Con CAN apagado, entre CAN H y CAN L se miden unos 60 Ω si las dos resistencias finales están puestas.', p: 'botonera_piso' },
    { s: 'Botones de cabina muertos o puerta sin órdenes', c: 'Hilos del cable viajero cortados por el doblez, conector de la caja de techo o tarjeta de cabina.', m: 'Continuidad de cada hilo del viajero moviendo la cabina; muchas fallas aparecen solo en ciertos pisos.', p: 'cable_viajero' },
    { s: 'Error de variador por sobrevoltaje al frenar', c: 'Resistencia de frenado abierta, su transistor quemado o cables flojos.', m: 'Resistencia en ohmios con todo apagado y descargado; comparar con la placa.', p: 'variador' },
    { s: 'Error de encoder o vibración del motor', c: 'Encoder flojo, cable sin malla a tierra, conector sucio.', m: 'Malla a tierra en un solo extremo, cable lejos de los de fuerza, acople firme.', p: 'encoder' },
    { s: 'Error de contactor', c: 'Contacto pegado o quemado; la CPU vio que no cayó.', m: 'Estado de los contactos auxiliares con el equipo parado.', p: 'tablero_control' },
    { s: 'Error de freno', c: 'Microswitches del freno desajustados o freno que no abre (bobina, rectificador del freno).', m: 'Voltaje de la bobina al dar marcha y el cambio de estado de cada micro.', p: 'micro_freno' },
    { s: 'Fallas que aparecen cuando llueve o en invierno', c: 'Humedad en el foso, en botoneras de pisos expuestos o en el cuarto: sulfato en conectores.', m: 'Aislamiento con megóhmetro (solo en circuitos de fuerza y con las tarjetas desconectadas) y revisión de conectores.', p: 'cableado_hueco' },
    { s: 'Muchas tarjetas dañadas después de un corte de luz', c: 'Sobretensión al volver la energía.', m: 'Protección contra sobretensiones del tablero y puesta a tierra del edificio.', p: 'interruptor_principal' }
  ],

  cambioTarjeta: [
    { t: 'Confirma que es la tarjeta', d: 'Antes de cambiar: fuente, fusibles, conectores, humedad, la serie y los códigos de error. Una tarjeta cara cambiada por un conector flojo es el error más común del técnico nuevo.' },
    { t: 'Copia la configuración', d: 'Con la herramienta de servicio o la pantalla del tablero, anota o respalda los parámetros: número de paradas, tiempos, accesos, ajustes del variador. Saca foto de la etiqueta (código y versión) y de los microinterruptores.' },
    { t: 'Deja el ascensor seguro', d: 'Cabina en un piso, sin pasajeros, puertas cerradas y aviso de fuera de servicio en los pisos. Corta el interruptor principal, ponle candado y tarjeta (bloqueo y etiquetado).' },
    { t: 'Comprueba que no hay tensión', d: 'Mide ausencia de voltaje en la entrada del tablero. Si hay variador, espera el tiempo que indica su etiqueta para que se descarguen los condensadores y mide el bus DC antes de tocar.' },
    { t: 'Descárgate tú', d: 'Pulsera antiestática a tierra; la tarjeta nueva se saca de su bolsa recién al montarla y se toma por los bordes.' },
    { t: 'Foto de cada conector y saca la vieja', d: 'Marca los conectores que puedan confundirse. Saca la tarjeta sin forzar, revisa si tiene componentes quemados (te dice qué la dañó).' },
    { t: 'Monta la nueva', d: 'Misma referencia y versión compatible. Pasa la EPROM, la SIM o la memoria si el sistema lo pide; pon los mismos puentes y direcciones.' },
    { t: 'Energiza y carga la configuración', d: 'Quita bloqueo, energiza con el ascensor en inspección. Revisa LED y pantalla, carga parámetros y haz los aprendizajes que pida el equipo (hueco, puerta, motor).' },
    { t: 'Prueba todo antes de entregar', d: 'Primero en inspección; luego viajes a todos los pisos, llamadas de cabina y de pasillo, puertas, cortina, alarma y una prueba de cada seguridad que la tarjeta vigile. Recién ahí se devuelve al servicio.' }
  ],

  cambioPiso: [
    { t: 'Ubica el piso y el tipo de tarjeta', d: 'Paralela (un cable por botón) o serie (bus). En serie, mira cómo vienen las otras tarjetas: dirección y si alguna lleva la resistencia final.' },
    { t: 'Foto de la dirección', d: 'Microinterruptores, puentes o rueda selectora: la nueva va con la misma dirección. Si la dirección se programa desde el tablero, anota cómo.' },
    { t: 'Sin tensión en el bus', d: 'Corta la alimentación de la maniobra o desconecta el conector del bus con cuidado según el manual; un corto entre 24 V y el bus quema varias tarjetas a la vez.' },
    { t: 'Cambia y conecta', d: 'Respeta el orden de hilos (+24 V, 0 V, CAN H, CAN L o lo que diga el plano). Si era la última del bus, la nueva lleva la resistencia de 120 Ω.' },
    { t: 'Prueba ese piso y los vecinos', d: 'Llamada de subida y de bajada, luces, indicador y gong; prueba también el piso de arriba y el de abajo para descartar direcciones repetidas.' }
  ],

  medir: [
    { n: 'Multímetro', d: 'Voltaje alterno y continuo, continuidad, resistencia. Categoría CAT III como mínimo para tableros.' },
    { n: 'Pinza amperimétrica', d: 'Corriente del motor y de la bobina del freno sin abrir el circuito.' },
    { n: 'Megóhmetro', d: 'Aislamiento de motores y cables de fuerza. Nunca con las tarjetas conectadas.' },
    { n: 'Herramienta de servicio de la marca', d: 'Lee errores, estados y parámetros (la de Otis, la de Schindler, el teclado del NICE, el BR NEXT de MoviLift…).' },
    { n: 'Pulsera antiestática', d: 'Para manipular tarjetas.' },
    { n: 'Llave triangular', d: 'Abre las puertas de piso desde el pasillo; solo para personal autorizado y con el procedimiento de acceso al hueco.' },
    { n: 'Candado y tarjeta de bloqueo', d: 'Para el interruptor principal mientras se trabaja.' },
    { n: 'Galgas y calibrador', d: 'Entrehierro del freno, penetración de ganchos, diámetro de cables.' }
  ],

  ruta: [
    { t: 'Base de electricidad', d: 'Electricidad industrial o electrónica en un instituto técnico: leyes básicas, motores trifásicos, mando por contactores, lectura de planos.' },
    { t: 'Seguridad primero', d: 'Trabajo en altura, bloqueo y etiquetado, acceso seguro al techo de cabina y al foso. Es lo que más piden las empresas.' },
    { t: 'Ayudante de técnico', d: 'Mantenimiento preventivo mensual al lado de un técnico con experiencia: lubricación, limpieza, ajustes de puertas, prueba de seguridades.' },
    { t: 'Diagnóstico', d: 'Serie de seguridades con plano, lectura de errores, variadores y buses. Aquí se separa el técnico bueno del que solo cambia tarjetas.' },
    { t: 'Capacitación de marca', d: 'Otis, Schindler, KONE, TK, Mitsubishi y los controles de modernización (Monarch, MoviLift) tienen su herramienta y su forma de trabajar.' },
    { t: 'Norma', d: 'EM.070 del Reglamento Nacional de Edificaciones y la familia EN 81, que es la referencia técnica de la mayoría de equipos.' }
  ]
};
