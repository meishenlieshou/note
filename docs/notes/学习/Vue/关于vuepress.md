---
title: 关于vuepress
createTime: 2024-10-11 08:24:36
permalink: /learn/vue/jifdakxk3s/
author: JamesLeo
categories:
  - vue
  - vuepress
tags:
  - 技术
description:
---

# vuepress是什么

VuePress 是一个以 Markdown 为中心的静态网站生成器。

## 工作原理

VuePress本质上是一个由 Vue 和 Vue Router 驱动的单页面应用 (SPA)。

路由会根据你的 Markdown 文件的相对路径来自动生成。每个 Markdown 文件都通过 markdown-it 编译为 HTML ，然后将其作为 Vue 组件的模板。因此，你可以在 Markdown 文件中直接使用 Vue 语法，便于你嵌入一些动态内容。

开发模式，它会启动一个dev server，并将 VuePress 站点作为一个常规的 SPA。

构建过程中，我们会为 VuePress 站点创建一个服务端渲染 (SSR) 的版本，然后通过虚拟访问每一条路径来渲染对应的 HTML。
