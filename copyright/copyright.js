#!/usr/bin/env node
/*
"sdk-copyright-lint": "bin/copyright.js",
    "lint:copyright": "node bin/copyright.js src bin --lint",
    */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const glob = require('glob')
const fs = require('fs')
const colors = require('colors')

// example
// node copyright.js src bin --lint

// debug mode
// node --inspect --debug-brk copyright.js src bin --lint

const getCopyrightHeader = (ext) => {
    return fs.readFileSync('headers/copyright.js.txt')
}

const isCopyrightHeader = (data) => {
    if (data.indexOf('Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved.') >= 0) {
        return true
    }
    return false
}

const writeCopyrightHeader = (file, data) => {
    fs.writeFile(file, data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const updateHeaders = (globString) => {
    glob(`${globString}`, (err, files) => {
        if (err) {
            console.log(err)
        }
        files.forEach((file) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    console.log(err)
                }
                if (!isCopyrightHeader(data)) {
                    // right now this is reading the file each iteration
                    // TODO store in memory
                    const newData = getCopyrightHeader() + data
                    writeCopyrightHeader(file, newData)
                }
            })
        })
    })

}

const checkHeaders = (globString) => {
    glob(`${globString}`, (err, files) => {
        let failed = false

        if (err) {
            console.log(err)
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            if (!isCopyrightHeader(fs.readFileSync(file))) {
                console.log('Missing copyright headers in '.yellow + file.green)
                failed = true
            }
        }

        if (failed === true) {
            console.log('ERR - please run the copyright header tool in this project'.red)
            process.exit(1)
        }
    })
}

if (process.argv.indexOf('--lint') >= 0) {

    process.argv.splice(process.argv.indexOf('--lint'), 1)

    // first 2 args are always `node copyright.js`
    for (let i = 2; i < process.argv.length; i++) {
        checkHeaders(globString)
    }

    console.log('Copyright headers successful'.green);
} else if (process.argv.length === 2) {
    console.log('Please enter a list of globs to add copyrights to, followed by an optional --lint command'.cyan);
    console.log('example - node copyright.js src/**/*.js --lint'.yellow);
} else {
    // first 2 args are always `node copyright.js`
    for (let i = 2; i < process.argv.length; i++) {
        updateHeaders(globString)
    }
}
