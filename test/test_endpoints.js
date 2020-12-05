var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe("Test endpoints", function() {
	
	it("it should return homepage", function(done) {
		chai.request("http://localhost:3000")
		 .get("/")
		 .end(function(err, res) {
				res.should.have.status(200);
				done();
		});
	});
	
	it("it should return an array of best picture award nominees for input year", function(done) {
		chai.request("http://localhost:3000")
			.get("/api/movies/categories/bestpicture/2000")
			.end(function(err, res) {
				res.should.have.status(200);
    		res.should.be.a('object');
				res.text.should.contain('["Chocolat","Crouching Tiger, Hidden Dragon","Erin Brockovich","Gladiator","Traffic"]');
				res.body.should.be.a('array');
				res.body.should.have.lengthOf(5);
				done();
		});
	});

	it("it should return a winner for best picture award nominee for input year", function(done) {
		chai.request("http://localhost:3000")
			.get("/api/movies/categories/bestpicture/2000/winner")
			.end(function(err, res) {
				res.should.have.status(200);
    		res.should.be.a('object');
				res.text.should.contain('["Gladiator"]');
				res.body.should.be.a('array');
				res.body.should.have.lengthOf(1);
				done();
		});
	});

	it("/api/awards should return that there were no search parameters entered", function(done) {
		chai.request("http://localhost:3000")
			.get("/api/awards")
			.end(function(err, res) {
				res.should.have.status(200);
				res.text.should.contain('No parameters found!');
				done();
		});
	});

	it("it should return array of objects for requested category award and year", function(done) {
		chai.request("http://localhost:3000")
			.get("/api/awards?category=best%20picture&year=2000")
			.end(function(err, res) {
				res.should.have.status(200);
    		res.should.be.a('object');
				res.text.should.contain('[{"category":"BEST PICTURE","entity":"Chocolat","winner":false,"year":2000},{"category":"BEST PICTURE","entity":"Crouching Tiger, Hidden Dragon","winner":false,"year":2000},{"category":"BEST PICTURE","entity":"Erin Brockovich","winner":false,"year":2000},{"category":"BEST PICTURE","entity":"Gladiator","winner":true,"year":2000},{"category":"BEST PICTURE","entity":"Traffic","winner":false,"year":2000}]');
				res.body.should.be.a('array');
				res.body.should.have.lengthOf(5);
				done();
		});
	});



});
