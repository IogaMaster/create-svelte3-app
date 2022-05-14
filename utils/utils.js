const Util = require('util');
const exec = require('child_process').exec;

const asyncExec = Util.promisify(exec);
module.exports = asyncExec;
