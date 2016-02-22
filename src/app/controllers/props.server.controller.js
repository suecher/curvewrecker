/**
 * Created by SueCh on 2016/2/14.
 */
var mongoose = require('mongoose');
var Props = mongoose.model('Props');


module.exports = {
    create:function(req,res,next){
        var props = new Props({
            Id:'1',
            propsName:'冰冻对手',
            propsDescription:'冰封对手5秒，使对手不能答题',
            point:50
        });

        props.save(function(err){
            if(err) return next(err);

            return res.json(props);
        })
    }
};