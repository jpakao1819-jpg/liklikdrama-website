// ========================================
// LIKLIKDRAMA PREMIUM 50000 PROJECT SCRIPT
// ========================================

// 3D Opening Animation
function initOpeningAnimation() {
    const openingAnimation = document.getElementById('openingAnimation');
    const particlesContainer = document.getElementById('openingParticles');
    
    if (openingAnimation && particlesContainer) {
        // Create explosion particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'opening-particle';
            
            // Random position around center
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
        
        // Hide opening animation after 4 seconds
        setTimeout(() => {
            openingAnimation.classList.add('fade-out');
            
            // Remove from DOM after fade out
            setTimeout(() => {
                openingAnimation.style.display = 'none';
            }, 1000);
        }, 4000);
    }
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize opening animation immediately
    initOpeningAnimation();
    
    // Premium smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Premium video background optimization
    const video = document.querySelector('.background-video');
    if (video) {
        // Ensure video plays with premium settings
        video.play().catch(function(error) {
            console.log('Premium video autoplay failed:', error);
            // Fallback: show poster image
            video.style.display = 'none';
        });
        
        // Premium video performance optimization
        video.addEventListener('loadeddata', function() {
            console.log('Premium video loaded successfully');
            // Apply premium filters
            video.style.filter = 'brightness(0.9) contrast(1.3) saturate(1.2)';
        });
    }

    // Premium parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = heroSection ? heroSection.offsetTop : 0;
        
        if (heroSection && scrolled < parallax + heroSection.offsetHeight) {
            const speed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * speed}px)`;
        }
    });

    // Premium content bubble animations
    const contentBubbles = document.querySelectorAll('.content-bubble');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }
        });
    }, observerOptions);

    contentBubbles.forEach(bubble => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'translateY(30px) scale(0.95)';
        bubble.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(bubble);
    });

    // Premium navigation scroll effect
    const mainNav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            mainNav.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.98), rgba(10, 10, 26, 0.98), rgba(0, 5, 20, 0.98))';
            mainNav.style.border = '2px solid rgba(255, 215, 0, 0.4)';
        } else {
            mainNav.style.background = 'linear-gradient(135deg, #000000, #0a0a1a, #000514)';
            mainNav.style.border = '2px solid rgba(255, 215, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });

    // Premium hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .content-bubble, .nav-link');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Premium logo hover effect
    const logo = document.querySelector('.logo-image');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.filter = 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))';
        });
    }

    // Premium footer links smooth scroll
    const footerLinks = document.querySelectorAll('.footer-section a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Premium decorative elements animation
    const decorativeElements = document.querySelectorAll('.decorative-element');
    decorativeElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = `translate(0, 0) scale(1.5) rotate(${index * 72}deg)`;
            this.style.opacity = '1';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.opacity = '';
        });
    });

    // Premium 3D Drama logo interaction
    const dramaLogo = document.querySelector('.drama-logo-3d');
    if (dramaLogo) {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
            
            dramaLogo.style.transform = `perspective(1000px) rotateY(${mouseX}deg) rotateX(${-mouseY}deg)`;
        });
    }

    // Premium performance optimization - Debounce scroll events
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

    // Apply debounce to scroll events
    const debouncedScroll = debounce(function() {
        // Premium scroll-based animations here
        const scrolled = window.pageYOffset;
        
        // Premium parallax for decorative elements
        decorativeElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) scale(1)`;
        });
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Premium loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Premium keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Premium touch support for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Premium touch gestures
        let touchStartX = 0;
        let touchStartY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchmove', function(e) {
            if (!touchStartX || !touchStartY) return;
            
            let touchEndX = e.touches[0].clientX;
            let touchEndY = e.touches[0].clientY;
            
            let dx = touchStartX - touchEndX;
            let dy = touchStartY - touchEndY;
            
            // Premium swipe detection
            if (Math.abs(dx) > Math.abs(dy)) {
                if (dx > 0) {
                    // Swipe left - premium action
                    console.log('Premium swipe left detected');
                } else {
                    // Swipe right - premium action
                    console.log('Premium swipe right detected');
                }
            }
        });
    }

    // Premium error handling
    window.addEventListener('error', function(e) {
        console.log('Premium error caught:', e.error);
        // Premium fallback for critical errors
        if (e.error && e.error.message && e.error.message.includes('video')) {
            const videoContainer = document.querySelector('.video-background');
            if (videoContainer) {
                videoContainer.style.background = 'linear-gradient(135deg, #191970, #000033, #0a0a2e)';
            }
        }
    });

    console.log('🌟 LiklikDrama Premium $50,000 website loaded successfully!');
});

// ========================================
// PREMIUM UTILITY FUNCTIONS
// ========================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Premium fade-in animation with enhanced effects
function fadeIn(element, duration = 800) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px) scale(0.95)';
    element.style.transition = `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
    
    setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) scale(1)';
    }, 100);
}

// Premium smooth scroll to top function with enhanced easing
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Premium animation frame optimization with performance tracking
function animateWithRAF(callback) {
    let ticking = false;
    let lastTime = 0;
    
    return function(timestamp) {
        if (!ticking) {
            if (timestamp - lastTime >= 16) {
                requestAnimationFrame(callback);
                ticking = true;
                lastTime = timestamp;
                
                setTimeout(() => {
                    ticking = false;
                }, 16);
            }
        }
    };
}

// Premium performance monitoring with detailed metrics
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        const domReady = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const firstPaint = window.performance.timing.firstPaint || 0;
        
        console.log(`🚀 Premium Performance Metrics:`);
        console.log(`   Total Load Time: ${loadTime}ms`);
        console.log(`   DOM Ready Time: ${domReady}ms`);
        console.log(`   First Paint: ${firstPaint}ms`);
        
        // Premium performance badge
        if (loadTime < 2000) {
            console.log(`⭐ Excellent Performance!`);
        } else if (loadTime < 3000) {
            console.log(`✅ Good Performance!`);
        } else {
            console.log(`⚠️ Performance could be optimized`);
        }
    }
}

// Premium scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, rgba(255, 215, 0, 0.8), rgba(229, 228, 226, 0.8));
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / height) * 100;
        progressBar.style.width = progress + '%';
    });
}

// Premium theme switcher (bonus feature)
function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.8);
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(180deg)';
        this.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.5)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
    });
    
    let isDarkTheme = true;
    themeToggle.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        this.innerHTML = isDarkTheme ? '🌙' : '☀️';
        
        if (!isDarkTheme) {
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
            document.querySelectorAll('video, img').forEach(el => {
                el.style.filter = 'invert(1) hue-rotate(180deg)';
            });
        } else {
            document.body.style.filter = '';
            document.querySelectorAll('video, img').forEach(el => {
                el.style.filter = '';
            });
        }
    });
    
    document.body.appendChild(themeToggle);
}

// Premium particle system for decorative elements
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${10 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 10}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Premium cursor trail effect
function initCursorTrail() {
    const trail = [];
    const maxTrailLength = 10;
    
    document.addEventListener('mousemove', function(e) {
        if (trail.length >= maxTrailLength) {
            const oldTrail = trail.shift();
            if (oldTrail) oldTrail.remove();
        }
        
        const trailElement = document.createElement('div');
        trailElement.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent);
            border-radius: 50%;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            pointer-events: none;
            z-index: 9998;
            animation: trailFade 1s ease-out forwards;
        `;
        
        document.body.appendChild(trailElement);
        trail.push(trailElement);
        
        setTimeout(() => {
            trailElement.remove();
            const index = trail.indexOf(trailElement);
            if (index > -1) trail.splice(index, 1);
        }, 1000);
    });
    
    // Add trail animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes trailFade {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Premium sound effects (optional enhancement)
function initSoundEffects() {
    const sounds = {
        hover: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'),
        click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT')
    };
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            try { sounds.hover.play().catch(() => {}); } catch(e) {}
        });
        
        element.addEventListener('click', () => {
            try { sounds.click.play().catch(() => {}); } catch(e) {}
        });
    });
}

// Premium analytics tracking
function initAnalytics() {
    // Track page views
    console.log('📊 Premium Analytics: Page view tracked');
    
    // Track user interactions
    document.addEventListener('click', function(e) {
        const element = e.target;
        const tagName = element.tagName;
        const className = element.className;
        const id = element.id;
        
        console.log(`📊 Premium Analytics: Click on ${tagName}${className ? '.' + className : ''}${id ? '#' + id : ''}`);
    });
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercentage = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercentage > maxScroll) {
            maxScroll = scrollPercentage;
            if (maxScroll % 25 === 0) {
                console.log(`📊 Premium Analytics: User scrolled to ${maxScroll}%`);
            }
        }
    });
}

// Premium lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Premium notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.8)' : type === 'error' ? 'rgba(255, 0, 0, 0.8)' : 'rgba(0, 128, 255, 0.8)'};
        color: white;
        border-radius: 10px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        z-index: 10000;
        animation: notificationSlide 0.5s ease-out;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'notificationSlideOut 0.5s ease-in';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
    
    // Add notification animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes notificationSlide {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes notificationSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all premium features
function initPremiumFeatures() {
    initScrollProgress();
    initThemeSwitcher();
    initParticleSystem();
    initCursorTrail();
    initSoundEffects();
    initAnalytics();
    initLazyLoading();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('🌟 Welcome to LiklikDrama Premium!', 'success');
    }, 1000);
}

// Initialize premium features when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumFeatures);
} else {
    initPremiumFeatures();
}
