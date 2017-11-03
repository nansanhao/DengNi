//接下来使用数据库储存留言数据
var count=0;
$(".subbtn").click(function(){
    var text= $(".content").text();
    var time=getCurrentTime();
    if(text==""){
        alert("您还没有输入任何内容！");
    }
    else{
        loadmessage(text,'zipple',time);
        count++;
        console.log('success!');
        $(".content").text("");
        $(".numofmessage").text("留言("+count+")");
    }
})
function loadmessage(message,id,time){
    //创建content_index
    //包含img.name + mainInfo
    //.userId .conInfo .time
    var contentDiv='<div class="content_1">';
    contentDiv+='<img class="name" src="../img/pic01.jpg" alt="photo">';
    contentDiv+='<div class="mainInfo">'
    contentDiv+=' <div class="userId"><a href="#">';
    contentDiv+=id;
    contentDiv+='</a></div> <div class="conInfo">';
    contentDiv+=message;
    contentDiv+='</div> <div class="time">';
    contentDiv+=time;
    contentDiv+='</div> </div> </div>'
    $(".msgFrame").prepend(contentDiv);
}
function getCurrentTime(){
    var today=new Date();
    var y=today.getFullYear();
    var mh=today.getMonth();
    mh++;
    var d=today.getDate();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m=checkTime(m)
    s=checkTime(s)
    var time=y+"-"+mh+"-"+d+"  "+h+":"+m+":"+s;
    return time;
}
function checkTime(i){
    if(i<10)
        i="0"+i
    return i
}
