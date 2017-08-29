var express = require('express');
var app = express();
var cons = require('consolidate');
var path = require('path');
var bodyParser = require('body-parser');
var mysqlserver = require("mysql");
var userService = require("./webContent/app/services/UserService");
var http = require('http');
app.set('port', process.env.PORT || 3000);
var server = http.createServer(app);
var io = require('socket.io').listen(server);




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

/*var user = {};
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
});*/

//Whenever someone connects this gets executed
var user = {};
io.on('connection', function(socket) {

	socket.on('setUsername', function(data) {
		user = {
			username : data
		}
		console.log("a user connected ::" + user.username);
		socket.emit('userSet',{username :user.username});	
	});
	 socket.on('msg', function(data){
	      //Send message to everyone
	      io.sockets.emit('newmsg', data);
	  })
	
	

/*socket.on('connect_failed', function() {
    document.write("Sorry, there seems to be an issue with the connection!");
})*/
});

app.get('/about', function(req, res) {
	res.render('about.html');
});

server.listen(app.get('port'));