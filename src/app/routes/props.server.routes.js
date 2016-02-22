/**
 * Created by SueCh on 2016/2/14.
 */

var propsController = require('../controllers/props.server.controller');

module.exports = function(app){
    app.route('/props')
        .get(propsController.create);
};