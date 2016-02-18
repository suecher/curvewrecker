/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');

var PropsSchema = new mongoose.Schema({
    Id:String,
    propsName:String,
    propsDescription:String,
    point:Number
});

var Props = mongoose.model('Props',PropsSchema);