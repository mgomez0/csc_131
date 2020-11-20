function movieSearch() {
  var form = document.getElementById("search-params");
  form.onsubmit = function (e) {
    e.preventDefault();
    window.location.href = "/api/awards?year=" + form.year.value + "&" + "category=" + form.category.value;
  };
}

movieSearch();