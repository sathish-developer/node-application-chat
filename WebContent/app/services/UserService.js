
var mysqlserver = require("mysql");


var fs = require('fs'),
configPath = './webContent/app/config/dbConfig.json';
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig=  parsed;

console.log("db configuration "+JSON.stringify(parsed));


var connectionObject = mysqlserver.createConnection(parsed);
connectionObject.connect(parsed, function(err) {
	if (err) {
		console.log(err);
	} else {
		console.log("successfully connected");
	}
});

module.exports={
		
			hello: function(data)
			{
				console.log("hello iam from UserService"+data);
			},
			
			fetchUser : function(user)
			{
				console.log(":::::::::::::::::::::::::::::::::"+JSON.stringify(user));
				var fetchuser = "select * from user where name='" + user.username + "'";
				connectionObject.query(fetchuser, function(err, rows, fields) {
					if (!err)
						console.log("the values from db are" + JSON.stringify(rows[0].name));

					else
						console.log("error while performing query");
				});
			},
			insertUser : function(user)
			{
				var insertuser = "INSERT INTO user (name) VALUES('" + user.username + "')";
				connectionObject.query(insertuser, function(err, result) {
					if (!err)
						console.log("user details inserted successfully");
					else
						console.log("error while performing query");
				});
			}
}