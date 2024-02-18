import replace from 'rollup-plugin-re'
import pkg from './package.json' assert { type: 'json' }

export default [
	{
		input: pkg.main,
		output: [
      // commonjs build
			{ file: pkg.cjs,  format: 'cjs', strict: false },
		],
		external: [ 'anylogger', 'loglevel' ],
	},
	{
		input: pkg.main,
		output: [
      // browser-friendly build
			{ file: pkg.iife,  format: 'iife', strict: false, globals: {anylogger: 'anylogger', loglevel: 'log'} },
		],
		external: [ 'anylogger', 'loglevel' ],
		plugins: [
			// remove import bloat from iife bundle
			replace({
				patterns: [
					{
						match: /anylogger-loglevel/,
						test: 'import anylogger from \'anylogger\'',
						replace: '',
					}, {
						match: /anylogger-loglevel/,
						test: 'import log from \'loglevel\'',
						replace: '',
					},
				]
			})
		],
	},
];
