// Main JavaScript file for Gentelella Admin Dashboard
import { initializeCharts, addDataPoint, removeLastDataPoint } from './charts.js';
import { initializeDataTable } from './datatable.js';
import { initializeUI } from './ui.js';
import { initializeWeatherWidget } from './weather.js';
import { createQuickActions } from '../components/QuickActions.js';
import { createThemeSwitcher } from './theme.js';
import { initializeSidebar } from './sidebar.js';
import { initializeFooter } from './footer.js';
import { initializeOptionalSections } from './optional-sections.js';

// Global functions for HTML onclick handlers
window.addRandomData = function() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomValue = Math.floor(Math.random() * 5000) + 1000;

    addDataPoint('salesChart', randomMonth, [randomValue]);
};

window.removeLastData = function() {
    removeLastDataPoint('salesChart');
};

// Global theme switching functions for console access
let themeSwitcherInstance;
window.switchTheme = function(themeName) {
    if (themeSwitcherInstance) {
        themeSwitcherInstance.setTheme(themeName);
    } else {
        console.warn('Theme switcher not initialized yet');
    }
};

window.getCurrentTheme = function() {
    if (themeSwitcherInstance) {
        return themeSwitcherInstance.getCurrentTheme();
    }
    return null;
};

window.listThemes = function() {
    if (themeSwitcherInstance) {
        console.table(themeSwitcherInstance.themes);
        return Object.keys(themeSwitcherInstance.themes);
    }
    return [];
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Gentelella Admin Dashboard initialized');

    // Initialize sidebar
    initializeSidebar();

    // Initialize footer
    initializeFooter();

    // Initialize optional sections (breadcrumbs, notifications, toolbar)
    initializeOptionalSections();

    // Initialize charts
    initializeCharts();

    // Initialize data tables
    initializeDataTable();

    // Initialize UI components
    initializeUI();

    // Initialize weather widget
    initializeWeatherWidget();

    // Initialize Quick Actions component
    createQuickActions('quickActionsContainer');

    // Initialize theme switcher and store reference
    themeSwitcherInstance = createThemeSwitcher();
});

// Export for potential use in other modules
export { initializeCharts, initializeDataTable, initializeUI, initializeWeatherWidget, createQuickActions, createThemeSwitcher };
