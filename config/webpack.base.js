const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const publicPath = 'pages';
const getPath = filename => `${publicPath}/${filename}`;

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
    filename: pathData => {
      if (pathData.chunk?.name === 'main') {
        return '[name].[contenthash:5].js';
      }
      return getPath('[name]/[name].[contenthash:5].js');
    },
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: getPath('home/index.html'),
      publicPath: '/',
      chunks: ['home'],
      template: path.resolve(__dirname, '../src/pages/home/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: getPath('editor/index.html'),
      publicPath: '/',
      chunks: ['editor'],
      template: path.resolve(__dirname, '../src/pages/editor/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: getPath('[name]/[name].[contenthash:5].css'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash:5][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:5][ext]',
        },
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
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
