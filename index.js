var tapOut = require('tap-out');
var chalk = require('chalk');
var through2 = require('through2');
var duplexer = require('duplexer');
var figures = require('figures');

module.exports = function() {

  var tap = tapOut(function () {
    out.push('\n\n');
  });

  var out = through2();

  var stream = duplexer(tap, out);

  var indent = '  ';
  var nestedTest = false;

  tap.on('test', function (test) {
    out.push('\n');
    if (_beginsWithShould(test.name)) {
      nestedTest = true;
      out.push(indent + chalk.bold(test.name));
    } else {
      out.push(chalk.bold.underline(test.name));
      nestedTest = false;
    }
    out.push('\n');
  });

  tap.on('pass', function (assertion) {
    if (nestedTest) {
      out.push(indent + indent + chalk.green(figures.tick + ' ' + assertion.name) + '\n');
    } else {
      out.push(indent + chalk.green(assertion.name) + '\n');
    }
  });

  tap.on('fail', function (assertion) {
    if (nestedTest) {
      out.push(indent + indent + chalk.red(figures.cross + ' ' + assertion.name) + '\n');
    } else {
      out.push(indent + chalk.red(figures.cross + ' ' + assertion.name) + '\n');
    }
    out.push(chalk.red(assertion.error.raw) + '\n');
  });

  tap.on('result', function (result) {
    switch (result.name) {
      case 'tests':
        out.push('\n\n' + chalk.bold('Total: ' + result.count) + indent);
        break;
      case 'pass':
        out.push(chalk.bold.green('Pass: ' + result.count + indent));
        break;
      case 'fail':
        out.push(chalk.bold.red('Fail: ' + result.count) + indent);
        break;
    }
  });

  function _beginsWithShould (name) {
    return /^should/i.test(name);
  }

  return stream;
}
