'use strict'; 

module.exports = function(app){
    var controller = require('../controllers/timetable-controller');

    // set routes 
    app.route("/timetable")
        .get(controller.generateTimetable)
        .post(controller.saveTimetable);
}