# Transparentes Villach

Eine statische Website für mehr Transparenz und Bürgerbeteiligung in Villach. Diese Plattform informiert über das Informationsfreiheitsgesetz und dokumentiert Anfragen sowie Antworten im Zusammenhang mit der Stadt Villach.

## 📋 Projektübersicht

- **Projektname:** Transparentes Villach
- **Betreiber:** Gernot Oberrauner
- **Hosting:** Hosttech.at
- **Technologie:** Statische HTML/CSS/JS Website (keine Frameworks)
- **Status:** Sprint 2 - Blog-System implementiert ✅

## ⚠️ Wichtig: Lokale Entwicklung

**Die Website funktioniert NICHT über `file://` Protocol!**

Sie müssen einen lokalen HTTP-Server verwenden, um die Seite lokal zu testen:

```powershell
# Einfachste Methode: PowerShell-Skript
.\server.ps1

# Oder manuell mit Python:
python -m http.server 8000
```

Dann öffnen: `http://localhost:8000`

📖 **Ausführliche Anleitung:** Siehe [LOKALE_ENTWICKLUNG.md](LOKALE_ENTWICKLUNG.md)

## 🎯 Projektziele

- Aufklärung über das Informationsfreiheitsgesetz in Österreich
- Dokumentation von Anfragen an die Stadt Villach
- Transparente Darstellung der erhaltenen Antworten
- Förderung der Bürgerbeteiligung und demokratischen Teilhabe

## 🏗️ Projektstruktur

```
/
├── index.html                          # Landing Page / Startseite
├── server.ps1                          # ⭐ Server-Start-Skript (NEU!)
├── LOKALE_ENTWICKLUNG.md               # ⭐ Anleitung lokaler Server (NEU!)
├── BLOG_README.md                      # ⭐ Blog-System Dokumentation (NEU!)
├── pages/
│   ├── about.html                      # Über das Projekt
│   ├── blog.html                       # ⭐ Blog-Übersichtsseite (NEU!)
│   ├── blog/
│   │   └── detail.html                 # ⭐ Blog-Detailseite (NEU!)
│   └── legal/
│       ├── impressum.html              # Impressum (§ 5 ECG)
│       ├── datenschutz.html            # Datenschutzerklärung (DSGVO)
│       └── barrierefreiheit.html       # Barrierefreiheitserklärung
├── assets/
│   ├── css/
│   │   ├── base.css                    # CSS Reset, Variablen, Typografie
│   │   ├── layout.css                  # Grid, Header, Footer, Sections
│   │   ├── components.css              # Buttons, Cards, Navigation
│   │   ├── themes.css                  # Dark Mode (vorbereitet)
│   │   └── blog.css                    # ⭐ Blog-Styles (NEU!)
│   ├── js/
│   │   ├── main.js                     # Mobile Navigation, Init
│   │   ├── posts/                      # ⭐ Blog-Module (NEU!)
│   │   │   ├── posts.js                #   Hauptlogik
│   │   │   ├── sources.js              #   Datenladen
│   │   │   └── markdown.js             #   Markdown-Parser
│   │   ├── vendor/                     # ⭐ Externe Libraries (NEU!)
│   │   │   └── marked.min.js           #   Markdown-Parser
│   │   └── utils/                      # Utility-Funktionen
│   ├── documents/                      # ⭐ PDF-Downloads (NEU!)
│   │   └── posts/                      #   Beitrags-PDFs
│   ├── img/                            # Bilder und Grafiken
│   │   └── posts/                      # ⭐ Blog-Bilder (NEU!)
│   └── icons/                          # Icons (SVG)
├── content/                            # ⭐ Content-Dateien (NEU!)
│   ├── posts.json                      #   Beitrags-Index
│   └── posts/                          #   Markdown-Dateien
│       ├── 2026-01-06-ifg-anfrage-stadtrat.md
│       ├── 2026-01-08-ifg-antwort-stadtrat.md
│       └── 2026-01-10-buergeranfrage-budgetverteilung.md
├── requirements/
│   ├── Anforderung.md                  # Projektanforderungen
│   ├── feature-0001-grundgeruest-website.md  # Feature Sprint 1
│   └── feature-0002-blog-beitragsystem.md    # ⭐ Feature Sprint 2 (NEU!)
├── Anforderung.md                      # Haupt-Anforderungsdokument
└── README.md                           # Diese Datei
```

## 🚀 Setup und Installation

### Voraussetzungen

- **Kein Build-Prozess erforderlich**
- **Lokaler HTTP-Server** für Tests (siehe unten)
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Python 3 empfohlen (meist vorinstalliert)

### Schnellstart

1. **Repository klonen:**
   ```bash
   git clone https://github.com/gernotobe-aau/transparentesVillach.git
   cd transparentesVillach
   ```

2. **Server starten:**
   
   **Einfachste Methode (PowerShell):**
   ```powershell
   .\server.ps1
   ```
   
   **Oder manuell mit Python:**
   ```bash
   python -m http.server 8000
   ```

3. **Browser öffnen:**
   ```
   http://localhost:8000
   ```

### ⚠️ Wichtig: Nicht über file:// öffnen!

❌ **Funktioniert NICHT:**
```
file:///C:/Uni%20Programmieren/.../index.html
```

✅ **Funktioniert:**
```
http://localhost:8000/index.html
```

**Grund:** JavaScript `fetch()` und ES6 Module funktionieren nicht mit `file://` Protocol.

📖 **Detaillierte Anleitung:** [LOKALE_ENTWICKLUNG.md](LOKALE_ENTWICKLUNG.md)

### Alternative Server-Optionen

3. **Im Browser öffnen:**
   ```
   http://localhost:8000
   ```

### Deployment auf Hosttech.at

1. Alle Dateien via FTP/SFTP auf den Webserver hochladen
2. Sicherstellen, dass `index.html` im Root-Verzeichnis liegt
3. Domain-Konfiguration überprüfen

## 🎨 Design & Technologie

### Farbschema (Villacher Stadtfarben)

- **Primärfarbe:** `#FDB913` (Gelb/Gold)
- **Sekundärfarbe:** `#003057` (Dunkles Blau)
- **Text:** `#1A1A1A`
- **Hintergrund:** `#FFFFFF`

### CSS-Variablen

Alle Farben, Abstände und Schriftgrößen sind als CSS Custom Properties definiert und können zentral in `assets/css/base.css` angepasst werden.

### Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Browser-Kompatibilität

- Chrome/Edge (Chromium) - letzten 2 Versionen
- Firefox - letzten 2 Versionen
- Safari - letzten 2 Versionen

## ♿ Barrierefreiheit

Diese Website wurde mit Fokus auf Barrierefreiheit entwickelt:

- ✅ Semantisches HTML5
- ✅ WCAG 2.1 Level AA Konformität (Ziel)
- ✅ Vollständige Tastaturbedienung
- ✅ Skip-Links zum Hauptinhalt
- ✅ Ausreichende Farbkontraste (4.5:1)
- ✅ Responsive Design für alle Geräte
- ✅ Keine automatisch abspielenden Medien
- ✅ Klare Fokus-Indikatoren

## 🔒 Datenschutz & Sicherheit

- **Keine Cookies** (aktuell)
- **Kein Tracking** (keine Analytics-Tools)
- **Keine externen Ressourcen** (Fonts, Icons lokal)
- **DSGVO-konform** (vollständige Datenschutzerklärung vorhanden)
- **SSL/TLS** (HTTPS)

## 📝 Rechtliche Hinweise

### Impressum

Vollständige Angaben gemäß § 5 ECG (E-Commerce-Gesetz, Österreich) sind auf der [Impressum-Seite](pages/legal/impressum.html) zu finden.

**Hinweis:** Die rechtlichen Texte (Impressum, Datenschutz) sind als Entwürfe zu verstehen und sollten vor dem Go-Live durch einen Rechtsanwalt geprüft werden.

### Urheberrecht

Alle Inhalte dieser Website sind urheberrechtlich geschützt. Die Nutzung bedarf der Zustimmung des Betreibers.

## 🛠️ Entwicklung

### Feature-Status

- ✅ **Feature 0001:** Grundgerüst der Website (abgeschlossen)
  - Landing Page
  - Navigation (Desktop & Mobile)
  - Footer
  - Impressum, Datenschutz, Barrierefreiheit
  - Responsive Design
  - CSS-Architektur

- 🔜 **Feature 0002:** Blog-System (geplant)
  - Beiträge über JSON/Markdown
  - Listing & Detail-Ansichten
  - Optional: SQLite im Browser (WASM)

- 🔜 **Feature 0003:** Kontaktformular (geplant)
  - E-Mail-Versand
  - Spam-Schutz
  - DSGVO-konforme Verarbeitung

### Code-Standards

- **HTML:** Valides HTML5, semantische Tags
- **CSS:** Vanilla CSS, CSS Custom Properties, Mobile-First
- **JavaScript:** ES Modules, Vanilla JS, keine globalen Variablen
- **Formatierung:** 2 Spaces Einrückung, konsistente Benennung

### Git Workflow

```bash
# Feature-Branch erstellen
git checkout -b feature/name-des-features

# Änderungen committen
git add .
git commit -m "feat: Beschreibung der Änderung"

# Push und Pull Request erstellen
git push origin feature/name-des-features
```

### Commit-Conventions

- `feat:` Neues Feature
- `fix:` Bugfix
- `docs:` Dokumentation
- `style:` CSS/Styling-Änderungen
- `refactor:` Code-Refactoring
- `test:` Tests
- `chore:` Wartung, Build-Prozess

## 📊 Testing

### Manuelle Tests

- [ ] Cross-Browser-Tests (Chrome, Firefox, Safari, Edge)
- [ ] Mobile-Tests (iOS Safari, Android Chrome)
- [ ] Keyboard-Navigation
- [ ] Screen-Reader-Tests

### Automatisierte Tests

- **Lighthouse:** Performance, Accessibility, Best Practices, SEO
  ```bash
  # Chrome DevTools > Lighthouse > Generate Report
  ```

- **WAVE:** Accessibility-Check
  ```bash
  # https://wave.webaim.org/
  ```

### Ziel-Scores

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 📚 Dokumentation

- **Anforderungen:** [Anforderung.md](Anforderung.md)
- **Feature 0001:** [requirements/feature-0001-grundgeruest-website.md](requirements/feature-0001-grundgeruest-website.md)
- **Copilot Instructions:** [.github/copilot-instructions.md](.github/copilot-instructions.md)

## 🤝 Kontakt

**Betreiber:** Gernot Oberrauner  
**E-Mail:** [kontakt@transparentesvillach.at](mailto:kontakt@transparentesvillach.at)  
**Website:** [https://transparentesvillach.at](https://transparentesvillach.at) (in Entwicklung)

## 📜 Lizenz

Dieses Projekt ist urheberrechtlich geschützt. Alle Rechte vorbehalten.

---

**Stand:** Januar 2026  
**Version:** 1.0.0 (Feature 0001 implementiert)
