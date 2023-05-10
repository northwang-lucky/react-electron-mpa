const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    port: 10086,
  },
};

module.exports = merge(devConfig, baseConfig);
