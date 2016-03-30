/**
 * Created by SueCh on 2016/2/18.
 */


var UserController = require('../controllers/user.server.controller');
var UserByPropsController = require('../controllers/userbyprops.server.controller');
var Level = require('../../config/level.config');

module.exports = function(app){
    app.route('/web')
        .get(function(req,res){
            //var user = req.body;

            var user = {};
            user.user_id = "75e29223-0a80-415c-96a4-9d8334a0a46b";
            user.real_name = "学生一";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "9a66d008-ca10-4c02-b569-b980b7a3817b",
                "class_name": "99班"
            };

            var props1 = 0;
            var props2 = 0;
            var props3 = 0;

            UserController.userexist(user.user_id,function(resultobjs){
                if(resultobjs.result){

                    UserByPropsController.get(user.user_id,function(propsdocs) {
                        for (var key in propsdocs) {
                            if (propsdocs[key].propsId == '1') {
                                props1 = propsdocs[key].amount;
                            }
                            if (propsdocs[key].propsId == '2') {
                                props2 = propsdocs[key].amount;
                            }

                            if (propsdocs[key].propsId == '3') {
                                props3 = propsdocs[key].amount;
                            }
                        }
                        //console.log(resultobjs.body.currentExperience);

                        var level =0;
                        for(i in Level){
                            if(resultobjs.body.currentExperience > Level[i]){
                                level = i;
                            }
                        }

                        res.render('index',{
                            title:'学霸榜',
                            currentUserInfo:resultobjs.body,
                            userId:resultobjs.body.userId,
                            realName:resultobjs.body.realName,
                            headImg:resultobjs.body.headImg,
                            Points:resultobjs.body.currentPoints,
                            Experience:resultobjs.body.currentExperience,
                            ClassId:resultobjs.body.classId,
                            Props1:props1,
                            Props2:props2,
                            Props3:props3,
                            Level:level
                        });
                    })
                }else{

                    UserController.create(user,function(adduserresult){
                        if(adduserresult.result){
                            UserByPropsController.create({
                                userId:adduserresult.body.userId,
                                propsId:'1',
                                amount:2
                            },function(){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'2',
                                    amount:2
                                },function(){

                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'3',
                                        amount:2
                                    },function(){

                                        res.render('index',{
                                            title:'学霸榜',
                                            currentUserInfo:adduserresult.body,
                                            userId:adduserresult.body.userId,
                                            realName:adduserresult.body.realName,
                                            Points:adduserresult.body.currentPoints,
                                            Experience:adduserresult.body.currentExperience,
                                            ClassId:adduserresult.body.classId,
                                            Props1:props1,
                                            Props2:props2,
                                            Props3:props3
                                        });

                                    });
                                });

                            });



                        }
                    });



                    console.log("用户不存在");
                }
                });
        })
        .post(function(req,res,next){
            var user = req.body;
            if(user.user_id &&
                user.real_name &&
                user.current_points &&
                user.class_info.class_id){

                var props1 = 0;
                var props2 = 0;
                var props3 = 0;

                UserController.userexist(user.user_id,function(resultobjs){
                    if(resultobjs.result){

                        UserByPropsController.get(user.user_id,function(propsdocs) {
                            for (var key in propsdocs) {
                                if (propsdocs[key].propsId == '1') {
                                    props1 = propsdocs[key].amount;
                                }
                                if (propsdocs[key].propsId == '2') {
                                    props2 = propsdocs[key].amount;
                                }

                                if (propsdocs[key].propsId == '3') {
                                    props3 = propsdocs[key].amount;
                                }
                            }
                            console.log(resultobjs.body.currentExperience);
                            res.render('index',{
                                title:'学霸榜',
                                currentUserInfo:resultobjs.body,
                                userId:resultobjs.body.userId,
                                realName:resultobjs.body.realName,
                                headImg:resultobjs.body.headImg,
                                Points:resultobjs.body.currentPoints,
                                Experience:resultobjs.body.currentExperience,
                                ClassId:resultobjs.body.classId,
                                Props1:props1,
                                Props2:props2,
                                Props3:props3
                            });
                        })
                    }else{

                        UserController.create(user,function(adduserresult){
                            if(adduserresult.result){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'1',
                                    amount:2
                                },function(){
                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'2',
                                        amount:2
                                    },function(){

                                        UserByPropsController.create({
                                            userId:adduserresult.body.userId,
                                            propsId:'3',
                                            amount:2
                                        },function(){

                                            res.render('index',{
                                                title:'学霸榜',
                                                currentUserInfo:adduserresult.body,
                                                userId:adduserresult.body.userId,
                                                realName:adduserresult.body.realName,
                                                Points:adduserresult.body.currentPoints,
                                                Experience:adduserresult.body.currentExperience,
                                                ClassId:adduserresult.body.classId,
                                                Props1:props1,
                                                Props2:props2,
                                                Props3:props3
                                            });

                                        });
                                    });

                                });



                            }
                        });



                        console.log("用户不存在");
                    }
                });


            }else{
                res.json({result:false,resultMsg:'缺少必要元素'});
            }


        });

    app.route('/web2')
        .get(function(req,res){
            //var user = req.body;

            var user = {};
            user.user_id = "15e29223-0a80-415c-96a4-9d8334a0a46b";
            user.real_name = "学生3";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "8a66d008-ca10-4c02-b569-b980b7a3817b",
                "class_name": "97班"
            };

            var props1 = 0;
            var props2 = 0;
            var props3 = 0;

            UserController.userexist(user.user_id,function(resultobjs){
                if(resultobjs.result){

                    UserByPropsController.get(user.user_id,function(propsdocs) {
                        for (var key in propsdocs) {
                            if (propsdocs[key].propsId == '1') {
                                props1 = propsdocs[key].amount;
                            }
                            if (propsdocs[key].propsId == '2') {
                                props2 = propsdocs[key].amount;
                            }

                            if (propsdocs[key].propsId == '3') {
                                props3 = propsdocs[key].amount;
                            }
                        }
                        //console.log(resultobjs.body.currentExperience);

                        var level = 0;

                        for(i in Level){
                            if(resultobjs.body.currentExperience > Level[i]){
                                level = i;
                            }
                        }


                        res.render('index',{
                            title:'学霸榜',
                            currentUserInfo:resultobjs.body,
                            userId:resultobjs.body.userId,
                            realName:resultobjs.body.realName,
                            headImg:resultobjs.body.headImg,
                            Points:resultobjs.body.currentPoints,
                            Experience:resultobjs.body.currentExperience,
                            ClassId:resultobjs.body.classId,
                            Props1:props1,
                            Props2:props2,
                            Props3:props3,
                            Level:level
                        });
                    })
                }else{

                    UserController.create(user,function(adduserresult){
                        if(adduserresult.result){
                            UserByPropsController.create({
                                userId:adduserresult.body.userId,
                                propsId:'1',
                                amount:2
                            },function(){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'2',
                                    amount:2
                                },function(){

                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'3',
                                        amount:2
                                    },function(){

                                        res.render('index',{
                                            title:'学霸榜',
                                            currentUserInfo:adduserresult.body,
                                            userId:adduserresult.body.userId,
                                            realName:adduserresult.body.realName,
                                            Points:adduserresult.body.currentPoints,
                                            Experience:adduserresult.body.currentExperience,
                                            ClassId:adduserresult.body.classId,
                                            Props1:props1,
                                            Props2:props2,
                                            Props3:props3
                                        });

                                    });
                                });

                            });



                        }
                    });



                    console.log("用户不存在");
                }
            });
        })
        .post(function(req,res,next){
            var user = req.body;
            if(user.user_id &&
                user.real_name &&
                user.current_points &&
                user.class_info.class_id){

                var props1 = 0;
                var props2 = 0;
                var props3 = 0;

                UserController.userexist(user.user_id,function(resultobjs){
                    if(resultobjs.result){

                        UserByPropsController.get(user.user_id,function(propsdocs) {
                            for (var key in propsdocs) {
                                if (propsdocs[key].propsId == '1') {
                                    props1 = propsdocs[key].amount;
                                }
                                if (propsdocs[key].propsId == '2') {
                                    props2 = propsdocs[key].amount;
                                }

                                if (propsdocs[key].propsId == '3') {
                                    props3 = propsdocs[key].amount;
                                }
                            }
                            console.log(resultobjs.body.currentExperience);



                            res.render('index',{
                                title:'学霸榜',
                                currentUserInfo:resultobjs.body,
                                userId:resultobjs.body.userId,
                                realName:resultobjs.body.realName,
                                headImg:resultobjs.body.headImg,
                                Points:resultobjs.body.currentPoints,
                                Experience:resultobjs.body.currentExperience,
                                ClassId:resultobjs.body.classId,
                                Props1:props1,
                                Props2:props2,
                                Props3:props3
                            });
                        })
                    }else{
                        UserController.create(user,function(adduserresult){
                            if(adduserresult.result){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'1',
                                    amount:2
                                },function(){
                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'2',
                                        amount:2
                                    },function(){

                                        UserByPropsController.create({
                                            userId:adduserresult.body.userId,
                                            propsId:'3',
                                            amount:2
                                        },function(){

                                            res.render('index',{
                                                title:'学霸榜',
                                                currentUserInfo:adduserresult.body,
                                                userId:adduserresult.body.userId,
                                                realName:adduserresult.body.realName,
                                                Points:adduserresult.body.currentPoints,
                                                Experience:adduserresult.body.currentExperience,
                                                ClassId:adduserresult.body.classId,
                                                Props1:props1,
                                                Props2:props2,
                                                Props3:props3
                                            });

                                        });
                                    });
                                });
                            }
                        });
                        console.log("用户不存在");
                    }
                });
            }else{
                res.json({result:false,resultMsg:'缺少必要元素'});
            }
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

    app.route('/mobiletest')
        .get(function(req,res){
            //var user = req.body;

            var user = {};
            user.user_id = "75e29223-0a80-415c-96a4-9d8334a0a46b";
            user.real_name = "学生一";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "9a66d008-ca10-4c02-b569-b980b7a3817b",
                "class_name": "99班"
            };

            var props1 = 0;
            var props2 = 0;
            var props3 = 0;

            UserController.userexist(user.user_id,function(resultobjs){
                if(resultobjs.result){

                    UserByPropsController.get(user.user_id,function(propsdocs) {
                        for (var key in propsdocs) {
                            if (propsdocs[key].propsId == '1') {
                                props1 = propsdocs[key].amount;
                            }
                            if (propsdocs[key].propsId == '2') {
                                props2 = propsdocs[key].amount;
                            }

                            if (propsdocs[key].propsId == '3') {
                                props3 = propsdocs[key].amount;
                            }
                        }
                        //console.log(resultobjs.body.currentExperience);

                        var level =0;
                        for(i in Level){
                            if(resultobjs.body.currentExperience > Level[i]){
                                level = i;
                            }
                        }

                        res.render('mobile',{
                            title:'学霸榜',
                            currentUserInfo:resultobjs.body,
                            userId:resultobjs.body.userId,
                            realName:resultobjs.body.realName,
                            headImg:resultobjs.body.headImg,
                            Points:resultobjs.body.currentPoints,
                            Experience:resultobjs.body.currentExperience,
                            ClassId:resultobjs.body.classId,
                            Props1:props1,
                            Props2:props2,
                            Props3:props3,
                            Level:level
                        });
                    })
                }else{
                    UserController.create(user,function(adduserresult){
                        if(adduserresult.result){
                            UserByPropsController.create({
                                userId:adduserresult.body.userId,
                                propsId:'1',
                                amount:2
                            },function(){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'2',
                                    amount:2
                                },function(){

                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'3',
                                        amount:2
                                    },function(){

                                        res.render('index',{
                                            title:'学霸榜',
                                            currentUserInfo:adduserresult.body,
                                            userId:adduserresult.body.userId,
                                            realName:adduserresult.body.realName,
                                            Points:adduserresult.body.currentPoints,
                                            Experience:adduserresult.body.currentExperience,
                                            ClassId:adduserresult.body.classId,
                                            Props1:props1,
                                            Props2:props2,
                                            Props3:props3
                                        });

                                    });
                                });

                            });



                        }
                    });
                    console.log("用户不存在");
                }
            });
        })


    app.route('/usertest')
        .get(function(req,res){
            res.render('usertest',{title:'测试页'});
        });

    app.route('/useprop')
        .post(function(req,res){
            var userbyprops = {
                userId:req.body.userId,
                propsId:req.body.propId,
                amount:-1
            };
            //console.log(req.body);
            UserByPropsController.update(userbyprops,function(){
                res.end();
            });
            //res.end();
        });

    app.route('/mobile')
        .get(function(req,res){
            //var user = req.body;

            var user = {};
            user.user_id = "75e29223-0a80-415c-96a4-9d8334a0a46b";
            user.real_name = "学生一";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "9a66d008-ca10-4c02-b569-b980b7a3817b",
                "class_name": "99班"
            };

            var props1 = 0;
            var props2 = 0;
            var props3 = 0;

            UserController.userexist(user.user_id,function(resultobjs){
                if(resultobjs.result){

                    UserByPropsController.get(user.user_id,function(propsdocs) {
                        for (var key in propsdocs) {
                            if (propsdocs[key].propsId == '1') {
                                props1 = propsdocs[key].amount;
                            }
                            if (propsdocs[key].propsId == '2') {
                                props2 = propsdocs[key].amount;
                            }

                            if (propsdocs[key].propsId == '3') {
                                props3 = propsdocs[key].amount;
                            }
                        }
                        //console.log(resultobjs.body.currentExperience);

                        var level =0;
                        for(i in Level){
                            if(resultobjs.body.currentExperience > Level[i]){
                                level = i;
                            }
                        }

                        res.render('index',{
                            title:'学霸榜',
                            currentUserInfo:resultobjs.body,
                            userId:resultobjs.body.userId,
                            realName:resultobjs.body.realName,
                            headImg:resultobjs.body.headImg,
                            Points:resultobjs.body.currentPoints,
                            Experience:resultobjs.body.currentExperience,
                            ClassId:resultobjs.body.classId,
                            Props1:props1,
                            Props2:props2,
                            Props3:props3,
                            Level:level
                        });
                    })
                } else {
                    UserController.create(user,function(adduserresult){
                        if(adduserresult.result){
                            UserByPropsController.create({
                                userId:adduserresult.body.userId,
                                propsId:'1',
                                amount:2
                            },function(){
                                UserByPropsController.create({
                                    userId:adduserresult.body.userId,
                                    propsId:'2',
                                    amount:2
                                },function(){

                                    UserByPropsController.create({
                                        userId:adduserresult.body.userId,
                                        propsId:'3',
                                        amount:2
                                    },function(){

                                        res.render('index',{
                                            title:'学霸榜',
                                            currentUserInfo:adduserresult.body,
                                            userId:adduserresult.body.userId,
                                            realName:adduserresult.body.realName,
                                            Points:adduserresult.body.currentPoints,
                                            Experience:adduserresult.body.currentExperience,
                                            ClassId:adduserresult.body.classId,
                                            Props1:props1,
                                            Props2:props2,
                                            Props3:props3
                                        });

                                    });
                                });

                            });



                        }
                    });
                    console.log("用户不存在");
                }
            });
        })
        .post(function(req,res){

        });
};