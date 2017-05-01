#!/usr/bin/env bash
# script to copy the headers to all the source files and header files

# requires Bash 4+
shopt -s globstar # sets the Globstar option (recursive ** searching)

copyright="Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved."

echo $copyright

echo "Please point to the source file directory (ex. ../progressive-web-sdk/src)"

read sourceDir

echo "Please enter the file extension (ex. js, py, html)"

read fileEx

if [ ! -f licenses/license.$fileEx.txt ]; then
    echo "We couldn't find your license file!"
else
    for f in $sourceDir/**/*.$fileEx; do
        if ! head -5 $f | grep -q Copyright\s\(c\)
        then
            cat licenses/license.$fileEx.txt $f > $f.new
            mv $f.new $f
        fi
    done
fi
