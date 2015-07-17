var express = require('express'),
	bodyParser = require('body-parser'),
	seed = require('./seed'),
	app = express(),
	router = express.Router();
	
app.use(bodyParser.json({ type: 'application/*+json' })); // В мене ця штука не запрацювала відправляв запити через POSTMAN 
app.use(bodyParser.urlencoded({                           // x-www-form-urlencoded  а так все ок
  extended: true
}));
app.use('/api', router);
app.listen(8080);

router.use(function(req, res, next) {
    next(); 
});


router.route('/country')
	.get(function (req,res){
		var countries = seed.allCountries();
		res.json(countries);
	})

	.post(function (req,res){
		var countryName = req.body.country;
		seed.addCountry(countryName);
		res.json({status: "success"});
	});

router.route('/country/:countryName/hotel')
	.get( function (req,res) {
		var hotels = seed.hotelsByCountry(req.params.countryName)
		res.json(hotels);
	})

	.post( function (req,res){
		var hotel = req.body.hotel;
		var info = req.body.info;
		var country = req.params.countryName;
		seed.addHotel(country,hotel,info);
		res.json({status: "success"});
	});

router.route('/hotel/:hotelName')
	.delete( function (req, res) {
		seed.delHotel(req.params.hotelName);
		res.json({status: "success"});
	})

	.get( function (req, res) {
		var info = seed.hotelInfo(req.params.hotelName);
		res.json(info);
	})

	.put( function (req, res) {
		seed.updHotel(req.params.hotelName,req.body.info);
		res.json({status: "success"});
	})


