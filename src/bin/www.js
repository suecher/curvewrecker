#!/usr/bin/env node

var app = require('../app');
var config = require('../config/config.js');
app.listen(config.port,function(){
    console.log('app started,listening on port:','192.168.31.131',config.port);
});
