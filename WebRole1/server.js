var	express = require('express'); 
var http = require('http');
var countdown = countdown = require('./routes/countdown');
var app = express();

var canvas = require('canvas-win');

var	express_form = require("express-form"), 
	filter = express_form.filter,
	validate = express_form.validate;
var forms = require("forms"), 
	fields = forms.fields,
    validators = forms.validators;
// var im = require('imagemagick');
// var gm = require('gm');

app.configure(function() {
	app.set('port',process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.methodOverride());
});


var countdown_form = forms.create({
    name: fields.string({required: true}),
    date: fields.date({required: true}),
    time: fields.date({required: true})
});

app.get('/', function(req,res) {
	res.render('frontpage',{
        title: 'countdownimagegenerator',
        form: countdown_form.toHTML()
    });
 });

app.get('/gen', express_form (
		filter("name").trim(),
		validate("name").required().is(/^[a-z]+$/),
		filter("date").trim(),
		filter("time").trim()
	), function(req,res) {
	if(!req.form.isValid) {
		res.send(req.form.errors);
	}
	else { 
		res.setHeader('Content-Type', 'image/png');
		//res.set('Content-Type', 'image/png');

		var canvas = new Canvas(200,200);
		var ctx = canvas.getContext('2d');
		ctx.font = '30px Impact';
		ctx.rotate(.1);
		ctx.fillText("Awesome!", 50, 100);

		var te = ctx.measureText('Awesome!');
		ctx.strokeStyle = 'rgba(0,0,0,0.5)';
		ctx.beginPath();
		ctx.lineTo(50, 102);
		ctx.lineTo(50 + te.width, 102);
		ctx.stroke();
		canvas.pngStream();
		// creating an image
	}
});


http.createServer(app).listen(app.get('port'));