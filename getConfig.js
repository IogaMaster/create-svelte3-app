const inquirer = require('inquirer');

module.exports = async function getConfig(input, flags, SETTINGS) {
	async function projectName() {
		const projectName = 'svelte3-app';
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
	SETTINGS.projectName = await projectName();
	return;
};
