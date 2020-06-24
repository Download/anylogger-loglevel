# anylogger-loglevel <sub><sup>1.0.0</sup></sub>
### Anylogger adapter for loglevel

[![npm](https://img.shields.io/npm/v/anylogger-loglevel.svg)](https://npmjs.com/package/anylogger-loglevel)
[![license](https://img.shields.io/npm/l/anylogger-loglevel.svg)](https://opensource.org/licenses/MIT)
[![travis](https://img.shields.io/travis/Download/anylogger-loglevel.svg)](https://travis-ci.org/Download/anylogger-loglevel?branch=master)
![mind BLOWN](https://img.shields.io/badge/mind-BLOWN-ff69b4.svg)

<sup><sub><sup><sub>.</sub></sup></sub></sup>

## What is this?
This is an [anylogger](https://npmjs.com/package/anylogger) adapter for [loglevel](https://npmjs.com/package/loglevel).

This package is meant for application projects that are using libraries using `anylogger`. By including this adapter in your project, all libraries using `anylogger` will automatically start to use `loglevel` as their logging framework.

## Download

* [anylogger-loglevel.js](https://unpkg.com/anylogger-loglevel@1.0.0/anylogger-loglevel.js) 
  (fully commented source ~1kB)
* [anylogger-loglevel.min.js](https://unpkg.com/anylogger-loglevel@1.0.0/anylogger-loglevel.min.js) 
  (minified 472 bytes, gzipped ~[272](#gzip-size) bytes)


## CDN

*index.html*
```html
<script src="https://unpkg.com/anylogger@1.0.3/anylogger.min.js"></script>
<script src="https://unpkg.com/loglevel@1.6.8/dist/loglevel.min.js"></script>
<script src="https://unpkg.com/anylogger-loglevel@1.0.0/anylogger-loglevel.min.js"></script>
<script>(function(){ // IIFE
  var log = anylogger('index.html')
  log.info('Logging is simple!')
  // to see logging, enable it by typing this in the console:
  // localStorage.setItem('loglevel:index.html', 'DEBUG')
  // then refresh the page
})()</script>
```

> When used in the browser with global names (like when used from CDN as in the example above), `loglevel` publishes itself to `window.log`, not `window.loglevel` as one might expect.

## Install

Install this adapter, as well as both `anylogger` and `loglevel`:

```sh
npm install --save anylogger-loglevel anylogger loglevel
```

## Include in your application project
This package is meant for application projects. If you are writing a library to be NPM installed into some other project, most likely you should not include any adapter, but instead just use `anylogger` directly.

The `anylogger-loglevel` adapter will modify the `anylogger` factory in such a way that the loggers it creates will be logging to `loglevel`. 

> When using `loglevel`, all logging except for warnings and errors is supressed by default. 
As such, you should make sure to set the log level to INFO or DEBUG [as usual](https://www.npmjs.com/package/loglevel#documentation) before expecting to see any output.

To activate the adapter, include it in your application entry point.

### Require

*main.js*
```js
require('anylogger-loglevel')
```

### Import

*main.js*
```js
import 'anylogger-loglevel'
```

## Logging in the application project
In your application module code, only use anylogger to stay framework independent:

*my-module.js*
```js
import anylogger from 'anylogger'
const log = anylogger('my-module')
log('Logging is simple!')
```

This is helpful if you ever decide to factor out the application module into a separate library.

## log configuration in the application project

Because `anylogger` is simply using `loglevel` below the surface, you can use
all the normal configuration mechanisms available for `loglevel`.

If you need to control log settings programmatically, just import `loglevel` and
use it directly:

*main.js*
```js
// ...
import loglevel from 'loglevel'
loglevel.getLogger('my-module').setLevel(loglevel.levels.INFO)
// ...
```

## Issues

Add an issue in this project's 
[issue tracker](https://github.com/download/anylogger-loglevel/issues) 
to let me know of any problems you find, or questions you may have.


## Copyright

© 2020 by [Stijn de Witt](https://stijndewitt.com). Some rights reserved.


## License

Licensed under the [MIT Open Source license](https://opensource.org/licenses/MIT).

## gzip-size
The GZIP algorithm is available in different flavours and with different 
possible compression settings. The sizes quoted in this README have been
measured using [gzip-size](https://npmjs.com/package/gzip-size) 
by [Sindre Sorhus](https://github.com/sindresorhus), your mileage may vary.
