---
slug: claude-code-setup
title: "Claude Code Secrets: My Complete Setup"
authors: [craig]
tags: [claude-code, developer-productivity]
date: 2025-06-08
---

[Simon Willison wrote](https://simonwillison.net/2025/May/5/prompting/) "I'm disappointed at how little good writing there is out there about effective prompting."

I spent a lot of time writing and tweaking my prompts, so I'm sharing what works for me.

<!-- truncate -->

This is my complete Claude Code setup, broken down into three posts:

📋 [How I Configure Claude Code with CLAUDE.md and settings.json](/blog/claude-code-configuration)

- Global `CLAUDE.md`
- Code style, commit message, and conversation guidelines

🔄 [Claude Code Development Workflow Commands](/blog/claude-code-workflow-commands)

My core development loop using custom commands:
- `/user:todo` - Implement a task from a checklist
- `/user:commit` - `git commit` with a nice message
- `/compact` - Manage the context window

🛠️ [Claude Code Utility Commands](/blog/claude-code-utility-commands)

Commands for code maintenance:
- `/user:comments` - Clean up comments in recent changes
- `/user:all-comments` - Clean up comments project-wide
- `/user:emoji` - Add emoji to content
- `/user:learn` - Add to Claude memory
- `/user:rebase` - Resolve merge conflicts
