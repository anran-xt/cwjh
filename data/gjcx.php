<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/26
 * Time: 16:05
 */
@$orderTime1=$_REQUEST['orderTime1'];
@$orderTime2=$_REQUEST['orderTime2'];
@$sendTime1=$_REQUEST['sendTime1'];
@$sendTime2=$_REQUEST['sendTime2'];
@$Ocode=$_REQUEST['Ocode'];
@$origin=$_REQUEST['origin'];
@$pageSize=$_REQUEST['pageSize'];
@$currentPage = $_REQUEST['currentPage'];
//var_dump($orderTime1) ;
//var_dump($orderTime2) ;
//echo $sendTime1;
//echo $sendTime2;
//echo $Ocode;
//echo $origin;
require('00-init.php');
if($Ocode){
    $sql = "select count(*) from orderform
      where  Ocode='$Ocode';";
}else if($orderTime1&&!$sendTime1&&!$Ocode&&!$origin){
    $sql = "select count(*) from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2');";
}else if($orderTime1&&$sendTime1&&!$Ocode&&!$origin){
    $sql = "select count(*)  from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and UNIX_TIMESTAMP(OsendTime) BETWEEN  UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2');";
}else if(!$orderTime1&&$sendTime1&&!$Ocode&&!$origin){
    $sql = "select count(*) from orderform
      where  UNIX_TIMESTAMP(OsendTime) BETWEEN UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2');";
}else if(!$orderTime1&& !$sendTime1 && !$Ocode && $origin){
    $sql = "select count(*) from orderform
      where  Origin='$origin';";
}else if($orderTime1&& $sendTime1 && !$Ocode && $origin){
    $sql = "select count(*) from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and UNIX_TIMESTAMP(OsendTime) BETWEEN  UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2')
      and Origin='$origin';";
}else if($orderTime1 && !$sendTime1 && !$Ocode && $origin){
    $sql = "select count(*) from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and Origin='$origin';";
}else if(!$orderTime1 && $sendTime1 && !$Ocode && $origin){
    $sql = "select count(*) from orderform
      where  UNIX_TIMESTAMP(OsendTime) BETWEEN UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2')
      and Origin='$origin';";
}
#2.3查询结果 保存在$result
$result = mysqli_query($conn, $sql);
#2.4读取$result中的一行数据,保存在 $row
$row = mysqli_fetch_row($result);
#2.5将$row 中的数值,取出来保存在$total中
$total = $row[0];

#3、根据总记录数去计算总页数
#3.1 如果总记录数($total)与每页显示的条数($pageSize)能整除的话,那么整除的结果就是总页数,否则，将除后的结果取整加1(或向上取整)，将结果保存在$totalPage
$totalPage = ceil($total / $pageSize);

#4、计算要显示的首条数据的下标(想看页数-1)*条数,将结果保存在$start中
$start = ($currentPage - 1) * $pageSize;

if($Ocode){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  Ocode='$Ocode';";
}else if($orderTime1&&!$sendTime1&&!$Ocode&&!$origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2');";
}else if($orderTime1&&$sendTime1&&!$Ocode&&!$origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and UNIX_TIMESTAMP(OsendTime) BETWEEN  UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2');";
}else if(!$orderTime1&&$sendTime1&&!$Ocode&&!$origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OsendTime) BETWEEN UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2');";
}else if(!$orderTime1&& !$sendTime1 && !$Ocode && $origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  Origin='$origin';";
}else if($orderTime1&& $sendTime1 && !$Ocode && $origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and UNIX_TIMESTAMP(OsendTime) BETWEEN  UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2')
      and Origin='$origin';";
}else if($orderTime1 && !$sendTime1 && !$Ocode && $origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OrderTime) BETWEEN UNIX_TIMESTAMP('$orderTime1') and UNIX_TIMESTAMP('$orderTime2')
      and Origin='$origin';";
}else if(!$orderTime1 && $sendTime1 && !$Ocode && $origin){
    $sql = "select Ocode,Origin,Ostatus,OsendTime,OrderTime,Oname,address,telphone,notes,exprNum,payMoney,expreMoney,commodity,commCode,spci,commPri,commNum  from orderform
      where  UNIX_TIMESTAMP(OsendTime) BETWEEN UNIX_TIMESTAMP('$sendTime1') and UNIX_TIMESTAMP('$sendTime2')
      and Origin='$origin';";
}

$result=mysqli_query($conn,$sql);
$tArray = mysqli_fetch_all($result);
$tArray = array_reverse($tArray);
$array = array();

if ($pageSize > $total) {
    $pageSize = $total;
}
for ($i = 0; $i < $pageSize; $i++) {
    if (count($tArray)-$pageSize*($currentPage-1)-$i) {
        $array[$i] = $tArray[$i + $start];
    } else {
        break;
    }
}
if(count($array)==0){
    die('0');
}
if ($currentPage != 1&&$currentPage<$totalPage) {
    $prePage = $currentPage - 1;
    $nextPage=$currentPage+1;
} else if($currentPage != 1&&$currentPage==$totalPage){
    $prePage = $currentPage-1;
    $nextPage=$currentPage;
}else if($currentPage == 1&&$currentPage<$totalPage){
    $prePage = $currentPage;
    $nextPage=$currentPage+1;
}else if($currentPage == 1&&$currentPage==$totalPage){
    $prePage = $currentPage;
    $nextPage=$currentPage;
}else if($currentPage == 1&&$currentPage>$totalPage){
    $prePage = $currentPage;
    $nextPage=$currentPage;
}

$str = "{\"currentPage\":$currentPage,\"prePage\":$prePage,\"nextPage\":$nextPage,\"totalPage\":$totalPage,\"totalItem\":$total}";
Array_push($array, $str);

echo json_encode($array);


//if(($result)){
//    echo json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC));
//}else{
//    echo $sql;
//}


