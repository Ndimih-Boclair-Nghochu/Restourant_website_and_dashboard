/* ==================== MOBILE RESPONSIVE HELPERS ==================== */

document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    
    if (!sidebar || !header) return;
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = '☰';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('title', 'Toggle navigation');
    
    // Insert hamburger at the start of header
    header.insertBefore(hamburger, header.firstChild);
    
    // Hamburger click handler - toggle sidebar open class
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebar.classList.toggle('sidebar-open');
        hamburger.innerHTML = sidebar.classList.contains('sidebar-open') ? '✕' : '☰';
        
        // Show/hide body scroll when sidebar open
        if (sidebar.classList.contains('sidebar-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close sidebar when clicking on a nav button
    const navBtns = sidebar.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                sidebar.classList.remove('sidebar-open');
                hamburger.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth < 768 && sidebar.classList.contains('sidebar-open')) {
            // If click is not inside sidebar and not on hamburger, close sidebar
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                sidebar.classList.remove('sidebar-open');
                hamburger.innerHTML = '☰';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Close sidebar on resize if widening to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && sidebar.classList.contains('sidebar-open')) {
            sidebar.classList.remove('sidebar-open');
            hamburger.innerHTML = '☰';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Touch-friendly improvements
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
