---
sidebar_position: 3
title: Additional IntelliJ Live Templates for Java
description: Custom live templates to improve your productivity in IntelliJ IDEA.
tags: [intellij, ide, java]
last_update:
  date: 2022-11-06
---

# Additional IntelliJ Live Templates for Java

Use [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) to insert common constructs into your code, such as loops, conditions, various declarations, or print statements.

For example, the built-in template called `psvm` inserts a main method.

[Postfix completions](./intellij-postfix-completions.md) offer a different approach to code generation that reduces backward caret jumps.

![intellij-live-psvm](/img/intellij/intellij-live-psvm.gif)

Here are a few live templates I've added for Java. They are available for download [here](https://github.com/motlin/jetbrains-settings/blob/main/live-templates.xml).

To import them you can just copy the xml definition(s) into your clipboard, navigate to `Preferences | Editor | Live Templates`, and paste.

## Log a value to LOGGER.info

IntelliJ has a built-in template for printing a value to System.out, invoked using `soutv`.

Here's a similar one called `logv` for loging using [slf4j](https://www.slf4j.org/).

![intellij-live-logv](/img/intellij/intellij-live-logv.gif)

I created `logv` by copying `soutv` and editing it. But you can just copy the xml definition.

```xml
<template name="logv" value="$LOGGER$.info(&quot;$EXPR_COPY$ = {}&quot;, $EXPR$);" description="Logs a value to LOGGER.info" toReformat="true" toShortenFQNames="true">
  <variable name="LOGGER" expression="variableOfType(&quot;Logger&quot;)" defaultValue="LOGGER" alwaysStopAt="true" />
  <variable name="EXPR" expression="variableOfType(&quot;&quot;)" defaultValue="&quot;expr&quot;" alwaysStopAt="true" />
  <variable name="EXPR_COPY" expression="escapeString(EXPR)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="JAVA_STATEMENT" value="true" />
  </context>
</template>
```

## Create an slf4j Logger

Before we can use `logv` we'll need an instance of an slf4j Logger. Usually, we want to name Loggers after the class they're declared inside.

![intellij-live-logger](/img/intellij/intellij-live-logger.gif)

Definition:

```xml
<template name="Log" value="private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger($CLASS$.class);" description="Slf4j Logger" toReformat="false" toShortenFQNames="true">
  <variable name="CLASS" expression="className()" defaultValue="" alwaysStopAt="true" />
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

## Create an slf4j Marker

Slf4j Markers can be used to filter log messages by something other than log level and name. They're like named tags for your log statements.

The declaration of a Marker looks a lot like a Logger, except we need to pick a name.

![intellij-live-Mark](/img/intellij/intellij-live-mark.gif)

Definition:

```xml
<template name="Mark" value="private static final org.slf4j.Marker MARKER = org.slf4j.MarkerFactory.getMarker(&quot;$END$&quot;);" description="Slf4j Marker" toReformat="false" toShortenFQNames="true">
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

## Add a TODO with a date

TODO comments should usually be accompanied by the date they were added, since recent TODOs often deserve more attention than older ones.

![intellij-live-todo](/img/intellij/intellij-live-todo.gif)

Definition:

```xml
<template name="todo" value="// TODO $date$: $END$" description="TODO with date" toReformat="false" toShortenFQNames="true">
  <variable name="date" expression="date(&quot;yyyy-MM-dd&quot;)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="COMPLETION" value="false" />
    <option name="JAVA_CODE" value="true" />
    <option name="JAVA_CONSUMER" value="false" />
    <option name="JAVA_EXPRESSION" value="false" />
  </context>
</template>
```

## Fill method body that's not implemented yet

When implementing an interface, it can be useful to leave some of the methods unimplemented but still throw a helpful exception.

Sometimes you'll want to leave the exception in production code. Sometimes it's just for a moment, just to get your code to compile.

![intellij-live-yet](/img/intellij/intellij-live-yet.gif)

Definition:

```xml
<template name="yet" value="throw new UnsupportedOperationException(this.getClass().getSimpleName() + &quot;.$METHOD$() not implemented yet&quot;);" description="not implemented yet (Unsupported)" toReformat="false" toShortenFQNames="true">
  <variable name="METHOD" expression="methodName()" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="JAVA_STATEMENT" value="true" />
  </context>
</template>
```

## Suppress default constructor for noninstantiability

Effective Java Item 4 is "Enforce noninstantiability with a private constructor."

> Utility classes were not designed to be instantiated: an instance would be nonsensical. In the absence of explicit constructors, however, the compiler provides a public, parameterless default constructor...
>
> A default constructor is generated only if a class contains no explicit constructors, so a class can be made noninstantiable by including a private constructor.

And it provides an example constructor.

```java
// Suppress default constructor for noninstantiability
private UtilityClass() {
  throw new AssertionError();
}
```

I prefer to move the comment into a string.

```java
private UtilityClass() {
  throw new AssertionError("Suppress default constructor for noninstantiability");
}
```

![intellij-live-util](/img/intellij/intellij-live-util.gif)

Definition:

```xml
<template name="util" value="private $CLASS$()&#10;{&#10;    throw new AssertionError(&quot;Suppress default constructor for noninstantiability&quot;);&#10;}" description="Suppress default constructor for noninstantiability" toReformat="false" toShortenFQNames="true">
  <variable name="CLASS" expression="className()" defaultValue="" alwaysStopAt="true" />
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

## Surround with Region markers in XML

IntelliJ's "Surround with..." functionality lets you surround code with Region markers, but only in some languages, not including XML.

Region markers give a foldable region with a label. If we surround a Java main method, we'll see a minus icon in the gutter that lets us collapse the region...

![Region markers expanded](/img/intellij/region-markers-expanded.png)

... down to just the label.

![Region markers collapsed](/img/intellij/region-markers-collapsed.png)

To get this same functionality in XML, we need to add a live template.

![XML region template](/img/intellij/xml-region-template.png)

**Abbreviation:**

region

**Description:**

Surround with region marker

**Template text:**

```
<!--region $DESCRIPTION$-->
$SELECTION$
<!--endregion-->
```

![XML region variables](/img/intellij/xml-region-variables.png)

## Variables

```
DESCRIPTION | | "Description"
```

## Comments

[Leave a comment on Medium](https://motlin.medium.com/intellij-live-templates-ca8082bedc3f)
