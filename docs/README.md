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
- Refer to [Mobify's Style Guide](https://docs.google.com/document/d/1jlcg5boC3MUHN7fy2n3Yu_FBGzGgTUPrnMoePzQtqE4/edit#heading=h.ph65erg81h9r) for guidance on things like when to capitalize headings and titles, when to use contractions, and how to write in Mobify's tone of voice.
- Check out our [Capitalization & Spelling Guide](https://docs.google.com/document/d/1LO7RAr2vD3LFs_bj5j0vIFMKsVFrOFfEjpCheYEH3Lg/edit#heading=h.ibiuv244lv6z) to help confirm the specific ways we spell, capitalize and contract common words at Mobify.

**Code examples**

- Assume that the readers of your document will copy and paste your code examples directly into their projects. That means you need to test they work (especially on PC machines, which is what most of our partners use)! 
- In addition, consider whether the code examples are safe for all users, even future users:
  1. What are the defaults of the functions in the code example? Why did we choose them? Are they safe for all kinds of projects?
  2. How do we expect the application to change over time? If it changes in that way, will this code be safe?
- Choose a concise, simple example whenever possible.
- Explain what you're doing in words. Either through code examples, or directly above or below the example.

**After writing**

- [ ] 👍 Review
- [ ] 🍻 Celebrate
