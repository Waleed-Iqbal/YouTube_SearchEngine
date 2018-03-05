



// Project id ... youtube-searchengine-197007
// Key ... AIzaSyCkVzJuXpfwuWlPj8gk8BnmszFAiNqJad8

var q = "";

$(function () {

    $(".fancybox").fancybox();

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
    q = $("#query").val();

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

            var buttons = getButtons(nextPageToken, prevPageToken);
            $("#buttons").append(buttons);
        });
}


function nextPage() {

    var token = $("#next-button").data("token");
    q = $("#next-button").data("query");

    $("#results").html("");
    $("#buttons").html("");

    //Get form input
    q = $("#query").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            pageToken: token,
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

            var buttons = getButtons(nextPageToken, prevPageToken);
            $("#buttons").append(buttons);
        });
}

function prevPage() {

    var token = $("#prev-button").data("token");
    q = $("#prev-button").data("query");

    $("#results").html("");
    $("#buttons").html("");

    //Get form input
    q = $("#query").val();

    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: "snippet, id",
            q: q,
            pageToken: token,
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

            var buttons = getButtons(nextPageToken, prevPageToken);
            $("#buttons").append(buttons);
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
        "   <h3><a data-fancybox='gallery' href='https://www.youtube.com/embed/"+videoId+"'>" + title + "</a></h3>" +
        "   <small>By <span class='cTitle'>" + channelTitle + "</span> on " + date + "</small>" +
        "   <p>" + description + "</p>" +
        "</div>" +
        "</div>" +
        "</li>" +
        "<div class='clearFix'></div>";



    return output;


}

function getButtons(nextPageToken, prevPageToken) {
    var btnOutput = "";
    if (!prevPageToken) {
        btnOutput = "<div class='button-container'>" +
            "<button id='next-button' class='paging-button' data-token='" + nextPageToken + "' data-query='" + q + "' " +
            "onclick='nextPage()'>Next Page</button>" +
            "</div>";
    } else {
        btnOutput = "<div class='button-container'>" +
            "<button id='prev-button' class='paging-button' data-token='" + prevPageToken + "' data-query='" + q + "' " +
            "onclick='prevPage()'>Previous Page</button>" +
            "<button id='next-button' class='paging-button' data-token='" + nextPageToken + "' data-query='" + q + "' " +
            "onclick='nextPage()'>Next Page</button>" +
            "</div>";
    }

    return btnOutput;
}