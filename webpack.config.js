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
        // TODO: this needs to include common *and* client but not server
        include: [
          path.resolve(__dirname, './src/common'),
          path.resolve(__dirname, './src/client')
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

// output :: filename could also be '[name].js'


module.exports = config;
