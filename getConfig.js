const { prompt } = require('enquirer');

module.exports = async function getConfig(input, flags, SETTINGS) {
	const questions = [];

	if (input[0] == null) {
		questions.push({
			name: 'projectName',
			type: 'input',
			message: 'What is the name of your app'
		});
	}

	if (
		flags.type == null ||
		(flags.type.toLowerCase() != 'rollup' &&
			flags.type.toLowerCase() != 'sveltekit' &&
			flags.type.toLowerCase() != 'kit' &&
			flags.type.toLowerCase() != 'vite')
	) {
		questions.push({
			name: 'projectType',
			type: 'select',
			message: 'What type is your app',
			choices: ['Rollup', 'SvelteKit', 'Vite']
		});
	}

	if (
		!(
			flags.typescript ||
			flags.eslint ||
			flags.prettier ||
			flags.jest ||
			flags.husky
		)
	) {
		questions.push({
			name: 'projectConfig',
			type: 'multiselect',
			message: 'Configure your app',
			choices: ['Typescript', 'ESLint', 'Prettier', 'Jest', 'Husky']
		});
	}

	const config = await prompt(questions);

	if (input[0] != null) {
		SETTINGS.projectName = input[0];
	} else {
		SETTINGS.projectName = config.projectName;
	}

	if (
		flags.type != null &&
		(flags.type.toLowerCase() == 'rollup' ||
			flags.type.toLowerCase() == 'sveltekit' ||
			flags.type.toLowerCase() == 'kit' ||
			flags.type.toLowerCase() == 'vite')
	) {
		let type = flags.type.toLowerCase();
		if (flags.type.toLowerCase() == 'sveltekit') type = 'kit';
		SETTINGS.projectType = type;
	} else {
		let type = config.projectType.toLowerCase();
		if (config.projectType.toLowerCase() == 'sveltekit') type = 'kit';
		SETTINGS.projectType = type;
	}

	if (
		flags.typescript ||
		flags.eslint ||
		flags.prettier ||
		flags.jest ||
		flags.husky
	) {
		SETTINGS.useTypescript = flags.typescript;
		SETTINGS.useESLint = flags.eslint;
		SETTINGS.usePrettier = flags.prettier;
		SETTINGS.useJest = flags.jest;
		SETTINGS.useHusky = flags.husky;
	} else {
		SETTINGS.useTypescript = config.projectConfig.includes('Typescript');
		SETTINGS.useESLint = config.projectConfig.includes('ESLint');
		SETTINGS.usePrettier = config.projectConfig.includes('Prettier');
		SETTINGS.useJest = config.projectConfig.includes('Jest');
		SETTINGS.useHusky = config.projectConfig.includes('Husky');
	}
};
