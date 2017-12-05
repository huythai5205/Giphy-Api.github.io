$('#submit').click(function () {
    var giphyKey = 'aoUmAo4L31phSx8JnDzDAIeq3oXjwa9u';
    var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + giphyKey;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).done(function (response) {
        console.log(response);

    });
});



function updateTable(index, response) {
    var firstRowTds = $("table")
        .children()
        .eq(1)
        .children("tr")
        .eq(index)
        .children("td");
    // Setting the inner text of each td in the first row
    firstRowTds.eq(0).text(response.Title);
    firstRowTds.eq(1).text(response.Year);
    firstRowTds.eq(2).text(response.Actors);
}