/* * *  *  * *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  *  * */
/* Copyright (c) year Mobify Research & Development Inc. All rights reserved. */
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

const args = process.argv.filter((arg) => {
    return !/node|copyright/.test(arg)
})

const copyright = {
    lintMode: {
        enabled: false,
        passed: true
    },
    '.js': 'headers/copyright.js.txt', // hardcode these?
    '.py':  'headers/copyright.py.txt',
    '.jsx': 'headers/copyright.js.txt',
    run() {
        const processedGlobs = args.map((folder) => {
            return new Promise((resolve) => {
                glob(`${folder}`, (err, file) => {
                    resolve(file[0])
                })
            })
        })

        Promise.all(processedGlobs).then((files) => {
            let filesProcessed = 0
            files.forEach((file, index, array) => {
                const content = fs.readFileSync(file)
                const copyrightStr = 'Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved.'
                const hasCopyrightHeader = content.indexOf(copyrightStr) >= 0
                const ext = file.match(/\.[0-9a-z]+$/i)[0]

                if (!hasCopyrightHeader) {
                    if (this.lintMode.enabled) {
                        console.log(`${yellow}${file} ${red}missing copyright header`)
                        this.lintMode.passed = false
                    } else {
                        const newData = this.getHeaderText(ext) + content
                        fs.writeFile(file, newData, (err) => {
                            if (err) {
                                console.log(err)
                            }
                            console.log(`${green}Copyright header succesfully written into ${magenta}${file}`)
                        })
                    }
                }
                filesProcessed++

                if (filesProcessed === array.length && !this.lintMode.passed) {
                    console.log(`${red}${blackBG}ERROR${defaultBG} - Please run the copyright headers tool in this project`)
                    process.exit(1)
                }
            })
        })
    },
    getHeaderText(ext) {
        if (!this[ext]) {
            console.log(`${red}${blackBG}ERROR${defaultBG} - ${ext} does not exist`)
            process.exit(1)
        } else {
            const textPath = path.join(__dirname, `./${this[ext]}`)
            return fs.readFileSync(textPath)
        }
    },
}

if (args.length === 0) {
    console.log(`${cyan}Please enter a list of globs to add copyrights to, followed by an optional --lint command`)
    console.log(`${yellow}example - "node copyright.js src/**/*.js --lint"`)
    process.exit(0)
}

// Sets lint flag if the user provides --lint command line arg
if (args.indexOf('--lint') >= 0) {
    args.splice(args.indexOf('--lint'), 1)
    copyright.lintMode.enabled = true
}

copyright.run()
