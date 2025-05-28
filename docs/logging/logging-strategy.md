---
sidebar_position: 2
title: Java Logging Strategy
description: A comprehensive strategy for migrating from Log4j 1.x to modern logging frameworks
tags: [java, logging, log4j, logback, slf4j]
draft: true
last_update:
  date: 2024-05-02
---

# Java Logging Strategy

## Context

Virtually all of Two Sigma's Java code uses Log4j 1.x for logging. Log4j 1.x is no longer maintained and has reached its end of life. A single author, Ceki Gülcü, wrote Log4j, SLF4J, and Logback.

> Logback is intended as a successor to the popular log4j project. It was designed by Ceki Gülcü, log4j's founder.

Logback 1.0 was released in 2011. Other logging frameworks have been released in the time since. However, everyone agrees that Log4j 1.x is end of life and should no longer be used.

Despite several attempts, Two Sigma has not been able to migrate away from Log4j 1.x. This document proposes a plan to migrate to Logback, explains why previous attempts failed, and covers why the migration is feasible now.

## Summary of Plan

We will move from Log4j to Logback, outside the monorepo first.

To enable the move, we will move away from our proprietary json format by configuring a Datadog ingestion pipeline to ingest logs using the standard logstash naming conventions.

We will migrate usages of`TSLogger` to SLF4J. We will migrate usages of proprietary structured logging to [Mapped Diagnostic Context (MDC)](https://logback.qos.ch/manual/mdc.html).

We will replace our proprietary Log4j json appenders with the open source [logstash logback encoder](https://github.com/logfellow/logstash-logback-encoder). We will migrate AppKit applications to use [Liftwizard](https://central.sonatype.com/artifact/io.liftwizard/liftwizard-config-logging-logstash-console) for their Dropwizard logging configuration.

## Context

- Why was the migration considered too difficult before? Why did previous attempts fail?
- Why is the migration feasible now?
- Why Logback rather than another framework?
- Technical Appendices
  - the Hostile Fork
  - How does slf4j work?
  - Our open source framework: Liftwizard

## Why now?

Logback 1.0 was released in 2011, and the final release of Log4J 1.x was in 2013. We believe that engineers at Two Sigma have been discussing moving away from Log4j for at least a decade, but some of the paper trail is lost to time. At the time of writing (2024) we have uncovered serious attempts to migrate away from Log4j 1.x as early as 2016.

Reasons that the migration was too difficult, or perceived as too difficult, include:

- incompatibility between TSLogger and SLF4J, the compatibility layer
- proprietary json logging format
- fragmentation of json logging format
- difficult rollout, requiring simultaneous changes to logging applications and ingestion pipelines

The impetus for revisiting the problem now is the project to move beyond the monorepo:

- we don't want to migrate TSLogger out of the monorepo and carry monorepo baggage into the new world
- we want the development experience outside the monorepo to match industry standards
- we'll promote Logback, but users outside the monorepo should have the flexibility to choose any logging framework

Reasons that the migration is feasible now include:

- we've moved from ELK to Datadog, and its ingestion pipelines are easier to configure without requiring simultaneous changes to logging applications and ingestion pipelines
- we've laid the groundwork for flexible configuration of Dropwizard logging by open sourcing [Liftwizard](https://github.com/motlin/liftwizard)

## Industry background

A single author (Ceki Gülcü) wrote log4j 1, slf4j, and logback.

The author considers logback to be the successor of log4j, and slf4j is the compatibility layer between logging libraries.

There is a library named log4j2, also under the umbrella of the Apache foundation, but it has no affiliation with Ceki and shares no source code. It implements slf4j but the authors [recommend to not use the slf4j api](https://stackoverflow.com/a/41500347).

The Apache foundation owns the name "log4j" and its maven coordinates, and appears to have given these to another group.

In 2021, a remote code execution vulnerability was discovered in log4j 1, named Log4Shell. The Apache Foundation [posted](https://logging.apache.org/log4j/2.x/security.html#CVE-2021-44228):

> Vulnerabilities reported after August 2015 against Log4j 1 are not checked and will not be fixed. Users should upgrade to Log4j 2 to obtain security fixes.

This suggestion is not feasible since log4j 2 is a complete rewrite.

Ceki wanted to patch log4j1, but the Apache Foundation would not let him release a new version. He had to fork his own library as [reload4j](https://reload4j.qos.ch/) to release security fixes.

> Why not revive log4j 1.x within the Apache Software Foundation?

The reload4j project aims to fix the most urgent issues in log4j 1.2.17 which hasn't seen a new release since 2012. Note that on 2022-01-06 the Apache Logging PMC formally voted to reaffirm the EOL (End of Life) status of log4j 1.x. Despite our best efforts, it was quite impossible to revive the log4j 1.x project within the Apache Software Foundation.

## Technical background

The industry moved away from log4j over a decade ago. TS has been considering moving to logback for years, at least since the inception of AppKit.

Ceki designed a migration path. The reason we are stuck is that our TSLogger subclasses log4j's Logger.

## Technical Deep dive

Since the Java logging ecosystem is fractured, slf4j has a system to gather all the logs to a single framework for output. The system uses bindings and bridges.

Bindings connect slf4j to a logging framework. There should be exactly one binding on the classpath. For example if an application logs using log4j, then slf4j-log4j12 is the binding that should be on the classpath.

Bridges pipe all logs made through other frameworks back to slf4j.

> Often, some of the components you depend on rely on a logging API other than SLF4J. You may also assume that these components will not switch to SLF4J in the immediate future. To deal with such circumstances, SLF4J ships with several bridging modules which redirect calls made to log4j 1.x, JCL and java.util.logging APIs to behave as if they were made to the SLF4J API instead. The figure below illustrates the idea.

If slf4j supports `N` logging frameworks, then a properly configured classpath includes one binding and `N - 1` bridges.

