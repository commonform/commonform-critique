#!/usr/bin/env node
var chunks = []
process.stdin
  .on('data', function (chunk) {
    chunks.push(chunk)
  })
  .once('error', function (error) {
    console.error(error)
    process.exit(1)
  })
  .once('end', function () {
    var input = Buffer.concat(chunks).toString()
    try {
      var form = JSON.parse(input)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
    var critique = require('./')
    console.log(JSON.stringify(critique(form)))
  })
