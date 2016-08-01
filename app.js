
/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var http = require('http');

env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/routes')(app);

app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(config.port, function(){
  console.log('Express server listening on port ' + config.port);
});
