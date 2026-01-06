# Feature 0001: Grundgerüst der Website

**Feature-ID:** FEAT-0001  
**Erstellt am:** 06.01.2026  
**Sprint:** 1  
**Priorität:** Hoch (Blocker für alle anderen Features)  
**Status:** Ready for Development  

---

## Überblick

Als Grundlage für das Projekt "Transparentes Villach" muss eine statische Website mit allen rechtlich erforderlichen Seiten und einem modernen, responsiven Design erstellt werden. Die Website soll als Ausgangspunkt für alle weiteren Features dienen und alle gesetzlichen Anforderungen (Impressumspflicht, DSGVO) erfüllen.

---

## Geschäftswert

- **Rechtssicherheit:** Erfüllung aller rechtlichen Anforderungen (Impressum, Datenschutz) gemäß österreichischer Gesetzgebung
- **Vertrauensbasis:** Professioneller erster Eindruck für Bürger von Villach
- **Technische Basis:** Skalierbare Architektur für zukünftige Features (Blog, Kontaktformular)
- **Barrierefreiheit:** Zugänglichkeit für alle Bürger, inkl. mobile Nutzer

---

## Stakeholder

- **Betreiber:** Gernot Oberrauner (Verantwortlicher, Privatperson)
- **Zielgruppe:** Bürger der Stadt Villach und Umland
- **Hosting-Provider:** Hosttech.at
- **Rechtliche Compliance:** Anforderungen gemäß österreichischem Recht (§ 5 ECG, DSGVO)

---

## Funktionale Anforderungen

### FR-001: Landing Page (Startseite)
Die Startseite bildet den Einstiegspunkt der Website und vermittelt das Thema "Transparentes Villach".

**Akzeptanzkriterien:**
- Klare Darstellung des Zwecks: Transparenz, Informationsfreiheitsgesetz, Anfragen an die Stadt Villach
- Hero-Bereich mit aussagekräftiger Überschrift und Untertitel
- Call-to-Action: Verweis auf Blog-Bereich (Vorbereitung für spätere Sprints)
- Visuelles Design mit Villacher Stadtfarben (Gelb/Gold als Primärfarbe)
- Responsive Design: Mobile-First-Ansatz
- Semantisches HTML5
- Schnelle Ladezeit (< 2 Sekunden)

---

### FR-002: Navigationsstruktur
Eine klare, konsistente Navigation auf allen Seiten.

**Akzeptanzkriterien:**
- Hauptnavigation mit folgenden Menüpunkten:
  - Startseite
  - Über das Projekt (Platzhalter, später erweitert)
  - Kontakt (Platzhalter, später erweitert)
  - Blog (Platzhalter, später erweitert)
- Footer-Navigation mit rechtlichen Links:
  - Impressum
  - Datenschutzerklärung
  - Barrierefreiheitserklärung
- Mobile: Hamburger-Menü oder ähnliches responsives Pattern
- Keyboard-Navigation möglich
- Aktuelle Seite visuell hervorgehoben

---

### FR-003: Impressum
Gesetzlich vorgeschriebene Angaben gemäß § 5 ECG (E-Commerce-Gesetz, Österreich).

**Akzeptanzkriterien:**
- Eigene Seite: `pages/legal/impressum.html`
- Folgende Pflichtangaben:
  - Name: Gernot Oberrauner
  - Anschrift: [Vollständige Postadresse in Villach – TODO vom Betreiber eintragen]
  - Kontakt: kontakt@transparentesVillach.at
  - Unternehmensgegenstand: Informationsportal zu Transparenz und Informationsfreiheit in Villach (Privatperson, nicht gewerblich)
  - Hinweis: Keine UID/Firmenbuchnummer, da Privatperson ohne Gewerbeanmeldung
- Verlinkung aus Footer auf jeder Seite
- Max. 2 Klicks von jeder Seite erreichbar
- Mobile-optimierte Darstellung

---

### FR-004: Datenschutzerklärung
DSGVO-konforme Datenschutzerklärung für eine statische Website ohne Tracking.

**Akzeptanzkriterien:**
- Eigene Seite: `pages/legal/datenschutz.html`
- Inhalt:
  - **Verantwortlicher:** Gernot Oberrauner, kontakt@transparentesVillach.at
  - **Zweck der Datenverarbeitung:**
    - Bereitstellung der Website
    - Server-Logs (Hosting bei Hosttech.at)
    - Später: Kontaktformular (Vorbereitung erwähnen)
  - **Rechtsgrundlage:** Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
  - **Hosting:** Hosttech.at, Schweiz (DSGVO-konform)
  - **Server-Logs:**
    - IP-Adresse (anonymisiert nach 7 Tagen)
    - Browser/OS
    - Zugriffszeitpunkt
    - Aufbewahrungsdauer: max. 7 Tage
  - **Keine Cookies:** Explizit erwähnen, dass aktuell keine Cookies gesetzt werden
  - **Keine Tracking-Tools:** Keine Analyse-Tools, kein Google Analytics
  - **Externe Ressourcen:** Falls Fonts/Icons extern geladen werden → erwähnen und Datenschutz-Konsequenzen erklären (Empfehlung: Systemfonts verwenden)
  - **Betroffenenrechte:**
    - Auskunft (Art. 15 DSGVO)
    - Berichtigung (Art. 16 DSGVO)
    - Löschung (Art. 17 DSGVO)
    - Einschränkung (Art. 18 DSGVO)
    - Widerspruch (Art. 21 DSGVO)
    - Datenübertragbarkeit (Art. 20 DSGVO)
    - Beschwerde bei Aufsichtsbehörde (Österreichische Datenschutzbehörde)
  - Hinweis: Text ist Entwurf, sollte ggf. rechtlich geprüft werden
- Verlinkung aus Footer auf jeder Seite
- Klare, verständliche Sprache (kein reines Juristendeutsch)
- Mobile-optimierte Darstellung

---

### FR-005: Barrierefreiheitserklärung
Erklärung zur Barrierefreiheit der Website (Best Practice, Empfehlung).

**Akzeptanzkriterien:**
- Eigene Seite: `pages/legal/barrierefreiheit.html`
- Inhalt:
  - Bekenntnis zu Barrierefreiheit
  - Maßnahmen:
    - Semantisches HTML
    - Tastaturbedienung
    - WCAG 2.1 Level AA als Ziel (soweit möglich)
    - Responsive Design
  - Hinweis auf Kontaktmöglichkeit bei Barrieren
  - Stand der Erklärung (Datum)
- Verlinkung aus Footer
- Mobile-optimierte Darstellung

---

### FR-006: Footer-Bereich
Konsistenter Footer auf allen Seiten mit rechtlichen Links und Kontaktdaten.

**Akzeptanzkriterien:**
- Enthalten:
  - Links zu: Impressum, Datenschutz, Barrierefreiheit
  - Copyright-Hinweis: © 2026 Transparentes Villach - Gernot Oberrauner
  - Kontakt-E-Mail: kontakt@transparentesVillach.at
  - Optional: Social-Media-Links (falls vorhanden)
- Design: Gelb/Gold als Akzentfarbe (Villacher Stadtfarbe)
- Auf allen Seiten identisch
- Responsive

---

## Nicht-funktionale Anforderungen

### NFR-001: Design & Branding
- **Farbschema:**
  - Primärfarbe: Gelb/Gold (analog www.villach.at)
  - Sekundärfarben: Grautöne, Weiß, ggf. dunkles Blau
  - Akzentfarbe: Villacher Gelb (#FDB913 oder ähnlich)
- **Typografie:**
  - System-Font-Stack (keine externen Fonts → DSGVO-freundlich)
  - Beispiel: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
  - Gute Lesbarkeit: min. 16px Grundschrift, max-width für Textblöcke
- **Layout:**
  - Clean, modern, klar strukturiert
  - Whitespace für Übersichtlichkeit
  - Grid/Flexbox für Layout

### NFR-002: Responsive Design
- Mobile-First-Ansatz
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- Touch-Optimierung für mobile Geräte (min. 44x44px Tap-Targets)
- Bildoptimierung (falls Bilder verwendet werden)

### NFR-003: Performance
- Ladezeit < 2 Sekunden (bei durchschnittlicher Verbindung)
- Lighthouse Score: > 90 (Performance, Accessibility)
- Minimierung von Requests (lokale Assets, kein externes CDN wenn möglich)

### NFR-004: Sicherheit & Datenschutz
- **Keine Cookies** in dieser Version
- **Keine Tracking-Tools**
- Externe Ressourcen minimieren:
  - Fonts lokal hosten oder Systemfonts
  - Icons lokal (SVG) oder selbst hosten
- Content Security Policy (CSP):
  - Start: als Meta-Tag in HTML
  - Später: via Server-Header bei Hosttech
- **Sanitization:** Keine User-Inputs in dieser Version, daher kein XSS-Risiko

### NFR-005: Barrierefreiheit
- Semantisches HTML (nav, header, main, footer, article, section)
- Alt-Texte für alle Bilder
- Farbkontrast: WCAG 2.1 Level AA (min. 4.5:1 für Text)
- Keyboard-Navigation vollständig nutzbar
- Focus-States sichtbar
- Skip-Links (optional, empfohlen)
- ARIA nur wo nötig (nicht übertreiben)

### NFR-006: Browser-Kompatibilität
- Moderne Browser (letzten 2 Versionen):
  - Chrome/Edge (Chromium)
  - Firefox
  - Safari
- Graceful Degradation für ältere Browser

### NFR-007: SEO (Suchmaschinenoptimierung)
- Meta-Tags:
  - Title (eindeutig pro Seite)
  - Description
  - Viewport
  - Open Graph (optional, für Social Media)
- Strukturierte Daten (optional, später)
- Semantisches HTML

---

## Technische Anforderungen

### Tech-001: Ordnerstruktur
Gemäß Copilot-Instructions:

```
/
├── index.html                          # Landing Page
├── pages/
│   ├── about.html                      # Über das Projekt (Platzhalter)
│   └── legal/
│       ├── impressum.html              # Impressum
│       ├── datenschutz.html            # Datenschutzerklärung
│       └── barrierefreiheit.html       # Barrierefreiheitserklärung
├── assets/
│   ├── css/
│   │   ├── base.css                    # Reset, Variablen, Typografie
│   │   ├── layout.css                  # Grid, Header, Footer, Sections
│   │   ├── components.css              # Buttons, Cards, Nav
│   │   └── themes.css                  # Dark/Light (optional, später)
│   ├── js/
│   │   ├── main.js                     # Init, Navigation
│   │   └── utils/
│   │       └── dom.js                  # Hilfsfunktionen (falls nötig)
│   ├── img/                            # Bilder (Logo, etc.)
│   └── icons/                          # Icons (SVG)
├── content/                            # Vorbereitet für Blog (später)
│   └── posts/                          # Leer in dieser Iteration
├── README.md                           # Projektdokumentation
└── LICENSE                             # Optional (falls Open Source)
```

### Tech-002: CSS-Architektur
- **base.css:**
  - CSS Reset (z.B. minimal reset)
  - CSS-Variablen (Custom Properties):
    - Farben: `--color-primary`, `--color-secondary`, `--color-text`, `--color-bg`
    - Spacing: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`, `--spacing-xl`
    - Typography: `--font-base`, `--font-size-*`, `--line-height-*`
  - Grundlegende Typografie
- **layout.css:**
  - Container/Wrapper
  - Header, Footer, Main
  - Grid-Systeme (falls benötigt)
- **components.css:**
  - Buttons
  - Navigation (Desktop + Mobile)
  - Cards (Vorbereitung für Blog)
  - Links
- **themes.css:**
  - Dark Mode: Optional, in späterer Iteration
  - `prefers-color-scheme` Media Query vorbereiten

### Tech-003: JavaScript
- ES Modules (`type="module"`)
- Minimal: nur für Navigation (Mobile-Toggle)
- Vanilla JS (kein Framework)
- Keine globalen Variablen
- `main.js` als Einstiegspunkt

### Tech-004: HTML-Struktur (Beispiel)
Jede Seite folgt diesem Muster:

```html
<!DOCTYPE html>
<html lang="de-AT">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Seitentitel] - Transparentes Villach</title>
    <meta name="description" content="[Seitenbeschreibung]">
    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/layout.css">
    <link rel="stylesheet" href="/assets/css/components.css">
</head>
<body>
    <a href="#main" class="skip-link">Zum Hauptinhalt springen</a>
    
    <header>
        <nav>
            <!-- Navigation -->
        </nav>
    </header>
    
    <main id="main">
        <!-- Seiteninhalt -->
    </main>
    
    <footer>
        <!-- Footer mit rechtlichen Links -->
    </footer>
    
    <script src="/assets/js/main.js" type="module"></script>
</body>
</html>
```

---

## Abgrenzung (Explizit NICHT in diesem Feature)

- **Kein Blog-System:** Content-Management für Beiträge kommt in Feature 0002
- **Kein Kontaktformular:** Messagebox kommt in Feature 0003
- **Kein Dark Mode:** Kann in späterem Sprint ergänzt werden
- **Keine SQLite-Integration:** Erst wenn dynamische Inhalte benötigt werden
- **Kein Backend:** Statische Website, kein Node.js/Server
- **Keine Tracking/Analytics:** Privacy-first
- **Kein Cookie-Banner:** Nicht nötig, da keine Cookies

---

## User Stories

### US-001: Landing Page besuchen
**Als** Bürger von Villach  
**möchte ich** auf der Startseite klar erkennen, worum es bei "Transparentes Villach" geht  
**damit** ich schnell verstehe, ob diese Seite für mich relevant ist.

**Akzeptanzkriterien:**
- Hero-Bereich mit Überschrift: "Transparentes Villach" und Untertitel: "Informationen, Anfragen und Antworten zur Transparenz in unserer Stadt"
- Kurzer Einleitungstext (2-3 Sätze) zum Thema Informationsfreiheitsgesetz
- Call-to-Action Button: "Zu den Beiträgen" (disabled/Platzhalter mit Hinweis "Demnächst verfügbar")
- Responsive auf Mobile, Tablet, Desktop
- Ladezeit < 2 Sekunden

**Definition of Done:**
- Code deployed
- Getestet auf Chrome, Firefox, Safari (mobile & desktop)
- Lighthouse Score > 90
- Review durch PO

---

### US-002: Navigation nutzen
**Als** Besucher  
**möchte ich** eine klare Navigation  
**damit** ich mich auf der Website zurechtfinde.

**Akzeptanzkriterien:**
- Desktop: Horizontale Navigation im Header
- Mobile: Hamburger-Menü (Toggle)
- Menüpunkte: Startseite, Über das Projekt, Kontakt, Blog (letztere 3 mit "coming soon" Badge)
- Aktive Seite hervorgehoben
- Keyboard-Navigation: Tab, Enter, Escape (Mobile-Menü schließen)
- Footer-Navigation: Impressum, Datenschutz, Barrierefreiheit

**Definition of Done:**
- Funktioniert auf allen Breakpoints
- Keyboard-Navigation getestet
- Accessibility-Check bestanden

---

### US-003: Impressum einsehen
**Als** Besucher  
**möchte ich** wissen, wer für die Website verantwortlich ist  
**damit** ich den Betreiber kontaktieren kann.

**Akzeptanzkriterien:**
- Seite `/pages/legal/impressum.html` existiert
- Pflichtangaben vorhanden:
  - Name: Gernot Oberrauner
  - Anschrift: [TODO: Vollständige Adresse eintragen]
  - E-Mail: kontakt@transparentesVillach.at
  - Hinweis: Privatperson, keine gewerbliche Tätigkeit
- Link im Footer auf jeder Seite
- Mobile-optimiert

**Definition of Done:**
- Text von PO abgenommen (rechtlich korrekt)
- Verlinkung funktioniert
- Mobile-Darstellung OK

---

### US-004: Datenschutzerklärung lesen
**Als** Besucher  
**möchte ich** wissen, welche Daten erhoben werden  
**damit** ich meine Privatsphäre einschätzen kann.

**Akzeptanzkriterien:**
- Seite `/pages/legal/datenschutz.html` existiert
- Inhalt gemäß FR-004 (siehe oben):
  - Verantwortlicher
  - Zweck und Rechtsgrundlage
  - Hosting-Informationen (Hosttech.at)
  - Server-Logs (IP anonymisiert nach 7 Tagen)
  - Keine Cookies
  - Keine Tracking-Tools
  - Betroffenenrechte
  - Kontakt bei Fragen
- Verständliche Sprache (kein pures Juristendeutsch)
- Link im Footer auf jeder Seite
- Mobile-optimiert

**Definition of Done:**
- Text von PO abgenommen
- Verlinkung funktioniert
- Mobile-Darstellung OK
- Hinweis im Text: "Entwurf, rechtliche Prüfung empfohlen"

---

### US-005: Barrierefreiheitserklärung lesen
**Als** Besucher mit Beeinträchtigungen  
**möchte ich** wissen, welche Barrierefreiheitsmaßnahmen getroffen wurden  
**damit** ich die Seite nutzen kann.

**Akzeptanzkriterien:**
- Seite `/pages/legal/barrierefreiheit.html` existiert
- Inhalt gemäß FR-005 (siehe oben):
  - Bekenntnis zu Barrierefreiheit
  - Maßnahmen (semantisches HTML, Tastaturbedienung, Kontrast, WCAG 2.1 AA Ziel)
  - Kontaktmöglichkeit bei Problemen
  - Stand der Erklärung (06.01.2026)
- Link im Footer auf jeder Seite
- Mobile-optimiert

**Definition of Done:**
- Text von PO abgenommen
- Verlinkung funktioniert
- Mobile-Darstellung OK

---

### US-006: Website auf Smartphone nutzen
**Als** Bürger, der mobil surft  
**möchte ich** die Website auf meinem Smartphone nutzen können  
**damit** ich auch unterwegs Informationen abrufen kann.

**Akzeptanzkriterien:**
- Alle Seiten responsive
- Navigation: Hamburger-Menü auf Mobile
- Text lesbar ohne Zoomen (min. 16px)
- Buttons/Links: min. 44x44px Touch-Target
- Bilder passen sich an Viewport an
- Keine horizontale Scrollbar
- Getestet auf iOS Safari und Android Chrome

**Definition of Done:**
- Manuelle Tests auf echten Geräten (min. 1x iOS, 1x Android)
- Lighthouse Mobile Score > 90

---

### US-007: Website auf Desktop nutzen
**Als** Bürger mit Desktop-Computer  
**möchte ich** die Website mit guter Lesbarkeit und Übersicht nutzen  
**damit** ich Informationen komfortabel lesen kann.

**Akzeptanzkriterien:**
- Desktop-Layout nutzt Bildschirmbreite sinnvoll (nicht über 100% Breite)
- Textblöcke: max-width ca. 70ch für Lesbarkeit
- Navigation horizontal im Header
- Whitespace für Übersichtlichkeit
- Getestet auf Chrome, Firefox, Edge

**Definition of Done:**
- Visuelle Prüfung auf 1920x1080 und 1366x768
- Lighthouse Desktop Score > 90

---

### US-008: Tastaturbedienung
**Als** Nutzer, der keine Maus verwenden kann  
**möchte ich** die Website vollständig mit der Tastatur bedienen können  
**damit** ich barrierefrei navigieren kann.

**Akzeptanzkriterien:**
- Alle interaktiven Elemente per Tab erreichbar
- Focus-States sichtbar (Outline oder Custom-Style)
- Navigation: Tab, Enter, Escape (Mobile-Menü)
- Skip-Link zu Hauptinhalt (optional, empfohlen)
- Logische Tab-Reihenfolge
- Keine Keyboard-Traps

**Definition of Done:**
- Manuelle Keyboard-Navigation getestet
- Accessibility-Audit (z.B. WAVE, axe DevTools) durchgeführt

---

### US-009: Schnelle Ladezeit
**Als** Besucher  
**möchte ich** dass die Seite schnell lädt  
**damit** ich nicht warten muss.

**Akzeptanzkriterien:**
- Ladezeit < 2 Sekunden (bei durchschnittlicher Verbindung)
- Lighthouse Performance Score > 90
- Minimale externe Requests
- Assets optimiert:
  - CSS minifiziert (optional, später)
  - Bilder komprimiert (falls vorhanden)
  - Keine unnötigen Ressourcen

**Definition of Done:**
- Lighthouse-Test auf Mobile und Desktop durchgeführt
- Performance Score dokumentiert

---

### US-010: SEO-Grundlagen
**Als** Betreiber  
**möchte ich** dass die Seite von Suchmaschinen gefunden wird  
**damit** Bürger von Villach die Seite finden können.

**Akzeptanzkriterien:**
- Jede Seite hat eindeutigen `<title>`
  - Startseite: "Transparentes Villach - Informationen zur Transparenz in Villach"
  - Impressum: "Impressum - Transparentes Villach"
  - Datenschutz: "Datenschutzerklärung - Transparentes Villach"
  - Barrierefreiheit: "Barrierefreiheitserklärung - Transparentes Villach"
- Jede Seite hat `<meta name="description">`
- `<html lang="de-AT">` gesetzt
- Semantisches HTML (h1-h6 Hierarchie)
- Alt-Texte für Bilder (falls vorhanden)

**Definition of Done:**
- Manuelle Prüfung der Meta-Tags
- SEO-Audit durchgeführt (z.B. Lighthouse, SEO-Check)

---

## Testfälle

### TC-001: Landing Page lädt
- **Vorbedingung:** Keine
- **Schritte:**
  1. Browser öffnen
  2. URL aufrufen: `https://transparentesvillach.at` (oder Staging-URL)
- **Erwartetes Ergebnis:**
  - Seite lädt in < 2 Sekunden
  - Hero-Bereich mit "Transparentes Villach" sichtbar
  - Navigation sichtbar
  - Footer sichtbar mit Links zu Impressum, Datenschutz, Barrierefreiheit

### TC-002: Navigation - Desktop
- **Vorbedingung:** Desktop-Browser (Viewport > 1024px)
- **Schritte:**
  1. Landing Page öffnen
  2. Navigation im Header prüfen
- **Erwartetes Ergebnis:**
  - Horizontale Navigation sichtbar
  - Menüpunkte: Startseite, Über das Projekt, Kontakt, Blog
  - Aktiver Menüpunkt hervorgehoben (z.B. "Startseite")

### TC-003: Navigation - Mobile
- **Vorbedingung:** Mobile-Browser (Viewport < 768px)
- **Schritte:**
  1. Landing Page öffnen
  2. Hamburger-Icon klicken
  3. Menü sollte aufklappen
  4. Menüpunkt klicken oder Escape drücken
- **Erwartetes Ergebnis:**
  - Hamburger-Icon sichtbar
  - Menü klappt auf/zu
  - Navigation funktioniert
  - Menü schließt bei Escape oder Klick außerhalb

### TC-004: Impressum öffnen
- **Vorbedingung:** Keine
- **Schritte:**
  1. Beliebige Seite öffnen
  2. Im Footer auf "Impressum" klicken
- **Erwartetes Ergebnis:**
  - Impressum-Seite lädt
  - Pflichtangaben vorhanden (Name, Adresse, E-Mail)
  - URL: `/pages/legal/impressum.html`

### TC-005: Datenschutzerklärung öffnen
- **Vorbedingung:** Keine
- **Schritte:**
  1. Beliebige Seite öffnen
  2. Im Footer auf "Datenschutz" klicken
- **Erwartetes Ergebnis:**
  - Datenschutz-Seite lädt
  - Inhalte vorhanden (Verantwortlicher, Zweck, Rechte)
  - URL: `/pages/legal/datenschutz.html`

### TC-006: Barrierefreiheitserklärung öffnen
- **Vorbedingung:** Keine
- **Schritte:**
  1. Beliebige Seite öffnen
  2. Im Footer auf "Barrierefreiheit" klicken
- **Erwartetes Ergebnis:**
  - Barrierefreiheits-Seite lädt
  - Inhalte vorhanden (Maßnahmen, Kontakt)
  - URL: `/pages/legal/barrierefreiheit.html`

### TC-007: Responsive - Mobile (iPhone)
- **Vorbedingung:** iOS Safari
- **Schritte:**
  1. Alle Seiten öffnen (Startseite, Impressum, Datenschutz, Barrierefreiheit)
- **Erwartetes Ergebnis:**
  - Layout passt sich an
  - Keine horizontale Scrollbar
  - Text lesbar ohne Zoom
  - Navigation funktioniert (Hamburger)

### TC-008: Responsive - Tablet
- **Vorbedingung:** Viewport 768px - 1024px
- **Schritte:**
  1. Alle Seiten öffnen
- **Erwartetes Ergebnis:**
  - Layout passt sich an
  - Navigation funktioniert (ggf. Hamburger oder horizontal)

### TC-009: Keyboard-Navigation
- **Vorbedingung:** Desktop-Browser
- **Schritte:**
  1. Landing Page öffnen
  2. Nur Tastatur verwenden (Tab, Enter, Escape)
  3. Durch Navigation tabben
  4. Link mit Enter öffnen
  5. Zurück mit Backspace oder Browser-Button
- **Erwartetes Ergebnis:**
  - Alle interaktiven Elemente per Tab erreichbar
  - Focus sichtbar
  - Links mit Enter aktivierbar
  - Skip-Link funktioniert (optional)

### TC-010: Farbkontrast
- **Vorbedingung:** Browser mit Contrast Checker (z.B. axe DevTools)
- **Schritte:**
  1. Alle Seiten öffnen
  2. Farbkontrast prüfen (Text zu Hintergrund)
- **Erwartetes Ergebnis:**
  - Mindestens WCAG AA (4.5:1 für normalen Text, 3:1 für großen Text)

### TC-011: Lighthouse-Audit
- **Vorbedingung:** Chrome DevTools
- **Schritte:**
  1. Startseite öffnen
  2. DevTools → Lighthouse → Audit starten (Mobile + Desktop)
- **Erwartetes Ergebnis:**
  - Performance > 90
  - Accessibility > 90
  - Best Practices > 90
  - SEO > 90

### TC-012: Cross-Browser
- **Vorbedingung:** Chrome, Firefox, Safari, Edge
- **Schritte:**
  1. Alle Seiten in jedem Browser öffnen
- **Erwartetes Ergebnis:**
  - Layout konsistent
  - Keine JavaScript-Fehler in Console
  - Funktionen arbeiten

---

## Abhängigkeiten

- **Hosting:** Hosttech.at muss bereit sein (Account existiert, Domain konfiguriert)
- **Domain:** `transparentesvillach.at` muss registriert und konfiguriert sein
- **E-Mail:** `kontakt@transparentesvillach.at` muss funktionieren (für Impressum/Datenschutz)
- **Vollständige Adresse:** Gernot Oberrauner muss seine vollständige Postadresse für Impressum bereitstellen

---

## Risiken & Mitigationen

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| Rechtliche Anforderungen nicht vollständig | Mittel | Hoch | → Rechtsberatung empfohlen, Texte als Entwurf kennzeichnen |
| Domain noch nicht verfügbar | Niedrig | Mittel | → Deployment auf Staging-URL möglich, später umziehen |
| Vollständige Adresse fehlt | Mittel | Hoch | → Placeholder mit TODO, Blocker für Go-Live |
| Hosting-Konfiguration unklar | Niedrig | Mittel | → Mit Hosttech.at Support klären vor Deployment |
| Farbschema Villach falsch | Niedrig | Niedrig | → www.villach.at als Referenz, Feedback von PO |

---

## Definition of Done (Feature-Level)

- [ ] Alle User Stories implementiert und getestet
- [ ] Alle Akzeptanzkriterien erfüllt
- [ ] Alle Testfälle durchgeführt und bestanden
- [ ] Code deployed auf Staging/Production (Hosttech.at)
- [ ] Lighthouse-Audit durchgeführt (Scores dokumentiert)
- [ ] Accessibility-Audit durchgeführt (z.B. WAVE, axe)
- [ ] Cross-Browser-Tests durchgeführt (Chrome, Firefox, Safari)
- [ ] Mobile-Tests durchgeführt (iOS, Android)
- [ ] Rechtliche Texte von PO abgenommen (mit Hinweis auf rechtliche Prüfung)
- [ ] README.md aktualisiert mit Projektinfos
- [ ] Dokumentation vollständig (z.B. Ordnerstruktur erklärt)

---

## Timeline & Aufwand

**Geschätzter Aufwand:** 3-5 Tage (1 Sprint)

**Aufgabenverteilung:**
- **HTML/Struktur:** 0.5 Tage
- **CSS (Design, Responsive):** 1.5 Tage
- **JavaScript (Navigation):** 0.5 Tage
- **Content (Texte für Impressum, Datenschutz, Barrierefreiheit):** 1 Tag
- **Testing (Cross-Browser, Mobile, Accessibility):** 1 Tag
- **Deployment & Bugfixes:** 0.5 Tage

**Meilensteine:**
- Tag 1: Struktur + Base CSS
- Tag 2: Layout + Components CSS, Navigation JS
- Tag 3: Rechtliche Seiten (Content), Responsive Testing
- Tag 4: Cross-Browser Testing, Accessibility Audit
- Tag 5: Deployment, finale Abnahme

---

## Review & Abnahme

**Review durch:**
- Product Owner (Gernot Oberrauner / vertreten durch Team Lead)
- QA-Team (Testing)
- Optional: Rechtliche Prüfung (extern, empfohlen)

**Abnahmekriterien:**
- Alle User Stories "Done"
- Feature deployed und erreichbar
- Keine Critical/High Bugs
- Rechtliche Seiten vorhanden und verlinkt

---

## Anhang: Referenzen

- **Österreichisches E-Commerce-Gesetz (ECG):** https://www.ris.bka.gv.at/GeltendeFassung.wxe?Abfrage=Bundesnormen&Gesetzesnummer=20001703
- **DSGVO (GDPR):** https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **WCAG 2.1 (Barrierefreiheit):** https://www.w3.org/TR/WCAG21/
- **Villach.at (Design-Referenz):** https://www.villach.at
- **Hosttech.at (Hosting-Provider):** https://www.hosttech.at

---

## Änderungshistorie

| Version | Datum | Autor | Änderung |
|---------|-------|-------|----------|
| 1.0 | 06.01.2026 | Product Owner | Initiale Version |

---

**Hinweis für Entwicklungsteam:**  
Diese Feature-Beschreibung ist vollständig und ohne Rückfragen implementierbar. Bei Unklarheiten bezüglich rechtlicher Texte: Platzhalter mit TODO verwenden und PO informieren. Technische Entscheidungen (z.B. genaue Breakpoints, Farbcodes) können vom Team getroffen werden, solange die Anforderungen erfüllt sind.
