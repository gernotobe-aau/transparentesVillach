# Blog-System - Dokumentation

## Überblick

Das Blog-System für "Transparentes Villach" ermöglicht das einfache Hinzufügen und Anzeigen von Beiträgen zu Transparenz, Informationsfreiheitsgesetz und Anfragen an die Stadt Villach.

## Funktionen

- ✅ **Blog-Übersichtsseite** mit Grid-Layout
- ✅ **Beitrags-Detailseiten** mit Markdown-Rendering
- ✅ **PDF-Downloads** pro Beitrag (optional, mehrere möglich)
- ✅ **Tag-System** zur Kategorisierung
- ✅ **Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **Sortierung** nach Datum (neueste zuerst)
- ✅ **Accessibility** (WCAG 2.1 Level AA)

## Dateistruktur

```
/
├── pages/
│   ├── blog.html                   # Blog-Übersichtsseite
│   └── blog/
│       └── detail.html             # Beitrags-Detailseite
├── assets/
│   ├── css/
│   │   └── blog.css                # Blog-spezifische Styles
│   ├── js/
│   │   ├── posts/
│   │   │   ├── posts.js            # Hauptlogik
│   │   │   ├── sources.js          # Datenladen
│   │   │   └── markdown.js         # Markdown-Parser
│   │   └── vendor/
│   │       └── marked.min.js       # Markdown-Library
│   └── documents/
│       └── posts/                  # PDF-Dateien
├── content/
│   ├── posts.json                  # Beitrags-Index
│   └── posts/                      # Markdown-Dateien
```

## Neuen Beitrag hinzufügen

### Schritt 1: Markdown-Datei erstellen

Erstelle eine neue Datei unter `content/posts/` mit folgendem Namensschema:

```
YYYY-MM-DD-kurzer-titel.md
```

Beispiel: `2026-01-15-neue-ifg-anfrage.md`

**Inhalt:**

```markdown
# Titel des Beitrags

Einleitungstext...

## Überschrift

Weiterer Text...

- Liste
- Punkt 2

**Fett** und *kursiv*

[Link](https://example.com)
```

### Schritt 2: Eintrag in posts.json hinzufügen

Öffne `content/posts.json` und füge einen neuen Eintrag hinzu:

```json
{
  "posts": [
    {
      "id": "2026-01-15-neue-ifg-anfrage",
      "title": "Neue IFG-Anfrage: Thema XY",
      "slug": "neue-ifg-anfrage-thema-xy",
      "date": "2026-01-15",
      "excerpt": "Kurzbeschreibung des Beitrags (max. 200 Zeichen).",
      "tags": ["IFG", "Anfrage", "Transparenz"],
      "contentFile": "2026-01-15-neue-ifg-anfrage.md",
      "readingTime": "3 Min.",
      "pdfFiles": [
        {
          "title": "IFG-Anfrage",
          "file": "2026-01-15-ifg-anfrage.pdf",
          "size": "200 KB"
        }
      ]
    }
    // ... weitere Beiträge
  ]
}
```

**Hinweis:** `pdfFiles` ist optional. Wenn keine PDFs vorhanden sind, einfach weglassen.

### Schritt 3: PDFs hinzufügen (optional)

Falls der Beitrag PDFs enthält, lege diese unter `assets/documents/posts/` ab.

Dateinamen-Schema: `YYYY-MM-DD-beschreibung.pdf`

### Schritt 4: Sortierung

Die Beiträge werden automatisch nach `date` sortiert (neueste zuerst). Achte darauf, dass das Datum im ISO-Format (`YYYY-MM-DD`) vorliegt.

## Markdown-Syntax

Das System unterstützt folgende Markdown-Elemente:

- **Überschriften:** `# H1`, `## H2`, `### H3`, etc.
- **Fett:** `**Text**`
- **Kursiv:** `*Text*`
- **Links:** `[Linktext](URL)`
- **Listen:** `- Punkt` oder `1. Nummeriert`
- **Zitate:** `> Zitat`
- **Code:** `` `code` `` (inline) oder ` ```code block``` `
- **Horizontale Linie:** `---`
- **Tabellen:** GitHub Flavored Markdown (GFM)

## Datenmodell

### Post-Objekt (posts.json)

```typescript
{
  id: string;           // Eindeutige ID (z.B. "2026-01-06-ifg-anfrage")
  title: string;        // Titel des Beitrags
  slug: string;         // URL-sicherer Slug
  date: string;         // ISO-Datum (YYYY-MM-DD)
  excerpt: string;      // Kurzbeschreibung (max. 200 Zeichen)
  tags: string[];       // Array von Tags
  contentFile: string;  // Name der Markdown-Datei
  readingTime?: string; // Optional: Geschätzte Lesezeit
  pdfFiles?: {          // Optional: Array von PDFs
    title: string;
    file: string;
    size?: string;
  }[];
}
```

## URLs

- **Übersicht:** `/pages/blog.html`
- **Detail:** `/pages/blog/detail.html?slug=SLUG`

Beispiel: `/pages/blog/detail.html?slug=ifg-anfrage-stadtrat-2025`

## Performance

- **Lazy Loading:** Bilder werden lazy geladen (falls vorhanden)
- **JavaScript:** ES Modules für optimale Performance
- **CSS:** Minimale Styles, keine externen Dependencies
- **Markdown:** Lokal gehostete marked.js Library

## Browser-Kompatibilität

- Chrome, Firefox, Safari, Edge (aktuelle Versionen)
- iOS Safari, Chrome Mobile
- ES6 Module-Support erforderlich

## Accessibility

- Semantisches HTML (`<article>`, `<time>`, `<nav>`)
- Tastatur-Navigation funktioniert
- Screen-Reader-kompatibel
- Kontrast-Verhältnis > 4.5:1
- Focus-States sichtbar

## Beispiel-Beiträge

Das System enthält 3 Beispiel-Beiträge:

1. **06.01.2026:** IFG-Anfrage Stadtratsprotokolle (mit 2 PDFs)
2. **08.01.2026:** IFG-Antwort Stadt Villach (mit 1 PDF)
3. **10.01.2026:** Budgetverteilung öffentliche Projekte (ohne PDFs)

## Wartung

### Beitrag bearbeiten

1. Öffne die entsprechende Markdown-Datei unter `content/posts/`
2. Bearbeite den Inhalt
3. Speichern - Änderungen sind sofort sichtbar

### Beitrag löschen

1. Entferne den Eintrag aus `content/posts.json`
2. Lösche die Markdown-Datei aus `content/posts/`
3. Lösche zugehörige PDFs aus `assets/documents/posts/`

## Troubleshooting

### Beiträge werden nicht angezeigt

- Überprüfe die Browser-Konsole auf Fehler
- Stelle sicher, dass `posts.json` valides JSON ist
- Prüfe, ob die Pfade zu den Markdown-Dateien korrekt sind

### Markdown wird nicht gerendert

- Stelle sicher, dass `marked.min.js` korrekt geladen wird
- Prüfe die Browser-Konsole auf JavaScript-Fehler
- Validiere die Markdown-Syntax

### PDFs können nicht heruntergeladen werden

- Überprüfe, ob die PDF-Dateien unter `assets/documents/posts/` liegen
- Stelle sicher, dass die Dateinamen in `posts.json` korrekt sind
- Prüfe die Dateiberechtigungen

## Zukünftige Erweiterungen

Geplante Features für zukünftige Sprints:

- **Suche:** Volltextsuche in Beiträgen
- **Filterung:** Nach Tags filtern
- **Pagination:** Bei > 20 Beiträgen
- **RSS-Feed:** Automatische Feed-Generierung
- **SQLite im Browser:** Alternative Datenquelle (WASM)

## Support

Bei Fragen oder Problemen: kontakt@transparentesvillach.at
