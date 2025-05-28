---
sidebar_position: 4
title: IntelliJ Postfix Completions
description: Custom postfix completions to improve your productivity in IntelliJ IDEA.
tags: [intellij, ide, java]
last_update:
  date: 2022-11-06
---

# IntelliJ Postfix Completions

IntelliJ's postfix completions [were announced in 2014](https://blog.jetbrains.com/idea/2014/03/postfix-completion/) but remain relatively unknown. Postfix code completion helps reduce backward caret jumps as you write code. You use it as if you're auto-completing a method name, but with the name of a postfix template. While [live templates](./intellij-live-templates.md) can insert complete code blocks, postfix completions work on existing expressions to transform them.

![Postfix completion example](/img/intellij/postfix-cast.gif)

Here are a few postfix completions I've added for Java. They are available for download [here](https://github.com/motlin/jetbrains-settings/blob/main/postfixTemplates.xml).

## Rethrow checked exception as runtime exception

![Rethrow completion](/img/intellij/postfix-nn.gif)

**Before:**  $EXPR$.rethrow

**After:**  throw new RuntimeException($EXPR$);

**Applicable type:**  java.lang.Exception

![Rethrow configuration](/img/intellij/postfix-try.png)

## Adapt a collection with Eclipse Collections

![Adapt completion](/img/intellij/postfix-try-demo.gif)

**Before:**  $EXPR$.adapt

**After:**  org.eclipse.collections.impl.list.mutable.ListAdapter.adapt($EXPR$)

**Applicable type:**  java.util.List

![Adapt configuration](/img/intellij/postfix-var.png)

In addition to ListAdapter, I have equivalent rules for SetAdapter, MapAdapter, and ArrayAdapter. Since each applies to a specific type, it's not a problem for all 4 to share the same key "adapt".

## Comments

[Leave a comment on Medium](https://motlin.medium.com/intellij-postfix-completions-2fbadf2b1f51)

