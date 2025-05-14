---
sidebar_position: 4
title: IntelliJ Postfix Completions
description: Custom postfix completions to improve your productivity in IntelliJ IDEA.
tags: [intellij, ide, java]
---

# IntelliJ Postfix Completions

IntelliJ's postfix completions [were announced in 2014](https://blog.jetbrains.com/idea/2014/03/postfix-completion/) but remain relatively unknown. Postfix code completion helps reduce backward caret jumps as you write code. You use it as if you're auto-completing a method name, but with the name of a postfix template. While [live templates](./intellij-live-templates.md) can insert complete code blocks, postfix completions work on existing expressions to transform them.

![Postfix completion example](https://cdn-images-1.medium.com/max/1600/1*aYKraGecLpn9_nTrIDraTg.gif)

Here are a few postfix completions I've added for Java. They are available for download [here](https://github.com/motlin/jetbrains-settings/blob/main/postfixTemplates.xml).

## Rethrow checked exception as runtime exception

![Rethrow completion](https://miro.medium.com/max/1400/1*iSYpsQUmU_UNiGdxRZCYWg.gif)

**Before:**  $EXPR$.rethrow

**After:**  throw new RuntimeException($EXPR$);

**Applicable type:**  java.lang.Exception

![Rethrow configuration](https://miro.medium.com/max/1400/1*mJZLc2hKaRUnKD6oL3mDUg.png)

## Adapt a collection with Eclipse Collections

![Adapt completion](https://miro.medium.com/max/1400/1*qcy3WgIWEU2s8twJd07gUA.gif)

**Before:**  $EXPR$.adapt

**After:**  org.eclipse.collections.impl.list.mutable.ListAdapter.adapt($EXPR$)

**Applicable type:**  java.util.List

![Adapt configuration](https://miro.medium.com/max/1400/1*iJfTFCwEUwcoBXtwTEFZFQ.png)

In addition to ListAdapter, I have equivalent rules for SetAdapter, MapAdapter, and ArrayAdapter. Since each applies to a specific type, it's not a problem for all 4 to share the same key "adapt".

## Comments

[Leave a comment on Medium](https://motlin.medium.com/intellij-postfix-completions-2fbadf2b1f51)

