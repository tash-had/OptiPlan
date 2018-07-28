'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();
// const GRIDDY_BASE = "http://griddy.org/api/";
const GRIDDY_BASE = "http://localhost:3001/griddy";

module.exports = {
    ENDPOINTS: {
        courseSearch: GRIDDY_BASE + "/course?q=",
        courseDataSearch: GRIDDY_BASE + "/course?id="
    },

    sendQueryToGriddy: function (endpoint, params, onRequestCompleted) {
        client.get(endpoint + params, function (data) {
            onRequestCompleted(data);
        });
    },

    parseCourseSearchResults: function (data) {
        if (!data || !data.CodeNameMatches){
            return []
        }
        var resultsArr = data.CodeNameMatches.split("</li>");
        var matchingCourses = []
        for (var i = 0; i < resultsArr.length - 1; i++) { // last element is always ""
            var courseAsListItem = resultsArr[i];
            var courseCode = courseAsListItem.substring(courseAsListItem.indexOf(">") + 1, courseAsListItem.indexOf(":"));
            var courseFullName = courseAsListItem.substring(courseAsListItem.indexOf(">") + 1);
            var courseID = courseAsListItem.substring(courseAsListItem.indexOf('=') + 1, courseAsListItem.indexOf('class') - 1);

            courseAsListItem = courseAsListItem + "</li>"; // end tag got deleted in the split
            var course = {
                courseCode: courseCode,
                courseFullName: courseFullName,
                html: courseAsListItem,
                id: courseID
            };
            matchingCourses.push(course);
        }
        return matchingCourses;
    },

    parseCourseData: function (data) {
        var course = {
            courseCode: data.Abbr,
            courseFullName: data.Name,
            campus: data.Campus,
            id: data.ID,
            semester: data.Semester,
            sections: data.Sections
        };
        return course;
    }
};