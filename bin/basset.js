#!/usr/bin/env node

var ReporterFactory = require('../lib/reporterFactory');
var Basset = require('../lib/basset');
var optimist = require('optimist')
	.usage('basset [options] url')

	.boolean('h')
	.alias('h', 'help')
	.describe('h', 'This screen')

	.boolean('v')
	.alias('v', 'version')
	.describe('v', 'Version info')

	.string('n')
	.alias('n', 'num')
	.describe('n', 'Num of repeats')
	.default('n', '1')

	.string('r')
	.alias('r', 'reporter')
	.describe('r', 'Reporter ' + '(' + Object.keys(ReporterFactory.reporters).join(', ') + ')')
	.default('r', 'minimal')

	.check(function(args) {
	  if (args.n && (parseInt(args.n, 10).toString() !== args.n)) {
	    throw new Error('Num must be a decimal number');
	  }

	  if (args._.length === 0 && !(args.h || args.v)) {
	  	throw new Error('You need to specify at least one argument');
	  }
	});

var argv = optimist.argv;

if (argv.h) {
  optimist.showHelp();
  process.exit();
}

if (argv.v) {
	package = require('../package.json')
	console.log('v' + package.version)
	process.exit();
}

var basset = new Basset(argv._[0], {
  repeatNum: argv.n
});
var reporter = ReporterFactory.createReporter(argv.r);
reporter.bind(basset);
basset.sniff();