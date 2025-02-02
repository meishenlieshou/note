---
title: Monorepo
createTime: 2025/01/18 07:31:53
permalink: /learn/front/BMnToay1gGR/
author: Jack
tags:
  - Monorepo
  - 微前端

description: description
---

## 关于Monorepo

Monorepo（Monolithic Repository，单体代码仓库）是一种代码管理模式，它将多个项目的代码存储在同一个版本控制仓库中，而不是使用多个独立的仓库（即 Polyrepo）。Monorepo 常用于大型项目或多个相关子项目的开发。

典型应用场景包括：微前端架构、微服务架构等。

## 典型的Monorepo项目结构
```
my-monorepo/
├── package.json  # 顶层依赖和脚本
├── packages/
│   ├── package-a/  # 子项目 A
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   ├── package-b/  # 子项目 B
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   └── shared/     # 共享模块
│       ├── package.json
│       └── src/
└── lerna.json      # Lerna 配置（如使用）
```

lerna.json文件
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

## 协同工作的图解
```
Root (workspace root)
├── package.json
├── lerna.json
├── yarn.lock
├── node_modules/       <-- 根目录的依赖
└── packages/
    ├── package-a/
    │   ├── package.json
    │   └── node_modules/ <-- 本地无依赖（链接到根目录）
    ├── package-b/
    │   ├── package.json
    │   └── node_modules/ <-- 链接到根目录
    └── shared/
        ├── package.json
        └── node_modules/ <-- 链接到根目录
```

## 它的优点和缺点是什么？

- 优点：统一管理、代码复用、简化协作。
- 缺点：工具复杂性增加、大型仓库的性能问题。

## Monorepo 和 Polyrepo 的区别是什么

- Monorepo：一个仓库管理多个项目，统一版本控制。
- Polyrepo：每个项目有独立的仓库，项目间协作更松散。

## Monorepo + Lerna + Yarn 的组合

- Lerna 提供工具**`管理版本`**、 **`发布`** 和 **`增量构建`**
- Yarn Workspaces 专注于 **`依赖管理`** 和 **`工作区链接`**

### 配置步骤

```Shell
#1. 初始化项目
mkdir my-monorepo
cd my-monorepo
yarn init -y

#2. 启用 Yarn Workspaces。在根目录的package.json中添加配置
{
  "private": true,
  "workspaces": ["packages/*"]
}

#3. 安装 Lerna
yarn add lerna -W

#4. 初始化 Lerna，将生成lerna.json
npx lerna init

#5. 创建子项目
mkdir -p packages/package-a packages/package-b
cd packages/package-a
yarn init -y
cd ../package-b
yarn init -y

#6. 配置子包之间的依赖
yarn workspace package-b add package-a
```

### 常用命令

- **`yarn install`**  安装依赖
- **`yarn workspace package-a add lodash`**   为指定的子项目安装依赖
- **`npx lerna run build`**   Lerna 提供了增量构建的能力，只重新构建受影响的包
- **`npx lerna publish`**  根据变更自动管理版本号并发布









