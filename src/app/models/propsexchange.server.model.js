/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');

var PropsExchangeSchema = new mongoose.Schema({
    userId:String,
    propsId:String,
    point:Number,
    createTime:{type:Date,default:Date.now()}
});

var PropsExchange = mongoose.model('PropsExchange',PropsExchangeSchema);