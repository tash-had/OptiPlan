'use strict';

module.exports = function (app) {
    var timetableController = require('../controllers/timetable-controller'),
        searchController = require('../controllers/search-controller'),
        courseDataController = require('../controllers/course-data-controller');

    // set routes 
    app.route("/timetable")
        .get(timetableController.generateTimetable)
        .post(timetableController.saveTimetable);

    app.route("/search-course")
        .get(searchController.searchCourse)

    app.route("/course")
        .get(courseDataController.getCourseData)
}