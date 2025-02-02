---
title: Event Loop
createTime: 2025/01/25 08:07:48
permalink: /learn/front/FnqFqivY3p2d2HIzzsng/
author: Jack
tags:
  - Javascript
  - Event Loop

description: description
---

## Event Loop（事件循环）

是 JavaScript 的核心机制之一，用于处理异步操作，使得 JavaScript 可以在单线程中实现非阻塞的行为。它负责协调执行同步任务、异步任务和回调函数。

## 单线程运行

- JavaScript 是单线程的，这意味着它在任何时候只能执行一个任务。
- 所有代码在一个主线程上执行，这个线程被称为 主线程。

## 同步与异步

- 会在主线程上按顺序执行，阻塞后续任务。
- 通过事件循环机制，在完成任务后将回调推入队列，并在主线程空闲时执行。

## JavaScript 执行顺序

- **`调用栈（Call Stack）`**
  
  调用栈是一个栈结构，存储执行中的函数。 每当一个函数被调用，就会被压入栈顶，执行完后出栈。

- **`消息队列（Task Queue）`**

  消息队列存储异步任务（如 setTimeout 回调、I/O 操作等）。主线程空闲时，Event Loop 会从队列中取出任务执行。

## 事件循环的执行步骤

- 从调用栈执行同步代码，直到调用栈清空。
- 检查消息队列，如果有任务，将任务推入调用栈执行。
- 重复上述过程，形成循环。

## 异步任务的两种类型

- **`宏任务（Macro Task）`**
  1. 包括：setTimeout、setInterval、setImmediate、I/O 操作等
  2. 每次事件循环中只会执行一个宏任务。

- **`微任务（Micro Task）`**
  1. 包括：Promise.then、MutationObserver。
  2. 微任务的优先级高于宏任务，在每个宏任务执行后会清空所有微任务。

