# Coding Style

Our Python coding style is [PEP8](http://www.python.org/dev/peps/pep-0008/).

We have an additional standard for import order:

    # Standard libs first in alpha order.
    import abc
    import urlparse

    # Third party modules.
    import requests

    # Project modules (using relative paths where necessary)
    from . import mymodule

It's easy to check your code for PEP8 compliance:

**Checking from the command line**

Install the `pep8` package and run it on one or more directories or files:

    $ pip install pep8
    $ # check an individual file
    $ pep8 portal/core/admin.py 
    $ # check a whole directory
    $ pep8 portal/mailers

**Checking in IDEs/editors**

1. In PyCharm, enable the `PEP8 Coding Style violation` and `PEP8 Naming
Convention violation` inspection rules to have all PEP8 problems marked.

2. In Sublime Text, install one of the PEP8 plugins, e.g. [PEP8 Autoformat]
(https://packagecontrol.io/packages/Python%20PEP8%20Autoformat) or [Sublime
Linter PEP8](https://packagecontrol.io/packages/SublimeLinter-pep8).

**Automatically fixing PEP8 issues**

Probably the best solution is *autopep8*:

    $ pip install autopep8
    $ # Spot PEP8 issues and generate a diff
    $ autopep8 --diff portal/core/admin.py
    $ # Fix PEP8 issues directly in a file
    $ autopep8 --in-place portal/core/admin.py
    $ # Fix all PEP8 issues in files in a directory
    $ autopep8 -i portal/core/*
    $ # Fix all PEP8 issues in all files in a directory tree, recursively
    $ find portal/core -name '*.py' -print -exec autopep8 --in-place {} \;
    
However, if fixing all the PEP8 issues in a file is scary, and all you did is
touch a few lines, you can use `pep8radius`. This will apply `autopep8` to
just the areas of any files that you have changed (it uses `git` to detect
the changes).

    $ # Install pep8radius
    $ # Make your edits.... get all tests running...
    $ # Use pep8radius to fix issues in the code changed. The -vv
    $ # sets verbose mode so that the output shows progress.
    $ pep8radius -vv --in-place
    $ # Now rerun tests, then commit
    
Note that `pep8radius` will only look at files modified but not yet committed,
so your workflow should include it *before* commit.


# Code Inspection

There are a number of tools that can be used to check Python code for
potential errors. You should run these on code that's already been checked
for PEP8 compliance, so that PEP8 issues don't get flagged.

## PyCharm

The PyCharm IDE has built-in support for Python checking using the
*Inspect Code...* tool. The default set of inspections (all of them)
is suitable for use on our code.

## PyLint

Like `pep8`, `pylint` is a pip-installable package providing a command
line tool that can be run on one or more files to check them.

    $ pip install pylint
    $ # Run on a single file
    $ pylint portal/core/admin.py
    $ # Run on a whole directory
    $ pylint portal/core
    
By default, pylint will dump output to stdout showing:

* Errors found, with the numbers of the offending lines
* Statistics about the code 
* A tree of external Python module dependencies
* A measure of duplications found (i.e., where the code could
be DRY'd up)
* A rating out of 10 for the code

You may find the HTML output more useful:

    $ pylint -f html portal/core/admin.py > pylint.html
    
It gives more detailed output, including function or class+method names
to make it easier to locate the code that flagged an error. It's most useful
when running pylint over a whole set of files (or a whole directory).

PyLint is very configurable, and a reference config file is included in
this repo (`pylint.rc`). You can save this in your project root, and pylint
will use it by default (when you run `pylint` from that directory).

    $ pylint --rcfile=pylint.rc mystuff/myapp/myfile.py
    
...or save it to `~/.py

### Fixing PyLint issues

There are two ways to fix an issue that pylint flags (three if you include *ignore
it and hope someone else fixes it*).

1. Modify the code to fix the issue.
2. Include a comment to flag to PyLint that it should suppress the check. These
comments take the form `# pylint: disable=<message-type-or-number>` and apply
to the block in which the comment occurs. For example:

    class Foo(object):
        def unused_arg1(self, arg):
            """This method is flagged because it has an unused argument"""
            print self
            
        def unused_arg2(self, arg):
            """
            This method is not flagged because we suppress the 
            check for unused argument.
            """
            # pylint: disable=unused-argument
            print self

Checking this, we get:

    ************* Module a
    a.py:line 1: : C0111:missing-docstring:Missing module docstring
    a.py:line 1: Foo: C0111:missing-docstring:Missing class docstring
    a.py:line 2: Foo.unused_arg1: W0613:unused-argument:Unused argument 'arg'

...i.e., the unused-argument message is flagged only for method `unused_arg1`  

There's a full list of all the pylint message codes and names here: http://pylint-messages.wikidot.com/all-codes
and detailed documentation of what they mean here: http://docs.pylint.org/features.html
 
Because the pylint disabling comments work for the whole block in which they
occur, you can include them at module level to suppress a warning across the
whole module. 

## Pyflakes

Pyflakes is another pip-installable code analysis tool that focuses on
identifying coding issues (and less on code layout and formatting). _"Pyflakes
makes a simple promise: it will never complain about style, and it will try
very, very hard to never emit false positives."_

    $ pip install pyflakes
    $ # Check one file
    $ pyflakes portal/core/admin.py
    $ # Check all the files in a tree
    $ pyflakes portal/core

Pyflakes has no configuration, and there is no way to suppress a warning
by adding comments. However, it spots a smaller set of issues than PyLint
(for example, it doesn't spot unused arguments). This does mean that anything
it spots is worth checking.
