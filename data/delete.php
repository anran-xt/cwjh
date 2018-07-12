<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/20
 * Time: 8:46
 */
//接受发送数据
$Ocode=$_REQUEST['Ocode'];
if(strpos($Ocode,',')){
    $Ocode=explode(',',$Ocode);
}
var_dump($Ocode);
//连接到数据库
require('00-init.php');
//创建sql语句

for($i=0;$i<count($Ocode);$i++){
    if(count($Ocode)==1){
        $sql="delete from orderform where Ocode='$Ocode';";
    }
    else{
        $sql="delete from orderform where Ocode='$Ocode[$i]';";
    }
    echo $sql;
    $result=mysqli_query($conn,$sql);
    if(!$result){
        $flag=0;
        break;
    }else{
        $flag=1;
    }
}
if($flag){
    echo '删除成功!';
}else{
    echo '删除失败!';
}