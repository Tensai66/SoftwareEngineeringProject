function configSuccessCallBack(data) {
  localStorage.setItem('BaseUrl', JSON.parse(data).images.base_url);
}

function successCallback(data) {
    $('#cat').text('');
    data = JSON.parse(data);
    for(i = 0; i < data.results.length; i++) {
      if (data.results[i].poster_path) {
        var imageUrl = localStorage.getItem('BaseUrl') + 'w500' + data.results[i].poster_path;
        $('#cat').append('<li>' + '<img class="pic1" src="' + imageUrl + '"/>'
        + '<h3 class="movTitle">' + data.results[i].title + '</h3>' + '<p class="desc">Description</p>' + '<p class="overview">' + data.results[i].overview + '<p>');
      } else {
        $('#cat').append('<li>' + '<img class="pic1" src="popcorn.jpg"/>' + '<h3 class="movTitle">' 
        + data.results[i].title + '</h3>' + '<p class="desc">Description</p>' + '<p class="overview">' + data.results[i].overview + '<p>');
      }
    }
}

function errorCallback(data) {
    $('#cat').text('');
    $('#cat').append('<li>' + 'Please enter some valid search data');
}

function findSimilar(data) {
  data = JSON.parse(data);
  options = {"id":data.results[0].id}
  theMovieDb.movies.getSimilarMovies(options, successCallback, errorCallback);
}

function searchGenre(genre) {
  if (genre == "Action") {
    options = {"with_genres":28}
    theMovieDb.discover.getMovies(options, successCallback, errorCallback);
  } else if (genre == "Comedy") {
    options = {"with_genres":35}
    theMovieDb.discover.getMovies(options, successCallback, errorCallback);
  } else if (genre == "Drama") {
    options = {"with_genres":18}
    theMovieDb.discover.getMovies(options, successCallback, errorCallback);
  } else if (genre == "Family") {
    options = {"with_genres":10751}
    theMovieDb.discover.getMovies(options, successCallback, errorCallback);
  }
}

function clickButton() {
    var search = $('#myText').val();
    var options;
    var selected = $('select[name=type]').val();
    theMovieDb.configurations.getConfiguration(configSuccessCallBack, errorCallback);
    if (selected == "title") {
      options = {"query":search};
      theMovieDb.search.getMovie(options, successCallback, errorCallback);
    } else if (selected == "genre") {
      options = {"with_genres":search};
      theMovieDb.discover.getMovies(options, successCallback, errorCallback);
      searchGenre(search);
    } else if (selected == "year") {
      options = {"primary_release_year":Number(search)};
      theMovieDb.discover.getMovies(options, successCallback, errorCallback);
    } else if (selected == "similar") {
      options = {"query":search};
      theMovieDb.search.getMovie(options, findSimilar, errorCallback);
    }
}

$('#search').click(clickButton);
