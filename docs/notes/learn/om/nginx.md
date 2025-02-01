---
title: nginx
createTime: 2025/01/13 20:38:43
permalink: /learn/om/vLu6E/
author: JackSim
tags:
  - 运维
  - 反向代理服务器
  - 代理

description: 
---


## 为什么要装Nginx

### Nginx 是什么？

**NGINX**（发音为"Engine-X"）是一款高性能的开源Web服务器软件，也可以作为反向代理服务器、负载均衡器和HTTP 缓存。NGINX 的主要特点包括：

1.  **高并发和高性能**
    
    * NGINX 采用事件驱动模型，与传统的基于线程或进程的模型不同，这使得它能够高效处理大量的并发连接，适用于高流量网站。
    * 它能处理数以万计的并发连接，而不会占用过多的资源。
2.  **反向代理与负载均衡**
    
    * 除了作为 Web 服务器，NGINX 还被广泛用于反向代理和负载均衡。
1.  **缓存功能**
    
    * NGINX 具有强大的缓存机制，能够减少对后端服务器的请求，从而提升系统的性能。
2.  **支持静态文件和动态内容**
    
    * NGINX 可以处理静态内容（如HTML、图片、视频）以及通过 FastCGI、uWSGI 等接口处理动态内容。

### 反向代理是什么？

**反向代理**, 是指客户端（如浏览器）通过代理服务器访问其他服务器资源的过程。与正向代理不同，正向代理是代理客户端的请求，而反向代理则是代理服务器的请求。具体来说：

* **正向代理**：客户端通过代理服务器去访问外部资源。客户端知道代理服务器的存在，代理服务器代表客户端向外部资源发出请求，响应再返回给客户端。比如，有些公司内网会通过正向代理访问互联网。

* **反向代理**：客户端并不知道代理服务器的存在。客户端的请求被发送到反向代理服务器，然后反向代理服务器再转发请求到实际的后端服务器，并将响应返回给客户端。客户端以为它直接与后端服务器交互，但实际上是与反向代理服务器交互。

**反向代理的工作流程**：
1. 客户端发起请求：客户端（如浏览器）向某个域名发送请求。
2. 反向代理接收到请求：请求首先到达反向代理服务器。反向代理服务器充当中介，将请求转发给真实的后端服务器。
3. 后端服务器处理请求：后端服务器处理请求并生成响应。
4. 反向代理转发响应：反向代理将后端服务器的响应返回给客户端。

**反向代理的优点**：

1. 负载均衡：

    反向代理可以将来自客户端的请求分配到多个后端服务器上，从而平衡各个服务器的负载，提高系统的可扩展性和可靠性。

2. 提高安全性：

    反向代理可以隐藏内部服务器的细节和网络架构，防止客户端直接访问后端服务器，提高系统的安全性。

3. SSL/TLS 终止：

    反向代理服务器可以承担加密/解密（SSL/TLS 终止），从而减少后端服务器的负担。

4. 缓存：

    反向代理可以缓存常用的请求响应，减少对后端服务器的访问，提升系统性能。

5. 统一入口：

    通过反向代理，可以将多个后端服务统一暴露为一个入口，简化客户端访问路径。


## 安装nginx

安装Nginx之前，先安装一些依赖。

- 步骤1. 安装gcc g++的依赖库

```shell
sudo apt-get install build-essential
sudo apt-get install libtool
```

- 步骤2. 安装pcre依赖库

```shell
sudo apt-get update
sudo apt-get install libpcre3 libpcre3-dev
```

- 步骤3. 安装zlib依赖库

```shell
apt-get install zlib1g-dev
```

- 步骤4. 安装ssl依赖库

```shell
apt-get install openssl
```

- 步骤5. 安装Nginx

```shell
sudo apt-get install nginx
```

## nginx常用命令

```shell
sudo systemctl start nginx  # 启动nginx
sudo systemctl stop nginx   # 停用nginx
sudo systemctl restart nginx  # 重启nginx
sudo systemctl reload nginx   # 修改配置后，重新加载配置，不重启服务
sudo systemctl status nginx   # 查看nginx运行状态
sudo nginx -t    #检查配置文件是否正常
sudo systemctl enable nginx  # 设置开机启动
```

## 配置静态站点

修改/etc/nginx/sites-available/default文件，可以配置可用站点



## 配置SSL证书


* 步骤1. 申请证书，并下载
* 步骤2. 在nginx配置目录下，创建放置证书的目录。比如/etc/nginx/ssl
* 步骤3. 将证书放置在上述目录下
* 步骤4. 在nginx配置文件里，添加如下配置

```nginx
#...
#...
server {
    listen 443 ssl;
    server_name www.nginxdocs.com;

    ssl_certificate /etc/nginx/ssl/nginxdocs.crt;
    ssl_certificate_key /etc/nginx/ssl/nginxdocs.key;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```

