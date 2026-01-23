// ==================== ANIMATED COUNTER ====================

function animateCounter(element, target, duration = 2000, suffix = '') {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const isDecimal = target.toString().includes('.');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (isDecimal) {
            element.textContent = current.toFixed(1) + suffix;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

function initCounters() {
    const counters = document.querySelectorAll('.stat h3, .stat-number-simple');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                let target, suffix;
                
                // Parse different formats: 25+, 100K+, 50K+, 7, etc.
                if (text.includes('K+')) {
                    target = parseFloat(text.replace('K+', '')) * 1000;
                    suffix = 'K+';
                    target = target / 1000; // Keep as K for display
                } else if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                    suffix = '+';
                } else {
                    target = parseInt(text);
                    suffix = '';
                }
                
                entry.target.textContent = '0' + suffix;
                animateCounter(entry.target, target, 2000, suffix);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
} else {
    initCounters();
}
