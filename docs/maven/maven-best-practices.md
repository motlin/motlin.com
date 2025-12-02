---
sidebar_position: 1
title: Maven Best Practices
description: Essential best practices for configuring Maven projects
tags: [java, maven]
last_update:
  date: 2024-05-13
---

# Maven Best Practices

## Specify a parent pom

There are a number of best practices that can be handled at once by inheriting from a parent pom that takes care of them all. The following sections cover resource encodings and reproducible builds. As an alterantive, declare a parent pom on `liftwizard-minimal-parent` which handles all of these.

```xml
<parent>
    <groupId>io.liftwizard</groupId>
    <artifactId>liftwizard-minimal-parent</artifactId>
    <version>${liftwizard.version}</version>
</parent>
```

## Resource encoding

If you don't specify a resource encoding, you may encounter a warning from `maven-resources-plugin` like: `[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!`

You can fix it by [specifying a character encoding scheme](https://maven.apache.org/plugins/maven-resources-plugin/examples/encoding.html#specifying-a-character-encoding-scheme).

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
</properties>
```

This will become unnecessary starting with Maven 4.x.

## Reproducible builds

> A build is reproducible if given the same source code, build environment and build instructions, any party can recreate bit-by-bit identical copies of all specified artifacts.

You can [enable Reproducible Builds mode for plugins](https://maven.apache.org/guides/mini/guide-reproducible-builds.html#how-do-i-configure-my-maven-build) by specifying the following property.

```xml
<properties>
    <project.build.outputTimestamp>2000-01-01T00:00:00Z</project.build.outputTimestamp>
</properties>
```

You will need to run `mvn artifact:check-buildplan` and `mvn verify artifact:compare` as described in the guide to ensure builds are reproducible.

## Default Goal

You can specify the default goal to run when you run `mvn` without any arguments.

```xml
<defaultGoal>verify</defaultGoal>
```

`verify` is a better choice than `install` in the presence of concurrent builds that may write to `.m2/repository` simultaneously.

`verify` is a better choice than `clean verify` because `clean` is a destructive operation, users may not expect it to be run by default, and it's easy to run `mvn clean` when you need it.

## Plugins which are bound and enabled by default

Maven builds are configured by binding plugins to maven's [lifecycle phases](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#default-lifecycle).

Maven binds [some plugins](https://maven.apache.org/ref/3.9.6/maven-core/default-bindings.html#plugin-bindings-for-jar-packaging) to the ["main" phases](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#packaging), even if you don't declare any plugins in your `pom.xml`.

The versions of the default plugins changes between maven versions, and even the list of plugins grows over time. Maven 3.9.6 binds:

| Plugin                 | Version | Phase         |
| ---------------------- | ------- | ------------- |
| maven-resources-plugin | 3.3.1   | resources     |
| maven-compiler-plugin  | 3.11.0  | compile       |
| maven-resources-plugin | 3.3.1   | testResources |
| maven-compiler-plugin  | 3.11.0  | testCompile   |
| maven-surefire-plugin  | 3.2.2   | test          |
| maven-jar-plugin       | 3.3.0   | jar           |
| maven-install-plugin   | 3.1.1   | install       |
| maven-deploy-plugin    | 3.1.1   | deploy        |

We can support reproducible builds even with different versions of maven as long as all the plugin versions are the same. To enable plugin consistency across a team, we specify versions of the plugins in the parent pom.
