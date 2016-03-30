/**
 * Created by SueCh on 2015/12/18.
 */

function Pkwindows(){

    $(".btnanswer").removeClass("animated swing");
    var time1;
    var itime = 0;
    var i = 0;
    $("#txtSubjectNumber").text("1/10");

    $("#subjectTitle").text('1 .词语：鼠目寸光、雪中送炭、事半功倍、腰缠万贯、名副其实的反义词，最恰当的一组是。');
    $(".btnanswer:eq(0)").text('A.胸怀大志 锦上添花 一箭双雕 一贫如洗');
    $(".btnanswer:eq(1)").text('B.目光远大 莫不关心 事倍功半 衣衫褴褛');
    $(".btnanswer:eq(2)").text('C.高瞻远瞩 锦上添花 事倍功半 一贫如洗');
    $(".btnanswer:eq(3)").text('D.高瞻远瞩 莫不关心 一箭双雕 衣衫褴褛');

    $("#Subjecttimer").text("00:00");

    time1 = setInterval(function(){
        itime++;
        $("#Subjecttimer").text("00:"+(30-itime));

        if(itime >= 30)
        {
            clearInterval(time1);
            $("#defeatedmodal").modal();
        }
    },1000);



    $("#btnquestionanalysis").click(function(){

        clearInterval(time1);
        i = 0;
        itime = 0;

        $("#victorymodal").modal('hide');
        $("#containerPKWindow").hide();
        $("#containerAnalyze").show();
        analyzeInit();
    });

    $("#btnquestionanalysis2").click(function(){

        clearInterval(time1);
        i = 0;
        itime = 0;


        $("#defeatedmodal").modal('hide');
        $("#containerPKWindow").hide();
        $("#containerAnalyze").show();
        analyzeInit();
    });

    $("#btnExit").click(function(){
        $("#exitmodal").modal();

        $("#btnOk").click(function(){
            $("#containerTitle").show();
            $("#containerUser").show();
            $("#containerPKWindow").hide();
            $("#btnOk").unbind("click");
            $("#exitmodal").modal('hide');

            clearInterval(time1);
            i = 0;
            itime = 0;
        });

        $("#btnNo").click(function(){
            $("#exitmodal").modal('hide');
        });


    });


    $(".btnanswer").click(function(){

        i++;
        $(this).removeClass("animated swing");
        if(i == 1)
        {
            $(this).addClass("animated swing",function(){
                setTimeout(function(){
                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
                        setTimeout(function(){
                            $("#subjectPanle").removeClass("animated bounceOutLeft");
                            $("#subjectTitle").text('选出下列加点字注音没有错误的一项:');
                            $(".btnanswer:eq(0)").text('A.  喧腾（xuān）嶙峋（xún）庸碌（rōng）藐小（miǎo）');
                            $(".btnanswer:eq(1)").text('B. 洗濯（zhuó）倔强（juè）堕落（zhuì）慷慨（kǎi）');
                            $(".btnanswer:eq(2)").text('C. 小憩（qì）  匀称（chèn）蹂躏（róu ）睥睨（pì）');
                            $(".btnanswer:eq(3)").text('D. 酝酿（liòng）澄清（chéng）清洌（liè）耸峙（zhì）');
                            $("#txtSubjectNumber").text("2/10");
                        },800);
                    });
                },800);
            });


        }
        else if(i == 2){

            $(this).addClass("animated swing",function(){
                setTimeout(function(){
                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
                        setTimeout(function(){
                            $("#subjectPanle").removeClass("animated bounceOutLeft");
                            $("#subjectTitle").text('选出下列各项中有错别字的一项是:');
                            $(".btnanswer:eq(0)").text('A. 海枯石烂、千姿百态、惊慌失措、历历在目 ');
                            $(".btnanswer:eq(1)").text('B. 黯然缥缈、苦心孤诣、恍然大悟、水波粼粼');
                            $(".btnanswer:eq(2)").text('C. 骇人听闻、诲人不倦、随声附和、莽莽榛榛');
                            $(".btnanswer:eq(3)").text('D. 踉踉跄跄、塞翁失马、爱慕虑荣、更胜一畴');
                            $("#txtSubjectNumber").text("3/10");
                        },800);
                    });
                },800);
            });
        }
        else  if(i == 3)
        {
            $(this).addClass("animated swing",function(){
                setTimeout(function(){
                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
                        setTimeout(function(){
                            $("#subjectPanle").removeClass("animated bounceOutLeft");
                            $("#subjectTitle").text('下列各项的加点词语解释不正确的一项是:');
                            $(".btnanswer:eq(0)").text('A．见山市人烟市肆（店铺）  思而不学则殆（有害）');
                            $(".btnanswer:eq(1)").text('B．相委而去（离开）        引弦而战（导引）    ');
                            $(".btnanswer:eq(2)").text('C.弥漫（充满、布满）   静谧（安静）     伶仃（孤独没有依靠）');
                            $(".btnanswer:eq(3)").text('D.头晕目眩（眼睛昏花） 匿笑（偷偷的笑） 滑稽（引人发笑）');
                            $("#txtSubjectNumber").text("4/10");
                        },800);
                    });
                },800);
            });
        }
        else if(i==4)
        {
            $("#victorymodal").modal();
            i = 0;
        }

        //$(this).addClass("animated swing",function(){
        //    setTimeout(function(){
        //        $("#subjectPanle").addClass("animated bounceOutLeft",function(){
        //            setTimeout(function(){
        //                $("#subjectPanle").removeClass("animated bounceOutLeft");
        //                $("#subjectTitle").text('选出下列加点字注音没有错误的一项:');
        //                $(".btnanswer:eq(0)").text('A.  喧腾（xuān）嶙峋（xún）庸碌（rōng）藐小（miǎo）');
        //                $(".btnanswer:eq(1)").text('B. 洗濯（zhuó）倔强（juè）堕落（zhuì）慷慨（kǎi）');
        //                $(".btnanswer:eq(2)").text('C. 小憩（qì）  匀称（chèn）蹂躏（róu ）睥睨（pì）');
        //                $(".btnanswer:eq(3)").text('D. 酝酿（liòng）澄清（chéng）清洌（liè）耸峙（zhì）');
        //                $("#txtSubjectNumber").text("2/10");
        //            },800);
        //        });
        //    },800);
        //});
    });
}

//$(document).ready(function(){
//    var i = 0;
//
//    $("#btnquestionanalysis").click(function(){
//         $("#victorymodal").modal('hide');
//        $("#containerPKWindow").hide();
//        $("#containerAnalyze").show();
//        analyzeInit();
//    });
//
//    $("#btnquestionanalysis2").click(function(){
//        $("#defeatedmodal").modal('hide');
//        $("#containerPKWindow").hide();
//        $("#containerAnalyze").show();
//        analyzeInit();
//    });
//
//    $("#btnExit").click(function(){
//        $("#exitmodal").modal();
//
//        $("#btnOk").click(function(){
//            $("#containerTitle").show();
//            $("#containerUser").show();
//            $("#containerPKWindow").hide();
//            $("#btnOk").unbind("click");
//            $("#exitmodal").modal('hide');
//        });
//
//        $("#btnNo").click(function(){
//            $("#exitmodal").modal('hide');
//        });
//    });
//
//
//    $(".btnanswer").click(function(){
//
//        i++;
//        $(this).removeClass("animated swing");
//        if(i == 1)
//        {
//            $(this).addClass("animated swing",function(){
//                setTimeout(function(){
//                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
//                        setTimeout(function(){
//                            $("#subjectPanle").removeClass("animated bounceOutLeft");
//                            $("#subjectTitle").text('选出下列加点字注音没有错误的一项:');
//                            $(".btnanswer:eq(0)").text('A.  喧腾（xuān）嶙峋（xún）庸碌（rōng）藐小（miǎo）');
//                            $(".btnanswer:eq(1)").text('B. 洗濯（zhuó）倔强（juè）堕落（zhuì）慷慨（kǎi）');
//                            $(".btnanswer:eq(2)").text('C. 小憩（qì）  匀称（chèn）蹂躏（róu ）睥睨（pì）');
//                            $(".btnanswer:eq(3)").text('D. 酝酿（liòng）澄清（chéng）清洌（liè）耸峙（zhì）');
//                            $("#txtSubjectNumber").text("2/10");
//                        },800);
//                    });
//                },800);
//            });
//        }
//        else if(i == 2){
//
//            $(this).addClass("animated swing",function(){
//                setTimeout(function(){
//                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
//                        setTimeout(function(){
//                            $("#subjectPanle").removeClass("animated bounceOutLeft");
//                            $("#subjectTitle").text('选出下列各项中有错别字的一项是:');
//                            $(".btnanswer:eq(0)").text('A. 海枯石烂、千姿百态、惊慌失措、历历在目 ');
//                            $(".btnanswer:eq(1)").text('B. 黯然缥缈、苦心孤诣、恍然大悟、水波粼粼');
//                            $(".btnanswer:eq(2)").text('C. 骇人听闻、诲人不倦、随声附和、莽莽榛榛');
//                            $(".btnanswer:eq(3)").text('D. 踉踉跄跄、塞翁失马、爱慕虑荣、更胜一畴');
//                            $("#txtSubjectNumber").text("3/10");
//                        },800);
//                    });
//                },800);
//            });
//        }
//        else  if(i == 3)
//        {
//            $(this).addClass("animated swing",function(){
//                setTimeout(function(){
//                    $("#subjectPanle").addClass("animated bounceOutLeft",function(){
//                        setTimeout(function(){
//                            $("#subjectPanle").removeClass("animated bounceOutLeft");
//                            $("#subjectTitle").text('下列各项的加点词语解释不正确的一项是:');
//                            $(".btnanswer:eq(0)").text('A．见山市人烟市肆（店铺）  思而不学则殆（有害）');
//                            $(".btnanswer:eq(1)").text('B．相委而去（离开）        引弦而战（导引）    ');
//                            $(".btnanswer:eq(2)").text('C.弥漫（充满、布满）   静谧（安静）     伶仃（孤独没有依靠）');
//                            $(".btnanswer:eq(3)").text('D.头晕目眩（眼睛昏花） 匿笑（偷偷的笑） 滑稽（引人发笑）');
//                            $("#txtSubjectNumber").text("4/10");
//                        },800);
//                    });
//                },800);
//            });
//        }
//        else if(i==4)
//        {
//            $("#victorymodal").modal();
//            i = 0;
//        }
//
//        //$(this).addClass("animated swing",function(){
//        //    setTimeout(function(){
//        //        $("#subjectPanle").addClass("animated bounceOutLeft",function(){
//        //            setTimeout(function(){
//        //                $("#subjectPanle").removeClass("animated bounceOutLeft");
//        //                $("#subjectTitle").text('选出下列加点字注音没有错误的一项:');
//        //                $(".btnanswer:eq(0)").text('A.  喧腾（xuān）嶙峋（xún）庸碌（rōng）藐小（miǎo）');
//        //                $(".btnanswer:eq(1)").text('B. 洗濯（zhuó）倔强（juè）堕落（zhuì）慷慨（kǎi）');
//        //                $(".btnanswer:eq(2)").text('C. 小憩（qì）  匀称（chèn）蹂躏（róu ）睥睨（pì）');
//        //                $(".btnanswer:eq(3)").text('D. 酝酿（liòng）澄清（chéng）清洌（liè）耸峙（zhì）');
//        //                $("#txtSubjectNumber").text("2/10");
//        //            },800);
//        //        });
//        //    },800);
//        //});
//    });
//});