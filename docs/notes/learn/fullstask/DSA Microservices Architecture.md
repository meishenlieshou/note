---
title: Microservices Architecture
createTime: 2025/02/12 09:18:45
permalink: /learn/fullstack/wkeULVoWsH2/
author: Jack
tags:
  - Microservices Architecture
  - Web
description: 
---

## Architecture blocks

![图 0](../../../../images/65cc44eb325aa9be6a786ba981dfe7fdf2d07fdf923fc3a9b333bc75ff547ed2.png)  

## CDN 

内容分发网络， 主要用于提高网站或应用的加载速度、降低服务器压力，增强用户体验。项目中，一般是通过选择CDN提供商来实施的这项服务的。

大陆境内包括阿里云、腾讯云等各种云服务厂商。境外包括Cloudflare、AWS CloudFront等。

**作用** 

CDN主要用于静态资源和大文件分发。

**接入CDN**

主要两种方式，CNAME以及反向代理。

- ==CNAME==，即CDN服务控制台里配置cdn域名到源站域名的绑定
- ==反向代理==，Nginx 配置 proxy_pass 让 CDN 代理你的服务器

**缓存策略**

- ==强缓存（浏览器端）==，设置 Cache-Control 头，例如 max-age=86400（缓存 1 天），或者ETag 头（文件变更时自动失效）
- ==CDN 端缓存==，常见策略是
1. 静态资源长时间缓存（JS/CSS/图片 max-age=30d）
2. API 数据短时间缓存（GET 请求 max-age=10s）
3. URL 版本控制，如 main.css?v=202402

**Gzip / Brotli 压缩**

- 开启 gzip（HTML、CSS、JS 可减少 70% 体积）
- 开启 Brotli（比 gzip 更高效，适用于现代浏览器）

**持续优化**
1. 优化缓存策略（调整 max-age）
2. 分析 CDN 日志（减少回源请求），当CDN节点没有缓存用户请求的资源时，会向源服务器获取资源，这个过程称为回源请求。
   涉及到**缓存配置优化**，**边缘计算**，**预取**，**回原合并**，**智能路由**等。

3. 全球加速优化（CloudFront + Edge Location）

## SLB/F5

负载均衡（Load Balancer），SLB即Server Load Balancer。F5 是一家提供企业级硬件负载均衡的公司

SLB一般由常见的云服务商提供即可，比如阿里云SLB、AWS ELB、腾讯云CLB等。

SLB适用于云端微服务架构，F5适用于私有云，数据中心。

SLB 连接 Nginx 的工作流程大致为：用户请求受理到SLB负载均衡器之后，SLB会根据均衡算法（如轮询、最小连接、IP哈希）将请求分发到 Nginx 服务器集群。Nginx 接收 SLB 传递的请求，并根据不同的 URL路由反向代理到相应的Web微服务（Spring Boot,Nodejs）

**SLB实际使用**
1. 云服务商创建SLB，并添加后端Nginx服务器实例，设置健康检查（如检测nginx 80端口，确认是否活跃。如配置健康检查接口）
2. 尽量SLB终止https，SLB 处理 HTTPS（SSL），然后以 HTTP 方式转发给 Nginx（减轻 Nginx 负担）
3. 电商、支付系统常需要保持用户会话。在某些应用场景下，用户的请求需要始终由同一台后端服务器处理，否则可能会导致 登录状态丢失、支付异常、购物车数据丢失等问题。
 
==SLB方案==，需云负载均衡（如 AWS ELB、阿里云 SLB）支持 Sticky Session。
   - 可以基于cookie。SLB 在第一次请求时设置一个 Cookie（如 AWSALB）。之后所有请求都带有这个 Cookie，SLB 会解析它，并把请求路由到相同的后端服务器。
   - 基于 IP 哈希。SLB 根据用户 IP 地址计算哈希值，把相同 IP 的请求固定到同一服务器。适用于短时间内 Session 绑定，但不适合 IP 变化的情况（如手机用户切换网络）
    
==Nginx方案==，可以通过 ip_hash 或 Sticky Cookie 来绑定 Session。
```Nginx
upstream backend {
    ip_hash;  # 保证相同 IP 请求被分配到同一服务器
    server 192.168.1.10;
    server 192.168.1.11;
}

upstream backend {
    server 192.168.1.10;
    server 192.168.1.11;
    sticky cookie srv_id expires=1h domain=.example.com path=/;
}
```
==分布式 Session==，服务器是多实例，仅靠 Session 绑定可能会有问题，如果绑定的服务器宕机，用户 Session 就丢失了。使用 Redis 存储 Session，这样即使负载均衡到不同的服务器，也可以共享 Session。本质上，让所有服务器都可以访问相同的 Session 数据，即使 SLB 负载均衡到不同的服务器，用户的购物车、登录状态也不会丢失。

4. Nginx HA 方案实现高可用，High Availability。Nginx 本身不具备高可用功能，因此需要借助第三方工具来实现高可用架构。主要依赖如下技术方案
   - Keepalived + Nginx
   - LVS（Linux Virtual Server）+ Keepalived + Nginx
   - 云端 Nginx HA（云负载均衡 + Nginx）

详情[参考](/learn/om/KGP5ANzssA0XI/)

## Nginx 配置负载均衡

如果 SLB 之后的 Nginx 还要对后端服务器进行二级负载均衡，需要配置 upstream
```Nginx
# 负载均衡到后端应用服务器
upstream backend_servers {
    server 192.168.2.10:8080 weight=3;
    server 192.168.2.11:8080 weight=2;
    server 192.168.2.12:8080 weight=1;
}

server {
    listen 80;
    server_name www.example.com;

    location / {
        proxy_pass http://backend_servers;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Gateway网关

Gateway网关 是服务调用的入口，起到路由分发、权限认证、流量控制、熔断限流等功能。

**请求路由（Routing）**

- Gateway 负责将客户端请求转发到正确的微服务（Server）。
- 使用动态路由，通过 [Nacos](#nacos) 发现并调用后端微服务，减少硬编码。

**权限认证（Authentication & Authorization）**

- 通过 Spring Security + JWT 验证用户身份，拦截未授权请求。
- 避免所有微服务都要重复实现身份认证，降低开发复杂度。

**限流熔断（Rate Limiting & Circuit Breaker）**

- 结合 Sentinel 进行流量控制、熔断降级，防止系统过载。
- 如果某个微服务异常，网关可以返回友好提示或降级处理。

>[!NOTE]
>Sentinel 
>
>Sentinel 是阿里巴巴开源的一款面向分布式服务架构的流量控制和熔断降级组件。


**请求过滤（Request Filtering）**

- 可以校验参数、拦截恶意请求（如 SQL 注入、XSS 攻击）。
- 提供黑白名单机制，限制访问来源。

**负载均衡（Load Balancing）**

- 结合 [Ribbon](#Ribbon)，网关可以在多个微服务实例之间分配请求，提高高可用性。

**请求日志 & 监控（Logging & Monitoring）**

- 记录所有 API 请求日志，结合 ELK、Prometheus 进行监控分析。

更多细节，请[参考](/learn/fullstack/BBPM1oNLgSBVzX4n/)


## Nacos {#nacos}

Nacos Naming and Configuration Service，即“命名与配置服务”，是阿里巴巴开源的一款动态服务发现、配置和管理平台，旨在帮助开发者构建云原生应用和微服务架构。

**服务注册与发现的工作原理**

==服务注册==

1. 服务提供者启动时注册服务：

服务提供者（Service Provider）启动时，会通过 Nacos 客户端 SDK 向 Nacos Server 发送注册请求。

注册信息包括服务名称、IP 地址、端口号、健康状态、元数据等。

2. Nacos Server 存储服务信息：

Nacos Server 接收到注册请求后，将服务实例信息存储在其内部的注册表中。

注册表是一个分布式的数据存储，支持高可用性和数据一致性。

3. 心跳机制保持服务活性：

服务提供者会定期向 Nacos Server 发送心跳包，以表明自己处于健康状态。

如果 Nacos Server 在一定时间内未收到心跳包，则认为该服务实例不可用，并将其从注册表中移除。

==服务发现==

1. 服务消费者查询服务列表：

服务消费者（Service Consumer）通过 Nacos 客户端 SDK 向 Nacos Server 发送服务发现请求。

请求中指定需要发现的服务名称。

2. Nacos Server 返回服务实例列表：

Nacos Server 根据服务名称从注册表中查询可用的服务实例列表，并将其返回给服务消费者。

返回的信息包括服务实例的 IP 地址、端口号、健康状态等。

3. 负载均衡调用服务：

服务消费者根据返回的服务实例列表，通过负载均衡策略（如轮询、随机、权重等）选择一个实例进行调用。

**动态配置管理、服务健康检查**

原理和上述大致一样，需要Nacos Server起中间协调角色。

## Ribbon

 Netflix 开源的一款客户端负载均衡器，主要用于在分布式系统中实现服务调用的负载均衡。2018 年后，Netflix 宣布 Ribbon 进入维护模式，不再积极开发新功能。

 Spring Cloud 推荐使用 Spring Cloud LoadBalancer 作为 Ribbon 的替代方案。

 **Ribbon 的工作原理**

1. 获取服务实例列表：

Ribbon 从服务注册中心（如 Eureka）获取目标服务的实例列表。

2. 负载均衡选择：

根据配置的负载均衡策略（如轮询、随机等），从实例列表中选择一个实例。

3. 发起调用：

向选定的服务实例发起调用。

4. 故障处理：

如果调用失败，Ribbon 会根据配置的重试机制，选择其他实例进行重试。

5. 健康检查：

定期检查服务实例的健康状态，剔除不健康的实例。


## Feign 

Feign 是 Spring Cloud 微服务架构的首选 RPC 框架，用于远程调用其他微服务。

相比 RestTemplate，它更简洁、更易维护，支持 Ribbon 负载均衡、Nacos 服务发现、Sentinel 降级。

在图中，多个 Server 微服务 之间都通过 Feign + Ribbon 进行远程调用。例如：

1. Gateway 调用后端微服务（如 订单服务 调用 商品服务）： Feign 负责服务调用，Ribbon 负责负载均衡。
2. 微服务内部的相互调用（如 用户服务 调用 支付服务）： Feign 让调用像本地方法一样，隐藏 HTTP 细节。

## 分布式任务调度模块

分布式任务调度 主要用于管理和执行定时任务、批处理任务、大数据任务等，确保任务可以在多台服务器上并行执行、故障转移，并保证高可用性。

在单体应用中，通常使用 @Scheduled 或 crontab 来执行定时任务。但在微服务架构下，单机调度有以下问题：

- 单点故障（SPOF）：如果任务调度服务器宕机，所有任务都会失败。
- 性能瓶颈：单个节点处理任务能力有限，难以支撑大规模任务调度。
- 并发冲突：多个实例可能会同时执行相同的任务，导致数据不一致。
- 手动扩展难度大：单机任务无法自动负载均衡，扩展能力有限。

### 分布式任务调度模块可以采用以下方案

1. **XXL-JOB**:  轻量级、开源、支持多语言，适用于互联网企业。
2. **Elastic-Job（基于 Zookeeper）**:  适用于 大数据、数据同步、定时任务。
3. **Spring Cloud + Quartz**:  适用于Spring Boot 微服务架构。

### 分布式任务调度的核心功能

1. **任务分片（Shard）**:  将大任务拆分成多个小任务，由不同的机器并行处理，提升任务执行效率
2. **任务失败重试 & 补偿**:  任务失败后自动重试，或者人工补偿执行
3. **任务调度高可用**: 任务调度无单点故障，可支持主备切换，如 Leader 选举机制（Zookeeper）。任务失败时自动迁移到其他节点，确保任务按时执行。
4. **任务动态管理**: 通过 Web 控制台，可以动态添加、删除、修改任务，支持在线调试。
5. **任务执行日志 & 监控**

### 实践案例

1. 电商订单超时取消

订单创建后 30 分钟未支付，自动取消订单。

2. 定期数据同步

每天凌晨 1 点，将用户数据从 MySQL 同步到 Elasticsearch，用于搜索。

3. 爬虫任务

定时爬取各大网站的商品信息，存入数据库。


## Elasticsearch

Elasticsearch（简称 ES）是分布式搜索和分析引擎，主要用于全文检索、日志分析、实时数据查询等。它在微服务架构中的主要作用包括：

1. **全文检索（Full-Text Search）**
- 适用于 电商、内容管理、社交平台 等场景，实现快速搜索。
- 例如：京东、淘宝搜索商品，用户输入 "iPhone" 可快速返回相关商品。
2. **日志分析（Log Analysis）**
- 结合 Logstash + Kibana（ELK/EFK），用于监控日志、故障排查。
- 例如：Nginx、微服务日志采集到 ES，运维人员可实时查询。
3. **实时数据查询（Real-Time Query）**
- 比传统数据库查询更快，适用于海量数据查询场景。
- 例如：金融系统查询历史交易记录，比 MySQL 快数倍。
4. **推荐系统 & 数据分析**
- 结合 机器学习（ML）、大数据（Spark、Flink），实现个性化推荐。
- 例如：电商根据用户搜索历史推荐商品。

### Elasticsearch vs 传统数据库（MySQL）

| 特性            | **Elasticsearch**                 | **MySQL（关系型数据库）**   |
|---------------|--------------------------------|---------------------------|
| **数据存储**    | 分布式存储，支持大数据              | 单机或主从存储                 |
| **查询速度**    | 采用倒排索引，**查询快**            | SQL 查询，**查询慢**         |
| **全文搜索**    | ✅ **强大**                      | ❌ **不适合**               |
| **结构化查询**  | ✅ **支持（聚合、过滤）**         | ✅ **强大**                 |
| **实时性**      | ✅ **毫秒级查询**                | ❌ **较慢**                 |
| **扩展性**      | ✅ **水平扩展（可扩展到 PB 级数据）** | ❌ **扩展有限**              |
| **事务支持**    | ❌ 不支持事务                     | ✅ **ACID 事务支持**         |
| **数据一致性**  | **最终一致性**                    | **强一致性**                 |
| **适用场景**    | **搜索、日志分析、大数据查询**       | **交易、订单管理、OLTP 系统**  |


### 性能快

Elasticsearch 查询速度通常比 MySQL 快 10~100 倍，尤其是在全文搜索、大数据查询、模糊匹配等场景下。**关键原因**：Elasticsearch 的倒排索引（Inverted Index）

在 MySQL 中，数据存储是基于 B+ 树索引，而在 Elasticsearch 中，核心技术是 倒排索引（Inverted Index）。

**倒排索引** 是一种专门用于全文搜索的数据结构，类似于书籍的索引页：

- MySQL 查询时，需要扫描大量数据，尤其是 LIKE '%xxx%' 查询时，效率很低。
- Elasticsearch 先把数据拆分成词条（Token），然后建立索引映射，查询时直接找到相关文档，速度极快。

**其它**

1. Elasticsearch 采用分布式架构，数据被拆分成多个 分片（Shard），多个节点可以并行查询，相比 MySQL 的单机查询更快。
2. Elasticsearch 采用 文件系统缓存（File System Cache） 和 Lucene 缓存，可以存储查询结果，对于重复查询，速度极快。
3. Elasticsearch 支持 Trie Tree（前缀树）、FST（有限状态机），适合快速匹配关键词。

## Amazon S3

Amazon S3（Simple Storage Service）是 AWS 提供的对象存储服务，用于存储、备份和分发大规模数据。 
- 支持 PB 级存储，可存储图片、视频、音频、日志、数据库备份等数据。
- 对象存储（Object Storage），与传统文件存储和块存储不同。
- 99.999999999%（11 个 9）数据持久性，防止数据丢失。
- 99.99% 高可用性，数据分布在多个 AWS 数据中心（Region）。

文件以“对象”的形式存储，而不是文件夹/目录结构。每个对象都有 唯一的 Key（文件名），用于访问。 

在该架构图中，Amazon S3 作为 分布式文件存储 组件，主要用于存储和管理大规模非结构化数据，如：
- 图片、视频、日志、备份文件 等非结构化数据。
- 静态资源文件（如网站图片、CSS、JavaScript）。
- 数据库备份（如 MySQL 备份文件）。

微服务可以将元数据存入 Elasticsearch 进行索引和快速查询，而实际文件存放在 Amazon S3。适用于 电商、社交平台、文档管理系统。

### S3 与 MySQL、Redis 的协同

- MySQL 存储结构化数据，不适合存储大文件，因此将大文件存入 S3，MySQL 仅存路径信息。
- Redis 用于缓存访问频繁的文件元数据，提高查询效率。
- S3 负责存储实际文件数据，避免服务端本地存储占用过大。

## Redis 

Redis（Remote Dictionary Server）是一个高性能的分布式缓存和 NoSQL 数据库，用于存储**键值对（Key-Value）**数据。它的主要特点包括：

- 超快读写（基于内存，支持 10 万 QPS 以上）。
- 多种数据结构（String、List、Set、Hash、ZSet、Bitmap 等）。
- 支持持久化（RDB、AOF）。
- 支持分布式架构（主从复制、分片、哨兵、集群）。

在这张微服务架构图中，Redis 主要用于：

- 缓存热点数据（如用户信息、商品数据、订单状态等）。
- 分布式 Session 管理，存储用户登录状态，避免 Session 丢失。
- 分布式锁（基于 Redis SETNX 实现，高并发场景下控制资源访问）。
- 消息队列（Stream），缓冲异步任务，解耦业务逻辑。
- 排行榜 & 计数器（如 PV、UV 统计，点赞、投票系统）。

### Redis 哨兵模式（Sentinel）

Redis 哨兵模式（Sentinel） 是一种高可用架构，用于自动监控 Redis 服务器、故障转移和通知。它的主要功能包括：

- 监控 Redis 主从实例（检测主服务器是否宕机）。
- 自动故障转移（主服务器挂了，自动提升一个从服务器为主服务器）。
- 客户端通知（告知 Redis 客户端新的主服务器地址）。
- 集群模式下协调多个 Redis 服务器。

### Redis 哨兵模式工作原理

在 Redis 主从架构 下（如图中的Redis 高可用模式），哨兵模式保证 Redis 服务器的高可用性：

- **Redis 主从（Master-Slave）架构**
1. 主服务器（Master） 处理读写请求，并同步数据给 从服务器（Slave）。
2. 从服务器（Slave） 只提供只读访问，可用作数据备份和负载均衡。

- **哨兵（Sentinel）进程**
1. 哨兵进程持续监测主 Redis 服务器的状态（PING）。
2. 如果主服务器 宕机，哨兵会从多个从服务器中选出一个晋升为新的主服务器。
3. 通过 发布/订阅机制 通知客户端使用新的主服务器。

## 集群模式(Redis Cluster)

Redis Cluster 是 Redis 的分布式架构，用于解决单机 Redis 容量、吞吐量、单点故障等问题。它通过数据分片（Sharding）和去中心化设计，实现 高可用 & 水平扩展。

### Redis Cluster 的核心特点

- **数据分片（Sharding）**
1. 采用 哈希槽（Hash Slot）分区 机制，将数据分布到不同的 Redis 节点上。
2. 每个 Redis 节点负责 16384 个哈希槽中的一部分，均衡存储数据，避免某个节点存储过多数据。

- **去中心化架构**
1. 没有单点故障，所有节点都存储集群信息，不依赖中央调度节点（不像 Sentinel 依赖哨兵）。
2. 任何节点都能接受客户端请求，并将请求转发给正确的节点。

**高可用（Failover 机制）**
1. 每个主节点（Master）都有从节点（Slave），当主节点宕机时，集群会自动选举新的主节点。

**水平扩展**
1. 可以动态增加/减少节点，适用于大规模存储需求（如 PB 级数据）。
2. 客户端可通过 哈希槽重分配 访问新增节点，无需手动修改代码。

**多主架构**
1. 支持 多主（Master-Master），可分散读写压力，提升性能。


### Redis Cluster vs. 传统 Redis 对比

| **对比项**     | **Redis 单机** | **Redis Sentinel（哨兵）** | **Redis Cluster（集群）** |
|--------------|--------------|------------------|------------------|
| **架构**     | 单节点       | 主从架构（Master-Slave） | 多主多从架构 |
| **扩展性**   | 无法扩展     | 读扩展（主从复制），写受限 | 水平扩展 |
| **高可用性** | 无，单点故障 | 具备主从切换能力  | 具备主从切换能力 |
| **数据分片** | 不支持       | 不支持          | **支持（自动分片 16384 Slot）** |
| **吞吐量**   | 受单机限制   | 受主节点限制      | **高吞吐量，多节点并行处理** |
| **主从切换** | 不支持       | 自动切换（由 Sentinel 监控） | **自动切换（Cluster 内部投票选主）** |
| **数据一致性** | 高（单机存储） | 高（复制一致性） | **最终一致性，部分情况下可能丢失数据** |
| **运维复杂度** | 简单       | 适中          | **较复杂，需要手动分片管理** |
| **使用场景** | 小型项目，低并发 | 需要高可用但流量不大 | **高并发，大规模存储，高可用场景** |




