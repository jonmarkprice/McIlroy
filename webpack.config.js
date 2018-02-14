const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/client/index.js',
    login: './src/client/login.js',
    register: './src/client/register.js',
  },
  module: {
    loaders: [
      {
        // Include common *and* client but not server
        include: [
          path.resolve(__dirname, './src/common'),
          path.resolve(__dirname, './src/client'),
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'register',
      chunks: ['register']
    })
  ]
};
