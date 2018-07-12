function $(id){
    return document.getElementById(id);
}
function getXhr(){
    var xhr;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}
