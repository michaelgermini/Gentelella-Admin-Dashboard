// Optional Sections Implementation for Gentelella Dashboard

// Breadcrumbs System
class BreadcrumbManager {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPath = ['dashboard'];
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
    }

    setPath(pathArray) {
        this.currentPath = Array.isArray(pathArray) ? pathArray : [pathArray];
        this.render();
    }

    render() {
        if (!this.container) return;

        const breadcrumbItems = this.currentPath.map((item, index) => {
            const isLast = index === this.currentPath.length - 1;
            const itemData = typeof item === 'string' ? { id: item, title: item } : item;

            if (isLast) {
                return `
                    <li class="breadcrumb-item active" aria-current="page">
                        ${itemData.icon ? `<i class="fa fa-${itemData.icon} me-1"></i>` : ''}
                        ${itemData.title}
                    </li>
                `;
            } else {
                return `
                    <li class="breadcrumb-item">
                        <a href="#" data-section="${itemData.id}">
                            ${itemData.icon ? `<i class="fa fa-${itemData.icon} me-1"></i>` : ''}
                            ${itemData.title}
                        </a>
                    </li>
                `;
            }
        }).join('');

        this.container.innerHTML = `
            <div class="container-fluid">
                <ol class="breadcrumb mb-0">
                    ${breadcrumbItems}
                </ol>
                <div class="breadcrumb-actions">
                    <button class="btn btn-sm btn-outline-secondary" onclick="refreshCurrentPage()">
                        <i class="fa fa-refresh me-1"></i>Refresh
                    </button>
                    <button class="btn btn-sm btn-outline-primary" onclick="exportCurrentPage()">
                        <i class="fa fa-download me-1"></i>Export
                    </button>
                    <button class="btn btn-sm btn-outline-info" onclick="shareCurrentPage()">
                        <i class="fa fa-share me-1"></i>Share
                    </button>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const breadcrumbLink = e.target.closest('.breadcrumb-item a');
            if (breadcrumbLink) {
                e.preventDefault();
                const section = breadcrumbLink.getAttribute('data-section');

                // Find index of clicked item
                const clickedIndex = Array.from(this.container.querySelectorAll('.breadcrumb-item'))
                    .findIndex(item => item.contains(breadcrumbLink));

                if (clickedIndex !== -1) {
                    // Navigate to that level
                    this.currentPath = this.currentPath.slice(0, clickedIndex + 1);
                    this.render();

                    // Trigger navigation
                    if (window.navigateToSection) {
                        window.navigateToSection(section);
                    }
                }
            }
        });
    }
}

// Modal System Manager
class ModalManager {
    constructor() {
        this.activeModals = new Map();
        this.init();
    }

    init() {
        this.setupModalContainer();
        this.setupEventListeners();
    }

    setupModalContainer() {
        if (!document.getElementById('modalContainer')) {
            const container = document.createElement('div');
            container.id = 'modalContainer';
            container.className = 'modal-container';
            document.body.appendChild(container);
        }
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop') ||
                e.target.classList.contains('modal-close') ||
                e.target.getAttribute('data-dismiss') === 'modal') {
                this.closeTopModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTopModal();
            }
        });
    }

    show(config) {
        const modalId = `modal-${Date.now()}`;
        const modal = this.createModalElement(modalId, config);

        document.getElementById('modalContainer').appendChild(modal);

        // Show modal with animation
        setTimeout(() => {
            modal.classList.add('show');
            document.body.classList.add('modal-open');

            // Focus management
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }, 10);

        this.activeModals.set(modalId, modal);

        // Auto-close timer if specified
        if (config.autoClose) {
            setTimeout(() => {
                this.close(modalId);
            }, config.autoClose);
        }

        return modalId;
    }

    createModalElement(modalId, config) {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.id = modalId;

        const sizeClass = config.size ? `modal-${config.size}` : '';
        const centered = config.centered !== false ? 'modal-dialog-centered' : '';

        modal.innerHTML = `
            <div class="modal-dialog ${sizeClass} ${centered}">
                <div class="modal-content">
                    ${config.header !== false ? `
                        <div class="modal-header">
                            <h5 class="modal-title">
                                ${config.icon ? `<i class="fa fa-${config.icon} me-2"></i>` : ''}
                                ${config.title || 'Modal Title'}
                            </h5>
                            <button type="button" class="btn-close modal-close" data-dismiss="modal"></button>
                        </div>
                    ` : ''}
                    <div class="modal-body">
                        ${config.content || ''}
                    </div>
                    ${config.footer !== false ? `
                        <div class="modal-footer">
                            ${config.footer || `
                                <button type="button" class="btn btn-secondary modal-close" data-dismiss="modal">
                                    ${config.cancelText || 'Cancel'}
                                </button>
                                <button type="button" class="btn btn-primary" onclick="${config.confirmAction || ''}">
                                    ${config.confirmText || 'Confirm'}
                                </button>
                            `}
                        </div>
                    ` : ''}
                </div>
            </div>
            <div class="modal-backdrop fade show"></div>
        `;

        return modal;
    }

    close(modalId) {
        const modal = this.activeModals.get(modalId);
        if (!modal) return;

        modal.classList.remove('show');

        setTimeout(() => {
            modal.remove();
            this.activeModals.delete(modalId);

            if (this.activeModals.size === 0) {
                document.body.classList.remove('modal-open');
            }
        }, 300);
    }

    closeTopModal() {
        const modalIds = Array.from(this.activeModals.keys());
        if (modalIds.length > 0) {
            this.close(modalIds[modalIds.length - 1]);
        }
    }

    confirm(message, options = {}) {
        return this.show({
            title: options.title || 'Confirm Action',
            content: `<p>${message}</p>`,
            icon: 'question-circle',
            confirmText: options.confirmText || 'Confirm',
            cancelText: options.cancelText || 'Cancel',
            confirmAction: options.onConfirm || '',
            size: 'sm'
        });
    }

    alert(message, options = {}) {
        return this.show({
            title: options.title || 'Alert',
            content: `<p>${message}</p>`,
            icon: 'exclamation-triangle',
            footer: `<button type="button" class="btn btn-primary modal-close" data-dismiss="modal">${options.okText || 'OK'}</button>`,
            size: 'sm'
        });
    }

    loading(message = 'Loading...') {
        return this.show({
            title: 'Please Wait',
            content: `
                <div class="text-center py-4">
                    <div class="spinner-border text-primary mb-3" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mb-0">${message}</p>
                </div>
            `,
            header: false,
            footer: false,
            size: 'sm'
        });
    }
}

// Notification System Manager
class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.isPanelOpen = false;
        this.init();
    }

    init() {
        this.setupNotificationPanel();
        this.setupEventListeners();
        this.loadNotifications();
        this.startPolling();
    }

    setupNotificationPanel() {
        const panel = document.getElementById('notificationPanel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('notificationPanel');
            const toggle = document.getElementById('notificationToggle');

            if (this.isPanelOpen &&
                !panel.contains(e.target) &&
                !toggle.contains(e.target)) {
                this.closePanel();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isPanelOpen) {
                this.closePanel();
            }
        });
    }

    addNotification(notification) {
        const newNotification = {
            id: Date.now(),
            type: notification.type || 'info',
            title: notification.title || 'Notification',
            message: notification.message || '',
            timestamp: new Date(),
            read: false,
            action: notification.action || null,
            icon: this.getNotificationIcon(notification.type),
            ...notification
        };

        this.notifications.unshift(newNotification);
        this.unreadCount++;

        this.renderNotifications();
        this.updateUI();

        // Auto-remove after timeout if specified
        if (notification.autoRemove) {
            setTimeout(() => {
                this.removeNotification(newNotification.id);
            }, notification.autoRemove);
        }

        // Browser notification if permission granted
        if (notification.browser && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(newNotification.title, {
                    body: newNotification.message,
                    icon: '/favicon.ico'
                });
            }
        }

        return newNotification.id;
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-triangle',
            warning: 'exclamation-circle',
            info: 'info-circle'
        };
        return icons[type] || 'bell';
    }

    removeNotification(id) {
        const index = this.notifications.findIndex(n => n.id === id);
        if (index !== -1) {
            if (!this.notifications[index].read) {
                this.unreadCount--;
            }
            this.notifications.splice(index, 1);
            this.renderNotifications();
            this.updateUI();
        }
    }

    markAsRead(id) {
        const notification = this.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
            notification.read = true;
            this.unreadCount--;
            this.renderNotifications();
            this.updateUI();
        }
    }

    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.unreadCount = 0;
        this.renderNotifications();
        this.updateUI();
    }

    clearAll() {
        this.notifications = [];
        this.unreadCount = 0;
        this.renderNotifications();
        this.updateUI();
    }

    renderNotifications() {
        const container = document.getElementById('notificationList');
        if (!container) return;

        if (this.notifications.length === 0) {
            container.innerHTML = `
                <div class="notification-empty text-center py-4">
                    <i class="fa fa-bell-slash fa-2x text-muted mb-2"></i>
                    <p class="text-muted mb-0">No notifications</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.notifications.map(notification => `
            <div class="notification-item ${notification.read ? 'read' : 'unread'}"
                 data-id="${notification.id}">
                <div class="notification-icon">
                    <i class="fa fa-${notification.icon} text-${this.getTypeColor(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-message">${notification.message}</div>
                    <div class="notification-time">${this.formatTime(notification.timestamp)}</div>
                </div>
                <div class="notification-actions">
                    ${!notification.read ? '<div class="unread-indicator"></div>' : ''}
                    <button class="btn btn-sm btn-close" onclick="notificationManager.removeNotification(${notification.id})"></button>
                </div>
            </div>
        `).join('');

        // Setup click handlers
        container.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.classList.contains('btn-close')) {
                    const id = parseInt(item.dataset.id);
                    this.markAsRead(id);

                    // Execute action if defined
                    const notification = this.notifications.find(n => n.id === id);
                    if (notification && notification.action) {
                        eval(notification.action);
                    }
                }
            });
        });
    }

    getTypeColor(type) {
        const colors = {
            success: 'success',
            error: 'danger',
            warning: 'warning',
            info: 'info'
        };
        return colors[type] || 'secondary';
    }

    formatTime(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }

    updateUI() {
        // Update notification count
        const countElement = document.getElementById('notificationCount');
        const badgeElement = document.getElementById('notificationBadge');

        if (countElement) {
            countElement.textContent = this.unreadCount;
            countElement.style.display = this.unreadCount > 0 ? 'inline' : 'none';
        }

        if (badgeElement) {
            badgeElement.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
            badgeElement.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }

    togglePanel() {
        if (this.isPanelOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        const panel = document.getElementById('notificationPanel');
        if (!panel) return;

        panel.style.display = 'block';
        setTimeout(() => panel.classList.add('open'), 10);
        this.isPanelOpen = true;
    }

    closePanel() {
        const panel = document.getElementById('notificationPanel');
        if (!panel) return;

        panel.classList.remove('open');
        setTimeout(() => panel.style.display = 'none', 300);
        this.isPanelOpen = false;
    }

    loadNotifications() {
        // Load from localStorage or API
        const saved = localStorage.getItem('notifications');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.notifications = parsed.map(n => ({
                    ...n,
                    timestamp: new Date(n.timestamp)
                }));
                this.unreadCount = this.notifications.filter(n => !n.read).length;
                this.renderNotifications();
                this.updateUI();
            } catch (e) {
                console.error('Failed to load notifications:', e);
            }
        }
    }

    saveNotifications() {
        localStorage.setItem('notifications', JSON.stringify(this.notifications));
    }

    startPolling() {
        setInterval(() => {
            // Simulate receiving new notifications
            if (Math.random() < 0.1) { // 10% chance every 30 seconds
                this.addNotification({
                    type: 'info',
                    title: 'New Update Available',
                    message: 'A new version of the dashboard is available.',
                    action: 'window.location.reload()'
                });
            }
        }, 30000);
    }
}

// Quick Action Toolbar Manager
class QuickActionToolbar {
    constructor() {
        this.isOpen = false;
        this.actions = this.getDefaultActions();
        this.init();
    }

    init() {
        this.setupToolbar();
        this.setupEventListeners();
        this.loadCustomActions();
    }

    getDefaultActions() {
        return [
            {
                id: 'add-user',
                icon: 'user-plus',
                label: 'Add User',
                action: 'quickAddUser()',
                category: 'primary',
                shortcut: 'Ctrl+U'
            },
            {
                id: 'new-project',
                icon: 'plus-circle',
                label: 'New Project',
                action: 'quickNewProject()',
                category: 'primary',
                shortcut: 'Ctrl+P'
            },
            {
                id: 'generate-report',
                icon: 'chart-bar',
                label: 'Report',
                action: 'quickGenerateReport()',
                category: 'primary',
                shortcut: 'Ctrl+R'
            },
            {
                id: 'send-message',
                icon: 'envelope',
                label: 'Message',
                action: 'quickSendMessage()',
                category: 'primary',
                shortcut: 'Ctrl+M'
            },
            {
                id: 'backup',
                icon: 'download',
                label: 'Backup',
                action: 'quickBackup()',
                category: 'secondary'
            },
            {
                id: 'settings',
                icon: 'cog',
                label: 'Settings',
                action: 'quickSettings()',
                category: 'secondary'
            }
        ];
    }

    setupToolbar() {
        const toolbar = document.getElementById('quickActionToolbar');
        if (toolbar) {
            toolbar.style.display = 'none';
        }
    }

    setupEventListeners() {
        // Close on outside click
        document.addEventListener('click', (e) => {
            const toolbar = document.getElementById('quickActionToolbar');
            const toggle = document.getElementById('toolbarToggle');

            if (this.isOpen &&
                !toolbar.contains(e.target) &&
                !toggle.contains(e.target)) {
                this.closeToolbar();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl+U: Add User
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                quickAddUser();
            }
            // Ctrl+P: New Project
            if (e.ctrlKey && e.key === 'p') {
                e.preventDefault();
                quickNewProject();
            }
            // Ctrl+R: Generate Report
            if (e.ctrlKey && e.key === 'r') {
                e.preventDefault();
                quickGenerateReport();
            }
            // Ctrl+M: Send Message
            if (e.ctrlKey && e.key === 'm') {
                e.preventDefault();
                quickSendMessage();
            }
        });
    }

    toggleToolbar() {
        if (this.isOpen) {
            this.closeToolbar();
        } else {
            this.openToolbar();
        }
    }

    openToolbar() {
        const toolbar = document.getElementById('quickActionToolbar');
        if (!toolbar) return;

        toolbar.style.display = 'block';
        setTimeout(() => toolbar.classList.add('open'), 10);
        this.isOpen = true;
    }

    closeToolbar() {
        const toolbar = document.getElementById('quickActionToolbar');
        if (!toolbar) return;

        toolbar.classList.remove('open');
        setTimeout(() => toolbar.style.display = 'none', 300);
        this.isOpen = false;
    }

    renderToolbar() {
        const toolbar = document.getElementById('quickActionToolbar');
        if (!toolbar) return;

        const actionItems = this.actions.map(action => `
            <div class="action-item ${action.category}" onclick="${action.action}">
                <div class="action-icon">
                    <i class="fa fa-${action.icon}"></i>
                </div>
                <div class="action-label">${action.label}</div>
                ${action.shortcut ? `<div class="action-shortcut">${action.shortcut}</div>` : ''}
            </div>
        `).join('');

        toolbar.querySelector('.action-grid').innerHTML = actionItems;
    }

    loadCustomActions() {
        // Load custom actions from localStorage or API
        const customActions = localStorage.getItem('customToolbarActions');
        if (customActions) {
            try {
                const parsed = JSON.parse(customActions);
                this.actions = [...this.actions, ...parsed];
                this.renderToolbar();
            } catch (e) {
                console.error('Failed to load custom actions:', e);
            }
        }
    }

    saveCustomActions() {
        const customActions = this.actions.filter(action =>
            !this.getDefaultActions().find(defaultAction => defaultAction.id === action.id)
        );
        localStorage.setItem('customToolbarActions', JSON.stringify(customActions));
    }
}

// Initialize all optional components
const breadcrumbManager = new BreadcrumbManager('breadcrumbContainer');
const modalManager = new ModalManager();
const notificationManager = new NotificationManager();
const quickActionToolbar = new QuickActionToolbar();

// Global functions for easy access
window.showModal = (config) => modalManager.show(config);
window.closeModal = (modalId) => modalManager.close(modalId);
window.showConfirm = (message, options) => modalManager.confirm(message, options);
window.showAlert = (message, options) => modalManager.alert(message, options);
window.showLoading = (message) => modalManager.loading(message);

window.addNotification = (config) => notificationManager.addNotification(config);
window.removeNotification = (id) => notificationManager.removeNotification(id);
window.markAllAsRead = () => notificationManager.markAllAsRead();
window.clearAllNotifications = () => notificationManager.clearAll();
window.toggleNotificationPanel = () => notificationManager.togglePanel();
window.viewAllNotifications = () => console.log('View all notifications');

window.toggleQuickActionToolbar = () => quickActionToolbar.toggleToolbar();

// Quick action functions
window.quickAddUser = function() {
    showModal({
        title: 'Add New User',
        icon: 'user-plus',
        size: 'md',
        content: `
            <form id="addUserForm">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">First Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Last Name</label>
                            <input type="text" class="form-control" required>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Role</label>
                    <select class="form-select" required>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="moderator">Moderator</option>
                    </select>
                </div>
            </form>
        `,
        confirmText: 'Add User',
        confirmAction: 'submitAddUserForm()'
    });
};

window.quickNewProject = function() {
    showModal({
        title: 'Create New Project',
        icon: 'plus-circle',
        size: 'md',
        content: `
            <form id="newProjectForm">
                <div class="mb-3">
                    <label class="form-label">Project Name</label>
                    <input type="text" class="form-control" placeholder="Enter project name" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" placeholder="Project description"></textarea>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Start Date</label>
                            <input type="date" class="form-control" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Priority</label>
                            <select class="form-select">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>
        `,
        confirmText: 'Create Project',
        confirmAction: 'submitNewProjectForm()'
    });
};

window.quickGenerateReport = function() {
    showModal({
        title: 'Generate Report',
        icon: 'chart-bar',
        size: 'sm',
        content: `
            <div class="mb-3">
                <label class="form-label">Report Type</label>
                <select class="form-select" id="reportType">
                    <option value="sales">Sales Report</option>
                    <option value="users">User Activity</option>
                    <option value="performance">Performance Report</option>
                </select>
            </div>
            <div class="mb-3">
                <label class="form-label">Date Range</label>
                <select class="form-select" id="reportRange">
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                </select>
            </div>
        `,
        confirmText: 'Generate',
        confirmAction: 'generateSelectedReport()'
    });
};

window.quickSendMessage = function() {
    showModal({
        title: 'Send Message',
        icon: 'envelope',
        size: 'md',
        content: `
            <form id="sendMessageForm">
                <div class="mb-3">
                    <label class="form-label">Recipient</label>
                    <select class="form-select" required>
                        <option value="">Select recipient...</option>
                        <option value="all">All Users</option>
                        <option value="admins">Administrators</option>
                        <option value="team">My Team</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Subject</label>
                    <input type="text" class="form-control" placeholder="Message subject" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="4" placeholder="Type your message..." required></textarea>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="urgentMessage">
                    <label class="form-check-label" for="urgentMessage">
                        Mark as urgent
                    </label>
                </div>
            </form>
        `,
        confirmText: 'Send Message',
        confirmAction: 'submitSendMessageForm()'
    });
};

window.quickBackup = function() {
    showConfirm('Create a backup of all data?', {
        title: 'Data Backup',
        confirmText: 'Start Backup',
        onConfirm: 'startDataBackup()'
    });
};

window.quickSettings = function() {
    // Navigate to settings page or show settings modal
    console.log('Navigate to settings');
};

// Helper functions
window.submitAddUserForm = function() {
    const form = document.getElementById('addUserForm');
    if (form && form.checkValidity()) {
        console.log('Adding new user...');
        showAlert('User added successfully!', { title: 'Success' });
    }
};

window.submitNewProjectForm = function() {
    const form = document.getElementById('newProjectForm');
    if (form && form.checkValidity()) {
        console.log('Creating new project...');
        showAlert('Project created successfully!', { title: 'Success' });
    }
};

window.generateSelectedReport = function() {
    const type = document.getElementById('reportType')?.value;
    const range = document.getElementById('reportRange')?.value;

    showLoading(`Generating ${type} report...`);

    // Simulate report generation
    setTimeout(() => {
        closeModal();
        addNotification({
            type: 'success',
            title: 'Report Generated',
            message: `Your ${type} report for the last ${range} days is ready.`,
            action: 'downloadReport()'
        });
    }, 3000);
};

window.submitSendMessageForm = function() {
    const form = document.getElementById('sendMessageForm');
    if (form && form.checkValidity()) {
        console.log('Sending message...');
        showAlert('Message sent successfully!', { title: 'Success' });
    }
};

window.startDataBackup = function() {
    showLoading('Creating backup...');

    setTimeout(() => {
        closeModal();
        addNotification({
            type: 'success',
            title: 'Backup Complete',
            message: 'Data backup has been created successfully.',
            action: 'downloadBackup()'
        });
    }, 5000);
};

window.showToolbarCustomizationModal = function() {
    showModal({
        title: 'Customize Quick Actions',
        icon: 'wrench',
        size: 'lg',
        content: `
            <div class="toolbar-customization">
                <p class="text-muted mb-3">Drag and drop to reorder actions, or toggle visibility:</p>
                <div class="customization-grid">
                    <div class="alert alert-info">
                        <i class="fa fa-info-circle me-2"></i>
                        Toolbar customization interface would be implemented here.
                    </div>
                </div>
            </div>
        `,
        confirmText: 'Save Changes',
        confirmAction: 'saveToolbarCustomization()'
    });
};

// Breadcrumb helper functions
window.refreshCurrentPage = function() {
    console.log('Refreshing current page...');
    showAlert('Page refreshed!', { title: 'Refresh' });
};

window.exportCurrentPage = function() {
    console.log('Exporting current page data...');
    addNotification({
        type: 'success',
        title: 'Export Started',
        message: 'Your data export has been initiated.',
        action: 'downloadExport()'
    });
};

window.shareCurrentPage = function() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showAlert('Page URL copied to clipboard!', { title: 'Share' });
    });
};

// Initialize all optional sections
function initializeOptionalSections() {
    console.log('Initializing optional sections...');

    // Initialize breadcrumbs if container exists
    const breadcrumbContainer = document.getElementById('breadcrumbContainer');
    if (breadcrumbContainer) {
        console.log('Breadcrumbs initialized');
    }

    // Initialize notifications
    console.log('Notifications initialized');

    // Initialize toolbar
    console.log('Quick action toolbar initialized');

    // Add some sample notifications for demonstration
    setTimeout(() => {
        addNotification({
            type: 'info',
            title: 'Welcome to Gentelella!',
            message: 'Optional sections are now active.',
            autoRemove: 5000
        });
    }, 2000);

    setTimeout(() => {
        addNotification({
            type: 'success',
            title: 'Dashboard Ready',
            message: 'All components loaded successfully.',
            autoRemove: 7000
        });
    }, 4000);
}

// Export for potential use in other modules
export { initializeOptionalSections, breadcrumbManager, modalManager, notificationManager, quickActionToolbar };
