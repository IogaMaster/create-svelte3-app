const inquirer = require('inquirer');

module.exports = async function getConfig(input, flags, SETTINGS) {
	if (input[0] != null) {
		SETTINGS.projectName = input[0];
	} else {
		SETTINGS.projectName = await inquirer.prompt({
			name: 'projectName',
			type: 'input',
			message: 'What is the name of your project: ',
			default() {
				return SETTINGS.projectName;
			}
		}).projectName;
	}
	return;
};
