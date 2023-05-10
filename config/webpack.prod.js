const { merge } = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./webpack.base');
const { getEntryAndTemplates } = require('../config/utils/cache-tools');

const { entry, templates } = getEntryAndTemplates('prod');

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: 'production',
  entry,
  plugins: [
    ...templates,
    new CompressionPlugin({
      test: /\.(js|css)(\?.*)?$/i,
    }),
  ],
  performance: {
    maxAssetSize: 500 * 1024,
    maxEntrypointSize: 500 * 1024,
  },
};

module.exports = merge(prodConfig, baseConfig);
