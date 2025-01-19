---
title: Service Worker
createTime: 2025/01/18 07:29:37
permalink: /learn/front/gi23I/
author: JackSim
tags:
  - Service worker
  - 原生技术

description: description
---

## 关于Service Worker

Service Worker 是一种运行在浏览器后台的独立线程，它能够拦截网络请求、管理缓存和处理推送通知。它设计用于提升 Web 应用的性能、可靠性和用户体验，尤其是在离线或低网速的情况下。

## 特点

- **`独立于主线程`**
- **`拦截网络请求`**
- **`支持离线功能`**
- **`推送通知`**
- **`严格的生命周期`**，包括安装、激活和更新机制，保证稳定性
- **`只能在 HTTPS 环境下运行`**，为了安全性，防止中间人攻击。Service Worker 可拦截请求并修改响应，因此需要安全的 HTTPS 环境。

## 使用步骤

1. **`在主线程中注册`**
```JavaScript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('Service Worker registered:', registration);
  }).catch((error) => {
    console.log('Service Worker registration failed:', error);
  });
}
```
2. **`监听 install 和 activate 事件`**，完成初始化操作
3. **`实现自定义的缓存管理逻辑`**。
4. **`监听 fetch 事件处理网络请求`**。



## 生命周期 {#lifecicle}

```Javascript
/**
 * 安装阶段
 * 
 * 通常用于缓存静态资源
 * 
 * caches是标准的缓存接口，[详情参考]()
 */
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll(['/index.html', '/styles.css', '/script.js']);
    })
  );
});

/**
 * 激活阶段
 * 
 * 通常用于清理旧的缓存或进行版本更新
 */
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== 'my-cache').map((key) => caches.delete(key))
      );
    })
  );
});

/**
 * 运行阶段
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 注册同步事件  
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData()); // 同步数据的方法，syncData是自定义同步任务
  }
});
/**
 *  配合 Push API 实现消息推送
 */
self.addEventListener('push', function(event) {
  let options = {}; //
  event.waitUntil(
    self.registration.showNotification('推送通知标题', options)
  );
});
/**
 * 更新阶段
 * 
 * 当浏览器发现 Service Worker 脚本发生变化时，会重新下载并进入更新流程。
 */

```

实际应用中，生命周期不强制定义完整，按需监听即可。


## 功能应用

### 结合Cache API实现缓存管理{#cache_api}

Caches API 是一个浏览器提供的接口，用于程序化地管理缓存的内容。它允许你在 Service Worker 中存储和检索资源，帮助实现 离线功能、提高性能和优化网络请求。常用api包括

- **`caches.open(cacheName)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  // 成功打开（或创建）缓存
  console.log('Cache opened');
});
```
- **`cache.put(request, response)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  cache.put('/some-resource', new Response('Hello, World!')); //request 是一个 Request 对象，response 是一个 Response 对象。
});
```
- **`cache.match(request)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  cache.match('/some-resource').then(function(response) {
    if (response) {
      // 从缓存中找到响应
      console.log('Cache hit');
    } else {
      // 响应不在缓存中
      console.log('Cache miss');
    }
  });
});
```
- **`cache.delete(request)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  cache.delete('/some-resource').then(function(success) {
    if (success) {
      console.log('Cache entry deleted');
    }
  });
});
```

- **`caches.has(cacheName)`**
- **`caches.keys()`**


**`缓存策略`**
- **`网络优先`**：优先从网络获取资源，失败时从缓存读取。
- **`缓存优先`**：优先从缓存读取，缓存无数据时从网络获取。
- **`缓存和网络竞争`**：同时从缓存和网络读取，使用最快的结果。



### 后台推送通知

```JavaScript
/**
 * self.registration.showNotification是浏览器原生提供的显示通知方法，options里可配置弹窗
 */
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/icon.png',
    badge: '/badge.png',
  };
  event.waitUntil(self.registration.showNotification('Push Notification', options));
});
```
>[!NOTE]
>options.actions 属性允许在通知中添加交互按钮，用户点击按钮后，可以触发相关的操作。
>
>- 您可以在 notificationclick 事件中捕获点击的操作并处理相关逻辑。
>- 你可以使用 Notification.requestPermission() 请求权限，允许浏览器弹推送通知窗口。 
>- 如果通知的点击事件发生时，页面未处于前台，您可以通过 self.clients.openWindow() 打开一个新的窗口或标签页。

### 后台同步

使用 Background Sync API 在网络恢复时自动完成数据同步。

Background Sync API 是一个浏览器 API，允许在用户设备的网络连接恢复时，自动完成之前因网络问题而未能成功执行的网络请求。

使用步骤

1. **`注册 Service Worker`**
2. **`检查 Background Sync 支持情况`**
3. **`在 Service Worker 中注册同步任务`** 
   
   [参考示例](#lifecicle)
4. **`在UI线程里触发 Background Sync 任务`**
```JavaScript
//...
// 注册同步任务
navigator.serviceWorker.ready.then(function(registration) {
  return registration.sync.register('sync-data');
})
//...
```
1. **`同步请求的触发`**

当网络恢复时，浏览器会自动触发注册的同步事件，并执行你在 Service Worker 中定义的 syncData 函数。

> [!NOTE]
> 后台同步的注意事项
> - 后台同步不保证立即触发：虽然同步任务会在网络恢复时触发，但它的具体触发时间取决于系统的策略和网络状态，不一定是即时的。不同浏览器可能会有不同的调度策略。
> - 同步任务限制：目前许多浏览器（如 Chrome）对后台同步任务的注册和触发有一些限制。例如，后台同步只能在用户与设备互动之后注册，并且一个同步任务最多只能注册一次。
> - 支持情况：Background Sync API 并非所有浏览器都支持（尤其是 iOS 上的 Safari），因此要确保在不支持的环境下提供适当的降级处理。
> - 存储和队列：通常，待同步的数据会存储在像 IndexedDB 这样的本地存储中。当网络恢复时，Service Worker 会访问这些存储，并自动触发同步请求。
> - 卸载或关闭应用：当应用被关闭或用户卸载时，尚未同步的数据将丢失。因此，在实现时，可以结合一些策略（如：将数据同步到服务器）来防止数据丢失。

### 数据预取