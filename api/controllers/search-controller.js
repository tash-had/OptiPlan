'use-strict';

var searchService = require("../services/search-service");
var endpoints = searchService.ENDPOINTS;

exports.courseSearch = function (req, res) {
    var urlParams = req.query.searchQuery + "&section=&studyyear=&daytime=&weekday=&prof=&breadth=&online=&waitlist=&available=&title=";
    searchService.sendQueryToUofT(endpoints.courseSearch, urlParams, function (data) {
        res.send(searchService.parseCourseSearchResults(data));
    });
};

exports.courseDataSearch = function (req, res) {
    searchService.sendQueryToUofT(endpoints.courseDataSearch, req.query.courseId, function (data) {
        res.send(searchService.parseCourseData(data));   
    });
};