#!/bin/bash -eu
# To test the remark configuration, we use two test fixtures files:
# `good.md` and `bad.md`
#
# The result of running our remark configuration on them is commited as
# `.expected` files. If we change our configuration, a new output will be
# expected and these files must be re-generated.

TEST_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
LINT_MD="$TEST_DIR/../bin/lint-md"

# Re-generate `.expected` files with current configuration.
#"$LINT_MD" "$TEST_DIR/good.md" --no-color > "$TEST_DIR/good.expected.md" 2>&1
#"$LINT_MD" "$TEST_DIR/bad.md" --no-color > "$TEST_DIR/bad.expected.md" 2>&1
#"$LINT_MD" "$TEST_DIR/a-bad-filename.md" --no-color > "$TEST_DIR/a-bad-filename.expected.md" 2>&1

# Compare remark output with expected output. Fail on diff.
echo "Testing good.md ..."
diff <("$LINT_MD" "$TEST_DIR/good.md" --no-color 2>&1) "$TEST_DIR/good.expected.md"
EXIT_GOOD=$?

echo "Testing bad.md ..."
diff <("$LINT_MD" "$TEST_DIR/bad.md" --no-color 2>&1) "$TEST_DIR/bad.expected.md"
EXIT_BAD=$?

echo "Testing a-bad-filename.expected.md ..."
diff <("$LINT_MD" "$TEST_DIR/a-bad-filename.md" --no-color 2>&1) "$TEST_DIR/a-bad-filename.expected.md"
EXIT_BAD_FILENAME=$?

# Fail if either diff failed.
# This if will fall apart quickly as we add more test cases.
# Need to consider some type of looping, etc possibly.
if [ "$EXIT_GOOD" -ne "0" ] || [ "$EXIT_BAD" -ne "0" ] || [ "$EXIT_BAD_FILENAME" -ne "0" ]; then
    echo "One or more tests failed! Good: $EXIT_GOOD  Bad: $EXIT_BAD  Bad Filename: $EXIT_BAD_FILENAME"
    exit 1
fi
