const { dots } = require('cli-spinners');
const ora = require('ora');

const spinner = ora({ ...dots });

const loading = {
  start: title => spinner.start(title),
  stop: () => spinner.stop(),
};

module.exports = loading;
