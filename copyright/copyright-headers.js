#!/usr/bin/env node


const glob = require('glob')
const fs = require('fs')
const colors = require('colors')

// example
// node copyright.js src bin --verify

// debug mode
// node --inspect --debug-brk copyright.js src bin --verify

const getCopyrightHeader = () => {
    // TODO - read copyright headers from .txt files instead of hardcoding
    // or allow for dynamic changing of comment types (per language) (""" for python, etc)
    return `/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
\n`
}

const isCopyrightHeader = (data) => {
    if (data.indexOf('Copyright') >= 0) {
        return true
    }
    return false
}

const writeCopyrightHeader = (pathName, data) => {
    fs.writeFile(pathName, data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

const checkHeaders = (dir) => {
    const filetype = '.js' // TODO - get extension from user input / command line arg

    glob(`../${dir}/**/*${filetype}`, (err, files) => {

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
                        console.log('ERROR: Please add Copyright headers to all source files'.red)
                        process.exit(1)
                    } else {
                        const newData = getCopyrightHeader() + data
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
