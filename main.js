// Main Script for LiklikDrama Website
'use strict';

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const navSelect = document.getElementById('navSelect');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
}

// Navigation Select Dropdown
if (navSelect) {
  navSelect.addEventListener('change', function() {
    if (this.value) {
      window.location.href = this.value;
      this.value = '';
    }
  });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    if (hamburger) hamburger.classList.remove('active');
    if (mainNav) mainNav.classList.remove('active');
  });
});

// Throttle helper
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) { last = now; fn.apply(this, args); }
  };
}

// Scroll Progress Indicator
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  window.addEventListener('scroll', throttle(function() {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) scrollProgress.style.width = (window.scrollY / height * 100) + '%';
  }, 50));
}

// Custom Cursor - desktop only, hidden on touch devices
const customCursor = document.querySelector('.custom-cursor');
const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
if (customCursor) {
  if (isTouchDevice) {
    customCursor.style.display = 'none';
  } else {
    document.addEventListener('mousemove', throttle(function(e) {
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    }, 16));

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
    });
  }
}

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  if (!loadingScreen) return;
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => { loadingScreen.style.display = 'none'; }, 800);
  }, 1500);
});

// Fade-in Animation on Scroll
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, observerOptions);
  document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));
}

// Episode Selector
const episodeButtons = document.querySelectorAll('.episode-btn');
const mainVideo = document.getElementById('main-video');
const episodeTitle = document.getElementById('episode-title');
const episodeDescription = document.getElementById('episode-description');

if (episodeButtons.length > 0 && mainVideo) {
  episodeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const videoSrc = this.getAttribute('data-video');
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');

      episodeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      mainVideo.src = videoSrc || '';
      mainVideo.load();

      if (episodeTitle) episodeTitle.textContent = title;
      if (episodeDescription) episodeDescription.textContent = description;
      mainVideo.closest('section')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

// Video error handling
if (mainVideo) {
  mainVideo.addEventListener('error', function() {
    const container = this.parentElement;
    if (container) container.innerHTML = '<p style="text-align:center;padding:2rem;color:#FFD700">Video not available</p>';
  });
}

// Form Handling
const storyForm = document.getElementById('storyForm');
if (storyForm) {
  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    setTimeout(() => {
      alert('Thank you for your submission!');
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      this.reset();
    }, 2000);
  });
}

// Word count validation
const textarea = document.querySelector('#storyForm textarea');
if (textarea) {
  textarea.addEventListener('input', function() {
    const wordCount = this.value.trim().split(/\s+/).filter(w => w.length > 0).length;
    const wordCountEl = document.querySelector('.word-count');
    if (wordCountEl) {
      wordCountEl.textContent = 'Word count: ' + wordCount;
      wordCountEl.classList.toggle('valid', wordCount >= 500 && wordCount <= 2000);
      wordCountEl.classList.toggle('invalid', wordCount > 0 && !(wordCount >= 500 && wordCount <= 2000));
    }
  });
}

// Active page highlighting
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});
