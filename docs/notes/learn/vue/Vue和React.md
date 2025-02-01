---
title: Vue和React
createTime: 2025/01/20 23:44:47
permalink: /learn/vue/ntEtxkQK98c/
author: JackSim
tags:
  - React
  - Vue
  - 差异

description: 
---

## 设计理念

**`Vue`**
- 渐进式框架，适用小项目，也可通过插件和生态扩展支持复杂应用
- 有==指令==、==插件==、==模板==、==插槽==、==事件/指令修饰符==等概念
- 双向数据流
- 响应式更彻底
- 组件有清晰的生命周期
- 使用组合式函数抽象独立于UI的逻辑 

**`React`**
- 强调UI是函数的结果，以函数式编程为主
- 单项数据流
- 函数式组件里通过内置hook替代实现部分生命周期、类组件有完整的生命周期
- 自定义hook里抽象独立于UI的逻辑，需关注闭包等JS特性


>[!NOTE]
>双向数据流
>
>数据从父到子、也能从给子到父直接传。vue3的defineModel进一步简化v-model的使用