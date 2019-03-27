const OPEN = 1;
const HIGH = 2;
const LOW = 3;
const CLOSE = 4;
const DIV = 6;

const sumDividends = (acc, value) => acc + value[DIV];

const calculateRateOfReturn = (data) => {
  const dividends = data.reduce(sumDividends, 0);
  const initial = data[0][OPEN];
  const final = data[data.length - 1][CLOSE];
  return (final - initial + dividends) / initial;
};

const calculateMaxDrawdown = (data) => {
  let diff = 0;
  let peak = 0;
  let low = 0;
  let maxDiff = 0;
  for (let i = 0; i < data.length; i += 1) {
    diff = data[peak][HIGH] - data[i][LOW];
    peak = data[peak][HIGH] - data[i][HIGH] < 0 ? i : peak;
    low = maxDiff > diff ? low : i;
    maxDiff = maxDiff > diff ? maxDiff : diff;
    // console.log(i, 'LOW:', data[i][LOW], 'LOWEST:', data[low][LOW]);
  }
  // console.log('============================');
  // console.log('Peak:', peak, data[peak][HIGH]);
  // console.log('Low:', low, data[low][LOW]);
  // console.log('Max:', maxDiff);
  // console.log('MAXDRAW:', maxDiff / data[peak][HIGH]);
  return maxDiff / data[peak][HIGH];
};

module.exports = {
  calculateRateOfReturn,
  calculateMaxDrawdown,
};
