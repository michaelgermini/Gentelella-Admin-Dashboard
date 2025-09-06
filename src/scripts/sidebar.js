// Enhanced Sidebar Navigation for Gentelella Admin Dashboard

export function initializeSidebar() {
    setupSidebarSearch();
    setupSubmenuToggling();
    setupActiveStateManagement();
    setupMobileBehavior();
    setupKeyboardNavigation();
    setupAnalyticsTracking();
}

function setupSidebarSearch() {
    const sidebarSearch = document.getElementById('sidebarSearch');

    if (sidebarSearch) {
        sidebarSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.sidebar .nav-item');

            menuItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);

                item.style.display = isVisible ? 'block' : 'none';

                // Also show parent items if they have visible children
                if (item.querySelector('.collapse')) {
                    const subItems = item.querySelectorAll('.sub-link');
                    const hasVisibleSubItems = Array.from(subItems).some(subItem =>
                        subItem.textContent.toLowerCase().includes(searchTerm)
                    );

                    if (hasVisibleSubItems && !isVisible) {
                        item.style.display = 'block';
                    }
                }
            });
        });
    }
}

function setupSubmenuToggling() {
    document.querySelectorAll('[data-toggle="collapse"]').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('data-target');
            const target = document.querySelector(targetId);
            const chevron = this.querySelector('.fa-chevron-down, .fa-chevron-up');

            if (target) {
                if (target.classList.contains('show')) {
                    target.classList.remove('show');
                    if (chevron) {
                        chevron.classList.remove('fa-chevron-up');
                        chevron.classList.add('fa-chevron-down');
                    }
                } else {
                    target.classList.add('show');
                    if (chevron) {
                        chevron.classList.remove('fa-chevron-down');
                        chevron.classList.add('fa-chevron-up');
                    }
                }
            }
        });
    });
}

function setupActiveStateManagement() {
    // Set initial active state
    setActiveMenuItem('dashboard');

    // Handle menu item clicks
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const section = this.getAttribute('data-section');
            if (section) {
                setActiveMenuItem(section);

                // Show success notification
                showNavigationNotification(`Navigated to ${section}`);
            }
        });
    });
}

function setActiveMenuItem(sectionId) {
    // Remove all active states
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Set active state for current section
    const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function setupMobileBehavior() {
    const sidebarToggle = document.querySelector('.navbar-toggler');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                    sidebar.classList.remove('show');
                }
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                sidebar.classList.remove('show');
            }
        });
    }
}

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const sidebar = document.getElementById('sidebar');
        const links = sidebar.querySelectorAll('.nav-link:not(.disabled)');

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();

            const currentIndex = Array.from(links).findIndex(link =>
                link.classList.contains('active'));

            let newIndex;
            if (e.key === 'ArrowUp') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : links.length - 1;
            } else {
                newIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
            }

            if (links[newIndex]) {
                links[newIndex].focus();
                setActiveMenuItem(links[newIndex].getAttribute('data-section'));
            }
        }
    });
}

function setupAnalyticsTracking() {
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('data-section');

            if (section && window.gtag) {
                gtag('event', 'sidebar_navigation', {
                    section: section,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

// Utility functions for external use
export function updateNotificationBadge(section, count) {
    const badge = document.querySelector(`[data-section="${section}"] .notification-badge`);
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'inline' : 'none';
    }
}

export function addMenuItem(config) {
    const menuItem = document.createElement('li');
    menuItem.className = 'nav-item';
    menuItem.innerHTML = `
        <a class="nav-link" href="#" data-section="${config.id}">
            <i class="fa fa-${config.icon}"></i>
            <span class="menu-text">${config.title}</span>
            ${config.badge ? `<span class="badge bg-${config.badgeColor || 'primary'} badge-sm">${config.badge}</span>` : ''}
        </a>
    `;

    document.querySelector('.sidebar .nav').appendChild(menuItem);

    // Re-initialize event listeners for the new item
    const newLink = menuItem.querySelector('.nav-link');
    newLink.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-section');
        if (section) {
            setActiveMenuItem(section);
            showNavigationNotification(`Navigated to ${section}`);
        }
    });
}

export function removeMenuItem(sectionId) {
    const menuItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (menuItem && menuItem.closest('.nav-item')) {
        menuItem.closest('.nav-item').remove();
    }
}

function showNavigationNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.navigation-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'alert alert-success alert-dismissible fade show navigation-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.innerHTML = `
        <i class="fa fa-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    // Auto remove after 2 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 150);
        }
    }, 2000);
}

// Global functions for console access
window.navigateToSection = function(sectionId) {
    setActiveMenuItem(sectionId);
    showNavigationNotification(`Navigated to ${sectionId}`);
};

window.updateSidebarBadge = function(section, count) {
    updateNotificationBadge(section, count);
};

window.addSidebarMenuItem = function(config) {
    addMenuItem(config);
};
