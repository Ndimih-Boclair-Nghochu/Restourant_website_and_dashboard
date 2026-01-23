// ==================== CUSTOMER REVIEWS SYSTEM ====================

// Load reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('customerReviews') || '[]');
    return reviews;
}

// Save reviews to localStorage
function saveReviews(reviews) {
    localStorage.setItem('customerReviews', JSON.stringify(reviews));
}

// Display reviews
function displayReviews() {
    const reviewsContainer = document.getElementById('reviewsContainer');
    if (!reviewsContainer) return;
    
    const reviews = loadReviews();
    const defaultReviews = Array.from(document.querySelectorAll('.testimonial-card.default'));
    
    // Clear only custom reviews
    const customReviews = reviewsContainer.querySelectorAll('.testimonial-card:not(.default)');
    customReviews.forEach(review => review.remove());
    
    // Add custom reviews
    reviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'testimonial-card customer-review';
        reviewCard.innerHTML = `
            <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p class="testimonial-text">"${review.comment}"</p>
            <div class="testimonial-author">
                <h4>${review.name}</h4>
                <p>${review.location || 'Guest'}</p>
                <small style="color: #888; font-size: 11px;">${new Date(review.date).toLocaleDateString()}</small>
            </div>
            <button class="delete-review-btn" onclick="deleteReview(${index})" title="Delete Review">×</button>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}

// Delete review
function deleteReview(index) {
    if (confirm('Are you sure you want to delete this review?')) {
        const reviews = loadReviews();
        reviews.splice(index, 1);
        saveReviews(reviews);
        displayReviews();
    }
}

// Show review modal
function showReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// Close review modal
function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.getElementById('reviewForm').reset();
        // Reset star selection
        document.querySelectorAll('.star-rating .star').forEach(star => {
            star.classList.remove('active');
        });
    }
}

// Submit review
function submitReview(event) {
    event.preventDefault();
    
    const name = document.getElementById('reviewName').value.trim();
    const location = document.getElementById('reviewLocation').value.trim();
    const comment = document.getElementById('reviewComment').value.trim();
    const rating = parseInt(document.querySelector('.star-rating .star.active:last-of-type')?.dataset.rating || '5');
    
    if (!name || !comment) {
        alert('Please fill in your name and review comment.');
        return;
    }
    
    const review = {
        name,
        location,
        comment,
        rating,
        date: new Date().toISOString()
    };
    
    const reviews = loadReviews();
    reviews.unshift(review); // Add to beginning
    saveReviews(reviews);
    
    closeReviewModal();
    displayReviews();
    
    // Show success message
    alert('Thank you for your review! Your feedback has been submitted.');
}

// Star rating interaction
function initStarRating() {
    const stars = document.querySelectorAll('.star-rating .star');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach(s => {
                if (parseInt(s.dataset.rating) <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.dataset.rating);
            stars.forEach(s => {
                if (parseInt(s.dataset.rating) <= rating) {
                    s.style.color = '#d4af37';
                } else {
                    s.style.color = '#ddd';
                }
            });
        });
    });
    
    document.querySelector('.star-rating')?.addEventListener('mouseleave', function() {
        stars.forEach(s => {
            const isActive = s.classList.contains('active');
            s.style.color = isActive ? '#d4af37' : '#ddd';
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    displayReviews();
    initStarRating();
    
    // Close modal when clicking outside
    const modal = document.getElementById('reviewModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeReviewModal();
            }
        });
    }
});
