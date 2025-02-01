---
title: GraphQL
createTime: 2025/01/18 07:33:02
permalink: /learn/front/IBMBYCM2KzbgaO/
author: JackSim
tags:
  - GraphQL
  - 图查询

description: description
---

## 关于GraphQL

GraphQL 是由 Facebook 开发的一种数据查询语言和运行时，旨在提供一种更高效、灵活、强大的方式来与 API 进行交互。它允许客户端通过一个单一的请求获取所需的数据，而不是像传统的 REST API 那样必须发送多个请求。

GraphQL 不仅是一个查询语言，它还包括了一些机制和规范来实现客户端与服务器之间的高效数据传输。


## GraphQL 的特点

1. **`客户端驱动的查询`**   客户端能够指定任意请求中需要的字段，查询不返回多余的数据
2. **`单一入口`**   通过一个接口处理所有请求
3. **`强类型`**   GraphQL 强调类型定义，所有查询和响应数据的结构都是提前定义好的。GraphQL schema 描述了数据类型、查询和变更的方式。
4. **`查询和变更`**
    - **查询（Query）**：用于请求数据。
    - **变更（Mutation）**：用于修改数据（例如创建、更新、删除数据）。
    - **订阅（Subscription）**：用于实时接收数据更新（如 WebSocket 实现的实时数据推送）。
5. **`GraphQL 提供了 introspection 功能`**   允许客户端在运行时查询 API 的 schema，了解哪些字段、类型和操作是可用的。

## 基本概念

- **`Schema`**: GraphQL schema 定义了 API 的结构，明确了有哪些查询和变更类型
- **`Query`**: 用于获取数据，类似于数据库查询
- **`Mutation`**: 修改数据，例如创建、更新和删除资源
- **`Resolver`**: 解析器（resolver）是 GraphQL 中的函数，负责处理实际的查询请求，获取并返回数据。每个字段都有对应的 resolver。
- **`Subscription`**：用于实现实时功能（例如，当数据发生变化时，客户端会立即接收到通知）。

## 常用问题

1. 如何在 GraphQL 中进行错误处理？

  GraphQL 会在响应中提供 errors 字段，用于报告查询过程中的错误，同时保持其他字段的数据完整性。

2. GraphQL 如何实现数据验证？

  数据验证的实现通常依赖于GraphQL Schema 和 resolver 层的配合。GraphQL 是强类型的，数据验证通常在以下几个方面进行：

  - Schema 定义中的类型验证：GraphQL 本身通过严格的类型系统来进行初步的验证。
  - Resolver 层中的额外验证：在 resolver 中，您可以添加业务逻辑验证，例如检查输入数据的有效性、合法性、范围等。 

3. 什么是 GraphQL 的批量请求（Batching）？

  多个 GraphQL 查询或操作合并为一个单一的请求，以减少 HTTP 请求的数量，从而提高性能。

4. 在 GraphQL 中如何实现分页（Pagination）和过滤（Filtering）？

- **`分页 (Pagination)`**
  1. 基于偏移量 (Offset-based Pagination)

    在Schema 中定义分页参数，解析器的实现。

    类似于类似于 SQL 的 LIMIT 和 OFFSET，适用于小型数据集。

  2. 基于游标 (Cursor-based Pagination)

    在 Schema 中定义基于游标的分页参数，解析器的实现。

    更高效，适用于大型数据集。

- **`过滤 (Filtering)`**
  
  过滤通常是根据客户端传递的参数动态构建查询条件。和分页类似，需提前在Schema中定义好过滤参数，然后再解析器里实现。


## 流行的开源项目

### Apollo GraphQL

提供了完整的端到端解决方案。包括Apollo Server，以及Apollo Client。

### GraphQL-JS

GraphQL 的官方 JavaScript 实现，提供了构建 GraphQL API 的基础工具。所有其他 JavaScript 相关的 GraphQL 工具（如 Apollo、Express-GraphQL 等）都是基于这个库构建的。

### Hasura

开箱即用的 GraphQL 引擎，能够直接从您的数据库自动生成一个 GraphQL API。
