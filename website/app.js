/* Global Variables */
// Base URL
const baseURL = 'api.openweathermap.org/data/2.5/forecast?zip='
// Personal API Key for OpenWeatherMap API
const apiKEY = '&appid=5114736c30201eaa8f7077eacdeb3fe5'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', generate)

/* Function called by event listener */
function generate (el) {
  const zipCode = document.getElementById('zip').value;
  getWeather(baseURL, zipCode, apiKEY)
}

/* Function to GET Web API Data*/
const getWeather = async(baseURL, zipCode, key) => {
  const res = await fetch (baseURL+zipCode+key)
  try {
    const weather = await res.json();
    console.log(weather);
    return weather;
  } catch(err) {
    console.log('error', error)
  }
}