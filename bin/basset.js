var Basset, argv, basset, optimist, options;

optimist = require('optimist').usage('basset [options] url').demand(1).boolean('h').alias('h', 'help').describe('h', 'This screen').string('n').alias('n', 'num').describe('n', 'Num of repeats').string('r').alias('r', 'reporter').describe('r', 'Reporter [plain (default), json]').string('s').alias('s', 'output-size').describe('s', 'Output size [short (default)]').check(function(args) {
  var _ref, _ref1;
  if (args.n && (parseInt(args.n, 10).toString() !== args.n)) {
    throw new Error('Num must be a decimal number');
  }
  if (args.r && ((_ref = args.r) !== 'plain' && _ref !== 'json')) {
    throw new Error("Invalid reporter: " + args.r);
  }
  if (args.s && ((_ref1 = args.s) !== 'short')) {
    throw new Error("Invalid output size: " + args.s);
  }
});

argv = optimist.argv;

if (argv.h) {
  optimist.showHelp();
  process.exit();
}

options = {};

if (argv.n) {
  options.repeatNum = parseInt(argv.n, 10);
}

if (argv.r) {
  options.reporter = argv.r;
}

if (argv.s) {
  options.info = argv.s;
}

Basset = require('../lib/basset');

basset = new Basset(argv._[0], options);

basset.sniff();
