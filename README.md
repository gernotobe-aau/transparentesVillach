# Transparentes Villach

Eine statische Website für mehr Transparenz und Bürgerbeteiligung in Villach. Diese Plattform informiert über das Informationsfreiheitsgesetz und dokumentiert Anfragen sowie Antworten im Zusammenhang mit der Stadt Villach.

## 📋 Projektübersicht

- **Projektname:** Transparentes Villach
- **Betreiber:** Gernot Oberrauner
- **Hosting:** Hosttech.at
- **Technologie:** Statische HTML/CSS/JS Website (keine Frameworks)
- **Status:** In Entwicklung (Feature 0001 - Grundgerüst implementiert)

## 🎯 Projektziele

- Aufklärung über das Informationsfreiheitsgesetz in Österreich
- Dokumentation von Anfragen an die Stadt Villach
- Transparente Darstellung der erhaltenen Antworten
- Förderung der Bürgerbeteiligung und demokratischen Teilhabe

## 🏗️ Projektstruktur

```
/
├── index.html                          # Landing Page / Startseite
├── pages/
│   ├── about.html                      # Über das Projekt
│   └── legal/
│       ├── impressum.html              # Impressum (§ 5 ECG)
│       ├── datenschutz.html            # Datenschutzerklärung (DSGVO)
│       └── barrierefreiheit.html       # Barrierefreiheitserklärung
├── assets/
│   ├── css/
│   │   ├── base.css                    # CSS Reset, Variablen, Typografie
│   │   ├── layout.css                  # Grid, Header, Footer, Sections
│   │   ├── components.css              # Buttons, Cards, Navigation
│   │   └── themes.css                  # Dark Mode (vorbereitet)
│   ├── js/
│   │   ├── main.js                     # Mobile Navigation, Init
│   │   └── utils/                      # Utility-Funktionen
│   ├── img/                            # Bilder und Grafiken
│   └── icons/                          # Icons (SVG)
├── content/
│   └── posts/                          # Blog-Posts (zukünftig)
├── requirements/
│   ├── Anforderung.md                  # Projektanforderungen
│   └── feature-0001-grundgeruest-website.md  # Feature-Dokumentation
├── Anforderung.md                      # Haupt-Anforderungsdokument
└── README.md                           # Diese Datei
```

## 🚀 Setup und Installation

### Voraussetzungen

- Kein Build-Prozess erforderlich
- Funktioniert direkt im Browser (statisches HTML/CSS/JS)
- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)

### Lokale Entwicklung

1. **Repository klonen:**
   ```bash
   git clone https://github.com/gernotobe-aau/transparentesVillach.git
   cd transparentesVillach
   ```

2. **Lokalen Webserver starten:**
   
   Mit Python 3:
   ```bash
   python -m http.server 8000
   ```
   
   Mit PHP:
   ```bash
   php -S localhost:8000
   ```
   
   Mit Node.js (http-server):
   ```bash
   npx http-server -p 8000
   ```

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
