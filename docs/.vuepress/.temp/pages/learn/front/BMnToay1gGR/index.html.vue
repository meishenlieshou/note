<template><div><h2 id="关于monorepo" tabindex="-1"><a class="header-anchor" href="#关于monorepo"><span>关于Monorepo</span></a></h2>
<p>Monorepo（Monolithic Repository，单体代码仓库）是一种代码管理模式，它将多个项目的代码存储在同一个版本控制仓库中，而不是使用多个独立的仓库（即 Polyrepo）。Monorepo 常用于大型项目或多个相关子项目的开发。</p>
<p>典型应用场景包括：微前端架构、微服务架构等。</p>
<h2 id="典型的monorepo项目结构" tabindex="-1"><a class="header-anchor" href="#典型的monorepo项目结构"><span>典型的Monorepo项目结构</span></a></h2>
<p>my-monorepo/
├── package.json  # 顶层依赖和脚本
├── packages/
│   ├── package-a/  # 子项目 A
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   ├── package-b/  # 子项目 B
│   │   ├── package.json
│   │   ├── src/
│   │   └── tests/
│   └── shared/     # 共享模块
│       ├── package.json
│       └── src/
└── lerna.json      # Lerna 配置（如使用）</p>
<p>lerna.json文件</p>
<div class="language-json line-numbers-mode" data-ext="json" data-title="json"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">  "</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">packages</span><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#999999;--shiki-dark:#666666"> [</span></span>
<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">    "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">packages/*</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">  ],</span></span>
<span class="line"><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">  "</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">version</span><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">independent</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">  "</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">npmClient</span><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77"> "</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">yarn</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">,</span></span>
<span class="line"><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">  "</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">useWorkspace</span><span style="--shiki-light:#99841877;--shiki-dark:#B8A96577">"</span><span style="--shiki-light:#999999;--shiki-dark:#666666">:</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> true</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="协同工作的图解" tabindex="-1"><a class="header-anchor" href="#协同工作的图解"><span>协同工作的图解</span></a></h2>
<p>Root (workspace root)
├── package.json
├── lerna.json
├── yarn.lock
├── node_modules/       &lt;-- 根目录的依赖
└── packages/
├── package-a/
│   ├── package.json
│   └── node_modules/ &lt;-- 本地无依赖（链接到根目录）
├── package-b/
│   ├── package.json
│   └── node_modules/ &lt;-- 链接到根目录
└── shared/
├── package.json
└── node_modules/ &lt;-- 链接到根目录</p>
<h2 id="它的优点和缺点是什么" tabindex="-1"><a class="header-anchor" href="#它的优点和缺点是什么"><span>它的优点和缺点是什么？</span></a></h2>
<ul>
<li>优点：统一管理、代码复用、简化协作。</li>
<li>缺点：工具复杂性增加、大型仓库的性能问题。</li>
</ul>
<h2 id="monorepo-和-polyrepo-的区别是什么" tabindex="-1"><a class="header-anchor" href="#monorepo-和-polyrepo-的区别是什么"><span>Monorepo 和 Polyrepo 的区别是什么</span></a></h2>
<ul>
<li>Monorepo：一个仓库管理多个项目，统一版本控制。</li>
<li>Polyrepo：每个项目有独立的仓库，项目间协作更松散。</li>
</ul>
<h2 id="monorepo-lerna-yarn-的组合" tabindex="-1"><a class="header-anchor" href="#monorepo-lerna-yarn-的组合"><span>Monorepo + Lerna + Yarn 的组合</span></a></h2>
<ul>
<li>Lerna 提供工具管理版本、发布和增量构建</li>
<li>Yarn Workspaces 专注于依赖管理和工作区链接</li>
</ul>
<h3 id="配置步骤" tabindex="-1"><a class="header-anchor" href="#配置步骤"><span>配置步骤</span></a></h3>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#1. 初始化项目</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">mkdir</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> my-monorepo</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> my-monorepo</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">yarn</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> init</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#2. 启用 Yarn Workspaces。在根目录的package.json中添加配置</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">{</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  "private"</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">:</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375"> true</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">,</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">  "workspaces"</span><span style="--shiki-light:#998418;--shiki-dark:#B8A965">:</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE"> [</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">packages/*</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77">"</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE">]</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#3. 安装 Lerna</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">yarn</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> add</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> lerna</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -W</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#4. 初始化 Lerna，将生成lerna.json</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npx</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> lerna</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> init</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#5. 创建子项目</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">mkdir</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -p</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> packages/package-a</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> packages/package-b</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> packages/package-a</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">yarn</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> init</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -y</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965">cd</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> ../package-b</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">yarn</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> init</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -y</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">#6. 配置子包之间的依赖</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">yarn</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> workspace</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> package-b</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> add</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> package-a</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令"><span>常用命令</span></a></h3>
<ul>
<li><strong><code v-pre>yarn install</code></strong>  安装依赖</li>
<li><strong><code v-pre>yarn workspace package-a add lodash</code></strong>   为指定的子项目安装依赖</li>
<li><strong><code v-pre>npx lerna run build</code></strong>   Lerna 提供了增量构建的能力，只重新构建受影响的包</li>
<li><strong><code v-pre>npx lerna publish</code></strong>  根据变更自动管理版本号并发布</li>
</ul>
</div></template>


