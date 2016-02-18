/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    title:String,
    content:String,
    createTime:{type:Date,default:Date.now()}
});

var News = mongoose.model('News',NewsSchema);