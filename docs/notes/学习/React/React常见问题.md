---
title: React常见问题
createTime: 2025/01/21 20:55:27
permalink: /learn/react/T8RJVEk/
author: JackSim
tags:
  - react
  - 问题

description: description
---


## React 的 Fiber 架构是什么？解决了哪些问题？

- Reac16 引入的协调引擎，用于改善渲染性能。
- Fiber 架构将渲染过程分解为多个小任务单元，这样可以在任务中断后恢复，避免主线程长时间被阻塞
- Fiber 可以区分优先级

Fiber 的渲染过程分为两个阶段:

- Render 阶段，计算虚拟 DOM 树，可以被中断
- Commit阶段，将更新应用到真是DOM

## React 中的生命周期方法有哪些？在函数组件中如何模拟这些生命周期？

**挂载阶段**
- ==constructor()==
- ==static getDerivedStateFromProps(props, state)==
- ==render()==
- ==componentDidMount()==

**更新阶段**
- ==static getDerivedStateFromProps(props, state)==
- ==shouldComponentUpdate(nextProps, nextState)==
- ==render()==
- ==getSnapshotBeforeUpdate(prevProps, prevState)==
- ==getSnapshotBeforeUpdate(prevProps, prevState)==
  
**卸载阶段**
- ==componentWillUnmount()==

**错误处理**
- ==static getDerivedStateFromError(error)==
- ==componentDidCatch(error, info)==

函数组件里，通过useEffect模拟各个阶段的事件


## 什么是 React 的合成事件？它与原生事件的区别是什么？

React 对浏览器的原生事件的封装。屏蔽跨平台差异、优化性能。

>[!NOTE]
>优化性能主要是指
>- 使用事件池重复利用事件
>- 事件委托到根节点
>- 事件回收会清空相关事件属性值，因此异步访问事件属性需要手动存储属性值

## React 如何处理状态更新的异步性？

**目的**： 
1. 优化性能
2. 保持批量状态更新时UI的一致性
3. 适配并发，区分更新优先级

**异步性表现**:
1. 批量更新
2. 更新state后不是立即生效

由于 setState 是异步的，直接读取 state 可能会得到旧值。如果需要基于最新状态进行更新，可以使用 函数式更新。
```Javascript
import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
    setCount((prevCount) => prevCount + 1);
    console.log(count); // 输出旧值，但最终 count 增加 2
  };

  return (
    <button onClick={handleClick}>
      Count: {count}
    </button>
  );
}
export default App;
```


## 自定义 Hook 的最佳实践是什么？如何避免逻辑复杂性？

1. 命名以 use 开头
2. 每个自定义 Hook 应完成一个明确的任务，避免将多种逻辑混合在一个 Hook 中
3. 自定义 Hook 的返回值应清晰且易用
4. 推荐使用对象返回，便于解构和扩展
5. 自定义 Hook 应尽量通过参数接收所需数据，而不是直接依赖组件外部状态
6. 使用 useEffect 时，明确依赖项，避免不必要的重新执行
   
## React Context API 的原理是什么？如何避免 Context 的性能问题？

使用请[参考](/learn/react/i8Lyjuid/#context)

**`性能问题描述`**

Provider 的 value 发生变化时，无论 Consumer 是否实际使用了更新的数据，都会重新渲染。

1. 如果Provider的value没有变化，Provider包裹的所有子组件，不会执行，即使父组件渲染任意多次。
2. 如果Provider的value有变化，但是子组件没有使用context，组件也不会执行，即使父组件渲染任意多次。
3. 如果子组件里订阅了context，无论用到的属性值是否变化，组件都会执行，也会更新DOM。
4. 如果使用了useContextSelector的Selector模式，组件依然会执行，只是在Commit提交阶段会跳过DOM更新。

优化手段
1. 引用类型数据或函数，使用useMemo、useCallback缓存
2. 拆分Context
3. 局部共享的状态，优先考虑useState、useReducer
4. 多个context嵌套时，考虑聚合成一个
5. 使用 useContextSelector 实现 Selector 模式


## React状态跟踪机制

1. React通过内部链表结构，管理每个组件的状态（Hook相关），组件的上下文通过Context系统单独管理
2. 每次setState或者dispatch执行后，React会标记需要更新的组件，并将更新任务添加到调度队列
3. React调度器会基于调度优先级，确定任务的执行顺序、以及时间分片。并将任务分发给Fiber执行
4. Fiber执行中，根据状态链表获取对应的状态，重新计算虚拟DOM
5. 根据diff算法，比较新旧虚拟DOM，生成最小更新操作
6. 将最小操作应用到真实DOM

## 调度器的启动条件

1. setState或者dispatch触发状态更新
2. Context值变化
3. Props传参变化
4. React.startTransition

## 如何控制任务的优先级

1. 使用useDeferredValue、startTransition、useTransition等可以降级优先级
2. 通过React scheduler精确控制

## 什么是 React 的高阶组件（HOC）？与 Render Props 的区别是什么？

- HOC即：组件包组件
- Render Props: 传个函数给容器组件，函数控制渲染内容。有点类似vue里的作用域插槽


## 什么是 Concurrent Mode？它解决了哪些问题？

并发模式，允许任务切片、中断、排优先级等。

React18 createRoot替代ReactDOM.render自动开启

## React 的 forwardRef 是什么？有哪些实际应用场景？

高阶组件（HOC），解决了父组件直接访问子组件DOM 或实例的问题


## React Route相关

1. 提供BrowerRouter、HashRouter
2. 支持动态路由/user/:id
3. 导航跳转Link、NavLink，前者简单普通跳转，后者支持复杂效果。Navigate无交互，直接跳转
4. useNavigate编程式跳转、useNavigate获取当前导航信息，useParams获取动态路由参数，useSearchParams获取查询参数，useOutlet获取嵌套路由中的内容
5. 路由守卫：通过Route定时时指定element属性来实现

