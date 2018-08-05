class Timetable {
    constructor() {
        this.courses = []
        if (localStorage.timetable){
            this.courses = JSON.parse(localStorage.timetable);
            this.addCoursesToView(this.courses);
        }
    }

    addCourse(course) {
        this.courses.push(course);
        this.timetableUpdated(); 
    }

    removeCourse(course) {
        this.courses = this.courses.remove(course); 
        this.timetableUpdated(); 
    }

    getCourseWithId(courseId){
        for (var course of this.courses){
            if (course.courseId === courseId){
                return course; 
            }
        }
    }

    addCoursesToView(courses){
        for (var course of courses){
            timetableUI.addCourseToView(course); 
        }
    }

    timetableUpdated() {
        localStorage.timetable = JSON.stringify(this.courses);
    }
}