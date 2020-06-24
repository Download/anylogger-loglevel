import replace from 'rollup-plugin-re'
import pkg from './package.json'

export default [
	{
		input: pkg.src,
		output: [
      // ES module build
			{ file: pkg.module, format: 'esm', strict: false },

      // commonjs build
			{ file: pkg.main,  format: 'cjs', strict: false },
		],
		external: [ 'anylogger', 'loglevel' ],
	},
	{
		input: pkg.src,
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
