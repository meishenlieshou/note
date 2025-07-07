import{_ as n,c as a,a as i,o as e}from"./app-DuiRUx8f.js";const l={};function p(t,s){return e(),a("div",null,s[0]||(s[0]=[i(`<p>App Router 引入了一套全新的、基于 React 服务器组件 (Server Components) 的数据获取和渲染范式，旨在简化和统一开发体验。</p><ul><li><code>getStaticProps 的替代方案</code>：默认静态渲染 + fetch API 缓存</li><li><code>getStaticPaths 的替代方案</code>：generateStaticParams</li><li><code>getServerSideProps 的替代方案</code>：fetch API 结合 cache: &#39;no-store&#39;</li></ul><ol><li>getStaticProps的revalidata实现ISR，在App router模式下，通过fetch方法的第二个传参传入。</li></ol><div class="language-typescript line-numbers-mode" data-ext="typescript" data-title="typescript"><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">fetch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">/api/data</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">,</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">    next</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: {</span></span>
<span class="line"><span style="--shiki-light:#998418;--shiki-dark:#B8A965;">        revalidate</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">60</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> //单位秒，可选，60s后刷新缓存。设置为0时，每次请求都会刷新缓存。</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">});</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重要点" tabindex="-1"><a class="header-anchor" href="#重要点"><span>重要点</span></a></h2><h3 id="在app-目录及其子目录下创建的所有react组件-都将被视为服务器组件-如需将其特殊标准为客户端组件-在文件最开始使用use-client申明" tabindex="-1"><a class="header-anchor" href="#在app-目录及其子目录下创建的所有react组件-都将被视为服务器组件-如需将其特殊标准为客户端组件-在文件最开始使用use-client申明"><span><strong><code>在app/目录及其子目录下创建的所有React组件，都将被视为服务器组件</code>，如需将其特殊标准为客户端组件，在文件最开始使用<code>use client</code>申明</strong></span></a></h3><ul><li>服务器组件可以导入和渲染客户端组件</li><li>客户端组件不能直接导入和渲染服务器组件</li><li>如果客户端组件需要服务器组件的内容，通常是将其作为 props 传递，或者将服务器组件作为客户端组件的 children 传递</li></ul><h3 id="默认情况下-所有组件都静态渲染-即构建时生成静态-html-页面。如下场景会触发动态渲染" tabindex="-1"><a class="header-anchor" href="#默认情况下-所有组件都静态渲染-即构建时生成静态-html-页面。如下场景会触发动态渲染"><span><strong>默认情况下，所有组件都静态渲染，即构建时生成静态 HTML 页面。如下场景会触发动态渲染</strong></span></a></h3><ul><li><ol><li>导入了动态函数，比如<code>cookies</code>、<code>headers</code>、<code>connection</code>等</li></ol></li><li><ol start="2"><li>fetch方法指定了no-store缓存策略</li></ol></li><li><ol start="3"><li>fetch方法指定了next.revalidate为0</li></ol></li><li><ol start="4"><li>依赖了URL中的查询参数</li></ol></li></ul><h3 id="页面组件的参数传递是高度结构化的-完全由-url-驱动" tabindex="-1"><a class="header-anchor" href="#页面组件的参数传递是高度结构化的-完全由-url-驱动"><span><strong><code>页面组件的参数传递是高度结构化的，完全由 URL 驱动</code></strong></span></a></h3><ul><li><ol><li><code>Layout</code> 和 <code>Page</code>之间不支持直接传参（都是page组件）。</li></ol></li><li><ol start="2"><li>页面组件之间，通过各自调用开启缓存的fetch享数据、或者访问params、searchParams页面组件入参。</li></ol></li></ul><div class="language-typescript line-numbers-mode" data-ext="typescript" data-title="typescript"><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">type</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;"> PageProps</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    params</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">Array</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;{</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        lang</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">string</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;              </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 语言参数</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        [</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">paramName</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">string</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">]: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">any</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;   </span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 动态路由段的入参，存储参数名、参数值</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }&gt;,</span></span>
<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    searchParamm</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">: </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">Record</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&lt;</span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">string</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">, </span><span style="--shiki-light:#2E8F82;--shiki-dark:#5DA994;">string</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">&gt;,</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;"> // 路由中的查询参数，存储参数名、参数值</span></span>
<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>典型的App router模式下的项目目录结构</li></ol><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="Copy code" data-copied="Copied"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>my-nextjs-app/</span></span>
<span class="line"><span>├── app/</span></span>
<span class="line"><span>│   ├── layout.js              # 根布局 (Root Layout) - 必须有，定义所有路由的共享 UI</span></span>
<span class="line"><span>│   ├── page.js                # 根页面 (Root Page) - 站点的首页 &#39;/&#39;</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── dashboard/             # 一个功能模块：仪表盘</span></span>
<span class="line"><span>│   │   ├── layout.js          # 仪表盘特有的布局 (嵌套布局)</span></span>
<span class="line"><span>│   │   ├── page.js            # 仪表盘首页 &#39;/dashboard&#39;</span></span>
<span class="line"><span>│   │   ├── settings/          # 仪表盘下的设置页面</span></span>
<span class="line"><span>│   │   │   ├── page.js        # 设置页面 &#39;/dashboard/settings&#39;</span></span>
<span class="line"><span>│   │   │   ├── profile/</span></span>
<span class="line"><span>│   │   │   │   └── page.js    # 个人资料设置页面 &#39;/dashboard/settings/profile&#39;</span></span>
<span class="line"><span>│   │   │   └── account/</span></span>
<span class="line"><span>│   │   │       └── page.js    # 账户设置页面 &#39;/dashboard/settings/account&#39;</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   ├── analytics/</span></span>
<span class="line"><span>│   │   │   └── page.js        # 仪表盘下的分析页面 &#39;/dashboard/analytics&#39;</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   ├── _components/       # 仪表盘私有组件 (以下划线开头，不会被路由)</span></span>
<span class="line"><span>│   │   │   ├── DashboardNav.js</span></span>
<span class="line"><span>│   │   │   └── UserCard.js</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   └── _utils.js          # 仪表盘私有工具函数</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── products/              # 另一个功能模块：产品</span></span>
<span class="line"><span>│   │   ├── page.js            # 产品列表页 &#39;/products&#39;</span></span>
<span class="line"><span>│   │   ├── [productId]/       # 动态路由段：产品详情页 &#39;/products/[productId]&#39;</span></span>
<span class="line"><span>│   │   │   ├── page.js        # 具体产品详情页面</span></span>
<span class="line"><span>│   │   │   ├── PhotoGallery.js # 与产品详情页共置的客户端组件 (可能需要 &quot;use client&quot;)</span></span>
<span class="line"><span>│   │   │   ├── reviews/       # 嵌套路由：产品评论页 &#39;/products/[productId]/reviews&#39;</span></span>
<span class="line"><span>│   │   │   │   └── page.js</span></span>
<span class="line"><span>│   │   │   │</span></span>
<span class="line"><span>│   │   │   └── layout.js      # 产品详情页特有的布局</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   └── _components/       # 产品模块私有组件</span></span>
<span class="line"><span>│   │       └── ProductCard.js</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── api/                   # API 路由 (API Routes)</span></span>
<span class="line"><span>│   │   ├── route.js           # 根 API 路由 &#39;/api&#39; (GET, POST, etc.)</span></span>
<span class="line"><span>│   │   ├── users/</span></span>
<span class="line"><span>│   │   │   ├── route.js       # 用户 API &#39;/api/users&#39;</span></span>
<span class="line"><span>│   │   │   └── [userId]/</span></span>
<span class="line"><span>│   │   │       └── route.js   # 特定用户 API &#39;/api/users/[userId]&#39;</span></span>
<span class="line"><span>│   │   │</span></span>
<span class="line"><span>│   │   └── draft/</span></span>
<span class="line"><span>│   │       └── route.js       # 预览模式激活 API (如之前讨论的)</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── (marketing)/           # 路由组 (Route Group) - 不影响 URL 路径，用于组织路由</span></span>
<span class="line"><span>│   │   ├── about/</span></span>
<span class="line"><span>│   │   │   └── page.js        # &#39;/about&#39;</span></span>
<span class="line"><span>│   │   └── contact/</span></span>
<span class="line"><span>│   │       └── page.js        # &#39;/contact&#39;</span></span>
<span class="line"><span>│   │</span></span>
<span class="line"><span>│   ├── loading.js             # 加载 UI 文件 - 为父级路由段提供加载状态</span></span>
<span class="line"><span>│   ├── error.js               # 错误 UI 文件 - 为父级路由段捕获错误</span></span>
<span class="line"><span>│   ├── not-found.js           # 404 UI 文件 - 为未找到的路由提供自定义 404 页面</span></span>
<span class="line"><span>│   ├── global-error.js        # 全局错误捕获 (通常与 error.js 配合使用)</span></span>
<span class="line"><span>│   └── favicon.ico            # 网站图标 (放置在 app 根目录)</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── public/                    # 静态资源 (Static Assets) - 如图片、字体等，直接通过 / 访问</span></span>
<span class="line"><span>│   ├── images/</span></span>
<span class="line"><span>│   │   └── logo.png</span></span>
<span class="line"><span>│   └── robots.txt</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── components/                # 共享组件 (Shared Components) - 在多个功能模块中复用</span></span>
<span class="line"><span>│   ├── Header.js              # 可能包含 &quot;use client&quot; 指令</span></span>
<span class="line"><span>│   ├── Footer.js              # 可能包含 &quot;use client&quot; 指令</span></span>
<span class="line"><span>│   └── common/</span></span>
<span class="line"><span>│       └── Card.js</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── lib/                       # 工具函数或数据获取层 (Utilities / Data Layer)</span></span>
<span class="line"><span>│   ├── db.js                  # 数据库连接</span></span>
<span class="line"><span>│   ├── api.js                 # 封装的外部 API 调用</span></span>
<span class="line"><span>│   └── utils.js               # 通用工具函数</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── styles/                    # 全局样式或 SCSS 变量 (通常在 layout.js 中导入)</span></span>
<span class="line"><span>│   └── global.css</span></span>
<span class="line"><span>│</span></span>
<span class="line"><span>├── README.md</span></span>
<span class="line"><span>├── package.json</span></span>
<span class="line"><span>├── next.config.js             # Next.js 配置</span></span>
<span class="line"><span>├── tsconfig.json              # TypeScript 配置 (如果使用 TypeScript)</span></span>
<span class="line"><span>└── .env.local                 # 环境变量</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code>和Page Router一样，app下以_开头的目录或者文件，不会被路由，比如依赖于服务端数据的组件、工具函数、自定义hook等</code></strong></p>`,15)]))}const r=n(l,[["render",p]]),c=JSON.parse('{"path":"/learn/front/XuDDLHILH9/","title":"NextJS App Router模式","lang":"en-US","frontmatter":{"title":"NextJS App Router模式","createTime":"2025/07/07 07:29:32","permalink":"/learn/front/XuDDLHILH9/","author":"Jack","tags":["NextJS","React","Fullstack","SSR"],"description":"App Router 引入了一套全新的、基于 React 服务器组件 (Server Components) 的数据获取和渲染范式，旨在简化和统一开发体验。 getStaticProps 的替代方案：默认静态渲染 + fetch API 缓存 getStaticPaths 的替代方案：generateStaticParams getServerSide...","head":[["meta",{"property":"og:url","content":"https://duduainy.top/learn/front/XuDDLHILH9/"}],["meta",{"property":"og:site_name","content":"Seasoned Jack"}],["meta",{"property":"og:title","content":"NextJS App Router模式"}],["meta",{"property":"og:description","content":"App Router 引入了一套全新的、基于 React 服务器组件 (Server Components) 的数据获取和渲染范式，旨在简化和统一开发体验。 getStaticProps 的替代方案：默认静态渲染 + fetch API 缓存 getStaticPaths 的替代方案：generateStaticParams getServerSide..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2025-07-07T03:31:51.000Z"}],["meta",{"property":"article:author","content":"Jack"}],["meta",{"property":"article:tag","content":"NextJS"}],["meta",{"property":"article:tag","content":"React"}],["meta",{"property":"article:tag","content":"Fullstack"}],["meta",{"property":"article:tag","content":"SSR"}],["meta",{"property":"article:modified_time","content":"2025-07-07T03:31:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NextJS App Router模式\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-07-07T03:31:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Jack\\"}]}"]]},"headers":[],"readingTime":{"minutes":3.67,"words":1100},"git":{"updatedTime":1751859111000},"autoDesc":true,"filePathRelative":"notes/learn/react/9.App路由模式.md","bulletin":false}');export{r as comp,c as data};
