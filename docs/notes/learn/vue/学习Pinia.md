---
title: Learning Pinia
createTime: 2024/11/20 06:02:23
permalink: /learn/vue/m7j8raxn/
author: Jack
tags:
  - Vue
  - State Management

description: description

---


## Pinia

Pinia is the state management library officially recommended by Vue, serving as a modern alternative to Vuex. It features a simpler API, less boilerplate code, and supports TypeScript and modular development, making it ideal for Vue 3 applications.

## Features

1. **`Lightweight and Easy to Use`**: No need for complex mutations and actions, directly manipulate the state.
2. **`Modular Design`**: Each store manages its own state independently, supports code splitting and on-demand loading.
3. **`Full TypeScript Support`**
4. **`Integration with Vue Devtools, Track State Changes`**

## Basic Usage

Refer to [example](/learn/vue/SLAu3fcLNid/)

## Disposal

When there are multiple Pinia instances in the application, you may need to dispose of an instance. Call **`disposePinia(pinia)`** to dispose of the specified Pinia instance.

## Common Pinia-Related Questions

### How to Use Modular Stores in Pinia? Does It Support On-Demand Loading?

**`By creating multiple stores`**, each store can manage its own state and logic.

Pinia **`supports on-demand loading of stores`** through Vue's lazy loading mechanism.

```JavaScript
<script setup>
  import { defineAsyncComponent } from 'vue';

  const useUserStore = defineAsyncComponent(() =>
    import('@/stores/user').then(module => module.useUserStore)
  );
  const useCartStore = defineAsyncComponent(() =>
    import('@/stores/cart').then(module => module.useCartStore)
  );

// Now you can use these stores in your code
</script>
```
**`defineAsyncComponent`** is used to load components on demand (such as route components) or for components that are large and not always needed during initial page load. The method supports passing a configuration object to specify placeholder components, error handling, etc.

Compared to the simple ()=>import('something'), defineAsyncComponent has built-in lifecycle management, placeholder display, delayed loading, error handling, etc., while the latter only translates promises.

>[!NOTE]
>Difference from Suspense
>Suspense is a component used to wait for multiple asynchronous contents to load in the parent component, controlling the entire asynchronous subtree and allowing nesting. More [reference](/learn/vue/SjtYkCII3u0BI/#Suspense)

### What Are the Similarities and Differences Between Pinia's Getters and Vue Component's Computed?

- Similarities:

1. **`Lazy Loading and Caching Based on Dependencies`**: Both return values do not change if dependencies remain unchanged.
2. **`Read-Only`**: Computed can be configured to be read-write, [reference](/learn/vue/SjtYkCII3u0BI/#基于依赖的懒加载和缓存)

- Differences:

1. **`Different Access Methods`**
2. **`Different Scopes`**

### How to Manage Asynchronous Operations in Pinia? For Example, Fetching Data from the Backend and Updating the State.

Directly write asynchronous operation logic in actions, [reference](/learn/vue/SLAu3fcLNid/#sync_action)

### What Methods of Persistent State Management Does Pinia Support? How to Implement State Persistence?

Persistence essentially means synchronizing the state to localStorage, sessionStorage, or other media. This can be done using plugins or manually maintained.

### How to Share State or Methods Between Multiple Stores in Pinia?

1. Import and directly reference in actions or getters methods.
2. **`Through Pinia Plugins`**: A Pinia plugin is a function that receives the Pinia instance and options as parameters and can return an object that will be merged into each store.

```JavaScript
// Define plugin plugins/global.js
export const globalPlugin = (context) => {
  context.store.$onAction(({ name, store }) => {
    if (name === 'addItem') {
      console.log(`Item added to ${store.$id}`);
    }
  });
};
// Register and use
// stores/index.js
import { createPinia } from 'pinia';
import { globalPlugin } from '@/plugins/global';

const pinia = createPinia();
pinia.use(globalPlugin);
// This way, when the addItem method is called in any store, the globalPlugin plugin will log the output.
```

### Does Pinia Support Dynamic Store Registration? If So, How to Implement It?

Yes, it supports dynamic loading, for example:
```JavaScript
<script setup>
import { createPinia } from 'pinia';

const pinia = createPinia();

// Dynamically import and register store
async function loadUserStore() {
  const { useUserStore } = await import('@/stores/user');
  pinia.use(() => useUserStore()); // Dynamically register store
}

loadUserStore();

// Use store in component
const userStore = useUserStore();
userStore.setUser('Alice', 'alice@example.com');
</script>
```

### How to Implement Server-Side Rendering (SSR) Support in Pinia? What Should Be Noted?

Compared to client-side usage, additional handling is required:
1. Ensure the state results in SSR are effectively passed to the client, which can be done by embedding serialized JSON in HTML. The client should correctly restore the state.
2. If there are errors in the store, ensure all error operations are completed before page rendering.

You can perform asynchronous operations in the component's lifecycle hooks or pre-load data on the server side. For example:

```JavaScript
<template>
  <div>
    <h1>{{ user.name }}</h1>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const user = ref({ name: '' });

// Load data in onMounted hook
onMounted(async () => {
  await userStore.fetchUserData();  // Assume this is an asynchronous request
  user.value = userStore.user;  // Get the asynchronous request result and set it to the component's `user` state
});
</script>
```

Server-side pre-loading
```JavaScript
// server.js (server entry file)
import { createPinia } from 'pinia';
import { createSSRApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import App from './App.vue';
import { useUserStore } from './stores/user';

async function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);

  const userStore = useUserStore();

  // Load data on the server side
  await userStore.fetchUserData();  // Perform asynchronous request here
  return { app, pinia };
}

export async function renderPage() {
  const { app, pinia } = await createApp();

  // Get the server-rendered Pinia state
  const appContent = await renderToString(app);

  return {
    appContent,
    piniaState: pinia.state.value,  // Pass the state to the client
  };
}
```

### What Methods Does Pinia Provide to Listen to State Changes?

1. **`Direct Reference in Component`**: Pinia is based on Vue's reactive and ref reactivity mechanism. Direct use in components will be automatically tracked by Vue.
2. **`$subscribe()`**: Suitable for listening to state changes globally and handling side effects.
3. **`computed`**: Suitable for reactively accessing state in components and getting updates in real-time.
4. **`watch`**: Suitable for fine-grained monitoring of specific states or properties in components and executing side effects.

### How to Gracefully Handle Errors in Pinia Store?

1. **`Provide Error State`**: For UI use.
2. **`Provide Global Error Handling`**:
  - Use Pinia plugins to handle errors centrally and uniformly.
  - Provide error boundary components to trigger boundary components when a component error occurs, preventing the entire application from crashing.

  ```JavaScript
  // Error handling plugin example errorHandlingPlugin.js
  export const errorHandlingPlugin = (context) => {
    const { store } = context;

    // Capture all errors in actions
    store.$onAction(({ name, args, after, onError }) => {
      onError((error) => {
        console.error(`Error in action "${name}":`, error);
        if (store.error) {
          store.error = error.message || 'An error occurred';
        }
      });
    });
  };
  ```

### Is Pinia Suitable for Use with Other Frameworks or Tools (e.g., Nuxt.js, Meteor.js)? Why?

Yes, for example, with the Meteor.js full-stack framework.

If the frontend uses Vue in Meteor, Pinia can be used as the state management tool.

### What Are the Best Practices for Using Pinia in Large Projects?

1. **`Modularize Stores`**
2. **`Use Getters to Derive State Calculations`**: Avoid repeating the same logic in multiple places.
3. **`Encapsulate Error Handling in Actions`**: Avoid mixing business logic in components.
4. **`Enable State Persistence`**
5. **`Avoid Over-Reliance on Global State`**: Use single references to state and delegate to components or modules.
6. **`Lazy Load Stores`**
7. **`Centralize Error Handling`**

