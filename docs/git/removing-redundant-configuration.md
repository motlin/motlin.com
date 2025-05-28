---
title: Removing Redundant Git Configuration
sidebar_position: 3
description: Script to remove Git configuration settings that are now default
tags: [git, configuration]
last_update:
  date: 2024-05-30
---

# Removing Redundant Git Configuration

Git's default configuration values have improved over time. Bad default values were replaced, and new features were released disabled and later enabled by default.

It's difficult to know if a line in your `~/.gitconfig` is redundant because Git has no way to print default values. This script includes a hard-coded list of known improvements to defaults.

The script is arranged in chronological order of when the default value was changed. You can copy the script up to the version of Git that you're running, or run the whole thing if you're running the latest.

```bash
safe_unset() {
    local key=$1
    local value=$2

    current_value=$(git config --global --get "$key")
    local action=""

    if [ -z "$current_value" ]; then
        action="No action"
        after_value="(not set)"
    elif [ "$current_value" == "$value" ]; then
        git config --global --unset "$key"
        action="Unset"
        after_value="(not set)"
    else
        # The key is set, but not to the specified value
        action="No action"
        after_value="$current_value"
    fi

    printf "%-26s %-12s %-20s %-20s\n" "$key" "$action" "${current_value:-(not set)}" "$after_value"
}

printf "%-26s %-12s %-20s %-20s\n" "Key" "Action" "Value Before" "Value After"
printf "%-26s %-12s %-20s %-20s\n" "--------------------------" "---------" "--------------------" "--------------------"

# < 2.0 clean.requireForce
# A boolean to make git-clean do nothing unless given -f, -i or -n. Defaults to true since ???.
# https://git-scm.com/docs/git-config/#Documentation/git-config.txt-cleanrequireForce
safe_unset clean.requireForce true

# 1.8.4 color.ui
# Use colors in output. Always, never, or auto when writing to terminal.
# https://git-scm.com/docs/git-config/#Documentation/git-config.txt-colorui
safe_unset color.ui auto

# 2.24 core.commitGraph
safe_unset core.commitGraph true

# 2.24 gc.writeCommitGraph
safe_unset gc.writeCommitGraph true

# 2.26 protocol.version
safe_unset protocol.version 2

# Some time between 2.26 and 2.30.0 pack.useSparse
safe_unset pack.useSparse true

# 2.41.0 pack.writeReverseIndex
safe_unset pack.writeReverseIndex true
```

If you know of additional redundant configurations that should be added, please share them.

## Comments

[Leave a comment on Medium](https://motlin.medium.com/git-config-3d20c4c079ba)

