---
title: vue要点
createTime: 2025/01/16 14:57:09
permalink: /learn/vue/sOfDQxoCoKAOViDLkySG/
author: JackSim
tags:
  - Vue3
  - 响应式

description: description
---

# Vue 3 新特性

## Composition API

### setup() 的基本用法

组件创建时初始化数据和逻辑，它会在组件实例创建之前调用，因此无法直接访问 this。

传参
- props：父组件传入的属性。
- context：包含组件的上下文对象。包括emit等方法触发自定义事件

可以在setup里定义生命周期钩子，从vue引入钩子函数，然后在setup里调用钩子函数定义声明周期逻辑。同时依然支持vue2版本的用法。
```JavaScript
  //vue3版本
  import {onMounted} from 'vue';
  export default {
    setup(){
      onMounted(()=>{
        //Your code
      });
    }
    //...
  }

  //vue2版本
  export default {
    setup(){}

    mounted(){
      //Your code
    }
    //..
  }
```


### 响应式 API

基于 Proxy 重构了 Vue 2 中的响应式（Vue 2 使用的是 Object.defineProperty）。

Vue 3 的响应式系统依赖于以下三个主要函数：
- **reactive**：创建响应式对象。
  - 优点： 深度代理，嵌套对象中的属性也会变成响应式。
  - 注意： reactive 返回的是一个 Proxy，而不是原始对象。

- **ref**：创建响应式的基本数据类型（原始值，如数字、字符串、布尔值等）。
  - value 属性： 当使用 ref 时，必须通过 .value 访问或修改其值。
  - 与 DOM 绑定： Vue 模板中会自动解包 ref，不需要手动 .value。 

- **computed**: 创建基于其他响应式数据的动态计算值。
  - 缓存： 只有当依赖数据发生变化时，计算属性才会重新计算。
  - 只读： 默认情况下，计算属性是只读的，但可以通过 set 定义可写计算属性。

  > [!NOTE]
  > 可写计算属性，即computed方法定义时传入一个对象，对象里指定set和get方法。计算属性值被修改时会触发set方法，如果修改了get里依赖的变量，依赖了计算属性的地方会被更新


### computed 和 watch 的用法及实际应用场景

computed 和 watch 是两个用于处理响应式数据的核心特性，它们都有各自的适用场景和用法。

- computed 的用法

computed 属性用于定义依赖其他数据的计算属性，且具有缓存特性。只有当其依赖的响应式数据发生变化时，computed 属性才会重新计算。用于纯函数计算。

- watch 的用法

watch 用于监听响应式数据的变化，并执行特定的逻辑。它适合处理异步操作、执行副作用或复杂的逻辑。

| 特性 | `computed` | `watch` |
| --- | --- | --- |
|是否具备缓存|是，依赖数据未变时返回缓存值|否，每次触发都会执行回调|
|是否适合处理副作|否，适合用于纯函数计算|是，适合处理异步或副作用逻辑|
|适用场景|依赖数据的派生值，需要缓存结果|监听数据变化，执行副作用或复杂逻辑|


### Provider/Inject跨层级组件通信

provide 和 inject 是一对用于跨层级组件通信的功能。它们可以在祖先组件中提供数据（通过 provide），并在后代组件中获取数据（通过 inject），即使这些组件之间相隔多层级。
{#provice-inject}
```JavaScript 

//祖先组件
export default {
  provide() {
    return {
      sharedValue: 'Hello from ancestor!',
    };
  },
};


//后代组件
export default {
  inject: ['sharedValue'],
  mounted() {
    console.log(this.sharedValue); // 输出: Hello from ancestor!
  },
};

```
provide 支持响应式数据。如果提供的值是一个响应式对象，后代组件会自动感知到变化。provide 和 inject 是一种轻量级的状态共享机制，非常适合处理特定上下文数据，而非作为全局状态管理工具的替代品。


### lifecycle hooks

### script setup 语法糖及其优势

`<script setup>` 是一种语法糖，进一步简化了组件的书写方式，同时提升了性能。它结合了组合式 API和setup函数的功能，使代码更简洁、更直观。

- **更简洁的代码**
 
- **性能更好**  
  `<script setup>` 是在编译时进行解析的，而不是运行时。这意味着 Vue 能够更高效地优化组件的初始化和作用域管理。 

- **更清晰的作用域**  
  变量和方法在`<script setup>`中默认是模板可见的，无需通过 return 暴露。

- **更友好的类型推断支持（TS 集成）**  
  在 `<script setup>` 中直接使用 TypeScript，无需额外配置。变量和 props 的类型会自动推断或定义，减少了类型定义的复杂性。

- **支持多种新功能** 
  1. 顶层 defineProps 和 defineEmits： 用于定义组件的 props 和 emits，使语法更简单。
  ```JavaScript
  <script setup>
  defineProps({ name: String });
  defineEmits(['submit']);

  const handleClick = () => emit('submit');
  </script>
  ```
  2. useSlots 和 useAttrs： 直接访问插槽和属性，无需通过 setup 参数。
  ```JavaScript
  <script setup>
  import { useSlots, useAttrs } from 'vue';

  const slots = useSlots();
  const attrs = useAttrs();
  </script>
  ```   
  3. 支持多个`<script>`标签
  ```JavaScript
  <script>
  // 普通逻辑或导出内容
  export const globalVar = "Hello!";
  </script>

  <script setup>
  import { ref } from 'vue';
  const count = ref(0);
  </script>
  ```

## 更快的性能

### 虚拟 DOM

- 虚拟 DOM 的更新过程

  1. **数据变化触发重新渲染** 响应式数据改变时，Vue 会触发组件的渲染函数。
  2. **生成新的虚拟DOM**  渲染函数被调用后，生成新的虚拟 DOM。
  3. **diff 算法对比**  Vue 会将新旧虚拟 DOM 树进行比较，找出差异（diff）。
  4. **真实 DOM 更新**  Vue 将 diff 的结果应用到真实 DOM 中，仅更新必要的部分。

- 虚拟 DOM 的优点
  
  1. **性能更好**
  2. **跨平台支持**
  3. **可预测的更新**  数据驱动的虚拟 DOM 更新逻辑比手动操作 DOM 更可预测

- 虚拟 DOM 的局限性
  
  1. 构建和比较虚拟DOM，会带来额外的性能开销
   
### 编译时标记静态节点以减少更新开销

静态节点只在首次渲染时创建，不会在后续更新中重新生成。

## 更灵活的组件

### 自定义渲染器（Custom Renderer

Vue 3 提供了自定义渲染器功能，使开发者可以将 Vue 的响应式和组件系统应用于非浏览器环境，例如：
1. 服务端渲染 (SSR)
2. 原生应用开发（如 Weex、UniApp、Electron）
3. 渲染到 Canvas、WebGL、终端或其他自定义环境。

自定义渲染器是 Vue 3 的一种扩展机制，它允许开发者定义自定义的 DOM 操作实现，从而将 Vue 的模板和组件渲染到任意环境中。

Vue 的核心渲染器封装了针对浏览器的 DOM 操作，而自定义渲染器则提供了一套通用接口，可以替换这些默认的操作逻辑。

1. **createRenderer**
 
createRenderer 是创建自定义渲染器的核心函数。它接收一个 renderer options 对象，该对象定义了在目标平台中如何操作节点。

```JavaScript
import { createRenderer } from '@vue/runtime-core';

const rendererOptions = {
  //实现渲染器选项
};

// 创建自定义渲染器
const { createApp } = createRenderer(rendererOptions);

// 创建应用程序
const App = {
  render() {
    return {
      type: 'rect',
      props: { x: 10, y: 20, width: 100, height: 50, fill: 'red' },
    };
  },
};

const canvasRoot = { 
  type: 'canvas',  //目标终端类型
  children: [] 
};
createApp(App).mount(canvasRoot);

```
  
2. **渲染器选项**

rendererOptions 是自定义渲染器的关键部分，需用户根据目标环境定义了对应的操作方法。比如
- createElement： 如何创建元素
- insert: 如何插入元素
- patchProp: 如何更新设置属性
- remove: 如何移除元素
- setElementText: 如何设置文本内容

3. **渲染逻辑**

- Vue 的响应式系统会驱动组件更新。
- 在模板编译时，Vue 会生成对应的渲染函数，返回虚拟 DOM。
- 自定义渲染器会使用 rendererOptions 将虚拟 DOM 映射到目标平台。


### Fragment 允许组件返回多个根节点。

### Teleport 将子组件渲染到 DOM 的其他位置。

Teleport 通过指定目标 DOM 节点（to 属性），将其子组件内容移动到目标位置。
```JavaScript
<template>
  <div>
    <button @click="showModal = true">Open Modal</button>
    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <p>This is a modal rendered in the body element.</p>
        <button @click="showModal = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>
```

to 的值可以动态改变，以便将内容移动到不同的目标。

### Suspense 处理异步组件加载

Suspense 是 Vue 3 提供的一个新组件，用于优雅地处理异步组件加载或异步操作。它允许在异步任务完成前显示一个占位内容，并在任务完成后切换到真实内容。
```JavaScript
<template>
  <Suspense>
    <!-- 异步内容 -->
    <template #default>
      <AsyncComponent />
    </template>

    <!-- 占位内容 -->
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>
```

**核心概念**

1. 占位内容
  
    使用 #fallback 插槽提供异步加载期间的占位内容。常用于加载指示器（如“加载中”或进度条）。

1. 默认内容

    使用 #default 插槽定义实际要渲染的异步内容。异步内容可以是异步组件或包含异步逻辑的普通组件。

3. 异步逻辑支持

    Suspense 的核心能力来自于其对异步组件或异步 setup 函数的支持。

**Suspense 的生命周期**

1. onPending：当异步内容开始加载时触发。
2. onResolve：当所有异步任务完成时触发


## 其他改进

### Tree-shaking

Tree-shaking 是现代 JavaScript 打包工具（如 Webpack、Rollup、Vite 等）使用的一种优化技术，用于移除未使用的代码，从而减小打包后的文件体积，提升应用性能。

**基本原理**

Tree-shaking 的核心基于以下两点：

- ES Module 静态结构

import 和 export 是 ES Module 的关键特性，具有静态分析能力。打包工具在构建时可以确定哪些模块被使用了，哪些模块没有被使用

**启用**

1. 使用 ES Module规范编写代码
2. 配置打包工具

  - Webpack: 确保 mode 设置为 production，Tree-shaking 会自动启用。
  - Rollup:  天然支持 Tree-shaking，默认会移除未使用的代码。
  - Vite: 基于 Rollup，默认支持 Tree-shaking，无需额外配置。

**注意事项和限制**

1. 副作用声明

    如果模块具有副作用（如修改全局变量），需要在 package.json 中使用 sideEffects 配置告知打包工具哪些文件不能移除。

2. 动态导入

    Tree-shaking 对动态导入支持有限。

3. 第三方库

    一些老旧的第三方库未使用 ES Module 或未正确声明 sideEffects，可能阻碍 Tree-shaking。

4. 作用范围

    Tree-shaking 不会对整个项目的所有代码进行全局优化，而是基于模块范围进行分析。

### emits 选项用于定义事件

即setup模式里的defineEmits方法，用来定义事件。实际上，通过传参回调也能起到定义事件的作用，二者的差异在于：

- **语义明确性**：defineEmits 在定义事件时，语义上更明确，表明该组件会触发某些事件。这让组件的行为更加清晰，且与 Vue 的事件系统高度集成。
- **灵活性**：通过传参回调的方式可以更加灵活，因为父组件和子组件的通信不依赖于 Vue 的事件机制，父组件直接控制回调函数的传递和执行顺序。然而，这样的方式可能会失去一些事件的可追溯性和结构化，尤其是在较为复杂的组件树中。
- **用途**：defineEmits 适合在组件之间通过标准的事件通信（例如：点击、提交、更新数据等）。而通过回调的方式更多用于父组件直接控制子组件的行为（例如：父组件控制子组件某些方法的执行时机）。

### 全新的 v-model 语法，支持多个绑定。

### Typescript 的更好支持。


# 响应式系统

## 响应式原理

Vue 3 的响应式原理是基于 Proxy 和 getter/setter 的机制，它通过拦截对象的访问与修改操作来实现数据的响应式更新。

>[!IMPORTANT]
>**主要原理概述**
>- Proxy：Vue 3 使用了 JavaScript 的 Proxy 对象来实现响应式数据的拦截。通过 Proxy，我们可以监听对象的读写操作，以及对象的其他行为（如删除属性等）。
>- 依赖收集：当组件渲染时，Vue 会在访问响应式对象的属性时记录下这些属性的依赖（即哪些地方依赖这些数据）。当数据发生变化时，Vue 会触发依赖的更新，从而实现视图的自动更新。
>- 懒代理：Vue 3 的响应式系统采用懒代理的策略，只有在某个属性被访问时，才会触发代理的操作。这样可以提高性能，避免不必要的代理操作。

**Proxy 的工作机制**

Proxy 是一种 ES6 新增的对象机制，它允许我们定义自定义的行为来拦截和修改对对象的操作。Proxy 的构造函数接受两个参数：目标对象和处理器对象（handler）。

**与Proxy配合使用的Reflect**

简而言之，Proxy用于拦截对象的操作行为，在Proxy函数的第二个参数里定义如何拦截。当需要执行操作的默认行为时，就需要用到Reflect反射。

反射提供一系列静态方法，这些方法和原生操作方法一一对应。需要在拦截操作里执行原生操作时，调用相应的反射静态方法并返回即可。



**为什么 Vue 3 使用 Proxy 而不是 Object.defineProperty**

Vue 2 使用的是 Object.defineProperty 来实现响应式，然而这个方法有一些缺点：

- 不能对新增/删除的属性进行监听：Object.defineProperty 只能监听对象已有的属性，而无法监听新增的属性。
- 性能问题：Vue 2 需要为每个属性都定义 getter 和 setter，这会导致性能问题。

Vue 3 通过使用 Proxy 解决了这些问题：

- 支持新增/删除属性：Proxy 可以拦截任何操作，包括属性的添加和删除。
- 性能优化：Proxy 的实现更加灵活且高效，性能优于 Object.defineProperty。

## ref 和 reactive

### ref 用于简单值，reactive 用于复杂对象。
  
### toRefs 和 toRef 的作用与场景。

> [!NOTE]
> toRefs 是一个用于将一个响应式对象的属性转换为响应式引用的函数。它可以把对象的每个属性变成独立的 ref，使得在解构对象时依然保持响应式。
> ```JavaScript
> import { reactive, toRefs } from 'vue';
>  const state = reactive({
>    count: 0,
>    name: 'Alice'
>  });
>
>  // 使用 toRefs 将响应式对象的属性转换为响应式引用
>  const { count, name } = toRefs(state);
>
>  // 可以像使用 ref 一样访问 count 和 name
>  count.value++;  // 更新 count
>  console.log(count.value);  // 输出：1
>  console.log(name.value);   // 输出：Alice
>
> ```
> - toRefs 将 state 对象的每个属性（count 和 name）都转换为一个独立的 ref。
> - 这样，你在解构 state 对象时，count 和 name 仍然保持响应式。
  
  **为什么使用 toRefs？**

  当你传递响应式对象到组件或外部函数时，解构对象会破坏对象的响应性。使用 toRefs 可以保持每个属性的响应性。

> [!NOTE]
> toRef 是一个用于将响应式对象的单个属性转换为响应式引用的函数。它创建一个新的 ref，这个 ref 引用的是响应式对象的指定属性，并且保持响应式。
> ```JavaScript
> import { reactive, toRef } from 'vue';
>
>  const state = reactive({
>    count: 0,
>    name: 'Alice'
>  });
>
>  // 使用 toRef 将 state 中的某个属性转换为响应式引用
>  const countRef = toRef(state, 'count');
>
>  // 可以像使用 ref 一样访问 countRef
>  countRef.value++;  // 更新 count
>  console.log(countRef.value);  // 输出：1
>```
> - toRef(state, 'count') 将 state 中的 count 属性转换为一个独立的响应式 ref，保持了它的响应性。

**为什么使用 toRef？**

toRef 适用于当你只需要访问或修改对象中的某个属性，而不需要转换整个对象时。

### readonly 与 shallowReactive 的作用。

1. readonly 的作用
readonly 用于创建一个只读的响应式对象，它使得对象的所有属性都变为只读，无法修改。这对于在不希望某些数据被修改时非常有用，比如传递到子组件时，确保数据不被意外改变。

2. shallowReactive 的作用
shallowReactive 用于创建一个浅响应式对象，它与 reactive 类似，但只会使对象的顶层属性变为响应式，而不会递归地将对象的嵌套属性变成响应式。这意味着，如果对象包含嵌套的子对象，嵌套对象本身不会变为响应式，只有对象的直接属性会变成响应式。

## watchEffect 与普通 watch 的区别

watchEffect 和 watch 都是用于响应式数据的副作用管理，它们都能够监听和响应响应式数据的变化。

1. **watchEffect**

watchEffect 是 Vue 3 提供的一个 API，它会立即运行，并且自动追踪响应式数据的变化。它的主要特点是能够自动地“依赖收集”并执行副作用。也就是说，watchEffect 不需要明确指定要监听的响应式数据，而是自动地追踪其内部的所有响应式数据。

2. **watch 的特点**

允许你手动指定需要监听的响应式数据。当指定的响应式数据发生变化时，watch 会执行回调函数。与 watchEffect 不同，watch 需要显式指定监听的数据，并且你可以通过回调函数获取到新值和旧值。




# 组件通信

## 组件通信常见方式

### 父子组件：props 和 emit

### 兄弟组件：事件总线

  事件总线，即消息的订阅发布模式概念

### 跨层级组件：provide 和 inject

  参考[示例](#provice-inject)

## 自定义修饰符

vue3 允许你为事件监听器或指令添加自定义修饰符。
```JavaScript
<template>
  <input v-on:keyup.enter="handleEnter" placeholder="Press Enter">
</template>

<script>
export default {
  methods: {
    handleEnter() {
      console.log('Enter key was pressed');
    }
  }
};
</script>
```
在这个例子中，.enter 是 Vue 3 内置的事件修饰符，它表示仅当 keyup 事件的 key 为 'Enter' 时才触发 handleEnter 方法。

假设你想要监听某个自定义事件，比如仅在某个特定的 input 元素按下某个键时触发事件，你可以定义一个自定义事件修饰符来实现这一点。
```JavaScript
<template>
  <input v-on:keyup.shift="handleShiftKey" placeholder="Press Shift key">
</template>

<script>
export default {
  methods: {
    handleShiftKey() {
      console.log('Shift key was pressed');
    }
  }
};
</script>
```
在这个例子中，我们使用了 .shift 来作为一个自定义修饰符。这个修饰符会监听 keyup 事件，并且只有在按下 Shift 键时才会触发事件。

除了事件修饰符，Vue 还允许为自定义指令添加修饰符。

例如
```JavaScript
// main.js 或 app.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.directive('focus', {
  beforeMount(el, binding) {
    if (binding.modifiers.autofocus) {
      el.focus();
    }
  }
});

app.mount('#app');


<template>
  <!-- 只有当 autofocus 修饰符存在时，元素才会自动聚焦 -->
  <input v-focus.autofocus placeholder="This will auto-focus on load">
</template>
```
- v-focus 是自定义的指令名称。
- autofocus 是自定义修饰符，表示只有当这个修饰符存在时，元素才会在挂载时自动聚焦。
- 在 beforeMount 钩子中，我们检查是否有 autofocus 修饰符，如果有就执行 el.focus() 来使元素获得焦点。


### 全局状态管理：Vuex、Pinia

  更多Pinia介绍，参考[这里](#pinia-part)
  
# 生命周期钩子

## 选项式 API（Options API）生命周期钩子
**beforeCreate**  实例创建之前，数据和事件等还没有初始化，这个阶段不能访问到 data 和 props

**created** 组件实例已创建，数据和事件已设置 

**beforeMount**  组件将要挂载到 DOM 上，但还没有完成渲染。此时 template 已被解析

**mounted** 组件挂载完成，DOM 已经生成。此时可以执行与 DOM 交互的操作

**beforeUpdate** 组件的数据已发生变化，但视图还没有更新

**updated** 组件的数据已变化，视图已更新

**activated** 组件被激活（例如使用 keep-alive 包裹的组件）。这个钩子仅适用于通过 keep-alive 缓存的组件

**deactivated** 组件被停用（keep-alive 中的缓存组件会触发此钩子）。用于处理缓存组件的清理

**beforeUnmount** 组件实例将要销毁，但 DOM 还未移除

**unmounted** 组件实例已销毁，DOM 被移除。用于执行清理操作

**errorCaptured** 捕获子组件的错误并处理。这个钩子会在子组件发生错误时被触发，可以捕获并处理错误，防止它们传播到父组件。

## 组合式API生命周期钩子

- 在 setup 函数中使用生命周期钩子，而这些钩子是通过 on 前缀来调用的。钩子函数和选项式API基本一致。
- created 钩子 和 beforeCreate 钩子 不再存在于 Vue 3 的组合式 API 中。相应的逻辑可以放入 setup 函数中来处理。


# 模板语法

## v-bind 的基本语法
```JavaScript
<img v-bind:src="imageSrc" /> 

<div v-bind="objectProps"></div>
```

objectProps 是一个对象，它的键值对会被动态绑定到 div 的属性上。

## 新增 v-bind 的动态参数 [key]
```JavaScript
<template>
  <div>
    <button v-bind="[buttonProps]">Click me</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonProps: {
        [this.dynamicKey]: 'Click me!',
      },
      dynamicKey: 'title',
    };
  }
};
</script>
```
在这个例子中，v-bind="[buttonProps]" 会把 buttonProps 对象中的所有键值对动态绑定到按钮上，且键（title）是动态的。

## 支持多个 v-model 绑定

### 单一绑定示例
```JavaScript
<template>
  <input v-model="inputValue" />
</template>

<script>
export default {
  data() {
    return {
      inputValue: ''
    };
  }
};
</script>
```
在这个例子中，input 的值会与 inputValue 进行双向绑定。

### 多个绑定示例
```JavaScript
<template>
  <custom-input
    v-model:title="title"
    v-model:content="content"
  />
</template>

<script>
import { ref } from 'vue';
import CustomInput from './CustomInput.vue';

export default {
  components: {
    CustomInput
  },
  setup() {
    const title = ref('Hello');
    const content = ref('This is some content.');

    return { title, content };
  }
};
</script>
```
### 自定义组件中的实现

在自定义组件中，v-model 会根据绑定的 prop 和事件来进行双向绑定。通过为每个 prop 使用 v-model:propName，你可以在组件内部明确地处理这些不同的值。
```JavaScript
<template>
  <input
    :value="title"
    @input="$emit('update:title', $event)"
  />
  <textarea
    :value="content"
    @input="$emit('update:content', $event)"
  />
</template>

<script>
export default {
  props: {
    title: String,
    content: String
  }
};
</script>
```

### 总结

- 多个 v-model：Vue 3 允许同一个组件有多个 v-model 绑定。通过自定义的 modelValue 和事件名称，你可以在一个组件中处理多个双向绑定的数据。
- 语法：在父组件中，使用 v-model:propName 来绑定每个属性。
- 自定义事件：在子组件中，使用 update:propName 来触发更新事件，进行双向绑定。


# Vue Router 4

# 状态管理

## Pinia
{#pinia-part}

# 性能优化

# 常见问题场景

## 如何在 Vue 3 中处理异步任务？

## Composition API 和 Options API 的比较与选择。

## 为什么推荐使用 script setup？

## Vue 3 项目中如何处理性能瓶颈？

## Vue 3 的 Tree-shaking 是如何工作的？

