//Project Endpoint
projectData = {};

//Set up Express
const express = require('express');
//initaite express in our app
const app = express();
//Dependencies
//BodyParser
const bodyParser = require('body-parser');
//connect it as middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//cors for cross origin allowance
const cors = require('cors');
//connect it to our app
app.use(cors());

//Initialize main project folder 
app.use(express.static('weather_app'));

//SERVER
//Port
const port = 8000;
//spin up the server
const server = app.listen (port, listening);
//callback function listening for debugging
function listening() {
    console.log('server is running');
    console.log(`running in localhost: ${port}`);
};

//GET Request Route
app.get('/return', getData); 
function getData(req, res) {
    res.send(projectData);
};

//POST Request Route
app.post('/add', postData);
function postData(req, res) {
    projectData = req.body;
    req.send({message: 'Post received'});
    console.log(projectData);
}