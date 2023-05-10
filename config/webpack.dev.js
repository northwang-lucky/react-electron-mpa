const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const { getEntryAndTemplates } = require('../config/utils/cache-tools');
const LoadingPlugin = require('./plugins/loading-plugin');

const { entry, templates } = getEntryAndTemplates('dev');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  entry,
  plugins: [...templates, new LoadingPlugin()],
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 10086,
  },
};

module.exports = merge(devConfig, baseConfig);
