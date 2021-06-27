var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));

var connection = mysql.createConnection({
	host		: 'localhost',
	user		: 'root',
	database	: 'join_us'
});

app.get('/', function(req,res){
	var q = 'select count(*) as total from users';
	
	connection.query(q, function(err,results){
		if(err) throw err;
		var count = results[0].total;
		res.render('home',{ count : count });
	});
});

app.post('/register' , function( req , res ){
	var person = {
	email 	: req.body.email
	};
	connection.query('insert into users set ?',person , function(err , results){
		if(err) throw err;
		res.redirect('/');
	});
});

app.get('/contactus', function(req,res){
	res.render('contact');
});

app.post('/contactentry' , function( req , res ){
	var feedback = {
	name    : req.body.name,
	email 	: req.body.email,
	gender  : req.body.gender,
	message : req.body.feedback
	};
	connection.query('insert into contact set ?',feedback , function(err , results){
		if(err) throw err;
		console.log('Feedback inserted');
		res.redirect('/ty');
	});
});

app.get('/ty', function(req,res){
	res.render('thanks');
});

app.get('/aboutus', function(req,res){
	res.render('about');
});

app.listen(3000,function(){
	console.log('Server is listening at port 3000 !');
});