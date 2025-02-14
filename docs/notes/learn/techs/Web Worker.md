---
title: Web Worker
createTime: 2025/01/18 07:28:43
permalink: /learn/front/XgIbXL/
author: Jack
tags:
  - Web Worker
  - Native technology

description: description
---

## About Web Worker

Web Worker is a browser technology that allows running JavaScript code in an independent thread, avoiding blocking the main thread (UI thread). It is suitable for handling time-consuming computational tasks, such as data processing and complex algorithms, to improve page responsiveness.

## Features of Web Worker

1. **`Independent thread`**
2. **`Cannot directly access DOM, window, document, or localStorage`**

## Types of Workers Supported by Web Worker

1. **`Dedicated Worker`**: Each worker can only be used by one main thread.

2. **`Shared Worker`**: Multiple main threads can share a worker, suitable for cross-page communication.
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
   1. Used to intercept network requests and implement offline caching.
   2. Does not directly communicate with the UI thread but uses postMessage or message channels.
   [For more details, refer here](/learn/front/gi23I/)

## How to Load External Scripts in Web Worker

1. **`importScripts()`**

2. **`Pass scripts through the constructor`**

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

    postMessage(result);  // Return result to the main thread
  }
`;

const blob = new Blob([workerCode], { type: 'application/javascript' });  // Create Blob object
const worker = new Worker(URL.createObjectURL(blob));  // Create Worker instance using Blob

worker.onmessage = function(e) {
  console.log('Result from worker:', e.data);  // Output result returned by Worker
};

worker.postMessage({ a: 5, b: 3, operation: 'add' });  // Send data to Worker
```

3. **`Import scripts in ES module mode`**

```JavaScript
new Worker('path/to/js', { type: 'module' });
```

## Native APIs Available in Web Worker

- **`Timers`**: setTimeout and setInterval
- **`Network Requests`**: fetch, XMLHttpRequest
- **`Web APIs`**: WebSocket, FileReader
- **`Binary Operations`**: ArrayBuffer, Blob
- **`Data Processing`**: crypto, IndexedDB