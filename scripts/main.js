



// Project id ... youtube-searchengine-197007
// Key ... AIzaSyCkVzJuXpfwuWlPj8gk8BnmszFAiNqJad8



$(function () {
    var searchField = $("#query");
    var icon = $("#search-btn");

    $(searchField).on("focus", function () {
        $(this).animate({
            width: "100%"
        }, 400);

        $(icon).animate({
            right: "10px"
        }, 400);
    });

    $(searchField).on("blur", function () {
        if (searchField.val() === "") {
            $(this).animate({
                width: "45%"
            }, 400);

            $(icon).animate({
                right: "360px"
            }, 400);
        }
    });
})


function search() {
    //clear results
    $("#results").html("");
    $("#buttons").html("");

    //Get form input
    var q = $("#query").val();
}