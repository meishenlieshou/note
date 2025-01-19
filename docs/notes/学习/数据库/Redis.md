---
title: Redis
createTime: 2025/01/19 15:20:51
permalink: /learn/db/2T5enzdd/
author: JackSim
tags:
  - Redis
  - 数据库
  - 内存数据库

description: description
---

## 关于Redis

Redis 是一个开源的、内存中的数据存储系统，常被用作缓存、消息队列、数据库和任务调度工具。

它的全名是 Remote Dictionary Server，虽然 Redis 可以持久化数据到磁盘，但它主要是一个内存数据库，所有的操作都发生在内存中，具有极高的性能。

## 特征

- 高性能
- 可持久化
- 支持事务
- 支持主从复制（Replication）和分布式部署
- 支持发布/订阅模式，可以通过频道来广播消息，适用于实时通知系统等

>[!NOTE]
>数据库的 事务（Transaction）是一个操作序列，这些操作要么完全执行，要么完全不执行。换句话说，事务是一个数据库操作的集合，它们被视为一个单一的“单位”，要么全部成功，要么全部失败，不会出现只部分成功的情况。事务的目的是保证数据的一致性、完整性和可靠性。

## 基于 JavaScript 操作 Redis 的node-redis

node-redis 是一个非常流行的 Redis 客户端库，专门为 Node.js 开发者设计，它允许与 Redis 数据库进行高效的交互。通过 node-redis，你可以在 Node.js 环境中轻松地执行 Redis 命令，并与 Redis 的多种数据结构（如字符串、哈希、列表、集合等）进行交互。


## 基本使用

1. 安装node-redis
```Shell
npm install redis
```

2. 使用
```Javascript
const redis = require('redis');

// 创建一个默认的客户端连接
const client = redis.createClient();  //默认情况下，Redis 运行在 localhost:6379 上

// 连接成功后的回调
client.on('connect', function() {
    console.log('Connected to Redis');
    //后续的操作，都是基于client对象调用
});

```

## 支持各类 Redis 命令

字符操作、哈希操作、集合、有序集合、发布/订阅。所有操作相关方法，均可通过client对象引用到并调用



