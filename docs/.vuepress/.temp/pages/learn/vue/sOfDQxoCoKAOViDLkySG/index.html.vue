<template><div><h1 id="vue-3-新特性" tabindex="-1"><a class="header-anchor" href="#vue-3-新特性"><span>Vue 3 新特性</span></a></h1>
<h2 id="composition-api" tabindex="-1"><a class="header-anchor" href="#composition-api"><span>Composition API</span></a></h2>
<h3 id="setup-的基本用法" tabindex="-1"><a class="header-anchor" href="#setup-的基本用法"><span>setup() 的基本用法</span></a></h3>
<p>组件创建时初始化数据和逻辑，它会在组件实例创建之前调用，因此无法直接访问 this。</p>
<p>传参</p>
<ul>
<li>props：父组件传入的属性。</li>
<li>context：包含组件的上下文对象。包括emit等方法触发自定义事件</li>
</ul>
<p>可以在setup里定义生命周期钩子，从vue引入钩子函数，然后在setup里调用钩子函数定义声明周期逻辑。同时依然支持vue2版本的用法。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  //vue3版本</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  import</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">onMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      onMounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(()=>{</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">        //Your code</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      });</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    //...</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  //vue2版本</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    mounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(){</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">      //Your code</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">    //..</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="响应式-api" tabindex="-1"><a class="header-anchor" href="#响应式-api"><span>响应式 API</span></a></h3>
<p>基于 Proxy 重构了 Vue 2 中的响应式（Vue 2 使用的是 Object.defineProperty）。</p>
<p>Vue 3 的响应式系统依赖于以下三个主要函数：</p>
<ul>
<li>
<p><strong>reactive</strong>：创建响应式对象。</p>
<ul>
<li>优点： 深度代理，嵌套对象中的属性也会变成响应式。</li>
<li>注意： reactive 返回的是一个 Proxy，而不是原始对象。</li>
</ul>
</li>
<li>
<p><strong>ref</strong>：创建响应式的基本数据类型（原始值，如数字、字符串、布尔值等）。</p>
<ul>
<li>value 属性： 当使用 ref 时，必须通过 .value 访问或修改其值。</li>
<li>与 DOM 绑定： Vue 模板中会自动解包 ref，不需要手动 .value。</li>
</ul>
</li>
<li>
<p><strong>computed</strong>: 创建基于其他响应式数据的动态计算值。</p>
<ul>
<li>缓存： 只有当依赖数据发生变化时，计算属性才会重新计算。</li>
<li>只读： 默认情况下，计算属性是只读的，但可以通过 set 定义可写计算属性。</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>可写计算属性，即computed方法定义时传入一个对象，对象里指定set和get方法。计算属性值被修改时会触发set方法，如果修改了get里依赖的变量，依赖了计算属性的地方会被更新</p>
</div>
</li>
</ul>
<h3 id="computed-和-watch-的用法及实际应用场景" tabindex="-1"><a class="header-anchor" href="#computed-和-watch-的用法及实际应用场景"><span>computed 和 watch 的用法及实际应用场景</span></a></h3>
<p>computed 和 watch 是两个用于处理响应式数据的核心特性，它们都有各自的适用场景和用法。</p>
<ul>
<li>computed 的用法</li>
</ul>
<p>computed 属性用于定义依赖其他数据的计算属性，且具有缓存特性。只有当其依赖的响应式数据发生变化时，computed 属性才会重新计算。用于纯函数计算。</p>
<ul>
<li>watch 的用法</li>
</ul>
<p>watch 用于监听响应式数据的变化，并执行特定的逻辑。它适合处理异步操作、执行副作用或复杂的逻辑。</p>
<table>
<thead>
<tr>
<th>特性</th>
<th><code v-pre>computed</code></th>
<th><code v-pre>watch</code></th>
</tr>
</thead>
<tbody>
<tr>
<td>是否具备缓存</td>
<td>是，依赖数据未变时返回缓存值</td>
<td>否，每次触发都会执行回调</td>
</tr>
<tr>
<td>是否适合处理副作</td>
<td>否，适合用于纯函数计算</td>
<td>是，适合处理异步或副作用逻辑</td>
</tr>
<tr>
<td>适用场景</td>
<td>依赖数据的派生值，需要缓存结果</td>
<td>监听数据变化，执行副作用或复杂逻辑</td>
</tr>
</tbody>
</table>
<h3 id="provider-inject跨层级组件通信" tabindex="-1"><a class="header-anchor" href="#provider-inject跨层级组件通信"><span>Provider/Inject跨层级组件通信</span></a></h3>
<p id="provice-inject">provide 和 inject 是一对用于跨层级组件通信的功能。它们可以在祖先组件中提供数据（通过 provide），并在后代组件中获取数据（通过 inject），即使这些组件之间相隔多层级。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">//祖先组件</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  provide</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    return</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      sharedValue</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Hello from ancestor!</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    };</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">};</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">//后代组件</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">  inject</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> [</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">sharedValue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">],</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  mounted</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">sharedValue</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出: Hello from ancestor!</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">};</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>provide 支持响应式数据。如果提供的值是一个响应式对象，后代组件会自动感知到变化。provide 和 inject 是一种轻量级的状态共享机制，非常适合处理特定上下文数据，而非作为全局状态管理工具的替代品。</p>
<h3 id="lifecycle-hooks" tabindex="-1"><a class="header-anchor" href="#lifecycle-hooks"><span>lifecycle hooks</span></a></h3>
<h3 id="script-setup-语法糖及其优势" tabindex="-1"><a class="header-anchor" href="#script-setup-语法糖及其优势"><span>script setup 语法糖及其优势</span></a></h3>
<p><code v-pre>&lt;script setup&gt;</code> 是一种语法糖，进一步简化了组件的书写方式，同时提升了性能。它结合了组合式 API和setup函数的功能，使代码更简洁、更直观。</p>
<ul>
<li>
<p><strong>更简洁的代码</strong></p>
</li>
<li>
<p><strong>性能更好</strong><br>
<code v-pre>&lt;script setup&gt;</code> 是在编译时进行解析的，而不是运行时。这意味着 Vue 能够更高效地优化组件的初始化和作用域管理。</p>
</li>
<li>
<p><strong>更清晰的作用域</strong><br>
变量和方法在<code v-pre>&lt;script setup&gt;</code>中默认是模板可见的，无需通过 return 暴露。</p>
</li>
<li>
<p><strong>更友好的类型推断支持（TS 集成）</strong><br>
在 <code v-pre>&lt;script setup&gt;</code> 中直接使用 TypeScript，无需额外配置。变量和 props 的类型会自动推断或定义，减少了类型定义的复杂性。</p>
</li>
<li>
<p><strong>支持多种新功能</strong></p>
<ol>
<li>顶层 defineProps 和 defineEmits： 用于定义组件的 props 和 emits，使语法更简单。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">defineProps(</span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> name</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">String</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">);</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">defineEmits(['submit']);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">const handleClick = () => emit('submit');</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>useSlots 和 useAttrs： 直接访问插槽和属性，无需通过 setup 参数。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">import </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> useSlots</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> useAttrs</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> from 'vue';</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">const slots = useSlots();</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">const attrs = useAttrs();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>支持多个<code v-pre>&lt;script&gt;</code>标签</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">// 普通逻辑或导出内容</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export const globalVar = "Hello!";</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">import </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> from 'vue';</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">const count = ref(0);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="更快的性能" tabindex="-1"><a class="header-anchor" href="#更快的性能"><span>更快的性能</span></a></h2>
<h3 id="虚拟-dom" tabindex="-1"><a class="header-anchor" href="#虚拟-dom"><span>虚拟 DOM</span></a></h3>
<ul>
<li>
<p>虚拟 DOM 的更新过程</p>
<ol>
<li><strong>数据变化触发重新渲染</strong> 响应式数据改变时，Vue 会触发组件的渲染函数。</li>
<li><strong>生成新的虚拟DOM</strong>  渲染函数被调用后，生成新的虚拟 DOM。</li>
<li><strong>diff 算法对比</strong>  Vue 会将新旧虚拟 DOM 树进行比较，找出差异（diff）。</li>
<li><strong>真实 DOM 更新</strong>  Vue 将 diff 的结果应用到真实 DOM 中，仅更新必要的部分。</li>
</ol>
</li>
<li>
<p>虚拟 DOM 的优点</p>
<ol>
<li><strong>性能更好</strong></li>
<li><strong>跨平台支持</strong></li>
<li><strong>可预测的更新</strong>  数据驱动的虚拟 DOM 更新逻辑比手动操作 DOM 更可预测</li>
</ol>
</li>
<li>
<p>虚拟 DOM 的局限性</p>
<ol>
<li>构建和比较虚拟DOM，会带来额外的性能开销</li>
</ol>
</li>
</ul>
<h3 id="编译时标记静态节点以减少更新开销" tabindex="-1"><a class="header-anchor" href="#编译时标记静态节点以减少更新开销"><span>编译时标记静态节点以减少更新开销</span></a></h3>
<p>静态节点只在首次渲染时创建，不会在后续更新中重新生成。</p>
<h2 id="更灵活的组件" tabindex="-1"><a class="header-anchor" href="#更灵活的组件"><span>更灵活的组件</span></a></h2>
<h3 id="自定义渲染器-custom-renderer" tabindex="-1"><a class="header-anchor" href="#自定义渲染器-custom-renderer"><span>自定义渲染器（Custom Renderer</span></a></h3>
<p>Vue 3 提供了自定义渲染器功能，使开发者可以将 Vue 的响应式和组件系统应用于非浏览器环境，例如：</p>
<ol>
<li>服务端渲染 (SSR)</li>
<li>原生应用开发（如 Weex、UniApp、Electron）</li>
<li>渲染到 Canvas、WebGL、终端或其他自定义环境。</li>
</ol>
<p>自定义渲染器是 Vue 3 的一种扩展机制，它允许开发者定义自定义的 DOM 操作实现，从而将 Vue 的模板和组件渲染到任意环境中。</p>
<p>Vue 的核心渲染器封装了针对浏览器的 DOM 操作，而自定义渲染器则提供了一套通用接口，可以替换这些默认的操作逻辑。</p>
<ol>
<li><strong>createRenderer</strong></li>
</ol>
<p>createRenderer 是创建自定义渲染器的核心函数。它接收一个 renderer options 对象，该对象定义了在目标平台中如何操作节点。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> createRenderer</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">@vue/runtime-core</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> rendererOptions</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  //实现渲染器选项</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 创建自定义渲染器</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> createApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> createRenderer</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">rendererOptions</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// 创建应用程序</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> App</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  render</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    return</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">rect</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">      props</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> x</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 10</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> y</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 20</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> width</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 100</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> height</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 50</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965"> fill</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">red</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    };</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  },</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> canvasRoot</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">  type</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">canvas</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  //目标终端类型</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">  children</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> []</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">};</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">createApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">App</span><span style="--shiki-light:#999999;--shiki-dark:#666666">).</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">mount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">canvasRoot</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><strong>渲染器选项</strong></li>
</ol>
<p>rendererOptions 是自定义渲染器的关键部分，需用户根据目标环境定义了对应的操作方法。比如</p>
<ul>
<li>createElement： 如何创建元素</li>
<li>insert: 如何插入元素</li>
<li>patchProp: 如何更新设置属性</li>
<li>remove: 如何移除元素</li>
<li>setElementText: 如何设置文本内容</li>
</ul>
<ol start="3">
<li><strong>渲染逻辑</strong></li>
</ol>
<ul>
<li>Vue 的响应式系统会驱动组件更新。</li>
<li>在模板编译时，Vue 会生成对应的渲染函数，返回虚拟 DOM。</li>
<li>自定义渲染器会使用 rendererOptions 将虚拟 DOM 映射到目标平台。</li>
</ul>
<h3 id="fragment-允许组件返回多个根节点。" tabindex="-1"><a class="header-anchor" href="#fragment-允许组件返回多个根节点。"><span>Fragment 允许组件返回多个根节点。</span></a></h3>
<h3 id="teleport-将子组件渲染到-dom-的其他位置。" tabindex="-1"><a class="header-anchor" href="#teleport-将子组件渲染到-dom-的其他位置。"><span>Teleport 将子组件渲染到 DOM 的其他位置。</span></a></h3>
<p>Teleport 通过指定目标 DOM 节点（to 属性），将其子组件内容移动到目标位置。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> @click="showModal</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> =</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> true">Open</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> Modal&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;Teleport</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> to</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">body</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-if</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">showModal</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> class</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">modal</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">This is a modal rendered in the body element.</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">p</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> @click="showModal</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> =</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> false">Close&#x3C;/button></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">      &#x3C;/div></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;/Teleport></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">  &#x3C;/div></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">&#x3C;/template></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>to 的值可以动态改变，以便将内容移动到不同的目标。</p>
<h3 id="suspense-处理异步组件加载" tabindex="-1"><a class="header-anchor" href="#suspense-处理异步组件加载"><span>Suspense 处理异步组件加载</span></a></h3>
<p>Suspense 是 Vue 3 提供的一个新组件，用于优雅地处理异步组件加载或异步操作。它允许在异步任务完成前显示一个占位内容，并在任务完成后切换到真实内容。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">Suspense</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    &#x3C;!-- 异步内容 --></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> #default></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">      &#x3C;AsyncComponent</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> /></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    &#x3C;!-- 占位内容 --></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> #fallback></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">      &#x3C;p>Loading...&#x3C;/p></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    &#x3C;/template></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">  &#x3C;/Suspense></span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">&#x3C;/template></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>核心概念</strong></p>
<ol>
<li>
<p>占位内容</p>
<p>使用 #fallback 插槽提供异步加载期间的占位内容。常用于加载指示器（如“加载中”或进度条）。</p>
</li>
<li>
<p>默认内容</p>
<p>使用 #default 插槽定义实际要渲染的异步内容。异步内容可以是异步组件或包含异步逻辑的普通组件。</p>
</li>
<li>
<p>异步逻辑支持</p>
<p>Suspense 的核心能力来自于其对异步组件或异步 setup 函数的支持。</p>
</li>
</ol>
<p><strong>Suspense 的生命周期</strong></p>
<ol>
<li>onPending：当异步内容开始加载时触发。</li>
<li>onResolve：当所有异步任务完成时触发</li>
</ol>
<h2 id="其他改进" tabindex="-1"><a class="header-anchor" href="#其他改进"><span>其他改进</span></a></h2>
<h3 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking"><span>Tree-shaking</span></a></h3>
<p>Tree-shaking 是现代 JavaScript 打包工具（如 Webpack、Rollup、Vite 等）使用的一种优化技术，用于移除未使用的代码，从而减小打包后的文件体积，提升应用性能。</p>
<p><strong>基本原理</strong></p>
<p>Tree-shaking 的核心基于以下两点：</p>
<ul>
<li>ES Module 静态结构</li>
</ul>
<p>import 和 export 是 ES Module 的关键特性，具有静态分析能力。打包工具在构建时可以确定哪些模块被使用了，哪些模块没有被使用</p>
<p><strong>启用</strong></p>
<ol>
<li>使用 ES Module规范编写代码</li>
<li>配置打包工具</li>
</ol>
<ul>
<li>Webpack: 确保 mode 设置为 production，Tree-shaking 会自动启用。</li>
<li>Rollup:  天然支持 Tree-shaking，默认会移除未使用的代码。</li>
<li>Vite: 基于 Rollup，默认支持 Tree-shaking，无需额外配置。</li>
</ul>
<p><strong>注意事项和限制</strong></p>
<ol>
<li>
<p>副作用声明</p>
<p>如果模块具有副作用（如修改全局变量），需要在 package.json 中使用 sideEffects 配置告知打包工具哪些文件不能移除。</p>
</li>
<li>
<p>动态导入</p>
<p>Tree-shaking 对动态导入支持有限。</p>
</li>
<li>
<p>第三方库</p>
<p>一些老旧的第三方库未使用 ES Module 或未正确声明 sideEffects，可能阻碍 Tree-shaking。</p>
</li>
<li>
<p>作用范围</p>
<p>Tree-shaking 不会对整个项目的所有代码进行全局优化，而是基于模块范围进行分析。</p>
</li>
</ol>
<h3 id="emits-选项用于定义事件" tabindex="-1"><a class="header-anchor" href="#emits-选项用于定义事件"><span>emits 选项用于定义事件</span></a></h3>
<p>即setup模式里的defineEmits方法，用来定义事件。实际上，通过传参回调也能起到定义事件的作用，二者的差异在于：</p>
<ul>
<li><strong>语义明确性</strong>：defineEmits 在定义事件时，语义上更明确，表明该组件会触发某些事件。这让组件的行为更加清晰，且与 Vue 的事件系统高度集成。</li>
<li><strong>灵活性</strong>：通过传参回调的方式可以更加灵活，因为父组件和子组件的通信不依赖于 Vue 的事件机制，父组件直接控制回调函数的传递和执行顺序。然而，这样的方式可能会失去一些事件的可追溯性和结构化，尤其是在较为复杂的组件树中。</li>
<li><strong>用途</strong>：defineEmits 适合在组件之间通过标准的事件通信（例如：点击、提交、更新数据等）。而通过回调的方式更多用于父组件直接控制子组件的行为（例如：父组件控制子组件某些方法的执行时机）。</li>
</ul>
<h3 id="全新的-v-model-语法-支持多个绑定。" tabindex="-1"><a class="header-anchor" href="#全新的-v-model-语法-支持多个绑定。"><span>全新的 v-model 语法，支持多个绑定。</span></a></h3>
<h3 id="typescript-的更好支持。" tabindex="-1"><a class="header-anchor" href="#typescript-的更好支持。"><span>Typescript 的更好支持。</span></a></h3>
<h1 id="响应式系统" tabindex="-1"><a class="header-anchor" href="#响应式系统"><span>响应式系统</span></a></h1>
<h2 id="响应式原理" tabindex="-1"><a class="header-anchor" href="#响应式原理"><span>响应式原理</span></a></h2>
<p>Vue 3 的响应式原理是基于 Proxy 和 getter/setter 的机制，它通过拦截对象的访问与修改操作来实现数据的响应式更新。</p>
<div class="hint-container important">
<p class="hint-container-title">重要</p>
<p><strong>主要原理概述</strong></p>
<ul>
<li>Proxy：Vue 3 使用了 JavaScript 的 Proxy 对象来实现响应式数据的拦截。通过 Proxy，我们可以监听对象的读写操作，以及对象的其他行为（如删除属性等）。</li>
<li>依赖收集：当组件渲染时，Vue 会在访问响应式对象的属性时记录下这些属性的依赖（即哪些地方依赖这些数据）。当数据发生变化时，Vue 会触发依赖的更新，从而实现视图的自动更新。</li>
<li>懒代理：Vue 3 的响应式系统采用懒代理的策略，只有在某个属性被访问时，才会触发代理的操作。这样可以提高性能，避免不必要的代理操作。</li>
</ul>
</div>
<p><strong>Proxy 的工作机制</strong></p>
<p>Proxy 是一种 ES6 新增的对象机制，它允许我们定义自定义的行为来拦截和修改对对象的操作。Proxy 的构造函数接受两个参数：目标对象和处理器对象（handler）。</p>
<p><strong>与Proxy配合使用的Reflect</strong></p>
<p>简而言之，Proxy用于拦截对象的操作行为，在Proxy函数的第二个参数里定义如何拦截。当需要执行操作的默认行为时，就需要用到Reflect反射。</p>
<p>反射提供一系列静态方法，这些方法和原生操作方法一一对应。需要在拦截操作里执行原生操作时，调用相应的反射静态方法并返回即可。</p>
<p><strong>为什么 Vue 3 使用 Proxy 而不是 Object.defineProperty</strong></p>
<p>Vue 2 使用的是 Object.defineProperty 来实现响应式，然而这个方法有一些缺点：</p>
<ul>
<li>不能对新增/删除的属性进行监听：Object.defineProperty 只能监听对象已有的属性，而无法监听新增的属性。</li>
<li>性能问题：Vue 2 需要为每个属性都定义 getter 和 setter，这会导致性能问题。</li>
</ul>
<p>Vue 3 通过使用 Proxy 解决了这些问题：</p>
<ul>
<li>支持新增/删除属性：Proxy 可以拦截任何操作，包括属性的添加和删除。</li>
<li>性能优化：Proxy 的实现更加灵活且高效，性能优于 Object.defineProperty。</li>
</ul>
<h2 id="ref-和-reactive" tabindex="-1"><a class="header-anchor" href="#ref-和-reactive"><span>ref 和 reactive</span></a></h2>
<h3 id="ref-用于简单值-reactive-用于复杂对象。" tabindex="-1"><a class="header-anchor" href="#ref-用于简单值-reactive-用于复杂对象。"><span>ref 用于简单值，reactive 用于复杂对象。</span></a></h3>
<h3 id="torefs-和-toref-的作用与场景。" tabindex="-1"><a class="header-anchor" href="#torefs-和-toref-的作用与场景。"><span>toRefs 和 toRef 的作用与场景。</span></a></h3>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>toRefs 是一个用于将一个响应式对象的属性转换为响应式引用的函数。它可以把对象的每个属性变成独立的 ref，使得在解构对象时依然保持响应式。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> reactive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> toRefs</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> state</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> reactive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">   count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">   name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Alice</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 使用 toRefs 将响应式对象的属性转换为响应式引用</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> const</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> toRefs</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">state</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 可以像使用 ref 一样访问 count 和 name</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 更新 count</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 输出：1</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">   // 输出：Alice</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>toRefs 将 state 对象的每个属性（count 和 name）都转换为一个独立的 ref。</li>
<li>这样，你在解构 state 对象时，count 和 name 仍然保持响应式。</li>
</ul>
</div>
<p><strong>为什么使用 toRefs？</strong></p>
<p>当你传递响应式对象到组件或外部函数时，解构对象会破坏对象的响应性。使用 toRefs 可以保持每个属性的响应性。</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>toRef 是一个用于将响应式对象的单个属性转换为响应式引用的函数。它创建一个新的 ref，这个 ref 引用的是响应式对象的指定属性，并且保持响应式。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> reactive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> toRef</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> state</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> reactive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">({</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">   count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">   name</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Alice</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 使用 toRef 将 state 中的某个属性转换为响应式引用</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> countRef</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> toRef</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">state</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">count</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 可以像使用 ref 一样访问 countRef</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> countRef</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 更新 count</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">countRef</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">value</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  // 输出：1</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>toRef(state, 'count') 将 state 中的 count 属性转换为一个独立的响应式 ref，保持了它的响应性。</li>
</ul>
</div>
<p><strong>为什么使用 toRef？</strong></p>
<p>toRef 适用于当你只需要访问或修改对象中的某个属性，而不需要转换整个对象时。</p>
<h3 id="readonly-与-shallowreactive-的作用。" tabindex="-1"><a class="header-anchor" href="#readonly-与-shallowreactive-的作用。"><span>readonly 与 shallowReactive 的作用。</span></a></h3>
<ol>
<li>
<p>readonly 的作用
readonly 用于创建一个只读的响应式对象，它使得对象的所有属性都变为只读，无法修改。这对于在不希望某些数据被修改时非常有用，比如传递到子组件时，确保数据不被意外改变。</p>
</li>
<li>
<p>shallowReactive 的作用
shallowReactive 用于创建一个浅响应式对象，它与 reactive 类似，但只会使对象的顶层属性变为响应式，而不会递归地将对象的嵌套属性变成响应式。这意味着，如果对象包含嵌套的子对象，嵌套对象本身不会变为响应式，只有对象的直接属性会变成响应式。</p>
</li>
</ol>
<h2 id="watcheffect-与普通-watch-的区别" tabindex="-1"><a class="header-anchor" href="#watcheffect-与普通-watch-的区别"><span>watchEffect 与普通 watch 的区别</span></a></h2>
<p>watchEffect 和 watch 都是用于响应式数据的副作用管理，它们都能够监听和响应响应式数据的变化。</p>
<ol>
<li><strong>watchEffect</strong></li>
</ol>
<p>watchEffect 是 Vue 3 提供的一个 API，它会立即运行，并且自动追踪响应式数据的变化。它的主要特点是能够自动地“依赖收集”并执行副作用。也就是说，watchEffect 不需要明确指定要监听的响应式数据，而是自动地追踪其内部的所有响应式数据。</p>
<ol start="2">
<li><strong>watch 的特点</strong></li>
</ol>
<p>允许你手动指定需要监听的响应式数据。当指定的响应式数据发生变化时，watch 会执行回调函数。与 watchEffect 不同，watch 需要显式指定监听的数据，并且你可以通过回调函数获取到新值和旧值。</p>
<h1 id="组件通信" tabindex="-1"><a class="header-anchor" href="#组件通信"><span>组件通信</span></a></h1>
<h2 id="组件通信常见方式" tabindex="-1"><a class="header-anchor" href="#组件通信常见方式"><span>组件通信常见方式</span></a></h2>
<h3 id="父子组件-props-和-emit" tabindex="-1"><a class="header-anchor" href="#父子组件-props-和-emit"><span>父子组件：props 和 emit</span></a></h3>
<h3 id="兄弟组件-事件总线" tabindex="-1"><a class="header-anchor" href="#兄弟组件-事件总线"><span>兄弟组件：事件总线</span></a></h3>
<p>事件总线，即消息的订阅发布模式概念</p>
<h3 id="跨层级组件-provide-和-inject" tabindex="-1"><a class="header-anchor" href="#跨层级组件-provide-和-inject"><span>跨层级组件：provide 和 inject</span></a></h3>
<p>参考<a href="#provice-inject">示例</a></p>
<h2 id="自定义修饰符" tabindex="-1"><a class="header-anchor" href="#自定义修饰符"><span>自定义修饰符</span></a></h2>
<p>vue3 允许你为事件监听器或指令添加自定义修饰符。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> v-on:keyup.enter="handleEnter"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> placeholder</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Press Enter</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  methods</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    handleEnter</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">      console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Enter key was pressed</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，.enter 是 Vue 3 内置的事件修饰符，它表示仅当 keyup 事件的 key 为 'Enter' 时才触发 handleEnter 方法。</p>
<p>假设你想要监听某个自定义事件，比如仅在某个特定的 input 元素按下某个键时触发事件，你可以定义一个自定义事件修饰符来实现这一点。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> v-on:keyup.shift="handleShiftKey"</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> placeholder</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Press Shift key</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  methods</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    handleShiftKey</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">      console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Shift key was pressed</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们使用了 .shift 来作为一个自定义修饰符。这个修饰符会监听 keyup 事件，并且只有在按下 Shift 键时才会触发事件。</p>
<p>除了事件修饰符，Vue 还允许为自定义指令添加修饰符。</p>
<p>例如</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">// main.js 或 app.js</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> createApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> App</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">./App.vue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">const</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> app</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> createApp</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">App</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">app</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">directive</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">focus</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  beforeMount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> binding</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">    if</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">binding</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">modifiers</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">autofocus</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">      el</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">focus</span><span style="--shiki-light:#999999;--shiki-dark:#666666">();</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">app</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">mount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">#app</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">  &#x3C;!-- 只有当 autofocus 修饰符存在时，元素才会自动聚焦 --></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> v-focus.autofocus</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> placeholder</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">This will auto-focus on load</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>v-focus 是自定义的指令名称。</li>
<li>autofocus 是自定义修饰符，表示只有当这个修饰符存在时，元素才会在挂载时自动聚焦。</li>
<li>在 beforeMount 钩子中，我们检查是否有 autofocus 修饰符，如果有就执行 el.focus() 来使元素获得焦点。</li>
</ul>
<h3 id="全局状态管理-vuex、pinia" tabindex="-1"><a class="header-anchor" href="#全局状态管理-vuex、pinia"><span>全局状态管理：Vuex、Pinia</span></a></h3>
<p>更多Pinia介绍，参考<a href="#pinia-part">这里</a></p>
<h1 id="生命周期钩子" tabindex="-1"><a class="header-anchor" href="#生命周期钩子"><span>生命周期钩子</span></a></h1>
<h2 id="选项式-api-options-api-生命周期钩子" tabindex="-1"><a class="header-anchor" href="#选项式-api-options-api-生命周期钩子"><span>选项式 API（Options API）生命周期钩子</span></a></h2>
<p><strong>beforeCreate</strong>  实例创建之前，数据和事件等还没有初始化，这个阶段不能访问到 data 和 props</p>
<p><strong>created</strong> 组件实例已创建，数据和事件已设置</p>
<p><strong>beforeMount</strong>  组件将要挂载到 DOM 上，但还没有完成渲染。此时 template 已被解析</p>
<p><strong>mounted</strong> 组件挂载完成，DOM 已经生成。此时可以执行与 DOM 交互的操作</p>
<p><strong>beforeUpdate</strong> 组件的数据已发生变化，但视图还没有更新</p>
<p><strong>updated</strong> 组件的数据已变化，视图已更新</p>
<p><strong>activated</strong> 组件被激活（例如使用 keep-alive 包裹的组件）。这个钩子仅适用于通过 keep-alive 缓存的组件</p>
<p><strong>deactivated</strong> 组件被停用（keep-alive 中的缓存组件会触发此钩子）。用于处理缓存组件的清理</p>
<p><strong>beforeUnmount</strong> 组件实例将要销毁，但 DOM 还未移除</p>
<p><strong>unmounted</strong> 组件实例已销毁，DOM 被移除。用于执行清理操作</p>
<p><strong>errorCaptured</strong> 捕获子组件的错误并处理。这个钩子会在子组件发生错误时被触发，可以捕获并处理错误，防止它们传播到父组件。</p>
<h2 id="组合式api生命周期钩子" tabindex="-1"><a class="header-anchor" href="#组合式api生命周期钩子"><span>组合式API生命周期钩子</span></a></h2>
<ul>
<li>在 setup 函数中使用生命周期钩子，而这些钩子是通过 on 前缀来调用的。钩子函数和选项式API基本一致。</li>
<li>created 钩子 和 beforeCreate 钩子 不再存在于 Vue 3 的组合式 API 中。相应的逻辑可以放入 setup 函数中来处理。</li>
</ul>
<h1 id="模板语法" tabindex="-1"><a class="header-anchor" href="#模板语法"><span>模板语法</span></a></h1>
<h2 id="v-bind-的基本语法" tabindex="-1"><a class="header-anchor" href="#v-bind-的基本语法"><span>v-bind 的基本语法</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">img</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-bind</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">src</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">imageSrc</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> /></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-bind</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">objectProps</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">>&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>objectProps 是一个对象，它的键值对会被动态绑定到 div 的属性上。</p>
<h2 id="新增-v-bind-的动态参数-key" tabindex="-1"><a class="header-anchor" href="#新增-v-bind-的动态参数-key"><span>新增 v-bind 的动态参数 [key]</span></a></h2>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-bind</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">[buttonProps]</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">Click me</span><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">div</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    return </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      buttonProps</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">        [</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076">this</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">dynamicKey</span><span style="--shiki-light:#999999;--shiki-dark:#666666">]</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Click me!</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">      },</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      dynamicKey</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">title</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，v-bind=&quot;[buttonProps]&quot; 会把 buttonProps 对象中的所有键值对动态绑定到按钮上，且键（title）是动态的。</p>
<h2 id="支持多个-v-model-绑定" tabindex="-1"><a class="header-anchor" href="#支持多个-v-model-绑定"><span>支持多个 v-model 绑定</span></a></h2>
<h3 id="单一绑定示例" tabindex="-1"><a class="header-anchor" href="#单一绑定示例"><span>单一绑定示例</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">inputValue</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> /></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  data</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    return </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">      inputValue</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> ''</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，input 的值会与 inputValue 进行双向绑定。</p>
<h3 id="多个绑定示例" tabindex="-1"><a class="header-anchor" href="#多个绑定示例"><span>多个绑定示例</span></a></h3>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">custom-input</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">title</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">title</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    v-model</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">content</span><span style="--shiki-light:#999999;--shiki-dark:#666666">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">content</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  /></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">import </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> from 'vue';</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">import CustomInput from './CustomInput.vue';</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  components</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    CustomInput</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  },</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  setup</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">title</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">Hello</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    const </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">content</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> ref</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">This is some content.</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">    return </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> title</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> content</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义组件中的实现" tabindex="-1"><a class="header-anchor" href="#自定义组件中的实现"><span>自定义组件中的实现</span></a></h3>
<p>在自定义组件中，v-model 会根据绑定的 prop 和事件来进行双向绑定。通过为每个 prop 使用 v-model:propName，你可以在组件内部明确地处理这些不同的值。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">input</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    :value="title"</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    @input="$emit('update:title',</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> $event)"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  /></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">textarea</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    :value="content"</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic">    @input="$emit('update:content',</span><span style="--shiki-light:#B31D28;--shiki-light-font-style:italic;--shiki-dark:#FDAEB7;--shiki-dark-font-style:italic"> $event)"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  /></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">template</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">export default </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">  props</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    title</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> String</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">    content</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> String</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">;</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">&#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">script</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<ul>
<li>多个 v-model：Vue 3 允许同一个组件有多个 v-model 绑定。通过自定义的 modelValue 和事件名称，你可以在一个组件中处理多个双向绑定的数据。</li>
<li>语法：在父组件中，使用 v-model:propName 来绑定每个属性。</li>
<li>自定义事件：在子组件中，使用 update:propName 来触发更新事件，进行双向绑定。</li>
</ul>
<h1 id="vue-router-4" tabindex="-1"><a class="header-anchor" href="#vue-router-4"><span>Vue Router 4</span></a></h1>
<h1 id="状态管理" tabindex="-1"><a class="header-anchor" href="#状态管理"><span>状态管理</span></a></h1>
<h2 id="pinia" tabindex="-1"><a class="header-anchor" href="#pinia"><span>Pinia</span></a></h2>
<p id="pinia-part"></p>
<h1 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h1>
<h1 id="常见问题场景" tabindex="-1"><a class="header-anchor" href="#常见问题场景"><span>常见问题场景</span></a></h1>
<h2 id="如何在-vue-3-中处理异步任务" tabindex="-1"><a class="header-anchor" href="#如何在-vue-3-中处理异步任务"><span>如何在 Vue 3 中处理异步任务？</span></a></h2>
<h2 id="composition-api-和-options-api-的比较与选择。" tabindex="-1"><a class="header-anchor" href="#composition-api-和-options-api-的比较与选择。"><span>Composition API 和 Options API 的比较与选择。</span></a></h2>
<h2 id="为什么推荐使用-script-setup" tabindex="-1"><a class="header-anchor" href="#为什么推荐使用-script-setup"><span>为什么推荐使用 script setup？</span></a></h2>
<h2 id="vue-3-项目中如何处理性能瓶颈" tabindex="-1"><a class="header-anchor" href="#vue-3-项目中如何处理性能瓶颈"><span>Vue 3 项目中如何处理性能瓶颈？</span></a></h2>
<h2 id="vue-3-的-tree-shaking-是如何工作的" tabindex="-1"><a class="header-anchor" href="#vue-3-的-tree-shaking-是如何工作的"><span>Vue 3 的 Tree-shaking 是如何工作的？</span></a></h2>
</div></template>


