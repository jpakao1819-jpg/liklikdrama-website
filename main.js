// Main Script for LiklikDrama Website

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');
const navSelect = document.getElementById('navSelect');

if (hamburger) {
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
      this.value = ''; // Reset select
    }
  });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function() {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
  });
});

// Scroll Progress Indicator
window.addEventListener('scroll', function() {
  const scrollProgress = document.querySelector('.scroll-progress');
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / height) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Custom Cursor
const customCursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', function(e) {
  customCursor.style.left = e.clientX + 'px';
  customCursor.style.top = e.clientY + 'px';
});

// Hover effect on interactive elements
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
  element.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
});

// Loading Screen
window.addEventListener('load', function() {
  const loadingScreen = document.querySelector('.loading-screen');
  setTimeout(() => {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 800);
  }, 1500);
});

// Fade-in Animation on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(element => {
  observer.observe(element);
});

// Episode Selector Script
const episodeButtons = document.querySelectorAll('.episode-btn');
const mainVideo = document.getElementById('main-video');
const episodeTitle = document.getElementById('episode-title');
const episodeDescription = document.getElementById('episode-description');

if (episodeButtons.length > 0) {
  episodeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const videoSrc = this.getAttribute('data-video');
      const title = this.getAttribute('data-title');
      const description = this.getAttribute('data-description');

      // Update active button
      episodeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Update video player
      if (videoSrc) {
        mainVideo.src = videoSrc;
        mainVideo.load();
      } else {
        mainVideo.src = '';
        mainVideo.load();
      }

      // Update title and description
      if (episodeTitle) {
        episodeTitle.textContent = title;
      }
      if (episodeDescription) {
        episodeDescription.textContent = description;
      }

      // Scroll to video player
      if (mainVideo) {
        mainVideo.parentElement.parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

// Form Handling (if needed for Updates page)
const storyForm = document.getElementById('storyForm');
if (storyForm) {
  storyForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simulate form submission
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
    const wordCount = this.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    const wordCountElement = document.querySelector('.word-count');
    if (wordCountElement) {
      wordCountElement.textContent = `Word count: ${wordCount}`;
      if (wordCount >= 500 && wordCount <= 2000) {
        wordCountElement.classList.remove('invalid');
        wordCountElement.classList.add('valid');
      } else if (wordCount > 0) {
        wordCountElement.classList.remove('valid');
        wordCountElement.classList.add('invalid');
      }
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

// Video player error handling
if (mainVideo) {
  mainVideo.addEventListener('error', function() {
    console.log('Video not available');
    const container = this.parentElement;
    container.innerHTML = '<p style="text-align: center; padding: 2rem; color: #FFD700;">Video not available</p>';
  });
}
