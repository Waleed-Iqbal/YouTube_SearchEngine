



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

    $("#search-form").submit(function (e) {
        e.preventDefault();
    });
})


function searchYouTube() {
    //clear results
    $("#results").html("");
    $("#buttons").html("");

    //Get form input
    var q = $("#query").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            type: "video",
            key: "AIzaSyCkVzJuXpfwuWlPj8gk8BnmszFAiNqJad8"
        },
        function (response) {
            var nextPageToken = response.nextPageToken;
            var prevPageToken = response.prevPageToken;
            console.log(response);

            $.each(response.items, function (index, item) {
                var output = getOutput(item);
                $("#results").append(output);
            });
        });
}

function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var date = item.snippet.publishedAt;

    var output = "<li>" +
        "<div class='list-left'>" +
        "   <img src='" + thumb + "'>" +
        "</div>" +
        "<div class='list-right'>" +
        "<h3>" + title + "</h3>" +
        "<small>By <span class='cTitle'>" + channelTitle + "</span> on " + date + "</small>" +
        "" +
        "" +
        "" +
        "</div>"
    "</li>";



    return output;


}