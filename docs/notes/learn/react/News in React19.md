---
title: News in React19
createTime: 2025/02/02 02:31:45
permalink: /learn/react/AWhyJOhwsiI/
author: Jack
tags:
  - React19 
  - New Features
description: 
---

## Actions

==By convention, functions that use async transitions are called “Actions”.== 

Building on top of Actions, React 19 introduces new hook **useOptimistic**(#useOptimisitc) to manage optimistic updates, and a new hook **React.useActionState**(#useActionState) to handle common cases for Actions. In react-dom we’re adding `<form>`Actions to manage forms automatically and **useFormStatus**(#useFormStatus) to support the common cases for Actions in forms.


## useOptimisitc {#useOptimisitc}


## useActionState {#useActionState}


## useFormStatus {#useFormStatus}


## use {#use}


## prerender 


## prerenderToNodeStream

## Server Components 

## Server Actions


## Improvements in React 19

### ref as a prop

Starting in React 19, you can now access ref as a prop for function components, New function components will no longer need forwardRef, and we will be publishing a codemod to automatically update your components to use the new ref prop. In future versions we will deprecate and remove forwardRef.
```Javascript
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />
}
//...
<MyInput ref={ref} />
```
### <Context> as a provider

In React 19, you can render `<Context>` as a provider instead of `<Context.Provider>`
```Javascript
const ThemeContext = createContext('');

function App({children}) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );  
}
```

### Cleanup functions for refs

React19 supports returning a cleanup function from ref callbacks. When the component unmounts, React will call the cleanup function returned from the ref callback. This works for DOM refs, refs to class components, and useImperativeHandle.
```Javascript
<input
  ref={(ref) => {
    // ref created

    // NEW: return a cleanup function to reset
    // the ref when element is removed from DOM.
    return () => {
      // ref cleanup
    };
  }}
/>
```

### useDeferredValue initial value 

We’ve added an initialValue option to useDeferredValue. When initialValue is provided, useDeferredValue will return it as value for the initial render of the component, and schedules a re-render in the background with the deferredValue returned.
```Javascript
function Search({deferredValue}) {
  // On initial render the value is ''.
  // Then a re-render is scheduled with the deferredValue.
  const value = useDeferredValue(deferredValue, '');
  
  return (
    <Results query={value} />
  );
}
```

### Support for Document Metadata

In React 19, we’re adding support for rendering document metadata tags in components natively.
```Javascript
function BlogPost({post}) {
  return (
    <article>
      <h1>{post.title}</h1>
      <title>{post.title}</title>
      <meta name="author" content="Josh" />
      <link rel="author" href="https://twitter.com/joshcstory/" />
      <meta name="keywords" content={post.keywords} />
      <p>
        Eee equals em-see-squared...
      </p>
    </article>
  );
}
```
When React renders this component, it will see the `<title><link>`and `<meta>`tags, and automatically hoist them to the `<head>`section of document.

>[!NOTE]
>**You may still want a Metadata library**
>
> For simple use cases, rendering Document Metadata as tags may be suitable, but libraries can offer more powerful features like overriding generic metadata with specific metadata based on the current route. These features make it easier for frameworks and libraries like react-helmet to support metadata tags, rather than replace them.


### Support for stylesheets










