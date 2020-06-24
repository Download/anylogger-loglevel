import anylogger from 'anylogger'
import log from 'loglevel'
hook(log, 'setLevel')

// maintain a mapping of names to loglevel loggers
var loggers = Object.create(null)

// make level numbers compatible with loglevel
anylogger.levels = {
  trace: 0, 
  debug: 1,
  log: 1, // loglevel maps log to debug
  info: 2, 
  warn: 3,
  error: 4, 
}

// hooks a method so that when it's called, all anylogger loggers will be re-extended
function hook(logger, methodName){
  var method = logger[methodName]
  logger[methodName] = function(){
    var result = method.apply(logger, arguments)
    for (var name in anylogger()) anylogger.ext(anylogger(name))
    return result
  }
  return logger
}

// override anylogger.ext() to make every log method use loglevel
anylogger.ext = function(logger) {
  var l = loggers[logger.name] || (loggers[logger.name] = hook(log.getLogger(logger.name), 'setLevel'))
  for (var level in anylogger.levels) {
    logger[level] = l[level]
  }
  logger.enabledFor = function(level) {
    return anylogger.levels[level] >= l.getLevel()
  }
  return logger;
};
