---
title: Web storage techs 
createTime: 2025/01/19 10:31:34
permalink: /learn/front/jFPGUzjK9OUAx2E2GN3/
author: JackSim
tags:
  - 客户端存储
  - localStorage
  - IndexedDB

description: description
---

客户端存储技术是现代 Web 应用开发中常用的一类功能，用于在用户设备上存储数据。这种技术可以提高应用性能、支持离线功能以及减少对服务器的依赖。


## 主要类型

### Cookie

1. 每次请求都会附带到 HTTP 请求头中
2. 数据存储在浏览器中，通常有 4KB 的大小限制
3. 支持设置过期时间（通过Expires或者Max-Age属性设置）
4. 安全性较低，但支持 HttpOnly 和 Secure 选项
  
HttpOnly 选项指定该 cookie 只能通过 HTTP 请求 发送，JavaScript 无法访问。

Secure 选项指示该 cookie 只能通过 HTTPS 连接传输，不能通过 HTTP 连接传输。


### LocalStorage

1. 提供简单的键值对存储
2. 数据存储在本地且无过期时间限制
3. 每个域名限制 5-10MB 数据
4. 只能存储字符串数据

### SessionStorage

区别于LocalStorage，**`数据会在页面关闭时清除`**



### IndexedDB

1. NoSQL 事务型数据库
2. 可存储数据达几百 MB

**`IndexedDB 的核心概念`**

- **`数据库（Database）`**
  
  IndexedDB 中的数据库是一个命名空间，可以包含多个对象存储（Object Store）。 一个应用通常只需要一个数据库。

- **`对象存储（Object Store）`**
  
  类似于关系型数据库的表，用于存储特定类型的数据。数据以键值对形式存储，其中键是唯一的，值可以是对象、数组等复杂类型。

- **`事务（Transaction）`**

  IndexedDB 的所有操作都必须通过事务完成，保证数据操作的原子性。事务有三种模式：
  1. 只读（read-only）：只能读取数据。
  2. 读写（readwrite）：可以读取和写入数据。
  3. 版本更改（versionchange）：用于更新数据库结构。

**`IndexedDB 的常用操作`**
```JavaScript

//创建数据库，并创建对象存储
const request = indexedDB.open('MyDatabase', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('users', { keyPath: 'id' });
};

//获取对象存储
const transaction = db.transaction('users', 'readwrite');
const store = transaction.objectStore('users');


//添加数据
store.add({ id: 1, name: 'John Doe', age: 30 });
store.add({ id: 2, name: 'Jane Doe', age: 25 });

//读取数据
const request = store.get(1);
request.onsuccess = () => {
  console.log(request.result); // { id: 1, name: 'John Doe', age: 30 }
};

//更新数据
store.put({ id: 1, name: 'John Doe', age: 35 });

//删除数据
store.delete(1);

```



### Cache Storage（Service Worker 提供）

1. 专用于存储请求和响应对象
2. 与 Service Worker 配合使用，支持离线缓存
3. 不直接存储数据，而是存储 HTTP 请求的响应
4. 缓存内容大小通常在 50MB 到 1GB 之间

更多详情参考[这里](/learn/front/gi23I/#cache_api)