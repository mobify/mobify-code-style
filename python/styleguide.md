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
