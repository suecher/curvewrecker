/**
 * Created by SueCh on 2016/2/25.
 */

var http = require('http');
var request = require('request');
//
module.exports = {
    classlist:function(classId,next){
        request('http://suecher.vicp.cc:23162/testingdata/classlist.json',function(error,response,body){
            if(!error && response.statusCode == 200){
                var obj = JSON.parse(body);
                next(obj);
            }
        });
    },
    questionlist:function(){
        request('http://suecher.vicp.cc:23162/testingdata/question.json',function(error,response,body){
            if(!error && response.statusCode == 200){
                var obj = JSON.parse(body);
                next(obj);
            }
        });
    }
};



