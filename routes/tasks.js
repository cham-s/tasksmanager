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

// save task

router.post('/task/', function(req, res, next){
    var task = req.body;
    if (!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

// delete task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
    });
});

// update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updatedTadk = {};

    if (task.isDone) {
        updatedTadk.isDone = task.isDone;
    }

    if (task.title) {
        updatedTadk.title = task.title;
    }

    if (!updatedTadk) {
        res.status(400);
        res.json({
           "error": "Bad Data" 
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updatedTadk, {}, function(err, task){
        if (err) {
            res.send(err);
        }
        res.json(task);
         });
    }    
});



module.exports = router;