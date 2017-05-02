const glob = require('glob')
const fs = require('fs')
const colors = require('colors')

// dev:
// node --inspect --debug-brk copyright.js ../../progressive-web-sdk/bin/**/*.js

// test:
// node copyright.js ../../progressive-web-sdk/bin/**/*.js
// node copyright.js ../../progressive-web-sdk/bin/**/*.js --lint

const copyright = {
    items: [],
    ext: '',
    lintMode: false,
    updateHeaders() {
        this.items.forEach((item) => {
            fs.readFile(item, (err, data) => {
                if (!this.hasCopyrightHeader(data)) {
                    if (this.lintMode === true) {
                        console.log('ERROR: Missing Copyright Headers - Please run the copyright header tool in this project'.red)
                        process.exit(1)
                    } else {
                        this.writeHeader(item, data)
                    }
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
    run() {
        // Sets lint flag if the user provides --lint command line arg
        if (process.argv.indexOf('--lint') >= 0) {
            process.argv.splice(process.argv.indexOf('--lint'), 1)
            this.lintMode = true
        }

        // Need to add case for when the user does not provide any glob strings
        // i.e. node copyright.js
        if (process.argv.length <= 2) {
            console.log('Please enter a list of globs to add copyrights to, followed by an optional --lint command'.cyan)
            console.log('example - "node copyright.js src/**/*.js --lint"'.yellow)
        }

        let argumentsProcessed = 0

        process.argv.forEach((dir, index, args) => {
            if (!/node/.test(dir) && !/copyright/.test(dir)) {
                copyright.setExtension(dir)
                glob(`${dir}`, (err, files) => {
                    copyright.items.push(files[0])
                    argumentsProcessed++

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
