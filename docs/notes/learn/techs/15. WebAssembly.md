---
title: WebAssembly
createTime: 2025/01/18 07:30:40
permalink: /learn/front/K8AbMwyElo/
author: Jack
tags:
  - WebAssembly
  - Frontend native technology
  - C programming

description: 
---

## About WebAssembly

WebAssembly (Wasm) is a high-performance, low-level binary instruction set designed for web execution. It is a cross-platform, compact, and efficient programming language that provides near-native performance, mainly used for running complex computational tasks or resource-intensive applications in the browser.

## Key Features

- **`High performance`**
- **`Supports multiple programming languages`**: Ultimately compiled into WebAssembly and run in the browser
- **`Security`**: WebAssembly executes in a sandbox environment, adhering to the browser's security model, avoiding the risk of directly manipulating underlying hardware
- **`Cross-platform support`**: Can run in any environment that supports WebAssembly, including mainstream browsers (Chrome, Firefox, Safari, Edge) and server-side (e.g., Node.js)

## How WebAssembly Works

1. Developers write code in supported languages (e.g., C, C++, Rust)
2. Use toolchains (e.g., LLVM or Emscripten) to compile the code into a .wasm file
3. Load and parse the .wasm file in JavaScript via the WebAssembly API
4. Create an instance of the WebAssembly module and allocate necessary resources
5. Call functions exported by WebAssembly using JavaScript
6. WebAssembly and JavaScript can interact through memory and import/export interfaces

## Application Example

1. Write functionality logic in C
   
```C
#include <stdint.h>

int add(int a, int b) {
    return a + b;
}
```

2. Compile to WebAssembly
```Shell
emcc add.c -o add.wasm -s WASM=1
```
>[!NOTE]
>What is emcc
>
> emcc is the command-line tool for the Emscripten Compiler Frontend, part of the Emscripten toolchain, used to compile C and C++ code into WebAssembly (.wasm) or JavaScript files (including asm.js).
>
> Emscripten is an open-source LLVM-to-Web compiler toolchain that can translate code written in C/C++ into code that can run in the browser.
>
> gcc is a general-purpose compiler that supports multiple programming languages (C, C++, Fortran, Ada, etc.), mainly used to generate binary files that can run on local platforms.

>[!NOTE]
>emcc Workflow
>
> **1. Compiler Pipeline**
> 
> emcc uses the LLVM toolchain to gradually convert C/C++ source code into WebAssembly:
> - Source code → Intermediate Representation (IR): Use clang to parse C/C++ code and generate LLVM's Intermediate Representation (IR).
> - Intermediate Representation → Bytecode: LLVM's backend translates the Intermediate Representation into WebAssembly bytecode.
> - Bytecode → WebAssembly file: Finally generates the .wasm file and necessary glue code.
>
> **2. Generate Results**
> 
> Running emcc can generate the following output files:
>- .wasm: WebAssembly file containing the compiled binary code.
>- .js: JavaScript glue file used to load WebAssembly and provide auxiliary functions, mainly assisting in loading and running WebAssembly, providing an interaction bridge with browser APIs (e.g., DOM, Canvas).
>- .html: If specific options are used, a complete HTML page for testing can also be generated.

3. Call in JavaScript {#callc}
```JavaScript
// Load and instantiate WebAssembly module
fetch('add.wasm').then(response =>
  response.arrayBuffer()
).then(bytes =>
  WebAssembly.instantiate(bytes)
).then(results => {
  const add = results.instance.exports.add;
  console.log(add(2, 3)); // Output 5
});
```

## Interoperability between JavaScript and WebAssembly

### JavaScript Calls C

By referencing the instantiated object, you can call the exposed methods in the C program, as shown in the [example](#callc).

### C Calls JavaScript

WebAssembly does not directly embed JavaScript functions in C code at compile time. WebAssembly modules and JavaScript interact through the import mechanism.

When C code needs to interact with JavaScript, it usually provides JavaScript functions as interfaces externally (through imports). C code does not directly embed JavaScript function calls but indirectly calls JavaScript through imported functions. For example:

```C
#include <stdio.h>
void call_js_log() {
    printf("Calling JavaScript function...\n");
}
```
```Javascript
// JavaScript-defined function
function jsLog(message) {
    console.log("From JS: " + message);
}

// Import JavaScript function interface during instantiate initialization
fetch('module.wasm')
  .then(response => response.arrayBuffer())
  .then(bytes => WebAssembly.instantiate(bytes, {
    env: {
      jsLog: jsLog  // Import the jsLog function from JavaScript into the WebAssembly module
    }
  }))
  .then(wasmModule => {
    // WebAssembly module instantiated, call functions within it
    wasmModule.instance.exports.call_js_log();  // WebAssembly calls JavaScript function
  });
```

## Interaction with Browser APIs

WebAssembly can be used with other Web APIs in the browser. For example, you can perform efficient image processing or mathematical calculations through WebAssembly and then pass the results back to browser APIs (such as Canvas or WebGL) for rendering.