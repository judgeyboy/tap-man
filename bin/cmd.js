#!/usr/bin/env node

// TODO: what does the code on line 1 do?

var tapMan = require('../');
var tapMan = tapMan();

process.stdin
  .pipe(tapMan)
  .pipe(process.stdout);

process.on('exit', function (status) {

  if (status === 1) {
    process.exit(1);
  }

  if (tapMan.failed) {
    process.exit(1);
  }
});
