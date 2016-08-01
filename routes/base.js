/**
 * New node file
 */
// DB Config
var mongoose = require('mongoose');
var config = require('../config/conf');
var db = mongoose.createConnection(config.dbUrl);

// Export variables
exports.database = db;

