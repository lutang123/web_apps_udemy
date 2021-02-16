const express = require("express")

const app = express()

// .lisen() method is to listen to a specific port for any HTTP request that get sent to our server; a port is basically just a channel that we've tuned our server to.

// app.listen(3000);

// With those three lines, we basically built our first server. This is the bare bones of an Express server. If we run node server.js, nothing is going to happen. We can add a callback function to this method:

app.listen(3000, function() {
  console.log("sever is running on port 3000")
})

// Now if we go to localhost:3000 on our browser, we get Cannot GET /, it means our browser is trying yo get in touch with our server on the port 3000, it's not able to get anything back. We need to write some code so that our server responds when a browser is making a GET request to our server.
// localhost:3000 is the same as the route of any website homepage, and this is our domain. This slash "/" represents localhost:3000/
// when we load up a website, say google.com, then our browser will send a request to Google's server; google's server tehn sees that request and it will send our browser a response, and that response includes the HTML, CSS and JS that needed to render the website. In our server, how do we send a response to our browser's GET request? we use app.get(), it's a methods provided by Express that allows us to specify what should happen when a browser gets in touch with our server and makes a GET request.
// app.get() can have two parameters, first is the location of the GET request, "/". Now when that GET request happens, we can trigger a callback function, and this callback function can have two objects: request and response. Let's first see what is the request.

// if we only have one parameter, can be any charactor as a variable name, it will see as request
// app.get("/", function(z) {
//   console.log(z)
//   // console.log(request) // we will get a lot of information about the request, this is the request made to our server:
//   // route: Route { path: '/', stack: [ [Layer] ], methods: { get: true } },[Symbol(kCapture)]: false
// })

// // if we have two parameter, can be any charactors too, the first will see as request, second is response.
// app.get("/", function(x,y) {
//   console.log(y) //we will get a lot of information about the response:
//   // ...[Symbol(kOutHeaders)]: [Object: null prototype] {'x-powered-by': [ 'X-Powered-By', 'Express' ]}}
// })


// Now we give a response to send a Hello, we will see Hello on localhost:3000, that's because when we typed in localhost:3000, we specified a location of a server, and so when we hit enter, the browser will go to that location and make a GET request to get something back. And when that request gets made at that home location, then this callback function is triggered, and we send the browser a response, in our case, a text Hello.
// "/" is home route
// we can only have one app.get("/")
app.get("/", function(req, res) {
  res.send("Hello")
})
// we can also send html as res.send("<h1>Hello</h1>")

// "/contact" is another route
app.get("/contact", function(req, res) {
  res.send("contact me at lu@email.com")
})

app.get("/about", function(req, res) {
  res.send("I like to sleep and eat")
})
