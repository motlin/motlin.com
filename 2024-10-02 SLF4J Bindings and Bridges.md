# SLF4J Bindings and Bridges

SLF4J is the Simple Logging Facade for Java. It has a simple API, but it delegates the actual work of logging to other frameworks.

SLF4J provides bindings to connect to a specific logging framework. It is expected that an application will choose a single library and have a single binding on the classpath.

SLF4J provides bridges to gather logs from other logging frameworks. For example, if you want to configure your application to log using Logback, but one of your transitive dependencies uses commons-logging, you can use the SLF4J commons-logging bridge to redirect the logs from commons-logging back to SLF4J, and then onto Logback. An application may have several b
