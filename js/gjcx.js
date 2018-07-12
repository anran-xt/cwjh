/**
 * Created by lenovo1 on 2017/9/26.
 */
var gjcx=document.getElementsByClassName('gjcx')[0];
var cxInput=gjcx.getElementsByTagName('input');
// console.log(cxInput.length);
var cxBtn=document.getElementsByClassName('btn1')[0]
var cxSelect=gjcx.getElementsByTagName('select')[0];
function gjcxFunc(currentPage,pageSize){
    // console.log(cxSelect.selectedIndex);
    var orderTime1=cxInput[0].value;
    var orderTime2=cxInput[1].value;
    var sendTime1=cxInput[2].value;
    var sendTime2=cxInput[3].value;
    var Ocode=cxInput[4].value;
    var origin=cxSelect.selectedIndex;
    // console.log(orderTime1);
    // console.log(orderTime2);
    // console.log(sendTime1);
    // console.log(sendTime2);
    // console.log(Ocode);
    // console.log(origin);
    if(orderTime1!=''&&orderTime2==''||orderTime1==''&&orderTime2!=''||sendTime1==''&&sendTime2!=''||sendTime2==''&&sendTime1!=''){
        alert('信息不全!');
    }else{
        //1.获取xhr对象
        var xhr=getXhr();
        //2.生成请求
        xhr.open('post','data/gjcx.php',true)
        //3.设置回调函数
        // xhr.onreadystatechange=function(){
        //     if(xhr.readyState==4&&xhr.status==200){
        //         console.log(xhr.responseText);
        //     }
        // }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                if(xhr.responseText==0){
                    alert('没有满足条件的订单!');
                }else{
                    // console.log(xhr.responseText);
                    var resArr = JSON.parse(xhr.responseText);
                    // console.log(resArr);
                    //获取换页元素
                    var pageTurn = document.getElementsByClassName('list')[0].getElementsByClassName('pageTurn')[0];
                    //换页
                    var turn = pageTurn.getElementsByClassName('turn')[0];
                    //第一页、上一页、下一页、尾页
                    var pageTurnImg = turn.getElementsByTagName('img');
                    //当前页数
                    var nowPage = turn.getElementsByClassName('nowPage')[0];
                    //每页显示信息
                    var detail = pageTurn.getElementsByClassName('detail')[0];
                    //显示条数和页数
                    var pageShow = detail.getElementsByTagName('span');
                    pageSize = detail.getElementsByTagName('input')[0].value;
                    //分页信息
                    //需要再次解析最后一条数据！！
                    var pageMsg = JSON.parse(resArr[resArr.length - 1]);
                    // console.log(pageMsg);
                    currentPage = pageMsg.currentPage;
                    var prePage = pageMsg.prePage;
                    var nextPage = pageMsg.nextPage;
                    var totalPage = pageMsg.totalPage;
                    var totalItem = pageMsg.totalItem;
                    // console.log(prePage, currentPage, nextPage);
                    pageShow[0].innerHTML = '共' + totalItem + '条';
                    pageShow[1].innerHTML = totalPage + '页';
                    //显示当前所在页数
                    nowPage.innerHTML = currentPage;
                    for (var i = 0; i < pageTurnImg.length; i++) {
                        pageTurnImg[i].index = i;
                        pageTurnImg[i].onclick = function () {
                            // pageSize=detail.getElementsByTagName('input')[0].value;
                            // console.log('in');
                            if (this.index == 0) {
                                if (prePage != currentPage) {
                                    document.getElementById('orderBody').innerHTML = '';
                                    gjcxFunc(1, pageSize);
                                }
                            } else if (this.index == 1) {
                                if (prePage != currentPage) {
                                    document.getElementById('orderBody').innerHTML = '';
                                    gjcxFunc(prePage, pageSize);
                                }
                            } else if (this.index == 2) {
                                if (nextPage != currentPage) {
                                    document.getElementById('orderBody').innerHTML = '';
                                    gjcxFunc(nextPage, pageSize);
                                }
                            } else if (this.index == 3) {
                                if (nextPage != currentPage) {
                                    document.getElementById('orderBody').innerHTML = '';
                                    gjcxFunc(totalPage, pageSize);
                                }
                            }
                        }
                    }
                    //查询事件
                    // for (var i = 0; i < sjcx.length; i++) {
                    //     sjcx[i].index = i;
                    //     sjcx[i].onclick = function (event) {
                    //         gjcxFunc(1, 500);
                    //     }
                    // }
                    // for (var j = 0; j < ztcx.length; j++) {
                    //     ztcx[j].index = j;
                    //     ztcx[j].onclick = function () {
                    //         gjcxFunc(1, 500);
                    //     }
                    // }

                    pageShow[2].getElementsByTagName('input')[0].onkeyup = function () {
                        pageSize = document.getElementsByClassName('pageTurn')[0].getElementsByTagName('input')[0].value;
                        if (pageSize > 0) {
                            document.getElementById('orderBody').innerHTML = '';
                            currentPage = 1;
                            // console.log(currentPage,pageSize);
                            gjcxFunc(currentPage, pageSize);
                        }
                    }
                    if (prePage == nextPage) {
                        pageShow.innerHTML = prePage;
                    } else {
                        pageShow = prePage + 1;
                    }
                    var date = new Date();
                    document.getElementById('orderBody').innerHTML = '';
                    //遮罩层
                    var cover = document.getElementsByClassName('cover')[0];
                    //订单详情显示层
                    var ddxq = cover.getElementsByClassName('ddxq')[0];
                    var orderBody = document.getElementById('orderBody');
                    for (var i = 0; i < resArr.length - 1; i++) {
                        // console.log(i);
                        var resTr = resArr[i];
                        // console.log(resTr);
                        var outTab = document.getElementsByClassName('outTab')[0];
                        var orderBody = document.getElementById('orderBody');
                        var Thead = outTab.getElementsByTagName('tr')[0].getElementsByTagName('td');
                        var Tr = [];
                        Tr[i] = document.createElement('tr');
                        Tr[i].index = i;
                        Tr[i].setAttribute('class', 'mainTr');
                        var allMainTr = document.getElementsByClassName('mainTr');
                        var allSideTr = document.getElementsByClassName('sideTr');

                        var Td = [];
                        Td[0] = document.createElement('td');
                        Td[0].innerHTML = '<input type="checkbox">' + (i + 1);
                        Tr[i].appendChild(Td[0]);
                        var k = 0;
                        for (var j = 1; j < Thead.length - 1; j++, k++) {
                            Td[j] = document.createElement('td');
                            if (j == 1) {
                                var origStorm;
                                if (resTr[k + 1] == 1) {
                                    origStorm = '鲜诱惑食品微信公众号';
                                } else if (resTr[k + 1] == 2) {
                                    origStorm = '鲜诱惑食品(线下)';
                                } else if (resTr[k + 1] == 3) {
                                    origStorm = '鲜诱惑食品旗舰店';
                                }
                                Td[j].innerHTML = '<a class="oDetail"><span>' + resTr[k] + '</span></a>' + '<div class="orig">' + origStorm + '</div>';
                                k++;
                                ///////////////////////////////////


                            } else if (j == 2) {
                                Td[j].setAttribute('class', 'oTime');
                                if (resTr[k] == 1) {
                                    Td[j].innerHTML = '待审核';
                                    k++;
                                } else if (resTr[k] == 2) {
                                    Td[j].innerHTML = "待发货";
                                    k++;
                                } else if (resTr[k] == 3) {
                                    Td[j].innerHTML = "已发货" + "<div>" + resTr[k + 1] + "</div>";
                                    k++;
                                }
                            } else if (j == 3) {
                                Td[j].setAttribute('class', 'oTime');
                                Td[j].innerHTML = resTr[k];
                            } else if (j == 5) {
                                Td[j].innerHTML = '<div>' + resTr[k] + '</div>';
                            } else if (j == 7) {
                                Td[j].innerHTML = '<div>' + resTr[k] + '</div>';
                            } else {
                                Td[j].innerHTML = resTr[k];
                            }
                            Tr[i].appendChild(Td[j]);
                        }

                        Td[Thead.length - 1] = document.createElement('td');
                        var Span = document.createElement('span');
                        Span.setAttribute('class', 'zhankai');
                        Td[Thead.length - 1].appendChild(Span);
                        Tr[i].appendChild(Td[Thead.length - 1]);

                        orderBody.appendChild(Tr[i]);
                        var oMsg = [];
                        var cMsg = [];
                        var cIndex = 0;
                        //由于新增的两个exprNum与payMoney
                        // k=k+3;
                        k++;
                        // console.log(resTr[k+1]);
                        while (resTr[k]) {
                            // console.log(resTr[k]);
                            oMsg[oMsg.length] = resTr[k];
                            k++;
                            // console.log(oMsg[oMsg.length - 1]);
                            cMsg[cIndex] = oMsg[oMsg.length - 1].split('-');
                            cIndex++;
                        }
                        var sTr = document.createElement('tr');
                        sTr.setAttribute('class', 'sideTr');
                        var sTd = document.createElement('td');
                        sTd.setAttribute('colspan', 9);
                        var iTable = document.createElement('table');
                        iTable.setAttribute('class', 'innerTab');
                        var totalMon = 0;
                        for (var k = 0; k < cMsg[0].length; k++) {
                            var iTr = document.createElement('tr');
                            for (var j = 0; j < cMsg.length; j++) {
                                var iTd = document.createElement('td');
                                if (j == 3) {
                                    iTd.innerHTML = '￥' + (parseFloat(cMsg[j][k] * parseInt(cMsg[j + 1][k])).toFixed(2));
                                    totalMon += Number(parseFloat(cMsg[j][k] * parseInt(cMsg[j + 1][k])).toFixed(2));
                                } else if (j == 4) {
                                    iTd.innerHTML = cMsg[j][k] + '包';
                                } else {
                                    iTd.innerHTML = cMsg[j][k];
                                }
                                iTr.appendChild(iTd);
                            }
                            iTable.appendChild(iTr);
                        }
                        var lastTr = document.createElement('tr');
                        var lastTd = document.createElement('td');
                        lastTd.setAttribute('colspan', 5);
                        lastTd.setAttribute('class', 'totalMon');
                        lastTd.innerHTML = '总金额：￥' + totalMon.toFixed(2);
                        lastTr.appendChild(lastTd);
                        iTable.appendChild(lastTr);

                        sTd.appendChild(iTable);
                        sTr.appendChild(sTd);
                        orderBody.appendChild(sTr);

                        //每一行的移入移除事件
                        var checkboxs = outTab.getElementsByTagName('input');
                        if (i % 2 == 0) {
                            Tr[i].setAttribute('style', 'background:#f7f7f7');
                            Tr[i].onmouseover = function () {
                                if (checkboxs[this.index].checked == false) {
                                    allMainTr[this.index].setAttribute('style', 'background:lightpink');
                                    allSideTr[this.index].getElementsByTagName('td')[0].setAttribute('style', 'background:#B0C4DE');
                                }
                            }
                            Tr[i].onmouseout = function () {
                                if (checkboxs[this.index].checked == false) {
                                    allMainTr[this.index].setAttribute('style', 'background:#f7f7f7');
                                    allSideTr[this.index].getElementsByTagName('td')[0].setAttribute('style', 'background:');
                                }

                            }
                        } else {
                            Tr[i].onmouseover = function () {
                                if (checkboxs[this.index].checked == false) {
                                    allMainTr[this.index].setAttribute('style', 'background:lightpink');
                                    allSideTr[this.index].getElementsByTagName('td')[0].setAttribute('style', 'background:#B0C4DE');
                                }
                            }
                            Tr[i].onmouseout = function () {
                                if (checkboxs[this.index].checked == false) {
                                    allMainTr[this.index].setAttribute('style', 'background:');
                                    allSideTr[this.index].getElementsByTagName('td')[0].setAttribute('style', 'background:');
                                }
                            }
                        }

                        //选中事件

                        for (var k = 0; k < checkboxs.length; k++) {
                            checkboxs[k].index = k;
                            checkboxs[k].onclick = function (event) {
                                window.event.cancelBubble = true;
                                if (checkboxs[this.index].checked) {
                                    allMainTr[this.index].style.backgroundColor = 'pink';
                                } else {
                                    allMainTr[this.index].style.backgroundColor = '';
                                }
                            }
                        }


                        //下拉事件
                        var zhankai = document.getElementsByClassName('zhankai');
                        var innerTab = document.getElementsByClassName('innerTab');
                        for (var m = 0; m < zhankai.length; m++) {
                            zhankai[m].index = m;
                            zhankai[m].onclick = function () {
                                if (this.index == 0) {
                                    if (window.getComputedStyle(zhankai[0]).borderBottomColor == 'rgba(0, 0, 0, 0)') {
                                        zhankai[0].style.borderTopColor = 'transparent';
                                        zhankai[0].style.borderBottomColor = 'gray';
                                        for (var j = 0; j < zhankai.length - 1; j++) {
                                            // console.log(window.getComputedStyle(zhankai[0]).borderBottomColor=='rgba(0, 0, 0, 0)');
                                            innerTab[j].style.display = 'table';
                                            zhankai[j + 1].style.borderTopColor = 'transparent';
                                            zhankai[j + 1].style.borderBottomColor = 'gray';
                                        }
                                    }
                                    else {
                                        // console.log(j);
                                        zhankai[0].style.borderTopColor = 'gray';
                                        zhankai[0].style.borderBottomColor = 'transparent';
                                        for (var j = 0; j < zhankai.length - 1; j++) {
                                            innerTab[j].style.display = 'none';
                                            zhankai[j + 1].style.borderTopColor = 'gray';
                                            zhankai[j + 1].style.borderBottomColor = 'transparent';
                                        }
                                    }
                                } else {
                                    if (window.getComputedStyle(innerTab[this.index - 1]).display == 'none') {
                                        innerTab[this.index - 1].style.display = 'table';
                                        zhankai[this.index].style.borderTopColor = 'transparent';
                                        zhankai[this.index].style.borderBottomColor = 'gray';
                                    } else {
                                        innerTab[this.index - 1].style.display = 'none';
                                        zhankai[this.index].style.borderTopColor = 'gray';
                                        zhankai[this.index].style.borderBottomColor = 'transparent';
                                    }
                                }
                            }
                        }


                        //为订单号添加点击事件
                        var Ocade = (orderBody.getElementsByTagName('a'));
                        Ocade[i].index = i;
                        Ocade[i].onclick = function () {
                            var resTr=resArr[this.index];
                            cover.style.display = 'block';
                            ddxq.style.display = 'block';
                            cover.style.height = window.screen.availHeight + 'px';
                            cover.style.width = document.body.offsetWidth + 'px';
                            var Ocode=ddxq.getElementsByClassName('Ocode')[0];
                            var oStatus=ddxq.getElementsByClassName('oStatus')[0];
                            var orderTime=ddxq.getElementsByClassName('orderTime')[0];
                            var orderSendTime=ddxq.getElementsByClassName('orderSendTime')[0];
                            var exprNum=ddxq.getElementsByClassName('exprNum')[0];
                            var payMon=ddxq.getElementsByClassName('payMon')[0];
                            var exprMon=ddxq.getElementsByClassName('exprMon')[0];
                            var oName=ddxq.getElementsByClassName('oName')[0];
                            var oTel=ddxq.getElementsByClassName('oTel')[0];
                            var oAddress=ddxq.getElementsByClassName('oAddress')[0];
                            var notes=ddxq.getElementsByClassName('notes')[0];
                            var mb=ddxq.getElementsByClassName('mb')[0];
                            Ocode.innerHTML=resTr[0];
                            if(resTr[2]==1){
                                oStatus.innerHTML='待审核';
                            }else if(resTr[2]==2){
                                oStatus.innerHTML='待发货';
                            }else if(resTr[2]==3){
                                oStatus.innerHTML='已发货';
                            }
                            orderTime.innerHTML=resTr[4];
                            orderSendTime.innerHTML=resTr[3];
                            // exprNum.innerHTML=0;!!
                            exprNum.innerHTML=resTr[9]
                            payMon.innerHTML='￥'+resTr[10];
                            exprMon.innerHTML='￥'+resTr[11];
                            oName.innerHTML=resTr[5];
                            oTel.innerHTML=resTr[7];
                            oAddress.innerHTML=resTr[6];
                            notes.innerHTML=resTr[8];


                            var commCode = resArr[this.index][13].split('-');
                            var commodity = resArr[this.index][12].split('-');
                            var spci = resArr[this.index][14].split('-');
                            var commPri = resArr[this.index][15].split('-');
                            var commNum = resArr[this.index][16].split('-');
                            // console.log(commCode);
                            // console.log(commodity);
                            // console.log(spci);
                            // console.log(commPri);
                            // console.log(commNum);

                            //
                            var orderBody=document.getElementsByClassName('ddxq')[0].getElementsByClassName('mb')[0];
                            // console.log(orderBody);
                            // console.log(commCode.length);
                            // console.log(commCode);
                            orderBody.innerHTML='';
                            for (var q = 0; q < commCode.length; q++) {
                                // if (commCode.length < 6) {
                                //     console.log('小于6时' + q);
                                //     var showCommTr = orderBody.getElementsByTagName('tr')[q];
                                //     var showCommTd = showCommTr.getElementsByTagName('td');
                                //     console.log(showCommTd);
                                //     showCommTd[0].innerHTML = commCode[q];
                                //     showCommTd[1].innerHTML = commodity[q];
                                //     showCommTd[2].innerHTML = spci[q];
                                //     showCommTd[3].innerHTML = '￥'+commPri[q];
                                //     showCommTd[4].innerHTML =  commNum[q];
                                //
                                // } else {
                                //     console.log('大于6时' + q);
                                var newTr = document.createElement('tr');
                                for (var j = 0; j < 5; j++) {
                                    var newTd = document.createElement('td');
                                    if (j == 3) {
                                        newTd.innerHTML=commPri[q];
                                    } else if (j == 4) {

                                        newTd.innerHTML=commNum[q];
                                    } else {
                                        if (j == 0) {
                                            newTd.innerHTML = commCode[q];
                                        } else if (j == 1) {
                                            newTd.innerHTML = commodity[q];
                                        } else if (j == 2) {
                                            newTd.innerHTML = spci[q];
                                        }
                                    }
                                    newTr.appendChild(newTd);
                                    // console.log(newTr);
                                }
                                orderBody.appendChild(newTr);
                            }
                            // }





                        }

                        //关闭订单详情界面
                        var close= document.getElementsByClassName('ddxq')[0].getElementsByClassName('am-close')[0];
                        close.onclick=function(){
                            // alert('in');
                            cover.style.display='none';
                            ddxq.style.display='none';
                        }


                    }

                }
                var refresh = document.getElementsByClassName('btn2')[0].getElementsByClassName('shuaxin')[0];


                refresh.onclick = function () {
                    location.reload();
                }
                }

        }

        //4.修改请求头
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        //5.发送请求
        var msg='orderTime1='+orderTime1+'&orderTime2='+orderTime2+'&sendTime1='+sendTime1+'&sendTime2='+sendTime2+'&Ocode='+Ocode+'&origin='+origin+'&currentPage=1&pageSize=10';
        // console.log(msg);
        xhr.send(msg);
    }
}
cxBtn.onclick=function(){
    gjcxFunc(1,500);
}