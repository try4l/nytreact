const express = require("express");
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');


const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

mongoose.connect('mongodb://localhost/nytreact');
//mongoose.connect('mongodb://heroku_jns4phwt:61tt9c1oiotedcl5ndjhfv9pn5@ds019936.mlab.com:19936/heroku_jns4phwt');


var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

// app.get('/', function(req, res){
//   res.sendFile('./public/index.html');
// });

// app.get('/api/articles', function(req, res) {

//   Article.find({})
//     .exec(function(err, doc){

//       if(err){
//         console.log(err);
//       }
//       else {
//         res.send(doc);
//       }
//     })
// });

// app.post('/api/articles', function(req, res){

//   var newArticle = new Article({
//     title: req.body.title,
//     date: req.body.date,
//     url: req.body.url
//   });

//   newArticle.save(function(err, doc){
//     if(err){
//       console.log(err);
//       res.send(err);
//     } else {
//       res.json(doc);
//     }
//   });

// });

// app.delete('/api/articles', function(req, res){

//   Article.find({'_id': req.params.id}).remove()
//     .exec(function(err, doc) {
//       res.send(doc);
//   });

// });

// // Send every request to the React app
// // Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


// Routing
var articlesController = require("./controllers/article-controller");
var router = new express.Router();
// Define any API routes first
// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
