// ============================================
// SANAD PLATFORM — Interactivity & Animations
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ============ MULTI-STEP ONBOARDING LOGIC ============
  const onboardingForm = document.getElementById('onboarding-main-form');
  if (onboardingForm) {
    const steps = onboardingForm.querySelectorAll('.form-section');
    const stepItems = document.querySelectorAll('.step-item');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const btnSubmit = document.getElementById('btn-submit');
    let currentStep = 0;

    // --- GLOBAL VALIDATION ---
    function validateForm(container) {
      const inputs = container.querySelectorAll('input, textarea');
      const errorMsgBox = document.getElementById('form-error-message');
      let isValid = true;
      let errorType = null; // 'missing', 'email', 'url'

      // Reset previous error highlights
      inputs.forEach(input => {
        input.style.borderColor = '';
        input.classList.remove('shake-field');
      });

      inputs.forEach(input => {
        const isRequired = input.hasAttribute('required');
        const isEmpty = !input.value.trim();
        const isEmail = input.type === 'email';
        const isUrl = input.type === 'url';

        let fieldValid = true;

        if (isRequired && isEmpty) {
          fieldValid = false;
          if (!errorType) errorType = 'missing';
        } else if (!isEmpty && isEmail && !input.checkValidity()) {
          fieldValid = false;
          if (!errorType) errorType = 'email';
        } else if (!isEmpty && isUrl && !input.checkValidity()) {
          fieldValid = false;
          if (!errorType) errorType = 'url';
        }

        if (!fieldValid) {
          isValid = false;
          input.style.borderColor = '#ff4b4b';
          
          input.addEventListener('input', () => {
            input.style.borderColor = '';
            if (errorMsgBox) {
              errorMsgBox.style.display = 'none';
              errorMsgBox.classList.remove('shake');
            }
          }, { once: true });
        }
      });

      if (!isValid) {
        if (errorMsgBox) {
          let message = 'يرجى ملء جميع الحقول المطلوبة.';
          if (errorType === 'email') message = 'يرجى كتابة بريد إلكتروني صحيح (يجب أن يحتوي على رمز @ ومزود خدمة مثل gmail.com أو hotmail.com).';
          if (errorType === 'url') message = 'يرجى إدخال رابط (URL) صحيح بدقة.';
          
          errorMsgBox.textContent = message;
          errorMsgBox.style.display = 'block';
          errorMsgBox.classList.remove('shake');
          void errorMsgBox.offsetWidth; // Force reflow
          errorMsgBox.classList.add('shake');
        }
      } else {
        if (errorMsgBox) {
          errorMsgBox.style.display = 'none';
        }
      }
      return isValid;
    }

    // Keep validateStep for backward compatibility but use global validateForm
    function validateStep(stepIndex) {
      return validateForm(steps[stepIndex]);
    }

    // --- BOOKING LOGIC ---
    const slotButtons = document.querySelectorAll('.slot-btn');
    slotButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        slotButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        // Update summary if it exists (for booking page)
        const summaryValue = document.querySelector('.summary-value:nth-child(3)');
        if (summaryValue) {
          summaryValue.textContent = btn.textContent;
        }
      });
    });

    const calendarDays = document.querySelectorAll('.calendar-day:not(.disabled)');
    calendarDays.forEach(day => {
      day.addEventListener('click', () => {
        calendarDays.forEach(d => d.classList.remove('active'));
        day.classList.add('active');
        
        // Update summary if it exists
        const summaryDate = document.querySelector('.sum-date-val'); // Let's add this class to HTML
        if (summaryDate) {
          summaryDate.textContent = day.textContent + ' فبراير 2026';
        }
      });
    });

    // Handle standard forms (Login, Messaging, etc.)
    const standardForms = document.querySelectorAll('form');
    standardForms.forEach(form => {
      if (form.closest('.steps-container')) return; // Skip onboarding as it has specialized nav
      
      form.addEventListener('submit', (e) => {
        if (!validateForm(form)) {
          e.preventDefault();
        }
      });
    });

    function updateFormSteps() {
      steps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep);
      });

      stepItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentStep);
        item.classList.toggle('completed', index < currentStep);
      });

      // Button visibility: previous button hidden on first step
      if (btnPrev) btnPrev.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
      
      // Toggle between Next and Submit buttons
      if (currentStep === steps.length - 1) {
        if (btnNext) btnNext.style.display = 'none';
        if (btnSubmit) btnSubmit.style.display = 'flex';
      } else {
        if (btnNext) btnNext.style.display = 'flex';
        if (btnSubmit) btnSubmit.style.display = 'none';
      }

      // Scroll to top of form smoothly
      const formTop = onboardingForm.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: formTop, behavior: 'smooth' });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        // Only proceed if current step is valid
        if (validateStep(currentStep)) {
          if (currentStep < steps.length - 1) {
            currentStep++;
            updateFormSteps();
          }
        }
      });
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          updateFormSteps();
        }
      });
    }

    // Generic Toggle Buttons Logic
    const toggleGroups = onboardingForm.querySelectorAll('.toggle-group');
    toggleGroups.forEach(group => {
      const btns = group.querySelectorAll('.toggle-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          // Specific Logic for Knowledge Source Toggle
          if (group.id === 'knowledge-source-toggle') {
            const source = btn.getAttribute('data-source');
            document.getElementById('template-container').style.display = source === 'template' ? 'block' : 'none';
            document.getElementById('upload-container').style.display = source === 'upload' ? 'block' : 'none';
          }
        });
      });
    });

    // Custom Dropdown (Drop List) Logic
    const customSelects = onboardingForm.querySelectorAll('.custom-select-wrapper');
    customSelects.forEach(select => {
      const trigger = select.querySelector('.custom-select-trigger');
      const options = select.querySelector('.custom-options');
      const optionItems = select.querySelectorAll('.custom-option');
      const hiddenInput = select.querySelector('input[type="hidden"]');
      const triggerSpan = trigger.querySelector('span');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close all other open dropdowns first
        customSelects.forEach(other => {
          if (other !== select) other.classList.remove('open');
        });
        select.classList.toggle('open');
        trigger.classList.toggle('active');
      });

      optionItems.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = option.getAttribute('data-value');
          const text = option.textContent;

          // Update Selection
          optionItems.forEach(opt => opt.classList.remove('selected'));
          option.classList.add('selected');
          
          triggerSpan.textContent = text;
          hiddenInput.value = val;
          
          select.classList.remove('open');
          trigger.classList.remove('active');

          // Trigger change event for validation if needed
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      customSelects.forEach(select => {
        select.classList.remove('open');
        select.querySelector('.custom-select-trigger').classList.remove('active');
      });
    });

    // Slider Value Update Logic
    const creativitySlider = document.getElementById('creativity-slider');
    const creativeValue = document.getElementById('creative-value');
    if (creativitySlider && creativeValue) {
      creativitySlider.addEventListener('input', (e) => {
        creativeValue.textContent = `${e.target.value}%`;
      });
    }

    // Schedule Holiday Toggle Logic
    const scheduleRows = onboardingForm.querySelectorAll('.schedule-row');
    scheduleRows.forEach(row => {
      const holidayCheckbox = row.querySelector('.schedule-holiday');
      const timeInputs = row.querySelectorAll('input[type="time"]');
      
      const updateRowState = () => {
        const isHoliday = holidayCheckbox.checked;
        row.classList.toggle('is-holiday', isHoliday);
        timeInputs.forEach(input => {
          input.disabled = isHoliday;
        });
      };

      holidayCheckbox.addEventListener('change', updateRowState);
      updateRowState(); // Initialize state
    });

    // Persona Selection Cards logic
    const personaCards = onboardingForm.querySelectorAll('.selection-card');
    personaCards.forEach(card => {
      card.addEventListener('click', () => {
        personaCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // Form Submission
    onboardingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Final validation before sending
      if (validateStep(currentStep)) {
        // Submission is handled entirely by React Onboarding.tsx component
      }
    });
  }

  // ============ MOBILE MENU TOGGLE ============
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });
  }

  // ============ NAVBAR SCROLL EFFECT ============
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 80) {
        navbar.style.background = 'rgba(15, 22, 33, 0.92)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
      } else {
        navbar.style.background = 'rgba(15, 22, 33, 0.7)';
        navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
      }
    }
  });

  // ============ SCROLL REVEAL ANIMATIONS ============
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedEls = document.querySelectorAll(
    '.partner-card, .step-card, .feature-item, .price-card, .section-header, .trusted-text, .whats-new-visual'
  );

  animatedEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
  });

  // Stagger delays
  document.querySelectorAll('.partner-cards .partner-card').forEach((card, i) => card.style.transitionDelay = `${i * 0.12}s`);
  document.querySelectorAll('.steps-grid .step-card').forEach((card, i) => card.style.transitionDelay = `${i * 0.12}s`);
  document.querySelectorAll('.features-list .feature-item').forEach((item, i) => item.style.transitionDelay = `${i * 0.1}s`);

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = navbar ? navbar.offsetHeight : 80;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navHeight - 20,
          behavior: 'smooth'
        });
        if (navLinks) navLinks.classList.remove('nav-open');
      }
    });
  });

});
