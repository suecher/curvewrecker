/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');

var  UserSchema = new mongoose.Schema({
    userId:String,
    classId:String,
    realName:String,
    gender:Boolean,
    className:String,
    headImg:String,
    currentPoints:Number,
    currentExperience:Number,
    createTime:{type:Date,default:Date.now()},
    lastTime:{type:Date,default:Date.now()}
});

var User = mongoose.model('User',UserSchema);