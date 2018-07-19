'use strict'; 

var Client = require('node-rest-client').Client;
var client = new Client();

module.exports = {
    sendQueryToGriddy : function (query, onRequestCompleted){
        client.get("http://griddy.org/api/course?q=" + query, function (data) {
            onRequestCompleted(data);
        });
    }
}