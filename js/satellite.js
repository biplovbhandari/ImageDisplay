$(document).ready(function(){

	var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				osm = new L.TileLayer(osmUrl, {maxZoom: 18}),
				map = new L.Map('map', {layers: [osm], center: new L.LatLng(56, 137.23), zoom: 9});
				
	$.ajax({
		dataType: "json",
		url: "edit/parse.json",
		success: function(data){

			for (imageCollection in data){
				imageData = data[imageCollection];
				imageLocation = "image/" + imageData["name_of_image"];
				topLeft = imageData["TopLeft"];
				topRight = imageData["TopRight"];
				bottomRight = imageData["BottomRight"];
				bottomLeft = imageData["BottomLeft"];
				// TopLeft, TopRight, BottomRight, BottomLeft
				var anchors = [topLeft, topRight, bottomRight, bottomLeft];
				L.imageTransform(imageLocation, anchors, { opacity: 1,  disableSetClip: false }).addTo(map);
			}
					
					
		}
	});

});