var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://u7ehgyjt3zarc3h:lzdlv20kbLLYtJlekg43@bdgt0ets7z2gj71";

// mongoose instance connection url connection
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("bdgt0ets7z2gj71");
    dbo.createCollection("tasks", function(err, res) {
      if (err) throw err;
      console.log("Collection created!");
      db.close();
    });
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    next();
  });

var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(process.env.PORT, '0.0.0.0');


console.log('todo list RESTful API server started on: ' + port);
