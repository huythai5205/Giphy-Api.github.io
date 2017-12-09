$(document).ready(function () {

    let aButtons = ["cat", "dog", "star wars", "dc", "marvel"];

    function renderButtons() {
        $('.buttons').empty();
        for (let index in aButtons) {
            $(` <button type = "button" class = "btn btn-info topic-button">${aButtons[index]}</button>`).appendTo('.buttons');
        }
    }

    renderButtons();

    (function displayRandom() {
        let num = Math.floor(Math.random() * aButtons.length);
        let topic = aButtons[num];
        ajaxCall(topic);
    })();

    function ajaxCall(topic) {
        let giphyKey = 'aoUmAo4L31phSx8JnDzDAIeq3oXjwa9u';
        let queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + giphyKey + "&limit=10";
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            updateRow(response);
        });
    }

    $('#submit').click(function (event) {
        event.preventDefault();
        let value = $('input').val();
        if (value !== "") {
            aButtons.push(value);
            renderButtons();
        }

    });

    $(document).on('click', '.topic-button', function () {
        //"http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
        //"http://api.giphy.com/v1/gifs/search?q="+value+"&api_key="+giphyKey+"&limit=5"
        let topic = $(this).text();
        ajaxCall(topic);
    });

    $(document).on('click', '.topic-image', function () {
        let a = $(this).attr('class');
        a = a.split(" ");
        $('.' + a[0]).toggle();
    });

    function updateRow(response) {
        $('.row').empty();
        for (var index in response.data) {
            let col = $(`<div class="col"><img class = "image${index} topic-image" src="${response.data[index].images.original_still.url}"/><img class = "image${index} topic-image" src="${response.data[index].images.original.url}" style="display:none"/><h4>Rating: ${response.data[index].rating}</h4></div>`);
            $(col).appendTo('.row');
        }
    }
});