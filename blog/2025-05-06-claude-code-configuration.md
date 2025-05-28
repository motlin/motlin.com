---
slug: claude-code-configuration
title: How I Configure Claude Code for Software Development
authors: [craig]
tags: [claude-code, developer-productivity]
---

[Simon Willison wrote](https://simonwillison.net/2025/May/5/prompting/) "I'm disappointed at how little good writing there is out there about effective prompting."

I spent a lot of time writing and tweaking my prompts, so I'm sharing what works for me. Here's how I configure the `claude` CLI with a global prompt and custom commands.

<!-- truncate -->

## Global CLAUDE.md

The global `~/.claude/CLAUDE.md` file sets default behavior for Claude Code across all your projects.

### Rhetorical questions?

Sometimes I ask Claude why it implemented a feature one way and not another and it answers "You're right! I'll implement it \[the other way\]." This is so human-like and infuriating.

GPT-4o had [a now-famous bug](https://openai.com/index/sycophancy-in-gpt-4o/) that made it "overly supportive but disingenuous" but all models can [trend toward sycophancy](https://www.anthropic.com/research/towards-understanding-sycophancy-in-language-models).

Tackling these these together:

```markdown
## Conversation
- If the user asks a question, only answer the question, do not edit code.
- Don't say:
  - "you're right"
  - "I apologize"
  - "I'm sorry"
  - "Let me explain"
  - or any other introductory transition. Get immediately to the point.
```

These instructions work well for getting Claude to answer my non-rhetorical questions.

### Long-lived processes

Claude handles linter and compiler errors it sees in console output, but sometimes Claude will run a long-lived command like `npm run start` and basically hang.

```markdown
## Build Commands
- Don't run the build.
- Don't run long-lived processes like development servers or file watchers.
- Instead, display copy/pasteable commands and ask the user to run them.
```

These help a little. Sometimes Claude still tries to run the build for me.

### Extra context just for you

Claude can get context from the internet, and can read files from outside the current git repository, but it's an extra hop. I find it convenient to gather files into a subdirectory just for the LLM.

```markdown
## LLM Context
- Extra context for LLMs is stored in the `.llm` directory (in the project directory).
- Editable context:
  - `.llm/todo.md`
    - If `.llm/todo.md` exists, it will be in the root of the project's git directory. Don't look for it elsewhere.
    - If it exists, it is the task list we are working on. As you complete tasks, mark the checkboxes as complete, like `- [x] The task`.
    - The file is ignored in `.git/info/exclude`. Don't try to git add it.
  - `CLAUDE.local.md`
    - The file is your per-project memory. When user prompts contradict memory, go ahead and edit these files to keep them up-to-date.
    - The file is ignored in `.git/info/exclude` and not tracked by git.
- Read-only context:
  - Anything else in the `.llm/` directory besides `todo.md` is read-only context for the LLM's reference.
  - The directory contains entire git clones for tools we use.
  - The directory contains saved documentation.
```

Perhaps because of the name, Claude code sometimes tries to look for it in my home directory.

### // Too Many Comments

LLMs write obvious comments.

```typescript
// Calculate elapsed time
const elapsedTimeMs = Date.now() - startTime
```

I tried to prompt the LLM to write fewer comments, but it doesn't work. More on this later.

```markdown
## Code Style
- Don't write forgiving code. Don't permit multiple input formats. Assert that inputs match expected formats and throw errors when they don't.
- Don't use abbreviations or acronyms. Choose `number` instead of `num` and `greaterThan` instead of `gt`.
- Emoji and unicode characters are welcome. Use them in code, commit messages, and docs.
- Use comments sparingly.
  - Don't comment out code. Remove code instead.
  - Don't add comments that describe the process of changing code. Comments should not include past tense verbs like added, removed, or changed.
  - Don't add comments that emphasize different versions of the code, like "this code now handles..."
  - Do not use end-of-line comments. Place comments above the code they describe.
- Test names should not include the word "test"
```

Besides comments, the other style instructions work well.

### Commit messages

Claude code's commit messages are remarkably consistent, to the point where you know what [the system prompt](https://gist.github.com/transitive-bullshit/487c9cb52c75a9701d312334ed53b20c#file-claude-code-prompts-js-L448-L462) is going to be before you read it.

The system prompt includes inconsistent and incorrect information about pre-commit hooks and staging changes, so I give my own corrections.

```markdown
## Git Commits

When code changes are ready, prepare to commit them to git.

- Run `just precommit` (if a `justfile` exists and contains a `precommit` recipe)
- Stage changes carefully and individually. Avoid commands like `git add .` and `git commit -am` which stage all changes. Use commands like `git add` with several filenames.
- When using CLI tools with file paths containing `$` characters (like React Router's `$param.tsx` files), make sure to:
    - Use single quotes: `git add 'app/routes/_protected.foo.$bar.tsx'`
    - Or escape the $ character: `git add app/routes/_protected.foo.\$bar.tsx`

Prepare a commit message, and tell the user we are ready to run git commit -m "<message>", but do not run `git commit` until the user asks.

- If the user's prompt was a compiler or linter error, create a `fixup!` commit message.
- Otherwise, craft a commit message that:
    - Starts with a present-tense verb (Fix, Add, Implement, etc.)
    - Is concise (60-120 characters)
    - Clearly describes what was changed (not how) by referencing the intent of the original prompt, rather than the implementation details
    - Does not include the Claude attribution footer
    - Ends with a period.

When the user says so, go ahead and commit.

- If pre-commit hooks fail, then there are now local changes.
- `git add` those changes and try again.
- Never use `git commit --no-verify`.
```

I expect mixed results when my instructions contract the system prompt and I hope [the system prompt gets fixed upstream](https://github.com/anthropics/claude-code/issues/1000), but these instructions have been working well.

### zoxide

To get around a specific problem with [zoxide](https://github.com/ajeetdsouza/zoxide#getting-started):

```markdown
## Tool Use
I replaced `cd` with `zoxide`. If that causes problems, use `command cd` instead.
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

```markdown
- Read the file `.llm/todo.md` in the current project directory. Sometimes you struggle to find this file. Don't look around for the file. Just confidently assume it exists and read the file `.llm/todo.md` immediately.
- Find the first line which is incomplete.
- Echo context to the user including the previous completed task and the current task we just found. In the format:

> ⏺  The previous completed task was:
>  - [x] Style button to be compact with icon and hover tooltip
>
>  The next incomplete task is:
>  - [ ] Create Modal component in `src/components/ui/Modal.tsx`

- Think hard about the plan. Confirm it with the user before proceeding.
- Implement the task.
- Focus ONLY on implementing this specific task.
- Ignore all other tasks in the `.llm/todo.md` file or TODOs in the source code.
- Work through the implementation methodically and completely, addressing all aspects of the task.
- Run appropriate tests and validation to ensure the implementation works.
- After the implementation is complete and verified, update `.llm/todo.md` to mark the completed task as done by changing `- [ ]` to `- [x]` for this specific task.
```

"Think hard" is [a magic word](https://simonwillison.net/2025/Apr/19/claude-code-best-practices/) that triggers extended thinking mode.

The first instructions are because Claude sometimes looks for `.llm/todo.md` in my home directory. I should try a name that doesn't start with a dot. Once Claude finds the file, this prompt works very well, and it forms the core of my workflow for larger ideas.

### ~/.claude/commands/commit.md

As the `/user:todo` command winds down, the conversation will naturally reach a point where the LLM suggests committing the code. But when I'm not [fully vibe coding](https://simonwillison.net/2025/Mar/19/vibe-coding/) - when I'm manually testing, debugging, and fixing things - 


 I review the changes, often manually test or debug, and sometimes make my own changes on top. When I'm happy with the changes, I invoke `/user:commit`.

```markdown
Create a concise git commit for my changes.

- run `just precommit` (if a `justfile` exists and contains a `precommit` recipe)
- Perform git add operations.

Craft a commit message that:
- Starts with a present-tense verb (Fix, Add, Implement, etc.)
- Is concise (60-120 characters)
- Clearly describes what was changed (not how) by referencing the intent of the original prompt, rather than the implementation details
- Contains no attribution footer
- Ends with a period.

After creating the commit message, perform the git commit operation.
```

### ~/.claude/commands/comments.md

The `/user:comments` command asks the LLM to clean up redundant comments. I showed my instructions in `~/.claude/CLAUDE.md` starting with "Use comments sparingly" but they don't work. The built-in system prompt flat out says "Do not add comments to the code you write" and that doesn't work either. LLMs really want to write comments. It must be important to their writing processes.

I gave up on prevention and wrote this command to clean up the comments afterwards.

```markdown
Look at the local code changes that are not yet committed to git.

- Look for comments that are obvious or redundant and remove them. Examples of comments that can be removed include:
    - Commented out code.
    - Comments that describe edits like "added", "removed", or "changed" something.
    - Explanations that are just obvious because they are close to method names.
- But don't remove comments that start with TODO.
- If you find any end-of-line comments, move them above the code they describe. Comments should go on their own lines.
```

While I can't get the LLM to stop writing comments, it is extremely effective at cleaning them up after the fact. Effective enough that I turn on `auto-accept` edits while this command is running.

### ~/.claude/commands/all-comments.md

While vibe coding, lots of comments sneak into committed code. The `all-comments` prompt is identical to `comments` except it omits the sentence "Look at the local code changes that are not yet committed to git" turning it into a more global edit. After Claude deletes all the comments, I run [`git absorb`](https://github.com/tummychow/git-absorb) and it's as if the comments never existed in git history.
