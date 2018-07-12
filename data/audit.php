<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/20
 * Time: 16:41
 */
$Ocode=$_REQUEST['Ocode'];
$Index=$_REQUEST['Index'];
if(strpos($Ocode,',')){
    $Ocode=explode(',',$Ocode);
}
//生成发货时间
$OsendTime=date('Y-m-d H:i', time() + 6 * 60 * 60);
//连接数据库
require('00-init.php');
//创建sql语句
if(count($Ocode)==1){
    if($Index==3){
        $sql="update orderform set Ostatus=$Index,OsendTime='$OsendTime'  where Ocode='$Ocode';";
    }else if($Index==2){
        $sql="update orderform set Ostatus=$Index  where Ocode='$Ocode';";
    }
    $result=mysqli_query($conn,$sql);
}else{
    for($i=0;$i<count($Ocode);$i++){
        if($Index==3){
            $sql="update orderform set Ostatus=$Index,OsendTime='$OsendTime'  where Ocode='$Ocode[$i]';";
        }else if($Index==2){
            $sql="update orderform set Ostatus=$Index  where Ocode='$Ocode[$i]';";
        }
        $result=mysqli_query($conn,$sql);
    }
}


if($result){
    echo 1;
}else{
    echo 0;
}

