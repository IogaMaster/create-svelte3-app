const { fileURLToPath } = require('url');
const { dirname, resolve } = require('path');
const fs = require('fs-extra');
const { createSpinner } = require('nanospinner');

const import_meta_url =
	typeof document === 'undefined'
		? new (require('url'.replace('', '')).URL)('file:' + __filename).href
		: (document.currentScript && document.currentScript.src) ||
		  new URL('main.js', document.baseURI).href;

const ___dirname = dirname(fileURLToPath(import_meta_url));
const templateDir = resolve(`${___dirname}/templates/`);

const Util = require('util');
const exec = require('child_process').exec;

const asyncExec = Util.promisify(exec);
module.exports = async function generateProject(SETTINGS) {
	console.log();
	const spinner = createSpinner(`Generate ${SETTINGS.projectName}`).start();

	try {
		const projectDir = `${process.cwd()}/${SETTINGS.projectName}`;

		await fs.copySync(
			`${templateDir}/${SETTINGS.projectType}${
				SETTINGS.useTypescript ? '-ts' : ''
			}`,
			projectDir
		);

		process.chdir(projectDir);

		await asyncExec('git init --initial-branch main');

		if (SETTINGS.useESLint) {
			await asyncExec(
				`npm install -D eslint eslint-plugin-import eslint-plugin-svelte3 ${
					SETTINGS.useTypescript
						? '@typescript-eslint/eslint-plugin @typescript-eslint/parser'
						: ''
				}`
			);
			await fs.copySync(
				`${templateDir}/${
					SETTINGS.useTypescript ? '_ts' : '_'
				}.eslintrc.cjs`,
				'.eslintrc.cjs'
			);
		}

		if (SETTINGS.usePrettier) {
			await asyncExec('npm install -D prettier');
			await fs.copySync(`${templateDir}/_.prettierrc`, '.prettierrc');
			await fs.copySync(
				`${templateDir}/_.prettierignore`,
				'.prettierignore'
			);
		}

		if (SETTINGS.useJest) {
			await asyncExec(
				'npm install -D jest svelte-jester @babel/preset-env babel-jest @testing-library/jest-dom jest-environment-jsdom'
			);
			await asyncExec("npm set-script test 'jest src'");

			await fs.copySync(
				`${templateDir}/_jest.config.cjs`,
				'jest.config.cjs'
			);
			await fs.copySync(`${templateDir}/_.babelrc`, '.babelrc');
		}

		if (SETTINGS.useHusky) {
			await asyncExec('npm install -D husky');
			await asyncExec("npm set-script prepare 'husky install'");
			await asyncExec('npm run prepare');
		}

		await fs.removeSync('node_modules');
		await fs.removeSync('package-lock.json');

		spinner.success();
	} catch (error) {
		spinner.error();
		console.error(error);
	}
};
