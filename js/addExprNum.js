/**
 * Created by lenovo1 on 2017/9/25.
 */
var cover = document.getElementsByClassName('cover')[0];
var kddhBtn=document.getElementsByClassName('kddh')[0];
var orderBody=document.getElementById('orderBody');
var oCheckBox=orderBody.getElementsByTagName('input');
var orderTr=orderBody.getElementsByClassName('mainTr');
//添加快递单号区域块
var addExprNum=document.getElementsByClassName('addExprNum')[0];
var exprNum=addExprNum.getElementsByTagName('input')[0];
var qrBtn=addExprNum.getElementsByClassName('qr')[0];
var qxBtn=addExprNum.getElementsByClassName('qx')[0];
//寻找选中项
function findChosed(){
    for(var i=0;i<oCheckBox.length;i++){
        if(oCheckBox[i].checked){
            return i;
        }
    }
}
//显示添加快递单号界面
kddhBtn.onclick=function(){
    if(findChosed()+1){
        cover.style.display = 'block';
        addExprNum.style.display = 'block';
        cover.style.height=window.screen.availHeight +'px';
        cover.style.width=document.body.offsetWidth+'px';
    }else{
        alert('请选中一项订单!');
    }
}
//取消按钮事件
qxBtn.onclick=function(){
    cover.style.display = 'none';
    addExprNum.style.display = 'none';
}
qrBtn.onclick=function(){
    exprNum=exprNum.value;
    var Ocode=orderTr[findChosed()].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
    var msg='exprNum='+exprNum+'&Ocode='+Ocode;
    var xhr=getXhr();
    xhr.open('post','data/addExprNum.php',true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            console.log(xhr.responseText);
            if(xhr.responseText==1){
                alert('添加快递单号成功!');
                location.reload();
            }else{
                alert('添加失败!');
            }
        }
    }
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(msg);
    console.log(msg);

}




