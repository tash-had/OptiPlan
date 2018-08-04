var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
var searchDropdown, courseSelectionListener;
var chosenCourses = [];

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$(document).ready(function () {
    searchDropdown = new SearchDropdown();
    courseSelectionListener = new CourseSelectionListener();

    $('#courseSearch').on('input', function (e) {
        var input = this.value;
        if (input && input.length > 3 && COURSE_MATCHER.test(input)) {
            var URL = SEARCH_COURSE_API + input;
            $.get(URL, function (response) {
                searchDropdown.initSearchDialog(response);
            });
            return true;
        }
        return false;
    });

});

class SearchDropdown {
    constructor() {
        this.currentlySelected;
        this.numOptions;
        this.dropdownOpen;
        this.disableArrowSelection;
    }

    initSearchDialog(courses) {
        this.resetDropdownAttributes();
        this.numOptions = courses.length;
        $('.search-dialog').empty();
        for (var course of courses) {
            if (chosenCourses.indexOf(course.id) < 0) {
                $('.search-dialog').append('<div data-course-id=' + course.id + '>' +
                    course.courseFullName.replaceAll(":", "") + '</div>');
            }
        }
        $('.search-dialog').addClass('open');
        this.dropdownOpen = true;
        this.resetEventListeners();
    }

    selectOptionWithIndex(arrowDirection) {
        if ((this.currentlySelected < 1 && arrowDirection < 1) ||
            (this.currentlySelected === this.numOptions - 1 && arrowDirection > -1) ||
            !this.dropdownOpen || this.disableArrowSelection) {
            return;
        }
        var options = $('.search-dialog > div');
        var currentSelection = options.eq(this.currentlySelected);
        currentSelection.removeClass('selected');
        currentSelection.removeAttr('id');
        this.currentlySelected += arrowDirection;
        this.startSelectOptionVisuals(options, arrowDirection);
    }

    startSelectOptionVisuals(searchResults, arrowDirection) {
        var newSelection = searchResults.eq(this.currentlySelected);
        newSelection.addClass('selected');
        newSelection.attr('id', 'selectedItem');

        var scrollDivisor = 1.20;
        if (arrowDirection == -1) {
            scrollDivisor = 2;
        }
        $('.search-dialog').animate({
            scrollTop: newSelection.offset().top / scrollDivisor
        }, 100);
        $('.autocomplete input').val(newSelection[0].innerHTML);
        $('.autocomplete input').css('color', '#757575');
    }

    toggleSearchResultsDialog(forceClose) {
        $('.search-dialog > div').eq(this.currentlySelected).removeAttr("selectedItem");
        if (forceClose) {
            $('.search-dialog').removeClass('open');
            this.dropdownOpen = false;
        } else {
            $('.search-dialog').toggleClass('open');
            this.dropdownOpen = !this.dropdownOpen;
        }
    }

    setKeyListeners() {
        $('.autocomplete').keydown((e) => {
            e.stopPropagation();

            switch (e.which) {
                case 13: // enter button 
                    courseSelectionListener.addCourse($('.search-dialog > div').eq(this.currentlySelected));
                    break;
                case 38: // up
                    this.selectOptionWithIndex(-1);
                    break;
                case 40: // down
                    this.selectOptionWithIndex(1);
                    break;
                default: return;
            }
        });
    }

    setClickListeners() {
        // Click in the document body (not the search dialog or input box)
        $('body').click((e) => {
            e.stopPropagation();
            searchDropdown.toggleSearchResultsDialog(true);
        });

        // Click inside the options dialog
        $('body').on('click', '.search-dialog > div', function (e) {
            e.stopPropagation();
            courseSelectionListener.addCourse($(this))
        });

        // Click inside the input box
        $('body').on('click', '.autocomplete input', function (e) {
            e.stopPropagation();
            searchDropdown.toggleSearchResultsDialog();
        });
    }

    removeEventListeners() {
        $('div.autocomplete').off('keydown');
        $('.autocomplete input').off('click');
        $('.search-dialog > div').off('click');
        $('body').off('click');
    }

    resetEventListeners() {
        this.removeEventListeners();
        this.setClickListeners();
        this.setKeyListeners();
    }

    resetDropdownAttributes() {
        this.currentlySelected = -1;
        this.numOptions = 0;
        this.dropdownOpen = false;
        this.disableArrowSelection = false;
    }
}

class CourseSelectionListener {
    addCourse(courseElement) {
        var courseId = courseElement.attr("data-course-id");
        if (chosenCourses.indexOf(courseId) < 0) {
            chosenCourses.push(courseId);
            $(".collection").append('<li class="collection-item" data-course-id=' + courseId + '>\
            <div>'+ courseElement[0].innerHTML + '\
            <i class="material-icons deleteIcon">delete</i></div></li>');
        }
        $('.autocomplete input').val("").focus();
        this.setDeleteCourseListener();
        searchDropdown.toggleSearchResultsDialog(true);
    }

    setDeleteCourseListener() {
        $('.deleteIcon').on('click', function(e) {
            var idToRemove = $(this).closest('li').attr('data-course-id');
            chosenCourses = courseSelectionListener.removeFromArr(chosenCourses, idToRemove);
            $(this).closest('li').remove();
        });
    }

    removeFromArr(array, element) {
        return array.filter(e => e !== element);
    }
}