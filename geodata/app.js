var xlsx = require('node-xlsx');
var obj = xlsx.parse('D:/Github/readGeoJSON/area.district.gbk.xlsx'); // parses a file

var jsonText = {};
jsonText.geoinfo = [];
jsonText.des = '数据提供:数据堂全国2019个区县的GPS经纬度信息转化而来;转化:王利华';

for(var i = 0; i < obj.worksheets[0].data.length; i++){
	var point = {};
	for (n = 0; n < obj.worksheets[0].data[i].length; n++) {
		point = {
		  	"type": "Feature",
		  	"geometry": {
		    	"type": "Point",
		    	"coordinates": [obj.worksheets[0].data[i][3].value, obj.worksheets[0].data[i][4].value]
		  	},
		  	"properties": {
		    	"name": obj.worksheets[0].data[i][2].value + obj.worksheets[0].data[i][0].value
		  	}
		};
	}
	jsonText.geoinfo.push(point);
}

var str = JSON.stringify(jsonText);


var fs = require('fs');
fs.writeFile('_point.json',str , function (err) {
  if (err) throw err;
  console.log('转化完成'); //文件被保存
});
