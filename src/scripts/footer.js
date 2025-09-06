// Footer functionality for Gentelella Admin Dashboard

export function initializeFooter() {
    setupBackToTop();
    updateFooterTimestamp();
    setupSocialLinks();
    setupFooterLinks();
    initializeTooltips();
}

function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Smooth scroll to top
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Track back-to-top usage
            if (window.gtag) {
                gtag('event', 'back_to_top_click');
            }
        });
    }
}

function updateFooterTimestamp() {
    const lastUpdated = document.getElementById('lastUpdated');
    if (lastUpdated) {
        const now = new Date();
        lastUpdated.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
}

function setupSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = e.currentTarget.title.toLowerCase();

            // Track social media clicks
            if (window.gtag) {
                gtag('event', 'social_click', {
                    social_platform: platform
                });
            }

            // Open social media page (you can customize these URLs)
            const urls = {
                facebook: 'https://facebook.com/gentelella',
                twitter: 'https://twitter.com/gentelella',
                linkedin: 'https://linkedin.com/company/gentelella',
                github: 'https://github.com/gentelella'
            };

            if (urls[platform]) {
                window.open(urls[platform], '_blank');
            }
        });
    });
}

function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-link');

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Track footer link clicks
            const linkText = e.target.textContent.trim();
            const section = e.target.closest('.footer-section h6')?.textContent || 'general';

            if (window.gtag) {
                gtag('event', 'footer_link_click', {
                    link_text: linkText,
                    section: section
                });
            }

            // You can add custom navigation logic here
            console.log(`Footer link clicked: ${linkText} in ${section}`);
        });
    });
}

function initializeTooltips() {
    // Initialize Bootstrap tooltips for social links
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('.social-link'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Footer analytics and tracking
function trackFooterEngagement() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Footer is visible
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'footer_view');
                }

                // Track time spent in footer area (Google Analytics tracking)
                let startTime = Date.now();
                const footerTimer = setInterval(() => {
                    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
                    if (timeSpent >= 5) { // Track every 5 seconds
                        // Check if gtag is available before tracking
                        if (typeof gtag !== 'undefined') {
                            gtag('event', 'footer_engagement', {
                                time_spent: timeSpent
                            });
                        } else {
                            console.log(`Footer engagement: ${timeSpent}s`);
                        }
                    }
                }, 5000);

                // Clear timer when footer is no longer visible
                observer.unobserve(entry.target);
                setTimeout(() => clearInterval(footerTimer), 30000); // Max 30 seconds
            }
        });
    });

    observer.observe(document.querySelector('.footer'));
}

// Utility functions for dynamic footer updates
export function updateFooterContact(contact) {
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo && contact) {
        contactInfo.innerHTML = `
            <p class="mb-2">
                <i class="fa fa-envelope me-2"></i>
                <a href="mailto:${contact.email}" class="footer-link">${contact.email}</a>
            </p>
            <p class="mb-2">
                <i class="fa fa-phone me-2"></i>
                <a href="tel:${contact.phone}" class="footer-link">${contact.phone}</a>
            </p>
            <p class="mb-2">
                <i class="fa fa-map-marker-alt me-2"></i>
                ${contact.address}
            </p>
        `;
    }
}

export function updateFooterStats(stats) {
    const footerStats = document.querySelector('.footer-stats');
    if (footerStats && stats) {
        footerStats.innerHTML = `
            <small>
                <i class="fa fa-clock me-1"></i>Last updated: <span id="lastUpdated">${stats.lastUpdated || 'Jan 15, 2024'}</span> |
                <i class="fa fa-code-branch me-1"></i>Version ${stats.version || '2.1.0'}
                ${stats.environment ? ` | <i class="fa fa-server me-1"></i>${stats.environment}` : ''}
            </small>
        `;
    }
}

export function addFooterSection(title, content, position = 'end') {
    const footerRow = document.querySelector('.footer .row');
    if (!footerRow) return;

    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'col-lg-2 col-md-6 mb-4';
    sectionDiv.innerHTML = `
        <div class="footer-section">
            <h6 class="footer-subtitle mb-3">${title}</h6>
            ${content}
        </div>
    `;

    if (position === 'start') {
        footerRow.insertBefore(sectionDiv, footerRow.firstElementChild);
    } else {
        // Insert before the contact section
        const contactSection = footerRow.querySelector('.col-lg-4:last-child');
        if (contactSection) {
            footerRow.insertBefore(sectionDiv, contactSection);
        } else {
            footerRow.appendChild(sectionDiv);
        }
    }
}

// Initialize footer tracking when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    trackFooterEngagement();
});
