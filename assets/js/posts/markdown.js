/**
 * markdown.js
 * Verantwortung: Markdown-zu-HTML-Konvertierung
 * Nutzt marked.js Library für vollständiges Markdown-Rendering
 */

/**
 * Konvertiert Markdown zu HTML
 * @param {string} markdown - Markdown-String
 * @returns {string} HTML-String (sanitized)
 */
export function markdownToHtml(markdown) {
  // Prüfen ob marked.js verfügbar ist
  if (typeof marked === 'undefined') {
    console.error('marked.js ist nicht geladen!');
    return fallbackMarkdownToHtml(markdown);
  }

  try {
    // marked.js Konfiguration
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: true,
      mangle: false,
      sanitize: false // Wir sanitizen manuell
    });

    const html = marked.parse(markdown);
    return sanitizeHtml(html);
  } catch (error) {
    console.error('Fehler beim Markdown-Parsing:', error);
    return fallbackMarkdownToHtml(markdown);
  }
}

/**
 * Einfache Sanitization (entfernt gefährliche Tags/Attribute)
 * @param {string} html - HTML-String
 * @returns {string} Sanitized HTML
 */
function sanitizeHtml(html) {
  // Erlaubte Tags
  const allowedTags = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'br', 'hr',
    'strong', 'em', 'b', 'i', 'u',
    'ul', 'ol', 'li',
    'blockquote', 'pre', 'code',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ];

  // Temporäres Element zum Parsen
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Rekursive Sanitization
  sanitizeNode(tempDiv, allowedTags);

  return tempDiv.innerHTML;
}

/**
 * Rekursive Node-Sanitization
 * @param {Node} node - DOM-Node
 * @param {Array} allowedTags - Erlaubte HTML-Tags
 */
function sanitizeNode(node, allowedTags) {
  const nodesToRemove = [];

  for (let i = 0; i < node.childNodes.length; i++) {
    const child = node.childNodes[i];

    if (child.nodeType === Node.ELEMENT_NODE) {
      const tagName = child.tagName.toLowerCase();

      // Nicht erlaubte Tags entfernen
      if (!allowedTags.includes(tagName)) {
        nodesToRemove.push(child);
        continue;
      }

      // Gefährliche Attribute entfernen
      const allowedAttributes = ['href', 'src', 'alt', 'title', 'class', 'id'];
      const attributes = Array.from(child.attributes);
      
      attributes.forEach(attr => {
        if (!allowedAttributes.includes(attr.name.toLowerCase())) {
          child.removeAttribute(attr.name);
        }
      });

      // Links: Nur http(s) erlauben
      if (tagName === 'a' && child.hasAttribute('href')) {
        const href = child.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://') && !href.startsWith('/') && !href.startsWith('#')) {
          child.removeAttribute('href');
        }
        // Externe Links: target="_blank" und rel="noopener"
        if (href.startsWith('http')) {
          child.setAttribute('target', '_blank');
          child.setAttribute('rel', 'noopener noreferrer');
        }
      }

      // Bilder: Nur lokale Pfade oder https
      if (tagName === 'img' && child.hasAttribute('src')) {
        const src = child.getAttribute('src');
        if (!src.startsWith('/') && !src.startsWith('https://')) {
          child.removeAttribute('src');
        }
      }

      // Rekursiv weitermachen
      sanitizeNode(child, allowedTags);
    }
  }

  // Nicht erlaubte Nodes entfernen
  nodesToRemove.forEach(child => {
    node.removeChild(child);
  });
}

/**
 * Fallback: Einfache Markdown-Konvertierung ohne Library
 * Für den Fall, dass marked.js nicht verfügbar ist
 * @param {string} markdown - Markdown-String
 * @returns {string} HTML-String
 */
function fallbackMarkdownToHtml(markdown) {
  let html = markdown;

  // Überschriften
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Fett & Kursiv
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Listen (ungeordnet)
  html = html.replace(/^\- (.+)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Absätze
  html = html.split('\n\n').map(para => {
    if (!para.startsWith('<') && para.trim() !== '') {
      return `<p>${para}</p>`;
    }
    return para;
  }).join('\n');

  // Zeilenumbrüche
  html = html.replace(/\n/g, '<br>');

  return html;
}

/**
 * Extrahiert den Titel aus Markdown (erste H1)
 * @param {string} markdown - Markdown-String
 * @returns {string} Titel oder leerer String
 */
export function extractTitle(markdown) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1] : '';
}

/**
 * Erstellt einen Excerpt aus Markdown (erste Zeilen ohne Titel)
 * @param {string} markdown - Markdown-String
 * @param {number} maxLength - Maximale Länge
 * @returns {string} Excerpt
 */
export function createExcerpt(markdown, maxLength = 200) {
  // Titel entfernen
  let text = markdown.replace(/^#\s+.+$/m, '');
  
  // Markdown-Syntax entfernen
  text = text.replace(/[#*_\[\]()]/g, '');
  
  // Auf maxLength kürzen
  if (text.length > maxLength) {
    text = text.substring(0, maxLength) + '...';
  }
  
  return text.trim();
}
