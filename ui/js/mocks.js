$(document).ready(function () {
    

    $("#firstYearBtn").on('click', async function () {
        var courses = ["<div data-course-id='c461' class='courseResult'>MAT137Y1Y: Calculus</div>",
        "<div data-course-id='c1996' class='courseResult'>CSC108H1F: Introduction to Computer Progr...</div>",
        "<div data-course-id='c1980' class='courseResult'>HPS100H1F: Introduction to History and Ph...</div>",
        "<div data-course-id='c435' class='courseResult'>AST101H1F: The Sun and Its Neighbours</div>",
        "<div data-course-id='c1982' class='courseResult'>PSY100H1F: Introductory Psychology</div>",
        "<div data-course-id='c473' class='courseResult'>AST201H1S: Stars and Galaxies</div>",
        "<div data-course-id='c2005' class='courseResult'>CSC148H1S: Introduction to Computer Scien...</div>",
        "<div data-course-id='c2008' class='courseResult'>CSC165H1S: Mathematical Expression and Re...</div>",
        "<div data-course-id='c2944' class='courseResult'>ECO101H1S: Principles of Microeconomics</div>"];
        
        for (course of courses) {
            createCourse(course);
        }
        // await sleep(0);
    });

    $("#clearBtn").on("click", function () {
        clearData();
    });

    $("#renderBtn").on('click', function () {
        var jsonDiv = document.getElementById("timetable");
        renderjson.set_show_to_level(3);
        jsonDiv.appendChild(renderjson(timetable));
    });

});

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

function clearData() {
    localStorage.removeItem('timetable');
    location.reload();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function createCourse(course) {
    var div = createElementFromHTML(course);
    div.attr = function () {
        return div.getAttribute("data-course-id");
    }
    div[0] = div;
    timetableUI.addCourseWithElement(div);
}