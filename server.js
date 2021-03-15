// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Callback function to complete GET '/all'
function sendData (req, res) {
  res.send(projectData);
}

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/*Dependencies*/
const cors = require('cors');
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 8000;

// Setup Server
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

// POST Callback to debug
function callback(req, res) {
  projectData.temp = req.body.temp;
  projectData.userResponse = req.feelings;
}

// Initialize all route with a callback function
app.get('/all', sendData);

// POST Route
app.post('/add', callback);