var Basset, ReporterFactory, argv, basset, optimist, reporter;

ReporterFactory = require('../lib/reporterFactory');

Basset = require('../lib/basset');

optimist = require('optimist').usage('basset [options] url').demand(1).boolean('h').alias('h', 'help').describe('h', 'This screen').string('n').alias('n', 'num').describe('n', 'Num of repeats')["default"]('n', '1').string('r').alias('r', 'reporter').describe('r', 'Reporter [minimal, full]')["default"]('r', 'full').check(function(args) {
  if (args.n && (parseInt(args.n, 10).toString() !== args.n)) {
    throw new Error('Num must be a decimal number');
  }
});

argv = optimist.argv;

if (argv.h) {
  optimist.showHelp();
  process.exit();
}

basset = new Basset(argv._[0], {
  repeatNum: argv.n
});

reporter = ReporterFactory.createReporter(argv.r);

reporter.bind(basset);

basset.sniff();
