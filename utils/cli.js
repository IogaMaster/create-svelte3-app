const meow = require('meow');
const meowHelp = require('cli-meow-help');
const chalk = require('chalk');

const flags = {
	clear: {
		type: `boolean`,
		default: false,
		alias: `c`,
		desc: `Clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	type: {
		type: 'string',
		desc: `What type of project you want.`
	},
	typescript: {
		type: 'boolean',
		alias: 't',
		desc: `Use ${chalk.blue('Typescript')} in this project`
	},
	eslint: {
		type: 'boolean',
		alias: 'e',
		desc: `Use ${chalk.magenta('ESLint')} in this project`
	},
	prettier: {
		type: 'boolean',
		alias: 'p',
		desc: `Use Prettier in this project`
	},
	jest: {
		type: 'boolean',
		alias: 'j',
		desc: `Use ${chalk.red('Jest')} in this project`
	},
	husky: {
		type: 'boolean',
		alias: 'h',
		desc: `Use ${chalk.grey('Husky')} in this project`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `create-svelte3-app`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
