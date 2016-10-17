var express = require('express');
var path    =   require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var app = express();

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extented: false}));

//routes
app.use('/', index);
app.use('/api', tasks);

var port = 3000;
app.listen(port, function(){
    console.log('Listening on port ' + port);
});