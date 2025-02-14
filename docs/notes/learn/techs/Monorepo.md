---
title: Monorepo
createTime: 2025/01/18 07:31:53
permalink: /learn/front/BMnToay1gGR/
author: Jack
tags:
  - Monorepo
  - Micro frontend

description: description
---

## About Monorepo

Monorepo (Monolithic Repository) is a code management pattern that stores the code of multiple projects in a single version control repository, instead of using multiple independent repositories (Polyrepo). Monorepo is commonly used for large projects or multiple related sub-projects.

Typical application scenarios include micro frontend architecture, microservices architecture, etc.

## Typical Monorepo Project Structure
```
my-monorepo/
├── package.json  # Top-level dependencies and scripts
├── packages/
│   ├── package-a/  # Sub-project A
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   ├── package-b/  # Sub-project B
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   └── shared/     # Shared modules
│       ├── package.json
│       └── src/
└── lerna.json      # Lerna configuration (if used)
```

lerna.json file
```json
{
  "packages": [
    "packages/*"
  ],
  "version": "independent",
  "npmClient": "yarn",
  "useWorkspace": true
}
```

## Diagram of Collaborative Work
```
Root (workspace root)
├── package.json
├── lerna.json
├── yarn.lock
├── node_modules/       <-- Dependencies in the root directory
└── packages/
    ├── package-a/
    │   ├── package.json
    │   └── node_modules/ <-- No local dependencies (linked to root directory)
    ├── package-b/
    │   ├── package.json
    │   └── node_modules/ <-- Linked to root directory
    └── shared/
        ├── package.json
        └── node_modules/ <-- Linked to root directory
```

## What are its advantages and disadvantages?

- Advantages: Unified management, code reuse, simplified collaboration.
- Disadvantages: Increased tool complexity, performance issues with large repositories.

## What is the difference between Monorepo and Polyrepo?

- Monorepo: One repository manages multiple projects, unified version control.
- Polyrepo: Each project has an independent repository, looser collaboration between projects.

## Combination of Monorepo + Lerna + Yarn

- Lerna provides tools for **`version management`**, **`publishing`**, and **`incremental builds`**
- Yarn Workspaces focus on **`dependency management`** and **`workspace linking`**

### Configuration Steps

```Shell
#1. Initialize the project
mkdir my-monorepo
cd my-monorepo
yarn init -y

#2. Enable Yarn Workspaces. Add configuration to the root package.json
{
  "private": true,
  "workspaces": ["packages/*"]
}

#3. Install Lerna
yarn add lerna -W

#4. Initialize Lerna, which will generate lerna.json
npx lerna init

#5. Create sub-projects
mkdir -p packages/package-a packages/package-b
cd packages/package-a
yarn init -y
cd ../package-b
yarn init -y

#6. Configure dependencies between sub-packages
yarn workspace package-b add package-a
```

### Common Commands

- **`yarn install`**: Install dependencies
- **`yarn workspace package-a add lodash`**: Install dependencies for a specified sub-project
- **`npx lerna run build`**: Lerna provides incremental build capabilities, only rebuilding affected packages
- **`npx lerna publish`**: Automatically manage version numbers and publish based on changes









