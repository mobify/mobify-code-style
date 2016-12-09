> Write great documentation! – \* [_Mobify Developer Values_](https://github.com/mobify/developer-values#️-write-great-documentation)

At Mobify, documentation is written in markdown.

Documentation should live as close as possible to the code it documents.
Typically, this means including it in a `docs` folder at the root of the repo.
Customer facing documentation should be published to a sub path of
docs.mobify.com.

To make writing document easier, we provide:

- A linter for consistent markdown style.
- A writing checklist for consistent process.

### Markdown Linting

```bash
npm install --save-dev mobify-code-style

# 🏃 the linter markdown files in the `docs` folder:
./node_modules/.bin/lint-md docs

# Arguments are passed to `remark-cli`: https://github.com/wooorm/remark/tree/master/packages/remark-cli
./node_modules/.bin/lint-md --watch docs

# Try to automajically fix linting warnings:
./node_modules/.bin/lint-md --output docs
```

### Writing Checklist

**Before you start writing**

Write down the goal of your document.

- Does a similar document exist? Could it be extended to meet the goal?
- Does your document fit in an existing category? If so, which one?

Who is your audience? What is their skill level?

What kind of document best meets your goal?

- [Step-by-step tutorials](https://jacobian.org/writing/what-to-write/#tutorials)
- [Overview or topical guide to a conceptual area](https://jacobian.org/writing/what-to-write/#topical-guides)
- [Low-level, deep-dive reference material](https://jacobian.org/writing/what-to-write/#reference)

**While writing**

- [Write like you talk](http://paulgraham.com/talk.html).
- [Only use terms from the glossary](https://docs.google.com/document/d/1xbHkio-hdps-5zZG-SmmAKbR9WpXtrJJ-fprShN7NkM/edit).

**After writing**

- [ ] 👍 Review
- [ ] 🍻 Celeberate
