/**
 * Created by lenovo1 on 2017/9/10.
 */
var xgbtn = document.getElementsByClassName('btn2')[0].getElementsByClassName('xiugai')[0];
var list = document.getElementById('doc-modal-2');
//存放Ocode
var spanOcode = list.getElementsByClassName('ocode')[0];
var close = list.getElementsByClassName('am-close')[0];//关闭修改页面
var Select = list.getElementsByTagName('select')[0];
var payMoney = list.getElementsByClassName('payMoney')[0];
var expreMoney = list.getElementsByClassName('expreMoney')[0];
var uname1 = document.getElementById('uname1');
var phone1 = document.getElementById('phone1');
var address1 = document.getElementById('address1');
var note1 = document.getElementById('note1');
//修改按钮
var xgButton = document.getElementById("doc-modal-2").getElementsByClassName('xiugai')[0];
var qxButton = document.getElementById("doc-modal-2").getElementsByClassName('quxiao')[0];


var orderBody = document.getElementById('orderBody');
var checkedbox = orderBody.getElementsByTagName('input');

function choseChecked() {
    for (var i = 0; i < checkedbox.length; i++) {
        if (checkedbox[i].checked) {
            return i;
        }
    }
}
xgbtn.onclick = function () {
    if(!(choseChecked()+1)){
        alert('请选中一个订单再修改！');
    }else{
        var oState=document.getElementById('orderBody').getElementsByClassName('mainTr')[choseChecked()].getElementsByClassName('oTime')[0].innerHTML;
        if (choseChecked() + 1&&oState=='待审核') {
            list.style.display = 'block'
            var Ocode = orderBody.getElementsByClassName('mainTr')[choseChecked()].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;

            //1.获取xhr对象
            var xhr = getXhr();

            //2.生成请求
            xhr.open('get', 'data/undate.php?Ocode=' + Ocode, true);
            //3.设置回调函数
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var result = JSON.parse(xhr.responseText)[0];
                    Select.getElementsByTagName('option')[result.Origin - 1].selected = true;
                    payMoney.value = result.payMoney;
                    expreMoney.value = result.expreMoney;
                    uname1.value = result.Oname;
                    phone1.value = result.telphone;
                    address1.value = result.address;
                    note1.value = result.notes;
                    // console.log(result.commCode);
                    // console.log(result.commodity);
                    // console.log(result.spci);
                    // console.log(result.commPri);
                    // console.log(result.commNum);

                    var commCode = result.commCode.split('-');
                    var commodity = result.commodity.split('-');
                    var spci = result.spci.split('-');
                    var commPri = result.commPri.split('-');
                    var commNum = result.commNum.split('-');
                    // 录入商品订单信息
                    var addlist = document.getElementsByClassName('addlist')[1];
                    var addlistImgs = addlist.getElementsByTagName('img');
                    var addCommBody = addlist.getElementsByTagName('tbody')[0];

                    //每次录入信息，先清空上一次的信息
                    var lengthImg = addlistImgs.length;
                    for (var w = 0; w < lengthImg; w++) {
                        console.log(w,addCommBody.getElementsByTagName('tr'));
                        var clearTr = addCommBody.getElementsByTagName('tr')[w>4?5:w];
                        var clearTd = clearTr.getElementsByTagName('td');
                        if (w > 4) {
                            addCommBody.removeChild(document.getElementById('orderFace2').getElementsByClassName('mb')[0].getElementsByTagName('tr')[5]);
                        }else{
                            for (var h = 0; h < clearTd.length; h++) {
                                clearTd[h].innerHTML = '';
                            }
                        }
                    }
                    console.log('清空后：' + addlistImgs.length);

                    for (var q = 0; q < commCode.length; q++) {
                        // if (addlistImgs.length < 5) {
                        //     console.log('小于5时' + q);
                        //     var showCommTr = addCommBody.getElementsByTagName('tr')[addlistImgs.length];
                        //     var showCommTd = showCommTr.getElementsByTagName('td');
                        //     showCommTd[0].innerHTML = commCode[q];
                        //     showCommTd[1].innerHTML = commodity[q];
                        //     showCommTd[2].innerHTML = spci[q];
                        //     var input1 = document.createElement('input');
                        //     input1.setAttribute('type', 'number');
                        //     input1.setAttribute('class', 'commPrice');
                        //     input1.value = Number(commPri[q]);
                        //     showCommTd[3].appendChild(input1);
                        //     var input2 = document.createElement('input');
                        //     input2.setAttribute('type', 'number');
                        //     // alert(input2.type);
                        //     input2.setAttribute('class', 'commNum');
                        //     input2.value = parseInt(commNum[q]);
                        //     showCommTd[4].appendChild(input2);
                        //     var commDelImg = document.createElement('img');
                        //     commDelImg.setAttribute('src', 'img/删除.png');
                        //     commDelImg.setAttribute('class', 'deleComm');
                        //     showCommTd[5].appendChild(commDelImg);
                        //
                        // } else {
                            console.log('大于5时' + q);
                            var newTr = document.createElement('tr');
                            for (var j = 0; j < 6; j++) {
                                var newTd = document.createElement('td');
                                if (j == 3) {
                                    var newInput1 = document.createElement('input');
                                    newInput1.setAttribute('class', 'commPrice');
                                    newInput1.setAttribute('type', 'number');
                                    newInput1.value = Number(commPri[q]);
                                    newTd.appendChild(newInput1);
                                } else if (j == 4) {
                                    var newInput2 = document.createElement('input');
                                    newInput2.setAttribute('class', 'commNum');
                                    newInput2.setAttribute('type', 'number');
                                    newInput2.value = parseInt(commNum[q]);
                                    newTd.appendChild(newInput2);
                                } else if (j == 5) {
                                    var newImg = document.createElement('img');
                                    newImg.setAttribute('class', 'deleComm');
                                    newImg.setAttribute('src', 'img/删除.png');
                                    newTd.appendChild(newImg);
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
                            }
                            addCommBody.appendChild(newTr);
                        }
                        var deleComm = addCommBody.getElementsByClassName('deleComm');
                        // alert(deleComm.length);
                        var commTrs = addCommBody.getElementsByTagName('tr');
                        for (var i = 0; i < deleComm.length; i++) {
                            deleComm[i].index = i;
                            // alert(i);
                            deleComm[i].onclick = function () {
                                // alert(deleComm.length);
                                //及其重要，保证删除元素后，后续元素下标均减1
                                for (var j = this.index + 1; j < deleComm.length; j++) {
                                    deleComm[j].index -= 1;
                                }
                                addCommBody.removeChild(commTrs[this.index]);
                            }
                        }
                    // }
                }
            }
            //4.发送请求
            xhr.send(null);
        }
        else if(choseChecked() + 1&&oState=='待发货'){
            alert('订单已被审核，无法修改，请联系厂家！');
        }else{
            alert('已发货，无法修改，请联系厂家！');
        }
    }

}
close.onclick = function () {
    window.location.href = 'order-of-goods.html';
}
qxButton.onclick = function () {
    window.location.href = 'order-of-goods.html';
}

//修改事件,向后台发送修改的数据
// var commButon=document.getElementsByClassName('commButon')[1].getElementsByTagName('button');
// alert(commButon.length);
function upDataOrder() {
    var Ocode = orderBody.getElementsByClassName('mainTr')[choseChecked()].getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;
    var OrderForm = document.getElementById('orderFace2');
    var addList = OrderForm.getElementsByClassName('addlist')[0].getElementsByClassName('mb')[0];

    var Select = OrderForm.getElementsByTagName('select')[0];
    var Origin = Select.getElementsByTagName('option')[Select.selectedIndex].value;

    var payMoney = OrderForm.getElementsByClassName('payMoney')[0].value;
    var expreMoney = OrderForm.getElementsByClassName('expreMoney')[0].value;
    var Oname = document.getElementById('uname1').value;
    var telphone = document.getElementById('phone1').value;
    var address = document.getElementById('address1').value;
    var notes = document.getElementById("note1").value;

    var Trs = addList.getElementsByTagName('tr');
    var commCode = '';
    var commdity = '';
    var spci = '';
    var commPri = '';
    var commNum = '';
    for (var i = 0; i < Trs.length; i++) {
        var Tds = Trs[i].getElementsByTagName('td');
        if (Tds[0].innerHTML) {
            commCode += '-' + Tds[0].innerHTML;
            commdity += '-' + Tds[1].innerHTML;
            spci += '-' + Tds[2].innerHTML;
            commPri += '-' + Tds[3].getElementsByTagName('input')[0].value;
            commNum += '-' + Tds[4].getElementsByTagName('input')[0].value;
        }
    }
    commCode = commCode.slice(1);
    commdity = commdity.slice(1);
    spci = spci.slice(1);
    commPri = commPri.slice(1);
    commNum = commNum.slice(1);

    var msg = "Origin=" + Origin + "&payMoney=" + payMoney + "&expreMoney=" + expreMoney + "&Oname=" + Oname + "&telphone=" + telphone +
        '&address=' + address + "&notes=" + notes + "&commCode=" + commCode + "&commdity=" + commdity + "&spci=" + spci +
        "&commPri=" + commPri + "&commNum=" + commNum + "&Ocode=" + Ocode;
    console.log(msg);
    if (payMoney && expreMoney && Oname && telphone && address && commCode && commdity && spci && commPri && commNum) {
        //1、获取xhr对象
        var xhr = getXhr();
        //2、创建请求
        xhr.open('post', 'data/addOrder.php', true);
        //3、设置回调函数
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                window.location.href = 'order-of-goods.html';
            }
        }
        //4、修改请求头
        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        //5、发送请求
        xhr.send(msg);
    } else {
        alert('订单信息不全,修改订单失败！');
    }
}
xgButton.onclick = upDataOrder;



