"use strict";
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const alias = require('./webpack.alias');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const DashboardPlugin = require('webpack-dashboard/plugin');
const SCSSLoader = {
	test: /\.scss$/,
	use: [
			"style-loader", // creates style nodes from JS strings
			"css-loader?url=false", // translates CSS into CommonJS
			"sass-loader" // compiles Sass to CSS, using Node Sass by default
	],
	exclude: /(node_modules\/(?!(@klassroom\/.*))|bower_components|unitTest)/
};
const HOST = process.env.HOST || "0.0.0.0";
const PORT = process.env.PORT || "3001";
const hotLoader = {
	test: /\.js$|jsx/,
	exclude: /(node_modules\/(?!(@klassroom\/.*))|bower_components|unitTest)/,
	use: {
		loader: "babel-loader",
		options: {
			cacheDirectory: true,
			babelrc: false,
			presets: [
				[
					"@babel/preset-env",
					{ targets: { browsers: "last 2 versions" } } // or whatever your project requires
				],
				"@babel/preset-react"
			],
			plugins: [
				// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
				["@babel/plugin-proposal-decorators", { legacy: true }],
				["@babel/plugin-proposal-class-properties", { loose: true }],
				"react-hot-loader/babel"
			]
		}
	}
};

module.exports = {
	mode: 'development',
	entry: {
		vendor: [
			// Required to support async/await
			'@babel/polyfill',
		],
		main: ['./src/index'],
	},
  devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
  output: {
    publicPath: "/",
    path: path.join(__dirname, '/'),
    filename: "[name].js"
  },
  resolve: {
    extensions: ['.js', '.jsx', ".css", ".scss"],
		alias: alias
  },
  module: {
		rules: [...loaders, SCSSLoader, hotLoader]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				default: false
			}
		}
	},
  devServer: {
    contentBase: "./src",
    // do not print bundle build stats
    noInfo: true,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    port: PORT,
    host: HOST
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    //new webpack.HotModuleReplacementPlugin(),
    //new DashboardPlugin(),
    new HtmlWebpackPlugin({
			template: './src/template.html',
			publicPath: "/public/",
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ],

};
