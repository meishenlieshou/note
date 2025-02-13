---
title: CI&CD pipelines
createTime: 2025/02/13 14:17:52
permalink: /learn/build/q2uqL1id/
author: Jack
tags:
  - CI/CD
  - Jenkins
  - GitHub Actions
  - Azure DevOps
description: description
---

CI/CD pipelines (Continuous Integration and Continuous Delivery/Deployment pipelines) are a set of automated processes and tools that help developers deliver code changes more frequently, reliably, and efficiently. They are a core part of modern software development practices, enabling teams to build, test, and deploy applications with minimal manual intervention.

## What is CI/CD?

### CI (Continuous Integration)

- Developers frequently merge their code changes into a shared repository (e.g., GitHub, GitLab).
- Each merge triggers an automated build and testing process to catch issues early.

### CD (Continuous Delivery/Deployment):

- **Continuous Delivery**: Code changes are automatically tested and prepared for release, but deployment to production is manual.
- **Continuous Deployment**: Code changes are automatically deployed to production after passing all tests.

## Key Components of a CI/CD Pipeline

### Source Control

Code is stored in a version control system (e.g., Git). Changes are pushed to branches, and pull requests are used to merge code into the main branch.

### Build Automation

The pipeline compiles the code and packages it into an executable format (e.g., a Docker image, JAR file, or binary).

### Automated Testing

Unit tests, integration tests, and end-to-end tests are run to ensure the code works as expected.

### Artifact Repository

Built artifacts (e.g., Docker images, binaries) are stored in a repository (e.g., Docker Hub, Nexus) for later use.

### Deployment Automation

Code is automatically deployed to staging or production environments.

### Monitoring and Feedback

After deployment, the pipeline monitors the application and provides feedback (e.g., logs, metrics, alerts).

## How a CI/CD Pipeline Works

1. **Developer Pushes Code**

A developer makes changes and pushes them to a shared repository.

2. **Trigger the Pipeline**

The push triggers the CI/CD pipeline (e.g., via a webhook).

3. **Run Automated Tests**

The pipeline runs unit tests, integration tests, and other checks to validate the code.

4. **Build Artifacts**

If tests pass, the pipeline builds the application (e.g., compiles code, creates a Docker image).

5. **Deploy to Staging**

The pipeline deploys the application to a staging environment for further testing.

6. **Deploy to Production**

If all tests pass, the pipeline deploys the application to production (in Continuous Deployment) or waits for manual approval (in Continuous Delivery).

7. **Monitor and Notify**

The pipeline monitors the application and notifies the team of any issues.

## Popular CI/CD Tools

### Jenkins

An open-source automation server with a large plugin ecosystem.

### GitHub Actions

CI/CD workflows directly integrated into GitHub.

### GitLab CI/CD

Integrated CI/CD tools within GitLab.

### Azure DevOps

A suite of tools for CI/CD and project management.

### AWS CodePipeline

A fully managed CI/CD service on AWS.