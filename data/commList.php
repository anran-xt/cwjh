<?php
/**
 * Created by PhpStorm.
 * User: lenovo1
 * Date: 2017/9/20
 * Time: 20:39
 */

$pageSize=$_REQUEST['pageSize'];
$currentPage = $_REQUEST['currentPage'];



#2、计算数据表中的总记录数
#2.1数据库连接
require("00-init.php");
#2.2拼SQL语句 select count(*) from xz_user


$sql = "select count(*) from shangpin;";
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
#echo "起始下标为：".$start;

#5、拼分页查询的SQL语句去数据库查询数据
#5.1 通过$start,$pageSize拼SQL语句
# limit $start,$pageSize
$sql='select Cid,Cname,speci,price,unit from shangpin';

#5.2 执行查询结果保存在$result中
$result = mysqli_query($conn, $sql);
#5.3 将$result转换为二维数组 保存在$array中

$tArray = mysqli_fetch_all($result);

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
#6.0 计算下一页,通过$currentPage进行计算
#6.3 如果$currentPage是最后一页($totalPage)的话,name下一页就是最后一页,将结果保存在$nextPage中
#6.4 如果$currentPage小于最后一页($totalPage)的话,那么下一页就是$currentPage+1,将结果保存在$nextPage

#echo "当前页：$currentPage,上一页：$prePage,下一页：$nextPage,总页数：$totalPage";

#6.5 将 prePage,nextPage,totalPage的数据 拼成一个JSON格式的字符串，追加到$arraycxzadweeytiokjhl/.nbvc
session_start();
$uName=$_SESSION['uName'];
$uState=$_SESSION['uState'];
$str = "{\"currentPage\":$currentPage,\"prePage\":$prePage,\"nextPage\":$nextPage,\"totalPage\":$totalPage,\"totalItem\":$total,\"uName\":\"$uName\",\"uState\":$uState}";
#将$str追加到$array后
Array_push($array, $str);
#6.6 将$array转换成JSON格式字符串,进行响应
echo json_encode($array);

