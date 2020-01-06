var fs = require('fs')
var UglifyJS = require('uglify-js')
var gzipSize = require('gzip-size')
// be cool and use anylogger to print the logging in the build of anylogger-debug :)
var log = require('anylogger')('anylogger-loglevel')

var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version
var av = pkg.devDependencies.anylogger.substring(1)
var data = fs.readFileSync('./anylogger-loglevel.js', 'utf8')
data = data.replace('module.exports', 'window[\'anylogger-loglevel\']')
data = `(function(require){${data}})(function(name){return window[name] || window.log})`

data = UglifyJS.minify(data).code
fs.writeFileSync('anylogger-loglevel.min.js', data, 'utf8')

var min = data.length, gzip = gzipSize.sync(data)
log.info('Created anylogger-loglevel.min.js (' + min + 'B, gzipped ~' + gzip + 'B)')

var readme = fs.readFileSync('./README.md', 'utf-8')
readme = readme.replace(/minified \d\d\d bytes/g, 'minified ' + min + ' bytes')
readme = readme.replace(/\[\d\d\d\]\(#gzip-size\)/g, '[' + gzip + '](#gzip-size)')
readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
readme = readme.replace(/anylogger-loglevel\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger-loglevel@${v}/`)
readme = readme.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger@${av}/`)

readme = readme.replace(/\>\=\d(\d)?\.\d(\d)?\.\d(\d)?/g, `>=${v}`)
fs.writeFileSync('README.md', readme, 'utf8')
log.info('Updated README')

var html = fs.readFileSync('./index.html', 'utf-8')
html = html.replace(/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `anylogger@${av}/`)
fs.writeFileSync('index.html', html, 'utf8')
log.info('Updated index.html')
