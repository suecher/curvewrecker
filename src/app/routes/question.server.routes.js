/**
 * Created by SueCh on 2016/2/27.
 */

var interface = require('../../config/platform.interface.js');
var async = require('async');
var request = require('request');
var UserController = require('../controllers/user.server.controller');

module.exports = function(app){
    app.route('/question')
        .post(function(req,res,next){
            var pkinfo = req.body;

            interface.questionlist(pkinfo,function(resultobj){
                res.json(resultobj);
            });
        });

    app.route('/getclass')
        .post(function(req,res){
            var classId = req.body.classId;
            interface.classlist(classId,function(resultobj){
                res.json(resultobj);
            });
        });
};