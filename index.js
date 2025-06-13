'use strict'

const https = require('https')

module.exports = function fetch (name, cb) {
  https.get(`https://registry.npmjs.org/${name}`, function (res) {
    if (res.statusCode !== 200) {
      res.destroy()
      cb(new Error(`Registry returned ${res.statusCode}`))
      return
    }

    const buffers = []
    res.on('data', buffers.push.bind(buffers))
    res.on('end', function () {
      const data = Buffer.concat(buffers).toString()
      cb(null, Object.keys(JSON.parse(data).versions))
    })
  })
}
