<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/22
 * Time: 15:58
 */

//接收前端信息
@$Index = $_REQUEST['Index'];
@$Cid = $_REQUEST['Cid'];
@$Cname = $_REQUEST['Cname'];
@$speci = $_REQUEST['speci'];
@$price = $_REQUEST['price'];
@$unit = $_REQUEST['unit'];
//var_dump($Cid);

$Cid = explode(',', $Cid);


//@$Index = 3;
//@$Cid = 'T45563633,T45563634';
//$Cid = explode(',', $Cid);
////echo $Cid[1];
////echo count($Cid);
//$Cid = explode(',', $Cid);
if (count($Cid) == 1) {
    $Cid = $Cid[0];
}
//var_dump($Cid);


//连接数据库
require('00-init.php');
//判断执行什么操作  1——添加   2——修改    3——删除
//添加操作
if ($Index == 1) {
    if (!$Cid || !$Cname || !$speci || !$price || !$unit) {
        echo('信息不全，添加失败！');
    } else {
        //添加之前先检查商品编号是否已存在
        $sql = "select * from shangpin where Cid='$Cid'";
        $result = mysqli_query($conn, $sql);
        if (mysqli_fetch_row($result)) {
            echo('商品编号已存在');
        } else {
            $sql = "insert into shangpin values('$Cid','$Cname','$speci','$price','$unit')";
            $result = mysqli_query($conn, $sql);
            if ($result) {
                echo '插入成功';
            } else {
                var_dump($result);
                echo '插入失败';
            }
        }
    }
} //修改操作
else if ($Index == 2) {
    $sql = "update shangpin set Cname='$Cname',speci='$speci',price='$price',unit='$unit' where Cid='$Cid';";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo '修改成功';
    } else {
//        var_dump($result);
        echo '修改失败';
    }
} //删除操作
else if ($Index == 3) {
    $result = false;
    if (count($Cid) == 1) {
        $sql = "delete from shangpin where Cid='$Cid';";
        $result = $result & mysqli_query($conn, $sql);
//        echo $sql;
    } else {
        for ($i = 0; $i < count($Cid); $i++) {
            $sql = "delete from shangpin where Cid='$Cid[$i]';";
            $result = $result & mysqli_query($conn, $sql);
//            echo $sql;
        }
    }

    echo '删除成功';

}