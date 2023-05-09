const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
    new BundleAnalyzerPlugin({
      analyzerPort: 10087,
      openAnalyzer: true,
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
        type: 'asset',
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
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
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
