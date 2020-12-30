import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import scss from 'rollup-plugin-scss';
import preprocess from 'svelte-preprocess'
import dotenv from 'dotenv';

dotenv.config();
const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
};

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		replace({
			ENV: JSON.stringify({
				"FIREBASE_API": process.env.FIREBASE_API,
				"FIREBASE_DOMAIN": process.env.FIREBASE_DOMAIN,
				"FIREBASE_PROJECT_ID": process.env.FIREBASE_PROJECT_ID,
				"FIREBASE_STORAGE_BUCKET": process.env.FIREBASE_STORAGE_BUCKET,
				"FIREBASE_SENDER_ID": process.env.FIREBASE_SENDER_ID,
				"FIREBASE_APP_ID": process.env.FIREBASE_APP_ID,
				"FIREBASE_MEASUREMENT_ID": process.env.FIREBASE_MEASUREMENT_ID
			})
		}),
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			},
			// pre-processor for scss
			preprocess: preprocess()
		}),
		//rollup-plugin-scss
		scss({
			watch: "src/scss/"
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
