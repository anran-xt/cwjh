<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/19
 * Time: 8:27
 */
//接收请求数据
$OrderTime=date('Y-m-d',time()+6*60*60);
//连接数据库
require('00-init.php');
//创建sql语句
//当天
$sqlCurr=[];
$resCurr=[];
$rowCurr=[];
$now=[];
for($i=0,$j=1;$i<3;$i++,$j++){
    $sqlCurr[] = "select count(*) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24)<1 and Ostatus=$j;";
    $resCurr[]=mysqli_query($conn,$sqlCurr[$i]);
    $rowCurr[]=mysqli_fetch_row($resCurr[$i]);
    $now[]=$rowCurr[$i][0];
}

//七天内
$sqlWeekX=[];//七天内下单量sql
$sqlWeekF=[];//七天内发货量sql
$weekX=[];
$weekF=[];
for($i=0,$j=0.9;$i<7;$i++,$j++){

//    $sqlWeekX[]="select (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24) between 0 and 0.9 ;";

    $sqlWeekX[]="select count(*) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24) between $i and $j ;";
    $resWeekX[]=mysqli_query($conn,$sqlWeekX[$i]);
    $rowWeekX[]=mysqli_fetch_row($resWeekX[$i]);
    $weekX[]=$rowWeekX[$i][0];

    $sqlWeekF[]="select count(*) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24) between $i and $j  and Ostatus!=1;";
    $resWeekF[]=mysqli_query($conn,$sqlWeekF[$i]);
    $rowWeekF[]=mysqli_fetch_row($resWeekF[$i]);
    $weekF[]=$rowWeekF[$i][0];
}

$week=[$weekX,$weekF];
//echo "七天内：";
//echo json_encode($week);


//一个月内
$month=[];
$sqlMonthOrd="select count(*) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24)<30";
$resMonthOrd=mysqli_query($conn,$sqlMonthOrd);
$rowTotal=mysqli_fetch_row($resMonthOrd);
//一个月总单数：echo $rowTotal[0];
$sqlMonthMon="select sum(payMoney) from orderform where (UNIX_TIMESTAMP('$OrderTime') - UNIX_TIMESTAMP(OrderTime))/(60*60*24)<30";
$resMonthMon=mysqli_query($conn,$sqlMonthMon);
$moneyTotal=mysqli_fetch_row($resMonthMon);
//echo "一月内：";
$month[]=$rowTotal[0];
$month[]=$moneyTotal[0];
//echo json_encode($month);
session_start();
$home=[$now,$week,$month,$_SESSION['uName'],$_SESSION['uState']];
echo json_encode($home);
