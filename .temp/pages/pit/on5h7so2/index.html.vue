<template><div><h2 id="背景" tabindex="-1"><a class="header-anchor" href="#背景"><span>背景</span></a></h2>
<p>从2015年起为公司开发的一款报表工具，维护至今一直没有机会重构。所用技术栈也比较陈旧，从最开始的RequireJS+命令行调用打包压缩，到后来2023年左右实在无法忍受和时代割裂太久，引入Webpack工具链，对项目进行了一次工程化升级。</p>
<p>这以后，代码管理和构建有了一定的提升，而且可以在开发中使用比较新的JS规范、编程特性。</p>
<p>但有个严重问题，一直没得到改善：工程庞大以后，JS项目变得异常难以维护，小功能修改常常带出新问题。即使项目的每一行代码出自本人之手，当时间长了，自己也难以快速理清模块之间的、或模块内部的逻辑关系。最突出的便是模块和模块，函数和函数之间调用常常伴随着复杂数据结构的关联。JS的动态特性，导致这些数据结构无需提前定义，或者约束。分散在各处的代码用到这些结构，随时可以扩展修改它。</p>
<p>软件应用开发中，业务功能逻辑实际上和数据结构是紧密相关联的。数据结构难以理清，就导致了代码阅读难度大大提高。</p>
<p>可想而知，10年来累计至今的一块自研敏捷BI报表工具，其庞大的代码量对于日常维护和扩展，会构成怎样的挑战。</p>
<p>迫切需要引入强有力的规范。</p>
<h2 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript"><span>Typescript</span></a></h2>
<p>Typescript作为JS的一个超集，其强类型约束和静态类型检测等特征，很符合解决目前问题的需要。</p>
<h2 id="挑战" tabindex="-1"><a class="header-anchor" href="#挑战"><span>挑战</span></a></h2>
<p>-- 大量的require引用语句需要逐步过渡到import
-- 很多依赖模块过于陈旧，他们并没有提供ts支持</p>
<h2 id="改造历程" tabindex="-1"><a class="header-anchor" href="#改造历程"><span>改造历程</span></a></h2>
<h3 id="安装typescript" tabindex="-1"><a class="header-anchor" href="#安装typescript"><span>安装typescript</span></a></h3>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> install</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --save-dev</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> typescript</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="初始化-tsconfig-json-配置文件" tabindex="-1"><a class="header-anchor" href="#初始化-tsconfig-json-配置文件"><span>初始化 tsconfig.json 配置文件</span></a></h3>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npx</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> tsc</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --init</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="配置-tsconfig-json" tabindex="-1"><a class="header-anchor" href="#配置-tsconfig-json"><span>配置 tsconfig.json</span></a></h3>
</div></template>


