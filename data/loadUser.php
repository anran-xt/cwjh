<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/24
 * Time: 17:14
 */
require("00-init.php");
$sql="select uState,uName,uPwd from usertab;";
$result=mysqli_query($conn,$sql);
if($result){
    if(mysqli_fetch_row($result)){
        session_start();
        $uName=$_SESSION['uName'];
        $uState=$_SESSION['uState'];
//        Array_push($result,$uName);

//        var_dump($result) ;
        $result=json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));
        $result=substr($result,0,strlen($result)-1).',{"uName":"'.$uName."\",".'"uState":"'.$uState."\"}]";
        echo $result ;


    }else{
        echo "不存在用户！";
    }
}