const locationStorage = new Storage();

var initialLocation = locationStorage.getLocationData();
var key = 'AIzaSyAAZyh8vP3Kol3Jp0Zhf3tI_UCSpD3Plvc';
var encodedAddress = encodeURIComponent(initialLocation.location);
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`;

async function getLocation() {
	const response = await fetch(geocodeUrl);
	const responseData = await response.json();
	if (responseData.status !== 'OK') {
		return console.log('could not access google servers');
	}
	var lat = responseData.results[0].geometry.location.lat;
	var long = responseData.results[0].geometry.location.lng;
	return { lat, long };
}

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
	getLocation()
		.then(responseData => {
			var map = new google.maps.Map(mapdiv, {
				zoom: 13,
				center: {
					lat: responseData.lat,
					lng: responseData.long
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
						console.log(
							'returned place has no geometry'
						);
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
		})
		.catch(err => console.log('could not access google maps servers'));
}
