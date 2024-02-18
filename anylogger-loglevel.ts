import anylogger, { LogFunction, LogLevel, Logger } from 'anylogger'
import loglevel from 'loglevel'

// hook global setLevel so it re-creates all loggers
hook(loglevel, 'setLevel')

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

// hooks a method so that when it's called,
// the relevant loggers will be re-extended
function hook(logger: any, methodName: string, loggerName?: string){
  const method = logger[methodName]
  logger[methodName] = (...args: any) => {
    const result = method(...args)
    if (loggerName) {
      anylogger.ext(anylogger(loggerName))
    } else {
      for (const name in anylogger.all) {
        anylogger.ext(anylogger(name))
      }
    }
    return result
  }
  return logger
}

// override anylogger.ext() to make every log method use loglevel
anylogger.ext = function(logger: LogFunction): Logger {
  const loglevelLogger = loggers[logger.name] ||
    (loggers[logger.name] = hook(loglevel.getLogger(logger.name), 'setLevel', logger.name))
  for (var level in anylogger.levels) {
    (logger as Logger)[level as LogLevel] = loglevelLogger[level]
  }
  (logger as Logger).enabledFor = function(level) {
    return anylogger.levels[level as LogLevel] >= loglevelLogger.getLevel()
  }
  return logger as Logger;
};
