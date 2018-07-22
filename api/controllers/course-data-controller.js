'use-strict';

var courseDataService = require("../services/course-data-service"); 

exports.getCourseData = function(req, res){
    courseDataService.sendQueryToGriddy(req.query.courseId, function(data){
        var matchingCourses = courseDataService.parseGriddyResponse(data); 
        res.send(matchingCourses); 
    }); 
};

