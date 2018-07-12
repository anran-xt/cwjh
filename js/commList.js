/**
 * Created by lenovo1 on 2017/9/20.
 */
//商品列表
var commList=document.getElementsByClassName('commList')[0];
var cTable = commList.getElementsByClassName('cTable')[0];
// var ths = cTable.getElementsByTagName('th');

var checkBoxs = cTable.getElementsByTagName('input');
//搜索框
var cSearch=commList.getElementsByClassName('cSearch')[0].getElementsByTagName('input')[0];
//所有商品
var commBody=commList.getElementsByTagName('tbody')[0];
var trs=commList.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
//界面切换
var pageTurn=commList.getElementsByClassName('pageTurn')[0];
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
            var resArr=JSON.parse(xhr.responseText);
            // console.log(resArr);
            // document.getElementsByClassName('commList')[0].getElementsByTagName('tbody')[0]
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
            //读取最后一条信息
            var pageMsg = JSON.parse(resArr[resArr.length - 1]);
            currentPage = pageMsg.currentPage;
            var prePage = pageMsg.prePage;
            var nextPage = pageMsg.nextPage;
            var totalPage = pageMsg.totalPage;
            var totalItem = pageMsg.totalItem;

            detail[0].innerHTML='共'+totalItem+'条';
            detail[1].innerHTML=totalPage+'页';

            //显示当前所在页数
            turn[2].innerHTML = currentPage;
            //上下切换按钮事件
            for (var i = 0; i < turnImg.length; i++) {
                var cPageSize=pageTurn.getElementsByClassName('detail')[0].getElementsByTagName('input')[0].value;
                turnImg[i].index = i;
                turnImg[i].onclick = function () {
                    console.log(cPageSize);
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

