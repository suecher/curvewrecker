/**
 * Created by SueCh on 2016/2/14.
 */


var UserController = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/adduser')
        .post(function(req,res){
            UserController.create(req.body,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/userbyid')
        .post(function(req,res){
            UserController.userbyid(req.body.userId,function(resultobj){
                res.json(resultobj);
            });
        });
};