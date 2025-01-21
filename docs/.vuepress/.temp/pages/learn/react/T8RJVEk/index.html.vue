<template><div><h2 id="react-的-fiber-架构是什么-解决了哪些问题" tabindex="-1"><a class="header-anchor" href="#react-的-fiber-架构是什么-解决了哪些问题"><span>React 的 Fiber 架构是什么？解决了哪些问题？</span></a></h2>
<ul>
<li>React 组件的工作单元</li>
<li>Fiber 架构将渲染过程分解为多个小任务单元，这样可以在任务中断后恢复，避免主线程长时间被阻塞</li>
<li>Fiber 可以区分优先级</li>
</ul>
<p>Fiber 的渲染过程分为两个阶段:</p>
<ul>
<li>Render 阶段，计算虚拟 DOM 树，可以被中断</li>
<li>Commit阶段，将更新应用到真是DOM</li>
</ul>
<h2 id="react-中的生命周期方法有哪些-在函数组件中如何模拟这些生命周期" tabindex="-1"><a class="header-anchor" href="#react-中的生命周期方法有哪些-在函数组件中如何模拟这些生命周期"><span>React 中的生命周期方法有哪些？在函数组件中如何模拟这些生命周期？</span></a></h2>
<p><strong>挂载阶段</strong></p>
<ul>
<li><mark>constructor()</mark></li>
<li><mark>static getDerivedStateFromProps(props, state)</mark></li>
<li><mark>render()</mark></li>
<li><mark>componentDidMount()</mark></li>
</ul>
<p><strong>更新阶段</strong></p>
<ul>
<li><mark>static getDerivedStateFromProps(props, state)</mark></li>
<li><mark>shouldComponentUpdate(nextProps, nextState)</mark></li>
<li><mark>render()</mark></li>
<li><mark>getSnapshotBeforeUpdate(prevProps, prevState)</mark></li>
<li><mark>getSnapshotBeforeUpdate(prevProps, prevState)</mark></li>
</ul>
<p><strong>卸载阶段</strong></p>
<ul>
<li><mark>componentWillUnmount()</mark></li>
</ul>
<p><strong>错误处理</strong></p>
<ul>
<li><mark>static getDerivedStateFromError(error)</mark></li>
<li><mark>componentDidCatch(error, info)</mark></li>
</ul>
<p>函数组件里，通过useEffect模拟各个阶段的事件</p>
<h2 id="什么是-react-的合成事件-它与原生事件的区别是什么" tabindex="-1"><a class="header-anchor" href="#什么是-react-的合成事件-它与原生事件的区别是什么"><span>什么是 React 的合成事件？它与原生事件的区别是什么？</span></a></h2>
<p>React 对浏览器的原生事件的封装。屏蔽跨平台差异、优化性能。</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>优化性能主要是指</p>
<ul>
<li>使用事件池重复利用事件</li>
<li>事件委托到根节点</li>
<li>事件回收会清空相关事件属性值，因此异步访问事件属性需要手动存储属性值</li>
</ul>
</div>
<h2 id="react-如何处理状态更新的异步性" tabindex="-1"><a class="header-anchor" href="#react-如何处理状态更新的异步性"><span>React 如何处理状态更新的异步性？</span></a></h2>
<p><strong>目的</strong>：</p>
<ol>
<li>优化性能</li>
<li>保持批量状态更新时UI的一致性</li>
<li>适配并发，区分更新优先级</li>
</ol>
<p><strong>异步性表现</strong>:</p>
<ol>
<li>批量更新</li>
<li>更新state后不是立即生效</li>
</ol>
<p>由于 setState 是异步的，直接读取 state 可能会得到旧值。如果需要基于最新状态进行更新，可以使用 函数式更新。</p>
<div class="language-javascript line-numbers-mode" data-ext="javascript" data-title="javascript"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">import</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> React</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> useState</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> from</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> '</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">react</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">'</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">function</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> App</span><span style="--shiki-light:#999999;--shiki-dark:#666666">()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> [</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> setCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">]</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> useState</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91">0</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676">  const</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> handleClick</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> ()</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#999999;--shiki-dark:#666666"> {</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">prevCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> prevCount</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> +</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">    setCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">((</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">prevCount</span><span style="--shiki-light:#999999;--shiki-dark:#666666">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> =></span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> prevCount</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> +</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91"> 1</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">    console</span><span style="--shiki-light:#999999;--shiki-dark:#666666">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665">log</span><span style="--shiki-light:#999999;--shiki-dark:#666666">(</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">);</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD"> // 输出旧值，但最终 count 增加 2</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">  return</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> (</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> onClick</span><span style="--shiki-light:#999999;--shiki-dark:#666666">={</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">handleClick</span><span style="--shiki-light:#999999;--shiki-dark:#666666">}></span></span>
<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">      Count: </span><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A">count</span><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">    &#x3C;/</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">button</span><span style="--shiki-light:#999999;--shiki-dark:#666666">></span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  );</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375">export</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> default</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A"> App</span><span style="--shiki-light:#999999;--shiki-dark:#666666">;</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义-hook-的最佳实践是什么-如何避免逻辑复杂性" tabindex="-1"><a class="header-anchor" href="#自定义-hook-的最佳实践是什么-如何避免逻辑复杂性"><span>自定义 Hook 的最佳实践是什么？如何避免逻辑复杂性？</span></a></h2>
<ol>
<li>命名以 use 开头</li>
<li>每个自定义 Hook 应完成一个明确的任务，避免将多种逻辑混合在一个 Hook 中</li>
<li>自定义 Hook 的返回值应清晰且易用</li>
<li>推荐使用对象返回，便于解构和扩展</li>
<li>自定义 Hook 应尽量通过参数接收所需数据，而不是直接依赖组件外部状态</li>
<li>使用 useEffect 时，明确依赖项，避免不必要的重新执行</li>
</ol>
<h2 id="react-context-api-的原理是什么-如何避免-context-的性能问题" tabindex="-1"><a class="header-anchor" href="#react-context-api-的原理是什么-如何避免-context-的性能问题"><span>React Context API 的原理是什么？如何避免 Context 的性能问题？</span></a></h2>
<p>使用请<RouteLink to="/learn/react/i8Lyjuid/#context">参考</RouteLink></p>
<p>Context 的性能问题，主要是Provider 的 value 发生变化时，无论 Consumer 是否实际使用了更新的数据，都会重新渲染。</p>
<p>优化手段jj</p>
<ol>
<li>引用类型数据或函数，使用useMemo、useCallback缓存</li>
<li>拆分Context</li>
<li>局部共享的状态，优先考虑useState、useReducer</li>
<li>多个context嵌套时，考虑聚合成一个</li>
<li>使用 useContextSelector 实现 Selector 模式</li>
</ol>
</div></template>


