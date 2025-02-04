---
title: Deno
createTime: 2025/02/04 10:22:54
permalink: /learn/front/Deno/
author: JackSim
tags:
  - Deno
  - NodeJS
  - Typescript
description: description
---

## What is Deno

Deno is a modern runtime for JavaScript and TypeScript, created by Ryan Dahl, the same person who initially created Node.js. **Deno was designed to address some of the shortcomings of Node.js** and to provide a more secure, efficient, and developer-friendly environment for building server-side applications and tooling in JavaScript and TypeScript.


## Key Characteristics of Deno

### Built-in TypeScript Support

One of the standout features of Deno is that it has first-class TypeScript support right out of the box. Unlike Node.js, which requires additional tooling (like Babel or TypeScript compilers), Deno can natively run TypeScript code without any setup.

### Security

Deno is secure by default. By default, it does not allow access to the file system, network, or environment variables unless explicitly granted. This is a security feature aimed at protecting against malicious code.

When running a Deno script, you can grant permissions to read from or write to the file system, access the network, or even run subprocesses via command-line flags like --allow-read, --allow-net, etc.


### No node_modules

Deno doesn’t use a package manager like npm or yarn. Instead, it imports modules directly from URLs, including local file paths, remote URLs (from CDN), or even GitHub repositories.

### Standard Library

- Deno has a standard library that is built-in and secure. Unlike Node.js, where developers often rely on third-party packages for core functionalities (like HTTP server, file system manipulation, etc.), Deno’s standard library provides many built-in tools that are secure and go through a vetting process.
- Example modules in the standard library include HTTP handling, file I/O, crypto utilities, and more.

### Single Executable

Deno is a single executable binary. The deno command-line tool handles everything, including running the application, managing modules, formatting code, testing, bundling, and more. This contrasts with Node.js, where you need additional tools (like npm, webpack, etc.) to perform certain tasks.

### ES Modules (ESM) by Default

Deno uses ES modules (ESM) for JavaScript and TypeScript, in contrast to Node.js, which used to rely heavily on CommonJS modules (require/module.exports). In Deno, you import and export using the modern import/export syntax.

### No package.json

Deno does not use the package.json file for dependency management. Instead, it directly imports modules via URLs and handles caching automatically. The lack of a centralized package management system is a fundamental difference from Node.js.

### Tooling Support

Deno comes with several built-in tools

- Deno fmt: Automatically formats your code (like Prettier).
- Deno lint: Lint your code (like ESLint).
- Deno test: A built-in testing framework for running unit tests.
- Deno bundle: Bundles TypeScript or JavaScript code into a single file.
- Deno doc: Generates documentation from your code.
- Deno run: Runs a script


## How Deno Differs from Node.js

| Feature               | **Deno**                                             | **Node.js**                                          |
|-----------------------|------------------------------------------------------|------------------------------------------------------|
| **Runtime**           | Written in **Rust**, with modern architecture.      | Written in **C++** with a focus on performance.      |
| **Module system**     | Uses **ES modules** natively, supports **TypeScript**. | Uses **CommonJS** and **ES Modules** (via Babel/experimental). |
| **Package manager**   | No package manager; imports are done via URLs.      | Uses **npm** (or **yarn**) for dependency management.|
| **Security**          | **Secure by default** (requires explicit permissions for accessing files, network, etc.). | No security by default.                             |
| **Standard library**  | Rich, secure, and built-in standard library.         | Node.js standard library is less opinionated and has a large third-party ecosystem. |
| **File system access**| Requires explicit permissions to access files.      | No restrictions on file system access.              |
| **Built-in tools**    | Includes tools for testing, linting, formatting, and bundling. | Requires third-party tools for tasks like testing, formatting, and linting (e.g., Jest, ESLint). |
| **Package management**| No `node_modules` folder, uses URL-based imports.   | `node_modules` folder for managing dependencies.     |





