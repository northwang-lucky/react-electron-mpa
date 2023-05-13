const { merge } = require('webpack-merge');
const CompressionFilePlugin = require('./plugins/compression-file');
const { getEntryAndTemplates } = require('./utils/cache-tools');
const baseConfig = require('./rspack.base');

const { entry, templates } = getEntryAndTemplates('prod');

/** @type {import('@rspack/cli').Configuration} */
const prodConfig = {
  mode: 'production',
  entry,
  builtins: {
    html: [...templates],
  },
  plugins: [
    new CompressionFilePlugin({
      test: /\.(js|css)(\?.*)?$/i,
    }),
  ],
  devtool: false,
};

module.exports = merge(prodConfig, baseConfig);
