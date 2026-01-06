/**
 * sources.js
 * Verantwortung: Laden von Daten (posts.json, Markdown-Dateien)
 */

/**
 * Lädt den Beitrags-Index aus content/posts.json
 * @returns {Promise<Array>} Array mit allen Posts
 */
export async function loadPostsIndex() {
  try {
    // Dynamischer Pfad abhängig vom aktuellen Standort
    const basePath = window.location.pathname.includes('/pages/blog/') 
      ? '../../content/posts.json' 
      : '../content/posts.json';
    
    const response = await fetch(basePath);
    
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Fehler beim Laden des Beitrags-Index:', error);
    return [];
  }
}

/**
 * Lädt den Inhalt einer Markdown-Datei
 * @param {string} contentFile - Name der Markdown-Datei
 * @returns {Promise<string>} Markdown-String
 */
export async function loadPostContent(contentFile) {
  try {
    // Dynamischer Pfad abhängig vom aktuellen Standort
    const basePath = window.location.pathname.includes('/pages/blog/') 
      ? '../../content/posts/' 
      : '../content/posts/';
    
    const response = await fetch(`${basePath}${contentFile}`);
    
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error('Fehler beim Laden des Beitrags:', error);
    return '# Fehler\n\nDer Beitrag konnte nicht geladen werden.';
  }
}

/**
 * Findet einen Beitrag anhand des Slugs
 * @param {string} slug - Der Slug des Beitrags
 * @returns {Promise<Object|null>} Post-Objekt oder null
 */
export async function findPostBySlug(slug) {
  const posts = await loadPostsIndex();
  return posts.find(post => post.slug === slug) || null;
}
