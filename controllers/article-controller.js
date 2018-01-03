var Article = require("../models/Article");

module.exports = {
  // get articles from database
  find: function(req, res) {
    console.log("article-controller: find:");
    Article.find().then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // add new article to database
  insert: function(req, res) {
    console.log("article-controller: insert:");
    console.log("req.body: ", req.body);
    Article.create(req.body).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // delete article from database
  delete: function(req, res) {
    console.log("article-controller: delete:");
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};
