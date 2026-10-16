<# :
@echo off
title Mouse Mover
set "MM_SELF=%~f0"
powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ([IO.File]::ReadAllText($env:MM_SELF))"
if errorlevel 1 pause
exit /b
#>

# Mueve el puntero REAL del mouse de un lado a otro en Windows.
# Uso: doble clic en este archivo. Para detenerlo, pulsa cualquier tecla
# en la ventana negra o cierrala.

$distancia = 300   # pixeles que recorre hacia cada lado
$pasos     = 30    # pasos por recorrido (mas pasos = movimiento mas suave)
$pausa     = 10    # milisegundos entre pasos
$descanso  = 1000  # milisegundos de espera en cada extremo

$ErrorActionPreference = 'Stop'

Add-Type -Namespace MouseMover -Name Native -MemberDefinition @'
[DllImport("user32.dll")]
public static extern void mouse_event(uint dwFlags, int dx, int dy, uint dwData, UIntPtr dwExtraInfo);
'@

function Test-TeclaPulsada {
    try { return [Console]::KeyAvailable } catch { return $false }
}

Write-Host ''
Write-Host '  Mouse Mover: moviendo el mouse de un lado a otro...' -ForegroundColor Green
Write-Host '  Para detenerlo, pulsa cualquier tecla en esta ventana o cierrala.'
Write-Host ''

# mouse_event genera movimiento real (como si movieras el mouse con la mano),
# asi Windows y las aplicaciones tambien lo cuentan como actividad.
$MOUSEEVENTF_MOVE = 1
$paso = [int][Math]::Ceiling($distancia / $pasos)
$sentido = 1
:mover while ($true) {
    for ($i = 0; $i -lt $pasos; $i++) {
        [MouseMover.Native]::mouse_event($MOUSEEVENTF_MOVE, $sentido * $paso, 0, 0, [UIntPtr]::Zero)
        Start-Sleep -Milliseconds $pausa
        if (Test-TeclaPulsada) { break mover }
    }
    $sentido = -$sentido
    Start-Sleep -Milliseconds $descanso
}
