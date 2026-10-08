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
  "id": "vfded",
  "familia": "delta_inovance",
  "marca": "Delta Electronics",
  "fabricante": "Delta Electronics",
  "nombre": "VFD-ED (variador para ascensor)",
  "tipo": "variador",
  "dondeVer": "En el teclado digital del variador (KPC-CC01) sale el código de la falla, por ejemplo ocA o GFF. El manual trae la explicación de cada código en el capítulo 14 (Fault Codes) y los de parada segura STO en el capítulo 16.",
  "historial": "El variador guarda las últimas fallas en los parámetros de registro de fallas (grupo 06). No pude leer la tabla exacta de números del VFD-ED: revísala en el manual antes de usarla. Para resetear, primero quita la causa.",
  "conexion": {
   "posible": true,
   "puerto": "Bornes SG1+ y SG1- del variador (RS-485 Modbus). Tiene un interruptor para la resistencia de 120 ohm de fin de línea (de fábrica viene puesta). Para la laptop Delta vende el convertidor USB/RS-485 IFD6530 (sección 6-8 del manual).",
   "protocolo": "Modbus por RS-485 (el manual tiene el Apéndice B 'Modbus Protocol').",
   "ajustes": "Grupo 9 de parámetros: 09-00 dirección, 09-01 velocidad (baudios), 09-04 formato (ASCII o RTU, paridad y bits de parada). En otros Delta (VFD-EL-C) la dirección va de 1 a 254 y la velocidad de 4,8 a 19,2 kbps. No pude leer los valores de fábrica del VFD-ED: míralos en la pantalla del variador antes de conectar.",
   "registroFalla": "NO confirmado para el VFD-ED. En otros variadores Delta (VFD-EL) el registro 2100H es de solo lectura y da el código de la falla. Confírmalo en el Apéndice B del manual VFD-ED antes de usarlo.",
   "software": "VFDSoft (programa gratis de Delta para PC; hay manual en inglés). También sirve cualquier programa maestro Modbus.",
   "notas": "Solo lee, no escribas parámetros con el ascensor en servicio. Si el puerto lo usa el tablero de control, no lo desconectes con el ascensor funcionando.",
   "fuente": "https://vfds.com/content/manuals/delta/delta-vfd-ed-manual.pdf"
  },
  "fuentes": [
   "https://vfds.com/content/manuals/delta/delta-vfd-ed-manual.pdf",
   "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=318",
   "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=352",
   "https://deltronics.ru/images/manual/VFDSoft_manual_en.pdf",
   "https://www.manualslib.com/manual/3161831/Delta-Vfd-El-C-Series.html"
  ],
  "verificado": false
 },
 {
  "id": "vfdvl",
  "familia": "delta_inovance",
  "marca": "Delta Electronics",
  "fabricante": "Delta Electronics",
  "nombre": "VFD-VL (variador para ascensor, modelo anterior)",
  "tipo": "variador",
  "dondeVer": "En el teclado digital del variador. El capítulo 6 del manual (Fault Code Information, pág. 178) explica los códigos.",
  "historial": "Guarda las 6 últimas fallas; se leen en el teclado o por comunicación. Después de quitar la falla espera 5 segundos antes de resetear (tecla o borne de entrada).",
  "conexion": {
   "posible": true,
   "puerto": "Puerto de comunicación RS-485 del variador (no pude leer los bornes exactos del VFD-VL).",
   "protocolo": "Modbus (las 6 últimas fallas se pueden leer por comunicación).",
   "ajustes": "No encontrado en las fuentes que pude abrir.",
   "registroFalla": "No encontrado.",
   "software": "VFDSoft de Delta (no confirmé que soporte el VFD-VL).",
   "notas": "Antes de tocar: espera 5 minutos (equipos de hasta 22 kW) o 10 minutos (30 kW o más) y mide que no haya tensión entre DC+ y DC-.",
   "fuente": "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html?page=198"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html?page=198",
   "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html"
  ],
  "verificado": false
 },
 {
  "id": "delta_comun",
  "familia": "delta_inovance",
  "marca": "Delta Electronics",
  "fabricante": "Delta Electronics",
  "nombre": "Delta: códigos comunes de la familia (leídos en manuales C2000 Plus, ME300 y VFD-EL-W)",
  "tipo": "variador",
  "dondeVer": "En la pantalla del variador Delta. El VFD-ED y el VFD-VL usan el mismo estilo de códigos (ocA, ocd, GFF...), pero estos textos salen de manuales de OTROS variadores Delta: compáralos con el manual de tu modelo.",
  "historial": "Ver la ficha del modelo (VFD-ED o VFD-VL).",
  "conexion": {
   "posible": false,
   "software": "VFDSoft de Delta",
   "notas": "Ficha de apoyo: para conectar la laptop mira la ficha del VFD-ED.",
   "fuente": "https://www.manualslib.com/manual/2005494/Delta-Me300-Series.html?page=347"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/2005494/Delta-Me300-Series.html?page=347",
   "https://www.manualslib.com/manual/2923922/Delta-C2000-Plus-Series.html?page=904",
   "https://www.manualslib.com/manual/2008941/Delta-Vfd-El-W-Series.html?page=165"
  ],
  "verificado": false
 },
 {
  "id": "md500",
  "familia": "delta_inovance",
  "marca": "Inovance",
  "fabricante": "Inovance",
  "nombre": "MD500 (variador de uso general, también se usa en ascensores)",
  "tipo": "variador",
  "dondeVer": "En el panel del variador sale 'Err' con un número, por ejemplo Err02. Con una falla (Err) el variador corta la salida al instante y parpadea la luz TUNE/TC. Hay que resetearla a mano.",
  "historial": "La falla actual se ve en U0-62. Los tipos de falla se guardan en F9-14 y siguientes (el significado de cada número está en el Apéndice C del manual). Para resetear: tecla STOP/RES (con F7-02 = 1, que es lo de fábrica) o una entrada digital con función 9 'reset de falla' (F4-00 a F4-09). También se borra cortando y volviendo a dar energía.",
  "conexion": {
   "posible": true,
   "puerto": "Comunicación RS-485 Modbus del variador (en algunos modelos va en tarjeta de comunicación). No pude confirmar los nombres de los bornes en el manual.",
   "protocolo": "Modbus RTU (hasta 115200 bps según el manual). También hay tarjetas Modbus-TCP, Profinet y EtherCAT.",
   "ajustes": "Grupo FD: FD-00 velocidad, FD-01 formato de datos, FD-02 dirección del esclavo (1 a 247 en el MD200 hermano; 0 = difusión). El manual de la tarjeta MD500-EN1 pide FD-00 = 9 (115200 bps) y FD-01 = 3 (8-N-1, sin paridad). No pude confirmar los valores de fábrica: léelos en el panel antes de conectar. La laptop debe tener la misma velocidad y formato que el variador.",
   "registroFalla": "Dirección 8000H = código de la falla actual (lectura con función 03). El número que llega es el mismo del Err (ej. 2 = sobrecorriente, 5 = sobretensión). Regla de direcciones: grupo en el byte alto y número del parámetro en hexadecimal en el byte bajo; por ejemplo F9-14 = F90EH, FD-00 = FD00H y U0-62 = 703EH (así aparecen en la librería abierta python-inovance para el MD520).",
   "software": "InoDriverShop (programa de Inovance para Windows: diagnóstico y monitoreo). Bájalo solo de la web oficial de Inovance (Support / Download, buscar 'InoDriverShop'). Confirma que soporte tu modelo.",
   "notas": "Solo lee: no escribas parámetros con el ascensor en servicio. Si el puerto lo usa el tablero de control del ascensor, no lo desconectes con el equipo funcionando.",
   "fuente": "https://www.manualslib.com/manual/1590962/Inovance-Md500.html?page=143"
  },
  "fuentes": [
   "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/",
   "https://www.otomasyonavm.com/en/invance-md-fault-index",
   "https://www.manualslib.com/manual/1590962/Inovance-Md500.html?page=77",
   "https://www.manualslib.com/manual/1590962/Inovance-Md500.html?page=143",
   "https://www.manualslib.com/manual/3297678/Inovance-Md500-En1.html",
   "https://www.manualslib.com/manual/3297674/Inovance-Md500-Em1.html"
  ],
  "verificado": false
 },
 {
  "id": "adl300",
  "familia": "delta_inovance",
  "marca": "Gefran",
  "fabricante": "Gefran (hoy WEG)",
  "nombre": "ADL300 (variador para ascensor)",
  "tipo": "variador",
  "dondeVer": "En el teclado sale el NOMBRE de la alarma (por ejemplo Overvoltage). El número de código solo se ve por la línea serie (con la PC). Las alarmas propias del ascensor se ven en el menú 5.9 'Lift Alarms'.",
  "historial": "No pude leer dónde guarda el historial de alarmas. La tecla RST resetea las alarmas solo si ya se quitó la causa (capítulo 8.3.11 del manual de arranque rápido).",
  "conexion": {
   "posible": true,
   "puerto": "XS2: interfaz serie RS232 para conectar la PC. XS1: interfaz serie opcional para el teclado.",
   "protocolo": "Modbus RTU por el puerto RS232. En la versión -C también CANopen (301 y 417); también DCP3 y DCP4.",
   "ajustes": "No encontrado: dirección, baudios y paridad están en el capítulo Communication/RS232 del manual de funciones (págs. 94-97), que no pude abrir.",
   "registroFalla": "No encontrado. El parámetro 2172 'SpdFbkLoss code' guarda la causa de la alarma de encoder (viene en hexadecimal; pásalo a binario y compáralo con la tabla del encoder).",
   "software": "WEG_eXpress (antes GF_eXpress de Gefran). Algunas funciones solo se ajustan desde el teclado.",
   "notas": "Solo lee, no cambies parámetros con el ascensor en servicio.",
   "fuente": "https://static.weg.net/medias/downloadcenter/h74/h2c/WEG-ADL300-Functions-descriptions-parameters-asynchronous-1S9FEN-en.pdf"
  },
  "fuentes": [
   "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf",
   "https://static.weg.net/medias/downloadcenter/h74/h2c/WEG-ADL300-Functions-descriptions-parameters-asynchronous-1S9FEN-en.pdf",
   "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html",
   "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html?page=44"
  ],
  "verificado": false
 },
 {
  "id": "wittur_midi",
  "familia": "europeos",
  "marca": "Wittur",
  "fabricante": "Wittur (Selcom)",
  "nombre": "Operador de puertas MIDI / SUPRA",
  "tipo": "puertas",
  "dondeVer": "Mira la tarjeta del operador de puertas, sobre el techo de la cabina. El LED STATE apagado quiere decir que todo está bien. Si el LED parpadea, hay una falla: cuenta los parpadeos. Si el LED WDOG está prendido, el cerebro de la tarjeta se colgó. Para ver el código de letras (EE, OC, SS...) necesitas la herramienta WPT de Wittur, en su Lista de errores.",
  "historial": "La herramienta WPT tiene una Lista de errores (Error List) con las fallas guardadas. La tecla F5 borra esa lista: anota los códigos antes de borrar.",
  "conexion": {
   "posible": false,
   "puerto": "Puerto RS485 de la tarjeta, hecho para la herramienta WPT de Wittur (la tarjeta V2 también trae una ranura para tarjeta SD, que sirve para actualizar)",
   "protocolo": "Propio de Wittur, no es público",
   "ajustes": "No publicados",
   "registroFalla": "Lista de errores (Error List) dentro de WPT",
   "software": "WPT (Wittur Programming Tool), herramienta propia de Wittur",
   "notas": "Las fallas se leen con WPT, la herramienta propia de Wittur. No encontré un protocolo abierto ni registros (direcciones de memoria) para leerlas con una laptop común. Sin WPT, guíate por los parpadeos del LED STATE.",
   "fuente": "https://www.donati.it/sites/default/files/commerce_product/product/attachment/JX16514%20%EF%BC%88EN%29.pdf"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/1914528/Wittur-Midi.html",
   "https://www.manualslib.com/manual/1914528/Wittur-Midi.html?page=20",
   "https://www.donati.it/sites/default/files/commerce_product/product/attachment/JX16514%20%EF%BC%88EN%29.pdf"
  ],
  "verificado": false
 },
 {
  "id": "sematic_sds",
  "familia": "europeos",
  "marca": "Sematic",
  "fabricante": "Sematic (Wittur)",
  "nombre": "Controlador de puertas Sematic SDS (DC-PWM / Rel. 3)",
  "tipo": "puertas",
  "dondeVer": "Cuando hay una falla, la pantalla del controlador de puertas (sobre la cabina) muestra un número de alarma. También puedes verla con el handset (teclado con pantalla, se conecta por RJ45), en el menú de mantenimiento. Ojo: los números 01 al 10 también son números de parámetros (ajustes). No confundas un ajuste con una alarma.",
  "historial": "Mira en el handset: Menú de mantenimiento > Diagnóstico y gestión de alarmas.",
  "conexion": {
   "posible": false,
   "puerto": "Conector RJ45 para el handset Sematic (teclado opcional con pantalla de 8 dígitos)",
   "protocolo": "Propio de Sematic/Wittur, no es público",
   "ajustes": "No publicados",
   "registroFalla": "Menú de mantenimiento del handset (diagnóstico y gestión de alarmas)",
   "software": "Handset Sematic. Es un aparato aparte, no un programa de PC.",
   "notas": "El handset es la herramienta propia de la marca. Según el manual, en el techo de la cabina solo se puede usar con el ascensor en modo inspección, y es mejor conectarlo dentro de la cabina. No encontré forma pública de leer las alarmas con una laptop.",
   "fuente": "https://www.manualslib.com/manual/2137085/Sematic-Sds.html"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24",
   "https://www.manualslib.com/manual/2285840/Wittur-Sematic-Sds-Rel-3.html",
   "https://www.manualslib.com/manual/2137085/Sematic-Sds.html",
   "https://www.wittur.com/adm/media/pdm/PM.2.004921.EN.01.pdf"
  ],
  "verificado": false
 },
 {
  "id": "kone_lce",
  "familia": "kone",
  "marca": "KONE",
  "fabricante": "KONE",
  "nombre": "Control KONE LCE (tarjeta LCECPU) - MonoSpace, MiniSpace, EcoSpace, TranSys, ProSpace",
  "tipo": "control",
  "dondeVer": "En el tablero de control, en la tarjeta LCECPU (interfaz LCEUI: pantallita de 7 segmentos con botones). La falla actual sale en la pantalla. El historial está en el menú E-1: F1 es la falla más nueva. Con una falla en pantalla aprieta Select/Enter para ver el subcódigo de 4 cifras. Las fallas del variador salen como 01xx o 0026.",
  "historial": "Guarda hasta 99 fallas en memoria (NVRAM). La más nueva es F1; cuando se llena, se borra la más antigua. Se borra en el menú E-2 (en algunas versiones F-2). Anota todo antes de borrar. Ojo: el menú 1-99 NO es para ver fallas, sirve para resetear la memoria y borra parámetros.",
  "conexion": {
   "posible": false,
   "puerto": "Interfaz LCEUI en la tarjeta LCECPU. En un foro mencionan un puerto serie RS232 (no confirmado por KONE).",
   "protocolo": "Propietario de KONE (no publicado).",
   "ajustes": "No encontramos baudios ni formato oficiales. Ningún documento de KONE los publica.",
   "registroFalla": "Menú E-1 = historial de fallas (F1 = la más reciente). Select/Enter = subcódigo de 4 cifras. No hay un registro o dirección Modbus publicado.",
   "software": "Herramienta oficial KONE (Service Tool / herramienta LCEUIO para desbloquear menús, solo software LCE 6.7.18 o más nuevo). En un foro dicen que con cable null-modem y PuTTY/HyperTerminal, enviando Ctrl+E y luego Ctrl+C, se abre una consola; no está verificado.",
   "notas": "Es protocolo cerrado de KONE. Lo seguro es leer la falla en la pantalla LCEUI y escribirla en la app. La conexión por serie que cuenta el foro no tiene baudios ni comandos confirmados. Por eso no la damos como lectura automática.",
   "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5634&type=thread | https://test.hissmekano.com/product/7903 | https://www.elevatorshop.de/en/service-tool-for-lce-controller-with-software-5760233.html"
  },
  "fuentes": [
   "https://novuselevator.com/kone-elevator-fault-codes/",
   "https://bdfujilift.com/elevator-fault-code-table-kone/",
   "https://www.kone.com.au/Images/OM-Fault%20250%20251%20Recovery%20Instructions_tcm46-118266.pdf",
   "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html",
   "https://www.dgdqw.com/wk/3883-1.html",
   "https://pdfcoffee.com/lce-fault-codesrev-ypdf-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "kone_v3f",
  "familia": "kone",
  "marca": "KONE",
  "fabricante": "KONE",
  "nombre": "Variador KONE V3F16L / V3F16R / V3F25 (fallas que muestra la LCE)",
  "tipo": "variador",
  "dondeVer": "El V3F16L no tiene pantalla propia. Sus fallas salen en la pantalla de la tarjeta LCECPU como 0026 o 0101 a 0125. Mira la luz V3F OK (también llamada V3FCK): si está apagada, el variador tiene falla o no habla con la LCE. Con la falla en pantalla aprieta Select para ver el subcódigo de 4 cifras.",
  "historial": "Las fallas quedan en el historial de la LCE (menú E-1, hasta 99, F1 la más nueva).",
  "conexion": {
   "posible": false,
   "puerto": "Ninguno publicado; se lee a través de la tarjeta LCECPU.",
   "protocolo": "Propietario de KONE.",
   "ajustes": "No publicados.",
   "registroFalla": "Código principal en la LCE (01xx) + subcódigo de 4 cifras con el botón Select.",
   "software": "Herramientas de servicio de KONE.",
   "notas": "No encontramos registros ni protocolo abiertos para este variador. La lista oficial de KONE se llama '804611 V3F16L/V3F16R Drive Fault Codes' y no está pública.",
   "fuente": "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=48"
  },
  "fuentes": [
   "http://www.gkbpq.com/m/View_Skill.asp?ID=229",
   "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=37",
   "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=46",
   "https://novuselevator.com/kone-elevator-fault-codes/",
   "https://bdfujilift.com/elevator-fault-code-table-kone/"
  ],
  "verificado": false
 },
 {
  "id": "kone_kdl",
  "familia": "kone",
  "marca": "KONE",
  "fabricante": "KONE",
  "nombre": "Variador KONE KDL16 / KDL32 / KDM (subcódigos de 4 cifras)",
  "tipo": "variador",
  "dondeVer": "La tarjeta LCE muestra el código principal (por ejemplo 0102, 0104, 0105, 0108). Con ese código en pantalla aprieta Select/Enter y verás el subcódigo de 4 cifras (por ejemplo 2001). Los subcódigos 1000 bloquean el ascensor, los 2000 lo paran con el freno, los 3000 son avisos antes de que algo se malogre y los 6000 solo informan (no son falla).",
  "historial": "El código principal queda en el historial de la LCE (menú E-1). Anota siempre código principal + subcódigo + datos 1 y 2.",
  "conexion": {
   "posible": false,
   "puerto": "No publicado; se lee por la tarjeta LCE.",
   "protocolo": "Propietario de KONE.",
   "ajustes": "No publicados.",
   "registroFalla": "Código principal (LCE) + subcódigo de 4 cifras (botón Select). Parámetros del variador en el menú 6 (ej. 6_60 datos del motor, 6_31 contador de fallas de velocidad).",
   "software": "Herramientas de servicio de KONE.",
   "notas": "Lista oficial: KDL32 = documento 948570D02; KDL16 = documento 972485D01. No son públicas. No hay protocolo abierto para leer con laptop.",
   "fuente": "https://file.globalso.com/file_manage/1579/20240913/monospacecommissioningwith-kdl32drive.pdf"
  },
  "fuentes": [
   "http://www.gkbpq.com/m/View_News.asp?ID=273",
   "http://www.gkbpq.com/View_News.asp?ID=272",
   "https://file.globalso.com/file_manage/1579/20240913/monospacecommissioningwith-kdl32drive.pdf",
   "https://pdfcoffee.com/kone-kdl16-kdl32-ingles-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "kone_kce",
  "familia": "kone",
  "marca": "KONE",
  "fabricante": "KONE",
  "nombre": "Control KONE KCE (tarjeta KCECPU)",
  "tipo": "control",
  "dondeVer": "En la tarjeta KCECPU del tablero. Para ver todo se usa una herramienta de KONE (conector X1, KCE Maintenance Tool por Ethernet, app móvil de KONE o mini consola). Según un foro, sin herramienta igual se pueden leer los códigos de falla y cambiar varios parámetros. No encontramos la lista de códigos KCE.",
  "historial": "No encontramos datos públicos de cómo guarda el historial.",
  "conexion": {
   "posible": false,
   "puerto": "X1 = 'KONE Service Tool interface'. Ethernet para la KCE Maintenance Tool (PCUI).",
   "protocolo": "Propietario. Según un foro, pide un 'saludo' (handshake) de una llave electrónica (dongle) de KONE; no funciona con programas de terminal.",
   "ajustes": "No publicados.",
   "registroFalla": "No publicado.",
   "software": "KCE Maintenance Tool (PCUI), app móvil de KONE o mini consola de KONE.",
   "notas": "Protocolo cerrado con llave electrónica. No se puede leer con una laptop común.",
   "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5634&type=thread | https://pdfcoffee.com/kone-kce-5-pdf-free.html"
  },
  "fuentes": [
   "https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5634&type=thread",
   "https://pdfcoffee.com/kone-kce-5-pdf-free.html"
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
 },
 {
  "id": "gecb",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Otis GECB / GECB-LV (Gen2, GeN2 Comfort/Switch, Xizi-Otis)",
  "tipo": "control",
  "dondeVer": "En la pantalla del Service Tool de Otis (Gen2: se conecta en la SPB después de activar CHCS y DDO). Lista de eventos en el menú M-1-2-1 (tecla corta S6). Cuando una falla bloquea el ascensor, también sale como mensaje que parpadea en la pantalla de estado.",
  "historial": "Guarda una lista de eventos con contador de viajes y minutos. Se ve en M-1-2-1 (GOON/GOBACK para pasar). Se borra en M-1-2-7 (1+ENTER, luego 2+ENTER para confirmar). Cada evento tiene clase: I = información, W = advertencia, F = falla.",
  "conexion": {
   "posible": false,
   "puerto": "Conector del Service Tool en la SPB/SPBC (en Gen2 MRL se conecta ahí). Cable y conector propios de Otis.",
   "protocolo": "Propietario de Otis, no publicado.",
   "ajustes": "No publicados.",
   "registroFalla": "No hay un registro Modbus público. La falla actual y el historial solo se leen con el Service Tool: M-1-2-1 (eventos), M-1-2-7 (borrar eventos).",
   "software": "Otis Service Tool de mano (TT / SVT, por ejemplo GAA21750AK3 'azul'). No hay programa oficial de Otis para laptop.",
   "notas": "Algunos menús piden clave de Otis. Las herramientas 'ilimitadas' que venden terceros no son oficiales. La app solo puede ayudar si el técnico escribe el código que ve en el Service Tool.",
   "fuente": "https://pdfcoffee.com/manual-ajuste-gen2-r2-acd2-mrl-pdf-free.html"
  },
  "fuentes": [
   "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html",
   "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html",
   "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html",
   "https://pdfcoffee.com/ref-gaa30780ean-service-tool-reference-2015-05-28-pdf-free.html",
   "https://pdfcoffee.com/mcs-lcb-ii-tcb-hcb-tcbc-gcs-gecb-service-tool-manual-4-pdf-free.html",
   "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
  ],
  "verificado": false
 },
 {
  "id": "lcb2",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Otis MCS 120 / MCS 220 (tarjetas LCB II, TCB, TCBC)",
  "tipo": "control",
  "dondeVer": "En el Service Tool conectado al LCB II. Eventos en M-1-2-1 (tecla corta S6). Si la falla bloquea el ascensor, sale un mensaje que parpadea en la pantalla de estado (ej. TCI-LOCK, LS-FAULT, DoorBridge).",
  "historial": "Muestra cada evento con su texto, cuántas veces pasó, minutos desde la última vez y piso donde pasó. Shift+ON borra un evento, Shift+UP borra todos. En LCB II los eventos se borran al apagar, salvo que EN-EVT=1 (guarda hasta 10 en E2PROM).",
  "conexion": {
   "posible": false,
   "puerto": "Service Tool conectado al LCB II por una línea serial RS-422.",
   "protocolo": "Serial RS-422 con protocolo propietario de Otis (no publicado).",
   "ajustes": "No publicados.",
   "registroFalla": "No hay registro público. Eventos en M-1-2-1 del Service Tool.",
   "software": "Otis Service Tool de mano (MCS Service Tool / TT). No hay programa oficial para laptop.",
   "notas": "Los números de evento cambian entre LCB II, TCBC y GECB y entre versiones de software. Confirma siempre con la lista de tu versión.",
   "fuente": "https://www.escalatorparts.cn/UploadFiles/ConFiles/file/20210608/20210608170557445744.pdf"
  },
  "fuentes": [
   "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html",
   "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html",
   "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html",
   "https://www.escalatorparts.cn/UploadFiles/ConFiles/file/20210608/20210608170557445744.pdf"
  ],
  "verificado": false
 },
 {
  "id": "lmcss",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Otis LMCSS / MCSS (MCS 311/411, E311/E411, OTIS 300VF, Otis 3200)",
  "tipo": "control",
  "dondeVer": "En el Service Tool conectado a la tarjeta MCB (LMCSS). Historial de fallas del MCSS en M-2-2-2; fallas del OCSS en M-1-2-2-1. Desde la MCB se entra al variador (DBSS) con M-4 y al operador de puertas (DCSS) con M-3-1-1.",
  "historial": "Los eventos se guardan en la EEPROM cada vez que el LMCSS detecta un error. Una falla del MCSS pone al OCSS en modo NAV (fuera de servicio).",
  "conexion": {
   "posible": false,
   "puerto": "Conector del Service Tool en la tarjeta MCB.",
   "protocolo": "Propietario de Otis, no publicado.",
   "ajustes": "No publicados.",
   "registroFalla": "No hay registro público. Historial MCSS en M-2-2-2 del Service Tool.",
   "software": "Otis Service Tool de mano. No hay programa oficial para laptop.",
   "notas": "Si al entrar con M-4 o M-3-1-1 aparece el menú del DBSS o DCSS, la comunicación funciona (la falla puede ser intermitente).",
   "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html",
   "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/",
   "https://www.elevatorvip.com/tag/elevator-failure-code/",
   "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "ovf20",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Variador Otis OVF20 / OVF20CR con tarjeta MCB II",
  "tipo": "variador",
  "dondeVer": "En el Service Tool conectado a la MCB II. Lista de eventos en M-2-2-1. Un asterisco que parpadea antes de la 'R' indica que el evento sigue activo. Shift+3 muestra más detalle.",
  "historial": "Guarda grupo, nombre, cuántas veces pasó, en qué viaje y la clase del evento. Se borra en M-2-2-2 con Shift+5.",
  "conexion": {
   "posible": false,
   "puerto": "Service Tool conectado a la tarjeta MCB II del variador.",
   "protocolo": "Propietario de Otis, no publicado.",
   "ajustes": "No publicados.",
   "registroFalla": "No hay registro público. Eventos en M-2-2-1 del Service Tool.",
   "software": "Otis Service Tool de mano. No hay programa oficial para laptop.",
   "notas": "El manual que se encontró es de 1997 (OTIS GmbH Berlín). La numeración puede cambiar en versiones más nuevas (OVF20CR).",
   "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
  },
  "fuentes": [
   "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
  ],
  "verificado": false
 },
 {
  "id": "regen",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Variador Otis Gen2 ReGen / Ultra Drive (DBSS, GDCB)",
  "tipo": "variador",
  "dondeVer": "En el Service Tool, dentro del menú del variador (MCB o GDCB). En el control, la falla del variador aparece como evento del control (ej. 0218 en GECB o 2703 en LMCSS) y el detalle está en el registro del variador.",
  "historial": "El variador guarda su propio registro de fallas. Algunas fallas ponen la marca SAS (parar y apagar): el variador no intenta otro viaje hasta que la falla se quite.",
  "conexion": {
   "posible": false,
   "puerto": "Service Tool conectado en la SPB (ej. conector P16 en Gen2) y entrar al menú del variador (MCB o GDCB).",
   "protocolo": "Propietario de Otis, no publicado.",
   "ajustes": "No publicados.",
   "registroFalla": "No hay registro público. Se lee en el menú del variador del Service Tool.",
   "software": "Otis Service Tool de mano. No hay programa oficial para laptop.",
   "notas": "Algunos ajustes solo se ven con 'Engineer Passwrd' (clave de ingeniería de Otis).",
   "fuente": "https://pdfcoffee.com/manual-ajuste-gen2-r2-acd2-mrl-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/svt-greske--pdf-free.html",
   "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html",
   "https://pdfcoffee.com/download/xizi-otis-rus-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "dcss5",
  "familia": "otis",
  "marca": "Otis",
  "fabricante": "Otis",
  "nombre": "Operador de puertas Otis DCSS5",
  "tipo": "puertas",
  "dondeVer": "En el Service Tool conectado al DCSS5 (lista de eventos y menú Monitor-Status). En el control GECB se ve como evento 0305 'DCSS-5 Err'.",
  "historial": "Puede mostrar los eventos en orden, los más recientes (vista 'Actual' guarda hasta 16) o cuántas veces pasó cada uno. Clase I = información, E = evento serio que pide mantenimiento.",
  "conexion": {
   "posible": false,
   "puerto": "Service Tool conectado al DCSS5.",
   "protocolo": "Propietario de Otis, no publicado.",
   "ajustes": "No publicados.",
   "registroFalla": "No hay registro público. Lista de eventos del DCSS5 en el Service Tool.",
   "software": "Otis Service Tool de mano. No hay programa oficial para laptop.",
   "notas": "Si el DCSS5 queda en modo bloqueado: apaga su alimentación, espera unos 5 segundos y vuelve a encender.",
   "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "schindler_bionic",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Schindler 3100 / 3300 / 5300 / 6300 con control Bionic 5 o Bionic 7 (pantalla HMI en la tarjeta SMICHMI / SCIC)",
  "tipo": "control",
  "dondeVer": "En el tablero de control (en los MRL está en el marco de la puerta del último piso). La tarjeta SMICHMI tiene una pantallita (HMI) con botones. Menú 50 = lista de errores de 4 cifras. Menú 10 = comandos especiales (101 borra un error fatal, 102 activa marcha en lazo abierto para inspección). El número de estado del ascensor (2 cifras) sale al final de la línea de abajo. Si la pantalla está apagada, aprieta ESC para prender la luz. Ojo: en algunos equipos el menú de errores viene bloqueado (funciones ESF) y solo se lee con la herramienta SPECI de Schindler.",
  "historial": "El menú 50 guarda los últimos errores. En software Rel.2 menor a 9.5x se ven como E0 (el más nuevo) a E9 (el más viejo); desde la versión 9.53 se numeran desde 00 (00 = el más reciente). No mires solo el último: los anteriores suelen mostrar la causa real. Un error que se repite (por ejemplo 3 veces en 1 hora, se escribe '3x = F') pasa a 'error fatal' y bloquea el ascensor. Los fatales persistentes (preapertura, renivelación, freno KB/KB1, cadena de seguridad, puente en PHS) NO se borran apagando y prendiendo: se borran con menú 10, comando 101, y luego RESET en la tarjeta.",
  "conexion": {
   "posible": false,
   "puerto": "Puerto serial RS232 de servicio del control (cable de 9 pines) o conector MMC con el adaptador Bluetooth de Schindler",
   "protocolo": "Propietario de Schindler, no publicado",
   "ajustes": "No publicados (no se encontró velocidad ni formato del puerto en fuentes públicas)",
   "registroFalla": "No hay dirección o comando público. La falla se lee a mano en el HMI, menú 50",
   "software": "SPECI (programa para Pocket PC, luego reemplazado por iSPECI), CADI para PC y Schindler Elevator Technical Tool (SETT). Son herramientas de Schindler, se bajan de un servidor restringido por país, piden clave y deben actualizarse seguido.",
   "notas": "No se puede leer la falla con una laptop común de forma legal y segura: el protocolo es cerrado y las herramientas (SPECI, iSPECI, CADI, SETT) son de uso interno de Schindler. Técnicos independientes en foros cuentan que con software nuevo Schindler puede bloquear el acceso a parámetros. Para la app: el técnico lee el código en el HMI (menú 50) y lo escribe en la app.",
   "fuente": "https://pdfcoffee.com/schindler-manual-6-pdf-free.html"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=99",
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=84",
   "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html",
   "https://pdfcoffee.com/diagnostics-and-troubleshooting-diagnostics-and-troubleshooting-pdf-free.html",
   "https://pdfcoffee.com/schindler-manual-6-pdf-free.html",
   "https://pdfcoffee.com/kode-error-schindler-3300-ap-pdf-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "schindler_fc",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Variador (FC / ACVF) del Schindler 3100 / 3300 / 5300 con Bionic: códigos que empiezan con 15",
  "tipo": "variador",
  "dondeVer": "En el mismo HMI del control Bionic, menú 50. Los errores del variador (FC = convertidor de frecuencia) empiezan con 15xx. Según la guía rápida de Schindler, del 1501 al 1559 corresponden a las fallas F1 a F59 del variador Vacon que usa el equipo.",
  "historial": "Se guardan junto con los demás errores en el menú 50 del HMI. El comando 101 (menú 10) borra también los errores fatales del variador ACVF.",
  "conexion": {
   "posible": false,
   "puerto": "El variador va dentro del tablero y habla con el control por bus CAN; el servicio es con las herramientas de Schindler",
   "protocolo": "Propietario de Schindler (bus CAN interno, no publicado)",
   "ajustes": "No publicados",
   "registroFalla": "No hay registro público; leer el código 15xx en el HMI, menú 50",
   "software": "Herramientas de Schindler (SPECI / CADI / SETT)",
   "notas": "No se encontró forma pública de leer el variador del Bionic con laptop. El mismo número 15xx significa otra cosa en el Schindler 5500 con MX-GC (ahí 1501 es posición de cabina inválida).",
   "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html",
   "https://pdfcoffee.com/manuel-3300-3100-5500-fr-v10-pdf-free.html",
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=120",
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=123"
  ],
  "verificado": false
 },
 {
  "id": "schindler_estado",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Schindler 3300 / 3100 / 5300 con Bionic: número de ESTADO (2 cifras) en la pantalla HMI",
  "tipo": "control",
  "dondeVer": "En la pantalla del HMI (tarjeta SMICHMI / SCIC), el último número de la línea de abajo es el estado actual. El estado dice en qué 'modo' está el ascensor, no la falla exacta: para la falla mira el menú 50.",
  "historial": "El estado no se guarda; es lo que pasa ahora. La causa queda en el menú 50 (errores de 4 cifras).",
  "conexion": {
   "posible": false,
   "puerto": "Ninguno público (solo se ve en la pantalla)",
   "protocolo": "Propietario de Schindler",
   "ajustes": "No publicados",
   "registroFalla": "Leer el número en la pantalla del HMI",
   "software": "No aplica para laptop; Schindler usa SPECI / CADI",
   "notas": "El manual del propietario 2017 tiene la tabla de estados en la página 86; aquí los números salen del manual de entrenamiento 3300 y del handbook 3100/3300/5300.",
   "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=84"
  },
  "fuentes": [
   "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf",
   "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html",
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=84"
  ],
  "verificado": false
 },
 {
  "id": "schindler_mxgc",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Schindler 5500 / 6500 con Miconic MX-GC o CO MX (pantalla SMLCD, errores de 'Travel Control')",
  "tipo": "control",
  "dondeVer": "En la pantalla SMLCD del tablero: menú principal → Error Log (guarda las últimas 20 fallas con su código y una descripción corta). También en el display de 7 segmentos de la puerta (un '8' fijo = tipo de puerta no válido).",
  "historial": "El Error Log del SMLCD guarda las últimas 20 fallas. Cada falla trae un dato extra (por ejemplo la posición de la cabina en mm en el momento del error). Algunas fallas dejan el control bloqueado aunque la causa ya no esté, y hay que hacer reset del Travel Control.",
  "conexion": {
   "posible": false,
   "puerto": "Puerto RS232 del control para la PC de servicio (no usar el puerto XTELE)",
   "protocolo": "Propietario de Schindler",
   "ajustes": "No publicados",
   "registroFalla": "CADI-GC: Diagnostics → Error Log; o SMLCD → ErrorLog → Show",
   "software": "CADI-GC (programa de Schindler para PC, con clave)",
   "notas": "CADI-GC es de Schindler y pide contraseña; no hay versión pública. Los datos de puerto RS232/XTELE y CADI-GC V2.92 salieron en un extracto de búsqueda de un documento de Schindler en pdfcoffee; la página no se pudo abrir directo.",
   "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html",
   "https://www.manoeuvres-ascenseurs.fr/ERROR%20LOG%205500.pdf",
   "https://www.vatortrader.com/forums/ubbthreads.php?ubb=showflat&Number=29524",
   "https://pdfcoffee.com/schindler-miconic-mx-gc-smlcd-rel-4-5-6x-co1-2-pdf-free.html",
   "http://cyrilb54.free.fr/wa_files/S5500.pdf"
  ],
  "verificado": false
 },
 {
  "id": "schindler_bx",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Schindler Miconic BX (Rel. 4 / Rel. 5.1 / BX 010; también usado en Schindler 6200), tarjeta SCIC",
  "tipo": "control",
  "dondeVer": "HMI del control, menú 50: últimos 10 errores. La letra dice el tipo: E = error, F = fatal, P = fatal persistente, I = información. Mantener OK 10 segundos borra el historial (anótalo antes). En la tarjeta SCIC del armario ECU hay LEDs ERR, TRIP1, TRIP2, DRIVE, DOOR, WDOG, SERV que parpadean con códigos.",
  "historial": "Menú 50 guarda los 10 últimos errores; el número 00 (o E0) es el más reciente. LED ERROR rojo fijo = falla fatal (pide reset manual); parpadeando = aviso que se borra solo.",
  "conexion": {
   "posible": false,
   "puerto": "Cable serial de servicio o adaptador Bluetooth de Schindler",
   "protocolo": "Propietario de Schindler",
   "ajustes": "No publicados",
   "registroFalla": "HMI menú 50",
   "software": "SPECI (Schindler)",
   "notas": "Herramienta solo de Schindler. Si ERR, DRIVE, DOOR y WDOG parpadean juntos es falla de la tarjeta SIM (equivocada o dañada).",
   "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
  },
  "fuentes": [
   "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html",
   "https://www.slideshare.net/slideshow/schindler-manual-del-miconic-bx/249870625",
   "https://manoeuvres-ascenseurs.fr/BX.pdf",
   "https://www.collegesidekick.com/study-docs/16981383"
  ],
  "verificado": false
 },
 {
  "id": "schindler_varidor35",
  "familia": "schindler",
  "marca": "Schindler",
  "fabricante": "Schindler",
  "nombre": "Operador de puertas Schindler Varidor 35 (DDE-V35), códigos 0800-0899 de la lista de errores del 5400",
  "tipo": "puertas",
  "dondeVer": "En el registro de errores del control (SMLCD / HMI). LEDs del DDE-V35: una combinación indica que está arrancando o apagando, otra que está en falla; en falla, revisar el Error Log del SMLCD.",
  "historial": "Se guarda en el registro de errores del control. Reset del Varidor 35: cortar energía, apretar JHCT/JHT encima del operador, esperar unos 15 segundos a que abran los patines (embragues) y volver a encender JHCT/JHT.",
  "conexion": {
   "posible": false,
   "puerto": "RS232 de servicio del operador (dato del Varidor 15; para el V35 no se encontró)",
   "protocolo": "Propietario de Schindler",
   "ajustes": "No publicados",
   "registroFalla": "Error Log del SMLCD",
   "software": "DDE Studio o ESM/SMLCD (Schindler)",
   "notas": "El manual dice que el Varidor 15 se atiende por RS232 con DDE Studio o ESM/SMLCD; son herramientas de Schindler. No se encontró la tabla de errores del Varidor 15 ni del Varidor 30.",
   "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=204"
  },
  "fuentes": [
   "https://www.collegesidekick.com/study-docs/16981196",
   "https://pdfcoffee.com/5400-errors-5-pdf-free.html",
   "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=204",
   "https://pdfcoffee.com/diagnostics-pdf-pdf-free.html"
  ],
  "verificado": false
 },
 {
  "id": "unidrivesp",
  "familia": "variadores",
  "marca": "Control Techniques",
  "fabricante": "Control Techniques (Nidec)",
  "nombre": "Unidrive SP variador de frecuencia",
  "tipo": "variador",
  "dondeVer": "En la pantalla del variador: arriba sale la palabra 'trip' y abajo parpadea el código de la falla (por ejemplo OI.AC o EnC2). Si es una falla HF01 a HF16, el teclado no responde.",
  "historial": "Guarda las 10 últimas fallas en los parámetros 10.20 a 10.29: el 10.20 es la más nueva y el 10.29 la más vieja. Los parámetros 10.41 y 10.42 guardan la hora de la última falla. La falla UV (baja tensión) solo se guarda si el variador estaba andando. Para resetear: tecla roja de stop, el parámetro 10.33, o escribir 100 en el parámetro 10.38 por comunicación.",
  "conexion": {
   "posible": true,
   "puerto": "Puerto serie RS-485 de 2 hilos (EIA485) del variador, el mismo del teclado remoto. Con la laptop se usa un convertidor USB a RS-485. La tabla de pines del conector no está en esta guía: mírala en la Guía del usuario del Unidrive SP.",
   "protocolo": "Modbus RTU (Pr 11.24 = rtU, así viene de fábrica). También ANSI x3.28.",
   "ajustes": "Esclavo Pr 11.23 = 1; velocidad Pr 11.25 = 6 = 19200 baudios; 8 bits de datos, sin paridad, 2 bits de parada (al recibir acepta 1 o 2); retardo Pr 11.26 = 2 ms; máximo 16 registros por lectura.",
   "registroFalla": "Regla del manual: parámetro X.Y = registro PLC 40000 + X*100 + Y, y en el protocolo X*100 + Y - 1. Falla actual = Pr 10.20 -> registro 41020 = dirección 1019 = 0x03FB (función 03). Historial: Pr 10.21 a 10.29 -> 0x03FC a 0x0404. Hora de la última falla: Pr 10.41 y 10.42 (0x0410 y 0x0411). El valor que llega es un número: 1=UV, 2=OV, 3=OI.AC... (tabla 'Serial communications look-up table').",
   "software": "La guía nombra SyPTLite y SyPTPro (programas de Control Techniques). Para solo leer la falla sirve cualquier programa maestro Modbus RTU.",
   "notas": "Protocolo abierto y documentado. Solo lee, no escribas parámetros (escribir 100 en 10.38 resetea la falla). Si el puerto está ocupado por el teclado remoto o por el control del ascensor, no lo desconectes con el ascensor en servicio.",
   "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
  },
  "fuentes": [
   "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
  ],
  "verificado": false
 },
 {
  "id": "yaskawa_l1000a",
  "familia": "yaskawa_fuji",
  "marca": "Yaskawa",
  "fabricante": "Yaskawa",
  "nombre": "L1000A (variador para ascensor, CIMR-LC)",
  "tipo": "variador",
  "dondeVer": "En la pantalla del operador digital del variador. Si el LED ALM queda prendido fijo y sale el código, es FALLA: el variador corta y se activa el contacto de falla MA-MB-MC. Si el LED ALM y el código parpadean, es solo ALARMA (aviso).",
  "historial": "Monitores U2 (datos de la última falla) y U3 (historial de fallas) en el menú de monitores. El manual dice que los códigos de falla se leen desde los monitores U2-. Ojo: algunas fallas no quedan guardadas en la traza (por ejemplo Uv1, Uv2, Uv3, CPF00, CPF01, CPF06).",
  "conexion": {
   "posible": true,
   "puerto": "Puerto USB tipo B en el variador (cable USB 2.0 A-B, se compra aparte). También bornes de comunicación serial MEMOBUS/Modbus (RS-485/422) con resistencia de terminación por DIP switch S2 (apagada de fábrica).",
   "protocolo": "USB con DriveWizard Plus; serial MEMOBUS/Modbus RTU",
   "ajustes": "H5-01 = dirección de esclavo (si es 0 el variador no responde; cada equipo con dirección distinta; apagar y prender para que tome el cambio). H5-02 = velocidad. H5-03 = paridad (0 ninguna, 1 par, 2 impar, según manuales de la misma familia Yaskawa 1000). H5-11 = 1 para poder escribir parámetros por MEMOBUS. Valores de fábrica de dirección/velocidad NO confirmados para L1000A: revisar en el variador antes de conectar.",
   "registroFalla": "Los códigos de falla se leen por MEMOBUS desde los monitores U2- (tabla 'Fault Trace Contents'). Ejemplos de valores: 0002H = Uv1, 0021H = CE, 0055H = SE1, 0056H = SE2, 0057H = SE3, 0058H = SE4. La dirección exacta del registro de 'falla actual' e historial NO se pudo confirmar para L1000A.",
   "software": "Yaskawa DriveWizard Plus (instalar primero el driver USB, luego conectar el cable)",
   "notas": "Antes de conectar, instala el driver USB. Para cambiar parámetros por MEMOBUS pon H5-11 = 1. No cambies parámetros del ascensor sin autorización del supervisor.",
   "fuente": "https://www.manualslib.com/manual/1257708/Yaskawa-L1000a.html?page=77"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281",
   "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=273",
   "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=466",
   "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=231",
   "https://www.manualslib.com/manual/1257708/Yaskawa-L1000a.html?page=77",
   "https://www.manualslib.com/manual/1233533/Yaskawa-L1000a.html"
  ],
  "verificado": false
 },
 {
  "id": "yaskawa_l1000e",
  "familia": "yaskawa_fuji",
  "marca": "Yaskawa",
  "fabricante": "Yaskawa",
  "nombre": "L1000E (variador para ascensor, CIMR-LE)",
  "tipo": "variador",
  "dondeVer": "Si tiene monitor LED JVOP-184, la falla se ve por grupos de luces: OV/UV, OH/OL, OC/GF/SC/PGO, CPF/OFA/OFB/OFC. Con el operador digital JVOP-180 se ve el código completo. La tecla RESET borra la falla después de arreglar la causa.",
  "historial": "No confirmado para L1000E (en el L1000A está en los monitores U2/U3).",
  "conexion": {
   "posible": true,
   "puerto": "Puerto USB tipo B en el variador (cable USB 2.0 A-B, se compra aparte)",
   "protocolo": "USB con DriveWizard Plus",
   "ajustes": "Instalar el driver USB en la laptop antes de conectar el cable.",
   "registroFalla": "No encontrado para L1000E.",
   "software": "Yaskawa DriveWizard Plus",
   "notas": "Con DriveWizard Plus se puede ver el funcionamiento del variador y revisar parámetros. La tabla de fallas del L1000E no se pudo leer.",
   "fuente": "https://www.manualslib.com/manual/1233527/Yaskawa-L1000e.html?page=50"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/1233527/Yaskawa-L1000e.html?page=50",
   "https://www.manualslib.com/manual/1233527/Yaskawa-L1000e.html?page=52"
  ],
  "verificado": false
 },
 {
  "id": "fuji_lm2",
  "familia": "yaskawa_fuji",
  "marca": "Fuji Electric",
  "fabricante": "Fuji Electric",
  "nombre": "FRENIC-Lift LM2 (LM2A / LM2C, variador para ascensor)",
  "tipo": "variador",
  "dondeVer": "En el teclado del variador (TP-E1U o TP-A1-LM2), en modo alarma sale el código. Con el teclado TP-A1-LM2: LED de alarma leve parpadeando = aviso, el variador sigue; LED de alarma grave = el variador corta la salida.",
  "historial": "En modo alarma, con las teclas de flecha del teclado se ven varias alarmas y el historial de alarmas. El manual de referencia LM2A también muestra el estado del variador en el momento de la alarma.",
  "conexion": {
   "posible": true,
   "puerto": "RS-485 puerto 1 = conector RJ-45 del teclado (hay que quitar el teclado para usarlo); RS-485 puerto 2 = bornera. Cada puerto tiene su switch de resistencia de terminación. El teclado TP-A1-LM2 tiene puerto USB mini-B para PC.",
   "protocolo": "Modbus RTU, DCP3 y protocolo de FRENIC Loader por RS-485 (el LM2A también tiene CANopen)",
   "ajustes": "y01 = dirección de estación del puerto 1 (1 a 255, fábrica 1); y11 = dirección del puerto 2. y12 = qué hace si se pierde la comunicación (dispara alarma Er8). Velocidad (y04), paridad (y06) y bits de parada (y07): valores de fábrica NO confirmados para LM2.",
   "registroFalla": "No encontrado: no pude leer la dirección Modbus del código de alarma actual ni del historial para LM2. En el teclado, el menú PRG>6>3 (depuración de comunicación) permite ver códigos de los grupos S, M, W, X, Z.",
   "software": "FRENIC Loader (edición para Lift): parámetros, monitoreo y trazas en tiempo real (.RTM) e históricas (.HIM)",
   "notas": "Si usas el RJ-45 del teclado, primero retira el teclado. No cambies parámetros del ascensor sin autorización del supervisor.",
   "fuente": "https://www.fujielectric-europe.com/fileadmin/03_Downloads/03_01_Drives_and_Automation/Low_voltage_Drives/LM2A/INR-SI47-1909a-E_Lift_LM2__RM_E_.pdf"
  },
  "fuentes": [
   "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40",
   "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46",
   "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=70",
   "https://www.manualslib.com/manual/2157439/Fuji-Electric-Frenic-Lift.html?page=20",
   "https://www.manualslib.com/manual/1957905/Fuji-Electric-Frenic-Lift-Lm2-Series.html?page=17",
   "https://www.manualslib.com/manual/1957905/Fuji-Electric-Frenic-Lift-Lm2-Series.html"
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
  "equipo": "vfded",
  "codigo": "ocA",
  "nombre": "Sobrecorriente al acelerar",
  "simple": "Al arrancar, el motor jaló más de 3 veces la corriente normal del variador y este se apagó.",
  "causas": [
   "Cable del motor en corto o con el forro dañado",
   "Aceleración muy rápida (tiempo de aceleración muy corto)",
   "Variador muy chico para ese motor"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera que el variador se descargue (mide antes de tocar).",
   "Suelta los cables U, V, W y mide el aislamiento del motor y de los cables con el megóhmetro.",
   "Revisa bornes flojos o quemados.",
   "Si todo mide bien, que un técnico alargue el tiempo de aceleración.",
   "Si sigue, confirma con el proveedor que la potencia del variador alcanza para el motor."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=318"
 },
 {
  "equipo": "vfded",
  "codigo": "ocd",
  "nombre": "Sobrecorriente al desacelerar",
  "simple": "Al frenar, el motor jaló más de 3 veces la corriente normal del variador.",
  "causas": [
   "Cable del motor en corto o con mal aislamiento",
   "Desaceleración muy rápida (tiempo de bajada muy corto)",
   "Variador muy chico para ese motor"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga del variador.",
   "Mide el aislamiento del motor y sus cables con el megóhmetro.",
   "Revisa bornes flojos o quemados.",
   "Si todo mide bien, que un técnico alargue el tiempo de desaceleración."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=318"
 },
 {
  "equipo": "vfded",
  "codigo": "ocn",
  "nombre": "Sobrecorriente a velocidad constante",
  "simple": "Andando a velocidad pareja, la corriente subió más de 3 veces lo normal.",
  "causas": [
   "Corto en el motor o en sus cables",
   "Subida brusca de carga: algo frena o traba al motor",
   "Variador muy chico para el motor"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide el aislamiento del motor y de los cables.",
   "Revisa que el freno abra completo y que la cabina no roce ni se trabe en las guías.",
   "Si sigue, confirma con el proveedor el tamaño del variador."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=318"
 },
 {
  "equipo": "vfded",
  "codigo": "GFF",
  "nombre": "Falla a tierra",
  "simple": "Un cable de salida al motor está tocando tierra y la corriente de fuga pasó el 60% de la corriente nominal.",
  "causas": [
   "Cable del motor pelado o tocando la estructura o la canaleta",
   "Bobinado del motor dañado (aislamiento bajo)",
   "Humedad o agua en la caja de bornes del motor",
   "Módulo de potencia (IGBT) dañado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y mide que no haya tensión.",
   "Suelta U, V, W del variador y mide el aislamiento a tierra de cada fase con el megóhmetro.",
   "Revisa la tierra del motor y del variador.",
   "Si motor y cables miden bien, puede ser el módulo IGBT: llama al técnico del variador."
  ],
  "peligro": "Esta protección cuida al variador, no a las personas. Un cable a tierra puede electrocutar: mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=318"
 },
 {
  "equipo": "vfded",
  "codigo": "STO",
  "nombre": "Parada segura del torque activada (n.º 76)",
  "simple": "Se abrieron las entradas de parada segura (STO) y el variador cortó la fuerza al motor.",
  "causas": [
   "Se abrió el circuito de seguridad que alimenta las entradas STO",
   "Cable suelto o roto en los bornes STO",
   "Relé o contactor de seguridad del tablero que no cierra"
  ],
  "arreglo": [
   "Mira en el tablero qué contacto de seguridad está abierto (puertas, stop, finales de carrera).",
   "Con la energía cortada y candado, revisa que los bornes STO estén bien ajustados.",
   "Nunca puentees las entradas STO ni un contacto de seguridad.",
   "Si todo está cerrado y la falla sigue, llama al técnico del tablero."
  ],
  "peligro": "STO es una función de seguridad. Puentearla puede dejar mover la cabina con puertas abiertas.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=352"
 },
 {
  "equipo": "vfded",
  "codigo": "STL1",
  "nombre": "Pérdida de torque seguro 1 (n.º 72, circuito STO1-SCM1)",
  "simple": "El variador vio una falla en su circuito interno de parada segura, canal 1.",
  "causas": [
   "Falla interna del circuito STO1-SCM1",
   "Solo un canal STO se abre (cableado mal hecho o cable roto)",
   "Mala conexión en los bornes STO"
  ],
  "arreglo": [
   "Corta la energía, pon candado y revisa que los dos canales STO estén cableados igual y bien ajustados.",
   "Mide que los dos canales reciban la señal al mismo tiempo.",
   "No puentees nada.",
   "Si sigue, el variador necesita servicio técnico de Delta."
  ],
  "peligro": "Es una falla del sistema de seguridad: no pongas el ascensor en servicio hasta resolverla.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=352"
 },
 {
  "equipo": "vfded",
  "codigo": "STL2",
  "nombre": "Pérdida de torque seguro 2 (n.º 77, circuito STO2-SCM2)",
  "simple": "El variador vio una falla en su circuito interno de parada segura, canal 2.",
  "causas": [
   "Falla interna del circuito STO2-SCM2",
   "Solo un canal STO se abre (cableado mal hecho o cable roto)",
   "Mala conexión en los bornes STO"
  ],
  "arreglo": [
   "Corta la energía, pon candado y revisa el cableado de los dos canales STO.",
   "Mide que los dos canales reciban la señal al mismo tiempo.",
   "No puentees nada.",
   "Si sigue, el variador necesita servicio técnico de Delta."
  ],
  "peligro": "Es una falla del sistema de seguridad: no pongas el ascensor en servicio hasta resolverla.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=352"
 },
 {
  "equipo": "vfded",
  "codigo": "STL3",
  "nombre": "Pérdida de torque seguro 3 (n.º 78, los dos canales STO)",
  "simple": "El variador vio falla en los dos canales internos de parada segura.",
  "causas": [
   "Falla interna en los circuitos STO1-SCM1 y STO2-SCM2",
   "Cableado STO dañado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y revisa el cableado STO completo.",
   "No puentees nada.",
   "Llama al servicio técnico de Delta: el variador puede estar dañado."
  ],
  "peligro": "Es una falla del sistema de seguridad: no pongas el ascensor en servicio hasta resolverla.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1990589/Delta-Vfd-Ed-Series.html?page=352"
 },
 {
  "equipo": "vfdvl",
  "codigo": "PGF1",
  "nombre": "Falla de señal del encoder (PGF1)",
  "simple": "El variador no recibe bien la señal del encoder (sensor de giro del motor).",
  "causas": [
   "Cable del encoder suelto, cortado o sin blindaje a tierra",
   "Tarjeta PG (del encoder) mal conectada o dañada",
   "Encoder dañado o flojo en el eje"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa cable y conectores del encoder hasta la tarjeta PG; el blindaje debe ir a tierra.",
   "Revisa que el encoder esté bien fijo al eje del motor.",
   "Cambia el encoder o la tarjeta PG solo después de medir."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html"
 },
 {
  "equipo": "vfdvl",
  "codigo": "PGF2",
  "nombre": "Falla de señal del encoder (PGF2)",
  "simple": "La señal del encoder se perdió o no llega al variador.",
  "causas": [
   "Cable del encoder cortado o desconectado",
   "Tarjeta PG sin alimentación o dañada",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa continuidad del cable del encoder y sus conectores.",
   "Mide la alimentación del encoder en la tarjeta PG.",
   "Cambia el encoder solo si el cable y la tarjeta están bien."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html"
 },
 {
  "equipo": "vfdvl",
  "codigo": "PGF3",
  "nombre": "Encoder fuera del nivel 'stall' (PGF3)",
  "simple": "La velocidad que lee el encoder pasó el nivel de alarma ajustado en el grupo 10.",
  "causas": [
   "Encoder flojo o con señal sucia",
   "Pulsos del encoder mal puestos en los parámetros",
   "Nivel de alarma del grupo 10 mal ajustado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa la fijación y el cable del encoder.",
   "Que un técnico revise los pulsos del encoder y el nivel 'Encoder Stall Level' del grupo 10.",
   "No pongas el ascensor en servicio sin saber la causa."
  ],
  "peligro": "Si la velocidad leída no es la real, la cabina puede moverse mal.",
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html"
 },
 {
  "equipo": "vfdvl",
  "codigo": "AUE",
  "nombre": "Error de autoajuste ('Auto Tuning Err')",
  "simple": "El autoajuste del motor no terminó: hubo una falla o alguien lo detuvo.",
  "causas": [
   "Datos de placa del motor mal ingresados",
   "Se detuvo el autoajuste a mano o se abrió un contacto",
   "Motor o cables desconectados durante la prueba"
  ],
  "arreglo": [
   "Revisa y vuelve a poner los datos de placa del motor.",
   "Repite el autoajuste con la cabina en condición segura y sin interrumpirlo.",
   "Revisa que el contactor de salida cierre durante la prueba.",
   "Si vuelve a fallar, anota el código y llama al técnico del variador."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2038802/Delta-Vfd-Vl-Series.html"
 },
 {
  "equipo": "delta_comun",
  "codigo": "ovA",
  "nombre": "Sobretensión al acelerar",
  "simple": "La tensión interna del variador (bus DC) subió demasiado mientras el motor aceleraba.",
  "causas": [
   "Tensión de la red alta o con picos",
   "El motor devuelve energía al variador (regeneración)",
   "Resistencia de frenado desconectada o dañada"
  ],
  "arreglo": [
   "Mide la tensión de entrada: debe estar dentro de lo que dice la placa del variador.",
   "Con la energía cortada y candado, revisa la resistencia de frenado y sus cables.",
   "Si la red tiene picos, avisa al electricista del edificio.",
   "Si sigue, que un técnico revise las rampas y el frenado."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2005494/Delta-Me300-Series.html?page=347"
 },
 {
  "equipo": "delta_comun",
  "codigo": "LvA",
  "nombre": "Baja tensión al acelerar",
  "simple": "Al acelerar, la tensión dentro del variador bajó demasiado.",
  "causas": [
   "Tensión de la red baja",
   "Falta una fase o un borne R, S, T está flojo",
   "Carga brusca del motor"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada con el multímetro.",
   "Con la energía cortada y candado, revisa fusibles, llave principal y bornes R, S, T.",
   "Revisa que el cable de alimentación no esté recalentado ni sea muy delgado."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/2005494/Delta-Me300-Series.html?page=347"
 },
 {
  "equipo": "delta_comun",
  "codigo": "OrP",
  "nombre": "Protección por pérdida de fase",
  "simple": "Falta una fase en la alimentación del variador.",
  "causas": [
   "Fusible quemado o llave con una fase abierta",
   "Borne R, S o T flojo",
   "Corte de una fase en la red del edificio"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada con el multímetro.",
   "Con la energía cortada y candado, ajusta bornes y revisa fusibles.",
   "Si falta una fase desde la red, avisa al electricista del edificio."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/2923922/Delta-C2000-Plus-Series.html?page=904"
 },
 {
  "equipo": "delta_comun",
  "codigo": "oH1",
  "nombre": "Sobretemperatura del IGBT (disipador muy caliente)",
  "simple": "El disipador del variador está demasiado caliente.",
  "causas": [
   "Ventilador del variador parado o sucio",
   "Aletas o rejillas tapadas con polvo",
   "Cuarto de máquinas muy caliente",
   "Poco espacio libre alrededor del variador"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia aletas y rejillas; revisa que el ventilador gire libre.",
   "Mejora la ventilación del cuarto de máquinas.",
   "Cambia el ventilador si no gira."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2008941/Delta-Vfd-El-W-Series.html?page=165"
 },
 {
  "equipo": "delta_comun",
  "codigo": "oL",
  "nombre": "Sobrecarga del variador",
  "simple": "El variador entregó demasiada corriente por mucho tiempo.",
  "causas": [
   "Motor sobrecargado (mucho peso en la cabina o mal balance con el contrapeso)",
   "Compensación de torque muy alta",
   "Variador muy chico para el motor"
  ],
  "arreglo": [
   "Revisa que la cabina no lleve más carga de la permitida.",
   "Revisa que el freno abra completo y que la cabina no roce.",
   "Que un técnico baje la compensación de torque.",
   "Si sigue, confirma el tamaño del variador con el proveedor."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2008941/Delta-Vfd-El-W-Series.html?page=165"
 },
 {
  "equipo": "delta_comun",
  "codigo": "EoL1",
  "nombre": "Protección térmica electrónica 1 (sobrecarga del motor)",
  "simple": "El variador calculó que el motor se está calentando por trabajar con mucha corriente.",
  "causas": [
   "Motor sobrecargado",
   "Corriente nominal del motor mal puesta en el parámetro",
   "Freno que roza o cabina que se traba"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Revisa que la corriente nominal del motor en el parámetro sea la de la placa.",
   "Revisa que el freno abra completo y que la cabina corra libre.",
   "Si sigue, revisa carga y balance con el contrapeso."
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/2005494/Delta-Me300-Series.html?page=347"
 },
 {
  "equipo": "md500",
  "codigo": "Err02",
  "nombre": "Sobrecorriente al acelerar",
  "simple": "Al arrancar, el motor jaló demasiada corriente.",
  "causas": [
   "Cable del motor a tierra o en corto",
   "No se hizo el autoajuste del motor",
   "Aceleración muy rápida",
   "Ruido eléctrico externo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los cables del motor y mide su aislamiento.",
   "Haz el autoajuste con los datos de placa del motor.",
   "Que un técnico alargue la aceleración y active el límite de corriente (F3-19)."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err03",
  "nombre": "Sobrecorriente al desacelerar",
  "simple": "Al frenar, el motor jaló demasiada corriente.",
  "causas": [
   "Cable del motor en corto o a tierra",
   "No se hizo el autoajuste",
   "Desaceleración muy rápida",
   "Falta la resistencia de frenado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y mide el aislamiento de los cables del motor.",
   "Haz el autoajuste.",
   "Revisa la resistencia de frenado; que un técnico alargue la desaceleración."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err04",
  "nombre": "Sobrecorriente a velocidad constante",
  "simple": "Andando a velocidad pareja, la corriente subió demasiado.",
  "causas": [
   "Cable del motor a tierra",
   "Refuerzo de torque (torque boost) muy alto",
   "Variador chico para el motor",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y mide los cables del motor.",
   "Que un técnico baje el refuerzo de torque.",
   "Si sigue, consulta si hace falta un variador más grande."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err05",
  "nombre": "Sobretensión al acelerar",
  "simple": "La tensión interna subió demasiado mientras el motor aceleraba.",
  "causas": [
   "Tensión de la red alta",
   "Aceleración muy corta",
   "La carga empuja al motor (regeneración)"
  ],
  "arreglo": [
   "Mide la tensión de la red.",
   "Con la energía cortada, revisa la resistencia de frenado y sus cables.",
   "Que un técnico active el límite de tensión (F3-23) o alargue la aceleración."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err06",
  "nombre": "Sobretensión al desacelerar",
  "simple": "La tensión interna subió demasiado al frenar el motor.",
  "causas": [
   "Desaceleración muy rápida",
   "La carga empuja al motor",
   "Falta o falla la resistencia de frenado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga.",
   "Revisa y mide la resistencia de frenado y sus cables.",
   "Que un técnico active el límite de tensión o alargue la desaceleración."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err07",
  "nombre": "Sobretensión a velocidad constante",
  "simple": "La tensión interna subió demasiado andando a velocidad pareja.",
  "causas": [
   "La carga devuelve energía al variador",
   "Resistencia de frenado mala o desconectada"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga.",
   "Revisa la resistencia de frenado y sus cables.",
   "Que un técnico ajuste F3-22 y F3-24 según el manual."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err08",
  "nombre": "Falla de la resistencia de precarga / fuente de control",
  "simple": "Falla en el circuito de carga inicial o en la fuente interna del variador.",
  "causas": [
   "Tensión de la red que sube y baja mucho",
   "Resistencia de precarga dañada",
   "Fuente de control interna dañada"
  ],
  "arreglo": [
   "Mide la tensión de la red y si es estable.",
   "No abras el variador.",
   "Llama al servicio técnico de Inovance."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err09",
  "nombre": "Baja tensión",
  "simple": "La tensión interna (bus DC) bajó del mínimo con el variador andando.",
  "causas": [
   "Corte o bajón de luz breve",
   "Tensión de entrada fuera de rango",
   "Puente rectificador o resistencia de carga dañados"
  ],
  "arreglo": [
   "Mide la tensión de entrada en las 3 fases.",
   "Con la energía cortada y candado, revisa fusibles y bornes de entrada.",
   "Si la red está bien y sigue, que un técnico revise el rectificador con el multímetro."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err10",
  "nombre": "Sobrecarga del variador",
  "simple": "El variador trabajó con demasiada carga.",
  "causas": [
   "Carga muy pesada",
   "Motor trabado (rotor bloqueado)",
   "Variador chico para el motor"
  ],
  "arreglo": [
   "Revisa que la cabina no lleve sobrepeso.",
   "Revisa que el freno abra completo y que la cabina corra libre.",
   "Si sigue, consulta si hace falta un variador más grande."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err11",
  "nombre": "Sobrecarga del motor",
  "simple": "El motor trabajó con más carga de la permitida.",
  "causas": [
   "Protección del motor (F9-01) mal ajustada",
   "Torque o carga muy alta",
   "Freno que roza"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Que un técnico revise F9-01 con los datos de placa.",
   "Revisa carga de la cabina y que el freno abra completo."
  ],
  "pieza": "maquina",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err12",
  "nombre": "Pérdida de fase de entrada",
  "simple": "Falta una fase en la alimentación del variador.",
  "causas": [
   "Fusible quemado o llave con una fase abierta",
   "Borne R, S o T flojo",
   "Rectificador dañado"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada.",
   "Con la energía cortada y candado, revisa fusibles y bornes R, S, T.",
   "Si la entrada está bien y sigue, llama al servicio técnico."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err13",
  "nombre": "Pérdida de fase de salida",
  "simple": "Una de las fases que van al motor no está llegando.",
  "causas": [
   "Cable del motor cortado o suelto",
   "Bobina del motor abierta",
   "Contactor de salida con un contacto malo",
   "Falla del IGBT del variador"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Mide continuidad de U, V, W hasta el motor y las bobinas del motor.",
   "Revisa los contactos del contactor de salida.",
   "Si el motor y los cables están bien, llama al servicio técnico del variador."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err14",
  "nombre": "Sobretemperatura del módulo IGBT",
  "simple": "La parte de potencia del variador está muy caliente.",
  "causas": [
   "Ambiente muy caliente",
   "Ventilador parado",
   "Sensor de temperatura dañado"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Limpia las rejillas y revisa que el ventilador gire.",
   "Mejora la ventilación del cuarto de máquinas.",
   "Cambia ventilador o sensor solo después de revisar."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err15",
  "nombre": "Falla externa",
  "simple": "Se activó una entrada configurada como 'falla externa'.",
  "causas": [
   "Una entrada digital (DI) de falla externa se activó",
   "Señal de falla enviada desde el tablero de control"
  ],
  "arreglo": [
   "Mira en el tablero qué equipo manda la señal de falla.",
   "Corrige esa causa y luego resetea.",
   "Que un técnico revise las funciones de las entradas DI."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err16",
  "nombre": "Falla de comunicación",
  "simple": "Se cortó la comunicación entre el variador y el equipo que lo controla.",
  "causas": [
   "Cable de comunicación malo o con ruido",
   "Tipo de tarjeta de comunicación mal puesto en F0-28",
   "Parámetros del grupo FD mal puestos",
   "Tarjeta del variador dañada"
  ],
  "arreglo": [
   "Revisa el cable de comunicación, sus conectores y el blindaje.",
   "Que un técnico revise F0-28 y el grupo FD.",
   "Cambia la tarjeta solo si todo lo anterior está bien."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err17",
  "nombre": "Falla del contactor",
  "simple": "Falla en el contactor interno de carga del variador.",
  "causas": [
   "Contactor interno dañado",
   "Tarjeta de mando o fuente interna dañada"
  ],
  "arreglo": [
   "No abras el variador.",
   "Llama al servicio técnico de Inovance."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err18",
  "nombre": "Falla de detección de corriente",
  "simple": "El variador no puede medir bien la corriente.",
  "causas": [
   "Sensor de corriente (hall) dañado",
   "Tarjeta de mando dañada"
  ],
  "arreglo": [
   "Corta y vuelve a dar energía para ver si se repite.",
   "Si se repite, llama al servicio técnico: se cambia el sensor o la tarjeta."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err19",
  "nombre": "Falla de autoajuste del motor",
  "simple": "El autoajuste del motor no se pudo completar.",
  "causas": [
   "Datos de placa del motor mal puestos",
   "Problema con el encoder"
  ],
  "arreglo": [
   "Vuelve a poner los datos de placa del motor.",
   "Revisa el cableado del encoder.",
   "Repite el autoajuste con la cabina en condición segura."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err20",
  "nombre": "Falla del encoder",
  "simple": "El variador no recibe bien la señal del encoder (sensor de giro).",
  "causas": [
   "Tipo o pulsos del encoder mal puestos (F1-27)",
   "Cable del encoder mal conectado, roto o en corto",
   "Encoder dañado",
   "Tarjeta PG dañada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa cable, conectores y blindaje del encoder.",
   "Revisa la alimentación de la tarjeta PG y el orden de fases.",
   "Cambia encoder o tarjeta PG solo después de medir."
  ],
  "pieza": "encoder",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err21",
  "nombre": "Falla de memoria EEPROM",
  "simple": "El variador no puede leer o grabar su memoria.",
  "causas": [
   "Memoria (EEPROM) dañada",
   "Tarjeta de control dañada"
  ],
  "arreglo": [
   "Corta y vuelve a dar energía.",
   "Si se repite, llama al servicio técnico: se cambia la tarjeta de control."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err23",
  "nombre": "Cortocircuito a tierra",
  "simple": "El motor o su cable están haciendo contacto con tierra.",
  "causas": [
   "Aislamiento del motor dañado",
   "Cable de salida tocando tierra",
   "Falla interna del variador"
  ],
  "arreglo": [
   "Corta la energía, pon candado y mide que no haya tensión.",
   "Suelta el motor y mide el aislamiento de cada fase a tierra con el megóhmetro.",
   "Cambia el cable o repara el motor si mide bajo.",
   "Si motor y cable están bien, llama al servicio técnico del variador."
  ],
  "peligro": "Un cable a tierra puede electrocutar. Mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err26",
  "nombre": "Tiempo de marcha acumulado alcanzado",
  "simple": "Se cumplió el tiempo de funcionamiento programado en el variador.",
  "causas": [
   "Está activada la función de límite de tiempo de marcha",
   "Se llegó al tiempo total programado"
  ],
  "arreglo": [
   "Pide a un técnico que revise ese ajuste.",
   "Antes de reiniciar parámetros, guarda una copia de todos los ajustes."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err27",
  "nombre": "Falla definida por el usuario 1",
  "simple": "Se activó una entrada configurada como falla del usuario 1.",
  "causas": [
   "Entrada DI o E/S virtual de falla activada",
   "Señal enviada por el tablero"
  ],
  "arreglo": [
   "Busca qué equipo activa esa entrada y corrige la causa.",
   "Luego resetea."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err28",
  "nombre": "Falla definida por el usuario 2",
  "simple": "Se activó una entrada configurada como falla del usuario 2.",
  "causas": [
   "Entrada DI o E/S virtual de falla activada",
   "Señal enviada por el tablero"
  ],
  "arreglo": [
   "Busca qué equipo activa esa entrada y corrige la causa.",
   "Luego resetea."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err29",
  "nombre": "Tiempo de encendido acumulado alcanzado",
  "simple": "Se cumplió el tiempo de encendido programado en el variador.",
  "causas": [
   "Está activado el límite de tiempo de encendido",
   "Se llegó al tiempo total programado"
  ],
  "arreglo": [
   "Pide a un técnico que revise y reinicie ese contador.",
   "Antes de cambiar parámetros, guarda una copia de todos los ajustes."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err30",
  "nombre": "Pérdida de carga",
  "simple": "La corriente de salida bajó por debajo del nivel ajustado en F9-64.",
  "causas": [
   "Motor desconectado o carga suelta",
   "F9-64 / F9-65 mal ajustados"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa la conexión del motor.",
   "Que un técnico revise F9-64 y F9-65."
  ],
  "pieza": "maquina",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err31",
  "nombre": "Pérdida de realimentación PID",
  "simple": "La señal de realimentación del PID bajó del nivel FA-26.",
  "causas": [
   "Sensor del PID dañado o desconectado",
   "FA-26 mal ajustado"
  ],
  "arreglo": [
   "Revisa el sensor y su cable.",
   "Que un técnico revise FA-26."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err40",
  "nombre": "Límite de corriente pulso a pulso",
  "simple": "El variador tuvo que limitar la corriente muchas veces seguidas.",
  "causas": [
   "Carga muy pesada",
   "Variador chico para el motor"
  ],
  "arreglo": [
   "Revisa sobrepeso en la cabina y que el freno abra completo.",
   "Si sigue, consulta si hace falta un variador más grande."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err41",
  "nombre": "Cambio de motor en marcha",
  "simple": "Se cambió la selección de motor mientras el variador estaba andando.",
  "causas": [
   "Cambio de motor 1/2 hecho en marcha",
   "Entrada de selección de motor que cambia sola (cable flojo)"
  ],
  "arreglo": [
   "Cambia de motor solo con el variador parado.",
   "Luego resetea."
  ],
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err42",
  "nombre": "Desviación de velocidad muy grande",
  "simple": "La velocidad real del motor es muy distinta de la que se pidió.",
  "causas": [
   "Datos del encoder que no coinciden",
   "No se hizo el autoajuste",
   "F9-69 / F9-70 mal ajustados"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Haz el autoajuste.",
   "Que un técnico revise F9-69 y F9-70."
  ],
  "pieza": "encoder",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err43",
  "nombre": "Sobrevelocidad del motor",
  "simple": "El motor giró más rápido de lo permitido.",
  "causas": [
   "Encoder o parámetros que no coinciden",
   "No se hizo el autoajuste",
   "F9-67 / F9-68 mal ajustados"
  ],
  "arreglo": [
   "No pongas el ascensor en servicio hasta saber la causa.",
   "Revisa el encoder y su cable.",
   "Haz el autoajuste.",
   "Que un técnico revise F9-67 y F9-68."
  ],
  "peligro": "La cabina puede ir más rápido de lo normal. Revisa también el limitador de velocidad.",
  "pieza": "encoder",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err45",
  "nombre": "Sobretemperatura del motor",
  "simple": "El sensor de temperatura del motor marca demasiado calor.",
  "causas": [
   "Motor muy caliente",
   "Cable del sensor de temperatura suelto"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Con la energía cortada, ajusta los cables del sensor de temperatura.",
   "Mejora la ventilación del motor.",
   "Que un técnico revise la frecuencia portadora."
  ],
  "pieza": "maquina",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "md500",
  "codigo": "Err51",
  "nombre": "Falla de posición inicial",
  "simple": "El variador no pudo encontrar la posición inicial del motor.",
  "causas": [
   "Datos del motor mal puestos o sin autoajuste",
   "Encoder mal conectado"
  ],
  "arreglo": [
   "Revisa los datos de placa del motor.",
   "Revisa el cable del encoder.",
   "Repite el autoajuste.",
   "Si sigue, llama al técnico del variador."
  ],
  "pieza": "encoder",
  "fuente": "https://www.otomasyonavm.com/en/invance-md-fault-index"
 },
 {
  "equipo": "md500",
  "codigo": "Err62",
  "nombre": "Cortocircuito en el circuito de frenado",
  "simple": "Hay un corto en la parte de frenado (IGBT de frenado).",
  "causas": [
   "IGBT de frenado dañado",
   "Resistencia de frenado o sus cables en corto"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga.",
   "Revisa la resistencia de frenado y sus cables (sin corto ni a tierra).",
   "Si la resistencia está bien, el IGBT de frenado está dañado: llama al servicio técnico."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.jotamachinery.com/about-us/slitter-rewinder-troubleshooting-guide/inovance-md500-error-codes/"
 },
 {
  "equipo": "adl300",
  "codigo": "OV",
  "nombre": "Overvoltage: sobretensión en el bus DC (código 1)",
  "simple": "La tensión interna del variador subió demasiado.",
  "causas": [
   "El motor devuelve energía al frenar",
   "Resistencia de frenado o su cable cortado",
   "Tensión de la red más alta que la puesta en el parámetro 560"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga.",
   "Revisa la resistencia de frenado y su cableado.",
   "Mide la tensión de la red y compárala con el parámetro 560."
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "UV",
  "nombre": "Undervoltage: baja tensión (código 2)",
  "simple": "Llega poca tensión a la parte de potencia del variador.",
  "causas": [
   "Tensión de la red baja",
   "Caída de tensión grande en los cables",
   "Conexiones flojas (por ejemplo bornes del contactor)"
  ],
  "arreglo": [
   "Mide la tensión de la red.",
   "Con la energía cortada y candado, ajusta bornes y conexiones.",
   "Revisa que el parámetro 560 tenga la tensión real de la red."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "GNDF",
  "nombre": "Ground fault: falla a tierra (código 3)",
  "simple": "Hay un corto a tierra en la salida del variador o en el motor.",
  "causas": [
   "Cable del motor tocando tierra",
   "Motor con el aislamiento dañado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y mide que no haya tensión.",
   "Revisa el cableado del variador y del motor.",
   "Mide el aislamiento del motor con el megóhmetro."
  ],
  "peligro": "Un cable a tierra puede electrocutar. Mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "OC",
  "nombre": "Overcurrent: sobrecorriente instantánea (código 4)",
  "simple": "Saltó la protección de sobrecorriente instantánea.",
  "causas": [
   "Parámetros del regulador de corriente mal puestos",
   "Corto entre fases del motor",
   "Falla a tierra en la salida"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa y mide el cableado al motor.",
   "Que un técnico revise los parámetros del regulador de corriente (menú 17)."
  ],
  "pieza": "cables_motor",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "DES",
  "nombre": "Desaturation: desaturación del IGBT (código 5)",
  "simple": "Hubo una sobrecorriente instantánea en el puente de IGBT.",
  "causas": [
   "Corto o fuga a tierra en la salida",
   "Resistencia de frenado con mal aislamiento",
   "Falla interna del variador"
  ],
  "arreglo": [
   "Apaga y vuelve a encender el variador.",
   "Con la energía cortada y candado, revisa el aislamiento de la resistencia de frenado.",
   "Revisa que no haya fugas a tierra en motor y cables.",
   "Si sigue, llama al servicio técnico."
  ],
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "MUV",
  "nombre": "MultiUndervolt: muchas bajas de tensión (código 6)",
  "simple": "Hubo más bajas de tensión seguidas de las que permite el parámetro 4650.",
  "causas": [
   "Red con bajones repetidos",
   "Conexiones flojas en la entrada"
  ],
  "arreglo": [
   "Haz las mismas revisiones de la alarma UV.",
   "Mide la red por un rato para ver los bajones."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "MOC",
  "nombre": "MultiOvercurr: muchas sobrecorrientes (código 7)",
  "simple": "Hubo 2 rearranques por sobrecorriente en menos de 30 segundos.",
  "causas": [
   "Cables del motor en corto o a tierra (como en la alarma OC)",
   "Parámetros del regulador de corriente mal puestos"
  ],
  "arreglo": [
   "Haz las mismas revisiones de la alarma OC.",
   "No sigas reseteando sin encontrar la causa."
  ],
  "pieza": "cables_motor",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "MDES",
  "nombre": "MultiDesat: muchas desaturaciones (código 8)",
  "simple": "Hubo 2 rearranques por desaturación en menos de 30 segundos.",
  "causas": [
   "Demasiadas alarmas de desaturación (DES)",
   "Cables del motor muy largos (más de 100 m) o muy capacitivos"
  ],
  "arreglo": [
   "Haz las mismas revisiones de la alarma DES.",
   "Revisa el largo y tipo del cable del motor.",
   "Si sigue, llama al servicio técnico."
  ],
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "HOT",
  "nombre": "Heatsink OT: disipador muy caliente (código 9)",
  "simple": "El disipador del variador está demasiado caliente.",
  "causas": [
   "Ventilador parado",
   "Disipador tapado con polvo",
   "Rejillas del tablero tapadas"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa que el ventilador gire.",
   "Limpia disipador y rejillas del tablero."
  ],
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "HSOT",
  "nombre": "Temperatura del módulo IGBT fuera de rango",
  "simple": "La temperatura del módulo IGBT está muy alta o muy baja.",
  "causas": [
   "Mala ventilación del variador",
   "Cuarto de máquinas muy caliente o muy frío"
  ],
  "arreglo": [
   "Revisa ventilador y limpieza del disipador.",
   "Revisa la temperatura del cuarto de máquinas."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html"
 },
 {
  "equipo": "adl300",
  "codigo": "MOT",
  "nombre": "Motor OT: motor muy caliente (código 12)",
  "simple": "El motor está demasiado caliente.",
  "causas": [
   "Ciclo de trabajo muy pesado (muchos viajes)",
   "Motor sin buena ventilación"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Revisa la ventilación del motor; se puede poner un ventilador.",
   "Revisa la cantidad de viajes y la carga."
  ],
  "pieza": "maquina",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "BOL",
  "nombre": "Bres overload: sobrecarga de la resistencia de frenado (código 15)",
  "simple": "La resistencia de frenado recibe más corriente de la que aguanta.",
  "causas": [
   "Resistencia de frenado de tamaño equivocado",
   "Resistencia dañada"
  ],
  "arreglo": [
   "Corta la energía, pon candado y espera la descarga.",
   "Revisa el estado y el valor de la resistencia de frenado.",
   "Confirma con el proveedor que el tamaño sea el correcto."
  ],
  "peligro": "La resistencia de frenado se pone muy caliente. No la toques recién apagada.",
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "PHL",
  "nombre": "Phase loss: pérdida de fase de entrada (código 16)",
  "simple": "Falta una fase en la alimentación del variador.",
  "causas": [
   "Protección (fusible o llave) antes del variador disparada",
   "Falta una fase en la red"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada.",
   "Revisa fusibles y llave antes del variador (con la energía cortada y candado)."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "Opt Bus fault",
  "nombre": "Falla de la tarjeta opcional de bus (código 17)",
  "simple": "Falla en la tarjeta opcional de comunicación del variador.",
  "causas": [
   "Problema de comunicación (si el primer dígito antes de la H del subcódigo es 0)",
   "Problema de configuración (si ese dígito no es 0)"
  ],
  "arreglo": [
   "Anota el subcódigo de la alarma.",
   "Revisa cable y conector de la tarjeta de comunicación.",
   "Si es de configuración, que un técnico revise los parámetros del bus."
  ],
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h74/h2c/WEG-ADL300-Functions-descriptions-parameters-asynchronous-1S9FEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "SFL",
  "nombre": "Speed fbk loss: pérdida de señal del encoder (código 22)",
  "simple": "El variador no recibe la señal del encoder (sensor de giro).",
  "causas": [
   "Encoder desconectado o mal conectado",
   "Encoder sin alimentación",
   "Canales A-B o blindaje con mala conexión",
   "No hay tarjeta de encoder instalada"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa los canales A y B, el blindaje y la alimentación del encoder (parámetro 2102).",
   "Mira el parámetro 2172 para saber la causa exacta.",
   "Comprueba la velocidad del motor en el parámetro 260."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html?page=44"
 },
 {
  "equipo": "adl300",
  "codigo": "OS",
  "nombre": "Overspeed: sobrevelocidad (código 23)",
  "simple": "El motor pasó la velocidad máxima puesta en el parámetro 4540.",
  "causas": [
   "Referencia de velocidad muy alta",
   "La carga arrastra al motor"
  ],
  "arreglo": [
   "No pongas el ascensor en servicio hasta saber la causa.",
   "Que un técnico revise la referencia de velocidad y el parámetro 4540.",
   "Revisa el encoder y el balance cabina-contrapeso."
  ],
  "peligro": "La cabina puede ir más rápido de lo normal. Revisa también el limitador de velocidad.",
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "PRR",
  "nombre": "Power down: sin potencia al habilitar (código 26)",
  "simple": "Se habilitó el variador pero no había energía en su parte de potencia.",
  "causas": [
   "Contactor de red abierto",
   "Llave principal apagada"
  ],
  "arreglo": [
   "Revisa que la parte de potencia tenga energía antes de habilitar.",
   "Revisa el contactor de entrada."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "PHLO",
  "nombre": "Phaseloss out: pérdida de fase de salida (código 27)",
  "simple": "Falta una fase entre el variador y el motor.",
  "causas": [
   "Cable del motor suelto o cortado",
   "Contactor de salida con un contacto malo"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa la conexión variador-motor.",
   "Revisa los contactos del contactor de salida."
  ],
  "pieza": "cables_motor",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "DOL",
  "nombre": "Drive overload: sobrecarga del variador",
  "simple": "La corriente de salida pasó la sobrecarga permitida.",
  "causas": [
   "Carga excesiva",
   "Aceleraciones muy fuertes",
   "Ciclo de sobrecarga fuera de límite"
  ],
  "arreglo": [
   "Revisa sobrepeso en la cabina y el balance con el contrapeso.",
   "Revisa que el freno abra completo.",
   "Que un técnico revise las aceleraciones."
  ],
  "pieza": "variador",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "External fault",
  "nombre": "Alarma externa",
  "simple": "Una entrada digital programada como alarma externa no recibe sus +24 V.",
  "causas": [
   "Borne de la entrada flojo",
   "Se abrió el contacto que da los 24 V"
  ],
  "arreglo": [
   "Con la energía cortada y candado, ajusta los tornillos del borne.",
   "Mide los 24 V en la entrada.",
   "Busca qué contacto del tablero abrió."
  ],
  "pieza": "tablero_control",
  "fuente": "https://static.weg.net/medias/downloadcenter/h11/hb9/WEG-ADL300-Fast-installations-commissioning-1S9FNEN-en.pdf"
 },
 {
  "equipo": "adl300",
  "codigo": "Contactor feedback",
  "nombre": "Retorno del contactor (PLC 1, código 33)",
  "simple": "El variador no recibe la señal de que el contactor del motor cerró o abrió.",
  "causas": [
   "Contactor dañado (falla electromecánica)",
   "Error de cableado del contacto de retorno"
  ],
  "arreglo": [
   "Corta la energía y pon candado.",
   "Revisa el cableado del contacto auxiliar del contactor.",
   "Cambia el contactor si no conmuta bien."
  ],
  "peligro": "No puentees el contacto de retorno: el variador lo usa para no mover el motor con el contactor mal.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html"
 },
 {
  "equipo": "adl300",
  "codigo": "Brake feedback",
  "nombre": "Retorno del freno (PLC 2, código 34)",
  "simple": "El variador no recibe la señal de que el freno abrió o cerró.",
  "causas": [
   "Microcontacto del freno dañado o desajustado",
   "Error de cableado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y asegura la cabina.",
   "Revisa el cableado del microcontacto del freno.",
   "Ajusta o cambia el microcontacto."
  ],
  "peligro": "Una falla de freno puede dejar mover la cabina. No la pongas en servicio hasta resolverla.",
  "pieza": "micro_freno",
  "fuente": "https://www.manualslib.com/manual/1845346/Gefran-Adl300.html"
 },
 {
  "equipo": "adl300",
  "codigo": "Brake failure",
  "nombre": "Falla de freno (alarma de ascensor)",
  "simple": "No llegó la señal que confirma que el freno abrió o cerró.",
  "causas": [
   "Pieza del freno con falla electromecánica",
   "Error de cableado"
  ],
  "arreglo": [
   "Corta la energía, pon candado y asegura la cabina.",
   "Revisa el freno y su cableado.",
   "Mira en el menú 5.9 'Lift Alarms' que la alarma de freno esté activa antes de resetear.",
   "Si vuelve, revisa la instalación completa."
  ],
  "peligro": "Una falla de freno puede dejar mover la cabina. No la pongas en servicio hasta resolverla.",
  "pieza": "freno",
  "fuente": "https://static.weg.net/medias/downloadcenter/h74/h2c/WEG-ADL300-Functions-descriptions-parameters-asynchronous-1S9FEN-en.pdf"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "EE",
  "nombre": "Falla de memoria EEPROM",
  "simple": "La tarjeta del operador no puede leer ni guardar su memoria.",
  "causas": [
   "Tarjeta del operador dañada",
   "Corte o bajón de luz justo mientras guardaba datos"
  ],
  "arreglo": [
   "Corta la luz, espera 1 minuto y vuelve a prenderla (reset).",
   "Si la falla vuelve, mírala con la herramienta WPT de Wittur.",
   "Si sigue, la tarjeta del operador está mala: llama a Wittur o cámbiala."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "OC",
  "nombre": "Sobrecorriente (pasa demasiada corriente)",
  "simple": "Pasó demasiada corriente y el operador se reinició o se apagó.",
  "causas": [
   "Corto en la parte de potencia de la tarjeta",
   "Corto en el motor o en el encoder (sensor de giro)",
   "Cable cortado o suelto, o falta una señal"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa los cables y conectores del motor y del encoder.",
   "Mide el motor con el multímetro y busca un corto.",
   "Cambia la tarjeta solo si el motor y los cables salen bien."
  ],
  "peligro": "La tarjeta tiene voltaje. Antes de tocarla, corta la luz.",
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "RS",
  "nombre": "Interruptor de referencia malo",
  "simple": "Falla el sensor que le dice al operador dónde está la puerta.",
  "causas": [
   "Imán muy lejos del sensor",
   "Sensor dañado",
   "Cable del sensor suelto"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa que entre el imán y el sensor haya 3 mm.",
   "Revisa el cable y el conector del sensor.",
   "Si no marca, cambia el sensor."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "IE",
  "nombre": "Falla interna del programa",
  "simple": "El programa interno de la tarjeta del operador tuvo un error.",
  "causas": [
   "Error del programa de la tarjeta",
   "Tarjeta dañada"
  ],
  "arreglo": [
   "Corta la luz, espera 1 minuto y vuelve a prenderla.",
   "Si la falla se repite, mírala con la herramienta WPT.",
   "Si sigue, llama a Wittur para actualizar o cambiar la tarjeta."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "AP",
  "nombre": "Falla del contador de posición (puerta de más de 3,5 m)",
  "simple": "El operador no encuentra el tope de la puerta y cree que mide más de 3,5 metros.",
  "causas": [
   "Falta el tope mecánico de la puerta o está flojo",
   "La puerta se patina y no llega al final",
   "Falla en el encoder (sensor de giro) o en su cable"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa que los topes de la puerta estén firmes.",
   "Mueve la puerta a mano: tiene que correr libre de punta a punta.",
   "Prende la luz y repite el aprendizaje (botón learn)."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "TS",
  "nombre": "Sensor de temperatura malo",
  "simple": "Falla el sensor que mide el calor del operador.",
  "causas": [
   "Sensor de temperatura dañado",
   "Tarjeta dañada"
  ],
  "arreglo": [
   "Corta la luz, espera y vuelve a prenderla.",
   "Si la falla vuelve, mírala con la herramienta WPT.",
   "Si sigue, llama a Wittur para cambiar la tarjeta."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "NE",
  "nombre": "Encoder no conectado",
  "simple": "La tarjeta no recibe nada del encoder (sensor de giro del motor).",
  "causas": [
   "Conector del encoder suelto o sin poner",
   "Cable del encoder cortado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa que los cables del motor y del encoder estén bien conectados, según el diagrama.",
   "Aprieta bien los conectores y busca cables pelados.",
   "Prende la luz y prueba la puerta."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "CF",
  "nombre": "Potenciómetro de fuerza de cierre malo",
  "simple": "Falla la perilla que regula la fuerza con que cierra la puerta.",
  "causas": [
   "Perilla (potenciómetro) dañada",
   "Perilla o conexión floja"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa la perilla de fuerza en la tarjeta.",
   "Regula la fuerza con un medidor de fuerza. En norma EN81 son máximo 150 N.",
   "Si la perilla está dañada, llama a Wittur."
  ],
  "peligro": "Si la puerta cierra con mucha fuerza, puede lastimar a un pasajero.",
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "ME",
  "nombre": "Falla de motor o de encoder",
  "simple": "Hay un problema en el motor de la puerta o en su encoder (sensor de giro).",
  "causas": [
   "Cable del motor o del encoder suelto o cortado",
   "Motor dañado",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa los cables del motor y del encoder, según el diagrama.",
   "Mide el motor con el multímetro.",
   "Si los cables están bien, llama a Wittur para cambiar el motor o el encoder."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "SS",
  "nombre": "Puerta trabada (falla de parada)",
  "simple": "La puerta está trabada y no se mueve.",
  "causas": [
   "Algo atascado en la pisadera (canal del piso)",
   "Roldanas o guiadores gastados o rotos",
   "Puerta de piso o patín enganchado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Limpia la pisadera y saca lo que esté atascado.",
   "Mueve la puerta a mano: tiene que correr libre.",
   "Revisa las roldanas, los guiadores y el patín."
  ],
  "pieza": "puerta_cabina",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "TH",
  "nombre": "Operador muy caliente",
  "simple": "El operador se calentó: primero baja la fuerza del motor y, si sigue calentando, se apaga para enfriarse.",
  "causas": [
   "Puerta dura o pesada que hace esforzar al motor",
   "Muchas aperturas seguidas",
   "Poca ventilación en el operador"
  ],
  "arreglo": [
   "Deja que el operador se enfríe.",
   "Corta la luz y mueve la puerta a mano: tiene que correr suave.",
   "Limpia la pisadera y revisa las roldanas.",
   "Revisa que el operador no esté tapado y le entre aire."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "FE",
  "nombre": "Aviso: se cambió a mano el movimiento del patín",
  "simple": "Es un aviso de que alguien cambió a mano el ajuste del patín (acoplador).",
  "causas": [
   "Alguien cambió el parámetro del patín con la herramienta"
  ],
  "arreglo": [
   "Revisa con la herramienta WPT que el ajuste del patín esté bien.",
   "Prueba la puerta: tiene que abrir y cerrar normal.",
   "Anota el cambio y borra la lista de errores."
  ],
  "pieza": "patin",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "ES",
  "nombre": "Señales del encoder fuera de rango",
  "simple": "Las señales del encoder (sensor de giro) llegan raras, fuera de lo normal.",
  "causas": [
   "Cable del encoder dañado o con falso contacto",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa el cable y el conector del encoder.",
   "Aleja el cable de los cables de fuerza.",
   "Si sigue, llama a Wittur para cambiar el encoder."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "BE",
  "nombre": "Motor no conectado",
  "simple": "Al arrancar no pasa corriente al motor, normalmente porque el motor no está conectado.",
  "causas": [
   "Conector del motor fuera del enchufe X4",
   "Cable del motor cortado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Conecta bien los cables del motor en el conector X4 de la tarjeta.",
   "Revisa que el cable del motor no esté cortado.",
   "Prende la luz y prueba la puerta."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "BM",
  "nombre": "Puerta trabada o girando al revés al arrancar",
  "simple": "Al arrancar, la puerta estaba trabada o el motor giró al revés.",
  "causas": [
   "Puerta trabada",
   "Sentido de giro del motor al revés"
  ],
  "arreglo": [
   "Corta la luz y revisa que la puerta corra libre.",
   "Prende la luz y aprieta el botón learn (aprendizaje).",
   "Si no hay interruptor de referencia, cambia el sentido de giro con doble clic en el botón learn."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "PS",
  "nombre": "Error en los parámetros",
  "simple": "Los ajustes (parámetros) guardados en la tarjeta tienen un error.",
  "causas": [
   "Parámetros mal cargados o dañados"
  ],
  "arreglo": [
   "Revisa los parámetros con la herramienta WPT.",
   "Corrige los ajustes que estén mal.",
   "Si no se arregla, llama a Wittur."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "STATE x1",
  "nombre": "LED STATE parpadea 1 vez",
  "simple": "Hay una falla en el motor o en el encoder (sensor de giro).",
  "causas": [
   "Cable del motor o del encoder suelto",
   "Motor o encoder dañado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa los cables del motor y del encoder.",
   "Lee el código exacto con la herramienta WPT."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "STATE x3",
  "nombre": "LED STATE parpadea 3 veces",
  "simple": "Hay una falla interna en la tarjeta del operador.",
  "causas": [
   "Tarjeta del operador con problema"
  ],
  "arreglo": [
   "Corta la luz, espera y vuelve a prenderla.",
   "Lee el código exacto con la herramienta WPT.",
   "Si sigue, llama a Wittur."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "STATE x4",
  "nombre": "LED STATE parpadea 4 veces",
  "simple": "La puerta está funcionando de forma anormal.",
  "causas": [
   "Puerta trabada o dura",
   "Algo atascado en la pisadera"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Mueve la puerta a mano y revisa que corra libre.",
   "Lee el código exacto con la herramienta WPT."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "STATE x5",
  "nombre": "LED STATE parpadea 5 veces",
  "simple": "Falló el aprendizaje (learn) de la puerta.",
  "causas": [
   "Puerta trabada durante el aprendizaje",
   "Topes o interruptor de referencia mal puestos"
  ],
  "arreglo": [
   "Revisa que la puerta corra libre de punta a punta.",
   "Revisa los topes y el imán del interruptor de referencia (3 mm).",
   "Haz el aprendizaje de nuevo con el botón learn."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "wittur_midi",
  "codigo": "WDOG",
  "nombre": "LED WDOG prendido",
  "simple": "El cerebro de la tarjeta (microcontrolador) dejó de funcionar.",
  "causas": [
   "Tarjeta colgada",
   "Tarjeta dañada"
  ],
  "arreglo": [
   "Corta la luz, espera 1 minuto y vuelve a prenderla.",
   "Si el LED WDOG sigue prendido, la tarjeta está mala: llama a Wittur."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1914528/Wittur-Midi.html"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "01",
  "nombre": "Sin señal del tablero principal (No MLC signal)",
  "simple": "El controlador de puertas no recibe las órdenes de abrir y cerrar (Ka y Kc) que manda el tablero.",
  "causas": [
   "Borne o cable suelto entre el tablero y el controlador de puertas",
   "Cable viajero con un hilo cortado",
   "El tablero no está mandando la señal"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa y aprieta los bornes Ka y Kc en el controlador de puertas y en el tablero.",
   "Con la luz prendida y mucho cuidado, mide con el multímetro si la señal llega cuando el tablero manda abrir o cerrar.",
   "Revisa los hilos del cable viajero."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "02",
  "nombre": "Protección por sobrecorriente o calentamiento del motor",
  "simple": "El motor de la puerta se esforzó demasiado y el controlador lo paró para protegerlo.",
  "causas": [
   "Puerta dura o trabada",
   "Muchas aperturas seguidas",
   "Corto en el motor o en su cable"
  ],
  "arreglo": [
   "Deja que el motor se enfríe.",
   "Corta la luz y mueve la puerta a mano: tiene que correr libre.",
   "Limpia la pisadera y revisa las roldanas.",
   "Mide el motor y su cable con el multímetro."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "03",
  "nombre": "Falla del sistema de reapertura",
  "simple": "La puerta avisó que había un obstáculo, pero el tablero no mandó la orden de reabrir, y la puerta sigue cerrando lento.",
  "causas": [
   "El tablero no lee la señal de obstáculo",
   "Cable o borne suelto entre el controlador de puertas y el tablero",
   "Tablero mal configurado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa los cables y bornes de la señal de obstáculo y de reapertura.",
   "Prueba poniendo un obstáculo: la puerta tiene que volver a abrir.",
   "Si el tablero no responde, llama al fabricante del tablero."
  ],
  "peligro": "La puerta puede golpear a una persona porque no vuelve a abrir.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "04",
  "nombre": "Motor invertido al encender",
  "simple": "Los cables del motor o del encoder están cruzados, y la puerta da un tirón y se para.",
  "causas": [
   "Cables del motor conectados al revés",
   "Canales del encoder (sensor de giro) cruzados"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa el orden de los cables del motor según el diagrama.",
   "Revisa los cables del encoder.",
   "Ojo: se resetea solo en unos 10 segundos, pero después de 5 intentos se bloquea."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "05",
  "nombre": "Tirón del encoder",
  "simple": "El controlador perdió la señal del encoder (sensor de giro) del motor.",
  "causas": [
   "Cable del encoder cortado",
   "Cable del motor cortado después de arrancar",
   "Conector del encoder puesto al revés"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa que el conector del encoder esté bien puesto y no al revés.",
   "Revisa los cables del encoder y del motor.",
   "Ojo: se resetea solo en 5 segundos, pero si pasa 5 veces en 5 minutos se bloquea."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "06",
  "nombre": "Protección del motor",
  "simple": "Se activó la protección del motor de la puerta.",
  "causas": [
   "Motor forzado porque la puerta está dura",
   "Motor recalentado"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Corta la luz y revisa que la puerta corra libre.",
   "Si se repite, mide el motor y llama a Wittur/Sematic."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "07",
  "nombre": "Tirón del motor",
  "simple": "Un cable del motor de la puerta se cortó.",
  "causas": [
   "Cable del motor cortado",
   "Conector del motor suelto"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa el cable y el conector del motor.",
   "Cambia o empalma bien el cable dañado.",
   "Ojo: se resetea solo en 5 segundos, pero si pasa 5 veces en 5 minutos se bloquea."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/2072634/Sematic-Sds-Dc-Pvm-Rel-3-0.html?page=24"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "08",
  "nombre": "Sobrevoltaje",
  "simple": "Al controlador de puertas le está llegando un voltaje muy alto.",
  "causas": [
   "Voltaje de la red muy alto",
   "Fuente o transformador del controlador con falla"
  ],
  "arreglo": [
   "Mide con el multímetro el voltaje que llega al controlador de puertas.",
   "Revisa la fuente o el transformador que lo alimenta.",
   "Ojo: la puerta pasa a velocidad lenta y se resetea sola, pero si pasa 5 veces en 5 minutos se bloquea."
  ],
  "peligro": "Mides con voltaje presente: usa guantes y herramientas aisladas.",
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2285840/Wittur-Sematic-Sds-Rel-3.html"
 },
 {
  "equipo": "sematic_sds",
  "codigo": "09",
  "nombre": "Disparo PWM (golpe de corriente)",
  "simple": "Hubo un golpe fuerte de corriente y el controlador cortó el motor.",
  "causas": [
   "Corto en el cable del motor",
   "Puerta trabada de golpe",
   "Controlador dañado"
  ],
  "arreglo": [
   "Corta la luz y bloquea el interruptor con candado.",
   "Revisa el cable del motor y busca un corto.",
   "Revisa que la puerta corra libre.",
   "Se borra solo cuando todo vuelve a la normalidad. Si se repite seguido, llama a Wittur/Sematic."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/2285840/Wittur-Sematic-Sds-Rel-3.html"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0001",
  "nombre": "Tiempo de viaje muy largo",
  "simple": "El ascensor se movió mucho rato sin que cambie la señal de piso (30/B30) y se paró de golpe.",
  "causas": [
   "Sensor de zona de puerta (30/B30) malogrado o sucio",
   "Imán de piso caído o movido",
   "Cable del sensor del techo de cabina flojo",
   "En hidráulicos KCM831: poco aceite"
  ],
  "arreglo": [
   "Corta la energía y bloquea el interruptor principal.",
   "Revisa el sensor de posición del techo de cabina y su cable.",
   "Revisa que los imanes de piso estén en su sitio.",
   "Vuelve a dar energía: esta falla se borra apagando y prendiendo."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/ | https://pdfcoffee.com/lce-fault-codesrev-ypdf-pdf-free.html"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0004",
  "nombre": "No encuentra su posición",
  "simple": "Hizo 3 viajes de búsqueda seguidos y no leyó bien las señales de frenado o de nivelación.",
  "causas": [
   "Sensor de nivelación sucio o malogrado",
   "Imán de nivelación movido",
   "Cable del sensor flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Limpia y revisa los sensores y los imanes del hueco.",
   "Revisa el cable del sensor en el techo de cabina.",
   "Da energía y deja que haga un viaje de corrección."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0021",
  "nombre": "Circuito de seguridad abierto",
  "simple": "Un contacto de seguridad está abierto y el ascensor se paró de golpe.",
  "causas": [
   "Botón de parada (stop) del foso o del techo apretado",
   "Limitador, paracaídas o amortiguador activado",
   "Cable suelto en la cadena de seguridad"
  ],
  "arreglo": [
   "Nunca puentees el circuito.",
   "Con energía cortada, revisa uno por uno: stop del foso, stop del techo, limitador y paracaídas.",
   "Mide con el multímetro dónde se corta la señal.",
   "Cierra el contacto abierto (o arregla su causa) y prueba."
  ],
  "peligro": "Nunca puentees un contacto de seguridad: el ascensor podría moverse sin protección.",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0022",
  "nombre": "Cerradura de puerta de piso abierta",
  "simple": "Se abrió el contacto de una puerta de piso mientras el ascensor viajaba.",
  "causas": [
   "Puerta de piso mal regulada",
   "Alguien abrió la puerta de piso con la llave",
   "Contacto de cerradura sucio o gastado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa las cerraduras piso por piso.",
   "Limpia y regula el contacto que falla.",
   "Nunca puentees la cerradura."
  ],
  "peligro": "Una puerta de piso abierta sin cabina detrás es riesgo de caída al hueco.",
  "pieza": "cerradura",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0023",
  "nombre": "Contacto de puerta de cabina abierto",
  "simple": "Se abrió el contacto de la puerta de cabina mientras viajaba.",
  "causas": [
   "Puerta de cabina mal regulada",
   "Contacto sucio o flojo",
   "Cable del contacto dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa y limpia el contacto de la puerta de cabina.",
   "Regula la puerta para que cierre completa.",
   "Prueba varias veces abriendo y cerrando."
  ],
  "pieza": "contacto_puerta_cabina",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0025",
  "nombre": "Falla de arranque (contactor principal)",
  "simple": "El contactor principal no se soltó cuando el ascensor paró, y por eso no arranca.",
  "causas": [
   "Contactor principal pegado",
   "Contacto auxiliar del contactor gastado",
   "Cable de aviso del contactor flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el contactor principal: debe soltarse libre.",
   "Mide su contacto auxiliar con el multímetro.",
   "Cambia el contactor si está pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0042",
  "nombre": "Sin luz en la cabina",
  "simple": "No llega energía a la luz de la cabina.",
  "causas": [
   "Llave o fusible de luz de cabina apagado",
   "Lámpara o fuente de luz malograda",
   "Cable de luz cortado"
  ],
  "arreglo": [
   "Revisa la llave y el fusible de luz de cabina en el tablero.",
   "Mide si llega voltaje al techo de cabina.",
   "Cambia la pieza malograda."
  ],
  "pieza": "cabina",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0044",
  "nombre": "No puede cerrar la puerta",
  "simple": "Intentó cerrar la puerta 5 veces y no pudo; queda abierta y no viaja.",
  "causas": [
   "Basura u objeto trabando la puerta",
   "Contacto de puerta mal regulado",
   "Operador de puertas con falla"
  ],
  "arreglo": [
   "Retira obstáculos y limpia la pisadera.",
   "Revisa los contactos de puerta de cabina y de piso.",
   "Revisa el operador de puertas.",
   "Borra la falla apagando o pasando a inspección."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0048",
  "nombre": "Reapertura activa más de 1 minuto",
  "simple": "La cortina de luz o el borde de seguridad estuvo activo más de un minuto, y la puerta queda abierta.",
  "causas": [
   "Algo tapando la cortina de luz",
   "Cortina sucia o desalineada",
   "Borde de seguridad pegado"
  ],
  "arreglo": [
   "Retira cualquier obstáculo de la puerta.",
   "Limpia los lentes de la cortina de luz.",
   "Revisa el borde de seguridad y su cable.",
   "Prueba que la puerta cierre normal."
  ],
  "pieza": "cortina_luminosa",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0049",
  "nombre": "Cierre de puerta demorado",
  "simple": "No llega a tiempo la señal de 'puerta cerrada' (final de cierre).",
  "causas": [
   "Final de cierre mal regulado o malogrado",
   "Puerta frenada por suciedad",
   "Cable del operador flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Limpia guías y pisadera.",
   "Revisa y regula el final de cierre del operador.",
   "Si se repite 5 veces aparecerá 0044."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0051",
  "nombre": "Arranque fallido",
  "simple": "El ascensor intentó arrancar 5 veces seguidas y no pudo.",
  "causas": [
   "Puerta de piso mal cerrada",
   "Pesacargas mal ajustado",
   "Parámetros del variador mal puestos o falla del variador"
  ],
  "arreglo": [
   "Revisa que todas las puertas cierren bien.",
   "Revisa el ajuste del pesacargas.",
   "Mira si hay fallas del variador (01xx) en el historial.",
   "Se recupera solo cuando la causa se corrige."
  ],
  "pieza": "cerradura",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0052",
  "nombre": "Señal de frenado de arriba y abajo a la vez",
  "simple": "Las señales de frenado de arriba (77:U) y de abajo (77:N) se activaron juntas y el ascensor se paró.",
  "causas": [
   "Imán de 77:U o 77:N mal ubicado",
   "Imán puesto al revés (polaridad)",
   "Sensor 77 o su cable en corto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa los imanes de arriba y de abajo del hueco: lugar y polaridad.",
   "Mira los LEDs 77:U, 77:N y 77:S en la tarjeta.",
   "Cambia el sensor si está malogrado."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=43"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0058",
  "nombre": "Orden de viaje sin arranque",
  "simple": "Recibió la orden de viajar pero no arrancó en 100 segundos.",
  "causas": [
   "El variador no dio salida",
   "Falla en contactores del motor",
   "Otra falla del variador guardada"
  ],
  "arreglo": [
   "Espera: el sistema reintenta solo a los 10 segundos.",
   "Si se repite, mira el historial por fallas 01xx.",
   "Con energía cortada, revisa los contactores del motor."
  ],
  "pieza": "variador",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0061",
  "nombre": "Cierre forzado muy largo",
  "simple": "La puerta demora demasiado en cerrar a la fuerza; tras 4 intentos sale 0044.",
  "causas": [
   "Obstáculo en la puerta",
   "Falla en el sistema de puertas de piso",
   "Operador de puertas desregulado"
  ],
  "arreglo": [
   "Retira obstáculos.",
   "Revisa las puertas de piso y sus roldanas.",
   "Revisa y regula el operador de puertas."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0071",
  "nombre": "Se perdió la señal de zona de puerta",
  "simple": "Pasó varios pisos y no vio la señal de zona de puerta (30/B30); llega al piso pero no abre.",
  "causas": [
   "Imán 30 caído o faltante",
   "Sensor 30/B30 malogrado",
   "Cable del sensor flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el imán de zona de puerta en cada piso.",
   "Revisa el sensor y su cable.",
   "Borra la falla apagando o pasando a inspección."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0072",
  "nombre": "Falla de señal 61U",
  "simple": "La señal del sensor de nivelación 61U se perdió o quedó pegada.",
  "causas": [
   "Sensor 61U sucio o malogrado",
   "Imán de nivelación movido",
   "Cable del sensor flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Limpia y revisa el sensor 61U.",
   "Revisa los imanes de nivelación.",
   "Cambia el sensor si no responde."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0073",
  "nombre": "Falla de señal 61N",
  "simple": "La señal del sensor de nivelación 61N se perdió o quedó pegada.",
  "causas": [
   "Sensor 61N sucio o malogrado",
   "Imán de nivelación movido",
   "Cable del sensor flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Limpia y revisa el sensor 61N.",
   "Revisa los imanes de nivelación.",
   "Cambia el sensor si no responde."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0074",
  "nombre": "Falla de señal 61N",
  "simple": "Hay un problema con la señal del sensor de nivelación 61N.",
  "causas": [
   "Sensor 61N sucio o malogrado",
   "Imán de nivelación movido",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el sensor 61N y sus imanes.",
   "Revisa el cable hasta la tarjeta."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0075",
  "nombre": "Falla de señal 61U",
  "simple": "Hay un problema con la señal del sensor de nivelación 61U.",
  "causas": [
   "Sensor 61U sucio o malogrado",
   "Imán de nivelación movido",
   "Cable flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el sensor 61U y sus imanes.",
   "Revisa el cable hasta la tarjeta."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0076",
  "nombre": "Relés de zona de puerta no se apagan",
  "simple": "Los relés de zona de puerta (K486, K443:1, K443:2) no se apagan cuando la cabina viaja.",
  "causas": [
   "Relé pegado",
   "Sensor de zona de puerta en corto",
   "Cable en corto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa los relés K486 y K443 en el tablero.",
   "Cambia el relé que esté pegado.",
   "Prueba un viaje completo."
  ],
  "peligro": "Estos relés permiten mover la cabina con puerta abierta cerca del piso; si quedan pegados hay riesgo.",
  "pieza": "tablero_control",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0077",
  "nombre": "Final de apertura malogrado",
  "simple": "No llega la señal de 'puerta totalmente abierta'; a los 15 segundos intenta cerrar.",
  "causas": [
   "Final de apertura malogrado",
   "Final mal regulado",
   "Cable del final flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el final de apertura del operador.",
   "Regúlalo o cámbialo."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0078",
  "nombre": "Botón de cabina pegado",
  "simple": "Un botón de la cabina quedó apretado más de 60 segundos y se ignoran las llamadas de cabina.",
  "causas": [
   "Botón trabado",
   "Botón sucio o roto",
   "Cable del botón en corto"
  ],
  "arreglo": [
   "Ubica el botón que queda encendido.",
   "Libéralo o límpialo.",
   "Cámbialo si está roto."
  ],
  "pieza": "botonera_cabina",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0079",
  "nombre": "Botón de piso pegado",
  "simple": "Un botón de llamada de piso quedó apretado más de 60 segundos y se ignoran esas llamadas.",
  "causas": [
   "Botón trabado",
   "Botón sucio o roto",
   "Cable del botón en corto"
  ],
  "arreglo": [
   "Ubica el botón de piso que queda encendido.",
   "Libéralo o límpialo.",
   "Cámbialo si está roto."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0083",
  "nombre": "Posición perdida",
  "simple": "La posición que calcula no coincide con las señales del hueco, y va al piso extremo para ubicarse.",
  "causas": [
   "Sensores 77:U, 77:N o 77:S fallando",
   "Imanes del hueco movidos o faltantes",
   "Cable de sensores flojo"
  ],
  "arreglo": [
   "Mira los LEDs de posición en la tarjeta.",
   "Con energía cortada, revisa sensores e imanes.",
   "Deja que haga su viaje de corrección."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=43"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0084",
  "nombre": "Final de apertura siempre activo",
  "simple": "El final de apertura dice 'puerta abierta' cuando no debe, y el ascensor se para.",
  "causas": [
   "Final de apertura malogrado",
   "Final mal regulado",
   "Cable en corto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el final de apertura del operador.",
   "Cámbialo si está malogrado."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0085",
  "nombre": "Bloqueo de apertura activado",
  "simple": "El switch de 'no abrir puertas' en la tarjeta LCECPU quedó activado y las puertas no abren.",
  "causas": [
   "Alguien dejó el switch de bloqueo activado"
  ],
  "arreglo": [
   "Pon el switch de bloqueo de puertas de la LCECPU en posición normal.",
   "Prueba que las puertas abran."
  ],
  "pieza": "tablero_control",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0086",
  "nombre": "Permiso de arranque pegado",
  "simple": "La señal de permiso de arranque se queda siempre encendida.",
  "causas": [
   "Relé o contactor pegado",
   "Error de cableado",
   "Cable en corto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Sigue el circuito con los planos del tablero.",
   "Cambia el relé que esté pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0089",
  "nombre": "Puerta de piso abierta sin cabina",
  "simple": "Una puerta de piso está abierta cuando la cabina no está en ese piso.",
  "causas": [
   "Cerradura de piso mal regulada",
   "Puerta abierta con llave",
   "Pesa o resorte de cierre roto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Ubica y cierra la puerta abierta; pon aviso.",
   "Revisa la cerradura y el cierre automático de esa puerta.",
   "Nunca puentees la cerradura."
  ],
  "peligro": "Riesgo de caída al hueco: cerca la zona antes de trabajar.",
  "pieza": "cerradura",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0111",
  "nombre": "Imán 61:N mal ubicado",
  "simple": "El imán del sensor 61:N está debajo del 61:U, en mal lugar.",
  "causas": [
   "Imanes de nivelación mal instalados",
   "Imán movido"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Mueve el imán 61:N a su lugar respecto al 61:U según el plano.",
   "Haz un viaje de prueba."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0112",
  "nombre": "Traslape 61:N / 61:U muy corto",
  "simple": "El cruce entre los imanes 61:N y 61:U es demasiado pequeño.",
  "causas": [
   "Imanes mal regulados",
   "Imán movido"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Ajusta el traslape de los imanes según los planos de la obra.",
   "Haz un viaje de prueba."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0128",
  "nombre": "Pesacargas sin configurar",
  "simple": "Falta hacer el ajuste del pesacargas.",
  "causas": [
   "Nunca se hizo el ajuste de peso",
   "Se borró la memoria"
  ],
  "arreglo": [
   "Haz el procedimiento de ajuste de peso (setup del pesacargas).",
   "Prueba con cabina vacía y con carga."
  ],
  "pieza": "pesacargas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0250",
  "nombre": "Aviso: contador de viajes casi lleno (falla 250)",
  "simple": "El contador de viajes al piso principal llegó a 475 000; sigue funcionando, pero hay que resetear la memoria.",
  "causas": [
   "Es normal: el contador llegó a su límite"
  ],
  "arreglo": [
   "Llama a un técnico capacitado en KONE: el reset borra todos los parámetros.",
   "Antes anota los parámetros de los menús 1, 3, 5, 7 y 8 y las marcas de pisos.",
   "Pon avisos de 'fuera de servicio' en todos los pisos.",
   "El reset es menú 1-99 = 2; luego repón parámetros y haz el viaje de aprendizaje (menú 5-2 = 1)."
  ],
  "peligro": "Si no anotas los parámetros antes, el ascensor queda mal configurado.",
  "pieza": "tablero_control",
  "fuente": "https://www.kone.com.au/Images/OM-Fault%20250%20251%20Recovery%20Instructions_tcm46-118266.pdf"
 },
 {
  "equipo": "kone_lce",
  "codigo": "0251",
  "nombre": "Contador de viajes lleno: fuera de servicio (falla 251)",
  "simple": "El contador llegó a 500 000 viajes al piso principal y el ascensor quedó fuera de servicio.",
  "causas": [
   "No se hizo el reset cuando salió el aviso 250"
  ],
  "arreglo": [
   "Llama a un técnico capacitado en KONE.",
   "Anota los parámetros de los menús 1, 3, 5, 7 y 8 antes de tocar nada.",
   "Reset de memoria en menú 1-99 = 2, repón parámetros y haz el viaje de aprendizaje (5-2 = 1)."
  ],
  "peligro": "El reset borra todos los parámetros; sin anotarlos el ascensor queda mal configurado.",
  "pieza": "tablero_control",
  "fuente": "https://www.kone.com.au/Images/OM-Fault%20250%20251%20Recovery%20Instructions_tcm46-118266.pdf"
 },
 {
  "equipo": "kone_lce",
  "codigo": "1101",
  "nombre": "Falla de tarjeta del techo de cabina (LCECCB)",
  "simple": "La tarjeta de conexiones del techo de cabina no funciona bien.",
  "causas": [
   "Tarjeta LCECCB dañada",
   "Error de cableado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa conectores y cables de la tarjeta del techo.",
   "Mide alimentación antes de cambiar la tarjeta.",
   "Cambia la LCECCB si está malograda."
  ],
  "pieza": "caja_techo",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "1201",
  "nombre": "Falla de 1ª tarjeta de extensión de botonera",
  "simple": "La primera tarjeta de extensión de la botonera de cabina (LCECEB) falla.",
  "causas": [
   "Puentes (jumpers) mal puestos",
   "Tarjeta LCECEB dañada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa la posición de los puentes de la tarjeta.",
   "Si están bien, cambia la LCECEB."
  ],
  "pieza": "botonera_cabina",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_lce",
  "codigo": "1202",
  "nombre": "Falla de 2ª tarjeta de extensión de botonera",
  "simple": "La segunda tarjeta de extensión de la botonera de cabina (LCECEB) falla.",
  "causas": [
   "Puentes (jumpers) mal puestos",
   "Tarjeta LCECEB dañada"
  ],
  "arreglo": [
   "Corta la energía.",
   "Revisa la posición de los puentes de la tarjeta.",
   "Si están bien, cambia la LCECEB."
  ],
  "pieza": "botonera_cabina",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0026",
  "nombre": "Falla del sistema de variador",
  "simple": "El variador detectó una falla o no se comunica con la tarjeta LCE; la luz V3F OK está apagada y no arranca.",
  "causas": [
   "Falla interna del variador",
   "Cable de comunicación LCE-variador flojo",
   "Contacto auxiliar de contactor del motor gastado"
  ],
  "arreglo": [
   "Mira la luz V3F OK y anota el subcódigo (botón Select).",
   "Corta la energía, espera y revisa cables entre LCE y variador.",
   "Limpia o cambia contactos auxiliares de los contactores del motor.",
   "Borra apagando o con inspección; si sigue, llama a KONE."
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=37 | http://www.gkbpq.com/m/View_Skill.asp?ID=229 | https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5533&type=thread"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0060",
  "nombre": "Señal del variador perdida en viaje",
  "simple": "La LCE no recibió la señal de arranque/aceleración del variador durante el viaje, y va al piso extremo.",
  "causas": [
   "Falla del variador",
   "Cable de señal variador-LCE flojo"
  ],
  "arreglo": [
   "Anota el subcódigo y otras fallas del historial.",
   "Corta la energía y revisa el cable entre variador y LCE.",
   "Borra apagando o con inspección."
  ],
  "pieza": "variador",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0101",
  "nombre": "Variador detenido",
  "simple": "El variador detectó una falla al arrancar y paró el ascensor.",
  "causas": [
   "Otra falla del variador (mira el historial)",
   "Contacto auxiliar de contactor gastado",
   "Problema en el hueco que frena la cabina"
  ],
  "arreglo": [
   "Anota el subcódigo (botón Select) y las otras fallas guardadas.",
   "Corta la energía y revisa los contactores del motor.",
   "Busca la causa según la otra falla que aparezca."
  ],
  "pieza": "variador",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229 | https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5533&type=thread"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0102",
  "nombre": "Sobrecorriente del motor",
  "simple": "El motor está pidiendo más corriente de la que aguanta.",
  "causas": [
   "Freno que no abre",
   "Algo trabando la cabina o la máquina",
   "Cables del motor dañados",
   "Datos del motor mal puestos en el variador"
  ],
  "arreglo": [
   "Anota el subcódigo (botón Select).",
   "Corta la energía, espera unos minutos y mide que no quede voltaje.",
   "Revisa que el freno abra bien.",
   "Revisa los cables del motor y la salida del variador."
  ],
  "peligro": "El variador guarda voltaje alto después de apagar: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229 | https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=49"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0103",
  "nombre": "Resistencia de frenado malograda",
  "simple": "La resistencia de frenado del variador está dañada.",
  "causas": [
   "Resistencia quemada o abierta",
   "Cable de la resistencia suelto"
  ],
  "arreglo": [
   "Corta la energía, espera y mide que no quede voltaje.",
   "Mide el valor de la resistencia con el multímetro.",
   "Cámbiala si está abierta o quemada."
  ],
  "peligro": "La resistencia puede estar muy caliente y con voltaje: espera y mide.",
  "pieza": "variador",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0104",
  "nombre": "Motor recalentado",
  "simple": "Saltó la protección de temperatura del motor.",
  "causas": [
   "Motor sobrecargado o con mucha corriente",
   "Termistor (sensor de calor) malogrado",
   "Mala ventilación de la máquina"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Revisa el termistor del motor y su cable.",
   "Revisa que la cabina no viaje con exceso de carga."
  ],
  "pieza": "maquina",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0105",
  "nombre": "Voltaje interno (DC) bajo",
  "simple": "El voltaje interno del variador está muy bajo.",
  "causas": [
   "Voltaje de la red bajo o falta una fase",
   "Diodo del rectificador malogrado",
   "Condensadores del variador débiles"
  ],
  "arreglo": [
   "Mide el voltaje de entrada en las 3 fases.",
   "Revisa fusibles y bornes de entrada.",
   "Si la red está bien, el variador necesita servicio técnico."
  ],
  "peligro": "Los condensadores guardan voltaje peligroso: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://novuselevator.com/kone-elevator-fault-codes/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229 | https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=46"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0106",
  "nombre": "Falla interna del variador",
  "simple": "El variador tiene una falla interna, se recalentó o no se comunica con la tarjeta LCECPU.",
  "causas": [
   "Variador recalentado",
   "Falla de comunicación con la LCECPU",
   "Falla interna del variador"
  ],
  "arreglo": [
   "Revisa ventilación y temperatura del variador.",
   "Corta la energía y revisa el cable de comunicación.",
   "Si sigue, el variador necesita servicio."
  ],
  "pieza": "variador",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0107",
  "nombre": "Falla del pesacargas",
  "simple": "La señal del pesacargas está fuera de lo normal.",
  "causas": [
   "Pesacargas desajustado",
   "Sensor de peso malogrado",
   "Cable del sensor dañado"
  ],
  "arreglo": [
   "Revisa el cable del pesacargas.",
   "Vuelve a ajustar el pesacargas.",
   "Cámbialo si no responde."
  ],
  "pieza": "pesacargas",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | http://www.gkbpq.com/m/View_Skill.asp?ID=229"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0108",
  "nombre": "Velocidad no coincide (motor / tacómetro)",
  "simple": "La velocidad medida no coincide con la velocidad pedida.",
  "causas": [
   "Tacómetro con polaridad invertida o malogrado",
   "Freno que no abre bien",
   "Mal balance cabina-contrapeso",
   "Parámetros del variador mal puestos"
  ],
  "arreglo": [
   "Anota el subcódigo de 4 cifras (botón Select).",
   "Revisa que el freno abra completo.",
   "Revisa el tacómetro o encoder y su cable.",
   "Revisa el balance y los parámetros."
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=48 | http://www.gkbpq.com/m/View_Skill.asp?ID=229 | https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0109",
  "nombre": "Variador perdió la posición",
  "simple": "El variador perdió la posición de la cabina y va al piso extremo a buscarla.",
  "causas": [
   "Sensores de posición 77 fallando",
   "Imanes movidos"
  ],
  "arreglo": [
   "Deja que haga el viaje al piso extremo.",
   "Si se repite, revisa sensores 77:U, 77:N, 77:S y sus imanes."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | https://www.manualslib.com/manual/1900331/Kone-Monospace-2-1-Series.html?page=43"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0110",
  "nombre": "Resistencia de frenado muy caliente",
  "simple": "Saltó el termostato de la resistencia de frenado y el ascensor queda fuera de servicio.",
  "causas": [
   "Resistencia recalentada",
   "Mala ventilación",
   "Mal balance de la cabina"
  ],
  "arreglo": [
   "Deja enfriar la resistencia.",
   "Revisa la ventilación del tablero.",
   "Revisa el termostato y su cable."
  ],
  "pieza": "variador",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0115",
  "nombre": "Problema de tacómetro",
  "simple": "El ajuste de voltaje del tacómetro está mal y la velocidad sale errada en el viaje de aprendizaje.",
  "causas": [
   "Ajuste de voltaje del tacómetro mal puesto"
  ],
  "arreglo": [
   "Corrige el ajuste de voltaje del tacómetro.",
   "Repite el viaje de aprendizaje del hueco."
  ],
  "pieza": "encoder",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/"
 },
 {
  "equipo": "kone_v3f",
  "codigo": "0125",
  "nombre": "Torque sobre el límite",
  "simple": "El motor necesita más fuerza de la permitida; se para y no arranca.",
  "causas": [
   "Parámetros del variador mal puestos",
   "Problema en la alimentación del motor",
   "Contacto auxiliar de contactor gastado"
  ],
  "arreglo": [
   "Revisa los parámetros del variador.",
   "Mide la alimentación del motor.",
   "Limpia o cambia contactos de los contactores del motor."
  ],
  "pieza": "variador",
  "fuente": "https://bdfujilift.com/elevator-fault-code-table-kone/ | https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5533&type=thread"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2001",
  "nombre": "Corriente muy alta (subcódigo de 0102)",
  "simple": "La corriente del variador al motor es demasiado alta.",
  "causas": [
   "Datos del motor mal puestos (parámetro 6_60)",
   "Freno que no abre",
   "Algo trabando el motor",
   "Circuito de medición de corriente malogrado"
  ],
  "arreglo": [
   "Compara la placa del motor con el parámetro 6_60.",
   "Revisa que el freno abra bien.",
   "Revisa trabas mecánicas en el hueco."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2002",
  "nombre": "Sobrecorriente DC (subcódigo de 0102)",
  "simple": "La corriente interna del variador es demasiado alta.",
  "causas": [
   "Parámetros del ascensor mal puestos",
   "Algo trabando el motor",
   "Pesacargas malogrado o su cable cortado"
  ],
  "arreglo": [
   "Revisa los parámetros del ascensor.",
   "Revisa trabas mecánicas en el hueco.",
   "Revisa la carga medida en cada piso (menú 5_1) y el cable del pesacargas."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2004",
  "nombre": "Motor caliente o termistor desconectado (subcódigo de 0104)",
  "simple": "El motor está muy caliente o su sensor de calor (termistor) está desconectado.",
  "causas": [
   "Motor recalentado",
   "Termistor PTC o NTC malogrado",
   "Cable del termistor cortado",
   "Límite de temperatura mal puesto (6_67)"
  ],
  "arreglo": [
   "Deja enfriar el motor.",
   "Mira la temperatura en 6_75_45 (NTC da grados; PTC da rayas).",
   "Revisa el termistor y su cable."
  ],
  "pieza": "maquina",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2005",
  "nombre": "Motor sobrecargado (subcódigo de 0104)",
  "simple": "El motor trabajó con sobrecarga.",
  "causas": [
   "Límites de corriente mal puestos (6_68 y 6_69)",
   "Problema mecánico en el ascensor",
   "Parámetros mal puestos"
  ],
  "arreglo": [
   "Revisa los límites 6_68 y 6_69.",
   "Revisa la parte mecánica (guías, freno, balance).",
   "Si sale muchas veces aparecerá 1035."
  ],
  "pieza": "maquina",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "1035",
  "nombre": "Demasiadas sobrecargas del motor (subcódigo de 0104)",
  "simple": "La falla 2005 de sobrecarga salió demasiadas veces y el ascensor se bloquea.",
  "causas": [
   "Límites de sobrecarga mal puestos (6_68, 6_69)",
   "Tipo de motor mal elegido (6_60)",
   "Problema mecánico"
  ],
  "arreglo": [
   "Revisa los parámetros 6_60, 6_68 y 6_69.",
   "Revisa la parte mecánica del ascensor.",
   "Corrige la causa antes de resetear."
  ],
  "pieza": "maquina",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2006",
  "nombre": "Voltaje DC fuera de rango (subcódigo de 0105)",
  "simple": "El voltaje interno está muy bajo (menos de 300 V, dato 1) o muy alto (más de 800 V, dato 2).",
  "causas": [
   "Falta una fase en la entrada",
   "Resistencia de frenado equivocada o malograda",
   "Fusible interno de carga quemado"
  ],
  "arreglo": [
   "Mira el dato 1: 1 = bajo, 2 = alto.",
   "Mide las 3 fases de entrada.",
   "Revisa la resistencia de frenado.",
   "Si es el fusible interno, el variador necesita servicio."
  ],
  "peligro": "Hay hasta 800 V internos: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "1001",
  "nombre": "Demasiadas fallas de velocidad (subcódigo de 0106)",
  "simple": "Salieron demasiadas fallas de velocidad 2009 o 2013 y el ascensor se bloquea.",
  "causas": [
   "Tacómetro o encoder mal conectado",
   "Malla (blindaje) del cable dañada",
   "Parámetros mal puestos"
  ],
  "arreglo": [
   "Revisa la conexión del tacómetro o encoder.",
   "Revisa la malla del cable.",
   "Revisa parámetros (el contador está en 6_31)."
  ],
  "pieza": "encoder",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "1002",
  "nombre": "Supervisión de resistencia de frenado (subcódigo de 0103)",
  "simple": "Hay un problema con la resistencia de frenado o su transistor.",
  "causas": [
   "Resistencia desconectada o malograda",
   "Cableado de la resistencia mal hecho",
   "Resistencia de tipo equivocado",
   "Transistor de frenado malogrado"
  ],
  "arreglo": [
   "Corta la energía, espera y mide que no quede voltaje.",
   "Revisa la conexión y el cable de la resistencia.",
   "Confirma que sea el modelo correcto."
  ],
  "peligro": "Puede quedar voltaje alto: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2008",
  "nombre": "Falla del pesacargas (subcódigo de 0107)",
  "simple": "El pesacargas (LWD) está fallando.",
  "causas": [
   "Sensor de peso malogrado",
   "Cable del sensor dañado"
  ],
  "arreglo": [
   "Revisa el cable del pesacargas.",
   "Mide la señal del sensor.",
   "Cámbialo si no responde."
  ],
  "pieza": "pesacargas",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2009",
  "nombre": "Diferencia de velocidad (subcódigo de 0108)",
  "simple": "La velocidad que lee el encoder no coincide con la pedida.",
  "causas": [
   "Parámetros mal puestos",
   "Encoder flojo o cable sin malla",
   "Freno que no abre bien o mal balance",
   "Se abrió la cadena de seguridad en viaje"
  ],
  "arreglo": [
   "Revisa los parámetros.",
   "Revisa que el encoder esté bien fijo.",
   "Revisa la malla del cable del encoder.",
   "Revisa el balance cabina-contrapeso."
  ],
  "pieza": "encoder",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2013",
  "nombre": "Doble control de velocidad (subcódigo de 0108)",
  "simple": "La velocidad del encoder no coincide con la frecuencia del motor.",
  "causas": [
   "Parámetros mal puestos",
   "Encoder flojo o cable dañado",
   "Se abrió la cadena de seguridad en viaje"
  ],
  "arreglo": [
   "Revisa los parámetros.",
   "Revisa que el encoder esté bien fijo.",
   "Revisa la malla del cable del encoder."
  ],
  "pieza": "encoder",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2020",
  "nombre": "Estado del contactor principal",
  "simple": "El contactor 201:1 no se activó al arrancar o quedó pegado después del viaje.",
  "causas": [
   "Contactor 201:1 pegado",
   "Contactor malogrado",
   "Contacto auxiliar sucio"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el contactor 201:1.",
   "Cámbialo si está pegado.",
   "(Vale para software 2.04 o más antiguo.)"
  ],
  "pieza": "tablero_control",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2049",
  "nombre": "Falla interna del variador (subcódigo de 0102)",
  "simple": "El variador vio un pulso de falla muy corto, un corte breve o una interferencia fuerte (como un rayo).",
  "causas": [
   "Mala puesta a tierra",
   "Malla de cables dañada",
   "Interferencia externa"
  ],
  "arreglo": [
   "Revisa la puesta a tierra del variador.",
   "Revisa la malla de los cables.",
   "Si sigue, hay que cambiar el variador."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2057",
  "nombre": "Falla del encoder del motor",
  "simple": "El encoder del motor no da señal.",
  "causas": [
   "Encoder desconectado",
   "Encoder malogrado",
   "Cable del encoder dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el cable y los conectores del encoder.",
   "Cambia el encoder si sigue fallando."
  ],
  "pieza": "encoder",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2072",
  "nombre": "Prueba de freno fallida",
  "simple": "Durante la prueba de freno el encoder vio que el motor se movió.",
  "causas": [
   "Freno gastado o desregulado",
   "Cableado del freno",
   "Mal balance de cabina (un solo freno no la sostiene)"
  ],
  "arreglo": [
   "No pongas el ascensor en servicio.",
   "Revisa el freno, su regulación y su cable.",
   "Revisa el balance cabina-contrapeso.",
   "Llama a KONE si el freno no sostiene."
  ],
  "peligro": "Si el freno no sostiene, la cabina puede moverse sola. Deja el ascensor fuera de servicio.",
  "pieza": "freno",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2074",
  "nombre": "Protección de transistores del motor (subcódigo de 0102)",
  "simple": "Hay un corto en la salida del variador o en el motor.",
  "causas": [
   "Corto en la salida del variador",
   "Motor o bobina en corto",
   "Transistor (IGBT) malogrado"
  ],
  "arreglo": [
   "Corta la energía, espera y mide que no quede voltaje.",
   "Revisa los cables y bornes del motor.",
   "Mide el aislamiento del motor.",
   "Si el IGBT está malo, el variador necesita servicio."
  ],
  "peligro": "Voltaje alto guardado en el variador: espera y mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2075",
  "nombre": "Protección del transistor de frenado",
  "simple": "Hay un corto en la resistencia de frenado o en su cable.",
  "causas": [
   "Resistencia de frenado en corto",
   "Cable de la resistencia en corto",
   "Transistor (IGBT) malogrado"
  ],
  "arreglo": [
   "Corta la energía, espera y mide que no quede voltaje.",
   "Revisa la resistencia de frenado y su cable.",
   "Si el IGBT está malo, el variador necesita servicio."
  ],
  "peligro": "Voltaje alto guardado en el variador: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2076",
  "nombre": "Voltaje de control fuera de rango",
  "simple": "El voltaje de control del variador está fuera de 18-36 V.",
  "causas": [
   "Fuente de 24 V malograda",
   "Cable de 24 V flojo"
  ],
  "arreglo": [
   "Mide los 24 V que llegan al variador.",
   "Revisa la fuente y su cable.",
   "Cambia la fuente si está fuera de rango."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2077",
  "nombre": "Transistor de frenado sobrecargado",
  "simple": "El transistor de frenado trabajó de más.",
  "causas": [
   "Resistencia de frenado equivocada",
   "Variador muy chico para el ascensor"
  ],
  "arreglo": [
   "Confirma que la resistencia de frenado sea la correcta.",
   "Confirma que el modelo de variador sea el correcto.",
   "Consulta con KONE si hay que cambiarlo."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2104",
  "nombre": "Corriente del freno muy baja",
  "simple": "Al abrir el freno, la corriente que pasa es muy baja.",
  "causas": [
   "Bobina del freno malograda",
   "Cable del freno flojo",
   "Tarjeta de control del freno malograda"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el cable y los bornes del freno.",
   "Mide la bobina del freno.",
   "Revisa la tarjeta de control del freno."
  ],
  "pieza": "freno",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2110",
  "nombre": "Riesgo de movimiento (freno)",
  "simple": "El control vio riesgo de que la cabina se mueva por un problema del freno.",
  "causas": [
   "Freno de la máquina con falla",
   "Abertura (entrehierro) del freno mal regulada",
   "Cableado mal hecho"
  ],
  "arreglo": [
   "Deja el ascensor fuera de servicio.",
   "Revisa la regulación del freno.",
   "Revisa el cableado del freno.",
   "Llama a KONE si no se corrige."
  ],
  "peligro": "Riesgo de que la cabina se mueva sola: no lo pongas en servicio.",
  "pieza": "freno",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2111",
  "nombre": "Riesgo de movimiento al arrancar o parar",
  "simple": "Al arrancar o parar se vio corriente en el freno cuando no debía.",
  "causas": [
   "Controlador de freno del variador con falla"
  ],
  "arreglo": [
   "Deja el ascensor fuera de servicio.",
   "Revisa el controlador de freno del variador.",
   "Llama a KONE."
  ],
  "peligro": "Puede abrir el freno sin querer y mover la cabina.",
  "pieza": "freno",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "3069",
  "nombre": "Falla de tarjeta ECB-1 (aviso)",
  "simple": "La tarjeta ECB-1 tiene un problema.",
  "causas": [
   "Error de cableado",
   "Cable dañado",
   "Fusible quemado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el cableado y los fusibles de la ECB-1.",
   "Cambia el fusible o cable dañado."
  ],
  "pieza": "variador",
  "fuente": "http://www.gkbpq.com/m/View_News.asp?ID=273"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2012",
  "nombre": "Señal de velocidad saturada (KDM)",
  "simple": "La señal de velocidad se saturó porque el encoder no está conectado o está malogrado.",
  "causas": [
   "Encoder desconectado",
   "Encoder malogrado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa la conexión del encoder.",
   "Cambia el encoder si está malogrado."
  ],
  "pieza": "encoder",
  "fuente": "http://www.gkbpq.com/View_News.asp?ID=272"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "1040",
  "nombre": "Retorno del freno: levantado (KDM)",
  "simple": "Los switches del freno (entrada 1, 2 o ambas) dicen 'freno abierto' cuando no deben.",
  "causas": [
   "Switch del freno malogrado o desregulado",
   "Cable del switch dañado",
   "Freno con falla"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa los switches del freno y su cable.",
   "Revisa el freno y su cableado."
  ],
  "pieza": "micro_freno",
  "fuente": "http://www.gkbpq.com/View_News.asp?ID=272"
 },
 {
  "equipo": "kone_kdl",
  "codigo": "2105",
  "nombre": "Estado del freno en marcha (KDM)",
  "simple": "El control del freno falló o su cable está cortado.",
  "causas": [
   "Control del freno malogrado",
   "Cable cortado entre DCBG y el control del freno"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el cable desde la DCBG al control del freno.",
   "Revisa el control del freno."
  ],
  "pieza": "freno",
  "fuente": "http://www.gkbpq.com/View_News.asp?ID=272"
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
 },
 {
  "equipo": "gecb",
  "codigo": "0001",
  "nombre": "S/W Reset",
  "simple": "La tarjeta GECB se reinició sola porque saltó su vigilancia interna.",
  "causas": [
   "Ruido eléctrico o tierra (masa) floja",
   "Bajón de voltaje en la alimentación de la tarjeta",
   "Falla de software o de la tarjeta"
  ],
  "arreglo": [
   "Anota cuántas veces pasa y en qué momento.",
   "Corta la energía y bloquea con candado; revisa que tierras y conectores de la tarjeta estén firmes.",
   "Mide la alimentación de la tarjeta con el multímetro.",
   "Si se repite seguido, consulta a Otis antes de cambiar la tarjeta."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0003",
  "nombre": "CanTxFull",
  "simple": "La tarjeta no puede enviar mensajes por la red CAN (el cable de datos entre tarjetas).",
  "causas": [
   "Cable o conector CAN suelto o dañado",
   "Otra tarjeta de la red apagada o con falla",
   "Interferencia eléctrica"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa conectores y cable CAN entre tarjetas.",
   "Al volver a encender, mira los LED de CAN de las tarjetas.",
   "Si sigue, llama a soporte Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0004",
  "nombre": "CanBusOff",
  "simple": "La red CAN (cable de datos entre tarjetas) se cayó y se reinició.",
  "causas": [
   "Cable o conector CAN flojo",
   "Tarjeta de la red con falla",
   "Interferencia eléctrica"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Ajusta y limpia los conectores CAN.",
   "Revisa que el cable no esté pelado ni junto a cables de fuerza.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0006",
  "nombre": "StackCheck",
  "simple": "Error interno de memoria en la tarjeta; la tarjeta se reinicia.",
  "causas": [
   "Falla de software",
   "Tarjeta dañada",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Anota cuándo pasa.",
   "Revisa alimentación y tierra de la tarjeta.",
   "Pide a Otis revisar la versión de software antes de cambiar la tarjeta."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0012",
  "nombre": "Power On",
  "simple": "Solo es un aviso: la tarjeta de control se encendió. No es falla.",
  "causas": [
   "Alguien encendió el tablero",
   "Volvió la luz después de un corte"
  ],
  "arreglo": [
   "No necesita arreglo.",
   "Si aparece muchas veces sin que nadie apague, revisa la alimentación del tablero."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0014",
  "nombre": "PowerOffOn",
  "simple": "Hubo un corte de luz muy corto (un parpadeo).",
  "causas": [
   "Red eléctrica inestable",
   "Borne flojo en la alimentación del tablero"
  ],
  "arreglo": [
   "Con energía cortada y bloqueada, ajusta los bornes del interruptor principal.",
   "Mide el voltaje de la red en varios momentos.",
   "Si el problema es la red, avisa a la administración del edificio."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0019",
  "nombre": "MissedLvInt",
  "simple": "La tarjeta no recibió las señales LV1 y LV2 de los sensores de nivel de piso.",
  "causas": [
   "Sensor LV sucio o dañado",
   "Paleta o imán de piso desalineado",
   "Cable del sensor cortado"
  ],
  "arreglo": [
   "Pon el ascensor en inspección y trabaja desde el techo de cabina con seguridad.",
   "Limpia y revisa los sensores LV1 y LV2.",
   "Revisa la alineación de paletas o imanes en cada piso.",
   "Revisa el cable del sensor hasta el tablero."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0100",
  "nombre": "OpMode NAV",
  "simple": "El ascensor quedó fuera de servicio (NAV) por una falla del variador. También puede salir al reiniciar después del mantenimiento.",
  "causas": [
   "Falla en el variador",
   "Reinicio después de mantenimiento"
  ],
  "arreglo": [
   "Con el Service Tool, entra al registro de fallas del variador.",
   "Busca y atiende ese código del variador.",
   "Si solo fue un reinicio, verifica que el ascensor vuelva a normal."
  ],
  "pieza": "variador",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0101",
  "nombre": "EPO shutdown",
  "simple": "El ascensor no puede correr porque está activa la operación con energía de emergencia (EPO).",
  "causas": [
   "El edificio está con generador o energía de emergencia",
   "Señal EPO activada por error de cableado"
  ],
  "arreglo": [
   "Pregunta si el edificio está con energía de emergencia.",
   "Si no lo está, corta la energía, bloquea y revisa el cable de la señal EPO.",
   "Si no encuentras la causa, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0102",
  "nombre": "OpMode DTC",
  "simple": "La puerta no terminó de cerrar en el tiempo esperado.",
  "causas": [
   "Basura u obstáculo en la pisadera",
   "Contacto de puerta (DW o DFC) o final de cierre (DCL) mal regulado",
   "Operador de puertas con poca fuerza"
  ],
  "arreglo": [
   "Limpia la pisadera y los guiadores.",
   "Con energía cortada y bloqueada, mueve la puerta a mano: debe correr suave.",
   "Revisa y regula los contactos DW, DFC y DCL.",
   "Prueba varios cierres antes de dejarlo en servicio."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0103",
  "nombre": "OpMode DTO",
  "simple": "La puerta no terminó de abrir a tiempo; no llega la señal DOL (puerta abierta).",
  "causas": [
   "Final de apertura DOL mal regulado o dañado",
   "Puerta trabada o dura",
   "Falla del operador de puertas"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Mueve la puerta a mano: debe abrir libre.",
   "Revisa el sensor o contacto DOL y su cable.",
   "Prueba la apertura varias veces."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0104",
  "nombre": "OpMode DCP",
  "simple": "La cabina no pudo atender una llamada a tiempo (por ejemplo, alguien abrió la puerta a mano).",
  "causas": [
   "Puerta abierta o forzada a mano",
   "Algo mantiene la puerta abierta"
  ],
  "arreglo": [
   "Revisa si alguien forzó las puertas.",
   "Revisa contactos de puerta de cabina y de piso.",
   "Si se repite sin motivo, revisa las cerraduras."
  ],
  "pieza": "puerta_cabina",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0107",
  "nombre": "DS bypass",
  "simple": "Se anuló el circuito de cerraduras por el servicio de bomberos (señal DDSRC).",
  "causas": [
   "Modo bomberos activado",
   "Señal DDSRC activa por error de cableado"
  ],
  "arreglo": [
   "Confirma si el modo bomberos está activo y por qué.",
   "Con energía cortada y bloqueada, revisa el cable de esa entrada.",
   "Nunca dejes puentes en cerraduras.",
   "Si no se aclara, llama a Otis."
  ],
  "peligro": "Con las cerraduras anuladas la cabina puede moverse con puertas abiertas. No uses el ascensor hasta aclararlo.",
  "pieza": "cerradura",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0109",
  "nombre": "Stuck DCB",
  "simple": "El botón de cerrar puerta de la cabina está trabado (siempre presionado).",
  "causas": [
   "Pulsador pegado o sucio",
   "Cable del botón en corto"
  ],
  "arreglo": [
   "Prueba el botón: debe volver solo.",
   "Limpia o cambia el pulsador.",
   "Con energía cortada, revisa el cable del botón."
  ],
  "pieza": "botonera_cabina",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0110",
  "nombre": "Stuck RDCB",
  "simple": "El botón de cerrar la puerta trasera está trabado (siempre presionado).",
  "causas": [
   "Pulsador pegado o sucio",
   "Cable del botón en corto"
  ],
  "arreglo": [
   "Prueba el botón de la puerta trasera.",
   "Limpia o cambia el pulsador.",
   "Con energía cortada, revisa el cable."
  ],
  "pieza": "botonera_cabina",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0120",
  "nombre": "NOR > 5 min",
  "simple": "El ascensor lleva más de 5 minutos en normal sin moverse; puede haber un dispositivo de reapertura trabado.",
  "causas": [
   "Cortina luminosa o fotocélula tapada o sucia",
   "Botón de abrir puerta pegado"
  ],
  "arreglo": [
   "Revisa y limpia la cortina luminosa; verifica que esté alineada.",
   "Prueba el botón de abrir puerta.",
   "Prueba que la puerta cierre normal."
  ],
  "pieza": "cortina_luminosa",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0201",
  "nombre": "Correct",
  "simple": "La cabina hace un viaje de corrección para encontrar su posición.",
  "causas": [
   "Corte de luz o reinicio",
   "La cabina perdió su posición"
  ],
  "arreglo": [
   "Espera a que termine el viaje de corrección.",
   "Si se repite seguido, revisa sensores de nivel y paletas de piso."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0202",
  "nombre": "/ES in FR",
  "simple": "Se abrió la cadena de seguridad (ES) mientras la cabina viajaba rápido.",
  "causas": [
   "Un contacto de seguridad se abrió (puerta, stop, limitador, paracaídas)",
   "Contacto flojo que se abre con la vibración",
   "Cable dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Recorre los contactos de la cadena de seguridad y mide continuidad por tramos.",
   "Ajusta o cambia el contacto malo.",
   "Prueba en inspección antes de pasar a normal."
  ],
  "peligro": "Nunca puentees la cadena de seguridad para hacer correr el ascensor.",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0203",
  "nombre": "/ES in SR",
  "simple": "Se abrió la cadena de seguridad (ES) mientras la cabina frenaba para llegar al piso.",
  "causas": [
   "Contacto de seguridad abierto",
   "Contacto flojo",
   "Cable dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Mide continuidad de la cadena por tramos.",
   "Ajusta o cambia el contacto malo.",
   "Prueba en inspección."
  ],
  "peligro": "Nunca puentees la cadena de seguridad.",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0204",
  "nombre": "TCI/ERO on",
  "simple": "Aviso: se activó la inspección de techo (TCI) o la maniobra de rescate (ERO).",
  "causas": [
   "Un técnico está trabajando en inspección",
   "El selector quedó en inspección"
  ],
  "arreglo": [
   "Si nadie está trabajando, devuelve el selector a normal en el orden correcto.",
   "Verifica que el ascensor vuelva a normal."
  ],
  "pieza": "caja_inspeccion",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0205",
  "nombre": "SE Fault",
  "simple": "La cabina no puede arrancar porque falta la señal SE (permiso de arranque; la cadena de seguridad no está completa).",
  "causas": [
   "Bypass de puertas con falla",
   "Contacto de cerradura abierto o sucio",
   "Sensores fotoeléctricos de nivel con falla o mal ubicados"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el bypass de puertas y las cerraduras.",
   "Revisa los sensores de nivel 1LV/2LV (una guía pide que estén a menos de 30 mm).",
   "Revisa que los switches SW6, SW7 y SW8 de la tarjeta GECB estén en ON."
  ],
  "pieza": "cerradura",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0210",
  "nombre": "/DZ in NST",
  "simple": "Se perdió la señal de zona de puerta (DZ) con la cabina parada.",
  "causas": [
   "No llegan las señales 1LV/2LV al variador",
   "Comunicación CAN caída",
   "Falló la autoprueba ETSD"
  ],
  "arreglo": [
   "Revisa los sensores 1LV/2LV y su cable.",
   "Revisa el cable CAN y los LED de CAN.",
   "Si falla la autoprueba ETSD, consulta a Otis."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0211",
  "nombre": "/DFC in FR",
  "simple": "Se abrió el contacto de puertas (DFC) mientras la cabina viajaba rápido.",
  "causas": [
   "Cerradura de piso mal regulada",
   "Alguien abrió una puerta de piso",
   "Contacto sucio o flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa cerraduras y contactos de todas las puertas de piso.",
   "Ajusta el enganche de la cerradura que falle.",
   "Prueba en inspección."
  ],
  "peligro": "Nunca puentees cerraduras ni contactos de puerta.",
  "pieza": "cerradura",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0212",
  "nombre": "/DFC in SR",
  "simple": "Se abrió el contacto de puertas (DFC) mientras la cabina frenaba.",
  "causas": [
   "Cerradura mal regulada",
   "Contacto sucio o flojo",
   "Puerta de piso golpeada"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa cerraduras y contactos de puerta.",
   "Ajusta o cambia el contacto malo.",
   "Prueba en inspección."
  ],
  "peligro": "Nunca puentees cerraduras ni contactos de puerta.",
  "pieza": "cerradura",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0214",
  "nombre": "DrvStuckPtr",
  "simple": "El variador se quedó en 'preparando para correr' y no avanzó.",
  "causas": [
   "Falla dentro del variador",
   "Problema de comunicación entre control y variador"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador con el Service Tool.",
   "Revisa el cable de comunicación.",
   "Si no hay causa clara, consulta a Otis."
  ],
  "pieza": "variador",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0215",
  "nombre": "DrvStuckRtr",
  "simple": "El variador se quedó en 'listo para correr' y no arrancó.",
  "causas": [
   "Falla dentro del variador",
   "Problema de comunicación entre control y variador"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador.",
   "Revisa el cable de comunicación.",
   "Si no hay causa clara, consulta a Otis."
  ],
  "pieza": "variador",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0216",
  "nombre": "DrvBrakeErr",
  "simple": "El freno no se abrió.",
  "causas": [
   "No llega voltaje a la bobina del freno",
   "Freno pegado o mal regulado",
   "Cable o micro del freno con falla"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el cable de la bobina del freno.",
   "Revisa que el freno no esté pegado y que su abertura esté bien.",
   "Mide el voltaje del freno solo con cuidado y con otra persona."
  ],
  "peligro": "El freno sujeta la cabina. No lo desarmes sin asegurar cabina y contrapeso.",
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0217",
  "nombre": "DrvCreepErr",
  "simple": "La cabina demoró demasiado en llegar despacio al piso.",
  "causas": [
   "Sensores de nivel mal ubicados",
   "Freno que roza",
   "Ajuste de nivelación"
  ],
  "arreglo": [
   "Revisa sensores de nivel y paletas.",
   "Revisa que el freno no roce.",
   "Si sigue, pide a Otis revisar los ajustes."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0218",
  "nombre": "DrvShutdown",
  "simple": "El variador se apagó por una falla.",
  "causas": [
   "Se perdió la comunicación CAN",
   "Falla propia del variador"
  ],
  "arreglo": [
   "Revisa el cable CAN y los LED de CAN.",
   "Lee el registro de fallas del variador con el Service Tool y busca ese código.",
   "Antes de tocar el variador, corta, bloquea y espera a que se descargue."
  ],
  "peligro": "El variador guarda alto voltaje después de apagarlo. Espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0222",
  "nombre": "1TH Fault",
  "simple": "Se calentó la resistencia de frenado (DBR): se abrió su contacto térmico y el variador se apaga para enfriar.",
  "causas": [
   "Mucho tráfico seguido",
   "Mala ventilación",
   "Resistencia o cable dañado"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa la ventilación del cuarto o tablero.",
   "Con energía cortada, revisa la resistencia y el contacto 1TH."
  ],
  "peligro": "La resistencia de frenado quema. No la toques caliente.",
  "pieza": "variador",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0223",
  "nombre": "2TH Fault",
  "simple": "Se abrió el contacto térmico 2TH (protección por calor).",
  "causas": [
   "Recalentamiento",
   "Contacto o cable 2TH abierto"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Con energía cortada, revisa el cable del contacto 2TH.",
   "Si sigue abierto en frío, revisa el sensor."
  ],
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0224",
  "nombre": "DrvEndRun",
  "simple": "El variador no pudo terminar el viaje.",
  "causas": [
   "Falla en el variador",
   "Problema de posición al llegar"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador.",
   "Revisa sensores de nivel.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "variador",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0225",
  "nombre": "110VAC dead",
  "simple": "Faltó la tensión de 110 VAC por 5 segundos (también sale cuando se apaga el tablero).",
  "causas": [
   "Fusible o breaker de 110 V abierto",
   "Transformador con falla",
   "Corte general de luz"
  ],
  "arreglo": [
   "Si fue un apagado normal, no hagas nada.",
   "Busca dónde falta el voltaje: mide 110 VAC con cuidado.",
   "Con energía cortada, revisa fusibles y transformador."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0226",
  "nombre": "LS-fault",
  "simple": "La señal de los interruptores 1LS/2LS (de desaceleración en los extremos) está anormal.",
  "causas": [
   "Interruptor dañado o mal ubicado",
   "Leva o rampa desalineada",
   "Cable cortado"
  ],
  "arreglo": [
   "En inspección, revisa 1LS y 2LS.",
   "Verifica que actúen en el lugar correcto.",
   "Revisa el cable hasta el tablero."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0227",
  "nombre": "110VAC died and came back",
  "simple": "La tensión de 110 VAC se cortó y volvió antes de apagarse todo.",
  "causas": [
   "Bajón de la red",
   "Borne flojo"
  ],
  "arreglo": [
   "Con energía cortada, ajusta bornes de la alimentación.",
   "Mide la red en distintos momentos."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0228",
  "nombre": "1LS+2LS on",
  "simple": "Los interruptores 1LS y 2LS están activos al mismo tiempo (eso no puede pasar).",
  "causas": [
   "Un interruptor pegado",
   "Cable en corto",
   "Interruptor mal ubicado"
  ],
  "arreglo": [
   "En inspección, revisa 1LS y 2LS.",
   "Cambia el interruptor pegado.",
   "Revisa el cable."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.hselevatorparts.com/news/otis-elevator-gecb-board-fault-code-71780437.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0287",
  "nombre": "Brake switch relay",
  "simple": "El relé del micro de freno (BSR) está pegado o no coincide con el relé RR.",
  "causas": [
   "Relé BSR pegado",
   "Contactos BSR/RR gastados"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el funcionamiento del relé BSR.",
   "Cambia el relé si está pegado."
  ],
  "pieza": "micro_freno",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0288",
  "nombre": "COR count",
  "simple": "Hubo demasiados viajes de corrección seguidos; después de 4-5 fallidos el GECB bloquea el ascensor.",
  "causas": [
   "La cabina no detecta zona de puerta al parar",
   "Sensores 1LV/2LV con falla",
   "Parámetro DZ-TYP mal puesto",
   "Relé LVC dañado"
  ],
  "arreglo": [
   "Revisa los sensores 1LV/2LV.",
   "Con el Service Tool, revisa el parámetro DZ-TYP.",
   "Revisa el relé LVC.",
   "Para volver a servicio hay que pasar por inspección (INS)."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0289",
  "nombre": "No 48VDC",
  "simple": "Faltó la fuente de 48 VDC por 5 segundos (también sale al apagar el tablero).",
  "causas": [
   "Fuente de 48 V con falla",
   "Fusible abierto"
  ],
  "arreglo": [
   "Si fue un apagado normal, no hagas nada.",
   "Mide la salida de 48 VDC.",
   "Revisa fusible y fuente."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0302",
  "nombre": "DoorBridge",
  "simple": "Las señales DW o DFC no bajaron con la puerta abierta: puede haber una cerradura puenteada o falla del bypass de puertas.",
  "causas": [
   "Puente en la cadena de seguridad o en una cerradura",
   "Bypass de puertas dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea; busca y retira cualquier puente.",
   "Revisa los contactos DW, DFC y el bypass de puertas.",
   "Para borrar: pasa a ERO y vuelve a NOR; la cabina va al piso de la falla y abre.",
   "La falla queda guardada aunque se corte la luz."
  ],
  "peligro": "Una cerradura puenteada deja mover la cabina con puertas abiertas. Saca el ascensor de servicio.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/download/otis-gecb-lv-fallas-y-soluciones-ingles-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0305",
  "nombre": "DCSS-5 Err",
  "simple": "El operador de puertas DCSS5 avisó un error.",
  "causas": [
   "Falla en el operador de puertas",
   "Puerta trabada"
  ],
  "arreglo": [
   "Conecta el Service Tool al DCSS5 y lee su lista de eventos.",
   "Busca ese código en el equipo 'DCSS5' de esta app."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/ref-gaa30780ean-service-tool-reference-2015-05-28-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0400",
  "nombre": "RSL parity",
  "simple": "Dos estaciones remotas (tarjetas de botonera o indicador) tienen la misma dirección en la misma línea.",
  "causas": [
   "Dirección mal puesta al cambiar una tarjeta",
   "Conexión equivocada"
  ],
  "arreglo": [
   "Revisa la dirección de cada tarjeta de botonera.",
   "Revisa las conexiones RS.",
   "Prueba con el menú Test RSL (M-1-2-4)."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0401",
  "nombre": "RSL sync",
  "simple": "Se perdió la sincronización en la línea serial de botoneras (RSL).",
  "causas": [
   "Corto en la línea",
   "Terminador de línea dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Busca un corto en la línea de botoneras.",
   "Cambia el terminador de línea."
  ],
  "pieza": "cableado_hueco",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0500",
  "nombre": "RNG1 msg",
  "simple": "Error de datos en la comunicación de grupo entre ascensores.",
  "causas": [
   "Cable de grupo flojo o dañado",
   "Interferencia"
  ],
  "arreglo": [
   "Revisa el cable de comunicación entre ascensores.",
   "Ajusta conectores.",
   "Si sigue, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0501",
  "nombre": "RNG1 time",
  "simple": "No llegó a tiempo la señal del otro ascensor del grupo (falla de grupo).",
  "causas": [
   "El otro ascensor está apagado",
   "Cable de grupo suelto"
  ],
  "arreglo": [
   "Verifica que los otros ascensores estén encendidos.",
   "Revisa el cable de grupo."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0600",
  "nombre": "SPB-Alert",
  "simple": "La tarjeta SPB avisa un problema: batería, sensor DZI, encoder, parámetro fuera de rango o unidad de rescate.",
  "causas": [
   "Batería con falla",
   "Sensor o encoder con error",
   "Parámetro mal puesto",
   "Falla en la unidad de rescate"
  ],
  "arreglo": [
   "Mira el detalle del evento en el Service Tool.",
   "Revisa la batería.",
   "Si es parámetro o unidad de rescate, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0601",
  "nombre": "SPB:TempHTS",
  "simple": "La SPB avisa que la temperatura dentro del tablero (E&I) está muy alta.",
  "causas": [
   "Poca ventilación",
   "Ventilador malo",
   "Calor del ambiente"
  ],
  "arreglo": [
   "Revisa ventilación y ventilador.",
   "Limpia el polvo del tablero.",
   "Mejora la ventilación del lugar."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0605",
  "nombre": "Update S/W!",
  "simple": "Se instaló software nuevo en otra parte del sistema y ahora el GECB también necesita software nuevo.",
  "causas": [
   "Cambio de una tarjeta con otra versión"
  ],
  "arreglo": [
   "No mezcles versiones de software.",
   "Llama a Otis para la actualización correcta."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0702",
  "nombre": "BCB_II missing",
  "simple": "No se detecta la tarjeta BCB_II.",
  "causas": [
   "Tarjeta desconectada",
   "Cable suelto",
   "Tarjeta dañada"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa conectores y cable de la tarjeta BCB_II.",
   "Si sigue, consulta a Otis."
  ],
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0710",
  "nombre": "battery missing",
  "simple": "No se detecta la batería.",
  "causas": [
   "Batería desconectada",
   "Fusible o cable de batería abierto"
  ],
  "arreglo": [
   "Revisa la conexión de la batería.",
   "Revisa fusible y cable.",
   "Cambia la batería si está dañada."
  ],
  "pieza": "rescate",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0711",
  "nombre": "battery temperature",
  "simple": "La temperatura de la batería está fuera de rango.",
  "causas": [
   "Calor en el lugar",
   "Batería dañada"
  ],
  "arreglo": [
   "Revisa la ventilación.",
   "Revisa si la batería está hinchada o caliente.",
   "Cámbiala si está dañada."
  ],
  "pieza": "rescate",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0712",
  "nombre": "battery defect",
  "simple": "La batería está mala.",
  "causas": [
   "Batería vieja o dañada"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Cambia la batería por una del mismo tipo.",
   "Prueba el rescate."
  ],
  "pieza": "rescate",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0713",
  "nombre": "no battery charge signals",
  "simple": "No llegan las señales de carga de la batería.",
  "causas": [
   "Cargador con falla",
   "Cable suelto"
  ],
  "arreglo": [
   "Revisa el cable del cargador.",
   "Mide si el cargador entrega voltaje.",
   "Si sigue, consulta a Otis."
  ],
  "pieza": "rescate",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "gecb",
  "codigo": "0714",
  "nombre": "battery low voltage",
  "simple": "La batería tiene voltaje bajo.",
  "causas": [
   "Batería descargada",
   "Batería vieja",
   "Cargador sin funcionar"
  ],
  "arreglo": [
   "Mide el voltaje de la batería.",
   "Revisa el cargador.",
   "Cambia la batería si no recupera carga."
  ],
  "pieza": "rescate",
  "fuente": "https://pdfcoffee.com/gcs-gecb-reference-list-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0001",
  "nombre": "Watchdog",
  "simple": "Saltó la vigilancia interna (watchdog) del LCB II y la tarjeta se reinició.",
  "causas": [
   "Ruido eléctrico o tierra floja",
   "Bajón de voltaje",
   "Falla de tarjeta o software"
  ],
  "arreglo": [
   "Anota cuándo pasa.",
   "Con energía cortada, revisa tierras y conectores.",
   "Mide la alimentación de la tarjeta.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0100",
  "nombre": "Opmode NAV",
  "simple": "El control no puede funcionar por una falla del variador.",
  "causas": [
   "Falla en el variador"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador con el Service Tool.",
   "Atiende el código del variador."
  ],
  "pieza": "variador",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0101",
  "nombre": "EPO shutdown",
  "simple": "La cabina no puede funcionar en modo energía de emergencia.",
  "causas": [
   "Edificio con energía de emergencia",
   "Señal EPO activa por error"
  ],
  "arreglo": [
   "Confirma si hay energía de emergencia.",
   "Si no, revisa el cable de la señal EPO con energía cortada."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0102",
  "nombre": "DTC",
  "simple": "La puerta no cerró a tiempo (faltan las señales DCL, DFC, DW o GDS).",
  "causas": [
   "Obstáculo o basura en la pisadera",
   "Contacto de puerta o final de cierre mal regulado",
   "Operador débil"
  ],
  "arreglo": [
   "Limpia la pisadera.",
   "Con energía cortada, mueve la puerta a mano: debe correr suave.",
   "Revisa y regula DCL, DFC y DW.",
   "Prueba varios cierres."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0103",
  "nombre": "DTO",
  "simple": "La puerta no abrió a tiempo (falta la señal DOL de puerta abierta).",
  "causas": [
   "Final de apertura DOL mal regulado",
   "Puerta trabada",
   "Operador con falla"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa que la puerta abra libre a mano.",
   "Revisa el DOL y su cable."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0104",
  "nombre": "DCP",
  "simple": "La cabina no respondió a una orden a tiempo (ej. puerta forzada a abrir).",
  "causas": [
   "Puerta forzada a mano",
   "Contacto de puerta abierto"
  ],
  "arreglo": [
   "Revisa si alguien forzó la puerta.",
   "Revisa contactos de puerta."
  ],
  "pieza": "puerta_cabina",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0105",
  "nombre": "DBSS fault",
  "simple": "Falla del variador (DBSS).",
  "causas": [
   "Falla dentro del variador"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador.",
   "Atiende ese código."
  ],
  "pieza": "variador",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0201",
  "nombre": "correct",
  "simple": "La cabina hace un viaje de corrección para ubicarse.",
  "causas": [
   "Corte de luz o reinicio",
   "Perdió la posición"
  ],
  "arreglo": [
   "Espera que termine.",
   "Si se repite, revisa sensores de nivel."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0205",
  "nombre": "SE",
  "simple": "La cabina no arranca porque falta la señal SE (cadena de seguridad completa).",
  "causas": [
   "Bypass de puertas con falla",
   "Sensores fotoeléctricos de nivel con falla",
   "Switches SW6, SW7, SW8 de la tarjeta no están en ON"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el bypass de puertas.",
   "Revisa los sensores 1LV/2LV (distancia máx. 30 mm según la guía).",
   "Revisa que SW6, SW7 y SW8 estén en ON."
  ],
  "pieza": "cerradura",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0210",
  "nombre": "DZ",
  "simple": "No aparece la señal de zona de puerta (DZ) cuando la cabina para.",
  "causas": [
   "Sensor de nivel con falla",
   "Parámetro DZ-TYP en 0"
  ],
  "arreglo": [
   "Revisa sensores de nivel y paletas.",
   "Con el Service Tool, revisa el parámetro DZ-TYP."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0211",
  "nombre": "DFC in FR",
  "simple": "Se cortó el circuito de seguridad (DFC) viajando rápido.",
  "causas": [
   "Cerradura mal regulada",
   "Contacto flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa cerraduras y contactos de puertas.",
   "Prueba en inspección."
  ],
  "peligro": "Nunca puentees cerraduras.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0212",
  "nombre": "DFC in SR",
  "simple": "Se cortó el circuito de seguridad (DFC) viajando lento.",
  "causas": [
   "Cerradura mal regulada",
   "Contacto flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa cerraduras y contactos.",
   "Prueba en inspección."
  ],
  "peligro": "Nunca puentees cerraduras.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0216",
  "nombre": "Brake",
  "simple": "El freno no se abrió.",
  "causas": [
   "No llega voltaje al freno",
   "Freno pegado o mal regulado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa cable y bobina del freno.",
   "Revisa que el freno no esté pegado."
  ],
  "peligro": "No desarmes el freno sin asegurar cabina y contrapeso.",
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0217",
  "nombre": "Creep",
  "simple": "Se pasó el tiempo de marcha lenta (nivelación) del variador.",
  "causas": [
   "Sensores de nivel mal",
   "Freno que roza"
  ],
  "arreglo": [
   "Revisa sensores de nivel.",
   "Revisa el freno."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0224",
  "nombre": "1-Relay",
  "simple": "Falta una fase de la alimentación.",
  "causas": [
   "Fusible de una fase quemado",
   "Borne flojo",
   "Corte de la red en una fase"
  ],
  "arreglo": [
   "Con cuidado, mide las tres fases de entrada.",
   "Con energía cortada, revisa fusibles y bornes.",
   "Si es la red, avisa al edificio."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0225",
  "nombre": "110VAC dead",
  "simple": "Se cortó la tensión de 110 VAC por 5 segundos.",
  "causas": [
   "Fusible abierto",
   "Transformador con falla"
  ],
  "arreglo": [
   "Mide 110 VAC.",
   "Revisa fusibles y transformador."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0226",
  "nombre": "LS-fault",
  "simple": "La señal de 1LS o 2LS (interruptores de los extremos) es anormal.",
  "causas": [
   "Interruptor dañado o mal ubicado",
   "Cable roto"
  ],
  "arreglo": [
   "En inspección, revisa 1LS y 2LS.",
   "Revisa su cable."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0228",
  "nombre": "1LS+2LS",
  "simple": "1LS y 2LS actúan al mismo tiempo.",
  "causas": [
   "Interruptor pegado",
   "Cable en corto"
  ],
  "arreglo": [
   "Revisa ambos interruptores en inspección.",
   "Cambia el que esté pegado."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0230",
  "nombre": "Remote address",
  "simple": "Falló la revisión de direcciones de las estaciones remotas: algunas direcciones están mal.",
  "causas": [
   "Dirección mal puesta en una botonera"
  ],
  "arreglo": [
   "Revisa la dirección de cada tarjeta de botonera.",
   "Corrige la que esté repetida o mal."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0231",
  "nombre": "LSVF_:DR",
  "simple": "Falla del variador (LSVF).",
  "causas": [
   "Falla dentro del variador"
  ],
  "arreglo": [
   "Lee las fallas del variador.",
   "Atiende ese código."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0232",
  "nombre": "Overspeed in decel",
  "simple": "La velocidad fue demasiado alta al frenar para llegar al piso.",
  "causas": [
   "Encoder o ajuste del variador",
   "Interruptores de desaceleración mal ubicados"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Revisa 1LS/2LS.",
   "Si sigue, consulta a Otis."
  ],
  "peligro": "Exceso de velocidad: saca de servicio hasta encontrar la causa.",
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0300",
  "nombre": "DBP:dfc_SE",
  "simple": "Con la puerta abriendo o abierta, la señal DFC o SE no cambió, o se cortó el bypass de puertas.",
  "causas": [
   "Falla del bypass de puertas",
   "Contacto DFC pegado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa el bypass de puertas y el contacto DFC."
  ],
  "pieza": "cerradura",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0301",
  "nombre": "not dcl",
  "simple": "Con la puerta totalmente abierta, la señal DCL (puerta cerrada) no cambia.",
  "causas": [
   "Final DCL pegado o mal regulado",
   "Cable en corto"
  ],
  "arreglo": [
   "Revisa el final DCL y su cable.",
   "Regúlalo o cámbialo."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0302",
  "nombre": "DCS:DW err",
  "simple": "La señal DW (puerta de piso cerrada) no coincide con el estado real de la puerta.",
  "causas": [
   "Contacto DW mal regulado",
   "Cable del contacto con falla"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa contactos DW de las puertas de piso."
  ],
  "peligro": "Nunca puentees contactos de puerta.",
  "pieza": "puerta_piso",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0304",
  "nombre": "Dol.alw.on",
  "simple": "La señal DOL (puerta abierta) está activa aunque la puerta está cerrada.",
  "causas": [
   "Sensor DOL pegado o mal regulado",
   "Fusibles del sistema de puertas quemados",
   "Entrada DOS no programada"
  ],
  "arreglo": [
   "Revisa el sensor DOL.",
   "Revisa fusibles del sistema de puertas.",
   "Revisa la programación de la entrada DOS."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0306",
  "nombre": "HwyAccess",
  "simple": "El circuito de cerraduras está cerrado pero el de puertas de piso sigue abierto.",
  "causas": [
   "Contacto de puerta de piso abierto",
   "Cable cortado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa los contactos de las puertas de piso."
  ],
  "peligro": "Nunca puentees contactos de puerta.",
  "pieza": "puerta_piso",
  "fuente": "https://www.ds-elevators.com/info/otis-fault-code-lcb-2-tcbc-and-gecb-board-er-40384130.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0400",
  "nombre": "RSL parity",
  "simple": "Dos estaciones remotas (botoneras) usan la misma dirección en la misma línea.",
  "causas": [
   "Dirección mal puesta",
   "Conexión equivocada"
  ],
  "arreglo": [
   "Revisa direcciones de las tarjetas de botonera.",
   "Corrige la repetida."
  ],
  "pieza": "botonera_piso",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "0500",
  "nombre": "RNG1 msg",
  "simple": "Error de datos en la comunicación de grupo.",
  "causas": [
   "Cable de grupo dañado",
   "Interferencia"
  ],
  "arreglo": [
   "Revisa el cable entre ascensores.",
   "Ajusta conectores."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "TCI-LOCK",
  "nombre": "TCI-Lock",
  "simple": "El ascensor quedó bloqueado porque se salió de inspección en el orden equivocado.",
  "causas": [
   "Se apagó la inspección (TCI) sin seguir los pasos",
   "Fusible o línea de seguridad antes de la llave TCI abierta"
  ],
  "arreglo": [
   "Abre la puerta, apaga la TCI y luego cierra la puerta.",
   "Revisa la línea de seguridad y fusibles antes de la llave TCI.",
   "Si sigue, apaga y vuelve a encender el control."
  ],
  "pieza": "caja_inspeccion",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "LS-FAULT",
  "nombre": "LS-Fault",
  "simple": "1LS y 2LS están activos a la vez, o no coinciden con la zona de puerta donde deberían actuar.",
  "causas": [
   "Interruptor 1LS o 2LS dañado",
   "Interruptor mal ubicado"
  ],
  "arreglo": [
   "En inspección, revisa 1LS y 2LS.",
   "Corrige la falla y luego haz un viaje DCS como pide la pantalla."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/mcs-lcb-ii-reference-list-4-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "DOORBRIDGE",
  "nombre": "DoorBridge",
  "simple": "DW o DFC no bajaron con la puerta abierta; puede haber cerraduras puenteadas.",
  "causas": [
   "Cerradura puenteada",
   "Contacto de puerta pegado"
  ],
  "arreglo": [
   "Corta la energía y bloquea; busca y quita cualquier puente.",
   "Revisa contactos DW y DFC."
  ],
  "peligro": "Una cerradura puenteada deja mover la cabina con puertas abiertas.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "SE-FAULT",
  "nombre": "SE-Fault",
  "simple": "Se perdió la señal de permiso de arranque (SE).",
  "causas": [
   "Cadena de seguridad o cerraduras abiertas",
   "Bypass de puertas con falla"
  ],
  "arreglo": [
   "Revisa cerraduras y cadena de seguridad.",
   "Revisa el bypass de puertas."
  ],
  "peligro": "Nunca puentees la cadena de seguridad.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lcb2",
  "codigo": "1TH",
  "nombre": "1TH / 2TH Fault",
  "simple": "Se abrió un contacto térmico; el variador se apaga para enfriar.",
  "causas": [
   "Recalentamiento por mucho uso",
   "Mala ventilación",
   "Contacto o cable abierto"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa ventilación.",
   "Con energía cortada, revisa el contacto térmico y su cable."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/otis-elevator-fault-code-lcb-2-tcbc-and-gecb-board-faults-elevatorvip-com-1627641777743-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2000",
  "nombre": "Runtime software fault",
  "simple": "Falla de software en marcha; el procesador se reinicia.",
  "causas": [
   "Error de software",
   "Ruido eléctrico"
  ],
  "arreglo": [
   "Anota cuándo pasa.",
   "Revisa tierras y alimentación de la MCB.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.elevatorvip.com/tag/elevator-failure-code/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2001",
  "nombre": "Power on / Reset",
  "simple": "Aviso: el control se encendió o se presionó el botón de reset.",
  "causas": [
   "Encendido normal",
   "Reset manual"
  ],
  "arreglo": [
   "No necesita arreglo si fue intencional."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.elevatorvip.com/tag/elevator-failure-code/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2002",
  "nombre": "Power fail",
  "simple": "La fuente de 5 V bajó de 2,5 V y el sistema se apagó.",
  "causas": [
   "Fuente de 5 V con falla",
   "Corte de luz"
  ],
  "arreglo": [
   "Mide la fuente de 5 V.",
   "Revisa la alimentación de la fuente."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.elevatorvip.com/tag/elevator-failure-code/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2100",
  "nombre": "Rope slip",
  "simple": "Los cables patinaron demasiado en la polea (en el mismo sentido del viaje).",
  "causas": [
   "Polea de tracción gastada",
   "Cables con grasa o gastados",
   "Sobrecarga"
  ],
  "arreglo": [
   "Saca el ascensor de servicio.",
   "Revisa desgaste de la polea y de los cables.",
   "Llama a un supervisor u Otis."
  ],
  "peligro": "Si los cables patinan, la cabina puede no detenerse bien.",
  "pieza": "polea_traccion",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2101",
  "nombre": "Rope slip (reverse)",
  "simple": "Los cables patinaron demasiado con la cabina yendo en sentido contrario al cable.",
  "causas": [
   "Polea gastada",
   "Cables con grasa o gastados"
  ],
  "arreglo": [
   "Saca de servicio.",
   "Revisa polea y cables.",
   "Llama a un supervisor u Otis."
  ],
  "peligro": "Si los cables patinan, la cabina puede no detenerse bien.",
  "pieza": "cables_traccion",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2102",
  "nombre": "No door zone",
  "simple": "El sistema ve el piso pero no llega la señal de zona de puerta; revisa el sensor fotoeléctrico.",
  "causas": [
   "Sensor fotoeléctrico sucio o dañado",
   "Paleta desalineada"
  ],
  "arreglo": [
   "Limpia y revisa el sensor.",
   "Revisa la paleta de ese piso."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2103",
  "nombre": "Invalid floor count",
  "simple": "El número de pisos no coincide con el hueco o está fuera de límites.",
  "causas": [
   "Parámetro de pisos mal",
   "Falta una paleta",
   "Aprendizaje del hueco mal hecho"
  ],
  "arreglo": [
   "Revisa el parámetro de pisos.",
   "Revisa las paletas.",
   "Repite el aprendizaje del hueco."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2404",
  "nombre": "DCSS comm",
  "simple": "Falla de comunicación con el operador de puertas (DCSS).",
  "causas": [
   "Cable o conector flojo entre MCB y operador",
   "Fusible o fuente del operador",
   "Tarjeta MCB u operador dañada"
  ],
  "arreglo": [
   "Con el Service Tool en la MCB entra a M-3-1-1: si abre, la comunicación funciona.",
   "Revisa conectores y cable.",
   "Revisa fusibles y fuente del operador.",
   "Si no se arregla, consulta a Otis antes de cambiar tarjetas."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2410",
  "nombre": "DCSS#1 timeout",
  "simple": "El operador de puertas 1 no respondió a tiempo.",
  "causas": [
   "Cable de comunicación flojo",
   "Operador apagado"
  ],
  "arreglo": [
   "Revisa alimentación del operador.",
   "Revisa el cable de comunicación."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2411",
  "nombre": "DCSS#1 checksum",
  "simple": "Llegaron datos dañados del operador de puertas 1.",
  "causas": [
   "Interferencia",
   "Cable dañado"
  ],
  "arreglo": [
   "Revisa el cable y su blindaje.",
   "Aléjalo de cables de fuerza."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2505",
  "nombre": "DBSS comm",
  "simple": "Falla de comunicación entre el control (MCSS) y el variador (DBSS).",
  "causas": [
   "Cable de comunicación flojo",
   "Variador apagado"
  ],
  "arreglo": [
   "Revisa el cable entre MCB y variador.",
   "Revisa la alimentación del variador."
  ],
  "pieza": "variador",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2700",
  "nombre": "DBSS not ready",
  "simple": "El variador mandó un estado que no corresponde (listo o freno abierto con la cabina parada, o lo contrario).",
  "causas": [
   "Falla de comunicación",
   "Cadena de seguridad abierta",
   "Control en NAV"
  ],
  "arreglo": [
   "Revisa conectores y cable entre MCB y variador.",
   "Revisa fuente y fusibles del variador.",
   "Con el Service Tool, entra con M-4 para ver si responde.",
   "Cambiar tarjetas solo como último paso."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2701",
  "nombre": "DBSS timeout",
  "simple": "El variador no quedó listo 5 segundos después de un reset o de la orden 'preparar'.",
  "causas": [
   "Falla en el variador"
  ],
  "arreglo": [
   "Lee el registro de fallas del variador.",
   "Atiende ese código."
  ],
  "pieza": "variador",
  "fuente": "https://www.elevatorvip.com/tag/elevator-failure-code/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2702",
  "nombre": "DBSS brake timeout",
  "simple": "El freno no se abrió o no se cerró en el tiempo permitido.",
  "causas": [
   "Freno pegado o mal regulado",
   "Micro del freno con falla"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa freno y micro de freno."
  ],
  "peligro": "No desarmes el freno sin asegurar cabina y contrapeso.",
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2703",
  "nombre": "DBSS drive fault",
  "simple": "El variador avisó que tiene una falla.",
  "causas": [
   "Falla dentro del variador"
  ],
  "arreglo": [
   "Revisa el registro de fallas del variador (DBSS).",
   "Atiende ese código."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2704",
  "nombre": "DBSS stop/shutdown",
  "simple": "El variador mandó la orden de parar y apagarse.",
  "causas": [
   "Falla grave en el variador"
  ],
  "arreglo": [
   "Lee el registro del variador.",
   "Atiende el código que aparezca."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2705",
  "nombre": "DBSS torque limit",
  "simple": "El variador pasó su límite de fuerza (torque).",
  "causas": [
   "Freno que roza",
   "Cabina trabada o sobrecargada",
   "Contrapeso mal balanceado"
  ],
  "arreglo": [
   "Revisa que el freno abra bien.",
   "Revisa la carga y el balance.",
   "Revisa guías y rozaderas."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2800",
  "nombre": "Absolute overspeed",
  "simple": "La cabina fue más rápido que el máximo permitido.",
  "causas": [
   "Encoder o ajuste de velocidad",
   "Problema en el variador"
  ],
  "arreglo": [
   "Saca de servicio.",
   "Revisa el encoder y su cable.",
   "Pide a Otis revisar los parámetros."
  ],
  "peligro": "Exceso de velocidad. No pongas el ascensor en servicio hasta saber la causa.",
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2801",
  "nombre": "Velocity tracking",
  "simple": "La cabina no siguió la velocidad pedida.",
  "causas": [
   "Encoder o línea PVT con falla",
   "Parámetros mal"
  ],
  "arreglo": [
   "Revisa la línea del PVT (sensor de velocidad).",
   "Revisa parámetros con Otis."
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2802",
  "nombre": "PVT dir err",
  "simple": "El sensor de velocidad (PVT) dice que la cabina va en sentido contrario al pedido.",
  "causas": [
   "Cable del PVT cruzado o dañado",
   "PVT con falla"
  ],
  "arreglo": [
   "Revisa la línea del PVT.",
   "Revisa conexiones del encoder."
  ],
  "peligro": "La cabina puede moverse al revés de lo esperado. Prueba solo en inspección.",
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2803",
  "nombre": "NTSD overspeed",
  "simple": "La cabina llegó muy rápido al último piso (1LS/2LS) y frenó con una rampa especial.",
  "causas": [
   "Interruptor 1LS o 2LS actúa en el lugar equivocado",
   "Problema de velocidad del variador"
  ],
  "arreglo": [
   "En inspección, revisa la ubicación de 1LS y 2LS.",
   "Revisa su cable.",
   "Si sigue, consulta a Otis."
  ],
  "peligro": "Exceso de velocidad cerca de los extremos.",
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2806",
  "nombre": "DBP relay input",
  "simple": "El relé de bypass de puertas (DBP) no hace lo que se le pide.",
  "causas": [
   "Relé DBP pegado",
   "Contactos gastados"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa y cambia el relé DBP si falla."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2807",
  "nombre": "ETSC relay input",
  "simple": "Error en la entrada del relé ETSC.",
  "causas": [
   "Relé ETSC con falla",
   "Contacto de la cadena DBD"
  ],
  "arreglo": [
   "Revisa el relé ETSC.",
   "Revisa la cadena DBD."
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/codigos-de-fallas-otis-3200-pdf-free.html"
 },
 {
  "equipo": "lmcss",
  "codigo": "2808",
  "nombre": "SC relay input",
  "simple": "Error en el relé de chequeo de velocidad (SC).",
  "causas": [
   "Relé SC con falla",
   "Contacto gastado"
  ],
  "arreglo": [
   "Revisa el relé SC.",
   "Cámbialo si está pegado."
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2809",
  "nombre": "DFC relay input",
  "simple": "La señal DFC (puertas cerradas) sigue activa con la puerta abierta.",
  "causas": [
   "Contacto de puerta puenteado o pegado",
   "Cable en corto"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Busca puentes en contactos de puerta.",
   "Revisa el cable de DFC."
  ],
  "peligro": "Una señal DFC falsa puede dejar mover la cabina con puertas abiertas.",
  "pieza": "cerradura",
  "fuente": "https://www.elevatorvip.com/otis-elevator-fault-code-otis300vf-fault/"
 },
 {
  "equipo": "lmcss",
  "codigo": "2810",
  "nombre": "DBD input",
  "simple": "La señal DBD (vigila que los contactores principales estén abiertos con la cabina parada) no es la esperada.",
  "causas": [
   "Contacto auxiliar de un contactor dañado",
   "Contactor pegado"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Revisa los contactos auxiliares de los contactores.",
   "Cambia el contactor dañado."
  ],
  "peligro": "Un contactor pegado puede dejar el motor con energía.",
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/lmcss-trubleshooting-guide-311-411-pdf-free.html"
 },
 {
  "equipo": "ovf20",
  "codigo": "10",
  "nombre": "SYS: <24V Supply",
  "simple": "Se perdió la alimentación de 24 V que viene de la tarjeta PDB.",
  "causas": [
   "Corto en la alimentación de 24 VAC del variador"
  ],
  "arreglo": [
   "Corta la energía y bloquea.",
   "Desconecta todos los conectores de P1 y vuelve a encender.",
   "Si la falla desaparece, busca el corto en lo conectado a P1."
  ],
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "11",
  "nombre": "SYS: <15V Supply",
  "simple": "Se perdió la alimentación de 15 V que viene de la tarjeta PDB.",
  "causas": [
   "Corto en alimentación"
  ],
  "arreglo": [
   "Sigue los mismos pasos del evento 10."
  ],
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "12",
  "nombre": "SYS: Inv-Relay",
  "simple": "Aviso: se soltó el relé del variador (sale cada vez que el variador se apaga).",
  "causas": [
   "Se fue la luz de entrada",
   "Voltaje de red muy bajo"
  ],
  "arreglo": [
   "Revisa el cableado de alimentación.",
   "Mide el voltaje de la red."
  ],
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "21",
  "nombre": "INV: > Volt DC",
  "simple": "Voltaje demasiado alto en el bus DC (condensadores del variador).",
  "causas": [
   "Resistencia de frenado (DBR) equivocada o dañada",
   "Cable de la resistencia dañado",
   "Variador dañado"
  ],
  "arreglo": [
   "Corta, bloquea y espera la descarga.",
   "Mide la resistencia de frenado y cámbiala si está mal.",
   "Revisa su cable.",
   "Si todo está bien, el variador puede estar dañado."
  ],
  "peligro": "El bus DC guarda alto voltaje después de apagar. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "25",
  "nombre": "INV: > Curr IGBT",
  "simple": "Pasó demasiada corriente por los transistores (IGBT) del variador.",
  "causas": [
   "Corto dentro de los módulos IGBT",
   "Corto en el cable del motor o a tierra"
  ],
  "arreglo": [
   "Corta, bloquea y espera la descarga.",
   "Revisa el cable del motor y mide aislamiento a tierra.",
   "Si el cable está bien, el variador puede estar dañado."
  ],
  "peligro": "Alto voltaje en el variador.",
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "27",
  "nombre": "INV: > Curr Motor",
  "simple": "La corriente del motor pasó 240% de la corriente del variador.",
  "causas": [
   "Bobinas del motor dañadas",
   "Señales del encoder con falla"
  ],
  "arreglo": [
   "Si pasa al arrancar cada viaje, revisa las bobinas del motor antes de cambiar el variador.",
   "Revisa el encoder, su cable y blindaje.",
   "Revisa la MCB II."
  ],
  "pieza": "maquina",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "29",
  "nombre": "Brake chopper",
  "simple": "La resistencia de frenado está en corto o desconectada.",
  "causas": [
   "Resistencia de frenado en corto",
   "Resistencia desconectada"
  ],
  "arreglo": [
   "Corta, bloquea y espera la descarga.",
   "Revisa la resistencia y su cable.",
   "Ver también evento 21."
  ],
  "peligro": "Alto voltaje y calor en la resistencia.",
  "pieza": "variador",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "52",
  "nombre": "MLS: decel distance short",
  "simple": "La distancia para frenar fue muy corta: la cabina paró sin velocidad lenta.",
  "causas": [
   "Cuenta mal de la MCB II",
   "Paletas o sensores de piso mal"
  ],
  "arreglo": [
   "Revisa sensores y paletas.",
   "Repite el aprendizaje si es necesario."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "55",
  "nombre": "MLS: input error",
  "simple": "La cabina no arranca porque 1LS/2LS no coinciden con la dirección del viaje.",
  "causas": [
   "Cableado de 1LS/2LS cruzado o dañado",
   "Interruptor dañado"
  ],
  "arreglo": [
   "Revisa el cableado de 1LS y 2LS.",
   "Revisa los interruptores."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "62",
  "nombre": "MLS: LV Count Err",
  "simple": "Error de cuenta de pisos de la MCB II (solo en el viaje de aprendizaje).",
  "causas": [
   "Señales LV con falla",
   "Paleta faltante o desalineada"
  ],
  "arreglo": [
   "Revisa las señales y sensores LV.",
   "Repite el aprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "63",
  "nombre": "MLS: LV trigger error",
  "simple": "En el aprendizaje, las señales LV rebotaron más de 20 ms.",
  "causas": [
   "Sensor LV sucio o flojo",
   "Paleta mal alineada"
  ],
  "arreglo": [
   "Limpia y ajusta el sensor LV.",
   "Alinea la paleta.",
   "Repite el aprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "70",
  "nombre": "DRV: speed measurement",
  "simple": "El variador no puede leer bien la velocidad.",
  "causas": [
   "Ruido eléctrico en los cables del encoder"
  ],
  "arreglo": [
   "Revisa el cable del encoder y su blindaje.",
   "Sepáralo de cables de fuerza."
  ],
  "pieza": "encoder",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "71",
  "nombre": "DRV: over speed",
  "simple": "El motor fue más de 10% más rápido de lo pedido.",
  "causas": [
   "Parámetros N SYN MOTOR, ENCODER PULSES o ENCODER TRACES mal puestos"
  ],
  "arreglo": [
   "Saca de servicio.",
   "Pide revisar esos parámetros con el Service Tool."
  ],
  "peligro": "Exceso de velocidad. No pongas en servicio hasta resolver.",
  "pieza": "encoder",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "72",
  "nombre": "DRV: low speed",
  "simple": "El motor fue unos 45% más lento de lo pedido.",
  "causas": [
   "Encoder con falla",
   "Parámetros de encoder mal"
  ],
  "arreglo": [
   "Prueba el encoder en el menú del Service Tool.",
   "Revisa los parámetros de pulsos y pistas del encoder."
  ],
  "pieza": "encoder",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "73",
  "nombre": "DRV: open loop",
  "simple": "El variador está corriendo sin señal de velocidad (sin encoder); en normal se apaga.",
  "causas": [
   "Encoder desconectado o dañado",
   "Parámetro en cero"
  ],
  "arreglo": [
   "Revisa conexión del encoder.",
   "Solo se puede mover en inspección hasta arreglarlo."
  ],
  "pieza": "encoder",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "74",
  "nombre": "DRV: rollback start",
  "simple": "La cabina retrocedió al arrancar (solo encoders de dos pistas).",
  "causas": [
   "Freno se abre antes de tiempo",
   "Ajuste de arranque"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Pide revisar los ajustes de arranque."
  ],
  "pieza": "freno",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "75",
  "nombre": "DRV: rollback stop",
  "simple": "La cabina retrocedió al parar (solo encoders de dos pistas).",
  "causas": [
   "Freno cierra tarde",
   "Ajuste de parada"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Pide revisar ajustes de parada."
  ],
  "pieza": "freno",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "76",
  "nombre": "DRV: encoder sequence",
  "simple": "Las señales del encoder llegan en orden invertido.",
  "causas": [
   "Pistas del encoder cruzadas"
  ],
  "arreglo": [
   "Revisa el cableado del encoder.",
   "Corrige el orden de las pistas."
  ],
  "pieza": "encoder",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "77",
  "nombre": "DRV: phase down",
  "simple": "Una fase del motor tiene corriente cero.",
  "causas": [
   "Cable de una fase cortado",
   "Contactor con contacto malo"
  ],
  "arreglo": [
   "Corta, bloquea y espera la descarga.",
   "Revisa cables del motor y contactores."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "78",
  "nombre": "DRV: Over Load",
  "simple": "La corriente del motor pasó 200% de la normal por más de 3 segundos.",
  "causas": [
   "Cable entre variador y motor cortado",
   "Potencia del variador mal ajustada"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Revisa el cableado del motor, incluidos los contactores.",
   "Pide revisar el ajuste de potencia."
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "ovf20",
  "codigo": "92",
  "nombre": "LRN: Too many LV",
  "simple": "En el aprendizaje contó más pisos que los puestos en el Service Tool.",
  "causas": [
   "Número de pisos mal puesto",
   "Paleta de más o señal doble"
  ],
  "arreglo": [
   "Revisa el parámetro de último piso.",
   "Revisa paletas y sensores.",
   "Repite el aprendizaje."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.escalatorparts.cn/UploadFiles/download/20181011154618kicmhd.pdf"
 },
 {
  "equipo": "regen",
  "codigo": "100",
  "nombre": "Inv SW Oct",
  "simple": "La corriente del inversor (salida al motor) pasó el límite.",
  "causas": [
   "Fases del motor mal puestas (parámetro Motor Phase)",
   "Una fase del motor en corto"
  ],
  "arreglo": [
   "Corta, bloquea y espera la descarga.",
   "Revisa continuidad y aislamiento del cableado del motor.",
   "Pide revisar el parámetro Motor Phase."
  ],
  "peligro": "Alto voltaje en el variador.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "108",
  "nombre": "Inv HW Oct",
  "simple": "La protección de hardware detectó exceso de corriente en el inversor.",
  "causas": [
   "Corto en motor o cables",
   "Falla del variador"
  ],
  "arreglo": [
   "Corta y espera la descarga.",
   "Revisa cables del motor.",
   "Si sigue, consulta a Otis."
  ],
  "peligro": "Alto voltaje en el variador.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "116",
  "nombre": "Inv HW Ovt",
  "simple": "La protección de hardware detectó voltaje muy alto en el bus DC.",
  "causas": [
   "Red con voltaje alto",
   "Problema al devolver energía al frenar"
  ],
  "arreglo": [
   "Mide la red.",
   "Consulta a Otis si se repite."
  ],
  "peligro": "Alto voltaje en el bus DC.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "200",
  "nombre": "Cnv SW Oct",
  "simple": "La corriente del convertidor (entrada del variador) pasó el límite.",
  "causas": [
   "Hardware del variador dañado"
  ],
  "arreglo": [
   "Si pasa siempre, cambia el paquete del variador.",
   "Consulta a Otis."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "212",
  "nombre": "Cnv Vmag Flt",
  "simple": "Se fue la luz de entrada mientras el motor devolvía energía al frenar.",
  "causas": [
   "Corte de la red durante el viaje",
   "Ajustes DBR Mode o Inercia"
  ],
  "arreglo": [
   "Revisa la red eléctrica.",
   "Pide a Otis revisar los parámetros DBR Mode e Inercia."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "300",
  "nombre": "DC Bus Over",
  "simple": "Voltaje muy alto en el bus DC (condensadores del variador).",
  "causas": [
   "Voltaje de red alto o con picos",
   "Problema al disipar energía al frenar"
  ],
  "arreglo": [
   "Mide la red.",
   "Revisa conexiones del variador.",
   "Si se repite, consulta a Otis."
  ],
  "peligro": "El bus DC guarda alto voltaje después de apagar.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "301",
  "nombre": "DC Bus Under",
  "simple": "Voltaje muy bajo en el bus DC del variador.",
  "causas": [
   "Falta una fase",
   "Fusible quemado",
   "Voltaje de red bajo"
  ],
  "arreglo": [
   "Mide las tres fases de entrada.",
   "Revisa fusibles."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "302",
  "nombre": "VAC",
  "simple": "Falla en el voltaje de entrada (VAC) del variador.",
  "causas": [
   "Red inestable",
   "Falta de fase"
  ],
  "arreglo": [
   "Mide el voltaje de entrada.",
   "Revisa bornes y fusibles."
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "400",
  "nombre": "Brake S1 SAS",
  "simple": "El micro del freno (S1) no respondió a tiempo; el variador para y no hace otro viaje.",
  "causas": [
   "Micro de freno mal regulado o dañado",
   "Tiempo 'Brk Lftd Dely' muy corto",
   "Tipo de micro (Brk Sw Type) mal puesto"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Revisa y regula el micro del freno.",
   "Pide revisar los parámetros Brk Lftd Dely y Brk Sw Type."
  ],
  "pieza": "micro_freno",
  "fuente": "https://pdfcoffee.com/download/xizi-otis-rus-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "403",
  "nombre": "Brake BY",
  "simple": "Falla del relé de freno BY (su nombre real es BR).",
  "causas": [
   "Relé BY/BR pegado",
   "Contactos gastados"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Revisa el relé BY/BR.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/download/xizi-otis-rus-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "500",
  "nombre": "Overspeed",
  "simple": "La cabina fue más rápido de lo permitido.",
  "causas": [
   "Encoder con falla",
   "Parámetros de velocidad"
  ],
  "arreglo": [
   "Saca de servicio.",
   "Revisa encoder y su cable.",
   "Llama a Otis."
  ],
  "peligro": "Exceso de velocidad. No pongas en servicio hasta resolver.",
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "501",
  "nombre": "Pos Tracking",
  "simple": "La posición real de la cabina no siguió a la posición pedida.",
  "causas": [
   "Fases del motor mal puestas respecto al encoder",
   "Encoder con falla"
  ],
  "arreglo": [
   "Revisa el encoder y su cable.",
   "Pide revisar el ajuste de fases del motor."
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "502",
  "nombre": "Vel Tracking",
  "simple": "La velocidad real no siguió a la velocidad pedida.",
  "causas": [
   "Fases del motor mal puestas respecto al encoder",
   "Encoder con falla"
  ],
  "arreglo": [
   "Revisa el encoder.",
   "Pide revisar el ajuste de fases del motor."
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "506",
  "nombre": "Stopping Err",
  "simple": "La cabina se pasó del piso y no pudo volver despacio a la zona correcta.",
  "causas": [
   "Freno o ajuste de parada",
   "Sensores de nivel"
  ],
  "arreglo": [
   "Revisa el freno.",
   "Revisa sensores de nivel."
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "509",
  "nombre": "Floor at 1LS NC",
  "simple": "El interruptor 1LS actuó en un piso distinto al esperado.",
  "causas": [
   "1LS mal ubicado",
   "Cable o interruptor con falla"
  ],
  "arreglo": [
   "En inspección, revisa la posición de 1LS.",
   "Revisa su cable."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "510",
  "nombre": "Floor at 2LS NC",
  "simple": "El interruptor 2LS actuó en un piso distinto al esperado.",
  "causas": [
   "2LS mal ubicado",
   "Cable o interruptor con falla"
  ],
  "arreglo": [
   "En inspección, revisa la posición de 2LS.",
   "Revisa su cable."
  ],
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "600",
  "nombre": "Inv Tmp Warn",
  "simple": "Aviso: el inversor del variador se está calentando.",
  "causas": [
   "Mucho tráfico",
   "Ventilador o ventilación mala"
  ],
  "arreglo": [
   "Revisa el ventilador del variador.",
   "Limpia el polvo.",
   "Mejora la ventilación."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "601",
  "nombre": "Inv Tmp Over",
  "simple": "El disipador del inversor pasó la temperatura máxima.",
  "causas": [
   "Ventilador parado",
   "Polvo en el disipador",
   "Cuarto muy caliente"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Revisa ventilador y limpia el disipador.",
   "Mejora la ventilación."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "604",
  "nombre": "Cnv Tmp Over",
  "simple": "El convertidor (parte de entrada del variador) pasó la temperatura máxima.",
  "causas": [
   "Ventilador parado",
   "Polvo",
   "Cuarto muy caliente"
  ],
  "arreglo": [
   "Deja enfriar.",
   "Limpia y revisa ventilación."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "700",
  "nombre": "Safety Chain",
  "simple": "La cadena de seguridad está abierta; el variador queda apagado hasta que se cierre.",
  "causas": [
   "Contacto de seguridad abierto",
   "Cable cortado"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Mide la cadena de seguridad por tramos.",
   "Arregla el contacto abierto."
  ],
  "peligro": "Nunca puentees la cadena de seguridad.",
  "fuente": "https://pdfcoffee.com/svt-greske--pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "702",
  "nombre": "Prechrg Time",
  "simple": "El bus DC del variador no se cargó a tiempo al encender.",
  "causas": [
   "Falta una fase o voltaje bajo",
   "Falla del circuito de precarga"
  ],
  "arreglo": [
   "Mide las tres fases de entrada.",
   "Revisa fusibles.",
   "Si sigue, consulta a Otis."
  ],
  "peligro": "Alto voltaje en el variador.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "703",
  "nombre": "S Rly Fault",
  "simple": "Los relés S no quedaron en la posición correcta a tiempo.",
  "causas": [
   "Relé S pegado o lento",
   "Cableado del relé"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Revisa los relés S.",
   "Si se repite, consulta a Otis."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/download/xizi-otis-rus-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "704",
  "nombre": "DBD Fault",
  "simple": "Falla en la señal DBD (vigilancia de contactores).",
  "causas": [
   "Contacto auxiliar dañado",
   "Contactor pegado"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Revisa contactos auxiliares de contactores."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/download/xizi-otis-rus-pdf-free.html"
 },
 {
  "equipo": "regen",
  "codigo": "705",
  "nombre": "E2 Invalid",
  "simple": "Los parámetros guardados (EEPROM) no coinciden con el software o están en blanco.",
  "causas": [
   "Software nuevo",
   "Parámetros nunca cargados"
  ],
  "arreglo": [
   "Con el Service Tool, presiona SHIFT-ENTER para ver qué parámetro falta.",
   "Corrige los valores (pide los datos correctos a Otis)."
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/ultra-drive-user-guide-engineering-center-five-farm-springs-farmington-ct-06032-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "03",
  "nombre": "Inverter Prot",
  "simple": "La corriente de salida del operador pasó 7 A. Si pasa 3 veces en 120 s, el DCSS se bloquea.",
  "causas": [
   "Puerta trabada o dura",
   "Motor de puerta dañado",
   "Ajuste de ganancia mal hecho"
  ],
  "arreglo": [
   "Corta y bloquea; mueve la puerta a mano: debe correr libre.",
   "Mide las bobinas del motor.",
   "Para desbloquear: apaga el DCSS, espera 5 s y enciende."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "04",
  "nombre": "Motor Protect",
  "simple": "La corriente del motor de puerta estuvo alta 10 segundos. Si pasa 3 veces en 120 s, se bloquea.",
  "causas": [
   "Puerta pesada o dura",
   "Tipo de motor mal puesto en parámetros"
  ],
  "arreglo": [
   "Revisa que la puerta corra libre.",
   "Revisa el parámetro de tipo de motor.",
   "Desbloquea apagando 5 s."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "05",
  "nombre": "ObstaclDetec",
  "simple": "La puerta detectó un obstáculo al cerrar.",
  "causas": [
   "Persona u objeto en la puerta",
   "Basura en la pisadera",
   "Puerta dura",
   "Sensibilidad mal regulada"
  ],
  "arreglo": [
   "Limpia la pisadera y guiadores.",
   "Revisa que la puerta corra suave.",
   "Si reabre sin motivo, revisa sensibilidad y fuerza de cierre."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "06",
  "nombre": "Encoder Err",
  "simple": "Una o dos pistas del encoder de la puerta fallan; el DCSS pasa a modo INI.",
  "causas": [
   "Encoder o cable dañado",
   "Puerta bloqueada (puede dar el error aunque el encoder esté bien)"
  ],
  "arreglo": [
   "Revisa el conteo del encoder en el menú Monitor-Status.",
   "Revisa el cable.",
   "Revisa que la puerta no esté trabada."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "07",
  "nombre": "Overvoltage",
  "simple": "El voltaje interno (bus DC) pasó 450 Vdc; puede dañar el DCSS.",
  "causas": [
   "Voltaje de red alto",
   "Puerta pesada frenando fuerte"
  ],
  "arreglo": [
   "Mide la alimentación.",
   "Revisa ajustes de la puerta."
  ],
  "peligro": "Alto voltaje dentro del DCSS. Espera la descarga antes de abrir.",
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "08",
  "nombre": "Undervoltage",
  "simple": "La alimentación está por debajo de 180 Vac; la puerta puede funcionar mal.",
  "causas": [
   "Red baja",
   "Borne flojo"
  ],
  "arreglo": [
   "Mide la alimentación del DCSS.",
   "Ajusta bornes."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "09",
  "nombre": "Power Up",
  "simple": "Aviso: el DCSS se encendió después de estar apagado.",
  "causas": [
   "Encendido normal",
   "Corte de luz"
  ],
  "arreglo": [
   "No necesita arreglo si fue normal."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "13",
  "nombre": "3wireComFail",
  "simple": "Falló 3 veces la prueba de señales con el control (DOS y DOL); el DCSS se bloquea.",
  "causas": [
   "Cable de señales entre DCSS y control dañado",
   "Control no responde"
  ],
  "arreglo": [
   "Revisa los cables entre DCSS y control.",
   "Apaga el DCSS 5 s y enciende.",
   "Si sigue, consulta a Otis."
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "23",
  "nombre": "Reversal count",
  "simple": "Cuenta las reaperturas de la puerta; sirve para ver cuánto se desgasta.",
  "causas": [
   "Uso normal",
   "Muchos obstáculos"
  ],
  "arreglo": [
   "Si el número sube rápido, revisa cortina y mecanismo de puerta."
  ],
  "pieza": "cortina_luminosa",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "dcss5",
  "codigo": "25",
  "nombre": "Stalled door",
  "simple": "La puerta se quedó atascada 3 veces por más de 10 s; el DCSS se apaga y se bloquea.",
  "causas": [
   "Puerta trabada o descarrilada",
   "Objeto en la guía"
  ],
  "arreglo": [
   "Corta y bloquea.",
   "Libera la puerta y limpia guías.",
   "Desbloquea apagando 5 s."
  ],
  "pieza": "puerta_cabina",
  "fuente": "https://pdfcoffee.com/gaa30328baa-dcss5-service-tool-reference-list-5-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0001",
  "nombre": "Error fatal: ascensor bloqueado",
  "simple": "El ascensor se bloqueó por seguridad y no funciona hasta que lo reseteen.",
  "causas": [
   "Otra falla se repitió muchas veces (por ejemplo 3 veces en 1 hora)",
   "Una falla grave anterior que quedó guardada"
  ],
  "arreglo": [
   "Entra al menú 50 y mira los errores anteriores: ahí está la causa real",
   "Arregla primero esa causa",
   "Recién después borra el bloqueo: menú 10, comando 101, y RESET en la tarjeta",
   "Si se vuelve a bloquear, no sigas reseteando: llama al especialista de Schindler"
  ],
  "peligro": "No resetees una y otra vez sin buscar la causa: el bloqueo te está protegiendo.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=99"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0002",
  "nombre": "Cadena de seguridad abierta",
  "simple": "La cadena de seguridad (contactos puestos en fila) no cerró aunque las puertas están cerradas.",
  "causas": [
   "Contacto de puerta de piso o de cabina sucio o desajustado",
   "Algún contacto de seguridad abierto (stop, final de carrera, paracaídas)",
   "Fusible de 110 V quemado en la tarjeta SMICHMI o SMICFC"
  ],
  "arreglo": [
   "Corta la energía y pon candado antes de tocar",
   "Revisa los contactos de las puertas de piso y de cabina",
   "Con el multímetro busca cuál contacto está abierto",
   "Revisa el fusible de 110 V en la tarjeta SMICHMI",
   "Nunca puentees un contacto para que ande"
  ],
  "peligro": "Si puenteas la cadena, el ascensor puede moverse con una puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0003",
  "nombre": "Sobrecarga en cabina",
  "simple": "El ascensor siente demasiado peso; se queda en el piso con la puerta abierta y suena el aviso.",
  "causas": [
   "Hay mucha gente o carga en la cabina",
   "La señal del pesacargas está mala",
   "Cable del pesacargas suelto o pesacargas sin calibrar"
  ],
  "arreglo": [
   "Pide que bajen personas o carga",
   "Si la cabina está vacía y sigue el aviso, revisa el cable del pesacargas",
   "Recalibra el pesacargas con el procedimiento del manual (técnico)"
  ],
  "pieza": "pesacargas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=99"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0012",
  "nombre": "Modo autorización: SIM y tarjeta no coinciden",
  "simple": "La tarjeta SIM (chip con la configuración) no corresponde a la tarjeta principal del tablero.",
  "causas": [
   "Se cambió la tarjeta principal o la SIM",
   "Se puso la SIM de otro ascensor"
  ],
  "arreglo": [
   "Verifica que la SIM sea la de este ascensor",
   "Si cambiaste la tarjeta, vuelve a poner la SIM original",
   "La SIM es de la marca: si no tienes la correcta, llama a Schindler"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0019",
  "nombre": "Reinicio por watchdog (vigilante del programa)",
  "simple": "El control principal se reinició solo porque su 'vigilante' vio que el programa se colgó.",
  "causas": [
   "Falla interna del software del control principal",
   "Versión de software con problemas conocidos"
  ],
  "arreglo": [
   "Anota cada cuánto aparece",
   "Si sale seguido, consulta a Schindler si hay actualización del software",
   "No actualices el software sin autorización de la marca"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=5713&type=thread"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0020",
  "nombre": "Cadena de seguridad puenteada",
  "simple": "La cadena de seguridad no se abrió cuando la puerta se abrió: hay un puente.",
  "causas": [
   "Un puente (cable o enchufe) dejado en un contacto de puerta de piso o de cabina",
   "Contacto de puerta pegado"
  ],
  "arreglo": [
   "Corta la energía y pon candado",
   "Busca puentes en los contactos de puerta (KTS de piso, KTC de cabina) y sácalos",
   "Prueba que cada puerta abra la cadena al abrirse",
   "Solo después borra el error fatal (menú 10, comando 101)"
  ],
  "peligro": "Con un puente, el ascensor puede viajar con la puerta abierta: riesgo de caída o atrapamiento.",
  "pieza": "cerradura",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=100"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0024",
  "nombre": "KNE arriba abierto (pasó el límite superior)",
  "simple": "La cabina subió más allá del último piso y abrió el final de carrera de arriba.",
  "causas": [
   "La cabina no paró a tiempo en el último piso",
   "Contacto del final de carrera (KNE) o su cable con falla"
  ],
  "arreglo": [
   "No pongas el ascensor en normal todavía",
   "Corta energía, pon candado y revisa el contacto KNE y su cable",
   "Averigua por qué la cabina se pasó (freno, posición) antes de volver a servicio",
   "Si no encuentras la causa, llama al especialista"
  ],
  "peligro": "Si la cabina se pasó del límite, puede haber falla de freno o de posición.",
  "pieza": "finales_carrera",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=100"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0072",
  "nombre": "Batería de cabina con poca carga",
  "simple": "La batería de respaldo de la cabina (la de la luz de emergencia) está baja o no se recarga.",
  "causas": [
   "Batería vieja",
   "Conexión de la batería floja o falta",
   "Cargador o fusible del cargador con falla"
  ],
  "arreglo": [
   "Revisa los bornes y conexiones de la batería",
   "Mide el voltaje de carga y los fusibles del cargador",
   "Cambia la batería si está vieja"
  ],
  "pieza": "emergencia",
  "fuente": "https://pdfcoffee.com/diagnostics-and-troubleshooting-diagnostics-and-troubleshooting-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0073",
  "nombre": "Batería de cabina OK otra vez (aviso)",
  "simple": "Solo es un aviso: la batería de respaldo volvió a estar bien. No es falla.",
  "causas": [
   "La batería se recargó o se cambió"
  ],
  "arreglo": [
   "No hace falta hacer nada",
   "Si aparece seguido junto con 0072, revisa la batería"
  ],
  "pieza": "emergencia",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=102"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0301",
  "nombre": "Puerta no cierra a tiempo",
  "simple": "La puerta no terminó de cerrar en el tiempo permitido (unos 12 segundos).",
  "causas": [
   "Basura u obstáculo en la pisadera o en las guías",
   "Contacto de puerta cerrada (KET-S) sucio o desajustado",
   "Mecanismo de puerta roto o flojo (faja, acople)",
   "Fusible del motor de puerta o parámetro de cierre mal puesto"
  ],
  "arreglo": [
   "Limpia la pisadera y las guías",
   "Revisa el contacto KET-S y su cable",
   "Revisa poleas, faja y acople de la puerta",
   "Revisa los fusibles del motor de puerta"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0302",
  "nombre": "Puerta no abre a tiempo",
  "simple": "La puerta no terminó de abrir en el tiempo permitido (unos 12 segundos).",
  "causas": [
   "Contacto de puerta abierta (KET-O) sucio o desajustado",
   "Motor de puerta con falla",
   "Mecánica de la puerta trabada o sucia"
  ],
  "arreglo": [
   "Revisa el contacto KET-O y su cable",
   "Revisa el motor de puerta",
   "Revisa y limpia la mecánica de la puerta"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0303",
  "nombre": "Puerta trabada pero la cabina no sale (3 minutos)",
  "simple": "La puerta cerró y se activó el contacto de cerrado, pero la cabina no arrancó en 3 minutos.",
  "causas": [
   "Contacto de cerradura (KTS) de ese piso con falla",
   "Cerradura de ese piso desajustada"
  ],
  "arreglo": [
   "Anota en qué piso pasa",
   "Revisa el contacto KTS de ese piso",
   "Ajusta o cambia la cerradura si no cierra bien"
  ],
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0304",
  "nombre": "Limitador de fuerza de cierre (KSKB) activado muchas veces",
  "simple": "La puerta intentó cerrar más de 50 veces y siempre se reabrió porque algo la empuja.",
  "causas": [
   "Obstáculo en la puerta o en la ranura de la pisadera",
   "Contacto KSKB sucio o desajustado",
   "Cable del KSKB con falla"
  ],
  "arreglo": [
   "Saca el obstáculo y limpia la pisadera",
   "Revisa y limpia el contacto KSKB",
   "Revisa el cable del KSKB",
   "Si pasa muchas veces (unas 7 veces en 3 horas) el ascensor se bloquea: arregla y luego resetea"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/diagnostics-and-troubleshooting-diagnostics-and-troubleshooting-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0313",
  "nombre": "Error de puerta en el hueco",
  "simple": "Se pidió abrir una puerta en un lado de la cabina donde no hay puerta.",
  "causas": [
   "Configuración de lados de puerta equivocada",
   "El control no detecta bien la zona de piso"
  ],
  "arreglo": [
   "Revisa la configuración de puertas (lado 1 y lado 2)",
   "Revisa los sensores de zona de puerta (PHS)",
   "Si se cambió algo del hueco, el técnico debe repetir el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0314",
  "nombre": "Falla de preapertura de puerta",
  "simple": "Falló el circuito que deja abrir la puerta un poco antes de llegar al piso.",
  "causas": [
   "Tarjeta SUET sin energía o dañada",
   "Los dos sensores de posición de puerta no están a la misma altura",
   "Fotocélula dañada o cable desconectado"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa que la tarjeta SUET esté puesta y conectada",
   "Revisa que los sensores de posición estén a la misma altura",
   "Revisa cables y conectores"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0315",
  "nombre": "Puerta no se recupera",
  "simple": "La puerta falló al abrir o cerrar unas 20 veces seguidas y el ascensor quedó bloqueado.",
  "causas": [
   "Las mismas de 0301 y 0302: obstáculo, contactos KET o motor de puerta"
  ],
  "arreglo": [
   "Mira en el menú 50 los errores 0301 o 0302",
   "Arregla la causa de esos errores",
   "Luego resetea el ascensor"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=106"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0316",
  "nombre": "Se perdió la comunicación con la puerta",
  "simple": "El control dejó de 'escuchar' al nodo (tarjeta) de la puerta o de la cabina.",
  "causas": [
   "Nodo de puerta o de cabina apagado",
   "Cable de datos suelto o dañado",
   "Nodo sin alimentación"
  ],
  "arreglo": [
   "Revisa que el nodo de puerta tenga energía",
   "Vuelve a encenderlo",
   "Revisa conectores y el cable de datos"
  ],
  "pieza": "cable_viajero",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=106"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0336",
  "nombre": "Motor de puerta caliente",
  "simple": "El motor de la puerta se calentó demasiado.",
  "causas": [
   "Obstáculo o suciedad en la ranura de la pisadera",
   "Motor de puerta con falla",
   "La puerta abrió y cerró sin parar mucho rato"
  ],
  "arreglo": [
   "Deja enfriar el motor",
   "Limpia la pisadera y las guías",
   "Revisa el motor de puerta"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=106"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0345",
  "nombre": "Motor de puerta con temperatura destructiva",
  "simple": "El motor de la puerta pasó su temperatura máxima y se puede dañar.",
  "causas": [
   "Puerta trabada o frenada por un obstáculo por mucho rato",
   "Motor de puerta dañado"
  ],
  "arreglo": [
   "Corta la energía de la puerta y deja enfriar",
   "Busca y saca lo que frena la puerta",
   "Revisa el motor; si está dañado, cámbialo"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=107"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0371",
  "nombre": "Traba o destraba del patín bloqueada",
  "simple": "El patín (acople de la puerta) no pudo trabar o destrabar.",
  "causas": [
   "Patín bloqueado o sucio",
   "Contacto KET-S2 puenteado"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa y limpia el patín",
   "Si hay un puente en el KET-S2, sácalo"
  ],
  "peligro": "Un contacto de puerta puenteado es muy peligroso: la cabina podría moverse con la puerta abierta.",
  "pieza": "patin",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=110"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0401",
  "nombre": "Cadena de seguridad cortada en viaje",
  "simple": "La cadena de seguridad se abrió de golpe, por ejemplo con la cabina en marcha.",
  "causas": [
   "Saltó un dispositivo de seguridad (puerta, stop, limitador, paracaídas)",
   "Cable flojo en la cadena de seguridad",
   "Fusibles o fuente de la cadena de seguridad con falla"
  ],
  "arreglo": [
   "Mira el menú 50 para ver qué pasó antes",
   "Busca qué contacto se abrió y por qué",
   "Corta energía y revisa el cableado de la cadena",
   "Revisa fusibles y alimentación de la cadena"
  ],
  "peligro": "Nunca puentees la cadena para seguir trabajando.",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=111"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0402",
  "nombre": "Cabina o máquina trabada o muy lenta",
  "simple": "La cabina o el motor no se mueven o se mueven muy despacio.",
  "causas": [
   "Objeto en el hueco o mucho roce en las guías",
   "Freno que no abre bien",
   "Parámetro de velocidad nominal mal puesto en el variador"
  ],
  "arreglo": [
   "Corta energía, pon candado y busca objetos en el hueco",
   "Revisa guías y rozaderas",
   "Revisa que el freno abra completo",
   "El técnico revisa la velocidad nominal en el variador"
  ],
  "pieza": "freno",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=111"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0403",
  "nombre": "Falla en el aviso de los contactores",
  "simple": "El tablero no recibió bien la señal de que los contactores del motor cambiaron.",
  "causas": [
   "Cable flojo en el contacto auxiliar del contactor",
   "Contactor dañado o pegado",
   "Entrada de la tarjeta con falla"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa el cableado de los contactos auxiliares",
   "Prueba el contactor y cámbialo si está pegado"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=111"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0404",
  "nombre": "Dirección de viaje equivocada",
  "simple": "La cabina se movió al revés de lo que ordenó el control.",
  "causas": [
   "Contactores mal conectados (lazo abierto)",
   "Encoder (tacómetro) dañado o motor sin fuerza",
   "El variador no da suficiente fuerza (torque)"
  ],
  "arreglo": [
   "Revisa cables del motor y de los contactores",
   "Revisa el encoder y su cable",
   "El técnico revisa por qué el variador no da fuerza"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=112"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0405",
  "nombre": "Información del hueco por bus CAN",
  "simple": "Falla en los datos que llegan por el cable de comunicación (bus CAN).",
  "causas": [
   "Cable CAN suelto o dañado",
   "Conectores CAN flojos"
  ],
  "arreglo": [
   "Revisa el cable CAN",
   "Revisa y ajusta los conectores"
  ],
  "pieza": "cableado_hueco",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=112"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0406",
  "nombre": "Sobretemperatura del accionamiento",
  "simple": "El motor (o la bomba y el aceite en un hidráulico) o el hueco están muy calientes.",
  "causas": [
   "Demasiados viajes seguidos",
   "Ambiente muy caliente",
   "Ventilador que no funciona",
   "Contacto térmico o su cable con falla"
  ],
  "arreglo": [
   "Espera a que se enfríe",
   "Revisa la ventilación y el ventilador",
   "Si se repite, revisa los contactos térmicos y su cable"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=112"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0407",
  "nombre": "Variador no listo con la cabina parada",
  "simple": "El variador dejó de estar 'listo' cuando la cabina estaba parada.",
  "causas": [
   "Mala conexión entre el variador y la tarjeta MCCE",
   "Cable de la señal 'listo' suelto",
   "Falla propia del variador"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa cables y conectores entre variador y tarjeta MCCE",
   "Revisa el registro de errores del variador"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=112"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0421",
  "nombre": "Prueba de freno activada",
  "simple": "La cabina se renivelo muchas veces seguidas hacia el mismo lado y el control va a probar el freno.",
  "causas": [
   "Freno que no sujeta bien y deja resbalar la cabina",
   "Freno gastado o mal ajustado"
  ],
  "arreglo": [
   "Deja que el sistema haga la prueba",
   "Revisa desgaste y ajuste del freno",
   "Si el freno no pasa la prueba, saca de servicio y llama al técnico"
  ],
  "peligro": "Un freno débil puede dejar que la cabina se mueva sola.",
  "pieza": "freno",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "0423",
  "nombre": "Prueba de freno cancelada",
  "simple": "La prueba del freno se canceló y se volverá a intentar en 24 horas.",
  "causas": [
   "Se abrió la cadena de seguridad durante la prueba",
   "Error interno del variador",
   "La prueba demoró demasiado"
  ],
  "arreglo": [
   "Mira el menú 50 por otros errores",
   "Revisa la cadena de seguridad",
   "Si se repite, llama al técnico"
  ],
  "pieza": "freno",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=114"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "1133",
  "nombre": "Pesacargas: más de una fuente de peso",
  "simple": "El control recibe el peso de más de un lugar porque está mal configurado.",
  "causas": [
   "Configuración equivocada del pesacargas"
  ],
  "arreglo": [
   "El técnico revisa el archivo de configuración de carga nominal",
   "Deja una sola fuente de peso activa"
  ],
  "pieza": "pesacargas",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=118"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "1905",
  "nombre": "Tarjeta SIM falta o no es válida",
  "simple": "El control no encuentra la tarjeta SIM o la que tiene no sirve.",
  "causas": [
   "SIM no puesta o mal puesta",
   "SIM equivocada o dañada"
  ],
  "arreglo": [
   "Corta la energía",
   "Verifica que la SIM esté bien puesta",
   "Coloca la SIM correcta de este ascensor",
   "Haz reset del control principal"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/download/daig3300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2002",
  "nombre": "Aprendizaje: falta un piso",
  "simple": "En el viaje de aprendizaje, los pisos contados subiendo no son los mismos que bajando.",
  "causas": [
   "Imán o bandera de piso (PHS) faltante o mal puesta",
   "Sensor de imanes o PHS, o su cable, con falla"
  ],
  "arreglo": [
   "Revisa los imanes y banderas de cada piso",
   "Revisa sensores KS/PHS y sus cables",
   "El técnico repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2003",
  "nombre": "Aprendizaje: el número de pisos cambia",
  "simple": "El número de pisos contado subiendo no coincide con el contado al bajar.",
  "causas": [
   "Imanes o banderas PHS mal puestos",
   "Sensor de piso con falla"
  ],
  "arreglo": [
   "Revisa imanes y banderas PHS",
   "Revisa sensores y cables",
   "Repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2004",
  "nombre": "Más de 15 pisos contados",
  "simple": "El control contó más de 15 pisos, que es su máximo.",
  "causas": [
   "Imanes KS o banderas PHS de más",
   "Imán o bandera suelta que se cuenta doble"
  ],
  "arreglo": [
   "Cuenta los imanes KS y banderas PHS del hueco",
   "Saca los que sobran o están sueltos",
   "Repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2005",
  "nombre": "Viaje de posición no llegó",
  "simple": "El viaje para ubicarse se cortó antes de que el variador avisara 'llegué'.",
  "causas": [
   "Problema en la instalación del hueco",
   "Falla del variador durante el viaje"
  ],
  "arreglo": [
   "Revisa la instalación del hueco",
   "El técnico repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2007",
  "nombre": "Viaje pedido fuera de zona de puerta",
  "simple": "El control quiso hacer un viaje pero la cabina no estaba en zona de piso.",
  "causas": [
   "Sensor de zona de puerta (PHS) dañado o desajustado",
   "Imanes KSE o su interruptor con falla"
  ],
  "arreglo": [
   "Mira el menú 50 por errores anteriores",
   "Revisa el PHS y su ajuste",
   "Revisa imanes KSE y su interruptor",
   "Repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=133"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2008",
  "nombre": "Señal KSE no coincide",
  "simple": "Al sincronizar, la señal de los imanes KSE (cerca de los extremos) llegó mal.",
  "causas": [
   "Imán KSE movido o dañado",
   "Interruptor magnético KSE con falla"
  ],
  "arreglo": [
   "Revisa los imanes KSE",
   "Revisa el interruptor magnético KSE",
   "Repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=133"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2010",
  "nombre": "Aprendizaje: dirección desconocida",
  "simple": "Durante el aprendizaje, el control perdió en qué dirección iba la cabina.",
  "causas": [
   "Error serio en el sistema",
   "Bus CAN con ruido, sin terminación o conector flojo"
  ],
  "arreglo": [
   "Revisa el bus CAN: conectores y terminación",
   "Revisa la instalación",
   "Repite el viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2060",
  "nombre": "Pisos demasiado juntos",
  "simple": "Dos banderas de piso están a menos de 300 mm: menos de lo permitido.",
  "causas": [
   "Bandera de piso mal puesta",
   "Sensor PHS mal ubicado"
  ],
  "arreglo": [
   "Mide la distancia entre banderas",
   "Revisa la posición del PHS",
   "Corrige y repite el aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=133"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2061",
  "nombre": "Largo de bandera no permitido",
  "simple": "La zona de puerta medida es muy larga o muy corta.",
  "causas": [
   "Factor del tacómetro o diámetro de polea mal configurado",
   "Sensor de zona de puerta (PHS) con falla",
   "Banderas de largo equivocado"
  ],
  "arreglo": [
   "El técnico revisa esos parámetros",
   "Revisa el sensor PHS",
   "Pon banderas del largo correcto"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=133"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2078",
  "nombre": "No encontró el piso de arriba o de abajo",
  "simple": "En la sincronización o el aprendizaje no se encontró la bandera del piso extremo.",
  "causas": [
   "Imán KSE de abajo mal ubicado (debe estar a 1250 mm)",
   "Bandera del piso extremo faltante"
  ],
  "arreglo": [
   "Revisa la posición del imán KSE",
   "Revisa la bandera del primer y último piso",
   "Repite el aprendizaje"
  ],
  "peligro": "Si el KSE está mal ubicado, la cabina puede llegar al final de carrera KNE.",
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2110",
  "nombre": "Imagen del hueco con error",
  "simple": "El 'mapa' del hueco quedó con error al arrancar; el control hace solo un viaje de sincronización.",
  "causas": [
   "Error al arrancar el control"
  ],
  "arreglo": [
   "Deja que haga el viaje de sincronización",
   "Si se repite, mira el menú 50 por otros errores"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_bionic",
  "codigo": "2111",
  "nombre": "Posición aproximada no válida",
  "simple": "Las señales de los imanes KSE llegaron incompletas o mal.",
  "causas": [
   "Imán KSE o su interruptor con falla",
   "Cable del interruptor KSE"
  ],
  "arreglo": [
   "Revisa imanes e interruptor KSE",
   "Revisa el cable",
   "Repite el aprendizaje si cambiaste algo"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1501",
  "nombre": "Sobrecorriente en el variador",
  "simple": "El variador vio una corriente muy alta hacia el motor (unas 4 veces lo normal).",
  "causas": [
   "Subida brusca de carga o freno mal regulado",
   "Cortocircuito en los cables del motor",
   "Motor que no corresponde o parámetros de la SIM mal puestos",
   "Problema mecánico que traba la cabina"
  ],
  "arreglo": [
   "Corta energía, pon candado y revisa los cables del motor",
   "Revisa el ajuste del freno",
   "Revisa la mecánica (guías, cabina)",
   "El técnico compara parámetros de la SIM con la placa del motor"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1502",
  "nombre": "Sobretensión en el variador",
  "simple": "El voltaje interno del variador (bus de continua) llegó a su límite de 911 V.",
  "causas": [
   "Resistencia de frenado rota",
   "Chopper de frenado dañado",
   "Tensión de la red muy alta"
  ],
  "arreglo": [
   "Corta energía, pon candado y espera que se descargue",
   "Mide la resistencia de frenado y cámbiala si está rota",
   "Si el chopper está dañado hay que cambiar el variador",
   "Mide la tensión de la red"
  ],
  "peligro": "El variador guarda alto voltaje después de apagar: espera y mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1503",
  "nombre": "Falla a tierra",
  "simple": "La corriente del motor se está escapando a tierra.",
  "causas": [
   "Cable del motor pelado o con humedad",
   "Bobina del motor a tierra"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Mide el aislamiento de los cables del motor",
   "Mide el aislamiento del motor",
   "Cambia el cable o repara el motor"
  ],
  "peligro": "Riesgo de choque eléctrico: no toques partes metálicas sin cortar energía.",
  "pieza": "cables_motor",
  "fuente": "https://pdfcoffee.com/manuel-3300-3100-5500-fr-v10-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1504",
  "nombre": "Temperatura de IGBT (transistores) alta",
  "simple": "Los transistores de potencia del variador se calentaron.",
  "causas": [
   "Demasiada corriente hacia el motor"
  ],
  "arreglo": [
   "Revisa que la cabina no esté trabada ni con sobrepeso",
   "Revisa el ajuste del freno",
   "Deja enfriar y revisa la ventilación"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1505",
  "nombre": "Falla del contactor de carga",
  "simple": "Falló la carga del bus interno del variador.",
  "causas": [
   "Interferencia eléctrica (ruido)",
   "Componente interno del variador dañado"
  ],
  "arreglo": [
   "Haz reset para sacar la cabina del bloqueo",
   "Si se repite, revisa tierras y blindajes",
   "Si sigue, cambia el variador"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/manuel-3300-3100-5500-fr-v10-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1513",
  "nombre": "Variador muy frío",
  "simple": "El disipador del variador está a menos de 10 °C.",
  "causas": [
   "Cuarto o tablero muy frío"
  ],
  "arreglo": [
   "No hace falta hacer nada",
   "Si es seguido, mejora la temperatura del lugar"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=120"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1514",
  "nombre": "Variador sobrecalentado",
  "simple": "El disipador del variador pasó los 90 °C (a 85 °C da aviso).",
  "causas": [
   "Variador usado fuera de su capacidad",
   "Ventilador parado o tablero sin ventilación",
   "Ambiente muy caliente"
  ],
  "arreglo": [
   "Deja enfriar",
   "Revisa el ventilador del variador",
   "Limpia el polvo y mejora la ventilación del tablero"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1531",
  "nombre": "Faltan pulsos del encoder",
  "simple": "La señal del encoder del motor (el que mide el giro) no es válida.",
  "causas": [
   "Cable del encoder dañado o suelto",
   "Señal del encoder con ruido (mala terminación)",
   "Encoder dañado"
  ],
  "arreglo": [
   "Corta energía y revisa el cable del encoder",
   "Revisa la terminación y el blindaje del cable",
   "Si sigue, cambia el encoder"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=123"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1537",
  "nombre": "Reactor de línea caliente",
  "simple": "La bobina de entrada (reactor de línea) del variador se calentó demasiado.",
  "causas": [
   "Ventilación del tablero mala",
   "Ventilador del variador parado"
  ],
  "arreglo": [
   "Deja enfriar",
   "Revisa ventilador y ventilación del tablero"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1538",
  "nombre": "Ventilador del variador no gira",
  "simple": "El ventilador del variador está parado.",
  "causas": [
   "Ventilador quemado",
   "Ventilador trabado con polvo",
   "Conector o cable del ventilador suelto"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Limpia el ventilador",
   "Revisa su conector",
   "Cámbialo si no gira"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1658715/Schindler-3100.html?page=123"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "1542",
  "nombre": "Velocidad de llegada al piso mala",
  "simple": "La cabina pasó la última bandera del piso muy rápido o muy lento.",
  "causas": [
   "Encoder o su cable con falla",
   "Bandera de piso mal ubicada"
  ],
  "arreglo": [
   "Revisa el encoder y su cable (más si también sale 1531)",
   "Revisa la posición de las banderas",
   "Llama al técnico para el ajuste del variador"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=printthread&Board=1&main=6102&type=thread"
 },
 {
  "equipo": "schindler_fc",
  "codigo": "2402",
  "nombre": "Variador no responde por CAN",
  "simple": "El variador no mandó su señal de 'estoy vivo' por el cable CAN a tiempo.",
  "causas": [
   "Cable CAN dañado o suelto",
   "Falta la terminación del bus CAN"
  ],
  "arreglo": [
   "Revisa el cable CAN y sus conectores",
   "Revisa la terminación del bus CAN"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "00",
  "nombre": "Fuera de servicio",
  "simple": "El ascensor está fuera de servicio.",
  "causas": [
   "Hay una falla activa",
   "Lo pusieron fuera de servicio a propósito"
  ],
  "arreglo": [
   "Mira el menú 50 para ver la falla",
   "Arregla la causa"
  ],
  "pieza": "tablero_control",
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "01",
  "nombre": "Normal (automático)",
  "simple": "Todo normal: el ascensor está en automático y lleva pasajeros.",
  "causas": [
   "Funcionamiento normal"
  ],
  "arreglo": [
   "No hace falta hacer nada"
  ],
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "11",
  "nombre": "Automático sin pesacargas",
  "simple": "Funciona en automático pero con el pesacargas apagado (parámetro 107 activo).",
  "causas": [
   "Alguien desactivó el pesacargas"
  ],
  "arreglo": [
   "Averigua por qué se desactivó",
   "Arregla o calibra el pesacargas y vuelve a activarlo"
  ],
  "pieza": "pesacargas",
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "40",
  "nombre": "Configuración de software dañada",
  "simple": "La configuración del software se corrompió.",
  "causas": [
   "Configuración dañada en la memoria o la SIM"
  ],
  "arreglo": [
   "Anota el estado y los errores del menú 50",
   "Llama a Schindler: hay que recargar la configuración"
  ],
  "pieza": "tablero_control",
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "51",
  "nombre": "Modo instalación",
  "simple": "El ascensor está en modo de montaje (viaje de instalación).",
  "causas": [
   "Se activó el modo instalación (DIP S8 o comando 105)"
  ],
  "arreglo": [
   "Si ya terminó el montaje, el técnico lo desactiva"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "52",
  "nombre": "Modo configuración",
  "simple": "El control está en modo configuración.",
  "causas": [
   "Alguien está cambiando parámetros"
  ],
  "arreglo": [
   "Termina la configuración y sal del modo"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "54",
  "nombre": "Inspección sobre la cabina",
  "simple": "Está activa la inspección desde el techo de la cabina.",
  "causas": [
   "La botonera de inspección del techo está en 'inspección'"
  ],
  "arreglo": [
   "Al terminar, pon la caja de inspección en normal y sal del techo con seguridad"
  ],
  "pieza": "caja_inspeccion",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "59",
  "nombre": "Viaje de aprendizaje",
  "simple": "El ascensor está haciendo el viaje de aprendizaje: recorre el hueco y cuenta los pisos.",
  "causas": [
   "Puesta en marcha o se forzó el aprendizaje"
  ],
  "arreglo": [
   "Deja que termine sin interrumpir",
   "Ojo: el aprendizaje borra algunas configuraciones que luego hay que repetir"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "70",
  "nombre": "Recuperación del ascensor",
  "simple": "El ascensor se está recuperando solo después de una falla.",
  "causas": [
   "Hubo una falla recuperable"
  ],
  "arreglo": [
   "Espera que termine",
   "Si se repite, mira el menú 50"
  ],
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "71",
  "nombre": "Recuperación por temperatura",
  "simple": "El ascensor espera que baje la temperatura para volver a funcionar.",
  "causas": [
   "Motor, variador o hueco calientes"
  ],
  "arreglo": [
   "Espera que se enfríe",
   "Revisa ventilación si se repite"
  ],
  "pieza": "maquina",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "72",
  "nombre": "Recuperando la posición de la cabina",
  "simple": "El ascensor perdió su posición y está haciendo un viaje para ubicarse (sincronización).",
  "causas": [
   "Corte de luz",
   "Imanes o sensores de piso con falla"
  ],
  "arreglo": [
   "Espera que termine",
   "Si no logra ubicarse, el técnico hace un viaje de aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "73",
  "nombre": "Recuperando la posición de la puerta",
  "simple": "El ascensor está tratando de saber dónde está la puerta.",
  "causas": [
   "Operador de puertas nuevo o reiniciado",
   "Falla de comunicación con la puerta"
  ],
  "arreglo": [
   "Espera que termine",
   "Si no sale de 73, revisa la comunicación con el operador de puertas"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "74",
  "nombre": "Batería de respaldo baja",
  "simple": "La batería de respaldo tiene poca carga; el ascensor puede no funcionar.",
  "causas": [
   "Baterías viejas",
   "Cargador con falla"
  ],
  "arreglo": [
   "Mide las baterías",
   "Cámbialas si están viejas, aunque marquen 24 V"
  ],
  "pieza": "emergencia",
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "97",
  "nombre": "Solo funciona en inspección",
  "simple": "El ascensor solo anda en inspección y no en automático.",
  "causas": [
   "Baterías del sistema (TSU) con falla",
   "Otra falla guardada en el menú 50"
  ],
  "arreglo": [
   "Revisa los errores en el menú 50",
   "Revisa las baterías"
  ],
  "pieza": "emergencia",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=showflat&Number=37770"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "98",
  "nombre": "Error fatal",
  "simple": "El ascensor está bloqueado por un error fatal.",
  "causas": [
   "Una falla grave o repetida (ver menú 50)"
  ],
  "arreglo": [
   "Lee el menú 50 para ver la causa",
   "Arréglala",
   "Borra el bloqueo con menú 10, comando 101"
  ],
  "peligro": "No resetees sin saber la causa.",
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/handbook-3100-3300-5300-pdf-free.html"
 },
 {
  "equipo": "schindler_estado",
  "codigo": "99",
  "nombre": "Bloqueo persistente",
  "simple": "El ascensor queda fuera de servicio hasta que hagan el reset 101.",
  "causas": [
   "Falla fatal persistente (freno, cadena de seguridad, preapertura, renivelación)"
  ],
  "arreglo": [
   "Lee el menú 50",
   "Arregla la causa",
   "Menú 10, comando 101 y RESET en la tarjeta (apagar y prender no lo borra)"
  ],
  "peligro": "Estos bloqueos son de seguridad (freno, cadena): no los saltes.",
  "pieza": "tablero_control",
  "fuente": "http://www.firstchroniclesproductions.com/desk_top/dropbox/3300%20_Control_System_Basics/3300%20Control%20System%20Basics%20REV%200.3.5.pdf"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0002",
  "nombre": "ExceptionMC: falla del procesador",
  "simple": "El procesador del control tuvo una falla interna y el sistema se bloqueó solo.",
  "causas": [
   "Falla interna del procesador o del software"
  ],
  "arreglo": [
   "Anota el código y la hora",
   "Haz reset del control",
   "Si se repite, llama a Schindler con el registro de excepciones"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0003",
  "nombre": "NoKSE_STDSTL: sin señal KSE en parada",
  "simple": "La cabina paró en un extremo del hueco y la señal del imán KSE no coincide con la posición calculada.",
  "causas": [
   "Parámetros KSE_DISTANCE o largo de hueco mal puestos",
   "Imán KSE con la polaridad al revés",
   "Imán KSE movido"
  ],
  "arreglo": [
   "Revisa que los imanes KSE estén donde dicen los parámetros",
   "Revisa la polaridad del imán KSE de abajo",
   "Corrige y repite el aprendizaje"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://www.manoeuvres-ascenseurs.fr/ERROR%20LOG%205500.pdf"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0004",
  "nombre": "InvldMovement: movimiento no esperado",
  "simple": "La cabina se movió cuando el control pensaba que estaba parada.",
  "causas": [
   "Alguien abrió el freno a mano",
   "Freno que no sujeta bien"
  ],
  "arreglo": [
   "Si fue un rescate manual, es normal",
   "Si nadie abrió el freno, revisa el freno ya mismo"
  ],
  "peligro": "Si la cabina se mueve sola, saca de servicio: puede ser falla de freno.",
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0006",
  "nombre": "SB_on_STDSTL: freno activo en parada",
  "simple": "El control ve el contactor del freno (SB) activo cuando la cabina está parada.",
  "causas": [
   "Contactor SB pegado o sucio",
   "Cableado del contacto auxiliar del SB"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa el contactor SB y límpialo",
   "Revisa su cableado"
  ],
  "peligro": "Si el freno queda abierto en parada, la cabina se puede mover.",
  "pieza": "freno",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0007",
  "nombre": "SH_Fault: contactor principal se soltó",
  "simple": "Los contactos auxiliares de los contactores SH/SH1 se abrieron durante el viaje.",
  "causas": [
   "Se abrió la cadena de seguridad",
   "Parámetro mal puesto (si pasa al llegar al piso, puede ser la preapertura)",
   "Cable de los contactos auxiliares flojo"
  ],
  "arreglo": [
   "Revisa la cadena de seguridad",
   "Revisa el circuito de preapertura de puertas",
   "Revisa el cableado de los contactos auxiliares"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0008",
  "nombre": "SB_Fault: falla del control del freno",
  "simple": "El freno no abrió a tiempo (5 segundos) o su contacto se abrió de golpe.",
  "causas": [
   "Contacto auxiliar del SB se abrió",
   "Módulo de freno con falla (conocido: BCM 4202.QB que bloquea tras cientos de viajes)",
   "Contactores SB/SB1 sucios"
  ],
  "arreglo": [
   "Corta energía, pon candado y revisa los contactores SB/SB1",
   "Revisa el módulo de freno y su LED de error",
   "Resetear el módulo lo quita por un rato; la solución es cambiarlo (consulta a Schindler)"
  ],
  "peligro": "Falla de freno: no pongas el ascensor en servicio sin revisar.",
  "pieza": "freno",
  "fuente": "https://www.scribd.com/document/264830983/Intermittent-Problem-With-Brake-Module-BCM-4202-for-MX-GC"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0009",
  "nombre": "KB_Fault: contactos del freno",
  "simple": "Los contactos del freno (KB y KB1) no cambian como deben.",
  "causas": [
   "Micro del freno desajustado o sucio",
   "Falta el puente en el conector cuando hay un solo contacto KB"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa y ajusta los micros KB/KB1",
   "Si hay un solo KB, revisa que esté el puente en el conector de la tarjeta"
  ],
  "peligro": "No puentees el micro del freno: el control dejaría de vigilar el freno.",
  "pieza": "micro_freno",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0010",
  "nombre": "FC_Fault: el variador pidió parada",
  "simple": "El variador pidió una parada de emergencia y el viaje se cortó.",
  "causas": [
   "Falla propia del variador"
  ],
  "arreglo": [
   "Lee el registro de errores del variador",
   "Arregla la falla que indica el variador"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0011",
  "nombre": "FC_Block: variador bloqueado",
  "simple": "El variador está bloqueado y no disponible; el control sigue cuando vuelva.",
  "causas": [
   "El variador tiene una falla activa"
  ],
  "arreglo": [
   "Revisa el registro del variador",
   "Arregla la falla y espera que vuelva a estar listo"
  ],
  "pieza": "variador",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0012",
  "nombre": "DirectionErr: dirección equivocada",
  "simple": "La cabina se movió en dirección contraria a la ordenada.",
  "causas": [
   "Falla del variador",
   "Se abrió la cadena de seguridad en el viaje",
   "Cableado de entradas malo",
   "Parámetro mal puesto (distancia KSE)"
  ],
  "arreglo": [
   "Revisa el registro de eventos del Travel Control",
   "Revisa el variador y las conexiones",
   "Revisa la distancia KSE en los parámetros"
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0013",
  "nombre": "OverSpeed: exceso de velocidad cerca del extremo",
  "simple": "La cabina iba muy rápido dentro de la zona KSE (cerca del piso de arriba o de abajo).",
  "causas": [
   "Imanes KSE mal ubicados",
   "Encoder o tacómetro con falla"
  ],
  "arreglo": [
   "No pongas en servicio",
   "Revisa posición de imanes KSE",
   "Revisa encoder y su cable",
   "Llama al técnico"
  ],
  "peligro": "Exceso de velocidad cerca del extremo: riesgo de golpe contra amortiguadores.",
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0020",
  "nombre": "PositionLost: posición perdida",
  "simple": "Un imán de piso apareció a más de 15 cm de donde se aprendió; el control hace un viaje para ubicarse.",
  "causas": [
   "Imanes de piso movidos",
   "Parámetros KSE equivocados",
   "Tacómetro de posición con falla"
  ],
  "arreglo": [
   "Revisa la posición de los imanes",
   "Revisa los parámetros KSE",
   "Si moviste un imán, haz un nuevo aprendizaje",
   "Revisa el tacómetro de posición"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0074",
  "nombre": "Safety KNE: final de carrera abierto",
  "simple": "Se abrió el tramo de la cadena de seguridad del final de carrera (KNE).",
  "causas": [
   "Contacto abierto en la cadena de seguridad",
   "Cableado malo de los contactos",
   "Entrada de la tarjeta de interfaz con falla"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa el KNE y los contactos de ese tramo",
   "Revisa cables y la tarjeta de interfaz"
  ],
  "peligro": "Si la cabina pasó el final de carrera, revisa el freno antes de volver a servicio.",
  "pieza": "finales_carrera",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0075",
  "nombre": "Safety RTS: contactos de puertas de piso",
  "simple": "La cadena de seguridad se abrió en el tramo de los contactos de puertas de piso (KTS).",
  "causas": [
   "Contacto KTS de puerta de piso sucio o dañado",
   "Cable flojo entre contactos KTS",
   "La puerta rebota y se abre tras cerrar"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa cada contacto KTS y sus cables",
   "Ajusta la puerta para que no rebote",
   "El técnico puede subir el parámetro DOOR_CONTACT_DELAY"
  ],
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0076",
  "nombre": "Contactos de puerta de cabina (software antiguo)",
  "simple": "La cadena de seguridad se abrió en el tramo de los contactos de puerta de cabina (KTC).",
  "causas": [
   "Contacto KTC sucio o desajustado",
   "Cable flojo del KTC"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa y ajusta el contacto KTC",
   "Revisa el cable (en software nuevo este mensaje se llama 149 'Safety T5')"
  ],
  "pieza": "contacto_puerta_cabina",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0088",
  "nombre": "TachoFault: falla del tacómetro de posición",
  "simple": "La posición que da el tacómetro (encoder) salta o no da pulsos durante el viaje.",
  "causas": [
   "Encoder de posición dañado",
   "Cable del encoder flojo",
   "Cinta o polea del encoder resbalando"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa encoder y su cable",
   "Revisa que no resbale"
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/mx-gc-error-codes-pdf-free.html"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0094",
  "nombre": "DoorLockFault: puerta abierta pero cadena cerrada",
  "simple": "La cadena de seguridad dice 'puerta cerrada' pero la puerta está abierta: hay un contacto puenteado.",
  "causas": [
   "Contacto KTS de puerta de piso puenteado",
   "Contacto de puerta de cabina puenteado"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Busca y saca puentes en los contactos de puertas",
   "Prueba cada puerta"
  ],
  "peligro": "Muy peligroso: la cabina podría moverse con la puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://www.manoeuvres-ascenseurs.fr/ERROR%20LOG%205500.pdf"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "0709",
  "nombre": "Cadena de seguridad abierta en viaje (5500)",
  "simple": "La cadena de seguridad se abrió durante un viaje o una prueba; basta un corte muy corto.",
  "causas": [
   "Cableado entre la tarjeta de control y el variador",
   "Contacto de seguridad que falla un instante"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa el cableado entre tarjeta de control y variador",
   "Revisa contactos de la cadena uno por uno"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=showflat&Number=31714"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "1501",
  "nombre": "Posición de cabina no válida",
  "simple": "La posición que lee el encoder está fuera del rango de pisos aprendidos.",
  "causas": [
   "Encoder movido cuando estaba desconectado",
   "Se cambió el encoder",
   "Encoder dañado"
  ],
  "arreglo": [
   "Si el encoder está dañado, cámbialo",
   "Haz un viaje de aprendizaje (técnico)"
  ],
  "pieza": "encoder",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=showflat&Number=29524"
 },
 {
  "equipo": "schindler_mxgc",
  "codigo": "1502",
  "nombre": "Salto de posición",
  "simple": "La posición de la cabina saltó más de 240 mm en 10 milisegundos; tras 5 veces seguidas para de emergencia y se bloquea.",
  "causas": [
   "Encoder o su cable con falla",
   "Cinta o encoder resbalando"
  ],
  "arreglo": [
   "Revisa el encoder y su cable",
   "Revisa que no resbale",
   "Haz reset y aprendizaje si cambiaste algo"
  ],
  "peligro": "Parada de emergencia: revisa a las personas atrapadas primero.",
  "pieza": "encoder",
  "fuente": "https://www.vatortrader.com/forums/ubbthreads.php?ubb=showflat&Number=29524"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0002",
  "nombre": "Circuito de seguridad del ascensor",
  "simple": "La cadena de seguridad se abrió sin motivo o no cerró cuando debía.",
  "causas": [
   "Se abrió un contacto con la cabina en marcha",
   "Contacto de puerta o de seguridad sucio"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Busca contactos abiertos en la cadena de seguridad",
   "Nunca puentees"
  ],
  "peligro": "No puentees la cadena de seguridad.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0003",
  "nombre": "Sobrecarga de cabina",
  "simple": "El ascensor detecta demasiado peso en la cabina.",
  "causas": [
   "Carga muy alta en la cabina",
   "Pesacargas con falla"
  ],
  "arreglo": [
   "Que bajen personas o carga",
   "Si está vacía, revisa el pesacargas"
  ],
  "pieza": "pesacargas",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0018",
  "nombre": "Datos de la tarjeta SIM dañados",
  "simple": "La tarjeta SIM se puede leer, pero sus datos están dañados.",
  "causas": [
   "SIM dañada"
  ],
  "arreglo": [
   "Cambia la tarjeta SIM (pídela a Schindler)"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0019",
  "nombre": "Reinicio por watchdog",
  "simple": "El control principal se reinició porque su 'vigilante' detectó un cuelgue.",
  "causas": [
   "Falla interna del software del control principal"
  ],
  "arreglo": [
   "Anota cada cuánto pasa",
   "Consulta a Schindler por una versión nueva del software"
  ],
  "pieza": "tablero_control",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0020",
  "nombre": "Circuito de seguridad puenteado",
  "simple": "La cadena de seguridad no se abre cuando la puerta se abre: hay un puente.",
  "causas": [
   "Puente en un contacto de puerta (KTS o KTC)"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Busca puentes en la cadena de seguridad y sácalos"
  ],
  "peligro": "Con un puente, la cabina puede moverse con la puerta abierta.",
  "pieza": "cerradura",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0301",
  "nombre": "Puerta no cierra a tiempo",
  "simple": "La puerta no terminó de cerrar en el tiempo límite; si pasa 80 veces se vuelve fatal.",
  "causas": [
   "Obstáculo o suciedad en hojas y guías",
   "Mecanismo roto o flojo",
   "Fusible del motor de puerta",
   "Parámetro de cierre mal puesto"
  ],
  "arreglo": [
   "Limpia hojas, guías y pisadera",
   "Revisa el mecanismo de la puerta",
   "Revisa fusibles del motor de puerta",
   "Revisa el cable del contacto de puerta cerrada"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0313",
  "nombre": "Error de puerta en el hueco",
  "simple": "Se pidió abrir la puerta pero la cabina no está en un piso; el pedido se rechaza.",
  "causas": [
   "Sensor de zona de piso con falla",
   "Cabina fuera de nivel"
  ],
  "arreglo": [
   "Revisa los sensores de zona de piso",
   "Revisa la nivelación"
  ],
  "pieza": "posicionamiento",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0316",
  "nombre": "Sin comunicación con la puerta",
  "simple": "Se cortó la comunicación con el nodo de puerta o de cabina.",
  "causas": [
   "Nodo de puerta o cabina apagado",
   "Mala alimentación del nodo de puerta"
  ],
  "arreglo": [
   "Revisa la alimentación del nodo",
   "Vuelve a encenderlo",
   "Revisa cables de datos"
  ],
  "pieza": "cable_viajero",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0401",
  "nombre": "Cadena de seguridad cortada (accionamiento)",
  "simple": "La cadena de seguridad se abrió de forma inesperada.",
  "causas": [
   "Saltó un contacto de seguridad",
   "Cable flojo en la cadena"
  ],
  "arreglo": [
   "Mira el historial del menú 50",
   "Busca qué contacto se abrió",
   "Revisa el cableado"
  ],
  "fuente": "https://manoeuvres-ascenseurs.fr/BX.pdf"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "0404",
  "nombre": "Dirección de accionamiento equivocada",
  "simple": "La cabina se movió al revés de lo ordenado.",
  "causas": [
   "Cableado del motor o contactores al revés",
   "Encoder dañado o motor sin excitación",
   "Variador sin fuerza suficiente"
  ],
  "arreglo": [
   "Revisa el cableado",
   "Revisa contactores y encoder",
   "El técnico revisa el variador"
  ],
  "pieza": "encoder",
  "fuente": "https://pdfcoffee.com/apostila-miconic-bx-rel-51-e-bx-010pdf-1-pdf-free.html"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "LED-1",
  "nombre": "Parpadeo código 1 en la tarjeta SCIC",
  "simple": "La tarjeta SIM falta o está dañada.",
  "causas": [
   "SIM no puesta",
   "SIM dañada o equivocada"
  ],
  "arreglo": [
   "Corta energía",
   "Revisa que la SIM esté bien puesta",
   "Pon la SIM correcta"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.slideshare.net/slideshow/schindler-manual-del-miconic-bx/249870625"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "LED-6",
  "nombre": "Parpadeo código 6 (DOOR 4x)",
  "simple": "El limitador de fuerza de cierre (KSKB) se activa demasiadas veces.",
  "causas": [
   "Obstáculo en la puerta",
   "Basura en los rieles de la puerta",
   "Contacto KSKB con falla"
  ],
  "arreglo": [
   "Saca el obstáculo",
   "Limpia los rieles",
   "Revisa el contacto KSKB"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.slideshare.net/slideshow/schindler-manual-del-miconic-bx/249870625"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "LED-10",
  "nombre": "Parpadeo código 10 (DRIVE 1x)",
  "simple": "La cadena de seguridad sigue abierta aunque las puertas están cerradas y trabadas.",
  "causas": [
   "Contacto de seguridad abierto (stop, final, paracaídas)",
   "Contacto de puerta desajustado"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Busca el contacto abierto con el multímetro",
   "Ajusta o cambia el contacto"
  ],
  "peligro": "No puentees la cadena de seguridad.",
  "pieza": "cerradura",
  "fuente": "https://www.slideshare.net/slideshow/schindler-manual-del-miconic-bx/249870625"
 },
 {
  "equipo": "schindler_bx",
  "codigo": "LED-11",
  "nombre": "Parpadeo código 11 (DRIVE 2x)",
  "simple": "Error en el aviso (realimentación) de los contactores.",
  "causas": [
   "Contactor pegado",
   "Contacto auxiliar o su cable con falla"
  ],
  "arreglo": [
   "Corta energía y pon candado",
   "Revisa contactores y sus contactos auxiliares"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.slideshare.net/slideshow/schindler-manual-del-miconic-bx/249870625"
 },
 {
  "equipo": "schindler_varidor35",
  "codigo": "0809",
  "nombre": "Comando desconocido",
  "simple": "El operador de puertas recibió una orden que no entiende.",
  "causas": [
   "El software del operador se reinició solo",
   "Versión de software que no es compatible"
  ],
  "arreglo": [
   "Anota la versión de software",
   "Haz el reset del Varidor (apaga, aprieta JHCT/JHT, espera 15 s, prende)",
   "Si sigue, Schindler cambia la memoria (PROM)"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.collegesidekick.com/study-docs/16981196"
 },
 {
  "equipo": "schindler_varidor35",
  "codigo": "0812",
  "nombre": "Dirección de movimiento equivocada",
  "simple": "La puerta se mueve al revés de la orden (por ejemplo, manda abrir y está cerrando).",
  "causas": [
   "Contacto KET-S2 con falla",
   "Ajuste automático (AutoSetup) perdido"
  ],
  "arreglo": [
   "Revisa el contacto KET-S2 y su LED 'Closed' en el HMI",
   "Cambia el KET-S2 si está malo",
   "Haz el AutoSetup del operador"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.collegesidekick.com/study-docs/16981196"
 },
 {
  "equipo": "schindler_varidor35",
  "codigo": "0821",
  "nombre": "Puerta se mueve demasiado rápido",
  "simple": "La puerta pasó de abierta a cerrada (o al revés) más rápido de lo mínimo esperado.",
  "causas": [
   "Sensor de posición de puerta con falla",
   "Ajuste de la puerta perdido"
  ],
  "arreglo": [
   "Revisa la mecánica y sensores de la puerta",
   "Haz el AutoSetup del operador"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.collegesidekick.com/study-docs/16981196"
 },
 {
  "equipo": "schindler_varidor35",
  "codigo": "0832",
  "nombre": "Falla del contacto KET-S2",
  "simple": "Aviso: con la puerta cerrada, el contacto KET-S2 no está cerrado (sale cada 5 veces seguidas).",
  "causas": [
   "Contacto KET-S2 desajustado o sucio",
   "Cable del KET-S2 flojo"
  ],
  "arreglo": [
   "Corta energía de la puerta",
   "Ajusta y limpia el KET-S2",
   "Revisa su cable"
  ],
  "pieza": "operador_puertas",
  "fuente": "https://www.collegesidekick.com/study-docs/16981196"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "UV",
  "nombre": "Baja tensión en el bus DC (n.º 1)",
  "simple": "Al variador le llega poca tensión y se apagó para protegerse.",
  "causas": [
   "Tensión de la red baja o corte de luz",
   "Falta una fase o hay un fusible quemado",
   "Bornes de entrada flojos"
  ],
  "arreglo": [
   "Mide la tensión de entrada en las 3 fases con el multímetro",
   "Revisa fusibles, llave principal y bornes de entrada (con la energía cortada y bloqueada)",
   "Esta falla se borra sola cuando la tensión vuelve a lo normal",
   "Si la red está bien y sigue saliendo, llama al técnico del variador"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "OV",
  "nombre": "Sobretensión en el bus DC (n.º 2)",
  "simple": "La tensión interna del variador subió demasiado, casi siempre al frenar.",
  "causas": [
   "Frenado muy brusco (rampa de bajada muy corta)",
   "Resistencia de frenado mal conectada o de valor incorrecto",
   "Subidas o picos de tensión en la red"
  ],
  "arreglo": [
   "Corta la energía, bloquea y espera que el variador se descargue",
   "Revisa los cables de la resistencia de frenado y mide su valor",
   "Mide la tensión de la red",
   "Si todo está bien, que un técnico alargue la rampa de frenado (Pr 0.04)"
  ],
  "peligro": "El variador guarda alta tensión un rato después de cortar la luz. Mide antes de tocar.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "OI.AC",
  "nombre": "Sobrecorriente de golpe en la salida (n.º 3)",
  "simple": "Salió demasiada corriente hacia el motor de golpe (más del 222 %).",
  "causas": [
   "Cortocircuito en el cable del motor o motor con aislamiento dañado",
   "Arranque o frenado muy brusco",
   "Cable del encoder suelto o con ruido",
   "Ganancias de velocidad o de corriente muy altas"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Mide el aislamiento del motor y de sus cables con megóhmetro",
   "Revisa el cable, el blindaje y el acople del encoder",
   "Espera al menos 10 segundos antes de resetear",
   "Si sigue, que un técnico revise rampas y ganancias"
  ],
  "peligro": "Puede haber un cortocircuito: no resetees muchas veces seguidas.",
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "OI.br",
  "nombre": "Sobrecorriente en el transistor de frenado (n.º 4)",
  "simple": "Hay un corto en el circuito de frenado o la resistencia de frenado es muy baja.",
  "causas": [
   "Cables de la resistencia de frenado en corto",
   "Resistencia de valor menor al mínimo permitido",
   "Aislamiento de la resistencia dañado"
  ],
  "arreglo": [
   "Corta la energía, bloquea y espera la descarga",
   "Revisa los cables de la resistencia de frenado",
   "Mide su valor y compáralo con el mínimo del manual",
   "Mide el aislamiento de la resistencia a tierra"
  ],
  "peligro": "La resistencia de frenado puede estar muy caliente y con alta tensión.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "PS",
  "nombre": "Falla de la fuente interna (n.º 5)",
  "simple": "La fuente de alimentación interna del variador falló.",
  "causas": [
   "Un módulo opcional (Solutions Module) con problema",
   "Falla de hardware del variador"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Saca los módulos opcionales y resetea",
   "Si sigue, el variador va al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "Et",
  "nombre": "Disparo externo por el borne 31 (n.º 6)",
  "simple": "Llegó una orden de parada desde afuera por el borne 31.",
  "causas": [
   "Señal del borne 31 cortada o floja",
   "El control o la comunicación activó el parámetro 10.32 o 10.38"
  ],
  "arreglo": [
   "Revisa el cable y la señal del borne 31",
   "Revisa el parámetro 10.32 y quién lo maneja",
   "Nunca puentees el borne: busca por qué se abrió"
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.SPd",
  "nombre": "Exceso de velocidad del motor (n.º 7)",
  "simple": "El motor pasó la velocidad máxima permitida.",
  "causas": [
   "Límite de sobrevelocidad (Pr 3.08) muy bajo",
   "Ganancia de velocidad (Pr 3.10) muy alta y el motor se pasa",
   "En lazo abierto: pasó 1,2 veces la velocidad máxima"
  ],
  "arreglo": [
   "Saca el ascensor de servicio",
   "Revisa que el freno sujete bien",
   "Revisa el ajuste de sobrevelocidad Pr 3.08",
   "Que un técnico baje la ganancia Pr 3.10 y pruebe en inspección"
  ],
  "peligro": "Exceso de velocidad en un ascensor es grave: no lo pongas en servicio hasta saber la causa.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "PS.24V",
  "nombre": "Sobrecarga de la fuente de 24 V (n.º 9)",
  "simple": "Se pide más corriente de 24 V de la que el variador puede dar.",
  "causas": [
   "Salidas digitales y encoder consumiendo demasiado",
   "Módulos opcionales que consumen mucho",
   "Un cable de 24 V en corto o muy cargado"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Desconecta cargas y módulos uno por uno hasta hallar el culpable",
   "Si hace falta, pon una fuente externa de 24 V de más de 50 W"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "br.th",
  "nombre": "Sensor de temperatura de la resistencia de frenado interna (n.º 10)",
  "simple": "Falla el control de temperatura de la resistencia de frenado interna (solo variadores tamaño 0).",
  "causas": [
   "Termistor (sensor de calor) mal conectado",
   "Ventilador del variador parado",
   "Resistencia interna dañada"
  ],
  "arreglo": [
   "Corta la energía y revisa la conexión del termistor",
   "Revisa que el ventilador gire",
   "Si no tiene resistencia interna, un técnico desactiva esta falla (Pr 0.51 = 8)",
   "Cambia la resistencia interna si está dañada"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "tunE1",
  "nombre": "Autoajuste: el encoder no se movió (n.º 11)",
  "simple": "Durante el autoajuste el motor no giró o el encoder no lo vio girar.",
  "causas": [
   "El freno no se abrió",
   "Cable del encoder mal conectado",
   "Encoder suelto de su acople",
   "Parámetros del encoder mal puestos (Pr 3.26 y 3.38)"
  ],
  "arreglo": [
   "Verifica que el freno abra durante la prueba",
   "Revisa el cableado del encoder",
   "Revisa el acople del encoder al motor",
   "Revisa los parámetros y repite el autoajuste"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "tunE2",
  "nombre": "Autoajuste: sentido de giro al revés (n.º 12)",
  "simple": "El encoder cuenta al revés de como gira el motor.",
  "causas": [
   "Fases del motor conectadas en otro orden",
   "Cables del encoder cruzados"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Revisa el cableado del motor y del encoder",
   "En lazo cerrado vectorial: cambia de lugar dos fases del motor",
   "Repite el autoajuste"
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "tunE3",
  "nombre": "Autoajuste: señales U V W del encoder mal conectadas (n.º 13)",
  "simple": "Las señales de posición del encoder (U, V, W) están mal conectadas.",
  "causas": [
   "Cables U, V, W del encoder cruzados",
   "Cableado del motor equivocado"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Revisa el cableado del motor",
   "Revisa los cables U, V y W del encoder",
   "Repite el autoajuste"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "tunE7",
  "nombre": "Número de polos del motor mal puesto (n.º 17)",
  "simple": "El número de polos del motor está mal configurado.",
  "causas": [
   "Parámetro de polos (Pr 5.11) con valor equivocado",
   "Pulsos por vuelta del encoder mal puestos"
  ],
  "arreglo": [
   "Lee la placa del motor",
   "Corrige Pr 5.11 y los pulsos por vuelta del encoder",
   "Repite el autoajuste"
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "tunE",
  "nombre": "Autoajuste cortado (n.º 18)",
  "simple": "El autoajuste se cortó antes de terminar.",
  "causas": [
   "Alguien apretó la tecla roja de stop",
   "Se abrió el borne 31 (parada segura) durante la prueba",
   "El variador se disparó por otra falla"
  ],
  "arreglo": [
   "Mira si salió otra falla y atiéndela primero",
   "Asegura que el borne 31 quede activo durante la prueba",
   "Deshabilita y vuelve a habilitar el variador, y repite el autoajuste"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "It.br",
  "nombre": "Sobrecarga de la resistencia de frenado (n.º 19)",
  "simple": "La resistencia de frenado trabajó de más y el variador calcula que se recalentó.",
  "causas": [
   "Datos de la resistencia mal puestos (Pr 10.30 y 10.31)",
   "Resistencia de frenado chica para el trabajo"
  ],
  "arreglo": [
   "Revisa Pr 10.30 y 10.31 con los datos de la placa de la resistencia",
   "Si es chica, cámbiala por una de más potencia y corrige esos parámetros"
  ],
  "peligro": "La resistencia de frenado puede quemar al tocarla.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "It.AC",
  "nombre": "Sobrecarga de corriente del motor (n.º 20)",
  "simple": "El motor tomó mucha corriente durante mucho tiempo.",
  "causas": [
   "Carga trabada o dura (por ejemplo, freno que no abre del todo)",
   "Corriente nominal del motor mal puesta o en cero",
   "Ruido en el encoder o acople flojo"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Revisa que el freno abra bien y que nada roce",
   "Revisa la corriente nominal del motor en el variador",
   "Revisa el cable y el acople del encoder"
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.ht1",
  "nombre": "Transistores de potencia muy calientes, por cálculo (n.º 21)",
  "simple": "El variador calcula que sus transistores de potencia se calientan demasiado.",
  "causas": [
   "Muchos viajes seguidos",
   "Arranques o frenadas muy fuertes",
   "Frecuencia de conmutación alta",
   "Mucha carga en el motor"
  ],
  "arreglo": [
   "Deja enfriar el variador",
   "Revisa que el ascensor no lleve sobrecarga",
   "Que un técnico baje la frecuencia de conmutación o suavice las rampas"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.ht2",
  "nombre": "Disipador muy caliente (n.º 22)",
  "simple": "El disipador (aletas de metal) del variador está demasiado caliente.",
  "causas": [
   "Ventiladores parados o sucios",
   "Cuarto de máquinas sin ventilación",
   "Filtros del tablero tapados",
   "Mucha carga o rampas muy cortas"
  ],
  "arreglo": [
   "Revisa que los ventiladores giren",
   "Con la energía cortada, limpia filtros y aletas",
   "Mejora la ventilación del cuarto de máquinas"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.CtL",
  "nombre": "Tarjeta de control muy caliente (n.º 23)",
  "simple": "La tarjeta de control del variador está demasiado caliente.",
  "causas": [
   "Ventiladores parados",
   "Tablero sin ventilación o filtros tapados",
   "Cuarto de máquinas muy caluroso"
  ],
  "arreglo": [
   "Revisa que los ventiladores giren",
   "Limpia los filtros de la puerta del tablero",
   "Baja la temperatura del cuarto de máquinas"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "th",
  "nombre": "Motor caliente (termistor) (n.º 24)",
  "simple": "El sensor de temperatura del motor avisa que está muy caliente o que su cable está cortado.",
  "causas": [
   "Motor recalentado",
   "Cable del termistor (sensor de calor) cortado o suelto"
  ],
  "arreglo": [
   "Deja enfriar el motor",
   "Mide la continuidad del termistor",
   "Busca por qué se calienta: freno que roza, sobrecarga o mala ventilación",
   "No desactives la protección del motor"
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "thS",
  "nombre": "Termistor del motor en corto (n.º 25)",
  "simple": "El cable del sensor de temperatura del motor está en corto.",
  "causas": [
   "Cableado del termistor en corto",
   "Termistor dañado"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Revisa el cableado del termistor",
   "Cambia el termistor (o el motor) si está dañado"
  ],
  "pieza": "maquina",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.Ld1",
  "nombre": "Sobrecarga de las salidas digitales (n.º 26)",
  "simple": "Las salidas digitales y los 24 V piden más de 200 mA.",
  "causas": [
   "Relés o lámparas conectados que consumen mucho",
   "Un cable de salida en corto"
  ],
  "arreglo": [
   "Revisa la carga en los bornes 22, 24, 25 y 26",
   "Desconecta una salida a la vez para hallar la que consume de más"
  ],
  "pieza": "tablero_control",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "O.ht3",
  "nombre": "Variador muy caliente, por cálculo (n.º 27)",
  "simple": "El variador calcula que se calienta de más: intenta parar y luego se dispara.",
  "causas": [
   "Mucha ondulación en el bus DC (red de mala calidad)",
   "Trabajo muy seguido",
   "Mucha carga en el motor"
  ],
  "arreglo": [
   "Deja enfriar el variador",
   "Revisa la red de alimentación",
   "Reduce la carga o los viajes seguidos"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "SCL",
  "nombre": "Se perdió la comunicación con el teclado remoto (n.º 30)",
  "simple": "El variador dejó de hablar con el teclado remoto por RS-485.",
  "causas": [
   "Cable del teclado suelto o dañado",
   "Teclado malogrado"
  ],
  "arreglo": [
   "Vuelve a conectar el cable del teclado",
   "Revisa el cable y cámbialo si está dañado",
   "Si sigue, cambia el teclado"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EEF",
  "nombre": "Memoria de parámetros dañada (n.º 31)",
  "simple": "Se dañaron los datos guardados en la memoria del variador.",
  "causas": [
   "Corte de luz justo cuando guardaba",
   "Falla de la memoria interna"
  ],
  "arreglo": [
   "Ten a mano la copia de parámetros (SMARTCARD o anotada)",
   "Un técnico carga valores de fábrica (1233 o 1244 en Pr x.00) y resetea",
   "Vuelve a cargar todos los parámetros del ascensor y guárdalos"
  ],
  "peligro": "Después de esta falla el variador queda con valores de fábrica: no lo uses en el ascensor sin volver a configurarlo.",
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "PH",
  "nombre": "Falta una fase en la entrada (n.º 32)",
  "simple": "Falta una fase de la entrada o las fases están muy desiguales.",
  "causas": [
   "Fusible quemado o fase caída",
   "Bornes de entrada flojos",
   "Red desbalanceada"
  ],
  "arreglo": [
   "Mide las 3 fases de entrada",
   "Con la energía cortada, revisa fusibles y bornes",
   "Mide también con el ascensor andando: la tensión debe mantenerse"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "rS",
  "nombre": "No pudo medir la resistencia del motor (n.º 33)",
  "simple": "En el autoajuste o al arrancar, el variador no pudo medir el motor.",
  "causas": [
   "Cable del motor cortado o suelto",
   "Contactor de salida al motor que no cierra"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Mide la continuidad de las 3 fases hacia el motor",
   "Revisa que los contactores del motor cierren durante la prueba"
  ],
  "pieza": "cables_motor",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "SAVE.Er",
  "nombre": "Parámetros guardados dañados (n.º 36)",
  "simple": "Se cortó la luz mientras se guardaban los parámetros y esa copia se dañó.",
  "causas": [
   "Corte de energía durante el guardado"
  ],
  "arreglo": [
   "El variador vuelve solo a la última copia buena",
   "Revisa que los parámetros del ascensor estén bien",
   "Guarda de nuevo (Pr x.00 = 1000 y reset)"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC1",
  "nombre": "Encoder: fuente sobrecargada (n.º 189)",
  "simple": "La fuente que alimenta al encoder está sobrecargada.",
  "causas": [
   "Cable de alimentación del encoder en corto",
   "Encoder que consume más de lo que da la fuente",
   "Tensión del encoder mal elegida"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Revisa el cableado de alimentación del encoder",
   "Compara el consumo del encoder con el máximo: 200 mA a 15 V, o 300 mA a 8 V y 5 V"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC2",
  "nombre": "Encoder: cable cortado (n.º 190)",
  "simple": "El variador detecta un cable del encoder cortado.",
  "causas": [
   "Cable del encoder cortado o suelto",
   "Conexión equivocada de las señales",
   "Tensión del encoder mal puesta (Pr 3.36)",
   "Encoder malogrado"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "Mide la continuidad del cable del encoder",
   "Revisa la tensión elegida en Pr 3.36",
   "Si todo está bien y sigue, cambia el encoder"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC3",
  "nombre": "Encoder: desfase mientras anda (n.º 191)",
  "simple": "La posición que da el encoder no cuadra mientras el motor gira.",
  "causas": [
   "Ruido en la señal del encoder",
   "Blindaje (malla) del cable mal puesto",
   "Encoder flojo en su montaje"
  ],
  "arreglo": [
   "Revisa la malla del cable del encoder",
   "Ajusta bien el montaje del encoder",
   "Repite la medición de desfase (offset)"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC4",
  "nombre": "Encoder: falla de comunicación (n.º 192)",
  "simple": "El variador no puede comunicarse con el encoder.",
  "causas": [
   "Alimentación del encoder incorrecta",
   "Velocidad de comunicación del encoder mal puesta",
   "Cableado del encoder",
   "Encoder malogrado"
  ],
  "arreglo": [
   "Revisa la tensión de alimentación del encoder",
   "Revisa la velocidad de comunicación del encoder",
   "Revisa el cableado",
   "Si sigue, cambia el encoder"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC5",
  "nombre": "Encoder: datos con error (n.º 193)",
  "simple": "Los datos que manda el encoder llegan con errores.",
  "causas": [
   "Ruido en la señal del encoder",
   "Malla del cable mal puesta",
   "Configuración del encoder EnDat equivocada"
  ],
  "arreglo": [
   "Revisa la malla del cable del encoder",
   "Aleja el cable del encoder de los cables de fuerza",
   "En encoder EnDat, haz la autoconfiguración (Pr 3.41)"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC7",
  "nombre": "Encoder: no pudo arrancar (n.º 195)",
  "simple": "El encoder no pudo iniciar al prender el variador.",
  "causas": [
   "Tipo de encoder mal puesto (Pr 3.38)",
   "Cableado del encoder",
   "Alimentación del encoder mal elegida",
   "Encoder malogrado"
  ],
  "arreglo": [
   "Resetea el variador",
   "Revisa Pr 3.38, el cableado y la alimentación",
   "Haz la autoconfiguración (Pr 3.41)",
   "Si sigue, cambia el encoder"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "EnC10",
  "nombre": "Encoder: ángulo de fase incorrecto (n.º 198)",
  "simple": "El ángulo del encoder respecto al motor está mal y el motor no se alinea.",
  "causas": [
   "Ángulo de fase (Pr 3.25) mal medido o mal puesto",
   "Cableado del encoder"
  ],
  "arreglo": [
   "Revisa el cableado del encoder",
   "Haz un autoajuste para medir el ángulo de fase",
   "No subas el límite de sobrevelocidad para quitar la falla: puede esconder un encoder malo"
  ],
  "peligro": "Después de cambiar o mover el encoder, prueba primero en modo inspección.",
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "Enc11",
  "nombre": "Encoder seno-coseno: falla de alineación (n.º 161)",
  "simple": "Las señales seno y coseno del encoder tienen ruido y no cuadran al iniciar.",
  "causas": [
   "Ruido en las señales del encoder",
   "Malla del cable mal puesta"
  ],
  "arreglo": [
   "Revisa la malla del cable del encoder",
   "Aleja el cable del encoder de los cables de fuerza",
   "Revisa las señales con un osciloscopio"
  ],
  "pieza": "encoder",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "HF26",
  "nombre": "Falla de hardware: arranque suave o transistor de frenado (n.º 226)",
  "simple": "El relé de arranque suave no cerró o el transistor de frenado está en corto.",
  "causas": [
   "Falla interna del variador"
  ],
  "arreglo": [
   "Corta la energía y bloquea",
   "No abras ni repares el variador por dentro",
   "Envía el variador al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "HF31",
  "nombre": "Ventilador interno o módulo sin energía (n.º 231)",
  "simple": "Falló el ventilador interno de los condensadores (tamaño 4 o más) o un módulo no prendió.",
  "causas": [
   "Ventilador interno malogrado",
   "En variadores de varios módulos: un módulo sin alimentación"
  ],
  "arreglo": [
   "Revisa la alimentación de todos los módulos",
   "Si es un solo variador, es falla de hardware: va al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "unidrivesp",
  "codigo": "SL1.Er",
  "nombre": "Módulo opcional con falla (SL1.Er, SL2.Er o SL3.Er; n.º 202, 207, 212)",
  "simple": "Un módulo opcional (de encoder, entradas/salidas o comunicación) detectó una falla.",
  "causas": [
   "Problema en el cable del encoder si es un módulo de encoder",
   "Módulo mal configurado",
   "Módulo recalentado (código 74)"
  ],
  "arreglo": [
   "Mira el número de error del módulo en Pr 15.50, 16.50 o 17.50 (según la ranura 1, 2 o 3)",
   "Busca ese número en la tabla del módulo",
   "Revisa cables y conectores del módulo",
   "Si sigue, cambia el módulo"
  ],
  "pieza": "variador",
  "fuente": "https://raw.githubusercontent.com/Andhias/ans-elevator-library/main/files/NIDEC/frequentieregelaars-unidrive-sp-advanced-user-guide-en-iss11-0471-0002-11.pdf"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "oC",
  "nombre": "Sobrecorriente",
  "simple": "Salió demasiada corriente del variador hacia el motor.",
  "causas": [
   "Corto o aislamiento malo en cables del motor o en el motor",
   "Freno que no abre y el motor arranca trabado",
   "Aceleración muy rápida o datos del motor mal programados",
   "Contactor del motor que abre o cierra con el variador en marcha"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera que se apague la luz CHARGE",
   "Desconecta el motor del variador y mide aislamiento de motor y cables con megóhmetro",
   "Revisa que el freno abra bien y que la cabina no esté trabada",
   "Revisa con el supervisor datos del motor y tiempos de aceleración",
   "Si todo mide bien y la falla sigue, llama al servicio técnico del variador"
  ],
  "peligro": "Alto voltaje: el variador queda cargado varios minutos después de apagar. Mide antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "GF",
  "nombre": "Falla a tierra",
  "simple": "Se está escapando corriente a tierra en la salida del variador (cables o motor).",
  "causas": [
   "Aislamiento dañado en el cable del motor",
   "Bobinado del motor húmedo o dañado",
   "Cable pelado que roza la estructura o la canaleta"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga del variador",
   "Desconecta el motor y mide aislamiento a tierra de cada fase con megóhmetro",
   "Busca el cable dañado y repáralo o cámbialo",
   "No resetees muchas veces seguidas sin encontrar la causa"
  ],
  "peligro": "Riesgo de choque eléctrico: hay corriente que se va a tierra.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "ov",
  "nombre": "Sobretensión",
  "simple": "El voltaje interno (bus DC) del variador subió demasiado, casi siempre al frenar o al bajar con carga.",
  "causas": [
   "Resistencia de frenado desconectada, abierta o de valor equivocado",
   "Desaceleración programada muy rápida",
   "Voltaje de la red muy alto o con picos",
   "Falla del transistor de frenado"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga",
   "Mide la resistencia de frenado (ohmios) y compárala con su placa; revisa sus cables",
   "Mide el voltaje de entrada entre fases",
   "Revisa con el supervisor el tiempo de desaceleración"
  ],
  "peligro": "Alto voltaje en el bus DC y la resistencia de frenado puede estar muy caliente.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "Uv1",
  "nombre": "Subtensión (bus DC)",
  "simple": "El voltaje interno del variador bajó demasiado mientras trabajaba.",
  "causas": [
   "Corte o bajón de la energía de entrada",
   "Falta una fase o hay un borne flojo en la alimentación",
   "Llave o contactor de entrada en mal estado",
   "Fusibles de entrada quemados"
  ],
  "arreglo": [
   "Mide el voltaje de las tres fases en la entrada del variador",
   "Con energía cortada y bloqueada, ajusta bornes y revisa fusibles y contactor de entrada",
   "Si la red es inestable, avisa al supervisor y al electricista del edificio"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "Uv2",
  "nombre": "Subtensión de la fuente de control",
  "simple": "Falló la fuente interna que alimenta el control del variador.",
  "causas": [
   "Voltaje de entrada muy bajo o inestable",
   "Falla interna de la fuente de control del variador"
  ],
  "arreglo": [
   "Mide el voltaje de entrada",
   "Apaga, espera la descarga y vuelve a encender",
   "Si se repite con buen voltaje, llama al servicio técnico del variador"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "Uv3",
  "nombre": "Falla del circuito de carga suave",
  "simple": "Falló el circuito que carga despacio los condensadores del variador al encender.",
  "causas": [
   "Encendidos y apagados muy seguidos",
   "Relé o contactor interno de precarga dañado",
   "Voltaje de entrada muy bajo al encender"
  ],
  "arreglo": [
   "No prendas y apagues seguido; espera unos minutos",
   "Mide el voltaje de entrada",
   "Si se repite, llama al servicio técnico del variador"
  ],
  "peligro": "Alto voltaje interno: no abras el variador con energía.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "LF",
  "nombre": "Pérdida de fase de salida",
  "simple": "Falta una fase entre el variador y el motor.",
  "causas": [
   "Cable del motor cortado o borne flojo (U, V, W)",
   "Contactor del motor con un contacto quemado o que no cierra bien",
   "Bobinado del motor abierto"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Ajusta los bornes U, V, W en el variador, el contactor y el motor",
   "Mide continuidad y resistencia de los tres bobinados del motor (deben ser parecidas)",
   "Cambia el contactor si tiene contactos quemados"
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "LF2",
  "nombre": "Desbalance de corriente de salida",
  "simple": "La corriente en las tres fases del motor no es pareja.",
  "causas": [
   "Borne flojo o contacto del contactor gastado",
   "Bobinado del motor dañado",
   "Falla en la etapa de salida del variador"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Ajusta bornes y revisa los contactos del contactor del motor",
   "Mide la resistencia de los tres bobinados del motor",
   "Si motor y cables están bien, llama al servicio técnico del variador"
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "PF",
  "nombre": "Pérdida de fase de entrada",
  "simple": "Falta una fase en la entrada o el voltaje de entrada está desbalanceado.",
  "causas": [
   "Fusible de entrada quemado",
   "Borne flojo en R/S/T o en la llave principal",
   "Red eléctrica con una fase caída o desbalanceada"
  ],
  "arreglo": [
   "Mide el voltaje entre fases (L1-L2, L2-L3, L1-L3); deben ser parecidos",
   "Con energía cortada y bloqueada, revisa fusibles y ajusta bornes",
   "Si la red viene mal, avisa al electricista del edificio"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "oH",
  "nombre": "Sobrecalentamiento del disipador",
  "simple": "El disipador (radiador) del variador está muy caliente.",
  "causas": [
   "Ventilador del variador parado o sucio",
   "Sala de máquinas muy caliente o sin ventilación",
   "Disipador tapado con polvo",
   "Mucha carga o demasiados viajes seguidos"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Limpia el disipador y el ventilador",
   "Comprueba que el ventilador gire al encender; cámbialo si no gira",
   "Mejora la ventilación de la sala de máquinas"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "oH1",
  "nombre": "Sobrecalentamiento del disipador (falla)",
  "simple": "El disipador del variador está demasiado caliente y el variador se detiene.",
  "causas": [
   "Ventilador del variador malo",
   "Disipador sucio o tapado",
   "Sala de máquinas muy caliente"
  ],
  "arreglo": [
   "Deja enfriar el variador",
   "Con energía cortada y bloqueada, limpia disipador y ventilador",
   "Revisa que el ventilador gire; cámbialo si está malo",
   "Mejora la ventilación de la sala"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=466"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "oL1",
  "nombre": "Sobrecarga del motor",
  "simple": "El motor trabajó con demasiada corriente por mucho tiempo.",
  "causas": [
   "Cabina con sobrepeso o contrapeso mal balanceado",
   "Freno que roza o no abre del todo",
   "Corriente nominal del motor mal programada",
   "Mucha fricción en guías o máquina"
  ],
  "arreglo": [
   "Deja enfriar el motor",
   "Verifica la carga y el balance cabina/contrapeso",
   "Revisa que el freno abra completo",
   "Revisa con el supervisor los datos del motor programados"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "oL2",
  "nombre": "Sobrecarga del variador",
  "simple": "El variador entregó más corriente de la que aguanta por mucho tiempo.",
  "causas": [
   "Sobrecarga o mal balance cabina/contrapeso",
   "Freno que no abre bien",
   "Variador pequeño para el motor"
  ],
  "arreglo": [
   "Deja enfriar el variador",
   "Verifica la carga y el balance",
   "Revisa que el freno abra completo",
   "Consulta al supervisor si el variador es del tamaño correcto"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "rr",
  "nombre": "Falla del transistor de frenado",
  "simple": "El transistor que manda la energía a la resistencia de frenado está dañado.",
  "causas": [
   "Resistencia de frenado en corto o de valor muy bajo",
   "Cable de la resistencia en corto a tierra",
   "Transistor interno del variador dañado"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga",
   "Mide la resistencia de frenado y el aislamiento de sus cables",
   "Si la resistencia está bien, el variador necesita servicio técnico"
  ],
  "peligro": "Alto voltaje en bornes de la resistencia de frenado.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "PGo",
  "nombre": "Encoder desconectado",
  "simple": "El variador no recibe la señal del encoder.",
  "causas": [
   "Cable o conector del encoder suelto o cortado",
   "Tarjeta del encoder (PG) mal conectada",
   "Encoder dañado o sin alimentación",
   "Freno que no abre y el motor no gira"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa el conector y el cable del encoder hasta la tarjeta PG",
   "Mide la alimentación del encoder en la tarjeta",
   "Comprueba que el freno abra al arrancar"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "dEv",
  "nombre": "Desviación de velocidad excesiva",
  "simple": "La velocidad real del motor es muy distinta a la que pide el variador.",
  "causas": [
   "Freno que no abre a tiempo",
   "Sobrecarga o mal balance cabina/contrapeso",
   "Señal del encoder con ruido o mal conectada",
   "Aceleración muy rápida"
  ],
  "arreglo": [
   "Revisa que el freno abra a tiempo",
   "Verifica carga y balance",
   "Revisa cable y blindaje del encoder",
   "Revisa con el supervisor los ajustes de aceleración"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CE",
  "nombre": "Error de comunicación MEMOBUS/Modbus",
  "simple": "Se cortó o falla la comunicación serial con el tablero o la PC.",
  "causas": [
   "Cable RS-485 suelto o con hilos invertidos",
   "Dirección, velocidad o paridad distintas entre los equipos",
   "Falta resistencia de terminación o hay ruido eléctrico"
  ],
  "arreglo": [
   "Revisa el cable y los bornes de comunicación",
   "Comprueba que H5-01, H5-02 y H5-03 coincidan con el tablero o la PC",
   "Revisa la resistencia de terminación (DIP switch S2)"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "bUS",
  "nombre": "Error de comunicación de tarjeta opcional",
  "simple": "Falló la comunicación de la tarjeta opcional de red del variador.",
  "causas": [
   "Tarjeta opcional mal insertada",
   "Cable de red suelto",
   "El tablero (maestro) dejó de comunicar"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa que la tarjeta opcional esté bien puesta",
   "Revisa el cable de red y que el tablero esté funcionando"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CF",
  "nombre": "Falla de control",
  "simple": "El variador no logra controlar bien el motor.",
  "causas": [
   "Datos del motor mal ingresados o falta el autoajuste",
   "Carga trabada o freno cerrado"
  ],
  "arreglo": [
   "Revisa que el freno abra y la cabina no esté trabada",
   "Revisa con el supervisor los datos del motor y el autoajuste"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CoF",
  "nombre": "Falla de offset de corriente",
  "simple": "El variador detectó un error en su medición de corriente.",
  "causas": [
   "Falla del circuito interno que mide la corriente",
   "Ruido eléctrico o arranque con el motor todavía girando"
  ],
  "arreglo": [
   "Apaga, espera la descarga y vuelve a encender",
   "Revisa tierras y blindajes",
   "Si se repite, llama al servicio técnico del variador"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CPF00 / CPF01",
  "nombre": "Error del circuito de control",
  "simple": "Hay una falla en la tarjeta de control del variador.",
  "causas": [
   "Ruido eléctrico fuerte",
   "Tarjeta de control dañada",
   "Operador (teclado) mal conectado"
  ],
  "arreglo": [
   "Apaga, espera la descarga y vuelve a encender",
   "Revisa tierras y que el operador esté bien conectado",
   "Si se repite, llama al servicio técnico (posible cambio de tarjeta)"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CPF02",
  "nombre": "Error de conversión A/D",
  "simple": "Falla el circuito que lee las señales analógicas en la tarjeta de control.",
  "causas": [
   "Ruido eléctrico",
   "Tarjeta de control dañada"
  ],
  "arreglo": [
   "Apaga, espera la descarga y vuelve a encender",
   "Revisa tierras y cables de control",
   "Si se repite, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CPF03",
  "nombre": "Error de conexión de la tarjeta de control",
  "simple": "La tarjeta de control no está bien conectada dentro del variador.",
  "causas": [
   "Conector interno flojo",
   "Tarjeta de control dañada"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga",
   "Revisa que la tarjeta y sus conectores estén bien puestos",
   "Si sigue, llama al servicio técnico"
  ],
  "peligro": "Alto voltaje interno: espera la descarga antes de abrir.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "CPF06",
  "nombre": "Error de datos de EEPROM",
  "simple": "Se dañaron los datos de la memoria donde se guardan los parámetros.",
  "causas": [
   "Corte de energía mientras se guardaban parámetros",
   "Memoria de la tarjeta dañada"
  ],
  "arreglo": [
   "Apaga, espera la descarga y vuelve a encender",
   "Con el supervisor, recarga los parámetros desde una copia de respaldo",
   "Si sigue, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "EF0",
  "nombre": "Falla externa desde tarjeta opcional",
  "simple": "La tarjeta opcional de comunicación mandó una señal de falla externa.",
  "causas": [
   "El tablero envió una falla por la red",
   "Error en la configuración de la red"
  ],
  "arreglo": [
   "Mira en el tablero de control qué falla mandó",
   "Soluciona esa causa y resetea"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "EF3 a EF8",
  "nombre": "Falla externa (borne S3 a S8)",
  "simple": "Se activó una entrada (S3 a S8) programada como falla externa.",
  "causas": [
   "El tablero de control mandó una señal de falla",
   "Cable o contacto de esa entrada suelto",
   "Entrada mal programada"
  ],
  "arreglo": [
   "Mira en el plano qué equipo va conectado a ese borne",
   "Soluciona la causa en ese equipo",
   "Revisa el cable de la entrada",
   "Nunca puentees la entrada para quitar la falla"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=281"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "SE1",
  "nombre": "Error de respuesta del contactor del motor",
  "simple": "El contactor del motor no confirmó que cerró dentro del tiempo programado (S6-10).",
  "causas": [
   "Contactor que no cierra o está pegado",
   "Contacto auxiliar de confirmación sucio o cable suelto",
   "Bobina del contactor sin tensión"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa el contacto auxiliar del contactor y su cable hasta la entrada del variador",
   "Comprueba que la bobina del contactor reciba tensión al dar marcha",
   "Cambia el contactor si está malo; no puentees la confirmación"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=273"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "SE2",
  "nombre": "Error de corriente al arranque",
  "simple": "Al dar marcha no salió suficiente corriente al motor, y el freno no se manda abrir.",
  "causas": [
   "Contactor del motor que no cerró",
   "Cable del motor cortado o borne suelto",
   "Bobinado del motor abierto"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa contactor del motor y bornes U, V, W",
   "Mide continuidad de los bobinados del motor"
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=273"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "SE3",
  "nombre": "Error de corriente de salida",
  "simple": "Después de abrir el freno, la corriente del motor cayó por debajo del 25 %.",
  "causas": [
   "Contactor del motor que se abrió durante el viaje",
   "Cable o borne del motor flojo",
   "Corte en la cadena de seguridad que suelta el contactor"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa contactor del motor y bornes",
   "Revisa la cadena de seguridad en el tablero (sin puentear nada)"
  ],
  "peligro": "Si el motor pierde corriente con el freno abierto, la cabina puede moverse: verifica que el freno cierre bien.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=273"
 },
 {
  "equipo": "yaskawa_l1000a",
  "codigo": "SE4",
  "nombre": "Error de respuesta del freno",
  "simple": "Las señales de confirmación del freno no cambiaron a tiempo (S6-05, 500 ms de fábrica).",
  "causas": [
   "Micro (contacto) de freno desajustado o malo",
   "Freno que no abre o no cierra",
   "Cable de la señal del freno suelto"
  ],
  "arreglo": [
   "Asegura la cabina y el contrapeso; corta la energía, bloquea y etiqueta",
   "Revisa el ajuste de los micros de freno y su cableado",
   "Revisa el freno con el procedimiento del fabricante",
   "Nunca puentees el micro de freno"
  ],
  "peligro": "El freno es una pieza de seguridad: la cabina puede moverse si el freno falla.",
  "pieza": "micro_freno",
  "fuente": "https://www.manualslib.com/manual/1229958/Yaskawa-L1000a.html?page=273"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OC1",
  "nombre": "Sobrecorriente al acelerar",
  "simple": "Salió demasiada corriente al motor mientras aceleraba.",
  "causas": [
   "Freno que no abre",
   "Contrapeso mal balanceado o cabina trabada",
   "Error de conexión en cables del motor o contactores",
   "Aceleración muy rápida"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga del variador",
   "Revisa que el freno abra y que la cabina no esté trabada",
   "Revisa conexiones del motor y contactores",
   "Revisa con el supervisor el balance y la aceleración"
  ],
  "peligro": "Alto voltaje: el variador queda cargado unos minutos después de apagar.",
  "pieza": "freno",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OC2",
  "nombre": "Sobrecorriente al desacelerar",
  "simple": "Salió demasiada corriente al motor mientras frenaba (desaceleración).",
  "causas": [
   "Desaceleración muy rápida",
   "Contrapeso mal balanceado",
   "Error de conexión en cables del motor o contactores"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa cables del motor y contactores",
   "Revisa con el supervisor el tiempo de desaceleración y el balance"
  ],
  "peligro": "Alto voltaje: espera la descarga antes de tocar.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OC3",
  "nombre": "Sobrecorriente a velocidad constante",
  "simple": "Salió demasiada corriente al motor mientras viajaba a velocidad fija.",
  "causas": [
   "Exceso de carga en la cabina",
   "Freno que roza",
   "Cabina o contrapeso trabados",
   "Corto en cables del motor"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa el freno y que nada esté trabado en el hueco",
   "Mide aislamiento de cables del motor"
  ],
  "peligro": "Alto voltaje: espera la descarga antes de tocar.",
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OV1",
  "nombre": "Sobretensión al acelerar",
  "simple": "El voltaje interno (bus DC) subió demasiado mientras aceleraba.",
  "causas": [
   "Voltaje de la red muy alto o con picos",
   "Resistencia de frenado desconectada o dañada"
  ],
  "arreglo": [
   "Mide el voltaje de entrada entre fases",
   "Con energía cortada y bloqueada, revisa la resistencia de frenado y sus cables"
  ],
  "peligro": "Alto voltaje en el bus DC.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OV2",
  "nombre": "Sobretensión al desacelerar",
  "simple": "El voltaje interno (bus DC) subió demasiado mientras frenaba.",
  "causas": [
   "Resistencia de frenado no conectada o dañada",
   "Tiempo de desaceleración muy corto",
   "Resistencia de frenado de poca potencia"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga",
   "Mide la resistencia de frenado y compárala con su placa",
   "Revisa con el supervisor el tiempo de desaceleración"
  ],
  "peligro": "Alto voltaje en el bus DC; la resistencia de frenado puede quemar.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OV3",
  "nombre": "Sobretensión a velocidad constante",
  "simple": "El voltaje interno (bus DC) subió demasiado mientras viajaba a velocidad fija.",
  "causas": [
   "Resistencia de frenado no conectada o dañada",
   "Cabina que baja con mucha carga y el motor genera energía",
   "Voltaje de la red muy alto"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta; espera la descarga",
   "Revisa la resistencia de frenado y sus cables",
   "Mide el voltaje de entrada"
  ],
  "peligro": "Alto voltaje en el bus DC.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "LV",
  "nombre": "Subtensión",
  "simple": "El voltaje interno (bus DC) bajó por debajo del nivel mínimo.",
  "causas": [
   "Voltaje de la red bajo",
   "Corte de energía",
   "Borne flojo o fusible quemado en la entrada"
  ],
  "arreglo": [
   "Mide el voltaje de las tres fases en la entrada",
   "Con energía cortada y bloqueada, revisa fusibles y ajusta bornes",
   "Si la red es inestable, avisa al electricista del edificio"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Lin",
  "nombre": "Pérdida de fase de entrada",
  "simple": "Falta una fase en la entrada o el voltaje entre fases está muy desbalanceado.",
  "causas": [
   "Fusible de entrada quemado",
   "Borne flojo en la entrada",
   "Red eléctrica con una fase caída"
  ],
  "arreglo": [
   "Mide el voltaje entre fases; deben ser parecidos",
   "Con energía cortada y bloqueada, revisa fusibles y bornes"
  ],
  "pieza": "interruptor_principal",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OPL",
  "nombre": "Pérdida de fase de salida",
  "simple": "Falta una fase entre el variador y el motor.",
  "causas": [
   "Cable del motor cortado o borne flojo",
   "Contactor del motor que no cierra bien",
   "Bobinado del motor abierto"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Ajusta bornes U, V, W y revisa contactos del contactor",
   "Mide la resistencia de los tres bobinados del motor"
  ],
  "pieza": "cables_motor",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OH1",
  "nombre": "Sobretemperatura del disipador",
  "simple": "El disipador (radiador) del variador se calentó demasiado.",
  "causas": [
   "Ventilador del variador malo",
   "Temperatura alta en la sala o en el tablero",
   "Disipador sucio"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Limpia disipador y ventilador",
   "Comprueba que el ventilador gire; cámbialo si no gira",
   "Mejora la ventilación"
  ],
  "pieza": "variador",
  "fuente": "https://www.fujielectric-europe.com/fileadmin/03_Downloads/03_01_Drives_and_Automation/Low_voltage_Drives/LM2C/SG_FRENIC_LM2C_EN_1_1_0__3ph_230V_included_.pdf"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OH2",
  "nombre": "Alarma externa",
  "simple": "Una entrada programada como alarma externa (THR) no está activa.",
  "causas": [
   "El equipo conectado a esa entrada mandó alarma (por ejemplo un térmico)",
   "Cable de la entrada suelto o cortado",
   "Entrada programada como THR sin nada conectado"
  ],
  "arreglo": [
   "Mira en el plano qué va conectado a la entrada THR",
   "Soluciona la causa en ese equipo",
   "Revisa el cable de la entrada; no la puentees"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.fujielectric-europe.com/fileadmin/03_Downloads/03_01_Drives_and_Automation/Low_voltage_Drives/LM2C/SG_FRENIC_LM2C_EN_1_1_0__3ph_230V_included_.pdf"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OH3",
  "nombre": "Sobretemperatura interna del variador",
  "simple": "La temperatura dentro del variador pasó el límite.",
  "causas": [
   "Sala o tablero muy caliente",
   "Ventilador del tablero o del variador malo"
  ],
  "arreglo": [
   "Deja enfriar",
   "Revisa ventiladores y ventilación del tablero",
   "Mejora la ventilación de la sala de máquinas"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OH4",
  "nombre": "Protección del motor (termistor PTC/NTC)",
  "simple": "El termistor del motor avisó que el motor está muy caliente.",
  "causas": [
   "Motor sobrecargado o con muchos viajes seguidos",
   "Ventilador del motor malo o pequeño",
   "Cable del termistor suelto"
  ],
  "arreglo": [
   "Deja enfriar el motor",
   "Revisa el ventilador del motor",
   "Revisa el cable del termistor hasta el variador",
   "Verifica carga y balance de la cabina"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OH6",
  "nombre": "Sobretemperatura de la resistencia de carga",
  "simple": "Se calentó la resistencia interna de carga (precarga) del variador.",
  "causas": [
   "Encendidos y apagados muy seguidos del variador",
   "Cortes de energía repetidos en poco tiempo"
  ],
  "arreglo": [
   "Deja el variador apagado unos minutos para que enfríe",
   "Evita prender y apagar seguido",
   "Si se repite sin causa, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OL1",
  "nombre": "Sobrecarga del motor",
  "simple": "La protección térmica electrónica del motor se activó por exceso de corriente.",
  "causas": [
   "Exceso de carga o mal balance cabina/contrapeso",
   "Freno que roza",
   "Datos del motor mal programados"
  ],
  "arreglo": [
   "Deja enfriar el motor",
   "Verifica carga, balance y freno",
   "Revisa con el supervisor los datos del motor"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OLU",
  "nombre": "Sobrecarga del variador",
  "simple": "El variador trabajó con más corriente de la que aguanta.",
  "causas": [
   "Exceso de carga o mal balance",
   "Freno que no abre bien",
   "Ventilación pobre del variador"
  ],
  "arreglo": [
   "Deja enfriar el variador",
   "Verifica carga, balance y freno",
   "Limpia disipador y ventilador"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er1",
  "nombre": "Error de memoria",
  "simple": "Hubo un error al guardar datos en la memoria del variador.",
  "causas": [
   "Corte de energía mientras se guardaban parámetros",
   "Memoria dañada"
  ],
  "arreglo": [
   "Apaga, espera y vuelve a encender",
   "Con el supervisor, revisa o recarga los parámetros",
   "Si sigue, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er2",
  "nombre": "Error de comunicación con el teclado",
  "simple": "El variador no se comunica bien con el teclado.",
  "causas": [
   "Cable o conector del teclado flojo o dañado",
   "Teclado dañado"
  ],
  "arreglo": [
   "Revisa y vuelve a conectar el cable del teclado",
   "Prueba con otro cable o teclado"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er3",
  "nombre": "Error de CPU",
  "simple": "Falló el procesador (CPU) del variador.",
  "causas": [
   "Ruido eléctrico fuerte",
   "Tarjeta de control dañada"
  ],
  "arreglo": [
   "Apaga, espera la descarga y vuelve a encender",
   "Revisa tierras y blindajes",
   "Si se repite, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er4",
  "nombre": "Error de comunicación con tarjeta opcional",
  "simple": "Falla la comunicación entre el variador y una tarjeta opcional.",
  "causas": [
   "Tarjeta opcional mal insertada",
   "Tarjeta opcional dañada"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa que la tarjeta opcional esté bien puesta",
   "Si sigue, llama al servicio técnico"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er6",
  "nombre": "Error de operación",
  "simple": "Se intentó una operación incorrecta (error en la secuencia de marcha).",
  "causas": [
   "Ajustes de las funciones L11 a L18 mal hechos",
   "Valores de velocidad (multipaso) repetidos",
   "Señales del freno o del contactor (MC) en estado incorrecto"
  ],
  "arreglo": [
   "Revisa que las señales de freno y contactor lleguen bien al variador",
   "Revisa con el supervisor las funciones L11 a L18 y las velocidades",
   "Resetea y prueba en inspección"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.fujielectric-europe.com/fileadmin/03_Downloads/03_01_Drives_and_Automation/Low_voltage_Drives/LM2C/SG_FRENIC_LM2C_EN_1_1_0__3ph_230V_included_.pdf"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er7",
  "nombre": "Error de autoajuste (tuning)",
  "simple": "Falló el autoajuste del motor o el ajuste de la posición de los polos magnéticos.",
  "causas": [
   "Falta una fase entre el variador y el motor",
   "Datos de placa del motor mal ingresados",
   "Freno o contactor no actuaron durante el ajuste"
  ],
  "arreglo": [
   "Revisa cables del motor y contactor",
   "Revisa con el supervisor los datos de placa del motor",
   "Repite el autoajuste siguiendo el manual"
  ],
  "peligro": "Durante el autoajuste el motor puede girar: asegura la cabina y que no haya nadie en el hueco.",
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/2157439/Fuji-Electric-Frenic-Lift.html?page=20"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Er8",
  "nombre": "Error de comunicación RS-485 (puerto 1)",
  "simple": "Se cortó la comunicación por el puerto RS-485 1.",
  "causas": [
   "Cable de comunicación suelto o dañado",
   "Dirección o velocidad distintas entre equipos",
   "Falta resistencia de terminación o hay ruido"
  ],
  "arreglo": [
   "Revisa el cable y el conector RJ-45",
   "Revisa que la configuración (y01 y demás) coincida con el tablero o la PC",
   "Revisa el switch de resistencia de terminación"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "ErP",
  "nombre": "Error de comunicación RS-485 (puerto 2)",
  "simple": "Se cortó la comunicación por el puerto RS-485 2 (bornera).",
  "causas": [
   "Cable de comunicación suelto o dañado",
   "Configuración distinta entre equipos",
   "Falta resistencia de terminación o hay ruido"
  ],
  "arreglo": [
   "Revisa el cable en la bornera",
   "Revisa la configuración del puerto 2 (y11 y demás)",
   "Revisa el switch de resistencia de terminación"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/2364985/Fuji-Electric-Frenic-Lift-Lm2c-Series.html?page=40"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Ert",
  "nombre": "Error de comunicación CANopen",
  "simple": "Falla la comunicación CANopen entre el variador y el tablero.",
  "causas": [
   "Cable CAN suelto o dañado",
   "Falta resistencia de terminación",
   "Tablero sin comunicar"
  ],
  "arreglo": [
   "Revisa cable y conectores CAN",
   "Revisa la resistencia de terminación",
   "Revisa que el tablero esté funcionando"
  ],
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "PG",
  "nombre": "Cable del encoder cortado",
  "simple": "El variador detectó que el cableado del encoder está cortado.",
  "causas": [
   "Cable del encoder cortado o conector suelto",
   "Encoder dañado",
   "Tarjeta del encoder mal conectada"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa conector y cable del encoder",
   "Mide la alimentación del encoder"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "OS",
  "nombre": "Sobrevelocidad",
  "simple": "El motor pasó la velocidad máxima permitida.",
  "causas": [
   "Señal del encoder con ruido o mal conectada",
   "Cabina arrastrada por desbalance o freno débil",
   "Ajustes de velocidad incorrectos"
  ],
  "arreglo": [
   "Revisa cable y blindaje del encoder",
   "Revisa el freno y el balance cabina/contrapeso",
   "Revisa con el supervisor los ajustes de velocidad"
  ],
  "peligro": "Sobrevelocidad es peligrosa: verifica freno, limitador y paracaídas antes de volver a servicio.",
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "ErE",
  "nombre": "Diferencia de velocidad",
  "simple": "La velocidad real del motor no coincide con la que pide el variador.",
  "causas": [
   "Freno que no abre a tiempo",
   "Encoder con ruido o mal conectado",
   "Sobrecarga o mal balance"
  ],
  "arreglo": [
   "Revisa que el freno abra a tiempo",
   "Revisa cable del encoder",
   "Verifica carga y balance"
  ],
  "pieza": "encoder",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Ot",
  "nombre": "Sobre corriente de torque",
  "simple": "El variador pidió demasiado torque (fuerza) al motor.",
  "causas": [
   "Cabina o contrapeso trabados",
   "Freno que no abre",
   "Sobrecarga"
  ],
  "arreglo": [
   "Revisa que nada esté trabado en el hueco",
   "Revisa que el freno abra",
   "Verifica la carga"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "ECL",
  "nombre": "Error de lógica personalizable",
  "simple": "Hay un error en la lógica programable interna del variador.",
  "causas": [
   "Programa de lógica personalizable mal configurado",
   "Cambio de parámetros reciente sin revisar"
  ],
  "arreglo": [
   "Anota el código y lo que se cambió últimamente",
   "Avisa al supervisor para revisar la lógica programada"
  ],
  "pieza": "variador",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "Eo",
  "nombre": "Choque entre salida ENOFF y entradas EN1/EN2",
  "simple": "La salida ENOFF y las entradas de habilitación EN1/EN2 no están de acuerdo (rebote).",
  "causas": [
   "Cableado de EN1/EN2 mal hecho",
   "Contacto que rebota en la cadena de seguridad"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa el cableado de EN1, EN2 y ENOFF con el plano",
   "Nunca puentees EN1/EN2"
  ],
  "peligro": "EN1/EN2 son entradas de seguridad (corte de torque): no se puentean.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "ECF",
  "nombre": "Falla del circuito EN1/EN2",
  "simple": "Hay una falla en el circuito de las entradas de seguridad EN1 y EN2; deben cambiar al mismo tiempo.",
  "causas": [
   "EN1 y EN2 no llegan juntas (diferencia mayor a 50 ms)",
   "Cable suelto en una de las dos entradas",
   "Contacto de seguridad gastado"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa que EN1 y EN2 vengan del mismo contacto y estén bien ajustadas",
   "Cambia el contacto o relé que falla",
   "Nunca puentees EN1/EN2"
  ],
  "peligro": "EN1/EN2 son entradas de seguridad: no se puentean.",
  "pieza": "tablero_control",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=70"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "nrb",
  "nombre": "Cable del termistor NTC cortado",
  "simple": "Se detectó un corte en el circuito del termistor NTC.",
  "causas": [
   "Cable del termistor cortado o suelto",
   "Termistor dañado"
  ],
  "arreglo": [
   "Corta la energía, bloquea y etiqueta",
   "Revisa el cable del termistor hasta el variador",
   "Mide el termistor con el multímetro"
  ],
  "pieza": "maquina",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "rbA",
  "nombre": "Rescate por freno sin movimiento",
  "simple": "Durante el rescate abriendo el freno, la cabina no se movió.",
  "causas": [
   "Cabina y contrapeso casi balanceados (no se mueve sola)",
   "Freno que no abrió",
   "Encoder sin señal"
  ],
  "arreglo": [
   "Sigue el procedimiento de rescate del edificio; solo personal autorizado",
   "Revisa que el freno abra",
   "Si la cabina está balanceada, usa otro método de rescate autorizado"
  ],
  "peligro": "Rescate con pasajeros: riesgo de movimiento de la cabina. Solo personal capacitado.",
  "pieza": "rescate",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "bbE",
  "nombre": "Falla de confirmación del freno",
  "simple": "La orden al freno y la señal de confirmación del freno no coinciden.",
  "causas": [
   "Micro (contacto) de freno desajustado o malo",
   "Freno que no abre o no cierra",
   "Cable de la señal de freno suelto"
  ],
  "arreglo": [
   "Asegura la cabina; corta la energía, bloquea y etiqueta",
   "Revisa el ajuste de los micros de freno y su cableado",
   "Revisa el freno con el procedimiento del fabricante",
   "Nunca puentees el micro de freno"
  ],
  "peligro": "El freno es una pieza de seguridad: la cabina puede moverse si falla.",
  "pieza": "micro_freno",
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 },
 {
  "equipo": "fuji_lm2",
  "codigo": "tCA",
  "nombre": "Contador de viajes al límite",
  "simple": "El número de cambios de dirección (viajes) llegó al límite programado.",
  "causas": [
   "Se cumplió el número de viajes programado como aviso de mantenimiento",
   "El límite del contador quedó programado muy bajo"
  ],
  "arreglo": [
   "Avisa al supervisor para hacer el mantenimiento programado",
   "El supervisor resetea el contador después del mantenimiento"
  ],
  "fuente": "https://www.manualslib.com/manual/1636072/Fuji-Electric-Frenic-Lift-Lm2a-Series.html?page=46"
 }
];
