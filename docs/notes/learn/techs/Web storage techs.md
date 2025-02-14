---
title: Web storage techs 
createTime: 2025/01/19 10:31:34
permalink: /learn/front/jFPGUzjK9OUAx2E2GN3/
author: Jack
tags:
  - Client storage
  - localStorage
  - IndexedDB

description: description
---

Client storage technologies are commonly used in modern web application development to store data on the user's device. These technologies can improve application performance, support offline functionality, and reduce dependency on the server.

## Main Types

### Cookie

1. Attached to every HTTP request header
2. Data is stored in the browser, usually with a 4KB size limit
3. Supports setting expiration time (via Expires or Max-Age attributes)
4. Lower security, but supports HttpOnly and Secure options

The HttpOnly option specifies that the cookie can only be sent through HTTP requests and cannot be accessed by JavaScript.

The Secure option indicates that the cookie can only be transmitted over HTTPS connections, not HTTP connections.

### LocalStorage

1. Provides simple key-value pair storage
2. Data is stored locally with no expiration time limit
3. Each domain is limited to 5-10MB of data
4. Can only store string data

### SessionStorage

Different from LocalStorage, **`data is cleared when the page is closed`**

### IndexedDB

1. NoSQL transactional database
2. Can store data up to hundreds of MB

**`Core Concepts of IndexedDB`**

- **`Database`**
  
  A database in IndexedDB is a namespace that can contain multiple object stores. An application usually needs only one database.

- **`Object Store`**
  
  Similar to tables in relational databases, used to store specific types of data. Data is stored as key-value pairs, where the key is unique, and the value can be objects, arrays, and other complex types.

- **`Transaction`**

  All operations in IndexedDB must be completed through transactions to ensure the atomicity of data operations. Transactions have three modes:
  1. Read-only: Can only read data.
  2. Readwrite: Can read and write data.
  3. Versionchange: Used to update the database structure.

**`Common Operations in IndexedDB`**
```JavaScript

// Create a database and object store
const request = indexedDB.open('MyDatabase', 1);
request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore('users', { keyPath: 'id' });
};

// Get object store
const transaction = db.transaction('users', 'readwrite');
const store = transaction.objectStore('users');

// Add data
store.add({ id: 1, name: 'John Doe', age: 30 });
store.add({ id: 2, name: 'Jane Doe', age: 25 });

// Read data
const request = store.get(1);
request.onsuccess = () => {
  console.log(request.result); // { id: 1, name: 'John Doe', age: 30 }
};

// Update data
store.put({ id: 1, name: 'John Doe', age: 35 });

// Delete data
store.delete(1);

```

### Cache Storage (provided by Service Worker)

1. Specifically used to store request and response objects
2. Used in conjunction with Service Worker to support offline caching
3. Does not directly store data but stores HTTP request responses
4. Cache content size is usually between 50MB and 1GB

For more details, refer [here](/learn/front/gi23I/#cache_api)