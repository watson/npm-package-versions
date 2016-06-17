'use strict'

var log = require('npmlog')
var RegClient = require('npm-registry-client')

log.level = 'silent'
fetch.uri = 'https://registry.npmjs.org/'
fetch.params = {}

var client = new RegClient({ log: log })

module.exports = function fetch (name, cb) {
  client.get(fetch.uri + name, fetch.params, function (err, data) {
    if (err) return cb(err)
    cb(null, Object.keys(data.versions))
  })
}
