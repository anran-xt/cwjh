<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/10
 * Time: 17:07
 */
//@$Ocode=$_REQUEST['Ocode'];
@$Ocode=$_REQUEST['Ocode'];
//连接数据库
require('00-init.php');
//创建sql语句
//echo($Ocode);
$sql="select Origin,payMoney,expreMoney,Oname,telphone,address,notes,commCode,commodity,spci,commPri,commNum from orderform where Ocode='$Ocode'";
$result=mysqli_query($conn,$sql);
if(($result)){
    $resultArr=mysqli_fetch_all($result,MYSQLI_ASSOC);
    echo json_encode($resultArr);
}else{
    echo $sql;
}

