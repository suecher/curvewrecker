#!/usr/bin/env node

var app = require('../app');
var config = require('../config/config.js');
app.listen(config.port,function(){
    console.log('app started,listening on port:',config.port);
});
