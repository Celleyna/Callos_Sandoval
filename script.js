// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + (current % 1 > 0.5 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '%';
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in class to elements
    document.querySelectorAll('.story-card, .future-card, .impact-stats, .impact-text').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialize counters
    animateCounters();
    
    // Video background handling
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => console.log('Autoplay prevented'));
        });
    }
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Card hover effects
document.querySelectorAll('.story-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const avatar = card.querySelector('.card-avatar img');
        avatar.style.transform = 'scale(1.1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const avatar = card.querySelector('.card-avatar img');
        avatar.style.transform = 'scale(1)';
    });
});

// Play button hover
document.querySelectorAll('.avatar-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        // Simulate video play
        overlay.innerHTML = '<i class="fas fa-pause"></i>';
        setTimeout(() => {
            overlay.innerHTML = '<i class="fas fa-play"></i>';
        }, 2000);
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        subtitle.textContent = '';
        setTimeout(() => typeWriter(subtitle, originalText, 50), 1000);
    }
});

// Performance optimization - throttle scroll events
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
    }
}

window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations can be added here
}, 16));

// PWA-like features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Focus management for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid var(--violet-primary)';
    });
    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});
// Add this to your existing script.js for enhanced story section

// Special animation for Ma'am Jonabelle's education badges
function animateEducationBadges() {
    const badges = document.querySelectorAll('.edu-badge');
    badges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Enhanced story card interaction
document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
    
    // Initialize education badges animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateEducationBadges();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const storySection = document.querySelector('#stories');
    if (storySection) {
        observer.observe(storySection);
    }
    
    // Quote reveal animation
    const storyCard = document.querySelector('.full-width');
    if (storyCard) {
        const paragraphs = storyCard.querySelectorAll('p');
        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateX(-30px)';
        });
        
        const revealParagraphs = () => {
            paragraphs.forEach((p, index) => {
                setTimeout(() => {
                    p.style.transition = 'all 0.8s ease';
                    p.style.opacity = '1';
                    p.style.transform = 'translateX(0)';
                }, index * 300);
            });
        };
        
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    revealParagraphs();
                    storyObserver.unobserve(entry.target);
                }
            });
        });
        
        storyObserver.observe(storyCard);
    }
});
