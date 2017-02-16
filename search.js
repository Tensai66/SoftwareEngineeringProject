function configSuccessCallBack(data) {
  localStorage.setItem('BaseUrl', JSON.parse(data).images.base_url);
}

function successCallback(data) {
    $('#cat').text('');
    data = JSON.parse(data);
    for(i = 0; i < data.results.length; i++) {
      var imageUrl = localStorage.getItem('BaseUrl') + 'w500' + data.results[i].poster_path;
      $('#cat').append('<li>' + '<img id=pic1 src="' + imageUrl + '"/>' + "<h3>" + data.results[i].title + "</h3>" + "<p>Description</p>");
    }
}

function errorCallback(data) {
    $('#sammy').text('Please enter some valid search data');
}

function clickButton() {
    var search = $('#myText').val(),
        options = {"query":search};
  theMovieDb.configurations.getConfiguration(configSuccessCallBack, errorCallback);
  theMovieDb.search.getMovie(options, successCallback, errorCallback);
}

$('#search').click(clickButton);