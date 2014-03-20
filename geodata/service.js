var http = require('http');
var fs = require('fs');
var _point = require('./_point');
var _line_all = require('./_line_all');
var _hainan = require('./_hainan');
var _taiwan = require('./_taiwan');
var _province = require('./_province');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'});
  		//全国点数据
  		if(request.url.indexOf('/point') >= 0){
  			var str = JSON.stringify(_point);
	  		var url =  require('url').parse(request.url, true);
	  		console.log(url.query.callback);
	  		str =  url.query.callback + '(' + str + ')';
	  		response.end(str);
  		}
  		//中国边界数据
  		else if(request.url.indexOf('/line') >= 0){
  			var str = JSON.stringify(_line_all);
	  		var url =  require('url').parse(request.url, true);
	  		console.log(url.query.callback);
	  		str =  url.query.callback + '(' + str + ')';
	  		response.end(str);
  		}
  		//中国海南
  		else if(request.url.indexOf('/hainan') >= 0){
  			var str = JSON.stringify(_hainan);
	  		var url =  require('url').parse(request.url, true);
	  		console.log(url.query.callback);
	  		str =  url.query.callback + '(' + str + ')';
	  		response.end(str);
  		}

  		//中国台湾
  		else if(request.url.indexOf('/taiwan') >= 0){
  			var str = JSON.stringify(_taiwan);
	  		var url =  require('url').parse(request.url, true);
	  		console.log(url.query.callback);
	  		str =  url.query.callback + '(' + str + ')';
	  		response.end(str);
  		}
  		//中国省份
  		else if(request.url.indexOf('/province') >= 0){
  			var str = JSON.stringify(_province);
	  		var url =  require('url').parse(request.url, true);
	  		console.log(url.query.callback);
	  		str =  url.query.callback + '(' + str + ')';
	  		response.end(str);
  		}

}).listen(3000);

console.log('Server running at http://127.0.0.1:3000/');