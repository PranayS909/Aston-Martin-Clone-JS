// Hero Slider Functionality
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.hero-slide');
        this.currentSlide = 0;
        this.prevBtn = document.getElementById('heroPrev');
        this.nextBtn = document.getElementById('heroNext');
        
        this.init();
    }
    
    init() {
        if (this.prevBtn && this.nextBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Auto-advance slides every 5 seconds
        this.autoPlay = setInterval(() => this.nextSlide(), 5000);
        
        // Pause auto-play on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => {
                clearInterval(this.autoPlay);
            });
            
            heroSection.addEventListener('mouseleave', () => {
                this.autoPlay = setInterval(() => this.nextSlide(), 5000);
            });
        }
    }
    
    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.showSlide(this.currentSlide);
    }
}

// Stories Slider Functionality
class StoriesSlider {
    constructor() {
        this.track = document.getElementById('storiesTrack');
        this.prevBtn = document.getElementById('storiesPrev');
        this.nextBtn = document.getElementById('storiesNext');
        this.scrollAmount = 430; // Card width + gap
        
        this.init();
    }
    
    init() {
        if (this.prevBtn && this.nextBtn && this.track) {
            this.prevBtn.addEventListener('click', () => this.scrollPrev());
            this.nextBtn.addEventListener('click', () => this.scrollNext());
            
            // Update button states based on scroll position
            this.track.addEventListener('scroll', () => this.updateButtons());
            this.updateButtons();
        }
    }
    
    scrollNext() {
        if (this.track) {
            this.track.scrollBy({
                left: this.scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    
    scrollPrev() {
        if (this.track) {
            this.track.scrollBy({
                left: -this.scrollAmount,
                behavior: 'smooth'
            });
        }
    }
    
    updateButtons() {
        if (!this.track) return;
        
        const isAtStart = this.track.scrollLeft <= 0;
        const isAtEnd = this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 10;
        
        if (this.prevBtn) {
            this.prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            this.prevBtn.style.cursor = isAtStart ? 'default' : 'pointer';
        }
        
        if (this.nextBtn) {
            this.nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            this.nextBtn.style.cursor = isAtEnd ? 'default' : 'pointer';
        }
    }
}

// Mobile Menu Toggle
class MobileMenu {
    constructor() {
        this.menuToggle = document.getElementById('menuToggle');
        this.mainNav = document.querySelector('.main-nav');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.menuToggle && this.mainNav) {
            this.menuToggle.addEventListener('click', () => this.toggle());
        }
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.mainNav.style.display = 'flex';
            this.mainNav.style.position = 'fixed';
            this.mainNav.style.top = '80px';
            this.mainNav.style.left = '0';
            this.mainNav.style.right = '0';
            this.mainNav.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
            this.mainNav.style.padding = '40px';
            this.mainNav.style.zIndex = '999';
            
            const navList = this.mainNav.querySelector('.nav-list');
            if (navList) {
                navList.style.flexDirection = 'column';
                navList.style.alignItems = 'flex-start';
                navList.style.gap = '20px';
                navList.style.width = '100%';
            }
            
            // Animate menu toggle button
            const spans = this.menuToggle.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            }
        } else {
            this.mainNav.style.display = '';
            this.mainNav.style.position = '';
            this.mainNav.style.top = '';
            this.mainNav.style.left = '';
            this.mainNav.style.right = '';
            this.mainNav.style.backgroundColor = '';
            this.mainNav.style.padding = '';
            
            const navList = this.mainNav.querySelector('.nav-list');
            if (navList) {
                navList.style.flexDirection = '';
                navList.style.alignItems = '';
                navList.style.gap = '';
                navList.style.width = '';
            }
            
            // Reset menu toggle button
            const spans = this.menuToggle.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScroll > 0) {
                this.header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                this.header.style.boxShadow = 'none';
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Lazy Loading Images
class LazyLoad {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            this.images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            this.images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
}

// Animate on Scroll
class AnimateOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.model-card, .story-card, .news-card');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1
            });
            
            this.elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
        }
    }
}

// Dropdown Menu Behavior
class DropdownMenu {
    constructor() {
        this.navItems = document.querySelectorAll('.has-dropdown');
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) {
                let timeout;
                
                item.addEventListener('mouseenter', () => {
                    clearTimeout(timeout);
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                });
                
                item.addEventListener('mouseleave', () => {
                    timeout = setTimeout(() => {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                    }, 200);
                });
            }
        });
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
    new StoriesSlider();
    new MobileMenu();
    new SmoothScroll();
    new HeaderScroll();
    new LazyLoad();
    new AnimateOnScroll();
    new DropdownMenu();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Re-initialize components that need resize handling
        const storiesSlider = new StoriesSlider();
        storiesSlider.updateButtons();
    }, 250);
});

// Prevent default behavior for empty links
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && (target.getAttribute('href') === '#' || target.getAttribute('href') === '')) {
        e.preventDefault();
    }
});
