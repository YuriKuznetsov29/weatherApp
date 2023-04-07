const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isProd = process.env.NODE_ENV === 'production' // создали переменные дял определения режима сборки dev/prod, для них доустановили пакет cross-env
const isDev = !isProd

// const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
console.log(isDev)
module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    daily: './js/daily.js'
  },
  output: {
    filename: '[name].bundle.[hash].js', // автоматически подставляется имя и хеш при создании нового бандла
    path: path.resolve(__dirname, 'dist'),
    clean: true // очищает от старых бандлов
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: isDev ? 'source-map' : false, // добавляем sourcemap в режиме разработки
    devServer: {
        port: 3000,
        hot: isDev
    },
  plugins: [
    new HtmlWebpackPlugin({
    template: './index.html',
    chunks: ['main'],
    minify: { // минифицируем сборку html
      removeComments: isProd,
      collapseWhitespace: isProd
  }}),
    new HtmlWebpackPlugin({
    template: './daily.html',
    filename: 'daily.html',
    chunks: ['daily'],
    minify: { // минифицируем сборку html
      removeComments: isProd,
      collapseWhitespace: isProd
  }}),
  new CopyPlugin({ // плагин позволяющий копировать определенные файлы или папки в папку со сброкой
    patterns: [
      { from: path.resolve(__dirname, 'src/images'), // в нашем случае копируем favicon
        to: path.resolve(__dirname, 'dist')
      },
    ],
  }),
  new MiniCssExtractPlugin({
    filename: `bundle.[hash].css`
  })
],
  // watch: true,
  module: {
    rules: [
      {
        // test: /\.s[ac]ss$/i,
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          // MiniCssExtractPlugin.loader,
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          // "sass-loader",
        ],
      },
    ],
  },
};
