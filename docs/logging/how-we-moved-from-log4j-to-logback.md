---
sidebar_position: 3
title: Moving from Log4j to Logback
description: Step-by-step guide for migrating Java applications from Log4j to Logback
tags: [java, logging, log4j, logback]
draft: true
last_update:
  date: 2024-05-02
---

# Moving from Log4j to Logback

## Context

Virtually all of Two Sigma's Java code uses Log4j 1.x for logging. Log4j 1.x is no longer maintained and has reached its end of life. Logback, the spiritual successor to Log4j was released in 2011, and Log4j was declared end of life in 2013. We've attempted to switch several times, but have not been able to do so.

We recently migrated some Java applications from Log4j to Logback as we migrated them out of the monorepo. We made improvements to the logging configuration that will make it easier to migrate the rest of our Java applications, and we will migrate our first applications in the monorepo soon.

## How to Migrate Applications

To migrate an application from Log4j to Logback, inside or outside the monorepo, follow these steps:

- Remove Log4j from the classpath, and add SLF4J and logback.
- Replace usages of TSLogger with SLF4J.
- Replace Log4j configuration with `logback.xml` or Dropwizard configuration.
- Remove `BaseInit.init()` or disable Log4j initialization with system properties.

### Replace TSLogger with SLF4J

First replace usages of TSLogger's methods `debug(String)`, `info(String)`, `warn(String)`, `error(String)` with the equivalents in SLF4J. At this point, many applications will be done.

Any usages of the "f" methods like `infof` will need to be replaced with SLF4J parameterized logging. For example, replace `LOGGER.infof("Hello, %s", name)` with `LOGGER.info("Hello, {}", name)`. IDEs have helpful inspections that will warn if the template strings aren't valid.

Any remaining usages of TSLogger must be eliminated. For example, TSLogger has a `clear()` method that delegates to Log4J internal APIs. Other logging frameworks have no equivalent.

### Replace Log4j Configuration

Logback supports all the same features as Log4J, so setting up an equivalent configuration is straightforward.

A single author, Ceki Gülcü, wrote Log4j, SLF4J, and Logback.

> Logback is intended as a successor to the popular Log4j project. It was designed by Ceki Gülcü, Log4j's founder.

Logback 1.0 was released in 2011. Other logging frameworks have been released in the time since. However, everyone agrees that Log4j 1.x is end of life and should no longer be used.

Despite several attempts, Two Sigma has not been able to migrate away from Log4j 1.x. This document proposes a plan to migrate to Logback, explains why previous attempts failed, and covers why the migration is feasible now.

## Summary of Plan

We will move from Log4j to Logback, outside the monorepo first.

To enable the move, we will move away from our proprietary json format by configuring a Datadog ingestion pipeline to ingest logs using the standard logstash naming conventions.

We will migrate usages of`TSLogger` to SLF4J. We will migrate usages of proprietary structured logging to [Mapped Diagnostic Context (MDC)](https://logback.qos.ch/manual/mdc.html).

We will replace our proprietary Log4j json appenders with the open source [logstash logback encoder](https://github.com/logfellow/logstash-logback-encoder). We will migrate AppKit applications to use [Liftwizard](https://central.sonatype.com/artifact/io.liftwizard/liftwizard-config-logging-logstash-console) for their Dropwizard logging configuration.

## Industry background

A single author (Ceki Gülcü) wrote Log4j 1, SLF4J, and logback.

The author considers logback to be the successor of Log4j, and SLF4J is the compatibility layer between logging libraries.

There is a library named Log4j2, also under the umbrella of the Apache foundation, but it has no affiliation with Ceki and shares no source code. It implements SLF4J but the authors [recommend to not use the SLF4J api](https://stackoverflow.com/a/41500347).

The Apache foundation owns the name "Log4j" and its maven coordinates, and appears to have given these to another group.

In 2021, a remote code execution vulnerability was discovered in Log4j 1, named Log4Shell. The Apache Foundation [posted](https://logging.apache.org/Log4j/2.x/security.html#CVE-2021-44228):

> Vulnerabilities reported after August 2015 against Log4j 1 are not checked and will not be fixed. Users should upgrade to Log4j 2 to obtain security fixes.

This suggestion is not feasible since Log4j 2 is a complete rewrite.

Ceki wanted to patch Log4j1, but the Apache Foundation would not let him release a new version. He had to fork his own library as [reload4j](https://reload4j.qos.ch/) to release security fixes.

> Why not revive Log4j 1.x within the Apache Software Foundation?

The reload4j project aims to fix the most urgent issues in Log4j 1.2.17 which hasn't seen a new release since 2012. Note that on 2022-01-06 the Apache Logging PMC formally voted to reaffirm the EOL (End of Life) status of Log4j 1.x. Despite our best efforts, it was quite impossible to revive the Log4j 1.x project within the Apache Software Foundation.

## Technical Deep dive

Since the Java logging ecosystem is fractured, SLF4J has a system to gather all the logs to a single framework for output. The system uses bindings and bridges.

Bindings connect SLF4J to a logging framework. There should be exactly one binding on the classpath. For example if an application logs using Log4j, then SLF4J-Log4j12 is the binding that should be on the classpath.

Bridges pipe all logs made through other frameworks back to SLF4J.

> Often, some of the components you depend on rely on a logging API other than SLF4J. You may also assume that these components will not switch to SLF4J in the immediate future. To deal with such circumstances, SLF4J ships with several bridging modules which redirect calls made to Log4j 1.x, JCL and java.util.logging APIs to behave as if they were made to the SLF4J API instead. The figure below illustrates the idea.

If SLF4J supports `N` logging frameworks, then a properly configured classpath includes one binding and `N - 1` bridges.

