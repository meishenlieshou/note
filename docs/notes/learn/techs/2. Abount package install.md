---
title: Abount package install
createTime: 2025/02/02 06:52:18
permalink: /learn/front/kkbOSt/
author: JackSim
tags:
  - package.json
  - npm
  - yarn
  - pnpm
  - nodejs
description: 
---

## Node.js and NPM: The Early Days

### What is Node.js?

1. Node.js is a JavaScript runtime built on Chrome’s V8 JavaScript engine. It allows developers to run JavaScript on the server-side, making it possible to use JavaScript for both client-side and server-side development.
2. It was created by Ryan Dahl in **2009** and quickly became popular due to its non-blocking, event-driven architecture which makes it highly efficient for I/O-bound tasks.

### NPM (Node Package Manager)

1. NPM was created in 2010 by Isaac Schlueter as the default package manager for Node.js.
2. It is used to install, share, and manage dependencies (libraries and tools) for Node.js projects.
3. NPM was designed to simplify the process of managing the vast array of libraries and tools available to Node.js developers. As of today, it's the largest package registry in the world.

Command:
```shell
npm install # Installs dependencies based on package.json and package-lock.json.
npm install <package> # Installs a specific package and adds it to package.json.

```


### How NPM Works

1. Package.json: This file is the heart of any Node.js project. It holds metadata about your project and its dependencies, including package versions, scripts, and configurations. More details abount package.json, please [click here](/learn/front/RfcrlizvtcxlfN/)
2. npm install: The most common command for installing packages from the NPM registry. It will install packages listed in package.json or specified in the command.
3. npm install <package_name>: Installs a specific package and adds it to the node_modules folder.

## Other Tools and Package Managers for Node.js

While NPM is the default package manager for Node.js, over time, several other package management tools have emerged to address specific needs, like performance improvements or ease of use.

### Yarn (Facebook’s Alternative)

1. Yarn was introduced by Facebook in 2016 as an alternative to NPM.
2. **Offline caching**: Yarn caches packages so that you can install them later without an internet connection.
3. **Faster installations**: Due to parallel downloads and caching, Yarn tends to be faster than NPM (especially in the earlier days).
4. **Deterministic installs**: Yarn uses a yarn.lock file to ensure that installs are consistent across different machines and environments, addressing issues with dependency versions.
5. **Workspaces**: Yarn supports monorepos and allows multiple packages within a single repository to be managed together. This is a huge help for large projects or organizations.

Commands:
```shell
yarn install  #  Installs dependencies listed in the package.json
yarn add <package> ## Installs a specific package and saves it in package.json
```

### PNPM (Performance Node Package Manager)

PNPM is a relatively new package manager introduced as a performance-focused alternative to NPM and Yarn.

It offers several optimizations, most notably its approach to node_modules.
1. **Efficient disk usage**: PNPM uses a content-addressable store to keep a single copy of each package version, even if multiple projects use the same version. This saves a significant amount of disk space.
2. **Faster installations**: By leveraging the content-addressable store, PNPM speeds up installations by avoiding redundant downloads.

Commands:
```shell
pnpm install # Installs dependencies similarly to NPM and Yarn but uses different strategies to optimize the process.
pnpm add <package> # Installs a specific package and updates the package.json file.

```

### NPM 5 and Later (Modernization of NPM)

NPM 5 (released in 2017) brought several much-needed features to improve its performance, including:
1. **Lockfile support (package-lock.json)**: This ensures deterministic dependency resolution, similar to Yarn’s yarn.lock. It helps avoid version conflicts between development environments.
2. **Faster install times**: NPM’s caching mechanism was improved, making installations faster.
3. **Automatic package installation**: npm install now automatically installs dependencies listed in package.json.

### npx 

npx is a package runner that comes with Node.js (since version 5.2.0 of npm). It allows you to run Node.js executables from npm packages without globally installing them.

Use npx when you want to run a package once or avoid installing it globally. Use npm when you need to install dependencies for repeated use.

## Evolution of NPM and Package Management

- **NPM 1-4**: Early versions were fairly basic, with issues like poor performance and lack of a lock file to guarantee consistent installs. NPM 1-4 had issues with dependency versioning and package duplication, which caused some frustration among developers.
- **NPM 5 (2017)**: Major improvements were introduced, including the introduction of package-lock.json, faster installs, and improved performance. This began to address many of the pain points developers had with NPM in the earlier versions.
- **NPM 6**:  NPM6 introduced support for automatic peer dependency installation, improved error handling, and additional commands like npm audit to check for vulnerabilities in dependencies.
- **NPM 7**: NPM7 added features like workspaces (for monorepos), automatic package-lock updates, and better handling of peer dependencies.
- **NPM 8 and 9 (2021-2022)**: These newer versions continue to refine and enhance performance, add better error messaging, and introduce new features like npm exec for running binaries.

## Evolution of Yarn

### Yarn 2 (Berry) – A Major Overhaul (2020)

In 2020, Yarn 2 (Berry) was released, which marked a major shift in Yarn’s direction and functionality. Some of the key changes with Yarn 2 include:
1. **Plug'n'Play (PnP)**: One of the most notable features of Yarn 2 was the introduction of Plug'n'Play, a new way of resolving dependencies that didn’t rely on a node_modules folder. Instead, Yarn uses a virtual file system to resolve dependencies, which improved install times and reduced disk usage.
2. **Zero-Install**: With Plug’n’Play, Yarn 2 made it possible to avoid having to run yarn install entirely in certain cases. This is useful for reducing CI/CD pipeline times.
3. **Better Monorepo Support**: Yarn 2 expanded on workspaces, improving monorepo management.
4. **Easier plugin system**: The new version of Yarn introduced a flexible plugin system, allowing the community and developers to add custom functionality easily.

### Future of Yarn

Yarn's development continues to evolve, with newer versions (like Yarn 3) continuing to improve performance, maintain compatibility with npm’s ecosystem, and expand functionality. The distinction between npm and Yarn is less pronounced than it used to be, but Yarn remains popular for developers who need features like workspaces, deterministic installs, and monorepo support.


## The Node.js Package Ecosystem

The Node.js ecosystem is constantly evolving, and package management tools are a big part of that evolution.

- **Better performance**: Faster installs, better caching, and more efficient disk usage are always a focus for package managers.
- **Security**: Package managers are increasingly focused on security audits (e.g., npm audit) to identify vulnerabilities in dependencies.
- **Monorepos and Workspaces**: As organizations build larger and more complex applications, the need for managing multiple packages in a single repository has driven the development of workspace features in NPM, Yarn, and PNPM.


## Problems in npm

### What Are Peer Dependencies?

Peer dependencies in npm are packages that a module expects the consumer (your project) to provide. They are commonly used in plugins, libraries, or frameworks that require a specific version of another package to function properly.

Imagine you are developing a React component library that requires React, but you don’t want to install React inside your library because the consuming project should already have it.

### how to resolve peer dependency issues

1. **The --legacy-peer-deps Flag**

The --legacy-peer-deps flag tells npm to ignore peer dependency conflicts and install the dependencies as they were handled in older npm versions (prior to npm 7). This approach doesn’t strictly enforce peer dependency resolutions, which can help avoid installation failures while preserving the overall integrity of the dependency tree.

Use it when

- You are working with older packages that have not updated their peer dependency requirements.
- You want to avoid breaking changes while maintaining some level of dependency integrity.
- You’re installing a specific package, and peer dependency warnings are blocking the installation.

2. **The --force Flag**

The --force flag in npm does exactly what it sounds like: it forces npm to install the package, overriding any conflicts, including peer dependency and version mismatches. While this might seem like a quick fix, it comes with significant risks.

Use it when 

- You have no other option, and you understand the risks.
- You’re working in a temporary environment, such as debugging or testing.
- You plan to immediately address the root cause of the dependency conflict.







