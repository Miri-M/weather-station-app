const weather = { 
  getPrompt: (cityUserInput) => {
    if (!cityUserInput) {
      return `You haven't entered a valid city name, please try again.`;
    } 
    
    const cityWeather = weather.data[cityUserInput];
    if (!cityWeather) {
      return `Sorry, we do not have weather information for ${cityUserInput}. Try going to \nhttps://www.google.com/search?q=weather+${cityUserInput}`;
    } 
    
    const city = cityUserInput.replace(cityUserInput[0], cityUserInput[0].toUpperCase());
    const tempFarenheit = Math.round((cityWeather.temp * 9) / 5 + 32);
    return `The current temperature in ${city} is ${cityWeather.temp}°C (${tempFarenheit}°F), with a humidity of ${cityWeather.humidity}%.`;
  },
  data:{
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    moscow: {
      temp: -5,
      humidity: 20
    }
  }
};

// write your code here
let cityUserInput = prompt("Enter a city") || "";
cityUserInput = cityUserInput.toLowerCase().trim();
const response = weather.getPrompt(cityUserInput);
alert(response);

/*
if (!cityUserInput) {
  alert(`You haven't entered a valid city name, please try again.`);
} 

const cityWeather = weather[cityUserInput];
if (!cityWeather) {
  alert(
    `Sorry, we do not have weather information for ${cityUserInput}. Try going to \nhttps://www.google.com/search?q=weather+${cityUserInput}`
  );
} 

const city = cityUserInput.replace(cityUserInput[0], cityUserInput[0].toUpperCase());
let tempFarenheit = Math.round((cityWeather.temp * 9) / 5 + 32);
alert(
  `The current temperature in ${city} is ${cityWeather.temp}°C (${tempFarenheit}°F), with a humidity of ${cityWeather.humidity}%.`
);
*/