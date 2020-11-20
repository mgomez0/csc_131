var form = document.getElementById("search-params");

form.addEventListener("submit", function (event) {
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
    // 3.2 Do something with the JSON data
    .then(function (movies) {
      // console.log(jsonData);
      let html = "";
      movies.forEach((movie) => {
        let htmlSegment = `<div class="movie">
                                    <h2>${movie.entity}</h2>
                                    </div>`;
        html += htmlSegment;
      });

      let container = document.querySelector(".nominees .bottom");
      container.innerHTML = html;
    });

  event.preventDefault();
});
