
$(document).ready(function () {
    $('#courseSearch').keyup(function (e) {
        var regex = new RegExp("^[a-zA-Z0-9]+$");
        var input = this.value;
        if (regex.test(input)) {
            console.log(input);
            if (course.length > 2) {
                var reg2 = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
                if (reg2.test(course)) {
                    var URL = 'http://localhost:3000/search-course?searchQuery=' + input;
                    $.get(URL, function (response) {
                        console.log(response);
                    });
                }

            }
            return true;
        }

        e.preventDefault();
        return false;
    });
    $("#btn").on('click', function (e) { //Submit still doesnt get updated after backspace
        if (course.length > 2) {
            console.log(course);
        }

    });
});