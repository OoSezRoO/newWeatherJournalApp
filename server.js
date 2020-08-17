// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;
const server = app.listen(port, listening );

// Callback to debug
function listening(){
    console.log(`The Server running well on port : ${port} Only`);
};

// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get('/getData', function(request , response ){
    response.send(projectData);
});

// Post Route

app.post('/postData' , function (request , response){
    projectData = {
        date : request.body.date,
        temp : request.body.temp,
        content : request.body.content
    }
    response.send(projectData);
    console.log(request.body);
});