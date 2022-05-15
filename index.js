#!/usr/bin/env node

/**
 * create-svelte3-app
 * Create a configured Svelte 3 app quickly.
 *
 * @author IogaMaster <https://github.com/IogaMaster/create-svelte3-app>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const getConfig = require('./utils/getConfig');
const generateProject = require('./utils/generateProject');
const chalk = require('chalk');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

let SETTINGS = {
	projectName: 'svelte3-app',
	projectType: 'svelte-rollup',
	useTypescript: false,
	useESLint: false,
	usePrettier: false,
	useJest: false,
	useHusky: false
};

const import_meta_url =
	typeof document === 'undefined'
		? new (require('url'.replace('', '')).URL)('file:' + __filename).href
		: (document.currentScript && document.currentScript.src) ||
		  new URL('main.js', document.baseURI).href;

const ___dirname = dirname(fileURLToPath(import_meta_url));
const templateDir = resolve(`${___dirname}/templates/`);

(async function () {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	await getConfig(input, flags, SETTINGS);

	await generateProject(SETTINGS, templateDir);

	console.log(`
We suggest you run:

$ ${chalk.green('npm')} install`);
})();
