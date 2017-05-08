#!/usr/bin/env node
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const glob = require('glob')
const fs = require('fs')
const path = require('path')

const red = '\x1b[31m'
const green = '\x1b[32m'
const yellow = '\x1b[33m'
const magenta = '\x1b[35m'
const cyan = '\x1b[36m'
const blackBG = '\x1b[40m'
const defaultBG = '\x1b[49m'
const defaultFG = '\x1b[39m'

const currentYear = new Date().getFullYear()
const langs = {}

let lintMode = true
let updateMode = false
let error = false

// we don't want to pass node and copyright.js directories to the glob
const args = process.argv.filter((arg) => {
    return !/node|copyright/.test(arg)
})

/**
 * getHeaderText - retrieve appropriate header file context from langs{} object
 * @param  {String} ext file extension of desired header file
 * @return {String}     content of appropriate header file
 */
const getHeaderText = (ext) => {
    if (!langs[ext]) {
        console.log(`${red}${blackBG}ERROR${defaultBG} - ${ext} is not supported (yet)`)
        process.exit(1)
    }
    return langs[ext]
}

/**
 * buildSupportedExtensions - initializes the langs{} object with the supported
 * extensions, as well as their respective (c) header content
 * @return {undefined} - populates the langs{} object
 */
const buildSupportedExtensions = () => {
    const headerDir = path.join(__dirname, './headers')
    fs
        .readdirSync(headerDir)
        .forEach((file) => {
            const extension = file.match(/\.[0-9a-z]+$/i)[0]
            const textPath = path.join(headerDir, file)
            const content = fs
                              .readFileSync(textPath)
                              .toString()
                              .replace('year', currentYear)

            langs[extension] = content
        })
}

/**
 * Removes extra \n characters from the top of any files
 * to ensure more consistent spacing between copyright headers
 * @param  {String} content original file to edit
 * @return {String}         new file with no leading \n
 */
const removeLeadingNewlines = (content) => {
    if (content[0] !== '') {
        return content
    }
    content.shift()
    return removeLeadingNewlines(content)
}

if (args.length === 0 || args.indexOf('--help') >= 0) {

    console.log(`
    Usage: node copyright.js [options] 'glob' ['additional globs']

    If your glob is not targetting all nested directories, ensure that the glob string is wrapped in single quotes

    Example:
        ${yellow}node copyright.js --fix${defaultFG} 'src/**/*.js'

        Options:

            --fix        run in fix mode
            --update     update the year in existing headers

    Visit ${cyan}https://github.com/mobify/mobify-code-style${defaultFG} to learn more.
`)

    process.exit(0)
}

// Sets fix flag if the user provides --fix command line arg
if (args.indexOf('--fix') >= 0) {
    args.splice(args.indexOf('--fix'), 1)
    lintMode = false
}

if (args.indexOf('--update') >= 0) {
    args.splice(args.indexOf('--update'), 1)
    updateMode = true
}

buildSupportedExtensions()

args
    .map((folder) => glob.sync(folder)) // build array of files matching glob pattern
    .reduce((a, b) => a.concat(b))      // flatten array of arrays
    .forEach((file) => {
        const content = fs.readFileSync(file)
        const hasCopyrightHeader = content.includes('Copyright (c)')
        const ext = file.match(/\.[0-9a-z]+$/i)[0]
        let newData = ''

        if (hasCopyrightHeader && updateMode) {
            let previousHeaderYear = content.toString().match(/(?:\(c\))(?:\s)(\d{4})/)[1]
            if (previousHeaderYear !== currentYear.toString()) {
                newData = content.toString().replace(`(c) ${previousHeaderYear}`, `(c) ${currentYear}`)
                fs.writeFileSync(file, newData)
                console.log(`${green}Copyright header succesfully updated from ${previousHeaderYear} to ${currentYear} in ${magenta}${file}`)
            }
        }

        if (!hasCopyrightHeader) {
            if (lintMode) {
                console.log(`${yellow}${file} ${red}missing copyright header`)
                error = true
            } else {
                let contentStr = content.toString().split('\n')

                // accomodate for shebang and insert before header
                if (contentStr[0].indexOf('#!') >= 0) {
                    const shebang = contentStr.shift()
                    contentStr = removeLeadingNewlines(contentStr).join('\n')
                    newData = shebang + '\n' + getHeaderText(ext) + '\n' + contentStr // eslint-disable-line prefer-template
                } else {
                    contentStr = removeLeadingNewlines(contentStr).join('\n')
                    newData = getHeaderText(ext) + `\n${contentStr}`  // eslint-disable-line prefer-template
                }

                fs.writeFileSync(file, newData)
                console.log(`${green}Copyright header succesfully written into ${magenta}${file}`)
            }
        }
    })

if (error) {
    console.log(`${red}${blackBG}ERROR${defaultBG} - Please run the copyright headers tool in this project`)
    process.exit(1)
} else {
    console.log(`${cyan}Copyright headers are present in target files`)
}
