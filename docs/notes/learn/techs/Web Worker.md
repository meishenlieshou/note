---
title: Web Worker
createTime: 2025/01/18 07:28:43
permalink: /learn/front/XgIbXL/
author: JackSim
tags:
  - Web Worker
  - 原生技术

description: description
---

## 关于Web worker

Web Worker 是一种浏览器技术，允许在独立线程中运行 JavaScript 代码，从而避免阻塞主线程（UI 线程）。它适合处理耗时的计算任务，例如数据处理、复杂算法等，以提升页面的响应性。

## Web Worker 特点

1. **`独立线程`**
2. **`不能直接访问 DOM、window、document 或 localStorage`**

## Web Worker 支持哪些类型的 Worker

1. **`Dedicated Worker（专用 Worker）`**： 每个 Worker 只能被一个主线程使用。

2. **`Shared Worker（共享 Worker）`**:  多个主线程可以共享一个 Worker，适合跨页面通信。
   ```JavaScript
    self.onconnect = function (e) {
      const port = e.ports[0];
      port.onmessage = function (event) {
        port.postMessage('Hello from Shared Worker');
      };
    };

    const worker = new SharedWorker('sharedWorker.js');
    worker.port.onmessage = function (e) {
      console.log(e.data);
    };
    worker.port.postMessage('Hello');
   ```

3. **`Service Worker`**:  
   1. 用于拦截网络请求，实现离线缓存。
   2. 不直接与 UI 线程通信，而是通过 postMessage 或消息通道。
   [更多请参考](/learn/front/gi23I/)


## Web Worker 如何加载外部脚本

1. **`importScripts()`**

2. **`通过构造函数传递脚本`**

```JavaScript
// main.js
const workerCode = `
  onmessage = function(e) {
    const { a, b, operation } = e.data;
    let result;

    if (operation === 'add') {
      result = a + b;
    } else if (operation === 'subtract') {
      result = a - b;
    }

    postMessage(result);  // 返回结果给主线程
  }
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });  // 创建 Blob 对象
const worker = new Worker(URL.createObjectURL(blob));  // 使用 Blob 创建 Worker 实例

worker.onmessage = function(e) {
  console.log('Result from worker:', e.data);  // 输出 Worker 返回的结果
};

worker.postMessage({ a: 5, b: 3, operation: 'add' });  // 向 Worker 发送数据
```

3. **`ES模式引入脚本`**

```JavaScript
new Worker('path/to/js', { type: 'module' });
```

## 能正常使用的原生API

- **`定时器`**：setTimeout 和 setInterval
- **`网络请求`**：fetch、XMLHttpRequest
- **`Web APIs`**：WebSocket、FileReader
- **`二进制操作`**：ArrayBuffer、Blob
- **`数据处理`**：crypto、IndexedDB