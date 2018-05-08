const ui = new UI();
const storage = new Storage();

const weatherLocation = storage.getLocationData();

var getWeather = () => {
	var inputLocation = document.getElementById('location').value;
	if (inputLocation !== '') {
		var weather = new Weather(inputLocation);
		weather
			.getWeather()
			.then(results => {
				ui.paint(results);
			})
			.catch(err => console.log(err));
	}
};
var getInitialWeather = () => {
	var inputLocation = document.getElementById('location').value;
	if (inputLocation !== '') {
		var weather = new Weather(inputLocation);
		weather
			.getWeather()
			.then(results => {
				ui.paint(results);
			})
			.catch(err => console.log(err));
	} else {
		var weather = new Weather(weatherLocation.location);
		weather
			.getWeather()
			.then(results => {
				ui.paint(results);
			})
			.catch(err => console.log(err));
	}
};

//init weather object
document.addEventListener('DOMContentLoaded', getInitialWeather);
document.addEventListener('change', getWeather);
