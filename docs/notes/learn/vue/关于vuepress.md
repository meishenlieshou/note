---
title: About VuePress
createTime: 2024/10/11 08:24:36
permalink: /learn/vue/jifdakxk3s/
author: JamesLeo
categories:
  - vue
  - vuepress
tags:
  - Technology
description:
---

# What is VuePress

VuePress is a static site generator centered around Markdown.

## How It Works

VuePress is essentially a single-page application (SPA) driven by Vue and Vue Router.

Routes are automatically generated based on the relative paths of your Markdown files. Each Markdown file is compiled into HTML using markdown-it and then used as a template for Vue components. Therefore, you can directly use Vue syntax in Markdown files, making it easy to embed dynamic content.

In development mode, it starts a dev server and serves the VuePress site as a regular SPA.

During the build process, a server-rendered (SSR) version of the VuePress site is created, and each path is virtually accessed to render the corresponding HTML.
