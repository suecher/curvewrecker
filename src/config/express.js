/**
 * Created by SueCh on 2016/2/13.
 */
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(){
    console.log('init express...');
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    //app.use(express.static(path.join(__dirname,'public')));

    //app.set('view engine','./views');
    //app.set('view engine','../views2');
    app.set('views', './../views');
    app.set('view engine','ejs');

    app.use(express.static("../public"));

    require('../app/routes/news.server.routes')(app);
    require('../app/routes/main.server.routes')(app);
    require('../app/routes/props.server.routes')(app);
    require('../app/routes/question.server.routes')(app);
    require('../app/routes/pkrecord.server.routes')(app);
    require('../app/routes/user.server.routes')(app);

    app.route('/testview').get(function(req,res){

        res.render('mobile',{title:'wwww'});
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
