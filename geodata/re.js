var xlsx = require('node-xlsx');
var obj = xlsx.parse('riverPoint.xlsx'); //读取一个excel文件


var lineString = {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates":[]
    },
    "properties": {
      "name": ""
    }
};

//obj.worksheets[0].data.length
for(var i = 419; i <479; i++){
	var point = {};
	for (n = 0; n < obj.worksheets[0].data[i].length; n++) {
		var x = parseFloat(obj.worksheets[0].data[i][1].value);
		var y = parseFloat(obj.worksheets[0].data[i][2].value);
		var xy = [x, y];
		lineString.geometry.coordinates.push(xy);
	}
}


var str = JSON.stringify(lineString);

//写入到全国2019个县GPS经纬度数据
var fs = require('fs');
fs.writeFile('_hupo_479.json',str , function (err) {
  if (err) throw err;
  console.log('转化完成'); //文件被保存
});
