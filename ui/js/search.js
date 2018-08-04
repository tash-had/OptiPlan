var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
var chosenCourses = [];

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

    initDialog(dataArr);

    function initDialog(courses) {
        numOptions = courses.length;
        $('.dialog').empty();
        for (var course of courses) {
            if (chosenCourses.indexOf(course.id) < 0) {
                $('.dialog').append('<div data-course-id=' + course.id + '>' +
                    course.courseFullName.replaceAll(":", "") + '</div>');
            }
        }
        $('.dialog').addClass('open');
        dropdownOpen = true;
        resetEventListeners(); 
    }

    function trackArrowKeysAndEnterBtn() {
        $('.autocomplete').keydown(function (e) {
            e.stopPropagation();

            switch (e.which) {
                case 13: // enter button 
                    chooseOptionWithElement($('.dialog > div').eq(currentlySelected));
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

    function selectOptionWithIndex(arrowDirection) {
        if ((currentlySelected < 1 && arrowDirection < 1) ||
            (currentlySelected === numOptions - 1 && arrowDirection > -1) ||
            !dropdownOpen || disableArrowSelection) {
            return;
        }
        var options = $('.dialog > div');
        var currentSelection = options.eq(currentlySelected);
        currentSelection.removeClass('selected');
        currentSelection.removeAttr('id');
        currentlySelected += arrowDirection;
        startSelectOptionVisuals(options, arrowDirection);
    }

    function startSelectOptionVisuals(searchResults, arrowDirection) {
        var newSelection = searchResults.eq(currentlySelected);
        newSelection.addClass('selected');
        newSelection.attr('id', 'selectedItem');

        var scrollDivisor = 1.20;
        if (arrowDirection == -1) {
            scrollDivisor = 2;
        }
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

    function chooseOptionWithElement(element) {
        var courseId = element.attr("data-course-id");
        if (chosenCourses.indexOf(courseId) < 0) {
            chosenCourses.push(courseId);
            console.log(chosenCourses);
            $(".collection").append('<li class="collection-item" data-course-id=' + courseId + '>\
            <div>'+ element[0].innerHTML + '\
            <i class="material-icons deleteIcon">delete</i></div></li>');
        }
        $('.autocomplete input').val("").focus();
        deleteCourseListener();

        toggleSearchResultsDialog(true);
    }

    function deleteCourseListener() {
        $('.deleteIcon').on('click', function (e) {
            var IDtoRemove = $(this).closest('li').attr('data-course-id');
            chosenCourses = removeFromArr(chosenCourses, IDtoRemove);
            console.log(chosenCourses);
            $(this).closest('li').remove();
        });
    }

    function setClickListeners() {
        // Click in the document body (not the search dialog or input box)
        $('body').click(function (e) {
            e.stopPropagation();
            toggleSearchResultsDialog(true);
        });

        // Click inside the options dialog
        $('body').on('click', '.dialog > div', function (e) {
            e.stopPropagation();
            chooseOptionWithElement($(this))
        });

        // Click inside the input box
        $('body').on('click', '.autocomplete input', function (e) {
            e.stopPropagation();
            toggleSearchResultsDialog();
        });
    }

    function removeEventListeners() {
        $('div.autocomplete').off('keydown');
        $('.autocomplete input').off('click');
        $('.dialog > div').off('click');
        $('body').off('click');
    }

    function resetEventListeners() {
        removeEventListeners(); 
        setClickListeners(); 
        trackArrowKeysAndEnterBtn();
    }

    function removeFromArr(array, element) {
        return array.filter(e => e !== element);
    }
}