---
title: NextJS keypoints
createTime: 2025/03/15 19:09:05
permalink: /learn/React/buJ5wQYSNWg0gWzTx0id/
author: Jack
tags:
  - React
  - NextJS
description: description
---

## Layout and Tempaltes

### layout.tsx

A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not rerender.

You can define a layout by default exporting a React component from a layout file. The component should accept a children prop which can be a page or another layout.

## Link and Navigate

The App Router uses a hybrid approach for routing and navigation. On the server, your application code is automatically code-split by route segments. And on the client, Next.js prefetches and caches the route segments. This means, when a user navigates to a new route, the browser doesn't reload the page, and only the route segments that change re-render - improving the navigation experience and performance.

### Link 

You can use the `<Link>` component to navigate between routes.  `<Link>` is a built-in Next.js component that extends the HTML <a> tag to provide prefetching and client-side navigation.

It is the primary and recommended way to navigate between routes in Next.js.

### useRouter()

The useRouter hook allows you to programmatically change routes from Client Components.

Use the `<Link>` component to navigate between routes unless you have a specific requirement for using useRouter.


### redirect

For Server Components, use the redirect function instead.

### Using the native History API

Next.js allows you to use the native window.history.pushState and window.history.replaceState methods to update the browser's history stack without reloading the page.

- window.history.pushState

Use it to add a new entry to the browser's history stack. The user can navigate back to the previous state.

- window.history.replaceState

Use it to replace the current entry on the browser's history stack. The user is not able to navigate back to the previous state. 

## Error Handling

Errors can be divided into two categories: **expected errors** and **uncaught exceptions**.

- **Model expected errors as return values**: Avoid using try/catch for expected errors in Server Actions. Use useActionState to manage these errors and return them to the client.
- **Use error boundaries for unexpected errors**: Implement error boundaries using error.tsx and global-error.tsx files to handle unexpected errors and provide a fallback UI.

Uncaught exceptions are unexpected errors that indicate bugs or issues that should not occur during the normal flow of your application. These should be handled by throwing errors, which will then be caught by error boundaries.
- **Common**: Handle uncaught errors below the root layout with error.js.
- **Optional**: Handle granular uncaught errors with nested error.js files (e.g. app/dashboard/error.js)
- **Uncommon**: Handle uncaught errors in the root layout with global-error.js.

Create an error boundary by adding an error.tsx file inside a route segment and exporting a React component. 

If you want errors to bubble up to the parent error boundary, you can throw when rendering the error component.

While less common, you can handle errors in the root layout using app/global-error.js, located in the root app directory, even when leveraging internationalization. Global error UI must define its own `<html>` and `<body>` tags, since it is replacing the root layout or template when active.

## Loading UI and Streaming

### Instant Loading States
The special file loading.js helps you create meaningful Loading UI with React Suspense. With this convention, you can show an instant loading state from the server while the content of a route segment loads. The new content is automatically swapped in once rendering is complete.

In the same folder, loading.js will be nested inside layout.js. It will automatically wrap the page.js file and any children below in a `<Suspense>` boundary.

### Streaming with Suspense