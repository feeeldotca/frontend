var trade_input, indext;
//var table_40='{ "name":"table 40","description":"External tapered threads for rigid metal conduit<br> (See Rule 12-1006.)","cols": 4,"col1_title":"Trade size of conduit","col2_title":"Number of threads per 25.4 mm","col3_title":"Length of thread, Minimum, mm","col4_title":"Length of thread, Maximum, mm","trade_size":["16","21","27","35","41","53","63","78","91","103","129","155"],"threads_per_inch":[14,14,11.5,11.5,11.5,11.5,8,8,8,8,8,8],"thread_length":[[16.3,16.5,20.6,21.3,21.8,22.6,33.5,34.5,36.3,37.6,40.4,43.2],[19.8,20.1,24.9,25.7,26.2,26.9,39.9,41.4,42.7,43.9,46.7,49.5]]}';
/* var table40 = $.getJSON("table40.json", function(){
    console.log("success");
})*/
let reader = new FileReader();
var t40=reader.readAsText("table40.json");
const table40 = JSON.parse(JSON.stringify("../table40.json"));
console.log(typeof(table40));
console.log(table40);
var result=table40.responseJSON;//JSON.parse(table40);

//var result1=result.replace(/\r?\n|\r/g,"");
function update(){
    trade_input = $("#tradeinput").val();

    indext=result["trade_size"].indexOf(trade_input);
    if(indext!=-1){
        $("#tsiz").text(result.trade_size[indext]);
        $("#numth").text(result.threads_per_inch[indext]);
        $("#minth").text(result.thread_length[0][indext]);
        $("#maxth").text(result.thread_length[1][indext]);
        $("#warning").text("");
    }
    else{
        $("#tsiz").text("");
        $("#numth").text("");
        $("#minth").text("");
        $("#maxth").text("");
        $("#warning").text("Please enter a correct conduit trade size in Metric unit!")
    }
}