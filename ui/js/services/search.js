var SEARCH_COURSE_API = 'http://localhost:3000/search-course?searchQuery=';
var COURSE_MATCHER = new RegExp("^[a-zA-Z]{3}[0-9]{1,3}$");
var searchDropdown, timetableUI;

$(document).ready(function () {
    searchDropdown = new SearchDropdown();

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
        this.chosenCourseIds = [];
    }

    initSearchDialog(courses) {
        this.resetDropdownAttributes();
        this.numOptions = courses.length;
        $('.search-dialog').empty();
        for (var course of courses) {
            course.id = getIntCourseId(course.id);
            var badgeAttrs = getBadgeAttrs(course);
            $('.search-dialog').append('<div data-course-id=' + course.id +
                '><span class="new badge ' + badgeAttrs.color + '"data-badge-caption="' +
                badgeAttrs.season + '"></span>' + course.courseFullName.replaceAll(":", "") + '</div>');
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
        // set input value to the course code but first remove the code for the season badge
        $('.autocomplete input').val(newSelection[0].innerHTML.split("</span>")[1].split(" ")[0]);
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
                    searchDropdown.onChoose($('.search-dialog > div').eq(this.currentlySelected));
                    break;
                case 38: // up
                    e.preventDefault();
                    searchDropdown.selectOptionWithIndex(-1);
                    break;
                case 40: // down
                    searchDropdown.selectOptionWithIndex(1);
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
            searchDropdown.onChoose($(this));
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

    onChoose(clickedElement) {
        var courseId = clickedElement.attr("data-course-id"); 
        if (this.chosenCourseIds.indexOf(courseId) < 0) {
            this.chosenCourseIds.push(course.courseId); 
            timetableUI.addCourseWithElement(clickedElement, true);
        }
        this.toggleSearchResultsDialog(true);
    }
}