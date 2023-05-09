const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const path = require('path');

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: 'production',
  devtool: 'source-map',
};

module.exports = merge(prodConfig, baseConfig);
