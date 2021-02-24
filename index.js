var express = require('express')
var app = express()
const axios = require('axios');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.send('Hello World1!')
})

app.get('/getweather', function(request, responsefromWeb) {
  axios.get('https://api.weather.gov/alerts?active=1&state=MN')
  .then(function (response) {
    responsefromWeb.send(response.data.features);
  })
  .catch(function (error) {
    console.log(error);
    responsefromWeb.send(error);
  });
})

app.get('/connecttoMC', function(request, responsefromWeb) {
	var conData = {
    'clientId': process.env.CLIENT_ID,
    'clientSecret': process.env.CLIENT_SECRET  
  	}
	axios({
	  method:'post',
	  url:'https://auth.exacttargetapis.com/v1/requestToken',
	  data: conData,
	  headers:{
       'Content-Type': 'application/json',
	  }
	})
	  .then(function(response) {
	  	console.log(response);
	  		responsefromWeb.send('Authorization Sent');
	  		token = response.data.accessToken;
	  	
	}).catch(function (error) {
	    console.log(error);
	    responsefromWeb.send(error);
	  });
})
