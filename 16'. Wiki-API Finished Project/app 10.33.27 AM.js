//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model("Article", articleSchema);

///////////////////////////////////Requests Targetting all Articles////////////////////////

//documentation express routing: https://expressjs.com/en/guide/routing.html
app.route("/articles")

//when people go to localhost:3000/articles, they will see all articles in Json format
.get(function(req, res){
  Article.find(function(err, foundArticles){
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
})

//when people post a new article, this new article will be added to our database, because we don't html or ejs file, we can test the response through Postman
.post(function(req, res){
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  //save function takes an optional condition and a callback function
  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){
  //deleteMany function takes an optional condition and a callback function
  Article.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all articles.");
    } else {
      res.send(err);
    }
  });
});

////////////////////////////////Requests Targetting A Specific Article////////////////////////

app.route("/articles/:articleTitle")

// if user search localhost:3000/articles/Jack-Bauer
// req.params.articleTitle = "Jack-Bauer"

//HTML Encoding, space: %20
// if user search localhost:3000/articles/Jack%20Bauer
// req.params.articleTitle = "Jack%20Bauer"

.get(function(req, res){
                   //this is the search condition
  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle) {
      res.send(foundArticle);
    } else {
      res.send("No articles matching that title was found.");
    }
  });
})

.put(function(req, res){

  Article.update(
    {title: req.params.articleTitle}, //{conditions}
    //title and body is our key in database
    {title: req.body.title, content: req.body.content}, //{updates}
    {overwrite: true},
    function(err){ //function(err, result){}
      if(!err){
        res.send("Successfully updated the selected article.");
      }
    }
  );
})

.patch(function(req, res){
 
  //when client send a patch request, body-parser will parse the request and picked out the field they have provided updates to,and by using the set flag, we are able to update our database for only the fields that have new value
  Article.update(
    {title: req.params.articleTitle}, //{conditions}
    {$set: req.body},//{$set: conditions}, e.g {$set: {content: ""}} or {$set: {content: "", title: ""}} 
    // if user changed content and title to test, then req.body = {title:"test", content:"test"}
    // if user only changed title to test, then req.body = {title:"test"}
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Article.deleteOne(
    {title: req.params.articleTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding article.");
      } else {
        res.send(err);
      }
    }
  );
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
