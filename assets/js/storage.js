class Storage {
	constructor() {
		this.location;
		this.defautLocation = 'Nairobi, Kenya';
	}

	getLocationData() {
		if (localStorage.getItem('location') === null) {
			this.location = this.defautLocation;
		} else {
			this.location = JSON.parse(localStorage.getItem('location'));
		}
		return {
			location: this.location
		};
	}

	setLocationData(location) {
		localStorage.setItem('location', JSON.stringify(location));
	}
}
