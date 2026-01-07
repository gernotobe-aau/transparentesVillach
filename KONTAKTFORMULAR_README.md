# Kontaktformular - Setup-Anleitung

## Feature: FEAT-0003 Kontaktformular/Messagebox

Das Kontaktformular wurde gemäß der Spezifikation in `/requirements/feature-0003-kontaktformular-messagebox.md` implementiert.

## ✅ Implementierte Komponenten

### 1. HTML-Struktur (`pages/kontakt.html`)
- Vollständiges Kontaktformular mit allen Pflichtfeldern
- Responsive Layout mit Hero-Section
- Honeypot-Feld für Spam-Schutz
- ARIA-Labels und Accessibility-Features
- Alternative Kontaktmöglichkeit (E-Mail-Link)

### 2. CSS-Styling (`assets/css/components.css`)
- Formular-Styling (Input-Felder, Textarea, Checkboxes)
- Error/Success-States mit visuellen Feedbacks
- Alert-Boxen für Erfolgs- und Fehlermeldungen
- Responsive Design (Mobile-First)
- Focus-States für Accessibility

### 3. JavaScript (`assets/js/contact.js`)
- Client-seitige Validierung (Blur & Submit)
- Echtzeitvalidierung bei bereits sichtbaren Fehlern
- Zeichenzähler für Nachrichtenfeld
- Web3Forms API-Integration
- Error Handling mit benutzerfreundlichen Meldungen
- Automatische Button-Aktivierung/-Deaktivierung

### 4. Datenschutz (`pages/legal/datenschutz.html`)
- Neuer Abschnitt "8. Kontaktformular" mit DSGVO-konformen Informationen
- Details zu Datenverarbeitung, Rechtsgrundlage, Speicherdauer
- Informationen zu Web3Forms als Datenempfänger
- Auflistung aller Betroffenenrechte

### 5. Navigation
- "Kontakt"-Link in allen Seiten hinzugefügt:
  - `index.html`
  - `pages/blog.html`
  - `pages/about.html`
  - `pages/legal/impressum.html`
  - `pages/legal/datenschutz.html`
  - `pages/legal/barrierefreiheit.html`
  - `pages/blog/detail.html`

## 🔧 Erforderliche Konfiguration

### Web3Forms Setup (WICHTIG!)

Das Kontaktformular nutzt **Web3Forms** als E-Mail-Service. Vor dem Go-Live müssen Sie folgende Schritte durchführen:

#### 1. Web3Forms Account erstellen
1. Besuchen Sie https://web3forms.com/
2. Klicken Sie auf "Get Started" oder "Sign Up"
3. Registrieren Sie sich mit Ihrer E-Mail-Adresse
4. Bestätigen Sie Ihre E-Mail-Adresse

#### 2. Access Key generieren
1. Loggen Sie sich in Ihr Web3Forms Dashboard ein
2. Klicken Sie auf "Create New Access Key" oder "New Form"
3. Geben Sie folgende Informationen ein:
   - **Form Name:** Transparentes Villach Kontaktformular
   - **Email Address:** `kontakt@transparentesvillach.at`
   - **Redirect URL:** (optional, leer lassen da wir eigene Success-Meldung haben)
4. Kopieren Sie den generierten **Access Key**

#### 3. Access Key in HTML einfügen
Öffnen Sie die Datei `pages/kontakt.html` und ersetzen Sie den Platzhalter:

```html
<!-- Suchen Sie diese Zeile (ca. Zeile 105): -->
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">

<!-- Ersetzen Sie "YOUR_ACCESS_KEY_HERE" mit Ihrem echten Access Key: -->
<input type="hidden" name="access_key" value="abc123-def456-ghi789">
```

#### 4. Web3Forms konfigurieren (optional)
Im Web3Forms Dashboard können Sie optional folgende Einstellungen vornehmen:

- **Domain Whitelist:** Fügen Sie `transparentesvillach.at` hinzu (verhindert Missbrauch)
- **Spam Filter:** Stellen Sie sicher, dass Honeypot-Schutz aktiviert ist (Standard)
- **Rate Limiting:** Empfohlen: Max. 10-20 Anfragen pro IP/Stunde
- **Auto-Reply:** Optional: Automatische Bestätigungs-E-Mail an Absender

#### 5. E-Mail-Adresse testen
Stellen Sie sicher, dass die E-Mail-Adresse `kontakt@transparentesvillach.at` aktiv ist und E-Mails empfangen kann.

## 🧪 Lokales Testen

### 1. Lokalen Server starten
Da das Formular AJAX/Fetch verwendet, muss die Seite über einen Webserver (nicht `file://`) aufgerufen werden:

```powershell
# PowerShell (im Projektverzeichnis)
.\server.ps1
```

Dann öffnen Sie: http://localhost:8080/pages/kontakt.html

### 2. Manuelle Tests

#### Test 1: Validierung
- Öffnen Sie das Kontaktformular
- Versuchen Sie, das Formular ohne Eingaben abzusenden
- **Erwartetes Ergebnis:** Submit-Button ist deaktiviert

#### Test 2: E-Mail-Format
- Geben Sie ungültige E-Mail ein (z.B. "test@")
- Klicken Sie in ein anderes Feld (Blur)
- **Erwartetes Ergebnis:** Fehlermeldung erscheint unter E-Mail-Feld

#### Test 3: Zeichenzähler
- Tippen Sie in das Nachrichtenfeld
- **Erwartetes Ergebnis:** Zeichenzähler aktualisiert sich live (z.B. "15 / 2000 Zeichen")

#### Test 4: Submit (ohne Web3Forms)
Ohne korrekt konfigurierten Access Key wird eine Fehlermeldung angezeigt. Das ist normal!

#### Test 5: Submit (mit Web3Forms)
- Füllen Sie alle Felder korrekt aus
- Aktivieren Sie die Datenschutz-Checkbox
- Klicken Sie auf "Nachricht senden"
- **Erwartetes Ergebnis:**
  - Erfolgsmeldung erscheint
  - Formular wird zurückgesetzt
  - E-Mail kommt bei `kontakt@transparentesvillach.at` an

### 3. Browser-Tests
Testen Sie die Seite in:
- ✅ Chrome (Desktop & Mobile Emulation)
- ✅ Firefox
- ✅ Safari (falls verfügbar)
- ✅ Edge

### 4. Accessibility-Tests
- **Tastaturnavigation:** Tab durch alle Felder → Enter zum Absenden
- **Screen Reader:** (optional) Teste mit NVDA oder VoiceOver
- **Kontraste:** Prüfe Lesbarkeit in verschiedenen Lichtverhältnissen

## 📱 Mobile Responsiveness

Das Formular ist Mobile-First designed:
- Touch-Targets sind mindestens 44x44px
- Submit-Button wird auf Mobile 100% breit
- Text ist ohne Zoom lesbar
- Felder passen sich an Bildschirmbreite an

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔒 Sicherheit & Datenschutz

### Implementierte Maßnahmen:
1. **HTTPS:** Verschlüsselte Übertragung (durch Hosttech.at)
2. **Honeypot:** Verstecktes Feld `_gotcha` fängt Bots ab
3. **Rate-Limiting:** Durch Web3Forms (konfigurierbar)
4. **Client-Validierung:** Verhindert fehlerhafte Eingaben
5. **XSS-Schutz:** Keine unsichere HTML-Injection
6. **DSGVO-Konformität:**
   - Einwilligungserklärung (Checkbox)
   - Datenschutzseite aktualisiert
   - Transparente Information über Datenverarbeitung
   - EU-basierter Service-Provider (Web3Forms)

### Keine Cookies oder Tracking
Das Kontaktformular setzt **keine Cookies** und verwendet **kein Tracking**. Es werden nur die eingegebenen Formulardaten übertragen.

## 📋 Checkliste vor Go-Live

- [ ] Web3Forms Account erstellt
- [ ] Access Key in `pages/kontakt.html` eingefügt
- [ ] E-Mail-Adresse `kontakt@transparentesvillach.at` ist aktiv
- [ ] Testformular gesendet und E-Mail erhalten
- [ ] Navigation funktioniert (Kontakt-Link auf allen Seiten)
- [ ] Datenschutzseite aktualisiert und geprüft
- [ ] Mobile Tests durchgeführt
- [ ] Browser-Kompatibilität geprüft
- [ ] Accessibility-Tests durchgeführt
- [ ] Rechtliche Prüfung der Datenschutzseite (empfohlen: durch Anwalt)

## 🐛 Bekannte Probleme / Troubleshooting

### Problem: "Es ist ein Fehler aufgetreten"
**Ursache:** Access Key ist nicht korrekt oder Web3Forms ist nicht erreichbar
**Lösung:**
1. Prüfen Sie, ob Access Key korrekt eingefügt ist
2. Prüfen Sie Browser-Console auf Fehler (F12 → Console)
3. Testen Sie Internetverbindung
4. Prüfen Sie Web3Forms Status: https://web3forms.com/status

### Problem: E-Mail kommt nicht an
**Ursache:** E-Mail-Adresse in Web3Forms falsch konfiguriert oder Spam-Filter
**Lösung:**
1. Prüfen Sie Spam-Ordner
2. Loggen Sie sich in Web3Forms Dashboard ein und prüfen Sie E-Mail-Adresse
3. Senden Sie Test-E-Mail direkt über Web3Forms Dashboard

### Problem: Submit-Button bleibt deaktiviert
**Ursache:** Validierung schlägt fehl oder JavaScript nicht geladen
**Lösung:**
1. Prüfen Sie alle Felder auf korrekte Eingaben
2. Prüfen Sie Browser-Console auf JavaScript-Fehler
3. Stellen Sie sicher, dass `contact.js` korrekt geladen ist

## 📚 Weitere Dokumentation

- **Spezifikation:** `/requirements/feature-0003-kontaktformular-messagebox.md`
- **Web3Forms Docs:** https://web3forms.com/docs
- **DSGVO-Infos:** https://www.data-privacy-office.eu/

## 🎯 Feature-Status

**Status:** ✅ Ready for Testing  
**Nächster Schritt:** Web3Forms Access Key konfigurieren und Live-Tests durchführen

**Implementiert von:** GitHub Copilot (Senior Full Stack Developer)  
**Datum:** 07. Januar 2026  
**Sprint:** 3  
**Feature-ID:** FEAT-0003
