class Timetable {
    constructor() {
        this.courses = []
        if (localStorage.timetable) {
            this.courses = JSON.parse(localStorage.timetable);
            this.addCoursesToView(this.courses);
        }
    }

    addCourse(course) {
        this.courses.push(course);
        this.timetableUpdated();
    }

    removeCourse(course) {
        this.courses = this.courses.getArrayWithout(course);
        this.timetableUpdated();
    }

    getCourseWithId(courseId) {
        for (var course of this.courses) {
            if (course.courseId === courseId) {
                return course;
            }
        }
    }

    addCoursesToView(courses) {
        for (var course of courses) {
            timetableUI.addCourseToView(course);
        }
    }

    /* TODO: Change this to persist in a database instead of local storage */
    timetableUpdated() {
        localStorage.timetable = JSON.stringify(this.courses);
    }
}
