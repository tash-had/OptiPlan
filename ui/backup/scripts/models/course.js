var COURSE_DATA_URL = "http://localhost:3000/course?courseId=";

class Course {
    constructor(courseId, courseDisplayName, fetchDataCallback) {
        this.courseId = courseId; 
        this.courseCode = courseId;
        this.courseShortenedName = courseDisplayName;
        this.courseFullName;
        this.sections;
        if (fetchDataCallback) {
            this.fetchCourseData(this, fetchDataCallback);
        }
        this.semester = getTermDetails(this).seasonFirstLetter;
    }

    fetchCourseData(courseObj, callback) {
        $.get(COURSE_DATA_URL + courseObj.courseId, function (response) {
            Object.assign(courseObj, response);
            callback();
        });
    } 
}

function getTermDetails(course) {
    // its safer to use the semester, so only use courseCode if we really have to 
    var semester = course.courseCode.slice(-1);
    if (course.semester) {
        semester = course.semester;
    }
    var termDetails = {
        "seasonFirstLetter": '', 
        "season": '',
        "badgeColor": ''
    };
    if (semester === "F") {
        termDetails.season = "Fall";
        termDetails.badgeColor = "orange";
    } else if (semester === "S") {
        termDetails.season = "Winter";
        termDetails.badgeColor = "blue";
    } else if (semester === "Y") {
        termDetails.season = "Year";
        termDetails.badgeColor = "purple";
    }
    termDetails.seasonFirstLetter = semester; 

    return termDetails;
}