
function allPkInit()
{
    $("#btnAllPkLeft").click(function(){
        openMain();
    });


    $("#containerAllPk").swipe({

        swipeRight:function(event, direction, distance, duration, fingerCount) {
            openMain();
        }
    });

    function openMain(){
        $("#containerAllPk").addClass('animated bounceOutRight',function(){
            setTimeout(function(){
                $("#containerAllPk").hide();
                $("#containerUser").show();
                $("#containerAllPk").removeClass("bounceOutRight");
            },300);
        });
    };

    $("#btnonlinePk").click(function(){
        Pkwindows();
        $("#btnonlinePk").addClass("animated rubberBand");
        setTimeout(function(){
            $("#btnonlinePk").removeClass("animated rubberBand");
        },1000);

        $("#onlineText").text("查询中");


        var sti = 0;
        var selectTime = setInterval(function(){

            sti++;
            $("#onlineText").addClass("animated zoomIn");
            setTimeout(function(){
                $("#onlineText").removeClass("animated zoomIn");
            },500);

            if(sti == 3)
            {
                $("#containerAllPk").addClass("animated zoomOut");

                setTimeout(function(){
                    $("#containerAllPk").hide();
                    $("#containerTitle").hide();

                    $("#containerAllPk").removeClass("animated zoomOut");


                    $("#containerPKWindow").addClass("animated zoomInt",function(){
                        $("#containerPKWindow").show();

                        $("#subjectPanle").fitText(3.4);
                        $("#subjectTitle").fitText(3.4);

                        Pkwindows();

                    });

                    //setTimeout(function(){
                    //    $("#containerPKWindow").removeClass("animated zoomInt");
                    //    setTimeout(function(){
                    //
                    //    },1200);
                    //},1200);

                },1200);

                clearInterval(selectTime);
            }

        },1500);



        //setTimeout(function(){
        //    $("#onlineInfo").addClass("animated zoomOutDown");
        //},700);
        //$("#onlineInfo").removeClass("animated zoomOutDown");
        //
        //
        //$("#onlineText")
        //$("#onlineSelect").addClass("animated zoomIn");
        //
        //
        //setTimeout(function(){
        //    $("#onlineSelect").show();
        //},500);
        //
        //
        //$("#onlineSelect").removeClass("animated zoomIn");


    });
}


