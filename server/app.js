var express = require('express');
var app = express();

/*
+
+ 根据不同的省级行政区的名称返回JSON对象
+ 格式：行政区的拼音小写；山西和陕西分别为shan1xi, shan3xi
+
*/
app.get('/:name', function(req, res) {
    try {
        var obj = require('./data/' + req.param('name'));
        res.setHeader('Access-Control-Allow-Origin', '*');
        obj.status = 1;
        res.send(obj);
    } catch (e) {
        res.send({
            status: 0
        });
    }
});

var server = app.listen(3000, function() {
    console.log('server on port:%d', server.address().port);
});