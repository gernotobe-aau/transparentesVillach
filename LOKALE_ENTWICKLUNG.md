# Lokale Entwicklung & Testing

## Warum brauche ich einen HTTP-Server?

Die Website verwendet JavaScript ES6 Module und lädt dynamisch JSON/Markdown-Dateien. Aus Sicherheitsgründen funktioniert das **nicht** über das `file://` Protocol.

❌ **Funktioniert NICHT:**
```
file:///C:/Uni%20Programmieren/Transparentes%20Villach/transparentesVillach/index.html
```

✅ **Funktioniert:**
```
http://localhost:8000/index.html
```

## Einfache HTTP-Server für lokale Tests

### Option 1: Python (empfohlen, meist vorinstalliert)

**Python 3.x:**
```bash
cd "C:\Uni Programmieren\Transparentes Villach\transparentesVillach"
python -m http.server 8000
```

**Python 2.x:**
```bash
cd "C:\Uni Programmieren\Transparentes Villach\transparentesVillach"
python -m SimpleHTTPServer 8000
```

Dann öffnen: `http://localhost:8000`

### Option 2: Node.js (http-server)

**Installation (einmalig):**
```bash
npm install -g http-server
```

**Starten:**
```bash
cd "C:\Uni Programmieren\Transparentes Villach\transparentesVillach"
http-server -p 8000
```

Dann öffnen: `http://localhost:8000`

### Option 3: PHP (falls installiert)

```bash
cd "C:\Uni Programmieren\Transparentes Villach\transparentesVillach"
php -S localhost:8000
```

Dann öffnen: `http://localhost:8000`

### Option 4: VS Code Extension "Live Server"

1. Installiere Extension: "Live Server" von Ritwick Dey
2. Rechtsklick auf `index.html` → "Open with Live Server"
3. Öffnet automatisch im Browser

### Option 5: PowerShell (Windows, nur für einfache Tests)

Erstelle eine Datei `start-server.ps1`:

```powershell
$port = 8000
$path = Get-Location

Write-Host "Server läuft auf http://localhost:$port"
Write-Host "Drücken Sie Ctrl+C zum Beenden"

python -m http.server $port
```

Dann starten mit:
```powershell
.\start-server.ps1
```

## Warum Port 8000?

Port 8000 ist:
- ✅ Standard für lokale Entwicklung
- ✅ Meist frei (nicht von anderen Programmen genutzt)
- ✅ Keine Admin-Rechte nötig (Ports < 1024 brauchen Admin)

Sie können auch einen anderen Port nutzen (z.B. 3000, 5000, 8080):
```bash
python -m http.server 3000
```

## Auf dem echten Webserver (Hosttech.at)

Auf Ihrem Webhosting bei Hosttech.at ist **kein lokaler Server nötig**! 

Der Apache/Nginx Webserver liefert alle Dateien korrekt aus:
```
https://transparentesvillach.at/
https://transparentesvillach.at/pages/blog.html
```

## Für die schnelle Entwicklung

**PowerShell-Shortcut erstellen:**

1. Erstellen Sie eine Datei `server.ps1` im Projekt-Root:

```powershell
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
Write-Host "Drücken Sie Ctrl+C zum Beenden" -ForegroundColor Yellow
Write-Host ""

# Starte Server (oder alternativen Befehl)
if (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server 8000
} elseif (Get-Command php -ErrorAction SilentlyContinue) {
    php -S localhost:8000
} else {
    Write-Host "FEHLER: Weder Python noch PHP gefunden!" -ForegroundColor Red
    Write-Host "Bitte installieren Sie Python: https://www.python.org/downloads/" -ForegroundColor Yellow
    pause
}
```

2. Doppelklick auf `server.ps1` → Server startet automatisch!

## Browser-Cache leeren

Falls Änderungen nicht sichtbar sind:

- **Chrome/Edge:** `Ctrl + Shift + R` (Hard Reload)
- **Firefox:** `Ctrl + F5`
- **Safari:** `Cmd + Option + R`

## Entwickler-Tools

Öffnen Sie die Browser-Konsole, um Fehler zu sehen:

- **Chrome/Edge/Firefox:** `F12` oder `Ctrl + Shift + I`
- **Safari:** `Cmd + Option + I`

Bei Problemen sehen Sie dort JavaScript-Fehler oder Netzwerk-Fehler.

## Zusammenfassung

| Methode | Vorteile | Nachteile |
|---------|----------|-----------|
| Python `http.server` | ✅ Meist vorinstalliert<br>✅ Einfach | ❌ Langsam bei vielen Requests |
| Node.js `http-server` | ✅ Sehr schnell<br>✅ Viele Features | ❌ Node.js muss installiert sein |
| VS Code Live Server | ✅ Auto-Reload<br>✅ Einfach in VS Code | ❌ Nur in VS Code |
| PHP Server | ✅ Einfach | ❌ PHP muss installiert sein |

**Empfehlung für Sie:** Python `http.server` (normalerweise auf Windows mit Python 3 installiert)

## Produktionsumgebung (Hosttech.at)

Wenn Sie die Dateien auf Hosttech.at hochladen:

1. **Per FTP/SFTP** alle Dateien hochladen
2. Dateistruktur beibehalten:
   ```
   /public_html/
   ├── index.html
   ├── pages/
   ├── assets/
   └── content/
   ```
3. Kein Server-Setup nötig - Apache läuft bereits!

**Website dann verfügbar unter:**
```
https://transparentesvillach.at/
```

## Fehlerbehebung

### Problem: "Python nicht gefunden"

1. Python installieren: https://www.python.org/downloads/
2. Bei Installation: ✅ "Add Python to PATH" aktivieren
3. PowerShell neu öffnen
4. Testen: `python --version`

### Problem: "Port bereits in Verwendung"

Anderen Port nutzen:
```bash
python -m http.server 8001
```

Oder laufenden Prozess beenden:
```powershell
# Port-Nutzung prüfen
netstat -ano | findstr :8000

# Prozess beenden (mit PID aus obigem Befehl)
taskkill /PID <PID> /F
```

### Problem: "Module kann nicht geladen werden"

Browser-Konsole (`F12`) öffnen und Fehlermeldung prüfen. Meist:
- Pfad-Fehler in JavaScript
- CORS-Problem (→ HTTP-Server nutzen!)
