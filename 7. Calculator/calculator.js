// requrie express
const express = require('express');
// setup express Application
// The app object conventionally denotes the Express application. Create it by calling the top-level express() function exported by the Express module:
const app = express();

// requrie body-parser, we can then parse the http request we get
const bodyParser = require("body-parser");
//use body-parser, because we input some number into our form, how do we access the number, we use body-parser.
// bodyParser has a lof of methods, whenever we need to grab information from posting on a html form, we use urlencoded
//by urlencoded, we can get access to the form data and tap into each of these
app.use(bodyParser.urlencoded({extended: true}));

// clients type our website url (currently on localhost:3000) on a browser and then hit enter: this will make the browser send a GET request to our server. How our server should response to GET request? that is simply app.get('/'), we then pass a function to send RESPONSE. (Just like we type google.com and hit enter, that means we send a GET request to google server; then google server send us a RESPONSE)
// app.get('/', (req, res) => res.send('Hello World'))
//response browser's Get request
app.get('/', function(req, res) {

  // https://expressjs.com/en/4x/api.html#res
  // res.sendFile(path [, options] [, fn])
  // Transfers the file at the given path. Sets the Content-Type response HTTP header field based on the filename’s extension. Unless the root option is set in the options object, path must be an absolute path to the file.
  // must use absolute path, if only write "index.html", it is relative path
  // __dirname is the whole path, from home to desktop to our folder, we have to specific this because in the future when we deploy/host our server on the cloud or someone else's server, so they don't know where is "index.html". '__dirname' is a constant.
  // my understanding is we send our html directory to browser as our response from our server. then the browser can display our html file
  console.log(__dirname) //__dirname shows the current directory no matter where do you host your website
  res.sendFile(__dirname +'/index.html');  //this is absolute path
  // the root route is for our first calculator, if we add another file to a new page, we need to send to a different route, we can not have two sendFile to '/'
});

// use app.post() because in html we use a post method in index.html we have a form with the method post, so when we click a button, we are posting some information to the server, so we need to add a post method to our app to handle the post from the form
// this means when we input some data into the form and hit enter, the browser will send us a POST request. If we don't have this app.post, after posting data on the form, we will see browser display "Cannot POST /", (just like if we don't have app.get, our browser will display "Cannot GET /")

// e.g. we can simply respond a message "Thanks for using the Calculator"
// app.post("/", function(req, res) {
//   res.send("Thanks for using the Calculator")
// })
//response browser's POST request
app.post('/', function(req, res) {
  // must refresh and then input number and then click "Calculate"
  // we already required the body-parser
  console.log(req.body);
  console.log(req.body.num1);
  console.log(req.body.num2);

  var num1 = req.body.num1;
  var num2 = req.body.num2;
  // USE Number() to convert string to a number
  var result = Number(num1)+Number(num2);

  // Response
  // The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
  // res.send([body])
  // Sends the HTTP response.
  // The body parameter can be a Buffer object, a String, an object, or an Array
  res.send("The result of the calculation is " + result);
});


// this is for the route of localhost:3000/bmicalculator
app.get('/bmicalculator', function(req, res) {
  res.sendFile(__dirname +'/bmiCalculator.html');
});

app.post('/bmicalculator', function(req, res) {

  var weight = parseFloat(req.body.weight);
  var height = parseFloat(req.body.height);

  var bmi = Math.round(weight/(Math.pow(height,2)));

  res.send("Your BMI is " + bmi);
});



// spin up our server on port 3000 with the app.listen
app.listen(3000, function() {
  console.log("server is running on port 3000");
});

// run server with nodemon
