'use strict'

var https = require('https')

module.exports = fetch

function fetch (name, cb) {
  https.get('https://registry.npmjs.org/' + name, function (res) {
    if (res.statusCode !== 200) {
      res.destroy()
      cb(new Error('Registry returned ' + res.statusCode))
      return
    }

    var buffers = []
    res.on('data', buffers.push.bind(buffers))
    res.on('end', function () {
      var data = Buffer.concat(buffers)
      cb(null, Object.keys(JSON.parse(data).versions))
    })
  })
}
