/* Global Variables */
// Base URL
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// Personal API Key for OpenWeatherMap API
const apiKEY = '&appid=5114736c30201eaa8f7077eacdeb3fe5'

let feelings = document.getElementById('feelings');
let date = document.getElementById('date');
let content = document.getElementById('content');
let temp = document.getElementById('temp');

document.getElementById('generate').addEventListener('click', generate)

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function called by event listener */
function generate () {
  const zipCode = document.getElementById('zip').value;
  if (!zipCode) {
    alert('Please Enter Zipcode');
    return false;
  }
  getWeather(baseURL, zipCode, apiKEY)
    .then((data) => {
      postData('/add', {
        temp: data.main.temp,
        feelings: feelings.value
      })
    }).then(() => updateUI())
}

/* Function to GET Web API Data*/
const getWeather = async(baseURL, zipCode, key) => {
  const res = await fetch (baseURL+zipCode+key+'&units=metric')
  try {
    const data = await res.json();
    return data;
  } catch(err) {
    console.log('error', err)
  }
}

/* Function to POST data */
const postData = async(url='', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  try {
    const newdata = await res.json();
    console.log(newdata);
    return newdata;
  } catch (err) {
      console.log("error", err)
  }
}

/* Function to GET Project Data */
const updateUI = async () => {
  const req = await fetch('/all');
  try {
    const weatherData = await req.json();
    temp.innerHTML = `Today's weather is: ${weatherData.temp} celsius`;
    date.innerHTML = `Today's date is: ${newDate}`;
    content.innerHTML = `You're feeling: ${weatherData.userResponse}`;
  } catch (err) {
    console.log(err)
  }
}