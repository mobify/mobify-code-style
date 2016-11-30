Used to test style.

# GOOD: Starting level one heading.

## GOOD: One level step down headings.

<!--lint disable no-duplicate-headings-in-section -->

### GOOD: Repeated Content when rule is disabled

### GOOD: Repeated Content when rule is disabled

<!--lint enable no-duplicate-headings-in-section -->

## GOOD: Section with subsections that duplicate

This section has subsections that contain identical headers (steps) which
should be allowed by `no-duplicate-headings-in-section`

### GOOD: Section A

#### GOOD: Step 1

#### GOOD: Step 2

### GOOD: Section B

#### GOOD: Step 1

#### GOOD: Step 2

GOOD: Sentences that are just long enough that they don't need to be wrapped!!!

GOOD: Bullet lists with correct bullet.

-   A list!

GOOD: Ordered lists with correct numbers.

1.  Numbered
2.  Listed

GOOD: Fenced code-blocks with langauge.

```python
print 'Hello Mobify'
```
good.md: no issues found
