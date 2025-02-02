---
title: WebAssembly
createTime: 2025/01/18 07:30:40
permalink: /learn/front/K8AbMwyElo/
author: Jack
tags:
  - WebAssembly
  - 前端原生技术
  - C编程

description: 
---

## 关于WebAssembly

WebAssembly (Wasm) 是一种高性能、低级别的二进制指令集，专为网页运行设计。它是一种跨平台、紧凑、高效的编程语言，提供接近原生性能的运行能力，主要用于在浏览器中运行复杂计算任务或资源密集型应用。

## 关键特性

- **`高性能`**
- **`支持多种编程语言`**    最终都将编译成 WebAssembly 后运行于浏览器
- **`安全性`**   WebAssembly 在沙箱环境中执行，遵循浏览器的安全模型，避免了直接操作底层硬件的风险
- **`跨平台支持`**    能在任何支持 WebAssembly 的环境中运行，包括主流浏览器（Chrome、Firefox、Safari、Edge）和服务器端（如 Node.js）

## WebAssembly 的工作原理

1. 开发者使用支持的语言（如 C、C++、Rust）编写代码
2. 使用工具链（如 LLVM 或 Emscripten）将代码编译为 .wasm 文件
3. 在 JavaScript 中通过 WebAssembly API 加载和解析 .wasm 文件
4. 创建 WebAssembly 模块的实例，并分配所需资源
5. 使用 JavaScript 调用 WebAssembly 导出的函数
6. WebAssembly 和 JavaScript 可以通过 内存 和 导入/导出接口 进行交互

## 应用示例

1. 使用C编写功能逻辑
   
```C
#include <stdint.h>

int add(int a, int b) {
    return a + b;
}
```

2. 编译为 WebAssembly
```Shell
emcc add.c -o add.wasm -s WASM=1
```
>[!NOTE]
>什么是emcc
>
> emcc 是 Emscripten Compiler Frontend 的命令行工具，属于 Emscripten 工具链的一部分，用于将 C 和 C++ 代码编译为 WebAssembly (.wasm) 或 JavaScript 文件（包括 asm.js）。
>
> 而Emscripten 是一个开源的 LLVM 到 Web 的编译器工具链，能够将以 C/C++ 编写的代码转译为可以在浏览器中运行的代码。
>
> gcc 是一个通用的编译器，支持多种编程语言（C、C++、Fortran、Ada 等），主要用于生成可在本地平台运行的二进制文件。

>[!NOTE]
>emcc 的工作流程
>
> **1. 编译器管道**
> 
> emcc 使用 LLVM 工具链，将 C/C++ 源代码逐步转换为 WebAssembly：
> - 源代码 → 中间表示 (IR)： 使用 clang 解析 C/C++ 代码，生成 LLVM 的中间表示（IR）。
> - 中间表示 → 字节码： LLVM 的后端将中间表示转译为 WebAssembly 字节码。
> - 字节码 → WebAssembly 文件： 最终生成 .wasm 文件和必要的 glue 代码。 
>
> **2. 生成结果**
> 
> 运行 emcc，可以生成以下输出文件：
>- .wasm：WebAssembly 文件，包含编译后的二进制代码。
>- .js：JavaScript glue 文件，用于加载 WebAssembly 并提供辅助功能。主要辅助 WebAssembly 的加载和运行，提供与浏览器 API（如 DOM、Canvas）的交互桥梁。
>- .html：如果使用特定选项，还可以生成一个完整的 HTML 页面用于测试。


3. JavaScript中调用{#callc}
```JavaScript
// 加载和实例化 WebAssembly 模块
fetch('add.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes)
).then(results => {
  const add = results.instance.exports.add;
  console.log(add(2, 3)); // 输出 5
});

```

## JavaScript和WebAssembly互通

### Javascript调用C

通过实例化后的对象引用，可以调用到C程序里暴露的方法，如[示例](#callc)

### C调用Javascript

WebAssembly 不会直接在编译时将 JavaScript 函数嵌入 C 代码。WebAssembly 模块和 JavaScript 是通过 导入机制 进行交互的。

C 代码需要与 JavaScript 交互时，通常是在 WebAssembly 模块外部（通过导入）提供 JavaScript 函数作为接口。C 代码中并不会直接嵌入 JavaScript 函数调用，而是通过导入的函数来间接调用 JavaScript。例如

```C
#include <stdio.h>
void call_js_log() {
    printf("Calling JavaScript function...\n");
}
```
```Javascript
// JavaScript 中定义的函数
function jsLog(message) {
    console.log("From JS: " + message);
}

//通过instantiate初始化时导入javascript函数接口
fetch('module.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, {
    env: {
      jsLog: jsLog  // 将 JavaScript 中的 jsLog 函数导入 WebAssembly 模块
    }
  }))
  .then(wasmModule => {
    // WebAssembly 模块已经实例化，调用其中的函数
    wasmModule.instance.exports.call_js_log();  // WebAssembly 调用 JavaScript 函数
  });

```


## 与浏览器API交互

WebAssembly 可以与浏览器的其他 Web API 一起使用。例如，你可以通过 WebAssembly 进行高效的图像处理或数学运算，然后将结果传递回浏览器 API（如 Canvas 或 WebGL）进行渲染。