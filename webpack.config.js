const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isProd = process.env.NODE_ENV === 'production' // создали переменные дял определения режима сборки dev/prod, для них доустановили пакет cross-env
const isDev = !isProd

const filename = ext => isProd ? `[name].bundle.${ext}` : `[name].bundle.[hash].${ext}`

const jsLoaders = () => {
  const loaders = [
      {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
      }
  ]

  // if (isDev) {
  //     loaders.push('eslint-loader')
  // }

  return loaders
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    daily: './js/daily.js'
  },
  output: {
    filename: filename('js'), // автоматически подставляется имя и хеш при создании нового бандла
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
    filename: filename('css')
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
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          // "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  },
};
