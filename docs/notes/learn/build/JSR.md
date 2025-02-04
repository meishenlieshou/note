---
title: JSR
createTime: 2025/02/04 09:22:22
permalink: /learn/build/ZzGCrawyd/
author: JackSim
tags:
  - JSR
  - NPM
  - NODEJS
  - Typescript
description: 
---

## Why JSR

The incredible success of Node.js has been driven in large part by the success of npm. With 2 million (going on 3 million) packages, npm is likely the most successful package manager and registry in history. The JavaScript community should look on this accomplishment with pride.

So why build JSR when npm exists? Because the world today is not the same as it was when npm was originally introduced:

- ECMAScript modules have **arrived as a standard**. The web platform has now adopted ESM as the module format of choice, superseding CommonJS.
- There are **more JavaScript runtimes** than just Node.js and browsers. With the emergence of Deno, Bun, workerd, and other new JavaScript environments, a **Node.js-centric** package registry no longer makes sense for the entire JS ecosystem.
- **TypeScript has emerged as a de facto standard**. TypeScript, as a superset of JavaScript and test bed for the latest ECMAScript features, has emerged as a default choice for non-trivial JavaScript codebases. A modern registry should be designed with TypeScript in mind.

In addition to these shifting requirements, there are also opportunities to improve on the developer experience, performance, reliability, and security of npm. JSR was created to address these new requirements and take on these opportunities.

**The JSR board members include**:
- Evan You: creator of Vue.js and Vite
- Isaac Schlueter: creator of npm
- James Snell: Nodejs TSC member, Principal System Engineer at Cloudflare
- Luca Casonato: Software Engineer as Deno
- Ryan Dahl: creator of Nodejs and Deno


## Reasons why we think you should consider using JSR.

### Native TypeScript support

### ECMAScript modules only

The web standard for JavaScript modules is ESM. A modern package registry should rally around this standard and shift the community in this direction. For this reason, JSR was designed for ESM only.

### Cross-runtime support

The goal of JSR is to work everywhere JavaScript works, and to provide a runtime-agnostic registry for JavaScript and TypeScript code. Today, JSR works with Deno and other npm environments that populate a node_modules. This means that Node.js, Bun, Cloudflare Workers, and other projects that manage dependencies with a package.json can interoperate with JSR as well.

### JSR is a superset of npm

You can use JSR packages in any runtime environment that uses a node_modules folder. JSR modules can import dependencies from npm.

### Outstanding developer experience

- Easy publishing with a single command - the CLI will walk you through the rest
- Automatic API documentation generation from source code
- Zero-config publishing from GitHub Actions
- Automatic inclusion of .d.ts files for Node.js/npm distribution
- Automated guidance on TypeScript best practices that will keep your code loading as fast as possible.

### Fast, secure, and reliable

- JSR uses a global CDN to serve packages, and uses local caching and high parallelism to speed up downloads.
- JSR package uploads are immutable, so you can trust that packages will never change after downloading them or disappear underneath you.
- JSR package downloads are efficient, downloading only the exact files you are importing.
- JSR uses OIDC-based authentication for publishing packages from CI, and uses a tokenless interactive authentication flow for publishing from a local machine.

