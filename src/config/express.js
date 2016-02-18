/**
 * Created by SueCh on 2016/2/13.
 */
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(){
    console.log('init express...');
    var app = express();
    app.use(bodyParser.json());
    app.use(express.static("./public"));

    app.set('view engine','./views');
    app.set("view engine","ejs");

    require('../app/routes/news.server.routes')(app);
    require('../app/routes/main.server.routes')(app);



    app.route('/test')
        .get(function(req,res,next){
            //res.sendfile('public/indexAngular.html');
            res.render('index',{title:'Express'});
            //res.json();

        })
        .post(function(req,res,next){
            res.send("index post message...");
            res.sendfile('indexpost.html');
        });


    app.route('/testview').get(function(req,res){
        res.sendfile('../view/viewtest.html');
    });

    app.use(function(req,res,next){
        res.status(404);
        try{
            return res.json('Not Found');
        }
        catch(e) {
            console.error('');
        }
    });

    app.use(function(err,req,res,next){
       if(!err) { return next()}
        res.status(500);
        try{
            return res.json(err.message || 'server error');
        }  catch(e){
            console.error('500 set header after sent')
        }
    });

    return app;
};
