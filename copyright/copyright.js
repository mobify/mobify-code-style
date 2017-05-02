#!/usr/bin/env node
/*
"sdk-copyright-lint": "bin/copyright.js",
    "lint:copyright": "node bin/copyright.js src bin --verify",
    */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const glob = require('glob')
const fs = require('fs')
/* eslint-disable */
const colors = require('colors')
/* eslint-enable */

// example
// node copyright.js src bin --verify .js

// debug mode
// node --inspect --debug-brk copyright.js src bin --verify .js

const getCopyrightHeader = () => {
    return fs.readFileSync('headers/copyright.js.txt')
}
var copyright = fs.readFileSync('headers/copyright.js.txt');

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

const updateHeaders = (folder, ext) => {
    glob(`../../progressive-web-sdk/${folder}/**/*${ext}`, (err, files) => {
        if (err) {
            console.log(err)
        }
        files.forEach((file) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    console.log(err)
                }
                if (!isCopyrightHeader(data)) {
                    debugger;
                    const newData = getCopyrightHeader() + data
                    writeCopyrightHeader(file, newData)
                }
            })
        })
    })

}

const checkHeaders = (folder, ext) => {
    glob(`../../progressive-web-sdk/${folder}/**/*${ext}`, (err, files) => {
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

if (process.argv.indexOf('--verify') >= 0) {
    process.argv.splice(process.argv.indexOf('--verify'), 1)

    for (let i = 2; i < process.argv.length; i++) {
        let dir = process.argv[i]
        let lang = process.argv[process.argv.length - 1]
        checkHeaders(dir, lang)
    }

    console.log('Copyright headers successful'.green);
} else {
    process.argv.forEach((dir) => {
        updateHeaders(dir, process.argv[process.argv.length - 1]) // TODO make .ext variable from cli
    })
}
