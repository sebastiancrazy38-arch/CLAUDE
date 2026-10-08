/* Taller de Ascensores: códigos de falla por equipo, en palabras simples.
   Salen de la investigación de manuales y documentos públicos de cada fabricante; cada código lleva su fuente.
   Generado con unir-codigos.py a partir de la investigación verificada. Ante la duda, manda el manual del equipo. */
ASC.equiposFalla = [
 {
  "id": "as380",
  "familia": "chinos",
  "marca": "STEP",
  "fabricante": "STEP (Shanghai STEP Electric / Sigriner)",
  "nombre": "AS380 control integrado (control + variador en un solo equipo)",
  "tipo": "control",
  "dondeVer": "En la placa principal: con las teclas < y > busca el menú 'Fault code' en el display de 7 segmentos. Con el operador de mano SM-08E: Monitor > Fault record (muestra Err.Code, piso y hora). La luz L20 (STATE) parpadea lento cuando hay falla.",
  "historial": "Guarda las 20 últimas fallas; la número 00 es la más nueva. Con arriba/abajo pasas de una a otra, ENTER muestra la fecha y < > la hora y el piso. Se borran en el menú 'fault code reset' (pide contraseña).",
  "conexion": {
   "posible": false,
   "puerto": "Conector DB9 RS232 en la placa principal (para el operador de mano, cable SM-08E/USB). Bus CAN de 'monitoreo comunitario' en JP6 (CAN2H/CAN2L) hacia una PC de vigilancia. RS232 P1 solo en la tarjeta de grupo SM-GC.",
   "protocolo": "Propietario de STEP (no publicado en el manual)",
   "ajustes": "No publicados",
   "software": "Operador de mano SM-08E de STEP; software de monitoreo comunitario de STEP (por CAN). GROUPSET.EXE solo configura la tarjeta de grupo SM-GC.",
   "notas": "El manual no da protocolo ni direcciones de registro. Una laptop sola no puede leer la falla: usa el display de la placa o el operador de mano. El USB del operador solo sirve para copiar archivos de parámetros.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
  ],
  "verificado": false
 },
 {
  "id": "as320",
  "familia": "chinos",
  "marca": "STEP",
  "fabricante": "STEP (Shanghai STEP Electric / Sigriner)",
  "nombre": "AS320 variador para ascensor",
  "tipo": "variador",
  "dondeVer": "En el operador digital del variador: la luz D4 parpadea y los dígitos muestran el código actual. Menú [Fault Inspection] para ver las fallas guardadas.",
  "historial": "Guarda 8 fallas: ER0 es la más nueva y ER7 la más vieja. Con ENTER ves la tensión del bus (Udc), la corriente (Irms), la velocidad pedida (Vref) y la real (Vfbk) del momento de la falla. Init = 8 borra las fallas.",
  "conexion": {
   "posible": false,
   "puerto": "RS232 (para operador o PC) y RS485 (bornes A+, B-, SC)",
   "protocolo": "No publicado en el manual",
   "ajustes": "No publicados",
   "software": "Operador digital de STEP",
   "notas": "El manual dice que el RS232 sirve para operador o PC, pero no da el protocolo ni los registros. Lee la falla en el operador. Los códigos 1 a 39 del AS320 son los mismos que los 71 a 109 del AS380 (suma 70).",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
  ],
  "verificado": false
 },
 {
  "id": "f5021",
  "familia": "chinos",
  "marca": "STEP",
  "fabricante": "STEP (Shanghai STEP Electric)",
  "nombre": "F5021 control serial (maniobra STEP)",
  "tipo": "control",
  "dondeVer": "En la pantalla LCD y teclado de la placa principal, o con el operador de mano: Monitor > Error Record (número de error, piso y hora).",
  "historial": "Guarda las 20 últimas fallas con hora, piso y código.",
  "conexion": {
   "posible": false,
   "puerto": "DB9 RS232 en la placa principal para el operador de mano (cable SM-08/USB). RS485 (JP22.3 A, JP22.4 B) para monitoreo del edificio. RS232 P1 en la tarjeta de grupo SM-GC para laptop.",
   "protocolo": "Propietario de STEP (no publicado)",
   "ajustes": "No publicados",
   "software": "Operador de mano de STEP; software de monitoreo de STEP; GROUPSET.EXE (solo grupo)",
   "notas": "Con el software de monitoreo de STEP una PC muestra piso, sentido y errores por RS485, pero el protocolo no está publicado. Pide el software al representante de STEP.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
  ],
  "verificado": false
 },
 {
  "id": "bl2000",
  "familia": "chinos",
  "marca": "Blue Light",
  "fabricante": "Blue Light (Suzhou Blue Light / 苏州蓝光)",
  "nombre": "BL2000 control serial",
  "tipo": "control",
  "dondeVer": "En la pantalla LCD de la placa principal BL2000-STB: el menú principal muestra 'ER=#' cuando hay falla (en blanco = sin falla). Durante el autoaprendizaje del hueco sale 'LER=#'. Con la tecla > ves el estado de comunicación (Car com / Sys com).",
  "historial": "Menú Monitor, opción 8 'Fault record': guarda el tipo y la hora de las 10 últimas fallas; te mueves con ∧ y ∨.",
  "conexion": {
   "posible": false,
   "puerto": "Placa principal: J9 RS232 (TX2/RX2, para monitoreo remoto) y J10 RS485 (DA+/DA-, hacia variador). Placa de cabina: J7 RS232.",
   "protocolo": "Propietario de Blue Light (no publicado)",
   "ajustes": "No publicados",
   "software": "Equipos de monitoreo remoto de Blue Light (SJT-WJ / SJT-WK)",
   "notas": "El manual dice que una laptop por RS232 sirve para elegir velocidades, pero no da protocolo para leer fallas. Lee la falla en la LCD.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
  ],
  "verificado": false
 },
 {
  "id": "mont71",
  "familia": "chinos",
  "marca": "HPMONT",
  "fabricante": "HPMONT (Shenzhen Hpmont)",
  "nombre": "MONT71 control integrado",
  "tipo": "control",
  "dondeVer": "Teclado LCD: muestra 'E' + 4 cifras (ej. E0041) alternando con el modo de marcha, y puede mostrar causa y solución. Teclado chico de 3 dígitos en la placa MCB: muestra 'E41'.",
  "historial": "Guarda 11 fallas en F17.08 a F17.18 (F17.18 = la más nueva). Cada valor tiene 4 cifras: las 2 primeras son el piso y las 2 últimas el tipo de falla (0501 = falla 01 en piso 5). F17.19 a F17.21: velocidad, tensión del bus y corriente de la última falla. Para borrar: F01.02 = 3. La falla actual está en D04.06.",
  "conexion": {
   "posible": false,
   "puerto": "RJ45 Modbus en la placa (pin 2 MOD+, pin 7 MOD-, pines 1 y 3 +5V, pines 4-6 GND). Para PC usar convertidor RS485/232 aislado.",
   "protocolo": "Modbus (sin mapa de registros publicado)",
   "ajustes": "No publicados",
   "registroFalla": "Parámetro D04.06 = falla actual (número de menú, no dirección Modbus)",
   "software": "Software 'host computer' de HPMONT (parámetros, consulta de fallas, curvas)",
   "notas": "Una PC con el software de HPMONT puede consultar fallas, pero el manual no publica las direcciones Modbus. Pide el software y el mapa a HPMONT.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/MONT71%20Series%20Elevator%20Integrated%20Controller%20User%20Manual%20(V1.1)_20180503(1).pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf",
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/MONT71%20Series%20Elevator%20Integrated%20Controller%20User%20Manual%20(V1.1)_20180503(1).pdf"
  ],
  "verificado": false
 },
 {
  "id": "ec100",
  "familia": "chinos",
  "marca": "INVT",
  "fabricante": "INVT (Shenzhen INVT)",
  "nombre": "EC100 control integrado",
  "tipo": "control",
  "dondeVer": "Display LED de 2 dígitos: con falla parpadea 'Er' y luego el código. UP muestra fallas anteriores; DOWN sale. Del 104 al 126 el LED usa letra: A4 = 104, b0 = 110, C1 = 121, etc. También se ve en el operador manual (menú fault record).",
  "historial": "Guarda 30 fallas en el grupo E0: E0.00 total, E0.01 número (1 = la más nueva), E0.02 código, E0.03 a E0.06 fecha y hora, E0.07 piso. En inspección y nivelado, mover el switch de inspección 3 veces en 5 s borra el historial.",
  "conexion": {
   "posible": false,
   "puerto": "Placa de techo EC-CTB: borne P4 (A, B) RS485; también RS232 con PC. Ethernet opcional con módulo PA_DP/E.",
   "protocolo": "Formato RTU por RS485 (tipo Modbus RTU), sin mapa de registros publicado",
   "ajustes": "P6_00 dirección = 1; P6_01 = 4 (19200 bps); P6_02 = 1 (paridad par, 8E1)",
   "registroFalla": "Parámetro E0.02 (código de falla del registro); dirección Modbus no publicada",
   "software": "Software de PC de INVT (parámetros, consulta de fallas, curvas)",
   "notas": "El puerto y la velocidad están documentados, pero no las direcciones de registro. Sin el mapa de INVT no se puede leer la falla de forma segura.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
  ],
  "verificado": false
 },
 {
  "id": "nice3000new",
  "familia": "monarch",
  "marca": "Monarch",
  "fabricante": "Monarch / Inovance",
  "nombre": "NICE3000new (NICE3000+) control integrado con variador",
  "tipo": "control",
  "dondeVer": "Cuando hay una falla, los 3 dígitos LED de la tarjeta principal (MCB) muestran el código parpadeando. En el teclado MDKE/MDKE6 se ve el código con su subcódigo, por ejemplo 'E22-101'. Menú F-2 del teclado de la tarjeta: con 1 se borra la falla, y con 2 se ven las 11 últimas fallas con su hora.",
  "historial": "Las últimas 10 fallas están en FC-20 a FC-27 y FC-56 a FC-59. La falla elegida se ve en FC-06 (falla), FC-07 (código) y FC-08 (subcódigo), y FC-09/FC-10 guardan la hora y la fecha. Con la falla ya corregida, se borra con la tecla STOP.",
  "conexion": {
   "posible": false,
   "puerto": "Conector DB9 en la tarjeta principal, que es el puerto de monitoreo RS232. El mismo puerto sirve para grupo o paralelo por RS485 (con convertidor) y para cargar el software de la MCB y del variador.",
   "protocolo": "Serial RS232 propio de Monarch, el que usa el software NEMS. Modbus (botoneras de piso) y CAN (techo de cabina) se usan dentro del ascensor. Monarch no publica el mapa de registros ni el formato de las tramas.",
   "ajustes": "Fd-00 velocidad: 0 = 9600, 1 = 38400 bit/s (9600 sería el de fábrica, sin confirmar). Fd-02 dirección local: 0-127 (0 = difusión; de fábrica parece 1). Fd-03 retardo de respuesta: 0-20 x 10 ms. Fd-04 tiempo límite: 0.0-60.0 s (0.0 = sin límite). En el NICE3000 antiguo, FD-01 es el formato: 0 = 8,N,2; 1 = 8,E,1; 2 = 8,O,1. Un manual breve trae otra tabla de velocidades (0-5 = 9600, 6 = 19200), así que hay que confirmar con la versión del equipo.",
   "registroFalla": "No se encontró ninguna dirección de registro pública. La falla actual y el historial están en los parámetros FC-xx (FC-06 a FC-10, FC-20 a FC-27, FC-56 a FC-59), que NEMS lee con su protocolo propio.",
   "software": "Monarch NEMS (V2.4) con el cable de programación USB-RS232 de Monarch, para tarjetas MCTC-MCB-C1/C2/C3. NEMS muestra el piso, la dirección, el estado de falla y todos los parámetros, y permite subirlos y bajarlos. Según el manual no tiene versión en inglés. La MCTC-MIB-A sirve para monitorear desde una PC en la sala de control.",
   "notas": "Una laptop sí puede ver las fallas usando el software oficial NEMS y el cable USB-RS232 de Monarch. El protocolo de ese puerto no es público y no se encontraron las direcciones de registro de las fallas, así que una app propia no puede decodificar las fallas sin el documento de protocolo de Monarch (hay que pedirlo al representante). Por eso posible=false. Datos del cable y de NEMS: https://www.elevatorvip.com/product/monarch-elevator-usb-programming-cable/",
   "fuente": "https://www.manualslib.com/manual/1579683/Suzhou-Monarch-Control-Technology-Co-Ltd-Nice3000-New.html"
  },
  "fuentes": [
   "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/",
   "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN",
   "https://www.manualslib.com/manual/2126154/Inovance-Monarch-Nice300new-Series.html?page=129",
   "https://www.manualslib.com/manual/1226949/Monarch-Nice3000.html?page=249",
   "https://www.manualslib.com/manual/1579683/Suzhou-Monarch-Control-Technology-Co-Ltd-Nice3000-New.html",
   "https://www.elevatorvip.com/product/monarch-elevator-usb-programming-cable/"
  ],
  "verificado": false
 },
 {
  "id": "nice1000new",
  "familia": "monarch",
  "marca": "Monarch",
  "fabricante": "Monarch / Inovance",
  "nombre": "NICE1000 / NICE1000new control integrado",
  "tipo": "control",
  "dondeVer": "En el panel LED de operación o con el botón S1 de la tarjeta MCB. En el historial la falla se guarda con 4 dígitos: los 2 primeros son el piso y los 2 últimos el código. Ejemplo: 0835 = Err35 cerca del piso 8.",
  "historial": "Grupo FC: falla elegida, con su código y subcódigo (página 166 del manual). Los niveles de falla están en la página 178.",
  "conexion": {
   "posible": false,
   "puerto": "La lista de bornes del NICE1000 menciona CANbus, Modbus, USB, RJ45 e interfaz de tarjeta PG. No se confirmó cuál es el puerto para la PC.",
   "protocolo": "No publicado. Monarch nombra a NEMS como herramienta de PC.",
   "ajustes": "Fd-00 dirección local: 0-127 (0 = difusión). Fd-01 retardo de respuesta: 0-20. Fd-02 sería el tiempo límite (sin confirmar). No se encontró ningún parámetro de velocidad (baudios).",
   "registroFalla": "No se encontró.",
   "software": "Monarch NEMS. El manual lista 3 herramientas: el botón S1 de la MCB, el panel LED y NEMS.",
   "notas": "El protocolo y los registros no son públicos, así que una app propia no puede leer las fallas. El técnico debe leer el código en el panel LED y escribirlo en la app.",
   "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html",
   "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html?page=166",
   "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html?page=178",
   "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
  ],
  "verificado": false
 },
 {
  "id": "nice900",
  "familia": "monarch",
  "marca": "Monarch",
  "fabricante": "Monarch / Inovance",
  "nombre": "NICE900 controlador de operador de puertas",
  "tipo": "puertas",
  "dondeVer": "En el teclado o display del controlador de puertas, que está en el techo de la cabina. Los códigos salen como 'Er' más un número (algunos técnicos escriben E27).",
  "historial": "Las últimas fallas están en FA-02 a FA-11, y FA-12 a FA-17 guardan cómo estaba el equipo en la última falla. Según la versión se guardan 4 o 5 fallas. Er19, Er26 y Er27 no se borran solas.",
  "conexion": {
   "posible": false,
   "notas": "No se encontró ningún puerto para PC ni protocolo de lectura de fallas para el NICE900. Las fallas se leen en su display.",
   "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
  },
  "fuentes": [
   "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224",
   "https://www.aflyelevators.com/how-to-troubleshoot-nice900-door-inverter-fault-e27/"
  ],
  "verificado": false
 },
 {
  "id": "nice5000",
  "familia": "monarch",
  "marca": "Monarch",
  "fabricante": "Monarch / Inovance",
  "nombre": "NICE5000 control de ascensor",
  "tipo": "control",
  "dondeVer": "En el display LED de 5 dígitos del panel, que muestra parámetros, monitoreo y el código de falla. El menú F2 sirve para borrar la falla y ver el código. La tabla de fallas está en el capítulo 8.3 del manual, pero no se pudo leer.",
  "historial": "",
  "conexion": {
   "posible": false,
   "notas": "No se encontró información de puerto, protocolo ni registros de falla para el NICE5000.",
   "fuente": "https://www.manualslib.com/manual/2398267/Monarch-Nice-5000.html"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/2398267/Monarch-Nice-5000.html"
  ],
  "verificado": false
 }
];
ASC.codigos = [
 {
  "equipo": "as380",
  "codigo": "02",
  "nombre": "Cerradura se abre en viaje (parada de emergencia)",
  "simple": "Mientras el ascensor viajaba se abrió el contacto de cerradura y frenó de golpe.",
  "causas": [
   "Cerradura de una puerta de piso floja o mal regulada",
   "El patín de la cabina roza el rodillo de la cerradura",
   "Cable suelto en el circuito de puertas"
  ],
  "arreglo": [
   "Corta la energía y pon candado y tarjeta.",
   "Revisa piso por piso las cerraduras y sus contactos; limpia y ajusta.",
   "Mira que el patín no golpee los rodillos al pasar.",
   "Prueba en inspección. Nunca puentees la cerradura."
  ],
  "peligro": "Si la cerradura no cierra bien, alguien puede caer al pozo.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "03",
  "nombre": "Se pasó del último piso (subiendo)",
  "simple": "El ascensor pasó el piso más alto o se abrió el final de carrera de arriba.",
  "causas": [
   "Final de carrera de arriba dañado o mal ubicado",
   "Finales de arriba y abajo activos a la vez",
   "El control perdió la posición (encoder o cables que patinan)"
  ],
  "arreglo": [
   "Pasa a inspección y baja la cabina despacio.",
   "Corta la energía y revisa el final de carrera de arriba y su cable.",
   "Mide con multímetro que el contacto abra y cierre bien.",
   "Si moviste algo, haz de nuevo el autoaprendizaje del hueco."
  ],
  "peligro": "Riesgo de golpear el techo del pozo.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "04",
  "nombre": "Se pasó del primer piso (bajando)",
  "simple": "El ascensor pasó el piso más bajo o se abrió el final de carrera de abajo.",
  "causas": [
   "Final de carrera de abajo dañado o mal ubicado",
   "Finales de arriba y abajo activos a la vez",
   "El control perdió la posición"
  ],
  "arreglo": [
   "Pasa a inspección y sube la cabina despacio.",
   "Corta la energía y revisa el final de carrera de abajo y su cable.",
   "Mide el contacto con multímetro.",
   "Repite el autoaprendizaje si moviste algo."
  ],
  "peligro": "Riesgo de golpear los amortiguadores del foso.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "05",
  "nombre": "La puerta no abre",
  "simple": "La puerta no termina de abrir en 15 segundos y pasó 3 veces seguidas.",
  "causas": [
   "Operador de puertas sin fuerza o dañado",
   "Límite de puerta abierta mal ubicado",
   "Algo traba la pisadera",
   "Cerradura de piso puenteada en la zona de piso"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia la pisadera y revisa los guiadores.",
   "Revisa el límite de puerta abierta del operador.",
   "Retira cualquier puente en la cerradura y prueba en inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "06",
  "nombre": "La puerta no cierra",
  "simple": "La puerta no cierra bien en 15 segundos, o el límite de cierre no coincide con la cerradura (8 veces).",
  "causas": [
   "Basura o un objeto en la pisadera",
   "Cerradura que no engancha al cerrar",
   "Límite de puerta cerrada mal regulado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia la pisadera y revisa la cerradura.",
   "Regula el límite de puerta cerrada.",
   "Prueba abrir y cerrar en inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "08",
  "nombre": "Falla de comunicación CAN",
  "simple": "La placa principal no habla con la placa de cabina SM-02 por más de 4 segundos.",
  "causas": [
   "Cable de comunicación cortado o borne flojo en el cable viajero",
   "Falta la resistencia final (puente de terminación)",
   "Ruido eléctrico en el cable"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el par de comunicación en el cable viajero y sus bornes.",
   "Confirma que la resistencia final esté puesta.",
   "Mide la alimentación de la placa de cabina antes de cambiarla."
  ],
  "pieza": "cable_viajero",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "10",
  "nombre": "Interruptor de frenado de arriba (nivel 1) fuera de lugar",
  "simple": "El interruptor que avisa 'frena, llegas arriba' no está donde el control lo aprendió.",
  "causas": [
   "Interruptor movido o flojo",
   "Interruptor o cable dañado",
   "No se repitió el autoaprendizaje"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa la fijación y el cable del interruptor de desaceleración de arriba.",
   "Ponlo en su posición correcta.",
   "Haz de nuevo el autoaprendizaje del hueco."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "11",
  "nombre": "Interruptor de frenado de abajo (nivel 1) fuera de lugar",
  "simple": "El interruptor que avisa 'frena, llegas abajo' no está donde el control lo aprendió.",
  "causas": [
   "Interruptor movido o flojo",
   "Interruptor o cable dañado",
   "No se repitió el autoaprendizaje"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa la fijación y el cable del interruptor de desaceleración de abajo.",
   "Ponlo en su posición correcta.",
   "Haz de nuevo el autoaprendizaje del hueco."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "12",
  "nombre": "Interruptor de frenado de arriba (nivel 2) fuera de lugar",
  "simple": "El segundo interruptor de desaceleración de arriba no está donde se aprendió.",
  "causas": [
   "Interruptor movido o dañado",
   "Solo hay un nivel instalado pero el parámetro F182 dice dos"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el segundo interruptor de arriba.",
   "Revisa el parámetro F182.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "13",
  "nombre": "Interruptor de frenado de abajo (nivel 2) fuera de lugar",
  "simple": "El segundo interruptor de desaceleración de abajo no está donde se aprendió.",
  "causas": [
   "Interruptor movido o dañado",
   "Solo hay un nivel instalado pero el parámetro F182 dice dos"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el segundo interruptor de abajo.",
   "Revisa el parámetro F182.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "19",
  "nombre": "Límites de puerta abierta y cerrada a la vez",
  "simple": "El control ve 'puerta abierta' y 'puerta cerrada' al mismo tiempo por más de 1,5 segundos.",
  "causas": [
   "Interruptor de límite pegado o roto",
   "Cables en corto",
   "Tipo de contacto mal configurado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa los dos límites de puerta en el operador.",
   "Revisa cables y configuración de entradas.",
   "Prueba la puerta en inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "20",
  "nombre": "Protección de patinaje (tiempo sin ver piso)",
  "simple": "El ascensor viajó más tiempo del permitido (F62) sin ver el sensor de nivelación.",
  "causas": [
   "Sensor de nivelación dañado o sucio",
   "Cables de tracción patinan en la polea",
   "Cabina trabada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el sensor de nivelación y su cable.",
   "Revisa si los cables patinan en la polea.",
   "Resetea en inspección y prueba."
  ],
  "peligro": "Si los cables patinan, la cabina puede no detenerse bien.",
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "21",
  "nombre": "Motor recalentado",
  "simple": "Llegó la señal del sensor de temperatura del motor.",
  "causas": [
   "Motor muy caliente por trabajo o mala ventilación",
   "Sensor de temperatura o su cable abierto"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Mejora la ventilación de la sala de máquinas.",
   "Con el motor frío, mide el contacto del sensor.",
   "Revisa el cable hasta la placa."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "22",
  "nombre": "Motor gira al revés",
  "simple": "La cabina se movió en sentido contrario al pedido por 0,5 segundos.",
  "causas": [
   "Fases A y B del encoder (sensor de giro) invertidas",
   "Fases del motor invertidas",
   "Carga muy desbalanceada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el orden de los cables del encoder.",
   "Revisa el orden de las fases del motor.",
   "Prueba en inspección."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "23",
  "nombre": "Exceso de velocidad",
  "simple": "La velocidad medida pasó el límite permitido por 0,1 segundos.",
  "causas": [
   "Encoder flojo o con ruido",
   "Parámetros de velocidad mal puestos",
   "Freno débil o carga que arrastra"
  ],
  "arreglo": [
   "No pongas en servicio hasta saber la causa.",
   "Revisa fijación y cable del encoder.",
   "Revisa los parámetros de velocidad.",
   "Prueba el freno y el limitador de velocidad."
  ],
  "peligro": "Exceso de velocidad: riesgo grave para los pasajeros.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "24",
  "nombre": "Velocidad muy baja",
  "simple": "La velocidad medida quedó por debajo de lo permitido por 0,5 segundos.",
  "causas": [
   "Freno que no abre del todo",
   "Mucha carga o cabina trabada",
   "Encoder con falla"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa que el freno abra completo.",
   "Revisa guías y rozaderas por trabas.",
   "Revisa el encoder y su cable."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "27",
  "nombre": "Falla del sensor de nivelación de arriba",
  "simple": "El sensor de nivelación superior no actuó al parar, o actuó fuera de la distancia esperada.",
  "causas": [
   "Sensor sucio, flojo o dañado",
   "Paleta de nivelación (placa del piso) doblada o movida",
   "Cable del sensor roto"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia y ajusta el sensor de arriba.",
   "Revisa las paletas de nivelación.",
   "Revisa el cable hasta la placa de techo."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "28",
  "nombre": "Falla del sensor de nivelación de abajo",
  "simple": "El sensor de nivelación inferior no actuó, o actuó fuera de la distancia esperada.",
  "causas": [
   "Sensor sucio, flojo o dañado",
   "Paleta de nivelación doblada o movida",
   "Cable del sensor roto"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia y ajusta el sensor de abajo.",
   "Revisa las paletas de nivelación.",
   "Revisa el cable."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "30",
  "nombre": "Error de nivelación muy grande",
  "simple": "Al parar, la posición medida y la del piso difieren más de lo permitido (F146).",
  "causas": [
   "Cables de tracción patinan",
   "Encoder flojo o con ruido",
   "Paleta de nivelación movida"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Busca marcas de patinaje en la polea.",
   "Revisa las paletas.",
   "Repite el autoaprendizaje si cambiaste algo."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "32",
  "nombre": "Cadena de seguridad abierta en viaje",
  "simple": "Se cortó el circuito de seguridad mientras el ascensor viajaba.",
  "causas": [
   "Un contacto de seguridad se abrió (stop de foso, paracaídas, limitador, cable flojo)",
   "Trampilla o puerta de emergencia abierta",
   "Borne flojo en la cadena"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide la cadena por tramos con multímetro hasta hallar el contacto abierto.",
   "Repara ese contacto.",
   "Prueba en inspección. Nunca puentees la seguridad."
  ],
  "peligro": "Un contacto de seguridad puenteado puede causar un accidente grave.",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "35",
  "nombre": "Falla del contactor de freno",
  "simple": "El contactor (interruptor grande) del freno quedó pegado o no cerró.",
  "causas": [
   "Contactos pegados o gastados",
   "Bobina del contactor dañada",
   "Contacto auxiliar de aviso flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa contactos y bobina del contactor de freno.",
   "Mide el contacto auxiliar con multímetro.",
   "Cambia el contactor si está pegado."
  ],
  "peligro": "Si el contactor queda pegado, el freno puede no cerrar.",
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "36",
  "nombre": "Falla del contactor de salida (motor)",
  "simple": "El contactor que conecta el motor quedó pegado o no cerró.",
  "causas": [
   "Contactos pegados o gastados",
   "Bobina dañada",
   "Contacto auxiliar flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa contactos y bobina del contactor de motor.",
   "Mide el contacto auxiliar.",
   "Cambia el contactor si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "37",
  "nombre": "Falla de cerradura (cerrada con puerta abierta)",
  "simple": "El control ve la cerradura cerrada cuando la puerta está totalmente abierta.",
  "causas": [
   "Cerradura puenteada o en corto",
   "Límite de puerta abierta mal",
   "Relé de cerradura con lecturas distintas"
  ],
  "arreglo": [
   "Corta la energía.",
   "Busca puentes o cables en corto en el circuito de cerradura y quítalos.",
   "Revisa el límite de puerta abierta.",
   "Revisa el relé de cerradura."
  ],
  "peligro": "Una cerradura puenteada deja viajar con la puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "38",
  "nombre": "Falla del micro de freno",
  "simple": "El contacto que avisa si el freno abrió no coincide con la orden.",
  "causas": [
   "Micro de freno mal regulado",
   "Freno que no abre o queda pegado",
   "Cable del micro roto"
  ],
  "arreglo": [
   "Corta la energía y bloquea la cabina.",
   "Revisa y regula el micro de freno.",
   "Revisa que el freno abra y cierre bien.",
   "Revisa el cable."
  ],
  "pieza": "micro_freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "40",
  "nombre": "Falla de señal de marcha",
  "simple": "El control mandó marchar, pero la parte del variador no respondió.",
  "causas": [
   "El variador tiene otra falla activa",
   "Conexión interna floja"
  ],
  "arreglo": [
   "Mira si hay un código del variador (71 a 114) y resuélvelo primero.",
   "Apaga, espera 10 minutos y revisa conectores.",
   "Si sigue, llama al servicio de STEP."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "42",
  "nombre": "Error de interruptores de desaceleración",
  "simple": "Se activó el interruptor de desaceleración del extremo contrario al sentido de viaje.",
  "causas": [
   "Interruptores de arriba y abajo cruzados",
   "Interruptor pegado o dañado",
   "Cableado invertido"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa que el interruptor de arriba esté arriba y el de abajo abajo.",
   "Revisa los cables.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "45",
  "nombre": "Falla del relé de preapertura",
  "simple": "La salida Y14 y la entrada X17 de preapertura no coinciden por más de 0,5 segundos.",
  "causas": [
   "Relé de preapertura dañado",
   "Cable de X17 flojo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el relé de preapertura.",
   "Revisa el cable de X17."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "49",
  "nombre": "Falla de comunicación interna",
  "simple": "La parte de control y la parte del variador no se comunican bien.",
  "causas": [
   "Conector interno flojo",
   "Ruido eléctrico o mala tierra",
   "Placa dañada"
  ],
  "arreglo": [
   "Apaga y espera 10 minutos.",
   "Revisa conectores internos y tierras.",
   "Si sigue, llama al servicio de STEP."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "50",
  "nombre": "Error de parámetros",
  "simple": "La placa no pudo leer bien los parámetros guardados.",
  "causas": [
   "Memoria con datos dañados",
   "Corte de luz al guardar"
  ],
  "arreglo": [
   "Apaga y enciende.",
   "Revisa y vuelve a cargar los parámetros con el operador de mano.",
   "Si vuelve, repara o cambia la placa con STEP."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "54",
  "nombre": "Cerraduras de piso y cabina no coinciden",
  "simple": "Al abrir la puerta, la cerradura del piso y la de cabina dan señales distintas.",
  "causas": [
   "Contacto de puerta de cabina o de piso puenteado",
   "Contacto sucio o dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contacto de puerta de cabina y las cerraduras de piso.",
   "Quita cualquier puente.",
   "Prueba en inspección."
  ],
  "peligro": "Un contacto puenteado deja viajar con la puerta abierta.",
  "pieza": "contacto_puerta_cabina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "60",
  "nombre": "Contactor de salida se abrió en viaje",
  "simple": "Durante el viaje se abrió el contactor del motor y el control apagó la salida.",
  "causas": [
   "Contactor de salida dañado",
   "Contacto auxiliar flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor de motor y su contacto auxiliar.",
   "Ajusta bornes y cambia el contactor si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "61",
  "nombre": "Falla de arranque",
  "simple": "Después de abrir el freno, no llegó la señal de 'listo' del variador.",
  "causas": [
   "Variador con otra falla",
   "Ajuste de arranque incorrecto"
  ],
  "arreglo": [
   "Revisa si el variador muestra otro código.",
   "Revisa los parámetros de arranque.",
   "Si sigue, llama al servicio de STEP."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "62",
  "nombre": "Sin velocidad al arrancar",
  "simple": "Después de arrancar, la velocidad sigue en 0 y la cabina no se mueve.",
  "causas": [
   "Freno que no abre",
   "Cabina o contrapeso trabados",
   "Encoder sin señal"
  ],
  "arreglo": [
   "Corta la energía y bloquea la cabina.",
   "Revisa que el freno abra.",
   "Busca trabas en guías.",
   "Revisa el encoder y su cable."
  ],
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "67",
  "nombre": "Error de reloj (RTC)",
  "simple": "Falla de hardware de la placa principal.",
  "causas": [
   "Falla interna de la placa principal"
  ],
  "arreglo": [
   "Apaga y enciende.",
   "Si vuelve, llama a STEP para reparar o cambiar la placa."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "68",
  "nombre": "Medida de paleta incorrecta (autoaprendizaje)",
  "simple": "La paleta de nivelación o la distancia entre sensores es muy larga o muy corta.",
  "causas": [
   "Paleta de nivelación de largo incorrecto",
   "Sensores de nivelación muy juntos o muy separados"
  ],
  "arreglo": [
   "Mide la paleta y la distancia entre sensores.",
   "Ajusta según el manual.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "69",
  "nombre": "Número de paletas no coincide",
  "simple": "Las paletas contadas no coinciden con los pisos configurados (F11 menos F10).",
  "causas": [
   "Falta una paleta o está doblada",
   "Parámetro F11 (pisos) o F10 (desfase) mal puesto"
  ],
  "arreglo": [
   "Cuenta las paletas en el hueco.",
   "Revisa F10 y F11.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "71",
  "nombre": "Sobrecorriente en módulo de potencia",
  "simple": "El módulo de potencia del variador detectó demasiada corriente.",
  "causas": [
   "Corto en cables del motor o a tierra",
   "Encoder dañado o mal conectado",
   "Fases del motor o del encoder invertidas",
   "Ángulo del motor mal aprendido"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos (bus menor a 24 V).",
   "Mide aislamiento de cables y motor a tierra.",
   "Revisa el encoder y su cable.",
   "Repite el aprendizaje del ángulo si el motor es síncrono.",
   "Si sigue, llama al servicio técnico."
  ],
  "peligro": "Los condensadores guardan carga: espera 10 minutos antes de tocar.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "72",
  "nombre": "Falla ADC (medición de corriente)",
  "simple": "Falla el circuito que mide la corriente.",
  "causas": [
   "Sensor de corriente dañado",
   "Placa de control dañada"
  ],
  "arreglo": [
   "Apaga y enciende.",
   "Si vuelve, cambia el sensor o la placa con el servicio de STEP."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "73",
  "nombre": "Disipador recalentado",
  "simple": "El variador está muy caliente.",
  "causas": [
   "Ambiente muy caliente",
   "Ducto tapado con polvo",
   "Ventilador dañado"
  ],
  "arreglo": [
   "Corta la energía y deja enfriar.",
   "Limpia el polvo del disipador.",
   "Revisa el ventilador y cámbialo por uno igual.",
   "Mejora la ventilación de la sala."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "74",
  "nombre": "Falla de la unidad de frenado",
  "simple": "Falla el circuito que manda la energía sobrante a la resistencia de frenado.",
  "causas": [
   "Unidad de frenado dañada",
   "Resistencia de frenado en corto"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide la resistencia de frenado y sus cables.",
   "Si la unidad está dañada, cambia el módulo."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "76",
  "nombre": "Fuerza del motor excesiva",
  "simple": "El motor se trabó o la carga cambió de golpe.",
  "causas": [
   "Tensión de entrada baja",
   "Motor trabado o carga brusca",
   "Encoder con falla",
   "Falta una fase a la salida"
  ],
  "arreglo": [
   "Mide la tensión de entrada.",
   "Revisa freno y trabas mecánicas.",
   "Revisa el encoder.",
   "Revisa los cables del motor."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "77",
  "nombre": "Desviación de velocidad",
  "simple": "La velocidad real no sigue a la pedida.",
  "causas": [
   "Aceleración muy rápida",
   "Sobrecarga",
   "Límite de corriente muy bajo"
  ],
  "arreglo": [
   "Revisa que no haya sobrecarga.",
   "Alarga el tiempo de aceleración.",
   "Revisa el límite de corriente con ayuda del manual."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "78",
  "nombre": "Sobretensión del bus DC",
  "simple": "La energía interna (bus DC) subió demasiado.",
  "causas": [
   "Tensión de red alta",
   "Resistencia de frenado desconectada o de valor muy alto",
   "Frenado muy rápido o mucha inercia"
  ],
  "arreglo": [
   "Mide la tensión de la red.",
   "Corta la energía, espera 10 minutos y revisa la resistencia de frenado.",
   "Alarga el tiempo de desaceleración."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "79",
  "nombre": "Baja tensión del bus DC",
  "simple": "La tensión de entrada bajó del mínimo.",
  "causas": [
   "Corte o bajón de luz",
   "Borne de entrada flojo",
   "Otra carga grande arrancando en la misma red"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada.",
   "Sin energía, ajusta los bornes de entrada.",
   "Resetea cuando la tensión esté normal."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "80",
  "nombre": "Falta una fase a la salida",
  "simple": "Falta una fase entre el variador y el motor.",
  "causas": [
   "Cable del motor suelto o cortado",
   "Borne de salida flojo",
   "Fases del motor desbalanceadas"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Revisa y ajusta los cables U, V, W.",
   "Mide el bobinado del motor."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "81",
  "nombre": "Sobrecorriente a baja velocidad",
  "simple": "El motor tomó mucha corriente a baja velocidad.",
  "causas": [
   "Tensión de red baja",
   "Datos del motor mal puestos",
   "Frenado muy corto o carga brusca"
  ],
  "arreglo": [
   "Mide la tensión de red.",
   "Revisa los datos del motor con la placa del motor.",
   "Alarga la desaceleración."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "82",
  "nombre": "Falla del encoder",
  "simple": "El variador no recibe bien la señal del encoder (sensor de giro).",
  "causas": [
   "Encoder mal conectado o cable cortado",
   "Encoder sin alimentación",
   "Parámetros del encoder mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el cable y el conector del encoder.",
   "Mide la alimentación del encoder.",
   "Revisa los parámetros del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "84",
  "nombre": "Velocidad al revés en marcha",
  "simple": "El motor gira al revés de lo pedido.",
  "causas": [
   "Orden de fases del encoder distinto al del motor",
   "Cambio brusco de carga",
   "Límite de corriente bajo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Cambia el orden de fases del motor o del encoder.",
   "Prueba en inspección."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "85",
  "nombre": "Movimiento con el ascensor parado",
  "simple": "El encoder ve giro cuando el ascensor debería estar quieto.",
  "causas": [
   "Freno flojo: la cabina se desliza",
   "Encoder flojo o con ruido"
  ],
  "arreglo": [
   "Bloquea la cabina antes de trabajar.",
   "Revisa y regula el freno.",
   "Ajusta el encoder y revisa su cable blindado."
  ],
  "peligro": "La cabina puede moverse sola: riesgo de atrapamiento.",
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "86",
  "nombre": "Fases del motor invertidas",
  "simple": "Los cables del motor están en orden invertido.",
  "causas": [
   "Cables U, V, W del motor cruzados"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Cambia dos fases del motor o ajusta el parámetro.",
   "Prueba en inspección."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "89",
  "nombre": "Fases UVW del encoder en mal orden",
  "simple": "Las señales U, V, W del encoder llegan en orden equivocado.",
  "causas": [
   "Conexión del encoder mal hecha",
   "Parámetros del encoder mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa la conexión del encoder.",
   "Revisa los parámetros del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "90",
  "nombre": "Falla de comunicación del encoder",
  "simple": "El variador no se comunica con el encoder.",
  "causas": [
   "Encoder dañado",
   "Cable del encoder flojo o roto"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el cable del encoder.",
   "Haz el autoaprendizaje del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "91",
  "nombre": "Sobrecorriente instantánea (fases a, b, c)",
  "simple": "Una fase del motor tuvo un pico de corriente muy alto.",
  "causas": [
   "Una fase del motor a tierra",
   "Encoder dañado o con fases cruzadas",
   "Ángulo del motor mal aprendido",
   "Placa de disparo dañada"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide aislamiento del motor y sus cables.",
   "Revisa el encoder.",
   "Repite el aprendizaje del ángulo."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "92",
  "nombre": "Falla de detección de freno",
  "simple": "El variador no confirma que el freno actuó.",
  "causas": [
   "Relé de salida no actúa",
   "Cable de alimentación del freno suelto",
   "Sensor de aviso del freno no detecta"
  ],
  "arreglo": [
   "Corta la energía y bloquea la cabina.",
   "Revisa el relé de control del freno.",
   "Revisa el cable de alimentación del freno.",
   "Regula el contacto de aviso del freno."
  ],
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "93",
  "nombre": "Sobretensión de entrada",
  "simple": "La tensión que llega al equipo es muy alta.",
  "causas": [
   "Tensión de red mayor a la del equipo",
   "Falla del circuito que mide la tensión"
  ],
  "arreglo": [
   "Mide la tensión de entrada.",
   "Confirma que coincida con la del variador.",
   "Si la red está bien, llama al servicio técnico."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "94",
  "nombre": "Encoder UVW desconectado",
  "simple": "Se cortó la señal del encoder UVW.",
  "causas": [
   "Borne flojo o cable roto",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa bornes y cable del encoder.",
   "Cambia el cable si está roto."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "96",
  "nombre": "Encoder sin aprendizaje",
  "simple": "El motor síncrono no tiene aprendido el ángulo del encoder.",
  "causas": [
   "No se hizo el autoaprendizaje del encoder",
   "Se cambió el encoder o el motor"
  ],
  "arreglo": [
   "Haz el autoaprendizaje del encoder según el manual.",
   "Prueba en inspección."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "97",
  "nombre": "Sobrecorriente de salida (sobrecarga)",
  "simple": "El motor trabajó con demasiada corriente por mucho tiempo.",
  "causas": [
   "Sobrecarga por mucho tiempo",
   "Motor o freno trabado",
   "Corto en el bobinado o en la salida",
   "Encoder o fases mal"
  ],
  "arreglo": [
   "Deja descansar el equipo.",
   "Revisa que la carga esté dentro de lo permitido.",
   "Revisa el freno y el motor.",
   "Revisa el encoder y los cables de salida."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "98",
  "nombre": "Falla del encoder Sincos",
  "simple": "El encoder Sincos está dañado o mal cableado.",
  "causas": [
   "Encoder dañado",
   "Cables equivocados o rotos"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el encoder y su cable.",
   "Cámbialo si está dañado."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "99",
  "nombre": "Falta una fase de entrada",
  "simple": "Falta una de las tres fases que entran al equipo.",
  "causas": [
   "Fase de la red caída",
   "Borne de entrada flojo"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada.",
   "Sin energía, ajusta los bornes de entrada.",
   "Revisa fusibles o llave principal."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "100",
  "nombre": "Protección de sobrevelocidad del variador",
  "simple": "El motor pasó la velocidad máxima permitida.",
  "causas": [
   "Encoder mal configurado o con ruido",
   "Cambio brusco de carga",
   "Parámetro de sobrevelocidad mal"
  ],
  "arreglo": [
   "No pongas en servicio hasta saber la causa.",
   "Revisa el encoder.",
   "Revisa los parámetros de protección.",
   "Prueba el freno."
  ],
  "peligro": "Exceso de velocidad: riesgo grave.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "101",
  "nombre": "Sobrecorriente a alta velocidad",
  "simple": "El motor tomó mucha corriente a alta velocidad.",
  "causas": [
   "Tensión de red baja",
   "Cambio brusco de carga",
   "Datos del motor o encoder mal"
  ],
  "arreglo": [
   "Mide la tensión de red.",
   "Revisa los datos del motor.",
   "Revisa el encoder."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "102",
  "nombre": "Falla a tierra",
  "simple": "Hay fuga de corriente a tierra en la salida del motor.",
  "causas": [
   "Cableado mal",
   "Motor con aislamiento dañado"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide aislamiento del motor y cables antes de cambiar el motor.",
   "Corrige el cableado."
  ],
  "peligro": "Riesgo de descarga eléctrica.",
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "104",
  "nombre": "Falla externa",
  "simple": "Llegó una señal de falla por una entrada externa.",
  "causas": [
   "Un equipo externo mandó señal de falla"
  ],
  "arreglo": [
   "Revisa qué equipo está conectado a la entrada de falla externa.",
   "Corrige ese equipo y resetea."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "108",
  "nombre": "Resistencia de frenado en corto",
  "simple": "La resistencia de frenado externa está en corto.",
  "causas": [
   "Resistencia o sus cables en corto"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide la resistencia de frenado.",
   "Revisa sus cables y conexiones."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "112",
  "nombre": "Corto en IGBT (módulo de potencia)",
  "simple": "Se detectó un corto en la salida del variador.",
  "causas": [
   "Motor o cables de salida en corto",
   "Corto a tierra"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide cables de salida y motor.",
   "No vuelvas a energizar hasta quitar el corto."
  ],
  "peligro": "Riesgo de descarga y de dañar más el equipo.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "113",
  "nombre": "Falla de comunicación interna del equipo",
  "simple": "Las partes internas del equipo no se comunican.",
  "causas": [
   "Conectores internos flojos",
   "Placa con mal contacto o dañada"
  ],
  "arreglo": [
   "Apaga y espera 10 minutos.",
   "Pide inspección al servicio técnico de STEP."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as380",
  "codigo": "114",
  "nombre": "Falla del relé de carga",
  "simple": "Falla el relé que carga los condensadores, o la tensión bajó más de 30 V de golpe.",
  "causas": [
   "Relé de carga dañado",
   "Bajón brusco de la red"
  ],
  "arreglo": [
   "Revisa la tensión de entrada.",
   "Si la red está bien, llama al servicio técnico."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS380%20Series%20Elevator%20Intergrated%20Controller%20User%20Instruction%20V2.13.pdf"
 },
 {
  "equipo": "as320",
  "codigo": "1",
  "nombre": "Sobrecorriente en módulo de potencia",
  "simple": "El variador detectó demasiada corriente en su módulo.",
  "causas": [
   "Corto en motor o cables",
   "Encoder dañado o fases cruzadas",
   "Tensión del bus alta"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide aislamiento de motor y cables.",
   "Revisa el encoder.",
   "Si sigue, llama al servicio técnico."
  ],
  "peligro": "Condensadores con carga: espera 10 minutos.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "3",
  "nombre": "Disipador recalentado",
  "simple": "El variador está muy caliente.",
  "causas": [
   "Ambiente caliente",
   "Polvo en el disipador",
   "Ventilador dañado"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Limpia el disipador.",
   "Revisa el ventilador."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "4",
  "nombre": "Falla de la unidad de frenado",
  "simple": "Falla el circuito de la resistencia de frenado.",
  "causas": [
   "Unidad de frenado dañada",
   "Resistencia de frenado en corto"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide la resistencia y sus cables."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "7",
  "nombre": "Desviación de velocidad",
  "simple": "La velocidad real no sigue a la pedida.",
  "causas": [
   "Aceleración muy rápida",
   "Sobrecarga",
   "Límite de corriente bajo"
  ],
  "arreglo": [
   "Revisa la carga.",
   "Alarga la aceleración.",
   "Revisa el límite de corriente."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "8",
  "nombre": "Sobretensión del bus DC",
  "simple": "La energía interna del variador subió demasiado.",
  "causas": [
   "Red alta",
   "Resistencia de frenado desconectada",
   "Frenado muy rápido"
  ],
  "arreglo": [
   "Mide la red.",
   "Revisa la resistencia de frenado sin energía.",
   "Alarga la desaceleración."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "9",
  "nombre": "Baja tensión del bus DC",
  "simple": "La tensión de entrada bajó del mínimo.",
  "causas": [
   "Corte o bajón de luz",
   "Borne de entrada flojo"
  ],
  "arreglo": [
   "Mide las 3 fases.",
   "Ajusta bornes sin energía.",
   "Resetea con tensión normal."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "10",
  "nombre": "Falta fase de salida",
  "simple": "Falta una fase entre el variador y el motor.",
  "causas": [
   "Cable de motor suelto",
   "Contactor de salida con mal contacto"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cables U, V, W y el contactor."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "12",
  "nombre": "Falla del encoder",
  "simple": "No llega bien la señal del encoder (sensor de giro).",
  "causas": [
   "Cable cortado o mal conectado",
   "Encoder sin alimentación",
   "Parámetros mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cable y conector del encoder.",
   "Revisa parámetros."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "14",
  "nombre": "Velocidad al revés en marcha",
  "simple": "El motor gira al revés de lo pedido.",
  "causas": [
   "Fases del encoder y motor en distinto orden",
   "Carga brusca"
  ],
  "arreglo": [
   "Corta la energía.",
   "Corrige el orden de fases.",
   "Prueba en inspección."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "15",
  "nombre": "Movimiento con el ascensor parado",
  "simple": "Se detecta giro cuando el ascensor debería estar quieto.",
  "causas": [
   "Freno flojo",
   "Encoder flojo o con ruido"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Regula el freno.",
   "Ajusta el encoder."
  ],
  "peligro": "La cabina puede moverse sola.",
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "16",
  "nombre": "Fases del motor invertidas",
  "simple": "Los cables del motor están en orden equivocado.",
  "causas": [
   "Cables U, V, W cruzados"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Cambia dos fases o ajusta el parámetro."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "20",
  "nombre": "Falla de comunicación del encoder",
  "simple": "El variador no se comunica con el encoder.",
  "causas": [
   "Encoder dañado",
   "Cable flojo"
  ],
  "arreglo": [
   "Revisa el cable.",
   "Haz el autoaprendizaje del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "22",
  "nombre": "Falla de detección de freno",
  "simple": "El variador no confirma que el freno actuó.",
  "causas": [
   "Relé de salida no actúa",
   "Cable del freno suelto"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Revisa relé y cable del freno."
  ],
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "24",
  "nombre": "Encoder UVW desconectado",
  "simple": "Se cortó la señal del encoder UVW.",
  "causas": [
   "Cable roto",
   "Borne flojo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa bornes y cable."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "26",
  "nombre": "Encoder sin aprendizaje",
  "simple": "Falta el autoaprendizaje del encoder del motor síncrono.",
  "causas": [
   "No se hizo el aprendizaje",
   "Se cambió el encoder"
  ],
  "arreglo": [
   "Haz el autoaprendizaje del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "27",
  "nombre": "Sobrecorriente de salida",
  "simple": "El motor tomó demasiada corriente por mucho tiempo.",
  "causas": [
   "Sobrecarga",
   "Motor o freno trabado",
   "Corto en la salida"
  ],
  "arreglo": [
   "Revisa la carga.",
   "Revisa freno y motor.",
   "Mide los cables de salida."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "29",
  "nombre": "Falta fase de entrada",
  "simple": "Falta una de las tres fases de entrada.",
  "causas": [
   "Fase caída",
   "Borne flojo"
  ],
  "arreglo": [
   "Mide las 3 fases.",
   "Ajusta bornes sin energía."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "30",
  "nombre": "Protección de sobrevelocidad",
  "simple": "El motor pasó la velocidad máxima.",
  "causas": [
   "Encoder con ruido o mal configurado",
   "Carga brusca"
  ],
  "arreglo": [
   "No pongas en servicio.",
   "Revisa encoder y parámetros.",
   "Prueba el freno."
  ],
  "peligro": "Exceso de velocidad: riesgo grave.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "32",
  "nombre": "Falla a tierra",
  "simple": "Hay fuga a tierra en la salida del motor.",
  "causas": [
   "Cableado mal",
   "Aislamiento del motor dañado"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide aislamiento antes de cambiar el motor."
  ],
  "peligro": "Riesgo de descarga eléctrica.",
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "as320",
  "codigo": "38",
  "nombre": "Resistencia de frenado en corto",
  "simple": "La resistencia de frenado está en corto.",
  "causas": [
   "Resistencia o cables en corto"
  ],
  "arreglo": [
   "Corta la energía y espera 10 minutos.",
   "Mide la resistencia y sus cables."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/AS320%20Series%20Elevator-used%20inverter%20User%20Manual%20V2.08(1).pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "02",
  "nombre": "Cerradura se abre en viaje",
  "simple": "Falta la señal de cerradura en viaje aunque la seguridad está bien; para de emergencia.",
  "causas": [
   "Cerradura de piso floja o mal regulada",
   "Patín de cabina roza el rodillo",
   "Cable suelto"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y ajusta las cerraduras piso por piso.",
   "Prueba en inspección. Nunca puentees."
  ],
  "peligro": "Riesgo de caída al pozo.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "03",
  "nombre": "Final de carrera de arriba abierto",
  "simple": "El final de carrera superior se abrió subiendo, o ambos finales están activos fuera del último piso.",
  "causas": [
   "Final de carrera dañado o mal ubicado",
   "El control perdió la posición"
  ],
  "arreglo": [
   "Baja en inspección.",
   "Corta la energía y revisa el final de arriba.",
   "Repite el autoaprendizaje si moviste algo."
  ],
  "peligro": "Riesgo de golpear el techo del pozo.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "04",
  "nombre": "Final de carrera de abajo abierto",
  "simple": "El final de carrera inferior se abrió bajando, o ambos finales están activos fuera del primer piso.",
  "causas": [
   "Final de carrera dañado o mal ubicado",
   "El control perdió la posición"
  ],
  "arreglo": [
   "Sube en inspección.",
   "Corta la energía y revisa el final de abajo.",
   "Repite el autoaprendizaje si moviste algo."
  ],
  "peligro": "Riesgo de golpear los amortiguadores.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "05",
  "nombre": "La puerta no abre",
  "simple": "La puerta no abre del todo en 15 segundos, 3 veces seguidas.",
  "causas": [
   "Operador de puertas débil o dañado",
   "Límite de apertura mal",
   "Cerradura de piso puenteada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Limpia pisadera y revisa el límite de apertura.",
   "Quita cualquier puente en la cerradura."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "06",
  "nombre": "La puerta no cierra",
  "simple": "La puerta no cierra bien en 15 segundos, o el límite de cierre no coincide con la cerradura (8 veces).",
  "causas": [
   "Basura en la pisadera",
   "Cerradura que no engancha",
   "Límite de cierre mal regulado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Limpia la pisadera.",
   "Revisa cerradura y límite de cierre."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "08",
  "nombre": "Falla de comunicación CAN",
  "simple": "La placa principal no habla con la placa de cabina SM-02 por 4 segundos.",
  "causas": [
   "Cable de comunicación cortado",
   "Falta el puente de resistencia final",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el par de comunicación del cable viajero.",
   "Pon la resistencia final."
  ],
  "pieza": "cable_viajero",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "09",
  "nombre": "Falla del variador",
  "simple": "El variador mandó señal de falla a la entrada X11.",
  "causas": [
   "El variador tiene su propia falla"
  ],
  "arreglo": [
   "Lee el código en el display del variador.",
   "Busca ese código en la lista de tu variador.",
   "Resetea cuando esté resuelto."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "10",
  "nombre": "Interruptor de frenado de arriba fuera de lugar",
  "simple": "El interruptor de desaceleración de arriba no está donde se aprendió.",
  "causas": [
   "Interruptor movido o flojo",
   "Cable dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Ajusta el interruptor.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "11",
  "nombre": "Interruptor de frenado de abajo fuera de lugar",
  "simple": "El interruptor de desaceleración de abajo no está donde se aprendió.",
  "causas": [
   "Interruptor movido o flojo",
   "Cable dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Ajusta el interruptor.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "19",
  "nombre": "Límites de puerta abierta y cerrada a la vez",
  "simple": "Los dos límites de puerta están activos por más de 1,5 segundos.",
  "causas": [
   "Límite pegado",
   "Cable en corto"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa los límites y sus cables."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "20",
  "nombre": "Protección de patinaje",
  "simple": "Viajó más del tiempo F62 sin ver el sensor de nivelación.",
  "causas": [
   "Sensor de nivelación dañado",
   "Cables patinan",
   "Cabina trabada"
  ],
  "arreglo": [
   "Revisa el sensor de nivelación.",
   "Revisa patinaje en la polea.",
   "Resetea en inspección o apagando."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "21",
  "nombre": "Motor recalentado",
  "simple": "Llegó señal de sobretemperatura del motor (entrada X25).",
  "causas": [
   "Motor caliente",
   "Sensor o cable abierto"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Mide el sensor con el motor frío.",
   "Mejora la ventilación."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "22",
  "nombre": "Motor gira al revés",
  "simple": "La cabina se movió al revés por 0,5 segundos.",
  "causas": [
   "Fases A y B del encoder invertidas en la placa"
  ],
  "arreglo": [
   "Corta la energía.",
   "Intercambia A y B del encoder en la placa.",
   "Prueba en inspección."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "23",
  "nombre": "Exceso de velocidad",
  "simple": "La velocidad medida pasó el límite por 0,1 segundos.",
  "causas": [
   "Encoder con ruido o flojo",
   "Parámetros mal",
   "Freno débil"
  ],
  "arreglo": [
   "No pongas en servicio.",
   "Revisa el encoder y parámetros.",
   "Prueba freno y limitador."
  ],
  "peligro": "Riesgo grave para pasajeros.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "24",
  "nombre": "Velocidad muy baja",
  "simple": "La velocidad quedó por debajo de lo permitido por 0,5 segundos.",
  "causas": [
   "Freno que no abre del todo",
   "Cabina trabada"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Busca trabas en guías."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "27",
  "nombre": "Falla del sensor de nivelación de arriba",
  "simple": "El sensor de nivelación superior no actuó al frenar para parar.",
  "causas": [
   "Sensor sucio o dañado",
   "Paleta movida"
  ],
  "arreglo": [
   "Corta la energía.",
   "Limpia y ajusta el sensor.",
   "Revisa las paletas."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "28",
  "nombre": "Falla del sensor de nivelación de abajo",
  "simple": "El sensor de nivelación inferior no actuó.",
  "causas": [
   "Sensor sucio o dañado",
   "Paleta movida"
  ],
  "arreglo": [
   "Corta la energía.",
   "Limpia y ajusta el sensor.",
   "Revisa las paletas."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "30",
  "nombre": "Error de posición al nivelar",
  "simple": "La posición del encoder y la del piso difieren más que F146; el ascensor va a buscar posición.",
  "causas": [
   "Encoder interrumpido",
   "Cables de tracción patinan"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Busca patinaje en la polea."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "32",
  "nombre": "Cadena de seguridad abierta",
  "simple": "Se cortó el circuito de seguridad en servicio.",
  "causas": [
   "Contacto de seguridad abierto (foso, paracaídas, limitador)",
   "Borne flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide la cadena por tramos.",
   "Repara el contacto. Nunca puentees."
  ],
  "peligro": "Puentear la seguridad puede causar un accidente.",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "34",
  "nombre": "Falla del contactor de entrada (KMC)",
  "simple": "El contactor de entrada quedó pegado o no cerró.",
  "causas": [
   "Contactos pegados",
   "Bobina dañada",
   "Contacto auxiliar flojo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor KMC.",
   "Cámbialo si está pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "35",
  "nombre": "Falla del contactor de freno (KMB)",
  "simple": "El contactor de freno quedó pegado o no cerró.",
  "causas": [
   "Contactos pegados",
   "Bobina dañada",
   "Contacto auxiliar flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor KMB.",
   "Cámbialo si está pegado."
  ],
  "peligro": "El freno puede no cerrar.",
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "36",
  "nombre": "Falla del contactor de salida (KMY)",
  "simple": "El contactor de motor quedó pegado o no cerró.",
  "causas": [
   "Contactos pegados",
   "Bobina dañada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor KMY.",
   "Cámbialo si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "37",
  "nombre": "Cerradura pegada",
  "simple": "Con la puerta totalmente abierta se detecta la cerradura cerrada.",
  "causas": [
   "Cerradura puenteada o en corto"
  ],
  "arreglo": [
   "Corta la energía.",
   "Busca y quita puentes en la cerradura.",
   "Revisa el límite de apertura."
  ],
  "peligro": "Permite viajar con puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "38",
  "nombre": "Falla del micro de freno",
  "simple": "Hay orden de abrir el freno, pero el micro dice que no abrió.",
  "causas": [
   "Micro de freno mal regulado",
   "Freno que no abre"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Regula el micro.",
   "Revisa el freno."
  ],
  "pieza": "micro_freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "39",
  "nombre": "Falla de relés de seguridad",
  "simple": "El relé de seguridad no cierra, está pegado, o su lectura no coincide con la alta tensión.",
  "causas": [
   "Relé de seguridad dañado o pegado",
   "Entrada de alta tensión de la placa dañada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el relé de seguridad.",
   "Mide la entrada de alta tensión antes de cambiar la placa."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "40",
  "nombre": "El variador no responde",
  "simple": "Hay orden de dirección y marcha, pero el variador no devuelve la señal de 'en marcha'.",
  "causas": [
   "Variador con falla",
   "Cable de señal roto",
   "Parámetros del variador"
  ],
  "arreglo": [
   "Mira el display del variador.",
   "Revisa cables de señal entre control y variador.",
   "Revisa parámetros."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "42",
  "nombre": "Final y desaceleración contrarios a la vez",
  "simple": "Parado y fuera de inspección, actúan juntos un final de carrera y el interruptor de frenado del otro extremo.",
  "causas": [
   "Interruptores cruzados",
   "Interruptor pegado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa ubicación y cables de finales e interruptores de frenado."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "f5021",
  "codigo": "54",
  "nombre": "Cerradura de cabina y de piso no coinciden",
  "simple": "Las entradas de alta tensión de puerta de cabina y de piso no coinciden por 1,5 segundos.",
  "causas": [
   "Contacto de puerta de cabina o de piso puenteado",
   "Contacto dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa contactos de cabina y piso.",
   "Quita puentes."
  ],
  "peligro": "Permite viajar con puerta abierta.",
  "pieza": "contacto_puerta_cabina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/STEP/Step%20f5021%20chino%20maniobra-1.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er2",
  "nombre": "Cerradura abierta en viaje",
  "simple": "El circuito de cerraduras se abrió mientras el ascensor viajaba.",
  "causas": [
   "Cerradura de piso floja",
   "El patín roza el rodillo de la cerradura"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el circuito de cerraduras.",
   "Revisa que el patín no roce el rodillo.",
   "Nunca puentees."
  ],
  "peligro": "Riesgo de caída al pozo.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er3",
  "nombre": "Falla del variador",
  "simple": "El variador tiene una falla.",
  "causas": [
   "El variador detectó su propio problema"
  ],
  "arreglo": [
   "Lee el código en el variador.",
   "Busca la causa en la lista del variador.",
   "Resetea cuando esté resuelto."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er4",
  "nombre": "Sentido de viaje al revés",
  "simple": "La cabina se mueve al revés de lo ordenado.",
  "causas": [
   "Pulsos A y B del encoder invertidos en la placa",
   "Fases del motor invertidas"
  ],
  "arreglo": [
   "Corta la energía.",
   "Intercambia A y B en la placa principal.",
   "Si sigue, cambia el orden de fases del motor."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er5",
  "nombre": "Falla de freno (no abre o no cierra)",
  "simple": "Tras la orden de freno no llega el aviso del contactor o de los micros de freno.",
  "causas": [
   "Contacto auxiliar del contactor de freno malo",
   "Micros de brazo de freno mal regulados",
   "Cableado del aviso"
  ],
  "arreglo": [
   "Bloquea la cabina y corta la energía.",
   "Revisa contactor de freno y micros izquierdo y derecho.",
   "Revisa cables.",
   "Para borrar: en inspección, mantén subir y bajar lento 5 segundos."
  ],
  "peligro": "Si el freno no cierra, la cabina puede moverse.",
  "pieza": "micro_freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er6",
  "nombre": "Señal de piso no se abre en viaje",
  "simple": "La señal del sensor de piso no cambia durante el viaje.",
  "causas": [
   "Sensor de piso dañado o pegado",
   "Cable del sensor"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el sensor de piso y su circuito."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er7",
  "nombre": "Pocos o ningún pulso del encoder",
  "simple": "La placa recibe muy pocos pulsos del encoder durante el viaje.",
  "causas": [
   "Cable entre divisor de pulsos y placa cortado",
   "Fases A y B mal conectadas",
   "Encoder o divisor dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa la conexión del encoder a J8.",
   "Mide la tensión de las señales con multímetro.",
   "Si la tensión está bien, la falla es de la placa."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er9",
  "nombre": "Falla del contactor KDY",
  "simple": "La orden al contactor KDY no coincide con su aviso.",
  "causas": [
   "KDY pegado",
   "KDY no cierra: cable roto o bobina dañada",
   "Contacto de aviso malo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor KDY y su contacto de aviso.",
   "Cámbialo si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er10",
  "nombre": "Circuito de parada de emergencia abierto",
  "simple": "Se abrió el circuito de seguridad (parada de emergencia).",
  "causas": [
   "Un contacto de seguridad abierto",
   "Borne flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide el circuito por tramos.",
   "Repara el contacto. Nunca puentees."
  ],
  "peligro": "Puentear la seguridad puede causar un accidente.",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er11",
  "nombre": "Piso perdido",
  "simple": "Recorrió más que la distancia entre dos pisos sin ver la señal de piso.",
  "causas": [
   "Sensor de piso dañado",
   "Pantalla del sensor mal puesta"
  ],
  "arreglo": [
   "Revisa el sensor de piso y su circuito.",
   "Revisa las pantallas en el hueco."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er12",
  "nombre": "Pasó el límite de arriba",
  "simple": "El ascensor pasó el límite superior.",
  "causas": [
   "Encoder con falla",
   "Circuito del límite"
  ],
  "arreglo": [
   "Baja en inspección.",
   "Revisa el encoder y el circuito del límite."
  ],
  "peligro": "Riesgo de golpear arriba.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er13",
  "nombre": "Pasó el límite de abajo",
  "simple": "El ascensor pasó el límite inferior.",
  "causas": [
   "Encoder con falla",
   "Circuito del límite"
  ],
  "arreglo": [
   "Sube en inspección.",
   "Revisa el encoder y el circuito del límite."
  ],
  "peligro": "Riesgo de golpear el foso.",
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er14",
  "nombre": "Error del contador de pisos",
  "simple": "El conteo de pisos se perdió; el ascensor irá al piso más bajo a corregirse.",
  "causas": [
   "Ruido en el encoder o mala tierra",
   "Cables que patinan",
   "Pulsos muy rápidos (más de 25 kHz)"
  ],
  "arreglo": [
   "Revisa el encoder y la tierra del sistema.",
   "Revisa patinaje de cables.",
   "Usa el divisor de pulsos si la frecuencia es alta."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er17",
  "nombre": "El variador no responde",
  "simple": "La placa dio la orden y no recibió la señal de marcha del variador.",
  "causas": [
   "Señales de dirección o habilitación cortadas",
   "Parámetros del variador mal",
   "Variador detenido"
  ],
  "arreglo": [
   "Revisa las salidas de dirección y habilitación.",
   "Revisa parámetros de entradas y salidas del variador.",
   "Mira si el variador muestra falla."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er18",
  "nombre": "Error del número de piso",
  "simple": "El número de piso no coincide; el ascensor irá abajo a corregirse.",
  "causas": [
   "No se terminó el autoaprendizaje",
   "Se movieron los interruptores de extremo",
   "Error de pulsos del encoder"
  ],
  "arreglo": [
   "Haz el autoaprendizaje del hueco.",
   "Revisa los interruptores de extremo.",
   "Revisa el encoder."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er19",
  "nombre": "Distancia corta para frenar",
  "simple": "No hay distancia suficiente para cambiar de velocidad antes del piso.",
  "causas": [
   "Velocidad de un piso muy alta",
   "Interruptores de extremo movidos sin nuevo aprendizaje"
  ],
  "arreglo": [
   "Baja la velocidad de viaje de un piso.",
   "Haz de nuevo el autoaprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er20",
  "nombre": "Baja la velocidad al llegar arriba",
  "simple": "Al llegar al último piso la velocidad cae al cambiar de velocidad.",
  "causas": [
   "Ganancia del variador baja",
   "Resistencia de frenado no adecuada",
   "Falta autoaprendizaje"
  ],
  "arreglo": [
   "Revisa los parámetros del variador.",
   "Revisa la resistencia de frenado.",
   "Haz el autoaprendizaje."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er21",
  "nombre": "Tiempo de viaje excedido",
  "simple": "El viaje duró más que el tiempo máximo configurado.",
  "causas": [
   "Cables de tracción patinan",
   "Cabina trabada",
   "Parámetros del variador o del tiempo máximo"
  ],
  "arreglo": [
   "Revisa patinaje de cables y trabas.",
   "Revisa parámetros del variador.",
   "Revisa el valor 'Over Time'."
  ],
  "pieza": "cables_traccion",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er22",
  "nombre": "Señal de inspección en marcha rápida",
  "simple": "Llegó la señal de inspección mientras el ascensor viajaba rápido.",
  "causas": [
   "Switch de inspección dañado",
   "Cable del circuito de inspección"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el switch de inspección y su cable."
  ],
  "pieza": "caja_inspeccion",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er23",
  "nombre": "Falla una de las dos señales de piso",
  "simple": "Uno de los dos sensores de piso no da señal.",
  "causas": [
   "Sensor dañado",
   "Cable del sensor"
  ],
  "arreglo": [
   "Revisa los dos sensores de piso.",
   "Revisa sus cables."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er24",
  "nombre": "Distancia de cambio de velocidad muy corta",
  "simple": "En modo multivelocidad, la distancia para cambiar de velocidad es muy corta.",
  "causas": [
   "Parámetro de distancia mal puesto"
  ],
  "arreglo": [
   "Pon una distancia de cambio acorde a la velocidad."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er25",
  "nombre": "Protección térmica",
  "simple": "Se recalentó la resistencia de frenado o el motor.",
  "causas": [
   "Motor o resistencia muy calientes",
   "Circuito del térmico abierto (entrada X21)"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa el circuito del térmico (X21)."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er26",
  "nombre": "Contactor de cerraduras no coincide",
  "simple": "El contacto del contactor de cerraduras no coincide con su bobina.",
  "causas": [
   "Conexión externa mal",
   "Contactor dañado",
   "Entrada X23 con tensión incorrecta"
  ],
  "arreglo": [
   "Mira las luces X14 y X23: deben prender juntas.",
   "Si no, revisa el cableado externo.",
   "Si sí, revisa la entrada en el menú de monitoreo."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er27",
  "nombre": "Contactor de seguridad no coincide",
  "simple": "El contacto del contactor de parada de emergencia no coincide con su bobina.",
  "causas": [
   "Conexión externa mal",
   "Contactor dañado",
   "Entrada X22 con tensión incorrecta"
  ],
  "arreglo": [
   "Mira las luces X13 y X22: deben prender juntas.",
   "Revisa el cableado externo.",
   "Revisa el contactor."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er28",
  "nombre": "Interruptores de extremo pegados",
  "simple": "Un interruptor de extremo (arriba o abajo) está activo donde no debería.",
  "causas": [
   "Interruptor pegado",
   "Interruptor mal ubicado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa los interruptores de extremo y su ubicación."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er29",
  "nombre": "Mucha interferencia en la comunicación",
  "simple": "Hay demasiado ruido en la comunicación CAN.",
  "causas": [
   "Malla del cable CAN sin tierra",
   "Botonera de piso o de cabina dañada"
  ],
  "arreglo": [
   "Conecta la malla del cable CAN a tierra.",
   "Pon un anillo de ferrita dando 3 vueltas al cable.",
   "Revisa las botoneras dañadas."
  ],
  "pieza": "cable_viajero",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er33",
  "nombre": "Falla del contactor de cortocircuito de estrella",
  "simple": "El aviso del contactor de estrella (X29) no coincide con su orden (Y17).",
  "causas": [
   "Contactor dañado",
   "Parámetro FU-30 mal puesto"
  ],
  "arreglo": [
   "Revisa FU-30.",
   "Si está en ON, revisa que X29 coincida con Y17."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "Er39",
  "nombre": "Falla en la prueba de fuerza del freno",
  "simple": "En la autoprueba, el freno dejó girar la polea.",
  "causas": [
   "Freno con poca fuerza",
   "Zapatas gastadas o mal reguladas"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Revisa y regula el freno.",
   "Ya corregido, en inspección mantén subir y bajar lento 5 segundos para borrar."
  ],
  "peligro": "Freno débil: la cabina puede deslizarse.",
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=1",
  "nombre": "Autoaprendizaje: pulsos al revés",
  "simple": "Los pulsos del encoder llegan al revés.",
  "causas": [
   "Fases A y B del encoder invertidas"
  ],
  "arreglo": [
   "Intercambia A y B.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=2",
  "nombre": "Autoaprendizaje: extremo de abajo 1 repetido",
  "simple": "El interruptor de extremo de abajo 1 dio señal más de una vez.",
  "causas": [
   "Interruptor mal instalado o que rebota"
  ],
  "arreglo": [
   "Revisa la instalación del extremo de abajo 1.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=12",
  "nombre": "Autoaprendizaje: número de pisos mal",
  "simple": "Los pisos aprendidos no coinciden con los configurados.",
  "causas": [
   "Total de pisos mal puesto",
   "Falta una pantalla de piso o el sensor está tapado"
  ],
  "arreglo": [
   "Revisa el total de pisos.",
   "Revisa las pantallas y sensores de piso.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=14",
  "nombre": "Autoaprendizaje: sensores de piso sin traslape",
  "simple": "La pantalla no tapa los dos sensores de piso a la vez.",
  "causas": [
   "Sensores mal instalados",
   "Falta un sensor"
  ],
  "arreglo": [
   "Ajusta los sensores de piso.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=15",
  "nombre": "Autoaprendizaje cancelado",
  "simple": "Se apretó Esc y se canceló el aprendizaje.",
  "causas": [
   "Alguien presionó Esc"
  ],
  "arreglo": [
   "Vuelve a iniciar el autoaprendizaje."
  ],
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=17",
  "nombre": "Autoaprendizaje: dos sensores de piso a la vez",
  "simple": "Los dos sensores de piso dan señal juntos.",
  "causas": [
   "Cables de los sensores en paralelo",
   "Límite de abajo muy cerca de un nivel de piso"
  ],
  "arreglo": [
   "Corrige el cableado de sensores.",
   "Revisa la posición del límite de abajo."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=19",
  "nombre": "Autoaprendizaje: límite de arriba muy bajo",
  "simple": "El límite superior está demasiado abajo.",
  "causas": [
   "Límite de arriba mal ubicado"
  ],
  "arreglo": [
   "Sube el límite de arriba.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=20",
  "nombre": "Autoaprendizaje: límite de abajo muy alto",
  "simple": "El límite inferior está demasiado arriba.",
  "causas": [
   "Límite de abajo mal ubicado"
  ],
  "arreglo": [
   "Baja el límite de abajo.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "bl2000",
  "codigo": "LER=23",
  "nombre": "Autoaprendizaje: sin pulsos",
  "simple": "No llegan pulsos del encoder durante el aprendizaje.",
  "causas": [
   "Conexión de pulsos a la placa",
   "Velocidad de aproximación no puesta en el variador"
  ],
  "arreglo": [
   "Revisa la conexión de pulsos.",
   "Revisa la velocidad lenta del variador.",
   "Repite el autoaprendizaje."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/BLUELIGHT/Manual%20BL2000.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0001",
  "nombre": "Sobrecorriente al acelerar (placa chica: E01)",
  "simple": "El control dio demasiada corriente al acelerar.",
  "causas": [
   "Salida a tierra o en corto",
   "Motor sin autoajuste de parámetros",
   "Encoder con señal mala o ruido",
   "Aceleración muy brusca o mucha carga"
  ],
  "arreglo": [
   "Corta la energía y espera a que se descargue.",
   "Mide cables y motor a tierra.",
   "Revisa el encoder y su malla.",
   "Haz el autoajuste del motor (grupos F07/F10)."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0002",
  "nombre": "Sobrecorriente al frenar (E02)",
  "simple": "Demasiada corriente al desacelerar.",
  "causas": [
   "Salida en corto",
   "Freno o mecánica trabada",
   "Encoder con falla",
   "Desaceleración muy brusca"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa freno y trabas.",
   "Revisa el encoder.",
   "Revisa el coeficiente de balance."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0003",
  "nombre": "Sobrecorriente a velocidad constante (E03)",
  "simple": "Demasiada corriente viajando a velocidad pareja.",
  "causas": [
   "Salida en corto",
   "Mucha carga",
   "Encoder con ruido"
  ],
  "arreglo": [
   "Corta la energía.",
   "Mide salida y motor.",
   "Revisa encoder y malla a tierra en un solo lado."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0004",
  "nombre": "Sobretensión al acelerar (E04)",
  "simple": "La tensión interna (bus DC) subió al acelerar.",
  "causas": [
   "Tensión de red alta",
   "Resistencia de frenado no adecuada",
   "Unidad de frenado con falla"
  ],
  "arreglo": [
   "Mide la red.",
   "Revisa la resistencia de frenado.",
   "Revisa el balance de contrapeso."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0005",
  "nombre": "Sobretensión al frenar (E05)",
  "simple": "La tensión interna subió al desacelerar.",
  "causas": [
   "Frenado muy brusco",
   "Resistencia de frenado no adecuada",
   "Unidad de frenado con falla"
  ],
  "arreglo": [
   "Revisa la resistencia de frenado.",
   "Revisa la curva de desaceleración.",
   "Revisa el balance."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0006",
  "nombre": "Sobretensión a velocidad constante (E06)",
  "simple": "La tensión interna subió viajando parejo.",
  "causas": [
   "Red alta",
   "Resistencia de frenado no adecuada"
  ],
  "arreglo": [
   "Mide la red.",
   "Revisa la resistencia y la unidad de frenado."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0008",
  "nombre": "Falla del módulo de potencia (E08)",
  "simple": "El módulo de potencia detectó un problema.",
  "causas": [
   "Corto entre fases o a tierra",
   "Cable del motor muy largo",
   "Sobrecalentamiento",
   "Módulo dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el cableado del motor.",
   "Revisa ventilador y ductos.",
   "Si sigue, llama al proveedor."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0009",
  "nombre": "Disipador recalentado (E09)",
  "simple": "El control está muy caliente. Se resetea solo al bajar a 50 °C.",
  "causas": [
   "Ambiente muy caliente",
   "Mala ventilación",
   "Ventilador dañado"
  ],
  "arreglo": [
   "Mejora la ventilación del tablero.",
   "Cambia el ventilador si no gira.",
   "Espera a que enfríe."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0012",
  "nombre": "Falla de autoajuste del motor (E12)",
  "simple": "No se pudo completar el autoajuste de parámetros del motor.",
  "causas": [
   "Cables del motor mal",
   "Datos del motor mal puestos",
   "Modo de control equivocado para el autoajuste"
  ],
  "arreglo": [
   "Revisa cables del motor.",
   "Pon los datos de la placa del motor.",
   "Revisa F00.07 según el tipo de autoajuste."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0015",
  "nombre": "Falta fase de entrada (E15)",
  "simple": "Falta una fase de las tres de entrada.",
  "causas": [
   "Fase caída",
   "Borne flojo"
  ],
  "arreglo": [
   "Mide las 3 fases.",
   "Revisa F17.00 y F17.01."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0016",
  "nombre": "Falta fase de salida (E16)",
  "simple": "Falta una fase hacia el motor o está muy desbalanceada.",
  "causas": [
   "Cable del motor cortado",
   "Motor con bobina dañada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cables entre control y motor.",
   "Mide el motor."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0017",
  "nombre": "Control sobrecargado (E17)",
  "simple": "El control trabajó con demasiada carga.",
  "causas": [
   "Freno que no abre bien",
   "Mucha carga",
   "Encoder o datos del motor mal"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Reduce la carga.",
   "Revisa encoder y datos del motor."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0018",
  "nombre": "Desviación de velocidad (E18)",
  "simple": "La velocidad real se aleja mucho de la pedida.",
  "causas": [
   "Contactor de freno o de marcha con falla",
   "Pulsos del encoder mal configurados",
   "Encoder con señal mala"
  ],
  "arreglo": [
   "Revisa contactores de freno y marcha.",
   "Revisa F11.01 (pulsos del encoder).",
   "Revisa el encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0019",
  "nombre": "Motor sobrecargado (E19)",
  "simple": "El motor trabajó con demasiada carga.",
  "causas": [
   "Freno que no abre bien",
   "Factor de protección mal puesto",
   "Mucha carga"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Revisa F17.04.",
   "Reduce la carga."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0020",
  "nombre": "Motor recalentado (E20)",
  "simple": "Llegó la señal de motor caliente. Se resetea sola al enfriar.",
  "causas": [
   "Motor caliente",
   "Entrada del sensor mal",
   "Datos del motor mal"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa el sensor y su entrada.",
   "Revisa datos del motor."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0023",
  "nombre": "Parámetros mal puestos (E23)",
  "simple": "Hay un parámetro que no cuadra con el equipo.",
  "causas": [
   "Tipo de encoder mal elegido",
   "Corriente del motor en cero",
   "Velocidades de la curva mal",
   "Piso base puesto como no servido"
  ],
  "arreglo": [
   "Revisa F11.00 (tipo de tarjeta de encoder).",
   "Revisa la corriente del motor.",
   "Revisa F19.07 a F19.11 y pisos base."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0030",
  "nombre": "Encoder al revés (E30)",
  "simple": "El sentido medido no coincide con el pedido.",
  "causas": [
   "Dirección del encoder (F11.02) mal",
   "Mucha carga",
   "Freno o contactor de marcha con falla"
  ],
  "arreglo": [
   "En la puesta en marcha corrige F11.02.",
   "Revisa freno y contactor de marcha."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0031",
  "nombre": "Encoder desconectado (E31)",
  "simple": "No llega señal del encoder.",
  "causas": [
   "Cable del encoder cortado",
   "Encoder flojo",
   "Freno que no abre"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cable y fijación del encoder.",
   "Revisa el freno."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0032",
  "nombre": "Sobrevelocidad del motor (E32)",
  "simple": "El motor pasó la velocidad permitida.",
  "causas": [
   "Pulsos del encoder mal configurados",
   "Encoder con señal mala",
   "Datos del motor mal"
  ],
  "arreglo": [
   "No pongas en servicio.",
   "Revisa F11.01 y el encoder.",
   "Repite el autoajuste."
  ],
  "peligro": "Exceso de velocidad: riesgo grave.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0038",
  "nombre": "Desaceleración forzada de arriba abierta (E38)",
  "simple": "En el último piso, el interruptor de desaceleración forzada de arriba está abierto.",
  "causas": [
   "Interruptor dañado",
   "Falta autoaprendizaje",
   "Señal de nivelación mala"
  ],
  "arreglo": [
   "Revisa el interruptor de arriba.",
   "Repite el autoaprendizaje del hueco.",
   "Revisa el sensor de nivelación."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0039",
  "nombre": "Desaceleración forzada de abajo abierta (E39)",
  "simple": "En el primer piso, el interruptor de desaceleración forzada de abajo está abierto.",
  "causas": [
   "Interruptor dañado",
   "Falta autoaprendizaje",
   "Señal de nivelación mala"
  ],
  "arreglo": [
   "Revisa el interruptor de abajo.",
   "Repite el autoaprendizaje.",
   "Revisa el sensor de nivelación."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0040",
  "nombre": "Tiempo de viaje excedido (E40)",
  "simple": "La señal de nivelación no cambió en el tiempo F23.02.",
  "causas": [
   "Velocidad muy baja o piso muy alto",
   "Señal de nivelación mala",
   "Cables que patinan"
  ],
  "arreglo": [
   "Revisa el sensor de nivelación.",
   "Revisa patinaje de cables.",
   "Revisa F23.02."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0041",
  "nombre": "Cadena de seguridad abierta (E41)",
  "simple": "Se cortó el circuito de seguridad. Se resetea solo al cerrarse.",
  "causas": [
   "Contacto de seguridad abierto",
   "Falla en la alimentación del circuito",
   "Contactor de seguridad o tipo de contacto (NA/NC) mal"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide el circuito por tramos.",
   "Revisa el contactor de seguridad.",
   "Nunca puentees."
  ],
  "peligro": "Puentear la seguridad puede causar un accidente.",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0042",
  "nombre": "Cerradura abierta en viaje (E42)",
  "simple": "Se cortó la señal de cerradura mientras viajaba.",
  "causas": [
   "Contacto de cerradura de piso o cabina malo",
   "Contactor de cerraduras con falla",
   "Alimentación del circuito de puertas"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cerraduras de piso y contacto de cabina.",
   "Revisa el contactor de cerraduras.",
   "Nunca puentees."
  ],
  "peligro": "Riesgo de caída al pozo.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0043",
  "nombre": "Límite de arriba abierto en viaje (E43)",
  "simple": "El límite superior se cortó subiendo.",
  "causas": [
   "Límite dañado o muy bajo",
   "Ruido en el encoder"
  ],
  "arreglo": [
   "Baja en inspección.",
   "Revisa el límite y su ubicación.",
   "Revisa el encoder."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0044",
  "nombre": "Límite de abajo abierto en viaje (E44)",
  "simple": "El límite inferior se cortó bajando.",
  "causas": [
   "Límite dañado o muy alto",
   "Ruido en el encoder"
  ],
  "arreglo": [
   "Sube en inspección.",
   "Revisa el límite y su ubicación.",
   "Revisa el encoder."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0045",
  "nombre": "Desaceleraciones forzadas abiertas a la vez (E45)",
  "simple": "Los interruptores de desaceleración forzada de arriba y abajo están abiertos juntos.",
  "causas": [
   "Interruptores dañados",
   "Tipo de contacto mal configurado"
  ],
  "arreglo": [
   "Revisa los dos interruptores.",
   "Revisa el tipo de contacto (NA/NC)."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0046",
  "nombre": "Renivelación anormal (E46)",
  "simple": "Al renivelar, la velocidad o la posición salieron de lo permitido.",
  "causas": [
   "Encoder con falla",
   "Señal de nivelación mala"
  ],
  "arreglo": [
   "Revisa el encoder.",
   "Revisa los sensores de nivelación."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0047",
  "nombre": "Contactor de cerraduras pegado (E47)",
  "simple": "El aviso del contactor de cerraduras es anormal.",
  "causas": [
   "Contactor pegado",
   "Tipo de contacto mal configurado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor de cerraduras.",
   "Revisa su contacto de aviso."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0048",
  "nombre": "Puerta no abre (E48)",
  "simple": "La puerta no llegó a abierta varias veces seguidas (F22.09).",
  "causas": [
   "Operador de puertas con falla",
   "Límite de apertura mal"
  ],
  "arreglo": [
   "Revisa el operador de puertas.",
   "Revisa el límite de apertura.",
   "Se resetea con el botón de inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0049",
  "nombre": "Puerta no cierra (E49)",
  "simple": "La puerta no llegó a cerrada varias veces seguidas (F22.09).",
  "causas": [
   "Operador de puertas con falla",
   "Límite de cierre mal",
   "Circuito de cerraduras"
  ],
  "arreglo": [
   "Revisa el operador.",
   "Revisa límite de cierre y cerraduras.",
   "Se resetea con el botón de inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0050",
  "nombre": "Falla en autoaprendizaje del hueco (E50)",
  "simple": "El aprendizaje del hueco no cumplió las condiciones.",
  "causas": [
   "No empezó en el primer piso o subiendo",
   "Interruptores de desaceleración mal",
   "Paletas de nivelación mal instaladas"
  ],
  "arreglo": [
   "Empieza en el primer piso.",
   "Revisa interruptores de desaceleración.",
   "Revisa paletas y sensores de nivelación."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0053",
  "nombre": "Cerradura en corto (E53)",
  "simple": "Hay señal de puerta abierta y de cerradura cerrada a la vez.",
  "causas": [
   "Cerradura puenteada",
   "Contactor de cerraduras con falla",
   "Límite de apertura mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Busca y quita puentes.",
   "Revisa el contactor y el límite de apertura."
  ],
  "peligro": "Permite viajar con puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0056",
  "nombre": "Aviso del contactor de marcha anormal (E56)",
  "simple": "El contactor de marcha no coincide con su aviso.",
  "causas": [
   "Contacto de aviso mal",
   "Contactor dañado",
   "Tipo de contacto mal configurado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa contactor y su contacto de aviso.",
   "Revisa la bobina."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0057",
  "nombre": "Aviso del freno anormal (E57)",
  "simple": "El contactor de freno o el micro de freno no coinciden con la orden.",
  "causas": [
   "Contactor de freno con falla",
   "Micro de freno mal regulado"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Revisa el contactor de freno.",
   "Revisa el micro de freno."
  ],
  "pieza": "micro_freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0058",
  "nombre": "Señal de nivelación anormal (E58)",
  "simple": "La señal de nivelación o zona de puerta quedó pegada o cortada.",
  "causas": [
   "Sensor dañado",
   "Paleta mal instalada"
  ],
  "arreglo": [
   "Revisa los sensores de nivelación.",
   "Revisa la posición de las paletas."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0059",
  "nombre": "Puerta abierta y cerrada a la vez (E59)",
  "simple": "Llegan juntas las señales de puerta abierta y puerta cerrada.",
  "causas": [
   "Control de puertas con falla",
   "Tipo de contacto mal"
  ],
  "arreglo": [
   "Revisa el control de puertas.",
   "Revisa el tipo de contacto de los límites."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0060",
  "nombre": "Distancia de desaceleración forzada corta (E60)",
  "simple": "El interruptor de desaceleración forzada está muy cerca del piso.",
  "causas": [
   "Interruptor mal instalado",
   "Velocidad de desaceleración forzada mal"
  ],
  "arreglo": [
   "Reubica el interruptor de desaceleración.",
   "Revisa F03.12."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "mont71",
  "codigo": "E0062",
  "nombre": "Sobrecorriente en inspección (E62)",
  "simple": "En inspección, la corriente pasó el 110% de la nominal.",
  "causas": [
   "Mucha carga",
   "Ángulo del encoder mal aprendido",
   "Freno que no abre"
  ],
  "arreglo": [
   "Revisa la carga.",
   "Repite el autoajuste.",
   "Revisa el freno."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/HPMONT/HPMONT%20ERROR%20LIST-1.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "5",
  "nombre": "Sin pulsos del encoder",
  "simple": "La velocidad medida es 0: no llegan pulsos.",
  "causas": [
   "Falla de comunicación interna",
   "Parámetro mal"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Revisa parámetros.",
   "Si sigue, cambia la placa principal."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "6",
  "nombre": "Pulsos al revés",
  "simple": "El encoder cuenta al revés del sentido de viaje.",
  "causas": [
   "Dirección de conteo mal",
   "Cabina patina mucho"
  ],
  "arreglo": [
   "Corrige la dirección de conteo.",
   "Ajusta la compensación de carga.",
   "Repite el autoajuste."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "7",
  "nombre": "Personas atrapadas",
  "simple": "El sistema detecta que hay gente atrapada en la cabina.",
  "causas": [
   "Cerradura en corto",
   "Basura en la pisadera",
   "Operador de puertas con falla",
   "Placa de techo con falla"
  ],
  "arreglo": [
   "Rescata a las personas con el procedimiento seguro.",
   "Corta la energía.",
   "Limpia la pisadera y revisa el operador.",
   "Revisa la placa de techo y sus cables."
  ],
  "peligro": "Personas atrapadas: haz el rescate con calma y seguridad.",
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "8",
  "nombre": "Falla en prueba de fuerza del freno",
  "simple": "La prueba del freno falló: el motor giró más de 40 mm o el micro actuó mal.",
  "causas": [
   "Micro de freno mal",
   "Freno con poca fuerza",
   "Balance mal"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Revisa el micro de freno.",
   "Revisa y regula el freno.",
   "Haz la prueba manual otra vez."
  ],
  "peligro": "Freno débil: la cabina puede deslizarse.",
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "9",
  "nombre": "Protección térmica del motor",
  "simple": "Actuó la entrada de temperatura del motor.",
  "causas": [
   "Motor caliente",
   "Entrada mal conectada"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa la entrada y su lógica.",
   "Mejora la ventilación."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "11",
  "nombre": "Falla de comunicación con cabina",
  "simple": "El control no se comunica con la cabina.",
  "causas": [
   "Cable de comunicación o conector malo",
   "Falta 24 V",
   "Protocolo o velocidad mal"
  ],
  "arreglo": [
   "Revisa el cable viajero y conectores.",
   "Mide 24 V en la placa de techo.",
   "Revisa el protocolo."
  ],
  "pieza": "cable_viajero",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "30",
  "nombre": "Cadena de seguridad abierta",
  "simple": "Se cortó el circuito de seguridad.",
  "causas": [
   "Contacto de seguridad abierto",
   "Contactor de seguridad dañado",
   "Detección de alta tensión anormal"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide el circuito por tramos.",
   "Revisa el contactor de seguridad.",
   "Nunca puentees."
  ],
  "peligro": "Puentear la seguridad puede causar un accidente.",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "31",
  "nombre": "Cerradura abierta en viaje",
  "simple": "Se abrió la cerradura mientras viajaba.",
  "causas": [
   "Patín (cuchilla) de puerta mal regulado",
   "Contacto de cerradura malo",
   "Cerradura de cabina o piso floja"
  ],
  "arreglo": [
   "Corta la energía.",
   "Ajusta el patín y la cerradura.",
   "Revisa el circuito de cerraduras."
  ],
  "peligro": "Riesgo de caída al pozo.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "32",
  "nombre": "Cerradura en corto",
  "simple": "La cerradura y la señal de apertura actúan juntas, o la cerradura no se abre 5 s después de abrir.",
  "causas": [
   "Cerradura puenteada",
   "Interruptor que actúa mal",
   "Operador de puertas"
  ],
  "arreglo": [
   "Corta la energía.",
   "Quita cualquier puente.",
   "Revisa el operador de puertas."
  ],
  "peligro": "Permite viajar con puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "35",
  "nombre": "Tiempo excedido en viaje de un piso",
  "simple": "Un viaje de un piso tardó demasiado.",
  "causas": [
   "Señal de zona de puerta perdida",
   "Motor trabado o cabina bloqueada",
   "Piso muy alto"
  ],
  "arreglo": [
   "Revisa la señal de zona de puerta.",
   "Revisa la máquina.",
   "Revisa parámetros. Reset manual."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "37",
  "nombre": "Tiempo excedido en todo el viaje",
  "simple": "El viaje completo tardó demasiado.",
  "causas": [
   "Señal de zona de puerta perdida",
   "Motor trabado o cabina bloqueada"
  ],
  "arreglo": [
   "Revisa la señal de zona de puerta.",
   "Revisa la máquina y trabas.",
   "Reset manual."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "39",
  "nombre": "Posición del ascensor anormal",
  "simple": "El control no sabe bien dónde está la cabina.",
  "causas": [
   "No se hizo el autoaprendizaje",
   "Interruptores del hueco mal ubicados",
   "Dirección de pulsos mal"
  ],
  "arreglo": [
   "Haz el autoaprendizaje del hueco.",
   "Ajusta los interruptores de desaceleración forzada.",
   "Revisa la dirección de pulsos."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "40",
  "nombre": "Señal de zona de puerta anormal",
  "simple": "La cabina sigue en zona de puerta 5 segundos después de arrancar rápido.",
  "causas": [
   "Freno que no abre",
   "Sensor de zona de puerta dañado"
  ],
  "arreglo": [
   "Revisa que el freno abra.",
   "Revisa el sensor de zona de puerta. Reset manual."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "42",
  "nombre": "Desaceleraciones de arriba y abajo a la vez",
  "simple": "Los interruptores de desaceleración forzada de arriba y abajo actúan juntos.",
  "causas": [
   "Interruptor dañado o cortado",
   "Lógica de entrada mal"
  ],
  "arreglo": [
   "Revisa los dos interruptores.",
   "Revisa la configuración de entradas."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "44",
  "nombre": "Exceso de velocidad en piso extremo",
  "simple": "Al llegar al extremo, la velocidad era mayor a la permitida para ese interruptor.",
  "causas": [
   "Interruptor dañado",
   "Interruptor de desaceleración muy bajo"
  ],
  "arreglo": [
   "Revisa el interruptor.",
   "Corrige su posición."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "46",
  "nombre": "Velocidad anormal",
  "simple": "La velocidad pasó el 115% de la nominal.",
  "causas": [
   "Encoder con falla",
   "Parámetros mal"
  ],
  "arreglo": [
   "No pongas en servicio.",
   "Revisa el encoder.",
   "Revisa parámetros."
  ],
  "peligro": "Exceso de velocidad: riesgo grave.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "47",
  "nombre": "Límite de abajo actuó",
  "simple": "Actuó el límite inferior de baja velocidad.",
  "causas": [
   "Límite mal ubicado",
   "Cable del límite",
   "Lógica de entrada mal"
  ],
  "arreglo": [
   "Revisa la posición del límite.",
   "Revisa su cable y configuración."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "48",
  "nombre": "Límite de arriba actuó",
  "simple": "Actuó el límite superior de baja velocidad.",
  "causas": [
   "Límite mal ubicado",
   "Cable del límite",
   "Lógica de entrada mal"
  ],
  "arreglo": [
   "Revisa la posición del límite.",
   "Revisa su cable y configuración."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "50",
  "nombre": "Contactor de marcha no cierra a tiempo",
  "simple": "No llega el aviso de que el contactor de marcha cerró.",
  "causas": [
   "Contactor dañado",
   "Cableado",
   "Lógica mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor y su cableado.",
   "Cámbialo si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "52",
  "nombre": "Contactor de freno no cierra a tiempo",
  "simple": "No llega el aviso de que el contactor de freno cerró.",
  "causas": [
   "Contactor dañado",
   "Cableado",
   "Lógica mal"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa el contactor de freno.",
   "Cámbialo si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "54",
  "nombre": "Micro de freno no actúa a tiempo",
  "simple": "El freno no abre del todo al arrancar o el micro no avisa.",
  "causas": [
   "Freno abre lento o incompleto",
   "Micro de freno mal instalado",
   "Entrada configurada como freno doble por error"
  ],
  "arreglo": [
   "Bloquea la cabina.",
   "Regula la luz del freno.",
   "Ajusta el micro de freno.",
   "Revisa la configuración de entradas."
  ],
  "pieza": "micro_freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "60",
  "nombre": "Puerta no abre",
  "simple": "No llega la señal de puerta abierta 20 segundos después de abrir.",
  "causas": [
   "Pisadera sucia",
   "Operador sin fuerza",
   "Límite de apertura mal"
  ],
  "arreglo": [
   "Limpia la pisadera.",
   "Sube la fuerza del operador a baja velocidad.",
   "Revisa el límite de apertura."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "61",
  "nombre": "Puerta no cierra",
  "simple": "No llega la señal de puerta cerrada 10 segundos después de cerrar.",
  "causas": [
   "Pisadera sucia",
   "Operador sin fuerza",
   "Límite de cierre mal"
  ],
  "arreglo": [
   "Limpia la pisadera.",
   "Sube la fuerza del operador.",
   "Revisa el límite de cierre."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "62",
  "nombre": "Puerta abierta y cerrada a la vez",
  "simple": "Los límites de puerta abierta y cerrada actúan juntos.",
  "causas": [
   "Límite dañado",
   "Lógica mal"
  ],
  "arreglo": [
   "Revisa los límites.",
   "Revisa la configuración."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "64",
  "nombre": "Borde de seguridad o cortina activos mucho tiempo",
  "simple": "La cortina de luz o el borde de seguridad están activos demasiado tiempo.",
  "causas": [
   "Alguien o algo bloquea la puerta",
   "Cortina dañada o en corto"
  ],
  "arreglo": [
   "Mira si algo bloquea la puerta.",
   "Limpia la cortina.",
   "Revisa su cable y conexión."
  ],
  "pieza": "cortina_luminosa",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "66",
  "nombre": "Cerradura no engancha con puerta cerrada",
  "simple": "Con la puerta cerrada, la cerradura no cierra.",
  "causas": [
   "Interruptor del operador mal ubicado",
   "Cerradura dañada"
  ],
  "arreglo": [
   "Ajusta el interruptor del operador.",
   "Cambia la cerradura si está dañada."
  ],
  "pieza": "cerradura",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "80",
  "nombre": "Falla UCM (movimiento no controlado)",
  "simple": "La cabina se movió sola con la puerta abierta.",
  "causas": [
   "Sensor de zona de puerta dañado",
   "Freno que falla"
  ],
  "arreglo": [
   "Saca de servicio y bloquea la cabina.",
   "Revisa el freno.",
   "Revisa el sensor de zona de puerta."
  ],
  "peligro": "La cabina se mueve sin control: riesgo grave.",
  "pieza": "freno",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "82",
  "nombre": "Contactor pegado repetidas veces",
  "simple": "Las fallas de contactores (50 a 59) pasaron más de 5 veces.",
  "causas": [
   "Contactor o contacto auxiliar dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Cambia el contactor o su contacto auxiliar.",
   "Se resetea apagando el equipo."
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "104",
  "nombre": "Sobrecorriente al acelerar (LED: A4)",
  "simple": "Demasiada corriente al acelerar.",
  "causas": [
   "Salida en corto o a tierra",
   "Datos del motor mal",
   "Mucha carga o encoder malo",
   "Freno no abre del todo"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa datos del motor y encoder.",
   "Revisa que el freno abra.",
   "Repite el autoajuste."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "107",
  "nombre": "Sobretensión al acelerar (LED: A7)",
  "simple": "La tensión interna subió al acelerar.",
  "causas": [
   "Tensión de entrada alta",
   "Resistencia de frenado no adecuada o cortada",
   "Aceleración muy rápida"
  ],
  "arreglo": [
   "Mide la tensión.",
   "Revisa la resistencia de frenado y su cable.",
   "Revisa el balance."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "110",
  "nombre": "Baja tensión (LED: b0)",
  "simple": "La tensión de entrada bajó o se cortó.",
  "causas": [
   "Corte de luz",
   "Tensión baja",
   "Placa de control con falla"
  ],
  "arreglo": [
   "Mide la entrada.",
   "Revisa bornes de entrada.",
   "Si sigue, llama a INVT."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "111",
  "nombre": "Motor sobrecargado (LED: b1)",
  "simple": "El motor trabajó con demasiada carga.",
  "causas": [
   "Parámetros mal",
   "Freno con falla",
   "Mucha carga"
  ],
  "arreglo": [
   "Revisa parámetros.",
   "Revisa el freno.",
   "Reduce la carga."
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "113",
  "nombre": "Falta fase de entrada (LED: b3)",
  "simple": "La entrada de energía está desbalanceada o falta una fase.",
  "causas": [
   "Fase caída",
   "Placa de control con falla"
  ],
  "arreglo": [
   "Mide las 3 fases.",
   "Revisa parámetros de detección."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "114",
  "nombre": "Falta fase de salida (LED: b4)",
  "simple": "Falta una fase hacia el motor.",
  "causas": [
   "Conexión floja",
   "Motor dañado"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa cables y contactor de salida.",
   "Revisa el motor."
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "121",
  "nombre": "Encoder desconectado (LED: C1)",
  "simple": "Se perdió la señal del encoder.",
  "causas": [
   "Encoder dañado o cable roto",
   "Freno que no abre"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Revisa que el freno abra."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "122",
  "nombre": "Encoder al revés (LED: C2)",
  "simple": "Las señales del encoder están invertidas.",
  "causas": [
   "Cables del encoder al revés",
   "Patinaje fuerte"
  ],
  "arreglo": [
   "Cambia la dirección del encoder.",
   "Repite el autoajuste."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "125",
  "nombre": "Posición de polos mal detectada (LED: C5)",
  "simple": "No se detecta bien la posición del imán del motor síncrono.",
  "causas": [
   "Dirección del encoder mal",
   "Falta autoajuste"
  ],
  "arreglo": [
   "Cambia la dirección del encoder.",
   "Repite el autoajuste."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "126",
  "nombre": "Falla del circuito de frenado (LED: C6)",
  "simple": "Falla el circuito de la resistencia de frenado.",
  "causas": [
   "Circuito de frenado dañado",
   "Resistencia de frenado muy baja"
  ],
  "arreglo": [
   "Corta la energía y espera la descarga.",
   "Revisa la unidad de frenado.",
   "Revisa el valor de la resistencia."
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "ec100",
  "codigo": "132",
  "nombre": "Desviación de velocidad excesiva",
  "simple": "La velocidad real se aleja mucho de la pedida.",
  "causas": [
   "Encoder o su conexión",
   "Ganancias mal ajustadas"
  ],
  "arreglo": [
   "Revisa el encoder.",
   "Ajusta las ganancias.",
   "Repite el autoajuste."
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/INVT/EC100%20Elevator%20Intelligent%20Integrated%20Machine_V2.5.pdf"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err02",
  "nombre": "Sobrecorriente al acelerar",
  "simple": "El motor jaló demasiada corriente al arrancar.",
  "causas": [
   "Cable del motor en corto o tocando tierra",
   "Datos del motor mal puestos o autoajuste mal hecho",
   "Encoder (sensor de giro) con mala señal o pulsos mal puestos",
   "Fases del motor cambiadas o aceleración muy rápida"
  ],
  "arreglo": [
   "Corta la energía y pon candado antes de tocar.",
   "Revisa los cables del motor: forro roto, empalmes flojos o tocando tierra. Mide el aislamiento.",
   "Revisa que el contactor de salida (interruptor grande hacia el motor) cierre bien.",
   "Pon los datos de la placa del motor y repite el autoajuste.",
   "Revisa el cable y el blindaje del encoder. Si sigue, baja la aceleración."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/2126154/Inovance-Monarch-Nice300new-Series.html?page=129"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err03",
  "nombre": "Sobrecorriente al desacelerar",
  "simple": "El motor jaló demasiada corriente al bajar la velocidad.",
  "causas": [
   "Cable del motor en corto o tocando tierra",
   "Autoajuste del motor mal hecho",
   "Encoder con mala señal",
   "Frenada (desaceleración) muy brusca"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables del motor y mide el aislamiento.",
   "Repite el autoajuste con los datos de la placa.",
   "Revisa el encoder. Si sigue, haz la desaceleración más suave."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err04",
  "nombre": "Sobrecorriente a velocidad constante",
  "simple": "El motor jaló demasiada corriente viajando a velocidad normal.",
  "causas": [
   "Salida del variador en corto o tocando tierra",
   "Interferencia (ruido) en el cable del encoder",
   "Carga muy pesada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables del motor y mide el aislamiento.",
   "Revisa que el cable del encoder vaya separado de los cables de fuerza y con el blindaje a tierra.",
   "Verifica que la cabina no lleve más carga de la permitida."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err08",
  "nombre": "Mantenimiento vencido",
  "simple": "Se cumplió el plazo de mantenimiento programado y el ascensor se queda parado.",
  "causas": [
   "Pasaron los días fijados en F9-13 sin mantenimiento",
   "El equipo no se apagó para mantenimiento dentro de ese plazo"
  ],
  "arreglo": [
   "Haz el mantenimiento completo del ascensor.",
   "Apaga el equipo y vuelve a encenderlo: el contador vuelve a cero.",
   "No pongas F9-13 en 0 solo para quitar el aviso. Eso lo decide el responsable del mantenimiento."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err09",
  "nombre": "Bajo voltaje",
  "simple": "Llega poco voltaje al control o hubo un corte de luz.",
  "causas": [
   "Corte de luz de un momento",
   "Voltaje de entrada muy bajo",
   "Bornes de entrada flojos",
   "Falla en la tarjeta del variador"
  ],
  "arreglo": [
   "Mide el voltaje de las 3 fases de entrada con el multímetro.",
   "Corta la energía, pon candado y ajusta los bornes de entrada.",
   "Si el voltaje está bien y la falla sigue, llama al proveedor (puede ser la tarjeta)."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err10",
  "nombre": "Sobrecarga del variador",
  "simple": "El variador trabajó mucho tiempo con más corriente de la que aguanta.",
  "causas": [
   "Freno que no abre bien y el motor se esfuerza",
   "Carga muy pesada",
   "Encoder con mala señal",
   "Datos del motor mal puestos o cables del motor dañados"
  ],
  "arreglo": [
   "Revisa que el freno abra completo y no roce.",
   "Verifica que la cabina no esté sobrecargada.",
   "Revisa los datos del motor y repite el autoajuste.",
   "Corta la energía y revisa los cables del motor y del encoder."
  ],
  "pieza": "variador",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err11",
  "nombre": "Sobrecarga del motor",
  "simple": "El motor se esforzó demasiado tiempo.",
  "causas": [
   "Parámetro FC-02 mal puesto",
   "Mecánica dura o freno que roza",
   "Mucha carga o contrapeso mal balanceado"
  ],
  "arreglo": [
   "Deja FC-02 en su valor de fábrica.",
   "Revisa que el freno abre y que nada roza.",
   "Revisa el balance del contrapeso.",
   "Sigue también los pasos de Err10."
  ],
  "pieza": "maquina",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err12",
  "nombre": "Falta de fase en la entrada",
  "simple": "Una de las 3 fases de la luz no llega bien al control.",
  "causas": [
   "Fase caída o fusible quemado",
   "Voltajes desbalanceados entre fases",
   "Bornes de entrada flojos",
   "Tarjeta del variador dañada"
  ],
  "arreglo": [
   "Mide el voltaje entre las 3 fases (R, S, T).",
   "Corta la energía, pon candado y revisa fusibles, interruptor y bornes.",
   "Si todo está bien y la falla sigue, llama al representante de Monarch."
  ],
  "peligro": "Alto voltaje en la entrada: riesgo de choque eléctrico.",
  "pieza": "interruptor_principal",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err13",
  "nombre": "Falta de fase en la salida al motor",
  "simple": "Una de las fases no llega al motor.",
  "causas": [
   "Cable de salida flojo o cortado",
   "Contactor de salida que no cierra bien",
   "Motor dañado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y ajusta los cables U, V, W hasta el motor.",
   "Revisa los contactos del contactor de salida.",
   "Mide las bobinas del motor. Si una está abierta, el motor necesita reparación."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err14",
  "nombre": "Módulo recalentado",
  "simple": "La parte de fuerza del variador se calentó demasiado.",
  "causas": [
   "Cuarto de máquinas muy caliente",
   "Ventilador malogrado",
   "Filtro o paso de aire tapado",
   "Poco espacio libre alrededor del control"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia el polvo y destapa el paso de aire.",
   "Revisa el ventilador y cámbialo si no gira.",
   "Mejora la ventilación del cuarto de máquinas."
  ],
  "pieza": "variador",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err15",
  "nombre": "Salida anormal",
  "simple": "Hay un problema en la salida del variador o en la resistencia de frenado.",
  "causas": [
   "Corto en los cables de la resistencia de frenado o de la unidad de frenado",
   "Contactor principal que no funciona bien",
   "Salida U/V/W anormal"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa que los cables de la resistencia de frenado no estén en corto.",
   "Revisa el contactor principal.",
   "Si sigue, llama al representante de Monarch."
  ],
  "pieza": "variador",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err16",
  "nombre": "Falla del control de corriente",
  "simple": "El variador no logra controlar bien la corriente del motor.",
  "causas": [
   "Mala conexión entre el control y el motor",
   "Contactor de marcha que no cierra bien",
   "Problema en el encoder o ángulo del motor mal aprendido",
   "Carga muy pesada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables del motor y el contactor de marcha.",
   "Revisa el encoder y su cable.",
   "Repite el autoajuste del motor."
  ],
  "pieza": "variador",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err17",
  "nombre": "Señal de referencia del encoder anormal",
  "simple": "El encoder (sensor de giro) manda una señal de posición que no cuadra.",
  "causas": [
   "Cable del encoder flojo o con interferencia",
   "Tarjeta PG (tarjeta del encoder) mal conectada",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los conectores del encoder y de la tarjeta PG.",
   "Pasa el cable del encoder separado de los cables de fuerza, con el blindaje a tierra.",
   "Repite el autoajuste del motor."
  ],
  "pieza": "encoder",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err18",
  "nombre": "Falla de detección de corriente",
  "simple": "La tarjeta del variador no mide bien la corriente.",
  "causas": [
   "Falla interna de la tarjeta del variador"
  ],
  "arreglo": [
   "Apaga, espera unos minutos y vuelve a encender.",
   "Si la falla vuelve, no cambies piezas a ciegas: llama al representante de Monarch."
  ],
  "pieza": "variador",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err19",
  "nombre": "Falló el autoajuste del motor",
  "simple": "El control no pudo aprender los datos del motor.",
  "causas": [
   "Datos de placa del motor mal puestos",
   "Cables del motor flojos o contactor de salida que no cierra",
   "Encoder mal conectado o número de pulsos mal puesto"
  ],
  "arreglo": [
   "Revisa y vuelve a poner los datos de la placa del motor.",
   "Corta la energía y revisa los cables del motor y el contactor.",
   "Revisa la conexión del encoder y los pulsos por vuelta.",
   "Repite el autoajuste."
  ],
  "pieza": "maquina",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err20",
  "nombre": "Error de velocidad (retorno del encoder)",
  "simple": "La velocidad que lee el encoder no coincide con la que manda el control.",
  "causas": [
   "Señal A/B o Z del encoder perdida o cable roto",
   "Fases del motor invertidas",
   "Ángulo del motor mal aprendido",
   "Sobrevelocidad"
  ],
  "arreglo": [
   "Corta la energía, pon candado y revisa el cable y el conector del encoder.",
   "Si el motor vibra o no gira, intercambia 2 cables del motor (U, V, W) y repite el autoajuste.",
   "Revisa que el freno abra bien."
  ],
  "pieza": "encoder",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err21",
  "nombre": "Parámetro de frecuencia mal puesto",
  "simple": "La frecuencia máxima quedó más baja que la frecuencia nominal del motor.",
  "causas": [
   "F0-06 o F1-04 mal configurados"
  ],
  "arreglo": [
   "Revisa F0-06 y F1-04 con el manual y la placa del motor.",
   "Corrige el valor y prueba en inspección."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err22",
  "nombre": "Señal de nivelación anormal",
  "simple": "El sensor que marca el piso (nivelación) da una señal rara.",
  "causas": [
   "Sensor de nivelación sucio o malogrado",
   "Placa o imán de nivelación mal puesto",
   "Cable del sensor flojo o en corto"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Limpia y revisa el sensor de nivelación y el de zona de puerta.",
   "Revisa que la placa entre bien y esté derecha en el sensor.",
   "Revisa que la señal llegue a la entrada de la tarjeta principal."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err23",
  "nombre": "Corto a tierra en la salida",
  "simple": "Una salida hacia el motor está en corto o tocando tierra.",
  "causas": [
   "Cable del motor pelado o tocando tierra",
   "Cable de tierra mal conectado",
   "Contactor de corto de estator (motor de imanes) que cierra cuando no debe"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide el aislamiento del motor y de sus cables con un megómetro.",
   "Revisa la conexión de tierra.",
   "Revisa el contactor de corto de estator."
  ],
  "peligro": "Riesgo de choque eléctrico: no toques nada sin cortar la energía.",
  "pieza": "cables_motor",
  "fuente": "https://www.scribd.com/document/514645520/NICE3000new-error-code-EN"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err24",
  "nombre": "Falla del reloj interno (RTC)",
  "simple": "El reloj de la tarjeta principal falló.",
  "causas": [
   "Pila del reloj agotada",
   "Tarjeta principal dañada"
  ],
  "arreglo": [
   "Cambia la pila del reloj de la tarjeta.",
   "Si sigue, cambia la tarjeta principal, pero antes guarda los parámetros."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err25",
  "nombre": "Datos guardados dañados",
  "simple": "La memoria de la tarjeta principal tiene datos malos.",
  "causas": [
   "Falla en la memoria de la tarjeta principal"
  ],
  "arreglo": [
   "Anota el código y el subcódigo.",
   "Llama al representante de Monarch."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err26",
  "nombre": "Señal de sismo",
  "simple": "Llegó la señal de sismo por más de 2 segundos y el ascensor se detiene.",
  "causas": [
   "Hubo un sismo de verdad",
   "Tipo de contacto del sensor (NA/NC) mal configurado",
   "Cable del sensor dañado"
  ],
  "arreglo": [
   "Si hubo sismo, revisa todo el ascensor antes de ponerlo en servicio.",
   "Revisa que el tipo de contacto (NA o NC) coincida con lo configurado en la tarjeta.",
   "Revisa el cable del sensor de sismo."
  ],
  "peligro": "Después de un sismo, revisa guías, cables y contrapeso antes de llevar pasajeros.",
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err29",
  "nombre": "Contactor de corto de estator con aviso anormal",
  "simple": "El contactor que frena el motor de imanes (corto de estator) no avisa bien su estado.",
  "causas": [
   "Contacto de aviso mal configurado como NA o NC",
   "Contactor pegado o que no cierra",
   "Bobina del contactor sin voltaje"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor y su contacto auxiliar.",
   "Revisa en los parámetros el tipo de contacto (NA/NC).",
   "Cambia el contactor si está malogrado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err30",
  "nombre": "Posición del ascensor anormal",
  "simple": "El ascensor viaja pero no ve cambiar la señal de nivelación.",
  "causas": [
   "Cable de nivelación flojo, tocando tierra o en corto con otro cable",
   "Pisos muy separados y se pasa el tiempo",
   "Señal del encoder que se pierde"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa que los cables de nivelación estén bien ajustados y aislados.",
   "Revisa el sensor de nivelación.",
   "Revisa el cable del encoder."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err31",
  "nombre": "Falla del chip de memoria",
  "simple": "El chip de memoria de la tarjeta principal falló.",
  "causas": [
   "Tarjeta principal dañada"
  ],
  "arreglo": [
   "Guarda los parámetros si todavía se puede.",
   "Cambia la tarjeta principal por una del mismo modelo y versión."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err33",
  "nombre": "Velocidad anormal (exceso de velocidad)",
  "simple": "El ascensor fue más rápido de lo permitido.",
  "causas": [
   "Velocidad de inspección o de aprendizaje muy alta",
   "Autoajuste del motor mal hecho",
   "Cabina que se mueve sola (freno débil)",
   "Cable del interruptor de inspección flojo"
  ],
  "arreglo": [
   "Saca el ascensor de servicio.",
   "Revisa que el freno sujete bien.",
   "Revisa el cableado del interruptor de inspección.",
   "Baja la velocidad de inspección y repite el autoajuste."
  ],
  "peligro": "Si la cabina se mueve sola, no la uses y revisa el freno de inmediato.",
  "pieza": "freno",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err34",
  "nombre": "Falla lógica de la tarjeta",
  "simple": "La tarjeta de control encontró un error en su propia revisión interna.",
  "causas": [
   "Falla interna de la tarjeta de control"
  ],
  "arreglo": [
   "Apaga y enciende una vez.",
   "Si vuelve, llama al representante de Monarch."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err35",
  "nombre": "Datos del aprendizaje del hueco anormales",
  "simple": "El ascensor no aprendió bien la posición de los pisos.",
  "causas": [
   "Aún no se hizo el aprendizaje del hueco (subcódigo 103 al encender)",
   "El aprendizaje empezó sin estar en el piso más bajo",
   "El interruptor de desaceleración de abajo no funciona"
  ],
  "arreglo": [
   "Pon el ascensor en inspección y llévalo al piso más bajo.",
   "Revisa el interruptor de desaceleración de abajo.",
   "Repite el aprendizaje del hueco.",
   "Mientras tanto, se puede trabajar en inspección."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err36",
  "nombre": "Aviso del contactor de marcha anormal",
  "simple": "El contactor de marcha (RUN) no avisa bien si está abierto o cerrado.",
  "causas": [
   "Contactor pegado",
   "Contacto auxiliar de aviso malogrado",
   "Tipo de contacto (NA/NC) mal configurado",
   "Bobina del contactor sin voltaje"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa que el contactor abra y cierre libre.",
   "Mide el contacto auxiliar de aviso.",
   "Cambia el contactor si está pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err37",
  "nombre": "Aviso del contactor de freno anormal",
  "simple": "El contactor del freno o el micro del freno no coinciden con lo que manda el control.",
  "causas": [
   "Contactor de freno pegado o malogrado",
   "Micro (sensor) del freno desajustado",
   "Contactos de aviso que no coinciden entre sí",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor de freno.",
   "Revisa y ajusta el micro del freno.",
   "Nunca puentees el aviso del freno."
  ],
  "peligro": "El freno sostiene la cabina: no dejes el ascensor en servicio con el freno fallando.",
  "pieza": "micro_freno",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err38",
  "nombre": "Señal del encoder anormal",
  "simple": "El control no ve pulsos del encoder cuando el motor debería girar.",
  "causas": [
   "Cable del encoder suelto o roto",
   "Encoder dañado",
   "Freno que no abre y el motor no gira"
  ],
  "arreglo": [
   "Corta la energía y revisa el conector y el cable del encoder.",
   "Revisa la tarjeta PG.",
   "Verifica que el freno abra.",
   "En inspección, mira si F4-03 cambia cuando el motor gira."
  ],
  "pieza": "encoder",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err39",
  "nombre": "Motor recalentado",
  "simple": "El sensor de temperatura del motor avisa que está muy caliente.",
  "causas": [
   "Motor con mucha carga o demasiados viajes",
   "Ventilación del motor tapada",
   "Relé térmico malogrado o mal conectado"
  ],
  "arreglo": [
   "Deja enfriar el motor (la falla se borra sola cuando se enfría).",
   "Limpia y destapa la ventilación del motor.",
   "Revisa el relé térmico y su base."
  ],
  "pieza": "maquina",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err40",
  "nombre": "Tiempo de funcionamiento excedido",
  "simple": "El ascensor llegó al límite de tiempo de uso configurado y se bloquea.",
  "causas": [
   "Parámetros de tiempo mal configurados",
   "Bloqueo puesto por el fabricante o el instalador"
  ],
  "arreglo": [
   "Revisa los parámetros de tiempo.",
   "Si es un bloqueo del fabricante, llama al representante."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err41",
  "nombre": "Circuito de seguridad abierto",
  "simple": "Se abrió la cadena de seguridad y el ascensor no puede moverse.",
  "causas": [
   "Un stop de emergencia apretado (tablero, techo o foso)",
   "Un contacto de seguridad abierto (limitador, paracaídas u otro)",
   "Fases R, S, T en orden incorrecto",
   "Falla en el transformador o en la fuente de 24 V"
  ],
  "arreglo": [
   "Revisa todos los stops y contactos de seguridad uno por uno, midiendo con el multímetro.",
   "Revisa la fuente que alimenta el circuito de seguridad.",
   "Revisa que el contactor de seguridad cierre bien.",
   "Nunca puentees un contacto de seguridad."
  ],
  "peligro": "Puentear la seguridad puede causar accidentes graves.",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err42",
  "nombre": "Cerradura de puerta abierta en viaje",
  "simple": "Se cortó la señal de las cerraduras mientras el ascensor viajaba.",
  "causas": [
   "Contacto de cerradura de piso o de cabina sucio o desajustado",
   "Patín (leva) que roza y mueve la cerradura",
   "Contactor de cerradura malogrado",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y limpia los contactos de cerradura de cada piso y de la cabina.",
   "Ajusta la cerradura y el patín si rozan.",
   "Revisa el contactor de cerradura.",
   "Nunca puentees las cerraduras."
  ],
  "peligro": "Si una puerta se abre con el ascensor en movimiento, hay riesgo de caída o atrapamiento.",
  "pieza": "cerradura",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err43",
  "nombre": "Final de carrera de arriba anormal",
  "simple": "Se abrió el límite de arriba mientras el ascensor subía.",
  "causas": [
   "La cabina se pasó del último piso",
   "Final de carrera instalado muy bajo",
   "Contacto malogrado o NA/NC mal configurado"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa la posición del final de carrera de arriba.",
   "Revisa el contacto y su cable.",
   "Revisa en los parámetros el tipo de contacto (NA/NC)."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err44",
  "nombre": "Final de carrera de abajo anormal",
  "simple": "Se abrió el límite de abajo mientras el ascensor bajaba.",
  "causas": [
   "La cabina se pasó del primer piso",
   "Final de carrera instalado muy alto",
   "Contacto malogrado o NA/NC mal configurado"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa la posición del final de carrera de abajo.",
   "Revisa el contacto y su cable.",
   "Revisa en los parámetros el tipo de contacto (NA/NC)."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err45",
  "nombre": "Interruptor de desaceleración anormal",
  "simple": "El interruptor que hace frenar al llegar a los extremos está mal ubicado o falla.",
  "causas": [
   "Distancia de desaceleración muy corta",
   "Interruptor movido de su sitio",
   "Velocidad muy alta al pasar por el interruptor"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa la posición y la fijación de los interruptores de desaceleración.",
   "Repite el aprendizaje del hueco."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err46",
  "nombre": "Renivelación anormal",
  "simple": "Falló la corrección de nivel con las puertas abiertas.",
  "causas": [
   "Señal de nivelación no válida",
   "Renivelación más rápida de 0.1 m/s",
   "Contactor de corto de puertas sin aviso correcto"
  ],
  "arreglo": [
   "Revisa los sensores de nivelación.",
   "Revisa el contactor de corto de puertas y su aviso.",
   "Revisa la velocidad de renivelación en los parámetros."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err47",
  "nombre": "Contactor de corto de cerraduras anormal",
  "simple": "El contactor que puentea las cerraduras para renivelar no responde bien.",
  "causas": [
   "Contactor pegado o que no cierra",
   "Contacto de aviso malogrado",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor y su contacto de aviso.",
   "Cambia el contactor si está pegado."
  ],
  "peligro": "Este contactor anula las cerraduras: si falla, el ascensor podría moverse con la puerta abierta.",
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err48",
  "nombre": "Falla al abrir puerta",
  "simple": "La puerta no llegó a abrirse completa varias veces seguidas.",
  "causas": [
   "Operador de puertas malogrado o desajustado",
   "Sensor de puerta abierta mal ubicado",
   "Falla en la tarjeta del techo de cabina"
  ],
  "arreglo": [
   "Revisa que el operador de puertas funcione.",
   "Revisa la posición del sensor de puerta abierta.",
   "Revisa la tarjeta del techo de cabina.",
   "El número de intentos se ajusta en Fb-09."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err49",
  "nombre": "Falla al cerrar puerta",
  "simple": "La puerta no llegó a cerrarse completa varias veces seguidas.",
  "causas": [
   "Operador de puertas malogrado o desajustado",
   "Sensor de puerta cerrada mal ubicado",
   "Algo traba la puerta"
  ],
  "arreglo": [
   "Revisa que el operador de puertas funcione.",
   "Revisa la posición del sensor de puerta cerrada.",
   "Revisa que nada trabe la puerta.",
   "El número de intentos se ajusta en Fb-09."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err50",
  "nombre": "Señal de nivelación perdida varias veces",
  "simple": "La señal de nivelación falló 3 veces seguidas (pegada o perdida).",
  "causas": [
   "Sensor de nivelación o de zona de puerta malogrado",
   "Placa de nivelación mal metida o torcida",
   "Cables de tracción que patinan en la polea"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa los sensores de nivelación y de zona de puerta.",
   "Revisa que la placa entre bien y esté derecha.",
   "Revisa si los cables patinan en la polea."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err51",
  "nombre": "Falla de comunicación con el techo de cabina",
  "simple": "El control no recibe datos de la tarjeta del techo de cabina (comunicación CAN).",
  "causas": [
   "Cable de comunicación del cable viajero flojo o roto",
   "Tarjeta del techo sin alimentación",
   "Falla en los 24 V del control",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Corta la energía y revisa los conectores de comunicación.",
   "Mide la alimentación de la tarjeta del techo de cabina.",
   "Revisa los 24 V del control.",
   "Separa los cables de comunicación de los cables de fuerza."
  ],
  "pieza": "caja_techo",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err52",
  "nombre": "Falla de comunicación con las botoneras de piso",
  "simple": "El control no se comunica bien con las botoneras de los pisos.",
  "causas": [
   "Cable de comunicación flojo o roto",
   "Dos botoneras con la misma dirección",
   "Falta de 24 V",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Revisa el cable de comunicación de los pisos.",
   "Revisa que cada botonera tenga una dirección distinta.",
   "Mide los 24 V en las botoneras."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err53",
  "nombre": "Falla de cerradura de puerta",
  "simple": "La cerradura sigue marcando cerrada 3 segundos después de mandar abrir.",
  "causas": [
   "Cerradura pegada o puenteada",
   "Contacto de cerradura en corto",
   "La puerta no se abre"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Busca y quita cualquier puente en las cerraduras.",
   "Revisa los contactos de cerradura.",
   "Con subcódigo 104, apaga y enciende para borrar la falla."
  ],
  "peligro": "Un puente en las cerraduras es muy peligroso: quítalo siempre.",
  "pieza": "cerradura",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err54",
  "nombre": "Sobrecorriente al arrancar en inspección",
  "simple": "Al arrancar en inspección la corriente pasó del 120 % de la nominal.",
  "causas": [
   "Mucha carga",
   "Fases del motor U, V, W en orden incorrecto"
  ],
  "arreglo": [
   "Quita carga de la cabina.",
   "Revisa el orden de fases del motor.",
   "No desactives esta protección (FC-00) sin autorización del responsable."
  ],
  "pieza": "variador",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err55",
  "nombre": "Parada en otro piso",
  "simple": "La puerta no abrió completa y el ascensor se fue a otro piso.",
  "causas": [
   "Sensor de puerta abierta de ese piso fallando",
   "Puerta de ese piso trabada",
   "Operador de puertas débil"
  ],
  "arreglo": [
   "Revisa la puerta del piso donde falló.",
   "Revisa el sensor de puerta abierta.",
   "Revisa el operador de puertas."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err56",
  "nombre": "Señales de puerta en conflicto",
  "simple": "Los sensores de puerta abierta y cerrada marcan cosas que no pueden pasar a la vez.",
  "causas": [
   "Sensor de puerta abierta activo en viaje",
   "Sensor de puerta cerrada que se apaga en viaje",
   "Los dos sensores activos a la vez",
   "Tipo de contacto (F5-25) mal configurado"
  ],
  "arreglo": [
   "Revisa los sensores de puerta abierta y cerrada.",
   "Revisa el tipo de contacto en F5-25.",
   "Revisa el cableado del operador de puertas."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err57",
  "nombre": "Falla de comunicación interna (SPI)",
  "simple": "La tarjeta de control y la tarjeta del variador no se comunican.",
  "causas": [
   "Conector entre la tarjeta de control y la de potencia flojo",
   "Tarjeta principal no compatible con el equipo (subcódigo 103)"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y ajusta el conector entre las tarjetas.",
   "Con subcódigo 103, llama al representante de Monarch."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err58",
  "nombre": "Interruptores de posición anormales",
  "simple": "Los finales de arriba y de abajo se abrieron a la vez.",
  "causas": [
   "Tipo de contacto (NA/NC) mal configurado",
   "Interruptores malogrados"
  ],
  "arreglo": [
   "Revisa que el tipo de contacto (NA/NC) coincida con los parámetros de la tarjeta.",
   "Revisa los interruptores de desaceleración y los finales de carrera."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err62",
  "nombre": "Pesacargas desconectado",
  "simple": "Se perdió la señal del pesacargas (sensor de peso).",
  "causas": [
   "Cable de la señal analógica cortado",
   "Canal de pesaje (F5-36) mal elegido"
  ],
  "arreglo": [
   "Revisa en F5-36 qué canal de pesaje está elegido.",
   "Revisa el cable del pesacargas."
  ],
  "pieza": "pesacargas",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err65",
  "nombre": "Movimiento no deseado de la cabina (UCMP)",
  "simple": "La cabina se movió sola fuera de lo normal.",
  "causas": [
   "Freno que no sujeta bien",
   "Freno desgastado o mal regulado"
  ],
  "arreglo": [
   "Saca el ascensor de servicio y no dejes subir a nadie.",
   "Revisa que el freno cierre completo y esté bien regulado.",
   "Borra la falla solo después de reparar, como indica el manual.",
   "Llama a un técnico autorizado de la marca."
  ],
  "peligro": "Riesgo grave: la cabina puede moverse mientras entra gente.",
  "pieza": "freno",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice3000new",
  "codigo": "Err66",
  "nombre": "Falló la prueba de fuerza del freno",
  "simple": "La prueba automática del freno salió mal: el freno no sujeta lo suficiente.",
  "causas": [
   "Freno con poca fuerza o mal regulado",
   "Holgura del freno incorrecta"
  ],
  "arreglo": [
   "Saca el ascensor de servicio.",
   "Revisa y ajusta la holgura y las zapatas del freno.",
   "Repite el autoaprendizaje de fuerza de freno.",
   "Si no pasa la prueba, llama a la marca."
  ],
  "peligro": "Un freno débil puede dejar caer o subir la cabina.",
  "pieza": "freno",
  "fuente": "https://www.aflyelevators.com/nice3000-motherboard-error-codes-troubleshootings/"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err02",
  "nombre": "Sobrecorriente al acelerar",
  "simple": "El motor jaló demasiada corriente al arrancar.",
  "causas": [
   "Salida del variador en corto o tocando tierra",
   "Autoajuste del motor mal hecho",
   "Carga muy pesada o encoder con mala señal",
   "Aviso del UPS (batería de rescate) incorrecto"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el contactor RUN a la salida del control.",
   "Revisa el forro de los cables del motor y mide el aislamiento.",
   "Pon los datos de la placa y repite el autoajuste."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err05",
  "nombre": "Sobretensión al acelerar",
  "simple": "El voltaje interno del variador subió demasiado al arrancar.",
  "causas": [
   "Voltaje de entrada muy alto",
   "Resistencia o unidad de frenado con falla"
  ],
  "arreglo": [
   "Mide el voltaje de entrada.",
   "Corta la energía y revisa la resistencia de frenado y sus cables."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err06",
  "nombre": "Sobretensión al desacelerar",
  "simple": "El voltaje interno del variador subió demasiado al frenar.",
  "causas": [
   "Resistencia de frenado desconectada o malograda",
   "Desaceleración muy brusca",
   "Voltaje de entrada alto"
  ],
  "arreglo": [
   "Corta la energía y revisa la resistencia de frenado y sus cables.",
   "Mide el voltaje de entrada.",
   "Haz la desaceleración más suave."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err07",
  "nombre": "Sobretensión a velocidad constante",
  "simple": "El voltaje interno del variador subió demasiado viajando.",
  "causas": [
   "Voltaje de entrada alto",
   "Resistencia de frenado con falla",
   "Contrapeso mal balanceado"
  ],
  "arreglo": [
   "Mide el voltaje de entrada.",
   "Revisa la resistencia de frenado.",
   "Revisa el balance del contrapeso."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err09",
  "nombre": "Bajo voltaje",
  "simple": "Llega poco voltaje al control o hubo un corte de luz.",
  "causas": [
   "Corte de luz de un momento",
   "Voltaje de entrada bajo",
   "Bornes de entrada flojos"
  ],
  "arreglo": [
   "Mide el voltaje de las 3 fases.",
   "Corta la energía y ajusta los bornes de entrada."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err10",
  "nombre": "Sobrecarga del control",
  "simple": "El control trabajó mucho tiempo con demasiada corriente.",
  "causas": [
   "Freno que no abre bien",
   "Carga muy pesada",
   "Datos del motor mal puestos"
  ],
  "arreglo": [
   "Revisa que el freno abra completo.",
   "Verifica la carga y el contrapeso.",
   "Repite el autoajuste del motor."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err11",
  "nombre": "Sobrecarga del motor",
  "simple": "El motor se esforzó demasiado tiempo.",
  "causas": [
   "Mecánica dura o freno que roza",
   "Mucha carga",
   "Protección del motor mal configurada"
  ],
  "arreglo": [
   "Revisa que el freno abra y nada roce.",
   "Revisa la carga y el contrapeso.",
   "Revisa los parámetros de protección del motor."
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err12",
  "nombre": "Falta de fase en la entrada",
  "simple": "Una de las fases de la luz no llega bien.",
  "causas": [
   "Fase caída o fusible quemado",
   "Voltajes desbalanceados",
   "Bornes flojos"
  ],
  "arreglo": [
   "Mide el voltaje entre R, S y T.",
   "Corta la energía, pon candado y revisa fusibles y bornes."
  ],
  "peligro": "Alto voltaje: riesgo de choque eléctrico.",
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err13",
  "nombre": "Falta de fase a la salida",
  "simple": "Una de las fases no llega al motor.",
  "causas": [
   "Cable de salida flojo",
   "Contactor de salida malogrado",
   "Motor dañado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables U, V, W y el contactor.",
   "Mide las bobinas del motor."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err14",
  "nombre": "Módulo recalentado",
  "simple": "La parte de fuerza del control se calentó demasiado.",
  "causas": [
   "Cuarto muy caliente",
   "Ventilador malogrado",
   "Paso de aire tapado"
  ],
  "arreglo": [
   "Corta la energía y limpia el polvo.",
   "Revisa el ventilador.",
   "Ventila el cuarto de máquinas."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err20",
  "nombre": "Falla de encoder / velocidad",
  "simple": "La velocidad que lee el encoder no cuadra con la del motor.",
  "causas": [
   "Parámetros del encoder mal puestos (F1-00, F1-12)",
   "Datos de placa del motor mal puestos",
   "Cable o conector del encoder con falla",
   "Freno que no abre o máquina que se mueve sola"
  ],
  "arreglo": [
   "Revisa F1-00 y F1-12 y los datos de la placa.",
   "Corta la energía y revisa el cable y el conector del encoder.",
   "Si el motor vibra al hacer el autoajuste con carga, intercambia 2 cables del motor (U, V, W).",
   "Revisa que el freno abra."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err22",
  "nombre": "Señal de nivelación anormal",
  "simple": "El sensor que marca el piso da una señal rara.",
  "causas": [
   "Sensor de nivelación sucio o malogrado",
   "Placa de nivelación mal puesta",
   "Cable flojo"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Limpia y revisa el sensor y la placa.",
   "Revisa el cable hasta la tarjeta."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err24",
  "nombre": "Falla del reloj interno (RTC)",
  "simple": "El reloj de la tarjeta falló.",
  "causas": [
   "Pila del reloj agotada",
   "Tarjeta principal dañada"
  ],
  "arreglo": [
   "Cambia la pila del reloj.",
   "Si sigue, llama al representante."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err26",
  "nombre": "Señal de sismo",
  "simple": "Llegó la señal de sismo y el ascensor se detiene.",
  "causas": [
   "Hubo un sismo",
   "Sensor de sismo mal configurado o cable dañado"
  ],
  "arreglo": [
   "Después de un sismo, revisa todo el ascensor.",
   "Revisa el sensor y su configuración NA/NC."
  ],
  "peligro": "No pongas en servicio sin revisar guías, cables y contrapeso.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err30",
  "nombre": "Posición del ascensor anormal",
  "simple": "El ascensor viaja pero no ve cambiar la nivelación.",
  "causas": [
   "Cable de nivelación flojo o a tierra",
   "Sensor de nivelación malogrado",
   "Señal del encoder que se pierde"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa el sensor y los cables de nivelación.",
   "Revisa el cable del encoder."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err33",
  "nombre": "Velocidad anormal",
  "simple": "El ascensor fue más rápido de lo permitido.",
  "causas": [
   "Autoajuste mal hecho",
   "Freno débil",
   "Parámetros de velocidad mal puestos"
  ],
  "arreglo": [
   "Saca el ascensor de servicio.",
   "Revisa el freno.",
   "Revisa los parámetros y repite el autoajuste."
  ],
  "peligro": "Si la cabina se mueve sola, no la uses.",
  "pieza": "freno",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err35",
  "nombre": "Datos del aprendizaje del hueco anormales",
  "simple": "Falta hacer, o salió mal, el aprendizaje de los pisos.",
  "causas": [
   "No se hizo el aprendizaje del hueco",
   "Interruptores de desaceleración mal puestos"
  ],
  "arreglo": [
   "Puedes seguir trabajando en inspección: esta falla no lo impide.",
   "Haz el aprendizaje del hueco (Learn Run) desde el piso más bajo.",
   "Mientras no se haga, saldrá Err35 cada vez que se encienda."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err36",
  "nombre": "Aviso del contactor de marcha anormal",
  "simple": "El contactor RUN no avisa bien su estado.",
  "causas": [
   "Contactor pegado",
   "Contacto de aviso malogrado"
  ],
  "arreglo": [
   "Corta la energía y revisa el contactor.",
   "Cámbialo si está pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err37",
  "nombre": "Aviso del contactor de freno anormal",
  "simple": "El contactor del freno no avisa bien su estado.",
  "causas": [
   "Contacto de aviso del contactor de freno malogrado",
   "Contactor pegado"
  ],
  "arreglo": [
   "Corta la energía y revisa el contacto de aviso del contactor de freno.",
   "Cambia el contactor si falla."
  ],
  "peligro": "El freno sostiene la cabina: no lo dejes fallando.",
  "pieza": "micro_freno",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err38",
  "nombre": "Señal del encoder anormal",
  "simple": "No llegan pulsos del encoder.",
  "causas": [
   "Cable del encoder suelto",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la energía y revisa el cable y el conector del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err39",
  "nombre": "Motor recalentado",
  "simple": "El motor está muy caliente.",
  "causas": [
   "Mucha carga o muchos viajes",
   "Ventilación tapada",
   "Sensor térmico malogrado"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Limpia la ventilación.",
   "Revisa el sensor térmico."
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err41",
  "nombre": "Circuito de seguridad abierto",
  "simple": "Se abrió la cadena de seguridad.",
  "causas": [
   "Stop de emergencia apretado",
   "Contacto de seguridad abierto",
   "Falta la alimentación del circuito de seguridad"
  ],
  "arreglo": [
   "Mide uno por uno los contactos de la cadena de seguridad.",
   "Revisa las entradas de 110 V de seguridad de la tarjeta (X25 a X27).",
   "Nunca puentees un contacto de seguridad."
  ],
  "peligro": "Puentear la seguridad puede causar accidentes graves.",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err42",
  "nombre": "Cerradura abierta en viaje",
  "simple": "Se cortó la señal de cerraduras con el ascensor viajando.",
  "causas": [
   "Contacto de cerradura sucio o desajustado",
   "Patín que roza la cerradura",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia y ajusta las cerraduras de piso y de cabina.",
   "Nunca puentees las cerraduras."
  ],
  "peligro": "Riesgo de caída o atrapamiento.",
  "pieza": "cerradura",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err43",
  "nombre": "Final de carrera de arriba anormal",
  "simple": "Se abrió el límite de arriba mientras subía.",
  "causas": [
   "La cabina se pasó del último piso",
   "Final de carrera mal ubicado o malogrado"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa la posición y el contacto del final de arriba."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err44",
  "nombre": "Final de carrera de abajo anormal",
  "simple": "Se abrió el límite de abajo mientras bajaba.",
  "causas": [
   "La cabina se pasó del primer piso",
   "Final de carrera mal ubicado o malogrado"
  ],
  "arreglo": [
   "Pon el ascensor en inspección.",
   "Revisa la posición y el contacto del final de abajo."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err45",
  "nombre": "Interruptor de desaceleración anormal",
  "simple": "El interruptor que hace frenar en los extremos está mal ubicado.",
  "causas": [
   "Interruptores sin la distancia que pide el manual",
   "La posición guardada no coincide con la real"
  ],
  "arreglo": [
   "Revisa y corrige la posición de los interruptores.",
   "Repite el aprendizaje del hueco."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err46",
  "nombre": "Renivelación anormal",
  "simple": "Falló la corrección de nivel con las puertas abiertas.",
  "causas": [
   "Renivelación más rápida de 0.1 m/s",
   "Cabina fuera de la zona de puerta",
   "Contactor de corto de cerraduras sin aviso correcto"
  ],
  "arreglo": [
   "Revisa los sensores de nivelación.",
   "Revisa el contactor de corto de cerraduras."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err47",
  "nombre": "Contactor de corto de cerraduras anormal",
  "simple": "El contactor que puentea las cerraduras para renivelar no responde bien.",
  "causas": [
   "Contactor pegado",
   "Contacto de aviso malogrado"
  ],
  "arreglo": [
   "Corta la energía y revisa el contactor.",
   "Cámbialo si falla."
  ],
  "peligro": "Si falla, el ascensor podría moverse con la puerta abierta.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err48",
  "nombre": "Falla al abrir puerta",
  "simple": "La puerta no llegó a abrirse completa varias veces seguidas.",
  "causas": [
   "Operador de puertas desajustado",
   "Sensor de puerta abierta mal ubicado"
  ],
  "arreglo": [
   "Revisa el operador y los sensores de puerta.",
   "El número de intentos se ajusta en FB-09."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err49",
  "nombre": "Falla al cerrar puerta",
  "simple": "La puerta no llegó a cerrarse completa varias veces seguidas.",
  "causas": [
   "Operador de puertas desajustado",
   "Algo traba la puerta",
   "Sensor de puerta cerrada mal ubicado"
  ],
  "arreglo": [
   "Revisa el operador y que nada trabe la puerta.",
   "El número de intentos se ajusta en FB-09."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1404284/Inovance-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err50",
  "nombre": "Señal de nivelación perdida varias veces",
  "simple": "El sensor de nivelación falló varias veces seguidas.",
  "causas": [
   "Sensor malogrado",
   "Placa de nivelación torcida",
   "Cables que patinan en la polea"
  ],
  "arreglo": [
   "Revisa el sensor y la placa.",
   "Revisa si los cables patinan."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err51",
  "nombre": "Falla de comunicación CAN",
  "simple": "Falla la comunicación con la tarjeta de cabina.",
  "causas": [
   "Cable de comunicación flojo o roto",
   "Tarjeta sin alimentación"
  ],
  "arreglo": [
   "Revisa los conectores y el cable viajero.",
   "Mide la alimentación de la tarjeta de cabina."
  ],
  "pieza": "caja_techo",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err52",
  "nombre": "Falla de comunicación con botoneras de piso",
  "simple": "Falla la comunicación con las botoneras de los pisos.",
  "causas": [
   "Cable de comunicación flojo",
   "Botoneras con la misma dirección"
  ],
  "arreglo": [
   "Revisa el cable de comunicación.",
   "Revisa la dirección de cada botonera."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice1000new",
  "codigo": "Err53",
  "nombre": "Falla de cerradura de puerta",
  "simple": "La cerradura sigue marcando cerrada cuando la puerta debería abrir.",
  "causas": [
   "Cerradura puenteada o pegada",
   "Contacto en corto"
  ],
  "arreglo": [
   "Corta la energía y quita cualquier puente.",
   "Revisa los contactos de cerradura."
  ],
  "peligro": "Un puente en las cerraduras es muy peligroso.",
  "pieza": "cerradura",
  "fuente": "https://www.manualslib.com/manual/1270883/Monarch-Nice1000.html"
 },
 {
  "equipo": "nice900",
  "codigo": "Er02",
  "nombre": "Sobrecorriente al acelerar (puerta)",
  "simple": "El motor de la puerta jaló demasiada corriente al arrancar.",
  "causas": [
   "Salida al motor de puerta en corto o a tierra",
   "Autoajuste del motor mal hecho",
   "Puerta muy pesada o trabada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables del motor de puerta.",
   "Repite el autoajuste del motor.",
   "Revisa que la puerta corra libre."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er03",
  "nombre": "Sobrecorriente al desacelerar (puerta)",
  "simple": "El motor de la puerta jaló demasiada corriente al frenar.",
  "causas": [
   "Salida en corto o a tierra",
   "Autoajuste mal hecho",
   "Frenada muy corta"
  ],
  "arreglo": [
   "Corta la energía y revisa los cables.",
   "Repite el autoajuste.",
   "Haz la desaceleración más suave."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er04",
  "nombre": "Sobrecorriente a velocidad constante (puerta)",
  "simple": "El motor de la puerta jaló demasiada corriente en marcha.",
  "causas": [
   "Interferencia en el cable del encoder",
   "Salida en corto"
  ],
  "arreglo": [
   "Usa cable de encoder blindado y bien conectado.",
   "Revisa los cables del motor."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er05",
  "nombre": "Sobretensión al acelerar (puerta)",
  "simple": "Subió demasiado el voltaje interno del control de puerta al arrancar.",
  "causas": [
   "Voltaje de entrada alto",
   "Rampa de aceleración muy corta"
  ],
  "arreglo": [
   "Mide el voltaje de alimentación.",
   "Haz la aceleración más suave."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er06",
  "nombre": "Sobretensión al desacelerar (puerta)",
  "simple": "Subió demasiado el voltaje interno al frenar la puerta.",
  "causas": [
   "Voltaje de entrada alto",
   "Rampa de frenado muy corta",
   "Resistencia de frenado inadecuada"
  ],
  "arreglo": [
   "Mide el voltaje de alimentación.",
   "Haz la desaceleración más suave."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er07",
  "nombre": "Sobretensión a velocidad constante (puerta)",
  "simple": "Subió demasiado el voltaje interno con la puerta en marcha.",
  "causas": [
   "Voltaje de entrada alto",
   "Resistencia de frenado inadecuada"
  ],
  "arreglo": [
   "Mide el voltaje de alimentación.",
   "Revisa la resistencia de frenado."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er09",
  "nombre": "Bajo voltaje (puerta)",
  "simple": "Llega poco voltaje al control de puerta.",
  "causas": [
   "Cortes de luz",
   "Voltaje de entrada bajo"
  ],
  "arreglo": [
   "Mide la alimentación del operador.",
   "La falla se borra sola cuando el voltaje vuelve a lo normal."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er10",
  "nombre": "Sobrecarga del sistema (puerta)",
  "simple": "El operador de puerta trabaja forzado.",
  "causas": [
   "Riel o guía de la puerta obstruido",
   "Puerta muy pesada o trabada"
  ],
  "arreglo": [
   "Corta la energía y limpia el riel y la pisadera.",
   "Revisa que la puerta corra libre a mano."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er11",
  "nombre": "Sobrecarga del motor de puerta",
  "simple": "El motor de la puerta se esforzó demasiado.",
  "causas": [
   "Riel trabado",
   "Carga pesada",
   "Parámetro F8-14 (coeficiente de sobrecarga) muy bajo"
  ],
  "arreglo": [
   "Limpia el riel y revisa que la puerta corra libre.",
   "Revisa el valor de F8-14."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er13",
  "nombre": "Falta de fase a la salida (puerta)",
  "simple": "Una fase no llega al motor de la puerta.",
  "causas": [
   "Cable de salida flojo",
   "Motor de puerta dañado"
  ],
  "arreglo": [
   "Corta la energía y ajusta los cables del motor.",
   "Mide las bobinas del motor."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er14",
  "nombre": "Módulo recalentado (puerta)",
  "simple": "El control de puerta se calentó demasiado.",
  "causas": [
   "Ambiente muy caliente",
   "Ventilador malogrado",
   "Filtro de aire tapado"
  ],
  "arreglo": [
   "Limpia el polvo y revisa el ventilador.",
   "La falla se borra sola al enfriarse."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er16",
  "nombre": "Falla de memoria EEPROM",
  "simple": "El control de puerta no puede leer o guardar su memoria.",
  "causas": [
   "Memoria interna dañada"
  ],
  "arreglo": [
   "Llama al proveedor."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er18",
  "nombre": "Falla de detección de corriente (puerta)",
  "simple": "La tarjeta del control de puerta no mide bien la corriente.",
  "causas": [
   "Tarjeta de control con falla"
  ],
  "arreglo": [
   "Llama al representante o proveedor."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er19",
  "nombre": "Falló el autoajuste del motor de puerta",
  "simple": "El control no pudo aprender los datos del motor de la puerta.",
  "causas": [
   "Datos del motor mal puestos",
   "Se pasó el tiempo de identificación"
  ],
  "arreglo": [
   "Pon bien los datos de la placa del motor.",
   "Repite el autoajuste.",
   "Esta falla no se borra sola: hay que resetearla."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er20",
  "nombre": "Falla de encoder (puerta)",
  "simple": "El sensor de giro del motor de puerta no funciona bien.",
  "causas": [
   "Tipo de encoder mal configurado",
   "Cable del encoder flojo o mal conectado",
   "Pulsos por vuelta (PPR) mal puestos"
  ],
  "arreglo": [
   "Corta la energía y revisa el cable del encoder.",
   "Revisa el tipo de encoder y los pulsos en los parámetros.",
   "Si aparece al aprender, prueba cambiar el sentido de giro en F215."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er26",
  "nombre": "Aviso de parámetro incorrecto",
  "simple": "Hay un parámetro mal puesto. Es solo un aviso y no se guarda en el historial.",
  "causas": [
   "Parámetro fuera de rango o incompatible"
  ],
  "arreglo": [
   "Revisa los últimos parámetros que cambiaste.",
   "Corrígelos y resetea (no se borra solo)."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.scribd.com/document/421376724/19010269-SC-A01-NICE900-Door-Drive-User-Manual-20161224"
 },
 {
  "equipo": "nice900",
  "codigo": "Er27",
  "nombre": "Falló el aprendizaje del ancho de puerta",
  "simple": "El control no pudo medir el ancho de la puerta (también aparece como E27).",
  "causas": [
   "Ancho aprendido demasiado pequeño (menos de 20)",
   "Se usó el control por distancia sin hacer antes el aprendizaje",
   "Encoder mal conectado o al revés",
   "Algo trabó la puerta durante el aprendizaje"
  ],
  "arreglo": [
   "Revisa el cableado del encoder (fases A y B).",
   "Revisa que la puerta corra libre y sin obstáculos.",
   "Repite el aprendizaje del ancho de puerta.",
   "Esta falla no se borra sola: hay que resetearla."
  ],
  "peligro": "La puerta se mueve sola durante el aprendizaje: mantente lejos.",
  "pieza": "operador_puertas",
  "fuente": "https://www.aflyelevators.com/how-to-troubleshoot-nice900-door-inverter-fault-e27/"
 }
];
