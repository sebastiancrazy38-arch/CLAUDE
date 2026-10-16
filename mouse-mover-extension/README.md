# 🖱️ Mouse Mover

Dos herramientas en esta carpeta:

| Qué                         | Qué mueve                                              | Dónde funciona |
|-----------------------------|--------------------------------------------------------|----------------|
| **Extensión de Chrome**     | Una flecha roja dentro de la página (la página "ve" el mouse moverse) | Chrome |
| **`mover-mouse-windows.bat`** | **Tu puntero real** (Windows lo cuenta como actividad) | Windows |

> **¿Por qué dos?** Por seguridad, Chrome **no permite** que una extensión mueva
> el puntero real del sistema. Por eso la extensión mueve una flecha roja dentro
> de la página. Si lo que quieres es que tu puntero real se mueva (por ejemplo,
> para que la computadora no entre en reposo o no aparezcas como "ausente"),
> usa `mover-mouse-windows.bat`.

---

## 1. Extensión de Chrome

### Instalar

1. Abre `chrome://extensions` en Chrome.
2. Activa **Modo de desarrollador** (arriba a la derecha).
3. Si tenías una versión anterior de Mouse Mover, pulsa **Quitar** en su tarjeta.
4. Pulsa **Cargar descomprimida** y elige esta carpeta (`mouse-mover-extension`,
   la que contiene `manifest.json`).
5. Fija el icono: pieza de rompecabezas 🧩 → alfiler 📌 junto a **Mouse Mover**.

### Usar

1. Abre una página web normal, por ejemplo google.com. No hace falta recargarla.
2. Pulsa el icono de **Mouse Mover** y luego **Iniciar**.
3. Verás una **flecha roja** moviéndose de lado a lado y el icono mostrará **ON**.
4. Para detenerla: pulsa **Detener**, o usa el atajo **Alt + Shift + M**.

- Si el cuadro dice **"⚠️ Chrome no permite extensiones en esta página"**, estás
  en una página especial (`chrome://…`, la pestaña nueva o la Chrome Web Store).
  Abre una página web normal y vuelve a pulsar el icono.
- Si cambias de pestaña, la flecha aparece también en la nueva.
- Con la pestaña en segundo plano o Chrome minimizado, sigue enviando un
  movimiento por segundo a la página.

---

## 2. Mover el puntero real

### Windows (sin instalar nada)

1. Haz **doble clic** en `mover-mouse-windows.bat`.
2. Se abre una ventana negra y tu puntero empieza a moverse de un lado a otro.
3. Para detenerlo: **pulsa cualquier tecla** en la ventana negra o **ciérrala**.

Si aparece **"Windows protegió su PC"**, pulsa **Más información** →
**Ejecutar de todas formas** (sale porque el archivo viene de internet).

Para cambiar el recorrido o la pausa, abre el archivo con el Bloc de notas
(clic derecho → **Editar**) y cambia `$distancia` o `$descanso`.

### Mac / Linux

```bash
pip install pyautogui
python mover_real.py            # 300 px de recorrido, pausa de 1 s
python mover_real.py 500 0.5    # 500 px, pausa de 0.5 s
```

Para detenerlo: **Ctrl + C**, o lleva el mouse a una esquina de la pantalla. En
Mac hay que dar permiso de **Accesibilidad** a la Terminal (Ajustes del Sistema →
Privacidad y seguridad → Accesibilidad).

---

## Archivos

| Archivo                   | Qué hace                                               |
|---------------------------|--------------------------------------------------------|
| `manifest.json`           | Configuración de la extensión (Manifest V3)            |
| `background.js`           | Atajo de teclado, icono ON y preparar pestañas abiertas |
| `common.js`               | Código compartido entre `background.js` y `popup.js`   |
| `popup.html` / `popup.js` | Panel con Iniciar/Detener, velocidad, recorrido y estado |
| `content.js`              | Mueve la flecha roja y envía los eventos a la página   |
| `mover-mouse-windows.bat` | Mueve el puntero real en Windows (doble clic)          |
| `mover_real.py`           | Mueve el puntero real en Mac / Linux                   |
