describe("Adding/Deleting courses works", function () {

    beforeEach(function () {
        cy.clearLocalStorage();
        cy.visit("ui/index.html");
        cy.reload(true);
    });

    it("Course can be searched and clicking it add it to the timetable", function () {
        var checkCorrectCourseAdded = function (expectedCourseId) {
            cy.get("#courses>.row>.collection")
                .each(function (val, idx, collection) {
                    if (idx == 0) {
                        var courseId = val[0].childNodes[0].getAttribute("data-course-id");
                        expect(courseId).equals(expectedCourseId);
                    }
                });
        };
        addCourse("CSC165", checkCorrectCourseAdded);
        addCourse("CSC108", checkCorrectCourseAdded);
    });

    it("User isn't able to add the same course twice", function () {
        cy.visit("ui/index.html");
        addCourse("CSC108");
        addCourse("CSC108");
        cy.get("#courses>.row>.collection").then(function (list) {
            expect(list[0].children.length).equals(1);
        });
    });

    it("User can delete the course", function () {
        cy.visit("ui/index.html");
        addCourse("CSC108");

        cy.get("#courses>.row>.collection").then(function (list) {
            // find the course we just added and give it an id so we can reference it
            list[0].children[0].setAttribute("id", "course1");
        });
        // use the id to click the delete button
        cy.get("#" + "course1" + ">div>.delete-icon").click();
        cy.get("#courses>.row>.collection").then(function (courseList) {
            expect(courseList[0].children.length).equals(0);
        });
    });
});


describe("Searchbar functions correctly", function () {

    beforeEach(function () {
        cy.clearLocalStorage();
        cy.visit("ui/index.html");
        cy.reload(true);
    });

    it("Down arrow should select search results", function () {
        cy.get("#courseSearch")
            .type("CSC108").then(function () {
                cy.wait(1000);
                cy.get("#courseSearch").type("{downarrow}");
                cy.get(".search-dialog").then(function (e) {
                    expect(e.children().first()).to.have.id('selectedItem');
                });
                cy.get("#courseSearch").type("{selectall}{backspace}"); 
                cy.get("#courseSearch").click(); 
            });
    });
});


function addCourse(course, onFetched) {
    var courseId;

    cy.get("#courseSearch")
        .type(course);
    var courseId;
    cy.get(".search-dialog").children().first().then(function (e) {
        courseId = e[0].getAttribute("data-course-id");
    }).click().then(function () {
        if (onFetched) {
            onFetched(courseId);
        }
    });
}

