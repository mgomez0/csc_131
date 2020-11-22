var form = document.getElementById("search-params");

form.addEventListener("submit", function (event) {
  // clear existing images
  document.getElementById("top").innerHTML = "";
  var headers = new Headers();
  // Tell the server we want JSON back
  headers.set("Accept", "application/json");
  let year = form.year.value;
  let category = form.category.value;
  let url = "/api/awards?year=" + year + "&" + "category=" + category;
  var responsePromise = fetch(url);
  responsePromise
    // 3.1 Convert the response into JSON-JS object.
    .then(function (response) {
      return response.json();
    })
    // 3.2 Extract the movie Titles
    .then(function (movies) {
      let titles = [];
      movies.forEach((movie) => {
        titles.push(movie.entity);
      });
      return titles;
    })

    // 3.3 Generate the URLs for every OMDB API call
    .then(function (titles) {
      let key = "&apikey=dc6d017";
      let url = "http://www.omdbapi.com/?t=";
      let urls = [];
      for (let i = 0; i < titles.length; i++) {
        urls.push(url + titles[i] + key);
      }
      let requests = urls.map((url) => fetch(url));
      return Promise.all(requests).then((responses) => {
        // all responses are resolved succesfully
        return responses;
      });
    })
    // map array of responses into an array of response.json() to read their content
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // all JSON answers are parsed: "movie_data" is the array of them
    .then(function (movie_data) {
      let poster_urls = [];
      for (let i = 0; i < movie_data.length; i++) {
        poster_urls.push(movie_data[i].Poster);
      }

      //add each image to the DOM
      poster_urls.forEach((url) => {
        let image = document.createElement("img");
        image.src = url;
        document.querySelector(".nominees .top").appendChild(image);
      });
    });

  event.preventDefault();
});
