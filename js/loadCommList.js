/**
 * Created by lenovo1 on 2017/9/22.
 */
/**
 * Created by lenovo1 on 2017/9/20.
 */
//商品列表
var tabContainer=document.getElementsByClassName('tabContainer')[0];
var cTable = tabContainer.getElementsByClassName('cTable')[0];
// var ths = cTable.getElementsByTagName('th');

var checkBoxs = cTable.getElementsByTagName('input');

//所有商品
var commBody=tabContainer.getElementsByTagName('tbody')[0];
var trs=tabContainer.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
//界面切换
var pageTurn=tabContainer.getElementsByClassName('pageTurn')[0];
//前后切换
var turn=pageTurn.getElementsByClassName('turn')[0].getElementsByTagName('span');
var turnImg=pageTurn.getElementsByClassName('turn')[0].getElementsByTagName('img');
//控制条数显示
var detail=pageTurn.getElementsByClassName('detail')[0].getElementsByTagName('span');


//读取商品信息
function loadCommlist(currentPage,pageSize){
    //1.创建xhr对象
    var xhr=getXhr();
    //2.创建请求
    xhr.open('post','data/commList.php',true);
    //3.设置回调函数
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            // console.log(xhr.responseText);
            try{
                var resArr=JSON.parse(xhr.responseText);
            }catch(err){
                window.location.href='index.html';
            }
            // console.log(resArr);
            // document.getElementsByClassName('commList')[0].getElementsByTagName('tbody')[0]
            //读取最后一条信息
            // console.log(resArr[resArr.length - 1]);
            var pageMsg = JSON.parse(resArr[resArr.length - 1]);
            // console.log(pageMsg.uState);
            /*if(window.location.href=='http://127.0.0.1/commodity/commComand.html'){
                if(pageMsg.uState!=0){
                    window.location.href='index.html';
                }
            }*/
            for(var i=0;i<resArr.length-1;i++){
                var commTr=document.createElement('tr');
                // console.log(commTd[5]);
                for(var j=0;j<6;j++){
                    var commTd=document.createElement('td');
                    if(j===0){
                        var cInput=document.createElement('input');
                        cInput.type='checkbox';
                        commTd.appendChild(cInput);
                    }else if(j==4){
                        commTd.innerHTML='￥'+resArr[i][3];
                    }else{
                        commTd.innerHTML=resArr[i][j-1];
                    }
                    commTr.appendChild(commTd);
                }
                commBody.appendChild(commTr);
            }

            currentPage = pageMsg.currentPage;
            var prePage = pageMsg.prePage;
            var nextPage = pageMsg.nextPage;
            var totalPage = pageMsg.totalPage;
            var totalItem = pageMsg.totalItem;
            var uName=pageMsg.uName;
            var uState=pageMsg.uState;
            //录入用户信息
            var yhm = document.getElementsByClassName('header')[0].getElementsByClassName('name1')[0].getElementsByTagName('a')[0];
            if (uState== 0) {
                yhm.innerHTML = '超级管理员：'+uName;

            }

            detail[0].innerHTML='共'+totalItem+'条';
            detail[1].innerHTML=totalPage+'页';

            //显示当前所在页数
            turn[2].innerHTML = currentPage;
            //上下切换按钮事件
            for (var i = 0; i < turnImg.length; i++) {
                var cPageSize=pageTurn.getElementsByClassName('detail')[0].getElementsByTagName('input')[0].value;
                turnImg[i].index = i;
                turnImg[i].onclick = function () {
                    // console.log(cPageSize);
                    if (this.index == 0) {
                        if(prePage!=currentPage){
                            //重新加载数据时，将之前的清空
                            commBody.innerHTML = '';
                            loadCommlist(1, cPageSize);
                        }
                    } else if (this.index == 1) {
                        if(prePage!=currentPage){
                            commBody.innerHTML = '';
                            loadCommlist(prePage, cPageSize);
                        }
                    } else if (this.index == 2) {
                        if(nextPage!=currentPage){
                            commBody.innerHTML = '';
                            loadCommlist(nextPage, cPageSize);
                        }
                    } else if (this.index == 3) {
                        if(nextPage!=currentPage){
                            commBody.innerHTML = '';
                            loadCommlist(totalPage, cPageSize);
                        }
                    }
                }
            }
            //显示条数的onkeydown事件
            var showInput=pageTurn.getElementsByClassName('detail')[0].getElementsByTagName('input')[0];
            showInput.onkeyup=function(){
                if(showInput.value>0){
                    commBody.innerHTML = '';
                    loadCommlist(1,showInput.value);
                }
            }

            //每一行的鼠标移入移出、点击事件
            for (var i = 0; i < trs.length; i++) {
                trs[i].index = i;
                trs[i].onmouseover = function () {
                    // alert(this.style.backgroundColor);
                    if (this.style.backgroundColor != 'rgb(157, 221, 255)') {
                        trs[this.index].style.backgroundColor = '#E9F9FF';
                    }
                }
                trs[i].onclick = function () {
                    // alert(String(this.style.backgroundColor)=='rgb(233, 249, 255)');
                    // alert('rgb(233, 249, 255)');有空格！！！
                    if (checkBoxs[this.index + 1].checked == false) {
                        // alert(this.style.backgroundColor);
                        checkBoxs[this.index + 1].checked = true;
                        trs[this.index].style.backgroundColor = '#9DDDFF';
                    } else {
                        checkBoxs[this.index + 1].checked = false;
                        trs[this.index].style.backgroundColor = '#FFF';
                    }
                }
                trs[i].onmouseout = function () {
                    if (this.style.backgroundColor != 'rgb(157, 221, 255)') {
                        trs[this.index].style.backgroundColor = '#FFF';
                    }
                }
            }
            //复选框的点击事件
            function choseChecked(){
                for (var j = 1; j < checkBoxs.length; j++) {
                    if (checkBoxs[0].checked) {
                        checkBoxs[j].checked = true;
                        trs[j-1].style.backgroundColor = '#9DDDFF';
                    } else {
                        checkBoxs[j].checked = false;
                        trs[j-1].style.backgroundColor = '#FFF';
                    }
                }
            }

            //单个复选框选中事件
            for (var i = 0; i < checkBoxs.length; i++) {
                checkBoxs[i].index = i;
                if (i == 0) {
                    checkBoxs[i].onclick = choseChecked;//不是立即调用不加括号
                } else {
                    checkBoxs[i].onclick = function (event) {
                        window.event.cancelBubble = true;
                        if (checkBoxs[this.index].checked) {
                            trs[this.index - 1].style.backgroundColor = '#9DDDFF';
                        } else {
                            trs[this.index - 1].style.backgroundColor = '#FFF';
                        }
                    }
                }
            }



        }
    }
    //4.修改请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    //5.发送请求数据
    var msg = 'currentPage=' + currentPage + '&pageSize=' + pageSize;
    xhr.send(msg);
}
loadCommlist(1,10);


var add=tabContainer.getElementsByClassName('add')[0];
var addInput=add.getElementsByTagName('input');
var alertMsg=add.getElementsByTagName('img');
var addBtn=add.getElementsByTagName('button')[0];
//添加/修改商品
addBtn.onclick=function(){
    if(document.getElementsByClassName('header')[0].getElementsByClassName('name1')[0].getElementsByTagName('a')[0].innerHTML!='用户名'){
        //获取填写的商品信息
        var Cid=addInput[0].value;
        var Cname=addInput[1].value;
        var speci=addInput[2].value;
        var price=addInput[3].value;
        var unit=addInput[4].value;
        var Index=add.getElementsByClassName('Index')[0].innerHTML;
        if(Cid&&Cname&&speci&&price&&unit){
            //1.获取xhr对象
            var xhr=getXhr();
            //2.创建请求
            xhr.open('post','data/mutiComm.php',true);
            //3.设置回调函数
            xhr.onreadystatechange=function(){
                if(xhr.readyState==4&&xhr.status==200){
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                    window.location.href='commComand.html';
                }
            }
            //4.修改请求头
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
            //5.发送请求
            var msg='Index='+Index+'&Cid='+Cid+'&Cname='+Cname+'&speci='+speci+'&price='+price+'&unit='+unit;
            console.log(msg);
            xhr.send(msg);
        }
    }

}

//修改商品信息
//修改按钮点击，，修改Index
function getXg(){
    var xgIndex=[];
    for(var i=1;i<checkBoxs.length;i++){
        if(checkBoxs[i].checked){
            // return i-1;
            xgIndex[xgIndex.length]=i-1;
        }
    }
    return xgIndex;
}
var xgBtn=tabContainer.getElementsByClassName('right')[0].getElementsByTagName('button')[0];
xgBtn.onclick=function(){
    if(getXg().length!=0){
        add.getElementsByClassName('Index')[0].innerHTML=2;
        // console.log(trs[getXg()]);
        var Cid=trs[getXg()[0]].getElementsByTagName('td')[1].innerHTML;
        //1.获取xhr对象
        var xhr=getXhr();
        //2.创建请求
        xhr.open('post','data/mutiXg.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                // console.log(xhr.responseText);
                var resArr=JSON.parse(xhr.responseText);
                // console.log(resArr);
                // console.log(resArr[0]);
                addInput[0].value=resArr[0]['Cid'];
                addInput[0].setAttribute('disabled',true);
                addInput[1].value=resArr[0]['Cname'];
                addInput[2].value=resArr[0]['speci'];
                addInput[3].value=resArr[0]['price'];
                addInput[4].value=resArr[0]['unit'];
            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //5.发送请求
        var msg='Cid='+Cid;
        // console.log(msg);
        xhr.send(msg);
    }else{
        alert('请至少选择一项商品进行修改！');
    }
}

//删除商品
var scBtn=tabContainer.getElementsByClassName('right')[0].getElementsByTagName('button')[1];
scBtn.onclick=function(){
    if(getXg().length!=0){
        var Cid=[];
        for(var i=0;i<getXg().length;i++){
            Cid[i]=trs[getXg()[i]].getElementsByTagName('td')[1].innerHTML;
        }
        //1.获取xhr对象
        var xhr=getXhr();
        //2.创建请求
        xhr.open('post','data/mutiComm.php',true);
        //3.设置回调函数
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4&&xhr.status==200){
                console.log(xhr.responseText);
                alert(xhr.responseText);
                window.location.href='commComand.html';
            }
        }
        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //5.发送请求
        var msg='Index=3'+'&Cid='+Cid;
        console.log(msg);
        xhr.send(msg);
    }else{
        alert('请至少选中一项删除！');
    }
}
