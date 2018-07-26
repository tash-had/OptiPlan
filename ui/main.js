
$(document).ready(function () {
    var input = '';
    $('#courseSearch').keyup(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        input = this.value;
        if (regex.test(input)) {
            console.log(input);
            if (input.length > 2) {
                var reg2 = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
                if (reg2.test(input)) {
                    var URL = 'http://localhost:3000/search-course?searchQuery=' + input;
                    $.get(URL, function (response) {
                        getCourses(response);
                    });
                }

            }
            return true;
        }

        e.preventDefault();
        return false;
    });
    $("#btn").on('click', function (e) { //Submit still doesnt get updated after backspace
        if (input.length > 2) {
            console.log(input);
        }

    });
});

function getCourses(data){
    var course_array = [];
    for (i in data){
        course_array.push(data[i].course);
        
    }
    console.log(course_array);
    
}