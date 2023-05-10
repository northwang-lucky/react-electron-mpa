const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base');
const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: 'production',
  plugins: [
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
