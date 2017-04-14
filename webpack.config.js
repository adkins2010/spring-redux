const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/main/index.js',
  devServer: {
    contentBase: path.join(__dirname, 'src/main')
  },
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
