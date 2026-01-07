/**
 * contact.js
 * Kontaktformular: Validierung, API-Anbindung, UX
 * Projekt: Transparentes Villach
 */

// Konstanten
const FORM_ID = 'contactForm';
const API_ENDPOINT = 'https://api.web3forms.com/submit';
const MAX_MESSAGE_LENGTH = 2000;
const MIN_NAME_LENGTH = 2;

// Validierungsmuster
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// =============================================================================
// Validierungs-Funktionen
// =============================================================================

/**
 * Validiert den Namen (OPTIONAL)
 * @param {string} value - Name Wert
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateName(value) {
  const trimmedValue = value.trim();
  
  // Name ist optional - leeres Feld ist OK
  if (trimmedValue.length === 0) {
    return { valid: true, message: '' };
  }
  
  // Wenn Name eingegeben wurde, mindestens 2 Zeichen
  if (trimmedValue.length < MIN_NAME_LENGTH) {
    return { valid: false, message: `Der Name muss mindestens ${MIN_NAME_LENGTH} Zeichen lang sein.` };
  }
  
  return { valid: true, message: '' };
}

/**
 * Validiert die E-Mail-Adresse (OPTIONAL)
 * @param {string} value - E-Mail Wert
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateEmail(value) {
  const trimmedValue = value.trim();
  
  // E-Mail ist optional - leeres Feld ist OK
  if (trimmedValue.length === 0) {
    return { valid: true, message: '' };
  }
  
  // Wenn E-Mail eingegeben wurde, muss sie gültig sein
  if (!EMAIL_PATTERN.test(trimmedValue)) {
    return { valid: false, message: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' };
  }
  
  return { valid: true, message: '' };
}

/**
 * Validiert die Nachricht
 * @param {string} value - Nachrichten Wert
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateMessage(value) {
  const trimmedValue = value.trim();
  
  if (trimmedValue.length === 0) {
    return { valid: false, message: 'Bitte geben Sie eine Nachricht ein.' };
  }
  
  if (trimmedValue.length < 10) {
    return { valid: false, message: 'Die Nachricht muss mindestens 10 Zeichen lang sein.' };
  }
  
  return { valid: true, message: '' };
}

/**
 * Validiert die Datenschutz-Checkbox
 * @param {boolean} checked - Checkbox Status
 * @returns {Object} - {valid: boolean, message: string}
 */
function validateConsent(checked) {
  if (!checked) {
    return { valid: false, message: 'Bitte bestätigen Sie, dass Sie die Datenschutzerklärung zur Kenntnis genommen haben.' };
  }
  
  return { valid: true, message: '' };
}

// =============================================================================
// UI-Funktionen
// =============================================================================

/**
 * Zeigt Fehlermeldung unter einem Feld an
 * @param {HTMLElement} field - Input-Feld
 * @param {string} message - Fehlermeldung
 */
function showError(field, message) {
  const errorElement = document.getElementById(`${field.id}-error`);
  
  if (errorElement) {
    errorElement.textContent = message;
    field.classList.add('invalid');
    field.classList.remove('valid');
    field.setAttribute('aria-invalid', 'true');
  }
}

/**
 * Entfernt Fehlermeldung von einem Feld
 * @param {HTMLElement} field - Input-Feld
 */
function hideError(field) {
  const errorElement = document.getElementById(`${field.id}-error`);
  
  if (errorElement) {
    errorElement.textContent = '';
    field.classList.remove('invalid');
    field.classList.add('valid');
    field.setAttribute('aria-invalid', 'false');
  }
}

/**
 * Validiert ein einzelnes Feld
 * @param {HTMLElement} field - Input-Feld
 * @returns {boolean} - Validierungsstatus
 */
function validateField(field) {
  let validation;
  
  switch (field.id) {
    case 'name':
      validation = validateName(field.value);
      break;
    case 'email':
      validation = validateEmail(field.value);
      break;
    case 'message':
      validation = validateMessage(field.value);
      break;
    case 'consent':
      validation = validateConsent(field.checked);
      break;
    default:
      return true;
  }
  
  if (validation.valid) {
    hideError(field);
    return true;
  } else {
    showError(field, validation.message);
    return false;
  }
}

/**
 * Validiert das gesamte Formular
 * @returns {boolean} - Validierungsstatus
 */
function validateForm() {
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  const consentField = document.getElementById('consent');
  
  const nameValid = validateField(nameField);
  const emailValid = validateField(emailField);
  const messageValid = validateField(messageField);
  const consentValid = validateField(consentField);
  
  return nameValid && emailValid && messageValid && consentValid;
}

/**
 * Aktualisiert den Submit-Button Status
 */
function updateSubmitButton() {
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById(FORM_ID);
  
  const messageField = document.getElementById('message');
  const consentField = document.getElementById('consent');
  
  // Nur Nachricht und Consent sind Pflicht
  const messageOk = messageField.value.trim().length >= 10;
  const consentOk = consentField.checked;
  
  const allFieldsValid = messageOk && consentOk;
  
  submitBtn.disabled = !allFieldsValid;
}

/**
 * Zeigt Erfolgsmeldung an
 */
function showSuccessMessage() {
  const alertContainer = document.getElementById('alertContainer');
  
  alertContainer.innerHTML = `
    <div class="alert alert-success" role="alert" tabindex="-1" id="successAlert">
      <h3>✓ Nachricht erfolgreich gesendet!</h3>
      <p>
        Vielen Dank für Ihre Nachricht. Ich habe Ihre Anfrage erhalten und werde 
        mich so schnell wie möglich damit befassen.
      </p>
    </div>
  `;
  
  // Focus auf Erfolgsmeldung setzen
  const successAlert = document.getElementById('successAlert');
  successAlert.focus();
  
  // Scroll zur Erfolgsmeldung
  alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Zeigt Fehlermeldung an
 * @param {string} errorDetails - Optionale Fehlerdetails (nur für Console)
 */
function showErrorMessage(errorDetails = '') {
  const alertContainer = document.getElementById('alertContainer');
  
  alertContainer.innerHTML = `
    <div class="alert alert-error" role="alert" tabindex="-1" id="errorAlert">
      <h3>⚠ Es ist ein Fehler aufgetreten</h3>
      <p>
        Leider konnte Ihre Nachricht nicht gesendet werden. Bitte versuchen Sie es erneut 
        oder kontaktieren Sie uns direkt per E-Mail unter 
        <a href="mailto:kontakt@transparentesvillach.at">kontakt@transparentesvillach.at</a>.
      </p>
    </div>
  `;
  
  // Focus auf Fehlermeldung setzen
  const errorAlert = document.getElementById('errorAlert');
  errorAlert.focus();
  
  // Scroll zur Fehlermeldung
  alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Details in Console loggen (für Debugging)
  if (errorDetails) {
    console.error('Formular-Fehler:', errorDetails);
  }
}

/**
 * Entfernt Alert-Meldungen
 */
function clearAlerts() {
  const alertContainer = document.getElementById('alertContainer');
  alertContainer.innerHTML = '';
}

/**
 * Aktualisiert den Zeichenzähler für die Nachricht
 */
function updateCharCounter() {
  const messageField = document.getElementById('message');
  const counterElement = document.getElementById('message-counter');
  
  if (messageField && counterElement) {
    const currentLength = messageField.value.length;
    counterElement.textContent = `${currentLength} / ${MAX_MESSAGE_LENGTH} Zeichen`;
    
    // Optional: Warnung bei fast erreichtem Limit
    if (currentLength > MAX_MESSAGE_LENGTH * 0.9) {
      counterElement.style.color = 'var(--color-error)';
    } else {
      counterElement.style.color = 'var(--color-text-muted)';
    }
  }
}

// =============================================================================
// API-Kommunikation
// =============================================================================

/**
 * Sendet E-Mail via Web3Forms API
 * @param {FormData} formData - Formulardaten
 * @returns {Promise<boolean>} - Erfolgsstatus
 */
async function sendEmail(formData) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    
    const result = await response.json();
    
    if (response.ok && result.success) {
      return true;
    } else {
      throw new Error(result.message || 'API-Fehler');
    }
  } catch (error) {
    console.error('Fehler beim E-Mail-Versand:', error);
    throw error;
  }
}

// =============================================================================
// Event Handler
// =============================================================================

/**
 * Handler für Blur-Event (Feld verlassen)
 * @param {Event} event - Blur Event
 */
function handleBlur(event) {
  const field = event.target;
  
  // Nur validieren, wenn Feld bereits ausgefüllt wurde
  if (field.value.trim().length > 0 || field.id === 'consent') {
    validateField(field);
  }
  
  updateSubmitButton();
}

/**
 * Handler für Input-Event (Echtzeitvalidierung)
 * @param {Event} event - Input Event
 */
function handleInput(event) {
  const field = event.target;
  
  // Bei bereits sichtbarem Fehler: Live-Validierung
  if (field.classList.contains('invalid')) {
    validateField(field);
  }
  
  // Zeichenzähler aktualisieren (für Nachricht)
  if (field.id === 'message') {
    updateCharCounter();
  }
  
  updateSubmitButton();
}

/**
 * Handler für Submit-Event
 * @param {Event} event - Submit Event
 */
async function handleSubmit(event) {
  event.preventDefault();
  
  // Alerts entfernen
  clearAlerts();
  
  // Formular validieren
  if (!validateForm()) {
    // Scroll zum ersten fehlerhaften Feld
    const firstInvalidField = document.querySelector('.invalid');
    if (firstInvalidField) {
      firstInvalidField.focus();
      firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  
  // Button-Status ändern (Loading)
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById(FORM_ID);
  
  submitBtn.classList.add('is-loading');
  submitBtn.disabled = true;
  
  try {
    // FormData sammeln
    const formData = new FormData(form);
    
    // E-Mail senden
    const success = await sendEmail(formData);
    
    if (success) {
      // Erfolgsmeldung anzeigen
      showSuccessMessage();
      
      // Formular zurücksetzen
      form.reset();
      
      // Alle Validierungs-Klassen entfernen
      document.querySelectorAll('.valid, .invalid').forEach(field => {
        field.classList.remove('valid', 'invalid');
        field.setAttribute('aria-invalid', 'false');
      });
      
      // Zeichenzähler zurücksetzen
      updateCharCounter();
      
      // Submit-Button deaktivieren
      updateSubmitButton();
    }
  } catch (error) {
    // Fehlermeldung anzeigen
    showErrorMessage(error.message);
  } finally {
    // Button-Status zurücksetzen
    submitBtn.classList.remove('is-loading');
    submitBtn.disabled = false;
  }
}

// =============================================================================
// Initialisierung
// =============================================================================

/**
 * Initialisiert das Kontaktformular
 */
function init() {
  const form = document.getElementById(FORM_ID);
  
  if (!form) {
    console.warn('Kontaktformular nicht gefunden');
    return;
  }
  
  // Event Listener für alle Input-Felder
  const nameField = document.getElementById('name');
  const emailField = document.getElementById('email');
  const messageField = document.getElementById('message');
  const consentField = document.getElementById('consent');
  
  // Blur-Events (Validierung beim Verlassen)
  [nameField, emailField, messageField].forEach(field => {
    if (field) {
      field.addEventListener('blur', handleBlur);
      field.addEventListener('input', handleInput);
    }
  });
  
  // Checkbox: Change-Event
  if (consentField) {
    consentField.addEventListener('change', (event) => {
      validateField(event.target);
      updateSubmitButton();
    });
  }
  
  // Zeichenzähler initialisieren
  updateCharCounter();
  
  // Submit-Event
  form.addEventListener('submit', handleSubmit);
  
  // Initial: Submit-Button deaktivieren
  updateSubmitButton();
  
  console.log('Kontaktformular initialisiert');
}

// Start: Warte auf DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
