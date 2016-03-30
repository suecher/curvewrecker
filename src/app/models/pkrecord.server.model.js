/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');


var pkRecordSchema = mongoose.Schema({
    userId:String,
    rivalId:String,
    createTime:{type:Date,default:Date.now()},
    victory:Boolean,
    point:Number,
    experience:Number,
    classOrAll:Boolean, //true 班级PK
    Question:String
});

var PkRecord = mongoose.model('PkRecord',pkRecordSchema);