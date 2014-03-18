var http = require('http');
var fs = require('fs');
var _point = require('./_point');


http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'});
  if(request.url == '/point'){
  		var str = JSON.stringify(_point);
  		response.end(str);
  }
  else if(response.url =='/line'){
  	  	response.end(request.url);
  }else{
  	response.end('暂无数据');
  }

}).listen(8124);

console.log('Server running at http://127.0.0.1:3000/');