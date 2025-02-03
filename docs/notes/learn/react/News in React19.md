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

==By convention, functions that use async transitions are called “Actions”== 

Building on top of Actions, React 19 introduces new hook **useOptimistic**(#useOptimisitc) to manage optimistic updates, and a new hook **React.useActionState**(#useActionState) to handle common cases for Actions. In react-dom we’re adding `<form>`Actions to manage forms automatically and **useFormStatus**(#useFormStatus) to support the common cases for Actions in forms

In the following section, we’ll break down each of the new Action features in React 19.

### useOptimisitc {#useOptimisitc}

const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);

useOptimistic is a React Hook that lets you show a different state while an async action is underway. It accepts some state as an argument and returns a copy of that state that can be different during the duration of an async action such as a network request. You provide a function that takes the current state and the argument value passed to addOptimistic Function, and returns the optimistic state to be used while the action is pending.

addOptimistic is the dispatching function to call when you have an optimistic update. It takes one argument, optimisticValue, of any type and will call the updateFn with state and optimisticValue.


### useActionState {#useActionState}

useActionState(action, initialState, permalink?)

Call useActionState at the top level of your component to create component state that is updated when a form action is invoked. You pass useActionState an existing form action function as well as an initial state, and it returns a new action that you use in your form, along with the latest form state and whether the Action is still pending. The latest form state is also passed to the function that you provided
```JavaScript 
import { useActionState } from "react";

async function increment(previousState, formData) {
  return previousState + 1;
}

function StatefulForm({}) {
  const [state, formAction] = useActionState(increment, 0);
  return (
    <form>
      {state}
      <button formAction={formAction}>Increment</button>
    </form>
  )
}

```
The form state is the value returned by the action when the form was last submitted. If the form has not yet been submitted, it is the initial state that you pass.


### useFormStatus {#useFormStatus}

A React DOM hook.In design systems, it’s common to write design components that need access to information about the `<form>` they’re in, without drilling props down to the component. This can be done via Context, but to make the common case easier, we’ve added a new hook useFormStatus
```JavaScript
import {useFormStatus} from 'react-dom';

function DesignButton() {
  const {pending} = useFormStatus();
  return <button type="submit" disabled={pending} />
}
```
useFormStatus reads the status of the parent `<form>` as if the form was a Context provider.

### use {#use}

In react19, new api use allows you to read resources like a Promise or Context in render. Unlike React Hooks, use can be called within loops and conditional statements like if. Like React Hooks, the function that calls use must be a Component or Hook.

When called with a Promise, the use API integrates with Suspense and error boundaries. The component calling use suspends while the Promise passed to use is pending. If the component that calls use is wrapped in a Suspense boundary, the fallback will be displayed.  Once the Promise is resolved, the Suspense fallback is replaced by the rendered components using the data returned by the use API. If the Promise passed to use is rejected, the fallback of the nearest Error Boundary will be displayed.

When a context is passed to use, it works similarly to useContext. While useContext must be called at the top level of your component, use can be called inside conditionals like if and loops like for. use is preferred over useContext because it is more flexible.

>[!IMPORTANT]
> use does not support promises created in render.

## Other features

### prerender, prerenderToNodeStream

These new APIs improve on renderToString by waiting for data to load for static HTML generation. They are designed to work with streaming environments like Node.js Streams and Web Streams. For example, in a Web Stream environment, you can prerender a React tree to static HTML with prerender


### Server Components 

Imagine you have an app with a lot of data that doesn’t change often, like a blog with comments. You could render the blog post content as a Server Component, which would fetch the data and render the HTML on the server. However, for the comment section, you might want client-side interactivity, so you’d use a Client Component for that part of the UI.

Server Components can run once at build time on your CI server, or they can be run for each request using a web server.

1. Server components can run at build time to read from the filesystem or fetch static content, so a web server is not required. For example, you may want to read static data from a content management system.
```Javascript
import marked from 'marked'; // Not included in bundle
import sanitizeHtml from 'sanitize-html'; // Not included in bundle

async function Page({page}) {
  // NOTE: loads *during* render, when the app is built.
  const content = await file.readFile(`${page}.md`);
  
  return <div>{sanitizeHtml(marked(content))}</div>;
}
```
2. Server Components can also run on a web server during a request for a page, letting you access your data layer without having to build an API. They are rendered before your application is bundled, and can pass data and JSX as props to Client Components.

When a request for a page comes in, the server uses the pre-bundled code to render the page (with Server Components), fetching data and combining everything to generate static HTML.

```Javascript
import db from './database';

async function Note({id}) {
  // NOTE: loads *during* render.
  const note = await db.notes.get(id);
  return (
    <div>
      <Author id={note.authorId} />
      <p>{note}</p>
    </div>
  );
}

async function Author({id}) {
  // NOTE: loads *after* Note,
  // but is fast if data is co-located.
  const author = await db.authors.get(id);
  return <span>By: {author.name}</span>;
}
```
When the page loads, the browser does not see the original Note and Author components; only the rendered output is sent to the client:

```html
<div>
  <span>By: The React Team</span>
  <p>React 19 is...</p>
</div>
```

Server Components are not sent to the browser, so they cannot use interactive APIs like useState. To add interactivity to Server Components, you can compose them with Client Component using the "use client" directive.

>[!NOTE]
>Directives provide instructions to bundlers compatible with React Server Components.
>
>- 'use client' lets you mark what code runs on the client.
>- 'use server' marks server-side functions that can be called from client-side code.


Server Components introduce a new way to write Components using async/await. When you await in an async component, React will suspend and wait for the promise to resolve before resuming rendering. This works across server/client boundaries with streaming support for Suspense.

```Javascript
// Server Component
import db from './database';

async function Page({id}) {
  // Will suspend the Server Component.
  const note = await db.notes.get(id);
  
  // NOTE: not awaited, will start here and await on the client. 
  const commentsPromise = db.comments.get(note.id);
  return (
    <div>
      {note}
      <Suspense fallback={<p>Loading Comments...</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  );
}

// Client Component
"use client";
import {use} from 'react';

function Comments({commentsPromise}) {
  // NOTE: this will resume the promise from the server.
  // It will suspend until the data is available.
  const comments = use(commentsPromise);
  return comments.map(commment => <p>{comment}</p>);
}
```


### Server Actions

Until September 2024, we referred to all Server Functions as “Server Actions”. If a Server Function is passed to an action prop or called from inside an action then it is a Server Action, but not all Server Functions are Server Actions. The naming in this documentation has been updated to reflect that Server Functions can be used for multiple purposes.

Server Actions allow Client Components to call async functions executed on the server.

When a Server Functions is defined with the "use server" directive, your framework will automatically create a reference to the server function, and pass that reference to the Client Component. When that function is called on the client, React will send a request to the server to execute the function, and return the result.

Creating a Server Function from a Server Component
```Javascript
// Server Component
import Button from './Button';

function EmptyNote () {
  async function createNoteAction() {
    // Server Function
    'use server';
    
    await db.notes.create();
  }

  return <Button onClick={createNoteAction}/>;
}

"use client";

export default function Button({onClick}) { 
  console.log(onClick); 
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNoteAction'}
  return <button onClick={() => onClick()}>Create Empty Note</button>
}
```


Importing Server Functions from Client Components
```Javascript
"use server";

export async function createNote() {
  await db.notes.create();
}

"use client";
import {createNote} from './actions';

function EmptyNote() {
  console.log(createNote);
  // {$$typeof: Symbol.for("react.server.reference"), $$id: 'createNote'}
  <button onClick={() => createNote()} />
}
```


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
### `<Context>`as a provider

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
When React renders this component, it will see the `<title> <link>`and `<meta>`tags, and automatically hoist them to the `<head>`section of document.

>[!NOTE]
>**You may still want a Metadata library**
>
> For simple use cases, rendering Document Metadata as tags may be suitable, but libraries can offer more powerful features like overriding generic metadata with specific metadata based on the current route. These features make it easier for frameworks and libraries like react-helmet to support metadata tags, rather than replace them.


### Support for stylesheets

Stylesheets, both externally linked  and inline, require careful positioning in the DOM due to style precedence rules. Building a stylesheet capability that allows for composability within components is hard, so users often end up either loading all of their styles far from the components that may depend on them, or they use a style library which encapsulates this complexity.

In react19, if you tell React the precedence of your stylesheet it will manage the insertion order of the stylesheet in the DOM and ensure that the stylesheet (if external) is loaded before revealing content that depends on those style rules.

```Javascript
function ComponentOne() {
  return (
    <Suspense fallback="loading...">
      <link rel="stylesheet" href="foo" precedence="default" />
      <link rel="stylesheet" href="bar" precedence="high" />
      <article class="foo-class bar-class">
        {...}
      </article>
    </Suspense>
  )
}

function ComponentTwo() {
  return (
    <div>
      <p>{...}</p>
      <link rel="stylesheet" href="baz" precedence="default" />  <-- will be inserted between foo & bar
    </div>
  )
}
```
During Server Side Rendering React will include the stylesheet in the `<head>`, which ensures that the browser will not paint until it has loaded. If the stylesheet is discovered late after we’ve already started streaming, React will ensure that the stylesheet is inserted into the `<head>` on the client before revealing the content of a Suspense boundary that depends on that stylesheet.

During Client Side Rendering React will wait for newly rendered stylesheets to load before committing the render. If you render this component from multiple places within your application React will only include the stylesheet once in the document



### Support for async scripts

In HTML normal scripts and deferred scripts load in document order which makes rendering these kinds of scripts deep within your component tree challenging. Async scripts (`<script async="" src="...">`) however will load in arbitrary order.

In React 19 we’ve included better support for async scripts by allowing you to render them anywhere in your component tree, inside the components that actually depend on the script, without having to manage relocating and deduplicating script instances.

```Javascript
function MyComponent() {
  return (
    <div>
      <script async={true} src="..." />
      Hello World
    </div>
  )
}

function App() {
  <html>
    <body>
      <MyComponent>
      ...
      <MyComponent> // won't lead to duplicate script in the DOM
    </body>
  </html>
}
```
In all rendering environments, async scripts will be deduplicated so that React will only load and execute the script once even if it is rendered by multiple different components.

In Server Side Rendering, async scripts will be included in the `<head>` and prioritized behind more critical resources that block paint such as stylesheets, fonts, and image preloads.



### Support for preloading resources 

React-based frameworks like Next.js/Remix.js/Gatsby.js frequently handle resource loading for you, so you might not have to call these APIs yourself. Consult your framework’s documentation for details.


```Javascript
import { prefetchDNS, preconnect, preload, preinit } from 'react-dom'
function MyComponent() {
  preinit('https://.../path/to/some/script.js', {as: 'script' }) // loads and executes this script eagerly
  preload('https://.../path/to/font.woff', { as: 'font' }) // preloads this font
  preload('https://.../path/to/stylesheet.css', { as: 'style' }) // preloads this stylesheet
  prefetchDNS('https://...') // when you may not actually request anything from this host
  preconnect('https://...') // when you will request something but aren't sure what
}
```

```html
<!-- the above would result in the following DOM/HTML -->
<html>
  <head>
    <!-- links/scripts are prioritized by their utility to early loading, not call order -->
    <link rel="prefetch-dns" href="https://...">
    <link rel="preconnect" href="https://...">
    <link rel="preload" as="font" href="https://.../path/to/font.woff">
    <link rel="preload" as="style" href="https://.../path/to/stylesheet.css">
    <script async="" src="https://.../path/to/some/script.js"></script>
  </head>
  <body>
    ...
  </body>
</html>
```

### Support for Custom Elements

1. Custom elements are a part of the Web Components standard.
2. Custom elements follow a specific lifecycle (e.g., connectedCallback, disconnectedCallback) and can encapsulate their own styles, templates, and logic. They are usually registered using the customElements.define() API.
```Javascript
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}); // Encapsulated shadow DOM
    this.shadowRoot.innerHTML = '<div>Hello, World!</div>';
  }
}
customElements.define('my-element', MyElement);
```

In past versions, using Custom Elements in React has been difficult because React treated unrecognized props as attributes rather than properties. In React 19, we’ve added support for properties that works on the client and during SSR with the following strategy:

- **Server Side Rendering** : props passed to a custom element will render as attributes if their type is a primitive value like string, number, or the value is true. Props with non-primitive types like object, symbol, function, or value false will be omitted.

- **Client Side Rendering**: props that match a property on the Custom Element instance will be assigned as properties, otherwise they will be assigned as attributes.

>[!NOTE]
>**Attributes** refer to the properties you define on HTML elements in your markup. These are things like class, id, src, href, alt, etc., in the HTML world.
>
>In React, attributes are passed into JSX elements (which are essentially syntactic sugar for React.createElement calls). These attributes map directly to DOM element properties and can influence the rendered HTML or behavior.
>
>**Props** (short for "properties") are a special object in React used to pass data from a parent component to a child component.





