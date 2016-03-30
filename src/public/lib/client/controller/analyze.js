/**
 * Created by SueCh on 2015/12/22.
 */
function analyzeInit()
{
    $(".textContent1").fitText(2.5);
    $("#subjectAnalyzeTitle").fitText(2.5);
    $(".Analyze").fitText(2.5);

    $("#btncloseparsing").click(function(){
        $("#containerAnalyze").hide();
        $("#containerUser").show();
        $("#containerTitle").show();
    });

}