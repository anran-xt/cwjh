<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/11
 * Time: 8:27
 */
//接收请求数据
$uname=$_REQUEST['uname'];
$paw=$_REQUEST['paw'];
//$uname='panjiang';
//$paw='abc123';
//连接数据库
require('00-init.php');
//创建sql语句
$sql="select uName,uState from usertab where uName='$uname'and uPwd='$paw';";
$result=mysqli_query($conn,$sql);
$msg=mysqli_fetch_row($result);
if($msg){
    //初始session
    session_start();
    //存储信息到session
    $_SESSION['uName']=$msg[0];
    $_SESSION['uState']=$msg[1];
//    echo $_SESSION['uName'];
//    echo $_SESSION['uState'];
    $msgArr=[$msg[0],$msg[1]];
    echo json_encode($msgArr);

}else{
    echo 0;
}


