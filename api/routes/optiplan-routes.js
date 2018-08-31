'use strict';

module.exports = function (app) {
    var timetableController = require('../controllers/timetable-controller'),
        searchController = require('../controllers/search-controller'),
        testController = require("../controllers/tc");
    // set routes 
    app.route("/timetable")
        .get(timetableController.generateTimetable)
        .post(timetableController.saveTimetable);

    app.route("/search-course")
        .get(searchController.courseSearch);

    app.route("/course")
        .get(searchController.courseDataSearch);

    app.route("/test")
        .get(testController.testFunc);
};