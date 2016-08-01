/**
 * Created by hoang on 1/25/15.
 */

var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/babau',
        port: process.env.PORT || 3000
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://localhost/babau',
        port: process.env.PORT || 80
    }
};