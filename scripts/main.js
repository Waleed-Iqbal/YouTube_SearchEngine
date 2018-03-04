

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
            $(searchField).animate({
                width: "45%"
            }, 400, function () { });

            $(icon).animate({
                right: "360px"
            }, 400, function () { });
        }

    });



})