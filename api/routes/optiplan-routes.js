'use strict'; 

module.exports = function(app){
    var timetableController = require('../controllers/timetable-controller');
    var searchController = require('../controllers/search-controller');

    // set routes 
    app.route("/timetable")
        .get(timetableController.generateTimetable)
        .post(timetableController.saveTimetable);

    app.route("/search-course")
        .get(searchController.searchCourse)
}