// UI components and interactions for Gentelella Admin Dashboard
import $ from 'jquery';

export function initializeUI() {
    // Initialize sidebar toggle
    initializeSidebar();

    // Initialize notifications
    initializeNotifications();

    // Initialize tooltips
    initializeTooltips();

    // Initialize dropdowns
    initializeDropdowns();

    // Initialize responsive behavior
    initializeResponsive();
}

function initializeSidebar() {
    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.navbar-toggler');
    const sidebar = document.getElementById('sidebar');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('show');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.querySelector('.navbar-toggler');

        if (!sidebar.contains(event.target) && !toggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
}

function initializeNotifications() {
    // Notification dropdown toggle
    const notificationBtn = document.querySelector('[href="#"] .fa-bell').parentElement;
    if (notificationBtn) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Add notification dropdown logic here
            console.log('Notifications clicked');
        });
    }
}

function initializeTooltips() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function initializeDropdowns() {
    // Initialize Bootstrap dropdowns
    const dropdownTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
    dropdownTriggerList.map(function (dropdownTriggerEl) {
        return new bootstrap.Dropdown(dropdownTriggerEl);
    });
}

function initializeResponsive() {
    // Handle window resize events
    window.addEventListener('resize', function() {
        const sidebar = document.getElementById('sidebar');
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('show');
        }
    });

    // Initialize scroll behavior for sidebar
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.addEventListener('scroll', function() {
            // Add scroll effects if needed
        });
    }
}

// Utility functions for UI updates
export function showAlert(message, type = 'info') {
    const alertHtml = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    const alertContainer = document.querySelector('.alert-container') || createAlertContainer();
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);

    // Auto remove after 5 seconds
    setTimeout(() => {
        const alert = alertContainer.lastElementChild;
        if (alert) {
            alert.remove();
        }
    }, 5000);
}

function createAlertContainer() {
    const container = document.createElement('div');
    container.className = 'alert-container position-fixed top-0 end-0 p-3';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
}

export function updateDashboardStats(stats) {
    // Update dashboard cards with new statistics
    if (stats.totalUsers) {
        const usersCard = document.querySelector('.card.bg-primary .card-text');
        if (usersCard) usersCard.textContent = stats.totalUsers.toLocaleString();
    }

    if (stats.revenue) {
        const revenueCard = document.querySelector('.card.bg-success .card-text');
        if (revenueCard) revenueCard.textContent = `$${stats.revenue.toLocaleString()}`;
    }

    if (stats.orders) {
        const ordersCard = document.querySelector('.card.bg-warning .card-text');
        if (ordersCard) ordersCard.textContent = stats.orders.toLocaleString();
    }

    if (stats.issues) {
        const issuesCard = document.querySelector('.card.bg-danger .card-text');
        if (issuesCard) issuesCard.textContent = stats.issues.toLocaleString();
    }
}

export function toggleLoading(elementId, show = true) {
    const element = document.getElementById(elementId);
    if (element) {
        if (show) {
            element.classList.add('loading');
            element.innerHTML = '<div class="spinner-border spinner-border-sm" role="status"></div> Loading...';
        } else {
            element.classList.remove('loading');
        }
    }
}
