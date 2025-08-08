---
title: Optional Git Configuration
sidebar_position: 2
description: Optional Git configuration
tags: [git, configuration]
last_update:
  date: 2024-05-30
---

# Optional Git Configuration

This post is about one-time git configuration; commands that start with `git config --global`.

These settings are a [subset of my configuration](https://github.com/motlin/dotfiles/blob/main/gitconfig) that are a matter of taste. Each configuration has a comment explaining why I set it.

Even after running these commands, you may still want to copy from my [.gitconfig](https://github.com/motlin/dotfiles/blob/main/gitconfig) since it includes comments.

## Diff

The `histogram` algorithm detects that lines containing just `{` and `}` occur often, so it [deprioritizes aligning them](https://adamj.eu/tech/2024/01/18/git-improve-diff-histogram/) and is better at aligning code.

```shell
git config --global diff.algorithm histogram
```

## Aliases

I've gathered a few aliases in my `~/.gitconfig` that I rarely use, but I imagine I'll find a use for them one day.

```toml
	branches-with = for-each-ref --format='%(refname)' refs/heads/ --sort -committerdate --contains

	# https://gist.github.com/DuaelFr/5663854
	who = shortlog --summary --numbered --email --no-merges

	# Aggressive optimizations to save disk and time
	# https://github.com/GitAlias/gitalias/blob/master/gitalias.txt
	pruner = !git prune --expire=now && git reflog expire --expire-unreachable=now --rewrite --all
	repacker = repack -a -d -f --depth=300 --window=300 --window-memory=1g
	optimize = !git gc --aggressive && git pruner && git repacker && git prune-packed

	# Show most recent commit on each branch that isn't pushed
	# https://stackoverflow.com/a/3338774/
	unpushed = log --branches --not --remotes --simplify-by-decoration --decorate --oneline

	# Find when commit has been merged into branch
	# git find-merge <sha> <branch:-HEAD>
	# https://stackoverflow.com/a/30998048
	find-merge = "!sh -c 'commit=$0 && branch=${1:-HEAD} && (git rev-list $commit..$branch --ancestry-path | cat -n; git rev-list $commit..$branch --first-parent | cat -n) | sort -k2 -s | uniq -f1 -d | sort -n | tail -1 | cut -f2'"
	show-merge = "!sh -c 'merge=$(git find-merge $0 $1) && [ -n \"$merge\" ] && git show $merge'"

	find-merged = "!git branch --merge upstream/main --remote --list 'origin/*' | sed 's#origin/##'"
	delete-merged = "!git branch --merge upstream/main --remote --list 'origin/*' | sed 's#origin/##' | xargs git push --delete origin"

	# https://www.colinodell.com/blog/201803/four-useful-git-aliases
	children = "!bash -c 'c=${1:-HEAD}; set -- $(git rev-list --all --not \"$c\"^@ --children | grep $(git rev-parse \"$c\") ); shift; echo $1' -"
```

## Merge backups

I've never needed a backup of a file after merge.

```shell
git config --global merge.keepBackup false
```

## Merge conflicts

The [merge.conflictStyle](https://git-scm.com/docs/git-config#Documentation/git-config.txt-mergeconflictStyle) may be set to `merge` (default), `diff3`, or `zdiff3`.

> "zdiff3", is similar to diff3 but removes matching lines on the two sides from the conflict region when those matching lines appear near either the beginning or end of a conflict region.

```shell
git config --global merge.conflictStyle zdiff3
```

## Pager

When commands like `git status` output more than a screenful, you have to scroll up to see the beginning by default. You can [turn on a pager for one-off commands](https://stackoverflow.com/a/8883248/) with `git --paginate status`, or [set it globally](https://git-scm.com/docs/git-config#Documentation/git-config.txt-pagerltcmdgt).

> If the value is boolean, turns on or off pagination of the output of a particular Git subcommand when writing to a tty. Otherwise, turns on pagination for the subcommand using the pager specified by the value of pager.&lt;cmd&gt;. If --paginate or --no-pager is specified on the command line, it takes precedence over this option. To disable pagination for all commands, set core.pager or GIT_PAGER to cat.

```shell
git config --global pager.status true
```
