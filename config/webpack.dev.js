const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

/** @type {import('webpack').Configuration} */
const devConfig = {
  mode: 'development',
  devServer: {
    hot: true,
    compress: true,
    port: 10086,
  },
};

module.exports = merge(devConfig, baseConfig);
