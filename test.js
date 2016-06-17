'use strict'

var test = require('tape')
var semver = require('semver')
var pkgVersions = require('./')

test('exsiting package', function (t) {
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

test('non-existing package', function (t) {
  pkgVersions('npm-package-versions-' + Date.now(), function (err, versions) {
    t.ok(err instanceof Error)
    t.equal(versions, undefined)
    t.equal(err.message.indexOf('Registry returned 404'), 0)
    t.end()
  })
})
