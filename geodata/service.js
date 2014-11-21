var http = require('http');
var fs = require('fs');
var _point = require('./_point');
var _line_all = require('./_line_all');
var _hainan = require('./_hainan');
var _taiwan = require('./_taiwan');
var _province = require('./_province');
var _allHome = require('./_allHome');
var _siChuan = require('./si_chuan');

var _shenz = require('./_shenz.json');
var _us = require('./_us.json');

var _wangjing = require('./_wangjing.json');

http.createServer(function (request, response) {
  	response.writeHead(200, {'Content-Type': 'text/javascript;charset=utf-8'});

      //获取望京数据
      if(request.url.indexOf('/wangjing/get') >= 0){
        var str = JSON.stringify(_wangjing);
        var url =  require('url').parse(request.url, true);
        console.log(url.query.callback);
        str =  url.query.callback + '(' + str + ')';
        response.end(str);
      }

      //获取全国边界数据
      if(request.url.indexOf('/quanguodata/get') >= 0){
        var str = JSON.stringify(_allHome);
        var url =  require('url').parse(request.url, true);
        console.log(url.query.callback);
        str =  url.query.callback + '(' + str + ')';
        response.end(str);
      }

      //获取美国边界数据
      if(request.url.indexOf('/us/get') >= 0){
        var str = JSON.stringify(_us);
        var url =  require('url').parse(request.url, true);
        console.log(url.query.callback);
        str =  url.query.callback + '(' + str + ')';
        console.log(str);
        response.end(str);
      }

      if(request.url.indexOf('/sz/get') >= 0){
        var str = JSON.stringify(_shenz);
        var url =  require('url').parse(request.url, true);
        str =  url.query.callback + '(' + str + ')';
        response.end(str);
      }
      //四川内部数据
      if(request.url.indexOf('/sichuan/get') >= 0){
        var str = JSON.stringify(_siChuan);
        var url =  require('url').parse(request.url, true);
        console.log(url.query.callback);
        str =  url.query.callback + '(' + str + ')';
        response.end(str);
      }
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