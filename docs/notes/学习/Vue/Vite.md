---
title: Vite
createTime: 2025/01/18 07:21:14
permalink: /learn/vite/L6uVy/
author: JackSim
tags:
  - Vite
  - 前端工程化

description: 
---


Vite 是一个现代化的前端构建工具。

## 优势

- **`快速启动`**：

Vite 使用原生 ES 模块（ESM）来加速开发服务器的启动速度。在开发模式下不需要构建整个项目，而是通过按需加载和转译来实现即时预览。（基于esbuild）

- **`热替换(HMR)`**：

Vite 的 HMR 非常快速，因为它只会替换改变的模块，而不是重新打包整个项目。

- **`构建优化`**：

Vite 内置了对现代浏览器的优化，并且在生产构建时使用了 Rollup，这使得构建的速度和输出的体积都得到优化。

## Vite 与 Webpack 的区别是什么

- **`启动速度`**

Vite 通过原生 ESM 实现了快速启动，而 Webpack 需要构建整个项目才能启动开发服务器，因此 Vite 启动速度远快于 Webpack。

- **`构建方式`**

1. Vite 在开发模式下不需要构建整个项目，而是通过按需加载和转换每个模块来进行开发。
2. Webpack 在开发过程中通常会构建整个项目，尽管可以通过配置优化，但速度相对较慢。

- **`构建优化`**

1. Vite 在生产模式下使用 Rollup 来进行打包，Rollup 对于 Tree Shaking 和代码拆分非常高效，构建结果通常比 Webpack 更小。
2. Webpack 对于大型项目的构建优化可能需要更多的配置和插件支持。

- **`支持的功能`**：

Vite 开箱即用支持 TypeScript、JSX、SASS 等，并且插件机制非常灵活，易于扩展。

- **`HMR 性能`**：

Vite 的 HMR 比 Webpack 快，尤其是在处理大型项目时，Webpack 的 HMR 性能会逐渐下降。

## 如何配置 Vite 来支持多页面应用

Vite 默认是为单页面应用（SPA）优化的，但通过一些配置，Vite 也能够很好地支持多页面应用。Vite 的多页面应用配置主要是通过 build.rollupOptions.input 来实现的.

## Vite 如何实现快速热更新？

Vite 利用原生 ES 模块和增量编译技术，只编译和更新修改过的模块，避免了传统工具需要重新构建整个应用的性能瓶颈。

## Vite 与 Webpack 哪个更适合生产环境？

Webpack 在生产构建上有更多的插件和配置选项，但 Vite 在构建速度和开发体验上更优秀。如果需要非常复杂的构建配置，Webpack 可能会更适合。否则，Vite 是更快速和现代的选择。

## Vite 如何处理依赖？

Vite 使用了浏览器原生的模块系统，在开发过程中直接请求 ES 模块，同时对依赖（如第三方库）进行预构建，以提高性能。

## Vite 如何优化生产环境构建？

Vite 在生产环境中使用 Rollup 进行优化，包括代码分割、树摇、懒加载等特性，从而生成高效、优化过的生产代码。


## Rollup

Rollup 是一个现代的 JavaScript 打包工具，特别适用于库和框架的打包，因其对 ES6 模块的原生支持以及高度的构建优化（如树摇、代码分割）而受到广泛欢迎.

### Rollup 如何处理 ES6 模块和 CommonJS 模块之间的兼容性

Rollup 提供了 @rollup/plugin-commonjs 插件，它能够将 CommonJS 模块转为 ES6 模块，从而让 Rollup 能够进行优化.

### 什么是树摇（tree shaking）？Rollup 如何实现它

树摇（Tree Shaking）是一种通过静态分析代码的方式，去除未被引用的代码（即死代码）的方法。

Rollup 在打包时，能够分析 ES6 模块的 import 和 export，并在生成最终的 bundle 时移除不被使用的模块或代码段，从而减少最终输出文件的体积。为了实现树摇，模块必须使用 ES6 的静态语法（import 和 export），而不是 CommonJS 的 require 和 module.exports。

### Rollup 和 Webpack 有哪些主要区别

1. Rollup 专注于打包
2. Rollup 原生支持 ES6 模块，Webpack 默认支持 CommonJS 和 AMD
3. Rollup 对树摇的优化更为高效，能够产生更加精简的代码
4. Rollup 通常生成一个单一的输出文件. 而 Webpack 可以生成多个输出文件和复杂的代码分割策略。

### Rollup 如何进行代码分割？

通过设置 output.manualChunks 或 output.chunkFileNames，可以将代码分割成多个较小的包，按需加载。Rollup 会在生成的输出文件中包含所有必要的模块，并尽可能将共享模块提取到单独的 chunk 中。
Rollup 提供的manualChunks 选项，让你手动指定拆分策略


## esbuild

esbuild 是一个现代的 JavaScript 和 TypeScript 打包工具，旨在极大地提高构建速度。它使用 Go 编写，设计时考虑了高性能，尤其是在处理大型项目时，它比传统的 JavaScript 构建工具（如 Webpack 和 Rollup）快得多。esbuild 支持 ES6 模块、TypeScript 编译、代码拆分和压缩等功能。

### 性能优势
1. 多线程并发
2. 算法优势
3. 内存效率高
4. 配置简答
   
