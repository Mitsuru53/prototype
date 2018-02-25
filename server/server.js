const http = require('http');
const express = require('express')
const bodyParser = require('body-parser');
const request = require('request');
const async = require('async');


const app = express()

const { getCity } = require('../modules/address');

app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);

server.listen(app.get('port'), () => {
	console.log(`Server listening on port ${app.get('port')}...`)
})

app.get('/search', function (req, res) {
  let city = getCity(req.query.address);

  async.waterfall([
		function(callback) {
		  let gnaviUrl = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/';
			let gnaviQuery = {
			  	keyid: process.env.GURUNAVI_API_KEY,
				  format: "json",
				  hit_per_page: 9,
				  freeword: city,
				  freeword_condition: 2
		  };
		  let gnaviOptions = {
			  	url: gnaviUrl,
				  headers : {"Content-Type": "application/json; charset=utf-8"},
				  qs: gnaviQuery,
				  json: true
		  };
			let resultArray = [];
		  request.get(gnaviOptions, function (error, response, body) {
			  if('error' in body){
				  console.log("検索エラー" + JSON.stringify(body));
				  callback(body.error, body);
			  }
				let restaurants = body.rest;
				restaurants.forEach(restaurant => {
				  let result = {};
					result['name'] = restaurant.name;
					result['url'] = restaurant.url;
					result['pr'] = restaurant.pr.pr_short;
					result['image_url'] = restaurant.image_url.shop_image1;
					resultArray.push(result)
				});
				callback(null, resultArray);
		  });
    },
	],function(err, args){
		if (err != null) {
			console.log(err)
			res.send(err)
			return;
		}
	  let jsonRestaurants = JSON.stringify(args);
		res.send(jsonRestaurants)
	});
});
