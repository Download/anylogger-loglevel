
import fs from 'fs'
import UglifyJS from 'uglify-js'
import { gzipSizeSync } from 'gzip-size'

// be cool and use anylogger-loglevel to print the logging in the build of anylogger-loglevel :)
import 'anylogger-loglevel'
import anylogger from 'anylogger'
import loglevel from 'loglevel'
const log = anylogger('anylogger-loglevel')
loglevel.getLogger('anylogger-loglevel').setLevel('debug')

var [ processName, script, command, ...args ] = process.argv
var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))
var v = pkg.version

;(function(){
  var data = fs.readFileSync(pkg.iife, 'utf8')

  if (!command || command == 'minify') {
    data = UglifyJS.minify(data);
    if (data.error) {
      return log('error', data)
    }
    data = data.code;
    fs.writeFileSync(pkg.min, data, 'utf8')
  }
  else {
    data = fs.readFileSync(pkg.min, 'utf8')
  }

  var min = data.length
  var gzip = gzipSizeSync(data)

  if (!command || command == 'minify') {
    log('info', 'created ' + pkg.min + ' (' + min + 'B, gzipped ~' + gzip + 'B)')
  }

  var av = pkg.devDependencies.anylogger.substring(1)
  var lv = pkg.devDependencies.loglevel.substring(1)

  if (!command || command == 'docs') {
    var readme = fs.readFileSync('README.md', 'utf-8')
    readme = readme.replace(/minified \d\d\d bytes/g, 'minified ' + min + ' bytes')
    readme = readme.replace(/\[\d\d\d\]\(#gzip-size\)/g, '[' + gzip + '](#gzip-size)')
    readme = readme.replace(/\<sub\>\<sup\>\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\<\/sup\>\<\/sub\>/g, `<sub><sup>${v}</sup></sub>`)
    readme = readme.replace(/\/anylogger-loglevel@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?/g, `/anylogger-loglevel@${v}`)
    readme = readme.replace(/\/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `/anylogger@${av}/`)
    readme = readme.replace(/\/loglevel@\d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\//g, `/loglevel@${lv}/`)
    fs.writeFileSync('README.md', readme, 'utf8')
    log.info('updated readme')
    var html = fs.readFileSync('test.html', 'utf-8')
    html = html.replace(/\<h1\>anylogger-loglevel \d(\d)?\.\d(\d)?\.\d(\d)?(-([a-zA-Z0-9\.])*)?\<\/h1\>/g, `<h1>anylogger-loglevel ${v}</h1>`)
    html = html.replace(/\/anylogger\@\d(\d)?\.\d(\d)?\.\d(\d)?\//g, `/anylogger@${av}/`)
    html = html.replace(/\/loglevel\@\d(\d)?\.\d(\d)?\.\d(\d)?/g, `/loglevel@${lv}`)
    fs.writeFileSync('test.html', html, 'utf8')
    log.info('updated test.html')
  }
})()