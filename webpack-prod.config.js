"use strict";
const webpack = require('webpack');
const path = require('path');
const loaders = require('./webpack.loaders');
const alias = require('./webpack.alias');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const SCSSLoader = {
	test: /\.scss$/,
	use: [
			"style-loader", // creates style nodes from JS strings
			"css-loader?url=false", // translates CSS into CommonJS
			"sass-loader" // compiles Sass to CSS, using Node Sass by default
	],
	exclude: /(node_modules\/(?!(@klassroom\/.*))|bower_components|unitTest)/
};
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");


const hotLoader = {
	test: /\.(js|jsx)$/,
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
	mode: 'production',
	optimization: {
		minimize: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	performance: {
		// size is 5 mb
		maxEntrypointSize: 5242880,
		maxAssetSize: 5242880,
	},
	entry: {
		vendor: [
			// Required to support async/await
			'@babel/polyfill',
		],
		main: ['./src/index.js'],
	},
  devtool: false,
  output: {
    publicPath: "/",
		path: path.resolve(__dirname, "dist"),
    filename: "[name].js"+"?rand="+Math.floor(Math.random() * Math.floor(1000))
  },
  resolve: {
    extensions: ['.js', '.jsx', ".css", ".scss"],
		alias: alias
  },
  module: {
		rules: [...loaders, SCSSLoader, hotLoader]
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
		new CompressionPlugin({
			filename: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.7
			}),
		new BrotliPlugin({
			asset: "[path].br[query]",
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.7
		}),
		new CopyPlugin([
      { from: './src/public', to: './public' },
    ]),
  ],
};
