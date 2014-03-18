var http = require('http');
var fs = require('fs');
var _point = require('./_point');


http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'});
  		var str = JSON.stringify(_point);
  		var url =  require('url').parse(request.url, true);
  		console.log(url.query.callback);
  		str =  url.query.callback + '(' + str + ')';
  		response.end(str);
	  // if(request.url == '/point'){
	  // 		var str = JSON.stringify(_point);
	  // 		str = 'callback(' + str + ')';
	  // 		response.end(str);
	  // }
	  // else if(response.url =='/line'){
	  // 	  	response.end(request.url);
	  // }else{
	  // 	response.end('暂无数据');
	  // }

}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');