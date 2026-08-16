/* ══════════════════════════════════════════
   MANASA L HEGDE — PORTFOLIO SCRIPTS
   ══════════════════════════════════════════ */

// ══════════════════════════════════════════
// EMAILJS CONFIGURATION
// Replace these placeholders with your actual EmailJS credentials:
// - EMAILJS_SERVICE_ID: Found in EmailJS dashboard -> Email Services
// - EMAILJS_TEMPLATE_ID: Found in EmailJS dashboard -> Email Templates
// - EMAILJS_PUBLIC_KEY: Found in EmailJS dashboard -> Account Settings / API Keys
// ══════════════════════════════════════════
const EMAILJS_SERVICE_ID = 'service_frf1rkf';
const EMAILJS_TEMPLATE_ID = 'template_vw1u4jn';
const EMAILJS_PUBLIC_KEY = '8XEEvoSbgmfJd84Vs';

// ── PARTICLE SYSTEM ──
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const count = window.innerWidth < 768 ? 30 : 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.hue = [270, 330, 190][Math.floor(Math.random() * 3)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < count; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(192,132,252,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── CUSTOM CURSOR ──
(function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .skill-card, .cert-card, .highlight-item, .hackathon-card, .form-input, .form-select, .form-textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ── NAV SCROLL EFFECT ──
(function initNav() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMobile() {
  if (hamburger && navLinks) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── TYPEWRITER ──
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const texts = ['Data & ML Builder', 'Python Developer', 'Cloud Enthusiast', 'Problem Solver'];
  let textIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = texts[textIdx];
    el.textContent = current.substring(0, charIdx);

    if (!deleting) {
      charIdx++;
      if (charIdx > current.length) {
        deleting = true;
        setTimeout(type, 2000);
        return;
      }
    } else {
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        textIdx = (textIdx + 1) % texts.length;
      }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 1000);
})();

// ── COUNT-UP ANIMATION ──
(function initCountUp() {
  const nums = document.querySelectorAll('.stat-num[data-count]');
  if (!nums.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const isDecimal = el.classList.contains('stat-decimal');
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = isDecimal ? value.toFixed(2) : Math.floor(value);
          if (progress < 1) requestAnimationFrame(update);
          else el.textContent = isDecimal ? target.toFixed(2) : target;
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => observer.observe(n));
})();

// ── SCROLL REVEAL ──
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

// ── SMOOTH SCROLL FOR NAV LINKS ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── PROJECT CARD GLOW FOLLOW ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const glow = card.querySelector('.project-glow');
    if (glow) {
      const x = e.clientX - rect.left - rect.width;
      const y = e.clientY - rect.top - rect.height;
      glow.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
});

// ── CONTACT FORM & EMAILJS INTEGRATION ──
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Initialize EmailJS if public key is provided
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email-input');
  const reasonInput = document.getElementById('contact-reason');
  const messageInput = document.getElementById('contact-message');
  const honeypotInput = document.getElementById('contact-honeypot');
  const submitBtn = document.getElementById('contact-submit');
  const statusDiv = document.getElementById('form-status');

  const fields = [
    { el: nameInput, errEl: document.getElementById('error-name'), validate: val => val.trim().length > 0 ? '' : 'Please enter your name.' },
    { el: emailInput, errEl: document.getElementById('error-email'), validate: val => {
        if (!val.trim()) return 'Please enter your email address.';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim()) ? '' : 'Please enter a valid email address.';
      }
    },
    { el: reasonInput, errEl: document.getElementById('error-reason'), validate: val => val ? '' : 'Please select a reason.' },
    { el: messageInput, errEl: document.getElementById('error-message'), validate: val => val.trim().length > 0 ? '' : 'Please enter your message.' }
  ];

  // Clear errors on input / change
  fields.forEach(field => {
    if (!field.el) return;
    const clearError = () => {
      field.el.classList.remove('invalid');
      if (field.errEl) {
        field.errEl.textContent = '';
        field.errEl.classList.remove('visible');
      }
    };
    field.el.addEventListener('input', clearError);
    if (field.el.tagName === 'SELECT') {
      field.el.addEventListener('change', clearError);
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot check for spam bots
    if (honeypotInput && honeypotInput.value !== '') {
      showStatus('Message sent! Thank you for reaching out.', 'success');
      form.reset();
      return;
    }

    let isValid = true;
    let firstInvalid = null;

    fields.forEach(field => {
      if (!field.el) return;
      const errorMsg = field.validate(field.el.value);
      if (errorMsg) {
        isValid = false;
        field.el.classList.add('invalid');
        if (field.errEl) {
          field.errEl.textContent = errorMsg;
          field.errEl.classList.add('visible');
        }
        if (!firstInvalid) firstInvalid = field.el;
      } else {
        field.el.classList.remove('invalid');
        if (field.errEl) {
          field.errEl.textContent = '';
          field.errEl.classList.remove('visible');
        }
      }
    });

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Submit state
    submitBtn.disabled = true;
    const origBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    statusDiv.style.display = 'none';

    // Check if EmailJS credentials are set
    const isPlaceholder = (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY');

    if (isPlaceholder || typeof emailjs === 'undefined') {
      // Demonstration / Fallback mode when user hasn't added real keys yet
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origBtnText;
        showStatus('Message sent! Thank you for reaching out.', 'success');
        form.reset();
      }, 700);
    } else {
      // Live EmailJS submission
      const templateParams = {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        reason: reasonInput.value,
        message: messageInput.value.trim()
      };

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          showStatus('Message sent! Thank you for reaching out.', 'success');
          form.reset();
        })
        .catch(err => {
          console.error('EmailJS error:', err);
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
          showStatus('Failed to send message. Please try again or email directly at manasalshegde@gmail.com.', 'error');
        });
    }
  });

  function showStatus(msg, type) {
    statusDiv.textContent = msg;
    statusDiv.className = `form-status ${type}`;
    statusDiv.style.display = 'block';
  }
})();
