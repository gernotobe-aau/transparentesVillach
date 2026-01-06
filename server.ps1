# Wechsle ins Projekt-Verzeichnis
Set-Location $PSScriptRoot

# Starte Python HTTP-Server
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Transparentes Villach - Server" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server läuft auf:" -ForegroundColor Green
Write-Host "  http://localhost:8000" -ForegroundColor White
Write-Host ""
Write-Host "Öffnen Sie diese URL im Browser:" -ForegroundColor Yellow
Write-Host "  http://localhost:8000/index.html" -ForegroundColor White
Write-Host "  http://localhost:8000/pages/blog.html" -ForegroundColor White
Write-Host ""
Write-Host "Drücken Sie Ctrl+C zum Beenden" -ForegroundColor Red
Write-Host ""

# Starte Server (prüfe welcher verfügbar ist)
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "Starte Python HTTP-Server..." -ForegroundColor Green
    python -m http.server 8000
} elseif (Get-Command python3 -ErrorAction SilentlyContinue) {
    Write-Host "Starte Python 3 HTTP-Server..." -ForegroundColor Green
    python3 -m http.server 8000
} elseif (Get-Command php -ErrorAction SilentlyContinue) {
    Write-Host "Starte PHP Built-in Server..." -ForegroundColor Green
    php -S localhost:8000
} else {
    Write-Host "FEHLER: Kein HTTP-Server gefunden!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Bitte installieren Sie einen der folgenden:" -ForegroundColor Yellow
    Write-Host "  - Python: https://www.python.org/downloads/" -ForegroundColor White
    Write-Host "  - PHP: https://www.php.net/downloads" -ForegroundColor White
    Write-Host ""
    Write-Host "Oder installieren Sie VS Code Extension 'Live Server'" -ForegroundColor Yellow
    Write-Host ""
    pause
}
