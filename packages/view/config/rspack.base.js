const path = require('path');

/** @type {import('@rspack/cli').Configuration} */
module.exports = {
  builtins: {
    css: {
      modules: {
        localIdentName: '[path][name]__[local]--[hash:5]',
        localsConvention: 'camelCaseOnly',
      },
    },
  },
  resolve: {
    alias: {
      '~pages': path.resolve(__dirname, '../src/pages'),
    },
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[contenthash:5].js',
    cssFilename: 'css/[name].[contenthash:5].css',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        semi: {
          test: /semi/,
          name: 'semi',
          chunks: 'all',
          priority: 5,
          minChunks: 2,
        },
        lodash: {
          test: /lodash/,
          name: 'lodash',
          chunks: 'all',
          priority: 4,
          minChunks: 2,
        },
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: 'react',
          chunks: 'all',
          priority: 3,
          minChunks: 2,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: 2,
          minChunks: 2,
        },
        common: {
          test: /.js$/,
          name: 'common',
          chunks: 'all',
          priority: 1,
          minChunks: 2,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset',
        generator: { filename: 'assets/[name].[hash:5][ext]' },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name].[hash:5][ext]' },
      },
      {
        test: /\.module\.s(a|c)ss$/,
        type: 'css/module',
      },
    ],
  },
};
