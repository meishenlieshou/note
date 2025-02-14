---
title: Web Security
createTime: 2025/01/19 17:00:48
permalink: /learn/front/FHkSPfT2yC4cA3tVuw/
author: Jack
tags:
  - Web Security
  - Browser

description: description
---

## Web Security

Web security aims to protect web applications and their users from malicious attacks, data breaches, and unauthorized access.

## Common Web Security Issues

### SQL Injection

- **`Description`**
Attackers manipulate the database to execute unauthorized operations by inserting malicious SQL statements into input fields.

- **`Solutions`**
  1. Use parameterized queries or prepared statements.
  2. Avoid dynamically concatenating SQL statements.
  3. Strictly validate and escape user input.

### Cross-Site Scripting (XSS)

- **`Description`**
Attackers inject malicious scripts into the victim's browser to steal user data or hijack sessions.

- **`Solutions`**
  1. HTML encode user input (special characters like <>& should be encoded to avoid being treated as HTML tags).
  2. Use CSP (Content-Security-Policy HTTP response header to restrict which resources can be loaded).
  3. Prevent users from uploading or executing untrusted scripts.

### Cross-Site Request Forgery (CSRF)

- **`Description`**
Attackers exploit the victim's identity to send unauthorized requests to a website.

After the user logs into a trusted website, the attacker tricks the user into visiting a malicious site or clicking a malicious link through email, social media, or other means. When the user visits the malicious site, it sends a forged request to the trusted target site via JavaScript or other methods. Since the request is initiated by the victim's browser, it carries the user's authentication information (such as cookies).

- **`Solutions`**
  1. Add CSRF tokens to requests. The principle is to generate a unique token when the user requests an operation and attach it to the request. The server verifies the token to ensure the request is initiated by a trusted user, not a forged attack request.
  2. Use POST method for sensitive operations.
  3. Validate the request's origin (e.g., via Referer or Origin headers).

### Clickjacking

- **`Description`**
A deceptive attack technique where attackers construct a "hidden" malicious page to trick users into clicking elements on the page, thinking they are clicking on other content.

- **`Solutions`**
  1. Use the X-Frame-Options HTTP response header. X-Frame-Options is an HTTP response header that controls whether a page can be embedded in other pages via the `<iframe>` tag.
  2. Use the frame-ancestors directive of Content Security Policy (CSP). The frame-ancestors directive controls which sources can embed the current page.
  ```http
  Content-Security-Policy: frame-ancestors 'self';
  ```
  3. Use UI design to prevent clickjacking:
    - Mask important buttons: Add a protective layer over important interactive buttons (e.g., "pay" buttons) to prevent them from being covered by transparent malicious iframes.
    - Use challenge/confirmation steps: Require users to confirm again (e.g., via pop-ups, captchas) when performing sensitive operations to ensure the operation is voluntary.

### Data Transmission Leakage

- **`Description`**
Sensitive information (e.g., passwords, credit card numbers) is not properly protected during storage or transmission.

- **`Solutions`**
  1. Use HTTPS for encrypted communication.
  2. Encrypt sensitive data in storage.
  3. Implement strong password policies.

### File Upload Vulnerabilities

- **`Description`**
Attackers execute code or access sensitive server information by uploading malicious files. For example:
  1. Uploading a web shell to execute files on the server and view sensitive information.
  2. Uploading malicious scripts.
  3. Uploading files with malicious macros.
  4. Uploading large files to crash the server.

- **`Solutions`**
  1. Validate file extensions and MIME types.
  2. Restrict execution permissions of the upload directory.
  3. Inspect file content and rename files.

### Distributed Denial of Service (DDoS)

- **`Description`**
Attackers exhaust server resources through a large number of requests, making the service unavailable.

- **`Solutions`**
  1. Use WAF (Web Application Firewall, requires installation or purchase of corresponding software services).
  2. Deploy DDoS protection tools (requires installation or purchase of corresponding software services).
  3. Monitor traffic and rate limit.

### Insecure Deserialization

- **`Description`**
Attackers execute malicious code by exploiting deserialization vulnerabilities. The key issue with deserialization attacks is that the application fails to properly validate the source of deserialized data, leading to the deserialization of malicious data and triggering unsafe operations.

For example, in Java, deserializing a malicious object may execute dangerous commands like Runtime.getRuntime().exec(), triggering command execution attacks.

- **`Solutions`**
  1. Disable deserialization from untrusted sources.
  2. Use secure serialization formats like JSON.