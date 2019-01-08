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
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
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
app.get("/product/:id", (req, res) => {
	key = req.params.id;
	executeQuery(res, `select * from products where Id=${key}`);
});
app.get("/feedback/:id", (req, res) => {
	key = req.params.id;
	
	executeQuery(res, `SELECT Name,Comment FROM dbo.Feedback JOIN dbo.Account ON Account.Username = Feedback.Username where PId=${key}`);
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

app.post("/register", (req, res) => {
	console.log(req.body);
	if (!req.body.username) {
		res.sendStatus(400);
		return;
	}
	let username = req.body.username;
	let password = req.body.password;
	let name=req.body.name;
	console.log(username+ " "+ password+" "+name);
	

	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(`INSERT INTO dbo.Account VALUES  ( '${username}', '${password}', N'${name}', 0 )`, function (err, ress) {
				if (err) {
					res.status(400).send();
				}
				else {
					res.json({
							message: `Đăng kí thành công, bạn có thể dùng tài khoản này để đăng nhập!`,
					
						});
					
				}
			});

		}
	}
	);

});

app.post("/feedback", (req, res) => {
	console.log(req.body);
	if (!req.body.username) {
		res.sendStatus(400);
		return;
	}
	let username = req.body.username;
	let pid = req.body.pid;
	let comment=req.body.feedback;
	// console.log(username+ " "+ pid+" "+comment);
	

	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(`INSERT INTO dbo.Feedback VALUES  ( '${username}', ${pid}, N'${comment}' )`, function (err, ress) {
				if (err) {
					res.status(400).send();
				}
				else {
					res.json({
							message: `Cảm ơn vì đã phản hồi!`,
					
						});
					
				}
			});

		}
	}
	);

});
app.put("/updateProfile", (req, res) => {
	console.log(req.body);
	if (!req.body.username) {
		res.sendStatus(400);
		return;
	}
	let username = req.body.username;
	let password = req.body.password;
	let name=req.body.name;
	console.log(username+ " "+ password+" "+name);
	
	sql.connect(dbConfig, function (err) {
		if (err) {
			console.log("Error while connecting database :- " + err);
			res.send(err);
		}
		else {
			// create Request object
			var request = new sql.Request();
			// query to the database
			request.query(`UPDATE dbo.Account SET Name=N'${name}',Password='${password}' WHERE Username='${username}'`, function (err, ress) {
				if (err) {
					res.status(400).send();
				}
				else {
					res.json({
							message: `Cập nhật thành công!`,
					
						});
					
				}
			});

		}
	}
	);

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
app.post("/product", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		if (!req.body.pdname) {
			res.sendStatus(400);
			return;
		}
		
		let pdname = req.body.pdname;
		let cate = req.body.category;
		let price=req.body.price;
		let des=req.body.descrip;
		let img=req.body.img;
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				var request = new sql.Request();
				// query to the database
				request.query(`INSERT INTO dbo.PRODUCTS VALUES  ( N'${pdname}' ,${price} ,N'${des}' ,N'${img}' ,'${cate}' )`, function (err, ress) {
					if (err) {
						res.status(400).send();
					}
					else {
						res.json({
								message: `Thêm sản phẩm thành công!`,
						
							});
						
					}
				});
	
			}
		}
		);
	})
	

});
app.put("/product", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		if (!req.body.pid) {
			res.sendStatus(400);
			return;
		}
		let pid=req.body.pid;
		let pdname = req.body.pdname;
		let cate = req.body.category;
		let price=req.body.price;
		let des=req.body.descrip;
		let img=req.body.img;
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				var request = new sql.Request();
				// query to the database
				request.query(`UPDATE dbo.PRODUCTS SET Name =N'${pdname}',Price=${price},Description=N'${des}',Img=N'${img}',Cate_id='${cate}' WHERE Id=${pid}`, function (err, ress) {
					if (err) {
						res.status(400).send();
					}
					else {
						res.json({
								message: `Cập nhật thông tin thành công!`,
						
							});
						
					}
				});
	
			}
		}
		);
	})
	

});
app.delete("/product/:id", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		if (!req.params.id) {
			res.sendStatus(400);
			return;
		}
		
		let Id = req.params.id;
		
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				var request = new sql.Request();
				// query to the database
				request.query(`DELETE FROM dbo.PRODUCTS WHERE Id=${Id}`, function (err, ress) {
					if (err) {
						res.status(400).send();
					}
					else {
						res.json({
								message: `Xóa sản phẩm thành công!`,
						
							});
						
					}
				});
	
			}
		}
		);
	})
	

});
app.get("/user_all", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				executeQuery(res,"select * from account");
	
			}
		}
		);
	})
	

});
app.get("/user/:id", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		if (!req.params.id) {
			res.sendStatus(400);
			return;
		}
		
		let Id = req.params.id;
		
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object

				executeQuery(res,`SELECT * FROM dbo.Account  WHERE Username='${Id}'`);
	
			}
		}
		);


	})
	

});
app.delete("/user/:id", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		if (!req.params.id) {
			res.sendStatus(400);
			return;
		}
		
		let Id = req.params.id;
		
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				var request = new sql.Request();
				// query to the database
				request.query(`DELETE FROM dbo.Account WHERE Username='${Id}'`, function (err, ress) {
					if (err) {
						console.log(err);
						res.status(400).send();
					}
					else {
						res.json({
								message: `Xóa User thành công!`,
						
							});
						
					}
				});
	
			}
		}
		);
	})
	

});

app.put("/makead", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		
		if (!req.body.username) {
			res.sendStatus(400);
			return;
		}
		let pid=req.body.username;
		// let pdname = req.body.pdname;
		// let cate = req.body.category;
		// let price=req.body.price;
		// let des=req.body.descrip;
		// let img=req.body.img;
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				var request = new sql.Request();
				// query to the database
				request.query(`UPDATE Account SET role=1 WHERE Username='${pid}'`, function (err, ress) {
					if (err) {
						console.log(err);
						res.status(400).send();
					}
					else {
						res.json({
								message: `Cập nhật thông tin thành công!`,
						
							});
						
					}
				});
	
			}
		}
		);
	})
});
app.get("/feedback_all", ensureToken,(req, res) => {
	jwt.verify(req.token,"suhao",(err,data)=>{
		//code here after verify
		
	
		sql.connect(dbConfig, function (err) {
			if (err) {
				console.log("Error while connecting database :- " + err);
				res.send(err);
			}
			else {
				// create Request object
				executeQuery(res,"SELECT dbo.Feedback.Id AS Id,Username,Name,Comment FROM dbo.Feedback JOIN dbo.PRODUCTS ON PRODUCTS.Id = Feedback.PId");
	
			}
		}
		);
	})
	

});

//provide img to frontend in image folder
app.get("/img/:imgname", (req, res) => {
	res.sendfile(publicDir + '\\' + req.params.imgname, (err) => {
		res.status(404).send();
	});
});

const handleError = (err, res) => {
	console.log(err)
	res
		.status(500)
		.contentType("text/plain")
		.end("Oops! Something went wrong!");
};
//for upload image
const upload = multer({
	dest: "/tempupload"
	// you might also want to set some limits: https://github.com/expressjs/multer#limits
});


app.post("/upload", upload.single("file" /* name attribute of <file> element in your form */),
	(req, res) => {
		const tempPath = req.file.path;
		const targetPath = path.join(__dirname, "./img/" + req.file.originalname);
		console.log("file upload!");

		fs.rename(tempPath, targetPath, err => {
			if (err) return handleError(err, res);

			res
				.status(200)
				.send();
		});


	}
);	