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

- React 组件的工作单元
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

Context 的性能问题，主要是Provider 的 value 发生变化时，无论 Consumer 是否实际使用了更新的数据，都会重新渲染。

优化手段jj
1. 引用类型数据或函数，使用useMemo、useCallback缓存
2. 拆分Context
3. 局部共享的状态，优先考虑useState、useReducer
4. 多个context嵌套时，考虑聚合成一个
5. 使用 useContextSelector 实现 Selector 模式




