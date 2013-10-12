



exports.frontpage = function(req,res) {
	res.render('frontpage',{
        title: 'countdownimagegenerator',
        form: countdown_form.toHTML()
    });
};

exports.image = function(req,res) {
	res.render();
};

exports.imagepost = function(req,res) {
	express_form (
		filter("event").trim(),
		validate("event").required().is(/^[a-z]+$/),
		filter("date").trim(),
		filter("time").trim()
	);

	// if(!req.form.isValid) {
	// 	res.send(req.form.errors);
	// }
	// else res.render();   

};