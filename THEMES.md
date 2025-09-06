# 🎨 Gentelella Dashboard - Multi-Theme System

Le système de thèmes multiples permet de personnaliser complètement l'apparence du dashboard avec 4 thèmes prédéfinis.

## 📋 Thèmes Disponibles

### 🏢 **Corporate** (Défaut)
- **Style**: Professionnel et élégant
- **Couleurs**: Bleu corporate (#2C3E50, #3498DB)
- **Idéal pour**: Entreprises traditionnelles, applications B2B

### 🚀 **Startup**
- **Style**: Moderne et dynamique
- **Couleurs**: Rouge startup (#E74C3C, #F39C12)
- **Idéal pour**: Startups, applications innovantes

### ➖ **Minimal**
- **Style**: Épuré et minimaliste
- **Couleurs**: Neutres (#2C3E50, #BDC3C7)
- **Idéal pour**: Interfaces clean, applications SaaS

### 🌙 **Dark**
- **Style**: Mode sombre moderne
- **Couleurs**: Palette sombre (#2A3F54, #1ABB9C)
- **Idéal pour**: Utilisation nocturne, réduction de fatigue oculaire

## 🎯 Comment Utiliser

### Via l'Interface
1. Cliquez sur **"Theme"** dans la barre de navigation
2. Sélectionnez le thème souhaité dans le dropdown
3. Le thème s'applique instantanément

### Via la Console JavaScript
```javascript
// Changer de thème
switchTheme('corporate');  // Corporate
switchTheme('startup');    // Startup
switchTheme('minimal');    // Minimal
switchTheme('dark');       // Dark

// Voir le thème actuel
getCurrentTheme();

// Lister tous les thèmes disponibles
listThemes();
```

### Via Programmation
```javascript
import { createThemeSwitcher } from './src/scripts/theme.js';

const themeSwitcher = createThemeSwitcher();
themeSwitcher.setTheme('startup');
```

## 🔧 Personnalisation Avancée

### Ajouter un Nouveau Thème
```javascript
// Dans theme.js, ajouter à this.themes :
custom: {
    name: 'Custom',
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    accent: '#YOUR_COLOR',
    background: '#YOUR_COLOR',
    surface: '#YOUR_COLOR',
    text: '#YOUR_COLOR',
    textSecondary: '#YOUR_COLOR',
    border: '#YOUR_COLOR',
    navbar: 'linear-gradient(135deg, #COLOR1, #COLOR2)',
    sidebar: '#YOUR_COLOR',
    card: '#YOUR_COLOR'
}
```

### Modifier les Styles CSS
Utilisez les attributs `data-theme` pour des styles spécifiques :
```css
[data-theme="corporate"] .navbar {
    border-bottom: 3px solid var(--accent-color);
}

[data-theme="startup"] .card {
    border-left: 4px solid var(--accent-color);
}
```

## 💾 Persistance

- Le thème sélectionné est automatiquement sauvegardé dans le localStorage
- Le thème persiste entre les sessions de navigation
- Le thème par défaut est "Corporate" si aucun n'est sauvegardé

## 🎨 Fonctionnalités des Thèmes

### Transitions Fluides
- Changements de thème instantanés
- Animations CSS smooth pour tous les éléments
- Transitions de 300ms pour une expérience fluide

### Cohérence Visuelle
- Tous les composants s'adaptent automatiquement
- Icônes et indicateurs thématiques
- Ombres et bordures adaptées à chaque thème

### Accessibilité
- Contraste optimisé pour chaque thème
- Lisibilité maintenue dans tous les modes
- Support des préférences utilisateur

## 🚀 Performance

- Changements de thème en temps réel
- CSS variables pour des performances optimales
- Pas de rechargement de page nécessaire
- Mise en cache automatique des préférences

## 📱 Responsive

Tous les thèmes sont entièrement responsives et s'adaptent :
- Desktop (> 992px)
- Tablet (768px - 991px)
- Mobile (< 768px)

## 🔍 Debugging

Pour déboguer les thèmes dans la console :
```javascript
// Voir les variables CSS actuelles
getComputedStyle(document.body).getPropertyValue('--primary-color');

// Inspecter l'attribut data-theme
document.body.getAttribute('data-theme');

// Lister tous les thèmes disponibles
listThemes();
```
