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

const args = process.argv.filter((arg) => {
    return !/node|copyright/.test(arg)
})

const copyright = {
    lintMode: false,
    langs: {},
    run() {
        this.buildSupportedExtensions()
        const processedGlobs = args.map((folder) => {
            return new Promise((resolve) => {
                glob(`${folder}`, (err, file) => {
                    resolve(file[0])
                })
            })
        })

        Promise.all(processedGlobs).then((files) => {
            const filesMissingHeader = files.filter((file) => {
                const content = fs.readFileSync(file)
                const copyrightStr = 'Copyright (c)'
                const hasCopyrightHeader = content.indexOf(copyrightStr) >= 0
                const ext = file.match(/\.[0-9a-z]+$/i)[0]

                if (!hasCopyrightHeader) {
                    if (this.lintMode) {
                        console.log(`${yellow}${file} ${red}missing copyright header`)
                        return false
                    } else {
                        const newData = this.getHeaderText(ext) + content
                        fs.writeFileSync(file, newData)
                        console.log(`${green}Copyright header succesfully written into ${magenta}${file}`)
                        return true
                    }
                } else {
                    return true
                }
            })

            if (filesMissingHeader.length !== files.length) {
                console.log(`${red}${blackBG}ERROR${defaultBG} - Please run the copyright headers tool in this project`)
                process.exit(1)
            } else {
                console.log(`${cyan}Copyright headers are present in target files`)
            }
        })
    },
    getHeaderText(ext) {
        if (!this.langs[ext]) {
            console.log(`${red}${blackBG}ERROR${defaultBG} - ${ext} is not supported (yet)`)
            process.exit(1)
        } else {
            const textPath = path.join(__dirname, `./headers/${this.langs[ext]}`)
            return fs.readFileSync(textPath).toString().replace('year', new Date().getFullYear())
        }
    },
    buildSupportedExtensions() {
        const supportedHeaders = path.join(__dirname, './headers')
        fs.readdir(supportedHeaders, (err, filenames) => {
            filenames.forEach((file) => {
                const extension = file.match(/\.[0-9a-z]+/i)[0]
                this.langs[extension] = file
            })
        });
    }
}

if (args.length === 0 || args.indexOf('--help') >= 0) {

    console.log(`
    Usage: node copyright.js [options] _glob pattern_ [additional globs]

    where _glob pattern_ is a glob string

    Example:
        ${yellow}node copyright.js --lint${defaultFG} src/**/*.js

        Options:

            --lint        enable lint mode

    Visit ${cyan}https://github.com/mobify/mobify-code-style${defaultFG} to learn more.
`)

    process.exit(0)
}

// Sets lint flag if the user provides --lint command line arg
if (args.indexOf('--lint') >= 0) {
    args.splice(args.indexOf('--lint'), 1)
    copyright.lintMode = true
}

copyright.run()
