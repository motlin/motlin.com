---
sidebar_position: 6
title: SLF4J Bindings and Bridges
description: Overview of the relationship between SLF4J bindings and bridges
tags: [java, logging, slf4j]
---

# SLF4J Bridges

[SLF4J](https://slf4j.org/) is the Simple Logging Facade for Java. Here we discuss one of its most complex parts, [bridges](https://www.slf4j.org/legacy.html).

SLF4J bindings, also called providers, connect SLF4J to a specific logging framework at runtime.

SLF4J bridges hijack logs sent to other logging frameworks and redirect them to SLF4J.

If there are N logging frameworks in the ecosystem, then a properly configured classpath includes **one binding and N - 1 bridges**.

For example, if you want to log using Log4J 1.x, your classpath will contain:

- SLF4J API, in the jar `slf4j-api`
- Log4J 1.x, in the jar `log4j`
- SLF4J binding for Log4J 1.x, in the jar `slf4j-log4j12`
- All SLF4J bridges (except for the Log4J 1.x bridges) in the jars `jcl-over-slf4j` and `jul-to-slf4j` (but not `slf4j-log4j12`)

:::tip Related Content
- [SLF4J Bindings](./slf4j-bindings.md) - How SLF4J bindings work to connect logging APIs
- [SLF4J Bridges](./slf4j-bridges.md) - Detailed explanation of SLF4J bridges
- [Logging Strategy](./logging-strategy.md) - Java logging migration strategies
- [How we moved from Log4j to Logback](./how-we-moved-from-log4j-to-logback.md) - Practical guide for migrating frameworks
:::