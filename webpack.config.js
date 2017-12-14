const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    app: './src/client/index.js',
    login: './src/client/login.js',
  },
  module: {
    loaders: [
      {
        // Include common *and* client but not server
        include: [
          path.resolve(__dirname, './src/common'),
          path.resolve(__dirname, './src/client'),
          path.resolve(__dirname, './shared')
        ],
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      chunks: ['app'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'login',
      chunks: ['login'],
    }),
  ]
};

module.exports = config;
