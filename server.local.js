"use strict";

var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config/webpack.local.config');
var express = require('express');
var proxy = require('proxy-middleware');
var url = require('url');

// Your proxy
var app = express();

// Proxy the request for static assets
app.use('/bundle.js', proxy(url.parse('http://localhost:8081/local/bundle.js')));

app.use('/local/images', proxy(url.parse('http://localhost:8081/local/images')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'local', 'index.html'));
});

var server = new WebpackDevServer(webpack(config), {
  publicPath: '/local/',
  hot: true,
  historyApiFallback: true,
  stats: { 
    colors: true 
  }
});

// Run the two servers
server.listen(8081, 'localhost', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Listening at localhost:3000');
});

app.listen(3000);