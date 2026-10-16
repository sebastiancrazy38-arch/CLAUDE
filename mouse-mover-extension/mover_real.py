"""Mueve el cursor REAL del sistema de un lado a otro (Windows, macOS, Linux).

Uso:
    pip install pyautogui
    python mover_real.py            # recorrido de 300 px, pausa de 1 s
    python mover_real.py 500 0.5    # recorrido de 500 px, pausa de 0.5 s

Para detenerlo: Ctrl+C, o lleva el mouse a una esquina de la pantalla
(failsafe de pyautogui).
"""
import sys
import time

import pyautogui

distance = int(sys.argv[1]) if len(sys.argv) > 1 else 300
pause = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0

pyautogui.FAILSAFE = True
print(f"Moviendo el mouse {distance}px de lado a lado. Ctrl+C para detener.")

try:
    direction = 1
    while True:
        pyautogui.moveRel(distance * direction, 0, duration=0.5)
        direction *= -1
        time.sleep(pause)
except KeyboardInterrupt:
    print("\nDetenido.")
