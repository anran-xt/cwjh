/**
 * Created by lenovo1 on 2017/9/8.
 */
var commButon=document.getElementsByClassName('commButon')[0].getElementsByTagName('button');
var cover = document.getElementsByClassName('cover')[0];
var commList = document.getElementsByClassName('commList')[0];
// alert(commButon.length);
function addNewList(){
    var OrderForm=document.getElementById('orderFace');
    var addList=OrderForm.getElementsByClassName('addlist')[0].getElementsByClassName('mb')[0];
    var Select=OrderForm.getElementsByTagName('select')[0];
    var Origin=Select.getElementsByTagName('option')[Select.selectedIndex].value;
// console.log(Origin);
    var payMoney=OrderForm.getElementsByClassName('payMoney')[0].value;
    var expreMoney=OrderForm.getElementsByClassName('expreMoney')[0].value;
    var Oname=document.getElementById('uname0').value;
    var telphone=document.getElementById('phone0').value;
    var address=document.getElementById('address0').value;
    var notes=document.getElementById("note0").value;

    var Trs=addList.getElementsByTagName('tr');
    var commCode='';
    var commdity='';
    var spci='';
    var commPri='';
    var commNum='';
    for(var i=0;i<Trs.length;i++){
        var Tds=Trs[i].getElementsByTagName('td');
        if(Tds[0].innerHTML){
            commCode+='-'+Tds[0].innerHTML;
            commdity+='-'+Tds[1].innerHTML;
            spci+='-'+Tds[2].innerHTML;
            commPri+='-'+Tds[3].getElementsByTagName('input')[0].value;
            commNum+='-'+Tds[4].getElementsByTagName('input')[0].value;
        }
    }
    commCode=commCode.slice(1);
    commdity=commdity.slice(1);
    spci=spci.slice(1);
    commPri=commPri.slice(1);
    commNum=commNum.slice(1);

    var msg="Origin="+Origin+"&payMoney="+payMoney+"&expreMoney="+expreMoney+"&Oname="+Oname+"&telphone="+telphone+
            '&address='+address+"&notes="+notes+"&commCode="+commCode+"&commdity="+commdity+"&spci="+spci+
            "&commPri="+commPri+"&commNum="+commNum;
    // console.log(msg);
    if(payMoney&&expreMoney&&Oname&&telphone&&address&&commCode&&commdity&&spci&&commPri&&commNum){
        //1、获取xhr对象
        var xhr=getXhr();
        //2、创建请求
        xhr.open('post','data/addOrder.php',true);
        //3、设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){

                location.reload();
                // alert(xhr.responseText);
            }
        }
        //4、修改请求头
        xhr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded");
        //5、发送请求
        xhr.send(msg);
    }else{
        alert('订单信息不全,生成订单失败！');
    }
}
commButon[0].onclick=addNewList;
commButon[1].onclick=function(){
    location.reload();
}



