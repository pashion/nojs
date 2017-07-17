
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '123456',
	  database : 'lamp27'
  });


 connection.connect();


module.exports = {

	//负责查询数据，并且返回查询结果
	select: function (params, func) {

		connection.query(params.sqlTpl, params.data, function (error, results, fields) {

		  	if (error) throw error;

		  	func&&func(results);
		 	
		});

	},

	insert:function (params, func) {

		connection.query(params.sqlTpl, params.data, function (error, results, fields) {

		  	if (error) throw error;

		  	console.log(results);
		  	// func&&func(results);
		 	
		});

	},
};