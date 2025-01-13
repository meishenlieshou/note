---
title: React19
createTime: 2025/01/12 21:21:41
permalink: /learn/react/i8Lyjuid/
author: JackSim
tags:
  - React
  - React19

description: 
---

# React 

## 钩子

### 状态钩子 
状态让组件 “记住” 信息，如用户输入。  
- ==useState== 声明了一个你可以直接更新的状态变量。
- ==useReducer== 在 reducer 函数 中声明了一个带有更新逻辑的状态变量。
  > [!IMPORTANT]
  > **作用** useReducer 是 React 提供的一个用于管理复杂组件状态的钩子。它类似于 useState，但更适合在以下场景中使用：
  > - 状态逻辑复杂且包含多个子值。
  > - 多个状态更新逻辑依赖于不同的操作（类似于 Redux 的 reducer 模式）。
  > - 需要根据特定的 action 来更新状态。

  > [!IMPORTANT]
  > **用法** 
  > ```JavaScript
  > const [state, dispatch] = useReducer(reducer, initialState);
  > ``` 
  > - reducer：一个函数，接收当前状态 state 和一个描述如何更新状态的 action，返回新的状态。
  > - initialState：状态的初始值。
  > - dispatch：一个函数，用于发送 action，触发状态更新。
  > - state：当前的状态。

  例如

  ```JavaScript
  import React, { useReducer } from 'react';

  // 定义 reducer 函数
  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 };
      case 'decrement':
        return { count: state.count - 1 };
      case 'reset':
        return { count: 0 };
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
  }

  function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
      <div>
        <h1>Count: {state.count}</h1>
        <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    );
  }

  export default Counter;

  ```
  > [!IMPORTANT]
  > **最佳实践**    
  > - 将 reducer 函数提取到组件外部，以便复用和单元测试。
  > - 使用常量定义 action 类型，避免硬编码字符串，提高代码的可维护性。
  > - 对于全局状态管理，可以结合 useContext 和 useReducer 使用，形成一个简单的全局状态管理方案。

  > [!TIP]
  > **useReducer vs useState**：   
  > - useState 更适合简单状态：  
  > 如果状态逻辑简单、只涉及单一状态值，useState 是更直接和简单的选择。
  > - useReducer 更适合复杂状态：  
  > 当状态包含多个子属性，或有复杂的更新逻辑（如增删改查、多种操作等）时，useReducer 可以更好地组织状态更新逻辑，使代码更清晰。




### 上下文钩子 
上下文让一个组件从远处的父级那里接收信息而不将其作为属性传递。

- ==useContext== 读取并订阅上下文。

例如   
```JavaScript
  import { createContext, useContext } from 'react'; 
  //父级组件
  const ThemeContext = createContext(null);
  //...
  <ThemeContext.Provider value="dark">
    <Form />
  </ThemeContext.Provider>

  //---------------------------------

  //后代组件，嵌套再Form里的组件
  import { useContext } from 'react';

  function Button() {
    const theme = useContext(ThemeContext);
    ...
  }
```

### 引用钩子 
引用让组件 保存一些不用于渲染的信息， 像 DOM 节点或超时 ID。与状态不同，更新引用不会重新渲染你的组件。引用是来自 React 范式的 “应急方案”。当你需要使用非 React 系统（例如内置浏览器 API）时，它们很有用。

- ==useRef== 声明了一个引用。你可以在其中保存任何值，但通常它用于保存 DOM 节点。
- ==useImperativeHandle== 允许你自定义组件公开的引用。这很少使用。

  >[!IMPORTANT] 
  >**作用**  
  > - useImperativeHandle 是 React 提供的一个钩子，用于自定义暴露给父组件的实例值。它允许你通过 ref 来控制子组件的行为或访问子组件中的特定方法，从而实现更灵活的组件交互。
  > - 通常情况下，ref 只能直接访问 DOM 节点，而 useImperativeHandle 允许你通过 ref 暴露组件内部的自定义方法或属性，使得父组件可以调用这些方法来操作子组件的内部逻辑。


  >[!IMPORTANT] 
  > **用法**  
  >  ```JavaScript
  >  useImperativeHandle(ref, createHandle, [deps]);
  >  ```   
  > - **ref**：从父组件传递下来的 ref 对象。
  > - **createHandle**：一个返回对象的函数，这个对象包含了希望暴露给父组件的属性或方法。
  > - **deps**（可选）：依赖数组，当依赖变化时会重新创建暴露的对象。

  例如{#forwardRef-demo}   
  ```JavaScript
  import React, { useRef, useImperativeHandle, forwardRef } from 'react';

  // 定义子组件，并使用 forwardRef 传递 ref
  const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef();

    // 使用 useImperativeHandle 暴露自定义方法给父组件
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current.focus();
      },
      clear: () => {
        inputRef.current.value = '';
      },
    }));

    return <input ref={inputRef} type="text" />;
  });

  function Parent() {
    const inputRef = useRef();

    return (
      <div>
        <CustomInput ref={inputRef} />
        <button onClick={() => inputRef.current.focus()}>Focus Input</button>
        <button onClick={() => inputRef.current.clear()}>Clear Input</button>
      </div>
    );
  }

  export default Parent;

  ```

  > [!NOTE]
  > 
  > - **forwardRef**： React 的 forwardRef 用于将父组件传入的 ref 转发给子组件内部的某个元素或 useImperativeHandle。
  > - **useRef**：子组件内部使用 useRef 创建一个引用，指向 input 元素。
  > - **useImperativeHandle**：使用 useImperativeHandle 钩子，将 focus 和 clear 两个方法暴露给父组件。父组件可以通过 ref.current.focus() 和 ref.current.clear() 来调用这些方法，手动聚焦或清空输入框。


  > [!IMPORTANT]
  > **最佳实践**：  
  > - **仅在必要时使用**：useImperativeHandle 主要用于需要 手动控制子组件行为 的场景。如果可以通过 props 或 state 实现组件交互，优先选择这些方式，而不是使用 useImperativeHandle。
  > - **结合 forwardRef 使用**：useImperativeHandle 必须与 forwardRef 一起使用，才能将 ref 正确传递给子组件并暴露自定义方法。
  > - **限制暴露的接口**：暴露给父组件的接口应尽量精简，避免父组件对子组件内部逻辑有过多依赖，保证组件的封装性。



### 副作用钩子 
副作用让组件 连接到外部系统并与之同步。这包括处理网络、浏览器 DOM、动画、使用不同的 UI 库编写的小部件，以及其他非 React 代码。

- ==useEffect== 将组件连接到外部系统。
- ==useLayoutEffect== 在浏览器重新绘制屏幕之前触发。你可以在此处测量布局。
- ==useInsertionEffect== 在 React 更改 DOM 之前触发。库可以在此处插入动态 CSS。


### 性能钩子
告诉 React 重用缓存的计算，或者如果自上次渲染以来数据未更改，则跳过重新渲染。

- ==useMemo== 允许你缓存昂贵计算的结果。
- ==useCallback== 允许你在将函数定义传递给优化组件之前缓存它。
- ==useTransition== 允许你将状态转场标记为非阻塞，并允许其他更新中断它。
  
  >[!IMPORTANT] 
  >**作用**   
  >useTransition 是 React 18 中引入的一个钩子，用来 控制更新的优先级，特别是在处理那些 耗时的操作（比如页面渲染或数据加载）时，确保 UI 响应流畅，避免因大量更新导致界面卡顿。具体来说，useTransition 可以让你把某些任务标记为 非紧急的（low priority），让 React 先处理紧急任务（如用户输入、点击等），然后再处理那些非紧急任务。这样用户体验就更流畅了，因为高优先级任务会先完成，低优先级任务会被延迟。

  >[!IMPORTANT] 
  >**原理**   
  >React 中的 更新优先级 是基于 时间切片（time-slicing） 的概念。React 会将任务分成多个阶段，高优先级任务（如用户交互）会优先处理，低优先级任务（如页面渲染）会被延后。useTransition 就是通过提供一个 过渡状态，将某些任务标记为低优先级任务，从而让 React 在保证 UI 响应的同时，也能处理这些低优先级的任务。 

  例如：

  ```JavaScript
  import { useState, useTransition } from 'react';

  function MyComponent() {
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState('');

    const handleChange = (event) => {
      const value = event.target.value;
      // 使用 startTransition 来包装低优先级的更新
      startTransition(() => {
        setInput(value);
      });
    };

    return (
      <div>
        <input type="text" value={input} onChange={handleChange} />
        {isPending && <span>Loading...</span>}
      </div>
    );
  }
  ```
  > [!NOTE]
  > **startTransition** 包裹了 setInput(value)，将它标记为低优先级更新。即使用户不断输入，React 会尽量让用户的输入即时响应，等到输入完成后再更新数据。
  >  
  > **isPending** 用来跟踪过渡任务是否仍在进行中。当 startTransition 中的任务还在进行时，可以显示一个“加载中”提示。

- ==useDeferredValue== 允许你推迟更新 UI 的非关键部分，让其他部分先更新。useDeferredValue 会返回一个“延迟版本”的状态值，这个值不会立即更新，而是稍后在 React 空闲时更新，确保高优先级任务（如输入框的实时响应）能更快完成，改善用户体验。

  > [!NOTE]
  > 通俗理解：   
  > 当用户在输入框中输入文字时，如果输入内容会触发一个复杂的筛选或渲染操作，可能导致卡顿。使用 useDeferredValue 后，React 会优先更新输入框内容（高优先级任务），而筛选或渲染操作（低优先级任务）会稍后进行，保证输入的实时响应。

  例如：   
  ```JavaScript
  import React, { useState, useDeferredValue } from 'react';

  function SearchComponent({ items }) {
    const [query, setQuery] = useState('');
    const deferredQuery = useDeferredValue(query); // 返回延迟更新的 query 值

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(deferredQuery.toLowerCase())
    );

    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  ```
  > [!NOTE]
  > - 用户输入时，query 会立即更新，但 deferredQuery 的更新会稍有延迟。
  > - 这种延迟可以防止频繁的 filter 操作，优先让用户的输入框得到即时响应。
  > - 列表渲染的部分会稍后更新，避免因复杂筛选逻辑导致的输入卡顿。

  > [!TIP]
  > - useDeferredValue 提供了一个“延迟更新的状态值”，让 React 优先处理高优先级任务，而将非紧急的任务稍后执行，提升用户体验。
  > - 适用于实时搜索、长列表渲染等场景，帮助避免输入或交互卡顿。
  > - 与 useTransition 类似，都是 React 18 中引入的用于 优先级管理 的新特性，但 useDeferredValue 更适合单个状态值的延迟更新，而 useTransition 更适合控制整个渲染过程的优先级。

### 其他钩子

- ==useDebugValue== 允许你自定义 React DevTools 为你的自定义钩子显示的标签。 
  **useDebugValue(value, format?)** 在 自定义钩子 的顶层调用 useDebugValue 以显示 React 开发工具 的可读调试值。
  - value: 你想要在 React DevTools 中显示的值。它可以有任何类型。
  - format：一个可选的格式化函数。当检查组件时，React DevTools 将调用格式化函数，并将 value 作为参数，然后显示返回的格式化值（可以是任何类型）。如果不指定格式化函数，将显示原来的 value 本身。

- ==useId== 允许组件将唯一 ID 与自身相关联。通常与可访问性 API 一起使用。

  > [!NOTE]
  > - useId 是 React 提供的一个简单钩子，专门用于生成全局唯一且稳定的 ID，主要用于表单字段的关联或组件内部需要唯一标识符的场景。
  > - 它在服务端渲染时也能保证 ID 的一致性，解决了 SSR 中可能出现的 ID 不匹配问题。
  > - 不推荐将useId 用于生成 key，更适合用来解决可访问性或 ID 唯一性的问题。

  例如：
  ```JavaScript
  import React, { useId } from 'react';

  function FormField() {
    const id = useId(); // 生成唯一 ID

    return (
      <div>
        <label htmlFor={id}>Name:</label>
        <input type="text" id={id} />
      </div>
    );
  }
  ```

  > [!NOTE]
  > - useId 生成了一个唯一的 ID，用于将 label 和 input 关联起来，确保表单的可访问性。
  > - 如果页面上有多个 FormField 组件实例，每个实例都会生成不同的 ID，避免冲突。
  > - ID不是每次重新渲染都生成新的，而是稳定的。


- ==useSyncExternalStore== 允许组件订阅外部存储。

  > [!NOTE]
  > 专门用于 订阅外部数据源，并在外部数据源发生变化时触发组件更新。它主要用于解决 外部状态管理 的订阅问题，比如订阅 Redux Store、Zustand Store，或者浏览器的全局状态（如 window 的宽度、浏览器的 navigator 状态等）。

  例如：

  ```JavaScript
  import React, { useSyncExternalStore } from 'react';

  function useWindowWidth() {
    const getSnapshot = () => window.innerWidth;

    const subscribe = (callback) => {
      window.addEventListener('resize', callback);
      return () => window.removeEventListener('resize', callback);
    };

    return useSyncExternalStore(subscribe, getSnapshot);
  }

  function WindowWidthComponent() {
    const width = useWindowWidth();
    return <div>Window width: {width}px</div>;
  }
  ```

  > [!NOTE]
  > - getSnapshot 返回当前窗口的宽度。
  > - subscribe 订阅 window 的 resize 事件，并在窗口大小变化时调用回调来触发组件更新。
  > - 当窗口大小变化时，组件会自动重新渲染并显示最新的宽度。

  > [!IMPORTANT]
  >**为什么需要 useSyncExternalStore？**  
  > React 18 引入了 并发模式（Concurrent Mode），并发模式允许 React 在渲染过程中中断和恢复渲染。如果组件依赖于外部状态（如全局变量、外部 store），在渲染过程中外部状态可能发生变化，这会导致 UI 和外部状态之间出现 不一致性问题。
  >
  > **useSyncExternalStore 通过以下机制解决了这个问题**：  
  > - **同步快照获取**： getSnapshot 在渲染时同步获取外部数据的快照，确保渲染过程中使用的状态是最新的，避免了因外部状态变化导致的不一致性。
  > - **一致性保障**： useSyncExternalStore 在组件订阅和渲染之间提供了强一致性保障，即即使在并发模式下外部状态发生变化，React 也能确保组件使用的数据是一致的。

  > [!IMPORTANT]
  > **与 useEffect 和 useState 的区别**：   
  > - **useEffect + useState 的问题**： 如果使用 useEffect 和 useState 来订阅外部数据源，可能会在并发模式下导致状态更新与渲染不一致。例如，组件在渲染过程中，外部状态发生变化，但 useEffect 的回调直到渲染结束后才会执行，导致 UI 显示的是旧的状态。
  > - **useSyncExternalStore 的优势**： useSyncExternalStore 通过同步获取快照（getSnapshot）来确保在组件渲染过程中使用最新的外部状态，从而避免了上述不一致性问题。

  > [!IMPORTANT]
  > **最佳实践**：  
  > - **使用 useSyncExternalStore 替代自定义订阅逻辑**： 如果你的组件依赖于外部数据源（如全局状态、第三方库的状态等），优先使用 useSyncExternalStore 代替手写的订阅逻辑，尤其是在并发模式下。
  > - **避免频繁的重渲染**：如果外部状态变化频繁，可以结合 useMemo 或选择性订阅部分状态，减少不必要的重渲染。

- ==useOptimistic== 乐观地更新 UI。

  > [!NOTE]
  > **作用**   
  > useOptimistic 是 React 18.2 引入的一个实验性 API，主要用于处理乐观更新场景。它允许你在执行异步操作时，立即更新 UI，即使操作尚未完成，能够显著提升用户体验。   
  > 乐观更新是一种常见的前端模式，用户的操作会立即反映在界面上，同时在后台执行实际的异步操作（如网络请求）。如果操作成功，则 UI 保持不变；如果操作失败，则回滚到先前的状态或显示错误消息。

  > [!IMPORTANT]
  > **用法**  
  > ```JavaScript
  > const [optimisticState, updateOptimisticState] = useOptimistic(initialState, updater);
  > ```
  > - **initialState**：初始状态值。
  > - **updater**：一个函数，接收当前状态和 action，返回新的状态，用于更新乐观状态。
  > - **optimisticState**：当前的乐观状态。
  > - **updateOptimisticState**：触发乐观状态更新的函数。

  例如   
  ```JavaScript
  import React, { useState, useOptimistic } from 'react';

  function TodoApp() {
    const [todos, setTodos] = useState([
      { id: 1, text: 'Learn React', completed: false },
      { id: 2, text: 'Learn useOptimistic', completed: false },
    ]);

    const [optimisticTodos, updateTodos] = useOptimistic(todos, (currentTodos, newTodo) => [
      ...currentTodos,
      newTodo,
    ]);

    const addTodo = async (text) => {
      const newTodo = { id: Date.now(), text, completed: false };

      // 1. 立即更新 UI（乐观更新）
      updateTodos(newTodo);

      try {
        // 2. 执行异步操作（例如发送到服务器）
        await fakeApiAddTodo(newTodo);
      } catch (error) {
        // 3. 回滚状态（如果操作失败）
        setTodos((prev) => prev.filter((todo) => todo.id !== newTodo.id));
        console.error('Failed to add todo:', error);
      }
    };

    return (
      <div>
        <h1>Todo List (Optimistic Update)</h1>
        <ul>
          {optimisticTodos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
        <button onClick={() => addTodo('New Task')}>Add Todo</button>
      </div>
    );
  }

  // 模拟异步 API
  function fakeApiAddTodo(todo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 随机失败或成功
        Math.random() > 0.2 ? resolve(todo) : reject(new Error('Network Error'));
      }, 1000);
    });
  }

  export default TodoApp;
  ```
  > [!NOTE]
  > - **useOptimistic 管理乐观状态**：  
  > useOptimistic 初始化状态为 todos，并定义了一个 updater 函数，当有新的待办项时，将其追加到现有列表中。
  > - **updateTodos 立即更新 UI**：   
  > 当用户点击 “Add Todo” 按钮时，updateTodos 会立即触发乐观更新，使得新任务立刻显示在界面上，而不需要等待后台的 API 调用完成。
  > - **异步操作处理**：   
  > fakeApiAddTodo 模拟一个异步请求，如果请求失败，则通过 setTodos 回滚状态，移除添加失败的任务。



## 组件

### `<Fragment>`

在需要单个元素的情况下，将 `<Fragment>` 中的元素封装在一起以将它们组合在一起。Fragment 中的分组元素对生成的 DOM 没有影响；就好像元素没有分组一样。在大多数情况下，空的 JSX 标签 `<></>` 是 `<Fragment></Fragment>` 的简写。

### `<Profiler>`

将组件树封装在 `<Profiler>` 中以测量其渲染性能。

例如

```JavaScript
<Profiler id="App" onRender={onRender}>
  <App />
</Profiler>
```

> [!NOTE]
> - **id**：标识你正在测量的 UI 部分的字符串。
> - **onRender**：每次分析树中的组件更新时 React 调用的 onRender 回调。它接收有关渲染内容和花费时间的信息。

### `<StrictMode>`

严格模式允许对 `<StrictMode>` 组件内的整个组件树进行额外的仅开发检查。这些检查可帮助你在开发过程的早期发现组件中的常见错误

### `<Suspense>`

> [!IMPORTANT]
> - **children**：你打算渲染的实际 UI。如果 children 在渲染时暂停，则 Suspense 边界将切换到渲染 fallback。
> - **fallback**：如果尚未完成加载，则替代实际 UI 进行渲染。接受任何有效的 React 节点，但在实践中，回退是一个轻量级的占位符视图，例如加载加载控件或骨架。当 children 挂起时 Suspense 会自动切换到 fallback，当数据准备好后又回到 children。如果 fallback 在渲染时挂起，它将激活最近的父 Suspense 边界。

> [!NOTE]
> - React 不会为第一次挂载之前挂起的渲染保留任何状态。组件加载后，React 将重新尝试从头开始渲染挂起的树。
> - 如果 Suspense 正在显示树的内容，但随后再次暂停，则 fallback 将再次显示，除非导致它的更新是由 startTransition 或 useDeferredValue 引起的。
> - 如果 React 因为再次挂起需要隐藏已经可见的内容，它会清理内容树中的 布局副作用。当内容准备好再次显示时，React 将再次触发布局副作用。这确保了测量 DOM 布局的副作用不会在内容隐藏时尝试执行此操作。
> - React 包括与 Suspense 集成的底层优化，例如流式服务器渲染和选择性水化。阅读 架构概述 并监视 技术讲座 以了解更多信息。


## 内置API

### createContext

API 可以创建一个 context，你可以将其提供给子组件，通常会与 useContext 一起配合使用。[参照示例](#上下文钩子)

### forwardRef 

允许组件将 DOM 节点作为 ref 暴露给父组件。[参照示例](#forwardRef-demo)




# React-dom