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
        const filesRead = this.items.map((item, index, args) => {
            return new Promise((resolve) => {
                fs.readFile(item, (err, data) => {
                    if (!this.hasCopyrightHeader(data)) {
                        if (this.lintMode === true) {
                            console.log(`\x1b[33m Missing copyright headers in \x1b[36m ${item}`)
                            this.missingHeaders.push(item)
                        } else {
                            this.writeHeader(item, data)
                        }
                    }
                    resolve(item)
                })
            })
        })

        Promise.all(filesRead).then((item) => {
            if (this.lintMode === true) {
                if (this.missingHeaders.length > 0) {
                    console.log('\x1b[31m \x1b[40mERROR\x1b[49m - Please run the copyright headers tool in this project')
                    process.exit(1)
                } else {
                    console.log('\x1b[36m Copyright Headers Present')
                }
            } else {
                item.forEach((item) => {
                    console.log(`\x1b[32mCopyright header succesfully written into \x1b[35m${item}`);
                })
            }
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
        const path = `headers/copyright${this.ext}.txt`

        if (fs.existsSync(path)) {
            console.log(`\x1b[31m \x1b[40mERROR\x1b[49m - ${path} does not exist`)
        }

        const copyrightText = fs.readFileSync(path)
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

        // Case for when the user does not provide any glob strings
        // i.e. node copyright.js
        if (process.argv.length <= 2) {
            console.log('\x1b[36m Please enter a list of globs to add copyrights to, followed by an optional --lint command')
            console.log('\x1b[33m example - "node copyright.js src/**/*.js --lint"')
        }


        const processedGlobs = process.argv.map((dir, index, args) => {
            if (!/node/.test(dir) && !/copyright/.test(dir)) {
                return new Promise((resolve) => {
                    this.setExtension(dir)
                    glob(`${dir}`, (err, files) => {
                        this.items.push(files[0])
                        resolve()
                    })
                })
            }
        })

        Promise.all(processedGlobs).then(() => copyright.updateHeaders())
    }
}

copyright.run()
