/**
 * main.js
 * Haupt-JavaScript-Datei für Transparentes Villach
 * Funktionen: Mobile Navigation, Keyboard Support, Active Page Highlighting
 */

// ==========================================================================
// Mobile Navigation Toggle
// ==========================================================================

class MobileNavigation {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.mainNav = document.querySelector('.main-nav');
    this.body = document.body;
    
    if (this.navToggle && this.mainNav) {
      this.init();
    }
  }
  
  init() {
    // Toggle-Button Event
    this.navToggle.addEventListener('click', () => this.toggleNav());
    
    // Escape-Taste schließt Menü
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isNavOpen()) {
        this.closeNav();
        this.navToggle.focus();
      }
    });
    
    // Klick außerhalb schließt Menü (nur Mobile)
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && this.isNavOpen()) {
        if (!this.mainNav.contains(e.target) && !this.navToggle.contains(e.target)) {
          this.closeNav();
        }
      }
    });
    
    // Menü-Links schließen Navigation auf Mobile
    const navLinks = this.mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          this.closeNav();
        }
      });
    });
    
    // Resize-Event: Schließe Menü wenn von Mobile zu Desktop gewechselt wird
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && this.isNavOpen()) {
          this.closeNav();
        }
      }, 250);
    });
  }
  
  toggleNav() {
    if (this.isNavOpen()) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }
  
  openNav() {
    this.mainNav.classList.add('active');
    this.navToggle.setAttribute('aria-expanded', 'true');
    this.navToggle.setAttribute('aria-label', 'Menü schließen');
    
    // Verhindere Body-Scroll auf Mobile wenn Menü offen
    if (window.innerWidth <= 768) {
      this.body.style.overflow = 'hidden';
    }
  }
  
  closeNav() {
    this.mainNav.classList.remove('active');
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.setAttribute('aria-label', 'Menü öffnen');
    this.body.style.overflow = '';
  }
  
  isNavOpen() {
    return this.mainNav.classList.contains('active');
  }
}

// ==========================================================================
// Active Page Highlighting
// ==========================================================================

function highlightActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    
    // Entferne 'active' Klasse von allen Links
    link.classList.remove('active');
    
    // Exakte Übereinstimmung oder Startseite
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } 
    // Startseite-Spezialfall
    else if (currentPath === '/' && linkPath === '/index.html') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
    // Index.html als Startseite
    else if ((currentPath === '/index.html' || currentPath === '/') && linkPath === '/') {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// ==========================================================================
// Smooth Scroll für Skip-Links
// ==========================================================================

function initSkipLinks() {
  const skipLink = document.querySelector('.skip-link');
  
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = skipLink.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

// ==========================================================================
// External Links (öffnen in neuem Tab mit rel="noopener noreferrer")
// ==========================================================================

function handleExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"]');
  
  links.forEach(link => {
    const linkHost = new URL(link.href).hostname;
    const currentHost = window.location.hostname;
    
    // Wenn externer Link
    if (linkHost !== currentHost) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Füge visuellen Hinweis hinzu (optional)
      if (!link.querySelector('.external-icon')) {
        const icon = document.createElement('span');
        icon.className = 'external-icon sr-only';
        icon.textContent = ' (öffnet in neuem Fenster)';
        link.appendChild(icon);
      }
    }
  });
}

// ==========================================================================
// Initialisierung
// ==========================================================================

function init() {
  console.log('Transparentes Villach - Website geladen');
  
  // Mobile Navigation initialisieren
  new MobileNavigation();
  
  // Active Page hervorheben
  highlightActivePage();
  
  // Skip Links initialisieren
  initSkipLinks();
  
  // Externe Links behandeln
  handleExternalLinks();
  
  // Service Worker für PWA (optional, später)
  // if ('serviceWorker' in navigator) {
  //   navigator.serviceWorker.register('/sw.js');
  // }
}

// Warte auf DOM-Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export für potenzielle Verwendung in anderen Modulen
export { MobileNavigation, highlightActivePage, initSkipLinks, handleExternalLinks };
