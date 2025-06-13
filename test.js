'use strict'

const t = require('tap')
const http = require('http')
const semver = require('semver')
const pkgVersions = require('./')

t.test('exsiting package', function (t) {
  pkgVersions('npm', function (err, versions) {
    t.error(err)
    t.ok(Array.isArray(versions))
    t.ok(versions.length > 0)
    t.ok(versions.every(function (v) {
      return typeof v === 'string'
    }))
    t.ok(versions.every(function (v) {
      return semver.valid(v)
    }))
    t.end()
  })
})

t.test('non-existing package', function (t) {
  pkgVersions('npm-package-versions-' + Date.now(), function (err, versions) {
    t.ok(err instanceof Error)
    t.equal(versions, undefined)
    t.equal(err.message.indexOf('Registry returned 404'), 0)
    t.end()
  })
})

t.test('custom registry', function (t) {
  const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ versions: { '1.0.0': 'dummy', '1.0.1': 'dummy' } }))
  })
  server.listen(3001, function () {
    pkgVersions('npm', 'http://localhost:3001', function (err, versions) {
      t.error(err)
      t.ok(Array.isArray(versions))
      t.strictSame(versions, ['1.0.0', '1.0.1'])
      server.on('close', function () {
        t.end()
      })
      server.close()
    })
  })
})
