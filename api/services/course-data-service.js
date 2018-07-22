'use strict';

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
    sendQueryToGriddy: function (courseId, onRequestCompleted) {
        client.get("http://griddy.org/api/course?id=" + courseId, function (data) {
            onRequestCompleted(data);
        });
    },
    parseGriddyResponse: function (data) {
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
}