/**
 * Created by SueCh on 2016/2/18.
 */


var UserController = require('../controllers/user.server.controller');
var UserByPropsController = require('../controllers/userbyprops.server.controller');

module.exports = function(app){
    app.route('/web')
        .get(function(req,res,next){

            var user = {};
            user.user_id = "91e382ba-5626-453a-922e-6d2e5b6b10fd";
            user.real_name = "张洪学生";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "a8363a15-06eb-4279-aab4-ffa7031d25c4",
                "class_name": "张洪的班"
            };

            var _user = {};
            var props1 = 0;
            var props2 = 0;
            var props3 = 0;
            UserController.userexist(user.user_id,function(doc){

                UserByPropsController.get(user.user_id,function(propsdocs){

                    for(var key in propsdocs){

                            if(propsdocs[key].propsId == '1'){

                                props1 =   propsdocs[key].amount;
                            }

                            if(propsdocs[key].propsId == '2'){

                                props2 =   propsdocs[key].amount;
                            }

                            if(propsdocs[key].propsId == '3'){
                                props3 =   propsdocs[key].amount;

                            }
                        }


                        res.render('index',{
                            title:'学霸榜',
                            currentUserInfo:doc,
                            userId:doc.userId,
                            realName:doc.realName,
                            Points:doc.currentPoints,
                            Experience:doc.currentExperience,
                            ClassId:doc.classId,
                            Props1:props1,
                            Props2:props2,
                            Props3:props3
                        });
                });



            });


        })
        .post(function(req,res,next){
            res.render('index',{title:'Express'});
        });


    app.route('/buyprop')
        .get(function(req,res,next){

        })
        .post(function(req,res){

            var userbyprops = {
                userId:req.body.userId,
                propsId:req.body.propId,
                amount:1
            };



            UserByPropsController.update(userbyprops,function(){
                UserController.reducepoint(userbyprops.userId,-50,function(){
                    res.end();
                });
            });

        });

    app.route('/mobile')
        .get(function(req,res){
            res.send('这是移动版本');
        })
        .post(function(req,res){

        });
};