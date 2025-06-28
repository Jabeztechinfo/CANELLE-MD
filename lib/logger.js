const chalk = require('chalk');

const getTime = () => {
  return new Date().toLocaleTimeString('en-KE', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const log = {
  info: (...args) => {
    console.log(
      chalk.blue(`[${getTime()}]`),
      chalk.green.bold('[INFO]'),
      ...args
    );
  },

  warn: (...args) => {
    console.log(
      chalk.blue(`[${getTime()}]`),
      chalk.yellow.bold('[WARN]'),
      ...args
    );
  },

  error: (...args) => {
    console.log(
      chalk.blue(`[${getTime()}]`),
      chalk.red.bold('[ERROR]'),
      ...args
    );
  },

  debug: (...args) => {
    if (process.env.DEBUG === 'true') {
      console.log(
        chalk.blue(`[${getTime()}]`),
        chalk.magenta.bold('[DEBUG]'),
        ...args
      );
    }
  },

  success: (...args) => {
    console.log(
      chalk.blue(`[${getTime()}]`),
      chalk.greenBright.bold('[OK]'),
      ...args
    );
  }
};

module.exports = log;
