// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/newDB2', {useNewUrlParser: true, useUnifiedTopology: true});

// We have a pending connection to the newDB database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")
});

// 1.
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
    required: [true, "name is required"]
  },
  rating: {
    type: Number,
    min:1,
    max:10
  },
  review: String
});

// 2.
const Fruit = mongoose.model('Fruit', fruitSchema);
// A model is a class with which we construct documents. In this case, each document will be a fruit with properties and behaviors as declared in our schema. Let's create a fruit document representing the little guy we just met on the sidewalk outside:

// 3.
const apple = new Fruit({ name:'Apple', rating:7, review:"Solid" });
console.log(apple.name); // 'Silence'
// apple.save()

const peach = new Fruit({ name:'Peach', rating:10 });
console.log(peach.name);
// peach.save()

// new collection with new schema and new model
const personSchema = new mongoose.Schema ({name: String, favorite: fruitSchema})
const x = mongoose.model("hello", personSchema)
const human = new x({name: "John"})
// human.save()
// a collection called hellos will be created

const pineapple = new Fruit({name: "Pineapple", rating: 10, review:"Great"})
// pineapple.save()

const person = new x({name: "Amy", favorite: pineapple})
// person.save()

// > db.fruits.find()
// { "_id" : ObjectId("5e6ebc97443598ba86b3581d"), "name" : "Apple", "rating" : 7, "review" : "Solid", "__v" : 0 }
// { "_id" : ObjectId("5e6ebc97443598ba86b35820"), "name" : "Kiwi", "rating" : 10, "review" : "Awesome", "__v" : 0 }
// { "_id" : ObjectId("5e6ebc97443598ba86b35821"), "name" : "orange", "rating" : 8, "review" : "Good", "__v" : 0 }
// { "_id" : ObjectId("5e6ebc97443598ba86b35822"), "name" : "Banada", "rating" : 6, "review" : "ok", "__v" : 0 }
// { "_id" : ObjectId("5e6fb30b8859aebbd40352c1"), "name" : "Pineapple", "rating" : 10, "review" : "Great", "__v" : 0 }
// > db.hellos.find()
// { "_id" : ObjectId("5e6fb30b8859aebbd40352c2"), "name" : "Amy", "favorite" : { "_id" : ObjectId("5e6fb30b8859aebbd40352c1"), "name" : "Pineapple", "rating" : 10, "review" : "Great" }, "__v" : 0 }

const mongo = new Fruit({name: "Mongo", rating: 10, review:"Great"})

x.updateOne({_id: "5e6fb3f4cc4db1bbfb66b3a7"}, {favorite: mongo}, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log("Successfully updated the document")
  }
})


const kiwi = new Fruit({ name:'Kiwi', rating:10, review:"Awesome" });
const orange = new Fruit({ name:'orange', rating:8, review:"Good" });
const banana = new Fruit({ name:'Banada', rating:6, review:"ok" });

// Fruit.insertMany([kiwi, orange, banana], function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully saved all the fruits to FruitsDB")
//   }
// })

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err)
  } else {
    console.log(fruits)

    fruits.forEach(function(fruit) {
      console.log(fruit.name)
    })
  }
})



// Fruit.updateOne({_id: "5e6e92dc38f512b79365bd7d"}, {name: "watermelon"}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully updated the document")
//   }
// })


// Character.deleteOne({ name: 'Eddard Stark' }, function (err) {});
// Deletes the first document that matches conditions from the collection. Behaves like remove(), but deletes at most one document regardless of the single option.
// Fruit.deleteOne({name:"Peach"}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully deleted the document")
//   }
// })
//
// // Character.deleteMany({ name: /Stark/, age: { $gte: 18 } }, function (err) {});
// x.deleteMany({name:"John"}, function(err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log("Successfully deleted all the document")
//   }
// })







// Getting Started
// First be sure you have MongoDB and Node.js installed.
//
// Next install Mongoose from the command line using npm:
//
// $ npm install mongoose
//
// Now say we like fuzzy kittens and want to record every kitten we ever meet in MongoDB. The first thing we need to do is include mongoose in our project and open a connection to the test database on our locally running instance of MongoDB.

// another collection called Person, mongoose will automatically make it people in the database, just like we made Fruit, but in show collections in mongo shell, it became fruits.

// // Compiling your first model
// // When you call mongoose.model() on a schema, Mongoose compiles a model for you.
// mongoose.connect('mongodb://localhost/gettingstarted', {useNewUrlParser: true});
// var schema = new mongoose.Schema({ name: 'string', size: 'string' });
// var Tank = mongoose.model('Tank', schema);
// // The first argument is the singular name of the collection your model is for. ** Mongoose automatically looks for the plural, lowercased version of your model name. ** Thus, for the example above, the model Tank is for the tanks collection in the database.
// //
// // Note: The .model() function makes a copy of schema. Make sure that you've added everything you want to schema, including hooks, before calling .model()!
// //
// // Note that no tanks will be created/removed until the connection your model uses is open. Every model has an associated connection. When you use mongoose.model(), your model will use the default mongoose connection.
//
// // If you create a custom connection, use that connection's model() function instead.
// var connection = mongoose.createConnection('mongodb://localhost:27017/test');
// var Tank = connection.model('Tank', yourSchema);


// first node app_new.js we get the following:
// Apple
// Peach
// connected
// []
// Successfully updated the document
// Successfully saved all the fruits to FruitsDB



// // NOTE: methods must be added to the schema before compiling it with mongoose.model()
// kittySchema.methods.speak = function () {
//   var greeting = this.name
//     ? "Meow name is " + this.name
//     : "I don't have a name";
//   console.log(greeting);
// }
//
// var Kitten = mongoose.model('Kitten', kittySchema);
// // Functions added to the methods property of a schema get compiled into the Model prototype and exposed on each document instance:
//
// var fluffy = new Kitten({ name: 'fluffy' });
// fluffy.speak(); // "Meow name is fluffy"
// // We have talking kittens! But we still haven't saved anything to MongoDB. Each document can be saved to the database by calling its save method. The first argument to the callback will be an error if any occurred.
//
//   fluffy.save(function (err, fluffy) {
//     if (err) return console.error(err);
//     fluffy.speak();
//   });
// // Say time goes by and we want to display all the kittens we've seen. We can access all of the kitten documents through our Kitten model.
//
// Kitten.find(function (err, kittens) {
//   if (err) return console.error(err);
//   console.log(kittens);
// })
// // We just logged all of the kittens in our db to the console. If we want to filter our kittens by name, Mongoose supports MongoDBs rich querying syntax.
//
// Kitten.find({ name: /^fluff/ }, callback);
// // This performs a search for all documents with a name property that begins with "Fluff" and returns the result as an array of kittens to the callback.
// //
// // Congratulations
// // That's the end of our quick start. We created a schema, added a custom document method, saved and queried kittens in MongoDB using Mongoose. Head over to the guide, or API docs for more.
