/**
 * Created by SueCh on 2016/2/25.
 */

var http = require('http');
var request = require('request');
var  resultObj = require('../app/models/result.server.model');
var UserController = require('../app/controllers/user.server.controller');
var Level = require('../config/level.config');

module.exports = {
    classlist:function(classId,callback){

        var options = {
            url:'http://120.25.222.135:7080/rc/v1/class/get_user_list',
            headers: {
                'Content-Type':'application/json',
                'User-Agent': 'request'
            },
            json:{
                "pagination": {
                    "pageNo": "0",
                    "numPerPage": "10"
                },
                "searchConditionList": [
                    {
                        "key": "class_id",
                        "value": classId,
                        "operator": "EQUAL"
                    },{
                        "key": "user_type_id",
                        "value": "600003",
                        "operator": "EQUAL"
                    }],
                "orderMethodList": [{
                    "field": "effective_time",
                    "method": "ASC"
                }]
            }
        };


        request.post(options,function(error,response,body){
            //callback(resultObj.createResult(true,null,null,body));

            var classList = [];

            //for(key,index in body.user_list){
            //
            //    UserController.userexist(body.user_list[key].user_id,function(resultobj){
            //        if(resultobj.result){
            //            classList.push(resultobj.body);
            //        }else{
            //            classList.push({
            //                userId:body.user_list[key].user_id,
            //                realName:body.user_list[key].real_name,
            //                headImg:'h1.png',
            //                currentPoints:0,
            //                currentExperience:0
            //            });
            //        }
            //    });
            //
            //    console.log(index);
            //}

            //while(bit){
            //    console.log(classList);
            //    callback(classList);
            //}

            //console.log(classList);


            var classList = [];
            if(body.user_list) {
                body.user_list.forEach((item, index) => {

                    UserController.userexist(item.user_id, function (resultobj) {

                        if (resultobj.result) {


                            var level = 0;

                            for(i in Level){
                                if(resultobj.body.currentExperience > Level[i]){
                                    level = i;
                                }
                            }

                            //resultobj.body.level = level;

                            classList.push({
                                userId: resultobj.body.userId,
                                realName: resultobj.body.realName,
                                headImg: resultobj.body.headImg,
                                currentPoints: resultobj.body.currentPoints,
                                currentExperience: resultobj.body.currentExperience,
                                level:level
                            });
                        } else {
                            classList.push({
                                userId: item.user_id,
                                realName: item.real_name,
                                headImg: 'h1.png',
                                currentPoints: 0,
                                currentExperience: 0,
                                level:0
                            });
                        }

                        if (index + 1 == body.user_list.length) {
                            callback(classList);
                        }

                    });
                });
            }
        });

        //callback({});


        //request('http://suecher.vicp.cc:23162/testingdata/classlist.json',function(error,response,body){
        //    if(!error && response.statusCode == 200){
        //        var obj = JSON.parse(body);
        //        next(obj);
        //    }
        //});
    },
    questionlist:function(pkinfo,callback){

        var options = {
            url:'http://120.25.222.135:7080/rc/v1/question/getGameQuestionList',
            headers: {
                'Content-Type':'application/json',
                'User-Agent': 'request'
            },
            json:{user_id:pkinfo.userId,ruser_id:pkinfo.ruser_id,channelId:pkinfo.chanelId,pk_type:pkinfo.pk_type}
        };


        request.post(options,function(error,response,body){

            //console.log(body);
            //var str = JSON.stringify(body);

            //while (str.indexOf('\\') != -1){
            //    str = str.replace('\\','');
            //}

            callback(resultObj.createResult(true,null,null,body));

        });

        //request('http://localhost:7102/question/getGameQuestionList/question2.json',function(error,response,body){
        //    if(!error && response.statusCode == 200){
        //        var obj = JSON.parse(body);
        //        next(obj);
        //    }
        //});
    }
};



