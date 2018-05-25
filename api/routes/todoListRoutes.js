module.exports = function(app) {
    var todoList = require('../controllers/todoListController');
  
    // todoList Routes
    app.route('/getall')
      .get(todoList.create_a_task);
    
    app.route('/tasks')
      .get(todoList.read_a_task)
  };
  
  
