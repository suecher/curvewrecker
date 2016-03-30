/**
 * Created by SueCh on 2015/12/16.
 */
function mainInit()
{

    $("#containerTitle").addClass('animated bounceInLeft',function(){
        $("#containerTitle").show();
    });

    $("#containerUser").addClass('animated bounceInRight',function(){
        $("#containerUser").show();
        setTimeout(function(){
            $("#containerUser").removeClass('animated bounceInRight');
            $("#containerTitle").removeClass('animated bounceInLeft');
        },800);
    });


    //滑动设置
    $("#slidemain").swipe({
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            openPk();
        },
        swipeRight:function(event, direction, distance, duration, fingerCount) {
            openShop();
        }
    });



    //打开道具商店
    $("#btnMainLeft").click(function(){
        openShop();
    });


    function openShop(){
        $("#containerUser").addClass('animated bounceOutRight',function(){
            setTimeout(function(){
                $("#containerUser").hide();
                $("#containerShop").addClass('animated bounceInLeft',function(){
                    $("#containerShop").show();
                    setTimeout(function(){
                        $("#containerShop").removeClass('bounceInLeft');
                    },2000);
                    $(".shoppropdescribe").fitText(1.4);
                    shopInit();
                });

                $("#containerUser").removeClass("bounceInLeft");
                $("#containerUser").removeClass("bounceOutRight");


                setTimeout(function(){
                    $("#shoptitle").addClass("animated tada");
                },1000);

            },300);
        });
    }

    function openPk(){
        $("#containerUser").addClass('animated bounceOutLeft',function(){
            setTimeout(function(){
                $("#containerUser").hide();
                $("#containerAllPk").show(function(){
                    //$("#txtTrueName2").fitText();

                });

                $("#containerUser").removeClass("bounceOutLeft");

                allPkInit();

            },300);
        });
    }

    //打开对战面板
    $("#btnMainRight").click(function(){
        openPk();
    });

    $(".btnClassPk").click(function(){


        $("#containerUser").addClass('animated bounceOutDown',function(){
            setTimeout(function(){
                $("#containerUser").hide();
                $("#containerUser").removeClass("animated bounceOutDown");
            },800);
        });

        $("#containerTitle").addClass('animated bounceOut',function(){
            setTimeout(function(){
                $("#containerTitle").hide();
                $("#containerTitle").removeClass("animated bounceOut");
            },800);
        });

        setTimeout(function(){
            $("#containerPKWindow").addClass('bounceIn',function(){
                $("#containerPKWindow").show(200,function(){
                    //字体
                    $("#subjectPanle").fitText(2.4);
                    $("#subjectTitle").fitText(2.4);
                    Pkwindows();
                });
            });
        },1000);


    });
}
