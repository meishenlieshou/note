---
title: vue常见问题
createTime: 2025/01/21 13:43:03
permalink: /learn/vue/b3JOg78/
author: JackSim
tags:
  - Vue
  - 问题

description: description
---

## Vue 的虚拟 DOM 是如何工作的？详细描述其 Diff 算法的核心逻辑。

轻量级的 JavaScript 对象。

1. 通过 render 函数将模板编译为虚拟 DOM。
2. 当数据发生变化时，Vue 会重新执行 render 函数生成新的虚拟 DOM
3. 比较新旧虚拟 DOM 的差异
4. 根据 Diff 结果对真实 DOM 进行最小化更新
   

算法的核心逻辑:

1. 同层比较：只比较同一层的节点，不跨层比较
2. 双端对比：从头尾两端同时进行对比，尽量减少遍历次数
3. 键值优化：通过 key 快速定位节点，提升对比效率
4. 最小化 DOM 操作：只更新需要变动的部分，避免不必要的 DOM 重绘

## 在 Vue 中，template 是如何被编译成渲染函数的？这个过程的关键步骤有哪些？

模板编译经历三个阶段
1. template 字符串解析为==抽象语法树（AST）==
2. 标记模板中的==静态节点==，减少渲染时的性能开销
3. 优化后的 AST 转换为 JavaScript ==渲染函数==

==h 函数==：创建虚拟 DOM 节点的工具函数
```Javascript
/**
 * type: HTML标签名、或者Vue组件
 * props: HTML节点对应的属性
 * children: 子节点
 */
h(type, props?, children?)
```

- h函数，在render方法里调用，render返回h函数返回值。
- 和render函数里返回JSX等效。

## Vue 的 keep-alive 是如何实现组件缓存的？有哪些生命周期钩子与其相关？

1. keep-alive 通过一个内部的 cache 对象来存储组件实例。通常以每个组件的key作为键值存储。
2. 组件卸载时，并未真正卸载。DOM和状态依然会保留在cache中，供下次直接使用。

相关的生命周期钩子有两个
- **`activated`**   当组件被缓存但不再显示时触发
- **`activated`**   当组件从缓存中被激活时触发

如何彻底卸载?

通过keep-alive会和component配置使用，需要真正卸载时，将组件的使用移出keep-alive包裹即可。
```Javascript
<template>
  <div>
    <button @click="current = 'A'">Show Component A</button>
    <button @click="current = 'B'">Show Component B</button>
    <button @click="clearCache">Clear Cache</button>
    <keep-alive v-if="useCache">
      <component :is="current" />
    </keep-alive>
    <component v-else :is="current" />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const current = ref('A');
const useCache = ref(true);

const clearCache = async () => {
  useCache.value = false; // 停用缓存
  await nextTick();       // 等待 DOM 更新
  useCache.value = true;  // 恢复缓存功能
};
</script>
```

## component组件

通过is属性，动态切换组件。常见的应用场景
- 动态内容切换
- `<router-view>` 实际上是基于 `<component>` 实现的动态路由组件渲染
- 使用异步组件配合 `<component>`，实现按需加载的性能优化 

## 如何在 Vue 项目中处理大列表渲染的性能问题？有哪些技术方案可以实现优化

- **虚拟滚动**   滚动加载渲染
- **分片渲染**   分片自动加载渲染
- **DOM 优化**
- **Web Worker**

## 如何设计一个基于 Vue 的全局状态管理方案，而不依赖 Vuex 或 Pinia

1. 基于reactive创建全局对象。各个组件里引用全局对象里的属性（不要解构），或者通过全局对象里的方法，都会被vue跟踪而具备响应性
2. 创建reactive对象，在应用顶层provide，组件里通过inject注入



