var apiKey = "3ac0d8db34de82819d13a9167239acc1";
var searchBtn = $(".searchBtn");
var searchInput = $(".storageInput");
var cityNameEl = $(".cityName");
var currentDateEl = $(".currentDate");
var weatherIconEl = $(".weatherIcon");
var searchHistoryEl = $(".historyItems");
var tempEl = $(".temp");
var humidityEl = $(".humidity");
var today = moment().format("L");

searchBtn.on("click", function (e) {
  e.preventDefault();
  if (searchInput.val() === "") {
    alert("Please input City name");
    return;
  }

  getWeather(searchInput.val());
});

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWeatherIcon) {
  cityNameEl.text(cityName);
  currentDateEl.text(`${today}`);
  tempEl.text(`Temperature: ${cityTemp} °F`);
  humidityEl.text(`Humidity: ${cityHumidity}%`);
  weatherIconEl.attr("src", cityWeatherIcon);
}
// Use openWeather to get data and create city object
function getWeather(desiredCity) {
  var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${desiredCity}&APPID=${apiKey}&units=imperial`;
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (weatherData) {
    var cityObj = {
      cityName: weatherData.name,
      cityTemp: weatherData.main.temp,
      cityHumidity: weatherData.main.humidity,
      cityWeatherIconName: weatherData.weather[0].icon,
    };
    var renderedWeatherIcon = `https:///openweathermap.org/img/w/${cityObj.cityWeatherIconName}.png`;
    localStorage.setItem("searchHistory", cityObj.cityName);
    renderWeatherData(
      cityObj.cityName,
      cityObj.cityTemp,
      cityObj.cityHumidity,
      renderedWeatherIcon
    );
  });
}
