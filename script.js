/**
 * Sārvatt - Best Gujarati Restaurant
 * Interactive JavaScript for Navigation, Lightbox, Form Validation & Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initLightbox();
  initScrollSpy();
  initDynamicYear();
  initVideoInteractions();
});

/* ==========================================================================
   MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('mobile-close');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   INTERACTIVE GALLERY LIGHTBOX
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!modal || !imgEl || !captionEl) return;

  const triggers = Array.from(document.querySelectorAll('[data-lightbox]'));
  let currentIndex = 0;

  function showImage(index) {
    if (index < 0) index = triggers.length - 1;
    if (index >= triggers.length) index = 0;
    currentIndex = index;

    const targetTrigger = triggers[currentIndex];
    const src = targetTrigger.getAttribute('data-lightbox');
    const caption = targetTrigger.getAttribute('data-caption') || '';

    imgEl.src = src;
    captionEl.textContent = caption;
  }

  function openLightbox(index) {
    showImage(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggers.forEach((trigger, idx) => {
    trigger.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  // Background click to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });

  // Touch Swipe navigation for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showImage(currentIndex - 1); // Swipe right -> previous
      } else {
        showImage(currentIndex + 1); // Swipe left -> next
      }
    }
  }
}

/* ==========================================================================
   SCROLL SPY & STICKY HEADER
   ========================================================================== */
function initScrollSpy() {
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Header elevation on scroll
    if (header) {
      if (scrollPos > 40) {
        header.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      }
    }

    // Active link highlighting
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   DYNAMIC COPYRIGHT YEAR
   ========================================================================== */
function initDynamicYear() {
  const el = document.getElementById('current-year');
  if (el) {
    el.textContent = new Date().getFullYear().toString();
  }
}

/* ==========================================================================
   VIDEO PLAYER ENHANCEMENTS
   ========================================================================== */
function initVideoInteractions() {
  const player = document.getElementById('sarvatt-video-player');
  if (!player) return;

  // Autoplay pause when scrolled out of view to preserve resources
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting && !player.paused) {
        player.pause();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(player);
}

/* ==========================================================================
   RESERVATION FORM SUBMISSION SIMULATION
   ========================================================================== */
window.handleReservationSubmit = function(form) {
  const name = form.name.value;
  const guests = form.guests.value;
  const date = form.date.value;
  const time = form.time.value;

  const formCard = document.getElementById('reservation-form');
  const successBox = document.getElementById('reservation-success-box');
  const messageText = document.getElementById('success-message-text');

  if (formCard && successBox && messageText) {
    formCard.style.display = 'none';
    successBox.style.display = 'block';
    messageText.textContent = `A table request for ${name} (${guests} Guests on ${date} for ${time}) has been registered with Sārvatt dining concierge at Hyatt Regency Ahmedabad. You will receive an immediate confirmation SMS and call.`;
  }
};

window.resetReservationForm = function() {
  const formCard = document.getElementById('reservation-form');
  const successBox = document.getElementById('reservation-success-box');
  if (formCard && successBox) {
    formCard.reset();
    formCard.style.display = 'flex';
    successBox.style.display = 'none';
  }
};
