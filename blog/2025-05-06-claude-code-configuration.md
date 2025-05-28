---
slug: claude-code-configuration
title: How I Configure Claude Code for Software Development
authors: [craig]
tags: [claude-code, developer-productivity]
---

[Simon Willison wrote](https://simonwillison.net/2025/May/5/prompting/) "I'm disappointed at how little good writing there is out there about effective prompting."

I spent a lot of time writing and tweaking my prompts, so I'm sharing what works for me. Here's how I configure the `claude` CLI and set up custom `todo` and `commit` commands.

<!-- truncate -->

## Global CLAUDE.md

The global [`~/.claude/CLAUDE.md`](https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md) file sets default behavior for Claude Code across all your projects.

### Rhetorical questions?

Sometimes I ask Claude why it implemented a feature one way and not another and it answers "You're right! I'll implement it \<the other way\>." This is so human-like and infuriating.

GPT-4o had [a now-famous bug](https://openai.com/index/sycophancy-in-gpt-4o/) that made it "overly supportive but disingenuous." It's "fixed," but all models can [trend toward sycophancy](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models).

Tackling these these together:

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L56-L65
```

**Vibes:** these instructions work well.

### Long-lived processes

Claude handles linter and compiler errors it sees in console output, but sometimes it will try to run a long-lived command like `npm run start` and basically hang.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L67-L73
```

**Vibes:** these instructions help sometimes. Sometimes Claude still tries to run `npm run start`.

### Extra context just for you

Claude code can search the internet, and can read files from outside the current git repository, but it's an extra hop. I find it convenient to gather files into a subdirectory just for the LLM.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L75-L89
```

**Vibes:** these instructions work well. Though I'm deliberate about telling the LLM to look in `.llm/`.

### // Too Many Comments

LLMs write obvious comments.

```typescript
// Calculate elapsed time
const elapsedTimeMs = Date.now() - startTime
```

I tried to prompt the LLM to write fewer comments, but it doesn't work. More on this later.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L6-L23
```

Besides comments, the other style instructions work well.

### Commit messages

Claude code's commit messages are remarkably consistent, to the point where you know what [the system prompt](https://gist.github.com/transitive-bullshit/487c9cb52c75a9701d312334ed53b20c#file-claude-code-prompts-js-L448-L462) is going to be before you read it.

The system prompt includes inconsistent and incorrect information about pre-commit hooks and staging changes, so I give my own corrections.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L90-L106
```

I expect mixed results when my instructions contract the system prompt and I hope [the system prompt gets fixed upstream](https://github.com/anthropics/claude-code/issues/1000), but these instructions have been working well.

### zoxide

To get around a specific problem with [zoxide](https://github.com/ajeetdsouza/zoxide#getting-started):

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/CLAUDE.md#L108-L109
```

## Project-specific CLAUDE.md

You can override global settings for a specific project by creating a `CLAUDE.md` and `CLAUDE.local.md` in the root of that project. The first is intended to be committed and the second is intended to be ignored.

I would never assume my teammates use a specific tool like Claude, so I never create project-specific `CLAUDE.md` files. I don't even want the word Claude to appear in `.gitignore` so instead I ignore the file with:

```console
echo CLAUDE.local.md >> .git/info/exclude
```

I do hope a standard emerges. I would be willing to check in instructions with more generic names like `LLM.md` or `.llm/instructions.md`.

The contents of `CLAUDE.local.md` vary of course. It's a good place to share:

- What the build tool is, and which commands to run before committing.
- Libraries to use and APIs to prefer.
- Whether to use a `justfile` or the language-native build tool.

## Custom Commands

Claude Code supports some built-in slash commands, like `/pr-comments` which are basically just shorthand for [specific prompts](https://gist.github.com/transitive-bullshit/487c9cb52c75a9701d312334ed53b20c#file-claude-code-prompts-js-L591-L597). Users can define their own prompts in files like `~/.claude/commands/example.md` and invoke them with slash commands like `/user:example`. I have created commands for implementing todos, commiting to git, and cleaning up comments.

You can also create project-specific commands by placing them in a `.claude/commands/` directory within your project, but I haven't used this feature yet. These commands take precedence over global commands with the same name.

### ~/.claude/commands/todo.md

When planning larger changes, I tend to chat with a thinking model in the browser. At the end, I ask for a markdown checklist containing tasks in the order that I need to implement them, where each completed task could be committed to git separately. The `/user:todo` command asks Claude to implement a single task from that list.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/commands/todo.md#L1-L25
```

"Think hard" is [a magic word](https://simonwillison.net/2025/Apr/19/claude-code-best-practices/) that triggers extended thinking mode.

The first instructions are because Claude sometimes looks for `.llm/todo.md` in my home directory. I should try a name that doesn't start with a dot. Once Claude finds the file, this prompt works very well, and it forms the core of my workflow for larger ideas.

### ~/.claude/commands/commit.md

As the `/user:todo` command winds down, the conversation will naturally reach a point where the LLM suggests committing the code. But when I'm not [fully vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/) - when I'm manually testing, debugging, and fixing things - 


 I review the changes, often manually test or debug, and sometimes make my own changes on top. When I'm happy with the changes, I invoke `/user:commit`.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/commands/commit.md#L24-L47
```

### ~/.claude/commands/comments.md

The `/user:comments` command asks the LLM to clean up redundant comments. I showed my instructions in `~/.claude/CLAUDE.md` starting with "Use comments sparingly" but they don't work. The built-in system prompt flat out says "Do not add comments to the code you write" and that doesn't work either. LLMs really want to write comments. It must be important to their writing processes.

I gave up on prevention and wrote this command to clean up the comments afterwards.

```markdown reference
https://github.com/motlin/claude-code-prompts/blob/main/commands/comments.md#L11-L21
```

While I can't get the LLM to stop writing comments, it is extremely effective at cleaning them up after the fact. Effective enough that I turn on `auto-accept` edits while this command is running.

### ~/.claude/commands/all-comments.md

While vibe coding, lots of comments sneak into committed code. The `all-comments` prompt is identical to `comments` except it omits the sentence "Look at the local code changes that are not yet committed to git" turning it into a more global edit. After Claude deletes all the comments, I run [`git absorb`](https://github.com/tummychow/git-absorb) and it's as if the comments never existed in git history.
