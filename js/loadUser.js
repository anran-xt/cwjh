/**
 * Created by lenovo1 on 2017/9/24.
 */
var userName = document.getElementsByClassName('name1')[0].getElementsByTagName('li')[0].getElementsByTagName('a')[0];
var yhBody = document.getElementsByClassName('yhBody')[0];
var dsBody = yhBody.getElementsByClassName('ds')[0].getElementsByTagName('tbody')[0];
var cjBody = yhBody.getElementsByClassName('cj')[0].getElementsByTagName('tbody')[0];
function loadUser() {
    var xhr = getXhr();
    xhr.open('get', 'data/loadUser.php', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log(xhr.responseText);
            // console.log(JSON.parse(xhr.responseText));
            try{
                var resArr = JSON.parse(xhr.responseText);

            }catch(err) {
                window.location.href='index.html';
            }

            // console.log(userName);

            // console.log(resArr[resArr.length - 1]);
            // alert(resArr[resArr.length - 1].uState);
            if (resArr[resArr.length - 1].uState == 0) {
                userName.innerHTML = "超级管理员：" + resArr[resArr.length - 1].uName;
                // console.log(userName);
                for (var i = 0; i < resArr.length - 1; i++) {
                    var resMsg = resArr[i];
                    var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    var inpu = document.createElement('input');
                    inpu.setAttribute('type', 'checkbox');
                    td1.appendChild(inpu);
                    tr.appendChild(td1);
                    var td2 = document.createElement('td');
                    td2.innerHTML = resMsg.uName;
                    tr.appendChild(td2);
                    var td3 = document.createElement('td');
                    td3.innerHTML = resMsg.uPwd;
                    tr.appendChild(td3);
                    if (resMsg.uState==1) {
                        dsBody.appendChild(tr);
                        // alert('in');
                    }else if(resMsg.uState==2){
                        cjBody.appendChild(tr);
                    }
                }
                var dsInput=dsBody.getElementsByTagName('input');
                var dsTr=dsBody.getElementsByTagName('tr');
                for(var j=0;j<dsInput.length;j++){
                    dsInput[j].index=j;
                    dsInput[j].onclick=function(){
                        if(!dsTr[this.index].style.backgroundColor){
                            dsTr[this.index].style.backgroundColor='lightblue';
                        }else{
                            dsTr[this.index].style.backgroundColor='';
                        }
                    }
                }

                var cjInput=cjBody.getElementsByTagName('input');
                var cjTr=cjBody.getElementsByTagName('tr');
                for(var j=0;j<cjInput.length;j++){
                    cjInput[j].index=j;
                    cjInput[j].onclick=function(){
                        if(!cjTr[this.index].style.backgroundColor){
                            cjTr[this.index].style.backgroundColor='lightblue';
                        }else{
                            cjTr[this.index].style.backgroundColor='';
                        }
                    }
                }
            }else{
                window.location.href='index.html';
            }
        }

    }
    xhr.send(null);
}
loadUser()