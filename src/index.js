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
//--------------------------------------

let cityForm = document.querySelector("#city-search-form");
let locationButton = document.querySelector("#location-button");
let isDegreesCelsius=true;

//Date time
let dateTime = document.querySelector("#current-date-time");
dateTime.innerHTML = currentDateTime;

//Disable temperature unit conversion buttons until there is a value available to convert
function conversionButtonVisible(){
  convertFarenheitButton.removeAttribute('disabled');
  convertCelsiusButton.removeAttribute('disabled');
  //Update button style
  convertFarenheitButton.classList.remove('inactive-convert-temperature-button');
  convertCelsiusButton.classList.remove('inactive-convert-temperature-button');
  convertFarenheitButton.classList.add('convert-temperature-button');
  convertCelsiusButton.classList.add('convert-temperature-button');
}

//Retrieve current temperature
function displayTemperature(response) {
  document.querySelector("#city-heading").innerHTML = response.data.name;
  let displayElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  displayElement.innerHTML = temperature;
  temperatureUnits = document.querySelector("#current-temperature-units");
  if (isDegreesCelsius){
    //celsiusConversion();
    temperatureUnits.innerHTML = "°C";
  }
  else{
    //farenheitConversion();
    temperatureUnits.innerHTML = "°F";
  }
  conversionButtonVisible();
}

//Retrieve current conditions description
function displayConditions(response) {
  let displayConditions=document.querySelector("#current-conditions-element");
  let currentConditions=response.data.weather[0].description;
  displayConditions.innerHTML=currentConditions;
  let icon = document.querySelector("#current-weather-icon");
  icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt",currentConditions);
  console.log(day1-weather-icon);
  return currentConditions;
}


//City name current conditions
function citySearch(city) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let units = `metric`;
  let apiOpenWeatherURL = `${apiEndPoint}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
  axios.get(apiOpenWeatherURL).then(displayConditions);
}

//City name forecast
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

//Location current conditions
function buildLocationAPI(position) {
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let units = `metric`;
  let apiKey = "f5bcd0d00e606347fff1623724afd116";
  let apiOpenWeatherURL = `${apiEndPoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiOpenWeatherURL).then(displayTemperature);
  axios.get(apiOpenWeatherURL).then(displayConditions);
}

//Location Forecast
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
locationButton.addEventListener("click", currentCoordinates,currentCoordinatesForecast);

//-------------------------------------------------------------------

//CELSIUS & FARENHEIT
var temperatureUnits = document.querySelector("#current-temperature-units");
temperatureUnits = ""
let convertFarenheitButton = document.querySelector("#convert-farenheit-button");
let convertCelsiusButton = document.querySelector("#convert-celsius-button");
//Temperature conversion buttons disabled as default behaviour
convertFarenheitButton.disabled = true;
convertCelsiusButton.disabled = true;

function farenheitConversion(event) {
  if(event){
    event.preventDefault();
  }
  var currentTemperature = document.querySelector("#current-temperature");
  let temperatureElement = Number(currentTemperature.innerHTML);
  let tempFarenheit = Math.round((temperatureElement * 9) / 5 + 32);
  currentTemperature.innerHTML = Number(tempFarenheit);
  let temperatureUnits = document.querySelector("#current-temperature-units");
  temperatureUnits.innerHTML = "°F";
  isDegreesCelsius = false;
  return;
}

function celsiusConversion(event) {
  if(event){
    event.preventDefault();
  }
  var currentTemperature = document.querySelector("#current-temperature");
  let temperatureElement = Number(currentTemperature.innerHTML);
  let tempCelsius = Math.round(((temperatureElement - 32) * 5) / 9);
  currentTemperature.innerHTML = Number(tempCelsius);
  let temperatureUnits = document.querySelector("#current-temperature-units");
  temperatureUnits.innerHTML = "°C";
  isDegreesCelsius = true;
  return;
}
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