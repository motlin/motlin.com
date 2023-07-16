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

**ERROR** should alert the on-call engineer and interrupt whatever they are doing. It should be very rare.

**WARN** logs can be investigated in batches. A lot of new logging starts out at WARN and if they turn out not to be useful, they can be demoted to DEBUG.

**INFO** log volume should be less than 10% of DEBUG logs, and ideally should be "tail -f"able.

**DEBUG** logs tend to be voluminous and should be pruned.

## ERROR

> ERROR: Oh-oh, call the fireman! This needs to be investigated now!

Error logs should alert the on-call engineer and interrupt whatever they are doing. We use PagerDuty to send push notifications to the engineer's personal phone.

If we spam the on-call engineer with alerts, they will mute the notifications. When we run alert review, it's important **not** to ask "Was this alert actionable?" since the answer is often yes. We should as "Was this alert urgent enough to interrupt the engineer's lunch or sleep?" and downgrade the severity if the answer is "no".

When it doubt, downgrade the severity.

I'm willing to tolerate about 1 error per day during normal business hours, and only a few per year outside normal business hours.

## WARN

> WARN: someone in the team will have to investigate what happened, but it can wait until tomorrow.

The primary purpose of WARN logs are to provide more context about an ERROR. However, WARN tends to be a home for a few other types of logs.

During incident review, ERROR logs often get demoted to WARN. Often, these logs aren't even useful to review in batches, and ought to get demoted a second time to DEBUG.

New features often start out with WARN logging that can get promoted to ERROR. If an incident occurs and during incident review we decide that the on-call was not made aware quickly enough, we may promote the logging severity.

WARN, not ERROR, ought to be the default choice for new catch blocks, until we have an opportunity to re-categorize. 

## INFO

> INFO: information you will need to debug production issues.

INFO logs should serve as a summary of the DEBUG logs. INFO logs should come in at a pace that a human can read, at least if filtering to a single user.

If a user is clicking around on a website, we can only log one or two times for each interaction, if we expect a human to be able to keep pace.

## DEBUG

> DEBUG: information that is useful during development. Usually very chatty, and will not show in production.

Use DEBUG for text that gets logged too quickly for a human to read with `tail -f`.

If a user clicks a button and the service logs 10 times while responding, almost all of that logging should be at the DEBUG level.

## Conclusion

I think these semantics are complementary to the ones expressed in the [original article](https://labs.ig.com/logging-level-wrong-abstraction) and help refine them.
