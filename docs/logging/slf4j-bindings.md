---
sidebar_position: 3
title: SLF4J Bindings
description: Understanding SLF4J bindings and how they connect SLF4J to logging frameworks
tags: [java, logging, slf4j]
last_update:
  date: 2024-10-02
---

# SLF4J Bindings

[SLF4J](https://slf4j.org/) is the _Simple_ Logging Facade for Java. Here we discuss one of its most _complex_ parts, [bindings](https://www.slf4j.org/manual.html#swapping).

SLF4J bindings, also called providers, connect SLF4J to a specific logging framework at runtime. Binding jars contain:

- Adapter classes that implement the SLF4J API by wrapping the logging framework's classes.
- A registration mechanism that allows SLF4J to discover the binding at runtime.

Let's say you want to log using Reload4J (also known as Log4J 1.x) through the SLF4J API. Your classpath will contain:

- The SLF4J API, in the jar `slf4j-api`. This jar contains the interface `Logger`, and the class `LoggerFactory` which contains the code for dynamic discovery of bindings.
- The Reload4J implementation, in the jar `reload4j`. This jar contains the concrete `org.apache.log4j.Logger` class, which does _not_ implement SLF4J's `org.slf4j.Logger` interface.
- The SLF4J binding for Reload4J, in the jar `slf4j-reload4j`. This jar contains the adapter classes and the registration mechanism.

Let's look inside that third jar in more detail.

## Adapter Classes

Here's a simple program that creates one logger and logs a message:

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggingExample
{
    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingExample.class);

    public static void main(String[] args)
    {
        LOGGER.info("Hello, {}", "World!");
    }
}
```

Let's start with the log statement. The SLF4J API we've called is `Logger#info(String format, Object arg)`. The first parameter `format` is a template String.

If we've bound SLF4J to Reload4J, then the runtime type of `LOGGER` is `org.slf4j.impl.Reload4jLoggerAdapter` which lives in `slf4j-reload4j.jar`.

This adapter wraps a `logger` field with type `org.apache.log4j.Logger`, which lives in `reload4j.jar`. When we call the `info()` method, the adapter does the following:

- It checks if info logging is enabled by delegating to `logger.isInfoEnabled()`.
- It performs message formatting by calling `org.slf4j.helpers.MessageFormatter.basicArrayFormat("Hello, {}", {"World!"})`. The `MessageFormatter` utility lives in `slf4j-api`.
- It actually logs by delegating to `logger.log(String callerFQCN, Priority level, Object message, Throwable t)` with the arguments:
  - `callerFQCN` = `org.slf4j.helpers.AbstractLogger`
  - `level` = `INFO`
  - `message` = `Hello, World!`
  - `t` = `null`

## Adapter Implementation Takeaways

I have two takeaways from this example.

First, the adapter is doing real work - the template formatting - to adapt the SLF4J API to the underlying logging framework.

Second, there is no way to pass `Object` messages to the underlying logging framework through SLF4J. Reload4J's public API consistently takes messages as `Object`. But SLF4J always performs template formatting and passes along a `String`. Deep inside Reload4J, there is logic to check if the message is not a `String` and to render it as a `String`, but this code path is not exercised by SLF4J.

## LoggerFactory Initialization

How does SLF4J configure itself, so that `LoggerFactory.getLogger(String)` returns the correct logger for the underlying logging framework?

When we call `LoggerFactory.getLogger(String)`, SLF4J will check if it has been initialized, and will perform initialization if not.

SLF4J performs initialization differently in 1.x and 2.x. We'll cover both, since the initialization mechanism affects error messages that you may see.

### SLF4J 2.x Initialization

SLF4J 2.x uses the `ServiceLoader` API to find the binding at runtime. The [`ServiceLoader`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ServiceLoader.html) API is a standard Java mechanism for finding implementations of a specific interface on the classpath. If you're already familiar with it, you can skip this section.

`ServiceLoader` is like a lightweight dependency injection system that only does one thing: find implementations of a specific interface on the classpath.

`ServiceLoader` uses a simple file-based mechanism to register implementations for discovery. The name of the file is `META-INF/services/<interface name>`. The contents contain fully qualified class names, one per line.

In this case, we're looking for implementations of the SLF4J interface `SLF4JServiceProvider`, so jars that register adapters must contain a file named `META-INF/services/org.slf4j.spi.SLF4JServiceProvider`.

The contents of these files are the fully qualified class names of the concrete providers. For example, the jar `slf4j-reload4j-2.0.16.jar` contains a file named `META-INF/services/org.slf4j.spi.SLF4JServiceProvider` with a single line: `org.slf4j.reload4j.Reload4jServiceProvider`. And `slf4j-simple-2.0.16.jar` contains a file with a single line: `org.slf4j.simple.SimpleServiceProvider`.

When SLF4J initializes, it calls `ServiceLoader.load(SLF4JServiceProvider.class, classLoaderOfLoggerFactory)` to find all the providers on the classpath. We can run the same code ourselves to see what SLF4J sees:

```java
public static void main(String[] args)
{
    ServiceLoader<SLF4JServiceProvider> serviceLoader = ServiceLoader.load(SLF4JServiceProvider.class);
    Iterator<SLF4JServiceProvider> iterator = serviceLoader.iterator();
    while (iterator.hasNext())
    {
        SLF4JServiceProvider serviceProvider = iterator.next();
        LOGGER.info("SLF4JServiceProvider: {}", serviceProvider.getClass().getName());
    }
}
```

SLF4J expects to find exactly one provider. If it finds multiple providers, it logs a warning and uses the first one returned by the iterator. For example, if you have `slf4j-simple` and `slf4j-reload4j` on the classpath, SLF4J will log a warning like:

```


When SLF4J initializes, it calls `ServiceLoader.load(SLF4JServiceProvider.class, classLoaderOfLoggerFactory)` to find all the providers on the classpath. It then logs a warning if it finds multiple providers.



SLF4J had a mechanism based on the `StaticLoggerBinder` class, but since version 2.x, it uses the `ServiceLoader` API. The `ServiceLoader` API is a standard Java mechanism for finding implementations of a specific interface on the classpath.



We'll explore how bindings work by investigating perhaps the most common SLF4J problem: multiple bindings on the classpath.

Let's say you have `slf4j-simple` and `slf4j-log4j12` on the classpath. SLF4J will log a warning like:

```
SLF4J(W): Class path contains multiple SLF4J providers.
SLF4J(W): Found provider [org.slf4j.simple.SimpleServiceProvider@17f052a3]
SLF4J(W): Found provider [org.slf4j.reload4j.Reload4jServiceProvider@2e0fa5d3]
SLF4J(W): See https://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J(I): Actual provider is of type [org.slf4j.simple.SimpleServiceProvider@17f052a3]
```

SLF4J is warning us that it found two providers on the classpath and picked the first one in the list. SimpleServiceProvider is the provider for `slf4j-simple`, and Reload4jServiceProvider is the provider for `slf4j-log4j12`.

Let's see how SLF4J produces this warning.

- We ask for a logger, with code like `LoggerFactory.getLogger(LoggingExample.class)`
- SLF4J will see that it's uninitialized and call `LoggerFactory.bind()`
- SLF4J will check to see if we've set the system property `slf4j.provider` to a specific provider.
- We haven't, so SLF4J will proceed to `LoggerFactory.getServiceLoader()` and will invoke `ServiceLoader.load(SLF4JServiceProvider.class, classLoaderOfLoggerFactory)`.

## Java's `ServiceLoader`

The [`ServiceLoader`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/ServiceLoader.html) API is a standard Java mechanism. If you're already familiar with it, you can skip this section.

`ServiceLoader` is like a lightweight dependency injection system that only does one thing: find implementations of a specific interface on the classpath. In this case, we're looking for implementations of the SLF4J interface `SLF4JServiceProvider`.


This example code demonstrates how to use `ServiceLoader` to find all the providers on the classpath, and is similar to what SLF4J does:

```java
public static void main(String[] args)
{
    ServiceLoader<SLF4JServiceProvider> serviceLoader = ServiceLoader.load(SLF4JServiceProvider.class);
    Iterator<SLF4JServiceProvider> iterator = serviceLoader.iterator();
    while (iterator.hasNext())
    {
        SLF4JServiceProvider serviceProvider = iterator.next();
        LOGGER.info("SLF4JServiceProvider: {}", serviceProvider.getClass().getName());
    }
}
```

## Order of Bindings

The iterator returned by the `ServiceLoader` returns the implementations in the order they were found on the classpath. In our example, the order is `SimpleServiceProvider` and `Reload4jServiceProvider`, because in my maven build I declared the dependency on `slf4j-simple` first and `slf4j-log4j12` second.

When SLF4J finds multiple providers, it logs a warning and proceeds to use the first one in the list.

## StaticLoggerBinder

SLF4J has been using the `ServiceLoader` mechanism since version 2.x. In 1.7.x and earlier, it used a mechanism based on the `StaticLoggerBinder` class, but all the other details are similar.

Both `slf4j-simple` and `slf4j-reload4j` contained a class named `org.slf4j.impl.StaticLoggerBinder`.

`org.slf4j.LoggerFactory.bind()` called `StaticLoggerBinder.getSingleton()` to perform the actual binding.

`org.slf4j.LoggerFactory.bind()` called `ClassLoader.getSystemResources("org/slf4j/impl/StaticLoggerBinder.class")` to find if there were no bindings or multiple bindings. If there were multiple, the warning looked like:

```
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/Users/Craig/.m2/repository/org/slf4j/slf4j-simple/1.7.36/slf4j-simple-1.7.36.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/Users/Craig/.m2/repository/org/slf4j/slf4j-reload4j/1.7.36/slf4j-reload4j-1.7.36.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
SLF4J: Actual binding is of type [org.slf4j.impl.SimpleLoggerFactory]
```

## Missing Bridges

Problem: Logs from other frameworks are not being captured by SLF4J.

Solution: Add the necessary SLF4J bridges to your classpath. If you are using Logback, then add all three common bridges: `jcl-over-slf4j`, `log4j-over-slf4j`, and `jul-to-slf4j`.

### Clashing Binding and Bridge

Problem: Having both a binding and a bridge for the same framework can cause circular dependencies and unexpected behavior.

Example: Having both `slf4j-log4j12` (binding) and `log4j-over-slf4j` (bridge) on the classpath results in an error like:

```
SLF4J: Detected both log4j-over-slf4j.jar AND slf4j-log4j12.jar on the class path, preempting StackOverflowError.
SLF4J: See also http://www.slf4j.org/codes.html#log4jDelegationLoop for more details.
Exception in thread "main" java.lang.ExceptionInInitializerError
    ...
Caused by: java.lang.IllegalStateException: Detected both log4j-over-slf4j.jar AND slf4j-log4j12.jar on the class path, preempting StackOverflowError. See also http://www.slf4j.org/codes.html#log4jDelegationLoop for more details.
    at org.slf4j.impl.Log4jLoggerFactory.<clinit>(Log4jLoggerFactory.java:54)
    ...
```

Solution: Remove either the binding or the bridge, depending on whether you want to use the framework directly or through SLF4J. For example, if you are logging using Logback, you'd remove `slf4j-log4j12` and keep `log4j-over-slf4j`.

## How Bindings Work

SLF4J bindings work by implementing the `org.slf4j.impl.StaticLoggerBinder` class. This class is not part of the SLF4J API, but SLF4J looks for it at runtime using reflection. When SLF4J needs to create a logger, it calls the `getLoggerFactory()` method of the `StaticLoggerBinder`, which returns an implementation of `ILoggerFactory` specific to the bound logging framework.

The binding then translates SLF4J logging calls into the appropriate calls for the underlying logging framework. For example, the Log4J 1.x binding translates SLF4J's `logger.info("Hello {}", name)` into Log4J's `logger.info("Hello " + name)`.

## How Bridges Work

SLF4J bridges work by replacing the original logging framework's classes with implementations that redirect to SLF4J. These replacement classes have the exact same fully qualified names as the original classes, but they delegate all logging calls to SLF4J loggers. This allows existing code that uses other logging frameworks to seamlessly integrate with SLF4J without requiring any code changes.

For example, the `jcl-over-slf4j` bridge replaces Apache Commons Logging's `org.apache.commons.logging.LogFactory` and `org.apache.commons.logging.Log` classes with versions that create and use SLF4J loggers instead of JCL loggers.

However, this approach can cause problems if libraries do anything fancier than logging with these logging libraries. For example, if a library tries to use inheritance and extend Log4j 1.x's Logger class, then you can get linkage errors like:

## Conclusion

My hope is that by understanding how SLF4J bindings and bridges work, you'll avoid common pitfalls and unexpected behavior.
