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

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	debug && log(flags);
})();
