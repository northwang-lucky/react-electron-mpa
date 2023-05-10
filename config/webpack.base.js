const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  resolve: {
    alias: {
      '~pages': path.resolve(__dirname, '../src/pages'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    clean: true,
    filename: 'js/[name].[contenthash:5].js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'babel-loader',
          options: { compact: false },
        },
      },
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
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'dts-css-modules-loader',
            options: { dropEmptyFile: true },
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                exportLocalsConvention: 'camelCaseOnly',
              },
            },
          },
          { loader: 'resolve-url-loader' },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
};
