var dropDot = function(theMap, lat, lng, color) {
	L.marker([lat, lng], {icon: L.divIcon({className: 'count-icon-' + color, html: "", iconSize: [10, 10]})}).addTo(theMap);
}

$(function() {
        var initialLocation = new L.LatLng(40.743695, -73.993279);

        var map = L.mapbox.map('map', 'baldurg.j052a6a4')
		.setView([initialLocation.lat, initialLocation.lng], 18);

	var dropper = L.marker(initialLocation, {
	               icon: L.mapbox.marker.icon({'marker-color': 'CC0033'}),
	               draggable: true
	           }); 

	var currentLeg = 0;
        var lat, lng;
	dropper.on('dragend', function(x) {
	    var latLng = x.target.getLatLng();
	    var foo = new LatLon(latLng.lat, latLng.lng);
	    $.get('set?&lat=' + latLng.lat + '&lng=' + latLng.lng, function(resp) {
              console.log(resp);
	    });
	});
	dropper.addTo(map);
});
