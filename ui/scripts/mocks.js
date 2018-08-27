var COURSE_MOCK_URL = "http://localhost:3002/mock/year-";
var MOCK_BTNS = ['y1', 'y2', 'y3', 'y4'];

$(document).ready(function () {
    $("#renderBtn").attr("disabled", true);
    setButtonState();
});

function setButtonState() {
    var yearSet = localStorage.yearSet;
    if (yearSet) {
        for (var year of MOCK_BTNS) {
            if (year != yearSet) {
                $("#" + year).attr("disabled", true);
            }
        }
        $("#renderBtn").attr("disabled", false);
    }
}

function fetchCourseData(year) {
    var yearToSet = 'y' + year;
    var yearSet = localStorage.yearSet;
    if (yearToSet != yearSet) {
        $.get(COURSE_MOCK_URL + year, function (response) {
            console.log("GET RESPONSE", response);
            for (course of response.courses) {
                timetableUI.addCourseToView(course);
            }
            timetable.courses = response.courses;
            localStorage.timetable = JSON.stringify(timetable.courses);
            console.log("NEW TIMETABLE", timetable);
        });
        localStorage.yearSet = 'y' + year;
        setButtonState();
        $("#renderBtn").attr("disabled", false);
    }
}

function renderTimetable() {
    var jsonDiv = document.getElementById("timetable");
    jsonDiv.innerHTML = '';
    renderjson.set_show_to_level(3);
    jsonDiv.appendChild(renderjson(timetable));
}

function clearData() {
    localStorage.removeItem('timetable');
    localStorage.removeItem('yearSet');
    location.reload();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

