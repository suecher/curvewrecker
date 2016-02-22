/**
 * Created by SueCh on 2016/2/21.
 */
var mongoose = require('mongoose');
var uri = 'mongodb://username:passwrod@hostname:port/databasename';
uri = "mongodb://localhost/curvewreckertesting";

mongoose.connect(uri);

var UserSchema = new mongoose.Schema({
    userId:String,
    classId:String,
    realName:String,
    gender:Boolean,
    className:String,
    headImg:String,
    currentPoints:Number,
    currentExperience:Number,
    createTime:{type:Date,default:Date.now()},
    lastTime:{type:Date,default:Date.now()},
    age:Number
});

mongoose.model('User',UserSchema);
//insert
var User = mongoose.model('User');

//var user = new User({
//    userId:'00001',
//    classId:'class001',
//    realName:'舒璨'
//});
//
//user.save(function(err){
//    console.log('save status:',err ? 'failed':'success');
//});

//User.findOne({'userId':'00001'},function(err,doc){
//    if(err){
//        console.log(err.message);
//    }
//
//    doc.realName = "蔡小阳";
//    doc.save();
//    console.log(doc);
//});

User.update({'userId':'00003'},{$set:{'age':45}},function(err){
    if(err)
    {
        console.log(err);
        return;
    }
    console.log('修改成功');
});
