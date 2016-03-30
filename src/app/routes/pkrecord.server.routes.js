/**
 * Created by SueCh on 2016/2/14.
 */


var PkRecordController = require('../controllers/pkrecord.server.controller');
var UserController = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/addpkrecord')
        .post(function(req,res){

            var clientrecord = {
                userId:req.body.userId,
                rivalId:req.body.userId.rivalId,
                victory:req.body.victory,
                point:req.body.point,
                experience:req.body.experience,
                classOrAll:req.body.classOrAll
            };



            PkRecordController.create(clientrecord,function(resultobj){
                if(resultobj.result){
                    UserController.reducepointAndexperience(clientrecord.userId,clientrecord.point,clientrecord.experience,function(userresultobj){
                        if(userresultobj.result){
                            res.json({result:true});
                        }else{
                            res.json({result:false,errorMessage:'修改积分经验出错'});
                        }
                    });
                }else{
                    res.json(resultobj);
                }
            });
        });
};