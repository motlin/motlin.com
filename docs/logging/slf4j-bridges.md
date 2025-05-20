---
sidebar_position: 5
title: SLF4J Bridges
description: Understanding how SLF4J bridges redirect logs from other frameworks
tags: [java, logging, slf4j]
draft: true
last_update:
  date: 2024-05-02
---

# SLF4J Bridges

[SLF4J](https://slf4j.org/) is the Simple Logging Facade for Java. Here we discuss its most complex parts, [bridges](https://www.slf4j.org/legacy.html).

[SLF4J bridges](https://www.slf4j.org/legacy.html) hijack logs sent to other logging frameworks and redirect them to SLF4J.

If there are N logging frameworks in the ecosystem, then a properly configured classpath includes **one binding and N - 1 bridges**.

For example, if you want to log using Log4J 1.x, your classpath will contain:

- SLF4J API, in the jar `slf4j-api`
- Log4J 1.x, in the jar `log4j`
- SLF4J binding for Log4J 1.x, in the jar `slf4j-log4j12`
- All SLF4J bridges (except for the Log4J 1.x bridges) in the jars `jcl-over-slf4j` and `jul-to-slf4j` (but not `slf4j-log4j12`)

