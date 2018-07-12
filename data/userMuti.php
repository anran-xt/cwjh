<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/24
 * Time: 16:18
 */
@$uState = $_REQUEST['uState'];
@$uName = $_REQUEST['uName'];
@$uPwd = $_REQUEST['uPwd'];
@$Index = $_REQUEST['Index'];
//$uState = 1;
//$uName = 'ww,qq';
//$uPwd = 'abc123';
//$Index = 2;

require('00-init.php');

if ($Index == 1) {
    $sql = "select * from usertab where uName='$uName';";
    $result = mysqli_query($conn, $sql);
    if (mysqli_fetch_row($result)) {
        echo '用户名已存在，添加失败';
    } else {
        $sql = "insert into usertab values(default,'$uState','$uName','$uPwd');";
        $result = mysqli_query($conn, $sql);
//        echo $sql;
//        echo $result;
        if ($result) {
            echo 1;
        } else {
            echo 0;
        }
    }
}else if($Index==2){
    if(strpos($uName,',')){
        $uName=explode(',',$uName);
    }
    if(count($uName)==1){
        $sql="delete from usertab where uName='$uName';";
        $result=mysqli_query($conn,$sql);
        if($result){
            echo "删除成功";
        }else{
            echo "删除失败";
        }
    }else{
        for($i=0;$i<count($uName);$i++){
            $sql="delete from usertab where uName='$uName[$i]';";
            $result=mysqli_query($conn,$sql);
        }
        if($result){
            echo "删除成功";
        }else{
            echo "删除失败";
        }
    }
}
