# Git

Git is pretty awesome. Here's some reasonable standards when it comes to using it.

## Commit Messages

At Mobify, we recommend a few standards regarding git commit messages:
- If the commit is related to a JIRA ticket, prefix the case-sensitive ticket number to the start of the message
  - The JIRA/GitHub integration is case-sensitive
- Next choose a [relevant emoji](#emoji-list) to categorize your commit
- Finally, your main message content should follow the [git convention](http://git.kernel.org/cgit/git/git.git/tree/Documentation/SubmittingPatches#n117) of present-tense, imperative mood
  - "...as if you are giving orders to the codebase to change its behaviour."

E.g. `ABC-123: 🐛 Make feature X work by doing Y`

## Emoji List

Commit Type            | Emoji
---                    | ---
App/Astro              | 🚀 `:rocket:`
Bugfix                 | 🐛 `:bug:`
Deprecation            | 💩 `:poop:`
Documentation          | 📚 `:books:`
Initial Commit         | 🎉 `:tada:`
Linting Fix            | 👕 `:shirt:`
Merge                  | 🐙 `:octopus:`
New Feature            | ✨ `:sparkles:`
Performance            | 🐎 `:racehorse:`
Refactoring            | 🎨 `:art:`
Styling Change         | 💄 `:lipstick:`
Tests                  | 🚨 `:rotating_light:`
Tooling                | 🔧 `:wrench:`
Version Tag            | 🔖 `:bookmark:`
Work In Progress (WIP) | 🚧 `:construction:`

## Integrating Emoji into your Git Workflow
### Atom
Install [autocomplete-emojis](https://atom.io/packages/autocomplete-emojis)

### Sublime
Install [GithubEmoji](https://github.com/akatopo/GithubEmoji)

### Mac OS X Emoji Keyboard
<kbd>^</kbd>+<kbd>⌘</kbd>+<kbd>space</kbd>
