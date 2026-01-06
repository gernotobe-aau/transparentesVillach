# Feature 0002: Blog & Beitragssystem

**Feature-ID:** FEAT-0002  
**Erstellt am:** 06.01.2026  
**Sprint:** 2  
**Priorität:** Hoch  
**Status:** Ready for Development  
**Abhängigkeiten:** FEAT-0001 (Grundgerüst)

---

## Überblick

Als Kernfunktion von "Transparentes Villach" soll ein Blog-System implementiert werden, über das Beiträge zu Transparenz, Informationsfreiheitsgesetz und Anfragen an die Stadt Villach veröffentlicht werden können. Das System besteht aus einer Übersichtsseite mit Vorschau aller Beiträge (chronologisch sortiert) und Detailseiten für vollständige Beiträge.

---

## Geschäftswert

- **Kernmission:** Ermöglicht die zentrale Funktion der Website (Aufklärung von Bürgern)
- **Übersichtlichkeit:** Besucher können schnell relevante Beiträge finden
- **Skalierbarkeit:** Wartbares System für wachsende Anzahl von Beiträgen
- **Benutzerfreundlichkeit:** Klare Navigation zwischen Übersicht und Details
- **SEO:** Strukturierte Inhalte für Suchmaschinen-Auffindbarkeit

---

## Stakeholder

- **Betreiber:** Gernot Oberrauner (Content-Ersteller, Admin)
- **Zielgruppe:** Bürger der Stadt Villach und Umland (Leser)
- **Technisch:** Statische Website ohne Backend (Wartbarkeit, Kosten)

---

## Funktionale Anforderungen

### FR-002-001: Blog-Übersichtsseite

**Als** Besucher der Website  
**möchte ich** eine Übersicht aller Blog-Beiträge sehen  
**damit ich** schnell relevante Themen finden und entscheiden kann, welche Beiträge ich lesen möchte.

**Akzeptanzkriterien:**
- **AC-001:** Seite ist über die Hauptnavigation erreichbar (Link "Blog" oder "Beiträge")
- **AC-002:** URL-Pfad: `/pages/blog.html` oder `/blog.html`
- **AC-003:** Alle Beiträge werden als Karten (Cards) dargestellt mit:
  - Titel des Beitrags (als Überschrift, klickbar)
  - Datum der Veröffentlichung (Format: TT.MM.JJJJ, z.B. "06.01.2026")
  - Excerpt/Zusammenfassung (max. 200 Zeichen, mit "..." falls gekürzt)
  - Tags/Kategorien (optional sichtbar, z.B. "IFG", "Anfrage", "Stadtrat")
  - Lesezeit-Schätzung (optional, z.B. "3 Min. Lesezeit")
- **AC-004:** Beiträge sind **absteigend nach Datum sortiert** (neueste zuerst)
- **AC-005:** Jede Karte ist klickbar und führt zur Detailseite des Beitrags
- **AC-006:** Responsive Design: 
  - Mobile (< 768px): 1 Karte pro Zeile
  - Tablet (768px - 1024px): 2 Karten pro Zeile
  - Desktop (> 1024px): 3 Karten pro Zeile
- **AC-007:** Visuelles Feedback bei Hover/Focus (z.B. Schatten, Hintergrundfarbe)
- **AC-008:** Wenn keine Beiträge vorhanden: Freundliche Meldung "Noch keine Beiträge vorhanden"
- **AC-009:** Performance: Seite lädt in < 2 Sekunden (auch bei 20+ Beiträgen)

**Technische Details:**
- HTML-Datei: `pages/blog.html`
- JavaScript-Modul: `assets/js/posts/posts.js`
- Datenquelle: `content/posts.json` (Index-Datei)
- CSS: Nutzt Card-Komponente aus `assets/css/components.css`

---

### FR-002-002: Beitrags-Detailseite

**Als** Besucher  
**möchte ich** einen Beitrag vollständig lesen können  
**damit ich** alle Details zu einem Thema (z.B. Anfrage, Antwort der Stadt) verstehe.

**Akzeptanzkriterien:**
- **AC-010:** Detailseite wird beim Klick auf eine Beitrags-Karte geladen
- **AC-011:** URL-Struktur: `/pages/blog/[slug].html` (z.B. `/pages/blog/ifg-anfrage-stadtrat-2026-01.html`)
- **AC-012:** Anzeige folgender Elemente:
  - Titel des Beitrags (große Überschrift H1)
  - Veröffentlichungsdatum (Format: "6. Jänner 2026" oder "06.01.2026")
  - Tags/Kategorien (z.B. als Badges)
  - Vollständiger Beitragsinhalt (formatierter Text, Überschriften, Listen, Zitate)
  - Optionale Elemente: Autor (aktuell immer "Gernot Oberrauner"), Lesezeit
- **AC-013:** Navigation:
  - "Zurück zur Übersicht"-Link am Anfang
  - Optional: "Nächster/Vorheriger Beitrag"-Links am Ende
- **AC-014:** Responsive Typografie:
  - Max-width für Text: 65-75 Zeichen pro Zeile
  - Angemessene Schriftgröße (min. 16px base)
  - Zeilenhöhe: 1.6-1.8
- **AC-015:** Markdown-Unterstützung für Content:
  - Überschriften (H2-H6)
  - Fett, Kursiv
  - Listen (ungeordnet, geordnet)
  - Links
  - Zitate (Blockquotes)
  - Code-Blöcke (optional, falls technische Inhalte)
- **AC-016:** Bilder (optional): Falls im Beitrag referenziert, aus `assets/img/posts/`
- **AC-017:** PDF-Downloads (optional, mehrere möglich): 
  - Falls Beitrag zugehörige PDFs hat, wird eine Liste mit Download-Links angezeigt
  - Jeder Link hat: Titel/Beschreibung + PDF-Icon + Dateigröße (optional)
  - Beispiel: "IFG-Anfrage vom 6.1.2026 (PDF, 245 KB)"
  - Position: Unterhalb des Titels in eigener Sektion
  - PDFs liegen unter `assets/documents/posts/[filename].pdf`
  - Falls mehrere PDFs: Als Liste dargestellt
  - Falls nur ein PDF: Einzelner Button
- **AC-018:** Accessibility: Semantische HTML5-Struktur (`<article>`, `<header>`, `<time>`)

**Technische Details:**
- HTML-Dateien: 
  - Option A: Generierte statische Seiten pro Beitrag (`pages/blog/[slug].html`)
  - Option B: Dynamisches Laden via `pages/blog-detail.html` + Query-Parameter (`?id=slug`)
- JavaScript: `assets/js/posts/posts.js` + `assets/js/posts/markdown.js`
- Content: Markdown-Dateien in `content/posts/` (z.B. `2026-01-06-ifg-anfrage-stadtrat.md`)

---

### FR-002-003: Beitrags-Datenmodell

**Als** Entwickler  
**benötige ich** ein klares Datenmodell für Beiträge  
**damit ich** Inhalte strukturiert laden und anzeigen kann.

**Datenstruktur (posts.json):**
```json
{
  "posts": [
    {
      "id": "2026-01-06-ifg-anfrage-stadtrat",
      "title": "IFG-Anfrage: Protokolle der Stadtratssitzungen 2025",
      "slug": "ifg-anfrage-stadtrat-2026-01",
      "date": "2026-01-06",
      "dateDisplay": "6. Jänner 2026",
      "excerpt": "Anfrage nach dem Informationsfreiheitsgesetz an die Stadt Villach bezüglich der Veröffentlichung aller Stadtratsprotokolle des Jahres 2025...",
      "tags": ["IFG", "Stadtrat", "Transparenz"],
      "readTime": 3,
      "contentFile": "2026-01-06-ifg-anfrage-stadtrat.md",
      "pdfFiles": [
        {
          "title": "IFG-Anfrage (Original)",
          "file": "2026-01-06-ifg-anfrage.pdf",
          "size": "245 KB"
        },
        {
          "title": "Zustellungsnachweis",
          "file": "2026-01-06-ifg-zustellung.pdf",
          "size": "128 KB"
        }
      ]
    }
  ]
}
```

**Hinweis:** Das Feld `pdfFiles` ist optional. Wenn vorhanden, wird in der Detailansicht eine Download-Sektion mit allen PDFs angezeigt. Das `size`-Feld ist ebenfalls optional.
```

**Markdown-Datei Frontmatter (optional, für spätere Automatisierung):**
```markdown
---
id: 2026-01-06-ifg-anfrage-stadtrat
title: IFG-Anfrage: Protokolle der Stadtratssitzungen 2025
date: 2026-01-06
tags: [IFG, Stadtrat, Transparenz]
---

# Inhalt hier...
```

**Akzeptanzkriterien:**
- **AC-019:** `posts.json` liegt unter `content/posts.json`
- **AC-020:** Alle Pflichtfelder sind vorhanden: id, title, slug, date, excerpt, contentFile
- **AC-021:** Optionale Felder: 
  - `pdfFiles`: Array von PDF-Objekten
  - Jedes PDF-Objekt hat: `title` (Beschreibung), `file` (Dateiname), optional `size` (Dateigröße)
  - Beispiel: `{"title": "IFG-Anfrage", "file": "2026-01-06-ifg-anfrage.pdf", "size": "245 KB"}`
- **AC-022:** `date` ist im ISO-Format (YYYY-MM-DD) für korrekte Sortierung
- **AC-023:** `slug` ist URL-sicher (nur Kleinbuchstaben, Zahlen, Bindestriche)
- **AC-024:** `excerpt` ist maximal 200 Zeichen lang
- **AC-025:** Markdown-Dateien liegen unter `content/posts/[filename].md`
- **AC-026:** PDF-Dateien (falls vorhanden) liegen unter `assets/documents/posts/[filename].pdf`

---

### FR-002-004: Markdown-Rendering

**Als** System  
**muss ich** Markdown-Dateien in HTML umwandeln können  
**damit** Beiträge mit Formatierung angezeigt werden.

**Akzeptanzkriterien:**
- **AC-027:** JavaScript-Modul `assets/js/posts/markdown.js` implementiert Markdown-zu-HTML-Konvertierung
- **AC-028:** Unterstützte Markdown-Syntax:
  - Überschriften: `# H1`, `## H2`, etc.
  - Fett: `**text**`
  - Kursiv: `*text*`
  - Listen: `- item` und `1. item`
  - Links: `[text](url)`
  - Blockquotes: `> text`
  - Horizontal Rules: `---`
- **AC-029:** XSS-Schutz: Keine unsanitizierten HTML-Injections (nur Markdown erlaubt)
- **AC-030:** Code-Blöcke (optional): ` ```code``` ` 
- **AC-031:** Library-Option: 
  - Empfohlen: Lightweight Markdown-Parser (z.B. `marked.js` via CDN oder lokal)
  - Alternativ: Eigene Implementierung für Basis-Markdown

**Technische Details:**
- Option 1 (empfohlen): Einbindung von `marked.min.js` (lokal unter `assets/js/vendor/`)
- Option 2: Minimale Custom-Implementierung
- Sanitization: DOMPurify oder manuelle Filterung

---

## User Stories

### US-002-001: Blog-Übersicht besuchen
**Als** Bürgerin aus Villach  
**möchte ich** die Blog-Seite öffnen  
**damit ich** sehen kann, welche Themen zu Transparenz und Informationsfreiheit verfügbar sind.

**DoD (Definition of Done):**
- [ ] Link "Blog" in Hauptnavigation vorhanden
- [ ] Übersichtsseite zeigt Beispiel-Beiträge (min. 3 Dummy-Beiträge)
- [ ] Responsive Layout funktioniert auf Handy, Tablet, Desktop
- [ ] Lighthouse Accessibility Score > 90

---

### US-002-002: Beitrag auswählen
**Als** Besucher  
**möchte ich** auf eine Beitrags-Karte klicken  
**damit ich** zur Detailseite gelange und den vollständigen Beitrag lese.

**DoD:**
- [ ] Klick auf Titel oder Karte navigiert zu Detailseite
- [ ] URL ändert sich korrekt
- [ ] Keine 404-Fehler
- [ ] Browser-Back-Button funktioniert

---

### US-002-003: Beitrag lesen
**Als** Leser  
**möchte ich** einen Beitrag in gut lesbarer Formatierung sehen  
**damit ich** die Informationen einfach aufnehmen kann.

**DoD:**
- [ ] Text ist gut lesbar (Schriftgröße, Zeilenabstand, Kontrast)
- [ ] Markdown wird korrekt zu HTML gerendert
- [ ] Überschriften, Listen, Links funktionieren
- [ ] Bilder (falls vorhanden) werden angezeigt
- [ ] Mobile Ansicht ist angenehm lesbar

---

### US-002-004: Zurück zur Übersicht
**Als** Leser  
**möchte ich** nach dem Lesen eines Beitrags einfach zurück zur Übersicht  
**damit ich** weitere Beiträge entdecken kann.

**DoD:**
- [ ] "Zurück zur Übersicht"-Link am Anfang der Detailseite
- [ ] Link führt zur Blog-Übersicht
- [ ] Browser-Back-Button funktioniert ebenfalls

---

### US-002-005: Beiträge nach Datum sortiert sehen
**Als** regelmäßiger Besucher  
**möchte ich** die neuesten Beiträge zuerst sehen  
**damit ich** keine aktuellen Informationen verpasse.

**DoD:**
- [ ] Beiträge sind absteigend nach Datum sortiert (neueste zuerst)
- [ ] Datum ist klar sichtbar auf jeder Karte
- [ ] Sortierung funktioniert auch bei 10+ Beiträgen

---

## Nicht-funktionale Anforderungen

### NFR-002-001: Performance
- Seitenlade-Zeit < 2 Sekunden (3G-Verbindung)
- Keine blockierenden Ressourcen
- Lazy Loading für Bilder (falls vorhanden)
- JavaScript-Bundle < 50 KB (unkomprimiert)

### NFR-002-002: Accessibility (WCAG 2.1 Level AA)
- Semantisches HTML (`<article>`, `<time>`, `<nav>`)
- Tastatur-Navigation funktioniert
- Screen-Reader-kompatibel
- Kontrast-Verhältnis > 4.5:1
- Focus-States sichtbar

### NFR-002-003: SEO
- `<title>` und `<meta description>` für jede Seite
- Strukturierte Daten (Schema.org BlogPosting) optional
- Semantische HTML-Struktur
- Sprechende URLs (Slug-basiert)

### NFR-002-004: Wartbarkeit
- Neue Beiträge hinzufügen: 
  1. Markdown-Datei in `content/posts/` erstellen
  2. Eintrag in `posts.json` hinzufügen
- Keine Code-Anpassungen nötig für neue Beiträge
- Klare Kommentare im Code

### NFR-002-005: Browser-Kompatibilität
- Chrome, Firefox, Safari, Edge (aktuelle Versionen)
- iOS Safari, Chrome Mobile
- Graceful Degradation bei älteren Browsern

---

## Technische Spezifikation

### Dateistruktur (Ergänzungen)

```
/
├── pages/
│   ├── blog.html               # NEU: Blog-Übersichtsseite
│   └── blog/
│       └── detail.html         # NEU: Beitrags-Detailseite (dynamisch)
├── assets/
│   ├── css/
│   │   └── blog.css            # NEU: Blog-spezifische Styles
│   ├── js/
│   │   ├── posts/
│   │   │   ├── posts.js        # NEU: Haupt-Logik für Listing & Detail
│   │   │   ├── sources.js      # NEU: Datenladen (posts.json, Markdown)
│   │   │   └── markdown.js     # NEU: Markdown-Parser
│   │   └── vendor/
│   │       └── marked.min.js   # NEU: Markdown-Library (lokal)
│   ├── img/
│   │   └── posts/              # NEU: Bilder für Beiträge
│   └── documents/
│       └── posts/              # NEU: PDF-Dateien für Beiträge
└── content/
    ├── posts.json              # NEU: Beitrags-Index
    └── posts/
        ├── 2026-01-06-beispiel-1.md    # NEU: Beispiel-Beiträge
        ├── 2026-01-08-beispiel-2.md
        └── 2026-01-10-beispiel-3.md
```

---

### JavaScript-Module

#### `assets/js/posts/sources.js`
**Verantwortung:** Laden von Daten (posts.json, Markdown-Dateien)

```javascript
// Export: loadPostsIndex(), loadPostContent(contentFile)
export async function loadPostsIndex() {
  // Lädt content/posts.json
  // Gibt Array von Post-Objekten zurück
  // Error-Handling bei Fehler
}

export async function loadPostContent(contentFile) {
  // Lädt content/posts/[contentFile]
  // Gibt Markdown-String zurück
}
```

---

#### `assets/js/posts/markdown.js`
**Verantwortung:** Markdown-zu-HTML-Konvertierung

```javascript
// Export: markdownToHtml(markdownString)
export function markdownToHtml(markdown) {
  // Nutzt marked.js oder eigene Implementierung
  // Gibt HTML-String zurück (sanitized)
}
```

---

#### `assets/js/posts/posts.js`
**Verantwortung:** Hauptlogik für Blog-Seiten

```javascript
import { loadPostsIndex, loadPostContent } from './sources.js';
import { markdownToHtml } from './markdown.js';

// Funktion: renderBlogOverview()
// Lädt posts.json, sortiert nach Datum, rendert Karten
export async function renderBlogOverview() {
  const posts = await loadPostsIndex();
  // Sortierung: absteigend nach date
  // DOM-Manipulation: Karten erstellen
  // Event-Listener für Klicks
}

// Funktion: renderBlogDetail(slug)
// Lädt spezifischen Beitrag, rendert Markdown
export async function renderBlogDetail(slug) {
  const posts = await loadPostsIndex();
  const post = posts.find(p => p.slug === slug);
  const content = await loadPostContent(post.contentFile);
  const html = markdownToHtml(content);
  // DOM-Manipulation: Titel, Datum, Tags, Content
}

// Init-Logik (wird von Seite aufgerufen)
export function init() {
  // Erkennt aktuelle Seite (overview vs. detail)
  // Ruft passende Render-Funktion auf
}
```

---

### HTML-Struktur

#### `pages/blog.html` (Übersicht)
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Transparentes Villach</title>
  <meta name="description" content="Beiträge zu Transparenz, Informationsfreiheit und Anfragen an die Stadt Villach">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/layout.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <link rel="stylesheet" href="../assets/css/blog.css">
</head>
<body>
  <header>
    <!-- Navigation aus Grundgerüst -->
  </header>
  
  <main>
    <section class="blog-overview">
      <h1>Beiträge</h1>
      <p class="intro">Aktuelle Informationen zu Transparenz und Informationsfreiheit in Villach</p>
      
      <div id="blog-grid" class="blog-grid">
        <!-- Karten werden hier dynamisch eingefügt -->
      </div>
      
      <div id="no-posts" class="hidden">
        <p>Noch keine Beiträge vorhanden.</p>
      </div>
    </section>
  </main>
  
  <footer>
    <!-- Footer aus Grundgerüst -->
  </footer>
  
  <script type="module">
    import { renderBlogOverview } from '../assets/js/posts/posts.js';
    renderBlogOverview();
  </script>
</body>
</html>
```

---

#### `pages/blog/detail.html` (Detail)
```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title id="post-title">Beitrag - Transparentes Villach</title>
  <meta name="description" id="post-description" content="">
  <link rel="stylesheet" href="../../assets/css/base.css">
  <link rel="stylesheet" href="../../assets/css/layout.css">
  <link rel="stylesheet" href="../../assets/css/components.css">
  <link rel="stylesheet" href="../../assets/css/blog.css">
</head>
<body>
  <header>
    <!-- Navigation -->
  </header>
  
  <main>
    <nav class="breadcrumb">
      <a href="../blog.html">← Zurück zur Übersicht</a>
    </nav>
    
    <article id="blog-post">
      <header class="post-header">
        <h1 id="title"></h1>
        <div class="post-meta">
          <time id="date"></time>
          <span id="read-time"></span>
        </div>
        <div id="tags" class="tags"></div>
        
        <!-- PDF-Downloads (wird nur angezeigt, wenn vorhanden) -->
        <div id="pdf-downloads" class="pdf-downloads hidden">
          <h3>Dokumente zum Download</h3>
          <ul id="pdf-list" class="pdf-list">
            <!-- PDFs werden hier dynamisch eingefügt -->
            <!-- Beispiel:
            <li>
              <a href="../../assets/documents/posts/file.pdf" download class="pdf-link">
                <svg class="icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                <span class="pdf-title">IFG-Anfrage (Original)</span>
                <span class="pdf-size">(245 KB)</span>
              </a>
            </li>
            -->
          </ul>
        </div>
      </header>
      
      <div id="content" class="post-content">
        <!-- Markdown-Content wird hier eingefügt -->
      </div>
    </article>
  </main>
  
  <footer>
    <!-- Footer -->
  </footer>
  
  <script type="module">
    import { renderBlogDetail } from '../../assets/js/posts/posts.js';
    
    // Slug aus URL-Parameter lesen
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('id');
    
    if (slug) {
      renderBlogDetail(slug);
    } else {
      // Fehlerbehandlung: Redirect zur Übersicht
      window.location.href = '../blog.html';
    }
  </script>
</body>
</html>
```

---

### CSS-Spezifikation (`assets/css/blog.css`)

```css
/* Blog-Übersicht Grid */
.blog-grid {
  display: grid;
  gap: var(--spacing-lg, 2rem);
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

/* Beitrags-Karte */
.blog-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md, 8px);
  padding: var(--spacing-md, 1.5rem);
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
}

.blog-card:hover,
.blog-card:focus {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.blog-card__title {
  color: var(--color-primary);
  margin-bottom: var(--spacing-sm);
}

.blog-card__date {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-sm);
}

.blog-card__excerpt {
  line-height: 1.6;
  color: var(--color-text);
}

.blog-card__tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
  margin-top: var(--spacing-sm);
}

/* Beitrags-Detail */
.post-header {
  margin-bottom: var(--spacing-xl, 3rem);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-lg);
}

.post-meta {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  color: var(--color-text-muted);
  margin: var(--spacing-sm) 0;
}

.post-content {
  max-width: 70ch;
  margin: 0 auto;
  line-height: 1.75;
}

.post-content h2 {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-content blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--color-text-muted);
}

.breadcrumb {
  margin-bottom: var(--spacing-lg);
}

.breadcrumb a {
  color: var(--color-primary);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

/* PDF-Downloads */
.pdf-downloads {
  margin-top: var(--spacing-lg);
  padding: var(--spacing-md);
  background: var(--color-surface-alt, #f8f9fa);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md, 8px);
}

.pdf-downloads h3 {
  margin: 0 0 var(--spacing-sm) 0;
  font-size: 1rem;
  color: var(--color-text);
}

.pdf-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs, 0.5rem);
}

.pdf-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs, 0.5rem);
  padding: var(--spacing-sm);
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm, 4px);
  text-decoration: none;
  color: var(--color-primary);
  transition: all 0.3s;
}

.pdf-link:hover {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.pdf-link .icon {
  flex-shrink: 0;
}

.pdf-link .pdf-title {
  flex: 1;
  font-weight: 600;
}

.pdf-link .pdf-size {
  font-size: 0.875rem;
  opacity: 0.7;
}

/* Responsive */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .post-content {
    max-width: 100%;
  }
}
```

---

## Beispiel-Content (Dummy-Beiträge)

### `content/posts.json`
```json
{
  "posts": [
    {
      "id": "2026-01-10-transparenz-budget",
      "title": "Budgettransparenz: Wo fließen unsere Steuergelder?",
      "slug": "transparenz-budget-2026",
      "date": "2026-01-10",
      "dateDisplay": "10. Jänner 2026",
      "excerpt": "Eine Analyse der Budgetveröffentlichungen der Stadt Villach und warum mehr Transparenz nötig ist...",
      "tags": ["Budget", "Transparenz", "Finanzen"],
      "readTime": 5,
      "contentFile": "2026-01-10-transparenz-budget.md"
    },
    {
      "id": "2026-01-08-ifg-antwort-stadtrat",
      "title": "Antwort der Stadt: Stadtratsprotokolle werden veröffentlicht",
      "slug": "ifg-antwort-stadtrat",
      "date": "2026-01-08",
      "dateDisplay": "8. Jänner 2026",
      "excerpt": "Update zur IFG-Anfrage vom 6. Jänner: Die Stadt Villach hat positiv auf unsere Anfrage reagiert...",
      "tags": ["IFG", "Stadtrat", "Erfolg"],
      "readTime": 3,
      "contentFile": "2026-01-08-ifg-antwort-stadtrat.md",
      "pdfFiles": [
        {
          "title": "Offizielle Antwort der Stadt Villach",
          "file": "2026-01-08-antwort-stadt.pdf",
          "size": "312 KB"
        }
      ]
    },
    {
      "id": "2026-01-06-ifg-anfrage-stadtrat",
      "title": "IFG-Anfrage: Protokolle der Stadtratssitzungen 2025",
      "slug": "ifg-anfrage-stadtrat",
      "date": "2026-01-06",
      "dateDisplay": "6. Jänner 2026",
      "excerpt": "Anfrage nach dem Informationsfreiheitsgesetz an die Stadt Villach bezüglich der Veröffentlichung aller Stadtratsprotokolle des Jahres 2025...",
      "tags": ["IFG", "Stadtrat", "Anfrage"],
      "readTime": 4,
      "contentFile": "2026-01-06-ifg-anfrage-stadtrat.md",
      "pdfFiles": [
        {
          "title": "IFG-Anfrage (Original)",
          "file": "2026-01-06-ifg-anfrage.pdf",
          "size": "245 KB"
        },
        {
          "title": "Zustellungsnachweis",
          "file": "2026-01-06-zustellung.pdf",
          "size": "128 KB"
        }
      ]
    }
  ]
}
```

**Hinweis:** Die Beiträge vom 6. und 8. Jänner haben optionale PDF-Dateien:
- **6. Jänner:** 2 PDFs (Anfrage + Zustellungsnachweis)
- **8. Jänner:** 1 PDF (Antwort der Stadt)
- **10. Jänner:** Kein PDF

---

### `content/posts/2026-01-06-ifg-anfrage-stadtrat.md`
```markdown
Am 6. Jänner 2026 habe ich eine Anfrage nach dem **Informationsfreiheitsgesetz (IFG)** an die Stadt Villach gestellt. Das Ziel: Zugang zu allen Protokollen der Stadtratssitzungen aus dem Jahr 2025.

## Warum diese Anfrage?

Transparenz ist ein Grundpfeiler der Demokratie. Bürgerinnen und Bürger haben das Recht zu erfahren, welche Entscheidungen in ihrem Namen getroffen werden. Leider sind die Protokolle der Stadtratssitzungen nicht öffentlich zugänglich.

## Was wurde angefragt?

- Alle Protokolle der Stadtratssitzungen 2025
- Anwesenheitslisten
- Abstimmungsergebnisse zu wichtigen Beschlüssen

## Rechtliche Grundlage

Nach § 4 IFG haben Bürger Anspruch auf Zugang zu Informationen bei Behörden, sofern keine Ausnahmetatbestände vorliegen.

> "Jeder hat das Recht auf Zugang zu Informationen bei öffentlichen Stellen." – § 4 IFG

## Nächste Schritte

Die Stadt Villach hat nun **acht Wochen Zeit**, um auf die Anfrage zu reagieren. Ich werde hier über den Fortschritt berichten.

---

**Dokumente:** Die vollständige Anfrage sowie der Zustellungsnachweis können als PDF heruntergeladen werden (siehe Dokumente-Sektion oben).

**Update:** Siehe Beitrag vom 8. Jänner 2026 für die Antwort der Stadt.
```

---

### `content/posts/2026-01-08-ifg-antwort-stadtrat.md`
```markdown
Erfreuliche Nachrichten! Die Stadt Villach hat bereits nach nur zwei Tagen auf meine IFG-Anfrage vom 6. Jänner reagiert.

## Die Antwort

Die Rechtsabteilung der Stadt teilte mit, dass:

1. Die Protokolle der Stadtratssitzungen 2025 **öffentlich gemacht werden**.
2. Diese ab sofort auf der Website der Stadt Villach verfügbar sind.
3. Zukünftig alle Protokolle innerhalb von zwei Wochen nach der Sitzung veröffentlicht werden.

## Was bedeutet das?

Ein kleiner, aber wichtiger Schritt für mehr Transparenz in Villach. Bürgerinnen und Bürger können nun nachvollziehen, welche Themen im Stadtrat besprochen wurden.

## Mein Fazit

Positiv: Die schnelle Reaktion zeigt, dass die Stadt kooperationsbereit ist.  
Verbesserungspotenzial: Eine proaktive Veröffentlichung (ohne Anfrage) wäre wünschenswert.

---

**Nächstes Thema:** Budget-Transparenz – dazu mehr in den kommenden Wochen.
```

---

### `content/posts/2026-01-10-transparenz-budget.md`
```markdown
Wo fließen eigentlich unsere Steuergelder? Diese Frage stellen sich viele Villacherinnen und Villacher. In diesem Beitrag analysiere ich die verfügbaren Budgetdaten der Stadt.

## Die aktuelle Situation

Die Stadt Villach veröffentlicht ein Jahresbudget, jedoch oft in sehr kompakter Form. Details zu einzelnen Ausgabenposten fehlen häufig.

## Beispiele für Intransparenz

- **Sachgütereinkauf:** Summe X Euro – aber welche Güter genau?
- **Förderungen an Vereine:** Wer erhält wie viel und nach welchen Kriterien?
- **Bauvorhaben:** Kostenentwicklung im Laufe des Projekts?

## Was können wir tun?

1. **IFG-Anfragen:** Gezielt nach Detailbudgets fragen
2. **Öffentlicher Druck:** Forderung nach offenen Daten (Open Data)
3. **Vergleich mit anderen Städten:** Best Practices aufzeigen

## Vorbilder

Städte wie Wien oder Graz veröffentlichen detailliertere Budgetdaten. Villach könnte hier nachziehen.

---

**Deine Meinung:** Was würdest du gerne über das Budget wissen? Schreib mir eine Nachricht!
```

---

## Testing & Abnahme

### Manuelle Tests

#### Test 1: Blog-Übersicht anzeigen
1. Öffne `pages/blog.html`
2. **Erwartung:** 3 Beiträge als Karten sichtbar
3. **Erwartung:** Neuester Beitrag (10.01.2026) steht oben
4. **Erwartung:** Jede Karte zeigt Titel, Datum, Excerpt, Tags

#### Test 2: Responsive Verhalten
1. Öffne `pages/blog.html`
2. Verkleiner Browser auf Handy-Größe (< 768px)
3. **Erwartung:** Karten stapeln sich (1 pro Zeile)
4. Vergrößere auf Desktop (> 1024px)
5. **Erwartung:** 3 Karten nebeneinander (je nach Bildschirmbreite)

#### Test 3: Navigation zu Detailseite
1. Klicke auf eine Beitrags-Karte
2. **Erwartung:** Navigation zu `pages/blog/detail.html?id=[slug]`
3. **Erwartung:** Detailseite zeigt vollständigen Beitrag

#### Test 4: Markdown-Rendering
1. Öffne Detailseite eines Beitrags
2. **Erwartung:** Überschriften, Fett, Listen, Blockquotes sind korrekt gerendert
3. **Erwartung:** Kein Raw-Markdown sichtbar

#### Test 5: Zurück zur Übersicht
1. Auf Detailseite: Klick "Zurück zur Übersicht"
2. **Erwartung:** Navigation zu `pages/blog.html`
3. Browser-Back-Button testen
4. **Erwartung:** Funktioniert ebenfalls

#### Test 6: PDF-Downloads (falls vorhanden)
1. Öffne Detailseite eines Beitrags mit mehreren PDFs (IFG-Anfrage vom 6.1.)
2. **Erwartung:** "Dokumente zum Download" Sektion ist sichtbar
3. **Erwartung:** 2 PDFs sind aufgelistet (Anfrage + Zustellungsnachweis)
4. Klicke auf einen PDF-Link
5. **Erwartung:** PDF-Datei wird heruntergeladen
6. Öffne Detailseite mit 1 PDF (Antwort vom 8.1.)
7. **Erwartung:** 1 PDF in der Liste
8. Öffne Detailseite ohne PDF (Budget-Beitrag vom 10.1.)
9. **Erwartung:** Keine Download-Sektion sichtbar

#### Test 7: Dark Mode (falls implementiert)
1. Aktiviere Dark Mode
2. Öffne Blog-Übersicht und Detail
3. **Erwartung:** Farben passen, Kontrast ausreichend

### Performance-Tests
- Lighthouse: Performance-Score > 80
- Ladezeit < 2 Sekunden (Netzwerk-Throttling: Fast 3G)

### Accessibility-Tests
- Lighthouse: Accessibility-Score > 90
- Screen-Reader-Test (NVDA/JAWS)
- Tastatur-Navigation: Tab durch Karten, Enter zum Öffnen

---

## Deployment

### Schritte
1. **Code-Review:** Pull Request prüfen
2. **Tests:** Alle manuellen Tests bestanden
3. **Merge:** Feature-Branch → main
4. **Upload zu Hosttech.at:**
   - FTP/SFTP: Alle neuen Dateien hochladen
   - Pfade: `/pages/blog.html`, `/assets/js/posts/*`, `/content/*`
5. **Smoke-Test:** Live-Seite öffnen, Übersicht & Detail testen

---

## Offene Punkte & Zukünftige Sprints

### Out of Scope für Sprint 2
- Suchfunktion (Filter nach Tags)
- Pagination (falls > 20 Beiträge)
- Kommentarfunktion
- RSS-Feed
- Social-Media-Sharing
- Admin-Interface zum Hochladen (noch manuell via FTP)

### Technische Schulden
- Automatisierung: Script zum Generieren von `posts.json` aus Markdown-Frontmatter
- SQLite im Browser (für später, falls viele Beiträge)
- Bilder-Optimierung (WebP, Lazy Loading)

---

## Anhang

### Glossar
- **Slug:** URL-freundliche Version des Titels (z.B. "ifg-anfrage-stadtrat")
- **Excerpt:** Kurzzusammenfassung eines Beitrags
- **Frontmatter:** Metadaten am Anfang einer Markdown-Datei (YAML-Format)
- **IFG:** Informationsfreiheitsgesetz (österreichisches Recht)

### Referenzen
- Copilot Instructions: `.github/copilot-instructions.md`
- Feature 0001: `requirements/feature-0001-grundgeruest-website.md`
- Anforderungen: `Anforderung.md`
- Markdown-Spec: [CommonMark](https://commonmark.org/)
- WCAG 2.1: [W3C Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Änderungshistorie

| Version | Datum      | Autor              | Änderung                     |
|---------|------------|--------------------|------------------------------|
| 1.0     | 06.01.2026 | Gernot Oberrauner  | Initiale Version erstellt    |

---

**Ende Feature-Dokument FEAT-0002**
