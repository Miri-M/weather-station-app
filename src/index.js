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
let currentDateTime = `NZST ${formatTime()} ${todayDay} ${todayDate} ${todayMonth} ${todayYear}`;

//--------------------------------------

//CITY / LOCATION SEARCH FUNCTION & CURRENT WEATHER CONDITIONS

let cityForm = document.querySelector("#city-search-form");
let locationButton = document.querySelector("#location-button");

function displayTemperature(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  updateTemperatureDisplay(temperature);
  return temperature;
}

function displayConditions(response) {
  let displayConditions=document.querySelector("#current-conditions-element");
  let currentConditions=response.data.weather[0].description;
  displayConditions.innerHTML=currentConditions;
  return currentConditions;
}

//Updated geocoding API from openweathermap.org
//Geocode the city name then pass the output coordinates to the function hitting the forecasting APIs.

//First step - geocode city name entered by user
function citySearchGeocoder(city) {  
  let geocoderAPIEndPoint = `http://api.openweathermap.org/geo/1.0/direct?`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let geocoderURL = `${geocoderAPIEndPoint}q=${city}&appid=${apiKey}`;
  //{data} same as response.data
  return axios.get(geocoderURL).then(({data})=>
    {
      let cityProperties = data[0];
      var latitude = cityProperties["lat"];
      var longitude = cityProperties["lon"];
      return {coords:{latitude, longitude}};
    })
}

//use lat/long to access weather data
function citySearchCurrentWeather(latitude, longitude) {
  let weatherAPIEndPoint = 'https://api.openweathermap.org/data/2.5/weather?';
  let units = `metric`; 
  let apiOpenWeatherURL = `${weatherAPIEndPoint}&lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
  axios.get(apiOpenWeatherURL).then(displayConditions);
}

function citySearchForecast(latitude, longitude) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature)
  axios.get(apiOpenWeatherURL).then(displayConditions);
}

/*
function citySearch(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
  axios.get(apiOpenWeatherURL).then(displayConditions);
}

//City Search Forecast
function citySearchForecast(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature)
  axios.get(apiOpenWeatherURL).then(displayConditions);
}
*/

function handleCitySubmit(event) {
  let cityInput = document.querySelector("#city-input").value;
  event.preventDefault();
  citySearchGeocoder(cityInput).then(buildLocationAPI);
}

//BuildAllLocations function - calls all location based functions here, replace function 'citySearchGeocoder'

function buildLocationAPI(position) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let apiOpenWeatherURL = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

//Location Search Forecast
function buildLocationAPIForecast(position) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?`;
  let units = `metric`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
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
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
}

//User initiates city name search
cityForm.addEventListener("submit", handleCitySubmit);
//cityForm.addEventListener("submit", buildCityNameAPI);
//cityForm.addEventListener("submit", citySearchGeocoder);
cityForm.addEventListener("submit", citySearchCurrentWeather)
cityForm.addEventListener("submit", citySearchForecast);

//User initiates current location search
locationButton.addEventListener("click", currentCoordinates);
locationButton.addEventListener("click", currentCoordinatesForecast);

//-------------------------------------------------------------------

//DATE TIME
let dateTime = document.querySelector("#current-date-time");
dateTime.innerHTML = currentDateTime;

//-------------------------------------------------------------------

//CELSIUS & FARENHEIT
var globalTemperature

function updateTemperatureDisplay(temperature, isFarenheit){
  globalTemperature = temperature;
  const displayTemperature = isFarenheit
    ? Math.round((temperature * 9) / 5 + 32)
    //if false
    : temperature;
  document.querySelector("#current-temperature").innerHTML = displayTemperature;
  const displayUnit = isFarenheit ? "F": "C";
  document.querySelector("#current-temperature-units").innerHTML = `°${displayUnit}`;
}

function farenheitConversion(event) {
  event.preventDefault();
  updateTemperatureDisplay(globalTemperature,true);
}

function celsiusConversion(event) {
  event.preventDefault();
  //updateTemperatureDisplay(globalTemperature, false) equivalent
  updateTemperatureDisplay(globalTemperature);
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

  },
};

//-----------------------------------------------------------------------------------------------

//DISPLAY THREE DAY FORECAST
let numberDays = 3;

//Connect to daily forecast API
function dailyLocationForecastAPI(){
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast/daily?`;  
  let units = `metric`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let apiOpenWeatherURL = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=${numberDays}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL)
}

function dailyCitySearchForecastAPI(city){
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast/daily?`;
  let units = `metric`;
  let apiKey = "124f2bbd0f81bf4ba3f87094627b562f";
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&units=${units}&cnt=${numberDays}&appid=${apiKey}`;
  axios.get(apiOpenWeatherURL)
}

function forecastDayTitle() {

}

function forecastDescription(){

}

function forecastTemperatureHigh(){

}

function forecastTemperatureLow(){

}

function forecastHumidity(){

}

function forecastWindspeed(){

}

function forecastWindDirection(){

}