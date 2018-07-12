<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/22
 * Time: 16:52
 */
$Cid=$_REQUEST['Cid'];
//连接数据库
require('00-init.php');
//创建sql语句
$sql="select * from shangpin where Cid='$Cid';";
$result=mysqli_query($conn,$sql);
$resArr=mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($resArr);