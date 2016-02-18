/**
 * Created by SueCh on 2016/2/18.
 */

module.exports = function(app){
    app.route('/webindex')
        .get(function(req,res){


            //模拟数据
            var user = {};
            user.user_id = "91e382ba-5626-453a-922e-6d2e5b6b10fd";
            user.real_name = "张洪学生";
            user.gender = "男";
            user.img_head_url =  "";
            user.current_points =  0;
            user.class_info = {
                "class_id": "a8363a15-06eb-4279-aab4-ffa7031d25c4",
                "class_name": "张洪的班"
            }

            res.send('这是web版本');
        })
        .post(function(req,res){

        });

    app.route('/mobile')
        .get(function(req,res){
            res.send('这是移动版本');
        })
        .post(function(req,res){

        });
};