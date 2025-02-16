---
title: Solutions for dynamic themes
createTime: 2025/01/20 21:21:06
permalink: /learn/front/fJJYokDUt0660/
author: Jack
tags:
  - Skinning
  - Theme
  - CSS Variables

description: description
---

## Overview

| **Solution**            | **Applicable Scenarios**                       | **Advantages**                    | **Disadvantages**               |
|-------------------------|-----------------------------------------------|-----------------------------------|---------------------------------|
| CSS Variables           | General, modern projects                      | Simple, efficient, easy to maintain | Requires modern browser support |
| CSS Preprocessor        | Large complex projects                        | Flexible, supports pre-compilation | Less dynamic                   |
| Dynamic Class Switching | Small or simple projects                      | Easy to implement, good compatibility | Potential style conflicts      |
| Component Library Theming | Using UI frameworks like Ant Design, Element Plus | Deep integration with component library | Depends on component library tools |
| Tailwind CSS Dynamic Theme | Tailwind CSS projects                       | Well integrated, native support   | Depends on Tailwind             |

## CSS Variables (CSS Custom Properties)

### **`Principle`**

Define global CSS variables (e.g., colors, font sizes) and dynamically modify the values of CSS variables when switching themes.

### **`Example`**

```CSS
/* Define variables */
:root {
  --primary-color: #007bff;
  --background-color: #ffffff;
  --text-color: #000000;
}

[data-theme="dark"] {
  --primary-color: #1e90ff;
  --background-color: #333333;
  --text-color: #ffffff;
}

/* Use variables */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
.button {
  background-color: var(--primary-color);
}
```

```Javascript
// Switch theme in JavaScript
function switchTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
switchTheme('dark'); 
```

## CSS Preprocessor

### **`Principle`**

Use preprocessor variables (e.g., $variables in Sass) to manage theme styles and generate different theme files through tools during the build phase.

### **`Example`**
```less
/*theme/light-theme.less*/
@primary-color: #007bff;
@background-color: #ffffff;
@text-color: #000000;

/*theme/dark-theme.less*/
@primary-color: #1e90ff;
@background-color: #333333;
@text-color: #ffffff;

/*main.less*/
@import (reference) "./themes/light-theme.less"; // Default to light theme
body {
  background-color: @background-color;
  color: @text-color;
}
.button {
  background-color: @primary-color;
  color: @text-color;
}
```

```Javascript
import less from 'less';

// Theme switching function
async function fetchThemeVariables(theme) {
  const response = await fetch(`/themes/${theme}-theme.less`);
  const themeContent = await response.text();
  return themeContent;
}
function parseLessToVariables(lessContent) {
  const variables = {};
  lessContent.split('\n').forEach((line) => {
    const match = line.match(/^@([\w-]+):\s*(.+);$/);
    if (match) {
      variables[`@${match[1]}`] = match[2];
    }
  });
  return variables;
}
async function switchTheme(theme) {
  try {
    const themeContent = await fetchThemeVariables(theme);
    less.modifyVars(parseLessToVariables(themeContent)); // Update CSS stylesheet based on rules
    console.log(`Switched to ${theme} theme`);
  } catch (error) {
    console.error('Error loading theme:', error);
  }
}

// Switch to dark theme
switchTheme('dark');
```

## Dynamic Class Switching

### **`Principle`**

Dynamically add class names to the root element (e.g., `<html>` or `<body>`) when switching themes to trigger different style rules.

### **`Example`**
```CSS
/* Define variables */
body.light {
  --primary-color: #007bff;
  --background-color: #ffffff;
  --text-color: #000000;
}

body.dark {
  --primary-color: #1e90ff;
  --background-color: #333333;
  --text-color: #ffffff;
}

/* Use variables */
body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

```Javascript
// Switch theme in JavaScript
function switchTheme(theme) {
  document.body.className = theme;
}
switchTheme('dark');
```

## Component Library Theming (Antd)

### **`Principle`**

For projects based on component libraries (e.g., Ant Design, Element Plus), dynamically modify component theme variables or override global styles to achieve theming.

### **`Example`**
```Javascript
// Configuration file
module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A'
          },
          javascriptEnabled: true
        }
      }
    }
  }
};

// Modify theme variables
function changeTheme(theme) {
  window.less.modifyVars(theme);
}
changeTheme({
  'primary-color': '#ff4d4f'
});
```

## Using Tailwind CSS for Dynamic Themes

### **`Principle`**

Tailwind CSS supports dynamic theme extension through theme.extend, combined with darkMode or class to achieve theming.

### **`Example`**
```Javascript
// Define configuration in tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        background: '#ffffff',
        text: '#000000'
      }
    }
  }
};

// Switch theme in code
function switchTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}
switchTheme('dark');
```

```html
<body class="dark">
  <div class="bg-background text-text"></div>
</body>
```
