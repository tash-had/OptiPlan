var COURSE_DATA_URL = "http://localhost:3000/course?courseId=";

class Course {
    constructor(courseId, fetchDataCallback) {
        this.courseId = courseId.substring(1);
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