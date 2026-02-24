// ==================== IMAGE FALLBACK HANDLER ====================
// This script handles image loading failures and applies fallback styles

(function() {
    'use strict';

    // Initialize image fallback handling
    function initializeImageFallbacks() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Handle load success
            img.addEventListener('load', function() {
                this.classList.remove('image-error');
                this.classList.add('image-loaded');
            });

            // Handle load error
            img.addEventListener('error', function(e) {
                console.warn('Failed to load image:', this.src);
                this.classList.add('image-error');
                
                // Try alternative source if available
                if (this.dataset.fallback) {
                    this.src = this.dataset.fallback;
                } else {
                    // Hide the broken image
                    this.style.display = 'none';
                    
                    // Add placeholder to parent
                    const parent = this.parentElement;
                    if (parent && !parent.querySelector('.image-placeholder-icon')) {
                        const placeholder = document.createElement('div');
                        placeholder.className = 'image-placeholder-icon';
                        placeholder.innerHTML = '🍽️';
                        placeholder.style.cssText = `
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 60px;
                            opacity: 0.3;
                        `;
                        parent.style.position = 'relative';
                        parent.appendChild(placeholder);
                    }
                }
            });

            // Check if image needs loading
            if (img.complete) {
                // Image is already loaded or failed
                if (!img.naturalHeight) {
                    img.classList.add('image-error');
                    img.dispatchEvent(new Event('error'));
                } else {
                    img.classList.add('image-loaded');
                }
            }
        });
    }

    // Handle background images
    function handleBackgroundImages() {
        const elementsWithBg = document.querySelectorAll('[style*="background"]');
        
        elementsWithBg.forEach(element => {
            const bgStyle = element.getAttribute('style');
            if (bgStyle && bgStyle.includes('url')) {
                // Check if background image loads
                const img = new Image();
                const urlMatch = bgStyle.match(/url\(['"]?([^'")]+)['"]?\)/);
                
                if (urlMatch && urlMatch[1]) {
                    const url = urlMatch[1];
                    
                    img.onload = function() {
                        // Background loaded successfully
                        element.classList.add('bg-loaded');
                    };
                    
                    img.onerror = function() {
                        console.warn('Failed to load background image:', url);
                        element.classList.add('bg-error');
                        
                        // Apply fallback gradient
                        const fallbackGradient = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';
                        element.style.background = fallbackGradient;
                    };
                    
                    img.src = url;
                }
            }
        });
    }

    // Add image loading indicator
    function addLoadingIndicators() {
        const images = document.querySelectorAll('img[src]');
        images.forEach(img => {
            if (!img.complete) {
                img.setAttribute('data-loading', 'true');
                img.addEventListener('load', function() {
                    this.removeAttribute('data-loading');
                });
                img.addEventListener('error', function() {
                    this.removeAttribute('data-loading');
                });
            }
        });
    }

    // Retry failed images after a delay
    function retryFailedImages() {
        setTimeout(function() {
            const failedImages = document.querySelectorAll('img.image-error');
            failedImages.forEach(img => {
                if (img.src && !img.src.includes('data:')) {
                    console.log('Retrying image:', img.src);
                    // Reset and retry
                    img.src = img.src + '?' + Date.now();
                }
            });
        }, 3000);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeImageFallbacks();
            handleBackgroundImages();
            addLoadingIndicators();
            retryFailedImages();
        });
    } else {
        initializeImageFallbacks();
        handleBackgroundImages();
        addLoadingIndicators();
        retryFailedImages();
    }

    // Also handle dynamically added images
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'IMG') {
                            initializeImageFallbacks();
                        }
                        const images = node.querySelectorAll('img');
                        if (images.length) {
                            initializeImageFallbacks();
                        }
                    }
                });
            }
        });
    });

    // Start observing document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
