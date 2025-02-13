---
title: ESLint
createTime: 2025/02/13 21:22:58
permalink: /learn/build/3wiFPAUPIcGkCIMZDypr/
author: Jack
tags:
  - ESLint
description: description
---

ESLint is a widely-used, open-source tool for identifying and fixing problems in JavaScript code. It enforces coding standards, detects potential issues, and improves code quality by analyzing your code for errors, style violations, and anti-patterns. It is highly configurable and supports both JavaScript and TypeScript.

## Key Features of ESLint

- **Code Linting**: Checks your code for syntax errors, style violations, and logical mistakes.
- **Highly Configurable**: You can customize rules, extend configurations, or disable rules based on your project's needs.
- **Extensible**: Supports plugins for additional functionality (e.g., React, Vue, TypeScript).
- **Autofix**: Automatically fixes certain issues (e.g., formatting or missing semicolons).
- **Integration with Editors**: Works with most IDEs and text editors, providing real-time linting feedback.
- **Supports Modern JavaScript**: Works with the latest JavaScript features, including ES6+ and TypeScript.

## Why Use ESLint?

- ==Enforces Coding Standards==: Helps maintain consistent code style and quality across your team or project.
- ==Catches Errors Early==: Detects potential bugs or problematic patterns before runtime.
- ==Boosts Productivity==: Saves time during code reviews by enforcing rules automatically.
- ==Integration with Build Tools==: Can be integrated into CI/CD pipelines to ensure code quality before deployment.

## Common Use Cases

- **Finding and Fixing Errors**: Detect undefined variables, unreachable code, or incorrect syntax.
- **Enforcing Code Style**: Ensure consistent formatting (e.g., indentation, quotes, line breaks).
- **Best Practices**: Encourage usage of modern and efficient coding patterns (e.g., prefer const over var).
- **Framework-Specific Rules**: Enforce coding practices for frameworks like React, Vue, or Angular.

## How to Set Up ESLint

### Install ESLint

```shell
npm install eslint --save-dev
```

### Initialize ESLint

```shell
npx eslint --init  # Run the following command to create a configuration file
```
You’ll be prompted to:
1. Choose your coding style.
2. Specify the framework (e.g., React, Vue, TypeScript).
3. Pick a configuration style (e.g., JSON, YAML, or JavaScript).

### Add an ESLint Configuration File 

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}

```

### Run ESLint
```shell
# Lint your files 
npx eslint yourfile.js

# To lint an entire project
npx eslint ./src --ext .js,.jsx,.ts,.tsx

```

You can install the ESLint extension from the marketplace for real-time feedback while coding.

