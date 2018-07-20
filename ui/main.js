
$(document).ready(function(){
    var course = '';
    $('#courseSearch').keypress(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (regex.test(str)) {
            var char = String.fromCharCode(e.keyCode);
            console.log(char);
            course += char;
            
            if (course.length > 2){
                var URL = 'http://localhost:3000/search-course?searchQuery='+course;
                httpGetAsync(URL, function(response){
                    console.log(response);
                });
            }
            return true;
        }
    
        e.preventDefault();
        return false;
    });
    $("#btn").on('click', function(e){
        if (course.length > 2){
            console.log(course);
        }
        
    });

    function httpGetAsync(theUrl, callback)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.send(null);
    }
});