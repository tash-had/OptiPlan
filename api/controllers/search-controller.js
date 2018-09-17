'use-strict';

var searchService = require("../services/search-service");
var endpoints = searchService.ENDPOINTS;

exports.courseSearch = function (req, res) {
   
    // Search Options for the user 
    var org = req.query.department,
    code = req.query.courseCode,
    section = req.query.section,
    studyYear = req.query.studyyear,
    dayTime = req.query.daytime,
    weekDay = req.query.weekday,
    prof = "",
    breadth = req.query.breadth,
    online = "",
    waitlist = "",
    available = "",
    title = ""
    ;
    
    // Adding search options to the url to be sent to U of T API
    var searchApiUrl = "org="+ org
    +"&code=" + code
    +"&section="+ section
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
    console.log(searchApiUrl);

    // Sending the json response to search service to parse the course search data according to UI
    searchService.sendQueryToUofT(endpoints.courseSearch, searchApiUrl, function (data) {
        res.send(searchService.parseCourseSearchResults(data));
    });

};

exports.courseDataSearch = function (req, res) {
    searchService.sendQueryToUofT(endpoints.courseDataSearch, req.query.courseId, function (data) {
        res.send(searchService.parseCourseData(data));   
    });
};