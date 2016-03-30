/**
 * Created by SueCh on 2016/3/20.
 */

var io = require('socket.io').listen(7190);
var users = {};
var usocket = {};
var counter = 0; // 在线人数
var challengeUsers = {};
var challengeSocket = {};


var allinterval = {};


io.on('connection',function(socket){
    console.log('a user connected.');
    var userId = "";

    socket.on('message',function(data){

    });

    socket.on('user join',function(data){
        counter++;
        userId = data.userId;
        users[userId] = data;
        usocket[userId] = socket;



        sendmsg({
            type : 0,
            users : users,
            counter : counter,
            msg : "欢迎"+data.user+"进入游戏"});
    });


    socket.on('chat message',function(data){
        //var msg = data.msg;
        //var cinterval;
        //1是挑战请求
        if(data.type == 1){
            var userId = data.userId;
            challengeUsers[userId] = data;
            challengeSocket[userId] = socket;

            console.log('用户进入对手搜索');

            allinterval[userId] = setInterval(function(){

                for(key in challengeUsers){
                    if(challengeUsers[key].userId != userId){
                        console.log('找到对手了');

                        socket.emit('challenge message',{msg:'找到对手1',ruserId:challengeUsers[key].userId,realname:challengeUsers[key].realname,headImg:challengeUsers[key].headImg});
                        challengeSocket[challengeUsers[key].userId].emit('challenge message',{msg:'找到对手2',ruserId:userId,realname:challengeUsers[userId].realname,headImg:challengeUsers[userId].headImg});


                        console.log(challengeUsers[key].realname);
                        console.log(userId);


                        //将当前用户清除出搜索列表进入战斗
                        delete challengeUsers[userId];
                        delete challengeSocket[userId];

                        //将找到的对手清除出搜索列表进入战斗
                        delete challengeUsers[challengeSocket[challengeUsers[key].userId]];
                        delete challengeSocket[challengeSocket[challengeUsers[key].userId]];

                        delete  clearTimeout(allinterval[userId]);
                        delete  clearTimeout(allinterval[challengeSocket[challengeUsers[key].userId]]);
                    }
                }
            },2000);



            //var currentlist = [];
            //for(key in challengeUsers){
            //    if(challengeUsers[key].userId != userId){
            //        currentlist.push(challengeUsers[key].userId);
            //    }
            //}

            //while(true){
            //    for(var key in challengeUsers){
            //        console.log("现在有用户:" + challengeUsers[key].userId);
            //
            //        if(challengeUsers[key].userId != userId){
            //            console.log('找到对手了');
            //            socket.emit('challenge message',{msg:'找到对手',ruserId:challengeUsers[key].userId});
            //            challengeSocket[challengeUsers[key].userId].emit('challenge message',{msg:'找到对手',ruserId:userId});
            //
            //            delete challengeUsers[userId];
            //            delete challengeSocket[userId];
            //
            //            delete challengeUsers[challengeSocket[challengeUsers[key].userId]];
            //            delete challengeSocket[challengeSocket[challengeUsers[key].userId]];
            //
            //            break;
            //        }
            //        console.log('寻找中;')
            //    }
            //}

            //challengeSocket[userId].emit('challenge message',{msg:'对手找到了',userId:'0005'})

        }

        if(data.type == 2){
            var userId = data.userId;

            if(allinterval[userId]){
                clearTimeout(allinterval[userId]);
            }

            console.log('用户退出搜索匹配');

            //如果关闭对窗口 发送type2 停止计时器;
            delete allinterval[userId];
            //if(challengeUsers[userId].interval){
            //    clearTimeout(challengeUsers[userId].interval);
            //}
            //console.log(challengeUsers[userId].interval);

            delete challengeUsers[userId];
            delete challengeSocket[userId];


        }
    });

    //客户端有人答题完成时候，向另一端发送答案
    socket.on('answer message',function(data){
        console.log('==发送答案给对手===');

        if(data.ruserId in usocket){
            usocket[data.ruserId].emit('answer message',data);
        }
    });

    socket.on('disconnect',function(){
        console.log('user disconnected.');

        if(userId){

            counter--;
            delete users[userId];
            delete usocket[userId];

            //避免打开搜索对手窗口时，如果强行关闭浏览器,清除当前退出用户的匹配计时器
            delete allinterval[userId];

            //如果存在于对战列表中,一起清除;避免直接关闭浏览器的行为造成对战列表中的数据没清空
            delete challengeUsers[userId];
            delete challengeSocket[userId];

            sendmsg({
                type:0,
                msg:'用户:'+ userId + '离开游戏',
                counter:counter,
                users:users
            });

            console.log('用户:'+ userId + '离开游戏');
        }
    });




    function sendmsg(data){
        io.emit('chat message',data);
    }

    function sendUserMsg(data){

    }

});

