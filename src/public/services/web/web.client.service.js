/**
 * Created by SueCh on 2016/2/19.
 */
angular.module('app',[])
.controller('MainCtrl',function($scope,$http){
    //$scope.test = 'Message';
    var currentUserInfo = {};
    currentUserInfo.userId = $("#UserId").text();
    currentUserInfo.points = $("#Points").text();
    currentUserInfo.experience = $("#Experience").text();
    currentUserInfo.classId = $("#ClassId").text();


    $scope.ngUserId = $("#UserId").text();
    $scope.ngPoints = $("#Points").text();
    $scope.ngExperience = $("#Experience").text();
    $scope.ngClassId = $("#ClassId").text();
    $scope.ngProps1 = $("#Props1").text();
    $scope.ngProps2 = $("#Props2").text();
    $scope.ngProps3 = $("#Props3").text();





    $("#pointModalPoint").text(currentUserInfo.points);
    $("#propModalPoint").text(currentUserInfo.points);


    //兑换积分
    $scope.exchangepoint = function(){

        $("#pointModal").modal();
    };

    $scope.exchangeprop = function(){
        $("#propModal").modal();
    };

    $scope.allPk = function(){
        //$("#resultModal").modal();
        $("#questionModal").modal();
    };

    $scope.classPk = function(){
        $("#pkModal").modal();
    };


    $scope.buyprop = function(propId)
    {

        $http.post('/buyprop/',{"userId":currentUserInfo.userId,"propId":propId})
        .success(function(data){
            switch (propId){
                case 1:
                    $scope.ngProps1 = parseInt($scope.ngProps1) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    break;
                case 2:
                    $scope.ngProps2 = parseInt($scope.ngProps2) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    break;
                case 3:
                    $scope.ngProps3 = parseInt($scope.ngProps3) + 1;
                    $scope.ngPoints = parseInt($scope.ngPoints) - 50;
                    break;
            }

            alert('购买道具成功');
        })
        .error(function(){
            alert('购买失败');
        });
    }
});