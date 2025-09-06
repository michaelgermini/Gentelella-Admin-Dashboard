# 🤝 Contributing to Gentelella Admin Dashboard

Thank you for your interest in contributing to the Gentelella Admin Dashboard! We welcome contributions from the community.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:
- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Git
- A code editor (VS Code recommended)

### Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/gentelella-admin-dashboard.git
   cd gentelella-admin-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

## 🔄 Development Workflow

### 1. Choose an Issue
- Check [GitHub Issues](https://github.com/your-username/gentelella-admin-dashboard/issues) for open tasks
- Comment on the issue to indicate you're working on it
- Create a new issue if you have a feature request

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Changes
- Follow the [coding standards](#coding-standards)
- Test your changes thoroughly
- Update documentation if needed
- Commit with clear, descriptive messages

### 4. Test Your Changes
```bash
# Run linting
npm run lint

# Format code
npm run format

# Build for production
npm run build

# Test in different browsers
```

## 📝 Pull Request Process

### Before Submitting
1. **Update documentation** - Ensure README and docs are current
2. **Test thoroughly** - Check all functionality works
3. **Follow coding standards** - Run linting and formatting
4. **Update dependencies** - If you add new packages

### Creating a Pull Request
1. Push your branch to your fork
2. Go to the original repository
3. Click "New Pull Request"
4. Fill out the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Screenshots**: If UI changes were made
   - **Testing**: How you tested the changes

### PR Review Process
- Maintainers will review your PR
- Address any feedback or requested changes
- Once approved, your PR will be merged
- Your contribution will be acknowledged!

## 💻 Coding Standards

### JavaScript
- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable/function names
- Add JSDoc comments for functions
- Keep functions small and focused

### CSS
- Use CSS custom properties (variables)
- Follow BEM naming convention when possible
- Maintain consistent spacing and formatting
- Use responsive design principles
- Optimize for performance

### HTML
- Use semantic HTML5 elements
- Maintain accessibility standards
- Follow Bootstrap 5 conventions
- Keep markup clean and semantic

### Git Commits
- Use clear, descriptive commit messages
- Follow conventional commit format:
  ```
  feat: add new dashboard widget
  fix: resolve sidebar responsive issue
  docs: update installation guide
  style: format CSS according to standards
  refactor: optimize chart rendering performance
  ```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on different screen sizes (mobile, tablet, desktop)
- [ ] Verify all themes work correctly
- [ ] Check accessibility with keyboard navigation
- [ ] Test all interactive elements
- [ ] Verify charts and data tables work
- [ ] Check form validation and submission

### Automated Testing
```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Build and test production bundle
npm run build
npm run preview
```

## 📚 Documentation

### Updating Documentation
- Keep README.md current with new features
- Update inline code comments
- Document new configuration options
- Provide examples for new features

### Documentation Files
- `README.md` - Main project documentation
- `README_COMPLETE.md` - Detailed technical docs
- `THEMES.md` - Theme customization guide
- `DASHBOARD_STRUCTURE.md` - Architecture documentation

## 🎯 Types of Contributions

### 💡 Feature Requests
- New dashboard components
- Additional chart types
- Theme enhancements
- Performance improvements

### 🐛 Bug Fixes
- UI/UX issues
- JavaScript errors
- Responsive design problems
- Browser compatibility issues

### 📖 Documentation
- Improve existing docs
- Add code examples
- Create tutorials
- Translate documentation

### 🎨 Design
- UI/UX improvements
- New themes
- Icon updates
- Visual enhancements

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Join GitHub Discussions for questions
- **Email**: Contact maintainers for sensitive matters

## 🙏 Recognition

Contributors will be:
- Listed in the README acknowledgments
- Mentioned in release notes
- Added to the contributor list
- Recognized in the project's hall of fame

Thank you for contributing to the Gentelella Admin Dashboard! 🚀
