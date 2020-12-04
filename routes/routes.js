// inlcude data file

const data = require("../data.json");
var path = require("path");

// landing page

var appRouter = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../static", "index.html"));
  });

  // return movie data by id
  // the function enables us to retrieve a single award(JSON object) from the data file(array of JSON objects)

  app.get("/api/awards/list/:id", function (req, res) {
    let id = data[req.params.id - 1];
    if (id == null) {
      res.send("The award is not found!");
    } else {
      res.send(id);
    }
  });

  // return a list of award categories
  // the function retrieves awards categories from data file and returns the array of categories with no duplicates

  app.get("/api/award_categories", function (req, res) {
    let categories = [];
    categories = [...new Set(data.map(i => i.category))];
    res.send(categories);
  });

  // this route returns the nominees of best picture based on year input
  // collection API call

  app.get("/api/movies/categories/bestpicture/:year", function (req, res) {
    const year = req.params.year;
    ret_collection = []
    if (year === null) {
      res.send("The year is not found!")
    } else {
      for (key in data) {
        if (data[key].category == "BEST PICTURE" && data[key].year == year) {
          ret_collection.push(data[key].entity);
        }
      }
      res.send(ret_collection);
    }

  });

  // this route returns the winner of best picture based on year input
  // singleton API call

  app.get("/api/movies/categories/bestpicture/:year/winner", function (req, res) {
    const year = req.params.year;
    ret_winner = [];
    if (year === null) {
      res.send("The year is not found!");
    } else {
      for (key in data) {
        if (data[key].category == "BEST PICTURE" && data[key].year == year && data[key].winner == true) {
          ret_winner.push(data[key].entity);
        }
      }
    }
    if (ret_winner === null) {
      res.send("No winner found for this year!");
    } else {
      res.send(ret_winner);
    }

  });

  // api call to search for award year, award category or both 
  // this function enables to take search sparameteres from the user such as year, category, or both and search the data file to return the aray of JSON objects that satisfy search criteria entered by the user

  app.get("/api/awards", function (req, res) {
    category_response = [];

    let query_cat = req.query.category;
    let query_year = req.query.year;

    if (query_year == null && query_cat == null) {
      res.send("No parameters found!");
    }
    else {
      if (query_cat != null && query_year != null) {
        category_response = data.filter(function (item) {
          if (item.category == (query_cat).toUpperCase() && item.year == query_year)
            return item;
        });
      }
      else if (query_cat != null && query_year == null) {
        category_response = data.filter(function (item) {
          if (item.category == (query_cat).toUpperCase())
            return item;
        });
      }
      else if (query_cat == null && query_year != null) {
        category_response = data.filter(function (item) {
          if (item.year == query_year)
            return item;
        });
      }
      if (category_response.length == 0) {
        res.send("No data found!");
      }
      else {
        res.send(category_response);
      }
    }
  });

  // api the search awards in any category and year range
  // this function enables to take search parameteres from the user such as range of years and/or category and search the data file to return array of entities that satisfy search criteria entered by the user

  app.get("/api/awards/year", function (req, res) {
    let results = [];
    let awards_entities = [];

    let category_search;
    if (req.query.category != null) {
      category_search = (req.query.category).toUpperCase();
    }

    let year_from = req.query.from;
    let year_to = req.query.to;

    results = data.filter(function (item) {
      if (item.year >= year_from && item.year <= year_to) {
        if (!category_search) {
          return item;
        }
        else if (item.category == category_search) {
          return item;
        }
      }
    });


    if (results.length == 0) {
      res.send("Invalid range or category!");
    }
    else {
      awards_entities = results.map(i => i.entity);
      res.send(awards_entities);
    }
  });

};
module.exports = appRouter;
