---
title: nginx
createTime: 2025/01/13 20:38:43
permalink: /learn/devops/vLu6E/
author: Jack
tags:
  - 运维
  - 反向代理服务器
  - 代理

description: 
---

## What is Nginx?

NGINX (pronounced "Engine-X") is a high-performance web server, reverse proxy server, load balancer, and HTTP cache. It is widely used for serving static content, handling traffic routing, and distributing load across multiple servers. Originally developed by Igor Sysoev in 2004, NGINX was designed to address the C10K problem (handling 10,000 concurrent connections), and over time, it has become one of the most popular web servers in the world.

## NGINX Use Cases

### Web Server

NGINX can serve static files like HTML, CSS, JavaScript, images, etc., with high performance.

### Reverse Proxy

It forwards client requests to other backend servers (e.g., application servers, databases)

### Load Balancer

NGINX can distribute incoming traffic across multiple backend servers to ensure high availability and scalability.

### API Gateway

Acts as an intermediary between clients and backend services, often used for handling RESTful APIs.

### Content Caching

NGINX can cache content from a backend server, improving response times and reducing the load on backend systems.

### SSL/TLS Termination

Handles encrypted traffic by terminating SSL/TLS connections at the proxy level, allowing for better security management and performance.

### HTTP/2 Support

NGINX supports the HTTP/2 protocol, which allows for better performance by reducing latency. It achieves this through multiplexing multiple requests over a single connection, reducing the overhead of opening multiple TCP connections.

### WebSocket Support

NGINX supports WebSockets, allowing for full-duplex communication between the client and the server, which is essential for real-time applications (e.g., chat apps, online games, and stock tickers).

### Microservices Support

NGINX is often used in microservices architectures as an API gateway. It can route traffic to different services, handle authentication, and perform other intermediary tasks like rate limiting and logging.

### Rate Limiting and Access Control

NGINX provides mechanisms for controlling the rate of requests, which can protect backend servers from abuse or DoS (Denial of Service) attacks.

Access control features allow NGINX to restrict access to specific resources based on IP addresses, geographic location, or other factors.

### Logging and Monitoring

NGINX provides detailed access logs and error logs, which can be used for monitoring traffic patterns, debugging issues, and optimizing performance.

Tools like Prometheus, Grafana, and ELK stack (Elasticsearch, Logstash, and Kibana) can be used to gather and visualize NGINX metrics for performance monitoring and troubleshooting.


## NGINX vs Apache

While both NGINX and Apache are popular web servers, they have distinct differences that make them suitable for different use cases

1. **Architecture**

NGINX uses an event-driven architecture, whereas Apache uses a process-based model (forking new processes for each request). This makes NGINX much more scalable for handling concurrent requests.

2. **Performance**

NGINX is known for its high performance and ability to handle many concurrent connections efficiently. Apache may struggle with performance under heavy traffic, especially when dealing with large numbers of simultaneous requests.

3. **Flexibility**

Apache provides more flexibility in handling dynamic content (via mod_php or mod_python), whereas NGINX is better suited for static content and reverse proxy use cases.

4. **Configuration**

NGINX configuration files are generally simpler and more concise than Apache’s, which tends to use .htaccess files and more complex configurations.

##  Key Files

### /etc/nginx/

The /etc/nginx/ directory is the default configuration root for the NGINX server.Within this directory you will find configuration files that instruct NGINX on
how to behave.

### /etc/nginx/nginx.conf

The /etc/nginx/nginx.conf file is the default configuration entry point used by the NGINX service. This configuration file sets up global settings for things like worker processes, tuning, logging, loading dynamic modules, and references to other NGINX configuration files. In a default configuration, the /etc/nginx/ nginx.conf file includes the top-level http block, or context, which includes all configuration files in the directory described next.

### /etc/nginx/conf.d/

The /etc/nginx/conf.d/ directory contains the default HTTP server configuration file. Files in this directory ending in .conf are included in the top-level
http block from within the /etc/nginx/nginx.conf file. It’s best practice to utilize include statements and organize your configuration in this way to keep
your configuration files concise. In some package repositories, this folder is named sites-enabled, and configuration files are linked from a folder named
site-available; this convention is deprecated.

### /var/log/nginx/

The /var/log/nginx/ directory is the default log location for NGINX. Within this directory you will find an access.log file and an error.log file. The access log contains an entry for each request NGINX serves. The error logfile contains error events and debug information if the debug module is enabled.

## NGINX commands

```shell
nginx -h #Shows the NGINX help menu.
nginx -v #Shows the NGINX version.
nginx -V #Shows the NGINX version, build information, and configuration arguments, which show the modules built into the NGINX binary.
nginx -t #Tests the NGINX configuration.
nginx -T #Tests the NGINX configuration and prints the validated configuration to the screen. This command is useful when seeking support.
nginx -s signal  #The -s flag sends a signal to the NGINX master process. You can send signals such as stop, quit, reload, and reopen. The stop signal discontinues the NGINX process immediately. The quit signal stops the NGINX process after it finishes processing in-flight requests. The reload signal reloads the NGINX to achieve a graceful reload of the configuration without stopping the server. The reopen signal instructs NGINX to reopen logfiles.
```


## Serving Static Content

### server {...}

The server block is the basic building block in NGINX configuration, where you define how NGINX should respond to HTTP requests for specific domains or IPs.

```nginx
server {
    listen 80 default_server; 
    server_name www.example.com;
    location / {
        root /usr/share/nginx/html;
        # alias /usr/share/nginx/html;
        index index.html index.htm;
    }
}
```
- If a request comes to this server for **www.example.com**, this block will process the request.
- You could add multiple domain names or subdomains here, separated by spaces. For example, server_name www.example.com example.com; would handle both www.example.com and example.com
- The location block is used to define how to handle specific URL paths (or URI) that are part of the request. The / means "the root" or the main path, and the configuration inside this block applies to all requests to the root of the server or domain.
- When a user visits http://www.example.com, NGINX will serve the content from the directory specified here: /usr/share/nginx/html. For example, if someone visits http://www.example.com/index.html, NGINX will look for the file /usr/share/nginx/html/index.html and serve it.
- **alias** is typically used when you want to map a different directory structure to the requested URL.For example, if /usr/share/nginx/html contained subdirectories like /images and /css, the alias directive would be useful to map those paths directly.
- **index index.html index.htm** directive specifies which files to look for as the default index file in a directory.

### alias usage

```nginx
server {
    listen 80;
    server_name www.example.com;

    # Root location for general web content (HTML, JS, etc.)
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }

    # Serve images from /var/www/images when the URL starts with /images/
    location /images/ {
        alias /var/www/images/;
    }

    # Serve CSS files from /var/www/css when the URL starts with /css/
    location /css/ {
        alias /var/www/css/;
    }

    # Handle other types of content (e.g., JavaScript, etc.)
    location /js/ {
        alias /var/www/js/;
    }

    # Error page customization
    error_page 404 /404.html;
    location = /404.html {
        root /usr/share/nginx/html;
        internal;
    }
}
```

## High-Performance Load Balancing

- Load balancing aims to improve performance and availability.
- It enables horizontal scaling by distributing traffic across multiple servers.
- A dynamic load-balancing solution is needed for different infrastructures, including HTTP, TCP, and UDP load balancing

### HTTP Load Balancing

You need to distribute load between two or more HTTP servers. Use NGINX’s HTTP module to load balance over HTTP servers using the **upstream block**.

```nginx
upstream backend {
    server 10.10.12.45:80 weight=1;
    server app.example.com:80 weight=2;
    server spare.example.com:80 backup;
}
server {
    location / {
        proxy_pass http://backend;
    }
}
```
This configuration balances load across two HTTP servers on port 80, and defines one as a backup, which is used when the primary two are unavailable. The **weight** parameter instructs NGINX to pass twice as many requests to the second server, and the weight parameter defaults to 1.


### TCP Load Balancing

You need to distribute load between two or more TCP servers. 
- Many database systems, such as MySQL or PostgreSQL, use TCP connections to handle queries.
- Applications like chat services use TCP servers to manage live messaging.
- Online multiplayer games use TCP or UDP servers to maintain player state and game synchronization.

**TCP Server vs. UDP Server**

- **TCP**: Reliable, connection-oriented, ordered, error-checked delivery of data. Great for applications that require data integrity and order (like HTTP, FTP, etc.).
- **UDP**: Unreliable, connectionless, no guarantee of order or delivery. Used in real-time applications where speed is more important than reliability (e.g., video streaming, DNS queries, gaming).
- **HTTP**: An HTTP server is a specialized type of TCP server that follows the HTTP (Hypertext Transfer Protocol), which is an application-layer protocol (Layer 7 in the OSI model). HTTP is used primarily for web communication, allowing clients (typically web browsers) to request resources like web pages, images, and data from the server.

Use NGINX’s stream module to load balance over TCP servers using the upstream block
```nginx
stream {
    upstream mysql_read {
        server read1.example.com:3306 weight=5;
        server read2.example.com:3306;
        server 10.10.12.34:3306 backup;
    }
    server {
        listen 3306;
        proxy_pass mysql_read;
    }
}
```

### UDP Load Balancing
```nginx
stream {
    upstream ntp {
        server ntp1.example.com:123 weight=2;
        server ntp2.example.com:123;
    }
    server {
        listen 123 udp;
        proxy_pass ntp;
    }
}
```