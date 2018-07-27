'use-strict';

var searchService = require("../services/search-service");
var endpoints = searchService.ENDPOINTS;

exports.courseSearch = function (req, res) {
    searchService.sendQueryToGriddy(endpoints.courseSearch, req.query.searchQuery, function (data) {
        res.send(searchService.parseCourseSearchResults(data));
    });
};

exports.courseDataSearch = function (req, res) {
    searchService.sendQueryToGriddy(endpoints.courseDataSearch, req.query.courseId, function (data) {
        res.send(searchService.parseCourseData(data));
    });
};