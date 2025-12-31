document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            header.style.padding = "10px 0";
        } else {
            header.style.boxShadow = "var(--shadow-sm)";
            header.style.padding = "0"; // Reset depends on CSS original padding
            // Actually better to let CSS handle transition or just add class
        }
    });

    // Smooth scroll for anchor links (if not supported natively)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header
                const headerHeight = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Back to Top functionality
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Auto-Scroll for News Section
    const newsWrapper = document.querySelector('.news-scroll-wrapper');
    if (newsWrapper) {
        let scrollSpeed = 0.5; // Slow smooth scroll
        let scrollInterval;
        let isPaused = false;

        function autoScroll() {
            if (!isPaused && newsWrapper) {
                // If reached bottom, reset to top
                if (newsWrapper.scrollTop + newsWrapper.clientHeight >= newsWrapper.scrollHeight - 1) {
                    newsWrapper.scrollTop = 0;
                } else {
                    newsWrapper.scrollTop += 1; // Scroll 1px
                }
            }
        }

        // Set interval for scrolling
        scrollInterval = setInterval(autoScroll, 50); // Adjust speed here (lower ms = faster)

        // Pause on hover
        newsWrapper.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        // Resume on mouse leave
        newsWrapper.addEventListener('mouseleave', () => {
            isPaused = false;
        });
    }
});
