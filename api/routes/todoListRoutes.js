module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
  
    // todoList Routes
    app.all('/tasksget', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
     });
    
    app.route('/getall')
      .get(todoList.create_a_task);
    
    app.route('/tasks')
      .get(todoList.read_a_task)
  };
  
  
