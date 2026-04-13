// LiklikDrama Website - Complete JavaScript

// Global variables
let resizeTimer;

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
    initWebsite();
});

// Main initialization function
function initWebsite() {
    initOpeningAnimation();
    initVideoBackground();
    initHeaderScroll();
    initScrollEffects();
    initHoverEffects();
    initImageLoading();
    initKeyboardNavigation();
    initAccessibility();
    initPerformanceOptimizations();
    initIntersectionObserver();
    initClickEffects();
    initTouchSupport();
    initNavigation();
    initProductionFeatures();
    initInteractionFeatures();
    initAboutFeatures();
    initResizeHandling();
    initDebugMode();
}

// 3D Opening Animation (Home section only)
function initOpeningAnimation() {
    const openingAnimation = document.getElementById('openingAnimation');
    const particlesContainer = document.getElementById('openingParticles');
    
    if (openingAnimation && particlesContainer) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'opening-particle';
            const angle = (Math.PI * 2 * i) / 50;
            const distance = 200 + Math.random() * 300;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            particle.style.setProperty('--x', x + 'px');
            particle.style.setProperty('--y', y + 'px');
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.animationDelay = Math.random() * 0.5 + 's';
            particlesContainer.appendChild(particle);
        }
        
        setTimeout(() => {
            openingAnimation.classList.add('fade-out');
            setTimeout(() => {
                openingAnimation.style.display = 'none';
            }, 1000);
        }, 4000);
    }
}

// Video Background Controls (Home section only)
function initVideoBackground() {
    const video = document.querySelector('.background-video');
    if (video) {
        video.muted = true;
        video.loop = true;
        video.play().catch(error => {
            console.log('Video autoplay prevented:', error);
        });
    }
}

// Header scroll behavior
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    const stickyLogo = document.getElementById('stickyLogo');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            // Hide header, show sticky logo
            header.classList.add('hidden');
            stickyLogo.classList.add('visible');
        } else {
            // Show header, hide sticky logo
            header.classList.remove('hidden');
            stickyLogo.classList.remove('visible');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navWidth = document.querySelector('.main-nav').offsetWidth;
                const targetPosition = targetSection.offsetTop - navWidth;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav based on scroll position
    window.addEventListener('scroll', updateActiveNav);
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Production page specific features
function initProductionFeatures() {
    const timelineItems = document.querySelectorAll('#production .content-bubble li');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Interaction page specific features
function initInteractionFeatures() {
    const listItems = document.querySelectorAll('#interaction .content-bubble li');
    const featureLinks = document.querySelectorAll('.feature-link');
    
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
            this.style.background = 'rgba(255, 215, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.background = 'transparent';
        });
    });
    
    featureLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification(`Opening ${this.textContent}...`, 'info');
            
            setTimeout(() => {
                showNotification(`${this.textContent} feature activated!`, 'success');
            }, 1000);
        });
    });
}

// About page specific features
function initAboutFeatures() {
    animateCounters();
    
    const teamSection = document.querySelector('#about .content-bubble h2');
    if (teamSection && teamSection.textContent.includes('Team')) {
        teamSection.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 40px rgba(255, 215, 0, 0.8)';
        });
        
        teamSection.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 30px rgba(255, 140, 0, 0.2)';
        });
    }
}

// Animated counter function (About section only)
function animateCounters() {
    const counters = [
        { element: '🏆', target: 100, suffix: '+' },
        { element: '🎬', target: 100, suffix: '+' },
        { element: '🤝', target: 50, suffix: '+' },
        { element: '📺', target: 1, suffix: '0+' },
        { element: '🌐', target: 1000, suffix: '+' },
        { element: '🎓', target: 10, suffix: '+' }
    ];
    
    counters.forEach(counter => {
        const element = Array.from(document.querySelectorAll('#about .content-bubble li')).find(li => 
            li.textContent.includes(counter.element)
        );
        
        if (element) {
            let current = 0;
            const increment = counter.target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    current = counter.target;
                    clearInterval(timer);
                }
                
                const text = element.textContent;
                const updatedText = text.replace(/\d+/, Math.floor(current));
                element.textContent = updatedText;
            }, 30);
        }
    });
}

// Scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.drama-logo-3d');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Hover effects
function initHoverEffects() {
    document.querySelectorAll('.content-bubble').forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Image loading
function initImageLoading() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            this.style.opacity = '0.5';
        });
    });
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openingAnimation = document.getElementById('openingAnimation');
            if (openingAnimation) {
                openingAnimation.style.display = 'none';
            }
        }
    });
}

// Accessibility
function initAccessibility() {
    document.querySelectorAll('.nav-link').forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `Navigate to ${link.textContent}`);
        }
    });
    
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        link.setAttribute('tabindex', '0');
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        document.body.classList.add('low-performance');
    }
    
    const criticalResources = ['Company_Logo-removebg-preview.png', 'LiklikVid.mp4'];
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = resource;
        document.head.appendChild(link);
    });
}

// Intersection observer
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-bubble').forEach(bubble => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(20px)';
        bubble.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(bubble);
    });
}

// Click effects
function initClickEffects() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('nav-link') || 
            e.target.classList.contains('social-link') || 
            e.target.classList.contains('footer-link')) {
            createParticles(e.clientX, e.clientY, 8);
        }
    });
}

// Touch support
function initTouchSupport() {
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('nav-link')) {
            e.target.style.transform = 'translateX(2px) scale(1.03)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('nav-link')) {
            setTimeout(() => {
                e.target.style.transform = 'translateX(0) scale(1)';
            }, 300);
        }
    });
}

// Resize handling
function initResizeHandling() {
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            const nav = document.querySelector('.main-nav');
            const mainContent = document.querySelector('.main-content');
            const header = document.querySelector('.main-header');
            const footer = document.querySelector('.main-footer');
            
            if (nav) {
                const navWidth = window.innerWidth < 768 ? '30px' : '40px';
                nav.style.width = navWidth;
                
                // Update margins for other elements
                if (mainContent) mainContent.style.marginLeft = navWidth;
                if (header) header.style.marginLeft = navWidth;
                if (footer) footer.style.marginLeft = navWidth;
            }
        }, 250);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 100px;
        background: var(--warm-orange);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Particle system
function createParticles(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--golden-accent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${x}px;
            top: ${y}px;
            animation: particleFloat 2s ease-out forwards;
        `;
        
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 2000);
    }
}

// Debug mode
function initDebugMode() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('LiklikDrama Debug Mode Active');
        console.log('Page Elements:', {
            nav: document.querySelector('.main-nav'),
            header: document.querySelector('.main-header'),
            footer: document.querySelector('.main-footer'),
            content: document.querySelectorAll('.content-bubble').length,
            video: document.querySelector('.background-video'),
            openingAnimation: document.getElementById('openingAnimation'),
            companyLogo: document.querySelector('.logo-image'),
            sections: document.querySelectorAll('section[id]').length
        });
    }
}

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});
