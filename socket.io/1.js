

/*
   

	AJAX轮询： 

		//每隔1s请求一次服务器
		setInterval(funtion () {
	

			$.post();


		}, 1000);

	缺点： 1. 同时有10万用户在线，服务器压力很大。


	webscoket协议，这个协议是HTML5新增的，缺点：IE10之前不支持的。


	socket.io项目：1. 兼容大部分浏览器 
	  2. socket.io封装了websocket,AJAX轮询。

	  3. 当用户的浏览器是IE,socket.io就会自动采用AJAX轮询方式。
	

 */

/*

 socket.io项目如何使用：

 0. 生成一个package.json文件

 	$ npm init


 1. 安装

 	cnpm install socket.io  --save

 2. 引入socket.io
	
	var io = require('socket.io');

 */

//创建一个web服务器
var app = require('http').createServer(handler);

//将app对象传递给socket.io
var io = require('socket.io')(app);

var fs = require('fs');

app.listen(3000);

function handler (req, res) {

  fs.readFile('./view/index.html', function (err, data) {
	    if (err) {
	      res.writeHead(404);
	      return res.end('没有找到index.html');
	    }

	    res.writeHead(200);
	    res.end(data);//将index.html代码响应给客户端
  });
}

//监听connection事件，这个事件当客户端连接时触发
io.on('connection', function (socket) {

  //自动触发news自定事件，并且将数据发送给客户端
  socket.emit('news', { hello: '服务器' });

  //监听到client自定义的事件，
  socket.on('client', function (data) {

  	//当客户端触发client事件之后，data就是客户端发送过来的数据
    console.log(data);
  });


});
