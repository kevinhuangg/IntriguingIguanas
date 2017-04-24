var path = require('path');
var webpack = require('webpack');

var SRC_DIR = path.resolve(__dirname, 'client/src');
var DIST_DIR = path.resolve(__dirname, 'client/dist');

module.exports = {
  entry: SRC_DIR + "/index.jsx",
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  debug: true,
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      }
    ]
  }
};
