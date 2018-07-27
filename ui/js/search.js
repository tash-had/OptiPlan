
function getCourseData(courseCode){
    console.log(courseCode); 
}


$(document).ready(function () {
    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, {
        data: {
            "Apple": null,
            "Microsoft": null,
            "Google": null
        },
        onAutocomplete: function (input) {
            getCourseData(input);
        }
    });
    console.log(instances[0].options);
});