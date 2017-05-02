const glob = require('glob')
const fs = require('fs')
const colors = require('colors')

// node --inspect --debug-brk copy2.js ../../progressive-web-sdk/bin/**/*.js
// node copy2.js ../../progressive-web-sdk/bin/**/*.js
const copyright = {
    items: [],
    updateHeaders: function() {
        this.items.forEach((item) => {
            fs.readFile(item, (err, data) => {
                if (!this.hasCopyrightHeader(data)) {
                    this.writeHeader(item, data)
                }
            })
        })
    },
    hasCopyrightHeader: function(data) {
        if (data.indexOf('Copyright (c) 2017 Mobify Research & Development Inc. All rights reserved.') >= 0) {
            return true
        }
        return false
    },
    getExtension: function(file) {
        const ext = file.match(/\.[0-9a-z]+$/i)
        return ext ? ext[0] : false
    },
    writeHeader: function(file, data) {
        const copyrightText = fs.readFileSync(`headers/copyright.js.txt`)
        const newData = copyrightText + data

        fs.writeFile(file, newData, (err) => {
            if (err) {
                console.log(err)
            }
        })
    }
}


let argumentsProcessed = 0

process.argv.forEach(function(dir, index, args) {
    glob(`${dir}`, (err, files) => {
        copyright.items.push(files[0])
        argumentsProcessed++

        if (argumentsProcessed === args.length) {
            copyright.updateHeaders()
        }
    })
})
