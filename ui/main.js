var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");

$(document).ready(function () {
    var input = '', lastSearch = '';
    $('#courseSearch').keyup(function (e) {
        input = this.value;
        if (input && input != lastSearch && input.length > 3 && COURSE_MATCHER.test(input)) {
            lastSearch = input;
            var URL = SEARCH_COURSE_API + input;
            displayDropdown([]);
            $.get(URL, function (response) {
                displayDropdown(response);
            });
            return true;
        }

        e.preventDefault();
        return false;
    });
});

function displayDropdown(arr) {
    console.log("GO"); 
    $('.dialog').append('<div>' + "ABC" + '</div>');        
    var alreadyFilled = false;
    for (var key of arr) {
        $('.dialog').append('<div>' + key.courseCode + '</div>');
    }
    function clearDialog() {
        $('.dialog').empty();
    }

    $('.autocomplete input').click(function () {
        if (!alreadyFilled) {
            $('.dialog').addClass('open');
        }
    });

    $('body').on('click', '.dialog > div', function () {
        $('.autocomplete input').val($(this).text()).focus();
        $('.autocomplete .close').addClass('visible');
        console.log("CLICKED"); 
        alreadyFilled = true;
    });

    $('.autocomplete .close').click(function () {
        alreadyFilled = false;
        $('.dialog').addClass('open');
        $('.autocomplete input').val('').focus();
        $(this).removeClass('visible');
        console.log("CLOSED"); 
    });

    $('.autocomplete input').on('input', function () {
        $('.dialog').addClass('open');
        alreadyFilled = false;
        console.log("OPENED"); 

    });

    $('body').click(function (e) {
        if (!$(e.target).is("input, .close")) {
            $('.dialog').removeClass('open');
        console.log("DESTROYED"); 
        }
    });
    // initDialog();
}