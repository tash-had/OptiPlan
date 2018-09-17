'use strict';

var express = require('express');
var mongoose = require('mongoose');
var timetable = require('./models/timetable-model');
var bodyParser = require('body-parser');
var routes = require('./routes/optiplan-routes');
var cors = require('cors');

var app = express();
var port = process.env.port || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/optiplanDB',  { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);
app.listen(port);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' });
});