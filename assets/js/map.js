//INPUT FORM STYLING
document.addEventListener('change', () => {
	const input = document.querySelector('.form-control');

	input.value !== ''
		? (input.nextElementSibling.className = 'label-transform')
		: (input.nextElementSibling.className = '');
});

//GOOGLE MAPS API
const mapdiv = document.getElementById('map');

// init maps
function initAutocomplete() {
	var map = new google.maps.Map(mapdiv, {
		zoom: 13,
		center: {
			lat: -1.2921,
			lng: 36.8219
		},
		mapTypeId: 'roadmap'
	});
	var inputBox = document.getElementById('location');
	var searchBox = new google.maps.places.SearchBox(inputBox);
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	var markers = [];
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}
		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];
		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log('returned place has no geometry');
				return;
			}
			var icon = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			markers.push(
				new google.maps.Marker({
					map: map,
					icon: icon,
					title: place.name,
					position: place.geometry.location
				})
			);
			if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);
	});
}
