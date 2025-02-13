<template><div><h2 id="scene-1" tabindex="-1"><a class="header-anchor" href="#scene-1"><span>Scene 1</span></a></h2>
<p><img src="@source/../images/65cc44eb325aa9be6a786ba981dfe7fdf2d07fdf923fc3a9b333bc75ff547ed2.png" alt="图 0"></p>
<h3 id="cdn" tabindex="-1"><a class="header-anchor" href="#cdn"><span>CDN</span></a></h3>
<p>内容分发网络， 主要用于提高网站或应用的加载速度、降低服务器压力，增强用户体验。项目中，一般是通过选择CDN提供商来实施的这项服务的。</p>
<p>大陆境内包括阿里云、腾讯云等各种云服务厂商。境外包括Cloudflare、AWS CloudFront等。</p>
<p><strong>作用</strong></p>
<p>CDN主要用于静态资源和大文件分发。</p>
<p><strong>接入CDN</strong></p>
<p>主要两种方式，CNAME以及反向代理。</p>
<ul>
<li><mark>CNAME</mark>，即CDN服务控制台里配置cdn域名到源站域名的绑定</li>
<li><mark>反向代理</mark>，Nginx 配置 proxy_pass 让 CDN 代理你的服务器</li>
</ul>
<p><strong>缓存策略</strong></p>
<ul>
<li><mark>强缓存（浏览器端）</mark>，设置 Cache-Control 头，例如 max-age=86400（缓存 1 天），或者ETag 头（文件变更时自动失效）</li>
<li><mark>CDN 端缓存</mark>，常见策略是</li>
</ul>
<ol>
<li>静态资源长时间缓存（JS/CSS/图片 max-age=30d）</li>
<li>API 数据短时间缓存（GET 请求 max-age=10s）</li>
<li>URL 版本控制，如 main.css?v=202402</li>
</ol>
<p><strong>Gzip / Brotli 压缩</strong></p>
<ul>
<li>开启 gzip（HTML、CSS、JS 可减少 70% 体积）</li>
<li>开启 Brotli（比 gzip 更高效，适用于现代浏览器）</li>
</ul>
<p><strong>持续优化</strong></p>
<ol>
<li>
<p>优化缓存策略（调整 max-age）</p>
</li>
<li>
<p>分析 CDN 日志（减少回源请求），当CDN节点没有缓存用户请求的资源时，会向源服务器获取资源，这个过程称为回源请求。
涉及到<strong>缓存配置优化</strong>，<strong>边缘计算</strong>，<strong>预取</strong>，<strong>回原合并</strong>，<strong>智能路由</strong>等。</p>
</li>
<li>
<p>全球加速优化（CloudFront + Edge Location）</p>
</li>
</ol>
<h3 id="slb-f5" tabindex="-1"><a class="header-anchor" href="#slb-f5"><span>SLB/F5</span></a></h3>
<p>负载均衡（Load Balancer），SLB即Server Load Balancer。F5 是一家提供企业级硬件负载均衡的公司</p>
</div></template>


