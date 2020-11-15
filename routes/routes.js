// inlcude data file
const data = require("../data.json");
var path = require("path");

// landing page
var appRouter = function (app) {
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../static", "index.html"));
  });

 
// /api/awards now handled by search query API call (see line 82)

// // 
//   app.get("/api/awards", function (req, res) {
//     if (data == null) {
//       res.send("File with awards is not found!");
//     } else {
//       res.send(data);
//     }
//   });

// id is not a relevant parameter to user - this call is now deprecated

//   app.get("/api/awards/:id", function (req, res) {
//     const id = data[req.params.id - 1];
//     if (id == null) {
//       res.send("The award is not found!");
//     } else {
//       res.send(id);
//     }
//   });


// this api call returns all categories in a collection
// deprecated, probably don't need

//   app.get("/api/award_categories", function (req, res) {
//     award_cat = [];
//     let cat_data, cat_award;
//     let cond = false;
//     for (key in data) {
//       cat_data = data[key].category;
//       for (val in award_cat) {
//         cat_award = award_cat[val];
//         if (cat_award == cat_data) {
//           cond = true;
//           break;
//         } else {
//           cond = false;
//         }
//       }
//       if (!cond) award_cat.push(cat_data);
//     } 
//     res.send(award_cat);
//   });

// 	id is not a relevant parameter to user
//  deprecated

//   app.get("/api/award_categories/:id", function (req, res) {
//     const id = award_cat[req.params.id - 1];
//     if (id == null) {
//       res.send("The award category is not found!");
//     } else {
//       res.send(id);
//     }
//   });


  // this route returns the nominees of best picture based on year input
  // collection API call
  
  app.get("/api/movies/categories/bestpicture/:year", function (req,res) {
    const year = req.params.year;
    ret_collection = []
    if (year === null) {
      res.send("The year is not found!")
    } else {
      for(key in data){
        if (data[key].category == "BEST PICTURE" && data[key].year == year){
          ret_collection.push(data[key].entity);
        }
      }
      res.send(ret_collection);
    }
    
  });

  // this route returns the winner of best picture based on year input
  // singleton API call

  app.get("/api/movies/categories/bestpicture/:year/winner", function (req,res) {
    const year = req.params.year;
    ret_winner = [];
    if(year === null) {
      res.send("The year is not found!");
    } else {
        for(key in data) {
          if(data[key].category == "BEST PICTURE" && data[key].year == year && data[key].winner == true) {
	    ret_winner.push(data[key].entity);
          }
        }
      }
    if(ret_winner === null) {
      res.send("No winner found for this year!");
    } else {
      res.send(ret_winner);
      }

  });

  // adding get requests
  // search winners or return full data set
  //api/awards?winner=true&year=1996
//   app.get("/api/awards", function(req, res) {
//     let winner_req = [];
    
// 	if(typeof req.query.winner != 'undefined' && typeof req.query.year != 'undefined')
// 		res.send(searchArr(req.query.winner,req.query.year));
// 	else if(typeof req.query.winner != 'undefined' && typeof req.query.year == 'undefined')
// 		res.send(searchArr(req.query.winner,0));
// 	else if(typeof req.query.winner == 'undefined' && typeof req.query.year != 'undefined')
// 		res.send(searchArr(0, req.query.year));
// 	else if(typeof req.query.category != 'undefined' && typeof req.query.winner == 'undefined' && typeof req.query.year == 'undefined')
// 		res.send(searchArr(0,0,req.query.category));
// 	else {
// 		res.json(data);
// 	}	

// 	});

	// works fine, but a target for refactoring due to function complexity
	// function that returns array of data queried by the user
// 	function searchArr(winner = 0, year = 0, category = 0) {
// 		result_arr = [];
// 		// there is a winner but no year
// 		if(winner != 0 && year == 0) {
// 			if(winner == "true") {
// 				result_arr = data.filter(function(item) {
// 					if(item.winner === true) {
// 						return item;
// 					}
// 				});
// 			} else if(winner === "false") {
// 				result_arr = data.filter(function(item) {
// 					if(item.winner === false) {
// 						return item;
// 					}
// 				});
// 			} else {
// 				result_arr = data;
// 			}
// 			return result_arr;											
// 		} 
// 		// there is no winner but there is year
// 		else if(winner == 0 && year != 0) {
// 			let convert_year = parseInt(year);
// 			if(Number.isInteger(convert_year)) {
// 				result_arr = data.filter(function(item) {
// 					if(item.year == year) {
// 						return item;	
// 					}
// 				});
// 			} else {
// 				result_arr = data;
// 			}
// 			return result_arr;
// 		} 
// 		// there is a winner and year
// 		else if(winner != 0 && year != 0) {
// 			let convert_year = parseInt(year);
			
// 			if(Number.isInteger(convert_year)) {
// 				if(winner == "true") {
// 					result_arr = data.filter(function(item) {
// 						if(item.winner == true && item.year == year) {
// 							return item;
// 						}
// 					});
// 				} else if(winner == "false") {			
// 						if(winner == "false") {
// 							result_arr = data.filter(function(item) {
// 								if(item.winner == false && item.year == year) {
// 									return item;
// 								}
// 							});
// 						}
// 				}
// 				return result_arr;
// 			}	
// 			// there is no winner and no year just category
// 			else if(category)
// 			{
// 				/*result_arr = data.filter(function(item) {
// 					if(item.category == category)
// 					{
// 						return item;
// 					}
// 				});
// 				*/
// 				let ok = "hello";
// 				result_arr.push(ok);
// 				return result_arr;
// 			}
// 			else {
// 				result_arr = data;
// 			}
// 		}	
// 		return result_arr;
// 	}
  
// };

//http://servername/movies/search?year=1997&category=song

app.get("/api/awards", function(req, res) {
	category_response = [];
  
    let query_cat = (req.query.category).toUpperCase();
    let query_year = req.query.year;
    
    category_response = data.filter(function(item) {
      if(item.category == query_cat && item.year == query_year)
        return item;
    });
  
  res.send(category_response);
  
});

};
module.exports = appRouter;
