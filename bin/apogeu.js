#!/usr/bin/env node

const debug = require('debug')('apogeu:apogeu');
const program = require('commander');

require('../src/bluebird');

const version = require('../package.json').version;

program
  .version(version)
  .option('-s, --start', 'Start project')
  .option('-n, --new [name]', 'New project')
  .option('-c, --create <model>', 'Create model structure')
  .option('-d, --debug', 'Execute command in debug mode')
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit(1);
}

if (program.debug) process.env.DEBUG = 'apogeu:*';

debug('init apogeu');

if (program.start) require('./www');
if (program.new) require('./new')(program.new === true ? undefined : program.new);
if (program.create) require('./create')(program.create);
