# 🖱️ Mouse Mover — extensión para Chrome

Extensión que mueve automáticamente un cursor de un lado a otro de la página
y genera eventos `mousemove` / `pointermove`, de modo que la página "ve" el
mouse en movimiento.

## Instalación

1. Abre `chrome://extensions` en Chrome.
2. Activa **Modo de desarrollador** (arriba a la derecha).
3. Pulsa **Cargar descomprimida** y selecciona esta carpeta (`mouse-mover-extension`).
4. Fija el icono de la extensión en la barra de Chrome.

## Uso

- Haz clic en el icono → ajusta **velocidad** y **recorrido** → **Iniciar**.
- Atajo en cualquier página: **Alt + Shift + M** para iniciar/detener.
- Las páginas que ya estaban abiertas antes de instalar la extensión necesitan
  recargarse (F5).
- No funciona en páginas internas de Chrome (`chrome://…`) ni en la Chrome Web Store.

## Importante: limitación de Chrome

Por seguridad, **ninguna extensión de Chrome puede mover el cursor real del
sistema operativo**. Esta extensión dibuja un cursor virtual (flecha roja) y
simula el movimiento dentro de la página.

Si necesitas mover el **cursor real** (por ejemplo, para que el equipo no entre
en reposo o no aparezcas como "ausente"), usa el script incluido:

```bash
pip install pyautogui
python mover_real.py            # 300 px de recorrido, pausa de 1 s
python mover_real.py 500 0.5    # 500 px, pausa de 0.5 s
```

Detenerlo: **Ctrl + C**, o lleva el mouse a una esquina de la pantalla.

## Archivos

| Archivo         | Qué hace                                             |
|-----------------|------------------------------------------------------|
| `manifest.json` | Configuración de la extensión (Manifest V3)          |
| `popup.html/js` | Panel con botón Iniciar/Detener, velocidad y recorrido |
| `content.js`    | Mueve el cursor virtual y dispara los eventos        |
| `mover_real.py` | Script opcional que mueve el cursor real del sistema |
