# SLF4J Bindings and Bridges

SLF4J is the Simple Logging Facade for Java. It has a simple API, but it delegates the actual work of logging to other frameworks.

SLF4J bindings connect SLF4J to a specific logging framework. SLF4J bridges hijack logs from other logging frameworks and redirect them to SLF4J. If there are N logging frameworks, then a properly configured classpath includes **one binding and N - 1 bridges**.

For example, if you want to log using Log4J 1.x, your classpath will contain:

- SLF4J API, in the jar `slf4j-api`
- Log4J 1.x, in the jar `log4j`
- SLF4J binding for Log4J 1.x, in the jar `slf4j-log4j12`
- All SLF4J bridges other than the one for Log4J 1.x, in jars like `jcl-over-slf4j` and `jul-to-slf4j`, but not `slf4j-log4j12`

## Common Problems

### Multiple Bindings

Problem: When multiple bindings are on the classpath, SLF4J picks the first one on the classpath, which may not be the one you want.

Example error message:
```
SLF4J: Class path contains multiple SLF4J bindings.
SLF4J: Found binding in [jar:file:/path/to/slf4j-log4j12-1.7.30.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: Found binding in [jar:file:/path/to/slf4j-simple-1.7.30.jar!/org/slf4j/impl/StaticLoggerBinder.class]
SLF4J: See http://www.slf4j.org/codes.html#multiple_bindings for an explanation.
```

Solution: Remove all but one SLF4J binding from your classpath. Ensure that only the binding for your chosen logging framework is present.

### Zero Bindings

Problem: No SLF4J binding on the classpath results in no actual logging output.

Example error message:
```
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
```

Solution: Add the appropriate SLF4J binding for your chosen logging framework to your classpath.  When in doubt about which one to choose, pick `logback-classic`.

### Missing Bridges

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

However, this approach can cause problems if libraries do anything fancier than logging with these logging libraries. For example, if a library tries to use inheritance and extend Log4j 1.x's Logger class, then you can get linkage error like:
