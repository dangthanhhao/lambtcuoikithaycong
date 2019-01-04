//Initiallising node modules
var fs = require('fs');
var express = require("express");
var path = require("path");
const multer = require("multer");
var bodyParser = require("body-parser");
var sql = require("mssql");
var jwt = require("jsonwebtoken");
var app = express();

var publicDir = require('path').join(__dirname, '/img');

// Setting Base directory
app.use(bodyParser.json());

//CORS Middleware
app.use(function (req, res, next) {
	//Enabling CORS 
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
	next();
});
app.use(express.static(publicDir));
//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
	var port = server.address().port;
	console.log("App now running on port", port);
});

//Initiallising connection string
var dbConfig = {
	user: "sa",
	password: "suhao123",
	server: "localhost",
	database: "SalesFood"
};

//Function to connect to database and execute query
var executeQuery = function (res, query) {
	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(query, function (err, ress) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					res.send(ress);
				}
			});
		}
	});
}
//jwt
function ensureToken(req, res, next) {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== 'undefined') {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}

app.get("/product_all/:keyw", (req, res) => {
	key = req.params.keyw;
	executeQuery(res, `select * from products where Cate_id='${key}' OR Name LIKE N'%${key}%'`);
});
app.get("/product_all", (req, res) => {
	executeQuery(res, "select * from products");
});
app.get("/api", ensureToken, function (req, res) {
	jwt.verify(req.token, "suhao", function (err, data) {
		if (err) {
			res.sendStatus(403);
		} else {
			/*
		  res.json({
			description: 'Protected information. Congrats!'
		  });
		  */
			var query = "select * from Account";
			executeQuery(res, query);
		}
	});
});
app.post("/login", (req, res) => {
	console.log(req.body);
	if (!req.body.username) {
		res.sendStatus(403);
		return;
	}
	let username = req.body.username;
	let password = req.body.password;
	console.log(username+ " "+ password);

	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(`select * from Account where Username='${username}' and Password='${password}'`, function (err, ress) {
				if (err) {
					console.log("Error while querying database :- " + err);
					res.send(err);
				}
				else {
					if (ress.length === 0) {
						res.status(400).json("no acc");
					}
					else {
						const token = jwt.sign(ress[0], "suhao");
						res.json({
							message: `Chào mừng ${ress[0].Name} đã đăng nhập thành công!`,
							token: token
						});
					}
				}
			});

		}

	}
	);

});

//provide img to frontend in image folder
app.get("/img/:imgname", (req, res) => {
	res.sendfile(publicDir + '\\' + req.params.imgname, (err) => {
		res.status(404).send();
	});
});


const handleError = (err, res) => {
	res
		.status(500)
		.contentType("text/plain")
		.end("Oops! Something went wrong!");
};


const upload = multer({
	dest: "/tempupload"
	// you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post("/upload", upload.single("file" /* name attribute of <file> element in your form */),
	(req, res) => {
		const tempPath = req.file.path;
		const targetPath = path.join(__dirname, "./img/" + req.file.originalname);


		fs.rename(tempPath, targetPath, err => {
			if (err) return handleError(err, res);

			res
				.status(200)
				.contentType("text/plain")
				.end("File uploaded!");
		});


	}
);

/*
//POST API
 app.post("/api/user", function(req , res){
	var query = "INSERT INTO [user] (Name,Email,Password) VALUES (req.body.Name,req.body.Email,req.body.Password)";
	executeQuery (res, query);
});

//PUT API
 app.put("/api/user/:id", function(req , res){
	var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
	executeQuery (res, query);
});

// DELETE API
 app.delete("/api/user/:id", function(req , res){
	var query = "DELETE FROM [user] WHERE Id=" + req.params.id;
	executeQuery (res, query);
});

*/
