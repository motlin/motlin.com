# Which Log Level?

A coworker introduced me to the excellent article [Logging levels: the wrong abstraction](https://labs.ig.com/logging-level-wrong-abstraction)

The TL;DR is that you should assign severities according to these rules.

> ERROR: Oh-oh, call the fireman! This needs to be investigated now!
>
> WARN: someone in the team will have to investigate what happened, but it can wait until tomorrow.
>
> INFO: information you will need to debug production issues.
>
> DEBUG: information that is useful during development. Usually very chatty, and will not show in production.

My coworker shared the article because I had expressed strong opinions about the semantics of each level.

My TL;DR additions:

**ERROR** should send a push notification to the on-call engineer. It should interrupt whatever they are doing.

**WARN** logs can be investigated in batches, and should often be downgraded to INFO.

**INFO** log volume should be less than 10% of DEBUG logs, and ideally should be "tail -f"able.

**DEBUG** logs tend to be voluminous and should be pruned aggressively.

## ERROR

Error logging indicates a problem that needs to be investigated now.

Logging at the ERROR severity should generate an alert, sent to the on-call engineer. In my company, PagerDuty sends push notifications to the on-call engineer's personal phone.

Having engineers accept alerts on a personal device is a big ask. My teams run incident and alert reviews to ensure that the on-call engineers are not getting spammed.

During incident review, I've observed the tendency to ask "Was this alert actionable?" answer "yes" and keep the alert.

The right question is something like "Was this alert urgent enough to interrupt the engineer's lunch or sleep?" If the answer is "no", then the severity should be downgraded.

## WARN

The primary purpose of WARN logs are to provide more context about an ERROR. However, WARN tends to be a home for a few other types of logs.

During incident review, ERROR logs often get demoted to WARN. Often, these logs aren't even useful to review in batches, and ought to get demoted a second time to DEBUG.

Conversely, new features often start out with WARN logging that can get promoted to ERROR. If an incident occurs and during the incident review we decide that the on-call was not made aware quickly enough, we may promote the logging severity.

WARN winds up being a default choice for engineers filling in a catch block, until we can re-categorize. 

## INFO

INFO logs should serve as a summary of the DEBUG logs. INFO logs should come in at a pace that a human can read, at least if filtering to a single user.

If a user is clicking around on a website, we can only log one or two times for each interaction, if we expect a human to be able to keep pace.

## DEBUG

Use DEBUG for text that gets logged too quickly for a human to read with `tail -f`.

If a user clicks a button and the service logs 10 times while responding, almost all of that logging should be at the DEBUG level.

## Conclusion

I think these semantics are complementary to the ones expressed in the [original article](https://labs.ig.com/logging-level-wrong-abstraction) and help refine them.
