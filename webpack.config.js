'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
let path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/js/main.js',
    daily: './src/js/daily.js'
  },
  output: {
    filename: '[name].[contenthash].js', // автоматически подставляется имя и хеш при создании нового бандла
    path: path.resolve(__dirname, 'dist'),
    clean: true // очищает от старых бандлов
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
    template: './src/index.html',
    chunks: ['main'],
    }),
    new HtmlWebpackPlugin({
    template: './src/daily.html',
    filename: 'daily.html',
    chunks: ['daily'],
    }),
],
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
