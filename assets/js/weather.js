class Weather {
  constructor(location) {
    this.apiKey = '7542a3609016835d';
    this.location = location;
  }

  //Fetch weather
  async getWeather() {
    const response = await fetch(
      `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${
        this.location
      }.json`
    );
    const responseData = await response.json();
    return responseData.current_observation;
  }
  //change location
  changeLocation(location) {
    this.location = location;
  }
}
