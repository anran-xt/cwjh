/**
 * Created by lenovo1 on 2017/9/24.
 */


//新增用户
var gnq=document.getElementsByClassName('tbd')[0].getElementsByClassName('gnq')[0];
var xzValue=gnq.getElementsByTagName('input');
var uName=xzValue[0];
var uPwd=xzValue[1];
var qPwd=xzValue[2];
var xzLx=gnq.getElementsByTagName('select')[0];
var xzLxOp=xzLx.getElementsByTagName('option');
var xzBtn=gnq.getElementsByClassName('xzBtn')[0];
//新增用户事件
xzBtn.onclick=function(){
    if(document.getElementsByClassName('header')[0].getElementsByClassName('name1')[0].getElementsByTagName('a')[0].innerHTML=='用户名'){
        window.location.href='index.html';
    }
    if(uName.value&&uPwd.value==qPwd.value&&uPwd!=''&&xzLxOp[xzLx.selectedIndex].value&&uPwd.value.length>5){
        // alert('1');
        var xhr=getXhr();
        xhr.open('post','data/userMuti.php',true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                if(xhr.responseText==1){
                    alert('添加成功!');
                    window.location.href='dsCommand.html';
                }else{
                    alert(xhr.responseText);
                }
            }
        }
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        console.log(xzLxOp);
        var msg='uState='+xzLxOp[xzLx.selectedIndex].value+'&uName='+xzValue[0].value+'&uPwd='+xzValue[1].value+'&Index=1';
        console.log(msg);
        xhr.send(msg);
    }else if(!(uPwd.value&&qPwd.value&&xzLxOp[xzLx.selectedIndex].value)){
        alert('信息不全!');
    }else if(uPwd.value!=qPwd.value){
        alert('两次密码不一致!');
    }else if(uPwd.value.length<6){
        alert('密码长度小于6!');
    }

}

//删除用户
var yhBody = document.getElementsByClassName('yhBody')[0];
var dsBody = yhBody.getElementsByClassName('ds')[0].getElementsByTagName('tbody')[0];
var cjBody = yhBody.getElementsByClassName('cj')[0].getElementsByTagName('tbody')[0];
var dsInput=dsBody.getElementsByTagName('input');
var dsTr=dsBody.getElementsByTagName('tr');
var cjInput=cjBody.getElementsByTagName('input');
var cjTr=cjBody.getElementsByTagName('tr');
var scBtn=document.getElementsByClassName('gnq')[0].getElementsByClassName('sc')[0].getElementsByTagName('button')[0];
scBtn.onclick=function(){
    if(document.getElementsByClassName('header')[0].getElementsByClassName('name1')[0].getElementsByTagName('a')[0].innerHTML=='用户名'){
        window.location.href='index.html';
    }
    var uName=[];
    for(var i=0;i<dsTr.length;i++){
        if(dsInput[i].checked){
            uName[uName.length]=dsTr[i].getElementsByTagName('td')[1].innerHTML;
        }
    }
    for(var i=0;i<cjTr.length;i++){
        if(cjInput[i].checked){
            uName[uName.length]=cjTr[i].getElementsByTagName('td')[1].innerHTML;
        }
    }
    if(uName.length){
        var xhr=getXhr();
        xhr.open('post','data/userMuti.php',true);
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                alert(xhr.responseText);
                window.location.href='dsCommand.html';
            }
        }
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        var msg='uName='+uName+'&Index=2';
        xhr.send(msg);
    }else{
        alert('请至少选择一个用户删除!');
    }
}
