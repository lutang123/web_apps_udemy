const express = require('express')

const app = express()

// if we want data from the web, i.e. a get request from external resources
// the module request has retired, it will still work but we will use https module

// no need to install https because it is a native node module, not external package; we are going to use https module to perform a GET request.
const https = require('https')

// we use body-parser to deal with html post method, when we input a data on our website and click submit button, body-parser helps us to get and use that data
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


// '/' is the root route, our client who use browser to access our website, the browser will send a GET request to our server. By app.get('/', function(req, res) {...}), we can allow the GET request to be sent to our "/" location and give a response, our response is to send file with directory to our index.html file. In this way, browser will display our html file. if we only write app.get("/"), browser will still show "Cannot GET /"

// // the following is example code
// https.get('https://encrypted.google.com/', (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);
//
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
//
// }).on('error', (e) => {
//   console.error(e);
// });


app.get('/', function(req, res) {
  res.sendFile(__dirname +'/index.html');
  // we can only have one res.send on a page. need to delete the previous testing code
  // res.send('Server is up and running')
})


app.post('/', function(req, res) {

  query = req.body.cityName
  apiKey = "9f5a24b18a5d319363475a46233fa18e"
  units = "metric"
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+ "&appid="+apiKey+"&units="+units
  // Now the browser send a POST request, what we are going to response? we need to send a GET request to api to get data as our response
  // https.get(url[, options][, callback]), // this is to send a GET request to access api data, after we sent a GET request, we pass a function as RESPONSE. i.e. to make a get request to openweathermap to get the data
  https.get(url, function(response) {

    console.log(response.statusCode)

    response.on('data', function(data) {

      console.log(data); // data is all bytes

      //we use JSON.parse() to parse data to JS object, like taking packed furniture to 
      const weatherJason = JSON.parse(data)
      console.log(weatherJason) //now we see Json data

      //e.g. on 
      const object = {
        name: 'Angela',
        favoriteFood: 'Ramen'
      }
      console.log(JSON.stringify(object)); //this return the flat format like packed furniture

      const temp = weatherJason.main.temp;
      console.log(temp)

      const feelLike = weatherJason.main.feels_like;
      console.log(feelLike)

      const description = weatherJason.weather[0].description;
      console.log(description)

      const icon = weatherJason.weather[0].icon
      const imageUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
      // in order to display our data in the browser, we need to use 'res', which is response from the app.get method.
      res.write("<h1> The current weather in "+query+" is " + description + "</h1>")
      res.write("<p>The tempreture in "+query+" is " + temp + " degrees Celcius</p>")
      res.write("<img src="+imageUrl+">")
      res.send()
    })

  })

})


app.listen(3000, function() {
  console.log("server is running at port 3000")
})
