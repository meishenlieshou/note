---
title: Typescript
createTime: 2025/01/19 17:42:46
permalink: /learn/front/yLLIK/
author: JackSim
tags:
  - Typescript
  - Javascript

description: description
---


## TypeScript 如何进行类型推断

TypeScript 可以根据赋值、函数返回值等上下文自动推断类型。如果没有明确指定类型，TypeScript 会根据赋值、函数参数等来推断类型

## TypeScript 如何进行类型缩小（Type Narrowing）

类型缩小是指在条件语句（如 if、switch）中，TypeScript 会通过类型保护（如 typeof、instanceof、用户自定义的类型保护）来缩小类型的范围

## 解释 TypeScript 泛型的工作原理

泛型允许我们在定义函数、类、接口时，不指定具体的类型，而是使用类型参数来让类型在使用时确定。

## 解释 extends 关键字在泛型中的作用

在泛型中，extends 用于约束泛型参数的类型，指定泛型参数必须是某个类型或其子类型。

## TypeScript 中如何实现“条件类型

条件类型是基于类型的条件进行选择的类型。例如，可以通过 T extends U ? X : Y 语法，表示如果类型 T 是类型 U 的子类型，则返回类型 X，否则返回类型 Y

## 解释 Mapped Types 和 Infer

- **`Mapped Types`**：通过遍历已有类型的所有键来创建新的类型，可以进行属性的修改或添加。
  
- **`Infer`**：在条件类型中，infer 关键字用来推导类型。

```Typescript
// Mapped Types 示例
type Person = {
  name: string;
  age: number;
};

type ReadOnlyPerson = {
  readonly [K in keyof Person]: Person[K];
};

// Infer 示例
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Test = ReturnType<() => string>; // string

```

## 交叉类型（Intersection Types） 和 联合类型（Union Types） 的区别

- **`交叉类型 (&)`**  用来将多个类型合并成一个类型，要求所有类型的属性都必须存在
- **`联合类型 (|)`**  表示一个变量可以是多种类型中的一种，满足其中之一即可

## 解释 声明合并（Declaration Merging） 的概念

声明合并是 TypeScript 的一个特性，允许多个相同名称的类型或接口进行合并，产生一个新的类型或接口。通常出现在接口和模块的扩展中。

```Typescript
interface Person {
  name: string;
}

interface Person {
  age: number;
}

const p: Person = { name: "John", age: 25 }; // 两个接口合并

```

## 泛型约束（Generic Constraints） 和 推断 之间的关系

泛型约束限制了泛型类型的范围，强制泛型参数必须符合某些条件。推断则是让 TypeScript 根据传入的参数自动推导类型。

```Typescript
// 约束泛型类型
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// 推断
let arr = [1, 2, 3]; // 推断为 number[]
let str = "Hello"; // 推断为 string
```

## 什么是装饰器（Decorator）？

装饰器是 TypeScript 中的一种特殊类型的声明，可以附加到类、方法、属性或参数上，修改其行为。装饰器的功能可以通过函数来实现，并且是 TypeScript 提供的元编程机制。

TypeScript 中的装饰器功能是实验性特性，需启用编译选项。

```Typescript
function log(target: any, key: string) {
  let value = target[key];
  
  const getter = () => {
    console.log(`Getting value: ${value}`);
    return value;
  };
  
  const setter = (newValue: any) => {
    console.log(`Setting value: ${newValue}`);
    value = newValue;
  };
  
  Object.defineProperty(target, key, { get: getter, set: setter });
}

class Person {
  @log
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
}

const p = new Person("John");
p.name = "Doe"; // 触发 setter
console.log(p.name); // 触发 getter
```

## 如何定义装饰器

**`分类`**
- 类装饰器 (Class Decorators)
```Typescript

function ClassDecorator(constructor: Function) {
  console.log("Class decorator is called");
  // 返回一个新的构造函数
  return class extends constructor {
    newMethod() {
      console.log("This is a new method added by the decorator");
    }
  };
}

@ClassDecorator
class MyClass {
  constructor() {
    console.log("MyClass constructor");
  }
}

const instance = new MyClass();
instance.newMethod();  // 调用装饰器添加的方法
```

- 方法装饰器 (Method Decorators)
```Typescript
function MethodDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log("Method decorator is called");
  // 修改方法描述符，替换原来的方法实现
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Method ${key} is called with arguments: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor; // 必须返回修改后的描述符
}

class MyClass {
  @MethodDecorator
  greet(name: string) {
    console.log(`Hello, ${name}`);
  }
}
```
- 属性装饰器 (Property Decorators)
```Typescript
function PropertyDecorator(target: any, propertyKey: string) {
  console.log(`Property ${propertyKey} is decorated`);
  // 不需要返回值。因为属性装饰器只能用于类的属性，通常它的任务是将某些元数据添加到类的原型上。属性装饰器不接收 descriptor，因此它没有返回值的修改能力
}

class MyClass {
  @PropertyDecorator
  name: string;
}

const instance = new MyClass();

```

- 参数装饰器 (Parameter Decorators)
```Typescript

function ParameterDecorator(target: any, methodName: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in method ${methodName} is decorated`);
  // 参数装饰器不需要返回值，而是用于添加元数据
}

class MyClass {
  greet(@ParameterDecorator name: string) {
    console.log(`Hello, ${name}`);
  }
}

const instance = new MyClass();
instance.greet("Alice");

```

## 装饰器的执行顺序是什么？

对于同一目标上的多个装饰器，从下到上依次执行。

装饰器执行的顺序如下：
- 参数装饰器
- 方法装饰器
- 属性装饰器
- 类装饰器

## TypeScript 的 tsconfig.json 文件中有哪些常用的配置项？作用是什么

- **`compilerOptions`**: 配置编译选项，包括:

### 基础选项

| 配置项              | 类型      | 默认值      | 说明                                                                                              |
|---------------------|-----------|-------------|---------------------------------------------------------------------------------------------------|
| `target`           | 字符串    | `es3`       | 指定编译的 ECMAScript 目标版本，如 `es5`, `es6` (等价于 `es2015`), `es2020` 等。                     |
| `module`           | 字符串    | `commonjs`  | 指定ts编译后生成何种模块系统的代码，如 `commonjs`, `esnext`, `amd`, `umd`, `system` 等。                                 |
| `lib`              | 字符串[]  | `[]`        | 指定需要包含的库文件，如 `["dom", "es2015", "esnext.asynciterable"]`。                             |
| `allowJs`          | 布尔值    | `false`     | 是否允许编译 `.js` 文件。                                                                          |
| `checkJs`          | 布尔值    | `false`     | 是否对 `.js` 文件启用类型检查，需配合 `allowJs` 使用。                                              |
| `jsx`              | 字符串    | `preserve`  | 指定 JSX 的处理方式：`preserve`, `react`, `react-jsx` (React 17+ 支持)。                           |
| `declaration`      | 布尔值    | `false`     | 是否生成 `.d.ts` 声明文件。                                                                        |
| `declarationMap`   | 布尔值    | `false`     | 是否生成 `.d.ts` 文件的 source map。                                                              |
| `sourceMap`        | 布尔值    | `false`     | 是否生成 `.js.map` 文件。                                                                         |
| `outDir`           | 字符串    | 无          | 指定输出目录，用于存放编译后的文件。                                                               |
| `rootDir`          | 字符串    | 自动推断    | 指定输入文件的根目录，影响输出文件结构。                                                           |
| `removeComments`   | 布尔值    | `false`     | 是否移除注释。                                                                                     |

### 严格检查选项（Strict Checks）

| 配置项                        | 类型      | 默认值   | 说明                                                                                      |
|-------------------------------|-----------|----------|-------------------------------------------------------------------------------------------|
| `strict`                     | 布尔值    | `false`  | 是否启用所有严格模式选项的总开关。                                                        |
| `strictNullChecks`           | 布尔值    | `false`  | 禁止将 `null` 和 `undefined` 分配给其他类型。                                               |
| `strictFunctionTypes`        | 布尔值    | `false`  | 启用函数参数和返回值的严格检查。                                                           |
| `noImplicitAny`              | 布尔值    | `false`  | 禁止隐式的 `any` 类型。                                                                    |
| `noImplicitThis`             | 布尔值    | `false`  | 检查是否有隐式的 `this`。                                                                  |
| `alwaysStrict`               | 布尔值    | `false`  | 在生成的 JavaScript 中始终启用严格模式（`use strict`）。                                     |

### 代码质量控制相关选项

| 配置项               | 类型      | 默认值   | 说明                                                                                      |
|----------------------|-----------|----------|-------------------------------------------------------------------------------------------|
| `noUnusedLocals`    | 布尔值    | `false`  | 是否报错未使用的局部变量。                                                                 |
| `noUnusedParameters` | 布尔值    | `false`  | 是否报错未使用的函数参数。                                                                 |
| `noImplicitReturns`  | 布尔值    | `false`  | 如果函数中的某些分支没有返回值，是否报错。                                                 |
| `forceConsistentCasingInFileNames` | 布尔值 | `true`   | 是否强制文件名大小写一致性。                                                               |

### 高级选项

| 配置项                 | 类型      | 默认值   | 说明                                                                                      |
|------------------------|-----------|----------|-------------------------------------------------------------------------------------------|
| `experimentalDecorators` | 布尔值  | `false`  | 是否启用实验性的装饰器特性。                                                               |
| `emitDecoratorMetadata` | 布尔值   | `false`  | 是否为装饰器生成元数据，常用于依赖注入框架。                                                |
| `esModuleInterop`      | 布尔值    | `false`  | 启用对 CommonJS 和 ES 模块的兼容性支持。                                                   |
| `skipLibCheck`         | 布尔值    | `false`  | 是否跳过声明文件（`.d.ts`）的类型检查。                                                    |



- **`include 和 exclude`**: 指定编译文件的路径或目录。
- **`paths`**: 设置路径别名。