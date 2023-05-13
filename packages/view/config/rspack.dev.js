const { merge } = require('webpack-merge');
const { getEntryAndTemplates } = require('./utils/cache-tools');
const baseConfig = require('./rspack.base');

const { entry, templates } = getEntryAndTemplates('dev');

/** @type {import('@rspack/cli').Configuration} */
const devConfig = {
  mode: 'development',
  entry,
  builtins: {
    html: [...templates],
  },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 10086,
  },
};

module.exports = merge(devConfig, baseConfig);
