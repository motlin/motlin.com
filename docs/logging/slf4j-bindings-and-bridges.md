---
sidebar_position: 5
title: SLF4J Bindings and Bridges
description: Overview of SLF4J bindings and bridges
tags: [java, logging, slf4j]
last_update:
  date: 2024-10-08
---

# SLF4J Bindings and Bridges

[SLF4J](https://slf4j.org/) is the Simple Logging Facade for Java. Here we explain its most complex parts, [bindings](https://www.slf4j.org/manual.html#swapping), and [bridges](https://www.slf4j.org/legacy.html).

[SLF4J bindings](https://www.slf4j.org/manual.html#swapping) connect SLF4J to a specific logging framework at runtime. If we use SLF4J, we need exactly one binding on the classpath.

[SLF4J bridges](https://www.slf4j.org/legacy.html) hijack logs sent to other logging frameworks and redirect them to SLF4J.

If there are N logging frameworks in the ecosystem, then a properly configured classpath includes **one binding and N - 1 bridges**.

Let's see how this works:

- The application logs to the SLF4J interface by calling methods on SLF4J Logger instances
- A library used by the application logs to Log4j 1.x by calling methods on Log4j Logger instances
- Another library logs to Jakarta Commons Logging (JCL) by calling methods on JCL Log instances
- All of these logs end up in the same logging framework, say Logback
