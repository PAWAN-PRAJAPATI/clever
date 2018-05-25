var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
Task = require('./api/models/todoListModel'), //created model loading here
bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// mongoose instance connection url connection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Todos");
    dbo.createCollection("tasks", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
