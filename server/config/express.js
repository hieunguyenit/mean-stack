/**
 * Created by hoang on 1/25/15.
 */
var express = require('express');
var path = require('path');

module.exports = function(app, config) {

    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(config.rootPath, 'views'));
    app.set('models', path.join(config.rootPath, 'models'));
    app.set('view engine', 'jade');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    app.use(express.static(path.join(config.rootPath, 'public')));
}