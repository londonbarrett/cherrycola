#!/usr/bin/env node

const { get } = require('axios');
const program = require('commander');

const { calculateMaxDrawdown, calculateRateOfReturn } = require('./util');

program
  .version('0.1.0')
  .option('-k, --key <key>', 'API-KEY')
  .option('-s, --start <start>', 'Start date in format YYYY-MM-DD')
  .option('-e, --end [end]', 'End date in format YYYY-MM-DD')
  .option('-t, --ticker <ticker>', 'Ticker')
  .option('-l, --log', 'Log data')
  .parse(process.argv);

const url = `https://www.quandl.com/api/v3/datasets/WIKI/${program.ticker}.json`;

module.exports = get(url, {
  params: {
    api_key: program.key,
    start_date: program.start,
    end_date: program.end,
    order: 'asc',
  },
})
  .then((result) => {
    const rate = calculateRateOfReturn(result.data.dataset.data);
    const max = calculateMaxDrawdown(result.data.dataset.data);
    console.log('Max Drawdown:', max);
    console.log('Rate Of Return:', rate);
  })
  .catch((error) => {
    throw new Error(error);
  });
