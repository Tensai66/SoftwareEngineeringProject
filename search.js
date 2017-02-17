function configSuccessCallBack(data) {
  localStorage.setItem('BaseUrl', JSON.parse(data).images.base_url);
}

function successCallback(data) {
    $('#cat').text('');
    data = JSON.parse(data);
    for(i = 0; i < data.results.length; i++) {
      if (data.results[i].poster_path) {
        var imageUrl = localStorage.getItem('BaseUrl') + 'w500' + data.results[i].poster_path;
        $('#cat').append('<li>' + '<img id="pic1" src="' + imageUrl + '"/>'
        + "<h3 class="movTitle">" + data.results[i].title + "</h3>" + "<p>Description</p>" + data.results[i].overview);
      } else {
        $('#cat').append('<li>' + '<img id="pic1" src="popcorn.jpg"/>' + "<h3 class="movTitle">" 
        + data.results[i].title + "</h3>" + "<p>Description</p>" + data.results[i].overview);
      }
    }
}

function errorCallback(data) {
    $('#sammy').text('Please enter some valid search data');
}

function clickButton() {
    var search = $('#myText').val(), options = {"query":search};
    var selected = $('select[name=type]').val();
    theMovieDb.configurations.getConfiguration(configSuccessCallBack, errorCallback);
    if (selected == "title") {
      theMovieDb.search.getMovie(options, successCallback, errorCallback);
    } else if (selected == "genre") {
      $('#cat').text('');
      $('#cat').append('<li>' + '<p>Sorry, the Genre feature has not been added yet. Try searching by Title</p>');
    } else if (selected == "year") {
      $('#cat').text('');
      $('#cat').append('<li>' + '<p> Sorry, the Year feature has not been added yet. Try searching by Title</p>');
    }
}

$('#search').click(clickButton);
