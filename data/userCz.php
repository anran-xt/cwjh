<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/25
 * Time: 13:05
 */
$uName=$_REQUEST['uName'];
$ymmVal=$_REQUEST['ymmVal'];
$xmmVal=$_REQUEST['xmmVal'];
$uName=explode('：',$uName);
//var_dump($uName) ;
$uName=$uName[1];
require('00-init.php');
$sql="select * from usertab where uName='$uName' and uPwd='$ymmVal';";
//echo $sql;
$result=mysqli_query($conn,$sql);
if(mysqli_fetch_row($result)){
    $sql="update usertab set uPwd='$xmmVal' where uName='$uName';";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo 1;
    }else{
        echo "修改失败!";
    }
}else{
    echo "原密码错误!";
}

