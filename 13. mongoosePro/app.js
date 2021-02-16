// //1. connect and create a database caleld test
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
//
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!`enter code here`
//   console.log("connected")
//
//   //2. create a schema called "kittySchema" with one property name
//   var kittySchema = new mongoose.Schema({
//     name: String
//   });
//
//   //3. add method into the schema
//   kittySchema.methods.speak = function() {
//     var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
//     console.log("the greeting is" + greeting);
//   }
//
//   //4. create a model with the collection called "kittens" in the "kittySchema", assign the model to any name (normally the same name as collection)
//   var cat = mongoose.model('Kitten', kittySchema);
//   console.log("the model is" + cat)
//
//   //5. create a document into the collection kitten, we call this document as silence, but we do not save to the collection, only console log
//   var silence = new cat({
//     name: 'Silence'
//   });
//   console.log(silence.name); // 'Silence'
//
//   //5'. create another document and save into collection
//   var fluffy = new cat({
//     name: 'fluffy'
//   });
//   fluffy.speak(); // "Meow name is fluffy"
//   fluffy.save(function(err, fluffy) {
//     if (err) return console.error(err);
//     // fluffy.speak();
//     console.log(fluffy.speak())
//     console.log(fluffy)
//   });
//
//   //5'. create another document and save into collection
//   var sweet = new cat({
//     name: 'cuty'
//   });
//   sweet.speak(); // "Meow name is fluffy"
//   sweet.save(function(err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//     console.log(fluffy.speak())
//     console.log(fluffy)
//   });
//
//   //6. same as db.kittens.find()
//   cat.find(function(err, kittens) {
//     if (err) return console.error(err);
//     console.log(kittens);
//   })
//   // We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.
//
//   //6'. same as db.kittens.find({name: /^fluff/})
//   cat.find({
//     name: /^fluff/
//   }, function() {
//     console.log(fluffy)
//   });
//
//   //7. insertMany
//   const kiwi = new cat({
//     name: 'Kiwi',
//     rating: 10,
//     review: "Awesome"
//   });
//   const orange = new cat({
//     name: 'orange',
//     rating: 8,
//     review: "Good"
//   });
//   const banana = new cat({
//     name: 'Banada',
//     rating: 6,
//     review: "ok"
//   });
//
//   cat.insertMany([kiwi, orange, banana], function(err) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log("Successfully saved all the fruits to FruitsDB")
//     }
//   })
//
//   // 8. loop through all
//   cat.find(function(err, fruits) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(fruits)
//       fruits.forEach(function(fruit) {
//         console.log(fruit.name)
//       })
//     }
//   })
//
// });

// So far so good. We've got a schema with one property, name, which will be a String. The next step is compiling our schema into a Model.
// 2.
// var cat = mongoose.model('Kitten', kittySchema);
// console.log(cat)
// a collection called kittens will be created

// if just cope and pasy mongoose example, it will show an error, explained by below:
// You're compiling your schema twice, and one of those times is before defining the method. This line specifically:
//
// var Kitten = mongoose.model('Kitten', kittySchema)
// You need to wait until after you've defined your kittySchema.methods before compiling it with mongoose.model. Your own code comment is telling you not to do this :)
//
// Also, for future reference, the TypeError: undefined is not a function error you pasted isn't of much use but the call stack below it is, where it points out that fluffy has no method 'speak'.

// A model is a class with which we construct documents. In this case, each document will be a kitten with properties and behaviors as declared in our schema. Let's create a kitten document representing the little guy we just met on the sidewalk outside:

// Kittens can meow, so let's take a look at how to add "speak" functionality to our documents:

// NOTE: methods must be added to the schema before compiling it with mongoose.model(), IMPORTANT: add methose first and then use mongoose.model(), model can only be used once

// Getting Started
// First be sure you have MongoDB and Node.js installed.
//
// Next install Mongoose from the command line using npm:
//
// $ npm install mongoose
//
// Now say we like fuzzy kittens and want to record every kitten we ever meet in MongoDB. The first thing we need to do is include mongoose in our project and open a connection to the test database on our locally running instance of MongoDB.






var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test3', {useNewUrlParser: true, useUnifiedTopology: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected")
  // 1. create a schema
  var kittySchema = new mongoose.Schema({name: String});
  // 2. add method
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log("The first greeting is " + greeting); //only print after everything is crated and saved
  }
  // 3. create a model (collections)
  var cat = mongoose.model('Kitten', kittySchema);
  console.log("The model is " + cat)//this model now have the schema with property and a method
  // 4. add and save documents
  var fluffy = new cat({ name: 'fluffy' });
  // fluffy.save(function (err, fluffy) {
  //   if (err) return console.error(err);
  //    fluffy.speak();
  //    console.log("fluffy speak like this " + fluffy.speak())
  //   });

  var sweet = new cat({ name: 'cute' });
  // sweet.save(function (err, x) {
  //   if (err) return console.error(err);
  //    x.speak();
  //    console.log("sweet speak like this " + x.speak())
  //   });

  cat.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log("All the kittens are " + kittens);
  })

  cat.find({ name: /^fluff/ }, function() {
    console.log("The fluffy is " + fluffy)
  });

  cat.find({ name: /^cute/ }, function() {
    console.log("The cute is " + sweet)
  });

  cat.updateOne({_id: "5e6eb72dfb8130ba2077094b"}, {name: "watermelon"}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Successfully updated the document")
    }
  })

});




// Once our connection opens, our callback will be called. For brevity, let's assume that all following code is within this callback.
//

// This performs a search for all documents with a name property that begins with "Fluff" and returns the result as an array of kittens to the callback.
//
// Congratulations
// That's the end of our quick start. We created a schema, added a custom document method, saved and queried kittens in MongoDB using Mongoose. Head over to the guide, or API docs for more.
