var timetable;
var timetableUI;

$(document).ready(function () {
    timetableUI = new TimetableUI();
    timetable = new Timetable();
});

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.getArrayWithout = function (elementToExclude) {
    return this.filter(e => e !== elementToExclude);
}

class TimetableUI {
    addCourseWithElement(courseElement) {
        var courseId = courseElement.attr("data-course-id");
        var course = new Course(courseId, function () {
            course.courseShortenedName = courseElement[0].innerHTML.split("</span>")[1];
            timetable.addCourse(course);
            timetableUI.addCourseToView(course);
        });
        $('.autocomplete input').val("").focus();
        searchDropdown.toggleSearchResultsDialog(true);
    }

    addCourseToView(course) {
        var badgeAttrs = getBadgeAttrs(course); 
        var courseHtml = '<li class="collection-item" data-course-id=' + course.courseId + '>\
            <div><span class="new badge ' + badgeAttrs.color + '" style="margin-right:5px;float:left;" \
            data-badge-caption="' + badgeAttrs.season + '"></span>' + course.courseShortenedName + '\
            <i class="material-icons delete-icon">delete</i></div></li>';
        if (badgeAttrs.season === "Fall"){
            $(".collection").prepend(courseHtml);
        }else{
            $(".collection").append(courseHtml);
        }
        this.setDeleteCourseListener();
        searchDropdown.chosenCourseIds.push(course.courseId); 
    }

    setDeleteCourseListener() {
        $('.delete-icon').off('click');
        $('.delete-icon').on('click', function (e) {
            var idToRemove = $(this).closest('li').attr('data-course-id');
            var course = timetable.getCourseWithId(idToRemove);
            searchDropdown.chosenCourseIds = searchDropdown.chosenCourseIds.getArrayWithout(idToRemove);
            $(this).closest('li').remove();
            timetable.removeCourse(course);
        });
    }
}