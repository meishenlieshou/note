---
title: 学习Pinia
createTime: 2024/11/20 06:02:23
permalink: /learn/vue/m7j8raxn/
author: JackSim
tags:
  - Vue
  - 状态容器

description: description

---


## Pinia

Pinia 是 Vue 官方推荐的状态管理库，作为 Vuex 的现代替代品。它拥有更简单的 API、更少的样板代码，并支持 TypeScript 和模块化开发，非常适合 Vue 3 应用

## 特点

1. **`轻量易用`**   无需繁杂的 mutations 和 actions，直接操作状态。
2. **`模块化设计`**   每个 store 独立管理，按需加载，支持代码拆分。
3. **`完全支持 TypeScript`**
4. **`与 Vue Devtools 集成，可追踪状态变化`**

## 基本使用

具体可参考[示例](/learn/vue/SLAu3fcLNid/)


## 常见pinia相关问题

### 如何在 Pinia 中使用模块化 Store？是否支持按需加载？

**`通过创建多个 Store 来实现的`**，每个 Store 都可以管理一个独立的状态和逻辑。

Pinia **`支持按需加载 Store`**，通过 Vue 的懒加载机制实现。

```Javascript
<script setup>
  import { defineAsyncComponent } from 'vue';

  const useUserStore = defineAsyncComponent(() =>
    import('@/stores/user').then(module => module.useUserStore)
  );
  const useCartStore = defineAsyncComponent(() =>
    import('@/stores/cart').then(module => module.useCartStore)
  );

// 现在可以在代码中使用这些 Store
</script>
```

### Pinia 的 Getters 与 Vue 组件的 Computed 有什么相同点和不同点？

- 相同点：

1. **`基于依赖的懒加载和缓存`**， 即依赖不变，返回值都不会变。
2. **`都只读`**，Computed可以配置为可读写，[参考](/learn/vue/SjtYkCII3u0BI/#基于依赖的懒加载和缓存)

- 不同点：

1. **`访问方式不一样`**
2. **`作用域不一样`**
  
### 如何在 Pinia 中管理异步操作？比如从后端获取数据并更新状态。

直接在actions里编写异步操作逻辑即可，[参考](/learn/vue/SLAu3fcLNid/#sync_action)

### Pinia 支持哪些方式的持久化状态管理？如何实现状态持久化？

所谓持久化，本质上就是将状态同步到localStorage、sessionStorage，或者其它介质中。可借助于插件，或者手动维护。

### 如何在多个 Store 之间共享状态或方法？

1. 通过import，然后在actions、getters方法里直接引用即可
2. **`通过Pinia 的插件`**
   
```JavaScript
//定义插件 plugins/global.js
export const globalPlugin = (context) => {
  context.store.$onAction(({ name, store }) => {
    if (name === 'addItem') {
      console.log(`Item added to ${store.$id}`);
    }
  });
};
//注册使用
// stores/index.js
import { createPinia } from 'pinia';
import { globalPlugin } from '@/plugins/global';

const pinia = createPinia();
pinia.use(globalPlugin);
//这样，当任何 Store 中的 addItem 方法被调用时，globalPlugin 插件就会输出日志
```

### Pinia 是否支持动态注册 Store？如果支持，如何实现？

支持，且支持动态加载，例如：
```Javascript
<script setup>
import { createPinia } from 'pinia';

const pinia = createPinia();

// 动态导入和注册 Store
async function loadUserStore() {
  const { useUserStore } = await import('@/stores/user');
  pinia.use(() => useUserStore()); // 动态注册 Store
}

loadUserStore();

// 在组件中使用 Store
const userStore = useUserStore();
userStore.setUser('Alice', 'alice@example.com');
</script>
```

### 如何在 Pinia 中实现服务端渲染（SSR）支持？需要注意哪些事项？

和客户端使用相比，需要额外处理
1. SSR中的状态结果有效传递给客户端，可通过HTML中嵌入序列化JSON。客户端正确恢复好状态。
2. 如果Store中有异常报错，确保页面渲染时所有的异常操作均已完成。

可以通过在组件的生命周期钩子中进行异步操作，或者在服务端进行预先数据加载。例如

```Javascript
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

// 在 onMounted 钩子中加载数据
onMounted(async () => {
  await userStore.fetchUserData();  // 假设这是一个异步请求
  user.value = userStore.user;  // 获取异步请求结果并设置到组件的 `user` 状态中
});
</script>

```

服务器端预加载
```JavaScript
// server.js (服务端入口文件)
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

  // 服务器端加载数据
  await userStore.fetchUserData();  // 这里进行异步请求
  return { app, pinia };
}

export async function renderPage() {
  const { app, pinia } = await createApp();

  // 获取服务器端渲染的 Pinia 状态
  const appContent = await renderToString(app);

  return {
    appContent,
    piniaState: pinia.state.value,  // 将状态传递到客户端
  };
}
```

### 当需要监听某个状态的变化时，Pinia 提供了哪些方法来实现？

1. **`组件里直接引用`**: Pinia基于Vue的reactive、ref响应机制实现，组件里直接使用会被vue自动跟踪。
1. **`$subscribe()`**：适合在全局范围内监听状态变化，处理副作用。
2. **`computed`**：适合在组件中响应式地访问状态，实时获取更新。
3. **`watch`**：适合在组件中对特定状态或属性进行精细化的监控，并执行副作用。


### 如何优雅地在 Pinia Store 中处理错误？

1. **`提供错误状态`**: 供UI使用
2. **`提供全局错误处理`**
  - 使用pinia插件，集中统一处理错误
  - 提供错误边界组件，组件错误时触发边界组件，而不至于整个应用崩溃

  ```JavaScript
  //错误处理插件示例 errorHandlingPlugin.js
  export const errorHandlingPlugin = (context) => {
    const { store } = context;

    // 捕获所有 actions 中的错误
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

### Pinia 是否适合与其他框架或工具（如 Nuxt.js、Meteor.js）结合使用？为什么？

可以，以Meteor.js全栈框架为例。

在Meteor中如果前端使用的Vue，完全可以使用pinia作为状态管理工具。

### Pinia 在大型项目中有哪些最佳实践？

1. **`模块化store`**
2. **`使用getter派生状态计算`**，避免在多个地方重复计算相同逻辑
3. **`actions中封装异常错误`**，避免业务逻辑混杂在组件里
4. **`开启状态持久化`**
5. **`避免过渡的依赖全局状态`**，单一引用状态，下放到组件或者模块
6. **`懒加载store`**
7. **`集中错误处理`**