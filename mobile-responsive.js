/* ==================== MOBILE RESPONSIVE HELPERS ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Sidebar Toggle for Dashboard
    const sidebar = document.querySelector('.sidebar');
    let sidebarToggle = document.querySelector('.sidebar-toggle');
    
    // Create sidebar toggle if it doesn't exist
    if (sidebar && !sidebarToggle) {
        sidebarToggle = document.createElement('button');
        sidebarToggle.className = 'sidebar-toggle';
        sidebarToggle.textContent = '☰';
        sidebarToggle.setAttribute('aria-label', 'Toggle sidebar');
        document.body.insertBefore(sidebarToggle, document.body.firstChild);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        });
    }
    
    // Close sidebar when a nav button is clicked
    if (sidebar) {
        const navBtns = sidebar.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Close sidebar on mobile
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('collapsed');
                }
            });
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        if (sidebar && window.innerWidth < 768) {
            if (!sidebar.contains(event.target) && 
                sidebarToggle && !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('collapsed');
            }
        }
    });
    
    // Adjust layout on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && sidebar) {
            sidebar.classList.remove('collapsed');
        }
    });
    
    // Touch-friendly improvements
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
});
