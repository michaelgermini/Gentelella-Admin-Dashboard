# 🎯 Gentelella Admin Dashboard - Starter Project

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-7952B3.svg)](https://getbootstrap.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.4-646CFF.svg)](https://vitejs.dev/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.5.0-FF6384.svg)](https://www.chartjs.org/)
[![ECharts](https://img.shields.io/badge/ECharts-6.0.0-8EC9FF.svg)](https://echarts.apache.org/)

A modern, fully responsive **Admin Dashboard template** built with [Gentelella v2.1.1](https://github.com/ColorlibHQ/gentelella), powered by **Bootstrap 5**, **Vite**, **Chart.js**, and **ECharts**. This project provides a production-ready setup for building **admin panels, analytics dashboards, and management systems**.

> ✨ **Live Demo**: [View Demo](https://your-username.github.io/gentelella-admin-dashboard) | 📖 **Documentation**: [Read Docs](./README_COMPLETE.md)

---

## 🚀 Features

### 🎨 **Core Features**
- ✅ **Bootstrap 5.3.8** - Latest responsive design framework
- 📊 **Chart.js 4.5.0** & **ECharts 6.0.0** - Advanced data visualization
- 📈 **12+ chart types** - Bar, line, pie, radar, area, and more
- 🌍 **Interactive maps** & weather widgets with animations
- ⚡ **Vite 7.1.4** - Lightning-fast development & hot reload
- 🛠️ **ESLint + Prettier** - Code quality & formatting

### 🎯 **UI Components**
- 🎨 **4 Built-in Themes** - Corporate, Startup, Minimal, Dark
- 📱 **Fully Responsive** - Mobile-first design approach
- 🧭 **Smart Navigation** - Collapsible sidebar with search
- 📋 **Data Tables** - Sortable, searchable, paginated tables
- 🔔 **Notification System** - Real-time alerts & badges
- 🎛️ **Quick Actions** - Floating toolbar with shortcuts
- 📊 **Dashboard Widgets** - KPI cards, progress bars, stats

### 🛠️ **Developer Experience**
- 📦 **Optimized Builds** - Production-ready bundles
- 🔧 **Hot Module Replacement** - Instant updates during development
- 🎯 **Modular Architecture** - Clean, maintainable code structure
- 🎨 **CSS Variables** - Easy theme customization
- 📱 **Cross-browser** - Modern browser support
- 🚀 **Performance Optimized** - Fast loading & smooth animations


---

## 📸 Screenshots

### 🖥️ Desktop View
![Desktop Dashboard](./screenshots/desktop-dashboard.png)

### 📱 Mobile View
![Mobile Dashboard](./screenshots/mobile-dashboard.png)

### 🎨 Theme Gallery
![Themes Preview](./screenshots/themes-preview.png)

---

## 📂 Project Structure

```
project-root/
├── public/             # Static files (index.html, favicon, etc.)
├── src/
│   ├── assets/         # Images, fonts, icons
│   ├── scripts/        # JavaScript logic (charts, widgets, etc.)
│   ├── styles/         # CSS / SCSS files
│   └── components/     # Optional: reusable UI components
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
└── README.md           # Project documentation
```

---

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** 16+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/gentelella-admin-dashboard.git
   cd gentelella-admin-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Enjoy your admin dashboard! 🎉

### 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

The optimized build will be in the `dist/` folder, ready for deployment.

---

## 🛠️ Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run lint:fix` | Auto-fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run analyze` | Analyze bundle size |

---

## 🎨 Customization Guide

### 🎭 **Themes**
Change themes dynamically using the theme selector in the top navigation:
- **Corporate**: Professional blue theme
- **Startup**: Modern red/orange theme
- **Minimal**: Clean gray theme
- **Dark**: Dark mode theme

### 🧭 **Navigation**
- **Sidebar**: Fully collapsible with search functionality
- **Breadcrumbs**: Dynamic navigation path
- **Quick Actions**: Floating toolbar with shortcuts

### 📊 **Charts & Data**
- **Chart.js**: 12+ chart types supported
- **ECharts**: Advanced visualizations
- **DataTables**: Sortable, searchable tables
- **Weather Widget**: Animated weather icons

### 🔧 **Advanced Customization**
- Edit `src/styles/main.css` for styling
- Modify `src/scripts/` files for functionality
- Add new components in `src/components/`
- Configure Vite in `vite.config.js`

---

## 📦 Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend Framework** | Bootstrap 5.3.8, jQuery 3.7.1 |
| **Build Tool** | Vite 7.1.4, @vitejs/plugin-legacy |
| **Data Visualization** | Chart.js 4.5.0, ECharts 6.0.0 |
| **Tables** | DataTables 2.2.2 (Bootstrap 5 integration) |
| **Icons** | Font Awesome 6.7.1, Weather Icons 1.3.2 |
| **Code Quality** | ESLint 9.15.0, Prettier 3.3.3 |

---

## 📚 Documentation

### 📖 **Complete Documentation**
- **[README_COMPLETE.md](./README_COMPLETE.md)** - Detailed technical documentation
- **[DASHBOARD_STRUCTURE.md](./DASHBOARD_STRUCTURE.md)** - Dashboard architecture
- **[THEMES.md](./THEMES.md)** - Theme customization guide
- **[OPTIONAL_SECTIONS.md](./OPTIONAL_SECTIONS.md)** - Advanced features

### 🔗 **External Resources**
- [Gentelella Official](https://github.com/ColorlibHQ/gentelella) - Original template
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/) - Framework documentation
- [Chart.js Guide](https://www.chartjs.org/docs/) - Chart customization
- [Vite Handbook](https://vitejs.dev/guide/) - Build tool documentation

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### 🐛 **Reporting Issues**
- Use [GitHub Issues](https://github.com/your-username/gentelella-admin-dashboard/issues) for bugs
- Provide detailed steps to reproduce
- Include browser/console logs if applicable

### 💡 **Feature Requests**
- Check existing issues first
- Use the "Enhancement" label for new features
- Provide detailed use cases

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

**Original Template**: [Colorlib Gentelella](https://github.com/ColorlibHQ/gentelella) - MIT License

---

## 🙏 Acknowledgments

- **Colorlib** - Original Gentelella template
- **Bootstrap Team** - Amazing CSS framework
- **Chart.js Contributors** - Powerful visualization library
- **Vite Team** - Fast build tool
- **Open Source Community** - For amazing tools and libraries

---

## 📞 Support

- 📧 **Email**: support@gentelella-admin.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/gentelella-admin-dashboard/issues)
- 📖 **Discussions**: [GitHub Discussions](https://github.com/your-username/gentelella-admin-dashboard/discussions)

---

## 📈 Project Status

![GitHub stars](https://img.shields.io/github/stars/your-username/gentelella-admin-dashboard?style=social)
![GitHub forks](https://img.shields.io/github/forks/your-username/gentelella-admin-dashboard?style=social)
![GitHub issues](https://img.shields.io/github/issues/your-username/gentelella-admin-dashboard)
![GitHub PRs](https://img.shields.io/github/issues-pr/your-username/gentelella-admin-dashboard)

---

*Built with ❤️ using modern web technologies*
