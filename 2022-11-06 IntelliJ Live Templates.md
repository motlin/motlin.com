# Additional IntelliJ Live Templates for Java

Use [live templates](https://www.jetbrains.com/help/idea/using-live-templates.html) to insert common constructs into your code, such as loops, conditions, various declarations, or print statements.

For example, the built-in template called `psvm` inserts a main method.

![intellij-live-psvm](https://user-images.githubusercontent.com/244258/200192586-b46ed621-222c-48b6-9218-69bae7b82ce8.gif)

Here are a few live templates I've added for Java. They are available for download [here](https://github.com/motlin/jetbrains-settings/blob/main/live-templates.xml).

To import them you can just copy the xml definition(s) into your clipboard, navigate to `Preferences | Editor | Live Templates`, and paste.

# Log a value to LOGGER.info

IntelliJ has a built-in template for printing a value to System.out, invoked using `soutv`.

Here's a similar one called `logv` for loging using [slf4j](https://www.slf4j.org/).

![intellij-live-logv](https://user-images.githubusercontent.com/244258/200192606-2a96f668-edbe-48c3-b296-35e3903f14b1.gif)

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

# Create an slf4j Logger

Before we can use `logv` we'll need an instance of an slf4j Logger. Usually, we want to name Loggers after the class they're declared inside.

![](https://miro.medium.com/max/1400/1*MF10fzDKCNtSj7MUzAhNvw.gif)

Definition:

```xml
<template name="Log" value="private static final org.slf4j.Logger LOGGER = org.slf4j.LoggerFactory.getLogger($CLASS$.class);" description="Slf4j Logger" toReformat="false" toShortenFQNames="true">
  <variable name="CLASS" expression="className()" defaultValue="" alwaysStopAt="true" />
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

# Create an slf4j Marker

Slf4j Markers can be used to filter log messages by something other than log level and name. They're like named tags for your log statements.

The declaration of a Marker looks a lot like a Logger, except we need to pick a name.

![intellij-live-Mark](https://user-images.githubusercontent.com/244258/200192643-82d0410c-8498-46a7-8816-54ee60643ea2.gif)

Definition:

```xml
<template name="Mark" value="private static final org.slf4j.Marker MARKER = org.slf4j.MarkerFactory.getMarker(&quot;$END$&quot;);" description="Slf4j Marker" toReformat="false" toShortenFQNames="true">
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

# Add a TODO with a date

TODO comments should usually be accompanied by the date they were added, since recent TODOs often deserve more attention than older ones.

![intellij-live-todo](https://user-images.githubusercontent.com/244258/200192654-b6614c0f-8c2a-45ac-933b-bff5ed3e529b.gif)

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

# Fill method body that's not implemented yet

When implementing an interface, it can be useful to leave some of the methods unimplemented but still throw a helpful exception.

Sometimes you'll want to leave the exception in production code. Sometimes it's just for a moment, just to get your code to compile.

![intellij-live-yet](https://user-images.githubusercontent.com/244258/200192664-3946ce63-648b-4bd0-9b78-dfc3ca6e0818.gif)

Definition:

```xml
<template name="yet" value="throw new UnsupportedOperationException(this.getClass().getSimpleName() + &quot;.$METHOD$() not implemented yet&quot;);" description="not implemented yet (Unsupported)" toReformat="false" toShortenFQNames="true">
  <variable name="METHOD" expression="methodName()" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="JAVA_STATEMENT" value="true" />
  </context>
</template>
```

# Suppress default constructor for noninstantiability

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

![intellij-live-util](https://user-images.githubusercontent.com/244258/200192680-f9f61c48-1073-4bf1-a929-89dda635982d.gif)

Definition:

```xml
<template name="util" value="private $CLASS$()&#10;{&#10;    throw new AssertionError(&quot;Suppress default constructor for noninstantiability&quot;);&#10;}" description="Suppress default constructor for noninstantiability" toReformat="false" toShortenFQNames="true">
  <variable name="CLASS" expression="className()" defaultValue="" alwaysStopAt="true" />
  <context>
    <option name="JAVA_DECLARATION" value="true" />
  </context>
</template>
```

# Surround with Region markers in XML

IntelliJ's "Surround with..." functionality lets you surround code with Region markers, but only in some languages, not including XML.

Region markers give a foldable region with a label. If we surround a Java main method, we'll see a minus icon in the gutter that lets us collapse the region...

![](https://miro.medium.com/max/1400/1*SLY6_q0mFd0woQk8lfLIBg.png)

... down to just the label.

![](https://miro.medium.com/max/756/1*HXoB4SKcCwSNQWt_i_SqFQ.png)

To get this same functionality in XML, we need to add a live template.

![](https://miro.medium.com/max/1400/1*X3qLLKCAMXDEJyE3IxKxdw.png)

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

![](https://miro.medium.com/max/1400/1*XrfX3gxCYBk9yodjNhG77Q.png)

## Variables

```
DESCRIPTION | | "Description"
```
