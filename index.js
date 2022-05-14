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

const generateProject = require('./generateProject');
const getConfig = require('./getConfig');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

let SETTINGS = {
	projectName: 'svelte3-app',
	projectType: 'svelte-rollup',
	config: []
};

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	await getConfig(input, flags, SETTINGS);

	await generateProject(SETTINGS);

	debug && log(flags);
})();
