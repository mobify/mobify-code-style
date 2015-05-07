# Python Code Style Guide


Documentation
-------------

* We use doc strings for package, module, class and function documentation.
    * A doc string is a string that is the first statement in a package, module, class or function.
    * These strings can be extracted automatically through the __doc__ member of the object.

* We always use the three double-quote `"""` format for doc strings.
    * This is defined in [PEP 257](https://www.python.org/dev/peps/pep-0257/)

* A doc string should be organized as
    * a summary line (one physical line),
    * a blank line,
    * the rest of the doc string.

### On Block comments

* Comment on complicated parts of the code
    * If you're going to have to explain it at the next code review, you should comment it now.

* Don't describe the code.


### Example

* Function or method comments:
```python
def fetch_bigtable_rows(big_table, keys, other_silly_variable=None):
    """
    Fetches rows from a Bigtable.

    Retrieves rows pertaining to the given keys from the Table instance
    represented by big_table.  Silly things may happen if
    other_silly_variable is not None.

    Args:
        big_table: An open Bigtable Table instance.
        keys: A sequence of strings representing the key of each table row
            to fetch.
        other_silly_variable: Another optional variable, that has a much
            longer name than the other args, and which does nothing.

    Returns:
        A dict mapping keys to the corresponding table row data
        fetched. Each row is represented as a tuple of strings. For
        example:

        {'Serak': ('Rigel VII', 'Preparer'),
         'Zim': ('Irk', 'Invader'),
         'Lrrr': ('Omicron Persei 8', 'Emperor')}

        If a key from the keys argument is missing from the dictionary,
        then that row was not found in the table.

    Raises:
        IOError: An error occurred accessing the bigtable.Table object.
    """
    pass
```

* Class comments:
```python
class SampleClass(object):
    """Summary of class here.

    Longer class information....
    Longer class information....

    Attributes:
        likes_spam: A boolean indicating if we like SPAM or not.
        eggs: An integer count of the eggs we have laid.
    """

    def __init__(self, likes_spam=False):
        """Inits SampleClass with blah."""
        self.likes_spam = likes_spam
        self.eggs = 0

    def public_method(self):
        """Performs operation blah."""
```

* Block or inline comments:

```python
# We use a weighted dictionary search to find out where i is in
# the array.  We extrapolate position based on the largest num
# in the array and the array size and then do binary search to
# get the exact number.

if i & (i-1) == 0:        # true iff i is a power of 2
```


### Reason(s)

* Documentation style is formalized in [PEP-257](https://www.python.org/dev/peps/pep-0257/) and a community standard.
* Tools like [Sphinx](http://sphinx-doc.org/index.html) can extract *docstrings* and auto-generate documentation.
* The Google style formatting is very readable in the source code compared to other styles.


### References

* [Documentation examples](https://pythonhosted.org/an_example_pypi_project/sphinx.html#full-code-example)
* [Google Style Guide: Comments](http://google-styleguide.googlecode.com/svn/trunk/pyguide.html?showone=Comments#Comments)


# Naming things

> "There are only two hard problems in Computer Science: cache invalidation and naming things."

– Phil Karlton


## Use intention-revealing names

Harmful:

```python
d = 0  # Elapsed time in days
```

Better:

```python
elapsed_time_in_days = 0
days_elapsed = 0
```


## Avoid disinformation:
### Don't lie

Harmful:

```python
account_list = 'Ronald McDonald'
# or
account_list = set('bob', 'alice')
```

Better:

```python
accounts = []
```

### Don't be subtle

Harmful:

```python
class XYZControllerForEfficientHandlingOfStrings(object):
    pass

class XYZControllerForEfficientStorageOfStrings(object):
    pass

# Also bad:
get_account()
get_accounts()
i = 1 + l
```


## Use pronouncable names

Harmful:

```python
class DtaRcrd102(object):
    gnymdhms = None
    modymdhms = None
    irec = None
```

Better:

```python
class Customer(object):
    generation_timestamp = None
    modification_timestamp = None
    record_id = None
```


## Use consistent names:
### One word per concept

Harmful:

```python
get_customer()
fetch_customer()
retrieve_customer()
```

Better:

```python
get_customer()
```

### Define terminology

* Define a vocabulary of commonly used terms in your program
* Use consistent naming across systems
* Put it in module docstrings, README, ...


## Naming classes and functions

**Classes & Modules** → nouns
```
Customer, WikiPage, Account, Currency
```

**Functions & Methods** → verbs
```
send_payment(), delete_page(), save()
```


## Naming variables
### *Sometimes* it's useful to be explicit about the type:

Harmful:

```python
account_list = set()
account_list = True
```

Better:

```python
account_list = []
```

### Prefix booleans with `is_` or `has_`:

```python
is_active = True
has_valid_data = False
```

### Counters:

```python
num_active_users = 42
active_user_count = 42
```

### Naming schemes for dictionaries:

```python
email_for_account = {
    'mobify': 'teamvr@mobify.com',
    'dropbox': 'guido@dropbox.com'
}

# Could also work:
account_to_email_map = ...
```


## Avoid magic numbers

Harmful:

```python
widget.y += 233
```

Better:

```python
# Vertical space needed so that we
# are placed below the foobar widget
WIDGET_VERTICAL_OFFSET = 233

widget.y += WIDGET_VERTICAL_OFFSET
```


## A few tips

- Don't be afraid of renaming things later
- Iterate on naming as you would on other aspects of the code
- Explain your problem to other engineers to converge on a common mental model
- Discuss naming in code reviews


# Writing *Functions*

## Small!

> "Functions should hardly ever be 20 lines long." – Bob Martin


## Do One Thing

Harmful:

```python
def generate_and_print_report():
    # Load the data
    with open('file.dat') as f:
        data = f.read()

    # Generate the report
    # ...

    # Print the report
    for line in report:
        print(line)
```

Better:

```python
def generate_and_print_report():
    data = load_data()
    report = process_data()
    report.print()
```


## Keep the number of parameters small

* Bad: `foo('hello', customer, 42, True)`
* Meh: `foo('hello', customer, 42)`
* So-so: `foo('hello', 42)`
* Better: `foo('hello')`
* Best: `foo()`


## Use keyword arguments

Harmful:

```python
search_tweets('@mobify', False, 20, True)
```

Better:

```python
search_tweets(
    '@mobify',
    include_retweets=False,
    result_limit=20,
    popular_only=True
)
```


## Strive for purity: Avoid side effects

Harmful:

```python
def count_elements(stack):
    num_elements = 0
    while not stack.is_empty:
        num_elements += 1
        stack.pop()
    return num_elements
```


## Flat is better than nested

Bad:

```python
def write_report(section, content):
    if section == 'header':
        if content:
            buffer.write('<h1>%s</h1>' % content)
        else:
            buffer.write('<h1>(empty)</h1>')
    else:
        if not content:
            if section == 'appendix':
                buffer.write('<h1>Appendix</h1>')
```

Good:

```python
def write_report(section, content):
    if section == 'header':
        write_header(content)
    else:
        write_other(section, content)

def write_header(content):
    text = content or '(empty)'
    buffer.write('<h1>%s</h1>' % text)

def write_other(section, content):
    if section == 'appendix':
        buffer.write('<h1>Appendix</h1>')
```

## Early out to avoid deep nesting

Harmful:

```python
if condition:
    do_stuff()
    if other_condition:
        do_more_stuff()
```

Better:

```python
if not condition:
    return

do_stuff()

if other_condition:
    do_more_stuff()
```

## Prefer exceptions to returning error codes

Harmful:

```python
ERROR_INVALID_ELEMENT = -1

def process_element(e):
    if not e.is_valid:
        return ERROR_INVALID_ELEMENT
    e.process()
```

Better:

```python
def process_element(e):
    if not e.is_valid:
        raise ValueError('Invalid element')
    e.process()
```

## Extract your `main` function

Harmful:

```python
if __name__ == '__main__':
    if not sys.argv:
        sys.exit(1)
    do_something()
    sys.exit(0)
```

Better:

```python
def main(argv):
    if not argv:
        return 1
    do_something()
    return 0

if __name__ == '__main__':
    sys.exit(main(sys.argv))
```


## Optimize for testability

* Avoid global state
* Avoid side effects
* Loose coupling


## How do you write functions like this?
* **Successive refinement**
    * Iterate and refactor relentlessly
    * *Make it run, make it right, make it fast*
* Write tests and optimize for testability