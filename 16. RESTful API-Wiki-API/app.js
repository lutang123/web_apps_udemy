const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// mongoose.connect('mongodb+srv://admin-lu:0629*Salu@cluster0-igwj0.mongodb.net/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
// :27017
mongoose.connect('mongodb://localhost/wikiDB', {useNewUrlParser: true, useUnifiedTopology: true});
// create a collection called listItems in ListModel
const wikiSchema = new mongoose.Schema({title: String, content: String})
const Article = mongoose.model("Article", wikiSchema)

///////////////////////////////////Requests Targetting all Articles////////////////////////

app.route("/articles")

.get(function(req, res){
  Article.find({}, function(err, articles){
    if (!err) {
      res.send(articles)
    } else {
      res.send(err)
    }
  })
})

// not working?? in postman body
.post(function(req, res){
  console.log(req.body.title)
  console.log(req.body.content)

  const article = new Article({title:req.body.title, content:req.body.content})
  article.save(function(err){
    if (!err) {
      res.send("Successfully send the documents")
    } else {
      res.send(err)
    }
  })
})

.delete(function(req, res){
  Article.deleteMany({}, function(err){
    if (!err){
      res.send("Successfully deleted all the articles")
    } else{
      res.send(err)
    }
  })
})


////////////////////////////////Requests Targetting A Specific Article////////////////////////















app.listen(3000, function() {
  console.log("server is running on Heroku or port 3000")
})
