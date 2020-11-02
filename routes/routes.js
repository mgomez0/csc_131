// inlcude data file
const data = require('../data.json')

var faker = require("faker");

var appRouter = function (app) {



  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to our restful API' });
  });

  app.get("/user", function (req, res) {
    var data = ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email()
    });
    res.status(200).send(data);
  });

 app.get("/users/:num", function (req, res) {
   var users = [];
   var num = req.params.num;

   if (isFinite(num) && num  > 0 ) {
     for (i = 0; i <= num-1; i++) {
       users.push({
           firstName: faker.name.firstName(),
           lastName: faker.name.lastName(),
           username: faker.internet.userName(),
           email: faker.internet.email()
        });
     }

     res.status(200).send(users);

   } else {
     res.status(400).send({ message: 'invalid number supplied' });
   }

 });


	// adding get requests
	
	app.get("/api/awards", function (req, res)
	{
		if(data == null)
		{
				res.send("File with awards is not found!");
		}
		else
		{
				res.send(data);
		}
	});

	app.get("/api/awards/:id", function (req, res)
	{
		const id = data[req.params.id-1];
		if(id == null)
		{
			res.send("The award is not found!");
		}
		else
		{
			res.send(id);
		}
	});

	app.get("/api/award_categories", function (req, res)
	{
		award_cat = [];
		let cat_data, cat_award;
		let cond = false;
		for(key in data)
		{
			cat_data = data[key].category;
			for(val in award_cat)
			{
				cat_award = award_cat[val];
				if(cat_award == cat_data)
				{
					cond = true;
					break;
				}
				else
				{
					cond = false;
				}
			}
			if(!cond)
				award_cat.push(cat_data);
		}

		res.send(award_cat);
	});
	
	app.get("/api/award_categories/:id", function (req, res)
	{
		const id = award_cat[req.params.id-1];
		if(id == null)
		{
			res.send("The award category is not found!");
		}
		else
		{
			res.send(id);
		}


	});
}

module.exports = appRouter;
