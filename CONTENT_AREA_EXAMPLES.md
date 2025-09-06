# 🎯 **Main Content Area - Practical Examples**

## 🚀 **Real-World Implementation Examples**

### Example 1: Dynamic KPI Dashboard

#### HTML Structure
```html
<div class="row dashboard-cards">
    <div class="col-md-3">
        <div class="card text-white bg-primary mb-3 kpi-card" data-kpi="users">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">
                            <i class="fa fa-users me-2"></i>Total Users
                        </h5>
                        <h2 class="card-text mb-1" id="users-count">1,234</h2>
                        <small class="text-primary-50">
                            <i class="fa fa-arrow-up"></i> +12% from last month
                        </small>
                    </div>
                    <div class="card-icon">
                        <i class="fa fa-users fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-success mb-3 kpi-card" data-kpi="revenue">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">
                            <i class="fa fa-dollar-sign me-2"></i>Revenue
                        </h5>
                        <h2 class="card-text mb-1" id="revenue-amount">$12,345</h2>
                        <small class="text-success-50">
                            <i class="fa fa-arrow-up"></i> +8% from last month
                        </small>
                    </div>
                    <div class="card-icon">
                        <i class="fa fa-chart-line fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-warning mb-3 kpi-card" data-kpi="orders">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">
                            <i class="fa fa-shopping-cart me-2"></i>Orders
                        </h5>
                        <h2 class="card-text mb-1" id="orders-count">567</h2>
                        <small class="text-warning-50">
                            <i class="fa fa-arrow-up"></i> +15% from last month
                        </small>
                    </div>
                    <div class="card-icon">
                        <i class="fa fa-shopping-cart fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="card text-white bg-danger mb-3 kpi-card" data-kpi="issues">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">
                            <i class="fa fa-exclamation-triangle me-2"></i>Issues
                        </h5>
                        <h2 class="card-text mb-1" id="issues-count">23</h2>
                        <small class="text-danger-50">
                            <i class="fa fa-arrow-down"></i> -5% from last month
                        </small>
                    </div>
                    <div class="card-icon">
                        <i class="fa fa-exclamation-triangle fa-2x opacity-75"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### JavaScript Implementation
```javascript
// KPI Dashboard Manager
class KPIDashboard {
    constructor() {
        this.kpis = {
            users: { current: 1234, previous: 1101, target: 1500 },
            revenue: { current: 12345, previous: 11423, target: 15000 },
            orders: { current: 567, previous: 493, target: 700 },
            issues: { current: 23, previous: 24, target: 10 }
        };
        this.intervals = {};
        this.init();
    }

    init() {
        this.updateAllKPIs();
        this.startRealTimeUpdates();
        this.setupKPIInteractions();
    }

    updateKPI(kpiKey, value, previousValue) {
        const kpi = this.kpis[kpiKey];
        kpi.current = value;
        kpi.previous = previousValue;

        this.renderKPI(kpiKey);
    }

    renderKPI(kpiKey) {
        const kpi = this.kpis[kpiKey];
        const element = document.getElementById(`${kpiKey}-count`);
        const card = element.closest('.kpi-card');

        if (!element) return;

        // Calculate change percentage
        const change = ((kpi.current - kpi.previous) / kpi.previous * 100);
        const isPositive = change >= 0;

        // Animate value change
        this.animateValue(element, kpi.current);

        // Update trend indicator
        const trendElement = element.nextElementSibling;
        const iconClass = isPositive ? 'fa-arrow-up' : 'fa-arrow-down';
        const colorClass = this.getChangeColor(change);

        trendElement.innerHTML = `
            <i class="fa ${iconClass}"></i>
            ${Math.abs(change).toFixed(1)}% from last month
        `;
        trendElement.className = `small text-${colorClass}-50`;

        // Update card color based on performance
        this.updateKPIPerformance(card, kpi);
    }

    animateValue(element, targetValue) {
        const startValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const duration = 1000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
            element.textContent = this.formatNumber(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000) {
            return num.toLocaleString();
        }
        return num.toString();
    }

    getChangeColor(change) {
        if (change > 10) return 'success';
        if (change > 0) return 'primary';
        if (change > -10) return 'warning';
        return 'danger';
    }

    updateKPIPerformance(card, kpi) {
        const performance = (kpi.current / kpi.target) * 100;

        // Remove existing performance classes
        card.classList.remove('kpi-excellent', 'kpi-good', 'kpi-average', 'kpi-poor');

        // Add performance class
        if (performance >= 90) {
            card.classList.add('kpi-excellent');
        } else if (performance >= 75) {
            card.classList.add('kpi-good');
        } else if (performance >= 50) {
            card.classList.add('kpi-average');
        } else {
            card.classList.add('kpi-poor');
        }
    }

    updateAllKPIs() {
        Object.keys(this.kpis).forEach(key => {
            this.renderKPI(key);
        });
    }

    startRealTimeUpdates() {
        // Update KPIs every 30 seconds with simulated data
        setInterval(() => {
            Object.keys(this.kpis).forEach(key => {
                const kpi = this.kpis[key];
                const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
                const newValue = Math.max(0, Math.round(kpi.current * (1 + variation)));

                this.updateKPI(key, newValue, kpi.current);
            });
        }, 30000);
    }

    setupKPIInteractions() {
        document.querySelectorAll('.kpi-card').forEach(card => {
            card.addEventListener('click', () => {
                const kpiKey = card.dataset.kpi;
                this.showKPIDetails(kpiKey);
            });

            // Add hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
    }

    showKPIDetails(kpiKey) {
        const kpi = this.kpis[kpiKey];

        // Create modal with KPI details
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${kpiKey.charAt(0).toUpperCase() + kpiKey.slice(1)} Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row text-center">
                            <div class="col-4">
                                <h4 class="text-primary">${this.formatNumber(kpi.current)}</h4>
                                <small class="text-muted">Current</small>
                            </div>
                            <div class="col-4">
                                <h4 class="text-secondary">${this.formatNumber(kpi.previous)}</h4>
                                <small class="text-muted">Previous</small>
                            </div>
                            <div class="col-4">
                                <h4 class="text-info">${this.formatNumber(kpi.target)}</h4>
                                <small class="text-muted">Target</small>
                            </div>
                        </div>
                        <hr>
                        <div class="progress mt-3">
                            <div class="progress-bar" role="progressbar"
                                 style="width: ${(kpi.current / kpi.target) * 100}%"
                                 aria-valuenow="${kpi.current}" aria-valuemin="0" aria-valuemax="${kpi.target}">
                            </div>
                        </div>
                        <small class="text-muted mt-1 d-block">
                            ${((kpi.current / kpi.target) * 100).toFixed(1)}% of target achieved
                        </small>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        const modalInstance = new bootstrap.Modal(modal);
        modalInstance.show();

        // Clean up modal after hiding
        modal.addEventListener('hidden.bs.modal', () => {
            modal.remove();
        });
    }
}

// Initialize KPI Dashboard
const kpiDashboard = new KPIDashboard();
```

### Example 2: Advanced Data Table with Actions

#### HTML Structure
```html
<div class="row mt-4">
    <div class="col-12">
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5>
                    <i class="fa fa-users me-2"></i>User Management
                </h5>
                <div class="btn-group btn-group-sm">
                    <button class="btn btn-outline-primary" onclick="addNewUser()">
                        <i class="fa fa-plus"></i> Add User
                    </button>
                    <button class="btn btn-outline-secondary" onclick="exportUsers()">
                        <i class="fa fa-download"></i> Export
                    </button>
                    <button class="btn btn-outline-info" onclick="refreshUsers()">
                        <i class="fa fa-refresh"></i> Refresh
                    </button>
                </div>
            </div>
            <div class="card-body">
                <!-- Filters -->
                <div class="row mb-3">
                    <div class="col-md-3">
                        <select class="form-select form-select-sm" id="statusFilter">
                            <option value="">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select form-select-sm" id="roleFilter">
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="moderator">Moderator</option>
                        </select>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control form-control-sm" id="searchUsers" placeholder="Search users...">
                    </div>
                </div>

                <div class="table-responsive">
                    <table id="usersTable" class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" id="selectAllUsers">
                                </th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Last Login</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <!-- Dynamic user rows -->
                        </tbody>
                    </table>
                </div>

                <!-- Bulk Actions -->
                <div class="bulk-actions mt-3 d-none">
                    <div class="d-flex justify-content-between align-items-center">
                        <span id="selectedCount">0 users selected</span>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="bulkActivateUsers()">
                                <i class="fa fa-check"></i> Activate
                            </button>
                            <button class="btn btn-outline-warning" onclick="bulkDeactivateUsers()">
                                <i class="fa fa-pause"></i> Deactivate
                            </button>
                            <button class="btn btn-outline-danger" onclick="bulkDeleteUsers()">
                                <i class="fa fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### JavaScript Implementation
```javascript
// Advanced User Management Table
class UserManagementTable {
    constructor(tableId) {
        this.tableId = tableId;
        this.selectedUsers = new Set();
        this.filters = {
            status: '',
            role: '',
            search: ''
        };
        this.init();
    }

    init() {
        this.initializeTable();
        this.setupFilters();
        this.setupBulkActions();
        this.loadUsers();
    }

    initializeTable() {
        const self = this;

        $(`#${this.tableId}`).DataTable({
            responsive: true,
            pageLength: 10,
            lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
            language: {
                search: "_INPUT_",
                searchPlaceholder: "Search users..."
            },
            columnDefs: [
                {
                    targets: 0,
                    orderable: false,
                    searchable: false,
                    render: (data, type, row) => `
                        <input type="checkbox" class="user-checkbox" value="${row.id}">
                    `
                },
                {
                    targets: 1,
                    render: (data, type, row) => `
                        <img src="${row.avatar}" alt="${row.name}" class="rounded-circle" width="32" height="32">
                    `
                },
                {
                    targets: 5,
                    render: (data, type, row) => {
                        const statusClasses = {
                            active: 'success',
                            inactive: 'secondary',
                            pending: 'warning'
                        };
                        return `<span class="badge bg-${statusClasses[data] || 'secondary'}">${data}</span>`;
                    }
                },
                {
                    targets: 7,
                    orderable: false,
                    searchable: false,
                    render: (data, type, row) => `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary btn-sm" onclick="editUser(${row.id})">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-info btn-sm" onclick="viewUser(${row.id})">
                                <i class="fa fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteUser(${row.id})">
                                <i class="fa fa-trash"></i>
                            </button>
                        </div>
                    `
                }
            ],
            initComplete: function() {
                // Hide DataTables search (we use custom filters)
                $('.dataTables_filter').hide();

                // Setup checkbox handlers
                self.setupCheckboxes();
            }
        });
    }

    setupFilters() {
        // Status filter
        $('#statusFilter').on('change', (e) => {
            this.filters.status = e.target.value;
            this.applyFilters();
        });

        // Role filter
        $('#roleFilter').on('change', (e) => {
            this.filters.role = e.target.value;
            this.applyFilters();
        });

        // Search filter
        $('#searchUsers').on('input', (e) => {
            this.filters.search = e.target.value;
            this.applyFilters();
        });
    }

    applyFilters() {
        const table = $(`#${this.tableId}`).DataTable();

        table.rows().every(function() {
            const data = this.data();
            let show = true;

            // Status filter
            if (this.filters.status && data.status !== this.filters.status) {
                show = false;
            }

            // Role filter
            if (this.filters.role && data.role !== this.filters.role) {
                show = false;
            }

            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const searchableText = `${data.name} ${data.email}`.toLowerCase();
                if (!searchableText.includes(searchTerm)) {
                    show = false;
                }
            }

            if (show) {
                this.nodes().to$().show();
            } else {
                this.nodes().to$().hide();
            }
        });

        table.draw();
    }

    setupCheckboxes() {
        const self = this;

        // Select all checkbox
        $('#selectAllUsers').on('change', function() {
            const isChecked = $(this).is(':checked');
            $('.user-checkbox').prop('checked', isChecked).trigger('change');
        });

        // Individual checkboxes
        $(document).on('change', '.user-checkbox', function() {
            const userId = $(this).val();
            const isChecked = $(this).is(':checked');

            if (isChecked) {
                self.selectedUsers.add(userId);
            } else {
                self.selectedUsers.delete(userId);
            }

            self.updateBulkActions();
            self.updateSelectAllState();
        });
    }

    updateBulkActions() {
        const bulkActions = $('.bulk-actions');
        const selectedCount = this.selectedUsers.size;

        if (selectedCount > 0) {
            bulkActions.removeClass('d-none');
            $('#selectedCount').text(`${selectedCount} user${selectedCount > 1 ? 's' : ''} selected`);
        } else {
            bulkActions.addClass('d-none');
        }
    }

    updateSelectAllState() {
        const totalCheckboxes = $('.user-checkbox').length;
        const checkedCheckboxes = $('.user-checkbox:checked').length;

        $('#selectAllUsers').prop('checked', totalCheckboxes === checkedCheckboxes && totalCheckboxes > 0);
        $('#selectAllUsers').prop('indeterminate', checkedCheckboxes > 0 && checkedCheckboxes < totalCheckboxes);
    }

    setupBulkActions() {
        // Bulk actions are handled by global functions
        window.bulkActivateUsers = () => this.bulkAction('activate');
        window.bulkDeactivateUsers = () => this.bulkAction('deactivate');
        window.bulkDeleteUsers = () => this.bulkAction('delete');
    }

    bulkAction(action) {
        if (this.selectedUsers.size === 0) return;

        const confirmMessage = `Are you sure you want to ${action} ${this.selectedUsers.size} user${this.selectedUsers.size > 1 ? 's' : ''}?`;

        if (confirm(confirmMessage)) {
            // Simulate API call
            console.log(`${action} users:`, Array.from(this.selectedUsers));

            // Clear selection
            this.selectedUsers.clear();
            $('.user-checkbox').prop('checked', false);
            this.updateBulkActions();
            this.updateSelectAllState();

            // Show success message
            this.showNotification(`Successfully ${action}d ${this.selectedUsers.size} users`, 'success');
        }
    }

    async loadUsers() {
        try {
            // Simulate API call
            const users = await this.fetchUsers();
            const table = $(`#${this.tableId}`).DataTable();

            table.clear();
            table.rows.add(users);
            table.draw();

        } catch (error) {
            console.error('Failed to load users:', error);
            this.showNotification('Failed to load users', 'error');
        }
    }

    async fetchUsers() {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock user data
        return [
            {
                id: 1,
                avatar: 'https://via.placeholder.com/32x32/3498db/ffffff?text=U1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'admin',
                status: 'active',
                lastLogin: '2024-01-15 10:30'
            },
            {
                id: 2,
                avatar: 'https://via.placeholder.com/32x32/e74c3c/ffffff?text=U2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                role: 'user',
                status: 'active',
                lastLogin: '2024-01-14 15:45'
            },
            {
                id: 3,
                avatar: 'https://via.placeholder.com/32x32/f39c12/ffffff?text=U3',
                name: 'Bob Johnson',
                email: 'bob@example.com',
                role: 'moderator',
                status: 'inactive',
                lastLogin: '2024-01-10 09:15'
            }
        ];
    }

    showNotification(message, type = 'info') {
        // Implementation for showing notifications
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// Initialize User Management
const userManagement = new UserManagementTable('usersTable');

// Global functions for table actions
window.addNewUser = function() {
    console.log('Add new user');
};

window.editUser = function(userId) {
    console.log('Edit user:', userId);
};

window.viewUser = function(userId) {
    console.log('View user:', userId);
};

window.deleteUser = function(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Delete user:', userId);
    }
};

window.exportUsers = function() {
    console.log('Export users');
};

window.refreshUsers = function() {
    userManagement.loadUsers();
};
```

### Example 3: Interactive Content Tabs

#### HTML Structure
```html
<div class="row mt-4">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs" id="contentTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="overview-tab" data-bs-toggle="tab"
                                data-bs-target="#overview" type="button" role="tab">
                            <i class="fa fa-home me-1"></i>Overview
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="analytics-tab" data-bs-toggle="tab"
                                data-bs-target="#analytics" type="button" role="tab">
                            <i class="fa fa-chart-bar me-1"></i>Analytics
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="reports-tab" data-bs-toggle="tab"
                                data-bs-target="#reports" type="button" role="tab">
                            <i class="fa fa-file-alt me-1"></i>Reports
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="settings-tab" data-bs-toggle="tab"
                                data-bs-target="#settings" type="button" role="tab">
                            <i class="fa fa-cog me-1"></i>Settings
                        </button>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="tab-content" id="contentTabsContent">
                    <!-- Overview Tab -->
                    <div class="tab-pane fade show active" id="overview" role="tabpanel">
                        <div class="row">
                            <div class="col-md-8">
                                <h5>Recent Activity</h5>
                                <div class="activity-feed" id="activityFeed">
                                    <!-- Activity items loaded here -->
                                </div>
                            </div>
                            <div class="col-md-4">
                                <h5>Quick Stats</h5>
                                <div class="quick-stats" id="quickStats">
                                    <!-- Quick stats loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Analytics Tab -->
                    <div class="tab-pane fade" id="analytics" role="tabpanel">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h6>Traffic Overview</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="trafficChart"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h6>User Engagement</h6>
                                    </div>
                                    <div class="card-body">
                                        <canvas id="engagementChart"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Reports Tab -->
                    <div class="tab-pane fade" id="reports" role="tabpanel">
                        <div class="reports-section">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <h5>Generated Reports</h5>
                                <button class="btn btn-primary btn-sm" onclick="generateReport()">
                                    <i class="fa fa-plus me-1"></i>Generate Report
                                </button>
                            </div>
                            <div class="reports-list" id="reportsList">
                                <!-- Reports loaded here -->
                            </div>
                        </div>
                    </div>

                    <!-- Settings Tab -->
                    <div class="tab-pane fade" id="settings" role="tabpanel">
                        <form id="settingsForm">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>General Settings</h6>
                                    <div class="mb-3">
                                        <label class="form-label">Site Name</label>
                                        <input type="text" class="form-control" id="siteName">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label">Default Language</label>
                                        <select class="form-select" id="defaultLanguage">
                                            <option value="en">English</option>
                                            <option value="fr">Français</option>
                                            <option value="es">Español</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <h6>Notifications</h6>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="emailNotifications">
                                        <label class="form-check-label" for="emailNotifications">
                                            Email notifications
                                        </label>
                                    </div>
                                    <div class="form-check mb-2">
                                        <input class="form-check-input" type="checkbox" id="pushNotifications">
                                        <label class="form-check-label" for="pushNotifications">
                                            Push notifications
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button type="submit" class="btn btn-primary">
                                    <i class="fa fa-save me-1"></i>Save Settings
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

#### JavaScript Implementation
```javascript
// Interactive Content Tabs Manager
class ContentTabsManager {
    constructor() {
        this.activeTab = 'overview';
        this.tabContents = {};
        this.init();
    }

    init() {
        this.setupTabEvents();
        this.loadTabContent('overview');
    }

    setupTabEvents() {
        const tabs = document.querySelectorAll('#contentTabs .nav-link');

        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.target.closest('.nav-link').getAttribute('data-bs-target').substring(1);
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabId) {
        if (this.activeTab === tabId) return;

        // Update active tab
        document.querySelectorAll('#contentTabs .nav-link').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-bs-target="#${tabId}"]`).classList.add('active');

        // Update active content
        document.querySelectorAll('.tab-pane').forEach(pane => {
            pane.classList.remove('show', 'active');
        });
        document.getElementById(tabId).classList.add('show', 'active');

        // Load tab content if not already loaded
        if (!this.tabContents[tabId]) {
            this.loadTabContent(tabId);
        }

        this.activeTab = tabId;
    }

    async loadTabContent(tabId) {
        try {
            // Show loading state
            this.showTabLoading(tabId);

            // Load content based on tab
            switch (tabId) {
                case 'overview':
                    await this.loadOverviewContent();
                    break;
                case 'analytics':
                    await this.loadAnalyticsContent();
                    break;
                case 'reports':
                    await this.loadReportsContent();
                    break;
                case 'settings':
                    await this.loadSettingsContent();
                    break;
            }

            this.tabContents[tabId] = true;

        } catch (error) {
            console.error(`Failed to load ${tabId} content:`, error);
            this.showTabError(tabId);
        }
    }

    showTabLoading(tabId) {
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.innerHTML = `
                <div class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2 text-muted">Loading content...</p>
                </div>
            `;
        }
    }

    showTabError(tabId) {
        const tabContent = document.getElementById(tabId);
        if (tabContent) {
            tabContent.innerHTML = `
                <div class="text-center py-5">
                    <div class="text-danger">
                        <i class="fa fa-exclamation-triangle fa-2x mb-2"></i>
                        <p>Failed to load content. Please try again.</p>
                        <button class="btn btn-outline-primary btn-sm" onclick="contentTabs.reloadTab('${tabId}')">
                            <i class="fa fa-refresh me-1"></i>Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }

    async loadOverviewContent() {
        const tabContent = document.getElementById('overview');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        tabContent.innerHTML = `
            <div class="row">
                <div class="col-md-8">
                    <h5>Recent Activity</h5>
                    <div class="activity-feed">
                        <div class="activity-item d-flex align-items-start mb-3">
                            <div class="activity-icon bg-primary text-white rounded-circle me-3">
                                <i class="fa fa-user-plus"></i>
                            </div>
                            <div class="activity-content">
                                <p class="mb-1"><strong>John Doe</strong> joined the team</p>
                                <small class="text-muted">2 hours ago</small>
                            </div>
                        </div>
                        <div class="activity-item d-flex align-items-start mb-3">
                            <div class="activity-icon bg-success text-white rounded-circle me-3">
                                <i class="fa fa-check"></i>
                            </div>
                            <div class="activity-content">
                                <p class="mb-1">Project <strong>"Website Redesign"</strong> completed</p>
                                <small class="text-muted">4 hours ago</small>
                            </div>
                        </div>
                        <div class="activity-item d-flex align-items-start mb-3">
                            <div class="activity-icon bg-warning text-white rounded-circle me-3">
                                <i class="fa fa-upload"></i>
                            </div>
                            <div class="activity-content">
                                <p class="mb-1">New report generated: <strong>Monthly Analytics</strong></p>
                                <small class="text-muted">1 day ago</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <h5>Quick Stats</h5>
                    <div class="quick-stats">
                        <div class="stat-item d-flex justify-content-between align-items-center py-2 border-bottom">
                            <span>Active Users</span>
                            <span class="badge bg-primary">1,234</span>
                        </div>
                        <div class="stat-item d-flex justify-content-between align-items-center py-2 border-bottom">
                            <span>Total Revenue</span>
                            <span class="badge bg-success">$45,678</span>
                        </div>
                        <div class="stat-item d-flex justify-content-between align-items-center py-2 border-bottom">
                            <span>Orders Today</span>
                            <span class="badge bg-info">89</span>
                        </div>
                        <div class="stat-item d-flex justify-content-between align-items-center py-2">
                            <span>Pending Tasks</span>
                            <span class="badge bg-warning">12</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadAnalyticsContent() {
        const tabContent = document.getElementById('analytics');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        tabContent.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6>Traffic Overview</h6>
                        </div>
                        <div class="card-body">
                            <canvas id="trafficChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6>User Engagement</h6>
                        </div>
                        <div class="card-body">
                            <canvas id="engagementChart" width="400" height="200"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Initialize charts after content is loaded
        setTimeout(() => {
            this.initializeAnalyticsCharts();
        }, 100);
    }

    initializeAnalyticsCharts() {
        // Traffic Chart
        const trafficCtx = document.getElementById('trafficChart');
        if (trafficCtx) {
            new Chart(trafficCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Visitors',
                        data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }

        // Engagement Chart
        const engagementCtx = document.getElementById('engagementChart');
        if (engagementCtx) {
            new Chart(engagementCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Desktop', 'Mobile', 'Tablet'],
                    datasets: [{
                        data: [60, 30, 10],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }
    }

    async loadReportsContent() {
        const tabContent = document.getElementById('reports');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));

        tabContent.innerHTML = `
            <div class="reports-section">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>Generated Reports</h5>
                    <button class="btn btn-primary btn-sm" onclick="generateReport()">
                        <i class="fa fa-plus me-1"></i>Generate Report
                    </button>
                </div>
                <div class="reports-list">
                    <div class="report-item d-flex justify-content-between align-items-center p-3 border rounded mb-2">
                        <div>
                            <h6 class="mb-1">Monthly Sales Report</h6>
                            <small class="text-muted">Generated on Jan 15, 2024</small>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="viewReport(1)">
                                <i class="fa fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-secondary" onclick="downloadReport(1)">
                                <i class="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="report-item d-flex justify-content-between align-items-center p-3 border rounded mb-2">
                        <div>
                            <h6 class="mb-1">User Analytics Report</h6>
                            <small class="text-muted">Generated on Jan 14, 2024</small>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary" onclick="viewReport(2)">
                                <i class="fa fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-secondary" onclick="downloadReport(2)">
                                <i class="fa fa-download"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async loadSettingsContent() {
        const tabContent = document.getElementById('settings');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 400));

        tabContent.innerHTML = `
            <form id="settingsForm">
                <div class="row">
                    <div class="col-md-6">
                        <h6>General Settings</h6>
                        <div class="mb-3">
                            <label class="form-label">Site Name</label>
                            <input type="text" class="form-control" id="siteName" value="My Dashboard">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Default Language</label>
                            <select class="form-select" id="defaultLanguage">
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Timezone</label>
                            <select class="form-select" id="timezone">
                                <option value="UTC">UTC</option>
                                <option value="EST">Eastern Time</option>
                                <option value="PST">Pacific Time</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <h6>Notifications</h6>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="emailNotifications" checked>
                            <label class="form-check-label" for="emailNotifications">
                                Email notifications
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="pushNotifications">
                            <label class="form-check-label" for="pushNotifications">
                                Push notifications
                            </label>
                        </div>
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="checkbox" id="smsNotifications">
                            <label class="form-check-label" for="smsNotifications">
                                SMS notifications
                            </label>
                        </div>
                        <h6 class="mt-4">Theme</h6>
                        <div class="mb-3">
                            <label class="form-label">Default Theme</label>
                            <select class="form-select" id="defaultTheme">
                                <option value="corporate">Corporate</option>
                                <option value="startup">Startup</option>
                                <option value="minimal">Minimal</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="mt-3">
                    <button type="submit" class="btn btn-primary">
                        <i class="fa fa-save me-1"></i>Save Settings
                    </button>
                    <button type="button" class="btn btn-outline-secondary ms-2" onclick="resetSettings()">
                        <i class="fa fa-undo me-1"></i>Reset to Default
                    </button>
                </div>
            </form>
        `;

        // Setup form submission
        document.getElementById('settingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });
    }

    saveSettings() {
        const formData = new FormData(document.getElementById('settingsForm'));
        const settings = Object.fromEntries(formData);

        // Add checkbox values
        settings.emailNotifications = document.getElementById('emailNotifications').checked;
        settings.pushNotifications = document.getElementById('pushNotifications').checked;
        settings.smsNotifications = document.getElementById('smsNotifications').checked;

        console.log('Settings saved:', settings);

        // Show success message
        this.showNotification('Settings saved successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Simple notification implementation
        console.log(`[${type.toUpperCase()}] ${message}`);
    }

    reloadTab(tabId) {
        delete this.tabContents[tabId];
        this.loadTabContent(tabId);
    }
}

// Initialize Content Tabs
const contentTabs = new ContentTabsManager();

// Global functions for tab actions
window.generateReport = function() {
    console.log('Generate new report');
    contentTabs.showNotification('Report generation started...', 'info');
};

window.viewReport = function(reportId) {
    console.log('View report:', reportId);
};

window.downloadReport = function(reportId) {
    console.log('Download report:', reportId);
};

window.resetSettings = function() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
        document.getElementById('settingsForm').reset();
        contentTabs.showNotification('Settings reset to default', 'warning');
    }
};
```

## 🎉 **Résumé des Exemples**

Ces exemples démontrent comment créer une **Main Content Area** riche et interactive avec :

### ✅ **Fonctionnalités Implémentées**

1. **KPI Dashboard Dynamique**
   - Animations de valeurs
   - Indicateurs de performance
   - Modales de détails
   - Mises à jour en temps réel

2. **Table de Gestion Avancée**
   - Filtres multiples
   - Sélection en masse
   - Actions groupées
   - Export de données

3. **Système d'Onglets Interactif**
   - Chargement paresseux
   - États de chargement
   - Gestion d'erreurs
   - Contenu dynamique

### ✅ **Techniques Utilisées**

- **Animations fluides** avec CSS transitions
- **Gestion d'état réactive** avec JavaScript
- **Architecture modulaire** pour la maintenabilité
- **Optimisations de performance** avec lazy loading
- **Gestion d'erreurs** robuste
- **Accessibilité** intégrée

### ✅ **Intégration Complète**

- **Thèmes multi-support** avec CSS variables
- **Responsive design** pour tous les appareils
- **DataTables.js** pour les tableaux avancés
- **Chart.js** pour les visualisations
- **Bootstrap 5** pour les composants UI

Ces exemples montrent comment transformer une simple zone de contenu en une **interface utilisateur riche et interactive** qui améliore significativement l'expérience utilisateur du dashboard ! 🚀
