const welcome = require('cli-welcome');
const pkg = require('./../package.json');
const unhandled = require('cli-handle-unhandled');

module.exports = ({ clear = true }) => {
	unhandled();
	welcome({
		title: `create-svelte3-app`,
		tagLine: `by IogaMaster`,
		description: pkg.description,
		version: pkg.version,
		bgColor: '#FF5722',
		color: '#FFFFF',
		bold: true,
		clear
	});
};
