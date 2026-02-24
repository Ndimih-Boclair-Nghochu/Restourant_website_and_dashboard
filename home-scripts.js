// ==================== HOME PAGE ORDERING ==================== 

// Import menu data and order flow
const menuData = {
    appetizers: [
        { name: 'Foie Gras Terrine', description: 'Elegant foie gras with brioche and seasonal fruit compote', price: 28, priceDisplay: '28,000 FCFA', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
        { name: 'Oyster Selection', description: 'Fresh oysters from local suppliers, served with champagne mignonette', price: 24, priceDisplay: '24,000 FCFA', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop' },
        { name: 'Smoked Salmon', description: 'House-smoked salmon with caviar and crème fraîche', price: 26, priceDisplay: '26,000 FCFA', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' }
    ],
    mains: [
        { name: 'Pan-Seared Beef Tenderloin', description: 'Premium aged beef with béarnaise sauce and seasonal vegetables', price: 52, priceDisplay: '52,000 FCFA', image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=300&fit=crop' },
        { name: 'Lobster Thermidor', description: 'Classic preparation with champagne cream and truffle', price: 58, priceDisplay: '58,000 FCFA', image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop' },
        { name: 'Dover Sole Meunière', description: 'Delicate flatfish with brown butter and lemon', price: 48, priceDisplay: '48,000 FCFA', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' }
    ],
    desserts: [
        { name: 'Chocolate Soufflé', description: 'Warm chocolate soufflé with vanilla ice cream', price: 14, priceDisplay: '14,000 FCFA', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop' },
        { name: 'Crème Brûlée', description: 'Classic French dessert with Madagascar vanilla', price: 12, priceDisplay: '12,000 FCFA', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
        { name: 'Lemon Tart', description: 'Artisanal lemon tart with Italian meringue', price: 13, priceDisplay: '13,000 FCFA', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop' }
    ],
    beverages: [
        { name: 'Premium Wine Selection', description: 'Carefully curated wines from renowned vineyards', price: 25, priceDisplay: '25,000 FCFA', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop' },
        { name: 'Signature Cocktail', description: 'Handcrafted cocktails by our master mixologist', price: 18, priceDisplay: '18,000 FCFA', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop' },
        { name: 'Fresh Juice', description: 'Seasonal fresh squeezed juice', price: 8, priceDisplay: '8,000 FCFA', image: 'https://media.istockphoto.com/id/1409930732/photo/fresh-fruit-juice-drinks-on-table-outdoors.jpg?s=612x612&w=0&k=20&c=W2_qoOhBvZHXNFtT0CxNKJYzPbF8Mv5S5E5p5Cc6fCU=' },
        { name: 'Espresso', description: 'Premium Italian espresso shot', price: 4, priceDisplay: '4,000 FCFA', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop' },
        { name: 'Mineral Water', description: 'Imported mineral water', price: 5, priceDisplay: '5,000 FCFA', image: 'https://images.unsplash.com/photo-1523677745891-6f3031224c94?w=400&h=300&fit=crop' }
    ]
};

// Order flow state
let currentOrder = {
    food: null,
    drink: null,
    tableNumber: null,
    isOnSite: true,
    totalAmount: 0
};
// ...existing code...
// The following code block had misplaced object spread and was outside of a function.
// It should be inside a function that adds items to the cart. If you want to add an item to the cart, use:
// function addItemToCart(itemData) {
//   cart.push({
//     ...itemData,
//     quantity: 1,
//     id: Date.now()
//   });
//   localStorage.setItem('cart', JSON.stringify(cart));
//   updateCartBadge();
//   showCartModal();
// }
// ...existing code...

// ==================== MENU FILTERING ====================
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter menu items
            menuItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 10);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // ==================== RESERVATION FORM ====================
    const reservationForm = document.getElementById('reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formInputs = reservationForm.querySelectorAll('input, select, textarea');
            const reservation = {};
            
            formInputs.forEach(input => {
                if (input.value) {
                    reservation[input.name || input.placeholder] = input.value;
                }
            });
            
            reservation.id = Date.now();
            reservation.timestamp = new Date().toLocaleString();

            // Save to localStorage
            const reservations = JSON.parse(localStorage.getItem('restaurantReservations') || '[]');
            reservations.push(reservation);
            localStorage.setItem('restaurantReservations', JSON.stringify(reservations));

            alert('Thank you for your reservation! We look forward to serving you.');
            reservationForm.reset();
        });
    }

    // ==================== SMOOTH SCROLL FOR NAVIGATION ====================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==================== CONTACT FORM HANDLER ====================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
            const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
            const phone = contactForm.querySelector('input[placeholder="Your Phone"]').value;
            const restaurant = contactForm.querySelector('input[placeholder="Restaurant Name"]').value;
            const message = contactForm.querySelector('textarea[placeholder="Your Message"]').value;

            // Validate
            if (!name || !email || !message) {
                alert('Please fill in all required fields');
                return;
            }

            // Save to localStorage
            const contactMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            const newMessage = {
                id: Date.now(),
                name,
                email,
                phone,
                restaurant,
                message,
                timestamp: new Date().toLocaleString()
            };
            contactMessages.push(newMessage);
            localStorage.setItem('contactMessages', JSON.stringify(contactMessages));

            // Show success message
            alert(`Thank you, ${name}! Your message has been received. We'll get back to you soon!`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // ==================== ANIMATE ON SCROLL ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and elements
    document.querySelectorAll('.feature-card, .step, .benefit, .testimonial-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // ==================== COUNTER ANIMATION ====================
    let countersAnimated = false;

    const animateCounters = () => {
        if (countersAnimated) return;
        
        const stats = document.querySelectorAll('.stat-box h3');
        const duration = 2000; // 2 seconds
        const frames = 60;
        const frameRate = duration / frames;

        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue);
            
            if (isNaN(numericValue)) return;

            let currentValue = 0;
            const increment = numericValue / frames;

            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(interval);
                } else {
                    stat.textContent = Math.floor(currentValue) + finalValue.replace(/[0-9]/g, '');
                }
            }, frameRate);
        });

        countersAnimated = true;
    };

    // Trigger counter animation when stats section is visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(statsSection);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScrollTop = scrollTop;
    });

    // ==================== BUTTON RIPPLE EFFECT ====================
    const buttons = document.querySelectorAll('.btn, .btn-order, .btn-admin');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple CSS dynamically
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            .btn, .btn-order, .btn-admin {
                position: relative;
                overflow: hidden;
            }

            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== LAZY LOAD IMAGES ====================
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ==================== ACTIVE NAV LINK ====================
    const updateActiveNavLink = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    };

    updateActiveNavLink();

    // ==================== TYPEWRITER EFFECT FOR TITLE ====================
    const typewriterEffect = () => {
        const title = document.querySelector('.hero-title');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        let index = 0;

        const type = () => {
            if (index < text.length) {
                title.textContent += text[index];
                index++;
                setTimeout(type, 50);
            }
        };

        // Start after a short delay
        setTimeout(type, 500);
    };

    typewriterEffect();

    // ==================== PARALLAX EFFECT ====================
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPosition = `0px ${scrollPosition * 0.5}px`;
        }
    });

    // ==================== CONSOLE MESSAGE ====================
    console.log('%c RestroHub - Fine Dining Restaurant', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%c✓ Website Loaded Successfully', 'color: #10b981; font-size: 14px;');
    console.log('%c• Home Page: /home.html', 'color: #764ba2; font-size: 12px;');
    console.log('%c• Customer Store: /customer.html', 'color: #764ba2; font-size: 12px;');
    console.log('%c• Admin Dashboard: /index.html', 'color: #764ba2; font-size: 12px;');
});

// ==================== ADD STYLE FOR ACTIVE NAV LINK ====================
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea;
        font-weight: 700;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

