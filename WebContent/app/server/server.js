var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
/*var routes = require('../routes');*/
var pub = __dirname;
app.use(function(res, req, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
/*app.use(app.router);*/
app.use(express.static(pub));
app.use(bodyParser.urlencoded({
	extended : true
}));

app.set('views', path.join(__dirname, '../views/'));
app.set('view engine', 'pug');


app.get('/', function(req, res) {
	res.status(200).sendFile('index.html', {
		root : path.join(__dirname, '../views/')
	});
});

var user = {};
app.post("/login", function(req, res) {
	res.send("hello world");
	user = {
		username : req.body.name,
		password : req.body.password
	}
	
	console.log(JSON.stringify(user));
	/*res.writeHead(200, {'Content-Type': 'text/html'});
	 res.render('test', { message: user.username });
	 res.end();*/
	
	 
});



app.listen(8080, function() {
	console.log("listening");
});