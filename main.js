// LiklikDrama Website - Main JavaScript

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 2000);
    }
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Scroll-triggered Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Navigation Active State
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled * 0.002);
    }
});

// Form Handling
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        const mailtoLink = `mailto:info@liklikmedia.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
    });
}

// Mobile Menu Toggle (for future enhancement)
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Video Autoplay Handling
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.addEventListener('canplay', () => {
        video.play().catch(e => {
            console.log('Autoplay prevented:', e);
        });
    });
});

// Dynamic Year in Footer
const yearElements = document.querySelectorAll('.footer-bottom p');
yearElements.forEach(el => {
    if (el.textContent.includes('©')) {
        const currentYear = new Date().getFullYear();
        el.textContent = el.textContent.replace('2024', currentYear);
    }
});

// Add loading class to body for CSS transitions
document.body.classList.add('loaded');

// Performance Optimization: Debounce Resize Events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Handle resize-dependent logic here
    }, 250);
});

// Console Welcome Message
console.log('%c LiklikDrama ', 'background: #FFD700; color: #000000; font-size: 20px; font-weight: bold;');
console.log('%c Local Faces. Real Sales. Real Stories. ', 'color: #FFD700; font-size: 14px;');

// Episode Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const episodeBtns = document.querySelectorAll('.episode-btn');
    const mainVideo = document.getElementById('main-video');
    const episodeTitle = document.getElementById('episode-title');
    const episodeDescription = document.getElementById('episode-description');
    
    if (episodeBtns.length > 0) {
        episodeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                episodeBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get episode data
                const title = this.getAttribute('data-title');
                const description = this.getAttribute('data-description');
                const video = this.getAttribute('data-video');
                
                // Update title and description
                episodeTitle.textContent = title;
                episodeDescription.textContent = description;
                
                // Update video if available
                if (video) {
                    mainVideo.src = video;
                    mainVideo.load();
                    mainVideo.play().catch(e => {
                        console.log('Autoplay prevented:', e);
                    });
                } else {
                    // Show message for coming soon episodes
                    episodeDescription.textContent = description + ' - Coming soon on social media';
                }
            });
        });
    }
});
