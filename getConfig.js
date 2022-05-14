const inquirer = require('inquirer');

module.exports = async function getConfig(input, flags, SETTINGS) {
	async function projectName() {
		let projectName = 'svelte3-app';
		if (input[0] != null) {
			projectName = input[0];
		} else {
			projectName = await inquirer.prompt({
				name: 'projectName',
				type: 'input',
				message: 'What is the name of your project: ',
				default() {
					return SETTINGS.projectName;
				}
			}).projectName;
		}
		return projectName;
	}

	async function projectType() {
		let projectType = 'svelte-rollup';
		if (flags.projectType == null) return;
		if (
			flags.projectType.toLowerCase() == 'rollup' ||
			flags.projectType.toLowerCase() == 'kit' ||
			flags.projectType.toLowerCase() == 'vite'
		) {
			projectType = 'svelte-' + flags.projectType.toLowerCase();
		} else {
			projectType =
				'svelte-' +
				(await inquirer.prompt({
					name: 'projectType',
					type: 'list',
					choices: ['rollup', 'kit', 'vite'],
					default() {
						return 'rollup';
					}
				}));
		}
		return projectType;
	}

	async function getSettings() {
		let settings = [];
		console.log(flags.typescript);
		if (
			flags.typescript ||
			flags.eslint ||
			flags.prettier ||
			flags.jest ||
			flags.husky
		) {
			settings = [
				flags.typescript ? 'Typescript' : null,
				flags.ESLint ? 'ESLint' : null,
				flags.Prettier ? 'Prettier' : null,
				flags.Jest ? 'Jest' : null,
				flags.Husky ? 'Husky' : null
			];
		} else {
			settings = await inquirer.prompt({
				name: 'settings',
				type: 'checkbox',
				choices: ['Typescript', 'ESLint', 'Prettier', 'Jest', 'Husky']
			});
		}
		return settings.settings;
	}

	await getSettings();
	return;
};
