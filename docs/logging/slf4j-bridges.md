---
sidebar_position: 4
title: SLF4J Bridges
description: Understanding SLF4J bridges and how they redirect logs from other frameworks
tags: [java, logging, slf4j]
last_update:
  date: 2024-10-08
---

# SLF4J Bridges

[SLF4J](https://slf4j.org/) is the Simple Logging Facade for Java. Here we discuss its most complex parts, [bindings](https://www.slf4j.org/manual.html#swapping), and [bridges](https://www.slf4j.org/legacy.html).

[SLF4J bridges](https://www.slf4j.org/legacy.html) hijack logs sent to other logging frameworks and redirect them to SLF4J.

If there are N logging frameworks in the ecosystem, then a properly configured classpath includes **one binding and N - 1 bridges**.
