/**
 * Created by lenovo1 on 2017/9/7.
 */
var cover = document.getElementsByClassName('cover')[0];
var commList = document.getElementsByClassName('commList')[0];
var closeComm = document.getElementsByClassName('closeComm')[0];
var cTable = commList.getElementsByClassName('cTable')[0];
var ths = cTable.getElementsByTagName('th');
var trs = cTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
var checkBoxs = cTable.getElementsByTagName('input');
var commButton = commList.getElementsByTagName('button')[0];
var addCommBody=document.getElementsByClassName('addlist')[0].getElementsByTagName('tbody')[0];
var newComm = document.getElementsByClassName('newComm');


newComm[0].onclick = function () {
    cover.style.display = 'block';
    commList.style.display = 'block';
    cover.style.height=window.screen.availHeight +'px';
    cover.style.width=document.body.offsetWidth+'px';
    // cover.style.top=document.body.scrollHeight+'px';
    // alert(document.body.offsetHeight);
}
newComm[1].onclick = function () {
        cover.style.display = 'block';
        commList.style.display = 'block';
        cover.style.height=window.screen.availHeight +'px';
        cover.style.width=document.body.offsetWidth+'px';
    // alert(document.body.offsetHeight);
}
closeComm.onclick = function () {
    // alert(1);
    // document.getElementsByClassName('commList')[0].getElementsByTagName('tbody')[0].innerHTML='';
    cover.style.display = 'none';
    commList.style.display = 'none';
}
for (var i = 0; i < ths.length; i++) {
    ths[i].index = i;
    ths[i].onmouseover = function () {
        ths[this.index].style.backgroundColor = '#E9F9FF';
    }
    ths[i].onmouseout = function () {
        ths[this.index].style.backgroundColor = '#F9FBFB';
    }
}


//选中商品按钮点击事件
function choseComm(){
    var chosedTr=[];
    var amModal=document.getElementsByClassName('am-modal');
    if(window.getComputedStyle(amModal[0]).display!='none'){
        var addlistImgs=document.getElementsByClassName('addlist')[0].getElementsByTagName('img');
        var addCommBody=document.getElementsByClassName('addlist')[0].getElementsByTagName('tbody')[0];
    }else{
        var addlistImgs=document.getElementsByClassName('addlist')[1].getElementsByTagName('img');
        var addCommBody=document.getElementsByClassName('addlist')[1].getElementsByTagName('tbody')[0];
    }

    // var addlistImgs=document.getElementsByClassName('addlist')[0].getElementsByTagName('img');
    // console.log(addlistImgs.length);
    for(var i=0;i<trs.length;i++){
        if(checkBoxs[i+1].checked){
            var chosedTd=trs[i].getElementsByTagName('td');
            chosedTr[chosedTr.length]=''+chosedTd[1].innerHTML+'-'+chosedTd[2].innerHTML+'-'+chosedTd[3].innerHTML+'-'+chosedTd[4].innerHTML.slice(1);
            var chosedTrMsg=chosedTr[chosedTr.length-1].split('-');
            // alert(addlistImgs.length);
            // addCommBody.innerHTML='';
            // if(addlistImgs.length<5){
            //     var showCommTr=addCommBody.getElementsByTagName('tr')[addlistImgs.length];
            //     // alert(addlistImgs.length);
            //     var showCommTd=showCommTr.getElementsByTagName('td');
            //     showCommTd[0].innerHTML=chosedTrMsg[0];
            //     showCommTd[1].innerHTML=chosedTrMsg[1];
            //     showCommTd[2].innerHTML=chosedTrMsg[2];
            //     var input1=document.createElement('input');
            //     input1.setAttribute('type','number');
            //     input1.setAttribute('class','commPrice');
            //     input1.value=Number(chosedTrMsg[3]);
            //     showCommTd[3].appendChild(input1);
            //     var input2=document.createElement('input');
            //     input2.setAttribute('type','number');
            //     // alert(input2.type);
            //     input2.setAttribute('class','commNum');
            //     input2.value=1;
            //     showCommTd[4].appendChild(input2);
            //     var commDelImg=document.createElement('img');
            //     commDelImg.setAttribute('src','img/删除.png');
            //     commDelImg.setAttribute('class','deleComm');
            //     showCommTd[5].appendChild(commDelImg);
            // }else{
                var newTr=document.createElement('tr');
                for(var j=0;j<6;j++){
                    var newTd=document.createElement('td');
                    if(j==3){
                        var newInput1=document.createElement('input');
                        newInput1.setAttribute('class','commPrice');
                        newInput1.setAttribute('type','number');
                        newInput1.value=Number(chosedTrMsg[3]);
                        newTd.appendChild(newInput1);
                    }else if(j==4){
                        var newInput2=document.createElement('input');
                        newInput2.setAttribute('class','commNum');
                        newInput2.setAttribute('type','number');
                        newInput2.value=1;
                        newTd.appendChild(newInput2);
                    }else if(j==5){
                        var newImg=document.createElement('img');
                        newImg.setAttribute('class','deleComm');
                        newImg.setAttribute('src','img/删除.png');

                        newTd.appendChild(newImg);
                    }else{
                        newTd.innerHTML=chosedTrMsg[j];
                    }
                    newTr.appendChild(newTd);
                }
                addCommBody.appendChild(newTr);
            }
        // }
    }
    var deleComm=document.getElementsByClassName('deleComm');
    // alert(deleComm.length);
    var commTrs=addCommBody.getElementsByTagName('tr');
    for(var i=0;i<deleComm.length;i++){
        deleComm[i].index=i;
        // alert(i);
        deleComm[i].onclick=function(){
            // alert(deleComm.length);
            //及其重要，保证删除元素后，后续元素下标均减1
            for(var j=this.index+1;j<deleComm.length;j++){
                deleComm[j].index-=1;
            }
            addCommBody.removeChild(commTrs[this.index]);
        }
    }
    cover.style.display='none';
    commList.style.display='none';
}
commButton.onclick = choseComm;





