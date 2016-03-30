/**
 * Created by SueCh on 2016/2/13.
 */
var config = null;

if(process && process.env && process.env.NODE_ENV){
    config = require('./env/' + process.env.NODE_ENV + '.js');
} else{
    config = require('./env/development.js');
}
module.exports = config;