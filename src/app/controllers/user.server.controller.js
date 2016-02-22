/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = {
    create:function(req){
        var user = new User({
            userId:req.user_id,
            classId:req.class_info.class_id,
            realName:req.real_name,
            gender:true,
            className:req.class_info.class_name,
            headImg:'h2.png',
            currentPoints:req.current_points,
            currentExperience:0
        });
        user.save(function(err){
            console.log('save status:',err ? 'failed:'+err.message:'success');
        });

        return user;
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
    userexist:function(userId,next){
        User.findOne({'userId':userId},function(err,doc){
            if(err){
                console.log(err.message);
                return;
            }
                next(doc);
        });
    }
};