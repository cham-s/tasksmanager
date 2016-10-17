var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://chams:root@ds023425.mlab.com:23425/tasklist_db', ['tasks']);


// Get All tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if (err) {
            res.send(err);
        }
        res.json(tasks);
    });
});


// Get single task
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});
module.exports = router;