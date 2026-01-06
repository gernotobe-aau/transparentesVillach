# Copilot Instructions (Projekt: Statische HTML-Seite, modern, später dynamische Beiträge)

## 1 Ziel & Rahmen
- Erstelle eine **normale statische Website** (HTML/CSS/JS), **ohne Backend**.
- Keine SPA-Frameworks (React/Vue/Angular) und keine Server-Dependencies.
- Modernes, klares UI (responsive, gute Typografie, Dark-Mode optional).
- Saubere, skalierbare Ordnerstruktur.
- Später sollen **Beiträge dynamisch** kommen können:
  - Primär: JSON/Markdown-basierte Inhalte (einfach, wartbar).
  - Optional/Später: **SQLite im Browser** (WASM) z.B. via `sql.js` (keine Server-DB).

## 2 Technologiestack
- HTML5 + semantische Tags
- CSS: Vanilla CSS mit CSS-Variablen, Layout via Flex/Grid
- JS: Vanilla ES Modules (`type="module"`)
- Build: **optional** (nur wenn nötig)
  - Wenn bundling gebraucht wird: Vite oder ein minimaler bundler
  - Standardfall: kein Build, alles direkt im Browser lauffähig

## 3 Ordnerstruktur (Pflicht)
Nutze diese Struktur, ohne unnötige Tiefe:

/ (root)
- index.html
- pages/
  - about.html
  - legal/
    - impressum.html
    - datenschutz.html
    - cookies.html (nur falls nötig)
    - barrierefreiheit.html (Empfehlung)
- assets/
  - css/
    - base.css        (Reset/Grundlagen, Variablen, Typo)
    - layout.css      (Grid, Header, Footer, Sections)
    - components.css  (Buttons, Cards, Badges, Nav)
    - themes.css      (Dark/Light, prefers-color-scheme)
  - js/
    - main.js         (Bootstrap, Navigation, Initialisierung)
    - router.js       (optional: kleine Hilfslogik, falls nötig)
    - posts/
      - posts.js      (Listing/Rendering)
      - sources.js    (Datenquellen: json/sqlite)
      - markdown.js   (optional: Markdown parser light)
    - utils/
      - dom.js
      - format.js     (Datum, Locale, etc.)
  - img/
  - icons/
- content/
  - posts/
    - 2026-01-01-beispiel-post.md (oder .json)
  - posts.json (optional: Index)
- data/
  - app.db (optional: SQLite Datei für Browser-Lesezugriff)
- scripts/ (optional)
  - build-post-index.mjs (falls Index generiert werden soll)
- README.md

Regeln:
- Keine riesigen JS-Dateien. Lieber kleine Module.
- Keine Inline-Skripte außer minimal (wenn nötig).
- Alle Pfade relativ und sauber.

## 4 UI/UX Anforderungen
- Mobile-first, responsive Breakpoints.
- Navigationsleiste mit klarer Struktur.
- Typografie:
  - System-Font-Stack (kein externes CDN zwingend).
  - Gute Zeilenhöhe, max-width für Text.
- Komponenten: Card, Button, Tag/Badge, Callout.
- Dark-Mode: über `prefers-color-scheme` + optionaler Toggle (LocalStorage).

## 5 Beiträge: jetzt statisch, später dynamisch
### 5.1 Jetzt (empfohlen): Markdown/JSON
- Posts liegen unter `content/posts/`.
- Ein `posts.json` kann als Index dienen (Titel, Datum, Slug, Tags).
- Rendering:
  - Listing-Seite: liest `posts.json`
  - Detail-Seite: lädt Markdown/JSON nach

### 5.2 Später (optional): SQLite im Browser
Ziel: Beiträge aus einer SQLite DB **im Browser** lesen, ohne Backend.

Optionen:
- `sql.js` (SQLite via WebAssembly):
  - DB-Datei liegt unter `data/app.db`
  - JS lädt DB als ArrayBuffer und führt SELECTs aus
  - Nur **Read-Only** im ersten Schritt
- Speichern/Schreiben später:
  - Nur wenn wirklich gebraucht (z.B. OPFS / IndexedDB)
  - Kein Tracking/kein Server-sync ohne Konzept

Wichtig:
- Keine sensiblen personenbezogenen Daten in eine clientseitige DB packen.
- DB-Inhalte sind für jeden Nutzer einsehbar (weil im Browser ausgeliefert).

## Recht (EU / Österreich) – Muss berücksichtigt werden
**Hinweis:** Copilot soll Texte/Seiten als Vorlage erstellen, aber immer als *Entwurf* kennzeichnen.

### 6.1 Impressum (AT)
- Seite `pages/legal/impressum.html` vorsehen.
- Mindestens:
  - Name/Firma
  - Anschrift
  - Kontakt (E-Mail)
  - Unternehmensgegenstand (falls relevant)
  - UID (falls vorhanden)
  - Firmenbuchnummer/Gericht (falls relevant)
- Keine falschen Angaben erfinden. Platzhalter mit TODO.

### 6.2 Datenschutz (DSGVO)
- Seite `pages/legal/datenschutz.html` vorsehen.
- Inhalte:
  - Verantwortlicher (mit Platzhaltern)
  - Zweck und Rechtsgrundlagen (Art. 6 DSGVO)
  - Hosting/Server-Logs (typischerweise berechtigtes Interesse)
  - Drittanbieter (Fonts, Analytics, Maps etc.) – nur wenn verwendet
  - Betroffenenrechte
  - Aufbewahrung/Retention (sinnvoll erklären)
- Wenn keine Cookies/Tracking: das explizit schreiben.

### 6.3 Cookies / Tracking
- Keine Tracking-Tools standardmäßig einbauen.
- Wenn Analytics nötig: privacy-friendly (z.B. ohne Cookies) und nur nach Konzept.
- Cookie-Banner nur wenn tatsächlich erforderlich (z.B. nicht-essentielle Cookies).

### 6.4 Urheberrecht & Lizenzen
- Nur eigene Assets oder sauber lizenzierte Quellen.
- `LICENSE`/Attribution-Hinweis, falls Icons/Fonts genutzt werden.

### 6.5 Barrierefreiheit (Empfehlung)
- Semantisches HTML, aria nur wo nötig.
- Kontrast, Fokus-States, Tastaturbedienung.
- Seite `pages/legal/barrierefreiheit.html` als Statement (optional, aber empfehlenswert).

## 7 Sicherheit & Datenschutz-by-Default
- Keine geheimen Keys im Repo.
- Keine personenbezogenen Daten hardcoden.
- Externe Ressourcen minimieren:
  - Fonts lokal hosten oder Systemfonts nutzen.
- Content Security Policy (optional, aber empfohlen):
  - In HTML als Meta (nur als Start) oder später via Server-Header.
- Sanitization:
  - Wenn Markdown zu HTML gerendert wird: XSS vermeiden (keine unsafe HTML Injection).

## 8 Coding Standards
- JS: ES Modules, `const`/`let`, keine globalen Variablen.
- Funktionen klein, gut benannt, möglichst pure.
- Keine Magie: klare Datenmodelle für Posts (title, date, slug, tags, excerpt, content).
- Formatierung: Prettier-ähnlich (2 Spaces, trailing commas wo sinnvoll).
- Kommentare: nur für “warum”, nicht für “was”.

## 9 Deliverables (Copilot soll liefern)
Minimum:
- `index.html` (Startseite + Layout)
- `assets/css/*.css` (Base/Layout/Components/Themes)
- `assets/js/main.js` (Init)
- `assets/js/posts/*` (Post listing + detail rendering)
- `pages/legal/impressum.html`
- `pages/legal/datenschutz.html`
Optional:
- `content/posts/` Beispielposts
- `posts.json` Beispielindex
- SQLite Demo (nur wenn ausdrücklich umgesetzt)

## Host

- Wird auf Hosttech.at gehostet.

## Betreiber

- Privatperson: Gernot Oberrauner

## Sprache

- Deutsch (Österreich)

## Nicht-Ziele (Explizit vermeiden)
- Kein Node-Backend, keine API, kein Login.
- Keine schweren UI Frameworks.
- Kein Tracking/Ads standardmäßig.
- Keine erfundenen Rechts-/Firmendaten (immer TODO/Platzhalter).

## Qualitätscheckliste
- Lighthouse grob: Performance & Accessibility gut.
- Mobile Layout passt.
- Keine 404 Pfade.
- Legal Seiten sind vorhanden und verlinkt.
- Dark-Mode (wenn implementiert) speichert Zustand sauber.
