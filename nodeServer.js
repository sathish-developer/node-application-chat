var express = require('express');
var app = express();
var cons = require('consolidate');
var path = require('path');
var bodyParser = require('body-parser');
var mysqlserver = require("mysql");
var userService=require("./webContent/app/services/UserService");



//view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, './webContent/app/views/'));
app.set('view engine', 'html');


/*to get request values from html page*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
}));

/*app.use(express.static(__dirname + '../views/'));*/


app.get('/', function(req, res) {
	res.render('index.html');
});

var user = {};
app.post('/login', function(req, res) {
	user = {
		username : req.body.name,
		password : req.body.password
	}
	console.log(JSON.stringify(user));
	userService.insertUser(user);
	userService.fetchUser(user);
	
	res.render('welcome.html', {
		'message' : user.username
	});
});


app.get('/about', function(req, res) {
	res.render('about.html');
});


app.listen('8080', function() {
	console.log("listening");
});