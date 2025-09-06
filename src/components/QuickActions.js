// Quick Actions Component - Reusable component example
export class QuickActions {
    constructor(containerId, actions = []) {
        this.container = document.getElementById(containerId);
        this.actions = actions.length > 0 ? actions : this.getDefaultActions();
        this.render();
        this.bindEvents();
    }

    getDefaultActions() {
        return [
            {
                id: 'add-user',
                icon: 'fa-user-plus',
                title: 'Add User',
                color: 'primary',
                action: () => this.showAlert('Add User functionality would open here')
            },
            {
                id: 'export-data',
                icon: 'fa-download',
                title: 'Export Data',
                color: 'success',
                action: () => this.showAlert('Export functionality would start here')
            },
            {
                id: 'settings',
                icon: 'fa-cog',
                title: 'Settings',
                color: 'warning',
                action: () => this.showAlert('Settings panel would open here')
            },
            {
                id: 'reports',
                icon: 'fa-chart-line',
                title: 'Reports',
                color: 'info',
                action: () => this.showAlert('Reports page would load here')
            }
        ];
    }

    render() {
        if (!this.container) return;

        const actionsHTML = this.actions.map(action => `
            <div class="col-md-3 mb-3">
                <div class="card quick-action-card border-${action.color}" role="button" data-action="${action.id}">
                    <div class="card-body text-center">
                        <i class="fa ${action.icon} fa-2x text-${action.color} mb-2"></i>
                        <h6 class="card-title">${action.title}</h6>
                        <small class="text-muted">Click to ${action.title.toLowerCase()}</small>
                    </div>
                </div>
            </div>
        `).join('');

        this.container.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h5><i class="fa fa-bolt"></i> Quick Actions</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        ${actionsHTML}
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        this.actions.forEach(action => {
            const element = this.container.querySelector(`[data-action="${action.id}"]`);
            if (element) {
                element.addEventListener('click', () => {
                    action.action();
                    // Add visual feedback
                    element.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        element.style.transform = 'scale(1)';
                    }, 150);
                });
            }
        });
    }

    showAlert(message) {
        // Create a simple alert notification
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-info alert-dismissible fade show position-fixed';
        alertDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(alertDiv);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 3000);
    }

    // Method to add new actions dynamically
    addAction(action) {
        this.actions.push(action);
        this.render();
        this.bindEvents();
    }

    // Method to remove actions
    removeAction(actionId) {
        this.actions = this.actions.filter(action => action.id !== actionId);
        this.render();
        this.bindEvents();
    }
}

// Factory function for easy instantiation
export function createQuickActions(containerId, actions = []) {
    return new QuickActions(containerId, actions);
}
