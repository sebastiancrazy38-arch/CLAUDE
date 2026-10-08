#!/usr/bin/env python3
"""Arma una copia del Taller de Ascensores en un solo archivo HTML (todos los .js locales dentro),
para abrirla en la laptop con Chrome o Edge sin servidor: doble clic al archivo y listo.
Así funciona «Conectar la laptop» (USB-serie), que algunos visores bloquean.
three.js y las fuentes se siguen cargando de internet.

Uso:  python3 armar-un-archivo.py            -> crea taller-ascensores-laptop.html junto a este script
"""
import pathlib
import re

AQUI = pathlib.Path(__file__).resolve().parent
html = (AQUI / 'index.html').read_text(encoding='utf-8')


def incrustar(m):
    nombre = m.group(1)
    codigo = (AQUI / nombre).read_text(encoding='utf-8')
    codigo = codigo.replace('</script', '<\\/script')   # que un texto dentro del JS no cierre la etiqueta
    return '<script>/* ' + nombre + ' */\n' + codigo + '\n</script>'


salida = re.sub(r'<script src="([\w.\-]+\.js)"></script>', incrustar, html)
if not salida.lstrip().lower().startswith('<!doctype'):
    salida = '<!doctype html>\n<html lang="es">\n' + salida + '\n</html>\n'
destino = AQUI / 'taller-ascensores-laptop.html'
destino.write_text(salida, encoding='utf-8')
print('listo:', destino, round(len(salida.encode('utf-8')) / 1024), 'KB')
