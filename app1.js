

//引入express框架
var express = require('express');


//var server = http.createServer();
var app = express();

console.log(__dirname);
//设置前端页面目录
app.set('views', __dirname + '/views');

app.engine('html', require('ejs').__express);

app.set('view engine', 'html');

app.use('/public', express.static(__dirname + '/public') );


//get()方法只能通过get方式触发
app.get('/', function (req, res, next) {

	//服务器响应数据给客户端
   // res.send();
   
   var a = '123';

   //render()加载view目录下html文件,响应给客户端
   res.render('home/index', {ab: '123'});//{ab: a} ab是键名， a是变量名

});

app.get('/login', function (req, res, next) {

	res.render('home/login');
});

app.post('/doLogin', function (req, res, next) {


	//处理登录
	console.log(2);
});


app.listen(300);
