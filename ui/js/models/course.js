var COURSE_DATA_URL = "http://localhost:3000/course?courseId=";

class Course {
    constructor(courseId, fetchDataCallback) {
        this.courseId = courseId.replaceAll("'", "").replaceAll("c", ""); // there is a random single quote at the very end for some reason
        this.courseCode;
        this.courseFullName;
        this.courseShortenedName;
        this.semester;
        this.sections;
        this.fetchCourseData(this.courseId, this, fetchDataCallback);
    }

    fetchCourseData(courseId, obj, callback) {
        $.get(COURSE_DATA_URL + courseId, function (response) {
            Object.assign(obj, response);
            callback();
        });
    }
}

function getBadgeAttrs(course) {
    // its safer to use the semester, so only use courseCode if we really have to 
    var semester = course.courseCode.slice(-1);
    if (course.semester) {
        semester = course.semester;
    }
    var badgeAttrs = {
        "season": '',
        "color": ''
    };
    if (semester === "F") {
        badgeAttrs.season = "Fall";
        badgeAttrs.color = "orange";
    } else if (semester === "S") {
        badgeAttrs.season = "Winter";
        badgeAttrs.color = "blue";
    } else if (semester === "Y") {
        badgeAttrs.season = "Year";
        badgeAttrs.color = "purple";
    }
    return badgeAttrs;
}