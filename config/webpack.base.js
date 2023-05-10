const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { NEED_REPORT = '' } = process.env;
const needReport = NEED_REPORT === '1';

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: {
    home: path.resolve(__dirname, '../src/pages/home/index.tsx'),
    editor: path.resolve(__dirname, '../src/pages/editor/index.tsx'),
  },
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
    splitChunks: {
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react/,
          name: 'react',
          chunks: 'initial',
          priority: 3,
          minChunks: 2,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
        common: {
          test: /.js$/,
          name: 'common',
          chunks: 'initial',
          priority: 1,
          minChunks: 2,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'pages/home/index.html',
      chunks: ['home'],
      template: path.resolve(__dirname, '../src/pages/home/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/editor/index.html',
      chunks: ['editor'],
      template: path.resolve(__dirname, '../src/pages/editor/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:5].css',
    }),
    needReport &&
      new BundleAnalyzerPlugin({
        analyzerPort: 10087,
        openAnalyzer: true,
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
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
          'postcss-loader',
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
