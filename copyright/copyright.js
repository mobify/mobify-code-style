/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved. */
/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */

const glob = require('glob')
const fs = require('fs')

const copyright = {
    items: [],
    missingHeaders: [],
    ext: '',
    lintMode: false,
    updateHeaders() {
        let argumentsProcessed = 0
        this.items.forEach((item, index, arr) => {
            fs.readFile(item, (err, data) => {
                if (!this.hasCopyrightHeader(data)) {
                    if (this.lintMode === true) {
                        console.log(`\x1b[33m Missing copyright headers in \x1b[36m ${item}`)
                        this.missingHeaders.push(item)
                    } else {
                        this.writeHeader(item, data)
                    }
                }
                argumentsProcessed++

                // need to check lint status after all async
                // file reads are finished
                if (argumentsProcessed === arr.length && this.lintMode === true) {
                    this.getLintStatus()
                }
            })
        })
    },
    hasCopyrightHeader(data) {
        if (data.indexOf('Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved.') >= 0) {
            return true
        }
        return false
    },
    setExtension(globStr) {
        const ext = globStr.match(/\.[0-9a-z]+$/i)
        this.ext = ext[0]
    },
    writeHeader(file, data) {
        const copyrightText = fs.readFileSync(`headers/copyright${this.ext}.txt`)
        const newData = copyrightText + data

        fs.writeFile(file, newData, (err) => {
            if (err) {
                console.log(err)
            }
        })
    },
    getLintStatus() {
        if (this.missingHeaders.length > 0) {
            console.log('\x1b[31m \x1b[40mERROR\x1b[49m - Please run the copyright headers tool in this project')
            process.exit(1)
        } else {
            console.log('\x1b[36m Copyright Headers Present')
        }
    },
    run() {
        // Sets lint flag if the user provides --lint command line arg
        if (process.argv.indexOf('--lint') >= 0) {
            process.argv.splice(process.argv.indexOf('--lint'), 1)
            this.lintMode = true
        }

        // Need to add case for when the user does not provide any glob strings
        // i.e. node copyright.js
        if (process.argv.length <= 2) {
            console.log('\x1b[36m Please enter a list of globs to add copyrights to, followed by an optional --lint command')
            console.log('\x1b[33m example - "node copyright.js src/**/*.js --lint"')
        }

        let argumentsProcessed = 0

        process.argv.forEach((dir, index, args) => {
            if (!/node/.test(dir) && !/copyright/.test(dir)) {
                copyright.setExtension(dir)
                glob(`${dir}`, (err, files) => {
                    copyright.items.push(files[0])
                    argumentsProcessed++

                    // Only update headers on last async glob call
                    // once all items are pushed to copyright object
                    if (argumentsProcessed === args.length) {
                        copyright.updateHeaders()
                    }
                })
            } else {
                argumentsProcessed++
            }
        })
    }
}

copyright.run()
