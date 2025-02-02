---
title: Knowledge points for react
createTime: 2025/01/21 20:55:27
permalink: /learn/react/T8RJVEk/
author: Jack
tags:
  - react
  - 问题

description: description
---


## What is React Fiber?

React Fiber is the reconciliation engine introduced in React 16, designed to improve the way React updates the Virtual DOM and renders components.

Before React Fiber, React used a synchronous reconciliation algorithm that blocked rendering updates until all work was completed. This led to performance issues, especially for large applications. React Fiber solves this by making rendering asynchronous, interruptible, and more efficient.

**Key Features of React Fiber**
1. ==Incremental Rendering (Time-Slicing)==    React Fiber can pause and resume rendering, breaking work into smaller chunks, making the UI more responsive.
2. ==Concurrency (Concurrent Mode)==    It allows React to work on multiple tasks simultaneously, prioritizing updates dynamically. High-priority updates (like user input) can be processed before lower-priority updates (like data fetching).
3. ==Error Boundaries==  Introduced a better error-handling mechanism using error boundaries, preventing entire apps from crashing due to component failures.
4. ==Suspense==  Improved support for React Portals and the Suspense API (for handling async rendering).

**How React Fiber Works**

React Fiber splits rendering into two phases
1. ==Render Phase==

React determines what changes need to be made to the UI. This phase can be interrupted if there are higher-priority tasks.

2. ==Commit Phase==

Make the final changes  apply to the DOM. This phase is synchronous and cannot be interrupted.


## What are the lifecycle methods in React? How to simulate these lifecycle methods in functional components?

**Step for mount**
- ==constructor()==
- ==static getDerivedStateFromProps(props, state)==
- ==render()==
- ==componentDidMount()==

**Step for update**
- ==static getDerivedStateFromProps(props, state)==
- ==shouldComponentUpdate(nextProps, nextState)==
- ==render()==
- ==getSnapshotBeforeUpdate(prevProps, prevState)==
- ==getSnapshotBeforeUpdate(prevProps, prevState)==
  
**Step for unmount**
- ==componentWillUnmount()==

**Step for error**
- ==static getDerivedStateFromError(error)==

This method catches errors from child components and updates state to trigger a fallback UI. It does not log errors; for that, use **`componentDidCatch`**.

- ==componentDidCatch(error, info)==

In function component,  lifecycle behaviors can be simulated using React Hooks, primarily **`useEffect`**.


## What is React's Synthetic Event? How does it differ from native events?

A Synthetic Event in React is a wrapper around native browser events, providing a consistent and cross-browser event system. React creates these events to ensure compatibility across different browsers and improve performance.

Since React recycles Synthetic Events, if you need to use the event object asynchronously (e.g., in a setTimeout), call event.persist().

```JavaScript
function MyComponent() {
  const handleClick = (event) => {
    event.persist(); // Prevents event pooling
    setTimeout(() => {
      console.log(event.type); // Still accessible
    }, 1000);
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

## What are the characteristics of React state updates?

React state updates have several key characteristics that affect how components render and behave. Understanding these characteristics helps optimize performance and avoid common pitfalls.

1. **`State Updates are Asynchronous`**

React batches state updates for performance reasons, meaning that setState (in class components) and the state updater function from useState (in functional components) do not update the state immediately. 

To ensure you're working with **the latest state**, use the functional updater. 
```JavaScript
//Function Component
setCount(prevCount => prevCount + 1);

//Class component
this.setState((prevState) => ({ count: prevState.count + 1 }));
```

2. **`State Updates are Merged (Class Components Only)`**
3. **`State Updates May Be Batching`**
4. **`State Updates Trigger Re-renders`**
5. **`State Should be Immutable`**


## What are the best practices for custom Hooks? How to avoid logic complexity?

Custom Hooks in React allow you to reuse stateful logic across multiple components. However, poorly structured Hooks can lead to complex, hard-to-maintain code. Following best practices can help maintain clarity and avoid excessive complexity.

1. Name Custom Hooks with use Prefix.
2. Keep Hooks Focused on a Single Responsibility.
3. Use useCallback and useMemo to Optimize Performance.
4. Handle Side Effects Properly (useEffect Cleanup)
5. Make Hooks Configurable with Parameters
6. Break down large Hooks into smaller Hooks
7. Prefer returning objects { data, isLoading, error } instead of multiple values.
8. Limit the number of dependencies in useEffect


   
## What is the principle of React Context API? How to avoid performance issues with Context? 

The React Context API is a built-in feature that allows components to share state without prop drilling. It provides a way to pass data globally through a component tree.

React Context consists of three main parts:

1️⃣ React.createContext() → Creates a Context object.

2️⃣ Provider (Context.Provider) → Wraps components and provides values.

3️⃣ Consumer (Context.Consumer or useContext) → Accesses the provided values.

Best Practices to Optimize Context Performance

1. Use Separate Contexts for Different Values
2. Use useMemo to Prevent Unnecessary Re-Renders. Wrap the context value in useMemo to avoid recreating objects unnecessarily.
3. For complex state logic, use useReducer instead of useState to prevent unnecessary updates.
4. Use Context Selectors with Libraries(e.g., Zustand, Recoil)



