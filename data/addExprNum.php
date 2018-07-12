<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/25
 * Time: 15:48
 */
//接受数据
$Ocode=$_REQUEST['Ocode'];
$exprNum=$_REQUEST['exprNum'];
require('00-init.php');
$sql="update orderform set exprNum='$exprNum' where Ocode='$Ocode';";
$result=mysqli_query($conn,$sql);
if($result){
    echo 1;
}else{
    echo 0;
}