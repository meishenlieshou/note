<template><div><h2 id="关于webhook" tabindex="-1"><a class="header-anchor" href="#关于webhook"><span>关于Webhook</span></a></h2>
<p>Webhook 是一种轻量级的事件驱动通信机制，允许一个系统实时地将事件通知或数据推送到另一个系统。它是一种通过 HTTP 请求将事件从源系统传递到目标系统的方式，通常被用于自动化流程和系统集成。</p>
<p>简单来说，Webhook 就是“事件通知”工具：当某个触发条件发生时，源系统会以 HTTP 回调的形式通知目标系统，而不是目标系统主动查询。</p>
<h2 id="webhook-的工作原理" tabindex="-1"><a class="header-anchor" href="#webhook-的工作原理"><span>Webhook 的工作原理</span></a></h2>
<p><strong>注册 (Register)</strong></p>
<ul>
<li>客户端或目标系统在源系统中配置 Webhook 的回调 URL</li>
<li>通常需要指定回调地址（如 https://example.com/webhook）以及需要监听的事件（如用户注册、订单支付成功等）。</li>
</ul>
<p><strong>触发 (Trigger)</strong></p>
<p>当源系统中发生指定事件时（如创建用户、完成订单等），源系统会发送 HTTP 请求（通常为 POST）到注册的回调 URL。</p>
<p><strong>响应 (Response)</strong></p>
<ul>
<li>目标系统接收请求后，可以处理数据并返回响应。</li>
<li>通常，源系统会期待一个简单的 HTTP 状态码（如 200 OK）来确认通知已被成功接收。</li>
</ul>
<h2 id="webhook-的安全措施" tabindex="-1"><a class="header-anchor" href="#webhook-的安全措施"><span>Webhook 的安全措施</span></a></h2>
<ol>
<li>验证来源：</li>
</ol>
<p>使用 HMAC 或 JWT 验证 Webhook 请求的真实性。
例如，GitHub 提供了 X-Hub-Signature 头，用于验证请求数据的完整性。</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>X-Hub-Signature 是一种用于验证 Webhook 请求的安全机制，通常用于确保从第三方服务发送到服务器的 Webhook 请求在传输过程中没有被篡改。它是由第三方服务（如 GitHub、GitLab 等）在请求头中添加的一个签名，基于请求的内容（如请求体）和一个预共享的密钥生成。服务器端可以使用相同的密钥和相同的算法计算签名，并与请求头中的 X-Hub-Signature 进行比较，从而验证请求的完整性和真实性。</p>
</div>
<ol start="2">
<li>HTTPS：</li>
</ol>
<p>确保回调 URL 使用 HTTPS，加密传输数据，防止中间人攻击。</p>
<ol start="3">
<li>限流：</li>
</ol>
<p>防止目标系统因大量请求而过载，可以在源系统中设置限流策略。</p>
<ol start="4">
<li>重试机制：</li>
</ol>
<p>如果 Webhook 请求失败，源系统应该支持重试，确保事件不会丢失。</p>
<ol start="5">
<li>请求日志：</li>
</ol>
<p>对 Webhook 请求进行记录，以便审计和调试。</p>
</div></template>


