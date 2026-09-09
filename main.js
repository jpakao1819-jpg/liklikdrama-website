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

// Scroll Progress Indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Custom Cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .btn, .card, .episode-btn, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        // Touch effects for mobile
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.98)';
        });
        el.addEventListener('touchend', () => {
            el.style.transform = '';
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





// Episode Selector Functionality
document.addEventListener('DOMContentLoaded', function() {
    const episodeBtns = document.querySelectorAll('.episode-btn');
    const mainVideo = document.getElementById('main-video');
    const episodeTitle = document.getElementById('episode-title');
    const episodeDescription = document.getElementById('episode-description');
    
    if (episodeBtns.length > 0 && mainVideo) {
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

// Story Submission Modal
const openStoryModalBtn = document.getElementById('openStoryModal');
const storyModal = document.getElementById('storyModal');
const closeStoryModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const storyForm = document.getElementById('storyForm');
const storyContent = document.getElementById('storyContent');
const wordCount = document.getElementById('wordCount');

// Open modal
if (openStoryModalBtn) {
    openStoryModalBtn.addEventListener('click', () => {
        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close modal
closeStoryModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        storyModal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close modal when clicking outside
storyModal.addEventListener('click', (e) => {
    if (e.target === storyModal) {
        storyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Word count functionality
if (storyContent && wordCount) {
    storyContent.addEventListener('input', () => {
        const text = storyContent.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;
        
        // Validate word count
        if (words >= 500 && words <= 2000) {
            wordCount.classList.remove('invalid');
            wordCount.classList.add('valid');
        } else {
            wordCount.classList.remove('valid');
            wordCount.classList.add('invalid');
        }
    });
}

// Form submission
if (storyForm) {
    storyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('storyTitle').value;
        const author = document.getElementById('authorName').value;
        const email = document.getElementById('authorEmail').value;
        const language = document.getElementById('storyLanguage').value;
        const content = document.getElementById('storyContent').value;
        
        // Validate word count
        const words = content.trim().split(/\s+/).length;
        if (words < 500 || words > 2000) {
            alert('Your story must be between 500 and 2000 words. Current word count: ' + words);
            return;
        }
        
        // Create email body
        const emailBody = `Story Submission - LiklikDrama

Title: ${title}
Author: ${author}
Email: ${email}
Language: ${language}
Word Count: ${words}

Story Content:
${content}`;
        
        // Open email client
        const mailtoLink = `mailto:info@liklikmedia.com?subject=Story Submission - ${encodeURIComponent(title)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = mailtoLink;
        
        // Close modal and reset form
        storyModal.classList.remove('active');
        document.body.style.overflow = '';
        storyForm.reset();
        wordCount.textContent = '0';
        wordCount.classList.remove('valid', 'invalid');
    });
}
