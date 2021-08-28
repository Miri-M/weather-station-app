//DATE TIME
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let today = new Date();
let todayDay = weekdays[today.getDay()];
let todayYear = today.getFullYear();
let todayMonth = months[today.getMonth()];
let todayDate = today.getDate();

function formatTime() {
  let currentHours = today.getHours();
  let currentMinutes = today.getMinutes();
  let meridiem = "";
  let timeStamp = "";

  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  if (currentHours < 13) {
    meridiem = "am";
  } else {
    meridiem = "pm";
  }
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  timeStamp = `${currentHours}:${currentMinutes}${meridiem}`;
  return timeStamp;
}
let currentDateTime = `${formatTime()} ${todayDay} ${todayDate} ${todayMonth} ${todayYear}`;

//--------------------------------------

//CITY / LOCATION SEARCH FUNCTION & CURRENT WEATHER CONDITIONS

let cityForm = document.querySelector("#city-search-form");
let locationButton = document.querySelector("#location-button");

function displayTemperature(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  let displayTemperature = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  displayTemperature.innerHTML = `${temperature}°C`;
  return temperature;
}

/*function displayConditions(response) {
  let description = response.data.weather.[0].main;
  let mintemp = response.data.main.temp_min;
  let maxtemp = response.data.main.temp_max;
  let humidity = response.data.main.humidity;
  let windSpeed = math.reound(response.data.wind.speed);
  let windDirection = response.data.wind.deg;
  //let cloudCover = response.data.clouds.all;
  console.log(description);
}*/

function citySearch(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

//Forecast
function citySearchAPIForecast(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

function handleCitySubmit(event) {
  let cityInput = document.querySelector("#city-input").value;
  citySearch(cityInput);
}

function buildLocationAPI(position) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let apiOpenWeatherURL = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

//Forecast
function buildLocationAPIForecast(position) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  let units = `metric`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let apiOpenWeatherURL = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

function currentCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(buildLocationAPI);
}

function currentCoordinatesForecast(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(buildLocationAPIForecast);
}

function buildCityNameAPI(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

//User initiates city name search
cityForm.addEventListener("submit", handleCitySubmit);
cityForm.addEventListener("submit", buildCityNameAPI);
cityForm.addEventListener("submit", citySearchAPIForecast);

//User initiates current location search
locationButton.addEventListener("click", currentCoordinates);
locationButton.addEventListener("click", currentCoordinatesForecast);

//-------------------------------------------------------------------

//DATE TIME
let dateTime = document.querySelector("#current-date-time");
dateTime.innerHTML = currentDateTime;

//-------------------------------------------------------------------

//CELSIUS & FARENHEIT
function farenheitConversion(event) {
  event.preventDefault();
  var currentTemperature = document.querySelector("#current-temperature");
  currentTemperature = Number(currentTemperature);
  let tempFarenheit = Math.round((currentTemperature * 9) / 5 + 32);
  currentTemperature.innerHTML = tempFarenheit;
  let temperatureUnits = document.querySelector("#current-temperature-units");
  temperatureUnits.innerHTML = "°F";
  return;
}

function celsiusConversion(event) {
  event.preventDefault();
  var currentTemperature = document.querySelector("#current-temperature");
  currentTemperature = Number(currentTemperature);
  let tempCelsius = Math.round(((currentTemperature - 32) * 5) / 9);
  currentTemperature.innerHTML = tempCelsius;
  let temperatureUnits = document.querySelector("#current-temperature-units");
  temperatureUnits.innerHTML = "°C";
  return;
}

let convertFarenheitButton = document.querySelector(
  "#convert-farenheit-button"
);
let convertCelsiusButton = document.querySelector("#convert-celsius-button");

convertFarenheitButton.addEventListener("click", farenheitConversion);
convertCelsiusButton.addEventListener("click", celsiusConversion);

//-----------------------------------------------------------------------------------------------

//USER FEEDBACK
const weather = {
  getPrompt: (cityUserInput) => {
    if (!cityUserInput) {
      return `You haven't entered a valid city name, please try again.`;
    }

    const cityWeather = weather.data[cityUserInput];
    if (!cityWeather) {
      return `Sorry, we do not have weather information for ${cityUserInput}. Try going to \nhttps://www.google.com/search?q=weather+${cityUserInput}`;
    }

    const city = cityUserInput.replace(
      cityUserInput[0],
      cityUserInput[0].toUpperCase()
    );
    const tempFarenheit = Math.round((cityWeather.temp * 9) / 5 + 32);
    return `The current temperature in ${city} is ${cityWeather.temp}°C (${tempFarenheit}°F), with a humidity of ${cityWeather.humidity}%.`;
  },
};

//-----------------------------------------------------------------------------------------------