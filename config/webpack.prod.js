const CompressionPlugin = require('compression-webpack-plugin');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { getEntryAndTemplates } = require('../config/utils/cache-tools');
const baseConfig = require('./webpack.base');

const { NEED_REPORT = '' } = process.env;
const needReport = NEED_REPORT === '1';
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
    ...(needReport
      ? new BundleAnalyzerPlugin({
          analyzerPort: 10087,
          openAnalyzer: true,
        })
      : []),
  ],
  performance: {
    maxAssetSize: 500 * 1024,
    maxEntrypointSize: 500 * 1024,
  },
};

module.exports = merge(prodConfig, baseConfig);
