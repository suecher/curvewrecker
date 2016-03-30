/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var UserByProps = mongoose.model('UserByProps');
var resultobjs = require('../models/result.server.model');

module.exports = {
    create:function(_userbyprops,callback){
        var userbyprops = new UserByProps({
            userId:_userbyprops.userId,
            propsId:_userbyprops.propsId,
            amount:_userbyprops.amount
        });

        userbyprops.save(function(err){
            if(err){
                callback(resultobjs.createResult(false,'用户添加道具失败',err.message));
                return;
            }
            callback(resultobjs.createResult(true,null,null,userbyprops));

            console.log('save 道具:',err ? 'failed:'+err.message:'success');
        });


    },
    update:function(_userbyprops,next){

        //UserByProps.update({"userId":_userbyprops.userId,"propsId":_userbyprops.propsId},{$set:{'amount':3}},function(err){
        //    if(err){
        //        console.log(err);
        //        return;
        //    }
        //    console.log("成功");
        //    next();
        //});

        UserByProps.find({'userId':_userbyprops.userId},function(err,docs){
            var currentpropsId;
            for(var key in docs){
                if(docs[key].propsId == _userbyprops.propsId){

                    currentpropsId=  docs[key]._id;
                    UserByProps.update({'_id':currentpropsId},{$inc:{'amount':_userbyprops.amount}},null,function(err,data){
                        if(err){
                            console.log(err);
                            return;
                        }

                        next();
                    });
                }
            }
        });
    },
    get:function(userId,next){
        UserByProps.find({'userId':userId},function(err,docs){
            if(err){
                console.log(err);
                return;
            }

            next(docs);
        });
    }
};