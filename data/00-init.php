<?php
/*
项目初始化页面
本页面包含很多其他php页面必须的公共的代码
它必须被包含到其他页面中！！！
*/
#连接到数据库服务器
$conn=mysqli_connect('localhost','root','','panjiang',3306);

#设置后续的SQL语句所用字符串
$sql="SET NAMES UTF8";
mysqli_query($conn,$sql);
?>