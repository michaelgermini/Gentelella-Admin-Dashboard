// Theme switcher for Gentelella Admin Dashboard with multiple themes
export class ThemeSwitcher {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'corporate';
        this.themes = {
            corporate: {
                name: 'Corporate',
                primary: '#2C3E50',
                secondary: '#34495E',
                accent: '#3498DB',
                background: '#ECF0F1',
                surface: '#FFFFFF',
                text: '#2C3E50',
                textSecondary: '#7F8C8D',
                border: '#BDC3C7',
                navbar: 'linear-gradient(135deg, #2C3E50, #34495E)',
                sidebar: '#2C3E50',
                card: '#FFFFFF'
            },
            startup: {
                name: 'Startup',
                primary: '#E74C3C',
                secondary: '#C0392B',
                accent: '#F39C12',
                background: '#FFF5F5',
                surface: '#FFFFFF',
                text: '#2C3E50',
                textSecondary: '#7F8C8D',
                border: '#FADBD8',
                navbar: 'linear-gradient(135deg, #E74C3C, #C0392B)',
                sidebar: '#E74C3C',
                card: '#FFFFFF'
            },
            minimal: {
                name: 'Minimal',
                primary: '#2C3E50',
                secondary: '#BDC3C7',
                accent: '#95A5A6',
                background: '#FFFFFF',
                surface: '#F8F9FA',
                text: '#2C3E50',
                textSecondary: '#6C757D',
                border: '#DEE2E6',
                navbar: 'linear-gradient(135deg, #FFFFFF, #F8F9FA)',
                sidebar: '#F8F9FA',
                card: '#FFFFFF'
            },
            dark: {
                name: 'Dark',
                primary: '#E4E7ED',
                secondary: '#2A3F54',
                accent: '#1ABB9C',
                background: '#1A252F',
                surface: '#2A3F54',
                text: '#E4E7ED',
                textSecondary: '#BDC3C7',
                border: '#495C6E',
                navbar: 'linear-gradient(135deg, #2A3F54, #1A252F)',
                sidebar: '#2A3F54',
                card: '#2A3F54'
            }
        };
        this.init();
    }

    init() {
        this.createThemeToggle();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    createThemeToggle() {
        // Create theme selector dropdown in the navbar
        const navbarNav = document.querySelector('.navbar-nav.ms-auto');
        if (navbarNav) {
            const themeDropdown = document.createElement('li');
            themeDropdown.className = 'nav-item dropdown';
            themeDropdown.innerHTML = `
                <a class="nav-link dropdown-toggle" href="#" id="themeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa fa-palette"></i> Theme
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="themeDropdown">
                    ${Object.entries(this.themes).map(([key, theme]) => `
                        <li>
                            <a class="dropdown-item theme-option" href="#" data-theme="${key}">
                                <i class="fa fa-${this.getThemeIcon(key)} me-2"></i>
                                ${theme.name}
                                ${this.currentTheme === key ? '<i class="fa fa-check ms-auto"></i>' : ''}
                            </a>
                        </li>
                    `).join('')}
                </ul>
            `;
            navbarNav.appendChild(themeDropdown);
        }
    }

    getThemeIcon(themeKey) {
        const icons = {
            corporate: 'building',
            startup: 'rocket',
            minimal: 'minus',
            dark: 'moon'
        };
        return icons[themeKey] || 'palette';
    }

    getShadowColor(themeKey) {
        const shadowColors = {
            corporate: 'rgba(44, 62, 80, 0.1)',
            startup: 'rgba(231, 76, 60, 0.1)',
            minimal: 'rgba(44, 62, 80, 0.05)',
            dark: 'rgba(42, 63, 84, 0.3)'
        };
        return shadowColors[themeKey] || 'rgba(0, 0, 0, 0.1)';
    }

    bindEvents() {
        // Bind theme selection events
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTheme = e.currentTarget.dataset.theme;
                this.setTheme(selectedTheme);
                this.updateDropdownSelection();
            });
        });
    }

    updateDropdownSelection() {
        // Update checkmarks in dropdown
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const themeKey = option.dataset.theme;
            const checkIcon = option.querySelector('.fa-check');
            if (themeKey === this.currentTheme) {
                if (!checkIcon) {
                    option.innerHTML += '<i class="fa fa-check ms-auto"></i>';
                }
            } else {
                if (checkIcon) {
                    checkIcon.remove();
                }
            }
        });
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme(this.currentTheme);
        this.updateToggleIcon();
    }

    applyTheme(themeKey) {
        const theme = this.themes[themeKey];
        if (!theme) return;

        const root = document.documentElement;

        // Set data-theme attribute for CSS targeting
        document.body.setAttribute('data-theme', themeKey);

        // Apply CSS custom properties
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--dark-color', theme.secondary);
        root.style.setProperty('--light-color', theme.background);
        root.style.setProperty('--shadow-color', this.getShadowColor(themeKey));

        // Apply theme to body
        document.body.style.backgroundColor = theme.background;
        document.body.style.color = theme.text;

        // Update navbar
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            navbar.style.background = theme.navbar;
            navbar.style.color = theme.text;
        }

        // Update sidebar
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.style.backgroundColor = theme.sidebar;
        }

        // Update cards
        document.querySelectorAll('.card').forEach(card => {
            card.style.backgroundColor = theme.card;
            card.style.color = theme.text;
            card.style.borderColor = theme.border;
        });

        // Update specific elements for better theme consistency
        this.applyThemeSpecificAdjustments(themeKey, theme);
    }

    applyThemeSpecificAdjustments(themeKey, theme) {
        // Corporate theme adjustments
        if (themeKey === 'corporate') {
            document.querySelectorAll('.card-header').forEach(header => {
                header.style.backgroundColor = theme.surface;
                header.style.borderBottomColor = theme.border;
            });
        }

        // Startup theme adjustments
        if (themeKey === 'startup') {
            document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
                btn.style.borderColor = theme.accent;
                btn.style.color = theme.accent;
            });
        }

        // Minimal theme adjustments
        if (themeKey === 'minimal') {
            document.querySelectorAll('.navbar').forEach(navbar => {
                navbar.style.borderBottom = `1px solid ${theme.border}`;
            });
        }

        // Dark theme adjustments
        if (themeKey === 'dark') {
            document.querySelectorAll('.table').forEach(table => {
                table.style.backgroundColor = theme.surface;
            });
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.backgroundColor = theme.surface;
                menu.style.borderColor = theme.border;
            });
        }
    }


    saveTheme(theme) {
        localStorage.setItem('gentelella-theme', theme);
    }

    getSavedTheme() {
        return localStorage.getItem('gentelella-theme');
    }

    // Method to programmatically set theme
    setTheme(theme) {
        if (this.themes[theme]) {
            this.currentTheme = theme;
            this.applyTheme(theme);
            this.saveTheme(theme);
        } else {
            console.warn(`Theme '${theme}' not found. Available themes:`, Object.keys(this.themes));
        }
    }

    // Method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Factory function for easy instantiation
export function createThemeSwitcher() {
    return new ThemeSwitcher();
}
