function configSuccessCallBack(data) {
  localStorage.setItem('BaseUrl', JSON.parse(data).images.base_url);
}

function successCallback(data) {
    $('#sammy').text('');
    data = JSON.parse(data);
    for(i = 0; i < data.results.length; i++) {
      var imageUrl = localStorage.getItem('BaseUrl') + 'w185' + data.results[i].poster_path;
      $('#sammy').append('<img id=pic1 src="' + imageUrl + '" />' + '<br>');
      //$('#sammy').append('<img src="' + imageUrl + '" />' + '<br>')
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
