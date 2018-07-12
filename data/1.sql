#创建数据库
DROP DATABASE IF EXISTS panjiang;
create database panjiang charset=utf8;
use panjiang;

#创建用户表
#用户编号 用户状态 登录名 登陆密码
drop table if exists userTab;
create table userTab(
  uId int primary key auto_increment,
  uState int not null default 1,
  uName varchar(16) not null,
  uPwd varchar(16) not null
);
insert into userTab VALUES
(default,0,'panjiang','abc123');
insert into userTab VALUES
(default,1,'xietao','abc123');
insert into userTab VALUES
(default,2,'liyuanyuan','abc123');


#创建商品信息表
drop table if exists shangPin;
#商品编号 商品名 商品规格 价格 单位
create table shangPin(
    Cid varchar(10) primary key,
    Cname varchar(16) not null,
    speci varchar(16),
    price decimal(6,2) not null,
    unit varchar(8)
);
insert into shangpin values
('T45563633',"诱惑冷吃兔","麻辣",24.99,"包");
insert into shangpin values
('T45563632',"诱惑冷吃兔","微辣",24.99,"包");
insert into shangpin values
('T45563631',"诱惑牛肉丝","麻辣",35.99,"包");
insert into shangpin values
('T45563630',"诱惑牛肉丝","微辣",24.99,"包");
insert into shangpin values
('T45563629',"诱惑鸭舌","麻辣",24.99,"包");

#创建订单表
drop table if exists orderForm;
#自动增长序号  #订单原始单号 ,#订单来源 #实付金额 #运费 状态/发货时间
# 下单时间 收件人姓名 电话  地址 商品名 商品规格 商品数量 备注 快递单号
#状态 1-待处理 2-待发货 3-已发货

create table orderForm(
  Onum int primary key auto_increment,
	Ocode varchar(20),
	Origin int default 1,
	payMoney decimal(8,2),
	expreMoney decimal(6,2),
	Ostatus int default 1,
	OsendTime DATE DEFAULT null,
	OrderTime DATE ,
	Oname varchar(16) not null,
	telphone varchar(11) not null,
	address varchar(128) not null,
	commodity varchar(256) not null,
	commCode varchar(256),
	spci varchar(64),
	commPri VARCHAR (64),
	commNum VARCHAR(64)not null,
	notes varchar(256),
	exprNum varchar(32) default null
);
insert into orderForm values
(default,'T179030384656',1,3250,25.5,default,default,'2017/9/1/20/56','张三','13698276449','四川省成都市新都区正兴
小区5号院','诱惑冷吃兔-诱惑牛肉丝-诱惑掌中宝','C45563629-C45563630-C45563631','微辣-微辣-微辣','24.99-30.50-40.5','20-10-40','送快点',DEFAULT
);
insert into orderForm values
(default,'T179020382864',1,4560,50.5,default,default,'2017/9/2/7/23','李四','13698276449','辽宁省大连市其它区金石
滩金海人家38号楼3单元','诱惑冷吃兔-诱惑鸡尖','C45563630-C45563631','微辣-微辣','50.00-26.00','20-30','送快点',DEFAULT );
insert into orderForm values
(default,'T179020381904',2,6520,105,default ,default,'2017/9/3/16/40','王五','13698276449','四川省成都市双流县腾飞
六路24号','诱惑冷吃兔-诱惑冷吃兔','C45563631','微辣-微辣','50.00-38.00','20-50','送快点',DEFAULT );
insert into orderForm values
(default,'T179020381909',3,35620,350,default,default,'2017/9/3/19/56','张良','13698276449','四川省成都市新都区正兴
小区5号院','诱惑冷吃兔','C45563632','微辣','50.00','20','送快点',DEFAULT );



