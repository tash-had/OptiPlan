'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
    sendQueryToGriddy: function (query, onRequestCompleted) {
        client.get("http://griddy.org/api/course?q=" + query, function (data) {
            onRequestCompleted(data);
        });
    },
    parseGriddyResponse: function (data) {
        var resultsArr = data.CodeNameMatches.split("</li>");
        var matchingCourses = []
        for (var i = 0; i < resultsArr.length - 1; i++) { // last element is always ""
            var courseAsListItem = resultsArr[i];
            var courseCode = courseAsListItem.substring(courseAsListItem.indexOf(">") + 1, courseAsListItem.indexOf(":"));
            var courseFullName = courseAsListItem.substring(courseAsListItem.indexOf(">") + 1);

            courseAsListItem = courseAsListItem + "</li>"; // end tag got deleted in the split
            var course = {
                course: courseCode,
                courseFullName: courseFullName,
                html: courseAsListItem
            };
            matchingCourses.push(course);
        }
        return matchingCourses;
    }
}