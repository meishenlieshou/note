---
title: Less
createTime: 2025/01/18 07:33:52
permalink: /learn/front/rLvfWeWvH3Ft40ll2I3/
author: Jack
tags:
  - Less
  - CSS预处理器

description: description
---

## 关于Less

LESS 是一种扩展了 CSS 的预处理器语言，它在最终生成 CSS 文件之前，会经过编译的步骤，从而允许你使用更高级的语言特性。最终生成的 CSS 文件可以在浏览器中直接使用。

## 在项目中使用

Webpack/Vite项目中使用less，需要引入less包，对less文件进行处理。

## LESS 的特点

- **`变量`**：在less文件里通过@前缀符定义变量，css规则里引用。

- **`嵌套规则`**：可以在样式规则中嵌套其他规则，使得 CSS 更加结构化和清晰。

- **`混合（Mixins）`**：可以定义样式规则并在多个地方复用，类似函数调用的概念。
```Less
//按需传参混合-----------
.rounded-corners(@radius) {
  -webkit-border-radius: @radius;
  -moz-border-radius: @radius;
  border-radius: @radius;
}

.box { 
  .rounded-corners(10px);
}

//命名混合-----------
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

//带逻辑的混合-----------
.size(@width, @height) when (@width > 0) and (@height > 0) {
  width: @width;
  height: @height;
}


.image {
  .size(100px, 50px); // 触发条件，应用样式
}
.empty {
  .size(-10px, 0px);  // 条件不满足，不输出样式
}
```

- **`运算`**：支持在变量里、或者css规则里进行数学运算，如加、减、乘、除等。

- **`导入（Import）`**：支持 @import 导入其他 LESS 文件，使得代码更加模块化。

- **`条件判断`**：支持 if-else 判断，使得 CSS 可以动态调整。

- **`函数`**：可以创建自定义函数，进一步增强样式的灵活性和可重用性。

  包括颜色、数学运算、字符串处理、类型检查、用于逻辑判断的if()

- **`自定义函数`**

  在vite或者webpack配置less的参数里，通过plugins引入封装了自定义函数的less插件，同时开启javascriptEnabled。less插件里定义自定义函数的格式为
  ```Javascript
  export default function MyLessPlugin() {
    return {
      install: function(lessInstance, pluginManager) {

        //新增double函数
        lessInstance.functions.functionRegistry.add('double', (value) => {
          //...
        });

        //其它函数
      }
    };
  }
  ```

## 常用的选择器

| 类型              | 描述                                                                 | 示例                          |
|-------------------|----------------------------------------------------------------------|-------------------------------|
| 嵌套选择器         | 定义层级结构                                                       | `.parent { .child { } }`      |
| 父选择器 (`&`)    | 引用当前选择器                                                     | `&:hover { }`                 |
| 属性选择器         | 根据属性匹配元素                                                   | `[type="text"] { }`           |
| 子选择器 (`>`)    | 选择直接子元素                                                     | `.parent > .child { }`        |
| 通配符选择器 (`*`) | 选择所有子元素                                                     | `.parent * { }`               |
| 动态选择器         | 使用变量动态生成选择器                                             | `.@{name} { }`                |
| 兄弟选择器         | 匹配相邻或通用兄弟元素                                             | `p + p, p ~ p { }`            |
| 媒体查询嵌套       | 在选择器中嵌套媒体查询                                             | `@media (max-width: 600px)`   |

 



