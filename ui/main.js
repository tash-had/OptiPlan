var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");

$(document).ready(function () {
    var input = '', lastSearch = '';

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    $('#courseSearch').on('input', function (e) {
        input = this.value;
        if (input && input.length > 3 && input != lastSearch && COURSE_MATCHER.test(input)) {
            lastSearch = input;
            var URL = SEARCH_COURSE_API + input;
            $.get(URL, function (response) {
                displayDropdown(response);
            });
            return true;
        }
        return false;
    });
});

function displayDropdown(dataArr) {
    var currentlySelected = -1;
    var numOptions = 0;
    var dropdownOpen = false;

    initDialog(dataArr);

    function initDialog(courses) {
        numOptions = courses.length;
        $('.dialog').empty();
        for (var course of courses) {
            $('.dialog').append('<div data-course-id="' + course.id + '">' +
                course.courseFullName.replaceAll(":", "") + '</div>');
        }
        $('.dialog').addClass('open');
        dropdownOpen = true;
        trackArrowKeys();
    }

    function trackArrowKeys() {
        $('.autocomplete').keydown(function (e) {
            e.stopPropagation();
            switch (e.which) {
                case 38: // up
                    selectOption(-1);
                    break;
                case 40: // down
                    selectOption(1);
                    break;

                default: return;
            }
        });
    }

    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var key in arr) {
            if (key.toLowerCase().startsWith(str)) {
                $('.dialog').append('<div>' + key + '</div>');
            }
        }
    }

    $('.autocomplete .close').click(function () {
        alreadyFilled = false;
        $('.dialog').addClass('open');
        $('.autocomplete input').val('').focus();
        $(this).removeClass('visible');
        console.log("CLOSED");
    });

    function selectOption(change) {
        if (currentlySelected < 1 && change < 1 ||
            currentlySelected === numOptions - 1 && change > -1 ||
            !dropdownOpen) {
            return;
        }
        var scrollDivisor = 1.20;
        if (change == -1) {
            scrollDivisor = 2;
        }
        var options = $('.dialog > div');
        options.eq(currentlySelected).removeClass('selected');
        options.eq(currentlySelected).removeAttr('id');
        currentlySelected += change;
        var newSelection = options.eq(currentlySelected);
        newSelection.addClass('selected');
        newSelection.attr('id', 'selectedItem');
        $('.dialog').animate({
            scrollTop: $("#selectedItem").offset().top / scrollDivisor
        }, 100);
        $('.autocomplete input').val(newSelection[0].innerHTML);
    }

    $('body').on('click', '.dialog > div', function (e) {
        $('.autocomplete input').val($(this).text()).focus();
        console.log($(this).attr("data-course-id")); 

    });

    $('body').click(function (e) {
        $('.dialog').removeClass('open');
        dropdownOpen = false;
    });
}