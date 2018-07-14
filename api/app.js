'use strict';

var express = require('express');
var mongoose = require('mongoose');
var timetable = require('./models/timetable-model');
var bodyParser = require('body-parser');
var routes = require('./routes/timetable-routes');


var app = express(); 
var port = process.env.port || 3000; 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/optiplanDB');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app); 
app.listen(port); 
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});