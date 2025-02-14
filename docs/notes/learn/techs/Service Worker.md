---
title: Service Worker
createTime: 2025/01/18 07:29:37
permalink: /learn/front/gi23I/
author: Jack
tags:
  - Service worker
  - Native technology

description: description
---

## About Service Worker

Service Worker is an independent thread running in the background of the browser. It can intercept network requests, manage caches, and handle push notifications. It is designed to enhance the performance, reliability, and user experience of web applications, especially in offline or low-speed network conditions.

## Features

- **`Independent of the main thread`**
- **`Intercept network requests`**
- **`Support offline functionality`**
- **`Push notifications`**
- **`Strict lifecycle`**, including installation, activation, and update mechanisms to ensure stability
- **`Can only run in HTTPS environments`**, for security reasons, to prevent man-in-the-middle attacks. Service Worker can intercept requests and modify responses, so a secure HTTPS environment is required.

## Usage Steps

1. **`Register in the main thread`**
```JavaScript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('Service Worker registered:', registration);
  }).catch((error) => {
    console.log('Service Worker registration failed:', error);
  });
}
```
2. **`Listen to install and activate events`**, complete initialization operations
3. **`Implement custom cache management logic`**.
4. **`Listen to fetch events to handle network requests`**.

## Lifecycle {#lifecicle}

```Javascript
/**
 * Installation phase
 * 
 * Usually used to cache static resources
 * 
 * caches is the standard cache interface, [see details]()
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
 * Activation phase
 * 
 * Usually used to clean up old caches or perform version updates
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
 * Running phase
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Register sync event  
self.addEventListener('sync', function(event) {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData()); // Method to sync data, syncData is a custom sync task
  }
});
/**
 * Implement push notifications with Push API
 */
self.addEventListener('push', function(event) {
  let options = {}; //
  event.waitUntil(
    self.registration.showNotification('Push Notification Title', options)
  );
});
/**
 * Update phase
 * 
 * When the browser detects changes in the Service Worker script, it will re-download and enter the update process.
 */

```

In practical applications, the lifecycle does not need to be fully defined, just listen as needed.

## Functional Applications

### Implement cache management with Cache API {#cache_api}

The Caches API is an interface provided by the browser for programmatically managing cached content. It allows you to store and retrieve resources in the Service Worker, helping to achieve offline functionality, improve performance, and optimize network requests. Common APIs include

- **`caches.open(cacheName)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  // Successfully opened (or created) cache
  console.log('Cache opened');
});
```
- **`cache.put(request, response)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  cache.put('/some-resource', new Response('Hello, World!')); // request is a Request object, response is a Response object.
});
```
- **`cache.match(request)`**
```JavaScript
caches.open('my-cache').then(function(cache) {
  cache.match('/some-resource').then(function(response) {
    if (response) {
      // Found response in cache
      console.log('Cache hit');
    } else {
      // Response not in cache
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

**`Cache Strategies`**
- **`Network First`**: Prioritize fetching resources from the network, fallback to cache if network fails.
- **`Cache First`**: Prioritize fetching resources from the cache, fallback to network if not in cache.
- **`Cache and Network Race`**: Fetch resources from both cache and network simultaneously, use the fastest result.

### Background Push Notifications

```JavaScript
/**
 * self.registration.showNotification is a native method provided by the browser to display notifications, options can configure the popup
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
>The options.actions property allows adding interactive buttons to the notification, and you can handle related operations when the user clicks the button.
>
>- You can capture the click operation and handle related logic in the notificationclick event.
>- You can use Notification.requestPermission() to request permission to allow the browser to pop up push notification windows.
>- If the notification click event occurs when the page is not in the foreground, you can open a new window or tab with self.clients.openWindow().

>[!NOTE]
>Compared to WebSocket push
>1. Service Worker is one-way push
>2. Only suitable for low-frequency push
>3. Subject to notification permission restrictions
>4. Can push even when the client page is minimized

### Background Sync

Use the Background Sync API to automatically complete data synchronization when the network is restored.

The Background Sync API is a browser API that allows automatically completing previously failed network requests due to network issues when the user's device's network connection is restored.

Usage Steps

1. **`Register Service Worker`**
2. **`Check Background Sync support`**
3. **`Register sync tasks in Service Worker`** 
   
   [Reference Example](#lifecicle)
4. **`Trigger Background Sync tasks in the UI thread`**
```JavaScript
//...
// Register sync task
navigator.serviceWorker.ready.then(function(registration) {
  return registration.sync.register('sync-data');
})
//...
```
1. **`Trigger sync requests`**

When the network is restored, the browser will automatically trigger the registered sync event and execute the syncData function defined in the Service Worker.

> [!NOTE]
> Notes on Background Sync
> - Background sync does not guarantee immediate triggering: Although the sync task will be triggered when the network is restored, the specific trigger time depends on the system's strategy and network status, and it may not be immediate. Different browsers may have different scheduling strategies.
> - Sync task limitations: Currently, many browsers (such as Chrome) have some limitations on the registration and triggering of background sync tasks. For example, background sync can only be registered after user interaction with the device, and a sync task can only be registered once.
> - Support: The Background Sync API is not supported by all browsers (especially Safari on iOS), so make sure to provide appropriate fallback handling in unsupported environments.
> - Storage and queue: Typically, data to be synced is stored in local storage such as IndexedDB. When the network is restored, the Service Worker will access this storage and automatically trigger sync requests.
> - Uninstall or close the application: When the application is closed or uninstalled by the user, unsynced data will be lost. Therefore, when implementing, you can combine some strategies (e.g., syncing data to the server) to prevent data loss.

### Data Prefetch