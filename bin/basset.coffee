optimist = require('optimist')
  .usage('basset [options] url')
  .demand(1)

  .boolean('h')
  .alias('h', 'help')
  .describe('h', 'This screen')
  
  .string('n')
  .alias('n', 'num')
  .describe('n', 'Num of repeats')

  .string('r')
  .alias('r', 'reporter')
  .describe('r', 'Reporter [plain (default), json]')

  .string('s')
  .alias('s', 'output-size')
  .describe('s', 'Output size [short (default)]')

  .check((args) ->
    if args.n and (parseInt(args.n, 10).toString() isnt args.n)
      throw new Error 'Num must be a decimal number'

    if args.r and (args.r not in ['plain', 'json'])
      throw new Error "Invalid reporter: #{args.r}"

    if args.s and (args.s not in ['short'])
      throw new Error "Invalid output size: #{args.s}"
  )

argv = optimist.argv

if (argv.h) 
  optimist.showHelp()
  process.exit()

options = {}
if argv.n then options.repeatNum = parseInt(argv.n, 10)
if argv.r then options.reporter = argv.r
if argv.s then options.info = argv.s

Basset = require '../lib/basset'
basset = new Basset argv._[0], options
basset.sniff()