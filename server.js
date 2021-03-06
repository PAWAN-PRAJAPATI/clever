
var express = require('express'),
app = express(),
port = process.env.PORT || 5000,
bodyParser = require('body-parser');
const keys = require('./keys.js')

var MongoClient = require('mongodb').MongoClient;
var url = keys.MONGO.url

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
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port,'0.0.0.0');


console.log('todo list RESTful API server started on: ' + port);






/*

var express = require('express'),
app = express(),
port = process.env.PORT || 5000,
bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tasksget', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
 });

 app.post('/tasksget', function(req, res) {
  try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body}


  console.log(req.body.data);
  res.send(JSON.stringify(req.body));
});

app.listen(5000,'0.0.0.0');


console.log('todo list RESTful API server started on: ' + port);
*/
