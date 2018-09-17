'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();

var today = new Date();
var year = today.getFullYear();
const MONTH = "9";
const UOFT_BASE = "https://timetable.iit.artsci.utoronto.ca/api/" + year + MONTH + "/courses?";
// const UOFT_BASE = "http://localhost:3001/uoft"; // MOCK URL

module.exports = {
    ENDPOINTS: {
        courseSearch: UOFT_BASE,
        courseDataSearch: UOFT_BASE + "/courses?org=&code="
    },

    sendQueryToUofT: function (endpoint, params, onRequestCompleted) {
        client.get(endpoint + params, function (data) {
            onRequestCompleted(data);
        });
    },

    parseCourseSearchResults: function (data) {

        if (!data) {
            return []
        } 
        var matchingCourses = []
        // Parsing the course data received from U of T response 
        for ( var course in data){
            var courseCode = data[course].code + data[course].section;
            var courseFullName = data[course].courseTitle;
            var course = {
                        courseCode: courseCode,
                        courseShortenedName: courseFullName,
                        id: courseCode
            };
            matchingCourses.push(course);
        }
        return matchingCourses;
    },

    // The UI is not currently using the rest of the course data. 
    // So there's no point in sending it. 
    parseCourseData: function (data) {

        var courseInfo = {
            fallSection: data.PHY151H1-F-20189
        };

        var course = {
            courseCode: courseInfo.code,
            courseFullName: courseInfo.courseTitle,
            campus: courseInfo.Campus,
            // id: data.ID,
            semester: courseInfo.section,
            sections: courseInfo.meetings
        };
        return course;
    }
};