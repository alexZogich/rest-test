var http = require('http'),
	seed = require('./seed');

http.createServer( function (req, res) {
	requestHadler(req,res);
}).listen(1337,'127.0.0.2')	

function requestHadler(req, res) {

	var status = {status: "sucess"};

	if (req.url == '/api/country' && req.method == 'GET') {
		var countries = seed.allCountries();
		res.end(countries);
	}

	if (req.url.substr(0,13) == '/api/country/' && req.url.slice(-6) == '/hotel'  && req.method == 'GET' ) { // i
		var urlArr = req.url.substr(13).split("/");
		var hotels = seed.hotelsByCountry(urlArr[0])
		res.end(hotels);
	}
	/*
		Date sholud posted as like {"country": "China"}
	*/
	if (req.url == '/api/country' && req.method == 'POST') {
		var reqData = "";
		req.on('data', function (chunk){
			reqData += chunk.toString();
		});

		req.on('end', function (){
			var countryName = JSON.parse(reqData).country;
			seed.addCountry(countryName);
			res.end(JSON.stringify(status));
		})
	}

	if (req.url.substr(0,13) == '/api/country/' && req.url.slice(-6) == '/hotel'  && req.method == 'POST' ) {
		var urlArr = req.url.substr(13).split("/");
		
		country = urlArr[0];

		var reqData = "";
		req.on('data', function (chunk){
			reqData += chunk.toString();
		});

		req.on('end', function (){
			var hotel = JSON.parse(reqData).hotel;
			var info = JSON.parse(reqData).info;
			seed.addHotel(country,hotel,info);
			res.end(JSON.stringify(status));
		})
	}

	if (req.url.substr(0,11) == '/api/hotel/' && req.method == 'DELETE' ) {
		var hotel = req.url.substr(11);
		seed.delHotel(hotel);
		res.end(JSON.stringify(status));
	}

	if (req.url.substr(0,11) == '/api/hotel/' && req.method == 'GET' ) {
		var hotel = req.url.substr(11);
		var info = seed.hotelInfo(hotel);
		res.end(info);
	}

	if (req.url.substr(0,11) == '/api/hotel/' && req.method == 'PUT' ) {
		var hotel = req.url.substr(11);
		
		var reqData = "";
		req.on('data', function (chunk){
			reqData += chunk.toString();
		});

		req.on('end', function (){
			var info = JSON.parse(reqData).info;
			seed.updHotel(hotel,info);
			res.end(JSON.stringify(status));
		})
	}

}