//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Hello everyone! Welcome to the blog. This web application is based on a complete full stack approach with technologies like HTML, CSS, EJS, Bootsptrap, Git, Nodejs, MongoDB, Mongoose .etc. Well it's a fully fledged responsive website where we post articles from the server side and client side. Its basic function is to upload and update the article's which are present on the web application";

const aboutContent = "For updation of any blog kindly send it at blogside@gmail.com if your content is found to be relevant we will be glad to post it. Thanks for being a part of our community.";

const contactContent = "Mail at blogside@gmail.com or in case of any irregularities or utter delays do drop your mail at rajivsirothia@gmail.com";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB2", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/interview",function(req,res){
  res.render("interview");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.post("/interview",function(req,res){
  const post=new Post({
    title:req.body.compTitle,
    content:req.body.compExp
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});


app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
