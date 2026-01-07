# Feature 0003: Kontaktformular / Messagebox

**Feature-ID:** FEAT-0003  
**Erstellt am:** 07.01.2026  
**Sprint:** 3  
**Priorität:** Hoch  
**Status:** Ready for Development  
**Abhängigkeiten:** FEAT-0001 (Grundgerüst)

---

## Überblick

Als wichtige Kommunikationsmöglichkeit soll ein Kontaktformular ("Messagebox") implementiert werden, über das Besucher direkt Nachrichten an den Betreiber (Gernot Oberrauner) senden können. Da es sich um eine statische Website ohne Backend handelt, erfolgt der Versand via einem E-Mail-Provider-Service (z.B. Formspree, Web3Forms oder ähnlich), der DSGVO-konform ist.

---

## Geschäftswert

- **Bürgerbeteiligung:** Ermöglicht direkten Dialog mit Bürgern über Transparenzthemen
- **Rechtssicherheit:** Datenschutzkonforme Implementierung gemäß DSGVO
- **Niederschwelliger Zugang:** Einfache Kontaktaufnahme ohne E-Mail-Client
- **Spam-Schutz:** Implementierung von Captcha/Bot-Schutz
- **Mobile-Friendly:** Nutzbar auf allen Geräten

---

## Stakeholder

- **Betreiber:** Gernot Oberrauner (Empfänger der Nachrichten)
- **Zielgruppe:** Bürger der Stadt Villach und Umland (Absender)
- **E-Mail-Empfänger:** kontakt@transparentesVillach.at
- **Hosting-Provider:** Hosttech.at
- **Rechtliche Compliance:** DSGVO, Datenschutz-Grundverordnung (Art. 6, Art. 13)

---

## Technische Rahmenbedingungen

### Constraint 1: Statische Website (kein Backend)
- **Problem:** Kein eigener Server für E-Mail-Versand
- **Lösung:** Nutzung eines DSGVO-konformen E-Mail-Service-Providers
  - **Option A (empfohlen):** Web3Forms (kostenlos, DSGVO-konform, EU-Server)
  - **Option B:** Formspree (kostenlos mit Limitierung, DSGVO-konform)
  - **Option C:** EmailJS (kostenlos mit Limitierung)
- **Entscheidung:** Entwickler wählt Web3Forms als primäre Lösung, da EU-basiert und kostenlos

### Constraint 2: Datenschutz
- Keine Speicherung von Nutzerdaten auf dem Server
- Verschlüsselte Übertragung (HTTPS)
- Transparente Information über Datenverarbeitung
- Einwilligungserklärung erforderlich

### Constraint 3: Spam-Schutz
- Honeypot-Technik (verstecktes Feld für Bots)
- Optional: reCAPTCHA v3 (unsichtbar, Google-hosted) oder hCaptcha (Datenschutz-freundlicher)
- Rate-Limiting durch Service-Provider

---

## Funktionale Anforderungen

### FR-003-001: Kontaktformular-Seite

**Als** Besucher der Website  
**möchte ich** eine dedizierte Kontaktseite aufrufen können  
**damit ich** Fragen, Hinweise oder Anliegen an den Betreiber senden kann.

**Akzeptanzkriterien:**
- **AC-001:** Seite ist über die Hauptnavigation erreichbar (Link "Kontakt")
- **AC-002:** URL-Pfad: `/pages/kontakt.html` oder `/kontakt.html`
- **AC-003:** Seite enthält eine kurze Einleitung:
  - Zweck des Formulars (Kontaktaufnahme, Fragen, Hinweise)
  - Hinweis auf Datenschutz und Verarbeitung der Daten
  - Alternativ: E-Mail-Adresse sichtbar für direkte Kontaktaufnahme
- **AC-004:** Responsive Layout (Mobile-First)
- **AC-005:** Konsistentes Design mit restlicher Website (Farbschema, Typografie)

**Technische Details:**
- HTML-Datei: `pages/kontakt.html`
- CSS: Nutzung von `components.css` (Form-Styling) und `layout.css`
- JS: `assets/js/contact.js` für Formularvalidierung und Absende-Logik

---

### FR-003-002: Formularfelder

**Als** Besucher  
**möchte ich** meine Kontaktdaten und meine Nachricht in ein Formular eingeben  
**damit ich** eine strukturierte Nachricht an den Betreiber senden kann.

**Akzeptanzkriterien:**
- **AC-001:** Formular enthält folgende Pflichtfelder:
  - **Name** (Textfeld, max. 100 Zeichen)
    - Label: "Ihr Name *"
    - Placeholder: "Max Mustermann"
    - Required: Ja
  - **E-Mail** (E-Mail-Feld)
    - Label: "Ihre E-Mail-Adresse *"
    - Placeholder: "beispiel@email.at"
    - Required: Ja
    - Validierung: Gültiges E-Mail-Format
  - **Nachricht** (Textarea, max. 2000 Zeichen)
    - Label: "Ihre Nachricht *"
    - Placeholder: "Teilen Sie uns Ihr Anliegen mit..."
    - Rows: 8
    - Required: Ja

- **AC-002:** Formular enthält optionale Felder:
  - **Betreff** (Textfeld, max. 150 Zeichen)
    - Label: "Betreff"
    - Placeholder: "z.B. IFG-Anfrage, Frage zum Blog, ..."
    - Required: Nein

- **AC-003:** Datenschutz-Checkbox (Pflichtfeld):
  - Label: "Ich stimme der Verarbeitung meiner Daten gemäß der [Datenschutzerklärung](/pages/legal/datenschutz.html) zu. *"
  - Required: Ja
  - Link zur Datenschutzseite öffnet in neuem Tab

- **AC-004:** Spam-Schutz (Honeypot):
  - Verstecktes Feld (CSS: `display: none`): `input name="_gotcha"` oder ähnlich
  - Wird von echten Nutzern nicht ausgefüllt, von Bots schon
  - Name: `website` oder `url` (täuscht Bot)

- **AC-005:** Zeichenzähler bei Nachricht (optional, aber empfohlen):
  - Anzeige unter Textarea: "X / 2000 Zeichen"
  - Live-Update während Eingabe

**Technische Details:**
- HTML: `<form>` mit `method="POST"` und `action` zu E-Mail-Service
- Attribute: `novalidate` auf Form (für Custom Validation), `aria-required` auf Pflichtfeldern
- Autocomplete: `name`, `email` für bessere UX

---

### FR-003-003: Client-seitige Validierung

**Als** Besucher  
**möchte ich** sofortiges Feedback bei Eingabefehlern erhalten  
**damit ich** das Formular korrekt ausfüllen kann, bevor ich es absende.

**Akzeptanzkriterien:**
- **AC-001:** Validierung beim Verlassen eines Feldes (onBlur):
  - Name: Nicht leer, min. 2 Zeichen
  - E-Mail: Gültiges Format (Regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`)
  - Nachricht: Nicht leer, min. 10 Zeichen, max. 2000 Zeichen
  - Datenschutz-Checkbox: Muss aktiviert sein

- **AC-002:** Fehlermeldungen werden unter dem jeweiligen Feld angezeigt:
  - Rote Farbe (konsistent mit Theme)
  - Icon (optional): Warnsymbol
  - Beispiele:
    - "Bitte geben Sie Ihren Namen ein (min. 2 Zeichen)."
    - "Bitte geben Sie eine gültige E-Mail-Adresse ein."
    - "Die Nachricht muss zwischen 10 und 2000 Zeichen lang sein."
    - "Sie müssen der Datenschutzerklärung zustimmen."

- **AC-003:** Fehlerhafte Felder werden visuell markiert:
  - Roter Rahmen um Eingabefeld (`border: 2px solid var(--color-error)`)
  - Icon im Feld (optional)

- **AC-004:** Erfolgreiche Validierung wird angezeigt:
  - Grüner Rahmen (optional, subtil)
  - Häkchen-Icon (optional)

- **AC-005:** Submit-Button ist deaktiviert, solange Formular ungültig ist:
  - Button: `disabled`-Attribut
  - Visuelle Darstellung: ausgegraut (`opacity: 0.6`)
  - Cursor: `not-allowed`

- **AC-006:** Validierung auch beim Absenden (onSubmit):
  - Falls noch Fehler vorhanden: Scrollt zum ersten fehlerhaften Feld
  - Focus auf erstes fehlerhaftes Feld

**Technische Details:**
- JavaScript: `assets/js/contact.js`
- Event Listener: `blur`, `input`, `submit`
- Funktion: `validateField(field)`, `validateForm()`
- Accessibility: `aria-invalid`, `aria-describedby` für Fehlermeldungen

---

### FR-003-004: E-Mail-Versand via Service-Provider

**Als** Betreiber  
**möchte ich** die über das Formular gesendeten Nachrichten per E-Mail erhalten  
**damit ich** zeitnah auf Anfragen reagieren kann.

**Akzeptanzkriterien:**
- **AC-001:** Formular sendet Daten an Web3Forms API:
  - Endpoint: `https://api.web3forms.com/submit`
  - Method: `POST`
  - Content-Type: `application/json`

- **AC-002:** API-Key wird konfiguriert:
  - Access Key von Web3Forms registrieren (kostenlos)
  - Key im Formular: `<input type="hidden" name="access_key" value="DEIN_ACCESS_KEY">`
  - **Wichtig:** Key ist öffentlich sichtbar (Frontend), aber geschützt durch Domain-Whitelist in Web3Forms

- **AC-003:** E-Mail-Empfänger:
  - Empfänger: `kontakt@transparentesVillach.at`
  - Konfiguriert in Web3Forms Dashboard

- **AC-004:** E-Mail enthält folgende Informationen:
  - Absender: Name und E-Mail (in E-Mail sichtbar)
  - Betreff: Falls ausgefüllt, sonst Standard: "Neue Nachricht von transparentesVillach.at"
  - Body: Nachricht des Users
  - Zusatzinfo: Datum/Uhrzeit (automatisch durch Web3Forms)

- **AC-005:** Erfolgreiche Übermittlung:
  - API gibt JSON-Response zurück: `{ "success": true }`
  - Frontend zeigt Erfolgsmeldung an (siehe FR-003-005)

- **AC-006:** Fehlerbehandlung:
  - Bei Fehler (Netzwerk, API-Fehler): Error-Response
  - Frontend zeigt Fehlermeldung an (siehe FR-003-006)

- **AC-007:** Spam-Schutz durch Web3Forms:
  - Honeypot-Feld wird automatisch erkannt (`_gotcha` oder `_honeypot`)
  - Rate-Limiting: Max. X Anfragen pro IP/Tag (konfigurierbar)

**Technische Details:**
- JavaScript: `fetch()` API für POST-Request
- Error Handling: `try-catch`, Status-Code-Prüfung
- Alternative: Falls Web3Forms nicht verfügbar, Fallback auf Formspree oder direkte `mailto:` (schlechte UX)

**Beispiel-Code (Referenz für Entwickler):**
```javascript
async function sendEmail(formData) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: 'DEIN_ACCESS_KEY',
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Neue Nachricht von transparentesVillach.at',
      message: formData.message,
      _honeypot: formData._gotcha // Spam-Schutz
    })
  });
  
  const result = await response.json();
  return result.success;
}
```

---

### FR-003-005: Erfolgsmeldung nach Absenden

**Als** Besucher  
**möchte ich** eine Bestätigung erhalten, dass meine Nachricht erfolgreich gesendet wurde  
**damit ich** weiß, dass meine Anfrage beim Betreiber angekommen ist.

**Akzeptanzkriterien:**
- **AC-001:** Nach erfolgreichem Absenden wird eine Erfolgsmeldung angezeigt:
  - **Variante A (empfohlen):** Inline-Meldung über dem Formular
    - Grüner Hintergrund (`background: var(--color-success-bg)`)
    - Icon: Häkchen
    - Text: "Vielen Dank für Ihre Nachricht! Wir werden uns so schnell wie möglich bei Ihnen melden."
    - Formular bleibt sichtbar, wird aber zurückgesetzt
  
  - **Variante B:** Formular wird ausgeblendet, nur Erfolgsmeldung sichtbar
    - Gleiche Gestaltung wie Variante A
    - Button "Neue Nachricht senden" zum Zurücksetzen

- **AC-002:** Erfolgsmeldung ist gut sichtbar:
  - Mindestens 3 Sekunden sichtbar (bei Variante A)
  - Bei Variante B: dauerhaft sichtbar, bis User neu lädt oder Button klickt

- **AC-003:** Formular wird zurückgesetzt (bei Variante A):
  - Alle Felder sind leer
  - Validierungsfeedback wird entfernt
  - Submit-Button wieder aktiviert

- **AC-004:** Accessibility:
  - Erfolgsmeldung hat `role="alert"` für Screen Reader
  - Focus wird auf Erfolgsmeldung gesetzt

**Technische Details:**
- JavaScript: Nach erfolgreichem API-Response
- CSS: `components.css` (`.alert-success`)
- HTML: Dynamisch eingefügtes `<div>` mit ARIA-Attributen

---

### FR-003-006: Fehlerbehandlung

**Als** Besucher  
**möchte ich** informiert werden, wenn das Absenden der Nachricht fehlschlägt  
**damit ich** weiß, dass ich es erneut versuchen oder alternative Kontaktmöglichkeiten nutzen muss.

**Akzeptanzkriterien:**
- **AC-001:** Bei Fehler wird eine Fehlermeldung angezeigt:
  - Roter Hintergrund (`background: var(--color-error-bg)`)
  - Icon: Warnsymbol
  - Text: "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt unter kontakt@transparentesVillach.at."

- **AC-002:** Fehlermeldung erscheint über dem Formular (Inline)

- **AC-003:** Formular bleibt ausgefüllt (Daten gehen nicht verloren)

- **AC-004:** Mögliche Fehlerquellen:
  - Netzwerkfehler (keine Internetverbindung)
  - API-Fehler (Web3Forms nicht erreichbar)
  - Spam-Erkennung durch Honeypot
  - Rate-Limiting überschritten

- **AC-005:** Technische Fehlerdetails werden NICHT angezeigt (nur in Console für Debugging)

- **AC-006:** Accessibility:
  - Fehlermeldung hat `role="alert"`
  - Focus bleibt auf Submit-Button oder wird auf Fehlermeldung gesetzt

**Technische Details:**
- JavaScript: `catch`-Block, Status-Code-Prüfung
- CSS: `components.css` (`.alert-error`)
- Console-Logging für Entwickler/Debugging

---

### FR-003-007: Alternative Kontaktmöglichkeit

**Als** Besucher  
**möchte ich** die E-Mail-Adresse des Betreibers auch direkt sehen  
**damit ich** bei Formular-Problemen oder bevorzugter E-Mail-Nutzung direkt Kontakt aufnehmen kann.

**Akzeptanzkriterien:**
- **AC-001:** E-Mail-Adresse wird auf der Kontaktseite angezeigt:
  - Unter oder neben dem Formular
  - Text: "Alternativ können Sie uns auch direkt per E-Mail erreichen:"
  - E-Mail: `kontakt@transparentesVillach.at` als klickbarer Link (`mailto:`)

- **AC-002:** E-Mail-Link öffnet Standard-Mail-Client:
  - `href="mailto:kontakt@transparentesVillach.at"`
  - Optional: Betreff vorausfüllen (`?subject=Anfrage über transparentesVillach.at`)

- **AC-003:** E-Mail ist vor Spam-Bots geschützt (optional):
  - **Methode A:** Obfuscation via JavaScript (z.B. Split + Join)
  - **Methode B:** E-Mail als Bild (schlechte Accessibility)
  - **Methode C:** Keine Obfuscation (akzeptabel bei modernem Spam-Filter)

**Technische Details:**
- HTML: Einfacher `<a href="mailto:...">` Link
- CSS: Styling konsistent mit restlicher Website
- Optional: JavaScript für E-Mail-Obfuscation

---

## Nicht-funktionale Anforderungen

### NFR-003-001: Performance
- **Anforderung:** Kontaktseite lädt in < 2 Sekunden (inkl. Formular)
- **Metrik:** Lighthouse Performance Score > 90
- **Maßnahmen:**
  - Minimales CSS/JS (nur was nötig)
  - Kein schweres CAPTCHA (Honeypot bevorzugt)

### NFR-003-002: Accessibility (WCAG 2.1 Level AA)
- **Anforderungen:**
  - Alle Formularfelder haben `<label>` mit `for`-Attribut
  - Fehlermeldungen via `aria-describedby` verknüpft
  - Tastaturnavigation vollständig möglich (Tab, Enter)
  - Screen Reader: Fehlermeldungen werden vorgelesen (`role="alert"`)
  - Farbkontrast: Min. 4.5:1 (Text zu Hintergrund)
  - Focus-Styles sind gut sichtbar

### NFR-003-003: Datenschutz (DSGVO)
- **Anforderungen:**
  - Keine Cookies werden gesetzt (außer technisch notwendig)
  - Daten werden nur an Web3Forms übertragen (DSGVO-konform)
  - IP-Adresse wird NICHT gespeichert (durch Web3Forms konfigurierbar)
  - Einwilligungserklärung muss aktiv gesetzt werden (Opt-In, kein Pre-Check)
  - Datenschutzseite muss aktualisiert werden (siehe FR-003-008)

### NFR-003-004: Sicherheit
- **Anforderungen:**
  - HTTPS (bereits durch Hosttech.at gegeben)
  - XSS-Schutz: Keine direkte HTML-Injection in Erfolgsmeldungen
  - CSRF-Schutz: Nicht nötig (stateless API)
  - Honeypot gegen Spam-Bots
  - Rate-Limiting durch Web3Forms

### NFR-003-005: Browser-Kompatibilität
- **Anforderungen:**
  - Moderne Browser: Chrome, Firefox, Safari, Edge (jeweils letzte 2 Versionen)
  - Mobile Browser: iOS Safari, Chrome Mobile
  - JavaScript erforderlich (Formular funktioniert NICHT ohne JS)
  - Graceful Degradation: Hinweis bei deaktiviertem JS

### NFR-003-006: Responsive Design
- **Breakpoints:**
  - Mobile: < 768px (Single-Column-Layout)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Anforderungen:**
  - Formularfelder sind groß genug für Touch (min. 44x44px)
  - Text ist lesbar ohne Zoom
  - Buttons sind gut erreichbar

---

## User Stories

### Epic: Kontaktformular-Implementation

---

#### US-003-001: Kontaktseite erstellen
**Als** Entwickler  
**möchte ich** eine neue HTML-Seite für das Kontaktformular erstellen  
**damit** die Basis für das Formular vorhanden ist.

**Akzeptanzkriterien:**
- Datei: `pages/kontakt.html`
- Header und Footer sind identisch mit anderen Seiten (konsistente Navigation)
- Seite ist über Hauptnavigation erreichbar (Link "Kontakt" in `index.html`, `blog.html`, etc.)
- SEO-Meta-Tags: Titel, Description
- Responsive Layout

**Technische Tasks:**
- [ ] `pages/kontakt.html` erstellen
- [ ] Header/Footer aus `index.html` übernehmen (oder Template nutzen)
- [ ] Hauptnavigation um "Kontakt"-Link erweitern
- [ ] Inhaltsbereich vorbereiten (Hero-Section, Formular-Container)

**Definition of Done:**
- Seite ist im Browser aufrufbar unter `/pages/kontakt.html`
- Navigation funktioniert (Klick auf "Kontakt" führt zur Seite)
- Lighthouse Accessibility Score > 90

---

#### US-003-002: Formular-HTML-Struktur aufbauen
**Als** Entwickler  
**möchte ich** die HTML-Struktur des Formulars erstellen  
**damit** alle benötigten Felder vorhanden sind.

**Akzeptanzkriterien:**
- Formular enthält alle Pflichtfelder (Name, E-Mail, Nachricht, Datenschutz-Checkbox)
- Optional: Betreff-Feld
- Honeypot-Feld ist vorhanden (versteckt)
- Hidden Field für Web3Forms Access Key
- Submit-Button
- Alle Labels sind korrekt verknüpft (`for`-Attribut)

**Technische Tasks:**
- [ ] `<form>`-Element mit `id="contactForm"` erstellen
- [ ] Input-Felder für Name, E-Mail, Betreff
- [ ] Textarea für Nachricht
- [ ] Checkbox für Datenschutz (mit Link zur Datenschutzseite)
- [ ] Honeypot-Feld (`<input type="text" name="_gotcha" style="display:none">`)
- [ ] Hidden Field: `<input type="hidden" name="access_key" value="PLACEHOLDER">`
- [ ] Submit-Button: `<button type="submit">Nachricht senden</button>`

**Definition of Done:**
- Formular ist im Browser sichtbar
- Alle Felder haben `name`-Attribute (für Datenübertragung)
- HTML-Validierung: Keine Fehler (W3C Validator)

---

#### US-003-003: Formular-Styling
**Als** Entwickler  
**möchte ich** das Formular visuell ansprechend gestalten  
**damit** es konsistent mit dem restlichen Design ist.

**Akzeptanzkriterien:**
- Formular nutzt Farbschema der Website (Gelb/Gold als Akzent)
- Felder haben ausreichend Padding, klare Rahmen
- Submit-Button ist prominent (Call-to-Action)
- Fehler- und Erfolgsmeldungen haben eigene Styles (Rot/Grün)
- Responsive: Formular passt sich an Mobile-Größe an

**Technische Tasks:**
- [ ] CSS in `assets/css/components.css` ergänzen:
  - `.form-group` (Container für Label + Input)
  - `.form-input`, `.form-textarea`, `.form-checkbox`
  - `.form-button` (Submit-Button)
  - `.form-error` (Fehlermeldung unter Feld)
  - `.alert-success`, `.alert-error` (Erfolgsmeldung / Fehlermeldung)
- [ ] Mobile-Breakpoints testen

**Definition of Done:**
- Formular sieht auf Desktop und Mobile gut aus
- Buttons sind gut klickbar/touchbar (min. 44px Höhe)
- Farbkontraste erfüllen WCAG AA (4.5:1)

---

#### US-003-004: Client-seitige Validierung implementieren
**Als** Entwickler  
**möchte ich** JavaScript-Validierung für das Formular implementieren  
**damit** Nutzer sofortiges Feedback bei Fehlern erhalten.

**Akzeptanzkriterien:**
- Validierung bei Blur (Verlassen eines Feldes)
- Validierung bei Submit
- Fehlermeldungen werden unter den Feldern angezeigt
- Submit-Button ist deaktiviert, solange Formular ungültig ist
- Screen Reader: Fehler werden vorgelesen

**Technische Tasks:**
- [ ] Datei `assets/js/contact.js` erstellen
- [ ] Funktionen implementieren:
  - `validateName(value)` → Boolean
  - `validateEmail(value)` → Boolean (Regex)
  - `validateMessage(value)` → Boolean
  - `validateConsent(checked)` → Boolean
  - `showError(field, message)` → Void
  - `hideError(field)` → Void
  - `validateForm()` → Boolean
- [ ] Event Listener:
  - `blur` auf allen Input-Feldern
  - `input` auf Nachricht (Zeichenzähler)
  - `submit` auf Formular
- [ ] Submit-Button deaktivieren/aktivieren basierend auf Validierung
- [ ] ARIA-Attribute setzen (`aria-invalid`, `aria-describedby`)

**Definition of Done:**
- Validierung funktioniert bei jedem Feld
- Fehlermeldungen sind klar und verständlich
- Submit ist nur möglich, wenn alle Felder valide sind
- Screen Reader liest Fehler vor

---

#### US-003-005: Web3Forms Integration
**Als** Entwickler  
**möchte ich** das Formular mit Web3Forms verbinden  
**damit** Nachrichten per E-Mail an den Betreiber gesendet werden.

**Akzeptanzkriterien:**
- Web3Forms Account ist eingerichtet
- Access Key ist im Formular hinterlegt
- Formular sendet Daten via Fetch API an Web3Forms
- Erfolgreiche Übermittlung wird erkannt (JSON-Response)
- Fehler werden abgefangen

**Technische Tasks:**
- [ ] Web3Forms Account erstellen (https://web3forms.com/)
- [ ] Access Key generieren
- [ ] Access Key im Hidden Field eintragen (`pages/kontakt.html`)
- [ ] In `assets/js/contact.js`:
  - Funktion `sendEmail(formData)` implementieren
  - Fetch POST Request zu `https://api.web3forms.com/submit`
  - Body: JSON mit allen Formularfeldern
  - Error Handling (try-catch)
- [ ] Response-Handling:
  - Bei `success: true` → Erfolgsmeldung
  - Bei Fehler → Fehlermeldung

**Definition of Done:**
- Formular sendet erfolgreich E-Mail
- E-Mail kommt bei `kontakt@transparentesVillach.at` an
- Fehler werden korrekt behandelt

---

#### US-003-006: Erfolgsmeldung anzeigen
**Als** Entwickler  
**möchte ich** eine Erfolgsmeldung nach dem Absenden anzeigen  
**damit** Nutzer wissen, dass ihre Nachricht gesendet wurde.

**Akzeptanzkriterien:**
- Erfolgsmeldung erscheint über dem Formular (Inline)
- Grüner Hintergrund, Häkchen-Icon (optional)
- Text: "Vielen Dank für Ihre Nachricht! ..."
- Formular wird zurückgesetzt
- Meldung hat `role="alert"` für Screen Reader

**Technische Tasks:**
- [ ] In `assets/js/contact.js`:
  - Funktion `showSuccessMessage()` implementieren
  - DOM-Manipulation: `<div class="alert-success">` erstellen und einfügen
  - Formular zurücksetzen (`form.reset()`)
  - Focus auf Erfolgsmeldung setzen
- [ ] CSS für `.alert-success` in `components.css`

**Definition of Done:**
- Erfolgsmeldung wird nach erfolgreichem Absenden angezeigt
- Formular ist leer nach Absenden
- Screen Reader liest Meldung vor

---

#### US-003-007: Fehlerbehandlung implementieren
**Als** Entwickler  
**möchte ich** Fehler beim Absenden abfangen und anzeigen  
**damit** Nutzer informiert werden, wenn etwas schiefgeht.

**Akzeptanzkriterien:**
- Fehlermeldung erscheint über dem Formular (Inline)
- Roter Hintergrund, Warnsymbol (optional)
- Text: "Es ist ein Fehler aufgetreten. ..."
- Alternative Kontaktmöglichkeit (E-Mail) wird angezeigt
- Meldung hat `role="alert"`

**Technische Tasks:**
- [ ] In `assets/js/contact.js`:
  - Funktion `showErrorMessage()` implementieren
  - DOM-Manipulation: `<div class="alert-error">` erstellen und einfügen
  - Formular bleibt ausgefüllt (Daten nicht verlieren)
- [ ] CSS für `.alert-error` in `components.css`
- [ ] Error Handling in `sendEmail()`:
  - Netzwerkfehler
  - API-Fehler (Status-Code prüfen)
  - Timeout (optional)

**Definition of Done:**
- Fehlermeldung wird bei Fehler angezeigt
- Formular bleibt ausgefüllt
- Screen Reader liest Fehler vor

---

#### US-003-008: Alternative Kontaktmöglichkeit anzeigen
**Als** Entwickler  
**möchte ich** die E-Mail-Adresse auf der Kontaktseite anzeigen  
**damit** Nutzer auch ohne Formular Kontakt aufnehmen können.

**Akzeptanzkriterien:**
- E-Mail-Adresse ist unter/neben dem Formular sichtbar
- E-Mail ist als `mailto:`-Link klickbar
- Text: "Alternativ können Sie uns auch direkt per E-Mail erreichen:"

**Technische Tasks:**
- [ ] In `pages/kontakt.html`:
  - Sektion unter Formular hinzufügen
  - Text + E-Mail-Link: `<a href="mailto:kontakt@transparentesVillach.at">kontakt@transparentesVillach.at</a>`
- [ ] CSS-Styling (dezente Formatierung)

**Definition of Done:**
- E-Mail-Adresse ist sichtbar
- Klick auf Link öffnet E-Mail-Client

---

#### US-003-009: Datenschutzseite aktualisieren
**Als** Entwickler  
**möchte ich** die Datenschutzseite um Informationen zum Kontaktformular ergänzen  
**damit** rechtliche Anforderungen (DSGVO) erfüllt sind.

**Akzeptanzkriterien:**
- Abschnitt "Kontaktformular" in `pages/legal/datenschutz.html`
- Informationen zu:
  - Welche Daten werden erhoben (Name, E-Mail, Nachricht, optional Betreff)
  - Zweck der Verarbeitung (Kontaktanfrage bearbeiten)
  - Rechtsgrundlage (Art. 6 Abs. 1 lit. a DSGVO - Einwilligung)
  - Empfänger der Daten (Web3Forms, E-Mail-Empfänger)
  - Speicherdauer (E-Mails werden nicht auf Server gespeichert, nur in E-Mail-Postfach)
  - Betroffenenrechte (Auskunft, Löschung, etc.)
  - Link zu Web3Forms Datenschutzerklärung (falls relevant)

**Technische Tasks:**
- [ ] `pages/legal/datenschutz.html` bearbeiten
- [ ] Abschnitt "5. Kontaktformular" hinzufügen (oder ähnliche Nummerierung)
- [ ] Text formulieren (siehe unten für Vorlage)

**Vorlage für Datenschutzseite (Entwurf, TODO vom Betreiber prüfen lassen):**

```markdown
### 5. Kontaktformular

#### 5.1 Art und Umfang der Datenverarbeitung
Auf unserer Website bieten wir ein Kontaktformular an, über das Sie uns Anfragen zusenden können. Dabei werden folgende Daten erhoben:
- Ihr Name
- Ihre E-Mail-Adresse
- Ihre Nachricht
- Optional: Betreff

Diese Daten werden ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage verwendet.

#### 5.2 Rechtsgrundlage
Die Verarbeitung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.

#### 5.3 Empfänger der Daten
Zur Übermittlung der Nachrichten nutzen wir den Dienst Web3Forms (https://web3forms.com/). Die Daten werden verschlüsselt an Web3Forms übertragen und von dort per E-Mail an unsere Kontaktadresse (kontakt@transparentesVillach.at) weitergeleitet. Web3Forms speichert keine Daten langfristig und ist DSGVO-konform.

#### 5.4 Speicherdauer
Die über das Kontaktformular übermittelten Daten werden nicht auf unserer Website gespeichert. Sie befinden sich lediglich in unserem E-Mail-Postfach und werden dort so lange aufbewahrt, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist.

#### 5.5 Ihre Rechte
Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung sowie Widerspruch gegen die Verarbeitung Ihrer Daten. Kontaktieren Sie uns hierfür unter kontakt@transparentesVillach.at.
```

**Definition of Done:**
- Datenschutzseite enthält Abschnitt zum Kontaktformular
- Text ist verständlich und rechtlich korrekt (nach bestem Wissen)
- Hinweis für Betreiber: Von Anwalt prüfen lassen

---

#### US-003-010: Accessibility-Tests durchführen
**Als** Entwickler  
**möchte ich** sicherstellen, dass das Kontaktformular barrierefrei ist  
**damit** alle Nutzer es verwenden können.

**Akzeptanzkriterien:**
- Tastaturnavigation funktioniert vollständig (Tab, Enter)
- Screen Reader liest alle Labels, Fehler und Meldungen vor
- Farbkontraste erfüllen WCAG AA (4.5:1)
- Focus-Styles sind gut sichtbar
- Lighthouse Accessibility Score > 95

**Technische Tasks:**
- [ ] Tastatur-Tests:
  - Mit Tab durch alle Felder navigieren
  - Enter zum Absenden
  - Escape zum Abbrechen (optional)
- [ ] Screen Reader Tests (z.B. NVDA, VoiceOver):
  - Labels werden vorgelesen
  - Fehlermeldungen werden angekündigt (`role="alert"`)
  - Erfolgsmeldung wird vorgelesen
- [ ] Kontrast-Tests:
  - Tools: Lighthouse, WebAIM Contrast Checker
  - Alle Texte/Buttons prüfen
- [ ] Lighthouse-Audit durchführen

**Definition of Done:**
- Alle Accessibility-Tests bestanden
- Lighthouse Accessibility Score > 95
- Keine kritischen ARIA-Fehler

---

#### US-003-011: Mobile Tests durchführen
**Als** Entwickler  
**möchte ich** sicherstellen, dass das Kontaktformular auf mobilen Geräten gut funktioniert  
**damit** Nutzer es auch unterwegs verwenden können.

**Akzeptanzkriterien:**
- Formular ist auf Smartphone-Bildschirmen gut bedienbar
- Felder sind groß genug für Touch (min. 44x44px)
- Text ist lesbar ohne Zoom
- Tastatur (Mobile Keyboard) deckt keine wichtigen Elemente ab

**Technische Tasks:**
- [ ] Tests auf echten Geräten:
  - iOS (iPhone): Safari
  - Android: Chrome Mobile
- [ ] Browser DevTools: Mobile Emulation
- [ ] Breakpoints prüfen:
  - < 768px (Mobile)
  - 768px - 1024px (Tablet)
- [ ] Probleme beheben (falls vorhanden)

**Definition of Done:**
- Formular funktioniert auf iOS und Android
- Touch-Targets sind groß genug
- Keine horizontalen Scroll-Balken

---

#### US-003-012: Integration in Hauptnavigation
**Als** Entwickler  
**möchte ich** den "Kontakt"-Link in die Hauptnavigation aller Seiten einfügen  
**damit** Nutzer von überall zum Formular navigieren können.

**Akzeptanzkriterien:**
- Link "Kontakt" erscheint in Header-Navigation auf allen Seiten
- Link führt zu `/pages/kontakt.html`
- Aktuelle Seite wird visuell hervorgehoben (`active`-Klasse)

**Technische Tasks:**
- [ ] In allen HTML-Dateien (index.html, blog.html, about.html, legal/*):
  - `<nav>` um Link "Kontakt" erweitern
- [ ] CSS: `.nav-link.active` für aktuelle Seite
- [ ] JavaScript (optional): Automatische Erkennung der aktiven Seite

**Definition of Done:**
- "Kontakt"-Link ist in Navigation aller Seiten sichtbar
- Klick führt zur Kontaktseite
- Aktive Seite wird markiert

---

## Akzeptanztests (End-to-End)

### Test 1: Erfolgreicher Formular-Versand
**Schritte:**
1. Navigiere zu `/pages/kontakt.html`
2. Fülle alle Pflichtfelder aus (Name, E-Mail, Nachricht)
3. Aktiviere Datenschutz-Checkbox
4. Klicke auf "Nachricht senden"

**Erwartetes Ergebnis:**
- Erfolgsmeldung erscheint: "Vielen Dank für Ihre Nachricht! ..."
- Formular wird zurückgesetzt
- E-Mail kommt bei `kontakt@transparentesVillach.at` an

---

### Test 2: Validierung bei leeren Feldern
**Schritte:**
1. Navigiere zu `/pages/kontakt.html`
2. Klicke auf "Nachricht senden" ohne etwas auszufüllen

**Erwartetes Ergebnis:**
- Submit-Button ist deaktiviert (oder: Validierung verhindert Absenden)
- Fehlermeldungen erscheinen unter leeren Pflichtfeldern
- Focus springt zum ersten fehlerhaften Feld

---

### Test 3: E-Mail-Format-Validierung
**Schritte:**
1. Navigiere zu `/pages/kontakt.html`
2. Gib ungültige E-Mail ein (z.B. "test@")
3. Verlasse das Feld (Blur)

**Erwartetes Ergebnis:**
- Fehlermeldung erscheint: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
- Feld wird rot markiert
- Submit-Button bleibt deaktiviert

---

### Test 4: Honeypot-Spam-Schutz
**Schritte:**
1. Navigiere zu `/pages/kontakt.html`
2. Öffne DevTools → Inspect Honeypot-Feld
3. Fülle Honeypot-Feld aus (simuliert Bot-Verhalten)
4. Fülle restliche Felder korrekt aus und sende ab

**Erwartetes Ergebnis:**
- E-Mail wird NICHT versendet (durch Web3Forms blockiert)
- Optional: Frontend zeigt Fehlermeldung (oder Erfolgsmeldung, aber keine E-Mail kommt an)

---

### Test 5: Netzwerkfehler-Simulation
**Schritte:**
1. Navigiere zu `/pages/kontakt.html`
2. Öffne DevTools → Network → Offline-Modus aktivieren
3. Fülle Formular korrekt aus und sende ab

**Erwartetes Ergebnis:**
- Fehlermeldung erscheint: "Es ist ein Fehler aufgetreten. ..."
- Formular bleibt ausgefüllt (Daten nicht verloren)
- Alternative E-Mail wird angezeigt

---

### Test 6: Mobile Usability
**Schritte:**
1. Öffne Website auf Smartphone
2. Navigiere zu Kontaktseite
3. Fülle Formular aus (Touch-Eingabe)
4. Sende ab

**Erwartetes Ergebnis:**
- Formular ist gut bedienbar (keine Zoom-Notwendigkeit)
- Felder sind groß genug für Touch
- Mobile Keyboard deckt keine wichtigen Elemente ab
- Erfolgsmeldung ist gut sichtbar

---

### Test 7: Screen Reader Compatibility
**Schritte:**
1. Aktiviere Screen Reader (NVDA/VoiceOver)
2. Navigiere mit Tab durch Formular
3. Trigger Validierungsfehler
4. Sende erfolgreich ab

**Erwartetes Ergebnis:**
- Alle Labels werden vorgelesen
- Fehlermeldungen werden angekündigt
- Erfolgsmeldung wird vorgelesen
- Navigation ist logisch und verständlich

---

## Technische Architektur

### Dateistruktur
```
/
├── pages/
│   └── kontakt.html               (Neue Seite)
├── assets/
│   ├── css/
│   │   ├── components.css         (Erweitert: Form-Styling)
│   │   └── layout.css             (Evtl. Anpassungen)
│   └── js/
│       └── contact.js             (NEU: Validierung, API-Anbindung)
└── pages/legal/
    └── datenschutz.html           (Aktualisiert: Kontaktformular-Abschnitt)
```

### Web3Forms Setup (für Entwickler)
1. Registrierung auf https://web3forms.com/ (kostenlos)
2. Access Key generieren (Dashboard)
3. E-Mail-Empfänger konfigurieren: `kontakt@transparentesVillach.at`
4. Optional: Domain-Whitelist (`transparentesVillach.at`)
5. Spam-Schutz aktivieren (Honeypot, Rate-Limiting)

### JavaScript-Module
**`assets/js/contact.js`** (Struktur):
```javascript
// Konstanten
const FORM_ID = 'contactForm';
const API_ENDPOINT = 'https://api.web3forms.com/submit';

// Validierungs-Funktionen
function validateName(value) { /* ... */ }
function validateEmail(value) { /* ... */ }
function validateMessage(value) { /* ... */ }
function validateConsent(checked) { /* ... */ }

// UI-Funktionen
function showError(field, message) { /* ... */ }
function hideError(field) { /* ... */ }
function showSuccessMessage() { /* ... */ }
function showErrorMessage() { /* ... */ }

// API-Kommunikation
async function sendEmail(formData) { /* ... */ }

// Event Handler
function handleBlur(event) { /* ... */ }
function handleSubmit(event) { /* ... */ }

// Initialisierung
function init() { /* ... */ }

// Start
document.addEventListener('DOMContentLoaded', init);
```

---

## Risiken & Abhängigkeiten

### Risiko 1: Web3Forms Verfügbarkeit
- **Beschreibung:** Web3Forms könnte ausfallen oder nicht erreichbar sein
- **Wahrscheinlichkeit:** Niedrig (99% Uptime laut Anbieter)
- **Impact:** Hoch (Kontaktformular funktioniert nicht)
- **Mitigation:**
  - Fehlerbehandlung implementiert (siehe FR-003-006)
  - Alternative E-Mail-Adresse immer sichtbar
  - Optional: Fallback auf zweiten Provider (Formspree)

### Risiko 2: Spam-Angriffe
- **Beschreibung:** Bots könnten Formular missbrauchen
- **Wahrscheinlichkeit:** Mittel
- **Impact:** Mittel (viele Spam-E-Mails)
- **Mitigation:**
  - Honeypot implementiert
  - Rate-Limiting durch Web3Forms
  - Optional: reCAPTCHA v3 in späterem Sprint

### Risiko 3: DSGVO-Compliance
- **Beschreibung:** Datenschutzrechtliche Fehler
- **Wahrscheinlichkeit:** Niedrig (bei korrekter Implementierung)
- **Impact:** Hoch (rechtliche Konsequenzen)
- **Mitigation:**
  - Datenschutzseite aktualisiert
  - Einwilligungserklärung (Opt-In)
  - Keine unnötigen Daten erhoben
  - **Empfehlung:** Von Anwalt prüfen lassen

### Abhängigkeit 1: Web3Forms Account
- **Beschreibung:** Betreiber muss Web3Forms Account haben
- **Status:** Muss vor Go-Live eingerichtet werden
- **Verantwortlich:** Betreiber (Gernot Oberrauner)
- **Zeitaufwand:** 10 Minuten

### Abhängigkeit 2: E-Mail-Adresse aktiv
- **Beschreibung:** `kontakt@transparentesVillach.at` muss existieren und funktionieren
- **Status:** Muss vor Go-Live geprüft werden
- **Verantwortlich:** Betreiber

---

## Definition of Done (Feature-Level)

Das Feature FEAT-0003 gilt als abgeschlossen, wenn:

### Funktional
- [ ] Kontaktseite ist über Navigation erreichbar
- [ ] Formular enthält alle Pflichtfelder (Name, E-Mail, Nachricht, Datenschutz)
- [ ] Client-seitige Validierung funktioniert (Blur, Submit)
- [ ] E-Mail-Versand via Web3Forms funktioniert
- [ ] Erfolgsmeldung wird angezeigt
- [ ] Fehlerbehandlung funktioniert
- [ ] Alternative E-Mail-Adresse ist sichtbar

### Nicht-funktional
- [ ] Lighthouse Performance Score > 90
- [ ] Lighthouse Accessibility Score > 95
- [ ] Mobile Tests bestanden (iOS + Android)
- [ ] Screen Reader Tests bestanden (NVDA/VoiceOver)
- [ ] Datenschutzseite aktualisiert
- [ ] HTML/CSS validiert (W3C Validator)
- [ ] Cross-Browser-Tests bestanden (Chrome, Firefox, Safari, Edge)

### Dokumentation
- [ ] Datenschutzseite enthält Kontaktformular-Abschnitt
- [ ] README.md (falls vorhanden) aktualisiert
- [ ] Kommentare im Code (wo nötig)

### Qualitätssicherung
- [ ] Alle Akzeptanztests (Test 1-7) bestanden
- [ ] Code Review durchgeführt
- [ ] Keine kritischen Bugs offen

---

## Zeitschätzung

| User Story | Story Points | Stunden (ca.) |
|------------|--------------|---------------|
| US-003-001 | 2 | 1-2h |
| US-003-002 | 3 | 2-3h |
| US-003-003 | 3 | 2-3h |
| US-003-004 | 5 | 4-6h |
| US-003-005 | 5 | 3-5h |
| US-003-006 | 2 | 1-2h |
| US-003-007 | 2 | 1-2h |
| US-003-008 | 1 | 0.5-1h |
| US-003-009 | 3 | 2-3h |
| US-003-010 | 3 | 2-3h |
| US-003-011 | 2 | 1-2h |
| US-003-012 | 1 | 0.5-1h |
| **Gesamt** | **32** | **20-33h** |

**Annahme:** 1 Story Point = ca. 1 Stunde (für erfahrenen Entwickler)

---

## Offene Fragen / Klärungsbedarf

### An Betreiber (Gernot Oberrauner):
1. **Web3Forms Account:** Haben Sie bereits einen Account oder soll der Entwickler einen Test-Account einrichten?
2. **E-Mail-Adresse aktiv:** Ist `kontakt@transparentesVillach.at` bereits eingerichtet und funktionsfähig?
3. **Spam-Schutz:** Reicht Honeypot oder möchten Sie zusätzlich ein CAPTCHA (z.B. hCaptcha)?
4. **Datenschutz:** Soll der Entwurf für die Datenschutzseite von einem Anwalt geprüft werden?
5. **Betreff-Feld:** Soll das optionale Betreff-Feld implementiert werden oder weglassen?

### An Entwicklerteam:
- Keine offenen Fragen (Feature ist vollständig spezifiziert)

---

## Anhang

### Beispiel-E-Mail (empfangen bei kontakt@transparentesVillach.at)
```
Von: noreply@web3forms.com
An: kontakt@transparentesVillach.at
Betreff: Neue Nachricht von transparentesVillach.at

Name: Max Mustermann
E-Mail: max.mustermann@example.com
Betreff: Frage zum IFG

Nachricht:
Hallo, ich hätte eine Frage zum Informationsfreiheitsgesetz. Können Sie mir helfen?

---
Gesendet über das Kontaktformular von transparentesVillach.at
Datum: 07.01.2026, 14:35 Uhr
```

### Nützliche Links
- Web3Forms Dokumentation: https://docs.web3forms.com/
- DSGVO-Infos (Österreich): https://www.dsb.gv.at/
- WCAG 2.1 Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- Lighthouse Documentation: https://developers.google.com/web/tools/lighthouse

---

**Ende des Feature-Dokuments**

---

## Review & Freigabe

| Rolle | Name | Datum | Status |
|-------|------|-------|--------|
| Product Owner | [Name] | [Datum] | ⏳ Ausstehend |
| Tech Lead | [Name] | [Datum] | ⏳ Ausstehend |
| Betreiber | Gernot Oberrauner | [Datum] | ⏳ Ausstehend |

**Status-Legende:**
- ⏳ Ausstehend
- ✅ Freigegeben
- ❌ Abgelehnt (mit Kommentar)
