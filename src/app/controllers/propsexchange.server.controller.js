/**
 * Created by SueCh on 2016/2/14.
 */

var mongoose = require('mongoose');
var PropsExchange = mongoose.model('PropsExchange');

module.exports = {
    create:function(_propsexchange,next){
        var propsexchange = new PropsExchange({
            userId:_propsexchange.userId,
            propsId:_propsexchange.propsId,
            point:_propsexchange.point
        });


        propsexchange.save(function(err){
            console.log('save status:',err ? 'failed:'+err.message:'success');
        });

    }
};