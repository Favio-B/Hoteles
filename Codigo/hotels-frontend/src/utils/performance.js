// Utilidades de optimización de performance

// Lazy loading de imágenes
export const lazyLoadImage = (img) => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    imageObserver.observe(img);
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    img.src = img.dataset.src;
    img.classList.add('loaded');
  }
};

// Debounce para búsquedas
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle para scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Memoización simple
export const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Preload de recursos críticos
export const preloadCriticalResources = () => {
  const criticalImages = [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Optimización de scroll
export const optimizeScroll = () => {
  let ticking = false;
  
  const updateScrollPosition = () => {
    // Aquí se pueden agregar optimizaciones de scroll
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollPosition);
      ticking = true;
    }
  };

  window.addEventListener('scroll', requestTick, { passive: true });
};

// Cleanup de event listeners
export const cleanupEventListeners = (element, events) => {
  events.forEach(event => {
    element.removeEventListener(event.type, event.handler);
  });
};

// Performance monitoring
export const performanceMonitor = {
  start: (name) => {
    performance.mark(`${name}-start`);
  },
  
  end: (name) => {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = performance.getEntriesByName(name)[0];
    console.log(`${name}: ${measure.duration.toFixed(2)}ms`);
    
    return measure.duration;
  }
};

// Resource hints
export const addResourceHints = () => {
  // DNS prefetch para APIs externas
  const dnsPrefetch = document.createElement('link');
  dnsPrefetch.rel = 'dns-prefetch';
  dnsPrefetch.href = '//images.unsplash.com';
  document.head.appendChild(dnsPrefetch);

  // Preconnect para recursos críticos
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://images.unsplash.com';
  document.head.appendChild(preconnect);
};
