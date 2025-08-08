---
sidebar_position: 1
title: Which Log Level?
description: Guidelines for choosing the appropriate log level in Java applications
tags: [java, logging]
last_update:
  date: 2023-07-05
---

# Which Log Level?

A coworker introduced me to the excellent article "Logging levels: the wrong abstraction" which is unfortunately no longer available at its original location. However, the author has published a version called [No more DEBUG/INFO/WARN/ERROR logging](https://dev.to/danlebrero/no-more-debuginfowarnerror-logging) on DEV.to that covers the same concepts.

The TL;DR is that developers without a shared understanding of logging severities (error, warning, info, and debug) will tend to inflate severity.

The suggestions from the original article:

> ERROR: Oh-oh, call the fireman! This needs to be investigated now!
>
> WARN: someone in the team will have to investigate what happened, but it can wait until tomorrow.
>
> INFO: information you will need to debug production issues.
>
> DEBUG: information that is useful during development. Usually very chatty, and will not show in production.

The most important point is about timing.

**ERROR** should alert an on-call engineer and be dealt with quickly. The alert may interrupt their sleep or personal lives. These alerts should be rare.

**WARN** logs should be investigated the same day if it happens during business hours, or the next day if it happens outside business hours. They can be investigated in batches.

## ERROR

> ERROR: Oh-oh, call the fireman! This needs to be investigated now!

Error logs should alert the on-call engineer and interrupt what they are doing. My teams have used PagerDuty to send push notifications to the engineer's personal phone.

These alerts can be the most dreaded aspect of an on-call rotation. If the alert volume is too high, engineers may mute them. Some will find another place to work. If engineers are expected to be on-call at all, it's important to conduct alert-review meetings to keep the alert volume low.

When deciding whether to keep or delete an alert, ask, "Was this alert urgent enough to interrupt the engineer's lunch or sleep?" If the answer is "no," downgrade its severity. It's crucial not to ask, "Was this alert actionable?" or "Was this real?" since this leads to keeping too many alerts. When in doubt, downgrade the severity.

I find it acceptable to tolerate about one error per day during normal business hours and a few per year outside of those hours.

## WARN

> WARN: someone in the team will have to investigate what happened, but it can wait until tomorrow.

The primary purpose of WARN logs are to provide more context about an ERROR. However, WARN tends to be a home for a few other types of logs.

During incident review, ERROR logs often get demoted to WARN. Often, these logs aren't even useful to review in batches, and ought to get demoted a second time to DEBUG.

WARN, not ERROR, is a good default choice for new catch blocks. During incident review, we may decide that the on-call was not made aware quickly enough, and promote the logging severity to ERROR. Or we may find that the logging happens during normal operation and demote it to DEBUG.

We can think of WARN as a temporary home, but many catch blocks never run, and the log statements stay at WARN severity indefinitely.

## INFO

> INFO: information you will need to debug production issues.

INFO logs should serve as a summary of the DEBUG logs. INFO logs should come in at a pace that a human can read, at least if filtering to a single user.

If a user is clicking around on a website, we should only log one or two times for each interaction.

## DEBUG

> DEBUG: information that is useful during development. Usually very chatty, and will not show in production.

Use DEBUG for text that gets logged too quickly for a human to read with `tail -f`.

If a user clicks a button and the service logs 10 times while responding, almost all of that logging should be at the DEBUG level.

## Conclusion

I hope this helps build a shared mental model of the log levels, building on the [original article](https://dev.to/danlebrero/no-more-debuginfowarnerror-logging).

For more discussion, see [this StackOverflow question](https://stackoverflow.com/questions/2031163/when-to-use-the-different-log-levels).

## Comments

[Leave a comment on Medium](https://motlin.medium.com/which-log-level-70145ad2fc1f)
