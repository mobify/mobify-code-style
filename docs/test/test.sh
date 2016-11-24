#!/bin/bash -eu
# To test the remark configuration, we use two test fixtures files:
# `good.md` and `bad.md`
#
# The result of running our remark configuration on them is commited as
# `.expected` files. If we change our configuration, a new output will be
# expected and these files must be re-generated.
NPM_BIN=$(npm bin)
TEST_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Re-generate `.expected` files with current configuration.
# "$NPM_BIN/remark" "$TEST_DIR/good.md" --no-color > "$TEST_DIR/good.expected.md" 2>&1
# "$NPM_BIN/remark" "$TEST_DIR/bad.md" --no-color > "$TEST_DIR/bad.expected.md" 2>&1

# Compare remark output with expected output. Fail on diff.
diff <("$NPM_BIN/remark" "$TEST_DIR/good.md" --no-color 2>&1) "$TEST_DIR/good.expected.md"
diff <("$NPM_BIN/remark" "$TEST_DIR/bad.md" --no-color 2>&1) "$TEST_DIR/bad.expected.md"
