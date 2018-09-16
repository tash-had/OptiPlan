'use-strict';

var searchService = require("../services/search-service");
var endpoints = searchService.ENDPOINTS;

exports.courseSearch = function (req, res) {

    var section = "F",
    studyYear = "",
    dayTime = "",
    weekDay = "",
    prof = "",
    breadth = "",
    online = "",
    waitlist = "",
    available = "",
    title = ""
    ;
    
    var searchApiUrl = 
    "&section="+ section
    +"&studyyear="+ studyYear
    +"&daytime="+ dayTime
    +"&weekday="+ weekDay
    +"&prof="+ prof
    +"&breadth="+ breadth
    +"&online="+ online
    +"&waitlist="+ waitlist
    +"&available="+ available
    +"&title="+ title
    ;
    var urlParams = req.query.code + searchApiUrl; 
    searchService.sendQueryToUofT(endpoints.courseSearch, urlParams, function (data) {
        res.send(searchService.parseCourseSearchResults(data));
    });
};

exports.courseDataSearch = function (req, res) {
    searchService.sendQueryToUofT(endpoints.courseDataSearch, req.query.courseId, function (data) {
        res.send(searchService.parseCourseData(data));   
    });
};