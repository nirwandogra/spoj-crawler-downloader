var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
var link = "",
	pass, userName;

function xx(ress) {
	var request = require('request');
	var cheerio = require('cheerio');
	var credentials = {
		login_user: userName,
		password: pass
	};
	request.post({
		uri: link,
		headers: {
			'content-type': 'application/x-www-form-urlencoded'
		},
		body: require('querystring').stringify(credentials)
	}, function(err, res, body) {
		if (err) {
			//callback.call(null, new Error('Login failed'));
			console.log("LOGIN failed");
			return;
		}
		var $ = cheerio.load(body);
		$('.kol1').each(function() {
			var th_text = $(this).find("a").first().text().trim();
			var file_name = "http://localhost:8080/files/src/save/" + th_text;
			console.log(file_name);
			var http = require('http');
			var fs = require('fs');
			var file = fs.createWriteStream(__dirname + "/files/" + th_text + ".cpp");
			var request = http.get(file_name, function(response) {
				response.pipe(file);
			});
		});
		ress.send(body);
	});
}
app.get('/', function(req, res) {
	var html = '<form action="/" method="post">' +
		'Enter your name:' +
		'<input type="text" name="userName" placeholder="" />' +
		'<br>' + 'Enter your password:' +
		'<input type="password" name="password" placeholder="" />' +
		'<br>' + 'Enter your email:' + '<input type="text" name="email" placeholder="" />' +
		'<br>' +
		'<button type="submit">Submit</button>' +
		'</form>';
	res.send(html);
});
app.post('/', function(req, res, next) {
	userName = req.body.userName;
	pass = req.body.password;
	email = req.body.email;
	link = "http://www.spoj.com/status/" + userName + "/";
	xx(res);
});
app.listen(8080);
console.log('Server1 SSListening on port  8080 ');
//http://www.spoj.com/status/nirwandogra_1/signedlist/