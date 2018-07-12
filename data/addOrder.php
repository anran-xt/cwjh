<?php
//向数据库中插入新的订单
//接收请求数据
#default
//区分修改与添加
@$Ocode = $_REQUEST["Ocode"];
@$Origin = $_REQUEST['Origin'];
@$payMoney = $_REQUEST['payMoney'];
@$expreMoney = $_REQUEST['expreMoney'];
#default订单状态
#default发货时间 //得到时间比实际时间小6小时
$OrderTime = date('Y-m-d H:i', time() + 6 * 60 * 60);
@$Oname = $_REQUEST["Oname"];
@$telphone = $_REQUEST["telphone"];
@$address = $_REQUEST["address"];
@$commdity = $_REQUEST["commdity"];
@$commCode = $_REQUEST["commCode"];
@$spci = $_REQUEST["spci"];
@$commPri = $_REQUEST["commPri"];
@$commNum = $_REQUEST["commNum"];
@$notes = $_REQUEST["notes"];

//连接数据库
require('00-init.php');


if ($Ocode) {
    $sql = "UPDATE orderform SET Origin='$Origin',payMoney='$payMoney',expreMoney='$expreMoney',Oname='$Oname',telphone='$telphone',address='$address',commodity='$commdity',commCode='$commCode',spci='$spci',commPri='$commPri',commNum='$commNum',notes='$notes'  WHERE Ocode = '$Ocode';";
} else {
    //随机生成原始订单号
    @$Ocode = 'C';
    for ($i = 0; $i < 12; $i++) {
        $Ocode = $Ocode . rand(0, 9);
    }
    $sql = "insert into orderform values(DEFAULT ,'$Ocode','$Origin','$payMoney','$expreMoney',default,default,
    '$OrderTime','$Oname','$telphone','$address','$commdity','$commCode','$spci','$commPri','$commNum','$notes',DEFAULT );";
}
echo $sql;

if ($Oname == null || $telphone == null || $address == null || $commdity == null) {
    if ($Ocode == 0) {
        die("订单信息不完整,订单生成失败!");
    } else {
        die("订单信息不完整,修改订单失败!");
    }
}

$result = mysqli_query($conn, $sql);
if ($result) {
    echo('成功');
} else {
    echo("失败");
}
?>