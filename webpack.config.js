/**Created by bbk on 10/6/2016
 * based on recomendations from tutorial: https://www.codementor.io/reactjs/tutorial/beginner-guide-setup-reactjs-environment-npm-babel-6-webpack
 */

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname);
var APP_DIR = path.resolve(__dirname, 'dist');

var config = {
	entry: BUILD_DIR + '/app.jsx',
	output: {
		path: APP_DIR,
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		port: 8080
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			include: BUILD_DIR,
			loader: 'babel',
			query: {
				"presets": ["es2015", "react"]
			}
		}]
	}
};
module.exports = config;