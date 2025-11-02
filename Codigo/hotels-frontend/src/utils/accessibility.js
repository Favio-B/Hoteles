// Utilidades de accesibilidad

// Focus management
export const focusManagement = {
  // Trap focus dentro de un modal
  trapFocus: (element) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => element.removeEventListener('keydown', handleTabKey);
  },

  // Restore focus when modal closes
  restoreFocus: (previousElement) => {
    if (previousElement && typeof previousElement.focus === 'function') {
      previousElement.focus();
    }
  }
};

// ARIA utilities
export const ariaUtils = {
  // Announce changes to screen readers
  announce: (message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },

  // Update ARIA labels dynamically
  updateAriaLabel: (element, newLabel) => {
    if (element) {
      element.setAttribute('aria-label', newLabel);
    }
  },

  // Toggle ARIA expanded state
  toggleExpanded: (element, isExpanded) => {
    if (element) {
      element.setAttribute('aria-expanded', isExpanded.toString());
    }
  }
};

// Keyboard navigation
export const keyboardNavigation = {
  // Handle arrow key navigation
  handleArrowKeys: (elements, currentIndex, direction) => {
    const newIndex = direction === 'up' 
      ? Math.max(0, currentIndex - 1)
      : Math.min(elements.length - 1, currentIndex + 1);
    
    elements[newIndex]?.focus();
    return newIndex;
  },

  // Handle Enter and Space key activation
  handleActivation: (element, callback) => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        callback();
      }
    };

    element.addEventListener('keydown', handleKeyDown);
    
    return () => element.removeEventListener('keydown', handleKeyDown);
  }
};

// Color contrast utilities
export const colorContrast = {
  // Calculate relative luminance
  getLuminance: (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  },

  // Calculate contrast ratio
  getContrastRatio: (color1, color2) => {
    const lum1 = colorContrast.getLuminance(...color1);
    const lum2 = colorContrast.getLuminance(...color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  },

  // Check if contrast meets WCAG standards
  meetsWCAG: (color1, color2, level = 'AA') => {
    const ratio = colorContrast.getContrastRatio(color1, color2);
    return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
  }
};

// Screen reader utilities
export const screenReaderUtils = {
  // Hide content from screen readers
  hideFromScreenReader: (element) => {
    if (element) {
      element.setAttribute('aria-hidden', 'true');
    }
  },

  // Show content to screen readers
  showToScreenReader: (element) => {
    if (element) {
      element.removeAttribute('aria-hidden');
    }
  },

  // Create screen reader only text
  createScreenReaderText: (text) => {
    const element = document.createElement('span');
    element.className = 'sr-only';
    element.textContent = text;
    return element;
  }
};

// Form accessibility
export const formAccessibility = {
  // Add error messages with proper ARIA
  addErrorMessage: (field, message) => {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = errorId;
      errorElement.className = 'error-message';
      errorElement.setAttribute('role', 'alert');
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorId);
  },

  // Remove error messages
  removeErrorMessage: (field) => {
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
      errorElement.remove();
    }
    
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  },

  // Validate form accessibility
  validateFormAccessibility: (form) => {
    const requiredFields = form.querySelectorAll('[required]');
    const errors = [];

    requiredFields.forEach(field => {
      if (!field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')) {
        errors.push(`Field ${field.name || field.id} needs accessible label`);
      }
    });

    return errors;
  }
};

// Initialize accessibility features
export const initAccessibility = () => {
<<<<<<< HEAD
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Saltar al contenido principal';
  skipLink.className = 'skip-link';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Add main landmark
=======
  // Skip link deshabilitado por requerimiento de UI
  // Mantener landmarks ARIA sin mostrar enlace visual
>>>>>>> 80d62c4 (Commit 4)
  const main = document.querySelector('main');
  if (main) {
    main.id = 'main-content';
    main.setAttribute('role', 'main');
  }

  // Add navigation landmark
  const nav = document.querySelector('nav');
  if (nav) {
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navegación principal');
  }
};
