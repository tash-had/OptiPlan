'use-strict';

var searchService = require("../services/search-service"); 

exports.searchCourse = function(req, res){
    searchService.sendQueryToGriddy(req.query.searchQuery, function(data){
        var matchingCourses = searchService.parseGriddyResponse(data); 
        res.send(matchingCourses); 
    }); 
};