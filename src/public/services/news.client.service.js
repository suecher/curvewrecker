/**
 * Created by SueCh on 2016/2/14.
 */
angular.module('webapp')
    .service("NewsService",["$http","$q",NewsService]);

function NewsService($http){
    function handleRequest(method,url,data){

    }
    return {
        list:function(params){},
        save:function(data){},
        detail:function(id){}
    }
}