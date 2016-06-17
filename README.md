# npm-package-versions

Get an array of all available versions of a given npm package.

[![Build status](https://travis-ci.org/watson/npm-package-versions.svg?branch=master)](https://travis-ci.org/watson/npm-package-versions)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install npm-package-versions --save
```

## Usage

```js
var pkgVersions = require('npm-package-versions')

pkgVersions('bonjour', function (err, versions) {
  if (err) throw err
  console.log('Bonjour package versions available:')
  versions.forEach(function (version) {
    console.log('- %s', version)
  })
})
```

## API

### `pgkVersions.uri`

Set this property to overwrite the default registry URI.

Defaults to `https://registry.npmjs.org/`

### `pkgVersions.params`

Set the property to overwrite the default
[npm-registry-client](https://www.npmjs.com/package/npm-registry-client)
params for
[`client.get`](https://www.npmjs.com/package/npm-registry-client#clientgeturi-params-cb).

Defaults to `{}`.

## License

MIT
