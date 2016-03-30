/**
 * Created by SueCh on 2016/2/14.
 */


var mongoose = require('mongoose');
var PkRecord = mongoose.model('PkRecord');
var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(clientpkrecord,callback){
        var pkrecord = new PkRecord(clientpkrecord);
        pkrecord.save(function(err){
            if(err){
                callback(resultobjs.createResult(false,'添加对战记录错误',err.message));
                return;
            }

            callback(resultobjs.createResult(true,'','',pkrecord));
        });
    }
}