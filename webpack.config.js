/**Created by bbk on 10/6/2016
 * based on recomendations from tutorial: https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack
 */

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname, 'dist');

var config = {
  entry: APP_DIR + '/app.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }
    ]
  }
};

module.exports = config;