<template><div><h2 id="设计理念" tabindex="-1"><a class="header-anchor" href="#设计理念"><span>设计理念</span></a></h2>
<p><strong><code v-pre>Vue</code></strong></p>
<ul>
<li>渐进式框架，适用小项目，也可通过插件和生态扩展支持复杂应用</li>
<li>有<mark>指令</mark>、<mark>插件</mark>、<mark>模板</mark>、<mark>插槽</mark>、<mark>事件/指令修饰符</mark>等概念</li>
<li>双向数据流</li>
<li>响应式更彻底</li>
<li>组件有清晰的生命周期</li>
<li>使用组合式函数抽象独立于UI的逻辑</li>
</ul>
<p><strong><code v-pre>React</code></strong></p>
<ul>
<li>强调UI是函数的结果，以函数式编程为主</li>
<li>单项数据流</li>
<li>函数式组件里通过内置hook替代实现部分生命周期、类组件有完整的生命周期</li>
<li>自定义hook里抽象独立于UI的逻辑，需关注闭包等JS特性</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>双向数据流</p>
<p>数据从父到子、也能从给子到父直接传。vue3的defineModel进一步简化v-model的使用</p>
</div>
</div></template>


