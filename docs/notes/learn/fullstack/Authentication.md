---
title: Authentication
createTime: 2025/02/12 15:12:52
permalink: /learn/fullstack/v86cHm7/
author: Jack
tags:
  - Authentication
  - JWT
  - AUTH2
description: description
---

In software systems, authentication is a critical component for ensuring that only authorized users can access resources.

Below are some common authentication schemes and their underlying principles.

## Username and Password Authentication

Users provide a username and password, which the system verifies against stored credentials.

**Principle**: 

The system compares the provided password with a hashed version stored in the database. If they match, access is granted.

## 2FA(Two-Factor Authentication)

Requires two different forms of identification to verify a user's identity.

**Principle**: 

Combines something the user knows (password) with something the user has (security token).

## MFA 

Multi-Factor Authentication. Combines two or more independent credentials: 
- what the user knows (password)
- what the user has (security token)
- what the user is (biometric verification).

**Principle**: 

Enhances security by requiring multiple forms of verification, making it harder for unauthorized users to gain access.

## SSO (Single Sign-On)

Allows users to log in once and gain access to multiple systems without being prompted to log in again at each one.

**Principle**: 

Uses a centralized authentication service to issue tokens that other systems accept as proof of authentication.

## OAuth

An open standard for access delegation, commonly used to grant websites or applications access to information on other websites without giving them passwords.

**Principle**:

Uses tokens instead of credentials. The user authorizes a third-party application to access their data, and the service provider issues an access token.

## OpenID Connect

A simple identity layer on top of the OAuth 2.0 protocol, allowing clients to verify the identity of the end-user based on the authentication performed by an authorization server.

**Principle**: 

Uses JSON Web Tokens (JWT) to represent the identity of the user.

## API Key Authentication

Uses a unique key to authenticate API requests.

**Principle**: 

The API key is passed with each request, and the server verifies it against a stored key.

## JWT(JSON Web Token)

A compact, URL-safe means of representing claims to be transferred between two parties.

**Principle**:

The token is digitally signed and contains a payload with user information. The server verifies the signature to ensure the token's authenticity.

## CA(Certificate-Based Authentication)

Uses digital certificates to authenticate users or devices.

**Principle**: 

The server verifies the certificate's validity and checks it against a trusted certificate authority (CA).

## LDAP(Lightweight Directory Access Protocol)

Used for accessing and maintaining distributed directory information services over an IP network.

**Principle**: 

Authenticates users by checking their credentials against a directory service.

## SAML (Security Assertion Markup Language)

An XML-based framework for exchanging authentication and authorization data between parties.

**Principle**: 

Uses assertions to pass user authentication and authorization information between an identity provider and a service provider.

## RADIUS (Remote Authentication Dial-In User Service)

A networking protocol that provides centralized Authentication, Authorization, and Accounting (AAA) management.

**Principle**: 

The RADIUS server authenticates users by checking their credentials against a database.