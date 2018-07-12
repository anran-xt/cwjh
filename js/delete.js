/**
 * Created by lenovo1 on 2017/9/20.
 */
//选中删除事件
var scbtn=document.getElementsByClassName('btn2')[0].getElementsByClassName('shanchu')[0];
scbtn.onclick=function(){
    var checkBox=document.getElementById('orderBody').getElementsByTagName('input');
    var Ocode=[];
    for(var i=0;i<checkBox.length;i++){
        if(checkBox[i].checked){
            Ocode[Ocode.length]=document.getElementById('orderBody').getElementsByClassName('mainTr')[i].getElementsByTagName('span')[0].innerHTML;
        }
    }
    if(Ocode.length!=0){
        //1.获取xhr对象
        var xhr=getXhr();
        //2.创建请求
        xhr.open('post','data/delete.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                location.reload();
                console.log(xhr.responseText);
            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
        //5.发送请求
        var msg='Ocode='+Ocode;
        xhr.send(msg);
        console.log(msg);
    }else{
        alert('请至少选中一个订单!');
    }

}
