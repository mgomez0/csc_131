var form = document.getElementById("search-params");

form.addEventListener("submit", function (event) {
  // clear existing images
  document.getElementById("top").innerHTML = "";
  document.getElementById("winner-img").innerHTML = "";
  var headers = new Headers();
  // Tell the server we want JSON back
  headers.set("Accept", "application/json");
  let year = form.year.value;
  let category = form.category.value;
  let url = "/api/awards?year=" + year + "&" + "category=" + category;
  let titles = new Map();
  var responsePromise = fetch(url);
  responsePromise
    // Convert the response into JSON-JS object.
    .then(function (response) {
      return response.json();
    })
    // Extract the movie Titles and map them to a boolean that represents if they are an Oscar winner
    .then(function (movies) {
      movies.forEach((movie) => {
        titles.set(movie.entity, movie.winner);
      });
      // "The Fellowship of the Ring" : "true"
      return titles;
    })

    // Generate the URLs for every OMDB API call
    .then(function (titles) {
      let api_key = "&apikey=dc6d017";
      let url = "http://www.omdbapi.com/?t=";
      let urls = new Map();
      titles.forEach((values, keys) => {
        // "omdbapi_url.com":"true"
        urls.set(url + keys + api_key, values);
      });
      let requests = Array.from(urls.keys()).map((request_url) =>
        fetch(request_url)
      );
      // let requests = urls.map((url) => fetch(url));
      return Promise.all(requests).then((responses) => {
        // all responses are resolved succesfully
        return responses;
      });
    })
    // map array of responses into an array of response.json() to read their content
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    // all JSON answers are parsed: "movie_data" is the array of them
    .then(function (movie_data) {
      let poster_urls = new Map();
      for (let i = 0; i < movie_data.length; i++) {
        // map "Title":"Poster_URL"
        poster_urls.set(movie_data[i].Title, movie_data[i].Poster);
      }

      //add each image to the DOM
      poster_urls.forEach((url, title) => {
        let image = document.createElement("img");
        image.src = url;
        if (titles.get(title) == true) {
          document.querySelector(".winner .winner-img").appendChild(image);
        } else {
          document.querySelector(".nominees .top").appendChild(image);
        }
      });
    });

  event.preventDefault();
});
