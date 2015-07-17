var data = {
	'USA' : {
		'hotels' : [
			{
				'name': 'GhettoPalace',
				'info': 'INFO' 
			},
			{
				'name': 'Compton',
				'info': 'INFO' 
			},
			{
				'name': 'Bronx',
				'info': 'INFO' 
			}
		]
	},

	'Ukraine' : {
		'hotels' : [
			{
				'name': 'Shulya',
				'info': 'INFO'
			},
			{
				'name': 'Padik',
				'info': 'INFO'
			},
			{
				'name': 'Berest',
				'info': 'INFO' 
			}	
		]
	}
};

function allCountries () {
	return JSON.stringify(Object.keys(data));
}

function hotelsByCountry(country) {
	var hotels = data[country].hotels;
	return JSON.stringify(hotels);
}

function addCountry (country) {
	data[country] = {};
}

function addHotel (country,hotel,info) {
	data[country].hotels.push({
		'hotel': hotel,
		'info': info
	});
}

function delHotel(hotel) {
	for (var country in data) {
		data[country].hotels.forEach( function (item,i,arr){
		if (item.name == hotel){
			arr.splice(i,1);
		}
	});
	}
}

function hotelInfo(hotel){
	var res;
	for (var country in data) {
		data[country].hotels.forEach( function (item,i,arr){

		if (item.name == hotel){
			res = item['info'];
		}
		});
	}
	return res
}

function updHotel (hotel, info) {
	for (var country in data) {
		data[country].hotels.forEach( function (item,i,arr){
		if (item.name == hotel){
			item['info'] = info;
		}
	});
	}
}

module.exports = {
	allCountries : allCountries,
	hotelsByCountry : hotelsByCountry,
	addCountry: addCountry,
	addHotel: addHotel,
	delHotel: delHotel,
	hotelInfo: hotelInfo,
	updHotel: updHotel
}

hotelInfo('Padik');
