---
title: Best practices for Zustand
createTime: 2025/02/07 18:41:59
permalink: /learn/front/DCSEhj3JA1DR/
author: Jack
tags:
  - React
  - Zustand
description: 
---

## What is Zustand.js

A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated.

Don't disregard it because it's cute. It has quite the claws, lots of time was spent dealing with common pitfalls, like the dreaded zombie child problem, react concurrency, and context loss between mixed renderers. It may be the one state-manager in the React space that gets all of these right.

## Core Principles & Recommendations

### Explicit Types for State

Define clear TypeScript interfaces or types for your state objects. This is crucial for type safety and helps catch errors early.

### Generic Types for Stores

Use generic types for your Zustand stores to ensure type consistency throughout your store's usage.

### Type-Safe Actions

Type your action functions (the functions you call to update the state) with explicit parameter and return types.

### Immutability (Highly Recommended with TypeScript)

TypeScript works exceptionally well with immutable data structures. Enforce immutability using libraries like Immer or by carefully using the spread syntax. This significantly improves predictability and reduces bugs.

### Typed Selectors

Type your selectors to ensure that derived state is also type-safe.

### Discriminated Unions for Complex State

For state that can be in different forms (e.g., loading, success, error), use [discriminated unions](#Discriminated unions). This makes it clear what shape the state can take and helps TypeScript narrow down types in your components.



### Asynchronous Actions with Type Safety

Type the promises returned by your asynchronous actions and ensure that your state updates within the action handlers are also type-safe.

### Middleware with Type Support

Most Zustand middleware (like persist, devtools, immer) has excellent TypeScript support. Leverage this to maintain type safety even when using middleware.

## Code Style and Structure

### Store File Organization

Create separate files for your stores and define the corresponding types in the same file or a dedicated types.ts file within the store's directory.  This makes it easier to share types and keep your code organized.

### Consistent Naming

Use descriptive names, and let the types provide additional context.

## Performance Optimization

### Memoization (with useMemo, React.memo, and Type Safety)

Ensure that your memoization strategies (e.g., useMemo, React.memo) work seamlessly with your typed selectors and components.

### Selective Updates (with Type Checking)

TypeScript can help you ensure that you're only updating the necessary parts of the state and that the updates are type-correct

## Testing 

### Test Your Stores

Use type mocking to easily mock dependencies and [test your Zustand stores](#mock) in a type-safe way.


## What is Discriminated unions {#Discriminated unions}

Discriminated unions (also known as tagged unions or algebraic data types) are a way to represent a value that can be one of several different types.  They are particularly useful when you have data that can exist in variouHowever, if you're stuck with class components for some reason, here's how you can do its states or forms, and you need to handle each of those cases differently.  
```TypeScript
interface LoadingState {
  status: 'loading';
}

interface SuccessState {
  status: 'success';
  data: any; // Or a more specific type for your data
}

interface ErrorState {
  status: 'error';
  message: string;
}

type FetchState = LoadingState | SuccessState | ErrorState;   //This is Discriminated unions
```

## How to use zustand in react class component

While Zustand is primarily designed for functional components using hooks, you can use it in class components, though it requires a bit of a workaround.  It's generally recommended to refactor to functional components if possible to take full advantage of Zustand's features. 

However, if you're stuck with class components for some reason, here's how you can do it

1. Create the Zustand Store (as usual)
2. Or Use store.subscribe() to listen for changes and update state accordingly
   
```Javascript
import React, { Component } from "react";
import { create } from "zustand";

// Step 1: Create a Zustand Store
const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}));

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: useStore.getState().count, // Get initial state
    };
  }

  componentDidMount() {
    // Step 3: Subscribe to store changes
    this.unsubscribe = useStore.subscribe((state) =>
      this.setState({ count: state.count })
    );
  }

  componentWillUnmount() {
    // Step 4: Unsubscribe when component unmounts
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={useStore.getState().increase}>Increase</button>
        <button onClick={useStore.getState().decrease}>Decrease</button>
      </div>
    );
  }
}

export default Counter;
```

## How to Mock Zustand Stores for Testing{#mock}

Mocking Zustand stores in unit tests is crucial to ensure predictable behavior, avoid unwanted side effects, and control state changes during testing. 

To properly test components using Zustand, we can use Jest and React Testing Library.

