'use strict'

const http = require('http')
const https = require('https')

const DEFAULT_REGISTRY = 'https://registry.npmjs.org'

module.exports = function fetch (name, registry, cb) {
  if (typeof registry === 'function') {
    cb = registry
    registry = DEFAULT_REGISTRY
  } else if (!registry) {
    registry = DEFAULT_REGISTRY
  }

  const get = registry.startsWith('https://') ? https.get : http.get
  registry = registry.endsWith('/') ? registry.slice(0, -1) : registry

  get(`${registry}/${name}`, function (res) {
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
