/**
 * NOIR & SAGE — CONTEMPORARY DINING
 * Vanilla JavaScript Interactive Engine
 * Author / Crafted by: Rajinderjit Kaur
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. STICKY HEADER & SCROLL SPY
     ========================================================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header blur/solidify on scroll
    if (scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll spy for active navigation link
    let currentSectionId = '';
    const scrollPosition = scrollY + 120; // offset for navbar height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // Back to top click handler
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     2. SMOOTH SCROLLING FOR INTERNAL ANCHORS
     ========================================================================== */
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight - 4);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile drawer if open
        closeMobileDrawer();
      }
    });
  });

  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMobileDrawer() {
    mobileDrawer.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMobileDrawer();
      } else {
        openMobileDrawer();
      }
    });
  }

  if (drawerClose) {
    drawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeMobileDrawer);
  }

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMobileDrawer);
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      closeMobileDrawer();
    }
  });

  /* ==========================================================================
     4. SIGNATURE MENU TABS SWITCHING
     ========================================================================== */
  const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
  const menuPanels = document.querySelectorAll('.menu-category-panel');

  menuTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-category');

      // Update button state
      menuTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility with subtle cross-fade
      menuPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === `panel-${targetCategory}`) {
          panel.classList.add('active');
        }
      });
    });
  });

  /* ==========================================================================
     5. STATS NUMBER COUNTER ANIMATION
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let hasAnimatedStats = false;

  function animateCounters() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const isPlus = stat.textContent.includes('+');
      let count = 0;
      const duration = 1800; // ms
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        // Format with leading zero if single digit
        const formatted = count < 10 ? `0${Math.floor(count)}` : `${Math.floor(count)}`;
        stat.textContent = isPlus ? `${formatted}+` : formatted;
      }, stepTime);
    });
  }

  const storySection = document.getElementById('story');
  if (storySection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedStats) {
          hasAnimatedStats = true;
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    statsObserver.observe(storySection);
  }

  /* ==========================================================================
     6. SUBTLE PARALLAX ON FEATURED DISH
     ========================================================================== */
  const featuredImg = document.getElementById('featuredParallaxImg');
  const featuredSection = document.getElementById('featured-dish');

  if (featuredImg && featuredSection) {
    window.addEventListener('scroll', () => {
      const rect = featuredSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only perform calculation when section is near or in viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const offset = (rect.top / windowHeight) * 45; // Subtle 45px translation
        featuredImg.style.transform = `translateY(${offset}px) scale(1.08)`;
      }
    }, { passive: true });
  }

  /* ==========================================================================
     7. IMAGE GALLERY & FULLSCREEN LIGHTBOX
     ========================================================================== */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');

  let currentGalleryIndex = 0;
  const galleryData = [];

  // Populate gallery data
  galleryItems.forEach((item, index) => {
    galleryData.push({
      src: item.getAttribute('data-src'),
      caption: item.getAttribute('data-caption') || '',
      alt: item.querySelector('img') ? item.querySelector('img').alt : 'Noir & Sage Gallery Image'
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const item = galleryData[currentGalleryIndex];
    if (!item) return;

    // Smooth transition
    lightboxImg.style.opacity = '0';

    setTimeout(() => {
      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      lightboxCaption.textContent = item.caption;
      lightboxCounter.textContent = `${String(currentGalleryIndex + 1).padStart(2, '0')} / ${String(galleryData.length).padStart(2, '0')}`;
      lightboxImg.onload = () => {
        lightboxImg.style.opacity = '1';
      };
    }, 150);
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryData.length;
    updateLightboxContent();
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryData.length) % galleryData.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      showNextImage();
    } else if (e.key === 'ArrowLeft') {
      showPrevImage();
    }
  });

  // Mobile Touch Swipe support for Lightbox
  let touchStartX = 0;
  let touchEndX = 0;

  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxModal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleLightboxSwipe();
    }, { passive: true });

    function handleLightboxSwipe() {
      const threshold = 40;
      if (touchEndX < touchStartX - threshold) {
        showNextImage(); // Swiped left -> next image
      } else if (touchEndX > touchStartX + threshold) {
        showPrevImage(); // Swiped right -> prev image
      }
    }
  }

  /* ==========================================================================
     8. TESTIMONIAL SLIDER
     ========================================================================== */
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testiDots = document.querySelectorAll('.slider-dot');
  const testiPrev = document.getElementById('testiPrev');
  const testiNext = document.getElementById('testiNext');

  let currentSlide = 0;
  let slideInterval = null;

  function showSlide(index) {
    if (index < 0) {
      index = testimonialSlides.length - 1;
    } else if (index >= testimonialSlides.length) {
      index = 0;
    }

    currentSlide = index;

    testimonialSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    testiDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function startSlideShow() {
    stopSlideShow();
    slideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6500);
  }

  function stopSlideShow() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (testiPrev) {
    testiPrev.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startSlideShow();
    });
  }

  if (testiNext) {
    testiNext.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startSlideShow();
    });
  }

  testiDots.forEach((dot) => {
    dot.addEventListener('click', function() {
      const slideIndex = parseInt(this.getAttribute('data-slide'), 10);
      showSlide(slideIndex);
      startSlideShow();
    });
  });

  // Pause on hover & touch swipe support
  const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopSlideShow);
    sliderWrapper.addEventListener('mouseleave', startSlideShow);

    let testiTouchStartX = 0;
    let testiTouchEndX = 0;

    sliderWrapper.addEventListener('touchstart', (e) => {
      testiTouchStartX = e.changedTouches[0].screenX;
      stopSlideShow();
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      testiTouchEndX = e.changedTouches[0].screenX;
      const swipeDistance = testiTouchEndX - testiTouchStartX;
      if (swipeDistance < -40) {
        showSlide(currentSlide + 1); // Swiped left -> next
      } else if (swipeDistance > 40) {
        showSlide(currentSlide - 1); // Swiped right -> prev
      }
      startSlideShow();
    }, { passive: true });
  }

  startSlideShow();

  /* ==========================================================================
     9. RESERVATION FORM VALIDATION & HANDLING
     ========================================================================== */
  const resForm = document.getElementById('reservationForm');
  const resDateInput = document.getElementById('resDate');
  const resSuccess = document.getElementById('reservationSuccess');
  const successDetailsSummary = document.getElementById('successDetailsSummary');
  const newReservationBtn = document.getElementById('newReservationBtn');

  // Set min date to today
  if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.min = today;
    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    resDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  // Real-time helper validators
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    // Allows +91, dashes, spaces, and min 8 numbers
    const cleanPhone = phone.replace(/[\s\-\(\)\+]/g, '');
    return cleanPhone.length >= 8 && /^\d+$/.test(cleanPhone);
  }

  function setFieldError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(errorId);
    if (field) field.classList.remove('invalid');
    if (errorEl) errorEl.textContent = '';
  }

  // Clear errors on input
  ['resName', 'resEmail', 'resPhone', 'resDate', 'resTime'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => {
        clearFieldError(id, `${id.replace('res', '').toLowerCase()}Error`);
      });
      el.addEventListener('change', () => {
        clearFieldError(id, `${id.replace('res', '').toLowerCase()}Error`);
      });
    }
  });

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const nameVal = document.getElementById('resName').value.trim();
      const emailVal = document.getElementById('resEmail').value.trim();
      const phoneVal = document.getElementById('resPhone').value.trim();
      const dateVal = document.getElementById('resDate').value;
      const timeVal = document.getElementById('resTime').value;
      const guestsVal = document.getElementById('resGuests').value;
      const seatingVal = document.getElementById('resSeating').value;
      const notesVal = document.getElementById('resNotes').value.trim();

      // Validate Name
      if (nameVal.length < 2) {
        setFieldError('resName', 'nameError', 'Please provide your full name.');
        isValid = false;
      } else {
        clearFieldError('resName', 'nameError');
      }

      // Validate Email
      if (!validateEmail(emailVal)) {
        setFieldError('resEmail', 'emailError', 'Please provide a valid email address.');
        isValid = false;
      } else {
        clearFieldError('resEmail', 'emailError');
      }

      // Validate Phone
      if (!validatePhone(phoneVal)) {
        setFieldError('resPhone', 'phoneError', 'Please provide a valid contact number.');
        isValid = false;
      } else {
        clearFieldError('resPhone', 'phoneError');
      }

      // Validate Date
      if (!dateVal) {
        setFieldError('resDate', 'dateError', 'Please select a dining date.');
        isValid = false;
      } else {
        clearFieldError('resDate', 'dateError');
      }

      // Validate Time
      if (!timeVal) {
        setFieldError('resTime', 'timeError', 'Please select a preferred seating time.');
        isValid = false;
      } else {
        clearFieldError('resTime', 'timeError');
      }

      if (!isValid) {
        return;
      }

      // Format Date nicely
      const dateObj = new Date(dateVal);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);

      // Render summary
      successDetailsSummary.innerHTML = `
        <div><strong>Guest:</strong> ${escapeHtml(nameVal)} (${escapeHtml(emailVal)} · ${escapeHtml(phoneVal)})</div>
        <div><strong>Date &amp; Time:</strong> ${formattedDate} at ${escapeHtml(timeVal)}</div>
        <div><strong>Party Size:</strong> ${guestsVal} ${parseInt(guestsVal, 10) === 1 ? 'Guest' : 'Guests'} · ${escapeHtml(seatingVal)}</div>
        ${notesVal ? `<div><strong>Notes:</strong> <em>"${escapeHtml(notesVal)}"</em></div>` : ''}
      `;

      // Hide form & show success message
      resForm.style.display = 'none';
      resSuccess.classList.add('active');

      // Scroll smoothly to success message
      resSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  if (newReservationBtn) {
    newReservationBtn.addEventListener('click', () => {
      resForm.reset();
      resSuccess.classList.remove('active');
      resForm.style.display = 'block';
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ==========================================================================
     10. INTERSECTION OBSERVER SCROLL REVEAL
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});

