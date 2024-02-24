import pkg from './package.json' assert { type: 'json' }

export default [
	{
		input: pkg.main,
		output: [
      // commonjs build
			{ file: pkg.cjs, format: 'cjs', strict: false },
		],
		external: [ 'anylogger', 'loglevel' ],
	},
	{
		input: pkg.main,
		output: [
      // browser-friendly build
			{ file: pkg.iife, name: 'adapter', format: 'iife', strict: false, globals: {anylogger: 'anylogger', loglevel: 'log'} },
		],
		external: [ 'anylogger', 'loglevel' ],
	},
];
