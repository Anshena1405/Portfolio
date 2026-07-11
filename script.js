document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------
    // 1. Theme Switcher (Dark / Light Mode)
    // -------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference in localStorage, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    if (savedTheme === 'light') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    }

    // Toggle theme on button click
    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });

    // -------------------------------------------------
    // 2. Mobile Hamburger Menu
    // -------------------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu visibility
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // -------------------------------------------------
    // 3. Navbar Sticky Adjustment
    // -------------------------------------------------
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // -------------------------------------------------
    // 4. Dynamic Footer Year
    // -------------------------------------------------
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // -------------------------------------------------
    // 5. Intersection Observer for Active Nav Links (Home Page Only)
    // -------------------------------------------------
    // Only run intersection observer if we are on index.html or the root path
    const isHomePage = window.location.pathname.endsWith('/') || 
                       window.location.pathname.endsWith('index.html') ||
                       (!window.location.pathname.includes('.html'));

    if (isHomePage) {
        const sections = document.querySelectorAll('section[id]');
        
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Triggers when section occupies central area of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        const href = link.getAttribute('href');
                        if (href === `#${id}` || href.endsWith(`#${id}`)) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });

        // Quest roadmap scroll reveal
        const questItems = document.querySelectorAll('.quest-reveal');
        if (questItems.length) {
            const questObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('quest-visible');
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.15
            });

            questItems.forEach(item => questObserver.observe(item));
        }
    }

    // -------------------------------------------------
    // 6. Lucide Icons Initialization
    // -------------------------------------------------
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // -------------------------------------------------
    // 7. Global Scroll Animations
    // -------------------------------------------------
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length > 0) {
        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-animate');
                    // Unobserve after animating once to prevent re-animating on scroll up
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -15% 0px',
            threshold: 0.1
        });

        animateElements.forEach(el => scrollObserver.observe(el));
    }
});
