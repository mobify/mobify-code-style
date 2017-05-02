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
// node copyright.js src bin --verify

// debug mode
// node --inspect --debug-brk copyright.js src bin --verify

const getCopyrightHeader = () => {
    return fs.readFileSync('headers/copyright.js.txt')
}

const isCopyrightHeader = (data) => {
    if (data.indexOf('Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved.') >= 0) {
        return true
    }
    return false
}

const writeCopyrightHeader = (path, data) => {
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const checkHeaders = (dir) => {
    const ext = '.js' // TODO - get extension from user input / command line arg

    glob(`../${dir}/**/*${ext}`, (err, files) => {

        if (err) {
            console.log(err)
        }

        files.forEach((file) => {
            fs.readFile(file, (err, data) => {
                if (err) {
                    console.log(err)
                }
                if (!isCopyrightHeader(data)) {
                    if (process.argv.indexOf('--verify') >= 0) {
                        /* eslint-disable */
                        console.log('Missing copyright headers in '.yellow + file.green)
                        /* eslint-enable */
                        arr.push(file);
                    } else {
                        const newData = getCopyrightHeader() + data
                        debugger
                        writeCopyrightHeader(file, newData)
                    }
                }
            })
        })
    })

}

process.argv.forEach((dir) => {
    checkHeaders(dir)
})
