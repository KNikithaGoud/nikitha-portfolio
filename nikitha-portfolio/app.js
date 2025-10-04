// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Contact form
    initContactForm();
    
    // Active section highlighting
    initActiveSection();
    
    // Mobile menu
    initMobileMenu();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(38, 40, 40, 0.98)';
            navbar.style.boxShadow = 'var(--shadow-sm)';
        } else {
            navbar.style.background = 'rgba(38, 40, 40, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }, 16));
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    // Handle all anchor links that start with #
    document.addEventListener('click', function(e) {
        const target = e.target.closest('a[href^="#"]');
        if (!target) return;
        
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .contact-item, .stat-item');
    
    // Add scroll-animate class to elements
    animateElements.forEach(element => {
        element.classList.add('scroll-animate');
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Active section highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', throttle(function() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, 16));
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous messages
        clearFormMessages();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();
        
        let hasErrors = false;
        
        // Validation
        if (!name) {
            showFormMessage('Name is required.', 'error');
            hasErrors = true;
        }
        
        if (!email) {
            showFormMessage('Email is required.', 'error');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            hasErrors = true;
        }
        
        if (!message) {
            showFormMessage('Message is required.', 'error');
            hasErrors = true;
        }
        
        if (hasErrors) {
            return;
        }
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        this.classList.add('loading');
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Clear form messages
            clearFormMessages();
            
            // Reset form
            this.reset();
            
            // Show success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            this.classList.remove('loading');
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Clear form messages
function clearFormMessages() {
    const contactForm = document.getElementById('contact-form');
    const existingMessages = contactForm.querySelectorAll('.form-message');
    existingMessages.forEach(message => message.remove());
}

// Show form message
function showFormMessage(message, type) {
    const contactForm = document.getElementById('contact-form');
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message form-${type}`;
    messageElement.textContent = message;
    
    // Add styles
    messageElement.style.padding = 'var(--space-12)';
    messageElement.style.borderRadius = 'var(--radius-base)';
    messageElement.style.marginBottom = 'var(--space-16)';
    messageElement.style.textAlign = 'center';
    messageElement.style.fontSize = 'var(--font-size-sm)';
    messageElement.style.fontWeight = 'var(--font-weight-medium)';
    
    if (type === 'success') {
        messageElement.style.background = 'rgba(var(--color-success-rgb), 0.1)';
        messageElement.style.border = '1px solid rgba(var(--color-success-rgb), 0.3)';
        messageElement.style.color = 'var(--color-success)';
    } else {
        messageElement.style.background = 'rgba(var(--color-error-rgb), 0.1)';
        messageElement.style.border = '1px solid rgba(var(--color-error-rgb), 0.3)';
        messageElement.style.color = 'var(--color-error)';
    }
    
    // Insert at the beginning of the form
    contactForm.insertBefore(messageElement, contactForm.firstChild);
    
    // Remove message after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Add interactive effects
function addInteractiveEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (hero && heroImage) {
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.3;
            
            if (scrolled < hero.offsetHeight) {
                heroImage.style.transform = `translateY(${parallax}px)`;
            }
        }, 16));
    }
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add particle effect to profile image
    createParticleEffect();
}

// Simple particle effect for profile image
function createParticleEffect() {
    const profilePlaceholder = document.querySelector('.profile-placeholder');
    if (!profilePlaceholder) return;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--color-primary)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.7';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        profilePlaceholder.appendChild(particle);
        
        // Animate particles
        const animateParticle = () => {
            const angle = (Math.PI * 2 * i) / 6;
            const radius = 160 + Math.sin(Date.now() * 0.001 + i) * 20;
            const x = Math.cos(angle + Date.now() * 0.0005) * radius;
            const y = Math.sin(angle + Date.now() * 0.0005) * radius;
            
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = `translate(${x}px, ${y}px)`;
            
            requestAnimationFrame(animateParticle);
        };
        
        animateParticle();
    }
}

// Performance optimization: Throttle scroll events
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

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Initialize additional effects after a delay
setTimeout(() => {
    addInteractiveEffects();
}, 1000);

// Add loading screen fade out
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-greeting, .hero-name, .hero-tagline, .hero-description, .hero-buttons, .social-links');
        heroElements.forEach((element, index) => {
            if (element) {
                element.style.animationDelay = `${index * 0.2}s`;
            }
        });
    }, 500);
});

// Ensure external links open in new tabs
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});