class UI {
  constructor() {
    this.contentPanel = document.getElementById('weatherContent');
  }
  paint(weather) {
    this.contentPanel.innerHTML = `
                <div class="weather__info">
                    <h1>${weather.display_location.full}</h1>
                    <h2>${weather.weather}</h2>
                    <img src="${weather.icon_url}" alt="weather icon">
                    <h2>${weather.temperature_string}</h2>
                </div>
                <ul class="item_collection mt-3">
                    <li class="item">Relative Humidity: ${
                      weather.relative_humidity
                    }</li>
                    <li class="item">Dewpoint: ${weather.dewpoint_string}</li>
                    <li class="item">Feels like: ${
                      weather.feelslike_string
                    }</li>
                    <li class="item">Wind: ${weather.wind_string}</li>
                </ul>
                <div class="btn-container">
                    <button class="btn btn--large earth">Change location &#9676;</button>
                </div>`;
  }
}
