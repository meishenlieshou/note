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

TypeScript 可以根据赋值、函数返回值等上下文自动推断类型，如果没有明确指定类型，TypeScript 会根据赋值、函数参数等来推断类型

## TypeScript 如何进行类型缩小（Type Narrowing）

类型缩小是指在条件语句（如 if、switch）中，TypeScript 会通过类型保护（如 typeof、instanceof、用户自定义的类型保护）来缩小类型的范围

## 解释 TypeScript 泛型的工作原理，并给出一个例子

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
- 方法装饰器 (Method Decorators)
- 属性装饰器 (Property Decorators)
- 参数装饰器 (Parameter Decorators)

**`装饰器的原理`**
- 装饰器本质上是一个函数，它会在被装饰的元素 定义时 执行，而非使用时
- 它允许对类、方法、属性或参数进行动态修改或增强




## 装饰器的执行顺序是什么？

装饰器的执行顺序通常是自上而下的，先声明的装饰器先执行，并且对于类、方法、属性、参数等装饰器，执行顺序可能会有所不同。