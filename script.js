/* ══════════════════════════════════════════════════════════
   ALDRIN B. SANTILLAN – PORTFOLIO SCRIPT
   Premium Modern Portfolio | 2026
══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Loading Screen ────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

/* ─── Dark Mode ─────────────────────────────────────────── */
const darkToggle = document.getElementById('darkToggle');
const html       = document.documentElement;

const setTheme = (theme) => {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const icon = darkToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  darkToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
};

// Load saved theme
const savedTheme = localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

darkToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ─── Navigation ────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const navItems  = document.querySelectorAll('.nav-link');

// Scroll-triggered sticky style
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  toggleBackToTop();
}, { passive: true });

// Hamburger toggle
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when link is clicked
navItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

/* ─── Typing Animation ──────────────────────────────────── */
const roles = [
  'Computer Science Student',
  'Software Developer',
  'Java Developer',
  'Web Developer',
  'OJT Candidate'
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;

const typingEl = document.getElementById('typingText');

function typeWriter() {
  if (!typingEl) return;

  const current = roles[roleIdx];

  if (!deleting) {
    typingEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; typeWriter(); }, 2200);
      return;
    }
    setTimeout(typeWriter, 65);
  } else {
    typingEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting  = false;
      roleIdx   = (roleIdx + 1) % roles.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 38);
  }
}

setTimeout(typeWriter, 1800);

/* ─── Scroll Reveal ─────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const idx      = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ─── Animated Counters ─────────────────────────────────── */
const counters     = document.querySelectorAll('.stat-num[data-target]');
let   countersRun  = false;

const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

const animateCounter = (el) => {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const start    = performance.now();

  const step = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    el.textContent = Math.round(easeOutCubic(progress) * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target + (target > 5 ? '+' : '+');
  };
  requestAnimationFrame(step);
};

const statsEl = document.querySelector('.stats-row');
if (statsEl) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersRun) {
      countersRun = true;
      counters.forEach(animateCounter);
    }
  }, { threshold: 0.4 });
  statsObserver.observe(statsEl);
}

/* ─── Skill Progress Bars ───────────────────────────────── */
const bars = document.querySelectorAll('.bar-fill[data-pct]');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-pct') + '%';
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

bars.forEach(bar => barObserver.observe(bar));

/* ─── Back to Top ───────────────────────────────────────── */
const bttBtn = document.getElementById('backToTop');

const toggleBackToTop = () => {
  if (bttBtn) bttBtn.classList.toggle('visible', window.scrollY > 400);
};

if (bttBtn) {
  bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ─── Footer Year ───────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Project Modals ────────────────────────────────────── */
const projectData = {
  banking: {
    title: 'Banking System',
    role: 'Lead Developer',
    description: 'A comprehensive banking application built with Java and MySQL, featuring a complete Swing GUI for intuitive user interaction.',
    features: [
      'User Registration & Authentication',
      'Secure Login System',
      'MySQL Database Integration',
      'Account Management (Create, Update, Delete)',
      'Transaction History & Tracking',
      'Balance Inquiry & Transfers',
      'Java Swing GUI Interface'
    ],
    tech: ['Java', 'MySQL', 'Java Swing', 'JDBC', 'OOP']
  },
  hotel: {
    title: 'Hotel Booking System',
    role: 'Lead Developer',
    description: 'A full-featured hotel management system built with Java, enabling seamless room reservations and customer relationship management.',
    features: [
      'Room Reservation & Availability',
      'Customer Profile Management',
      'Booking Confirmation System',
      'Check-in / Check-out Processing',
      'Database Integration with MySQL',
      'Invoice & Billing Generation',
      'Room Type Management'
    ],
    tech: ['Java', 'MySQL', 'Java Swing', 'JDBC']
  },
  ml: {
    title: 'Machine Learning Data Analysis',
    role: 'Data Analyst',
    description: 'A Python-based data science project exploring machine learning techniques for data preprocessing, trend prediction, and insightful visualization.',
    features: [
      'Data Cleaning & Preprocessing',
      'Exploratory Data Analysis (EDA)',
      'Trend Prediction Modeling',
      'Data Visualization (Charts & Graphs)',
      'Statistical Analysis',
      'Feature Engineering',
      'Model Evaluation & Reporting'
    ],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn']
  },
  fitness: {
    title: 'Fitness Tracker Application',
    role: 'System Architect',
    description: 'A health and fitness monitoring application designed from the ground up with SDLC planning, offering comprehensive fitness workflow management.',
    features: [
      'Fitness Activity Monitoring',
      'Health Data Tracking & Logging',
      'Workflow Design & Documentation',
      'SDLC Planning (Requirements, Design, Implementation)',
      'User Goal Setting & Tracking',
      'Progress Reports & Analytics',
      'Database-backed Persistence'
    ],
    tech: ['Java', 'MySQL', 'SDLC', 'System Design', 'OOP']
  }
};

const modal        = document.getElementById('modal');
const modalTitle   = document.getElementById('modalTitle');
const modalContent = document.getElementById('modalContent');

window.openModal = (key) => {
  const data = projectData[key];
  if (!data) return;

  modalTitle.textContent = data.title;
  modalContent.innerHTML = `
    <span style="display:inline-block;font-size:0.78rem;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--primary);background:rgba(255,107,53,0.1);padding:0.25rem 0.75rem;border-radius:50px;margin-bottom:1rem">${data.role}</span>
    <p style="font-size:0.95rem;color:var(--text-muted);margin-bottom:1.25rem;line-height:1.75">${data.description}</p>
    <strong style="font-size:0.82rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted)">Features</strong>
    <ul class="modal-feature-list">
      ${data.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
    <div style="margin-top:1.25rem">
      <strong style="font-size:0.82rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-muted)">Technologies</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.6rem">
        ${data.tech.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
  `;

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Focus trap
  setTimeout(() => modal.querySelector('.modal-close').focus(), 50);
};

window.closeModal = () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
};

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
});

/* ─── Contact Form (demo) ───────────────────────────────── */
window.submitForm = () => {
  const name    = document.getElementById('fname');
  const email   = document.getElementById('femail');
  const subject = document.getElementById('fsubject');
  const message = document.getElementById('fmessage');

  // Simple validation
  const fields = [name, email, subject, message];
  let valid = true;

  fields.forEach(field => {
    field.style.borderColor = '';
    if (!field.value.trim()) {
      field.style.borderColor = 'var(--secondary)';
      valid = false;
    }
  });

  if (!valid) return;

  // Email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.style.borderColor = 'var(--secondary)';
    return;
  }

  // Simulate submission
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  setTimeout(() => {
    document.getElementById('contactFormWrap').style.display = 'none';
    document.getElementById('formSuccess').style.display     = 'block';
  }, 1400);
};

/* ─── Smooth scroll for hash links ─────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
