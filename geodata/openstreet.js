var _map = require('./map');

var ways = [];



for(var k = 0; k < _map.osm.way.length; k++){
	var ndsref = _map.osm.way[0].nd;
	//道路模型
	var way =  {
	    "type": "Feature",
	    "geometry": {
	      "type": "LineString",
	      "coordinates":[]
	    },
	    "properties": {
	      "name": ""
	    }
	};
	for(var i = 0; i < ndsref.length; i++){
		var ref = ndsref[i].ref;
		for(var n = 0; n < _map.osm.node.length; n++){
			if(_map.osm.node[n].id == ref){
				way.geometry.coordinates.push([_map.osm.node[n].lon, _map.osm.node[n].lat]);
				// console.log(_map.osm.node[n].lon, _map.osm.node[n].lat);
			}
		}
	}
	ways.push(way);
}


var str = JSON.stringify(ways);

var fs = require('fs');
fs.writeFile('_open_way.json',str , function (err) {
  if (err) throw err;
  console.log('转化完成'); 
});
