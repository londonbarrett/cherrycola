#!/usr/bin/env node

const { get } = require('axios');
const program = require('commander');

const { calculateMaxDrawdown, calculateRateOfReturn } = require('./util');

program
  .version('0.1.0')
  .option('-k, --key <key>', 'API-KEY')
  .option('-s, --start <start>', 'Start date')
  .option('-e, --end [end]', 'End date')
  .option('-t, --ticker <ticker>', 'Ticker')
  .option('-l, --log', 'Log data')
  .parse(process.argv);

const url = `https://www.quandl.com/api/v3/datasets/WIKI/${program.ticker}.json`;

get(url, {
  params: {
    api_key: program.key,
    start_date: program.start,
    end_date: program.end,
    order: 'asc',
  },
})
  .then((result) => {
    console.log(result.data.dataset.data);
    const rate = calculateRateOfReturn(result.data.dataset.data);
    const max = calculateMaxDrawdown(result.data.dataset.data);
    console.log('max', max);
    console.log('rate', rate);
  })
  .catch((error) => {
    throw new Error(error);
  });
