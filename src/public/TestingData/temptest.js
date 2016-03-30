/**
 * Created by SueCh on 2016/3/19.
 */
//
//var test_name = "　　)<\\/p>questionAAA_note<p>算法的概念考AAA查1<\\\\/p>levelque";
////var str = test_name.replace("\\","");
////console.log(test_name.indexOf('\\'));
//
//
//while (test_name.indexOf('\\') != -1){
//    test_name = test_name.replace('\\','');
//}
//
////var str = test_name.replace('AAA','ttt');
//console.log(test_name);


//console.log(str);

///试题
//var request = require('request');
//
//var options = {
//    url:'http://120.25.222.135:7080/rc/v1/question/getGameQuestionList',
//    headers: {
//        'Content-Type':'application/json',
//        'User-Agent': 'request'
//    },
//    json:{user_id:"75e29223-0a80-415c-96a4-9d8334a0a46b",ruser_id:"75e29223-0a80-415c-96a4-9d8334a0a46b",channelId:"100000",pk_type:"0"}
//};
//
//request.post(options,function(error,response,body){
//
//    var str = JSON.stringify(body);
//    //while (str.indexOf('\\') != -1){
//    //    str = str.replace('\\','');
//    //}
//    console.log(str);
//});


//班级部分
//var request = require('request');
//
//var options = {
//    url:'http://120.25.222.135:7080/rc/v1/class/get_user_list',
//    headers: {
//        'Content-Type':'application/json',
//        'User-Agent': 'request'
//    },
//    json:{
//        "pagination": {
//            "pageNo": "0",
//            "numPerPage": "10"
//        },
//        "searchConditionList": [
//            {
//                "key": "class_id",
//                "value": "9a66d008-ca10-4c02-b569-b980b7a3817b",
//                "operator": "EQUAL"
//            },{
//                "key": "user_type_id",
//                "value": "600003",
//                "operator": "EQUAL"
//            }],
//        "orderMethodList": [{
//            "field": "effective_time",
//            "method": "ASC"
//        }]
//    }
//};
//
//request.post(options,function(error,response,body){
//
//    var str = JSON.stringify(body);
//    //while (str.indexOf('\\') != -1){
//    //    str = str.replace('\\','');
//    //}
//    console.log(str);
//});



var str = "<p>对于算法:<br\\\/>第一步,输入n.<br\\/>第二步,判断n是否等于2,若n=2,则n满足条件;若n&gt;2,则执行第三步.<br\\/>第三步,依次从2到(n-1)检验能不能整除n,若不能整除n,则执行第四步;若能整除n,则执行第一步.<br\\/>第四步,输出n.<br\\/>满足条件的n是\t(　　)<\\/p>;";

while (str.indexOf('\\') != -1){
        str = str.replace('\\','');
    }
console.log(str);

