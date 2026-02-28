/* ==================== MOBILE RESPONSIVE HELPERS ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.top-nav');
    const header = document.querySelector('.header');
    
    if (!nav || !header) return;
    
    // Create hamburger button for toggling top navigation on small screens
    const hamburger = document.createElement('button');
    hamburger.className = 'nav-toggle';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('title', 'Toggle navigation');
    
    // Insert hamburger at the start of header
    header.insertBefore(hamburger, header.firstChild);
    
    // Hamburger click handler - toggle nav open class
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        nav.classList.toggle('nav-open');
        hamburger.innerHTML = nav.classList.contains('nav-open') ? '✕' : '☰';
        
        // Prevent body scroll when overlay menu open
        if (nav.classList.contains('nav-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close nav when clicking on a nav button on mobile
    const navBtns = nav.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                nav.classList.remove('nav-open');
                hamburger.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close nav when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 && nav.classList.contains('nav-open')) {
            if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
                nav.classList.remove('nav-open');
                hamburger.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Close nav on resize if widening to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth >= 768 && nav.classList.contains('nav-open')) {
                nav.classList.remove('nav-open');
                hamburger.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        }, 100);
    });
    
    // Touch-friendly improvements
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
