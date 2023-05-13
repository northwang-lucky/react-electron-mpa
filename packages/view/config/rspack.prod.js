const { merge } = require('webpack-merge');
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
  devtool: false,
};

module.exports = merge(prodConfig, baseConfig);
