<template><div><h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述"><span>问题描述</span></a></h2>
<p>电脑上安装的梯子软件指向的服务地址一直不是很稳定，地址被墙后就需要重新更换。有一次更换地址后，发现cmd命令行使用npm安装依赖包时，总是提示连接超时。梯子明明是可以上网的，而且也开了全局模式。</p>
<p>超时提示里，输出一个代理IP地址+端口。刚开始没怎么在意，后来发现这个IP地址是之前的服务地址。</p>
<p>为什么会走了之前的服务代理地址呢？</p>
<h2 id="排查过程" tabindex="-1"><a class="header-anchor" href="#排查过程"><span>排查过程</span></a></h2>
<h3 id="首先-使用命令清空了node代理配置。" tabindex="-1"><a class="header-anchor" href="#首先-使用命令清空了node代理配置。"><span>首先，使用命令清空了node代理配置。</span></a></h3>
<div class="language-sh line-numbers-mode" data-ext="sh" data-title="sh"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> config</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> delete</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> proxy</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> config</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> delete</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> https-proxy</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>问题依然存在，显然这不是node代理引起的。</p>
<h3 id="怀疑是梯子软件遗留了历史文件在起坏作用。" tabindex="-1"><a class="header-anchor" href="#怀疑是梯子软件遗留了历史文件在起坏作用。"><span>怀疑是梯子软件遗留了历史文件在起坏作用。</span></a></h3>
<p>于是退出梯子，并在梯子文件夹下搜索IP关键字，搜索到准备删除之。然而，梯子退场问题解决，关键字搜索也无劳而获。</p>
<h3 id="怀疑是系统代理、代理配置、或者npm代理配置文件里某个地方遗留着这个ip在起作用" tabindex="-1"><a class="header-anchor" href="#怀疑是系统代理、代理配置、或者npm代理配置文件里某个地方遗留着这个ip在起作用"><span>怀疑是系统代理、代理配置、或者npm代理配置文件里某个地方遗留着这个IP在起作用？</span></a></h3>
<p>进入系统代理设置里确认，依然没找到这个IP关键字。相关的代理文件查找、甚至对文件系统进行了一定程度的全文搜索，也未找到这个IP关键字。这下有点没头绪了</p>
<h3 id="向ai寻求帮助" tabindex="-1"><a class="header-anchor" href="#向ai寻求帮助"><span>向AI寻求帮助</span></a></h3>
<p>问了下chatGPT、以及gemini，可能是问题描述不够好，AI给出的诊断，也没有准确地指向问题的根源</p>
<p>...凉拌了一段时间</p>
<h3 id="更换npm终端" tabindex="-1"><a class="header-anchor" href="#更换npm终端"><span>更换npm终端</span></a></h3>
<p>恰巧系统上之前装了一个git bash。通过这个终端进去后</p>
<div class="language-sh line-numbers-mode" data-ext="sh" data-title="sh"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> config</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> unset</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> proxy</span></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">npm</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> config</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> unset</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> https-proxy</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行下上述命令后，不再走无效IP代理了，npm通过在用的有效梯子能正常工作。</p>
<p>这个方案的不便之处在于，每次重新进入后都需要先执行下上述命令，显示不是长久之计。</p>
<p>...有过了一段时间</p>
<h3 id="真相大白" tabindex="-1"><a class="header-anchor" href="#真相大白"><span>真相大白</span></a></h3>
<p>最近在捣鼓NAS服务器，NAS服务器上安装nodejs环境，计划跑一个静态文档服务，一顿折腾下来发现问题更多。首先，可能是Synology提供的nodejs版本不太稳定的原因，npm或者yarn过程中各种奇怪的错误、警告。其次，依然是上网障碍问题，NAS中即使配置了梯子，npm永远连不上package仓库。当然，后来在nas上安装了一个nodejs官方提供的docker之后，问题基本全部解决（npm也能正常使用梯子了）</p>
<p>在这过程中，有几个环节用到了window机器，此时npm'无缘无故'走了无效IP代理的问题，再次跳出来成了巨大障碍。</p>
<p>再次寻找AI帮忙，这次问题描述更精准，明确提到了npm走了曾经使用过，但是已经废弃不用的ip代理。AI给出的诊断结论里有一条便是：</p>
<Badge type="danger">系统变量里，可能存在着这个无效IP的变量配置</Badge><p>确认后，果不其然。果断删掉后，问题迎刃而解。</p>
</div></template>


