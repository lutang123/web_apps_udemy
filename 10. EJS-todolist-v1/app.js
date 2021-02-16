const express = require("express")
// this is to get the data posted from html file
const bodyParser = require("body-parser")
const date = require(__dirname + "/date.js")
console.log(date);

const app = express()

// in JS, we can define a list as const and can push new items into it but not assign a different value
// you can also change the value in an const object, not the key, but can change the value
const items = ["Buy Food", "Cook Food", "Eat Food"]
const workItems = []

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({
  extended: true
}))
// use the static method from express to access local file, because our css file is on our local
app.use(express.static("public"))

//step 1: user load the page and see default list
//Step 3: user redirected to home route and see the new list
// Browser send GET request from our home route to our server, our server send a RESPONSE to handle with the GET request using (app.get(req,res))
app.get("/", function(req, res) {
  //call this funtion in date.ejs
  const day = date.getDate()
  // kindOfDay and newListItems are the ones in the list.ejs file
  // <p><%= newListItems[i] %></p>
  // it will go to views folder and look for a file list.ejs and look for the variables listTitle and newListItems 
  res.render("list", {listTitle: day, newListItems: items})
})

//Step2: user input a new list
// Browser send POST request, we can pass the data from our web page to our server and send a response. Our response is to send the data back to the browser, still display the homepage but with the new data, namely a new list.
app.post("/", function(req, res) {
  console.log("Request body is " + req.body)
  let item = req.body.newItem  //newItem is from form input  name="newItem"
  console.log("Button value is " + req.body.button)
  if (req.body.button === "Work") { //button is the name of button that we give, and button value=<%listTitle%>
   //.push is to append a new value to the list
    workItems.push(item) //buton value is the first word
    // we have defined workItems and items before outside the function, then we redirect to home route and pass over the entire arry to the key newListItems
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
    //then redirect to home route
  }
})

app.get("/work", function(req, res) {
  res.render("list", {listTitle:"Work List", newListItems:workItems}) // buton value is teh first word Work
})

app.get("/about", function(req, res) {
  res.render("about")
})

// process.env.PORT ||
app.listen(3000, function() {
  console.log("server is running on Heroku and port 3000")
})




  // // if in app.post() we write:
  // res.render("list", {newListItems: items})
  // // we will get a ReferenceError, saying newListItems in list.ejs is not defined, that's why we write res.redirect("/") and add newListItems: items in home route

  // when a post request is triggered on our home route, we will save the value of new item in that text box to a variable called item and it will redirect to the home route, which then triggers the app.get for our home route. And it will res.render the list template passing in both the kindOfDay and newListItems.

// first we need to write $npm install ejs
// then we need to tell our app to use ejs
// we also need to create a folder called views, and inside the folder, we need to create a file.ejs and this is our html template
// the view engine by default will go to the directory "views" and look for the file with .ejs that we are going to rende

////////////////////////////////// why we use ejs template

// version 1: the following works, but what if we want to send several lines of html with different format

// app.get("/", function(req, res) {
//   let today = new Date()
//   let current_dayofweek = today.getDay()  // Google search get day of the week in JavaScript
//   if (current_dayofweek === 6 || current_dayofweek === = 0) {
//     res.send("<h1>Yah, it is the weekend</h1>")
//   } else {
//     res.send("Boo! I have to work")
//     }
// })

//version 2: we use res.write to edit several messages and then send, just like email.

// app.get("/", function(req, res) {
//   let today = new Date()
//   let current_dayofweek = today.getDay()
//   if (current_dayofweek === 6 || current_dayofweek === = 0) {
//     res.write("<h1>Yah, it is the weekend</h1>")
//   } else {
//     res.write("<h1>Boo! I have to work</h1>")
//     res.write("<p>why it is not weekend</p>")
//     res.write("<img scr=" "  >")
//     res.send()
//     }
// })


// version 3: However, if we want to format our page nicely when we send a response when people log on our homepage, we need to make separate html file.

// app.get("/", function(req, res) {
//   let today = new Date()
//   let current_dayofweek = today.getDay()
//   if (current_dayofweek === 6 || current_dayofweek === = 0) {
//     res.sendFile(__dirname + "weekend.html")
//   } else {
//     res.sendFile(__dirname + "weekday.html")
//     }
// })

// if we want our response to change depends on the logic on our server code, e.g. show different day of week, then we need 7 html files, and this is repetive work, that's why we need to create a html template where we can change certain part of html depending on the logic.

///////////////////////////////////// use ejs because it is one of the most popular options

// $ npm install ejs
// <%= EJS %>
// Embedded JavaScript templating.
// EJS is a simple templating language that lets you generate HTML markup with plain JavaScript
//
// Tags
// <% 'Scriptlet' tag, for control-flow, no output
// <%= Outputs the value into the template (HTML escaped)
//
// https://github.com/mde/ejs/wiki/Using-EJS-with-Express
// Basic setup
// In Express v4, a very basic setup using EJS would look like the following. (This assumes a views directory containing an index.ejs page.
// example code:
// let express = require('express');
// let app = express();
//
// app.set('view engine', 'ejs');
//
// app.get('/', (req, res) => {
//   res.render('index', {foo: 'FOO'});
// });
//
// app.listen(4000, () => console.log('Example app listening on port 4000!'));

// in the example, the views folder has a file called index.ejs, inside app.get, we use a new the callback function, res.render, it's passing over a JavaScript object, with variable/key called foo, it is the variable that we are going to change in ejs file, and the value of it is just the word FOO.

// version 4: use switch, set day as an empty variable

// app.get("/", function(req, res) {
//   let today = new Date()
//   let current_dayofweek = today.getDay()
//   let day = ""
//
//   switch (current_dayofweek) {
//     case 0: //same as if (current_dayofweek === 0) {}
//       day = "Sunday"
//       break;
//     case 1: //same as if (current_dayofweek === 0) {}
//       day = "Monday"
//       break;
//     case 2: //same as if (current_dayofweek === 0) {}
//       day = "Tuesday"
//       break;
//     case 3: //same as if (current_dayofweek === 0) {}
//       day = "Wednesday"
//       break;
//     case 4: //same as if (current_dayofweek === 0) {}
//       day = "Thursday"
//       break;
//     case 5: //same as if (current_dayofweek === 0) {}
//       day = "Friday"
//       break;
//     case 6: //same as if (current_dayofweek === 0) {}
//       day = "Saturday"
//       break;
//     default:
//       console.log("Error: current day is equal to: " + current_dayofweek) //in most case, our default case in switch statement should never be triggered.
//   }
//
//   res.render("list", {
//     kindOfDay: day
//   })


// if we don't define items first, after posting new items, the app.post will redirect us to home route and then we are about to send the data back to browser by res.render, but we will get a ReferenceError because it doesn't know what is items. We did not get the error in the first part with kindOfDay: day, because we have defined day inside our function.

// we can not put let items inside the function, because it will become a local variable, and we can not use it outside the function.
