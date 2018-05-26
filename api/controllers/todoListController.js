var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://u7ehgyjt3zarc3h:lzdlv20kbLLYtJlekg43@bdgt0ets7z2gj71-mongodb.services.clever-cloud.com:27017/bdgt0ets7z2gj71";



exports.list_all_tasks = function(req, res) {

//"mongodb://username:password@localhost:27017/exampledatabase", 
  Task.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {

 
  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("bdgt0ets7z2gj71");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("tasks").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
};



exports.read_a_task =function(req, res) {
  try{req.body = JSON.parse(Object.keys(req.body)[0])}catch(err){req.body = req.body}
  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("bdgt0ets7z2gj71"); 
   //var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("tasks").find({}).toArray(function(err, result) {
      res.send(req.body)
    });
  });
};




exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};
