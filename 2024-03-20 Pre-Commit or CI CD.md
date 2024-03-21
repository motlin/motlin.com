# Pre-Commit or CI/CD

At work, we're moving from a proprietary SDLC to a more open-source process. This shift has prompted questions that have me re-evaluating aspects of the development process I've long taken for granted.

One recurring question is whether linting tools should run as part of the continuous integration/continuous deployment (CI/CD) pipeline, as pre-commit hooks, or both. Let's explore the pros and cons.

## Pre-commit hooks

Why push code that won't pass the linter? With CI/CD, the developers get feedback only after they've pushed their changes.

Pre-commit hooks get feedback to the developer as soon as possible.

## CI/CD

Pre-commit hooks must be installed in every development environment, for every new joiner.

The main benefit of running linters as part of the CI/CD pipeline is uniform enforcement. A linter in the CI/CD pipeline cannot be forgotten.

## Pre-commit hooks would be great, if everyone would just use them

In pre-commit utopia, everyone runs pre-commit hooks, making CI/CD linting redundant.

If even one contributor doesn't use pre-commit hooks, the hooks cause issues for everyone else. They can fail on unrelated changes, or include unrelated formatting changes in the same commit.

This reality becomes a self-fulfilling cycle: pre-commit hooks aren't ubiquitous, so they cause pain, so we avoid using them. But they'll never be ubiquitous because skipping them is so easy - forgetting to install, disabling them, or bypassing with `git commit --no-verify`.

## Speed & Time

Pre-commit hooks run synchronously, on the developer's machine, while the developer is waiting for feedback.

Pre-commit hooks run frequently. I create small frequent commits, using tools like [`git commit --fixup`](https://git-scm.com/docs/git-commit/2.32.0#Documentation/git-commit.txt---fixupamendrewordltcommitgt) and [git absorb](https://github.com/tummychow/git-absorb). Even fixing a commit message with `git commit --amend` will run hooks.

Pre-commit hooks must be blazingly fast.

How long before developers start skipping? Not very long. If `git commit` is taking over 1 second, I'll <kbd>Ctrl</kbd>+<kbd>C</kbd> it and add `--no-verify`. After skipping hooks a few times, I disable them. I've never worked in a project where I kept them on for long, and it would be more accurate to say "I don't use pre-commit hooks".

## Conclusion

When the [pre-commit framework](https://pre-commit.com/) was [announced in 2021](https://news.ycombinator.com/item?id=29634897), [the top comments](https://news.ycombinator.com/item?id=29635885) were now-familiar rebuttals.

> Whatever test runs during pre-commit must also run during normal CI/CD run... It must run during normal CI/CD because pre-commit hooks can be skipped.
> So now I have two different black calls: in the pre-commit hook and in the CI/CD. And they must be of the same version.
> Ad infinitum for all other tests.
> This is the reason I don't use pre-commit framework. It leads to "double accounting".

and:

> The CI check is the important one: It's what ensures that bad formatting doesn't make it into master.
> The pre-commit is just a convenience for the developer. It gives faster feedback - immediately when trying to commit, instead of a couple of minutes later. And if a developer on my team wants to disable it, it doesn't affect others.

Fans of pre-commit hooks describe a framework that's new but growing into an industry standard.

I think I'm writing to dispel that notion. pre-commit.com is new, but pre-commit hooks are not. Pre-commit suffer from tragedy of the commons, they will never become ubiquitous, and you shouldn't feel guilty about turning them off.
