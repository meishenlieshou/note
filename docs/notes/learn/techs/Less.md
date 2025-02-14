---
title: Less
createTime: 2025/01/18 07:33:52
permalink: /learn/front/rLvfWeWvH3Ft40ll2I3/
author: Jack
tags:
  - Less
  - CSS Preprocessor

description: description
---

## About Less

LESS is a preprocessor language that extends CSS. It goes through a compilation step before generating the final CSS file, allowing you to use more advanced language features. The resulting CSS file can be used directly in the browser.

## Usage in Projects

To use Less in Webpack/Vite projects, you need to include the Less package and process Less files.

## Features of LESS

- **`Variables`**: Define variables with the @ prefix in Less files and reference them in CSS rules.

- **`Nested Rules`**: Allows nesting of rules within other rules, making CSS more structured and clear.

- **`Mixins`**: Define reusable style rules that can be used in multiple places, similar to function calls.
```Less
// Parameterized mixin
.rounded-corners(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.box { 
  .rounded-corners(10px);
}

// Named mixin
.theme {
  .primary {
    color: white;
    background-color: #007BFF;
  }
  .secondary {
    color: black;
    background-color: #6c757d;
  }
}

.button {
  .theme.primary;
}

// Conditional mixin
.size(@width, @height) when (@width > 0) and (@height > 0) {
  width: @width;
  height: @height;
}

.image {
  .size(100px, 50px); // Condition met, apply styles
}
.empty {
  .size(-10px, 0px);  // Condition not met, no styles applied
}
```

- **`Operations`**: Supports mathematical operations such as addition, subtraction, multiplication, and division in variables or CSS rules.

- **`Import`**: Supports @import to import other Less files, making the code more modular.

- **`Conditional Statements`**: Supports if-else statements, allowing CSS to adjust dynamically.

- **`Functions`**: Create custom functions to further enhance the flexibility and reusability of styles.

  Includes color, mathematical operations, string manipulation, type checking, and if() for logical conditions.

- **`Custom Functions`**

  In Vite or Webpack, configure Less parameters by importing a Less plugin that encapsulates custom functions and enabling javascriptEnabled. The format for defining custom functions in a Less plugin is:
  ```Javascript
  export default function MyLessPlugin() {
    return {
      install: function(lessInstance, pluginManager) {

        // Add double function
        lessInstance.functions.functionRegistry.add('double', (value) => {
          //...
        });

        // Other functions
      }
    };
  }
  ```

## Common Selectors

| Type                | Description                                                      | Example                        |
|---------------------|------------------------------------------------------------------|--------------------------------|
| Nested Selector     | Defines hierarchical structure                                   | `.parent { .child { } }`      |
| Parent Selector (`&`) | References the current selector                                 | `&:hover { }`                 |
| Attribute Selector  | Matches elements based on attributes                             | `[type="text"] { }`           |
| Child Selector (`>`) | Selects direct child elements                                    | `.parent > .child { }`        |
| Universal Selector (`*`) | Selects all child elements                                   | `.parent * { }`               |
| Dynamic Selector    | Dynamically generates selectors using variables                  | `.@{name} { }`                |
| Sibling Selector    | Matches adjacent or general sibling elements                     | `p + p, p ~ p { }`            |
| Media Query Nesting | Nests media queries within selectors                             | `@media (max-width: 600px)`   |





