var express = require('express');
    
//创建一个路由对象
var router = express.Router();

//当用户访问 http://IP/user 就会输出 "后台user模块"
router.get('/user', function (req, res, next) {

   res.send('前台user模块');
});

//首页的路由
router.get('/', function (req, res, next) {

   res.render('home/index');
});

//登录页面的路由
router.get('/login', function (req, res, next) {

   res.render('home/login');

//显示注册页面
}).get('/register', function (req, res, next) {

	res.render('home/register');
});

//处理注册
router.post('/doRegister', function (req, res, next) {

  //req.body拿到post提交数据
  console.log( req.body );

  /*
    1. 判断两次密码是否一样
    2. 判断邮箱是否存在
	
   */
  
  var pass = req.body.pass;
  var email = req.body.email;
  var repass = req.body.repass;
  

  //判断密码是否一致
  if (pass != repass) {

  	//页面跳转
  	res.redirect('/register');

  	return false;

  }

  //引入mysqlModel.js模块
  var model = require('../models/mysqlModel.js');

  var params = {

  	sqlTpl:'select id,name from user where name = ?',
  	data:email

  };

  var res = model.select(params, function (data){


  	// console.log(data);
  	// if (!data) {

  		//用户不存在,插入数据库
  		
  		var sql = 'insert into user(name, pass) values(?, ?)';

  		var params = {
  			sqlTpl: sql,
  			data: [email, pass]
  		};

  		model.insert(params);


  	// } 


  } );





});



//导出router对象
module.exports = router;