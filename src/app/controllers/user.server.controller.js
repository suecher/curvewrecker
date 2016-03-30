/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');

var resultobjs = require('../models/result.server.model');


module.exports = {
    create:function(client,callback){

        var user = new User({
            userId:client.user_id,
            classId:client.class_info.class_id,
            realName:client.real_name,
            gender:true,
            className:client.class_info.class_name,
            headImg:'h2.png',
            currentPoints:client.current_points,
            currentExperience:0
        });

        user.save(function(err){
            if(err){
                callback(resultobjs.createResult(false,'创建用户错误',err.message));
                return;
            }
            callback(resultobjs.createResult(true,null,null,user));
        });
    },
    userbyid:function(userId,callback){
        User.findOne({'_id':userId},function(err,doc){
           if(err){
               callback(resultobjs.createResult(false,"获取用户出错",err.message));
               return;
           }

            if(doc){
                callback(resultobjs.createResult(true,null,null,doc));
            } else {
                callback(resultobjs.createResult(false,"用户不存在",err.message));
            }


        });
    },
    reducepoint:function(userId,point,next){
        User.update({"userId":userId},{$inc:{"currentPoints":point}},null,function(err){
            if(err){
                console.log('扣取失败');
                return;
            }
            console.log('扣去积分成功');
            next();
        });
    },
    reducepointAndexperience:function(userId,point,experience,callback){
        User.update({"userId":userId},{$inc:{"currentPoints":point,"currentExperience":experience}},null,function(err){
            if(err){
                callback(resultobjs.createResult(false,"修改积分经验值失败",err.message));
                console.log('修改积分经验值失败');
                return;
            }
            console.log('修改积分经验值成功');
            callback(resultobjs.createResult(true,null,null));
        });
    },
    userexist:function(userId,callback){
        User.findOne({'userId':userId},function(err,doc){
            if(err){
                console.log(err.message);
                callback(resultobjs.createResult(false,"查询出错",err.message));
                return;
            }

            if(doc){
                callback(resultobjs.createResult(true,null,null,doc));
            } else {
                callback(resultobjs.createResult(false,null,'用户不存在'));
            }
        });
    }
};