var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
var chosenCourses = [];
var courseChosenHandler;

$(document).ready(function () {
    var input = '';

    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    $('#courseSearch').on('input', function (e) {
        input = this.value;
        if (input && input.length > 3 && COURSE_MATCHER.test(input)) {
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
    var disableArrowSelection = false;

    courseChosenHandler = function (courseId, courseName) {
        console.log(courseId, courseName);
        if (chosenCourses.indexOf(courseId) < 0) {
            chosenCourses.push(courseId);
            // Remove from search results
            console.log(courseId, courseName, chosenCourses);
        }
        $('.autocomplete input').val(courseId).focus();
    };

    initDialog(dataArr);
    function initDialog(courses) {
        numOptions = courses.length;
        $('.dialog').empty();
        for (var course of courses) {
            if (chosenCourses.indexOf(course.id) < 0) {
                var courseName = "'" + course.courseFullName.replaceAll(":", "") + "'";
                $('.dialog').append('<div data-id=' + course.id + ' onclick="courseChosenHandler(' + course.id + ', ' + courseName +
                    ');">' + courseName + '</div>');
            }
        }
        $('.dialog').addClass('open');
        dropdownOpen = true;
        trackArrowKeysAndEnterBtn();
    }

    function trackArrowKeysAndEnterBtn() {
        $('.autocomplete').keydown(function (e) {
            e.stopPropagation();
            switch (e.which) {
                case 13: // enter button 
                    var elem = $('.dialog > div').eq(currentlySelected);
                    // chooseOption(elem.attr('data-id'), elem[0].innerHTML);
                    courseChosenHandler(elem.attr('data-id'), elem[0].innerHTML);
                    break;
                case 38: // up
                    selectOptionWithIndex(-1);
                    break;
                case 40: // down
                    selectOptionWithIndex(1);
                    break;
                default: return;
            }
        });
    }

    function selectOptionWithIndex(change) {
        if ((currentlySelected < 1 && change < 1) ||
            (currentlySelected === numOptions - 1 && change > -1) ||
            !dropdownOpen || disableArrowSelection) {
            return;
        }
        var scrollDivisor = 1.20;
        if (change == -1) {
            scrollDivisor = 2;
        }
        var options = $('.dialog > div');
        var currentSelection = options.eq(currentlySelected);
        currentSelection.removeClass('selected');
        currentSelection.removeAttr('id');
        currentlySelected += change;
        var newSelection = options.eq(currentlySelected);
        newSelection.addClass('selected');
        newSelection.attr('id', 'selectedItem');
        $('.dialog').animate({
            scrollTop: $("#selectedItem").offset().top / scrollDivisor
        }, 100);
        $('.autocomplete input').val(newSelection[0].innerHTML);
        $('.autocomplete input').css('color', '#757575');
    }

    function toggleSearchResultsDialog(forceClose) {
        $('.dialog > div').eq(currentlySelected).removeAttr("selectedItem");
        if (forceClose) {
            $('.dialog').removeClass('open');
            dropdownOpen = false;
        } else {
            $('.dialog').toggleClass('open');
            dropdownOpen = !dropdownOpen;
        }
    }

    function chooseOption(courseId, courseName) {
        console.log(courseId, courseName); 
        if (chosenCourses.indexOf(courseId) < 0) {
            chosenCourses.push(courseId);
            // Remove from search results
            chosenCourses.splice(parseInt(resultIdx), 1);
            console.log(courseId, resultIdx, chosenCourses);
        }
        $('.autocomplete input').val(element.text()).focus();
        toggleSearchResultsDialog(true);
    }

    // Click in the document body (not the search dialog or input box)
    $('body').click(function (e) {
        e.stopPropagation();
        toggleSearchResultsDialog(true);
    });

    // Click inside the options dialog
    // $('body').on('click', '.dialog > div', function (e) {
    //     e.stopPropagation();
    //     chooseOptionWithElement($(this))
    // });

    // Click inside the input box
    $('body').on('click', '.autocomplete input', function (e) {
        e.stopPropagation();
        toggleSearchResultsDialog();
    });

    function match(str) {
        str = str.toLowerCase();
        clearDialog();
        for (var key in arr) {
            if (key.toLowerCase().startsWith(str)) {
                $('.dialog').append('<div>' + key + '</div>');
            }
        }
    }
}