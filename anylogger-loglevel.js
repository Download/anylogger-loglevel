var a = require('anylogger')
var loglevel = require('loglevel')
loglevel = hook(loglevel, loglevel.setLevel)

// maintain a mapping of names to loglevel loggers
var m = Object.create(null)

// make level numbers compatible with loglevel
a.levels = {
  trace: 0, 
  debug: 1,
  log: 1, // loglevel maps log to debug
  info: 2, 
  warn: 3,
  error: 4, 
};

// hooks a setLevel function that re-extends all anylogger loggers
function hook(o,s){
  o.setLevel = function(){
    var r = s.apply(o, arguments)
    for (var name in a()) a.ext(a(name))
    return r
  }
  return o
}

// override anylogger.ext() to make every log method use loglevel
a.ext = function(l,o) {
  o = m[l.name] || (m[l.name] = hook(loglevel.getLogger(l.name), loglevel.getLogger(l.name).setLevel))
  for (v in a.levels) {
    l[v] = o[v]
  }
  l.enabledFor = function(lvl) {
    return a.levels[lvl] >= o.getLevel()
  }
  return l;
};
