#!/usr/bin/env node

const commander = require('commander');

commander
  .version('0.1.0')
  .option('-t, --ticker <ticker>', 'Ticker');

commander.parse(process.argv);

console.log('Ticker:', commander.ticker);
