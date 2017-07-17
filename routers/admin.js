
/*
以后后台路径都应该写admin.js
 */

var express = require('express');
    
//创建一个路由对象
var router = express.Router();

//当用户访问 http://IP/admin/user 就会输出 "后台user模块"
router.get('/user', function (req, res, next) {

   res.send('后台user模块');
});

//导出router对象
module.exports = router;