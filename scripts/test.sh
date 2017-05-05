#!/bin/bash -eu
# -e Exit immediately if a command exits with a non-zero status.
# -u Treat unset variables as an error when substituting.
#  More info can be found by typing `help set` in any bash shell

# the return value of a pipeline is the status of the last command to exit with a non-zero status, or zero if no command exited with a non-zero status
set -o pipefail

# Identifies the path that the script is in (http://stackoverflow.com/a/246128/11807)
MYPATH=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

# ROOT is the root directory of your project. It isn't always needed if your script is at the root of your project, but its a useful convention to adopt so that your scripts can be moved and the only thing that needs to change then is ROOT. 
ROOT=$MYPATH/..

# We have to `cd` into the dir otherwise the diffs that we use for testing
# fail due to paths of the test files not matching.
pushd "$ROOT/docs/test"
    bash test.sh
popd

"$ROOT/docs/bin/lint-md" "$ROOT/*.md"
