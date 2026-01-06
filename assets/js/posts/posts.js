/**
 * posts.js
 * Hauptlogik für Blog-Seiten (Übersicht und Detail)
 */

import { loadPostsIndex, loadPostContent, findPostBySlug } from './sources.js';
import { markdownToHtml } from './markdown.js';

/**
 * Formatiert ein Datum im deutschen Format
 * @param {string} dateString - ISO-Datum (YYYY-MM-DD)
 * @returns {string} Formatiertes Datum (DD.MM.YYYY)
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

/**
 * Erstellt HTML für Tag-Badges
 * @param {Array} tags - Array von Tag-Strings
 * @returns {string} HTML-String
 */
function renderTags(tags) {
  if (!tags || tags.length === 0) return '';
  
  return tags.map(tag => 
    `<span class="badge badge--primary">${tag}</span>`
  ).join('');
}

/**
 * Rendert die Blog-Übersichtsseite
 * Lädt alle Posts und zeigt sie als Karten an
 */
export async function renderBlogOverview() {
  const container = document.getElementById('blog-grid');
  
  if (!container) {
    console.error('Blog-Grid Container nicht gefunden!');
    return;
  }

  // Loading-State
  container.innerHTML = '<p class="loading-message">Beiträge werden geladen...</p>';

  try {
    // Posts laden und sortieren (neueste zuerst)
    const posts = await loadPostsIndex();
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Wenn keine Posts vorhanden
    if (posts.length === 0) {
      container.innerHTML = '<p class="empty-message">Noch keine Beiträge vorhanden.</p>';
      return;
    }

    // Posts als Karten rendern
    const cardsHtml = posts.map(post => createPostCard(post)).join('');
    container.innerHTML = cardsHtml;

    // Event-Listener für Karten
    attachCardListeners();

  } catch (error) {
    console.error('Fehler beim Rendern der Blog-Übersicht:', error);
    container.innerHTML = '<p class="error-message">Fehler beim Laden der Beiträge.</p>';
  }
}

/**
 * Erstellt HTML für eine Beitrags-Karte
 * @param {Object} post - Post-Objekt
 * @returns {string} HTML-String
 */
function createPostCard(post) {
  const formattedDate = formatDate(post.date);
  const tagsHtml = renderTags(post.tags);
  const readingTime = post.readingTime ? `<span class="reading-time">${post.readingTime}</span>` : '';

  return `
    <article class="blog-card" data-slug="${post.slug}" tabindex="0" role="button">
      <div class="blog-card__content">
        <h2 class="blog-card__title">${post.title}</h2>
        <div class="blog-card__meta">
          <time class="blog-card__date" datetime="${post.date}">${formattedDate}</time>
          ${readingTime}
        </div>
        <p class="blog-card__excerpt">${post.excerpt}</p>
        <div class="blog-card__tags">
          ${tagsHtml}
        </div>
      </div>
    </article>
  `;
}

/**
 * Fügt Event-Listener zu Beitrags-Karten hinzu
 */
function attachCardListeners() {
  const cards = document.querySelectorAll('.blog-card');
  
  cards.forEach(card => {
    const slug = card.dataset.slug;
    
    // Click-Event
    card.addEventListener('click', () => {
      navigateToPost(slug);
    });

    // Enter-Taste für Accessibility
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        navigateToPost(slug);
      }
    });
  });
}

/**
 * Navigiert zur Detailseite eines Beitrags
 * @param {string} slug - Slug des Beitrags
 */
function navigateToPost(slug) {
  window.location.href = `blog/detail.html?slug=${slug}`;
}

/**
 * Rendert die Beitrags-Detailseite
 * Lädt einen spezifischen Beitrag und zeigt ihn an
 */
export async function renderBlogDetail() {
  // Slug aus URL-Parameter auslesen
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  if (!slug) {
    showError('Kein Beitrag ausgewählt.');
    return;
  }

  // Container finden
  const container = document.getElementById('post-detail');
  
  if (!container) {
    console.error('Post-Detail Container nicht gefunden!');
    return;
  }

  // Loading-State
  container.innerHTML = '<p class="loading-message">Beitrag wird geladen...</p>';

  try {
    // Post finden
    const post = await findPostBySlug(slug);
    
    if (!post) {
      showError('Beitrag nicht gefunden.');
      return;
    }

    // Markdown-Content laden
    const markdown = await loadPostContent(post.contentFile);
    const htmlContent = markdownToHtml(markdown);

    // Post rendern
    const postHtml = createPostDetail(post, htmlContent);
    container.innerHTML = postHtml;

    // Seiten-Titel aktualisieren
    document.title = `${post.title} - Transparentes Villach`;

    // Meta-Description aktualisieren
    updateMetaDescription(post.excerpt);

  } catch (error) {
    console.error('Fehler beim Rendern des Beitrags:', error);
    showError('Fehler beim Laden des Beitrags.');
  }
}

/**
 * Erstellt HTML für die Detailansicht
 * @param {Object} post - Post-Objekt
 * @param {string} htmlContent - HTML-Content
 * @returns {string} HTML-String
 */
function createPostDetail(post, htmlContent) {
  const formattedDate = formatDate(post.date);
  const tagsHtml = renderTags(post.tags);
  const readingTime = post.readingTime ? `<span class="reading-time">${post.readingTime}</span>` : '';
  const pdfSection = createPdfSection(post.pdfFiles);

  return `
    <article class="post-detail">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../blog.html">← Zurück zur Übersicht</a>
      </nav>

      <header class="post-header">
        <h1 class="post-title">${post.title}</h1>
        <div class="post-meta">
          <time class="post-date" datetime="${post.date}">${formattedDate}</time>
          ${readingTime}
        </div>
        <div class="post-tags">
          ${tagsHtml}
        </div>
      </header>

      <div class="post-content">
        ${htmlContent}
      </div>

      ${pdfSection}

      <nav class="post-navigation">
        <a href="../blog.html" class="btn btn--secondary">← Zurück zur Übersicht</a>
      </nav>
    </article>
  `;
}

/**
 * Erstellt die PDF-Download-Sektion
 * @param {Array} pdfFiles - Array von PDF-Objekten
 * @returns {string} HTML-String
 */
function createPdfSection(pdfFiles) {
  if (!pdfFiles || pdfFiles.length === 0) {
    return '';
  }

  const pdfListHtml = pdfFiles.map(pdf => {
    const size = pdf.size ? `<span class="pdf-size">${pdf.size}</span>` : '';
    return `
      <li>
        <a href="../../assets/documents/posts/${pdf.file}" 
           class="pdf-link" 
           download
           target="_blank">
          <span class="icon">📄</span>
          <span class="pdf-title">${pdf.title}</span>
          ${size}
        </a>
      </li>
    `;
  }).join('');

  return `
    <section class="pdf-downloads">
      <h3>Downloads</h3>
      <ul class="pdf-list">
        ${pdfListHtml}
      </ul>
    </section>
  `;
}

/**
 * Zeigt eine Fehlermeldung an
 * @param {string} message - Fehlermeldung
 */
function showError(message) {
  const container = document.getElementById('post-detail') || document.getElementById('blog-grid');
  
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h2>Fehler</h2>
        <p>${message}</p>
        <a href="../blog.html" class="btn btn--primary">Zur Übersicht</a>
      </div>
    `;
  }
}

/**
 * Aktualisiert die Meta-Description
 * @param {string} description - Neue Description
 */
function updateMetaDescription(description) {
  let metaDesc = document.querySelector('meta[name="description"]');
  
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  
  metaDesc.content = description;
}

/**
 * Initialisierung - Wird von den HTML-Seiten aufgerufen
 * Erkennt die aktuelle Seite und ruft die passende Render-Funktion auf
 */
export function init() {
  const path = window.location.pathname;
  
  // Überprüfen, welche Seite geladen wurde
  if (path.includes('blog/detail.html')) {
    renderBlogDetail();
  } else if (path.includes('blog.html')) {
    renderBlogOverview();
  } else {
    console.warn('Posts-Modul auf unbekannter Seite geladen.');
  }
}

// Auto-Init wenn das DOM bereit ist
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
