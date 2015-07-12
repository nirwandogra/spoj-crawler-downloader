var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
$(function() {
    //hang on event of form with id=myform
    $("#myform").submit(function(e) {
        //prevent Default functionality
        e.preventDefault();
        //get the action-url of the form
        var actionurl = e.currentTarget.action;
        //do your own request an handle the results
         $.ajax({
                url: actionurl,
                type: 'post',
                dataType: 'json',
                data: $("#myform").serialize(),
                success: function(data) {
                           //... do something with the data...
                         }
            });
    });
});


app.get('/', function(reqq, ress){
request({
    url: 'http://www.spoj.com', //URL to hit
    qs: {login_user:"nirwandogra_1",password:"asshole"}, //Query string data
    method: 'POST', //Specify the method
    headers: { //We can define headers too
        'Content-Type': 'MyContentType',
        'Custom-Header': 'Custom Value'
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
      ress.send(body);
    }
});
});
app.listen(8080);
console.log('Server1 SSListening on port  8080 ');

