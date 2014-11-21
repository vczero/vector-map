var express = require('express');
var app = express();

app.get('/:name', function(req, res){
	try{
		var obj = require('./data/' + req.param('name'));
		obj.status = 1;
		res.send(obj);
	}catch(e){
		res.send({
			status: 0
		});
	}
});

var server = app.listen(3000, function(){
	console.log('server on port:%d', server.address().port);
});



