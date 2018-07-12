/**
 * Created by lenovo1 on 2017/9/11.
 */
var uname=document.getElementsByClassName('zh')[0].getElementsByTagName('input')[0];
var paw=document.getElementsByClassName('zh')[1].getElementsByTagName('input')[0];
var btn=document.getElementsByClassName('dl')[0].getElementsByTagName('input')[0];
var alertWord=document.getElementsByTagName('span')[0];
btn.onclick=function(){
    if(uname.value&&paw.value){
        //1.获取xhr对象
        var xhr=getXhr();
        //2.创建请求
        xhr.open('post','data/login.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                var result=xhr.responseText;
                // console.log(result);
                if(result!=0){
                    var resMsg=JSON.parse(result);
                    // console.log(resMsg);
                    // console.log(resMsg[0]);
                    // console.log(resMsg[1]);
                    if(resMsg[1]==0){
                        window.location.href='home.html';
                    }else if(resMsg[1]==1){
                        window.location.href='orderGoods.html';
                    }else if(resMsg[1]==2){
                        window.location.href='commandOrder.html';
                    }

                }else{
                    alertWord.innerHTML="登录名或密码有误！"
                }

            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //5.发送请求
        var msg='uname='+uname.value+'&paw='+paw.value;
        xhr.send(msg);
    }else{
        alertWord.innerHTML="用户名和密码不能为空";
    }

}
