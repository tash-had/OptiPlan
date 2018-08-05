var timetable;
var timetableUI;

$(document).ready(function () {
    timetableUI = new TimetableUI();
    timetable = new Timetable();
});

String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.remove = function (element) {
    return this.filter(e => e !== element);
}

class TimetableUI {
    addCourseWithElement(courseElement) {
        var courseId = courseElement.attr("data-course-id");
        if (chosenCourseIds.indexOf(courseId) < 0) {
            var course = new Course(courseId, function () {
                course.courseShortenedName = courseElement[0].innerHTML;
                timetable.addCourse(course);
                timetableUI.addCourseToView(course);
            });
        }
        $('.autocomplete input').val("").focus();
        searchDropdown.toggleSearchResultsDialog(true);
    }

    addCourseToView(course) {
        chosenCourseIds.push(course.courseId);
        $(".collection").append('<li class="collection-item" data-course-id=' + course.courseId + '>\
    <div>'+ course.courseShortenedName + '\
    <i class="material-icons delete-icon">delete</i></div></li>');
        this.setDeleteCourseListener();

    }

    setDeleteCourseListener() {
        $('.delete-icon').off('click');
        $('.delete-icon').on('click', function (e) {
            var idToRemove = $(this).closest('li').attr('data-course-id');
            var course = timetable.getCourseWithId(idToRemove);
            chosenCourseIds = chosenCourseIds.remove(idToRemove);
            $(this).closest('li').remove();
            timetable.removeCourse(course);
        });
    }
}