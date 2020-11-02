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
		const id = data[req.params.id];
		if(id == null)
		{
			res.send("The award is not found!");
		}
		else
		{
			res.send(id);
		}
	});
}

module.exports = appRouter;
