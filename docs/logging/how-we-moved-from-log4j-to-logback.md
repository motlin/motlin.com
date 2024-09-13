---
sidebar_position: 2
title: Moving from Log4j to Logback
description: A detailed guide on migrating from Log4j to Logback
tags: [java, logging, log4j, logback, migration]
last_update:
  date: 2024-07-10
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

Logback supports all the same features as Log4J, so setting up an equivalent configuration is


A single author, Ceki Gülcü, wrote Log4j, SLF4J, and Logback.

> Logback is intended as a successor to the popular Log4j project. It was designed by Ceki Gülcü, Log4j's founder.

Logback 1.0 was released in 2011. Other logging frameworks have been released in the time since. However, everyone agrees that Log4j 1.x is end of life and should no longer be used.

Despite several attempts, Two Sigma has not been able to migrate away from Log4j 1.x. This document proposes a plan to migrate to Logback, explains why previous attempts failed, and covers why the migration is feasible now.

## Summary of Plan

We will move from Log4j to Logback, outside the monorepo first.

To enable the move, we will move away from our proprietary json format by configuring a Datadog ingestion pipeline to ingest logs using the standard logstash naming conventions.

￼We will migrate usages of￼`TSLogger` to SLF4J. We will migrate usages of proprietary structured logging to [Mapped Diagnostic Context (MDC)](https://logback.qos.ch/manual/mdc.html).

We will replace our proprietary Log4j json appenders with the open source [logstash logback encoder](https://github.com/logfellow/logstash-logback-encoder). We will migrate AppKit applications to use [Liftwizard](https://central.sonatype.com/artifact/io.liftwizard/liftwizard-config-logging-logstash-console) for their Dropwizard logging configuration.

## Context

An engineer named Ceki Gülcü wrote Log4j in 2001. It was quickly followed by Apache Commons Logging (JCL) in 2002, a logging abstraction API that allows an application to use a consistent logging API independent of the underlying framework.

However, Log4j was deemed too slow, had backward compatibility problems from version to version, and commons logging had design decisions that seemed pretty broken at the time. The internet was awash with complaints that Java logging was a complete disaster.

So Ceki started over, and created SLF4J as the abstraction layer and Logback as the concrete implementation in 2005-2006.

> Logback is intended as a successor to the popular log4j project, picking up where log4j 1.x leaves off.

SLF4J 1.0 was released on May 8, 2006, Logback 1.0 was released in 2011, and Apache declared Log4j 1.x "End of life" on August 5, 2015, though Ceki declared it end of life two years earlier in 2013.

## Previous Attempts at Two Sigma

We first deployed a Logback-based application inside Two Sigma in December 2015. We deployed it with structured json logging, and later adopted the [logstash logback encoder](https://github.com/logstash/logstash-logback-encoder).

We also attempted to move several other services from Log4j to Logback but ran into problems. First, we use Log4j for unit tests, and it wasn't feasible to change the test configuration. Second, we migrated usages of `TSLogger` to SLF4J, and removed the word `Logger` from the variable name. The plan was for fields to be named `LOG` instead of `LOGGER`. This made code reviews tedious.

We had hoped for Log4j to naturally die out, as dependencies upgraded from Log4j to SLF4J. However, most projects stalled with whatever logging framework they were using. For example, CXF still uses JCL, and Jetty still uses its own logging framework. Plus, we haven't upgraded most dependencies because they don't use a monorepo-compatible build.

In another failed attempt in 2020, we created facades to abstract APIs in two packages that used Log4j. We tried to provide a different implementation when built with bazel, and it worked. However, it was challenging to maintain in the monorepo, and the two packages were later upgraded to newer versions using our standard maven-based build.

## Why now?

### Log4j is a security concern

The Log4shell vulnerability in December 2021 was a serious security concern in Log4j 2.x. While Log4j 1.x wasn't vulnerable, the security concern highlighted the need to maintain current logging infrastructure. We will be better prepared for the next vulnerability if we can move faster.

### No more conversions

We will not convert `TSLogger` to SLF4J. Instead, we will keep using `TSLogger` as the API. This does mean we won't be able to use some of the features of SLF4J. However, the migration will be less risky.

### Common json format

Most AppKit services use custom Log4j appenders that emit json-formatted logs for consumption by Datadog. The logs use a naming convention that is specific to Two Sigma. The open-source world uses different naming conventions based on logstash. We have written Datadog parsers in a programming language we invented for the purpose so that Datadog can consume both formats. This allows applications using either format to be ingested by Datadog.

### Applications outside the monorepo

All applications outside the monorepo now use Logback. We've created the initial applications from scratch using Logback. We've also migrated applications that were previously using Log4j.

### MDC

We've been able to convert structured logging that used proprietary APIs to use [Mapped Diagnostic Context (MDC)](https://logback.qos.ch/manual/mdc.html). MDC is also a feature of Log4j, though we haven't been able to rely on it. The ability to migrate structured logging is a significant advantage.

## Libraries

There is no ability in Java or the JVM to restrict a library to only use a specific logging API. All we can do is depend on SLF4J and allow the application to bind to its logging framework of choice.

## Applications

The monorepo uses Log4j, and it doesn't appear feasible to support using multiple frameworks for different applications at the same time.

So we support applications outside the monorepo first. This has proven to be a successful strategy. Applications that aren't AppKit based are easy, they can use logback's configuration files. For AppKit applications, we now use Liftwizard's [configuration](https://central.sonatype.com/artifact/io.liftwizard/liftwizard-config-logging-logstash-console).

Once we have sufficient experience with applications outside the monorepo, we'll know which patterns we can rely on in the monorepo. Then we will migrate them all at once.
