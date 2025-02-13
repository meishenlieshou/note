---
title: Questions for the React Interview
createTime: 2025/02/06 19:44:20
permalink: /learn/react/iwKQgRHX8HJU0rg/
author: Jack
tags:
  - React
  - Interview
description: 
---

## What is ReactJS, and what are its key features?

ReactJS is an open-source JavaScript library developed by Facebook. It is used for building user interfaces in web applications.

Key features include a virtual DOM for efficient updates, component-based architecture for reusability, JSX for declarative syntax, and unidirectional data flow

## What is JSX, and why is it used in React?

JSX (JavaScript XML) is an extension to JavaScript that allows you to write HTML-like code within JavaScript. It provides a more readable and concise way to describe the structure of UI components. React uses JSX to define the structure of components, making it easier to visualize and understand the UI hierarchy.

## Explain the concept of “props” in React.

Props (short for properties) are a mechanism for passing data from a parent component to a child component. They are read-only and provide a way to configure and customize child components based on their parent’s data. Props are an essential part of creating reusable and dynamic components.

## What is state in React, and how is it different from props?

State is a mechanism for managing and storing dynamic data within a component. Unlike props, which are passed from parent to child and are read-only, state is local to a component and can be updated using the setState method. State enables components to re-render when data changes, updating the UI dynamically.

## What are React hooks, and how do they differ from class components?

React hooks are functions that allow you to use state and other React features in functional components. They provide an alternative to class components by enabling the use of state and lifecycle features without writing a class. Hooks, such as useState and useEffect, streamline component logic and make it more concise.

## Explain the concept of the virtual DOM and its advantages.

The virtual DOM is a lightweight copy of the actual DOM in memory. React uses it to perform efficient updates by comparing the virtual DOM with the previous version and calculating the minimum number of changes needed to reflect the new state. This minimizes direct manipulation of the actual DOM, leading to improved performance and responsiveness.

Virtual DOM is a concept where a virtual representation of the real DOM is kept inside the memory and is synced with the actual DOM by a library such as ReactDOM.

The virtual DOM is an object that represents the real DOM in the memory. Since DOM updates are an integral part of any web app but are the costliest operation in the world of frontend, the virtual DOM is utilized to check for parts of the app that need to be updated & update only those parts, thus significantly boosting performance.

## What is the purpose of the “key” prop in React lists?

The “key” prop is used to uniquely identify elements in a list of components. It helps React efficiently update and reorder components by providing a stable identity for each item. Using keys correctly improves the performance of rendering and updating lists.

Key helps React identify which items have changed, are added, or are removed, enabling it to reuse already existing DOM elements, thus providing a performance boost.

## How does Redux work, and when would you use it?

Redux is a state management library for managing the global state of an application. It uses a single source of truth and enforces a unidirectional data flow. React Redux is suitable for large-scale applications with complex state management needs, where multiple components need access to shared data.

## What is the significance of the “shouldComponentUpdate” method?

The shouldComponentUpdate method is used to optimize performance by determining whether a component should re-render. It is called before a component updates and receives the next props and state. By returning false in certain conditions, you can prevent unnecessary re-renders and improve performance.

## How do you handle forms in React, and what is controlled vs. uncontrolled components?

Forms in React can be controlled or uncontrolled. Controlled components have their state controlled by React and are updated via the setState method. Uncontrolled components manage their state using the DOM directly. Controlled components provide a more predictable and maintainable way to handle form inputs.

## Why do we need to transpile React code?

React code is written in JSX, but no browser can execute JSX directly as they are built to read-only regular JavaScript. Thus we require to use tools like Babel to transpile JSX to JavaScript so that the browser can execute it.

## What is the significance of refs in React?

Refs are variables that allow you to persist data between renders, just like state variables, but unlike state variables, updating refs does NOT cause the component to re-render.

Refs are usually used to, but not restricted to, store reference to DOM elements.

## What are the most common approaches for styling a React application?

1. CSS Classes
2. Inline CSS
3. Pre-processors (Sass, Stylus, and Less)
4. CSS-in-JS Modules (Styled Components, Emotion, and Styled-jsx)

## What are some of the performance optimization strategies for React?

1. Avoid Unnecessary Re-renders: Use React.memo, useMemo, useCallback, and PureComponent.
2. Optimize State Management: Lift state wisely, use local state when possible, and batch updates.
3. Virtualization for Large Lists: Use react-window or react-virtualized.
4. Code-Splitting & Lazy Loading: Use React.lazy, Suspense, and dynamic imports.
5. Optimize Asset Loading: Compress images, use lazy loading, and tree-shake dependencies.
6. Optimize Network Requests: Use caching (React Query, SWR), debounce expensive API calls.

## What is prop drilling and how to avoid it?

Sometimes while developing React applications, there is a need to pass data from a component that is higher in the hierarchy to a component that is deeply nested. To pass data between such components, we pass props from a source component and keep passing the prop to the next component in the hierarchy till we reach the deeply nested component.

The disadvantage of using prop drilling is that the components that should otherwise be not aware of the data have access to the data, moreover, the code becomes harder to maintain.

Prop drilling can be avoided using the Context API or some form of State Management library.

## What is the StrictMode component and why would you use it?

It is a component included with React to provide additional visibility of potential issues in components. Suppose the application is running in development mode. In that case, any issues are logged to the development console, but these warnings are not shown if the application is running in production mode.

Developers use to find problems such as deprecated lifecycle methods and legacy patterns, to ensure that all React components follow current best practices.

It can be applied at any level of an application component hierarchy, which allows it to be adopted incrementally within a codebase.

## What are synthetic events in React?

Synthetic events combine the response of different browser's native events into one API, ensuring that the events are consistent across different browsers. The application is consistent regardless of the browser it is running in.

## Why is it not advisable to update state directly, but use the setState call?

The conventional way to update state is to use the setState call. Without using it, the user would still be able to modify the state, but it would not update the DOM to reflect the new state.

## What are portals in React?

Portal is a recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

## What is a component in React?

In React, a component is a modular, reusable piece of code that defines a part of a user interface. Components can be thought of as building blocks for larger applications. They are typically composed of HTML-like markup (in the form of JSX) and JavaScript logic that defines their behavior.

## What is the difference between a functional and class component?

In React, there are two main types of components: functional components and class components.

Functional components are defined as JavaScript functions that return some JSX code. They are simple, lightweight, and typically used for simple UI components that don’t require any state or lifecycle methods. They can be easily reused and composed to create more complex components.

Class components, on the other hand, are defined as ES6 classes that extend the React.Component class. They have more features than functional components, including the ability to manage state and lifecycle methods. They are typically used for more complex UI components that require more logic and interaction. 

## How do you pass data from a parent component to a child component in React?

In React, data can be passed from a parent component to a child component using props.

## What is the ‘useEffect’ hook in React and when would you use it?

The useEffect hook is used in React to perform side effects such as fetching data, updating the document title, or adding event listeners. It allows you to run a function after rendering a component, and optionally specify dependencies that should trigger a re-run of the function.

## What is the ‘useState’ hook in React and when would you use it?

The useState hook is used in React to add state to functional components. It allows you to declare state variables and update them using the useState function.

## What are ‘Higher-Order Components’ (HOC) and when would you use them in React?

Higher-Order Components (HOC) are functions that take a component and return a new component with additional functionality. HOCs allow you to reuse code and logic across different components in your application. You can use HOCs to add functionality such as authentication, data fetching, or error handling to your components.

For example, you could create an HOC that adds authentication to a component by checking if the user is logged in before rendering the component. This allows you to reuse this authentication logic across multiple components in your application.

## What is ‘Render Prop’ and when would you use it in React?

Render Prop is a pattern in React where a component takes a function as a prop and calls it to render its content. The function takes the component’s state and returns the JSX to render. This allows you to share state and logic between components without using Higher-Order Components.

Render Prop can be used to create reusable components that can be customized with different content or functionality. For example, you could create a component that renders a dropdown menu and takes a function to render the menu items. This allows you to reuse the dropdown component with different menu items in different parts of your application.

## What is the significance of React Fragments?

React Fragments allow you to group multiple elements without adding unnecessary nodes to the DOM. It’s useful when you don’t want to introduce an additional parent div.

## What is the significance of Pure Component in React?

Pure Component is a base class for class components that implements a shouldComponentUpdate method with a shallow prop and state comparison. It helps in preventing unnecessary renders for performance optimization.

## What are React Hooks rules?

Hooks in React must be called at the top level (not inside loops or conditions), and they must be called from React functional components or custom Hooks.

## What is the significance of the dangerouslySetInnerHTML attribute in React?

dangerouslySetInnerHTML is used to inject HTML content into a React component. It should be used with caution, as improper use can expose the application to Cross-Site Scripting (XSS) attacks.

## What is the purpose of the useContext Hook in React?

useContext is a Hook in React used for consuming the value of a context. It provides a way to access the values of a context directly within a functional component.

##  Explain the concept of code-splitting in React.

Code-splitting is a technique in React that involves breaking the code into smaller chunks and loading them on demand. This helps in optimizing the initial loading time of the application.

## What is the role of the displayName property in React?

The displayName property is used to set a display name for a React component, making it easier to debug and profile the component hierarchy.

## Explain the concept of lazy loading in React.

Lazy loading is a technique where components or resources are loaded only when they are actually needed. React provides the React.lazy function for lazy loading components.

## What is the purpose of the React.PureComponent class in React?

React.PureComponent is similar to React.Component but implements shouldComponentUpdate with a shallow prop and state comparison, optimizing performance by preventing unnecessary renders.

## How does React handle error boundaries, and what is their purpose?

Error boundaries in React catch JavaScript errors anywhere in their component tree and log those errors, preventing the entire application from crashing. They are used for better error handling and logging.

## How to pass data from child to parent in react?

To pass data from a child component to a parent component in React, you typically use callback functions.

##  Design Patterns in React?

1. Higher-Order Components
2. Render Props Pattern
3. Custom Hooks (Hooks Pattern)
4. Context API for State Sharing

## What is the use of ReactDOMServer?

ReactDOMServer is a module in React that enables server-side rendering (SSR).

## What is the difference between Rendering and Mounting?

Rendering refers to the process of generating the user interface (UI) based on the component's state and props. It happens when a component is converted into DOM elements.

Mounting is a specific phase in the React component lifecycle when a component is inserted into the DOM for the first time. It is part of the initial rendering process.

## What is React reconciliation?

React reconciliation is the process by which React updates the user interface when the state of a component changes.

## What do you understand from React Fiber?

React Fiber is the reconciliation engine for React, introduced in React 16 to improve the rendering performance and capabilities of React applications.

## What is babel?

Babel is a JavaScript compiler that allows you to write modern JavaScript (ES6+ or JSX) and converts it into a version of JavaScript that can run in older browsers or environments.

## What is the use of Webpack? 

Webpack is a module bundler that takes your code and its dependencies (JavaScript, CSS, images, etc.) and bundles them into a single or few output files that can be efficiently served to the browser.

## Explain Memory Leak in React?

A memory leak in React occurs when components or resources that are no longer needed are not properly cleaned up, resulting in increased memory usage over time

## What is React Suspense Boundary? 

React Suspense is a feature that manages loading states for components that fetch data asynchronously or are loaded dynamically. It allows you to show a fallback UI (like a loading spinner) while waiting for the content to load.

## What is the difference between React VS Angular?

**React**

- Developed by Facebook.
- Uses JSX (JavaScript XML) for templating.
- Features unidirectional data flow, which means data flows in one direction (from parent to child).
- Utilizes a Virtual DOM to optimize rendering perforggjmance, making updates faster.
- Often uses Flux or Redux for state management, allowing for a predictable state container.

**Angluar**

- Developed by Google.
- Uses standard HTML and JavaScript/TypeScript for templating.
- Supports bidirectional data binding, meaning changes in the UI automatically update the model and vice versa.
- Works with the real DOM, which can be slower in certain scenarios due to direct manipulation of the actual DOM.
- Follows the MVC (Model-View-Controller) architecture, providing a structured approach to building applications.

