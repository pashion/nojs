
/*

 功能： 多人同时在线聊天。

   a.  每个浏览器窗口算一个用户
   b.  当A用户发送'hi, my name is jack', 会发送给所有人(broadcast, emit)


思路：

  1.  A(某个一个客户端) 发送'123', 先发送给服务器(服务器通过监听某个事件就可以拿到数据)

  2. 将'123',广播给所有人

  3. 客户端需要监听到某个事件

 */

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {

   console.log(req.url);

   //当浏览器<script src="./jquery.js"></script>请求发起，服务器将jquery发送给浏览器
   //浏览器才拿到jquery
   if ( req.url =='/jquery.js' ) {

   		fs.readFile('./view/jquery.js', function (err, jq) {

   			//将jquery.js发送给客户端
   			res.writeHead(200);
	    	res.end(jq);
   		});

   }

  fs.readFile(__dirname + '/view/chat.html', function (err, data) {
	    if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }

	    res.writeHead(200);
	    res.end(data);
  });
}


io.on('connection', function (socket) {
 

 	//监听chat事件，就可以拿到客户端发送过来数据
 	socket.on('chat', function (data) {

 		console.log(data);
 		
 		//将数据广播给所有人,除了发送者
 		socket.broadcast.emit("msg",{server:data.my});//服务器端给所有客户端发送数据
 	

               //给发送者自己发送消息 
            	socket.emit("msg",{server:data.my});
 	});
});
