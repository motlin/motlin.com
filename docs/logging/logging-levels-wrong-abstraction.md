---
title: Logging levels - The wrong abstraction
description: Reference to Daniel Lebrero's article on why traditional logging levels are the wrong abstraction
tags: [java, logging]
hide_table_of_contents: false
sidebar_class_name: hidden
last_update:
  author: Craig P. Motlin
  date: 2025-05-15
---

# Logging levels: The wrong abstraction

The original article "Logging levels: the wrong abstraction" by Daniel Lebrero that was hosted on IG Labs is no longer available at its original location. However, the same author has published a version of this article on DEV.to.

You can read the article here: [No more DEBUG/INFO/WARN/ERROR logging](https://dev.to/danlebrero/no-more-debuginfowarnerror-logging)

## Key Points

The article discusses why traditional logging levels (DEBUG, INFO, WARN, ERROR) can be confusing and proposes a more practical approach:

- **DEBUG**: Information that is useful during development. Usually very chatty, and will not show in production.
- **INFO**: Information you will need to debug production issues.
- **WARN**: Someone in the team will have to investigate what happened, but it can wait until tomorrow.
- **ERROR**: Oh-oh, call the fireman! This needs to be investigated now!

This perspective changes logging decisions from technical questions to practical business questions: "Do I want to wake up in the middle of the night to investigate this, or can it wait until tomorrow morning?"

The author suggests using more descriptive method names for logging to make the intent clearer, such as `wakeMeInTheMiddleOfTheNight()` instead of `error()`.

## About the Author

Daniel Lebrero is a software engineer who worked as a Technical Architect at IG on the Big Data team when the original article was published.