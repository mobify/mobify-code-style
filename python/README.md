# Python Coding Style 🐍

**TLDR**: Configure your text editor to use [`flake8`](https://flake8.readthedocs.org/en/latest/):

**Sublime Text**

Install [`flake8`](https://flake8.readthedocs.org/en/latest/#quickstart) then
using [Package Control](https://packagecontrol.io/installation),
install [SublimeLinter](http://www.sublimelinter.com/en/latest/installation.html)
and [SublimeLinter-flake8](https://github.com/SublimeLinter/SublimeLinter-flake8).

## [PEP8](https://www.python.org/dev/peps/pep-0008/)

We follow [PEP8](http://www.python.org/dev/peps/pep-0008/) with an additional
standard for ordering imports:

```python
# First, standard libraries ordered alphabetically.
import abc
import urlparse

# Second, third-party libraries.
import requests

# Third, project libraries, using using relative paths where applicable.
from . import mymodule
```

### PEP8 on the Command Line

Install the [`pycodestyle`](https://github.com/PyCQA/pycodestyle) package and
run it on one or more directories or files:

```bash
pip install pycodestyle

pycodestyle portal/core/admin.py  # Check a file
pycodestyle portal/mailers        # Check a folder
```

### PEP8 in Editors

* **PyCharm**: Enable `PEP8 Coding Style violation` and `PEP8 Naming Convention violation`
  inspection rules.
* **Sublime Text**: Install a PEP8 plugins: [PEP8 Autoformat](https://packagecontrol.io/packages/Python%20PEP8%20Autoformat) or
  [Sublime Linter PEP8](https://packagecontrol.io/packages/SublimeLinter-pep8).

### Resolving PEP8 Errors 🛠

Use [`autopep8`](https://pypi.python.org/pypi/autopep8):

```bash
pip install autopep8

autopep8 --diff portal/core/admin.py      # Spot issues and generate a diff
autopep8 --in-place portal/core/admin.py  # Fix issues in a file
autopep8 -i portal/core/*                 # Fix issues in a folder

# Fix issues in all files in a directory tree, recursively
find portal/core -name '*.py' -print -exec autopep8 --in-place {} \;
```

Use [`pep8radius`](https://pypi.python.org/pypi/pep8radius) limit fixes to areas
that were modified:

```bash
pip install pep8radius

pep8radius -vv --in-place
```

`pep8radius` uses `git` to find changes in files that were modified but not
commited. Use it *before* you commit.

## Code Inspection 🕵

There are a number of tools that can be used to check Python code for potential
errors. Run these on code that passes PEP8!

### PyCharm

The PyCharm IDE has built-in support for Python checking using the *Inspect
Code...* tool. The default set of inspections is suitable for use on our code.

### Pyflakes

Pyflakes is another pip-installable code analysis tool that focuses on
identifying coding issues (and less on code layout and formatting). _"Pyflakes
makes a simple promise: it will never complain about style, and it will try
very, very hard to never emit false positives."_

```bash
pip install pyflakes

pyflakes portal/core/admin.py  # Check one file
pyflakes portal/core           # Check all the files in a tree
```

Pyflakes has no configuration, and there is no way to suppress a warning by
adding comments. However, it spots a smaller set of issues than PyLint (for
example, it doesn't spot unused arguments). This does mean that anything it
spots is worth checking.

### [PyLint](https://docs.pylint.org/)

PyLint is a Python package for Python source code linting. It is **extremely**
thorough, but can also become very slow on large projects. In general, you
will get acceptable results in much less time by using 'flake8'. If you
do want to install PyLint:

```bash
pip install pylint


pylint portal/core/admin.py  # Lint a file
pylint portal/core           # Lint a folder

# Lint a file and output details to HTML
pylint -f html portal/core/admin.py > pylint.html
```

Linting is configured using a configuration file. Our reference config,
[`pylintrc`](./pylintrc), is in this folder. Save it to a project's root folder
and it will be used when `pylint` is run from there:

```bash
pylint --rcfile=pylint.rc mystuff/myapp/myfile.py
```

#### Fixing PyLint Messages

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

