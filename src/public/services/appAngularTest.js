/**
 * Created by SueCh on 2016/2/15.
 */
angular.module('app',[])
    .factory('Data',function(){
        return {msg:'我来自factory'}
    })
.controller('FCtrl',function($scope,Data){
    $scope.data = Data;
})
.controller('SCtrl',function($scope){
    $scope.data = {msg:'我是第二个'}
});