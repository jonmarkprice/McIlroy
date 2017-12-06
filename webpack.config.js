const path = require('path');

const config = {
  entry: {
    app: [
      path.join(__dirname, './src/client/index.js')
    ]
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
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')
  }
};

module.exports = config;
