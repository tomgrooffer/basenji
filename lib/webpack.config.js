var paths = require('./helpers/paths');
var getResolveLoader = require('./helpers/getResolveLoader');
var getResolve = require('./helpers/getResolve');
var getVendors = require('./helpers/getVendors');
var aliasLibs = require('./helpers/aliasLibs');

var plugins = require('./webpack/plugins');
var scripts = require('./webpack/scripts');
var styles = require('./webpack/styles');
var images = require('./webpack/images');

var env = require('./helpers/env');

var app = env.isDevelopment
  ? [paths.mainModulePath, paths.hotDevServerPath, paths.hotMiddlewarePath]
  : [paths.mainModulePath];

var hashType = (env.isProduction) ? 'chunkhash' : 'hash';
var devtool = 'source-map';

var noParse = [];

aliasLibs.forEach(function (lib) {
  if (!lib.parse) {
    noParse.push(lib.path)
  }
});

var webpackConfig = {
  devtool: devtool,
  resolveLoader: getResolveLoader(),
  resolve: getResolve(),
  entry: {
    app: app,
    vendors: getVendors()
  },
  output: {
    path: paths.buildPath,
    filename: '[name]-[' + hashType + '].js',
    publicPath: '/'
  },
  module: {
    loaders: [],
    preLoaders: [],
    noParse: noParse
  },
  plugins: []
};

plugins(webpackConfig);
scripts(webpackConfig);
styles(webpackConfig);
images(webpackConfig);

module.exports = webpackConfig;
