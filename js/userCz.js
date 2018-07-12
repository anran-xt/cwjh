/**
 * Created by lenovo1 on 2017/9/25.
 */
var xgMm=document.getElementsByClassName('subname')[0].getElementsByTagName('a')[0];
var cover= document.getElementsByClassName('cover')[0];
var updateKey=document.getElementsByClassName('cover')[0].getElementsByClassName('updateKey')[0];
var ymm=updateKey.getElementsByClassName('ymm')[0];
var xmm=updateKey.getElementsByClassName('xmm')[0];
var qrmm=updateKey.getElementsByClassName('qrmm')[0];
var qr=updateKey.getElementsByClassName('qr')[0];
var qx=updateKey.getElementsByClassName('qx')[0];
//显示修改框
xgMm.onclick=function(){
    cover.style.display = 'block';
    updateKey.style.display = 'block';
    cover.style.height=window.screen.availHeight +'px';
    cover.style.width=document.body.offsetWidth+'px';
}
//取消按钮
qx.onclick=function(){
    cover.style.display = 'none';
    updateKey.style.display = 'none';
}
//确认按钮
qr.onclick=function(){
    //获取提交给后台的数据
    var uName = document.getElementsByClassName('name1')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0].innerHTML;
    var ymmVal=ymm.value;
    var xmmVal=xmm.value;
    var qrmmVal=qrmm.value;
    if(!ymmVal||!xmmVal||!qrmmVal){
        alert('信息不全!');
    }else if(xmmVal!=qrmmVal){
        alert('两次密码不一致!');
    }else if(xmmVal.length<6){
        alert('密码长度小于6!');
    }else{
        var xhr=getXhr();
        xhr.open('post','data/userCz.php',true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(xhr.responseText==1){
                    alert("修改成功,请重新登录!");
                    location.href='index.html';
                }else{
                    alert(xhr.responseText);
                }
            }
        }
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        var msg='uName='+uName+'&ymmVal='+ymmVal+'&xmmVal='+xmmVal;
        xhr.send(msg);
    }
}

