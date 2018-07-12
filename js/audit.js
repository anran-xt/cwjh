/**
 * Created by lenovo1 on 2017/9/20.
 */
var orderBody=document.getElementById('orderBody');
var mainTr=orderBody.getElementsByClassName('mainTr');
var checkBox=orderBody.getElementsByTagName('input');
var shenhe=document.getElementsByClassName('shenhe')[0];
var yifahuo=document.getElementsByClassName('yifahuo')[0];

function chosedCheck() {
    var arr=[];
    for (var i = 0; i < checkBox.length; i++) {
        if (checkBox[i].checked) {
            arr[arr.length]=i;
        }
    }
    return arr;
}

shenhe.onclick=function(){
    if(chosedCheck().length){
        var index=2;
        var choseArr=chosedCheck();
        console.log(choseArr);
        var codeArr=[];
        for(var i=0;i<choseArr.length;i++){
            codeArr[codeArr.length]=mainTr[choseArr[i]].getElementsByTagName('span')[0].innerHTML;
        }
        //1.获取xhr对象
        var xhr=getXhr();
        //2.生成请求
        xhr.open('post','data/audit.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                // console.log(xhr.responseText);
                if(xhr.responseText){
                    location.reload();
                }
            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        var msg='Ocode='+codeArr+'&Index='+index;
        //5.发送请求
        console.log(msg);
        xhr.send(msg);
    }
    else{
        alert('请至少选中一个订单！');
    }
}
yifahuo.onclick=function(){
    if(chosedCheck().length){
        var index=3;
        var choseArr=chosedCheck();
        var codeArr=[]
        for(var i=0;i<choseArr.length;i++){
            codeArr[codeArr.length]=mainTr[choseArr[i]].getElementsByTagName('span')[0].innerHTML;
        }
        //1.获取xhr对象
        var xhr=getXhr();
        //2.生成请求
        xhr.open('post','data/audit.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                // console.log(xhr.responseText);
                if(xhr.responseText){
                    location.reload();
                }
            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        var msg='Ocode='+codeArr+'&Index='+index;
        //5.发送请求
        console.log(msg);
        xhr.send(msg);
    }
    else{
        alert('请至少选中一个订单！');
    }

}



