$(document).ready(function(){

	var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
				osm = new L.TileLayer(osmUrl, {maxZoom: 18}),
				map = new L.Map('map', {layers: [osm], center: new L.LatLng(56, 137.23), zoom: 3});
				
	$.ajax({
		url: "./php/read-coordinates.php",
		type: 'get',
		dataType: "json",		
		success: function(data){

			/*for (imageCollection in data){
				imageData = data[imageCollection];
				imageLocation = "image/" + imageData["name_of_image"];
				topLeft = imageData["TopLeft"];
				topRight = imageData["TopRight"];
				bottomRight = imageData["BottomRight"];
				bottomLeft = imageData["BottomLeft"];
				// TopLeft, TopRight, BottomRight, BottomLeft
				var anchors = [topLeft, topRight, bottomRight, bottomLeft];
				console.log(typeof(anchors));
				L.imageTransform(imageLocation, anchors, { opacity: 1,  disableSetClip: false }).addTo(map);
			}*/
			//console.log(data);
			for (totalObject in data){
				individualObject = data[totalObject];

				for (subObject in individualObject){
					var topLeft, topRight, bottomRight, bottomLeft;
					gudiObject = individualObject[subObject];

					if (gudiObject["TopLeft"]){
						topLeft = gudiObject["TopLeft"];
					} else if (gudiObject["TopRight"]){
						topRight = gudiObject["TopRight"];
					} else if (gudiObject["BottomRight"]){
						bottomRight = gudiObject["BottomRight"];
					} else if (gudiObject["BottomLeft"]){
						bottomLeft = gudiObject["BottomLeft"];
					} else {}
					
				}
				var clipCoords = [topLeft, topRight, bottomRight, bottomLeft];
				console.log(clipCoords);
				var polygon =L.polygon(clipCoords, {fillOpacity: 0.5, opacity: 1, weight: 2, fill: false, color: 'red'}).addTo(map);
				//polygon.bindPopup("I am a polygon.");
			}
		}
	});

});