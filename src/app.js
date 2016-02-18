/**
 * Created by SueCh on 2016/2/13.
 */
var express = require('./config/express');
var mongodb = require('./config/mongoose');

var db = mongodb = mongodb();
var app = express();
module.exports = app;