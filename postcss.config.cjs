const cssnano = require('cssnano');

/** @type {import('postcss-load-config/src').Config} */
const config = {
  plugins: [cssnano({ preset: 'default' })],
};

module.exports = config;
