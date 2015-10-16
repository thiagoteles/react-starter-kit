var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Clean = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	context: path.join(__dirname, '../'),

	entry: './app/components/app',

	output: {
		path: 'public',
		filename: '[hash].js',
		publicPath: '/'
	},

	plugins: [
		new Clean(['public'], path.join(__dirname, '../')),
  		new HtmlWebpackPlugin({
  			template: path.join(__dirname, '../config/templates/index.html'),
  			inject: true
  		})
	],

	// Resolve the './app' directory so we can avoid writing
  	// ../../styles/base.css
  	resolve: {
    	modulesDirectories: ['node_modules', 'app'],
    	extensions: ['', '.js', '.jsx']
  	},

  	// Instruct webpack how to handle each file type that it might encounter
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.css$/,				
				loader: 'style-loader!css-loader?localIdentName=[hash:base64:5]!postcss-loader'
			},
			{
				test: /\.sass$/,				
				loader: 'style-loader!css-loader?localIdentName=[hash:base64:5]!sass-loader?includePaths[]=' + 
					encodeURIComponent(path.join(__dirname, "../app"))
				+ '&indentedSyntax=true&indentType=tab!postcss-loader'
			},
			{
				test: /\.(png|jpg|gif)$/,				
				loader: 'url-loader?name=images/[hash:base64:5].[ext]&limit=8192'
			},
			{
				test: /\.woff$/,
				loader: 'file-loader?name=fonts/[name].[ext]' 
			},
			{ 
				test: /\.json$/, 
				loader: "json-loader"
			}
		]
	},

    postcss: function () {
        postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
    }
}