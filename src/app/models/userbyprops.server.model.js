/**
 * Created by SueCh on 2016/2/14.
 */

var mongoose = require('mongoose');

var UserByPropsSchema = new mongoose.Schema({
    userId:String,
    propsId:String,
    amount:Number
});

var UserByProps = mongoose.model('UserByProps',UserByPropsSchema);