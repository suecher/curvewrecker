/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
    var db = mongoose.connect(config.mongodb);
    require('../app/models/news.server.model');
    return db;
};