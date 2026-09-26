/**
 * Modern Website Starter JavaScript
 * Clean, lightweight, modular event handling and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initScrollSpy();
  initLightbox();
  initDynamicYear();
});

/* ==========================================================================
   1. STICKY HEADER ELEVATION
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ==========================================================================
   2. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-nav-drawer');
  if (!menuBtn || !drawer) return;

  const toggleMenu = () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!isExpanded));
    drawer.classList.toggle('active');
    drawer.setAttribute('aria-hidden', String(isExpanded));
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close drawer when any mobile link is clicked
  const mobileLinks = drawer.querySelectorAll('.mobile-nav-link, .btn');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
}

/* ==========================================================================
   3. SCROLL SPY & SMOOTH NAVIGATION
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. LIGHTBOX / MODAL CONTROLLER
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalTitle = document.getElementById('lightbox-title');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  if (!modal) return;

  const triggers = document.querySelectorAll('[data-lightbox]');

  const openModal = (title, desc) => {
    if (modalTitle) modalTitle.textContent = title;
    if (modalCaption) modalCaption.textContent = desc;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const title = trigger.getAttribute('data-title') || 'Feature Preview';
      const desc = trigger.getAttribute('data-desc') || 'Expanded view of the selected component.';
      openModal(title, desc);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   5. CONTACT FORM HANDLER
   ========================================================================== */
window.handleContactSubmit = function(form) {
  const formCard = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-success-box');
  if (formCard && successBox) {
    formCard.style.display = 'none';
    successBox.style.display = 'block';
  }
};

window.resetContactForm = function() {
  const formCard = document.getElementById('contact-form');
  const successBox = document.getElementById('contact-success-box');
  if (formCard && successBox) {
    formCard.reset();
    formCard.style.display = 'flex';
    successBox.style.display = 'none';
  }
};

/* ==========================================================================
   6. DYNAMIC CURRENT YEAR
   ========================================================================== */
function initDynamicYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }
}
