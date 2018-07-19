'use-strict';

var searchService = require("../services/search-service"); 

exports.searchCourse = function(req, res){
    var response = searchService.sendQueryToGriddy(req.query.searchQuery, function(data){
        res.send(data.CodeNameMatches); 
    }); 
};

