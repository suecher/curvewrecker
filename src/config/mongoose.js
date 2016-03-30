/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
    var db = mongoose.connect(config.mongodb);
    require('../app/models/news.server.model');
    require('../app/models/user.server.model');
    require('../app/models/props.server.model');
    require('../app/models/propsexchange.server.model');
    require('../app/models/userbyprops.server.model');
    require('../app/models/pkrecord.server.model');
    return db;
};