var fs = require('fs');

fs.readFile('公路.txt', function (err, data) {

    if (err) throw err;
    var dataStr = data.toString();
    //按行读取
    var strs = dataStr.split('\r\n');
    //取每一行
    var newData = [];
    for(var i = 0; i < strs.length; i++){
      //----------------每一行就是一个多边形-----------------------
      var polygon = {
          "type": "Feature",
          "geometry": {
            "type": "Polygon",
            "coordinates":[]
          },
          "properties": {
            "name": "gonglu"
          }
      };
      //----------------------------------------------------------
      var line = strs[i].split(',');
      //读取经纬度
      //将line中的数据分组
      for(var n = 0; n < line.length; n++){
        if(n % 2 === 0){
          var point = [];
          point.push(parseFloat(line[n]));
          point.push(parseFloat(line[n + 1]));
          polygon.geometry.coordinates.push(point);
        }
      }
      newData.push(polygon);
    }
  
    var str = JSON.stringify(newData);
    fs.writeFile('_gonglu.json',str , function (err) {
      if (err) throw err;
      console.log('转化写入文件完成'); //文件被保存
    });
});