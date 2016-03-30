/**
 * Created by SueCh on 2015/12/18.
 */


function shopInit()
{
    $("#shopmodal").on('shown.bs.modal', function () {
        $("#txtmodalpropName").fitText(0.7);
    });

    $("#btnShopRight").click(function(){
        slideShopRight();
    });

    //滑动
    $("#containerShop").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            slideShopRight();
        }
    });

    function  slideShopRight(){
        $("#containerShop").addClass('animated bounceOutLeft',function(){
            setTimeout(function(){
                $("#containerShop").hide();
                $("#containerShop").removeClass('bounceOutLeft');


                $("#containerUser").addClass('animated bounceInRight',function(){
                    $("#containerUser").show();
                    setTimeout(function(){
                        $("#containerUser").removeClass('bounceInRight');
                    },2000);
                });

                $("#containerShop").removeClass('bounceInLeft');
                $("#containerShop").removeClass('bounceOutLeft');

            },600);

        });
    }


    $("#btnBugyProp1").click(function(){
        $("#shopmodal").modal();

        $("#btnOkProp").click(function(){
            $("#currentPoint").text($("#currentPoint").text() - 50);
            $("#prop1Num").text(parseInt($("#prop1Num").text())+1);
            $("#btnOkProp").unbind("click");
            $("#shopmodal").modal("hide");

        });

        $("#btnNoProp").click(function(){
            $("#btnNoProp").unbind("click");
            $("#shopmodal").modal("hide");
        });
    });

    $("#btnBugyProp2").click(function(){


        $("#shopmodal").modal();

        $("#btnOkProp").click(function(){
            $("#currentPoint").text($("#currentPoint").text() - 50);
            $("#prop2Num").text(parseInt($("#prop2Num").text())+1);
            $("#btnOkProp").unbind("click");
            $("#shopmodal").modal("hide");

        });

        $("#btnNoProp").click(function(){
            $("#btnNoProp").unbind("click");
            $("#shopmodal").modal("hide");
        });

    });

    $("#btnBugyProp3").click(function(){

        $("#shopmodal").modal();

        $("#btnOkProp").click(function(){
            $("#currentPoint").text($("#currentPoint").text() - 50);
            $("#prop3Num").text(parseInt($("#prop3Num").text())+1);
            $("#btnOkProp").unbind("click");
            $("#shopmodal").modal("hide");

        });

        $("#btnNoProp").click(function(){
            $("#btnNoProp").unbind("click");
            $("#shopmodal").modal("hide");
        });


    });
};