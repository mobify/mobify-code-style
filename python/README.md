# Python Coding Style 🐍

We follow [PEP8](http://www.python.org/dev/peps/pep-0008/) with an additional
standard for import ordering:

```python
# Standard libraries ordered alphabetically.
import abc
import urlparse

# Third party libraries.
import requests

# Project libraries, using using relative paths where applicable.
from . import mymodule
```

# PEP8

## PEP8 on the Command Line

Install the [`pep8`](https://pypi.python.org/pypi/pep8) package and run it on
one or more directories or files:

```bash
pip install pep8

# Check a file
pep8 portal/core/admin.py
# Check a folder
pep8 portal/mailers
```

## PEP8 in Editors

**PyCharm**

Enable `PEP8 Coding Style violation` and `PEP8 Naming Convention violation`
inspection rules to mark PEP8 issues.

**Sublime Text**

Install one of the PEP8 plugins:
* [PEP8 Autoformat](https://packagecontrol.io/packages/Python%20PEP8%20Autoformat)
* [Sublime Linter PEP8](https://packagecontrol.io/packages/SublimeLinter-pep8).

## Resolving PEP8 Errors 🛠

Probably the best solution is [`autopep8`](https://pypi.python.org/pypi/autopep8):

```bash
pip install autopep8

# Spot issues and generate a diff
autopep8 --diff portal/core/admin.py
# Fix issues in a file
autopep8 --in-place portal/core/admin.py
# Fix issues in a folder
autopep8 -i portal/core/*
# Fix issues in all files in a directory tree, recursively
find portal/core -name '*.py' -print -exec autopep8 --in-place {} \;
```

If fixing all PEP8 issues in a file obscures your change, use
[`pep8radius`](https://pypi.python.org/pypi/pep8radius). This will apply
`autopep8` to just the areas of any files that you have changed using `git`:

```bash
pip install pep8radius

# Use pep8radius to fix issues in the code changed. The -vv sets verbose mode so
# that the output shows progress.
pep8radius -vv --in-place

# Now rerun tests, then commit!
```

Note `pep8radius` only looks at files modified but not yet committed,
so your workflow should include it *before* commit.

# Code Inspection 🕵

There are a number of tools that can be used to check Python code for potential
errors. You should run these on code that's already been checked for PEP8
compliance, so that PEP8 issues don't get flagged.

## PyCharm

The PyCharm IDE has built-in support for Python checking using the *Inspect
Code...* tool. The default set of inspections (all of them) is suitable for use
on our code.

## [PyLint](https://docs.pylint.org/)

PyLint is a Python package for Python source code linting:

```bash
pip install pylint

# Lint a file
pylint portal/core/admin.py
# Lint a folder
pylint portal/core
# Lints a file and output detailed linting results to HTML
pylint -f html portal/core/admin.py > pylint.html
```

Linting is configured using a configuration file. Our reference config,
[`pylintrc`](./pylintrc), is in this folder. Save it to a project's root folder
and it will be used when `pylint` is run from there:

```bash
pylint --rcfile=pylint.rc mystuff/myapp/myfile.py
```

### Fixing PyLint Messages

Fix the message or disable:

```python
class Foo(object):
   def unused_arg1(self, arg):
       """Messages about unused argument."""
       print self

   def unused_arg2(self, arg):
       """No message because unused argument check is disabled."""
       # pylint: disable=unused-argument
       print self
```

Message codes can be found [here](http://pylint-messages.wikidot.com/all-codes).

Disable works for the block in which they are found, so include it at the module
level to disable a message for a module or file.

## Pyflakes

Pyflakes is another pip-installable code analysis tool that focuses on
identifying coding issues (and less on code layout and formatting). _"Pyflakes
makes a simple promise: it will never complain about style, and it will try
very, very hard to never emit false positives."_

```bash
pip install pyflakes
# Check one file
pyflakes portal/core/admin.py
# Check all the files in a tree
pyflakes portal/core
```

Pyflakes has no configuration, and there is no way to suppress a warning by
adding comments. However, it spots a smaller set of issues than PyLint (for
example, it doesn't spot unused arguments). This does mean that anything it
spots is worth checking.