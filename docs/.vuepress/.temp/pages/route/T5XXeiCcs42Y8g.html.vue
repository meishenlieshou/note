<template><div><h2 id="系统安装" tabindex="-1"><a class="header-anchor" href="#系统安装"><span>系统安装</span></a></h2>
<h3 id="准备一张sd卡" tabindex="-1"><a class="header-anchor" href="#准备一张sd卡"><span>准备一张SD卡</span></a></h3>
<p>至少32G以上吧，留足空间。</p>
<h3 id="下载镜像" tabindex="-1"><a class="header-anchor" href="#下载镜像"><span>下载镜像</span></a></h3>
<p>在官方网站上<a href="https://pidoc.cn/downloads/operating-systems/#raspberry-pi-desktop" target="_blank" rel="noopener noreferrer">下载</a>合适你的系统镜像，并准备写入SD卡（树莓派的启动盘）</p>
<h3 id="烧录系统" tabindex="-1"><a class="header-anchor" href="#烧录系统"><span>烧录系统</span></a></h3>
<p>在<a href="https://pidoc.cn/downloads/" target="_blank" rel="noopener noreferrer">这里</a>下载烧录工具。工具安装在window或者macOS系统上（取决于你下载的版本），运行烧录工具，将系统镜像写入SD卡</p>
<div class="hint-container note">
<p class="hint-container-title">注</p>
<p>在烧录的第一步，可以进入EDIT SETTINGS设置基本的系统信息，比如用户名、密码，Wifi连接，ssh等。</p>
<p><img src="@source/../images/0ac58e8df16be00aec603e000c530c586f422d85ff5420a56b5d9e438908d732.png" alt="图 0"></p>
</div>
<h3 id="启动系统" tabindex="-1"><a class="header-anchor" href="#启动系统"><span>启动系统</span></a></h3>
<p>烧录完毕后，取出SD卡插入树莓派主板，上电启动。安装完毕。</p>
<h2 id="安装node环境" tabindex="-1"><a class="header-anchor" href="#安装node环境"><span>安装node环境</span></a></h2>
<p>ssh远程连接到树莓派设备后，执行命令</p>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> apt-get</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> install</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> nodejs</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>国内网络，下载非常慢！！！而且安装node版本还不是最新版本！！！</p>
<h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker"><span>安装docker</span></a></h2>
<p>参数这个<a href="https://pidoc.cn/docs/pidoc/install_docker" target="_blank" rel="noopener noreferrer">链接</a>安装docker，并配置国内加速镜像。</p>
<h3 id="安装最新版node" tabindex="-1"><a class="header-anchor" href="#安装最新版node"><span>安装最新版node</span></a></h3>
<p>参考nodejs官网<a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer">链接</a>安装docker版本。</p>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h3>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">docker</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> run</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -it</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --rm</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> --entrypoint</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> sh</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -v</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> /home/pi/Works:/works</span><span style="--shiki-light:#A65E2B;--shiki-dark:#C99076"> -p</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> 2025:2025</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> node:22-alpine</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>参数解释</p>
<ul>
<li>-i  保持容器的标准输入流打开，方便交互操作。</li>
<li>-t  分配一个伪终端，让你可以在终端中与容器交互。</li>
</ul>
<p>两个参数合在一起，即进入容器的交互模式。</p>
<ul>
<li>--rm  容器在停止运行后会自动删除（防止产生临时的垃圾容器）。</li>
<li>--entrypoint sh   将默认的 ENTRYPOINT（通常是运行 Node.js 程序）覆盖为 sh，也就是说容器启动时会直接进入 /bin/sh，而不是运行 Node 的默认程序。</li>
<li>-v  /宿主目录路径:/容器内路径。挂载是双向的，容器内的更改会同步到宿主机上，宿主机上的更改会实时反映在容器内。</li>
<li>-p  宿主机端口:容器端口</li>
</ul>
<h2 id="绑定静态ip" tabindex="-1"><a class="header-anchor" href="#绑定静态ip"><span>绑定静态IP</span></a></h2>
<h3 id="获取配置信息" tabindex="-1"><a class="header-anchor" href="#获取配置信息"><span>获取配置信息</span></a></h3>
<p>包括现用的IP、网关、DNS信息等。</p>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">ip</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D">  a</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  #获取IP</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">ip</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> route</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676"> |</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665"> grep</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> default</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  #网关、以及IP</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##输出：default via 192.168.2.1 dev eth0 proto dhcp src 192.168.2.103 metric 100</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">grep</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> nameserver</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> /etc/resolv.conf</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">  #获取DNS信息</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##nameserver 192.168.2.1</span></span>
<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD">##nameserver fe80::5%eth0</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置静态ip" tabindex="-1"><a class="header-anchor" href="#设置静态ip"><span>设置静态IP</span></a></h3>
<p>运行如下命令，进入终端设置界面</p>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> nmtui</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>修改完成后，进入终端重启设置</p>
<div class="language-shell line-numbers-mode" data-ext="shell" data-title="shell"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code" v-pre=""><code><span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665">sudo</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D"> reboot</span></span></code></pre>

<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="安装nginx" tabindex="-1"><a class="header-anchor" href="#安装nginx"><span>安装nginx</span></a></h2>
</div></template>


