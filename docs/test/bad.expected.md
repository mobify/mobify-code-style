Used to test violations of style.

## BAD: Starting with wrong level heading.

# BAD: Higher level second heading.

### BAD: Skipping levels between headings.

# BAD: Two first level headings.

## BAD: Repeated Headings.

## BAD: Repeated Headings.

BAD: Really, really long lines of text that should probably be wrapped to a more sane length that this.

BAD: List immedidately following text.

-   list

BAD: One space indents in lists.

-   list

BAD: Two space indents in lists.

-   list

BAD: Non-standard list bullet.

-   Star

BAD: A non-ordered numbered list.

1.  Number
2.  List

BAD: Fenced code-block with no language.

    # Fenced code block

BAD: Indented code-block.

    # Indented code block

BAD: Missing newline at end of file.
docs/test/bad.md
         1:1  warning  Missing newline character at end of file                final-newline                  remark-lint
    7:1-7:43  warning  Heading levels should increment by one level at a time  heading-increment              remark-lint
    9:1-9:33  warning  Don’t use multiple top level headings (9:1)             no-multiple-toplevel-headings  remark-lint
  13:1-13:27  warning  Do not use headings with similar content (11:1)         no-duplicate-headings          remark-lint
      15:104  warning  Line must be at most 80 characters                      maximum-line-length            remark-lint
        18:5  warning  Incorrect list-item indent: remove 2 spaces             list-item-indent               remark-lint
        26:4  warning  Incorrect list-item indent: remove 1 space              list-item-indent               remark-lint
   30:1-30:8  warning  Marker style should be `-`                              unordered-list-marker-style    remark-lint
        30:4  warning  Incorrect list-item indent: remove 1 space              list-item-indent               remark-lint
        34:5  warning  Incorrect list-item indent: remove 1 space              list-item-indent               remark-lint
   35:1-35:9  warning  Marker should be `2`, was `1`                           ordered-list-marker-value      remark-lint
        35:5  warning  Incorrect list-item indent: remove 1 space              list-item-indent               remark-lint
        38:1  warning  Remove 1 line before node                               no-consecutive-blank-lines     remark-lint
   40:1-42:4  warning  Missing code-language flag                              fenced-code-flag               remark-lint
  46:1-46:26  warning  Code blocks should be fenced                            code-block-style               remark-lint

⚠ 15 warnings
