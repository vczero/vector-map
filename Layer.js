
//图层
Vmap.Layer = function(div,maxLng, minLng, maxLat, minLat) {
	var div = document.getElementById(div);
	this.div = div;
	this.width = parseInt(this.div.style.width);
	this.height = parseInt(this.div.style.height);
	this.maxLng = maxLng;
	this.minLng = minLng;
	this.maxLat = maxLat;
	this.minLat = minLat;
	this.renderer = new Vmap.Renderer(this);
}

Vmap.Layer.prototype.addPoint = function(point,style){
	this.renderer.drawPoint(point,style);
};

Vmap.Layer.prototype.addLine = function(point1, point2,style){
	this.renderer.drawLine(point1,point2,style);
};


