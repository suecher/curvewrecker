/**
 * Created by SueCh on 2016/2/19.
 */
angular.module('app',[])
.controller('MainCtrl',function($scope,$http){
    //$scope.test = 'Message';
    var AnswerNum = 0;
    var currentUserInfo = {};

    //是否答题完毕状态
    $scope.answerover = true;

    //对手答案信息
    $scope.rivalanswer = undefined;

    //PK是否进行中
    $scope.pking = false;

    $scope.questionInfo = {};
    $scope.pkInfo = {
        userId:'',
        ruserId:'',
        answerList:[]
    };

    //自己的信息
    $scope.pkMeInfo = {
        userId:'',
        headImg:'',
        realname:'',
        classOrall:undefined
    };
    //对手的信息
    $scope.pkRivalInfo = {
        userId:'',
        headImg:'',
        realname:''
    };

    $scope.resultInfo = {};

    currentUserInfo.userId = $("#UserId").text();
    currentUserInfo.points = $("#Points").text();
    currentUserInfo.experience = $("#Experience").text();
    currentUserInfo.classId = $("#ClassId").text();
    currentUserInfo.headImg = $("#HeadImg").text();
    currentUserInfo.realname = $("#RealName").text();
    currentUserInfo.level = $("#Level").text();

    $scope.headImg =  $("#HeadImg").text();
    $scope.ngUserId = $("#UserId").text();
    $scope.ngPoints = $("#Points").text();
    $scope.ngExperience = $("#Experience").text();
    $scope.ngClassId = $("#ClassId").text();
    $scope.ngProps1 = $("#Props1").text();
    $scope.ngProps2 = $("#Props2").text();
    $scope.ngProps3 = $("#Props3").text();
    $scope.ngClassInfoList = {};
    $scope.ngLevel =  $("#Level").text();

    $scope.countdown = 0;

    $("#pointModalPoint").text(currentUserInfo.points);
    $("#propModalPoint").text(currentUserInfo.points);


    //兑换积分
    $scope.exchangepoint = function(){

        $("#pointModal").modal();
    };

    $scope.exchangeprop = function(){
        $("#propModal").modal();
    };

    //$scope.allPk = function(){
    //    $("#pkloadingtModal").modal();
    //
    //};


    initClass();

    function initClass(){
        $http.post('/getclass',{"classId":currentUserInfo.classId})
            .success(function(data){
                console.log(data);
                $scope.ngClassInfoList = data;
            });
    };

    $scope.classPk = function(ruserId,rivalImg,rivalRealname,classOrall){

         //classOrall 是否为班级PK，1班级PK 0全网PK

        if(currentUserInfo.userId == ruserId){
            swal("挑战失败", "不可以挑战自己", "error");
            return;
        }

        //开始PK
        $scope.pking = true;

        //开始答题/ 状态flase
        $scope.answerover = false;

        $scope.pkMeInfo = {
            userId:currentUserInfo.userId,
            headImg:currentUserInfo.headImg,
            realname:currentUserInfo.realname,
            classOrall:classOrall
        };

        $scope.pkRivalInfo = {
            userId:ruserId,
            headImg:rivalImg,
            realname:rivalRealname
        };




        $http.post('/question',{"userId":currentUserInfo.userId,"ruserId":ruserId,"chanelId":"100000","pk_type":"0"})
            .success(function(data){

                //var s1 = JSON.stringify(data.body);
                //  console.log(s1);
                //while (s1.indexOf('\\') != -1){
                //    s1 = s1.replace('\\','');
                //}
                //
                //
                //
                //return;

                $scope.questionInfo = data.body;
                AnswerNum = 0;
                $scope.countdown = 60;

                //每次初始化PK信息
                $scope.pkInfo = {
                    userId:'',
                    ruserId:'',
                    answerList:[]
                };

                PkInit($scope.questionInfo,0);

                var countdownInterval = setInterval(function(){
                    $scope.countdown -=1;
                    $scope.$apply();

                    if($scope.countdown == 0){
                        if($scope.pking){
                            resultstatistics();
                        }
                        clearInterval(countdownInterval);
                        $("#resultModal").modal();
                    }
                },1000);
                   //{backdrop: 'static', keyboard: false}
                $("#pkModal").modal({backdrop: 'static', keyboard: false})
                    .on("hide.bs.modal",function(){
                        clearInterval(countdownInterval);
                        AnswerNum = 0;

                        //关闭时初始化答题信息
                        $scope.pkInfo = {
                            userId:'',
                            ruserId:'',
                            answerList:[]
                        };

                        //关闭时清空当前用户PK信息
                        $scope.pkMeInfo = {
                            userId:"",
                            headImg:"",
                            realname:"",
                            classOrall:undefined
                        };

                        //关闭时清空对手PK信息
                        $scope.pkRivalInfo = {
                            userId:"",
                            headImg:"",
                            realname:""
                        };

                        //关闭时候清空对手答案
                        $scope.rivalanswer = undefined;

                        //关闭时 答题是否完成状态TRUE TRUE答题完毕
                        $scope.answerover = true;

                        $scope.resultInfo = {};
                    });
            })
            .error(function(){
                swal("挑战失败", "班级挑战失败,请联系管理员", "error");
            });
    };


    $scope.closePk = function(){
        swal({
            title: "你确定要强行退出吗?",
            text: "强行退出会被自动判定为失败。",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "是的,我确定退出",
            cancelButtonText:"取消",
            closeOnConfirm: true },
            function(){
                $("#pkModal").modal("hide");
            });
    };

    $scope.againpk = function(){
        $("#resultModal").modal("hide");
        $("#pkModal").modal("hide").
        on("hidden.bs.modal",function(){
            $scope.classPk($scope.pkMeInfo.userId,$scope.pkMeInfo.headImg,$scope.pkMeInfo.realname,pkMeInfo.classOrall);
        });
    };

    $scope.questionanalyze = function(){

        $scope.analyzeInfo = [];

        for(var key =0 in $scope.questionInfo.question_list){
            var analyzeItem = {};
            analyzeItem.question_content = $scope.questionInfo.question_list[key].question_content;
            analyzeItem.item_list = $scope.questionInfo.question_list[key].item_list;

            //console.log($scope.questionInfo.question_list[key].question_id);

            for(var key2 =0 in $scope.pkInfo.answerList){
                console.log($scope.pkInfo);
                if($scope.questionInfo.question_list[key].question_id ==  $scope.pkInfo.answerList[key2].questionId){
                    analyzeItem.selectanswerNo = $scope.pkInfo.answerList[key2].answerNo;
                    analyzeItem.selectRightText = $scope.pkInfo.answerList[key2].isRight ? "你的选择是对的":"你的选择是错误的";
                    analyzeItem.selectRight =  $scope.pkInfo.answerList[key2].isRight ? "green":"red";
                    analyzeItem.itemcontent = $scope.pkInfo.answerList[key2].itemcontent;
                }
            }

            $scope.analyzeInfo.push(analyzeItem);
        }

        $("#questionModal").modal();
    };


    $scope.clientuseprop = function(propId){
        $http.post('/useprop/',{"userId":currentUserInfo.userId,"propId":propId})
            .success(function(data){
                switch (propId){
                    case 1:
                        $scope.ngProps1 = parseInt($scope.ngProps1) - 1;

                        break;
                    case 2:
                        $scope.ngProps2 = parseInt($scope.ngProps2) - 1;
                        $scope.countdown += 5;

                        break;
                    case 3:
                        $scope.ngProps3 = parseInt($scope.ngProps3) - 1;
                        if($(".false").length > 1){
                            $(".false:gt(0)").hide();
                        }

                        if($(".false").length > 2){
                            $(".false:gt(1)").hide();
                        }
                        break;
                }
            })
            .error(function(){
                alert('道具使用失败.');
            });
    };


    $scope.backmain = function(){
        $("#resultModal").modal("hide");
        $("#pkModal").modal("hide");
    };

    function resultstatistics(){
        var rightNum = 0;
        var errorNum = 0;

        for(var key= 0 in $scope.pkInfo.answerList){
            if($scope.pkInfo.answerList[key].isRight) {
                rightNum++;
            }else{
                errorNum++;
            }
        };

        var accuracy =  (rightNum/$scope.questionInfo.total_num) * 100;
        $scope.resultInfo.accuracy = accuracy;
        $scope.resultInfo.rightNum = rightNum;

        if($scope.pkMeInfo.classOrall){

            $scope.resultInfo.victory =  accuracy >= 60 ? true:false;

            if($scope.resultInfo.victory){
                $scope.resultInfo.experience = 50;
                $scope.resultInfo.point = 50;
                $scope.resultInfo.img = "img/web/victory.png";


                //提交成绩到服务器
                resultSubmit({
                    userId:$scope.pkMeInfo.userId,
                    rivalId:$scope.pkRivalInfo.userId,
                    victory:true,
                    point:50,
                    experience:50,
                    classOrAll:$scope.pkMeInfo.classOrall
                });

            }else{
                $scope.resultInfo.experience = 10;
                $scope.resultInfo.point = 0;
                $scope.resultInfo.img = "img/web/defeated.png";

                resultSubmit({
                    userId:$scope.pkMeInfo.userId,
                    rivalId:$scope.pkRivalInfo.userId,
                    victory:true,
                    point:0,
                    experience:10,
                    classOrAll:$scope.pkMeInfo.classOrall
                });
            }

            $("#resultModal").modal({backdrop: 'static', keyboard: false});
            $scope.pking = false;

        } else {
            console.log('客户端准备发送');
            sendAnswerMsg({
                ruserId:$scope.pkRivalInfo.userId,
                userId:$scope.pkMeInfo.userId,
                errorNum:errorNum,
                rightNum:rightNum
            });


            //console.log($scope.rivalanswer);

            //判断这个时候对手是否答题完毕
            if($scope.rivalanswer){
                //alert("对手这个时候已经答题完成.");


                console.log("我的答对数量:"+rightNum);
                console.log("对手的答对数量:"+$scope.rivalanswer.rightNum);

                if(rightNum >= $scope.rivalanswer.rightNum){
                    $scope.resultInfo.victory = true;
                } else
                {
                    $scope.resultInfo.victory = false;
                }

                //-----判断胜负

                    if($scope.resultInfo.victory){
                        $scope.resultInfo.experience = 50;
                        $scope.resultInfo.point = 50;
                        $scope.resultInfo.img = "img/web/victory.png";


                        //提交成绩到服务器
                        resultSubmit({
                            userId:$scope.pkMeInfo.userId,
                            rivalId:$scope.pkRivalInfo.userId,
                            victory:true,
                            point:50,
                            experience:50,
                            classOrAll:$scope.pkMeInfo.classOrall
                        });

                    }else{
                        $scope.resultInfo.experience = 10;
                        $scope.resultInfo.point = 0;
                        $scope.resultInfo.img = "img/web/defeated.png";

                        resultSubmit({
                            userId:$scope.pkMeInfo.userId,
                            rivalId:$scope.pkRivalInfo.userId,
                            victory:true,
                            point:0,
                            experience:10,
                            classOrAll:$scope.pkMeInfo.classOrall
                        });
                    }


                //-----判断胜负结束

                $("#resultModal").modal({backdrop: 'static', keyboard: false});
                $scope.pking = false;


            }
            else{
                alert("对手还没答题完成");
                $("#waitModal").modal({backdrop: 'static', keyboard: false});
            }
        }

        $scope.answerover = true;

    }

    function resultSubmit(pkInfo){
        $http.post('/addpkrecord',{userId:pkInfo.userId,rivalId:pkInfo.rivalId,victory:pkInfo.victory,point:pkInfo.point,experience:pkInfo.experience,classOrAll:pkInfo.classOrAll})
            .success(function(data){
               console.log(data);
            });
    }

    //选取答案
    $scope.clickAnswer = function(index,questionId,answerNo,isRight,itemcontent){
        //console.log(questionId);
        AnswerNum++;
        if(AnswerNum == $scope.questionInfo.total_num){
            $scope.pkInfo.answerList.push({questionIndex:index,questionId:questionId,answerNo:answerNo,isRight:isRight,itemcontent:itemcontent});

            if($scope.pking){
                resultstatistics();
            }

        }else {
            PkInit($scope.questionInfo,AnswerNum);
            $scope.pkInfo.answerList.push({questionIndex:index,questionId:questionId,answerNo:answerNo,isRight:isRight,itemcontent:itemcontent});
        }
    };

    //初始化第一道题
    function PkInit(data,questionIndex){
        $scope.questionContent = data.question_list[questionIndex].question_content;
        $scope.questionItem_list = data.question_list[questionIndex].item_list;
        $scope.pkquestionid =  data.question_list[questionIndex].question_id;
        $scope.current_question = questionIndex+1 + "/" + data.total_num;
    }

     //购买道具
    $scope.buyprop = function(propId)
    {
        if($scope.ngPoints <= 0 || $scope.ngPoints<50){
            swal("警告", "您的积分不足,请进行充值");
            return;
        }

        $http.post('/buyprop/',{"userId":currentUserInfo.userId,"propId":propId})
        .success(function(data){
            switch (propId){
                case 1:
                    $scope.ngProps1 = parseInt($scope.ngProps1) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    swal("购买道具成功", "成功购买冰冻对手");
                    break;
                case 2:
                    $scope.ngProps2 = parseInt($scope.ngProps2) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    swal("购买道具成功", "成功购买增加时间");
                    break;
                case 3:
                    $scope.ngProps3 = parseInt($scope.ngProps3) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    swal("购买道具成功", "成功购买去除错误答案");
                    break;
            }
        })
        .error(function(){
            alert('购买失败');
        });
    }



    //---------socket.io 服务
    var socket = io.connect('localhost:7190');
    socket.emit('user join',{userId:$("#UserId").text(),realname:$("#RealName").text()});

    socket.on('chat message',function(data){
        $("#txtonlineCount").text("当前在线:"+data.counter);

        //客户端在线人员列表
        clientOnlineList = data.users;

        $scope.allPk = function(){
            //1 发起挑战 //2 撤回挑战
            $("#pkloadingtModal").modal()
                .on("hide.bs.modal",function(){
                    socket.emit('chat message',{type:2,msg:'退出对战',userId:currentUserInfo.userId});
                });

            socket.emit('chat message',{type:1,msg:'开始挑战',userId:currentUserInfo.userId,realname:currentUserInfo.realname,headImg:currentUserInfo.headImg});
        };
    });

    socket.on('challenge message',function(data){

        console.log(data);
        $scope.classPk(data.ruserId,data.headImg,data.realname,false);
        $("#pkloadingtModal").modal("hide");
    });

    function sendAnswerMsg(data){

        //发送自己的成绩给对手
        //ruserId 对手ID
        //userId 自己ID
        //
        console.log(data);

        //优先级等于0 先完成着通知后完成者
        socket.emit('answer message', {
            ruserId: data.ruserId,
            userId: data.userId,
            errorNum: data.errorNum,
            rightNum: data.rightNum,
            test: data.ruserId
        });

    }


    //function sendResultMsg(data){
    //
    //    //发送自己的成绩给对手
    //    //ruserId 对手ID
    //    //userId 自己ID
    //    //
    //    console.log(data);
    //    socket.emit('answer message',{ruserId:data.ruserId,userId:data.userId,errorNum:data.errorNum,rightNum:data.rightNum,test:data.ruserId});
    //}

    //监听提交过来的答案;
    socket.on('answer message',function(data){
        console.log('对手答题完毕');

        $scope.rivalanswer = data;

        //判断答题是否结束了，结束了进行判断
        if($scope.answerover){
            console.log('当前用户答题完毕');
            console.log("我的答对数量:"+$scope.resultInfo.rightNum);
            console.log("对手的答对数量:"+data.rightNum);

            if($scope.resultInfo.rightNum >= data.rightNum){
                $scope.resultInfo.victory = true;
            } else
            {
                $scope.resultInfo.victory = false;
            }

            //-----判断胜负

            if($scope.resultInfo.victory){
                $scope.resultInfo.experience = 50;
                $scope.resultInfo.point = 50;
                $scope.resultInfo.img = "img/web/victory.png";


                //提交成绩到服务器
                resultSubmit({
                    userId:$scope.pkMeInfo.userId,
                    rivalId:$scope.pkRivalInfo.userId,
                    victory:true,
                    point:50,
                    experience:50,
                    classOrAll:$scope.pkMeInfo.classOrall
                });

            }else{
                $scope.resultInfo.experience = 10;
                $scope.resultInfo.point = 0;
                $scope.resultInfo.img = "img/web/defeated.png";

                resultSubmit({
                    userId:$scope.pkMeInfo.userId,
                    rivalId:$scope.pkRivalInfo.userId,
                    victory:true,
                    point:0,
                    experience:10,
                    classOrAll:$scope.pkMeInfo.classOrall
                });
            }


            //-----判断胜负结束


            $("#waitModal").modal("hide");
            $("#resultModal").modal({backdrop: 'static', keyboard: false});
            $scope.pking = false;
        }
    });




    //监听对手是否使用了道具
    //socket.on('prop message',function(data){
    //    console.log();//$scope
    //    socket.emit('challenge')
    //});

});